$(function () {
    //日期控件
    $('#reservation1').daterangepicker({
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
            '昨天': [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')],
            '本周': [moment().startOf("week").add(1,'days'),moment().endOf("week").add(1,'days')],
            '上周': [moment().subtract(1,'weeks').startOf("week").add(1,'days'),moment().subtract(1,'weeks').endOf("week").endOf("week").add(1,'days')],
            '本月': [moment().startOf("month"),moment().endOf("month")],
            '上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],
            '最近7天': [moment().subtract(6,'days'), moment()],
            '最近30天': [moment().subtract(29,'days'), moment()]
        },
        applyClass: 'btn-primary',
        alwaysShowCalendars: true,
        autoclose: true,
        autoUpdateInput: false,
		showDropdowns: true
    });

    //日期确定按钮
    $('#reservation1').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });


	$('#status').chosen({no_results_text: "没有匹配项"})

    //信息提示　
    $(".distribute").on({
        mouseover:function(){
            $(this).attr('data-content', $('.distributionInfo').html());
        },
        click: function () {
            $(this).popover({html: true});
        }
    });

    //按钮切换
    $(".tab_content_11 li").hover(function () {
        $(this).find("div").css({"display": "block", "transform": "rotate3d(0deg,30deg)"});
    }, function () {
        $(this).find("div").css({"display": "none"})
    });

	//数据初始化
	loadingTable('#init',9);
	init();
    //点击查看
    $('#init').on('click', '.edit', function(){
    	var record = $(this).data('record');
    	$('#departmentName1').val(record.departmentName1);
    	$('#phoneBelongView').val(record.phoneBelong);
    	$('#brandNameView').val(record.brandName);
    	$('#studentAttrName2').val(record.studentAttrName2);
    	$('#studentAttrName1').val(record.studentAttrName1);
    	$('#keywordView').val(record.keyword);
    	$('#pageUrlView').val(record.pageUrl);
    	$('#studentNameView').val(record.studentName);
    	$('#studentPhoneView').val(record.studentPhone);
    	$('#studentSexView').val(record.studentSex?"女":"男");
    	$('#wechatView').val(record.weChat);
    	$('#ageView').val(record.age);
    	$('#tengXunView').val(record.tengXun);
//    	$('#projectNameView').val(record.projectName);
//    	$('#projectLevelNameView').val(record.projectLevelName);
    	$('#studentAttrName3').val(record.studentAttrName3);
    	$('#notesView').val(record.notes);
    	$('#conversationView').val(record.conversation);
    	editor2.html(record.conversation);
    	$('#viewInfo').modal('show');
    	
    	 //课程信息部分回显
        $('#productModelNameView').val(record.productModelName);//产品模型
        $('#productNameView').val(record.productName);//产品
        //清除上次选择后生成的下拉框
        $(".removeFlag").parent().parent().remove();
        backValue(record);//开始动态回显课程信息
    })
})

$(document).on('change', 'input:checkbox.master', function(){
		if($(this).prop('checked')){
			$('input:checkbox.slaver').prop('checked', true);
		}else{
			$('input:checkbox.slaver').prop('checked', '');
		}
})

/*自定义日期格式化:yyyy-MM-dd HH:mm:ss*/    
Date.prototype.toLocaleString = function() {
	  var monthStr = this.getMonth() + 1;
	  if(monthStr<=9) {
		  monthStr = "0"+monthStr;
	  }
	  var dayStr = this.getDate();
	  if(dayStr<=9) {
		  dayStr = "0"+dayStr;
	  }
	  var hoursStr = this.getHours();
	  if(hoursStr<=9) {
		  hoursStr = "0"+hoursStr;
	  }
	  var minutesStr = this.getMinutes();
	  if(minutesStr<=9) {
		  minutesStr = "0"+minutesStr;
	  }
	  var secondsStr = this.getSeconds();
	  if(secondsStr<=9) {
		  secondsStr = "0"+secondsStr;
	  }
    return this.getFullYear() + "-" + (monthStr) + "-" + dayStr + " " + hoursStr + ":" + minutesStr + ":" + secondsStr;
};
/**
 * 初始化
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
		"sAjaxSource" : ctx+'/consultBackFlow/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "infoManageId",'sClass': "text-center","mRender": function ( data, type, full ) {
//				if(full["counselorId"]!=userId){
					return "<label> <input id=" + data + "  name='infoManageIds' value=" + data + " type='checkbox' class='slaver'> <span class='text'></span> </label>";
//				}else{
//					return "<span class='glyphicon glyphicon-ban-circle'></span>";
//				}
              }},
            {"mDataProp" : "departmentName1","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "productName","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "studentName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "departmentName2","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "counselor","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "createDate","bSortable": false,'sClass': "text-center","mRender": function (data, type, full) {
	          		if(full["createDate"]==null || full["createDate"]=="") {
	        			return "";
	        		}
	                var timestamp = new Date(full["createDate"]);
	                return timestamp.toLocaleString();
              }},
              {"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
            	  var u = "<a data-record='"+JSON.stringify(full)+"' class='edit' data-backdrop='static'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
            	  return u;
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
		$('#init_wrapper .dataTables_info').parent().append($('#init_wrapper .dataTables_length'));
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
	 * 条件参数添加
	 */
	/**
	 * 搜索日期参数添加
	 */
	var beganAndEnd = $("#reservation1").val();
	if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" 到 ")[0]) + ' 00:00:00';
        var maxDate = trim(beganAndEnd.split(" 到 ")[1]) + ' 59:59:00';
        aoData.push({"name": "beginTime", "value": minDate});
        aoData.push({"name": "endTime", "value": maxDate});
    }
	/**
	 * 页数，每页显示记录数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	/*aoData.push( { "name": "beginTime", "value": $("#reservation1").val().split("到")[0] + ' 00:00:00' } );
	aoData.push( { "name": "endTime", "value": $("#reservation1").val().split("到")[1] + ' 59:59:00' } );*/
	/**
	 * var infoDisDep = "${dep}";部门id的集合
	 */
	aoData.push( { "name": "departmentId2", "value": infoDisDep } );
	/**
	 * 搜索框搜索值添加
	 */
	aoData.push( { "name": "searchVal", "value": $("#searchVal").val()} );
	/**
	 * 单选框，筛选值添加
	 */
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
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}
function toChooseAr(){
	var idAr = "";//复选框选中的咨询量id
	$('.slaver').each(function(){//所有复选框选中的咨询量id
		if(this.checked){
			idAr = idAr + this.id + ",";
		}
	})
	idAr = idAr.substring(0,idAr.length-1);
	var counselor =  $('#status').find("option:selected").text();
	var counselorId = $('#status').val();
	if(counselorId == '0'){
		toastr.error('当前咨询师无效');
		return;
	}
	if(idAr != ''){
		$.ajax({
			"type" : "Post",
			"url" : ctx+"/consultBackFlow/toChooseAr",
			"dataType" : "json",
			"data" : {
				ar : idAr,
				counselor:counselor,
				counselorId:counselorId,
				status:2
			},
			"success" : function(data) {
				if(data=="success"){
					toastr.success('分配完成');
					init();
					$('#init input.master').prop('checked', false);
				} else　{
					toastr.error(data.msg);
				}
				
			}
		});	
	}else{
		toastr.error('请选择信息!');
	}
	
}

//导出excel文件
function exportExcel() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	
	window.location.href = ctx + "/consultDistributeCenter/exportExcel?infoManageIds="+chk_value;
	
}

//导出PDF文件
function exportPDF() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultDistributeCenter/exportPDF?infoManageIds="+chk_value;
}

//导出CSV文件
function exportCSV() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultDistributeCenter/exportCSV?infoManageIds="+chk_value;
}

//回车搜索
function search(){
	if(event.keyCode==13){
		init();
	}
}