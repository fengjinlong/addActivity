//日期(时分秒)
$(".form_datetime").jeDate({
    format: 'YYYY-MM-DD hh:mm:ss'
});

$(function () {
	$("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();
    showProject();
    showPCostclass();
    showPayee();

    $("#pCostclassId").change(function () {
        var pCostclassId = $(this).val();
        showCostclass(pCostclassId, 1);
    })
    $("#pCostclassId2").change(function () {
        var pCostclassId = $(this).val();
        showCostclass(pCostclassId, 2);
    })
    $("#financePayeeId").change(function () {
        var financePayeeId = $(this).val();
        showPayeeInfo(financePayeeId, 1);
    })
    $("#financePayeeId2").change(function () {
        var financePayeeId = $(this).val();
        showPayeeInfo(financePayeeId, 2);
    })
});

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

$(document).on('click', '#add', function () {
    $('#addForm').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
    editor.html('');
    var userId = $("#currUser").val();

    showUser(userId);
    //var applicantDate = getNowFormatDate();
    //$("#addForm").find("[name='applicantDate']").val(applicantDate);
    //$("#applicantDate").val(applicantDate);
    $('#myModel').modal('show');
});

function validateForm() {
    $.ajax({
        url: ctx + '/financeZpExpend/addNewRecord',
        type: 'POST',
        data: $('#addForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                toastr.success(data.msg);
                $('#myModel').modal('hide');
                init();
            } else {
                toastr.error(data.msg);
            }

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    return false;
}

function editValidateForm() {

    $('#inputcontent').val(editor2.html());
    $.ajax({
        url: ctx + '/financeZpExpend/updateRecord',
        type: 'POST',
        data: $('#editForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                toastr.success(data.msg);
                $('#checkModal').modal('hide');
                init();
            } else {
                toastr.error(data.msg);
            }

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    return false;
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
    	"value": $("#reservation").val().split("到") == '' ? "" :  $("#reservation").val().split("到 ")[0] + " 00:00:00"});
    aoData.push({
    	"name": "endTime", 
    	"value": $("#reservation").val().split("到") == '' ? "" :  $("#reservation").val().split("到 ")[1] + " 23:59:59"});
    aoData.push({"name": "searchVal", "value": $("#searchVal").val()});
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
        "sAjaxSource": ctx + '/financeZpExpend/getAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "bStateSave": true,
        "fnServerData": retrieveData,
        "aoColumns": [
            {
                "mDataProp": "zpExpendId", 'sClass': "text-center", "mRender": function (data, type, full) {
                return "<label> <input type='checkbox' class='slaver'> <span class='text'></span> </label>";
            }
            },
            /*{"mDataProp" : "zpExpendId","bSortable": false,'sClass': "text-center"},*/
            {"mDataProp": "applicantDate", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "realName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "pcostName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "costName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "expendDetail", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "money", "bSortable": false, 'sClass': "text-center"},
            /*{"mDataProp" : "applicantStatus","bSortable": false,'sClass': "text-center"},*/
            {
                "mDataProp": "updateStatus",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == 1) {
                        return "首次";
                    } else {
                        return "重申";
                    }
                }
            },
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a data-record=\'' + JSON.stringify(full) + '\' data-type="1" class=" check"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>' +
                    '<a data-record=\'' + JSON.stringify(full) + '\' data-type="2" class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>' +
                    '<a data-record=\'' + JSON.stringify(full) + '\' class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    //每页显示记录数
    $('.dataTables_info').parent().append($('.dataTables_length'));
}

/**
 * 查看和编辑
 */
$("#init").on('click', '.check,.edit', function () {
    var record = $(this).data('record');
    showCostclass(record.pCostclassId, 2, record.costclassId);
    var type = $(this).data('type');
    if (type == 1) {
        $('.bs-example-modal-lg2 .modal-footer').css('display','none');
        $("#checkModal .widget-caption").text("查看");
        $("#bankName").attr("disabled", "disabled");
        $("#province").attr("disabled", "disabled");
        $("#city").attr("disabled", "disabled");
        $("#accountName").attr("disabled", "disabled");
        $("#accountNum").attr("disabled", "disabled");
        $("#phone").attr("disabled", "disabled");
        editor2.readonly(true);
    } else if (type == 2) {
        $('.bs-example-modal-lg2 .modal-footer').css('display','block');
        $('#checkModal').find('input[type="hidden"], input[type="text"], select, textarea').removeAttr("disabled");
        $("#applicantName2").attr("disabled", "disabled");
        $("#applicantDate2").attr("disabled", "disabled");
        $("#departmentName2").attr("disabled", "disabled");
        $("#areaName2").attr("disabled", "disabled");
        /* $("#bankName2").attr("disabled", "disabled");
        $("#province2").attr("disabled", "disabled");
        $("#city2").attr("disabled", "disabled");
        $("#accountName2").attr("disabled", "disabled");
        $("#accountNum2").attr("disabled", "disabled");
        $("#phone2").attr("disabled", "disabled");*/
        $("#checkModal .widget-caption").text("编辑");
        editor2.readonly(false);
    }
    $("#checkModal").modal('show');
    $("#checkModal").find("[name='zpExpendId']").val(record.zpExpendId);
    $("#checkModal").find("[name='applicantId']").val(record.applicantId);
    $("#applicantName2").val(record.realName);
    $("#checkModal").find("[name='applicantDate']").val(record.applicantDate);
    $("#applicantDate2").val(record.applicantDate);
    $("#checkModal").find("[name='money']").val(record.money);
    $("#checkModal").find("[name='payment']").val(record.payment);
    $("#checkModal").find("[name='paymentFrom']").val(record.paymentFrom);
    $("#projectId2").val(record.projectId);
    $("#pCostclassId2").val(record.pCostclassId);
    $("#checkModal").find("[name='incomeType']").val(record.incomeType);
    $("#departmentName2").val(record.departmentName);
    $("#checkModal").find("[name='departmentId1']").val(record.departmentId1);
    $("#areaName2").val(record.departmentName);
    $("#checkModal").find("[name='departmentId2']").val(record.departmentId2);
    $("#checkModal").find("[name='expendDetail']").val(record.expendDetail);
    $("#checkModal").find("[name='invoiceTitle']").val(record.invoiceTitle);
    $("#checkModal").find("[name='isAdjustment']").val(record.isAdjustment);
    $("#financePayeeId2").val(record.financePayeeId);
    $("#checkModal").find("[name='payeeId']").val(record.payeeId);
    $("#projectName2").val(record.projectId);
    $("#bankName2").val(record.bankName);
    $("#province2").val(record.province);
    $("#city2").val(record.city);
    $("#payeeName2").val(record.payeeName);
    $("#accountName2").val(record.accountName);
    $("#accountNum2").val(record.accountNum);
    $("#phone2").val(record.phone);
    //showPayeeInfo(record.payeeId, 2);
    /*$("#bankName2").val(record.bankName);
     $("#province2").val(record.province);
     $("#city2").val(record.city);
     $("#accountName2").val(record.accountName);
     $("#accountNum2").val(record.accountNum);
     $("#phone2").val(record.phone);*/
    editor2.html(record.content);
})


/**
 * 删除操作
 * @param val
 * @returns
 */
$("#init").on('click', '.delete', function () {
    var record = $(this).data('record');
    swal({
        title: "",
        text: "确定要删除吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: ctx + '/financeZpExpend/deleteRecord',
            type: 'POST',
            data: {
                zpExpendId: record.zpExpendId,
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    init();
                }
            }
        });
    });
})

/**
 * 计算合计
 */
function initTotalIncome() {
    var beginTime = $("#reservation").val().split("到") == '' ? "" :  $("#reservation").val().split("到 ")[0] + " 00:00:00";
    var endTime = $("#reservation").val().split("到") == '' ? "" :  $("#reservation").val().split("到 ")[1] + " 23:59:59";
    var searchVal = $("#searchVal").val();
    $.ajax({
        url: ctx + '/financeZpExpend/getTotalIncome',
        data: {"beginTime": beginTime, "endTime": endTime, "searchVal": searchVal},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data) {
                var html = '<tr class="odd">' +
                    '<td class="text-center"> <input type="checkbox" class="slaver"> <span class="text"></span> </td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center red">合计:</td>' +
                    '<td class="text-center">' + data.reservationNum + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';

                $("#init").find("tbody").prepend(html);
            }
        }
    });
}

/**
 * 显示项目
 */
function showProject() {
    $.ajax({
        url: ctx + '/financeZpExpend/showProject',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var html = "";
            $(data).each(function (i, n) {
                html += '<option value="' + n.projectId + '">' + n.fullName + '</option>';
            })
            $("#projectId").append(html);
            $("#projectName").val(data[0].projectId);
            $("#projectId2").append(html);
            $("#projectName2").val(data[0].projectId);
        }
    });
}

/**
 * 显示一级费用分类
 */
function showPCostclass() {
    $.ajax({
        url: ctx + '/financeZpExpend/showPCostclass',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var html = "";
            $(data).each(function (i, n) {
                html += '<option value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
            })
            $("#pCostclassId").append(html);
            $("#pCostclassId2").append(html);
            showCostclass(data[0].financeCostclassId, 1);
            showCostclass(data[0].financeCostclassId, 2);
        }
    });
}

/**
 * 显示二级费用分类
 */
function showCostclass(pCostclassId, num, costclassId) {
    $.ajax({
        url: ctx + '/financeZpExpend/showCostclass',
        data: {financeCostclassId: pCostclassId},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var html = "";
            $(data).each(function (i, n) {
                if (costclassId == n.financeCostclassId) {
                    html += '<option selected="selected" value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
                } else {
                    html += '<option value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
                }
            })
            if (num == 1) {
                $("#costclassId").html("");
                $("#costclassId").append(html);
            } else if (num == 2) {
                $("#costclassId2").html("");
                $("#costclassId2").append(html);
            }
        }
    });
}

/**
 * 显示常用收款人
 */
function showPayee() {
    $.ajax({
        url: ctx + '/financeZpExpend/showPayee',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var html = "--请选择--";
            $(data).each(function (i, n) {
                html += '<option value="' + n.financePayeeId + '">' + n.accountName + '</option>';
            })
            $("#financePayeeId").append(html);
            $("#financePayeeId2").append(html);
        }
    });
}

/**
 * 根据收款人显示收款人信息
 */
function showPayeeInfo(val, num) {
    $.ajax({
        url: ctx + '/financeZpExpend/showPayeeInfo',
        data: {financePayeeId: val},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (num == 1) {
                $("#bankName").val(data.bankName);
                $("#province").val(data.province);
                $("#city").val(data.city);
                $("#payeeName").val(data.accountName);
                $("#accountName").val(data.accountName);
                $("#accountNum").val(data.accountNum);
                $("#phone").val(data.phone);
            } else if (num == 2) {
                $("#bankName2").val(data.bankName);
                $("#province2").val(data.province);
                $("#city2").val(data.city);
                $("#payeeName2").val(data.payeeName);
                $("#accountName2").val(data.accountName);
                $("#accountNum2").val(data.accountNum);
                $("#phone2").val(data.phone);
            }
        }
    });
}

/**
 * 查询登录用户信息
 */
function showUser(val) {
    $.ajax({
        url: ctx + '/financeZpExpend/showUser',
        data: {userId: val},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $("#applicantName").val(data.realName);
            $("#applicantId").val(val);
            $("#departmentName").val(data.departmentName);
            $("#myModel").find("[name='departmentId1']").val(data.departmentId);
            $("#areaName").val(data.departmentName);
            $("#myModel").find("[name='departmentId2']").val(data.departmentId);
        }
    });
}

//每页显示记录数
$('.dataTables_info').parent().append($('.dataTables_length'));