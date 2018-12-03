$(function () {
	
	/*左侧公司，部门，职位，权限列表 begin*/
	
    //获取公司列表
    $.ajax({
		url : ctx + '/department/getByWhere',
		data : {type:1},
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				toastr.error(data.msg);
			}else{
				
				var str = "";
				
				for(var i=0; i<data.list.length; i++){
					str = str + '<li><a href="#" data-id="'+data.list[i].departmentId+'" class="menu-dropdown dept-dropdown"><i class="fa fa-home"></i><span class="menu-text">'+data.list[i].fullName+'</span><i class="fa pull-right fa-angle-right"></i></a><ul class="submenu"><img style="margin: auto;display: block;" width="50px" height="50px" src="'+ctx_static+'/common/image/loading.gif"/></ul></li>';
				}
				
				$('.permission ul.sidebar-menu').html(str);
			}
		},
		error : function(){
			toastr.error("系统错误");
		}
	});
    //部门点击事件
    $('.permission').on('click', '.dept-dropdown', function(){
    	
    	$(this).parent().siblings().find('.menu-dropdown .pull-right').removeClass('fa-angle-down').addClass('fa-angle-right');
        if ($(this).next('.submenu').css('display') === 'none') {
            $(this).find('.pull-right').removeClass('fa-angle-right').addClass('fa-angle-down');
            
            //如果是第一次点击
            if($(this).siblings('ul.submenu').children('img').length){
            	
            	 var pid = $(this).data('id');
                 
                 var _this = $(this);
                 
             	$.ajax({
             		url : ctx + '/department/getByWhere',
             		data : {parentId:pid},
             		dataType : 'json',
             		type : 'post',
             		success : function(data){
             			if(data.status != "success"){
             				toastr.error(data.msg);
             			}else{
             				
             				var str = "";
             				
             				//下级部门
             				for(var i=0; i<data.list.length; i++){
             					str = str + '<li><a href="#" data-id="'+data.list[i].departmentId+'" class="menu-dropdown dept-dropdown"><i class="fa fa-sitemap"></i><span class="menu-text">'+data.list[i].fullName+'</span><i class="fa pull-right fa-angle-right"></i></a><ul class="submenu"><img style="margin: auto;display: block;" width="50px" height="50px" src="'+ctx_static+'/common/image/loading.gif"/></ul></li>';
             				}
             				
             				//职位
             				for(var i=0; i<data.dutyList.length; i++){
             					str = str + '<li><a href="#" data-id="'+data.dutyList[i].dutyId+'" class="menu-dropdown duty-dropdown"><i class="fa fa-users"></i><span class="menu-text">'+data.dutyList[i].fullName+'</span><i class="fa pull-right fa-angle-right"></i></a><ul class="submenu"><img style="margin: auto;display: block;" width="50px" height="50px" src="'+ctx_static+'/common/image/loading.gif"/></ul></li>';
             				}
             				
             				_this.siblings('ul.submenu').html(str);
             			}
             		},
             		error : function(){
             			toastr.error("系统错误");
             		}
             	});
            }
                 
        } else {
                 $(this).find('.pull-right').removeClass('fa-angle-down').addClass('fa-angle-right');
        }
    	
    });
    //职位点击事件
    $('.permission').on('click', '.duty-dropdown', function(){
    	
    	$(this).parent().siblings().find('.menu-dropdown .pull-right').removeClass('fa-angle-down').addClass('fa-angle-right');
        if ($(this).next('.submenu').css('display') === 'none') {
            $(this).find('.pull-right').removeClass('fa-angle-right').addClass('fa-angle-down');
            
            //如果是第一次点击
            if($(this).siblings('ul.submenu').children('img').length){
            	
            	 var dutyId = $(this).data('id');
                 
                 var _this = $(this);
                 
             	$.ajax({
             		url : ctx + '/role/getAll',
             		data : {dutyId:dutyId},
             		dataType : 'json',
             		type : 'post',
             		success : function(data){
             			if(data.status != "success"){
             				toastr.error(data.msg);
             			}else{
             				
             				var str = "";
             				
             				//角色
             				for(var i=0; i<data.list.length; i++){
             					str = str + '<li><a href="#" data-id="'+data.list[i].roleId+'" class="menu-dropdown role-dropdown"><i class="fa fa-user"></i><span class="menu-text">'+data.list[i].fullName+'</span></a></li>';
             				}
             				_this.siblings('ul.submenu').html(str);
             			}
             		},
             		error : function(){
             			toastr.error("系统错误");
             		}
             	});
            }
                 
        } else {
                 $(this).find('.pull-right').removeClass('fa-angle-down').addClass('fa-angle-right');
        }
    	
    });
    
    
    //配置数据
    var setting = {
        check: {
            enable: true,
            autoCheckTrigger: false,
            chkboxType: { "Y": "p", "N": "ps" }
        },
        data: {
        	key: {
    			url: "navigateUrl",
    			name: "fullName"
    		},
        	simpleData: {
                enable: true,
                idKey: "menuId",
    			pIdKey: "parentId",
    			rootPId: 0
            }
        }
    };
    
    //角色点击事件
    $('.permission').on('click', '.role-dropdown', function(){
    	
    	$('.permission-config h4').text($(this).text().trim());
    	
    	var roleId = $(this).data('id');
    	
    	$('#roleId').val(roleId);
    	
    	$.ajax({
    		url : ctx + '/role/getMenusById',
    		data : {id:roleId},
    		dataType : 'json',
    		type : 'post',
    		success : function(data){
    			if(data.status != "success"){
    				toastr.error(data.msg);
    			}else{
    				$.fn.zTree.init($("#permissionTree"), setting, data.menus);

    		        var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
    		        treeObj.expandAll(true);
    		        
    		        var checkedNode = JSON.parse(data.checkedMenus);
    		        for(var i=0; i<checkedNode.length; ++i){
    		        	
    		        	treeObj.checkNode(treeObj.getNodeByParam("menuId", checkedNode[i].menuId, null), true, true);
    		        }
    		        
    			}
    		},
    		error : function(){
    			toastr.error("系统错误");
    		}
    	});
    	
    });
    
    /*左侧公司，部门，职位，权限列表 end*/
    
    
    //右侧树保存按钮
    $('button.save').on('click', function(){
    	
    	var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
    	var nodes = treeObj.getCheckedNodes(true);
    	
    	var list = new Array();
    	for(var i=0; i<nodes.length; ++i){
    		var obj = {};
    		obj['fullName'] = nodes[i].fullName;
    		obj['img'] = nodes[i].img;
    		obj['menuId'] = nodes[i].menuId;
    		obj['parentId'] = nodes[i].parentId;
    		obj['navigateUrl'] = nodes[i].navigateUrl;
    		obj['sortCode'] = nodes[i].sortCode;
    		list.push(obj);
    	}
    	
    	$.ajax({
    		url : ctx + '/role/updateRecord',
    		data : {menus:JSON.stringify(list), roleId:$('#roleId').val()},
    		dataType : 'json',
    		type : 'post',
    		success : function(data){
    			if(data.status != "success"){
    				toastr.error(data.msg);
    			}else{
    				toastr.success(data.msg);
    			}
    		},
    		error : function(){
    			toastr.error("系统错误");
    		}
    	});
    		
    });
    
    
    /**
     * 权限字段
     */
    (function () {
        /**
         * 全选
         * @param parentEle
         */
        function checkAll(parentEle) {
            $(parentEle).find('.checkAll').on('click', function () {
                if ($(this).prop('checked')) {
                    $(parentEle).find('.form-group input[type="checkbox"]').prop('checked', true);
                    $(parentEle).find('.inverseCheck').prop('checked', false);
                } else {
                    $(parentEle).find('.form-group input[type="checkbox"]').prop('checked', false);
                    $(parentEle).find('.inverseCheck').prop('checked', true);
                }
            });
            $(parentEle).find('.form-group input[type="checkbox"]').each(function (index, ele) {
                $(ele).on('click', function () {
                    if (!$(ele).prop('checked')) {
                        $(parentEle).find('.checkAll').prop('checked', false);
                    } else {
                        $(parentEle).find('.inverseCheck').prop('checked', false);
                    }
                });
            })
        }

        /**
         * 反选
         * @param parentEle
         */
        function inverseCheck(parentEle) {
            $(parentEle).find('.inverseCheck').on('click', function () {
                if ($(this).prop('checked')) {
                    $(parentEle).find('.form-group input[type="checkbox"]').prop('checked', false);
                    $(parentEle).find('.checkAll').prop('checked', false);
                } else {
                    $(parentEle).find('.form-group input[type="checkbox"]').prop('checked', true);
                    $(parentEle).find('.checkAll').prop('checked', true);
                }
            });
            $(parentEle).find('.form-group input[type="checkbox"]').each(function (index, ele) {
                $(ele).on('click', function () {
                    if (!$(ele).prop('checked')) {
                        $(parentEle).find('.checkAll').prop('checked', false);
                    } else {
                        $(parentEle).find('.inverseCheck').prop('checked', false);
                    }
                });
            })
        }

        checkAll('#userBasic');
        checkAll('#recordBasic');
        checkAll('#socialSecurity');
        inverseCheck('#userBasic');
        inverseCheck('#recordBasic');
        inverseCheck('#socialSecurity');
    })();
});


//新增或编辑
function addOrUpdateRecord(){
	
	$.ajax({
		url : ctx + '/role/addNewRecord',
		data : $('#addForm').serialize(),
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				toastr.error(data.msg);
			}else{
			    //获取公司列表
			    $.ajax({
					url : ctx + '/department/getByWhere',
					data : {type:1},
					dataType : 'json',
					type : 'post',
					success : function(data){
						if(data.status != "success"){
							toastr.error(data.msg);
						}else{
							
							$('#addRole').modal('hide');
							
							var str = "";
							
							for(var i=0; i<data.list.length; i++){
								str = str + '<li><a href="#" data-id="'+data.list[i].departmentId+'" class="menu-dropdown dept-dropdown"><i class="fa fa-home"></i><span class="menu-text">'+data.list[i].fullName+'</span><i class="fa pull-right fa-angle-right"></i></a><ul class="submenu"><img style="margin: auto;display: block;" width="50px" height="50px" src="'+ctx_static+'/common/image/loading.gif"/></ul></li>';
							}
							
							$('.permission ul.sidebar-menu').html(str);
						}
					},
					error : function(){
						toastr.error("系统错误");
					}
				});
			}
		},
		error : function(){
			toastr.error("系统错误");
		}
	});
	
	return false;
}
