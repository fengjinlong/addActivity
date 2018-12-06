$(function () {
    $("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();

    $(document).on('change', 'input:checkbox.master', function(){
        if($(this).prop('checked')){
            $('input:checkbox.slaver').prop('checked', 'checked');
        }else{
            $('input:checkbox.slaver').prop('checked', '');
        }
    })
    function excleUser(){

    }
})

/**
 * 回车检索
 * @returns
 */
function search(){
	if(event.keyCode==13){
		toSearch();
	}
}
function toSearch(){
	init();
}
/**
 * 初始化时间控件
 * @returns
 */
function initDate(){
	$('#reservation').daterangepicker({
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
		autoUpdateInput: false
	});

	$('#reservation').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
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
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": $("#reservation").val().split("到")[0] } );
	aoData.push( { "name": "endTime", "value": $("#reservation").val().split("到")[1] } );
	if($("#searchVal").val()=="启用"){
		aoData.push( { "name": "enable", "value": 1} );
	}
	else if($("#searchVal").val()=="禁用"){
		aoData.push( { "name": "enable", "value": 0} );
	}else{
		aoData.push( { "name": "searchVal", "value": $("#searchVal").val()} );
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
/**
 * 初始化数据
 * @returns
 */
function init (){
	var init = $('#init').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"iDisplayLength": 10, 
		"bPaginate":true,
		"bSort": false, //是否支持排序功能
		"bLengthChange": false, 
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
		"sAjaxSource" : ctx+'/serviceLog/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  if(data==null||data==''){
            		  return "systemTime";
            	  }else{
            		return data;
            	  }
  			}},
  			 {"mDataProp" : "departmentName","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
           	  return data;
             }},
			{"mDataProp" : "createUserName","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
          	  if(data==null||data==''){
          		  return "system";
          	  }else{
          		return data;
          	  }
			}},
              {"mDataProp" : "status","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
              	  if(data==0){
              		  return "回流";
              	  }else if(data==1){
              		return "已创建";
              	  }else if(data==2){
              		return "待沟通";
              	  }else if(data==3){
              		return "已沟通";
              	  }else if(data==4){
              		return "预约";
              	  }else if(data==5){
              		return "上门";
              	  }else if(data==6){
              		return "订座";
              	  }else if(data==7){
              		return "报名";
              	  }else if(data==20){
              		return "回访记录";
              	  }else if(data==21){
              		return "跟进记录";
              	  }else if(data==22){
              		return "电话";
              	  }else if(data==23){
              		return "qq电话";
              	  }else if(data==24){
              		return "EC会话";
              	  }else if(data==25){
              		return "网站客服会话";
              	  }else if(data==26){
              		return "上门拜访";
              	  }else if(data==27){
              		return "邮件";
              	  }else if(data==28){
              		return "发送短信";
              	  }else if(data==29){
              		return "变更数据";
              	  }else if(data==31){
              		return "初申";
              	  }else if(data==32){
              		return "邮件";
              	  }else if(data==33){
              		return "资源确认";
              	  }else if(data==34){
              		return "学员申请退费";
              	  }
    			}},
    			{"mDataProp" : "content","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
    					try {
    						var str = '';
    						data =  eval('(' + data + ')');
    						for(var key in data){
    							if(key.indexOf("Id")!=-1){
    								continue;
    							}
    							str = str + ":" +data[key];
    						}
    						return str.substring(1,str.length);
					} catch (e) {
						return data;
					}
             }},
              {"mDataProp" : "studentName","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  return data;
              }},
              {"mDataProp" : "productModelName","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  return data;
              }},
              {"mDataProp" : "productName","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  return data;
              }},
              {"mDataProp" : "infoManageId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				return '<a class="edit" data-toggle="modal" data-target=".bs-example-modal-sm"><i class="fa fa-search warning"  data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看""></i></a>'
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
}
function edit(userName,account,createDate,logIp,ip,logHtml,type,content){
	$('#userName').val(userName);
	$('#account').val(account);
	$('#createDate').val(createDate);
	$('#logIp').val(ip);
	$('#ip').val(ip);
	$('#logHtml').val(logHtml);
	$('#type').val(type);
	$('#content').val(content);
}