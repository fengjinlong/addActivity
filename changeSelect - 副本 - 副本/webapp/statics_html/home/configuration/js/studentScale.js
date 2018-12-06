$(function () {
    //日期控件
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
        autoUpdateInput: false,
        showDropdowns: true
    });

    $('.duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });


    //分成学员类型、项目、项目级别、院校名称
    $('.studentType').chosen({no_results_text: "没有匹配项"});
    $('.projectName').chosen({no_results_text: "没有匹配项"});
    $('.projectGrade').chosen({no_results_text: "没有匹配项"});
    $('.collegeName').chosen({no_results_text: "没有匹配项"});
    
    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })
    //启用、禁用切换
    $('table tbody').on('click', '.status-btn', function () {
        if ($(this).hasClass('btn-use')) {
            $(this).removeClass('btn-use').addClass('btn-nouse');
            $(this).html('<i class="fa fa-ban"></i> 禁用');
        } else {
            $(this).removeClass('btn-nouse').addClass('btn-use');
            $(this).html('<i class="fa fa-check-square-o"></i> 启用');
        }
    })

    //学历和职业资格切换
    function projectType(oarentEle) {
        if ($(oarentEle).find('.projectType :selected').val() == 1) {
            $(oarentEle).find('.classType').show();
            $(oarentEle).find('.education,.college,.major').hide();
        }
        if ($(oarentEle).find('.projectType :selected').val() == 2) {
            $(oarentEle).find('.classType').hide();
            $(oarentEle).find('.education,.college,.major').show();
        }
        $(oarentEle).find('.projectType').on('change', function () {
            if ($(this).val() == 1) {
                $(oarentEle).find('.classType').show();
                $(oarentEle).find('.education,.college,.major').hide();
            }
            if ($(this).val() == 2) {
                $(oarentEle).find('.classType').hide();
                $(oarentEle).find('.education,.college,.major').show();
            }
        })
    }

    projectType('.studentScaleView');
    projectType('.studentScaleAdd');
    projectType('.studentScaleEdit');

    //多选
    $('.selectpicker').selectpicker();

    //初始化学员类型
    $.ajax({
        url: ctx + '/financeBusinessStudentType/getAllOption',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].typeId + ">" + data.list[i].typeName + "</option>";
            }
            $('#studentScaleAdd select[name="studentTypeId"]').html('<option value="0">--请选择--</option>' + opt);
            $('#studentScaleAdd select[name="studentTypeId"]').trigger('chosen:updated');
            $('#studentScaleAdd select[name="studentTypeId"]').chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
})
//项目类型查询
function projectTypeValue() {
    var projectTypeValue = $('#studentScaleAdd select[name="projectType"]').val();
    if (projectTypeValue == 1) {
        //初始化项目（职业资格）
        $.ajax({
            url: ctx + '/bizProject/getAllByType',
            type: 'POST',
            data: {projectType: projectTypeValue},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var zxkc = "";
                for (var i = 0; i < data.list.length; i++) {
                    zxkc += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
                }
                $('#studentScaleAdd select[name="projectId"]').html('<option value="0">--请选择--</option>' + zxkc);
                $('#studentScaleAdd select[name="projectId"]').trigger('chosen:updated');
                $('#studentScaleAdd select[name="projectId"]').chosen({
                    no_results_text: "没有匹配项",
                    search_contains: true
                });
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化项目级别
        $('#studentScaleAdd select[name="projectId"]').change(function () {
            var projectId = $('#studentScaleAdd select[name="projectId"] :selected').val();
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
                    $('#studentScaleAdd select[name="levelId"]').html('<option value="0">--请选择--</option>' + level);
                    $('#studentScaleAdd select[name="levelId"]').trigger('chosen:updated');
                    $('#studentScaleAdd select[name="levelId"]').chosen({
                        no_results_text: "没有匹配项",
                        search_contains: true
                    });
                    $('.chosen-container').width('100%');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
        //项目级别联动班型
        $('#studentScaleAdd select[name="levelId"]').change(function () {
            var projectLevelId = $('#studentScaleAdd select[name="levelId"] :selected').val();
            $.ajax({
                url: ctx + '/bizProduct/getAllOption',
                type: 'POST',
                data: {projectLevelId: projectLevelId},
                dataType: 'json',
                success: function (data) {
                    var banxing = "";
                    for (var i = 0; i < data.list.length; i++) {
                        banxing += "<option value=" + data.list[i].productId + ">" + data.list[i].className + "</option>";
                    }
                    $('#studentScaleAdd select[name="classId"]').html('<option value="0">--请选择--</option>' + banxing);
                    $('.selectpicker').selectpicker('refresh');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
    } else if (projectTypeValue == 2) {
        //初始化项目（职业资格）
        $.ajax({
            url: ctx + '/bizProject/getAllByType',
            type: 'POST',
            data: {projectType: projectTypeValue},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var zxkc = "";
                for (var i = 0; i < data.list.length; i++) {
                    zxkc += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
                }
                $('#studentScaleAdd select[name="projectId"]').html('<option value="0">--请选择--</option>' + zxkc);
                $('#studentScaleAdd select[name="projectId"]').trigger('chosen:updated');
                $('#studentScaleAdd select[name="projectId"]').chosen({
                    no_results_text: "没有匹配项",
                    search_contains: true
                });
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化项目级别
        $('#studentScaleAdd select[name="projectId"]').change(function () {
            var projectId = $('#studentScaleAdd select[name="projectId"] :selected').val();
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
                    $('#studentScaleAdd select[name="levelId"]').html('<option value="0">--请选择--</option>' + level);
                    $('#studentScaleAdd select[name="levelId"]').trigger('chosen:updated');
                    $('#studentScaleAdd select[name="levelId"]').chosen({
                        no_results_text: "没有匹配项",
                        search_contains: true
                    });
                    $('.chosen-container').width('100%');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
        //初始化院校
        $.ajax({
            url: ctx + '/bizSchool/getAllOption',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var school = "";
                for (var i = 0; i < data.list.length; i++) {
                    school += "<option value=" + data.list[i].schoolId + ">" + data.list[i].schoolName + "</option>";
                }
                $('#studentScaleAdd select[name="schoolId"]').html('<option value="0">--请选择--</option>' + school);
                $('#studentScaleAdd select[name="schoolId"]').trigger('chosen:updated');
                $('#studentScaleAdd select[name="schoolId"]').chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化专业
        $.ajax({
            url: ctx + '/bizMajor/getAllOption',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var major = "";
                for (var i = 0; i < data.list.length; i++) {
                    major += "<option value=" + data.list[i].majorId + ">" + data.list[i].majorName + "</option>";
                }
                $('#studentScaleAdd select[name="majorId"]').html('<option value="0">--请选择--</option>' + major);
                $('.selectpicker').selectpicker('refresh');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    } else {
        toastr.error("请选择项目类型！");
    }
}
//数据初始化
$("#financeBusinessScale tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#financeBusinessScale tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    var duration = $('#duration').val();
    if (duration && duration.length != 0) {
        var Bdate = trim(duration.split(" 到 ")[0]);
        var Edate = trim(duration.split(" 到 ")[1]);
        aoData.push({"name": "bDate", "value": Bdate});
        aoData.push({"name": "eDate", "value": Edate});
    }
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
};

//新增分成比例量
$('#studentScaleAdd').bootstrapValidator({
    message: 'This value is not valid',
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var duration = $('#studentScaleAdd input.duration').val();//option:selected
        var className = $('#studentScaleAdd select[name="classId"]').siblings('button').children('span.filter-option ').text();
        var majorName = $('#studentScaleAdd select[name="majorId"]').siblings('button').children('span.filter-option ').text();
        var payWayName = $('#studentScaleAdd select[name="payWay"]').siblings('button').children('span.filter-option ').text();
        var Bdate = trim(duration.split(" 到 ")[0]);
        var Edate = trim(duration.split(" 到 ")[1]);
        params += "&bDate=" + Bdate;
        params += "&eDate=" + Edate;
        params += "&className=" + className;
        params += "&majorName=" + majorName;
        params += "&payWayName=" + payWayName;
        $.ajax({
            type: 'POST',
            url: ctx + '/financeBusinessScale/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
            	if(data.status == "success"){
            		toastr.success(data.msg);
            		 $('.studentScaleAdd').modal('hide');
                     DataTable.init();
            	}else{
            		 toastr.error(data.msg);
            	}
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    }
});
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/financeBusinessScale/updateRecord',
        type: 'POST',
        data: {
            scaleId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
//删除
function deleteStudent(scaleId) {
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
            url: ctx + '/financeBusinessScale/updateRecord',
            type: 'POST',
            data: {
                scaleId: scaleId,
                deleteMark: 0
            },
            dataType: 'json',
            success: function (data) {
                swal("", "删除成功！", "success");
                DataTable.init();
            }
        });
    });
}
//查看
function view(scaleId) {
    $.ajax({
        url: ctx + '/financeBusinessScale/selectByWhere',
        type: 'POST',
        data: {scaleId: scaleId},
        dataType: 'json',
        success: function (data) {
            $('#studentScaleView input[name="studentType"]').val(data.list[0].financeBusinessStudentType.typeName);
            if (data.list[0].projectType == 1) {
                $('#studentScaleView input[name="projectType"]').val('职业资格');
                $('.jiaoyuxingshi').hide();
                $('.yuanxiao').hide();
                $('.zhuanye').hide();
                $('.banxing').show();
            }
            if (data.list[0].projectType == 2) {
                $('#studentScaleView input[name="projectType"]').val('学历');
                $('.banxing').hide();
                $('.jiaoyuxingshi').show();
                $('.yuanxiao').show();
                $('.zhuanye').show();
            }
            $('#studentScaleView input[name="projectName"]').val(data.list[0].bizProject.fullName);
            $('#studentScaleView input[name="projectGrade"]').val(data.list[0].bizProjectLevel.levelTitle);
            $('#studentScaleView select[name="educationForm"]').val(data.list[0].eduForm);
            $('#studentScaleView input[name="collegeName"]').val(data.list[0].bizSchool.schoolName);
            $('#studentScaleView input[name="majorName"]').val(data.list[0].majorName);
            $('#studentScaleView input[name="paymentWay"]').val(data.list[0].payWayName);
            $('#studentScaleView input[name="className"]').val(data.list[0].className);
            $('#studentScaleView input[name="divide"]').val(data.list[0].scale);
            var bDate = data.list[0].bDate;
            var eDate = data.list[0].eDate;
            var duration = bDate + " 到 " + eDate;
            $('#studentScaleView input[name="duration"]').val(duration);
            $('#studentScaleView textarea[name="viewRemark"]').val(data.list[0].content);
        }
    });

}
//编辑取值
function update(scaleId) {
    $.ajax({
        url: ctx + '/financeBusinessScale/selectByWhere',
        type: 'POST',
        data: {scaleId: scaleId},
        dataType: 'json',
        success: function (data) {
            //初始化学员类型
            $.ajax({
                url: ctx + '/financeBusinessStudentType/getAllOption',
                type: 'POST',
                dataType: 'json',
                success: function (datas) {
                    var opt = "";
                    for (var i = 0; i < datas.list.length; i++) {
                        opt += "<option value=" + datas.list[i].typeId + ">" + datas.list[i].typeName + "</option>";
                    }
                    $('#studentScaleEdit select[name="studentTypeId"]').html(opt);
                    $('#studentScaleEdit select[name="studentTypeId"]').val(data.list[0].studentTypeId);
                    $('#studentScaleEdit select[name="studentTypeId"]').trigger('chosen:updated');
                    $('#studentScaleEdit select[name="studentTypeId"]').chosen({no_results_text: "没有匹配项"});
                    $('.chosen-container').width('100%');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

            if (data.list[0].projectType == 1) {
                $('.jiaoyuxingshia').hide();
                $('.yuanxiaoa').hide();
                $('.zhuanyea').hide();
                $('.banxinga').show();
                var projectLevelId = data.list[0].levelId;
                $.ajax({
                    url: ctx + '/bizProjectLevel/getAllOption',
                    type: 'POST',
                    data: {projectLevelId: projectLevelId},
                    dataType: 'json',
                    success: function (datab) {
                        var level = "";
                        for (var i = 0; i < datab.list.length; i++) {
                            level += "<option value=" + datab.list[i].projectLevelId + ">" + datab.list[i].levelTitle + "</option>";
                        }
                        $('#studentScaleEdit select[name="levelId"]').html(level);
                        $('#studentScaleEdit select[name="levelId"]').val(data.list[0].levelId);
                        $('#studentScaleEdit select[name="levelId"]').trigger('chosen:updated');
                        $('#studentScaleEdit select[name="levelId"]').chosen({
                            no_results_text: "没有匹配项",
                            search_contains: true
                        });
                        $('.chosen-container').width('100%');
                    },
                    error: function (response) {
                        toastr.error("系统错误");
                    }
                });
                var classId = data.list[0].classId;
                $.ajax({
                    url: ctx + '/bizProduct/getAllOption',
                    data: {projectType: 1},
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        var banxing = "";
                        for (var i = 0; i < data.list.length; i++) {
                            banxing += "<option value=" + data.list[i].productId + ">" + data.list[i].className + "</option>";
                        }
                        $('#studentScaleEdit select[name="classId"]').html(banxing);
                        $('#studentScaleEdit select[name="classId"]').selectpicker('val', classId.indexOf(",") ? classId.split(',') : classId);
                        $('.selectpicker').selectpicker('refresh');
                    },
                    error: function (response) {
                        toastr.error("系统错误");
                    }
                });

                var projectTypeValue = data.list[0].projectType;
                //初始化项目（职业资格）
                $.ajax({
                    url: ctx + '/bizProject/getAllByType',
                    type: 'POST',
                    data: {projectType: projectTypeValue},
                    dataType: 'json',
                    success: function (dataa) {
                        var zxkc = "";
                        for (var i = 0; i < dataa.list.length; i++) {
                            zxkc += "<option value=" + dataa.list[i].projectId + ">" + dataa.list[i].fullName + "</option>";
                        }
                        $('#studentScaleEdit select[name="projectId"]').html(zxkc);
                        $('#studentScaleEdit select[name="projectId"]').val(data.list[0].projectId);
                        $('#studentScaleEdit select[name="projectId"]').trigger('chosen:updated');
                        $('#studentScaleEdit select[name="projectId"]').chosen({
                            no_results_text: "没有匹配项",
                            search_contains: true
                        });
                        $('.chosen-container').width('100%');
                    },
                    error: function (response) {
                        toastr.error("系统错误");
                    }
                });
                //初始化项目级别
                $('#studentScaleEdit select[name="projectId"]').change(function () {

                    var projectId = $('#studentScaleEdit select[name="projectId"] :selected').val();
                    $.ajax({
                        url: ctx + '/bizProjectLevel/getAllOption',
                        type: 'POST',
                        data: {projectId: projectId},
                        dataType: 'json',
                        success: function (datab) {
                            var level = "";
                            for (var i = 0; i < datab.list.length; i++) {
                                level += "<option value=" + datab.list[i].projectLevelId + ">" + datab.list[i].levelTitle + "</option>";
                            }
                            $('#studentScaleEdit select[name="levelId"]').html(level);
//        		        	$('#studentScaleEdit select[name="levelId"]').val(data.list[0].levelId);
                            $('#studentScaleEdit select[name="levelId"]').trigger('chosen:updated');
                            $('#studentScaleEdit select[name="levelId"]').chosen({
                                no_results_text: "没有匹配项",
                                search_contains: true
                            });
                            $('.chosen-container').width('100%');
                        },
                        error: function (response) {
                            toastr.error("系统错误");
                        }
                    });
                });
                //项目级别联动班型
                $('#studentScaleEdit select[name="levelId"]').change(function () {
                    var projectLevelId = $('#studentScaleEdit select[name="levelId"] :selected').val();
                    $.ajax({
                        url: ctx + '/bizProduct/getAllOption',
                        type: 'POST',
                        data: {projectLevelId: projectLevelId},
                        dataType: 'json',
                        success: function (data) {
                            var banxing = "";
                            for (var i = 0; i < data.list.length; i++) {
                                banxing += "<option value=" + data.list[i].productId + ">" + data.list[i].className + "</option>";
                            }
                            $('#studentScaleEdit select[name="classId"]').html(banxing);
                            $('.selectpicker').selectpicker('refresh');
                        },
                        error: function (response) {
                            toastr.error("系统错误");
                        }
                    });
                });
            }
            if (data.list[0].projectType == 2) {
                $('.banxinga').hide();
                $('.jiaoyuxingshia').show();
                $('.yuanxiaoa').show();
                $('.zhuanyea').show();
                var projectLevelId = data.list[0].levelId;
                $.ajax({
                    url: ctx + '/bizProjectLevel/getAllOption',
                    type: 'POST',
                    data: {projectLevelId: projectLevelId},
                    dataType: 'json',
                    success: function (datab) {
                        var level = "";
                        for (var i = 0; i < datab.list.length; i++) {
                            level += "<option value=" + datab.list[i].projectLevelId + ">" + datab.list[i].levelTitle + "</option>";
                        }
                        $('#studentScaleEdit select[name="levelId"]').html(level);
                        $('#studentScaleEdit select[name="levelId"]').val(data.list[0].levelId);
                        $('#studentScaleEdit select[name="levelId"]').trigger('chosen:updated');
                        $('#studentScaleEdit select[name="levelId"]').chosen({
                            no_results_text: "没有匹配项",
                            search_contains: true
                        });
                        $('.chosen-container').width('100%');
                    },
                    error: function (response) {
                        toastr.error("系统错误");
                    }
                });
                var projectTypeValue = data.list[0].projectType;
                //初始化项目（职业资格）
                $.ajax({
                    url: ctx + '/bizProject/getAllByType',
                    type: 'POST',
                    data: {projectType: projectTypeValue},
                    dataType: 'json',
                    success: function (dataa) {
                        var zxkc = "";
                        for (var i = 0; i < dataa.list.length; i++) {
                            zxkc += "<option value=" + dataa.list[i].projectId + ">" + dataa.list[i].fullName + "</option>";
                        }
                        $('#studentScaleEdit select[name="projectId"]').html(zxkc);
                        $('#studentScaleEdit select[name="projectId"]').val(data.list[0].projectId);
                        $('#studentScaleEdit select[name="projectId"]').trigger('chosen:updated');
                        $('#studentScaleEdit select[name="projectId"]').chosen({
                            no_results_text: "没有匹配项",
                            search_contains: true
                        });
                        $('.chosen-container').width('100%');
                    },
                    error: function (response) {
                        toastr.error("系统错误");
                    }
                });
                //初始化项目级别
                $('#studentScaleEdit select[name="projectId"]').change(function () {

                    var projectId = $('#studentScaleEdit select[name="projectId"] :selected').val();
                    $.ajax({
                        url: ctx + '/bizProjectLevel/getAllOption',
                        type: 'POST',
                        data: {projectId: projectId},
                        dataType: 'json',
                        success: function (datab) {
                            var level = "";
                            for (var i = 0; i < datab.list.length; i++) {
                                level += "<option value=" + datab.list[i].projectLevelId + ">" + datab.list[i].levelTitle + "</option>";
                            }
                            $('#studentScaleEdit select[name="levelId"]').html(level);
//        		        	$('#studentScaleEdit select[name="levelId"]').val(data.list[0].levelId);
                            $('#studentScaleEdit select[name="levelId"]').trigger('chosen:updated');
                            $('#studentScaleEdit select[name="levelId"]').chosen({
                                no_results_text: "没有匹配项",
                                search_contains: true
                            });
                            $('.chosen-container').width('100%');
                        },
                        error: function (response) {
                            toastr.error("系统错误");
                        }
                    });
                });
            }
            $('#studentScaleEdit select[name="projectType"]').val(data.list[0].projectType);
            $('#studentScaleEdit select[name="eduForm"]').val(data.list[0].eduForm);
            //初始化院校
            $.ajax({
                url: ctx + '/bizSchool/getAllOption',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    var school = "";
                    for (var i = 0; i < data.list.length; i++) {
                        school += "<option value=" + data.list[i].schoolId + ">" + data.list[i].schoolName + "</option>";
                    }
                    $('#studentScaleEdit select[name="schoolId"]').html(school);
                    $('#studentScaleEdit select[name="schoolId"]').val(data.list[0].schoolId);
                    $('#studentScaleEdit select[name="schoolId"]').trigger('chosen:updated');
                    $('#studentScaleEdit select[name="schoolId"]').chosen({
                        no_results_text: "没有匹配项",
                        search_contains: true
                    });
                    $('.chosen-container').width('100%');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
            var majorId = data.list[0].majorId;
            //初始化专业
            $.ajax({
                url: ctx + '/bizMajor/getAllOption',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    var major = "";
                    for (var i = 0; i < data.list.length; i++) {
                        major += "<option value=" + data.list[i].majorId + ">" + data.list[i].majorName + "</option>";
                    }
                    $('#studentScaleEdit select[name="majorId"]').html(major);
                    $('#studentScaleEdit select[name="majorId"]').selectpicker('val', majorId.indexOf(",") ? majorId.split(',') : majorId);
                    $('.selectpicker').selectpicker('refresh');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
            var payWay = data.list[0].payWay;
            $('#studentScaleEdit select[name="payWay"]').selectpicker('val', payWay.indexOf(",") ? payWay.split(',') : payWay);
            $('#studentScaleEdit input[name="scale"]').val(data.list[0].scale);
            var bDate = data.list[0].bDate;
            var eDate = data.list[0].eDate;
            var duration = bDate + " 到 " + eDate;
            $('#studentScaleEdit input[name="duration"]').val(duration);
            $('#studentScaleEdit textarea[name="contenta"]').val(data.list[0].content);
        }
    });
}
//修改分成比例量
$('#studentScaleEdit').bootstrapValidator({
    message: 'This value is not valid',
    submitHandler: function (validator, form, submitButton) {
        var params = '';
        var studentTypeId = $('#studentScaleEdit select[name="studentTypeId"]').val();
        var projectType = $('#studentScaleEdit select[name="projectType"]').val();
        var projectId = $('#studentScaleEdit select[name="projectId"]').val();
        var levelId = $('#studentScaleEdit select[name="levelId"]').val();
        var eduForm = $('#studentScaleEdit select[name="levelId"]').val();
        var schoolId = $('#studentScaleEdit select[name="schoolId"]').val();
        var majorId = $('#studentScaleEdit select[name="majorId"]').val();
        var majorName = $('#studentScaleEdit select[name="majorId"]').siblings('button').children('span.filter-option ').text();
        var classId = $('#studentScaleEdit select[name="classId"]').val();
        var className = $('#studentScaleEdit select[name="classId"]').siblings('button').children('span.filter-option ').text();
        var payWay = $('#studentScaleEdit select[name="payWay"]').val();
        var payWayName = $('#studentScaleEdit select[name="payWay"]').siblings('button').children('span.filter-option ').text();
        var duration = $('#studentScaleEdit input[name="duration"]').val();
        var Bdate = trim(duration.split(" 到 ")[0]);
        var Edate = trim(duration.split(" 到 ")[1]);
        var content = $('#studentScaleEdit textarea[name="contenta"]').val();
        params += "&studentTypeId=" + studentTypeId;
        params += "&projectType=" + projectType;
        params += "&projectId=" + projectId;
        params += "&levelId=" + levelId;
        params += "&eduForm=" + eduForm;
        params += "&schoolId=" + schoolId;
        params += "&majorId=" + majorId;
        params += "&majorName=" + majorName;
        params += "&classId=" + classId;
        params += "&className=" + className;
        params += "&payWay=" + payWay;
        params += "&payWayName=" + payWayName;
        params += "&bDate=" + Bdate;
        params += "&eDate=" + Edate;
        params += "&content=" + content;
        $.ajax({
            type: 'POST',
            url: ctx + '/financeBusinessScale/updateRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.studentScaleEdit').hide();
                DataTable.init();
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    }
});
