$(function () {
    $('.examinationAdd').on('hidden.bs.modal', function () {
        $('#examinationAdd')[0].reset();
        $('#examinationAdd input:hidden').val('');
        $('#examinationAdd .selectpicker').selectpicker('refresh');
        $("#projectId").val('');
        $('#projectId').trigger('chosen:updated');
        $('#examinationAdd').data('bootstrapValidator').resetForm();
    });
    $('.cancel-btn').click(function () {
        $('.attribution').fadeOut();
    });

    //日期控件
    $('.beginAndEnd').daterangepicker({
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

    $('.beginAndEnd').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

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

    //考试地区获取值
    function chose_get_value(select) {
        return $(select).val();
    }

    //考试地区获取选中的文本
    function chose_get_text(select) {
        return $(select + " option:selected").text();
    }

    //考试地区点击显示下拉框
    $("#cityName").on({
        focus: function () {
            $('.examinationAdd .attribution').fadeIn();
        },
        click: function () {
            $('.examinationAdd .attribution').fadeIn();
        },
    });

    $("#updtcityName").on({
        focus: function () {
            $('.examinationEdit .attribution').fadeIn();
        },
        click: function () {
            $('.examinationEdit .attribution').fadeIn();
        },
    });
    updtcityName
    function cityName(parentEle) {
        $(parentEle).find('.attribution .confirm-btn').click(function () {
            if (chose_get_value(parentEle + ' .province') != 0 && chose_get_value(parentEle + ' .city') != 0) {
                $(parentEle).find('.cityName').val(chose_get_text(parentEle + ' .province') + chose_get_text(parentEle + ' .city'));
                $(parentEle).find('.addressId').val(chose_get_value(parentEle + ' .city'));
                $(parentEle).find('.attribution').fadeOut();
            }
        });
        $(parentEle).find('.attribution .cancle-btn').click(function () {
            $(parentEle).find('.attribution').fadeOut();
        });
    }

    //考务费设置新增
    cityName('.examinationAdd');
    //addressId('.examinationAdd');

    //考务费设置编辑
    cityName('.examinationEdit');
    //addressId('.examinationAdd');

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
            $("#departmentId").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始项目
    $.ajax({
        url: ctx + '/bizProject/getAll',
        type: 'POST',
        data: {projectType: 1},
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.list.length; i++) {
                zxkc += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            }
            $("#projectId").html('<option value="">--请选择--</option>' + zxkc);
            $('#projectId').trigger('chosen:updated');
            $("#projectId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始项目级别
    $('#projectId').change(function () {
        var projectId = $('#projectId :selected').val();
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
                $("#projectLevelId").html('<option value="">--请选择--</option>' + level);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //初始化考试地区（省）
    $.ajax({
        url: ctx + '/address/getAllOption',
        type: 'POST',
        data: {level: 1},
        dataType: 'json',
        success: function (data) {
            var sheng = "";
            for (var i = 0; i < data.list.length; i++) {
                sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
            }
            $("#province").html('<option value="0">--请选择--</option>' + sheng);
            $('#province').trigger('chosen:updated');
            $("#province").chosen();
            $('.chosen-container').width('100%');

            $("#updtprovince").html('<option value="0">--请选择--</option>' + sheng);
            $('#updtprovince').trigger('chosen:updated');
            $("#updtprovince").chosen();
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化考试地区（市）
    $('#province').change(function () {
        var addressId = $('#province :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#city").html('<option value="0">--请选择--</option>' + shi);
                $('#city').trigger('chosen:updated');
                $("#city").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    $('#updtprovince').change(function () {
        var addressId = $('#updtprovince :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#updtcity").html('<option value="">--请选择--</option>' + shi);
                $('#updtcity').trigger('chosen:updated');
                $("#updtcity").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });


    $('#updtprojectId').change(function () {
        var projectId = $(this).val();
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
                $("#updtprojectLevelId").html(opt);
//	        	$("#updtprojectLevelId").val(projectLevelId);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    })


});
//考务费总计
function sum() {
    var serviceFee = $("#serviceFee").val();
    var partnerFee = $("#partnerFee").val();
    var officialFee = $("#officialFee").val();
    var s = /^[0-9]*$/;
    if (isNaN(serviceFee)) {
        toastr.error("分校服务费只能是数字！请重新填写");
    }
    if (isNaN(partnerFee)) {
        toastr.error("合作方服务费只能是数字！请重新填写");
    }
    if (isNaN(officialFee)) {
        toastr.error("官方考试费只能是数字！请重新填写");
    }
    var sum = Number($("#serviceFee").val()) + Number($("#partnerFee").val()) + Number($("#officialFee").val());
    $("#totalFee").val(sum);
}
//考务费总计修改
function updtsum() {
    var serviceFee = $("#updtserviceFee").val();
    var partnerFee = $("#updtpartnerFee").val();
    var officialFee = $("#updtofficialFee").val();
    var s = /^[0-9]*$/;
    if (isNaN(serviceFee)) {
        toastr.error("分校服务费只能是数字！请重新填写");
    }
    if (isNaN(partnerFee)) {
        toastr.error("合作方服务费只能是数字！请重新填写");
    }
    if (isNaN(officialFee)) {
        toastr.error("官方考试费只能是数字！请重新填写");
    }
    var sum = Number($("#updtserviceFee").val()) + Number($("#updtpartnerFee").val()) + Number($("#updtofficialFee").val());
    $("#updttotalFee").val(sum);//填充内容
}
//新增考费
$('#examinationAdd').bootstrapValidator({
    message: 'This value is not valid',
	fields: {
		departmentId: {
            validators: {
                notEmpty: {
                    message: '所属分校不能为空'
                },
            }
        },
        projectId: {
	        validators: {
	            notEmpty: {
	                message: '所属项目不能为空'
	            },
	        }
	    },
	    projectLevelId: {
	        validators: {
	            notEmpty: {
	                message: '项目级别不能为空'
	            },
	        }
	    },
	    addressId: {
	        validators: {
	            notEmpty: {
	                message: '考试地区不能为空'
	            },
	        }
	    },
	    channel: {
	        validators: {
	            notEmpty: {
	                message: '渠道名称不能为空'
	            },
	        }
	    },
	    beginAndEnd: {
	        validators: {
	            notEmpty: {
	                message: '有效时间不能为空'
	            },
	        }
	    },
	},
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var beginAndEnd = $('#examinationAdd').find('#beginAndEnd').val();
        var minDate = beginAndEnd.split(" 到 ")[0];
        var maxDate = beginAndEnd.split(" 到 ")[1];
        var aa = maxDate +' 23:59:59';
        var bb = minDate +' 00:00:00';
        params += "&minDate=" + bb ;
        params += "&maxDate=" + aa ;
        $.ajax({
            type: "POST",
            url: ctx + '/bizExaminationFee/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.examinationAdd').modal('hide');
                DataTable.init();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
});

//数据初始化
$("#examinationFee tbody").html("<tr><td height='300' colspan='15' class='text-center'></td></tr>");
$("#examinationFee tbody>tr>td").mLoading({
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
    
    var enable = $('#enable').val();
    aoData.push({"name": "enable", "value": enable});
    var reservation = $('#reservation').val();
    if(reservation==""||reservation==null){
    }else{
    	var aa = reservation.split(" 到 ")[0].trim();
    	var minDate = aa+' 00:00:00';
        var bb = reservation.split(" 到 ")[1].trim();
    	var maxDate = bb+' 23:59:59'
        aoData.push({"name": "minDate", "value": minDate});
        aoData.push({"name": "maxDate", "value": maxDate});
    }
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
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizExaminationFee/updateRecord',
        type: 'POST',
        data: {
            examinationFeeId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            /*if(data.status == 'success' && flag == 1){
             $("#span"+val).removeClass("btn-nouse").addClass("btn-use");
             $("#span"+val).html('<i class="fa fa-check-circle-o"></i> 启用');
             }
             if(data.status == 'success' && flag == 0){
             $("#span"+val).removeClass("btn-use").addClass("btn-nouse");
             $("#span"+val).html('<i class="fa fa-ban"></i> 禁用');
             }*/
            DataTable.init();
        }
    });
}
//编辑操作
function edit(examinationFeeId, departmentId, projectId, projectLevelId, cityName, addressId, channel, totalFee, serviceFee, partnerFee, officialFee, theoryFee, operationFee, synthesizeFee, minDate, maxDate) {
    $('#updtexaminationFeeId').val(examinationFeeId);
    $.ajax({
        url: ctx + '/department/getAllOption',
        dataType: "json",
        data: {type: 3},
        async: true,
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("#updtdepartmentId").html(opt);
            $("#updtdepartmentId").val(departmentId);
        }
    })
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
            $("#updtprojectId").html(opt);
            $("#updtprojectId").val(projectId);
            $('#updtprojectId').trigger('chosen:updated');
            $("#updtprojectId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');

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
            $("#updtprojectLevelId").html(opt);
            $("#updtprojectLevelId").val(projectLevelId);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#updtcityName').val(cityName);
    $('#updtaddressId').val(addressId);
    $('#updtchannel').val(channel);
    $('#updttotalFee').val(totalFee);
    $('#updtserviceFee').val(serviceFee);
    $('#updtpartnerFee').val(partnerFee);
    $('#updtofficialFee').val(officialFee);
    $('#updttheoryFee').val(theoryFee);
    $('#updtoperationFee').val(operationFee);
    $('#updtsynthesizeFee').val(synthesizeFee);
    var minDate = minDate;
    var maxDate = maxDate;
    $('#updtbeginAndEnd').val(minDate + ' 到 ' + maxDate);

    $("#examinationEdit .modal-footer").find("[type='submit']").removeAttr("disabled");
}
//编辑保存
$('#examinationEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var examinationFeeId = $('#examinationEdit').find('#updtexaminationFeeId').val();
        var departmentId = $('#examinationEdit').find('#updtdepartmentId').val();
        var projectId = $('#examinationEdit').find('#updtprojectId').val();
        var projectLevelId = $('#examinationEdit').find('#updtprojectLevelId').val();
        var addressId = $('#examinationEdit').find('#updtaddressId').val();
        var cityName = $('#examinationEdit').find('#updtcityName').val();
        var channel = $('#examinationEdit').find('#updtchannel').val();
        var totalFee = $('#examinationEdit').find('#updttotalFee').val();
        var serviceFee = $('#examinationEdit').find('#updtserviceFee').val();
        var partnerFee = $('#examinationEdit').find('#updtpartnerFee').val();
        var officialFee = $('#examinationEdit').find('#updtofficialFee').val();
        var theoryFee = $('#examinationEdit').find('#updttheoryFee').val();
        var operationFee = $('#examinationEdit').find('#updtoperationFee').val();
        var synthesizeFee = $('#examinationEdit').find('#updtsynthesizeFee').val();
        var beginAndEnd = $('#examinationEdit').find('#updtbeginAndEnd').val();
        var minDate;
        var maxDate;

        if (beginAndEnd.indexOf(" 到 ") > -1) {
            var bb = beginAndEnd.split(" 到 ")[0];
            minDate = bb +' 00:00:00';
            var aa = beginAndEnd.split(" 到 ")[1];
            maxDate = aa + " 23:59:59";
        } else {
            var bb = beginAndEnd.split("到")[0];
            minDate = bb+' 00:00:00';
            var aa = beginAndEnd.split("到")[1];
            maxDate = aa + " 23:59:59";
        }
        $.ajax({
            url: ctx + '/bizExaminationFee/updateRecord',
            data: {
                examinationFeeId: examinationFeeId,
                departmentId: departmentId,
                projectId: projectId,
                projectLevelId: projectLevelId,
                cityName: cityName,
                addressId: addressId,
                channel: channel,
                totalFee: totalFee,
                serviceFee: serviceFee,
                partnerFee: partnerFee,
                officialFee: officialFee,
                theoryFee: theoryFee,
                operationFee: operationFee,
                synthesizeFee: synthesizeFee,
                minDate: minDate,
                maxDate: maxDate
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.examinationEdit').modal('hide');
                    DataTable.init();
                }
            },
            error: function () {
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

//全选
$('#examinationFee thead .checkAll').on('click', function(){
    if($(this).prop('checked')){
        $('#examinationFee tbody .checkchild').prop('checked', true);
    }else{
        $('#examinationFee tbody .checkchild').prop('checked', false);
    }
})