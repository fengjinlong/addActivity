//报名tab页查看功能
$('#table66').on('click', '.ck,.call-out', function () {
        var infoManageId = $(this).attr('data-record');
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        var id = '';
        var levelId = '';
        $.ajax({
            "url": ctx + '/financeGroupIncome/getStuPayDeatil/' + infoManageId,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (data) {
                $('#sPriceHid2').val('');
                var consultInfo = data.consultInfo;
                var payInfoData = data.payInfoData;
                var project = data.project;
                
                var studentMaturity = '';
                if (consultInfo.studentMaturity == '1') {
                	studentMaturity = 'A类';
                }
                if (consultInfo.studentMaturity == '2') {
                	studentMaturity = 'B类';
                }
                if (consultInfo.studentMaturity == '3') {
                	studentMaturity = 'C类';
                }
                if (consultInfo.studentMaturity == '4') {
                	studentMaturity = 'D类';
                }
                
                //头部信息
                $('#headInfo').find('tr').remove();
                var tr = "<tr><td>咨询分校：<span>" + (consultInfo.departmentName1 ? consultInfo.departmentName1 : '') + "</span></td>" +
                    "<td>品牌：<span id='brandNameDel'>" + (consultInfo.brandName ? consultInfo.brandName : '') + "</span></td>" +
                    "<td>咨询者类型：<span>" + (consultInfo.studentAttrName2 == '--请选择--' ? '' : consultInfo.studentAttrName2) + "</span></td>" +
                    "<td>媒体类源：<span>" + (consultInfo.studentAttrName1 == '--请选择--' ? '' : consultInfo.studentAttrName1) + "</span></td>" +
                    "<td>客户成熟度：<span>" + studentMaturity + "</span>" +
                    "<input id='infoManageIdDel' type='hidden' value=" + consultInfo.infoManageId + " />" +
                    "<input id='sPriceHidCk' type='hidden' value=" + consultInfo.sPrice + " /></td></tr>";
                $('#headInfo').append(tr);

                //学生个人信息
                $('#studentName').val(consultInfo.studentName ? consultInfo.studentName : '');
                $('#stuSex').val(consultInfo.studentSex);
                $('#stuAge').val(consultInfo.age ? consultInfo.age : '');
                $('#stuPhone').val(consultInfo.studentPhone ? consultInfo.studentPhone : '');
                $('#stuEmail').val(consultInfo.email ? consultInfo.email : '');
                $('#stuWeChat').val(consultInfo.weChat ? consultInfo.weChat : '');
                $('#stuQQ').val(consultInfo.tengXun ? consultInfo.tengXun : '');
                $('#stuOtherPhone').val(consultInfo.ortherPhone ? consultInfo.ortherPhone : '');
                $('#stuPhoneAddress').val(consultInfo.phoneAddress ? consultInfo.phoneAddress : '');
                $('#stuWorkSpace').val(consultInfo.workSpace ? consultInfo.workSpace : '');
                $('#bkyx').val(consultInfo.departmentName3 ? consultInfo.departmentName3 : '');
                if (consultInfo.idcardType == '1') {
                    $('#stuCardType').val('身份证');
                } else {
                    $('#stuCardType').val('护照');
                }

                var studentLable = consultInfo.studentLable;
                $('.tagBM').html('');
                if(studentLable!=null){
                	studentLable = studentLable.split(',');
                	for(var i=0;i<studentLable.length;i++){
                		$('.tagBM').append('<p class="label-box text-center"><span>'+studentLable[i]+'</span><i class="fa fa-minus-circle reduce icon-btn tag-close"></i>');
                	}
                }
                
                $('#stuCard').val(consultInfo.idcard ? consultInfo.idcard : '');

                if(infoDisType=="1"){
                	//集团
                	if(consultInfo.infoType=='1'){
                		$('#upli210').hide();
                	}else{
                		$('#upli210').show();
                	}
                }else{
                	//分校
                	$('#upli210').show();
                }
                
                if (consultInfo.infoType == '0') {
                    $('#stuBMType').val('线上支付');
                } else {
                    $('#stuBMType').val('上门报名');
                }

                $('#stuEmergencyContactMode').val(consultInfo.emergencyContactMode ? consultInfo.emergencyContactMode : '');
                $('#stuEmergencyContact').val(consultInfo.emergencyContact ? consultInfo.emergencyContact : '');
                $('#stubByZy').val(consultInfo.byZy ? consultInfo.byZy : '');
                $('#stuStudentAttrName32').val(consultInfo.studentAttrName3 != '--请选择--' ? consultInfo.studentAttrName3 : '');
                $('#stuBySchool').val(consultInfo.bySchool ? consultInfo.bySchool : '');
                $('#stuNation').val(consultInfo.nation ? consultInfo.nation : '');

                //课程缴费信息
//                $('#coursePayInfo').html('');
//                if (project.projectType == '1') {
//                    coursePayInfoZYJY(consultInfo, payInfoData);
//                } else {
//                    coursePayInfoXueLi(consultInfo, payInfoData);
//                }
                //呼入
                $('#callInfo2').find('tr').remove();
                var callInfo = "<tr><td>" + (consultInfo.conversation ? consultInfo.conversation : '') + "</td></tr>";
                $('#callInfo2').append(callInfo);
                //咨询
                $('#callBackInfo').find('tr').remove();
                var callBackInfoHtml = "";
                if (consultInfo.recordContent) {
                    var recordArr = consultInfo.recordContent.split('||');
                    $(recordArr).each(function (i, item) {
                        callBackInfoHtml += "<tr><td>" + (item ? item : '') + "</td></tr>";
                    });
                }
                $('#callBackInfo').append(callBackInfoHtml);
                $('#viewInfo').show();

                $.ajax({
                    url: ctx + "/bizScale/loadProjectLevel",
                    data: {"projectId": id},
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (levelId == data[i].projectLevelId) {
                                $('#hidChoosePrint').val(data[i].teachType);
                            }
                        }
                    }
                });
            }
        });
    });



/**
 * 初始报名信息
 * @returns
 */
function init6() {
    var init = $('#table66').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "sWrapper": "table-scrollable",
        "bSort": true, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultConsoleSignUp/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData6,
        "aoColumns": [
            {"mDataProp": "bmcode","bSortable": false,'sClass': "text-center"},
            {"mDataProp": "baoMDate",'sClass': "text-center"},
            {
                "mDataProp": "next_pay_time", 'sClass': "text-center", "mRender": function (data, type, full) {
                var res = full['sumPrice'] - full['sPrice'] - full['dPrice'];
                if (res == 0) {
                    return '费用已补齐';
                } else {
                    return full['nextPayTime'];
                }
            }
            },
            {"mDataProp": "departmentName1", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "schoolName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '') {
                        return '线上支付';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "productName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "sumPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "sPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                return eval(full['sPrice']) + eval(full['dPrice']==''?0:full['dPrice']);
            }},
            {
                "mDataProp": "sumPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                return full['sumPrice'] - full['sPrice'] - full['dPrice'];
            }
            },
            {
                "mDataProp": "printCount", 'sClass': "text-center"
            },
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + full.infoManageId + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a>'
                var u3 = '<a href="#" data-record=\'' + full.infoManageId + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a>'
                return u1 + u2 + u3;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table66_wrapper").removeClass();
    $('#table66_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table66_wrapper .dataTables_info').parent().append($('#table66_wrapper .dataTables_length'));
    HScrollBar('#table66_wrapper');
}


/**
 * 回调函数报名
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData6(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "studentPhone", "value": $('#phoneCall5').val()});
    aoData.push({"name": "studentName", "value": $('#fullName5').val()});
    aoData.push({"name": "productId", "value": $('#product5').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus5').val()});
    debugger;
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[1] + " 23:59:59"
    });

    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }
    
    aoData.push({"name": "status", "value": 7});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal6").val()});
    var re = $("input[name^='mustPay']:checked").val();
    if (!re == '') {
        aoData.push({"name": "mustPay", "value": re});
        $.ajax({
            "type": "Post",
            "url": ctx + "/consultInfoManage/ajaxLoadMustPaySum",
            "dataType": "json",
            "success": function (data) {
            	  if (re==0){
                      $('#arrearage').show();
                      if (data) {
                          $('#mustPaySum').text(data.mustPaySum);
                      }
            	  }else{
            		  //$('#mustPaySum').text('');
                      $('#arrearage').hide();
            	  }
            }
        });
    } else {
        aoData.push({"name": "mustPay", "value": -1});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanBM]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

