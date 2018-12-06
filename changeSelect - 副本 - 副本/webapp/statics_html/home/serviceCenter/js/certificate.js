$(function () {
    //初始化控件initFileInput(id,uploadurl)控件id，与上传路径
    initFileInput("asingle-upload");
    function initFileInput(ctrlName) {
        var control = $('#' + ctrlName);
        control.fileinput({
            resizeImage: true,
            maxImageWidth: 200,
            maxImageHeight: 200,
            resizePreference: 'width',
            language: 'zh', //设置语言
            uploadUrl: ctx + '/file/uploadFile',
            uploadAsync: true,
            allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: true,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            maxFileCount: 3,
            msgFilesTooMany: "选择图片超过了最大数量",
            maxFileSize: 2000,
        });
    };

    //日期
    $('#DateCertificate').daterangepicker({
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

    $('#DateCertificate').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
    //上传文件
    $('#asingle-upload').fileinput({
        language: 'zh',
        uploadUrl: 'http://www.baidu.com',
        allowedFileExtensions: ['jpg', 'png', 'gif'],
    })
    $('#edit-upload').fileinput({
        language: 'zh',
        uploadUrl: 'http://www.baidu.com',
        allowedFileExtensions: ['jpg', 'png', 'gif'],
    })

    $('#bulk-upload').fileinput({
        language: 'zh',
        uploadUrl: 'http://www.baidu.com',
        allowedFileExtensions: ['jpg', 'png', 'gif'],
    })

    //关闭预览效果
    $(document).on('click', '#kvFileinputModal .btn-close', function () {
        $('#kvFileinputModal').modal('hide');
    })
    //项目
    $.ajax({
        url: ctx + '/bizProject/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var project = "";
            for (var i = 0; i < data.list.length; i++) {
                project += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            }
            $('#repeatedPhone select[name="projectId"]').html('<option value="">--请选择--</option>' + project);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //项目级别
    $('#repeatedPhone select[name="projectId"]').change(function () {
        var projectId = $('#repeatedPhone select[name="projectId"] :selected').val();
        $.ajax({
            url: ctx + '/bizProjectLevel/getAllOption',
            type: 'POST',
            data: {projectId: projectId},
            dataType: 'json',
            success: function (data) {
                var level = "";
                for (var i = 0; i < data.list.length; i++) {
                    level += "<option value=" + data.list[i].projectLevelId + ">" + data.list[i].levelTitle + "</option>";
                }
                $('#repeatedPhone select[name="levelId"]').html('<option value="">--请选择--</option>' + level);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //项目，级别，身份证查询学生信息
    $('#repeatedPhone input[name="idCard"]').change(function () {
        var projectId = $('#repeatedPhone select[name="projectId"] ').val();
        var levelId = $('#repeatedPhone select[name="levelId"] ').val();
        var idCard = $('#repeatedPhone :input[name="idCard"]').val();
        $.ajax({
            type: "POST",
            url: ctx + '/consultInfoManage/selectStudent',
            data: {projectId: projectId, projectLevelId: levelId, idcard: idCard},
            dataType: 'json',
            success: function (data) {
                if (data.list.length != 0) {
                    $('#repeatedPhone input[name="name"]').val(data.list[0].studentName);
                    $('#repeatedPhone input[name="phone"]').val(data.list[0].studentPhone);
                    $('#repeatedPhone input[name="serialNumber"]').val(data.list[0].bmcode);
                } else {
                    toastr.error("系统没有该学员信息，请核对项目，项目级别以及身份证号码是否填写正确！");
                }
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    });
    $('#certificateEditing input[name="idCard"]').change(function () {
        var projectId = $('#certificateEditing select[name="projectId"] ').val();
        var levelId = $('#certificateEditing select[name="levelId"] ').val();
        var idCard = $('#certificateEditing :input[name="idCard"]').val();
        $.ajax({
            type: "POST",
            url: ctx + '/consultInfoManage/selectStudent',
            data: {projectId: projectId, projectLevelId: levelId, idcard: idCard},
            dataType: 'json',
            success: function (data) {
                if (data.list.length != 0) {
                    $('#certificateEditing input[name="name"]').val(data.list[0].studentName);
                    $('#certificateEditing input[name="phone"]').val(data.list[0].studentPhone);
                    $('#certificateEditing input[name="serialNumber"]').val(data.list[0].bmcode);
                } else {
                    toastr.error("系统没有该学员信息，请核对项目，项目级别以及身份证号码是否填写正确！");
                    $('#certificateEditing input[name="name"]').val('');
                    $('#certificateEditing input[name="phone"]').val('');
                    $('#certificateEditing input[name="serialNumber"]').val('');
                }
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    });
    $('#certificateEditing select[name="projectId"]').change(function () {
        var projectId = $('#certificateEditing select[name="projectId"] ').val();
        var levelId = $('#certificateEditing select[name="levelId"] ').val();
        var idCard = $('#certificateEditing :input[name="idCard"]').val();
        $.ajax({
            type: "POST",
            url: ctx + '/consultInfoManage/selectStudent',
            data: {projectId: projectId, projectLevelId: levelId, idcard: idCard},
            dataType: 'json',
            success: function (data) {
                if (data.list.length != 0) {
                    $('#certificateEditing input[name="name"]').val(data.list[0].studentName);
                    $('#certificateEditing input[name="phone"]').val(data.list[0].studentPhone);
                    $('#certificateEditing input[name="serialNumber"]').val(data.list[0].bmcode);
                } else {
                    toastr.error("系统没有该学员信息，请核对项目，项目级别以及身份证号码是否填写正确！");
                    $('#certificateEditing input[name="name"]').val('');
                    $('#certificateEditing input[name="phone"]').val('');
                    $('#certificateEditing input[name="serialNumber"]').val('');
                }
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    });
    $('#certificateEditing select[name="levelId"]').change(function () {
        var projectId = $('#certificateEditing select[name="projectId"] ').val();
        var levelId = $('#certificateEditing select[name="levelId"] ').val();
        var idCard = $('#certificateEditing :input[name="idCard"]').val();
        $.ajax({
            type: "POST",
            url: ctx + '/consultInfoManage/selectStudent',
            data: {projectId: projectId, projectLevelId: levelId, idcard: idCard},
            dataType: 'json',
            success: function (data) {
                if (data.list.length != 0) {
                    $('#certificateEditing input[name="name"]').val(data.list[0].studentName);
                    $('#certificateEditing input[name="phone"]').val(data.list[0].studentPhone);
                    $('#certificateEditing input[name="serialNumber"]').val(data.list[0].bmcode);
                } else {
                    toastr.error("系统没有该学员信息，请核对项目，项目级别以及身份证号码是否填写正确！");
                    $('#certificateEditing input[name="name"]').val('');
                    $('#certificateEditing input[name="phone"]').val('');
                    $('#certificateEditing input[name="serialNumber"]').val('');
                }
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    });
});
$('.asingleEntry').on('hidden.bs.modal', function () {
	editor.html('');
    $('#repeatedPhone')[0].reset();
    $('#repeatedPhone input:hidden').val('');
    $('#repeatedPhone .selectpicker').selectpicker('refresh');
    $('#repeatedPhone').data('bootstrapValidator').resetForm();
})
//新增
$('#repeatedPhone').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
        projectId: {
            validators: {
                notEmpty: {
                    message: '请选择项目！'
                },
            }
        },
        levelId: {
            validators: {
                notEmpty: {
                    message: '请选择项目级别！'
                },
            }
        },
        idCard: {
            validators: {
                notEmpty: {
                    message: '请填写学员身份证号！'
                },
                regexp: {
                    regexp: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    message: '请填确认身份证号格式正确'
                }
            }
        },
        certificateName: {
            validators: {
                notEmpty: {
                    message: '请填写证书名称！'
                },
            }
        },
        certificateNumber: {
            validators: {
                notEmpty: {
                    message: '请填写证书编号！'
                },
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var fullName = $('#repeatedPhone select[name="projectId"] :selected').text();
        var levelName = $('#repeatedPhone select[name="levelId"] :selected').text();
        params += "&fullName=" + fullName;
        params += "&levelName=" + levelName;
        $.ajax({
            type: "POST",
            url: ctx + '/certificate/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.asingleEntry').modal('hide');
                DataTable.init();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
});

//初始化加载数据
$("#certificate tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#certificate tbody>tr>td").mLoading({
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
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    var beganAndEnd = $("#DateCertificate").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" 到 ")[0]);
        var maxDate = trim(beganAndEnd.split(" 到 ")[1]);
        aoData.push({"name": "minDate", "value": minDate});
        aoData.push({"name": "maxDate", "value": maxDate});
    }
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

//编辑取值
function edit(certificateId, projectId, levelId, idCard, name, phone, serialNumber, certificateName, certificateNumber, conversation) {
    certificateEditing
    $.ajax({
        url: ctx + '/bizProject/getAll',
        type: 'POST',
        data: {projectType: 1},
        dataType: 'json',
        success: function (data) {
            var opt = "<option value=''>--请选择--</option>";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            }
            $('#certificateEditing select[name="projectId"]').html(opt);
            $('#certificateEditing select[name="projectId"]').val(projectId);

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $.ajax({
        url: ctx + '/bizProjectLevel/getAllOption',
        type: 'POST',
        data: {"projectId": projectId},
        dataType: 'json',
        async: true,
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].projectLevelId + ">" + data.list[i].levelTitle + "</option>";
            }
            $('#certificateEditing select[name="levelId"]').html(opt);
            $('#certificateEditing select[name="levelId"]').val(levelId);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#certificateEditing input[name="certificateId"]').val(certificateId);
    $('#certificateEditing input[name="idCard"]').val(idCard);
    $('#certificateEditing input[name="name"]').val(name);
    $('#certificateEditing input[name="phone"]').val(phone);
    $('#certificateEditing input[name="serialNumber"]').val(serialNumber);
    $('#certificateEditing input[name="certificateName"]').val(certificateName);
    $('#certificateEditing input[name="certificateNumber"]').val(certificateNumber);
//	    $('#certificateEditing input[name="picture"]').val(picture);
    $('#certificateEditing input[name="conversation"]').val(conversation);
}
//编辑保存
$('#certificateEditing').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var fullName = $('#certificateEditing select[name="projectId"] :selected').text();
        var levelName = $('#certificateEditing select[name="levelId"] :selected').text();
        params += "&fullName=" + fullName;
        params += "&levelName=" + levelName;
        $.ajax({
            url: ctx + '/certificate/updateRecord',
            data: params,
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.certificateEditing').modal('hide');
                    DataTable.init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    }
});

function deleteCertificate(certificateId) {
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
            url: ctx + '/certificate/updateRecord',
            data: {certificateId: certificateId, enable: 0},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    swal("", "删除成功！", "success");
                    DataTable.init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    });
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}
