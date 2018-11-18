$(function () {
   
    //日期控件
    $('#excleDate').daterangepicker({
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
    $('#excleDate').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });

    
    
    
    
   
    

})


DataTable.init();


/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    var beganAndEnd = $("#excleDate").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" - ")[0]) + ' 00:00:00';
        var maxDate = trim(beganAndEnd.split(" - ")[1]) + ' 59:59:00';
        aoData.push({"name": "beginTime", "value": minDate});
        aoData.push({"name": "endTime", "value": maxDate});
    }
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    var val = $("input[name^='allocationStatus']:checked").val();
    if (!val == '') {
        aoData.push({"name": "allocationStatus", "value": val});
    } else {
        aoData.push({"name": "allocationStatus", "value": -1});
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
    $('.dataTables_info').parent().append($('.dataTables_length'));
}

function deleteInfoManage(id) {
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
        var infoManageId = id;
        $.ajax({
            url: ctx + '/consultInfoManageExcl/updateRecord',
            type: 'POST',
            data: {
                infoManageId: infoManageId,
                deleteMark: 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    DataTable.init();
                } else {
                    toastr.error(data.msg);
                }
            }
        });
    });
}



//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

//全选
$(document).on('change', 'input:checkbox.checkAll', function(){
	if($(this).prop('checked')){
		$('input:checkbox.slaver').prop('checked', 'checked');
	}else{
		$('input:checkbox.slaver').prop('checked', '');
	}
})
//全选
    $('#infoManage thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#infoManage tbody .slaver').prop('checked', true);
        }else{
            $('#infoManage tbody .slaver').prop('checked', false);
        }
    })
    
    
    //拆分
    function split() {
	
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
		
		chk_value+=($(this).val()+","); 
	}); 
	
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选拆分数据");
	        return false;
	}
			
			
	   swal({
	        title: "",
	         
	         
	         
	        text: "确定要拆分吗？",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonClass: "btn-primary",
	        cancelButtonClass: "btn-danger",
	        confirmButtonText: "确定",
	        cancelButtonText: "取消",
	        closeOnConfirm: false
	        
	    },
	   
	   function () {
	        $.ajax({         
	            url: ctx + '/consultInfoManageExcle/addNewRecord',
	            type: 'POST',
	            data: {chk_value:chk_value},
	            dataType: 'json',
	            success: function (data) {
	            	
	                if (data.status == 'success') {
	                    swal("", " تقسيم  النجاح ！", "success");
	                    DataTable.init();
	                } else {
	                    toastr.error(data.msg);
	                }
	            }
	            
	        });
	    } 
	   
	   
	   );
	  // window.location.href = ctx + "/consultInfoManageExcle/addNewRecord?infoManageIds="+chk_value;
			 
	
	
	
	
	
}
