//查询按钮
$(function () {
	//数据初始化
    $("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init(); 
})
/**
 * 删除操作
 * @param val
 * @returns
 */
function deleteSynchronous(val) {
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
            url: ctx + '/sync/deleteSynchronous',
            type: 'POST',
            data: {
            	studentsSyncId: val,
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
//新增按钮信息
$('#addSynchronous').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var params = form.serialize();
        $.ajax({
            type: "POST",
            url: ctx + '/sync/addSynchronous',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.addSynchronous').modal('hide');
                init();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
}); 
//编辑取值
function edit(studentsSyncId, fullName,studentsSyncName, studentsSyncDescribe) {
    $('#editSynchronous input[name="studentsSyncId"]').val(studentsSyncId);
    $('#editSynchronous input[name="fullName"]').val(fullName);
    $('#editSynchronous input[name="studentsSyncName"]').val(studentsSyncName);
    $('#editSynchronous input[name="studentsSyncDescribe"]').val(studentsSyncDescribe);
    
}
//保存编辑
$('#editSynchronous').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var studentsSyncId = $('#editSynchronous input[name="studentsSyncId"]').val();
        var fullName = $('#editSynchronous input[name="fullName"]').val();
        var studentsSyncName = $('#editSynchronous input[name="studentsSyncName"]').val();
        var studentsSyncDescribe = $('#editSynchronous input[name="studentsSyncDescribe"]').val();
        
        $.ajax({
            url: ctx + '/sync/editSynchronous',
            data: {
            	studentsSyncId: studentsSyncId , fullName: fullName,studentsSyncName: studentsSyncName, studentsSyncDescribe: studentsSyncDescribe
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.editSynchronous').modal('hide');
                    init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    }
}); 
  /**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function retrieveData(sSource, aoData, fnCallback, oSettings) {
    	aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        aoData.push({"name": "studentsSyncName", "value": $("#studentsSyncName").val()});
        aoData.push({"name": "fullName", "value": $("#fullName").val()});
        
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
  //回车搜索
    function search() {
        if (event.keyCode == 13) {
        	init();
        }
    }
    
    $(function () {
        $(".checkAll").click(function () {
            var check = $(this).prop("checked");
            $(".checkchild").prop("checked", check);
        });

    })
