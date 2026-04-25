import{a as d,q as u,c as m,e as f,a0 as _,v as h,i as y,a3 as b,G as v}from"./index-184abb5d.js";import{I as $}from"./introjs.min-22af6836.js";const g={class:"guide"},S=d({__name:"GuidePage",props:{isHiddenTree:{type:Boolean,default:!1}},setup(i){const o=i,{prefixVar:e}=u("");function a(){const s=o.isHiddenTree?`.${e}-tree-menu-unfold-outlined`:`.${e}-tree-menu-fold-outlined`,n=o.isHiddenTree?"展开":"折叠",l=document.querySelector(`.${e}-table-show-search`),r=l?`.${e}-table-show-search`:`.${e}-table-off-search`,c=l?"显示":"隐藏",p=document.querySelector(`.${e}-model-table-api`),t=[{title:"功能引导！",intro:"欢迎您了解数据模型的主要界面功能! 👋"},{title:`菜单${n}按钮`,element:document.querySelector(s),intro:`点击按钮，${n}菜单`},{title:"表格搜索区",element:document.querySelector(r),intro:`点击按钮，${c}搜索区`}];p?(t.splice(3,0,{title:"表格标题下拉操作区",element:document.querySelector(`.${e}-table-title-drop-menu`),intro:`<div>
      <p>鼠标悬浮标题，你可以看到关于操作表格的各种<span style="color: #0960bd; font-weight: 600"> 快捷操作</span>：</p>
      <p>1、导入模型字段</p>
      <p>2、导出模型字段</p>
      <p>3、同步模型字段</p>
      <p>4、创建数据库表</p>
      <p>5、删除数据库表</p>
      <p>6、自动生成值集</p>
      <p>7、自动生成页面</p>
    </div>
  </div>`,position:"right"}),t.splice(4,0,{title:"模型接口",element:document.querySelector(`.${e}-model-table-api`),intro:"点击模型接口按钮，可查看当前模型的接口详情"}),t.splice(5,0,{title:"模型关系",element:document.querySelector(`.${e}-model-table-relation`),intro:"点击模型关系按钮，可操作当前模型的所有关联信息"})):(t.splice(3,0,{title:"表格下拉操作区",element:document.querySelector(`.${e}-table-title-drop-menu`),intro:`<div>
      <p>鼠标悬浮标题，你可以看到关于操作表格的各种<span style="color: #0960bd; font-weight: 600"> 快捷操作</span>：</p>
      <p>1、自动生成值集</p>
      <p>2、自动生成页面</p>
    </div>
  </div>`,position:"right"}),t.splice(4,0,{title:"查看视图模型关系",element:document.querySelector(`.${e}-view-table-modelRelation`),intro:"点击查看视图按钮，可查看当前视图的模型关系信息"})),$().setOptions({hidePrev:!0,nextLabel:"下一步",prevLabel:"上一步",doneLabel:"完成",tooltipClass:"customIntro",steps:t}).start()}return(s,n)=>(m(),f("div",g,[_("div",{class:"guide-flag",onClick:a},[h(y(b),{icon:"clarity:help-solid",size:"22"})])]))}});const I=v(S,[["__scopeId","data-v-6229ff3f"]]);export{I as default};
