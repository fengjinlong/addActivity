$(function () {
    var from = $('#from').val();
    if (from == 2)
        $('#educationTab').click();

    $('.educationConfigure').on('hidden.bs.modal', function () {
        $('#educationConfigure input[type="checkbox"]').removeAttr('checked');
        $('#educationConfigure').data('bootstrapValidator').resetForm();
    });
    $('.professionalConfigure').on('hidden.bs.modal', function () {
        $('#professionalConfigure input[type="checkbox"]').removeAttr('checked');
        $('#professionalConfigure').data('bootstrapValidator').resetForm();
    })

    //职业资格和学历切换
    $('#myTab li').click(function(){
    	if($.trim($(this).text()) == "学历"){    			
			$("#educationTable").mLoading({
			    text: '正在加载中，请稍后......',
				icon: "../statics_html/common/image/loading5.gif"
			 });
			$('#educationTable .mloading-mask').css({
				'top':'42px',
				'background-color':'rgba(233, 233, 232, 0.5)'
			 });
		    InitiateSimpleDataTable2.init();
			$("#educationTable").mLoading('hide');
    	}else{
    		$("#professionalTable").mLoading({
			    text: '正在加载中，请稍后......',
				icon: "../statics_html/common/image/loading5.gif"
			 });
			$('#professionalTable .mloading-mask').css({
				'top':'42px',
				'background-color':'rgba(233, 233, 232, 0.5)'
			 });
		    InitiateSimpleDataTable2.init();
			$("#professionalTable").mLoading('hide');
    	}
    });
    //多选框
    $(document).on('change', 'input:checkbox.master1', function () {
        if ($(this).prop('checked')) {
            $('input:checkbox.slaver1').prop('checked', 'checked');
        } else {
            $('input:checkbox.slaver1').prop('checked', '');
        }
    });

    $(document).on('change', 'input:checkbox.master2', function () {
        if ($(this).prop('checked')) {
            $('input:checkbox.slaver2').prop('checked', 'checked');
        } else {
            $('input:checkbox.slaver2').prop('checked', '');
        }
    });

    $(document).on('change', 'input:checkbox.master3', function () {
        if ($(this).prop('checked')) {
            $('input:checkbox.slaver3').prop('checked', 'checked');
        } else {
            $('input:checkbox.slaver3').prop('checked', '');
        }
    });
    $(document).on('change', 'input:checkbox.master4', function () {
        if ($(this).prop('checked')) {
            $('input:checkbox.slaver4').prop('checked', 'checked');
        } else {
            $('input:checkbox.slaver4').prop('checked', '');
        }
    });

    //项目，项目级别,授课形式联动
    $.ajax({
        url: ctx + '/bizProject/getAll',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var opt1 = "";
                var opt2 = "";
                for (var i = 0; i < data.list.length; ++i) {
                    if (data.list[i].projectType == 1)
                        opt1 += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
                    else
                        opt2 += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
                }
                $('#projectId1').html('<option value="">--请选择--</option>' + opt1);
                $('#projectId1').trigger('chosen:updated');
                $("#projectId1").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');

                $('#projectId2').html('<option value="">--请选择--</option>' + opt2);
                $('#projectId2').trigger('chosen:updated');
                $("#projectId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');

                $('#projectId1').chosen().change();
                $('#projectId2').chosen().change();

            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });


    $('#projectId1').change(function () {

        var projectId = $(this).val();

        $.ajax({
            url: ctx + '/bizProjectLevel/getAllOption',
            data: {projectId: projectId},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    var opt = "";
                    for (var i = 0; i < data.list.length; ++i) {
                        opt += "<option data-teachtype='" + data.list[i].teachType + "' value='" + data.list[i].projectLevelId + "'>" + data.list[i].levelTitle + "</option>";
                    }
                    $('#professionalAdd select[name="projectLevelId"]').html(opt);

                    $('#professionalAdd select[name="projectLevelId"]').change();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    })

    $('#professionalAdd select[name="projectLevelId"]').change(function () {
        var teachType = $(this).find("option:selected").data("teachtype");
        if (teachType == 1) {
            $('#professionalAdd input[name="teachTypeName"]').val("面授");
        } else if (teachType == 2) {
            $('#professionalAdd input[name="teachTypeName"]').val("直播");
        } else if (teachType == 3) {
            $('#professionalAdd input[name="teachTypeName"]').val("录播");
        } else {
            $('#educationAdd input[name="teachTypeName"]').val("");
        }
        $('#professionalAdd input[name="teachType"]').val(teachType);
    })

    $('#educationAdd select[name="projectLevelId"]').change(function () {
        var teachType = $(this).find("option:selected").data("teachtype");
        if (teachType == 1) {
            $('#educationAdd input[name="teachTypeName"]').val("面授");
        } else if (teachType == 2) {
            $('#educationAdd input[name="teachTypeName"]').val("直播");
        } else if (teachType == 3) {
            $('#educationAdd input[name="teachTypeName"]').val("录播");
        } else {
            $('#educationAdd input[name="teachTypeName"]').val("");
        }
        $('#educationAdd input[name="teachType"]').val(teachType);
    })


    $('#projectId2').change(function () {

        var projectId = $(this).val();

        $.ajax({
            url: ctx + '/bizProjectLevel/getAllOption',
            data: {projectId: projectId},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    var opt = "";
                    for (var i = 0; i < data.list.length; ++i) {
                        opt += "<option data-teachtype='" + data.list[i].teachType + "' value='" + data.list[i].projectLevelId + "'>" + data.list[i].levelTitle + "</option>";
                    }
                    $('#educationAdd select[name="projectLevelId"]').html(opt);

                    $('#educationAdd select[name="projectLevelId"]').change();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    })

    //院校
    $.ajax({
        url: ctx + '/bizSchool/getAll',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var opt = "";
                for (var i = 0; i < data.list.length; ++i) {
                    opt += "<option value='" + data.list[i].schoolId + "'>" + data.list[i].schoolName + "</option>";
                }
                $('#schoolId').html("<option value=''>--请选择--</option>" + opt);
                $('#schoolId').trigger('chosen:updated');
                $("#schoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });

    //专业
    $.ajax({
        url: ctx + '/bizMajor/getAll',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var opt = "";
                for (var i = 0; i < data.list.length; ++i) {
                    opt += "<option value='" + data.list[i].majorId + "'>" + data.list[i].majorName + "</option>";
                }
                $('#majorId').html("<option value=''>--请选择--</option>" + opt);
                $('#majorId').trigger('chosen:updated');
                $("#majorId").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });


    //新增职业资格产品
    $('.professionalAdd').on('hidden.bs.modal', function () {
        $('#professionalAdd')[0].reset();
        $('#professionalAdd input:hidden').val('');
        $('#professionalAdd select[name="projectId"]').trigger('chosen:updated');
        $('#professionalAdd select[name="projectId"]').chosen().change();
        $('#professionalAdd select[name="projectLevelId"]').change();
        $('#professionalAdd input[name="teachTypeName"]').val('');
        editor.html('');
        $('#professionalAdd').data('bootstrapValidator').resetForm();
    })

    $('#professionalAdd').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            className: {
                validators: {
                    notEmpty: {
                        message: '班型名称不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {

            var params = form.serialize() + "&projectType=1" + "&content=" + editor.html();

            $.ajax({
                url: ctx + '/bizProduct/addNewRecord',
                data: params,
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.professionalAdd').modal('hide');
                        InitiateSimpleDataTable1.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;

        }
    });
    $("#professionalAdd").on('success.form.bv', function (e) {
        e.preventDefault();
    });


    //新增学历产品
    $('.educationAdd').on('hidden.bs.modal', function () {
        $('#educationAdd')[0].reset();
        $('#educationAdd input:hidden').val('');
        $('#educationAdd select[name="projectId"]').chosen().change();
        $('#educationAdd select[name="projectId"]').trigger('chosen:updated');
        $('#educationAdd select[name="projectLevelId"]').change();
        $('#majorId').trigger('chosen:updated');
        $('#schoolId').trigger('chosen:updated');
        editor2.html('');
        $('#educationAdd').data('bootstrapValidator').resetForm();
    })
    $('#educationAdd').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            className: {
                validators: {
                    notEmpty: {
                        message: '班型名称不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {

            var params = form.serialize() + "&projectType=2" + "&content=" + editor2.html();

            $.ajax({
                url: ctx + '/bizProduct/addNewRecord',
                data: params,
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.educationAdd').modal('hide');
                        InitiateSimpleDataTable2.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
        }
    });


    //table初始化_职业资格
    $("#professionalTable tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
	$("#professionalTable tbody>tr>td").mLoading({
		text: '正在加载中，请稍后......',
		 icon: "../statics_html/common/image/loading5.gif"
	});
    InitiateSimpleDataTable1.init();

    //table初始化_学历
    $("#educationTable tbody").html("<tr><td height='300' colspan='10' class='text-center'></td></tr>");
	$("#educationTable tbody>tr>td").mLoading({
		text: '正在加载中，请稍后......',
		icon: "../statics_html/common/image/loading5.gif"
	});
    InitiateSimpleDataTable2.init();

    //搜索
    $('#professional .search-btn').click(function () {
        InitiateSimpleDataTable1.init();
    })

    $('#education .search-btn').click(function () {
        InitiateSimpleDataTable2.init();
    })

    //启用禁用
    $('#professionalTable').on('click', '.btn-use', function () {
        $.ajax({
            url: ctx + '/bizProduct/updateRecord',
            data: {productId: $(this).data('id'), enable: 0},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                InitiateSimpleDataTable1.init();
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });

    $('#professionalTable').on('click', '.btn-nouse', function () {

        $.ajax({
            url: ctx + '/bizProduct/updateRecord',
            data: {productId: $(this).data('id'), enable: 1},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                InitiateSimpleDataTable1.init();
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });

    $('#educationTable').on('click', '.btn-use', function () {

        $.ajax({
            url: ctx + '/bizProduct/updateRecord',
            data: {productId: $(this).data('id'), enable: 0},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                InitiateSimpleDataTable2.init();
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });

    $('#educationTable').on('click', '.btn-nouse', function () {

        $.ajax({
            url: ctx + '/bizProduct/updateRecord',
            data: {productId: $(this).data('id'), enable: 1},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    InitiateSimpleDataTable2.init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });

    //职业资格编辑
    $('#professionalTable').on('click', '.edit', function () {
        $('.modal-title').html('编辑');
        var record = $(this).data('reocrd');

        $('#professionalAdd input[name="productId"]').val(record.productId);

        loadProjectLevel(record.projectId, record.projectLevelId, "professionalAdd");
        $('#professionalAdd select[name="teachType"]').val(record.teachType);
        $('#professionalAdd input[name="className"]').val(record.className);

        editor.html(record.content);

        $('#projectId1').val(record.projectId);
        $('#projectId1').trigger('chosen:updated');

        $('.professionalAdd').modal('show');

    });

    //学历编辑
    $('#educationTable').on('click', '.edit', function () {
        $('.modal-title').html('编辑');
        var record = $(this).data('reocrd');

        $('#educationAdd input[name="productId"]').val(record.productId);
        $('#projectId2').val(record.projectId);
        $('#projectId2').trigger('chosen:updated');

        loadProjectLevel(record.projectId, record.projectLevelId, "educationAdd");

        $('#educationAdd select[name="teachType"]').val(record.teachType);
        $('#educationAdd input[name="className"]').val(record.className);

        $('#educationAdd select[name="educationForm"]').val(record.educationForm);

        $('#schoolId').val(record.bizSchool.schoolId);
        $('#schoolId').trigger('chosen:updated');

        $('#majorId').val(record.bizMajor.majorId);
        $('#majorId').trigger('chosen:updated');

        $('#educationAdd input[name="className"]').val(record.className);

        editor2.html(record.content);

        $('.educationAdd').modal('show');

    });


    //学历定价
    $('#educationTable').on('click', '.price', function () {
        var productId = $(this).data('id');
        //1:职业资格 2:学历
        var from = $(this).data('from');
        /*var projectId = $(this).attr('data-bizProject');
        var projectLevelId = $(this).attr('data-bizProjectLevel');
        var teachType = $(this).attr('data-teachType');
        var educationForm = $(this).attr('data-educationForm');
        var schoolId = $(this).attr('data-bizSchool');
        var majorId =$(this).attr('data-bizMajor');
        var className = $(this).attr('data-className');*/
        loadHtml('/bizProductPrice/index2?productId=' + productId + '&from=' + from );

    });

    //职业资格定价
    $('#professionalTable').on('click', '.price', function () {
        var productId = $(this).data('id');
        //1:职业资格 2:学历
        var from = $(this).data('from');

        loadHtml('/bizProductPrice/index2?productId=' + productId + '&from=' + from);

    });

    //职业资格说明配置
    var professionalConfigTable1 = function () {
        return {
            init: function () {
                var pcTable = $('#professionalConfig').dataTable({
                    "bPaginate": false,  //是否显示分页
//                	"iDisplayLength": 20,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": false, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/bizConfig/load',
                    "fnServerData": professionalConfig,//用于替换默认发到服务端的请求操作
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
                            "mData": "configId",
                            "bSortable": false,
                            'sClass': "text-center",
                            "mRender": function (data, type, full) {
                                return "<label> <input type='checkbox' class='slaver3' name='checkboxs' value=" + data + "> <span class='text'></span> </label>";
                            }
                        },
                        {"mData": "configDesc", "bSortable": true, 'sClass': "text-center"}
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                });
            }
        }
    }();
    professionalConfigTable1.init();
    //设置职业资格说明配置
    $('#professionalConfigure').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var productDesc = [];
            var r = document.getElementsByName("checkboxs");
            for (var i = 0; i < r.length; i++) {
                if (r[i].checked) {
                    var isSelftestObj = r[i].value;
                    productDesc.push(isSelftestObj);
                }
            }
            var productDescJson = productDesc.join(",");
            var productId = $('#professionalConfigure input[name = "productId"]').val();
            $.ajax({
                url: ctx + '/bizProduct/updateRecord',
                data: {productDesc: productDescJson, productId: productId},
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.professionalConfigure').modal('hide');
                        professionalConfigTable1.init();
                        InitiateSimpleDataTable1.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
        }
    });
    //学历说明配置
    var educationConfigTable1 = function () {
        return {
            init: function () {
                var pcTable = $('#educationConfig').dataTable({
                    "bPaginate": false,  //是否显示分页
//                	"iDisplayLength": 20, 
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": false, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/bizConfig/load',
                    "fnServerData": educationConfig,//用于替换默认发到服务端的请求操作
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
                            "mData": "configId",
                            "bSortable": false,
                            'sClass': "text-center",
                            "mRender": function (data, type, full) {
                                return "<label> <input type='checkbox' class='slaver4' name='checkboxes' value=" + data + "> <span class='text'></span> </label>";
                            }
                        },
                        {"mData": "configDesc", "bSortable": true, 'sClass': "text-center"}
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                });
            }
        }
    }();
    educationConfigTable1.init();
    //设置学历说明配置
    $('#educationConfigure').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var productDesc = [];
            var r = document.getElementsByName("checkboxes");
            for (var i = 0; i < r.length; i++) {
                if (r[i].checked) {
                    var isSelftestObj = r[i].value;
                    productDesc.push(isSelftestObj);
                }
            }
            var productDescJson = productDesc.join(",");
            var productId = $('#educationConfigure input[name = "productId"]').val();
            $.ajax({
                url: ctx + '/bizProduct/updateRecord',
                data: {productDesc: productDescJson, productId: productId},
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.educationConfigure').modal('hide');
                        educationConfigTable1.init();
                        InitiateSimpleDataTable2.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
        }
    });
});

//加载项目级别
function loadProjectLevel(projectId, projectLevelId, type) {

    $.ajax({
        url: ctx + '/bizProjectLevel/getAllOption',
        data: {projectId: projectId},
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var opt = "";
                for (var i = 0; i < data.list.length; ++i) {
                    opt += "<option data-teachtype='" + data.list[i].teachType + "' value='" + data.list[i].projectLevelId + "'>" + data.list[i].levelTitle + "</option>";
                }

                $('#' + type + ' select[name="projectLevelId"]').html(opt);

                if (projectLevelId)
                    $('#' + type + ' select[name="projectLevelId"]').val(projectLevelId);

                $('#' + type + ' select[name="projectLevelId"]').change();
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });

}


function retrieveData1(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var searchVal = $('#professional .searchVal').val();

    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    var enable = $('#professional select[name="status"]').val();

    if (enable == 0 || enable == 1) {
        aoData.push({"name": "enable", "value": enable});
    }

    aoData.push({"name": "projectType", "value": 1});

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

function retrieveData2(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var searchVal = $('#education .searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    var enable = $('#education select[name="status"]').val();

    if (enable == 0 || enable == 1) {
        aoData.push({"name": "enable", "value": enable});
    }

    aoData.push({"name": "projectType", "value": 2});

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
function editView(productId, productDesc) {
    var productDescArray = productDesc.split(',');

    for (var i = 0; i < productDescArray.length; i++) {
        var productDescId = productDescArray[i];
        $('#professionalConfigure input[value="' + productDescId + '"]').prop('checked', 'checked');
    }
    $('#professionalConfigure input[name="productId"]').val(productId);
};
function editView1(productId, productDesc) {
    var productDescArray = productDesc.split(',');

    for (var i = 0; i < productDescArray.length; i++) {
        var productDescId = productDescArray[i];
        $('#educationConfigure input[value="' + productDescId + '"]').prop('checked', 'checked');
    }
    $('#educationConfigure input[name="productId"]').val(productId);
};
function professionalConfig(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "configType", "value": 1});

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
function educationConfig(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "configType", "value": 2});

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
//回车搜索
function search(identifyStr) {
    if (event.keyCode == 13) {
        if (identifyStr == 'professional') {
            InitiateSimpleDataTable1.init();
        } else if (identifyStr == 'education') {
            InitiateSimpleDataTable2.init();
        }
    }
}

$('#professionalAdd,#educationAdd').addClass('form-horizontal');

