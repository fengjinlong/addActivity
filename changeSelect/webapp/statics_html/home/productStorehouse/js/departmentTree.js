//zTree样式设置-覆盖common.js中的配置
var zTree;
function showMenu(val) {
	$('#ajaxTree').html("");
	
	var cityObj = $("#"+val);
	var cityOffset = $("#"+val).offset();
	var positionTop = cityOffset.top-($('.navbar-inner').height()+$('.page-breadcrumbs').height()+$('.page-header').height())+cityObj.height()+14;
	$("#content").css({'left':cityOffset.left, 'top':positionTop + "px"}).slideDown("fast");
	$("body *:not(.menuContent)").bind("mousedown", onBodyDown);
	$('#ajaxTree').width(cityObj.width()+14);
	
	//复选框选中部分代码
	var deptIds = $("#"+val).parents("form").find("input.departmentId").val();
	$.ajax({
	        type:"post",
	        url:ctx+"/proSchoolRoom/findDepartMentTree",
			dataType : "json",
			success : function(date) {
				zTree = $.fn.zTree.init($("#ajaxTree"),setting, date);
//				var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
				//获得所有节点
				var nodes = zTree.getNodes();
				if(deptIds!=null && deptIds!='') {
					var deptIdArr = deptIds.split(",");
					//如果部门Id字符串不为空，就回显部门信息
					if (nodes.length>0) {
					    for(var i=0;i<nodes.length;i++){
					    	//如果保存的id包含节点id，就选中该节点复选框
					    	for(var index in deptIdArr) {
					    		if(deptIdArr[index]==nodes[i].id) {
					    			//选中该节点
					    			zTree.checkNode(nodes[i], !nodes[i].checked, true); 
					    		}
					    	}
					    }
					}
				}
//				if (nodes.length>0) {
//				    for(var i=0;i<nodes.length;i++){
//				    treeObj.expandNode(nodes[i], true, false, false);
//				    }
//				}
			}
		});
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
	 check:{//表示tree的节点在点击时的相关设置
	        enable:true,//是否显示radio/checkbox
	        chkStyle:"checkbox",//值为checkbox或者radio表示
	        //checkboxType:{p:"",s:""},//表示父子节点的联动效果
	        chkboxType:  { "Y": "", "N": "" },
	        radioType:"level"//设置tree的分组
	    },
	callback: {
		onClick: function (e, treeId, treeNode, clickFlag) { 
			zTree.checkNode(treeNode, !treeNode.checked, true); 
			onCheck();
		} ,
		onCheck: onCheck
	}
};
//遍历选中的节点，将id和name值赋值给隐藏域
//function onCheck() {
//	
////	var id = treeNode.id;
////	var name = treeNode.name;
//	var paramArr = new Array();
//	//获得选中的节点
//	
//	$(".departmentId").val(id);
//	$(".departmentName").val(name);
//	
//	$("#content").fadeOut("fast");
//	
//	return false;
//}

function onCheck() {
	 refreshLayers();  
     clearCheckedOldNodes();  
}

//刷新图层的显示情况  
var layers;  
function refreshLayers() {  
    //var zTree = $.fn.zTree.getZTreeObj("treeWaterLayer");  
	var checkedNameArr = new Array();
	var checkedIdArr = new Array();
//    var changedNodes = zTree.getChangeCheckedNodes();  
    var changedNodes = zTree.getCheckedNodes(true);
    for ( var i=0 ; i < changedNodes.length ; i++ ){  
        var treeNode = changedNodes[i];  
//        layers = map.getLayersByName(treeNode.name);  
//        if(layers!=null && layers[0]!=null){  
//            layers[0].setVisibility(treeNode.checked);  
//        }  
        if(treeNode.checked) {
        	checkedNameArr.push(treeNode.name);
        	checkedIdArr.push(treeNode.id);
        }       
        //console.log((treeNode?treeNode.name:"root") + "checked " +(treeNode.checked?"true":"false"));                 
    }
    var checkedNames = checkedNameArr.join(",");
    var checkedIds = checkedIdArr.join(",");
	$(".departmentId").val(checkedIds);
	$(".departmentName").val(checkedNames);
}  
//清理善后工作  
function clearCheckedOldNodes() {  
    //var zTree = $.fn.zTree.getZTreeObj("treeWaterLayer"),  
    nodes = zTree.getChangeCheckedNodes();  
    for (var i=0, l=nodes.length; i<l; i++) {  
        nodes[i].checkedOld = nodes[i].checked;  
    }  
};      
//冻结根节点
function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}


