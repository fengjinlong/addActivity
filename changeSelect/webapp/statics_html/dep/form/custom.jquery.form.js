/*
*form提交(post方式)
*
*formname form Name
*callbackfn 回调函数名(要求函数必须有参数且不能多与两个,一个参数时参数为响应文本,两个参数时第一个参数为响应文本)
*param 回调函数参数(如果为null,那么调用一个参数的回调函数,否则调用两个参数的回调函数)
*/
function jquerySubByFName(formName,callbackFn,param){
	var formObj = jQuery("form[@name=" + formName + "]");
	var options = {success: function(responseText) {
		if(param === null){
			callbackFn(responseText);
		}else{
			callbackFn(responseText,param);
		}
	}}; 
	formObj.ajaxSubmit(options); 
}
/*
*form提交(post方式)
*
*formId form Id
*callbackfn 回调函数名(要求函数必须有参数且不能多与两个,一个参数时参数为响应文本,两个参数时第一个参数为响应文本)
*param 回调函数参数(如果为null,那么调用一个参数的回调函数,否则调用两个参数的回调函数)
*/
function jquerySubByFId(formId,callbackFn,param,dataType){
	var formObj = jQuery("#" + formId);
	var options = {
            dataType:  ("undefined"!=dataType && null!=dataType)?dataType:"json",
			success: function(responseText) {
				if(param === null){
					callbackFn(responseText);
				}else{
					callbackFn(responseText,param);
				}
				
			},
			error:function(responseText){
				callbackFn(responseText);
			}
	};
	formObj.ajaxSubmit(options); 
}
/**
 * 格式化时间
 * @param  {Datetime} source 时间对象
 * @param  {String} format 格式
 * @return {String}        格式化过后的时间
 */
function formatDate (source, format) {
	  const o = {
	    'M+': source.getMonth() + 1, // 月份
	    'd+': source.getDate(), // 日
	    'H+': source.getHours(), // 小时
	    'm+': source.getMinutes(), // 分
	    's+': source.getSeconds(), // 秒
	    'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
	    'f+': source.getMilliseconds() // 毫秒
	  }
	  if (/(y+)/.test(format)) {
	    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
	  }
	  for (let k in o) {
	    if (new RegExp('(' + k + ')').test(format)) {
	      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
	    }
	  }
	  return format
	}
