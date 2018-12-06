//生成报名部分费用列表
function coursePayDiv(productExamTimeId) {
	//生成费用列表前先把订座时生成的费用列表清空-防止生成的标签的id冲突
    $('#appendPayBody').html("");
    //生成费用列表前先把上一次生成的费用列表清空
    $('#coursePayInfo').html("");
	var infoManageId = $("#infoManageId2").val();
	var price = 0;
	//var dPrice = $("#dPrice").val();//订座费
	var dPrice = 0;//订座费
	var infoManageId = $("#infoManageId2").val();//咨询id
	
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
            "payCode" :"code_reservation"
        },
        "success": function (data1) {
        	if(data1.status=='success'){
        		if(data1.data.payValue=='0') {//如果订座费为空，就不展示
        			$("#dztr2").hide();
        		} else {
        			$("#dztr2").show();
        		}
        		dPrice = data1.data.payValue;//订座费
        		$("#dztd2").text(data1.data.payValue);//订座费实缴费
        		$("#dingzuoS2").val(data1.data.payFrom);//订座费支付方式
        		$('#dingzuoS2').trigger('chosen:updated');//刷新加载一下chosen.js插件
        		$("#dingzuoI2").val(data1.data.payValue);//订座费支付金额
        		$('#dingzuoI2').trigger('chosen:updated');//刷新加载一下chosen.js插件
        		
        	} else {
        		$("#dztr2").hide();
        	}
        	 
        	$.ajax({
                "type": "Post",
                "url": ctx + "/consultConsoleSignUp/appendPayDiv",
                "dataType": "json",
                "data": {
                    "infoManageId": infoManageId
                },
                "success": function (data) {
                	if(data.status=='success'){
                		for(var i=0; i<data.list.length; i++) {
                			price = price + eval(data.list[i].price);
                			if(i==0) {
                				//拼接费用行
            	    			$('#coursePayInfo').append('<tr class="payment">'
            	    					+ ' <td>' + data.list[i].name + '</td>'
            	    					+ ' <td class="zjyj">' + data.list[i].payValue + '</td>'
            	    					//+ ' <td>' + data.list[i].yjValue + '</td>'
            	    					+ '<div class="backValue" style="display:none;"></div>'
            	    					+ '<td>'
            	    					+ (data.list[i].sjValue-dPrice)
            	    					+ '</td>'
            	    					//一下ajax是回显支付方式和支付金额
            	    					+ '<script type="text/javascript">'
            	    					+ ' findZhiFu("'+infoManageId+'","'+data.list[i].codeId+'");'
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
            	    					+ '<td class="zjcfflag">'+Math.round((data.list[i].payValue - data.list[i].sjValue))+'</td>'
            	    					+ '</tr>');
                			} else {
                				//拼接费用行
            	    			$('#coursePayInfo').append('<tr class="payment">'
            	    					+ ' <td>' + data.list[i].name + '</td>'
            	    					+ ' <td class="zjyj">' + data.list[i].payValue + '</td>'//不能再用yjValue,因为不能肯定优惠一定是算在第一种费用上
            	    					+ '<div class="backValue" style="display:none;"></div>'
            	    					+ '<td>'
            	    					+ data.list[i].sjValue
            	    					+ '</td>'
            	    					//一下ajax是回显支付方式和支付金额
            	    					+ '<script type="text/javascript">'
            	    					+ ' findZhiFu("'+infoManageId+'","'+data.list[i].codeId+'");'
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
            	    					+ '<td class="zjcfflag">'+Math.round((data.list[i].payValue - data.list[i].sjValue))+'</td>'
            	    					+ '</tr>');
                			}
                		  }//费用列表for循环结束
                		//拼接最后的总计，优惠，折扣，合计
    	        		$('#coursePayInfo').append('<tr>'
            	            + ' <td>总计</td>'
            	            + '<td id="zjprice">0</td>'
            	            + '<td id="zjsj">'
            	            + '0</td>'
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
            	            + '<td id="zjcf">0</td>'
            	            + '</tr>');
	    	        	//构造优惠券	
	    	        	if(data.listYH!=null) {
	    	        		for(var j=0; j<data.listYH.length; j++) {
	    	        			$('#coursePayInfo').append('<tr class="yhqprice">'
	    	        					+ ' <td>优惠券</td>'
	    	        					+ '<td>0</td>'
	    	        					+ '<td>'
	    	        					+ isNull(data.listYH[j].activityValue)
	    	        					+ '</td>'
	    	        					+ ' <td><div class="payment">'
	    	        					+ '<div class="col-sm-4">'
	    	        					+ '</div>'
	    	        					+ '<div class="col-sm-5">'
	    	        					+ ' <input disabled value="'+data.listYH[j].activityCode+'" class="form-control" type="text">'
	    	        					+ ' </div>'
	    	        					+ '<div class="col-sm-3">'
	    	        					+ '</div>'
	    	        					+ '</div>'
	    	        					+ '</td>'
	    	        					+ '<td id="zjqf"></td>'
	    	        					+ '</tr>');
	    	        		}
	    	        	}
	    	        	//构造折扣	
	    	        	if(data.listZK!=null) {
	    	        		for(var k=0; k<data.listZK.length; k++) {
	    	        			 $('#coursePayInfo').append('<tr class="zkprice">'
	    	                	            + ' <td>折扣</td>'
	    	                	            + '<td>0</td>'
	    	                	            + '<td>'
	    	                	            + isNull(data.listZK[k].discountValue)
	    	                	            + '</td>'
	    	                	            + ' <td><div class="payment">'
	    	                	            + '<div class="col-sm-4">'
	    	                	            + '</div>'
	    	                	            + '<div class="col-sm-5">'
	    	                	            + '折扣比:'+data.listZK[k].discount
	    	                	            + ' </div>'
	    	                	            + '<div class="col-sm-3">'
	    	                	            + '</div>'
	    	                	            + '</div>'
	    	                	            + '</td>'
	    	                	            + '<td></td>'
	    	                	            + '</tr>');
	    	        		}
	    	        	}
            	        $('#coursePayInfo').append('<tr>'
            	            + ' <td>合计</td>'
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
	var yjValue = 0;//应缴
	var sjValue = 0;//实缴
	var cfValue = 0;//欠费
	var dPrice = isNull($("#dPrice").val());//订座费-isNull为空或者没有返回0
	  //遍历前面所有缴费类型的实缴，欠费得到最终总计，合计的应缴，实缴，欠费
	  $('#coursePayInfo').find('tr.payment').each(function (i,e) {
		  yjtd = $(this).find('td').eq(1);//第二个单元格，每行应缴td对象
	      sjtd = $(this).find('td').eq(2);//第三个单元格，每行实缴td对象
	      cftd = $(this).find('td').eq(4);//第五个单元格，每行欠费td对象
	      yjValue += Number(yjtd.text());
	      sjValue += Number(sjtd.text());
	      cfValue += Number(cftd.text());
	  });
	  sjValue = Number(sjValue)+Number(dPrice);//实缴费用最终要算上订座费
	  //更新总计的应缴，实缴，欠费
	  $("#zjprice").text(yjValue);
      $("#zjsj").text(sjValue);
      $("#zjcf").text(cfValue);
        
      //更新合计的应缴，实缴，欠费
      //合计的应缴要减去优惠，折扣抵消的金额
      $('#coursePayInfo').find('tr.yhqprice').each(function(i,e){
    	  yjValue -= Number($(this).find('td').eq(2).text());//第三个单元格，优惠券金额
      });
      $('#coursePayInfo').find('tr.zkprice').each(function(i,e){
    	  yjValue -= Number($(this).find('td').eq(2).text());//第三个单元格，折扣金额
      });
	  $("#hjprice").text(yjValue);
      $("#sjhj").text(sjValue);
      
      $("#cfhj").text(Math.round(Number(yjValue-sjValue)));//合计欠费
}

//根据咨询量id，费用编码-查询支付方式和支付金额
function findZhiFu(infoManageId, payCodeId) {
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultConsoleSignUp/findZhiFu",//查询每种费用类型支付方式和支付金额
        "dataType": "json",
        "data": {
            "infoManageId": infoManageId,
            "payCodeId" :payCodeId
        },
        "success": function (data) {
        	if(data.status=='success'){
        		if(data.list.length!=0) {
        			$("#"+payCodeId).html("");//清空支付方式列的内容
        			var tempStr = "";
        			for(var i=0; i<data.list.length; i++) {
        				tempStr = '<div class="payment">'
            					+ '<div class="col-sm-4">'
            					+ '   <select class="form-control" disbaled>';
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