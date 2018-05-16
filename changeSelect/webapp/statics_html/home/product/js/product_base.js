/**
 * 全局变量所有分校
 */
var _allSE = new Array();
$('.selectpicker').selectpicker({
	'liveSearch' : true,
	'liveSearchPlaceholder' : '请输入关键字',
	'actionsBox' : true,
	'selectAllText' : '全选',
	'deselectAllText' : '取消',
	'width':'290px'
});
//初始化子产品
$.ajax({
	url : ctx + '/product/selectAll',
	data : {
		'productForm' : 1
	},
	dataType : 'json',
	async : false,
	type : 'post',
	success : function(data) {
		if (data.status != "success") {
			toastr.error(data.msg);
		} else {

			var str = "";
			for (var i = 0; i < data.list.length; ++i) {
				str += "<option value='" + data.list[i].productId + "'>"
						+ data.list[i].productName + "</option>";
			}
			$('#childProduct').html(str);
			$('.selectpicker').selectpicker('refresh');
		}
	},
	error : function() {
		toastr.error("系统错误");
	}
});

// 初始化分校（同步-线程安全）
$.ajax({
	url : ctx + '/product/branchSchool',
	type : 'post',
	dataType : 'json',
	async : false,
	data : {
		type : 3
	},
	success : function(info) {
		_allSE = info.list;
	},
	error : function(msg) {
		toastr.error('系统错误');
	}
})

/**
 * 定义全局变量：产品服务信息
 */
var _productServer = new Object();
$.ajax({
	url : ctx + '/product/getProductServiceInfo',
	type : 'post',
	dataType : 'json',
	async : false,
	success : function(resp) {
		if (resp.status == 'success') {
			_productServer = resp.list;
		} else {
			toastr.error(resp.msg);
		}
	},
	error : function(response) {
		toastr.error("系统错误");
	}
})

/**
 * 全局变量考期（同步-线程安全）
 */
var _allExamTime = new Array();
$.ajax({
	url : ctx + '/product/getExamTimes',
	type : 'POST',
	dataType : 'json',
	async : false,
	success : function(data) {
		_allExamTime = data.list;
	},
	error : function(msg) {
		toastr.error('系统错误');
	}
})

/**
 * 定义全局变量：费用类别和费用协议关系
 */
var _expenseUnite = new Object();
// 初始化费用类别和费用协议
$.ajax({
	url : ctx + '/product/getTypeAndProtocols',
	type : 'post',
	dataType : 'json',
	async : false,
	success : function(resp) {
		_expenseUnite = resp;
	},
	error : function(response) {
		toastr.error("系统错误");
	}
})

$('#productInfo .btn-cancel').on('click', function() {
	window.location.href = ctx + '/product/index';
})

/**
 * 产品生成后其下考试地区（分校）
 */
var _examSchool = new Array();
// 产品生成之后赋值_examSchool
function evaluatExamSchool() {
	$.ajax({
		url : ctx + '/product/examSchool',
		type : 'post',
		async : false,
		data : {
			productId : productId
		},
		dataType : 'json',
		success : function(info) {
			_examSchool = info.list;
		},
		error : function(msg) {
			toastr.error('系统错误');
		}
	})
}
/**
 * @param kind
 *            1-支出 2-收益
 * @param ser_base
 *            1-基础 2-服务
 */
function registerGuide(top, parent, tableId, kind, ser_base) {
	var index = 1;
	$(top).find(parent + ' .header').on(
			'click',
			'.operate-btn',
			function() {
				// 判断是否是编辑下状态，如果是重新赋值index
				var cnt = 0;
				$(tableId + ' tbody tr').each(function() {
					if ($(this).hasClass('parent')) {
						cnt++;
					}
				})
				index = cnt;
				// 增加行
				if ($(this).is('.fa-plus')) {
					index++;
					addPriceTr(tableId, index, kind, ser_base);
				}
				// 删除行
				var trNum = Number($(parent).find(tableId).find(
						'tbody tr[parent-tr^="parent-"]').length);
				var trLength;
				var strL = $(tableId).attr('tr-length');
				if (strL) {
					trLength = Number(strL);
				} else {
					trLength = 0;
				}
				if ($(this).is('.fa-minus') && trNum > trLength) {
					var $curRm = $(parent).find(tableId).find(
							'tbody tr[parent-tr^="parent-"]:last');
					// 删除已注入bootstrapValidator验证字段
					var $money = $curRm.nextAll().find('input[name="money"]');
					var $moneyLine = $curRm.nextAll().find('input[name="moneyLine"]');
					$(tableId).parents('form').bootstrapValidator('removeField',$money);
					$(tableId).parents('form').bootstrapValidator('removeField',$moneyLine);
					$curRm.nextAll().remove();
					$curRm.remove();
					index--;
				}
			})
}

/**
 * 新增价格tr公用方法
 * 
 * @param tableId
 * @param kind
 *            1-支出 2-收益
 * @param ser_base
 *            1-基础 2-服务
 */
function addPriceTr(tableId, index, kind, ser_base) {
	var trHtml = '<tr parent-tr = parent-'
			+ index
			+ ' class="parent '
			+ 'groupM'
			+ index
			+ '">'
			+ '<td  rowspan="1">'
			+ '    <select class="form-control selectpicker priceSchool" multiple title="--请选择--" name="schoolId">'
			+ '    </select>'
			+ '    <input type="hidden" name="groupFlag" class="groupFlag"/>'
			+ '</td>';
	if (ser_base == 2) {
		trHtml += '    <td>'
				+ '        <select class="form-control productServiceId addPrice" name="productServiceId" title="--请选择--">'
				+ '        </select>' + '    </td>';
	}
	trHtml += '<td  class="costCategory">'
			+ '    <div class="col-sm-10 no-padding">'
			+ '        <select class="form-control addPrice expenseType" name="dataExpensesTypeId">'
			+ '        </select>'
			+ '    </div>'
			+ '    <label class="control-label pull-left">'
			+ '        <a class="fa fa-plus success operate-btn"></a>'
			+ '    </label>'
			+ '</td>'
			+ '<td width="13%" class="form-group">'
			+ '    <input type="text" class="form-control addPrice validate-field"  name="money">'
			+ '</td>'
			+ '<td width="13%" class="form-group">'
			+ '    <input type="text" class="form-control addPrice"  name="moneyLine">'
			+ '</td>'
			+ '<td>'
			+ '    <label>'
			+ '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0">'
			+ '        <span class="text"></span>'
			+ '    </label>'
			+ '</td>'
			+ '<td>'
			+ '    <select class="form-control selectpicker addPrice expenseDetails" name="ded" multiple title="--请选择--">'
			+ '    </select>' + '</td>';
	if (ser_base == 2) {
		trHtml += '    <td>'
				+ '        <label>'
				+ '            <input type="checkbox" class="isRequired addPrice"'
				+ '                   name="isRequired" value="1">'
				+ '            <span class="text"></span>' + '        </label>'
				+ '    </td>';
	}
	trHtml += '<td>' + '    <label>'
			+ '        <input type="checkbox" name="enable" class="addPrice" value="0">'
			+ '        <span class="text"></span>' + '    </label>' + '</td>'
			+ '</tr>';
	$(tableId).find('tbody').append(trHtml);
	$(tableId + ' tbody tr:last .groupFlag').val(generateUUID());
	var ses = $(tableId).data('enSchool');
	var selectedSchool = [];
	if (ses != undefined) {
		selectedSchool = JSON.parse(ses);
	}
	if (ser_base == 1) {
		if (kind == 2) {
			loadPriceSchool((tableId + ' tbody tr:last .priceSchool'),
					(tableId + ' .priceSchool'), selectedSchool, kind);
		} else if (kind == 1) {
			loadPriceSchool((tableId + ' tbody tr:last .priceSchool'),
					(tableId + ' .priceSchool'), _examSchool, kind);
		}
	} else if (ser_base == 2) {
		loadPriceSchool((tableId + ' tbody tr:last .priceSchool'),
				(tableId + ' .priceSchool'), selectedSchool, kind);
		loadPServer(tableId + ' tbody tr:last .productServiceId');
	}
	var varVal = $(tableId + ' tbody tr:last').attr('class');
	var $clz = $(tableId + ' tbody .groupM' + index).find('select.expenseType');
	loadExpense(tableId + ' tbody tr:last .expenseType', $clz, kind, ser_base);
	$(tableId).find('tbody .selectpicker').selectpicker({
		'liveSearch' : true,
		'liveSearchPlaceholder' : '请输入关键字',
		'actionsBox' : true,
		'selectAllText' : '全选',
		'deselectAllText' : '取消',
		'width':'290px'
	});
	// 注入bootstrapValidator验证字段
	var $money = $(tableId + ' tbody tr:last input[name="money"]');
	var $moneyLine = $(tableId + ' tbody tr:last input[name="moneyLine"]');
	$(tableId).parents('form').bootstrapValidator('addField',$money);
	$(tableId).parents('form').bootstrapValidator('addField',$moneyLine);
}

registerGuide('.pricesEditModal', '#revenueCost', '#revenueCostTable', 2, 1);
registerGuide('.pricesEditModal', '#incurExpense', '#incurExpenseTable', 1, 1);
registerGuide('.serviceConfigModal', '#serviceConfigForm',
		'#productIncludeService', 0, 2);
// 费用种类
function costCategory(top, parent, tableId, kind, ser_base) {
	$(top)
			.find(parent + ' ' + tableId)
			.on(
					'click',
					'.operate-btn',
					function() {
						var currentTr = $(this).parent().parent().parent();
						var rowspan = Number(currentTr.find('td:eq(0)').attr(
								'rowspan'));
						var childTr = currentTr.attr('parent-tr');
						var groupM = currentTr.attr('class').replace('parent ',
								'');
						var trHtml = '<tr child-tr = ' + childTr
								+ ' class = "son ' + groupM + '">';
						if (ser_base == 2) {
							trHtml += '    <td>'
									+ '        <select class="form-control productServiceId addPrice" name="productServiceId" title="--请选择--">'
									+ '        </select>' + '    </td>';
						}
						trHtml += '<td  class="costCategory">'
								+ '    <div class="col-sm-10 no-padding">'
								+ '        <select class="form-control addPrice expenseType"  name="dataExpensesTypeId">'
								+ '        </select>'
								+ '    </div>'
								+ '    <label class="control-label pull-left">'
								+ '        <a class="fa fa-minus danger operate-btn"></a>'
								+ '    </label>'
								+ '</td>'
								+ '<td width="13%" class="form-group">'
								+ '    <input type="text" class="addPrice form-control" name="money">'
								+ '</td>'
								+ '<td width="13%" class="form-group">'
								+ '    <input type="text" class="addPrice form-control" name="moneyLine">'
								+ '</td>'
								+ '<td>'
								+ '    <label>'
								+ '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0">'
								+ '        <span class="text"></span>'
								+ '    </label>'
								+ '</td>'
								+ '<td>'
								+ '    <select class="addPrice form-control selectpicker expenseDetails" name="ded" multiple title="--请选择--">'
								+ '    </select>' + '</td>';
						if (ser_base == 2) {
							trHtml += '    <td>'
									+ '        <label>'
									+ '            <input type="checkbox" class="isRequired addPrice"'
									+ '                   name="isRequired" value="1">'
									+ '            <span class="text"></span>'
									+ '        </label>' + '    </td>';
						}
						trHtml += '<td>'
								+ '    <label>'
								+ '        <input type="checkbox" name="enable" class="addPrice" value="0">'
								+ '        <span class="text"></span>'
								+ '    </label>' + '</td>' + '</tr>';
						// 增加行
						if ($(this).is('.fa-plus')) {
							rowspan++;
							currentTr.find('td:eq(0)').attr('rowspan', rowspan);
							var sonLen = currentTr.siblings('tr[child-tr="'
									+ childTr + '"]').length;
							if (sonLen > 0) {
								currentTr.siblings(
										'tr[child-tr="' + childTr + '"]')
										.last().after(trHtml);
								var $clz = $(tableId + ' tbody .' + groupM)
										.find('select.expenseType');
								loadExpense(currentTr.siblings(
										'tr[child-tr="' + childTr + '"]')
										.last().find('select.expenseType'),
										$clz, kind, ser_base);
								if (ser_base == 2) {
									loadPServer(currentTr.siblings(
											'tr[child-tr="' + childTr + '"]')
											.last().find(
													'select.productServiceId'));
								}
								// 注入bootstrapValidator验证字段
								var $money = currentTr.siblings(
										'tr[child-tr="' + childTr + '"]')
										.last().find('input[name="money"]');
								var $moneyLine = currentTr.siblings(
										'tr[child-tr="' + childTr + '"]')
										.last().find('input[name="moneyLine"]');
								$(tableId).parents('form').bootstrapValidator('addField',$money);
								$(tableId).parents('form').bootstrapValidator('addField',$moneyLine);
							} else {
								currentTr.after(trHtml);
								var $clz = $(tableId + ' tbody tr.' + groupM)
										.find('select.expenseType');
								loadExpense(currentTr.next().find(
										'select.expenseType'), $clz, kind,
										ser_base);
								if (ser_base == 2) {
									loadPServer(currentTr.next().find(
											'select.productServiceId'));
								}
								// 注入bootstrapValidator验证字段
								var $money = currentTr.next().find('input[name="money"]');
								var $moneyLine = currentTr.next().find('input[name="moneyLine"]');
								$(tableId).parents('form').bootstrapValidator('addField',$money);
								$(tableId).parents('form').bootstrapValidator('addField',$moneyLine);
							}
							$(tableId).find('tbody .selectpicker')
									.selectpicker();
						}
						// 删除行
						if ($(this).is('.fa-minus')) {
							var currentChildTr = currentTr.attr('child-tr');
							var chlidRowspan = $(tableId).find(
									'tbody tr[parent-tr=' + currentChildTr
											+ ']').find('td:first').attr(
									'rowspan');
							chlidRowspan--;
							$(tableId).find(
									'tbody tr[parent-tr=' + currentChildTr
											+ ']').find('td:first').attr(
									'rowspan', chlidRowspan);
							// 删除已注入bootstrapValidator验证字段
							var $money = $(this).parents('tr').find('input[name="money"]');
							var $moneyLine = $(this).parents('tr').find('input[name="moneyLine"]');
							$(tableId).parents('form').bootstrapValidator('removeField',$money);
							$(tableId).parents('form').bootstrapValidator('removeField',$moneyLine);
							$(this).parents('tr').remove();
						}
					})
}

costCategory('.pricesEditModal', '#revenueCost', '#revenueCostTable', 2, 1);
costCategory('.pricesEditModal', '#incurExpense', '#incurExpenseTable', 1, 1);
costCategory('.serviceConfigModal', '#serviceConfigForm',
		'#productIncludeService', 0, 2);

// 加载产品考期栏中的考期下拉框
function loadAllExamTime(selector) {
	var xl = "";
	var timeO = "";
	for (var i = 0; i < _allExamTime.length; i++) {
		var examObj = {};
		examObj.examSettingId = _allExamTime[i].examSettingId;
		examObj.examDate = _allExamTime[i].examDate;
		examObj.endDate = _allExamTime[i].endDate;
		examObj.clearDate = _allExamTime[i].clearDate;
		xl += "<option value=" + _allExamTime[i].examSettingId + " data-value="
				+ JSON.stringify(examObj) + " >" + _allExamTime[i].examDate
				+ "</option>";
	}
	$(selector).html('<option value="">--请选择--</option>' + xl);
	$(selector).trigger('chosen:updated');
	$(selector).chosen({
		no_results_text : "没有匹配项"
	});
}

// 加载分校多选下拉框（展示所有分校）type-1：option值为id， 2：option值为json对象{addressId:addressId}
function loadAllSchool(selector, type) {
	var opt = '';
	for (var i = 0; i < _allSE.length; i++) {
		if (type == 2) {
			var enroll = {};
			enroll.addressId = _allSE[i].departmentId;
			enroll.schoolName = _allSE[i].fullName;
			// 
			opt += '<option value=' + JSON.stringify(enroll) + '>'
					+ _allSE[i].fullName + '</option>';
		} else if (type == 1) {
			opt += '<option value=' + _allSE[i].departmentId + '>'
					+ _allSE[i].fullName + '</option>';
		}
	}
	$(selector).html(opt);
	$(selector).selectpicker({
		'liveSearch' : true,
		'liveSearchPlaceholder' : '请输入关键字',
		'actionsBox' : true,
		'selectAllText' : '全选',
		'deselectAllText' : '取消',
		'width':'290px'
	});
}

// 增加期次tr
function insertPreiod() {
	var index = Number($.trim($('#paymentPeriodTable tr:last td:first input')
			.val()));
	var trHtml = '';
	index++;
	trHtml += '<tr>'
			+ '<td>'
			+ index
			+ '<input type="hidden" class="form-control addPeriod" name="periodNum" value="'
			+ index
			+ '"></td>'
			+ '<td class="form-group"><input type="text" class="form-control addPeriod" name="periodDay"></td>'
			+ '<td class="form-group"><input type="text" class="form-control addPeriod" name="periodScale"></td>'
			+ '<td>'
			+ '<label> <input type="checkbox" class="suspendService addPeriod" name="serviceEnable" value="0">'
			+ ' <span class="text"></span>终止服务 </label>' + '</td>' + '</tr>';
	$('#paymentPeriodTable tbody').append(trHtml);
	// 注入bootstrapValidator验证字段
	var $periodDay = $('#paymentPeriodTable tbody tr:last input[name="periodDay"]');
	var $periodScale = $('#paymentPeriodTable tbody tr:last input[name="periodScale"]');
	$('#addProductPrice').bootstrapValidator('addField',$periodDay);
	$('#addProductPrice').bootstrapValidator('addField',$periodScale);
}

/**
 * 新增产品考期tr
 * 
 * @returns
 */
function addExamTimeTr() {
	var trHtml = '';
	trHtml += '<tr>'
			+ '<td><input type="hidden" disabled/>'
			+ '   <select type="text" class="form-control chosen-select examTime addExamTime getExamTime" name="examTimeId">'
			+ '       <option></option>'
			+ '   </select>'
			+ '   <input type="hidden" name="examTime" class="addExamTime getExamTime"/>'
			+ '</td>'
			+ '<td width="10%" class="form-group"><input type="text" class="form-control addExamTime getExamTime" name="cost"></td>'
			+ '<td width="10%" class="form-group"><input type="text" class="form-control addExamTime getExamTime" name="price"></td>'
			+ '<td width="25%">'
			+ '   <div class="input-group"> '
			+ '       <input type="text" class="form-control duration addExamTime getExamTime" name="duration"> '
			+ '       <span class="input-group-addon"><i class="fa fa-calendar"></i></span> '
			+ '   </div>'
			+ '</td>'
			+ '<td>'
			+ '<select class="form-control selectpicker select1 enrollSchool addExamTime getExamTime" title="--请选择--" multiple name="recruits"><option></option></select> '
			+ '</td>'
			+ '<td>'
			+ '   <a class="edit"> '
			+ '       <i class="fa fa-edit blue brochures-edit" data-toggle="tooltip" data-placement="top" data-original-title="编辑"title=""></i> '
			+ '       <input type="hidden" class="form-control brochuresName addExamTime getExamTime" name="brochuresName"> '
			+ '       <input type="hidden" class="form-control brochuresDetail addExamTime getExamTime" name="brochuresDetail"> '
			+ '   </a>'
			+ '</td>'
			+ '<td>'
			+ '   <a class="edit" data-prices=""> '
			+ '       <i class="fa fa-edit blue prices-edit save-all" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title=""></i> '
			+ '   </a>'
			+ '</td>'
			+ '<td>'
			+ '	<a class="serviveconfig-btn"> '
			+ '		<i class="fa fa-cog blue save-all" data-toggle="tooltip" data-placement="top" data-original-title="服务配置" title=""></i> '
			+ '	</a>' + '</td>' + '</tr>';
	$('#examinationDateTable tbody').append(trHtml);	
	// 考期
	var selector1 = '#examinationDateTable tbody tr:last select[name="examTimeId"]';
	loadAllExamTime(selector1);
	// （多选）分校select 招生地区
	var selector2 = '#examinationDateTable tbody tr:last select[name="recruits"]';
	loadAllSchool(selector2, 2);
	$('.select1').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '',
        'width':'200px'
    });
	durationDate('.duration', '-');
	$('[data-toggle="tooltip"]').tooltip();
	// 选择考期内时，input【name='examTime'】 赋值
	$('#examinationDateTable tbody tr select.examTime').change(function() {
		var examTime = $(this).find('option:selected').text();
		$(this).parents('tr').find('input[name="examTime"]').val(examTime);
	})

	// 注入bootstrapValidator验证字段
	var $cost = $('#examinationDateTable tbody tr:last input[name="cost"]');
	var $price = $('#examinationDateTable tbody tr:last input[name="price"]');
	$('#addProductPrice').bootstrapValidator('addField',$cost);
	$('#addProductPrice').bootstrapValidator('addField',$price);

}

$('body')
		.on(
				'click',
				'.brochures-edit',
				function() {// 招生简章弹窗
					$('.brochuresEditModal').modal('show');
					// 回显已填写的内容
					var curInd = $('.brochuresEditModal').attr('curInd');
					var brochuresName = $(this).parents('tr').find(
							'input[name="brochuresName"]').val();
					var brochuresDetail = $(this).parents('tr').find(
							'input[name="brochuresDetail"]').val();
					$('#brochName').val(brochuresName);
					$(
							document.getElementsByTagName('iframe')[0].contentWindow.document.body)
							.html(brochuresDetail);
					curInd = $(this).parents('tr').index();
					// 给弹窗标记tr对应位置
					$('.brochuresEditModal').attr("curInd", curInd);
				})

/**
 * 考期与起止时间联动
 */
$('body').on(
		'change',
		'.examTime',
		function() {
			var jsonExamTime = $(this).find('option:selected').data('value');
			var startEnd = transferDateFormat(jsonExamTime.endDate) + ' - '
					+ transferDateFormat(jsonExamTime.clearDate);
			$(this).parent().parent().find('.duration').val(startEnd);
			durationDate('.duration', '-');
		})

/**
 * 暂时保存价格数据信息到table属性data-price-relation中（多个table中的数据单独存储，以方便对其单独操作）
 * 
 * @param table
 *            table的选择器
 * @param clz
 *            处理的class表单
 * @param len
 *            当前长度
 * @returns 方法执行之后data-price-relation的值
 */
function savePrice(table, clz, len) {
	var tempInfo = [];
	$(table + ' tbody tr').each(function() {
		// checkForm(this);
		if ($(this).find('td').length == len) {
			var rel = {};
			var priceDetail = [];
			var schools = $(this).find('td:first select').val();
			var groupFlag = $(this).find('td:first input').val();
			if (schools != null && schools != '') {
				for (var k = 0; k < schools.length; k++) {
					schools[k] = JSON.parse(schools[k]);
					schools[k].groupFlag = groupFlag;
				}
			}
			rel.recruitEnroll = schools;
			rel.priceDetail = priceDetail;
			tempInfo.push(rel);
		}
		var terObj = $(this).find(clz).serializeObject();
		var arr = terObj.ded;
		var newArr = [];
		if (arr != null) {
			if (!(arr instanceof Array)) {
				newArr[0] = arr;
			} else {
				newArr = arr;
			}
		}
		terObj.ded = newArr;
		tempInfo[tempInfo.length - 1].priceDetail.push(terObj);
	})
	return tempInfo;
}

/**
 * 检查当前tr内除CheckBox外input和select表单是否有值未填写
 * 
 * @param selector
 * @returns true-有表单未填写 false-没有
 */
function checkTrF(selector){
	var flag = false;
	$(selector).find('input,select').each(function(){
		if (($(this).attr('type') == 'checkbox')) {
			return true;
		}
		if ($(this).val() != null && $(this).val != '' && $(this).val() == undefined) {
			flag = true;
			return false;
		}
	})
	return flag;
}

/**
 * 服务配置价格弹窗内按键
 */
$('.serviceConfigModal').on('click', '.save-server-price', function() {// 保存信息
	
	$('#serviceConfigForm').data('bootstrapValidator').validate();
	if (!$('#serviceConfigForm').data('bootstrapValidator').isValid()) {
		return;
	}
	var tips = false;
	$('.serviceConfigModal select').each(function(){
		if ($(this).val() == null) {
			var trInd = $(this).parents('td').index();
			var rows = $(this).parents('tr').hasClass('son');
			if (rows) {
				trInd += 1;
			}
			var	str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
			$(this).focus();
			toastr.warning('有' + str + '未选择');
			tips = true;
			return false;
		} else if ($(this).val() instanceof Array) {
			var arry = $(this).val();
			var flagt = false;
			for (var va = 0; va < arry.length; va++) {
				if (arry[va] == '') {
					tips = true;
					var trInd = $(this).parents('td').index();
					var rows = $(this).parents('tr').hasClass('son');
					if (rows) {
						trInd += 1;
					}
					var	str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
					$(this).focus();
					toastr.warning('有' + str + '未选择或选择null项');
					flagt = true;
					break;
				}
			}
			if (flagt) {
				return false;
			}
		} else if($(this).val() == ''){
			var trInd = $(this).parents('td').index();
			var rows = $(this).parents('tr').hasClass('son');
			if (rows) {
				trInd += 1;
			}
			var	str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
			$(this).focus();
			toastr.warning('有' + str + '未选择');
			tips = true;
			return false;
		}
	})
	if (tips) {
		return;
	}
	var curInd = $('.serviceConfigModal').attr('curInd');
	var len = Number($('#productIncludeService tbody tr').length);
	if (!(len == 1 && checkTrF('#productIncludeService tbody tr'))) {
		var saveSerP = savePrice('#productIncludeService', '.addPrice', 9);
		$('#examinationDateTable tbody tr:eq(' + curInd + ') td:eq(7) a>i' ).attr('data-price-ser',JSON.stringify(saveSerP));
	}
	$('#productIncludeService tbody tr').remove();
	$('.serviceConfigModal').modal('hide');
}).on('click', '.cancel-server-price', function() {// 清除信息
	$('#productIncludeService tbody tr').remove();
})


/**
 * 基础价格弹窗内按键
 */
$('.pricesEditModal').on(
		'click',
		'.save-base-price',
		function() {// 保存费用信息
			$('#revenueCostForm').data('bootstrapValidator').validate();
			$('#incurExpenseForm').data('bootstrapValidator').validate();
			if (!$('#revenueCostForm').data('bootstrapValidator').isValid()) {
				return;
			}
			if (!$('#incurExpenseForm').data('bootstrapValidator').isValid()) {
				return;
			}
			var tips = false;
			$('.pricesEditModal select').each(function(){$(this) == null
				if ($(this).val() == null) {
					var trInd = $(this).parents('td').index();
					var rows = $(this).parents('tr').hasClass('son');
					if (rows) {
						trInd += 1;
					}
					var	str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
					$(this).focus();
					toastr.warning('有' + str + '未选择');
					tips = true;
					return false;
				} else if ($(this).val() instanceof Array) {
					var arry = $(this).val();
					var flagt = false;
					for (var va = 0; va < arry.length; va++) {
						if (arry[va] == '') {
							tips = true;
							var trInd = $(this).parents('td').index();
							var rows = $(this).parents('tr').hasClass('son');
							if (rows) {
								trInd += 1;
							}
							var	str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
							$(this).focus();
							toastr.warning('有' + str + '未选择或选择null项');
							flagt = true;
							break;
						}
					}
					if (flagt) {
						return false;
					}
				} else if($(this).val() == ''){
					var trInd = $(this).parents('td').index();
					var rows = $(this).parents('tr').hasClass('son');
					if (rows) {
						trInd += 1;
					}
					var	str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
					$(this).focus();
					toastr.warning('有' + str + '未选择');
					tips = true;
					return false;
				}
			})
			if (tips) {
				return;
			}
			// 收益
			var len1 = Number($('#revenueCostTable tbody tr').length); 
			var curInd = Number($('.pricesEditModal').attr('curInd'));
			if (!(len1 == 1 && checkTrF('#revenueCostTable tbody tr'))) {
				var saveInfo1 = savePrice('#revenueCostTable', '.addPrice', 7);
				$('#examinationDateTable tbody tr:eq(' + curInd + ') td:eq(6) a>i' ).attr('data-price-en',JSON.stringify(saveInfo1));
			}
			var len2 = Number($('#incurExpenseTable tbody tr').length);
			// 支出
			if (!(len2 == 1 && checkTrF('#incurExpenseTable tbody tr'))) {
				var saveInfo2 = savePrice('#incurExpenseTable', '.addPrice', 7);
				$('#examinationDateTable tbody tr:eq(' + curInd + ') td:eq(6) a>i' ).attr('data-price-in',JSON.stringify(saveInfo2));
			}
			$('#revenueCostTable tbody tr').remove();
			$('#incurExpenseTable tbody tr').remove();
			$('.pricesEditModal').modal('hide');
		}).on('click', '.cancel-base-price', function() {// 清除信息
	$('#revenueCostTable tbody tr').remove();
	$('#incurExpenseTable tbody tr').remove();
});

/**
 * 招生简章弹窗关闭保存内容
 */
$('.brochuresEditModal')
		.on(
				'click',
				'.save-brochures',
				function() {
					// 获取当前弹窗索引标记
					var curInd = Number($('.brochuresEditModal').attr('curInd'));
					// 获取招简表单信息
					var brochuresName = $('#brochName').val();
					var brochuresDetail = $(
							document.getElementsByTagName('iframe')[0].contentWindow.document.body)
							.html();
					if (brochuresName == undefined || brochuresName == '' || brochuresName == null) {
						toastr.error('标题不允许为空');
						return;
					}
					if (brochuresDetail == undefined || brochuresDetail == '' || brochuresDetail == null) {
						toastr.error('内容不允许为空');
						return;
					}
					// 根据索引标记确定要赋值的表单并赋值
					$(
							'#examinationDateTable tbody tr:eq(' + curInd
									+ ') input[name="brochuresName"]').val(
							brochuresName);
					$(
							'#examinationDateTable tbody tr:eq(' + curInd
									+ ') input[name="brochuresDetail"]').val(
							brochuresDetail);
					// 清除弹窗内容，以及索引标记
					$('#brochName').val('');
					$(
							document.getElementsByTagName('iframe')[0].contentWindow.document.body)
							.html('');
					$('.brochuresEditModal').attr('curInd', '');
					$('.brochuresEditModal').modal('hide');
				}).on(
						'click',
						'.brochures-cancel',
						function() {
							// 清除弹窗内容，以及索引标记
							$('#brochuresName').val('');
							$(
									document.getElementsByTagName('iframe')[0].contentWindow.document.body)
									.html('');
							$('.brochuresEditModal').attr('curIndex', '');
							$('.brochuresEditModal').modal('hide');
						})

/**
 * 加载产品服务信息option
 */
function loadPServer(selector) {
	var strOpt = '<option value="">--请选择--</option>';
	var $ser = $(selector).parents('tr');
	// 当前组别信息
	var kid = $ser.attr('child-tr') || $ser.attr('parent-tr');
	var tempVal = [];
	$ser.siblings('tr').each(function(){
		if ($(this).attr('child-tr') == kid || $(this).attr('parent-tr') == kid) {
			tempVal.push($(this).find('.productServiceId').val());
		}
	})
	for (var i = 0; i < _productServer.length; i++) {
		var flag = true;
		for (var n = 0; n < tempVal.length; n++) {
			if (tempVal[n] == _productServer[i].productServiceId) {
				flag = false;
				break;
			}
		}
		// 4/02 新增要求（如果该服务已经被禁用，则新增的项目中不展示该服务，已经在使用的继续展示）
		if (flag && _productServer[i].enable == 1) {
			strOpt += '<option value=' + _productServer[i].productServiceId + '>'
			+ _productServer[i].productServiceName + '</option>';
		}
	}
	$(selector).html(strOpt);
	$(selector).trigger('chosen:updated');
	$(selector).chosen({
		no_results_text : '没有匹配项',
		search_contains : true
	});
}

/**
 * 同一组别服务下拉框change事件关联
 */
/*$('#productIncludeService .productServiceId').change(function(){
	$(this)
})*/

/**
 * 加载价格弹窗内的分校下拉框
 * 
 * @param type
 *            1-支出 2-收益 其他-服务配置
 * @param selector
 *            选择器
 * @param clz
 *            分校select表单的公共class
 */
function loadPriceSchool(selector, clz, data, type) {
	var optStr = '';
	for (var i = 0; i < data.length; i++) {
		// 标识
		var flag = true;
		$(clz).find('option:selected').each(function() {
			if ($(this).data('value') == data[i].addressId && type != 1) {
				flag = false;
				return false;
			}
			if ($(this).data('value') == data[i].departmentId && type == 1) {
				flag = false;
				return false;
			}
		})
		if (flag && (type != 1)) {
			var strObj = {
				schoolId : data[i].addressId
			};
			optStr += '<option value=' + JSON.stringify(strObj)
					+ ' data-value=' + data[i].addressId + '>'
					+ data[i].schoolName + '</option>';
		}
		if (flag && type == 1) {
			var strObj = {
				schoolId : data[i].departmentId
			};
			optStr += '<option value=' + JSON.stringify(strObj)
					+ ' data-value=' + data[i].departmentId + '>'
					+ data[i].fullName + '</option>';
		}
	}
	$(selector).html(optStr);
	$(selector).selectpicker({
		'liveSearch' : true,
		'liveSearchPlaceholder' : '请输入关键字',
		'actionsBox' : true,
		'selectAllText' : '全选',
		'deselectAllText' : '取消',
		'width':'290px'
	});
}

// loadPriceSchool('#incurExpenseTable .priceSchool',
// '#incurExpenseTable .priceSchool', _expenseUnite, 1);
// loadPriceSchool('#productIncludeService .priceSchool',
// '#productIncludeService .priceSchool', _expenseUnite, 3);
/**
 * 加载价格弹窗内费用类别下拉框，并存储当前List<费用协议>
 * 
 * @param selector
 * @param $clz
 *            当前table中同class属性的jQuery对象（集合）
 * @param kind
 *            类型 1-支出 2-收益 0-服务下全部
 * @param type
 *            类型 1-基础 2-服务
 * @returns
 */
function loadExpense(selector, $clz, kind, type) {
	var str1 = '';
	for (var i = 0; i < _expenseUnite.length; i++) {
		var flag = false;
		$clz.each(function() {
			if ($(this).val() == _expenseUnite[i].type.expensesTypeId) {
				flag = true;
				return false;
			}
		})
		if (flag) {
			continue;
		}
		if (_expenseUnite[i].type.type == type) {
			if (kind == 0) {
				str1 += '<option value=' + _expenseUnite[i].type.expensesTypeId
				+ ' data-value=\''
				+ JSON.stringify(_expenseUnite[i].detail) + '\'>'
				+ _expenseUnite[i].type.expensesTypeName + '</option>';
			} else if(_expenseUnite[i].type.expensesType == kind){
				str1 += '<option value=' + _expenseUnite[i].type.expensesTypeId
				+ ' data-value=\''
				+ JSON.stringify(_expenseUnite[i].detail) + '\'>'
				+ _expenseUnite[i].type.expensesTypeName + '</option>';
			}
		}
	}
	if (selector.jquery == undefined) {
		$(selector).html('<option value="">--请选择--</option>' + str1);
		$(selector).trigger('chosen:updated');
		$(selector).chosen({
			no_results_text : '没有匹配项',
			search_contains : true
		});
	} else {
		selector.html('<option value="">--请选择--</option>' + str1);
		selector.trigger('chosen:updated');
		selector.chosen({
			no_results_text : '没有匹配项',
			search_contains : true
		});
	}
}
/**
 * 费用类别与费用协议联动
 */
$('body')
		.on(
				'change',
				'.expenseType',
				function() {
					// 当前费用类别中包含的费用协议
					var details = $(this).find('option:selected').data('value');
					var $curDetail = $(this).parents('tr').find(
							'select.expenseDetails');
					var str2 = '';
					if (details != undefined && details != null) {
						for (var j = 0; j < details.length; j++) {
							var simpleObj = new Object();
							simpleObj.dataExpensesDetailId = details[j].dataExpensesDetailId;
							simpleObj.dataExpensesDetailName = details[j].dataExpensesDetailName;
							str2 += '<option value='
									+ JSON.stringify(simpleObj) + '>'
									+ details[j].dataExpensesDetailName
									+ '</option>';
						}
					}
					$curDetail.html(str2);
					$curDetail.selectpicker('refresh');
				})

/** *页面公用方法** */
/**
 * 产品页面公共
 * 
 * @returns
 */
function pageInit() {
	return {
		init : function() {
			// 多选下拉框初始化
			$('.selectpicker').selectpicker({
				'liveSearch' : true,
				'liveSearchPlaceholder' : '请输入关键字',
				'actionsBox' : true,
				'selectAllText' : '全选',
				'deselectAllText' : '取消'
			})

			// 单选下拉框初始化
			$(".chosen-select").chosen({
				no_results_text : "没有匹配项",
				search_contains : true
			});
			// 招生起止日期
			durationDate('.duration', '-');
			// 产品类型和子产品联动
			$('select[name="productForm"]')
					.on(
							'change',
							function() {
								// 主产品被选中（值为0）时，显示子产品选择框
								if ($(this).val() == 0) {
									$('.childProductBox').show();
									$('#childProduct').attr('disabled',false);
								} else {
									$('.childProductBox').hide();
									// 回到初始状态
									document.getElementById("childProduct").options.selectedIndex = -1;
									// 对childProduct这个下拉框进行重置刷新
									$("#childProduct").selectpicker('refresh');
									$('#childProduct').attr('disabled',true);
								}
							})

			// 报考流程联动
			$('select[name="isApply"]')
					.on(
							'change',
							function() {
								// 当选择报考时（值为1），展示服务方和流程选择框
								if ($(this).val() == 1) {
									$('.flowOptions').show();
								} else {
									$('.flowOptions').hide();
									document.getElementById("examFlowId").options.selectedIndex = -1;
									$("#examFlowId").trigger("chosen:updated");
									$("#examFlowId").chosen();
								}
							})

//			KindEditor.ready(function(K) {
//				K.create('#description', {
//					allowFileManager : true,
//					resizeType : 0
//				});
//			});
			return this;
		}
	}
}
/**
 * 公司-部门联动 begin
 * 
 */
function depMenu(val) {
	$('#ajaxTree').html("");
	
	var cityObj = $("#" + val);
	var cityOffset = $("#" + val).offset();
	var positionTop = cityOffset.top
			- ($('.navbar-inner').height() + $('.page-breadcrumbs').height() + $(
					'.page-header').height()) + cityObj.height() + 14;
	$("#content").css({
		'left' : cityOffset.left,
		'top' : positionTop + "px"
	}).slideDown("fast");
	$("body *:not(.menuContent)").bind("mousedown", onBodyDown);
	
	$('#ajaxTree').width(cityObj.width() + 14);

	$.ajax({
		type : "post",
		url : ctx + "/product/depTree",
		dataType : "json",
		success : function(data) {
			$.fn.zTree.init($("#ajaxTree"), setting, data);
			var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
			var nodes = treeObj.getNodes();
			if (nodes.length > 0) {
				for (var i = 0; i < nodes.length; i++) {
					treeObj.expandNode(nodes[i], true, false, false);
				}
			}
		}
	});
}

// 检查input[type="checkbox"]表单，选中值为0，未选中为1
function checkForm(selector) {
	var jQ;
	if (selector.jquery == undefined) {
		jQ = $(selector);
	} else {
		jQ = selector;
	}
	var checkB = jQ.find('input[type="checkbox"]');
	// 未命中任何checkbox表单
	if (checkB == undefined) {
		return false;
	}
	// 命中jQuery对象只有一个
	if (checkB.checked) {
		checkB.value = '1';
	}
	// 命中多个jQuery对象
	for (var h = 0; h < checkB.length; h++) {
		if (checkB[h].checked) {
			checkB[h].value = '0';
		} else {
			checkB[h].checked = true;
			checkB[h].value = '1';
		}
	}
}

/**
 * 弹窗表单验证
 */
// 服务
$('#serviceConfigForm').bootstrapValidator({
	 message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    	money : {
			message : '费用格式不正确',
			validators : {
				notEmpty : {
					message : '费用不能为空'
				},
				regexp : {
					regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
					message : '只能是正数，最多保留两位小数'
				}
			}
		},
		moneyLine : {
			message : '下限格式不正确',
			validators : {
				notEmpty : {
					message : '下限不能为空'
				},
				regexp : {
					regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
					message : '只能是正数，最多保留两位小数'
				}
			}
		}
    }
})
// 收益
$('#revenueCostForm').bootstrapValidator({
	 message: 'This value is not valid',
     feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
     },
     fields: {
    	 money : {
				message : '费用格式不正确',
				validators : {
					notEmpty : {
						message : '费用不能为空'
					},
					regexp : {
						regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
						message : '只能是正数，最多保留两位小数'
					}
				}
			},
			moneyLine : {
				message : '下限格式不正确',
				validators : {
					notEmpty : {
						message : '下限不能为空'
					},
					regexp : {
						regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
						message : '只能是正数，最多保留两位小数'
					}
				}
			}
     }
})
// 支出
$('#incurExpenseForm').bootstrapValidator({
	 message: 'This value is not valid',
     feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
     },
     fields: {
    	 money : {
				message : '费用格式不正确',
				validators : {
					notEmpty : {
						message : '费用不能为空'
					},
					regexp : {
						regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
						message : '只能是正数，最多保留两位小数'
					}
				}
			},
			moneyLine : {
				message : '下限格式不正确',
				validators : {
					notEmpty : {
						message : '下限不能为空'
					},
					regexp : {
						regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
						message : '只能是正数，最多保留两位小数'
					}
				}
			}
     }
})

// 产品第二步
$('#addProductPrice').bootstrapValidator({
	 message: 'This value is not valid',
     feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
     },
     fields : {
			periodDay : {
				message : '天数格式不正确',
				validators : {
					notEmpty : {
						message : '天数不能为空'
					},
					regexp : {
						regexp : /(^[1-9]\d*$)|(^[0]{1}$)/,
						message : '天数只能是正整数'
					}
				}
			},
			periodScale : {
				message : '比例格式不正确',
				validators : {
					notEmpty : {
						message : '比例不能为空'
					},
					regexp : {
						regexp : /(^[0]{1}$)|(^[0]{1}\.\d{1,2}$)|(^[1]{1}\.0{1,2}$)|(^[1]{1}$)/,
						message : '比例范围（0.00~1.00）'
					}
				}
			},
			cost : {
				message : '成本格式不正确',
				validators : {
					notEmpty : {
						message : '成本不能为空'
					},
					regexp : {
						regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
						message : '只能是正数，最多保留两位小数'
					}
				}
			},
			price : {
				message : '最低招生价格格式不正确',
				validators : {
					notEmpty : {
						message : '最低招生价格不能为空'
					},
					regexp : {
						regexp : /((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/,
						message : '只能是正数，最多保留两位小数'
					}
				}
			}
		}
})

/**
 * 基础价格公用部分
 * 
 * @param tableId
 * @param info
 *            后台传递的当前table的已有数据
 * @param type
 *            1-基础 2-服务
 * @param etype
 *            1-支出 2-收益
 * @param selectedSchool
 *            已选招生地区
 * @return 父tr个数
 */
function common_price(tableId, info, type, etype, selectedSchool) {
	var index = 0;
	var temp_list = new Array();
	// 筛选符合table的数据并组装数组
	for (var e = 0; e < info.list.length; e++) {
		if (info.list[e].type == type && info.list[e].expenses_type == etype) {
			temp_list.push(info.list[e]);
		}
		if (etype == 0) {
			if (info.list[e].type == type) {
				temp_list.push(info.list[e]);
			}
		}
	}
	if (temp_list.length < 1) {
		return false;
	}
	// 父tr计数
	var count = 0;
	for (var i = 0; i < temp_list.length; i++) {

		// 学校
		var scstr = temp_list[i].full_name;
		var sc = [];
		if (scstr != '' || scstr != undefined || scstr != null) {
			sc = scstr.split(',');
		}
		// 费用协议
		var exstr = temp_list[i].data_expenses_detail;
		var ex = [];
		if (exstr != undefined) {
			ex = JSON.parse(exstr);
		}
		var str = '';
		// 判断是否需要合并
		if (i > 0 && temp_list[i - 1].full_name == temp_list[i].full_name) {
			str = '<tr child-tr = parent-' + index + ' class="son ' + 'groupM'
					+ index + '">';
			if (type == 2) {
				str += '    <td>'
						+ '        <select class="form-control productServiceId addPrice" name="productServiceId" title="--请选择--">'
						+ '        </select>' + '    </td>';
			}
			str += '<td  class="costCategory">'
					+ '    <div class="col-sm-10 no-padding">'
					+ '			<input type="hidden" name="productExamTimeDetailId" value="'
					+ temp_list[i].product_exam_time_detail_id
					+ '"/>'
					+ '        <select class="form-control addPrice expenseType" name="dataExpensesTypeId">'
					+ '        </select>'
					+ '    </div>'
					+ '    <label class="control-label pull-left">'
					+ '        <a class="fa fa-minus success operate-btn"></a>'
					+ '  		<input type="hidden" name="isExist" class="addPrice" value="true"/>'
					+ '    </label>'
					+ '</td>'
					+ '<td width="13%" class="form-group">'
					+ '    <input type="text" class="form-control addPrice"  name="money" value='
					+ temp_list[i].money
					+ '>'
					+ '</td>'
					+ '<td width="13%" class="form-group">'
					+ '    <input type="text" class="form-control addPrice"  name="moneyLine" value='
					+ temp_list[i].money_line + '>' + '</td>' + '<td>'
					+ '    <label>';
			// 判断是否锁定
			if (temp_list[i].service_enable == 0) {
				str += '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0" checked>';
			} else {
				str += '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0">';
			}
			str += '        <span class="text"></span>'
					+ '    </label>'
					+ '</td>'
					+ '<td>'
					+ '    <select class="form-control selectpicker addPrice expenseDetails" multiple name="ded" title="--请选择--">'
					+ '    </select>' + '</td>';

			if (type == 2) {
				str += '<td>' + '    <label>';
				// 是否必须(存储需要跟其他逻辑相反)
				if (temp_list[i].is_required == 1) {
					str += '            <input type="checkbox" class="isRequired addPrice" name="isRequired" checked value="1">';
				} else {
					str += '            <input type="checkbox" class="isRequired addPrice" name="isRequired" value="1">';
				}
				str += '        <span class="text"></span>' + '    </label>'
						+ '</td>';
			}

			str += '<td>' + '		<label>';
			// 判断是否禁用
			if (temp_list[i].enable == 0) {
				str += '        <input type="checkbox" name="enable" class="addPrice" value="0" checked>';
			} else {
				str += '        <input type="checkbox" name="enable" class="addPrice" value="0">';
			}
			str += '        <span class="text"></span>' + '    </label>'
					+ '</td>' + '</tr>';
			var curRow = Number($(
					tableId + ' tbody tr[parent-tr="parent-' + index
							+ '"] td:first').attr('rowspan'));
			$(tableId + ' tbody tr[parent-tr="parent-' + index + '"] td:first')
					.attr('rowspan', (curRow + 1));
			$(tableId + ' tbody').append(str);
		} else {
			count++;
			index++;
			str += '<tr parent-tr = parent-'
					+ index
					+ ' class="parent '
					+ 'groupM'
					+ index
					+ '">'
					+ '<td  rowspan="1">'
					+ '    <input type="hidden" name="productExamTimeDetailId" value="'
					+ temp_list[i].product_exam_time_detail_id
					+ '" />'
					+ '    <select class="form-control selectpicker priceSchool" multiple name="schoolId">'
					+ '    </select>'
					+ '    <input type="hidden" name="groupFlag" class="groupFlag" value='
					+ temp_list[i].group_flag + '/>' + '</td>';
			if (type == 2) {
				str += '    <td>'
						+ '        <select class="form-control productServiceId addPrice" name="productServiceId" title="--请选择--">'
						+ '        </select>' + '    </td>';
			}
			str += '<td  class="costCategory">'
					+ '    <div class="col-sm-10 no-padding">'
					+ '			<input type="hidden" name="productExamTimeDetailId" value="'
					+ temp_list[i].product_exam_time_detail_id
					+ '"/>'
					+ '        <select class="form-control addPrice expenseType" name="dataExpensesTypeId">'
					+ '        </select>'
					+ '    </div>'
					+ '    <label class="control-label pull-left">'
					+ '        <a class="fa fa-plus success operate-btn"></a>'
					+ '  		<input type="hidden" name="isExist" class="addPrice" value="true"/>'
					+ '    </label>'
					+ '</td>'
					+ '<td width="13%">'
					+ '    <input type="text" class="form-control addPrice"  name="money" value='
					+ temp_list[i].money
					+ '>'
					+ '</td>'
					+ '<td width="13%">'
					+ '    <input type="text" class="form-control addPrice"  name="moneyLine" value='
					+ temp_list[i].money_line + '>' + '</td>' + '<td>'
					+ '    <label>';
			// 判断是否锁定
			if (temp_list[i].service_enable == 0) {
				str += '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0" checked>';
			} else {
				str += '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0">';
			}
			str += '        <span class="text"></span>'
					+ '    </label>'
					+ '</td>'
					+ '<td>'
					+ '    <select class="form-control selectpicker addPrice expenseDetails" multiple name="ded" title="--请选择--">'
					+ '    </select>' + '</td>';

			if (type == 2) {
				str += '<td>' + '    <label>';
				// 是否必须(存储需要跟其他逻辑相反)
				if (temp_list[i].is_required == 1) {
					str += '            <input type="checkbox" class="isRequired addPrice" name="isRequired" checked value="1">';
				} else {
					str += '            <input type="checkbox" class="isRequired addPrice" name="isRequired" value="1">';
				}
				str += '        <span class="text"></span>' + '    </label>'
						+ '</td>';
			}

			str += '<td>' + '		<label>';
			// 判断是否禁用
			if (temp_list[i].enable == 0) {
				str += '        <input type="checkbox" name="enable" class="addPrice" value="0" checked>';
			} else {
				str += '        <input type="checkbox" name="enable" class="addPrice" value="0">';
			}
			str += '        <span class="text"></span>' + '    </label>'
					+ '</td>' + '</tr>';
			$(tableId + ' tbody').append(str);

			var optS = '';
			for (var h = 0; h < selectedSchool.length; h++) {
				var flag = true;
				for (var j = 0; j < sc.length; j++) {
					var schooljson = {};
					if (type == 1) {
						if (etype == 1 && selectedSchool[h].fullName == sc[j]) {
							schooljson.schoolId = selectedSchool[h].departmentId;
							optS += '<option value=\''
									+ JSON.stringify(schooljson)
									+ '\' data-value="'
									+ selectedSchool[h].departmentId
									+ '" selected>' + sc[j] + '</option>';
							flag = false;
							break;
						} else if (etype == 2
								&& selectedSchool[h].schoolName == sc[j]) {
							schooljson.schoolId = selectedSchool[h].addressId;
							optS += '<option value=\''
									+ JSON.stringify(schooljson)
									+ '\' data-value="'
									+ selectedSchool[h].addressId
									+ '" selected>' + sc[j] + '</option>';
							flag = false;
							break;
						}
					} else if (type == 2
							&& selectedSchool[h].schoolName == sc[j]) {
						schooljson.schoolId = selectedSchool[h].addressId;
						optS += '<option value=\'' + JSON.stringify(schooljson)
								+ '\' data-value="'
								+ selectedSchool[h].addressId + '" selected>'
								+ sc[j] + '</option>';
						flag = false;
						break;
					}
				}
				if (flag) {
					if (etype == 1) {
						schooljson.schoolId = selectedSchool[h].departmentId;
						optS += '<option value=\'' + JSON.stringify(schooljson)
								+ '\' data-value="'
								+ selectedSchool[h].departmentId + '">'
								+ selectedSchool[h].fullName + '</option>';
					} else {
						schooljson.schoolId = selectedSchool[h].addressId;
						optS += '<option value=\'' + JSON.stringify(schooljson)
								+ '\' data-value="'
								+ selectedSchool[h].addressId + '">'
								+ selectedSchool[h].schoolName + '</option>';
					}
				}
			}
			$(tableId + ' tbody tr:last').find('select.priceSchool').html(optS);
			$(tableId + ' tbody tr:last').find('select.priceSchool')
					.selectpicker('refresh');
		}
		// 公用tr内表单
		if (type == 2) {
			// 服务名称
			var strOpt = '<option value="">--请选择--</option>';
			for (var l = 0; l < _productServer.length; l++) {
				if (_productServer[l].productServiceId == temp_list[i].product_service_id) {
					strOpt += '<option selected value='
							+ _productServer[l].productServiceId + '>'
							+ _productServer[l].productServiceName
							+ '</option>';
				} else {
					strOpt += '<option value='
							+ _productServer[l].productServiceId + '>'
							+ _productServer[l].productServiceName
							+ '</option>';
				}
			}
			$(tableId + ' tbody tr:last').find('select.productServiceId').html(
					strOpt);
			$(tableId + ' tbody tr:last').find('select.productServiceId')
					.chosen();

		}
		// 费用种类
		var exopt = '';
		for (var m = 0; m < _expenseUnite.length; m++) {
			if (_expenseUnite[m].type.type == 2) {
				if (_expenseUnite[m].type.expensesTypeId == temp_list[i].data_expenses_type_id) {
					exopt += '<option value='
							+ _expenseUnite[m].type.expensesTypeId
							+ ' selected data-value=\''
							+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
							+ _expenseUnite[m].type.expensesTypeName
							+ '</option>';
				} else {
					exopt += '<option value='
							+ _expenseUnite[m].type.expensesTypeId
							+ ' data-value=\''
							+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
							+ _expenseUnite[m].type.expensesTypeName
							+ '</option>';
				}
			} else if (_expenseUnite[m].type.expensesType == etype) {
				if (_expenseUnite[m].type.expensesTypeId == temp_list[i].data_expenses_type_id) {
					exopt += '<option value='
							+ _expenseUnite[m].type.expensesTypeId
							+ ' selected data-value=\''
							+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
							+ _expenseUnite[m].type.expensesTypeName
							+ '</option>';
				} else {
					exopt += '<option value='
							+ _expenseUnite[m].type.expensesTypeId
							+ ' data-value=\''
							+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
							+ _expenseUnite[m].type.expensesTypeName
							+ '</option>';
				}
			}
		}
		$(tableId + ' tbody tr:last').find('select.expenseType').html(
				'<option value="">--请选择--</option>' + exopt);
		$(tableId + ' tbody tr:last').find('select.expenseType').chosen();
		// 费用协议
		var exop = '';
		var exDetail = $(tableId + ' tbody tr:last').find(
				'select.expenseType :selected').data('value');
		if (exDetail != undefined) {
			for (var n = 0; n < exDetail.length; n++) {
				var detail = {};
				detail.dataExpensesDetailId = exDetail[n].dataExpensesDetailId;
				detail.dataExpensesDetailName = exDetail[n].dataExpensesDetailName;
				var flag = true; // 标记
				for (var y = 0; y < ex.length; y++) {
					if (ex[y].dataExpensesDetailId = exDetail[n].dataExpensesDetailId) {
						exop += '<option value=\'' + JSON.stringify(detail)
								+ '\' selected>'
								+ exDetail[n].dataExpensesDetailName
								+ '</option>';
						flag = false;
						break;
					}
				}
				if (flag) {
					exop += '<option value=\'' + JSON.stringify(detail) + '\'>'
							+ exDetail[n].dataExpensesDetailName + '</option>';
				}
			}
		}
		$(tableId + ' tbody tr:last').find('select.expenseDetails').html(exop);
		$(tableId + ' tbody tr:last').find('select.expenseDetails')
				.selectpicker('refresh');

	}
	// 返回父tr个数
	return count;
}

/**
 * 价格弹窗暂存数据展示
 * 
 * @param
 * @param data
 *            结构 [{分校:[],价格详情:[]},...]
 * @param type
 *            1-基础 2-服务
 * @param etype
 *            1-支出 2-收益
 * @param selectedSchool
 *            分校数据所有可待选
 * @author guojuntao
 * @return
 */
function view_price(tableId, data, type, etype, selectedSchool){
	if (data == undefined || data == null || data.length < 1) {
		return 
	}
	var index = 1; 
//	$(tableId).attr('tLength',data.length);
	for (var k = data.length-1; k >= 0; k--) {
		var str = '';
		// 分校
		str = '<tr parent-tr = parent-'
				+ index
				+ ' class="parent '
				+ 'groupM'
				+ index
				+ '">'
				+ '<td  rowspan="'
				+ data[k].priceDetail.length
				+'">'
				+ '    <select class="form-control selectpicker priceSchool" multiple name="schoolId" title="--请选择--">'
				+ '    </select>'
				+ '</td>';
		// 价格详情
		for (var f = 0; f < data[k].priceDetail.length; f++) {
			if (f > 0) {
				str = '<tr child-tr = parent-'
					+ index
					+ ' class="son '
					+ 'groupM'
					+ index
					+ '">';
			}
			if (type == 2) {
				str += '    <td>'
					+ '        <select class="form-control productServiceId addPrice" name="productServiceId" title="--请选择--">'
					+ '        </select>'
					+ '    </td>';
			}
			str += '<td  class="costCategory">'
				+ '    <div class="col-sm-10 no-padding">'
				+ '			<input type="hidden" name="productExamTimeDetailId" value="'
				+ data[k].priceDetail[f].productExamTimeDetailId 
				+ '"/>'	
				+ '        <select class="form-control addPrice expenseType" name="dataExpensesTypeId" title="--请选择--">'
				+ '        </select>'
				+ '    </div>'
				+ '    <label class="control-label pull-left">';
			if (f == 0) {
				str	+= '        <a class="fa fa-plus success operate-btn"></a>';
			} else if( !data[k].priceDetail[f].isExist ){
				str	+= '        <a class="fa fa-minus success operate-btn"></a>';
			} else {
				str += ' <input type="hidden" name="isExist" class="addPrice" value="true"/>';
			}
			str	+= '    </label>'
				+ '</td>'
				+ '<td width="13%" class="form-group">'
				+ '    <input type="text" class="form-control addPrice"  name="money" value='
				+ data[k].priceDetail[f].money
				+ '>'
				+ '</td>'
				+ '<td width="13%" class="form-group">'
				+ '    <input type="text" class="form-control addPrice"  name="moneyLine" value='
				+ data[k].priceDetail[f].moneyLine
				+ '>'
				+ '</td>'
				+ '<td>'
				+ '    <label>';
			// 判断是否锁定
			if (data[k].priceDetail[f].serviceEnable == 0) {
				str += '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0" checked>';
			} else {
				str += '        <input type="checkbox" class="addPrice" name="serviceEnable" value="0">';
			}
			str	+= '        <span class="text"></span>'
				+ '    </label>'
				+ '</td>'
				+ '<td>'
				+ '    <select class="form-control selectpicker addPrice expenseDetails" multiple name="ded" title="--请选择--">'
				+ '    </select>' 
				+ '</td>';
			
			if (type == 2) {
				str	+= '<td>' 
					+ '    <label>';
				// 是否必须(存储需要跟其他逻辑相反)
				if (data[k].priceDetail[f].isRequired == 1) {
					str	+= '            <input type="checkbox" class="isRequired addPrice" name="isRequired" checked value="1">';
				} else {
					str	+= '            <input type="checkbox" class="isRequired addPrice" name="isRequired" value="1">';
				}
				str	+= '        <span class="text"></span>' 
					+ '    </label>' 
					+ '</td>';
			}
			
			str	+= '<td>'
				+ '		<label>';
			// 判断是否禁用
			if (data[k].priceDetail[f].enable == 0) {
				str	+= '        <input type="checkbox" name="enable" class="addPrice" value="0" checked>';
			} else {
				str	+= '        <input type="checkbox" name="enable" class="addPrice" value="0">';
			}
			str	+= '        <span class="text"></span>' 
				+ '    </label>' 
				+ '</td>'
				+ '</tr>';
			$(tableId + ' tbody').append(str);
			if (f == 0) {
				// 分校
				var optS = '';
				for (var h = 0; h < selectedSchool.length; h++) {
					var flag = true;
					if (data[k].recruitEnroll != null) {
						for (var j = 0; j < data[k].recruitEnroll.length; j++) {
							if (type == 1) {
								if (etype == 1 && selectedSchool[h].departmentId == data[k].recruitEnroll[j].schoolId) {
									optS += '<option value=\'' + JSON.stringify(data[k].recruitEnroll[j]) + '\' data-value="' + data[k].recruitEnroll[j].schoolId + '" selected>'+ selectedSchool[h].fullName + '</option>';
									flag = false;
									break;
								} else if (etype == 2 && selectedSchool[h].addressId == data[k].recruitEnroll[j].schoolId) {
									optS += '<option value=\'' + JSON.stringify(data[k].recruitEnroll[j]) + '\' data-value="' + selectedSchool[h].addressId + '" selected>'+ selectedSchool[h].schoolName + '</option>';
									flag = false;
									break;
								}
							} else if (type == 2 && selectedSchool[h].addressId == data[k].recruitEnroll[j].schoolId){
								optS += '<option value=\'' + JSON.stringify(data[k].recruitEnroll[j]) + '\' data-value="' + selectedSchool[h].addressId + '" selected>'+ selectedSchool[h].schoolName + '</option>';
								flag = false;
								break;
							}
						}
					}
					if (flag) {
						var schooljson = {};
						if (etype == 1) {
							schooljson.schoolId = selectedSchool[h].departmentId;
							optS += '<option value=\'' + JSON.stringify(schooljson) + '\' data-value="' + selectedSchool[h].departmentId + '">'+ selectedSchool[h].fullName + '</option>';
						} else {
							schooljson.schoolId = selectedSchool[h].addressId;
							optS += '<option value=\'' + JSON.stringify(schooljson) + '\' data-value="' + selectedSchool[h].addressId + '">'+ selectedSchool[h].schoolName + '</option>';
						}
					}
				}
				$(tableId + ' tbody tr:last').find('select.priceSchool').html(optS);
				$(tableId + ' tbody tr:last').find('select.priceSchool').selectpicker({
					'liveSearch' : true,
					'liveSearchPlaceholder' : '请输入关键字',
					'actionsBox' : true,
					'selectAllText' : '全选',
					'deselectAllText' : '取消',
					'width':'200px'
				});
			}
			if (type == 2) {
				// 服务名称
				var strOpt = '<option value="">--请选择--</option>';
				for (var l = 0; l < _productServer.length; l++) {
					if (_productServer[l].productServiceId == data[k].priceDetail[f].productServiceId) {
						strOpt += '<option selected value=' + _productServer[l].productServiceId + '>'
						+ _productServer[l].productServiceName + '</option>';
					} else {
						strOpt += '<option value=' + _productServer[l].productServiceId + '>'
						+ _productServer[l].productServiceName + '</option>';
					}
				}
				$(tableId + ' tbody tr:last').find('select.productServiceId').html(strOpt);
				$(tableId + ' tbody tr:last').find('select.productServiceId').chosen();
				
			}
			// 费用种类
			var exopt = '';
			for (var m = 0; m < _expenseUnite.length; m++) {
				if (_expenseUnite[m].type.type == 2 && type == 2) {
					if (_expenseUnite[m].type.expensesTypeId == data[k].priceDetail[f].dataExpensesTypeId) {
						exopt += '<option value=' + _expenseUnite[m].type.expensesTypeId
						+ ' selected data-value=\''
						+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
						+ _expenseUnite[m].type.expensesTypeName + '</option>';
					} else {
						exopt += '<option value=' + _expenseUnite[m].type.expensesTypeId
						+ ' data-value=\''
						+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
						+ _expenseUnite[m].type.expensesTypeName + '</option>';
					}
				} else if (_expenseUnite[m].type.expensesType == etype && _expenseUnite[m].type.type == type) {
					if (_expenseUnite[m].type.expensesTypeId == data[k].priceDetail[f].dataExpensesTypeId) {
						exopt += '<option value=' + _expenseUnite[m].type.expensesTypeId
						+ ' selected data-value=\''
						+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
						+ _expenseUnite[m].type.expensesTypeName + '</option>';
					} else {
						exopt += '<option value=' + _expenseUnite[m].type.expensesTypeId
						+ ' data-value=\''
						+ JSON.stringify(_expenseUnite[m].detail) + '\'>'
						+ _expenseUnite[m].type.expensesTypeName + '</option>';
					}
				}
			}
			$(tableId + ' tbody tr:last').find('select.expenseType').html('<option value="">--请选择--</option>' + exopt);
			$(tableId + ' tbody tr:last').find('select.expenseType').chosen();
			// 费用协议
			var exop = '';
			var exDetail = $(tableId + ' tbody tr:last').find('select.expenseType :selected').data('value');
			var ex = [];
			if (data[k].priceDetail[f].ded != undefined) {
				ex = data[k].priceDetail[f].ded;
			}
			if (exDetail != undefined) {
				for (var n = 0; n < exDetail.length; n++) {
					var detail = {};
					detail.dataExpensesDetailId = exDetail[n].dataExpensesDetailId;
					detail.dataExpensesDetailName = exDetail[n].dataExpensesDetailName;
					var flag = true; // 标记
					for (var y = 0; y < ex.length; y++) {
						if (ex[y].dataExpensesDetailId = exDetail[n].dataExpensesDetailId) {
							exop += '<option value=\'' + JSON.stringify(detail) + '\' selected>' + exDetail[n].dataExpensesDetailName + '</option>';
							flag = false;
							break;
						}
					}
					if (flag) {
						exop += '<option value=\'' + JSON.stringify(detail) + '\'>' + exDetail[n].dataExpensesDetailName + '</option>';
					}
				}
			}
			$(tableId + ' tbody tr:last').find('select.expenseDetails').html('<option value="">--请选择--</option>' + exop);
			$(tableId + ' tbody tr:last').find('select.expenseDetails').selectpicker('refresh');
			// 表单验证
			// 注入bootstrapValidator验证字段
			var $money = $(tableId + ' tbody tr:last input[name="money"]');
			var $moneyLine = $(tableId + ' tbody tr:last input[name="moneyLine"]');
			$(tableId).parents('form').bootstrapValidator('addField',$money);
			$(tableId).parents('form').bootstrapValidator('addField',$moneyLine);
		}
		
		index++;
	}
}

/**
 * 弹窗x方法
 */
$('.modal-content .cancel-close-price').click(function(){
	$(this).parents('.modal-content').find('table tbody tr').remove();
})

/**
 * 返回列表页面
 */
function Tolist() {
	window.location.href = ctx + '/product/index';
}

/**
 *  为数组中每个对象新增一个属性和值
 */
Array.prototype.insertPropertyEG = function(property, value){
	for (var i = 0; i < this.length; i++) {
		this[i][property] = value;
	}
}

/**
 * 删除数组指定元素
 */
Array.prototype.removeByValue = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) {
			this.splice(i, 1);
			break;
		}
	}
}
/**
 * 表单序列为Json
 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/**
 * 字符串（yyyy-MM-dd）时间格式化
 */
function transferDateFormat(val) {
	var NumDate, date;
	if (typeof (val) == 'number') {
		NumDate = val;
		date = new Date(val);
	} else if (typeof (val) == 'string') {
		NumDate = Date.parse(val.replace(/-/g, '/'));
		date = new Date(NumDate);
	} else {
		NumDate = Date.parse(new Date());
		date = new Date(NumDate);
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? ('0' + month) : month;
	var day = date.getDate();
	day = day < 10 ? ('0' + day) : day;
	return year + '-' + month + '-' + day;
}

/**
 * 获取独立标记
 * 
 * @returns
 */
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
	return uuid;

};
//2018/5/8新增字段--是否分期和分期首付款比率（isInstallment&downpaymentRatio）
function installmentRelation(){
	$('#isInstallment').on('change',function(){
		var val1 = $(this).val();
		if (val1 == 1) {
			$('.relate-installment').css('display','');
			$('.relate-installment').find('#downpaymentsRatio').attr('disabled',false);
		} else {
			$('.relate-installment').css('display','none');
			$('.relate-installment').find('#downpaymentsRatio').attr('disabled',true);
		} 
	})
	$('.relate-installment').find('#downpaymentsRatio').on('blur',function(){})
}