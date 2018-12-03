//加载表单
var DataTable = function () {
    return {
        init: function () {
            var dutyTable = $('#rpCategory').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/rewardPunishSort/load',
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
                	{
                		"mData": "type", 
                		"sClass": "text-center",
                		"bSortable": false,
                		"mRender": function(data, type, full){
                			if (data == 1) {
								return "奖";
							} else if (data == 2){
								return "罚";
							}
                		}
                	},
                    {"mData": "sortName", 'sClass': "text-center"},
                    {
                        "mData": "rewardPunishSortId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                           var u = '<a onclick="edit(\'' + full["rewardPunishSortId"] + '\',\'' + full["sortName"] +'\',\'' + full["type"]  + '\',\'' + full["code"]
                           		 + '\')" class="edit"> <i class="fa fa-edit blue"'+
								 + 'data-placement="top" data-original-title="编辑" title="编辑"'
								 + 'data-toggle="modal" data-target=".redact"></i>'
								 + '</a> <a onclick="del(\'' + full["rewardPunishSortId"] + '\')" class="delete"> <i class="fa fa-trash-o red"'
								 + 'data-placement="top" data-original-title="删除" title="删除"></i></a>';
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
            $('#rpCategory_wrapper .dataTables_info').parent().append($('#rpCategory_wrapper .dataTables_length'));
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
// 新增按钮
$('#addBtn-sort').on('click',function(){
	if ($('#type1').val() == null || $('#type1').val() == '') {
		toastr.error('奖罚种类不能为空');
		return;
	}
	if ($('#sortName1').val() == null || $('#sortName1').val() == '') {
		toastr.error('类别不能为空');
		return;
	}
	$.ajax({
		"url": ctx + '/rewardPunishSort/add',
        "data": $('#sortForm').serialize(),
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
        	if (response.status == 'success') {
        		$('#sortName1').val('');
        		$('#type1').val('');
				swal("","新增成功","success");
				$('#addModel').modal('hide');
				DataTable.init();
			} else {
				sweetAlert("哎呦……", "出错了！","error");
			}
        }
	})
})
$('.chosen-select').chosen();
// 编辑
function edit(rewardPunishSortId,sortName,type,code){
	$('#rewardPunishSortId').val('');
	$('#sortName').val('');
	$('#editModel [name="type"]').val('');
	$('#editModel [name="code"]').val('');
	$('#editModel').modal('show');
	$('#rewardPunishSortId').val(rewardPunishSortId);
	$('#sortName').val(sortName);
	$('#type').val(type);
	$('#code').val(code != 'undefined'?code:'');
//	$('#type').chosen();
}

//编辑按钮
$('#editBtn-sort').on('click',function(){
	if ($('#type').val() == null || $('#type').val() == '') {
		toastr.error('奖罚种类不能为空');
		return;
	}
	if ($('#sortName').val() == null || $('#sortName').val() == '') {
		toastr.error('类别不能为空');
		return;
	}
	$.ajax({
		"url": ctx + '/rewardPunishSort/update',
        "data": $('#editForm').serialize(),
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
        	if (response.status == 'success') {
        		$('#rewardPunishSortId').val('');
        		$('#sortName').val('');
        		$('#type').val('');
				swal("","修改成功","success");
				$('#editModel').modal('hide');
				DataTable.init();
			} else {
				sweetAlert("哎呦……", "出错了！","error");
			}
        }
	})
})
// 删除
function del(rewardPunishSortId){
	$.ajax({
		"url": ctx + '/rewardPunishSort/update',
        "data": {
        	rewardPunishSortId:rewardPunishSortId,
        	deleteMark : 0,
        	enable : 0
        },
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
        	if (response.status == 'success') {
				swal("","删除成功","success");
				DataTable.init();
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

