$(function(){
    //日期
    $('#duration').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss',
            separator: ' 到 ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
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
        showDropdowns: true,
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerSeconds": true,
    });

    $('#duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss') + ' 到 ' + picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
    });

    init();


});


/**
 * 初始化
 * @returns
 */
function init (){
	var init = $('#callback').dataTable({
		"bPaginate": true,  //是否显示分页
    	"bLengthChange": true,//每页显示的记录数
    	"bFilter": false, //搜索栏
    	"bSort": false, //是否支持排序功能
    	"bInfo": true, //显示表格信息
    	"bAutoWidth": false,  //自适应宽度

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
		"sAjaxSource" : ctx+'/callback/selectCallBack',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [

		{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.departmentName1","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.brandName","bSortable": false,'sClass': "text-center"},

		{"mDataProp" : "consultInfoManage.projectName","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.departmentName2","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "","bSortable": false,'sClass': "text-center"},//分配时间
		
		{"mDataProp" : "consultInfoManage.counselor","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.studentAttrName2","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.status","bSortable": false,'sClass': "text-center"},
		
		{"mDataProp" : "consultInfoManage.serverDate","bSortable": false,'sClass': "text-center"},//预约上门日期
		{"mDataProp" : "consultInfoManage.reciveName","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.dropDate","bSortable": false,'sClass': "text-center"},//上门日期
		
		{"mDataProp" : "consultInfoManage.studentName","bSortable": false,'sClass': "text-center"},
		{"mDataProp" : "consultInfoManage.studentPhone","bSortable": false,'sClass': "text-center"},
		
		{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},//回访日期
		{"mDataProp" : "consultInfoManage.recordContent","bSortable": false,'sClass': "text-center"},

		{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},//日志添加时间
		{"mDataProp" : "createUserName","bSortable": false,'sClass': "text-center"},

		{"mDataProp" : "consultInfoManage.enable",'sClass': "text-center","mRender": function ( data, type, full ) {
			if(data == "1"){
				return "有效"
			}else if(data == "0"){
				return "无效"
   	    	}
		  }},
		{"mDataProp" : "callBakeType",'sClass': "text-center","mRender": function ( data, type, full ) {
				if(data == "1"){
					return "电话"
				}else if(data == "2"){
					return "短信"
	   	    	}
			  }},
		{"mDataProp" : "consultInfoManage.recordNextTime","bSortable": false,'sClass': "text-center"},
		],

		"fnRowCallback":function(nRow,aData,iDisplayIndex){
   	    	if(aData.status=='1'){
   	    		$('td:eq(8)',nRow).html('已创建');
   	    	}else if(aData.status=='2'){
   	    		$('td:eq(8)',nRow).html('待沟通');
   	    	}else if(aData.status=='3'){
   	    		$('td:eq(8)',nRow).html('已沟通');
   	    	}else if(aData.status=='4'){
   	    		$('td:eq(8)',nRow).html('预约');
   	    	}else if(aData.status=='5'){
   	    		$('td:eq(8)',nRow).html('上门');
   	    	}else if(aData.status=='6'){
   	    		$('td:eq(8)',nRow).html('订座');
   	    	}else if(aData.status=='7'){
   	    		$('td:eq(8)',nRow).html('报名');
   	    	}else{
   	    		$('td:eq(8)',nRow).html('已创建');
   	    	}
   	    	return nRow;
   	     },

			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
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
	//参数添加
	//时间
	var beganAndEnd = $("#duration").val();
	if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" 到 ")[0]) + ' 00:00:00';
        var maxDate = trim(beganAndEnd.split(" 到 ")[1]) + ' 59:59:00';
        aoData.push({"name": "beginTime", "value": minDate});
        aoData.push({"name": "endTime", "value": maxDate});
    }

	//页码，显示条数
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });

	//搜索框
	aoData.push( { "name": "searchVal", "value": $("#searchVal").val()} );

	//时间类型
	aoData.push({"name": "timeType", "value": $("#searchTimeType").val()});


	var val = $("input[name^='allocationStatus']:checked").val();
	if (!val == '') {
        aoData.push({"name": "allocationStatus", "value": val});
    } else {
        aoData.push({"name": "allocationStatus", "value": -1});
    }
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});


    $("#callback_wrapper").removeClass();
    $('#callback_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#callback_wrapper .dataTables_info').parent().append($('.dataTables_length'));
    //横线滚动条
    $("#callback_wrapper").on('scroll',function(){
        $('#callback_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
    })
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        init();
    }
}





