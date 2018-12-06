$(function() {
	$(document).find('input').attr('disabled',true);
	$(document).find('select').attr('disabled',true);
	$('body').find('.operate-btn').attr('style','display: none');
	// 页面初始化
	pageInit().init();
	// 上一步
	$('#addProductPrice .btn-prev').on('click', function() {
		$('#WiredWizard li:first').removeClass('complete').addClass('active');
		$('#WiredWizard li:last').removeClass();
		$('#productInfo').addClass('active');
		$('#productPrice').removeClass('active');
	})

	// 分步切换(产品查看和编辑)
	$('#WiredWizard li .step').on(
			'click',
			function() {
				var currentId = $(this).parent().attr('data-target');
				if (currentId == '#productInfo') {
					$('#WiredWizard li:first').removeClass('complete')
							.addClass('active');
					$('#WiredWizard li:last').removeClass();
					$('#productInfo').addClass('active');
					$('#productPrice').removeClass('active');
				}
				if (currentId == '#productPrice') {
					$('#WiredWizard li:first').removeClass('active').addClass(
							'complete');
					$('#WiredWizard li:last').addClass('active');
					$('#productInfo').removeClass('active');
					$('#productPrice').addClass('active');
				}
			})
	// 下一步
	$('#productInfo .btn-next').on(
			'click',
			function() {
				$('#WiredWizard li:first').removeClass('active').addClass(
						'complete');
				$('#WiredWizard li:last').addClass('active');
				$('#productInfo').removeClass('active');
				$('#productPrice').addClass('active');
			})

	var productId = $('#productId').val();
	var productModelId = $('#productModelId').val(); 
	// 关联加载退费流程option
	$.ajax({
		type : 'post',
		url : ctx + '/returnServiceFlow/selectByModel',
		data : {productModelId : productModelId},
		dataType : 'json',
		success :function(info){
			if (info.status == 'success') {
				var isExt = $('#hideFeeFlowId').val();
				var opt = '<option value="">--请选择--</option>';
				for (var ff = 0; ff < info.list.length; ff++) {
					if (info.list[ff].returnServiceFlowId == isExt) {
						opt += '<option value="'+info.list[ff].returnServiceFlowId+'" selected>' +info.list[ff].returnServiceFlowName+ '</option>';
					} else {
						opt += '<option value="'+info.list[ff].returnServiceFlowId+'">' +info.list[ff].returnServiceFlowName+ '</option>';
					}
				}
				$('#feeFlowId').html(opt);
				$('#feeFlowId').trigger('chosen:updated');
				$('#feeFlowId').chosen();
			}
		}
	})
	// 初始加载产品模型配置项
	$
			.ajax({
				url : ctx + '/product/getDynamicItems',
				type : 'post',
				dataType : 'json',
				data : {
					productId : productId,
					productModelId : productModelId
				},
				success : function(info) {
					if (info == null) {
						return;
					}
					var strItem = '';
					for (var i = info.length - 1; i >= 0; i--) {
						var itemName = info[i].itemName;
						var itemValue = info[i].itemValue;
						strItem += '<div class="form-group col-sm-4">'
								+ '	<label class="control-label col-sm-4 no-padding-right">'
								+ itemName
								+ '：</label>'
								+ '	<div class="col-sm-8">'
								+ '		<input class="form-control" id="productModel" value="'
								+ itemValue + '" disabled/>' + '	</div>'
								+ '</div>';
					}
					$('#infoMP').before(strItem);
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			})
	// 获取期次信息
	$
			.ajax({
				url : ctx + '/product/payPeriod',
				type : 'post',
				dataType : 'json',
				data : {
					productId : productId
				},
				success : function(resp) {
					var trHtml = '';
					var result = '';
					for (var i = 0; i < resp.length; i++) {
						trHtml += '<tr>'
								+ '<td>'
								+ resp[i].periodNum
								+ '</td>'
								+ '<td><input type="text" name="periodDay" class="form-control isExistPeriod" value="'
								+ resp[i].periodDay
								+ '" disabled/></td>'
								+ '<td><input type="text" name="periodScale" class="form-control isExistPeriod" value="'
								+ resp[i].periodScale
								+ '" disabled/></td>'
								+ '<td>'
								+ '<label> ';
							if (resp[i].serviceEnable == 1) {
								trHtml += '<span class="text"></span>否</label>';
							} else {
								trHtml += '<span class="text"></span>是</label>';
							}
							trHtml +=  '</td></tr>';
					}
					// 记录当前产品下期次数量
					$('#paymentPeriodTable').data('tLength', resp.length);
					$('#paymentPeriodTable tbody').append(trHtml);
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			})
//
	$.ajax({
		url : ctx + '/product/examSchool',
		type : 'post',
		data : {
			productId : productId
		},
		dataType : 'json',
		async : false,
		success : function(info) {
			_examSchool = info.list;
		},
		error : function(msg) {
			toastr.error('系统错误');
		}
	})
	// 获取考期信息
	$
			.ajax({
				url : ctx + '/product/examTime',
				type : 'post',
				dataType : 'json',
				async : false,
				data : {
					productId : productId
				},
				success : function(resp) {
					var strHtml = '';
					var dataValue = {};
					var dataValue2 = {};
					var index = 0;
					for (var k = 0; k < resp.length; k++) {
						// dataValue =
						// '{brochuresName:'+resp[k].brochuresName+',brochuresDetail:'+resp[k].brochuresDetail+'}';
						dataValue2 = resp[k].productExamTimeId;
						var startTime = transferDateFormat(resp[k].recruitStart);
						var endTime = transferDateFormat(resp[k].recruitEnd);
						var startEnd = startTime + ' - ' + endTime;
						var productExamTimeId = resp[k].productExamTimeId;
						var trHtml = '';
						trHtml += '<tr>'
								+ '<td><input type="hidden" disabled/>'
								+ '<input type="hidden" value="'
								+ productExamTimeId
								+ '" class="isExistExamTime" name="productExamTimeId"/>'
								+ '<input type="hidden" class="isExistExamTime" name="examTime" value="'
								+ resp[k].examTime
								+ '" disabled/>'
								+ '   <select type="text" class="form-control chosen-select examTime addExamTime" name="examTimeId" data-value="'
								+ resp[k].examTimeId
								+ '" disabled>'
								+ '   </select>'
								+ '</td>'
								+ '<td width="14%"><input type="text" class="form-control addExamTime" name="cost" value="'
								+ resp[k].cost
								+ '" disabled></td>'
								+ '<td width="14%"><input type="text" class="form-control addExamTime" name="price" value="'
								+ resp[k].price
								+ '" disabled></td>'
								+ '<td width="25%">'
								+ '   <div class="input-group"> '
								+ '       <input type="text" class="form-control duration addExamTime" name="duration" value="'
								+ startEnd
								+ '" disabled> '
								+ '       <span class="input-group-addon"><i class="fa fa-calendar"></i></span> '
								+ '   </div>'
								+ '</td>'
								+ '<td><select class="form-control selectpicker select1 enrollSchool addExamTime" title="--请选择--" multiple name="recruits"><option></option></select></td>'
								+ '<td>'
								+ '   <a class="edit"> '
								+ '       <i class="fa fa-folder-open-o blue brochures-view" data-bname="'
								+ resp[k].brochuresName
								+ '" data-bdetail=\''
								+ resp[k].brochuresDetail
								+ '\' data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i> '
								+ '       <input type="hidden" class="form-control brochuresName isExistExamTime" value="'
								+ resp[k].brochuresName
								+ '" name="brochuresName" disabled> '
								+ '       <input type="hidden" class="form-control brochuresDetail isExistExamTime" value=\''
								+ resp[k].brochuresDetail
								+ '\' name="brochuresDetail" disabled> '
								+ '   </a>'
								+ '</td>'
								+ '<td>'
								+ '   <a class="edit" data-prices=""> '
								+ '       <i class="fa fa-folder-open-o blue prices-edit" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i> '
								+ '   </a>'
								+ '</td>'
								+ '<td>'
								+ '	<a class="serviveconfig-btn"> '
								+ '		<i class="fa fa-folder-open-o blue" data-toggle="tooltip" data-placement="top" data-original-title="服务配置" title="查看"></i> '
								+ '	</a>' + '</td>' + '</tr>';
						$('#examinationDateTable').data('eLength', resp.length);
						$('#examinationDateTable tbody').append(trHtml);
						$('.select1').selectpicker({
							'width':'200px'
						});
						durationDate('.duration', '-');
						// 考期
						var selector = '#examinationDateTable tbody tr:last select[name="examTimeId"]';
						var xl = "";
						var timeO = "";
						for (var i = 0; i < _allExamTime.length; i++) {
							var examObj = {};
							examObj.examSettingId = _allExamTime[i].examSettingId;
							examObj.examDate = _allExamTime[i].examDate;
							examObj.endDate = _allExamTime[i].endDate;
							examObj.clearDate = _allExamTime[i].clearDate;
							if (resp[k].examTimeId == _allExamTime[i].examSettingId) {
								xl += "<option value="
										+ _allExamTime[i].examSettingId
										+ " data-value="
										+ JSON.stringify(examObj)
										+ " selected>"
										+ _allExamTime[i].examDate
										+ "</option>";
							} else {
								xl += "<option value="
										+ _allExamTime[i].examSettingId
										+ " data-value="
										+ JSON.stringify(examObj) + " >"
										+ _allExamTime[i].examDate
										+ "</option>";
							}
						}
						$(selector).html(
								'<option value="">--请选择--</option>' + xl);
						$(selector).trigger('chosen:updated');
						$(selector).chosen({
							no_results_text : "没有匹配项"
						});
						// 招生地区
						// 当前产品已有招生地区
						var existSchool = [];
						$.ajax({
							url : ctx + '/product/getEnrollV',
							type : 'post',
							dataType : 'json',
							async : false, // 同步
							data : {
								productExamTimeId : productExamTimeId
							},
							success : function(data) {
								existSchool = data;
							},
							error : function() {
								toastr.error('服务器错误');
							}
						})
						var opt = '';
						var flag = false;
						var enselected = [];
						var allEn = [];
						for (var i = 0; i < _allSE.length; i++) {
							var school = {};
							school.schoolId = _allSE[i].departmentId;
							school.schoolName = _allSE[i].fullName;
							allEn.push(school);
							for (var j = 0; j < existSchool.length; j++) {
								if (_allSE[i].departmentId == existSchool[j].department_id) {
									enselected.push(school);
									opt += '<option value='
											+ _allSE[i].departmentId
											+ ' selected disabled>' + _allSE[i].fullName
											+ '</option>';
									flag = true;
									break;
								}
							}
							if (flag) {
								flag = false;
								continue;
							}
							opt += '<option value=' + _allSE[i].departmentId
									+ ' disabled>' + _allSE[i].fullName + '</option>';
						}
						var selector2 = '#examinationDateTable tbody tr:last select[name="recruits"]';
						$(selector2).html(opt);
						$(selector2).selectpicker('refresh');
						 
						// 数据暂存到标签上
						$('#examinationDateTable tbody tr:last').find(
								'.prices-view').data('selectedSchool',
								enselected);
						$('#examinationDateTable tbody tr:last').find(
								'.prices-view').data('allSchool', allEn);
						
						// 将初始数据存储到对应的<i>标签的对应属性上
						$.ajax({
							url : ctx + '/product/queryPriceBase',
							type : 'post',
							data : {
								productExamTimeId : productExamTimeId
							},
							dataType : 'json',
							async : false,
							success : function(info) {
								if (info.status == 'success') {
									if (info.list != null
											&& info.list.length > 0) {
										view_price(
												'#revenueCostTable',
												info, 1, 2, enselected);
										view_price(
												'#incurExpenseTable',
												info, 1, 1, _examSchool);
										view_price(
												'#productIncludeService',
												info, 2, 0, enselected);
										var saveSerP = savePrice(
												'#productIncludeService',
												'.addPrice', 9);
										$('#examinationDateTable tbody tr:eq('+ k+ ') td:eq(7) a>i').attr('data-price-ser',JSON.stringify(saveSerP));
										var saveInfo1 = savePrice('#revenueCostTable','.addPrice', 7);
										$('#examinationDateTable tbody tr:eq('+ k+ ') td:eq(6) a>i').attr('data-price-en',JSON.stringify(saveInfo1));
										var saveInfo2 = savePrice('#incurExpenseTable','.addPrice', 7);
										$('#examinationDateTable tbody tr:eq('+ k+ ') td:eq(6) a>i').attr('data-price-in',JSON.stringify(saveInfo2));
										$('#revenueCostTable tbody tr').remove();
										$('#incurExpenseTable tbody tr').remove();
										$('#productIncludeService tbody tr').remove();
									}
								}
							}
						})
					}
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			})

	// 招简和价格
	$('body')
			.on(
					'click',
					'.brochures-view',
					function() {	
						// 标记当前招简弹窗对应外层tr索引
						var index = $(this).parents('tr').index();
						$('.brochuresEditModal').attr('curIndex', index);
						var brochuresName = $(this).siblings(
								'input[name="brochuresName"]').val();
						var brochuresDetail = $(this).siblings(
								'input[name="brochuresDetail"]').val();
						// var brochuresName = $(this).data('bname');
						// var brochuresDetail = $(this).data('bdetail');
						$('.brochuresEditModal').modal('show');
						$('.brochuresEditModal').find('#brochName').html(
								brochuresName);
/*						$('.brochuresEditModal').find('#brochName').val(
								brochuresName);*/
						$('.brochuresEditModal').find('#descp').html(brochuresDetail);
					}).on(
					'click',
					'.prices-view',
					function() {
						// 标记当前招简弹窗对应外层tr索引
						var index = $(this).parents('tr').index();
						$('.pricesEditModal').attr('curIndex', index);
						$('.pricesEditModal').modal('show');
						
						// 价格编辑之后
						var afterEdit = $(this).data('editEPrice');
						var afterAdd = $(this).data('addEPrice');

						// 暂存当前产品考期的选中招生地区到数组变量enrolls2，包括编辑新增的地区
						var enrolls2 = [];
						var enrollSelected = [];
						$(this).parents('tr').find(
								'select[name="enrollSchoolId"]').find(
								'option:selected').each(function() {
							enrollSelected.push($(this).val());
						});
						if (enrollSelected != null) {
							for (var en = 0; en < enrollSelected.length; en++) {
								var enrollSelectedName = $(this).parents('tr')
										.find(
												'select[name="enrollSchoolId"] option[value="'
														+ enrollSelected[en]
														+ '"]').text();
								var enJson = {
									schoolId : enrollSelected[en],
									schoolName : enrollSelectedName
								}
								enrolls2.push(enJson);
							}
						}
						$('#registerGuideTable')
								.data('selectedAfter', enrolls2);
						var productExamTimeId = $(this).data('value');

						$('#registerGuideTable').data('preti',
								productExamTimeId);
						if (productExamTimeId == null) {
							productExamTimeId = '';
						}
						var data = {
							productExamTimeId : productExamTimeId
						};
						// 清除之前的数据和html
						$('#registerGuideTable tbody').find('tr').remove();
					})
	// ***************************************
	// 编辑页面方法***********************************************//
	// 子产品展示
	function sonProductShow() {
		// 获取
		var selectedBS = $('#childProduct').data('value');
		// 遍历
		var bs = '';
		if (selectedBS != undefined) {
			for (var i = 0; i < selectedBS.length; i++) {
				if (i == selectedBS.length - 1) {
					bs += selectedBS[i].productName;
					continue;
				}
				bs = bs + selectedBS[i].productName + ' , ';
			}
		}
		$('#childProduct').val(bs);
		$('#childProduct').attr('title',bs);
	}
	sonProductShow();
	// 考试地区
	function examSchoolShow() {
		// 获取
		var selectedBS = $('#branchSchoolId').data('value');
		// 遍历
		var bs = '';
		for (var i = 0; i < selectedBS.length; i++) {
			if (i == selectedBS.length - 1) {
				bs += selectedBS[i].full_name;
				continue;
			}
			bs = bs + selectedBS[i].full_name + ',';
		}
		$('#branchSchoolId').val(bs);
		$('#branchSchoolId').attr('title',bs);
	}
	examSchoolShow();
	// 初始化学历
	$.ajax({
		url : ctx + '/product/edu',
		type : 'POST',
		data : {
			attrType : 3
		},
		dataType : 'json',
		success : function(data) {
			var selectedData = $('#hideEdu').val();
			var xl = "";
			for (var i = 0; i < data.list.length; i++) {
				if (selectedData == data.list[i].studentAttrId) {
					xl += "<option value=" + data.list[i].studentAttrId
							+ " selected>" + data.list[i].typeName
							+ "</option>";
				} else {
					xl += "<option value=" + data.list[i].studentAttrId + ">"
							+ data.list[i].typeName + "</option>";
				}
			}
			$("#edu").html('<option value="">--请选择--</option>' + xl);
			$("#edu").trigger('chosen:updated');
			$("#edu").chosen({
				no_results_text : "没有匹配项"
			});
		},
		error : function(response) {
			toastr.error("系统错误");
		}
	});

	// 初始化科目
	$('#subject').attr('disabled',false);
			$.ajax({
				url : ctx + '/product/configs',
				type : 'POST',
				data : {
					configType : 6
				},
				dataType : 'json',
				success : function(data) {
					var selectedData = $('#subject').data('value');
						var xl = "";
						var mark = 0;
						for (var i = 0; i < data.length; i++) {
							for (var k = 0; k < selectedData.length; k++) {
								if (selectedData[k].config_id == data[i].configId) {
									xl += "<option value="
											+ data[i].configId
											+ " selected disabled>"
											+ data[i].configDesc
											+ "</option>";
									mark = 1;
									break;
								}
							}
							if (mark == 1) {
								mark = 0;
								continue;
							}
							xl += "<option value=" + data[i].configId
									+ " disabled >" + data[i].configDesc
									+ "</option>";
						}
						$('#subject').html(xl);
						$('#subject').selectpicker('refresh');
						
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			});

	// 考期与起止时间联动
	$('body').on(
			'change',
			'.examTime',
			function() {
				var jsonExamTime = $(this).find('option:selected')
						.data('value');
				var startEnd = transferDateFormat(jsonExamTime.endDate) + ' - '
						+ transferDateFormat(jsonExamTime.clearDate);
				$(this).parent().parent().find('.duration').val(startEnd);
				durationDate('.duration', '-');
			})

	// 地区
	$('#diqu').find('select').attr('disabled',false);
	$.ajax({
		url : ctx + '/product/address',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			var selectedData = $('#area').data('value');
			var opt = "";
			var mark = 0;
			for (var i = 0; i < data.list.length; i++) {
				for (var k = 0; k < selectedData.length; k++) {
					if (selectedData[k].address_id == data.list[i].addressId) {
						opt += "<option value=" + data.list[i].addressId
								+ " selected disabled>" + data.list[i].fullName
								+ "</option>";
						mark = 1;
						break;
					}
				}
				if (mark == 1) {
					mark = 0;
					continue;
				}
				opt += "<option value=" + data.list[i].addressId + " disabled >"
						+ data.list[i].fullName + "</option>";
			}
			$("#area").html(opt);
			$("#area").selectpicker('refresh');
			
		},
		error : function(response) {
			toastr.error("系统错误");
		}
	});

	// 报考为是时，联动显示
	function examFlowInit() {
		var isApy = $('#isApply').val();
		var applyS = $('.applySupplier').data('value');
		if (isApy == 1) {
			$('.flowOptions').attr('style', '');
			$('.applySupplier option[value="' + applyS + '"]').attr('selected',
					'selected');
		}
	}
	// 初始化报考流程
	$.ajax({
		url : ctx + '/product/examFlow',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			var selectedData = $('#hideExamFlowId').val();
			var ef = "";
			for (var i = 0; i < data.list.length; i++) {
				if (selectedData == data.list[i].examFlowId) {
					ef += "<option value=" + data.list[i].examFlowId
							+ " selected>" + data.list[i].examFlowName
							+ "</option>";
				} else {
					ef += "<option value=" + data.list[i].examFlowId + ">"
							+ data.list[i].examFlowName + "</option>";
				}
			}
			$("#examFlowId").html('<option value="">--请选择--</option>' + ef);
			$("#examFlowId").trigger('chosen:updated');
			$("#examFlowId").chosen({
				no_results_text : "没有匹配项"
			});
		},
		error : function(response) {
			toastr.error("系统错误");
		}
	});
	examFlowInit();

	// 报考流程联动
	$('select[name="isApply"]').on('change', function() {
		// 当选择报考时（值为1），展示服务方和流程选择框
		if ($(this).val() == 1) {
			$('.flowOptions').show();
		} else {
			$('.flowOptions').hide();
		}
	})

	// 报名表信息
	$.ajax({
				url : ctx + '/product/configs',
				type : 'post',
				dataType : 'json',
				data : {
					configType : 1
				},
				success : function(resp) {
					var strHtml = '';
					var signsJson = signsBase;
					signsJson = JSON.parse(signsJson);
					for (var k = 0; k < resp.length; k++) {
						// 判断报名表内容是否为空，如果为空则不展示该空项目
						if (resp[k].configDesc.trim().length != 0) {
							for (var l = 0; l < signsJson.length; l++) {
								if (signsJson[l].config_id == resp[k].configId) {
									strHtml += '<div class="form-group col-sm-12">'
											+ '<div class="col-sm-12">'
//											+ '<label> <input type="checkbox" class="proRelatInfo" checked name="sign" value="'
//											+ resp[k].configId
//											+ '">'
											+ '<span class="text"></span>'
											+ resp[k].configDesc
											+ '</label>'
											+ '</div>' + '</div>';
									break;
								}
							}
//							// 如果当前被选择项已添加，则跳过该条数据
//							if (mark == 1) {
//								mark = 0;
//								continue;
//							}
//							strHtml += '<div class="form-group col-sm-12">'
//									+ '<div class="col-sm-12">'
//									+ '<label> <input type="checkbox" class="proRelatInfo" name="sign" value="'
//									+ resp[k].configId + '">'
//									+ '<span class="text"></span>'
//									+ resp[k].configDesc + '</label>'
//									+ '</div>' + '</div>';
						}
					}
					$('.product-signs').append(strHtml);
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			})
	// 初始化费用类别
	$.ajax({
		url : ctx + '/product/expenseCategories',
		type : 'POST',
		dataType : 'json',
		success : function(info) {
			$('#registerGuideTable').data('expensesType', info);
		},
		error : function(response) {
			toastr.error("系统错误");
		}
	});

	// 初始化所有费用类别和费用协议关系，以Map<expensesTypeId,List<ExpensesDetail>>形式存储
	$.ajax({
		url : ctx + '/product/getTypeAndProtocols',
		type : 'post',
		dataType : 'json',
		success : function(resp) {
			$('#registerGuideTable').data('value', resp);
		},
		error : function(response) {
			toastr.error("系统错误");
		}
	})

	/**
	 * 分校和费用类别唯一联动 设置点击分校费用种类联动 暂不设置点击费用种类联动
	 */
	$('#registerGuideTable')
			.on(
					'change',
					'select.priceSchool',
					function() {
						// 所有费用类别
						var exTypes = $('#registerGuideTable').data(
								'expensesType');
						var all_type = [];
						for (var m = 0; m < exTypes.list.length; m++) {
							all_type.push((exTypes.list[m].expensesTypeName
									+ '~' + exTypes.list[m].expensesTypeId));
						}
						// 已选费用类别
						var is_selected = [];
						// 选中分校id
						var sId = $(this).val();
						$(this)
								.parents('tr')
								.siblings('tr')
								.each(
										function() {
											var scId = $(this).find(
													'select[name="schoolId"]')
													.val();
											if (scId != null) {
												if (!(scId instanceof Array)) {
													var scIz = [];
													scIz.push(scId);
													scId = scIz;
												}
												if (sId != null) {
													for (var e = 0; e < sId.length; e++) {
														for (var f = 0; f < scId.length; f++) {
															if (scId[f] == sId[e]) {
																var vl = $(this)
																		.find(
																				'select[name="dataExpensesTypeId"] option:selected')
																		.text()
																		+ '~'
																		+ $(
																				this)
																				.find(
																						'select[name="dataExpensesTypeId"] option:selected')
																				.val();
																is_selected
																		.push(vl);
															}
														}
													}
												}
											}
										});
						for (var n = 0; n < is_selected.length; n++) {
							all_type.removeByValue(is_selected[n]);
						}
						if (sId == null) {
							all_type = [];
						}
						var etOption = '';
						for (var x = 0; x < all_type.length; x++) {
							var v = all_type[x].split('~');
							etOption += '<option value="' + v[1] + '">' + v[0]
									+ '</option>';
						}
						$(this).parents('tr').find(
								'select[name="dataExpensesTypeId"]').html(
								'<option value="">--请选择--</option>' + etOption);
						$(this).parents('tr').find(
								'select[name="dataExpensesTypeId"]').trigger(
								'chosen:updated');
						$(this).parents('tr').find(
								'select[name="dataExpensesTypeId"]').chosen({
							no_results_text : "没有匹配项",
							search_contains : true
						});
					})

	// 招简编辑完成后点击确定按钮，关闭弹窗
	$('.brochuresEditModal')
			.on(
					'click',
					'.save-brochures',
					function() {
						// 清除弹窗内容，以及索引标记
						$('#brochuresName').val('');
						$(
								document.getElementsByTagName('iframe')[0].contentWindow.document.body)
								.html('');
						$('.brochuresEditModal').attr('curIndex', '');
						$('.brochuresEditModal').modal('hide');
					})
			.on(
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
	// select[name="examTimeId"]选中之后，input[name="examTime"] 赋值
	$('#examinationDateTable').on(
			'change',
			'select[name="examTimeId"]',
			function() {
				var examTime = $(this).find('option:selected').text();
				$(this).parents('tr').find('input[name="examTime"]').val(
						examTime);
			})
			
				var memo = $('#productModel').attr('data-memo');
	// 重新隐藏
	$('.hideItem').css('display','none');
	
	$('.part1').css('display','none');
	$('.part2').css('display','none');
	$('.part3').css('display','none');
	$('.part4').css('display','none');
	$('.part5').css('display','none');
	$('.part6').css('display','none');
	$('.part7').css('display','none');
	
	// 其他模块展示情况
	if (memo != 'undefined' && memo != '' && memo != undefined) {
		if (memo.indexOf('age') > -1) {
			$('.part1').css('display','');
			$('#age').parents('.hideItem').css('display','');
		}
		if (memo.indexOf('edu') > -1) {
			$('.part1').css('display','');
			$('#hideEdu').parents('.hideItem').css('display','');
		}
		if (memo.indexOf('area') > -1) {
			$('.part1').css('display','');
			$('#diqu').parents('.hideItem').css('display','');
		}
		
		if (memo.indexOf('isApply') > -1) {
			$('.part2').css('display','');
			$('#isApply').parents('.hideItem').css('display','');
		} else {
			$('#hideExamFlowId').css('display','none');
		}
		if (memo.indexOf('examFlowId') > -1) {
			$('.part2').css('display','');
			$('#hideExamFlowId').parents('.hideItem').css('display','');
		}
		
		if (memo.indexOf('feeFlowId') > -1) {
			$('.part3').css('display','');
			$('#hideFeeFlowId').parents('.hideItem').css('display','');
		}
		
		if (memo.indexOf('subject') > -1) {
			$('.part4').css('display','');
			$('#subject').parents('.hideItem').css('display','');
		}
		
		if (memo.indexOf('sign') > -1) {
			$('.part5').css('display','');
			$('.signs').css('display','');
		}
		
		if (memo.indexOf('payTime') > -1) {
			$('.part6').css('display','');
		}
		
		if (memo.indexOf('examTime') > -1) {
			$('.part7').css('display','');
		}
	}
})

/**
 * 产品考期内弹窗展示
 */
$('body')
		.on(
				'click',
				'.prices-edit',
				function() {// 招生价格弹窗
					$('.pricesEditModal').modal('show');
					var curInd = $(this).parents('tr').index();
					var vData1 = $(
							'#examinationDateTable tbody tr:eq(' + curInd
									+ ') td:eq(6) a>i').attr('data-price-en');
					var vData2 = $(
							'#examinationDateTable tbody tr:eq(' + curInd
									+ ') td:eq(6) a>i').attr('data-price-in');
					view_look('#revenueCostTable', JSON.parse(vData1), 1, 2);
					view_look('#incurExpenseTable', JSON.parse(vData2), 1, 1);
				/*	
					var curIndex = $(this).parents('tr').index();
					var productExamTimeId = $('#examinationDateTable tbody tr:eq('+curIndex+') input[name="productExamTimeId"]').val();
					$.ajax({
						url : ctx + '/product/queryPriceBase',
						type : 'post',
						data : {productExamTimeId : productExamTimeId},
						dataType : 'json',
						success : function(info) {
							if (info.list != null && info.list.length > 0) {
								view_look('#revenueCostTable', info, 1, 2);
								view_look('#incurExpenseTable', info, 1, 1);
							}
						}
					})*/
				})
		.on(
				'click',
				'.serviveconfig-btn',
				function() { // 服务配置弹窗
					$('.serviceConfigModal').modal('show');
					var curInd = $(this).parents('tr').index();
					var serData = $(
							'#examinationDateTable tbody tr:eq(' + curInd
									+ ') td:eq(7) a>i').attr('data-price-ser');
					view_look('#productIncludeService', JSON.parse(serData), 2, 0);
					
				/*	var curIndex = $(this).parents('tr').index();
					var productExamTimeId = $('#examinationDateTable tbody tr:eq('+curIndex+') input[name="productExamTimeId"]').val();
					$.ajax({
						url : ctx + '/product/queryPriceBase',
						type : 'post',
						data : {productExamTimeId : productExamTimeId},
						dataType : 'json',
						success : function(info) {
							if (info.list != null && info.list.length > 0) {
								view_look('#productIncludeService', info, 2, 0);
								
							} 
						}
					})*/
				})
// 关闭服务弹窗
$('.btnbase').on('click','.close-price',function(){
	$(this).parents('.btnbase').siblings('div').find('tbody tr').remove();
})
// / 关闭价格弹窗
$('.btnservice').on('click','.close-price',function(){
	$(this).parents('.btnservice').siblings('table').find('tbody tr').remove();
})

/**
 * 
 * @param tableId
 * @param info
 * @param type
 *            1-基础 2-服务
 * @param etype
 *            0-所有 1-支出 2-收益
 * @returns
 */
function view_look(tableId, data, type, etype){
	if (data == undefined || data == null || data.length < 1) {
		return 
	}
	var index = 1;  
//	$(tableId).attr('tLength',data.length);
	// 分校
	for (var k = data.length-1; k >= 0; k--) {
		var enrollSE = '';
		for (var all = 0; all < _allSE.length; all++) {
			for (var enr = 0; enr < data[k].recruitEnroll.length; enr++) {
				if (data[k].recruitEnroll[enr].schoolId == _allSE[all].departmentId) {
					/*if (enr == data[k].recruitEnroll.length-1) {
						enrollSE += _allSE[all].fullName;
					} else {*/
						enrollSE += _allSE[all].fullName + ' ';
//					}
				}
			}
		}
		
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
				+ '">'
				+ enrollSE
				+ '</td>';
		// 价格详情
		for (var f = 0; f < data[k].priceDetail.length; f++) {
			// 费用种类
			var exopt;
			for (var m = 0; m < _expenseUnite.length; m++) {
				
				if (_expenseUnite[m].type.type == 2) {
					if (_expenseUnite[m].type.expensesTypeId == data[k].priceDetail[f].dataExpensesTypeId) {
						exopt = _expenseUnite[m].type.expensesTypeName;
					}
				} else if (_expenseUnite[m].type.expensesType == etype) {
					if (_expenseUnite[m].type.expensesTypeId == data[k].priceDetail[f].dataExpensesTypeId) {
						exopt = _expenseUnite[m].type.expensesTypeName;
					} 
				}
			}
			// 费用协议
			var exStr = ''; 
			var ex = [];
			if (data[k].priceDetail[f].ded != undefined && data[k].priceDetail[f].ded instanceof Array) {
				var ded = data[k].priceDetail[f].ded;
				for (var er = 0; er < ded.length; er++) {
					ex.push(JSON.parse(ded[er]));
				}
			}
			for (var z = 0; z < ex.length; z++) {
				if (z < ex.length-1) {
					exStr += ex[z].dataExpensesDetailName + '，';
				} else {
					exStr += ex[z].dataExpensesDetailName;
				}
			}
			// str
			if (f > 0) {
				str = '<tr child-tr = parent-'
					+ index
					+ ' class="son '
					+ 'groupM'
					+ index
					+ '">';
			}
			// 服务
			if (type == 2) {
				var serNa;
				for (var l = 0; l < _productServer.length; l++) {
					if (_productServer[l].productServiceId == data[k].priceDetail[f].productServiceId) {
						serNa = _productServer[l].productServiceName;
					}
				}
				str += '    <td>'
					+ serNa
					+ '    </td>';
			}
			str += '<td  class="costCategory">'
				+ '    <div class="col-sm-10 no-padding">'
				+ exopt
				+ '    </div>'
				+ '</td>'
				+ '<td width="13%" class="form-group">'
				+ data[k].priceDetail[f].money
				+ '</td>'
				+ '<td width="13%" class="form-group">'
				+ data[k].priceDetail[f].moneyLine
				+ '</td>'
				+ '<td>'
				+ '    <label>';
			// 判断是否锁定
			if (data[k].priceDetail[f].serviceEnable == 0) {
				str += '是';
			} else {
				str += '否';
			}
			str	+= '        <span class="text"></span>'
				+ '    </label>'
				+ '</td>'
				+ '<td>'
				+ exStr
				+ '</td>';
			
			if (type == 2) {
				str	+= '<td>' 
					+ '    <label>';
				// 是否必须(存储需要跟其他逻辑相反)
				if (data[k].priceDetail[f].isRequired == 1) {
					str	+= '是';
				} else {
					str	+= '否';
				}
				str	+= '        <span class="text"></span>' 
					+ '    </label>' 
					+ '</td>';
			}
			
			str	+= '<td>'
				+ '		<label>';
			// 判断是否禁用
			if (data[k].priceDetail[f].enable == 0) {
				str	+= '是';
			} else {
				str	+= '否';
			}
			str	+= '        <span class="text"></span>' 
				+ '    </label>' 
				+ '</td>'
				+ '</tr>';
			$(tableId + ' tbody').append(str);
		}
		index++;
	}
}

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
function view_price(tableId, info, type, etype, selectedSchool) { 
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
							schooljson.schoolId = selectedSchool[h].schoolId;
							optS += '<option value=\''
									+ JSON.stringify(schooljson)
									+ '\' data-value="'
									+ selectedSchool[h].schoolId
									+ '" selected>' + sc[j] + '</option>';
							flag = false;
							break;
						}
					} else if (type == 2
							&& selectedSchool[h].schoolName == sc[j]) {
						schooljson.schoolId = selectedSchool[h].schoolId;
						optS += '<option value=\'' + JSON.stringify(schooljson)
								+ '\' data-value="'
								+ selectedSchool[h].schoolId + '" selected>'
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

// 返回列表页面
function Tolist() {
	window.location.href = ctx + '/product/index';
}
