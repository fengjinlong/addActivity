////考期变换-生成费用选项
//$("#updateInfoManageCTB2").find('select.kTime').chosen().change(function () {
////    var productExamTimeId = $(this).val();//产品考期ID
//    appendPayDivCTB();
//});

//构造缴费信息-拼接收益费用
//function appendPayDiv() {
//	//生成费用列表前先把上一次生成的费用列表清空
//	$("#updateInfoManageCTB2").find('.payFees').html("");
//	var price = 0;//用来计算总计应缴金额
//	var productId = $("#updateInfoManageCTB").find("select.productId").val()//产品id
//	var departmentId1 = $("#updateInfoManageCTB").find("select.departmentId1").val();//分校id
//	 
//	//查询收益费用
//	$.ajax({
//        "type": "Post",
//        "url": ctx + "/consultBookingSeats/appendPayDiv?x="+(new Date()).valueOf(),
//        "dataType": "json",
//        "data": {
//            examTimeId: examTimeId,
//            productId:productId,
//            departmentId1:departmentId1,
//            expensesType:2//费用类型-收益
//        },
//        "success": function (data) {
//        	if(data.status=='success'){
//        		for(var i=0; i<data.list.length; i++) {
//        			//如果是第一个费用，这块要算上订座费
//        			if(i==0) {
//        					//拼接费用行
//        				$("#updateInfoManageCTB2").find('.payFees').prepend('<tr class="appendDiv firstDiv">'
//            						+ '<td>' + data.list[i].name + '</td>'
//            						+ '<td>' 
//            						+ data.list[i].price //产品应缴
//            						+ '</td>'
//            						//data-value中的值一次是金额下限，原始应缴值，是否锁定
//            						+ '<td data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'">' 
//            						+ data.list[i].price //实际应缴
//            						+ '</td>'
//            						+ '<input type="hidden" name="payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储产品应缴值
//            						+ '<input type="hidden" name="payCompList['+i+'].yjValue" value="'+data.list[i].price+'" class="payCompYJ"/>'//用来存储实际应缴值,初始值为产品应缴值
//            						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
//            						+ '<input type="hidden" name="payList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
//            						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
//            						+ '<input type="hidden" name="payCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
//            						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
//            						+ '<input type="hidden" name="payList['+i+'][isNeIf]" class="isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
//            						+ '<input type="hidden" name="payCompList['+i+'].isNeIf" class="isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
//            						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
//            						//下面是优惠部分参数
//            						+ '<input type="hidden" name="payCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
//            						+ '<input type="hidden" name="payCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
//            						+ '<input type="hidden" name="payCompList['+i+'].discount" class="discount" value=""/>'//折扣id
//            						+ '<input type="hidden" name="payCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
//            						+ '<input type="hidden" name="payCompList['+i+'].integral" class="integral" value=""/>'//积分id
//            						+ '<input type="hidden" name="payCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
//            						+ '<td>'
//            						+ 0
//            						+ '</td>'
//            						+ '<input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
//            						+ ' <td>'
//            						+ '<div class="payment">'
//            						+ '<div class="col-sm-5">'
//            						+ '   <select class="form-control" >'
//            						+ '		<option value="1">现金</option>'
//            						+ '        <option value="2">刷卡</option>'
//            						+ '        <option value="3">支票</option>'
//            						+ '        <option value="4">汇款-微信</option>'
//            						+ '        <option value="5">汇款-支付宝</option>'
//            						+ '        <option value="6">汇款-网络</option>'
//            						+ '        <option value="7">银行转账</option>'
//            						+ '        <option value="8">分期</option>'
//            						+ '    </select>'
//            						+ '</div>'
//            						+ '<div class="col-sm-5">'
//            						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" onkeyup="sshj(this)" type="text" placeholder="0" >'
//            						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
//            						+ ' </div>'
//            						+ '<div class="col-sm-2">'
//            						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa fa-plus-circle payment-btn blue control-label"></i>'
//            						+ '</div>'
//            						+ '</div>'
//            						+ '</td>'
//            						+ '<td class="zjcfflag">' 
//            						+ data.list[i].price
//            						+ '</td>'
//            						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴
//            						+ '</tr>');
//        			} else {
//        				//拼接费用行
//        				$("#updateInfoManageCTB2").find('.payFees').append('<tr class="appendDiv">'
//        						+ ' <td>' + data.list[i].name + '</td>'
//        						+ '<td>' 
//        						+ data.list[i].price //产品应缴
//        						+ '</td>'
//        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'" >'
//        						+ data.list[i].price //实际应缴
//        						+ '</td>'
//        						+ '<input type="hidden" name="payCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储产品应缴值
//        						+ '<input type="hidden" name="payCompList['+i+'].yjValue" class="payCompYJ" value="'+data.list[i].price+'"/>'//用来存储实际应缴值,初始值为产品应缴值
//        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
//        						+ '<input type="hidden" name="payList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
//        						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
//        						+ '<input type="hidden" name="payCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
//        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
//        						+ '<input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
//        						+ '<input type="hidden" name="payCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
//        						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
//        						//下面是优惠部分参数
//        						+ '<input type="hidden" name="payCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
//        						+ '<input type="hidden" name="payCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
//        						+ '<input type="hidden" name="payCompList['+i+'].discount" class="discount" value=""/>'//折扣id
//        						+ '<input type="hidden" name="payCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
//        						+ '<input type="hidden" name="payCompList['+i+'].integral" class="integral" value=""/>'//积分id
//        						+ '<input type="hidden" name="payCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
//        						+ '<td id="' + data.list[i].code + '_value">'
//        						+ 0//实缴费
//        						+ '</td>'
//        						+ '<input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值, 初始值为0
//        						+ ' <td><div class="payment">'
//        						+ '<div class="col-sm-5">'
//        						+ '   <select class="form-control" >'
//        						+ '		<option value="1">现金</option>'
//        						+ '        <option value="2">刷卡</option>'
//        						+ '        <option value="3">支票</option>'
//        						+ '        <option value="4">汇款-微信</option>'
//        						+ '        <option value="5">汇款-支付宝</option>'
//        						+ '        <option value="6">汇款-网络</option>'
//        						+ '        <option value="7">银行转账</option>'
//        						+ '        <option value="8">分期</option>'
//        						+ '    </select>'
//        						+ '</div>'
//        						+ '<div class="col-sm-5">'
//        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" onkeyup="sshj(this)" type="text" placeholder="0" >'
//        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
//        						+ ' </div>'
//        						+ '<div class="col-sm-2">'
//        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
//        						+ '</div>'
//        						+ '</div>'
//        						+ '</td>'
//        						+ '<td class="zjcfflag">'
//        						+ data.list[i].price
//        						+ '</td>'
//        						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值, 初始值为产品应缴值
//        						+ '</tr>');
//        			}
//        		}
//        		 
//        		//拼接最后的总计，优惠，折扣，合计
//        		 //循环结束，拼接合计
//        		$("#updateInfoManageCTB2").find('.payFees').append('<tr>'
//           	            + ' <td>合计</td>'
//           	            + '<td >0</td>' //合计产品应缴
//           	            + '<td >0</td>' //合计实际应缴
//           	            + '<td class="sjhj" >0</td>' //合计实缴
//           	            + ' <td><div class="payment">'
//           	            + '<div class="col-sm-5">'
//           	            + '</div>'
//           	            + '<div class="col-sm-5">'
//           	            + ' '
//           	            + ' </div>'
//           	            + '<div class="col-sm-2">'
//           	            + '</div>'
//           	            + '</div>'
//           	            + '</td>'
//           	            + '<td >0</td>'
//           	            + '</tr>');
//          		 
//          		 hhejiCTB();//合计
//    			//考期change触发收益拼接事件后，触发考试地区的下拉选change事件
//    			branchSchoolChangeCTB();
//    		
//        		//先移除主产品下之前构造的服务费用
//    			$("#updateInfoManageCTB2").find(".payFees .serviceFees").remove();
//        		//生成服务费复选框
//        		$.ajax({
//        	        "type": "Post",
//        	        "url": ctx + "/consultBookingSeats/appendServiceFees",//查询服务费用
//        	        "dataType": "json",
//        	        "data": {
//        	        	productExamTimeId: productExamTimeId,//产品考期id
//        	        	departmentId1:departmentId1,//分校id，信息量归属地
//        	        },
//        	        "success": function (data3) {
//        	        	if(data3.status=='success'){
//        	        		var tempStr = '<div class="form-group col-lg-12 col-md-12 col-sm-12 serviceFees">'
//        	        			+ '<label style="margin-left: -70px !important;" class="col-sm-2 col-lg-2 control-label no-padding-right">服务类型：</label>';
//        	        		//开始构造复选框内容
//        	        		for(var x=0; x<data3.serviceList.length; x++) {
//        	        			//data-codeId:费用种类codeId, data-required:服务是否必选，data-money：费用金额
//        	        			//data-moneyLine:费用种类下限，data-enable：下限是否锁定， data-code：费用种类编码
//        	        			//data-name:费用种类名称，data-type：费用类型-收益支出，data-value:服务id
//        	        			
//        	        			//判断是否必选1-是 0-否，如果是，该服务费默认勾选，并且不允许更改
//        	        			if(data3.serviceList[x].isRequired=="1") {
//        	        				tempStr += '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
//        	                			+ '	 <label>'
//        	        					+ '	    <input type="checkbox" checked disabled name="service" class="service" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
//        	        					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
//        	        					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
//        	        					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
//        	        					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
//        	        					+ '  </label>'	
//        	        					+ '</div>';
//        	        			} else {
//        	        				tempStr += '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
//        	                			+ '	 <label>'
//        	        					+ '	    <input type="checkbox" onclick="serviceCli(this)" name="service" class="service" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
//        	        					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
//        	        					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
//        	        					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
//        	        					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
//        	        					+ '  </label>'	
//        	        					+ '</div>';
//        	        			}
//        	        		}
//        	        		
//        	        		tempStr += '</div>';
//        	        		$("#updateInfoManageCTB2").find("select.branchSchoolId").parent().parent().after(tempStr);
//        	        		
//        	        		//遍历页面上必选的服务，把服务费用拼接到后面
//        	        		$("#updateInfoManageCTB2").find('.projectCTB').find("input[type='checkbox'].service").each(function(i,e){
//        	        			var required = $(e).data("required");//得到该服务是否必选
//        	        			//判断是否必选1-是 0-否，如果是，该服务费默认勾选，并且不允许更改
//        	        			if(required=='1') {
//        	        				//是必选
//        	        				//触发服务类型复选框单击事件
//        	        				serviceCliCTB(e);
//        	        			}
//        	        		});
//        	        	}
//        	        },
//        	        "error":function() {
//        	        	toastr.error("查询服务费用后台出错");
//        	        }
//        		});
//        	}else{
//            	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
//            }
//        }
//    });
//}