$(function () {
    //上传文件
    $('#adjunct-upload1').fileinput({
        language: 'zh',
        uploadUrl: ctx + '/file/uploadFileNew',
        showPreview: false
    }).on("fileuploaded", function (event, data, previewId, index) {
        $('#returnFile').val(data.response.url);
    });
    $('adjunct-upload2').fileinput({
        language: 'zh',
        uploadUrl: ctx + '/file/uploadFileNew',
        showPreview: false
    }).on("fileuploaded", function (event, data, previewId, index) {
        $('#returnFile1').val(data.response.url);
    });
    //日期控件
    $('#registrationTime').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
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
    //上传文件
    $('#adjunct-upload1').fileinput({
        language: 'zh',
        uploadUrl: 'http://www.baidu.com',
        showPreview: false
    })
    $('#adjunct-upload2').fileinput({
        language: 'zh',
        uploadUrl: 'http://www.baidu.com',
        showPreview: false
    })

    //关闭预览效果
    $(document).on('click', '#kvFileinputModal .btn-close', function () {
        $('#kvFileinputModal').modal('hide');
    })


    $(".branch-school").chosen({no_results_text: "没有匹配项"});
    //初始化分校select 
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $('#write select[name="schoolId"]').html('<option value="">--请选择--</option>' + opt);
            $('#write select[name="schoolId"]').trigger('chosen:updated');
            $('#write select[name="schoolId"]').chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
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
            $('#write select[name="projectId"]').html('<option value="">--请选择--</option>' + project);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //项目级别
    $('#write select[name="projectId"]').change(function () {
        var projectId = $('#write select[name="projectId"] :selected').val();
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
                $('#write select[name="levelId"]').html('<option value="">--请选择--</option>' + level);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //查询班型
    $('#write select[name="levelId"]').change(function () {
        var projectId = $('#write select[name="projectId"] :selected').val();
        var levelId = $('#write select[name="levelId"] :selected').val();
        $.ajax({
            url: ctx + '/bizProduct/loadPirce',
            type: 'POST',
            data: {projectId: projectId, projectLevelId: levelId},
            dataType: 'json',
            success: function (data) {
                var level = "";
                for (var i = 0; i < data.list.length; i++) {
                    level += "<option value=" + data.list[i].productId + ">" + data.list[i].className + "</option>";
                }
                $('#write select[name="classId"]').html('<option value="">--请选择--</option>' + level);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
});
$('.write').on('hidden.bs.modal', function () {
    $('#write')[0].reset();
    $('#write input:hidden').val('');
    $('#write .selectpicker').selectpicker('refresh');
    $('#write select[name="schoolId"]').val('').trigger('chosen:updated');
    editor.html("");
    $('#contenta').val();
    $('#write').data('bootstrapValidator').resetForm();
    
})
$('.reply').on('hidden.bs.modal', function () {
    $('#reply')[0].reset();
    editor1.html("");
    $('#reply').data('bootstrapValidator').resetForm();
})

//新增
$('#write').bootstrapValidator({
    message: 'This value is not valid',
    submitHandler: function (validator, form, submitButton) {
        var baoming = $('#write input[name="receiver"]').val();
        var baomings = new Array();
        baomings = baoming.split(",");
        for (var i = 0; i < baomings.length; i++) {
            var params = "";
            var receiver = baomings[i];
            var schoolId = $('#write select[name="schoolId"]').val();
            var applyDate = $('#write input[name="applyDate"]').val();
            var projectId = $('#write select[name="projectId"] :selected').val();
            var levelId = $('#write select[name="levelId"] :selected').val();
            var classId = $('#write select[name="classId"] :selected').val();
            var title = $('#write input[name="title"]').val();
            var content = $('#write textarea[name="contenta"]').val();
            var files = $('#write input[name="files"]').val();
            params += "&receiver=" + receiver;
            params += "&schoolId=" + schoolId;
            params += "&applyDate=" + applyDate;
            params += "&projectId=" + projectId;
            params += "&levelId=" + levelId;
            params += "&classId=" + classId;
            params += "&title=" + title;
            params += "&content=" + content;
            params += "&files=" + files;
            $.ajax({
                type: "POST",
                url: ctx + '/insideLetter/addNewRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
                    $('.write').modal('hide');
                    DataTable.init();
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
    }
});
//查询学员编号
function selectBmnumber() {
    var departmentId3 = $('#write select[name="schoolId"] :selected').val();
    var projectId = $('#write select[name="projectId"] :selected').val();
    var levelId = $('#write select[name="levelId"] :selected').val();
    var classId = $('#write select[name="classId"] :selected').val();
    var applyDate = $('#write input[name="applyDate"]').val();
    var startDate = trim(applyDate.split(" - ")[0]) + " 00:00:00";
    var overDate = trim(applyDate.split(" - ")[1]) + " 23:59:59";
    $.ajax({
        url: ctx + '/consultInfoManage/loadBmnumber',
        type: 'POST',
        data: {
            departmentId3: departmentId3,
            projectId: projectId,
            projectLevelId: levelId,
            classId: classId,
            startDate: startDate,
            overDate: overDate
        },
        dataType: 'json',
        success: function (data) {
            var level = "";
            for (var i = 0; i < data.list.length; i++) {
                var bmCode = data.list[i].bmcode;
                if (i < (data.list.length - 1)) {
                    level += bmCode + ",";
                } else {
                    level += bmCode;
                }
            }
            $('#write input[name="receiver"]').val(level);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
};
//初始化加载数据
$("#insideLetter tbody").html("<tr><td height='300' colspan='11' class='text-center'></td></tr>");
$("#insideLetter tbody>tr>td").mLoading({
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
//删除
function deleteInsideLetter(mailId) {
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
    }, 
    function () {
        $.ajax({
            url: ctx + '/insideLetter/updateRecord',
            data: {mailId: mailId, deleteMark: 0},
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

function selectInsideLetter(content, mailId) {
    $('#reply input[name="mailId"]').val(mailId);
    $('#reply textarea[name="contents"]').val(content);
}

//回复
$('#reply').bootstrapValidator({
    message: 'This value is not valid',
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        params += "&status=" + 1;
        $.ajax({
            url: ctx + '/insideLetter/updateRecord',
            data: params,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $('.reply').modal('hide');
                DataTable.init();
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    }
});

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}