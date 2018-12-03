function appendChildPayDiv(examTimeId, parentId, productId) {
	//生成费用列表前先把报名时生成回显的费用列表清空-防止生成的标签的id冲突
    $('#appendChildPayBody').html("");
	//生成费用列表前先把上一次生成的费用列表清空
    $('#'+parentId).html("");
	var price = 0;//用来计算总计应缴金额
	//设置订座费栏的金额
	 $('#dingzuoIChild').val(null);
	var productId = $("#childProductId").val()//产品id
	var departmentId1 = $("#departmentId1Hidden").val();//分校id
	var infoManageId = $("#infoManageId2").val();//咨询id
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv",
        "dataType": "json",
        "data": {
            examTimeId:examTimeId,
            departmentId1:departmentId1,
            infoManageId:infoManageId,
            expensesType:2,//费用类型-收益
            productId:productId
        },
        "success": function (data) {
        	 
        	if(data.status=='success'){
        		for(var i=0; i<data.list.length; i++) {
        			//如果是第一个费用，这块要算上订座费
        			if(i==0) {
        				//更新订座费的费用类型 1支出 2收益
            			$("#isNeIf").val(data.list[i].expensesType);
        					//拼接费用行
            				$('#'+parentId).prepend('<tr class="appendDiv firstDiv">'
            						+ '<td>' + data.list[i].name + '</td>'
            						+ '<td>' 
            						+ data.list[i].price //产品应缴
            						+ '</td>'
            						//data-value中的值一次是金额下限，原始应缴值，是否锁定
            						+ '<td data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'">' 
            						+ data.list[i].price //实际应缴
            						+ '</td>'
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储原始应缴值
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].yjValue" class="payCompYJ" value="'+data.list[i].price+'"/>'//用来存储应缴值,初始值为产品应缴值
            						+ '<input type="hidden" name="childPayFees.payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
            						+ '<input type="hidden" name="childPayFees.payList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
            						+ '<input type="hidden" name="childPayFees.payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
            						+ '<input type="hidden" name="childPayFees.payList['+i+'][isNeIf]" class="isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].isNeIf" class="isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
            						//下面是优惠部分参数
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].discount" class="discount" value=""/>'//折扣id
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].integral" class="integral" value=""/>'//积分id
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
            						+ '<td>'
            						+ 0
            						+ '</td>'
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
            						+ ' <td>'
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
            						+ '     <input ondblclick="childDbclick(this)" class="form-control zjsjflag" onkeyup="childSshj(this)" type="text" placeholder="0" >'
            						+ '	    <input type="hidden" name="childPayFees.payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
            						+ ' </div>'
            						+ '<div class="col-sm-2">'
            						+ '<i onclick="addChildRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
            						+ '</div>'
            						+ '</div>'
            						+ '</td>'
            						+ '<td class="zjcfflag">' 
            						+ data.list[i].price
            						+ '</td>'
            						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴值
            						+ '</tr>');
        			} else {
        				//拼接费用行
        				$('#'+parentId).append('<tr class="appendDiv">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td>' 
        						+ data.list[i].price //产品应缴
        						+ '</td>'
        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'" >'
        						+ data.list[i].price //实际应缴
        						+ '</td>'
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储产品应缴值
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].yjValue" class="payCompYJ" value="'+data.list[i].price+'"/>'//用来存储实际应缴值, 初始值为产品应缴值
        						+ '<input type="hidden" name="childPayFees.payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="childPayFees.payList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="childPayFees.payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<input type="hidden" name="childPayFees.payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
        						//下面是优惠部分参数
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].discount" class="discount" value=""/>'//折扣id
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].integral" class="integral" value=""/>'//积分id
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
        						+ '<td id="' + data.list[i].code + '_value">'
        						+ 0//实缴费
        						+ '</td>'
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值, 初始值为0
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
        						+ '     <input ondblclick="childDbclick(this)" class="form-control zjsjflag" onkeyup="childSshj(this)" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="childPayFees.payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-2">'
        						+ '<i onclick="addChildRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="childPayComp.payCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值, 初始值为产品应缴值
        						+ '</tr>');
        			}
        		}
        		 //循环结束，拼接合计
          		 $('#appendChildPayBody').append('<tr id="childHjDiv">'
           	            + ' <td>合计</td>'
           	            + '<td id="childHjYJ">0</td>' //合计产品应缴
           	            + '<td id="childHjprice">0</td>' //合计实际应缴
           	            + '<td class="sjhj" id="childSjhj">0</td>' //合计实缴
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
           	            + '<td id="childCfhj">0</td>'
           	            + '</tr>');
          		childHheji();//合计
        		//拼接最后的总计，优惠，折扣，合计---这块放到选择考试地区后拼接
        		//class=init,考期列表第一次初始化回显标志，
        		//第一次查看信息时如果不加这个判断会调用两次考期change事件
        		//(考期回显这里触发一次，考试地区回显又触发一次)
        		if($("#childKTime").hasClass("init")) {
        			$("#childKTime").removeClass("init");
        		} else {
        			//考期change触发收益拼接事件后，触发考试地区的下拉选change事件
        			childBranchSchoolChange();
        		}
        		
        		//先移除子产品课程信息下之前构造的服务费用
        		$(".project2 .serviceFees").remove();
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
        	        					+ '	    <input type="checkbox" checked disabled name="childService" class="childService" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
        	        					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
        	        					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
        	        					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
        	        					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
        	        					+ '  </label>'	
        	        					+ '</div>';
        	        			} else {
        	        				tempStr += '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
        	                			+ '	 <label>'
        	        					+ '	    <input type="checkbox" onclick="childServiceCli(this)" name="childService" class="childService" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
        	        					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
        	        					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
        	        					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
        	        					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
        	        					+ '  </label>'	
        	        					+ '</div>';
        	        			}
        	        		}
        	        		
        	        		tempStr += '</div>';
        	        		$("#childBranchSchoolId").parent().parent().after(tempStr);
        	        		
        	        		 
        	        		//遍历页面上必选的服务，把服务费用拼接到后面
        	        		$('.project2').find("input[type='checkbox'].childService").each(function(i,e){
        	        			var required = $(e).data("required");//得到该服务是否必选
        	        			//判断是否必选1-是 0-否，如果是，该服务费默认勾选，并且不允许更改
        	        			if(required=='1') {
        	        				//是必选
        	        				//触发服务类型复选框单击事件
        	        				childServiceCli(e);
        	        			}
        	        		});
        	        	}
        	        },
        	        "error":function() {
        	        	toastr.error("查询服务费用后台出错");
        	        }
        		});
        		
        	}else{
            	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
            }
        }
    });
}

//子产品折扣下拉选change事件
function childZkChange(obj) {
	//判断是否可叠加，如果独立，就将另外两种优惠类型disable，否则，取消disable
	var isMulti = $(obj).find(":selected").data("multi");
	
	//获得费用种类code_id集合
	var epId = $(obj).find(":selected").data("value");
	epId = epId.toString();//确保得到的是字符串
	if(epId=='' || epId==null) {//如果epId为空串
		var epIdArr = new Array();
	} else if(epId.indexOf(",")==-1) {//如果epId集合中只有一个code_id
		var epIdArr = new Array(epId);
	} else {//如果epId集合中有多个code_id
		var epIdArr = epId.split(",");
	}
	 
	//0-独立，1-可叠加
	if(isMulti=="0") {//独立
		//使积分下拉选失效,并且使选项清空
		$("#childJfSelect").val('');
		$("#childJfSelect").prop("disabled",true);
		$('#childJfSelect').trigger('chosen:updated');
		//清空优惠码输入框，并使优惠码输入框失效
		$(".childYhInput").each(function(index,obj){
			$(obj).val('');
			$(obj).prop("disabled",true);
		});
//		$(".yhInput").val('');
//		$(".yhInput").prop("disabled",true);
	} else if(isMulti=="1") {//可叠加
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
		//取消优惠码输入框失效
		$(".childYhInput").each(function(index,obj){
			$(obj).prop("disabled",false);
		});
	} else {//multi为空
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
		//清空优惠码输入框，并使优惠码输入框失效
		$(".childYhInput").each(function(index,obj){
			$(obj).val('');
			$(obj).prop("disabled",false);
		});
		//调用优惠计算方法，更新页面计算已选中优惠后的值
		childFlushYHZK();
		return;
	}
	
	//遍历缴费信息，判断实缴金额下限前，需要先将以前选中的折扣的效果消除-更新页面，这样新选中的折扣活动才能正确判断
	var newValue = $("#childZkSelect").val();
	$("#childZkSelect").val('');//优惠不可用，将该选中优惠的值制为空
	$('#childZkSelect').trigger('chosen:updated');
	childFlushYHZK();//消除之前选中的折扣的效果-更新页面
	//再将本次选中的值重新设置回去（此时的页面上的金额就是正常的金额）
	$("#childZkSelect").val(newValue);
	$('#childZkSelect').trigger('chosen:updated');
	
	//遍历缴费信息下，费用种类的id，如果该费用种类的id在code_id集合中
	//再判断是否锁定(实际应缴不能为负数）和下限（实际应缴不能小于下限）
	//最终确定该优惠是否可以使用，如果不能使用弹框警告，再将选项职位空，可以使用再调用优惠折扣计算为页面减去相关金额。
	var useFlag = false;//缴费内容下是否有缴费类型可以使用该优惠标志
	$(".projectPayFees2 tr.appendDiv").each(function(i,e){
		var codeId = $(e).find("input.payCodeId").val();
		for(var index in epIdArr) {
			useFlag = true;//有缴费类型可以使用该优惠，将useFlag制为true
			if(codeId==epIdArr[index]) {//当前费用种类的id在code_id集合中，该费用可以使用，折扣
				//得到是否锁定1-正常，0-锁定
				var serviceEnable = $(e).find("td").eq(2).data("value3");
				//判断是否锁定
				if(serviceEnable=="0") {//如果为锁定，下限有效
					//得到下限
					var moneyLine = $(e).find("td").eq(2).data("value");
					//得到当前实际应缴值
					var yjValue = $(e).find("td").eq(2).text();
					//得到当前产品应缴值
					var proValue = $(e).find("td").eq(1).text();
					//得到当前折扣比例
					var discount = $(obj).find(":selected").data("discount");
					//得到当前折扣金额
					var zkValue = Math.round(Number(yjValue)*(1-discount));
					//判断下限
					if(yjValue-zkValue<moneyLine) {//如果减去折扣后，实际应缴小于下限
						$("#childZkSelect").val('');//优惠不可用，将该选中优惠的值制为空
						$('#childZkSelect').trigger('chosen:updated');
						toastr.error($(e).find("td").eq(0).text()+"有费用实际应缴值小于下限");
					}
				} else {//如果为正常，下限无效，统一为0
					//得到当前实际应缴值
					var yjValue = $(e).find("td").eq(2).text();
					//得到当前产品应缴值
					var proValue = $(e).find("td").eq(1).text();
					//得到当前折扣比例
					var discount = $(obj).find(":selected").data("discount");
					//得到当前折扣金额
					var zkValue = Math.round(Number(yjValue)*(1-discount));
					//判断下限
					if(yjValue-zkValue<0) {//如果减去折扣后，实际应缴小于下限
						$("#childZkSelect").val('');//优惠不可用，将该选中优惠的值制为空
						$('#childZkSelect').trigger('chosen:updated');
						toastr.error($(e).find("td").eq(0).text()+"费用实际应缴值小于0");
					}
				}
//				toastr.error($(e).find("td").eq(0).text());
				//return false;//结束当前each循环，继续判断下一个费用种类
			}
		}
	});
	//判断缴费内容下是否有缴费类型可以使用该优惠
	if(useFlag==false) {
		var zkName = $("#childZkSelect").val();
		$("#childZkSelect").val('');//优惠不可用，将该选中优惠的值制为空
		$('#childZkSelect').trigger('chosen:updated');
		toastr.error(zkName+"没有费用种类使用");
	}
	//如果该优惠通过了校验，可以使用，调用优惠计算方法，实际更新页面优惠后的金额值
	childFlushYHZK();
}

//子产品优惠计算方法，实际更新页面优惠后的金额值(页面当前选中的优惠折扣都是经过验证可以使用的优惠折扣)
//注意：可以调用该方法，说明页面上已选中的优惠活动都是经过验证的，可以直接拿来计算金额，无需再次验证
function childFlushYHZK() {
//	toastr.error("更新优惠");
	//更新页面实际应缴金额前，先将页面上所有使用了优惠活动的费用（实际应缴小于产品应缴）
	//的实际应缴，实缴，支付方式，欠费整理还原，方便下面的计算
	$(".projectPayFees2 tr.appendDiv").each(function(index,obj){
		//得到产品应缴
		var proValue = $(obj).find("td").eq(1).text();
		//得到实际应缴
		var yjValue = $(obj).find("td").eq(2).text();
		//判断实际应缴是否小于产品应缴，来确定是否要还原该费用种类
		if(Number(yjValue)<Number(proValue)) {
			//先还原实际应缴
			$(obj).find("td").eq(2).text(proValue);
			//在还原实缴——值为0
			$(obj).find("td").eq(3).text(0);
			
			//新增2018/1/2, 先更新缴费下使用的优惠活动-折扣，优惠码，积分
			//将以前该费用使用的优惠活动信息清空
			//清空折扣活动
			$(obj).find("input.discount").val(null);
			$(obj).find("input.discountValue").val(null);
			//清空使用过的优惠码活动
			$(obj).find("input.activityCode").val(null);
			$(obj).find("input.activityValue").val(null);
			//清空使用过的积分活动
			$(obj).find("input.integral").val(null);
			$(obj).find("input.integralValue").val(null);
			//清除每种费用类型下input输入框的实际应缴，实缴值
			$(obj).find("input.payCompYJ").val(null);//实际应缴值
			$(obj).find("input.payCompSJ").val(null);//实缴值
			$(obj).find("input.payCompCF").val(null);//欠费
			//得到之前记录的索引
			var indexCount = $(obj).find("i").data("index");
			//接着还原支付方式列
			//支付方式栏清空
			$(obj).find('td').eq(4).html('<div class="payment addPayment">'
			        + ' <div class="col-sm-5" >'
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
			        + '     <input class="form-control zjsjflag" ondblclick="childDbclick(this)" isat="1" onkeyup="childSshj(this)" type="text" placeholder="0" >'
			        + '	    <input type="hidden" name="childPayFees.payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
			        + ' </div>'
			        + '<div class="col-sm-2">'
			        + '<i onclick="addChildRowPay(this)" data-index="'+indexCount+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
			        + '</div>'
			        + '</div>');//还原支付方式
			//最后还原欠费
			$(obj).find("td").eq(5).text(proValue);
		}
	});
	//根据页面已选中的折扣更新实际应缴金额
	//先得到页面选中的折扣
	var zkValue = $("#childZkSelect").val();
	if(zkValue!=null && zkValue!='') {//折扣有可用值选中
		//得到该折扣活动的code_id集合
		var epId = $("#childZkSelect").find(":selected").data("value");
		epId = epId.toString();//确保得到的是字符串
		if(epId=='' || epId==null) {//如果epId为空串
			var epIdArr = new Array();
		} else if(epId.indexOf(",")==-1) {//如果epId集合中只有一个code_id
			var epIdArr = new Array(epId);
		} else {//如果epId集合中有多个code_id
			var epIdArr = epId.split(",");
		}
		
		//开始实际更新使用了优惠的费用的实际应缴
		$(".projectPayFees2 tr.appendDiv").each(function(i,e){
			//得到费用的code_id
			var codeId = $(e).find("input.payCodeId").val();
			for(var index in epIdArr) {
				if(codeId==epIdArr[index]) {//当前费用种类的id在code_id集合中，更新该费用的实际应缴和欠费
					//得到当前产品应缴值
					var proValue = $(e).find("td").eq(1).text();
					//得到当前折扣比例
					var discount = $("#childZkSelect").find(":selected").data("discount");
					//得到当前实际应缴值
					var yjValue = $(e).find("td").eq(2).text();
					//得到当前折扣金额
					var zkValue = Math.round(Number(proValue)*(1-discount));
					//更新实际应缴金额
					$(e).find("td").eq(2).text(yjValue-zkValue);
					//更新欠费
					$(e).find("td").eq(5).text(yjValue-zkValue);
					
					//开始设置该使用在该费用上的折扣活动的id，和折扣的金额
					//设置折扣活动id
					$(e).find("input.discount").val($("#childZkSelect").val());
					//设置折扣金额
					$(e).find("input.discountValue").val(zkValue);
				}
			}
		});
	} 
	//根据页面已选中的优惠码更新实际应缴金额
	//得到页面选中的优惠码
	var yhValue = $("#childYhInput").val();
	if(yhValue!=null && yhValue!='') {//优惠码有可用值填写
		//更新实际应缴，欠费
		//得到收益类型费用价格最大的对象
		var firstObj = null;
		$('#appendChildPayBody').find('tr.appendDiv').each(function(i,e){
			//取费用类型-是2:收益还是1:支出
			var isNeIf = $(e).find("td").eq(2).data("value4");
			if(isNeIf=="2") {//是收益费用直接返回对象
				firstObj = e;
				return false;//退出each循环
			}
		});
		//得到优惠金额
		var yhMoney = Number($('#childYhqprice').val());//优惠金额
		//得到实际应缴金额
		var yhYJMoney = $(firstObj).find("td").eq(1).text();
		//更新实际应缴
		$(firstObj).find("td").eq(2).text(yhYJMoney-yhMoney);
		//更新欠费
		$(firstObj).find("td").eq(5).text(yhYJMoney-yhMoney);
		
		//开始设置该使用在该费用上的优惠码活动的id，和优惠码的金额
		//设置优惠码活动id
		$(firstObj).find("input.activityCode").val($("#childYhInput").val());
		//设置优惠码金额
		$(firstObj).find("input.activityValue").val($("#childYhqprice").val());
	}
	//页面选中的积分活动-到最后报名提交缴费信息时再计算
	
	//再次更新页面上的实缴金额和支付方式，将页面上所有使用了优惠活动的费用（实际应缴小于产品应缴）
	//的实缴，支付方式还原（应为有可能第一次输入金额没有选优惠，此时产品应缴=实际应缴，然后有选择了优惠会有bug，所有这里要再处理一下）
	$(".projectPayFees2 tr.appendDiv").each(function(index,obj){
		//得到产品应缴
		var proValue = $(obj).find("td").eq(1).text();
		//得到实际应缴
		var yjValue = $(obj).find("td").eq(2).text();
		//更新每种费用类型下input输入框的实际应缴，实缴值-在支付方式相关事件中设置
		$(obj).find("input.payCompYJ").val(yjValue);//实际应缴值
		$(obj).find("input.payCompSJ").val(0);//实缴值
		$(obj).find("input.payCompCF").val(yjValue);//欠费
		
		//判断实际应缴是否小于产品应缴，来确定是否要还原该费用种类
		if(Number(yjValue)<Number(proValue)) {
			//在还原实缴——值为0
			$(obj).find("td").eq(3).text(0);
			//得到之前记录的索引
			var indexCount = $(obj).find("i").data("index");
			//接着还原支付方式列
			//支付方式栏清空
			$(obj).find('td').eq(4).html('<div class="payment addPayment">'
			        + ' <div class="col-sm-5" >'
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
			        + '     <input class="form-control zjsjflag" ondblclick="childDbclick(this)" isat="1" onkeyup="childSshj(this)" type="text" placeholder="0" >'
			        + '	    <input type="hidden" name="childPayFees.payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
			        + ' </div>'
			        + '<div class="col-sm-2">'
			        + '<i onclick="addChildRowPay(this)" data-index="'+indexCount+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
			        + '</div>'
			        + '</div>');//还原支付方式
		}
	});
	
	//优惠活动更新完成后，还需要调用一次计算合计内容
	childHheji();
}

/**
 * 子产品优惠码失去焦点事件
 * 优惠码校验-当输入的优惠码长度是8位时触发，判断操作用户所属部门是否可以使用优惠，以及该优惠码是否已经使用
 * 注：如果是admin用户可以使用所有部门的优惠码
 * @returns
 */
function childActivtyCode(e) {
    if (e.value.length == 8) {
    	//先判断是主产品是否有优惠码，如果有，还要判断是否与子产品填写的优惠码相同
    	var codeObj = $("#yhInput");
    	if(codeObj!=null && typeof(codeObj)!="undefined") {
    		//如果有子产品优惠码对象，得到子产品的优惠码内容
    		var codeStr = $("#yhInput").val();
    		//判断是否与子产品填写的优惠码相同
    		var payCode =  $(e).parent().find("input.childYhInput").val();
    		if(payCode==codeStr) {
    			toastr.error("主产品已经填写了该优惠码");
    			//为避免本优惠码属于独立优惠，还需要做如下操作
            	//取消折扣下拉选失效
        		$("#childZkSelect").prop("disabled",false);
        		$('#childZkSelect').trigger('chosen:updated');
        		//取消积分下拉选失效
        		$("#childJfSelect").prop("disabled",false);
        		$('#childJfSelect').trigger('chosen:updated');
        		//发生错误后要将实缴金额制为空
            	$(e).parent().find("input.childYhqprice").val(0);
            	//发生错误后要将优惠码制空
            	$(e).parent().find("input.childYhInput").val(null);
            	//如果之前输入的优惠码有效，还需要取消该优惠码的效果
            	childFlushYHZK();
    		}
    	}
    	
        $.ajax({
            url: ctx + '/bizActivityCode/loadCode',//判断当前操作人员所属部门是否可以使用该优惠券，以及该优惠券是否已经使用
            type: 'POST',
            data: {
                code: $(e).val()
               // dept:$("#departmentId1Hidden").val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.length != 0) {
                    if (data[0].useStatus == "1") {
                        toastr.error("该优惠码已经被使用");
                      //为避免本优惠码属于独立优惠，还需要做如下操作
                    	//取消折扣下拉选失效
                		$("#childZkSelect").prop("disabled",false);
                		$('#childZkSelect').trigger('chosen:updated');
                		//取消积分下拉选失效
                		$("#childJfSelect").prop("disabled",false);
                		$('#childJfSelect').trigger('chosen:updated');
                		//发生错误后要将实缴金额制为空
                    	$(e).parent().find("input.childYhqprice").val(0);
                    	//发生错误后要将优惠码制空
                    	$(e).parent().find("input.childYhInput").val(null);
                    	//如果之前输入的优惠码有效，还需要取消该优惠码的效果
                    	childFlushYHZK();
                    } else {
                       // toastr.success("该优惠码可以使用，优惠金额：" + data[0].amount);
                    	$(e).parent().find("input.childYhqprice").val(data[0].amount);//优惠金额
                    	 
                        childBeforeYH(e);
                        //hheji();//实时合计
                    }
                } else {
                    toastr.error("优惠码不存在或该优惠码不属于产品归属分校");
                  //为避免本优惠码属于独立优惠，还需要做如下操作
                	//取消折扣下拉选失效
            		$("#childZkSelect").prop("disabled",false);
            		$('#childZkSelect').trigger('chosen:updated');
            		//取消积分下拉选失效
            		$("#childJfSelect").prop("disabled",false);
            		$('#childJfSelect').trigger('chosen:updated');
            		//发生错误后要将实缴金额制为空
                	$(e).parent().find("input.childYhqprice").val(0);
                	//发生错误后要将优惠码制空
                	$(e).parent().find("input.childYhInput").val(null);
                	//如果之前输入的优惠码有效，还需要取消该优惠码的效果
                	childFlushYHZK();
                }
            }
        });
    } else {
    	 
    	 toastr.error("请输够8位优惠码");
    	//为避免本优惠码属于独立优惠，还需要做如下操作
    	//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
    	$(e).parent().find("input.childYhqprice").val(0);//如果优惠码长度不为8位，优惠金额还原为0
    	$(e).parent().find("input.childYhInput").val(null);//如果优惠码长度不为8位，优惠码输入框
    	//如果之前输入的优惠码有效，还需要取消该优惠码的效果
    	childFlushYHZK();
    }
}

//计算使用优惠前，先判断该优惠是否可叠加，再判断是否存在收益费用，然后是否锁定
function childBeforeYH(obj) {
	//1.先判断该优惠是否可叠加
	var isMulti = $(obj).data("value");
	//0-独立，1-可叠加
	if(isMulti=="0") {//独立
		//使折扣下拉选失效,并且使选项清空
		$("#childZkSelect").val('');
		$("#childZkSelect").prop("disabled",true);
		$('#childZkSelect').trigger('chosen:updated');
		//使积分下拉选失效,并且使选项清空
		$("#childJfSelect").val('');
		$("#childJfSelect").prop("disabled",true);
		$('#childJfSelect').trigger('chosen:updated');
	} else if(isMulti=="1") {//可叠加
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
	} else {//multi为空
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
		return;
	}
	//2.判断是否存在收益费用
	//得到收益类型费用价格最大的对象
	var firstObj = null;
	$('#appendChildPayBody').find('tr.appendDiv').each(function(i,e){
		//取费用类型-是2:收益还是1:支出
		var isNeIf = $(e).find("td").eq(2).data("value4");
		if(isNeIf=="2") {//是收益费用直接返回对象
			firstObj = e;
			return false;//退出each循环
		}
	});
	//判断是否可以取到收益费用(即收益费用对象是否为空），没有就直接报错不能使用优惠
	if(firstObj) {
	} else {
//		toastr.error("没有收益类型费用，不能使用优惠");
		//清空优惠码输入框，并且使优惠码输入框无效
		$(".childYhInput").each(function(index,obj){
			$(obj).val('');
			$(obj).prop("disabled",true);
		});
		toastr.error("没有收益类型费用，不能使用优惠");
		//解锁其它下拉选
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
		return;
	}
	//3.判断金额最大收益费用是否锁定
	//得到锁定标志service_enable：1-正常，0-锁定
	var serviceEnable = $(firstObj).find("td").eq(1).data("value3");
	if(serviceEnable=='1') {//正常
		childYhCalcuNew(obj,firstObj);//调用新版优惠折扣算法-只适用于正常状态（下限无效，统一为0）
	} else {//serviceEnable=='0' 锁定
		 
		childYhCalcu(obj,firstObj);//调用以前的优惠折扣算法-只适用于锁定状态（下限有效）
		//toastr.success("测试，费用已锁定");
	}
}

//用于正常状态（未锁定）
//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，可以超过金额下限，但不能小于0为负数
function childYhCalcuNew(obj,firstObj) {
	var trObj = $(firstObj);
	
	yjtd = trObj.find('td').eq(2);//索引从0开始，第三个单元格，实际应缴td对象
  cftd = trObj.find('td').eq(5);//第六个单元格,欠费td对象
  
  protd = trObj.find('td').eq(1);//第二个单元格，产品应缴td对象
  var proMoney = protd.text();//得到产品应缴金额
 //得到优惠码的下限
  var yhMoneyLine = $(obj).data("limit");
  //得到费用种类的产品应缴金额
  var proMoney = protd.text();
  //如果产品应缴金额小于优惠码的下限，就不让使用该优惠码
  if(Number(proMoney)<Number(yhMoneyLine)) {
  	toastr.error("金额下限未达到该优惠码的要求，无法使用该优惠码");
  	$(obj).val('');//清空该优惠码内容
  	//解锁其它下拉选
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
  	return;
  }
  
  //判断优惠金额是否达到下限前，需要先将之前的优惠码的效果清除，然后才能正常判断新输入的优惠码
  var newYhMoney = $(obj).parent().find('input.childYhqprice').val();
  $(obj).parent().find('input.childYhqprice').val(0);//将该优惠码对应的金额暂时设置为0
  childFlushYHZK();//清除之前的优惠码的效果,更新页面金额
  //完整上面的准备工作后，在将该优惠码的金额设置回去
  $(obj).parent().find('input.childYhqprice').val(newYhMoney);
  
  //开始进行下限的判断
	var yhMoney = Number($(obj).parent().find('input.childYhqprice').val());//优惠金额
	var yjMoney = Number(yjtd.text());//实际应缴费用
	var preferential = yjMoney - yhMoney;//如果使用此优惠后的价钱
  //先判断，如果第一行优惠额度已达金额下限，不允许再勾选其它优惠
  if(Number(preferential)<0) {
  	toastr.error("优惠额度已突破0元，无法再使用此优惠活动");
  	$(obj).val('');//清空该优惠码内容
  	//解锁其它下拉选
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
  	return;
  }
	//再将第一个金额的实缴，支付方式清空还原到初始化状态
	trObj.find('td').eq(2).text(yjMoney - yhMoney);//更新实际应缴金额
	trObj.find('td').eq(3).text(0);//实缴金额清空
	trObj.find('td').eq(5).text(yjMoney - yhMoney);//欠费金额重置为实际应缴金额
	var qfMoney = Number(cftd.text());//欠费金额
	//先得到这是第几个费用种类，即支付方式的index
	var indexCount = trObj.find('td').eq(4).find("i").data("index");
	//支付方式栏清空
	trObj.find('td').eq(4).html('<div class="payment addPayment">'
	        + ' <div class="col-sm-5" >'
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
	        + '     <input class="form-control zjsjflag" ondblclick="childDbclick(this)" isat="1" onkeyup="childSshj(this)" type="text" placeholder="0" >'
	        + '	    <input type="hidden" name="childPayFees.payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
	        + ' </div>'
	        + '<div class="col-sm-2">'
	        + '<i onclick="addChildRowPay(this)" data-index="'+indexCount+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
	        + '</div>'
	        + '</div>');//还原支付方式
	
   //计算总计，合计的应缴，实缴，欠费
   //yjCalcu();
	childFlushYHZK();//实际更新页面金额
}

//用于锁定状态
//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，不能超过金额下限
function childYhCalcu(obj,firstObj) {
	var trObj = $(firstObj);
	
	yjtd = trObj.find('td').eq(2);//索引从0开始，第三个单元格，实际应缴td对象
  cftd = trObj.find('td').eq(5);//第六个单元格,欠费td对象
  protd = trObj.find('td').eq(1);//第二个单元格,产品应缴td对象
  var moneyLine = Number(yjtd.data("value"));//金额下限
  
  var proMoney = protd.text();//得到产品应缴金额
 //得到优惠码的下限
  var yhMoneyLine = $(obj).data("limit");
  //得到费用种类的产品应缴金额
  var proMoney = protd.text();
  //如果产品应缴金额小于优惠码的下限，就不让使用该优惠码
  if(Number(proMoney)<Number(yhMoneyLine)) {
  	toastr.error("金额下限未达到该优惠码的要求，无法使用该优惠码");
  	$(obj).val('');//清空该优惠码内容
  	//解锁其它下拉选
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
  	return;
  }
  
  //判断优惠金额是否达到下限前，需要先将之前的优惠码的效果清除，然后才能正常判断新输入的优惠码
  var newYhMoney = $(obj).parent().find('input.childYhqprice').val();
  $(obj).parent().find('input.childYhqprice').val(0);//将该优惠码对应的金额暂时设置为0
  childFlushYHZK();//清除之前的优惠码的效果,更新页面金额
  //完整上面的准备工作后，在将该优惠码的金额设置回去
  $(obj).parent().find('input.childYhqprice').val(newYhMoney);
  
  //开始判断是否优惠到负数
	var yhMoney = Number($(obj).parent().find('input.childYhqprice').val());//优惠金额
	var yjMoney = Number(yjtd.text());//实际应缴费用
  var preferential = yjMoney-moneyLine;//可用于优惠的额度（实际应缴金额-金额下限)
  //先判断，如果第一行优惠额度已达金额下限，不允许再使用该优惠
  if(yhMoney>preferential) {
  	toastr.error("优惠额度已达金额下限，无法再使用此优惠活动");
  	$(obj).val('');//清空该优惠码内容
  	//解锁其它下拉选
		//取消折扣下拉选失效
		$("#childZkSelect").prop("disabled",false);
		$('#childZkSelect').trigger('chosen:updated');
		//取消积分下拉选失效
		$("#childJfSelect").prop("disabled",false);
		$('#childJfSelect').trigger('chosen:updated');
  	return;
  }
	//再将第一个金额的实际应缴，实缴，支付方式清空还原到初始化状态
	trObj.find('td').eq(2).text(yjMoney-yhMoney);//实际应缴金额更新
	trObj.find('td').eq(3).text(0);//实缴金额清空
	trObj.find('td').eq(5).text(yjMoney-yhMoney);//欠费金额重置为实际应缴金额
	var qfMoney = Number(cftd.text());//欠费金额
	//先得到这是第几个费用种类，即支付方式的index
	var indexCount = trObj.find('td').eq(4).find("i").data("index");
	//支付方式清空还原到初始化状态
	trObj.find('td').eq(4).html('<div class="payment addPayment">'
	        + ' <div class="col-sm-5" >'
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
	        + '     <input class="form-control zjsjflag" ondblclick="childDbclick(this)" isat="1" onkeyup="childSshj(this)" type="text" placeholder="0" >'
	        + '	    <input type="hidden" name="childPayFees.payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
	        + ' </div>'
	        + '<div class="col-sm-2">'
	        + '<i onclick="addChildRowPay(this)" data-index="'+indexCount+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
	        + '</div>'
	        + '</div>');//还原支付方式
   //计算总计，合计的应缴，实缴，欠费
   //yjCalcu();
	childFlushYHZK();//实际更新页面金额
}

//子产品服务类型复选框单击事件
function childServiceCli(obj) {
	var service =  $(obj).data("value");//服务id
	//获得当前复选框的选中状态，如果要取消选中状态，则需要移除拼接在缴费信息里的服务费用
	 
	var checkFlag = $(obj).prop("checked");
	if(!checkFlag) {//取消选中
		//移除之前拼接在缴费信息里的该服务费用
		$("#child"+service).remove();
		return;
	}
	var name = $(obj).data("name");//得到费用类型名称
	var price = $(obj).data("money");//得到费用种类金额
	var code = $(obj).data("code");//得到费用编码
	var moneyLine = $(obj).data("moneyline");//得到费用金额下限
	var serviceEnable = $(obj).data("enable");//得到费用下限是否锁定
	var expensesType = $(obj).data("type");//得到费用类型-收益，支出
	var codeId = $(obj).data("codeid");//得到费用种类id即code_id
	//全部费用类型总数-支出费用类型总数=该服务费的索引
	var indexCount = $("#appendChildPayBody").find("tr.appendDiv").length-$("#appendChildPayBody").find("tr.zhiChu").length;
	if(indexCount==null || typeof(indexCount)=="undefined") {
		toastr.error("缴费信息下没有配置费用，所以无法追加服务费")
		return
	} else {
		//indexCount = indexCount - 1;
	}
	//拼接费用行-插入到合计的前面，基本缴费类型的后面
	$('#childHjDiv').before('<tr class="appendDiv" id="child'+service+'">'
			+ ' <td>' + name + '</td>'
			+ '<td>' 
			+  price //产品应缴
			+ '</td>'
			+ '<td id="' + code + '" data-value="'+moneyLine+'" data-value2="'+price+'" data-value3="'+serviceEnable+'" data-value4="'+expensesType+'" >'
			+  price //实际应缴
			+ '</td>'
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].payValue" value="'+ price +'"/>'//用来存储原始应缴值
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].yjValue" value="'+price+'" class="payCompYJ"/>'//用来存储实际应缴值，初始值为产品应缴值
			+ '<input type="hidden" name="childPayFees.payList['+indexCount+'][payCode]" class="payCode" value="'+code+'"/>'
			+ '<input type="hidden" name="childPayFees.payList['+indexCount+'][payCodeId]" class="payCodeId" value="'+codeId+'"/>'
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].payCode" value="'+code+'"/>'
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].payCodeId" value="'+codeId+'"/>'
			+ '<input type="hidden" name="childPayFees.payList['+indexCount+'][payName]" class="payName" value="'+name+'"/>'
			+ '<input type="hidden" name="childPayFees.payList['+indexCount+'][isNeIf]" value="'+expensesType+'"/>'//收入或者支出，1收入，2支出
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].isNeIf" value="'+expensesType+'"/>'//收入或者支出，1收入，2支出
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].payName" value="'+name+'"/>'
			//下面是优惠部分参数
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].activityCode" class="activityCode" value=""/>'//优惠码id
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].activityValue" class="activityValue" value=""/>'//优惠码金额
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].discount" class="discount" value=""/>'//折扣id
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].discountValue" class="discountValue" value=""/>'//折扣金额
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].integral" class="integral" value=""/>'//积分id
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].integralValue" class="integralValue" value=""/>'//积分数值
			//所属的服务的id
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].serviceId" class="serviceId" value="'+service+'"/>'//积分数值
			+ '<td id="' + code + '_value">'
			+ 0//实缴费
			+ '</td>'
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
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
			+ '     <input ondblclick="childDbclick(this)" class="form-control zjsjflag" onkeyup="childSshj(this)" type="text" placeholder="0" >'
			+ '	    <input type="hidden" name="childPayFees.payList['+indexCount+'][payValue&Form]" class="payValueForm" value=""/>'
			+ ' </div>'
			+ '<div class="col-sm-2">'
			+ '<i onclick="addChildRowPay(this)" data-index="'+indexCount+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
			+ '</div>'
			+ '</div>'
			+ '</td>'
			+ '<td class="zjcfflag">'
			+ price
			+ '</td>'
			+ '<input type="hidden" name="childPayComp.payCompList['+indexCount+'].cfValue" class="payCompCF" value="'+price+'"/>'//用来存储欠费值,初始值为产品应缴值
			+ '</tr>');
	
	//拼接玩费用种类后，需要再调用一次优惠折扣计算方法，更新一下页面当前缴费种类下的金额（应为服务费也可能在优惠范围内)
	childFlushYHZK();
}

//转报名-费用部分相关计算-双击自动填充应缴费用金额
function childDbclick(e) {
	//每行费用实际应缴金额
	var yjValue = $(e).parents('tr').children('td').eq(2).text();
	//每行费用实缴金额
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
	//更新每行实缴部分金额
  $(e).parents('tr').children('td').eq(3).text(yjValue);
  //更新每行当前操作金额框金额
  $(e).val(yjValue-sjValue);
//更新每行实缴金额
  $(e).parents('tr').children('td').eq(3).text(yjValue);
//更新每行欠费金额
  $(e).parents('tr').children('td').eq(5).text(0);
  
//更新当前费用种类实缴金额下隐藏input框作为传递给后台的数据
  $(e).parents('tr').find("input.payCompYJ").val($(e).parents('tr').children('td').eq(2).text()); //当前费用实际应缴金额
  $(e).parents('tr').find("input.payCompSJ").val($(e).parents('tr').children('td').eq(3).text()); //当前费用实缴金额
  $(e).parents('tr').find("input.payCompCF").val(0);//更新为每行下隐藏的需要提交给后台计算的欠费
//调用子产品实时合计	 
  childSshj(e);
}

/**
 * 子产品实时计算
 * @param e
 * @returns
 */
function childSshj(e) {
    var num = Number($(e).val());//当前输入金额
    if (!num || num <= 0) {
        toastr.error("请输入正确的付款金额，不能为0或负数！");
        $(e).val(null);
      //重新计算该费用下支付方式下有效的金额总和
    	sum = 0;//支付方式栏下所有输入金额总和
	    //定位到支付方式下所有的支付input总和sum
	    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
	        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
	    });
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
    childHheji();
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

//费用列表计算合计
function childHheji() {
//    var zj = $('#childHjYJ').text();//合计产品应缴
//    var hj = $('#childHjprice').text();//合计实际应缴
    //var yh = 0;//优惠
    var sjhj = 0;//实缴合计
    var cfhj = 0;//欠费合计
    var lss = 0;//每行实缴费用
    var jlid = '';//实缴td对象
    var cfid = '';//欠费td对象
    var proYJhj = 0;//产品应缴合计
    var sjYJhj = 0;//实际应缴合计
    var proYJtd = '';//产品实缴td对象
    var sjYJtd = '';//实际应缴td对象
    //遍历前面所有缴费类型的实缴，欠费得到最终合计的实缴，欠费
    $('#appendChildPayBody').find('tr.appendDiv').each(function (i,e) {
        jlid = $(this).find('td').eq(3);//索引从0开始，第4个单元格，每行实缴td对象
        cfid = $(this).find('td').eq(5);//第6个单元格
         
        //剔除实缴合计的td对象
        if ($(jlid).attr('id') != "childSjhj" ) {
            lss = jlid.text();
            sjhj = sjhj + eval((lss != null && lss != '') ? lss : 0);
        }
        if ($(cfid).attr('id') != "childCfhj") {
            lss = cfid.text();
            cfhj = cfhj + eval((lss != null && lss != '') ? lss : 0);
        }
        
        proYJtd = $(this).find('td').eq(1);//索引从0开始，第2个单元格，每行产品应缴td对象
        sjYJtd = $(this).find('td').eq(2);//第3个单元格，每行实际应缴td对象
         
        //剔除实缴合计的td对象
        if ($(proYJtd).attr('id') != "childHjYJ" ) {
            lss = proYJtd.text();
            proYJhj = proYJhj + eval((lss != null && lss != '') ? lss : 0);
        }
        if ($(sjYJtd).attr('id') != "childHjprice") {
            lss = sjYJtd.text();
            sjYJhj = sjYJhj + eval((lss != null && lss != '') ? lss : 0);
        }
    })
    $('#childHjYJ').text(proYJhj);//合计产品应缴
    $('#childHjprice').text(sjYJhj);//合计实际应缴
    $('#childSjhj').text(sjhj);//合计实缴
    $('#childCfhj').text(cfhj);//合计欠费结果
    //欠费合计-控制下次缴费时间的展示
    if (cfhj > 0) {
        $('#appendChildPayTr').show();
    } else {
        $('#appendChildPayTr').hide();
    }
}

//转报名-费用部分相关处理js-添加新的缴费方式(有可能一次付款使用多种方式付款)-只适用于子产品
function addChildRowPay(e) {
	var list1Index = $(e).data("index");
	 
	//收益类型费用和服务类型费用参数名称一样，但是支出类型费用有点不同
	//判断该费用是否是支出类型费用，来区别构造支付方式和支付金额
	if($(e).hasClass("zhiChu")) {//是支出类型费用
		 $(e).parent().parent().parent().append('<div class="payment addPayment">'
			        + ' <div class="col-sm-5" >'
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
			        + '     <input ondblclick="childDbclick(this)" class="form-control zjsjflag" isat="1" onkeyup="childSshj(this)" type="text" placeholder="0" >'
			        + '	    <input type="hidden" name="childPayFees.payZhiChuList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
			        + ' </div>'
			        + '<div class="col-sm-2">'
			        + '  <i onclick="removeRowPay(this)" data-index="'+list1Index+'" class="fa fa-minus-circle danger control-label"></i>'
			        + '</div>'
			        + '</div>');
	} else {
		 $(e).parent().parent().parent().append('<div class="payment addPayment">'
			        + ' <div class="col-sm-5" >'
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
			        + '     <input ondblclick="childDbclick(this)" class="form-control zjsjflag" isat="1" onkeyup="childSshj(this)" type="text" placeholder="0" >'
			        + '	    <input type="hidden" name="childPayFees.payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
			        + ' </div>'
			        + '<div class="col-sm-2">'
			        + '  <i onclick="removeRowPay(this)" data-index="'+list1Index+'" class="fa fa-minus-circle danger control-label"></i>'
			        + '</div>'
			        + '</div>');
	}
}