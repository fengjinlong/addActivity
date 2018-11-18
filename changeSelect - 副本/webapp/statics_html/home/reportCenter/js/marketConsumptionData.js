'use strict';

$(function () {

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })

    //区间时间插件  

    durationDate('#reservation', '-');
    durationDate('#reservationtwo', '-');
    durationDate('#reservationthree', '-');
    // 文件上传
    $('#file-es').fileinput({
        theme: 'fa',
        language: 'zh',
        showPreview: false,
        uploadUrl: '#',
        allowedFileExtensions: ['xlsx']
    });
    // checkbox
    (function () {
        var checkall = function checkall() {
            $('#table tbody input').each(function (index, element) {
                $(element).prop('checked', 'checked');
            });
        };
        var nocheck = function nocheck() {
            $('#table tbody input').each(function (index, element) {
                $(element).removeAttr('checked');
            });
        };
        // target
        $('.checkAll').click(function () {
            $('.checkAll').is(':checked') ? checkall() : nocheck();
        });
        //haschecked
        var haschecked = function haschecked(dom) {
            var a = 0;
            $(dom).each(function (i, el) {
                if ($(el).is(':checked')) {
                    a = 1;
                    return false;
                }
            });
            return a;
        };
        // del
        $('#delbtn').click(function () {
            if (haschecked('#table tbody input')) {
                swal({
                    title: '确定要删除么?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnConfirm: false
                }, function () {
                    swal("删除成功！", "", "success");
                    $('#table tbody input').each(function (index, element) {
                        if ($(element).is(':checked')) {
                            $(element).parents('tr').remove();
                        }
                    });
                });
            }
        });
    })();
    //   验证
    // 批量新增
    $('#batchadd').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mediaSources: {
                validators: {
                    notEmpty: {
                        message: '媒体来源不为空'
                    }
                }
            },
            extensionMethod: {
                validators: {
                    notEmpty: {
                        message: '推荐方式不为空'
                    }
                }
            },
            filees: {
                validators: {
                    notEmpty: {
                        message: '文件不为空'
                    }
                }
            }
        }
    });
    // 新增
    $('#add').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mediaSources: {
                validators: {
                    notEmpty: {
                        message: '媒体来源不为空'
                    }
                }
            },
            extensionMethod: {
                validators: {
                    notEmpty: {
                        message: '推荐方式不为空'
                    }
                }
            },
            brand: {
                validators: {
                    notEmpty: {
                        message: '此项不能为空'
                    }
                }
            },
            schoolBranch: {
                validators: {
                    notEmpty: {
                        message: '此项不能为空'
                    }
                }
            },
            productModel: {
                validators: {
                    notEmpty: {
                        message: '此项不能为空'
                    }
                }
            },
            consume: {
                validators: {
                    notEmpty: {
                        message: '此项不能为空'
                    }
                }
            },
            toshow: {
                validators: {
                    notEmpty: {
                        message: '此项不能为空'
                    }
                }
            },
            click: {
                validators: {
                    notEmpty: {
                        message: '此项不能为空'
                    }
                }
            }
        }
    });
});
