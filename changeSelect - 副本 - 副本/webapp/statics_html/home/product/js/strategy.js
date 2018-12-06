//加载表单
var DataTable = function () {
    return {
        init: function () {
            var dutyTable = $('#productStrategy').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/productStrategy/load',
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
                	{"mData": "productModelName", 'sClass': "text-center"},
                    {"mData": "productName", 'sClass': "text-center"},
                    {"mData": "examTime", 'sClass': "text-center"},
                    {"mData": "brochuresName", 'sClass': "text-center","bSortable": false},
                    {
                        "mData": "productExamTimeId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="view(\'' + full["productExamTimeId"] + '\')" class="view">'+
                            		'<i class="fa fa-search warning" data-placement="top" '+
                            		'data-original-title="查看" data-toggle="modal" data-target=".chakan" title="查看"></i>';
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
            $('#productStrategy_wrapper .dataTables_info').parent().append($('#productStrategy_wrapper .dataTables_length'));
        }
    }
}();

//数据初始化
$("#productStrategy tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#productStrategy tbody>tr>td").mLoading({
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
function view(productExamTimeId){
	$.ajax({
		"url": ctx + '/productStrategy/queryOne',
        "data": {productExamTimeId:productExamTimeId},
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
        	if (response.status == 'success') {
				$('.describe-title').html(response.data.brochuresName);
				$('.describe-text').html(response.data.brochuresDetail);
			} else {
				sweetAlert("哎呦……", "出错了！","error");
			}
        }
	})
}

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

