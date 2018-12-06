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

    //全选
    $(document).on('change', 'input:checkbox.master', function () {
        if ($(this).prop('checked')) {
            $('input:checkbox.slaver').prop('checked', 'checked');
        } else {
            $('input:checkbox.slaver').prop('checked', '');
        }
    });

    //新增按钮
    $('.addBtn').click(function () {
        $('#infoQuantityAddModal').modal({
            'show':true,
            'backdrop':'static'
        });
        $("#infoQuantityAddModal .widget-caption").html("新增");
        
       
    });

    //启用
    $('#infoQuantityTable').on('click', 'a.btn-use', function () {
        var id = $(this).data('id');
        $.ajax({
            url: ctx + '/bizInfosBelong/updateRecord',
            data: {infosBelongId: id, enable: 0},
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

    //禁用
    $('#infoQuantityTable').on('click', 'a.btn-nouse', function () {
        var id = $(this).data('id');
        $.ajax({
            url: ctx + '/bizInfosBelong/updateRecord',
            data: {infosBelongId: id, enable: 1},
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

    //查看
    $('#infoQuantityTable').on('click', 'a.view', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var projects = $(this).data('projects');
        var departmentId = $(this).data('departmentid');
        var departmentName = $(this).data('departmentname');
        var brandSchool = $(this).data('brandschool');
        if (!isNaN(projects) && projects) {
            projects = projects.toString();
        }
        debugger;
        $('.infoQuantityView input[name="infosBelongId"]').val(id);
        $('.infoQuantityView input[name="infosBelongName"]').val(name);
        if (projects){
        	$('.infoQuantityView select[name="projects"]').selectpicker();  
            $('.infoQuantityView select[name="projects"]').selectpicker('val', projects.indexOf(",")>=0 ? projects.split(',') : projects);
            $('.infoQuantityView select[name="projects"]').selectpicker("refresh");
    	}
        $('.infoQuantityView input[name="departmentId"]').val(departmentId);
        $('.infoQuantityView input[name="departmentName"]').val(departmentName);

        $('.infoQuantityView .selectpicker').attr('disabled', 'disabled');

        for (var i = 0; i < brandSchool.length; ++i) {
            $('.infoQuantityView .' + brandSchool[i].brand + '').selectpicker();
            $('.infoQuantityView .' + brandSchool[i].brand + '').selectpicker('val', brandSchool[i].school);
        }

        $('.infoQuantityView').modal({
            'show':true,
            'backdrop':'static'
        });
    });

    //编辑
    $('#infoQuantityTable').on('click', 'a.edit', function () {
        $(".infoQuantityAdd .widget-caption").html("编辑");
        var id = $(this).data('id');
        var name = $(this).data('name');
        var projects = $(this).data('projects');
        var departmentId = $(this).data('departmentid');
        var departmentName = $(this).data('departmentname');
        var brandSchool = $(this).data('brandschool');
        var companyName = $(this).data('companyname');

        if (!companyName) {
            $("#company_id").val(departmentName);
        } else {
            $("#company_id").val(companyName);
        }

        if (!isNaN(projects) && projects) {
            projects = projects.toString();
        }

        $('.infoQuantityAdd input[name="infosBelongId"]').val(id);
        $('.infoQuantityAdd input[name="infosBelongName"]').val(name);
        if (projects) {
        	$('.infoQuantityAdd select[name="projects"]').selectpicker('val', projects.indexOf(",")>=0 ? projects.split(',') : projects);
        	$('.infoQuantityAdd select[name="projects"]').selectpicker("refresh");
        }
        $('.infoQuantityAdd input[name="departmentId"]').val(departmentId);
        $('.infoQuantityAdd input[name="departmentName"]').val(departmentName);

        for (var i = 0; i < brandSchool.length; ++i) {
            $('#infoQuantityAdd .' + brandSchool[i].brand + '').selectpicker('val', brandSchool[i].school);
        }

        $('.infoQuantityAdd').modal({
            'show':true,
            'backdrop':'static'
        });
    });


    //初始化项目select
    $.ajax({
        url: ctx + '/product/selectAll',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
           
                var str = "";
                for (var i = 0; i < data.list.length; ++i) {
                    str += "<option value='" + data.list[i].productId + "'>" + data.list[i].productName + "</option>";
                }
                $('#infoQuantityAddModal').find('select[name="projects"]').html(str);
                $('.infoQuantityView').find('select[name="projects"]').html(str);
                $('.selectpicker').selectpicker('refresh');
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });


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

            //初始化品牌
            $.ajax({
                url: ctx + '/bizBrand/getAllOption',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    var brandSchool = "";
                    for (var i = 0; i < data.list.length; i++) {
                    	var dis = data.list[i].enable
                    	var str = '';
                    	 if(dis=="1"){
                    		 str =  '<select name="brandSchools[' + i + '].school" class="form-control selectpicker ' + data.list[i].brandId + '" multiple title="分校">' + opt + '</select>';
                      }else{
                    	  	 str =  '<input readonly class="form-control" type="text" value="该品牌已禁用" />';
                      }
                        brandSchool += '<div class="form-group brand">' +
                            '<div class="col-sm-2 col-md-offset-2">' +
                            '<input type="hidden" name="brandSchools[' + i + '].brand" class="form-control" value="' + data.list[i].brandId + '"/>' +
                            '<input type="text" readonly="readonly" value="' + data.list[i].brandName + '" class="form-control"/>' +
                            '</div>' +
                            '<div class="col-sm-6 no-padding-left">' +
                            str+
                            '</div>' +
                            '</div>';
                    }
                    $('#infoQuantityAddModal .brand-before').after(brandSchool);
                    $('.infoQuantityView .brand-before').after(brandSchool);
                    $('#infoQuantityAddModal .brand select').selectpicker({
                        'liveSearch': true,
                        'liveSearchPlaceholder': '请输入关键字',
                        'actionsBox': true,
                        'selectAllText': '全选',
                        'deselectAllText': '取消',
                        'noneSelectedText': '没有匹配项'
                    })
                    $('#infoQuantityAddModal .brand select').selectpicker('refresh');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

    $('#infoQuantityAddModal').on('hidden.bs.modal', function () {
        $("#infoQuantityAdd")[0].reset();
        $('#infoQuantityAdd').data('bootstrapValidator').resetForm();
        $('#infoQuantityAdd .selectpicker').selectpicker('val', '');
        $('#infoQuantityAdd input[name="infosBelongId"]').val('');

    });

    //新增或编辑
    $('#infoQuantityAdd').bootstrapValidator({
        fields: {
            infosBelongName: {
                validators: {
                    notEmpty: {
                        message: '名称不能为空！'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            var $form = $(form);

            var options = $form.serialize();

            var projectsName = $('#infoQuantityAdd select[name="projects"]').siblings('button').attr('title');

            options = options + "&projectsName=" + projectsName;

            $.ajax({
                url: ctx + '/bizInfosBelong/addRecord',
                data: options,
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('#infoQuantityAddModal').modal('hide');
                        InitiateSimpleDataTable.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;
        }
    });
    //数据初始化
    $("#infoQuantityTable tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
	$("#infoQuantityTable tbody>tr>td").mLoading({
		text: '正在加载中，请稍后......',
		icon: "../statics_html/common/image/loading5.gif"
	});
    InitiateSimpleDataTable.init();
});


function retrieveData(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    aoData.push({"name": "enable", "value": ""});

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

//回车搜索
function search() {
    if (event.keyCode == 13) {
        InitiateSimpleDataTable.init();
    }
}




