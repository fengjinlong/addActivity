$(function () {
	//数据初始化
    $("#init tbody").html("<tr><td height='300' colspan='8' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    $('.increase').click(function(){
    	$('.add').modal('show');
    });
    init();
});
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
		"sAjaxSource" : ctx+'/flow/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "sortCode","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "examFlowName","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				if(data==1){
					return "可用";
				}else{
					return "不可用";
				}
				
              }},
              {"mDataProp" : "examFlowId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
            	var buttonBtn = '<a class="btn btn-info btn-xs button-btn" data-toggle="modal" examFlowName="'+full["examFlowName"]+'" examFlowId="'+full["examFlowId"]+'"  data-target=".buttonPermission" data-backdrop="static">编辑</a>';
				return buttonBtn;
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
$('.increase').click(function(){
	$('#addFullName').val('');
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
            "url": ctx+'/flow/loadTree',
            "dataType": "json",
            "success": function (e) {
            	var data = e.data;
            	for(var i=0; i<data.length; i++){
             		var obj={};
             		obj["id"] = data[i].examFlowBasicsId;
             		obj["pId"] = data[i].parentId;
             		obj["name"] = data[i].fullName;
             		data_left.push(obj);                     			
 				}
             	$.fn.zTree.init($("#tree1"), setting, data_left);
             	$.fn.zTree.init($("#tree2"), setting,data_right);
            }
        });
});

$(".addTree").click(function(){
	var treeObj = $.fn.zTree.getZTreeObj("tree2");
	var nodes = treeObj.getNodes();
	nodes = treeObj.transformToArray(nodes);
	var treeList = new Array();
	for (var i = 0; i < nodes.length; i++) {
		var sun = {};
		sun["childId"] = nodes[i].id;
		sun['parentId'] = nodes[i].pId==null?0:nodes[i].pId;
		sun['type'] = nodes[i].level+1;
		treeList.push(sun);
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/flow/addTree',
        "dataType": "json",
        "data":{
        	"treeList":JSON.stringify(treeList),
        	"fullName":$('#addFullName').val()
        },
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".add").modal('hide');
        		init();
        	}
        	toastr.success(data.msg);        		
        }
    });
	return false;
});

/**
 * 显示按钮权限
 */
$("#init").on('click','.button-btn',function(){
	var examFlowId = $(this).attr("examFlowId");
	var examFlowName = $(this).attr("examFlowName");
	$("#examFlowId").val(examFlowId);
	$("#updateFullName").val(examFlowName);
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
            "url": ctx+'/flow/loadTreeUse',
            "dataType": "json",
            "data":{"examFlowId":examFlowId},
            "success": function (data) {
            	data = data.data;
            	var buttonRoleIds = "";
            	for(var i=0; i<data.length; i++){
            		buttonRoleIds += "'"+data[i].childId+"',"
            	}
            	/**
            	 * 加载所有按钮权限
            	 */
            	 $.ajax({
                     "type": "Post",
                     "url": ctx+'/flow/loadTree',
                     "dataType": "json",
                     "success": function (data) {
                    	 data = data.data;
                     	for(var i=0; i<data.length; i++){
                     		var obj={};
                     		obj["id"] = data[i].examFlowBasicsId;
                     		obj["pId"] = data[i].parentId;
                     		obj["name"] = data[i].fullName;
                     		if(buttonRoleIds.indexOf("'"+data[i].examFlowBasicsId+"',") >= 0){
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
	var examFlowId = $("#examFlowId").val();
	var treeObj = $.fn.zTree.getZTreeObj("tree6");
	var nodes = treeObj.getNodes();
	nodes = treeObj.transformToArray(nodes);
	var treeList = new Array();
	for (var i = 0; i < nodes.length; i++) {
		var sun = {};
		sun["childId"] = nodes[i].id;
		sun['parentId'] = nodes[i].pId==null?0:nodes[i].pId;
		sun['type'] = nodes[i].level+1;
		treeList.push(sun);
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/flow/addTree',
        "dataType": "json",
        "data":{
        	"treeList":JSON.stringify(treeList),
        	"fullName":$('#updateFullName').val(),
        	"examFlowId":examFlowId
        },
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".buttonPermission").modal('hide');
        		init();
        	}
        	toastr.success("修改成功");        		
        }
    });
	return false;
});
