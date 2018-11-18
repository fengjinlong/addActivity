var G_isCompleteData = 0;
var G_isCompleteAmount = 0;
var DataTable = function(){
	return{
		init: function(isCompleteData, isCompleteAmount){
			G_isCompleteData = isCompleteData;
			G_isCompleteAmount = isCompleteAmount;
			var Table = $('#infoVerifyTable').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/infoVerify/getAll?isCompleteData='+isCompleteData+'&isCompleteAmount='+isCompleteAmount,
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
        		               	{"mData": "infoManageId", 'sClass': "text-center", "mRender": function (data, type, full ) {
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
        			            {"mData": "schoolFrom", 'sClass': "text-center"},
        			            {"mData": "proFrom", 'sClass': "text-center"},
        			            {"mData": "phoneConfirmation", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	if(data == 1)
        			            		return "已确认";
        			            	else
        			            		return "未确认";
        			            }},
        			            {"mData": "studentConfirmation", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	if(data == 1)
        			            		return "已确认";
        			            	else
        			            		return "未确认";
        			            }},
        			            {"mData": "studentConfirmationDate", 'sClass': "text-center"},
        			            {"mData": "returnCount", 'sClass': "text-center"},
        			            {"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
        			            	var requiredInfomations = full.requiredInfomations?full.requiredInfomations:0;
        			            	var submittedInfomations = full.submittedInfomations?full.submittedInfomations:0;
        			            	return submittedInfomations + "/" + submittedInfomations
        			            }},
        			            {"mData": "printCount", 'sClass': "text-center"},
        			            {
        			                "mData": "id",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var searchButton = "<a data-full='"+JSON.stringify(full)+"' href='#' class='view' > <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看'></i> </a>";
        			                    var phoneButton = "<a data-full='"+JSON.stringify(full)+"' href='#' class='phone' > <i class='fa fa-phone success' data-toggle='tooltip' data-placement='top' data-original-title='电话'></i></a>";
        			                    var infoButton = '<a href="#" data-toggle="modal" data-target=".infoVerifyInfo" data-backdrop="static"> <i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i> </a>';
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
			HScrollBar('#infoVerifyTable_wrapper');
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
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $("#infoVerifyTable").parent().removeClass();
            $('#infoVerifyTable').parent().addClass("table-scrollable");
        }
    });
};

function filterTable(isCompleteData, isCompleteAmount){
	DataTable.init(isCompleteData, isCompleteAmount);
}

//回车搜索
function search(){
	if(event.keyCode==13){
		filterTable(G_isCompleteData, G_isCompleteAmount);
	}
}

$(function () {
	
	//初始化加载数据
	DataTable.init(0, 0);
	
	$('.search-btn').click(function(){
		filterTable(G_isCompleteData, G_isCompleteAmount);
	})
	
	
	//在信息核实中心转代报考的按钮，获得所有选中项的infoManageId，后台用数组接受
	$('.switch-btn').click(function(){
		
		var infoManageIds = "";
		$('#infoVerifyTable input.info:checkbox:checked').each(function(){
			infoManageIds += $(this).val() + ",";
		})
		
		if(infoManageIds.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}
		
		$.ajax({
            type: "POST",
            url: ctx + '/infoVerify/switchStatus',
            data: {infoManageIds:infoManageIds},
            dataType: 'json',
            success: function (data) {
            	if(data.status == "success"){
            		toastr.success(data.msg);
            		filterTable(G_isCompleteData, G_isCompleteAmount);
            	}else{
            		toastr.error(data.msg);
            	}
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
	})
	
	//点击查看按钮，比较学员信息是否与实际信息一致
	//把actualValue信息展示出来，如果为空，使用默认
	//modal关闭以后，应该恢复原样式
	$('#infoVerifyTable').on('click', '.view,.phone', function(){
		var full = $(this).data('full');
		
		$('#amountDataPhone input[name="infoManageId"]').val(full.infoManageId);
		$('#amountDataPhone input[name="id"]').val(full.id);
		
		$('#amountDataPhone input[name="studentName"]').val(full.studentName);
		$('#amountDataPhone input[name="idcard"]').val(full.idcard);
		$('#amountDataPhone input[name="studentSex"]').val(full.studentSex);
		$('#amountDataPhone input[name="studentPhone"]').val(full.studentPhone);
		$('#amountDataPhone input[name="graduateInstitutions"]').val(full.graduateInstitutions);
		$('#amountDataPhone input[name="projectLevelName"]').val(full.projectLevelName);
		$('#amountDataPhone input[name="majorName"]').val(full.majorName);
		//缴费金额
		$('#amountDataPhone input[name="payment"]').val(full.sPrice);
		
		if(full.actualInfo){//初始化核对信息
			var actualInfo = JSON.parse(full.actualInfo);
			$('#amountDataPhone input:radio[name="nameConsistent"][value="'+actualInfo.nameConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="numberConsistent"][value="'+actualInfo.numberConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="sexConsistent"][value="'+actualInfo.sexConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="phoneConsistent"][value="'+actualInfo.phoneConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="academyConsistent"][value="'+actualInfo.academyConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="gradeConsistent"][value="'+actualInfo.gradeConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="majorConsistent"][value="'+actualInfo.majorConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="paymentConsistent"][value="'+actualInfo.paymentConsistent+'"]').prop("checked", "checked");
			$('#amountDataPhone input:radio[name="entryFormConsistent"][value="'+actualInfo.entryFormConsistent+'"]').prop("checked", "checked");
			checkRadio();
			$('#amountDataPhone input[name="actualName"]').val(actualInfo.actualName);
			$('#amountDataPhone input[name="actualIdcard"]').val(actualInfo.actualIdcard);
			$('#amountDataPhone input[name="actualSex"]').val(actualInfo.actualSex);
			$('#amountDataPhone input[name="actualPhone"]').val(actualInfo.actualPhone);
			$('#amountDataPhone input[name="actualSchool"]').val(actualInfo.actualSchool);
			$('#amountDataPhone input[name="actualLevel"]').val(actualInfo.actualLevel);
			$('#amountDataPhone input[name="actualMajor"]').val(actualInfo.actualMajor);
			$('#amountDataPhone input[name="actualPayment"]').val(actualInfo.actualPayment);
			$('#amountDataPhone input[name="actualReason"]').val(actualInfo.actualReason);
		}
		
		$('.amountDataPhone').modal('show');
	})
	
	$('.amountDataPhone').on('hidden.bs.modal', function () {
		
		$('#amountDataPhone input').not(':radio').val('');
		$('#amountDataPhone input:radio[value="1"]').prop("checked", "checked");
		checkRadio();
		$('#amountDataPhone').data('bootstrapValidator').resetForm();
	})
    
	
	$('#amountDataPhone').bootstrapValidator({
    	submitHandler: function (validator, form, submitButton) {
    		var params = form.serialize();
    		
    		$.ajax({
                type: "POST",
                url: ctx + '/infoVerify/checkingInformation',
                data: params,
                dataType: 'json',
                success: function (data) {
                	if(data.status == "success"){
                		filterTable(G_isCompleteData, G_isCompleteAmount);
                		$('.amountDataPhone').modal('hide');
                	}else{
                		toastr.error(data.msg);
                	}
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
    	}
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
    checkRadio();

	//信息核实中心切换
	$('.infoVerifyBtn a').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
})

//信息核实查看
function checkRadio(){
	var radios = $('#amountDataPhone input[type="radio"]');
    for (var i = 0; i < radios.length; i++) {
        if ($(radios[i]).prop('checked')) {
            if ($(radios[i]).next().text().trim() == '是') {
                $(radios).eq(i).parents('.col-sm-3.no-padding').next().hide();
            } else {
                $(radios).eq(i).parents('.col-sm-3.no-padding').next().show();
            }
        }

        $(radios[i]).click(function () {
            if ($(this).next().text().trim() == '是') {
                $(this).parents('.col-sm-3.no-padding').next().hide();
            } else {
                $(this).parents('.col-sm-3.no-padding').next().show();
            }
        })
    }
}

//横线滚动条
function HScrollBar(ele){
	$(ele).on('scroll',function(){
		$(ele).find('.dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}