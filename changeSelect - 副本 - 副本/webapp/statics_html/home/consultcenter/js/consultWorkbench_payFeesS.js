//生成报名部分费用列表
//function coursePayDiv(examTimeId,productId) {
function coursePayDiv() {
	//生成费用列表前先把订座时生成的费用列表清空-防止生成的标签的id冲突
    $('#appendPayBody').html("");
    //生成费用列表前先把上一次生成的费用列表清空
    $('#coursePayInfo').html("");
	var infoManageId = $("#infoManageId2").val();
	var price = 0;
	//var dPrice = $("#dPrice").val();//订座费
	var dPrice = 0;//订座费
	var infoManageId = $("#infoManageId2").val();//咨询id
	var productId = $("#productId2").val();
	
	$("#dztd2").text(0);//将以前的订座费实缴费-清空
	$("#dingzuoI2").val(0);//将以前的订座费支付金额-清空
	$('#dingzuoI2').trigger('chosen:updated');//刷新加载一下chosen.js插件
	
	//回显订座费
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultConsoleSignUp/findReservation",//查询订座费
        "dataType": "json",
        "data": {
            "infoManageId": infoManageId,
            "productId":productId,
            "payCode" :"code_reservation"
        },
        "success": function (data1) {
        	if(data1.status=='success'){
//        		if(data1.data.payValue=='0') {//如果订座费为空，就不展示
//        			$("#dztr2").hide();
//        		} else {
//        			$("#dztr2").show();
//        		}
        		dPrice = data1.data.payValue;//订座费
//        		$("#dztd2").text(data1.data.payValue);//订座费实缴费
//        		$("#dingzuoS2").val(data1.data.payFrom);//订座费支付方式
//        		$('#dingzuoS2').trigger('chosen:updated');//刷新加载一下chosen.js插件
//        		$("#dingzuoI2").val(data1.data.payValue);//订座费支付金额
//        		$('#dingzuoI2').trigger('chosen:updated');//刷新加载一下chosen.js插件
        		$("#dztr2").hide();
        	} else {
        		$("#dztr2").hide();
        	}
        	 
        	$.ajax({
                "type": "Post",
                "url": ctx + "/consultConsoleSignUp/appendPayDiv",
                "dataType": "json",
                "data": {
                    "infoManageId": infoManageId,
                    "productId":productId
                },
                "success": function (data) {
                	if(data.status=='success'){
                		for(var i=0; i<data.list.length; i++) {
                			price = price + eval(data.list[i].price);
                			if(i==0) {
                				//拼接费用行
            	    			$('#coursePayInfo').append('<tr class="payment firstDiv">'
            	    					+ ' <td>' + data.list[i].name + '</td>'
            	    					+ ' <td class="zjyj">' + data.list[i].payValue + '</td>'
            	    					+ ' <td>' + data.list[i].yjValue + '</td>'
            	    					+ '<div class="backValue" style="display:none;"></div>'
            	    					+ '<td>'
            	    					+ data.list[i].sjValue
            	    					+ '</td>'
            	    					//一下ajax是回显支付方式和支付金额
            	    					+ '<script type="text/javascript">'
//            	    					+ ' findZhiFu("'+infoManageId+'","'+data.list[i].codeId+'","'+productId+'","'+dPrice+'");'
            	    					+ ' findZhiFuNew("'+infoManageId+'","'+data.list[i].codeId+'","'+productId+'","'+dPrice+'");'
            	    					+ '</script>'
            	    					//**************
            	    					+ '<td id="' + data.list[i].codeId + '">'
            	    					+ '<div class="payment">'
            	    					+ '<div class="col-sm-4">'
            	    					+ '   <select class="form-control" disbaled>'
            	    					+ '		<option value="1">现金</option>'
            	    					+ '        <option value="2">刷卡</option>'
            	    					+ '        <option value="3">支票</option>'
            	    					+ '        <option value="4">汇款-微信</option>'
            	    					+ '        <option value="5">汇款-支付宝</option>'
            	    					+ '        <option value="6">汇款-网络</option>'
            	    					+ '        <option value="7">银行转账</option>'
            	    					+ '        <option value="8">分期</option>'
            	    					+ '        <option value="9">结余</option>'
            	    					+ '    </select>'
            	    					+ '</div>'
            	    					+ '<div class="col-sm-5">'
            	    					+ '     <input class="form-control zjsjflag" type="text" placeholder="0" disabled>'
            	    					+ ' </div>'
            	    					+ '<div class="col-sm-3">'
            	    					+ '</div>'
            	    					+ '</div>'
            	    					+ '</td>'
            	    					//+ '<td class="zjcfflag">'+data.list[i].price+'</td>'
            	    					//+ '<td class="zjcfflag">'+Number((data.list[i].payValue - data.list[i].sjValue - dPrice)).toFixed(2)+'</td>'
            	    					+ '<td class="zjcfflag">'+Math.round((data.list[i].yjValue - data.list[i].sjValue))+'</td>'
            	    					+ '</tr>');
                			} else {
                				//拼接费用行
            	    			$('#coursePayInfo').append('<tr class="payment">'
            	    					+ ' <td>' + data.list[i].name + '</td>'
            	    					+ ' <td class="zjyj">' + data.list[i].payValue + '</td>'//不能再用yjValue,因为不能肯定优惠一定是算在第一种费用上
            	    					+ ' <td>' + data.list[i].yjValue + '</td>'
            	    					+ '<div class="backValue" style="display:none;"></div>'
            	    					+ '<td>'
            	    					+ data.list[i].sjValue
            	    					+ '</td>'
            	    					//一下ajax是回显支付方式和支付金额
            	    					+ '<script type="text/javascript">'
//            	    					+ ' findZhiFu("'+infoManageId+'","'+data.list[i].codeId+'","'+productId+'");'
            	    					+ ' findZhiFuNew("'+infoManageId+'","'+data.list[i].codeId+'","'+productId+'");'
            	    					+ '</script>'
            	    					//**************
            	    					+ ' <td id="' + data.list[i].codeId + '">'
            	    					+ '<div class="payment">'
            	    					+ '<div class="col-sm-4" disbaled>'
            	    					+ '   <select class="form-control" >'
            	    					+ '		<option value="1">现金</option>'
            	    					+ '        <option value="2">刷卡</option>'
            	    					+ '        <option value="3">支票</option>'
            	    					+ '        <option value="4">汇款-微信</option>'
            	    					+ '        <option value="5">汇款-支付宝</option>'
            	    					+ '        <option value="6">汇款-网络</option>'
            	    					+ '        <option value="7">银行转账</option>'
            	    					+ '        <option value="8">分期</option>'
            	    					+ '        <option value="9">结余</option>'
            	    					+ '    </select>'
            	    					+ '</div>'
            	    					+ '<div class="col-sm-5">'
            	    					+ '     <input class="form-control zjsjflag" type="text" placeholder="0" disabled>'
            	    					+ ' </div>'
            	    					+ '<div class="col-sm-3">'
            	    					+ '</div>'
            	    					+ '</div>'
            	    					+ '</td>'
            	    					//不能在使用cfValue，因为表里存的该欠费是用去除优惠后的应缴减实缴的值，而现在优惠不再是一定算在第一种费用上
            	    					+ '<td class="zjcfflag">'+Math.round((data.list[i].yjValue - data.list[i].sjValue))+'</td>'
            	    					+ '</tr>');
                			}
                		  }//费用列表for循环结束
            	        $('#coursePayInfo').append('<tr id="signHJ">'
            	            + ' <td>合计</td>'
            	            + '<td id="hjYJ">0</td>'
            	            + '<td id="hjprice">0</td>'
            	            + '<td class="sjhj" id="sjhj">0</td>'
            	            + ' <td><div class="payment">'
            	            + '<div class="col-sm-4">'
            	            + '</div>'
            	            + '<div class="col-sm-5">'
            	            + ''
            	            + ' </div>'
            	            + '<div class="col-sm-3">'
            	            + '</div>'
            	            + '</div>'
            	            + '</td>'
            	            + '<td class="cfhj" id="cfhj">0</td>'
            	            + '</tr>');
                	      //计算最终总计，合计的应缴，实缴，欠费
                	      hheji2();
                		//toastr.success('操作完成');
                	      //如果是分期产品，最后统计一栏展示总计分期金额
                	      showInstallmentMoney(infoManageId,productId);
                	}else{
                    	//toastr.error(data.msg);//当前产品考期下不存在配置费用
                    }
                }
            });
        	
        }
	});
}

//计算最终总计，合计的应缴，实缴，欠费
function hheji2() {
	var proValue = 0;//产品应缴
	var yjValue = 0;//实际应缴
	var sjValue = 0;//实缴
	var cfValue = 0;//欠费
	var dPrice = isNull($("#dPrice").val());//订座费-isNull为空或者没有返回0
	  //遍历前面所有缴费类型的实缴，欠费得到最终总计，合计的应缴，实缴，欠费
	  $('#coursePayInfo').find('tr.payment').each(function (i,e) {
		  protd = $(this).find('td').eq(1);//第二个单元格，每行应缴td对象
		  yjtd = $(this).find('td').eq(2);//第二个单元格，每行应缴td对象
	      sjtd = $(this).find('td').eq(3);//第三个单元格，每行实缴td对象
	      cftd = $(this).find('td').eq(5);//第五个单元格，每行欠费td对象
	      proValue += Number(protd.text());
	      yjValue += Number(yjtd.text());
	      sjValue += Number(sjtd.text());
	      cfValue += Number(cftd.text());
	  });
	  //sjValue = Number(sjValue)+Number(dPrice);//实缴费用最终要算上订座费
	  //更新总计的应缴，实缴，欠费
	  $("#zjYJ").text(proValue);
	  $("#zjprice").text(yjValue);
      $("#zjsj").text(sjValue);
      $("#zjcf").text(cfValue);
        
      //更新合计的应缴，实缴，欠费
      //合计的应缴要减去优惠，折扣抵消的金额
//      $('#coursePayInfo').find('tr.yhqprice').each(function(i,e){
//    	  yjValue -= Number($(this).find('td').eq(2).text());//第三个单元格，优惠券金额
//      });
//      $('#coursePayInfo').find('tr.zkprice').each(function(i,e){
//    	  yjValue -= Number($(this).find('td').eq(2).text());//第三个单元格，折扣金额
//      });
	  $("#hjYJ").text(proValue);
	  $("#hjprice").text(yjValue);
      $("#sjhj").text(sjValue);
      
      $("#cfhj").text(Math.round(Number(yjValue-sjValue)));//合计欠费
      
      //根据欠费金额-判断是否需要展示下次缴费时间
      cfValue =  $("#cfhj").text();
      if(Number(cfValue)==0) {
    	  //欠费金额为0，隐藏下次缴费时间
    	  $("#nextPayTime2").parents("tr").hide();
      } else {
    	//欠费金额大于0，显示下次缴费时间
    	  $("#nextPayTime2").parents("tr").show();
      }
}

//根据咨询量id，费用编码-查询支付方式和支付金额
function findZhiFu(infoManageId, payCodeId,  productId ,dPrice) {
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultConsoleSignUp/findZhiFu",//查询每种费用类型支付方式和支付金额
        "dataType": "json",
        "data": {
            "infoManageId": infoManageId,
            "productId" : productId,
            "payCodeId" :payCodeId
        },
        "success": function (data) {
        	if(data.status=='success'){
        		if(data.list.length!=0) {
        			$("#"+payCodeId).html("");//清空支付方式列的内容，避免一种缴费方式都没有的情况
        			
        			var tempStr = "";
        			for(var i=0; i<data.list.length; i++) {
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
        				if(data.list[i].payFrom=="1") {
        					tempStr += ' <option value="1" selected>现金</option>';
        				} else {
        					tempStr += ' <option value="1">现金</option>'
        				}
        				if(data.list[i].payFrom=="2") {
        					tempStr += ' <option value="2" selected>刷卡</option>';
        				} else {
        					tempStr += ' <option value="2">刷卡</option>'
        				}
        				if(data.list[i].payFrom=="3") {
        					tempStr += ' <option value="3" selected>支票</option>';
        				} else {
        					tempStr += ' <option value="3">支票</option>'
        				}
        				if(data.list[i].payFrom=="4") {
        					tempStr += ' <option value="4" selected>汇款-微信</option>';
        				} else {
        					tempStr += ' <option value="4">汇款-微信</option>'
        				}
        				if(data.list[i].payFrom=="5") {
        					tempStr += ' <option value="5" selected>汇款-支付宝</option>';
        				} else {
        					tempStr += ' <option value="5">汇款-支付宝</option>'
        				}
        				if(data.list[i].payFrom=="6") {
        					tempStr += ' <option value="6" selected>汇款-网络</option>';
        				} else {
        					tempStr += ' <option value="6">汇款-网络</option>'
        				}
        				if(data.list[i].payFrom=="7") {
        					tempStr += ' <option value="7" selected>银行转账</option>';
        				} else {
        					tempStr += ' <option value="7">银行转账</option>'
        				}
        				if(data.list[i].payFrom=="8") {
        					tempStr += ' <option value="8" selected>分期</option>';
        				} else {
        					tempStr += ' <option value="8">分期</option>'
        				}
        				if(data.list[i].payFrom=="9") {
        					tempStr += ' <option value="9" selected>结余</option>';
        				} else {
        					tempStr += ' <option value="9">结余</option>'
        				}
        				tempStr +='    </select>'
            					+ '</div>'
            					+ '<div class="col-sm-5">'
            					+ '     <input class="form-control zjsjflag" type="text" value="'+data.list[i].payValue+'" disabled>'
            					+ ' </div>'
            					+ '<div class="col-sm-3">'
            					+ '</div>'
            					+ '</div>';
						$("#"+payCodeId).append(tempStr);
        			}
        		}
        	}
        }
	});
}

//报名后，点击服务费，添加服务费
function signServiceCli(obj) {
	var service =  $(obj).data("value");//服务id
	 
	//获得当前复选框的选中状态，如果要取消选中状态，则需要移除拼接在缴费信息里的服务费用
	var checkFlag = $(obj).prop("checked");
	if(!checkFlag) {//取消选中
		//移除之前拼接在缴费信息里的该服务费用
		$("#sign"+service).remove();
		hheji2();//更新页面金额
		return;
	}
	var name = $(obj).data("name");//得到费用类型名称
	var price = $(obj).data("money");//得到费用种类金额
	var code = $(obj).data("code");//得到费用编码
	var moneyLine = $(obj).data("moneyline");//得到费用金额下限
	var serviceEnable = $(obj).data("enable");//得到费用下限是否锁定
	var expensesType = $(obj).data("type");//得到费用类型-收益，支出
	var codeId = $(obj).data("codeid");//得到费用种类id即code_id
	//计算该服务费的索引（服务费和收益类型费用算在一起）
	//全部费用类型总数-支出费用类型总数=该服务费的索引
	var indexCount = $("#appendPayBody").find("tr.servicePay").length;
	if(indexCount==null || typeof(indexCount)=="undefined") {
		indexCount = 0;
	} else {
		//indexCount = indexCount - 1;
	}
	//拼接费用行-插入到合计的前面，基本缴费类型的后面
	$('#signHJ').before('<tr class="servicePay payment appendDiv" id="sign'+service+'">'
			+ ' <td>' + name + '</td>'
			+ '<td>' 
			+  price //产品应缴
			+ '</td>'
			+ '<td id="' + code + '" data-value="'+moneyLine+'" data-value2="'+price+'" data-value3="'+serviceEnable+'" data-value4="'+expensesType+'" >'
			+  price //实际应缴
			+ '</td>'
			+ '<input type="hidden" name="payCompList['+indexCount+'].payValue" value="'+ price +'"/>'//用来存储原始应缴值
			+ '<input type="hidden" name="payCompList['+indexCount+'].yjValue" value="'+price+'" class="payCompYJ" value="'+price+'"/>'//用来存储应缴值, 初始值为产品应缴值
			+ '<input type="hidden" name="payList['+indexCount+'][payCode]" class="payCode" value="'+code+'"/>'
			+ '<input type="hidden" name="payList['+indexCount+'][payCodeId]" class="payCodeId" value="'+codeId+'"/>'
			+ '<input type="hidden" name="payCompList['+indexCount+'].payCode" value="'+code+'"/>'
			+ '<input type="hidden" name="payCompList['+indexCount+'].payCodeId" value="'+codeId+'"/>'
			+ '<input type="hidden" name="payList['+indexCount+'][payName]" class="payName" value="'+name+'"/>'
			+ '<input type="hidden" name="payList['+indexCount+'][isNeIf]" value="'+expensesType+'"/>'//收入或者支出，1收入，2支出
			+ '<input type="hidden" name="payCompList['+indexCount+'].isNeIf" value="'+expensesType+'"/>'//收入或者支出，1收入，2支出
			+ '<input type="hidden" name="payCompList['+indexCount+'].payName" value="'+name+'"/>'
			//所属的服务的id
			+ '<input type="hidden" name="payCompList['+indexCount+'].serviceId" class="serviceId" value="'+service+'"/>'//积分数值
			+ '<td id="' + code + '_value">'
			+ 0//实缴费
			+ '</td>'
			+ '<input type="hidden" name="payCompList['+indexCount+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
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
			+ '     <input ondblclick="signDbclick(this)" class="form-control zjsjflag" onkeyup="signSshj(this)" type="text" placeholder="0" >'
			+ '	    <input type="hidden" name="payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
//			+ '	    <input type="hidden" name="payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
//			+ '	    <input type="hidden" name="payList['+indexCount+']" class="payValueForm" value=""/>'
			+ ' </div>'
			+ '<div class="col-sm-3">'
			+ '<i onclick="addSignRowPay(this)" data-index="'+indexCount+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
			+ '</div>'
			+ '</div>'
			+ '</td>'
			+ '<td class="zjcfflag">'
			+ price
			+ '</td>'
			+ '<input type="hidden" name="payCompList['+indexCount+'].cfValue" class="payCompCF" value="'+price+'"/>'//用来存储欠费值,初始值为产品应缴值
			+ '</tr>');
	
	hheji2();//更新页面金额
}

//报名部分-服务费-实时合计算法
function signSshj(e) {
    var num = Number($(e).val());//当前输入金额
    
    if (!num || num <= 0) {
        toastr.error("请输入正确的付款金额，不能为0或负数！");
        $(e).val(null);
    }
    
    var sum = 0;//支付方式栏下所有输入金额总和
     
    //定位到支付方式下所有的支付input总和sum
    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
    });
    //该费用类型实际应缴费用
    var yjValue = $(e).parents(".appendDiv").find("td").eq(2).text();
    if(Number(sum)>Number(yjValue)) {
    	 toastr.error("当前输入金额合计不能超过应缴金额！");
    	 $(e).val(null);
    	//重新计算该费用下支付方式下有效的金额总和
    	sum = 0;//支付方式栏下所有输入金额总和
	    //定位到支付方式下所有的支付input总和sum
	    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
	        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
	    });
    }
//    var td = $(e).parents('tr').find('td').eq(1);//每行应缴金额td
    var yj = $(e).parents('tr').children('td').eq(2).text();//每行实际应缴金额
    $(e).parents('tr').find("input.payCompYJ").val(yj);//更新为每行下隐藏的需要提交给后台计算的实际应缴金额赋值
    
    $(e).parents('tr').children('td').eq(3).text(sum);//每行实缴部分金额
    $(e).parents('tr').find("input.payCompSJ").val(sum);//更新为每行下隐藏的需要提交给后台计算的实缴金额赋值
    //每行欠费部分计算
    $(e).parents('tr').children('td').eq(5).text(yj - sum);
    $(e).parents('tr').find("input.payCompCF").val(yj - sum);//更新为每行下隐藏的需要提交给后台计算的欠费
    
    //开始计算最后的合计内容
    hheji2();
    //2017/11/23新增
    //为该input输入金额框下的隐藏input:payValue&Form赋值；——此处的费用类型，金额才是支付方式下需要提交的参数
    var payValue = $(e).val();
  //健壮性判断,防止前面步骤操作异常，订座费没有,导致向后台
	if(payValue==null || payValue=='' || typeof(payValue)=='undefined') {
		payValue = 0;
	} 
	 
//    if($(e).attr('sign')=='1'){//如果是报名费的支付方式的第一个input
//    	payValue = payValue - dprice;//还需要用报名费的第一个支付input的值减去订座费，才是需要提交给后台的报名费
//    }
    
    if(payValue!=0) {//输入框内必须有金额才可以提交-没有不向后台提交空的缴费信息
    	var payForm = $(e).parent().parent().find("select :selected").val();
    	$(e).parent().find("input.payValueForm").val(payForm+"="+payValue);//再赋值缴费方式
    }

}

//报名部分-服务费-双击缴完全部金额
function signDbclick(e) {
	//每行实际应缴金额
	var yjValue = $(e).parents('tr').children('td').eq(2).text();
	//每行实缴金额
	var sjValue = $(e).parents('tr').children('td').eq(3).text();
	if(yjValue==sjValue) {
		//如果当前实缴已经等于实际应缴，就不让再双击了
		return;
	}
	//每行欠费金额
	var cfValue = $(e).parents('tr').children('td').eq(5).text();
	
	//先将当前支付方式框已有金额清除，更新实缴和欠费，然后再进行后面的操作
	//得到当前双击框之前输入金额
	var price = $(e).val();
	if(price==null || price == '') {
		price = 0;
	}
	//消除该金额对实缴和欠费的影响
	//清除对实缴金额的影响
	$(e).parents('tr').children('td').eq(3).text(sjValue-price);
	//清除对欠费的影响
	$(e).parents('tr').children('td').eq(5).text(Number(cfValue)+Number(price));
	 
	//下面是本次双击对金额的影响
	//每行实际应缴金额
	yjValue = $(e).parents('tr').children('td').eq(2).text();
	//每行实缴金额
	sjValue = $(e).parents('tr').children('td').eq(3).text();
   //更新每行支付方式当前操作框金额(实际应缴金额-已实缴金额)
   $(e).val(yjValue-sjValue);
 //更新每行实缴金额
   $(e).parents('tr').children('td').eq(3).text(yjValue);
 //更新每行欠费金额
   $(e).parents('tr').children('td').eq(5).text(0);
   
	//更新当前费用种类实缴金额下隐藏input框作为传递给后台的数据
    $(e).parents('tr').find("input.payCompYJ").val($(e).parents('tr').children('td').eq(2).text()); //当前费用实际应缴金额
	$(e).parents('tr').find("input.payCompSJ").val($(e).parents('tr').children('td').eq(3).text()); 
	$(e).parents('tr').find("input.payCompCF").val(0);//更新为每行下隐藏的需要提交给后台计算的欠费
	signSshj(e);
}

//报名缴费部分，添加支付方式方法
function addSignRowPay(e) {
	var list1Index = $(e).data("index");
	 
	//收益类型费用和服务类型费用参数名称一样，但是支出类型费用有点不同
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
		        + '     <input ondblclick="signDbclick(this)" class="form-control zjsjflag" isat="1" onkeyup="signSshj(this)" type="text" placeholder="0" >'
		        + '	    <input type="hidden" name="payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
//		        + '	    <input type="hidden" name="payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
//		        + '	    <input type="hidden" name="payList['+list1Index+']" class="payValueForm" value=""/>'
		        + ' </div>'
		        + '<div class="col-sm-3">'
		        + '  <i onclick="removeRowPay(this)" data-index="'+list1Index+'" class="fa fa-minus-circle danger control-label"></i>'
		        + '</div>'
		        + '</div>');

}

//新增服务费缴费信息，更新咨询量实际应缴，实缴，欠费
function submitServiceFun() {
	//用来存储需要提交给后台的参数
	var option = {
		'infoManageId':$("#infoManageId2").val(),//咨询id
		'productId':$("#productId2").val(),//产品id
		'sumPrice' : $("#hjprice").text(),//得到实际应缴值
		'sPrice':$("#sjhj").text(),//得到实缴值
		'nextPayTime':$("#nextPayTime2").val()//得到下次补费实缴
	};
	//用来记录是否有新增服务费标志
	var serviceFlag = false;
	//动态获取新增服务费信息
	$(".projectPayFees3").find("tr.servicePay").find('input[type="hidden"]').each(function(index,obj){
		//只获取，非disabled的需要提交的费用信息
		var disableFlag = $(obj).prop("disabled");
		if(!disableFlag) {
			serviceFlag = true;
			var nameStr = $(obj).prop("name");//得到name属性值
			var optionValue = $(obj).val();//得到input的值
			if(optionValue != null && optionValue != '') {
				if(option[nameStr]!=undefined) {//如果数组中该key已经有值，为了防止覆盖相同的key，需要做处理
					option[nameStr] = option[nameStr]+","+optionValue;
				} else {
					option[nameStr] = optionValue;
				}
			}
		}
	});
	//当有需要提交的服务费时才调用后台的方法
	if(serviceFlag) {
		//更新咨询量实际应缴，实缴，欠费，新增缴费信息
		$.ajax({
	        "type": "Post",
	        "url": ctx + "/consultConsoleSignUp/submitService",//查询每种费用类型支付方式和支付金额
	        "dataType": "json",
	        "data": option,
	        "success": function (data) {
	        	if(data.status=="success") {
	        		toastr.success("新增服务费成功，咨询量信息修改完毕");
	        		init6();
	                $('.bs-example-modal-lga').modal('hide');
	        	}
	        }
		});
	} else {
		toastr.error("请选择需要添加的服务费");
	}
}
//报名状态，追加新购买产品
function appendProjectFun() {
	
}
//报名窗台，提交新增购买商品
function submitProjectFun() {
	
}
//取消单击时间控件时生成的模态框
function removeModal() {
	$(".modal-backdrop.fade.in").remove();
}







