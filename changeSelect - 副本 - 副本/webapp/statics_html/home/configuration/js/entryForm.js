$(function () {
	//按钮提示信息
	$('[data-toggle="tooltip"]').tooltip();
    //职业资格新增
    $(".add-line-pro").on("click", function () {
        var td = $(this).parents("#professional").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="id" style="display:none"></td>'
            + '<td class="desc text-left"><input class="form-control" type="text" value=""></td>'
            
            +'<td>启用</td>'
            
            + '<td>'
            + '<a data-configtype="1" class="save-btn"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table-pro tbody tr .form-control').length == 0) {
            $('.add-table-pro').find('tbody').prepend(addtr);
        	$('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table-pro').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    });
    //职业资格保存
    $('.add-table-pro').on('click', '.save-btn', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
        	toastr.error("内容不能为空！");
        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 1, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(data.configId);
                    tds.eq(1).html(configDesc);
                    _button.removeClass('save-btn').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('btn-warning cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                    location.reload();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("内容不能为空");
            }
        });
    });
    //职业资格编辑
    $('.add-table-pro').on('click', ".edit", function () {
        var tds = $(this).parent().siblings();
        var configType = $(this).data('configtype');
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).html().trim();

        tds.eq(1).html('<input class="form-control" type="text" value="' + configDesc + '">');

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();
        //取消
        $('.add-table-pro').on('click', ".cancel", function () {
            var tds = $(this).parent().siblings();
            tds.eq(1).html(configDesc);
            $(this).removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    //职业资格编辑保存
    $('.add-table-pro').on('click', ".save", function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
        	toastr.error("内容不能为空！");
        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 1, configId: configId, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(configId);
                    tds.eq(1).html(configDesc);
                    _button.html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.removeClass('save').addClass('edit');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //职业资格删除
    $('.add-table-pro').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();
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
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configId: configId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        _button.parent().parent().remove();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
            return false;
        });
    });

    //学历新增
    $(".add-line-return").on("click", function () {
        var tds = $(this).parent().siblings();
        var td = $(this).parents("#return").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="id" style="display:none"></td>'
            + '<td class="desc text-left"><input class="form-control" type="text" value=""></td>'
            +'<td>启用</td>'
            + '<td>'
            + '<a  data-configtype="2" class="save-btn"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a  class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table-return tbody tr .form-control').length == 0) {
            $('.add-table-return').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table-return').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    });
    //学历配置保存
    $('.add-table-return').on('click', '.save-btn', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
	        	toastr.error("内容不能为空！");
	        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 3, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(data.configId);
                    tds.eq(1).html(configDesc);
                    _button.removeClass('save-btn').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                    location.reload();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //学历编辑
    $('.add-table-return').on('click', ".edit", function () {
        var tds = $(this).parent().siblings();
        var configType = $(this).data('configtype');
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).html().trim();

        tds.eq(1).html('<input class="form-control" type="text" value="' + configDesc + '">');

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();
        //保存
        $('.add-table-return').on('click', ".save", function () {
            var tds = $(this).parent().siblings();
            var _button = $(this);
            var configId = tds.eq(0).html().trim();
            var configDesc = tds.eq(1).find('input').val();
            if(configDesc.trim()==''){
	        	toastr.error("内容不能为空！");
	        	return ;
        }
            $.ajax({
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configType: 3, configId: configId, configDesc: configDesc},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        tds.eq(0).html(configId);
                        tds.eq(1).html(configDesc);
                        _button.html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                        _button.removeClass('save').addClass('edit');
                        _button.attr('data-configid', data.configId);
                        _button.next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                        _button.next().attr('data-configid', data.configId);
                        $('[data-toggle="tooltip"]').tooltip();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

        });

        //取消
        $('.add-table-return').on('click', ".cancel", function () {
            var tds = $(this).parent().siblings();
            tds.eq(1).html(configDesc);
            $(this).removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    //学历删除
    $('.add-table-return').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();

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
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configId: configId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        _button.parent().parent().remove();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
    });
    
    
    
    /////////////////
    
    
    
    //学历新增
    $(".add-line-refound").on("click", function () {
        var tds = $(this).parent().siblings();
        var td = $(this).parents("#refound").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="id" style="display:none"></td>'
            + '<td class="desc text-left"><input class="form-control" type="text" value=""></td>'
            +'<td>启用</td>'
            + '<td>'
            + '<a  data-configtype="2" class="save-btn"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a  class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table-refound tbody tr .form-control').length == 0) {
            $('.add-table-refound').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table-refound').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    });
    //学历配置保存
    $('.add-table-refound').on('click', '.save-btn', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
        	toastr.error("内容不能为空！");
        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 4, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(data.configId);
                    tds.eq(1).html(configDesc);
                    _button.removeClass('save-btn').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                    location.reload();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //学历编辑
    $('.add-table-refound').on('click', ".edit", function () {
        var tds = $(this).parent().siblings();
        var configType = $(this).data('configtype');
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).html().trim();

        tds.eq(1).html('<input class="form-control" type="text" value="' + configDesc + '">');

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();
        //保存
        $('.add-table-refound').on('click', ".save", function () {
            var tds = $(this).parent().siblings();
            var _button = $(this);
            var configId = tds.eq(0).html().trim();
            var configDesc = tds.eq(1).find('input').val();
            if(configDesc.trim()==''){
            	toastr.error("内容不能为空！");
            	return ;
            }
            $.ajax({
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configType: 4, configId: configId, configDesc: configDesc},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        tds.eq(0).html(configId);
                        tds.eq(1).html(configDesc);
                        _button.html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                        _button.removeClass('save').addClass('edit');
                        _button.attr('data-configid', data.configId);
                        _button.next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                        _button.next().attr('data-configid', data.configId);
                        $('[data-toggle="tooltip"]').tooltip();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

        });

        //取消
        $('.add-table-refound').on('click', ".cancel", function () {
            var tds = $(this).parent().siblings();
            tds.eq(1).html(configDesc);
            $(this).removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    //学历删除
    $('.add-table-refound').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();

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
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configId: configId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        _button.parent().parent().remove();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
    });
    
    
    /////////////////
    
    
    
    //学历新增
    $(".add-line-examConf").on("click", function () {
        var tds = $(this).parent().siblings();
        var td = $(this).parents("#examConf").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="id" style="display:none"></td>'
            + '<td class="desc text-left"><input class="form-control" type="text" value=""></td>'
            +'<td>启用</td>'
            + '<td>'
            + '<a  data-configtype="2" class="save-btn"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a  class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table-examConf tbody tr .form-control').length == 0) {
            $('.add-table-examConf').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table-examConf').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    });
    //学历配置保存
    $('.add-table-examConf').on('click', '.save-btn', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
        	toastr.error("内容不能为空！");
        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 5, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(data.configId);
                    tds.eq(1).html(configDesc);
                    _button.removeClass('save-btn').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                    location.reload();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //学历编辑
    $('.add-table-examConf').on('click', ".edit", function () {
        var tds = $(this).parent().siblings();
        var configType = $(this).data('configtype');
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).html().trim();

        tds.eq(1).html('<input class="form-control" type="text" value="' + configDesc + '">');

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();
        //保存
        $('.add-table-examConf').on('click', ".save", function () {
            var tds = $(this).parent().siblings();
            var _button = $(this);
            var configId = tds.eq(0).html().trim();
            var configDesc = tds.eq(1).find('input').val();
            if(configDesc.trim()==''){
            	toastr.error("内容不能为空！");
            	return ;
            }
            $.ajax({
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configType: 5, configId: configId, configDesc: configDesc},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        tds.eq(0).html(configId);
                        tds.eq(1).html(configDesc);
                        _button.html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                        _button.removeClass('save').addClass('edit');
                        _button.attr('data-configid', data.configId);
                        _button.next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                        _button.next().attr('data-configid', data.configId);
                        $('[data-toggle="tooltip"]').tooltip();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

        });

        //取消
        $('.add-table-examConf').on('click', ".cancel", function () {
            var tds = $(this).parent().siblings();
            tds.eq(1).html(configDesc);
            $(this).removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    //学历删除
    $('.add-table-examConf').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();

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
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configId: configId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        _button.parent().parent().remove();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
    });
    
    
    
    /////////////////
    
    
    
    //学历新增
    $(".add-line-examSubject").on("click", function () {
        var tds = $(this).parent().siblings();
        var td = $(this).parents("#examSubject").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="id" style="display:none"></td>'
            + '<td class="desc text-left"><input class="form-control" type="text" value=""></td>'
            +'<td>启用</td>'
            + '<td>'
            + '<a  data-configtype="2" class="save-btn"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a  class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table-examSubject tbody tr .form-control').length == 0) {
            $('.add-table-examSubject').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table-examSubject').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    });
    //学历配置保存
    $('.add-table-examSubject').on('click', '.save-btn', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
        	toastr.error("内容不能为空！");
        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 6, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(data.configId);
                    tds.eq(1).html(configDesc);
                    _button.removeClass('save-btn').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                    location.reload();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //学历编辑
    $('.add-table-examSubject').on('click', ".edit", function () {
        var tds = $(this).parent().siblings();
        var configType = $(this).data('configtype');
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).html().trim();

        tds.eq(1).html('<input class="form-control" type="text" value="' + configDesc + '">');

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();
        //保存
        $('.add-table-examSubject').on('click', ".save", function () {
            var tds = $(this).parent().siblings();
            var _button = $(this);
            var configId = tds.eq(0).html().trim();
            var configDesc = tds.eq(1).find('input').val();
            if(configDesc.trim()==''){
            	toastr.error("内容不能为空！");
            	return ;
            }
            $.ajax({
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configType: 6, configId: configId, configDesc: configDesc},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        tds.eq(0).html(configId);
                        tds.eq(1).html(configDesc);
                        _button.html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                        _button.removeClass('save').addClass('edit');
                        _button.attr('data-configid', data.configId);
                        _button.next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                        _button.next().attr('data-configid', data.configId);
                        $('[data-toggle="tooltip"]').tooltip();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

        });

        //取消
        $('.add-table-examSubject').on('click', ".cancel", function () {
            var tds = $(this).parent().siblings();
            tds.eq(1).html(configDesc);
            $(this).removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    //学历删除
    $('.add-table-examSubject').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();

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
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configId: configId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        _button.parent().parent().remove();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
    });
    
    
    
    
    
/////////////////
    
    
    
    //学历新增
    $(".add-line-examAllow").on("click", function () {
        var tds = $(this).parent().siblings();
        var td = $(this).parents("#examAllow").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="id" style="display:none"></td>'
            + '<td class="desc text-left"><input class="form-control" type="text" value=""></td>'
            +'<td>启用</td>'
            + '<td>'
            + '<a  data-configtype="2" class="save-btn"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a  class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table-examAllow tbody tr .form-control').length == 0) {
            $('.add-table-examAllow').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table-examAllow').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    });
    //学历配置保存
    $('.add-table-examAllow').on('click', '.save-btn', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configDesc = tds.eq(1).find('input').val();
        if(configDesc.trim()==''){
        	toastr.error("内容不能为空！");
        	return ;
        }
        $.ajax({
            url: ctx + '/bizConfig/addNewRecord',
            type: 'post',
            data: {configType: 7, configDesc: configDesc},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    tds.eq(0).html(data.configId);
                    tds.eq(1).html(configDesc);
                    _button.removeClass('save-btn').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                    _button.attr('data-configid', data.configId);
                    _button.next().removeClass('cancel-btn').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                    _button.next().attr('data-configid', data.configId);
                    $('[data-toggle="tooltip"]').tooltip();
                    location.reload();
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //学历编辑
    $('.add-table-examAllow').on('click', ".edit", function () {
        var tds = $(this).parent().siblings();
        var configType = $(this).data('configtype');
        var configId = tds.eq(0).html().trim();
        var configDesc = tds.eq(1).html().trim();

        tds.eq(1).html('<input class="form-control" type="text" value="' + configDesc + '">');

        $(this).removeClass('edit').addClass('save').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();
        //保存
        $('.add-table-examAllow').on('click', ".save", function () {
            var tds = $(this).parent().siblings();
            var _button = $(this);
            var configId = tds.eq(0).html().trim();
            var configDesc = tds.eq(1).find('input').val();
            if(configDesc.trim()==''){
            	toastr.error("内容不能为空！");
            	return ;
            }
            $.ajax({
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configType: 7, configId: configId, configDesc: configDesc},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        tds.eq(0).html(configId);
                        tds.eq(1).html(configDesc);
                        _button.html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
                        _button.removeClass('save').addClass('edit');
                        _button.attr('data-configid', data.configId);
                        _button.next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                        _button.next().attr('data-configid', data.configId);
                        $('[data-toggle="tooltip"]').tooltip();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

        });

        //取消
        $('.add-table-examAllow').on('click', ".cancel", function () {
            var tds = $(this).parent().siblings();
            tds.eq(1).html(configDesc);
            $(this).removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    //学历删除
    $('.add-table-examAllow').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var _button = $(this);
        var configId = tds.eq(0).html().trim();

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
                url: ctx + '/bizConfig/addNewRecord',
                type: 'post',
                data: {configId: configId, deleteMark: 0},
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        _button.parent().parent().remove();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
    });
})


// 状态编辑
function editEnable(enable,configId,e){
	if($(e).attr('class') == 'btn btn-xs btn-use'){
		enable = 0
	}else{
		enable = 1;
	}
	
	$.ajax({
		"url" : ctx + '/bizConfig/updateEnable',
		"data" : {
			"configId" : configId,
			"enable" : enable
		},
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			if (response.scode != '20001') {
				sweetAlert("哎呦……", "出错了！", "error");
			}else{
				if(enable == 1){
					$(e).removeClass().addClass('btn btn-xs btn-use');
					$(e).html('<i class="fa fa-check-circle-o"></i>启用');
				}else{
					$(e).removeClass().addClass('btn btn-xs btn-nouse');
					$(e).html('<i class="fa fa-ban"></i>禁用');
				}
			}
		}
	})
}
