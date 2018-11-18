function appendPayDiv2(productExamTimeId, parentId) {
	//生成费用列表前先把报名时生成回显的费用列表清空-防止生成的标签的id冲突
    $('#coursePayInfo').html("");
	//生成费用列表前先把上一次生成的费用列表清空
    $('#'+parentId).html("");
	var infoManageId = $("#infoManageId2").val();
	var price = 0;//用来计算总计应缴金额
	var dPrice = $("#dPrice").val();//得到订座费
	//健壮性判断,防止前面步骤操作异常，订座费没有
	if(dPrice==null || dPrice=='' || typeof(dPrice)=='undefined') {
		dPrice = 0;
	}
	//设置订座费栏的金额
	 $('#dingzuoI').val(null);
	var productId = $("#productId").val();//产品id
	var departmentId1 = $("#departmentId1Hidden").val();//分校id
	var infoManageId = $("#infoManageId2").val();//咨询id
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv",
        "dataType": "json",
        "data": {
            productExamTimeId: productExamTimeId,
            departmentId1: departmentId1,
            infoManageId:infoManageId
        },
        "success": function (data) {
        	if(data.status=='success'){
        		for(var i=0; i<data.list.length; i++) {
        			price = price + eval(data.list[i].price);
        			 
        			//如果是第一个费用，这块要算上订座费
        			if(i==0) {
        					//拼接费用行
            				$('#'+parentId).append('<tr class="appendDiv firstDiv">'
            						+ '<td>' + data.list[i].name + '</td>'
            						//data-value中的值一次是金额下限，原始应缴值，是否锁定
            						+ '<td id="appendPayTd1" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'">' 
            						+ data.list[i].price 
            						+ '</td>'
            						+ '<input type="hidden" name="payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储原始应缴值，只有第一种费用类型需要
            						+ '<input type="hidden" name="payCompList['+i+'].yjValue" class="payCompYJ"/>'//用来存储应缴值
            						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
            						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
            						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
            						+ '<input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
            						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
            						+ '<td>'
            						+ dPrice
//            						+ '<input type="hidden" class="fixValue" value="'+dPrice+'"/>'//用来存储初始实缴值
            						+ '</td>'
            						+ '<input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ"/>'//用来存储实缴值
            						+ ' <td>'
            						+ '<div class="payment">'
            						+ '<div class="col-sm-4">'
            						+ ' <select class="form-control" disabled>'
            						+ '		<option selected>订座费已缴费</option>'
            						+ ' </select>'
            						+ '</div>'
            						+ '<div class="col-sm-5">'
            						+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
            						+ '</div>'
            						+ '<div class="col-sm-3">'
            						+ '</div>'
            						+ '</div>'
            						+ '<div class="payment">'
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
            						//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
            						+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
            						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
            						+ ' </div>'
            						+ '<div class="col-sm-3">'
            						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
            						+ '</div>'
            						+ '</div>'
            						+ '</td>'
            						+ '<td class="zjcfflag">' 
            						+ (data.list[i].price-dPrice) 
            						+ '</td>'
            						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF"/>'
            						+ '</tr>');

        			} else {
        				//拼接费用行
        				$('#'+parentId).append('<tr class="appendDiv">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].yjValue" value="'+data.list[i].price+'"/>'//用来存储应缴值
        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
        						+ '<td id="' + data.list[i].code + '_value">'
        						+ 0//实缴费
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ"/>'//用来存储实缴值
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
        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" onkeyup="sshj(this)" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-3">'
        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF"/>'
        						+ '</tr>');
        			}
        		}
        		//拼接最后的总计，优惠，折扣，合计
        		$('#'+parentId).append('<tr>'
        	            + ' <td>总计</td>'
        	            + '<td id="zjprice">' + price + '</td>'
        	            + '<td id="zjsj">0</td>'
        	            + ' <td><div class="payment">'
        	            + '<div class="col-sm-4">'
        	            + '</div>'
        	            + '<div class="col-sm-5">'
        	            + ' '
        	            + ' </div>'
        	            + '<div class="col-sm-3">'
        	            + '</div>'
        	            + '</div>'
        	            + '</td>'
        	            + '<td id="zjcf"></td>'
        	            + '</tr>');
        		//职能用一个
        		$('#'+parentId).append('<tr class="yhzk">'
        	            + ' <td><label><input type="checkbox" onclick="beforeYHZK2(this)" data-type="yh" value=""/><span class="text">优惠券</span></label></td>'
        	            + '<td>0</td>'
        	            + '<td id="yhqprice">'
        	            + '</td>'
        	            //+ '<input type="hidden" name="payCompList['+count+'].activityCode" class="yhzkInput" disabled/>'
        	            + '<input type="hidden" name="activityValue" class="yhzkInput" disabled/>'
        	            + ' <td><div class="payment">'
        	            + '<div class="col-sm-4">'
        	            + '</div>'
        	            + '<div class="col-sm-5" onclick="yhqCheck(this)">'
        	            + ' <input id="activtyCodeValue" class="form-control" onkeyup="activtyCode(this)" type="text" placeholder="请输入8位优惠码" >'
        	            //+ ' <span class="control-label mandatory">*(填写修改优惠码前，请先保证优惠券前的复选框处于未选中状态)</span>'
        	            + ' </div>'
        	            + '<div class="col-sm-3">'
        	            + '</div>'
        	            + '</div>'
        	            + '</td>'
        	            + '<td id="zjqf">0</td>'
        	            + '</tr>');
        		//开始构造拼接优惠和折扣
        		$.ajax({
        	        "type": "Post",
        	        "url": ctx + "/consultBookingSeats/appendYHZK",
        	        "dataType": "json",
        	        "data": {
        	            "productId": productId
        	        },
        	        "success": function (data) {
        	        	debugger;
        	        	if(data.status=='success') {
        	        		 for(var j=0; j<data.ZKList.length; j++) {//拼接折扣,考期的折扣可以配多个,满额返券是线下做，这里不处理
        	        				$('#'+parentId).append('<tr class="yhzk">'
        	        						+ ' <td><label><input type="checkbox" onclick="beforeYHZK2(this)" data-type="zk" value="'+data.ZKList[j].activityId+'"/><span class="text">'+data.ZKList[j].title+'</span></label></td>'
        	        						+ '<td>0</td>'
        	        						+ '<td class="zkprice">'
        	        						//+ Number(price*(1-data.ZKList[j].discount)).toFixed(2)
        	        						+ Math.round(Number(price*(1-data.ZKList[j].discount)))
        	        						+'</td>'//优惠了多少钱
        	        						//+ '<input type="hidden" name="discountList['+j+']" class="yhzkInput" value="'+Number(price*(1-data.ZKList[j].discount)).toFixed(2)+'" disabled/>'
        	        						+ '<input type="hidden" name="discountList['+j+'].discountValue" class="yhzkInput" value="'+Math.round(Number(price*(1-data.ZKList[j].discount)))+'" disabled/>'
        	        						+ ' <td><div class="payment">'
        	        						+ '<div class="col-sm-4">'
        	        						+ '</div>'
        	        						+ '<div class="col-sm-5">'
        	        						+ '折扣比:'+data.ZKList[j].discount//优惠折扣
        	        						+ ' </div>'
        	        						+ '<div class="col-sm-3">'
        	        						+ '</div>'
        	        						+ '</div>'
        	        						+ '</td>'
        	        						+ '<td>0</td>'
        	        						+ '</tr>');
        	        		}
        	        	}else {
        	        		toastr.error("后台查询优惠折扣失败！");
        	        	}
    	        		 //循环结束，拼接合计
    	        		 $('#'+parentId).append('<tr>'
    	         	            + ' <td>合计</td>'
    	         	            + '<td id="hjprice">' + price + '</td>'
    	         	            + '<td class="sjhj" id="sjhj">0</td>'
    	         	            + ' <td><div class="payment">'
    	         	            + '<div class="col-sm-4">'
    	         	            + '</div>'
    	         	            + '<div class="col-sm-5">'
    	         	            + ' '
    	         	            + ' </div>'
    	         	            + '<div class="col-sm-3">'
    	         	            + '</div>'
    	         	            + '</div>'
    	         	            + '</td>'
    	         	            + '<td id="cfhj"></td>'
    	         	            + '</tr>');
    	        		 
    	        		 //zkCalcu();//折扣计算，初始化时进行一次计算即可
    	        		 hheji();//合计
    	         		 //toastr.success('操作完成');
        	        }
        		});
        	        
        	}else{
            	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
            }
        }
    });
}

//转报名-费用部分相关计算-双击自动填充应缴费用金额-第一种
function dbclick2(e) {
	 
	var dprice = $('#dPrice').val();
	var price = $(e).parents('tr').children('td').eq(1).text();//每行应缴部分金额
	//每行实缴部分金额
	  $(e).parents('tr').children('td').eq(2).text(price);
	  //每行当前操作金额框金额
	  $(e).val(price-dprice);
	 
    sshj(e);
}


//计算使用优惠前，先判断该优惠是否锁定
function beforeYHZK2(obj) {
	//得到第一种费用类型的对象
	var firstObj = $('#appendPayBody').find('tr.firstDiv');
	//得到锁定标志
	var serviceEnable = firstObj.find("td").eq(1).data("value3");
	if(serviceEnable=='1') {//正常
		yhzkCalcuNew2(obj);//调用新版优惠折扣算法-只适用于锁定状态
	} else {//serviceEnable=='2' 锁定
		yhzkCalcu2(obj);//调用以前的优惠折扣算法
		//toastr.success("测试，费用已锁定");
	}
}

//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，可以超过金额下限，但不能小于0为负数
function yhzkCalcuNew2(obj) {
	var checkFlag = $(obj).prop("checked");//该复选框是否选中
	var trObj = $('#appendPayBody').find('tr.firstDiv');//第一个缴费类型所在tr对象
	
	yjtd = trObj.find('td').eq(1);//索引从0开始，第二个单元格，应缴td对象
    cftd = trObj.find('td').eq(4);//第五个单元格,欠费td对象
//    var yjMoney = Number(yjtd.text());//应缴金额
    
    //对于优惠券，还要判断是否输入优惠码，优惠码是否可用
    var flag = $(obj).data("type");
    if(flag=="yh") {
    	var sjValue = Number($(obj).parents(".yhzk").find('td').eq(2).text());//实缴金额
    	 
    	if(sjValue==0) {
    		toastr.error("确认使用优惠券前，请先输入有效的优惠码");
	    	$(obj).prop("checked",false);//重置复选框为未选中状态
	    	return;
    	}
    }
    
    var dPrice = $("#dPrice").val();//得到订座费
    
	if(checkFlag) {
		var yhzkMoney = Number($(obj).parents(".yhzk").find('td').eq(2).text());//优惠折扣金额
		var yjMoney = Number(yjtd.text());//应缴费用
		var preferential = yjMoney - yhzkMoney;//如果使用此优惠后的价钱
	    //先判断，如果第一行优惠额度已达金额下限，不允许再勾选其它优惠
	    if(Number(preferential)<0) {
	    	toastr.error("优惠额度已突破0元，无法再使用此优惠活动");
	    	$(obj).prop("checked",false);//重置复选框为未选中状态
	    	return;
	    }
		//再将第一个金额的实缴，支付方式清空还原到初始化状态
	    trObj.find('td').eq(2).text(dPrice);//实缴金额-还原为订座费
		trObj.find('td').eq(4).text(yjMoney);//欠费金额重置为应缴金额
		var qfMoney = Number(cftd.text());//欠费金额
		//支付方式栏清空
		trObj.find('td').eq(3).html('<div class="payment">'
				+ '<div class="col-sm-4">'
				+ ' <select class="form-control" disabled>'
				+ '		<option selected>订座费已缴费</option>'
				+ ' </select>'
				+ '</div>'
				+ '<div class="col-sm-5">'
				+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
				+ '</div>'
				+ '<div class="col-sm-3">'
				+ '</div>'
				+ '</div>'
				+ '<div class="payment">'
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
				//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
				+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
				+ '	    <input type="hidden" name="payList[0][payValue&Form]" class="payValueForm" value=""/>'
				+ ' </div>'
				+ '<div class="col-sm-3">'
				+ '<i onclick="addRowPay(this)" data-index="0" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
				+ '</div>'
				+ '</div>');//还原支付方式
		
		//开始计算第一个金额的应缴（不能<金额下限），欠费
    	 yjtd.text(yjMoney-yhzkMoney);//用当前费用的应缴金额-折扣费用
    	 cftd.text(qfMoney-yhzkMoney);//当前费用的欠费金额-折扣费用
	     //如果当前选中优惠类型是优惠券，将优惠券的优惠码输入框制为不可用，只有取消该复选框才可以更改优惠码
	     if(flag=="yh") {
	     	$(obj).parents(".yhzk").find('td').eq(3).find("input").prop("disabled",true);
	     }
	     //计算总计，合计的应缴，实缴，欠费
	     yjCalcu();
	} else {//取消优惠折扣选中状态
		//先将第一个金额的实缴，支付方式清空还原到初始化状态
		trObj.find('td').eq(2).text(dPrice);//实缴金额-还原为订座费
		trObj.find('td').eq(3).html('<div class="payment">'
				+ '<div class="col-sm-4">'
				+ ' <select class="form-control" disabled>'
				+ '		<option selected>订座费已缴费</option>'
				+ ' </select>'
				+ '</div>'
				+ '<div class="col-sm-5">'
				+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
				+ '</div>'
				+ '<div class="col-sm-3">'
				+ '</div>'
				+ '</div>'
				+ '<div class="payment">'
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
				//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
				+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
				+ '	    <input type="hidden" name="payList[0][payValue&Form]" class="payValueForm" value=""/>'
				+ ' </div>'
				+ '<div class="col-sm-3">'
				+ '<i onclick="addRowPay(this)" data-index="0" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
				+ '</div>'
				+ '</div>');//还原支付方式
		//重新计算-应缴，欠费-已选中的优惠活动
		yjtd.text(yjtd.data("value2"));//先将应缴金额重置为原始金额
		cftd.text(yjtd.data("value2"));//将欠费金额重置为初始欠费金额
		//重新计算其它已选中的优惠折扣的值
		$('#appendPayBody').find('input[type="checkbox"]').each(function(index, object){
			if($(object).prop("checked")) {
				yhzkCalcuNew2(object);
			}
		});
		
		//如果当前选中优惠类型是优惠券，取消该复选框时，还要修改优惠码输入框为可用状态
	     if(flag=="yh") {
	     	$(obj).parents(".yhzk").find('td').eq(3).find("input").prop("disabled",false);
	     }
	   //计算总计，合计的应缴，实缴，欠费
	     yjCalcu();
	}
}


//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，不能超过金额下限
function yhzkCalcu2(obj) {
	var checkFlag = $(obj).prop("checked");//该复选框是否选中
	var trObj = $('#appendPayBody').find('tr.firstDiv');//第一个缴费类型所在tr对象
	
	yjtd = trObj.find('td').eq(1);//索引从0开始，第二个单元格，应缴td对象
    cftd = trObj.find('td').eq(4);//第五个单元格,欠费td对象
    var moneyLine = Number(yjtd.data("value"));//金额下限
    
    //对于优惠券，还要判断是否输入优惠码，优惠码是否可用
    var flag = $(obj).data("type");
    if(flag=="yh") {
    	var sjValue = Number($(obj).parents(".yhzk").find('td').eq(2).text());//实缴金额
    	 
    	if(sjValue==0) {
    		toastr.error("确认使用优惠券前，请先输入有效的优惠码");
	    	$(obj).prop("checked",false);//重置复选框为未选中状态
	    	return;
    	}
    }
    
    var dPrice = $("#dPrice").val();//得到订座费
    
	if(checkFlag) {
		var yhzkMoney = Number($(obj).parents(".yhzk").find('td').eq(2).text());//优惠折扣金额
		var yjMoney = Number(yjtd.text());//应缴费用
	    var preferential = yjMoney-moneyLine;//可用于优惠的额度（应缴金额-金额下限)
	    //先判断，如果第一行优惠额度已达金额下限，不允许再勾选其它优惠
	    //if(yjMoney==moneyLine) {
	    if(yhzkMoney>preferential) {
	    	toastr.error("优惠额度已达金额下限，无法再使用此优惠活动");
	    	$(obj).prop("checked",false);//重置复选框为未选中状态
	    	return;
	    }
		//再将第一个金额的实缴，支付方式清空还原到初始化状态
		trObj.find('td').eq(2).text(dPrice);//实缴金额-还原为订座费
		trObj.find('td').eq(4).text(yjMoney);//欠费金额重置为初始值
		var qfMoney = Number(cftd.text());//欠费金额
		
		trObj.find('td').eq(3).html('<div class="payment">'
				+ '<div class="col-sm-4">'
				+ ' <select class="form-control" disabled>'
				+ '		<option selected>订座费已缴费</option>'
				+ ' </select>'
				+ '</div>'
				+ '<div class="col-sm-5">'
				+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
				+ '</div>'
				+ '<div class="col-sm-3">'
				+ '</div>'
				+ '</div>'
				+ '<div class="payment">'
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
				//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
				+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
				+ '	    <input type="hidden" name="payList[0][payValue&Form]" class="payValueForm" value=""/>'
				+ ' </div>'
				+ '<div class="col-sm-3">'
				+ '<i onclick="addRowPay(this)" data-index="0" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
				+ '</div>'
				+ '</div>');//还原支付方式
		
		//开始计算第一个金额的应缴（不能<金额下限），欠费
	     if(preferential>=yhzkMoney) {//如果可用于优惠的额度>=折扣
	    	 yjtd.text(yjMoney-yhzkMoney);//用当前费用的应缴金额-折扣费用
	    	 cftd.text(qfMoney-yhzkMoney);//当前费用的欠费金额-折扣费用
	     } else {
	    	 yjtd.text(moneyLine);//用当前费用的应缴金额=金额下限
	    	 cftd.text(qfMoney-preferential);//当前欠费=欠费金额-抵扣费用
	     }
	     //如果当前选中优惠类型是优惠券，将优惠券的优惠码输入框制为不可用，只有取消该复选框才可以修改优惠码
	     if(flag=="yh") {
	     	$(obj).parents(".yhzk").find('td').eq(3).find("input").prop("disabled",true);
	     }
	     //计算总计，合计的应缴
	     yjCalcu();
	} else {//取消优惠折扣选中状态
		//先将第一个金额的实缴，支付方式清空还原到初始化状态
		trObj.find('td').eq(2).text(dPrice);//实缴金额-还原为订座费
		trObj.find('td').eq(3).html('<div class="payment">'
				+ '<div class="col-sm-4">'
				+ ' <select class="form-control" disabled>'
				+ '		<option selected>订座费已缴费</option>'
				+ ' </select>'
				+ '</div>'
				+ '<div class="col-sm-5">'
				+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
				+ '</div>'
				+ '<div class="col-sm-3">'
				+ '</div>'
				+ '</div>'
				+ '<div class="payment">'
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
				//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
				+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
				+ '	    <input type="hidden" name="payList[0][payValue&Form]" class="payValueForm" value=""/>'
				+ ' </div>'
				+ '<div class="col-sm-3">'
				+ '<i onclick="addRowPay(this)" data-index="0" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
				+ '</div>'
				+ '</div>');//还原支付方式
		//重新计算-应缴，欠费-已选中的优惠活动
		yjtd.text(yjtd.data("value2"));//先将应缴金额重置为原始金额
		cftd.text(yjtd.data("value2"));//将欠费金额重置为初始欠费金额
		 
		$('#appendPayBody').find('input[type="checkbox"]').each(function(index, object){
			if($(object).prop("checked")) {
				yhzkCalcu2(object);
			}
		});
		
		//如果当前选中优惠类型是优惠券，取消该复选框时，还要修改优惠码输入框为可用状态
	     if(flag=="yh") {
	     	$(obj).parents(".yhzk").find('td').eq(3).find("input").prop("disabled",false);
	     }
	   //计算总计，合计的应缴
	     yjCalcu();
	}
}