//加载表单
var DataTable = function() {
	return {
		init : function() {
			var dutyTable = $('#serviceConfig')
					.dataTable(
							{
								"bPaginate" : true, // 是否显示分页
								"bLengthChange" : true,// 每页显示的记录数
								"bFilter" : false, // 搜索栏
								"bSort" : true, // 是否支持排序功能
								"bInfo" : true, // 显示表格信息
								"bAutoWidth" : false, // 自适应宽度
								"bStateSave" : true, // 保存状态到cookie
														// *************** 很重要 ，
														// 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
								// "sPaginationType": "",
								// //分页，一共两种样式，full_numbers和two_button(默认)
								"sAjaxSource" : ctx + '/serviceAllocate/load',
								"fnServerData" : retrieveData,// 用于替换默认发到服务端的请求操作
								"bServerSide" : true,
								"bDestroy" : true,
								"bRetrieve" : false,
								"oLanguage" : {
									"sLengthMenu" : "每页显示 _MENU_ 条记录",
									"sZeroRecords" : "抱歉， 没有找到",
									"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
									"sInfoEmpty" : "找不到相关数据",
									"sInfoFiltered" : "数据表总共为 _MAX_ 条记录)",
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
											"mData" : "xh",
											'sClass' : "text-center"
										},
										{
											"mData" : "productServiceName",
											'sClass' : "text-center"
										},
										{
											"mData" : "serviceType",
											'sClass' : "text-center",
											"bSortable" : false,
											"mRender" : function(data, type,
													full) {
												if (data == 1) {
													return "标签服务";
												} else if (data == 2) {
													return "业务服务";
												}
											}
										},
										{
											"mData" : "enable",
											'sClass' : "text-center",
											"bSortable" : false,
											"mRender" : function(data, type,
													full) {
												if (data == 1) {
													return '<span onclick="editEnable(\''
															+ full["productServiceId"] + '\',\'' + full["enable"]
															+ '\')" class="btn btn-xs btn-use"> <i class="fa fa-check-circle-o"></i>启用</span>';
												} else {
													return '<span onclick="editEnable(\''
															+ full["productServiceId"] + '\',\'' + full["enable"]
															+ '\')" class="btn btn-xs btn-nouse"> <i class="fa fa-ban"></i>禁用</span>';
												}
											}
										},
										{
											"mData" : "productServiceId",
											'sClass' : "text-center",
											"bSortable" : false,
											"mRender" : function(data, type,
													full) {
												var u = '<a onclick="view(\''
														+ full["productServiceId"]
														+ '\')" class="view">'
														+ '<i class="fa fa-search warning" data-placement="top" '
														+ 'data-original-title="查看" data-toggle="modal" data-target=".chakan" title="查看"></i>'
														+'<a onclick="edit(\'' + full["productServiceId"] + '\',\'' 
														+ full["serviceType"] +'\',\'' + inCode(full["productServiceName"]) 
						                           		+ '\')" class="edit"> <i class="fa fa-edit blue"'+
														+ 'data-placement="top" data-original-title="编辑" title="编辑"'
														+ 'data-toggle="modal" data-target=".redact"></i>'
														+ '</a>';
												return u;
											}
										} ],
								"aoColumnDefs" : [ {
									sDefaultContent : '',
									aTargets : [ '_all' ]
								} ],
								"fnRowCallback" : function(nRow, aData,
										iDisplayIndex) {
									jQuery("td:first", nRow).html(
											iDisplayIndex + 1);
									return nRow;
								}
							});
			// 每页显示记录数
			$('#serviceConfig_wrapper .dataTables_info').parent().append(
					$('#serviceConfig_wrapper .dataTables_length'));
		}
	}
}();

// 数据初始化
$("#productStrategy tbody").html(
		"<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#productStrategy tbody>tr>td").mLoading({
	text : '正在加载中，请稍后......',
	icon : "../statics_html/common/image/loading5.gif"
});
DataTable.init();
// 鼠标点击搜索事件
$(".search-btn").click(function() {
	DataTable.init();
})
// 回车搜索
function search(event) {
	// 兼容Firefox浏览器回车事件
	event = event || window.event;
	if (event.keyCode == 13 || event.which == 13) {
		DataTable.init();
	}
}

// 查看
function view(productServiceId) {
	$.ajax({
		"url" : ctx + '/serviceAllocate/queryOne',
		"data" : {
			productServiceId : productServiceId
		},
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			if (response.status == 'success') {
				$('.describe-title').html(response.data.productServiceName);
				var type;
				if (response.data.serviceType == 1) {
					type = '【标签类服务】';
				} else if (response.data.serviceType == 2){
					type = '【业务类服务】';
				} else {
					type = '【其他类服务】';
				}
				$('.describe-genre').html(type);
				$('.describe-text').html(response.data.productServiceDetail);
				
			} else {
				sweetAlert("哎呦……", "出错了！", "error");
			}
		}
	})
}

// 状态编辑
function editEnable(productServiceId,enable){
	var flag ;
	if (enable == 1) {
		flag = 0;
	}
	if (enable == 0) {
		flag = 1;
	}
	$.ajax({
		"url" : ctx + '/serviceAllocate/update',
		"data" : {
			"productServiceId" : productServiceId,
			"enable" : flag
		},
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			if (response.status != 'success') {
				sweetAlert("哎呦……", "出错了！", "error");
			}
			DataTable.init();
		}
	})
}
// 新增确定
$('#addModel').on('click','#addBtn',function (){
	var productServiceName = $('#addModel input[name="productServiceName"]').val();
	var serviceType = $('#addModel select[name="serviceType"').val();
	var productServiceDetail = $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html();
	if (productServiceName == null || productServiceName == '') {
		toastr.error('服务名称不能为空');
		return ;
	}
	if (serviceType == null || serviceType == '') {
		toastr.error('服务类型不能为空');
		return ;
	}
	$.ajax({
		"url" : ctx + '/serviceAllocate/add',
		"data" : {
			"serviceType" : serviceType,
			"productServiceName" : productServiceName,
			"productServiceDetail" : productServiceDetail
		},
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			if (response.status == 'success') {
				sweetAlert("新增", "新增成功！", "success");
				// 清除表单信息
				$('#addForm')[0].reset();
				$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html('');
				$('#addModel').modal('hide');
				DataTable.init();
			} else {
				sweetAlert("哎呦……", "出错了！", "error");
			}
		}
	})
})

// 编辑弹窗
function edit(productServiceId, serviceType, productServiceName){
	var productServiceDetail;
	$.ajax({
		"url" : ctx + '/serviceAllocate/queryOne',
		"async" : false,
		"data" : {
			productServiceId : productServiceId
		},
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			if (response.status == 'success') {
				productServiceDetail = response.data.productServiceDetail;
			} else {
				sweetAlert("哎呦……", "出错了！", "error");
			}
		}
	})
	$('#productServiceId').val(productServiceId);
	$('#editModel').modal('show');
	$('#editModel input[name="productServiceName"]').val(outCode(productServiceName));
	$('#editModel select[name="serviceType"]').val(serviceType);
	$(document.getElementsByTagName('iframe')[1].contentWindow.document.body).html(productServiceDetail);
}

// 编辑确定
$('#editModel').on('click','#editBtn',function editButton(){
	var productServiceId = $('#editModel input[name="productServiceId"]').val();
	var productServiceName = $('#editModel input[name="productServiceName"]').val();
	var productServiceDetail = $(document.getElementsByTagName('iframe')[1].contentWindow.document.body).html();
	$.ajax({
		"url" : ctx + '/serviceAllocate/update',
		"data" : {
			"productServiceId" : productServiceId,
			"productServiceName" : productServiceName,
			"productServiceDetail" : productServiceDetail
		},
		"dataType" : 'json',
		"type" : "POST",
		"success" : function(response) {
			if (response.status == 'success') {
				sweetAlert("修改", "修改成功！", "success");
				$('#editModel').modal('hide');
				DataTable.init();
			} else {
				sweetAlert("哎呦……", "出错了！", "error");
			}
		}
	})
})

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
