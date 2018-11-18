var DataTable = function(){
	return{
		init: function(){
			var Table = $('#waitExamTable').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/waitExam/getAll',
        		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
        			"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
        		},
        		"aoColumns" : [
        		               	{"mData": "id", 'sClass': "text-center", "mRender": function (data, type, full ) {
        		               		return '<label> <input class="info" type="checkbox" value="'+data+'"><span class="text"></span></label>';
        		               	}},
        			            {"mData": "baoMDate", 'sClass': "text-center"},
        			            {"mData": "enable", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	if(data)
        			            		return '有效';
        			            	else
        			            		return '无效';
        			            }},
        			            {"mData": "studentName", 'sClass': "text-center"},
        			            {"mData": "idcard", 'sClass': "text-center"},
        			            {"mData": "phoneBelong", 'sClass': "text-center"},
        			            {"mData": "departmentName3", 'sClass': "text-center"},
        			            {"mData": "ktimeValue", 'sClass': "text-center"},
        			            {"mData": "eduFrom", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	switch(data){
        			            	case 1:
    			            			return '成考';
    			            			break;
    			            		case 2:
    			            			return '自考';
    			            			break;
    			            		case 3:
    			            			return '远程';
    			            			break;
    			            		default:
    			            			return '';
    			            			break;
        			            	}

        			            }},
        			            {"mData": "projectName", 'sClass': "text-center"},
        			            {"mData": "projectLevelId", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	if(data)
        			            		return full.projectLevelName;
        			            	else
        			            		return null;
        			            }},
        			            {"mData": "schoolFrom", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	if(data=='null'||data=='--请选择--')
        			            		return '-';
        			            	else
        			            		return data;
        			            }},
        			            {"mData": "proFrom", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	if(data=='null'||data=='--请选择--')
        			            		return '-';
        			            	else
        			            		return data;
        			            }},
        			            {
        			                "mData": "infoManageId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var searchButton = "<a data-id='"+data+"' href='#' class='view' > <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看'></i> </a>";
        			                    var phoneButton = "<a data-id='"+data+"' href='#' class='phone' > <i class='fa fa-phone success' data-toggle='tooltip' data-placement='top' data-original-title='电话'></i></a>";
        			                    var infoButton = '<a href="#" data-toggle="modal" data-target=".information" data-backdrop="static"> <i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i> </a>';
        			                    var downLoadButton = '<a href="#" data-toggle="modal" data-target="" data-backdrop="static"> <i class="fa fa-download darkorange" data-toggle="tooltip" data-placement="top" title="下载"></i> </a>';
        			                    return searchButton + phoneButton + infoButton + downLoadButton;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
		}
	}
}();


/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    var dateRange = $(".reservation").val();

    var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g');

    var startDate = patt.exec(dateRange);
    var endDate = patt.exec(dateRange);

    if(startDate && endDate){
    	startDate = startDate[0];
    	endDate = endDate[0];
    	aoData.push({"name": "endTime", "value": endDate+ " 23:59:59"});
        aoData.push({"name": "beginTime", "value": startDate+ " 00:00:00"});
    }

    var projectType = $('#waitExamTable input[name="projectType"]').val();
	var ktime = $('#waitExamTable input[name="ktime"]').val();
	var projectId = $('#waitExamTable input[name="projectId"]').val();
	var partnerId = $('#waitExamTable input[name="partnerId"]').val();

	if(projectType)
		aoData.push({"name": "projectType", "value": projectType});
	if(ktime)
		aoData.push({"name": "ktime", "value": ktime});
	if(projectId)
		aoData.push({"name": "projectId", "value": projectId});
	if(partnerId)
		aoData.push({"name": "partnerId", "value": partnerId});

    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {

        	fnCallback(response.returnObject);

            $("#waitExamTable").parent().removeClass();
            $('#waitExamTable').parent().addClass("table-scrollable");
        }
    });
};


function filterTable(){
	DataTable.init();
}

//回车搜索
function search(){
	if(event.keyCode==13){
		filterTable();
	}
}

function statistics(){
	//左侧菜单统计
	$.ajax({
        url: ctx + '/waitExam/statistics',
        type: 'POST',
        dataType: 'json',
        data: {aplliedforStatus:1},
        success: function (data) {
        	var total1 = 0;//职业资格总数
    		var total2 = 0;//学历总数
    		$('.waitExamList .zhiye').html('');
    		$('.waitExamList .xueli').html('');
        	for(var i=0; i<data.length; ++i){
        		if(data[i].project_type == 1){//职业资格
        			total1 += data[i].num;

        			var str = '<li>' +
        						'<a href="javascript:;" data-ktime="'+data[i].ktime+'" class="menu-dropdown"><span class="menu-text">'+data[i].ktime_value+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
        						'<ul class="submenu" ktime="'+data[i].ktime+'"></ul>' +
        					  '</li>';
        			$('.waitExamList .zhiye').append(str);

        		}else if(data[i].project_type == 2){//学历
        			total2 += data[i].num;

        			var str = '<li>' +
        						'<a href="javascript:;" data-ktime="'+data[i].ktime+'" class="menu-dropdown"><span class="menu-text">'+data[i].ktime_value+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
        						'<ul class="submenu" ktime="'+data[i].ktime+'"></ul>' +
        					  '</li>';
        			$('.waitExamList .xueli').append(str);
        		}
        	}
        	$('.waitExamList .total-1').html(total1);
        	$('.waitExamList .total-2').html(total2);

        	//统计职业资格下的项目
        	zhiyeStatistics();

        	//统计学历下的合作方
        	xueliStatistics();

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

}

function zhiyeStatistics(){

	$.ajax({
        url: ctx + '/waitExam/zhiYeStatistics',
        type: 'POST',
        dataType: 'json',
        data: {aplliedforStatus:1},
        success: function (data) {
        	var total1 = 0;//职业资格总数
    		var total2 = 0;//学历总数
        	for(var i=0; i<data.length; ++i){

    			var str = '<li>' +
    						'<a href="javascript:;" data-ktime="'+data[i].ktime+'"  data-project="'+data[i].project_id+'"><span class="menu-text">'+data[i].project_name+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
    					  '</li>';
    			$('.zhiye ul[ktime="'+data[i].ktime+'"]').append(str);

        	}

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

}

function xueliStatistics(){

	$.ajax({
        url: ctx + '/waitExam/xueLiStatistics',
        type: 'POST',
        dataType: 'json',
        data: {aplliedforStatus:1},
        success: function (data) {
        	var total1 = 0;//职业资格总数
    		var total2 = 0;//学历总数
        	for(var i=0; i<data.length; ++i){

    			var str = '<li>' +
    						'<a href="javascript:;" data-ktime="'+data[i].ktime+'" data-partner="'+data[i].partner_id+'"><span class="menu-text">'+data[i].partner_name+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
    					  '</li>';
    			$('.xueli ul[ktime="'+data[i].ktime+'"]').append(str);
        	}

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

}

$(function(){

	statistics();


	//初始化加载数据
	DataTable.init();

	$('.search-btn').click(function(){
		filterTable();
	})


	$('.goback').click(function(){

		var ids = "";

		$('#waitExamTable input.info:checkbox:checked').each(function(){
			ids += $(this).val() + ",";
		})

		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}

		ids = ids.substr(0, ids.length-1);

		swal({
            title: "确定退回？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
    	},
   	 	function (isConfirm) {
            if (isConfirm) {
                $.ajax({
    		        url: ctx + '/waitExam/switchStatus',
    		        type: 'POST',
    		        dataType: 'json',
    		        data: {ids:ids, aplliedforStatus:0},
    		        success: function (data) {
    		        	if(data.status == "success"){
    		        		swal("", "退回成功！", "success");
    		        		statistics();
    		        		filterTable();
    		        	}
    		        	else
    		        		toastr.error(data.msg);
    		        },
    		        error: function (response) {
    		            toastr.error("系统错误");
    		        }
    		    });
            }
    	});

	})

	$('.apply').click(function(){

		var ids = "";

		$('#waitExamTable input.info:checkbox:checked').each(function(){
			ids += $(this).val() + ",";
		})

		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}

		ids = ids.substr(0, ids.length-1);


		swal({
            title: "确定申请报考？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
    	},
   	 	function (isConfirm) {
            if (isConfirm) {
            	$.ajax({
    		        url: ctx + '/waitExam/switchStatus',
    		        type: 'POST',
    		        dataType: 'json',
    		        data: {ids:ids, aplliedforStatus:2},
    		        success: function (data) {
    		        	if(data.status == "success"){
    		        		swal("", "申请报考成功！", "success");
    		        		statistics();
    		        		filterTable();
    		        	}
    		        	else
    		        		toastr.error(data.msg);
    		        },
    		        error: function (response) {
    		            toastr.error("系统错误");
    		        }
    		    });
            }
    	});

	})

	//点击查看按钮，比较学员信息是否与实际信息一致
	//把actualValue信息展示出来，如果为空，使用默认
	//modal关闭以后，应该恢复原样式
	$('#waitExamTable').on('click', '.view,.phone', function(){

		var infoManageId = $(this).data('id');
		showInfoModal(infoManageId);

	});

	//日期控件
	$('.reservation').daterangepicker({
		locale: {
			format: 'YYYY-MM-DD',
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
		showDropdowns: true
	});

	$('.reservation').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});

    //折叠图标切换
    if ($('.drop-down .sidebar-menu li a').hasClass('menu-dropdown')) {
        $('.drop-down .sidebar-menu .menu-dropdown').find('i').addClass('fa-angle-right');
    }
    $('.drop-down .sidebar-menu .submenu .submenu a').find('i').remove();
    $('.drop-down .sidebar-menu').on('click', '.menu-dropdown', function () {
        if ($(this).next('.submenu').css('display') == 'block') {
            $(this).find('i').addClass('fa-angle-right').removeClass('fa-angle-down');
        } else {
            $(this).find('i').addClass('fa-angle-down').removeClass('fa-angle-right');
            $(this).parent().siblings().find('i').addClass('fa-angle-right').removeClass('fa-angle-down');
        }
    })

    //点击每一项切换对应数据
    function switchingData(parentEle, rightData) {
        $(parentEle).find('.drop-down .sidebar-menu').on('click', 'a', function () {

        	var type = $(this).data('type');
        	var ktime = $(this).data('ktime');
        	var projectId = $(this).data('project');
        	var partnerId = $(this).data('partner');

        	$('#waitExamTable input[name="projectType"]').val(type);
        	$('#waitExamTable input[name="ktime"]').val(ktime);
        	$('#waitExamTable input[name="projectId"]').val(projectId);
        	$('#waitExamTable input[name="partnerId"]').val(partnerId);

        	filterTable();
            var items = $(parentEle).find('.drop-down .sidebar-menu a');
            for(var i= 0; i < items.length;i++){
                $(items[i]).removeClass('active');
            }
        	$(this).addClass('active');

            //$(rightData).fadeOut(0).fadeIn(100);
        })
    }

    switchingData('#waitExam', '.waitExamInfo');
    $('#waitExam').find('.drop-down .sidebar-menu a').eq(0).addClass('active');


    // 短信类型选择
    $('#msgType').on('change', function () {
        var val = $(this).val().replace('address', $('#schoolIdModelMsg').find('option:selected').text());
        $('#showMsg').val(val)
    })

    //查看右侧固定按钮切换
    $('.right-toolbar a').hover(function () {
        $(this).find('.up').stop().fadeIn(400);
    }, function () {
        $(this).find('.up').stop().fadeOut(400);
    })

    //查看折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().toggle();
    })

    //弹窗层级
    $('.information,.examFeeReturn').on('show.bs.modal', function () {
        $('.examination,.partnerView,.examView,.absenteeView,.examFee').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.examination,.partnerView,.examView,.absenteeView,.examFee').css('z-index', 1050);
    })

    //横线滚动条
	$('#waitExamTable_wrapper').on('scroll',function(){
		$('#waitExamTable_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
})
