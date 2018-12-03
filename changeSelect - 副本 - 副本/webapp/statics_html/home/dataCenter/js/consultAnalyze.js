
var consultorId;//记录点击的咨询师Id
/**
 * 报表数据
 */
//var departmentNameArray ;
//var departmentMoneyArray ;
//var departmentTotalArray;
//var performanceTranRateHeader;
//var performanceTranRateTotalMoneyContent=new Array();
//var performanceTranRateDianZhuanContent=new Array();
//var performanceTranRateMianZhuanContent=new Array();

var refreshAllChartInfoFunc;

$(function () {
    //日期控件
    $('#timeQuantum').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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
    $('#timeQuantum').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));

        //今天、昨天、最近7天、最近30天
        var dateValue = picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD');
        var today = moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');
        var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(1, 'days').format('YYYY-MM-DD')
        var recently7 = moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');
        var recently30 = moment().subtract(29, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');

        //今天
        if (dateValue == today) {
            $('.today-btn').addClass('active').siblings().removeClass('active');
        }
        //昨天
        if (dateValue == yesterday) {
            $('.yesterday-btn').addClass('active').siblings().removeClass('active');
        }
        //最近7天
        if (dateValue == recently7) {
            $('.recent7-btn').addClass('active').siblings().removeClass('active');
        }

        //最近30天
        if (dateValue == recently30) {
            $('.recent30-btn').addClass('active').siblings().removeClass('active');
        }


        //按天
        var startDay = picker.startDate.dayOfYear();
        var endDay = picker.endDate.dayOfYear();
        if ((endDay - startDay) > 29) {
            $('.date-btn a').removeClass('active');
        }
    });

    //默认显示今天的日期
    $('#timeQuantum').val(moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));

    //最近日期切换
    $('.date-btn a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).text()) {
            case '今天' :
                $('#timeQuantum').val(moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
            case '昨天' :
                $('#timeQuantum').val(moment().subtract(1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(1, 'days').format('YYYY-MM-DD'));
                break;
            case '最近7天' :
                $('#timeQuantum').val(moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
            case '最近30天' :
                $('#timeQuantum').val(moment().subtract(29, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
        }
        return false;
    })

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })

    //总数据量点击查看各分校数据
    $('.aggregate-data').on('click', '.collapse-btn', function () {
        if ($(this).is('.fa-plus-square-o')) {
            $(this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
            $('.aggregate-data .campusData').slideDown();
            DataTable.init();
        } else {
            $(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            $('.aggregate-data .campusData').slideUp();
        }
    })
    //高级筛选切换
    $('.public-conditions .condition-filtrate').slideUp(0);
    $('.advanced-filter').on('click',function(){
        if($(this).find('i').is('.fa-angle-down')){
            $('.public-conditions .condition-filtrate').slideDown();
            $(this).html('收起筛选<i class="fa fa-angle-up margin-left-5"></i>');
        }else{
            $('.public-conditions .condition-filtrate').slideUp();
            $(this).html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
        }
    })
	
    //点击咨询师查看详情
    $('.campusData').on('click','.consultant',function(){
    	consultorId = $(this).attr('data-record');
    	consultorDetailDataTable.init();
    	$('.consultantDetails').modal('show');
    	consultorId=0;
    })
    
    /**
     * 点击总量查询咨询师咨询量
     */
    var DataTable = function () {
    
        return {
            init: function () {
                var zxsTable = $('#consultorInfoTable').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 5,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/consultAnalyze/loadHeadCountInfoDetail',
                    "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                    "bServerSide": true,
                    "bDestroy": true,
                    "bRetrieve": false,
                    "oLanguage": {
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
                        },
                    },
                    "aoColumns": [
                        {"mData": "counselorName", 'sClass': "text-center","mRender":function (data, type, full) {
                        	 var u1 = '<a href="#" class="consultant"'
                                 + 'data-toggle="modal" data-backdrop="static" data-record=\'' + full['counselorId'] + '\'>'+full['counselorName']+'</a>';
                                
                             return u1;
                        }},
                        {"mData": "consultPeopleNum", 'sClass': "text-center"},
                        {"mData": "concultMoney", 'sClass': "text-center"},
                        {"mData": "shangPeopleNum", 'sClass': "text-center"},
                        {"mData": "baoPeolpeNum", 'sClass': "text-center"},
                        {"mData": "dianZhuan", 'sClass': "text-center","bSortable": false,"mRender": function (data, type, full) {  
                        	if(full['consultPeopleNum']==0&&full['shangPeopleNum']==0){
                    		    return '0%';
	                    	}else if(full['consultPeopleNum']==0&&full['shangPeopleNum']>0){
	                    		return '100%'
	                    	}else{
	                    		return Math.floor(full['shangPeopleNum']/full['consultPeopleNum']*10000)/100+"%"; 
	                    	}
                        }},
                        {"mData": "mianZhuan",'sClass': "text-center","bSortable": false,"mRender": function (data, type, full) {
                        	if(full['shangPeopleNum']==0&&full['baoPeolpeNum']==0){
                        		return '0%';
                        	}else if(full['shangPeopleNum']==0&&full['baoPeolpeNum']>0){
	                    		return '100%'
	                    	}else{
                        		return Math.floor(full['baoPeolpeNum']/full['shangPeopleNum']*10000)/100+"%";
                        	}
                        }},
                        {"mData": "adMoney", 'sClass': "text-center"},
                        {"mData": "primeMoney", 'sClass': "text-center","mRender": function (data, type, full) {
                        	if(full['consultPeopleNum']==0&&full['adMoney']==0){
                        		return '0%';
                        	}else if(full['consultPeopleNum']==0&&full['adMoney']>0){
	                    		return '100%'
	                    	}else{
                        		return Math.floor(full['adMoney']/full['consultPeopleNum']*10000)/100+"%";
                        	}
                        } },
                        { 'sClass': "text-center", "bSortable": false,"mRender": function (data, type, full) { 
                        	if(full['concultMoney']==0&&full['adMoney']==0){
                        		return '0%';
                        	}else if(full['concultMoney']==0&&full['adMoney']>0){
	                    		return '100%'
	                    	}else{
                        		return  Math.floor(full['adMoney']/full['concultMoney']*10000)/100+"%";
                        	}
                        }
                        }],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                       
                        return nRow;
                    },
                });
                $('#consultorInfoTable_wrapper>.row:first').remove();
            }
        }
    }();
    
    /**
     * 咨询师咨询量明细表
     */
    var consultorDetailDataTable = function () {
    
        return {
            init: function () {
                var cTable = $('#consultorDepartmentDetail').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 20,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/consultAnalyze/loadHeadCountConsultInfoDetail',
                    "fnServerData": consultorFenretrieveData,//用于替换默认发到服务端的请求操作
                    "bServerSide": true,
                    "bDestroy": true,
                    "bRetrieve": false,
                    "oLanguage": {
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
                        },
                    },
                    "aoColumns": [
                        {"mData": "counselorName", 'sClass': "text-center"},
                        {"mData": "departmentName", 'sClass': "text-center"},
                        {"mData": "consultPeopleNum", 'sClass': "text-center"},
                        {"mData": "concultMoney", 'sClass': "text-center"},
                        {"mData": "shangPeopleNum", 'sClass': "text-center"},
                        {"mData": "baoPeolpeNum", 'sClass': "text-center"},
                        {"mData": "dianZhuan", 'sClass': "text-center","bSortable": false,"mRender": function (data, type, full) {
                        	if(full['consultPeopleNum']==0&&full['shangPeopleNum']==0){
                    		    return '0%';
	                    	}else if(full['consultPeopleNum']==0&&full['shangPeopleNum']>0){
	                    		return '100%'
	                    	}else{
	                    		return Math.floor(full['shangPeopleNum']/full['consultPeopleNum']*10000)/100+"%"; 
	                    	}}
                        },{"mData": "mianZhuan",'sClass': "text-center","bSortable": false,"mRender": function (data, type, full) {
                        	if(full['shangPeopleNum']==0&&full['baoPeolpeNum']==0){
                        		return '0';
                        	}else if(full['shangPeopleNum']==0&&full['baoPeolpeNum']>0){
	                    		return '100%'
	                    	}else{
	                    		return Math.floor(full['baoPeolpeNum']/full['shangPeopleNum']*10000)/100+"%"; 
	                    	}
                        	
                        }
                        },{"mData": "adMoney", 'sClass': "text-center"},
                        {"mData": "primeMoney", 'sClass': "text-center","mRender": function (data, type, full) {
                        	if(full['consultPeopleNum']==0&&full['adMoney']==0){
                        		return '0%';
                        	}else if(full['consultPeopleNum']==0&&full['adMoney']>0){
	                    		return '100%'
	                    	}else{
                        		return Math.floor(full['adMoney']/full['consultPeopleNum']*10000)/100+"%";
                        	}
                        } },
                        { 'sClass': "text-center", "bSortable": false,"mRender": function (data, type, full) { 
                        	if(full['concultMoney']==0&&full['adMoney']==0){
                        		return '0%';
                        	}else if(full['concultMoney']==0&&full['adMoney']>0){
	                    		return '100%'
	                    	}else{
                        		return  Math.floor(full['adMoney']/full['concultMoney']*10000)/100+"%";
                        	}
                        }
                        }],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                       
                        return nRow;
                    },
                });
            }
        }
    }();
    
    //初始化项目列表
    $.ajax({
    	url: ctx + '/consultAnalyze/loadBizProject',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            //项目数据加载
            var opt2 = "";
            for (var i = 0; i < data.bizProjects.length; i++) {
                opt2 += "<option value=" + data.bizProjects[i].projectId + ">" + data.bizProjects[i].fullName + "</option>";
            }
           // '<option value="">--请选择--</option>' +
            $("#bizprojectselect").html('<option value="">--请选择--</option>' + opt2);
           /* $('#bizprojectselect').trigger('chosen:updated');
            $("#bizprojectselect").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');*/
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    	
    });
    
    //初始化分校select
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
           
            $('#fendepartmentselect').html(opt);
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
})

//部门联动咨询师
function changeDepartment(){
    //部门数据加载
	 $("#sysuserselect").html('');
   $.ajax({
    	url: ctx + '/consultAnalyze/loadSysUserByDepartment',
        type: 'POST',
        data:{'departmentIds':$("#departmentselect").val().toString()},
        dataType: 'json',
        success: function (data) {
       
            //咨询师数据加载
            var opt1 = "";
            for (var i = 0; i < data.sysUsers.length; i++) {
                opt1 += "<option value=" + data.sysUsers[i].userId + ">" + data.sysUsers[i].realName + "</option>";
            }
           
            $("#sysuserselect").html( '<option value="">--请选择--</option>' +opt1);
            $('.selectpicker').selectpicker('refresh');
            
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    	
    });
}

/**
 * 项目类型联动
 * @returns
 */
function changeProjectType() {
	
	$('#bizprojectselect').html('');
	var projectType = $('#projectType').val().toString();
	if (projectType.indexOf(",") >= 0) {
		projectType = null;
	}
	if(projectType==''){
		projectType=null;
	}
	$.ajax({
		url : ctx + '/bizProject/getAll',
		data : {
			projectType : projectType
		},
		dataType : 'json',
		type : 'post',
		success : function(data) {
			var opt = "";
			for (var i = 0; i < data.list.length; i++) {
				opt += "<option value='" + data.list[i].projectId + "'>"
						+ data.list[i].fullName + "</option>";
			}
			$('#bizprojectselect').html(opt);
			$('.selectpicker').selectpicker('refresh');
			
		},
		error : function() {
			toastr.error("系统错误");
		}
	});
}


/**
 * 改变部门类型做联动
 * @returns
 */
function changeDepartmentType(){
	var types=$("#companyTypes").val().toString();
	$.ajax({
		url : ctx + '/department/selectDepartmentByCompanyType',
		data: {'companyTypes':types },
		dataType : 'json',
		type : 'post',
		success : function(data) {
			var opt = "";
			for (var i = 0; i < data.list.length; i++) {
				   opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
			}
			
			$('#departmentselect').html(opt);
			$('.selectpicker').selectpicker('refresh');
		},
		error : function() {
			toastr.error("系统错误");
		}
	});
}

/**
 * 查询各个咨询师数据
 */
function retrieveData(sSource, aoData, fnCallback, oSettings){
	var dateRange = $('#timeQuantum').val();
	
    var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g');
    var startDate = patt.exec(dateRange);
    var endDate = patt.exec(dateRange);
    
    var companyIds=null;
    var selectCompanyObj=$("#companyTypes :selected");
   
    $.each(selectCompanyObj, function(i, n){
		if(companyIds==null){
			companyIds=$(n).val();
		}else{
			companyIds=companyIds+','+$(n).val();
		}
	});
    if(companyIds!=null&&companyIds.indexOf(",")){
    	companyIds=null;
    }

    var projectTypes=new Array();
		$.each($("#projectType :selected"), function(i, n){
			//if(projectTypes==null){
				projectTypes.push($(n).val());
			/*}else{
				projectTypes=projectTypes+','+$(n).val();
			}*/
		});
		
    var selecteddepartmentObj = $("#departmentselect :selected");
		var departmentId=new Array();
		$.each(selecteddepartmentObj, function(i, n){
			//if(departmentId==null){
				departmentId.push($(n).val());
			/*}else{
				departmentId=departmentId+','+$(n).val();
			}*/
		});
		
		var selectedUserObj = $("#sysuserselect :selected");
		var selecteduserIds=new Array();
		$.each(selectedUserObj, function(i, n){
		//	if(selecteduserIds==null){
				selecteduserIds.push($(n).val());
			/*}else{
				selecteduserIds=selecteduserIds+','+$(n).val();
			}*/
		});
		
		var selectedprojectObj = $("#bizprojectselect :selected");
		var selectedprojectIds=new Array();
		$.each(selectedprojectObj, function(i, n){
		//	if(selectedprojectIds==null){
				selectedprojectIds.push($(n).val());
			/*}else{
				selectedprojectIds=selectedprojectIds+','+$(n).val();
			}*/
		});
		
		var selectedfenObj = $("#fendepartmentselect :selected");
		var selectedfenIds=new Array();
		$.each(selectedfenObj, function(i, n){
			//if(selectedfenIds==null){
				selectedfenIds.push($(n).val());
//			}else{
//				selectedfenIds=selectedfenIds+','+$(n).val();
//			}
		});
		
		var selectedmoneyObj = $("#moneyType :selected");
		var selectedfenmoneyIds=null;
		$.each(selectedmoneyObj, function(i, n){
			if(selectedmoneyIds==null){
				selectedfenmoneyIds=$(n).val();
			}else{
				selectedfenmoneyIds=selectedmoneyIds+','+$(n).val();
			}
		});
		
		var selectedpayObj = $("#payType :selected");
		var selectedpayIds=null;
		$.each(selectedpayObj, function(i, n){
			if(selectedpayIds==null){
				selectedpayIds=$(n).val();
			}else{
				selectedpayIds=selectedpayIds+','+$(n).val();
			}
		});
		 aoData.push({"name": "companyIds", "value":companyIds});
		 aoData.push({"name": "departementIds[]", "value":departmentId});
		 aoData.push({"name": "counselorIds[]", "value":selecteduserIds});
		 aoData.push({"name": "projectIds[]", "value":selectedprojectIds});
		 aoData.push({"name": "fendepartmentIds[]", "value":selectedfenIds});
		 aoData.push({"name": "projectTypes[]", "value":projectTypes});
		 aoData.push({"name": "isDimission", "value":$("[name='mustPay']:checked").val()});
		 aoData.push({"name": "moneyType", "value":selectedfenmoneyIds});
		 aoData.push({"name": "payFrom", "value":selectedpayIds});
		 aoData.push({"name": "startDate", "value":startDate[0]});
		 aoData.push({"name": "endDate", "value":endDate[0]});
		 aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
		 aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
		$.ajax({
	        "url": sSource,
	        "data": aoData,
	        "cache": false,
	        "dataType": 'json',
	        "type": "POST",
	        "success": function (response) {
	            fnCallback(response.returnObject);
	        }
	    });
		
		
}

/**
* 查询咨询师分校的详细
*/
function  consultorFenretrieveData(sSource, aoData, fnCallback, oSettings){
	var dateRange = $('#timeQuantum').val();
	
   var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g');
   var startDate = patt.exec(dateRange);
   var endDate = patt.exec(dateRange);
   
   var companyIds=null;
   var selectCompanyObj=$("#companyTypes :selected");
  
   $.each(selectCompanyObj, function(i, n){
			if(companyIds==null){
				companyIds=$(n).val();
			}else{
				companyIds=companyIds+','+$(n).val();
			}
		});

   var projectTypes=new Array();
		$.each($("#projectType :selected"), function(i, n){
			//if(projectTypes==null){
				projectTypes.push($(n).val());
			/*}else{
				projectTypes=projectTypes+','+$(n).val();
			}*/
		});
		
   var selecteddepartmentObj = $("#departmentselect :selected");
		var departmentId=new Array();
		$.each(selecteddepartmentObj, function(i, n){
			//if(departmentId==null){
				departmentId.push($(n).val());
			/*}else{
				departmentId=departmentId+','+$(n).val();
			}*/
		});
		
		
		var selectedprojectObj = $("#bizprojectselect :selected");
		var selectedprojectIds=new Array();
		$.each(selectedprojectObj, function(i, n){
		//	if(selectedprojectIds==null){
				selectedprojectIds.push($(n).val());
			/*}else{
				selectedprojectIds=selectedprojectIds+','+$(n).val();
			}*/
		});
		
		var selectedfenObj = $("#fendepartmentselect :selected");
		var selectedfenIds=new Array();
		$.each(selectedfenObj, function(i, n){
			//if(selectedfenIds==null){
				selectedfenIds.push($(n).val());
			/*}else{
				selectedfenIds=selectedfenIds+','+$(n).val();
			}*/
		});
		
		var selectedmoneyObj = $("#moneyType :selected");
		var selectedfenmoneyIds=null;
		$.each(selectedmoneyObj, function(i, n){
			if(selectedfenmoneyIds==null){
				selectedfenmoneyIds=$(n).val();
			}else{
				selectedfenmoneyIds=selectedmoneyIds+','+$(n).val();
			}
		});
		
		var selectedpayObj = $("#payType :selected");
		var selectedpayIds=null;
		$.each(selectedpayObj, function(i, n){
			if(selectedpayIds==null){
				selectedpayIds=$(n).val();
			}else{
				selectedpayIds=selectedpayIds+','+$(n).val();
			}
		});
		
		 aoData.push({"name": "companyIds", "value":companyIds});
		 aoData.push({"name": "departementIds[]", "value":departmentId});
		 aoData.push({"name": "counselorIds", "value":consultorId});
		 aoData.push({"name": "projectIds[]", "value":selectedprojectIds});
		 aoData.push({"name": "fendepartmentIds[]", "value":selectedfenIds});
		 aoData.push({"name": "projectTypes[]", "value":projectTypes});
		 aoData.push({"name": "isDimission", "value":$("[name='mustPay']:checked").val()});
		 aoData.push({"name": "moneyType", "value":selectedfenmoneyIds});
		 aoData.push({"name": "payFrom", "value":selectedpayIds});
		 aoData.push({"name": "startDate", "value":startDate[0]});
		 aoData.push({"name": "endDate", "value":endDate[0]});
		 aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
		 aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
		$.ajax({
	        "url": sSource,
	        "data": aoData,
	        "cache": false,
	        "dataType": 'json',
	        "type": "POST",
	        "success": function (response) {
	            fnCallback(response.returnObject);
	        }
	    });
		
		
}

/**
 * 点击咨询师姓名触发事件
 */
function  selectConsultorFenDetail(consutorid){
	consultorId=consutorid;
	
	consultorDetailDataTable.init();
	$('.consultantDetails').modal('show');
	
}




 



/**
 * 所有的报表异步方法
 * @returns
 */
$(function(){
	refreshAllChartInfoFunc = function(){
		query_selectDepartmentTotalMoney();
		
		query_performanceConversionRate();
		
		query_selectDepartmentBingTotalMoney();
		
		query_yejiMianZhuanQuShi();
		
		query_yejiChengBenQuShi();
		
		query_yejiTouRuChanChuQuShi();
		
		query_yejiZiXunLiangQuShi();
		
		query_yejiSunHaoBiQuShi();
		
		query_ziXunShiYejiPaiMing();
		
		query_ziXunShiYeji_zhuanHuaLv();
		
		query_geXiangMuYejiPaiMing();
		
		query_geXiangMuYeji();
		
		query_geXiangMuZu_fenShijianDuan_yejiZhuanHuaLv();
		
		query_ziXunTuanDuiDianZhuanPaiMing();
		
		query_xiaoShouTuanDuiShujuDuibi();
		
		query_heGeMianZhuanXiaoQu();
	}
	
	refreshAllChartInfoFunc();
});
/**
 * 刷新报表
 * 
 * @returns
 */
/*function refreshChart(tmp){
	
    
    *//**
     * 报表加载数据
     *//*
	//各组业绩报表
    departmentChart(departmentNameArray,departmentMoneyArray);
	//业绩转换率报表
	performanceConversionRateChart(performanceTranRateHeader,performanceTranRateTotalMoneyContent,performanceTranRateDianZhuanContent,performanceTranRateMianZhuanContent);
	//咨询团队业绩占比数据  
	departmentBingChart(departmentNameArray,tmp,departmentTotalArray);
	
}*/





