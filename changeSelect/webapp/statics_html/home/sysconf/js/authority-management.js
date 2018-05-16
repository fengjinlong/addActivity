//查询按钮
$(function () {
	//启用、禁用切换
    $('table').on('click', '.status-btn', function () {
    	
    	var params  = {};
    	params['buttonRoleId'] = $(this).data('id');
    	params['enable'] = $(this).data('status');
    	
    	$.ajax({
			type: "POST",
            url:  ctx + '/jurisdiction/editJurisdiction',
            data: params,
            dataType: 'json',
            success: function (data) {
            	authority();
            },
			error: function (msg) {
	        	toastr.error("系统错误");
	        }
		});
    	
    });
	//数据初始化
    $("#authority tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#authority tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    authority();
})

//新增按钮信息
$('#addJurisdiction').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	var params = form.serialize();
        $.ajax({
            type: "POST",
            url: ctx + '/jurisdiction/addJurisdiction',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.addJurisdiction').modal('hide');
                authority();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
}); 
//编辑取值
function edit(buttonRoleId, buttonKey, buttonVal, enable) {
    $('#editJurisdiction input[name="buttonRoleId"]').val(buttonRoleId);
    $('#editJurisdiction input[name="buttonKey"]').val(buttonKey);
    $('#editJurisdiction input[name="buttonVal"]').val(buttonVal);
    $('#editJurisdiction select[name="enable"]').val(enable);
}
//保存编辑
$('#editJurisdiction').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var buttonRoleId = $('#editJurisdiction input[name="buttonRoleId"]').val();
        var buttonKey = $('#editJurisdiction input[name="buttonKey"]').val();
        var buttonVal = $('#editJurisdiction input[name="buttonVal"]').val();
        var enable = $('#editJurisdiction select[name="enable"]').val();
        $.ajax({
            url: ctx + '/jurisdiction/editJurisdiction',
            data: {
            	buttonRoleId: buttonRoleId, buttonKey: buttonKey, buttonVal: buttonVal, enable: enable
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.editJurisdiction').modal('hide');
                    authority();
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
    function retrieveDataXl(sSource, aoData, fnCallback, oSettings) {
    	aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

        var buttonVal = $('#buttonVal').val();

        if (buttonVal && buttonVal.length != 0) {
            aoData.push({"name": "buttonVal", "value": buttonVal});
        }

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
        	authority();
        }
    }
    
    $(function () {
        $(".checkAll").click(function () {
            var check = $(this).prop("checked");
            $(".checkchild").prop("checked", check);
        });

    })
