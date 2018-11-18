$(function () {
    //起止时间
    $("#queryDate").daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: '到',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
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
    $("#queryDate").on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + '到' + picker.endDate.format('YYYY-MM-DD'));
    });

    function init() {
        initProject();
        initCostClass("0");
        initBankInfo();
    }

    init();
    //初始化部门
    function initDepartment() {
        $.ajax({
            url: ctx + "/department/selectDepartementByUser",
            dataType: "json",
            async: true,
            success: function (data) {
                if (data.type == '3') {
                    $('#applyExpendForm input[name=departmentId1]').val(data.departmentId);
                    $('#applyExpendForm input[name=departmentId1]').prev().val(data.fullName);
                    $('#applyExpendForm input[name=departmentId2]').val(data.departmentId);
                    $('#applyExpendForm input[name=departmentId2]').prev().val(data.fullName);
                }
            }
        })
    }

    //初始化项目
    function initProject() {
        $('#applyExpendForm select[name=projectId]').find('option').remove();
        $('#editExpendForm select[name=projectId]').find('option').remove();
        $.ajax({
            url: ctx + "/bizProject/getAllOption",
            async: true,
            success: function (data) {
                $(data.list).each(function (i, item) {
                    var option = "<option value='" + item.projectId + "'>" + item.fullName + "</option>";
                    $('#applyExpendForm select[name=projectId]').append(option);
                    $('#editExpendForm select[name=projectId]').append(option);
                });
            }
        })
    }

    //级别联动 加载类别
    $('#applyExpendForm select[name=pCostclassId]').change(function () {
        $('#applyExpendForm select[name=costclassId]').find('option').remove();
        initCostClass($(this).val(), true);

    });
    $('#editExpendForm select[name=pCostclassId]').change(function () {
        $('#editExpendForm select[name=costclassId]').find('option').remove();
        initCostClass($(this).val(), false);

    });

    //初始化类别
    function initCostClass(parentId, isAdd) {
        if (parentId == '-1') return;
        $.ajax({
            url: ctx + "/bizFinance/loadCostClass",
            data: {"parentId": parentId},
            async: true,
            success: function (data) {
                if (parentId == '0') {
                    $('#applyExpendForm select[name=pCostclassId]').find('option').remove();
                    $('#applyExpendForm select[name=pCostclassId]').append("<option value='-1'>--请选择--</option>");
                    $('#editExpendForm select[name=pCostclassId]').find('option').remove();
                    $('#editExpendForm select[name=pCostclassId]').append("<option value='-1'>--请选择--</option>");
                    $(data).each(function (i, item) {
                        var option = "<option value='" + item.financeCostclassId + "'>" + item.costclassName + "</option>";
                        $('#applyExpendForm select[name=pCostclassId]').append(option);
                        $('#editExpendForm select[name=pCostclassId]').append(option);
                    });
                } else {
                    if (isAdd) {
                        $('#applyExpendForm select[name=costclassId]').find('option').remove();
                    } else {
                        $('#editExpendForm select[name=costclassId]').find('option').remove();
                    }

                    $(data).each(function (i, item) {
                        var option = "<option value='" + item.financeCostclassId + "'>" + item.costclassName + "</option>";
                        if (isAdd) {
                            $('#applyExpendForm select[name=costclassId]').append(option);
                        } else {
                            $('#editExpendForm select[name=costclassId]').append(option);
                        }
                    });
                }
            }
        })
    }


    //初始化收款人信息
    var bankArray = new Array();

    function initBankInfo() {
        var option = "<option value=-1>--请选择--</option>";
        $('#applyExpendForm select[name=payeeId]').find('option').remove();
        $('#editExpendForm select[name=payeeId]').find('option').remove();
        $('#applyExpendForm select[name=payeeId]').append(option);
        $('#editExpendForm select[name=payeeId]').append(option);
        $.ajax({
            url: ctx + "/bizFinance/load",
            async: true,
            success: function (data) {
                $(data.returnObject.aaData).each(function (i, item) {
                    bankArray.push(item);
                    var option = "<option value='" + item.financePayeeId + "'>" + item.accountName + "</option>";
                    $('#applyExpendForm select[name=payeeId]').append(option);
                    $('#editExpendForm select[name=payeeId]').append(option);
                });
            }
        })

    }

    $('#applyExpendForm select[name=payeeId]').change(function () {
        var payeeId = $(this).val();
        fillBankInfo('#applyExpendForm', payeeId);
    });

    $('#editExpendForm select[name=payeeId]').change(function () {
        var payeeId = $(this).val();
        fillBankInfo('#editExpendForm', payeeId);
    });
    //填写银行信息
    function fillBankInfo(id, payeeId) {
        $(bankArray).each(function (i, item) {
            if (item.financePayeeId == payeeId) {
                $(id).find('input[name=bankName]').val(item.bankName);
                $(id).find('input[name=province]').val(item.province);
                $(id).find('input[name=city]').val(item.city);
                $(id).find('input[name=payeeName]').val(item.accountName);
                $(id).find('input[name=accountName]').val(item.accountName);
                $(id).find('input[name=accountNum]').val(item.accountNum);
                $(id).find('input[name=phone]').val(item.phone);
                return false;
            }

        });
    }

    //清除表单
    $('#applyButton').on('click', function () {
        var departmentId = $('#applyExpendForm input[name=departmentId1]').val()
        if (departmentId == null || departmentId.trim() == "") {
            toastr.error('部门不为分校');
            return false;
        }
        clearApplyForm();
    });
    function clearApplyForm() {
        var applicantId = $('#applyExpendForm input[name=applicantId]').val();
        var applicantName = $('#applyExpendForm input[name=applicantId]').prev().val();
        var departmentId = $('#applyExpendForm input[name=departmentId1]').val();
        var fullName = $('#applyExpendForm input[name=departmentId1]').prev().val();
        $('#applyExpendForm')[0].reset();
        $('#applyExpendForm input[name=applicantId]').val(applicantId);
        $('#applyExpendForm input[name=applicantId]').prev().val(applicantName);
        $('#applyExpendForm input[name=departmentId1]').val(departmentId);
        $('#applyExpendForm input[name=departmentId1]').prev().val(fullName);
        $('#applyExpendForm input[name=departmentId2]').val(departmentId);
        $('#applyExpendForm input[name=departmentId2]').prev().val(fullName);
        $.ajax({
            url: ctx + "/financeSchoolExpend/getApplyTimes",
            async: true,
            success: function (data) {
                if (parseInt(data.count) == 0)
                    $('#applyExpendForm input[name=updateStatus]').val("1");
                else
                    $('#applyExpendForm input[name=updateStatus]').val("2");
            },
            error: function (response) {
                alert("系统错误");
            }
        });
        editor.html('');
        $('#newExpendModel').show();
    }

    //新增
    $('#applyExpendForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {//表单验证
            money: {
                validators: {
                    notEmpty: {
                        message: '金额不能为空'
                    }
                }
            },
            invoiceTitle: {
                validators: {
                    notEmpty: {
                        message: '发票抬头不能为空'
                    }
                }
            },
            expendDetail: {
                validators: {
                    notEmpty: {
                        message: '支出明细不能为空'
                    }
                }
            },
            payeeId: {
                validators: {
                    callback: {
                        message: '选择收款人',
                        callback: function (value, validator) {
                            return !(value == '-1');
                        }
                    }
                }
            },
            pCostclassId: {
                validators: {
                    callback: {
                        message: '选择类别 ',
                        callback: function (value, validator) {
                            return !(value == '-1');
                        }
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                url: ctx + "/financeSchoolExpend/addNewRecord",
                type: 'POST',
                data: $('#applyExpendForm').serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        $('#newExpendModel').modal('hide');
                        toastr.success("添加成功");
                        DataTable.init();
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
    });


    //编辑 删除 查看
    $('#expendInit').on('click', 'a.btn-xs', function () {
        var data = $(this).attr('data-record');
        if ($(this).hasClass('btn-warning')) {
            expendInfo(false, data)
        } else if ($(this).hasClass('btn-info')) {
            expendInfo(true, data)
        } else if ($(this).hasClass('btn-danger')) {
            deleteExpend(data)
        }
    });

    //编辑、查看
    function expendInfo(flag, data) {
        if (flag) {
            $('.bs-example-modal-lg .modal-footer').css('display', 'block');
            $('#editExpendModel .modal-header').find('span').text('编辑财务支出');
            editor2.readonly(false);
        } else {
            $('.bs-example-modal-lg .modal-footer').css('display', 'none');
            $('#editExpendModel .modal-header').find('span').text('查看财务支出');
            editor2.readonly(true);
        }
        flag = !flag;
        data = JSON.parse(data);
        $('#editExpendForm input[name=updateStatus]').attr('disabled', flag).val(data.updateStatus);
        $('#editExpendForm input[name=schoolExpendId]').attr('disabled', flag).val(data.schoolExpendId);
        $('#editExpendForm input[name=applicantId]').val(data.applicantId);
        $('#editExpendForm input[name=applicantId]').prev().val(data.applicantName);
        $('#editExpendForm input[name=applicantDate]').attr('disabled', true).val(getFormatDateByLong(data.applicantDate, 'yyyy/MM/dd hh:mm:ss'));
        $('#editExpendForm input[name=money]').attr('disabled', flag).val(data.money);
        $('#editExpendForm select[name=payment]').attr('disabled', flag).val(data.payment);
        $('#editExpendForm input[name=expendDetail]').attr('disabled', flag).val(data.expendDetail);
        $('#editExpendForm input[name=invoiceTitle]').attr('disabled', flag).val(data.invoiceTitle);
        $('#editExpendForm input[name=departmentId1]').prev().val(data.departmentName);
        $('#editExpendForm input[name=departmentId1]').val(data.departmentId1);
        $('#editExpendForm select[name=projectId]').attr('disabled', flag).val(data.projectId);
        $('#editExpendForm select[name=pCostclassId]').attr('disabled', flag).val(data.pCostclassId);
        $('#editExpendForm select[name=pCostclassId]').change();
        $('#editExpendForm select[name=costclassId]').attr('disabled', flag).val(data.costclassId);
        $('#editExpendForm select[name=incomeType]').attr('disabled', flag).val(data.incomeType);

        //$('#editExpendForm select[name=payeeId]').attr('disabled', true).val(data.payeeId);
        //$('#editExpendForm select[name=payeeId]').change();
        $('#editExpendForm input[name=payeeName]').attr('disabled', flag).val(data.payeeName);
        $('#editExpendForm input[name=accountName]').attr('disabled', flag).val(data.accountName);
        $('#editExpendForm input[name=bankName]').attr('disabled', flag).val(data.bankName);
        $('#editExpendForm input[name=province]').attr('disabled', flag).val(data.province);
        $('#editExpendForm input[name=city]').attr('disabled', flag).val(data.city);
        $('#editExpendForm input[name=accountNum]').attr('disabled', flag).val(data.accountNum);
        $('#editExpendForm input[name=phone]').attr('disabled', flag).val(data.phone);

        $('#editExpendForm select[name=isAdjustment]').attr('disabled', flag).val(data.isAdjustment);
        $('#editExpendForm input[name=departmentId2]').prev().val(data.departmentName);
        $('#editExpendForm input[name=departmentId2]').val(data.departmentId1);
        editor2.html(data.content);
        $('#editExpendModel').show();

    }

    //编辑
    $('#editExpendForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {//表单验证
            money: {
                validators: {
                    notEmpty: {
                        message: '金额不能为空'
                    }
                }
            },
            invoiceTitle: {
                validators: {
                    notEmpty: {
                        message: '发票抬头不能为空'
                    }
                }
            },
            expendDetail: {
                validators: {
                    notEmpty: {
                        message: '支出明细不能为空'
                    }
                }
            },
            payeeId: {
                validators: {
                    notEmpty: {
                        message: '收款人不能为空',
                        //callback: function (value, validator) {
                        //    return !(value == '-1');
                        //}
                    }
                }
            },
            pCostclassId: {
                validators: {
                    notEmpty: {
                        message: '选择类别 ',
                        //callback: function (value, validator) {
                        //    return !(value == '-1');
                        //}
                    }
                }
            }

        },
        submitHandler: function (validator, form, submitButton) {
        	$('#editExpendForm input[name=content]').val(editor2.html());
            $.ajax({
                type: "POST",
                url: ctx + "/financeSchoolExpend/updateRecord",
                data: $("#editExpendForm").serialize(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        $('#editExpendModel').modal('hide');
                        toastr.success(msg.msg);
                        DataTable.init();
                    } else {
                        toastr.error(msg.msg);
                    }

                }
            });
            return false;
        }
    });


    //删除
    function deleteExpend(schoolExpendId) {
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
                type: "POST",
                url: ctx + "/financeSchoolExpend/updateRecord",
                data: {"schoolExpendId": schoolExpendId, "deleteMark": 0},
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        swal("", "删除成功！", "success");
                        DataTable.init();
                    } else {
                        toastr.error(msg.msg);
                    }
                }
            });
        });
    }




    //日期格式化
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    function getFormatDate(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.format(pattern);
    }

    function getFormatDateByLong(l, pattern) {
        return getFormatDate(new Date(l), pattern);
    }
})

 //加载表单
    DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#expendInit').dataTable({
                    "bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
                    "bLengthChange": true,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": false, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/financeSchoolExpend/selectAllByWhere',
                    "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                    "bServerSide": true,
                    "bDestroy": true,
                    "bRetrieve": false,
                    "oLanguage": {
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "抱歉， 没有找到",
                        "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                        "sInfoEmpty": "找不到相关数据",
                        "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                        "sProcessing": "正在加载中...",
                        "sSearch": "搜索",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "尾页"
                        },
                    },
                    "aoColumns": [
                        {"mData": "departmentName", 'sClass': "text-center"},
                        {"mData": "applicantName", 'sClass': "text-center"},
                        {"mData": "pCostClassName", 'sClass': "text-center"},
                        {"mData": "costClassName", 'sClass': "text-center"},
                        {"mData": "expendDetail", 'sClass': "text-center"},
                        {"mData": "money", 'sClass': "text-center"},
                        {"mData": "applicantDate", 'sClass': "text-center"},
                        {"mData": "paymentFrom", 'sClass': "text-center"},
                        {
                            "mData": "schoolExpendId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                var u = "<a data-record='" + JSON.stringify(full) + "' class='btn btn-warning btn-xs'   data-toggle='modal' data-backdrop='static' data-target='#editExpendModel' ><i class='fa fa-folder-open-o' ></i> 查看</a>&nbsp&nbsp";
                                var e = "<a data-record='" + JSON.stringify(full) + "' class='btn btn-info btn-xs edit' data-toggle='modal' data-backdrop='static' data-target='#editExpendModel' ><i class='fa fa-edit'></i>编辑</a>&nbsp&nbsp";
                                var d = "<a data-record='" + full["schoolExpendId"] + "' class='btn btn-danger btn-xs delete'><i class='fa fa-trash-o'></i>删除</a>&nbsp&nbsp";
                                return u + e + d;
                            }
                        }

                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(7)', nRow).html(aData.paymentFrom == '1' ? '集团支付' : '分校支付');
                        return nRow;
                    }
                });
                //每页显示记录数
                $('.dataTables_info').parent().append($('.dataTables_length'));
            }
        }
    }();
    
    //数据初始化
    $("#expendInit tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#expendInit tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init();
    /**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function retrieveData(sSource, aoData, fnCallback, oSettings) {
        var beganAndEnd = $("#queryDate").val();
        if (beganAndEnd && beganAndEnd.length != 0) {
            var minDate = $("#queryDate").val().split("到")[0];
            var maxDate = $("#queryDate").val().split("到")[1];
            aoData.push({"name": "beginTime", "value": minDate ? minDate.trim() : null});
            aoData.push({"name": "endTime", "value": maxDate ? maxDate.trim() : null});
        }
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        var searchVal = $('#searchVal').val();
        if (searchVal && searchVal.length != 0) {
            aoData.push({"name": "searchVal", "value": searchVal});
        }
        var departmentId1 = $('#applyExpendForm input[name=departmentId1]').val();
        if (departmentId1)
            aoData.push({"name": "departmentId1", "value": departmentId1});
        $.ajax({
            "url": sSource,
            "data": aoData,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (response) {
                fnCallback(response.returnObject);
                initTotalIncome();
            }
        });
    }

  //统计
    function initTotalIncome() {
        var beginTime = $("#queryDate").val().split("到")[0];
        var endTime = $("#queryDate").val().split("到")[1];
        var searchVal = $("#searchVal").val();
        var departmentId1 = $('#applyExpendForm input[name=departmentId1]').val();
       /* if (departmentId1 == null || departmentId1.trim() == '') {
            departmentId1 = '-1';
        }*/
        $.ajax({
            url: ctx + '/financeSchoolExpend/getTotalMoneyByWhere',
            data: {
                "beginTime": beginTime,
                "endTime": endTime,
                "searchVal": searchVal,
                "departmentId1": departmentId1
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var html = '<tr class="odd">';
                for (var i = 0; i < 4; i++) html += '<td class="text-center"></td>';
                html +=
                    '<td class="text-center red">统计:</td>' +
                    '<td class="text-center">' + data.reservationNum + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';

                $("#expendInit").find("tbody").prepend(html);
            }
        });
    }


//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

 
