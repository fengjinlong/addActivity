//新增
$('.addBtn').click(function(){
	$('#subjectAdd').bootstrapValidator('resetForm');
})
$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        $.ajax({
            "type": "Post",
            "url": ctx + "/productModel/addRecord",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".subjectAdd").modal("hide");
                $('#subjectAdd')[0].reset();
                DataTable.init();
                toastr.success("新增成功");
            }
        });

    }
});
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 2;
    }
    $.ajax({
        url: ctx + '/productModel/updateRecord',
        type: 'POST',
        data: {
        	productTypeId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
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
                "sAjaxSource": ctx + '/productModel/load',
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
                    {"mData": "productTypeName", 'sClass': "text-center"},
                    {"mData": "spaceType", "bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
                        if(data == 1){
                          return "基本信息";
                        }else if(data == 2){
                          return "条件";
                        }else if(data == 3){
                          return "服务项";
                        }else if(data == 4){
                          return "价格";
                        }else if(data == 5){
                          return "提醒项";
                        }
                      }},
                     {"mData": "isMenu", "bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
                          if(data == 1){
                            return "是";
                          }else if(data == 2){
                            return '否';
                          }
                       }},
                    {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
		            	if(data==2){
		          		  return '<span style="width: inherit" id="span'+full["productTypeId"]+'" onclick="chooseStudent(\''+full["productTypeId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
		          	  }else{
		          		  return '<span style="width: inherit" id="span'+full["productTypeId"]+'" onclick="chooseStudent(\''+full["productTypeId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
		          	  }
		            }},
                    {
                        "mData": "productTypeId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["productTypeId"]
                                + '\',\'' + inCode(full["productTypeName"])+ '\',\'' + full["spaceType"]+ '\',\'' + full["isMenu"]
                                + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            return u;
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

    aoData.push({"name": "productTypeName", "value": searchVal});
    aoData.push({"name": "spaceType", "value": $('#spaceTypeSearch').val()});

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
function edit(productTypeId, productTypeName, spaceType, isMenu) {
    $('#productTypeName').val(outCode(productTypeName));
    $('#productTypeId').val(productTypeId);
    $('#spaceType').val(spaceType);
    $('#isMenu').val(isMenu);
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var productTypeId = $('#productTypeId').val();
        var productTypeName = $('#productTypeName').val();
        var spaceType = $('#spaceType').val();
        var isMenu = $('#isMenu').val();
        $.ajax({
            "type": "Post",
            "url": ctx + "/productModel/updateRecord",
            "dataType": "json",
            "data": {
            	productTypeId: productTypeId, 
            	productTypeName: productTypeName,
            	spaceType : spaceType,
            	isMenu : isMenu
            },
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
function deleteProject(productTypeId) {
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
            "url": ctx + "/productModel/updateRecord",
            "dataType": "json",
            "data": {productTypeId: productTypeId, enable: 2},
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






