$(function(){
	function GetQueryString(name) { 
		  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		  var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
		  var context = ""; 
		  if (r != null) 
		     context = r[2]; 
		  reg = null; 
		  r = null; 
		  return context == null || context == "" || context == "undefined" ? "" : context; 
	}
	var id = GetQueryString('projectInfoManageId');
	console.log(id);
	
	//获得页面内容
	 $.ajax({
        type: "GET",
        url: URL + "/services/projectInfoManageService/"+id,
        dataType: "json",
        async:false,//更改为同步 
        success: function(data){
        	$("#content").html(data.content);
        }
    });
	
	 //获得学员个人信息
	 	$.ajax({
	        type: "GET",
	        url: URL + "/services/projectInfoManageService/getStudentInfo/"+id,
	        dataType: "json",
	        success: function(data){
	        	for(var temp in data){
	    			$('.'+temp).text(data[temp]);
	    		}
	        }
	    });
	 	
	 	//确定字符串中的'_'并将'_'后的第一个英文字母大写
	 	function myUperCase(str) {
	 		while(str.indexOf("_")>0) {
	 			str = str.substring(0,str.indexOf("_"))
	 				+ str.substring(str.indexOf("_")+1,str.indexOf("_")+2).toUpperCase()
	 				+ str.substring(str.indexOf("_")+2);
	 		}
	 		return str;
	 	}
	 	//获得课程信息
	 	$.ajax({
	        type: "GET",
	        url: URL + "/services/projectInfoManageService/getProjectInfo/"+id,
	        dataType: "json",
	        success: function(data){
	        	var temp2 = "";
	        	for(var temp in data){
	        		debugger;
	        		//如果以ai开头，_name结尾，去掉_name
	        		if(temp.indexOf("ai")==0 && temp.indexOf("_name")==(temp.length-5)) {
	        			temp2 = temp.substring(2,temp.length-5);
//	        			alert(temp);
	        			temp2 = myUperCase(temp2);
//	        			alert(temp);
	        		} else {
	        			temp2 = myUperCase(temp);
//	        			alert(temp);
	        		}
	        		//将下划线后的第一个英文字母大写，然后去掉下划线
	        		$('.'+temp2).text(data[temp]);
    			}
	        }
	    });
});