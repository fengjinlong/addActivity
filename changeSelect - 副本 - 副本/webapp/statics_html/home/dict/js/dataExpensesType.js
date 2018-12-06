$(document).ready(function(){
	$('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    });	
	loadDataExpensesDetail();
});
//初始化电话归属地（省）
function loadDataExpensesDetail(){
	$.ajax({
	    url: ctx + '/dataExpensesDetail/getAll',
	    type: 'POST',
	    dataType: 'json',
	    success: function (data) {
	        var sheng = "";
	        for (var i = 0; i < data.list.length; i++) {
	            sheng += "<option value=" + data.list[i].dataExpensesDetailId + ">" + data.list[i].dataExpensesDetailName + "</option>";
	        }
	        $('select[name=dataExpensesDetailId]').html(sheng);
	        $('.selectpicker').selectpicker('refresh');
	    },
	    error: function (response) {
	        toastr.error("系统错误");
	    }
	});
}

//新增
$('.addBtn').click(function(){
	loadDataExpensesDetail();
	$('#subjectAdd').bootstrapValidator('resetForm');
	$('#subjectAdd .expensesTypeName').val('');
	$('#subjectAdd #expensesType').val('1');
	$('#subjectAdd #expensesProtocol').val('');
	$('.selectpicker').selectpicker('val', new Array());//默认选中
	$('.selectpicker').selectpicker('refresh');
	$('div .dropdown-menu open').attr('ss',"ss");
})
$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        var dataExpensesDetailId = $('#dataExpensesDetailId').val();
        var expensesTypeName = $('#subjectAdd').find('input[name=expensesTypeName]').val();
        var expensesTypeCode = $('#subjectAdd').find('input[name=expensesTypeCode]').val();
        if(expensesTypeName.trim()==''){
        		toastr.error("名称不能为空");
        		return;
        }
        /*if(expensesTypeCode.trim()==''){
	    		toastr.error("编码不能为空");
	    		return;
	    }*/
        if(dataExpensesDetailId==null){
	    		toastr.error("协议不能为空");
	    		return;
	    }
        $(".subjectAdd").modal("hide");
        $.ajax({
            "type": "Post",
            "url": ctx + "/dataExpensesType/addRecord",
            "dataType": "json",
            "data": options,
            "success": function (data) {
            	if(data.status=='success'){
            		 DataTable.init();
                     toastr.success("新增成功");
            	}else{
            		 toastr.success("新增失败");
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
                "sAjaxSource": ctx + '/dataExpensesType/load',
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
                    {"mData": "expensesTypeName", 'sClass': "text-center"},
                    {
                        "mData": "expensesTypeId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["expensesTypeId"]
                                + '\',\'' + inCode(full["expensesTypeName"])
                            	+ '\',\'' + full["expensesType"]
                            	+ '\',\'' + full["type"]
                            	+ '\',\'' + full["expensesProtocol"]
                            	+ '\',\'' + full["searchVal"]
                            + '\',\'' + full["expensesTypeCode"]
                                + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["expensesTypeId"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u + d;
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


function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    
    aoData.push({"name": "searchVal", "value": searchVal});
    /*aoData.push({"name": "expensesType", "value": $('#expensesType').val()});*/

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
function edit(expensesTypeId, expensesTypeName,expensesType,type,expensesProtocol,dataExpensesDetailId,code) {
	//loadDataExpensesDetail();
    $('#expensesTypeName').val(outCode(expensesTypeName));
    $('#expensesTypeId').val(expensesTypeId);
    $('#subjectEdit #expensesType').val(expensesType);
    $('#subjectEdit #type').val(type);
    $('#subjectEdit #expensesProtocol').val(expensesProtocol);
    $('#subjectEdit .expensesTypeCode').val(code);
    var str;
    $.post( ctx + "/dataExpensesType/getDetailId",{dataExpensesTypeId:expensesTypeId},function(data){
    	if(data.status=='success'){
    		str=data.data.split(',');
    		var oldnumber = new Array();
    	    $.each(str, function (i) {
    	            oldnumber.push(str[i]);
    	    });
    	    $('.selectpicker').selectpicker('val', oldnumber);//默认选中
    	    $('.selectpicker').selectpicker('refresh');
    	}
    },"json");
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    		var options = form.serialize();
        var expensesTypeId = $('#expensesTypeId').val();
        var expensesTypeName = $('#expensesTypeName').val();
        var expensesType = $('#subjectEdit #expensesType').val();
        var type = $('#subjectEdit #type').val();
        var expensesProtocol = $('#expensesProtocol').val();
        var expensesTypeCode = $('#subjectEdit').find('input[name=expensesTypeCode]').val();
        if(expensesTypeName.trim()==''){
	    		toastr.error("名称不能为空");
	    		return;
	    }
	   /* if(expensesTypeCode.trim()==''){
	    		toastr.error("编码不能为空");
	    		return;
	    }*/
       
        $.ajax({
            "type": "Post",
            "url": ctx + "/dataExpensesType/updateRecord",
            "dataType": "json",
            //"data": {expensesTypeId: expensesTypeId, expensesTypeName: expensesTypeName, expensesType:expensesType, expensesProtocol:expensesProtocol,expensesTypeCode:expensesTypeCode},
            "data":options,
            "success": function (data) {
            	if(data.status=='success'){
            		$(".subjectEdit").modal("hide");
                    DataTable.init();
                    toastr.success("修改成功");
            	}else{
            		toastr.success("修改失败");
            	}
                $('#subjectEdit .editBtn').removeAttr('disabled');
            }
        });

    }
});
//删除
function deleteProject(expensesTypeId) {
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
            "url": ctx + "/dataExpensesType/updateRecord",
            "dataType": "json",
            "data": {expensesTypeId: expensesTypeId, enable: 0},
            "success": function (data) {
                if(data.status=='success'){
                	DataTable.init();
                    swal("", "删除成功！", "success");
                }else{
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






