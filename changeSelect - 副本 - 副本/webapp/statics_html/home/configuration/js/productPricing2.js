$(function () {

    var from = $('#from').val();

    if (from == 1) {
        $('#professional').show();
        InitiateSimpleDataTable1.init();
    } else if (from == 2) {
        $('#education').show();
        InitiateSimpleDataTable2.init();
    }

    //所有价格输入框不能为负数
    $('#professionalCopy input.number').bind('input propertychange', function () {
        var patter = /[\d.]$/;

        if ($(this).val() && !patter.test($(this).val()))
            $(this).val(0);
        else if ($(this).val() < 0) {
            $(this).val(0);
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

    //下拉框多选
    $('.selectpicker').selectpicker();

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

    $('.professionalCopy input:checkbox').on('change', function () {
        this.value = this.checked ? 1 : 0;
 
    }).change();

    $('.educationCopy input:checkbox').on('change', function () {
        this.value = this.checked ? 1 : 0;
    }).change();

    $.ajax({
        url: ctx + '/department/getByWhere',
        dataType: 'json',
        data: {type: 3},
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var opt = "";
                for (var i = 0; i < data.list.length; ++i) {
                    opt += "<option value='" + data.list[i].departmentId + "'>" + data.list[i].fullName + "</option>";
                }

                $('#professionalAdd select[name="departments"]').html(opt);
                $('#educationAdd select[name="departments"]').html(opt);
                $('#professionalCopy select[name="departments"]').html(opt);
                $('#educationCopy select[name="departments"]').html(opt);
                $('.selectpicker').selectpicker('refresh');
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });


    //复制职业资格
    $('.professionalCopy').on('hidden.bs.modal', function () {
        $('#professionalCopy')[0].reset();
        $('#professionalCopy input[name="productId"]').val('');
        $('#professionalCopy .selectpicker').selectpicker('refresh');
        $('#professionalCopy').data('bootstrapValidator').resetForm();

        editor.html('');
    })
    //新增职业资格定价
    $('#professionalAdd').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                url: ctx + '/bizProductPrice/addNewRecord',
                data: $('#professionalAdd').serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.professionalAdd').modal('hide');
                        InitiateSimpleDataTable1.init();
                        InitiateSimpleDataTable2.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;

        }
    });
    $("#professionalCopy").on('success.form.bv', function (e) {
        e.preventDefault();
    });


    //职业资格新增
    $('#professionalCopyTable').on('click', '.copy', function () {

        var productId = $(this).data('productid');

        $('#professionalCopy input[name="productId"]').val(productId);

        $('.professionalCopy').modal('show');
    });

    //职业资格批量设置
//    $('#professional').on('click', '.professionalSet', function () {
//
//        var productId = "";
//
//        $('#professionalCopyTable .slaver1:checked').each(function () {
//            productId += $(this).data('id') + ",";
//        })
//
//        if (productId.length <= 0) {
//            toastr.info("请至少选择一项进行批量设置！");
//            return;
//        } else {
//            productId = productId.substr(0, productId.length - 1);
//        }
//
//        $('#professionalCopy input[name="productId"]').val(productId);
//
//        $('.professionalCopy').modal('show');
//
//    });

    //学历批量设置
//    $('#education').on('click', '.educationSet', function () {
//
//        var productId = "";
//
//        $('#educationTable .slaver2:checked').each(function () {
//            productId += $(this).data('id') + ",";
//        })
//
//        if (productId.length <= 0) {
//            toastr.info("请至少选择一项进行批量设置！");
//            return;
//        } else {
//            productId = productId.substr(0, productId.length - 1);
//        }
//
//
//        $('#educationCopy input[name="productId"]').val(productId);
//
//        $('.educationCopy').modal('show');
//
//    });

    //职业资格查看、编辑
    $('#professionalCopyTable').on('click', '.view-edit', function () {
    	if($(this).hasClass('view')){
    		$('.professionalCopy .widget-caption').text('查看');
    		$('.professionalCopy form fieldset').attr('disabled',true);
    		$('.professionalCopy .modal-footer').hide();
    	}else{
    		$('.professionalCopy .widget-caption').text('编辑');
    		$('.professionalCopy form fieldset').attr('disabled',false);
    		$('.professionalCopy .modal-footer').show();
    	}
    	
        var record = $(this).data('record');

        editor.html(record.content);

        $('#professionalCopy input[name="productId"]').val(record.product_id);

        var price;

        if (record.price) {

            price = JSON.parse(record.price);

            for (var i = 0; i < price.length; ++i) {
                var id = price[i].id;
                $('#professionalCopy input[name="productPrice[' + (id - 1) + '].price"]').val(price[i].price);
                $('#professionalCopy input[name="productPrice[' + (id - 1) + '].limit"]').val(price[i].limit);
                if (price[i].isLock) {
                    $('#professionalCopy input[name="productPrice[' + (id - 1) + '].isLock"]').prop('checked', true);
                    $('#professionalCopy input[name="productPrice[' + (id - 1) + '].isLock"]').val(1);
                }

            }
        }

        if (record.department_id)
            $('#professionalCopy select[name="departments"]').selectpicker('val', record.department_id.indexOf(",") ? record.department_id.split(',') : record.department_id);

        $('.professionalCopy').modal('show');
    });
    
    //职业资格定价编辑提交
    $('#professionalCopy').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                url: ctx + '/bizProductPrice/updateRecord',
                data: $('#professionalCopy').serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.professionalCopy').modal('hide');
                        $('#professionalCopy')[0].reset();
                        $('#professionalCopy input[name="productId"]').val('');
                        $('#professionalCopy .selectpicker').selectpicker('refresh');
                        $('#professionalCopy').data('bootstrapValidator').resetForm();
                        editor2.html('');
                        $('#professionalCopy .tutorialFee').remove();
                        InitiateSimpleDataTable1.init();
                        InitiateSimpleDataTable2.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;

        }
    });

  /*  //复制学历
    $('.educationCopy').on('hidden.bs.modal', function () {
        $('#educationCopy')[0].reset();
        $('#educationCopy input[name="productId"]').val('');
        $('#educationCopy .selectpicker').selectpicker('refresh');
        $('#educationCopy').data('bootstrapValidator').resetForm();

        editor2.html('');

        $('#educationCopy .tutorialFee').remove();
    })*/

    //学历价格新增
    $('#educationAdd').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                url: ctx + '/bizProductPrice/addNewRecord',
                data: $('#educationAdd').serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.educationAdd').modal('hide');
                        $('#educationAdd')[0].reset();
                        $('#educationAdd input[name="productId"]').val('');
                        $('#educationAdd .selectpicker').selectpicker('refresh');
                        $('#educationAdd').data('bootstrapValidator').resetForm();
                        editor2.html('');
                        $('#educationAdd .tutorialFee').remove();
                        InitiateSimpleDataTable1.init();
                        InitiateSimpleDataTable2.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;

        }
    });
    $("#educationCopy").on('success.form.bv', function (e) {
        e.preventDefault();
    });


    //新增学历 
    $('#educationTable').on('click', '.copy', function () {

        var productId = $(this).data('productid');

        $('#educationCopy input[name="productId"]').val(productId);

        //辅导费类型
        var record = $(this).data('record');
        var projectLevelId = record.project_level_id;
        var schoolId = record.school_id;
        var majorId = record.major_id;
        var educationForm = record.education_form;

        var params = {};
        params["projectLevelId"] = projectLevelId;
        params["schoolId"] = schoolId;
        params["majorId"] = majorId;
        params["educationForm"] = educationForm;

        $.ajax({
            url: ctx + '/bizTutorialFeeSet/getAll',
            dataType: 'json',
            data: params,
            type: 'post',
            success: function (data) {

                var tutorialFee = "";
                var totalFee = 0;
                for (var i = 0; i < data.list.length; ++i) {
                    var tutorialFeeName = data.list[i].bizTutorialFee.tutorialFeeName;
                    var fee = data.list[i].fee;
                    totalFee = totalFee + fee;
                    var str = '<div class="form-group col-sm-12 tutorialFee" style="margin-left:-32px">' +
                        '<label class="control-label col-sm-2 no-padding-right">' + tutorialFeeName + '：</label>' +
                        '<div class="col-sm-3">' +
                        '<input type="hidden" disabled="disabled" name="productPrice[5].childs[' + i + '].name" value="' + tutorialFeeName + '" >' +
                        '<input type="number" disabled="disabled" name="productPrice[5].childs[' + i + '].price" value="' + fee + '" class="form-control" oninput="javascript:calculate(this);" onpropertychange="javascript:calculate(this);">' +
                        '</div>' +
                        '</div>';
                    tutorialFee += str;
                }
                $('#educationCopy input[name="productPrice[5].price"]').val(totalFee);
                $('#educationCopy .before-tutorialFee').after(tutorialFee);
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

        $('.educationCopy').modal('show');
    });


    //学历定价查看、编辑
    $('#educationTable').on('click', '.view-edit', function () {
    	if($(this).hasClass('view')){
    		$('.educationCopy .widget-caption').text('查看');
    		$('.educationCopy form fieldset').attr('disabled',true);
    		$('.educationCopy .modal-footer').hide();
    	}else{
    		$('.educationCopy .widget-caption').text('编辑');
    		$('.educationCopy form fieldset').attr('disabled',false);
    		$('.educationCopy .modal-footer').show();
    	}
        var record = $(this).data('record');
        editor2.html(record.content);
        $('#educationCopy input[name="productId"]').val(record.product_id);
        $('#educationCopy input[name="productPriceId"]').val(record.product_price_id);
        if (!record.price) {
            toastr.info("还未定价，请定价！");
            return;
        }
        var price;
        if (record.price) {
            var price = JSON.parse(record.price);
            for (var i = 0; i < price.length; ++i) {
                var id = price[i].id;
                $('#educationCopy input[name="productPrice[' + (id - 1) + '].price"]').val(price[i].price);
                $('#educationCopy input[name="productPrice[' + (id - 1) + '].limit"]').val(price[i].limit);
                if (price[i].isLock) {
                    $('#educationCopy input[name="productPrice[' + (id - 1) + '].isLock"]').prop('checked', true);
                    $('#educationCopy input[name="productPrice[' + (id - 1) + '].isLock"]').val(1);
                }
                if (i == 5) {
                    var tutorialFee = "";
                    if (price[i].childs) {
                        for (var j = 0; j < price[i].childs.length; ++j) {
                            var tutorialFeeName = price[i].childs[j].name;
                            var tutorialFeePrice = price[i].childs[j].price;
                            var str = '<div class="form-group col-sm-12 tutorialFee" style="margin-left:-32px">' +
                                '<label class="control-label col-sm-2 no-padding-right">' + tutorialFeeName + '：</label>' +
                                '<div class="col-sm-3">' +
                                '<input type="hidden" name="productPrice[5].childs[' + j + '].name" value="' + tutorialFeeName + '" >' +
                                '<input type="number" name="productPrice[5].childs[' + j + '].price" value="' + tutorialFeePrice + '" class="form-control" oninput="javascript:calculate(this);" onpropertychange="javascript:calculate(this);">' +
                                '</div>' +
                                '</div>';
                            tutorialFee += str;
                        }
                        $('#educationCopy .before-tutorialFee').after(tutorialFee);
                    }
                }
            }
        }
        if (record.department_id)
            $('#educationCopy select[name="departments"]').selectpicker('val', record.department_id.indexOf(",") ? record.department_id.split(',') : record.department_id);
        $('.educationCopy').modal('show');
    });
    //学历定价编辑
    $('#educationCopy').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                url: ctx + '/bizProductPrice/updateRecord',
                data: $('#educationCopy').serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.educationCopy').modal('hide');
                        $('#educationCopy')[0].reset();
                        $('#educationCopy input[name="productId"]').val('');
                        $('#educationCopy .selectpicker').selectpicker('refresh');
                        $('#educationCopy').data('bootstrapValidator').resetForm();
                        editor2.html('');
                        $('#educationCopy .tutorialFee').remove();
                        InitiateSimpleDataTable1.init();
                        InitiateSimpleDataTable2.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;

        }
    });
})

//返回产品配置页
$('.back-btn').click(function(){
    var from = $('#from').val();
    loadHtml('/bizProduct/index?from=' + from);
    return false;
})

function retrieveData1(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var searchVal = $('#professional .searchVal').val();

    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    aoData.push({"name": "projectType", "value": 1});

    var productId = $('#productId').val();
    aoData.push({"name": "productId", "value": productId});

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


    aoData.push({"name": "projectType", "value": 2});

    var productId = $('#productId').val();
    aoData.push({"name": "productId", "value": productId});

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


function calculate(t) {

    var price = 0;
    $('#educationCopy .tutorialFee input').each(function () {
        if (parseFloat($(this).val()))
            price = price + parseFloat($(this).val());
    })

    $('#educationCopy input[name="productPrice[5].price"]').val(price);

}

//搜索
$('#professional .search-btn').click(function () {
    InitiateSimpleDataTable1.init();
})


$('#education .search-btn').click(function () {
    InitiateSimpleDataTable2.init();
})
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

//分校全选
$('.choiceBranch').on('click', function () {
    if ($(this).prop('checked')) {
        $('.choiceBranchSchool').selectpicker('selectAll');
    } else {
        $('.choiceBranchSchool').selectpicker('deselectAll');
    }
})














