$(function () {
	//下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })
	//新增页面确定功能
//    $('#addInquiries').bootstrapValidator({
    $('#inquiries').bootstrapValidator({
    	fields: {
           "consultRuleManage.consultRuleManageName": {
              validators: {
                  notEmpty: {
                	  message: '咨询分配名称不能为空'
                  }
              }
	       },
	       departmentIds: {
	    	   validators: {
	    		   notEmpty: {
	    			   message: '部门不能为空'
	    		   }
	    	   }
	       },
		    "consultRuleManage.dataRange": {
		    	validators: {
		    		notEmpty: {
		    			message: '数据范围不能为空'
		    		},regexp: {
                    	regexp: /^([1-9]{1})(\d*)$/,
            			message: '年龄只能是数字，且不能是负数'
                    }
		    	}
		    }
     	},
        submitHandler: function (validator, form, submitButton) {
        	var duration = $("#inquiries").find("input.duration").val();
        	 
        	if(duration==null || duration=='') {
        		 toastr.error("分配规则起止日期不能为空");
        		 return;
        	}
        		
        	var $form = $(form);
        	//表单下值为空的控件不让提交参数
        	$form.find("input,select").each(function(i,e){
        		var valueStr = $(e).val();
        		if(valueStr==null || valueStr=='') {
        			$(e).prop("disabled",true);
        		}
        	});
        	//得到表单参数
            var options = $form.serialize();
            //新增和编辑用的是同一个弹框，得到标志当前页面处于新增操作
            var methodName = $("#methodName").val();
            
            //2018/1/30新增-验证是否有非法的数值输入信息
            var flag = false;
            $("#addInfoManage").find("input[type='text']").each(function(i,e){
            	 
            	if($(e).val()==null || $(e).val()=="") {
            		toastr.error("请检查表格栏是否有数值没有输入");
            		flag = true;
            		return false;
            	}
            });
            if(flag) {
            	//取消确定按钮失效状态
            	$("#inquiries").find("button[type='submit']").prop("disabled",false);
            	return;//校验不通过，不用提交表单
            }
            if(methodName=="add") {
            	$.ajax({
                    url: ctx + '/consultRuleManage/addRecord',
                    data: form.serialize(),
                    dataType: 'json',
                    type: 'post',
                    success: function (data) {
                        if (data.status != "success") {
                            toastr.error(data.msg);
                            //取消确认=按钮的disable
                            $('#inquiries').find("button[type='submit']").prop("disabled",false);
                            //取消-表单下值为空的控件不让提交参数
                        	$form.find("input,select").each(function(i,e){
                        		$(e).prop("disabled",false);
                        	});
                        } else {
                        	toastr.success("新增成功");
                        	DataTable.init();
          	              	$('.addInquiries').modal('hide');
          	              	//新增成功更新咨询师等级信息
          	              	updateCounselor();
                        }
                    },
                    error: function () {
                        toastr.error("新增咨询规则系统错误");
                        //取消确认=按钮的disable
                        $('#inquiries').find("button[type='submit']").prop("disabled",false);
                      //取消-表单下值为空的控件不让提交参数
                    	$form.find("input,select").each(function(i,e){
                    		$(e).prop("disabled",false);
                    	});
                    }
                });
            } else if(methodName=="edit"){
            	$.ajax({
                    url: ctx + '/consultRuleManage/editRecord',
                    data: form.serialize(),
                    dataType: 'json',
                    type: 'post',
                    success: function (data) {
                        if (data.status != "success") {
                            toastr.error(data.msg);
                            //取消确认=按钮的disable
                            $('#inquiries').find("button[type='submit']").prop("disabled",false);
                          //取消-表单下值为空的控件不让提交参数
                        	$form.find("input,select").each(function(i,e){
                        		$(e).prop("disabled",false);
                        	});
                        } else {
                        	toastr.success("编辑成功");
                        	DataTable.init();
          	              	$('.addInquiries').modal('hide');
          	              	
          	              	//编辑成功更新咨询师等级信息
          	              	updateCounselor();
                        }
                    },
                    error: function () {
                        toastr.error("编辑分配规则系统错误");
                        //取消确认=按钮的disable
                        $('#inquiries').find("button[type='submit']").prop("disabled",false);
                      //取消-表单下值为空的控件不让提交参数
                    	$form.find("input,select").each(function(i,e){
                    		$(e).prop("disabled",false);
                    	});
                    }
                });
            }

            return false;
        }
    });
    
    //更新回流规则XML
    $('#infoFlowRule').bootstrapValidator({

        submitHandler: function (validator, form, submitButton) {


            console.log(form.serialize());

            //return false;

            $.ajax({
                url: ctx + '/consultRuleManage/updateXML',
                data: form.serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                    	toastr.success('规则设置成功');
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
            return false;
        }
    });
})

/**
 * 页面表单初始化回调函数
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
    //判断是否有起止日期
    var duration = $("#duration").val();
    if (duration) {
    	var startDate = duration.substring(0,duration.indexOf('-',10)).trim();
    	var endDate = duration.substring(duration.indexOf('-',10)+1,duration.length).trim();
        aoData.push({"name": "startDate", "value": startDate});
        aoData.push({"name": "endDate", "value": endDate});
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
//页面数据初始化
DataTable.init();

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}
//招生起止日期
durationDate('.duration', '-');

//单击新增-生成新增页面表单tbody内容
$(".increase").click(function(){
	//还原表单下控件的disable,并且清空旧数据
	$(".addInquiries").find("input,select").each(function(i,e){
		$(e).prop("disabled",false);
		$(e).val('');
	});
	//新增和编辑用的是同一个弹框，标志当前页面处于新增操作
	$("#methodName").val("add");
	//隐藏更新咨询师按钮
	//$("#updateCounselor").hide();
	//重置表单验证规则
	//$("#inquiries").data("bootstrapValidator").resetForm();
	//初始化新增表单
	 $.ajax({
         url: ctx + '/consultRuleManage/loadAdd',
         data: {enable:1},
         dataType: 'json',
         type: 'post',
         success: function (result) {
        	 //清空咨询等级表格
        	 $("#appendLevel").html('');
             if (result.status != "success") {
                 toastr.error(result.msg);
             } else {
            	 for(var i=0; i<result.list.length; i++) {
	                var temp = '<tr>'
	            			 + '<td>'
	            			 + result.list[i].consultLevelName
	            			 + '<input type="hidden" name="ruleManageList['+i+'].consultLevelId" value="'+result.list[i].consultLevelId+'"/>'
	            			 + '</td>'
	            			 + '<td><input type="text" class="form-control achievementLow" onkeyup="validateInt(this)" onblur="validateIntLow(this)" name="ruleManageList['+i+'].achievementLow" placeholder="请输入数值" value="0" style="width:70px"/>——<input type="text" class="form-control achievementUp" onkeyup="validateInt(this)" onblur="validateUp(this)" name="ruleManageList['+i+'].achievementUp" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control phoneTransferLow" onblur="validateFloatLow(this)" name="ruleManageList['+i+'].phoneTransferLow" placeholder="请输入数值" value="0" style="width:70px"/>——<input type="text" class="form-control phoneTransferUp" onblur="validateFloatUp(this)" name="ruleManageList['+i+'].phoneTransferUp" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control consultUp" onkeyup="validateInt(this)" onblur="validateInt(this)" placeholder="请输入数值" value="0" name="ruleManageList['+i+'].consultUp" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control weight" onblur="validateWeight(this)" name="ruleManageList['+i+'].weight" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control backFlowLow" onkeyup="validateInt(this)" name="ruleManageList['+i+'].backFlowLow" onblur="validateIntLow(this)" placeholder="请输入数值" value="0" style="width:70px"/>——<input type="text" class="form-control backFlowUp" onkeyup="validateInt(this)" onblur="validateUp(this)" name="ruleManageList['+i+'].backFlowUp" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + "<td><a href='javascript:void(0);' onclick='showCounselors(this)' class='edit' data-backdrop='static'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a></td>"
	            			 + '</tr>';
            		 $("#appendLevel").append(temp);
            	 }
            	 
             }
         },
         error: function () {
             toastr.error("系统错误");
         }
     });
	 
	//初始化-新增页面-部门多选下拉框
	 $.ajax({
//         url: ctx + '/consultRuleManage/selectDepartment',
//原接口数据不能排序按照部门管理进行排序，所以采用部门管理接口
         url: ctx + '/department/getAllOption',
         dataType: 'json',
         data:{type:"2"},
         type: 'post',
         success: function (info) {
        	 //还原部门下拉框
        	 $("#departmentIds").html('');
        	 $('.selectpicker').selectpicker('refresh');
             if (info.status == "success") {
            	 var option = "";
            	  
            	 for(var j=0; j<info.list.length; j++) {
//            		 option += '<option value="'+info.data[j].departmentId+'" >'+info.data[j].fullName+'</option>';
            		 option += '<option value="'+info.list[j].departmentId+'" >'+info.list[j].fullName+'</option>';
            	 }
            	 $("#departmentIds").html(option);
            	 $('.selectpicker').selectpicker('refresh');
             }
         }
	 });
});

//校验正整数
function validateInt(obj) {
	if($(obj).val()==null) {
		toastr.error("数值不能为空");
	}
	var reg = /^(0{1})$|^(([1-9]{1})(\d*))$/;
	if(!reg.test($(obj).val())) {
		toastr.error("只能输入正整数和0，且不能已0开头");
		$(obj).val(null);
	}
}
//校验正整数下限（上限不能小于下限）
function validateIntLow(obj) {
	var upObj = $(obj).next();
	if($(upObj).val!=null && $(obj).val()!=null) {
		if(Number($(upObj).val())<Number($(obj).val())) {
			toastr.error("上限值不能小于下限值");
			$(upObj).val(null);
		}
	}
}
//校验正整数
function validateUp(obj) {
	 
	var lowObj = $(obj).prev();
	if($(lowObj).val()!=null && $(obj).val()!=null) {
		//上限的值不能比下限的值小
		if(Number($(lowObj).val())>Number($(obj).val())) {
			toastr.error("上限值不能小于下限值");
			$(obj).val(null);
		}
	}
}
//校验正小数
function validateFloatLow(obj) {
//	var reg = /^(\d*)$|^(\d{1}\.\d+)$/;
	if($(obj).val()==null) {
		toastr.error("数值不能为空");
	}
	var reg = /^\d+(\.\d+)?$/;
	if(!reg.test($(obj).val())) {
		toastr.error("只能输入正整数和小数和0");
		$(obj).val(null);
	}
	//检验上限
	var upObj = $(obj).next();
	if($(upObj).val()!=null && $(obj).val()!=null) {
		//上限的值不能比下限的值小
		if(Number($(upObj).val())<Number($(obj).val())) {
			toastr.error("上限值不能小于下限值");
			$(upObj).val(null);
		}
	}
}
//校验小数值的上限
function validateFloatUp(obj) {
//	var reg = /^(\d*)$|^(\d{1}\.\d+)$/;
	if($(obj).val()==null) {
		toastr.error("数值不能为空");
	}
	var reg = /^\d+(\.\d+)?$/;
	if(!reg.test($(obj).val())) {
		toastr.error("只能输入正整数和小数和0");
		$(obj).val(null);
	}
	//检验上限
	var lowObj = $(obj).prev();
	if($(lowObj).val()!=null && $(obj).val()!=null) {
		//上限的值不能比下限的值小
		if(Number($(lowObj).val())>Number($(obj).val())) {
			toastr.error("上限值不能小于下限值");
			$(obj).val(null);
		}
	}
}
//验证权重
function validateWeight(obj) {
	if($(obj).val()==null) {
		toastr.error("数值不能为空");
	}
	var reg = /^([0-1]{1})$|^([0]{1}\.\d+)$/;
	if(!reg.test($(obj).val())) {
		toastr.error("只能输入小于等于1的正数和0");
		$(obj).val(null);
	}
}
//启用禁用功能
function chooseRecord(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    
    //查询该咨询分配id对应的数据
    $.ajax({
        url: ctx + '/consultRuleManage/updateRecord',
        type: 'POST',
        data: {
        	consultRuleManageId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
        	if(data.status=="success") {
        		//DataTable.init();
        		if(flag == 1) {
        			$("#span" + val).attr("class","btn btn-xs btn-use");
        			$("#span" + val).html('<i class="fa fa-check-circle-o"></i> 启用');
        		} else {
        			$("#span" + val).attr("class","btn btn-xs btn-nouse");
        			$("#span" + val).html('<i class="fa fa-ban"></i> 禁用');
        		}
        	} else {
        		toastr.error(data.msg);
        	}
        }
    });
}

/**
 * 编辑
 * @param val
 * @returns
 */
function edit(consultRuleManageId){
	//展示更新咨询师按钮
	//$("#updateCounselor").show();
	//弹出编辑菜单
	$('.bs-exampleUpdate-modal-lg').modal('show');
	//还原表单下控件的disable,并且清空旧数据
	$(".addInquiries").find("input,select").each(function(i,e){
		$(e).prop("disabled",false);
		$(e).val('');
	});
	//新增和编辑用的是同一个弹框，标志当前页面处于编辑操作
	$("#methodName").val("edit");
	//重置表单验证规则
	$("#inquiries").data("bootstrapValidator").resetForm();
	//根据咨询分配id查询咨询分配信息回显
	 $.ajax({
        url: ctx + '/consultRuleManage/editRecordUI',
        type: 'POST',
        data: {
        	consultRuleManageId: consultRuleManageId
        },
        dataType: 'json',
        success: function (data) {
        	//回显咨询分配规则id(隐藏input)
        	$("#consultRuleManageId").val(data.data.consultRuleManage.consultRuleManageId);
        	//回显咨询分配名称
        	$("#consultRuleManageName").val(data.data.consultRuleManage.consultRuleManageName);
        	 
        	//回显起止日期
        	var startDate = data.data.consultRuleManage.startDate.split(" ")[0].trim();
        	var endDate = data.data.consultRuleManage.endDate.split(" ")[0].trim();
        	var startEnd = startDate + " - " +endDate;
        	$("#inquiries").find("input.duration").val(startEnd);
//        	durationDate('.duration', '-');//不能调用该方法，初始化样式时会破坏bootstrapvalidator的校验
        	//回显数据范围
        	$("#dataRange").val(data.data.consultRuleManage.dataRange);
        	//该咨询分配规则对应的部门集合
        	var departmentIds = data.data.departmentIds;
        	//初始化-新增页面-部门多选下拉框
	       	 $.ajax({
	                url: ctx + '/consultRuleManage/selectDepartment',
	                dataType: 'json',
	                data:{type:2},
	                type: 'post',
	                success: function (info) {
	               	 //还原部门下拉框
	               	 $("#departmentIds").html('');
	               	 $('.selectpicker').selectpicker('refresh');
	                    if (info.status == "success") {
	                   	 var option = "";
	                   	  
	                   	 for(var j=0; j<info.data.length; j++) {
	                   		 option += '<option value="'+info.data[j].departmentId+'" >'+info.data[j].fullName+'</option>';
	                   	 }
	                   	 $("#departmentIds").html(option);
	                   	 $('.selectpicker').selectpicker('refresh');
	                   	 //回显部门信息
	                   	 $('#departmentIds').selectpicker('val', departmentIds);
	                    }
	                },
	                error: function () {
		                toastr.error("回显部门信息系统错误");
		            }
	       	 });
	       	 
	       //该咨询分配规则对应的信息详情集合
	       	var ruleManageDetail = data.data.ruleManageList;
	       	 
	       //初始化表单数据
	       	$.ajax({
	            url: ctx + '/consultRuleManage/loadAdd',
	            data: {enable:1},
	            dataType: 'json',
	            type: 'post',
	            success: function (result) {
	           	 //清空咨询等级表格
	           	 $("#appendLevel").html('');
	                if (result.status != "success") {
	                    toastr.error(result.msg);
	                } else {
	               	 var temp = '';
	               	 for(var i=0; i<result.list.length; i++) {
	               		 temp += '<tr>'
	               			 + '<td>'
	               			 + result.list[i].consultLevelName
	               			 + '<input type="hidden" name="ruleManageList['+i+'].consultLevelId" value="'+result.list[i].consultLevelId+'" id="'+result.list[i].consultLevelId+'"/>'
	               			 + '<input type="hidden" name="ruleManageList['+i+'].consultRuleManageDetailId" class="form-control consultRuleManageDetailId"/>'
	               			 + '</td>'
	               			 + '<td><input type="text" class="form-control achievementLow" onkeyup="validateInt(this)" onblur="validateIntLow(this)" name="ruleManageList['+i+'].achievementLow" placeholder="请输入数值" value="0" style="width:70px"/>——<input type="text" class="form-control achievementUp" onkeyup="validateInt(this)" onblur="validateUp(this)" name="ruleManageList['+i+'].achievementUp" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control phoneTransferLow" onblur="validateFloatLow(this)" name="ruleManageList['+i+'].phoneTransferLow" placeholder="请输入数值" value="0" style="width:70px"/>——<input type="text" class="form-control phoneTransferUp" onblur="validateFloatUp(this)" name="ruleManageList['+i+'].phoneTransferUp" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control consultUp" onkeyup="validateInt(this)" onblur="validateInt(this)" placeholder="请输入数值" value="0" name="ruleManageList['+i+'].consultUp" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control weight" onblur="validateWeight(this)" name="ruleManageList['+i+'].weight" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + '<td><input type="text" class="form-control backFlowLow" onkeyup="validateInt(this)" name="ruleManageList['+i+'].backFlowLow" onblur="validateIntLow(this)" placeholder="请输入数值" value="0" style="width:70px"/>——<input type="text" class="form-control backFlowUp" onkeyup="validateInt(this)" onblur="validateUp(this)" name="ruleManageList['+i+'].backFlowUp" placeholder="请输入数值" value="0" style="width:70px"/></td>'
	            			 + "<td><a href='javascript:void(0);' onclick='showCounselors(this)' class='edit' data-backdrop='static'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a></td>"
	               			 + '</tr>';
	               	 }
	               	 $("#appendLevel").html(temp);
	               	 
	               	 //回显详情信息
	               	 for(var m=0; m<ruleManageDetail.length; m++) {
	               		 //首先需要确定页面有该咨询等级的input(有可能等级有增删，但是保存的信息不会变)
	               		 var $inputObj = $("#"+ruleManageDetail[m].consultLevelId);
	               		 if($inputObj.length>0) {
	               			$inputObj.parents("tr").find("input.consultRuleManageDetailId").val(ruleManageDetail[m].consultRuleManageDetailId);//回显咨询规则管理详情主键
	               			$inputObj.parents("tr").find("input.achievementLow").val(ruleManageDetail[m].achievementLow);//回显业绩下限
	               			$inputObj.parents("tr").find("input.achievementUp").val(ruleManageDetail[m].achievementUp);//回显业绩上限
	               			$inputObj.parents("tr").find("input.phoneTransferLow").val(ruleManageDetail[m].phoneTransferLow);//回显电转下限
	               			$inputObj.parents("tr").find("input.phoneTransferUp").val(ruleManageDetail[m].phoneTransferUp);//回显电转上限
	               			$inputObj.parents("tr").find("input.consultUp").val(ruleManageDetail[m].consultUp);//回显咨询量上限
	               			$inputObj.parents("tr").find("input.weight").val(ruleManageDetail[m].weight);//回显权重
	               			$inputObj.parents("tr").find("input.backFlowLow").val(ruleManageDetail[m].backFlowLow);//回显回流咨询量可抢范围下限
	               			$inputObj.parents("tr").find("input.backFlowUp").val(ruleManageDetail[m].backFlowUp);//回显回流咨询量可抢范围上限
	               		 }
	               	 }
	                }
	            },
	            error: function () {
	                toastr.error("回显等级详情系统错误");
	            }
	        });
        },
        error: function() {
        	toastr.error("回显数据系统错误");
        }
    });
}

//查看该等级下符合条件的所有咨询师
function showCounselors(obj) {
	//先做验证
	var flag = true;//验证结果标志
	//1.部门必须有选中值
	var departmentIds = $('#departmentIds').val();
	if(departmentIds==null || departmentIds=='') {
		toastr.error("查看咨询师内容前,必须选中部门");
		flag = false;
	}
	//2.数据范围必须有选中值
	var dataRange = $('#dataRange').val();
	if(dataRange==null || dataRange==0) {
		toastr.error("查看咨询师内容前,必须填写数据范围");
		flag = false;
	}
	 
	//3.该等级下咨询师业绩上下限必须填写
	//咨询下限
	var achievementLow = $(obj).parents("tr").find("td").eq(1).find("input.achievementLow").val();
	//咨询上限
	var achievementUp = $(obj).parents("tr").find("td").eq(1).find("input.achievementUp").val();
	if(achievementLow==null || achievementUp==null || achievementLow=='' || achievementUp=='') {
		toastr.error("查看咨询师内容前,该等级下咨询师业绩上下限必须填写");
		flag = false;
	} else {
		//为需要给后台传递业绩上下限参数的input赋值
		$("#achievementLow").val(achievementLow);
		$("#achievementUp").val(achievementUp);
	}
	 
	//4.该等级下咨询师电转上下限必须填写
	//咨询下限
	var phoneTransferLow = $(obj).parents("tr").find("td").eq(2).find("input.phoneTransferLow").val();
	//咨询上限
	var phoneTransferUp = $(obj).parents("tr").find("td").eq(2).find("input.phoneTransferUp").val();
	if(phoneTransferLow==null || phoneTransferUp==null || phoneTransferLow=='' || phoneTransferUp=='') {
		toastr.error("查看咨询师内容前,该等级下咨询师电转上下限必须填写");
		flag = false;
	} else {
		//为需要给后台传递电转上下限参数的input赋值
		$("#phoneTransferLow").val(phoneTransferLow);
		$("#phoneTransferUp").val(phoneTransferUp);
	}
	//判断是否通过验证，通过验证继续下一步，否则直接结束
	if(flag){
		//弹出咨询师显示菜单
		$('.showCounselors').modal('show');
		//初始化之前先清除以前生成的旧数据
		$("#appendCounselors").html('');
		//初始化咨询师表单
		ShowTable.init();
	} else {
		return;
	}
}

//查看咨询师-前后台交互方法
function showData(sSource, aoData, fnCallback, oSettings) {
    /**
	 * 页数，每页显示记录数添加
	 */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "catRolEnable", "value": 0});
    /**
	 * 选中的部门集合
	 */
    var departmentIds = $('#departmentIds').val();
    aoData.push({"name": "departmentIds", "value": departmentIds});
    /**
     * 输入的数据范围
     */
    var dataRange = $('#dataRange').val();
    aoData.push({"name": "dataRange", "value": dataRange});
    //得到业绩上下限
    var achievementLow = $("#achievementLow").val();
	var achievementUp = $("#achievementUp").val();
    aoData.push({"name": "achievementLow", "value": achievementLow});
    aoData.push({"name": "achievementUp", "value": achievementUp});
    
    //得到电转上下限
    var phoneTransferLow = $("#phoneTransferLow").val();
	var phoneTransferUp = $("#phoneTransferUp").val();
	 
    aoData.push({"name": "phoneTransferLow", "value": phoneTransferLow});
    aoData.push({"name": "phoneTransferUp", "value": phoneTransferUp});
    
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

//点击更新当前规则下咨询师信息
function updateCounselor() {
	//得到咨询分配规则id
	var consultRuleManageId = $("#consultRuleManageId").val();
	//得到部门集合id
	var departmentIds = $("#departmentIds").val();
	//得到数据范围天数
	var dataRange = $("#dataRange").val();
	
	$.ajax({
        "url": ctx + '/consultRuleManage/updateCounselor',
        "data": {
        	consultRuleManageId:consultRuleManageId, 
        	"departmentIds":departmentIds,
        	dataRange:dataRange
        },
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (data) {
        	if(data.status="success") {
        		toastr.success("咨询师信息更新成功");
        		//隐藏弹框
        		$("#addInquiries").modal('hide');
        	} else {
        		toastr.error("咨询师信息更新失败");
        	}
        }
    });
}

//测试时期按钮，测试分配规则是否生效
function testRule() {
	$.ajax({
        "url": ctx + '/consultRuleManage/updateRuleManageCounselor',
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (data) {
        }
	});
	toastr.success('咨询分配规则生效！');
}

//测试时期按钮，测试回流规则是否生效
function testBack() {
	$.ajax({
        "url": ctx + '/consultRuleManage/recoverConsult',
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (data) {
        }
	});
	toastr.success('咨询回流规则生效！');
}