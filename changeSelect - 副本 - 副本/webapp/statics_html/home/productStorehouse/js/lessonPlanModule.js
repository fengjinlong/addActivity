//新增
$('.addBtn').click(function(){
	$('#subjectAdd').bootstrapValidator('resetForm');
	$('#subjectAdd .schoolRoomType').val(1);
	$('#subjectAdd .productLessonPlanModuleName').val('');
	$("#selectProduct").html("");
	$.ajax({
        "type": "Post",
        "url": ctx + "/productLessonPlanModule/findProduct",
        "dataType": "json",
        "success": function (data) {
        	for(var i=0; i<data.length; i++) {
        		var str = '<option value="'+data[i].productId+'">'+data[i].productName+'</option>';
        		$("#selectProduct").append(str);
        	}
        	//下面三行用到了select2.js插件(单选下拉框搜索功能)
    	    $("select[name='productId']").trigger('chosen:updated');
    	    $("select[name='productId']").chosen({no_results_text: "没有匹配项", search_contains: true});
    	    $('.chosen-container').width('100%');
        }
    });
})
$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        $.ajax({
            "type": "Post",
            "url": ctx + "/productLessonPlanModule/addLessonPlanModule",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".subjectAdd").modal("hide");
                DataTable.init();
                if(data.status=="success") {
                	toastr.success("新增成功");
                } else {
                	toastr.error("新增失败");
                }
            }
        });

    }
});

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
                "sAjaxSource": ctx + '/productLessonPlanModule/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表总共为 _MAX_ 条记录)",
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
                    {"mData": "productName", 'sClass': "text-center"},
                    {"mData": "productLessonPlanModuleName", 'sClass': "text-center"},
                    {
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["productLessonPlanModuleId"]
                            	+ '\',\'' + full["productId"]
	                            + '\',\'' + full["productLessonPlanModuleName"]
                        	    + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["productLessonPlanModuleId"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u+d ;
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

//数据初始化
$("#moneyKind tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#moneyKind tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();
//鼠标点击搜索事件
$(".search-btn").click(function () {
	DataTable.init();
})

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    
    aoData.push({"name": "productLessonPlanModuleName", "value": searchVal});
    aoData.push({"name": "productName", "value": searchVal});


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
function edit(productLessonPlanModuleId,productId,productLessonPlanModuleName) {
	 $('#editLessonPlanModuleId').val(productLessonPlanModuleId);
	 $('#subjectEdit .editProductLessonPlanModuleName').val(productLessonPlanModuleName);
	 $("#editProduct").html("");
	 //debugger;
	 $.ajax({
	        "type": "Post",
	        "url": ctx +  "/productLessonPlanModule/findProduct",
	        "dataType": "json",
	        "success": function (data) {
	        	for(var i=0; i<data.length; i++) {
	        		if(data[i].productId==productId) {
	        			var str = '<option value="'+data[i].productId+'" selected>'+data[i].productName+'</option>';
	        		} else {
	        			var str = '<option value="'+data[i].productId+'">'+data[i].productName+'</option>';
	        		}
	        		$("#editProduct").append(str);
	        	}
	        }
	    });
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	 var productLessonPlanModuleId = $('#editLessonPlanModuleId').val();
    	 var productLessonPlanModuleName = $('#subjectEdit .editProductLessonPlanModuleName').val();
    	 var productId = $('#subjectEdit .editProduct').val();
    	 
    	 $("#editProduct").html("");
        $.ajax({
            "type": "Post",
            "url": ctx + "/productLessonPlanModule/updateLessonPlanModule",
            "dataType": "json",
            "data": {"productLessonPlanModuleId":productLessonPlanModuleId,"productLessonPlanModuleName":productLessonPlanModuleName,
            	"productId":productId},
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
function deleteProject(productLessonPlanModuleId) {
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
            "url": ctx + "/productLessonPlanModule/deleteLessonPlanModule",
            "dataType": "json",
            "data": {"productLessonPlanModuleId": productLessonPlanModuleId},
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


