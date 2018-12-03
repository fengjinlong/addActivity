$(function () {
    $('.addInquiries').on('hidden.bs.modal', function () {
        $("#city,#province,#departmentId1,#projectId,#inquiries input:hidden,#inquiries textarea:hidden").val("");
        $("#city,#province,#departmentId1,#projectId").trigger("chosen:updated");
        $('#inquiries')[0].reset();
//        editor.html('');
        $('#inquiries .selectpicker').selectpicker('refresh');
        $('#inquiries').data('bootstrapValidator').resetForm();
    })
})

//数据初始化
$("#infoManage tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#infoManage tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();


/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    /**
	 * jsp页面上var infoDisDep = "${dep}";部门id的集合
	 */
    aoData.push( { "name": "departmentId2", "value": infoDisDep } );
    /**
	 * 页数，每页显示记录数添加
	 */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "catRolEnable", "value": 0});
    /**
	 * 搜索框搜索值添加
	 */
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
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

//创建咨询等级
$('#addInquiries').on('show.bs.modal', function () {
	$('#inquiries input').each(function(i,e){
		$(e).prop('readonly',false);
	});
	$('#inquiries select').each(function(i,e){
		$(e).prop('disabled',false);
	})
	$('#inquiries button').each(function(i,e){
		$(e).prop('disabled',false);
	});
});
//编辑咨询等级
$('#editRecord').on('show.bs.modal', function () {
	$('#editConsultLevel input').each(function(i,e){
		$(e).prop('readonly',false);
	});
	$('#editConsultLevel select').each(function(i,e){
		$(e).prop('disabled',false);
	})
	$('#editConsultLevel button').each(function(i,e){
		$(e).prop('disabled',false);
	});
	debugger;
});
//清空上次选择信息
$('.increase').on('click', function () {
});
//表单验证
$('#inquiries').bootstrapValidator({
    fields: {
        consultLevelName: {
            validators: {
                notEmpty: {
                    message: '咨询等级名称不能为空'
                },
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        
	    $.ajax({
	      type: "POST",
	      url: ctx + '/consultLevel/addNewLevel',
	      data: options,
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	              DataTable.init();
	              $('.addInquiries').modal('hide');
	              toastr.success("新增成功");
	          } else {
	              toastr.error(data.msg);
	          }
	      },
	      error: function (msg) {
	          toastr.error("系统错误");
	      }
	  });
    }
});

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

$('#addInquiries').on('hide.bs.modal', function () {
	
})

function chooseConsultLevel(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/consultLevel/updateRecord',
        type: 'POST',
        data: {
        	consultLevelId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
        	DataTable.init();
        }
    });
}

/**
 * 编辑
 * @param val
 * @returns
 */
function edit(consultLevelId,consultLevelName){
	$('.bs-exampleUpdate-modal-lg').modal('show');
	$('#addConsultLevelId').val(consultLevelId);
	$('#addConsultLevelName').val(consultLevelName);
}

//表单验证-提交编辑信息
$('#editConsultLevel').bootstrapValidator({
    fields: {
        addConsultLevelName: {
            validators: {
                notEmpty: {
                    message: '咨询等级名称不能为空'
                },
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var options = form.serialize();
        
	    $.ajax({
	      type: "POST",
	      url: ctx + '/consultLevel/editConsultLevel',
	      data: options,
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	              DataTable.init();
	              $('.editRecord').modal('hide');
	              toastr.success("编辑成功");
	          } else {
	              toastr.error(data.msg);
	          }
	      },
	      error: function (msg) {
	          toastr.error("系统错误");
	      }
	  });
    }
});