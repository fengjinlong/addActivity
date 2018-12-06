//下拉框多选
$('.selectpicker').selectpicker({
    'liveSearch': true,
    'liveSearchPlaceholder': '请输入关键字',
    'actionsBox': true,
    'selectAllText': '全选',
    'deselectAllText': '取消',
    'noneSelectedText': '没有匹配项'
})


	//生成6位随机数
	function MathRand() 
	{ 
		var Num=""; 
		for(var i=0;i<6;i++) 
		{ 
			Num+=Math.floor(Math.random()*10); 
		} 
		return Num;
	} 

	//打开当前记录的文件上传框
	function openUploadW(obj) {
		//清除上一次残留的文件名称
		$(obj).parents("tr").find(".uploadFileName").val('');
		var objId = $(obj).attr("id");
		//先判断将要生成的弹框是否存在
		var objWin = $("."+objId+"Win");
		if(objWin.length==0) {
			var str = '<div class="modal fade '+objId+'Win in" tabindex="-1" role="dialog"                                                       '
			+'aria-labelledby="myLargeModalLabel" aria-hidden="false"                                                                    '
			+'	data-backdrop="static">                                                                                                  '
			+'	<div class="modal-dialog modal-xs">                                                                                      '
			+'		<div class="modal-content">                                                                                          '
			+'			<div class="modal-header modal-header_border">                                                                   '
			+'				<button type="button" class="close" data-dismiss="modal"                                                     '
			+'					aria-hidden="true">×</button>                                                                            '
			+'				<span class="widget-caption">文件上传</span>                                                                 '
			+'			</div>                                                                                                           '
			+'			<div class="modal-body clearfix" style="width:350px;margin:0 auto">                                                                                '
			+'				<input type="file" data-value="'+objId+'" name="myfile" class="form-control coursewareContent uploadFile" data-bv-field="myfile"/>  '
//			+'<input type="hidden" name="detailList[0].courseware" class="form-control courseware uploadFileName" data-bv-field="detailList[0].courseware"/>  '
			+'			</div>                                                                                                           '
			+'		</div>                                                                                                               '
			+'	</div>																													'
			+'</div>';
			//将生成的上传文件弹框拼接到一个统一的div中
			$("#uploadDiv").append(str);
			//初始化上传文件样式
			uploadFile();
		} 
		//展示弹窗
		$("."+objId+"Win").modal("show");
	}
	


//新增
$('.addBtn').click(function(){
	//清除上次生成的上传文件的弹框
	$("#uploadDiv").html('');
	//清除上次新增残留数据
	//清空学员所属信息
	$("#addDepartmentName").val('');
	$("#addDepartmentId").val('');
	
	$("#addProduct").html('');//清除产品信息
	$("#addProduct").html("<option value=''>--请选择--</option>");
	$("#addProduct").trigger('chosen:updated');
	
	$("#addProduct").chosen({no_results_text: "没有匹配项", search_contains: true});
	
    $('.chosen-container').width('100%');
    
	$("#addProductExamTime").html('');//清除考期信息       
	$("#addProductExamTime").html("<option value=''>--请选择--</option>");
	$("#addProductExamTime").trigger('chosen:updated');
	$("#addProductExamTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    $('.chosen-container').width('100%');
    
    var randNum = MathRand();
	//重新生成表格内容                                                                                                                                                                                             
	var temp ='<tr id="tr'+randNum+'">                                                                                                                                                                                              '
			+	'	<td>                                                                                                                                                                                           '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                                                                        '
//			+	'		<select class="form-control lessonPlanUnitId" name="detailList[0].lessonPlanUnitId" data-bv-field="detailList[0].lessonPlanUnitId" onchange="setName(this)">                                                                                                                     '
			+	'		<select class="lessonPlanUnitId" name="detailList[0].lessonPlanUnitId" data-bv-field="detailList[0].lessonPlanUnitId" onchange="setName(this)">                                                                                                                     '
			+ lessonPlanUnitList//单元option
			+	'		</select>                                                                                                                                                                                  '
			+	'		<input type="hidden" name="detailList[0].lessonPlanUnitName" class="form-control lessonPlanUnitName" data-bv-field="detailList[0].lessonPlanUnitName"/>'
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control schoolTime" name="detailList[0].schoolTime" data-bv-field="detailList[0].schoolTime"/>                                                                                                                     '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                                                                        '
//			+	'		<select class="form-control schoolRoomId" name="detailList[0].schoolRoomId" data-bv-field="detailList[0].schoolRoomId" onchange="setName(this)">                                                                                                                             '
			+	'		<select class="schoolRoomId" name="detailList[0].schoolRoomId" data-bv-field="detailList[0].schoolRoomId" onchange="setName(this)">                                                                                                                             '
			+ schoolRoomList //教室option 
			+	'		</select>                                                                                                                                                                                  '
			+   '		<input type="hidden" name="detailList[0].schoolRoomName" class="form-control schoolRoomName" data-bv-field="detailList[0].schoolRoomName"/>'
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control schoolRoomPay" onblur="validataInt(this)" name="detailList[0].schoolRoomPay" data-bv-field="detailList[0].schoolRoomPay" style="width:70px"/>                                                                                                               '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                                                                        '
//			+	'		<select type="text" class="form-control teacherId" name="detailList[0].teacherId" data-bv-field="detailList[0].teacherId" onchange="setName(this)">                                                                                                                       '
			+	'		<select type="text" class="teacherId" name="detailList[0].teacherId" data-bv-field="detailList[0].teacherId" onchange="setName(this)">                                                                                                                       '
			+ teacherList //教师option
			+	'		</select>                                                                                                                                                                                  '
			+   '		<input type="hidden" class="form-control teacherName" name="detailList[0].teacherName" data-bv-field="etailList[0].teacherName"'	
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control teacherPay" onblur="validataInt(this)" name="detailList[0].teacherPay" data-bv-field="detailList[0].teacherPay" style="width:70px"/>                                                                                                                     '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control classroomTeacher" name="detailList[0].classroomTeacher" data-bv-field="detailList[0].classroomTeacher" style="width:70px"/>                                                                                                         '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control classroomTeacherPay" onblur="validataInt(this)" name="detailList[0].classroomTeacherPay" data-bv-field="detailList[0].classroomTeacherPay" style="width:70px"/>                                                                                                   '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control studentsSize" onblur="validataInt(this)" name="detailList[0].studentsSize" data-bv-field="detailList[0].studentsSize" style="width:70px"/>                                                                                                                 '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
//			+	'		<input type="file" id="uploadFile" name="myfile" class="form-control coursewareContent uploadFile" data-bv-field="myfile"/>                                                                                       '
//			+	'		<input type="hidden" id="uploadFileName" name="detailList[0].courseware" class="form-control courseware uploadFileName" data-bv-field="detailList[0].courseware"/>                                                                                '
			+	'		<button id="upload'+randNum+'" type="button" class="btn btn-primary" data-toggle="button" onclick="openUploadW(this)">文件上传</button>                                                                                       '
			+   '       <input type="hidden" name="detailList[0].courseware" class="form-control courseware uploadFileName" data-bv-field="detailList[0].courseware"/>  '
			+   '       <input type="hidden" name="detailList[0].fileUrl" class="form-control courseware uploadFileUrl" data-bv-field="detailList[0].fileUrl"/>  '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<a href="javascript:void(0);" onclick="addRow(this)"><i data-index="1" class="fa  fa-plus-circle payment-btn blue control-label" style="font-size:20px"></i></a>  '   
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+'</tr>                                                                                                                                                                                               ';
	$("#addTbody").html(temp);
	uploadFile();//加载bootstrap-fileUp的样式
	//期待回访日期-格式化
	 $(".schoolTime").datetimepicker({
	     language: 'zh',
	     format: 'yyyy-mm-dd hh:ii:ss',
	     autoclose: true,
	     pickerPosition:'top-right'
	 });
	
	$.ajax({
        "type": "Post",
        "url": ctx + "/proSchoolRoom/findDepartMent",
        "dataType": "json",
        "success": function (data) {
        	var str = '';
        	for(var i=0; i<data.length; i++) {
        		str += '<option value="'+data[i].departmentId+'">'+data[i].shortName+'</option>';
        		//下面三行用到了select2.js插件(单选下拉框搜索功能)
        	}
        	$("#addDepartment").html(str);
//        	$("#addDepartment").trigger('chosen:updated');
//        	$("#addDepartment").chosen({no_results_text: "没有匹配项", search_contains: true});
//     	    $('.chosen-container').width('100%');
        	$('.selectpicker').selectpicker('refresh');
        }
    });
	
	 $.ajax({
	        url: ctx + '/consultInfoManage/selectProductModel',
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	            var zxkc = "";
	            for (var i = 0; i < data.length; i++) {
	            	zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
	            }
	            $("#addProductModel").html('<option value="">--请选择--</option>' + zxkc);
	            $('#addProductModel').trigger('chosen:updated');
	            $("#addProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
	            $('.chosen-container').width('100%');
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	   });
	 
})

//产品模型下拉框发生变化，产品下拉框跟着发生变化
function generatePro(obj) {
	var productModelId = $(obj).val();
	//如果产品模型发生变化，就制空产品考期
	
	$(obj).parents('form').find("select[name='productExamTimeId']").html("<option value=''>--请选择--</option>");
	$(obj).parents('form').find("select[name='productExamTimeId']").trigger('chosen:updated');
	$(obj).parents('form').find("select[name='productExamTimeId']").chosen({no_results_text: "没有匹配项", search_contains: true});
    $('.chosen-container').width('100%');
	 
	if(productModelId==null || productModelId=='') {
		//如果产品模型选择的是空，就制空产品
		$(obj).parents('form').find("select[name='productId']").html("<option value=''>--请选择--</option>");
		$(obj).parents('form').find("select[name='productId']").trigger('chosen:updated');
		$(obj).parents('form').find("select[name='productId']").chosen({no_results_text: "没有匹配项", search_contains: true});
        $('.chosen-container').width('100%');
	} else {
		//通过产品模型id查询产品
		var conditions = "product_model_id = '"+productModelId+"'";
		$.ajax({
		      type: "POST",
		      url: ctx + '/consultInfoManage/findProductOption',
		      data: {"conditions":conditions},
		      dataType: 'json',
		      success: function (data) {
		          if (data.status == "success") {
		             var str = "";
	            	 for(var i=0; i<data.data.length; i++) {
	            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
	            	 }
	            	 $(obj).parents('form').find("select[name='productId']").html('<option value="">--请选择--</option>' + str);
	            	 //加载下拉框样式
	            	 $(obj).parents('form').find("select[name='productId']").trigger('chosen:updated');
	            	 $(obj).parents('form').find("select[name='productId']").chosen({no_results_text: "没有匹配项", search_contains: true});
	            	 $('.chosen-container').width('100%');
		          } else {
		              toastr.error(data.msg);//没有符合条件的产品
		          }
		      }
		  });
	}
}

//产品下拉框发生变化，考期下拉框也要跟着发生变化
function generateExamTime(obj) {
	var productId = $(obj).val();
	if(productId==null || productId=='') {
		//如果产品选择的是空，就制空考期
		$(obj).parents('form').find('select[name="productExamTimeId"]').html("<option value=''>--请选择--</option>");
		$(obj).parents('form').find('select[name="productExamTimeId"]').trigger('chosen:updated');
		$(obj).parents('form').find('select[name="productExamTimeId"]').chosen({no_results_text: "没有匹配项", search_contains: true});
    	 $('.chosen-container').width('100%');
	} else {
		//得到产品考期信息 
		$.ajax({
			url : ctx + '/consultConsoleRL/getExamTimesOld',//查询当前时间处于考期起止时间内的信息
			type : 'post',
			dataType : 'json',
			data : {productId: productId},
			success : function(info){
				if (info == null || info.length == 0){//如果没有考期信息
					$(obj).parents('form').find('select[name="productExamTimeId"]').html('<option value=" ">--请选择--<option/>');
					$(obj).parents('form').find('select[name="productExamTimeId"]').trigger('chosen:updated');
					$(obj).parents('form').find('select[name="productExamTimeId"]').chosen({no_results_text: "没有匹配项", search_contains: true});
					return;
				}
				var exm = '';
				for (var m = 0; m < info.length; m++) {
					//class=init,考期列表第一次初始化回显标志，只有第一次查看时考期的option需要做回显
					exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
				}
				$(obj).parents('form').find('select[name="productExamTimeId"]').html('<option value=" ">--请选择--<option/>'+exm);
				$(obj).parents('form').find('select[name="productExamTimeId"]').trigger('chosen:updated');
				$(obj).parents('form').find('select[name="productExamTimeId"]').chosen({no_results_text: "没有匹配项", search_contains: true});
			},
			error: function (response) {
				toastr.error("不存在考期");
			}
		})
	}
}
//全局变量，用于存储每次查询生成的单元信息option
var lessonPlanUnitList;
//查询单元信息
function selectPlanUnit() {
	$.ajax({
		url : ctx + '/proLessonPlan/selectBaseTable',
		type : 'post',
		dataType : 'json',
		data : {table:"lessonPlanUnit",enable:1},
		success : function(info){
			var str = '<option value="">--请选择--</option>';
			if(info.status=="success"){
				for(var i=0; i<info.data.length; i++) {
					str += '<option value="'+info.data[i].productLessonPlanUnitId+'">'+info.data[i].productLessonPlanUnitName+'</option>';
				}
			}
			$("#subjectAdd").find("select[name='lessonPlanUnitId']").html(str);
//			$("#subjectAdd").find("select[name='lessonPlanUnitId']").trigger('chosen:updated');
//     	    $("#subjectAdd").find("select[name='lessonPlanUnitId']").chosen({no_results_text: "没有匹配项", search_contains: true});
//     	    $('.chosen-container').width('100%');
     	    
     	   lessonPlanUnitList = str;
		}
	});
}
selectPlanUnit();

//全局变量，用于存储每次生成的教室集合
var schoolRoomList;
//查询教室信息
function selectSchoolRoom() {
	$.ajax({
		url : ctx + '/proLessonPlan/selectBaseTable',
		type : 'post',
		dataType : 'json',
		data : {table:"schoolRoom",enable:1},
		success : function(info){
			var str = '<option value="">--请选择--</option>';
			if(info.status=="success"){
				for(var i=0; i<info.data.length; i++) {
					str += '<option value="'+info.data[i].schoolRoomId+'">'+info.data[i].schoolRoomName+'</option>';
				}
			}
			$("#subjectAdd").find("select[name='schoolRoomId']").html(str);
//			$("#subjectAdd").find("select[name='schoolRoomId']").trigger('chosen:updated');
//     	    $("#subjectAdd").find("select[name='schoolRoomId']").chosen({no_results_text: "没有匹配项", search_contains: true});
//     	    $('.chosen-container').width('100%');
     	    
     	   schoolRoomList = str;
		}
	});
}
selectSchoolRoom();

//全局变量，用于生成每次查询生成的教室option
var teacherList;
//查询教师信息
function selectTeacher() {
	$.ajax({
		url : ctx + '/proLessonPlan/selectBaseTable',
		type : 'post',
		dataType : 'json',
		data : {table:"teacher",enable:1},
		success : function(info){
			var str = '<option value="">--请选择--</option>';
			if(info.status=="success"){
				for(var i=0; i<info.data.length; i++) {
					str += '<option value="'+info.data[i].teacherId+'">'+info.data[i].teacherName+'</option>';
				}
			}
			$("#subjectAdd").find("select[name='teacherId']").html(str);
//			$("#subjectAdd").find("select[name='teacherId']").trigger('chosen:updated');
//     	    $("#subjectAdd").find("select[name='teacherId']").chosen({no_results_text: "没有匹配项", search_contains: true});
//     	    $('.chosen-container').width('100%');
     	    
     	   teacherList = str;
		}
	});
}
selectTeacher();

//全局变量，存储所有关联考期
var examTimeList;
function selectExamTime() {
	$.ajax({
		url : ctx + '/proLessonPlan/selectBaseTable',
		type : 'post',
		dataType : 'json',
		data : {table:"examTime",enable:1},
		success : function(info){
			var str = '<option value="">--请选择--</option>';
			if(info.status=="success"){
				for(var i=0; i<info.data.length; i++) {
					str += '<option value="'+info.data[i].productExamTimeName+'">'+info.data[i].productExamTimeName+'</option>';
				}
			}
			$("#productExamTime").html(str);
			examTimeList = str;
		}
	});
}
selectExamTime();

$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	  
    	 var options = form.serialize();
    	 var departmentId = $("#addDepartment").val();
    	  
    	 if(departmentId!=null && departmentId!='') {
//    		 var departmentName = $("#addDepartment").find(":selected").text();
//    		 options += '&departmentName='+departmentName;
    		 $("#addDepartment").find(":selected").each(function(i,e){
    			 var departmentName = $(e).text();
    			 options += '&departmentName='+departmentName;
    		 });
    	 }
    	 var productModelId = $("#addProductModel").val();
    	 if(productModelId!=null && productModelId!='') {
    		 var productModelName = $("#addProductModel").find(":selected").text();
    		 options += '&productModelName='+productModelName;
    	 }
    	 var productId = $("#addProduct").val();
    	 if(productId!=null && productId!='') {
    		 var productName = $("#addProduct").find(":selected").text();
    		 options += '&productName='+productName;
    	 }
    	 var productExamTimeId = $("#addProductExamTime").val();
    	 if(productExamTimeId!=null && productExamTimeId!='') {
    		 var productExamTimeName = $("#addProductExamTime").find(":selected").text();
    		 options += '&productExamTimeName='+productExamTimeName;
    	 }
    	 var schoolRoomId = $('#subjectAdd').find("select[name='schoolRoomId']").val();
    	 if(schoolRoomId!=null && schoolRoomId!='') {
    		 var schoolRoomName = $('#subjectAdd').find("select[name='schoolRoomId']").find(":selected").text();
    		 options += '&schoolRoomName='+schoolRoomName;
    	 }
    	 var teacherId = $('#subjectAdd').find("select[name='teacherId']").val();
    	 if(teacherId!=null && teacherId!='') {
    		 var teacherName = $('#subjectAdd').find("select[name='teacherId']").find(":selected").text();
    		 options += '&teacherName='+teacherName;
    	 }
    	 $.ajax({
             "type": "Post",
             "url": ctx + "/proLessonPlan/addLessonPlan",
             "dataType": "json",
             "data": options,
             "success": function (data) {
                 $(".subjectAdd").modal("hide");
                 DataTable.init();
                 if(data.status=="success") {
                 	toastr.success("新增成功");
                 } else {
                 	toastr.error("新增失败");
                 }
             }
         });
    }
});

//上传文件方法
//function uploadFile() {
//	$(".uploadFile").fileinput({
//	    //上传的地址
//	    uploadUrl: ctx + "/proLessonPlan/uploadFile",
//	    uploadAsync : true, //默认异步上传
//	    showUpload : true, //是否显示上传按钮,跟随文本框的那个
//	    showRemove : true, //显示移除按钮,跟随文本框的那个
//	    showCaption : true,//是否显示标题,就是那个文本框
//	    showPreview : false, //是否显示预览,不写默认为true
//	    dropZoneEnabled : false,//是否显示拖拽区域，默认不写为true，但是会占用很大区域
//	    //minFileCount: 0,
//	    maxFileCount : 1, //表示允许同时上传的最大文件个数
//	    enctype : 'multipart/form-data',
//	    validateInitialCount : true,
//	    previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
//	    msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
//	    allowedFileTypes : [ 'txt','jpg' ],//配置允许文件上传的类型
//	    allowedPreviewTypes : [ 'txt','jpg' ],//配置所有的被预览文件类型
//	    allowedPreviewMimeTypes : [ 'txt','jpg' ],//控制被预览的所有mime类型
//	    language : 'zh'
//	}).on('fileerror', function(event, data, msg) {//异步上传返回结果处理-失败
//	    console.log("fileerror");
//	    console.log(data);
//	}).on("fileuploaded", function(event, data, previewId, index) {
//	    console.log("fileuploaded");
////	    var ref = $(this).attr("data-ref");
////	    $("input[name='" + ref + "']").val(data.response.url);
//	    //返回上传成功的文件名称
//	    $(this).parents("tr").find(".uploadFileName").val(data.response.url);
//	});
//}
//uploadFile();//初始化上传文件控件
//加载表单
var DataTable = function () {
    return {
        init: function () {
            var dutyTable = $('#moneyKind').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/proLessonPlan/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表总共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {"mData": "lessonPlan.departmentName", 'sClass': "text-center","mRender": function (data, type, full) {
                    	
                    	return '<p style="max-width: 400px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" title="'+data+'">'+data+'</p>';
                    }},
                    {"mData": "lessonPlan.productModelName", 'sClass': "text-center"},
                    {"mData": "lessonPlan.productName", 'sClass': "text-center","mRender": function (data, type, full) {
                    	
                    	return data
                    }},
                    {"mData": "lessonPlan.productExamTimeName", 'sClass': "text-center"},
                    {"mData": "schoolTime", 'sClass': "text-center"},
                    {"mData": "schoolRoomName", 'sClass': "text-center"},
                    {"mData": "schoolRoomPay", 'sClass': "text-center"},
                    {"mData": "teacherName", 'sClass': "text-center"},
                    {"mData": "teacherPay", 'sClass': "text-center"},
                    {
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' 
                            	+ full["lessonPlan"].lessonPlanId
                                + '\',\'' + full["lessonPlanUnitId"]
                            	+ '\',\'' + full["schoolTime"]
                            	+ '\',\'' + full["schoolRoomId"]
                            	+ '\',\'' + full["schoolRoomPay"]
                                + '\',\'' + full["teacherId"]
	                            + '\',\'' + full["teacherPay"]
	                            + '\',\'' + full["classroomTeacher"]
	                            + '\',\'' + full["classroomTeacherPay"]
	                            + '\',\'' + full["studentsSize"]
                            	+ '\',\'' + full["courseware"]
                            	+ '\',\'' + full["lessonPlan"].departmentName
                            	+ '\',\'' + full["lessonPlan"].departmentId
                            	+ '\',\'' + full["lessonPlan"].productModelId
                            	+ '\',\'' + full["lessonPlan"].productId
                            	+ '\',\'' + full["lessonPlan"].productExamTimeId
                            	+ '\',\'' + full["detailId"]
                            	+ '\',\'' + full["lessonPlanUnitName"]
                            	+ '\',\'' + full["schoolRoomName"]
                            	+ '\',\'' + full["teacherName"]
                        	    + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["detailId"] + '\')" class="delete"> <i class="fa fa-trash-o danger" title="删除"></i></a>';
                            return u+"|"+d ;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {}
            });

            //每页显示记录数
            $('#moneyKind_wrapper .dataTables_info').parent().append($('#moneyKind_wrapper .dataTables_length'));
        }
    }
}();

//数据初始化
$("#moneyKind tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#moneyKind tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();
//鼠标点击搜索事件
$(".search-btn").click(function () {
	DataTable.init();
})

//按考期搜索，考期变化，进行查询
function changeByExam() {
	DataTable.init();
}

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    
    aoData.push({"name": "lessonPlan.searchVal", "value": searchVal});
    
    var productExamTimeName = $("#productExamTime").val();
    if(productExamTimeName!=null && productExamTimeName!='') {
    	 aoData.push({"name": "lessonPlan.productExamTimeName", "value": productExamTimeName});
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

//编辑取值
function edit(lessonPlanId,lessonPlanUnitId,schoolTime,schoolRoomId,schoolRoomPay,teacherId,teacherPay,
		classroomTeacher,classroomTeacherPay,studentsSize,courseware,
		departmentName,departmentId,productModelId,productId,productExamTimeId,detailId,
		lessonPlanUnitName,schoolRoomName,teacherName) {
	debugger;
	//让确定按钮重新生效
	$("#subjectEdit").find("button[type='submit']").prop("disabled",false);
	var randNum = MathRand();
	//重新生成表格内容                                                                                                                                                                                             
	var temp ='<tr>                                                                                                                                                                                              '
			+	'	<td>                                                                                                                                                                                           '
			+   '       <input type="hidden" name="detailList[0].detailId" value="'+detailId+'"/>'
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                                                                        '
//			+	'		<select class="form-control lessonPlanUnitId" name="detailList[0].lessonPlanUnitId" data-bv-field="detailList[0].lessonPlanUnitId" onchange="setName(this)">                                                                                                                     '
			+	'		<select class="lessonPlanUnitId" name="detailList[0].lessonPlanUnitId" data-bv-field="detailList[0].lessonPlanUnitId" onchange="setName(this)">                                                                                                                     '
//			+ lessonPlanUnitList//单元option
			+	'		</select>                                                                                                                                                                                  '
			+	'		<input type="hidden" name="detailList[0].lessonPlanUnitName" class="form-control lessonPlanUnitName" data-bv-field="detailList[0].lessonPlanUnitName"/>'
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control schoolTime" name="detailList[0].schoolTime" data-bv-field="detailList[0].schoolTime"/>                                                                                                                     '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                                                                        '
//			+	'		<select class="form-control schoolRoomId" name="detailList[0].schoolRoomId" data-bv-field="detailList[0].schoolRoomId" onchange="setName(this)">                                                                                                                             '
			+	'		<select class="schoolRoomId" name="detailList[0].schoolRoomId" data-bv-field="detailList[0].schoolRoomId" onchange="setName(this)">                                                                                                                             '
//			+ schoolRoomList //教室option 
			+	'		</select>                                                                                                                                                                                  '
			+   '		<input type="hidden" name="detailList[0].schoolRoomName" class="form-control schoolRoomName" data-bv-field="detailList[0].schoolRoomName"/>'
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control schoolRoomPay" onblur="validataInt(this)" name="detailList[0].schoolRoomPay" data-bv-field="detailList[0].schoolRoomPay" style="width:70px"/>                                                                                                               '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                                                                        '
//			+	'		<select type="text" class="form-control teacherId" name="detailList[0].teacherId" data-bv-field="detailList[0].teacherId" onchange="setName(this)">                                                                                                                       '
			+	'		<select type="text" class="teacherId" name="detailList[0].teacherId" data-bv-field="detailList[0].teacherId" onchange="setName(this)">                                                                                                                       '
//			+ teacherList //教师option
			+	'		</select>                                                                                                                                                                                  '
			+   '		<input type="hidden" class="form-control teacherName" name="detailList[0].teacherName" data-bv-field="etailList[0].teacherName"'	
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control teacherPay" onblur="validataInt(this)" name="detailList[0].teacherPay" data-bv-field="detailList[0].teacherPay" style="width:70px"/>                                                                                                                     '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control classroomTeacher" name="detailList[0].classroomTeacher" data-bv-field="detailList[0].classroomTeacher" style="width:70px"/>                                                                                                         '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control classroomTeacherPay" onblur="validataInt(this)" name="detailList[0].classroomTeacherPay" data-bv-field="detailList[0].classroomTeacherPay" style="width:70px"/>                                                                                                   '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<input type="text" class="form-control studentsSize" onblur="validataInt(this)" name="detailList[0].studentsSize" data-bv-field="detailList[0].studentsSize" style="width:70px"/>                                                                                                                 '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			//查看和下载弹框
//			+   '        <a href="javascript:void(0);" onclick="openDownWin(\''+detailId+'\')"><i data-index="1" class="fa fa-edit payment-btn blue control-label" style="font-size:20px" data-toggle="modal" data-target=".download-file"></i></a>'
			+   '		<a href="javascript:void(0);"  onclick="openDownWin(\''+detailId+'\')" style="margin:0" data-toggle="modal" data-target=".download-file" class="btn btn-warning shiny">查看</a>'	
//			+	'	|    <a href="javascript:void(0);"  id="edit'+randNum+'" onclick="openUploadW(this)"><i data-index="1" class="fa fa-search warning" style="font-size:20px" data-toggle="modal"></i></a>'
			+   '	|    <a href="javascript:void(0);"   id="edit'+randNum+'" onclick="openUploadW(this)" style="margin:0" class="btn btn-info shiny">新增</a>'	
//			+	'	|    <a href="javascript:void(0);"  id="edit'+randNum+'" onclick="editUploadW(this)"><i data-index="1" class="fa fa-search warning" style="font-size:20px" data-toggle="modal"></i></a>'
			+   '       <input type="hidden" name="detailList[0].courseware" class="form-control courseware uploadFileName" data-bv-field="detailList[0].courseware"/>  '
			+   '       <input type="hidden" name="detailList[0].fileUrl" class="form-control courseware uploadFileUrl" data-bv-field="detailList[0].fileUrl"/>  '
//			+	'		<input type="text" name="detailList[0].courseware" class="form-control courseware uploadFileName" data-bv-field="detailList[0].courseware"/>                                                                                '
//			+	'		<input type="file" name="myfile" class="form-control uploadFile" data-bv-field="myfile"/>                                                                                       '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+	'<td>                                                                                                                                                                                              '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                                                                        '
			+	'		<a href="javascript:void(0);" onclick="addRow(this)"><i data-index="1" class="fa  fa-plus-circle payment-btn blue control-label" style="font-size:20px"></i></a>      '
			+	'	</div>                                                                                                                                                                                         '
			+	'</td>                                                                                                                                                                                             '
			+'</tr>                                                                                                                                                                                               ';
	$("#editTbody").html(temp);
	uploadFile();//加载bootstrap-fileUp的样式
	//期待回访日期-格式化
	 $(".schoolTime").datetimepicker({
	     language: 'zh',
	     format: 'yyyy-mm-dd hh:ii:ss',
	     autoclose: true,
	     pickerPosition:'top-right'
	 });
	 
//回显信息
$("#lessonPlanId").val(lessonPlanId);
//回显主键
$("#detailId").val(detailId);

//回显单元名称
$('#subjectEdit .lessonPlanUnitName').val(lessonPlanUnitName);
//回显教室名称
$('#subjectEdit .schoolRoomName').val(schoolRoomName);
//回显教师名称
$('#subjectEdit .teacherName').val(teacherName);

//$('#subjectEdit .lessonPlanUnitId').val(lessonPlanUnitId);
if(schoolTime==null || schoolTime=='' || schoolTime=='undefined') {
	$('#subjectEdit .schoolTime').val('');
} else {
	$('#subjectEdit .schoolTime').val(schoolTime);
}
//$('#subjectEdit .schoolRoomId').val(schoolRoomId);
if(schoolRoomPay==null || schoolRoomPay=='' || schoolRoomPay=='undefined') {
	$('#subjectEdit .schoolRoomPay').val('');
} else {
	$('#subjectEdit .schoolRoomPay').val(schoolRoomPay);
}
//$('#subjectEdit .teacherId').val(teacherId);
if(teacherPay==null || teacherPay=='' || teacherPay=='undefined') {
	$('#subjectEdit .teacherPay').val('');
} else {
	$('#subjectEdit .teacherPay').val(teacherPay);
}
if(classroomTeacher==null || classroomTeacher=='' || classroomTeacher=='undefined') {
	$('#subjectEdit .classroomTeacher').val('');
} else {
	$('#subjectEdit .classroomTeacher').val(classroomTeacher);
}
if(classroomTeacherPay==null || classroomTeacherPay=='' || classroomTeacherPay=='undefined') {
	$('#subjectEdit .classroomTeacherPay').val('');
} else {
	$('#subjectEdit .classroomTeacherPay').val(classroomTeacherPay);
}
if(studentsSize==null || studentsSize=='' || studentsSize=='undefined') {
	$('#subjectEdit .studentsSize').val('');
} else {
	$('#subjectEdit .studentsSize').val(studentsSize);
}
//回显已上传课件名称
if(courseware==null || courseware=='' || courseware=='undefined') {
	$('#subjectEdit .courseware').val('');
	$('#subjectEdit .courseware').prop("display","none");
} else {
	$('#subjectEdit .courseware').val(courseware);
	//将hidden项设置为
	$('#subjectEdit .courseware').prop("display","block");
//	$('#subjectEdit .courseware').style.visibility="visible";
}
//回显部门id
if(departmentId==null || departmentId=='') {
	$('#subjectEdit .departmentId').val('');
} else {
	$('#subjectEdit .departmentId').val(departmentId);
}
//回显部门名称
if(departmentName==null || departmentName=='') {
	$('#subjectEdit .departmentName').val('');
} else {
	$('#subjectEdit .departmentName').val(departmentName);
}

//查询所有产品模型
$("#editProductModel").html("");
$.ajax({
       url: ctx + '/consultInfoManage/selectProductModel',
       type: 'POST',
       dataType: 'json',
       success: function (data) {
           var zxkc = "";
           for (var i = 0; i < data.length; i++) {
        	   if(data[i].modelId==productModelId) {
        		   zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"' selected>" + data[i].modelName + "</option>";
        	   } else {
        		   zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
        	   }
           }
           $("#editProductModel").html('<option value="">--请选择--</option>' + zxkc);
           $('#editProductModel').trigger('chosen:updated');
           $("#editProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
           $('.chosen-container').width('100%');
       },
       error: function (response) {
           toastr.error("系统错误");
       }
  });
	
//如果产品id不为空
	if(productId!=null &&　productId!='') {
		//通过产品模型id查询产品-回显产品
		var conditions = "product_model_id = '"+productModelId+"'";
		$.ajax({
		      type: "POST",
		      url: ctx + '/consultInfoManage/findProductOption',
		      data: {"conditions":conditions},
		      dataType: 'json',
		      success: function (data) {
		    	  var str = "";
		          if (data.status == "success") {
	            	 for(var i=0; i<data.data.length; i++) {
	            		 if(data.data[i].product_id==productId) {
	            			 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + " selected>" + data.data[i].product_name + "</option>";
	            		 } else {
	            			 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
	            		 }
	            	 }
		          } else {
		              //toastr.error(data.msg);//没有符合条件的产品
		          }
		         $("#editProduct").html('<option value="">--请选择--</option>' + str);
	         	 //加载下拉框样式
	         	 $("#editProduct").trigger('chosen:updated');
	         	 $("#editProduct").chosen({no_results_text: "没有匹配项", search_contains: true});
	         	 $('.chosen-container').width('100%');
		      }
		  });
		
		
		//如果考期不为空
		if(productExamTimeId!=null && productExamTimeId!='') {
			//回显产品考期信息 
			$.ajax({
				url : ctx + '/consultConsoleRL/getExamTimesOld',//查询当前时间处于考期起止时间内的信息
				type : 'post',
				dataType : 'json',
				data : {productId: productId},
				success : function(info){
					if (info == null || info.length == 0){//如果没有考期信息
						$('#editProductExamTime').html('<option value=" ">--请选择--<option/>');
						$('#editProductExamTime').trigger('chosen:updated');
						$("#editProductExamTime").chosen({no_results_text: "没有匹配项", search_contains: true});
						return;
					}
					
					var exm = '';
					for (var m = 0; m < info.length; m++) {
						if(info[m].productExamTimeId==productExamTimeId) {
							exm += "<option value='"+info[m].productExamTimeId+"' selected>"+info[m].examTime+"</option>";
						} else {
							exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
						}
					}
					$('#editProductExamTime').html('<option value=" ">--请选择--<option/>'+exm);
					$('#editProductExamTime').trigger('chosen:updated');
					$("#editProductExamTime").chosen({no_results_text: "没有匹配项", search_contains: true});
					$('.chosen-container').width('100%');
				},
				error: function (response) {
					toastr.error("不存在考期");
				}
			})
		} else {
			$('#editProductExamTime').html('<option value=" ">--请选择--<option/>');
			$('#editProductExamTime').trigger('chosen:updated');
			$("#editProductExamTime").chosen({no_results_text: "没有匹配项", search_contains: true});
			$('.chosen-container').width('100%');
		}
		
	} else {
		 $("#editProduct").html('<option value="">--请选择--</option>' + str);
     	 //加载下拉框样式
     	 $("#editProduct").trigger('chosen:updated');
     	 $("#editProduct").chosen({no_results_text: "没有匹配项", search_contains: true});
     	 $('.chosen-container').width('100%');
	}
	//回显产品单元
		$.ajax({
			url : ctx + '/proLessonPlan/selectBaseTable',
			type : 'post',
			dataType : 'json',
			data : {table:"lessonPlanUnit"},
			success : function(info){
				
				var str = '<option value="">--请选择--</option>';
				if(info.status=="success"){
					for(var i=0; i<info.data.length; i++) {
						if(info.data[i].productLessonPlanUnitId==lessonPlanUnitId) {
							str += '<option value="'+info.data[i].productLessonPlanUnitId+'" selected>'+info.data[i].productLessonPlanUnitName+'</option>';
						} else {
							str += '<option value="'+info.data[i].productLessonPlanUnitId+'">'+info.data[i].productLessonPlanUnitName+'</option>';
						}
					}
				}
				$("#subjectEdit").find("select.lessonPlanUnitId").html(str);
		     	 lessonPlanUnitList = str;
			}
		});
	
	//回显教室配置信息
	$.ajax({
		url : ctx + '/proLessonPlan/selectBaseTable',
		type : 'post',
		dataType : 'json',
		data : {table:"schoolRoom"},
		success : function(info){
			var str = '<option value="">--请选择--</option>';
			if(info.status=="success"){
				for(var i=0; i<info.data.length; i++) {
					if(info.data[i].schoolRoomId==schoolRoomId) {
						str += '<option value="'+info.data[i].schoolRoomId+'" selected>'+info.data[i].schoolRoomName+'</option>';
					} else {
						str += '<option value="'+info.data[i].schoolRoomId+'">'+info.data[i].schoolRoomName+'</option>';
					}
				}
			}
			$("#subjectEdit").find("select.schoolRoomId").html(str);
     	   schoolRoomList = str;
		}
	});
	//回显教师信息
	$.ajax({
		url : ctx + '/proLessonPlan/selectBaseTable',
		type : 'post',
		dataType : 'json',
		data : {table:"teacher"},
		success : function(info){
			var str = '<option value="">--请选择--</option>';
			if(info.status=="success"){
				for(var i=0; i<info.data.length; i++) {
					if(info.data[i].teacherId==teacherId) {
						str += '<option value="'+info.data[i].teacherId+'" selected>'+info.data[i].teacherName+'</option>';
					} else {
						str += '<option value="'+info.data[i].teacherId+'">'+info.data[i].teacherName+'</option>';
					}
				}
			}
			$("#subjectEdit").find("select.teacherId").html(str);
     	   teacherList = str;
		}
	});
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var options = form.serialize();
    	var departmentId = $("#editDepartment").val();
   	 if(departmentId!=null && departmentId!='') {
   		 var departmentName = $("#editDepartment").find(":selected").text();
   		 options += '&departmentName='+departmentName;
   	 }
   	 var productModelId = $("#editProductModel").val();
   	 if(productModelId!=null && productModelId!='') {
   		 var productModelName = $("#editProductModel").find(":selected").text();
   		 options += '&productModelName='+productModelName;
   	 }
   	 var productId = $("#editProduct").val();
   	 if(productId!=null && productId!='') {
   		 var productName = $("#editProduct").find(":selected").text();
   		 options += '&productName='+productName;
   	 }
   	 var productExamTimeId = $("#editProductExamTime").val();
   	 if(productExamTimeId!=null && productExamTimeId!='') {
   		 var productExamTimeName = $("#editProductExamTime").find(":selected").text();
   		 options += '&productExamTimeName='+productExamTimeName;
   	 }
   	 
   	 
        $.ajax({
            "type": "Post",
            "url": ctx + "/proLessonPlan/updateLessonPlan",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                toastr.success("修改成功");
                $('#subjectEdit .editBtn').removeAttr('disabled');
            }
        });

    }
});
////删除
function deleteProject(detailId) {
    swal({
        title: "",
        text: "确定要删除吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            "type": "Post",
            "url": ctx + "/proLessonPlan/deleteLessonPlanDetail",
            "dataType": "json",
            "data": {"detailId": detailId},
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                swal("", "删除成功！", "success");
            }
        });
    });
}

////回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}



//时间初始化
$.fn.datetimepicker.dates['zh'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    meridiem: ["上午", "下午"],
    today: "今天"
};

//增加一行
function addRow(obj) {
	var trLength = $(obj).parents("table").find("tbody tr").length;
	var randNum = MathRand();
	var str = '<tr id="tr'+randNum+'">                                                                                                                                          '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                    '
//			+	'		<select class="form-control lessonPlanUnitId" name="detailList['+trLength+'].lessonPlanUnitId" data-bv-field="detailList['+trLength+'].lessonPlanUnitId" onchange="setName(this)">                                                                 '
			+	'		<select class="lessonPlanUnitId" name="detailList['+trLength+'].lessonPlanUnitId" data-bv-field="detailList['+trLength+'].lessonPlanUnitId" onchange="setName(this)">                                                                 '
			+ lessonPlanUnitList//单元option
			+	'		</select>                                                                                                                              '
			+   '		<input type="hidden" name="detailList['+trLength+'].lessonPlanUnitName" class="form-control lessonPlanUnitName" data-bv-field="detailList['+trLength+'].lessonPlanUnitName"/>'	
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<input type="text" class="form-control schoolTime" name="detailList['+trLength+'].schoolTime" data-bv-field="detailList['+trLength+'].schoolTime" />                                                                 '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                    '
//			+	'		<select class="form-control schoolRoomId" name="detailList['+trLength+'].schoolRoomId" data-bv-field="detailList['+trLength+'].schoolRoomId" onchange="setName(this)">                                                                         '
			+	'		<select class="schoolRoomId" name="detailList['+trLength+'].schoolRoomId" data-bv-field="detailList['+trLength+'].schoolRoomId" onchange="setName(this)">                                                                         '
			+ schoolRoomList //教室option 
			+	'		</select>                                                                                                                              '
			+   '		<input type="hidden" name="detailList['+trLength+'].schoolRoomName" class="form-control schoolRoomName" data-bv-field="detailList['+trLength+'].schoolRoomName"/>'
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<input type="text" class="form-control schoolRoomPay" onblur="validataInt(this)" name="detailList['+trLength+'].schoolRoomPay" data-bv-field="detailList['+trLength+'].schoolRoomPay" style="width:70px"/>                                                           '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12 setName" style="padding:0">                                                                                                                    '
//			+	'		<select type="text" class="form-control teacherId" name="detailList['+trLength+'].teacherId" data-bv-field="detailList['+trLength+'].teacherId" onchange="setName(this)">                                                                   '
			+	'		<select type="text" class="teacherId" name="detailList['+trLength+'].teacherId" data-bv-field="detailList['+trLength+'].teacherId" onchange="setName(this)">                                                                   '
			+ teacherList //教师option
			+	'		</select>                                                                                                                              '
			+   '       <input type="hidden" class="form-control teacherName" name="detailList['+trLength+'].teacherName" data-bv-field="detailList['+trLength+'].teacherName"/>'
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<input type="text" class="form-control teacherPay" onblur="validataInt(this)" name="detailList['+trLength+'].teacherPay" data-bv-field="detailList['+trLength+'].teacherPay" style="width:70px"/>                                                                 '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<input type="text" class="form-control classroomTeacher" name="detailList['+trLength+'].classroomTeacher" data-bv-field="detailList['+trLength+'].classroomTeacher" style="width:70px"/>                                                     '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<input type="text" class="form-control classroomTeacherPay" onblur="validataInt(this)" name="detailList['+trLength+'].classroomTeacherPay" data-bv-field="detailList['+trLength+'].classroomTeacherPay" style="width:70px"/>                                               '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<input type="text" class="form-control studentsSize" onblur="validataInt(this)" name="detailList['+trLength+'].studentsSize" data-bv-field="detailList['+trLength+'].studentsSize" style="width:70px"/>                                                             '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<button id="upload'+randNum+'" type="button" class="btn btn-primary" data-toggle="button" onclick="openUploadW(this)">文件上传</button>                                                                                       '
			+	'		<input type="hidden" name="detailList['+trLength+'].courseware" class="form-control courseware uploadFileName" data-bv-field="detailList['+trLength+'].courseware"/>                                                                                '
			+	'		<input type="hidden" name="detailList['+trLength+'].fileUrl" class="form-control courseware uploadFileUrl" data-bv-field="detailList['+trLength+'].fileUrl"/>                                                                                '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                                         '
			+	'<td>                                                                                                                                          '
			+	'	<div class="col-sm-12" style="padding:0">                                                                                                                    '
			+	'		<a href="javascript:void(0);" onclick="subRow(this)"><i data-index="2" class="fa  fa-minus-circle payment-btn blue control-label" style="font-size:20px"></i></a>           '
			+	'	</div>                                                                                                                                     '
			+	'</td>                                                                                                                 '
			+'</tr>';
	
	$(obj).parents("table").find("tbody").append(str);
	uploadFile();//加载bootStrap-fileUp的样式
	//期待回访日期-格式化
	 $(".schoolTime").datetimepicker({
	     language: 'zh',
	     format: 'yyyy-mm-dd hh:ii:ss',
	     autoclose: true,
	     pickerPosition:'top-right'
	 });
}
//减少一行
function subRow(obj) {
	//减少之前进行判断，只有一行时不再减少
	var rowNum = $(obj).parents("table").find("tbody tr").length;
	if(rowNum==1) {
	} else {
//		$(obj).parents("table").find("tbody tr").eq(rowNum-1).remove();
		$(obj).parents("tr").remove();
		//删除以前生成的上传文件弹窗
		var objId = $(obj).parents("tr").attr("id");
		$("."+objId+"Win").remove();
	}
}

//将下拉框选中的option的文本内容赋值给同级下的隐藏input
function setName(obj) {
	var nameStr = $(obj).find(":selected").text();
	if(nameStr!="--请选择--") {
		$(obj).parents("div.setName").find("input").val(nameStr);
	} else {
		$(obj).parents("div.setName").find("input").val('');
	}
}

//费用、上课人数验证，大于等于0整数
function validataInt(obj) {
	var content = $(obj).val();
	//不为空才进行正则判断
	if(content!=null && content!='') {
		//正则规则
		var reg = /^\d+$/;
		if(!reg.test(content)) {
			$(obj).val('');
			toastr.error('费用、上课人数必须填写大于等于0整数');
		}
	}
}



$.ajax({
    type:"post",
    url:ctx+"/proSchoolRoom/findDepartMentTree",
	dataType : "json",
	success : function(date) {
		$.fn.zTree.init($("#ajaxTree"),setting, date);
	}
});










