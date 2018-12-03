$(function () {
	//数据初始化
    $("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();
})

/**
 * 回车检索
 * @returns
 */
function search(){
	if(event.keyCode==13){
		toSearch();
	}
}
function toSearch(){
	init();
}

/**
 * 初始化时间控件
 * @returns
 */
function initDate(){
//日期控件
	$("#reservation").daterangepicker({
		locale: {
			format: 'YYYY-MM-DD',
			separator: ' 到 ',
			applyLabel: '确定',
			cancelLabel: '取消',
			customRangeLabel: '自定义',
			daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
			monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
				'七月', '八月', '九月', '十月', '十一月', '十二月'],
			firstDay: 1,
		},
		ranges: {
			'今天': [moment().startOf('day'), moment()],
			'昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
			'本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
			'上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
			'本月': [moment().startOf("month"), moment().endOf("month")],
			'上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
			'最近7天': [moment().subtract(6, 'days'), moment()],
			'最近30天': [moment().subtract(29, 'days'), moment()]
		},
		applyClass: 'btn-primary',
		alwaysShowCalendars: true,
		autoclose: true,
		autoUpdateInput: false,
		showDropdowns: true
	});

	//日期确定按钮
	$("#reservation").on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": $("#reservation").val().split("到")[0] } );
	aoData.push( { "name": "endTime", "value": $("#reservation").val().split("到")[1] } );
	aoData.push( { "name": "searchVal", "value": $("#searchVal").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			//initTotalIncome();
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init (){
	var init = $('#init').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		//"iDisplayLength": 10, 
		"bPaginate":true,
		"bSort": false, //是否支持排序功能
		"bLengthChange": true, 
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
		"sAjaxSource" : ctx+'/financeGroupBalance/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				return "中和教育集团";
			}},
			{"mDataProp" : "enrollNum","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data==null || data==""){
					return "0.00";
				}else{
					return data.toFixed(2);
				}
			}},
			{"mDataProp" : "reservationNum","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data==null || data==""){
					return "0.00";
				}else{
					return data.toFixed(2);
				}
			}},
			{"mDataProp" : "financeNum","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data==null || data==""){
					return "0.00";
				}else{
					return data.toFixed(2);
				}
			}},
			{"mDataProp" : "expendNum","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data==null || data==""){
					return "0.00";
				}else{
					return data.toFixed(2);
				}
			}},
			{"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				var yumoney = full.enrollNum + full.financeNum - full.expendNum;
				return yumoney.toFixed(2);
			}}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	//每页显示记录数
	$('.dataTables_info').parent().append($('.dataTables_length'));
}

function initTotalIncome(){
	var beginTime = $("#reservation").val().split("到")[0];
	var endTime = $("#reservation").val().split("到")[1];
	var searchVal = $("#searchVal").val();
	$.ajax({
        url: ctx + '/financeGroupBalance/getTotalIncome',
        data:{"beginTime":beginTime,"endTime":endTime,"searchVal":searchVal},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data){
        		var enrollNum = data.enrollNum;
        		var reservationNum = data.reservationNum;
        		var financeNum = data.financeNum;
        		var yumoney = enrollNum + reservationNum + financeNum - reservationNum;
        		enrollNum = enrollNum == null || enrollNum == "" ? "0.00" : enrollNum.toFixed(2);
        		reservationNum = reservationNum == null || reservationNum == "" ? "0.00" : reservationNum.toFixed(2);
        		financeNum = financeNum == null || financeNum == "" ? "0.00" : financeNum.toFixed(2);
        		yumoney = yumoney == null || yumoney == "" ? "0.00" : yumoney.toFixed(2);
        		var html = '<tr class="odd">'+
        		'<td class="text-center red">总计:</td>'+
        		'<td class="text-center">'+enrollNum+'</td>'+
        		'<td class="text-center">'+reservationNum+'</td>'+
        		'<td class="text-center">'+financeNum+'</td>'+
        		'<td class="text-center">'+reservationNum+'</td>'+
        		'<td class="text-center">'+yumoney+'</td>'+
        		'</tr>';
        		
        		$("#init").find("tbody").prepend(html);
        	}
        }
	});
}
