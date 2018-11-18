$(function () {

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
    $('#permissionTree2').on('click', '.authorize', function(){
    	$('#authorize-div').hide();
    	
    	var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
    	treeObj.checkAllNodes(false);
    	$('.add-btn,.edit-btn,.delete-btn').removeClass('blue');
    	
    	var dutyId = $(this).data('id');
    	var fullName = $(this).data('role');
    	if(!$("#authorize-div").hasClass("animated")){
    		$("#authorize-div").show();
    		$("#authorize-div").addClass("animated");
    	}
    	
    	$('.grant .role-name').html(fullName);
    	$('#authorize-div .role-id').val(dutyId);
    	
    	//加载权限，权限回显
    	$.ajax({
			url : ctx + '/duty/getDutyById',
			data : {id:dutyId},
			dataType : 'json',
			type : 'post',
			success : function(data){
				if(data.status != "success"){
					toastr.error(data.msg);
				}else{
					
					
					$('#authorize-div').show();
				}
			},
			error : function(){
				toastr.error("系统错误");
			}
		});
    	
    });
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
					$('#authorize-div').show();
				}
			},
			error : function(){
				toastr.error("系统错误");
			}
		});
    	
    });
    //角色列表
    (function () {
        //角色列表树
    	 $.ajax({
			url : ctx + '/duty/getAll',
			dataType : 'json',
			type : 'post',
			success : function(data){
				if(data.status != "success"){
					toastr.error(data.msg);
				}else{
					var treeObj = $.fn.zTree.init($("#permissionTree2"), setting2, data.list);
					treeObj.expandAll(true);
				}
			},
			error : function(){
				toastr.error("系统错误");
			}
		});
    	
    	 var setting2 = {
    	        	async: {
    	        		enable:true,//异步加载
    	        		dataType:"json"
    	        	},
    	    		view: {
    	                addDiyDom: addDiyDom2,
    	                dblClickExpand : false,  
    	                selectedMulti:false
    	            },	
    	            check: {
    	                enable: true
    	            },
    	            edit: {
    	            	enable:true,
    	                showRemoveBtn :true,//设置是否显示删除按钮  
    	                showRenameBtn :true,//设置是否显示编辑按钮  
    	                removeTitle: "删除",//删除按钮的显示名称
    	                renameTitle: "修改",//编辑按钮的显示名称
    	                editNameSelectAll:true//节点编辑名称input初次显示时设置TXT内容是否为全选状态
    	            },
    	            data: {
    		            key:{
    		              name:"fullName"
    		            },
    		            simpleData: {
    		              enable: true,
    		              idKey:"dutyId",
    		              pIdKey:"parentId",
    		              rootpId:0
    		            }
    	            },
    	            treeNode: {
    	                checked: false
    	            },
    	            callback: {  
    	                onClick: zTreeOnClick, //单击事件  
    	                //onRemove: onRemove, //移除事件 
    	                beforeEditName:beforeEditName,
    	                beforeRename: beforeRename,
    	                onRename:onRename    //修改事件  
    	            } 
    	         };
    	        $.fn.zTree.init($("#permissionTree2"), setting2); 
    	        
    	        var log, className = "dark";
    	     // 在进行重命名之前，进行一下确认  
    	        function beforeEditName(treeId, treeNode) {  
    	            className = (className === "dark" ? "":"dark");  
    	            var zTree = $.fn.zTree.getZTreeObj("permissionTree2");  
    	            zTree.selectNode(treeNode.dutyId);  
    	            return true;  
    	        }
    	     // 重命名操作  
    	        function beforeRename(treeId, treeNode, newName, isCancel) { 
    	            className = (className === "dark" ? "":"dark");  
    	            if (newName == "") {  
    	                alert("节点名称不能为空.");  
    	                var zTree = $.fn.zTree.getZTreeObj("permissionTree2");  
    	                setTimeout(function(){zTree.editName(treeNode)}, 10);  
    	                return false;  
    	            
    	            }  
    	            return true;
    	        }  
    	     //权限树节点修改   
    	        function onRename(event,treeId,treeNode){
    	        	var dutyId = treeNode.dutyId;
    	        	var fullName = treeNode.fullName;
    	            $.ajax({ 
    	                type : "POST",    
    	                //async : false, 
    	                dataType: 'json',
    	                url : ctx +'/duty/updateRecord',    
    	                data : {    
    	                	'dutyId' : dutyId,  
    	                    'fullName' : fullName  
    	                },  
    	                success: function (data) {
    	              		$('#updateDuty').modal('hide');
    	                	DataTable.init();
    	                },
    		    		error: function (msg) {
    		            	toastr.error("系统错误");
    		            } 
    	            });
    	        }

        function addDiyDom2(treeId, treeNode) {
    		var aObj = $("#" + treeNode.tId + "_a");
            var operateStr = '<a href="#" data-id="'+treeNode.dutyId+'" data-role="'+treeNode.fullName+'" class="authorize blue" data-toggle="modal" data-backdrop="static" data-target=".grant">权限授予</a>';
            aObj.append(operateStr);
        };
        //点击职位高亮显示
        function zTreeOnClick(event, treeId, treeNode) {
            $('.addRole button').removeClass('disabled');
            $('#roleAddForm .station').val(treeNode.fullName);
            $('#roleAddForm input[name="dutyId"]').val(treeNode.dutyId);
        };
        
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
        

        //新增----查看范围选择自定义时,显示自定义设置
        if ($('#addRole .checkRange :selected').text() == '自定义') {
            $('.custom').show();
        } else {
            $('.custom').hide();
        }
        $('#addRole .checkRange').change(function () {
            if ($(this).find(':selected').text() == '自定义') {
                $('.custom').show();
            } else {
                $('.custom').hide();
            }
        });
        //新增角色--自定义设置增加字段
        var num = 0;
        $('#addRole').on('click', '.add-custom', function () {
            //删除
            if ($(this).is('.fa-minus-circle')) {
                $(this).parent().remove();
            }
            //新增
            if ($(this).is('.fa-plus-circle')) {
                var content = ' <div id="custom-content' + num + '" class="custom-content col-sm-12">'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">项目</label>'
                    + '       <div  class="col-sm-9 no-padding-right">'
                    + '           <select  name="project" class="form-control project selectpicker" multiple'
                    + '                   title="01人力资源管理师">'
                    + '               <option value="0">01人力资源管理师</option>'
                    + '               <option value="1">02公共营养师</option>'
                    + '               <option value="2">03学历</option>'
                    + '               <option value="3">04采购师</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">品牌</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="brand" class="form-control brand selectpicker" multiple title="智联">'
                    + '               <option value="0">智联</option>'
                    + '               <option value="1">联想</option>'
                    + '               <option value="2">中和</option>'
                    + '               <option value="3">远大</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">部门</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="department" class="form-control department selectpicker" multiple'
                    + '                   title="总裁办">'
                    + '               <option value="0">总裁办</option>'
                    + '               <option value="1">财务中心</option>'
                    + '               <option value="2">销售中心</option>'
                    + '               <option value="3">综合管理中心</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">学员状态</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="studentStatus" class="form-control studentStatus selectpicker"'
                    + '                   multiple title="待沟通">'
                    + '               <option value="0">待沟通</option>'
                    + '               <option value="1">已沟通</option>'
                    + '               <option value="2">报名</option>'
                    + '               <option value="3">预约</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">梯队</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="echelon" class="form-control echelon selectpicker" multiple title="1">'
                    + '               <option value="0">1</option>'
                    + '               <option value="1">2</option>'
                    + '               <option value="2">3</option>'
                    + '               <option value="3">4</option>'
                    + '               <option value="3">5</option>'
                    + '               <option value="3">6</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">信息归属方</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="affiliation" class="selectpicker form-control affiliation" multiple'
                    + '                   title="01北京">'
                    + '               <option value="0">01北京</option>'
                    + '               <option value="1">02上海</option>'
                    + '               <option value="2">03南京</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <i class="fa fa-plus-circle blue control-label add-custom"></i>'
                    + '</div>';
                $('.custom').append(content);
                $('#custom-content' + num).find('select').selectpicker('val', '');
                num++;
                $(this).removeClass('fa-plus-circle blue').addClass('fa-minus-circle danger');
            }
        })


        //编辑---查看范围选择自定义时,显示自定义设置
        if ($('.quan-edit .checkRange :selected').text() == '自定义') {
            $('.custom-edit').show();
        } else {
            $('.custom-edit').hide();
        }
        $('.quan-edit .checkRange').change(function () {
            if ($(this).find(':selected').text() == '自定义') {
                $('.custom-edit').show();
            } else {
                $('.custom-edit').hide();
            }
        });
        //编辑--增加字段
        var num2 = 0;
        $('.quan-edit').on('click', '.add-custom', function () {
            //删除
            if ($(this).is('.fa-minus-circle')) {
                $(this).parent().remove();
            }
            //新增
            if ($(this).is('.fa-plus-circle')) {
                var content2 = ' <div id="custom-content-edit' + num2 + '" class="custom-content-edit col-sm-12">'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">项目</label>'
                    + '       <div  class="col-sm-9 no-padding-right">'
                    + '           <select  name="project" class="form-control project selectpicker" multiple'
                    + '                   title="01人力资源管理师">'
                    + '               <option value="0">01人力资源管理师</option>'
                    + '               <option value="1">02公共营养师</option>'
                    + '               <option value="2">03学历</option>'
                    + '               <option value="3">04采购师</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">品牌</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="brand" class="form-control brand selectpicker" multiple title="智联">'
                    + '               <option value="0">智联</option>'
                    + '               <option value="1">联想</option>'
                    + '               <option value="2">中和</option>'
                    + '               <option value="3">远大</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">部门</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="department" class="form-control department selectpicker" multiple'
                    + '                   title="总裁办">'
                    + '               <option value="0">总裁办</option>'
                    + '               <option value="1">财务中心</option>'
                    + '               <option value="2">销售中心</option>'
                    + '               <option value="3">综合管理中心</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">学员状态</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="studentStatus" class="form-control studentStatus selectpicker"'
                    + '                   multiple title="待沟通">'
                    + '               <option value="0">待沟通</option>'
                    + '               <option value="1">已沟通</option>'
                    + '               <option value="2">报名</option>'
                    + '               <option value="3">预约</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">梯队</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="echelon" class="form-control echelon selectpicker" multiple title="1">'
                    + '               <option value="0">1</option>'
                    + '               <option value="1">2</option>'
                    + '               <option value="2">3</option>'
                    + '               <option value="3">4</option>'
                    + '               <option value="3">5</option>'
                    + '               <option value="3">6</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <div class="form-group col-sm-6">'
                    + '       <label class="col-sm-3 control-label no-padding-right">信息归属方</label>'
                    + '       <div class="col-sm-9 no-padding-right">'
                    + '           <select name="affiliation" class="selectpicker form-control affiliation" multiple'
                    + '                   title="01北京">'
                    + '               <option value="0">01北京</option>'
                    + '               <option value="1">02上海</option>'
                    + '               <option value="2">03南京</option>'
                    + '           </select>'
                    + '       </div>'
                    + '   </div>'
                    + '   <i class="fa fa-plus-circle blue control-label add-custom"></i>'
                    + '</div>';
                $('.custom-edit').append(content2);
                $('#custom-content-edit' + num2).find('select').selectpicker('val', '');
                num2++;
                $(this).removeClass('fa-plus-circle blue').addClass('fa-minus-circle danger');
            }
        })

        //点击编辑获取职位
        $('.role-edit').on('click', function () {
            $('.quan-edit').modal('show');
            $('#quan-edit .positionName').val($(this).parent().parent().find('.positionName').text());
        })

    })();

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

            var operateStr = ""
                + "<span class='add-btn btn ' id='diyBtn1_" + treeNode.menuId
                + "'title=新增>新增</span>"
                + "<span class='edit-btn btn ' id='diyBtn2_" + treeNode.menuId
                + "'title=编辑>编辑</span>"
                + "<span class='delete-btn btn ' id='diyBtn3_" + treeNode.menuId
                + "'title=删除>删除</span>";
            aObj.append(operateStr);

            //新增切换
            var addBtn = $("#diyBtn1_" + treeNode.menuId);
            addBtn.on("click", function (event) {
                $(this).toggleClass('blue');
                event.stopPropagation();
            });

            //编辑切换
            var editBtn = $("#diyBtn2_" + treeNode.menuId);
            editBtn.on("click", function (event) {
                $(this).toggleClass('blue');
                event.stopPropagation();
            });

            //删除切换
            var deleteBtn = $("#diyBtn3_" + treeNode.menuId);
            deleteBtn.on("click", function (event) {
                $(this).toggleClass('blue');
                event.stopPropagation();
            });
        };

        //点击选中复选框
        function zTreeOnCheck(event, treeId, treeNode) {
            if (treeNode.checked == true) {
                $('#' + treeNode.tId).find('.add-btn,.edit-btn,.delete-btn').addClass('blue').removeClass('disabled');
            } else {
                $('#' + treeNode.tId).find('.add-btn,.edit-btn,.delete-btn').removeClass('blue').addClass('disabled');
            }
        };
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
    			
    			var aObj = $("#" + nodes[i].tId + "_a");
    			if(aObj.find('.add-btn').hasClass('blue')){
    				var pageAdd = page + ":" + "add";
    				list.push(pageAdd);
    			}
    			if(aObj.find('.edit-btn').hasClass('blue')){
    				var pageEdit = page + ":" + "edit";
    				list.push(pageEdit);
    			}
    			if(aObj.find('.delete-btn').hasClass('blue')){
    				var pageDelete = page + ":" + "delete";
    				list.push(pageDelete);
    			}	
    		}
    	}
    	
    	$.ajax({
    		url : ctx + '/duty/updateRecord',
    		data : {menus:JSON.stringify(list), dutyId:$('#authorize-div .role-id').val()},
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
    			
    			var aObj = $("#" + nodes[i].tId + "_a");
    			if(aObj.find('.add-btn').hasClass('blue')){
    				var pageAdd = page + ":" + "add";
    				list.push(pageAdd);
    			}
    			if(aObj.find('.edit-btn').hasClass('blue')){
    				var pageEdit = page + ":" + "edit";
    				list.push(pageEdit);
    			}
    			if(aObj.find('.delete-btn').hasClass('blue')){
    				var pageDelete = page + ":" + "delete";
    				list.push(pageDelete);
    			}	
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
    
    /**
     * 加载菜单和按钮权限
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @param oSettings
     * @returns
     */
    loadMenuAndButton();
});

function loadMenuAndButton(){
    $.ajax({
		url : ctx + '/menu/getAll',
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				toastr.error(data.msg);
			}else{
				data =  data.list;
				data = markIngData(data);
				var str = "";
				var main = "";
				var classVal = "";
				var className = "";
				data.forEach(function( val, index ) {
					if(val.enable ==1 && val.deleteMark == 1){
							main = val.navigateUrl.split('/')[1];
							str = '</br><button type="button" name="'+main+'" onclick="changeActiveAll(\''+main+'\')" class="btn btn-default btn-primary '+main+'">'+val.fullName+'</button>';
							$('.permission-content').append(str);
							if(val.target != '' && val.target != null){
								var son = val.target.split(';');
								son.forEach(function( e, num ) {
									classVal = e.split(':')[0];
									className = e.split(':')[1];
									if(e != null && e != ''){
										str = '&nbsp;<button type="button" name="'+main+'_'+classVal+'" onclick="changeActive(\''+main+'_'+classVal+'\')" class="btn btn-default  '+main+'_'+classVal+'">'+className+'</button>&nbsp;';
										$('.permission-content').append(str);
									}
								});
							}
						
					}
				});
			}
		},
		error : function(){
			toastr.error("系统错误");
		}
	});
}
var myTree = new Array();
var number = 0;
/**
 * 重新组装数据
 * @param e
 * @returns
 */
function markIngData(e){
	for(var i=0;i<e.length;i++){
		if(e[i].parentId=='0'){
			myTree[number] = e;
			number++;
			childrenAppend(e,number,e[i].menuId);
		}
	}
	return myTree;
}

function childrenAppend(e,number,menuId){
	for(var i=0;i<e.length;i++){
		if(e[i].parentId==menuId){
			myTree[number] = e[i];
			number++;
			childrenAppend(e,number,e[i].menuId);
		}
	}
}

function changeActiveAll(e){
	$('button[name^="'+e+'_"]').each(function(){
		$(this).toggleClass("btn-primary");
	});
}

function changeActive(e){
	$('.'+e).toggleClass("btn-primary");
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

