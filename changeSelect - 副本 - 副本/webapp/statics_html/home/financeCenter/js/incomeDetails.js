var CREATEUSERID;
var INFOMANAGEID;
var DATESTRING;

$(function(){
    /**
     * 插件初始化
     * @returns {{init: init}}
     */
	init();
	//搜索回车
	$("#key").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init();
        }
    });
	
	//日期
    durationDate('#dateString','到');
	
	function cooperationModule(){
        return {
            init:function(){
                //缴费合计点击
                $('#load').on('click','.edit',function(){
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("userId");
                	INFOMANAGEID=$(this).attr("value");
                	DATESTRING=$(this).attr("dateString");
                	init2();
                	$('.cooperation-module-edit').modal('show');
                })
                return this;
            }
        }
    }
    cooperationModule().init();
});


/**
 * 初始化
 * @returns
 */
function init() {
    var init = $('#load').dataTable({
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
        "fnServerData": initData,
        "aoColumns": [
						{"mDataProp": "createDate",'sClass': "text-center"},
						{"mDataProp": "createUserName",'sClass': "text-center"},
						{"mDataProp": "studentName",'sClass': "text-center"},
						{"mDataProp": "departmentName1",'sClass': "text-center"},
						{"mDataProp": "baoMinCode",'sClass': "text-center"},
						{"mDataProp": "productName",'sClass': "text-center"},
						{"mDataProp": "heJi",'sClass': "text-center", "mRender": function (data, type, full) {
						    return '<a class="edit"  userId="'+full['createUserId']+'" dateString="'+full['createDate']+'" value="'+full['infoManageId']+'">'+full['heJi']+'</a>';
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
									return '退费中'
								case 7:
									return '转化'
								case 11:
									return '已经转班'
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
    $("#load_wrapper").removeClass();
    $('#load_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#load_wrapper .dataTables_info').parent().append($('#load_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "key", "value":$("#key").val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#dateString").val().split(" 到 ") == '' ? "" : $("#dateString").val().split(" 到 ")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#dateString").val().split(" 到 ") == '' ? "" : $("#dateString").val().split(" 到 ")[1] + " 23:59:59"
    });
    aoData.push({"name": "unAction", "value":$("#unAction").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            initTotalIncome();
        }
    });
};



/**
 * 初始化 查看详情
 * @returns
 */
function init2() {
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
        "fnServerData": initData2,
        "aoColumns": [
                      	{"mDataProp": "createDate",'sClass': "text-center", "mRender": function (data, type, full) {
							return full['createDate'];
						}},
						{"mDataProp": "payName",'sClass': "text-center"},
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
								case '9':
									return '结余'
								  break;
								default:
									return ''
							}
						}},
						{"mDataProp": "payValue",'sClass': "text-center"},
						{"mDataProp": "isNeIf",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['isNeIf'])
							{
								case 1:
									return '支出'
								case 2:
									return '收入'
								default:
									return ''
							}
						}},
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
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData2(sSource, aoData, fnCallback, oSettings) {
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

//统计
function initTotalIncome() {
	var beginTime=$("#dateString").val().split(" 到 ") == '' ? "" : $("#dateString").val().split(" 到 ")[0] + " 00:00:00";
	var endTime=$("#dateString").val().split(" 到 ") == '' ? "" : $("#dateString").val().split(" 到 ")[1] + " 23:59:59";
    $.ajax({
        url: ctx + '/consultInfoManagePayFees/loadSum',
        data: {"key": $("#key").val(), "unAction": $("#unAction").val(), "beginTime": beginTime,"endTime":endTime},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status=='success') {
                var html = '<tr class="odd">' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center red">合计:</td>' +
                    '<td class="text-center">' + data.data.heJi + '</td>' +
                    '<td class="text-center">' + data.data.zhiChu + '</td>' +
                    '<td class="text-center">' + data.data.shouYi + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';
                $("#load").find("tbody").prepend(html);
            }else{
            	swal("", "合计统计失败！", "error");
            }
        }
    });
}