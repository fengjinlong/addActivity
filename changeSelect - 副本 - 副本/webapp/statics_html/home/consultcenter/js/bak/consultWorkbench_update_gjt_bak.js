// 状态流转--------------------------
/**
 * 转订座
 * @returns
 */
function dingzuo(){
	var ktime = $('#kTime').val();
	$('#kTimeValue').val($('#kTime').find('option:selected').text());
	if(ktime==null||ktime==''){ 
		toastr.error('添加考期');
		return;
	}
    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
    $('#dPrice').val($('#dingzuoI').val());
    var sjhj = $('#dingzuoI').val();
    /*if (sjhj == '0' || sjhj == '') {
        toastr.error('添加费用金额');
        return;
    }*/
    var nextPayTime = $('#nextPayTime').val();
	/*if(nextPayTime==null||nextPayTime==''){
		 toastr.error("下次缴费时间为空");
		 return ;
	}*/
    $('#status2').val(6);
}

/**
 * -转上门
 * 添加上门未报名原因
 * @returns
 */
function dropFalse() {
    var content = getNowFormatDate() + ":" + $('#dropFalseContent').val();
    var infoManageId = $('#infoManageId2').val();
    var reciveId2 = $('#reciveId2').val();
    if(reciveId2==null||reciveId2=='00000'||reciveId2==""){
    	toastr.error('请添加接待人员');
    	return ;
    }
    $.ajax({
        "type": "Post",
        "url": ctx + "/consultInfoManageServer/toDropFalse",
        "dataType": "json",
        "data": {
            infoManageId: infoManageId,
            dropDate:new Date(),
            status: 5,
            oldStatus:4,
            content:content
        },
        "success": function (data) {
        	if(data.status=='success'){
        		toastr.success('操作完成');
//                init();
//                init3();
//                init4();
                init5();
                $('#addSecondDiv').modal('hide');
                $('#dropModelDiv').modal('hide');
        	}else{
            	toastr.error(data.msg);
            }
        }
    });
}

/**
 * 订座表单修改
 * @returns
 */
function dingzuoUpdateForm(){
	
	var ktime = $('#kTime').val();
	$('#kTimeValue').val($('#kTime').find('option:selected').text());
	if(ktime==null||ktime==''){ 
		toastr.error('添加考期');
		return;
	}
    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
    $('#dPrice').val($('#dingzuoI').val());
    //产品名称回显
    $('#productName').val($('#productId').find(':selected').text());
//    //订座费缴费金额
//    var payFrom = $('#dingzuoI').val();
//    if (payFrom == '0' || payFrom == '') {
//        toastr.error('添加费用金额');
//        return;
//    }
    var nextPayTime = $('#nextPayTime').val();
	/*if(nextPayTime==null||nextPayTime==''){
		 toastr.error("下次缴费时间为空");
		 return ;
	}*/
	
	var options = $("#updateInfoManage2").serialize();
    options += "&status=6";//状态码：6-订座
    
	//订座费缴费方式
	var payValue = $('#dingzuoS').find(':selected').text();
	var bool = false;
	
	$.ajax({
        //url: ctx + '/consultInfoManage/updateRecordForDingZuo',
        url: ctx + '/consultBookingSeats/updateRecordForDingZuo',
        type: 'POST',
        data: options,
        async: false,
        dataType: 'json',
        success: function (data) {
           if(data.status=='success'){
        	   bool = true;
        	   $('#myTab11').find('li.active a').click();
           }else{
           		toastr.error(data.msg);
           }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	return bool;
}


/**
 * 报名表单修改
 * @returns
 */
function baomingUpdateForm(){
	var bool = false;
	var ktime = $('#kTime').val();
	$('#kTimeValue').val($('#kTime').find('option:selected').text());
	
	if(ktime==null||ktime==''){ 
		toastr.error('添加考期');
		return;
	}
//    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
//    $('#dPrice').val($('#dingzuoI').val());
//    var sjhj = $('#dingzuoI').val();
//    if (sjhj == '0' || sjhj == '') {
//        toastr.error('添加费用金额');
//        return;
//    }
    
	var a1 = $('#sjhj').text();//合计实缴
	var a2 = $('#hjprice').text();//合计应缴
	if(a2-a1<0){
		toastr.error("应缴费用总和小于实际费用");
		return ;
	}
    
	var cfhj = $('#cfhj').text();
	//如果有欠费才会判断下次缴费时间
	if(eval(cfhj)>0) {
		var nextPayTime = $('#nextPayTime').val();
		if(nextPayTime==null||nextPayTime==''){
			toastr.error("下次缴费时间为空");
			return ;
		}
	}
	
	$("#productName").val($("#productId").find(":selected").text());//设置选中的产品名称
	$("#productModelName").val($("#productModelId").find(":selected").text());//设置修改后的产品模型名称
//	var jsonArr = new Array();
//	$('#appendPayBody').find('tr').each(function (i,e) {
//        var payCodeObj = $(this).find('input.payCode');
//        var priceObj = $(this).find('input.price');
////        
//        if(payCodeObj.length != 0 && priceObj.length != 0) {
//        	var payCode = payCodeObj.val();
//        	var price = priceObj.val();
//        	jsonArr.push('{"payCode":"'+payCode+'","price":'+price+"}");
//        }
//       
//        
//    })
////    var jsonStr = jsonArr.join(",");
////    jsonStr = "[" + jsonStr +"]";
////	var jsonObj = eval('(' + jsonStr + ')');
	$("#sPrice").val(a1);//合计应缴
	var options = $("#updateInfoManage2").serialize();
	options += "&sumPrice="+a2+"&status=7";//拼接上实缴，状态
	debugger;
    $.ajax({
        type: "post",
//        url: ctx + "/consultInfoManage/addPayRecord?infoManageId=" + $('#infoManageId2').val() +'&'+url,
        url: ctx + "/consultBookingSeats/addPayRecord",
        data:options,
        dataType: 'json',
        success: function (msg) {
        	 if(msg.status=='success'){
          	   bool = true;
          	   $('#myTab11').find('li.active a').click();
             }
        	 $('#addSecondDiv').modal('hide');
        	 toastr.success('报名成功');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	return bool;
}

