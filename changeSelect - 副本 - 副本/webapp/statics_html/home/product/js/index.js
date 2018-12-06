
//加载表单
var DataTable = function () {
    return {
        init: function () {
            var dutyTable = $('#product').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/product/load',
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
                    {"mData": "productModelName", 'sClass': "text-center"},
                    {"mData": "departmentName", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
		            	if(data==2){
		          		  return '<span style="width: inherit" id="span'+full["productId"]+'" onclick="editEnable(\''+full["productId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
		          	  }else{
		          		  return '<span style="width: inherit" id="span'+full["productId"]+'" onclick="editEnable(\''+full["productId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
		          	  }
		            }},
                    {
                        "mData": "productId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["productId"]
                                + '\')" class="edit" data-target=".productEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
                                + '<a onclick="view(\'' + full["productId"] + '\')" class="view" data-target=".productView" data-toggle="modal" data-backdrop="static"> <i class="fa fa-search warning"  data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
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
            $('#product_wrapper .dataTables_info').parent().append($('#product_wrapper .dataTables_length'));
        }
    }
}();

//数据初始化
$("#product tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#product tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();
//鼠标点击搜索事件
$(".search-btn").click(function () {
	DataTable.init();
})
//回车搜索
function search(event) {
	// 兼容Firefox浏览器回车事件
	event = event||window.event;
    if (event.keyCode == 13 || event.which == 13) {
        DataTable.init();
    }	
}

// 查看
function view(productId){
	$('#product').on('click','.view',function(){
		location.href=ctx+'/product/view?productId='+productId;
	})
}
// 编辑
function edit(productId){
	$('#product').on('click','.edit',function(){
		location.href=ctx+'/product/edit?productId='+productId;
	})
}

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    var productModelId = $('#productModelId').val();
    var enable = $('#enable').val();
    aoData.push({"name": "searchVal", "value": searchVal});
    aoData.push({"name": "productModelId","value": productModelId});
    aoData.push({"name": "enable","value": enable});

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
//编辑状态
function editEnable(val, productId) {
	var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 2;
    }
    $.ajax({
        url: ctx + '/product/updateRecord',
        type: 'POST',
        data: {
        	productId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
// 产品模型
$.ajax({
    url: ctx + '/product/selectProductModel',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        var zxkc = "";
        for (var i = 0; i < data.length; i++) {
            zxkc += "<option value=" + data[i].modelId + ">" + data[i].modelName + "</option>";
        }
        $("#productModelId").html('<option value="">--请选择产品模型--</option>' + zxkc);
        $('#productModelId').trigger('chosen:updated');
        $("#productModelId").chosen({no_results_text: "没有匹配项", search_contains: true});
        $('.chosen-container').width('100%');
    },
    error: function (response) {
        toastr.error("系统错误5");
    }
});

