//点击添加产品按钮初始化弹框信息
function appendProjectFun() {
	//清空上次生成的课程信息
	$(".addProject").find("select.removeFlag").each(function(i,e){
		$(e).parent().parent().remove();
	});
	//清除上次生成的服务信息
	$(".addProject").find("input[type='checkbox']").each(function(i,e){
		$(e).parent().parent().remove();
	});
	//清除上次生成的缴费信息
	$("#addPayInfo").find("tr").each(function(i,e){
		$(e).remove();
	});
	//初始化chosen-select下拉选
	$("#updateInfoManageCTB").find(".chosen-select").each(function(i,e){
		$(e).html('<option value="">--请选择--</option>');
		$(e).trigger("chosen:updated");
	});
	//初始化时间控件
	//下次缴费时间
    $("#nextPayTimeCTB").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii:ss',
        autoclose: true,
        startDate: new Date()
    })
	//生成产品模型
	genProductModel();
}

//提交继续购买的产品
$('#updateInfoManageCTB').bootstrapValidator({
	submitHandler: function (validator, form, submitButton) {

		//验证是否有需要购买的产品
		var modelObj = $("#productModelIdCTB");
		if(modelObj==null || typeof(modelObj)=="undefined") {
			toastr.error("没有需要购买的商品");
			return;
		}
		//检验主产品如果没有选择考期，考试地区，下次缴费时间就不让选
		var productExamTime = $("#kTimeCTB").val();
		if(productExamTime==null || typeof(productExamTime)=="undefined" || productExamTime=='') {
			 toastr.error("产品考期没有选择");
			return;
		}
		var branchSchool = $("#branchSchoolIdCTB").val();
		if(branchSchool==null || typeof(branchSchool)=="undefined" || branchSchool=='') {
			 toastr.error("考试地区没有选择");
			return;
		}
		var cfValue = $("#cfhjCTB").text();
		if(cfValue==null || typeof(cfValue)=="undefined" || cfValue=='') {
			 toastr.error("缴费信息没有填写");
			return;
		} else {
			if(Number(cfValue)>0) {
				var nextPayTime = $("#nextPayTimeCTB").val();
				if(nextPayTime==null || typeof(nextPayTime)=="undefined" || nextPayTime=='') {
					 toastr.error("下次缴费时间没有选择");
					return;
				}
			}
		}
		
		//判断是否有子产品
		var childModelObj = $("#childProductModelIdCTB");
		if(childModelObj.length<=0) {
			//什么都不做
		} else {
			//如果有子产品还需要验证子产品的考期，考试地区，下次缴费时间，没有就不让选
			var childProductExamTime = $("#childKTimeCTB").val();
			if(childProductExamTime==null || typeof(childProductExamTime)=="undefined" || childProductExamTime=='') {
				 toastr.error("子产品考期没有选择");
				return;
			}
			var childBranchSchool = $("#childBranchSchoolIdCTB").val();
			if(childBranchSchool==null || typeof(childBranchSchool)=="undefined" || childBranchSchool=='') {
				 toastr.error("子产品考试地区没有选择");
				return;
			}
			var childCfValue = $("#childCfhjCTB").text();
			if(childCfValue==null || typeof(childCfValue)=="undefined" || childCfValue=='') {
				 toastr.error("子产品缴费信息没有填写");
				return;
			} else {
				if(Number(childCfValue)>0) {
					var childNextPayTime = $("#childNextPayTimeCTB").val();
					if(childNextPayTime==null || typeof(childNextPayTime)=="undefined" || childNextPayTime=='') {
						 toastr.error("子产品下次缴费时间没有选择");
						return;
					}
				}
			}
		}
		
		//得到表单数据：有课程信息和缴费信息
		//将主产品的课程信息下的name值的input赋值
		$(".addProject").find("input.projectInfoManager").each(function(i,e){
			//得到该课程信息下拉选的name值
			var projectName = $(e).parent().find("select :selected").text();
			//将name值传递给隐藏input框，作为传递给后台的参数
			$(e).val(projectName);
		});
		
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
		
		//为consult_info_manage_pay_comp表准备参数-主要是优惠和服务信息，如果有子产品，还有子产品的课程信息
		//打开课程信息下禁止编辑状态，为了提交参数
		$(".addProject").find("input,select").prop("disabled",false);
		//打开子产品课程信息下禁止编辑状态，为了提交参数
		$(".addChildProject").find("input,select").prop("disabled",false);
		
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
		
//		var options = $(obj).parents(".form").serialize();
		var options = $("#addProjectForm").serialize();
		var infoManageId = $("#infoManageId2").val();//咨询id-咨询表主键
		var studentInfoManageId = $("#studentInfoManageId").val();//学员信息表主键
		//拼接的参数依次是主产品实际应缴值，子产品实际应缴值，主产品咨询量状态，子产品咨询量状态，主产品使用优惠码，子产品使用优惠码，
		//主产品咨询量id，子产品咨询量id（组合产品咨询量id相同),主产品id，子产品id
		options += "&sumPrice="+a2+"&childrenProduct.sumPrice="+b2+"&status=7"+"&childrenProduct.status=7"+"&code="+code
		+"&childActivityCode.code="+childCode+"&infoManageId="+infoManageId+"&childrenProduct.infoManageId="+infoManageId
		+"&sPrice="+sPrice+"&childrenProduct.sPrice="+childSPrice+"&studentInfoManageId="+studentInfoManageId
		+"&childrenProduct.studentInfoManageId="+studentInfoManageId;//拼接上实缴，状态

		//提交继续购买的产品
		$.ajax({
	        "type": "Post",
	        "url": ctx + "/consultConsoleSignUp/continueToBuy",
	        "dataType": "json",
	        "data": options,
	        "success": function (data) {
	        	if(data.status="success") {
	        		toastr.success("继续购买产品成功");
	        		init6();
	                $('.addProWin').modal('hide');
	                //在主菜单后添加一个课程二信息
	                $("#branchSchoolId2").parent().parent().after('<div class="form-group col-lg-4 col-md-4 col-sm-6">'
                                    + '<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">继续购买的课程</label>'
                                    + '<div class="col-sm-9 no-padding-right">'
                                    + '   <input class="form-control" value="'+$("#productIdCTB").parent().find("input").val()+'"/>'
                                    + '</div>'
                                + '</div>');
	        	} else {
	        		toastr.error(data.msg);
	        	}
	        },
	        "error":function() {
	        	toastr.error("系统错误");
	        }
		});
	}
})

//生成产品模型
function genProductModel() {
	//初始产品模型,并且回显
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
            	zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
            }
            $("#addProject").find("select.productModel").html('<option value="">--请选择--</option>' + zxkc);
            $("#addProject").find("select.productModel").trigger('chosen:updated');
            $("#addProject").find("select.productModel").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
            //1.产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#productModelCTB").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
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