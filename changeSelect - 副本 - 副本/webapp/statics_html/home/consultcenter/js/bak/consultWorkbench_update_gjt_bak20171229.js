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
    var nextPayTime = $('#nextPayTime').val();
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
    
    var bool = baseUpdateForm();//提交编辑更新的信息
	//验证表单是否操作成功
	if(!bool){
		return;
	}
    
    var productId = $('#productId').val();//主产品id
    var childProductIdStr = $("#childProductIdHidden").val();//子产品id
    if(childProductIdStr==null || typeof(childProductIdStr)=="undefined"){
    	childProductIdStr = '';
    }
    statusRemember($('#infoManageId2').val(), 5, content);//异步向consult_info_manage_server表中插入记录
    $.ajax({
        "type": "Post",
        "url": ctx + "/consultInfoManageServer/toDropFalse",
        "dataType": "json",
        "data": {
            infoManageId: infoManageId,
            status: 5,
            oldStatus:4,
            content:content,
            productId:productId,
            "childrenProduct.productId":childProductIdStr,
            "childrenProduct.infoManageId":infoManageId
        },
        "success": function (data) {
        	if(data.status=='success'){
        		toastr.success('操作完成');
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
	
//	var ktime = $('#kTime').val();
//	$('#kTimeValue').val($('#kTime').find('option:selected').text());
//	if(ktime==null||ktime==''){ 
//		toastr.error('添加考期');
//		return;
//	}
    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
     
    if($('#dingzuoI').val()==null || $('#dingzuoI').val()=='' || $('#dingzuoI').val()=='0') {
    	toastr.error('转订座，订座费不能为空');
		return;
    }
    
    var kTime = $('#kTime').val();//产品考期
	if(''==kTime || null ==kTime) {
		toastr.error("产品考期不能为空");
		return bool;
	}
	
	var email = $('#email2').val();
	if(''==email || null == email) {
		toastr.error("学生邮箱不能为空");
		return bool;
	}
	var phoneBelong = $('#departmentId12').val();//电话归属地
	if(''==phoneBelong || null == phoneBelong) {
		toastr.error("电话归属地不能为空");
		return bool;
	}
	var weChat = $('#weChat2').val();//微信
	if(''==weChat || null == weChat) {
		toastr.error("微信不能为空");
		return bool;
	}
	var tengXun = $('#tengXun2').val();//QQ
	if(''==tengXun || null == tengXun) {
		toastr.error("QQ不能为空");
		return bool;
	}
	var ortherPhone = $('#ortherPhone2').val();//其它联系方式
	if(''==ortherPhone || null == ortherPhone) {
		toastr.error("其它联系方式不能为空");
		return bool;
	}
	var idcardType = $('#idcardType2').val();//证件类型
	if(''==idcardType || null == idcardType) {
		toastr.error("证件类型不能为空");
		return bool;
	}
	var idcard = $('#idcard2').val();//证件号码
	if(''==idcard || null == idcard) {
		toastr.error("证件号码不能为空");
		return bool;
	}
	var nation = $('#nation').val();//民族
	if(''==nation || null == nation) {
		toastr.error("民族不能为空");
		return bool;
	}
	var studentAttrId3 = $('#studentAttrName32').val();//最高学历id
	if(''==studentAttrId3 || null == studentAttrId3) {
		toastr.error("最高学历不能为空");
		return bool;
	}
	var byZy = $('#byZy').val();//所学专业
	if(''==byZy || null == byZy) {
		toastr.error("所学专业不能为空");
		return bool;
	}
	var bySchool = $('#bySchool').val();//毕业院校
	if(''==bySchool || null == bySchool) {
		toastr.error("毕业院校不能为空");
		return bool;
	}
	var emergencyContact = $('#emergencyContact').val();//紧急联系人
	if(''==emergencyContact || null == emergencyContact) {
		toastr.error("紧急联系人不能为空");
		return bool;
	}
	var emergencyContactMode = $('#emergencyContactMode').val();//联系方式
	if(''==emergencyContactMode || null == emergencyContactMode) {
		toastr.error("紧急联系人联系方式不能为空");
		return bool;
	}
	var phoneAddress = $('#phoneAddress2').val();//通讯地址
	if(''==phoneAddress || null == phoneAddress) {
		toastr.error("通讯地址不能为空");
		return bool;
	}
	var workSpace = $('#workSpace2').val();//工作单位
	if(''==workSpace || null == workSpace) {
		toastr.error("工作单位不能为空");
		return bool;
	}
	
    $('#dPrice').val($('#dingzuoI').val());
    //获取到订座费用之后，再将dingzuoI制空，防止下次点击数据还在
    //$('#dingzuoI').val(0);
    //产品名称回显
    $('#productName').val($('#productId').find(':selected').text());
    var nextPayTime = $('#nextPayTime').val();
    
    //取消子产品课程信息部分的disable属性-为了能够提交参数
    $(".project2").find("input,select").prop("disabled",false);
    
	var options = $("#updateInfoManage2").serialize();
	//收入或者支出，1收入，2支出
	var isNeIf = $("#isNeIf").val();
	//学生咨询信息id，用于后台更新学生信息使用
	var studentInfoManageId = $("#studentInfoManageId").val();
	//课程咨询信息id，用于后台更新课程信息使用
	var projectInfoManageId = $("#projectInfoManageId").val();
	//该咨询量所属分校id
	var departmentId1 = $("#departmentId1Hidden").val();
    options += "&status=6&isNeIf="+isNeIf+"&studentInfoManageId"+studentInfoManageId
    +"&departmentId1="+departmentId1;//状态码：6-订座
    
	//订座费缴费方式(name=payFrom, payValue; id分别是dingzuoS，dingzuoI
	var bool = false;
	$.ajax({
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
	
	var kTime = $('#kTime').val();//产品考期
	if(''==kTime || null ==kTime) {
		toastr.error("产品考期不能为空");
		return bool;
	}
	
	var email = $('#email2').val();
	if(''==email || null == email) {
		toastr.error("学生邮箱不能为空");
		return bool;
	}
	var phoneBelong = $('#departmentId12').val();//电话归属地
	if(''==phoneBelong || null == phoneBelong) {
		toastr.error("电话归属地不能为空");
		return bool;
	}
	var weChat = $('#weChat2').val();//微信
	if(''==weChat || null == weChat) {
		toastr.error("微信不能为空");
		return bool;
	}
	var tengXun = $('#tengXun2').val();//QQ
	if(''==tengXun || null == tengXun) {
		toastr.error("QQ不能为空");
		return bool;
	}
	var ortherPhone = $('#ortherPhone2').val();//其它联系方式
	if(''==ortherPhone || null == ortherPhone) {
		toastr.error("其它联系方式不能为空");
		return bool;
	}
	var idcardType = $('#idcardType2').val();//证件类型
	if(''==idcardType || null == idcardType) {
		toastr.error("证件类型不能为空");
		return bool;
	}
	var idcard = $('#idcard2').val();//证件号码
	if(''==idcard || null == idcard) {
		toastr.error("证件号码不能为空");
		return bool;
	}
	var nation = $('#nation').val();//民族
	if(''==nation || null == nation) {
		toastr.error("民族不能为空");
		return bool;
	}
	var studentAttrId3 = $('#studentAttrName32').val();//最高学历id
	if(''==studentAttrId3 || null == studentAttrId3) {
		toastr.error("最高学历不能为空");
		return bool;
	}
	var byZy = $('#byZy').val();//所学专业
	if(''==byZy || null == byZy) {
		toastr.error("所学专业不能为空");
		return bool;
	}
	var bySchool = $('#bySchool').val();//毕业院校
	if(''==bySchool || null == bySchool) {
		toastr.error("毕业院校不能为空");
		return bool;
	}
	var emergencyContact = $('#emergencyContact').val();//紧急联系人
	if(''==emergencyContact || null == emergencyContact) {
		toastr.error("紧急联系人不能为空");
		return bool;
	}
	var emergencyContactMode = $('#emergencyContactMode').val();//联系方式
	if(''==emergencyContactMode || null == emergencyContactMode) {
		toastr.error("紧急联系人联系方式不能为空");
		return bool;
	}
	var phoneAddress = $('#phoneAddress2').val();//通讯地址
	if(''==phoneAddress || null == phoneAddress) {
		toastr.error("通讯地址不能为空");
		return bool;
	}
	var workSpace = $('#workSpace2').val();//工作单位
	if(''==workSpace || null == workSpace) {
		toastr.error("工作单位不能为空");
		return bool;
	}
	
	$("#productName").val($("#productId").find(":selected").text());//设置选中的产品名称
	$("#productModelName").val($("#productModelId").find(":selected").text());//设置修改后的产品模型名称
	$("#sPrice").val(a1);//合计应缴
	
	//如果有子产品，还需要把设置子产品的
	$("#childProductName").val($("#productId").find(":selected").text());//设置选中的产品名称
	$("#childProductModelName").val($("#productModelId").find(":selected").text());//设置修改后的产品模型名称
	$("#childSPrice").val(a1);//合计应缴
	
	var code = $("#activtyCodeValue").val();//得到已经使用的优惠码-后台需要将其制为已使用
	var dept = $("#departmentId1Hidden").val();//得到分校id
	
	//为consult_info_manage_pay_comp表准备参数
	//1.为每种费用类型的应缴，实缴，欠费赋值
	 $('#appendPayBody').find('tr.appendDiv').each(function (i,e) {
		 //应缴费用整理
		 var yjtd = $(e).find('td').eq(1);//应缴td对象
		 $(e).find("input.payCompYJ").val(yjtd.text());//只有第一个缴费类型需要，因为它的应缴值会变
		 
		 //实缴费用整理
		 var sjtd = $(e).find('td').eq(2);//实缴td对象
		 $(e).find("input.payCompSJ").val(sjtd.text());
		 
		 //欠费整理
		 var qftd = $(e).find('td').eq(4);//欠费td对象
		 $(e).find("input.payCompCF").val(qftd.text());
	 });
	 //2.启用优惠，折扣勾选的才提交值
	 $('#appendPayBody').find('tr.yhzk').each(function (i,e) {
		 //得到是否选中
		 var flag = $(e).find("input[type=checkbox]").prop("checked");
		 if(flag) {
			 $(e).find('input.yhzkInput').removeAttr("disabled"); 
		 }
	 });
	 $("#activityValue").val($("#yhqprice").text());//处理优惠券的金额
	
	var options = $("#updateInfoManage2").serialize();
	var infoManageId = $("#infoManageId2").val();//咨询id
	options += "&sumPrice="+a2+"&status=7"+"&code="+code+"&dept="+dept+"&infoMangeId="+infoManageId;//拼接上实缴，状态
	 
    $.ajax({
        type: "post",
        url: ctx + "/consultBookingSeats/addPayRecord",
        data:options,
        dataType: 'json',
        success: function (data) {
        	 if(data.status=='success'){
          	   bool = true;
          	   $('#myTab11').find('li.active a').click();
          	   $('#addSecondDiv').modal('hide');
          	   toastr.success('报名成功');
             } else {
               //$('#myTab11').find('li.active a').click();
               //$('#addSecondDiv').modal('hide');
               toastr.error(data.msg);
             }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	return bool;
}

