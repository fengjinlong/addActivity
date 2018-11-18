//添加环节
var setting = {
	view: {
		dblClickExpand: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: onClick
	}
};
var cityObj;
var zNodes =[
	{id:1, pId:0, name:"考生注册", open:true},
	{id:11, pId:1, name:"填报信息", open:true},
	{id:111, pId:11, name:"资格审查", open:true},
	{id:1111, pId:111, name:"网上缴费", open:true},
	{id:11111, pId:1111, name:"打印报名表"}
];
function onClick(e, treeId, treeNode) {
	var name = treeNode.name;
	var id = treeNode.id;
	cityObj.val(name);
	$("[name = 'parentId']").val(id);
	hideMenu();
	return false;
}

function showMenu(that) {
	cityObj = $(that);
	var cityOffset = $(that).offset();
	$("#zTree").css({
		width:$(that).innerWidth(),
		marginTop:-1
	});
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}
$(document).ready(function(){
	$.fn.zTree.init($("#zTree"), setting, zNodes);
});





var setting2 = {
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

var data_left = [
	{name: "模块", pId: 0, id: 1,open:true},
	{name: "模块一", pId: 1, id: 2},
	{name: "模块二", pId: 1, id: 3},
	{name: "模块三", pId: 1, id: 4},
	{name: "环节", pId: 0, id: 5,open:true},
	{name: "环节一", pId: 5, id: 6},
	{name: "环节二", pId: 5, id: 7},
	{name: "环节三", pId: 5, id: 8},
	{name: "功能", pId: 0, id: 9,open:true},
	{name: "功能一", pId: 9, id: 10},
	{name: "功能二", pId: 9, id: 11},
	{name: "功能三", pId: 9, id: 12}
];
var data_right =[];

/**
 * 加载用户现有按钮权限
 */
$.fn.zTree.init($("#tree1"), setting2, data_left);
$.fn.zTree.init($("#tree2"), setting2,data_right);