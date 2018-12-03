$(function () {
    //日期
    $('#reservation').daterangepicker({
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

    $('#reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });


    $('#reservation1').daterangepicker({
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

    $('#reservation1').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });


    $('#reservation2').daterangepicker({
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

    $('#reservation2').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    init();
    initselect();
    addStudentAttrId();
    updateselect();
    editStudentAttrId();
    editTeahType();

    $('#salesPromotionAdd').bootstrapValidator({
        fields: {
            /*验证*/
            projectType: {
                message: 'The projectType is not valid',
                validators: {
                    notEmpty: {
                        /*非空提示*/
                        message: '类型名称不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {

            $("#addBeginTime").val($("#reservation1").val().split("到")[0]);
            $("#addEndTime").val($("#reservation1").val().split("到")[1]);
            $.ajax({
                type: "POST",
                url: ctx + "/bizScale/addNewRecord",
                data: $("#salesPromotionAdd").serializeArray(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        $('.divideAdd').modal('hide');
                        init();
                        $("#salesPromotionAdd").data('bootstrapValidator').resetForm(true);
                        $("#reservation1").val('');
                    } else {
                        toastr.error(msg.msg);
                    }

                }
            });
        }
    });

    $('#salesPromotionUpdate').bootstrapValidator({
        fields: {
            /*验证*/
            updateProjectType: {
                message: 'The projectType is not valid',
                validators: {
                    notEmpty: {
                        /*非空提示*/
                        message: '类型名称不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $("#updateBeginTime").val($("#reservation2").val().split("到")[0]);
            $("#updateEndTime").val($("#reservation2").val().split("到")[1]);
            $.ajax({
                type: "POST",
                url: ctx + "/bizScale/updateRecord",
                data: $("#salesPromotionUpdate").serializeArray(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        $('.divideEdit').modal('hide');
                        init();
                    } else {
                        toastr.error(msg.msg);
                    }

                }
            });
        }
    });
});
$(document).on('change', 'input:checkbox.master', function () {
    if ($(this).prop('checked')) {
        $('input:checkbox.slaver').prop('checked', 'checked');
    } else {
        $('input:checkbox.slaver').prop('checked', '');
    }
})
function addStudentAttrId() {
    $.ajax({
        url: ctx + "/bizScale/loadSysStudentAttr",
        data: {"attrType": 2},
        dataType: "json",
        async: true,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].typeName, data[i].studentAttrId);
                document.getElementById("addStudentAttrId").options.add(o);
            }
            var def = new Option("--请选择--", "");
            def.selected = true;
            document.getElementById("addStudentAttrId").options.add(def, 0);
        }
    })
}
function initselect() {
    var def = new Option("--请选择--", 0);
    def.selected = true;
    var def1 = new Option("--请选择--", 0);
    def1.selected = true;
    var def2 = new Option("--请选择--", 0);
    def2.selected = true;
    var def3 = new Option("--请选择--", 0);
    def3.selected = true;
    document.getElementById("addProjectId").options.add(def, 0);
    document.getElementById("addProjectLevelId").options.add(def1, 0);
    document.getElementById("addProjectClassId").options.add(def2, 0);
    document.getElementById("addProjectTypeId").options.add(def3, 0);
    $('#addProjectTypeId').change(function () {
        document.getElementById("addProjectId").options.length = 0;
        $.ajax({
            url: ctx + "/bizScale/loadProject",
            data: {"projectType": $('#addProjectTypeId').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].fullName, data[i].projectId);
                    document.getElementById("addProjectId").options.add(o);
                }
                var def = new Option("--请选择--", 0);
                def.selected = true;
                document.getElementById("addProjectId").options.add(def, 0);
            }
        })
    });
    $('#addProjectId').change(function () {
        document.getElementById("addProjectLevelId").options.length = 0;
        $.ajax({
            url: ctx + "/bizScale/loadProjectLevel",
            data: {"projectId": $('#addProjectId').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                    $(o).attr("res", data[i].teachType);
                    document.getElementById("addProjectLevelId").options.add(o);
                }
                var def = new Option("--请选择--", 0);
                def.selected = true;
                document.getElementById("addProjectLevelId").options.add(def, 0);
            }
        })
    });
    $('#addProjectLevelId').change(function () {
        document.getElementById("addProjectClassId").options.length = 0;
        $.ajax({
            url: ctx + "/bizProduct/loadProduct",
            data: {"projectLevelId": $('#addProjectLevelId').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    document.getElementById("addProjectClassId").options.add(o);
                }
                var def = new Option("--请选择--", 0);
                def.selected = true;
                document.getElementById("addProjectClassId").options.add(def, 0);
            }
        })
    });
}
/**
 * 初始化
 * @returns
 */
function init() {
    var init = $('#init').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "iDisplayLength": 10,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": false,
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
        "sAjaxSource": ctx + '/bizScale/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": retrieveData,
        "aoColumns": [
            {
                "mDataProp": "scaleId", 'sClass': "text-center", "mRender": function (data, type, full) {
                return "<label> <input type='checkbox' class='slaver'> <span class='text'></span> </label>";
            }
            },
            {"mDataProp": "projectType", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "belongTo",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '1')
                        return '集团';
                    if (data == '2')
                        return '分校';
                    if (data == '3')
                        return '学慧网';
                }
            },
            {
                "mDataProp": "paymentWay",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '1')
                        return '汇款';
                    if (data == '2')
                        return '转账';
                }
            },
            {
                "mDataProp": "projectTypeId",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '1') return '学历';
                    return '职业资格';
                }
            },
            {"mDataProp": "project", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectLevel", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectClass", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "studentAttr", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "beginTime",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    return data.substring(0, 10);
                }
            },
            {
                "mDataProp": "endTime",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    return data.substring(0, 10);
                }
            },
            {"mDataProp": "ratio", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a onclick="cat(\'' + full["scaleId"]
                    + '\',\'' + full["projectType"]
                    + '\',\'' + full["belongTo"]
                    + '\',\'' + full["paymentWay"]
                    + '\',\'' + full["projectTypeId"]
                    + '\',\'' + full["project"]
                    + '\',\'' + full["projectLevel"]
                    + '\',\'' + full["projectClass"]
                    + '\',\'' + full["projectClassId"]
                    + '\',\'' + full["beginTime"] + "到" + full["endTime"]
                    + '\',\'' + full["ratio"]
                    + '\',\'' + full["studentAttr"]
                    + '\',\'' + full["description"] + '\')" class="btn btn-warning btn-xs edit" data-toggle="modal" data-target=".divideView">'
                    + '<i class="fa fa-edit"></i> 查看</a> '
                    + '<a onclick="edit(\'' + full["scaleId"]
                    + '\',\'' + full["projectType"]
                    + '\',\'' + full["belongTo"]
                    + '\',\'' + full["paymentWay"]
                    + '\',\'' + full["projectTypeId"]
                    + '\',\'' + full["projectId"]
                    + '\',\'' + full["projectLevelId"]
                    + '\',\'' + full["projectClassId"]
                    + '\',\'' + full["projectClassId"]
                    + '\',\'' + full["beginTime"] + "到" + full["endTime"]
                    + '\',\'' + full["ratio"]
                    + '\',\'' + full["studentAttrId"]
                    + '\',\'' + full["description"] + '\')" data-toggle="modal" data-target=".divideEdit" class="btn btn-info btn-xs edit">'
                    + '<i class="fa fa-edit"></i> 编辑</a>'
                    + ' <a href="javascript:void(0);" onclick="del(\'' + full["scaleId"] + '\')" class="btn btn-danger btn-xs delete">'
                    + '    <i class="fa fa-trash-o"></i> 删除</a>'
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#init_wrapper").removeClass();
    $('#init_wrapper').addClass("table-scrollable");

    //横线滚动条
    $('#init_wrapper').on('scroll',function(){
        $('#init_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
    })
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
    aoData.push({"name": "beginTime", "value": $("#reservation").val().split("到")[0]});
    aoData.push({"name": "endTime", "value": $("#reservation").val().split("到")[1]});
    if ($("#searchVal").val() == "启用") {
        aoData.push({"name": "enable", "value": 1});
    }
    else if ($("#searchVal").val() == "禁用") {
        aoData.push({"name": "enable", "value": 0});
    } else {
        aoData.push({"name": "searchVal", "value": $("#searchVal").val()});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
}
/**
 * 删除操作
 * @param val
 * @returns
 */
function del(val) {
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
            url: ctx + '/bizScale/deleteRecord',
            type: 'POST',
            data: {
                scaleId: val,
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    toastr.success(data.msg);
                    init();
                }
            }
        });
    });
}
/**
 * 编辑操作
 * @returns
 */
var teachType;
var studentAttrId;

function edit(scaleId, projectType, belonguTo, paymentWay, projectTypeId, projectId, projectLevelId, projectClassId, val, beginTimeAndEndTime, ratio, studentAttrId, description) {
    document.getElementById("updateProjectId").options.length = 0;
    document.getElementById("updateProjectLevelId").options.length = 0;
    document.getElementById("updateProjectClassId").options.length = 0;
    $('#updateScaleId').val(scaleId);
    $('#updateProjectType').val(projectType);
    $('#updateBelonguTo').val(belonguTo);
    $('#updatePaymentWay').val(paymentWay);
    $('#updateProjectId').val(projectId);
    $('#updateProjectTypeId').val(projectTypeId);
    editStudentAttrId(studentAttrId);
    $.ajax({
        url: ctx + "/bizScale/loadProject",
        data: {"projectType": projectTypeId},
        dataType: "json",
        async: true,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].projectId);
                var rem = (data[i].projectId == projectId)
                o.selected = rem;
                document.getElementById("updateProjectId").options.add(o);
            }
            var def = new Option("--请选择--", 0);
            document.getElementById("updateProjectId").options.add(def, 0);

            $.ajax({
                url: ctx + "/bizScale/loadProjectLevel",
                data: {"projectId": projectId},
                dataType: "json",
                async: true,
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                        var rem = (data[i].projectLevelId == projectLevelId)
                        o.selected = rem;
                        if (o.selected) {
                            teachType = data[i].teachType;
                        }
                        $(o).attr("res", data[i].teachType);
                        document.getElementById("updateProjectLevelId").options.add(o);
                    }
                    var def = new Option("--请选择--", 0);
                    document.getElementById("updateProjectLevelId").options.add(def, 0);


                    document.getElementById("updateProjectClassId").options.length = 0;
                    $.ajax({
                        url: ctx + "/bizProduct/loadProduct",
                        data: {"projectLevelId": $('#updateProjectLevelId').val()},
                        dataType: "json",
                        async: true,
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                var o = new Option(data[i].className, data[i].productId);
                                if (projectClassId == data[i].productId)
                                    o.selected = true;
                                document.getElementById("updateProjectClassId").options.add(o);
                            }
                            var def = new Option("--请选择--", 0);
                            document.getElementById("updateProjectClassId").options.add(def, 0);
                        }
                    });
                }
            })
        }
    })
    $('#updateProjectLevelId').val(projectLevelId);
    $('#reservation2').val(beginTimeAndEndTime);
    $('#updateRatio').val(ratio);
    $('#updateDescription').val(description);
}

function editTeahType() {
    $('#updateProjectLevelId').change(function () {
        document.getElementById("updateProjectClassId").options.length = 0;
        $.ajax({
            url: ctx + "/bizProduct/loadProduct",
            data: {"projectLevelId": $('#updateProjectLevelId').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    document.getElementById("updateProjectClassId").options.add(o);
                }
                var def = new Option("--请选择--", 0);
                def.selected = true;
                document.getElementById("updateProjectClassId").options.add(def, 0);
            }
        });
    });
}

function editStudentAttrId(val) {
    document.getElementById("updateStudentAttrId").options.length = 0;
    $.ajax({
        url: ctx + "/bizScale/loadSysStudentAttr",
        data: {"attrType": 2},
        dataType: "json",
        async: true,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].typeName, data[i].studentAttrId);
                if (val == data[i].studentAttrId) {
                    o.selected = true;
                }
                document.getElementById("updateStudentAttrId").options.add(o);
            }
            var def = new Option("--请选择--", "");
            document.getElementById("updateStudentAttrId").options.add(def, 0);
        }
    })
}

function updateselect() {
    $('#updateProjectTypeId').change(function () {
        document.getElementById("updateProjectId").options.length = 0;
        document.getElementById("updateProjectLevelId").options.length = 0;
        document.getElementById("updateProjectClassId").options.length = 0;
        $.ajax({
            url: ctx + "/bizScale/loadProject",
            data: {"projectType": $('#updateProjectTypeId').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].fullName, data[i].projectId);
                    document.getElementById("updateProjectId").options.add(o);
                }
                var def = new Option("--请选择--", 0);
                def.selected = true;
                var def1 = new Option("--请选择--", 0);
                def1.selected = true;
                var def2 = new Option("--请选择--", 0);
                def2.selected = true;
                document.getElementById("updateProjectId").options.add(def, 0);
                document.getElementById("updateProjectLevelId").options.add(def1, 0);
                document.getElementById("updateProjectClassId").options.add(def2, 0);
            }
        })
    });
    $('#updateProjectId').change(function () {
        document.getElementById("updateProjectLevelId").options.length = 0;
        document.getElementById("updateProjectClassId").options.length = 0;
        $.ajax({
            url: ctx + "/bizScale/loadProjectLevel",
            data: {"projectId": $('#updateProjectId').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                    $(o).attr("res", data[i].teachType);
                    document.getElementById("updateProjectLevelId").options.add(o);
                }
                var def = new Option("--请选择--", 0);
                def.selected = true;
                document.getElementById("updateProjectLevelId").options.add(def, 0);
                var def1 = new Option("--请选择--", 0);
                def1.selected = true;
                document.getElementById("updateProjectClassId").options.add(def1, 0);
            }
        })
    });
}

function cat(scaleId, projectType, belonguTo, paymentWay, projectTypeId, project, projectLevel, projectClass, val, beginTimeAndEndTime, ratio, studentAttr, description) {
    $('#catScaleId').val(scaleId);
    $('#catProjectType').val(projectType);
    $('#catBelonguTo').val(belonguTo);
    if (paymentWay == "1") {
        $('#catPaymentWay').val("汇款");
    } else {
        $('#catPaymentWay').val("转账");
    }
    if (projectTypeId == "1") {
        $('#catProjectTypeId').val("学历");
    } else {
        $('#catProjectTypeId').val("职业教育");
    }
    $('#catProjectId').val(project);
    $('#catProjectLevelId').val(projectLevel);
    if (val == "1")
        $('#catProjectClassId').val("面授");
    if (val == "2")
        $('#catProjectClassId').val("直播");
    if (val == "3")
        $('#catProjectClassId').val("录播");
    $('#reservation3').val(beginTimeAndEndTime);
    $('#catRatio').val(ratio);
    $('#catDescription').val(description);
    $('#catStudentAttrId').val(studentAttr);
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        init();
    }
}