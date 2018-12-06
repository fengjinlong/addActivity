$(function () {

    //初始化咨询者类型
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 2},
        dataType: 'json',
        success: function (data) {
            var consulter = "";
            for (var i = 0; i < data.list.length; i++) {
                consulter += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentTypeAdd select[name='studentAttrIds']").html(consulter);
            $("#studentTypeView select[name='studentAttrIds']").html(consulter);

            //多选
            $('.selectpicker').selectpicker();
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

    $('.studentTypeAdd').on('hidden.bs.modal', function () {
        $('#studentTypeAdd')[0].reset();
        $('#studentTypeAdd .selectpicker').selectpicker('refresh');
        $('#studentTypeAdd input').val('');
        $('#studentTypeAdd').data('bootstrapValidator').resetForm();
    })

    //新增
    $('#studentTypeAdd').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var options = form.serialize();

            var studentAttrs = $('#studentTypeAdd select[name="studentAttrIds"]').siblings('button').attr('title');
            options += "&studentAttrs=" + studentAttrs;

            $.ajax({
                type: "POST",
                url: ctx + '/financeBusinessStudentType/addNewRecord',
                data: options,
                dataType: 'json',
                success: function (data) {
                    DataTable.init();
                    $('.studentTypeAdd').modal('hide');
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
    });


    $('.studentTypeView').on('hidden.bs.modal', function () {
        $('#studentTypeView')[0].reset();
        $('#studentTypeView .selectpicker').selectpicker('refresh');
        $('#studentTypeView input').val('');
        $('#studentTypeView').data('bootstrapValidator').resetForm();
    })

    //编辑
    $('#studentTypeView').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var options = form.serialize();
            var studentAttrs = $('#studentTypeView select[name="studentAttrIds"]').siblings('button').attr('title');
            options += "&studentAttrs=" + studentAttrs;

            $.ajax({
                type: "POST",
                url: ctx + '/financeBusinessStudentType/updateRecord',
                data: options,
                dataType: 'json',
                success: function (data) {
                    DataTable.init();
                    $('.studentTypeView').modal('hide');
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
    });


    //查看
    $('#studentType').on('click', 'a.view', function () {

        var full = $(this).data('full');
        $('#studentTypeView input[name="typeId"]').val(full.typeId);
        $('#studentTypeView input[name="typeName"]').val(full.typeName);
        $('#studentTypeView select[name="businessType"]').val(full.businessType);
        $('#studentTypeView select[name="studentAttrIds').selectpicker('val', full.studentAttrIds.indexOf(",") ? full.studentAttrIds.split(',') : full.studentAttrIds);
        $('.selectpicker').selectpicker('refresh');
        $('#studentTypeView select[name="sendWay"]').val(full.sendWay);
        $('#studentTypeView select[name="receiveWay"]').val(full.receiveWay);
        editorV.html(full.content);

        //使表单不可编辑
        $('#studentTypeView input').attr('disabled', 'disabled');
        $('#studentTypeView select').attr('disabled', 'disabled');
        $('.selectpicker').selectpicker('refresh');
        //隐藏确定，取消按钮
        $('.studentTypeView .modal-footer').hide();

        $('.studentTypeView').modal({
        	show:true,
        	backdrop:'static'
        });
    })

    //编辑
    $('#studentType').on('click', 'a.edit', function () {

        var full = $(this).data('full');
        $('#studentTypeView input[name="typeId"]').val(full.typeId);
        $('#studentTypeView input[name="typeName"]').val(full.typeName);
        $('#studentTypeView select[name="businessType"]').val(full.businessType);
        $('#studentTypeView select[name="studentAttrIds').selectpicker('val', full.studentAttrIds.indexOf(",") ? full.studentAttrIds.split(',') : full.studentAttrIds);
        $('.selectpicker').selectpicker('refresh');
        $('#studentTypeView select[name="sendWay"]').val(full.sendWay);
        $('#studentTypeView select[name="receiveWay"]').val(full.receiveWay);
        editorV.html(full.content);

        //使表单可编辑
        $('#studentTypeView input').removeAttr('disabled');
        $('#studentTypeView select').removeAttr('disabled');
        $('.selectpicker').selectpicker('refresh');
        //显示确定，取消按钮
        $('.studentTypeView .modal-footer').show();
        
        $('.studentTypeView').modal({
        	show:true,
        	backdrop:'static'
        });
    })

    //删除
    $('#studentType').on('click', 'a.delete', function () {
        var typeId = $(this).data('id');
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
                url: ctx + '/financeBusinessStudentType/updateRecord',
                data: {typeId: typeId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        DataTable.init();
                        toastr.success(data.msg);
                    } else
                        toastr.error(data.msg);

                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        });
    })


    //日期
    $('.duration').daterangepicker({
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
        showDropdowns: true
    });

})

//品牌初始化数据
var DataTable = function () {
    return {
        init: function () {
            var Table = $('#studentType').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/financeBusinessStudentType/getAll',
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
                    {"mData": "typeName", 'sClass': "text-center"},
                    {
                        "mData": "businessType", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data == 1 ? "大创业" : "小创业";
                    }
                    },
                    {"mData": "studentAttrs", 'sClass': "text-center"},
                    {
                        "mData": "sendWay", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data == 1 ? "集团" : "分校";
                    }
                    },
                    {
                        "mData": "receiveWay", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data == 1 ? "集团" : "分校";
                    }
                    },
                    {
                        "mData": "businessTypeIds",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var v = "<a data-full='" + JSON.stringify(full) + "' class='view'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
                            var e = "<a data-full='" + JSON.stringify(full) + "' class='edit'><i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>";
                            var d = '<a href="#" data-id="' + full.typeId + '" class="delete" data-backdrop="static"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return v + e + d;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            })
			//每页显示记录数
			$('#studentType_wrapper .dataTables_info').parent().append($('#studentType_wrapper .dataTables_length'));
        }
    }
}();


function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

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

//数据初始化
$("#studentType tbody").html("<tr><td height='300' colspan='6' class='text-center'></td></tr>");
$("#studentType tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();