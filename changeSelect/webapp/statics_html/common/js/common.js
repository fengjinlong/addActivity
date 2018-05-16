//设置定时任务访问后台，保持连接，防止session失效
function keepLink() {
	$.ajax({
		type: "POST",
	    url: ctx + '/consultInfoManage/keepLink',
	    dataType: 'json',
	    success: function (data) {
	    	
	    }
	});
}
//每2分钟执行一次
setInterval(keepLink,2*60*1000);


/**
 * 压缩base
 * @param input
 * @returns
 */
function inCode(input){
    var rv;
    rv = encodeURIComponent(input);
    rv = unescape(rv);
    rv = window.btoa(rv);
    return rv;
}

/**
 * 解压缩
 * @param input
 * @returns
 */
function outCode(input){
    rv = window.atob(input);
    rv = escape(rv);
    rv = decodeURIComponent(rv);
    return rv;
}


function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
    return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
    return str.replace(/(\s*$)/g,"");
}
function loadHtml(val,o){
    location.href=ctx + val;
}
/*公司-部门-职务-角色联动 begin*/
function showMenu(val, type) {
	$('#ajaxTree').html("");
	
	var cityObj = $("#"+val);
	var cityOffset = $("#"+val).offset();
	var positionTop = cityOffset.top-($('.navbar-inner').height()+$('.page-breadcrumbs').height()+$('.page-header').height())+cityObj.height()+14;
	$("#content").css({'left':cityOffset.left, 'top':positionTop + "px"}).slideDown("fast");
	$("body *:not(.menuContent)").bind("mousedown", onBodyDown);
	$('#ajaxTree').width(cityObj.width()+14);
	
	var pId;
	
	if(type == 1){
		type=5;
		pId = 1;
		if($('#departmentId').length > 0){
			$('#departmentId').val('');
			$('#department_id').val('');
			
			if($('#dutyId').length > 0){
				$('#dutyId').val('');
				$('#duty_id').val('');
				
				if($('#roleId').length > 0){
					$('#roleId').val('');
					$('#role_id').val('');
				}
			}
		}
	}else if(type ==2){
		pId = $('#companyId').val();
		
		if($('#dutyId').length > 0){
			$('#dutyId').val('');
			$('#duty_id').val('');
			
			if($('#roleId').length > 0){
				$('#roleId').val('');
				$('#role_id').val('');
			}
		}
	}else if(type == 3){
		pId = '';
		
		if($('#roleId').length > 0){
			$('#roleId').val('');
			$('#role_id').val('');
		}
	}else if(type == 4){
//		pId = $('#dutyId').val();
	}
	if(type<3){
		if(pId){
			$.ajax({
		        type:"post",
		        url:ctx+"/user/ajaxLoadTree",
		        data:{
		        	type:type,
		        	pId:pId
		        },
				dataType : "json",
				success : function(date) {
					$.fn.zTree.init($("#ajaxTree"),setting, date);
					var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
					var nodes = treeObj.getNodes();
					if (nodes.length>0) {
					    for(var i=0;i<nodes.length;i++){
					    treeObj.expandNode(nodes[i], true, false, false);
					    }
					}
				}
			});
		}
	}else{
		$.ajax({
	        type:"post",
	        url:ctx+"/user/ajaxLoadTree",
	        data:{
	        	type:type,
	        	pId:pId
	        },
			dataType : "json",
			success : function(date) {
				$.fn.zTree.init($("#ajaxTree"),setting, date);
				var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
				var nodes = treeObj.getNodes();
				if (nodes.length>0) {
				    for(var i=0;i<nodes.length;i++){
				    treeObj.expandNode(nodes[i], true, false, false);
				    }
				}
			}
		});
	}
}

function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "content" || $(event.target).parents("#content").length>0)) {
		$("#content").fadeOut("fast");
	}
}

var setting = {
	view:{
		showIcon:true,
		showLine:true,
		expandSpeed:"normal",
	    dblClickExpand: dblClickExpand
	},
	data: {
		simpleData: {
			enable: true,
			idKey:"id",
			pIdKey:"pId"
		}
	},
	callback: {
		onClick: onClick
	}
};

function onClick(e, treeId, treeNode) {
	
	var id = treeNode.id;
	var name = treeNode.name;
	
	if(treeNode.type == 1){
		$('#companyId').val(id);
		$('#company_id').val(name);
	}else if(treeNode.type ==2){
		$('#departmentId').val(id);
		$('#department_id').val(name);
	}else if(treeNode.type == 3){
		$('#dutyId').val(id);
		$('#duty_id').val(name);
	}else if(treeNode.type == 4){
		$('#roleId').val(id);
		$('#role_id').val(name);
	}
	
	$("#content").fadeOut("fast");
	
	return false;
}
//冻结根节点
function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}




