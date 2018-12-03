$(function () {

	 //范围权限获取职位id
    $('#roleTable').on('click','.page-btn',function(){
	   	var dutyId = $(this).data('id');
	   	$("#pagePermission .role-id").val(dutyId);
	   	var fullName = $(this).data('role');
	   	$('.pagePermission .role-name').html(fullName);
    })
	
	//角色编辑
    $('#roleTable').on('click', '.role-edit', function(){
    
    	var roleId = $(this).data('id');
    	$('#roleUpdateForm .positionName').val($(this).data('duty'));
    	$('#roleUpdateForm input[name="fullName"]').val($(this).data('role'));
    	$('#roleUpdateForm input[name="roleId"]').val($(this).data('id'));
    	$('#roleUpdateForm input[name="code"]').val($(this).data('code'));
    	$('#updateRole').modal('show');
    })
    //编辑角色modal隐藏
	$('#updateRole').on('hidden.bs.modal', function () {
		$('#roleAddForm').data('bootstrapValidator').resetForm();
	})
    
    //新增角色modal隐藏
	$('#addRole').on('hidden.bs.modal', function () {
		$('#roleAddForm input[name="fullName"]').val('');
		$('#roleAddForm input[name="roleId"]').val('');
		$('#roleAddForm input[name="code"]').val('');
		$('#roleAddForm').data('bootstrapValidator').resetForm();
	})
    
    $('#roleAddForm').bootstrapValidator({
    	fields: {
    		fullName: {
                validators: {
                    notEmpty: {
                        message: '角色名不能为空'
                    },
                }
            }
    	},
    	submitHandler: function (validator, form, submitButton) {
    		var params = form.serialize();
    		$.ajax({
    			type: "POST",
                url:  ctx + '/role/addNewRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
              		$('#addRole').modal('hide');
                	DataTable.init();
                },
    		error: function (msg) {
            	toastr.error("系统错误");
            }
    		});
    	}
    });
    
    $('#roleUpdateForm').bootstrapValidator({
    	fields: {
    		fullName: {
                validators: {
                    notEmpty: {
                        message: '角色名不能为空'
                    },
                }
            }
    	},
    	submitHandler: function (validator, form, submitButton) {
    		var params = form.serialize();
    		$.ajax({
    			type: "POST",
                url:  ctx + '/role/updateRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
              		$('#updateRole').modal('hide');
                	DataTable.init();
                },
    		error: function (msg) {
            	toastr.error("系统错误");
            }
    		});
    	}
    });
	
    //启用、禁用切换
    $('table').on('click', '.status-btn', function () {
    	
    	var params  = {};
    	params['roleId'] = $(this).data('id');
    	params['enable'] = $(this).data('status');
    	
    	$.ajax({
			type: "POST",
            url:  ctx + '/role/updateRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
            	DataTable.init();
            },
			error: function (msg) {
	        	toastr.error("系统错误");
	        }
		});
    	
    });
    
    $("#roleTable tbody").html("<tr><td height='400' colspan='4' class='text-center'></td></tr>");
    $("#roleTable tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init();

    //权限授予
    $('#roleTable').on('click', '.authorizes', function(){
    	$('#authorize-div').hide();
    	
    	$('.add-btn,.edit-btn,.delete-btn').removeClass('blue');
    	
    	var roleId = $(this).data('id');
    	var fullName = $(this).data('role');
    	if(!$("#authorize-div").hasClass("animated")){
    		$("#authorize-div").show();
    		$("#authorize-div").addClass("animated");
    	}
    	
    	$('.grant .role-name').html(fullName);
    	$('#authorize-div .role-id').val(roleId);
    	
    	//加载权限，权限回显
    	$.ajax({
			url : ctx + '/role/getMenusById',
			data : {id:roleId},
			dataType : 'json',
			type : 'post',
			success : function(data){
				if(data.status != "success"){
					toastr.error(data.msg);
				}else{
					var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
					if(data.permisions){
						var permisions = JSON.parse(data.permisions);
						for(var i=0; i<permisions.length; ++i){
							var per = permisions[i].split(':');
							var treeNode = treeObj.getNodeByParam("navigateUrl", '/' + per[0] + '/index', null);
							if(per[1] == "view"){
								if(treeNode){
									treeObj.checkNode(treeNode, true, false);
								}
							}
							per = permisions[i].replace(':','_');
							$('.'+per).addClass('blue');
						}
					}
					
					$('#authorize-div').show();
				}
			},
			error : function(){
				toastr.error("系统错误");
			}
		});
    	
    });

    //权限配置
    (function () {
        //权限配置树
        var setting = {
            view: {
                addDiyDom: addDiyDom
            },
            check: {
                enable: true,
            },
            data: {
	            key: {
	    			name: "fullName"
	    		},
	        	simpleData: {
	                enable: true,
	                idKey: "menuId",
	    			pIdKey: "parentId",
	    			rootPId: 0
	            }
            },
            edit: {
                enable: false
            },
            treeNode: {
                checked: false
            },
            callback: {
                onCheck: zTreeOnCheck
            }

        };

        function addDiyDom(treeId, treeNode) {
            var aObj = $("#" + treeNode.tId + "_a");
            var main = treeNode.navigateUrl.split('/')[1];
            var str = '';
            var son = '';
			var classVal = "";
			var className = "";
			var appendStr = '';
            if(treeNode.target != null && treeNode.target !=''){
            		str = treeNode.target;
            		son = str.split(';');
				son.forEach(function( e, num ) {
					classVal = e.split(':')[0];
					className = e.split(':')[1];
					if(e != null && e != ''){
						appendStr = appendStr + '<span name="'+main+'_'+classVal+'" onclick="changeActive(\''+main+'_'+classVal+'\')" class="add-btn btn '+ main+'_'+classVal +'" title='+className+'>'+className+'</span>';
					}
				});
            }
            aObj.append(appendStr);
        };

        //点击选中复选框
        function zTreeOnCheck(event, treeId, treeNode) {
            if (treeNode.checked == true) {
                $('#' + treeNode.tId).find('.add-btn,.edit-btn,.delete-btn').addClass('blue');
            } else {
                $('#' + treeNode.tId).find('.add-btn,.edit-btn,.delete-btn').removeClass('blue');
            }
        };
        
        $.ajax({
			url : ctx + '/menu/getAll',
			dataType : 'json',
			type : 'post',
			success : function(data){
				if(data.status != "success"){
					toastr.error(data.msg);
				}else{
					var treeObj = $.fn.zTree.init($("#permissionTree"), setting, data.list);
			        treeObj.expandAll(true);
				}
			},
			error : function(){
				toastr.error("系统错误");
			}
		});
    })();
    
    //数据集权限配置
    (function () {
        //数据集权限配置
        var settingData = {
    	        check: {
    	            enable: true,
    	        },
    	        data: {
    	            key: {
    	    			name: "fullName"
    	    		},
    	        	simpleData: {
    	                enable: true,
    	                idKey: "departmentId",
    		    			pIdKey: "parentId",
    		    			rootPId: 0
    	            }
    	        },
    	        edit: {
    	            enable: false
    	        },
    	        treeNode: {
    	            checked: false
    	        },
    	        callback: {
    	            onCheck: zTreeOnCheck
    	        }
    	    };

	    	$.ajax({
				 url: ctx + '/permissions/getDepartment',
				 type: 'POST',
				 success: function (data) {
					 $.fn.zTree.init($("#tree3"), settingData, data);
				 },
				 error: function (response) {
					 toastr.error("系统错误");
			    }
		})
		
		//点击选中复选框
        function zTreeOnCheck(event, treeId, treeNode) {
            if (treeNode.checked == true) {
                $('#' + treeNode.tId).find('.add-btn,.edit-btn,.delete-btn').addClass('blue');
            } else {
                $('#' + treeNode.tId).find('.add-btn,.edit-btn,.delete-btn').removeClass('blue');
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
		
    })();

    //右侧树保存按钮
    $('#authorize-div .save').on('click', function(){
    	var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
    	var nodes = treeObj.getCheckedNodes(true);
    	
    	var list = new Array();
    	for(var i=0; i<nodes.length; ++i){
    		var navigateUrl = nodes[i].navigateUrl;
    		if(navigateUrl){
    			var page = navigateUrl.split("/")[1];
    			var pageView = page + ":" + "view";
    			list.push(pageView);
    			
    			$('span[name^='+page+']').each(function(){
    				if($(this).hasClass('blue')){
        				var pageSon = $(this).attr('name').split('_')[1];
        				list.push(page + ":" + pageSon);
        			}
    			});
    		}
    	}
    	$.ajax({
    		url : ctx + '/role/updateRecord',
    		data : {menus:JSON.stringify(list), roleId:$('#authorize-div .role-id').val()},
    		dataType : 'json',
    		type : 'post',
    		success : function(data){
    			if(data.status != "success"){
    				toastr.error(data.msg);
    			}else{
    				toastr.success(data.msg);
                    $('.grant').modal('hide');
    			}
    		},
    		error : function(){
    			toastr.error("系统错误");
    		}
    	});
    		
    });
    
});
function changeActiveAll(e){
	$('button[name^="'+e+'_"]').each(function(){
		$(this).toggleClass("btn-primary");
	});
}

function changeActive(e){
	$('.'+e).toggleClass("blue");
}

function retrieveData( sSource, aoData, fnCallback, oSettings ) {
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
    aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });
    var searchVal = $('#selectTj').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    var enable = $('#selectZt').val();
    aoData.push({"name": "enable", "value": enable});
    $.ajax( {  
        "url": sSource,  
        "data": aoData,  
        "cache": false,  
        "dataType": 'json', 
        "type": "POST", 
        "success" :function(response) {
        	fnCallback(response.returnObject);
        	 $('[data-toggle="tooltip"]').tooltip();
        }  
    } );  
};

//回车搜索
function search() {
    if (event.keyCode == 13) {
     	DataTable.init();
    }
}


//范围数据权限
$('#roleTable').on('click', '.page-btn', function () {
	var dutyId = $("#pagePermission .role-id").val();
	//获取已有权限
	var treeObj = $.fn.zTree.getZTreeObj("tree3");
	$.ajax({
		 url: ctx + '/permissions/selectRangeDataRoleByDutyId',
		 type: 'POST',
		 data:{"dutyId":dutyId},
		 success: function (data) {
				for(var i=0; i<data.length; ++i){
					var treeNode = treeObj.getNodeByParam("departmentId",data[i].departmentId,null);
					if(treeNode){
						treeObj.checkNode(treeNode, true, false);
					}
				}
		 },
		 error: function (response) {
			 toastr.error("系统错误");
	    }
	})
		
})

//保存数据范围权限
$("#pagePermission .save").on("click", function(){
	var dutyId = $("#pagePermission .role-id").val();
//	 获取全部节点数据
	var treeObj = $.fn.zTree.getZTreeObj("tree3");
	var nodes = treeObj.getCheckedNodes();
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

