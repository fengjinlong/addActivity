$(function() {
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

	var productId = $('input[name="productId"]').val();
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
								+ itemValue + '"： readonly/>' + '	</div>'
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
					var result = '';
					for (var i = 0; i < resp.length; i++) {
						var trHtml = '<tr>'
								+ '<td>'
								+ resp[i].periodNum
								+ '<input type="hidden" name="periodNum" class="form-control isExistPeriod" value="'
								+ resp[i].periodNum
								+ '" readonly/>'
								+ '<input type="hidden" name="productPayPeriodId" class="isExistPeriod" value="'
								+ resp[i].productPayPeriodId
								+ '"/></td>'
								+ '<td class="form-group"><input type="text" name="periodDay" class="form-control isExistPeriod" value="'
								+ (resp[i].periodDay==null?'null':resp[i].periodDay)
								+ '" /></td>'
								+ '<td class="form-group"><input type="text" name="periodScale" class="form-control isExistPeriod" value="'
								+ resp[i].periodScale + '" /></td>' + '<td>'
								+ '<label> ';
						if (resp[i].serviceEnable == 1) {
							trHtml += '<input type="checkbox" class="suspendService isExistPeriod" name="serviceEnable" value="0">';
						} else {
							trHtml += '<input type="checkbox" class="suspendService isExistPeriod" name="serviceEnable" value="0" checked>';
						}
						trHtml += '<span class="text"></span>终止服务 </label>'
								+ '</td>' + '</tr>';
						$('#paymentPeriodTable tbody').append(trHtml);
						// 注入bootstrapValidator验证字段
						var $periodDay = $('#paymentPeriodTable tbody tr:last input[name="periodDay"]');
						var $periodScale = $('#paymentPeriodTable tbody tr:last input[name="periodScale"]');
						$('#addProductPrice').bootstrapValidator('addField',
								$periodDay);
						$('#addProductPrice').bootstrapValidator('addField',
								$periodScale);
					}
					// 记录当前产品下期次数量
					$('#paymentPeriodTable').attr('tLength', resp.length);
				},
				error : function(response) {
					toastr.error("系统错误");
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
					// 记录当前考期数量
					$('#examinationDateTable').attr('tLength', resp.length);
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
						trHtml += '<tr class="isExistExam">'
								+ '<td><input type="hidden" disabled/>'
								+ '<input type="hidden" name="productExamTimeId" value="'
								+ productExamTimeId
								+ '" class="isExistExamTime getExamTime" name="productExamTimeId"/>'
								+ '<input type="hidden" class="isExistExamTime getExamTime" name="examTime" value="'
								+ resp[k].examTime
								+ '"/>'
								+ '   <select type="text" class="form-control chosen-select examTime getExamTime" name="examTimeId" data-value="'
								+ resp[k].examTimeId
								+ '">'
								+ '   </select>'
								+ '</td>'
								+ '<td width="10%" class="form-group"><input type="text" class="form-control getExamTime" name="cost" value="'
								+ resp[k].cost
								+ '"></td>'
								+ '<td width="10%" class="form-group"><input type="text" class="form-control getExamTime" name="price" value="'
								+ resp[k].price
								+ '"></td>'
								+ '<td width="25%">'
								+ '   <div class="input-group"> '
								+ '       <input type="text" class="form-control duration getExamTime" name="duration" value="'
								+ startEnd
								+ '" > '
								+ '       <span class="input-group-addon"><i class="fa fa-calendar"></i></span> '
								+ '   </div>'
								+ '</td>'
								+ '<td><select class="form-control selectpicker enrollSchool getExamTime" title="--请选择--" multiple name="recruits"><option></option></select></td>'
								+ '<td>'
								+ '   <a class="edit"> '
								+ '       <i class="fa fa-edit blue brochures-edit"'
								+ '  data-toggle="tooltip" data-placement="top" data-original-title="查看" title=""></i> '
								+ '       <input type="hidden" class="form-control brochuresName getExamTime" value="'
								+ resp[k].brochuresName
								+ '" name="brochuresName"> '
								+ '       <input type="hidden" class="form-control brochuresDetail getExamTime" value=\''
								+ resp[k].brochuresDetail
								+ '\' name="brochuresDetail"> '
								+ '   </a>'
								+ '</td>'
								+ '<td>'
								+ '   <a class="edit" data-prices=""> '
								+ '       <i class="fa fa-edit blue prices-edit isExist save-all" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title=""></i> '
								+ '   </a>'
								+ '</td>'
								+ '<td>'
								+ '	<a class="serviveconfig-btn isExist"> '
								+ '		<i class="fa fa-cog blue isExist save-all" data-toggle="tooltip" data-placement="top" data-original-title="服务配置" title=""></i> '
								+ '	</a>' + '</td>' + '</tr>';
						$('#examinationDateTable').data('eLength', resp.length);
						$('#examinationDateTable tbody').append(trHtml);
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
							school.addressId = _allSE[i].departmentId;
							school.schoolName = _allSE[i].fullName;
							allEn.push(school);
							var enroll = {};
							enroll.addressId = _allSE[i].departmentId;
							enroll.schoolName = _allSE[i].fullName;
							for (var j = 0; j < existSchool.length; j++) {
								if (_allSE[i].departmentId == existSchool[j].department_id) {
									enselected.push(school);
									opt += '<option value='
											+ JSON.stringify(enroll)
											+ ' selected disabled>'
											+ _allSE[i].fullName + '</option>';
									flag = true;
									break;
								}
							}
							if (flag) {
								flag = false;
								continue;
							}
							opt += '<option value=' + JSON.stringify(enroll)
									+ '>' + _allSE[i].fullName + '</option>';
						}
						var selector2 = '#examinationDateTable tbody tr:last select[name="recruits"]';
						$(selector2).html(opt);
						$(selector2).selectpicker({
							'liveSearch' : true,
							'liveSearchPlaceholder' : '请输入关键字',
							'actionsBox' : true,
							'selectAllText' : '全选',
							'deselectAllText' : '取消',
							'width':'290px'
						});
						// 注入bootstrapValidator验证字段
						var $cost = $('#examinationDateTable tbody tr:last input[name="cost"]');
						var $price = $('#examinationDateTable tbody tr:last input[name="price"]');
						$('#addProductPrice').bootstrapValidator('addField',
								$cost);
						$('#addProductPrice').bootstrapValidator('addField',
								$price);
						// 数据暂存到标签上
						$('#examinationDateTable tbody tr:last').find(
								'.prices-view').data('selectedSchool',
								enselected);
						$('#examinationDateTable tbody tr:last').find(
								'.prices-view').data('allSchool', allEn);
						// 将初始数据存储到对应的<i>标签的对应属性上
						$
								.ajax({
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
												var reCount = common_price(
														'#revenueCostTable',
														info, 1, 2, enselected);
												// 记录源数据父tr个数
												$('#examinationDateTable tbody tr:last td:eq(6) a>i').attr('re-length',reCount);
												var inCount = common_price(
														'#incurExpenseTable',
														info, 1, 1, _examSchool);
												// 记录源数据父tr个数
												$('#examinationDateTable tbody tr:last td:eq(6) a>i').attr('in-length',inCount);
												var serCount = common_price(
														'#productIncludeService',
														info, 2, 0, enselected);
												// 记录源数据父tr个数
												$('#examinationDateTable tbody tr:last td:eq(7) a>i').attr('ser-length',reCount);
												var saveSerP = savePrice(
														'#productIncludeService',
														'.addPrice', 9);
												$(
														'#examinationDateTable tbody tr:eq('
																+ k
																+ ') td:eq(7) a>i')
														.attr(
																'data-price-ser',
																JSON
																		.stringify(saveSerP));
												var saveInfo1 = savePrice(
														'#revenueCostTable',
														'.addPrice', 7);
												$(
														'#examinationDateTable tbody tr:eq('
																+ k
																+ ') td:eq(6) a>i')
														.attr(
																'data-price-en',
																JSON
																		.stringify(saveInfo1));
												var saveInfo2 = savePrice(
														'#incurExpenseTable',
														'.addPrice', 7);
												$(
														'#examinationDateTable tbody tr:eq('
																+ k
																+ ') td:eq(6) a>i')
														.attr(
																'data-price-in',
																JSON
																		.stringify(saveInfo2));
												$('#revenueCostTable tbody tr')
														.remove();
												$('#incurExpenseTable tbody tr')
														.remove();
												$(
														'#productIncludeService tbody tr')
														.remove();
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
	// 子产品展示
	if ($('#productForm').val() == 0) {
		$('.childProductBox').css('display','');
	}
	function sonProductShow() {
		// 获取
		var selectedBS = $('#childProduct').data('value');
		// 遍历
		var bs = [];
		if (selectedBS != undefined) {
			if (!(selectedBS instanceof Array) && selectedBS != '') {
				selectedBS = JSON.parse(selectedBS);
			}
			for (var i = 0; i < selectedBS.length; i++) {
//				if (i == selectedBS.length - 1) {
//					bs += selectedBS[i].productName;
//					continue;
//				}
//				bs = bs + selectedBS[i].productName + ' , ';
				bs.push(selectedBS[i].productId)
			}
		}console.log(bs);debugger
		$('#childProduct').selectpicker('val',bs);
		$('#childProduct').selectpicker({
			'liveSearch' : true,
			'liveSearchPlaceholder' : '请输入关键字',
			'actionsBox' : true,
			'selectAllText' : '全选',
			'deselectAllText' : '取消',
			'width':'100%'
		});
//		$('#childProduct').attr("title",bs);
	}
	sonProductShow();
	// 考试地区
	loadAllSchool('#branchSchoolId', 1);
	function examSchoolShow() {
		// 获取
		var selectedBS = $('#branchSchoolId').data('value');
		// 遍历
		var bs = [];
		for (var i = 0; i < selectedBS.length; i++) {
			bs.push(selectedBS[i].department_id);
		}
//		$('#branchSchoolId').val(bs);
		$('#branchSchoolId').selectpicker('val',bs);
		$('#branchSchoolId').selectpicker({
			'liveSearch' : true,
			'liveSearchPlaceholder' : '请输入关键字',
			'actionsBox' : true,
			'selectAllText' : '全选',
			'deselectAllText' : '取消',
			'width':'100%'
		});
//		$('#branchSchoolId').attr("title",bs);
	}
	examSchoolShow();
	// 是否分期
	installmentRelation();
	if ($('#isInstallment').val() == 0) {
		$('.relate-installment').css('display','none');
	}
	// 收款方
	var payee1 = $('#payee').data('value');
	var p1 = [];
	switch (payee1) {
	case 1:
		p1 = [1];
		break;
	case 2:
		p1 = [2];
		break;
	case 3:
		p1 = [1,2];
		break;
	case 4:
		p1 = [4];
		break;
	case 5:
		p1 = [1,4];
		break;
	case 6:
		p1 = [2,4];
		break;
	case 7:
		p1 = [1,2,4];
		break;

	default:
		break;
	}
	$('#payee').selectpicker('val',p1);
	$('#payee').selectpicker('refresh');
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
	$
			.ajax({
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
										+ " selected>"
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
						xl += "<option value=" +data[i].configId
								+ ">" + data[i].configDesc
								+ "</option>";
					}
					$('#subject').html(xl);
					$('#subject').selectpicker('refresh');
					$('#subject').selectpicker({
						'liveSearch' : true,
						'liveSearchPlaceholder' : '请输入关键字',
						'actionsBox' : true,
						'selectAllText' : '全选',
						'deselectAllText' : '取消'
					});
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			});

	// 地区
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
								+ " selected>" + data.list[i].fullName
								+ "</option>";
						mark = 1;
						break;
					}
				}
				if (mark == 1) {
					mark = 0;
					continue;
				}
				opt += "<option value=" + data.list[i].addressId + ">"
						+ data.list[i].fullName + "</option>";
			}
			$("#area").html(opt);
			$("#area").selectpicker('refresh');
			$("#area").selectpicker({
				'liveSearch' : true,
				'liveSearchPlaceholder' : '请输入关键字',
				'actionsBox' : true,
				'selectAllText' : '全选',
				'deselectAllText' : '取消'
			});
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
					var mark = 0;
//					var signsJson = $('#signs').data('value');
//					var signsJson =JSON.parse($('#signc').text().trim());
					var signsJson = signsBase;
					signsJson = JSON.parse(signsJson);
					for (var k = 0; k < resp.length; k++) {
						// 判断报名表内容是否为空，如果为空则不展示该空项目
						if (resp[k].configDesc.trim().length != 0) {
							for (var l = 0; l < signsJson.length; l++) {
								if (signsJson[l].config_id == resp[k].configId) {
									strHtml += '<div class="form-group col-sm-12">'
											+ '<div class="col-sm-12">'
											+ '<label> <input type="checkbox" class="proRelatInfo" checked name="sign" value="'
											+ resp[k].configId
											+ '">'
											+ '<span class="text"></span>'
											+ resp[k].configDesc
											+ '</label>'
											+ '</div>' + '</div>';
									mark = 1;
									break;
								}
							}
							// 如果当前被选择项已添加，则跳过该条数据
							if (mark == 1) {
								mark = 0;
								continue;
							}
							strHtml += '<div class="form-group col-sm-12">'
									+ '<div class="col-sm-12">'
									+ '<label> <input type="checkbox" class="proRelatInfo" name="sign" value="'
									+ resp[k].configId + '">'
									+ '<span class="text"></span>'
									+ resp[k].configDesc + '</label>'
									+ '</div>' + '</div>';
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

	// 费用协议与费用类别联动
	function typeProFunc() {
		// 当前费用类别ID
		var expensesTypeId = $(this).val();
		// 获取table标签上的data-value的值
		var jsonEDTRelation = $('#registerGuideTable').data('value');
		// 初始option
		var exptr = '';
		for ( var key in jsonEDTRelation) {
			if (key == expensesTypeId) {
				for (var k = 0; k < jsonEDTRelation[key].length; k++) {
					var jsonObject = {
						dataExpensesDetailId : jsonEDTRelation[key][k].dataExpensesDetailId,
						dataExpensesDetailName : jsonEDTRelation[key][k].dataExpensesDetailName
					};
					exptr += '<option value=\'' + JSON.stringify(jsonObject)
							+ '\'>'
							+ jsonEDTRelation[key][k].dataExpensesDetailName
							+ '</option>';
				}

				$(this).parent().parent().find(
						'select[name*="dataExpensesDetail"]').html(exptr);
				$(this).parent().parent().find(
						'select[name*="dataExpensesDetail"]').selectpicker(
						'refresh');
				return;
			}
		}
	}
	$('#registerGuideTable').on('change', 'select.dataEType', typeProFunc)

	// select[name="examTimeId"]选中之后，input[name="examTime"] 赋值
	$('#examinationDateTable').on(
			'change',
			'select[name="examTimeId"]',
			function() {
				var examTime = $(this).find('option:selected').text();
				$(this).parents('tr').find('input[name="examTime"]').val(
						examTime);
			})

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
			$('#edu').parents('.hideItem').css('display','');
		}
		if (memo.indexOf('area') > -1) {
			$('.part1').css('display','');
			$('#area').parents('.hideItem').css('display','');
		}
		if (memo.indexOf('examFlowId') > -1) {
			$('.part2').css('display','');
			$('#examFlowId').parents('.hideItem').css('display','');
		}
		
		if (memo.indexOf('isApply') > -1) {
			$('.part2').css('display','');
			$('#isApply').parents('.hideItem').css('display','');
			if ($('#isApply').val() != 1) {
				$('#hideExamFlowId').parent().parent().css('display','none');
			}
		} else {
			$('#examFlowId').css('display','none');
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
})

/**
 * 期次
 */
$('.paymentPeriod').on('click', '.operate-btn', function() {
	if ($(this).is('.fa-plus')) {
		insertPreiod();
	} 
	// 删除行
	if ($(this).is('.fa-minus')) {
		var lenpay = 1;
		if ($('#paymentPeriodTable').attr('tLength')) {
			lenpay = Number($('#paymentPeriodTable').attr('tLength'));
		}
		if (lenpay == 0) {
			lenpay = 1;
		}
		if ($('#paymentPeriodTable tbody tr').length > lenpay) {
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
		var lenexam = Number($('#examinationDateTable').attr('tLength'));
		if (lenexam == 0) {
			lenexam = 1;
		}
		if ($('#examinationDateTable tbody tr').length > lenexam) {
			// 删除注入bootstrapValidator验证字段
			var $cost = $('#examinationDateTable tbody tr:last input[name="cost"]');
			var $price = $('#examinationDateTable tbody tr:last input[name="price"]');
			$('#addProductPrice').bootstrapValidator('removeField',$cost);
			$('#addProductPrice').bootstrapValidator('removeField',$price);
			$('#examinationDateTable tr:last').remove();
		}
	}
})
/**
 * 产品考期内弹窗展示
 */
$('body').on(
		'click',
		'.prices-edit',
		function() {// 招生价格弹窗
			$('.pricesEditModal').modal('show');
			// 原父tr个数临时保存
			var reLen = Number($(this).attr('re-length'));
			var inLen = Number($(this).attr('in-length'));
			$('#revenueCostTable').attr('tr-length',reLen);
			$('#incurExpenseTable').attr('tr-length',inLen);
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
			if (vData1 == undefined) {
//				addPriceTr('#revenueCostTable', 1, 2, 1);
			} else {
				view_price('#revenueCostTable', JSON.parse(vData1), 1, 2,
						selectedSchool);
			}
			if (vData2 == undefined) {
//				addPriceTr('#incurExpenseTable', 1, 2, 1);
			} else {
				view_price('#incurExpenseTable', JSON.parse(vData2), 1, 1,
						_examSchool);
			}
		}).on(
		'click',
		'.serviveconfig-btn',
		function() { // 服务配置弹窗
			$('.serviceConfigModal').modal('show');
			var serLen = Number($(this).find('i').attr('ser-length'));
			$('#productIncludeService').attr('tr-length',serLen);
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
							+ ') td:eq(7) a>i').attr('data-price-ser');
			if (serData == undefined) {
				addPriceTr('#productIncludeService', 1, 0, 2);
			} else {
				view_price('#productIncludeService', JSON.parse(serData), 2, 0,
						selectedSchool);
			}
		})

/**
 * 第一步操作
 */
$('#WiredWizardsteps').on(
		'click',
		'.btn-next',
		function() {
			// 锁定按钮
			$('#WiredWizardsteps .btn-next').attr('disabled', true);
			// 获取数据
			var data = $('.proInfo').serialize();
//			var data = $('.proInfo').serializeObject();
			var rel = $('.proRelatInfo').serializeObject();
//			data.jsonStr = JSON.stringify(rel);
			data += '&jsonStr=' + JSON.stringify(rel);
			// 提交数据
			$.ajax({
				url : ctx + '/product/updateRecord',
				type : 'post',
				dataType : 'json',
				data : data,
				async : false,
				success : function(info) {
					if (info.status == 'success') {
						toastr.success('操作成功');
						// 页面转换
						$('#WiredWizard li:first').removeClass('active')
								.addClass('complete');
						$('#WiredWizard li:last').addClass('active');
						$('#productInfo').removeClass('active');
						$('#productPrice').addClass('active');
					}
					$('#WiredWizardsteps .btn-next').attr('disabled', false);
				},
				error : function() {
					toastr.error('500：服务器错误');
					$('#WiredWizardsteps .btn-next').attr('disabled', false);
				}
			})

		})

/**
 * 第二步操作
 * 
 * @returns
 */
$('#addProductPrice')
		.on(
				'click',
				'.secondSub ',
				function() {
					$('#addProductPrice').data('bootstrapValidator').validate();
					if (!$('#addProductPrice').data('bootstrapValidator')
							.isValid()) {
						return;
					}
					var tips = false;
					$('#examinationDateTable select.examTime ').each(function(){
						if($(this).val() == ''){
							var trInd = $(this).parents('td').index(),
								str = $(this).parents('table').find('thead>tr>th:eq('+ trInd +')').text();
							$(this).focus();
							toastr.warning('有' + str + '未选择');
							tips = true;
							return false;
						}
					})
					if (tips) {
						return;
					}
					// 锁定按钮
					$('#addProductPrice .secondSub').attr('disabled', true);
					// 获取数据
					var payPeriods = new Array();
					var period = {};
					$('#paymentPeriodTable tbody tr').each(
							function() {
								period = $(this).find(
										'.addPeriod,.isExistPeriod')
										.serializeObject();
								// 添加产品Id
								period.productId = productId.value;
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
//										var rs = $.inArray(exId,judgeExamTime);
//										if (rs == -1) {
//											breakOff = true;
//											return false;
//										}
										examTime = $(this).find('.getExamTime')
												.serializeObject();
										examTime.productId = productId.value;
										// 招生地区
										var rec = examTime.recruits;
										var recArr = new Array();
										if (rec instanceof Array) {
											for (var i = 0; i < rec.length; i++) {
												var recObj = {};
												recObj = JSON.parse(rec[i]);
												recArr.push(recObj);
											}
										} else if (rec != undefined) {
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
																	delete temp1[a].isExist;
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
																	delete temp2[b].isExist;
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
																	delete temp3[c].isExist;
																	priceInfo
																			.push(temp3[c]);
																}
															}
														})
										examTime.basePrices = priceInfo;
										examTimes.push(examTime);
									})
//					if(breakOff){//考期重复
//						toastr.error('有重复考期，请检查');
//						$('.secondSub').attr('disabled', false);
//						return
//					}				
					var argumentStr = JSON.stringify(examTimes);
					$('.secondSub').attr('disabled', true);
					$.ajax({
						url : ctx + '/product/updateSecondRecord',
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

/**
 * 检查input[type="checkbox"]表单，选中值为0，未选中为1
 * 
 */
function checkForm(selector) {
	var checkB = $(selector).find('input[type="checkbox"]');
	// 未命中任何checkbox表单
	if (checkB == undefined) {
		return false;
	}
	// 命中jQuery对象只有一个
	if (!(checkB instanceof Array)) {
		if (checkB.checked) {
			checkB.value = '0';
		} else {
			checkB.checked = true;
			checkB.value = '1';
		}
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

$('.chosen-results').css({
	'max-height':'150px'
})