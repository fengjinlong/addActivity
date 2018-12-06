$(function () {
    //多选框
    $(document).on('change', 'input:checkbox.checkAll', function () {
        if ($(this).prop('checked')) {
            $('input:checkbox.checkchild').prop('checked', 'checked');
        } else {
            $('input:checkbox.checkchild').prop('checked', '');
        }
    })
    // 短信类型选择
    $('#msgType').on('change', function () {
        var val = $(this).val().replace('address', $('#schoolIdModelMsg').find('option:selected').text());
        $('#showMsg').val(val)
    })

    //查看右侧固定按钮切换
    $('.right-toolbar a').hover(function () {
        $(this).find('.up').stop().fadeIn(400);
    }, function () {
        $(this).find('.up').stop().fadeOut(400);
    })

    //查看折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().toggle();
    })

    //弹窗层级
    $('.information').on('show.bs.modal', function () {
        $('.graduateStudents').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.graduateStudents').css('z-index', 1050);
    })
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("#schoolIdModelMsg").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });


    /**
     * 所有短信发送页面
     */
//    $('#graduateStudents').on('click', '.msg', function () {
//        var record = $(this).data('record');
//        $('#studentPhoneMsg').val(record.studentPhone);
//        $('#schoolIdModelMsg').find('option').remove();
//        $.ajax({
//            url: ctx + '/department/getAllOption',
//            type: 'POST',
//            data: {parentId: record.departmentId1},
//            dataType: 'json',
//            success: function (data) {
//                var opt = "";
//                for (var i = 0; i < data.list.length; i++) {
//                    opt += "<option address=\"" + data.list[i].description + "\" value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
//                }
//                $("#schoolIdModelMsg").html('<option value="">--请选择--</option>' + opt);
//            },
//            error: function (response) {
//                toastr.error("系统错误");
//            }
//        });
//    })
});

function search() {
    if (event.keyCode == 13)
        DataTable.init();
}

$("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#init tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
//初始化加载数据
DataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
};

function selectStudent(graduateStudentsId) {
    $('#tbodyInfo').find('tr').remove();
    $('#callInfo22').find('tr').remove();
    $('#callBackInfo22').find('tr').remove();
    $.ajax({
        url: ctx + '/graduateStudents/selectStudent',
        type: 'POST',
        data: {graduateStudentsId: graduateStudentsId},
        dataType: 'json',
        success: function (data) {
            var infoManageId = data.list[0].infoManageId;
            $.ajax({
                url: ctx + '/consultInfoManage/selectPeople',
                type: 'POST',
                data: {infoManageId: infoManageId},
                dataType: 'json',
                success: function (data) {
                    $('#headInfo').find('tr').remove();
                    
                    var stm = '';
                    if (data.list[0].studentMaturity == '1') {
                    	stm = 'A类';
                    }
                    if (data.list[0].studentMaturity == '2') {
                    	stm = 'B类';
                    }
                    if (data.list[0].studentMaturity == '3') {
                    	stm = 'C类';
                    }
                    if (data.list[0].studentMaturity == '4') {
                    	stm = 'D类';
                    }
                    
                    
                    var tr = "<tr><td>咨询分校：<span>" + data.list[0].departmentName3 + "</span></td>" +
                        "<td>品牌：<span id='brandNameDel'>" + data.list[0].brandName + "</span></td>" +
                        "<td>咨询者类型：<span>" + data.list[0].studentAttrName2 + "</span></td>" +
                        "<td>媒体类源：<span>" + data.list[0].studentAttrName1 + "</span></td>" +
                        "<td>客户成熟度：<span>" + stm + "</span>" +
                        "<input id='infoManageId' type='hidden' value=" + data.list[0].infoManageId + " />" +
//                     "<input id='sPriceHidCk' type='hidden' value=" + consultInfo.sPrice + " /></td></tr>";
                        "</td></tr>";
                    $('#headInfo').append(tr);
                    $('#graduateStudents input[name="studentName"]').val(data.list[0].studentName);
                    $('#graduateStudents select[name="studentSex"]').val(data.list[0].studentSex);
                    $('#graduateStudents input[name="age"]').val(data.list[0].age);
                    $('#graduateStudents input[name="studentPhone"]').val(data.list[0].studentPhone);
                    $('#graduateStudents input[name="email"]').val(data.list[0].email);
                    $('#graduateStudents input[name="departmentName3"]').val(data.list[0].departmentName3);
                    $('#graduateStudents input[name="weChat"]').val(data.list[0].weChat);
                    $('#graduateStudents input[name="tengXun"]').val(data.list[0].tengXun);
                    $('#graduateStudents input[name="ortherphone"]').val(data.list[0].ortherPhone);
                    
                    if (data.list[0].idcardType == '1') {
                        $('#graduateStudents input[name="idcardType"]').val('身份证');
                    } else {
                        $('#graduateStudents input[name="idcardType"]').val('护照');
                    }
                    
                    
                    $('#graduateStudents input[name="idcard"]').val(data.list[0].idcard);
                    
                    if (data.list[0].infoType == '0') {
                        $('#graduateStudents input[name="infoType"]').val('线上支付');
                    } else {
                    	$('#graduateStudents input[name="infoType"]').val('上门报名');
                    }
                    
                    $('#graduateStudents input[name="nation"]').val(data.list[0].nation);
                    $('#graduateStudents input[name="bySchool"]').val(data.list[0].bySchool);
                    
                    $('#graduateStudents input[name="highestEducation"]').val(data.list[0].highestEducation);
                    
                    $('#graduateStudents input[name="byZy"]').val(data.list[0].byZy);
                    $('#graduateStudents input[name="emergencyContact"]').val(data.list[0].emergencyContact);
                    $('#graduateStudents input[name="emergencyContactMode"]').val(data.list[0].emergencyContactMode);
                    $('#graduateStudents input[name="phoneaddress"]').val(data.list[0].phoneAddress);
                    $('#graduateStudents input[name="workspace"]').val(data.list[0].workSpace);
                    $('#graduateStudents input[name="projectName"]').val(data.list[0].projectName);
                    $('#graduateStudents input[name="projectLevelName"]').val(data.list[0].projectLevelName);
                    
                    $('#graduateStudents input[name="eduFrom"]').val(data.list[0].eduFrom == '1' ? '成考' : (data.list[0].eduFrom == '2' ? '自考' : '远程'));
                    
                    $('#graduateStudents input[name="bySchool"]').val(data.list[0].bySchool);
                    $('#graduateStudents input[name="byZy"]').val(data.list[0].byZy);
                    $('#graduateStudents input[name="ktimeValue"]').val(data.list[0].kTimeValue);
                    $('#graduateStudents input[name="classattr"]').val(data.list[0].classAttr);
                    $('#graduateStudents input[name="schoolFrom"]').val(data.list[0].schoolFrom);
                    $('#duanxin input[name="studentPhoneMsg"]').val(data.list[0].studentPhone);
                }
            });

            $.ajax({
                "url": ctx + '/financeGroupIncome/getStuPayDeatil/' + infoManageId,
                "cache": false,
                "dataType": 'json',
                "type": "POST",
                "success": function (data) {
                    var project = data.project;
                    var consultInfo = data.consultInfo;
                    var payInfoData = data.payInfoData;
                    $('#graduateStudents input[name="classprice"]').val(consultInfo.sumPrice);
                    if (project.projectType == '1') {
                        tbodyInfoZYJY(consultInfo, payInfoData);
                    } else {
                        tbodyInfoXueLi(consultInfo, payInfoData);
                    }
                }
            });


//        	$.ajax({
//        		url: ctx + '/consultInfoManagePay/load',
//                type: 'POST',
//                data: {infoManageId: infoManageId},
//                dataType: 'json',
//                success: function (data) {
//                	for(var i= 0 ;i<data.list.length;i++){
//                		var payy =data.list[i].payY;//优惠券     
//                		var pays =data.list[i].payS;//折扣券
//                		var paypx = data.list[i].payPx;
//                		var paykw =data.list[i].payKw;
//                		var payzl =data.list[i].payZl;
//                		var payxy =data.list[i].payXy;
//                		var payjc =data.list[i].payJc;
//                		var payfw =data.list[i].payFw;
//                		if(paypx==null){
//                			paypx=0;
//                		}if(payy==null){
//                			payy=0;
//                		}if(pays==null){
//                			pays=0;
//                		}if(paykw==null){
//                			paykw=0;
//                		}if(payzl==null){
//                			payzl=0;
//                		}if(payxy==null){
//                			payxy=0;
//                		}if(payjc==null){
//                			payjc=0;
//                		}if(payfw==null){
//                			payfw=0;
//                		}
//                		var yingsum = paypx+paykw+payzl+payxy+payjc+payfw-pays-payy;//应交
//                		var paydzxj = data.list[i].payDzXj;var paydzzp = data.list[i].payDzZp;
//                		var paydzsk = data.list[i].payDzSk;var paydzweixin = data.list[i].payDzWeixin;
//                		var paydzzfb = data.list[i].payDzZfb;var paydzwl = data.list[i].payDzWl;
//                		var paydzzz = data.list[i].payDzZz;var paydzfq = data.list[i].payDzFq;
//                		var paypxxj = data.list[i].payPxXj;var paypxzp = data.list[i].payPxZp;
//                		var paypxsk = data.list[i].payPxSk;var paypxweixin = data.list[i].payPxWeixin;
//                		var paypxzfb = data.list[i].payPxZfb;var paypxwl = data.list[i].payPxWl;
//                		var paypxzz = data.list[i].payPxZz;var paypxfq = data.list[i].payPxFq;
//                		var paykwxj = data.list[i].payKwXj;var paykwzp = data.list[i].payKwZp;
//                		var paykwsk = data.list[i].payKwSk;var paykwweixin = data.list[i].payKwWeixin;
//                		var paykwzfb = data.list[i].payKwZfb;var paykwwl = data.list[i].payKwWl;
//                		var paykwzz = data.list[i].payKwZz;var paykwfq = data.list[i].payKwFq;
//                		var payzlxj = data.list[i].payZlXj;var payzlzp = data.list[i].payZlZp;
//                		var payzlsk = data.list[i].payZlSk;var payzlsk = data.list[i].payZlSk;
//                		var payzlweixin = data.list[i].payZlWeixin;var payzlzfb = data.list[i].payZlZfb;
//                		var payzlwl = data.list[i].payZlWl;var payzlzz = data.list[i].payZlZz;
//                		var payzlfq = data.list[i].payZlFq;var payxyxj = data.list[i].payXyXj;
//                		var payxysk = data.list[i].payXySk;var payxyzp = data.list[i].payXyZp;
//                		var payxyweixin = data.list[i].payXyWeixin;var payxyzfb = data.list[i].payXyZfb;
//                		var payxywl = data.list[i].payXyWl;var payxyzz = data.list[i].payXyZz;
//                		var payxyfq = data.list[i].payXyFq;var payjcxj = data.list[i].payJcXj;
//                		var payjczp = data.list[i].payJcZp;var payjcsk = data.list[i].payJcSk;
//                		var payjcweixin = data.list[i].payJcWeixin;var payjczfb = data.list[i].payJcZfb;
//                		var payjcwl = data.list[i].payJcWl;var payjczz = data.list[i].payJcZz;
//                		var payjcfq = data.list[i].payJcFq;var payfwxj = data.list[i].payFwXj;
//                		var payfwzp = data.list[i].payFwZp;var payfwsk = data.list[i].payFwSk;
//                		var payfwweixin = data.list[i].payFwWeixin;var payfwzfb = data.list[i].payFwZfb;
//                		var payfwwl = data.list[i].payFwWl;var payfwzz = data.list[i].payFwZz;
//                		var payfwfq = data.list[i].payFwFq;
//                		var shisum =paydzxj+paydzzp+paydzsk+paydzweixin+paydzzfb+paydzwl+paydzzz+paydzfq+
//                					paypxxj+paypxzp+paypxsk+paypxweixin+paypxzfb+paypxwl+paypxzz+paypxfq+
//                					paykwxj+paykwzp+paykwsk+paykwweixin+paykwzfb+paykwwl+paykwzz+paykwfq+
//                					payzlxj+payzlzp+payzlsk+payzlsk+payzlweixin+payzlzfb+payzlwl+payzlzz+
//                					payzlfq+payxyxj+payxysk+payxyzp+payxyweixin+payxyzfb+payxywl+payxyzz+
//                					payxyfq+payjcxj+payjczp+payjcsk+payjcweixin+payjczfb+payjcwl+payjczz+
//                					payjcfq+payfwxj+payfwzp+payfwsk+payfwweixin+payfwzfb+payfwwl+payfwzz+payfwfq;//实交
//                		var qian = yingsum-shisum;
//                		if(qian<0){
//                			qian= 0;
//                		}
//                		var trI = "<tr><td>"+ data.list[i].consultInfoManage.projectName+"</td>"+
//                		"<td>"+yingsum+"</td>"+
//                		"<td>"+shisum+"</td>"+
//                		"<td>"+data.list[i].payFrom+"</td>"+
//                		"<td>"+qian+"</td></tr>";
//                		$('#tbodyInfo').append(trI);
//                	
//                	}
//                }
//        	});
            $.ajax({
                url: ctx + '/consultInfoManage/selectPeople',
                type: 'POST',
                data: {infoManageId: infoManageId},
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.list.length; i++) {
                        var tro = "<tr><td>" + data.list[i].conversation + "</td></tr>";
                        $('#callInfo22').append(tro);
                    }
                }
            });
            $.ajax({
                url: ctx + '/consultInfoManageServer/load',
                type: 'POST',
                data: {infoManageId: infoManageId, status: 20},
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.list.length; i++) {
                        var trp = "<tr><td>" + data.list[i].content + "</td></tr>";
                        $('#callBackInfo22').append(trp);
                    }
                }
            });
        }
    });
}

//缴费信息  定坐费算在培训费里  职业教育
function tbodyInfoZYJY(consultInfo, payInfoData) {
    function payKind() {
        return {dz: 0, px: 0, xy: 0, kw: 0, jc: 0, zl: 0, fw: 0};
    }

    $('#coursePrice').html('');
    var payDZ = 0, payPx = 0, payKw = 0, payZl = 0, payXy = 0, payJc = 0, payFw = 0, payY = 0, payZk = 0, coursePrice = 0, totalPrice = 0;
    $(payInfoData).each(function (i, item) {
        payDZ += parseFloat((item.payDZ ? item.payDZ : 0));
        payPx += parseFloat((item.payPx ? item.payPx : 0));
        payKw += parseFloat((item.payKw ? item.payKw : 0));
        payZl += parseFloat((item.payZl ? item.payZl : 0));
        payXy += parseFloat((item.payXy ? item.payXy : 0));
        payJc += parseFloat((item.payJc ? item.payJc : 0));
        payFw += parseFloat((item.payFw ? item.payFw : 0));
        payY += parseFloat((item.payY ? item.payY : 0));
        payZk += parseFloat((item.payS ? item.payS : 0));
    });
    payPx += payDZ;//  定坐费算在培训费里
    totalPrice = parseFloat(payDZ + payPx + payKw + payZl + payXy + payJc + payFw);
    coursePrice = parseFloat(totalPrice - payY - payZk);//课程价格、实缴
    $('#coursePrice').val(coursePrice);
    var dzsjArr = new Array(), pxsjArr = new Array(), xysjArr = new Array();//记录每次实缴
    var kwsjArr = new Array(), jcsjArr = new Array(), zlsjArr = new Array(), fwsjArr = new Array();
    $(payInfoData).each(function (i, item) {
        //定坐费
        var dzsj = (parseFloat((item.payDzXj ? item.payDzXj : 0)) + parseFloat((item.payDzZp ? item.payDzZp : 0)) + parseFloat((item.payDzSk ? item.payDzSk : 0))
        + (parseFloat(item.payDzWeixin ? item.payDzWeixin : 0)) + parseFloat((item.payDzZfb ? item.payDzZfb : 0)) + parseFloat((item.payDzWl ? item.payDzWl : 0))
        + (parseFloat(item.payDzZz ? item.payDzZz : 0)) + (parseFloat(item.payDzFq ? item.payDzFq : 0)));
        dzsjArr.push(parseFloat(dzsj));
        //培训费
        var pxsj = ((parseFloat(item.payPxXj ? item.payPxXj : 0)) + (parseFloat(item.payPxZp ? item.payPxZp : 0)) + (parseFloat(item.payPxSk ? item.payPxSk : 0))
        + (parseFloat(item.payPxWeixin ? item.payPxWeixin : 0)) + (parseFloat(item.payPxZfb ? item.payPxZfb : 0)) + (parseFloat(item.payPxWl ? item.payPxWl : 0))
        + (parseFloat(item.payPxZz ? item.payPxZz : 0)) + (parseFloat(item.payPxFq ? item.payPxFq : 0)));
        pxsjArr.push(parseFloat(pxsj));
        //协议费
        var xysj = ((parseFloat(item.payXyXj ? item.payXyXj : 0)) + (parseFloat(item.payXyZp ? item.payXyZp : 0)) + (parseFloat(item.payXySk ? item.payXySk : 0))
        + (parseFloat(item.payXyWeixin ? item.payXyWeixin : 0)) + (parseFloat(item.payXyZfb ? item.payXyZfb : 0)) + (parseFloat(item.payXyWl ? item.payXyWl : 0))
        + (parseFloat(item.payXyZz ? item.payXyZz : 0)) + (parseFloat(item.payXyFq ? item.payXyFq : 0)));
        xysjArr.push(parseFloat(xysj));
        //服务费
        var fwsj = (parseFloat((item.payFwXj ? item.payFwXj : 0)) + (parseFloat(item.payFwZp ? item.payFwZp : 0)) + (parseFloat(item.payFwSk ? item.payFwSk : 0))
        + (parseFloat(item.payFwWeixin ? item.payFwWeixin : 0)) + (parseFloat(item.payFwZfb ? item.payFwZfb : 0)) + (parseFloat(item.payFwWl ? item.payFwWl : 0))
        + (parseFloat(item.payFwZz ? item.payFwZz : 0)) + (parseFloat(item.payFwFq ? item.payFwFq : 0)));
        fwsjArr.push(parseFloat(fwsj));
        //教材费
        var jcsj = ((parseFloat(item.payJcXj ? item.payJcXj : 0)) + (parseFloat(item.payJcZp ? item.payJcZp : 0)) + (parseFloat(item.payJcSk ? item.payJcSk : 0))
        + (parseFloat(item.payJcWeixin ? item.payJcWeixin : 0)) + (parseFloat(item.payJcZfb ? item.payJcZfb : 0)) + (parseFloat(item.payJcWl ? item.payJcWl : 0))
        + (parseFloat(item.payJcZz ? item.payJcZz : 0)) + (parseFloat(item.payJcFq ? item.payJcFq : 0)));
        jcsjArr.push(parseFloat(jcsj));
        //资料费
        var zlsj = ((parseFloat(item.payZlXj ? item.payZlXj : 0)) + (parseFloat(item.payZlZp ? item.payZlZp : 0)) + (parseFloat(item.payZlSk ? item.payZlSk : 0))
        + (parseFloat(item.payZlWeixin ? item.payZlWeixin : 0)) + (parseFloat(item.payZlZfb ? item.payZlZfb : 0)) + (parseFloat(item.payZlWl ? item.payZlWl : 0))
        + (parseFloat(item.payZlZz ? item.payZlZz : 0)) + (parseFloat(item.payZlFq ? item.payZlFq : 0)));
        zlsjArr.push(parseFloat(zlsj));
        //考务费
        var kwsj = ((parseFloat(item.payKwXj ? item.payKwXj : 0)) + (parseFloat(item.payKwZp ? item.payKwZp : 0)) + (parseFloat(item.payKwSk ? item.payKwSk : 0))
        + (parseFloat(item.payKwWeixin ? item.payKwWeixin : 0)) + (parseFloat(item.payKwZfb ? item.payKwZfb : 0)) + (parseFloat(item.payKwWl ? item.payKwWl : 0))
        + (parseFloat(item.payKwZz ? item.payKwZz : 0)) + (parseFloat(item.payKwFq ? item.payKwFq : 0)));
        kwsjArr.push(parseFloat(kwsj));
    });
    //按不同缴费方式统计
    var xjKind = new payKind(), zpKind = new payKind(), skKind = new payKind(), weixinKind = new payKind();
    var wlKind = new payKind(), zfbKind = new payKind(), zzKind = new payKind(), fqKind = new payKind();
    $(payInfoData).each(function (i, item) {
        xjKind.dz += parseFloat((item.payDzXj ? item.payDzXj : 0));
        xjKind.px += parseFloat((item.payPxXj ? item.payPxXj : 0));
        xjKind.xy += parseFloat((item.payXyXj ? item.payXyXj : 0));
        xjKind.jc += parseFloat((item.payJcXj ? item.payJcXj : 0));
        xjKind.fw += parseFloat((item.payFwXj ? item.payFwXj : 0));
        xjKind.zl += parseFloat((item.payZlXj ? item.payZlXj : 0));
        xjKind.kw += parseFloat((item.payKwXj ? item.payKwXj : 0));

        zpKind.dz += parseFloat((item.payDzZp ? item.payDzZp : 0));
        zpKind.px += parseFloat((item.payPxZp ? item.payPxZp : 0));
        zpKind.xy += parseFloat((item.payXyZp ? item.payXyZp : 0));
        zpKind.jc += parseFloat((item.payJcZp ? item.payJcZp : 0));
        zpKind.fw += parseFloat((item.payFwZp ? item.payFwZp : 0));
        zpKind.zl += parseFloat((item.payZlZp ? item.payZlZp : 0));
        zpKind.kw += parseFloat((item.payKwZp ? item.payKwZp : 0));

        skKind.dz += parseFloat((item.payDzSk ? item.payDzSk : 0));
        skKind.px += parseFloat((item.payPxSk ? item.payPxSk : 0));
        skKind.xy += parseFloat((item.payXySk ? item.payXySk : 0));
        skKind.jc += parseFloat((item.payJcSk ? item.payJcSk : 0));
        skKind.fw += parseFloat((item.payFwSk ? item.payFwSk : 0));
        skKind.zl += parseFloat((item.payZlSk ? item.payZlSk : 0));
        skKind.kw += parseFloat((item.payKwSk ? item.payKwSk : 0));

        weixinKind.dz += parseFloat((item.payDzWeixin ? item.payDzWeixin : 0));
        weixinKind.px += parseFloat((item.payPxWeixin ? item.payPxWeixin : 0));
        weixinKind.xy += parseFloat((item.payXyWeixin ? item.payXyWeixin : 0));
        weixinKind.jc += parseFloat((item.payJcWeixin ? item.payJcWeixin : 0));
        weixinKind.fw += parseFloat((item.payFwWeixin ? item.payFwWeixin : 0));
        weixinKind.zl += parseFloat((item.payZlWeixin ? item.payZlWeixin : 0));
        weixinKind.kw += parseFloat((item.payKwWeixin ? item.payKwWeixin : 0));

        wlKind.dz += parseFloat((item.payDzWl ? item.payDzWl : 0));
        wlKind.px += parseFloat((item.payPxWl ? item.payPxWl : 0));
        wlKind.xy += parseFloat((item.payXyWl ? item.payXyWl : 0));
        wlKind.jc += parseFloat((item.payJcWl ? item.payJcWl : 0));
        wlKind.fw += parseFloat((item.payFwWl ? item.payFwWl : 0));
        wlKind.zl += parseFloat((item.payZlWl ? item.payZlWl : 0));
        wlKind.kw += parseFloat((item.payKwWl ? item.payKwWl : 0));

        zfbKind.dz += parseFloat((item.payDzZfb ? item.payDzZfb : 0));
        zfbKind.px += parseFloat((item.payPxZfb ? item.payPxZfb : 0));
        zfbKind.xy += parseFloat((item.payXyZfb ? item.payXyZfb : 0));
        zfbKind.jc += parseFloat((item.payJcZfb ? item.payJcZfb : 0));
        zfbKind.fw += parseFloat((item.payFwZfb ? item.payFwZfb : 0));
        zfbKind.zl += parseFloat((item.payZlZfb ? item.payZlZfb : 0));
        zfbKind.kw += parseFloat((item.payKwZfb ? item.payKwZfb : 0));

        zzKind.dz += parseFloat((item.payDzZz ? item.payDzZz : 0));
        zzKind.px += parseFloat((item.payPxZz ? item.payPxZz : 0));
        zzKind.xy += parseFloat((item.payXyZz ? item.payXyZz : 0));
        zzKind.jc += parseFloat((item.payJcZz ? item.payJcZz : 0));
        zzKind.fw += parseFloat((item.payFwZz ? item.payFwZz : 0));
        zzKind.zl += parseFloat((item.payZlZz ? item.payZlZz : 0));
        zzKind.kw += parseFloat((item.payKwZz ? item.payKwZz : 0));

        fqKind.dz += parseFloat((item.payDzFq ? item.payDzFq : 0));
        fqKind.px += parseFloat((item.payPxFq ? item.payPxFq : 0));
        fqKind.xy += parseFloat((item.payXyFq ? item.payXyFq : 0));
        fqKind.jc += parseFloat((item.payJcFq ? item.payJcFq : 0));
        fqKind.fw += parseFloat((item.payFwFq ? item.payFwFq : 0));
        fqKind.zl += parseFloat((item.payZlFq ? item.payZlFq : 0));
        fqKind.kw += parseFloat((item.payKwFq ? item.payKwFq : 0));


    });


    var PXSj = 0;
    $(pxsjArr).each(function (i, item) {
        PXSj += (item + dzsjArr[i]);
    });
    var PXTr = '<tr><td>培训费</td><td>' + (payPx) + '</td><td>' + PXSj + '</td>';
    PXTr += '<td>';
    if ((xjKind.dz + xjKind.px) > 0) PXTr += ('<span>现金：<span>' + (xjKind.dz + xjKind.px) + '<br/>');
    if ((zpKind.dz + zpKind.px) > 0) PXTr += ('<span>支票：<span>' + (zpKind.dz + zpKind.px) + '<br/>');
    if ((skKind.dz + skKind.px) > 0) PXTr += ('<span>刷卡：<span>' + (skKind.dz + skKind.px) + '<br/>');
    if ((weixinKind.dz + weixinKind.px) > 0) PXTr += ('<span>微信：<span>' + (weixinKind.dz + weixinKind.px) + '<br/>');
    if ((zfbKind.dz + zfbKind.px) > 0) PXTr += ('<span>支付宝：<span>' + (zfbKind.dz + zfbKind.px) + '<br/>');
    if ((wlKind.dz + wlKind.px) > 0) PXTr += ('<span>网络：<span>' + (wlKind.dz + wlKind.px) + '<br/>');
    if ((zzKind.dz + zzKind.px) > 0) PXTr += ('<span>银行转账：<span>' + (zzKind.dz + zzKind.px) + '<br/>');
    if ((fqKind.dz + fqKind.px) > 0) PXTr += ('<span>分期：<span>' + (fqKind.dz + fqKind.px));
    PXTr += '</td>';
    PXTr += '<td>' + (payPx - PXSj) + '</td></tr>';

    var KWSj = 0;
    $(kwsjArr).each(function (i, item) {
        KWSj += (item);
    });
    var KWTr = '<tr><td>考务费</td><td>' + payKw + '</td><td>' + KWSj + '</td>';
    KWTr += '<td>';
    if ((xjKind.kw) > 0) KWTr += ('<span>现金：<span>' + (xjKind.kw) + '<br/>');
    if ((zpKind.kw) > 0) KWTr += ('<span>支票：<span>' + (zpKind.kw) + '<br/>');
    if ((skKind.kw) > 0) KWTr += ('<span>刷卡：<span>' + (skKind.kw) + '<br/>');
    if ((weixinKind.kw) > 0) KWTr += ('<span>微信：<span>' + (weixinKind.kw) + '<br/>');
    if ((zfbKind.kw) > 0) KWTr += ('<span>支付宝：<span>' + (zfbKind.kw) + '<br/>');
    if ((wlKind.kw) > 0) KWTr += ('<span>网络：<span>' + (wlKind.kw) + '<br/>');
    if ((zzKind.kw) > 0) KWTr += ('<span>银行转账：<span>' + (zzKind.kw) + '<br/>');
    if ((fqKind.kw) > 0) KWTr += ('<span>分期：<span>' + (fqKind.kw));
    KWTr += '</td>';
    KWTr += '<td>' + (payKw - KWSj) + '</td></tr>';

    var ZLSj = 0;
    $(zlsjArr).each(function (i, item) {
        ZLSj += (item);
    });
    var ZLTr = '<tr><td>资料费</td><td>' + payZl + '</td><td>' + ZLSj + '</td>';
    ZLTr += '<td>';
    if ((xjKind.zl) > 0) ZLTr += ('<span>现金：<span>' + (xjKind.zl) + '<br/>');
    if ((zpKind.zl) > 0) ZLTr += ('<span>支票：<span>' + (zpKind.zl) + '<br/>');
    if ((skKind.zl) > 0) ZLTr += ('<span>刷卡：<span>' + (skKind.zl) + '<br/>');
    if ((weixinKind.zl) > 0) ZLTr += ('<span>微信：<span>' + (weixinKind.zl) + '<br/>');
    if ((zfbKind.zl) > 0) ZLTr += ('<span>支付宝：<span>' + (zfbKind.zl) + '<br/>');
    if ((wlKind.zl) > 0) ZLTr += ('<span>网络：<span>' + (wlKind.zl) + '<br/>');
    if ((zzKind.zl) > 0) ZLTr += ('<span>银行转账：<span>' + (zzKind.zl) + '<br/>');
    if ((fqKind.zl) > 0) ZLTr += ('<span>分期：<span>' + (fqKind.zl));
    ZLTr += '</td>';
    ZLTr += '<td>' + (payZl - ZLSj) + '</td></tr>';

    var XYSj = 0;
    $(xysjArr).each(function (i, item) {
        XYSj += (item);
    });
    var XYTr = '<tr><td>协议费</td><td>' + payXy + '</td><td>' + XYSj + '</td>';
    XYTr += '<td>';
    if ((xjKind.xy) > 0) XYTr += ('<span>现金：<span>' + (xjKind.xy) + '<br/>');
    if ((zpKind.xy) > 0) XYTr += ('<span>支票：<span>' + (zpKind.xy) + '<br/>');
    if ((skKind.xy) > 0) XYTr += ('<span>刷卡：<span>' + (skKind.xy) + '<br/>');
    if ((weixinKind.xy) > 0) XYTr += ('<span>微信：<span>' + (weixinKind.xy) + '<br/>');
    if ((zfbKind.xy) > 0) XYTr += ('<span>支付宝：<span>' + (zfbKind.xy) + '<br/>');
    if ((wlKind.xy) > 0) XYTr += ('<span>网络：<span>' + (wlKind.xy) + '<br/>');
    if ((zzKind.xy) > 0) XYTr += ('<span>银行转账：<span>' + (zzKind.xy) + '<br/>');
    if ((fqKind.xy) > 0) XYTr += ('<span>分期：<span>' + (fqKind.xy));
    XYTr += '</td>';
    XYTr += '<td>' + (payXy - XYSj) + '</td></tr>';

    var JCSj = 0;
    $(jcsjArr).each(function (i, item) {
        JCSj += (item);
    });
    var JCTr = '<tr><td>教材费</td><td>' + payJc + '</td><td>' + JCSj + '</td>';
    JCTr += '<td>';
    if ((xjKind.jc) > 0) JCTr += ('<span>现金：<span>' + (xjKind.jc) + '<br/>');
    if ((zpKind.jc) > 0) JCTr += ('<span>支票：<span>' + (zpKind.jc) + '<br/>');
    if ((skKind.jc) > 0) JCTr += ('<span>刷卡：<span>' + (skKind.jc) + '<br/>');
    if ((weixinKind.jc) > 0) JCTr += ('<span>微信：<span>' + (weixinKind.jc) + '<br/>');
    if ((zfbKind.jc) > 0) JCTr += ('<span>支付宝：<span>' + (zfbKind.jc) + '<br/>');
    if ((wlKind.jc) > 0) JCTr += ('<span>网络：<span>' + (wlKind.jc) + '<br/>');
    if ((zzKind.jc) > 0) JCTr += ('<span>银行转账：<span>' + (zzKind.jc) + '<br/>');
    if ((fqKind.jc) > 0) JCTr += ('<span>分期：<span>' + (fqKind.jc));
    JCTr += '</td>';
    JCTr += '<td>' + (payJc - JCSj) + '</td></tr>';

    var FWSj = 0;
    $(fwsjArr).each(function (i, item) {
        FWSj += (item);
    });
    var FWTr = '<tr><td>服务费</td><td>' + payFw + '</td><td>' + FWSj + '</td>';
    FWTr += '<td>';
    if ((xjKind.fw) > 0) FWTr += ('<span>现金：<span>' + (xjKind.fw) + '<br/>');
    if ((zpKind.fw) > 0) FWTr += ('<span>支票：<span>' + (zpKind.fw) + '<br/>');
    if ((skKind.fw) > 0) FWTr += ('<span>刷卡：<span>' + (skKind.fw) + '<br/>');
    if ((weixinKind.fw) > 0) FWTr += ('<span>微信：<span>' + (weixinKind.fw) + '<br/>');
    if ((zfbKind.fw) > 0) FWTr += ('<span>支付宝：<span>' + (zfbKind.fw) + '<br/>');
    if ((wlKind.fw) > 0) FWTr += ('<span>网络：<span>' + (wlKind.fw) + '<br/>');
    if ((zzKind.fw) > 0) FWTr += ('<span>银行转账：<span>' + (zzKind.fw) + '<br/>');
    if ((fqKind.fw) > 0) FWTr += ('<span>分期：<span>' + (fqKind.fw));
    FWTr += '</td>';
    FWTr += '<td>' + (payFw - FWSj) + '</td></tr>';

    var ZJTr = '<tr><td>总计</td><td>' + (payPx + payKw + payZl + payXy + payJc + payFw) + '</td>';
    ZJTr += '<td>' + (PXSj + KWSj + ZLSj + XYSj + JCSj + FWSj) + '</td><td></td><td></td></tr>';
    var YHTr = '<tr><td>优惠券</td><td>' + payY + '</td><td></td><td></td><td></td></tr>';
    var ZKTr = '<tr><td>折扣</td><td>' + payZk + '</td><td></td><td></td><td></td></tr>';
    var HJTr = '<tr><td>合计</td><td>' + (payPx + payKw + payZl + payXy + payJc + payFw - payY - payZk) + '</td>';
    HJTr += '<td>' + (PXSj + KWSj + ZLSj + XYSj + JCSj + FWSj) + '</td><td></td>';
    HJTr += '<td>' + (payPx + payKw + payZl + payXy + payJc + payFw - payY - payZk - PXSj - KWSj - ZLSj - XYSj - JCSj - FWSj) + '</td></tr>';
    var thead = '<table id="appendPayBody1" class="table table-striped table-hover table-bordered dataTable no-footer text-center"><thead><tr><th>收费项目</th><th>应缴</th><th>实缴</th><th>支付方式</th><th>欠费</th></tr></thead>';
    var theadEnd = '</table>';
    $('#tbodyInfo').append(thead + PXTr + KWTr + ZLTr + XYTr + JCTr + FWTr + ZJTr + YHTr + ZKTr + HJTr + theadEnd);
}

//缴费信息  定坐费算在培训费里    学历
function tbodyInfoXueLi(consultInfo, payInfoData) {
    function payKind() {
        return {dz: 0, xz: 0, ks: 0, zl: 0, jc: 0, dg: 0};
    }

    $('#tbodyInfo').html('');
    var payDZ = 0, payXz = 0, payKs = 0, payZl = 0, payJc = 0, payDg = 0, payFd = 0, payY = 0, payZk = 0, coursePrice = 0, totalPrice = 0;
    $(payInfoData).each(function (i, item) {
        payDZ += parseFloat((item.payDZ ? item.payDZ : 0));
        payXz += parseFloat((item.payPx ? item.payPx : 0));
        payKs += parseFloat((item.payKw ? item.payKw : 0));
        payZl += parseFloat((item.payZl ? item.payZl : 0));
        payJc += parseFloat((item.payXy ? item.payXy : 0));
        payDg += parseFloat((item.payJc ? item.payJc : 0));
        payFd += parseFloat((item.payType ? item.payType : 0));
        payY += parseFloat((item.payY ? item.payY : 0));
        payZk += parseFloat((item.payS ? item.payS : 0));
    });
    payXz += payDZ;//  定坐费算在培训费里
    totalPrice = parseFloat(payDZ + payXz + payKs + payZl + payJc + payDg + payFd);
    coursePrice = parseFloat(totalPrice - payY - payZk);//课程价格、应缴
    $('#coursePrice').val(coursePrice);
    var dzsjArr = new Array(), xzsjArr = new Array(), kssjArr = new Array();//记录每次实缴
    var zlsjArr = new Array(), jcsjArr = new Array(), dgsjArr = new Array();
    $(payInfoData).each(function (i, item) {
        //定坐费
        var dzsj = (parseFloat((item.payDzXj ? item.payDzXj : 0)) + parseFloat((item.payDzZp ? item.payDzZp : 0)) + parseFloat((item.payDzSk ? item.payDzSk : 0))
        + (parseFloat(item.payDzWeixin ? item.payDzWeixin : 0)) + parseFloat((item.payDzZfb ? item.payDzZfb : 0)) + parseFloat((item.payDzWl ? item.payDzWl : 0))
        + (parseFloat(item.payDzZz ? item.payDzZz : 0)) + (parseFloat(item.payDzFq ? item.payDzFq : 0)));
        dzsjArr.push(parseFloat(dzsj));
        //学杂费
        var xzsj = ((parseFloat(item.payPxXj ? item.payPxXj : 0)) + (parseFloat(item.payPxZp ? item.payPxZp : 0)) + (parseFloat(item.payPxSk ? item.payPxSk : 0))
        + (parseFloat(item.payPxWeixin ? item.payPxWeixin : 0)) + (parseFloat(item.payPxZfb ? item.payPxZfb : 0)) + (parseFloat(item.payPxWl ? item.payPxWl : 0))
        + (parseFloat(item.payPxZz ? item.payPxZz : 0)) + (parseFloat(item.payPxFq ? item.payPxFq : 0)));
        xzsjArr.push(parseFloat(xzsj));
        //考试费
        var kssj = ((parseFloat(item.payKwXj ? item.payKwXj : 0)) + (parseFloat(item.payKwZp ? item.payKwZp : 0)) + (parseFloat(item.payKwSk ? item.payKwSk : 0))
        + (parseFloat(item.payKwWeixin ? item.payKwWeixin : 0)) + (parseFloat(item.payKwZfb ? item.payKwZfb : 0)) + (parseFloat(item.payKwWl ? item.payKwWl : 0))
        + (parseFloat(item.payKwZz ? item.payKwZz : 0)) + (parseFloat(item.payKwFq ? item.payKwFq : 0)));
        kssjArr.push(parseFloat(kssj));
        //资料费
        var zlsj = ((parseFloat(item.payZlXj ? item.payZlXj : 0)) + (parseFloat(item.payZlZp ? item.payZlZp : 0)) + (parseFloat(item.payZlSk ? item.payZlSk : 0))
        + (parseFloat(item.payZlWeixin ? item.payZlWeixin : 0)) + (parseFloat(item.payZlZfb ? item.payZlZfb : 0)) + (parseFloat(item.payZlWl ? item.payZlWl : 0))
        + (parseFloat(item.payZlZz ? item.payZlZz : 0)) + (parseFloat(item.payZlFq ? item.payZlFq : 0)));
        zlsjArr.push(parseFloat(zlsj));
        //教材费
        var jcsj = ((parseFloat(item.payXyXj ? item.payXyXj : 0)) + (parseFloat(item.payXyZp ? item.payXyZp : 0)) + (parseFloat(item.payXySk ? item.payXySk : 0))
        + (parseFloat(item.payXyWeixin ? item.payXyWeixin : 0)) + (parseFloat(item.payXyZfb ? item.payXyZfb : 0)) + (parseFloat(item.payXyWl ? item.payXyWl : 0))
        + (parseFloat(item.payXyZz ? item.payXyZz : 0)) + (parseFloat(item.payXyFq ? item.payXyFq : 0)));
        jcsjArr.push(parseFloat(jcsj));
        //代管费
        var dgsj = ((parseFloat(item.payJcXj ? item.payJcXj : 0)) + (parseFloat(item.payJcZp ? item.payJcZp : 0)) + (parseFloat(item.payJcSk ? item.payJcSk : 0))
        + (parseFloat(item.payJcWeixin ? item.payJcWeixin : 0)) + (parseFloat(item.payJcZfb ? item.payJcZfb : 0)) + (parseFloat(item.payJcWl ? item.payJcWl : 0))
        + (parseFloat(item.payJcZz ? item.payJcZz : 0)) + (parseFloat(item.payJcFq ? item.payJcFq : 0)));
        dgsjArr.push(parseFloat(dgsj));
    });
    //按不同缴费方式统计
    var xjKind = new payKind(), zpKind = new payKind(), skKind = new payKind(), weixinKind = new payKind();
    var wlKind = new payKind(), zfbKind = new payKind(), zzKind = new payKind(), fqKind = new payKind();
    $(payInfoData).each(function (i, item) {
        xjKind.dz += parseFloat((item.payDzXj ? item.payDzXj : 0));
        xjKind.xz += parseFloat((item.payPxXj ? item.payPxXj : 0));
        xjKind.dg += parseFloat((item.payJcXj ? item.payJcXj : 0));
        xjKind.jc += parseFloat((item.payXyXj ? item.payXyXj : 0));
        xjKind.zl += parseFloat((item.payZlXj ? item.payZlXj : 0));
        xjKind.ks += parseFloat((item.payKwXj ? item.payKwXj : 0));

        zpKind.dz += parseFloat((item.payDzZp ? item.payDzZp : 0));
        zpKind.xz += parseFloat((item.payPxZp ? item.payPxZp : 0));
        zpKind.dg += parseFloat((item.payJcZp ? item.payJcZp : 0));
        zpKind.jc += parseFloat((item.payXyZp ? item.payXyZp : 0));
        zpKind.zl += parseFloat((item.payZlZp ? item.payZlZp : 0));
        zpKind.ks += parseFloat((item.payKwZp ? item.payKwZp : 0));

        skKind.dz += parseFloat((item.payDzSk ? item.payDzSk : 0));
        skKind.xz += parseFloat((item.payPxSk ? item.payPxSk : 0));
        skKind.dg += parseFloat((item.payJcSk ? item.payJcSk : 0));
        skKind.jc += parseFloat((item.payXySk ? item.payXySk : 0));
        skKind.zl += parseFloat((item.payZlSk ? item.payZlSk : 0));
        skKind.ks += parseFloat((item.payKwSk ? item.payKwSk : 0));

        weixinKind.dz += parseFloat((item.payDzWeixin ? item.payDzWeixin : 0));
        weixinKind.xz += parseFloat((item.payPxWeixin ? item.payPxWeixin : 0));
        weixinKind.dg += parseFloat((item.payJcWeixin ? item.payJcWeixin : 0));
        weixinKind.jc += parseFloat((item.payXyWeixin ? item.payXyWeixin : 0));
        weixinKind.zl += parseFloat((item.payZlWeixin ? item.payZlWeixin : 0));
        weixinKind.ks += parseFloat((item.payKwWeixin ? item.payKwWeixin : 0));

        wlKind.dz += parseFloat((item.payDzWl ? item.payDzWl : 0));
        wlKind.xz += parseFloat((item.payPxWl ? item.payPxWl : 0));
        wlKind.dg += parseFloat((item.payJcWl ? item.payJcWl : 0));
        wlKind.jc += parseFloat((item.payXyWl ? item.payXyWl : 0));
        wlKind.zl += parseFloat((item.payZlWl ? item.payZlWl : 0));
        wlKind.ks += parseFloat((item.payKwWl ? item.payKwWl : 0));

        zfbKind.dz += parseFloat((item.payDzZfb ? item.payDzZfb : 0));
        zfbKind.xz += parseFloat((item.payPxZfb ? item.payPxZfb : 0));
        zfbKind.dg += parseFloat((item.payJcZfb ? item.payJcZfb : 0));
        zfbKind.jc += parseFloat((item.payXyZfb ? item.payXyZfb : 0));
        zfbKind.zl += parseFloat((item.payZlZfb ? item.payZlZfb : 0));
        zfbKind.ks += parseFloat((item.payKwZfb ? item.payKwZfb : 0));

        zzKind.dz += parseFloat((item.payDzZz ? item.payDzZz : 0));
        zzKind.xz += parseFloat((item.payPxZz ? item.payPxZz : 0));
        zzKind.dg += parseFloat((item.payJcZz ? item.payJcZz : 0));
        zzKind.jc += parseFloat((item.payXyZz ? item.payXyZz : 0));
        zzKind.zl += parseFloat((item.payZlZz ? item.payZlZz : 0));
        zzKind.ks += parseFloat((item.payKwZz ? item.payKwZz : 0));

        fqKind.dz += parseFloat((item.payDzFq ? item.payDzFq : 0));
        fqKind.xz += parseFloat((item.payPxFq ? item.payPxFq : 0));
        fqKind.dg += parseFloat((item.payJcFq ? item.payJcFq : 0));
        fqKind.jc += parseFloat((item.payXyFq ? item.payXyFq : 0));
        fqKind.zl += parseFloat((item.payZlFq ? item.payZlFq : 0));
        fqKind.ks += parseFloat((item.payKwFq ? item.payKwFq : 0));

    });

    var XZSj = 0;
    $(xzsjArr).each(function (i, item) {
        XZSj += (item + dzsjArr[i]);
    });
    var XZTr = '<tr><td>学杂费</td><td>' + (payXz) + '</td><td>' + XZSj + '</td>';
    XZTr += '<td>';
    if ((xjKind.dz + xjKind.xz) > 0) XZTr += ('<span>现金：<span>' + (xjKind.dz + xjKind.xz) + '<br/>');
    if ((zpKind.dz + zpKind.xz) > 0) XZTr += ('<span>支票：<span>' + (zpKind.dz + zpKind.xz) + '<br/>');
    if ((skKind.dz + skKind.xz) > 0) XZTr += ('<span>刷卡：<span>' + (skKind.dz + skKind.xz) + '<br/>');
    if ((weixinKind.dz + weixinKind.xz) > 0) XZTr += ('<span>微信：<span>' + (weixinKind.dz + weixinKind.xz) + '<br/>');
    if ((zfbKind.dz + zfbKind.xz) > 0) XZTr += ('<span>支付宝：<span>' + (zfbKind.dz + zfbKind.xz) + '<br/>');
    if ((wlKind.dz + wlKind.xz) > 0) XZTr += ('<span>网络：<span>' + (wlKind.dz + wlKind.xz) + '<br/>');
    if ((zzKind.dz + zzKind.xz) > 0) XZTr += ('<span>银行转账：<span>' + (zzKind.dz + zzKind.xz) + '<br/>');
    if ((fqKind.dz + fqKind.xz) > 0) XZTr += ('<span>分期：<span>' + (fqKind.dz + fqKind.xz));
    XZTr += '</td>';
    XZTr += '<td>' + (payXz - XZSj) + '</td></tr>';

    var KSSj = 0;
    $(kssjArr).each(function (i, item) {
        KSSj += (item);
    });
    var KSTr = '<tr><td>考试费</td><td>' + payKs + '</td><td>' + KSSj + '</td>';
    KSTr += '<td>';
    if ((xjKind.ks) > 0) KSTr += ('<span>现金：<span>' + (xjKind.ks) + '<br/>');
    if ((zpKind.ks) > 0) KSTr += ('<span>支票：<span>' + (zpKind.ks) + '<br/>');
    if ((skKind.ks) > 0) KSTr += ('<span>刷卡：<span>' + (skKind.ks) + '<br/>');
    if ((weixinKind.ks) > 0) KSTr += ('<span>微信：<span>' + (weixinKind.ks) + '<br/>');
    if ((zfbKind.ks) > 0) KSTr += ('<span>支付宝：<span>' + (zfbKind.ks) + '<br/>');
    if ((wlKind.ks) > 0) KSTr += ('<span>网络：<span>' + (wlKind.ks) + '<br/>');
    if ((zzKind.ks) > 0) KSTr += ('<span>银行转账：<span>' + (zzKind.ks) + '<br/>');
    if ((fqKind.ks) > 0) KSTr += ('<span>分期：<span>' + (fqKind.ks));
    KSTr += '</td>';
    KSTr += '<td>' + (payKs - KSSj) + '</td></tr>';

    var ZLSj = 0;
    $(zlsjArr).each(function (i, item) {
        ZLSj += (item);
    });
    var ZLTr = '<tr><td>资料费</td><td>' + payZl + '</td><td>' + ZLSj + '</td>';
    ZLTr += '<td>';
    if ((xjKind.zl) > 0) ZLTr += ('<span>现金：<span>' + (xjKind.zl) + '<br/>');
    if ((zpKind.zl) > 0) ZLTr += ('<span>支票：<span>' + (zpKind.zl) + '<br/>');
    if ((skKind.zl) > 0) ZLTr += ('<span>刷卡：<span>' + (skKind.zl) + '<br/>');
    if ((weixinKind.zl) > 0) ZLTr += ('<span>微信：<span>' + (weixinKind.zl) + '<br/>');
    if ((zfbKind.zl) > 0) ZLTr += ('<span>支付宝：<span>' + (zfbKind.zl) + '<br/>');
    if ((wlKind.zl) > 0) ZLTr += ('<span>网络：<span>' + (wlKind.zl) + '<br/>');
    if ((zzKind.zl) > 0) ZLTr += ('<span>银行转账：<span>' + (zzKind.zl) + '<br/>');
    if ((fqKind.zl) > 0) ZLTr += ('<span>分期：<span>' + (fqKind.zl));
    ZLTr += '</td>';
    ZLTr += '<td>' + (payZl - ZLSj) + '</td></tr>';

    var JCSj = 0;
    $(jcsjArr).each(function (i, item) {
        JCSj += (item);
    });
    var JCTr = '<tr><td>教材费</td><td>' + payJc + '</td><td>' + JCSj + '</td>';
    JCTr += '<td>';
    if ((xjKind.jc) > 0) JCTr += ('<span>现金：<span>' + (xjKind.jc) + '<br/>');
    if ((zpKind.jc) > 0) JCTr += ('<span>支票：<span>' + (zpKind.jc) + '<br/>');
    if ((skKind.jc) > 0) JCTr += ('<span>刷卡：<span>' + (skKind.jc) + '<br/>');
    if ((weixinKind.jc) > 0) JCTr += ('<span>微信：<span>' + (weixinKind.jc) + '<br/>');
    if ((zfbKind.jc) > 0) JCTr += ('<span>支付宝：<span>' + (zfbKind.jc) + '<br/>');
    if ((wlKind.jc) > 0) JCTr += ('<span>网络：<span>' + (wlKind.jc) + '<br/>');
    if ((zzKind.jc) > 0) JCTr += ('<span>银行转账：<span>' + (zzKind.jc) + '<br/>');
    if ((fqKind.jc) > 0) JCTr += ('<span>分期：<span>' + (fqKind.jc));
    JCTr += '</td>';
    JCTr += '<td>' + (payJc - JCSj) + '</td></tr>';

    var DGSj = 0;
    $(dgsjArr).each(function (i, item) {
        DGSj += (item);
    });
    var DGTr = '<tr><td>代管费</td><td>' + payDg + '</td><td>' + DGSj + '</td>';
    DGTr += '<td>';
    if ((xjKind.dg) > 0) DGTr += ('<span>现金：<span>' + (xjKind.dg) + '<br/>');
    if ((zpKind.dg) > 0) DGTr += ('<span>支票：<span>' + (zpKind.dg) + '<br/>');
    if ((skKind.dg) > 0) DGTr += ('<span>刷卡：<span>' + (skKind.dg) + '<br/>');
    if ((weixinKind.dg) > 0) DGTr += ('<span>微信：<span>' + (weixinKind.dg) + '<br/>');
    if ((zfbKind.dg) > 0) DGTr += ('<span>支付宝：<span>' + (zfbKind.dg) + '<br/>');
    if ((wlKind.dg) > 0) DGTr += ('<span>网络：<span>' + (wlKind.dg) + '<br/>');
    if ((zzKind.dg) > 0) DGTr += ('<span>银行转账：<span>' + (zzKind.dg) + '<br/>');
    if ((fqKind.dg) > 0) DGTr += ('<span>分期：<span>' + (fqKind.dg));
    DGTr += '</td>';
    DGTr += '<td>' + (payDg - DGSj) + '</td></tr>';

    var FDSj = payFd;
    var FDTr = '<tr><td>辅导费</td><td>' + payFd + '</td><td>' + FDSj + '</td>';
    FDTr += '<td>缴费' + FDSj + '</td>';
    FDTr += '<td>' + (payFd - FDSj) + '</td></tr>';

    var ZJTr = '<tr><td>总计</td><td>' + (payXz + payKs + payZl + payDg + payJc + payFd) + '</td>';
    ZJTr += '<td>' + (XZSj + KSSj + ZLSj + DGSj + JCSj + FDSj) + '</td><td></td><td></td></tr>';
    var YHTr = '<tr><td>优惠券</td><td>' + payY + '</td><td></td><td></td><td></td></tr>';
    var ZKTr = '<tr><td>折扣</td><td>' + payZk + '</td><td></td><td></td><td></td></tr>';
    var HJTr = '<tr><td>合计</td><td>' + (payXz + payKs + payZl + payDg + payJc + payFd - payY - payZk) + '</td>';
    HJTr += '<td>' + (XZSj + KSSj + ZLSj + DGSj + JCSj + FDSj) + '</td><td></td>';
    HJTr += '<td>' + (payXz + payKs + payZl + payDg + payJc + payFd - payY - payZk - (XZSj + KSSj + ZLSj + DGSj + JCSj + FDSj)) + '</td></tr>';
    var thead = '<table id="appendPayBody1" class="table table-striped table-hover table-bordered dataTable no-footer text-center"><thead><tr><th>收费项目</th><th>应缴</th><th>实缴</th><th>支付方式</th><th>欠费</th></tr></thead>';
    var theadEnd = '</table>';
    $('#tbodyInfo').append(thead + XZTr + KSTr + ZLTr + JCTr + DGTr + FDTr + ZJTr + YHTr + ZKTr + HJTr + theadEnd);
}

/**
 * 复制电话
 * @returns
 */
function copyPhone(elementId) {

    // 创建元素用于复制
    var aux = document.getElementById(elementId);

    // 复制内容
    aux.select();

    // 将内容复制到剪贴板
    document.execCommand("copy");

    toastr.success('电话复制成功');
}
//集团领证
$('.get-btn').click(function(){
    var ids = [];
    $('#graduateStudents input.checkchild:checkbox:checked').each(function(){
        ids.push($(this).val())
    })
    if(ids.length <= 0){
        toastr.error("请至少选择一条记录！");
        return false;
    }

    $('.getDiploma').modal('show');
})
$('#getDiploma').bootstrapValidator({
    message: 'This value is not valid',
    submitHandler: function (validator, form, submitButton) {
        var obj = document.getElementsByName("checkbox");
        var checkVal = [];
        for (k in obj) {
            if (obj[k].checked) {
                checkVal.push(obj[k].value);
            }
        }
        for (var i = 0; i < checkVal.length; i++) {
            var params = "";
            var graduateStudentsId = checkVal[i];
            var receiveNo = $('#getDiploma input[name="receiveNo"]').val();
            params += "&graduateStudentsId=" + graduateStudentsId;
            params += "&receiveNo=" + receiveNo;
            params += "&status=" + 1;
            $.ajax({
                type: "POST",
                url: ctx + '/graduateStudents/updateRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
        $('.getDiploma').modal('hide');
        DataTable.init();
    }
});
//集团发证
$('.send-btn').click(function(){
    var ids = [];
    $('#graduateStudents input.checkchild:checkbox:checked').each(function(){
        ids.push($(this).val())
    })
    if(ids.length <= 0){
        toastr.error("请至少选择一条记录！");
        return false;
    }

    $('.sendDiploma').modal('show');
})
$('#sendDiploma').bootstrapValidator({
    message: 'This value is not valid',
    submitHandler: function (validator, form, submitButton) {
        var obj = document.getElementsByName("checkbox");
        var checkVal = [];
        for (k in obj) {
            if (obj[k].checked) {
                checkVal.push(obj[k].value);
            }
        }
        for (var i = 0; i < checkVal.length; i++) {
            var params = "";
            var graduateStudentsId = checkVal[i];
            var sendNo = $('#sendDiploma input[name="sendNo"]').val();
            params += "&graduateStudentsId=" + graduateStudentsId;
            params += "&sendNo=" + sendNo;
            params += "&status=" + 2;
            $.ajax({
                type: "POST",
                url: ctx + '/graduateStudents/updateRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
        $('.sendDiploma').modal('hide');
        DataTable.init();
    }
});

//学员领取毕业证
function xueyuan() {
    var ids = [];
    $('#graduateStudents input.checkchild:checkbox:checked').each(function(){
        ids.push($(this).val())
    })
    if(ids.length <= 0){
        toastr.error("请至少选择一条记录！");
        return false;
    }

    var obj = document.getElementsByName("checkbox");
    var checkVal = [];
    for (k in obj) {
        if (obj[k].checked) {
            checkVal.push(obj[k].value);
        }
    }
    for (var i = 0; i < checkVal.length; i++) {
        var params = "";
        var graduateStudentsId = checkVal[i];
        params += "&graduateStudentsId=" + graduateStudentsId;
        params += "&status=" + 3;
        $.ajax({
            type: "POST",
            url: ctx + '/graduateStudents/updateRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
    DataTable.init();
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}



