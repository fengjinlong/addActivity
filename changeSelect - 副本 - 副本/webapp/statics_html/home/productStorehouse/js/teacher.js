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
//				var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
//				var nodes = treeObj.getNodes();
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
	//清除残留信息
	$('#subjectAdd').bootstrapValidator('resetForm');
	$('#subjectAdd .teacherName').val('');
	$('#subjectAdd .departmentName').val('');
	//清空部门信息
	$("#addDepartmentId").val("");
	
//	$.ajax({
//        "type": "Post",
//        "url": ctx + "/proSchoolRoom/findDepartMent",
//        "dataType": "json",
//        "success": function (data) {
//        	var str = '<option value="">--请选择--</option>';
//        	for(var i=0; i<data.length; i++) {
//        		str += '<option value="'+data[i].departmentId+'">'+data[i].shortName+'</option>';
//        		
//        	}
//        	$("#addDepartment").append(str);
//        	//下面三行用到了select2.js插件(单选下拉框搜索功能)
//    	    $("select[name='departmentId']").trigger('chosen:updated');
//    	    $("select[name='departmentId']").chosen({no_results_text: "没有匹配项", search_contains: true});
//    	    $('.chosen-container').width('100%');
//        }
//    });
	
//	$.ajax({
//        "type": "Post",
//        "url": ctx + "/proSchoolRoom/findDepartMentTree",
//        "dataType": "json",
//        "success": function (data) {
//        	$.fn.zTree.init($("#ztreeList"),setting,data);
//        }
//    });
})
$('#subjectAdd').bootstrapValidator({
	fields: {  
		teacherName: {  
	      validators: {  
	          notEmpty: {  
	          message: '教师名称不能为空'  
	          }  
	      }  
	      }
	  },
    submitHandler: function (validator, form, submitButton) {
    	//$("#addDepartmentName").val($("#addDepartment").find(":selected").text());
        var options = form.serialize();
        
        var departmentId = $("#addDepartmentId").val();
        if(departmentId==null || departmentId=='') {
        	toastr.error("所属部门是必填项");
        	debugger;
        	$('#subjectAdd').find("button[type='submit']").prop("disabled",false);
        	return;
        } 
        $.ajax({
            "type": "Post",
            "url": ctx + "/proTeacher/addTeacher",
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
                "sAjaxSource": ctx + '/proTeacher/load',
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
                    {"mData": "teacherName", 'sClass': "text-center"},
                    {"mData": "departmentName", 'sClass': "text-center"},
                    {
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a onclick="edit(\'' + full["teacherId"]
                                + '\',\'' + inCode(full["teacherName"])
                            	+ '\',\'' + full["departmentId"]
                            	+ '\',\'' + full["departmentName"]
                        	    + '\')" class="edit" data-target=".subjectEdit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a onclick="deleteProject(\'' + full["teacherId"] + '\')" class="delete"> <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
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
    
    aoData.push({"name": "searchVal", "value": searchVal});


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
function edit(teacherId,teacherName,departmentId,departmentName) {
	//清除表单验证信息
	$('#subjectEdit').bootstrapValidator('resetForm');
	
	 $('#editTeacherId').val(teacherId);
	 $('#subjectEdit .teacherName').val(outCode(teacherName));
	 $('#subjectEdit .departmentId').val(departmentId);
	 $('#subjectEdit .departmentName').val(departmentName);
//	 $("#editDepartment").html("<option value=''>--请选择--</option>");
//	 debugger;
//	 $.ajax({
//	        "type": "Post",
//	        "url": ctx + "/proSchoolRoom/findDepartMent",
//	        "dataType": "json",
//	        "success": function (data) {
//	        	for(var i=0; i<data.length; i++) {
//	        		if(data[i].departmentId==departmentId) {
//	        			var str = '<option value="'+data[i].departmentId+'" selected>'+data[i].shortName+'</option>';
//	        		} else {
//	        			var str = '<option value="'+data[i].departmentId+'">'+data[i].shortName+'</option>';
//	        		}
//	        		$("#editDepartment").append(str);
//	        	}
//	        }
//	    });
}
//编辑修改
$('#subjectEdit').bootstrapValidator({
	fields: {  
		teacherName: {  
	      validators: {  
	          notEmpty: {  
	          message: '教师名称不能为空'  
	          }  
	      }  
	      }
	  },
    submitHandler: function (validator, form, submitButton) {
    	 var teacherId = $('#editTeacherId').val();
    	 var teacherName = $('#subjectEdit .teacherName').val();
    	 var departmentId = $('#subjectEdit .departmentId').val();
    	 var departmentName = $('#subjectEdit .departmentName').val();
    	 $("#editDepartment").html("");
    	 
        $.ajax({
            "type": "Post",
            "url": ctx + "/proTeacher/updateTeacher",
            "dataType": "json",
            "data": {"teacherId":teacherId,	"teacherName":teacherName,"departmentId":departmentId,
            	"departmentName":departmentName
            },
            "success": function (data) {
                $(".subjectEdit").modal("hide");
                DataTable.init();
                toastr.success("修改成功");
                //$('#subjectEdit .editBtn').removeAttr('disabled');
            }
        });

    }
});
//删除
function deleteProject(teacherId) {
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
            "url": ctx + "/proTeacher/deleteTeacher",
            "dataType": "json",
            "data": {"teacherId": teacherId},
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






