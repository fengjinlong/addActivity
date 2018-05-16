// 加载表单
var DataTable = function() {
	return {
		init : function() {
			var dutyTable = $('#installmentTable')
					.dataTable(
							{
								"bPaginate" : true, // 是否显示分页
								"bLengthChange" : true,// 每页显示的记录数
								"bFilter" : false, // 搜索栏
								"bSort" : false, // 是否支持排序功能
								"bInfo" : true, // 显示表格信息
								"bAutoWidth" : false, // 自适应宽度
								"bStateSave" : false, // 保存状态到cookie
								// ***************
								// 很重要 ，
								// 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
								// "sPaginationType": "",
								// //分页，一共两种样式，full_numbers和two_button(默认)
								"sAjaxSource" : ctx + '/installment/load',
								"fnServerData" : retrieveData,// 用于替换默认发到服务端的请求操作
								"bServerSide" : true,
								"bDestroy" : true,
								"bRetrieve" : false,
								"oLanguage" : {
									"sLengthMenu" : "每页显示 _MENU_ 条记录",
									"sZeroRecords" : "抱歉， 没有找到",
									"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
									"sInfoEmpty" : "找不到相关数据",
									"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
									"sProcessing" : "正在加载中...",
									"sSearch" : "搜索",
									"oPaginate" : {
										"sFirst" : "首页",
										"sPrevious" : "前一页",
										"sNext" : "后一页",
										"sLast" : "尾页"
									},
								},
								"aoColumns" : [
										{
											"mData" : "bankName",
											'sClass' : "text-center"
										},
										{
											"mData" : "installmentSortName",
											'sClass' : "text-center"
										},
										{
											"mData" : "installmentRatio",
											'sClass' : "text-center"
										},
										{
											"mData" : "installmentRatioId",
											'sClass' : "text-center",
											"bSortable" : false,
											"mRender" : function(data, type,
													full) {
												var u = '<a onclick="edit(\''
														+ full["installmentRatioId"]
														+ '\',\''
														+ full["installmentBankId"]
														+ '\',\''
														+ full["installmentSortId"]
														+ '\',\''
														+ full["installmentRatio"]
														+ '\')" class="edit" data-target=".popup" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
												var d = '<a onclick="deleteInstallment(\''
														+ full["installmentRatioId"]
														+ '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
												return u + d;
											}
										}

								],
								"aoColumnDefs" : [ {
									sDefaultContent : '',
									aTargets : [ '_all' ]
								} ],
								"fnRowCallback" : function(nRow, aData,
										iDisplayIndex) {
								}
							});

			// 每页显示记录数
			$('#installmentTable_wrapper .dataTables_info').parent().append(
					$('#installmentTable_wrapper .dataTables_length'));
		}
	}
}();

// 数据初始化
$("#installmentTable tbody").html(
		"<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#installmentTable tbody>tr>td").mLoading({
	text : '正在加载中，请稍后......',
	icon : "../statics_html/common/image/loading5.gif"
});
DataTable.init();

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
	var searchVal = $('#searchVal').val();

	aoData.push({
		"name" : "searchVal",
		"value" : searchVal
	});

	$.ajax({
		"url" : sSource,
		"data" : aoData,
		"cache" : false,
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			fnCallback(response.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}
//Modal验证销毁重构
$('.popup').on('hidden.bs.modal', function() {
	$('#popupform').data('bootstrapValidator').resetForm();
});
// 新增弹窗
$('.addPopup').on('click', function() {
	$('.popup-title').text('新增');
	$('#popupform').find('select').val('');
	$('#installmentRatioId').val('');
	$('#popupform input[name="installmentRatio"]').val('');
	$('.chosen-select').trigger('chosen:updated');
	$('.chosen-select').chosen();
})
// 编辑弹窗
function edit(installmentRatioId, installmentBankId, installmentSortId,
		installmentRatio) {
	$('.popup-title').text('编辑');
	$('#installmentRatioId').val(installmentRatioId);
	$('#installmentBankId').val(installmentBankId);
	$('#installmentSortId').val(installmentSortId);
	$('#popupform input[name="installmentRatio"]').val(installmentRatio);
	$('.chosen-select').trigger('chosen:updated');
	$('.chosen-select').chosen();
}
// 表单验证以及提交
$('#popupform')
		.bootstrapValidator(
				{
//					message : 'This value is not valid',
					excluded : [ ':disabled' ],
					feedbackIcons : {
						invalid : 'glyphicon gluphicon-remove',
						validating : 'glyphicon glyohicon-refresh'
					},
					fields : {
						installmentBankId : {
							validators : {
								notEmpty : {
									message : '分期来源不能为空！'
								}
							}
						},
						installmentSortId : {
							validators : {
								notEmpty : {
									message : '分期种类不能为空！'
								}
							}
						},
						installmentRatio : {
							validators : {
								notEmpty : {
									message : '分期利率不能为空！'
								},
								regexp : {
									regexp : /(^[0]{1}$)|(^[0]{1}\.\d{1,2}$)|(^[1]{1}\.0{1,2}$)|(^[1]{1}$)/,
									message : '分期利率（范围0.00~1.00），最多保留两位小数'
								}
							}
						}
					},
					submitHandler : function(validator, form, submitButton) {
						var options = form.serialize();
						var part_url, in_ra_id = $('#installmentRatioId').val();
						if (in_ra_id != '' && in_ra_id != undefined) {
							part_url = '/installment/update';
						} else {
							part_url = '/installment/add';
						}
						$.ajax({
							"type" : "Post",
							"url" : ctx + part_url,
							"dataType" : "json",
							"data" : options,
							"success" : function(data) {
								if (data.status == 'success') {
									DataTable.init();
									$(".popup").modal("hide");
									toastr.success(data.msg);
								} else {
									toastr.error(data.msg);
								}
							}
						});
					}
				});

// 回车搜索
function search() {
	if (event.keyCode == 13) {
		DataTable.init();
	}
}
// 删除
function deleteInstallment(installmentRatioId) {
	swal({
		title : "确认删除?",
		text : "您确定要删除当前的分期付款设置信息吗？",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确认",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : false
	}, function(isConfirm) {
		if (isConfirm) {
			$.ajax({
				"url" : ctx + '/installment/update',
				"data" : {
					'installmentRatioId' : installmentRatioId,
					'enable' : '0',
					'deleteMark' : '0'
				},
				"dataType" : 'json',
				"type" : "POST",
				"success" : function(response) {
					if (response.status == 'success') {
						DataTable.init();
						swal('删除', '删除成功', 'success');
					} else {
						DataTable.init();
						swal('删除', '删除失败', 'warning');
					}
				}
			});
		} else {
			swal("删除", "已经取消删除", "error");
		}
	});

}