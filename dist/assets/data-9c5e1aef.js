import{f as t}from"./data-2164742b.js";const n=["in","continue","break","return","exit","import","as","new","true","false","null","async","log","request","assert","sip","db","redis"],s={log:["log.trace","log.info","log.warn","log.error","log.debug"],request:["request.getFile","request.getFiles","request.getValues","request.getHeaders","request.get"],assert:["assert.notNull","assert.notEmpty","assert.notBlank","assert.regx","assert.isTrue"],sip:["sip.callSink","sip.doDelayService","sip.callRabbitMQ","sip.getServiceRetryCount","sip.setServiceStatus","sip.error"],db:["db.transaction","db.cache","db.putCacheValue","db.select","db.update","db.insert","db.page","db.selectInt","db.selectOne","db.selectValue"],redis:["redis.serializer","redis.deserialize","redis.execute"]},i=[{name:"var",category:"变量",code:"var x = '';"},{name:"let",category:"变量",code:"let x = '';"},{name:"const",category:"变量",code:"const x = '';"},{name:"if",category:"判断",code:`if () {
	
}`},{name:"if/else",category:"判断",code:`if() {

} else {

}`},{name:"try/catch/finally",category:"判断",code:`try {

} catch(err) {

} finally {

}`},{name:"for/in",category:"循环",code:`for (key,value in map) {
	
}`},{name:"println",category:"打印",code:"System.out.println('');"},{name:"debug",category:"打印",code:'logger.debug("");'},{name:"error",category:"打印",code:'logger.error("");'},{name:"info",category:"打印",code:'logger.info("");'},{name:"warn",category:"打印",code:'logger.warn("");'}],d=[{title:"参数名",dataIndex:"name",key:"name",editRow:!0,editRule:!0,width:100},{title:"参数描述",dataIndex:"description",key:"description",editRule:!0,editRow:!0,width:120},{title:"参数类型",dataIndex:"type",key:"type",editRow:!0,editRule:!0,width:120,editComponent:"Select",editComponentProps:({text:e,record:r,column:a})=>({allowClear:!0,placeholder:"请选择",options:t})},{title:"是否必填",dataIndex:"required",key:"required",editRow:!0,editComponent:"Checkbox",width:80,editValueMap:e=>e?"是":"否"}];export{i as a,d as c,n as k,s as r};
