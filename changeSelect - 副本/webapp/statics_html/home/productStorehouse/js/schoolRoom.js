//zTree样式设置-覆盖common.js中的配置
function showMenu(val) {
	$('#ajaxTree').html("");
	
	var cityObj = $("#"+val);
	var cityOffset = $("#"+val).offset();
	var positionTop = cityOffset.top-($('.navbar-inner').height()+$('.page-breadcrumbs').height()+$('.page-header').height())+cityObj.height()+14;
	$("#content").css({'left':cityOffset.left, 'top':positionTop + "px"}).slideDown("fast");
	$("body *:not(.menuContent)").bind("mousedown", onBodyDown);
	$('#ajaxTree').width(cityObj.width()+14);
	
	$.ajax({
	        type:"post",
	        url:ctx+"/proSchoolRoom/findDepartMentTree",
			dataType : "json",
			success : function(date) {
				$.fn.zTree.init($("#ajaxTree"),setting, date);
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
			pIdKey:"pId",
			nameKey:"name"
		}
	},
	callback: {
		onClick: onClick
	}
};

function onClick(e, treeId, treeNode) {
	
	var id = treeNode.id;
	var name = treeNode.name;
	
	$(".departmentId").val(id);
	$(".departmentName").val(name);
	
	$("#content").fadeOut("fast");
	
	return false;
}
//冻结根节点
function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}


//新增
$('.addBtn').click(function(){
	$('#subjectAdd').modal('show');
	$('#subjectAdd').on('shown', function() {
	    $(document).off('focusin.modal');
	    KindEditor.create('textarea[name="schoolRoomMemo"]', {
	        resizeType : 1
	    });
	});
	
	$('#subjectAdd').bootstrapValidator('resetForm');
	//清空所属
	$("#addDepartmentName").val(null);
	$('#subjectAdd .schoolRoomMax').val('');
	$('#subjectAdd .schoolRoomType').val(1);
	$('#subjectAdd .schoolRoomName').val('');
	$('#subjectAdd .schoolRoomAddress').val('');
	$('#subjectAdd .schoolRoomMemo').text('');
	addEditor.html('');
	addEditor.sync();
	$("#addDepartment").html("");
//	$.ajax({
//        "type": "Post",
//        "url": ctx + "/proSchoolRoom/findDepartMent",
//        "dataType": "json",
//        "success": function (data) {
//        	$("#addDepartment").append('<option value="">--请选择--</option>');
//        	for(var i=0; i<data.length; i++) {
//        		var str = '<option value="'+data[i].departmentId+'">'+data[i].shortName+'</option>';
//        		$("#addDepartment").append(str);
//        		//下面三行用到了select2.js插件(单选下拉框搜索功能)
//        	    $("#subjectAdd").find("select[name='departmentId']").trigger('chosen:updated');
//        	    $("#subjectAdd").find("select[name='departmentId']").chosen({no_results_text: "没有匹配项", search_contains: true});
//        	    $('.chosen-container').width('100%');
//        	}
//        }
//    });
	$.ajax({
        type:"post",
        url:ctx+"/proSchoolRoom/findDepartMentTree",
		dataType : "json",
		success : function(date) {
			$.fn.zTree.init($("#ajaxTree"),setting, date);
//			var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
//			var nodes = treeObj.getNodes();
//			if (nodes.length>0) {
//			    for(var i=0;i<nodes.length;i++){
//			    treeObj.expandNode(nodes[i], true, false, false);
//			    }
//			}
		}
	});
})
$('#subjectAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	addEditor.sync();
        var options = form.serialize();
        
        $.ajax({
            "type": "Post",
            "url": ctx + "/proSchoolRoom/addSchoolRoom",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".subjectAdd").modal("hide");
                DataTable.init();
                if(data.status=="success") {
                	toastr.success("新增成功");
                } else {
                	toastr.error("新增失败");
                }
                
            }
        });
    }
});


function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 2;
    }
    $.ajax({
        url: ctx + '/productModelController/updateRecord',
        type: 'POST',
        data: {
        	productModelId: val,
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

//加载表单
var DataTable = function () {
    return {
        init: function () {
            var dutyTable = $('#moneyKind').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/proSchoolRoom/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表总共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {"mData": "departmentName", 'sClass': "text-center"},
                    {"mData": "schoolRoomName", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center","mRender": function (data, type, full) {
                    		if(full["enable"]=="1") {
                    			return '<span style="width: inherit" class="btn btn-xs btn-use" onclick="changeStatus(this,\''+full["schoolRoomId"]+'\')"><i class="fa fa-check-circle-o"></i> 启用</span>';
                    		} else {
                    			return '<span style="width: inherit" class="btn btn-xs btn-nouse" onclick="changeStatus(this,\''+full["schoolRoomId"]+'\')"><i class="fa fa-ban"></i> 禁用</span>';
                    		}
                    	}
                    },
                    {"mData": "schoolRoomAddress", 'sClass': "text-center"},
                    {
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["schoolRoomId"]
                                + '\',\'' + full["departmentId"]
                                + '\',\'' + full["schoolRoomMax"]
	                            + '\',\'' + full["schoolRoomType"]
	                            + '\',\'' + inCode(full["schoolRoomName"])
	                            + '\',\'' + inCode(full["schoolRoomAddress"])
                            	+ '\',\'' + full["enable"]
                        	    + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["schoolRoomId"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u+"|"+d ;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {}
            });

            //每页显示记录数
            $('#moneyKind_wrapper .dataTables_info').parent().append($('#moneyKind_wrapper .dataTables_length'));
        }
    }
}();

//数据初始化
$("#moneyKind tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#moneyKind tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();
//鼠标点击搜索事件
$(".search-btn").click(function () {
	DataTable.init();
})

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    
    aoData.push({"name": "schoolRoomName", "value": searchVal});


    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
//编辑取值
function edit(schoolRoomId,departmentId,schoolRoomMax,schoolRoomType,
		schoolRoomName,schoolRoomAddress,/*schoolRoomMemo,*/enable) {
	 $('#subjectEdit').find("button[type='submit']").prop("disabled",false);
	 
	 $('#editSchoolRoomId').val(schoolRoomId);
	 $('#subjectEdit .schoolRoomMax').val(schoolRoomMax);
	 $('#subjectEdit .schoolRoomType option[value="'+schoolRoomType+'"]').prop("selected",true);
	 $('#subjectEdit .schoolRoomName').val(outCode(schoolRoomName));
	 $('#subjectEdit .schoolRoomAddress').val(outCode(schoolRoomAddress));
	 
	 //回显备注
	 $.ajax({
	        "type": "Post",
	        "url": ctx + "/proSchoolRoom/getSchoolRoomInfo",
	        "dataType": "json",
	        "data":{schoolRoomId:schoolRoomId},
	        "success": function (data) {
	        	if(data.data.schoolRoomMemo!=null) {
	        		 editEditor.html(data.data.schoolRoomMemo);
	        	} else {
	        		 editEditor.html('');
	        	}
	        	editEditor.sync();
	        }
	 });
//	 if(schoolRoomMemo==null || schoolRoomMemo=='' || typeof(schoolRoomMemo)=='undefined' || schoolRoomMemo=="undefined") {
//		 editEditor.html('');
//	 } else {
//		 editEditor.html(schoolRoomMemo);
//	 }
//	 editEditor.sync();
	 
	 $("#editDepartment").html("");
	 //回显状态
	 $('#subjectEdit .enable').val(enable);
//	  
	 $.ajax({
	        "type": "Post",
	        "url": ctx + "/proSchoolRoom/findDepartMent",
	        "dataType": "json",
	        "success": function (data) {
	        	$("#editDepartment").append('<option value="">--请选择--</option>');
	        	for(var i=0; i<data.length; i++) {
	        		if(data[i].departmentId==departmentId) {
	        			var str = '<option value="'+data[i].departmentId+'" selected>'+data[i].shortName+'</option>';
	        		} else {
	        			var str = '<option value="'+data[i].departmentId+'">'+data[i].shortName+'</option>';
	        		}
	        		$("#editDepartment").append(str);
	        	}
	        	$("#subjectEdit").find("select[name='departmentId']").trigger('chosen:updated');
        	    $("#subjectEdit").find("select[name='departmentId']").chosen({no_results_text: "没有匹配项", search_contains: true});
        	    $('.chosen-container').width('100%');
	        }
	    });
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var departmentId = $("#editDepartment").val();
    	if(departmentId==null || departmentId=='') {
    		toastr.error("所属部门不能为空");
    		$('#subjectEdit').find("button[type='submit']").removeAttr('disabled');
    		return ;
    	}
//    	 var schoolRoomId = $('#editSchoolRoomId').val();
//    	 var schoolRoomMax = $('#subjectEdit .schoolRoomMax').val();
//    	 var schoolRoomType = $('#subjectEdit .schoolRoomType').val();
//    	 var schoolRoomName = $('#subjectEdit .schoolRoomName').val();
//    	 var schoolRoomAddress = $('#subjectEdit .schoolRoomAddress').val();
    	 editEditor.sync();
    	 var options = form.serialize();
//    	 var schoolRoomMemo = editEditor.html();
//    	 $("#editDepartment").html("");
//    	 //状态
//    	 var enable = $('#subjectEdit .enable').val();
//    	 console.log($('#subjectEdit .enable').val());
        $.ajax({
            "type": "Post",
            "url": ctx + "/proSchoolRoom/updateSchoolRoom",
            "dataType": "json",
           /* "data": {"schoolRoomId":schoolRoomId,"schoolRoomMax":schoolRoomMax,"schoolRoomType":schoolRoomType,
            	"schoolRoomName":schoolRoomName,"schoolRoomAddress":schoolRoomAddress,
            	"schoolRoomMemo":schoolRoomMemo,"enable":enable},*/
            "data": options,
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                toastr.success("修改成功");
                $('#subjectEdit .editBtn').removeAttr('disabled');
            }
        });

    }
});
//删除
function deleteProject(schoolRoomId) {
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
            "type": "Post",
            "url": ctx + "/proSchoolRoom/deleteSchoolRoom",
            "dataType": "json",
            "data": {"schoolRoomId": schoolRoomId},
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                swal("", "删除成功！", "success");
            }
        });
    });
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

//教室容量验证
$('.schoolRoomMax').keyup(function(){
	var reg = /^\+?[1-9]\d*$/;
	if($(this).val() == ""){
		$('.srmReg').text('教室容量不能为空');
	}
	else if(!reg.test($(this).val())){
        $('.srmReg').text('请输入正确内容');
	}else{
        $('.srmReg').text('');
    }
})

//单击改变数据状态
function changeStatus(obj,schoolRoomId) {
	var enable = 0;//记录要传递给后台修改的状态值,1-有效 0-无效
	//判断当前按钮所处状态
	if($(obj).hasClass("btn-use")) {
		//使该数据失效
		$(obj).removeClass("btn-use");
		$(obj).addClass("btn-nouse");
		$(obj).html('<i class="fa fa-ban"></i> 禁用');
	} else {
		//使该数据生效
		$(obj).removeClass("btn-nouse");
		$(obj).addClass("btn-use");
		$(obj).html('<i class="fa fa-check-circle-o"></i> 启用');
		enable = 1;
	}
	
	$.ajax({
        type:"post",
        url:ctx+"/proSchoolRoom/updateStatus",
        data: {enable:enable,schoolRoomId:schoolRoomId},
		dataType : "json",
		success : function(date) {
		}
	});
}



$('.subjectAdd').on('hidden.bs.modal', function() {
	$('.modal-backdrop').remove();
});



