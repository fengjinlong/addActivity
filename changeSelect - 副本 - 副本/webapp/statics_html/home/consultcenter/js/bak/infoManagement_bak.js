$(function () {
    $(".phoneBelong").on({
        focus: function () {
            $('.attribution').show();
        },
        click: function () {
            $('.attribution').show();
        },
    });
    $('.addInquiries').on('hidden.bs.modal', function () {
        $("#city,#province,#departmentId1,#projectId,#inquiries input:hidden,#inquiries textarea:hidden").val("");
        $("#city,#province,#departmentId1,#projectId").trigger("chosen:updated");
        $('#inquiries')[0].reset();
        editor.html('');
        $('#inquiries .selectpicker').selectpicker('refresh');
        $('#inquiries').data('bootstrapValidator').resetForm();
    })
    //全选
    $('#infoManage thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#infoManage tbody .slaver').prop('checked', true);
        }else{
            $('#infoManage tbody .slaver').prop('checked', false);
        }
    })

    //时间初始化
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };
    //期待回访日期
    $(".recordnexttime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        startDate: new Date()
    });

    //电话归属地获取值
    function chose_get_value(select) {
        return $(select).val();
    }

    //电话归属地获取选中的文本
    function chose_get_text(select) {
        return $(select + " option:selected").text();
    }

    function phoneBelong(parentEle) {
        $(parentEle).find('.attribution .confirm-btn').click(function () {
            if (chose_get_value(parentEle + ' #province') != 0 && chose_get_value(parentEle + ' #city') != 0) {
                $(parentEle).find('.phoneBelong').val(chose_get_text(parentEle + ' #province') + chose_get_text(parentEle + ' #city'));
                $(parentEle).find('.attribution').fadeOut();
            }
        });
        $(parentEle).find('.attribution .cancel-btn').click(function () {
            $(parentEle).find('.attribution').fadeOut();
        });

    }

    //咨询者类型为在线有效时，对话记录为必填项
    $("#studentAttrId2").change(function () {
        if ($("#studentAttrId2").find("option:selected").text() == "在线有效") {
            $("#talk").addClass("control-label mandatory").html("*");
            $("#talk").parent().removeClass("padding-right-5");
        } else {
            $("#talk").removeClass("control-label mandatory").html("");
            $("#talk").parent().addClass("padding-right-5");
        }
    })

    //创建咨询量
    phoneBelong('#addInquiries');

    //日期控件
    $('#reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
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

    //日期确定按钮
    $('#reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });

    //初始化分校select （信息归属地）
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
            $("#departmentId1").html('<option value="">--请选择--</option>' + opt);
            $('#departmentId1').trigger('chosen:updated');
            $("#departmentId1").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化招生品牌
    $.ajax({
        url: ctx + '/bizBrand/getAllOption',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
            }
            $("#brandId").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化咨询者类型
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 2, enable:1},
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
        data: {attrType: 1, enable:1},
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
    
    
    //DMW添加，初始产品类型
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+">" + data[i].modelName + "</option>";
            }
            $("#product_model").html('<option value="">--请选择--</option>' + zxkc);
            $('#product_model').trigger('chosen:updated');
            $("#product_model").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
  //将从后台得到的表名进行处理得到符合bean中字段格式的字符串，1.剔除_,2.后面的首字母大写
    function nameHandler(str) {
      var array = str.toLowerCase().split("_");
      //如果表名为单个单词，即没有_，就返回自身
      if(array.length>1) {
    	  //循环从1开始，因为第一个单词不需要进行首字母大写处理
    	  for (var i = 1; i < array.length; i++){
    		  //每个单词，首字母大写处理
    		  array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
    	  }
    	  var string = array.join("");
    	  return string;
      } else {
    	  return str;
      }
    }
    
    
    //DMW添加，根据产品类型的选择，动态创建课程信息部分，其它下拉框
    $("#product_model").change(function(){
    	//产品模型发生改变，制空产品下拉框
    	clearProduct();
    	//得到选中的option的Json信息
    	var jsonObj = $('#product_model :selected').data("value");
    	//如果当前模型下没有配置选项
    	if(jsonObj=="undefined") {
    		//清除上次选择后生成的下拉框
        	$(".removeFlag").parent().parent().remove();
    		return;
    	}
    	//得到产品类型ID
    	var modelId = $('#product_model :selected').val();
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
	                + '            <select name="'+nameHandler(enName)+'Id" id="'+enName+'" onchange="clearProduct()" class="form-control removeFlag chosen-select" data-live-search="true">'
	                + '            </select>'
	                + '			   <input type="hidden" name="'+nameHandler(enName)+'Name" class="projectInfoManager" />'		
	                + '        </div>'
	                + '</div>';
    		//将新增的下拉框拼接到产品类型下拉框后面
    		$("#product_model").parent().parent().after(str);
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
	            	$('#'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
	            	//加载下拉框样式
	            	$('#'+data[i].tableName).trigger('chosen:updated');
	            	$("#"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
	            	$('.chosen-container').width('100%');
	            }
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
    });
    
    
    
    //初始化电话归属地（省）
    $.ajax({
        url: ctx + '/address/getAllOption',
        type: 'POST',
        data: {level: 1},
        dataType: 'json',
        success: function (data) {
            var sheng = "";
            for (var i = 0; i < data.list.results.length; i++) {
                sheng += "<option value=" + data.list.results[i].addressId + ">" + data.list.results[i].fullName + "</option>";
            }
            $("#province").html('<option value="0">--请选择--</option>' + sheng);
            $('#province').trigger('chosen:updated');
            $("#province").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化电话归属地（市）
    $('#province').change(function () {
        var addressId = $('#province :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.results.length; i++) {
                    shi += "<option value=" + data.list.results[i].addressId + ">" + data.list.results[i].fullName + "</option>";
                }
                $("#city").html('<option value="0">--请选择--</option>' + shi);
                $('#city').trigger('chosen:updated');
                $("#city").chosen({no_results_text: "没有匹配项"});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    
  //当产品部分的下拉框发生改变时，需要制空产品下拉框
    clearProduct = function() {
    	$("#productId").html("");
    	generateProduct();//开始根据课程信息部分当前选中条件生成产品选项
    	$("#productId").trigger('chosen:updated');
    	$("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
    	$('.chosen-container').width('100%');
		//debugger;
	}
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
	 * 条件参数添加
	 */
	/**
	 * 搜索日期参数添加
	 */
    var beganAndEnd = $("#reservation").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" - ")[0]) + ' 00:00:00';
        var maxDate = trim(beganAndEnd.split(" - ")[1]) + ' 59:59:00';
        aoData.push({"name": "beginTime", "value": minDate});
        aoData.push({"name": "endTime", "value": maxDate});
    }
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
    /**
	 * 单选框，筛选值添加
	 */
    var val = $("input[name^='allocationStatus']:checked").val();
    if (!val == '') {
        aoData.push({"name": "allocationStatus", "value": val});
    } else {
        aoData.push({"name": "allocationStatus", "value": -1});
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
    $('.dataTables_info').parent().append($('.dataTables_length'));
}

function deleteInfoManage(id) {
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
        var infoManageId = id;
        $.ajax({
            url: ctx + '/consultInfoManage/updateRecord',
            type: 'POST',
            data: {
                infoManageId: infoManageId,
                deleteMark: 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    DataTable.init();
                } else {
                    toastr.error(data.msg);
                }
            }
        });
    });
}
/**
 * 点击查看，弹出表单，回显信息(注意这里只查看，不修改)
 */
$('#infoManage').on('click', '.edit', function () {
	$('#viewInfo').modal('show');
    var record = $(this).data('record');
    
    //学生信息部分回显
    $('#studentNameView').val(record.studentName);//姓名
    $('#studentPhoneView').val(record.studentPhone);//电话
    $('#studentSexView').val(record.studentSex ? "女" : "男");//性别
    $('#wechatView').val(record.weChat);//微信
    $('#ageView').val(record.age);//年龄
    $('#tengXunView').val(record.tengXun);//QQ
    
    //咨询信息部分回显
    $('#departmentName1View').val(record.departmentName1);//信息归属地
    $('#phoneBelongView').val(record.phoneBelong);//电话归属地
    $('#brandNameView').val(record.brandName);//招生品牌
    $('#studentAttrName2View').val(record.studentAttrName2);//咨询者类型
    $('#studentAttrName1View').val(record.studentAttrName1);//媒体类型
    $('#keywordView').val(record.keyword);//关键词
   
    
    //课程信息部分回显
    $('#projectNameView').val(record.projectName);//咨询课程
    $('#highestEducationView').val(record.studentAttrName3);//最高学历
   
    $('#majorNameView').val(record.byZy);//专业
//    $('#nationView').val(record.nation);//
//    $('#emergencyContactView').val(record.emergencyContact);//
//    $('#emergencyContactModeView').val(record.emergencyContactMode);//
    $('#teachingFormNameView').val(record.teachingFormName);//授课形式
    $('#educationFormNameView').val(record.educationFormName);//教育形式
    $('#graduateInstitutionsView').val(record.schoolName);//院校
    $('#productNameView').val(record.productName);//产品
    $('#productModelNameView').val(record.productModelName);//产品模型
    
    $('#notesView').val(record.notes);//备注
    $('#conversation2').val(record.conversation);//对话记录
    $('#pageUrlView').val(record.pageUrl);//对话页面链接
    $('#recordnexttimeView').val(record.recordNextTime);//期待回放日期
//
//    if(record.studentMaturity==1){
//    	$('#studentMaturityView').val('A');
//    }else if(record.studentMaturity==2){
//    	$('#studentMaturityView').val('B');
//    }else if(record.studentMaturity==3){
//    	$('#studentMaturityView').val('C');
//    }else{
//    	$('#studentMaturityView').val('D');
//    }
//    $('#studentMaturityView').val(record.studentMaturity);
    
//    debugger;

    editor2.html(record.conversation);



})

//DMW删除，添加信息量时需求1：根据录入的电话号抓取数据，如成功，学员信息其他一律不得编辑，反之，则可填写

//创建咨询量
$('#addInquiries').on('show.bs.modal', function () {
	$('#inquiries input').attr('readonly',false);
	$('#inquiries slect').attr('disabled',false);
})
//表单验证
$('#inquiries').bootstrapValidator({
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
            }
        },
        age: {
            validators: {
                regexp: {
                    regexp: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
                    message: '年龄必须为数字'
                },
            }
        },
        product_model: {
            validators: {
                notEmpty: {
                    message: '产品类型不能为空'
                }
            }
        }
    },
    submitHandler: function (validator, form, submitButton) {
        var productModelId = $('#product_model :selected').val();
        if (productModelId == null || productModelId == "") {
            toastr.error("请选择产品模型!");
            return;
        }
        var productId = $('#productId :selected').val();
        if (productId == null || productId == "") {
            toastr.error("请选择产品!");
            return;
        }
        //得到信息归属地的name值
        $("#departmentName1").val($("#departmentId1 :selected").text());
        //得到电话归属地的省市name值
        $("#phoneProvinceName").val($("#province :selected").text());
        $("#phoneCityName").val($("#city :selected").text());
        //得到品牌的name值
        $("#brandName").val($("#brandId :selected").text());
        //得到咨询者类型的name值
        $("#studentAttrName2").val($("#studentAttrId2 :selected").text());
        //得到媒体来源的name值
        $("#studentAttrName1").val($("#studentAttrId1 :selected").text());
        
        
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
        	//debugger;
        });
       //得到产品的name值
        $("#productName").val($("#productId :selected").text());
        
        var options = form.serialize();
	    $.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/addNewRecord',
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


//dmw-页面生产产品按钮功能
function generateProduct() {
	//存放条件
	var conditionArray = new Array();
	$(".counselCurriculum select :selected").each(function(index,obj){
		//得到option的value即id值
		var idValue = $(obj).val();
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			var primaryIdName = $(obj).parent().prop("id")+"_id";
			var primaryIdValue = "'"+idValue+"'";
			//形如XXX_id = 'YYY'
			var condition = primaryIdName + "=" + primaryIdValue;
			conditionArray.push(condition);
		}
	});
	var conditions = conditionArray.join(" and ");
	
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
            	 }
            	 $("#productId").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#productId").trigger('chosen:updated');
            	 $("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

//全选
$(document).on('change', 'input:checkbox.checkAll', function(){
	if($(this).prop('checked')){
		$('input:checkbox.slaver').prop('checked', 'checked');
	}else{
		$('input:checkbox.slaver').prop('checked', '');
	}
})

//导出excel文件
function exportExcel() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultInfoManage/exportExcel?infoManageIds="+chk_value;
}

//导出PDF文件
function exportPDF() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据"); 
	        return false;
	}
	window.location.href = ctx + "/consultInfoManage/exportPDF?infoManageIds="+chk_value;
}

//导出CSV文件
function exportCSV() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultInfoManage/exportCSV?infoManageIds="+chk_value;
}

//关闭弹窗同时关闭电话归属地
$('#addInquiries').on('hide.bs.modal', function () {
	$('#addInquiries .attribution').css('display','none');
})
