$(function(){
	//回车
	$("#key1").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init1();
        }
    });
	$("#key3").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init3();
        }
    });
    //日期
    durationDate('.reservation','到');
    init1();
    /*init2();*/
    init3();
    //树形结构
    var setting = {
        view : {
            selectedMulti : false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback : {
            onClick: zTreeOnClick
        }
    };
    var ztreeData = [
        { id:1, pId:0, name:"201701"},
        { id:11, pId:1, name:"项目1"},
        { id:111, pId:11, name:"级别111"},
        { id:1111, pId:111, name:"产品名称（班型）1"},
        { id:11111, pId:1111, name:"合作方（分校）1"},
        { id:11112, pId:1111, name:"合作方（分校）2"},
        { id:1112, pId:111, name:"产品名称（班型）2"},
        { id:11121, pId:1111, name:"合作方（分校）1"},
        { id:11122, pId:1111, name:"合作方（分校）2"},
        { id:112, pId:11, name:"级别112"},
        { id:113, pId:11, name:"级别113"},
        { id:12, pId:1, name:"项目2"},
        { id:121, pId:12, name:"级别121"},
        { id:122, pId:12, name:"级别122"},
        { id:123, pId:12, name:"级别123"},
        { id:124, pId:12, name:"级别124"},
        { id:2, pId:0, name:"201705"},
        { id:21, pId:2, name:"项目2"},
        { id:211, pId:21, name:"级别211"},
        { id:2111, pId:211, name:"产品名称（班型）221"},
        { id:21111, pId:2111, name:"合作方（分校）221"},
        { id:21112, pId:1111, name:"合作方（分校）2222"},
        { id:2112, pId:211, name:"产品名称（班型）2222"},
        { id:21121, pId:2111, name:"合作方（分校）212"},
        { id:21122, pId:2111, name:"合作方（分校）222"},
        { id:212, pId:21, name:"级别112"},
        { id:213, pId:21, name:"级别113"},
        { id:22, pId:2, name:"项目2"},
        { id:221, pId:22, name:"级别121"},
        { id:222, pId:22, name:"级别122"},
        { id:223, pId:22, name:"级别123"},
        { id:224, pId:22, name:"级别124"}
    ];
    $.fn.zTree.init($("#ztreeList"), setting, ztreeData);
    //点击事件
    function zTreeOnClick(event, treeId, treeNode){
        if(!treeNode.children){//最后一级

        }
    }
    
    function shouModule(){
        return {
            init:function(){
                //收 详情
                $('#incomeTable').on('click','.view',function(){
                	console.log("/收 详情")
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("userId");
                	INFOMANAGEID=$(this).attr("value");
                	DATESTRING=$(this).attr("dateString");
                	initDetail1();
                	$('.shou').modal('show');
                })
                return this;
            }
        }
    };
    function yinshoukuanModule(){
        return {
            init:function(){
                //应收款 详情
                $('#receivableTable').on('click','.view',function(){
                	console.log("应收款 详情")
                	var _this=$(this);
                	INFOMANAGEID=$(this).attr("value");
                	initDetail3();
                	$('.yinshoukuan').modal('show');
                })
                return this;
            }
        }
    }
    shouModule().init();
    yinshoukuanModule().init();
})


/**
 * 初始化 收
 * @returns
 */
function init1() {
    var init = $('#incomeTable').dataTable({
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
        "sAjaxSource": ctx+'/consultInfoManagePayFees/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData1,
        "aoColumns": [
						{"mDataProp": "createDate",'sClass': "text-center", "mRender": function (data, type, full) {
							return full['createDate'];
						}},
						{"mDataProp": "createUserName",'sClass': "text-center"},
						{"mDataProp": "studentName",'sClass': "text-center"},
						{"mDataProp": "baoMinCode",'sClass': "text-center"},
						{"mDataProp": "productName",'sClass': "text-center"},
						{"mDataProp": "heJi",'sClass': "text-center", "mRender": function (data, type, full) {
						    return '<a class="view"  userId="'+full['createUserId']+'" dateString="'+full['createDate']+'" value="'+full['infoManageId']+'">'+full['heJi']+'</a>';
						}},
						{"mDataProp": "zhiChu",'sClass': "text-center"},
						{"mDataProp": "shouYi",'sClass': "text-center"},
						{"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['unAction'])
							{
								case 1:
									return '转班'
								case 2:
									return '休学'
								case 3:
									return '退费'
								case 4:
									return '补考'
								case 5:
									return '重修'
								case 6:
									return '正常'
								default:
									return '正常'
							}
						}},
						{"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
							var str='';
			            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
								  "data-backdrop='static' >"+
							        "<i class='fa fa-search warning' "+
							        "data-placement='top' data-original-title='查看'></i>"+
							         "</a>"
			                return str;
						}},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#incomeTable_wrapper").removeClass();
    $('#incomeTable_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#incomeTable_wrapper .dataTables_info').parent().append($('#incomeTable_wrapper .dataTables_length'));
}

/**
 * 回调函数 收
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData1(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "key2", "value":$("#key1").val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#dateString1").val().split(" 到 ") == '' ? "" : $("#dateString1").val().split(" 到 ")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#dateString1").val().split(" 到 ") == '' ? "" : $("#dateString1").val().split(" 到 ")[1] + " 23:59:59"
    });
    aoData.push({"name": "productId", "value":""});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            initTotalIncome1();
        }
    });
};


//统计 收
function initTotalIncome1() {
	var beginTime=$("#dateString1").val().split(" 到 ") == '' ? "" : $("#dateString1").val().split(" 到 ")[0] + " 00:00:00";
	var endTime=$("#dateString1").val().split(" 到 ") == '' ? "" : $("#dateString1").val().split(" 到 ")[1] + " 23:59:59";
    $.ajax({
        url: ctx + '/consultInfoManagePayFees/loadSum',
        data: {"key2": $("#key1").val(), "productId":"", "beginTime": beginTime,"endTime":endTime},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status=='success') {
                var html = '<tr class="odd">' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center red">合计:</td>' +
                    '<td class="text-center red">' + data.data.heJi + '</td>' +
                    '<td class="text-center red">' + data.data.zhiChu + '</td>' +
                    '<td class="text-center red">' + data.data.shouYi + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';
                $("#incomeTable").find("tbody").prepend(html);
            }else{
            	swal("", "收合计统计失败！", "error");
            }
        }
    });
}


/**
 * 初始化 应收款
 * @returns
 */
function init3() {
    var init = $('#receivableTable').dataTable({
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
        "sAjaxSource": ctx+'/consultInfoManagePayFees/loadComp',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData3,
        "aoColumns": [
						{"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
							return jsDateFormat(full['baoMinDate']);
						}},
						{"mDataProp": "departmentName1",'sClass': "text-center"},
						{"mDataProp": "studentName",'sClass': "text-center"},
						{"mDataProp": "baoMinCode",'sClass': "text-center"},
						{"mDataProp": "productName",'sClass': "text-center"},
						{"mDataProp": "yinjiao",'sClass': "text-center", "mRender": function (data, type, full) {
						    return '<a class="view"  value="'+full['infoManageId']+'">'+full['yinjiao']+'</a>';
						}},
						{"mDataProp": "shijiao",'sClass': "text-center"},
						{"mDataProp": "qianfei",'sClass': "text-center"},
						{"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['unAction'])
							{
								case 1:
									return '转班'
								case 2:
									return '休学'
								case 3:
									return '退费'
								case 4:
									return '补考'
								case 5:
									return '重修'
								case 6:
									return '正常'
								default:
									return '正常'
							}
						}},
						{"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
							var str='';
			            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
								  "data-backdrop='static' >"+
							        "<i class='fa fa-search warning' "+
							        "data-placement='top' data-original-title='查看'></i>"+
							         "</a>"
			                return str;
						}},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#receivableTable_wrapper").removeClass();
    $('#receivableTable_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#receivableTable_wrapper .dataTables_info').parent().append($('#receivableTable_wrapper .dataTables_length'));
}

/**
 * 回调函数 应收款
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData3(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "key", "value":$("#key3").val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#dateString3").val().split(" 到 ") == '' ? "" : $("#dateString3").val().split(" 到 ")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#dateString3").val().split(" 到 ") == '' ? "" : $("#dateString3").val().split(" 到 ")[1] + " 23:59:59"
    });
    aoData.push({"name": "productId", "value":""});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            initTotalIncome3();
        }
    });
};

//统计 应收款
function initTotalIncome3() {
	var beginTime=$("#dateString3").val().split(" 到 ") == '' ? "" : $("#dateString3").val().split(" 到 ")[0] + " 00:00:00";
	var endTime=$("#dateString3").val().split(" 到 ") == '' ? "" : $("#dateString3").val().split(" 到 ")[1] + " 23:59:59";
    $.ajax({
        url: ctx + '/consultInfoManagePayFees/loadCompSum',
        data: {"key": $("#key3").val(), "productId": "", "beginTime": beginTime,"endTime":endTime},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status=='success') {
                var html = '<tr class="odd">' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center red">合计:</td>' +
                    '<td class="text-center red">' + data.data.yinjiao + '</td>' +
                    '<td class="text-center red">' + data.data.shijiao + '</td>' +
                    '<td class="text-center red">' + data.data.qianfei + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';
                $("#receivableTable").find("tbody").prepend(html);
            }else{
            	swal("", "应收款合计统计失败！", "error");
            }
        }
    });
}



/**
 * 初始化 查看详情 收
 * @returns
 */
function initDetail1() {
    var init = $('#detail').dataTable({
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
        "sAjaxSource": ctx+'/consultInfoManagePayFees/queryDetail',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataDetail1,
        "aoColumns": [
						{"mDataProp": "payName",'sClass': "text-center"},
						{"mDataProp": "isNeIf",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['isNeIf'])
							{
								case 1:
									return '收入'
								case 2:
									return '支出'
								default:
									return ''
							}
						}},
						{"mDataProp": "payValue",'sClass': "text-center"},
						{"mDataProp": "payFrom",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['payFrom'])
							{
								case '1':
									return '现金'
								  break;
								case '2':
									return '刷卡'
								  break;
								case '3':
									return '支票'
								  break;
								case '4':
									return '微信'
								  break;
								case '5':
									return '支付宝'
								  break;
								case '6':
									return '网络'
								  break;
								case '7':
									return '银行转账'
								  break;
								case '8':
									return '分期'
								  break;
								default:
									return ''
							}
						}},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });

    //每页显示记录数
    $('#detail_wrapper .dataTables_info').parent().append($('#detail_wrapper .dataTables_length'));
}

/**
 * 回调函数 详情 收
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataDetail1(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "createUserId", "value":CREATEUSERID});
    aoData.push({"name": "infoManageId", "value":INFOMANAGEID});
    aoData.push({"name": "dateString", "value":DATESTRING});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

/**
 * 初始化 查看详情  应收款
 * @returns
 */
function initDetail3() {
    var init = $('#compDetail').dataTable({
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
        "sAjaxSource": ctx+'/consultInfoManagePayFees/loadCompDetail',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataDetail3,
        "aoColumns": [	
                      	{"mDataProp": "createDate",'sClass': "text-center", "mRender": function (data, type, full) {
							return full['createDate'];
						}},
						{"mDataProp": "payName",'sClass': "text-center"},
						{"mDataProp": "yjValue",'sClass': "text-center"},
						{"mDataProp": "sjValue",'sClass': "text-center"},
						{"mDataProp": "cfValue",'sClass': "text-center"}
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });

    //每页显示记录数
    $('#compDetail_wrapper .dataTables_info').parent().append($('#compDetail_wrapper .dataTables_length'));
}


/**
 * 回调函数 详情 应收款
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataDetail3(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "infoManageId", "value":INFOMANAGEID});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

//搜索
function search1(){
	init1();
};
function search3(){
	init3();
};




