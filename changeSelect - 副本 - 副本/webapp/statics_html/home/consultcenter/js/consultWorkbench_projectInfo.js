/**
 * 预约单联动计算量
 * @param record
 * @returns
 */
function loadGT_YYD(record) {
	//公共弹框-客户标签回显
    var infoManageId = $('#infoManageId2').val();
    $('.tag').html('');//清空客户标签内容
    
    $.ajax({
        url: ctx + '/consultInfoManage/getCheckedLableId',
        type: 'POST',
        data: { infoManageId: infoManageId},
        dataType: 'json',
        success: function (data) {
         if(data.list!=null){
	        	var tag = data.list.studentLable.split(',');
	        	
	        	if(tag!= ''){
	        		for(var i = 0; i < tag.length; i++){
	            		$('.tag').append('<p class="label-box text-center"><span>' + tag[i] + '</span>'
	    	    	            + '<i class="fa fa-minus-circle reduce icon-btn tag-close"></i></p>');
	            	}
	        	}
	        }
        }
    });
	
	//初始产品模型,并且回显
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
            	if(data[i].modelId==record.productModelId) {
            		zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"' selected>" + data[i].modelName + "</option>";
            	} else {
            		zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
            	}
            }
            $("#product_model").html('<option value="">--请选择--</option>' + zxkc);
            $('#product_model').trigger('chosen:updated');
            $("#product_model").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
            //1.产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#product_model").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

//当产品部分的下拉框发生改变时，需要制空产品下拉框——查看页面部分,flag-标志是由其它课程信息引起的产品下拉变化
//还是由产品模型改变引起的产品下拉选变化
function clearProduct(flag) {
	//清除子产品下拉选
	$("#childrenProduct").parents(".childrenProduct").remove();
	//清除以前的子产品课程信息数据
	$(".project2").remove();
	//清除以前的子产品缴费信息数据
	$(".projectPayFees2").remove();
	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
	if($("#productId").hasClass("init")) {
//		//如果产品id不为空才回显考期否则不会显现考期
//    	if(productId!=null && productId!="") {
//    		//考期回显-考期是后面新增的下拉选
//    		$("#productId").trigger("change");
//    	}
		$("#productId").removeClass("init");//移除初始化
		return $("#productId").val();
	} 
	$("#productId").html("");
	generateProduct(flag);//开始根据课程信息部分当前选中条件生成产品选项
	$("#productId").trigger('chosen:updated');
	$("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	//2017/11/20添加，清空考期下拉选旧数据;
	$('#kTime').html('');
	$('#kTime').trigger('chosen:updated');
	$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
	
	//2017/12/22添加，清空考试地区和收款方旧数据
	$('#branchSchoolId').html('');
	$('#branchSchoolId').trigger('chosen:updated');
	$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('#payee').html('');
	$('#payee').trigger('chosen:updated');
	$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
}

//动态生成产品-查看信息页面部分
function generateProduct(flag) {
	if(flag) {//如果不是产品模型改变引起的change
		//存放条件
		var conditionArray = new Array();
		$(".project select :selected").each(function(index,obj){
			 
			//得到option的value即id值
			var idValue = $(obj).val();
			//开始拼接产品查询sql条件
			if(idValue!=null && idValue!='') {
				//得到主键列英文名称,option-select
				var primaryIdName = $(obj).parent().prop("id")+"_id";
				var primaryIdValue = "'"+idValue+"'";
				//形如XXX_id = 'YYY'
				var condition = primaryIdName + "=" + primaryIdValue;
				conditionArray.push(condition);
			}
		});
		var conditions = conditionArray.join(" and ");
	} else {//如果是由产品模型改变引起的change
		var conditions = "product_model_id = ";
		conditions += "'" + $("#product_model").val() + "'";
	}
	var departmentId = $("#departmentId1Hidden").val();//信息量归属地id
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions,"departmentId":departmentId},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
            	 }
            	 $("#productId").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#productId").trigger('chosen:updated');
            	 $("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

$(function(){
	  //DMW添加，根据产品类型的选择，动态创建课程信息部分，其它下拉框-查看部分
	    $("#product_model").change(function(){
	    	//清空考期下拉选
	    	$('#kTime').html('');
	    	$('#kTime').trigger('chosen:updated');
			$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
	    	//产品模型发生改变，制空产品下拉框,如果没有制空则会得到初始时的productId
	    	var productId = "";
	    	productId = clearProduct(false);
	    	//得到选中的option的Json信息
	    	var jsonObj = $('#product_model :selected').data("value");
	    	//如果当前模型下没有配置选项
	    	if(jsonObj=="undefined") {
	    		//清除上次选择后生成的下拉框
	        	$(".removeFlag").parent().parent().remove();
	    		return;
	    	}
	    	
	    	//得到产品类型ID
	    	var modelId = $('#product_model :selected').val();
	    	//清除上次选择后生成的下拉框
	    	$(".removeFlag").parent().parent().remove();
	    	//用来组装表名
	    	var tableArray = new Array();
	    	//健壮性判断，如果没有取到产品模型对象jsonObj，不用构造其它课程信息下拉框，查询产品条件只有产品模型
	    	if(null==jsonObj ||　typeof(jsonObj)=="undefined" || jsonObj.length==0) {
	    		//生成考期选项-考期是后面新增的下拉选,子产品,收款方,考试地区
   	            $("#productId").trigger("change");
   	            return;
	    	} else {
	    		//开始构造最新的拼接结果
	    		for(var i=0; i<jsonObj.length; i++) {
	    			var enName = jsonObj[i].enName;
	    			var chName = jsonObj[i].chName;
	    			tableArray.push(enName);  
	    			//开始拼接 
	    			var str = '<div class="form-group col-md-4 col-sm-6">'
	    				+ '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+chName+'</label>'
	    				+ '       <div class="col-sm-9 no-padding-right">'
	    				+ '            <select name="projectMap[\''+enName+'_id\']" id="'+enName+'" onchange="clearProduct(true)" class="form-control removeFlag chosen-select" data-live-search="true">'
	    				+ '            </select>'
	    				+ '			   <input type="hidden" name="projectMap[\''+enName+'_name\']" class="projectInfoManager" />'		
	    				+ '        </div>'
	    				+ '</div>';
	    			//将新增的下拉框拼接到产品类型下拉框后面
	    			$("#product_model").parent().parent().after(str);
	    			//根据表名和产品类型，关联product表，开始构造option
	    		}
	    		var infoManageId = $("#infoManageId2").val();//得到咨询id
	    		var tableName = tableArray.join("---");
	    	}
	    	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
	    	$.ajax({
	            url: ctx + '/consultInfoManage/selectOptionByTable',
	            type: 'POST',
	            dataType: 'json',
	            data: {"tableName":tableName,"modelId":modelId},
	            success: function (data) {
	                if(data==null || data.length==0) {
	                	return;
	                }
	                for (var i = 0; i < data.length; i++) {
	                	var zxkc = "";
	                	for(var j=0; j<data[i].dataList.length; j++) {
	                		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
	                	}
	                	$('#'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
	                	//加载下拉框样式
	                	$('#'+data[i].tableName).trigger('chosen:updated');
	                	$("#"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
	                	$('.chosen-container').width('100%');
	                }
	                //生成考期选项-考期是后面新增的下拉选,子产品,收款方,考试地区
       	            $("#productId").trigger("change");
	            },
	            error: function (response) {
	                toastr.error("系统错误");
	            }
	        });
	    });
});
	
	
	//将从后台得到的表名进行处理得到符合bean中字段格式的字符串，1.剔除_,2.后面的首字母大写
function nameHandler(str) {
  var array = str.toLowerCase();
  array = array.split("_");
  //如果表名为单个单词，即没有_，就返回自身
  if(array.length>1) {
	  //循环从1开始，因为第一个单词不需要进行首字母大写处理
	  for (var i = 1; i < array.length; i++){
		  //每个单词，首字母大写处理
		  array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
	  }
	  var string = array.join("");
	  return string;
  } else {
	  return str;
  }
}


//子产品change事件
function childProChange(obj) {
	var productId = $(obj).val();
	var productName = $(obj).find(":selected").text();
	var productDetail = $(obj).find(":selected").attr("showList");
	
	//清除以前的子产品课程信息数据
	$(".project2").remove();
	//清除以前的子产品缴费信息数据
	$(".projectPayFees2").remove();
	//没有产品详情
//	if(productDetail==''|| productDetail==null || typeof(productDetail)=="undefined") {
//		//清除以前的子产品课程信息数据
//		$(".project2").remove();
//		//清除以前的子产品缴费信息数据
//		$(".projectPayFees2").remove();
//	}
	 
	if(productId!=null && productId!='' && typeof(productId)!="undefined") {
		//清除以前的数据
		$(".project2").remove();
		//开始拼接子产品课程信息
		$(".projectPayFees").after('<div class="well with-header project2">'
								+ '<div class="header bordered-blue">'
								+ '	<div style="float:left">'
								+ '		<b>子产品课程信息</b>'
								+ '	</div>'
								+ '	<div style="float:right">'
								+ '		<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>'
								+ '	</div>'
								+ '</div>'
								+ '<div class="row form-group-margin">'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ ' 	<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">产品类型'
								+ '		<span class="control-label mandatory">*</span></label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select name="childrenProduct.productModelId" id="childProductModelId" onchange="ChildProModelChange()" class="form-control chosen-select" disabled>'
								+ '			</select>'
								+ '			<input type="hidden" id="childProductModelName" name="childrenProduct.productModelName" class="projectInfoManager2"/>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">产品：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childProductId" name="childrenProduct.productId" onchange="childPro2Change(this)" class="form-control chosen-select" disabled>'
								+ '				<option showList='+productDetail+' value='+productId+' selected>'+productName+'</option>'	
								+ '			</select>'
								+ '			<input id="childProductName" name="childrenProduct.productName" type="hidden" value="'+productName+'"/>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">收款方：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childPayee" name="childrenProduct.payee" class="form-control chosen-select">'
								+ '			</select>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		 <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考期：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childKTime" name="childrenProduct.kTime" onchange="childProExamChange(this)" class="form-control chosen-select init">'
								+ '			</select>'
								+ '			<input name="childrenProduct.kTimeValue" type="hidden">'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		 <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考试地区：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childBranchSchoolId" onchange="childBranchSchoolChange()" name="childrenProduct.branchSchoolId" class="form-control chosen-select">'
								+ '			</select>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="clearfix form-group">'
								+ '		<div class="pull-right padding-right-20">'
								+ '		</div>'
								+ '	</div>'
								+ '</div>'
								+ '</div>');
		
		//公共弹出框中子产品课程信息回显（包括产品模型信息回显等)
	   	loadGT_Child(JSON.parse(productDetail));
	} else {
		//清除以前的数据
		$(".project2").remove();
	}
}

//产品下拉选项联动考期，子产品
//2018-05新增-是否分期复选框
$('.row').on('change', '#productId', function(){
	//清除优惠，服务内容
	$("#updateInfoManage2").find("div.yhzkjf").remove();//清除优惠
	$("#updateInfoManage2").find("div.serviceFees").remove();//清除服务
	//清除之前生成的分期div
	$("#mainInstallmentDiv").remove();
	// 获取selected产品ID
	var productId = $('#productId').val();
//	var productExamTimeId = $('#productExamTimeId').val();
	var examTimeId = $('#examTimeId').val();
	var infoManageId = $("#infoManageId2").val(); 
	//得到产品信息Json格式
	var showList = $(this).find("option:selected").attr("showList");
	if(showList=='' || showList==null || typeof(showList)=='undefined') {
		//如果没有得到产品信息，清除以前的数据，直接退出方法
		$("#childrenProduct").parents(".childrenProduct").remove();//清除子产品下拉选
		$(".project2").remove();//清除课程信息
		$(".projectPayFees2").remove();//清除课程缴费信息
		//清除考期信息
		$('#kTime').html('<option value="">--请选择--<option/>');
		$('#kTime').trigger('chosen:updated');
		$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
		//清除考试地区
		$('#payee').html('<option value="">--请选择--<option/>');
		$('#payee').trigger('chosen:updated');
		$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
		//清除收款方
		$('#branchSchoolId').html('<option value="">--请选择--<option/>');
		$('#branchSchoolId').trigger('chosen:updated');
		$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
		
		return;
	}
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;
		for(var p in showList){
			aiId = p.replace("_id","");
			$('#'+aiId).val(showList[p]);
			$('#'+aiId).trigger('chosen:updated');
		}
	}
	var projectInfoManageId = $("#projectInfoManageId").val();//得到该咨询量对应产品课程信息id
	
	//还原考试地区下拉选
	$("#branchSchoolId").html('');
	$('#branchSchoolId').trigger('chosen:updated');
	$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
	//得到产品考试地区信息 
	$.ajax({
		url : ctx + '/consultConsoleWFC/getBranchSchool',//查询当前选中产品考试地区信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(msg){
			var option = '<option value="">--请选择--<option/>';
			//回显用，查询该咨询量已经选中的考试地区id
			$.ajax({
				url : ctx + '/consultConsoleWFC/getProjectBranchSchool',//查询当前选中产品考试地区信息
				type : 'post',
				dataType : 'json',
				data : {infoManageId:infoManageId,productId:productId},
				success : function(msg2){
					for(var n=0; n<msg.length; n++) {
						if(msg2!=null && msg2.status=="success" && msg2.branchSchoolId==msg[n].branchSchoolId) {
							//如果该咨询量已选中该考试地区
							option += "<option value='"+msg[n].branchSchoolId+"' selected>"+msg[n].fullName+"</option>";
						} else {
							option += "<option value='"+msg[n].branchSchoolId+"'>"+msg[n].fullName+"</option>";
						}
					}
					$("#branchSchoolId").html(option);
					$('#branchSchoolId').trigger('chosen:updated');
					$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
					//触发考试地区的change事件-构造支出费用与合计(第一次初始化页面，考试地区回显时要调用一次）
		             
		    		branchSchoolChange();
				},
				error: function() {
					toastr.error("getProjectBranchSchool出错");
				}
			});
		}
	});
	//还原收款方下拉选
	$("#payee").html('');
	$('#payee').trigger('chosen:updated');
	$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
	//得到产品收款方信息 
	$.ajax({
		url : ctx + '/consultConsoleWFC/getPayee',//查询当前选中产品考试地区信息
		type : 'post',
		dataType : 'json',
		data : {"productId": productId},
		success : function(map){
			var option = '<option value="0">--请选择--<option/>';
			//回显用，查询该咨询量已经选中的收款方信息
			$.ajax({
				url : ctx + '/consultConsoleWFC/getProjectPayee',//查询当前选中产品收款方信息
				type : 'post',
				dataType : 'json',
				data : {infoManageId:infoManageId,productId:productId},
				success : function(map2){
					for(var j=0; j<map.length; j++) {
						if(map2!=null && map2.status=="success" && map2.payeeId==map[j].payeeId) {
							option += "<option value='"+map[j].payeeId+"' selected>"+map[j].payeeName+"</option>";
						} else {
							option += "<option value='"+map[j].payeeId+"'>"+map[j].payeeName+"</option>";
						}
					}
					$("#payee").html(option);
					$('#payee').trigger('chosen:updated');
					$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
				},
				error: function() {
					toastr.error("getProjectPayee出错");
				}
			});
		}
	});
	
	//var departmentId = $("#departmentId").val();//信息量归属地id
	var departmentId = $("#departmentId1Hidden").val();//信息量归属地id
	 
	//得到产品考期信息 
	$.ajax({
		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId, departmentId:departmentId},
		success : function(info){
			 
			if (info == null || info.length == 0){//如果没有考期信息
				$('#kTime').html('<option value=" ">--请选择--<option/>');
				$('#kTime').trigger('chosen:updated');
				$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
				return;
			}
			var exm = '';
			for (var m = 0; m < info.length; m++) {
				//class=init,考期列表第一次初始化回显标志，只有第一次查看时考期的option需要做回显
				if(examTimeId==info[m].examSettingId) {
					exm += "<option value='"+info[m].examSettingId+"' selected>"+info[m].examDate+"</option>";
				} else {
					exm += "<option value='"+info[m].examSettingId+"'>"+info[m].examDate+"</option>";
				}
			}
			$('#kTime').html('<option value="">--请选择--<option/>'+exm);
			$('#kTime').trigger('chosen:updated');
			$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
			
			//考期初始化完成后-生成相应的缴费列表
	         $('#kTime').trigger('change');
		},
		error: function (response) {
            toastr.error("不存在考期");
        }
	})
	
	//清除以前生成的子产品下拉选
	$("#childrenProduct").parents(".childrenProduct").remove();
	$(".selectpicker").selectpicker('refresh');
	 
	//得到产品类型 1-子产品 0-主产品
	//取得产品信息json字符串
	var productInfoStr = $('#productId :selected').attr("showList");
	if(productInfoStr=='' || productInfoStr==null || typeof(productInfoStr)=='undefined') {
		//如果没有得到产品信息，清除以前的数据，直接退出方法
		$(".project2").remove();//清除课程信息
		$(".projectPayFees2").remove();//清除课程缴费信息
		return;
	}
	var productInfoObj = JSON.parse(productInfoStr);
	var productForm = productInfoObj["product_form"];
	 
	if(typeof(productForm)=="undefined" || productForm==null) {
		//如果没有得到产品类型信息（主产品，子产品），清除以前的数据，直接退出方法
		$(".project2").remove();//清除课程信息
		$(".projectPayFees2").remove();//清除课程缴费信息
		return;
	} else {
		if(productForm!="0") {
			//toastr.error("子产品");
			//如果没有得到产品类型信息（主产品，子产品），清除以前的数据，直接退出方法
			$(".project2").remove();//清除课程信息
			$(".projectPayFees2").remove();//清除课程缴费信息
		} else {
			//toastr.error("主产品");
			//得到以前选中的子产品id
			var childProductId = $("#childProductIdHidden").val();
			var departmentId = $("#departmentId1Hidden").val();
			//开始拼接 -根据父产品id查询子产品id
			//查询子产品id属于信息归属地的信息
			$.ajax({
				url : ctx + '/consultConsoleWFC/getChildrenProduct',
				type : 'post',
				dataType : 'json',
				//data : {productParentId: productId},
				data : {productId: productId,"addressId":departmentId},//将主产品id作为参数传递过去
				success : function(data){
					var str = '<div class="form-group col-md-4 col-sm-6 childrenProduct">'
	                    + '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+"子产品"+'</label>'
	                    + '       <div class="col-sm-9 no-padding-right">'
	                    + '            <select id="childrenProduct" onchange="childProChange(this)" class="form-control removeFlag chosen-select" data-live-search="true">'
	                    + ' 				<option value="">--请选择--</option>';
//	                    + '					<option value="1">菠萝</option>'
					if(data.status=="success") {
						for(var i=0; i<data.list.length; i++) {
		                	if(childProductId==data.list[i].product_id) {//如果当前产品id等于子产品id，就设置seleted
		                		str += '<option showList='+JSON.stringify(data.list[i])+' value="'+data.list[i].product_id+'" selected>'+data.list[i].product_name+'</option>';
		                	} else {
		                		str += '<option showList='+JSON.stringify(data.list[i])+' value="'+data.list[i].product_id+'">'+data.list[i].product_name+'</option>';
		                	}
		                }     
					}
	                str += '            </select>'
	                	//+ '             <input type="hidden" name="childrenProduct.productName" class="projectInfoManager" value=""/>'	//子产品产品名称
	                    + '        </div>'
	                    + '</div>';
	    		//将新增的下拉框拼接到产品类型下拉框后面
	    		$("#productId").parent().parent().after(str);
	    		//chosen-select初始化
	    		$('#childrenProduct').trigger('chosen:updated');
				$("#childrenProduct").chosen({no_results_text: "没有匹配项", search_contains: true});
				//触发子产品下拉选change事件
				$('#childrenProduct').trigger('change');
				}
			});
		}
	}
	//判断该产品是否允许分期
	var isInstallment = showList['is_installment'];
	if(isInstallment=='1') {
		//允许分期，生成分期复选框
		var str = '<div class="form-group col-lg-12 col-md-12 col-sm-12" id="mainInstallmentDiv">'
				+       '   <label style="margin-left:50px">'
				+ '     <input type="checkbox" class="installment" onclick="installmentFun(this)"/>'
				+'       <span class="text">是否分期</span>'
				+ '     </label>'
			+ '</div>';
		//将新增的复选框拼接到产品类型下拉框后面
		$("#productId").parent().parent().after(str);
	} else {
		//清除之前生成的分期div
		$("#mainInstallmentDiv").remove();
	}
	//调用一下是否分期复选框的单击事件，初始化分期来源和期次
	installmentFun($("#mainInstallmentDiv").find("input"));
	//为页面隐藏域设置首付款比率
	var downpaymentsRatio = showList['downpayments_ratio'];
	$("#mainDownpaymentsRatio").val(downpaymentsRatio);
})

//考期变换-生成费用选项
$('#kTime').chosen().change(function () {
//	//考试地区清空，让用户重新选择——考试地区生成的支出费用，还需要修改
//	$("#branchSchoolId").val('');
//	$('#branchSchoolId').trigger('chosen:updated');
	//清除优惠，服务内容
	$("#updateInfoManage2").find("div.yhzkjf").remove();//清除优惠
	$("#updateInfoManage2").find("div.serviceFees").remove();//清除服务
	
//    var productExamTimeId = $(this).val();//产品考期ID
    var examTimeId = $(this).val();//产品考期ID
    var productId = $("#productId").val();
    //得到数据查询出来时的状态值
    var oldStatus = $('#status2').val();
   
    //生成费用列表--收益费用
    if(oldStatus=='6')　{//订座
    	appendPayDiv2(examTimeId,'appendPayBody',productId);
    } else {
    	appendPayDiv(examTimeId,'appendPayBody',productId);
    }
    //更新考试地区选项
    branchSchoolChange();
});

//考试地区下拉选change事件，查询支出费用
function branchSchoolChange() {
	//清空以前生成的支出费用
	$("#appendPayBody").find("tr.zhiChu").remove();
	var branchSchoolIdStr = $("#branchSchoolId").val();//考试地区id
	var examTimeIdStr = $("#kTime").val();//产品考期id
	if(examTimeIdStr==null || examTimeIdStr=='') {
		//如果考期没有选择——还原本次选择考试地区信息——选项制空
		$("#branchSchoolId").val('');
		$('#branchSchoolId').trigger('chosen:updated');
//		toastr.error("选择考试地区前，请先选择考期信息");
		return;
	}
	var productIdStr = $("#productId").val();//产品id
	//清除主产品下以前生成的积分，折扣，优惠码
	$(".project .yhzkjf").remove();
	if(branchSchoolIdStr==null || branchSchoolIdStr=='') {
		//如果考试地区选择的是空，直接返回
		//返回前，重新计算合计
		hheji();
		//返回前，重新计算页面剩余费用的优惠
		FlushYHZK();
		return;
	}
	
	//先移除主产品下以前拼接的支出费用
	$('.project .zhiChu').remove();
	//拼接支出费用
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv?x="+(new Date()).valueOf(),
        "dataType": "json",
        "data": {
            examTimeId: examTimeIdStr,
            departmentId1:branchSchoolIdStr,
            expensesType:1,//费用类型-支出
            productId:productIdStr
        },
        "success": function (data) {
        	if(data.status=='success'){
        		
        		for(var i=0; i<data.list.length; i++) {
        				//拼接费用行
        				$('#hjDiv').before('<tr class="appendDiv zhiChu">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td>' 
        						+ data.list[i].price //产品应缴
        						+ '</td>'
        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'" >'
        						+ data.list[i].price //实际应缴
        						+ '</td>'
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储原始应缴值
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].yjValue" value="'+data.list[i].price+'"/>'//用来存储应缴值,初始值为产品应缴值
        						+ '<input type="hidden" name="payZhiChuList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payZhiChuList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="payZhiChuList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<input type="hidden" name="payZhiChuList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
        						//下面是优惠部分参数
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].discount" class="discount" value=""/>'//折扣id
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].integral" class="integral" value=""/>'//积分id
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
        						+ '<td id="' + data.list[i].code + '_value">'
        						+ 0//实缴费
        						+ '</td>'
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
        						+ ' <td><div class="payment">'
        						+ '<div class="col-sm-5">'
        						+ '   <select class="form-control" >'
        						+ '		<option value="1">现金</option>'
        						+ '        <option value="2">刷卡</option>'
        						+ '        <option value="3">支票</option>'
        						+ '        <option value="4">汇款-微信</option>'
        						+ '        <option value="5">汇款-支付宝</option>'
        						+ '        <option value="6">汇款-网络</option>'
        						+ '        <option value="7">银行转账</option>'
        						+ '        <option value="8">分期</option>'
        						+ '    </select>'
        						+ '</div>'
        						+ '<div class="col-sm-5">'
        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" onkeyup="sshj(this)" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="payZhiChuList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-2">'
        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle zhiChu payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴值
        						+ '</tr>');
        		}
        	 	
    		//如果页面上有订座费显示时，还要隐藏费用类别，订座费和费用类别不能同时出现
        	//但是订座状态除外
        	if($('#status2').val()=='6') {
        		
        	} else {
        		if($("#dztr").is(":visible")) {
        			$('#appendPayBody').find("tr").each(function(i,e){
        				//隐藏除订座费后的其它费用类别
        				if($(e).prop("id")==null || $(e).prop("id")!='dztr') {
        					$(e).hide();
        				}
        	  		});
        		}	
        	}
    		
       		 hheji();//合计
        	}else{
            	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
            }
        }
	});
	//获得产品课程信息id
	var projectInfoManageId = $("#projectInfoManageId").val();
	//先移除主产品下以前拼接的优惠类型
	$('.project .yhzkjf').remove();
	//生成优惠类型（积分，折扣下拉框展示),需要判断选中产品下配置了哪类优惠活动
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendZKJFYH",//查询优惠，折扣，积分
        "dataType": "json",
        "data": {
        	project: productIdStr,//产品id
        	projectInfoManageId: projectInfoManageId//课程咨询信息id
        },
        "success": function (data2) {
        	if(data2.status=='success'){
        		//如果有折扣活动，凭借折扣活动
        		if(data2.ZKList!=null && typeof(data2.ZKList)!='undefined' && data2.ZKList.length>0) {
        			$("#branchSchoolId").parent().parent().after(
   	       			     '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
   		               + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠折扣：</label>'
   		               + '   <div class="col-sm-9 no-padding-right">'
   		               + '       <select id="zkSelect" name="discount" onchange="zkChange(this)" class="form-control chosen-select">'
   		               + '       </select>'
   		               + '   </div>'
   		               + '</div>');
  	        	//拼接折扣下拉选-value:活动id，data-value：费用类型code_id集合，data-discount:折扣，data-multi：是否可叠加
      	        	var zkOption = '<option value="" data-value="" data-discount="" data-multi="">--请选择--</option>';
      	        	for(var m=0; m<data2.ZKList.length; m++) {
      	        		if(data2.ZKList[m].activityId==data2.zkValue) {
      	        			zkOption += '<option value="'+data2.ZKList[m].activityId+'" data-value="'+data2.ZKList[m].epId+'" data-discount="'+data2.ZKList[m].discount+'" data-multi="'+data2.ZKList[m].isMulti+'" selected>'+data2.ZKList[m].title+'</option>';
      	        		} else {
      	        			zkOption += '<option value="'+data2.ZKList[m].activityId+'" data-value="'+data2.ZKList[m].epId+'" data-discount="'+data2.ZKList[m].discount+'" data-multi="'+data2.ZKList[m].isMulti+'">'+data2.ZKList[m].title+'</option>';
      	        		}
      	        	}
      	        	$("#zkSelect").html(zkOption);
      	        	$('#zkSelect').trigger('chosen:updated');
      	        	$("#zkSelect").chosen({no_results_text: "没有匹配项", search_contains: true});
      	        	
        		}
        		//如果有积分活动，拼接积分活动
        		if(data2.JFList!=null && typeof(data2.JFList)!='undefined' && data2.JFList.length>0) {
        			$("#branchSchoolId").parent().parent().after(
   					 '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
   	               + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">积分活动：</label>'
   	               + '   <div class="col-sm-9 no-padding-right">'
//   	               + '       <select id="jfSelect" name="integral" onchange="jfChange(this)" class="form-control chosen-select">'
   	               + '       <select id="jfSelect" onchange="jfChange(this)" class="form-control chosen-select">'
   	               + '       </select>'
   	               + '   </div>'
   	               + '</div>');
        		//拼接积分下拉选-value:活动id，data-value：费用类型code_id集合，data-sclae1:元(积分兑换比例)，data-scale2:积分(积分兑换比例), data-multi：是否可叠加
   	        	var jfOption = '<option value="" data-value="" data-scale1="" data-scale2="" data-multi="">--请选择--</option>';
   	        	for(var n=0; n<data2.JFList.length; n++) {
   	        		if(data2.JFList[n].activityId==data2.jfValue) {
   	        			jfOption += '<option value="'+data2.JFList[n].activityId+'" data-value="'+data2.JFList[n].epId+'" data-scale1="'+data2.JFList[n].scale1+'" data-scale2="'+data2.JFList[n].scale2+'" data-multi="'+data2.JFList[n].isMulti+'" selected>'+data2.JFList[n].title+'</option>';
   	        		} else {
   	        			jfOption += '<option value="'+data2.JFList[n].activityId+'" data-value="'+data2.JFList[n].epId+'" data-scale1="'+data2.JFList[n].scale1+'" data-scale2="'+data2.JFList[n].scale2+'" data-multi="'+data2.JFList[n].isMulti+'">'+data2.JFList[n].title+'</option>';
   	        		}
   	        	}
   	        	$("#jfSelect").html(jfOption);
   	        	$('#jfSelect').trigger('chosen:updated');
   	        	$("#jfSelect").chosen({no_results_text: "没有匹配项", search_contains: true});
        		}
        		//如果有优惠码活动，拼接优惠码活动-（虽然可能配错有多个同种优惠类型，但是在这里只取第一个）
        		if(data2.YHList!=null && typeof(data2.YHList)!='undefined' && data2.YHList.length>0) {
        			//for(var k=0; k<data2.YHList.length; k++) {
        				$("#branchSchoolId").parent().parent().after(
        						'<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
        						//+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠码：</label>'
        						+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">'+data2.YHList[0].title+'</label>'
        						+ '   <div class="col-sm-9 no-padding-right">'
        						+ '       <input id="yhInput" name="activityCode" onblur="activtyCode(this)" data-value="'+data2.YHList[0].isMulti+'" value="'+(data2.yhCode==null?"":data2.yhCode)+'" data-limit="'+data2.YHList[0].limit1+'" class="form-control yhInput" placeholder="请输入8位优惠码"/>'
        						//+ '       <input id="yhqprice" name="activityCodeValue" type="hidden" class="form-control yhqprice"/>'
        						+ '       <input id="yhqprice" name="activityValue" type="hidden" class="form-control yhqprice" value="'+(data2.yhCodePrice==null?"":data2.yhCodePrice)+'"/>'
        						+ '   </div>'
        						+ '</div>');
        			//}
        		}
        	}
        	//重新生成优惠活动，支出费用后，更新页面所有费用先前的优惠活动
    		FlushYHZK();
        },
        "error":function() {
        	toastr.error("查询折扣，积分后台出错");
        }
	});
}