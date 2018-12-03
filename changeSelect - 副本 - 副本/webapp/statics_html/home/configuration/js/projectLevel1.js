$(function () {

    var InitiateSimpleDataTable = function () {
        return {
            init: function () {

                var fullName = $('.project-title').text();
                var projectId = $('#projectLevel input[name="projectId"]').val();

                //Datatable Initiating
                var oTable = $('#projectLevel').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 5,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/bizProjectLevel/getAll',
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
                        {
                            "mDataProp": "projectLevelId",
                            "bSortable": true,
                            'sClass': "text-center",
                            "mRender": function (data, type, full) {
                                return fullName;
                            }
                        },
                        {"mDataProp": "levelTitle", "bSortable": true, 'sClass': "text-center"},
                        {
                            "mDataProp": "teachType",
                            "bSortable": false,
                            'sClass': "text-center",
                            "mRender": function (data, type, full) {
                                var teachType = {};
                                teachType['1'] = "面授";
                                teachType['2'] = "直播";
                                teachType['3'] = "录播";
                                var str = "";
                                if (JSON.parse(data)) {
                                    for (var i = 0; i < JSON.parse(data).length; ++i) {
                                        str += teachType[JSON.parse(data)[i]] + '，';
                                    }
                                    return str.substr(0, str.length - 1);
                                } else {
                                    return "";
                                }

                            }
                        },
                        {
                            "mDataProp": "enable",
                            "bSortable": true,
                            'sClass': "text-center",
                            "mRender": function (data, type, full) {
                                return data ? '启用' : '禁用';
                            }
                        },
                        {
                            "mDataProp": "projectLevelId",
                            "bSortable": false,
                            'sClass': "text-center",
                            "mRender": function (data, type, full) {
                                return "<a href='#' data-id='" + data + "' data-enable='" + full.enable + "' data-teachtype='" + full.teachType + "' class='btn btn-info btn-xs edit'><i class='fa fa-edit'></i> 编辑</a>";
                            }
                        },
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],

                });

            }

        };
    }();

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

        var record = $(this).data('record');

        $('.projectAdd input[name="projectId"]').val(record.projectId);
        $('.projectAdd select[name="projectType"]').val(record.projectType);
        $('.projectAdd input[name="fullName"]').val(record.fullName);
        $('.projectAdd input[name="shortName"]').val(record.shortName);

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
        InitiateSimpleDataTable.init();

    });

    //新增级别
    $('.level .levelAdd').on('click', function () {

        var projectName = $('.project-title').text();
        var projectId = $('#projectLevel input[name="projectId"]').val();

        if (!projectId) {
            toastr.info("请选择项目");
            return;
        }

        var addtr = '<tr>'
            + '<td>' + projectName + '</td>'
            + '<td><input class="input-sm form-control grade" name="grade"></td>'
            + '<td>'
            + '<select class="input-sm form-control teachingForm selectpicker" name="teachingForm"  title="--请选择--">'
            + '<option value="1">面授</option>'
            + '<option value="2">直播</option>'
            + '<option value="3">录播</option>'
            + '</select>'
            + '</td>'
            + '<td>'
            + '<select class="input-sm form-control" name="enable" >'
            + '<option value="1">启用</option>'
            + '<option value="0">禁用</option>'
            + '</select>'
            + '</td>'
            + '<td>'
            + '<a href="javascript:;" data- class="btn btn-xs save btn-use"><i class="fa fa-copy"></i> 保存</a> '
            + '<a href="javascript:;" class="btn btn-warning btn-xs cancel"><i class="fa fa-times"></i> 取消</a>'
            + '</td>'
        '</tr>';

        if ($('#projectLevel tbody tr .form-control').length == 0) {
            $('#projectLevel').find('tbody').prepend(addtr);
            $('.selectpicker').selectpicker();
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
                teachType: JSON.stringify(teachType),
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

        $(this).removeClass('edit btn-info').addClass('save btn-use').html('<i class="fa fa-copy"></i> 保存');
        //$(this).after(' <a href="javascript:;" class="btn btn-warning btn-xs cancel-btn"><i class="fa fa-times"></i> 取消</a>')
        $(this).next().removeClass('delete btn-danger').addClass('btn btn-warning btn-xs cancel-btn');
        $(this).next().html('<i class="fa fa-times"></i> 取消');


        //取消
        $('#projectLevel').on('click', '.cancel-btn', function () {
            tds = $(this).parent().siblings();
            tds.eq(1).html(grade);
            tds.eq(2).html(teachingForm);
            tds.eq(3).html(enable ? "启用" : "禁用");
            /* $(this).prev().removeClass('save btn-use').addClass('edit btn-info').html('<i class="fa fa-edit"></i> 编辑');
             $(this).remove();*/
            $(this).removeClass('cancel btn-warning').addClass('delete btn-danger');
            $(this).html('<i class="fa fa-trash-o"></i> 删除');

            $(this).prev().removeClass('save btn-use').addClass('edit btn-info');
            $(this).prev().html('<i class="fa fa-edit"></i> 编辑');
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

    //项目菜单加载
    $.ajax({
        url: ctx + '/bizProject/getAll',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var qualification = "";
                var education = "";
                for (var i = 0; i < data.list.length; ++i) {
                    if (data.list[i].projectType == 1) {//职业资格
                        qualification += "<li> <a href='#' data-record='" + JSON.stringify(data.list[i]) + "'><span class='menu-text'>" + data.list[i].fullName + "</span><div class='operate-btn'>" +
                            "<i class='fa fa-edit blue' data-record='" + JSON.stringify(data.list[i]) + "' data-toggle='modal' data-backdrop='static'></i>" +
                            '</div></a></li>';
                    } else {//学历
                        education += "<li> <a href='#' data-record='" + JSON.stringify(data.list[i]) + "'><span class='menu-text'>" + data.list[i].fullName + "</span><div class='operate-btn'>" +
                            "<i class='fa fa-edit blue' data-record='" + JSON.stringify(data.list[i]) + "' data-toggle='modal' data-backdrop='static'></i>" +
                            '</div></a></li>';
                    }
                }

                $('.projectType .qualification').html(qualification);
                $('.projectType .education').html(education);

            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });


    //项目新增的modal
    $('.projectAdd').on('hidden.bs.modal', function () {
        $('#projectAdd')[0].reset();
        $('#projectAdd input:hidden').val('');
        $('#projectAdd').data('bootstrapValidator').resetForm();
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

    function retrieveData(sSource, aoData, fnCallback, oSettings) {

        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
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
            }
        });
    }

});



