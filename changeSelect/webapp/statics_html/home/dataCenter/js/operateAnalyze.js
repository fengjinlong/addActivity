$(function () {
	/**--------------------业务---------------------**/
	$("#searchButton").click(function(){
		DataTable.init();
		loadData();
	});
	loadData = function(){
		var cycle = $("#cuttingDimensions").find(".active").attr("dimensions");
   	  	var timeQuantum = $("#timeQuantum").val();
		var startTime = timeQuantum.split("到")[0] ;
		var endTime = timeQuantum.split("到")[1] ;
		var _branchSchool = $("#branchSchool").val();
		var branchSchool = "";
		for(var i in _branchSchool){
			branchSchool += "'"+_branchSchool[i]+"',";
		}
		if(branchSchool){
			branchSchool = branchSchool.substring(0,branchSchool.length-1);
		}
		var _brandId = $("#brandId").val();
		var brandId = "";
		for(var i in _brandId){
			brandId += "'"+_brandId[i]+"',";
		}
		if(brandId){
			brandId = brandId.substring(0,brandId.length-1);
		}
		var _projectId =$("#projectId").val();
		var projectId = "";
		for(var i in _projectId){
			projectId += "'"+_projectId[i]+"',";
		}
		if(projectId){
			projectId = projectId.substring(0,projectId.length-1);
		}
		searchmonthlySummaryData(startTime,endTime,branchSchool,brandId,projectId,cycle);
		qualifiedCollapseData(startTime,endTime,branchSchool,brandId,projectId);
		BrandContrastData(startTime,endTime,branchSchool,brandId,projectId);
		ProjectContrastData(startTime,endTime,branchSchool,brandId,projectId);
	}

	 DataTable = function(){
		 	return {
		 		init: function () {
		 			var timeQuantum = $("#timeQuantum").val();
		 			var startTime = timeQuantum.split("到")[0] ;
		 			var endTime = timeQuantum.split("到")[1] ;
		 			var _branchSchool = $("#branchSchool").val();
		 			var branchSchool = "";
		 			for(var i in _branchSchool){
		 				branchSchool += "'"+_branchSchool[i]+"',";
		 			}
		 			if(branchSchool){
		 				branchSchool = branchSchool.substring(0,branchSchool.length-1);
		 			}
		 			var _brandId = $("#brandId").val();
		 			var brandId = "";
		 			for(var i in _brandId){
		 				brandId += "'"+_brandId[i]+"',";
		 			}
		 			if(brandId){
		 				brandId = brandId.substring(0,brandId.length-1);
		 			}
		 			var _projectId =$("#projectId").val();
		 			var projectId = "";
		 			for(var i in _projectId){
		 				projectId += "'"+_projectId[i]+"',";
		 			}
		 			if(projectId){
		 				projectId = projectId.substring(0,projectId.length-1);
		 			}
		 			var projectType = $("#projectType").val();
		 			$.ajax({
		 		        url: ctx + '/operateAnalyze/loadTotal',
		 		        type: 'POST',
		 		        data: {startTime: startTime,endTime:endTime,branchSchool:branchSchool,brandId:brandId,projectId:projectId},
		 		        dataType: 'json',
		 		        success: function (data) {
		 		        	var ggMoney = (!data[0].ggMoney) ? "0" :(data[0].ggMoney);
		 		        	var zxNum = !data[0].zxNum ?"0":data[0].zxNum;
		 		        	var hjSum = !data[0].hjSum ?"0":data[0].hjSum;
		 		        	var fristSum = !data[0].fristSum ?"0":data[0].fristSum;
		 		        	var zyzgMoney =!data[0].zyzgMoney ?"0":data[0].zyzgMoney;
		 		        	var xlMoney = !data[0].xlMoney ?"0":data[0].xlMoney;
		 		        	var smNum = !data[0].smNum ?"0":data[0].smNum;
		 		        	var bmNum = !data[0].bmNum ?"0":data[0].bmNum;
		 		        	var cb = (zxNum == "0" ?'0':(ggMoney/zxNum).toFixed(2));
		 		        	var zz = (zxNum == "0" ?'0':(bmNum/zxNum*100).toFixed(2));
		 		        	var dz = (zxNum == "0" ?'0':(Math.round(smNum + bmNum)/zxNum*100).toFixed(2));
		 		        	var fb = (hjSum == "0" ?'0':(ggMoney/hjSum*100).toFixed(2));
		 		        	var mz = (Math.round(smNum + bmNum) == "0" ?'0':(bmNum/Math.round(smNum + bmNum)*100).toFixed(2));
		 		        	var kdj = (bmNum == "0" ?'0':(hjSum/bmNum).toFixed(2));
		 		        	var jtsr = "0";
		 		       		if(!projectType || projectType.length == 2 || projectType.length == 0){
		 		       			jtsr = zyzgMoney+xlMoney;					
		 		       		}else if(projectType[0] == 1){
		 		       			jtsr = zyzgMoney;
		 		       		}else if(projectType[0] == 2){
		 		       			jtsr = xlMoney;
		 		       		}
		 		        	var html = '<tr><td><i class="fa collapse-btn fa-plus-square-o"></i></td>'
		 		        	+'<td>'+ggMoney+'</td>'
		 		        	+'<td>'+zxNum+'</td>'
		 		        	+'<td>'+cb + '</td>'
		 		        	+'<td>'+hjSum+'</td>'
		 		        	+'<td>'+fb + '%</td>'
		 		        	+'<td>'+(hjSum-fristSum).toFixed(2) + '</td>'
		 		        	+'<td>'+ jtsr + '</td>'
		 		        	+'<td>'+ Math.round(smNum + bmNum) + '</td>'
		 		        	+'<td>'+ bmNum + '</td>'
		 		        	+'<td>'+ dz + '%</td>'
		 		        	+'<td>'+ mz + '%</td>'
		 		        	+'<td>'+ zz + '%</td>'
		 		        	+'<td>'+ kdj + '</td>'
		 		        	+'</tr>';
		 		        	$("#totalTable").find("tbody").html(html);
		 		        	$('.aggregate-data .campusData').slideUp();
		 		        },
		 		        error: function (response) {
		 		            toastr.error("系统错误");
		 		        }
		 		    });
		 		}
		 	}
		 }();
	    
	   
	var ctx
	/**
	 * 初始化分校
	 */ 
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
            $("#branchSchool").html(opt);
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    /**
     * 初始化招生品牌
     */
    $.ajax({
        url: ctx + '/bizBrand/getAllOption',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
            }
            $("#brandId").html(opt);
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    /**
     * 根据项目类型加载项目
     */
    $("#projectType").on("change",function(){
    	initProject();
    });
    
  //总数据量点击查看各分校数据
    $('.aggregate-data').on('click', '.collapse-btn', function () {
        if ($(this).is('.fa-plus-square-o')) {
        	var _this = $(this);
        	 $(_this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
             $('.aggregate-data .campusData').slideDown();
        	var timeQuantum = $("#timeQuantum").val();
 			var startTime = timeQuantum.split("到")[0] ;
 			var endTime = timeQuantum.split("到")[1] ;
 			var _branchSchool = $("#branchSchool").val();
 			var branchSchool = "";
 			for(var i in _branchSchool){
 				branchSchool += "'"+_branchSchool[i]+"',";
 			}
 			if(branchSchool){
 				branchSchool = branchSchool.substring(0,branchSchool.length-1);
 			}
 			var _brandId = $("#brandId").val();
 			var brandId = "";
 			for(var i in _brandId){
 				brandId += "'"+_brandId[i]+"',";
 			}
 			if(brandId){
 				brandId = brandId.substring(0,brandId.length-1);
 			}
 			var _projectId =$("#projectId").val();
 			var projectId = "";
 			for(var i in _projectId){
 				projectId += "'"+_projectId[i]+"',";
 			}
 			if(projectId){
 				projectId = projectId.substring(0,projectId.length-1);
 			}
        	var projectType = $("#projectType").val();
        	 $.ajax({
        	        url: ctx + '/operateAnalyze/loadDetailed',
        	        type: 'POST',
        	        data: {startTime: startTime,endTime:endTime,branchSchool:branchSchool,brandId:brandId,projectId:projectId},
        	        dataType: 'json',
        	        success: function (data) {
        	        	var html = "";
        	        	$(data).each(function(i,j){
        	        		var departmentName = j.departmentName;
        	        		var ggMoney = (!j.ggMoney) ? "0" :(j.ggMoney);
		 		        	var zxNum = !j.zxNum ?"0":j.zxNum;
		 		        	var hjSum = !j.hjSum ?"0":j.hjSum;
		 		        	var fristSum = !j.fristSum ?"0":j.fristSum;
		 		        	var zyzgMoney =!j.zyzgMoney ?"0":j.zyzgMoney;
		 		        	var xlMoney = !j.xlMoney ?"0":j.xlMoney;
		 		        	var smNum = !j.smNum ?"0":j.smNum;
		 		        	var bmNum = !j.bmNum ?"0":j.bmNum;
		 		        	var cb = (zxNum == "0" ?'0':(ggMoney/zxNum).toFixed(2));
		 		        	var zz = (zxNum == "0" ?'0':(bmNum/zxNum*100).toFixed(2));
		 		        	var dz = (zxNum == "0" ?'0':(Math.round(smNum + bmNum)/zxNum*100).toFixed(2));
		 		        	var fb = (hjSum == "0" ?'0':(ggMoney/hjSum*100).toFixed(2));
		 		        	var mz = (Math.round(smNum + bmNum) == "0" ?'0':((bmNum/Math.round(smNum + bmNum)*100).toFixed(2)));
		 		        	var kdj = (bmNum == "0" ?'0':(hjSum/bmNum).toFixed(2));
		 		        	var jtsr = "0";
		 		       		if(!projectType || projectType.length == 2 || projectType.length == 0){
		 		       			jtsr = zyzgMoney+xlMoney;					
		 		       		}else if(projectType[0] == 1){
		 		       			jtsr = zyzgMoney;
		 		       		}else if(projectType[0] == 2){
		 		       			jtsr = xlMoney;
		 		       		}
		 		       	html += '<tr><td>'+departmentName+'</td>'
		 		        	+'<td>'+ggMoney+'</td>'
		 		        	+'<td>'+zxNum+'</td>'
		 		        	+'<td>'+cb + '</td>'
		 		        	+'<td>'+hjSum+'</td>'
		 		        	+'<td>'+fb + '%</td>'
		 		        	+'<td>'+(hjSum-fristSum).toFixed(2) + '</td>'
		 		        	+'<td>'+ jtsr + '</td>'
		 		        	+'<td>'+ Math.round(smNum + bmNum) + '</td>'
		 		        	+'<td>'+ bmNum + '</td>'
		 		        	+'<td>'+ dz + '%</td>'
		 		        	+'<td>'+ mz + '%</td>'
		 		        	+'<td>'+ zz + '%</td>'
		 		        	+'<td>'+ kdj + '</td>'
		 		        	+'</tr>';
        	        	});
        	        	
        	        	$("#detailedTable").find("tbody").html(html);
        	        	
        	        },
        	        error: function (response) {
        	            toastr.error("系统错误");
        	        }
        	    });
           
        } else {
            $(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            $('.aggregate-data .campusData').slideUp();
        }
    })
    
    
	/**--------------------业务---------------------end**/
	
	/**--------------------页面元素---------------------**/
    //日期控件
    $('#timeQuantum').daterangepicker({
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
    $('#timeQuantum').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + '到' + picker.endDate.format('YYYY-MM-DD'));

        //今天、昨天、最近7天、最近30天
        var dateValue = picker.startDate.format('YYYY-MM-DD') + '到' + picker.endDate.format('YYYY-MM-DD');
        var today = moment().format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD');
        var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD') + '到' + moment().subtract(1, 'days').format('YYYY-MM-DD')
        var recently7 = moment().subtract(6, 'days').format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD');
        var recently30 = moment().subtract(29, 'days').format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD');

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
    $('#timeQuantum').val(moment().format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD'));

    //最近日期切换
    $('.date-btn a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).text()) {
            case '今天' :
                $('#timeQuantum').val(moment().format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD'));
                break;
            case '昨天' :
                $('#timeQuantum').val(moment().subtract(1, 'days').format('YYYY-MM-DD') + '到' + moment().subtract(1, 'days').format('YYYY-MM-DD'));
                break;
            case '最近7天' :
                $('#timeQuantum').val(moment().subtract(6, 'days').format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD'));
                break;
            case '最近30天' :
                $('#timeQuantum').val(moment().subtract(29, 'days').format('YYYY-MM-DD') + '到' + moment().format('YYYY-MM-DD'));
                break;
        }
        return false;
    })

    //按天、周、月日期切换
    $('.interval a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).text()) {
            case '按周' :

                break;
            case '按月' :

                break;
            case '按季度' :

                break;
            case '按年' :

                break;
        }
        return false;
    });

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })

    /**
     * 月度概况数据加载
     * 咨询量成本数据加载
     */
    searchmonthlySummaryData= function(startTime,endTime,branchSchool,brandId,projectId,cycle){
		 $.ajax({
		        url: ctx + '/operateAnalyze/operationData',
		        type: 'POST',
		        data: {startTime: startTime,endTime:endTime,branchSchool:branchSchool,brandId:brandId,projectId:projectId,cycle:cycle},
		        dataType: 'json',
		        success: function (data) {
		        	var xCoordinates = data.xCoordinates;
		        	var ggMoney = new Array();
		        	var hj = new Array();
		        	var fb = new Array();
		        	var dz = new Array();
		        	var mz = new Array();
		        	var zxData = new Array();
		        	var cbData = new Array();
		        	for(var i in data.data){
		        		var _ggMoney = "0";
		        		var _hjSum ="0";
		        		var smNum = "0";
		        		var bmNum = "0";
		        		var zxNum = "0";
		        		var cb = "0";
		        		if(data.data[i]){
		        			_ggMoney = (!data.data[i].ggMoney) ? "0" :(data.data[i].ggMoney);
		        			_hjSum = !data.data[i].hjSum ?"0":data.data[i].hjSum;
		        			smNum = !data.data[i].smNum ?"0":data.data[i].smNum;
		 		        	bmNum = !data.data[i].bmNum ?"0":data.data[i].bmNum;
		 		        	zxNum = !data.data[i].zxNum ?"0":data.data[i].zxNum;
		 		        	cb = (zxNum == "0" ?'0':(_ggMoney/zxNum).toFixed(2));
		        		}
		        		zxData.push(zxNum);
		        		cbData.push(cb);
		        		fb.push(_hjSum == "0" ?'0':(_ggMoney/_hjSum*100).toFixed(2));
		        		ggMoney.push(_ggMoney);
		        		hj.push(_hjSum);
		        		dz.push(zxNum == "0" ?'0':(Math.round(smNum + bmNum)/zxNum*100).toFixed(2));
	 		        	mz.push(Math.round(smNum + bmNum) == "0" ?'0':(bmNum/Math.round(smNum + bmNum)*100).toFixed(2));
		        	}
		        	monthlySummaryDrawing(xCoordinates,ggMoney,hj,fb,dz,mz);//月度概况
		        	inquiriesCostsDrawing(xCoordinates,zxData,cbData);//咨询量成本走势图
		        },
		        error: function (response) {
		            toastr.error("系统错误");
		        }
		    });
    }

    /**
     * 合格、不合格面砖小区
     * 各校区客单价
     * 各校区电转于面砖
     * 业绩与推广费比
     * 合格、不合格费比校区
     * 费比各阶段校区
     */
    qualifiedCollapseData = function(startTime,endTime,branchSchool,brandId,projectId){
    	var qualified ="70";
    	var hgFbProbability = "70";
    	$.ajax({
	        url: ctx + '/operateAnalyze/loadDetailed',
	        type: 'POST',
	        data: {startTime: startTime,endTime:endTime,branchSchool:branchSchool,brandId:brandId,projectId:projectId},
	        dataType: 'json',
	        success: function (data) {
	        	var hgMzDepartmentName = new Array();
	        	var hgMz = new Array();
	        	var hgSm = new Array();
	        	var hgBm = new Array();
	        	var hgDz = new Array();
	        	
	        	var bhgMzDepartmentName = new Array();
	        	var bhgMz = new Array();
	        	var bhgSm = new Array();
	        	var bhgBm = new Array();
	        	var bhgDz = new Array();
	        	
	        	var hgFbDepartmentName = new Array();
	        	var hgFbggMoneyData = new Array();
	        	var hgFbHjData = new Array();
	        	var hgFbData = new Array();
	        	var hgFbDzData = new Array();
	        	var hgFbMzData = new Array();
	        	
	        	var bhgFbDepartmentName = new Array();
	        	var bhgFbggMoneyData = new Array();
	        	var bhgFbHjData = new Array();
	        	var bhgFbData = new Array();
	        	var bhgFbDzData = new Array();
	        	var bhgFbMzData = new Array();
	        	
	        	var fbDepartmentNameData_40 = new Array();
	        	var fbHjData_40 = new Array();
	        	var fbData_40 = new Array();
	        	var fbDzData_40 = new Array();
	        	var fbMzData_40 = new Array();
	        	
	        	var fbDepartmentNameData40_60 = new Array();
	        	var fbHjData40_60 = new Array();
	        	var fbData40_60 = new Array();
	        	var fbDzData40_60 = new Array();
	        	var fbMzData40_60 = new Array();
	        	
	        	var fbDepartmentNameData60_80 = new Array();
	        	var fbHjData60_80 = new Array();
	        	var fbData60_80 = new Array();
	        	var fbDzData60_80 = new Array();
	        	var fbMzData60_80 = new Array();
	        	
	        	var fbDepartmentNameData80 = new Array();
	        	var fbHjData80 = new Array();
	        	var fbData80 = new Array();
	        	var fbDzData80 = new Array();
	        	var fbMzData80 = new Array();
	        	
	        	var departmentNameData = new Array();
	        	var kdjData = new Array();
	        	var fbData = new Array();
	        	var dzData = new Array();
	        	var mzData = new Array();
	        	var hjData = new Array();
	        	var zxNumData = new Array();
	        	var cbData= new Array();
	        	
	        	$(data).each(function(i,j){
	        		var departmentName = j.departmentName;
	        		var ggMoney = (!j.ggMoney) ? "0" :(j.ggMoney);
 		        	var zxNum = !j.zxNum ?"0":j.zxNum;
 		        	var hjSum = !j.hjSum ?"0":j.hjSum;
 		        	var fristSum = !j.fristSum ?"0":j.fristSum;
 		        	var zyzgMoney =!j.zyzgMoney ?"0":j.zyzgMoney;
 		        	var xlMoney = !j.xlMoney ?"0":j.xlMoney;
 		        	var smNum = !j.smNum ?"0":j.smNum;
 		        	var bmNum = !j.bmNum ?"0":j.bmNum;
 		        	var cb = (zxNum == "0" ?'0':(ggMoney/zxNum).toFixed(2));
 		        	var zz = (zxNum == "0" ?'0':(bmNum/zxNum*100).toFixed(2));
 		        	var dz = (zxNum == "0" ?'0':(Math.round(smNum + bmNum)/zxNum*100).toFixed(2));
 		        	var fb = (hjSum == "0" ?'0':(ggMoney/hjSum*100).toFixed(2));
 		        	var mz = (Math.round(smNum + bmNum) == "0" ?'0':((bmNum/Math.round(smNum + bmNum)*100).toFixed(2)));
 		        	var kdj = (bmNum == "0" ?'0':(hjSum/bmNum).toFixed(2));
 		        	var jtsr = "0";
 		       		if(!projectType || projectType.length == 2 || projectType.length == 0){
 		       			jtsr = zyzgMoney+xlMoney;					
 		       		}else if(projectType[0] == 1){
 		       			jtsr = zyzgMoney;
 		       		}else if(projectType[0] == 2){
 		       			jtsr = xlMoney;
 		       		}
 		       	departmentNameData.push(departmentName);
 		       	kdjData.push(kdj);
 		       	fbData.push(fb);
 		       	dzData.push(dz);
 		       	mzData.push(mz);
 		       	hjData.push(hjSum);
 		        zxNumData.push(zxNum);
 		        cbData.push(cb);
	 		       if(parseFloat(mz) >= parseFloat(qualified)){
	 		    	 hgMzDepartmentName.push(departmentName);
	 		    	 hgMz.push(mz);
	 		    	 hgSm.push(Math.round(smNum + bmNum));
	 		    	 hgBm.push(bmNum);
	 		    	 hgDz.push(dz);
	 		       }else{
	 		    	 bhgMzDepartmentName.push(departmentName);
	 		    	 bhgMz.push(mz);
	 		    	 bhgSm.push(Math.round(smNum + bmNum));
	 		    	 bhgBm.push(bmNum);
	 		    	 bhgDz.push(dz);
	 		       }
	 		       if(parseFloat(fb) >= parseFloat(hgFbProbability)){
	 		    	  hgFbDepartmentName.push(departmentName);
	 		    	  hgFbggMoneyData.push(ggMoney);
	 	        	  hgFbHjData.push(hjSum);
	 	        	  hgFbData.push(fb);
	 	        	  hgFbDzData.push(dz);
	 	        	  hgFbMzData.push(mz);
	 		       }else{
	 		    	  bhgFbDepartmentName.push(departmentName);
	 		    	  bhgFbggMoneyData.push(ggMoney);
	 	        	  bhgFbHjData.push(hjSum);
	 	        	  bhgFbData.push(fb);
	 	        	  bhgFbDzData.push(dz);
	 	        	  bhgFbMzData.push(mz);
	 		       }
	 		      if(parseFloat(fb) <= parseFloat("40")){
	 		    	  fbDepartmentNameData_40.push(departmentName);
	 		    	  fbHjData_40.push(hjSum);
	 		    	  fbData_40.push(fb);
	 		    	  fbDzData_40.push(dz);
	 		    	  fbMzData_40.push(mz);
	 		      }else if(parseFloat(fb) > parseFloat("40") && parseFloat(fb) <= parseFloat("60")){
	 		    	  fbDepartmentNameData40_60.push(departmentName);
	 		    	  fbHjData40_60.push(hjSum);
	 		    	  fbData40_60.push(fb);
	 		    	  fbDzData40_60.push(dz);
	 		    	  fbMzData40_60.push(mz);
	 		      }else if(parseFloat(fb) > parseFloat("60") && parseFloat(fb) <= parseFloat("80")){
	 		    	  fbDepartmentNameData60_80.push(departmentName);
	 		    	  fbHjData60_80.push(hjSum);
	 		    	  fbData60_80.push(fb);
	 		    	  fbDzData60_80.push(dz);
	 		    	  fbMzData60_80.push(mz);
	 		      }else{
	 		    	 fbDepartmentNameData80.push(departmentName);
	 		    	  fbHjData80.push(hjSum);
	 		    	  fbData80.push(fb);
	 		    	  fbDzData80.push(dz);
	 		    	  fbMzData80.push(mz);
	 		      }
	 		       
	        	});
	        	qualifiedCollapseDrawing(hgMzDepartmentName,hgSm,hgBm,hgDz,hgMz);//月度概况
	        	disqualifiedCollapseDrawing(bhgMzDepartmentName,bhgSm,bhgBm,bhgDz,bhgMz);//合格/不合格面砖校区
	        	customerPriceDrawing(departmentNameData,kdjData,fbData,dzData,mzData);//各校区客单价表
	        	phoneCollapseDrawing(departmentNameData,dzData,mzData);//各校区电转与面转
	        	promotionFeeDrawing(departmentNameData,fbData,hjData);//业绩与推广费比
	        	qualifiedFebiDrawing(hgFbDepartmentName,hgFbggMoneyData,hgFbHjData,hgFbData,hgFbDzData,hgFbMzData);//合格费比校区
	        	unqualifiedFebiDrawing(bhgFbDepartmentName,bhgFbggMoneyData,bhgFbHjData,bhgFbData,bhgFbDzData,bhgFbMzData);//不合格费比校区
	        	febi1Drawing(fbDepartmentNameData_40,fbHjData_40,fbData_40,fbDzData_40,fbMzData_40);
	        	febi2Drawing(fbDepartmentNameData40_60,fbHjData40_60,fbData40_60,fbDzData40_60,fbMzData40_60);
	        	febi3Drawing(fbDepartmentNameData60_80,fbHjData60_80,fbData60_80,fbDzData60_80,fbMzData60_80);
	        	febi4Drawing(fbDepartmentNameData80,fbHjData80,fbData80,fbDzData80,fbMzData80);
	        	campusComparisonDrawing(departmentNameData,zxNumData,cbData);//各校区对比
	        	
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
    }
    
    /**
     * 加载品牌对比
     */
    BrandContrastData = function(startTime,endTime,branchSchool,brandId,projectId){
		 $.ajax({
		        url: ctx + '/operateAnalyze/loadBrandContrast',
		        type: 'POST',
		        data: {startTime: startTime,endTime:endTime,branchSchool:branchSchool,brandId:brandId,projectId:projectId},
		        dataType: 'json',
		        success: function (data) {
		        	var brandNameData = new Array();
		        	var zxNumData = new Array();
		        	var cbData = new Array();
		        	for(var i in data.data){
		        		var _ggMoney = "0";
		        		var zxNum = "0";
		        		var cb = "0";
		        		var brandName ="";
		        		if(data.data[i]){
		        			brandName = data.data[i].brandName;
		        			_ggMoney = (!data.data[i].ggMoney) ? "0" :(data.data[i].ggMoney);
		 		        	zxNum = !data.data[i].zxNum ?"0":data.data[i].zxNum;
		 		        	cb = (zxNum == "0" ?'0':(_ggMoney/zxNum).toFixed(2));
		        		}
		        		brandNameData.push(brandName);
		        		zxNumData.push(zxNum);
		        		cbData.push(cb);
		        	}
		        	brandComparisonDrawing(brandNameData,zxNumData,cbData);
		        },
		        error: function (response) {
		            toastr.error("系统错误");
		        }
		    });
    }
    
    /**
     * 加载项目对比
     */
    ProjectContrastData = function(startTime,endTime,branchSchool,brandId,projectId){
    	$.ajax({
	        url: ctx + '/operateAnalyze/loadProjectContrast',
	        type: 'POST',
	        data: {startTime: startTime,endTime:endTime,branchSchool:branchSchool,brandId:brandId,projectId:projectId},
	        dataType: 'json',
	        success: function (data) {
	        	var fullNameData = new Array();
	        	var zxNumData = new Array();
	        	var cbData = new Array();
	        	var hjData = new Array();
	        	for(var i in data.data){
	        		var _ggMoney = "0";
	        		var zxNum = "0";
	        		var cb = "0";
	        		var fullName ="";
	        		var hj = "0";
	        		if(data.data[i]){
	        			fullName = data.data[i].fullName;
	        			_ggMoney = (!data.data[i].ggMoney) ? "0" :(data.data[i].ggMoney);
	        			hj = (!data.data[i].hjSum) ? "0" :(data.data[i].hjSum);
	 		        	zxNum = !data.data[i].zxNum ?"0":data.data[i].zxNum;
	 		        	cb = (zxNum == "0" ?'0':(_ggMoney/zxNum).toFixed(2));
	        		}
	        		hjData.push(hj);
	        		fullNameData.push(fullName);
	        		zxNumData.push(zxNum);
	        		cbData.push(cb);
	        	}
	        	projectComparisonDrawing(fullNameData,zxNumData,cbData);
	        	projectDeedsDrawing(fullNameData,hjData);
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
    }
    
  //月度概况
    monthlySummaryDrawing = function(xCoordinates,ggMoney,hj,fb,dz,mz){
    	var monthlySummary = echarts.init(document.getElementById('monthlySummary'));
    	 monthlySummary.showLoading({
 	        text:'数据加载中.......',
 	        color:'rgba(0,0,0,.8)'
 		});
    	var monthlySummary_option = {
    	        tooltip: {
    	            trigger: 'axis',
    	            axisPointer: {
    	                type: 'shadow'
    	            },
    	            formatter: function (params) {
    	                return params[0].name + '<br/>' + mark('#abce5b') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
    	                    + mark('#6ac09a') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
    	                    + mark('#85d1cf') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
    	                    + mark('#fa903f') + params[3].seriesName + ' : ' + params[3].value + '% <br>'
    	                    + mark('#46b3f6') + params[4].seriesName + ' : ' + params[4].value + '% <br>';
    	            }
    	        },
    	        toolbox: {
    	            feature: {
    	                dataView: {show: true, readOnly: false},
    	                magicType: {show: true, type: ['line', 'bar']},
    	                restore: {show: true},
    	                saveAsImage: {show: true}
    	            },
    	            right: 20
    	        },
    	        legend: {
    	            data: ['广告费', '业绩合计', '推广费比', '电转', '面转'],
    	            icon: 'rect',
    	            itemGap: 20,
    	            itemWidth: 12,
    	            itemHeight: 12,
    	            left: '4%',
    	            itemGap: 20,
    	            bottom: 0
    	        },
    	        color: ['#abce5b', '#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
    	        grid: {
    	            right: '5%',
    	            left: '8%',
    	            top: 50,
    	        },
    	        xAxis: [
    	            {
    	                type: 'category',
    	                data: xCoordinates,
    	                axisTick: {
    	                    show: false
    	                }
    	            }
    	        ],
    	        yAxis: [
    	            {
    	                name: '',
    	                type: 'value',
    	                min: 0,
    	                splitLine: {
    	                    show: true,
    	                    lineStyle: {
    	                        color: ['#b1b1b1'],
    	                        type: 'dashed'
    	                    }
    	                },
    	                axisLabel: {
    	                    formatter: '{value}'
    	                },
    	                axisLine: {
    	                    show: false
    	                },
    	                axisTick: {
    	                    show: false
    	                }
    	            },
    	            {
    	                name: '',
    	                type: 'value',
    	                min: 0,
    	                max: 100,
    	                interval: 25,
    	                splitLine: {
    	                    show: true,
    	                    lineStyle: {
    	                        color: ['#b1b1b1'],
    	                        type: 'dashed'
    	                    }
    	                },
    	                axisLabel: {
    	                    formatter: '{value} %'
    	                },
    	                axisLine: {
    	                    show: false
    	                },
    	                axisTick: {
    	                    show: false
    	                }
    	            }
    	        ],
    	        series: [
    	            {
    	                name: '广告费',
    	                type: 'bar',
    	                data: ggMoney,
    	            },
    	            {
    	                name: '业绩合计',
    	                type: 'bar',
    	                data: hj,
    	            },
    	            {
    	                name: '推广费比',
    	                type: 'line',
    	                yAxisIndex: 1,
    	                data: fb,
    	            },
    	            {
    	                name: '电转',
    	                type: 'line',
    	                symbol: 'circle',
    	                yAxisIndex: 1,
    	                data: dz,
    	            },
    	            {
    	                name: '面转',
    	                type: 'line',
    	                symbol: 'circle',
    	                yAxisIndex: 1,
    	                data: mz,
    	            }
    	        ]
    	    }
    	    monthlySummary.setOption(monthlySummary_option);
    	 	monthlySummary.hideLoading();
    }
    
    qualifiedCollapseDrawing = function(departmentName,sm,bm,dz,mz){
    	var qualifiedCollapse = echarts.init(document.getElementById('qualifiedCollapse'));
	    qualifiedCollapse.showLoading({
	        text:'数据加载中.......',
	        color:'rgba(0,0,0,.8)'
	    });
	    var qualified_option = {
	        tooltip: {
	            trigger: 'axis',
	            axisPointer: {
	                type: 'shadow'
	            },
	            formatter: function (params) {
	                return params[0].name + '<br/>' + mark('#abce5b') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
	                    + mark('#6ac09a') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
	                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
	                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% ';
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
	        legend: {
	            data: ['上门量', '报名量', '电转', '面转'],
	            icon: 'rect',
	            itemGap: 20,
	            itemWidth: 12,
	            itemHeight: 12,
	            left: '4%',
	            itemGap: 20,
	            bottom: 0
	        },
	        color: ['#abce5b', '#6ac09a', '#fa903f', '#46b3f6'],
	        xAxis: [
	            {
	                type: 'category',
	                data: departmentName,
	                axisTick: {
	                    show: false
	                }
	            }
	        ],
	        yAxis: [
	            {
	                name: '',
	                type: 'value',
	                min: 0,
	                splitLine: {
	                    show: true,
	                    lineStyle: {
	                        color: ['#b1b1b1'],
	                        type: 'dashed'
	                    }
	                },
	                axisLabel: {
	                    formatter: '{value}'
	                },
	                axisLine: {
	                    show: false
	                },
	                axisTick: {
	                    show: false
	                }
	            },
	            {
	                name: '',
	                type: 'value',
	                min: 0,
//	                max: 100,
//	                interval: 25,
	                splitLine: {
	                    show: true,
	                    lineStyle: {
	                        color: ['#b1b1b1'],
	                        type: 'dashed'
	                    }
	                },
	                axisLabel: {
	                    formatter: '{value} %'
	                },
	                axisLine: {
	                    show: false
	                },
	                axisTick: {
	                    show: false
	                }
	            }
	        ],
	        series: [
	            {
	                name: '上门量',
	                type: 'bar',
	                stack: '上门量',
	                data: sm,
	            },
	            {
	                name: '报名量',
	                type: 'bar',
	                stack: '上门量',
	                data: bm,
	            },
	            {
	                name: '电转',
	                type: 'line',
	                yAxisIndex: 1,
	                symbol: 'circle',
	                data: dz,
	            },
	            {
	                name: '面转',
	                type: 'line',
	                yAxisIndex: 1,
	                symbol: 'circle',
	                data: mz,
	            }
	        ]
	    }
	
	    qualifiedCollapse.setOption(qualified_option);
	    qualifiedCollapse.hideLoading();
    }

    //不合格面转校区
    disqualifiedCollapseDrawing = function(departmentName,sm,bm,dz,mz){
    	var disqualifiedCollapse = echarts.init(document.getElementById('disqualifiedCollapse'));
    var disqualified_option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name + '<br/>' + mark('#abce5b') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#6ac09a') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% ';
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
        legend: {
            data: ['上门量', '报名量', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#abce5b', '#6ac09a', '#fa903f', '#46b3f6'],
        xAxis: [
            {
                type: 'category',
                data: departmentName,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '上门量',
                type: 'bar',
                data: sm,
            },
            {
                name: '报名量',
                type: 'bar',
                yAxisIndex: 1,
                data: bm,
            },
            {
                name: '电转',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'circle',
                data: dz,
            },
            {
                name: '面转',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'circle',
                data: mz,
            }
        ]
    }

    disqualifiedCollapse.setOption(disqualified_option);
    }

    //客单价
    customerPriceDrawing = function(departmentNameData,kdjData,fbData,dzData,mzData){
    	var customerPrice = echarts.init(document.getElementById('customerPrice'));
    var customerPrice_option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name + '<br/>' + mark('#6ac09a') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#f56e6a') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% ';
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['客单价', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        grid: {
            left: '5%',
            right: '5%',
            top: 50,
        },
        color: ['#6ac09a', '#f56e6a', '#fa903f', '#46b3f6'],
        xAxis: [
            {
                type: 'category',
                data: departmentNameData,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 2500,
//                interval: 500,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 20,
                axisLabel: {
                    formatter: '{value} %'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '客单价',
                type: 'bar',
                data: kdjData,
            },
            {
                name: '推广费比',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'circle',
                data: fbData,
            },
            {
                name: '电转',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'circle',
                data: dzData,
            },
            {
                name: '面转',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'circle',
                data: mzData,
            }
        ]
    }
    customerPrice.setOption(customerPrice_option);
    }
    
    //电转与面转
    phoneCollapseDrawing = function(departmentNameData,dzData,mzData){
    	var phoneCollapse = echarts.init(document.getElementById('phoneCollapse'));
    var phoneCollapse_option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#3e9bf1') + params[0].seriesName + ' : ' + params[0].value + '% <br/>'
                    + mark('#75d0ab') + params[1].seriesName + ' : ' + params[1].value + '%'
            }
        },
        legend: {
            data: ['电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            bottom: 0,
            left: '8%',
            textStyle: {
                fontWeight: 'bold'
            }
        },
        grid: {
            right: '8%',
            top: 40,
            left: '8%'
        },
        color: ['#3e9bf1', '#75d0ab'],
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: departmentNameData,
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 16,
//                interval: 2,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}%'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 20,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}%'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: dzData,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: mzData,
            }
        ]
    };

    phoneCollapse.setOption(phoneCollapse_option);
    }
    
    //业绩与推广费比
    promotionFeeDrawing = function(departmentNameData,fbData,hjData){
    	var promotionFee = echarts.init(document.getElementById('promotionFee'));
    var promotionFee_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#83bdf2') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#d1ecdc') + params[1].seriesName + ' : ' + params[1].value + '%'
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false,
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
        legend: {
            data: ['业绩合计', '推广费比'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        grid: {
            right: '8%',
            top: 50,
        },
        color: ['#83bdf2', '#d1ecdc'],
        xAxis: [
            {
                name: '',
                type: 'category',
                data: departmentNameData,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 5000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 20,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },

                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '业绩合计',
                type: 'bar',
                lineStyle: {
                    normal: {
                        color: '#4fa7f9'
                    }
                },
                data: hjData,
            },
            {
                name: '推广费比',
                type: 'bar',
                yAxisIndex: 1,
                lineStyle: {
                    normal: {
                        color: '#6cd2a8'
                    }
                },
                data: fbData,
            }
        ]
    };
    promotionFee.setOption(promotionFee_option);
    }

    //合格费比校区
    qualifiedFebiDrawing = function(hgFbDepartmentName,hgFbggMoneyData,hgFbHjData,hgFbData,hgFbDzData,hgFbMzData){
    	var qualifiedFebi = echarts.init(document.getElementById('qualifiedFebi'));
    var qualifiedFebi_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#abce5b') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#6ac09a') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
                    + mark('#85d1cf') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#fa903f') + params[3].seriesName + ' : ' + params[3].value + '% <br/> '
                    + mark('#46b3f6') + params[4].seriesName + ' : ' + params[4].value + '%'
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['广告费', '业绩合计', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#abce5b', '#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
        grid: {
            right: '8%',
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: hgFbDepartmentName,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        type: 'solid'
                    }
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 4000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '广告费',
                type: 'bar',
                data: hgFbggMoneyData,
            },
            {
                name: '业绩合计',
                type: 'bar',
                data: hgFbHjData,
            },
            {
                name: '推广费比',
                type: 'bar',
                yAxisIndex: 1,
                data: hgFbData,
            },
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: hgFbDzData,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: hgFbMzData,
            }
        ]
    }
    qualifiedFebi.setOption(qualifiedFebi_option);
    }

    //不合格费比校区
    unqualifiedFebiDrawing = function(bhgFbDepartmentName,bhgFbggMoneyData,bhgFbHjData,bhgFbData,bhgFbDzData,bhgFbMzData){
    	var unqualifiedFebi = echarts.init(document.getElementById('unqualifiedFebi'));
    var unqualifiedFebi_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#abce5b') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#6ac09a') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
                    + mark('#85d1cf') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#fa903f') + params[3].seriesName + ' : ' + params[3].value + '% <br/> '
                    + mark('#46b3f6') + params[4].seriesName + ' : ' + params[4].value + '%'
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['广告费', '业绩合计', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#abce5b', '#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
        grid: {
            right: '8%',
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: bhgFbDepartmentName,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 4000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '广告费',
                type: 'bar',
                data: bhgFbggMoneyData,
            },
            {
                name: '业绩合计',
                type: 'bar',
                data: bhgFbHjData,
            },
            {
                name: '推广费比',
                type: 'line',
                yAxisIndex: 1,
                data: bhgFbData,
            },
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: bhgFbDzData,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: bhgFbMzData,
            }
        ]
    }
    unqualifiedFebi.setOption(unqualifiedFebi_option);
    }
    
    //费比低于40%的校区
    febi1Drawing = function(fbDepartmentNameData_40,fbHjData_40,fbData_40,fbDzData_40,fbMzData_40){
    	var febi1 = echarts.init(document.getElementById('febi1'));
    var febi1_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#6ac09a') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#85d1cf') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% <br/> '
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['业绩合计', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
        grid: {
            right: '8%',
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: fbDepartmentNameData_40,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 4000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '业绩合计',
                type: 'bar',
                data: fbHjData_40,
            },
            {
                name: '推广费比',
                type: 'bar',
                yAxisIndex: 1,
                data: fbData_40,
            },
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbDzData_40,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbMzData_40,
            }
        ]
    }

    febi1.setOption(febi1_option);
    }
    //费比在40%-60%的校区
    febi2Drawing = function(fbDepartmentNameData40_60,fbHjData40_60,fbData40_60,fbDzData40_60,fbMzData40_60){
    	var febi2 = echarts.init(document.getElementById('febi2'));
    var febi2_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#6ac09a') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#85d1cf') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% <br/> '
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['业绩合计', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
        grid: {
            right: '8%',
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: fbDepartmentNameData40_60,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 4000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '业绩合计',
                type: 'bar',
                data: fbHjData40_60,
            },
            {
                name: '推广费比',
                type: 'bar',
                yAxisIndex: 1,
                data: fbData40_60,
            },
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbDzData40_60,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbMzData40_60,
            }
        ]
    }

    febi2.setOption(febi2_option);
    }
    //费比在60%-80%的校区
    febi3Drawing = function(fbDepartmentNameData60_80,fbHjData60_80,fbData60_80,fbDzData60_80,fbMzData60_80){
    	var febi3 = echarts.init(document.getElementById('febi3'));
    var febi3_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#6ac09a') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#85d1cf') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% <br/> '
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['业绩合计', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
        grid: {
            right: '8%',
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: fbDepartmentNameData60_80,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 4000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '业绩合计',
                type: 'bar',
                data: fbHjData60_80,
            },
            {
                name: '推广费比',
                type: 'bar',
                yAxisIndex: 1,
                data: fbData60_80,
            },
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbDzData60_80,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbMzData60_80,
            }
        ]
    }

    febi3.setOption(febi3_option);
    }
    //费比大于80%的校区
    febi4Drawing = function(fbDepartmentNameData80,fbHjData80,fbData80,fbDzData80,fbMzData80){
    	var febi4 = echarts.init(document.getElementById('febi4'));
    var febi4_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#6ac09a') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#85d1cf') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
                    + mark('#46b3f6') + params[3].seriesName + ' : ' + params[3].value + '% <br/> '
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            right: 20
        },
        legend: {
            data: ['业绩合计', '推广费比', '电转', '面转'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#6ac09a', '#85d1cf', '#fa903f', '#46b3f6'],
        grid: {
            right: '8%',
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: fbDepartmentNameData80,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 4000000,
//                interval: 1000000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 100,
//                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '业绩合计',
                type: 'bar',
                data: fbHjData80,
            },
            {
                name: '推广费比',
                type: 'bar',
                yAxisIndex: 1,
                data: fbData80,
            },
            {
                name: '电转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbDzData80,
            },
            {
                name: '面转',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                data: fbMzData80,
            }
        ]
    }
    febi4.setOption(febi4_option);
    }
    //咨询量和成本
    inquiriesCostsDrawing = function(xCoordinates,zxData,cbData){
    	var inquiriesCosts = echarts.init(document.getElementById('inquiriesCosts'));
    var inquiriesCosts_option = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false,
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
        legend: {
            data: ['咨询量', '成本'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        grid: {
            left: '5%',
            right: '5%',
            top: 50,
        },
        color: ['#83bdf2', '#d1ecdc'],
        xAxis: [
            {
                name: '',
                type: 'category',
                boundaryGap: false,
                data: xCoordinates,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 14000,
//                interval: 2000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 350,
//                interval: 50,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },

                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '咨询量',
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#4fa7f9'
                    }
                },
                itemStyle: {
                    normal: {areaStyle: {type: 'default'}}
                },
                data: zxData,
            },
            {
                name: '成本',
                type: 'line',
                symbol: 'circle',
                yAxisIndex: 1,
                lineStyle: {
                    normal: {
                        color: '#6cd2a8'
                    }
                },
                itemStyle: {
                    normal: {areaStyle: {type: 'default'}}
                },
                data: cbData,
            }
        ]
    };
    inquiriesCosts.setOption(inquiriesCosts_option);
    }
    //各品牌比对
    brandComparisonDrawing = function(brandNameData,zxNumData,cbData){
    	var brandComparison = echarts.init(document.getElementById('brandComparison'));
    var brandComparison_option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#83bdf2') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#5ecb9e') + params[1].seriesName + ' : ' + params[1].value;
            }
        },
        legend: {
            data: ['咨询量', '成本'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false,
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
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        color: ['#83bdf2', '#5ecb9e'],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: brandNameData,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 14000,
//                interval: 2000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 350,
//                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '咨询量',
                type: 'line',
                data: zxNumData,
            },
            {
                name: '成本',
                type: 'line',
                yAxisIndex: 1,
                data: cbData,
            }
        ]
    };
    brandComparison.setOption(brandComparison_option);
    }
    //各项目比对
    projectComparisonDrawing = function(fullNameData,zxNumData,cbData){
    	var projectComparison = echarts.init(document.getElementById('projectComparison'));
    var projectComparison_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#83bdf2') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#5ecb9e') + params[1].seriesName + ' : ' + params[1].value;
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false,
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
        legend: {
            data: ['咨询量', '成本'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        color: ['#83bdf2', '#d1ecdc'],
        xAxis: [
            {
                name: '',
                type: 'category',
                data: fullNameData,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 14000,
//                interval: 2000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 350,
//                interval: 50,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '咨询量',
                type: 'bar',
                data: zxNumData,
            },
            {
                name: '成本',
                type: 'bar',
                yAxisIndex: 1,
                data: cbData,
            }
        ]
    };
    projectComparison.setOption(projectComparison_option);
    }
    //各校区比对
    campusComparisonDrawing = function(departmentNameData,zxNumData,cbData){
    	var campusComparison = echarts.init(document.getElementById('campusComparison'));
    var campusComparison_option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + mark('#83bdf2') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + mark('#5ecb9e') + params[1].seriesName + ' : ' + params[1].value;
            }
        },
        legend: {
            data: ['咨询量', '成本'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: 0
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false,
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
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        color: ['#83bdf2', '#d1ecdc'],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: departmentNameData,
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 14000,
//                interval: 2000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
//                max: 350,
//                interval: 50,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '咨询量',
                type: 'line',
                areaStyle: {normal: {}},
                lineStyle: {
                    normal: {
                        color: '#4fa7f9'
                    }
                },
                data: zxNumData,
            },
            {
                name: '成本',
                type: 'line',
                areaStyle: {normal: {}},
                lineStyle: {
                    normal: {
                        color: '#6cd2a8'
                    }
                },
                yAxisIndex: 1,
                data: cbData,
            }
        ]
    };
    campusComparison.setOption(campusComparison_option);
    }
    //各项目业绩
    projectDeedsDrawing = function(fullNameData,hjData){
    var projectDeeds = echarts.init(document.getElementById('projectDeeds'));
    var projectDeeds_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['业绩合计'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 20,
            bottom: '8%'
        },
        grid: {
            left: '3%',
            right: '8%',
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            position: 'top',
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#b1b1b1'],
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: fullNameData,
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name: '业绩合计',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#4fa7f9',
                                '#6ac09a'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: hjData
            }
        ]
    };
    projectDeeds.setOption(projectDeeds_option);
    }

    //各项目业绩占比趋势图
//    var performanceScale = echarts.init(document.getElementById('performanceScale'));
//    var performanceScale_option = {
//        tooltip: {
//            trigger: 'axis',
//            axisPointer: {
//                type: 'shadow'
//            },
//            formatter: function (params) {
//                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value + ' ' + mark('#85d1cf') + params[8].seriesName + ' : ' + params[8].value + '% <br/>'
//                    + mark('#fa903f') + params[1].seriesName + ' : ' + params[1].value + ' ' + mark('#fa903f') + params[9].seriesName + ' : ' + params[9].value + '% <br/>'
//                    + mark('#46b3f6') + params[2].seriesName + ' : ' + params[2].value + ' ' + mark('#46b3f6') + params[10].seriesName + ' : ' + params[10].value + '% <br/>'
//                    + mark('#b5c334') + params[3].seriesName + ' : ' + params[3].value + ' ' + mark('#b5c334') + params[11].seriesName + ' : ' + params[11].value + '% <br/>'
//                    + mark('#0e8c89') + params[4].seriesName + ' : ' + params[4].value + ' ' + mark('#0e8c89') + params[12].seriesName + ' : ' + params[11].value + '% <br/>'
//                    + mark('#f4700b') + params[5].seriesName + ' : ' + params[5].value + ' ' + mark('#f4700b') + params[13].seriesName + ' : ' + params[11].value + '% <br/>'
//                    + mark('#0779be') + params[6].seriesName + ' : ' + params[6].value + ' ' + mark('#0779be') + params[14].seriesName + ' : ' + params[11].value + '% <br/>'
//                    + mark('#def602') + params[7].seriesName + ' : ' + params[7].value + ' ' + mark('#def602') + params[15].seriesName + ' : ' + params[11].value + '% <br/>'
//            }
//        },
//        legend: {
//            data: ['01人力业绩', '02营养业绩', '03学历业绩', '05心理业绩', '06会计业绩', '10理财业绩', '29教师业绩', '其他项目业绩', '01人力业绩占比', '02营养业绩占比', '03学历业绩占比', '05心理业绩占比', '06会计业绩占比', '10理财业绩占比', '29教师业绩占比', '其他项目业绩占比'],
//            icon: 'rect',
//            itemGap: 20,
//            itemWidth: 12,
//            itemHeight: 12,
//            left: '4%',
//            itemGap: 15,
//            bottom: 0
//        },
//        grid: {
//            left: '1%',
//            right: '1%',
//            containLabel: true
//        },
//        color: ['#85d1cf', '#fa903f', '#46b3f6', '#b5c334', '#0e8c89', '#f4700b', '#0779be', '#def602'],
//        xAxis: [
//            {
//                type: 'category',
//                data: ['2016 1', '2016 2', '2016 3', '2016 4', '2016 5', '2016 6', '2016 7', '2016 8', '2016 9', '2016 10', '2016 11', '2016 12', '2016 13', '2016 14', '2016 15', '2016 16'],
//                axisTick: {
//                    show: false
//                }
//            }
//        ],
//        yAxis: [
//            {
//                name: '',
//                type: 'value',
//                min: 0,
//                max: 10000000,
//                interval: 1000000,
//                axisLabel: {
//                    formatter: '{value}'
//                },
//                axisLine: {
//                    show: false
//                },
//                axisTick: {
//                    show: false
//                }
//            },
//            {
//                name: '',
//                type: 'value',
//                min: 0,
//                max: 100,
//                interval: 10,
//                axisLabel: {
//                    formatter: '{value} %'
//                },
//                axisLine: {
//                    show: false
//                },
//                axisTick: {
//                    show: false
//                }
//            }
//        ],
//        series: [
//            {
//                name: '01人力业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [3603989, 3303989, 6603989, 4603989, 1603989, 2603989, 1603989, 903989, 1203989, 1503989, 1803989, 1203989, 2603989, 2503989, 2703989, 1803989],
//            },
//            {
//                name: '02营养业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [1603989, 2603989, 1403989, 1303989, 1003989, 903989, 1503989, 2603989, 3603989, 3603989, 3603989, 3603989, 3603989, 3603989, 3603989, 3603989],
//            },
//            {
//                name: '03学历业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [2403989, 1603989, 3003989, 1103989, 2303989, 1203989, 2403989, 1603989, 1903989, 1503989, 1803989, 903989, 803989, 503989, 1103989, 1003989],
//            },
//            {
//                name: '05心理业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [1303989, 1203989, 1503989, 803989, 603989, 1103989, 1203989, 1103989, 1403989, 1503989, 2203989, 2403989, 2103989, 1503989, 2603989, 3363989],
//            },
//            {
//                name: '06会计业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [1303989, 1203989, 1503989, 803989, 603989, 1103989, 1203989, 1103989, 1403989, 1503989, 2203989, 2403989, 2103989, 1503989, 2603989, 3363989],
//            },
//            {
//                name: '10理财业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [1303989, 1203989, 1503989, 803989, 603989, 1103989, 1203989, 1103989, 1403989, 1503989, 2203989, 2403989, 2103989, 1503989, 2603989, 3363989],
//            },
//            {
//                name: '29教师业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [1303989, 1203989, 1503989, 803989, 603989, 1103989, 1203989, 1103989, 1403989, 1503989, 2203989, 2403989, 2103989, 1503989, 2603989, 3363989],
//            },
//            {
//                name: '其他项目业绩',
//                type: 'bar',
//                stack: "业绩合计",
//                data: [1303989, 1203989, 1503989, 803989, 603989, 1103989, 1203989, 1103989, 1403989, 1503989, 2203989, 2403989, 2103989, 1503989, 2603989, 3363989],
//            },
//            {
//                name: '01人力业绩占比',
//                type: 'line',
//                symbol: 'circle',
//                symbolSize: 5,
//                yAxisIndex: 1,
//                data: [84.1, 84.6, 87.1, 88.5, 74.3, 79.8, 84.5, 70.6, 74.1, 86.1, 84.5, 88.8, 89.3, 84.2, 81.6, 74.1],
//            },
//            {
//                name: '02营养业绩占比',
//                type: 'line',
//                symbol: 'circle',
//                symbolSize: 5,
//                yAxisIndex: 1,
//                data: [2.9, 3.4, 4.2, 4.4, 3.6, 6.8, 4.5, 8.8, 9.8, 5.4, 6.1, 4.6, 6.4, 8.6, 3.8, 6.7],
//            },
//            {
//                name: '03学历业绩占比',
//                type: 'line',
//                symbolSize: 5,
//                symbol: 'circle',
//                yAxisIndex: 1,
//                data: [12.9, 13.4, 24.2, 14.4, 13.6, 6.8, 14.5, 8.8, 9.8, 10.4, 16.1, 13.6, 19.4, 21.6, 21.8, 9.7],
//            },
//            {
//                name: '05心理业绩占比',
//                type: 'line',
//                symbolSize: 5,
//                symbol: 'circle',
//                yAxisIndex: 1,
//                data: [20.9, 23.4, 14.2, 24.4, 13.6, 16.8, 14.5, 18.8, 19.8, 25.4, 26.1, 14.6, 16.4, 28.6, 23.8, 16.7],
//            },
//            {
//                name: '06会计业绩占比',
//                type: 'line',
//                symbolSize: 5,
//                symbol: 'circle',
//                yAxisIndex: 1,
//                data: [14.2, 24.4, 13.6, 16.8, 13.6, 16.8, 14.5, 18.8, 19.8, 25.4, 26.1, 14.6, 16.4, 28.6, 23.8, 16.7],
//            },
//            {
//                name: '10理财业绩占比',
//                type: 'line',
//                symbolSize: 5,
//                symbol: 'circle',
//                yAxisIndex: 1,
//                data: [20.9, 23.4, 14.2, 24.4, 13.6, 16.8, 14.5, 18.8, 19.8, 25.4, 26.1, 14.6, 16.4, 28.6, 23.8, 16.7],
//            },
//            {
//                name: '29教师业绩占比',
//                type: 'line',
//                symbolSize: 5,
//                symbol: 'circle',
//                yAxisIndex: 1,
//                data: [16.8, 14.5, 18.8, 19.8, 13.6, 19.4, 21.6, 21.8, 9.7, 18.8, 19.8, 25.4, 26.1, 14.6, 23.8, 16.7],
//            },
//            {
//                name: '其他项目业绩占比',
//                type: 'line',
//                symbolSize: 5,
//                symbol: 'circle',
//                yAxisIndex: 1,
//                data: [14.5, 18.8, 19.8, 25.4, 13.6, 6.8, 14.5, 8.8, 9.8, 10.4, 16.1, 13.6, 16.8, 14.5, 16.4, 28.6],
//            }
//        ]
//    }
//    performanceScale.setOption(performanceScale_option);
//    performanceScale.setOption(performanceScale_option,true);
//    performanceScale.clear()
//    performanceScale.setOption(performanceScale_option);

    //图表插件屏幕自适应
    $(window).on('resize', function () {
//        monthlySummary.resize();
//        qualifiedCollapse.resize();
//        disqualifiedCollapse.resize();
//        febi1.resize();
//        febi2.resize();
//        febi3.resize();
//        febi4.resize();
//        customerPrice.resize();
//        phoneCollapse.resize();
//        promotionFee.resize();
//        qualifiedFebi.resize();
//        unqualifiedFebi.resize();
//        inquiriesCosts.resize();
//        brandComparison.resize();
//        projectComparison.resize();
//        campusComparison.resize();
//        projectDeeds.resize();
//        performanceScale.resize();
    })


    //提示框标记
    function mark(bgc) {
        return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + bgc + '"></span>';
    }

    

    //公共条件固定
    $(window).scroll(function () {
        if (Math.floor($(window).scrollTop()) > 24) {
            $('.public-conditions').css({
                'position': 'fixed',
                'width': '89%',
                'z-index': 99,
                'margin-left': '-21px',
                'margin-top': '-20px'
            });
			$('.advanced-filter').css('margin-right',70);
			$('.aggregate-data').css('margin-top', $('.public-conditions').height());
        } else {
            $('.public-conditions').css({
                'position': 'static',
                'width': '100%',
                'z-index': 9,
                'margin-left': 0,
                'margin-top': 0
            });
			$('.advanced-filter').css('margin-right',0);
			$('.aggregate-data').css('margin-top', 0);
        }
    })

    //高级筛选切换
	$('.public-conditions .condition-filtrate').slideUp(0);
	$('.advanced-filter').on('click', function () {
        if ($(this).find('i').is('.fa-angle-down')) {
			$('.public-conditions .condition-filtrate').slideDown('fast');
			$(this).html('收起筛选<i class="fa fa-angle-up margin-left-5"></i>');
        } else {
			$('.public-conditions .condition-filtrate').slideUp('fast');
			$(this).html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
        }
    })

    //右侧目录定位
    $('.catalogue li:not(:first,:last)').hide();
    $('.catalogue').on('click', '.collapse-btn', function () {
        if ($(this).find('i').is('.fa-angle-up')) {
            $(this).html('展开<i class="fa fa-angle-down margin-left-5"></i>')
            $('.catalogue li:not(:first,:last)').slideUp();
        } else {
            $(this).html('收起<i class="fa fa-angle-up margin-left-5"></i>');
            $('.catalogue li:not(:first,:last)').slideDown();
        }
    })

    var dataheight = $('.public-conditions').height() + $('.breadcrumbs-fixed').height() + $('.navbar-fixed-top').height() + 80;

    function anchorPoint(parentEle, correspondingEle) {
        $(parentEle).find('li:not(:first,:last) a').each(function (index, ele) {
            $(ele).on('click', function () {
                $('body').animate({scrollTop: $(correspondingEle + index).offset().top - dataheight}, 500);
                return false;
            })
        });
    }

    anchorPoint('.catalogue', '.data');

    //返回顶部
    $('.catalogue li:last a').on('click', function () {
        $('body').animate({scrollTop: 0}, 800)
        return false;
    })
    /**--------------------页面元素---------------------end**/
    initProject();
    DataTable.init();
    
    loadData();
    
})

/**
 * 加载项目
 * @param projectType
 */
function initProject(){
	var projectType = $("#projectType").val();
	if(projectType){
		if(projectType.length == 2 || projectType.length == 0){
			projectType = "";					
		}else{
			projectType = projectType[0];
		}
	}
	 $.ajax({
         url: ctx + '/bizProject/getAll',
         data: {projectType: projectType},
         dataType: 'json',
         type: 'post',
         success: function (data) {
             var opt = "";
             for (var i = 0; i < data.list.length; i++) {
                 opt += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
             }
             $("#projectId").html(opt);
             $('.selectpicker').selectpicker('refresh');
         },
         error: function () {
             toastr.error("系统错误");
         }
     });
}