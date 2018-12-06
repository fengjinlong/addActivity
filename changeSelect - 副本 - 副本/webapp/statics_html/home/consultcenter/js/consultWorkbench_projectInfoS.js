/**
 * 预约单联动计算量
 * @param record
 * @returns
 */
function loadGT_YYD2(record) {
	//报名弹框-客户标签回显
    var infoManageId = $('#infoManageId2').val();
    $('.tagBM').html('');//清空客户标签内容
    
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
	            		$('.tagBM').append('<p class="label-box text-center"><span>' + tag[i] + '</span>'
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
            		zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"' selected>" + data[i].modelName + "</option>";
            	} else {
            		zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
            	}
            }
            
            $("#product_model2").html('<option value="">--请选择--</option>' + zxkc);
            $('#product_model2').trigger('chosen:updated');
            $("#product_model2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
            
            
            //产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#product_model2").trigger("change");
            
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    //回显产品报考时是否分期
    var isInstallment = record.isInstallment;
	var installmentRatioId = record.installmentRatioId;
    showSavedInstallment(isInstallment,installmentRatioId);
}

//当产品部分的下拉框发生改变时，需要制空产品下拉框——查看页面部分
function clearProduct2() {
	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
	if($("#productId2").hasClass("init")) {
		$("#productId2").removeClass("init");
		return $("#productId2").val();
	} 
	$("#productId2").html("");
	generateProduct2();//开始根据课程信息部分当前选中条件生成产品选项
	$("#productId2").trigger('chosen:updated');
	$("#productId2").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	//2017/11/20添加，清空考期下拉选旧数据;
	$('#kTime2').html('');
	$('#kTime2').trigger('chosen:updated');
	$("#kTime2").chosen({no_results_text: "没有匹配项", search_contains: true});
}


//页面生产产品按钮功能-查看信息页面部分
function generateProduct2() {
	//存放条件
	var conditionArray = new Array();
	$(".project3 select :selected").each(function(index,obj){
		
		//得到option的value即id值
		var idValue = $(obj).val();
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			if($(obj).parent().data("id")!=null) {//收款方，考期，考试地区不能加入条件
				var primaryIdName = $(obj).parent().data("id")+"_id";
				var primaryIdValue = "'"+idValue+"'";
				//形如XXX_id = 'YYY'
				var condition = primaryIdName + "=" + primaryIdValue;
				conditionArray.push(condition);
			}
		}
	});
	var conditions = conditionArray.join(" and ");
	
	var departmentId = $("#departmentId1Hidden").val();//得到信息量归属地id(分校id）
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions,"departmentId":departmentId},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
            	 for(var i=0; i<data.data.length; i++) {
            		 str += "<option value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
            	 }
            	 $("#productId2").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#productId2").trigger('chosen:updated');
            	 $("#productId2").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

$(function(){
	  //DMW添加，根据产品类型的选择，动态创建课程信息部分，其它下拉框-查看部分
	    $("#product_model2").change(function(){
	    	//清空考期下拉选
	    	$('#kTime2').html('');
	    	$('#kTime2').trigger('chosen:updated');
			$("#kTime2").chosen({no_results_text: "没有匹配项", search_contains: true});
	    	//产品模型发生改变，制空产品下拉框,如果没有制空则会得到初始时的productId
	    	var productId = "";
	    	productId = clearProduct2();
	    	//得到选中的option的Json信息
	    	var jsonObj = $('#product_model2 :selected').data("value");
	    	//如果当前模型下没有配置选项
	    	if(jsonObj=="undefined") {
	    		//清除上次选择后生成的下拉框
	        	$(".removeFlag").parent().parent().remove();
	        	
	        	//考期回显-考期是后面新增的下拉选
   	            $("#productId2").trigger("change");
	    		return;
	    	}
	    	
	    	//得到产品类型ID
	    	var modelId = $('#product_model2 :selected').val();
	    	//清除上次选择后生成的下拉框
	    	$(".removeFlag").parent().parent().remove();
	    	//用来组装表名
	    	var tableArray = new Array();
	    	//健壮性判断，如果没有取到产品模型对象jsonObj，直接return，结束方法
	    	if(null==jsonObj ||　typeof(jsonObj)=="undefined" || jsonObj.length==0) {
	    		//考期回显-考期是后面新增的下拉选
   	            $("#productId2").trigger("change");
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
	                    + '            <select  id="'+enName+'2" disabled class="form-control removeFlag chosen-select" data-id="'+enName+'">'
	                    + '            </select>'
	                    + '        </div>'
	                    + '</div>';
	    		//将新增的下拉框拼接到产品类型下拉框后面
	    		$("#product_model2").parent().parent().after(str);
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
	                	$('#'+data[i].tableName+'2').html('<option value="">--请选择--</option>' + zxkc);
	                	//加载下拉框样式
	                	$('#'+data[i].tableName+'2').trigger('chosen:updated');
	                	$("#"+data[i].tableName+'2').chosen({no_results_text: "没有匹配项", search_contains: true});
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
	                				$('#'+tableName2+'2').val(data[k].columnValue);//回显
	                				$('#'+tableName2+'2').trigger("chosen:updated");
	                				  
	                			}
	                			//将其它值为空的select去掉
	                			$("select.removeFlag").each(function(index,obj){
	                				if($(obj).val()==null || $(obj).val()=='') {
	                					$(obj).parent().parent().remove();
	                				}
	                			}); 
		           				 //考期回显-考期是后面新增的下拉选
		           	            $("#productId2").trigger("change");
	                		}
	                	});
	                }
	            },
	            error: function (response) {
	                toastr.error("系统错误");
	            }
	        });
	    });
});
	
	
	//将从后台得到的表名进行处理得到符合bean中字段格式的字符串，1.剔除_,2.后面的首字母大写
function nameHandler2(str) {
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
$('.row').on('change', '#productId2', function(){
	// 获取selected产品ID
	var productId = $('#productId2').val();
	var examTimeId = $('#examTimeId').val();
	 
	$.ajax({
		url : ctx + '/consultConsoleRL/getExamTimes',//查询所有考期起止（只为了回显使用，报名tab下不会修改）
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(info){
			if (info == null || info.length == 0){
				return;
			}
			var exm = '';
			for (var m = 0; m < info.length; m++) {
				if(examTimeId==info[m].examSettingId) {
					exm += "<option value='"+info[m].examSettingId+"' selected>"+info[m].examDate+"</option>";
				} else {
					exm += "<option value='"+info[m].examSettingId+"'>"+info[m].examDate+"</option>";
				}
			}
			$('#kTime2').html('<option value="">--请选择--<option/>'+exm);
			$('#kTime2').trigger('chosen:updated');
			$("#kTime2").chosen({no_results_text: "没有匹配项", search_contains: true});
			
			//考期初始化完成后-生成相应的缴费列表
	         $('#kTime2').trigger('change');
		},
		error: function (response) {
            toastr.error("不存在考期");
        }
	});
	
	//报名状态回显分期条件
    var infoManageId = $('#infoManageId2').val();
//    var productId = $("#productId2").val();
    showInstallment(infoManageId,productId);
})

//考期变换-生成费用选项
$('#kTime2').chosen().change(function () {
    //var obj = $(this).find(':selected');
	$(".project2 select").each(function(i,e){
		//$(e).addClass("comment_disabled");//将课程信息所有下拉框设置为不可回显
		$(e).prop("disabled",true);//将课程信息所有下拉框设置为不可回显
		$(e).trigger('chosen:updated');
	});
	
    var examTimeId = $(this).val();//产品考期ID
    
    //回显收款方
    var infoManageId = $('#infoManageId2').val();
    var productId = $("#productId2").val();
    $.ajax({
        url: ctx + '/consultConsoleSignUp/getStorePayee',
        type: 'POST',
        data: { infoManageId: infoManageId, productId:productId},
        dataType: 'json',
        success: function (data1) {
        	 
        	if(data1.map!=null && typeof(data1.map.payeeId)!="undefined") {
         		$("#payee2").html('<option value="'+data1.map.payeeId+'" >'+data1.map.payeeName+'</option>');
        	} else {
        		$("#payee2").html('');
        	}
        	$("#payee2").trigger("chosen:updated");
        }
    });
    //回显考试地区
    $.ajax({
        url: ctx + '/consultConsoleSignUp/getStoreBranchSchool',
        type: 'POST',
        data: { infoManageId: infoManageId, productId:productId},
        dataType: 'json',
        success: function (data2) {
        	if(data2.map!=null && typeof(data2.map.branchSchoolId)!="undefined") {
	        	$("#branchSchoolId2").html('<option value="'+data2.map.branchSchoolId+'" >'+data2.map.branchSchoolName+'</option>');
        	} else {
        		$("#branchSchoolId2").html('');
        	}
        	$("#branchSchoolId2").trigger("chosen:updated");
        }
    });
    
    //下面是回显优惠部分，有的就回显，没有的就不回显
    //首先先清除其它咨询量对该咨询量的影响
    $("#zkSelect2").parent().parent().remove();
    $("#jfSelect2").parent().parent().remove();
    $("#yhInput2").parent().parent().remove();
    //回显折扣信息
    $.ajax({
        url: ctx + '/consultConsoleSignUp/getUsedZK',
        type: 'POST',
        data: { infoManageId: infoManageId, productId:productId},
        dataType: 'json',
        success: function (dataZK) {
        	 
        	if(dataZK.map!=null && typeof(dataZK.map.zkId)!="undefined") {
        		var zkStr = '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
  		               + '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠折扣：</label>'
  		               + '   <div class="col-sm-9 no-padding-right">'
  		               + '       <select id="zkSelect2" name="discount" class="form-control chosen-select">'
        			   + '          <option value="'+dataZK.map.zkId+'" selected>'+dataZK.map.zkName+'</option>'
        			   + '       </select>'
					   + '   </div>'
					   + '</div>';
        		$("#branchSchoolId2").parent().parent().after(zkStr);
        		$("#zkSelect2").trigger("chosen:updated");
        	}
        }
    });
    //回显积分信息
    $.ajax({
    	url: ctx + '/consultConsoleSignUp/getUsedJF',
    	type: 'POST',
    	data: { infoManageId: infoManageId, productId:productId},
    	dataType: 'json',
    	success: function (dataJF) {
    		 
    		if(dataJF.map!=null && typeof(dataJF.map.jfId)!="undefined") {
    			var jfStr = '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
    				+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">积分活动：</label>'
    				+ '   <div class="col-sm-9 no-padding-right">'
    				+ '       <select id="jfSelect2" name="scale" class="form-control chosen-select">'
	    			+ '          <option value="'+dataJF.map.jfId+'" selected>'+dataJF.map.jfName+'</option>'
	    			+ '       </select>'
	    			+ '   </div>'
	    			+ '</div>';
    			$("#branchSchoolId2").parent().parent().after(jfStr);
    			$("#jfSelect2").trigger("chosen:updated");
    		}
    	}
    });
    //回显优惠码信息
    $.ajax({
    	url: ctx + '/consultConsoleSignUp/getUsedYHM',
    	type: 'POST',
    	data: { infoManageId: infoManageId, productId:productId},
    	dataType: 'json',
    	success: function (dataYHM) {
    		 
    		if(dataYHM.map!=null && typeof(dataYHM.map.code)!="undefined") {
    			var yhmStr = '<div class="form-group col-lg-4 col-md-4 col-sm-6 yhzkjf">'
							+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠码</label>'
							+ '   <div class="col-sm-9 no-padding-right">'
							+ '       <input id="yhInput2" name="activityCode" class="form-control yhInput" value="'+dataYHM.map.code+'" />'
							+ '   </div>'
							+ '</div>';
    			$("#branchSchoolId2").parent().parent().after(yhmStr);
    		}
    	}
    });
    
    //下面是回显服务使用情况
    //首先先清除其它咨询信息对这次查看的影响
    $(".serviceFees3").remove();
    //查询该考期该分校下的所有服务，并根据使用情况回显
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultConsoleSignUp/getServiceInfo",//查询服务费用
        "dataType": "json",
        "data": {
		    infoManageId: infoManageId,
		    productId:productId,
        	examTimeId: $("#kTime2").val(),//产品考期id
        	departmentId1:$("#departmentId1Hidden").val()//分校id，信息量归属地
        },
        "success": function (data3) {
        	 
        	if(data3.msg=='success'){
        		var tempStr = '<div class="form-group col-lg-12 col-md-12 col-sm-12 serviceFees3">'
        			+ '<label style="margin-left: -70px !important;" class="col-sm-2 col-lg-2 control-label no-padding-right">服务类型：</label>';
        		//开始构造复选框内容,取得所有服务信息
        		for(var x=0; x<data3.serviceList.length; x++) {
        			//data-codeId:费用种类codeId, data-required:服务是否必选，data-money：费用金额
        			//data-moneyLine:费用种类下限，data-enable：下限是否锁定， data-code：费用种类编码
        			//data-name:费用种类名称，data-type：费用类型-收益支出，data-value:服务id
        			var checkStr = '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
            			+ '	 <label>'
    					+ '	    <input type="checkbox" onclick="signServiceCli(this)" name="service2" class="service" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
    					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
    					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
    					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
    					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
    					+ '  </label>'	
    					+ '</div>';
        			//取得已使用的服务id和该考期该分校（信息归属地）,构造回显信息
        			for(var y=0; y<data3.usedService.length; y++) {
        				//判断是否必选1-是 0-否，如果是，该服务费默认勾选，并且不允许更改
            			if(data3.serviceList[x].productServiceId==data3.usedService[y].serviceId) {
            				checkStr = '<div class="checkbox col-sm-2 col-lg-2 no-padding-right no-padding-left">'
                    			+ '	 <label>'
            					+ '	    <input type="checkbox" checked disabled name="service2" class="service" data-codeid="'+data3.serviceList[x].expensesTypeId+'" data-required="'+data3.serviceList[x].isRequired+'"'
            					+ '            data-money="'+data3.serviceList[x].money+'" data-moneyline="'+data3.serviceList[x].moneyLine+'" data-enable="'+data3.serviceList[x].serviceEnable+'"' 
            					+ '            data-code="'+data3.serviceList[x].expensesTypeCode+'" data-name="'+data3.serviceList[x].expensesTypeName+'" data-type="'+data3.serviceList[x].expensesType+'"'
            					+ '			   data-value="'+data3.serviceList[x].productServiceId+'">'
            					+ '		<span class="text">'+data3.serviceList[x].productServiceName+'</span>'		
            					+ '  </label>'	
            					+ '</div>';
            				break;
            			} 
        			}
        			
        			tempStr += checkStr;
        		}
        		tempStr += '</div>';
        		$("#branchSchoolId2").parent().parent().after(tempStr);
        	}
        },
        "error":function() {
        	toastr.error("查询服务费用后台出错");
        }
	});
    //生成费用列表
//	 coursePayDiv(examTimeId,productId);
	coursePayDiv();
});