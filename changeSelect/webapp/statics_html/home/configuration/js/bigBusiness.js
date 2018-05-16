$(function () {
	 //日期控件
    $('.duration').daterangepicker({
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

    $('.duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
        var endTime = new Date(picker.endDate.format('YYYY-MM-DD')).getTime();
        var currentTime = new Date(moment().format('YYYY-MM-DD')).getTime();
        if(currentTime - endTime > 0){
        	 $('#bigBusinessAdd').data('bootstrapValidator') 
             .updateStatus('duration', 'NOT_VALIDATED',null).validateField('duration'); 
        	 
        	$(this).parent().parent().parent().removeClass('has-success').addClass('has-error');
        	toastr.error("结束日期必须晚于当前日期");
        	$('.bigBusinessAdd button[type="submit"]').attr('disabled',true);
        }else{
        	$(this).parent().parent().parent().removeClass('has-error').addClass('has-success');
        	$('.bigBusinessAdd button[type="submit"]').attr('disabled',false);
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
	})
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
            $('#bigBusinessAdd select[name="departmentId"]').html(opt);
            $('#bigBusinessAdd select[name="departmentId"]').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    //初始化品牌
    $.ajax({
        url: ctx + '/bizBrand/getAllOption',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
            	opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
            }
            $('#bigBusinessAdd select[name="brandId"]').html(opt);
            $('#bigBusinessAdd select[name="brandId"]').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    //初始咨询课程
    $.ajax({
        url: ctx + '/bizProject/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var opt = "";
            for (var i = 0; i < data.list.length; i++) {
            	opt += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            }
            $('#bigBusinessAdd select[name="projectId"]').html(opt);
            $('#bigBusinessAdd select[name="projectId"]').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
    $('.bigBusinessAdd').on('hidden.bs.modal', function () {
    	$('#bigBusinessAdd')[0].reset();
    	$('#bigBusinessAdd .selectpicker').selectpicker('refresh');
    	$('#bigBusinessAdd input[name="departmentId"]').trigger('chosen:updated');
    	$('#bigBusinessAdd input.duration').val('');
    	$('#bigBusinessAdd').data('bootstrapValidator').resetForm();
    })	
	
	//新增
	$('#bigBusinessAdd').bootstrapValidator({
	    submitHandler: function (validator, form, submitButton) {
	    	$('input[name=departmentName]').val($('#bigBusinessAdd select[name="departmentId"]').siblings('.btn').attr('title'));
	    	$('input[name=projectName]').val($('#bigBusinessAdd select[name="projectId"]').siblings('.btn').attr('title'));
	    	$('input[name=brandName]').val($('#bigBusinessAdd select[name="brandId"]').siblings('.btn').attr('title'));
	    	
	        var options = form.serialize();
	        
//	        var dateRange = $('#bigBusinessAdd input.duration').val();
//	        var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g');
//	        var startDate = patt.exec(dateRange);
//	        var endDate = patt.exec(dateRange);
//	        
//	        if(dateRange == '' || dateRange == null){
//	            toastr.error("起止日期不能为空");
//	            $('.duration').parent().parent().parent().removeClass('has-success').addClass('has-error');
//	        }
//	        if(startDate && endDate){
//	        	options = options + "&bDate=" + startDate + "&eDate=" + endDate;
//	        }
	        
	        
	        $.ajax({
	            type: "POST",
	            url: ctx + '/financeBusinessType/addRecord',
	            data: options,
	            dataType: 'json',
	            success: function (data) {
	                DataTable.init();
	                $('.bigBusinessAdd').modal('hide');
	            }
	        });
	    }
	});

    //启用、禁用切换
    $('table tbody').on('click', '.status-btn', function () {
        if ($(this).hasClass('btn-use')) {
            $(this).removeClass('btn-use').addClass('btn-nouse');
            $(this).html('<i class="fa fa-ban"></i> 禁用');
        } else {
            $(this).removeClass('btn-nouse').addClass('btn-use');
            $(this).html('<i class="fa fa-check-square-o"></i> 启用');
        }
    })
    
    $('#startupConfig1').click(function(){
    	DataTable.init();
    });
    
    $('#startupConfig2').click(function(){
    	DataTable.init();
    });
})


//品牌初始化数据
var DataTable = function () {
    return {
        init: function () {
            var Table = $('#bigBusiness').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/financeBusinessType/getAll',
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
                    {"mData": "designation", 'sClass': "text-center"},
                    {"mData": "departmentName", 'sClass': "text-center"},
                    {"mData": "projectName", 'sClass': "text-center"},
                    {"mData": "brandName", 'sClass': "text-center"},
                    {
                        "mData": "enable",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 0) {
                                return '<span onclick="switchStatus(\'' + full["businessTypeIds"] + '\', 1)" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
                            } else {
                                return '<span onclick="switchStatus(\'' + full["businessTypeIds"] + '\', 0)" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
                            }
                        }
                    }/*,
                    {
                        "mData": "businessTypeIds",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var v = '<a class="btn btn-warning btn-xs view"><i class="fa fa-folder-open-o"></i> 查看</a>';
                            return v;
                        }
                    }*/
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            })
          //每页显示记录数
          $('#bigBusiness_wrapper .dataTables_info').parent().append($('#bigBusiness_wrapper .dataTables_length'));
        }
    }
}();

//数据初始化
$("#bigBusiness tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#bigBusiness tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();

function switchStatus(businessTypeIds, enable){
	
    $.ajax({
        url: ctx + '/financeBusinessType/updateBatch',
        type: 'POST',
        dataType: 'json',
        data: {businessTypeIds:businessTypeIds, enable:enable},
        success: function (data) {
            if(data.status == "success")
            	DataTable.init();
            else
            	toastr.error(data.msg);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

function retrieveData(sSource, aoData, fnCallback, oSettings) {
	 aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
	 aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
	 
	 if($('#myTab11').find('li').attr('id')=='startupConfig2'){
		 aoData.push({"name": "type", "value": '2'});   
	 }else{
		 aoData.push({"name": "type", "value": '1'});   
		 alert("1");
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
};
