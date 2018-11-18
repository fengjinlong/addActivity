$(function(){
//下拉框多选
	$('.selectModule').selectpicker({
		'liveSearch': true,
		'liveSearchPlaceholder': '请输入关键字',
		'actionsBox': true,
		'selectAllText': '全选',
		'deselectAllText': '取消',
		'noneSelectedText': '没有匹配项'
	})
})

$('.addBtn').click(function(){
	//清空数据
	$('#subjectAdd').bootstrapValidator('resetForm');
	$('#subjectAdd .productLessonPlanUnitName').val('');
	$('#subjectAdd .enable').val(1);
	addEditor.html('');
	addEditor.sync();
});

//新增提交
$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
       addEditor.sync();
    	//得到表单的参数
       var options = form.serialize();
       // debugger;
        $.ajax({
            "type": "Post",
            "url": ctx + '/productLessonPlanUnit/addLessonPlanUnit',
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
                "sAjaxSource": ctx + '/productLessonPlanUnit/load',
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
                    {"mData": "productLessonPlanUnitName", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center","mRender": function (data, type, full) {
                    	var y = '<span style="width: inherit" class="btn btn-xs btn-use" onclick="changeStatus(this,\'' + full["productLessonPlanUnitId"]
                            	+ '\')"><i class="fa fa-check-circle-o"></i> 启用</span>';
                    	var n = '<span style="width: inherit" class="btn btn-xs btn-nouse" onclick="changeStatus(this,\'' + full["productLessonPlanUnitId"]
                            	+ '\')"><i class="fa fa-ban"></i> 禁用</span>';
                    	return full["enable"]=='1'? y : n ;
                    	}
                    },
                    {
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["productLessonPlanUnitId"]
                            	+ '\',\'' + inCode(full["productLessonPlanUnitName"])
                            	+ '\',\'' + full["enable"]
                            	+ '\',\'' + inCode(full["description"])
                        	    + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["productLessonPlanUnitId"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
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
    
    aoData.push({"name": "searchVal", "value": searchVal});


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
function edit(productLessonPlanUnitId,productLessonPlanUnitName,enable,description) {
	 $('#editProductLessonPlanUnit').val(productLessonPlanUnitId);//单元id
	 $('#subjectEdit .productLessonPlanUnitName').val(outCode(productLessonPlanUnitName));//单元名称
	 $('#subjectEdit .enable').val(enable);//状态回显
	 editEditor.html(outCode(description));//说明回显
	 editEditor.sync();
	 
	 //取消确定按钮的失效状态
	 $('#subjectEdit button[type="submit"]').prop("disabled",false);
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	 var productLessonPlanUnitId = $('#editProductLessonPlanUnit').val();//单环id
    	 var productLessonPlanUnitName = $('#subjectEdit .productLessonPlanUnitName').val();//单元名称
    	 var enable = $('#subjectEdit .enable').val();//状态
    	 editEditor.sync();
    	 var description = editEditor.html();
    	 $.ajax({
             "type": "Post",
             "url": ctx + "/productLessonPlanUnit/updateLessonPlanUnit",
             "dataType": "json",
             "data": {"productLessonPlanUnitId":productLessonPlanUnitId,"productLessonPlanUnitName":productLessonPlanUnitName,
             	"enable":enable, "description":description},
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
function deleteProject(productLessonPlanUnitId) {
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
            "url": ctx + "/productLessonPlanUnit/deleteLessonPlanUnit",
            "dataType": "json",
            "data": {"productLessonPlanUnitId": productLessonPlanUnitId},
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
 
//点击增加一行供编辑
$("#addModule").click(function(){
	var addStr = '<tr class="removeRecord"><td><div class="col-sm-12">'
			   + '<input type="text" class="form-control unitName" name="unitList[0].productLessonPlanUnitName" />'
			   + '</div></td><td>'
			   + '<div class="col-sm-12">'
			   + '<select class="form-control selectModule moduleIds" multiple data-live-search="true" name="unitList[0].moduleIds"/>'
			   + '</div></td><td>'
			   + '<div class="col-sm-12">'
			   + '<input type="button" onclick="removeRecord(this)" value="-"/>'
			   + '</div></td></tr>';
	$("#addRecord").find("tbody").append(addStr);
	//从页面的隐藏域中获取productID
	var productId = $("#selectProductId").val();
	//初始化新增的下拉框的option
	var str = '';
	$.ajax({
        "type": "Post",
        "url": ctx + "/productLessonPlanUnit/findModuleByProductId",
        "dataType": "json",
        "data":{"productId":productId},
        "success": function (data) {
        	var length = $('.selectModule').size();
        	
        	if(data.length > 0){
        	   	for(var i=0; i<data.length; i++) {
            		str += '<option value="'+data[i].productLessonPlanModuleId+'">'+data[i].productLessonPlanModuleName+'</option>';
            	}
        	   	$($('.selectModule')[length-1]).html(str);
        		//$('#selectModule').html(str);
            }
        	//$('.selectModule').selectpicker('refresh');
        	$($('.selectModule')[length-1]).selectpicker('refresh');
        }
    });
	//新增一行记录之后,初始化一次下拉框多选功能
	$('.selectModule').each(function(){
		$(this).selectpicker({
			'liveSearch': true,
			'liveSearchPlaceholder': '请输入关键字',
			'actionsBox': true,
			'selectAllText': '全选',
			'deselectAllText': '取消',
			'noneSelectedText': '没有匹配项'
		})
	})
});

//点击去除一行记录
function removeRecord(obj) {
	$(obj).parents(".removeRecord").remove();
}

//单击改变数据状态
function changeStatus(obj,productLessonPlanUnitId) {
	var enable = 0;//记录要传递给后台修改的状态值,1-有效 0-无效
	//判断当前按钮所处状态
	if($(obj).hasClass("btn-use")) {
		//使该数据失效
		$(obj).removeClass("btn-use");
		$(obj).addClass("btn-nouse");
		$(obj).html('<i class="fa fa-ban"></i> 禁用');
	} else {
		//使该数据生效
		$(obj).removeClass("btn-nouse");
		$(obj).addClass("btn-use");
		$(obj).html('<i class="fa fa-check-circle-o"></i> 启用');
		enable = 1;
	}
	
	$.ajax({
        type:"post",
        url:ctx+"/productLessonPlanUnit/updateStatus",
        data: {enable:enable,productLessonPlanUnitId:productLessonPlanUnitId},
		dataType : "json",
		success : function(date) {
		}
	});
}



