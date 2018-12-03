$(function () {
	$(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    });
	
	$('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })
	//初始化分校select （信息归属地）
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
            $("#departmentId1").html('<option value="">--请选择--</option>' + opt);
            $('#departmentId1').trigger('chosen:updated');
            $("#departmentId1").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	/**
	 * 初始化产品模型
	 */
    $.ajax({
        url: ctx + '/product/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].modelId + " data-value=" + JSON.stringify(data[i].JsonDetail) + ">" + data[i].modelName + "</option>";
            }
            $("select[name='productModelId']").html('<option value="">--请选择--</option>' + zxkc);
            $("select[name='productModelId']").trigger('chosen:updated');
            $("select[name='productModelId']").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误5");
        }
    });
    
    $("select[name='productModelId']").change(function(){
    		var productModelId = $(this).val();
    		$("select[name='projectSelect']").find('option').remove();
    		 $.ajax({
    		        url: ctx + '/product/getProductByModel',
    		        type: 'POST',
    		        data:{
    		        		"productModelId":productModelId
    		        },
    		        dataType: 'json',
    		        success: function (data) {
    		        		data = data.data;
    		            var zxkc = "";
    		            for (var i = 0; i < data.length; i++) {
    		                zxkc += "<option value=" + data[i].productId + " >" + data[i].productName + "</option>";
    		            }
    		            $("select[name='projectSelect']").html(zxkc);
    		            $("select[name='projectSelect']").selectpicker('refresh'); 
    		        },
    		        error: function (response) {
    		            toastr.error("系统错误5");
    		        }
    		    });
    });
    
    
    
    $("select[name='projectSelect']").change(function(){
		var epId = $(this).val();
		var ids = "";
		if(epId!=null){
			$.each(epId,function(index,value){
				ids += value+",";
			});
		}
		ids = ids.substring(0,ids.length-1);
		$('input[name="project"]').val(ids);	
    });
    
    
	/**
	 * 初始化费用种类
	 */
    $.ajax({
        url: ctx + '/dataExpensesType/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	data = data.list;
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option code="+data[i].expensesTypeName+" value=" + data[i].expensesTypeId + " >" + data[i].expensesTypeName + "</option>";
            }
            $("select[name='epSelect']").html(zxkc);
            $("select[name='epSelect']").selectpicker('refresh'); 
        },
        error: function (response) {
            toastr.error("系统错误5");
        }
    });
    
    $("select[name='epSelect']").change(function(){
		var epId = $(this).val();
		var epCode = "";
		var ids = "";
		var idName = "";
		if(epId!=null){
			$.each(epId,function(index,value){
				ids += value+",";
				epCode += $("select[name='epSelect']").find("option[value='"+value+"']").attr("code")+",";
			});
		}
		epCode = epCode.substring(0,epCode.length-1);
		ids = ids.substring(0,ids.length-1);
		$('input[name="epId"]').val(ids);	
		$('input[name="epName"]').val(epCode);	
    });
    
    $('.salesPromotionAdd').on('hidden.bs.modal', function () {
        $('#salesPromotionAdd')[0].reset();
        $('#salesPromotionAdd input:hidden').val('');
        $('#salesPromotionAdd .selectpicker').selectpicker('refresh');
        $('#salesPromotionAdd').data('bootstrapValidator').resetForm();
    })
    //优惠码和促销活动切换
    $('#myTab li').click(function(){
    	if($.trim($(this).text()) == '促销活动'){
    		if(!$("#cuXiao tbody").hasClass('loadOver')){
    			//促销活动数据初始化
    			$("#cuXiao tbody").html("<tr><td height='300' colspan='9' class='text-center'></td></tr>");
    			$("#cuXiao tbody>tr>td").mLoading({
    				text: '正在加载中，请稍后......',
    				 icon: "../statics_html/common/image/loading5.gif"
    			});
    			cxDataTable.init();
    			$("#cuXiao tbody").addClass('loadOver');
    		}else{
    			$("#cuXiao").mLoading({
    			    text: '正在加载中，请稍后......',
    				icon: "../statics_html/common/image/loading5.gif"
    			 });
    			$('#cuXiao .mloading-mask').css({
    				'top':'42px',
    				'background-color':'rgba(233, 233, 232, 0.5)'
    			 });
    			cxDataTable.init();
    			$("#cuXiao").mLoading('hide');
    		}
        }else if($.trim($(this).text()) == '优惠额度'){
        	$("#deptCode").mLoading({
			    text: '正在加载中，请稍后......',
				icon: "../statics_html/common/image/loading5.gif"
			 });
			$('#deptCode .mloading-mask').css({
				'top':'42px',
				'background-color':'rgba(233, 233, 232, 0.5)'
			 });
			deptDataTable.init();
			$("#deptCode").mLoading('hide');
        }else{
			$("#youHuiCode").mLoading({
			    text: '正在加载中，请稍后......',
				icon: "../statics_html/common/image/loading5.gif"
			 });
			$('#youHuiCode .mloading-mask').css({
				'top':'42px',
				'background-color':'rgba(233, 233, 232, 0.5)'
			 });
			yhmDataTable.init();
			$("#youHuiCode").mLoading('hide');
        }
    })
    
    
    $('#updateDuration').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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
    $('#updateDuration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });
    //日期控件
    $('#duration').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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

    $('#duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
        $('#promoCodeAdd').data('bootstrapValidator') 
        .updateStatus('duration', 'NOT_VALIDATED',null) 
        .validateField('duration'); 
    });

    $('#duration22').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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

    $('#duration22').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });
    
    $('#duration1').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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

    $('#duration1').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#duration2').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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

    $('#duration2').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#duration3').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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
    
    $('#duration4').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
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

    $('#duration3').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
        var endTime = new Date(picker.endDate.format('YYYY-MM-DD')).getTime();
        var currentTime = new Date(moment().format('YYYY-MM-DD')).getTime();
        if(currentTime - endTime >= 0){
            $('#promoCodeAdd').data('bootstrapValidator') 
            .updateStatus('duration', 'NOT_VALIDATED',null) 
            .validateField('duration'); 
        	$(this).parent().next('small').hide();
     	    $('#salesPromotionAdd').data('bootstrapValidator').updateStatus('duration3', 'NOT_VALIDATED',null).validateField('duration3'); 
        	$(this).parent().parent().parent().removeClass('has-success').addClass('has-error');
        	toastr.error("结束日期必须晚于当前日期");
        	$('.salesPromotionAdd button[type="submit"]').attr('disabled',true);
        }else{
        	$(this).parent().next('small').hide();
            $('#promoCodeAdd').data('bootstrapValidator') 
            .updateStatus('duration', 'NOT_VALIDATED',null) 
            .validateField('duration'); 
        	$(this).parent().parent().parent().removeClass('has-error').addClass('has-success');
           	$('.salesPromotionAdd button[type="submit"]').attr('disabled',false);
        }
       
    });
    
    $('#duration4').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
        var endTime = new Date(picker.endDate.format('YYYY-MM-DD')).getTime();
        var currentTime = new Date(moment().format('YYYY-MM-DD')).getTime();
        if(currentTime - endTime >= 0){
            $('#promoCodeAdd').data('bootstrapValidator') 
            .updateStatus('duration', 'NOT_VALIDATED',null) 
            .validateField('duration'); 
        	$(this).parent().next('small').hide();
     	    $('#salesPromotionAdd').data('bootstrapValidator').updateStatus('duration3', 'NOT_VALIDATED',null).validateField('duration3'); 
        	$(this).parent().parent().parent().removeClass('has-success').addClass('has-error');
        	toastr.error("结束日期必须晚于当前日期");
        	$('.salesPromotionAdd button[type="submit"]').attr('disabled',true);
        }else{
        	$(this).parent().next('small').hide();
            $('#promoCodeAdd').data('bootstrapValidator') 
            .updateStatus('duration', 'NOT_VALIDATED',null) 
            .validateField('duration'); 
        	$(this).parent().parent().parent().removeClass('has-error').addClass('has-success');
           	$('.salesPromotionAdd button[type="submit"]').attr('disabled',false);
        }
       
    });

    //促销活动类型
    (function () {
        if ($('.activityType :selected').val() == 1) {
            $('.lowerLimit2').hide();
            $('.discount').show();
        }
        if ($('.activityType :selected').val() == 2) {
            $('.lowerLimit2').hide();
            $('.discount').show();
        }
        if ($('.activityType :selected').val() == 3) {
            $('.lowerLimit2').show();
            $('.discount').hide();
        }
    })();


    //新增促销活动类型切换
    $('.salesPromotionAdd').find('.activityType select').on('change', function () {
        var isOverlay = [
            ["优惠码"],
            ["优惠码"],
            ["满额返券"]
        ];

        var activityOverlay = $('#activityAdd option:selected').val();
        if(activityOverlay==2){
        		$('.discount').show();
        		$('.epName').show();
        		$('.limit1').hide();
        		$('.lowerLimit2').hide();
        }
        if(activityOverlay==1){
	    		$('.limit1').show();
	    		$('.discount').hide();
	    		$('.epName').hide();
	    		$('.lowerLimit2').hide();
	    }
        if(activityOverlay==4){
        		
	    		$('.lowerLimit2').show();
	    		$('.epName').show();
	    		$('.limit1').hide();
	    		$('.discount').hide();
        }
    })
    //编辑促销活动类型切换
    $('.salesPromotionEdit select[name="type"]').on('change', function () {
    	 	$('.salesPromotionEdit .lowerLimit2').hide();
 	    $('.salesPromotionEdit .discount').hide();
 	    $('.salesPromotionEdit .epName').hide();
 	    $('.salesPromotionEdit .limit1').hide();
 	    var val = $(this).val();
 		if(val=="1"){
 			$('.salesPromotionEdit .limit1').show();
	    	}
	    	if(val=="2"){
	    	    $('.salesPromotionEdit .discount').show();
	    	    $('.salesPromotionEdit .epName').show();
	    	}
	    	if(val=="4"){
	    		$('.salesPromotionEdit .lowerLimit2').show();
	    	    $('.salesPromotionEdit .epName').show();
	    	}
    })

    $('#deptTabCode').on('click', '.produce', function () {
	  	$('#promoCodeAdd')[0].reset();
	    $('#promoCodeAdd').data('bootstrapValidator').resetForm();
    	var record = $(this).data('record');
    	$('#activityInitId').val(record.activityInitId);
    	$('#dept').val(record.dept);
    	$('.mainAmount').val(record.initAmount+record.useAmount);
    	$('.useAmount').val(record.initAmount);
    	//$('.bgTime').val(jsDateFormat(record.beginTime));
    	//$('.edTime').val(jsDateFormat(record.endTime));
    	$('.promoCodeAdd').modal('show');
    });
    
    $('#cuXiao').on('click', '.updateForm', function () {
	  	$('#salesPromotionEdit')[0].reset();
	    $('#salesPromotionEdit').data('bootstrapValidator').resetForm();
	    $('.salesPromotionEdit .lowerLimit2').hide();
	    $('.salesPromotionEdit .discount').hide();
	    $('.salesPromotionEdit .epName').hide();
	    $('.salesPromotionEdit .limit1').hide();
	    
	    	var record = outCode($(this).data('record'));
	    	record = JSON.parse(record);
	    	
	    	$('#salesPromotionEdit input[name="title"]').val(record.title);
	    	$('#salesPromotionEdit input[name="activityId"]').val(record.activityId);
	    	$('#salesPromotionEdit select[name="type"]').val(record.type);
	    	$('#salesPromotionEdit select[name="productModelId"]').val(record.productModelId);
	    	$('#salesPromotionEdit select[name="productModelId"]').trigger('chosen:updated');
	    	$('#salesPromotionEdit select[name="productModelId"]').chosen({no_results_text: "没有匹配项"});
        $('.chosen-container').width('100%');
	    	
	    	$('#salesPromotionEdit input[name="epId"]').val(record.epId);
	    	$('#salesPromotionEdit input[name="epName"]').val(record.epName);
	    	$('#salesPromotionEdit input[name="limit1"]').val(record.limit1);
	    	$('#salesPromotionEdit input[name="project"]').val(record.project);
	    	$('#salesPromotionEdit input[name="discount"]').val(record.discount);
	    	$('#salesPromotionEdit input[name="limit1"]').val(record.limit1);
	    	$('#salesPromotionEdit input[name="scale1"]').val(record.scale1);
	    	$('#salesPromotionEdit input[name="scale2"]').val(record.scale2);
	    	$('#salesPromotionEdit select[name="enable"]').val(record.enable);
	    	$('#salesPromotionEdit select[name="isMulti"]').val(record.isMulti);
	    	$('#salesPromotionEdit select[name="epSelect"]').val(record.epId);
	    	$('#salesPromotionEdit textarea[name="description"]').val(record.description);
	    	var beginAndEnd = record.beginTime + " - " + record.endTime;
	    	$('#salesPromotionEdit .duration4').val(beginAndEnd);
	    	if(record.type=="1"){
	    	    $('.salesPromotionEdit .limit1').show();
	    	}
	    	if(record.type=="2"){
	    	    $('.salesPromotionEdit .discount').show();
	    	    $('.salesPromotionEdit .epName').show();
	    	}
	    	if(record.type=="4"){
	    		$('.salesPromotionEdit .lowerLimit2').show();
	    	    $('.salesPromotionEdit .epName').show();
	    	}
	    	
	    	if(record.epId != null){
    	 		var list = record.epId.split(',');
       	    var ids = new Array();
       	    $.each(list, function (i) {
       	    		ids.push(list[i]);
       	    });
       	    $("select[name='epSelect']").selectpicker('val', ids);
	    	}
   	    $("select[name='epSelect']").selectpicker('refresh');
	    	
	    	 $.ajax({
 		        url: ctx + '/product/getProductByModel',
 		        type: 'POST',
 		        data:{
 		        		"productModelId":record.productModelId
 		        },
 		        dataType: 'json',
 		        success: function (data) {
 		        		data = data.data;
 		            var zxkc = "";
 		            for (var i = 0; i < data.length; i++) {
 		                zxkc += "<option value=" + data[i].productId + " >" + data[i].productName + "</option>";
 		            }
 		            $("select[name='projectSelect']").html(zxkc);
 		        	var list = record.project.split(',');
 		   	    var ids = new Array();
 		       	    $.each(list, function (i) {
 		       	    		ids.push(list[i]);
 		       	    });
 		       	    $("select[name='projectSelect']").selectpicker('val', ids);
 		       	    $("select[name='projectSelect']").selectpicker('refresh');
 		        },
 		        error: function (response) {
 		            toastr.error("系统错误5");
 		        }
 		    });
	    	$('.salesPromotionEdit').modal('show');
    });
});
//优惠码查询
var deptDataTable = function () {
    return {
        init: function () {
            var deptTabCode = $('#deptTabCode').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                "sAjaxSource": ctx + '/bizActivityInit/load',
                "fnServerData": retrieveDataInit,//用于替换默认发到服务端的请求操作
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
                    {"mData": "deptName", 'sClass': "text-center"},
                    {"mData": "initAmount", 'sClass': "text-center"},
                    {"mData": "useAmount", 'sClass': "text-center"},
                    {"mData": "begin_time", 'sClass': "text-center","mRender": function (data, type, full) {
                        //return jsDateFormat(full['beginTime']).replace(' 00:00:00','')+"-"+jsDateFormat(full['endTime']).replace(' 00:00:00','');
                    		return full['beginTime'].replace(' 00:00:00','')+"-"+full['endTime'].replace(' 00:00:00','');
                    }},
                    {"mData": "useTime", 'sClass': "text-center","mRender": function (data, type, full) {
                    	var d = '<a class="btn btn-info btn-xs data-btn produce" data-record=\'' + JSON.stringify(full) + '\' data-toggle="modal" data-target=".dataPermission" data-backdrop="static">生成优惠码</a>'
                    	var s = '<a class="btn btn-info btn-xs data-btn" onclick="editDeptTable(\'' + full["beginTime"]
                        + '\',\'' + full["endTime"]
                    	+ '\',\'' + full["deptName"]
                    	+ '\',\'' + full["initAmount"]
                    	+ '\',\'' + full["useAmount"]
                    	+ '\',\'' + full["activityInitId"]
                        +'\')" data-toggle="modal" data-target=".dataPermission" data-backdrop="static">编辑查看</a>';
                    return d+s; 
                }}],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }]
            });
        }
    }
}();
/**
 * 编辑部门额度信息
 * @returns
 */
function editDeptTable(bg,ed,dept,init,use,activityInitId){
	$('#deptCodeUpdate .btn-primary').removeAttr('disabled');
	$('#activityInitId').val(activityInitId);
	var updateDuration = bg.replace(' 00:00:00','') + " - " + ed.replace(' 00:00:00','');
	init = init.trim();
	use = use.trim();
	$('#updateAmount').val(eval(init==''?0:init)+eval(use==''?0:use));
	$('#updateDuration').val(updateDuration);
	$('#updateDept').val(dept)
	$('.deptCodeUpdate').modal('show');
}
//优惠码查询
var yhmDataTable = function () {
    return {
        init: function () {
            var yhmTable = $('#youHuiCode').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/bizActivityCode/load',
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
                		{"mData": "fullName", 'sClass': "text-center"},
                    {"mData": "code", 'sClass': "text-center"},
                    {"mData": "createDate", 'sClass': "text-center","mRender": function (data, type, full) {
                        return full['createDate'];
                    }},
                    {"mData": "beginAndEnd", 'sClass': "text-center"},
                    {"mData": "useStatus", 'sClass': "text-center","mRender": function (data, type, full) {
                        if(data==1){
                        	return "已使用";
                        }else{
                        	return "未使用";
                        }
                    }},
                    {"mData": "amount", 'sClass': "text-center"},
                    {"mData": "modifyDate", 'sClass': "text-center",'mRender' : function (data, type, full){
                    	if (full.useStatus == 1){
                    		return data;
                    	} else {
                    		return '----';
                    	}
                    }},
                    {"mData": "modifyUserName", 'sClass': "text-center", 'mRender' : function (data, type, full){
                    	if (full.useStatus == 1){
                    		return data;
                    	} else {
                    		return '----';
                    	}
                    }}],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {},
            });
        }
    }
}();

//优惠码数据初始化
$("#deptTabCode tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#deptTabCode tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
deptDataTable.init();
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
    var status = $('#status').val();
    if (status && status.length != 0) {
        aoData.push({"name": "useStatus", "value": status});
    }
    aoData.push({"name": "searchVal", "value": $('#searchValCode').val()});

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

function retrieveDataInit(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchValDept').val();

    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

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
//新增优惠码 表单重置
$('.promocode-add').click(function(){
	  $('#promoCodeAdd')[0].reset();
      $('#promoCodeAdd').data('bootstrapValidator').resetForm();
});
//新增优惠额度 表单重置
$('.deptCodeAdd').click(function(){
	  $('#deptCodeAdd')[0].reset();
	  $('#departmentId1').trigger('chosen:updated');
      $('#deptCodeAdd').data('bootstrapValidator').resetForm();
});

//新增优惠码
$('#deptCodeAdd').bootstrapValidator({
    message: 'This value is not valid',
    fields: {//表单验证
        amount: {
            validators: {
                notEmpty: {
                    message: '金额不能为空'
                }
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var duration = $('#deptCodeAdd .duration').val();
        var amount = $('#deptCodeAdd .amount').val();
        var beginTime = duration.split(" - ")[0]+" 00:00:00";
        var endTime = duration.split(" - ")[1]+ " 23:59:59";
        $.ajax({
            url: ctx + '/bizActivityInit/addRecord',
            type: 'POST',
            data: {
                "initAmount": amount,
                "beginTime": beginTime,
                "endTime": endTime,
                "dept":$('#departmentId1').val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    $('.deptCode-add').modal('hide');
                    deptDataTable.init();
                }
                else
                    toastr.error(data.msg);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        return false;
    }
});
/**
 * 编辑优惠额度时间
 */
$('#deptCodeUpdate').bootstrapValidator({
    message: 'This value is not valid',
    fields: {//表单验证
        amount: {
            validators: {
                notEmpty: {
                    message: '金额不能为空'
                }
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var duration = $('#deptCodeUpdate .duration').val();
        var activityInitId = $('#activityInitId').val();
        var beginTime = duration.split(" - ")[0]+" 00:00:00";
        var endTime = duration.split(" - ")[1]+ " 23:59:59";
        $.ajax({
            url: ctx + '/bizActivityInit/updateRecord',
            type: 'POST',
            data: {
                "beginTime": beginTime,
                "endTime": endTime,
                "activityInitId":activityInitId
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    $('.deptCodeUpdate').modal('hide');
                    deptDataTable.init();
                }
                else
                    toastr.error(data.msg);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        return false;
    }
});

//新增优惠码
$('#promoCodeAdd').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
    },
    submitHandler: function (validator, form, submitButton) {
        var youhuimaNum = $('.youhuima .num').val();
        var amount = $('.youhuima .amount').val();
        var beginTime = $('.bgTime').val().replace(' 00:00:00','');
        var endTime = $('.edTime').val().replace(' 00:00:00','');
        var useAmount = $('.useAmount').val();
        if(useAmount==''){
        	useAmount = 0;
        }
        if(useAmount<(amount*youhuimaNum)){
        	toastr.error("费用超出");
        	return ;
        }
        for (i = 0; i < youhuimaNum; i++) {
            $.ajax({
                url: ctx + '/bizActivityCode/addNewRecord',
                type: 'POST',
                data: {
                    "amount": amount,
                    "activityInitId":$('#activityInitId').val(),
                    "dept":$('#dept').val(),
                    "beginTime": beginTime,
                    "endTime": endTime
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        $('.promoCodeAdd').modal('hide');
                        deptDataTable.init();
                    }
                    else
                        toastr.error(data.msg);
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        }
        return false;
    }
});

//查询促销活动
var cxDataTable = function () {
    return {
        init: function () {
            var cxTable = $('#cuXiao').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                "sAjaxSource": ctx + '/bizActivity/load',
                "fnServerData": retrieveDataCx,//用于替换默认发到服务端的请求操作
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
                    {"mData": "title", 'sClass': "text-center"},//标题
                    {"mData": "beginTime", 'sClass': "text-center","mRender": function (data, type, full) {
//                    	return jsDateFormat(full['beginTime']).replace(' 00:00:00','');
                    	return full['beginTime'];
                    }},
                    {"mData": "endTime", 'sClass': "text-center","mRender": function (data, type, full) {
//                    	return jsDateFormat(full['endTime']).replace(' 00:00:00','');
                    	return full['endTime'];
                    }},//结束日期
                    {"mData": "discount", 'sClass': "text-center"},//折扣
                    {"mData": "type", 'sClass': "text-center"},//类型
                    {
                        "mData": "enable",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 0) {
                                return '<span style="width: inherit" id="span' + full["activityId"] + '" onclick="chooseStudent(\'' + full["activityId"] + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
                            } else {
                                return '<span style="width: inherit" id="span' + full["activityId"] + '" onclick="chooseStudent(\'' + full["activityId"] + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
                            }
                        }
                    },//状态
                    {
                        "mData": "activityId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var d = '<a data-record=\'' + inCode(JSON.stringify(full)) + '\' class="edit updateForm" ><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            return  d;
                        }
                    }//操作
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    if (aData.discount == "") {
                        $('td:eq(3)', nRow).html('0.00');
                    }
                    if (aData.type == '2') {
                        $('td:eq(4)', nRow).html('报名折扣');
                    }  else if (aData.type == '1') {
                        $('td:eq(4)', nRow).html('优惠码');
                    }else if (aData.type == '4') {
                        $('td:eq(4)', nRow).html('积分活动');
                    }
                    return nRow;
                },
            });
        }
    }
}();

//编辑取值
function editupdt(title, activityId, project, type, isMulti, discount, limit1, limit2, beginTime, endTime, enable, description) {
    var beginAndEnd = beginTime + " - " + endTime;
    var discountUpdt = "";
    if (discount == null || discount == "") {
        discountUpdt = "0.00";
    } else {
        discountUpdt = discount;
    }
    var lowerLimit2 = "";
    if (limit2 == "null" || limit2 == "") {
        lowerLimit2 = "0.00";
    } else {
        lowerLimit2 = limit2;
    }
    $('#titleUpdt').val(title);
    $('#activityId').val(activityId);
    var projectId = project;
    $('#activityEdit').val(type);
    $('#overlayEdit').val(isMulti);
    $('#discountUpdt').val(discountUpdt);
    $('#lowerLimit1').val(limit1);
    $('#lowerLimit2').val(lowerLimit2);
    $('#duration2').val(beginAndEnd);
    $('#enableUpdt').val(enable);
    $('#descriptionUpdt').val(description);

    if (type == '1') {
        $('#overlayEdit option:eq(2)').hide().siblings().show();
    }
    if (type == '2') {
        $('#overlayEdit option:eq(3)').hide().siblings().show();
    }
    if (type == '3') {
        $('#overlayEdit option:eq(1)').hide().siblings().show();
    }

}
//编辑插入
$('#salesPromotionEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var duration2 = $('#salesPromotionEdit input[name="duration4"]').val();
        var beginTime = duration2.split(" - ")[0].replace(' 00:00:00','');
        var endTime = duration2.split(" - ")[1].replace(' 00:00:00','');
        var activityId = $('#salesPromotionEdit input[name="activityId"]').val();
        var title = $('#salesPromotionEdit input[name="title"]').val();
        var project = $('#salesPromotionEdit select[name="project"]').val();
        var type = $('#salesPromotionEdit select[name="type"]').val();
        var isMulti = $('#salesPromotionEdit select[name="isMulti"]').val();
        var discount = $('#salesPromotionEdit input[name="discount"]').val();
        var limit1 = $('#salesPromotionEdit input[name="limit1"]').val();
        var enable = $('#salesPromotionEdit select[name="enable"]').val();
        var description = $('#salesPromotionEdit textarea[name="description"]').val();
        
        
        var scale1 = $('#salesPromotionEdit input[name="scale1"]').val();
        var scale2 = $('#salesPromotionEdit input[name="scale2"]').val();
        var epId = $('#salesPromotionEdit input[name="epId"]').val();
        var epName = $('#salesPromotionEdit input[name="epName"]').val();
        var project = $('#salesPromotionEdit input[name="project"]').val();
        
        var productModelId = $('#salesPromotionEdit select[name="productModelId"]').val();
        
        
        if (type == 0) {
            toastr.error("类型不能为空，请选择！");
            return;
        }else{
        		if(type == '2'){
        			if(epId.trim() == ''){
        				toastr.error("费用种类不能为空！");
        	            return;
        			}
        			if(discount.trim() == ''){
        				toastr.error("折扣不能空！");
        	            return;
        			}
        			if(duration2.trim() == ''){
        				toastr.error("时间不能空！");
        	            return;
        			}
        		}
        		if(type == '4'){
        			if(epId.trim() == ''){
        				toastr.error("费用种类不能为空！");
        	            return;
        			}
        			if(duration2.trim() == ''){
        				toastr.error("时间不能空！");
        	            return;
        			}
        			if(scale1.trim() == '' || scale2.trim() == ''){
        				toastr.error("兑换比例不能空！");
        	            return;
        			}
        		}
        }
        if (title == 0) {
        		toastr.error("名称不能为空！");
            return;
        }
        
        
        
        $.ajax({
            url: ctx + '/bizActivity/updateRecord',
            data: {
                activityId: activityId, title: title, type: type,
                isMulti: isMulti, discount: discount, limit1: limit1, 
                enable: enable, description: description, beginTime: beginTime, endTime: endTime,
                scale1:scale1,
                scale2:scale2,
                epId:epId,
                epName:epName,
                project:project,
                type:type,
                productModelId:productModelId
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                $('.salesPromotionEdit').modal('hide');
                cxDataTable.init();
                if(data.status=="21001"){
                	 toastr.error('修改失败');
                }else{
                	 toastr.success('修改成功');
                }
            },
            error: function () {
                toastr.error("没有修改内容提交！");
            }
        });
    }
});
function retrieveDataCx(sSource, aoData, fnCallback, oSettings) {

    var beganAndEnd = $("#duration1").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" - ")[0]);
        var maxDate = trim(beganAndEnd.split(" - ")[1]);
        aoData.push({"name": "beginTime", "value": minDate});
        aoData.push({"name": "endTime", "value": maxDate});
    }
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "type", "value":$('#isMulti').val() });
    
    aoData.push({"name": "enable", "value":$('#enable').val() });
    
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });

}
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizActivity/updateEnable',
        type: 'POST',
        data: {
            activityId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            cxDataTable.init();
        }
    });
}
//新增促销活动 表单重置
$('.sales-add').click(function(){
	
	  $('#salesPromotionAdd')[0].reset();
	  $('.discount').hide();
	  $('.limit1').hide();
	  $('.lowerLimit2').hide();
	  $('.epName').hide();
	  
	  $("select[name='productModelId']").trigger('chosen:updated');
	  
	  $("select[name='projectSelect']").find('option').remove();
	  
	  $("select[name='projectSelect']").selectpicker('refresh'); 
	  $("select[name='epSelect']").selectpicker('refresh'); 
	  
      $('#salesPromotionAdd').data('bootstrapValidator').resetForm();
});
//新增促销活动
$('#salesPromotionAdd').bootstrapValidator({
	fields : {
		title : {
			validators : {
				notEmpty : {
					message : '标题不能为空！'
				}
			}
		},
		type : {
			validators : {
				notEmpty : {
					message : '请选择活动类型！'
				}
			}
		},
		productModelId : {
			validators : {
				notEmpty : {
					message : '请选择产品模型！'
				}
			}
		},
		projectSelect : {
			validators : {
				notEmpty : {
					message : '请选择产品！'
				}
			}
		},
		enable : {
			validators : {
				notEmpty : {
					message : '请选择状态！'
				}
			}
		},
		isMulti : {
			validators : {
				notEmpty : {
					message : '请选择可叠加优惠！'
				}
			}
		}
	},submitHandler: function (validator, form, submitButton) {
	        var duration3 = $('#salesPromotionAdd input[name="duration3"]').val();
	        var beginTime = duration3.split(" - ")[0];
	        var endTime = duration3.split(" - ")[1];
	        var title = $('#salesPromotionAdd input[name="title"]').val();
	        var type = $('#salesPromotionAdd select[name="type"]').val();
	        var epId = $('#salesPromotionAdd input[name="epId"]').val();
	        var epName = $('#salesPromotionAdd input[name="epName"]').val();
	        var ifMulti = $('#salesPromotionAdd select[name="isMulti"]').val();
	        var discount = $('#salesPromotionAdd input[name="discount"]').val();
	        var limit1 = $('#salesPromotionAdd input[name="limit1"]').val();
	        var enable = $('#salesPromotionAdd select[name="enable"]').val();
	        var description = $('#salesPromotionAdd textarea[name="description"]').val();
	        var scale1 = $('#salesPromotionAdd input[name="scale1"]').val();
	        var scale2 = $('#salesPromotionAdd input[name="scale2"]').val();
	        var project = $('#salesPromotionAdd input[name="project"]').val();
	        var productModelId = $('#salesPromotionAdd select[name="productModelId"]').val();
	        if (type == 0) {
	            toastr.error("类型不能为空，请选择！");
	            return;
	        }else{
	        		if(type == '2'){
	        			if(epId.trim() == ''){
	        				toastr.error("费用种类不能为空！");
	        	            return;
	        			}
	        			if(discount.trim() == ''){
	        				toastr.error("折扣不能空！");
	        	            return;
	        			}
	        			if(duration3.trim() == ''){
	        				toastr.error("时间不能空！");
	        	            return;
	        			}
	        		}
	        		if(type == '4'){
	        			if(epId.trim() == ''){
	        				toastr.error("费用种类不能为空！");
	        	            return;
	        			}
	        			if(duration3.trim() == ''){
	        				toastr.error("时间不能空！");
	        	            return;
	        			}
	        			if(scale1.trim() == '' || scale2.trim() == ''){
	        				toastr.error("兑换比例不能空！");
	        	            return;
	        			}
	        		}
	        }
	        if (title == 0) {
	        		toastr.error("名称不能为空！");
	            return;
	        }
	        
	        var strs = {
    		 		"title":title, 
                "type":type, 
                "isMulti":ifMulti,
                "limit1":limit1,
                "enable":enable, 
                "description":description, 
                "beginTime":beginTime,
                "endTime":endTime,
                "productModelId":productModelId,
                "scale1":scale1,
                "scale2":scale2,
                "epId":epId,
                "epName":epName,
                "project":project,
                "discount":discount
	        }
	        $.ajax({
	            url: ctx + '/bizActivity/addNewRecord',
	            type: 'POST',
	            data: strs,
	            dataType: 'json',
	            success: function (data) {
	                if (data.status == "success") {
	                    $('.salesPromotionAdd').modal('hide');
	                    cxDataTable.init();
	                }
	                else {
	                    toastr.error(data.msg);
	                }
	            },
	            error: function (response) {
	                toastr.error("系统错误");
	            }
	        });
	    }
});


//促销活动编辑验证
$('.salesPromotionEdit').bootstrapValidator({
	message : 'This value is not valid',
	excluded : [':disabled'],//[':disabled', ':hidden', ':not(:visible)']
	feedbackIcons : {
		invalid : 'glyphicon gluphicon-remove',
		validating : 'glyphicon glyohicon-refresh'
	},	
	fields : {
		title : {
			validators : {
				notEmpty : {
					message : '标题不能为空！'
				}
			}
		},
		type : {
			validators : {
				notEmpty : {
					message : '请选择活动类型！'
				}
			}
		},
		productModelId : {
			validators : {
				notEmpty : {
					message : '请选择产品模型！'
				}
			}
		},
		projectSelect : {
			validators : {
				notEmpty : {
					message : '请选择产品！'
				}
			}
		},
		enable : {
			validators : {
				notEmpty : {
					message : '请选择状态！'
				}
			}
		},
		isMulti : {
			validators : {
				notEmpty : {
					message : '请选择可叠加优惠！'
				}
			}
		}
	}
});

//回车搜索
function search() {
    if (event.keyCode == 13) {
	    	deptDataTable.init();
	    	yhmDataTable.init();
	    cxDataTable.init();
    }
}
