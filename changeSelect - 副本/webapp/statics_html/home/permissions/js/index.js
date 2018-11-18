$(function () {
	//数据初始化
    $("#init tbody").html("<tr><td height='300' colspan='8' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();
    //多选框
});
$(document).on('change', 'input:checkbox.master', function () {
    if ($(this).prop('checked')) {
        $('input:checkbox.slaver').prop('checked', 'checked');
    } else {
        $('input:checkbox.slaver').prop('checked', '');
    }
})

/**
 * 回车检索
 * @returns
 */
function search() {
    if (event.keyCode == 13) {
        toSearch();
    }
}
function toSearch() {
    init();
}
/**
 * 初始化时间控件
 * @returns
 */
function initDate() {
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
        autoUpdateInput: false,
        showDropdowns: true
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
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "beginTime", "value": $("#reservation").val().split("到")[0]});
    aoData.push({"name": "endTime", "value": $("#reservation").val().split("到")[1]});
    aoData.push({"name": "enable", "value": $("#enable").val()});
    aoData.push({"name": "searchVal", "value": $("#searchVal").val()});

    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
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
		"sAjaxSource" : ctx+'/user/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "account","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "realName","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "gender","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				if(data==1){
					return "男";
				}else{
					return "女";
				}
				
              }},
              {"mDataProp" : "departmentName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "dutyName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "roleName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "createDate","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  return data;
              }},
              {"mDataProp" : "userId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				var dataBtn = '<a class="btn btn-info btn-xs data-btn" data-toggle="modal" userId="'+full["userId"]+'" data-target=".dataPermission" data-backdrop="static">数据集权限</a>';
            	var pageBtn = '<a class="btn btn-info btn-xs page-btn" data-toggle="modal" userId="'+full["userId"]+'"  data-target=".pagePermission" data-backdrop="static">页面权限</a>';
            	var buttonBtn = '<a class="btn btn-info btn-xs button-btn" data-toggle="modal" userId="'+full["userId"]+'"  data-target=".buttonPermission" data-backdrop="static">按钮权限</a>';
            	var productBtn = '<a class="btn btn-info btn-xs product-btn" data-toggle="modal" userId="'+full["userId"]+'"  data-target=".productPermission" data-backdrop="static">产品权限</a>';
		               
				return dataBtn+pageBtn+buttonBtn+productBtn;
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
    
    $('#expandabledatatable_wrapper .dataTables_info').parent().append($('.dataTables_length'));
  	//每页显示记录数
    $('#init_wrapper').removeClass();
    $('#init_wrapper').addClass('table-scrollable');
}

/**
 * 显示按钮权限
 */
$("#init").on('click','.button-btn',function(){
	var userId = $(this).attr("userId");
	$("#userId").val(userId);
    var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey:"id",
					pIdKey:"pId"
                }
            },
            callback: {
                beforeDrag: beforeDrag,
                beforeDrop: beforeDrop
            }

        };
        function beforeDrag(treeId, treeNodes) {
            for (var i=0,l=treeNodes.length; i<l; i++) {
                if (treeNodes[i].drag === false) {
                    return false;
                }
            }
            return true;
        }
        function beforeDrop(treeId, treeNodes, targetNode, moveType) {
            return targetNode ? targetNode.drop !== false : true;
        }
        
        var data_left = new Array();
        var data_right = new Array();
        
        /**
         * 加载用户现有按钮权限
         */
        $.ajax({
            "type": "Post",
            "url": ctx+'/userPermissions/loadUserButtonRole',
            "dataType": "json",
            "data":{"userId":userId},
            "success": function (data) {
            	var buttonRoleIds = "";
            	for(var i=0; i<data.length; i++){
            		buttonRoleIds += "'"+data[i].buttonRoleId+"',"
            	}
            	/**
            	 * 加载所有按钮权限
            	 */
            	 $.ajax({
                     "type": "Post",
                     "url": ctx+'/permissions/loadButtonRole',
                     "dataType": "json",
                     "success": function (data) {
                     	for(var i=0; i<data.length; i++){
                     		var obj={};
                     		obj["id"] = data[i].buttonRoleId;
                     		obj["pId"] = data[i].partName;
                     		obj["name"] = data[i].buttonVal;
                     		if(buttonRoleIds.indexOf("'"+data[i].buttonRoleId+"',") >= 0){
                     			data_right.push(obj)
                     		}else{
                     			data_left.push(obj);                     			
                     		}
         				}
                     	 $.fn.zTree.init($("#tree5"), setting, data_left);
                          $.fn.zTree.init($("#tree6"), setting,data_right);
                     }
                 });
            }
        });
});

/**
 * 保存按钮权限
 */
$(".buttonBtn").click(function(){
	var userId = $("#userId").val();
	var treeObj = $.fn.zTree.getZTreeObj("tree6");
	var nodes = treeObj.getNodes();
	var nodes = treeObj.transformToArray(nodes);
	var buttonRoleIds = "";
	for (var i = 0; i < nodes.length; i++) {
		buttonRoleIds += nodes[i].id +",";
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/userPermissions/addAllButtonRoleUser',
        "dataType": "json",
        "data":{"userId":userId,"buttonRoleIds":buttonRoleIds},
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".buttonPermission").modal('hide');
        	}
        	toastr.success(data.msg);        		
        }
    });
	return false;
});


/**
 * 显示范围数据权限
 */
$("#init").on('click','.data-btn',function(){
	var userId = $(this).attr("userId");
	$("#userId").val(userId);
    var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeDrag: beforeDrag,
                beforeDrop: beforeDrop
            }

        };
        function beforeDrag(treeId, treeNodes) {
            for (var i=0,l=treeNodes.length; i<l; i++) {
                if (treeNodes[i].drag === false) {
                    return false;
                }
            }
            return true;
        }
        function beforeDrop(treeId, treeNodes, targetNode, moveType) {
            return targetNode ? targetNode.drop !== false : true;
        }
        
        var data_left = new Array();
        var data_right = new Array();
        
        /**
         * 加载用户现有按钮权限
         */
        $.ajax({
            "type": "Post",
            "url": ctx+'/userPermissions/loadRangeDataRoleUser',
            "dataType": "json",
            "data":{"userId":userId},
            "success": function (data) {
            	var rangeDataRoleIds = "";
            	for(var i=0; i<data.length; i++){
            		rangeDataRoleIds += "'"+data[i].rangeDataRoleId+"',"
            	}
            	/**
            	 * 加载所有按钮权限
            	 */
            	 $.ajax({
                     "type": "Post",
                     "url": ctx+'/permissions/getDepartment',
                     "dataType": "json",
                     "success": function (data) {
                     	for(var i=0; i<data.length; i++){
                     		var obj={};
                     		obj["id"] = data[i].departmentId;
                     		obj["pId"] = 0;
                     		obj["name"] = data[i].fullName;
                     		if(rangeDataRoleIds.indexOf("'"+data[i].departmentId+"',") >= 0){
                     			data_right.push(obj)
                     		}else{
                     			data_left.push(obj);                     			
                     		}
         				}
                     	 $.fn.zTree.init($("#tree1"), setting, data_left);
                          $.fn.zTree.init($("#tree2"), setting,data_right);
                     }
                 });
            }
        });
});

/**
 * 保存数据权限
 */
$(".dataBtn").click(function(){
	var userId = $("#userId").val();
	var treeObj = $.fn.zTree.getZTreeObj("tree2");
	var nodes = treeObj.getNodes();
	var rangeDataRoleIds = "";
	for (var i = 0; i < nodes.length; i++) {
		rangeDataRoleIds += nodes[i].id +",";
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/userPermissions/addAllRangeDataRoleUser',
        "dataType": "json",
        "data":{"userId":userId,"rangeDataRoleIds":rangeDataRoleIds},
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".dataPermission").modal('hide');
        	}
        	toastr.success(data.msg);        		
        }
    });
	return false;
});

/**
 * 显示页面权限
 */
$("#init").on('click','.page-btn',function(){
	var userId = $(this).attr("userId");
	$("#userId").val(userId);
    var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeDrag: beforeDrag,
                beforeDrop: beforeDrop
            }

        };
        function beforeDrag(treeId, treeNodes) {
            for (var i=0,l=treeNodes.length; i<l; i++) {
                if (treeNodes[i].drag === false) {
                    return false;
                }
            }
            return true;
        }
        function beforeDrop(treeId, treeNodes, targetNode, moveType) {
            return targetNode ? targetNode.drop !== false : true;
        }
        
        var data_left = new Array();
        var data_right = new Array();
        
        /**
         * 加载用户现有按钮权限
         */
        $.ajax({
            "type": "Post",
            "url": ctx+'/userPermissions/loadTypeDataRoleUser',
            "dataType": "json",
            "data":{"userId":userId},
            "success": function (data) {
            	var typeDataRoleIds = "";
            	for(var i=0; i<data.length; i++){
            		typeDataRoleIds += "'"+data[i].typeDataRoleId+"',"
            	}
            	/**
            	 * 加载所有按钮权限
            	 */
            	 $.ajax({
                     "type": "Post",
                     "url": ctx+'/permissions/loadTypeDataRole',
                     "dataType": "json",
                     "success": function (data) {
                     	for(var i=0; i<data.length; i++){
                     		var obj={};
                     		obj["id"] = data[i].typeDataRoleId;
                     		obj["pId"] = 0;
                     		obj["name"] = data[i].typeDataRoleName;
                     		if(typeDataRoleIds.indexOf("'"+data[i].typeDataRoleId+"',") >= 0){
                     			data_right.push(obj)
                     		}else{
                     			data_left.push(obj);                     			
                     		}
         				}
                     	 $.fn.zTree.init($("#tree3"), setting, data_left);
                          $.fn.zTree.init($("#tree4"), setting,data_right);
                     }
                 });
            }
        });
});

/**
 * 保存页面权限
 */
$(".pageBtn").click(function(){
	var userId = $("#userId").val();
	var treeObj = $.fn.zTree.getZTreeObj("tree4");
	var nodes = treeObj.getNodes();
	var typeDataRoleIds = "";
	for (var i = 0; i < nodes.length; i++) {
		typeDataRoleIds += nodes[i].id +",";
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/userPermissions/addAllTypeDataRoleUser',
        "dataType": "json",
        "data":{"userId":userId,"typeDataRoleIds":typeDataRoleIds},
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".pagePermission").modal('hide');
        	}
        	toastr.success(data.msg);        		
        }
    });
	return false;
});
/**
 * 显示产品权限
 */
$("#init").on('click','.product-btn',function(){
	var userId = $(this).attr("userId");
	$("#userId").val(userId);
    var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeDrag: beforeDrag,
                beforeDrop: beforeDrop
            }

        };
        function beforeDrag(treeId, treeNodes) {
            for (var i=0,l=treeNodes.length; i<l; i++) {
                if (treeNodes[i].drag === false) {
                    return false;
                }
            }
            return true;
        }
        function beforeDrop(treeId, treeNodes, targetNode, moveType) {
            return targetNode ? targetNode.drop !== false : true;
        }
        
        var data_left = new Array();
        var data_right = new Array();
        
        /**
         * 加载用户现有用户-产品权限
         */
        $.ajax({
            "type": "Post",
            "url": ctx+'/userPermissions/loadProductPermissions',
            "dataType": "json",
            "data":{"userId":userId},
            "success": function (data) {
            	var productDataRoleIds = "";
            	for(var i=0; i<data.length; i++){
            		productDataRoleIds += "'"+data[i].productDataRoleId+"',"
            	}
            	/**
            	 * 加载所有用户-产品权限
            	 */
            	 $.ajax({
                     "type": "Post",
                     "url": ctx+'/permissions/getProducts',
                     "dataType": "json",
                     "success": function (data) {
                     	for(var i=0; i<data.length; i++){
                     		var obj={};
                     		obj["id"] = data[i].productId;
                     		obj["pId"] = 0;
                     		obj["name"] = data[i].productModelName+'-'+data[i].productName;
                     		if(productDataRoleIds.indexOf("'"+data[i].productId+"',") >= 0){
                     			data_right.push(obj)
                     		}else{
                     			data_left.push(obj);                     			
                     		}
         				}
                     	 $.fn.zTree.init($("#tree7"), setting, data_left);
                          $.fn.zTree.init($("#tree8"), setting,data_right);
                     }
                 });
            }
        });
});

/**
 * 保存产品权限
 */
$(".productBtn").click(function(){
	var userId = $("#userId").val();
	var treeObj = $.fn.zTree.getZTreeObj("tree8");
	var nodes = treeObj.getNodes();
	var productDataRoleIds = "";
	for (var i = 0; i < nodes.length; i++) {
		productDataRoleIds += nodes[i].id +",";
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/userPermissions/addProductPermisAll',
        "dataType": "json",
        "data":{"userId":userId,"productDataRoleIds":productDataRoleIds},
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".productPermission").modal('hide');
        	}
        	toastr.success(data.msg);        		
        }
    });
	return false;
});
