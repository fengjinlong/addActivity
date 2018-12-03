function appendPayDiv(productExamTimeId, parentId) {
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
	var productId = $("#productId").val()//产品id
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv",
        "dataType": "json",
        "data": {
            productExamTimeId: productExamTimeId
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
        						+ '<td id="appendPayTd1" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'">' 
        						+ data.list[i].price 
        						+ '</td>'
        						+ '<input type="hidden" name="payCompList['+i+'].yjValue" class="payCompYJ"/>'//用来存储应缴值
        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<input type="hidden" name="payCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
        						+ '<td>'
        						+ dPrice
//        						+ '<input type="hidden" class="fixValue" value="'+dPrice+'"/>'//用来存储初始实缴值
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
        						//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" onkeyup="sshj(this)" value="'+dPrice+'" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-3">'
        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">' 
        						+ (data.list[i].price-dPrice) 
        						+ '<input type="hidden" name="payCompList['+i+'].cfValue" class="payCompCF"/>'
        						+ '</td>'
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
        	            + ' <td><label><input type="checkbox" onclick="yhzkCalcu(this)" data-type="yh" value=""/><span class="text">优惠券</span></label></td>'
        	            + '<td>0</td>'
        	            + '<td id="yhqprice">'
        	            + '</td>'
        	            //+ '<input type="hidden" name="payCompList['+count+'].activityCode" class="yhzkInput" disabled/>'
        	            + '<input type="hidden" name="activityCode" class="yhzkInput" disabled/>'
        	            + ' <td><div class="payment">'
        	            + '<div class="col-sm-4">'
        	            + '</div>'
        	            + '<div class="col-sm-5">'
        	            + ' <input id="activtyCodeValue" class="form-control" onkeyup="activtyCode(this)" type="text" placeholder="请输入8位优惠码" >'
        	            + ' <span class="control-label mandatory">*(填写修改优惠码前，请先保证优惠券前的复选框处于未选中状态)</span>'
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
        	        	if(data.status=='success') {
        	        		 for(var j=0; j<data.ZKList.length; j++) {//拼接折扣,考期的折扣可以配多个,满额返券是线下做，这里不处理
        	        				$('#'+parentId).append('<tr class="yhzk">'
        	        						+ ' <td><label><input type="checkbox" onclick="yhzkCalcu(this)" data-type="zk" value="'+data.ZKList[j].activityId+'"/><span class="text">'+data.ZKList[j].title+'</span></label></td>'
        	        						+ '<td>0</td>'
        	        						+ '<td class="zkprice">'
        	        						+ Number(price*(1-data.ZKList[j].discount)).toFixed(2)
        	        						+'</td>'//优惠了多少钱
        	        						//+ '<input type="hidden" name="payCompList['+count+'].discount" class="yhzkInput" value="'+Number(price*(1-data.ZKList[j].discount)).toFixed(2)+'" disabled/>'
        	        						+ '<input type="hidden" name="discountList['+j+']" class="yhzkInput" value="'+Number(price*(1-data.ZKList[j].discount)).toFixed(2)+'" disabled/>'
        	        						+ ' <td><div class="payment">'
        	        						+ '<div class="col-sm-4">'
        	        						+ '</div>'
        	        						+ '<div class="col-sm-5">'
        	        						+ '折扣只是针对培训费用的折扣比:'+data.ZKList[j].discount//优惠折扣
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
    	         		 toastr.success('操作完成');
        	        }
        		});
        	        
    	        //折扣
//    	        var zk = eval($('#selfYH2').val()==''?0:$('#selfYH2').val())+eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());
//    	        $('#zkprice').html(zk);//合计
    	        
//    	        hheji('appendPayBody','appendPayTr');//param1:费用列表父div的id,param2:下次缴费时间的id
//        		toastr.success('操作完成');
        	}else{
            	toastr.error(data.msg);
            }
        }
    });
}

//折扣计算
function zkCalcu() {
	var zkMoney = 0;//折扣金额
	$('#appendPayBody').find('tr.appendZK').each(function(index,obj) {
		zkMoney += Number($(obj).find("td.zkprice").text()) ;//统计折扣总额
	});
	
	//计算每行费用抵扣折扣结果，并且最终金额不能小于该种费用金额下限
	 $('#appendPayBody').find('tr.appendDiv').each(function (i,e) {
		 sjtd = $(this).find('td').eq(1);//索引从0开始，第二个单元格，每行应缴td对象
	     cftd = $(this).find('td').eq(4);//第五个单元格,每行欠费td对象
	      
	     var yjMoney = Number(sjtd.text());//应缴费用
	     var moneyLine = Number(sjtd.data("value"));//金额下限
	     var preferential = yjMoney-moneyLine;//可用于优惠的额度（应缴金额-金额下限)
	     var qfMoney = Number(cftd.text());//欠费金额
	     
	     if(preferential>=zkMoney) {//如果可用于优惠的额度>=折扣
	    	 sjtd.text(yjMoney-zkMoney);//用当前费用的应缴金额-折扣费用
	    	 cftd.text(qfMoney-zkMoney);//当前费用的欠费金额-折扣费用
	    	 return;
	     } else {
	    	 sjtd.text(moneyLine);//用当前费用的应缴金额=金额下限
	    	 cftd.text(qfMoney-preferential);//当前欠费=欠费金额-抵扣费用
	    	 zkMoney = zkMoney - preferential;//折扣去掉被抵消的部分
	     }
	 });
}

//费用列表计算合计
function hheji() {
    var zj = $('#zjprice').text();//总计
    var hj = $('#hjprice').text();//合计
    //var yh = 0;//优惠
    var sjhj = 0;//实缴合计
    var cfhj = 0;//欠费合计
    var lss = 0;//每行实缴费用
    var jlid = '';
    var cfid = '';
    //遍历前面所有缴费类型的实缴，欠费得到最终合计的实缴，欠费
    $('#appendPayBody').find('tr.appendDiv').each(function (i,e) {
        jlid = $(this).find('td').eq(2);//索引从0开始，第三个单元格，每行实缴td对象
        cfid = $(this).find('td').eq(4);//第五个单元格
         
        //剔除实缴合计，总计的td对象
        if ($(jlid).attr('id') != "sjhj" && $(jlid).attr('id') != "zjsj") {
            lss = jlid.text();
            sjhj = sjhj + eval((lss != null && lss != '') ? lss : 0);
        }
        if ($(cfid).attr('id') != "cfhj" && $(cfid).attr('id') != "zjcf") {
            lss = cfid.text();
            cfhj = cfhj + eval((lss != null && lss != '') ? lss : 0);
        }
    })
//    //优惠
//    if ($('.holidayPromo').is(':checked')) {
//        yh = $('#yhqprice').text();
//    }
    //折扣-旧版
    //var zk = $('#zkprice').text();
    //折扣-新版
//    var zk = 0;
//    $('.zkprice').each(function(index,obj){
//    	zk  += Number($(obj).text());
//    });
    
    //合计=总计-折扣-优惠
    //var hj = eval(zj - zk - yh);
    //合计=总计-优惠(折扣已在初始化时计算过)
    //var hj = eval(zj - yh);
    var hj = eval(zj);
    $('#hjprice').text(hj);//合计应缴
    $('#sjhj').text(sjhj);//合计实缴
    //欠费合计-控制下次缴费时间的展示
    if (cfhj > 0) {
        $('#appendPayTr').show();
    } else {
        $('#appendPayTr').hide();
    }
    
//    yh = yh==''?0:yh;//优惠
//    zk = zk==''?0:zk;//折扣
    
    //$('#cfhj').text(cfhj-yh-zk);//欠费-优惠-折扣//合计欠费结果
    //$('#cfhj').text(cfhj-yh);//欠费-优惠(折扣已在初始化时计算过)//合计欠费结果
    $('#cfhj').text(cfhj);//欠费-优惠(折扣已在初始化时计算过)//合计欠费结果
    
    //2017/11/22新增
    var sjValue = 0;
    //总计-实缴
    $(".zjsjflag").each(function(index, obj) {
    	var temp1 = $(obj).val();
    	sjValue += eval((temp1 != null && temp1 != '') ? temp1 : 0);
    });
    $('#zjsj').text(sjValue);//总计实缴
    //总计-欠费
    var cfValue = 0;
    $(".zjcfflag").each(function(index, obj) {
    	var temp2 = $(obj).text();
    	cfValue += eval((temp2 != null && temp2 != '') ? temp2 : 0);
    });
    $('#zjcf').text(cfValue);//总计欠费
    
}
//计算实缴金额
function bakdp(e){
	var sum = 0;
    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
    });
     
    return sum;
}

/**
 * 转报名部分-实时计算
 * @param e
 * @returns
 */
function sshj(e) {
    var num = Number($(e).val());//当前输入金额
    if (!num && num != 0) {
        toastr.error("请输入正确的付款金额，不能为负数！");
        $(e).val(0);
    }
    var dprice = $('#dPrice').val();//订座费
    //var dprice = $('#dingzuoI').val();//订座费
    //健壮性判断,防止前面步骤操作异常，订座费没有,导致向后台
	if(dprice==null || dprice=='' || typeof(dprice)=='undefined') {
		dprice = 0;
	} 
    if($(e).attr('sign')=='1'){//如果是报名费的支付方式的第一个input
    	if(num<Number(dprice)) {//如果当前输入金额小于已缴金额
    		toastr.error("输入的金额不能小于已缴费用！");
            $(e).val(dprice);
    	}
    }
    
    var sum = 0;//支付方式栏下所有输入金额总和
    //定位到支付方式下所有的支付input
    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
    });
    //var dprice = $('#dingzuoI').val();//订座费
   
//    dprice = dprice==''?0:dprice;
//    var a1 = eval($('#selfYH2').val()==''?0:$('#selfYH2').val());//优惠-集团
//	var a2 = eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());//优惠-分校
//    dprice = eval(dprice) + eval(a1) + eval(a2);
    
    var td = $(e).parents('tr').find('td').eq(1);//每行应缴金额td
    var yj = $(e).parents('tr').children('td').eq(1).text();//每行应缴金额
      
    $(e).parents('tr').children('td').eq(2).text(sum);//每行实缴部分金额
  //每行欠费部分计算
    if(td[0].id!='appendPayTd1'){//如果当前td不属于报名费
    	$(e).parents('tr').children('td').eq(4).text(yj - sum - dprice);
    } else {
    	$(e).parents('tr').children('td').eq(4).text(yj - sum);
    }
    
    //开始计算最后的合计内容
    hheji();
    //2017/11/23新增
    //为该input输入金额框下的隐藏input:payValue&Form赋值；——此处的费用类型，金额才是支付方式下需要提交的参数
    var payValue = $(e).val();
  //健壮性判断,防止前面步骤操作异常，订座费没有,导致向后台
	if(payValue==null || payValue=='' || typeof(payValue)=='undefined') {
		payValue = 0;
	} 
	 
    if($(e).attr('sign')=='1'){//如果是报名费的支付方式的第一个input
    	payValue = payValue - dprice;//还需要用报名费的第一个支付input的值减去订座费，才是需要提交给后台的报名费
    }
    
    if(payValue!=0) {//输入框内必须有金额才可以提交
    	var payForm = $(e).parent().parent().find("select :selected").val();
    	$(e).parent().find("input.payValueForm").val(payForm+"="+payValue);//再赋值缴费方式
    }
}

//转报名-费用部分相关处理js-添加新的缴费方式(有可能一次付款使用多种方式付款)
function addRowPay(e) {
	var list1Index = $(e).data("index");
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
        + '     <input class="form-control zjsjflag" isat="1" onkeyup="sshj(this)" type="text" placeholder="0" >'
        + '	    <input type="hidden" name="payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
        + ' </div>'
        + '<div class="col-sm-3">'
        + '  <i onclick="removeRowPay(this)" class="fa fa-minus-circle danger control-label"></i>'
        + '</div>'
        + '</div>');
}
function removeRowPay(e) {
    $(e).parent().parent().remove();
}
//转报名-费用部分相关计算-双击自动填充应缴费用金额
function dbclick(e) {
	//var dprice = $('#dingzuoI').val();
	var dprice = $('#dPrice').val();
	
	var td = $(e).parents('tr').find('td').eq(1);//每行应缴部分td对象
	td = td[0].id; 
	if(td=='appendPayTd1'){//如果该td是报名费的td
		var price = $(e).parents('tr').children('td').eq(1).text();//每行应缴部分金额
		   if(dprice!=null){//如果订座费不为空
			   $(e).parents('tr').children('td').eq(2).text(price);//报名费部分实缴金额
			   $(e).val(price);//报名部分支付方式当前操作框金额-展示的时候还是按照全额展示，后台提交时再去掉报名费
		   }else{
			   //每行实缴金额
			   $(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
			   //每行支付方式当前操作框金额
			   $(e).val($(e).parents('tr').children('td').eq(1).text());
		   }
	}else{//如果该td不属于报名费
		//每行实缴部分金额
		  $(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
		  //每行当前操作金额框金额
		  $(e).val($(e).parents('tr').children('td').eq(1).text());
	}
	 
    sshj(e);
}
////优惠券前的复选框未选中时才可以修改优惠码
//function activityCode2(e) {
//	var flag = $(e).prop("disabled");
//	if(flag) {
//		toastr.error("修改优惠码前，清闲取消优惠券前的复选框");
//	}
//}


/**
 * 优惠码校验-当输入的优惠码长度是8位时触发
 * @returns
 */
function activtyCode(e) {
	
    if (e.value.length == 8) {
        $.ajax({
            url: ctx + '/bizActivityCode/loadCode',
            type: 'POST',
            data: {
                code: $(e).val(),
                dept:$("#departmentId1Hidden").val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.length != 0) {
                    if (data[0].useStatus == "1") {
                        toastr.error("该优惠码已经被使用");
                    } else {
                        toastr.success("该优惠码可以使用，优惠金额：" + data[0].amount);
                        $('#yhqprice').text(data[0].amount);//优惠卷部分实缴金额
                        hheji();//实时合计
                    }
                } else {
                    toastr.error("优惠码不存在或该优惠码不属于产品归属分校");
                  //发生错误后要将实缴金额制为空
                	$('#yhqprice').text(0);//优惠卷部分实缴金额
                    hheji();//实时合计
                }
            }
        });
    } else {
        $('#yhqprice').text(0);
    }
}
//优惠部分复选框单击事件-优惠部分的计算，只将金额计算到第一个费用上，不能超过金额下限
function yhzkCalcu(obj) {
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
	if(checkFlag) {
		var yhzkMoney = Number($(obj).parents(".yhzk").find('td').eq(2).text());//优惠折扣金额
		var yjMoney = Number(yjtd.text());//应缴费用
	    var preferential = yjMoney-moneyLine;//可用于优惠的额度（应缴金额-金额下限)
	    //先判断，如果第一行优惠额度已达金额下限，不允许再勾选其它优惠
	    if(yjMoney==moneyLine) {
	    	toastr.error("优惠额度已达金额下限，无法再使用此优惠活动");
	    	$(obj).prop("checked",false);//重置复选框为未选中状态
	    	return;
	    }
		//再将第一个金额的实缴，支付方式清空还原到初始化状态
		trObj.find('td').eq(2).text(0);//实缴金额清空
		trObj.find('td').eq(4).text(yjMoney);//欠费金额重置为初始值
		var qfMoney = Number(cftd.text());//欠费金额
		trObj.find('td').eq(3).html('<div class="payment addPayment">'
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
		        + '     <input class="form-control zjsjflag" ondblclick="dbclick(this)" isat="1" onkeyup="sshj(this)" type="text" placeholder="0" >'
		        + '	    <input type="hidden" name="payList['+0+'][payValue&Form]" class="payValueForm" value=""/>'
		        + ' </div>'
		        + '<div class="col-sm-3">'
		        + '<i onclick="addRowPay(this)" data-index="'+0+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
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
		trObj.find('td').eq(2).text(0);//实缴金额清空
		trObj.find('td').eq(3).html('<div class="payment addPayment">'
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
		        + '     <input class="form-control zjsjflag" ondblclick="dbclick(this)" isat="1" onkeyup="sshj(this)" type="text" placeholder="0" >'
		        + '	    <input type="hidden" name="payList['+0+'][payValue&Form]" class="payValueForm" value=""/>'
		        + ' </div>'
		        + '<div class="col-sm-3">'
		        + '<i onclick="addRowPay(this)" data-index="'+0+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
		        + '</div>'
		        + '</div>');//还原支付方式
		//重新计算-应缴，欠费-已选中的优惠活动
		yjtd.text(yjtd.data("value2"));//先将应缴金额重置为原始金额
		cftd.text(yjtd.data("value2"));//将欠费金额重置为初始欠费金额
		 
		$('#appendPayBody').find('input[type="checkbox"]').each(function(index, object){
			if($(object).prop("checked")) {
				yhzkCalcu(object);
			}
			
//			var yjMoney = Number(yjtd.text());
//			var yhzkMoney = Number($(object).parents(".yhzk").find('td').eq(2).text());//优惠折扣金额
//			var preferential = yjMoney-moneyLine;//可用于优惠的额度（应缴金额-金额下限)
//			var qfMoney = Number(cftd.text());//欠费金额
//			//开始计算第一个金额的应缴（不能<金额下限），欠费
//		     if(preferential>=yhzkMoney) {//如果可用于优惠的额度>=优惠折扣
//		    	 yjtd.text(yjMoney-yhzkMoney);//用当前费用的应缴金额-优惠折扣费用
//		    	 cftd.text(qfMoney-yhzkMoney);//当前费用的欠费金额-优惠折扣费用
//		     } else {
//		    	 yjtd.text(moneyLine);//用当前费用的应缴金额=金额下限
//		    	 cftd.text(qfMoney-preferential);//当前欠费=欠费金额-抵扣费用
//		     }
		});
		
		//如果当前选中优惠类型是优惠券，取消该复选框时，还要修改优惠码输入框为可用状态
	     if(flag=="yh") {
	     	$(obj).parents(".yhzk").find('td').eq(3).find("input").prop("disabled",false);
	     }
	   //计算总计，合计的应缴
	     yjCalcu();
	}
}
	
//计算总计，合计的应缴
function yjCalcu() {
	//计算总计应缴
	var zjValue = 0;
	$('#appendPayBody').find('tr.appendDiv').each(function (i,e) {
		 //应缴费用整理
		 var yjtd = $(e).find('td').eq(1);//应缴td对象
		 zjValue += Number(yjtd.text());
	 });
	$("#zjprice").text(zjValue);
	//计算合计应缴
	$("#hjprice").text(zjValue);
}