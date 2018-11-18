//子产品课程信息回显
function loadGT_ChildCTB(ProductDetail) {
	//产品id
	var productModelId = ProductDetail["product_model_id"];
	//初始产品模型,并且回显
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
            		zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+">" + data[i].modelName + "</option>";
            	}
            }
            $("#updateInfoManageCTB2").find("select.childProductModelId").html('<option value="">--请选择--</option>' + zxkc);
            $("#updateInfoManageCTB2").find("select.childProductModelId").trigger('chosen:updated');
            $("#updateInfoManageCTB2").find("select.childProductModelId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
             
            //产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#updateInfoManageCTB2").find("select.childProductModelId").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

//子产品产品模型change事件
function ChildProModelChangeCTB() {
	//清空考期下拉选
	$("#updateInfoManageCTB2").find('select.childKTime').html('');
	$("#updateInfoManageCTB2").find('select.childKTime').trigger('chosen:updated');
	$("#updateInfoManageCTB2").find('select.childKTime').chosen({no_results_text: "没有匹配项", search_contains: true});
	//产品模型发生改变，制空产品下拉框,如果没有制空则会得到初始时的productId
	var productId = "";
	productId = $("#updateInfoManageCTB2").find("select.childProductId").val();
	//得到选中的option的Json信息
	var jsonObj = $("#updateInfoManageCTB2").find('select.childProductId :selected').data("value");
	//如果当前模型下没有配置选项
	if(jsonObj=="undefined") {
		//清除上次选择后生成的下拉框
		$("#updateInfoManageCTB2").find(".removeChildFlag").parent().parent().remove();
		return;
	}
	
	//得到产品类型ID
	var modelId = $("#updateInfoManageCTB2").find('select.childProductModelId :selected').val();
	//清除上次选择后生成的下拉框
	$("#updateInfoManageCTB2").find(".removeChildFlag").parent().parent().remove();
	//用来组装表名
	var tableArray = new Array();
	 
	//健壮性判断，如果没有取到产品模型对象jsonObj，不用拼接其他课程信息，查询条件只有productModelId
	if(null==jsonObj ||　typeof(jsonObj)=="undefined" || jsonObj.length==0) {
		var tableName = 'product_model';
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
				+ '            <select name="childrenProduct.projectMap[\''+enName+'_id\']" data-value="child_'+enName+'" class="form-control removeChildFlag chosen-select '+enName+'" disabled data-live-search="true">'
				+ '            </select>'
				+ '			   <input type="hidden" name="childrenProduct.projectMap[\''+enName+'_name\']" class="projectInfoManager2" />'		
				+ '        </div>'
				+ '</div>';
			//将新增的下拉框拼接到产品类型下拉框后面
			$("#updateInfoManageCTB2").find("select.childProductModelId").parent().parent().after(str);
			//根据表名和产品类型，关联product表，开始构造option
		}
		var tableName = tableArray.join("---");
	}
	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
	$.ajax({
        url: ctx + '/consultInfoManage/selectOptionByTable',
        type: 'POST',
        dataType: 'json',
        data: {"tableName":tableName,"modelId":modelId},
        success: function (data) {
        	 
            if(data==null || data.length==0) {//没有任何其它课程信息选项
            	//根据产品id回显其它课程信息，生成考期选项-考期是后面新增的下拉选
            	$("#updateInfoManageCTB2").find("select.childProductId").trigger("change");
            	return;
            }
            for (var i = 0; i < data.length; i++) {
            	var zxkc = "";
            	for(var j=0; j<data[i].dataList.length; j++) {
            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
            	}
            	$("#updateInfoManageCTB2").find('select.child_'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
            	//加载下拉框样式
            	$("#updateInfoManageCTB2").find('select.child_'+data[i].tableName).trigger('chosen:updated');
            	$("#updateInfoManageCTB2").find('select.child_'+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
            	$('.chosen-container').width('100%');
            }
            //根据产品id回显其它课程信息，生成考期选项-考期是后面新增的下拉选
            $("#updateInfoManageCTB2").find("select.childProductId").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

//子产品产品change事件
//选择产品，反向回显其他课程信息的option,并且声称考期option
function childPro2ChangeCTB(obj) {
	//回显其他课程信息部分
	//回显课程信息
	var showList = $(obj).find(":selected").attr("showList");
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;
		for(var p in showList){
			aiId = p.replace("_id","");
			$("#updateInfoManageCTB2").find('select.child_'+aiId).val(showList[p]);
			$("#updateInfoManageCTB2").find('select.child_'+aiId).trigger('chosen:updated');
		}
	}
	 
	//将其它课程信息值为空的select去掉
	$("#updateInfoManageCTB2").find("select.removeChildFlag").each(function(index,obj){
		if($(obj).val()==null || $(obj).val()=='') {
			$(obj).parent().parent().remove();
		}
	}); 
	
	 
	// 获取selected产品ID-及子产品id
	var productId = $("#updateInfoManageCTB2").find('select.childProductId').val();
	
	//得到产品收款方信息 
	$.ajax({
		url : ctx + '/consultConsoleWFC/getPayee',//查询当前选中产品考试地区信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(map){
			var option = '<option value="0">--请选择--<option/>';
			//回显用，查询该咨询量已经选中的收款方信息
			for(var j=0; j<map.length; j++) {
				option += "<option value='"+map[j].payeeId+"'>"+map[j].payeeName+"</option>";
			}
			$("#updateInfoManageCTB2").find("select.childPayee").html(option);
			$("#updateInfoManageCTB2").find("select.childPayee").trigger('chosen:updated');
			$("#updateInfoManageCTB2").find("select.childPayee").chosen({no_results_text: "没有匹配项", search_contains: true});
		}
	});
	//获得信息归属地id
	var departmentId1 = $("#updateInfoManageCTB").find("select.departmentId1").val();
	//得到产品考期信息 
	$.ajax({
		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId, departmentId:departmentId1},
		success : function(info){
			if (info == null || info.length == 0){
				$("#updateInfoManageCTB2").find('select.childKTime').html('<option value="">--请选择--<option/>');
				$("#updateInfoManageCTB2").find('select.childKTime').trigger('chosen:updated');
				$("#updateInfoManageCTB2").find('select.childKTime').chosen({no_results_text: "没有匹配项", search_contains: true});
				return;
			}
			var exm = '';
			for (var m = 0; m < info.length; m++) {
				exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
			}
			$("#updateInfoManageCTB2").find('select.childKTime').html('<option value="">--请选择--<option/>'+exm);
			$("#updateInfoManageCTB2").find('select.childKTime').trigger('chosen:updated');
			$("#updateInfoManageCTB2").find('select.childKTime').chosen({no_results_text: "没有匹配项", search_contains: true});
			
			//考期初始化完成后-生成相应的缴费列表
//			$("#updateInfoManageCTB2").find('select.childKTime').trigger('change');
		}
	});
			        
      //得到产品考试地区信息 
    	$.ajax({
    		url : ctx + '/consultConsoleWFC/getBranchSchool',//查询当前选中产品考试地区信息
    		type : 'post',
    		dataType : 'json',
    		data : {productId: productId},
    		success : function(msg){
    			var option = '<option value="">--请选择--<option/>';
    			//回显用，查询该咨询量已经选中的考试地区id
				for(var n=0; n<msg.length; n++) {
					option += "<option value='"+msg[n].branchSchoolId+"'>"+msg[n].fullName+"</option>";
				}
				$("#updateInfoManageCTB2").find("select.childBranchSchoolId").html(option);
				$("#updateInfoManageCTB2").find("select.childBranchSchoolId").trigger('chosen:updated');
				$("#updateInfoManageCTB2").find("select.childBranchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
				//触发考试地区的change事件-构造支出费用与合计(第一次初始化页面，考试地区回显时要调用一次）
//				childBranchSchoolChange();
    		}
    	});
}