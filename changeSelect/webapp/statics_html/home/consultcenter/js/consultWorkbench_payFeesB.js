//订座状态专用生成费用信息方法
function appendPayDiv2(examTimeId, parentId, productId) {
	//生成费用列表前先把报名时生成回显的费用列表清空-防止生成的标签的id冲突
    $('#coursePayInfo').html("");
	//生成费用列表前先把上一次生成的费用列表清空
    $('#'+parentId).html("");
	var infoManageId = $("#infoManageId2").val();
	var price = 0;//用来计算总计应缴金额
	$("#dztr").show();
	var dPrice = $("#dPrice").val();//得到订座费
	//健壮性判断,防止前面步骤操作异常，订座费没有
	if(dPrice==null || dPrice=='' || typeof(dPrice)=='undefined') {
		dPrice = 0;
	}
	//设置订座费栏的金额
//	 $('#dingzuoI').val(null);
	var productId = $("#productId").val();//产品id
	var departmentId1 = $("#departmentId1Hidden").val();//分校id
	var infoManageId = $("#infoManageId2").val();//咨询id
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv",
        "dataType": "json",
        "data": {
        	examTimeId: examTimeId,
            departmentId1: departmentId1,
            infoManageId:infoManageId,
            expensesType:2,//费用类型-收益
            productId:productId
        },
        "success": function (data) {
        	if(data.status=='success'){
        		//回显费用种类信息
        		for(var i=0; i<data.list.length; i++) {
        			//有费用种类信息，隐藏订座费栏
        			$("#dztr").hide();
        			//如果是第一个费用，这块要算上订座费
        			if(i==0) {
        					//拼接费用行
            				$('#'+parentId).append('<tr class="appendDiv firstDiv dingZuo">'
            						+ '<td>' + data.list[i].name + '</td>'
            						+ '<td>' 
            						+ data.list[i].price //产品应缴
            						+ '</td>'
            						//data-value中的值一次是金额下限，原始应缴值，是否锁定
            						+ '<td id="appendPayTd1" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'">' 
            						+ data.list[i].price
            						+ '</td>'
            						+ '<input type="hidden" name="payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储产品应缴值
            						+ '<input type="hidden" name="payCompList['+i+'].yjValue" class="payCompYJ" value="'+data.list[i].price+'"/>'//用来存储实际应缴值,初始值为产品应缴值
            						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
            						+ '<input type="hidden" name="payList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
            						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
            						+ '<input type="hidden" name="payCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
            						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
            						+ '<input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
            						+ '<input type="hidden" name="payCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
            						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
            						//下面是优惠部分参数
            						+ '<input type="hidden" name="payCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
            						+ '<input type="hidden" name="payCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
            						+ '<input type="hidden" name="payCompList['+i+'].discount" class="discount" value=""/>'//折扣id
            						+ '<input type="hidden" name="payCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
            						+ '<input type="hidden" name="payCompList['+i+'].integral" class="integral" value=""/>'//积分id
            						+ '<input type="hidden" name="payCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
            						+ '<td>'
            						+ dPrice
//            						+ '<input type="hidden" class="fixValue" value="'+dPrice+'"/>'//用来存储初始实缴值
            						+ '</td>'
            						+ '<input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
            						+ ' <td>'
            						+ '<div class="payment">'
            						+ '<div class="col-sm-5">'
            						+ ' <select class="form-control" disabled>'
            						+ '		<option selected>订座费已缴费</option>'
            						+ ' </select>'
            						+ '</div>'
            						+ '<div class="col-sm-5">'
            						+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
            						+ '</div>'
            						+ '<div class="col-sm-2">'
            						+ '</div>'
            						+ '</div>'
            						+ '<div class="payment">'
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
            						//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
            						+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" type="text" placeholder="0" >'
            						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
            						+ ' </div>'
            						+ '<div class="col-sm-2">'
            						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
            						+ '</div>'
            						+ '</div>'
            						+ '</td>'
            						+ '<td class="zjcfflag">' 
            						+ (data.list[i].price-dPrice) 
            						+ '</td>'
            						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴值
            						+ '</tr>');

        			} else {
        				//拼接费用行
        				$('#'+parentId).append('<tr class="appendDiv">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td>' 
        						+ data.list[i].price //产品应缴
        						+ '</td>'
        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'">'
        						+ data.list[i].price  
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储产品应缴值
        						+ '<input type="hidden" name="payCompList['+i+'].yjValue" class="payCompYJ" value="'+data.list[i].price+'"/>'//用来存储实际应缴值,初始值为产品应缴值
        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="payCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
        						//下面是优惠部分参数
        						+ '<input type="hidden" name="payCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
        						+ '<input type="hidden" name="payCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
        						+ '<input type="hidden" name="payCompList['+i+'].discount" class="discount" value=""/>'//折扣id
        						+ '<input type="hidden" name="payCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
        						+ '<input type="hidden" name="payCompList['+i+'].integral" class="integral" value=""/>'//积分id
        						+ '<input type="hidden" name="payCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
        						+ '<td id="' + data.list[i].code + '_value">'
        						+ 0//实缴费
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
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
        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-2">'
        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴值
        						+ '</tr>');
        			}
        		}
	         		 //toastr.success('操作完成');
		    	 }else{
		         	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
		         }
        	 //循环结束，拼接合计
        	 $('#'+parentId).append('<tr id="hjDiv">'
        	            + ' <td>合计</td>'
        	            + '<td id="hjYJ">0</td>' //合计产品应缴
        	            + '<td id="hjprice">0</td>' //合计实际应缴
        	            + '<td class="sjhj" id="sjhj">0</td>' //合计实缴
        	            + ' <td><div class="payment">'
        	            + '<div class="col-sm-5">'
        	            + '</div>'
        	            + '<div class="col-sm-5">'
        	            + ' '
        	            + ' </div>'
        	            + '<div class="col-sm-2">'
        	            + '</div>'
        	            + '</div>'
        	            + '</td>'
        	            + '<td id="cfhj">0</td>'
        	            + '</tr>');
       		 hheji();//合计
       		 //第一次查看信息时如果不加这个判断会调用两次考期change事件
     		//(考期回显这里触发一次，考试地区回显又触发一次)
     		if($("#kTime").hasClass("init")) {
     			$("#kTime").removeClass("init");
     		} else {
     			//考期change触发收益拼接事件后，触发考试地区的下拉选change事件
     			branchSchoolChange();
     		}
     		
     		//先移除主产品下之前构造的服务费用
    		$(".project .serviceFees").remove();
    		//生成服务费复选框
    		$.ajax({
    	        "type": "Post",
    	        "url": ctx + "/consultBookingSeats/appendServiceFees",//查询服务费用
    	        "dataType": "json",
    	        "data": {
    	        	examTimeId: examTimeId,//产品考期id
    	        	departmentId1:$("#departmentId1Hidden").val(),//分校id，信息量归属地
    	        	productId:productId
    	        },
    	        "success": function (data3) {
    	        	if(data3.status=='success'){
    	        		var tempStr = '<div class="form-group col-lg-12 col-md-12 col-sm-12 serviceFees">'
    	        			+ '<label style="margin-left: -70px !important;" class="col-sm-2 col-lg-2 control-label no-padding-right">服务类型：</label>';
    	        		//开始构造复选框内容
    	        		for(var x=0; x<data3.serviceList.length; x++) {
    	        			//data-codeId:费用种类codeId, data-required:服务是否必选，data-money：费用金额
    	        			//data-moneyLine:费用种类下限，data-enable：下限是否锁定， data-code：费用种类编码
    	        			//data-name:费用种类名称，data-type：费用类型-收益支出，data-value:服务id
    	        			
    	        			//判断是否必选1-是 0-否，如果是，该服务费默认勾选，并且不允许更改
    	        			if(data3.serviceList[x].isRequired=="1") {
    	        				tempStr += '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
    	                			+ '	 <label>'
    	        					+ '	    <input type="checkbox" checked disabled name="service" class="service" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
    	        					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
    	        					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
    	        					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
    	        					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
    	        					+ '  </label>'	
    	        					+ '</div>';
    	        			} else {
    	        				tempStr += '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
    	                			+ '	 <label>'
    	        					+ '	    <input type="checkbox" onclick="serviceCli(this)" name="service" class="service" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
    	        					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
    	        					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
    	        					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
    	        					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
    	        					+ '  </label>'	
    	        					+ '</div>';
    	        			}
    	        		}
    	        		
    	        		tempStr += '</div>';
    	        		$("#branchSchoolId").parent().parent().after(tempStr);
    	        		
    	        		//遍历页面上必选的服务，把服务费用拼接到后面
    	        		$('.project').find("input[type='checkbox'].service").each(function(i,e){
    	        			var required = $(e).data("required");//得到该服务是否必选
    	        			//判断是否必选1-是 0-否，如果是，该服务费默认勾选，并且不允许更改
    	        			if(required=='1') {
    	        				//是必选
    	        				//触发服务类型复选框单击事件
    	        				serviceCli(e);
    	        			}
    	        		});
    	        	}
    	        },
    	        "error":function() {
    	        	toastr.error("查询服务费用后台出错");
    	        }
    		});
        }
	});
}

//转报名-费用部分相关计算-双击自动填充应缴费用金额-只用于第一种已计入订座费的费用类型
function dbclick2(e) {
	 
//	var dprice = $('#dPrice').val();
//	var price = $(e).parents('tr').children('td').eq(2).text();//每行实际应缴部分金额
//	//每行实缴部分金额
//	$(e).parents('tr').children('td').eq(3).text(price);
//	//每行当前操作金额框金额
//	$(e).val(price-dprice);
	 
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
	//得到当前双击框输入金额
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
	
    sshj(e);
}

//计算使用优惠前，先判断该优惠是否锁定
function beforeYHZK2(obj) {
	//1.先判断该优惠是否可叠加
	var isMulti = $(obj).data("value");
	//0-独立，1-可叠加
	if(isMulti=="0") {//独立
		//使折扣下拉选失效,并且使选项清空
		$("#zkSelect").val('');
		$("#zkSelect").prop("disabled",true);
		$('#zkSelect').trigger('chosen:updated');
		//使积分下拉选失效,并且使选项清空
		$("#jfSelect").val('');
		$("#jfSelect").prop("disabled",true);
		$('#jfSelect').trigger('chosen:updated');
	} else if(isMulti=="2") {//可叠加报名折扣
		//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",false);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",true);
		$('#jfSelect').trigger('chosen:updated');
	} else {//multi为4 可叠加积分活动
		//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",true);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",false);
		$('#jfSelect').trigger('chosen:updated');
//		return;
	}
//	//得到第一种费用类型的对象
//	var firstObj = $('#appendPayBody').find('tr.firstDiv');
	//得到收益类型费用价格最大的对象
	var firstObj = null;
	$('#appendPayBody').find('tr.appendDiv').each(function(i,e){
		//取费用类型-是收益还是支出
		var isNeIf = $(e).find("td").eq(2).data("value4");
		if(isNeIf=="2") {//是收益费用直接返回对象
			firstObj = e;
			return false;//结束each循环
		}
	});
	//判断是否可以取到收益费用，没有就直接报错不能使用优惠
	if(firstObj) {
//		toastr.error($(firstObj).find("td").eq(0).text());
	} else {
		toastr.error("没有收益类型费用，不能使用优惠码");
		//如果当前优惠码是独立类型
		//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",false);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",false);
		$('#jfSelect').trigger('chosen:updated');
		//还原优惠码金额框，输入框
		$(obj).parent().find("input.yhqprice").val(0);//如果优惠码长度不为8位，优惠金额还原为0
    	$(obj).parent().find("input.yhInput").val(null);//如果优惠码长度不为8位，优惠码输入框制空
		return;
	}
	//得到锁定标志1-正常，0-锁定
	var serviceEnable = $(firstObj).find("td").eq(2).data("value3");
	if(serviceEnable=='1') {//正常
		if($(firstObj).hasClass("firstDiv")) {//判断该费用是否是第一个费用，因为第一个费用含订座费
			yhzkCalcuNew2(obj, firstObj);//调用新版优惠折扣算法(含订座费处理)-只适用于锁定状态
		} else {
			yhzkCalcuNew(obj,firstObj);//调用新版优惠折扣算法(不含订座费处理)
		}
	} else {//serviceEnable=='2' 锁定
		if($(firstObj).hasClass("firstDiv")) {//判断该费用是否是第一个费用，因为第一个费用含订座费
			yhzkCalcu2(obj,firstObj);//调用以前的优惠折扣算法(含订座费处理)
		} else {
			yhzkCalcu(obj,firstObj);//调用以前的优惠折扣算法(不含含订座费处理)
		}
		//toastr.success("测试，费用已锁定");
	}
}

//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，可以超过金额下限，但不能小于0为负数
function yhzkCalcuNew2(obj, firstObj) {
	//第一个缴费类型所在tr对象
	var trObj = $(firstObj);
	yjtd = trObj.find('td').eq(2);//索引从0开始，第三个单元格，实际应缴td对象
    cftd = trObj.find('td').eq(5);//第六个单元格,欠费td对象
    protd = trObj.find('td').eq(1);//第二个单元格,产品应缴td对象
    var moneyLine = Number(yjtd.data("value"));//金额下限
    
  //开始判断第一种费用的金额下限是否得到优惠码下限的使用要求
    var proMoney = protd.text();//得到产品应缴金额
   //得到优惠码的下限
    var yhMoneyLine = $(obj).data("limit");
    //得到费用种类的产品应缴金额
    var proMoney = protd.text();
    //如果产品应缴金额小于优惠码的下限，就不让使用该优惠码
    if(Number(proMoney)<Number(yhMoneyLine)) {
    	toastr.error("金额下限未达到该优惠码的要求，无法使用该优惠码");
    	$(obj).parent().find("input.yhqprice").val(0);//优惠金额还原为0
    	$(obj).parent().find("input.yhInput").val(null);//优惠码输入框制空
    	//解锁其它下拉选
		//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",false);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",false);
		$('#jfSelect').trigger('chosen:updated');
    	return;
    }
    
    var dPrice = $("#dPrice").val();//得到订座费
    
  //判断优惠金额是否突破0前，需要先将之前的优惠码的效果清除，然后才能正常判断新输入的优惠码
    var newYhMoney = $(obj).parent().find('input.yhqprice').val();
    $(obj).parent().find('input.yhqprice').val(0);//将该优惠码对应的金额暂时设置为0
    FlushYHZK();//清除之前的优惠码的效果,更新页面金额
    //完整上面的准备工作后，在将该优惠码的金额设置回去
    $(obj).parent().find('input.yhqprice').val(newYhMoney);
    
    //开始进行下限的判断
	var yhMoney = Number($(obj).parent().find('input.yhqprice').val());//优惠金额
	var yjMoney = Number(yjtd.text());//实际应缴费用
	var preferential = yjMoney - yhMoney;//如果使用此优惠后的价钱
    //先判断，如果第一行优惠额度已达金额下限，不允许再勾选其它优惠
    if(Number(preferential)<0) {
    	toastr.error("优惠额度已突破0元，无法再使用此优惠活动");
    	//如果当前优惠码是独立类型
    	//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",false);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",false);
		$('#jfSelect').trigger('chosen:updated');
		//还原优惠码金额框，输入框
		$(e).parent().find("input.yhqprice").val(0);//优惠金额还原为0
    	$(e).parent().find("input.yhInput").val(null);//优惠码输入框制空
    	return;
    } else {
    	if($(trObj).hasClass("dingZuo")) {//判断当咨询量处于订座状态时
			if(yjMoney-yhMoney<$("#dPrice").val()) {//如果减去优惠后，实际应缴小于订座费已缴费
				//取消折扣下拉选失效
				$("#zkSelect").prop("disabled",false);
				$('#zkSelect').trigger('chosen:updated');
				//取消积分下拉选失效
				$("#jfSelect").prop("disabled",false);
				$('#jfSelect').trigger('chosen:updated');
				//还原优惠码金额框，输入框
				$(e).parent().find("input.yhqprice").val(0);//优惠金额还原为0
		    	$(e).parent().find("input.yhInput").val(null);//优惠码输入框制空
				toastr.error($(trObj).find("td").eq(0).text()+"实际应缴值不小于0，但是小于订座费已缴费");
			}
		}
    }
    
	//再将第一个金额的实缴，欠费，实际应缴金额，支付方式清空还原到初始化状态
    trObj.find('td').eq(3).text(dPrice);//实缴金额-还原为订座费
    yjtd.text(yjMoney-yhMoney);//用当前费用的实际应缴金额-折扣费用
	cftd.text(yjMoney-yhMoney);//当前费用的欠费金额=实际应缴金额
	//支付方式栏清空
	trObj.find('td').eq(4).html('<div class="payment">'
			+ '<div class="col-sm-5">'
			+ ' <select class="form-control" disabled>'
			+ '		<option selected>订座费已缴费</option>'
			+ ' </select>'
			+ '</div>'
			+ '<div class="col-sm-5">'
			+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
			+ '</div>'
			+ '<div class="col-sm-2">'
			+ '</div>'
			+ '</div>'
			+ '<div class="payment">'
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
			//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
			+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
			+ '	    <input type="hidden" name="payList[0][payValue&Form]" class="payValueForm" value=""/>'
			+ ' </div>'
			+ '<div class="col-sm-2">'
			+ '<i onclick="addRowPay(this)" data-index="0" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
			+ '</div>'
			+ '</div>');//还原支付方式
	
     //计算总计，合计的应缴，实缴，欠费
     FlushYHZK();//实际更新页面金额
}


//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，不能超过金额下限
function yhzkCalcu2(obj, firstObj) {
	//第一个缴费类型所在tr对象
	var trObj = $(firstObj);
	yjtd = trObj.find('td').eq(2);//索引从0开始，第三个单元格，实际应缴td对象
    cftd = trObj.find('td').eq(5);//第六个单元格,欠费td对象
    protd = trObj.find('td').eq(1);//第二个单元格,产品应缴td对象
    var moneyLine = Number(yjtd.data("value"));//金额下限
    
  //开始判断第一种费用的金额下限是否得到优惠码下限的使用要求
    var proMoney = protd.text();//得到产品应缴金额
   //得到优惠码的下限
    var yhMoneyLine = $(obj).data("limit");
    //得到费用种类的产品应缴金额
    var proMoney = protd.text();
    //如果产品应缴金额小于优惠码的下限，就不让使用该优惠码
    if(Number(proMoney)<Number(yhMoneyLine)) {
    	toastr.error("金额下限未达到该优惠码的要求，无法使用该优惠码");
    	//如果当前优惠码是独立类型
    	//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",false);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",false);
		$('#jfSelect').trigger('chosen:updated');
		//还原优惠码金额框，输入框
		$(e).parent().find("input.yhqprice").val(0);//优惠金额还原为0
    	$(e).parent().find("input.yhInput").val(null);//优惠码输入框制空
    	return;
    }
    
    var dPrice = $("#dPrice").val();//得到订座费
    
    //判断优惠金额是否达到下限前，需要先将之前的优惠码的效果清除，然后才能正常判断新输入的优惠码
    var newYhMoney = $(obj).parent().find('input.yhqprice').val();
    $(obj).parent().find('input.yhqprice').val(0);//将该优惠码对应的金额暂时设置为0
    FlushYHZK();//清除之前的优惠码的效果,更新页面金额
    //完整上面的准备工作后，在将该优惠码的金额设置回去
    $(obj).parent().find('input.yhqprice').val(newYhMoney);
    
    //开始判断是否优惠到负数
	var yhMoney = Number($(obj).parent().find('input.yhqprice').val());//优惠金额
	var yjMoney = Number(yjtd.text());//实际应缴费用
    var preferential = yjMoney-moneyLine;//可用于优惠的额度（实际应缴金额-金额下限)
    
    //先判断，如果第一行优惠额度已达金额下限，不允许再勾选其它优惠
    //if(yjMoney==moneyLine) {
    if(yhMoney>preferential) {
    	toastr.error("优惠额度已达金额下限，无法再使用此优惠活动");
    	//如果当前优惠码是独立类型
    	//取消折扣下拉选失效
		$("#zkSelect").prop("disabled",false);
		$('#zkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#jfSelect").prop("disabled",false);
		$('#jfSelect').trigger('chosen:updated');
		//还原优惠码金额框，输入框
		$(e).parent().find("input.yhqprice").val(0);//优惠金额还原为0
    	$(e).parent().find("input.yhInput").val(null);//优惠码输入框制空
    	return;
    } else {
    	if($(trObj).hasClass("dingZuo")) {//判断当咨询量处于订座状态时
			if(yjMoney-yhMoney<$("#dPrice").val()) {//如果减去优惠后，实际应缴小于订座费已缴费
				//取消折扣下拉选失效
				$("#zkSelect").prop("disabled",false);
				$('#zkSelect').trigger('chosen:updated');
				//取消积分下拉选失效
				$("#jfSelect").prop("disabled",false);
				$('#jfSelect').trigger('chosen:updated');
				//还原优惠码金额框，输入框
				$(e).parent().find("input.yhqprice").val(0);//优惠金额还原为0
		    	$(e).parent().find("input.yhInput").val(null);//优惠码输入框制空
				toastr.error($(trObj).find("td").eq(0).text()+"实际应缴值不小于下限，但是小于订座费已缴费");
			}
		}
    }
	//再将第一个金额的实缴，支付方式清空还原到初始化状态
	trObj.find('td').eq(3).text(dPrice);//实缴金额-还原为订座费
	trObj.find('td').eq(5).text(yjMoney);//欠费金额重置为初始值
	 yjtd.text(yjMoney-yhMoney);//用当前费用的实际应缴金额-折扣费用
	 cftd.text(yjMoney-yhMoney);//当前费用的欠费金额=实际应缴金额
	trObj.find('td').eq(4).html('<div class="payment">'
			+ '<div class="col-sm-5">'
			+ ' <select class="form-control" disabled>'
			+ '		<option selected>订座费已缴费</option>'
			+ ' </select>'
			+ '</div>'
			+ '<div class="col-sm-5">'
			+ '<input class="form-control zjsjflag" value="'+dPrice+'" type="text" disabled>'
			+ '</div>'
			+ '<div class="col-sm-2">'
			+ '</div>'
			+ '</div>'
			+ '<div class="payment">'
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
			//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
			+ '     <input ondblclick="dbclick2(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="0" type="text" placeholder="0" >'
			+ '	    <input type="hidden" name="payList[0][payValue&Form]" class="payValueForm" value=""/>'
			+ ' </div>'
			+ '<div class="col-sm-2">'
			+ '<i onclick="addRowPay(this)" data-index="0" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
			+ '</div>'
			+ '</div>');//还原支付方式
	
     //计算总计，合计的应缴
     FlushYHZK();//清除之前的优惠码的效果,更新页面金额
}