// table初始化
var InitiateSimpleDataTable = function() {
	return {
		init : function() {
			// Datatable Initiating
			var oTable = $('#myTable')
					.dataTable(
							{
								"bPaginate": true,  //是否显示分页
				                "bLengthChange": true,//每页显示的记录数
				                "bFilter": false, //搜索栏
				                "bSort": true, //是否支持排序功能
				                "bInfo": true, //显示表格信息
				                "bAutoWidth": false,  //自适应宽度
				                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
				                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
				                "sAjaxSource": ctx + '/sysAnnouncement/loadAnnounce',
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
								"aoColumns" : [
										{
											"mDataProp" : "createDate",
											"bSortable" : false,
											'sClass' : "text-center",
											"mRender" : function(data, type,
													full) {
												return full['createDate'];
												/*
												 * return
												 * jsDateFormat(full['createDate']);
												 */
											}
										},
										{
											"mDataProp" : "createUserName",
											"bSortable" : true,
											'sClass' : "text-center"
										},
										{
											"mDataProp" : "theme",
											"bSortable" : true,
											'sClass' : "text-center"
										},
										{
											"mDataProp" : "institutionId",
											"bSortable" : false,
											'sClass' : "text-center",
											"mRender" : function(data, type,
													full) {
												var str = '';
												str += '<a class="edit popup" typee="1" value="'
														+ full['flagUnique']
														+ '">'
														+ '<i class="fa fa-edit blue" data-toggle="tooltip" '
														+ ' data-placement="top" data-original-title="编辑" '
														+ 'title="编辑"></i>'
														+ '</a>'
														+ '<a href="#" class="delete" typee="1" value="'
														+ full['flagUnique']
														+ '">'
														+ ' <i class="fa fa-trash-o danger" data-toggle="tooltip" '
														+ '  data-placement="top" data-original-title="删除" '
														+ '  title="删除"></i>'
														+ '</a>';
												return str;
											}
										}, ],
								"aoColumnDefs" : [ {
									sDefaultContent : '',
									aTargets : [ '_all' ]
								} ],

							});
			 //每页显示记录数
            $('#myTable_wrapper .dataTables_info').parent().append($('#myTable_wrapper .dataTables_length'));
		}

	};

}();
var editor;
loadDepartment();

// 多选框
$(document).on('change', 'input:checkbox.master', function() {
	if ($(this).prop('checked')) {
		$('input:checkbox.slaver').prop('checked', 'checked');
	} else {
		$('input:checkbox.slaver').prop('checked', '');
	}
})

/* 数据初始化 */
$("#myTable tbody").html(
		"<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#myTable tbody>tr>td").mLoading({
	text : '正在加载中，请稍后......',
	icon : "../statics_html/common/image/loading5.gif"
});
InitiateSimpleDataTable.init();

function retrieveData(sSource, aoData, fnCallback, oSettings) {

	aoData.push({
		"name" : "pageNum",
		"value" : (Math.ceil(oSettings._iDisplayStart
				/ oSettings._iDisplayLength) + 1)
	});
	aoData.push({
		"name" : "pageSize",
		"value" : oSettings._iDisplayLength
	});
	aoData.push({
		"name" : "searchVal",
		"value" : $('#theme').val()
	});
	
	$.ajax({
		"url" : sSource,
		"data" : aoData,
		"cache" : false,
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			fnCallback(response.returnObject);
			$('[data-toggle="tooltip"]').tooltip()
		}
	});
}
// 弹窗展示
$(document).on('click','#add',function(){
	$('#myModel').modal('show');
	$('#myModel').attr('status','add');
	$('#addForm')[0].reset();
	$('#addForm').find('select').val('');
	$('#myModel').find('select[name="department"]').attr('disabled',false);
	$('#addForm').find('select.selectpicker').selectpicker('refresh');
	$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html('');
})
$('#myTable').on('click','.popup',function(){
	$('#myModel').modal('show');
	$('#myModel').attr('status','edit');
	$('#myModel').find('select[name="department"]').attr('disabled',true);
	$('#addForm')[0].reset();
	$('#addForm').find('select').val('');
	$('#addForm').find('select.selectpicker').selectpicker('refresh');
	$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html('');
	var flagUnique = $(this).attr('value');
	$.ajax({
			url : ctx + '/sysAnnouncement/queryOneByFlag',
			data : {
				'flagUnique' : flagUnique
			},
			dataType : 'json',
			type : 'post',
			success : function(info) {
				if (info.status != "success") {
					swal('', "加载失败", 'error');
				} else {
					$('#addForm input[name="flagUnique"]').val(
							info.data.flagUnique);
					$('#addForm input[name="theme"]').val(info.data.theme);
					$('#addForm [name="department"]').val(
							info.data.departmentId.split(","));
					$('#addForm').find("[name='department']").selectpicker(
							'refresh');
					$('#addForm [name="type"]').val(info.data.type);
					editor.html(info.data.content);
					$('#myModel').modal('show');
				}
			},
			error : function() {
				toastr.error("系统错误");
			}
		});

})

// 新增或编辑 确定
function addOrUpdateRecord() {
	var url = '';
	var status = $('#myModel').attr('status');
	if (status == 'add') {
		url = ctx + '/sysAnnouncement/addInform';
	} else {
		url = ctx + '/sysAnnouncement/updateAnnounce'
	}
	$('#addForm').find('textarea[name="content"]').val(editor.html());
	$.ajax({
		url : url,
		data : $('#addForm').serialize(),
		dataType : 'json',
		type : 'post',
		success : function(data) {
			if (data.status != "success") {
				swal('', data.msg, 'error');
			} else {
				swal('', data.msg, 'success');
				$('#myModel').modal('hide');
				InitiateSimpleDataTable.init();
			}
		},
		error : function() {
			toastr.error("系统错误");
		}
	});

	return false;
}

// 废除
$('#myTable').on('click', 'a.delete', function() {
	var _this = this;
	var typee = $(this).attr("typee");
	if (typee != 1) {
		return;
	}
	$(this).attr("typee", "0");
	var flagUnique = $(this).attr('value');
	swal({ 
		  title: "确定删除吗？", 
		  text: "删除后你将无法恢复该公告！", 
		  type: "warning",
		  showCancelButton: true, 
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "确定", 
		  cancelButtonText: "取消",
		  closeOnConfirm: false
		},
		function(){
			$.ajax({
				url : ctx + '/sysAnnouncement/updateAnnounce',
				data : {
					flagUnique : flagUnique
				},
				dataType : 'json',
				type : 'post',
				success : function(data) {
					$(_this).attr("typee", "1");
					if (data.status != "success") {
						swal('', "删除失败", 'error');
					} else {
						swal('删除！', "删除成功", 'success');
						InitiateSimpleDataTable.init();
					}
				},
				error : function() {
					$(_this).attr("typee", "1");
					toastr.error("系统错误");
				}
			});
		  swal("删除！", "你的虚拟文件已经被删除。", "success"); 
		});
	
});
// 回车搜索
function search() {
	if (event.keyCode == 13) {
		InitiateSimpleDataTable.init();
	}
}
$('.selectpicker').selectpicker({
    'liveSearch': true,
    'liveSearchPlaceholder': '请输入关键字',
    'actionsBox': true,
    'selectAllText': '全选',
    'deselectAllText': '取消',
    'noneSelectedText': ''
});
// 加载部门option
function loadDepartment() {
	$('#myTable').find("a.edit").attr("typee", "0");
	$('#add').attr("typee", "0")
	$.post(ctx + '/department/getAllOption', {}, function(data) {
		if (data.status == 'success') {
			var str = '';
			$.each(data.list, function(index, option) {
				str += '<option value="' + option.departmentId + '">'
						+ option.fullName + '</option>';
			})
			$('#addForm').find("[name='department']").html(str);
			$('#addForm').find("[name='department']").selectpicker({
				'liveSearch': true,
			    'liveSearchPlaceholder': '请输入关键字',
			    'actionsBox': true,
			    'selectAllText': '全选',
			    'deselectAllText': '取消',
			    'noneSelectedText': ''
			});
			$('#myTable').find("a.edit").attr("typee", "1");
			$('#add').attr("typee", "1")
		} else {
			swal('', "加载失败", 'error');
		}
	}, "json")
}
