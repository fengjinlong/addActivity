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

    //调整时间
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };
    $(".adjustDate").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd',
        minView: 2,
        autoclose: true
    })

    //日期改变时获取值
    $(".adjustDate").on('changeDate', function (ev) {
        $(this).val();
    })

    //分校
    $('.branchSchool').chosen({no_results_text: "没有匹配项"});

    //调整模块切换
    if ($('.adjustModule').find(':selected').text() == '大创业') {
        $('.payments-text').text('收款方');
    } else {
        $('.payments-text').text('付款方');
    }

    $('.adjustModule').on('change', function () {
        if ($(this).find(':selected').text() == '大创业') {
            $('.payments-text').text('收款方');
        } else {
            $('.payments-text').text('付款方');
        }
    });
    $('.search-btn').click(function(){
    	InitiateSimpleDataTable.init();
    });
    $('.add-btn').click(function(){
    	$("#adjustDate").val("");
    	$("#adjustment").val("");
    	$("#memo").val("");
    	InitiateSimpleDataTable.load();
    });
    
    $('.commit').click(function(){
    	InitiateSimpleDataTable.add();
    });
})

var InitiateSimpleDataTable = function () {
    return {
        init: function () {
            var oTable = $('#init').dataTable({
            	"bPaginate": true,  //是否显示分页
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	"sAjaxSource" : ctx+'/financeSchoolPerformanceAdjust/getAll',
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
        		               	{ "mDataProp": "bussinsessType","bSortable": false,'sClass': "text-center", "mRender":function(data, type, full){
        		               		if(data==1){
        		               			return '大创业';
        		               		}else{
        		               			return '小创业';
        		               		}
        		               	}},
        		               	{ "mDataProp": "schoolName","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "adjustmentDate","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "payFrom","bSortable": true,'sClass': "text-center", "mRender":function(data, type, full){
        		               		if(data==1){
        		               			return '中和';
        		               		}else{
        		               			return '学慧网';
        		               		}
        		               	}},
        		               	{ "mDataProp": "adjustment","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "institutionId","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
	        		               	  var t1 = '<a href="#" schoolPerformanceAdjustId= "'+full["schoolPerformanceAdjustId"]+'" class="adjustment-btn edit" data-toggle="modal" data-target=".adjustmentEdit" data-backdrop="static"><i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
	        		               	  var t2 = '<a href="#" schoolPerformanceAdjustId= "'+full["schoolPerformanceAdjustId"]+'" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
	        		               		  return t1+t2;
        		               	}},
        		   			],
	   			"aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
            	
            });

        },
        load:function(){
        	$('#branchSchool').find('option').remove();
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
                    $("#branchSchool").html('<option value="">--请选择--</option>' + opt);
                    $('#branchSchool').trigger('chosen:updated');
                    $("#branchSchool").chosen({no_results_text: "没有匹配项"});
                    $('.chosen-container').width('100%');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        },
        add:function(){
        	var data = {
        			'schoolId':$('#branchSchool :selected').val(),
        			'adjustmentDate':$('#adjustmentDate').val(),
        			'payFrom':$('#payFrom').val(),
        			'adjustment':$('#adjustment').val(),
        			'memo':$('#memo').val(),
        			'bussinsessType':$('#bussinsessType').val(),
        			'schoolName':$('#branchSchool :selected').text()
        	};
        	$.ajax({
                url: ctx + '/financeSchoolPerformanceAdjust/addNewRecord',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (data) {
                   if(data.status=='success'){
                	   $('.adjustmentAdd').modal('hide');
                	   InitiateSimpleDataTable.init();
                   }else{
                	   toastr.error("系统错误");
                   }
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        }

    };

}();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData( sSource, aoData, fnCallback, oSettings ) {
	 /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0]
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1]
    });
    aoData.push({
        "name": "schoolName",
        "value": $("#schoolName").val()
    });
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

//删除
$("#init").on('click','.delete',function(){
	var _this = $(this);
    swal({
        title: "",
        text: "确定要删除吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
    	var schoolperformanceadjustid = $(_this).attr("schoolperformanceadjustid");
        $.ajax({
            type: "POST",
            url: ctx + "/financeSchoolPerformanceAdjust/updateAdijust",
            data: {"schoolPerformanceAdjustId": schoolperformanceadjustid, "deleteMark": 0},
            dataType: 'json',
            success: function (msg) {
                if (msg.status == 'success') {
                    swal("", "删除成功！", "success");
                    InitiateSimpleDataTable.init();
                } else {
                    toastr.error(msg.msg);
                }

            }
        });
    });
});

//编辑
$("#init").on('click','.edit',function(){
	var schoolPerformanceAdjustId = $(this).attr("schoolperformanceadjustid");
	$.ajax({
        type: "POST",
        url: ctx + "/financeSchoolPerformanceAdjust/loadAdjustById",
        data: {"schoolPerformanceAdjustId": schoolPerformanceAdjustId},
        dataType: 'json',
        success: function (msg) {
            if (msg.status == 'success') {
                var bussinsessType = msg.data.bussinsessType;
                var payFrom = msg.data.payFrom;
                var schoolId = msg.data.schoolId;
                console.info(msg.data.adjustmentDate)
                $("#adjustmentEdit").find("input[name='schoolPerformanceAdjustId']").val(schoolPerformanceAdjustId);
                $("#adjustmentEdit").find("select[name='adjustModule']").val(bussinsessType);
                $("#adjustmentEdit").find("input[name='adjustmentDate']").val(msg.data.adjustmentDate);
                $("#adjustmentEdit").find("select[name='payments']").val(payFrom);
                $("#adjustmentEdit").find("input[name='adjustment']").val(msg.data.adjustment);
                $("#adjustmentEdit").find("textarea[name='memo']").text(msg.data.memo);
                
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
                        $("#adjustmentEdit").find("select[name='branchSchool']").html('<option value="">--请选择--</option>' + opt);
                        $("#adjustmentEdit").find("select[name='branchSchool']").trigger('chosen:updated');
                        $("#adjustmentEdit").find("select[name='branchSchool']").chosen({no_results_text: "没有匹配项"});
                        $('.chosen-container').width('100%');
                        $("#adjustmentEdit").find("select[name='branchSchool']").val(schoolId);
                        $("#adjustmentEdit").find("select[name='branchSchool']").trigger('chosen:updated');
                    },
                    error: function (response) {
                        toastr.error("系统错误");
                    }
                });
            } else {
                toastr.error("出错了！");
            }

        }
    });
});

//保存编辑
$("#editSubmit1").click(function(){
	var data = {
			'schoolPerformanceAdjustId':$("#adjustmentEdit").find("input[name='schoolPerformanceAdjustId']").val(),
			'bussinsessType':$("#adjustmentEdit").find("select[name='adjustModule']").val(),
			'schoolId':$("#adjustmentEdit").find("select[name='branchSchool']").val(),
			'adjustmentDate':$("#adjustmentEdit").find("input[name='adjustmentDate']").val(),
			'payFrom':$("#adjustmentEdit").find("select[name='payments']").val(),
			'adjustment':$("#adjustmentEdit").find("input[name='adjustment']").val(),
			'memo':$("#adjustmentEdit").find("textarea[name='memo']").val()
	};
	$.ajax({
        type: "POST",
        url: ctx + "/financeSchoolPerformanceAdjust/updateAdijust",
        data: data,
        dataType: 'json',
        success: function (msg) {
            if (msg.status == 'success') {
                swal("", "修改成功！", "success");
                $('.adjustmentEdit').modal('hide');
         	   InitiateSimpleDataTable.init();
            } else {
                toastr.error(msg.msg);
            }

        }
    });
});
$("#init tbody").html("<tr><td height='300' colspan='6' class='text-center'></td></tr>");
$("#init tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
InitiateSimpleDataTable.init();