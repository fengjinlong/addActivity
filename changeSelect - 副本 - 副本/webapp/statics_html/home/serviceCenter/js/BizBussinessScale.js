$(function(){
	 //时间初始化
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };
    //期待回访日期
	$('.monthScale').datetimepicker({
        language: 'zh',
        format: 'yyyy-mm',
        startView:3,
        minView:3,
        autoclose: true
    }).on('changeDate', function(ev){
    	$('#Bussiness').data('bootstrapValidator')
        .updateStatus('monthScale', 'NOT_VALIDATED', null)
        .validateField('monthScale');
    });
	
    
    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    });
})
 
//新增
$('#Bussiness').bootstrapValidator({
   fields: {
	   typeId: {
           validators: {
               notEmpty: {
                   message: '学员类型不能为空'
               }
           }
       },
       departmentId: {
           validators: {
               notEmpty: {
                   message: '分校不能为空'
               }
           }
       },
       projectId: {
           validators: {
               notEmpty: {
                   message: '项目不能为空'
               }
           }
       },
       businessType: {
           validators: {
               notEmpty: {
                   message: '创业类型不能为空'
               }
           }
       },
       monthScale: {
           validators: {
               notEmpty: {
                   message: '月份不能为空'
               }
           }
       },
		payPx: {
            validators: {
                notEmpty: {
                    message: '培训费不能为空！'
                },
            	 regexp: {
            		regexp: /^[0-1](\.\d{1,2})?$/,
                    message: '培训费只能0-1之间的小数'
                }
            }
        },
        
        payKw: {
            validators: {
            	 notEmpty: {
                     message: '考务费不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '考务费只能0-1之间的小数'
                 }
            }
        },
        payZl: {
            validators: {
            	 notEmpty: {
                     message: '资料费不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '资料费只能0-1之间的小数'
                 }
            }
        },
        payXy: {
            validators: {
            	 notEmpty: {
                     message: '协议费不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '协议费只能0-1之间的小数'
                 }
            }
        },
        payJc: {
            validators: {
            	 notEmpty: {
                     message: '教材费不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '教材费只能0-1之间的小数'
                 }
            }
        },
        payFw: {
            validators: {
            	 notEmpty: {
                     message: '服务费不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '服务费只能0-1之间的小数'
                 }
            }
        },
       
        maxScale: {
            validators: {
            	 notEmpty: {
                     message: '最大值不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '最大值只能0-1之间的小数'
                 }
            }
        },
               
        minScale: {
        	 validators: {
            	 notEmpty: {
                     message: '最小值不能为空！'
                 },
             	 regexp: {
             		regexp: /^[0-1](\.\d{1,2})?$/,
                     message: '最小值只能0-1之间的小数'
                 }
            }
        }
  },
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
       
        $.ajax({
            type: "POST",
            url: ctx + '/toBussiness/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
            	toastr.success("添加成功");
                $('.asingleEntry').modal('hide');
                DataTable.init();
                $('#Bussiness').bootstrapValidator('resetForm', true);
            },
            error: function (msg) {
                toastr.error("系统错误");

            }
        });
    }
});
$("#add").click(function() {
	  $('#Bussiness').bootstrapValidator('resetForm', true);
	  $('.selectpicker').selectpicker('val','');
      $('.selectpicker').selectpicker('refresh');

	  
})
//学员类型
$.ajax({
    url: ctx + '/financeBusinessStudentType/getAllOption',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
  
   var type = "";
        for (var i = 0; i < data.list.length; i++) {
            type += "<option value=" + data.list[i].typeId + ">" + data.list[i].typeName + "</option>";
        }
        $('#Bussiness select[name="typeId"]').html('<option value="">--请选择--</option>' + type);
    },
    error: function (response) {
        toastr.error("系统错误");
    }
});
//分校
$.ajax({
    url: ctx + '/department/getAllOption',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
    
        var type = "";
        for (var i = 0; i < data.list.length; i++) {
            type += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
        }
        $('#Bussiness select[name="departmentId"]').html(type);
        $('#Bussiness select[name="departmentId"]').selectpicker('refresh');
    },
    error: function (response) {
        toastr.error("系统错误");
        }
    });
//项目
$.ajax({
    url: ctx + '/bizProject/getAllOption',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
    
        var type = "";
        for (var i = 0; i < data.list.length; i++) {
            type += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
        }
        $('#Bussiness select[name="projectId"]').html(type);
        $('#Bussiness select[name="projectId"]').selectpicker('refresh');
    },
    error: function (response) {
        toastr.error("系统错误");
    }
});
//初始化加载数据
$("#Bussiness1 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#Bussiness1 tbody>tr>td").mLoading({
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
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    var beganAndEnd = $("#DateCertificate").val();	
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" 到 ")[0]);
        var maxDate = trim(beganAndEnd.split(" 到 ")[1]);
        aoData.push({"name": "minDate", "value": minDate});
        aoData.push({"name": "maxDate", "value": maxDate});
    }
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


//回车搜索
function search() {
    if (event.keyCode == 13) {
    	alert("1111212")
        DataTable.init();
        
    }
}
