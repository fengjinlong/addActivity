$(function(){
	//数据初始化
    $("#weight tbody").html("<tr><td height='300' colspan='3' class='text-center'></td></tr>");
    $("#weight tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
	init();
})

function init(){
	var dutyTable = $('#weight').dataTable({
		"bPaginate": true,  //是否显示分页
    	"iDisplayLength": 10,
    	"bLengthChange": false,//每页显示的记录数
    	"bFilter": false, //搜索栏
    	"bSort": true, //是否支持排序功能
    	"bInfo": true, //显示表格信息
    	"bAutoWidth": false,  //自适应宽度
    	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
    	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
    	"sAjaxSource" : ctx+'/sysWeight/getAll',
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
			            {"mData": "title", 'sClass': "text-center"},
			            {"mData": "weightValue", 'sClass': "text-center"},
			            {
			                "mData": "dutyId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                	var u = '<shiro:hasPermission name="duty:edit">'
			                						+'<a data-record=\'' + JSON.stringify(full) + '\' class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".editWeight" > <i class="fa fa-edit"></i> 编辑</a>'
			                						+'</shiro:hasPermission>';
			                	var dataBtn = '<a class="btn btn-info btn-xs data-btn" data-toggle="modal" data-target=".dataPermission" data-backdrop="static">用户分配</a>';
			                    return u+dataBtn;
			                }
			            }
			        ],
			        "aoColumnDefs": [{
		   	            sDefaultContent: '',
		   	            aTargets: ['_all']
		   	        }],
	});
	
	function retrieveData(sSource, aoData, fnCallback, oSettings) {
	    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
	    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

	    var searchVal = $('#searchVal').val();

	    if (searchVal && searchVal.length != 0) {
	        aoData.push({"name": "searchVal", "value": searchVal});
	    }

	    $.ajax({
	        "url": sSource,
	        "data": aoData,
	        "cache": false,
	        "dataType": 'json',
	        "type": "POST",
	        "success": function (response) {
	            fnCallback(response.returnObject);
	        }
	    });
	}
}

//用户分配
$('#weight').on('click', '.data-btn', function () {
	var dutyId = $("#treeDutyId").val();
	//加载基本数据
	$.ajax({
			 url: ctx + '/permissions/getBrand',
			 type: 'POST',
			 success: function (data) {
				 $.fn.zTree.init($("#tree1"), setting, data);
			 },
			 error: function (response) {
				 toastr.error("系统错误");
		    }
		})
	//回显已有权限
	$.ajax({
			 url: ctx + '/permissions/selectTypeDataRoleByDutyId',
			 type: 'POST',
			 data:{"dutyId":dutyId},
			 success: function (data) {
				 $.fn.zTree.init($("#tree2"), setting, data);
			 },
			 error: function (response) {
				 toastr.error("系统错误");
		    }
		})
    var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            data: {
            	key:{
            		name: "brandName",
				},
	            simpleData: {
	                enable: true,
	                idKey: "brandId",
	            }
//				key:{
//            		name: "realName",
//				},
//	            simpleData: {
//	                enable: true,
//	                idKey: "userId",
//	            }
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
        
       
})

//编辑回显
$("#weight").on('click','.edit',function(){
	var record = $(this).data('record');
	$('.editWeight #weightId').val(record.weightId);
	$('.editWeight #weightTitle').val(record.title);
	$('.editWeight #weightValue').val(record.weightValue);
})

//编辑
$('#editWeight').on('click', '.confirm-btn', function(){
	$.ajax({
		   type: "POST",
		   url: ctx + "/sysWeight/updateWeight",
		   data: $("#editWeight").serializeArray(),
		   dataType: 'json',
		   success: function(msg){
			 if(msg.status=="success"){
				 toastr.success("修改成功！");
			 }
		   },
		});
});

$('#addWeight').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
        	$.ajax({
 			   type: "POST",
 			   url: ctx + "/sysWeight/addWeight",
 			   data: $("#addWeight").serializeArray(),
 			   dataType: 'json',
 			   success: function(msg){
 				  if(msg.status=="success"){
 					 toastr.success(msg.status);
 				 }
 				 $('.addWeight').hide();
 				 init();
 			   }
 			});
        }
 });
