// 页面初始化
pageInit().init();
// 隐藏
$('.hideItem').css('display','none');
$('.part1').css('display','none');
$('.part2').css('display','none');
$('.part3').css('display','none');
$('.part4').css('display','none');
$('.part5').css('display','none');
$('.part6').css('display','none');
$('.part7').css('display','none');
installmentRelation();
// 产品模型初始化
$.ajax({
	url : ctx + '/product/selectProductModel',
	type : 'POST',
	dataType : 'json',
	success : function(data) {
		var zxkc = "";
		for (var i = 0; i < data.length; i++) {
			var memo = data[i].memo;
			zxkc += "<option value=" + data[i].modelId + " data-memo="+JSON.stringify(data[i].memo)+" data-value="
					+ JSON.stringify(data[i].JsonDetail) + ">"
					+ data[i].modelName + "</option>";
		}
		$("#productModel").html('<option value="">--请选择--</option>' + zxkc);
		$('#productModel').trigger('chosen:updated');
		$("#productModel").chosen({
			no_results_text : "没有匹配项",
			search_contains : true
		});
		$('.chosen-container').width('100%');
	},
	error : function(response) {
		toastr.error("系统错误5");
	}
});
//
//// 初始化子产品
//$.ajax({
//	url : ctx + '/product/selectAll',
//	data : {
//		'productForm' : 1
//	},
//	dataType : 'json',
//	type : 'post',
//	success : function(data) {
//		if (data.status != "success") {
//			toastr.error(data.msg);
//		} else {
//
//			var str = "";
//			for (var i = 0; i < data.list.length; ++i) {
//				str += "<option value='" + data.list[i].productId + "'>"
//						+ data.list[i].productName + "</option>";
//			}
//			$('#childProduct').html(str);
//			$('.selectpicker').selectpicker('refresh');
//		}
//	},
//	error : function() {
//		toastr.error("系统错误");
//	}
//});

// （多选）初始化分校select
loadAllSchool('#branchSchoolId', 1);

// 初始化学历
$.ajax({
	url : ctx + '/product/edu',
	type : 'POST',
	data : {
		attrType : 3
	},
	dataType : 'json',
	success : function(data) {
		var xl = "";
		for (var i = 0; i < data.list.length; i++) {
			xl += "<option value=" + data.list[i].studentAttrId + ">"
					+ data.list[i].typeName + "</option>";
		}
		$("#edu").html('<option value="">--请选择--</option>' + xl);
		$("#edu").trigger('chosen:updated');
		$("#edu").chosen({
			no_results_text : "没有匹配项"
		});
		$('.chosen-container').width('100%');
	},
	error : function(response) {
		toastr.error("系统错误9");
	}
});
// 初始化报考流程
$.ajax({
	url : ctx + '/product/examFlow',
	type : 'POST',
	dataType : 'json',
	success : function(data) {
		var xl = "";
		for (var i = 0; i < data.list.length; i++) {
			xl += "<option value=" + data.list[i].examFlowId + ">"
					+ data.list[i].examFlowName + "</option>";
		}
		$("#examFlowId").html('<option value="">--请选择--</option>' + xl);
		$("#examFlowId").trigger('chosen:updated');
		$("#examFlowId").chosen({
			no_results_text : "没有匹配项"
		});
		$('.chosen-container').width('100%');
	},
	error : function(response) {
		toastr.error("系统错误");
	}
});
// 初始化科目
$.ajax({
	url : ctx + '/product/configs',
	type : 'POST',
	data : {configType : 6},
	dataType : 'json',
	success : function(data) {
		var xl = "";
		for (var i = 0; i < data.length; i++) {
			xl += "<option value=" + data[i].configId + ">"
					+ data[i].configDesc + "</option>";
		}
		$('#subject').html(xl);
		$('.selectpicker').selectpicker('refresh');
	},
	error : function(response) {
		toastr.error("系统错误10");
	}
});

// 初始化优惠活动
$.ajax({
	url : ctx + '/product/activity',
	type : 'POST',
	data : {
		attrType : 3
	},
	dataType : 'json',
	success : function(data) {
		if (data.status != "success") {
			toastr.error(data.msg);
		} else {
			var xl = "";
			for (var i = 0; i < data.list.length; i++) {
				xl += "<option value=" + data.list[i].activityId + ">"
						+ data.list[i].title + "</option>";
			}
			$('#activity').html(xl);
			$('.selectpicker').selectpicker({
				'liveSearch' : true,
				'liveSearchPlaceholder' : '请输入关键字',
				'actionsBox' : true,
				'selectAllText' : '全选',
				'deselectAllText' : '取消',
				'width':'100%'
			});
		}
	},
	error : function(response) {
		toastr.error("系统错误11");
	}
});

// 报名表信息
$.ajax({
	url : ctx + '/product/configs',
	type : 'post',
	data : {configType : 1},
	dataType : 'json',
	success : function(resp) {
		var strHtml = '';
		for (var k = 0; k < resp.length; k++) {
			if (resp[k].configDesc.trim().length != 0) {
				strHtml += '<div class="form-group col-sm-12">'
						+ '<div class="col-sm-12">'
						+ '<label> <input type="checkbox" name="sign" value="'
						+ resp[k].configId + '">'
						+ '<span class="text"></span>' + resp[k].configDesc
						+ '</label>' + '</div>' + '</div>';
			}
		}
		$('.product-signs').append(strHtml);
	},
	error : function(response) {
		toastr.error("系统错误");
	}
})

// 地区
$.ajax({
	url : ctx + '/product/address',
	type : 'POST',
	dataType : 'json',
	success : function(data) {
		var opt = "";
		for (var i = 0; i < data.list.length; i++) {
			opt += "<option value=" + data.list[i].addressId + ">"
					+ data.list[i].fullName + "</option>";
		}
		$("#area").html(opt);
		$(".selectpicker").selectpicker("refresh");
	},
	error : function(response) {
		toastr.error("系统错误12");
	}
});

// 将从后台得到的表名进行处理得到符合bean中字段格式的字符串，1.剔除_,2.后面的首字母大写
function nameHandler(str) {
	var array = str.toLowerCase().split("_");
	// 如果表名为单个单词，即没有_，就返回自身
	if (array.length > 1) {
		// 循环从1开始，因为第一个单词不需要进行首字母大写处理
		for (var i = 1; i < array.length; i++) {
			// 每个单词，首字母大写处理
			array[i] = array[i][0].toUpperCase()
					+ array[i].substring(1, array[i].length);
		}
		var string = array.join("");
		return string;
	} else {
		return str;
	}
}

// 根据产品类型的选择，动态创建课程信息部分，其它下拉框
$("#productModel")
		.change(
				function() {
					// 重新隐藏
					$('.hideItem').css('display','none');
//					$('.hideItem').find('input,select').val('');
					
					$('.part1').css('display','none');
					$('.part2').css('display','none');
					$('.part3').css('display','none');
					$('.part4').css('display','none');
					$('.part5').css('display','none');
					$('.part6').css('display','none');
					$('.part7').css('display','none');
					
					// 得到选中的option的Json信息
					var jsonObj = $('#productModel :selected').data("value");
					// 得到选中的option的memo信息
					var memo = $('#productModel :selected').data("memo");
					// 如果当前模型下没有配置选项
					if (jsonObj == "undefined") {
						// 清除上次选择后生成的下拉框
						$(".removeFlag").parent().parent().remove();
						return;
					}
					// 得到产品模型ID
					var productModelId = $('#productModel :selected').val();
					// 清除上次选择后生成的下拉框
					$(".removeFlag").parent().parent().remove();
					// 用来组装表名
					var tableArray = new Array();
					// 开始构造最新的拼接结果
					if (jsonObj != undefined) {
						for (var i = jsonObj.length - 1; i >= 0; i--) {
							var enName = jsonObj[i].enName;
							var chName = jsonObj[i].chName;
							tableArray.push(enName);
							// 开始拼接
							var str = '<div class="form-group col-md-4">'
									+ '       <label class="control-label col-sm-4 no-padding-right">'
									+ chName
									+ '</label>'
									+ '       <div class="col-sm-8">'
									+ '            <select name="'
									+ nameHandler(enName)
									+ 'Id" id="'
									+ enName
									+ '" class="form-control infomsg removeFlag chosen-select" data-live-search="true">'
									+ '            </select>'
									+ '			   <input type="hidden" name="'
									+ nameHandler(enName)
									+ 'Name" class="projectInfoManager" />'
									+ '        </div>' + '</div>';
							// 将新增的下拉框拼接到产品信息下
							$("#productForm").parent().parent().parent()
									.before(str);
							// 根据表名和产品类型，关联product表，开始构造option
						}
					}
					// 把所有的元素用','拼接
					var tableName = tableArray.join(",");
					// 不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
					$
							.ajax({
								url : ctx + '/product/selectOptionByTable',
								type : 'POST',
								dataType : 'json',
								data : {
									"tableName" : tableName
								},
								success : function(data) {
									if (data == null || data.length == 0) {
										return;
									}
									for (var i = 0; i < data.length; i++) {
										var zxkc = "";
										for (var j = 0; j < data[i].dataList.length; j++) {
											zxkc += "<option value="
													+ data[i].dataList[j].primaryId
													+ ">"
													+ data[i].dataList[j].mainName
													+ "</option>";
										}
										$('#' + data[i].tableName).html(
												'<option value="">--请选择--</option>'
														+ zxkc);
										// 加载下拉框样式
										$('#' + data[i].tableName).trigger(
												'chosen:updated');
										$("#" + data[i].tableName).chosen({
											no_results_text : "没有匹配项",
											search_contains : true
										});
										$('.chosen-container').width('100%');
									}
								},
								error : function(response) {
									toastr.error("系统错误22");
								}
							});
					// 其他模块展示情况
					if (memo != 'undefined' && memo != '' && memo != undefined) {
						if (memo.indexOf('age') > -1) {
							$('.part1').css('display','');
							$('#age').parents('.hideItem').css('display','');
						}
						if (memo.indexOf('edu') > -1) {
							$('.part1').css('display','');
							$('#edu').parents('.hideItem').css('display','');
						}
						if (memo.indexOf('area') > -1) {
							$('.part1').css('display','');
							$('#area').parents('.hideItem').css('display','');
						}
						
						if (memo.indexOf('isApply') > -1) {
							$('.part2').css('display','');
							$('#isApply').parents('.hideItem').css('display','');
						} else {
							$('#examFlowId').css('display','none');
						}
						if (memo.indexOf('examFlowId') > -1) {
							$('.part2').css('display','');
							$('#examFlowId').parents('.hideItem').css('display','');
						}
						
						if (memo.indexOf('feeFlowId') > -1) {
							$('.part3').css('display','');
							$('#feeFlowId').parents('.hideItem').css('display','');
						}
						
						if (memo.indexOf('subject') > -1) {
							$('.part4').css('display','');
							$('#subject').parents('.hideItem').css('display','');
						}
						
						if (memo.indexOf('sign') > -1) {
							$('.part5').css('display','');
							$('.product-signs').css('display','');
						}
						
						if (memo.indexOf('payTime') > -1) {
							$('.part6').css('display','');
						}
						
						if (memo.indexOf('examTime') > -1) {
							$('.part7').css('display','');
						}
					}
					// 关联加载退费流程option
					$.ajax({
						type : 'post',
						url : ctx + '/returnServiceFlow/selectByModel',
						data : {productModelId : productModelId},
						dataType : 'json',
						success :function(info){
							if (info.status == 'success') {
								var opt = '<option value="">--请选择--</option>';
								for (var ff = 0; ff < info.list.length; ff++) {
									opt += '<option value="'+info.list[ff].returnServiceFlowId+'">' +info.list[ff].returnServiceFlowName+ '</option>';
								}
								$('#feeFlowId').html(opt);
								$('#feeFlowId').trigger('chosen:updated');
								$('#feeFlowId').chosen();
							}
						}
					})
				});

/**
 * 期次
 */
insertPreiod();
/**
 * 期次
 */
$('.paymentPeriod').on('click', '.operate-btn', function() {
	if ($(this).is('.fa-plus')) {
		insertPreiod();
	} 
	// 删除行
	if ($(this).is('.fa-minus')) {
		if ($('#paymentPeriodTable tbody tr').length > 1) {
			// 删除注入bootstrapValidator验证字段
			var $periodDay = $('#paymentPeriodTable tbody tr:last input[name="periodDay"]');
			var $periodScale = $('#paymentPeriodTable tbody tr:last input[name="periodScale"]');
			$('#addProductPrice').bootstrapValidator('removeField',$periodDay);
			$('#addProductPrice').bootstrapValidator('removeField',$periodScale);
			$('#paymentPeriodTable tr:last').remove();
		}
	}
})

/**
 * 考期
 */
$('.examinationDate').on('click', '.operate-btn', function() {
	// 增加行
	if ($(this).is('.fa-plus')) {
		addExamTimeTr();
	}
	// 删除行
	if ($(this).is('.fa-minus')) {
		if ($('#examinationDateTable tbody tr').length > 1) {
			// 删除注入bootstrapValidator验证字段
			var $cost = $('#examinationDateTable tbody tr:last input[name="cost"]');
			var $price = $('#examinationDateTable tbody tr:last input[name="price"]');
			$('#addProductPrice').bootstrapValidator('removeField',$cost);
			$('#addProductPrice').bootstrapValidator('removeField',$price);
			$('#examinationDateTable tr:last').remove();
		}
	}
})
// 第一个tr初始化下拉框
addExamTimeTr();
/**
 * 全局变量产品id
 */
var productId = '';

// 验证新增表单信息
$('#addProductInfo').bootstrapValidator(
			{
				message : 'This value is not valid',
//				excluded : [':disabled'],//[':disabled', ':hidden', ':not(:visible)']
				feedbackIcons : {
				invalid : 'glyphicon gluphicon-remove',
				validating : 'glyphicon glyohicon-refresh'
			},
		
			fields : {
				productName : {
					validators : {
						notEmpty : {
							message : '产品名称不能为空！'
						}
					}
				},
				downpaymentsRatio : {
					validators : {
						notEmpty : {
							message : '首付款比率不能为空！'
						},
						regexp : {
							regexp : /(^[0]{1}$)|(^[0]{1}\.\d{1,2}$)|(^[1]{1}\.0{1,2}$)|(^[1]{1}$)/,
							message : '首付款比率（范围0.00~1.00），最多保留两位小数'
						}
					}
				}
			}
		});

//提交产品
$('#addProductInfo').find('button.first-step').click(function (){
	if($('#department_id').val() == ""){
		$('.reg').text("产品归属不能为空！");
	}else{
		$('.reg').text("");
	}
	var $this = $(this);
	$('#addProductInfo').data('bootstrapValidator').validate();
	if (!$('#addProductInfo').data('bootstrapValidator')
		.isValid()) {
		return;
	}
	$(this).attr('disabled',true);
	var map = new Map();
	var attr_id = ''; // id属性值
	for (var i = 0; i < $('.infomsg').length; i++) {
		attr_id = $('.infomsg:eq(' + i + ')').attr('id');
		// table_id
		var table_id = attr_id + '_id';
		// table_name
		table_name = attr_id + '_name';
		map[table_id] = $('#' + attr_id).val();
		map[table_name] = $('#' + attr_id).find('option:selected')
				.text();
	}
	var infos = JSON.stringify(map);
	var options = $('#addProductInfo').serialize();
	options += '&columns=' + infos;
	// return false;
	// 比例不为空且提示范围
	$.ajax({
		url : ctx + "/product/addRecord",
		data : options,
		type : "post",
		dataType : "json",
		async : false,
		success : function(data) {
			toastr.info(data.msg);
			// 赋值productId
			productId = data.productId;
			$('#productId').val(productId);
			evaluatExamSchool();
			$('#WiredWizard li:first').removeClass('active')
					.addClass('complete');
			$('#WiredWizard li:last').addClass('active');
			$('#productInfo').removeClass('active');
			$('#productPrice').addClass('active');
		},
		error : function(msg) {
			flag = false;
			toastr.error("填写数据错误");
			$this.attr('disabled',false);
		}
	})
	
})

/**
 * 产品考期内弹窗展示
 */
$('body').on(
		'click',
		'.prices-edit',
		function() {// 招生价格弹窗
			$('.pricesEditModal').modal('show');
			var curInd = $(this).parents('tr').index();
			$('.pricesEditModal').attr('curInd', curInd);
			// 选择招生地区之后把选中值放入弹窗内table属性data-enSchool里
			var selectedSchool = $(this).parents('tr').find(
					'select.enrollSchool option:selected').val();
			var selectedSchool = [];
			$(this).parents('tr').find('select.enrollSchool option:selected')
					.each(function() {
						selectedSchool.push(JSON.parse($(this).val()));
					})
			$('#revenueCostTable').data('enSchool',
					JSON.stringify(selectedSchool));
			var vData1 = $(
					'#examinationDateTable tbody tr:eq(' + curInd
							+ ') td:eq(6) a>i').attr('data-price-en');
			var vData2 = $(
					'#examinationDateTable tbody tr:eq(' + curInd
							+ ') td:eq(6) a>i').attr('data-price-in');
			if (vData1 != undefined && vData1 != null) {
				view_price('#revenueCostTable', JSON.parse(vData1), 1, 2,
						selectedSchool);
			} else if ($('#revenueCostTable tbody tr').size() < 1) {
//				addPriceTr('#revenueCostTable', 1, 2, 1);
			}
			if (vData1 != undefined && vData1 != null) {
				view_price('#incurExpenseTable', JSON.parse(vData2), 1, 1,
						_examSchool);
			} else if ($('#incurExpenseTable tbody tr').size() < 1) {
//				addPriceTr('#incurExpenseTable', 1, 1, 1);
			}
		}).on(
		'click',
		'.serviveconfig-btn',
		function() { // 服务配置弹窗
			$('.serviceConfigModal').modal('show');
			var curInd = $(this).parents('tr').index();
			$('.serviceConfigModal').attr('curInd', curInd);
			// 选择招生地区之后把选中值放入弹窗内table属性data-enSchool里
			var selectedSchool = $(this).parents('tr').find(
					'select.enrollSchool option:selected').val();
			var selectedSchool = [];
			$(this).parents('tr').find('select.enrollSchool option:selected')
					.each(function() {
						selectedSchool.push(JSON.parse($(this).val()));
					})
			$('#productIncludeService').data('enSchool',
					JSON.stringify(selectedSchool));
			var serData = $(
					'#examinationDateTable tbody tr:eq(' + curInd
							+ ') td:eq(7) a>i').data('priceSer');
			if (serData != undefined && serData != null) {
				view_price('#productIncludeService', serData, 2, 0,
						selectedSchool);
			} else if ($('#productIncludeService tbody tr').size() < 1) {
				addPriceTr('#productIncludeService', 1, 0, 2);
			}
		})

// 第二步产品期次和考期以及相关信息的新增
$('#addProductPrice')
		.on(
				'click',
				'.secondSub',
				function() {
					$('#addProductPrice').data('bootstrapValidator').validate();
					if (!$('#addProductPrice').data('bootstrapValidator')
							.isValid()) {
						return;
					}
					var tips = false;
					$('#examinationDateTable select').each(function(){
						if($(this).val() == ''){
							var trInd = $(this).parents('td').index(),
								str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
							$(this).focus();
//							toastr.warning('有' + str + '未选择');
//							tips = true;
//							return false;
						}
					})
					if (tips) {
						return;
					}
					var payPeriods = new Array();
					var period = {};
					$('#paymentPeriodTable tbody tr').each(function() {
						period = $(this).find('.addPeriod').serializeObject();
						// 添加产品Id
						period.productId = productId;
						payPeriods.push(period);
					})
					// 期次数据打包json字符串
					var issues = '';
					issues = JSON.stringify(payPeriods);
					// 考期
					var examTimes = new Array();
					var examTime = {};
					var judgeExamTime = [];
					var breakOff = false;
					$('#examinationDateTable tbody tr')
							.each(
									function() {
										var exId = $(this).find('select[name="examTimeId"]').val();
										if (exId == 'undefined'||  exId == '' || exId == undefined) {
											return ;  
										}
										var rs = $.inArray(exId,judgeExamTime);
//										if (rs == -1) {
//											breakOff = true;
//											return false;
//										}
										examTime = $(this).find('.addExamTime')
												.serializeObject();
										examTime.productId = productId;
										// 招生地区
										var rec = examTime.recruits;
										var recArr = new Array();
										if (rec instanceof Array) {
											for (var i = 0; i < rec.length; i++) {
												var recObj = {};
												recObj = JSON.parse(rec[i]);
												recArr.push(recObj);
											}
										} else {
											recArr.push(JSON.parse(rec));
										}
										examTime.recruits = recArr;
										// 价格
										var priceInfo = new Array();

										$(this)
												.find('i.save-all')
												.each(
														function() {
															if ($(this).data(
																	'priceIn') != undefined
																	&& $(this)
																			.data(
																					'priceIn') != null) {
																var temp1 = JSON
																		.parse($(
																				this)
																				.attr(
																						'data-price-in'));
																for (var a = 0; a < temp1.length; a++) {
																	priceInfo
																			.push(temp1[a]);
																}
															}
															if ($(this).data(
																	'priceEn') != undefined
																	&& $(this)
																			.data(
																					'priceEn') != null) {
																var temp2 = JSON
																		.parse($(
																				this)
																				.attr(
																						'data-price-en'));
																for (var b = 0; b < temp2.length; b++) {
																	priceInfo
																			.push(temp2[b]);
																}
															}
															if ($(this).data(
																	'priceSer') != undefined
																	&& $(this)
																			.data(
																					'priceSer') != null) {
																var temp3 = JSON
																		.parse($(
																				this)
																				.attr(
																						'data-price-ser'));
																for (var c = 0; c < temp3.length; c++) {
																	priceInfo
																			.push(temp3[c]);
																}
															}
														})

										examTime.basePrices = priceInfo;
										examTimes.push(examTime);
									})
//					if(breakOff){// 考期重复
//						toastr.error('有重复考期，请检查');
//						$('.secondSub').attr('disabled', false);
//						return
//					}
					var argumentStr = JSON.stringify(examTimes);
					$('.secondSub').attr('disabled', true);
					$.ajax({
						url : ctx + '/product/second',
						type : 'post',
						dataType : 'json',
						data : {
							argument : argumentStr,
							issue : issues
						},
						success : function(data) {
							window.location.href = ctx + '/product/index';
						},
						error : function(msg) {
							$('.secondSub').attr('disabled', false);
						}
					})
				})

				
				
//产品归属验证
$('#ajaxTree').on("click","a",function(){
	if($('#department_id').val() == ""){
		$('.reg').text("");
	}else{
		$('.reg').text("");
	}
})

// 产品名称验证
$('#validateName').on('blur',function(){
	var $this = $(this);
	var val = $this.val();
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/product/selectAll',
		'data' : {'productName':val},
		'dataType': 'json',
		'success' : function(info){
			if (info.status == 'success') {
				if (val == '') {
					toastr.error('名称不能为空')
				} else if (info.list.length > 0) {
					toastr.error(val + '已经存在');
					$this.val('');
				}
			}
		}
	})
})
//// 2018/5/8新增字段--是否分期和分期首付款比率（isInstallment&downpaymentRatio）
//function installmentRelation(){
//	$('#isInstallment').on('change',function(){
//		var val1 = $(this).val();
//		if (val1 == 1) {
//			$('.relate-installment').css('display','');
//			$('.relate-installment').find('#downpaymentsRatio').attr('disabled',false);
//		} else {
//			$('.relate-installment').css('display','none');
//			$('.relate-installment').find('#downpaymentsRatio').attr('disabled',true);
//		} 
//	})
//	$('.relate-installment').find('#downpaymentsRatio').on('blur',function(){})
//}
