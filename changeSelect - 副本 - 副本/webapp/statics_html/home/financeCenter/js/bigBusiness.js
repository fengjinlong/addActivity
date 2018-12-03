$(function () {
    //日期控件
    $('.duration').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: '到',
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
    $('.duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + '到' + picker.endDate.format('YYYY-MM-DD'));
    });

    //富文本编辑器
    KindEditor.ready(function (K) {
        K.create('.instructions', {
            allowFileManager: true,
            resizeType: 0,
            readonlyMode: true
        });
    });
    $("#init tbody").html("<tr><td height='300' colspan='16' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    showPayee();
    showPCostclass();
    $("#financePayeeId").change(function(){
    	var financePayeeId = $(this).val();
    	showPayeeInfo(financePayeeId,1);
    });
    $("#pCostclassId").change(function(){
    	var pCostclassId = $(this).val();
    	showCostclass(pCostclassId,1);
    })
    $("#pCostclassId2").change(function(){
    	var pCostclassId = $(this).val();
    	showCostclass(pCostclassId,2);
    })
});

/**
 * 显示常用收款人
 */
function showPayee(){
	$.ajax({
        url: ctx + '/financeZpExpend/showPayee',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var html = "--请选择--";
        	$(data).each(function(i,n){
        		html += '<option value="'+n.financePayeeId+'">'+n.accountName+'</option>';
        	})
        	$("#financePayeeId").append(html);
        }
	});
}

/**
 * 根据收款人显示收款人信息
 */
function showPayeeInfo(val,num){
	$.ajax({
        url: ctx + '/financeZpExpend/showPayeeInfo',
        data: {financePayeeId:val},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(num == 1){
        		$("#bankName").val(data.bankName);
        		$("#province").val(data.province);
        		$("#city").val(data.city);
        		$("#accountName").val(data.accountName);
        		$("#accountNum").val(data.accountNum);
        		$("#phone").val(data.phone);
        	}else if(num ==2){
        		$("#bankName2").val(data.bankName);
        		$("#province2").val(data.province);
        		$("#city2").val(data.city);
        		$("#accountName2").val(data.accountName);
        		$("#accountNum2").val(data.accountNum);
        		$("#phone2").val(data.phone);
        	}
        }
	});
}
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
	aoData.push( { "name": "timeType", "value": $("#searchTimeType").val()} );
	aoData.push( { "name": "applicationSate", "value": $("#applicationSate").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			 $('[data-toggle="tooltip"]').tooltip();
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
		"sAjaxSource" : ctx+'/bigBusiness/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '<label> <input value="'+full["depId"]+'" class="info" type="checkbox" ><span class="text"></span></label>';
			}},
			{"mDataProp" : "fenxiaomingcheng","bSortable": false,'sClass': "text-center"},

			{"mDataProp" : "brandName","bSortable": false,'sClass': "text-center", "mRender": function (data, type, full ) {
				if(data=='2'){
					return '学慧网';
				}else{
					return '中和';
				}
			}},
			{"mData": "beginTime", "bSortable": false,'sClass': "text-center"},
			{"mData": "endTime", "bSortable": false,'sClass': "text-center"},
			{"mData": "month", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '第'+data+'周';
			}},
			{"mDataProp" : "heji","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "jituan","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				return data;
			}},
			{"mDataProp" : "zc","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data == ''){
					return 0;
				}else{
					return Number(data).toFixed(2);
				}
			}},
			{"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(full["brandName"] == "1"){
					return full["cf"] == null ? 0 : full["cf"];
				}else{
					return 0;
				}
			}},
			{"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(full["brandName"] == "1"){
					return full["jl"] == null ? 0 : full["jl"];
				}else{
					return 0;
				}
			}},
			{"mDataProp" : "tz","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data == ''){
					return 0;
				}else{
					return data;
				}
			}},
			{"mDataProp" : "cname","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "cdate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(full['cname']){
					return 	'已申请';
				}else{
					return '未申请';
				}
			}},													
			{"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				var str = full["depId"]+','+full["beginTime"]+','+full["endTime"]+','+full["brandName"];
				var s1 = ' <a onclick=loadcheck(\'bigBusiness/indexCheck/'+str+'\')  data-record=\'' + JSON.stringify(full) + '\'  href="javascript:void(0);" class="btn btn-warning btn-xs view"><i class="fa fa-folder-open-o"></i> 查看</a>';
				var s2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\'  class="btn btn-info btn-xs apply" data-toggle="modal" data-target=".financeApply" data-backdrop="static"><i class="fa fa-edit"></i> 申请</a>';
				if(full['cname']){
					return 	s1;
				}else{
					return s1+s2;
				}
			}}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init_wrapper").removeClass();
    $('#init_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#init_wrapper .dataTables_info').parent().append($('#table55_wrapper .dataTables_length'));
	//每页显示记录数
	$('.dataTables_info').parent().append($('.dataTables_length'));
}

function loadcheck(val){
	$("#showPage").load(ctx + "/html/load.jsp", function(){
		$("#showPage").load(ctx +'/'+val);
	});
}

/**
 * 查看和编辑
 */
$("#init").on('click','.apply',function(){
	var record = $(this).data('record');
	$('#month').val(record.month);
	$('#depId').val(record.depId);
	$('#nian').val(record.nian);
	$('#brandName').val(record.brandName);
	$('#money').val(record.jituan);
	$('#fenxiaomingcheng').val(record.fenxiaomingcheng)
	
})

/**
 * 添加申请记录
 * @returns
 */
function addApply(){
	
	var brand = $('#brandName').val();
	if(brand=='学慧网'){
		brand = 2;
	}else{
		brand = 1;
	}
	
	var data = {
			 invoiceTitle:$('#invoiceTitle').val(),
		     expendType:1,
		     money:$('#money').val(),
		     pCostclassId:$('#pCostclassId').val(),
		     costclassId:$('#costclassId').val(),
		     pCostClassName:$('#pCostclassId :selected').text(),
		     costClassName:$('#costclassId :selected').text(),
		     payment:2,
		     payeeName:$('#financePayeeId :selected').text(),
		     isAdjustment:0,
		     nian:$('#nian').val(),
		     departmentId2:$('#departmentId2').val(),
		     payFrom:brand,
		     depId:$('#depId').val(),
		     month:$('#month').val(),
		     expendDetail:$('#expendDetail').val(),
		     content:editor.html()
	};
	$.ajax({
        url: ctx + "/bigBusiness/addApply",
        type: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
        	toastr.success(data.msg);
        	$('.financeApply').fadeOut(100).modal('hide');
        	init();
        }
	});
}
/**
 * 显示一级费用分类
 */
function showPCostclass(){
	$.ajax({
        url: ctx + '/financeZpExpend/showPCostclass',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var html = "";
        	$(data).each(function(i,n){
        		html += '<option value="'+n.financeCostclassId+'">'+n.costclassName+'</option>';
        	})
        	$("#pCostclassId").append(html);
        	$("#pCostclassId2").append(html);
            showCostclass(data[0].financeCostclassId,1);
            showCostclass(data[0].financeCostclassId,2);
        }
	});
}

/**
 * 显示二级费用分类
 */
function showCostclass(pCostclassId,num,costclassId){
	$.ajax({
        url: ctx + '/financeZpExpend/showCostclass',
        data: {financeCostclassId:pCostclassId},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var html = "";
        	$(data).each(function(i,n){
        		if(costclassId == n.financeCostclassId){
        			html += '<option selected="selected" value="'+n.financeCostclassId+'">'+n.costclassName+'</option>';
        		}else{
        			html += '<option value="'+n.financeCostclassId+'">'+n.costclassName+'</option>';
        		}
        	})
        	if(num == 1){
        		$("#costclassId").html("");
            	$("#costclassId").append(html);
        	}else if(num == 2){
        		$("#costclassId2").html("");
            	$("#costclassId2").append(html);
        	}
        }
	});
}

//横线滚动条
function HScrollBar(ele){
	$(ele).on('scroll',function(){
		$(ele).find('.dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}
HScrollBar('#init_wrapper');