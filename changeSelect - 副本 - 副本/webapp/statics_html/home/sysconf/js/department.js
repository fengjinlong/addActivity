(function () {
	$('.departmentAdd').on('hidden.bs.modal', function () {
		$('#departmentAdd')[0].reset();
		$('#departmentAdd input:hidden').val('');
		$('#departmentAdd .selectpicker').selectpicker('refresh');
//		$('#matchAdd .sysUser').remove();
		$('#departmentAdd').data('bootstrapValidator').resetForm();
	})
    //配置数据
	var setting = {
		        view: {
		            addHoverDom: addHoverDom, //当鼠标移动到节点上时，显示用户自定义控件
		            removeHoverDom: removeHoverDom//离开节点时的操作
		        },
		        check: {
		            enable: false,
		        },
		        data: {
		        	key:{
						name:"fullName"
					},
		            simpleData: {
		                enable: true,
						idKey:"departmentId",
						pIdKey:"parentId"
		            }
		        },
		        edit: {
		            enable: false,
		            showRemoveBtn: false
		        },
		        treeNode: {
		            checked: false
		        },

		        callback: {
		            onClick: zTreeOnClick, //单击事件
		            beforeEditName: editDom//编辑
		        }
		    };

    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_" + treeNode.tId).unbind().remove();
        $("#editBtn_" + treeNode.tId).unbind().remove();
    };

    //点击部门显示对应信息
    function zTreeOnClick(event, treeId, treeNode) {
        $('.departmentInfo').addClass('animated bounceInRight').show();
        $('.departmentAdd,.departmentEdit').hide();
        $('.departmentInfo .departmentName').val(treeNode.name);
        var departmentId = treeNode.departmentId;
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {departmentId : departmentId},
            dataType: 'json',
            success: function (data) {
            	$('.departmentInfo input[name="code"]').val(data.list[0].code);
            	$('.departmentInfo input[name="fullName"]').val(data.list[0].fullName);
            	$('.departmentInfo input[name="shortName"]').val(data.list[0].shortName);
            	if(data.list[0].parentId==0){
            		$('.departmentInfo input[name="parentName"]').val('无');
            	}else{
            		var parentId = data.list[0].parentId;
            		$.ajax({
            			url: ctx + '/department/getAllOption',
                        type: 'POST',
                        data: {departmentId : parentId},
                        dataType: 'json',
                        success: function (data) {
                        	var fullName = data.list[0].fullName;
                        	$('.departmentInfo input[name="parentName"]').val(fullName);
                        },
                        error: function (response) {
                        	toastr.error("系统错误");
                        }
            		});
            	}
            	if(data.list[0].type==1){
            		$('.departmentInfo input[name="type"]').val('公司');
            	}else if(data.list[0].type==2){
            		$('.departmentInfo input[name="type"]').val('部门');
            	}else{
            		$('.departmentInfo input[name="type"]').val('分校');
            	}
            	if(data.list[0].enable==1){
            		$('.departmentInfo input[name="enable"]').val('有效');
            	}else{
            		$('.departmentInfo input[name="enable"]').val('无效');
            	}
            	$('.departmentInfo textarea[name="description"]').val(data.list[0].description);
            },
            error: function (response) {
            	toastr.error("系统错误");
            }
        });
    }


    //编辑部门信息
    function editDom(treeId, treeNode) {
        $('.departmentEdit').addClass('animated bounceInRight').show();
        $('.departmentAdd,.departmentInfo').hide(); 
        $('.departmentEdit input[name="departmentId"]').val(treeNode.departmentId);
        $('.departmentEdit input[name="code"]').val(treeNode.code);
        $('.departmentEdit input[name="fullName"]').val(treeNode.fullName);
        $('.departmentEdit input[name="shortName"]').val(treeNode.shortName);
        $('.departmentEdit select[name="type"]').val(treeNode.type);
        $('.departmentEdit textarea[name="description"]').val(treeNode.description);
        
        var departmentId = treeNode.departmentId;
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {departmentId : departmentId},
            dataType: 'json',
            success: function (data) {
            	if(data.list[0].parentId==0){
            		$('.departmentEdit input[name="parentName"]').val('无');
            	}else{
            		var parentId = data.list[0].parentId;
            		$.ajax({
            			url: ctx + '/department/getAllOption',
                        type: 'POST',
                        data: {departmentId : parentId},
                        dataType: 'json',
                        success: function (data) {
                        	var fullName = data.list[0].fullName;
                        	$('.departmentEdit input[name="parentName"]').val(fullName);
                        },
                        error: function (response) {
                        	toastr.error("系统错误");
                        }
            		});
            	}
            },
            error: function (response) {
            	toastr.error("系统错误");
            }
            })
       
        return false;
    }

    $.ajax({
		 url: ctx + '/department/getAllOption',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $.fn.zTree.init($("#departmentTree"), setting, data.list);
        },
        error: function (response) {
        	toastr.error("系统错误");
        }
	});


    //添加顶级部门
    $('.addBtn').on('click',function () {
        $('.departmentAdd').addClass('animated bounceInRight').show();
        $('.departmentInfo,.departmentEdit').hide();
        $('.departmentAdd input[name="parentName"]').val("无");
        $('.departmentAdd input[name="parentId"]').val("0");
        $('.departmentAdd input[name="companyId"]').val("0");
    	$('.departmentAdd input[name="fullPath"]').val("0");
    });
    

})();
$('#addDepartment').bootstrapValidator({
	fields: {
		code:{
        	validators: {
        		 notEmpty: {
                     message: '编号不能为空！'
                 },
        	}
        },
        fullName:{
        	validators: {
        		 notEmpty: {
                     message: '全称不能为空！'
                 },
        	}
        },
	},
	submitHandler: function (validator, form, submitButton) {
		var params = $('#addDepartment').serialize();
        $.ajax({
            url: ctx + '/department/addDepartement',
            type: 'POST',
            data: params,
            dataType: 'json',
            success: function (data) {
                if (data.status == "success"){
                    loadHtml('/department/index');
                }
                else
                	toastr.error(data.msg);
            },
            error: function (response) {
            	toastr.error("系统错误");
            }
        });
        return false;
	}
});
// 编辑部门
$('#editDepartmentEdit').bootstrapValidator({
	submitHandler: function (validator, form, submitButton) {
		var params = $('#editDepartmentEdit').serialize();
		$.ajax({
            url: ctx + '/department/updateByIdDepartement',
            type: 'POST',
            data: params,
            dataType: 'json',
            success: function (data) {
                if (data.status == "success"){
                    loadHtml('/department/index');
                }
                else
                	toastr.error(data.msg);
            },
            error: function (response) {
            	toastr.error("系统错误");
            }
        });
        return false;
	}
});
$('.form-control-feedback').remove();