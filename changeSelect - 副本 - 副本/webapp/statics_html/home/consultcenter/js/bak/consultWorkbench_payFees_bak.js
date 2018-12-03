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
        			//如果费用类型是报名费，实缴费这块要算上订座费
        			if(data.list[i].code=="code_sign") {
        				//拼接费用行
        				$('#'+parentId).append('<tr class="appendDiv">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td id="appendPayTd1" data-value="'+data.list[i].moneyLine+'">' + data.list[i].price + '</td>'
        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<td>'
        						+ dPrice
        						+ '<input type="hidden" class="fixValue" value="'+dPrice+'"/>'//用来存储初始实缴值
        						+ '</td>'
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
        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" sign="1" onkeyup="sshj(this)" value="'+dPrice+'" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-3">'
        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">' + (data.list[i].price-dPrice) + '</td>'
        						+ '</tr>');

        			} else {
        				//拼接费用行
        				$('#'+parentId).append('<tr class="appendDiv">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'">' + data.list[i].price + '</td>'
        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<td id="' + data.list[i].code + '_value">'
        						+ '</td>'
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
        						+ '<td class="zjcfflag">' + data.list[i].price + '</td>'
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
        		$('#'+parentId).append('<tr>'
        	            + ' <td><label><input type="checkbox" value=""/><span class="text">优惠券</span></label></td>'
        	            + '<td>0</td>'
        	            + '<td id="yhqprice"></td>'
        	            + ' <td><div class="payment">'
        	            + '<div class="col-sm-4">'
        	            + '</div>'
        	            + '<div class="col-sm-5">'
        	            + ' <input id="activtyCodeValue" class="form-control" onkeyup="activtyCode(this)" type="text" placeholder="请输入8位优惠码" >'
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
        	        		 for(var i=0; i<data.ZKList.length; i++) {//拼接折扣,考期的折扣可以配多个,满额返券是线下做，这里不处理
        	        				$('#'+parentId).append('<tr class="appendZK">'
        	        						+ ' <td><label><input type="checkbox" value="'+data.ZKList[i].activityId+'"/><span class="text">'+data.ZKList[i].title+'</span></label></td>'
        	        						+ '<td>0</td>'
        	        						+ '<td class="zkprice">'+Number(price*(1-data.ZKList[i].discount)).toFixed(2)+'</td>'//优惠了多少钱
        	        						+ ' <td><div class="payment">'
        	        						+ '<div class="col-sm-4">'
        	        						+ '</div>'
        	        						+ '<div class="col-sm-5">'
        	        						+ '折扣只是针对培训费用的折扣比:'+data.ZKList[i].discount//优惠折扣
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

$(".paymentTime").datetimepicker({
  language: 'zh',
  format: 'yyyy-mm-dd hh:ii:ss',
  autoclose: true,
  startDate: new Date()
})

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
	     debugger;
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
    var yh = 0;//优惠
    var sjhj = 0;//实缴合计
    var cfhj = 0;//欠费合计
    var lss = 0;//每行实缴费用
    var jlid = '';
    var cfid = '';
    //遍历前面所有缴费类型的实缴，欠费得到最终合计的实缴，欠费
    $('#appendPayBody').find('tr').each(function (i,e) {
        jlid = $(this).find('td').eq(2);//索引从0开始，第三个单元格，每行实缴td对象
        cfid = $(this).find('td').eq(4);//第五个单元格
        debugger;
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
    //优惠
    if ($('.holidayPromo').is(':checked')) {
        yh = $('#yhqprice').text();
    }
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
    var hj = eval(zj - yh);
    $('#hjprice').text(hj);//合计应缴
    $('#sjhj').text(sjhj);//合计实缴
    //欠费合计-控制下次缴费时间的展示
    if (cfhj > 0) {
        $('#appendPayTr').show();
    } else {
        $('#appendPayTr').hide();
    }
    
    yh = yh==''?0:yh;//优惠
//    zk = zk==''?0:zk;//折扣
    
    //$('#cfhj').text(cfhj-yh-zk);//欠费-优惠-折扣//合计欠费结果
    $('#cfhj').text(cfhj-yh);//欠费-优惠(折扣已在初始化时计算过)//合计欠费结果
    
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
    //var dprice = $('#dPrice').val();//订座费
    var dprice = $('#dingzuoI').val();//订座费
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
