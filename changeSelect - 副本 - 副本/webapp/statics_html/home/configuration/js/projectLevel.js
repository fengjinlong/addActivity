$(function () {

    //折叠按钮切换
    $('.projectType .sidebar-menu').on('click', '.menu-dropdown', function () {
        if ($(this).next('.submenu').css('display') == 'none') {
            $(this).find('.pull-right').removeClass('fa-angle-right').addClass('fa-angle-down');
            $(this).parent().siblings().find('.pull-right').removeClass('fa-angle-down').addClass('fa-angle-right');
        } else {
            $(this).find('.pull-right').removeClass('fa-angle-down').addClass('fa-angle-right');
        }
    });

    //项目种类禁用
    $('.projectType .forbidden').click(function (event) {
        if ($(this).is('.fa-check-square-o')) {
            $(this).removeClass('success fa-check-square-o').addClass('default fa-ban');
        } else {
            $(this).removeClass('default fa-ban').addClass('success fa-check-square-o');
        }
        event.stopPropagation();
    });

    //项目编辑
    $(document).on('click', '.projectType .fa-edit', function (event) {

        $('.projectAdd').modal('show');
        $('.projectAdd .widget-caption').html('编辑')

        var record = $(this).data('record');

        $('.projectAdd input[name="projectId"]').val(record.projectId);
        $('.projectAdd select[name="projectType"]').val(record.projectType);
        $('.projectAdd input[name="fullName"]').val(record.fullName);
        $('.projectAdd input[name="shortName"]').val(record.shortName);
        $('.projectAdd input[name="code"]').val(record.code);

        event.stopPropagation();
    })

    //项目删除
    $(document).on('click', '.projectType .fa-trash-o', function (event) {

        var record = $(this).data('record');
        var projectId = record.projectId;
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
                url: ctx + '/bizProject/updateRecord',
                data: {projectId: projectId, deleteMark: 0},
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        swal("", "删除成功！", "success");
                        loadHtml("/bizProject/index");
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            })
        })
        event.stopPropagation();
    })

    //点击项目种类显示对应级别信息
    $('.projectType .sidebar-menu .submenu').on('click', 'a', function () {
        //$('#projectLevel tbody tr').find('td:first').text($(this).find('.menu-text').text().substr(0, 4).trim());

        var record = $(this).data('record');

        var fullName = record.fullName;
        var projectId = record.projectId;

        //保存项目的名称和id,以备增删改
        $('.project-title').html(fullName);
        $('#projectLevel input[name="projectId"]').val(projectId);

        //生成table
        $("#projectLevel tbody").html("<tr><td height='300' colspan='5' class='text-center'></td></tr>");
        $("#projectLevel tbody>tr>td").mLoading({
            text: '正在加载中，请稍后......',
            icon: "../statics_html/common/image/loading5.gif"
        });
        InitiateSimpleDataTable.init();
    });

    //新增级别
    $('.level .levelAdd').on('click', function () {

        var projectName = $('.project-title').text();
        var projectId = $('#projectLevel input[name="projectId"]').val();

        if (!projectId) {
            toastr.error("请选择项目");
            return;
        }

        var addtr = '<tr>'
            + '<td class="text-center">' + projectName + '</td>'
            + '<td class="text-center"><input class="input-sm form-control grade" name="grade"></td>'
            + '<td>'
            + '<select class="input-sm form-control teachingForm selectpicker" name="teachingForm"  title="--请选择--">'
            + '<option value="1">面授</option>'
            + '<option value="2">直播</option>'
            + '<option value="3">录播</option>'
            + '</select>'
            + '</td>'
            + '<td class="text-center">'
            + '<select class="input-sm form-control" name="enable" >'
            + '<option value="1">启用</option>'
            + '<option value="0">禁用</option>'
            + '</select>'
            + '</td>'
            + '<td class="text-center">'
            + '<a href="javascript:;" class="save"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a> '
            + '<a href="javascript:;" class="cancel"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
        '</tr>';

        if ($('#projectLevel tbody tr .form-control').length == 0) {
            $('#projectLevel').find('tbody').prepend(addtr);
            $('.selectpicker').selectpicker();
            $('[data-toggle="tooltip"]').tooltip();
        }

    })

    //级别保存
    $('#projectLevel').on('click', '.save', function () {

        var projectId = $('#projectLevel input[name="projectId"]').val();//项目ID
        var levelTitle = $(this).parent('td').parent('tr').find('input[name="grade"]').val();//级别
        var teachType = $(this).parent('td').parent('tr').find('.selectpicker').selectpicker('val');//授课形式
        var enable = $(this).parent('td').parent('tr').find('select[name="enable"]').val();//是否可用

        var projectLevelId = $(this).data('id');

        //项目级别新增
        $.ajax({
            url: ctx + '/bizProjectLevel/addNewRecord',
            data: {
                projectLevelId: projectLevelId,
                projectId: projectId,
                levelTitle: levelTitle,
                teachType: teachType,
                enable: enable
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    InitiateSimpleDataTable.init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });

    //取消
    $('#projectLevel').on('click', '.cancel', function () {
        $(this).parent().parent().remove();
    });


    //编辑
    $('#projectLevel').on('click', '.edit', function () {

        var tds = $(this).parent().siblings();

        var grade = tds.eq(1).text();
        var teachingForm = tds.eq(2).text();

        var teachType = $(this).data('teachtype');

        var enable = $(this).data('enable');

        tds.eq(1).html('<input class="input-sm form-control grade" name="grade" value=' + grade + '>');

        tds.eq(2).html(
            '<select class="input-sm form-control teachingForm selectpicker" name="teachingForm"' +
            ' title="--请选择--">'
            + '<option value="1">面授</option>'
            + '<option value="2">直播</option>'
            + '<option value="3">录播</option>'
            + '</select>');
        $('.selectpicker').selectpicker();
        $('.selectpicker').selectpicker('val', teachType);

        tds.eq(3).html(
            '<select class="input-sm form-control selectenable" name="enable">'
            + '<option value="1" >启用</option>'
            + '<option value="0" >禁用</option>'
            + '</select>'
        );

        $('.selectenable').val(enable);

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel-btn').html('<i class="fa fa-times warning"  data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>');

        //取消
        $('#projectLevel').on('click', '.cancel-btn', function () {
            tds = $(this).parent().siblings();
            tds.eq(1).html(grade);
            tds.eq(2).html(teachingForm);
            tds.eq(3).html(enable ? "启用" : "禁用");
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $(this).removeClass('cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>');

        });
    })

    //级别删除
    $('#projectLevel').on('click', '.delete', function () {
        var projectLevelId = $(this).data('id');
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
                url: ctx + '/bizProjectLevel/updateRecord',
                data: {projectLevelId: projectLevelId, deleteMark: 0},
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        swal("", "删除成功！", "success");
                        InitiateSimpleDataTable.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
        });
    })

    //状态切换
    $('#projectLevel').on('click', '.status-btn', function () {
        if ($(this).is('.btn-use')) {
            $(this).removeClass('btn-use').addClass('btn-nouse').html('<i class="fa fa-ban"></i> 禁用');
        } else {
            $(this).removeClass('btn-nouse').addClass('btn-use').html('<i class="fa fa-check-square-o"></i> 启用');
        }
    });

    //项目新增的modal
    $('.projectAdd').on('hidden.bs.modal', function () {
        $('#projectAdd')[0].reset();
        $('#projectAdd input:hidden').val('');
        $('#projectAdd').data('bootstrapValidator').resetForm();
    })
    $('.projectAddBtn').on('click',function(){
        $('.projectAdd .widget-caption').html('新增');
    })


    //项目新增
    $('#projectAdd').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            fullName: {
                validators: {
                    notEmpty: {
                        message: '项目全称不能为空'
                    }
                }
            },
            shortName: {
                validators: {
                    notEmpty: {
                        message: '项目简称不能为空'
                    }
                }
            },
            code: {
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    }
                }
            },
            projectType: {
                validators: {
                    callback: {
                        message: '请选择',
                        callback: function (value, validator) {
                            // Get the selected options
                            var options = validator.getFieldElements('projectType').val();
                            //console.log(options);
                            return options;
                        }
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                url: ctx + '/bizProject/addNewRecord',
                data: form.serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {

                        //项目新增的modal
                        $('.projectAdd').on('hidden.bs.modal', function () {
                            loadHtml("/bizProject/index");
                        })

                        $('.projectAdd').modal('hide');
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
        }
    });


});

function retrieveData(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var projectId = $('#projectLevel input[name="projectId"]').val();
    aoData.push({"name": "projectId", "value": projectId});

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
}  
    
