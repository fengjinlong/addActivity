/**
 * 预约单联动计算量
 * @param record
 * @returns
 */
function loadGT_YYD(record) {
	//公共弹框-客户标签回显
    var infoManageId = $('#infoManageId2').val();
    $('.tag').html('');//清空客户标签内容
    $.ajax({
        url: ctx + '/consultInfoManage/getCheckedLableId',
        type: 'POST',
        data: { infoManageId: infoManageId},
        dataType: 'json',
        success: function (data) {
         if(data.list!=null){
	        	var tag = data.list.studentLable.split(',');
	        	if(tag!= ''){
	        		for(var i = 0; i < tag.length; i++){
	            		$('.tag').append('<p class="label-box text-center"><span>' + tag[i] + '</span>'
	    	    	            + '<i class="fa fa-minus-circle reduce icon-btn tag-close"></i></p>');
	            	}
	        	}
	        }
        }
    });
	
	//初始产品模型,并且回显
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
            	if(data[i].modelId==record.productModelId) {
            		zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+" selected>" + data[i].modelName + "</option>";
            	} else {
            		zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+">" + data[i].modelName + "</option>";
            	}
            }
            $("#product_model").html('<option value="">--请选择--</option>' + zxkc);
            $('#product_model').trigger('chosen:updated');
            $("#product_model").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
            
            //产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#product_model").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

//当产品部分的下拉框发生改变时，需要制空产品下拉框——查看页面部分
function clearProduct() {
	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
	if($("#productId").hasClass("init")) {
		//如果产品id不为空才回显考期否则不会显现考期
    	if(productId!=null && productId!="") {
    		//考期回显-考期是后面新增的下拉选
    		$("#productId").trigger("change");
    	}
		
		return $("#productId").val();
	} 
	$("#productId").html("");
	generateProduct();//开始根据课程信息部分当前选中条件生成产品选项
	$("#productId").trigger('chosen:updated');
	$("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	//2017/11/20添加，清空考期下拉选旧数据;
	$('#kTime').html('');
	$('#kTime').trigger('chosen:updated');
	$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
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

//动态生成产品-查看信息页面部分
function generateProduct() {
	//存放条件
	var conditionArray = new Array();
	$(".project select :selected").each(function(index,obj){
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

$(function(){
	  //DMW添加，根据产品类型的选择，动态创建课程信息部分，其它下拉框-查看部分
	    $("#product_model").change(function(){
	    	//清空考期下拉选
	    	$('#kTime').html('');
	    	$('#kTime').trigger('chosen:updated');
			$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
	    	//产品模型发生改变，制空产品下拉框,如果没有制空则会得到初始时的productId
	    	var productId = "";
	    	productId = clearProduct();
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
	                    + '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+chName+'</label>'
	                    + '       <div class="col-sm-9 no-padding-right">'
	                    + '            <select name="projectMap[\''+enName+'_id\']" id="'+enName+'" onchange="clearProduct()" class="form-control removeFlag chosen-select" data-live-search="true">'
	                    + '            </select>'
	                    + '			   <input type="hidden" name="projectMap[\''+enName+'_name\']" class="projectInfoManager" />'		
	                    + '        </div>'
	                    + '</div>';
	    		//将新增的下拉框拼接到产品类型下拉框后面
	    		$("#product_model").parent().parent().after(str);
	    		//根据表名和产品类型，关联product表，开始构造option
	    	}
	    	var infoManageId = $("#infoManageId2").val();//得到咨询id
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
	                //如果productId不为空，所有选项查询出来后，再做回显
	                if(productId!="") {
	                	$.ajax({
	                		"type": "Post",
	                		"url": ctx + '/consultInfoManage/selectOptionValue',
	                		"dataType": "json",
	                		"data": {"productId":productId,"infoManageId":infoManageId},
	                		"success": function (data) {
	                			for(var k=0; k<data.length; k++) {
	                				var tableName2 = data[k].columnName;
	                				//去掉字段英文名后面的_id
	                				tableName2 = tableName2.substring(0,tableName2.length-3);
	                				$('#'+tableName2).val(data[k].columnValue);//回显
	                				$('#'+tableName2).trigger("chosen:updated");
	                				 
	                			}
	                			//将其它值为空的select去掉
	                			$("select.removeFlag").each(function(index,obj){
	                				if($(obj).val()==null || $(obj).val()=='') {
	                					$(obj).parent().parent().remove();
	                				}
	                			}); 
	                		}
	                	});
	                }
	                //生成考期选项-考期是后面新增的下拉选
       	            $("#productId").trigger("change");
	            },
	            error: function (response) {
	                toastr.error("系统错误");
	            }
	        });
	    });
});
	
	
	//将从后台得到的表名进行处理得到符合bean中字段格式的字符串，1.剔除_,2.后面的首字母大写
function nameHandler(str) {
  var array = str.toLowerCase();
  array = array.split("_");
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

//产品下拉选项联动考期
$('.row').on('change', '#productId', function(){
	// 获取selected产品ID
	var productId = $('#productId').val();
	var productExamTimeId = $('#productExamTimeId').val();
	
	//得到产品考期信息 
	$.ajax({
		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(info){
			if (info == null || info.length == 0){
				return;
			}
			var exm = '';
			for (var m = 0; m < info.length; m++) {
				if($("#productId").hasClass("init")) {//只有用户第一次查看回显数据信息时才需要回显选中的考期否则都是编辑操作无需回显选中的考期
					if(productExamTimeId==info[m].productExamTimeId) {
						exm += "<option value='"+info[m].productExamTimeId+"' selected>"+info[m].examTime+"</option>";
					} else {
						exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
					}
					$("#productId").removeClass("init");//移除产品信息初始化标志
				} else {
					exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
				}
			}
			$('#kTime').html('<option value="">--请选择--<option/>'+exm);
			$('#kTime').trigger('chosen:updated');
			$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
			
			//考期初始化完成后-生成相应的缴费列表
	         $('#kTime').trigger('change');
		},
		error: function (response) {
            toastr.error("不存在考期");
        }
	})
	
	//清除以前生成的子产品下拉选
	$("#childrenProduct").parents(".childrenProduct").remove();
	$(".selectpicker").selectpicker('refresh');
	//得到产品类型 1-子产品 0-主产品
	var productFormObj = JSON.parse($('#productId :selected').attr("showList"));
	var productForm = productFormObj["product_form"];
	 
	if(typeof(productForm)=="undefined" || productForm==null) {
		
	} else {
		if(productForm=="1") {
			//alert("子产品");
		} else {
			//alert("主产品");
			//开始拼接 -根据父产品id查询子产品id
			$.ajax({
				url : ctx + '/consultConsoleWFC/getChildrenProduct',//查询当前时间处于考期起止时间内的信息
				type : 'post',
				dataType : 'json',
				//data : {productParentId: productId},
				data : {productId: productId},//将主产品id作为参数传递过去
				success : function(data){
					var str = '<div class="form-group col-md-4 col-sm-6 childrenProduct">'
	                    + '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+"子产品"+'</label>'
	                    + '       <div class="col-sm-9 no-padding-right">'
	                    + '            <select id="childrenProduct" name="childrenProduct" class="form-control show-tick selectpicker" multiple data-live-search="true">';
//	                    + ' 				<option value="0">苹果</option>'
//	                    + '					<option value="1">菠萝</option>'
					debugger;
	                for(var i=0; i<data.length; i++) {
	                	str += '<option value="'+data[i].product_id+'">'+data[i].product_name+'</option>';
	                	debugger;
	                }     
	                str += '            </select>'
	                    + '        </div>'
	                    + '</div>';
	    		//将新增的下拉框拼接到产品类型下拉框后面
	    		$("#productId").parent().parent().after(str);
	    		//selectpicker插件初始化
	    		$(".selectpicker").selectpicker({  
	    			  'liveSearch': true,
	    			  'liveSearchPlaceholder': '请输入关键字',
	    			  'actionsBox': true,
	    			  'selectAllText': '全选',
	    			  'deselectAllText': '取消',
	    			  'noneSelectedText': '--请选择--'  
	    		});  
	    		//selectpicker初始化
	    		$(".selectpicker").selectpicker('refresh');
				}
			});
		}
	}
})


//考期变换-生成费用选项
$('#kTime').chosen().change(function () {
    //var obj = $(this).find(':selected');
    var productExamTimeId = $(this).val();//产品考期ID
    //得到数据查询出来时的状态值
    var oldStatus = $('#status2').val();
   
    //生成费用列表
    if(oldStatus=='6')　{//订座
    	appendPayDiv2(productExamTimeId,'appendPayBody');
    } else {
    	appendPayDiv(productExamTimeId,'appendPayBody');
    }
});