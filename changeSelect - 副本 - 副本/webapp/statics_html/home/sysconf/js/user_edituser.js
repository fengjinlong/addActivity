$(function () {
	//initPlugins();
	//initTree(1);
	initAddress();
	/**
	 * 身份证有效期
	 */
	$("#expirDate").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    }).on('hide',function(e) {  
        $('#bakForm').data('bootstrapValidator')  
        .updateStatus('expirDate', 'NOT_VALIDATED',null)  
        .validateField('expirDate');  
	});
	$(".date-picker").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    });
	/**
	 * 入职时间
	 */
	$("#entryTime").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    }).on('hide',function(e) {  
        $('#bakForm').data('bootstrapValidator')  
        .updateStatus('entryTime', 'NOT_VALIDATED',null)  
        .validateField('entryTime');  
	});
	/**
	 * 合同起止时间
	 */
	$("#contractEndTime1").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    }).on('hide',function(e) {  
        $('#bakForm').data('bootstrapValidator')  
        .updateStatus('contractEndTime1', 'NOT_VALIDATED',null)  
        .validateField('contractEndTime1');  
	});
	$("#contractStartTime1").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    }).on('hide',function(e) {  
        $('#bakForm').data('bootstrapValidator')  
        .updateStatus('contractStartTime1', 'NOT_VALIDATED',null)  
        .validateField('contractStartTime1');  
	});
	/**
	 * 社保增员时间
	 */
	$("#securityAddTime").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    }).on('hide',function(e) {  
        $('#bakForm').data('bootstrapValidator')  
        .updateStatus('securityAddTime', 'NOT_VALIDATED',null)  
        .validateField('securityAddTime');  
	});
	/**
	 * 社保减员时间
	 */
	$("#securityLostTime").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    }).on('hide',function(e) {  
        $('#bakForm').data('bootstrapValidator')  
        .updateStatus('securityLostTime', 'NOT_VALIDATED',null)  
        .validateField('securityLostTime');  
	});
	
	/**
	 * 表单
	 */
	$('#mainForm').bootstrapValidator({
        fields: {/*验证*/
            account: {
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '用户名不能为空'
                    },
                    regexp: {/* 只需加此键值对 */
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {/*长度提示*/
                        min: 6,
                        max: 30,
//                      message: '用户名长度必须在6到30之间'
                    }/*最后一个没有逗号*/
                }
            },
//            password: {
//                message:'密码无效',
//                validators: {
//                    notEmpty: {
//                        message: '密码不能为空'
//                    },
//                    stringLength: {
//                        min: 6,
//                        max: 30,
//                        message: '用户名长度必须在6到30之间'
//                    },
//                    different: {//不能和用户名相同
//                        field: 'account',
//                        message: '不能和用户名相同'
//                    },
//                    regexp: {/* 只需加此键值对 */
//                        regexp: /^[a-zA-Z0-9_\.]+$/,
//                        message: '只能是数字和字母_.'
//                    }
//                }
//            },
//            realName: {
//                validators: {
//                    notEmpty: {/*非空提示*/
//                        message: '真实姓名不能为空'
//                    },
//                    regexp: {/* 只需加此键值对 */
//                        regexp: /[\u4e00-\u9fa5]/g,
//                        message: '只能是汉字'
//                    }
//                }
//            },
            spell: {
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '姓名全拼不能为空'
                    },
                    regexp: {/* 只需加此键值对 */
                        regexp: /^[a-zA-Z_\.]+$/,
                        message: '只能是英文'
                    }
                }
            },
            age: {
                validators: {
                	notEmpty: {/*非空提示*/
                        message: '年龄不能为空'
                    },
                    regexp: {/* 只需加此键值对 */
                        regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/user/updateRecord",  
 			   data: $("#mainForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					 window.location = ctx + '/user/index';
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
	
	$('i[data-bv-field="gender"]').remove();

	/**
	 * 表单
	 */
	$('#bakForm').bootstrapValidator({
        fields: {/*验证*/
        	idCard: {
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '身份证号不能为空'
                    },
                    regexp: {/* 只需加此键值对 */
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '身份证号只能是数字和字母_.'
                    },
                    stringLength: {/*长度提示*/
                        min: 18,
                        max: 18,
                        //message: '长度错误'
                    }/*最后一个没有逗号*/
                }
            },
            expirDate: {
                validators: {
                    notEmpty: {
                        message: '身份证有效期不能为空'
                    }
                }
            },
            entryTime:{
                validators: {
                    notEmpty: {
                        message: '入职时间不能为空'
                    }
                }
            },
            contractStartTime1:{
                validators: {
                    notEmpty: {
                        message: '合同开始日期不能为空'
                    }
                }
            },
            contractEndTime1:{
                validators: {
                    notEmpty: {
                        message: '合同结束日期不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
        	var merchantsBankCard = new Array();
        	var jobChange = new Array();
        	var eduBackground = new Array();
        	var workHistory = new Array();
        	/**
        	 * 工资卡信息数据组装
        	 */
        	var ar1 = new Array();
        	$("tr[id^=gzkTr]").each(function(){
        		var ob1 = {};
        		var id = this.id.substring(this.id.length-1,this.id.length);
        		ob1["gzk_khh_id"] = "gzk_khh_"+id
        		ob1["gzk_khh_value"] = $("#gzk_khh_"+id).val()
        		
        		ob1["gzk_num_id"] = "gzk_num_"+id
        		ob1["gzk_num_value"] = $("#gzk_num_"+id).val()
        		
        		ob1["gzk_bz_id"] = "gzk_bz_"+id
        		ob1["gzk_bz_value"] = $("#gzk_bz_"+id).val()
        		ar1.push(ob1);
        	});
        	/**
        	 * 异动信息数据组装
        	 */
        	var ar2 = new Array();
        	$("tr[id^=ydTr]").each(function(){
        		var id = this.id.substring(this.id.length-1,this.id.length);
        		var ob2 = {};
        		ob2["yd_project_id"] = "yd_project_"+id
        		ob2["yd_project_value"] = $("#yd_project_"+id).val()
        		
        		ob2["yd_from_id"] = "yd_from_"+id
        		ob2["yd_from_value"] = $("#yd_from_"+id).val()
        		
        		ob2["yd_to_id"] = "yd_to_"+id
        		ob2["yd_to_value"] = $("#yd_to_"+id).val()
        		
        		ob2["yd_time_id"] = "yd_time_"+id
        		ob2["yd_time_value"] = $("#yd_time_"+id).val()
        		
        		ob2["yd_bz_id"] = "yd_bz_"+id
        		ob2["yd_bz_value"] = $("#yd_bz_"+id).val()
        		ar2.push(ob2);
        	});
        	
        	/**
        	 * 教育信息数据组装
        	 */
        	var ar3 = new Array();
        	$("tr[id^=jyTr]").each(function(){
        		var id = this.id.substring(this.id.length-1,this.id.length);
        		var ob3 = {};
        		ob3["jy_school_id"] = "jy_school_"+id
        		ob3["jy_school_value"] = $("#jy_school_"+id).val()
        		
        		ob3["jy_address_id"] = "jy_address_"+id
        		ob3["jy_address_value"] = $("#jy_address_"+id).val()
        		
        		ob3["jy_level_id"] = "jy_level_"+id
        		ob3["jy_level_value"] = $("#jy_level_"+id).val()
        		
        		ob3["jy_zy_id"] = "jy_zy_"+id
        		ob3["jy_zy_value"] = $("#jy_zy_"+id).val()
        		
        		ob3["jy_stTime_id"] = "jy_stTime_"+id
        		ob3["jy_stTime_value"] = $("#jy_stTime_"+id).val()
        		
        		ob3["jy_edTime_id"] = "jy_edTime_"+id
        		ob3["jy_edTime_value"] = $("#jy_edTime_"+id).val()
        		ar3.push(ob3);
        	});
        	
        	/**
        	 * 工作信息数据组装
        	 */
        	var ar4 = new Array();
        	$("tr[id^=gzTr]").each(function(){
        		var ob4 = {};
        		var id = this.id.substring(this.id.length-1,this.id.length);
        		ob4["gz_company_id"] = "gz_company_"+id
        		ob4["gz_company_value"] = $("#gz_company_"+id).val()
        		
        		ob4["gz_address_id"] = "gz_address_"+id
        		ob4["gz_address_value"] = $("#gz_address_"+id).val()
        		
        		ob4["gz_dep_id"] = "gz_dep_"+id
        		ob4["gz_dep_value"] = $("#gz_dep_"+id).val()
        		
        		ob4["gz_duty_id"] = "gz_duty_"+id
        		ob4["gz_duty_value"] = $("#gz_duty_"+id).val()
        		
        		ob4["gz_yuanyin_id"] = "gz_yuanyin_"+id
        		ob4["gz_yuanyin_value"] = $("#gz_yuanyin_"+id).val()
        		
        		ob4["gz_stTime_id"] = "gz_stTime_"+id
        		ob4["gz_stTime_value"] = $("#gz_stTime_"+id).val()
        		
        		ob4["gz_edTime_id"] = "gz_edTime_"+id
        		ob4["gz_edTime_value"] = $("#gz_edTime_"+id).val()
        		ar4.push(ob4);
        	});
        	$("#merchantsBankCard").val(JSON.stringify(ar1));
        	$("#jobChange").val(JSON.stringify(ar2));
        	$("#eduBackground").val(JSON.stringify(ar3));
        	$("#workHistory").val(JSON.stringify(ar4));
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/user/updateRecord",  
 			   data: $("#bakForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 						window.location = ctx + '/user/index';
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
})
/**
 * 工资卡组件
 */
var gzkNum=isNaN(gzkOldNum)==false?1:eval(gzkOldNum)+1;
function gzkAdd(){
    $("#gzkBody").append('<tr id="gzkTr'+gzkNum+'" class="odd">'
					       +'     <td class="text-center">'
					       +'	  <span onclick="gzkRemove('+gzkNum+')" class="glyphicon glyphicon-minus-sign danger"></span>'
					       +' </td>'
					       +' <td class="">'
					       +'     <input id="gzk_khh_'+gzkNum+'" type="text" class="form-control input-sm">'
					       +' </td>'
					       +' <td class=" ">'
					       +'      <input id="gzk_num_'+gzkNum+'" type="text" class="form-control input-sm">'
					       +' </td>'
					       +' <td class=" ">'
					       +'     <input id="gzk_bz_'+gzkNum+'" type="text" class="form-control input-sm">'
					       +' </td>'
					       +'</tr>');
    gzkNum++;
}
function gzkRemove(val){
	$("#gzkTr"+val).remove();
}
/**
 * 异动组件
 */
var ydNum=isNaN(ydOldNum)==false?1:eval(ydOldNum)+1;
function ydAdd(){
	$("#ydBody").append('<tr id="ydTr'+ydNum+'" class="odd">'
						 +'   <td class="text-center">'
						 +'    <span onclick="ydRemove('+ydNum+')" class="glyphicon glyphicon-minus-sign danger"></span>'
						 +'</td>'
						 +' <td class="">'
						 +'     <input id="yd_project_'+ydNum+'" type="text" class="form-control input-sm">'
						 +'</td>'
						 +'<td class=" ">'
						 +'    <input id="yd_from_'+ydNum+'" type="text" class="form-control input-sm">'
						 +'</td>'
						 +' <td class=" ">'
						 +'    <input id="yd_to_'+ydNum+'" type="text" class="form-control input-sm">'
						 +'</td>'
						 +' <td class=" ">'
						 +'			<span class="input-icon icon-right">'
						 +'               <input class="form-control date-picker"'
						 +'                      id="yd_edTime_'+ydNum+'" type="text"'
						 +'                      data-date-format="yyyy-mm-dd"'
						 +'                      placeholder="2016-10-1">'
						 +'               <i class="fa fa-calendar"></i>'
						 +'           </span>'
						 +'</td>'
						 +' <td class=" ">'
						 +'   <input id="yd_bz_'+ydNum+'" type="text" class="form-control input-sm">'
						 +' </td>'
						 +'</tr>');
	$("#yd_edTime_"+ydNum).datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    });
	ydNum++;
}
function ydRemove(val){
	$("#ydTr"+val).remove();
}
/**
 * 教育组件
 */
var jyNum=isNaN(jyOldNum)==false?1:eval(jyOldNum)+1;
function jyAdd(){
	$("#jyBody").append('<tr id="jyTr'+jyNum+'" class="odd">'
						+'    <td class="text-center">'
						+'    <span onclick="jyRemove('+jyNum+')" class="glyphicon glyphicon-minus-sign danger"></span>'
						+'</td>'
						+' <td class="">'
						+'     <input id="jy_school_'+jyNum+'" type="text" class="form-control input-sm">'
						+'</td>'
						+' <td class=" ">'
						+'     <input id="jy_address_'+jyNum+'" type="text" class="form-control input-sm">'
						+' </td>'
						+' <td class=" ">'
						+'    <input id="jy_level_'+jyNum+'" type="text" class="form-control input-sm">'
						+'</td>'
						+'<td class=" ">'
						+'    <input id="jy_zy_'+jyNum+'" type="text" class="form-control input-sm">'
						+'</td>'
						+'<td class=" ">'
						+'			<span class="input-icon icon-right">'
						+'                <input id="jy_stTime_'+jyNum+'" class="form-control date-picker"'
						+'                       id="id-date-picker-6" type="text"'
						+'                       data-date-format="yyyy-mm-dd"'
						+'                      placeholder="2016-10-1">'
						+'                <i class="fa fa-calendar"></i>'
						+'            </span>'
						+' </td>'
						+' <td class=" ">'
						+'			<span class="input-icon icon-right">'
						+'                <input id="jy_edTime_'+jyNum+'" class="form-control date-picker"'
						+'                      id="id-date-picker-5" type="text"'
						+'                       data-date-format="yyyy-mm-dd"'
						+'                       placeholder="2016-10-1">'
						+'                <i class="fa fa-calendar"></i>'
						+'            </span>'
						+'</td>'
						+'</tr>');
	$(".date-picker").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    });
	jyNum++;
}
function jyRemove(val){
	$("#jyTr"+val).remove();
}
/**
 * 工作组件
 * @returns
 */
var gzNum =isNaN(gzOldNum)==false?1:eval(gzOldNum)+1;
function gzAdd(){
	$("#gzBody").append('<tr id="gzTr'+gzNum+'" class="odd">'
                         +'   <td class="text-center">'
                         +'      <span onclick="gzRemove('+gzNum+')" class="glyphicon glyphicon-minus-sign danger"></span>'
                         +'   </td>'
                         +'   <td class="">'
                         +'       <input id="gz_company_'+gzNum+'" type="text" class="form-control input-sm">'
                         +'   </td>'
                         +'   <td class=" ">'
                         +'      <input id="gz_address_'+gzNum+'" type="text" class="form-control input-sm">'
                         +'   </td>'
                         +'   <td class=" ">'
                         +'       <input id="gz_dep_'+gzNum+'" type="text" class="form-control input-sm">'
                         +'   </td>'
                         +'   <td class=" ">'
                         +'      <input id="gz_duty_'+gzNum+'" type="text" class="form-control input-sm">'
                         +'   </td>'
                         +'   <td class=" ">'
                         +'      <input id="gz_yuanyin_'+gzNum+'" type="text" class="form-control input-sm">'
                         +'  </td>'
                         +'  <td class=" ">'
                         +'			<span class="input-icon icon-right">'
                         +'                 <input id="gz_stTime_'+gzNum+'" class="form-control date-picker"'
                         +'                         type="text"'
                         +'                        data-date-format="yyyy-mm-dd"'
                         +'                        placeholder="2016-10-1">'
                         +'                 <i class="fa fa-calendar"></i>'
                         +'             </span>'
                         +' </td>'
                         +' <td class=" ">'
                         +'			<span class="input-icon icon-right">'
                         +'                 <input id="gz_edTime_'+gzNum+'" class="form-control date-picker"'
                         +'                        type="text"'
                         +'                      data-date-format="yyyy-mm-dd"'
                         +'                      placeholder="2016-10-1">'
                         +'               <i class="fa fa-calendar"></i>'
                         +'           </span>'
                         +' </td>'
                         +'</tr>');
	$(".date-picker").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: 2
    });
	gzNum++;
}
function gzRemove(val){
	$("#gzTr"+val).remove();
}
var buttonChoose = 1;
/**
 * 初始化树形结构
 * @returns
 */
function initAddress(){
	
	$("#province2").change(function(){
		city(this.value);
	});
	$("#city2").change(function(){
		district(this.value);
	});
	province();
}
function province(){
	document.getElementById("city2").options.length=0; 
	document.getElementById("district2").options.length=0;
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":0},
		dataType:"json",
		async:true,
		success:function(data){
			var opt = '';
			for (var i = 0; i < data.length; i++) {
				if (data[i].addressId == pr) {
					opt += "<option value=" + data[i].addressId + " selected>" + data[i].fullName + "</option>";
				} else {
					opt += "<option value=" + data[i].addressId + ">" + data[i].fullName + "</option>";
				}
            }
            $("#province2").html('<option value="">--请选择--</option>' + opt);
			city(pr);
		}
	})
}
function city(val){
	document.getElementById("city2").options.length=0; 
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":val},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.length>0){
				for(var i=0;i<data.length;i++){
					var o = new Option(data[i].fullName,data[i].addressId);
					if(data[i].addressId == ci){
						o.selected = true;
					}
					document.getElementById("city2").options.add(o);
				}
				district(ci);
			}else{
				document.getElementById("district2").options.length=0;
				document.getElementById("district2").options.add(new Option());
			}
		}
	})
}
function district(val){
	document.getElementById("district2").options.length=0;
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":val},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.length>0){
				for(var i=0;i<data.length;i++){
					var o = new Option(data[i].fullName,data[i].addressId);
					if(data[i].addressId == co){
						o.selected = true;
					}
					document.getElementById("district2").options.add(o);
				}
			}else{
				document.getElementById("district2").options.add(new Option());
			}
		}
	})
}
/**
 * 加载联动插件
 * @returns
 */
function initPlugins(){
	compny();
}
/**
 * 公司
 * @returns
 */
function compny(){
	$("#company_id option").remove();
	$.ajax({
		url:ctx+"/user/ajaxLoadCompny",
		type:"post",
		dataType:"json",
		success:function(data){
			for(var i=0;i<data.length;i++){
				$("#company_id").append("<option value='"+data[i].departmentId+"'>"+data[i].fullName+"</option>");
			}
			if(data.length>0){
				department(data[0].departmentId);
			}
		}
	});
}

/**
 * 部门
 * @returns
 */
function department(val){
	$("#department_id option").remove();
	$.ajax({
		url:ctx+"/user/ajaxLoadDepartment",
		type:"post",
		data:{
			parentId:val
		},
		dataType:"json",
		success:function(data){
			for(var i=0;i<data.length;i++){
				$("#department_id").append("<option value='"+data[i].departmentId+"'>"+data[i].fullName+"</option>");
			}
		}
	});
}
