//取配置的流程信息——树形展示
function zTreeShow(productId,mainStatus,aplliedforStatus) {
    $.ajax({
        type: "post",
//        url: ctx+"/proSchoolRoom/findDepartMentTree",
        url: ctx + '/examWorkbenchExamFlow/navigateToNew',
        data: {productId:productId,mainStatus:mainStatus,aplliedforStatus:aplliedforStatus},
        dataType: "json",
        success: function (data) {
        	debugger;
            $.fn.zTree.init($("#approvalDuty"), approvalDutySetting, data.data);
        }
    });
}

var approvalDutySetting = {
    check: {
        enable: true,
        chkStyle: "radio",
        radioType: "all"
    },
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey:"childId",
			pIdKey:"parentId",
			rootPId: 0
        },
        key:{
        	name:"fullName"
		}
    },
    callback: {
        onClick: onClickApproveDuty,
        onCheck: onCheckApproveDuty
    }
};

function onClickApproveDuty(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("approvalDuty");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheckApproveDuty(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("approvalDuty"),
        nodes = zTree.getCheckedNodes(true),
        fullName = "";//记录选中项名称
    dutyId = "";//记录选中项id
    aplliedforStatusNew = "";//记录选中项子节点id（即子节点状态值）
    mainStatusNew = "";//记录选中项主节点id（即主节点状态值）
//    for (var i = 0, l = nodes.length; i < l; i++) {
//    	if(nodes[i].parentId=="0") {
//    		//对于父节点，选中无效，只有选中子节点才行
//    	} else {
//    		v = nodes[i].fullName + ",";
//            aplliedforStatusNew = nodes[i].childId;
//            mainStatusNew =  nodes[i].parentId;
//    }
//    if (v.length > 0) {
//        v = v.substring(0, v.length - 1);
//        dutyId = dutyId.substring(0, dutyId.length - 1);
//    }
    fullName = nodes[0].fullName;
    aplliedforStatusNew = nodes[0].childId;
    mainStatusNew =  nodes[0].parentId;
    
    var cityObj = $(approveDutyInput);
    cityObj.attr("value", fullName);//显示名称
    cityObj.siblings('input.mainStatusNew').val(mainStatusNew);//存储主节点id
    cityObj.siblings('input.aplliedforStatusNew').val(aplliedforStatusNew);//存储子节点id
}

var approveDutyInput;
function showApproveDutys(t) {
    approveDutyInput = t;

//一下注释回显用
//    var aprroveDutys = $(t).siblings('input[name="dutys"]').val();
//
//    var aprroveDutysArray = [];
//    if (aprroveDutys)
//        aprroveDutysArray = aprroveDutys.split(',');
//
//    var treeObj = $.fn.zTree.getZTreeObj("approvalDuty");
//    //treeObj.checkAllNodes(false);
//
//    for (var i = 0; i < aprroveDutysArray.length; i++) {
////        var node = treeObj.getNodeByParam("id", aprroveDutysArray[i], null);
//        var node = treeObj.getNodeByParam("childId", aprroveDutysArray[i], null);
//        treeObj.checkNode(node, true, true);
//    }
    var dutyObj = $(t);
    var dutyOffset = $(t).offset();

    $("#content2").slideDown("fast");

    $("body").bind("mousedown", onBodyDown2);
}
function onBodyDown2(event) {
    if (!($(event.target).parents("#content2").length > 0)) {
        hideMenu2();
    }
}

function hideMenu2() {
    $("#content2").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown2);
}
/** 弹出审批职位树 end **/

//寄件信息表单提交
$('#rebackForm').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	//判断前台是否有选择退回状态，没有不让提交
    	var mainStatusNew = $("#mainStatusNew").val();//选中退回主状态id
    	var aplliedforStatusNew = $("#aplliedforStatusNew").val();//选中退回子状态id
    	
    	if(mainStatusNew==null || mainStatusNew=='' || 
    			aplliedforStatusNew==null || aplliedforStatusNew=='') {
    		toastr.error("没有选择退回状态.");
    		return ;
    	}
    	
    	var mainStatus = "";//当前数据所处主状态
    	mainStatus = $("#mainStatus").val();
    	var aplliedforStatus = "";//当前数据所处子状态
    	aplliedforStatus = $("#aplliedforStatus").val();
    	
    	var productId = $("#productId").val();//获取页面选中产品id
    	
    	//获取页面选中info_manage_id
    	var infoManageIds = '';
    	if(mainStatus=='10000') {
    		//费用待支出页面和其它页面的不同，所以需要单独处理
    		toastr.error("费用待支出状态没有退回功能.");
    		return ;
    	} else {
    		infoManageIds = getInfoManageIds();
    	}
    	
        var options = form.serialize();//得到用户填写快递信息
        options += "&mainStatus="+mainStatus+"&aplliedforStatus="+aplliedforStatus
        		+ "&productId="+productId+"&"+infoManageIds;
        
        $.ajax({
            "type": "Post",
            "url": ctx + "/examWorkbenchExpress/reBackStatus",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".reback-dialog").modal("hide");
                ApplyDataTable.init();
                if(data.status=="success") {
                	toastr.success("退回成功");
                } else {
                	toastr.error("退回失败");
                }
            },
            "error": function() {
            	toastr.error("退回操作系统错误");
            }
        });
    }
});

//获取页面选中行的infoManageId
function getInfoManageIds(){  
	var paramArr = new Array();
	$("#alreadyRegistion").find("tbody tr").each(function(i,e){
		var checkObj = $(e).find("td").eq(0).find("input[type='checkbox']");
		var checkFlag = $(checkObj).prop("checked");
		if(checkFlag) {
			//得到该选中咨询量对应的学员名称，后台返回详细验证信息使用
			paramArr.push("infoManageId="+$(checkObj).attr("infomanageid"));
		}
	});
	var paramStr = paramArr.join("&");
	return paramStr;
} 

//显示制定弹框
function openDialog(origin) {
	if(origin=="退回") {
		var infoManageIds = getInfoManageIds();
		if(infoManageIds==null || infoManageIds=='') {
			toastr.error("页面必须要有咨询量被选中");
			return ;
		} 
		var productId = $("#productId").val();//得到页面当前选中产品id
    	var mainStatus = $("#mainStatus").val();//当前数据所处主状态
    	var aplliedforStatus = $("#aplliedforStatus").val();//当前数据所处子状态
		//展示树形结构-退回弹框
		zTreeShow(productId,mainStatus,aplliedforStatus);
		$(".reback-dialog").modal("show");
	} 
}

//快递table信息
var FastTable = function(){
	return{
		init: function(){
			var Table = $('#fastTable').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/examWorkbenchExpress/getFastInfo',
        		"fnServerData": fastInit,//用于替换默认发到服务端的请求操作  
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
        			            {"mData": "expressName", 'sClass': "text-center"},
        			            {"mData": "expressNum", 'sClass': "text-center"},
        		               	{"mData": "expressUser", 'sClass': "text-center"},
        		               	{"mData": "expressData", 'sClass': "text-center"},
        		                {"mData": "expressAccept", 'sClass': "text-center","mRender": function (data, type, full ) {
			                    	if(full['expressAccept']=="1") {
			                    		return "签收";
			                    	} else {
			                    		return "未签收";
			                    	}
    			            	}},
        		                {"mData": "modifyDate", 'sClass': "text-center"}
        		                ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
			$("#fastTable_wrapper").removeClass();
		    $('#fastTable_wrapper').addClass("table-scrollable");

			//横线滚动条
			$('#fastTable_wrapper').on('scroll',function(){
				$('#fastTable_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		    //每页显示记录数
		    $('#fastTable_wrapper .dataTables_info').parent().append($('#fastTable_wrapper .dataTables_length'));
//			//得到table对象，后面得到table选中行时会用到
//			tableObj = Table;
		}
	}
}();

function fastInit(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    
  //页面选中咨询id
	var infoManageId = $("#fastInfoManageId").val();
	//页面选中产品id
	var productId = $("#fastProductId").val();
	aoData.push({"name": "infoManageId", "value": infoManageId});
	aoData.push({"name": "productId", "value": productId});
    
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
};

//页面点击查看快递信息事件
function fastClick(obj) {
	//记录页面选中咨询id和产品id
	$("#fastInfoManageId").val($(obj).data("record"));
	$("#fastProductId").val($(obj).data("record2"));
	
	FastTable.init();
}

//页面点击查看费用支付详情
function feeInfoClick(obj) {
	//记录页面选中咨询id和产品id
	$("#feeOutInfoManageId").val($(obj).data("record"));
	$("#feeOutProductId").val($(obj).data("record2"));
	
	FeeOutTable.init();
}

//表格中点击查看显示费用支付详情
function feeInfoClickShow(obj) {
	$(".feeOut-dialog").modal("show");
	feeInfoClick(obj);
}

//费用支付table信息
var FeeOutTable = function(){
	return{
		init: function(){
			var Table = $('#feeOutTable').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/examWorkbenchExpress/getFeeOutInfo',
        		"fnServerData": feeOutInit,//用于替换默认发到服务端的请求操作  
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
        			            {"mData": "applicantDate", 'sClass': "text-center"},
        			            {"mData": "applyCode", 'sClass': "text-center"},
        		               	{"mData": "applyMoney", 'sClass': "text-center"},
        		               	{"mData": "applyDetailMoney", 'sClass': "text-center"},
        		               	{"mData": "payeeName", 'sClass': "text-center"},
        		                {"mData": "applicantStatus", 'sClass': "text-center","mRender": function (data, type, full ) {
			                    	if(full['applicantStatus']=="1") {
			                    		return "申请结束";
			                    	} else if(full['applicantStatus']=="2") {
			                    		return "申请退回";
			                    	} else if(full['applicantStatus']=="3") {
			                    		return "申请(通过)";
			                    	} else if(full['applicantStatus']=="4") {
			                    		return "申请已支出";
			                    	} else if(full['applicantStatus']=="0") {
			                    		return "审批中";
			                    	} else {
			                    		return "";
			                    	}
    			            	}},
        		                {"mData": "generalMoney", 'sClass': "text-center"}
        		                ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
			$("#feeOutTable_wrapper").removeClass();
		    $('#feeOutTable_wrapper').addClass("table-scrollable");

			//横线滚动条
			$('#feeOutTable_wrapper').on('scroll',function(){
				$('#feeOutTable_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		    //每页显示记录数
		    $('#feeOutTable_wrapper .dataTables_info').parent().append($('#feeOutTable_wrapper .dataTables_length'));
//			//得到table对象，后面得到table选中行时会用到
//			tableObj = Table;
		}
	}
}();

function feeOutInit(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    
  //页面选中咨询id
	var infoManageId = $("#feeOutInfoManageId").val();
	//页面选中产品id
	var productId = $("#feeOutProductId").val();
	aoData.push({"name": "infoManageId", "value": infoManageId});
	aoData.push({"name": "productId", "value": productId});
    
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
};

//退回功能
function rebackStatus(applyId, infoManageId, applyDetailId) {
	//获得将回退状态，主，子状态id
	var childIndex = 0;
	$('#myTab').find("li.mainStatus.active").find("ul li.aplliedforStatus").each(function(i,e){
		if($(e).hasClass("active")) {
			childIndex = i-1;
		}
	});
	
	var aplliedforStatus = $('#myTab').find("li.mainStatus.active").
		find("ul li.aplliedforStatus").eq(childIndex).find("a").attr("id");
//	var mainStatus = $('#myTab').find("li.mainStatus.active").find("a").attr("id");
	
	swal({
        title: "",
        text: "确定回退该条费用申请记录吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: true
    }, function (result) {
        if(result==true) {
        	//开始回退该条费用申请记录
        	$.post(ctx+"/examWorkbenchExpress/rebackStatus",{"applyId":applyId,
        		"infoManageId":infoManageId,
        		"applyDetailId":applyDetailId,
        		"aplliedforStatus":aplliedforStatus
        		},function(data){
        			
        		if(data.status=="success") {
        			 toastr.success('回退成功');
        			 //当前页面去除回退后的记录的显示
        			 $("#applyDetailId").remove();
        			 //更新当前页面费用总金额的显示--待完成
        		} else {
        			 toastr.error('回退失败:'+data.msg);
        		}
        	},"json");
        }
    });
}

//资料查看方法
function showMaterial(obj) {
	var infoManageId = $(obj).data("record");
	var productId = $(obj).data("record2");
	var exam = $(obj).data("record3");
	//资料管理
	//先查询所需上传的资料
	$.post(ctx + '/studentServiceCenter/selectApplyData',{
		infoManageId:infoManageId,
		productId:productId,
		exam:exam
		},
		function(val2){
	    	if(val2.status=='success'){
	    		$("#materialDialogDiv").html("");
	    		$.each(val2.data,function(index,obj){
	    			var str='';
	    			str+='<div class="server-pic col-sm-4">'
						+'<label class="col-sm-6 control-label no-padding-right">'+obj.applyDataName+'</label>'
						+'<div class="col-sm-6">'
						+'<form method="post" enctype="multipart/form-data">'
						+'<div class="img">'
						if(obj.applyUrl!=null){
							str+='	<img src="'+val2.prevUrl+obj.applyUrl+'"'
	    					+'		class="server-head" alt="" style="width:100px;height:100px"> '
	    					+'		<a href="#" onclick=\'lookImg("'+val2.prevUrl+obj.applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a> '
	    					+'		<a href="'+ctx+'/file/downloadFile?url='+val2.prevUrl+obj.applyUrl+'" class="fa fa-download center-iconr"></a>';
						}
	    			str+='		</div>'
	    				+'		<input type="hidden" name="infoManageId" value="'+infoManageId+'">'
	    				+'		<input type="hidden" name="productId" value="'+productId+'">'
	    				+'		<input type="hidden" name="applyDataId" value="'+obj.applyDataId+'">'
	    				+'		<input type="hidden" name="exam" value="'+exam+'">'
						+'		<input type="file" name="aa" style="margin-left:-50px"> <p style="margin-left:-50px">上传资料</p>'
							+'	<input type="button" onclick="uploadBut(this)"  value="上传" style="margin-left:-50px">'
							+'</form>'
						+'</div>'
						+'</div>';
	    			$("#materialDialogDiv").append(str);
	    		})
	    	}else{
	    		toastr.error("加载报考资料出错");
	    	}
	},"json");
}


//文件上传
function uploadBut(obj){
	if($(obj).parent().find("input[type='file']").val()==null
			|| $(obj).parent().find("input[type='file']").val()==''){
		toastr.error("请选择文件");
		return ;
	}
	debugger;
 	$(obj).parent().ajaxSubmit({
 		type : 'post',
 		url :  ctx +"/studentServiceCenter/addApplyData",
 		//data:  //注意只要是写在表单里面的，都不需要加这个属性。在controller中可以根据@RequestParam String str获取到属性值。    
 		contentType : "application/x-www-form-urlencoded; charset=utf-8",
 		success: function(data) {
 			if(data.error==0){
 				toastr.success("上传成功");
 				var str='';
 				str+='<img'
				+' src="'+data.prevUrl+data.url+'"'
				+'	class="server-head" alt=""> '
				+'	<a href="#" onclick=\'lookImg("'+data.prevUrl+obj.applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a> '
 				+'	<a href="'+ctx+'/file/downloadFile?url='+data.prevUrl+obj.applyUrl+'" class="fa fa-download center-iconr"></a>';
 				$(obj).parent().find(".img").html(str);
 			}else{
 				toastr.error(data.message);
 			}
 		},
 		error: function (data)//服务器响应失败处理函数
 		{
 			alert("出错");
 		}  
 	})
}
//预览图片
function lookImg(url){
	$("#imgLook").attr("src",url);
	$(".lookImg").modal("show");
}

//更换合作方弹窗
function openCPWin() {
	debugger;
	//需要获得projectInfoManageId集合——后台更新合作方使用
	var projectInfoManageIds = getTableContent3();
	if(projectInfoManageIds==null ) {
		toastr.error("页面没有咨询量选中值.");
		return ;
	}
	
	//清空残留数据
	$("div.change-partner").find("input.showProduct").val('');
	$("div.change-partner").find("input.showExamTime").val('');
	$("div.change-partner").find("select").html('');
	
	//需要获得产品id，考期id——联合查询合作方
	var productId = $("#productId").val();
	var examTimeId = $("#examTimeId").val();
	//需要获得产品名称，考期名称——回显使用
	var productName = $("#productName").val();
	var examTimeName = $("#examTimeName").val();
	$("div.change-partner").find("input.showProduct").val(productName);
	$("div.change-partner").find("input.showExamTime").val(examTimeName);
	
	var options = "productId="+productId+"&examTimeId="+examTimeId;
			//+"&projectInfoManageId="+projectInfoManageIds;
	
	 $.ajax({
         "type": "Post",
         "url": ctx + "/examWorkbenchExpress/getPartners",
         "dataType": "json",
         "data": options,
         "success": function (data) {
        	 
        	 if(data.status=="success") {
        		 var str = "";
        		 for(var i=0; i<data.data.length; i++) {
        			 str += '<option id="'+data.data[i].partnerId+'">"'+data.data[i].partnerName+'"</option>';
        		 }
        		 $("div.change-partner").find("select").html(str);
        	 }
         },
         "error": function() {
         	toastr.error("系统错误");
         }
     });
	
	//展示弹窗
	$(".change-partner").modal("show");
}
//得到projectInfoManageId
function getTableContent3(){  
	var paramArr = new Array();
	$("#alreadyRegistion").find("tbody tr").each(function(i,e){
		var checkObj = $(e).find("td").eq(0).find("input[type='checkbox']");
		var checkFlag = $(checkObj).prop("checked");
		if(checkFlag) {
//			alert($(checkObj).attr("infomanageid")+"========"+$(checkObj).attr("productid"));
			paramArr.push("projectInfoManageId="+$(checkObj).attr("projectInfoManageId"));
		}
	});
	var paramStr = paramArr.join("&");
	return paramStr;
}  

//提交合作方更改信息
$('#changePartnerForm').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var projectInfoManageIds = getTableContent3();
    	
        var options = form.serialize();//得到用户填写快递信息
        options += "&projectInfoManageId="+projectInfoManageIds;
        
        $.ajax({
            "type": "Post",
            "url": ctx + "/examWorkbenchExpress/updatePartners",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                if(data.status=="success") {
                	toastr.success("合作方更改成功");
                } else {
                	toastr.error("合作方更改失败");
                }
                $(".change-partner").modal("hide");
            },
            "error": function() {
            	toastr.error("系统错误");
            }
        });
    }
});
