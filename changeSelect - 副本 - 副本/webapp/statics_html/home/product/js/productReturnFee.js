

//新增
$('.addBtn').click(function(){
	$('#subjectAdd')[0].reset();
	$('#subjectAdd').bootstrapValidator('resetForm');
	$('#subjectAdd .projectType').val(0);
	$('#subjectAdd .examSubjectName').val('');
	editor.html('');
})
$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var data = {
        		productReturnFeeName : $('#subjectAdd input[name="productReturnFeeName"]').val(),
        		url : editor.html(),
        }
        if(data.productReturnFeeName==""){
        	toastr.error("名称不能为空");
        	return;
        }
        $.ajax({
            "type": "Post",
            "url": ctx + "/productReturnFee/addNewRecord",
            "dataType": "json",
            "data": data,
            "success": function (data) {
                $(".subjectAdd").modal("hide");
                DataTable.init();
                toastr.success("新增成功");
            }
        });

    }
});
var description;
var descriptionUpdate;
/*KindEditor.ready(function(K) {
//	description = K.create('#description', {
//		allowFileManager : true,
//		resizeType : 0
//	});
	descriptionUpdate = K.create('#descriptionUpdate', {
		
	});
});*/
	
//加载表单
var DataTable = function () {
    return {
        init: function () {
            var dutyTable = $('#moneyKind').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/productReturnFee/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
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
                    {"mData": "productReturnFeeName", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center",
                    	"mRender": function (data, type, full) {
                    		  if (data == 0) {
                              return '<span style="width: inherit" id="span' + full["productReturnFeeId"] + '" onclick="chooseStudent(\'' + full["productReturnFeeId"] + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
                          } else {
                              return '<span style="width: inherit" id="span' + full["productReturnFeeId"] + '" onclick="chooseStudent(\'' + full["productReturnFeeId"] + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
                          }
                    }},
                    {
                        "mData": "examSubjectId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["productReturnFeeId"]
                                + '\',\'' + inCode(full["url"])
                                + '\',\'' + inCode(full["productReturnFeeName"])
                                + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
//                            var d = '<a onclick="deleteProject(\'' + full["productReturnFeeId"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u ;
                        }
                    }

                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {}
            });

            //每页显示记录数
            $('#moneyKind_wrapper .dataTables_info').parent().append($('#moneyKind_wrapper .dataTables_length'));
        }
    }
}();

function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/productReturnFee/updateRecord',
        type: 'POST',
        data: {
            productReturnFeeId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}

//数据初始化
$("#moneyKind tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#moneyKind tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();


function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    aoData.push({"name": "searchVal", "value": searchVal});
    aoData.push({"name": "enable", "value": $('#enable').val()});
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
//编辑取值
function edit(productReturnFeeId, url, productReturnFeeName) {
    $('#productReturnFeeId').val(productReturnFeeId);
    $('#productReturnFeeName').val(outCode(productReturnFeeName));
    Editor.html(outCode(url));
    Editor.sync();
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var productReturnFeeId = $('#productReturnFeeId').val();
        var productReturnFeeName = $('#productReturnFeeName').val();
        var url = Editor.html();
        Editor.sync();
        $.ajax({
            "type": "Post",
            "url": ctx + "/productReturnFee/updateRecord",
            "dataType": "json",
            "data": {productReturnFeeId: productReturnFeeId, productReturnFeeName: productReturnFeeName, url: url},
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                toastr.success("修改成功");
                $('#subjectEdit .editBtn').removeAttr('disabled');
            }
        });

    }
});
//删除
function deleteProject(productReturnFeeId) {
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
            "type": "Post",
            "url": ctx + "/productReturnFee/updateRecord",
            "dataType": "json",
            "data": {"productReturnFeeId": productReturnFeeId, "deleteMark": 0},
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                swal("", "删除成功！", "success");
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






