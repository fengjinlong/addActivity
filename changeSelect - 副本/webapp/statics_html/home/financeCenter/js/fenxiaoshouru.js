$(function () {
    //起止时间
    $("#queryDate").daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
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
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
    $("#incomeAdd input[name=payDate]").jeDate({
        format: 'YYYY-MM-DD hh:mm:ss'
    });

    //初始化
    function init() {
        initProject();
        initCostClass(0);
    }

    init();

    //加载表单
    DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#incomeInit').dataTable({
                    "bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
                    "bLengthChange": true,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": false, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/financeSchoolIncome/selectAllByWhere',
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
                        {"mData": "createDate", 'sClass': "text-center"},
                        {"mData": "collectionDepartName", 'sClass': "text-center"},
                        {"mData": "pCostClassName", 'sClass': "text-center"},
                        {"mData": "costClassName", 'sClass': "text-center"},
                        {"mData": "incomeDetail", 'sClass': "text-center"},
                        {"mData": "money", 'sClass': "text-center"},
                        {"mData": "payOrg", 'sClass': "text-center"},
                        {
                            "mData": "schoolIncomeId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                var u = "<a data-record='" + JSON.stringify(full) + "' class='operate-btn view'   data-toggle='modal' data-backdrop='static' data-target='#viewInfo' ><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
                                var e = "<a data-record='" + JSON.stringify(full) + "' class='operate-btn edit' data-toggle='modal' data-backdrop='static' data-target='#viewInfo' ><i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>";
                                var d = "<a data-record='" + full["schoolIncomeId"] + "' class='operate-btn delete'><i class='fa fa-trash-o danger' data-toggle='tooltip' data-placement='top' data-original-title='删除' title='删除'></i></a>";
                                return u + e + d;
                            }
                        }

                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }]
                });
                //每页显示记录数
                $('.dataTables_info').parent().append($('.dataTables_length'));
            }
        }

    }();
    $("#incomeInit tbody").html("<tr><td height='300' colspan='8' class='text-center'></td></tr>");
    $("#incomeInit tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init();
    //编辑 删除 查看
    $('#incomeInit').on('click', 'a.operate-btn', function () {
        var data = $(this).attr('data-record');
        if ($(this).hasClass('view')) {
            editIncome(false, data)
        } else if ($(this).hasClass('edit')) {
            editIncome(true, data)
        } else if ($(this).hasClass('delete')) {
            deleteIncome(data)
        }
    });
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

        var collectionDepartment = $('#incomeAdd input[name=collectionDepartment]').val();
        if (collectionDepartment)
            aoData.push({"name": "collectionDepartment", "value": collectionDepartment});

        $.ajax({
            "url": sSource,
            "data": aoData,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (response) {
                fnCallback(response.returnObject);
                initTotalIncome();
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    }

    //级别联动
    $('#incomeAdd select[name=pCostclassId]').change(function () {
        $('#incomeAdd select[name=costclassId]').find('option').remove();
        initCostClass($(this).val(), true);

    });
    $('#editIncome select[name=pCostclassId]').change(function () {
        $('#editIncome select[name=costclassId]').find('option').remove();
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
                    $('#incomeAdd select[name=pCostclassId]').find('option').remove();
                    $('#incomeAdd select[name=pCostclassId]').append("<option value='-1'>--请选择--</option>");
                    $('#editIncome select[name=pCostclassId]').find('option').remove();
                    $('#editIncome select[name=pCostclassId]').append("<option value='-1'>--请选择--</option>");
                    $(data).each(function (i, item) {
                        var option = "<option value='" + item.financeCostclassId + "'>" + item.costclassName + "</option>";
                        $('#incomeAdd select[name=pCostclassId]').append(option);
                        $('#editIncome select[name=pCostclassId]').append(option);
                    });
                } else {
                    if (isAdd) {
                        $('#incomeAdd select[name=costclassId]').find('option').remove();
                    } else {
                        $('#editIncome select[name=costclassId]').find('option').remove();
                    }

                    $(data).each(function (i, item) {
                        var option = "<option value='" + item.financeCostclassId + "'>" + item.costclassName + "</option>";
                        if (isAdd) {
                            $('#incomeAdd select[name=costclassId]').append(option);
                        } else {
                            $('#editIncome select[name=costclassId]').append(option);
                        }
                    });
                }
            }
        })
    }

    //初始化部门
    function initDepartment() {
        $.ajax({
            url: ctx + "/department/selectDepartementByUser",
            dataType: "json",
            async: true,
            success: function (data) {
                if (data.type == '3') {
                    $('#incomeAdd input[name=collectionDepartment]').val(data.departmentId);
                    $('#incomeAdd input[name=collectionDepartment]').prev().val(data.fullName);
                }
            }
        })
    }

    //初始化项目
    function initProject() {
        $('#incomeAdd select[name=projectId]').find('option').remove();
        $('#editIncome select[name=projectId]').find('option').remove();
        $.ajax({
            url: ctx + "/bizProject/getAllOption",
            async: true,
            success: function (data) {
                $(data.list).each(function (i, item) {
                    var option = "<option value='" + item.projectId + "'>" + item.fullName + "</option>";
                    $('#incomeAdd select[name=projectId]').append(option);
                    $('#editIncome select[name=projectId]').append(option);
                });
            }
        })
    }

    //编辑 查看
    function editIncome(flag, data) {
        if (flag) {
            $('.bs-example-modal-lg .modal-footer').css('display', 'block');
            $('#viewInfo .modal-header').find('span').text('编辑财务收入');
            editor2.readonly(false);
        } else {
            $('.bs-example-modal-lg .modal-footer').css('display', 'none');
            $('#viewInfo .modal-header').find('span').text('查看财务收入');
            editor2.readonly(true);
        }
        flag = !flag;
        data = JSON.parse(data);
        $('#editIncome input[name=schoolIncomeId]').attr('disabled', flag).val(data.schoolIncomeId);
        $('#editIncome input[name=payOrg]').attr('disabled', flag).val(data.payOrg);
        $('#editIncome input[name=payDate]').attr('disabled', true).val(getFormatDateByLong(data.payDate, 'yyyy-MM-dd hh:mm:ss'));
        $('#editIncome input[name=collectionDepartment]').prev().val(data.collectionDepartName);
        $('#editIncome input[name=collectionDepartment]').val(data.collectionDepartment);
        $('#editIncome input[name=money]').attr('disabled', flag).val(data.money);
        $('#editIncome select[name=payment]').attr('disabled', flag).val(data.payment);
        $('#editIncome select[name=projectId]').attr('disabled', flag).val(data.projectId);
        $('#editIncome select[name=pCostclassId]').attr('disabled', flag).val(data.pCostclassId);
        $('#editIncome select[name=pCostclassId]').change();
        $('#editIncome select[name=costclassId]').attr('disabled', flag).val(data.costclassId);
        $('#editIncome select[name=incomeType]').attr('disabled', flag).val(data.incomeType);
        $('#editIncome input[name=incomeDetail]').attr('disabled', flag).val(data.incomeDetail);
        editor2.html(data.content);
        $('#viewInfo').show();

    }

    //清除表单
    $('#applyAddButton').on('click', function () {
        var departmentId = $('#incomeAdd input[name=collectionDepartment]').val();
        if (departmentId == null || departmentId.trim() == "") {
            toastr.error('部门不为分校');
            return false;
        }
        clearApplyForm();
    });
    function clearApplyForm() {
        var departmentId = $('#incomeAdd input[name=collectionDepartment]').val();
        var collectionDepartment = $('#incomeAdd input[name=collectionDepartment]').prev().val();
        $('#incomeAdd')[0].reset();
        $('#incomeAdd input[name=collectionDepartment]').val(departmentId);
        $('#incomeAdd input[name=collectionDepartment]').prev().val(collectionDepartment);
        editor.html('');
        $('#newAddModel').show();
    }


    $('#newAddModel').on('hidden.bs.modal', function () {
        $('#incomeAdd')[0].reset();
        $('#incomeAdd select[name=pCostclassId]').change();
        $('#incomeAdd').data('bootstrapValidator').resetForm();
    })

    //新增提交
    $('#incomeAdd').bootstrapValidator({
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
                    },
                    regexp: {
                        regexp: /^\d+(\.\d{1,2})?$/,
                        message: '金额只能为数字且只有两位小数点'
                    }
                }
            },
            payOrg: {
                validators: {
                    notEmpty: {
                        message: '付款单位不能为空'
                    }
                }
            },
            incomeDetail: {
                validators: {
                    notEmpty: {
                        message: '收入说明不能为空'
                    }
                }
            },
            payment: {
                validators: {
                    callback: {
                        message: '选择支付方式',
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
                type: "POST",
                url: ctx + "/financeSchoolIncome/addNewRecord",
                data: $("#incomeAdd").serialize(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        $('#newAddModel').modal('hide');
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
    //编辑提交
    $('#editIncome').bootstrapValidator({
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
                    },
                    regexp: {
                        regexp: /^\d+(\.\d{1,2})?$/,
                        message: '金额只能为数字且只有两位小数点'
                    }
                }
            },
            payOrg: {
                validators: {
                    notEmpty: {
                        message: '付款单位不能为空'
                    }
                }
            },
            incomeDetail: {
                validators: {
                    notEmpty: {
                        message: '收入说明不能为空'
                    }
                }
            },
            payment: {
                validators: {
//                    callback: {
//                        message: '选择支付方式',
//                        callback: function (value, validator) {
//                            return !(value == '-1');
//                        }
//                    }
                }
            },
            pCostclassId: {
                validators: {
//                    callback: {
//                        message: '选择类别 ',
//                        callback: function (value, validator) {
//                            return !(value == '-1');
//                        }
//                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $('#editIncome input[name=content]').val(editor2.html());
            var pCostclassId = $("#editIncome").find("select[name='pCostclassId']").val();
            var payment = $("#editIncome").find("select[name='payment']").val();
            if(!pCostclassId || pCostclassId == '-1'){
            	toastr.error("选择类别 ");
            	return false;
            }
            if(!payment || payment == '-1'){
            	toastr.error("选择支付方式");
            	return false;
            }
            $.ajax({
                type: "POST",
                url: ctx + "/financeSchoolIncome/updateRecord",
                data: $("#editIncome").serializeArray(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        $('#viewInfo').modal('hide');
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
    function deleteIncome(schoolIncomeId) {
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
                url: ctx + "/financeSchoolIncome/updateRecord",
                data: {"schoolIncomeId": schoolIncomeId, "deleteMark": 0},
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

    //统计
    function initTotalIncome() {
        var beginTime = $("#queryDate").val().split("到")[0];
        var endTime = $("#queryDate").val().split("到")[1];
        var searchVal = $("#searchVal").val();
        var collectionDepartment = $('#incomeAdd input[name=collectionDepartment]').val();
        /*if (collectionDepartment == null || collectionDepartment.trim() == '') {
        	collectionDepartment = '-1';
        }*/
        $.ajax({
            url: ctx + '/financeSchoolIncome/getTotalMoneyByWhere',
            data: {
                "beginTime": beginTime ? beginTime.trim() : null,
                "endTime": endTime ? endTime.trim() : null,
                "searchVal": searchVal,
                "collectionDepartment": collectionDepartment
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
            	console.info(data.data);
                var html = '<tr class="odd">';
                for (var i = 0; i < 4; i++) html += '<td class="text-center"></td>';
                html +=
                    '<td class="text-center red">统计:</td>' +
                    '<td class="text-center">' + data.data + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';

                $("#incomeInit").find("tbody").prepend(html);
            }
        });
    }

    //验证收款人
    function validatePayee(value, validator) {
        var flag = false;
        var optionArr = $('#financeApplyForm select[name=payeeId]')[0].options;
        $(optionArr).each(function (i, item) {
            if (item.value == '-1') return true;
            if (item.value == value) {
                flag = true;
                return false;
            }
        });
        return flag;
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
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
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


//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}