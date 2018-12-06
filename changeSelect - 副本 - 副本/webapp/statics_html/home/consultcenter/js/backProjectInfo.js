$(function () {
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
     
    //如果当前模型下没有配置选项
	if(jsonObj=="undefined") {
		return;
	}
	//jsonObj = JSON.parse(jsonObj);
	jsonObj = eval('(' + jsonObj + ')');
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

