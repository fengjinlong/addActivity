$(function () {
    /**
     * 常用收款人
     */
    (function () {
    	//新增常用收款人时  先清空文本框
    	$("#addPeopleBut").click(function(){
    		$('#receiverAdd [name="accountNum"]').val("")
    		$('#receiverAdd [name="bankName"]').val("")
    		$('#receiverAdd [name="province"]').val("110000");
    		$('#receiverAdd [name="province"]').trigger('chosen:updated');
    		$('#receiverAdd [name="province"]').change();
    		$('#receiverAdd [name="accountName"]').val("")
    		$('#receiverAdd [name="phone"]').val("")
    		$('#receiverAdd [name="description"]').val("")
    	})
        //新增
        $('#receiverAdd').bootstrapValidator({
            fields: {
                /*验证*/
                accountNum: {
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '类型名称不能为空'
                        },
                        regexp: {
                            /* 只需加此键值对 */
                            regexp: /^[0-9\.]+$/,
                            message: '只能是数字'
                        }
                    }
                },
                accountName: {
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '真实姓名不能为空'
                        },
                        regexp: {
                            /* 只需加此键值对 */
                            regexp: /[\u4e00-\u9fa5]/g,
                            message: '只能是汉字'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '电话不能为空'
                        },
                        regexp: {
                            /* 只需加此键值对 */
                        	 regexp: /^[0-9\.]+$/,
                             message: '只能是数字'
                        }
                    }
                },
            },
            submitHandler: function (validator, form, submitButton) {
            	console.log($("#receiverAdd").serializeArray());
                $.ajax({
                    type: "POST",
                    url: ctx + "/bizFinance/addNewRecord",
                    data: $("#receiverAdd").serializeArray(),
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.status == 'success') {
                            init();
                            $('.receiverAdd').modal('hide');
                            toastr.success("添加成功");
                        } else {
                            toastr.error("添加失败");
                        }

                    }
                });
            }
        });

        //编辑
        $('#receiverEdit').bootstrapValidator({
            fields: {
                /*验证*/
                accountNum: {
                    message: 'The projectType is not valid',
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '类型名称不能为空'
                        },
                        regexp: {
                            /* 只需加此键值对 */
                            regexp: /^[0-9\.]+$/,
                            message: '只能是数字'
                        }
                    }
                },
                accountName: {
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '真实姓名不能为空'
                        },
                        regexp: {
                            /* 只需加此键值对 */
                            regexp: /[\u4e00-\u9fa5]/g,
                            message: '只能是汉字'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '电话不能为空'
                        },
                        regexp: {
                            /* 只需加此键值对 */
                        	 regexp: /^[0-9\.]+$/,
                             message: '只能是数字'
                        }
                    }
                },
            },
            submitHandler: function (validator, form, submitButton) {
                $.ajax({
                    type: "POST",
                    url: ctx + "/bizFinance/updateRecord",
                    data: $("#receiverEdit").serializeArray(),
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.status == 'success') {
                            init();
                            $('.receiverEdit').modal('hide');
                            toastr.error("修改成功");
                        } else {
                            toastr.error("修改失败");
                        }

                    }
                });
            }
        });


        //删除
        $("#commonReceiver .delete").click(function () {
            $(this).parent().parent().remove();
        });

    })();


    /**
     * 费用类别
     */
    (function () {
        //查看
        $('#costClasses .sidebar-menu').on('click', 'a', function (e) {
            $('.costInfo').find('.costName').val($(this).find('.menu-text').text());
            $('.costInfo').find('.costclassCode').val($(this).find('.costclassCode').val());
            $('.costInfo').find('.parentName').val($(this).parent().parent().parent().find("a").first().find("span").text());
            $('.costInfo').find('.type').val($(this).find('.type').val() == "1" ? "收入" : "支出");

            var financeCostclassId = $(this).find(".financeCostclassId").val();
            var parentId = $(this).parent().parent().prev().find('.financeCostclassId').val();
            var fullPath = $(this).parent().parent().prev().find('.fullPath').val();
            $('.costEdit').find('input[name=costclassName]').val($(this).find('.menu-text').text());
            $('.costEdit').find('input[name="costclassCode"]').val($(this).find('.costclassCode').val());
            var a = $(this).parent().parent().parent().find("a").first().find("span").text();
            $('.costEdit').find('input[name=parentName]').val(a);
            $('.costEdit').find('select[name=type]').val($(this).find('.type').val()); //费用种类
            $('.costEdit').find('input[name=financeCostclassId]').val(financeCostclassId);
            if(parentId == 'undefined'||parentId==""||parentId==null){
            	$('.costEdit').find('input[name=parentId]').val(0);
            }else{
            	$('.costEdit').find('input[name=parentId]').val(parentId);
            }
            if(fullPath == 'undefined'){
            	$('.costEdit').find('input[name=fullPath]').val('');
            }else{
            	$('.costEdit').find('input[name=fullPath]').val(fullPath);
            }

            $(this).css('color', '#5db2ff').parent().siblings().find('a').css('color', '#000');
            $(this).find('.fa-plus-square-o').css('display', 'block');
            $(this).parent().siblings().find('.fa-plus-square-o').css('display', 'none');

            $('.costInfo').show();
            $('.costAdd,.costEdit').hide();

        });

        //新增
        $('#costClasses .sidebar-menu').on('click', '.fa-plus-square-o', function (event) {
        	console.log("=========")
            if ($(this).is('.costClasses-btn')) {
                $('.costAdd input[name="parentName"]').val('无');
                $('.costAdd input[name="parentId"]').val(0);
            } else {
                $('.costAdd input[name="parentName"]').val($(this).parent().find('.menu-text').text());
                $('.costAdd input[name="parentId"]').val($(this).siblings('input.financeCostclassId').val());
                $('.costAdd input[name="fullPath"]').val($(this).parent().find('.fullPath').val() + $(this).parent().find('.parentId').val() + ",");
            }
            $('.costInfo,.costEdit').hide();
            $('.costAdd').show();
            event.stopPropagation();
        });
        
        $('.costClasses-btn').click(function () {
        	console.log("++++++++=")
            $('.costAdd input[name="parentName"]').val('无');
            $('.costAdd input[name="parentId"]').val(0);
            
            $('.costInfo,.costEdit').hide();
            $('.costAdd').show();
            event.stopPropagation();
        })

        $('#costAdd').bootstrapValidator({
            fields: {
                /*验证*/
                costclassName: {
                    message: 'The projectType is not valid',
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '类型名称不能为空'
                        }
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                $.ajax({
                    type: "POST",
                    url: ctx + "/bizFinance/addNewRecordCostClass",
                    data: $("#costAdd").serializeArray(),
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.status == 'success') {
                            toastr.success(msg.msg);
                            initCostClass(0);

                            $('#costAdd input[name="costclassName"]').val('');
                            $('#costAdd').data('bootstrapValidator').resetForm();
                        } else {
                            toastr.error(msg.msg);
                        }

                    }
                });
            }
        });

        //编辑
        $('.costInfo .edit-btn').on('click', function () {
            $('.costInfo,.costAdd').hide();
            $('.costEdit').show();
        })

        $('#costEdit').bootstrapValidator({
            fields: {
                /*验证*/
                costclassName: {
                    message: 'The projectType is not valid',
                    validators: {
                        notEmpty: {
                            /*非空提示*/
                            message: '类型名称不能为空'
                        }
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
            	console.log($("#costEdit").serializeArray());
                $.ajax({
                    type: "POST",
                    url: ctx + "/bizFinance/updateRecordCostClass",
                    data: $("#costEdit").serializeArray(),
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.status == 'success') {
                            toastr.success(msg.msg);
                            $('#costEdit input[name="costclassName"]').val('');
                            $('#costEdit').data('bootstrapValidator').resetForm();
                            initCostClass(0);
                        } else {
                            toastr.error(msg.msg);
                        }

                    }
                });
            }
        });

        //取消
        $('#costClasses .cancel-btn').on('click', function () {
            $('.costAdd,.costEdit').hide();
            $('.costInfo').show();
        })
    })();


    /**
     * 审批流程
     *//*
    (function () {
        //查看
        $('#approvalProcess .sidebar-menu').on('click', 'a', function () {

            var financeCostclassId = $(this).find('.financeCostclassId').val();

            $('#approvalEdit input[name="financeCostclassId"]').val(financeCostclassId);

            $.ajax({
                type: "POST",
                url: ctx + "/bizFinance/loadAppvoing",
                dataType: 'json',
                data: {financeCostclassId: financeCostclassId},
                success: function (data) {
                    $('#editAppend .approval-duty').remove();
                    ;
                    $('#editRightDutyMin').val('');
                    $('#editRightDuty').val('');
                    if (data.length > 0) {

                        $('#editRightDutyMin').val(data[0].rightDuty);
                        $('#editRightDuty').val(data[0].rightDutyName);

                        var dutys = data[0].dutys;
                        if (!dutys)
                            return;

                        var dutysArray = dutys.split(',');

                        var dutysName = data[0].dutysName;

                        var dutysNameArray = new Array(dutysArray.length);
                        if (dutysName)
                            dutysNameArray = dutysName.split(',');

                        for (var i = 0; i < dutysArray.length; i++) {
                            var div = '<div class="form-group approval-duty">'
                                + '       <label class="control-label col-sm-2 no-padding-right">审批职位</label>'
                                + '		  <i class="fa fa-minus-square-o costClasses-btn" onclick="removeDiv(this)"></i>'
                                + '      <div class="col-sm-8">'
                                + '          <input name="dutysName" value="' + dutysNameArray[i] + '" readonly onclick="showApproveDutys(this);" class="form-control">'
                                + '          <input name="dutys" value="' + dutysArray[i] + '" type="hidden" >'
                                + '          </input>'
                                + '      </div>'
                                + '   </div>';
                            $('#editAppend').append(div);
                        }
                    }
                }
            });

            $('#approvalProcess .approvalEdit').show();

            $(this).css('color', '#5db2ff').parent().siblings().find('a').css('color', '#000');
            $(this).find('.fa-plus-square-o').css('display', 'block');
            $(this).parent().siblings().find('.fa-plus-square-o').css('display', 'none');
        })

        $('#approvalAdd').bootstrapValidator({
            fields: {
                验证
                addRightDutys: {
                    message: 'The projectType is not valid',
                    validators: {
                        notEmpty: {
                            非空提示
                            message: '类型名称不能为空'
                        }
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                var ar1 = new Array();
                $("input[id^=addNum]").each(function () {
                    var ob1 = {};
                    var id = this.id.substring(this.id.length - 1, this.id.length);
                    ob1["id"] = "addHid" + id;
                    ob1["id_value"] = $("#addHid" + id).val();
                    ob1["name"] = this.id;
                    ob1["name_value"] = this.value;
                    ar1.push(ob1);
                });
                $("#addDutys").val(JSON.stringify(ar1));
                $.ajax({
                    type: "POST",
                    url: ctx + "/bizFinance/addNewRecordApproving",
                    data: $("#approvalAdd").serializeArray(),
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.status == 'success') {
                            toastr.success(msg.msg);
                        } else {
                        	swal('',"新增失败",'error');
                        }

                    }
                });
            }
        });

        //审批流程表单提交
        $('#approvalEdit').bootstrapValidator({
            submitHandler: function (validator, form, submitButton) {
                $.ajax({
                    type: "POST",
                    url: ctx + "/bizFinance/updateRecordApproving",
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 'success') {
                            toastr.success(data.msg);
                        } else {
                            toastr.error(data.msg);
                        }
                    },
                    complete: function () {
                        $('#approvalEdit').data('bootstrapValidator').resetForm();
                    }
                });
            }
        });

    })();*/

    initAddress();
    
 
})
/**
 * 全选
 */
$(document).on('change', 'input:checkbox.master', function () {
    if ($(this).prop('checked')) {
        $('input:checkbox.slaver').prop('checked', 'checked');
    } else {
        $('input:checkbox.slaver').prop('checked', '');
    }
})
/**
 * 初始化
 * @returns
 */
function init() {
    var init = $('#commonReceiver').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "iDisplayLength": 10,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": false,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/bizFinance/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": retrieveData,
        "aoColumns": [
            {
                "mDataProp": "financePayeeId", 'sClass': "text-center", "mRender": function (data, type, full) {
                return "<label> <input type='checkbox' class='slaver'> <span class='text'></span> </label>";
            }
            },
            {"mDataProp": "accountName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "phone", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "accountNum", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "bankName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "province", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "city", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "ratio",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    return '<a onclick="cat(\'' + full["financePayeeId"]
                        + '\',\'' + full["accountName"]
                        + '\',\'' + full["accountNum"]
                        + '\',\'' + full["bankName"]
                        + '\',\'' + full["province"]
                        + '\',\'' + full["city"]
                        + '\',\'' + full["phone"]
                        + '\',\'' + full["description"]
                        + '\')" class="view" data-toggle="modal" data-target=".receiverView">'
                        + '<i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>'
                        + '<a onclick="edit(\'' + full["financePayeeId"]
                        + '\',\'' + full["accountName"]
                        + '\',\'' + full["accountNum"]
                        + '\',\'' + full["bankName"]
                        + '\',\'' + full["provinceId"]
                        + '\',\'' + full["cityId"]
                        + '\',\'' + full["phone"]
                        + '\',\'' + full["description"]
                        + '\')" data-toggle="modal" data-target=".receiverEdit" class="edit">'
                        + '<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
                        + '<a href="javascript:void(0);" onclick="del(\'' + full["financePayeeId"] + '\')" class="delete">'
                        + '    <i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>'
                }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
}

//数据初始化
$("#commonReceiver tbody").html("<tr><td height='300' colspan='8' class='text-center'></td></tr>");
$("#commonReceiver tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
init();

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    if ($("#searchVal").val() == "启用") {
        aoData.push({"name": "enable", "value": 1});
    }
    else if ($("#searchVal").val() == "禁用") {
        aoData.push({"name": "enable", "value": 0});
    } else {
        aoData.push({"name": "searchVal", "value": $("#searchVal").val()});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
/**
 * 地址初始化
 * @returns
 */
function initAddress() {
    $("#province2").change(function () {
        city(this.value);
    });
    province();
}
function province() {
    document.getElementById("city2").options.length = 0;
    $.ajax({
        url: ctx + "/address/ajaxLoad",
        data: {"addressId": 0},
        dataType: "json",
        async: true,
        success: function (data) {
        	var str='';
            for (var i = 0; i < data.length; i++) {
            	str+='<option value="'+data[i].addressId+'">'+data[i].fullName+'</option>';
             /*   var o = new Option(data[i].fullName, data[i].addressId);
                document.getElementById("province2").options.add(o);*/
            }
            $("#province2").html(str);
            $('#province2').trigger('chosen:updated');
            $("#province2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $("#province2").change();
            //			city(data[0].addressId);
        }
    })
}
function city(val) {
    document.getElementById("city2").options.length = 0;
    $.ajax({
        url: ctx + "/address/ajaxLoad",
        data: {"addressId": val},
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].fullName, data[i].addressId);
                    document.getElementById("city2").options.add(o);
                }
            }
        }
    })
}
/**
 * 查看
 * @returns
 */
function cat(financePayeeId, accountName, accountNum, bankName, province, city, phone, description) {
	$('#catFinancePayeeId').val(financePayeeId);
    $('#catAccountName').val(accountName);
    $('#catAccountNum').val(accountNum);
    $('#catBankName').val(bankName);
    $('#catPhone').val(phone);
    if(description=='undefined' || description==null){
    	$('#catDescription').val("");
    }else{
    	$('#catDescription').val(description);
    }
    $('#catProvince').val(province);
    $('#catCity').val(city);
}
/**
 * 编辑
 * @returns
 */
function edit(financePayeeId, accountName, accountNum, bankName, provinceId, cityId, phone, description) {
    $('#updateFinancePayeeId').val(financePayeeId);
    $('#updateAccountName').val(accountName);
    $('#updateAccountNum').val(accountNum);
    $('#updateBankName').val(bankName);
    $('#updatePhone').val(phone);
    if(description=='undefined' || description==null){
    	$('#updateDescription').val("");
    }else{
    	$('#updateDescription').val(description);
    }
    $("#province1").change(function () {
        updateCity(this.value);
    });
    updateProvince(provinceId, cityId);
}
function updateProvince(id1, id2) {
    document.getElementById("city1").options.length = 0;
    $.ajax({
        url: ctx + "/address/ajaxLoad",
        data: {"addressId": 0},
        dataType: "json",
        async: true,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].addressId);
                var choose = (data[i].addressId == id1);
                if (choose) {
                    o.selected = true;
                }
                document.getElementById("province1").options.add(o);
            }
            updateCity(id1, id2);
        }
    })
}
function updateCity(id1, id2) {
    document.getElementById("city1").options.length = 0;
    $.ajax({
        url: ctx + "/address/ajaxLoad",
        data: {"addressId": id1},
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].fullName, data[i].addressId);
                    if (data[i].addressId == id2) {
                        o.selected = true;
                    }
                    document.getElementById("city1").options.add(o);
                }
            }
        }
    })
}
//删除
function del(val) {
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
            url: ctx + '/bizFinance/deleteRecord',
            type: 'POST',
            data: {
                financePayeeId: val,
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    toastr.success(data.msg);
                    init();
                }
            }
        });
    });
}
//******************************************************************************************************************************************************
//费用类别
$(function () {
    initCostClass(0);

	})
//费用类别左侧列表初始化
function initCostClass(pId) {
    $.ajax({
        type: "POST",
        url: ctx + "/bizFinance/loadCostClass",
        dataType: 'json',
        data: {parentId: pId},
        success: function (data) {
            var str = "";
            $('#listMenu').html("");
            for (var i = 0; i < data.length; i++) {
                str = str + '<li>'
                    + '   <a href="#" onclick="appendCostClass(\'' + data[i].financeCostclassId + '\',this)" class="menu-dropdown">'
                    + '   <span class="menu-text">' + data[i].costclassName + '</span>'
                    + '   <i class="fa pull-right fa-plus-square-o"></i>'
                    + '<input type="hidden" value="' + data[i].parentId + '" class="parentId" name="parentId">'
                    + '<input type="hidden" value="' + data[i].fullPath + '" class="fullPath" name="fullPath">'
                    + '<input type="hidden" value="' + data[i].type + '" class="type" name="type">'
                    + '<input type="hidden" value="' + (data[i].costclassCode ? data[i].costclassCode : "") + '" class="costclassCode" name="costclassCode">'
                    + '<input type="hidden" value="' + data[i].financeCostclassId + '" class="financeCostclassId" name="financeCostclassId">'
                    + ' </a><ul class="submenu"></ul></li>';
                $('#listMenu').html(str);
            }
        }
    });
}
function appendCostClass(pId, e) {
    $.ajax({
        type: "POST",
        url: ctx + "/bizFinance/loadCostClass",
        dataType: 'json',
        data: {parentId: pId},
        success: function (data) {
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str = str + '<li>'
                    + '   <a href="#" onclick="appendCostClass(\'' + data[i].financeCostclassId + '\',this)" class="menu-dropdown">'
                    + '   <span class="menu-text">' + data[i].costclassName + '</span>'
                    /*+ '   <i class="fa pull-right fa-plus-square-o"></i>'*/
                    + '<input type="hidden" value="' + data[i].parentId + '" class="parentId" name="parentId">'
                    + '<input type="hidden" value="' + data[i].fullPath + '" class="fullPath" name="fullPath">'
                    + '<input type="hidden" value="' + data[i].type + '" class="type" name="type">'
                    + '<input type="hidden" value="' + (data[i].costclassCode ? data[i].costclassCode : "") + '" class="costclassCode" name="costclassCode">'
                    + '<input type="hidden" value="' + data[i].financeCostclassId + '" class="financeCostclassId" name="financeCostclassId">'
                    + ' </a><ul class="submenu"></ul></li>';
                $(e).parent().children("ul").html(str);
            }
        }
    });
}

//******************************************************************************************************************************************************
//审批流程
$(function () {
    initPayeeClass(0);
    
    initAppmainTable();
    loadCostclass();
    //申请职位创建
    $('.add-post').click(function(){
       var str = '<div class="form-group approval-duty col-sm-12">'
	        + '       <label class="control-label col-sm-2 no-padding-right remarkText">审批职位</label>'
	        + '      <div class="col-sm-10">'
	        + '          <input readonly name="dutyNames" onclick="showApproveDutys(this);"  class="form-control"/>'
	        + '          <input name="dutyIds" type="hidden" />'
	        + '      </div>'
	        + '   </div>';
        $('.add-remove').append(str);
    })

    $('.remove-post').click(function(){
        $('.add-remove').children().last().remove();
    })
    
    
    //添加 show
    $('#addBut').click(function(){
    	loadCostclass();
    	//清空数据
    	$('#appmainForm [name="financeAppmainId"]').val("");
    	$('#appmainForm [name="financeAppmainName"]').val("");
    	$('#appmainForm [name="costclassIds"]').val("");
    	$('#appmainForm [name="costclassIds"]').selectpicker('refresh');
    	$('#appmainForm [name="rightDutyName"]').val("");
    	$('#appmainForm [name="rightDuty"]').val("");
    	$('#appmainForm .add-remove').html("");
    	$('.flow-redact').modal('show');
    })
    
    //编辑 show
     $('#appmainTable').on('click',' .edit',function(){
    	 var _this=$(this);
    	 var typee=$(this).attr("typee");
    	 if(typee!=1){
    		 return ;
    	 }
    	 $(this).attr("typee","0");
    	 
    	 $.post(ctx + "/bizFinance/loadUseCostClass",{
    		 financeAppmainId:$(_this).attr('value'),
    		},function(data){
    			if(data.status=='success'){
    				var str='';
    				$.each(data.data,function(index,option){
    					str+='<option value="'+option.financeCostclassId+'">'+option.costclassName+'</option>';
    				})
    				$(".flow-redact [name='costclassIds']").html(str);
    				$(".flow-redact [name='costclassIds']").selectpicker('refresh');
    				
    				
    				 $.post(ctx + "/bizFinance/findAppmain",{
    			     		financeAppmainId:$(_this).attr('value'),
    			     	},function(data){
    			     		if(data.status=='success'){
    			     			$('.flow-redact').modal('show');
    			     			var bizFinanceAppmain=data.data;
    			     			if (bizFinanceAppmain == null) {
    			     				loadCostclass();
    			     		    	//清空数据
    			     		    	$('#appmainForm [name="financeAppmainId"]').val("");
    			     		    	$('#appmainForm [name="financeAppmainName"]').val("");
    			     		    	$('#appmainForm [name="costclassIds"]').val("");
    			     		    	$('#appmainForm [name="costclassIds"]').selectpicker('refresh');
    			     		    	$('#appmainForm [name="rightDutyName"]').val("");
    			     		    	$('#appmainForm [name="rightDuty"]').val("");
    			     		    	$('#appmainForm .add-remove').html("");
    			     		    	$('.flow-redact').modal('show');
									return
								}
    			     			$('#appmainForm [name="financeAppmainId"]').val(bizFinanceAppmain.financeAppmainId);
    			     			$('#appmainForm [name="financeAppmainName"]').val(bizFinanceAppmain.financeAppmainName);
    			     			var costclassIds=[];
    			     			if(bizFinanceAppmain.bizFinanceCostclasses!=null){
    			     				$.each(bizFinanceAppmain.bizFinanceCostclasses,function(index,obj){
    			     					costclassIds.push(obj.financeCostclassId);
    			     				});
    			     			};
    			     			$('#appmainForm [name="costclassIds"]').val(costclassIds);
    			     			$('#appmainForm [name="costclassIds"]').selectpicker('refresh');
    			     			$('#appmainForm [name="rightDutyName"]').val(bizFinanceAppmain.rightDutyName);
    			     			$('#appmainForm [name="rightDuty"]').val(bizFinanceAppmain.rightDuty);
    			     			var str='';
    			     			if(bizFinanceAppmain.bizFinanceApprovings!=null){
    			     				$.each(bizFinanceAppmain.bizFinanceApprovings,function(index,obj){
    			     					str += '<div class="form-group approval-duty col-sm-12">'
    			     				        + '       <label class="control-label col-sm-2 no-padding-right remarkText">审批职位</label>'
    			     				        + '      <div class="col-sm-10">'
    			     				        + '          <input readonly name="dutyNames" value="'+obj.dutysName+'" onclick="showApproveDutys(this);"  class="form-control"/>'
    			     				        + '          <input name="dutyIds" value="'+obj.dutys+'" type="hidden" />'
    			     				        + '      </div>'
    			     				        + '   </div>';
    			     				});
    			     			};
    			     			$('#appmainForm .add-remove').html(str);
    			     			
    			     		}else{
    			     			swal('',"加载数据失败",'error');
    			     		}
    			     		$(_this).attr("typee","1");
    			     	},"json");
    				
    				
    				
    				
    			}else{
    				swal('',"加载费用类别出错",'error');
    			}
    			$(_this).attr("typee","1");
    		},"json")
     })
     
  //状态切换
    $('#appmainTable').on('click',' .stastus-btn',function(){
    	var _this=$(this);
        if($(this).hasClass('btn-use')){
        	$(this).attr('disabled','disabled');
        	$.post(ctx+"/bizFinance/updateTypeRecordAppmain",{
        		financeAppmainId:$(_this).attr('value'),
        		enable:'0'
        	},function(data){
        		if(data.status=='success'){
        			$(_this).removeClass('btn-use').addClass('btn-nouse').html('<i class="fa fa-ban"></i>禁用');
        		}else{
        			swal('',"禁用失败",'error');
        		}
        		$(_this).removeAttr('disabled');
        	},"json");
        }else{
        	$(this).attr('disabled','disabled');
        	$.post(ctx+"/bizFinance/updateRecordAppmain",{
        		financeAppmainId:$(_this).attr('value'),
        		enable:'1'
        	},function(data){
        		if(data.status=='success'){
        			$(_this).removeClass('btn-nouse').addClass('btn-use').html('<i class="fa fa-check-circle-o"></i>启用');
        		}else{
        			swal('',"启用失败",'error');
        		}
        		$(_this).removeAttr('disabled');
        	},"json");
        }
    })
})
//初始化左侧列表
function initPayeeClass(pId) {
    $.ajax({
        type: "POST",
        url: ctx + "/bizFinance/loadCostClass",
        dataType: 'json',
        data: {parentId: pId},
        success: function (data) {
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str = str + '<li>'
                    + '   <a href="#" onclick="appendPayee(\'' + data[i].financeCostclassId + '\',this)" class="menu-dropdown">'
                    + '   <span class="menu-text">' + data[i].costclassName + '</span>'
                        //+'   <i class="fa pull-right fa-plus-square-o"></i>'
                    + '<input type="hidden" value="' + data[i].financeCostclassId + '" class="parentId" name="parentId">'
                    + '<input type="hidden" value="' + data[i].fullPath + '" class="fullPath" name="fullPath">'
                    + '<input type="hidden" value="' + data[i].type + '" class="type" name="type">'
                    + '<input type="hidden" value="' + data[i].financeCostclassId + '" class="financeCostclassId" name="financeCostclassId">'
                    + ' </a><ul class="submenu"></ul></li>';
                $('#liuchengMenu').html(str);
            }
        }
    });
}
//加载左侧子集
function appendPayee(pId, e) {
    $.ajax({
        type: "POST",
        url: ctx + "/bizFinance/loadCostClass",
        dataType: 'json',
        data: {parentId: pId},
        success: function (data) {
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str = str + '<li>'
                    + '   <a href="#" onclick="appendPayee(\'' + data[i].financeCostclassId + '\',this)" class="menu-dropdown">'
                    + '   <span class="menu-text">' + data[i].costclassName + '</span>'
                        //+'   <i class="fa pull-right fa-plus-square-o"></i>'
                    + '<input type="hidden" value="' + data[i].financeCostclassId + '" class="parentId" name="parentId">'
                    + '<input type="hidden" value="' + data[i].fullPath + '" class="fullPath" name="fullPath">'
                    + '<input type="hidden" value="' + data[i].type + '" class="type" name="type">'
                    + '<input type="hidden" value="' + data[i].financeCostclassId + '" class="financeCostclassId" name="financeCostclassId">'
                    + ' </a><ul class="submenu"></ul></li>';
                $(e).parent().children("ul").html(str);
            }
        }
    });
}

//新增审批职位
var addNum = 0;
function addDiv() {
    var str = '<div class="form-group approval-duty">'
        + '       <label class="control-label col-sm-2 no-padding-right">审批职位</label>'
        + '		  <i class="fa fa-minus-square-o costClasses-btn" onclick="removeDiv(this)"></i>'
        + '      <div class="col-sm-8">'
        + '          <input readonly name="dutyNames" onclick="showApproveDutys(this);"  class="form-control"/>'
        + '          <input name="dutyIds" type="hidden" />'
        + '      </div>'
        + '   </div>';
    $('#editAppend').append(str);
    addNum++;
}
//删除审批职位
function removeDiv(e) {
    $(e).parent().remove();
}

$(function () {
    $.ajax({
        type: "post",
        url: ctx + "/user/ajaxLoadMaterTree",
        dataType: "json",
        success: function (data) {
            $.fn.zTree.init($("#applyDuty"), applyDutySetting, data);
            $.fn.zTree.init($("#approvalDuty"), approvalDutySetting, data);
        }
    });
})

var applyDutySetting = {
    check: {
        enable: true,
        chkboxType: {"Y": "", "N": ""}
    },
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onCheck: onCheck
    }
}
//点击申请职位树
function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("applyDuty"),
        nodes = zTree.getCheckedNodes(true),
        v = "";

    rightIds = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
        rightIds += nodes[i].id + ",";
    }
    if (v.length > 0) {
        v = v.substring(0, v.length - 1);
        rightIds = rightIds.substring(0, rightIds.length - 1);
    }
    var rigtDutyObj = $("#editRightDuty");
    rigtDutyObj.val(v);
    $('#editRightDutyMin').val(rightIds);
}

var approvalDutySetting = {
    check: {
        enable: true,
        chkStyle: "radio",
        radioType: "all"
    },
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClickApproveDuty,
        onCheck: onCheckApproveDuty
    }
};

function onClickApproveDuty(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("approvalDuty");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheckApproveDuty(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("approvalDuty"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    dutyId = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
        dutyId += nodes[i].id + ",";
    }
    if (v.length > 0) {
        v = v.substring(0, v.length - 1);
        dutyId = dutyId.substring(0, dutyId.length - 1);
    }
    var cityObj = $(approveDutyInput);
    cityObj.attr("value", v);
    cityObj.siblings('input').val(dutyId);
}

/** 弹出申请职位树 begin **/
function showApplyDutys() {

    var treeObj = $.fn.zTree.getZTreeObj("applyDuty");
    treeObj.checkAllNodes(false);
    var applyDutys = $('#editRightDutyMin').val();
    var applyDutysArray = [];
    if (applyDutys)
        applyDutysArray = applyDutys.split(',');

    for (var i = 0; i < applyDutysArray.length; ++i) {
        var node = treeObj.getNodeByParam("id", applyDutysArray[i], null);
        treeObj.checkNode(node, true, true);
    }

    var cityObj = $("#editRightDuty");
    var cityOffset = $("#editRightDuty").offset();

    $("#content1").css({width: cityObj.outerWidth(), top: cityObj.outerHeight() + "px"}).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    if (!($(event.target).parents("#content1").length > 0)) {
        hideMenu();
    }
}

function hideMenu() {
    $("#content1").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
/** 弹出申请职位树 end **/

/** 弹出审批职位树 begin **/
var approveDutyInput;
function showApproveDutys(t) {
    approveDutyInput = t;

    var aprroveDutys = $(t).siblings('input[name="dutys"]').val();

    var aprroveDutysArray = [];
    if (aprroveDutys)
        aprroveDutysArray = aprroveDutys.split(',');

    var treeObj = $.fn.zTree.getZTreeObj("approvalDuty");
    treeObj.checkAllNodes(false);

    for (var i = 0; i < aprroveDutysArray.length; i++) {
        var node = treeObj.getNodeByParam("id", aprroveDutysArray[i], null);
        treeObj.checkNode(node, true, true);
    }

    var dutyObj = $(t);
    var dutyOffset = $(t).offset();

    $("#content2").css({
        width: dutyObj.outerWidth(),
        left: dutyOffset.left + "px",
        top: dutyOffset.top + dutyObj.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown2);
}
function onBodyDown2(event) {
    if (!($(event.target).parents("#content2").length > 0)) {
        hideMenu2();
    }
}
function hideMenu2() {
    $("#content2").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown2);
}
/** 弹出审批职位树 end **/

//回车搜索
function search() {
    if (event.keyCode == 13) {
        init();
    }
}

//加载未使用过的费用类别
function loadCostclass(){
	$("#addBut").attr("disabled","disabled");
	$("#appmainTable").find("a .edit").attr("typee","0");
	$.post(ctx + "/bizFinance/loadUseCostClass",{
		
	},function(data){
		if(data.status=='success'){
			var str='';
			$.each(data.data,function(index,option){
				str+='<option value="'+option.financeCostclassId+'">'+option.costclassName+'</option>';
			})
			$(".flow-redact [name='costclassIds']").html(str);
			$(".flow-redact [name='costclassIds']").selectpicker('refresh');
			$("#addBut").removeAttr("disabled");
			$("#appmainTable").find("a .edit").attr("typee","1");
		}else{
			swal('',"加载费用类别出错",'error');
		}
	},"json")
}

//添加、修改审批流程
function addAppmain(){
	var _this=this;
	$(this).attr("disabled","disabled");
	var id=$('#appmainForm [name="financeAppmainId"]').val();
	var jsonData=$("#appmainForm").serialize();
	var url;
	if(id==null || id ==''){
		url='/bizFinance/addNewRecordAppmain';
	}else{
		url='/bizFinance/updateRecordAppmain';
	}
	if($('#appmainForm [name="financeAppmainName"]').val()==""){
		swal('','流程名称不能为空','error');
		return;
	}
	$.ajax({
        type: "POST",
        url: ctx+url,
        data:jsonData,
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		$(_this).removeAttr("disabled");
        		swal('',data.msg,'success');
        		$('.flow-redact').modal('hide');
        		initAppmainTable();
        	}else{
        		$(_this).removeAttr("disabled");
        		swal('',data.msg,'error');
        	}
        },
        error: function (msg) {
            toastr.error("系统错误");
        }
    });
}


/**
 * 初始化
 * @returns
 */
function initAppmainTable() {
    var init = $('#appmainTable').dataTable({
    	"bAutoWidth": false,
        "bFilter": false,
        "iDisplayLength": 10,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": false,
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/bizFinance/loadAppmain',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataAppmainTable,
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            $('td:eq(1)', nRow).html(iDisplayIndex+1);
            return nRow;
        },
        "aoColumns": [
            {"mDataProp": "chack",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='<label>'
			            +'    <input type="checkbox"/>'
			            +'    <span class="text"></span>'
			            +'</label> ';
            	return str;
            }},
            {"mDataProp": "bmcode",'sClass': "text-center"},
            {"mDataProp": "financeAppmainName",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span typee="1" class="btn btn-xs btn-use stastus-btn " value="'+full['financeAppmainId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span typee="1" class="btn btn-xs btn-nouse stastus-btn" value="'+full['financeAppmainId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a typee="1" class="edit" value="'+full['financeAppmainId']+'"> <i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i> </a>';
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#appmainTable_wrapper").removeClass();
    $('#appmainTable_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#appmainTable_wrapper .dataTables_info').parent().append($('#appmainTable_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataAppmainTable(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "financeAppmainName", "value":$("#financeAppmainName").val()});
    aoData.push({"name": "enable", "value":$("#enable").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
           
        }
    });
};

