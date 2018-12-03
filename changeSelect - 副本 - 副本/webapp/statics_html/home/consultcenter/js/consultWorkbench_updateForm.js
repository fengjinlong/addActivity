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
        		
        		$('#myTab11').find('li.active a').click();
        	}else{
        		toastr.error('操作失败');
        	}
        },
        addRecord:function(){//转为已沟通，如果是其他状态，则只是保存一条回访记录
        	$('.record-btn').attr('disabled',true);
        	
        	var status = $('#status2').val();
        	//如果当前处于报名状态--则不要更新编辑信息，应为此处信息不会修改，只回显
        	if (status != '7') {
        		var bool = baseUpdateForm();//提交编辑更新的信息
            	//验证表单是否操作成功
            	if(!bool){
            		return;
            	} 
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
//            var status = 3;//状态码变为3-已沟通
//            var oldStatus = status;
            if (!$('#recordNextTime').val()) {
                toastr.error('请选择时间');
                return;
            }
            
            var oldStatus = status;
            //只有当前状态是待沟通，且回访记录选择有效时，才会转到待沟通状态。其它状态添加回访记录只是添加一条咨询信息
            if (status == '2' && $('#statusEnable').find('option:selected').val() == '0') {
                status = 3;
                oldStatus = 2;
            } 
            statusRemember($('#infoManageId2').val(), $('#productId').val(), 20, content);//异步想consult_info_manage_server表中插入记录
            
//            var productModelId = $('#product_model').val();
//            var productModelName = $('#product_model').find(" :selected").text();
            var productId = $('#productId').val();//主产品id
//            var productName = $('#productId').find(":selected").text();
//            var kTime = $('#kTime').val();
//            var kTimeValue = $('#kTime').find(":selected").text();
            
            var childProductIdStr = $("#childProductIdHidden").val();//子产品id
            if(childProductIdStr==null || typeof(childProductIdStr)=="undefined"){
            	childProductIdStr = '';
            }
             
            $.ajax({
                "type": "Post",
                "url": ctx + "/consultInfoManageServer/addNewRecordAndUpdate",
                "dataType": "json",
                "data": {
                    infoManageId: infoManageId,
                    baseStatus: status == '7' ? '' : status,
                    status:status,
                    oldStatus:oldStatus,
                    recordNextTime: $('#recordNextTime').val(),
                    studentMaturity:$('#studentMaturity').val(),
                    content: content,
                    productId:productId,
                    "childrenProduct.productId":childProductIdStr,
                    "childrenProduct.infoManageId":infoManageId
                },
                "success": function (data) {
                    init();
                    init2();
                    toastr.success('操作完成');
                    //咨询记录，呼入-咨询记录，上门未报名原因，回显
                    backInfo();
                    //隐藏公共弹框
                    $('#addSecondDiv').modal('hide');
                    //隐藏回访信息弹框
                    $('#recordModelDiv').modal('hide');
                    
                    $('#myTab11').find('li.active a').click();
                },
                error: function (response) {
                	$('.record-btn').attr('disabled',false);
                    toastr.error("系统错误");
                }
            });
            
        },
        serverPhone:function(){//转预约
        	var bool = baseUpdateForm();
        	//验证表单是否操作成功
        	if(!bool){
        		return;
        	}
        	serverPhone();
        },
        backYGT:backYGT,//预约未上门
        dingzuo:function(){
        	baseUpdateForm();
        	var bool = dingzuoUpdateForm();
        	if(bool){
        		$('#addSecondDiv').modal('hide');
        		$('#dztr').hide();//订座费隐藏
        		toastr.success('订座成功');
        	}else{
        		toastr.error('转订座操作失败');
        	}
        },
        baoming:function(){
        	var bool = baseUpdateForm();
        	//验证表单是否操作成功
        	if(!bool){
        		toastr.error('转报名操作失败,请检查学员信息,课程信息是否填写正确');
        		return;
        	}
        	baomingUpdateForm();
        }
    };
}();


/**
 * 预约未上门-单击事件
 * 退回已沟通
 * @returns
 */
function backYGT(){
	var productId = $("#yywsmProductId").val();//主产品id
	 var childProductIdStr = $("#yywsmChildProId").val();//子产品id
     if(childProductIdStr==null || typeof(childProductIdStr)=="undefined"){
     	childProductIdStr = '';
     }
      
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
            content:'退回已沟通',
            productId:productId,
            "childrenProduct.productId":childProductIdStr,
            "childrenProduct.infoManageId":$('#yywsmInfoId').val(),
            "childrenProduct.status":3,
            "childrenProduct.oldStatus":4
        },
        dataType: 'json',
        success: function (msg) {
            if (msg.status == 'success') {
                toastr.success("回退成功");
                init2();
                init3();
                $('.bs-example-modal-lgyywsm').modal('hide');
                
                $('#myTab11').find('li.active a').click();
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
	//产品信息校验
	var productId = $("#productId").val();
	if(''==productId || null ==productId) {
		toastr.error("产品不能为空");
		return bool;
	}
	var productModelId = $("#product_model").val();//产品模型id
	if(''==productModelId || null ==productModelId) {
		toastr.error("产品模型不能为空");
		return bool;
	}
	
	//学员信息校验
	var studentName = $('#studentName2').val();
	if(''==studentName || null == studentName) {
		toastr.error("学生姓名不能为空");
		return bool;
	}
	var studentSex = $('#studentSex2').val();
	if(''==studentSex || null == studentSex) {
		toastr.error("学生性别不能为空");
		return bool;
	}
	var studentPhone = $('#studentPhone3').val();//手机号
	if(''==studentPhone || null == studentPhone) {
		toastr.error("学生手机不能为空");
		return bool;
	}
	var age = $('#age2').val();
	if(''==age || null == age) {
		toastr.error("学生年龄不能为空");
		return bool;
	}
	
	var data = {
			//base
			'infoManageId':$('#infoManageId2').val(),
			'studentInfoManageId':$('#studentInfoManageId').val(),
			
			//student
			'studentName':$('#studentName2').val(),
			'studentSex':$('#studentSex2').val(),
			'studentPhone':$('#studentPhone3').val(),//手机号
			'age':$('#age2').val(),
			'email':$('#email2').val(),
			'phoneBelong':$('#departmentId12').val(),//电话归属地
			'weChat':$('#weChat2').val(),//微信
			'tengXun':$('#tengXun2').val(),//QQ
			'ortherPhone':$('#ortherPhone2').val(),//其它联系方式
			'idcardType':$('#idcardType2').val(),//证件类型
			'idcard':$('#idcard2').val(),//证件号码
			'nation':$('#nation').val(),//民族
			'studentAttrId3':$('#studentAttrName32').val(),//最高学历id
			'studentAttrName3':$('#studentAttrName32 :selected').text(),//最该学历名称
			'byZy':$('#byZy').val(),//所学专业
			'bySchool':$('#bySchool').val(),//毕业院校
			'emergencyContact':$('#emergencyContact').val(),//紧急联系人
			'emergencyContactMode':$('#emergencyContactMode').val(),//联系方式
			'phoneAddress':$('#phoneAddress2').val(),//通讯地址
			'workSpace':$('#workSpace2').val(),//工作单位
			
			//project
			'kTime':$('#kTime').val(),//产品考期
			'kTimeValue':$('#kTime :selected').text(),//产品考期名称
			'departmentId3':$('#adddepartmentId12').val(),//校区id
			'departmentName3':$('#adddepartmentId12 :selected').text(),//校区名称
			'productModelId':$("#product_model").val(),//产品模型id
			'productModelName':$("#product_model :selected").text(),//产品模型名称
			'productId':$("#productId").val(),//产品id
			'productName':$("#productId :selected").text(),//产品名称
			'payee':$("#payee").val(),//收款方
			'branchSchoolId':$("#branchSchoolId").val(),//考试地区
			//price-缴费模块
			'sumPrice':$('#classPrice2').val(),//总价(合计应缴)
			'classPrice':$('#classPrice2').val(),//考期价格(旧版班型价格)(应缴费用)
			'sPrice':$('#sPriceHid2').val(),//实缴
			'nextPayTime':$('#nextPayTime').val(),//下次支付时间
			'dPrice':$('#dPrice').val(),//订座费
			'dPriceType':$('#dPriceType').val(),//订座费支付方式
	};
	//动态获取（主）课程信息
	$(".project").find("select.removeFlag").each(function(index,obj){
		var nameStr = $(obj).prop("name");//得到name属性值
		var optionValue = $(obj).val();//得到select的选中值
		//主产品课程信息下的子产品下拉选没有name属性
		if(optionValue != '' && nameStr!=null && typeof(nameStr)!="undefined") {
			//追加需要提交的参数形式
			data[nameStr] = optionValue;//此处得到的是课程信息的id值
		}
		//开始得到课程信息的name值
		var inputObj = $(obj).parent().find("input.projectInfoManager");//每个select相邻的input对象
		var nameStr2 = $(inputObj).prop("name");
		var inputValue = $(obj).find(":selected").text();
		//主产品课程信息下的子产品下拉选没有name属性
		if(inputValue != '--请选择--' && nameStr2!=null && typeof(nameStr2)!="undefined") {
			//追加需要提交的参数形式
			data[nameStr2] = inputValue;//此处得到的是课程信息的name值
		}
	});
	
	//动态获取（子）课程信息
	$(".project2").find("select.removeChildFlag").each(function(index,obj){
		var nameStr = $(obj).prop("name");//得到name属性值
		var optionValue = $(obj).val();//得到select的选中值
		if(optionValue != ''&& optionValue!=null && typeof(optionValue)!="undefined") {
			//追加需要提交的参数形式
			data[nameStr] = optionValue;//此处得到的是课程信息的id值
		}
		 
		//开始得到课程信息的name值
		var inputObj = $(obj).parent().find("input.projectInfoManager2");//每个select相邻的input对象
		var nameStr2 = $(inputObj).prop("name");
		var inputValue = $(obj).find(":selected").text();
		
		if(inputValue != '--请选择--' && inputValue!=null && typeof(inputValue)!="undefined") {
			//追加需要提交的参数形式
			data[nameStr2] = inputValue;//此处得到的是课程信息的name值
		}
	});
	//得到咨询量状态
	var status = $('#status2').val();
	//将咨询量状态封装进请求参数中
	data["status"] = status;
	
	//提交子产品-产品模型和考期信息，招生地区和收款方
	//产品模型
	var childProductModelId = $("#childProductModelId").val();
	if(childProductModelId!=null && childProductModelId!='' && typeof(childProductModelId)!="undefined") {
		data['childrenProduct.productModelId'] = childProductModelId;
	}
	var childProductModelName = $("#childProductModelId :selected").text();
	if(childProductModelName!=null && childProductModelName!='' && typeof(childProductModelName)!="undefined") {
		data['childrenProduct.productModelName'] = childProductModelName;
	}
	//产品
	var childProductId = $("#childProductId").val();
	if(childProductId!=null && childProductId!='' && typeof(childProductId)!="undefined") {
		data['childrenProduct.productId'] = childProductId;
	}
	var childProductName = $("#childProductId :selected").text();
	if(childProductName!=null && childProductName!='' && typeof(childProductName)!="undefined") {
		data['childrenProduct.productName'] = childProductName;
	}
	//产品考期
	var childKTime = $("#childKTime").val();
	if(childKTime!=null && childKTime!='' && typeof(childKTime)!="undefined") {
		data['childrenProduct.kTime'] = childKTime;
	}
	var childKTimeValue = $("#childKTime :selected").text();
	if(childKTimeValue!=null && childKTimeValue!='' && typeof(childKTimeValue)!="undefined") {
		data['childrenProduct.kTimeValue'] = childKTimeValue;
	}
	//收款方
	var childPayee = $("#childPayee").val();
	if(childPayee!=null && childPayee!='' && typeof(childPayee)!="undefined") {
		data['childrenProduct.payee'] = childPayee;
	}
	//招生地区
	var childBranchSchoolId = $("#childBranchSchoolId").val();
	if(childBranchSchoolId!=null && childBranchSchoolId!='' && typeof(childBranchSchoolId)!="undefined") {
		data['childrenProduct.branchSchoolId'] = childBranchSchoolId;
	}
	
	//开始记录页面使用的折扣，积分，优惠码信息
	var zkObj = $("#zkSelect");
	if(zkObj.length>0) {
		//记录使用的折扣信息
		data['discountId'] = $(zkObj).val();
	} else {
		//给个空值防止修改优惠折扣时，数据表中以前的使用数据没有删除-造成回显出错
		data['discountId'] = "";
	}
	var jfObj = $("#jfSelect");
	if(jfObj.length>0) {
		//记录使用的积分id
		data['scaleId'] = $(jfObj).val();
	} else {
		data['scaleId'] = "";
	}
	var activityObj = $("#yhInput");
	if(activityObj.length>0) {
		//记录使用的优惠码
		data['activityCodePro'] = $(activityObj).val()
		//记录使用的优惠码金额
		data['activityValuePro'] = $("#yhqprice").val();
	} else {
		data['activityCodePro'] = "";
		data['activityValuePro'] = "";
	}
	//提交课程信息id，更新课程信息使用
	data['projectInfoManageId'] = $("#projectInfoManageId").val();
	
	$.ajax({
        url: ctx + '/consultInfoManage/updateRecord',
        type: 'POST',
        data: data,
        async: false,
        dataType: 'json',
        success: function (data) {
           if(data.status=='success'){
        	   bool = true;
//        	   $('#myTab11').find('li.active a').click();
           } else {
        	   toastr.error(data.msg);
           }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	return bool;
}

//转为预约
function serverPhone(){
	$('.yuyuerecord-btn').attr('disabled',true);//预约弹框-确定按钮
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
        //转预约时，也要向consult_info_manage_server中插入数据
        //statusRemember($('#infoManageId2').val(), 4, $('#subscribeExplain').val(),$('#subscribeDate').val());
        var username = $("#currentUser").val();//当前用户
       
        var examTimeId = $("#kTime").val();//主产品考期id
        var childExamTimeId = $("#childKTime").val();//子产品考期id
        if(childExamTimeId|| typeof(childExamTimeId)=="undefined") {
        	childExamTimeId = '';
        }
        
        var productId = $('#productId').val();//主产品id
        var childProductIdStr = $("#childProductIdHidden").val();//子产品id
        if(childProductIdStr==null || typeof(childProductIdStr)=="undefined"){
        	childProductIdStr = '';
        }
        if (roleClass(ar["subscribeDate"], ar["schoolId"])) {
            var status = 4;
            $('#status2').val(status);
            //得到主产品的合计实际应缴
            var hjprice = $("#hjprice").val();
            //如果产品没有配置价格
            if(hjprice==null || typeof(hjprice)=="undefined") {
            	hjprice = 0;
            }
            //得到子产品的合计实际应缴,有可能为空,需要判空
            var childHjprice = $("#childHjprice").val();
            if(childHjprice==null || typeof(childHjprice)=="undefined") {
            	childHjprice = 0;
            }
            //计算总的合计实际应缴
            var classPrice = Number(hjprice)+Number(childHjprice);
            //根据考期id和分校id查询价格
        	$.ajax({
                type: "POST",
                url: ctx + "/consultConsoleHC/toServer",
                async: false,
                data: {
                    infoManageId: $('#infoManageId2').val(),
                    status: status,
                    oldStatus:3,
                    classPrice:classPrice,
                    serverDateStr:ar["subscribeDate"],
                    schoolId: $('#schoolIdModel').find(':selected').val(),
                    schoolName: $('#schoolIdModel').find(':selected').text(),
                    content:JSON.stringify(ar),
                    productId:productId,
                    "childrenProduct.productId":childProductIdStr,
                    "childrenProduct.infoManageId":$('#infoManageId2').val()
                },
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                    	toastr.success('预约成功');
                    	//当预约成功时再向咨询记录中插入一条记录
                    	statusRemember($('#infoManageId2').val(), productId, 20, getNowFormatDate() + ":" + username + ":" +"转预约说明:"+$('#subscribeExplain').val());
//                    	//下面一条用于报表统计预约量时使用-后台有插入信息
//                    	statusRemember($('#infoManageId2').val(), 4, getNowFormatDate() + ":" + username + ":" +"转预约说明:"+$('#subscribeExplain').val(), new Date());
                        init2();
                        init3();
                        $('.bs-example-modal-lg1').modal('hide');
                        $('.subscribe').modal('hide');
                        
                        $('#myTab11').find('li.active a').click();
                    }else{
                    	toastr.error(msg.msg);
                    	$('.bs-example-modal-lg1').modal('hide');
                        $('.subscribe').modal('hide');
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


