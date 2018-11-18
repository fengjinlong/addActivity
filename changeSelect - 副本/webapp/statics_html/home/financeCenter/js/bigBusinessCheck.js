$(function(){
    //富文本编辑器
    KindEditor.ready(function (K) {
        K.create('.remark', {
            allowFileManager: true,
            resizeType: 0,
            readonlyMode: true
        });
    });
    init1();
})
function clickBut(val){
	if(val==1){
		init1();
	}
	if(val==2){
		init2();
	}
	if(val==3){
		init3();
	}
	if(val==4){
		init4();
	}
	if(val==5){
		init5();
	}
	if(val==6){
		init6();
	}
}
function loadcheck(val){
	$("#showPage").load(ctx + "/html/load.jsp", function(){
		$("#showPage").load(ctx +'/'+val);
	});
}


/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData1(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": newBeginTime } );
	aoData.push( { "name": "endTime", "value": newEndTime } );
	aoData.push( { "name": "depId", "value": depId} );
	aoData.push( { "name": "typeFrom", "value": 1} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init1 (){
	var init = $('#init1').dataTable({
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
		"sAjaxSource" : ctx+'/bigBusiness/loadCheck',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData1,
		"aoColumns" : [
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '<label> <input  class="info" type="checkbox" ><span class="text"></span></label>';
			}},
			{"mData": "reciveName", 'sClass': "text-center"},
			{"mDataProp" : "studentAttrName","bSortable": false,'sClass': "text-center"},

			{"mDataProp" : "studentName","bSortable": false,'sClass': "text-center"},
			{"mData": "projectName", 'sClass': "text-center"},
			{"mDataProp" : "bmCode","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "baoMDate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payB","bSortable": false,'sClass': "text-center"},
			
			{"mDataProp" : "payPxNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payKwNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payJcNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payZlNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payXyNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payFwNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "fx","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "zc","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
				if(data == ''){
					return 0;
				}else{
					return Number(data).toFixed(2);
				}
			}},
			{"mDataProp" : "scale","bSortable": false,'sClass': "text-center"}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init1_wrapper").removeClass();
	$('#init1_wrapper').addClass("table-scrollable");
	//每页显示记录数
	$('#init1_wrapper .dataTables_info').parent().append($('#init1_wrapper .dataTables_length'));

	//横线滚动条
	$('#init1_wrapper').on('scroll',function(){
		$('#init1_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData2(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": $("#reservation1").val().split("到")[0] } );
	aoData.push( { "name": "endTime", "value": $("#reservation1").val().split("到")[1] } );
	aoData.push( { "name": "depId", "value": depId} );
	aoData.push( { "name": "typeFrom", "value": 2} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init2 (){
	var init = $('#init2').dataTable({
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
		"sAjaxSource" : ctx+'/bigBusiness/loadCheck',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData2,
		"aoColumns" : [
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '<label> <input  class="info" type="checkbox" ><span class="text"></span></label>';
			}},

			{"mDataProp" : "studentName","bSortable": false,'sClass': "text-center"},
			{"mData": "projectName", 'sClass': "text-center"},
			{"mDataProp" : "bmCode","bSortable": false,'sClass': "text-center"},
			
			{"mDataProp" : "infoManagePay","bSortable": false,'sClass': "text-center"},
			
			{"mDataProp" : "baoMDate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '-';
			}},
			{"mDataProp" : "payB","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payKwNum","bSortable": false,'sClass': "text-center"},
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '-';
			}},
			{"mDataProp" : "fc","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "scale","bSortable": false,'sClass': "text-center"}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init2_wrapper").removeClass();
	$('#init2_wrapper').addClass("table-scrollable");
	//每页显示记录数
	$('#init2_wrapper .dataTables_info').parent().append($('#init2_wrapper .dataTables_length'));

	//横线滚动条
	$('#init2_wrapper').on('scroll',function(){
		$('#init2_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData3(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": $("#reservation1").val().split("到")[0] } );
	aoData.push( { "name": "endTime", "value": $("#reservation1").val().split("到")[1] } );
	aoData.push( { "name": "depId", "value": depId} );
	aoData.push( { "name": "typeFrom", "value": 3} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init3 (){
	var init = $('#init3').dataTable({
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
		"sAjaxSource" : ctx+'/bigBusiness/loadCheck',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData3,
		"aoColumns" : [
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '<label> <input  class="info" type="checkbox" ><span class="text"></span></label>';
			}},
			{"mDataProp" : "studentName","bSortable": false,'sClass': "text-center"},
			{"mData": "projectName", 'sClass': "text-center"},
			{"mDataProp" : "bmCode","bSortable": false,'sClass': "text-center"},
			
			{"mDataProp" : "infoManageId","bSortable": false,'sClass': "text-center"},
			
			{"mDataProp" : "baoMDate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '-';
			}},
			{"mDataProp" : "payB","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payKwNum","bSortable": false,'sClass': "text-center"},
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '-';
			}},
			
			{"mDataProp" : "zc","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "scale","bSortable": false,'sClass': "text-center"}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init3_wrapper").removeClass();
	$('#init3_wrapper').addClass("table-scrollable");
	//每页显示记录数
	$('#init3_wrapper .dataTables_info').parent().append($('#init3_wrapper .dataTables_length'));

	//横线滚动条
	$('#init3_wrapper').on('scroll',function(){
		$('#init3_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}


/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData4(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": $("#reservation1").val().split("到")[0] } );
	aoData.push( { "name": "endTime", "value": $("#reservation1").val().split("到")[1] } );
	aoData.push( { "name": "depId", "value": depId} );
	aoData.push( { "name": "typeFrom", "value": 4} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init4 (){
	var init = $('#init4').dataTable({
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
		"sAjaxSource" : ctx+'/bigBusiness/loadCheck',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData4,
		"aoColumns" : [
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '<label> <input  class="info" type="checkbox" ><span class="text"></span></label>';
			}},
			{"mData": "reciveName", 'sClass': "text-center"},
			{"mDataProp" : "studentAttrName","bSortable": false,'sClass': "text-center"},

			{"mDataProp" : "studentName","bSortable": false,'sClass': "text-center"},
			{"mData": "projectName", 'sClass': "text-center"},
			{"mDataProp" : "bmCode","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "baoMDate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '-';
			}},
			{"mDataProp" : "payPxNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payKwNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payJcNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payZlNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payXyNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payFwNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "ds","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "ds","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "zc","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "scale","bSortable": false,'sClass': "text-center"}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init4_wrapper").removeClass();
	$('#init4_wrapper').addClass("table-scrollable");
	//每页显示记录数
	$('#init4_wrapper .dataTables_info').parent().append($('#init4_wrapper .dataTables_length'));

	//横线滚动条
	$('#init4_wrapper').on('scroll',function(){
		$('#init4_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData5(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "beginTime", "value": $("#reservation1").val().split("到")[0] } );
	aoData.push( { "name": "endTime", "value": $("#reservation1").val().split("到")[1] } );
	aoData.push( { "name": "depId", "value": depId} );
	aoData.push( { "name": "typeFrom", "value": 5} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init5 (){
	var init = $('#init5').dataTable({
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
		"sAjaxSource" : ctx+'/bigBusiness/loadCheck',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData5,
		"aoColumns" : [
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '<label> <input  class="info" type="checkbox" ><span class="text"></span></label>';
			}},
			{"mData": "reciveName", 'sClass': "text-center"},
			{"mDataProp" : "studentAttrName","bSortable": false,'sClass': "text-center"},

			{"mDataProp" : "studentName","bSortable": false,'sClass': "text-center"},
			{"mData": "projectName", 'sClass': "text-center"},
			{"mDataProp" : "bmCode","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "baoMDate","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
			{"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				return '-';
			}},
			{"mDataProp" : "payPxNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payKwNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payJcNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payZlNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payXyNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "payFwNum","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "ds","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "ds","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "zc","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "scale","bSortable": false,'sClass': "text-center"}],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init5_wrapper").removeClass();
	$('#init5_wrapper').addClass("table-scrollable");
	//每页显示记录数
	$('#init5_wrapper .dataTables_info').parent().append($('#init5_wrapper .dataTables_length'));

	//横线滚动条
	$('#init5_wrapper').on('scroll',function(){
		$('#init5_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData6(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "month", "value": createTime } );
	aoData.push( { "name": "departmentId1", "value": depId} );
//	aoData.push( { "name": "typeFrom", "value": 6} );
	
	var searchType = $('.searchType').val()
	 if (searchType != "" && searchType.length != 0) {
	        aoData.push({"name": "searchType", "value": searchType});
	    }
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init6(){
	var init = $('#init6').dataTable({
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
		"sAjaxSource" : ctx+'/rewardPunish/getAll',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData6,
		"aoColumns" : [
			{"mDataProp" : "rewardPunishId",'sClass': "text-center","mRender": function ( data, type, full ) {
				return "<label> <input value='"+full.rewardPunishId+"' type='checkbox' class='slaver1'> <span class='text'></span> </label>";
			  }},
			{"mData": "sysDepartment1.fullName", 'sClass': "text-center"},
			{"mData": "sysDepartment2.fullName", 'sClass': "text-center"},
			{"mData": "sysRewards.rewardType", 'sClass': "text-center"},
			{
			    "mData": "eventDate", 'sClass': "text-center", "mRender": function (data, type, full) {
			    return data //? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			}
			},
			{
			    "mData": "commitDate", 'sClass': "text-center", "mRender": function (data, type, full) {
			    return data //? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			}
			},
			{
			    "mData": "passDate", 'sClass': "text-center", "mRender": function (data, type, full) {
			    return data //? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			}
			},
			{"mData": "sysUser.realName", 'sClass': "text-center"},
			{"mData": "rewardPunishPrice", 'sClass': "text-center"},
			{"mData": "rewardPunishPrice", 'sClass': "text-center"},
			{
			    "mData": "commndDate", 'sClass': "text-center", "mRender": function (data, type, full) {
			    return data //? formatDate(new Date(data), 'yyyy-MM-dd') : data;
			}
			},
			{
			    "mData": "rewardPunishId",
			    'sClass': "text-center",
			    "bSortable": false,
			    "mRender": function (data, type, full) {
			        var r ='<a onclick="showModel(\'' + full["rewardPunishId"]
			            + '\',\'' + full["departmentId1"]
			            + '\',\'' + full.sysDepartment2.fullName
			            + '\',\'' + full["eventDate"]
			            + '\',\'' + full["commitDate"]
			            + '\',\'' + full["userId"]
			            + '\',\'' + full["rewardPunishPrice"]
			            + '\',\'' + full["commndDate"]
			            + '\',\'' + full["type"]
			            + '\',\'' + full["description"]
			            + '\',\'' + full["judgments"]
			            + '\',\'' + full["remark"]
			            + '\',\'' + full["passDate"]
			            + '\',\'' + full["isSubsidy"]
			            + '\',\'' + full["subsidyPrice"]
			            + '\',\'' + fine + '\')" class="view" data-toggle="modal" data-backdrop="static" data-target="#' + fine + '"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
			        return r;
			    }
			}
		],
		"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	$("#init6_wrapper").removeClass();
	$('#init6_wrapper').addClass("table-scrollable");
	//每页显示记录数
	$('#init6_wrapper .dataTables_info').parent().append($('#init6_wrapper .dataTables_length'));

	//横线滚动条
	$('#init6_wrapper').on('scroll',function(){
		$('#init6_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}