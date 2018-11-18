"use strict";

$(function () {
	var loadingShow = function loadingShow() {
		$(".tableload").mLoading({
			text: '正在加载中，请稍后......',
			icon: "../../dep/jquery-mloading/image/loading5.gif"
		});
	};
	var loadingHide = function loadingHide() {
		$(".tableload").mLoading("hide");
	};
	/*图标切换*/
	//总数据量点击查看各分校数据
	$('.dataTable').on('click', '.collapse-btn', function () {
		if ($(this).is('.fa-plus-square-o')) {
			$(this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
			$('.aggregate-data .campusData').slideDown();
		} else {
			$(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
			$('.aggregate-data .campusData').slideUp();
		}
	});
	//下拉框多选
	$('.selectpicker').selectpicker({
		'liveSearch': true,
		'liveSearchPlaceholder': '请输入关键字',
		'actionsBox': true,
		'selectAllText': '全选',
		'deselectAllText': '取消',
		'noneSelectedText': '没有匹配项'
	});
	// 分校查询所有
	var queryBerkeley = function queryBerkeley() {
		$.ajax({
			url: URL + '/services/sysDepartmentService/getSchools',
			type: 'POST',
			data: {
				type: '3'
			},
			dataType: 'json',
			success: function success(res) {
				addfun(res.data);
			},
			error: function error() {
				throw new Error("分校查询失败");
			}
		});
	};
	// 添加分校
	function addfun(arr) {
		var str = '';
		arr.forEach(function (element) {
			str += '<option value=' + element.departmentId + '>' + element.fullName + '</option>';
		});
		$('#branchSchool').html(str).selectpicker('refresh');
	}
	queryBerkeley();

	// 品牌查询所有
	$.post(URL + '/services/bizBrandService/selectAll', { enable: 1 }, function (res) {
		addBrand(res.data);
	}).error(function () {
		throw new Error("品牌查询失败");
	});
	// 添加品牌
	var addBrand = function addBrand(data) {
		var str = '';
		data.forEach(function (val) {
			str += "<option value=" + val.brandId + ">" + val.brandName + "</option>";
		});
		$('#brand').html(str).selectpicker('refresh');
	};

	// 产品模型查询
	$.post(URL + '/services/productModelService/selectAll', { enable: 1 }, function (res) {
		addproductModel(res.data);
	}).error(function () {
		throw new Error("产品模型查询失败");
	});
	// 添加产品模型
	var addproductModel = function addproductModel(data) {
		var str = '';
		data.forEach(function (val) {
			str += "<option value=" + val.productModelId + ">" + val.productModelName + "</option>";
		});
		$('#productModel').html(str).selectpicker('refresh');
	};

	// 产品查询
	$.post(URL + '/services/productService/selectAll', { enable: 1 }, function (res) {
		addproduct(res.data);
	}).error(function () {
		throw new Error("产品查询失败");
	});
	// 添加产品
	var addproduct = function addproduct(data) {
		var str = '';
		data.forEach(function (val) {
			str += "<option value=" + val.productId + ">" + val.productName + "</option>";
		});
		$('#product').html(str).selectpicker('refresh');
	};

	// 处理字符串 “'a','b'”
	var formatstr = function formatstr(arr) {
		var s = '';
		arr.forEach(function (e) {
			s += "'" + e + "',";
		});

		s = s.substring(0, s.length - 1);
		return s;
	};

	// 计算和
	var sumfun = function sumfun(arr) {
		var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

		var val = arr.reduce(function (a, b) {
			return a + b;
		});
		if (n === 2) {
			val = (Math.round(val * 100) / 100).toFixed(2);
		}
		return val;
	};
	// 计算均值
	var average = function average(arr) {
		var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		// 默认 percent = 1 时为百分数否则不为百分数
		var len = arr.length;
		var val = arr.reduce(function (a, b) {
			return a + b;
		}) / len;
		if (percent === 1) {
			val = (val * 100).toFixed(2) + '%';
		} else {
			val = val.toFixed(2);
		}
		return val;
	};
	// 处理数据
	var processingData = function processingData(arr) {
		var _arr = [];
		arr.forEach(function (el, index) {
			var obj = {};
			obj.departmentName = el.departmentName;
			obj.moneyAd = parseFloat(el.moneyAd).toFixed(2);
			obj.infoCount = parseFloat(el.infoCount).toFixed(2);
			obj.moneyCost = parseFloat(el.moneyCost).toFixed(2);
			obj.sumPerformance = parseFloat(el.sumPerformance).toFixed(2);
			obj.inFee = parseFloat(el.inFee).toFixed(2);
			obj.outFee = parseFloat(el.outFee).toFixed(2);
			obj.feeScale = parseFloat(el.feeScale * 100).toFixed(2) + '%';
			obj.serverCount = parseFloat(el.serverCount).toFixed(2);
			obj.supFee = parseFloat(el.supFee).toFixed(2);
			obj.doorCount = parseFloat(el.doorCount).toFixed(2);
			obj.signCount = parseFloat(el.signCount).toFixed(2);
			obj.elScale = parseFloat(el.elScale * 100).toFixed(2) + '%';
			obj.doorScale = parseFloat(el.doorScale * 100).toFixed(2) + '%';
			obj.sumScale = parseFloat(el.sumScale * 100).toFixed(2) + '%';
			obj.onlyFee = parseFloat(el.onlyFee).toFixed(2);
			obj.serverScale = parseFloat(el.serverScale * 100).toFixed(2) + '%';
			_arr.push(obj);
		});
		return _arr;
	};
	// datatables
	var tableInit = function tableInit(init) {
		var _init = processingData(init);
		var table = $('#table').DataTable({
			'data': _init,
			"bRetrieve": true,
			"bPaginate": true,
			"columns": [{ "data": "departmentName", "sClass": "text-center departmentName" }, { "data": "moneyAd", "sClass": "text-center moneyAd" }, { "data": "infoCount", "sClass": "text-center infoCount" }, { "data": "moneyCost", "sClass": "text-center moneyCost" }, { "data": "sumPerformance", "sClass": "text-center sumPerformance" }, { "data": "inFee", "sClass": "text-center inFee" }, { "data": "outFee", "sClass": "text-center outFee" }, { "data": "feeScale", "sClass": "text-center feeScale" }, { "data": "supFee", "sClass": "text-center supFee" }, { "data": "serverCount", "sClass": "text-center serverCount" }, { "data": "doorCount", "sClass": "text-center doorCount" }, { "data": "signCount", "sClass": "text-center signCount" }, { "data": "serverScale", "sClass": "text-center serverScale" }, { "data": "elScale", "sClass": "text-center elScale" }, { "data": "doorScale", "sClass": "text-center doorScale" }, { "data": "sumScale", "sClass": "text-center sumScale" }, { "data": "onlyFee", "sClass": "text-center onlyFee" }],
			"bAutoWidth": false, //自适应宽度
			"bInfo": true,
			"bStateSave": false, //保存状态到cookie 
			"bLengthChange": true,
			"bFilter": false, //搜索栏
			"sLoadingRecords": "Please wait - loading...",
			"aoColumnDefs": [{
				"bSortable": false,
				"aTargets": [0]
			}],
			oLanguage: {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "抱歉， 没有找到",
				"sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
				"sInfoEmpty": "找不到相关数据",
				"sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
				"sProcessing": "正在加载中...",
				"sSearch": "搜索",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "尾页"
				}
			}
		});
	};

	// 图表数据
	var chartData = {
		arrX: [],
		dimension: {}
		// 消除抖动函数

	};var debounce = function debounce(fun, delay) {
		var timer = void 0;
		return function () {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(function () {
				fun.apply(_this, args);
			}, delay);
		};
	};

	// 报表数据查询 reportData
	var reportSubmit = function reportSubmit() {
		loadingShow();
		$('#reportSubmit').attr('disabled', true);
		var data = {};

		var departmentIdsStr = {};
		var brandIdsStr = {};
		var modelIdsStr = {};
		var productIdsStr = {};

		if ($('#branchSchool').val() != null) {
			departmentIdsStr = { 'departmentIdsStr': formatstr($('#branchSchool').val()) };
		}
		if ($('#brand').val() != null) {
			brandIdsStr = { 'brandIdsStr': formatstr($('#brand').val()) };
		}
		if ($('#productModel').val() != null) {
			modelIdsStr = { 'modelIdsStr': formatstr($('#productModel').val()) };
		}
		if ($('#product').val() != null) {
			productIdsStr = { 'productIdsStr': formatstr($('#product').val()) };
		}

		Object.assign(data, departmentIdsStr, brandIdsStr, modelIdsStr, productIdsStr);
		$.post(URL + '/services/reportCenterService/getReports', data, function (res) {
			loadingHide();
			$('#reportSubmit').removeAttr('disabled');
			var aaa = $('#table').dataTable();
			aaa.fnClearTable();
			aaa.fnDestroy();

			// 获取数组
			var departmentName = [];
			var moneyAd = [];
			var infoCount = [];
			var moneyCost = [];
			var sumPerformance = [];
			var inFee = [];
			var outFee = [];
			var feeScale = [];
			var supFee = [];
			var serverCount = [];
			var doorCount = [];
			var signCount = [];
			var serverScale = [];
			var elScale = [];
			var doorScale = [];
			var sumScale = [];
			var onlyFee = [];
			if (res.data.length > 0) {

				var pro = new Promise(function (resolve, rejecr) {
					var allData = res.data;
					var len = allData.length;
					allData.forEach(function (val) {
						departmentName.push(val.departmentName);
						moneyAd.push(parseFloat(val.moneyAd));
						infoCount.push(parseFloat(val.infoCount));
						moneyCost.push(parseFloat(val.moneyCost));
						sumPerformance.push(parseFloat(val.sumPerformance));
						inFee.push(parseFloat(val.inFee));
						outFee.push(parseFloat(val.outFee));
						feeScale.push(parseFloat(val.feeScale));
						supFee.push(parseFloat(val.supFee));
						serverCount.push(parseFloat(val.serverCount));
						doorCount.push(parseFloat(val.doorCount));
						signCount.push(parseFloat(val.signCount));
						serverScale.push(parseFloat(val.serverScale));
						elScale.push(parseFloat(val.elScale));
						doorScale.push(parseFloat(val.doorScale));
						sumScale.push(parseFloat(val.sumScale));
						onlyFee.push(parseFloat(val.onlyFee));
					});

					resolve(tableInit(res.data));
				});
				pro.then(function () {
					// 计算和的项目
					$('.totalinfoCount').text(sumfun(infoCount, 0));
					$('.totalserverCount').text(sumfun(serverCount, 0));
					$('.totaldoorCount').text(sumfun(doorCount, 0));
					$('.totalsignCount').text(sumfun(signCount, 0));
					$('.totalmoneyAd').text(sumfun(moneyAd));
					$('.totalsumPerformance').text(sumfun(sumPerformance));
					$('.totalinFee').text(sumfun(inFee));
					$('.totaloutFee').text(sumfun(outFee));
					$('.totalsupFee').text(sumfun(supFee));
					// 成本totalmoneyAd
					var a = sumfun(moneyAd);
					var b = sumfun(infoCount, 0) === 0 ? 1 : sumfun(infoCount, 0);
					$('.totalmoneyCost').text((a / b).toFixed(2));
					//费比
					var c = sumfun(sumPerformance) === 0 ? 1 : sumfun(sumPerformance);
					$('.totalfeeScale').text((a / c * 100).toFixed(2) + '%');
					//预约比
					var f = sumfun(serverCount, 0);
					$('.totalserverScale').text((f / b * 100).toFixed(2) + '%');
					//电转比
					var d = sumfun(doorCount, 0);
					$('.totalelScale').text((d / b * 100).toFixed(2) + '%');
					//客单价
					var e = sumfun(signCount, 0) === 0 ? 1 : sumfun(signCount, 0);
					$('.totalonlyFee').text((c / e).toFixed(2));
					// 面转比
					var g = sumfun(signCount, 0);
					var h = sumfun(doorCount, 0) === 0 ? 1 : sumfun(doorCount, 0);
					$('.totaldoorScale').text((g / h * 100).toFixed(2) + '%');
					// 总转比
					$('.totalsumScale').text((g / b * 100).toFixed(2) + '%');

					// 更改位置
					$('.dataTables_info').parent().append($('.dataTables_length'));

					// 设置图表X轴
					changeXaxis(deedsCost, departmentName);
					changeXaxis(chartConsultation, departmentName);
					changeXaxis(chartAchievement, departmentName);
					changeXaxis(chartFeeScale, departmentName);
					// 初始化广告费维度
					changeDimension(deedsCost, $('#selectDimension option:selected').text(), moneyAd);
					changeDimension(chartConsultation, $('#selectConsultation option:selected').text(), infoCount);
					changeDimension(chartAchievement, $('#selectAchievement option:selected').text(), sumPerformance);
					changeDimension(chartFeeScale, $('#selectFeeScale option:selected').text(), feeScale);
				});
			} else {
				$('#addtext td').each(function (index, dom) {
					if (index != 0) {
						$(dom).text('0');
					}
				});
			}
			$('#selectDimension').val('moneyAd');
			$('#selectConsultation').val('infoCount');
			$('#selectAchievement').val('sumPerformance');
			$('#selectFeeScale').val('feeScale');
			chartData.arrX = departmentName;
			// chartData.dimension = dimension
			chartData.dimension.moneyAd = moneyAd;
			chartData.dimension.infoCount = infoCount;
			chartData.dimension.moneyCost = moneyCost;
			chartData.dimension.sumPerformance = sumPerformance;
			chartData.dimension.inFee = inFee;
			chartData.dimension.outFee = outFee;
			chartData.dimension.feeScale = feeScale;
			chartData.dimension.supFee = supFee;
			chartData.dimension.serverCount = serverCount;
			chartData.dimension.doorCount = doorCount;
			chartData.dimension.signCount = signCount;
			chartData.dimension.serverScale = serverScale;
			chartData.dimension.elScale = elScale;
			chartData.dimension.doorScale = doorScale;
			chartData.dimension.sumScale = sumScale;
			chartData.dimension.onlyFee = onlyFee;
			// 设置图表X轴
			changeXaxis(deedsCost, chartData.arrX);
			changeXaxis(chartConsultation, chartData.arrX);
			changeXaxis(chartAchievement, chartData.arrX);
			changeXaxis(chartFeeScale, chartData.arrX);
			// 初始化广告费维度

			changeDimension(deedsCost, $('#selectDimension option:selected').text(), chartData.dimension.moneyAd);
			changeDimension(chartConsultation, $('#selectConsultation option:selected').text(), chartData.dimension.infoCount);
			changeDimension(chartAchievement, $('#selectAchievement option:selected').text(), chartData.dimension.sumPerformance);
			changeDimension(chartFeeScale, $('#selectFeeScale option:selected').text(), chartData.dimension.feeScale);
		}).error(function () {
			loadingHide();
			$('#reportSubmit').removeAttr('disabled');
			throw new Error('搜索失败');
		});
	};

	document.getElementById('reportSubmit').onclick = debounce(reportSubmit, 600);

	// 设置X轴
	var changeXaxis = function changeXaxis(chart, arr) {
		chartData.arrX = arr;
		chart.setOption({
			xAxis: [{
				type: 'category',
				data: chartData.arrX,
				axisTick: {
					alignWithLabel: true
				}
			}]
		});
	};
	// 更改维度
	var changeDimension = function changeDimension(chart, text, arr) {
		chart.setOption({
			series: [{
				name: text,
				data: arr
			}]
		});
	};
	// 切换维度
	$('#selectDimension').change(function () {
		var key = $('#selectDimension').val();
		changeDimension(deedsCost, $('#selectDimension option:selected').text(), chartData.dimension[key]);
	});
	$('#selectConsultation').change(function () {
		var key = $('#selectConsultation').val();
		changeDimension(chartConsultation, $('#selectConsultation option:selected').text(), chartData.dimension[key]);
	});
	$('#selectAchievement').change(function () {
		var key = $('#selectAchievement').val();
		changeDimension(chartAchievement, $('#selectAchievement option:selected').text(), chartData.dimension[key]);
	});
	$('#selectFeeScale').change(function () {
		var key = $('#selectFeeScale').val();
		changeDimension(chartFeeScale, $('#selectFeeScale option:selected').text(), chartData.dimension[key]);
	});
	// 初始化图表 
	var deedsCost = echarts.init(document.getElementById('adFee'));
	var chartConsultation = echarts.init(document.getElementById('chartConsultation'));
	var chartAchievement = echarts.init(document.getElementById('chartAchievement'));
	var chartFeeScale = echarts.init(document.getElementById('chartFeeScale'));

	var deedsCost_option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		toolbox: {
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			},
			right: 20
		},
		color: ['#3398DB'],
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: chartData.arrX,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '广告费',
			type: 'bar',
			barWidth: '60%'
		}]
	};
	deedsCost.setOption(deedsCost_option);
	chartConsultation.setOption(deedsCost_option);
	chartAchievement.setOption(deedsCost_option);
	chartFeeScale.setOption(deedsCost_option);
});