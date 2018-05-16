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
        		//异步向consult_info_manage_server表中插入记录
        		statusRemember($('#infoManageId2').val(), productId, 5, content);
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
    $('#dPriceType').val($('#dingzuoS').find(':selected').val());
     
    if($('#payee').val()==null || $('#payee').val()=='0') {
    	toastr.error('收款方必须选择');
		return;
    }
    
    if($('#dingzuoI').val()==null || $('#dingzuoI').val()=='' || $('#dingzuoI').val()=='0') {
    	toastr.error('转订座，订座费不能为空');
		return;
    }
    var nextPayTime = $('#nextPayTime').val();
	if(nextPayTime==null||nextPayTime==''){
		toastr.error("下次缴费时间为空");
		return;
	}
	
    $('#dPrice').val($('#dingzuoI').val());
    //获取到订座费用之后，再将dingzuoI制空，防止下次点击数据还在
    //$('#dingzuoI').val(0);
    //产品名称回显
    $('#productName').val($('#productId').find(':selected').text());
    var nextPayTime = $('#nextPayTime').val();
    
    //取消子产品课程信息部分的disable属性-为了能够提交参数
    $(".project2").find("input,select").prop("disabled",false);
   //设置产品应缴费用
	$("#classPrice").val($("#hjprice").text());
	var options = $("#updateInfoManage2").serialize();
	//收入或者支出，1收入，2支出
	var isNeIf = $("#isNeIf").val();
	//学生咨询信息id，用于后台更新学生信息使用
	var studentInfoManageId = $("#studentInfoManageId").val();
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
        	 //异步向consult_info_manage_server表中插入记录
       		   statusRemember($('#infoManageId2').val(), $('#productId').val(), 6, "订座成功");
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
  	
  	if($('#payee').val()==null || $('#payee').val()=='0') {
    	toastr.error('收款方必须选择');
		return;
    }
  	
  	var cfhj = $('#cfhj').text();
  	if(cfhj==null || cfhj=="") {
  		toastr.error("没有缴费信息");
  		return bool;
  	}
  //如果有欠费才会判断下次缴费时间
  	if(eval(cfhj)>0) {
  		var nextPayTime = $('#nextPayTime').val();
  		if(nextPayTime==null||nextPayTime==''){
  			toastr.error("下次缴费时间为空");
  			bool = false;
  		}
  	}
	//将主产品的课程信息下的name值的input赋值
	$(".project").find("input.projectInfoManager").each(function(i,e){
		//得到该课程信息下拉选的name值
		var projectName = $(e).parent().find("select :selected").text();
		//将name值传递给隐藏input框，作为传递给后台的参数
		$(e).val(projectName);
	});
//	$("#productName").val($("#productId").find(":selected").text());//设置选中的产品名称
//	$("#productModelName").val($("#productModelId").find(":selected").text());//设置修改后的产品模型名称
	var a1 = $('#sjhj').text();//合计实缴
	var a2 = $('#hjprice').text();//合计实际应缴
	if(a2-a1<0){
		toastr.error("应缴费用总和小于实际费用");
		return ;
	}
	$("#sPrice").val(a1);//合计实缴
	
	//将子产品的课程信息下的name值的input赋值
	$(".project2").find("input.projectInfoManager2").each(function(i,e){
		//得到该课程信息下拉选的name值
		var projectName = $(e).parent().find("select :selected").text();
		//将name值传递给隐藏input框，作为传递给后台的参数
		$(e).val(projectName);
	});
	//如果有子产品，还需要把设置子产品的
//	$("#childProductName").val($("#productId").find(":selected").text());//设置选中的产品名称
//	$("#childProductModelName").val($("#productModelId").find(":selected").text());//设置修改后的产品模型名称
	var b1 = $('#childSjhj').text();//子产品合计实缴
	var b2 = $('#childHjprice').text();//子产品合计实际应缴
	if(b2-b1<0){
		toastr.error("子产品应缴费用总和小于实际费用");
		return ;
	}
	$("#childSPrice").val(b1);//子产品合计实缴
	
	var code = $("#yhInput").val();//得到已经使用的优惠码-后台需要将其制为已使用
//	var dept = $("#departmentId1Hidden").val();//得到分校id-当前操作人员所属部分id，这一部分需要后台来做
	var childCode = $("#childYhInput").val();//得到子产品已经使用的优惠码-后台需要将其制为已使用
	
	//为consult_info_manage_pay_comp表准备参数-主要是优惠和服务信息，如果有子产品，还有子产品的课程信息
	//打开课程信息下禁止编辑状态，为了提交参数
	$(".project").find("input,select").prop("disabled",false);
	//打开子产品课程信息下禁止编辑状态，为了提交参数
	$(".project2").find("input,select").prop("disabled",false);
	//更新费用使用的积分活动的值——只能放这做，应为只有在这里支付金额才最终确定下来
	//先得到页面选中的积分
	var jfValue = $("#jfSelect").val();
	if(jfValue!=null && jfValue!='') {//积分有可用值选中
		 
		//得到该积分活动的code_id集合
		var epId = $("#jfSelect").find(":selected").data("value");
		epId = epId.toString();//确保得到的是字符串
		if(epId=='' || epId==null) {//如果epId为空串
			var epIdArr = new Array();
		} else if(epId.indexOf(",")==-1) {//如果epId集合中只有一个code_id
			var epIdArr = new Array(epId);
		} else {//如果epId集合中有多个code_id
			var epIdArr = epId.split(",");
		}
		
		//开始实际更新使用了积分优惠的费用
		$(".projectPayFees tr.appendDiv").each(function(i,e){
			//得到费用的code_id
			var codeId = $(e).find("input.payCodeId").val();
			for(var index in epIdArr) {
				if(codeId==epIdArr[index]) {//当前费用种类的id在code_id集合中，更新该费用的积分
					//得到当前积分比例1
					var scale1 = $("#jfSelect").find(":selected").data("scale1");
					//得到当前积分比例2
					var scale2 = $("#jfSelect").find(":selected").data("scale2");
					//得到当前实缴值
					var yjValue = $(e).find("td").eq(3).text();
					
					//开始设置该使用在该费用上的积分活动的id，和积分值
					//设置积分活动id
					$(e).find("input.integral").val($("#jfSelect").val());
					//设置积分的值
					$(e).find("input.integralValue").val(Number(yjValue)*(Number(scale1)/Number(scale2)));
				}
			}
		});
	} 
	//开始整理子产品的积分
	//先判断用户有没有选择子产品
//	var childFlag = $("#childJfSelect");
	var childFlag = $("#childrenProduct").val();
	if(childFlag==null || childFlag=='' || typeof(childFlag)=="undefined") {
		//没有子产品
	} else {
		//子产品收款方必须选中
		if($('#childPayee').val()==null || $('#childPayee').val()=='0') {
	    	toastr.error('子产品收款方必须选择');
			return;
	    }
		//先得到页面选中的积分
		var childJfValue = $("#childJfSelect").val();
		if(childJfValue!=null && childJfValue!='') {//积分有可用值选中
			 
			//得到该积分活动的code_id集合
			var epId = $("#childJfSelect").find(":selected").data("value");
			epId = epId.toString();//确保得到的是字符串
			if(epId=='' || epId==null) {//如果epId为空串
				var epIdArr = new Array();
			} else if(epId.indexOf(",")==-1) {//如果epId集合中只有一个code_id
				var epIdArr = new Array(epId);
			} else {//如果epId集合中有多个code_id
				var epIdArr = epId.split(",");
			}
			//开始实际更新子产品下使用了积分优惠的费用
			$(".projectPayFees2 tr.appendDiv").each(function(i,e){
				//得到费用的code_id
				var codeId = $(e).find("input.payCodeId").val();
				for(var index in epIdArr) {
					if(codeId==epIdArr[index]) {//当前费用种类的id在code_id集合中，更新该费用的积分
						//得到当前积分比例1
						var scale1 = $("#childJfSelect").find(":selected").data("scale1");
						//得到当前积分比例2
						var scale2 = $("#childJfSelect").find(":selected").data("scale2");
						//得到当前实缴值
						var yjValue = $(e).find("td").eq(3).text();
						
						//开始设置该使用在该费用上的积分活动的id，和积分值
						//设置积分活动id
						$(e).find("input.integral").val($("#childJfSelect").val());
						//设置积分的值
						$(e).find("input.integralValue").val(Number(yjValue)*(Number(scale1)/Number(scale2)));
					}
				}
			});
		} 
	}
	
	//*******2018/03/13新增，支付方式金额为0的缴费记录不提交到后台
	 
	//遍历每种缴费种类
	$("#appendPayBody").find("tr").each(function(i,e){
		//遍历每种支付方式
		$(e).find("td").eq(4).find("div.payment").each(function(i2,e2){
			var money = $(e2).find("input.zjsjflag").val();
			if(Number(money)==0) {
				//如果该支付方式的缴费金额为0，就把该支付方式的相关参数设置disabled标签
				$(e2).find("select,input").prop("disabled",true);
			}
		});
	});
	//*******结束
	
	var options = $("#updateInfoManage2").serialize();
	var infoManageId = $("#infoManageId2").val();//咨询id
	//拼接的参数依次是主产品实际应缴值，子产品实际应缴值，主产品咨询量状态，子产品咨询量状态，主产品使用优惠码，子产品使用优惠码，
	//主产品咨询量id，子产品咨询量id（组合产品咨询量id相同),主产品id，子产品id
	options += "&sumPrice="+a2+"&childrenProduct.sumPrice="+b2+"&status=7"+"&childrenProduct.status=7"+"&code="+code
	+"&childActivityCode.code="+childCode+"&infoMangeId="+infoManageId+"&childrenProduct.infoMangeId="+infoManageId;//拼接上实缴，状态
	//+"&productId="+productId+"&childrenProduct.productId="+childProductIdStr;//拼接上实缴，状态

	$.ajax({
        type: "post",
        url: ctx + "/consultBookingSeats/addPayRecord",
        data:options,
        dataType: 'json',
        success: function (data) {
        	 if(data.status=='success'){
        	   //异步向consult_info_manage_server表中插入记录
         	   statusRemember($('#infoManageId2').val(), $('#productId').val(), 7, "报名成功");
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

