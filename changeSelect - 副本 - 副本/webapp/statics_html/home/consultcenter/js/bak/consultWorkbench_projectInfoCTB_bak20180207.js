//当产品部分的下拉框发生改变时，需要制空产品下拉框——查看页面部分,flag-标志是由其它课程信息引起的产品下拉变化
//还是由产品模型改变引起的产品下拉选变化
function clearProductCTB(flag) {
	//清除子产品下拉选
	$("#childrenProductCTB").parents(".childrenProductCTB").remove();
	//清除以前的子产品课程信息数据
	$(".addChildProject").remove();
	//清除以前的子产品缴费信息数据
	$(".addChildPayFees").remove();
	$("#productIdCTB").html("");
	generateProductCTB(flag);//开始根据课程信息部分当前选中条件生成产品选项
	$("#productIdCTB").trigger('chosen:updated');
	$("#productIdCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	baoProductChange($("#productIdCTB"));
	$('#kTimeCTB').html('');
	$('#kTimeCTB').trigger('chosen:updated');
	$("#kTimeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('#branchSchoolIdCTB').html('');
	$('#branchSchoolIdCTB').trigger('chosen:updated');
	$("#branchSchoolIdCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('#payeeCTB').html('');
	$('#payeeCTB').trigger('chosen:updated');
	$("#payeeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
}

//动态生成产品-查看信息页面部分
function generateProductCTB(flag) {
	if(flag) {//如果不是产品模型改变引起的change
		//存放条件
		var conditionArray = new Array();
		$(".addProject select.productInfo :selected").each(function(index,obj){
			 
			//得到option的value即id值
			var idValue = $(obj).val();
			//开始拼接产品查询sql条件
			if(idValue!=null && idValue!='') {
				//得到主键列英文名称,option-select
				var primaryIdName = $(obj).parent().data("id")+"_id";
				var primaryIdValue = "'"+idValue+"'";
				//形如XXX_id = 'YYY'
				var condition = primaryIdName + "=" + primaryIdValue;
				conditionArray.push(condition);
			}
		});
		var conditions = conditionArray.join(" and ");
	} else {//如果是由产品模型改变引起的change
		var conditions = "product_model_id = ";
		conditions += "'" + $("#productModelIdCTB").val() + "'";
	}
	var departmentId = $("#departmentId1Hidden").val();//信息量归属地id
	var infoManageId = $("#infoManageId2").val();//咨询id
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
//	      url: ctx + '/consultInfoManage/findProductOption',
	      url: ctx + '/consultInfoManage/findProductOptionNew',
	      data: {"conditions":conditions,"departmentId":departmentId, "infoManageId":infoManageId},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
            	 }
            	 $("#productIdCTB").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#productIdCTB").trigger('chosen:updated');
            	 $("#productIdCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

//根据产品类型的选择，动态创建课程信息部分，其它下拉框-查看部分
//产品模型下拉选change事件
function baoModelChange(obj) {
	//清空考期下拉选
	$('#kTimeCTB').html('');
	$('#kTimeCTB').trigger('chosen:updated');
	$("#kTimeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	//产品模型发生改变，制空产品下拉框,如果没有制空则会得到初始时的productId
	var productId = "";
	 
	productId = clearProductCTB(false);
	//得到选中的option的Json信息
	var jsonObj = $('#productModelIdCTB :selected').data("value");
	//如果当前模型下没有配置选项
	if(jsonObj==null || typeof(jsonObj)=="undefined" || jsonObj.length==0) {
		//清除上次选择后生成的下拉框
    	$(".addProject .removeFlag").parent().parent().remove();
		return;
	}
	
	//得到产品类型ID
	var modelId = $('#productModelIdCTB :selected').val();
	//清除上次选择后生成的下拉框
	$(".addProject .removeFlag").parent().parent().remove();
	//用来组装表名
	var tableArray = new Array();
	//健壮性判断，如果没有取到产品模型对象jsonObj，不用构造其它课程信息下拉框，查询产品条件只有产品模型
	if(null==jsonObj ||　typeof(jsonObj)=="undefined" || jsonObj.length==0) {
		//生成考期选项-考期是后面新增的下拉选,子产品,收款方,考试地区
           baoProductChange($("#productIdCTB"));
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
				+ '            <select name="projectMap[\''+enName+'_id\']" data-id="'+enName+'" id="'+enName+'" onchange="clearProductCTB(true)" class="form-control removeFlag productInfo chosen-select" data-live-search="true">'
				+ '					<option value="">--请选择--</option>'
				+ '            </select>'
				+ '			   <input type="hidden" name="projectMap[\''+enName+'_name\']" class="projectInfoManager" />'		
				+ '        </div>'
				+ '</div>';
			//将新增的下拉框拼接到产品类型下拉框后面
			$("#productModelIdCTB").parent().parent().after(str);
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
            	$(".addProject").find('#'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
            	//加载下拉框样式
            	$(".addProject").find('#'+data[i].tableName).trigger('chosen:updated');
            	$(".addProject").find("#"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
            	$('.chosen-container').width('100%');
            }
            //生成考期选项-考期是后面新增的下拉选,子产品,收款方,考试地区
            baoProductChange($("#productIdCTB"));
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

}

//子产品change事件
function childProChangeCTB(obj) {
	var productId = $(obj).val();
	var productName = $(obj).find(":selected").text();
	var productDetail = $(obj).find(":selected").attr("showList");
	
	//清除以前的子产品课程信息数据
	$(".addChildProject").remove();
	//清除以前的子产品缴费信息数据
	$(".addChildPayFees").remove();
	//没有产品详情
//	if(productDetail==''|| productDetail==null || typeof(productDetail)=="undefined") {
//		//清除以前的子产品课程信息数据
//		$(".project2").remove();
//		//清除以前的子产品缴费信息数据
//		$(".projectPayFees2").remove();
//	}
	 
	if(productId!=null && productId!='' && typeof(productId)!="undefined") {
		//清除以前的数据
		$(".addChildProject").remove();
		debugger;
		//开始拼接子产品课程信息-拼接到主产品缴费信息表单中元素最后面
		$(".addPayFees").parents(".form").append('<div class="well with-header addChildProject">'
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
								+ '			<select name="childrenProduct.productModelId" id="childProductModelIdCTB" onchange="ChildProModelChangeCTB()" class="form-control chosen-select" disabled>'
								+ '			</select>'
								+ '			<input type="hidden" id="childProductModelNameCTB" name="childrenProduct.productModelName" class="projectInfoManager2"/>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">产品：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childProductIdCTB" name="childrenProduct.productId" onchange="childPro2ChangeCTB(this)" class="form-control chosen-select" disabled>'
								+ '				<option showList='+productDetail+' value='+productId+' selected>'+productName+'</option>'	
								+ '			</select>'
								+ '			<input id="childProductNameCTB" name="childrenProduct.productName" type="hidden" value="'+productName+'"/>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">收款方：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childPayeeCTB" name="childrenProduct.payee" class="form-control chosen-select">'
								+ '			</select>'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		 <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考期：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childKTimeCTB" name="childrenProduct.kTime" onchange="childProExamChangeCTB(this)" class="form-control chosen-select init">'
								+ '			</select>'
								+ '			<input name="childrenProduct.kTimeValue" type="hidden">'
								+ '		</div>'
								+ '	</div>'
								+ '	<div class="form-group col-lg-4 col-md-4 col-sm-6">'
								+ '		 <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考试地区：</label>'
								+ '		<div class="col-sm-9 no-padding-right">'
								+ '			<select id="childBranchSchoolIdCTB" onchange="childBranchSchoolChangeCTB()" name="childrenProduct.branchSchoolId" class="form-control chosen-select">'
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
//	   	loadGT_Child(JSON.parse(productDetail));
		//开始逐渐生成子产品课程信息。
		genChildModelCTB(JSON.parse(productDetail));
	} else {
		//清除以前的数据
		$(".addChildProject").remove();
	}
}

//产品下拉选项联动考期，子产品
function baoProductChange(obj) {
	// 获取selected产品ID
	var productId = $('#productIdCTB').val();
	var infoManageId = $("#infoManageId2").val(); 
	
	//课程缴费信息清空
	$("#addPayInfo").html('');
	//清除优惠和服务信息
	$(".addProject").find(".serviceFees").remove();
	$(".addProject").find(".yhzkjf").remove();
	//得到产品信息Json格式
	var showList = $(obj).find("option:selected").attr("showList");
	if(showList=='' || showList==null || typeof(showList)=='undefined') {
		//如果没有得到产品信息，清除以前的数据，直接退出方法
		$("#childrenProductCTB").parents(".childrenProductCTB").remove();//清除子产品下拉选
		$(".addChildProject").remove();//清除课程信息
		$(".addChildPayFees").remove();//清除课程缴费信息
		
		//清除考试地区下拉选
		$("#branchSchoolIdCTB").html('');
		$('#branchSchoolIdCTB').trigger('chosen:updated');
		//清除收款方下拉选
		$("#payeeCTB").html('');
		$('#payeeCTB').trigger('chosen:updated');
		//清除考期下拉选
		$("#kTimeCTB").html('');
		$('#kTimeCTB').trigger('chosen:updated');
		return;
	}
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;
		for(var p in showList){
			aiId = p.replace("_id","");
			$(".addProject").find('#'+aiId).val(showList[p]);
			$(".addProject").find('#'+aiId).trigger('chosen:updated');
		}
	}
	//还原考试地区下拉选
	$("#branchSchoolIdCTB").html('');
	$('#branchSchoolIdCTB').trigger('chosen:updated');
	$("#branchSchoolIdCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	//得到产品考试地区信息 
	$.ajax({
		url : ctx + '/consultConsoleWFC/getBranchSchool',//查询当前产品考试地区信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(msg){
			var option = '<option value="">--请选择--<option/>';
			for(var n=0; n<msg.length; n++) {
				option += "<option value='"+msg[n].branchSchoolId+"'>"+msg[n].fullName+"</option>";
			}
			$("#branchSchoolIdCTB").html(option);
			$('#branchSchoolIdCTB').trigger('chosen:updated');
			$("#branchSchoolIdCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
			//触发考试地区的change事件-构造支出费用与合计(第一次初始化页面，考试地区回显时要调用一次）
    		branchSchoolChangeCTB();
		}
	});
	//还原收款方下拉选
	$("#payeeCTB").html('');
	$('#payeeCTB').trigger('chosen:updated');
	$("#payeeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	//得到产品收款方信息 
	$.ajax({
		url : ctx + '/consultConsoleWFC/getPayee',//查询当前产品考试地区信息
		type : 'post',
		dataType : 'json',
		data : {"productId": productId},
		success : function(map){
			var option = '<option value="">--请选择--<option/>';
			for(var j=0; j<map.length; j++) {
				option += "<option value='"+map[j].payeeId+"'>"+map[j].payeeName+"</option>";
			}
			$("#payeeCTB").html(option);
			$('#payeeCTB').trigger('chosen:updated');
			$("#payeeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
		}
	});
	
	var departmentId = $("#departmentId1Hidden").val();//信息量归属地id
	//得到产品考期信息 
	$.ajax({
		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId, departmentId:departmentId},
		success : function(info){
			if (info == null || info.length == 0){//如果没有考期信息
				$('#kTimeCTB').html('<option value="">--请选择--<option/>');
				$('#kTimeCTB').trigger('chosen:updated');
				$("#kTimeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
				return;
			}
			var exm = '';
			for (var m = 0; m < info.length; m++) {
				exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
			}
			$('#kTimeCTB').html('<option value="">--请选择--<option/>'+exm);
			$('#kTimeCTB').trigger('chosen:updated');
			$("#kTimeCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
			
			//考期初始化完成后-生成相应的缴费列表
	         baokTimeChange($("#kTimeCTB"));
		},
		error: function (response) {
            toastr.error("不存在考期");
        }
	})
	
	//清除以前生成的子产品下拉选
	$("#childrenProductCTB").parents(".childrenProductCTB").remove();
	$(".selectpicker").selectpicker('refresh');
	 
	//得到产品类型 1-子产品 0-主产品
	//取得产品信息json字符串
	var productInfoStr = $('#productIdCTB :selected').attr("showList");
	if(productInfoStr=='' || productInfoStr==null || typeof(productInfoStr)=='undefined') {
		//如果没有得到产品信息，清除以前的数据，直接退出方法
		$(".addChildProject").remove();//清除课程信息
		$(".addChildPayFees").remove();//清除课程缴费信息
		return;
	}
	var productInfoObj = JSON.parse(productInfoStr);
	var productForm = productInfoObj["product_form"];
	 
	if(typeof(productForm)=="undefined" || productForm==null) {
		//如果没有得到产品类型信息（主产品，子产品），清除以前的数据，直接退出方法
		$(".addChildProject").remove();//清除课程信息
		$(".addChildPayFees").remove();//清除课程缴费信息
		return;
	} else {
		if(productForm!="0") {
			//toastr.error("子产品");
			//如果没有得到产品类型信息（主产品，子产品），清除以前的数据，直接退出方法
			$(".addChildProject").remove();//清除课程信息
			$(".addChildPayFees").remove();//清除课程缴费信息
		} else {
			//toastr.error("主产品");
			//得到以前选中的子产品id
			var departmentId = $("#departmentId1Hidden").val();
			//开始拼接 -根据父产品id查询子产品id
			//查询子产品id属于信息归属地的信息
			$.ajax({
//				url : ctx + '/consultConsoleWFC/getChildrenProduct',
				url : ctx + '/consultConsoleWFC/getChildProductNew',
				type : 'post',
				dataType : 'json',
				//data : {productParentId: productId},
				data : {productId: productId,"addressId":departmentId,"infoManageId":infoManageId},//将主产品id作为参数传递过去
				success : function(data){
					//如果主产品下没有查到子产品
					if(data.status!="success") {
						var str = '<div class="form-group col-md-4 col-sm-6 childrenProductCTB">'
		                    + '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+"子产品"+'</label>'
		                    + '       <div class="col-sm-9 no-padding-right">'
		                    + '            <select id="childrenProductCTB" onchange="childProChangeCTB(this)" class="form-control removeFlag chosen-select" data-live-search="true">'
		                    + ' 				<option value="">--请选择--</option>'
		                    + '            </select>'
		                    + '        </div>'
		                    + '</div>';
						//toastr.error(data.msg);
					} else {
						var str = '<div class="form-group col-md-4 col-sm-6 childrenProductCTB">'
		                    + '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+"子产品"+'</label>'
		                    + '       <div class="col-sm-9 no-padding-right">'
		                    + '            <select id="childrenProductCTB" onchange="childProChangeCTB(this)" class="form-control removeFlag chosen-select" data-live-search="true">'
		                    + ' 				<option value="">--请选择--</option>';
		                for(var i=0; i<data.list.length; i++) {
		                	str += '<option showList='+JSON.stringify(data.list[i])+' value="'+data.list[i].product_id+'">'+data.list[i].product_name+'</option>';
		                }     
		                str += '            </select>'
		                    + '        </div>'
		                    + '</div>';
					}
					
	    		//将新增的下拉框拼接到产品类型下拉框后面
	    		$("#productIdCTB").parent().parent().after(str);
	    		//chosen-select初始化
	    		$('#childrenProductCTB').trigger('chosen:updated');
				$("#childrenProductCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
				//触发子产品下拉选change事件
				//childProChangeCTB($("#childrenProductCTB"));
				},
				"error":function() {
					 toastr.error("系统错误，查询子产品出错");
				}
			});
		}
	}

}

//产品考期变化事件
function baokTimeChange(obj) {

    //var obj = $(this).find(':selected');
    var productExamTimeId = $(obj).val();//产品考期ID
    //得到数据查询出来时的状态值
    var oldStatus = $('#status2').val();
   
    appendPayDivCTB(productExamTimeId,'addPayInfo');
}

//考试地区下拉选change事件，查询支出费用
function branchSchoolChangeCTB() {
	//清空以前生成的支出费用
	$("#addPayInfo").find("tr.zhiChu").remove();
	var branchSchoolIdStr = $("#branchSchoolIdCTB").val();//考试地区id
	var productExamTimeIdStr = $("#kTimeCTB").val();//产品考期id
	var productIdStr = $("#productIdCTB").val();//产品id
	//清除主产品下以前生成的积分，折扣，优惠码
	$(".addProject .yhzkjf").remove();
	if(branchSchoolIdStr==null || branchSchoolIdStr=='') {
		//如果考试地区选择的是空，直接返回
		return;
	}
	
	//先移除主产品下以前拼接的支出费用
	$('.addProject .zhiChu').remove();
	//拼接支出费用
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv?x="+(new Date()).valueOf(),
        "dataType": "json",
        "data": {
            productExamTimeId: productExamTimeIdStr,
            departmentId1:branchSchoolIdStr,
            expensesType:1//费用类型-支出
        },
        "success": function (data) {
        	if(data.status=='success'){
        		
        		for(var i=0; i<data.list.length; i++) {
        				//拼接费用行
        				$('#hjDivCTB').before('<tr class="appendDiv zhiChu">'
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
        						+ '<div class="col-sm-4">'
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
        						+ '     <input ondblclick="dbclickCTB(this)" class="form-control zjsjflag" onkeyup="sshjCTB(this)" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="payZhiChuList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-3">'
        						+ '<i onclick="addRowPayCTB(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="payZhiChuCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴值
        						+ '</tr>');
        		}
       		 hhejiCTB();//合计
        	}else{
            	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
            }
        }
	});
	
	//先移除主产品下以前拼接的优惠类型
	$('.addProject .yhzkjf').remove();
	//生成优惠类型（积分，折扣下拉框展示),需要判断选中产品下配置了哪类优惠活动
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendZKJFYH",//查询优惠，折扣，积分
        "dataType": "json",
        "data": {
        	project: productIdStr//产品id
        },
        "success": function (data2) {
        	if(data2.status=='success'){
        		//如果有折扣活动，凭借折扣活动
        		if(data2.ZKList!=null && typeof(data2.ZKList)!='undefined' && data2.ZKList.length>0) {
        			$("#branchSchoolId").parent().parent().after(
   	       			     '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
   		               + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠折扣：</label>'
   		               + '   <div class="col-sm-9 no-padding-right">'
   		               + '       <select id="zkSelectCTB" name="discount" onchange="zkChangeCTB(this)" class="form-control chosen-select">'
   		               + '       </select>'
   		               + '   </div>'
   		               + '</div>');
  	        	//拼接折扣下拉选-value:活动id，data-value：费用类型code_id集合，data-discount:折扣，data-multi：是否可叠加
      	        	var zkOption = '<option value="" data-value="" data-discount="" data-multi="">--请选择--</option>';
      	        	for(var m=0; m<data2.ZKList.length; m++) {
      	        		zkOption += '<option value="'+data2.ZKList[m].activityId+'" data-value="'+data2.ZKList[m].epId+'" data-discount="'+data2.ZKList[m].discount+'" data-multi="'+data2.ZKList[m].isMulti+'">'+data2.ZKList[m].title+'</option>';
      	        	}
      	        	$("#zkSelectCTB").html(zkOption);
      	        	$('#zkSelectCTB').trigger('chosen:updated');
      	        	$("#zkSelectCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
      	        	
        		}
        		//如果有积分活动，拼接积分活动
        		if(data2.JFList!=null && typeof(data2.JFList)!='undefined' && data2.JFList.length>0) {
        			$("#branchSchoolId").parent().parent().after(
   					 '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
   	               + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">积分活动：</label>'
   	               + '   <div class="col-sm-9 no-padding-right">'
   	               + '       <select id="jfSelectCTB" name="scale" onchange="jfChangeCTB(this)" class="form-control chosen-select">'
   	               + '       </select>'
   	               + '   </div>'
   	               + '</div>');
        		//拼接积分下拉选-value:活动id，data-value：费用类型code_id集合，data-sclae1:元(积分兑换比例)，data-scale2:积分(积分兑换比例), data-multi：是否可叠加
   	        	var jfOption = '<option value="" data-value="" data-scale1="" data-scale2="" data-multi="">--请选择--</option>';
   	        	for(var n=0; n<data2.JFList.length; n++) {
   	        		jfOption += '<option value="'+data2.JFList[n].activityId+'" data-value="'+data2.JFList[n].epId+'" data-scale1="'+data2.JFList[n].scale1+'" data-scale2="'+data2.JFList[n].scale2+'" data-multi="'+data2.JFList[n].isMulti+'">'+data2.JFList[n].title+'</option>';
   	        	}
   	        	$("#jfSelectCTB").html(jfOption);
   	        	$('#jfSelectCTB').trigger('chosen:updated');
   	        	$("#jfSelectCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
        		}
        		//如果有优惠码活动，拼接优惠码活动-（虽然可能配错有多个同种优惠类型，但是在这里只取第一个）
        		if(data2.YHList!=null && typeof(data2.YHList)!='undefined' && data2.YHList.length>0) {
        			//for(var k=0; k<data2.YHList.length; k++) {
        				$("#branchSchoolIdCTB").parent().parent().after(
        						'<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
        						//+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠码：</label>'
        						+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">'+data2.YHList[0].title+'：</label>'
        						+ '   <div class="col-sm-9 no-padding-right">'
        						+ '       <input id="yhInputCTB" name="activityCode" onblur="activtyCodeCTB(this)" data-value="'+data2.YHList[0].isMulti+'" data-limit="'+data2.YHList[0].limit1+'" class="form-control yhInput" placeholder="请输入8位优惠码"/>'
        						//+ '       <input id="yhqprice" name="activityCodeValue" type="hidden" class="form-control yhqprice"/>'
        						+ '       <input id="yhqpriceCTB" name="activityValue" type="hidden" class="form-control yhqprice"/>'
        						+ '   </div>'
        						+ '</div>');
        			//}
        		}
        	}
        },
        "error":function() {
        	toastr.error("查询折扣，积分后台出错");
        }
	});
}