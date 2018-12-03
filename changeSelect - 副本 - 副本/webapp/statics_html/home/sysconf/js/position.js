$(function () {
    duty();
    $('.addPosition').on('hidden.bs.modal', function () {
        $('#addPosition')[0].reset();
        $('#addPosition .input').val('');
        $('#addPosition input:hidden').val('');
        $('#addPosition .textarea').val('');
        $('#addPosition .selectpicker').selectpicker('refresh');
        $('#addPosition').data('bootstrapValidator').resetForm();
    })
    
    
  //数据类型权限获取职位id
    $('#duty').on('click','.data-btn',function(){
    	var dutyId = $(this).parent().parent().find('td:first input').val();
    	$("#treeDutyId").val(dutyId);
    })
    //范围权限获取职位id
     $('#duty').on('click','.page-btn',function(){
    	var dutyId = $(this).parent().parent().find('td:first input').val();
    	$("#treeDutyId").val(dutyId);
    })
    //按钮权限获取职位id
     $('#duty').on('click','.button-btn',function(){
    	var dutyId = $(this).parent().parent().find('td:first input').val();
    	$("#treeDutyId").val(dutyId);
    })
});
//保存按钮权限
$("#buttonPermission .buttonBtn").on("click", function(){
	var dutyId = $("#treeDutyId").val();
//	 获取全部节点数据
	var treeObj = $.fn.zTree.getZTreeObj("tree6");
	var nodes = treeObj.getNodes();
	var nodes = treeObj.transformToArray(nodes);
	var str = "";
	for (var i = 0; i < nodes.length; i++) {
		str += nodes[i].buttonRoleId +",";
	}
	
	$.ajax({
	    url: ctx + '/buttonRoleDuty/insert',
        type: 'POST',
        data:{"buttonRoleId":str,"dutyId":dutyId},
        success: function (data) {
        	if(data.status == "success"){
        		toastr.success("保存成功");
        	}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
	 });
	$('.buttonPermission').modal('hide');
})

//保存数据范围权限
$("#pagePermission .pageBtn").on("click", function(){
	var dutyId = $("#treeDutyId").val();
//	 获取全部节点数据
	var treeObj = $.fn.zTree.getZTreeObj("tree4");
	var nodes = treeObj.getNodes();
	var str = ""; 
	for (var i = 0; i < nodes.length; i++) {
		var rangeDataRoleId = nodes[i].departmentId;
		str += ","+rangeDataRoleId;
	}
	str = str.substring(1);
	if(str.length>=0){
		$.ajax({
		    url: ctx + '/rangeDataRoleDuty/insert',
	        type: 'POST',
	        data:{"rangeDataRoleId":str,"dutyId":dutyId},
	        success: function (data) {
	        	if(data.status == "success"){
	        		toastr.success("保存成功");
	        	}
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
		 });
	}
	$('.pagePermission').modal('hide');
})

//保存数据类型权限
$("#dataPermission .dataBtn").on("click", function(){
	var dutyId = $("#treeDutyId").val();
//	 获取全部节点数据
	var treeObj = $.fn.zTree.getZTreeObj("tree2");
	var nodes = treeObj.getNodes();
	var str = ""; 
	for (var i = 0; i < nodes.length; i++) {
		var typeDataRoleId = nodes[i].brandId;
		str += ","+typeDataRoleId;
	}
	str = str.substring(1);
	if(str.length>=0){
		$.ajax({
		    url: ctx + '/typeDateRoleDuty/insert',
	        type: 'POST',
	        data:{"typeDataRoleId":str,"dutyId":dutyId},
	        success: function (data) {
	        	if(data.status == "success"){
	        		toastr.success("保存成功");
	        	}
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
		 });
	}
	$('.dataPermission').modal('hide');
})

//加载按钮权限
$('#duty').on('click', '.button-btn', function () {
	var dutyId = $("#treeDutyId").val();
	$.ajax({
			 url: ctx + '/permissions/loadButtonRole',
			 type: 'POST',
			 success: function (data) {
				 $.fn.zTree.init($("#tree5"), setting, data);
			 },
			 error: function (response) {
				 toastr.error("系统错误");
		    }
		})
		$.ajax({
			 url: ctx + '/permissions/selectButtonRoleByDutyId',
			 type: 'POST',
			 data:{"dutyId":dutyId},
			 success: function (data) {
				 $.fn.zTree.init($("#tree6"), setting, data);
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
            		name: "buttonVal",
				},
	            simpleData: {
	                enable: true,
	                idKey: "buttonRoleId",
	                pIdKey:"partName"
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
})


//范围数据权限
$('#duty').on('click', '.page-btn', function () {
	var dutyId = $("#treeDutyId").val();
	$.ajax({
			 url: ctx + '/permissions/getDepartment',
			 type: 'POST',
			 success: function (data) {
				 $.fn.zTree.init($("#tree3"), setting, data);
			 },
			 error: function (response) {
				 toastr.error("系统错误");
		    }
		})
		//获取已有权限
		$.ajax({
			 url: ctx + '/permissions/selectRangeDataRoleByDutyId',
			 type: 'POST',
			 data:{"dutyId":dutyId},
			 success: function (data) {
				 $.fn.zTree.init($("#tree4"), setting,data);
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
            		name: "fullName",
				},
	            simpleData: {
	                enable: true,
	                idKey: "departmentId",
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
        
       
})

//类型数据
$('#duty').on('click', '.data-btn', function () {
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


function duty() {
    //上级职位
    $.ajax({
        url: ctx + '/duty/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            showDutyTree(data);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}
/*$(document).on('click', '#parentIds', function () {
    var cityObj = $("#parentIds");
    var cityOffset = $("#parentIds").offset();
    var rightPageLeft = $('#showPage').offset().left;
    var positionTop = cityOffset.top - ($('.navbar-inner').height() + $('.page-breadcrumbs').height() + $('.page-header').height()) + cityObj.height() + 14;

    $("#content").css({left: cityOffset.left - rightPageLeft + "px", top: positionTop + "px"}).slideDown("fast");
    $("body *:not(.menuContent)").bind("mousedown", onBodyDown);
    $('#ajaxTree').width(cityObj.width() + 14);
});*/
$(document).on('click', '#parentId', function () {
    var cityObj = $("#parentId");
    var cityOffset = $("#parentId").offset();
//    var rightPageLeft = $('#showPage').offset().left;
    var positionTop = cityOffset.top - ($('.navbar-inner').height() + $('.page-breadcrumbs').height() + $('.page-header').height()) + cityObj.height() + 14;

    $("#content").css({left: cityOffset.left  + "px", top: positionTop + "px"}).slideDown("fast");
    $("body *:not(.menuContent)").bind("mousedown", onBodyDown);
    $('#ajaxTree').width(cityObj.width() + 14);
})
function showDutyTree(data) {
    var setting = {
        view: {
            showIcon: true,
            showLine: true,
            expandSpeed: "normal",
            dblClickExpand: dblClickExpand
        },
        data: {
            key: {
                name: "fullName"
            },
            simpleData: {
                enable: true,
                idKey: "dutyId",
                pIdKey: "parentId"
            }
        },
        callback: {
            onClick: onClick
        }
    };
    //冻结根节点
    function dblClickExpand(treeId, treeNode) {
        return treeNode.level > 0;
    }

    $.fn.zTree.init($("#ajaxTree"), setting, data.list);
    var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
    var nodes = treeObj.getNodes();
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            treeObj.expandNode(nodes[i], true, false, false);
        }
    }


//	$.fn.zTree.init($("#editajaxTree"),setting, data.list);
}
function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "content" || $(event.target).parents("#content").length > 0)) {
        $("#content").fadeOut("fast");
    }
}
//function editonBodyDown(event) {
//	if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "editcontent" || $(event.target).parents("#editcontent").length>0)) {
//		$("#editcontent").fadeOut("fast");
//	}
//}
function onClick(e, treeId, treeNode) {
    var dutyId = treeNode.dutyId;
    var name = treeNode.fullName;
    var fullPath = treeNode.fullPath;
    $('#addPosition input[name="parentId"]').val(dutyId);
    $('#addPosition input[name="fullPath"]').val(fullPath + ',' + dutyId);
    $('#addPosition input[name="parentFullName"]').val(name);
    $('#editPosition input[name="parentId"]').val(dutyId);
    $('#editPosition input[name="fullPath"]').val(fullPath + ',' + dutyId);
    $('#editPosition input[name="parentFullName"]').val(name);
    $("#content").fadeOut("fast");
//	$("#editcontent").fadeOut("fast");
    return false;
}
//数据初始化
$("#duty tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#duty tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});

DataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
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
//修改职位状态
function chooseDuty(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/duty/updateRecord',
        type: 'POST',
        data: {
            dutyId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            /*if(data.status == 'success' && flag == 1){
             $("#span"+val).removeClass("btn-nouse").addClass("btn-use");
             $("#span"+val).html('<i class="fa fa-check-circle-o"></i> 启用');
             }
             if(data.status == 'success' && flag == 0){
             $("#span"+val).removeClass("btn-use").addClass("btn-nouse");
             $("#span"+val).html('<i class="fa fa-ban"></i> 禁用');
             }*/
            DataTable.init();
        }
    });
}
//查看职位信息
$('#duty').on('click', '.view', function () {
    var record = $(this).data('record');
    $('#viewPosition input[name="code"]').val(record.code);
    $('#viewPosition input[name="fullName"]').val(record.fullName);
    $('#viewPosition input[name="shortName"]').val(record.shortName);
    $('#viewPosition select[name="enable"]').val(record.enable);
    $('#viewPosition textarea[name="description"]').val(record.description);
});
//编辑取值
function edit(dutyId, code, fullName, shortName, parentName, parentId, fullPath, enable, description) {
    $('#editPosition input[name="dutyId"]').val(dutyId);
    $('#editPosition input[name="code"]').val(code);
    $('#editPosition input[name="fullName"]').val(fullName);
    $('#editPosition input[name="shortName"]').val(shortName);
    $('#editPosition input[name="parentFullName"]').val(parentName);
    $('#editPosition input[name="parentId"]').val(parentId);
    $('#editPosition input[name="fullPath"]').val(fullPath);
    $('#editPosition select[name="enable"]').val(enable);
    $('#editPosition textarea[name="description"]').val(description);
}
//保存编辑
$('#editPosition').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var dutyId = $('#editPosition input[name="dutyId"]').val();
        var code = $('#editPosition input[name="code"]').val();
        var fullName = $('#editPosition input[name="fullName"]').val();
        var shortName = $('#editPosition input[name="shortName"]').val();
        var parentId = $('#editPosition input[name="parentId"]').val();
        var fullPath = $('#editPosition input[name="fullPath"]').val();
        var enable = $('#editPosition select[name="enable"]').val();
        var description = $('#editPosition textarea[name="description"]').val();
        $.ajax({
            url: ctx + '/duty/updateRecord',
            data: {
                dutyId: dutyId, code: code, fullName: fullName,
                shortName: shortName, parentId: parentId, fullPath: fullPath, enable: enable, description: description
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.editPosition').modal('hide');
                    DataTable.init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    }
});
//删除（假删除）
$('#duty').on('click', '.delete', function () {
    var dutyId = $(this).data('id');
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
        $.ajax({
            url: ctx + '/duty/updateRecord',
            type: 'POST',
            data: {
                dutyId: dutyId,
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
});
//新增职位信息
$('#addPosition').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        $.ajax({
            type: "POST",
            url: ctx + '/duty/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.addPosition').modal('hide');
                DataTable.init();
                duty();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
});
//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}


//全选
$('#duty thead .checkAll').on('click', function(){
    if($(this).prop('checked')){
        $('#duty tbody .checkchild').prop('checked', true);
    }else{
        $('#duty tbody .checkchild').prop('checked', false);
    }
})
