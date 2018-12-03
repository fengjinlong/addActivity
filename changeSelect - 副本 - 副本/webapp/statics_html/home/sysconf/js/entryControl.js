//查询按钮
$(function () {
	//数据初始化
    $("#whiteTable tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#whiteTable tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    whiteTable(); 
})
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
//查询按钮
$(function () {
	//数据初始化
    $("#blackTable tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#blackTable tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    whiteTable(); 
})
/**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function retrieveDataxl(sSource, aoData, fnCallback, oSettings) {
    	aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
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
/**
 * 删除操作
 * @param val
 * @returns
 */
function deleteEntryControl(val) {
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
            url: ctx + '/loginList/deleteEntryControl',
            type: 'POST',
            data: {
            	entryControlId: val,
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    whiteTable();
                    toastr.success(data.msg);
                }
            }
        });
    });
}
//新增按钮信息
$('#addEntryControl').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var params = form.serialize();
        $.ajax({
            type: "POST",
            url: ctx + '/loginList/addEntryControl',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.addEntryControl').modal('hide');
                whiteTable();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
}); 
//编辑取值
function edit(entryControlId,entryControlIp, entryControlEnable) {
    $('#editEntryControl input[name="entryControlId"]').val(entryControlId);
    $('#editEntryControl input[name="entryControlIp"]').val(entryControlIp);
    $('#editEntryControl select[name="entryControlEnable"]').val(entryControlEnable);
    
}
//保存编辑
$('#editEntryControl').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var entryControlId = $('#editEntryControl input[name="entryControlId"]').val();
        var entryControlIp = $('#editEntryControl input[name="entryControlIp"]').val();
        var entryControlEnable = $('#editEntryControl select[name="entryControlEnable"]').val();
        $.ajax({
            url: ctx + '/loginList/editEntryControl',
            data: {
            	entryControlId: entryControlId , entryControlIp:entryControlIp,entryControlEnable: entryControlEnable
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.editEntryControl').modal('hide');
                    whiteTable();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    }
}); 
//编辑取值
function editBlack(entryControlId,entryControlIp, entryControlEnable) {
    $('#editEntryBlack input[name="entryControlId"]').val(entryControlId);
    $('#editEntryBlack input[name="entryControlIp"]').val(entryControlIp);
    $('#editEntryBlack select[name="entryControlEnable"]').val(entryControlEnable);
    
}
//保存编辑
$('#editEntryBlack').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var entryControlId = $('#editEntryBlack input[name="entryControlId"]').val();
        var entryControlIp = $('#editEntryBlack input[name="entryControlIp"]').val();
        var entryControlEnable = $('#editEntryBlack select[name="entryControlEnable"]').val();
        $.ajax({
            url: ctx + '/loginList/editEntryControl',
            data: {
            	entryControlId: entryControlId , entryControlIp:entryControlIp,entryControlEnable: entryControlEnable
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.editEntryBlack').modal('hide');
                    whiteTable();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    }
}); 
  //回车搜索
    function search() {
        if (event.keyCode == 13) {
        	whiteTable();
        }
    }
    
    $(function () {
        $(".checkAll").click(function () {
            var check = $(this).prop("checked");
            $(".checkchild").prop("checked", check);
        });

    })
