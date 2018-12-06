//生成报名部分费用列表
function coursePayDiv(productExamTimeId) {
	//生成费用列表前先把订座时生成的费用列表清空-防止生成的标签的id冲突
    $('#appendPayBody').html("");
    //生成费用列表前先把上一次生成的费用列表清空
    $('#coursePayInfo').html("");
	var infoManageId = $("#infoManageId2").val();
	var price = 0;
	var dPrice = $("#dPrice").val();//订座费
	var infoManageId = $("#infoManageId2").val();//咨询id
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
    	    					+ '<div class="backValue" style="display:none;"></div>'
    	    					+ '<td id="' + data.list[i].code + '">'
    	    					//一下ajax是控制费用回显部分
//    	    					+ '<script type="text/javascript">'
//    	    					+ ' appendPayDivValue("'+infoManageId+'","'+data.list[i].code+'","'+dPrice+'","1");'
//    	    					+ '</script>'
    	    					//**************
    	    					+ data.list[i].sjValue
    	    					+ '</td>'
    	    					+ ' <td><div class="payment">'
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
    	    					//+ '<td class="zjcfflag">'+data.list[i].price+'</td>'
    	    					+ '<td class="zjcfflag">'+(data.list[i].payValue - data.list[i].sjValue)+'</td>'
    	    					+ '</tr>');
        			} else {
        				//拼接费用行
    	    			$('#coursePayInfo').append('<tr class="payment">'
    	    					+ ' <td>' + data.list[i].name + '</td>'
    	    					+ ' <td class="zjyj">' + data.list[i].yjValue + '</td>'
    	    					+ '<div class="backValue" style="display:none;"></div>'
    	    					+ '<td id="' + data.list[i].code + '">'
    	    					//一下ajax是控制费用回显部分
//    	    					+ '<script type="text/javascript">'
//    	    					+ ' appendPayDivValue("'+infoManageId+'","'+data.list[i].code+'");'
//    	    					+ '</script>'
    	    					//**************
    	    					+ data.list[i].sjValue
    	    					+ '</td>'
    	    					+ ' <td><div class="payment">'
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
    	    					//+ '<td class="zjcfflag">'+data.list[i].price+'</td>'
    	    					+ '<td class="zjcfflag">'+data.list[i].cfValue+'</td>'
    	    					+ '</tr>');
        			}
	    			
        		  }
	        		//拼接最后的总计，优惠，折扣，合计
	        		$('#coursePayInfo').append('<tr>'
        	            + ' <td>总计</td>'
        	            + '<td id="zjprice">0</td>'
        	            + '<td id="zjsj">'
        	            //一下ajax是控制费用回显部分
//    					+ '<script type="text/javascript">'
//    					+ ' appendPayDivValue("'+infoManageId+'");'
//    					+ '</script>'
    					//**************
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
        	        $('#coursePayInfo').append('<tr>'
        	            + ' <td>优惠券</td>'
        	            + '<td>0</td>'
        	            + '<td id="yhqprice">'
        	            + isNull(data.list[0].activityValue)
        	            + '</td>'
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
        	            + '<td id="zjqf"></td>'
        	            + '</tr>');
        	        $('#coursePayInfo').append('<tr>'
        	            + ' <td>折扣</td>'
        	            + '<td>0</td>'
        	            + '<td id="zkprice">'
        	            + isNull(data.list[0].discountValue)
        	            + '</td>'
        	            + ' <td><div class="payment">'
        	            + '<div class="col-sm-4">'
        	            + '</div>'
        	            + '<div class="col-sm-5">'
        	            + '折扣只是针对培训费用的折扣比'
        	            + ' </div>'
        	            + '<div class="col-sm-3">'
        	            + '</div>'
        	            + '</div>'
        	            + '</td>'
        	            + '<td></td>'
        	            + '</tr>');
        	        $('#coursePayInfo').append('<tr>'
        	            + ' <td>合计</td>'
        	            + '<td id="hjprice">0</td>'
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
        	            + '<td class="cfhj" id="cfhj">0</td>'
        	            + '</tr>');
        	      //计算最终总计，合计的应缴，实缴，欠费
        	      hheji2();
//    	        hheji2('coursePayInfo','coursePayTr');
        		//toastr.success('操作完成');
        	}else{
            	//toastr.error(data.msg);//当前产品考期下不存在配置费用
            }
        }
    });
}


//计算最终总计，合计的应缴，实缴，欠费
function hheji2() {
	var yjValue = 0;//应缴
	var sjValue = 0;//实缴
	var cfValue = 0;//欠费
	  //遍历前面所有缴费类型的实缴，欠费得到最终总计，合计的应缴，实缴，欠费
	  $('#coursePayInfo').find('tr.payment').each(function (i,e) {
		  yjtd = $(this).find('td').eq(1);//第二个单元格，每行应缴td对象
	      sjtd = $(this).find('td').eq(2);//第三个单元格，每行实缴td对象
	      cftd = $(this).find('td').eq(4);//第五个单元格，每行欠费td对象
	      yjValue += Number(yjtd.text());
	      sjValue += Number(sjtd.text());
	      cfValue += Number(cftd.text());
	  });
	  //更新总计的应缴，实缴，欠费
	  $("#zjprice").text(yjValue);
      $("#zjsj").text(sjValue);
      $("#zjcf").text(cfValue);
       
      //更新合计的应缴，实缴，欠费
	  $("#hjprice").text(yjValue);
	  sjValue += Number($("#yhqprice").text())+Number($("#zkprice").text());//合计实缴还要加上优惠，折扣
      $("#sjhj").text(sjValue);
      $("#cfhj").text(yjValue-sjValue);//合计欠费
}
