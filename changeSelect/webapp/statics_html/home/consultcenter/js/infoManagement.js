//默认显示前7天的数据
var dateObj = new Date();
var endDate = dateObj.getFullYear()+'-'+((dateObj.getMonth()+1)<10?"0"+(dateObj.getMonth()+1):(dateObj.getMonth()+1))+'-'+(dateObj.getDate()<10?"0"+dateObj.getDate():dateObj.getDate());              
 
dateObj.setDate(dateObj.getDate()-7);//当前时间减去7天
var startDate = dateObj.getFullYear()+'-'+((dateObj.getMonth()+1)<10?"0"+(dateObj.getMonth()+1):(dateObj.getMonth()+1))+'-'+(dateObj.getDate()<10?"0"+dateObj.getDate():dateObj.getDate());
$("#reservation").val(startDate+' - '+endDate);

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
        
        //打开弹窗同时打开电话归属地
//        $('#addInquiries .attribution').css('display','block');
    })
    
    //关闭弹窗同时关闭电话归属地
	$('#addInquiries').on('hide.bs.modal', function () {
		$('#addInquiries .attribution').css('display','none');
	})
	//点击电话归属地框同时展示电话归属地省市信息
	$("#phoneBelong").click(function(){
		 
		$('#addInquiries .attribution').css('display','block');
	});
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
        data:{enable:1},
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
                zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
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
    	var departmentId = $("#departmentId1").val();//信息量归属地id
    	if(departmentId==null || departmentId=='') {
    		toastr.error("请先选择信息量归属地，再选择课程信息");
    		//清空product_model选项
    		$("#product_model").val('');
    		$("#product_model").trigger("chosen:updated");
    		return;
    	}
    	//产品模型发生改变，制空产品下拉框
    	clearProduct();
    	//得到选中的option的Json信息
    	var jsonObj = $('#product_model :selected').data("value");
    	//如果当前模型下没有配置选项
    	if(jsonObj=="undefined" || $(jsonObj).length==0) {
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
	                + '            <select name="projectMap[\''+enName+'_id\']" id="'+enName+'" onchange="clearProduct()" class="form-control removeFlag chosen-select" data-live-search="true">'
	                + '            </select>'
	                + '			   <input type="hidden" name="projectMap[\''+enName+'_name\']" class="projectInfoManager" />'		
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
        data: {level: 1,enable:1},
        dataType: 'json',
        success: function (data) {
            var sheng = "";
            for (var i = 0; i < data.list.length; i++) {
                sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
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
            data: {level: 2, addressId: addressId,enable:1},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
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
		// 
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
}

function deleteInfoManage(infoManageId, productId) {
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
            url: ctx + '/consultInfoManage/deleteRecord',
            type: 'POST',
            data: {
                infoManageId: infoManageId,
                productId:productId
//                deleteMark: 0
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
    $('#productModelNameView').val(record.productModelName);//产品模型
    $('#productNameView').val(record.productName);//产品
    
    
//    $('#projectNameView').val(record.projectName);//咨询课程
//    $('#highestEducationView').val(record.studentAttrName3);//最高学历
//    $('#majorNameView').val(record.byZy);//专业
//    $('#teachingFormNameView').val(record.teachingFormName);//授课形式
//    $('#educationFormNameView').val(record.educationFormName);//教育形式
//    $('#graduateInstitutionsView').val(record.schoolName);//院校
  //清除上次选择后生成的下拉框
    $(".removeFlag").parent().parent().remove();
    backValue(record);//开始动态回显课程信息
    
      
    $('#notesView').val(record.notes);//备注
    $('#conversation2').val(record.conversation);//对话记录
    $('#pageUrlView').val(record.pageUrl);//对话页面链接
    $('#recordnexttimeView').val(record.recordNextTime);//期待回放日期

    editor2.html(record.conversation);

});

//用于回显课程部分信息
function backValue(record) {
	//1.初始产品模型-得到需要展示的选项
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
            	if(data[i].modelId==record.productModelId) {
            		//得到需要展示的选项
            		$('#productModelNameView').data("value",data[i].JsonDetail);
            	} 
            }
          //2.产品模型初始化完成后，得到需要展示的选项后，开始生成产品列表
            getInput(record);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

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

//开始生成产品列表
function getInput(record) {
    var jsonObj = $('#productModelNameView').data("value");//得到选中的option的Json信息
     debugger;
    //如果当前模型下没有配置选项
	if(jsonObj=="undefined" || jsonObj==null || jsonObj=='') {
		return;
	}
	jsonObj = JSON.parse(jsonObj);
	if(jsonObj.length==0) {
		return;
	}
	//得到产品类型ID
	var modelId = record.productModelId;
	//用来组装表名
	var tableArray = new Array();
	//健壮性判断，如果没有取到产品模型对象jsonObj，直接return，结束方法
	if(null==jsonObj ||　typeof(jsonObj)=="undefined") {
		return ;
	}
	//开始构造最新的拼接结果
	for(var i=0; i<jsonObj.length; i++) {
		var enName = jsonObj[i].enName;
		var chName = jsonObj[i].chName;
		tableArray.push(enName);  
		//开始拼接 
		var str = '<div class="form-group col-md-4 col-sm-6">'
                + '       <label class="control-label col-sm-5 no-padding-right">'+chName+'</label>'
                + '       <div class="col-sm-7 no-padding-right">'
                + '            <select disabled name="'+nameHandler(enName)+'Id" id="'+enName+'" class="form-control removeFlag chosen-select">'
                + '            </select>'
                + '        </div>'
                + '</div>';
		//将新增的下拉框拼接到产品类型下拉框后面
		$("#productModelNameView").parent().parent().after(str);
		//根据表名和产品类型，关联product表，开始构造option
	}
	var tableName = tableArray.join("---");
	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
	//3.开始产生生成的input的value
	getInputValue(tableName,modelId,record.productId,record.infoManageId);
}

//开始产生生成的input的value
function getInputValue(tableName,modelId,productId,infoManageId) {
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
            //如果productId不为空，在上一步所有选项查询出来后，再做回显
            if(productId!="") {
            	$.ajax({
            		"type": "Post",
            		"url": ctx + '/consultInfoManage/selectOptionValue',
            		"dataType": "json",
            		"data": {"productId":productId, "infoManageId":infoManageId},
            		"success": function (data) {
            			for(var k=0; k<data.length; k++) {
            				var tableName2 = data[k].columnName;
            				//去掉字段英文名后面的_id
            				tableName2 = tableName2.substring(0,tableName2.length-3);
            				$('#'+tableName2).val(data[k].columnValue);//回显
            				$('#'+tableName2).chosen();
            				$('#'+tableName2).trigger("chosen:updated");
            				//$('.selectpicker').selectpicker('refresh');
            				 
            			}
            			
            			//4.回显也完成后，再将其他空的select给remove掉
            			$("select.removeFlag").each(function(index,obj){
            				if($(obj).val()==null || $(obj).val()=='') {
            					$(obj).parent().parent().remove();
            				}
            			}); 
            		}
            	});
            }
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}


//DMW删除，添加信息量时需求1：根据录入的电话号抓取数据，如成功，学员信息其他一律不得编辑，反之，则可填写

//创建咨询量
$('#addInquiries').on('show.bs.modal', function () {
	$('#inquiries input').attr('readonly',false);
	$('#inquiries select').attr('disabled',false);
});
//清空上次选择信息
$('.increase').on('click', function () {
	$("#productId").val(null);//清空产品回显
	$("#productId").trigger("chosen:updated");
//	$("#product_model").val('');
//	$("#product_model").val("选中的值");
	$("#product_model").val(null);//产品模型回显清空
	$("#product_model").trigger("chosen:updated");
	//课程信息中动态生成联动下拉框清空
	$(".removeFlag").parent().parent().remove();
});
//表单验证
$('#inquiries').bootstrapValidator({
    fields: {
        studentPhone: {
            validators: {
                notEmpty: {
                    message: '电话不能为空'
                },
                regexp: {
                    regexp: /^1[3456789]\d{9}$/,
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
        });
       //得到产品的name值
        $("#productName").val($("#productId :selected").text());
        // 同步数据后可以直接取得textarea的value
        editor.sync();
        var options = form.serialize();
        //2018/1/10新增，默认这里创建的咨询量都是顶级
        //因为新增了组合产品功能，但是在咨询台从待沟通-订座状态组合产品都是一起展示，报名状态才在分开
        options += "&pimLevel="+0;
        //
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
	
	var departmentId = $("#departmentId1").val();//信息量归属地id
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions, "departmentId":departmentId},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
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

//添加信息量时需求1：根据录入的电话号抓取数据，如成功，学员信息其他一律不得编辑，反之，则可填写
function studentPhoneSelect(){
	var studentPhone = $('#addInquiries input[name="studentPhone"]').val();
	if(studentPhone == ''){
	    return false;
	}
	$.ajax({
	  type: "POST",
      url: ctx + '/consultInfoManage/selectStudentOne',
      data: {studentPhone:studentPhone},
      dataType: 'json',
      success: function (data) {
    	  if(data.list!=null){
	          if(data.list.length>0){
	        	  $('#addInquiries input[name="phoneBelong"]').val(data.list[0].phoneBelong);
	        	  $('#addInquiries input[name="studentName"]').val(data.list[0].studentName);
//	        	  $('#addInquiries select[name="studentSex"] :selected').html(data.list[0].studentSex ? "女":"男");
	        	  $('#addInquiries select[name="studentSex"]').val(data.list[0].studentSex);
	        	  $('#addInquiries input[name="weChat"]').val(data.list[0].weChat);
	        	  $('#addInquiries input[name="age"]').val(data.list[0].age);
	        	  $('#addInquiries input[name="tengXun"]').val(data.list[0].tengXun);
	        	  $('#addInquiries select[name="studentAttrId3"] :selected').html(data.list[0].studentAttrName3);
	        	  $('#addInquiries input[name="bySchool"]').val(data.list[0].bySchool);
	        	  $('#addInquiries input[name="byZy"]').val(data.list[0].byZy);
	        	  $('#addInquiries select[name="nations"] :selected').html(data.list[0].nation);
	        	  $('#addInquiries select[name="nations"]').prop('disabled', true).trigger('chosen:updated');
	        	  $('#addInquiries input[name="emergencyContact"]').val(data.list[0].emergencyContact);
	        	  $('#addInquiries input[name="emergencyContactMode"]').val(data.list[0].emergencyContactMode);
	        	  //$('.userInfo').find('input').attr('readonly',true);
	        	  //$('.userInfo').find('select').attr('disabled',true);
//	        	  $(".phoneBelong").on({
//	        	        focus: function () {
//	        	            $('.attribution').hide();
//	        	        },
//	        	        click: function () {
//	        	            $('.attribution').hide();
//	        	        },
//	        	    });
	          }
    	  }
      },
      error: function (msg) {
          toastr.error("系统错误");
      }
	});
}

//选择产品，反向回显其他课程信息的option
$('#productId').change(function(){
	var showList = $(this).find("option:selected").attr("showList");
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;//动态生成的课程信息select的id
		for(var p in showList){
			aiId = p.replace("_id","");//动态生成的课程信息option的value
			$('#'+aiId).val(showList[p]);
			$('#'+aiId).trigger('chosen:updated');
		}
	}
});

//2018/1/8新增，信息归属地发生变化，课程信息重置清空
$("#departmentId1").change(function(){
	//清除选择产品模型后生成的课程信息下拉选
	$(".removeFlag").parent().parent().remove();
	//重置产品模型选项为空
	$("#product_model").val('');
	$("#product_model").trigger("chosen:updated");
	//清空产品下拉选
	$("#productId").html("");
	$("#productId").trigger("chosen:updated");
});