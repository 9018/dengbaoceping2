# Python 重构计划

## Context
当前 `/root/claude/2` 目录下没有现成源码工程，核心输入只有 `app.jar`。该 JAR 已确认是一个 Spring Boot fat jar，入口为 `cn.coraise.ruida.runtime.RuntimeClientApplication`，主要业务域包括 `app`、`culture`、`project`、`sync`、`retrofit`，类分层大致为 7 个 controller、8 个 service impl、4 个 mapper、2 个 task。依赖面覆盖 Spring MVC、MyBatis Plus、Druid、多数据源、Redis、Shiro/JWT、Retrofit、POI、Activiti 等。

本次目标不是立即“等价翻译”全部 Java 行为，而是在本目录建立一套可执行的 Python 重构路线，优先将适合 Python 的 API、同步任务、外部平台适配能力迁移出来，并为后续编码提供明确目录和阶段边界。

## Recommended approach
采用“增量替换 + 领域拆分”方式重写，不做一次性全量迁移。先建立 Python 项目骨架和核心基础设施，再优先落地 `sync` 与 `retrofit` 相关能力，随后迁移 `project` / `app` 业务接口，最后视实际依赖情况处理 `culture`、文档处理、鉴权与流程引擎相关部分。

## Planned phases

### Phase 1: 建立 Python 工程骨架
在 `/root/claude/2` 下创建新的 Python 项目结构，推荐使用 FastAPI 作为 Web 框架，先搭出 API、service、repository、tasks、clients、models、schemas、core、tests 等基础目录。

关键目标：
- 明确统一入口（如 `app/main.py`）
- 初始化依赖管理（`pyproject.toml` 或 `requirements.txt`）
- 准备配置分层（开发/测试/生产）
- 建立基础日志、配置、异常处理、中间件能力

### Phase 2: 先迁移外部平台适配层与同步域
优先覆盖 `retrofit` 与 `sync` 相关能力，因为它们最适合 Python：
- 将 Java 的 Retrofit API 适配为 Python `httpx` / `requests` client
- 将同步控制器与同步任务迁为 FastAPI + APScheduler/Celery
- 抽象 token、Redis 状态、重试、超时、幂等等通用能力

建议优先映射的 JAR 类：
- `cn/coraise/ruida/runtime/retrofit/api/ClientApi.class`
- `cn/coraise/ruida/runtime/retrofit/api/ClientSyncPlatCommonsettingsApi.class`
- `cn/coraise/ruida/runtime/retrofit/api/ClientUseTokenApi.class`
- `cn/coraise/ruida/runtime/retrofit/api/ClientWorkLogToPlatformApi.class`
- `cn/coraise/ruida/runtime/retrofit/api/IRtcProjectApi.class`
- `cn/coraise/ruida/runtime/sync/controller/RtcSyncServiceController.class`
- `cn/coraise/ruida/runtime/sync/controller/RtcWordDataSyncController.class`
- `cn/org/shtec/rhcp/rtc/sync/controller/RhcpSysUserSyncController.class`
- `cn/coraise/ruida/runtime/sync/service/impl/RtcSyncServiceServiceImpl.class`
- `cn/coraise/ruida/runtime/sync/service/impl/RtcSyncUserServiceImpl.class`
- `cn/coraise/ruida/runtime/sync/service/impl/RtcWordDataSyncServiceImpl.class`
- `cn/org/shtec/rhcp/rtc/sync/service/impl/RhcpSysUserSyncServiceImpl.class`
- `cn/coraise/ruida/runtime/sync/task/RtcUploadWorkLogTask.class`

### Phase 3: 迁移 `project` / `app` 业务域
在同步域稳定后，再迁移对数据库和接口编排依赖较强的 `project` 与 `app` 模块。

建议优先映射的 JAR 类：
- `cn/coraise/ruida/runtime/project/controller/RtcProjectController.class`
- `cn/coraise/ruida/runtime/project/service/impl/RtcProjectServiceImpl.class`
- `cn/coraise/ruida/runtime/project/mapper/RtcProjectMapper.class`
- `cn/coraise/ruida/runtime/app/controller/RtcAppController.class`
- `cn/coraise/ruida/runtime/app/service/impl/RtcAppServiceImpl.class`
- `cn/coraise/ruida/runtime/app/service/impl/RhcpRtcLicUseServiceImpl.class`

这一阶段需要补齐：
- 数据表与字段映射
- 事务边界
- JWT / Redis / token 生命周期
- 外部接口调用链路

### Phase 4: 评估 `culture`、文档处理与高耦合基础设施
`culture` 相关类已显示与 POI/文档能力有关；同时整体依赖还包括 Activiti、Shiro、动态数据源等高耦合部分。这一阶段以“保留、桥接、拆分”优先，不默认直接重写。

重点评估：
- `cn/coraise/ruida/runtime/culture/controller/CulturePromotionController.class`
- `cn/coraise/ruida/runtime/culture/service/impl/CulturePromotionClientServiceImpl.class`
- `cn/coraise/ruida/runtime/culture/mapper/CulturePromotionMapper.class`
- `cn/coraise/ruida/runtime/culture/mapper/SysFilesClientMapper.class`
- `cn/coraise/ruida/runtime/culture/task/CulturePromotionTaskUtils.class`

原则：
- 文档生成/转换如果强依赖 Java 生态，先保留为独立服务
- Activiti 不作为首批迁移范围
- 鉴权能力先兼容实现，再逐步替换

## Proposed Python project structure
建议在本目录建立如下结构：

```text
/root/claude/2/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── routes/
│   │   │   ├── app.py
│   │   │   ├── project.py
│   │   │   ├── sync.py
│   │   │   └── culture.py
│   ├── core/
│   │   ├── config.py
│   │   ├── logging.py
│   │   ├── security.py
│   │   ├── redis.py
│   │   └── database.py
│   ├── schemas/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   │   ├── app/
│   │   ├── project/
│   │   ├── sync/
│   │   └── culture/
│   ├── clients/
│   │   ├── platform/
│   │   └── auth/
│   ├── tasks/
│   └── utils/
├── tests/
│   ├── api/
│   ├── services/
│   └── integration/
├── pyproject.toml
├── .env.example
└── README.md
```

## Module mapping
建议按下述方式映射 Java → Python：

- Spring Boot `Controller` → FastAPI router (`app/api/routes/*.py`)
- `ServiceImpl` → `app/services/**`
- `Mapper` → `app/repositories/**`
- `Entity` / `VO` → `app/models/**` + `app/schemas/**`
- Retrofit API → `app/clients/platform/**`
- Task 类 → `app/tasks/**`
- Redis / token / auth filter → `app/core/security.py` + `app/core/redis.py`

## Key technical choices
- Web: FastAPI
- Data access: SQLAlchemy 2.x（必要时局部原生 SQL）
- Validation: Pydantic
- Scheduler: APScheduler 或 Celery（视任务复杂度决定）
- HTTP client: httpx
- Cache / state: redis-py
- Auth: PyJWT / Authlib
- Config: pydantic-settings
- Tests: pytest

## Risks and unknowns
当前最大风险不在代码框架，而在信息缺口：

1. 只有 JAR，没有源码，注解、SQL、事务和配置细节不完整
2. 还没有 `application.yml` / `application.properties` 等配置文件
3. 还没有数据库表结构、Mapper SQL、接口文档
4. `culture` 文档处理与 Activiti 工作流是否核心未完全确认
5. 多数据源、Shiro、内部 starter 的隐式能力需要补齐

因此，编码前需要补足这些输入，或者在实现时以占位接口与可替换适配层方式推进。

## Critical files to create or modify in implementation
首次实现阶段预计会创建或修改这些关键文件：
- `/root/claude/2/pyproject.toml`
- `/root/claude/2/.env.example`
- `/root/claude/2/app/main.py`
- `/root/claude/2/app/core/config.py`
- `/root/claude/2/app/core/database.py`
- `/root/claude/2/app/core/redis.py`
- `/root/claude/2/app/core/security.py`
- `/root/claude/2/app/api/routes/sync.py`
- `/root/claude/2/app/api/routes/project.py`
- `/root/claude/2/app/api/routes/app.py`
- `/root/claude/2/app/services/sync/*`
- `/root/claude/2/app/clients/platform/*`
- `/root/claude/2/app/tasks/*`
- `/root/claude/2/tests/*`

## Verification plan
实现阶段完成后，按以下方式闭环验证：

1. 运行依赖安装并确认项目可启动
2. 启动 FastAPI 服务，验证健康检查与基础路由
3. 对 `sync` / `project` / `app` 路由做端到端请求验证
4. 验证 Redis 连接、token 读写与外部 client 超时/重试行为
5. 对任务调度入口做最小可运行验证
6. 运行 `pytest`，至少覆盖 API 层与 service 层的基础用例
7. 若后续补齐配置和数据库结构，再补充真实集成验证

## Immediate next step
下一步先在本目录创建 Python 项目骨架，并优先实现：
1. 项目入口与基础配置
2. `retrofit` 对应的 Python client 层
3. `sync` 域的首批 API 与任务骨架
4. 测试与运行说明
