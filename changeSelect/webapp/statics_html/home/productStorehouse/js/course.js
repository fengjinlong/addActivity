//新增
$('.addBtn').click(function(){
	$('#subjectAdd').bootstrapValidator('resetForm');
	$('#subjectAdd')[0].reset();
})
$('#subjectAdd').bootstrapValidator({
//	fields: {  
//        fullName: {  
//        message: 'The fullname is not valid',  
//        validators: {  
//            notEmpty: {  
//            message: '全称不能为空'  
//            }  
//        }  
//        }
//    },
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        $.ajax({
            "type": "Post",
            "url": ctx + "/course/addRecord",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".subjectAdd").modal("hide");
                DataTable.init();
                if(data.status=="success") {
                		toastr.success(data.msg);
                } else {
                		toastr.error(data.msg);
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
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                "sAjaxSource": ctx + '/course/findTable/'+$("#tableName").val(),
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
                    {"mData": "name", 'sClass': "text-center"},
                    {
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                        	$("#name").val(full["name"]);//用来记录页面主要名称的英文字段名
                        	var u = '<a onclick="edit(\'' + full["id"]
                    	    + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["id"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u+"|"+d ;
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
    //传递页面名称对应字段英文名
    var name = $($(".subjectAdd input.fullName")[0]).prop("name");//后台获取的列信息有一定的规律，即第一个字段必须是主键名和id值，第二个字段必须是页面名称列和值
    aoData.push({"name": "name","value":name});
//    debugger;
    //传递需要模糊搜索的值
    aoData.push({"name": "condition","value": "'"+searchVal+"'"});


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
function edit(idValue) {
	//后台编辑提交修改是也需要这个,必须加"'"因为后台sql接受参数用的是${}
	 $('#subjectEdit input[name="idValue"]').val("'"+idValue+"'");
	 //根据tableName,idName,idValue,查出该条记录,显示在表单中
	 $.ajax({
         "type": "Post",
         "url": ctx + "/course/findOneRecord",
         "dataType": "json",
         "data": {"tableName":$("#tableName").val(), "idName": $("#id").val(), "idValue":"'"+idValue+"'"},
         "success": function (data) {
        	 for(var i=0; i<data.length; i++) {
        		 //回显数据,根据页面上编辑部分的input的name属性匹配对应的值
        		 $('#subjectEdit input[name="'+data[i].columnName+'"]').val(data[i].columnValue);
        	 }
         }
     });
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var options = form.serialize(); 
        $.ajax({
            "type": "Post",
            "url": ctx + "/course/updateRecord",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                if(data.status=="success") {
                	toastr.success("编辑成功");
                } else {
                	toastr.error("编辑失败");
                }
                $('#subjectEdit .editBtn').removeAttr('disabled');
            }
        });

    }
});
//删除
function deleteProject(id) {
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
            "url": ctx + "/course/deleteRecord",
            "dataType": "json",
            "data": {"tableName":$("#tableName").val(), "idName": $("#id").val(), "idValue":"'"+id+"'"},
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                if(data.status=="success") {
                	swal("", "删除成功！", "success");
                } else {
                	swal("", "删除失败！", "error");
                }
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

