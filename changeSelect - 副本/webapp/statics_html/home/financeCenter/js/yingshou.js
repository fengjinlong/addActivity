//折叠
$(".collapse-btn").click(function () {
    $(this).parent().parent().siblings().toggle();
})
//固定按钮切换
$(".tab_content_11 li").hover(function () {
    $(this).find("div").css({"display": "block", "transform": "rotate3d(0deg,30deg)"});
}, function () {
    $(this).find("div").css({"display": "none"})
});

$(function () {
	$("#init tbody").html("<tr><td height='300' colspan='17' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();
})

/**
 * 回车检索
 * @returns
 */
function search() {
    if (event.keyCode == 13) {
        toSearch();
    }
}
function toSearch() {
    init();
}

/**
 * 初始化时间控件
 * @returns
 */
function initDate() {
    //日期控件
    $("#reservation").daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
        },
        ranges: {
            '今天': [moment().startOf('day'), moment()],
            '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
            '本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
            '上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
            '本月': [moment().startOf("month"), moment().endOf("month")],
            '上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()]
        },
        applyClass: 'btn-primary',
        alwaysShowCalendars: true,
        autoclose: true,
        autoUpdateInput: false,
        showDropdowns: true
    });

    //日期确定按钮
    $("#reservation").on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0]
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1]
    });
    
//    aoData.push({"name": "beginTime", "value": $("#reservation").val().split("到")[0]});
//    aoData.push({"name": "endTime", "value": $("#reservation").val().split("到")[1]});
    aoData.push({"name": "searchVal", "value": $("#searchVal").val()});
    aoData.push({"name": "timeType", "value": $("#searchTimeType").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            initTotalIncome();
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
/**
 * 初始化数据
 * @returns
 */
function init() {
    var init = $('#init').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        //"iDisplayLength": 10,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
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
        "sAjaxSource": ctx + '/financeGroupReceivable/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": retrieveData,
        "aoColumns": [
            {"mDataProp": "baoMDate", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "nextPayTime", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "bmcode", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectLevelName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "payableNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "enrollNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var yumoney = full.payableNum - full.enrollNum;
                return yumoney.toFixed(2);
            }
            },
            {
                "mDataProp": "pxNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "kwNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "jcNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "zlNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "fwNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "xyNum",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == null || data == "") {
                        return "0.00";
                    } else {
                        return data.toFixed(2);
                    }
                }
            },
            {
                "mDataProp": "unAction", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                	if (data == 1) {
                        return "正常";
                    } else if(data == 2){
                        return "休学";
                    }else if(data == 3){
                        return "退费";
                    }else if(data == 4){
                        return "补考/重修";
                    }else if(data == 11){
                        return "已转班";
                    }else{
                    	return "";
                    }
            }
            },
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a data-record=\'' + JSON.stringify(full) + '\' data-type="1" class="check"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#init_wrapper").removeClass();
    $('#init_wrapper').addClass("table-scrollable");
    //每页显示记录数
    $('#init_wrapper .dataTables_info').parent().append($('.dataTables_length'));
    //横线滚动条
    $('#init_wrapper').on('scroll', function () {
        $('#init_wrapper .dataTables_paginate').css('margin-right', -$(this).scrollLeft());
    })
    //每页显示记录数
    $('.dataTables_info').parent().append($('.dataTables_length'));
}

function initTotalIncome() {
    var beginTime = $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0];
    var endTime = $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1];
    if(beginTime != "" & endTime != ""){
    	beginTime = beginTime.trim();
        endTime = endTime.trim();
    }
    var searchVal = $("#searchVal").val();
    var timeType = $("#searchTimeType").val();
    $.ajax({
        url: ctx + '/financeGroupReceivable/getTotalIncome',
        data: {"beginTime": beginTime, "endTime": endTime, "searchVal": searchVal, "timeType": timeType},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data) {
                var payableNum = data.payableNum;
                var enrollNum = data.enrollNum;
                var pxNum = data.pxNum;
                var kwNum = data.kwNum;
                var zlNum = data.zlNum;
                var xyNum = data.xyNum;
                var jcNum = data.jcNum;
                var fwNum = data.fwNum;
                var dsNum = (payableNum - enrollNum).toFixed(2);
                payableNum = payableNum == null || payableNum == "" ? "0.00" : payableNum.toFixed(2);
                enrollNum = enrollNum == null || enrollNum == "" ? "0.00" : enrollNum.toFixed(2);
                pxNum = pxNum == null || pxNum == "" ? "0.00" : pxNum.toFixed(2);
                kwNum = kwNum == null || kwNum == "" ? "0.00" : kwNum.toFixed(2);
                zlNum = zlNum == null || zlNum == "" ? "0.00" : zlNum.toFixed(2);
                xyNum = xyNum == null || xyNum == "" ? "0.00" : xyNum.toFixed(2);
                jcNum = jcNum == null || jcNum == "" ? "0.00" : jcNum.toFixed(2);
                fwNum = fwNum == null || fwNum == "" ? "0.00" : fwNum.toFixed(2);
                var html = '<tr class="odd">' + 
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center red">总计:</td>' +
                    '<td class="text-center">' + payableNum + '</td>' +
                    '<td class="text-center">' + enrollNum + '</td>' +
                    '<td class="text-center">' + dsNum + '</td>' +
                    '<td class="text-center">' + pxNum + '</td>' +
                    '<td class="text-center">' + kwNum + '</td>' +
                    '<td class="text-center">' + jcNum + '</td>' +
                    '<td class="text-center">' + zlNum + '</td>' +
                    '<td class="text-center">' + fwNum + '</td>' +
                    '<td class="text-center">' + xyNum + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';

                $("#init").find("tbody").prepend(html);
            }
        }
    });
}

/**
 * 查看和编辑
 */
$("#init").on('click', '.check', function () {
    var record = $(this).data('record');
    $("#checkModal").modal('show');
    $("#departmentName1").text(record.departmentName1);
    $("#brandName").text(record.brandName);
    $("#studentAttrName2").text(record.studentAttrName2);
    $("#studentAttrName1").text(record.studentAttrName1);
    $("#studentName").val(record.studentName);
    $("#studentSex").val(record.studentSex);
    $("#age").val(record.age);
    $("#studentPhone").val(record.studentPhone);
    $("#email").val(record.email);
    $("#examRegion").val(record.examRegion);
    $("#weChat").val(record.weChat);
    $("#tengXun").val(record.tengXun);
    $("#ortherPhone").val(record.ortherPhone);
    $("#phoneAddress").val(record.phoneAddress);
    $("#workSpace").val(record.workSpace);
    $("#projectName").val(record.projectName);
    $("#projectLevelName").val(record.projectLevelName);
    $("#kTime").val(record.kTimeValue);
    $("#classAttr").val(record.classAttr);
    $("#classPrice").val(record.classPrice);
    $("#recordContent").html("");
    $("#conversation").html("");
    var recordContent = record.recordContent;
    var recordHtml = "";
    if (recordContent) {
        var arr = recordContent.split("||");
        $(arr).each(function (i, n) {
            recordHtml += "<tr><td>" + n + "</td></tr>";
            $("#recordContent").append(recordHtml);
        })
    }
    var conversation = record.conversation;
    var conversationHtml = "";
    if (conversation) {
        var arr = conversation.split("||");
        $(arr).each(function (i, n) {
            conversationHtml += "<tr><td>" + n + "</td></tr>";
            $("#conversation").append(conversationHtml);
        })
    }

    $("#pxtj :eq(1)").text(record.pxyjNum);
    $("#xytj :eq(1)").text(record.xyyjNum);
    $("#fwtj :eq(1)").text(record.fwyjNum);
    $("#jctj :eq(1)").text(record.jcyjNum);
    $("#zltj :eq(1)").text(record.zlyjNum);
    $("#kwtj :eq(1)").text(record.kwyjNum);
    $("#dztj :eq(1)").text(record.dzyjNum);

    $("#pxtj :eq(2)").text(record.pxsjNum);
    $("#xytj :eq(2)").text(record.xysjNum);
    $("#fwtj :eq(2)").text(record.fwsjNum);
    $("#jctj :eq(2)").text(record.jcsjNum);
    $("#zltj :eq(2)").text(record.zlsjNum);
    $("#kwtj :eq(2)").text(record.kwsjNum);
    $("#dztj :eq(2)").text(record.dzsjNum);

    $("#pxtj :eq(4)").text(record.pxNum);
    $("#xytj :eq(4)").text(record.xyNum);
    $("#fwtj :eq(4)").text(record.fwNum);
    $("#jctj :eq(4)").text(record.jcNum);
    $("#zltj :eq(4)").text(record.zlNum);
    $("#kwtj :eq(4)").text(record.kwNum);
    $("#dztj :eq(4)").text(record.dzNum);

    $("#hj :eq(1)").text(record.payableNum);
    $("#hj :eq(2)").text(record.enrollNum);

    var infoManageId = record.infoManageId;

    var dzhtml = "";
    var pxhtml = "";
    var xyhtml = "";
    var fwhtml = "";
    var jchtml = "";
    var zlhtml = "";
    var kwhtml = "";

    $.ajax({
        url: ctx + '/financeGroupReceivable/getPayByInfoId',
        data: {"infoManageId": infoManageId},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (i, n) {
                //订座
                if (n.payDzXj) {
                    dzhtml += "现金:" + n.payDzXj + ";";
                }
                if (n.payDzZp) {
                    dzhtml += "支票:" + n.payDzZp + ";";
                }
                if (n.payDzSk) {
                    dzhtml += "刷卡:" + n.payDzSk + ";";
                }
                if (n.payDzWeixin) {
                    dzhtml += "微信:" + n.payDzWeixin + ";";
                }
                if (n.payDzZfb) {
                    dzhtml += "支付宝:" + n.payDzZfb + ";";
                }
                if (n.payDzWl) {
                    dzhtml += "网络:" + n.payDzWl + ";";
                }
                if (n.payDzZz) {
                    dzhtml += "转账:" + n.payDzZz + ";";
                }
                if (n.payDzFq) {
                    dzhtml += "分期:" + n.payDzFq + ";";
                }
                //培训费
                if (n.payPxXj) {
                    pxhtml += "现金:" + n.payPxXj + ";";
                }
                if (n.payPxZp) {
                    pxhtml += "支票:" + n.payPxZp + ";";
                }
                if (n.payPxSk) {
                    pxhtml += "刷卡:" + n.payPxSk + ";";
                }
                if (n.payPxWeixin) {
                    pxhtml += "微信:" + n.payPxWeixin + ";";
                }
                if (n.payPxZfb) {
                    pxhtml += "支付宝:" + n.payPxZfb + ";";
                }
                if (n.payPxWl) {
                    pxhtml += "网络:" + n.payPxWl + ";";
                }
                if (n.payPxZz) {
                    pxhtml += "转账:" + n.payPxZz + ";";
                }
                if (n.payPxFq) {
                    pxhtml += "分期:" + n.payPxFq + ";";
                }
                //协议费
                if (n.payXyXj) {
                    xyhtml += "现金:" + n.payXyXj + ";";
                }
                if (n.payXySk) {
                    xyhtml += "刷卡:" + n.payXySk + ";";
                }
                if (n.payXyZp) {
                    xyhtml += "支票:" + n.payXyZp + ";";
                }
                if (n.payXyWeixin) {
                    xyhtml += "微信:" + n.payXyWeixin + ";";
                }
                if (n.payXyZfb) {
                    xyhtml += "支付宝:" + n.payXyZfb + ";";
                }
                if (n.payXyWl) {
                    xyhtml += "网络:" + n.payXyWl + ";";
                }
                if (n.payXyZz) {
                    xyhtml += "转账:" + n.payXyZz + ";";
                }
                if (n.payXyFq) {
                    xyhtml += "分期:" + n.payXyFq + ";";
                }
                //服务费
                if (n.payFwXj) {
                    fwhtml += "现金:" + n.payFwXj + ";";
                }
                if (n.payFwSk) {
                    fwhtml += "刷卡:" + n.payFwSk + ";";
                }
                if (n.payFwZp) {
                    fwhtml += "支票:" + n.payFwZp + ";";
                }
                if (n.payFwWeixin) {
                    fwhtml += "微信:" + n.payFwWeixin + ";";
                }
                if (n.payFwZfb) {
                    fwhtml += "支付宝:" + n.payFwZfb + ";";
                }
                if (n.payFwWl) {
                    fwhtml += "网络:" + n.payFwWl + ";";
                }
                if (n.payFwZz) {
                    fwhtml += "转账:" + n.payFwZz + ";";
                }
                if (n.payFwFq) {
                    fwhtml += "分期:" + n.payFwFq + ";";
                }
                //教材费
                if (n.payJcXj) {
                    jchtml += "现金:" + n.payJcXj + ";";
                }
                if (n.payJcSk) {
                    jchtml += "刷卡:" + n.payJcSk + ";";
                }
                if (n.payJcZp) {
                    jchtml += "支票:" + n.payJcZp + ";";
                }
                if (n.payJcWeixin) {
                    jchtml += "微信:" + n.payJcWeixin + ";";
                }
                if (n.payJcZfb) {
                    jchtml += "支付宝:" + n.payJcZfb + ";";
                }
                if (n.payJcWl) {
                    jchtml += "网络:" + n.payJcWl + ";";
                }
                if (n.payJcZz) {
                    jchtml += "转账:" + n.payJcZz + ";";
                }
                if (n.payJcFq) {
                    jchtml += "分期:" + n.payJcFq + ";";
                }
                //资料费
                if (n.payZlXj) {
                    zlhtml += "现金:" + n.payZlXj + ";";
                }
                if (n.payZlSk) {
                    zlhtml += "刷卡:" + n.payZlSk + ";";
                }
                if (n.payZlZp) {
                    zlhtml += "支票:" + n.payZlZp + ";";
                }
                if (n.payZlWeixin) {
                    zlhtml += "微信:" + n.payZlWeixin + ";";
                }
                if (n.payZlZfb) {
                    zlhtml += "支付宝:" + n.payZlZfb + ";";
                }
                if (n.payZlWl) {
                    zlhtml += "网络:" + n.payZlWl + ";";
                }
                if (n.payZlZz) {
                    zlhtml += "转账:" + n.payZlZz + ";";
                }
                if (n.payZlFq) {
                    zlhtml += "分期:" + n.payZlFq + ";";
                }
                //考务费
                if (n.payKwXj) {
                    kwhtml += "现金:" + n.payKwXj + ";";
                }
                if (n.payKwSk) {
                    kwhtml += "刷卡:" + n.payKwSk + ";";
                }
                if (n.payKwZp) {
                    kwhtml += "支票:" + n.payKwZp + ";";
                }
                if (n.payKwWeixin) {
                    kwhtml += "微信:" + n.payKwWeixin + ";";
                }
                if (n.payKwZfb) {
                    kwhtml += "支付宝:" + n.payKwZfb + ";";
                }
                if (n.payKwWl) {
                    kwhtml += "网络:" + n.payKwWl + ";";
                }
                if (n.payKwZz) {
                    kwhtml += "转账:" + n.payKwZz + ";";
                }
                if (n.payKwFq) {
                    kwhtml += "分期:" + n.payKwFq + ";";
                }

            })

            $("#dztj :eq(3)").html(dzhtml);
            $("#pxtj :eq(3)").html(pxhtml);
            $("#xytj :eq(3)").html(xyhtml);
            $("#fwtj :eq(3)").html(fwhtml);
            $("#jctj :eq(3)").html(jchtml);
            $("#zltj :eq(3)").html(zlhtml);
            $("#kwtj :eq(3)").html(kwhtml);

        }
    })

    //发送短信弹窗层级
    $('.information').on('show.bs.modal', function () {
        $('.bs-example-modal-lg').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.bs-example-modal-lg').css('z-index', 1050);
    });
})
