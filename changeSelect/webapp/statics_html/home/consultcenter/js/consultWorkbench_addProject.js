$(function(){
	//待沟通tab新增咨询量弹框
	$('#newAdd').click(function () {
	    $('.addInquiries').toggle();
	    $('#inquiries').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
	    $('#addprovince').val('');
	    $('#addcity').val('');
	    //富文本编辑器-对话记录清空
	    conversation.html('');
	    //更新下拉框选择
	    $('.chosen-select').trigger('chosen:updated');
	    //新增页面下拉框初始化
	    addinit();
	    //清除bootstrapValidator的校验结果
	    $('#inquiries').data('bootstrapValidator').resetForm();
	});
})


//电话归属地-选中之后确定操作
function addphoneBelong(parentEle) {
    $(parentEle).find('.attribution .confirm-btn').click(function () {
        if ($(parentEle).find('.addprovince :selected').val() != "0" && $(parentEle).find('.addcity :selected').val() != "0") {
            $(parentEle).find('.phoneBelong').val($(parentEle).find('.addprovince :selected').text() + $(parentEle).find('.addcity :selected').text())
            $(parentEle).find('.attribution').hide();
        }
        if (chose_get_value(parentEle + ' #addprovince') != 0 && chose_get_value(parentEle + ' #addcity') != 0) {
            $(parentEle).find('.phoneBelong').val(chose_get_text(parentEle + ' #addprovince') + chose_get_text(parentEle + ' #addcity'));
            $(parentEle).find('.attribution').fadeOut();
        }
    });
    $(parentEle).find('.attribution .cancel-btn').click(function () {
        $(parentEle).find('.attribution').hide();
    });
}

////新增咨询量
function addinit() {
    $(".phoneBelong").on({
        focus: function () {
            $('#secondDivCity').show();
        },
        click: function () {
            $('#secondDivCity').show();
        },
    });
    
  //初始化电话归属地（省）-新增咨询量弹框部分
    $.ajax({
        url: ctx + '/address/getAllOption',
        type: 'POST',
        data: {level: 1},
        dataType: 'json',
        success: function (data) {
            var sheng = "";
            for (var i = 0; i < data.list.length; i++) {
                sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
            }
//             
            $("#addprovince").html('<option value="0">--请选择--</option>' + sheng);
            $('#addprovince').trigger('chosen:updated');
            $("#addprovince").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化电话归属地（市）-新增咨询量弹框部分
    $('#addprovince').change(function () {
        var addressId = $('#addprovince :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#addcity").html('<option value="0">--请选择--</option>' + shi);
                $('#addcity').trigger('chosen:updated');
                $("#addcity").chosen({no_results_text: "没有匹配项"});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

        //创建咨询量时初始化电话归属地
        addphoneBelong('#addInquiries');

        //重复电话添加新咨询课程
        addphoneBelong('#addRepeatedPhone');

        //初始化分校select-新增咨询量弹框部分
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {type: 3},
            dataType: 'json',
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.list.length; i++) {
                    opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
                }
                $("#adddepartmentId1").html('<option value="">--请选择--</option>' + opt);
                $('#adddepartmentId1').trigger('chosen:updated');
                $("#adddepartmentId1").chosen({no_results_text: "没有匹配项"});
                $('.chosen-container').width('100%');
                /*$("#adddepartmentId12").html('<option value="">--请选择--</option>'+opt);*/
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化咨询者类型
        $.ajax({
            url: ctx + '/studentAttr/getAllOption',
            type: 'POST',
            data: {attrType: 2,enable:1},
            dataType: 'json',
            success: function (data) {
                var zxz = "";
                for (var i = 0; i < data.list.length; i++) {
                    zxz += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
                }
                $("#studentAttrId2").html('<option value="">--请选择--</option>' + zxz);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化媒体来源类型
        $.ajax({
            url: ctx + '/studentAttr/getAllOption',
            type: 'POST',
            data: {attrType: 1,enable:1},
            dataType: 'json',
            success: function (data) {
                var mt = "";
                for (var i = 0; i < data.list.length; i++) {
                    mt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
                }
                $("#studentAttrId1").html('<option value="">--请选择--</option>' + mt);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化学历
        $.ajax({
            url: ctx + '/studentAttr/getAllOption',
            type: 'POST',
            data: {attrType: 3,enable:1},
            dataType: 'json',
            success: function (data) {
                var xl = "";
                for (var i = 0; i < data.list.length; i++) {
                    xl += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
                }
                $("#studentAttrId3").html('<option value="">--请选择--</option>' + xl);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始新增咨询量弹框-初始产品模型option
        $.ajax({
            url: ctx + '/consultInfoManage/selectProductModel',
            type: 'POST',
            dataType: 'json',
            success: function (data) { 
                var zxkc = "";
                for (var i = 0; i < data.length; i++) {
                    zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
                }
                $("#addProductModel").html('<option value="">--请选择--</option>' + zxkc);
                $('#addProductModel').trigger('chosen:updated');
                $("#addProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        
        //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
        $("#addProductModel").change(function(){
        	//2018/1/8新增，必须先选择信息量归属地，再选择课程信息
        	var departmentId = $("#adddepartmentId1").val();
        	if(departmentId==null ||　departmentId=='') {
        		$("#addProductModel").val('');//还原产品模型信息
        		$("#addProductModel").trigger("chosen:updated");
        		toastr.error("必须先确定信息量归属地，再设置课程信息");
        		return;
        	}
        	//产品模型发生改变，制空产品下拉框
        	clearAddProduct();
        	//得到选中的option的Json信息
        	var jsonObj = $('#addProductModel :selected').data("value");
        	var showList = $('#addProductModel :selected').data("showList");
        	 
        	//如果当前模型下没有配置选项
        	if(jsonObj==null || typeof(jsonObj)=="undefined" || $(jsonObj).length==0) {
        		//清除上次选择后生成的下拉框
            	$(".removeFlag").parent().parent().remove();
        		return;
        	}
        	//得到产品类型ID
        	var modelId = $('#addProductModel :selected').val();
        	//清除上次选择后生成的下拉框
        	$(".removeFlag").parent().parent().remove();
        	//用来组装表名
        	var tableArray = new Array();
        	//开始构造最新的拼接结果
        	for(var i=0; i<jsonObj.length; i++) {
        		var enName = jsonObj[i].enName;
        		var chName = jsonObj[i].chName;
        		tableArray.push(enName);
        		//开始拼接
        		var str = '<div class="form-group col-md-4 col-sm-6">'
    	                + '       <label class="control-label col-sm-5 no-padding-right">'+chName+'</label>'
    	                + '       <div class="col-sm-7 no-padding-right">'
    	                + '            <select name="'+nameHandler(enName)+'Id" id="add'+enName+'" onchange="clearAddProduct()" data-value="'+enName+'" class="form-control removeFlag chosen-select" data-live-search="true">'
    	                + '            </select>'
    	                + '			   <input type="hidden" name="'+nameHandler(enName)+'Name" class="projectInfoManager" />'		
    	                + '        </div>'
    	                + '</div>';
        		//将新增的下拉框拼接到产品类型下拉框后面
        		$("#addProductModel").parent().parent().after(str);
        		//根据表名和产品类型，关联product表，开始构造option
        	}
        	var tableName = tableArray.join("---");
        	 
        	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
    		$.ajax({
    	        url: ctx + '/consultInfoManage/selectOptionByTable',
    	        type: 'POST',
    	        dataType: 'json',
    	        data: {"tableName":tableName,"modelId":modelId},
    	        success: function (data) {
    	            if(data==null || data.length==0) {
    	            	return;
    	            }
    	            for (var i = 0; i < data.length; i++) {
    	            	var zxkc = "";
    	            	for(var j=0; j<data[i].dataList.length; j++) {
    	            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
    	            	}
    	            	$('#add'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
    	            	//加载下拉框样式
    	            	$('#add'+data[i].tableName).trigger('chosen:updated');
    	            	$("#add"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
    	            	$('.chosen-container').width('100%');
    	            }
    	        },
    	        error: function (response) {
    	            toastr.error("系统错误");
    	        }
    	    });
        });
        
        //初始化电话归属地（省）-新增咨询量弹框部分
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 1},
            dataType: 'json',
            success: function (data) {
                var sheng = "";
                for (var i = 0; i < data.list.length; i++) {
                    sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#addprovince").html('<option value="0">--请选择--</option>' + sheng);
                $('#addprovince').trigger('chosen:updated');
                $("#addprovince").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        //初始化电话归属地（市）-新增咨询量弹框部分
        $('#addprovince').change(function () {
            var addressId = $('#addprovince :selected').val();
            $.ajax({
                url: ctx + '/address/getAllOption',
                type: 'POST',
                data: {level: 2, addressId: addressId},
                dataType: 'json',
                success: function (data) {
                    var shi = "";
                    for (var i = 0; i < data.list.length; i++) {
                        shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                    }
                    $("#addcity").html('<option value="0">--请选择--</option>' + shi);
                    $('#addcity').trigger('chosen:updated');
                    $("#addcity").chosen();
                    $('.chosen-container').width('100%');
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
        
    //新增咨询量页面提交功能
    $('#inquiries').bootstrapValidator({
    	message: 'This value is not valid',
        fields: {
            studentPhone: {
                validators: {
                    notEmpty: {
                        message: '电话不能为空'
                    },
                    regexp: {
                        regexp: /^(13[0-9]|15[0|2|1|3|6|7|8|9]|18[8|9])\d{8}$/,
                        message: '请填写正确的电话号码'
                    }
                }
            },
            brandId: {
                validators: {
                    notEmpty: {
                        message: '招生品牌不能为空'
                    },
                }
            },
            studentAttrId2: {
                validators: {
                    notEmpty: {
                        message: '咨询者类型不能为空'
                    },
                }
            },
            studentAttrId1: {
                validators: {
                    notEmpty: {
                        message: '媒体来源不能为空'
                    },
                }
            },
            keyword: {
                validators: {
                    notEmpty: {
                        message: '关键词不能为空'
                    },
                }
            },
            tengXun: {
                validators: {
                    regexp: {
                        regexp: /^[0-9]*$/,
                        message: 'qq号只有数字组成'
                    }
                }
            },
            studentName: {
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
//        		        regexp: {
//        		            regexp: /^([\u4e00-\u9fa5]){2,7}$/,
//        		            message: '姓名必须为汉字'
//        		        }
                }
            },
            age: {
                validators: {
                    regexp: {
                        regexp: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
                        message: '年龄必须为数字'
                    },
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            var productModelId = $('#addProductModel :selected').val();
            if (productModelId == null || productModelId == "") {
                toastr.error("请选择产品模型!");
                return;
            }
            var productId = $('#addProductId :selected').val();
            if (productId == null || productId == "") {
                toastr.error("请选择产品!");
                return;
            }
            
            var phoneBelong = $('#inquiries :input[name="phoneBelong"]').val();
    		if (phoneBelong == null || phoneBelong == "") {
              toastr.error("请选择电话归属地!");
              return;
    		}
    		
    		var recordNextTime = $('#inquiries :input[name="recordNextTime"]').val();
    		if (recordNextTime == null || recordNextTime == "") {
    			toastr.error("请填写期待回访日期!");
    			return;
    		}
            //得到信息归属地的name值
            $("#addDepartmentName1").val($('#adddepartmentId1 :selected').text());
            //得到电话归属地的省市name值
            $("#addPhoneProvinceName").val($("#addprovince :selected").text());
            $("#addPhoneCityName").val($("#addcity :selected").text());
            //得到品牌的name值
            $("#addBrandName").val($("#brandId :selected").text());
            //得到咨询者类型的name值
            $("#addStudentAttrName2").val($("#studentAttrId2 :selected").text());
            //得到媒体来源的name值
            $("#addStudentAttrName1").val($("#studentAttrId1 :selected").text());
            
            
            //获取产品部分动态生成的下拉框的name值
            $(".counselCurriculum select :selected").each(function(index, obj){
            	//获取选中的option的name值
            	var name = $(obj).text();
            	if(name!=null&&name!=''&&name!='--请选择--') {
            		//得到与该下拉框选中option处于同一div下的input对象，option-select-div-input
            		var inputObj = $(obj).parent().parent().find("input.projectInfoManager");
            		//将name值赋值到input中
            		$(inputObj).val(name);
            	} 
            	// 
            });
           //得到产品的name值
            $("#addProductName").val($("#addProductId :selected").text());
            
            var options = form.serialize();
            options += "&status=2&pimLevel=0";//在待沟通页面创建的咨询量默认就是待沟通,并且是顶级产品
            
	    $.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/addNewRecord',
	      data: options,
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	        	  $('#addInquiries').modal('hide');
	        	  $(".modal-backdrop").remove();//移除所有遮罩层
	              init();
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
}

//当产品部分的下拉框发生改变时，需要制空产品下拉框——新增咨询量页面部分
function clearAddProduct() {
	$("#addProductId").html("");//清空原来addproduct生成的option
	generateAddProduct();//开始根据课程信息部分当前选中条件生成产品选项
	$("#addProductId").trigger('chosen:updated');
	$("#addProductId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	// 
	//2017/11/20添加，清空考期下拉选旧数据;
	$('#kTime').html('');
	$('#kTime').trigger('chosen:updated');
	$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
}

//课程信息部分每次下拉框发生改变时调用此方法-用来实时生成相应产品
function generateAddProduct() {
	//存放条件
	var conditionArray = new Array();
	$(".counselCurriculum select :selected").each(function(index,obj){
		//得到option的value即id值
		var idValue = $(obj).val();
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			var primaryIdName = $(obj).parent().data("value")+"_id";
			var primaryIdValue = "'"+idValue+"'";
			//形如XXX_id = 'YYY'
			var condition = primaryIdName + "=" + primaryIdValue;
			conditionArray.push(condition);
		}
	});
	var conditions = conditionArray.join(" and ");
	var departmentId = $("#adddepartmentId1").val();//取得选中的信息归属地id
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions,departmentId:departmentId},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
            	 }
            	 $("#addProductId").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#addProductId").trigger('chosen:updated');
            	 $("#addProductId").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

$('#addProductId').change(function(){
	var showList = $(this).find("option:selected").attr("showList");
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;
		for(var p in showList){
			aiId = p.replace("_id","Id");
			$('select[name='+aiId+']').val(showList[p]);
			$('select[name='+aiId+']').trigger('chosen:updated');
		}
	}
});


//新增待沟通页面弹出后，学员信息可以编辑
$('.addInquiries').on('show.bs.modal', function () {
	$(this).find("select,input").prop("disabled",false).removeAttr("readOnly");
	$(this).find(".comment_disabled").removeClass("comment_disabled");
	$(this).find(".chosen-disabled").removeClass("chosen-disabled");
	//初始化名族
	 $('#nations').trigger('chosen:updated');
     $("#nations").chosen({no_results_text: "没有匹配项"});
    
     //还原课程信息部分
//     $("#addProductModel").val("");
//     $('#addProductModel').trigger('chosen:updated');
//     $("#addProductModel").chosen({no_results_text: "没有匹配项"});
//     $("#addProductModel").trigger("change");
//     $('.chosen-container').width('100%');
     
//     $("#addProductId").html("");
////     $('#addProductId').trigger('chosen:updated');
////     $("#addProductId").chosen({no_results_text: "没有匹配项"});
//      
//     $(".counselCurriculum").find(".removeFlag").remove();
})

////2018/1/8新增信息量归属地select发生变化重置课程信息
$("#adddepartmentId1").change(function(){
	//清除选择产品模型后生成的课程信息下拉选
	$(".removeFlag").parent().parent().remove();
	//重置产品模型选项为空
	$("#addProductModel").val('');
	$("#addProductModel").trigger("chosen:updated");
	//清空产品下拉选
	$("#addProductId").html("");
	$("#addProductId").trigger("chosen:updated");
});