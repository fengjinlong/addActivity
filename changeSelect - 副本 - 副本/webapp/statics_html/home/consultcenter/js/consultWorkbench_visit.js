//上门tab 处理------------------------------

/**
 * 初始上门
 * 
 * @returns
 */
function init4() {
	var init = $('#table44')
			.dataTable(
					{
						"bAutoWidth" : false,
						"bFilter" : false,
						"bPaginate" : true,
						"bSort" : true, // 是否支持排序功能
						"bLengthChange" : true,
						"oLanguage" : {
							"sLengthMenu" : "每页显示 _MENU_ 条记录",
							"sZeroRecords" : "抱歉， 没有找到",
							"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
							"sInfoEmpty" : "",
							"sInfoFiltered" : "",
							"oPaginate" : {
								"sFirst" : "首页",
								"sPrevious" : "前一页",
								"sNext" : "后一页",
								"sLast" : "尾页"
							},
							"sProcessing" : ""
						},
						"sAjaxSource" : ctx + '/consultVisit/load',
						"bDestroy" : true,
						"bRetrieve" : false,
						"bServerSide" : true,
						"fnServerData" : initData4,
						"aoColumns" : [
								{
									"mDataProp" : "serverId",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "serverDate",
									'sClass' : "text-center",
									"mRender" : function(data, type, full) {
										if (full["serverDate"] == null
												|| full["serverDate"] == "") {
											return "";
										}
										var timestamp = new Date(
												full["serverDate"]);
										return timestamp.toLocaleString();
									}
								},
								{
									"mDataProp" : "departmentName1",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "schoolName",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "studentName",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "productName",
									"bSortable" : false,
									'sClass' : "text-center",
									"mRender" : function(data, type, full) {
										if (data == '--请选择--') {
											return '----';
										} else {
											return data;
										}
									}
								},
//							   {
//									"mDataProp" : "classAttr",
//									"bSortable" : false,
//									'sClass' : "text-center",
//									"mRender" : function(data, type, full) {
//										if (data == '--请选择--') {
//											return '----';
//										} else {
//											return data;
//										}
//									}
//								},
								{
									"mDataProp" : "classPrice",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "counselor",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "reciveName",
									"bSortable" : false,
									'sClass' : "text-center"
								},
								{
									"mDataProp" : "",
									"bSortable" : false,
									'sClass' : "text-center",
									"mRender" : function(data, type, full) {
										var u1 = '<a href="#" data-record=\''
												+ JSON.stringify(full)
												+ '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a>'
										var u2 = '<a href="#" data-record=\''
												+ JSON.stringify(full)
												+ '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
										var u3 = '<a href="#" data-record=\''
												+ JSON.stringify(full)
												+ '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a></a>'
										return u1 + u2 + u3;
									}
								} ],
						"aoColumnDefs" : [ {
							sDefaultContent : '',
							aTargets : [ '_all' ]
						} ]
					});
	$("#table44_wrapper").removeClass();
	$('#table44_wrapper').addClass("table-scrollable");

	// 每页显示记录数
	$('#table44_wrapper .dataTables_info').parent().append(
			$('#table44_wrapper .dataTables_length'));
	HScrollBar('#table44_wrapper');
}

init4();

/**
 * 回调函数上门
 * 
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData4(sSource, aoData, fnCallback, oSettings) {
	/**
	 * 参数添加
	 */
	aoData.push({
		"name" : "pageNum",
		"value" : (Math.ceil(oSettings._iDisplayStart
				/ oSettings._iDisplayLength) + 1)
	});
	aoData.push({
		"name" : "pageSize",
		"value" : oSettings._iDisplayLength
	});
	 //高级搜索条件
	aoData.push({
		"name" : "studentPhone",
		"value" : $.trim($('#phoneCall3').val())
	});
	aoData.push({
		"name" : "studentName",
		"value" : $.trim($('#fullName3').val())
	});
	aoData.push({"name": "productId", "value": $('#product3').val()});
	aoData.push({"name": "departmentId1", "value": $('#campus3').val()});
	aoData.push({
		"name" : "beginTime",
		"value" : $("#reservation3").val().split("到") == '' ? "" : $(
				"#reservation3").val().split("到")[0]
				+ " 00:00:00"
	});
	aoData.push({
		"name" : "endTime",
		"value" : $("#reservation3").val().split("到") == '' ? "" : $(
				"#reservation3").val().split("到")[1]
				+ " 23:59:59"
	});
	//课程信息级别-0,顶级;1,子产品课程信息 (只有报名状态时是查询所有，其它状态都是只查询第一个课程信息)
    aoData.push({"name": "pimLevel", "value":0});
    //并且只查询课程信息有效的
    aoData.push({"name": "enable", "value":1});
    
	var sort = '';
	if (oSettings.aaSorting != null) {
		var oa = oSettings.aaSorting;
		var sortNum = '';
		for (var o = 0; o < oa.length; o++) {
			sortNum = oa[0][0];
			if (sortNum != '0') {
				sort = sort + oSettings.aoColumns[oa[0][0]].mData + " "
						+ oa[0][1] + ',';
			}
		}
	}
	sort = sort.substring(0, sort.length - 1);
	if (sort != '') {
		aoData.push({
			"name" : "sort",
			"value" : sort
		});
	}

	aoData.push({
		"name" : "status",
		"value" : 5
	});
	aoData.push({
		"name" : "typeFrom",
		"value" : infoDisType
	});
	aoData.push({
		"name" : "departmentId2",
		"value" : infoDisDep
	});
	aoData.push({
		"name" : "searchVal",
		"value" : $("#searchVal4").val()
	});
	
	//得到页面显示记录数-(新版任务提醒)
    $.ajax({
    	"type": "Post",
    	"url": ctx + '/consultInfoManage/loadRemind',
    	"dataType": "json",
    	"data": aoData,
    	"success": function (data) {
			$("#taskRemind").html("");//清空任务提醒
			if(data.status=="success") {
				var str = "";
				for (var i = 0; i < data.data.length; i++) {
					if(data.data[i].status=="7") {
						str = '<li class="order-item">'
							+ '<a data-value=\''+JSON.stringify(data.data[i])+'\' href="javascript:void(0);" onclick="taskRemind(this)" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga">'
							+ data.data[i].dataTime+" "+data.data[i].studentName+" "+"报名"
						    + '</a>'
							+ '</li>';
						$("#taskRemind").append(str);
					} else {
						str = '<li class="order-item">'
							+ '<a data-value=\''+JSON.stringify(data.data[i])+'\' href="javascript:void(0);" onclick="taskRemind(this)" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1">'
							+ data.data[i].dataTime+" "+data.data[i].studentName+" ";
						if(data.data[i].status=="3") {
							str += '已沟通';
						} else if(data.data[i].status=="4") {
							str += '转预约';
						} else if(data.data[i].status=="5") {
							str += '上门';
						} else if(data.data[i].status=="6") {
							str += '订座';
						} 
						str += '</a>'
							+ '</li>';
//						str = '<li class="order-item">'
//							+ '<a data-value=\''+JSON.stringify(data.data[i])+'\' href="javascript:void(0);" onclick="taskRemind(this)" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1">任务提醒'+(i+1)+'</a>'
//							+ '</li>'
						$("#taskRemind").append(str);
					}
	    		}
			}
			
    	}
    });
	
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			$('span[id=spanSM]').text(resp.returnObject.iTotalRecords);
			fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}

$('#table44').on(
		'click',
		'.call-info',
		function() {
			$('#updateInfoManage2').find(".comment_disabled").attr({
				"disabled" : true
			})
			$("#appendPayBody").html("");//清空缴费内容
			 $("#dingzuoI").val(null);//将订座费缴费栏清空
			$('#callInfo').html('');
			var record = $(this).data('record');
			$.ajax({
				url : ctx + '/consultInfoManageServer/loadRecordContent',
				type : 'POST',
				data : {
					infoManageId : record.infoManageId
				},
				dataType : 'json',
				success : function(data) {
					if (data) {
						if (data.drop) {
							var dropContent = data.drop;
							for (var i = 0; i < dropContent.length; i++) {
								$('#callInfo').append(
										'<tr>' + '<td>'
												+ dropContent[i].content
												+ '</td>' + '</tr>');
							}
						}
					}
				}
			});
})

/**
 * 上门tab操作
 */
$('#table44').on('click', '.ck,.call-out', function() {
	 $('#secondDivCity').fadeOut();//如果之前有编辑所在地弹框没有关闭，此时关闭
	var record = $(this).data('record');
    $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true});
    $('#updateInfoManage2').find(".comment_disabled").css('border-color', '#e5e5e5');//还原禁止编辑背景色

    //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
    $("#appendPayBody").html("");//清空缴费内容
    $("#dingzuoI").val(null);//将订座费缴费栏清空
    //清空课程信息
    $(".project").find("select").each(function(i,e){
    	$(e).val('');
    	$(e).trigger('chosen:updated');
    });
    publicJsonModel(record);
    
    //得到组合产品子产品id，后面回显时会用到
    var childProductId = record.childProductId;
     
    if(childProductId!=null&&childProductId!='') {
    	$("#childProductIdHidden").val(childProductId);
    }
    //根据productID，查询product信息获得productForm-产品类型
    $.ajax({
		url : ctx + '/consultConsoleWFC/getProductInfo',//查询当前咨询量关联产品的详细信息
		type : 'post',
		dataType : 'json',
		data : {productId: record.productId},
		success : function(data){
			 //产品(班型)信息回显
		   	$("#productId").html('<option showList="" value="">--请选择--</option>'+"<option showList='" +JSON.stringify(data)+ "' value='"+record.productId+"' selected>"+record.productName+"</option>");
		  //加载下拉框样式-必须有否则页面上该下拉框会出现一些bug
			$("#productId").trigger('chosen:updated');
			$("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
			$('.chosen-container').width('100%');
		   	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
		   	$("#productId").addClass("init");
		  //class=init,考期列表第一次初始化回显标志，只有第一次查看时考期的option需要做回显
		   	$("#kTime").addClass("init");
			//公共弹出框中课程信息回显（包括产品模型信息回显等)
		   	loadGT_YYD(record);
		}
    });
})


