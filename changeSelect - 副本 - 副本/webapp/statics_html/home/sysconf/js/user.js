$(function () {
	//数据初始化
    $("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();
})
$(document).on('change', 'input:checkbox.master', function () {
    if ($(this).prop('checked')) {
        $('input:checkbox.slaver').prop('checked', 'checked');
    } else {
        $('input:checkbox.slaver').prop('checked', '');
    }
})
function excleUser() {

}
/**
 * 回车检索
 * @returns
 */
function search() {
    if (event.keyCode == 13) {
        toSearch();
    }
}
function toSearch() {
    init();
}
/**
 * 初始化时间控件
 * @returns
 */
function initDate() {
    $('#reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        },
        ranges: {
            '今天': [moment().startOf('day'), moment()],
            '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
            '本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
            '上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
            '本月': [moment().startOf("month"), moment().endOf("month")],
            '上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()]
        },
        applyClass: 'btn-primary',
        alwaysShowCalendars: true,
        autoclose: true,
        autoUpdateInput: false,
        showDropdowns: true
    });

    $('#reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
}
/**
 * 修改用户状态
 * @returns
 */
function chooseUser(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/user/updateRecord',
        type: 'POST',
        data: {
            userId: val,
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
            init();
        }
    });
}


function validateForm() {
    $.ajax({
        url: __root__ + '/user/addNewUser',
        type: 'POST',
        data: $('#myform').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                toastr.success(data.msg);
            } else {
                toastr.error(data.msg);
            }

        },
        error: function (response) {
            alert("系统错误");
        }
    });
    return false;
}


//文件上传
function uploadFile(t) {

    var _this = $(t);

    var formData = new FormData();

    formData.append('file', _this[0].files[0]);

    var inputName = _this.attr('extra');

    $.ajax({
        url: __root__ + '/file/uploadFile',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert('系统错误');
        }
    });
};
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "beginTime", "value": $("#reservation").val().split("到")[0]});
    aoData.push({"name": "endTime", "value": $("#reservation").val().split("到")[1]});
    aoData.push({"name": "enable", "value": $("#enable").val()});
    aoData.push({"name": "searchVal", "value": $("#searchVal").val()});

    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
        }
    });
}

/**
 * 删除操作
 * @param val
 * @returns
 */
function del(val) {
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
            url: ctx + '/user/deleteRecord',
            type: 'POST',
            data: {
                userId: val,
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    init();
                    toastr.success(data.msg);
                }
            }
        });
    });
}
/**
 * 跳转编辑页面
 * @param val
 * @returns
 */
function edit(val) {
    //loadHtml('/user/toEditUser/' + val);
    location.href=ctx+'/user/toEditUser/' + val;
}
function modifyPwd(userId) {
    if (userId == '' || userId == null) {
        toastr.error('用户Id为空,不能修改');
        return false;
    }
    $('#changeUserPassword input[name=userId]').val(userId);
    $('.changeUserPassword').modal('show');
}
//表单验证
$('#changeUserPassword').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        newPassword: {
            validators: {
        	   notEmpty: {
              	 message: '新密码不能为空'
               },
                regexp: {
                    regexp: /^[a-zA-Z0-9_\.]+$/,
                    message: '密码只能有数字、字母、下划线组成'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: '密码长度必须在6-30位之间'
                }
            }
        },
        affirmPassword: {
            validators: {
            	notEmpty: {
                  	message: '确认新密码不能为空'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_\.]+$/,
                    message: '密码只能有数字、字母、下划线组成'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: '密码长度必须在6-30位之间'
                },
                identical: {
                    field: 'newPassword',
                    message: '两次密码输入不一致'
                }
            }
        },
    },
    submitHandler: function (validator, form, submitButton) {
        $.ajax({
            url: ctx + "/user/changePwd",
            type: 'POST',
            data: $('#changeUserPassword').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.msg) {
                    toastr.error(data.msg);
                } else {
                    $('.changeUserPassword').modal('hide');
                    toastr.success('修改成功');
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        return false;
    }
});
//修改密码表单重置
$('.changeUserPassword').on('hide.bs.modal', function () {
	$('#changeUserPassword')[0].reset();
	$('#changeUserPassword').data('bootstrapValidator').resetForm();
})
// 2018/05/15 迁移产品权限
/**
 * 显示产品权限
 */
$("#init").on('click','.product-btn',function(){
	var userId = $(this).attr("userId");
	$("#userId").val(userId);
    var setting = {
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
        
        var data_left = new Array();
        var data_right = new Array();
        
        /**
         * 加载用户现有用户-产品权限
         */
        $.ajax({
            "type": "Post",
            "url": ctx+'/userPermissions/loadProductPermissions',
            "dataType": "json",
            "data":{"userId":userId},
            "success": function (data) {
            	var productDataRoleIds = "";
            	for(var i=0; i<data.length; i++){
            		productDataRoleIds += "'"+data[i].productDataRoleId+"',"
            	}
            	/**
            	 * 加载所有用户-产品权限
            	 */
            	 $.ajax({
                     "type": "Post",
                     "url": ctx+'/permissions/getProducts',
                     "dataType": "json",
                     "success": function (data) {
                     	for(var i=0; i<data.length; i++){
                     		var obj={};
                     		obj["id"] = data[i].productId;
                     		obj["pId"] = 0;
                     		obj["name"] = data[i].productModelName+'-'+data[i].productName;
                     		if(productDataRoleIds.indexOf("'"+data[i].productId+"',") >= 0){
                     			data_right.push(obj)
                     		}else{
                     			data_left.push(obj);                     			
                     		}
         				}
                     	 $.fn.zTree.init($("#tree7"), setting, data_left);
                          $.fn.zTree.init($("#tree8"), setting,data_right);
                     }
                 });
            }
        });
});

/**
 * 保存产品权限
 */
$(".productBtn").click(function(){
	var userId = $("#userId").val();
	var treeObj = $.fn.zTree.getZTreeObj("tree8");
	var nodes = treeObj.getNodes();
	var productDataRoleIds = "";
	for (var i = 0; i < nodes.length; i++) {
		productDataRoleIds += nodes[i].id +",";
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/userPermissions/addProductPermisAll',
        "dataType": "json",
        "data":{"userId":userId,"productDataRoleIds":productDataRoleIds},
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".productPermission").modal('hide');
        	}
        	toastr.success(data.msg);        		
        }
    });
	return false;
});

// 批量用户增加产品权限
function permiPopUp(){
	// 树属性设置
	var setting = {
        view: {
            selectedMulti: false
        },
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
        /* edit: {
            enable: true
        } */
    };
	var data1 = [];
	var data2 = [];
	$.ajax({
		'url' : ctx + '/department/getTree',
		'type' : 'post',
		'dataType' : 'json',
		'success' : function(response){
			if(response.status == 'success'){
				data1 = response.list;
			}
			$.each(data1,function(i,v){
				if(v.type == '1'){// 部门为父文件夹类型
					v.isParent = true;
				}
			})
			//初始化
			$.fn.zTree.init($("#ztreeList1"), setting, data1);
		}
	})
	$.ajax({
		'url' : ctx + '/productModelController/getModelProductTree',
		'type' : 'post',
		'dataType' : 'json',
		'success' : function(response){
			if(response.status == 'success'){
				data1 = response.list;
			}
			$.each(data1,function(i,v){
				if(v.type == '8'){// 模型类型为父文件夹样式
					v.isParent = true;
				}
			})
			//初始化
			$.fn.zTree.init($("#ztreeList2"), setting, data1);
		}
	})
}
$('.batch-deal').on('click',function(){
	var treeObj1 = $.fn.zTree.getZTreeObj("ztreeList1");
	var nodes1 = treeObj1.getCheckedNodes(true);
	// 选中用户ID的数组
	var userIds = [];
	for (var i = 0; i < nodes1.length; i++) {
		if (!nodes1[i].isParent) {
			userIds.push(nodes1[i].id);
		}
	}
	var treeObj2 = $.fn.zTree.getZTreeObj("ztreeList2");
	var nodes2 = treeObj2.getCheckedNodes(true);
	// 选中产品ID的数组
	var productIds = [];
	for (var i = 0; i < nodes2.length; i++) {
		if (!nodes2[i].isParent) {
			productIds.push(nodes2[i].id);
		}
	}
	$.ajax({
        "type": "Post",
        "url": ctx+'/userPermissions/addBatchProductPerm',
        "dataType": "json",
        "data":"userIds="+userIds+"&productIds="+productIds,
        "success": function (data) {
        	if(data.status == 'success'){
        		$(".addproductAll").modal('hide');
        	}
        	toastr.info(data.msg);        		
        }
    });
})