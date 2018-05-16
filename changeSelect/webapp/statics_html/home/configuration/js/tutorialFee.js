$(function () {
    bizTutorialFee();
    $('#bizTutorialFeeSetAdd').on('hidden.bs.modal', function () {
        $('#addBizTutorialFeeSet')[0].reset();
        $('#addBizTutorialFeeSet input:hidden,#addBizTutorialFeeSet select:hidden,#projectId,#schoolId').val('');
        $('#projectId,#schoolId').trigger('chosen:updated');
        $('#addBizTutorialFeeSet .selectpicker').selectpicker('refresh');
        $('#addBizTutorialFeeSet').data('bootstrapValidator').resetForm();
    })
    
    //辅导费设置和种类切换
	$('#myTab11 li').on('click',function(){
		if($.trim($(this).text()) == '辅导费种类'){
			if(!$("#tutorialFee tbody").hasClass('loadOver')){
				  $("#tutorialFee tbody").html("<tr><td height='300' colspan='4' class='text-center'></td></tr>");
				  $("#tutorialFee tbody>tr>td").mLoading({
				       text: '正在加载中，请稍后......',
				       icon: "../statics_html/common/image/loading5.gif"
				 });
				 DataTable.init();
				 $("#tutorialFee tbody").addClass('loadOver');
			}else{
				$("#tutorialFee").mLoading({
				    text: '正在加载中，请稍后......',
				    icon: "../statics_html/common/image/loading5.gif"
				});
				$('#tutorialFee .mloading-mask').css({
			        'top':'35px',
			        'background-color':'rgba(233, 233, 232, 0.5)'
			    });
				DataTable.init();
				$("#tutorialFee").mLoading('hide');
			}
			
		}else{
			$("#moneyKind").mLoading({
			    text: '正在加载中，请稍后......',
			    icon: "../statics_html/common/image/loading5.gif"
			});
			$('#moneyKind .mloading-mask').css({
		            'top':'35px',
		            'background-color':'rgba(233, 233, 232, 0.5)'
		     });
			feeDataTable.init();
			$("#moneyKind").mLoading('hide');
		}
	})

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    });
    $('.selectpicker').selectpicker('refresh');
    aa();
    //初始化项目（学历）
    $.ajax({
        url: ctx + '/bizProject/getAll',
        type: 'POST',
        data: {projectType: 2},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            }
            $('#projectId').html('<option value="">--请选择--</option>' + opt);
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
                $('#addBizTutorialFeeSet select[name="projectLevelId"]').html('<option value="">--请选择--</option>' + level);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //初始化院校
    $.ajax({
        url: ctx + '/bizSchool/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].schoolId + ">" + data.list[i].schoolName + "</option>";
            }
            $('#schoolId').html('<option value="">--请选择--</option>' + opt);
            $('#schoolId').trigger('chosen:updated');
            $("#schoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化专业
    $.ajax({
        url: ctx + '/bizMajor/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].majorId + ">" + data.list[i].majorName + "</option>";
            }
            $('#addBizTutorialFeeSet select[name="majorId"]').html(opt);
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

    //辅导费种类编辑
    $('.add-table').on('click', ".operate-btn", function () {
        var tds = $(this).parent().prev().prevAll();
        if ($(this).hasClass('edit')) {
            tds.eq(1).html('<input name="tutorialFeeName" class="form-control tutorialFeeName" type="text" value="' + tds.eq(1).html() + '">');
            tds.eq(0).html('<input name="tutorialFeeDesc" class="form-control tutorialFeeDesc" type="text" value="' + tds.eq(0).html() + '">');
            $(this).removeClass('btn-info edit').addClass('save-edit').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
            $(this).next().removeClass('btn-danger delete').addClass('cancel').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        } else if ($(this).hasClass('save-edit')) {

            var tutorialFeeId = tds.eq(2).text();
            var tutorialFeeName = tds.eq(1).find('input').val();
            var tutorialFeeDesc = tds.eq(0).find('input').val();
            $.ajax({
                url: ctx + '/bizTutorialFee/updateRecord',
                type: 'POST',
                data: {
                    tutorialFeeId: tutorialFeeId,
                    tutorialFeeName: tutorialFeeName,
                    tutorialFeeDesc: tutorialFeeDesc
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 'success') {
                        DataTable.init();
                    } else {
                        toastr.error(data.msg);
                    }
                }
            });

            $(this).html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $(this).removeClass('save-edit').addClass('edit');
            $(this).next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        } else if ($(this).hasClass('cancel')) {
            tds.each(function (index, element) {
                $(element).html($(element).find('input').val());
            });
            $(this).html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).removeClass('cancel').addClass('delete');
            $(this).prev().html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        }
        return false;
    });

    //辅导费种类删除
    $('.add-table').on('click', '.delete', function () {
        var tutorialFeeId = $(this).parent().parent().find('.tutorialFeeId').text();
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
                url: ctx + '/bizTutorialFee/updateRecord',
                type: 'POST',
                data: {
                    tutorialFeeId: tutorialFeeId,
                    deleteMark: 0
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 'success') {
                        swal("", "删除成功！", "success");
                        DataTable.init();
                    } else {
                        toastr.error(data.msg);
                    }
                }
            });
        });
    });

    //辅导费种类添加
    $('.add-line').on('click', function () {
        var tds = $(this).parent().prev().prevAll();
        var td = $(this).parents("#profile11").find("tbody").find("tr td:last-child");
        var addtr = '<tr>'
            + '<td class="text-center"><input name="tutorialFeeName" class="form-control tutorialFeeName" type="text" value=""></td>'
            + '<td class="text-center"><input name="tutorialFeeDesc" class="form-control tutorialFeeDesc" type="text" value=""></td>'
            + '<td class="text-center">'
            + '<select name="enable" class="input-sm form-control enable">'
            + '<option value="1">启用</option>'
            + '<option value="0">禁用</option>'
            + '</select>'
            + '</td>'
            + '<td class="text-center">'
            + '<a href="#" class="save-add"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '<a href="#" class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('.add-table tbody tr .form-control').length == 0) {
            $('.add-table').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        //取消
        $('.add-table').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    })
    //保存
    $('.add-table').on('click', '.save-add', function () {
        var tutorialFeeName = $(this).parent().parent().find('.tutorialFeeName').val();
        var tutorialFeeDesc = $(this).parent().parent().find('.tutorialFeeDesc').val();
        var enable = $(this).parent().parent().find('.enable').val();
        $.ajax({
            url: ctx + '/bizTutorialFee/addNewRecord',
            type: 'POST',
            data: {
                tutorialFeeName: tutorialFeeName,
                tutorialFeeDesc: tutorialFeeDesc,
                enable: enable
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    DataTable.init();
                    bizTutorialFee();
                } else
                    toastr.error(data.msg);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        $(this).html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
        $(this).removeClass('save-add').addClass('edit');
        $(this).next().removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
        $('[data-toggle="tooltip"]').tooltip();
    });

    //编辑
    $('#scoachingType').on('click', '.edit', function () {
        var tds = $(this).parent().siblings();
        var scoaching = tds.eq(0).text();
        var standard = tds.eq(1).text();
        var explain = tds.eq(2).text();
        var three = tds.eq(3).text();
        var four = tds.eq(4).text();

        tds.eq(0).html(tds.eq(0).text());
        //初始化辅导费种类
        $.ajax({
            url: ctx + '/bizTutorialFee/getAll',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.list.length; i++) {
                    opt += "<option value=" + data.list[i].tutorialFeeId + ">" + data.list[i].tutorialFeeName + "</option>";
                }
                tds.eq(1).html('<select class="form-control aa">' + opt + '</select>');
                $(".aa").val(four);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        tds.eq(2).html('<input type="text" class="form-control" value="' + tds.eq(2).text() + '">');
        tds.eq(3).html('<input type="text" class="form-control"  value="' + tds.eq(3).text() + '">');
        $(this).addClass('save').removeClass('edit').html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>');
        $(this).next().addClass('cancel').removeClass('delete').html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>');
        $('[data-toggle="tooltip"]').tooltip();
        //保存
        $('#scoachingType').on('click', '.save', function () {
            var tds = $(this).parent().siblings();
            var tutorialFeeSetId = tds.eq(0).text();
            var tutorialFeeId = tds.eq(1).find(':selected').val();
            var fee = tds.eq(2).find('input').val();
            var tutorialFeeSetDesc = tds.eq(3).find('input').val();
            $.ajax({
                url: ctx + '/bizTutorialFeeSet/updateRecord',
                type: 'POST',
                data: {
                    tutorialFeeSetId: tutorialFeeSetId,
                    tutorialFeeId: tutorialFeeId, fee: fee,
                    tutorialFeeSetDesc: tutorialFeeSetDesc
                },
                dataType: 'json',
                success: function (data) {
                    $('.divideView2').modal('hide');
                    feeDataTable.init();
                }
            });

            $(this).addClass('edit').removeClass('save').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>');
            $(this).next().addClass('delete').removeClass('cancel').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>');
            $('[data-toggle="tooltip"]').tooltip();
        })

        //取消
        $('#scoachingType').on('click', '.cancel', function () {
            tds.eq(0).html(scoaching);
            tds.eq(1).html(standard);
            tds.eq(2).html(explain);
            tds.eq(3).html(three);
            $(this).addClass('delete').removeClass('cancel').html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>');
            $(this).prev().addClass('edit').removeClass('save ').html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>');
            $('[data-toggle="tooltip"]').tooltip();
        })
    })


    //辅导费种类删除
    $('#scoachingType').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var tutorialFeeSetId = tds.eq(0).text();
        $('.divideView2').css('z-index',1039);
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
        }, function (isConfirm) {
	        $.ajax({
	            url: ctx + '/bizTutorialFeeSet/updateRecord',
	            type: 'POST',
	            data: {
	                tutorialFeeSetId: tutorialFeeSetId,
	                deleteMark: 0
	            },
	            dataType: 'json',
	            success: function (data) {
	                if (data.status == 'success') {
	                	if(isConfirm){
	                		swal("", "删除成功！", "success");
	                	    $('.divideView2').modal('hide');
	 	                    $('.divideView2').css('z-index',1050);
	 	                    feeDataTable.init();
	                    }else{
		                    $('.divideView2').css('z-index',1050);
	                    }
	                } else {
	                    toastr.error(data.msg);
	                }
	            }
	        });
        });
    })

});
function aa() {
    //初始化辅导费种类
    $.ajax({
        url: ctx + '/bizTutorialFee/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].tutorialFeeId + ">" + data.list[i].tutorialFeeName + "</option>";
            }
            $('#divideView select[name="tutorialFeeId"]').html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}
function bizTutorialFee() {
    //初始化辅导费种类
    $.ajax({
        url: ctx + '/bizTutorialFee/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].tutorialFeeId + ">" + data.list[i].tutorialFeeName + "</option>";
            }
            $('#addBizTutorialFeeSet select[name="tutorialFeeId"]').html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

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
    aoData.push({"name": "attrType", "value": "1"});

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
}
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizTutorialFee/updateRecord',
        type: 'POST',
        data: {
            tutorialFeeId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
//修改辅导费状态
function chooseTutorialFeeSet(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizTutorialFeeSet/updateRecord',
        type: 'POST',
        data: {
            tutorialFeeSetId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            feeDataTable.init();
        }
    });
}


//新增辅导费设置
$('#addBizTutorialFeeSet').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
        projectId: {
            validators: {
                notEmpty: {
                    message: '请选择项目'
                }
            }
        },
        projectLevelId: {
            validators: {
                notEmpty: {
                    message: '请选择项目级别'
                }
            }
        },
        schoolId: {
            validators: {
                notEmpty: {
                    message: '请选择院校'
                }
            }
        },
        majorId: {
            validators: {
                notEmpty: {
                    message: '请选择专业'
                }
            }
        },
        tutorialFeeId: {
            validators: {
                notEmpty: {
                    message: '请选择辅导费种类名称'
                }
            }
        },
        fee: {
            validators: {
                notEmpty: {
                    message: '请填写收费标准'
                }
            }
        },
        tutorialFeeSetDesc: {
            validators: {
                notEmpty: {
                    message: '请填写费用说明'
                }
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var majorName = $('#addBizTutorialFeeSet select[name="majorId"]').siblings('button').attr('title');
        params += "&majorName=" + majorName;
        $.ajax({
            type: "POST",
            url: ctx + '/bizTutorialFeeSet/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('#bizTutorialFeeSetAdd').modal('hide');
                feeDataTable.init();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
});
$("#moneyKind tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#moneyKind tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
feeDataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function feeFetrieveData(sSource, aoData, fnCallback, oSettings) {
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
}
//查看辅导费
function edit(tutorialFeeSetId, educationForm, projectLevelId, schoolId, majorId, majorName) {
    var educationForm = educationForm;
    var projectLevelId = projectLevelId;
    var schoolId = schoolId;
    var majorId = majorId;
    $('#viewBizTutorialFeeSet select[name="educationForm"]').val(educationForm);
    $('#viewBizTutorialFeeSet input[name="projectLevelId"]').val(projectLevelId);
    $.ajax({
        url: ctx + '/bizProjectLevel/getAllOption',
        type: 'POST',
        data: {projectLevelId: projectLevelId},
        dataType: 'json',
        success: function (data) {
            var levelTitle = data.list[0].levelTitle;
            $('#viewBizTutorialFeeSet input[name="levelTitle"]').val(levelTitle);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#viewBizTutorialFeeSet input[name="schoolId"]').val(schoolId);
    $.ajax({
        url: ctx + '/bizSchool/getAll',
        type: 'POST',
        data: {schoolId: schoolId},
        dataType: 'json',
        success: function (data) {
            var schoolName = data.list[0].schoolName;
            $('#viewBizTutorialFeeSet input[name="schoolName"]').val(schoolName);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#viewBizTutorialFeeSet input[name="majorId"]').val(majorId);
    $('#viewBizTutorialFeeSet input[name="majorName"]').val(majorName);
    function fudaoFetrieveData(sSource, aoData, fnCallback, oSettings) {
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

        var educationForm = $('#viewBizTutorialFeeSet input[name="educationForm"]').val();
        var projectLevelId = $('#viewBizTutorialFeeSet input[name="projectLevelId"]').val();
        var schoolId = $('#viewBizTutorialFeeSet input[name="schoolId"]').val();
        var majorId = $('#viewBizTutorialFeeSet input[name="majorId"]').val();

        aoData.push({"name": "educationForm", "value": educationForm});
        aoData.push({"name": "projectLevelId", "value": projectLevelId});
        aoData.push({"name": "schoolId", "value": schoolId});
        aoData.push({"name": "majorId", "value": majorId});
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

    var fudaoDataTable = function () {
        return {
            init: function () {
                var Table = $('#tutorialFeeSet').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 10,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/bizTutorialFeeSet/load',
                    "fnServerData": fudaoFetrieveData,//用于替换默认发到服务端的请求操作
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
                        {"mData": "bizTutorialFee.tutorialFeeName", 'sClass': "text-center"},
                        {"mData": "fee", 'sClass': "text-center"},
                        {"mData": "tutorialFeeSetDesc", 'sClass': "text-center"},
                        {"mData": "enable", 'sClass': "text-center "}
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        if (aData.enable == '1') {
                            $('td:eq(3)', nRow).html('有效');
                        } else if (aData.enable == '0') {
                            $('td:eq(3)', nRow).html('无效');
                        }
                        return nRow;
                    }
                });
            }
        }
    }();
    fudaoDataTable.init();

}
//辅导费编辑
function editView(tutorialFeeSetId, educationForm, projectId, projectLevelId, schoolId, majorId, majorName) {
    var educationForm = educationForm;
    var projectLevelId = projectLevelId;
    var projectId = projectId;
    var schoolId = schoolId;
    var majorId = majorId;
    $('#divideView select[name="educationForm"]').val(educationForm);
    $('#divideView input[name="projectId"]').val(projectId);
    $('#divideView input[name="projectLevelId"]').val(projectLevelId);
    $.ajax({
        url: ctx + '/bizProjectLevel/getAllOption',
        type: 'POST',
        data: {projectLevelId: projectLevelId},
        dataType: 'json',
        success: function (data) {
            var levelTitle = data.list[0].levelTitle;
            $('#divideView input[name="levelTitle"]').val(levelTitle);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#divideView input[name="schoolId"]').val(schoolId);
    $.ajax({
        url: ctx + '/bizSchool/getAll',
        type: 'POST',
        data: {schoolId: schoolId},
        dataType: 'json',
        success: function (data) {
            var schoolName = data.list[0].schoolName;
            $('#divideView input[name="schoolName"]').val(schoolName);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#divideView input[name="majorId"]').val(majorId);
    $('#divideView input[name="majorName"]').val(majorName);
    var fudaoEditDataTable = function () {
        return {
            init: function () {
                var Table = $('#scoachingType').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 10,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/bizTutorialFeeSet/load',
                    "fnServerData": fudaoEditFetrieveData,//用于替换默认发到服务端的请求操作
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
                        {"mData": "tutorialFeeSetId", 'sClass': "hiddenCol"},
                        {"mData": "bizTutorialFee.tutorialFeeName", 'sClass': "text-center"},
                        {"mData": "fee", 'sClass': "text-center"},
                        {"mData": "tutorialFeeSetDesc", 'sClass': "text-center"},
                        {"mData": "tutorialFeeId", 'sClass': "hiddenCol"},
                        {
                            "mData": "tutorialFeeSetId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                var u = '<a href="javascript:;" class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                                var d = '<a href="javascript:;" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                                return u + d;
                            }
                        }
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                });
            }
        }
    }();
    fudaoEditDataTable.init();
    $('#scoachingType').parent().removeAttr('class');
    function fudaoEditFetrieveData(sSource, aoData, fnCallback, oSettings) {
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

        var educationForm = $('#divideView select[name="educationForm"]').val();
        var projectLevelId = $('#divideView input[name="projectLevelId"]').val();
        var schoolId = $('#divideView input[name="schoolId"]').val();
        var majorId = $('#divideView input[name="majorId"]').val();

        aoData.push({"name": "educationForm", "value": educationForm});
        aoData.push({"name": "projectLevelId", "value": projectLevelId});
        aoData.push({"name": "schoolId", "value": schoolId});
        aoData.push({"name": "majorId", "value": majorId});
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

    $('#divideView').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var params = '';
            var educationForm = $('#divideView select[name="educationForm"]').val();
            var projectId = $('#divideView input[name="projectId"]').val();
            var projectLevelId = $('#divideView input[name="projectLevelId"]').val();
            var schoolId = $('#divideView input[name="schoolId"]').val();
            var schoolName = $('#divideView input[name="schoolName"]').val();
            var majorId = $('#divideView input[name="majorId"]').val();
            var majorName = $('#divideView input[name="majorName"]').val();
            var tutorialFeeId = $('#divideView select[name="tutorialFeeId"]').val();
            var fee = $('#divideView input[name="fee"]').val();
            var tutorialFeeSetDesc = $('#divideView input[name="tutorialFeeSetDesc"]').val();

            params += "educationForm=" + educationForm;
            params += "&projectId=" + projectId;
            params += "&projectLevelId=" + projectLevelId;
            params += "&schoolId=" + schoolId;
            params += "&schoolName=" + schoolName;
            params += "&majorId=" + majorId;
            params += "&majorName=" + majorName;
            params += "&tutorialFeeId=" + tutorialFeeId;
            params += "&fee=" + fee;
            params += "&tutorialFeeSetDesc=" + tutorialFeeSetDesc;
            $.ajax({
                type: "POST",
                url: ctx + '/bizTutorialFeeSet/addNewRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
                    aa();
                    $('#divideView input[name="fee"]').val('');
                    $('#divideView input[name="tutorialFeeSetDesc"]').val('');
                    fudaoEditDataTable.init();
                    feeDataTable.init();
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
    });
};
//回车搜索
function search() {
    if (event.keyCode == 13) {
        feeDataTable.init();
    }
}


