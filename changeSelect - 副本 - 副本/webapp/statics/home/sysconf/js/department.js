$(function () {
    //折叠和添加按钮切换
    $('.department .sidebar-menu>li>.menu-dropdown').on('click', function (event) {
        if ($(this).find('i').hasClass('fa-plus-square-o')) {
            $(this).find('i').removeClass('fa-plus-square-o').addClass('fa-angle-right');
        } else {
            $(this).find('i').removeClass('fa-angle-right').addClass('fa-plus-square-o');
        }
    });

    $('.department .sidebar-menu li > .submenu > li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).find('ul').is('.submenu')) {
            if ($(this).find('.fa-angle-right').hasClass('fa-angle-right')) {
                $(this).find('.fa-angle-right').removeClass('fa-angle-right').addClass('fa-plus-square-o');
            } else {
                $(this).find('.fa-plus-square-o').removeClass('fa-plus-square-o').addClass('fa-angle-right');
            }
        } else {
            if (!$(this).find('i').is('.fa-plus-square-o')) {
                $(this).find('a').append('<i class="fa fa-plus-square-o pull-right"></i>');
            }
        }
    });

    $('.department .sidebar-menu li > .submenu  .submenu>li').on('click', function (event) {
        $(this).addClass("active").siblings().removeClass('active');
        if (!$(this).find('i').is('.fa-plus-square-o')) {
            $(this).find('a').append('<i class="fa fa-plus-square-o pull-right"></i>');
        }
        event.stopPropagation();
    })


    //部门模块
    !function () {
        //点击部门显示职位名称和部门信息
        $('.department .sidebar-menu li .submenu li').on('click', function () {
            var departmentText = $(this).find('a:eq(0) .menu-text').text();
            if (departmentText.indexOf('(') != -1) {
                departmentText = departmentText.substring(0, departmentText.indexOf('('));
            }
            var positionName = '';
            for (var i = 0; i < 6; i++) {
                positionName += "<li>" + "<a href='javascript:;'>"
                    + "<span class='menu-text'>" + departmentText + "</span>"
                    + "</a>"
                    + "</li>";
            }
            $('.position-name .sidebar-menu > li > .submenu').html(positionName);

            //显示部门信息
            var departmentInfo = '<table class="table">'
                + '<tbody>'
                + '<tr>'
                + '<td class="col-xs-3">编号:</td>'
                + '<td class="depNum">0000</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">简称:</td>'
                + '<td class="depShort">' + departmentText + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">部门名称:</td>'
                + '<td class="depName">' + departmentText + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">上级部门:</td>'
                + '<td>无</td> '
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">状态:</td>'
                + '<td class="depStatus">有效</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3 describe">描述:</td>'
                + '<td>'
                + '<textarea class="form-control depDescribe" rows="6" readonly>暂无</textarea>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';
            $('.department-information .widget-body').html(departmentInfo);
            $('.addDepartment,.position-information,.addPosition,.editDepartment,.editPosition').hide();
            $('.department-information').show().addClass('animated bounceInRight');
        });

        //添加部门
        $('.department a').on('click', '.fa-plus-square-o', function (event) {
            var superior = $(this).prev('.menu-text').text();
            if (superior.indexOf('(') != -1) {
                superior = superior.substring(0, superior.indexOf('('));
            }
            $('#superior').val(superior);
            $('.department-information,.position-information,.addPosition,.editPosition,.editDepartment').hide();
            $('.addDepartment').removeClass('hidden').show().addClass('animated bounceInRight');
            event.stopPropagation();

            //确定按钮
            $('.confirm-btn').on('click', function () {
                $('.addDepartment form').bootstrapValidator({
                    message: 'This value is not valid',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        depNum: {
                            validators: {
                                notEmpty: {
                                    message: '部门编号不能为空'
                                }
                            }
                        },
                        depShort: {
                            validators: {
                                notEmpty: {
                                    message: '部门简称不能为空'
                                }
                            }
                        },
                        depName: {
                            validators: {
                                notEmpty: {
                                    message: '部门名称不能为空'
                                }
                            }
                        },
                        depDescribe: {
                            validators: {
                                notEmpty: {
                                    message: '部门描述不能为空'
                                }
                            }
                        },
                    }
                });
            });
        });
        $('.addDepartment-btn').on('click', function () {
            $('#superior').val('无');
            $('.department-information,.position-information,.addPosition,.editPosition,.editDepartment').hide();
            $('.addDepartment').removeClass('hidden').show().addClass('animated bounceInRight');
            $('.confirm-btn').on('click', function () {
                $('.addDepartment form').bootstrapValidator({
                    message: 'This value is not valid',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        depNum: {
                            validators: {
                                notEmpty: {
                                    message: '部门编号不能为空'
                                }
                            }
                        },
                        depShort: {
                            validators: {
                                notEmpty: {
                                    message: '部门简称不能为空'
                                }
                            }
                        },
                        depName: {
                            validators: {
                                notEmpty: {
                                    message: '部门名称不能为空'
                                }
                            }
                        },
                        depDescribe: {
                            validators: {
                                notEmpty: {
                                    message: '部门描述不能为空'
                                }
                            }
                        },
                    }
                });
            });
        });

        //部门编辑
        $('.department-edit').on('click', function () {
            $('.editDepartment .depNum').val($('.department-information .depNum').text());
            $('.editDepartment .depShort').val($('.department-information .depShort').text());
            $('.editDepartment .depName').val($('.department-information .depName').text());
            $('.editDepartment .depDescribe').text($('.department-information .depDescribe').text());

            if ($('.department-information .depSatus').text() == '有效') {
                $('.editDepartment .valid').prop('checked', true);
            } else {
                $('.editDepartment .invalid').prop('checked', true);
            }

            $('.department-information,.addDepartment,.position-information,.addPosition,.editPosition').hide();
            $('.editDepartment').removeClass('hidden').show();


            //点击确定按钮
            $('.confirm-btn').on('click', function () {

            });
            //点击取消按钮
            $('.cancel-btn').on('click', function () {
                $('.editDepartment,.addDepartment,.position-information,.addPosition,.editPosition').hide();
                $('.department-information').removeClass('hidden').show();
            });
        });
    }();

    //职位模块
    !function () {
        $('.position-name .sidebar-menu .menu-dropdown').on('click', '.fa-plus-square-o', function (event) {
            event.stopPropagation();
        });

        //点击职位名称显示职位信息
        $('.position-name .sidebar-menu > li > .submenu').on('click', 'li', function () {
            var positionText = $(this).find('.menu-text').text();
            if (positionText.indexOf('(') != -1) {
                positionText = positionText.substring(0, positionText.indexOf('('));
            }
            var positionInfo = '<table class="table">'
                + '<tbody>'
                + '<tr>'
                + '<td class="col-xs-3">编号:</td>'
                + '<td class="posNum">0001</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">简称:</td>'
                + '<td class="posShort">' + positionText + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">职位名称:</td>'
                + '<td class="posName">' + positionText + '</td> '
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3">状态:</td>'
                + '<td class="posStatus">有效</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="col-xs-3 describe">描述:</td>'
                + '<td>'
                + '<textarea class="form-control posDescribe" rows="6" readonly>暂无</textarea>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';
            $('.position-information .widget-body').html(positionInfo);
            $('.addDepartment,.department-information,.editDepartment,.addPosition,.editPosition').hide();
            $('.position-information').removeClass('hidden').show();
        });

        //职位添加
        $('.position-name .menu-dropdown .fa-plus-square-o').on('click', function () {
            $('.department-information,.editDepartment,.editPosition,.position-information,.addDepartment').hide();
            $('.addPosition').removeClass('hidden').show().addClass('animated bounceInRight');
            $('.confirm-btn').on('click', function () {
                $('.addPosition form').bootstrapValidator({
                    message: 'This value is not valid',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        posNum: {
                            validators: {
                                notEmpty: {
                                    message: '职位编号不能为空'
                                }
                            }
                        },
                        posShort: {
                            validators: {
                                notEmpty: {
                                    message: '职位简称不能为空'
                                }
                            }
                        },
                        posName: {
                            validators: {
                                notEmpty: {
                                    message: '职位名称不能为空'
                                }
                            }
                        },
                        posDescribe: {
                            validators: {
                                notEmpty: {
                                    message: '职位描述不能为空'
                                }
                            }
                        },
                    }
                });
            });
        });

        //职位编辑
        $('.position-edit').on('click', function () {
            $('.editPosition .posNum').val($('.position-information .posNum').text());
            $('.editPosition .posShort').val($('.position-information .posShort').text());
            $('.editPosition .posName').val($('.position-information .posName').text());
            $('.editPosition .posDescribe').text($('.position-information .depDescribe').text());

            if ($('.position-information .posStatus').text() == '有效') {
                $('.editPosition .valid').prop('checked', true);
            } else {
                $('.editPosition .invalid').prop('checked', true);
            }

            $('.department-information,.editDepartment,.position-information,.addPosition,.editPosition').hide();
            $('.editPosition').removeClass('hidden').show();


            //点击确定按钮
            $('.confirm-btn').on('click', function () {

            });
            //点击取消按钮
            $('.cancel-btn').on('click', function () {
                $('.editDepartment,.addDepartment,.department-information,.addPosition,.editPosition').hide();
                $('.position-information').removeClass('hidden').show();
            });
        });
    }();

});

function departmentForm() {	

    $.ajax({
        url: __root__ + '/department/addDepartement',
        type: 'POST',
        data: $('#form1').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success")
                alert(data.msg);
            else
                alert(data.msg);
        },
        error: function (response) {
            alert("系统错误");
        }
    });
    return false;
}