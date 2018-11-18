//日期时间格式
$(".myDateTime").datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    startDate: new Date(),
    autoclose: true
});

//寄件信息表单提交
$('#expressForm').bootstrapValidator({
	fields: {  
		expresName: {  
	      validators: {  
	          notEmpty: {  
	          message: '快递名称不能为空'  
	          }  
	      }  
	      },
	    expressNum: {  
	      validators: {  
	          notEmpty: {  
	          message: '快递号不能为空'  
	          }  
	      }  
	      },
	    expressUser: {  
    	  validators: {  
    		  notEmpty: {  
    			  message: '收件人不能为空'  
    		  }  
    	  }  
          },
        expressData: {  
    	  validators: {  
    		  notEmpty: {  
    			  message: '快递日期不能为空'  
    		  }  
    	  }  
          }
	  },
    submitHandler: function (validator, form, submitButton) {
    	var paramStr = getTableContent();//获取页面选中咨询量的infomanageid和productid集合
    	if(paramStr==null || paramStr=='') {
    		toastr.error("页面没有咨询量选中值.");
    		return ;
    	}
    	
        var options = form.serialize();//得到用户填写快递信息
        
        options += "&"+paramStr;
        
        $.ajax({
            "type": "Post",
            "url": ctx + "/examWorkbenchExpress/addRecord",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".express-set").modal("hide");
                ApplyDataTable.init();
                if(data.status=="success") {
                	toastr.success("寄件成功");
                } else {
                	toastr.error("寄件失败");
                }
            },
            "error": function() {
            	toastr.error("系统错误");
            }
        });

    }
});


//清空验证
$('.express-set').on('hidden.bs.modal', function() {
		$('#expressForm').data('bootstrapValidator').resetForm();
    });

var tableObj;
//dataTable获取选中行内容
function getTableContent(){  
	var paramArr = new Array();
	$("#alreadyRegistion").find("tbody tr").each(function(i,e){
		var checkObj = $(e).find("td").eq(0).find("input[type='checkbox']");
		var checkFlag = $(checkObj).prop("checked");
		if(checkFlag) {
//			alert($(checkObj).attr("infomanageid")+"========"+$(checkObj).attr("productid"));
			paramArr.push("checkedIds="+$(checkObj).attr("infomanageid")+":"+$(checkObj).attr("productid"));
		}
	});
	var paramStr = paramArr.join("&");
	return paramStr;
}  

//dataTable获取选中行内容-针对费用待支出tab
function getTableContent2(){  
	var record = '';
	record = $("#tab-content2").find("input:radio[name='myRadio']:checked").data("value");
	return record;
} 
//dataTable获取选中行内容-新,取选中行infoManageId-和studentName
function getTableContentNew(){  
	var paramArr = new Array();
	$("#alreadyRegistion").find("tbody tr").each(function(i,e){
		var checkObj = $(e).find("td").eq(0).find("input[type='checkbox']");
		var checkFlag = $(checkObj).prop("checked");
		if(checkFlag) {
//			alert($(checkObj).attr("infomanageid")+"========"+$(checkObj).attr("productid"));
//			paramArr.push("infoManageIds="+$(checkObj).attr("infomanageid"));
			//得到该选中咨询量对应的学员名称，后台返回详细验证信息使用
			var studentName = $(e).find("td").eq(2).text();
			paramArr.push("checkedInfos="+$(checkObj).attr("infomanageid")+":"+studentName);
		}
	});
	var paramStr = paramArr.join("&");
	return paramStr;
}  

//寄件相关按钮点击事件-不同按钮需要传递类型
function expressFun(obj) {
	//判断单击事件来源
	var butName = $(obj).text();
	if(butName=='我要寄件资料') {
		//设置需要传递寄件类型参数
		$("#expressType").val(1);
	} else if(butName=='我要寄件资源') {
		$("#expressType").val(2);
	} else if(butName=='我要寄件分校') {
		$("#expressType").val(3);
	}
	
}

//签收快递表单提交
//寄件信息表单提交
$('#resourceForm').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var paramStr = getTableContent();//获取页面选中咨询量的infomanageid和productid集合
    	if(paramStr==null || paramStr=='') {
    		toastr.error("页面没有咨询量选中值.");
    		return ;
    	}
    	
        $.ajax({
            "type": "Post",
            "url": ctx + "/examWorkbenchExpress/updateRecord",
            "dataType": "json",
            "data": paramStr,
            "success": function (data) {
                $(".resource-get").modal("hide");
                ApplyDataTable.init();
                if(data.status=="success") {
                	toastr.success("寄件成功");
                } else {
                	toastr.error("寄件失败");
                }
            }
        });
    }
});

//省市获取值
function chose_get_value(select) {
    return $(select).val();
}
//省市获取选中的文本
function chose_get_text(select) {
    return $(select + " option:selected").text();
}
function phoneBelong(parentEle) {
    $(parentEle).find('.attribution .confirm-btn').click(function () {
    	 
        if (chose_get_value(parentEle + ' .province') != 0 && chose_get_value(parentEle + ' .city') != 0) {
            $(parentEle).find('.bankPC').val(chose_get_text(parentEle + ' .province') + chose_get_text(parentEle + ' .city'));
            $(parentEle).find('.attribution').fadeOut();
        }
    });
    $(parentEle).find('.attribution .cancel-btn').click(function () {
        $(parentEle).find('.attribution').fadeOut();
    });

}
phoneBelong('#applyOutForm');
//电话归属地-单击显示省市选择弹窗
$("#bankPC").on({
    focus: function () {
        $('#provinceCity').fadeIn();
    },
    click: function () {
        $('#provinceCity').fadeIn();
    },
});
//初始化时省市弹窗隐藏
$('#provinceCity').hide();
//初始化电话归属地（省）
$.ajax({
    url: ctx + '/address/getAllOption',
    type: 'POST',
    data: {level: 1,enable:1},
    dataType: 'json',
    success: function (data) {
        var sheng = "";
        for (var i = 0; i < data.list.length; i++) {
            sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
            //console.info(sheng);
            // 
        }
        $("#addprovince").html('<option value="0">--请选择--</option>' + sheng);
        $("#addprovince").trigger('chosen:updated');
        $("#addprovince").chosen();
        $('.chosen-container').width('100%');
    },
    error: function (response) {
        toastr.error("系统错误");
    }
});
//初始化电话归属地（市）
$('#addprovince').change(function () {
    var addressId = $('#addprovince :selected').val();
    $.ajax({
        url: ctx + '/address/getAllOption',
        type: 'POST',
        data: {level: 2, addressId: addressId,enable:1},
        dataType: 'json',
        success: function (data) {
            var shi = "";
            for (var i = 0; i < data.list.length; i++) {
                shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
            }
            $("#addcity").html('<option value="">--请选择--</option>' + shi);
            $('#addcity').trigger('chosen:updated');
            $("#addcity").chosen();
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
});

//申请费用-提交功能
$('#applyOutForm').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var origin = $("#origin").val();//得到超链接来源
      //得到当前数据状态值和将更新后的状态值
    	var statusParam = autoUpdateStatus();
    	//费用申请
        if(origin=="1") {
        	//如果链接来自申请费用页面
        	var paramStr = getTableContentNew();//获取页面选中咨询量的infomanageIds集合
        	if(paramStr==null || paramStr=='') {
        		toastr.error("页面没有咨询量选中值.");
        		return ;
        	}
        	var options = form.serialize();
        	options += "&"+paramStr;
        	
        	$.ajax({
                "type": "Post",
                "url": ctx + "/examWorkbenchExpress/applyPayFees",
                "dataType": "json",
                "data": options+"&"+statusParam,
                "success": function (data) {
                    $(".application-expenditure").modal("hide");
                    ApplyDataTable.init();
                    if(data.status=="success") {
                    	toastr.success("申请费用成功");
                    } else {
                    	toastr.error("申请费用失败");
                    	toastr.error(data.msg);
                    }
                }
            });
          //费用支出
        } else if(origin=="2"){
        	//如果链接来自申请支出页面
        	//先判断页面有没有申请详情被选中,初始值为true,没有选中项
        	var errFlag = true;
        	var infoManageIdArr = new Array();//用于记录选中的infoManageId
        	$("#applyDetailTbody").find("tr").each(function(i,e){
        		var checkStatus = $(e).find("td").eq(0).find('input[type="checkbox"]').prop("checked");
        		if(checkStatus) {
        			//只要有一个选中项就将errFlag制错
        			errFlag = false;
        			//得到该选中申请明细的infoManageId
        			infoManageIdArr.push("infoManageId="+$(e).find("input[type='checkbox']").data("value"));
        		}
        	});
        	
        	if(errFlag) {
        		$("#applyOutForm").find("button[type='submit']").prop("disabled",false);
        		toastr.error("费用支出栏没有支出明细被选中");
        		return ;
        	}

        	//整理选中的infoManageId
        	var infoManageIds = "&"+infoManageIdArr.join("&");
        	//得到页面选中productId
        	var productId = "&productId="+$("#productId").val();
        	//设置页面选中的申请id
        	var record = getTableContent2();//得到当前页面选中费用待支出对象
        	$("#applyId").val(record.applyId);
        	
        	var options = form.serialize();
        	
        	$.ajax({
                "type": "Post",
                "url": ctx + "/examWorkbenchExpress/applyPayOut",
                "dataType": "json",
                "data": options+"&"+statusParam+infoManageIds+productId,
                "success": function (data) {
                    $(".application-expenditure").modal("hide");
                    WaitForOutTable.init();
                    if(data.status=="success") {
                    	toastr.success("费用支出成功");
                    } else {
                    	toastr.error("费用支出失败");
                    	toastr.error(data.msg);
                    }
                }
            });
        	//费用待支出回退
        } else if(origin=="3") {
        	//先判断页面有没有申请详情被选中,初始值为true,没有选中项
        	var errFlag = true;
        	var infoManageIdArr = new Array();//用于记录选中的infoManageId
        	$("#applyDetailTbody").find("tr").each(function(i,e){
        		var checkStatus = $(e).find("td").eq(0).find('input[type="checkbox"]').prop("checked");
        		if(checkStatus) {
        			//只要有一个选中项就将errFlag制错
        			errFlag = false;
        			//得到该选中申请明细的infoManageId
        			infoManageIdArr.push("infoManageId="+$(e).find("input[type='checkbox']").data("value"));
        		}
        	});
        	
        	if(errFlag) {
        		$("#applyOutForm").find("button[type='submit']").prop("disabled",false);
        		toastr.error("费用支出栏没有支出明细被选中");
        		return ;
        	}

        	//整理选中的infoManageId
        	var infoManageIds = "&"+infoManageIdArr.join("&");
        	//得到单价
        	var money = $("#money");
        	var options = form.serialize();
        	options += "&money="+money;
        	//得到当前状态和要回退的前一个状态
        	statusParam = autoBackStatus();
        	
        	$.ajax({
                "type": "Post",
                "url": ctx + "/examWorkbenchExpress/applyBack",
                "dataType": "json",
                "data": options+statusParam+infoManageIds,
                "success": function (data) {
                    $(".application-expenditure").modal("hide");
                    if(data.status=="success") {
                    	toastr.success("费用回退成功");
                    	WaitForOutTable.init();
                    } else {
                    	toastr.error("费用回退失败");
                    	toastr.error(data.msg);
                    }
                }
            });
        }
        
    }
});

//控制申请费用弹窗中明细表格的显示和隐藏-如果是来源自费用支出，还需要做信息回显
function openWin(flag) {
	$('#applyOutForm').find("button").prop("disabled",false);
	//回显产品名称
	$('#applyOutForm').find("input.productName").val($("#productName").val());
	//清除上一次操作残留数据
	//单价清除
	$('#money').val('');
	//清楚支出明细和发票抬头
	$('.qingchu').val('');
	//申请说明清除
	contentEditor.html('');
	contentEditor.sync();
	//备注清除
	illustrateEditor.html('');
	illustrateEditor.sync();
	//清除开户行信息
	$("#bankName").val('');
	//清除开户行所在省
	$("#addProvinceName").val('');
	$("#addprovince").html('');
	//清除开户行所在市
	$("#addCityName").val('');
	$("#addcity").val('');
	//清除页面显示省市信息
	$("#bankPC").val('');
	//清除开户人信息
	$("#accountName").val('');
	//清除开户人账号信息
	$("#accountNum").val('');
	//清除开户人电话
	$("#phone").val('');
	
	var paramStr = '';
	var record = '';
	 
	if(flag=="1") {

		$('.application-expenditure .widget-caption').text('申请费用');
		//点击来自申请费用,需要判断是否有咨询量被选中
		paramStr = getTableContent();//获取页面选中咨询量的infomanageid和productid集合
		if(paramStr==null || paramStr=='') {
			toastr.error("页面没有咨询量选中值.");
			return ;
		}
		//点击来自申请费用，隐藏费用明细表
		$("#applyOutTable").hide();
		//设置弹窗事件来源
		$("#origin").val(1);
	} else {

		$('.application-expenditure .widget-caption').text('申请支出');
		//点击来自费用待支出,需要判断是否有费用申请被选中
		record = getTableContent2();
		if(record==null || record=='') {
			toastr.error("必须选中一条费用申请记录.");
			return ;
		}
		//点击来自申请支出，显示费用明细表
		$("#applyOutTable").show();
		//设置弹窗事件来源
		$("#origin").val(2);
		
		//回显单价
		$("#money").val(record.money);
		//回显申请说明
		if(record.content!=null) {
			contentEditor.html(record.content);
		} else {
			contentEditor.html("");
		}
		contentEditor.sync();
		//回显备注
		if(record.illustration!=null) {
			illustrateEditor.html(record.illustration);
		} else {
			illustrateEditor.html("");
		}
		illustrateEditor.sync();
	}
	
	//查询选中产品和考期下所有支出费用
	var examTimeId = $("#examTimeId").val();
	var productId = $("#productId").val();
	
		//查询申请费用
		$.ajax({
			"type": "Post",
			"url": ctx + "/examWorkbenchExpress/appendPayDiv",
			"dataType": "json",
			"data": {
				productId:productId,
				examTimeId:examTimeId,
				expensesType:1//支出类型
			},
			"success": function (data) {
				if(data.status=="success") {
					var str = "<option value=''>--请选择--</option>";
					for(var i=0; i<data.list.length; i++) {
						if(record!=null && record!='') {
							//record不为空，需要做回显
							if(record.payCodeId==data.list[i].expensesTypeId) {
								str += '<option value="'+data.list[i].expensesTypeId+'" selected>'+data.list[i].expensesTypeName+'</option>';
							} else {
								str += '<option value="'+data.list[i].expensesTypeId+'">'+data.list[i].expensesTypeName+'</option>';
							}
						} else {
							str += '<option value="'+data.list[i].expensesTypeId+'">'+data.list[i].expensesTypeName+'</option>';
						}
					}
					$("#payCodeId").html(str);
//					$("#payCodeId").trigger('chosen:updated');
//					$("#payCodeId").chosen({no_results_text: "没有匹配项"});
//			        $('.chosen-container').width('100%');
				} else {
					toastr.error("费用查询失败");
				}
			}
		});
	 
		//查找财务配置费用类别-父类
		$.ajax({
			"type": "Post",
			"url": ctx + "/examWorkbenchExpress/getCostClass",
			"dataType": "json",
			"data": {
				parentId:0
			},
			"success": function (data) {
				if(data.status=="success") {
//					var str = "<option value=''>--请选择--</option>";
					var str = '';
					for(var i=0; i<data.list.length; i++) {
						if(record!=null && record!='') {
							//record不为空，需要做回显
							if(record.pCostclassId==data.list[i].feeId) {
								str += '<option value="'+data.list[i].feeId+'" data-value=\''+JSON.stringify(data.list[i].childList)+'\' selected>'+data.list[i].feeName+'</option>';
							} else {
								str += '<option value="'+data.list[i].feeId+'" data-value=\''+JSON.stringify(data.list[i].childList)+'\'>'+data.list[i].feeName+'</option>';
							}
						} else {
							str += '<option value="'+data.list[i].feeId+'" data-value=\''+JSON.stringify(data.list[i].childList)+'\'>'+data.list[i].feeName+'</option>';
						}
					}
					$("#feeParentId").html(str);
					//以下回显部分
					if(record!=null && record!='') {
						if(record.pCostclassId!=null) {
							//触发change事件，回显子类别费用
							//生成子类别费用option
							$("#feeParentId").trigger("change");
							//选中子类别费用
							if(record.costclassId!=null) {
								$("#feeChildId").find("option[value='"+record.costclassId+"']").prop("selected",true);
							}
						}
					}
				} else {
					toastr.error("费用查询失败");
				}
			}
		});
		
	 //得到常用收款人
	 $.ajax({
         "type": "Post",
         "url": ctx + "/examWorkbenchExpress/getFinancePayee",
         "dataType": "json",
         "data": {
        	 parentId:0
         },
         "success": function (data) {
             if(data.status=="success") {
            	 var str = "<option value=''>--请选择--</option>";
            	 for(var i=0; i<data.list.length; i++) {
            	    if(record!=null && record!='') {
						//record不为空，需要做回显
						if(record.payeeId==data.list[i].financePayeeId) {
							str += '<option value="'+data.list[i].financePayeeId+'" data-value=\''+JSON.stringify(data.list[i])+'\' selected>'+data.list[i].accountName+'</option>';
						} else {
							str += '<option value="'+data.list[i].financePayeeId+'" data-value=\''+JSON.stringify(data.list[i])+'\'>'+data.list[i].accountName+'</option>';
						}
					} else {
						str += '<option value="'+data.list[i].financePayeeId+'" data-value=\''+JSON.stringify(data.list[i])+'\'>'+data.list[i].accountName+'</option>';
					}
            	 }
            	 $("#financePayee").html(str);
            	 //触发change事件，回显常用收款人详细信息
            	 //如果收款人栏没有原始值，不用回显
            	 if($("#financePayee").val()) {
            		 $("#financePayee").trigger("change");
            	 } else {
            	 }
             } else {
             	toastr.error("费用查询失败");
             }
         }
     });
	 //判断有无费用申请详情
	 if(record!=null && record!='') {
		 //开始构造table详细信息
		 //查询申请费用详情
		 $.ajax({
	         "type": "Post",
	         "url": ctx + "/examWorkbenchExpress/getApplyDetail",
	         "dataType": "json",
	         "data": {
	        	 applyId:record.applyId
	         },
	         "success": function (data) {
	        	 var str = "";
	        	 if(data.status=="success") {
	        		 for(var i=0; i<data.data.length; i++) {
		        		 str +='	 <tr id='+data.data[i].detailId+'>                                     '
					         +'    <td>                                   '
					         +'        <div class="checkbox">             '
					         +'            <label>                        '
					         +'                <input type="checkbox" onclick="calSumMoney(\''+$("#money").val()+'\')" name="detailId" value='+data.data[i].detailId+' data-value="'+data.data[i].infoManageId+'">    '
					         +'                <span class="text"></span> '
					         +'            </label>                       '
					         +'        </div>                             '
					         +'    </td>                                  '
					         +'    <td>'+(data.data[i].applicantDate==null?'':data.data[i].applicantDate)+'</td>                              '
					         +'    <td>'+(data.data[i].studentName==null?'':data.data[i].studentName)+'</td> ';
					         //0 正常 1转班，2休学，3退费，4补考 5重修,6 退费中 7转化 8-初申 9-已退费 11已经转班
		        		 if(data.data[i].unAction==null) {
		        			 str += '    <td></td> ';
		        		 } else if(data.data[i].unAction=="0") {
		        			 str += '    <td>'+'正常'+'</td> ';
		        		 } else if(data.data[i].unAction=="1") {
		        			 str += '    <td>'+'转班'+'</td> ';
		        		 } else if(data.data[i].unAction=="2") {
		        			 str += '    <td>'+'休学'+'</td> ';
		        		 } else if(data.data[i].unAction=="3") {
		        			 str += '    <td>'+'退费'+'</td> ';
		        		 } else if(data.data[i].unAction=="4") {
		        			 str += '    <td>'+'补考'+'</td> ';
		        		 } else if(data.data[i].unAction=="5") {
		        			 str += '    <td>'+'重修'+'</td> ';
		        		 } else if(data.data[i].unAction=="6") {
		        			 str += '    <td>'+'退费中'+'</td> ';
		        		 } else if(data.data[i].unAction=="7") {
		        			 str += '    <td>'+'转化'+'</td> ';
		        		 } else if(data.data[i].unAction=="8") {
		        			 str += '    <td>'+'初申'+'</td> ';
		        		 } else if(data.data[i].unAction=="9") {
		        			 str += '    <td>'+'已退费'+'</td> ';
		        		 } else if(data.data[i].unAction=="11") {
		        			 str += '    <td>'+'已经转班'+'</td> ';
		        		 }
					      str += '    <td>'+(data.data[i].ktimeValue==null?'':data.data[i].ktimeValue)+'</td>                              '
					         +'    <td>'+(data.data[i].productName==null?'':data.data[i].productName)+'</td>                              '
					         +'    <td>'+(data.data[i].yjValue==null?'':data.data[i].yjValue)+'</td>                              '
					         +'    <td>'+(data.data[i].sjValue==null?'':data.data[i].sjValue)+'</td>                              '
					         //资料查看
					         +'    <td><a href="#" data-record="'+data.data[i].infoManageId+'"'
					         +' data-record2="'+data.data[i].productId+'"'
					         +' data-record3="'+data.data[i].ktimeValue+'"' 
					         +' onclick="showMaterial(this)" data-toggle="modal" data-target=".material-dialog">'
					         +' <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看">'
					         +' </i></a></td>';
					     //费用支付记录
					      str += ' <td> <a href="javascript:void(0);" data-record="'+data.data[i].infoManageId+'"'
					      	 + ' data-record2="'+data.data[i].productId+'"'
					      	 + ' onclick="feeInfoClickShow(this)" >'
					      	 + ' <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看">'
					      	 + ' </i></a></td>';
					         
					      str += '<td><a href="#" class="delete" onclick="rebackStatus(\''+record.applyId+'\',\''
					      					+data.data[i].infoManageId+'\',\''
					      					+data.data[i].detailId+'\')">'
					      		+ '<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></td>';
					      str += '</tr>';
		        	 } 
	        	 }
	        	 $("#applyDetailTbody").html(str);
	         }
		 });
	 }
}

//根据页面选中的复选框，计算总计金额
function calSumMoney(price) {
	var count = $("#applyDetailTbody").find("input[name='detailId']:checked").length;
	if(count==null || count == 0) {
		//z总金额为0
		$("#totalMoney").val(0);
	} else {
		$("#totalMoney").val(Number(count)*Number(price));
	}
}

//配置类别联动效果
$("#feeParentId").change(function(e){
	var jsonObj = $("#feeParentId").find(":selected").data("value");
//	var str = "<option value=''>--请选择--</option>";
	var str = "";
	if(jsonObj!=null && jsonObj!='') {
		for(var i=0; i<jsonObj.length; i++) {
			str += '<option value="'+jsonObj[i].feeId+'">'+jsonObj[i].feeName+'</option>';
		}
	}
	$("#feeChildId").html(str);
});

//常用收款人联动效果
function payeeChange() {
	//回显开户行信息
	//得到开户行信息
	var jsonObj = $("#financePayee").find(":selected").data("value");
	var bankName = jsonObj.bankName;
	$("#bankName").val(bankName);
	//回显开户行所在省
	var province = jsonObj.province;
	var provinceId = jsonObj.provinceId;
	$("#addProvinceName").val(province);
	$("#addprovince").html('<option value="'+provinceId+'" selectd>'+province+'</option>');
	//回显开户行所在市
	var city = jsonObj.city;
	var cityId = jsonObj.cityId;
	$("#addCityName").val(cityId);
	$("#addcity").html('<option value="'+cityId+'" selected>'+city+'</option>');
	//回显页面显示省市信息
	$("#bankPC").val(province+city);
	//回显开户人信息
	var accountName = jsonObj.accountName;
	$("#accountName").val(accountName);
	//回显开户人账号信息
	var accountNum = jsonObj.accountNum;
	$("#accountNum").val(accountNum);
	//回显开户人电话
	var phone = jsonObj.phone;
	$("#phone").val(phone);

}
//$("#financePayee").change(function(i,e){});

//计算页面总金额
function calcuTotal(obj) {
	var paramStr = getTableContentNew();//获取页面选中咨询量的infomanageIds集合
	if(paramStr==null || paramStr=='') {
//		toastr.error("页面没有咨询量选中值.");
		return ;
	} else {
		var unitPrice = $(obj).val();
		//单价金额校验
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(reg.test(unitPrice)) {
			var count = paramStr.split('&').length;
			//显示总价
			$("#totalMoney").val(Number(unitPrice)*Number(count));
		}
	}
}


//为tab标签绑定单击事件，根据传入的tab标签名展示相应查询内容
function loadContent(tabId,tabName) {
	//显示按钮列表
	$("#buttonList").show();
	//加载数据前，先隐藏所有按钮，后面根据权限回显
	$("#buttonList").find("button").hide();
	//更新当前选中二级菜单id
	$("#aplliedforStatus").val(tabId);
	//费用待支出
	if(tabId=='10000' || tabName=='费用待支出') {
		//显示，查询finance_apply_bak表
		WaitForOutTable.init();
		$("#tab-content2").show();
		$("#tab-content").hide();
	} else {
		//显示，查询service_exam_workbenth表
		ApplyDataTable.init();
		$("#tab-content").show();
		$("#tab-content2").hide();
	}
	var productId = $("#productId").val();
	//按钮权限展示-查询该产品报考流程下，选中二级状态下的数据
	 $.ajax({
         "type": "Post",
         "url": ctx + "/examWorkbenchExpress/showButtonList",
         "dataType": "json",
         "data": {
        	 productId:productId,
        	 childId:tabId
         },
         "success": function (data) {
        	 
        	 //安权限回显按钮-scode=20001成功状态码
        	if(data.scode=="20001") {
        		for(var i=0; i<data.data.length; i++) {
        			$("#but"+data.data[i].buttonId).show();
        		}
        	}
         }
	 });
}

//更新报考工作台当前状态-得到当前数据状态和下一步状态
function autoUpdateStatus() {
	var statusParams = '';//用于记录最后需要返回的结果
	//得到页面当前选中一级导航
	var mainStatus = $("#mainStatus").val();
	//存储旧的主导航状态
	statusParams += "&mainStatus="+mainStatus;
	//得到页面当前选中二级导航
	var aplliedforStatus = $("#aplliedforStatus").val();
	//存储旧的二级导航状态
	statusParams += "&aplliedforStatus="+aplliedforStatus;
	//得到下一级二级导航id
	var selectFlag = -1;//记录当前选中菜单在父容器下的位置
	$("#flowUl"+mainStatus).find("li").each(function(i,e){
		if($(e).hasClass("active")) {
			selectFlag = i;
		}
	});
	var aplliedforStatusNew = '';
	var mainStatusNew = '';
	//记录当前选中菜单的下一个兄弟菜单
	var nextObj = $("#flowUl"+mainStatus).find("li.aplliedforStatus").eq(Number(selectFlag)+1);
	if(nextObj!=null) {
		//如果页面选中二级菜单后还有菜单项
		aplliedforStatusNew = $(nextObj).find("a.aplliedforStatus").attr('id');
		//存储新的二级导航状态
		statusParams += "&aplliedforStatusNew="+aplliedforStatusNew;
		//主状态还是当前状态
		mainStatusNew = mainStatus;
		statusParams += "&mainStatusNew="+mainStatusNew;
	} else {
		//如果下一级二级导航id没有找到，就找下一级一级导航
		$("#myTab").find("li.mainStatus").each(function(i,e){
			if($(e).hasClass("active")) {
				selectFlag = i;
			}
		});
		nextObj = $("#myTab").find("li.mainStatus").eq(Number(selectFlag)+1);
		if(nextObj!=null) {
			//如果页面选中二级菜单后还有菜单项
			mainStatusNew = $(nextObj).find("a.mainStatus").attr('id');
			//得到该新二级菜单下的第一个子菜单的状态
			aplliedforStatusNew = $("#flowUl"+mainStatusNew).find("li.aplliedforStatus").eq(0).find("a.aplliedforStatus").attr('id');
			//存储新的主导航状态
			statusParams += "&mainStatusNew="+mainStatusNew;
		} else {
			//报错，没有下一级状态了
			toastr.error("没有下一级状态了");
		}
	
	}
	return statusParams;
}


//更新报考工作台当前状态-得到当前数据状态和要回退的前一个状态
function autoBackStatus() {
	var statusParams = '';//用于记录最后需要返回的结果
	//得到页面当前选中一级导航
	var mainStatus = $("#mainStatus").val();
	//存储旧的主导航状态
	statusParams += "&mainStatus="+mainStatus;
	//得到页面当前选中二级导航
	var aplliedforStatus = $("#aplliedforStatus").val();
	//存储旧的二级导航状态
	statusParams += "&aplliedforStatus="+aplliedforStatus;
	//得到上一级二级导航id
	var selectFlag = -1;//记录当前选中菜单在父容器下的位置
	$("#flowUl"+mainStatus).find("li").each(function(i,e){
		if($(e).hasClass("active")) {
			selectFlag = i;
		}
	});
	var aplliedforStatusNew = '';
	var mainStatusNew = '';
	//记录当前选中菜单的上一个兄弟菜单
	var beforeObj = $("#flowUl"+mainStatus).find("li.aplliedforStatus").eq(Number(selectFlag)-1);
	if(beforeObj!=null) {
		//如果页面选中二级菜单后还有菜单项
		aplliedforStatusNew = $(beforeObj).find("a.aplliedforStatus").attr('id');
		//存储新的二级导航状态
		statusParams += "&aplliedforStatusNew="+aplliedforStatusNew;
	} else {
		//主状态还是当前状态
		mainStatusNew = mainStatus;
		statusParams += "&mainStatusNew="+mainStatusNew;
	}
	//如果上一级二级导航id没有找到，就找上一级一级导航状态
	if(aplliedforStatusNew==null || aplliedforStatusNew=='') {
		$("#myTab").find("li.mainStatus").each(function(i,e){
			if($(e).hasClass("active")) {
				selectFlag = i;//记录当前选中一级导航位置
			}
		});
		beforeObj = $("#myTab").find("li.mainStatus").eq(Number(selectFlag)-1);
		if(beforeObj!=null) {
			//如果页面选中二级菜单后还有菜单项
			mainStatusNew = $(beforeObj).find("a.mainStatus").attr('id');
			//得到该新二级菜单下的第一个子菜单的状态
			aplliedforStatusNew = $("#flowUl"+mainStatusNew).find("li.aplliedforStatus").eq(0).find("a.aplliedforStatus").attr('id');
			//存储新的主导航状态
			statusParams += "&mainStatusNew="+mainStatusNew;
		}
	}
	
}

////打开快递弹框同时，清空数据
$('.express-set').on('show.bs.modal', function () {
	//因为弹窗中用到的日期插件datatimespicker单击时会自动调用所在弹框的show和hide方法，所以要加如下判断
	if($(this).is(":visible")) {
		
	} else {
		$(this).find("input").val('');
	}
});















