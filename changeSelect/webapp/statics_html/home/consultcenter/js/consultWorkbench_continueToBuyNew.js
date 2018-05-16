//清除之前填写的数据
function clearAddWin() {
	//清除生成的课程信息
	$("#updateInfoManageCTB").find("select.removeFlag").parent().parent().remove();
    //清除产品数据
	$("#updateInfoManageCTB").find("select.productId").html('');
	$("#updateInfoManageCTB").find("select.productId").trigger("chosen:updated");
	//清除回访日期数据
	$("#updateInfoManageCTB").find("select.recordNextTime").val('');
}

//点击添加产品-初始化课程信息
function initAddWin(obj) {
	//获得当前产品回显信息
	var record = $(obj).data("record");
	//清除之前填写的数据
	clearAddWin();
	//为将要新增的咨询量设置studentInfoManageId
	$("#updateInfoManageCTB").find("input[name='studentInfoManageId']").val($("#studentInfoManageIdHidden").val());
	//回显关键字
	$("#updateInfoManageCTB").find("input.keyword").val(record.keyword);
	//信息归属地信息回显
	$.ajax({
	    url: ctx + '/department/getAllOption',
	    type: 'POST',
	    data: {type: 3},
	    dataType: 'json',
	    success: function (data) {
	        var opt = "";
	        for (var i = 0; i < data.list.length; i++) {
	        	if(data.list[i].departmentId==record.departmentId1) {
		            opt += "<option value=" + data.list[i].departmentId + " selected>" + data.list[i].fullName + "</option>";
	        	} else {
		            opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
	        	}
	        }
	        $("#updateInfoManageCTB").find("select.departmentId1").html('<option value="">--请选择--</option>' + opt);
	        $("#updateInfoManageCTB").find("select.departmentId1").trigger('chosen:updated');
	        $("#updateInfoManageCTB").find("select.departmentId1").chosen({no_results_text: "没有匹配项"});
	        $('.chosen-container').width('100%');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});

	//初始化招生品牌
	$.ajax({
	    url: ctx + '/bizBrand/getAllOption',
	    type: 'POST',
	    data:{enable:1},
	    dataType: 'json',
	    success: function (data) {
	        var opt = "";
	        for (var i = 0; i < data.list.length; i++) {
	        	if(data.list[i].brandId==record.brandId) {
		            opt += "<option value=" + data.list[i].brandId + " selected>" + data.list[i].brandName + "</option>";
	        	} else {
		            opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
	        	}
	        }
	        $("#updateInfoManageCTB").find("select.brandId").html('<option value="">--请选择--</option>' + opt);
	        $("#updateInfoManageCTB").find("select.brandId").trigger('chosen:updated');
	        $("#updateInfoManageCTB").find("select.brandId").chosen({no_results_text: "没有匹配项"});
	        $('.chosen-container').width('100%');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});

	//初始化咨询者类型
	$.ajax({
	    url: ctx + '/studentAttr/getAllOption',
	    type: 'POST',
	    data: {attrType: 2, enable:1},
	    dataType: 'json',
	    success: function (data) {
	        var zxz = "";
	        for (var i = 0; i < data.list.length; i++) {
	        	if(data.list[i].studentAttrId==record.studentAttrId2) {
		            zxz += "<option value=" + data.list[i].studentAttrId + " selected>" + data.list[i].typeName + "</option>";
	        	} else {
		            zxz += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
	        	}
	        }
	        $("#updateInfoManageCTB").find("select.studentAttrId2").html('<option value="">--请选择--</option>' + zxz);
	        $("#updateInfoManageCTB").find("select.studentAttrId2").trigger('chosen:updated');
	        $("#updateInfoManageCTB").find("select.studentAttrId2").chosen({no_results_text: "没有匹配项"});
	        $('.chosen-container').width('100%');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});

	//初始化媒体来源类型
	$.ajax({
	    url: ctx + '/studentAttr/getAllOption',
	    type: 'POST',
	    data: {attrType: 1,enable:1},
	    dataType: 'json',
	    success: function (data) {
	        var mt = "";
	        for (var i = 0; i < data.list.length; i++) {
	        	if(data.list[i].studentAttrId==record.studentAttrId1) {
		            mt += "<option value=" + data.list[i].studentAttrId + " selected>" + data.list[i].typeName + "</option>";
	        	} else {
		            mt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
	        	}
	        }
	        $("#updateInfoManageCTB").find("select.studentAttrId1").html('<option value="">--请选择--</option>' + mt);
	        $("#updateInfoManageCTB").find("select.studentAttrId1").trigger('chosen:updated');
	        $("#updateInfoManageCTB").find("select.studentAttrId1").chosen({no_results_text: "没有匹配项"});
	        $('.chosen-container').width('100%');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});

//如果信息归属地有回显信息，还需要回显校区信息
if(record.departmentId1!=null && record.departmentId1!='') {
	$.ajax({
	    url: ctx + '/department/getAllOption',
	    type: 'POST',
	    data: {parentId: record.departmentId1},
	    dataType: 'json',
	    success: function (data) {
	        var opt = "";
	        for (var i = 0; i < data.list.length; i++) {
	        	if(data.list[i].departmentId==record.schoolId) {
		            opt += "<option address=\"" + data.list[i].description + "\"value=" + data.list[i].departmentId + " selected>" + data.list[i].fullName + "</option>";
	        	} else {
		            opt += "<option address=\"" + data.list[i].description + "\"value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
	        	}
	        }
	        $("#updateInfoManageCTB").find("select.schoolId").html('<option value="">--请选择--</option>' + opt);
	        $("#updateInfoManageCTB").find("select.schoolId").trigger('chosen:updated');
	        $("#updateInfoManageCTB").find("select.schoolId").chosen({no_results_text: "没有匹配项"});
	        $('.chosen-container').width('100%');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});
}
	
//选择信息归属地后，才能确定校区，校区是根据信息归属地来的	
$("#updateInfoManageCTB").find("select.departmentId1").change(function(){
	var departmentId1 = $(this).val();
	//初始化归属校区
	$.ajax({
	    url: ctx + '/department/getAllOption',
	    type: 'POST',
	    data: {parentId: departmentId1},
	    dataType: 'json',
	    success: function (data) {
	        var opt = "";
	        for (var i = 0; i < data.list.length; i++) {
	            opt += "<option address=\"" + data.list[i].description + "\"value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
//	             
	        }
	        $("#updateInfoManageCTB").find("select.schoolId").html('<option value="">--请选择--</option>' + opt);
	        $("#updateInfoManageCTB").find("select.schoolId").trigger('chosen:updated');
	        $("#updateInfoManageCTB").find("select.schoolId").chosen({no_results_text: "没有匹配项"});
	        $('.chosen-container').width('100%');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});
});
	
//初始新增咨询量弹框-初始产品模型
$.ajax({
    url: ctx + '/consultInfoManage/selectProductModel',
    type: 'POST',
    dataType: 'json',
    success: function (data) { 
        var zxkc = "";
        for (var i = 0; i < data.length; i++) {
            zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
        }
        $("#updateInfoManageCTB").find("select.productModel").html('<option value="">--请选择--</option>' + zxkc);
        $("#updateInfoManageCTB").find("select.productModel").trigger('chosen:updated');
        $("#updateInfoManageCTB").find("select.productModel").chosen({no_results_text: "没有匹配项", search_contains: true});
        $('.chosen-container').width('100%');
    },
    error: function (response) {
        toastr.error("系统错误");
    }
});
}

//DMW添加，根据产品类型的选择，动态创建课程信息部分，其它下拉框
$("#updateInfoManageCTB").find("select.productModel").change(function(){
	var departmentId = $("#updateInfoManageCTB").find("select.departmentId1").val();//信息量归属地id
	if(departmentId==null || departmentId=='') {
		toastr.error("请先选择信息量归属地，再选择课程信息");
		//清空product_model选项
		$(this).val('');
		$(this).trigger("chosen:updated");
		return;
	}
	//产品模型发生改变，制空产品下拉框
	clearProductCTB1();
	//得到选中的option的Json信息
	var jsonObj = $(this).find(":selected").data("value");
	//如果当前模型下没有配置选项
	if(jsonObj=="undefined" || $(jsonObj).length==0) {
		//清除上次选择后生成的下拉框
    	$(".removeFlag").parent().parent().remove();
		return;
	}
	//得到产品模型ID
	var modelId = $(this).find(":selected").val();
	//清除上次选择后生成的下拉框
	$(".removeFlag").parent().parent().remove();
	//用来组装表名
	var tableArray = new Array();
	//开始构造最新的拼接结果
	for(var i=0; i<jsonObj.length; i++) {
		var enName = jsonObj[i].enName;
		var chName = jsonObj[i].chName;
		tableArray.push(enName);
		//开始拼接
		var str = '<div class="form-group col-md-4 col-sm-6">'
                + '       <label class="control-label col-sm-5 no-padding-right">'+chName+'</label>'
                + '       <div class="col-sm-7 no-padding-right">'
                + '            <select name="projectMap[\''+enName+'_id\']" data-value="'+enName+'" onchange="clearProductCTB()" class="form-control removeFlag chosen-select '+enName+'" data-live-search="true">'
                + '            </select>'
                + '			   <input type="hidden" name="projectMap[\''+enName+'_name\']" class="projectInfoManager" />'		
                + '        </div>'
                + '</div>';
		//将新增的下拉框拼接到产品类型下拉框后面
		$(this).parent().parent().after(str);
		//根据表名和产品类型，关联product表，开始构造option
	}
	var tableName = tableArray.join("---");
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
            	$("#updateInfoManageCTB").find("select."+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
            	//加载下拉框样式
            	$("#updateInfoManageCTB").find("select."+data[i].tableName).trigger('chosen:updated');
            	$("#updateInfoManageCTB").find("select."+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
            	$('.chosen-container').width('100%');
            }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
});
//当产品部分的下拉框发生改变时，需要制空产品下拉框
function clearProductCTB1() {
	$("#updateInfoManageCTB").find("select.productId").html("");
	generateProductCTB1();//开始根据课程信息部分当前选中条件生成产品选项
	$("#updateInfoManageCTB").find("select.productId").trigger('chosen:updated');
	$("#updateInfoManageCTB").find("select.productId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
}

//页面生产产品按钮功能
function generateProductCTB1() {
	//存放条件
	var conditionArray = new Array();
	$("#updateInfoManageCTB").find(".addProInfoCTB select :selected").each(function(index,obj){
		//得到option的value即id值
		var idValue = $(obj).val();
		 
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			var primaryIdName = $(obj).parent().data("value")+"_id";
			var primaryIdValue = "'"+idValue+"'";
			//形如XXX_id = 'YYY'
			var condition = primaryIdName + "=" + primaryIdValue;
			conditionArray.push(condition);
		}
	});
	var conditions = conditionArray.join(" and ");
	 
	var departmentId = $("#updateInfoManageCTB").find("select.departmentId1").val();//信息量归属地id
	var studentPhone = $("#stuPhone").val();//学员电话
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
//	      url: ctx + '/consultInfoManage/findProductOption',
	      url: ctx + '/consultInfoManage/findProductOptionNew',//新版增加剔除该电话学员以前报名过的产品
	      data: {"conditions":conditions, "departmentId":departmentId, "studentPhone":studentPhone},
	      dataType: 'json',
	      success: function (data) {
	    	  debugger;
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
            	 }
            	 $("#updateInfoManageCTB").find("select.productId").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#updateInfoManageCTB").find("select.productId").trigger('chosen:updated');
            	 $("#updateInfoManageCTB").find("select.productId").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

//选择产品，反向回显其他课程信息的option
$("#updateInfoManageCTB").find('select.productId').change(function(){
	var showList = $(this).find("option:selected").attr("showList");
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;//动态生成的课程信息select的id
		for(var p in showList){
			aiId = p.replace("_id","");//动态生成的课程信息option的value
			$("#updateInfoManageCTB").find('select.'+aiId).val(showList[p]);
			$("#updateInfoManageCTB").find('select.'+aiId).trigger('chosen:updated');
		}
	}
});

//报名状态-添加产品-第一步保存事件
function submitProInfo() {
	//1.开始进入下一步之前的验证-带*号的是必填项，必须有值
//	var errorFlag = varifyInfo();
//	if(errorFlag) {
//		toastr.error("带*号的是必填项，必须有值!");
//		return ;
//	}
	//2.弹出下一步弹框,前初始化产品模型和产品信息等
//	var productModelId = $("#updateInfoManageCTB").find("select.productModel").val();
//	var productModelName = $("#updateInfoManageCTB").find("select.productModel").find(":selected").text();
//	$("#productModelIdCTB").html('<option value="'+productModelId+'" selected>'+productModelName+'</option>');
//	
//	var productId = $("#updateInfoManageCTB").find("select.productId").val();
//	var productName = $("#updateInfoManageCTB").find("select.productId").find(":selected").text();
//	$("#productIdCTB").html('<option value="'+productId+'" selected>'+productName+'</option>');
	$("#addProWin2").modal("show");
	//3.初始化弹出的下一步弹框的内容-产品模型和产品需要写死不能修改
	//在新弹框中回显上一步选中的产品模型信息
	//初始新增咨询量弹框-初始产品模型
	$.ajax({
	    url: ctx + '/consultInfoManage/selectProductModel',
	    type: 'POST',
	    dataType: 'json',
	    success: function (data) { 
	        var zxkc = "";
	        for (var i = 0; i < data.length; i++) {
	            zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
	        }
	        $("#productModelIdCTB").html('<option value="">--请选择--</option>' + zxkc);
	      //回显上一步选择的产品模型信息
	    	$("#productModelIdCTB").val($("#updateInfoManageCTB").find("select.productModel").val());
	        $("#productModelIdCTB").trigger('chosen:updated');
	        $("#productModelIdCTB").chosen({no_results_text: "没有匹配项", search_contains: true});
	        $('.chosen-container').width('100%');
	      //1.产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#productModelIdCTB").trigger("change");
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});
//	$("#addProjectForm").find("select.productId").val($("#updateInfoManageCTB").find("select.productId :selected").text());
	//初始化时间控件
	//下次缴费时间
    $("#nextPayTimeCTB").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii:ss',
        autoclose: true,
        startDate: new Date()
    })
	//生成考期，收款方，考试地区信息
//	initProInfo();
}

//下一步前的验证操作
function varifyInfo() {
	var errorFlag = false;
	var departmentId1 = $("#updateInfoManageCTB").find("select.departmentId1").val();
	if(departmentId1==null || departmentId1=='') {
		toastr.error("信息归属地必须填写");
		errorFlag = true;
	} 
	var brandId = $("#updateInfoManageCTB").find("select.brandId").val();
	if(brandId==null || brandId=='') {
		toastr.error("品牌必须填写");
		errorFlag = true;
	} 
	var studentAttrId2 = $("#updateInfoManageCTB").find("select.studentAttrId2").val();
	if(studentAttrId2==null || studentAttrId2=='') {
		toastr.error("咨询类型必须填写");
		errorFlag = true;
	} 
	var studentAttrId1 = $("#updateInfoManageCTB").find("select.studentAttrId1").val();
	if(studentAttrId1==null || studentAttrId1=='') {
		toastr.error("媒体来源必须填写");
		errorFlag = true;
	} 
	var keyword = $("#updateInfoManageCTB").find("input.keyword").val();
	if(keyword==null || keyword=='') {
		toastr.error("关键字必须填写");
		errorFlag = true;
	} 
	var schoolId = $("#updateInfoManageCTB").find("select.schoolId").val();
	if(schoolId==null || schoolId=='') {
		toastr.error("校区必须填写");
		errorFlag = true;
	} 
	var productModel = $("#updateInfoManageCTB").find("select.productModel").val();
	if(productModel==null || productModel=='') {
		toastr.error("产品模型必须填写");
		errorFlag = true;
	} 
	var productId = $("#updateInfoManageCTB").find("select.productId").val();
	if(productId==null || productId=='') {
		toastr.error("产品必须填写");
		errorFlag = true;
	} 
	return errorFlag;
}


//最终提交报名的产品
function submitAddInfo() {
	//0.提交前的验证工作
	var errorFlag = varifyBefSub();
	if(errorFlag) {
		return;
	}
	//分三步操作
	//1.保存consult_center_info_manage咨询信息
	//1.1提交consult_center_info_manage信息和课程信息
	//获取产品部分动态生成的下拉框的name值
    $("#updateInfoManageCTB select :selected").each(function(index, obj){
    	//获取选中的option的name值
    	var name = $(obj).text();
    	if(name!=null&&name!=''&&name!='--请选择--') {
    		//得到与该下拉框选中option处于同一div下的input对象，option-select-div-input
    		var inputObj = $(obj).parent().parent().find("input.projectInfoManager");
    		if(inputObj.length>0) {
    			//将name值赋值到input中
        		$(inputObj).val(name);
    		}
    	} 
    });
	
    
    var options1 = $("#updateInfoManageCTB").serialize();
    var studentInfoManageId = $("#studentInfoManageId").val();//学员信息表主键
    var studentPhone = $("#stuPhone").val();//学员电话
    options1 += "&studentInfoManageId="+studentInfoManageId+ "&pimLevel=0" + "&studentPhone="+studentPhone;//在待沟通页面创建的咨询量默认就是待沟通,并且是顶级产品
	//设置选中校区名称
//	$("#updateInfoManageCTB").find("select.schoolId").parent().find("input").val($("#updateInfoManageCTB").find("select.schoolId :selected").text());
//	var formInfo1 = $("#updateInfoManageCTB").serialize();
	//2.保存project_info_manage课程信息
	//3.保存consult_info_manage_pay_comp和consult_info_manage_pay_fees缴费信息
	//3.1提交课程信息和缴费信息
	//3.1.1先打开表单小所有disabled的元素以便提交数据
	$("#addProjectForm").find("select,input").each(function(i,e){
		$(e).prop("disabled",false);
	});
	//3.2需要提交的参数
	var a1 = $('#sjhjCTB').text();//合计实缴
	var a2 = $('#hjpriceCTB').text();//合计实际应缴
	if(a2-a1<0){
		toastr.error("应缴费用总和小于实际费用");
		return ;
	}
	var sPrice = a1;//主产品实缴合计
	
	//将主产品的课程信息下的name值的input赋值
	$(".addChildProject").find("input.projectInfoManager2").each(function(i,e){
		//得到该课程信息下拉选的name值
		var projectName = $(e).parent().find("select :selected").text();
		//将name值传递给隐藏input框，作为传递给后台的参数
		$(e).val(projectName);
	});
	//如果有子产品，还需要把设置子产品的
	var b1 = $('#childSjhjCTB').text();//子产品合计实缴
	var b2 = $('#childHjpriceCTB').text();//子产品合计实际应缴
	if(b2-b1<0){
		toastr.error("子产品应缴费用总和小于实际费用");
		return ;
	}
	var childSPrice = b1;//子产品合计实缴
	
	var code = $("#yhInputCTB").val();//得到已经使用的优惠码-后台需要将其制为已使用
	var childCode = $("#childYhInputCTB").val();//得到子产品已经使用的优惠码-后台需要将其制为已使用
	//3.3处理选中的积分
	//更新费用使用的积分活动的值——只能放这做，应为只有在这里支付金额才最终确定下来
	//先得到页面选中的积分
	var jfValue = $("#jfSelectCTB").val();
	if(jfValue!=null && jfValue!='') {//积分有可用值选中
		//得到该积分活动的code_id集合
		var epId = $("#jfSelectCTB").find(":selected").data("value");
		epId = epId.toString();//确保得到的是字符串
		if(epId=='' || epId==null) {//如果epId为空串
			var epIdArr = new Array();
		} else if(epId.indexOf(",")==-1) {//如果epId集合中只有一个code_id
			var epIdArr = new Array(epId);
		} else {//如果epId集合中有多个code_id
			var epIdArr = epId.split(",");
		}
		 
		//开始实际更新使用了积分优惠的费用
		$(".addPayFees tr.appendDiv").each(function(i,e){
			//得到费用的code_id
			var codeId = $(e).find("input.payCodeId").val();
			for(var index in epIdArr) {
				if(codeId==epIdArr[index]) {//当前费用种类的id在code_id集合中，更新该费用的积分
					//得到当前积分比例1
					var scale1 = $("#jfSelectCTB").find(":selected").data("scale1");
					//得到当前积分比例2
					var scale2 = $("#jfSelectCTB").find(":selected").data("scale2");
					//得到当前实缴值
					var yjValue = $(e).find("td").eq(3).text();
					//开始设置该使用在该费用上的积分活动的id，和积分值
					//设置积分活动id
					$(e).find("input.integral").val($("#jfSelectCTB").val());
					//设置积分的值
					$(e).find("input.integralValue").val(Number(yjValue)*(Number(scale1)/Number(scale2)));
				}
			}
		});
	} 
	//开始整理子产品的积分
	//先判断用户有没有选择子产品
	var childFlag = $("#childJfSelectCTB");
	if(childFlag.length<=0) {
		//没有子产品
	} else {
		//先得到页面选中的积分
		var childJfValue = $("#childJfSelectCTB").val();
		if(childJfValue!=null && childJfValue!='') {//积分有可用值选中
			//得到该积分活动的code_id集合
			var epId = $("#childJfSelectCTB").find(":selected").data("value");
			epId = epId.toString();//确保得到的是字符串
			if(epId=='' || epId==null) {//如果epId为空串
				var epIdArr = new Array();
			} else if(epId.indexOf(",")==-1) {//如果epId集合中只有一个code_id
				var epIdArr = new Array(epId);
			} else {//如果epId集合中有多个code_id
				var epIdArr = epId.split(",");
			}
			//开始实际更新子产品下使用了积分优惠的费用
			$(".addChildPayFees tr.appendDiv").each(function(i,e){
				//得到费用的code_id
				var codeId = $(e).find("input.payCodeId").val();
				for(var index in epIdArr) {
					if(codeId==epIdArr[index]) {//当前费用种类的id在code_id集合中，更新该费用的积分
						//得到当前积分比例1
						var scale1 = $("#childJfSelectCTB").find(":selected").data("scale1");
						//得到当前积分比例2
						var scale2 = $("#childJfSelectCTB").find(":selected").data("scale2");
						//得到当前实缴值
						var yjValue = $(e).find("td").eq(3).text();
						
						//开始设置该使用在该费用上的积分活动的id，和积分值
						//设置积分活动id
						$(e).find("input.integral").val($("#childJfSelectCTB").val());
						//设置积分的值
						$(e).find("input.integralValue").val(Number(yjValue)*(Number(scale1)/Number(scale2)));
					}
				}
			});
		} 
	}
	//将select对应的name值赋值到input中
	$("#addProjectForm").find("input.projectInfoManager").each(function(i,e){
		//得到该课程信息下拉选的name值
		var projectName = $(e).parent().find("select :selected").text();
		//将name值传递给隐藏input框，作为传递给后台的参数
		$(e).val(projectName);
	});
	var options2 = $("#addProjectForm").serialize();
//	var infoManageId = $("#infoManageId2").val();//咨询id-咨询表主键
	
	//拼接的参数依次是主产品实际应缴值，子产品实际应缴值，主产品咨询量状态，子产品咨询量状态，主产品使用优惠码，子产品使用优惠码，
	//主产品咨询量id，子产品咨询量id（组合产品咨询量id相同),主产品id，子产品id
	options2 += "&sumPrice="+a2+"&childrenProduct.sumPrice="+b2+"&status=7"+"&childrenProduct.status=7"+"&code="+code
	+"&childActivityCode.code="+childCode+"&sPrice="+sPrice+"&childrenProduct.sPrice="+childSPrice;//拼接上实缴，状态
	//4.提交数据
	$.ajax({
	    url: ctx + '/consultConsoleSignUp/continueToBuyNew',
	    type: 'POST',
	    dataType: 'json',
	    data: options1+"&"+options2,
	    success: function (data) { 
	    	if(data.status="success") {
	    		//关闭弹窗
	    		$("#addProWin2").modal("hide");
	    		$("#addProWin").modal("hide");
	    		//更新页面数据-该学员关联产品
	    		$.ajax({
	    		    url: ctx + '/consultConsoleSignUp/getAllProOfStu',
	    		    type: 'POST',
	    		    dataType: 'json',
	    		    //data: formInfo1+formInfo2,
	    		    data: options1+"&"+options2,
	    		    success: function (data) { 
	    		    	if(data.status=="success") {
	    		    		//清空之前生成的数据
	    		    		$(".bs-example-modal-lga .project3").find("div.row").html("");
		    				for(var i=0; i<data.data.length; i++) {
		    					var temp = '<h5 class="row-title" data-toggle="modal" data-target=".product-data" style="margin-left:20px;cursor:pointer">'
		    							 + '<i class="fa fa-tags blue"></i>'
		    							 + '<span data-record=\''+JSON.stringify(data.data[i])+'\'" onclick="getProjectInfo(this)">'+data.data[i].productName+'</span>'
		    							 + '</h5>'
		    					$(".bs-example-modal-lga .project3").find("div.row").append(temp);
		    				}
		                    statusRemember($('#infoManageId2').val(), $("#productIdCTB").val(), 7, "报名状态继续购买产品");
		    				toastr.success("报名状态购买产品成功");
		    			}
	    		    }
	    		});
	    		//提示成功
//	    		toastr.success("报名状态购买产品成功");
	    		//更新报名tab页数据
	    		init6();
	    	} else {
	    		toastr.error(data.msg);
	    	}
	    }
	});
}
//创建数据前的验证操作
function varifyBefSub() {
	//主产品考期必须填写
	var errorFlag = false;
	var kTime = $("#kTimeCTB").val();
	if(kTime==null || kTime=='') {
		toastr.error("产品考期必须填写");
		errorFlag = true;
	} 
	//考试地区必须填写
	var branchSchoolId = $("#branchSchoolIdCTB").val();
	if(branchSchoolId==null || branchSchoolId=='') {
		toastr.error("考试地区必须填写");
		errorFlag = true;
	} 
	//如果有欠费那么下次缴费时间必须填写
	var cfhj = $("#cfhjCTB").val();
	if(Number(cfhj)>0) {
		var nextPayTime = $("#nextPayTimeCTB").val();
		toastr.error("欠费大于0则下次缴费时间必须填写填写");
		errorFlag = true;
	} 
	
	//判断是否有子产品
	var childModelObj = $("#childProductModelIdCTB");
	if(childModelObj.length<=0) {
		//什么都不做
	} else {
		//如果有子产品，则子产品的考期必须填写
		var childKTime = $("#childKTimeCTB").val();
		if(childKTime==null || childKTime=='') {
			toastr.error("子产品考期必须填写");
			errorFlag = true;
		} 
		//如果有子产品，则子产品的招生地区必须填写
		var childBranchSchoolId = $("#childBranchSchoolIdCTB").val();
		if(childBranchSchoolId==null || childBranchSchoolId=='') {
			toastr.error("子产品考试地区必须填写");
			errorFlag = true;
		} 
		//如果子产品有欠费，则子产品的下次缴费时间必须填写
		var childCfhj = $("#childCfhjCTB").val();
		if(Number(childCfhj)>0) {
			var childNextPayTime = $("#childNextPayTimeCTB").val();
			toastr.error("子产品欠费大于0则下次缴费时间必须填写填写");
			errorFlag = true;
		} 
	}
}


//报名状态-继续添加产品-增加支付方式
function addRowPayCTB(e) {
	var list1Index = $(e).data("index");
	//收益类型费用和服务类型费用参数名称一样，但是支出类型费用有点不同
	//判断该费用是否是支出类型费用，来区别构造支付方式和支付金额
	if($(e).hasClass("zhiChu")) {//是支出类型费用
		 $(e).parent().parent().parent().append('<div class="payment addPayment">'
			        + ' <div class="col-sm-4" >'
			        + '     <select class="form-control">'
			        + '		<option value="1">现金</option>'
			        + '        <option value="2">刷卡</option>'
			        + '        <option value="3">支票</option>'
			        + '        <option value="4">汇款-微信</option>'
			        + '        <option value="5">汇款-支付宝</option>'
			        + '        <option value="6">汇款-网络</option>'
			        + '        <option value="7">银行转账</option>'
			        + '        <option value="8">分期</option>'
			        + '     </select>'
			        + '  </div>'
			        + '  <div class="col-sm-5">'
			        + '     <input ondblclick="dbclickCTB(this)" class="form-control zjsjflag" isat="1" onkeyup="sshjCTB(this)" type="text" placeholder="0" >'
			        + '	    <input type="hidden" name="payZhiChuList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
			        + ' </div>'
			        + '<div class="col-sm-3">'
			        + '  <i onclick="removeRowPay(this)" data-index="'+list1Index+'" class="fa fa-minus-circle danger control-label"></i>'
			        + '</div>'
			        + '</div>');
	} else {
		 $(e).parent().parent().parent().append('<div class="payment addPayment">'
			        + ' <div class="col-sm-4" >'
			        + '     <select class="form-control">'
			        + '		<option value="1">现金</option>'
			        + '        <option value="2">刷卡</option>'
			        + '        <option value="3">支票</option>'
			        + '        <option value="4">汇款-微信</option>'
			        + '        <option value="5">汇款-支付宝</option>'
			        + '        <option value="6">汇款-网络</option>'
			        + '        <option value="7">银行转账</option>'
			        + '        <option value="8">分期</option>'
			        + '     </select>'
			        + '  </div>'
			        + '  <div class="col-sm-5">'
			        + '     <input ondblclick="dbclickCTB(this)" class="form-control zjsjflag" isat="1" onkeyup="sshjCTB(this)" type="text" placeholder="0" >'
			        + '	    <input type="hidden" name="payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
			        + ' </div>'
			        + '<div class="col-sm-3">'
			        + '  <i onclick="removeRowPay(this)" data-index="'+list1Index+'" class="fa fa-minus-circle danger control-label"></i>'
			        + '</div>'
			        + '</div>');
	}
}












