$(function () {
    //状态按钮切换
    $('table').on('click', '.status-btn', function () {
        if ($(this).is('.btn-use')) {
            $(this).removeClass('btn-use').addClass('btn-nouse').html('<i class="fa fa-ban"></i> 禁用');
        } else {
            $(this).removeClass('btn-nouse').addClass('btn-use').html('<i class="fa fa-check-square-o"></i> 启用');
        }
    })
    
    //全选
    $('#brandSetting thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#brandSetting tbody .checkchild').prop('checked', true);
        }else{
            $('#brandSetting tbody .checkchild').prop('checked', false);
        }
    })

    //编辑
    $('#brandSetting tbody').on('click', '.edit', function () {

        var tds = $(this).parent().siblings();
        //品牌
        var brand = tds.eq(3).text().trim();

        tds.eq(0).html('');
        tds.eq(1).html(tds.eq(1).text());
        tds.eq(2).html(tds.eq(2).text());
        tds.eq(3).html('<input type="text" name="brandName" class="input-sm form-control brandName" value="' + tds.eq(3).text().trim() + '">');

        //按钮切换
        $(this).removeClass('edit').addClass('save');
        $(this).html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
        $(this).next().removeClass('delete').addClass('cancel');
        $(this).next().html('<i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
        $('[data-toggle="tooltip"]').tooltip();

        //保存
        $('#brandSetting tbody').on('click', '.save', function () {
            var tds = $(this).parent().siblings();
            var brandId = tds.eq(1).text();
            var brandName = $('.brandName').val();
            $.ajax({
                url: ctx + '/bizBrand/updateRecord',
                type: 'POST',
                data: {
                    brandId: brandId,
                    brandName: brandName
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

            $(this).removeClass('save').addClass('edit');
            $(this).html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $(this).next().removeClass('cancel').addClass('delete');
            $(this).next().html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        })

        //取消
        $('#brandSetting tbody').on('click', '.cancel', function () {

            tds.eq(0).html('<label><input type="checkbox"><span class="text"></span></label>');
            tds.eq(3).html(brand);

            //按钮切换
            $(this).removeClass('cancel').addClass('delete');
            $(this).html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save').addClass('edit');
            $(this).prev().html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
        })
    })

    //删除
    $('#brandSetting tbody').on('click', '.delete', function () {
        var tds = $(this).parent().siblings();
        var brandId = tds.eq(1).text();
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
                url: ctx + '/bizBrand/updateRecord',
                type: 'POST',
                data: {
                    brandId: brandId,
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
    })
    
    $('.increase').click(function(){
            $('#brandAdd')[0].reset();
            $('#brandAdd').data('bootstrapValidator').resetForm();
    });
})

//新增品牌
$('#brandAdd').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
        brand: {
            validators: {
                notEmpty: {
                    message: '金额不能为空'
                }
            }
        },
    },
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        $.ajax({
            type: "POST",
            url: ctx + '/bizBrand/addRecord',
            data: options,
            dataType: 'json',
            success: function (data) {
                DataTable.init();
                $('.brandAdd').modal('hide');
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
});

//品牌初始化数据
var DataTable = function () {
    return {
        init: function () {
            var Table = $('#brandSetting').dataTable({
            	"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
                "sAjaxSource": ctx + '/bizBrand/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
        			"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
        		},
                "aoColumns": [
                    {
                        "mData": "brandId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
                        }
                    },
                    {"mData": "brandId", 'sClass': "hiddenCol"},
                    {"mData": "brandCode", 'sClass': "text-center"},
                    {"mData": "brandName", 'sClass': "text-center"},
                    {
                        "mData": "enable",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 0) {
                                return '<span id="span' + full["brandId"] + '" onclick="chooseStudent(\'' + full["brandId"] + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
                            } else {
                                return '<span id="span' + full["brandId"] + '" onclick="chooseStudent(\'' + full["brandId"] + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
                            }
                        }
                    },
                    {
                        "mData": "brandId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a href="#" class="edit" ' + (full.enable == 0 ? "disabled" : "") + '><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a href="#" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u + d;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            })
        }
    }
}();

//数据初始化
$("#brandSetting tbody").html("<tr><td height='300' colspan='5' class='text-center'></td></tr>");
$("#brandSetting tbody>tr>td").mLoading({
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

//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizBrand/updateRecord',
        type: 'POST',
        data: {
            brandId: val,
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
//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}


$('.brandSetting-warp #brandSetting_wrapper').on('click','.dataTables_paginate .pagination li a',function(){
	
	$('.checkAll').attr('checked',false);
})