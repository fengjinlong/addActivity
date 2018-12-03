$(function () {
	
	//form验证
	$("#updateForm").bootstrapValidator();
	$("#updateForm").on('success.form.bv', function(e) {
        e.preventDefault();
    });
	
	$("#addForm").bootstrapValidator();
	$("#addForm").on('success.form.bv', function(e) {
        e.preventDefault();
    });
	
	
    //折叠图标切换
    $('.menu .sidebar-menu').on('click', '.menu-dropdown', function () {
    	if ($(this).next('.submenu').css('display') == 'block') {
            $(this).find('.operate-btn i').hide();
            $(this).find('.fa-angle-right').show();
        } else {
            $(this).find('.operate-btn i').show();
            $(this).find('.fa-angle-right').hide();
        }
    })
    
    if (!$('.menu .sidebar-menu a').is('.menu-dropdown')) {
        $('.menu .sidebar-menu a').find('.fa-angle-right').remove();
    }
    
    //排序
    $('.menu .sidebar-menu').on('click', '.menu-dropdown .glyphicon-sort, .submenu .glyphicon-sort', function (event) {
    	
    	var menuId = $(this).parent().siblings('.menu-id').val();
    	
    	$.ajax({
    		url : ctx + '/menu/getSiblings',
    		data : {menuId:menuId},
    		dataType : 'json',
    		type : 'post',
    		success : function(data){
    			if(data.status != "success"){
    				toastr.error(data.msg);
    			}else{
    				
    				var options = "";
    				
    				for(var i=0; i<data.list.length; i++){
    					options = options + "<option value='"+data.list[i].menuId+"'>"+data.list[i].fullName+"</option>";
    				}
    				
    				$('#myModal .menu-option').html(options);
    				$('#myModal input[name="menuId"]').val(menuId);
    				
    				$('#myModal').modal('show');
    			}
    		},
    		error : function(){
    			toastr.error("系统错误");
    		}
    	});
    	
        event.stopPropagation();
    })

    //添加操作按钮

    $('.drop-down > .sidebar-menu>li>.menu-dropdown,.drop-down > .sidebar-menu .submenu > li > a,.drop-down > .sidebar-menu .submenu > li > .submenu>li>a').append(button);

    //菜单信息展示
    $('.menu .sidebar-menu .submenu li').on('click', '.menu-dropdown', function () {
    	
    	if($(this).find('.enable').val()==1){
    		$(this).find('.forbiddenBtn').removeClass().addClass('fa fa-check-circle-o forbiddenBtn');
    	}else{
    		$(this).find('.forbiddenBtn').removeClass().addClass('fa forbiddenBtn fa-ban');
    	}

    	if (!$(this).find('ul').is('.submenu')) {
            $(this).find('.operate-btn i').show();
            $(this).siblings().find('.operate-btn i').hide();
        }
        
        var menuText = $(this).find('.menu-text').eq(0).text();
        if (menuText.indexOf('(') != -1) {
            menuText = menuText.substring(0, menuText.indexOf('('));
        }
         
        $('.edit-menu input[name="menuId"]').val($(this).find('.menu-id').val());
        	
        $('.menu-info .menu-icon').html("<i class='fa "+$(this).find('.icon-img').val()+"'></i>" + $(this).find('.icon-img').val());//图标
        $('.menu-info .menu-name').text(menuText);//功能名称
        $('.menu-info .superior-menu').text($(this).find('.parent-name').val());//上级菜单
        $('.menu-info .menu-location').text($(this).find('.navigate-url').val());//页面地址
        $('.menu-info .sortCode').text($(this).find('.sortCode').val());//排序号
        $('.menu-info .target').text($(this).find('.target').val());//按钮类名
        $('.menu-info').find("input[name='enable']").prop('checked',false);
        $('.menu-info').find("input[name='enable'][value='"+$(this).find('.enable').val()+"']").prop('checked',true); //启用禁用
        
        $('.menu-info').removeClass('hidden').show();
        $('.add-menu,.edit-menu').hide();
    })
    
    //一级菜单信息展示
    
    $('.menu .sidebar-menu').children('li').children('.menu-dropdown').on('click', function () {
    	
    	if($(this).find('.enable').val()==1){
    		$(this).find('.forbiddenBtn').removeClass().addClass('fa fa-check-circle-o forbiddenBtn');
    	}else{
    		$(this).find('.forbiddenBtn').removeClass().addClass('fa forbiddenBtn fa-ban');
    	}
    	
        $(this).find('.operate-btn i').show();
        $(this).parent().siblings().find('.menu-dropdown .operate-btn i').hide();
        $(this).parent().siblings().find('.fa-angle-right').show();
        
        $('.edit-menu input[name="menuId"]').val($(this).find('.menu-id').val());
        
        //$('.menu-info .menu-icon').children('i').addClass($(this).find('i.fa').attr('class'));
        $('.menu-info .menu-icon').html("<i class='"+$(this).find('i.fa').attr('class')+"'></i>" + $(this).find('i.fa').attr('class').substr(2));//图标
        $('.menu-info .menu-name').text($(this).find('.menu-text').text());//功能名称
        $('.menu-info .superior-menu').text("无");//上级菜单
        $('.menu-info .menu-location').text($(this).find('.navigate-url').val());//页面地址
        $('.menu-info .sortCode').text($(this).find('.sortCode').val());//排序号
        $('.menu-info .target').text($(this).find('.target').val());//按钮类名
        $('.menu-info').find("input[name='enable']").prop('checked',false);
        $('.menu-info').find("input[name='enable'][value='"+$(this).find('.enable').val()+"']").prop('checked',true); //启用禁用
        $('.add-menu,.edit-menu').hide();
        $('.menu-info').removeClass('hidden').show();
    })

    //添加菜单
    $('.addMenu').on('click', function () {
    	$('.add-menu .superior-menu').val("无");
    	$('.add-menu input[name="parentId"]').val("");
        $('.menu-info,.edit-menu').hide();
        $('.add-menu').removeClass('hidden').show();
    })

    //添加子级菜单
    $('.menu .sidebar-menu').on('click', '.addMenuBtn', function (event) {
    	
        var superiorText = $(this).parent().siblings('.menu-text').text();
        $('.add-menu .superior-menu').val(superiorText);
        
        var superiorId = $(this).parent().siblings('.menu-id').val();
        $('.add-menu input[name="parentId"]').val(superiorId);
        
        $('.menu-info,.edit-menu').hide();
        $('.add-menu').removeClass('hidden').show();
//        event.stopPropagation();
    })

    //编辑菜单
    $('.editMenuBtn').on('click', function () {
        $('.edit-menu .menu-name').val($('.menu-info .menu-name').text());
        $('.edit-menu .superior-menu').val($('.menu-info .superior-menu').text());
        
        $('#menu-icon1').removeClass().addClass("fa " + $('.menu-info .menu-icon').text());
        $('#menu-icon1').text($('.menu-info .menu-icon').text());
        $('.edit-menu input[name="img"]').val($('.menu-info .menu-icon').text());
        
        $('.edit-menu .menu-location').val($('.menu-info .menu-location').text());
        $('.edit-menu .sortCode').val($('.menu-info .sortCode').text());
        $('.edit-menu .target').val($('.menu-info .target').text());//按钮类名
        $('.edit-menu').find("input[name='enable']").prop('checked',false);
        $('.edit-menu').find("input[name='enable'][value='"+$('.menu-info').find("input[name='enable']:checked").val()+"']").prop('checked',true); //启用禁用
        
        $('.menu-info,.add-menu').hide();
        $('.edit-menu').removeClass('hidden').show();
    })

    //禁用操作
    $('.menu .sidebar-menu').on('click', '.forbiddenBtn', function (event) {
    	
    	var $this = $(this);
    	
    	var menuId = $this.parent().siblings('.menu-id').val();
    	
        if ($(this).is('.fa-check-circle-o')) {
        	$.ajax({
        		url : ctx + '/menu/updateRecord',
        		data : {'menuId':menuId, 'enable':0},
        		dataType : 'json',
        		type : 'post',
        		success : function(data){
        			if(data.status != "success"){
        				toastr.error(data.msg);
        			}else{
        				$this.removeClass('fa-check-circle-o').addClass('fa-ban');//禁用
        			}
        		},
        		error : function(){
        			toastr.error("系统错误");
        		}
        	});
        } else {
        	$.ajax({
        		url : ctx + '/menu/updateRecord',
        		data : {'menuId':menuId, 'enable':1},
        		dataType : 'json',
        		type : 'post',
        		success : function(data){
        			if(data.status != "success"){
        				toastr.error(data.msg);
        			}else{
        				$this.removeClass('fa-ban').addClass('fa-check-circle-o');//启用
        			}
        		},
        		error : function(){
        			toastr.error("系统错误");
        		}
        	});
        }
        event.stopPropagation();
    })

    //选择图标
    $(".fa-hover").click(function () {
        var icon = $(this).find("i").attr("class");
        $('#menu-icon').removeClass().addClass(icon).text(icon.substr(2));
        $('#menu-icon1').removeClass().addClass(icon).text(icon.substr(2));
        
        $('input[name="img"]').val(icon.substr(2));
        
        $("#selectIcon").modal('hide');
    })

    //取消操作
    $('.cancel-btn').on('click', function () {
        $('.menu-info').removeClass('hidden').show();
        $('.add-menu,.edit-menu').hide();
    })
})


function addNewRecord(form, callback, confirmMsg){
	
	var $form = $(form);
	
    var formData = $form.data('bootstrapValidator');
    if (formData) {
   	// 修复记忆的组件不验证
   	formData.validate();
		if (!formData.isValid()) {
			return false;
		}
    }
    
    //防止表单重复提交
    $('.cancel-btn').prop('disabled', true);
    $('.confirm-btn').prop('disabled', true);
    
	$.ajax({
		url : ctx + '/menu/addNewRecord',
		data : $('#addForm').serialize(),
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				toastr.error(data.msg);
			    $('.cancel-btn').removeAttr('disabled');
			    $('.confirm-btn').removeAttr('disabled');
			}else{
				loadHtml("/menu/index");
			}
		},
		error : function(){
			toastr.error("系统错误");
			$('.cancel-btn').prop('disabled', false);
		    $('.confirm-btn').prop('disabled', false);
		}
	});
	
	return false;
}

function updateRecord(form, callback, confirmMsg){
	
	var $form = $(form);
	
    var formData = $form.data('bootstrapValidator');
    if (formData) {
   	// 修复记忆的组件不验证
   	formData.validate();
		if (!formData.isValid()) {
			return false;
		}
    }
    
    //防止表单重复提交
    $('.cancel-btn').prop('disabled', true);
    $('.confirm-btn').prop('disabled', true);
    
	$.ajax({
		url : ctx + '/menu/updateRecord',
		data : $('#updateForm').serialize(),
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				toastr.error(data.msg);
				$('.cancel-btn').prop('disabled', false);
			    $('.confirm-btn').prop('disabled', false);
			}else{
				loadHtml("/menu/index");
			}
		},
		error : function(){
			toastr.error("系统错误");
			$('.cancel-btn').prop('disabled', false);
		    $('.confirm-btn').prop('disabled', false);
		}
	});
	
	return false;
}
