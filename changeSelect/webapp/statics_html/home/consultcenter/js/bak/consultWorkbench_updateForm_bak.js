$(function () {
	//表单提交 
	$('#upshirBut').click(function(){
		formUpdate.update();
	});
})

//基础类
var formUpdate = function () {
    return {
        update:function(){
        	var bool = baseUpdateForm();
        	if(bool){
        		$('#addSecondDiv').modal('hide');
        		toastr.success('操作完成');
        	}else{
        		toastr.error('操作失败');
        	}
        },
        addRecord:function(){
        	$('.record-btn').attr('disabled',true);
        	var bool = baseUpdateForm();
        	//验证表单是否操作成功
        	if(!bool){
        		return;
        	}
        	/**
             * 添加回访信息
             * @returns
             */
            var str = $('#hrzx').find('td').text();
            var content = $('#recordContent').val();
            if (!content) {
                toastr.error('请填写回访记录');
                return;
            }
            var username = $("#currentUser").val();
            content = getNowFormatDate() + ":" + username + ":" + content;
            var infoManageId = $('#infoManageId2').val();
            var status = 3;//状态码变为3-已沟通
            var oldStatus = status;
            
            if (!$('#recordNextTime').val()) {
                toastr.error('请选择时间');
                return;
            }
            
            var productModelId = $('#product_model').val();
            var productModelName = $('#product_model').find(" :selected").text();
            var productId = $('#productId').val();
            var productName = $('#productId').find(":selected").text();
            var kTime = $('#kTime').val();
            var kTimeValue = $('#kTime').find(":selected").text();
            
            debugger;
            $.ajax({
                "type": "Post",
                "url": ctx + "/consultInfoManageServer/addNewRecordAndUpdate",
                "dataType": "json",
                "data": {
                    infoManageId: infoManageId,
                    baseStatus: status == '7' ? '' : status,
                    status:status,
                    recordNextTime: $('#recordNextTime').val(),
                    studentMaturity:$('#studentMaturity').val(),
                    content: content,
                    "productModelId":productModelId,
                    "productModelName":productModelName,
                    "productId":productId,
                    "productName":productName,
                    "kTime":kTime,
                    "kTimeValue":kTimeValue
                },
                "success": function (data) {
                    init();
                    init2();
                    toastr.success('操作完成');
                    $('#addSecondDiv').modal('hide');
                    $('#recordModelDiv').modal('hide');
                },
                error: function (response) {
                	$('.record-btn').attr('disabled',false);
                    toastr.error("系统错误");
                }
            });
            $('#myTab11').find('li.active a').click();
        },
        serverPhone:function(){
        	var bool = baseUpdateForm();
        	//验证表单是否操作成功
        	if(!bool){
        		return;
        	}
        	serverPhone();
        },
        backYGT:backYGT,
        dingzuo:function(){
        	var bool = dingzuoUpdateForm();
        	if(bool){
        		$('#addSecondDiv').modal('hide');
        		toastr.success('操作完成');
        	}else{
        		toastr.error('操作失败');
        	}
        },
        baoming:function(){
        	var bool = baseUpdateForm();
        	//验证表单是否操作成功
        	if(!bool){
        		return;
        	}
        	baomingUpdateForm();
//        	var sunBool = baomingUpdateForm();
//        	debugger;
//        	//验证表单是否操作成功
//        	if(sunBool){
//        		$('#addSecondDiv').modal('hide');
//        		toastr.success('报名成功');
//        	}else{
//        		toastr.error('报名失败,用户信息已暂存!');
//        	}
        }
    };
}();

//******************************************迁移至consultWorkbench_update_gjt.js中（starting）****************************************************//
/**
 * 转订座
 * @returns
 *//*
function dingzuo(){
	var ktime = $('#kTime2').val();
	$('#kTimeValue2').val($('#kTime2').find('option:selected').text());
	if(ktime==null||ktime==''){ 
		toastr.error('添加考期');
		return;
	}
    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
    $('#dPrice').val($('#dingzuoI').val());
    var sjhj = $('#dingzuoI').val();
    if (sjhj == '0' || sjhj == '') {
        toastr.error('添加费用金额');
        return;
    }
    var nextPayTime = $('#nextPayTime').val();
	if(nextPayTime==null||nextPayTime==''){
		 toastr.error("下次缴费时间为空");
		 return ;
	}
    $('#status2').val(6);
}

*//**
 * 添加上门未报名原因
 * @returns
 *//*
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
            dropDate:getNowFormatDate(),
            status: 5,
            oldStatus:4,
            content:content
        },
        "success": function (data) {
        	if(data.status=='success'){
        		toastr.success('操作完成');
                init();
                init3();
                init4();
                $('#addSecondDiv').modal('hide');
                $('#dropModelDiv').modal('hide');
        	}else{
            	toastr.error(data.msg);
            }
        }
    });
}*/
//******************************************迁移至consultWorkbench_update_gjt.js中（ending）****************************************************//

/**
 * 退回已沟通
 * @returns
 */
function backYGT(){
	$.ajax({
        type: "POST",
        url: ctx + "/consultInfoManageServer/toCommunicated",
        data: {
            status: 3,
            oldStatus:4,
            infoManageId: $('#yywsmInfoId').val(),
            serverDropFalse: "1",
            schoolId: '00000',
            schoolName: '-',
            reciveId: '00000',
            reciveName: '-',
            content:'退回已沟通'
        },
        dataType: 'json',
        success: function (msg) {
            if (msg.status == 'success') {
                toastr.success("回退成功");
                init2();
                init3();
                $('.bs-example-modal-lgyywsm').modal('hide');
            }else{
            	toastr.error(msg.msg);
            }
        }
    });
}

/**
 * 通用表单修改
 * @returns
 */
function baseUpdateForm(){
	var bool = false;
	
	var data = {
			//base
			'infoManageId':$('#infoManageId2').val(),
			'studentInfoManageId':$('#studentInfoManageId').val(),
			
			//student
			'studentName':$('#studentName2').val(),
			'studentSex':$('#studentSex2').val(),
			'age':$('#age2').val(),
			'email':$('#email2').val(),
			'phoneBelong':$('#departmentId12').val(),
			'weChat':$('#weChat2').val(),
			'tengXun':$('#tengXun2').val(),
			'ortherPhone':$('#ortherPhone2').val(),
			'idcardType':$('#idcardType2').val(),
			'idcard':$('#idcard2').val(),
			'infoType':$('#infoType2').val(),
			'nation':$('#nation').val(),
			'studentAttrId3':$('#studentAttrName32').val(),
			'studentAttrName3':$('#studentAttrName32 :selected').text(),
			'byZy':$('#byZy').val(),
			'emergencyContact':$('#emergencyContact').val(),
			'emergencyContactMode':$('#emergencyContactMode').val(),
			'phoneAddress':$('#phoneAddress2').val(),
			'workSpace':$('#workSpace2').val(),
			
			//project
			'projectId':$('#project2').val(),
			'projectName':$('#project2 :selected').text(),
			'projectLevelId':$('#projectLevel2').val(),
			'projectLevelName':$('#projectLevel2 :selected').text(),
			
			'eduFrom':$('#eduForm').val(),
			'schoolFromId':$('#schoolFormId').val(),
			'schoolFrom':$('#schoolFormId :selected').text(),
			'proFromId':$('#proFormId').val(),
			'proFrom':$('#proFormId :selected').text(),
			
			'classId':$('#classId2').val(),
			'classAttr':$('#classId2 :selected').text(), 
			'sumPrice':$('#classPrice2').val(),
			'classPrice':$('#classPrice2').val(),
			'sPrice':$('#sPriceHid2').val(),
			'kTime':$('#kTime2').val(),
			'kTimeValue':$('#kTime2 :selected').text(),
			'departmentId3':$('#adddepartmentId12').val(),
			'departmentName3':$('#adddepartmentId12 :selected').text(),
			'examRegionId':$('#examRegionId').val(),
			'examRegion':$('#examRegion').val(),
			'nextPayTime':$('#nextPayTime').val(),
			'selfYH':$('#selfYH2').val(),
			'ortherYH':isEmpty($('#ortherYH2').val())?0:$('#ortherYH2').val(),
			'jcCk':$('#jcCk').val(),
			'jfCk':$('#jfCk').val(),
			'zlContent':isEmpty($('#zlContent').val())?'':$('#zlContent').val(),
			
			//price
			'dPrice':$('#dPrice').val(),
			'dPriceType':$('#dPriceType').val(),
	};
	
	$.ajax({
        url: ctx + '/consultInfoManage/updateRecord',
        type: 'POST',
        data: data,
        async: false,
        dataType: 'json',
        success: function (data) {
           if(data.status=='success'){
        	   bool = true;
        	   $('#myTab11').find('li.active a').click();
           }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	return bool;
}

//******************************************迁移至consultWorkbench_update_gjt.js中（starting）****************************************************//
/**
 * 订座表单修改
 * @returns
 *//*
function dingzuoUpdateForm(){
	
	var ktime = $('#kTime2').val();
	$('#kTimeValue2').val($('#kTime2').find('option:selected').text());
	if(ktime==null||ktime==''){ 
		toastr.error('添加考期');
		return;
	}
    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
    $('#dPrice').val($('#dingzuoI').val());
    var sjhj = $('#dingzuoI').val();
    if (sjhj == '0' || sjhj == '') {
        toastr.error('添加费用金额');
        return;
    }
    var nextPayTime = $('#nextPayTime').val();
	if(nextPayTime==null||nextPayTime==''){
		 toastr.error("下次缴费时间为空");
		 return ;
	}
	

	
	var str = $('#dingzuoS').find(':selected').val();
	var bool = false;
	var data = {
			//base
			'infoManageId':$('#infoManageId2').val(),
			'studentInfoManageId':$('#studentInfoManageId').val(),
			
			//student
			'studentName':$('#studentName2').val(),
			'studentSex':$('#studentSex2').val(),
			'age':$('#age2').val(),
			'email':$('#email2').val(),
			'phoneBelong':$('#departmentId12').val(),
			'weChat':$('#weChat2').val(),
			'tengXun':$('#tengXun2').val(),
			'ortherPhone':$('#ortherPhone2').val(),
			'idcardType':$('#idcardType2').val(),
			'idcard':$('#idcard2').val(),
			'infoType':$('#infoType2').val(),
			'nation':$('#nation').val(),
			'studentAttrId3':$('#studentAttrName32').val(),
			'studentAttrName3':$('#studentAttrName32 :selected').text(),
			'byZy':$('#byZy').val(),
			'emergencyContact':$('#emergencyContact').val(),
			'emergencyContactMode':$('#emergencyContactMode').val(),
			'phoneAddress':$('#phoneAddress2').val(),
			'workSpace':$('#workSpace2').val(),
			
			//project
			'projectId':$('#project2').val(),
			'projectName':$('#project2 :selected').text(),
			'projectLevelId':$('#projectLevel2').val(),
			'projectLevelName':$('#projectLevel2 :selected').text(),
			
			'eduFrom':$('#eduForm').val(),
			'schoolFormId':$('#schoolFormId').val(),
			'schoolForm':$('#schoolForm :selected').text(),
			'proFormId':$('#proFormId').val(),
			'proFrom':$('#proFrom :selected').text(),
			
			'classId':$('#classId2').val(),
			'classAttr':$('#classId2 :selected').text(), 
			'sumPrice':$('#classPrice2').val(),
			'classPrice':$('#classPrice2').val(),
			'sPrice':$('#sPriceHid2').val(),
			'kTime':$('#kTime2').val(),
			'kTimeValue':$('#kTime2 :selected').text(),
			'departmentId3':$('#adddepartmentId12').val(),
			'departmentName3':$('#adddepartmentId12 :selected').text(),
			'examRegionId':$('#examRegionId').val(),
			'examRegion':$('#examRegion').val(),
			'nextPayTime':$('#nextPayTime').val(),
			'selfYH':$('#selfYH2').val(),
			'ortherYH':isEmpty($('#ortherYH2').val())?0:$('#ortherYH2').val(),
			'jcCk':$('#jcCk').val(),
			'jfCk':$('#jfCk').val(),
			'zlContent':isEmpty($('#zlContent').val())?'':$('#zlContent').val(),
					
			//price
			'dPrice':$('#dPrice').val(),
			'dPriceType':$('#dPriceType').val(),
			'status':6,
			'oldStatus':$('#status2').val(),
			
			//detailpay
			payDz:sjhj,
			payDzXj:str=='Xj'?sjhj:0,
			payDzZp:str=='Zp'?sjhj:0,
			payDzSk:str=='Sk'?sjhj:0,
			payDzWeixin:str=='Weixin'?sjhj:0,
			payDzZfb:str=='Zfb'?sjhj:0,
			payDzWl:str=='Wl'?sjhj:0,
			payDzZz:str=='Zz'?sjhj:0,
			payDzFq:str=='Fq'?sjhj:0,
	};
	$.ajax({
        url: ctx + '/consultInfoManage/updateRecordForDingZuo',
        type: 'POST',
        data: data,
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


*//**
 * 报名表单修改
 * @returns
 *//*
function baomingUpdateForm(){
	var bool = false;
	var ktime = $('#kTime2').val();
	$('#kTimeValue2').val($('#kTime2').find('option:selected').text());
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
    
	var a1 = $('#sjhj').text();
	var a2 = $('#hjprice').text();
	if(a2-a1<0){
		toastr.error("应缴费用总和小于实际费用");
		return ;
	}
    
    var nextPayTime = $('#nextPayTime').val();
	if(nextPayTime==null||nextPayTime==''){
		 toastr.error("下次缴费时间为空");
		 return ;
	}
	var str = $('#dingzuoS').find(':selected').val();
    var str = "payDz" + $('#dingzuoS').find(':selected').val();
    var payPx = '';
    var payKw = '';
    var payZl = '';
    var payXy = '';
    var payJc = '';
    var payFw = '';
    var e = 0;
    var id = '';
    var str = "payDz" + $('#dingzuoS').find(':selected').val();
    var url = '';
    if($('#dztd').text=='null'){
    	 url = '&payDz=' + $('#dingzuoI').val() + '&' + str + "=" + $('#dingzuoI').val() + '&payY=' + $('#yhqprice').text() + '&payS=' + $('#zkprice').text();
    }else{
    	 url = 'payY=' + $('#yhqprice').text() + '&payS=' + $('#zkprice').text();
    }
    var sPrice = 0;
    var obj;
    $('td[id^=appendPayTd]').each(function () {
        e = $(this);
        id = this.id;
        if (id.split('appendPayTd')[1] == 1) {
            url = url + '&payPx=' + e.text();
            obj = e.next().next().children('div .payment');
            for (var ob = 0; ob < obj.length; ob++) {
                url = url + '&payPx' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
            }
        }
        if (id.split('appendPayTd')[1] == 2) {
            url = url + '&payKw=' + e.text();
            obj = e.next().next().children('div .payment');
            for (var ob = 0; ob < obj.length; ob++) {
                url = url + '&payKw' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
            }
        }
        if (id.split('appendPayTd')[1] == 3) {
            url = url + '&payZl=' + e.text();
            obj = e.next().next().children('div .payment');
            for (var ob = 0; ob < obj.length; ob++) {
                url = url + '&payZl' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
            }
        }
        if (id.split('appendPayTd')[1] == 4) {
            url = url + '&payXy=' + e.text();
            obj = e.next().next().children('div .payment');
            for (var ob = 0; ob < obj.length; ob++) {
                url = url + '&payXy' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
            }
        }
        if (id.split('appendPayTd')[1] == 5) {
            url = url + '&payJc=' + e.text();
            obj = e.next().next().children('div .payment');
            for (var ob = 0; ob < obj.length; ob++) {
                url = url + '&payJc' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
            }
        }
        if (id.split('appendPayTd')[1] == 6) {
            if ($('#project2').find('option:selected').attr('type') == '1') {
                url = url + '&payFw=' + e.text();
                obj = e.next().next().children('div .payment');
                for (var ob = 0; ob < obj.length; ob++) {
                    url = url + '&payFw' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                    sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                }
            } else {
                url = url + '&payType=' + $('#appendPayTd6').text();
            }
        }
    });
    var cf = $('#cfhj').text();
    cf = eval(cf);
    if (cf != 0) {
        if (!$('#nextPayTime').val()) {
            toastr.error('请选择欠费时间');
            return;
        }
    }else{
    	$('#nextPayTime').val(getNowFormatDate());
    }
    
    var sjhj = $('#sjhj').text();
    if (sjhj == '0' || sjhj =='') {
        toastr.error('添加费用金额');
        return;
    }
    url = url + '&status=7&sumPrice='+$('#hjprice').text()+'&sPrice='+sPrice;
    $.ajax({
        type: "get",
        async: false,
        url: ctx + "/consultInfoManage/addPayRecord?infoManageId=" + $('#infoManageId2').val() +'&'+url,
        dataType: 'json',
        success: function (msg) {
        	 if(msg.status=='success'){
          	   bool = true;
          	   $('#myTab11').find('li.active a').click();
             }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	return bool;
}
*/
//******************************************迁移至consultWorkbench_update_gjt.js中（ending）****************************************************//


//转为预约
function serverPhone(){
	$('.yuyuerecord-btn').attr('disabled',true);
        var ar = {};
        var schoolName =$('#subscribe select[name="schoolId"]').val();
        var subscribeDate =$('#subscribe input[name="subscribeDate"]').val();
        var subscribeExplain =$('#subscribe textarea[name="subscribeExplain"]').val();
        if(schoolName == ""){
        	toastr.error('请选择校区');
        	$('.yuyuerecord-btn').attr('disabled',false);
        	return;
        } if(subscribeDate == ""){
        	toastr.error('请选择预约时间');
        	$('.yuyuerecord-btn').attr('disabled',false);
        	return;
        } if(subscribeExplain == ""){
        	toastr.error('请填写预约说明');
        	$('.yuyuerecord-btn').attr('disabled',false);
        	return;
        }
        ar["schoolName"] = $('#schoolIdModel').find(':selected').text();
        ar["schoolId"] = $('#schoolIdModel').find(':selected').val();
        ar["subscribeDate"] = $('#subscribeDate').val();
        ar["memo"] = $('#subscribeExplain').val();
        if (roleClass(ar["subscribeDate"], ar["schoolId"])) {
            var status = 4;
            $('#status2').val(status);
            $.ajax({
                type: "POST",
                url: ctx + "/consultConsoleHC/toServer",
                async: false,
                data: {
                    infoManageId: $('#infoManageId2').val(),
                    status: status,
                    oldStatus:3,
                    serverDateStr:ar["subscribeDate"],
                    schoolId: $('#schoolIdModel').find(':selected').val(),
                    schoolName: $('#schoolIdModel').find(':selected').text(),
                    content:JSON.stringify(ar)
                },
                //data: "serverDate="+'"'+ar["subscribeDate"]+'"',
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                    	toastr.success('预约成功');
                        init2();
                        init3();
                        $('.bs-example-modal-lg1').modal('hide');
                        $('.subscribe').modal('hide');
                    }else{
                    	toastr.error(msg.msg);
                    }
                }
            });
        }
}

function isEmpty(val){
	var e = false;
	if(val==null)
		return	true;
	if(val=='')
		return true;
	
}


