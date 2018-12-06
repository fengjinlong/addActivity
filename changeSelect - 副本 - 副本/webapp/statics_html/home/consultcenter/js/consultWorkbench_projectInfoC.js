//子产品课程信息回显
function loadGT_Child(ProductDetail) {
	//产品id
	var productModelId = ProductDetail["product_model_id"];
	//初始产品模型,并且回显
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
            	if(data[i].modelId==productModelId) {
            		zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"' selected>" + data[i].modelName + "</option>";
            	} else {
            		zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+">" + data[i].modelName + "</option>";
            	}
            }
            $("#childProductModelId").html('<option value="">--请选择--</option>' + zxkc);
            $('#childProductModelId').trigger('chosen:updated');
            $("#childProductModelId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
             
            //产品模型初始化完成后，触发一次铲平模型的change事件，为了实现其它下拉框的回显。
            $("#childProductModelId").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

//子产品产品模型change事件
function ChildProModelChange() {
	//清空考期下拉选
	$('#childKTime').html('');
	$('#childKTime').trigger('chosen:updated');
	$("#childKTime").chosen({no_results_text: "没有匹配项", search_contains: true});
	//产品模型发生改变，制空产品下拉框,如果没有制空则会得到初始时的productId
	var productId = "";
	productId = $("#childProductId").val();
	//得到选中的option的Json信息
	var jsonObj = $('#childProductModelId :selected').data("value");
	//如果当前模型下没有配置选项
	if(jsonObj=="undefined") {
		//清除上次选择后生成的下拉框
    	$(".removeChildFlag").parent().parent().remove();
		return;
	}
	
	//得到产品类型ID
	var modelId = $('#childProductModelId :selected').val();
	//清除上次选择后生成的下拉框
	$(".removeChildFlag").parent().parent().remove();
	//用来组装表名
	var tableArray = new Array();
	 
	//健壮性判断，如果没有取到产品模型对象jsonObj，不用拼接其他课程信息，查询条件只有productModelId
	if(null==jsonObj ||　typeof(jsonObj)=="undefined" || jsonObj.length==0) {
		var tableName = 'product_model';
	} else {
		//开始构造最新的拼接结果
		for(var i=0; i<jsonObj.length; i++) {
			var enName = jsonObj[i].enName;
			var chName = jsonObj[i].chName;
			tableArray.push(enName);  
			//开始拼接 
			var str = '<div class="form-group col-md-4 col-sm-6">'
				+ '       <label class="control-label col-sm-5 no-padding-right" style="margin-left:-41px">'+chName+'</label>'
				+ '       <div class="col-sm-9 no-padding-right">'
				+ '            <select name="childrenProduct.projectMap[\''+enName+'_id\']" id="child_'+enName+'" class="form-control removeChildFlag chosen-select" disabled data-live-search="true">'
				+ '            </select>'
				+ '			   <input type="hidden" name="childrenProduct.projectMap[\''+enName+'_name\']" class="projectInfoManager2" />'		
				+ '        </div>'
				+ '</div>';
			//将新增的下拉框拼接到产品类型下拉框后面
			$("#childProductModelId").parent().parent().after(str);
			//根据表名和产品类型，关联product表，开始构造option
		}
		var tableName = tableArray.join("---");
	}
	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
	$.ajax({
        url: ctx + '/consultInfoManage/selectOptionByTable',
        type: 'POST',
        dataType: 'json',
        data: {"tableName":tableName,"modelId":modelId},
        success: function (data) {
        	 
            if(data==null || data.length==0) {//没有任何其它课程信息选项
            	//根据产品id回显其它课程信息，生成考期选项-考期是后面新增的下拉选
    	        $("#childProductId").trigger("change");
            	return;
            }
            for (var i = 0; i < data.length; i++) {
            	var zxkc = "";
            	for(var j=0; j<data[i].dataList.length; j++) {
            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
            	}
            	$('#child_'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
            	//加载下拉框样式
            	$('#child_'+data[i].tableName).trigger('chosen:updated');
            	$("#child_"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
            	$('.chosen-container').width('100%');
            }
            //根据产品id回显其它课程信息，生成考期选项-考期是后面新增的下拉选
	        $("#childProductId").trigger("change");
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

//子产品产品change事件
//选择产品，反向回显其他课程信息的option,并且声称考期option
//新增是否分期
function childPro2Change(obj) {
	//清除之前可能生成的分期div
	$("#childInstallmentDiv").remove();
	//回显其他课程信息部分
	//回显课程信息
	var showList = $(obj).find(":selected").attr("showList");
	if(showList!=null){
		showList = JSON.parse(showList);
		var aiId = null;
		for(var p in showList){
			aiId = p.replace("_id","");
			$('#child_'+aiId).val(showList[p]);
			$('#child_'+aiId).trigger('chosen:updated');
		}
	}
	 
	//将其它课程信息值为空的select去掉
	$("select.removeChildFlag").each(function(index,obj){
		 
		if($(obj).val()==null || $(obj).val()=='') {
			$(obj).parent().parent().remove();
		}
	}); 
	
	 
	// 获取selected产品ID-及子产品id
	var productId = $('#childProductId').val();
	//咨询量id
	var infoManageId = $('#infoManageId2').val();
	
	//得到产品收款方信息 
	$.ajax({
		url : ctx + '/consultConsoleWFC/getPayee',//查询当前选中产品考试地区信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(map){
			var option = '<option value="0">--请选择--<option/>';
			//回显用，查询该咨询量已经选中的收款方信息
			$.ajax({
				url : ctx + '/consultConsoleWFC/getProjectPayee',//查询当前选中产品考试地区信息
				type : 'post',
				dataType : 'json',
				data : {productId: productId,infoManageId:infoManageId},
				success : function(map2){
					  
					for(var j=0; j<map.length; j++) {
						if(map2!=null && map2.status=="success" && map2.payeeId==map[j].payeeId) {
							option += "<option value='"+map[j].payeeId+"' selected>"+map[j].payeeName+"</option>";
						} else {
							option += "<option value='"+map[j].payeeId+"'>"+map[j].payeeName+"</option>";
						}
					}
					$("#childPayee").html(option);
					$('#childPayee').trigger('chosen:updated');
					$("#childPayee").chosen({no_results_text: "没有匹配项", search_contains: true});
				},
				error: function() {
					toastr.error("getProjectPayee出错");
				}
			});
		}
	});
	
	//声称考期option部分
	//根据子产品id和咨询量id查询子产品的课程咨询信息
	//得到产品考期信息 
	var departmentId = $("#departmentId1Hidden").val();//信息量归属地id-分校id
	$.ajax({
		url : ctx + '/consultConsoleWFC/getChildProjectInfo',//查询当前时间处于考期起止时间内的信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId,infoManageId:infoManageId},
		success : function(data){
			//健壮性判断，判断是否有返回值
			if(data.data!=null) {
				var examTimeId = data.data.ktime;//子产品-产品考期id
				//子产品课程信息id，更新子产品信息使用
				$("#childProjectInfoManageId").val(data.data.projectInfoManageId);
			} else {
				var examTimeId = '';
			}
			//得到产品考期信息 
			$.ajax({
				url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
				type : 'post',
				dataType : 'json',
				data : {productId: productId, departmentId:departmentId},
				success : function(info){
//					if (info == null || info.length == 0){
//						$('#childKTime').html('<option value="">--请选择--<option/>');
//						$('#childKTime').trigger('chosen:updated');
//						$("#childKTime").chosen({no_results_text: "没有匹配项", search_contains: true});
//						return;
//					}
					var exm = '';
					for (var m = 0; m < info.length; m++) {
						if(examTimeId==info[m].examSettingId) {
							//考期回显
							exm += "<option value='"+info[m].examSettingId+"' selected>"+info[m].examDate+"</option>";
						} else {
							exm += "<option value='"+info[m].examSettingId+"'>"+info[m].examDate+"</option>";
						}
					}
					$('#childKTime').html('<option value="">--请选择--<option/>'+exm);
					$('#childKTime').trigger('chosen:updated');
					$("#childKTime").chosen({no_results_text: "没有匹配项", search_contains: true});
					
					//考期初始化完成后-生成相应的缴费列表
			        $('#childKTime').trigger('change');
			        
			      //得到产品考试地区信息 
			    	$.ajax({
			    		url : ctx + '/consultConsoleWFC/getBranchSchool',//查询当前选中产品考试地区信息
			    		type : 'post',
			    		dataType : 'json',
			    		data : {productId: productId},
			    		success : function(msg){
			    			var option = '<option value="">--请选择--<option/>';
			    			//回显用，查询该咨询量已经选中的考试地区id
			    			$.ajax({
			    				url : ctx + '/consultConsoleWFC/getProjectBranchSchool',//查询当前选中产品考试地区信息
			    				type : 'post',
			    				dataType : 'json',
			    				data : {productId: productId,infoManageId:infoManageId},
			    				success : function(msg2){
			    					  
			    					for(var n=0; n<msg.length; n++) {
			    						if(msg2!=null &&　msg2.status=="success" && msg2.branchSchoolId==msg[n].branchSchoolId) {
			    							//如果该咨询量已选中该考试地区
			    							option += "<option value='"+msg[n].branchSchoolId+"' selected>"+msg[n].fullName+"</option>";
			    						} else {
			    							option += "<option value='"+msg[n].branchSchoolId+"'>"+msg[n].fullName+"</option>";
			    						}
			    					}
			    					$("#childBranchSchoolId").html(option);
			    					$('#childBranchSchoolId').trigger('chosen:updated');
			    					$("#childBranchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
			    					//触发考试地区的change事件-构造支出费用与合计(第一次初始化页面，考试地区回显时要调用一次）
			    					childBranchSchoolChange();
			    				},
			    				error: function() {
			    					toastr.error("getProjectBranchSchool出错");
			    				}
			    			});
			    		}
			    	});
				},
				error: function (response) {
		            toastr.error("不存在考期");
		        }
			})
		}
	});
	
	//判断该产品是否允许分期
	var isInstallment = showList['is_installment'];
	if(isInstallment=='1') {
		//允许分期，生成分期复选框
		var str = '<div class="form-group col-lg-4 col-md-4 col-sm-6" id="childInstallmentDiv">'
			+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">是否分期:</label>'
			+ '   <div class="col-sm-9 no-padding-right">'
			+ '   <label> <input type="checkbox" class="installment" onclick="installmentFunForC(this)"/><span class="text"></span></label>'
			+ '   </div>'
			+ '</div>';
		//将新增的复选框拼接到产品类型下拉框后面
		$("#childProductId").parent().parent().after(str);
	} else {
		//清除之前生成的分期div
		$("#childInstallmentDiv").remove();
	}
	//调用一下是否分期复选框的单击事件，初始化分期来源和期次
	installmentFunForC($("#childInstallmentDiv").find("input"));
	//为页面隐藏域设置首付款比率
	var downpaymentsRatio = showList['downpayments_ratio'];
	$("#childDownpaymentsRatio").val(downpaymentsRatio);
}

//产品考期change事件
function childProExamChange(obj) {
	var examTimeId = $(obj).val();//产品考期ID
	var productId = $("#childProductId").val();
    //得到数据查询出来时的状态值
    var oldStatus = $('#status2').val();
    
    //得到当前主产品缴费模块的显示状态-子产品缴费和主产品缴费同时显示和隐藏
    var showFlag = $(".projectPayFees").is(":visible");
    //清除以前生成的子产品课程缴费信息
    $(".projectPayFees2").remove();
    //生成子产品课程缴费信息模块
    if(showFlag) {
    	//移除前子产品是显示状态
    	var str = '<div class="well with-header projectPayFees2">';
    } else {
    	//移除前子产品是隐藏状态
    	var str = '<div class="well with-header projectPayFees2" style="display:none">';
    }
		str += '		<div class="header bordered-blue">'
		+'			<div style="float:left">'
		+'				<b>子产品课程缴费信息</b>'
		+'			</div>'
		+'			<div style="float:right">'
		+'				<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>'
		+'			</div>'
		+'		</div>'
		+'		<table class="table table-striped table-hover table-bordered dataTable no-footer">'
		+'				<tr id="childPayFeesTR">'
		+'					<th>收费项目</th>'
		+'					<th>产品应缴</th>'
		+'					<th>实际应缴</th>'
		+'					<th>实缴</th>'
		+'					<th>支付方式</th>'
		+'					<th>欠费</th>'
		+'				</tr>'
		+'			<tbody id="appendChildPayBody" >'
		+'			</tbody>'
		+'			<tr id="appendChildPayTr">'
		+'				<td colspan="6">'
		+'					<div class="form-group col-lg-12 col-md-12 col-sm-12">'
        +'                        <label class="col-sm-2  no-padding control-label">下次缴费时间：</label>'
        +'                        <div class="input-group col-sm-8 payment-time"> '
        +'                            <input name="childrenProduct.nextPayTime" id="childNextPayTime" class="form-control paymentTime" type="text">'
        +'                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
        +'                        </div>'
        +'                    </div>'
		+'				</td>'
		+'			</tr> '
		+'		</table>'
		+'	</div>';
    $(".project2").after(str);
    appendChildPayDiv(examTimeId,'appendChildPayBody', productId);
    //刷新一下datetimepicker插件，使新增的时间日期空间有效
    $(".paymentTime").datetimepicker({
    	  language: 'zh-CN',
    	  format: 'yyyy-mm-dd hh:ii:ss',
    	  autoclose: true,
    	  startDate: new Date()
   });
//    //生成费用列表
//    if(oldStatus=='6')　{//订座
//    	appendChildPayDiv2(productExamTimeId,'appendPayBody');
//    } else {
//    	appendChildPayDiv(productExamTimeId,'appendPayBody');
//    }
}

//考试地区下拉选change事件，查询支出费用
function childBranchSchoolChange() {
	//清空以前生成的支出费用
	$("#appendChildPayBody").find("tr.zhiChu").remove();
	var branchSchoolIdStr = $("#childBranchSchoolId").val();//考试地区id
	var examTimeIdStr = $("#childKTime").val();//产品考期id
	var productIdStr = $("#childProductId").val();//产品id
	//清除子产品课程信息下以前生成的积分，折扣，优惠码
	$(".project2 .yhzkjf").remove();
	if(branchSchoolIdStr==null || branchSchoolIdStr=='') {
		//如果考试地区选择的是空，直接返回
		return;
	}
	
	//先移除子产品课程信息下以前拼接的支出费用
	$('.project2 .zhiChu').remove();
	//拼接支出费用
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendPayDiv?x="+(new Date()).valueOf(),
        "dataType": "json",
        "data": {
            examTimeId: examTimeIdStr,
            departmentId1:branchSchoolIdStr,
            expensesType:1,//费用类型-支出
            productId:productIdStr
        },
        "success": function (data) {
        	if(data.status=='success'){
        		 
        		for(var i=0; i<data.list.length; i++) {
        				//拼接费用行
        				$('#childHjDiv').before('<tr class="appendDiv zhiChu">'
        						+ ' <td>' + data.list[i].name + '</td>'
        						+ '<td>' 
        						+ data.list[i].price //产品应缴
        						+ '</td>'
        						+ '<td id="' + data.list[i].code + '" data-value="'+data.list[i].moneyLine+'" data-value2="'+data.list[i].price+'" data-value3="'+data.list[i].serviceEnable+'" data-value4="'+data.list[i].expensesType+'" >'
        						+ data.list[i].price //实际应缴
        						+ '</td>'
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].payValue" value="'+ data.list[i].price +'"/>'//用来存储产品应缴值
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].yjValue" value="'+data.list[i].price+'" class="payCompYJ"/>'//用来存储实际应缴值,初始值为产品应缴值
        						+ '<input type="hidden" name="childPayFees.payZhiChuList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="childPayFees.payZhiChuList['+i+'][payCodeId]" class="payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].payCode" value="'+data.list[i].code+'"/>'
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].payCodeId" value="'+data.list[i].codeId+'"/>'
        						+ '<input type="hidden" name="childPayFees.payZhiChuList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
        						+ '<input type="hidden" name="childPayFees.payZhiChuList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].payName" value="'+data.list[i].name+'"/>'
        						//下面是优惠部分参数
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].activityCode" class="activityCode" value=""/>'//优惠码id
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].activityValue" class="activityValue" value=""/>'//优惠码金额
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].discount" class="discount" value=""/>'//折扣id
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].discountValue" class="discountValue" value=""/>'//折扣金额
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].integral" class="integral" value=""/>'//积分id
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].integralValue" class="integralValue" value=""/>'//积分数值
        						+ '<td id="' + data.list[i].code + '_value">'
        						+ 0//实缴费
        						+ '</td>'
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].sjValue" class="payCompSJ" value="'+0+'"/>'//用来存储实缴值,初始值为0
        						+ ' <td><div class="payment">'
        						+ '<div class="col-sm-5">'
        						+ '   <select class="form-control" >'
        						+ '		<option value="1">现金</option>'
        						+ '        <option value="2">刷卡</option>'
        						+ '        <option value="3">支票</option>'
        						+ '        <option value="4">汇款-微信</option>'
        						+ '        <option value="5">汇款-支付宝</option>'
        						+ '        <option value="6">汇款-网络</option>'
        						+ '        <option value="7">银行转账</option>'
        						+ '        <option value="8">分期</option>'
        						+ '    </select>'
        						+ '</div>'
        						+ '<div class="col-sm-5">'
        						+ '     <input ondblclick="childDbclick(this)" class="form-control zjsjflag" onkeyup="childSshj(this)" type="text" placeholder="0" >'
        						+ '	    <input type="hidden" name="childPayFees.payZhiChuList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
        						+ ' </div>'
        						+ '<div class="col-sm-2">'
        						+ '<i onclick="addChildRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle zhiChu payment-btn blue control-label"></i>'
        						+ '</div>'
        						+ '</div>'
        						+ '</td>'
        						+ '<td class="zjcfflag">'
        						+ data.list[i].price
        						+ '</td>'
        						+ '<input type="hidden" name="childPayComp.payZhiChuCompList['+i+'].cfValue" class="payCompCF" value="'+data.list[i].price+'"/>'//用来存储欠费值,初始值为产品应缴值
        						+ '</tr>');
        		}
       		childHheji();//合计
        	}else{
            	//toastr.error(data.msg);//当前产品考期和分校下没有配置缴费信息
            }
        }
	});
	
	//先移除子产品课程信息下以前拼接的优惠类型
	$('.project2 .yhzkjf').remove();
	//生成优惠类型（积分，折扣下拉框展示),需要判断选中产品下配置了哪类优惠活动
	$.ajax({
        "type": "Post",
        "url": ctx + "/consultBookingSeats/appendZKJFYH",//查询优惠，折扣，积分
        "dataType": "json",
        "data": {
        	project: productIdStr//产品id
        },
        "success": function (data2) {
        	if(data2.status=='success'){
        		//如果有折扣活动，凭借折扣活动
        		if(data2.ZKList!=null && typeof(data2.ZKList)!='undefined' && data2.ZKList.length>0) {
        			$("#childBranchSchoolId").parent().parent().after(
   	       			     '<div class="form-group col-lg-4 col-md-4 col-sm-4 yhzkjf">'
   		               + '   <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">优惠折扣</label>'
   		               + '   <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">'
   		               + '       <select id="childZkSelect" name="discount" onchange="childZkChange(this)" class="form-control chosen-select">'
   		               + '       </select>'
   		               + '   </div>'
   		               + '</div>');
  	        	//拼接折扣下拉选-value:活动id，data-value：费用类型code_id集合，data-discount:折扣，data-multi：是否可叠加
      	        	var zkOption = '<option value="" data-value="" data-discount="" data-multi="">--请选择--</option>';
      	        	for(var m=0; m<data2.ZKList.length; m++) {
      	        		zkOption += '<option value="'+data2.ZKList[m].activityId+'" data-value="'+data2.ZKList[m].epId+'" data-discount="'+data2.ZKList[m].discount+'" data-multi="'+data2.ZKList[m].isMulti+'">'+data2.ZKList[m].title+'</option>';
      	        	}
      	        	$("#childZkSelect").html(zkOption);
      	        	$('#childZkSelect').trigger('chosen:updated');
      	        	$("#childZkSelect").chosen({no_results_text: "没有匹配项", search_contains: true});
      	        	
        		}
        		//如果有积分活动，拼接积分活动
        		if(data2.JFList!=null && typeof(data2.JFList)!='undefined' && data2.JFList.length>0) {
        			$("#childBranchSchoolId").parent().parent().after(
   					 '<div class="form-group col-lg-4 col-md-4 col-sm-4 yhzkjf">'
   	               + '   <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">积分活动：</label>'
   	               + '   <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">'
   	               /*+ '       <select id="childJfSelect" name="integral" onchange="childJfChange(this)" class="form-control chosen-select">'*/
   	               + '       <select id="childJfSelect" onchange="childJfChange(this)" class="form-control chosen-select">'
   	               + '       </select>'
   	               + '   </div>'
   	               + '</div>');
        		//拼接积分下拉选-value:活动id，data-value：费用类型code_id集合，data-sclae1:元(积分兑换比例)，data-scale2:积分(积分兑换比例), data-multi：是否可叠加
   	        	var jfOption = '<option value="" data-value="" data-scale1="" data-scale2="" data-multi="">--请选择--</option>';
   	        	for(var n=0; n<data2.JFList.length; n++) {
   	        		jfOption += '<option value="'+data2.JFList[n].activityId+'" data-value="'+data2.JFList[n].epId+'" data-scale1="'+data2.JFList[n].scale1+'" data-scale2="'+data2.JFList[n].scale2+'" data-multi="'+data2.JFList[n].isMulti+'">'+data2.JFList[n].title+'</option>';
   	        	}
   	        	$("#childJfSelect").html(jfOption);
   	        	$('#childJfSelect').trigger('chosen:updated');
   	        	$("#childJfSelect").chosen({no_results_text: "没有匹配项", search_contains: true});
        		}
        		//如果有优惠码活动，拼接优惠码活动-（虽然可能配错有多个同种优惠类型，但是在这里只取第一个）
        		if(data2.YHList!=null && typeof(data2.YHList)!='undefined' && data2.YHList.length>0) {
        			//for(var k=0; k<data2.YHList.length; k++) {
        				$("#childBranchSchoolId").parent().parent().after(
        						'<div class="form-group col-lg-4 col-md-4 col-sm-4 yhzkjf">'
        						//+ '   <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">优惠码：</label>'
        						+ '   <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">'+data2.YHList[0].title+'</label>'
        						+ '   <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">'
        						+ '       <input id="childYhInput" name="childPayComp.activityCode" onblur="childActivtyCode(this)" data-value="'+data2.YHList[0].isMulti+'" data-limit="'+data2.YHList[0].limit1+'" class="form-control childYhInput" placeholder="请输入8位优惠码"/>'
        						+ '       <input id="childYhqprice" name="childPayComp.activityValue" type="hidden" class="form-control childYhqprice"/>'
        						+ '   </div>'
        						+ '</div>');
        			//}
        		}
        	}
        },
        "error":function() {
        	toastr.error("查询折扣，积分后台出错");
        }
	});
}