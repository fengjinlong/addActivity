//删除list中指定位置的元素
function deleteList(List,index) {
	var newList = new Array();
	for(var i=0; i<List.length; i++) {
		if(i==index) {
			
		} else {
			newList.push(List[i]);
		}
	}
	return newList;
}
//上传文件方法
function uploadFile() {
	$(".uploadFile").fileinput({
	    //上传的地址
	    language: 'zh', //设置语言
        uploadUrl: ctx + "/proLessonPlan/uploadFileNew", //上传的地址
        allowedFileExtensions: ['jpg', 'gif', 'png', 'txt'],//接收的文件后缀
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式 
        showUpload:false, //是否显示上传按钮
        showRemove :false, //显示移除按钮
//        deleteUrl: ctx + "/proLessonPlan/deleteFile", //删除文件的地址
        //dropZoneEnabled: false,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
        //minFileCount: 0,
        overwriteInitial: false,//不覆盖已存在的图片  
        maxFileCount: 10, //表示允许同时上传的最大文件个数
        textEncoding:"GBK",//设置上传文件中文编码，默认是utf-8
        enctype: 'multipart/form-data',
//        uploadExtraData: function(previewId, index) {   //额外参数的关键点
//           return ;
//        },
//        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        layoutTemplates: {
//        	actionUpload:'',//去除上传按钮
//        	actionDelete:'',//去除删除按钮
        	actionZoom:'', //去除预览按钮
//        	url: ctx + "/proLessonPlan/deleteFile"
//        	deleteUrl: "deleteFile"
        }
		
	}).on('fileerror', function(event, data, msg) {//异步上传返回结果处理-失败
	    console.log("fileerror");
	    console.log(data);
	}).on("fileuploaded", function(event, data, previewId, index) {
	    var fileUploadId = $(this).data("value");
	    var fileName = $("#"+fileUploadId).parents("tr").find(".uploadFileName").val();
	    var fileUrl = $("#"+fileUploadId).parents("tr").find(".uploadFileName").val();
	    if(fileName==null || fileName=='') {
	    	//如果还没有上传文件，则将上传文件的名称直接赋值
	    	$("#"+fileUploadId).parents("tr").find(".uploadFileName").val(data.response.fileName);
	    	//新增——保存文件上传路径
	    	$("#"+fileUploadId).parents("tr").find(".uploadFileUrl").val(data.response.url);
	    } else {
	    	$("#"+fileUploadId).parents("tr").find(".uploadFileName").val(fileName+","+data.response.fileName);
	    	//新增——保存文件上传路径
	    	$("#"+fileUploadId).parents("tr").find(".uploadFileUrl").val(fileUrl+","+data.response.url);
	    }
	    
//	    List.push({ FileName: data.response.fileName, KeyID: previewId });
//	    List.push({ FileName: data.response.fileName});
//	    alert($("#"+fileUploadId).parents("tr").find(".uploadFileName").val());
	    //手动为删除按钮绑定事件
		$("."+fileUploadId+"Win button.kv-file-remove").click({paramName:fileUploadId},function(e) {
			var removeFileName = $(this).parents("div.file-preview-success").find("div.file-footer-caption").attr("title");
			var fileUploadId = e.data.paramName;
			var fileName = $("#"+fileUploadId).parents("tr").find(".uploadFileName").val();
			//得到文件上传保存路径
			var fileUrl = $("#"+fileUploadId).parents("tr").find(".uploadFileUrl").val();
			if(fileName==removeFileName) {
		    	//上传的文件只有要移除的文件一个
		    	fileName = '';
		    	$("#"+fileUploadId).parents("tr").find(".uploadFileName").val(fileName);
		    	//同时更新该文件名对应的文件上传路径
		    	$("#"+fileUploadId).parents("tr").find(".uploadFileUrl").val(fileName);
		    } else if(fileName.indexOf(removeFileName)==0) {
		    	//如果要移除的文件在开头
		    	fileName = fileName.replace(removeFileName+',','');
		    	$("#"+fileUploadId).parents("tr").find(".uploadFileName").val(fileName);
		    	//把第一个文件的上传路径去掉
		    	fileUrl = fileUrl.substring(fileUrl.indexOf(",")+1);
		    	//同时更新该文件名对应的文件上传路径
		    	$("#"+fileUploadId).parents("tr").find(".uploadFileUrl").val(fileUrl);
		    } else {
		    	//如果要移除的文件在结尾，或者中间
		    	var fileArray = fileName.split(",");
		    	var fileNameArr = new Array();
		    	var indexTemp = 0;
		    	for(var i=0; i<fileArray.length; i++) {
		    		if(fileArray[i]==removeFileName) {
		    			indexTemp = i;
		    		} else {
		    			fileNameArr.push(fileArray[i]);
		    		}
		    	}
//		    	fileName = fileName.replace(','+removeFileName,'');
//		    	$("#"+fileUploadId).parents("tr").find(".uploadFileName").val(fileName);
		    	$("#"+fileUploadId).parents("tr").find(".uploadFileName").val(fileNameArr.join(","));
		    	//剔除与该文件名处于同一位置下的URL路径
		    	var urlArray = fileUrl.split(",");
		    	var fileUrlArr= new Array();
		    	for(var i=0; i<urlArray.length; i++) {
		    		if(i==indexTemp) {
		    		} else {
		    			fileUrlArr.push(urlArray[i]);
		    		}
		    	}
		    	$("#"+fileUploadId).parents("tr").find(".uploadFileUrl").val(fileUrlArr.join(","));
		    }
//			alert($("#"+fileUploadId).parents("tr").find(".uploadFileName").val());

		});
	}).on('filesuccessremove', function(event, previewId, index) {
		
    });
}
uploadFile();//初始化上传文件控件

//初始化下载框中的内容
function openDownWin(detailId) {
	//根据隐藏域的产品详情id，搜索该产品详情下的课件
	$("#downloadFileForm").val(detailId);
	//清空残留数据
	$("#downloadFileTbody").html('');
	//初始化下载文件列表
	$.ajax({
	       url: ctx + '/proLessonPlan/getDownloadInfo',
	       type: 'POST',
	       dataType: 'json',
	       data:{detailId:detailId},
	       success: function (data) {
	    	   var str = '';
	    	   if(data.status=="success") {
	    		   for(var i=0; i<data.data.length; i++) {
	    			   str += '<tr><td>'+data.data[i].fileName+'</td>'
	    			   + '<td><a onclick="downloadFun(\'' + data.data[i].fileUrl + '\', \'' + data.data[i].fileName + '\')" > <i class="fa fa-download blue" title="下载"></i></a></td>'
	    			   + '<td><a onclick="deleteFile(\'' + data.data[i].fileName + '\', \''+detailId+'\')" > <i class="fa fa-trash-o danger" title="删除"></i></a></td>'
	    			   + '</tr>';
	    		   }	    
	    	   }
	    	   $("#downloadFileTbody").html(str);
	       },
	       error: function (response) {
	           toastr.error("系统错误");
	       }
	  });
}

//文件下载传递参数方法
function downloadInit(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    
    var detailId = $("#downFileDetailId").val();
    if(detailId!=null && detailId!='') {
    	 aoData.push({"name": "detailId", "value": detailId});
    }
    
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

//模拟表单提交同步方式下载文件
// 能够弹出保存文件对话框
function downloadFun(fileUrl, fileName) {
    console.log("ajaxDownloadSynchronized");
    var url = ctx + "/proLessonPlan/downloadFile";
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "url").attr("value", fileUrl));
    form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
    form.appendTo('body').submit().remove();
}

//文件删除
function deleteFile(courseware,detailId) {
	$.ajax({
	       url: ctx + '/proLessonPlan/deleteFile',
	       type: 'POST',
	       dataType: 'json',
	       data:{fileName:courseware,detailId:detailId},
	       success: function (data) {
	    	   if(data.status=="success") {
	    		 //删除成功
		    	   toastr.success("删除成功");
		    	   openDownWin(detailId) ;
	    	   } else {
	    		   toastr.error("删除失败");
	    	   }
	       },
	       error: function (response) {
	           toastr.error("系统错误");
	       }
	  });
}