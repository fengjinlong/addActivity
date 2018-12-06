$(function(){
	load1 ();
	load2 ();
	load3 ();
	
	//日期控件
	//起止日期
    durationDate('.duration','到');
})

//公告
function load1 () {
    //Datatable Initiating
    var oTable = $('#table1').dataTable({
    	"bPaginate": true,  //是否显示分页
    	"iDisplayLength": 10,
    	"bLengthChange": false,//每页显示的记录数
    	"bFilter": false, //搜索栏
    	"bSort": false, //是否支持排序功能
    	"bInfo": true, //显示表格信息
    	"bAutoWidth": false,  //自适应宽度
    	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
    	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
    	"sAjaxSource" : ctx+'/sysAnnouncement/loadInforms',
		"fnServerData": retrieveData1,//用于替换默认发到服务端的请求操作  
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
		               	{ "mDataProp": "theme","bSortable": false,'sClass': "text-center"}, 
		               	{ "mDataProp": "createUserName","bSortable": false,'sClass': "text-center"},
		               	{ "mDataProp": "createDate","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
//		               		return jsDateFormat(full['createDate']);
		               		return full['createDate'];
		               	}},
		               	{ "mDataProp": "institutionId","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
		               		var str='';
		                	str+='<a href="#" class="btn btn-warning btn-xs view-announce" typee="1" value="'+full['flagUnique']+'" data-toggle="modal" '+
		                			'data-target=".notice-detail" data-backdrop="static">'+
		                        	'<i class="fa fa-folder-open-o"></i> 查看'+
		                         '</a>';
//		                	var read = '未读';
//		                	if (full.noticeReadId != null && full.noticeReadId != undefined) {
//								read = '已读';
//							}
		                	return str;
		               	}},
		   			],
		"aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }],
    	
    });

}
function retrieveData1( sSource, aoData, fnCallback, oSettings ) {  
	
    aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
    aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });  
    aoData.push({ "name": "type", "value": '1' });
    $.ajax( {  
        "url": sSource,  
        "data": aoData,  
        "cache": false,  
        "dataType": 'json', 
        "type": "POST", 
        "success" :function(response) {  
        	fnCallback(response.returnObject);
        	$('[data-toggle="tooltip"]').tooltip()
        }  
    } );  
}  
//奖赏
function load2 () {
    //Datatable Initiating
    var oTable = $('#table2').dataTable({
    	"bPaginate": true,  //是否显示分页
    	"iDisplayLength": 10,
    	"bLengthChange": false,//每页显示的记录数
    	"bFilter": false, //搜索栏
    	"bSort": false, //是否支持排序功能
    	"bInfo": true, //显示表格信息
    	"bAutoWidth": false,  //自适应宽度
    	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
    	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
    	"sAjaxSource" : ctx+'/sysAnnouncement/loadRP',
		"fnServerData": retrieveData2,//用于替换默认发到服务端的请求操作  
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
						{ "mDataProp": "companyName", "bSortable": false, 'sClass': "text-center"}, 
			           	{ "mDataProp": "departName", "bSortable": false, 'sClass': "text-center"},
			           	{ "mDataProp": "sortName", "bSortable": false, 'sClass': "text-center"},
			           	{
			                "mDataProp": "eventDate", 'sClass': "text-center", "mRender": function (data, type, full) {
//			                	return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			                	return transferDateFormat(full['eventDate']);
			                }
			            },
			            {
			                "mDataProp": "commitDate", 'sClass': "text-center", "mRender": function (data, type, full) {
//			                	return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			                	return transferDateFormat(full['commitDate']);
			                }
			            },
			            /*{
			                "mDataProp": "passDate", 'sClass': "text-center", "mRender": function (data, type, full) {
//			                    return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			                	return jsDateFormat(full['passDate']);
			                }
			            },*/
			            { "mDataProp": "userName", 'sClass': "text-center"},
	                    { "mDataProp": "rewardPunishPrice", 'sClass': "text-center"},
	                    {
	                        "mData": "commndDate", 'sClass': "text-center", "mRender": function (data, type, full) {
//		                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
	                        	return transferDateFormat(full['commndDate']);
		                    }
	                    }
		   			],
		"aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }],
    	
    });

}
function retrieveData2( sSource, aoData, fnCallback, oSettings ) {  
    aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
    aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });  
    var searchVal = $('#searchVal1').val();
    aoData.push({"name": "searchVal", "value": searchVal});
    aoData.push({"name": "sortType", "value": 1});
    var dateRange = $('#date2').val();
    if(dateRange && dateRange.length != 0){
		var minDates = trim(dateRange.split("到")[0]);
        var maxDates = trim(dateRange.split("到")[1]);
        aoData.push({"name" : "beginTime", "value" : minDates.trim()});
        aoData.push({"name" : "endTime", "value" : maxDates.trim()});
    }
    $.ajax( {  
        "url": sSource,  
        "data": aoData,  
        "cache": false,  
        "dataType": 'json', 
        "type": "POST", 
        "success" :function(response) {  
        	fnCallback(response.returnObject);
        	$('[data-toggle="tooltip"]').tooltip()
        }  
    } );  
}  

//惩罚
function load3 () {
    //Datatable Initiating
    var oTable = $('#table3').dataTable({
    	"bPaginate": true,  //是否显示分页
    	"iDisplayLength": 10,
    	"bLengthChange": false,//每页显示的记录数
    	"bFilter": false, //搜索栏
    	"bSort": true, //是否支持排序功能
    	"bInfo": true, //显示表格信息
    	"bAutoWidth": false,  //自适应宽度
    	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
    	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
    	"sAjaxSource" : ctx+'/sysAnnouncement/loadRP',
		"fnServerData": retrieveData3,//用于替换默认发到服务端的请求操作  
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
						{ "mDataProp": "companyName", "bSortable": false, 'sClass': "text-center"}, 
			           	{ "mDataProp": "departName", "bSortable": false, 'sClass': "text-center"},
			           	{ "mDataProp": "sortName", "bSortable": false, 'sClass': "text-center"},
			           	{
			                "mDataProp": "eventDate", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
			                	return transferDateFormat(full['eventDate']);
//			                	return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			                }
			            },
			            {
			                "mDataProp": "commitDate", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
			                	return transferDateFormat(full['commitDate']);
			                }
			            },
			            {
			                "mDataProp": "passDate", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
			                	return transferDateFormat(full['passDate']);
			                }
			            },
			            { "mDataProp": "userName", "bSortable": false, 'sClass': "text-center"},
			            { "mDataProp": "rewardPunishPrice", "bSortable": false, 'sClass': "text-center"},
			            {
			                "mData": "commndDate", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
			                	return transferDateFormat(full['commndDate']);
			                }
			            }
		   			],
		"aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }],
    	
    });

}
function retrieveData3( sSource, aoData, fnCallback, oSettings ) {  
	
    aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
    aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });  
    var searchVal = $('#searchVal2').val();
    aoData.push({"name": "searchVal", "value": searchVal});
    aoData.push({"name": "sortType", "value": 2});
    var dateRange = $('#date3').val();
    if(dateRange && dateRange.length != 0){
		var minDates = trim(dateRange.split("到")[0]);
        var maxDates = trim(dateRange.split("到")[1]);
        aoData.push({"name" : "beginTime", "value" : minDates.trim()});
        aoData.push({"name" : "endTime", "value" : maxDates.trim()});
    }
    $.ajax( {  
        "url": sSource,  
        "data": aoData,  
        "cache": false,  
        "dataType": 'json', 
        "type": "POST", 
        "success" :function(response) {  
        	fnCallback(response.returnObject);
        	$('[data-toggle="tooltip"]').tooltip()
        }  
    } );  
} 
// 我的公告详情查看
$('#table1').on('click','.view-announce',function(){
	var flagUnique = $(this).attr('value');
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/sysAnnouncement/queryOneByFlag',
		'data' : {'flagUnique' : flagUnique},
		'dataType' : 'json',
		'success' : function(info){
			if (info.status == 'success') {
				$('#showTheme').html(info.data.theme);
				$('#showContent').html(info.data.content);
				$('.notice-detail').modal('show');
			}
		}
	})
	// 标记已读
	$.ajax({
		'url':ctx+'/sysAnnouncement/readNotice',
		'type':'post',
		'async':'false',
		'dataType':'json',
		'data':{'type':1,'infoId':flagUnique},
		'success':function(info){
			console.log(info.msg);
		}
	})
})
/**
 * 回车检索1(奖)
 * @returns
 */
function search1() {
    if (event.keyCode == 13) {
    	load2();
    }
}
/**
 * 回车检索2（惩）
 * @returns
 */
function search2() {
    if (event.keyCode == 13) {
    	load3();
    }
}
/**
 * 字符串（yyyy-MM-dd）时间格式化
 */
function transferDateFormat(val) {
	var NumDate, date;
	if (typeof (val) == 'number') {
		NumDate = val;
		date = new Date(val);
	} else if (typeof (val) == 'string') {
		NumDate = Date.parse(val.replace(/-/g, '/'));
		date = new Date(NumDate);
	} else {
		NumDate = Date.parse(new Date());
		date = new Date(NumDate);
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? ('0' + month) : month;
	var day = date.getDate();
	day = day < 10 ? ('0' + day) : day;
	return year + '-' + month + '-' + day;
}