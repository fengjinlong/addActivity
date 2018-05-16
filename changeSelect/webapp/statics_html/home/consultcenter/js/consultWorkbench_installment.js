//勾选分期复选框——生成分期来源下拉框，期次下拉框，并将欠费栏标题改为分期, 为隐藏域付是否分期标志
function installmentFun(obj) {
	if(!obj.checked) {
		//1.清除分期来源下拉框
		$("#mainInstallmentBankDiv").remove();
		//2.清除期次下拉框
		$("#mainInstallmentSortDiv").remove();
		//3.将欠费栏标题改回欠费
		$("#mainPayFeesTR").find("th").eq(5).text("欠费");
		//4.为隐藏域付是否分期赋值-0-不分期
		$("#mainIsInstallment").val("0");
	} else {
		//1.生成分期来源下拉框-拼接到分期复选框后面
		var str1 = '<div class="form-group col-lg-4 col-md-4 col-sm-6" id="mainInstallmentBankDiv">'
	           	  + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">分期来源：</label>'
	              + '   <div class="col-sm-9 no-padding-right">'
	              + '       <select name="installmentBankId" class="form-control chosen-select">'
	              + '       </select>'
	              + '   </div>'
	              + '</div>';
		$("#mainInstallmentDiv").after(str1);
		
		//2.生成期次下拉框-拼接分期来源下拉框后面
		var str2 = '<div class="form-group col-lg-4 col-md-4 col-sm-6" id="mainInstallmentSortDiv">'
	     	    + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">分期种类：</label>'
		        + '   <div class="col-sm-9 no-padding-right">'
		        + '       <select name="installmentSortId" class="form-control chosen-select">'
		        + '       </select>'
		        + '   </div>'
		        + '</div>';
		$("#mainInstallmentBankDiv").after(str2);
		//3.将欠费栏标题改为分期
		$("#mainPayFeesTR").find("th").eq(5).text("分期");
		//4.为主产品隐藏域付是否分期标志
		$("#mainIsInstallment").val("1");
		
		//查询分期来源和期次
		$.ajax({
	        url: ctx + '/consultInstallment/getInstallBankAndSort',
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        	if(data.status=="success") {
	        		var tempStr1 = "";
	        		for(var i=0; i<data.data.listBank.length; i++) {
	        			tempStr1 += '<option value="'+data.data.listBank[i].bankId+'">'+data.data.listBank[i].bankName+'</option>';
	        		}
	        		//拼接分期来源
	        		$("#mainInstallmentBankDiv").find("select").html(tempStr1);
	        		$("#mainInstallmentBankDiv").find("select").trigger("chosen:updated");
	        		
	        		var tempStr2 = "";
	        		for(var j=0; j<data.data.listSort.length; j++) {
	        			tempStr2 += '<option value="'+data.data.listSort[j].sortId+'">'+data.data.listSort[j].sortName+'</option>';
	        		}
	        		//拼接期次
	        		$("#mainInstallmentSortDiv").find("select").html(tempStr2);
	        		$("#mainInstallmentSortDiv").find("select").trigger("chosen:updated");
	        		
	        	} 
	        }
		});
	}
}


//子产品
//勾选分期复选框——生成分期来源下拉框，期次下拉框，并将欠费栏标题改为分期, 为隐藏域付是否分期标志
function installmentFunForC(obj) {
	if(!obj.checked) {
		//1.清除分期来源下拉框
		$("#childInstallmentBankDiv").remove();
		//2.清除期次下拉框
		$("#childInstallmentSortDiv").remove();
		//3.将欠费栏标题改回欠费
		$("#childPayFeesTR").find("th").eq(5).text("欠费");
		//4.为隐藏域付是否分期赋值-0-不分期
		$("#childIsInstallment").val("0");
	} else {
		//1.生成分期来源下拉框-拼接到分期复选框后面
		var str1 = '<div class="form-group col-lg-4 col-md-4 col-sm-6" id="childInstallmentBankDiv">'
	           	  + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">分期来源：</label>'
	              + '   <div class="col-sm-9 no-padding-right">'
	              + '       <select name="installmentBankId" class="form-control chosen-select">'
	              + '       </select>'
	              + '   </div>'
	              + '</div>';
		$("#childInstallmentDiv").after(str1);
		//2.生成期次下拉框-拼接分期来源下拉框后面
		var str2 = '<div class="form-group col-lg-4 col-md-4 col-sm-6" id="childInstallmentSortDiv">'
	     	    + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">分期种类：</label>'
		        + '   <div class="col-sm-9 no-padding-right">'
		        + '       <select name="installmentSortId" class="form-control chosen-select">'
		        + '       </select>'
		        + '   </div>'
		        + '</div>';
		$("#childInstallmentBankDiv").after(str2);
		//3.将欠费栏标题改为分期
		$("#childPayFeesTR").find("th").eq(5).text("分期");
		//4.为子产品隐藏域付是否分期标志
		$("#childIsInstallment").val("1");
		
		//查询分期来源和期次
		$.ajax({
	        url: ctx + '/consultInstallment/getInstallBankAndSort',
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        	if(data.status=="success") {
	        		var tempStr1 = "";
	        		for(var i=0; i<data.data.listBank.length; i++) {
	        			tempStr1 += '<option id="'+data.data.listBank[i].bankId+'">'+data.data.listBank[i].bankName+'</option>';
	        		}
	        		//拼接分期来源
	        		$("#childInstallmentBankDiv").find("select").html(tempStr1);
	        		$("#childInstallmentBankDiv").find("select").trigger("chosen:updated");
	        		
	        		var tempStr2 = "";
	        		for(var j=0; j<data.data.listSort.length; j++) {
	        			tempStr2 += '<option id="'+data.data.listSort[j].sortId+'">'+data.data.listSort[j].sortName+'</option>';
	        		}
	        		//拼接期次
	        		$("#childInstallmentSortDiv").find("select").html(tempStr2);
	        		$("#childInstallmentSortDiv").find("select").trigger("chosen:updated");
	        		
	        	} 
	        }
		});
	}
	
}

//报名状态回显分期条件
function showInstallment(infoManageId,productId) {
	//查询该咨询量的分期信息
	$.ajax({
        url: ctx + '/consultInstallment/getInstallmentInfo',
        type: 'POST',
        data: { infoManageId: infoManageId, productId:productId},
        dataType: 'json',
        success: function (data) {
        	//不是分期产品，清除之前生成的标题列
 			var thObj = $("#baoMingFeeTR").find("th").eq(6);
 			if(thObj!=null) {
 				thObj.remove();
 			}
        	 if(data.status=="success") {
        		 
        		 if(data.data==null) {
        			
         			return ;
        		 }
        		 if(data.data.isInstallment=="1") {
        			 //该产品是分期产品
        			 //判断该产品是否是分期确认
        			 if(data.data.isReceiveInstallment=="1") {
        				 //该产品已收到分期款项
        				 //缴费信息标题栏增加一列——分期确认
//        				 $("#baoMingFeeTR").find("th").eq(5).text("分期确认");
        				 var str = "<th>分期确认</th>";
        				 $("#baoMingFeeTR").append(str);
        				 
        			 } else {
        				////缴费信息标题栏增加一列——分期未确认
//        				 $("#baoMingFeeTR").find("th").eq(5).text("分期未确认");
        				 var str = "<th>分期未确认</th>";
        				 $("#baoMingFeeTR").append(str);
        				 
        			 }
        			 
        		 } else {
        			 //不是分期产品，清除之前生成的标题列
        			var thObj = $("#baoMingFeeTR").find("th").eq(6);
        			if(thObj!=null) {
        				thObj.remove();
        			}
        		 }
        	 }
        }
    });
}



//根据咨询量id，费用编码-查询支付方式和支付金额
//新增-分期费用回显
function findZhiFuNew(infoManageId, payCodeId,  productId ,dPrice) {
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultConsoleSignUp/findZhiFuNew",//查询每种费用类型支付方式和支付金额
        "dataType": "json",
        "data": {
            "infoManageId": infoManageId,
            "productId" : productId,
            "payCodeId" :payCodeId
        },
        "success": function (data) {
        	
        	if(data.status=='success'){
        		if(data.data.list.length!=0) {
        			$("#"+payCodeId).html("");//清空支付方式列的内容，避免一种缴费方式都没有的情况
        			
        			var tempStr = "";
        			for(var i=0; i<data.data.list.length; i++) {
        				if(dPrice) {
        					if(i==0) {//只在第一行添加一次记录
        						tempStr = '<div class="payment">'
        							+ '<div class="col-sm-4">'
        							+ ' <select class="form-control" disabled>'
        							+ '		<option selected>订座费</option>'
        							+ ' </select>'
        							+ '</div>'
        							+ '<div class="col-sm-5">'
        							+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
        							+ '</div>'
        							+ '<div class="col-sm-3">'
        							+ '</div>'
        							+ '<div class="col-sm-4">'
        							+ '   <select class="form-control" disbaled>';
        					} else {
        						tempStr = '<div class="payment">'
                					+ '<div class="col-sm-4">'
                					+ '   <select class="form-control" disbaled>';
        					}
        				} else {
        					tempStr = '<div class="payment">'
            					+ '<div class="col-sm-4">'
            					+ '   <select class="form-control" disbaled>';
        				}
        				//判断支付方式
        				if(data.data.list[i].payFrom=="1") {
        					tempStr += ' <option value="1" selected>现金</option>';
        				} else {
        					tempStr += ' <option value="1">现金</option>'
        				}
        				if(data.data.list[i].payFrom=="2") {
        					tempStr += ' <option value="2" selected>刷卡</option>';
        				} else {
        					tempStr += ' <option value="2">刷卡</option>'
        				}
        				if(data.data.list[i].payFrom=="3") {
        					tempStr += ' <option value="3" selected>支票</option>';
        				} else {
        					tempStr += ' <option value="3">支票</option>'
        				}
        				if(data.data.list[i].payFrom=="4") {
        					tempStr += ' <option value="4" selected>汇款-微信</option>';
        				} else {
        					tempStr += ' <option value="4">汇款-微信</option>'
        				}
        				if(data.data.list[i].payFrom=="5") {
        					tempStr += ' <option value="5" selected>汇款-支付宝</option>';
        				} else {
        					tempStr += ' <option value="5">汇款-支付宝</option>'
        				}
        				if(data.data.list[i].payFrom=="6") {
        					tempStr += ' <option value="6" selected>汇款-网络</option>';
        				} else {
        					tempStr += ' <option value="6">汇款-网络</option>'
        				}
        				if(data.data.list[i].payFrom=="7") {
        					tempStr += ' <option value="7" selected>银行转账</option>';
        				} else {
        					tempStr += ' <option value="7">银行转账</option>'
        				}
        				if(data.data.list[i].payFrom=="8") {
        					tempStr += ' <option value="8" selected>分期</option>';
        				} else {
        					tempStr += ' <option value="8">分期</option>'
        				}
        				if(data.data.list[i].payFrom=="9") {
        					tempStr += ' <option value="9" selected>结余</option>';
        				} else {
        					tempStr += ' <option value="9">结余</option>'
        				}
        				tempStr +='    </select>'
            					+ '</div>'
            					+ '<div class="col-sm-5">'
            					+ '     <input class="form-control zjsjflag" type="text" value="'+data.data.list[i].payValue+'" disabled>'
            					+ ' </div>'
            					+ '<div class="col-sm-3">'
            					+ '</div>'
            					+ '</div>';
						$("#"+payCodeId).append(tempStr);
						
        			}
        			
        			//如果是分期产品还需要新增一列分期金额
					if(data.data.installmentMoney!=null) {
						var tdStr = '<td>'+data.data.installmentMoney+'</td>';
						//当前tr增加一个td
						$("#"+payCodeId).parent().append(tdStr);
					}
        		}
        	}
        }
	});
}


//报名状态回显总计分期金额
function showInstallmentMoney(infoManageId,productId) {
	//查询该咨询量的分期信息
	$.ajax({
        url: ctx + '/consultInstallment/getInstallmentInfo',
        type: 'POST',
        data: { infoManageId: infoManageId, productId:productId},
        dataType: 'json',
        success: function (data) {
        	//不是分期产品，清除之前生成总计分期金额
 			var thObj = $("#signHJ").find("td").eq(6);
 			if(thObj!=null) {
 				thObj.remove();
 			}
        	 if(data.status=="success") {
        		 
        		 if(data.data==null) {
        			
         			return ;
        		 }
        		 if(data.data.isInstallment=="1") {
        			 //该产品是分期产品
        			 var str = "<td>"+data.data.installmentMoney+"</td>";
    				 $("#signHJ").append(str);
        		 } 
        	 }
        }
    });
}

//回显产品报考时是否分期
function showSavedInstallment(isInstallment,installmentRatioId) {
	//去除之前生成的分期样式
	$(".project3 .installment").remove();
	
	if(isInstallment=="1") {
		//在页面生成分期复选框，并设置为选中状态,添加到产品后面显示
		var str = '<div class="form-group col-lg-4 col-md-4 col-sm-6 installment" >'
			+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">是否分期:</label>'
			+ '   <div class="col-sm-9 no-padding-right">'
			+ '   <label> <input type="checkbox" checked class="installment" /><span class="text"></span></label>'
			+ '   </div>'
			+ '</div>';
		$("#productId2").parent().parent().after(str);
		//如果是分期产品,得到分期来源+期次联合外键，反向查找分期来源和期次
		 $.ajax({
		        url: ctx + '/consultInstallment/getSelectedBankAndSort',
		        type: 'POST',
		        data:{installmentRatioId:installmentRatioId},
		        dataType: 'json',
		        success: function (data) {
		        	
		        	if(data.status=="success") {
		        		//在页面显示选中的分期来源和期次
		        		var str1 = '<div class="form-group col-lg-4 col-md-4 col-sm-6 installment" >'
		        			+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">分期来源:</label>'
		        			+ '   <div class="col-sm-9 no-padding-right">'
		        			+ '      <input type="text">'+data.data.bankName+'</input>'
		        			+ '   </div>'
		        			+ '</div>';
		        		
		        		var str1 = '<div class="form-group col-lg-4 col-md-4 col-sm-6 installment" >'
		        			+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">期次:</label>'
		        			+ '   <div class="col-sm-9 no-padding-right">'
		        			+ '      <input type="text">'+data.data.sortName+'</input>'
		        			+ '   </div>'
		        			+ '</div>';
		        		
		        		
		        		$("#productId2").parent().parent().after(str);
		        	}
		        }
		 });
	} 
}
