var kaoqiOption; //考期下拉框 变量定义
var zhaoshengOption;//招生地区下拉框 变量定义
var contractId;//contractId定义
var HETONGOBJ;
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
    var partnerId = $('#contractManage input[name="partnerId"]').val();
    $.ajax({
        url: ctx + '/bizContract/selectByPartnerId',
        data: {partnerId: partnerId},
        dataType: 'json',
        type: 'post',
        success: function (data) {
            $('#contractManage input[name="departmentName"]').val(data.sysDepartment.fullName);
            $('#contractManage input[name="partnerDepartmentId"]').val(data.departmentId);
            $('#contractManage input[name="partnerCode"]').val(data.partnerCode);
            $('#contractManage input[name="partnerName"]').val(data.partnerName);
            $('#contractManage input[name="partnerShortName"]').val(data.partnerShortName);
            $('#contractManage input[name="partnerAddress"]').val(data.partnerAddress);
            var contact = JSON.parse(data.contact);
            var contactDom = "";
            for (var i = 0; i < contact.length; ++i) {
                contactDom += '<div class="form-group col-sm-12 contactList">' +
                    '<label class="control-label col-sm-2 no-padding-right">联系人名单：</label>' +
                    '<div class="col-sm-10">' +
                    '<div class="col-sm-2 no-padding">' +
                    '<input name="name" class="form-control" value="' + contact[i].name + '" disabled></input>' +
                    '</div>' +
                    '<div class="col-sm-4">' +
                    '<input name="type" class="form-control" value="' + contact[i].type + '" disabled></input>' +
                    '</div>' +
                    '<div class="col-sm-5 no-padding-right">' +
                    '<input name="tel" class="form-control" value="' + contact[i].tel + '" disabled></input>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            $('#contractManage .contactList').remove();
            $('#contractManage .contact-split').after(contactDom);
            $('#contractManage .contactList').find('.fa-minus-circle').eq(0).css('display', 'none');
            var bankCard = JSON.parse(data.bankCard);
            var bankCardDom = "";
            for (var i = 0; i < bankCard.length; ++i) {
                bankCardDom += '<div class="form-group col-sm-12 bankCard">' +
                    '<label class="control-label col-sm-2 no-padding-right">银行卡信息：</label>' +
                    '<div class="col-sm-10">' +
                    '<div class="col-sm-2 no-padding">' +
                    '<input type="text" class="form-control" value="' + bankCard[i].bank + '" disabled>' +
                    '</div>' +
                    '<div class="col-sm-4">' +
                    '<input type="text" class="form-control" value="' + bankCard[i].detail + '" disabled>' +
                    '</div>' +
                    '<div class="col-sm-2 no-padding-right">' +
                    '<input type="text" class="form-control" value="' + bankCard[i].user + '" disabled>' +
                    '</div>' +
                    '<div class="col-sm-3 no-padding-right">' +
                    '<input type="text" class="form-control" value="' + bankCard[i].account + '" disabled>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            $('#contractManage .bankCard').remove();
            $('#contractManage .bankCard-split').after(bankCardDom);
            $('#contractManage .bankCard').find('.fa-minus-circle').eq(0).css('display', 'none');
            var bankReturn = JSON.parse(data.bankReturn);
            var bankReturnDom = "";
            for (var i = 0; i < bankReturn.length; ++i) {
                bankReturnDom += '<div class="form-group col-sm-12 rebates">' +
                    '<label class="control-label col-sm-2 no-padding-right">返款账号信息：</label>' +
                    '<div class="col-sm-10">' +
                    '<div class="col-sm-2 no-padding">' +
                    '<input type="text" class="form-control" value="' + bankReturn[i].bank + '" disabled>' +
                    '</div>' +
                    '<div class="col-sm-4">' +
                    '<input type="text" class="form-control" value="' + bankReturn[i].detail + '" disabled>' +
                    '</div>' +
                    '<div class="col-sm-2 no-padding-right">' +
                    '<input type="text" class="form-control" value="' + bankReturn[i].user + '" disabled>' +
                    '</div>' +
                    '<div class="col-sm-3 no-padding-right">' +
                    '<input type="text" class="form-control" value="' + bankReturn[i].account + '" disabled>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            $('#contractManage .rebates').remove();
            $('#contractManage .rebates-split').after(bankReturnDom);
            $('#contractManage .rebates').find('.fa-minus-circle').eq(0).css('display', 'none');
        },
        error: function () {
            toastr.error("系统错误");
        }
    });

   
    
    $('.duration').daterangepicker({
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
    //日期控件
    $(".form_datetime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView:2
    });
    //日期确定按钮
    $('.duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });
    //多选框
    $('.selectpicker').selectpicker('refresh');
   
    
  //初始下载资料option
    $.ajax({
        url: ctx + '/applyData/getAll',
        type: 'POST',
        data:{"enable":1},
        dataType: 'json',
        success: function (data) { 
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].applyDataId + " >" + data[i].applyDataName + "</option>";
            }
            $("#applyDataId").html(zxkc);
            $("#applyDataId").selectpicker('refresh');
            $('.chosen-container').width('100%');
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
            //console.log(zxkc)
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
    	/*var departmentId = $("#adddepartmentId1").val();
    	if(departmentId==null ||　departmentId=='') {
    		$("#addProductModel").val('');//还原产品模型信息
    		$("#addProductModel").trigger("chosen:updated");
    		toastr.error("必须先确定信息量归属地，再设置课程信息");
    		return;
    	}*/
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
	        async: false,
	        data: {"tableName":tableName,"modelId":modelId},
	        async: false,
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
    addOrDelKaoqi();
    //根据产品的选择，动态查询产品的考期  回显productModel
    $("#addProductId").change(function(){
    	var _this=this;
    	$.ajax({
  	      type: "POST",
  	      async: false,
  	      url: ctx + '/bizContract/queryKaoqi',
  	      data: {"productId":$(_this).val()},
  	      dataType: 'json',
  	      success: function (data) {
  	    	  if (data.status == "success") {
  	    		  var str='';
	              for(var j=0; j<data.data.length; j++) {
	            	  str += "<option value=" + data.data[j].examTimeId + ">" + data.data[j].examTime + "</option>";
	              }
	              $('#kaoqis [name="examId"]').html('<option value="">--请选择--</option>' + str);
	              kaoqiOption='<option value="">--请选择--</option>' + str; //考期下拉框 变量赋值
  	          } else {
  	              toastr.error("查询错误");//没有符合条件的产品
  	          }
  	      }
  	  	});
    	//回显productModel
    	var showList = $(this).find("option:selected").attr("showList");
    	if(showList!=null){
    		showList = JSON.parse(showList);
    		var aiId = null;
    		for(var p in showList){
    			aiId = p.replace("_id","");
    			$('#add'+aiId).val(showList[p]);
    			$('#add'+aiId).trigger('chosen:updated');
    		}
    	}
    });
    //初始化招生地区
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
            $("#departmentIds").html(opt);
            $('#departmentIds').selectpicker('refresh');
            zhaoshengOption=opt;//招生地区下拉框 变量赋值
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //学历
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrId").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //科目
    $.ajax({
        url: ctx + '/bizContract/querySubject',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		 var opt = "";
                 for (var i = 0; i < data.data.length; i++) {
                     opt += "<option value=" + data.data[i].examSubjectId + ">" + data.data[i].examSubjectName + "</option>";
                 }
                 $("#subjectTable [name='subjectId']").html('<option value="">--请选择--</option>' + opt);
        	}else{
        		toastr.error("查询科目出错");
        	}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //户籍
    $.ajax({
        url: ctx + '/address/getAllNotPage',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list1.length; i++) {
                opt += "<optgroup label=" + data.list1[i].fullName + " id=" + data.list1[i].addressId + "></optgroup>";
            }
            $('#registerLimitId').html(opt);
            for (var j = 0; j < data.list2.length; j++) {
                var copt = "";
                var pid = data.list2[j].parentId;
                copt += "<option value=" + data.list2[j].addressId + ">" + data.list2[j].fullName + "</option>";
                $('#' + pid + '').append(copt);
            }
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    
    //考试科目添加
    $('.addSubject').click(function(){
    	var addSubject = $(this).parent().parent().parent().clone(true);
        $(this).parent().parent().parent().after(addSubject);
    })
     //考试科目减
    $("#subjectTable").on("click",".delSubject",function(){
    	if($("#subjectTable").find("tr").length!=1){
    		$(this).parent().parent().parent().remove();
    	}
    })
    
    
     //考期减
    $('.delExam').click(function(){
    	if($("#kaoqis").children().length!=1){
    		$("#kaoqis").children("div:last-child").remove();
    	}
    })
    
  //点击新增产品按钮
    $('#addNewProductButton').on('click', function () {
    	$(".productAdd .title").html("新增");
        $('#addProductModel').val("");
        $("#addProductModel").trigger("chosen:updated");
        $('#addProductModel').change();
        
        $('#productAdd input[name="contractDetailId"]').val("")
       
        $('#productAdd input[name="age"]').val("");
        //学历
        $('#productAdd select[name="studentAttrId"]').val("");
        //户籍
        $('#productAdd select[name="registerLimitId"]').selectpicker('val',[]);
        //资料
        $('#applyDataId').selectpicker('val',[]);
        $('#extraLimit').val("");
        //考试科目
        //先移除
        $.each($("#subjectTable").find("tr"),function(index,obj){
        	if(index!=0){
        		$(obj).remove();
        	}
        })
        $.each($("#subjectTable").find("tr"),function(index,obj){
        	$(obj).find("[name='subjectId']").val("");
        	$(obj).find("[name='isSelf']").val("");
        	$(obj).find("[name='isIdcart']").val("");
        })
        //费用详情
        $('#productAdd input[name="zxf"]').val("");
        $('#productAdd input[name="hzcb"]').val("");
        $('#productAdd select[name="ywfd"]').val("1");
        $('#productAdd select[name="bmf"]').val("1");
        $('#productAdd select[name="rxcsf"]').val("1");
        $('#productAdd select[name="zy"]').val("1");
        $('#productAdd select[name="ksf"]').val("1");
        $('#productAdd select[name="lwdb"]').val("1");
        $('#productAdd select[name="tkbm"]').val("1");
        $('#productAdd select[name="bkf"]').val("1");
        $('#productAdd select[name="xwks"]').val("1");
        $('#productAdd select[name="xwfd"]').val("1");
        $('#productAdd select[name="zpcj"]').val("1");
        $('#productAdd select[name="sbjg"]').val("1");
    	$('#productAdd select[name="productId"]').val("");
        $('#productAdd select[name="productId"]').trigger("chosen:updated");
        $('#productAdd select[name="productId"]').change();
    	 $.each($("#kaoqis").children("div"),function(index,one){
    		 if(index!=0){
    			$(one).remove();
    		 }else{
    			 $.each($(one).find(".kaoqi"),function(ind,two){
    				 if(ind!=0){
    					 $(two).remove();
    				 }
               	})
    		 }
          } );
         $.each($("#kaoqis").children("div"),function(index,one){
         	$(one).find("[name='examId']").val("");
         	$(one).find("[name='examNum']").val("");
         	$(one).find("[name='examLevel']").val("");
         	$(one).find("[name='departmentIds']").val([]);
         	$(one).find("[name='departmentIds']").selectpicker('refresh');
         	$.each($(one).find(".kaoqi"),function(ind,two){
         		$(two).find("[name='payDateString']").val("");
         		$(two).find("[name='payNum']").val("");
         		$(two).find("[name='returnDateString']").val("");
         		$(two).find("[name='returnNum']").val("");
         	})
         } );
    });
});

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
	//console.log("sql");
	//console.log(conditions);
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions},
	      dataType: 'json',
	      async: false,
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



/**
 * 新增联系人名单、银行卡信息、返款账号信息
 * @param parentEle
 */
function addField(parentEle) {
    $(parentEle).on('click', '.add-button', function () {
        //删除
        if ($(this).is('.fa-minus-circle')) {
            if ($(this).parent().parent().find('label').html() == '') {
                $(this).parent().parent().remove();
            } else {
                $(this).parent().parent().next().find('label').html($(this).parent().parent().find('label').html());
                $(this).parent().parent().remove();
            }
        }
        //新增
        if ($(this).is('.fa-plus-circle')) {
            //联系人名单
            if ($(this).is('.linkmanAdd')) {
                var link = $(this).parent().parent().clone(true);
                $(link).find('input').val('');
                $(link).find('input').eq(0).val("次要");
                $(link).find('.linkmanAdd').show();

                $(this).parent().parent().after(link);
                $(parentEle).find('.contactList:not(:first)').find('label').html('');
            }

            //银行卡信息
            if ($(this).is('.bankcardAdd')) {
                var bankcard = $(this).parent().parent().clone(true);
                $(bankcard).find('input').val('');
                $(bankcard).find('.bankcardAdd').show();

                $(this).parent().parent().after(bankcard);
                $(parentEle).find('.bankCard:not(:first)').find('label').html('');
            }

            //返款账号信息
            if ($(this).is('.rebatesAccount')) {
                var rebatesAccount = $(this).parent().parent().clone(true);
                $(rebatesAccount).find('input').val('');
                $(rebatesAccount).find('.rebatesAccount').show();

                $(this).parent().parent().after(rebatesAccount);
                $(parentEle).find('.rebates:not(:first)').find('label').html('');
            }
        }
    });
}

//合作方新增
addField('.partnerAdd');
//合作方编辑
addField('.partnerEdit');

$('#contractManage').find('.add-button').hide();

//合作方信息编辑
$('.partnerInfo').click(function () {
    //编辑
    if ($(this).find('i').is('.fa-pencil')) {
        $(this).find('i').removeClass('fa-pencil blue').addClass('fa-save success');
        $('#contractManage').find('input,select').removeAttr('disabled');
        $('#contractManage').find('.add-button').show();
        $('#contractManage .contactList:first,#contractManage .bankCard:first,#contractManage .rebates:first').find('.fa-minus-circle').hide();
        addField('#contractManage');
    } else {
        //保存
        $(this).find('i').removeClass('fa-save success').addClass('fa-pencil blue');
        $('#contractManage').find('input,select').attr('disabled', 'disabled');
        $('#contractManage').find('.add-button').hide();
    }
});

/**
 * 新增期次、返款情况
 * @param parentEle
 */
function product(parentEle) {
    $(parentEle).on('click', '.add-field', function () {
        //删除
        if ($(this).is('.fa-minus-circle')) {
            $(this).parent().remove();
        }

        //新增
        if ($(this).is('.fa-plus-circle')) {
            //期次
            if ($(this).hasClass('addIssue')) {
                $(this).parent().find('.time').text($(this).parent().find('.time').text() * 1 + 1);

                var timeAdd = $(this).parent().clone(true);
                $(timeAdd).find('input').val('');
                $(timeAdd).find('.add-field').show().css('top', 7);

                $(this).parent().after(timeAdd);
                $(this).parent().find('.time').text($(this).parent().prev().find('.time').text() * 1 + 1);
            }

            //返款情况
            if ($(this).hasClass('addRebates')) {
                $(this).parent().find('.time').text($(this).parent().find('.time').text() * 1 + 1);

                var rebatesAdd = $(this).parent().clone(true);
                $(rebatesAdd).find('input').val('');
                $(rebatesAdd).find('.add-field').show().css('top', 7);
                ;


                $(this).parent().after(rebatesAdd);
                $(this).parent().find('.time').text($(this).parent().prev().find('.time').text() * 1 + 1);
            }
        }
    })
}
//产品新增
product('.productAdd');
//产品编辑
product('.productEdit');

//合同信息编辑
$('.contractInfo').click(function () {
    //编辑
    if ($(this).find('i').is('.fa-pencil')) {
        $(this).find('i').removeClass('fa-pencil blue').addClass('fa-save success');
        $('#contractEdit').find('input,select').removeAttr('disabled');
        editor2.readonly(false);
    } else {
        //保存合同信息
        $(this).find('i').removeClass('fa-save success').addClass('fa-pencil blue');
        $('#contractEdit').find('input,select').attr('disabled', 'disabled');
        var uploadContract = editor2.html();
        var contractId = $('#contractEdit').find('#updtcontractId').val();
        var contractCode = $('#contractEdit').find('#updtContractCode').val();
        var signUser = $('#contractEdit').find('#updtSignUser').val();
        var discussUser = $('#contractEdit').find('#updtdiscussUser').val();
        var duration = $('#contractEdit').find('#updtDuration').val();
        var signDate = trim(duration.split(" - ")[0])+' 00:00:00';
        var aa = trim(duration.split(" - ")[1]);
        var expireDate = aa + " 23:59:59";
     //   alert(signDate);alert(expireDate);
        $('.contract-ok').modal('show');
        $('.btn-close1').click(function(){
        	$('.contract-ok').modal('hide');
        })
        
        $.ajax({
            url: ctx + '/bizContract/updateRecord',
            data: {contractId, contractCode, signUser, discussUser, signDate, expireDate, uploadContract},
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                   // $('.contractEdit').modal('hide');
                    DataTable.init();
                }
            },
            error: function () {
                toastr.error("系统错误");
            }
        });
    }
});

//合同新增保存显示增加产品
//$('.contract-save').click(function () {
//    $('.productInfo').show();
//});

//新增合同
$('#contractAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var duration = $('#contractAdd').find('#duration').val();
        var signDate = trim(duration.split(" - ")[0])+' 00:00:00';
        var expireDate = trim(duration.split(" - ")[1])+' 23:59:59';
        params += "&signDate=" + signDate;
        params += "&expireDate=" + expireDate ;
        $.ajax({
            type: "POST",
            url: ctx + '/bizContract/addNewRecord',
            data: params,
            dataType: 'json',
            success: function (data) {
                $('.contractAdd').modal('hide');
                DataTable.init();
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    }
});
//查询合同信息
var DataTable = function () {
    return {
        init: function () {
            var Table = $('#bizContract').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 15,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/bizContract/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {"mData": "contractCode", 'sClass': "text-center"},
                    {"mData": "discussUser", 'sClass': "text-center"},
                    {"mData": "signUser", 'sClass': "text-center"},
                    {"mData": "signDate", 'sClass': "text-center"},
                    {"mData": "expireDate", 'sClass': "text-center"},
                    {"mData": "createUserName", 'sClass': "text-center"},
                    {"mData": "createDate", 'sClass': "text-center"},
                    {"mData": "productNum", 'sClass': "text-center"},
                    {
                        "mData": "enable",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 0) {
                                return '<span id="span' + full["contractId"] + '" onclick="chooseStudent(\'' + full["contractId"] + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
                            } else {
                                return '<span id="span' + full["contractId"] + '" onclick="chooseStudent(\'' + full["contractId"] + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
                            }
                        }
                    },
                    {
                        "mData": "contractId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            /* var u = '<a onclick="edit(\''+full["contractId"]
                             +'\',\''+full["contractCode"]
                             +'\',\''+full["signUser"]
                             +'\',\''+full["discussUser"]
                             +'\',\''+full["signDate"]
                             +'\',\''+["expireDate"]
                             +'\',this)" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".contractEdit" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit"></i> 编辑</a>';
                             return u;*/
                            var e = "<a onclick='edit(this)' data-record='" + JSON.stringify(full) + "' class='btn btn-info btn-xs edit'   data-toggle='modal' data-backdrop='static' data-target='.contractEdit' " + (full.enable == 0 ? 'disabled' : '') + " ><i class='fa fa-edit' ></i> 编辑</a>";
                            return e;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            })
        }
    }
}();
$("#bizContract tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#bizContract tbody>tr>td").mLoading({
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
    var partnerId = $('#contractManage input[name="partnerId"]').val();
    aoData.push({"name": "partnerId", "value": partnerId});
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
//修改状态(合同)
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizContract/updateRecord',
        type: 'POST',
        data: {
            contractId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success' && flag == 1) {
                $("#span" + val).removeClass("btn-nouse").addClass("btn-use");
                $("#span" + val).html('<i class="fa fa-check-circle-o"></i> 启用');
            }
            if (data.status == 'success' && flag == 0) {
                $("#span" + val).removeClass("btn-use").addClass("btn-nouse");
                $("#span" + val).html('<i class="fa fa-ban"></i> 禁用');
            }
        }
    });
}

var cpDataTable;

//编辑操作
function edit(obj) {
	HETONGOBJ=obj;
    var contract = JSON.parse($(obj).attr('data-record'));
    editor2.readonly(true);
    editor2.html(contract.uploadContract);
    $('#updtcontractId').val(contract.contractId);
    $('#updtContractCode').val(contract.contractCode);
    $('#updtSignUser').val(contract.signUser);
    $('#updtdiscussUser').val(contract.discussUser);
    var signDate = contract.signDate;
    var expireDate = contract.expireDate;
    $('#updtDuration').val(signDate + ' - ' + expireDate);
    var aa = contract.contractId;
    contractId = contract.contractId;
    //查询产品信息
    cpDataTable = function () {
        return {
            init: function () {
                var Table = $('#contractCetail').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 15,
                    "bLengthChange": false,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/bizContractDetail/load',
                    "fnServerData": cpRetrieveData,//用于替换默认发到服务端的请求操作
                    "bServerSide": true,
                    "bDestroy": true,
                    "bRetrieve": false,
                    "oLanguage": {
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "抱歉， 没有找到",
                        "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                        "sInfoEmpty": "找不到相关数据",
                        "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                        "sProcessing": "正在加载中...",
                        "sSearch": "搜索",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "尾页"
                        },
                    },
                    "aoColumns": [
                        {"mData": "productModelName", 'sClass': "text-center"},
                        {"mData": "productName", 'sClass': "text-center"},
                        {
                            "mData": "enable",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                if (full["enable"] == 0) {
                                    return '<span id="span' + full["contractDetailId"] + '" onclick="chooseStudentCp(\'' + full["contractDetailId"] + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
                                } else {
                                    return '<span id="span' + full["contractDetailId"] + '" onclick="chooseStudentCp(\'' + full["contractDetailId"] + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
                                }
                            }
                        },
                        {
                            "mData": "contractDetailId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                            	var str="<a href='#' value='"+full["contractDetailId"]+"'  class='btn btn-info btn-xs edit' data-toggle='modal'  ><i class='fa fa-edit'></i> 编辑</a>";
                            	str+="<a href='#' value='"+full["contractDetailId"]+"'  class='btn btn-info btn-xs copy' data-toggle='modal'  ><i class='fa fa-edit'></i> 复制</a>";
                                return str;
                            }
                        }
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        if (aData.teachForm == '1') {
                            $('td:eq(1)', nRow).html('自考');
                        } else if (aData.teachForm == '2') {
                            $('td:eq(1)', nRow).html('远程');
                        } else if (aData.teachForm == '3') {
                            $('td:eq(1)', nRow).html('成考');
                        }
                        return nRow;
                    }
                })
            }
        }
    }();
    cpDataTable.init();
    /**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function cpRetrieveData(sSource, aoData, fnCallback, oSettings) {
        var contractId = aa;
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        var searchVal = $('#searchVal').val();
        if (searchVal && searchVal.length != 0) {
            aoData.push({"name": "searchVal", "value": searchVal});
        }
        aoData.push({"name": "contractId", "value": contractId});
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
}

//修改状态(合同) 
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizContract/updateRecord',
        type: 'POST',
        data: {
            contractId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
//修改状态(产品) 
function chooseStudentCp(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizContractDetail/updateRecord',
        type: 'POST',
        data: {
            contractDetailId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		 cpDataTable.init();
        	}else{
        		 toastr.error("修改失败");
        	}
        }
    });
}
//产品编辑
$('#contractCetail').on('click', '.edit', function () {
	//清除上次选择后生成的下拉框
	$(".removeFlag").parent().parent().remove();
	$(".productAdd .title").html("编辑");
	var _this=this;
	//回显报考资料
	$.post(ctx + '/bizContractDetail/selectBizContractDetailApply',
		{"contractDetailId": $(_this).attr("value")}
		,function(data){
			if(data.status=='success'){
				var ids=[];
				$.each(data.data,function(index,obj){
					ids.push(obj.applyDataId);
				})
				$('#productAdd select[name="applyDataId"]').selectpicker('val',ids);
			}else{
				toastr.error("回显报考资料出错");
			}
		}
		,"json")
	
	$.ajax({
        url: ctx + '/bizContractDetail/selectOne',
        type: 'POST',
        data: {"contractDetailId": $(_this).attr("value")},
        dataType: 'json',
        async: true,
        success: function (data) {
        	$('.productAdd').modal("show");
            var detail=data.data;
            $('#addProductModel').val(detail.productModelId);
            $("#addProductModel").trigger("chosen:updated");
            $('#addProductModel').change();
            
            $('#productAdd input[name="contractDetailId"]').val(detail.contractDetailId)
           
            $('#productAdd input[name="age"]').val(detail['age']);
            //学历
            $('#productAdd select[name="studentAttrId"]').val(detail['studentAttrId']);
            //户籍
            if(detail['registerLimitId']!=null){
            	var list=detail['registerLimitId'].split(",");
            	var ids=new Array();
            	$.each(list,function(i){
            		ids.push(list[i]);
            	})
            	$('#productAdd select[name="registerLimitId"]').selectpicker('val',ids);
            }
            $('#extraLimit').val(detail['extraLimit']);
            //考试科目
            //先移除
            $.each($("#subjectTable").find("tr"),function(index,obj){
            	if(index!=0){
            		$(obj).remove();
            	}
            })
            //再增加
            var projects=detail['bizContractDetailProjects'];
            var addSubject=$("#subjectTable").find("tr:first-child").find(".addSubject");
            for(var i=1;i<projects.length;i++){
            	addSubject.click();
            }
            $.each($("#subjectTable").find("tr"),function(index,obj){
            	var project=projects[index];
            	$(obj).find("[name='subjectId']").val(project['projectId']);
            	$(obj).find("[name='isSelf']").val(project['isSelf']);
            	$(obj).find("[name='isIdcart']").val(project['isIdcart']);
            })
            //费用详情
            $('#productAdd input[name="zxf"]').val(detail['totalFee']);
            $('#productAdd input[name="hzcb"]').val(detail['costing']);
            $('#productAdd select[name="ywfd"]').val(detail['hasRebates']);
            $('#productAdd select[name="bmf"]').val(detail['bm']);
            $('#productAdd select[name="rxcsf"]').val(detail['rxce']);
            $('#productAdd select[name="zy"]').val(detail['zy']);
            $('#productAdd select[name="ksf"]').val(detail['ks']);
            $('#productAdd select[name="lwdb"]').val(detail['lwdb']);
            $('#productAdd select[name="tkbm"]').val(detail['tkbm']);
            $('#productAdd select[name="bkf"]').val(detail['bk']);
            $('#productAdd select[name="xwks"]').val(detail['xwksbm']);
            $('#productAdd select[name="xwfd"]').val(detail['xwfd']);
            $('#productAdd select[name="zpcj"]').val(detail['zpcj']);
            $('#productAdd select[name="sbjg"]').val( detail['zsgb']);
            
          //回显 ai字段 和 product 和考期
          //回去tableName
        	var jsonObj = $('#addProductModel :selected').data("value");
        	//用来组装表名
        	var tableArray = new Array();
        	//开始构造最新的拼接结果
        	for(var i=0; i<jsonObj.length; i++) {
        		var enName = jsonObj[i].enName;
        		var chName = jsonObj[i].chName;
        		tableArray.push(enName);
        	}
        	var tableName = tableArray.join("---");
        	//setTimeout(() => {
        		 $('#productAdd select[name="productId"]').val(detail['productId']);
                 $('#productAdd select[name="productId"]').trigger("chosen:updated");
                 $('#productAdd select[name="productId"]').change();
                 //product回显完后 回显考期
                 //setTimeout(() => {
                	//考期
                	 //先移除
                	 $.each($("#kaoqis").children("div"),function(index,one){
                		 if(index!=0){
                			$(one).remove();
                		 }else{
                			 $.each($(one).find(".kaoqi"),function(ind,two){
                				 if(ind!=0){
                					 $(two).remove();
                				 }
                           	})
                		 }
                      } );
                     var exams=detail['bizContractDetailExams'];
                     var addExam=$(".addExam");
                     for(var i=1;i<exams.length;i++){
                     	addExam.click();
                     }
                     $.each($("#kaoqis").children("div"),function(index,one){
                     	var exam=exams[index];
                     	$(one).find("[name='examId']").val(exam['examId']);
                     	$(one).find("[name='examNum']").val(exam['examNum']);
                     	$(one).find("[name='examLevel']").val(exam['examLevel']);
                     	$(one).find("[name='departmentIds']").val(exam['departmentIds'].split(","));
                     	$(one).find("[name='departmentIds']").selectpicker('refresh');
                     	var examPays=exam['bizContractDetailExamPays'];
                     	var addKaoqi=$(one).find(".addKaoqi");
                     	for(var i=1;i<examPays.length;i++){
                     		addKaoqi.click();
                     	}
                     	$.each($(one).find(".kaoqi"),function(ind,two){
                     		var examPay=examPays[ind];
                     		$(two).find("[name='payDateString']").val(dateForMat(examPay['payDate']));
                     		$(two).find("[name='payNum']").val(examPay['payNum']);
                     		$(two).find("[name='returnDateString']").val(dateForMat(examPay['returnDate']));
                     		$(two).find("[name='returnNum']").val(examPay['returnNum']);
                     	})
                     } );
				//}, 1000);
                 if(tableName!=""){
                	$.post(ctx+"/bizContract/showAi",
             		{"tableNames":tableName,"productId":data.data.productId},
     	            function(data2){
     	            	if(data2.status=='success'){
     	            		for(var i=0; i<jsonObj.length; i++) {
     	                		var enName = jsonObj[i].enName;
     	                		var enNameId=enName+"_id";
     	                		if(data2[enNameId]!=null){
     	                			$("#add"+enName).val(data2[enNameId]);
         	                		$("#add"+enName).trigger("chosen:updated");
     	                		}
     	                	}
     	            	}else{
     	            		toastr.error("产品ai字段查询出错");
     	            	}
     	            },"json")
                 }
        		
			//}, 1000);
        },
        error: function (response) {
            toastr.error("查询合同详情出错");
        }
    });
});
//产品复制
$('#contractCetail').on('click', '.copy', function () {
	//清除上次选择后生成的下拉框
	$(".removeFlag").parent().parent().remove();
	$(".productAdd .title").html("复制");
	var _this=this;
	//回显报考资料
	$.post(ctx + '/bizContractDetail/selectBizContractDetailApply',
		{"contractDetailId": $(_this).attr("value")}
		,function(data){
			if(data.status=='success'){
				var ids=[];
				$.each(data.data,function(index,obj){
					ids.push(obj.applyDataId);
				})
				$('#productAdd select[name="applyDataId"]').selectpicker('val',ids);
			}else{
				toastr.error("回显报考资料出错");
			}
		}
		,"json")
	
	$.ajax({
        url: ctx + '/bizContractDetail/selectOne',
        type: 'POST',
        data: {"contractDetailId": $(_this).attr("value")},
        dataType: 'json',
        async: true,
        success: function (data) {
        	$('.productAdd').modal("show");
            var detail=data.data;
            $('#addProductModel').val(detail.productModelId);
            $("#addProductModel").trigger("chosen:updated");
            $('#addProductModel').change();
            
            $('#productAdd input[name="contractDetailId"]').val('');
           
            $('#productAdd input[name="age"]').val(detail['age']);
            //学历
            $('#productAdd select[name="studentAttrId"]').val(detail['studentAttrId']);
            //户籍
            if(detail['registerLimitId']!=null){
            	var list=detail['registerLimitId'].split(",");
            	var ids=new Array();
            	$.each(list,function(i){
            		ids.push(list[i]);
            	})
            	$('#productAdd select[name="registerLimitId"]').selectpicker('val',ids);
            }
            $('#extraLimit').val(detail['extraLimit']);
            //考试科目
            //先移除
            $.each($("#subjectTable").find("tr"),function(index,obj){
            	if(index!=0){
            		$(obj).remove();
            	}
            })
            //再增加
            var projects=detail['bizContractDetailProjects'];
            var addSubject=$("#subjectTable").find("tr:first-child").find(".addSubject");
            for(var i=1;i<projects.length;i++){
            	addSubject.click();
            }
            $.each($("#subjectTable").find("tr"),function(index,obj){
            	var project=projects[index];
            	$(obj).find("[name='subjectId']").val(project['projectId']);
            	$(obj).find("[name='isSelf']").val(project['isSelf']);
            	$(obj).find("[name='isIdcart']").val(project['isIdcart']);
            })
            //费用详情
            $('#productAdd input[name="zxf"]').val(detail['totalFee']);
            $('#productAdd input[name="hzcb"]').val(detail['costing']);
            $('#productAdd select[name="ywfd"]').val(detail['hasRebates']);
            $('#productAdd select[name="bmf"]').val(detail['bm']);
            $('#productAdd select[name="rxcsf"]').val(detail['rxce']);
            $('#productAdd select[name="zy"]').val(detail['zy']);
            $('#productAdd select[name="ksf"]').val(detail['ks']);
            $('#productAdd select[name="lwdb"]').val(detail['lwdb']);
            $('#productAdd select[name="tkbm"]').val(detail['tkbm']);
            $('#productAdd select[name="bkf"]').val(detail['bk']);
            $('#productAdd select[name="xwks"]').val(detail['xwksbm']);
            $('#productAdd select[name="xwfd"]').val(detail['xwfd']);
            $('#productAdd select[name="zpcj"]').val(detail['zpcj']);
            $('#productAdd select[name="sbjg"]').val( detail['zsgb']);
            
          //回显 ai字段 和 product 和考期
          //回去tableName
        	var jsonObj = $('#addProductModel :selected').data("value");
        	//用来组装表名
        	var tableArray = new Array();
        	//开始构造最新的拼接结果
        	for(var i=0; i<jsonObj.length; i++) {
        		var enName = jsonObj[i].enName;
        		var chName = jsonObj[i].chName;
        		tableArray.push(enName);
        	}
        	var tableName = tableArray.join("---");
        	//setTimeout(() => {
        		 $('#productAdd select[name="productId"]').val(detail['productId']);
                 $('#productAdd select[name="productId"]').trigger("chosen:updated");
                 $('#productAdd select[name="productId"]').change();
                 //product回显完后 回显考期
                 //setTimeout(() => {
                	//考期
                	 //先移除
                	 $.each($("#kaoqis").children("div"),function(index,one){
                		 if(index!=0){
                			$(one).remove();
                		 }else{
                			 $.each($(one).find(".kaoqi"),function(ind,two){
                				 if(ind!=0){
                					 $(two).remove();
                				 }
                           	})
                		 }
                      } );
                     var exams=detail['bizContractDetailExams'];
                     var addExam=$(".addExam");
                     for(var i=1;i<exams.length;i++){
                     	addExam.click();
                     }
                     $.each($("#kaoqis").children("div"),function(index,one){
                     	var exam=exams[index];
                     	$(one).find("[name='examId']").val(exam['examId']);
                     	$(one).find("[name='examNum']").val(exam['examNum']);
                     	$(one).find("[name='examLevel']").val(exam['examLevel']);
                     	$(one).find("[name='departmentIds']").val(exam['departmentIds'].split(","));
                     	$(one).find("[name='departmentIds']").selectpicker('refresh');
                     	var examPays=exam['bizContractDetailExamPays'];
                     	var addKaoqi=$(one).find(".addKaoqi");
                     	for(var i=1;i<examPays.length;i++){
                     		addKaoqi.click();
                     	}
                     	$.each($(one).find(".kaoqi"),function(ind,two){
                     		var examPay=examPays[ind];
                     		$(two).find("[name='payDateString']").val(dateForMat(examPay['payDate']));
                     		$(two).find("[name='payNum']").val(examPay['payNum']);
                     		$(two).find("[name='returnDateString']").val(dateForMat(examPay['returnDate']));
                     		$(two).find("[name='returnNum']").val(examPay['returnNum']);
                     	})
                     } );
				//}, 1000);
                 if(tableName!=""){
                	$.post(ctx+"/bizContract/showAi",
             		{"tableNames":tableName,"productId":data.data.productId},
     	            function(data2){
     	            	if(data2.status=='success'){
     	            		for(var i=0; i<jsonObj.length; i++) {
     	                		var enName = jsonObj[i].enName;
     	                		var enNameId=enName+"_id";
     	                		if(data2[enNameId]!=null){
     	                			$("#add"+enName).val(data2[enNameId]);
         	                		$("#add"+enName).trigger("chosen:updated");
     	                		}
     	                	}
     	            	}else{
     	            		toastr.error("产品ai字段查询出错");
     	            	}
     	            },"json")
                 }
        		
			//}, 1000);
        },
        error: function (response) {
            toastr.error("查询合同详情出错");
        }
    });
});
function clearForm() {
    $('#contractAdd')[0].reset();//不清除隐藏域
    editor.html('');
}
//考期中支付日期添加、删除
function addOrDelKaoqi(){
	//考期中支付日期添加
    $('#kaoqis').on("click",".kaoqi .addKaoqi",function(){
    	var kaoqi=$(this).parent().parent().parent().parent().find(".kaoqi");
    	var str=`<div class="form-group" style="height:0">
		            <div class="form-group col-lg-4 col-md-4 col-sm-4">
				        <label class="col-lg-4 col-md-4 col-sm-4 control-label no-padding-right no-padding-left" style="margin-left:-30px">支付日期</label>
				        <div class="col-lg-8 col-md-8 col-sm-8">
				            <div class="input-group">
				                <input class="form-control date-picker form_datetime" type="text" value="" readonly="">
				                <span class="input-group-addon">
				                    <i class="fa fa-calendar"></i>
				                </span>
				            </div>
				        </div>
				    </div>
				    <div class="form-group col-lg-2 col-md-2 col-sm-2">
				        <label class="col-lg-1 col-md-1 col-sm-1 control-label no-padding-right no-padding-left" style="white-space: nowrap;margin-left:-50px">支付金额</label>
				        <div class="col-lg-11 col-md-11 col-sm-11">
				            <input class="form-control comment_disabled" value="" type="text">
				        </div>
				    </div>
				    <div class="form-group col-lg-4 col-md-4 col-sm-4">
				        <label class="col-lg-4 col-md-4 col-sm-4 control-label no-padding-right no-padding-left" style="margin-left:-30px">返款日期</label>
				        <div class="col-lg-8 col-md-8 col-sm-8">
				            <div class="input-group">
				                <input class="form-control date-picker form_datetime" type="text" value="" readonly="">
				                <span class="input-group-addon">
				                    <i class="fa fa-calendar"></i>
				                </span>
				            </div>
				        </div>
				    </div>
				    <div class="form-group col-lg-2 col-md-2 col-sm-2">
				        <label class="col-lg-1 col-md-1 col-sm-1 control-label no-padding-right no-padding-left" style="white-space: nowrap;margin-left:-50px">返款金额</label>
				        <div class="col-lg-11 col-md-11 col-sm-11">
				            <input class="form-control comment_disabled" value="" type="text">
				        </div>
				    </div>
				</div>`;
    	kaoqi.append(str);
    	 //日期控件
	    $(".form_datetime").datetimepicker({
	        language: 'zh-CN',
	        format: 'yyyy-mm-dd',
	        autoclose: true,
	        minView:2
	    });
    })
    //考期中支付日期减
    $('#kaoqis').on("click",".kaoqi .delKaoqi",function(){
    	var kaoqi=$(this).parent().parent().parent().parent().find(".kaoqi");
    	kaoqi.children(":last-child").remove();
    })
}

//考期新增
function addExam(){
	//考期加
    	var exam='<div class="row">'+
				'    	<div class="col-sm-12 clearfix" style="padding-left:30px;line-height:40px">'+
				'            <span class="blue">考期</span>'+
				'	    </div>'+
				'		<div class="form-group col-lg-12 col-md-12 col-sm-12">'+
				'	<div class="form-group col-lg-4 col-md-4 col-sm-4">'+
				'		<label class="col-sm-3 control-label no-padding-right">考期</label>'+
				'		<div class="col-sm-9">'+
				'			<select name="examId" class="form-control">'+kaoqiOption+
				'			</select>'+
				'		</div>'+
				'	</div>'+
				'	<div class="form-group col-lg-3 col-md-3 col-sm-3">'+
				'		<label class="col-sm-5 control-label no-padding-right">报考人数</label>'+
				'		<div class="col-sm-7">'+
				'			<input class="form-control " value="" name="examNum"'+
				'				type="text">'+
				'		</div>'+
				'	</div>'+
				'	<div class="form-group col-lg-3 col-md-3 col-sm-3">'+
				'		<label class="col-sm-5 control-label no-padding-right">报考优先级</label>'+
				'		<div class="col-sm-7">'+
				'			<select class="form-control comment_disabled" name="examLevel">'+
				'				<option value="1">高</option>'+
				'				<option value="2">中</option>'+
				'				<option value="3">低</option>'+
				'			</select>'+
				'		</div>'+
				'	</div>'+
				'	<div class="form-group col-lg-12 col-md-12 col-sm-12">'+
				'		<label class="col-sm-1 control-label no-padding-right">招生地区</label>'+
				'		<div class="col-sm-10">'+
				'			<select id="departmentIds" class="form-control comment_disabled selectpicker  zhaosheng" multiple name="departmentIds" >'+zhaoshengOption+
				'			</select>'+
				'		</div>'+
				'	</div>'+
				'</div>'+
				'<div class="kaoqi clearfix" style="border-bottom:1px solid #cccccc;margin-bottom:20px">'+
				'	<div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left:20px">'+
				'		<label class="control-label no-padding-right"> <a'+
				'			href="javascript:" class="blue addKaoqi"> <i'+
				'				class="glyphicon glyphicon-plus-sign"></i>'+
				'		</a>'+
				'		</label> <label class="control-label no-padding-right"> <a'+
				'			href="javascript:" class="blue delKaoqi"> <i'+
				'				class="glyphicon glyphicon-minus-sign"></i>'+
				'		</a>'+
				'		</label>'+
				'	</div>'+
				'	<div class="form-group clearfix">'+
				'		<div class="form-group col-lg-4 col-md-4 col-sm-4">'+
				'			<label'+
				'				class="col-sm-4 control-label no-padding-right no-padding-left"'+
				'				style="margin-left: -30px">支付日期</label>'+
				'			<div class="col-sm-8">'+
				'				<div class="input-group">'+
				'					<input class="form-control date-picker form_datetime"'+
				'						type="text" value="" name="payDateString"> <span'+
				'						class="input-group-addon"> <i class="fa fa-calendar"></i>'+
				'					</span>'+
				'				</div>'+
				'			</div>'+
				'		</div>'+
				'		<div class="form-group col-lg-2 col-md-2 col-sm-2">'+
				'			<label'+
				'				class="col-sm-1 control-label no-padding-right no-padding-left"'+
				'				style="white-space: nowrap; margin-left: -50px">支付金额</label>'+
				'			<div class="col-sm-11">'+
				'				<input class="form-control comment_disabled" value="" name="payNum"'+
				'					type="text">'+
				'			</div>'+
				'		</div>'+
				'		<div class="form-group col-lg-4 col-md-4 col-sm-4">'+
				'			<label'+
				'				class="col-sm-4 control-label no-padding-right no-padding-left"'+
				'				style="margin-left: -30px">返款日期</label>'+
				'			<div class="col-sm-8">'+
				'				<div class="input-group">'+
				'					<input class="form-control date-picker form_datetime"'+
				'						type="text" value="" name="returnDateString"> <span'+
				'						class="input-group-addon"> <i class="fa fa-calendar"></i>'+
				'					</span>'+
				'				</div>'+
				'			</div>'+
				'		</div>'+
				'		<div class="form-group col-lg-2 col-md-2 col-sm-2">'+
				'			<label'+
				'				class="col-sm-1 control-label no-padding-right no-padding-left"'+
				'				style="white-space: nowrap; margin-left: -50px">返款金额</label>'+
				'			<div class="col-sm-11">'+
				'				<input class="form-control comment_disabled" value=""  name="returnNum"'+
				'					type="text">'+
				'			</div>'+
				'		</div>'+
				'	</div>'+
				'</div>'+
			'</div>' 
    	$("#kaoqis").append(exam);
    	 $('.zhaosheng').selectpicker({
    	        'liveSearch': true,
    	        'liveSearchPlaceholder': '请输入关键字',
    	        'actionsBox': true,
    	        'selectAllText': '全选',
    	        'deselectAllText': '取消',
    	        'noneSelectedText': '没有匹配项'
    	    })
    	  //日期控件
    	    $(".form_datetime").datetimepicker({
    	        language: 'zh-CN',
    	        format: 'yyyy-mm-dd',
    	        autoclose: true,
    	        minView:2
    	    });
}
//合同详情提交
function subDetail(){
	//新增合同产品、编辑合同产品
    var detail={};
    detail['contractId']=contractId;
    detail['productModelId']=$('#productAdd select[name="productModelId"]').val();
    detail['productId']=$('#productAdd select[name="productId"]').val();
    detail['age']=$('#productAdd input[name="age"]').val();
    //学历
    detail['studentAttrId']=$('#productAdd select[name="studentAttrId"]').val();
    //户籍
    console.log(detail['registerLimitId']=$('#productAdd select[name="registerLimitId"]').val());
    if(detail['registerLimitId']=$('#productAdd select[name="registerLimitId"]').val() != null){
    	detail['registerLimitId']=$('#productAdd select[name="registerLimitId"]').val().join(",");
    }      
    detail['extraLimit']=$('#extraLimit').val();
    //考试科目
    var projects=[];
    $.each($("#subjectTable").find("tr"),function(index,obj){
    	var project={};
    	project['projectId']=$(obj).find("[name='subjectId']").val();
    	project['isSelf']=$(obj).find("[name='isSelf']").val();
    	project['isIdcart']=$(obj).find("[name='isIdcart']").val();
    	projects.push(project);
    })
    detail['bizContractDetailProjects']=projects;
    
    //所需资料
    if(detail['applyDataIds']=$('#productAdd select[name="applyDataId"]').val() != null){
    	detail['applyDataIds']=$('#productAdd select[name="applyDataId"]').val().join(",");
    }
    
    //费用详情
    detail['totalFee']=$('#productAdd input[name="zxf"]').val();
    detail['costing']=$('#productAdd input[name="hzcb"]').val();
    detail['hasRebates']=$('#productAdd select[name="ywfd"]').val();
    detail['bm']=$('#productAdd select[name="bmf"]').val();
    detail['rxce']=$('#productAdd select[name="rxcsf"]').val();
    detail['zy']=$('#productAdd select[name="zy"]').val();
    detail['ks']=$('#productAdd select[name="ksf"]').val();
    detail['lwdb']=$('#productAdd select[name="lwdb"]').val();
    detail['tkbm']=$('#productAdd select[name="tkbm"]').val();
    detail['bk']=$('#productAdd select[name="bkf"]').val();
    detail['xwksbm']=$('#productAdd select[name="xwks"]').val();
    detail['xwfd']=$('#productAdd select[name="xwfd"]').val();
    detail['zpcj']=$('#productAdd select[name="zpcj"]').val();
    detail['zsgb']=$('#productAdd select[name="sbjg"]').val();
    //考期
    var exams=[];
    $.each($("#kaoqis").children("div"),function(index,one){
    	var exam={};
    	exam['examId']=$(one).find("[name='examId']").val();
    	exam['exam']=$(one).find("[name='examId']").find("option:selected").text();
    	exam['examNum']=$(one).find("[name='examNum']").val();
    	exam['examLevel']=$(one).find("[name='examLevel']").val();
    	if(exam['departmentIds']=$(one).find("[name='departmentIds']").val() != null){
    		exam['departmentIds']=$(one).find("[name='departmentIds']").val().join(",");
    	}
    	
    	var examPays=[];
    	$.each($(one).find(".kaoqi"),function(ind,two){
    		var examPay={};
    		examPay['payDateString']=$(two).find("[name='payDateString']").val();
    		examPay['payNum']=$(two).find("[name='payNum']").val();
    		examPay['returnDateString']=$(two).find("[name='returnDateString']").val();
    		examPay['returnNum']=$(two).find("[name='returnNum']").val();
    		examPays.push(examPay);
    	})
    	exam['bizContractDetailExamPays']=examPays
    	exams.push(exam);
    } );
    detail['bizContractDetailExams']=exams;
    var url="";
    var contractDetailId=$('#productAdd input[name="contractDetailId"]').val();
    if(contractDetailId==null || contractDetailId==''){
    	url='/bizContract/addDetail'; //新增
    }else{
    	detail['contractDetailId']=contractDetailId;
    	url='/bizContract/updateDetail'; //编辑
    }
    $.ajax({
        url: ctx + url,
        data:  JSON.stringify(detail),
    	contentType: "application/json; charset=utf-8",
        dataType: 'json',
        type: 'post',
        success: function (data) {
        	console.log(data)
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
            	 toastr.success(data.msg);
                $('.productAdd').modal('hide');
                edit(HETONGOBJ);
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });
}

/**
 * 时间格式化 没有时分秒
 */
function dateForMat(val){
	var date=new Date(parseInt(val)); 
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    month = month < 10 ? ('0' + month) : month;  
    var day = date.getDate();  
    day = day < 10 ? ('0' + day) : day;  
    var hour = date.getHours();  
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var seconde=date.getSeconds();
    seconde = seconde < 10 ? ('0' + seconde) : seconde;
    return year + '-' + month + '-' + day; 
}