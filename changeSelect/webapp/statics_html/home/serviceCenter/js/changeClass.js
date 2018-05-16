var INFOID;
var PROID;
var DEPID;
var TRAID;
var DUTYDEP;
var TYPE;
var FEIYONG1=false;
var FEIYONG2=false;
var FEIYONG3=false;
$(function(){
	init1();
	init2();
	init3();
	
	//回车搜索
	$('#key1').bind('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	init1(); 
        }  
    });
	$('#key2').bind('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	init2(); 
        }  
    });
	$('#key3').bind('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	init3(); 
        }  
    });
    
    //初始化日期
	durationDate('.paymentTime','到');
    $(".reservation").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView:2
    });

    //单选下拉框
    $(".chosen-select").chosen();

    
    parentChild("#dutyDiv");
    
    //责任部门change事件
    $('#dutyDiv').on('change', 'select[name=parent]', function () {
    	var id=$(this).val();
    	var _this=this;
    	//查询责任人
    	$.post(ctx + '/classTransferController/queryDepUser',{
    		departmentId:id
    	},function(data){
    		if(data.status=="success"){
    			var str='';
    			$.each(data.data,function(index,obj){
    				str+='<option value="'+obj.userId+'">'+obj.realName+'</option>'
    			})
    			$(_this).parent().parent().find("td").eq(2).find("select").html(str);
    			var a=$(_this).parent().attr("rowspan");
    			var  rowspan=parseInt(a);
    			var child=$(_this).parent().parent().next();
    			for(var i=1;i<rowspan;i++){
    				$(child).find("td").eq(0).find("select").html(str);
    				child=child.next();
    			}
    			//存放起来str
    			$(_this).parent().attr("str",str);
    		}else{
    			toastr.error("查询责任人失败");
    		}
    	},"json")
    })
    
    
    
    
    //隐藏退差价div
    $("#tuichajia2").hide();
    //隐藏优惠码div
    $(".fuwuCodeDiv").hide();
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
            $("#addProductModel2").html('<option value="">--请选择--</option>' + zxkc);
            $('#addProductModel2').trigger('chosen:updated');
            $("#addProductModel2").chosen({no_results_text: "没有匹配项", search_contains: true});
            
            $("#addProductModel").html('<option value="">--请选择--</option>' + zxkc);
            $('#addProductModel').trigger('chosen:updated');
            $("#addProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
            
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#addProductId2').val("");
    $('#addProductId2').trigger("chosen:updated");
    
    $('#addProductId').val("");
    $('#addProductId').trigger("chosen:updated");
    
  //查常用联系人
	$.post(ctx + '/studentServiceCenter/queryBizFinancePayee',{
		
	},function(data){
		if(data.status=='success'){
			var str='<option value="" data-record="{}"> 请选择 </option>';
			$.each(data.data,function(index,obj){
				str+='<option value="'+obj.financePayeeId+'" data-record=\''+JSON.stringify(obj)+'\'> '+obj.accountName+' </option>';
			});
			$('select[name="financePayeeId"]').html(str);
			$('select[name="financePayeeId"]').trigger('chosen:updated');
		}else{
			swal("", "查询常用联系人失败！", "error");
		}
	},"json")
	
	//查费用类别  父类
	$.post(ctx + '/bizFinance/loadCostClass',{
		parentId:0
	},function(data){
		var str='<option value="" > 请选择 </option>';
		$.each(data,function(index,obj){
			str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
		});
		$('select[name="financeCostclassId1"]').html(str);
	},"json")
	
	
	//空支出父类change 动态加载子类费用类别
	$('#kongzhichu select[name="financeCostclassId1"]').on('change',function(){
		var _this=this;
		//查费用类别  子类
		$.post(ctx + '/bizFinance/loadCostClass',{
			parentId:$(_this).val()
		},function(data){
			var str='';
			$.each(data,function(index,obj){
				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
			});
			$('#kongzhichu select[name="financeCostclassId2"]').html(str);
		},"json")
	})
	$('#tuichajia select[name="financeCostclassId1"]').on('change',function(){
		var _this=this;
		//查费用类别  子类
		$.post(ctx + '/bizFinance/loadCostClass',{
			parentId:$(_this).val()
		},function(data){
			var str='';
			$.each(data,function(index,obj){
				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
			});
			$('#tuichajia select[name="financeCostclassId2"]').html(str);
		},"json")
	})
	
	//常用收款人change 
	$('#kongzhichu select[name="financePayeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#kongzhichu input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#kongzhichu input[name="province"]').val(bizFinancePayee.province);
		$('#kongzhichu input[name="city"]').val(bizFinancePayee.city);
		$('#kongzhichu input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#kongzhichu input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#kongzhichu input[name="phone"]').val(bizFinancePayee.phone);
	})
	$('#tuichajia select[name="financePayeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#tuichajia input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#tuichajia input[name="province"]').val(bizFinancePayee.province);
		$('#tuichajia input[name="city"]').val(bizFinancePayee.city);
		$('#tuichajia input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#tuichajia input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#tuichajia input[name="phone"]').val(bizFinancePayee.phone);
	})
	$('#kongzhichu2 select[name="financePayeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#kongzhichu2 input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#kongzhichu2 input[name="province"]').val(bizFinancePayee.province);
		$('#kongzhichu2 input[name="city"]').val(bizFinancePayee.city);
		$('#kongzhichu2 input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#kongzhichu2 input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#kongzhichu2 input[name="phone"]').val(bizFinancePayee.phone);
	})
	$('#tuichajia2 select[name="financePayeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#tuichajia2 input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#tuichajia2 input[name="province"]').val(bizFinancePayee.province);
		$('#tuichajia2 input[name="city"]').val(bizFinancePayee.city);
		$('#tuichajia2 input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#tuichajia2 input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#tuichajia2 input[name="phone"]').val(bizFinancePayee.phone);
	})
   
  //查看发送短信下载
    $('#stuServiceCenterInfo').on('click', '.ck', function () {
        var infoManageId = $(this).attr('data-record');
        var productId = $(this).attr('data-record2');
        var transferId = $(this).attr('data-transfer');
        var dataType = $(this).attr('data-type');
        INFOID=infoManageId;
        PROID=productId;
        TRAID=transferId;
        TYPE=dataType;
        if(TYPE==1){
        	$("#btuDiv").show();
        	$("#dutyDiv").hide();
        	$("#tuichajia2").hide();
        	$("#kongzhichu2").hide();
        }else if(TYPE==2){
        	$("#btuDiv").show();
        	$("#dutyDiv").show();
        	$("#kongzhichu2").show();
        	loadDuty();
        }else if(TYPE==3){
        	$("#btuDiv").hide();
        	$("#dutyDiv").show();
        	$("#kongzhichu2").show();
        	//回显责任鉴定
        	$.post(ctx + '/classTransferController/queryDutyJudge',{
        		classTransferId:TRAID
        	},function(data){
        		if(data.status=='success'){
        			var list=[];
        			//拆分数据
        			var dutyDepartmentId='';
        			var isWithdraw='';
        			$.each(data.data,function(index,obj){
        				 if(dutyDepartmentId!=obj.dutyDepartmentId || isWithdraw!=obj.isWithdraw){
        					 dutyDepartmentId=obj.dutyDepartmentId;
        					 isWithdraw=obj.isWithdraw;
        					 var depObj=[];
        					 depObj["dutyDepartmentId"]=obj.dutyDepartmentId;
        					 depObj["dutyDepartmentName"]=obj.dutyDepartmentName;
        					 depObj["isWithdraw"]=obj.isWithdraw;
        					
        					 var useObjList=[];
        					 var useObj={};
        					 useObj["dutyPersonId"]=obj.dutyPersonId;
        					 useObj["dutyPersonName"]=obj.dutyPersonName;
        					 useObj["penalty"]=obj.penalty;
        					 useObjList.push(useObj);
        					 
        					 depObj["useObjList"]=useObjList;
        					 list.push(depObj);
        				 }else{
        					 var useObj={};
        					 useObj["dutyPersonId"]=obj.dutyPersonId;
        					 useObj["dutyPersonName"]=obj.dutyPersonName;
        					 useObj["penalty"]=obj.penalty;
        					 depObj=list[list.length-1];
        					 depObj["useObjList"].push(useObj);
        				 }
        			})
        			//回显数据
        			var str='';
        			$.each(list,function(index,obj){
        				str+='<tr parent-tr="parent-'+(index+1)+'">'
	                        +'  <td width="20%" rowspan="'+obj["useObjList"].length+'">'
	                        +'        <select name="parent" class="form-control" id="parent">'
	                        +'<option>'+obj["dutyDepartmentName"]+'</option>'
	                        +'        </select>'
	                        +'    </td>'
	                        +'     <td width="20%" rowspan="'+obj["useObjList"].length+'">'
	                        +'        <select  class="form-control" >';
				        				if(obj["isWithdraw"]==1){
				        					str+='<option value="1">是</option>'
				        				}else{
				        					str+='<option value="0">否</option>'
				        				}
	                   str +='       </select>'
	                        +'   </td>'
	                        +'   <td width="40%">'
	                        +'       <div class="col-sm-11 no-padding">'
	                        +'            <select name="child" class="form-control" id="child">'
	                        				+'<option>'+obj["useObjList"][0].dutyPersonName+'</option>'
	                        +'           </select>'
	                        +'       </div>'
	                        +'       <label class="control-label pull-left childNode">'
	                        +'           <a class="fa fa-plus success operate-btn"></a>'
	                        +'       </label>'
	                        +'   </td>'
	                        +'   <td width="40%">'
	                        +'       <input  class="form-control" value='+obj["useObjList"][0].penalty+' />'
	                        +'   </td>'
	                        +'</tr>';
	                   
	                   for(var i=1;i<obj["useObjList"].length;i++){
	                	   str+='<tr child-tr="parent-'+(index+1)+'">'
			                   +'    <td width="40%">'
			                   +'        <div class="col-sm-11 no-padding">'
			                   +'           <select name="child" class="form-control" id="child">'
			   				   +'             <option>'+obj["useObjList"][i].dutyPersonName+'</option>'
			                   +'            </select>'
			                   +'        </div>'
			                   +'        <label class="control-label pull-left childNode">'
			                   +'            <a class="fa fa-plus success operate-btn"></a>'
			                   +'        </label>'
			                   +'    </td>'
			                   +'    <td width="40%">'
			                   +'        <input  class="form-control" value='+obj["useObjList"][1].penalty+' />'
			                   +'    </td>'
			                   +'</tr>'
	                   };
        			});
        			$("#addFolwTbody").html(str);
        			k3.html(data.data[0].remark);
        		}else{
        			toastr.error("回显责任鉴定出错");
        		}
        	},"json")
        }
        $.post(ctx + '/consultInfoManage/findOneNew',{infoManageId:infoManageId,productId:productId},function(data){
        	if(data.status=='success'){
        		fillStuBaseInfo(data.data);
        		DEPID=data.data.departmentId1;
        		$('#addProductModel2').val(data.data.productModelId);
                $("#addProductModel2").trigger("chosen:updated");
                $('#addProductModel2').change();
                
              //回显咨询分校等等
        		$(".serviceView .d1").html(data.data.departmentName1)
        		$(".serviceView .d2").html(data.data.brandName)
        		$(".serviceView .d3").html(data.data.studentAttrName2)
        		$(".serviceView .d4").html(data.data.studentAttrName1)
        		var a='';
        		if(data.data.studentMaturity==1){
        			a='A';
        		}else if(data.data.studentMaturity==2){
        			a='B';
        		}else if(data.data.studentMaturity==3){
        			a='C';
        		}else if(data.data.studentMaturity==4){
        			a='D';
        		}
        		$(".serviceView .d5").html(a)
                
              //回显 ai字段 和 product
              //回去tableName
            	var jsonObj = $('#addProductModel2 :selected').data("value");
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
            		 $('#addProductId2').html("<option>"+data.data.productName+"</option>");
                     $('#addProductId2').trigger("chosen:updated");
                     $('#addProductId2').change();
                     //product回显
                     if(tableName!=null && tableName!=""){
                    	 $.post(ctx+"/bizContract/showAi",
                     		{"tableNames":tableName,"productId":data.data.productId},
             	            function(data2){
             	            	if(data2.status=='success'){
             	            		for(var i=0; i<jsonObj.length; i++) {
             	                		var enName = jsonObj[i].enName;
             	                		var enNameId=enName+"_id";
             	                		$("#1add"+enName).val(data2[enNameId]);
             	                		$("#1add"+enName).trigger("chosen:updated");
             	                	}
             	            	}else{
             	            		toastr.error("产品ai字段查询出错");
             	            	}
             	            },"json")
                     }
    			//}, 2000);
        		//回显考期信息
        		var local = "<option selected>"+data.data.kTimeValue+"</option>";
				$('#kTime2').html(local);
				if(data.data.kTimeValue==""){
					toastr.error("无考期信息");
				}
        		$('#kTime2').trigger("chosen:updated");
                $('#kTime2').change();
                //回显收款方信息
                var payeeOption = "";
                if(data.data.payee!=null){
					if(data.data.payee==1){
						console.log("1")
						payeeOption="<option selected>中和</option>";
					}
					if(data.data.payee==2){
						console.log("2")
						payeeOption="<option selected>学慧网</option>";
					}
					if(data.data.payee==4){
						console.log("4")
						payeeOption="<option selected>合作方</option>";
					}
				}
				$('#classId2').html(payeeOption);
				//$('#scdata2').find('select[name=shoukuanfang]').html(payeeOption);
        	}
        },'json');
        
        //回显考试地域信息
        $.post(ctx + '/consultInfoManage/getConsultBranchSchool',{"productId": productId, "infoManageId":infoManageId},function(msg2){
        	if(msg2.status=="success") {
        		var local = "<option selected>"+msg2.data.departmentName+"</option>";
				$('.branchSchoolId').html(local);
        	}else{
        		$('.branchSchoolId').html("");
        		toastr.error("回显考试地域信息失败");
        	}
        },"json");
        
        
        //回显old费用信息
        $.post(ctx + '/classTransferController/queryFeeDeduction',{"classTransferId": TRAID},function(msg2){
        	if(msg2.status=="success") {
        		var yj=0;
        		var sj=0;
        		var zc=0;
        		var kf=0;
        		var jy=0;
        		var str='';
				$.each(msg2.data,function(index,obj){
					yj=Number(obj.yjValue)+Number(yj);
					sj=Number(obj.sjValue)+Number(sj);
					zc=Number(obj.zcValue)+Number(zc);
					kf=Number(obj.kfValue)+Number(kf);
					jy=Number(obj.jyValue)+Number(jy);
					str+='<tr>'
						+'<th scope="row">'+obj.payName+'</th>'
						+'<td>'+obj.yjValue+'</td>'
						+'<td>'+obj.sjValue+'</td>'
						+'<td>'+obj.zcValue+'</td>'
							+'<td class="koufei"><input type="text" onkeyup="koufeiKeyUp(this)"'
							+'	class="form-control comment_disabled"  value="'+obj.kfValue+'"></td>'
							+'<td class="jieyu">'+obj.jyValue+'</td>'
						+'</tr>';
				})
				str+='<tr>'
					+'<th scope="row">合计</th>'
					+'<td>'+yj+'</td>'
					+'<td>'+sj+'</td>'
					+'<td>'+zc+'</td>'
						+'<td class="koufei"><input type="text" '
						+'	class="form-control comment_disabled" readonly="readonly" value="'+kf+'"></td>'
						+'<td id="jieyuVal">'+jy+'</td>'
					+'</tr>';
				$('#payMentTableInfoBody').html(str);
        	}else{
        		$('#payMentTableInfoBody').html("");
        		toastr.error("回显费用信息失败");
        	}
        },"json");
        
        //回显新课程信息
        $.post(ctx + '/classTransferController/queryNewCourse',
		{"classTransferId": TRAID
		},function(msg2){
			if(msg2.status=="success"){
				var obj=msg2.data;
				$('#addProductModel').val(obj.newProductModalId);
		        $("#addProductModel").trigger("chosen:updated");
		        $('#addProductModel').change();
		        
		      //回显 ai字段 和 product
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
		    		 $('#addProductId').val(obj.newProductId);
		             $('#addProductId').trigger("chosen:updated");
		             $('#addProductId').change();
		             
		             //setTimeout(() => {
		            	 $("#kTime").val(obj.newProductExamTimeId);
			             $('#kTime').trigger("chosen:updated");
			             $('#kTime').change();
			             
			             $("#branchSchoolId").val(obj.newBranchSchoolId);
			             $('#branchSchoolId').trigger("chosen:updated");
			             $('#branchSchoolId').change();
			             
			             $("#payee").val(obj.newPayeeId);
			             $('#payee').trigger("chosen:updated");
			             $('#payee').change();
			             
			             //setTimeout(() => {
							var fuwuIds=obj.serviceIds;
							$.each($(".fuwuCheck"),function(index,fuwuObj){
								$.each(fuwuIds.split(","),function(inde,fuwuId){
									if($(fuwuObj).val()==fuwuId){
										$(fuwuObj).prop("checked",true);  
									}
								})
							})
							var youhuiIds=obj.activityIds;
							$.each($(".youhuiCheck"),function(index,youhuiObj){
								$.each(youhuiIds.split(","),function(inde,youhuiId){
									if($(youhuiObj).val()==youhuiId){
										$(youhuiObj).prop("checked",true);  
										var record=JSON.parse($(youhuiObj).attr("data-record"));
										if(record.type==1){
											$("#fuwuCode").val(obj.activityCode);
											$("#fuwuCode").attr("readOnly", true);
											//发请求查询优惠码金额
											$.post(ctx + '/studentServiceCenter/selectActivityCode',{
												code:obj.activityCode,
												dept:DEPID
											},function(val3){
												if(val3.status=="success"){
													var money=data.data.amount;
													$("#fuwuCodeMoney").val(money);
													$(".fuwuCodeDiv").show();
												}else{
													toastr.error("查询优惠金额失败");
												}
											})
										}
									}
								})
							})
						//}, 1000);
					//}, 1000);
				//}, 3000);
			}else{
				toastr.error("查询新课程信息失败");
			}
		},"json");
        
        
        //回显缴费信息
        $.post(ctx + '/classTransferController/queryNewFee',{"classTransferId": TRAID},function(msg2){
        	if(msg2.status=="success") {
        		var str='';
				$.each(msg2.data,function(index,obj){
					if(obj.type==1){
						str+='<tr class="shou">';
					}else if(obj.type==2){
						str+='<tr class="zhi">';
					}else if(obj.type==3){
						str+='<tr class="fuwu">';
					}
					str+='<th scope="row" data-payCodeId="'+obj.payCodeId+'">'+obj.payName+'</th>'
						+'<td>'+obj.yjValue+'</td>'
						+'<td>'+obj.sjyjValue+'</td>'
						+'<td><input onkeyup="shijiaoKeyUp(this)" value="'+obj.sjValue+'" /></td>'
						+'<td>结余</td>'
						+'<td>'+obj.qfValue+'</td>'
						+'</tr>';
				})
				$('#appendPayBody').html(str);
        	}else{
        		$('#appendPayBody').html("");
        		toastr.error("回显缴费记录失败");
        	}
        },"json");
        //回显空支出
        $.post(ctx + '/classTransferController/queryBlankReturn',{"classTransferId": TRAID,"type":1},function(msg2){
        	if(msg2.status=="success") {
        		var obj=msg2.data;
				$('#kongzhichu2').find('input[name=peploName]').val(obj.createUserName);
				$('#kongzhichu2').find('input[name=nowTime]').val(obj.createDate);
				$('#kongzhichu2').find('input[name=kongzhichuMoney]').val(obj.money);
				$('#kongzhichu2').find('select[name=financePayeeId]').val(obj.linkman);
				$('#kongzhichu2').find('select[name=financePayeeId]').change();
				$('#kongzhichu2').find('select[name=financeCostclassId1]').html('<option>'+obj.parentTypeName+'</option>');
				$('#kongzhichu2').find('select[name=financeCostclassId2]').html('<option>'+obj.childrenTypeName+'</option>');
				$('#kongzhichu2').find('select[name=financeCostclassId1]').trigger('chosen:updated');
				$('#kongzhichu2').find('select[name=financeCostclassId2]').trigger('chosen:updated');
				$('#kongzhichu2').find('[name=feeDetail]').val(obj.feeDetail);
				$('#kongzhichu2').find('[name=invoiceTitle]').val(obj.invoiceTitle);
				kongzhichu2k1.html(obj.memo)
        	}else{
        		toastr.error("回显空支出失败");
        	}
        },"json");
        //回显退差价
        $.post(ctx + '/classTransferController/queryBlankReturn',{"classTransferId": TRAID,"type":2},function(msg2){
        	if(msg2.status=="success") {
        		var obj=msg2.data;
        		if(obj!=null){
        			if(TYPE!=1){
        				$("#tuichajia2").show();
        			}
        			$('#tuichajia2').find('input[name=peploName]').val(obj.createUserName);
    				$('#tuichajia2').find('input[name=nowTime]').val(obj.createDate);
    				$('#tuichajia2').find('input[name=tuichajiaMoney]').val(obj.money);
    				$('#tuichajia2').find('select[name=financePayeeId]').val(obj.linkman);
    				$('#tuichajia2').find('select[name=financePayeeId]').change();
    				$('#tuichajia2').find('select[name=financeCostclassId1]').html('<option>'+obj.parentTypeName+'</option>');
    				$('#tuichajia2').find('select[name=financeCostclassId2]').html('<option>'+obj.childrenTypeName+'</option>');
    				$('#tuichajia2').find('select[name=financeCostclassId1]').trigger('chosen:updated');
    				$('#tuichajia2').find('select[name=financeCostclassId2]').trigger('chosen:updated');
    				$('#tuichajia2').find('[name=feeDetail]').val(obj.feeDetail);
    				$('#tuichajia2').find('[name=invoiceTitle]').val(obj.invoiceTitle);
    				tuichajia2k1.html(obj.memo)
        		}
        	}else{
        		toastr.error("回显退差价失败");
        	}
        },"json");
    });
    
    
  //根据产品的选择，动态查询
    $("#addProductId").change(function(){
    	// 获取selected产品ID
    	var productId = $('#addProductId').val();
    	//var productExamTimeId = $('#productExamTimeId').val();
    	var infoManageId =INFOID;
    	//得到产品信息Json格式
    	var showList = $(this).find("option:selected").attr("showList");
    	if(showList=='' || showList==null || typeof(showList)=='undefined') {
    		//如果没有得到产品信息，清除以前的数据，直接退出方法
    		$("#childrenProduct").parents(".childrenProduct").remove();//清除子产品下拉选
    		//清除考期信息
    		$('#kTime').html('<option value="">--请选择--<option/>');
    		$('#kTime').trigger('chosen:updated');
    		$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    		//清除考试地区
    		$('#payee').html('<option value="">--请选择--<option/>');
    		$('#payee').trigger('chosen:updated');
    		$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
    		//清除收款方
    		$('#branchSchoolId').html('<option value="">--请选择--<option/>');
    		$('#branchSchoolId').trigger('chosen:updated');
    		$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
    		return;
    	}
    	if(showList!=null){
    		showList = JSON.parse(showList);
    		var aiId = null;
    		for(var p in showList){
    			aiId = p.replace("_id","");
    			$('#add'+aiId).val(showList[p]);
    			$('#add'+aiId).trigger('chosen:updated');
    		}
    	}
    	//var projectInfoManageId = $("#projectInfoManageId").val();//得到该咨询量对应产品课程信息id
    	
    	//还原考试地区下拉选
    	$("#branchSchoolId").html('');
    	$('#branchSchoolId').trigger('chosen:updated');
    	$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
    	//得到产品考试地区信息 
    	$.ajax({
    		url : ctx + '/consultConsoleWFC/getBranchSchool',//查询当前选中产品考试地区信息
    		type : 'post',
    		dataType : 'json',
    		async: false,
    		data : {productId: productId},
    		success : function(msg){
    			var option = '<option value="">--请选择--<option/>';
    			for(var n=0; n<msg.length; n++) {
					option += "<option value='"+msg[n].branchSchoolId+"'>"+msg[n].fullName+"</option>";
				}
				$("#branchSchoolId").html(option);
				$('#branchSchoolId').trigger('chosen:updated');
				$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
    		}
    	});
    	//还原收款方下拉选
    	$("#payee").html('');
    	$('#payee').trigger('chosen:updated');
    	$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
    	//得到产品收款方信息 
    	$.ajax({
    		url : ctx + '/consultConsoleWFC/getPayee',//查询当前选中产品考试地区信息
    		type : 'post',
    		dataType : 'json',
    		async: false,
    		data : {"productId": productId},
    		success : function(map){
    			var option = '<option value="0">--请选择--<option/>';
    			for(var j=0; j<map.length; j++) {
					option += "<option value='"+map[j].payeeId+"'>"+map[j].payeeName+"</option>";
				}
				$("#payee").html(option);
				$('#payee').trigger('chosen:updated');
				$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
    		}
    	});
    	
    	var departmentId = DEPID;//信息量归属地id
    	 
    	//得到产品考期信息 
    	$.ajax({
    		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
    		type : 'post',
    		async: false,
    		dataType : 'json',
    		data : {productId: productId, departmentId:departmentId},
    		success : function(info){
    			 
    			if (info == null || info.length == 0){//如果没有考期信息
    				$('#kTime').html('<option value=" ">--请选择--<option/>');
    				$('#kTime').trigger('chosen:updated');
    				$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    				return;
    			}
    			var exm = '';
    			for (var m = 0; m < info.length; m++) {
					exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
    			}
    			$('#kTime').html('<option value=" ">--请选择--<option/>'+exm);
    			$('#kTime').trigger('chosen:updated');
    			$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    			
    			//考期初始化完成后-生成相应的缴费列表
    	         $('#kTime').trigger('change');
    		},
    		error: function (response) {
                toastr.error("不存在考期");
            }
    	})
    	
    	//得到产品优惠信息 
    	$.ajax({
    		url : ctx + '/studentServiceCenter/queryBizActivity',//查询当前时间处于考期起止时间内的信息
    		type : 'post',
    		dataType : 'json',
    		async: false,
    		data : {productId: productId},
    		success : function(data){
    			if(data.status=='success'){
    				var str='';
    				$.each(data.data,function(index,obj){
    					str+='		<label> '
    						+'		<input onclick="youhuiFun(this)" class="youhuiCheck" type="checkbox" value="'+obj.activityId+'"  data-record=\''+JSON.stringify(obj)+'\' class="inverted1">'
							+'		<span class="text">'+obj.title+'</span>'
							+'		</label> ';
    				})
    				if(str!=''){
    					$("#bizActive").html(str);
    				}else{
    					$("#bizActive").html('<label><span class="text">无</span></label>')
    				}
    			}else{
    				toastr.error("加载优惠失败");
    			}
    		},
    		error: function (response) {
                toastr.error("加载优惠失败");
            }
    	})
    })
    //根据考试地域 动态追加收费项目
     $("#branchSchoolId").change(function(){
    	 var _this=this;
    	 if($("#kTime").val()==null || $("#kTime").val()==" "){
    		 return ;
    	 }
    	 if(FEIYONG2){
	    	//查询收费
	    	 $.ajax({
	      		url : ctx + '/studentServiceCenter/queryExpensesType',//查询当前时间处于考期起止时间内的信息
	      		type : 'post',
	      		dataType : 'json',
	      		data : {productExamTimeId: $("#kTime").val(),
	      			schoolId: $(_this).val(),
	      			expensesType: 2
	      		},
	      		success : function(data){
	      			if(data.status=='success'){
	      				var str='';
	      				$.each(data.data,function(index,obj){
	      					str+='<tr class="zhi">'
								+'<th scope="row" data-payCodeId="'+obj.dataExpensesTypeId+'">'+obj.dataExpensesTypeName+'</th>'
								+'<td>'+obj.money+'</td>'
								+'<td>'+obj.money+'</td>'
								+'<td><input onkeyup="shijiaoKeyUp(this)"/></td>'
								+'<td>结余</td>'
								+'<td></td>'
								+'</tr>';
	      				})
	      				if(str!=''){
	      					//先清除再追加
	      					$.each($("#appendPayBody").find(".zhi"),function(index,obj){
	      						$(obj).remove();
	      					})
	      					$("#appendPayBody").prepend(str);
	      					countJieyu();
	      				}
	      			}else{
	      				toastr.error("加载收费项目失败");
	      			}
	      		},
	      		error: function (response) {
	                  toastr.error("加载收费项目请求失败");
	              }
	      	})
    	 }
    	 if(FEIYONG2==false){
    		 FEIYONG2=true;
    	 }
     })
     
     
   //考期change事件 查询服务  查询收费项目
     $("#kTime").change(function(){
    	 var productExamTimeId=$(this).val();
    	 console.log(productExamTimeId)
    	 if(productExamTimeId==null || productExamTimeId==" "){
    		 return;
    	 }
    	 //查询服务
    	 $.ajax({
     		url : ctx + '/studentServiceCenter/queryService',//查询当前时间处于考期起止时间内的信息
     		type : 'post',
     		async: false,
     		dataType : 'json',
     		data : {productExamTimeId: productExamTimeId},
     		success : function(data){
     			if(data.status=='success'){
     				var str='';
     				$.each(data.data,function(index,obj){
     					str+='		<label> ';
     					if(obj.isRequired==1){
     						str+='<input onclick="fuwuFun()" class="fuwuCheck" type="checkbox" checked="checked" disabled="disabled" value="'+obj.productServiceId+'"  data-record=\''+JSON.stringify(obj)+'\' >';
     					}else{
     						str+='<input onclick="fuwuFun()" class="fuwuCheck" type="checkbox" value="'+obj.productServiceId+'"  data-record=\''+JSON.stringify(obj)+'\' >';
     					}
 						str+='		<span class="text">'+obj.productServiceName+'</span>';
 						str+='		</label> ';
     				})
     				if(str!=''){
     					$("#service").html(str);
     				}else{
     					$("#service").html('<label><span class="text">无</span></label>');
     				}
     				if(FEIYONG3){
     					fuwuFun();
     				}
     				if(FEIYONG3==false){
     					FEIYONG3=true;
     				}
     			}else{
     				toastr.error("加载服务失败");
     			}
     		},
     		error: function (response) {
                 toastr.error("加载服务失败");
             }
     	});
    	 if(FEIYONG1){
	    	//查询收费
	    	 $.ajax({
	      		url : ctx + '/studentServiceCenter/queryExpensesType',//查询当前时间处于考期起止时间内的信息
	      		type : 'post',
	      		dataType : 'json',
	      		data : {productExamTimeId: productExamTimeId,
	      			schoolId: DEPID,
	      			expensesType: 1
	      		},
	      		success : function(data){
	      			if(data.status=='success'){
	      				var str='';
	      				$.each(data.data,function(index,obj){
	      					str+='<tr class="shou">'
								+'<th scope="row" data-payCodeId="'+obj.dataExpensesTypeId+'">'+obj.dataExpensesTypeName+'</th>'
								+'<td>'+obj.money+'</td>'
								+'<td>'+obj.money+'</td>'
								+'<td><input onkeyup="shijiaoKeyUp(this)"/></td>'
								+'<td>结余</td>'
								+'<td></td>'
								+'</tr>';
	      				})
	      				if(str!=''){
	      					//先清除再追加
	      					$.each($("#appendPayBody").find(".shou"),function(index,obj){
	      						$(obj).remove();
	      					})
	      					$("#appendPayBody").prepend(str);
	      					countJieyu();
	      				}
	      			}else{
	      				toastr.error("加载收费项目失败");
	      			}
	      		},
	      		error: function (response) {
	                  toastr.error("加载收费项目请求失败");
	              }
	      	})
    	 
      	
	      	if($("#branchSchoolId").val()!=null && $("#branchSchoolId").val()!="" && $("#branchSchoolId").val()!=''){
	      	//查询收费
	       	 $.ajax({
	         		url : ctx + '/studentServiceCenter/queryExpensesType',//查询当前时间处于考期起止时间内的信息
	         		type : 'post',
	         		dataType : 'json',
	         		data : {productExamTimeId: productExamTimeId,
	         			schoolId: $("#branchSchoolId").val(),
	         			expensesType: 2
	         		},
	         		success : function(data){
	         			if(data.status=='success'){
	         				var str='';
	         				$.each(data.data,function(index,obj){
	         					str+='<tr class="zhi">'
	   							+'<th scope="row" data-payCodeId="'+obj.dataExpensesTypeId+'">'+obj.dataExpensesTypeName+'</th>'
	   							+'<td>'+obj.money+'</td>'
	   							+'<td>'+obj.money+'</td>'
	   							+'<td><input onkeyup="shijiaoKeyUp(this)"/></td>'
	   							+'<td>结余</td>'
	   							+'<td></td>'
	   							+'</tr>';
	         				})
	         				if(str!=''){
	         					//先清除再追加
	         					$.each($("#appendPayBody").find(".zhi"),function(index,obj){
	         						$(obj).remove();
	         					})
	         					$("#appendPayBody").prepend(str);
	         					countJieyu();
	         				}
	         			}else{
	         				toastr.error("加载收费项目失败");
	         			}
	         		},
	         		error: function (response) {
	                     toastr.error("加载收费项目请求失败");
	                 }
	         	})
	      	}
    	 }
    	 if(FEIYONG1==false){
    		 FEIYONG1=true;
    	 }
     })        
    
     
   //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
     $("#addProductModel").change(function(){
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
 	        async: false,
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
     
   //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
     $("#addProductModel2").change(function(){
     	
     	//得到选中的option的Json信息
     	var jsonObj = $('#addProductModel2 :selected').data("value");
     	var showList = $('#addProductModel2 :selected').data("showList");
     	 
     	//如果当前模型下没有配置选项
     	if(jsonObj==null || typeof(jsonObj)=="undefined" || $(jsonObj).length==0) {
     		//清除上次选择后生成的下拉框
     		
         	$(".removeFlag2").parent().parent().remove();
     		return;
     	}
     	//得到产品类型ID
     	var modelId = $('#addProductModel2 :selected').val();
     	//清除上次选择后生成的下拉框
     	$(".removeFlag2").parent().parent().remove();
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
 	                + '            <select disabled="disabled" id="1add'+enName+'"  data-value="'+enName+'" class="form-control removeFlag2 chosen-select" data-live-search="true">'
 	                + '            </select>'
 	                + '        </div>'
 	                + '</div>';
     		//将新增的下拉框拼接到产品类型下拉框后面
     		$("#addProductModel2").parent().parent().after(str);
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
 	        success: function (data) {
 	            if(data==null || data.length==0) {
 	            	return;
 	            }
 	            for (var i = 0; i < data.length; i++) {
 	            	var zxkc = "";
 	            	for(var j=0; j<data[i].dataList.length; j++) {
 	            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
 	            	}
 	            	$('#1add'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
 	            	//加载下拉框样式
 	            	$('#1add'+data[i].tableName).trigger('chosen:updated');
 	            	$("#1add"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
 	            	$('.chosen-container').width('100%');
 	            }
 	        },
 	        error: function (response) {
 	            toastr.error("系统错误");
 	        }
 	    });
     });
     
     
   //转班里点击下一步按钮
 	$('.zhuanbanNext').on('click',function(){
 		var jieyuVal=$("#jieyuVal").html();
 		
 		var shijiaoVal=0;
 		$.each($("#appendPayBody").find("tr"),function(index,tr){
 			var shijiao=$(tr).find("td").eq(2).find("input").val();
 			shijiaoVal=Number(shijiao)+Number(shijiaoVal);
 		})
 		if(Number(shijiaoVal)>Number(jieyuVal)){
 			swal("", "实缴综合不能大于结余！", "error");
 			return;
 		}
 		if(Number(shijiaoVal)==Number(jieyuVal)){
 			$("#tuichajia").hide();
 			$("#tuichajiaType").val("2");
 		}
 		if(Number(shijiaoVal)<Number(jieyuVal)){
 			$("#tuichajia").show();
 			$("#tuichajiaType").val("1");
 			$(".sss").find("[name='tuichajiaMoney']").val(Number(jieyuVal)-Number(shijiaoVal));
 		}
 		//申请人
 		$(".sss").find("[name='peploName']").val("admin");
 		$(".sss").find("[name='nowTime']").val(jsDateFormat1(Date.parse(new Date())));
 		$(".sss").find("[name='kongzhichuMoney']").val(shijiaoVal);
 		
 		//查常用联系人
 		$.post(ctx + '/studentServiceCenter/queryBizFinancePayee',{
     		
 		},function(data){
 			if(data.status=='success'){
 				var str='<option value="" data-record="{}"> 请选择 </option>';
 				$.each(data.data,function(index,obj){
 					str+='<option value="'+obj.financePayeeId+'" data-record=\''+JSON.stringify(obj)+'\'> '+obj.accountName+' </option>';
 				});
 				$('select[name="financePayeeId"]').html(str);
 				$('select[name="financePayeeId"]').trigger('chosen:updated');
 			}else{
 				swal("", "查询常用联系人失败！", "error");
 			}
 		},"json")
 		
 		//查费用类别  父类
 		$.post(ctx + '/bizFinance/loadCostClass',{
 			parentId:0
 		},function(data){
 			var str='<option value="" > 请选择 </option>';
 			$.each(data,function(index,obj){
 				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
 			});
 			$('select[name="financeCostclassId1"]').html(str);
 		},"json")
 		
 		
 		$(".sss").modal("show");
 	})
 	//空支出父类change 动态加载子类费用类别
 	$('#kongzhichu select[name="financeCostclassId1"]').on('change',function(){
 		var _this=this;
 		//查费用类别  子类
 		$.post(ctx + '/bizFinance/loadCostClass',{
 			parentId:$(_this).val()
 		},function(data){
 			var str='';
 			$.each(data,function(index,obj){
 				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
 			});
 			$('#kongzhichu select[name="financeCostclassId2"]').html(str);
 		},"json")
 	})
 	$('#tuichajia select[name="financeCostclassId1"]').on('change',function(){
 		var _this=this;
 		//查费用类别  子类
 		$.post(ctx + '/bizFinance/loadCostClass',{
 			parentId:$(_this).val()
 		},function(data){
 			var str='';
 			$.each(data,function(index,obj){
 				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
 			});
 			$('#tuichajia select[name="financeCostclassId2"]').html(str);
 		},"json")
 	})
 	
 	//常用收款人change 
 	$('#kongzhichu select[name="financePayeeId"]').on('change',function(){
 		var string=$(this).find("option:selected").attr("data-record");
 		var bizFinancePayee=JSON.parse(string);
 		$('#kongzhichu input[name="bankName"]').val(bizFinancePayee.bankName);
 		$('#kongzhichu input[name="province"]').val(bizFinancePayee.province);
 		$('#kongzhichu input[name="city"]').val(bizFinancePayee.city);
 		$('#kongzhichu input[name="accountNum"]').val(bizFinancePayee.accountNum);
 		$('#kongzhichu input[name="accountName"]').val(bizFinancePayee.accountName);
 		$('#kongzhichu input[name="phone"]').val(bizFinancePayee.phone);
 	})
 	$('#tuichajia select[name="financePayeeId"]').on('change',function(){
 		var string=$(this).find("option:selected").attr("data-record");
 		var bizFinancePayee=JSON.parse(string);
 		$('#tuichajia input[name="bankName"]').val(bizFinancePayee.bankName);
 		$('#tuichajia input[name="province"]').val(bizFinancePayee.province);
 		$('#tuichajia input[name="city"]').val(bizFinancePayee.city);
 		$('#tuichajia input[name="accountNum"]').val(bizFinancePayee.accountNum);
 		$('#tuichajia input[name="accountName"]').val(bizFinancePayee.accountName);
 		$('#tuichajia input[name="phone"]').val(bizFinancePayee.phone);
 	})
    
    
    
    
    
    
    
    
    
    
})

//扣费keyUP
function koufeiKeyUp(obj){
	//本行的变化
	var koufei=$(obj).val();
	var zhichu=$(obj).parent().prev().html();
	var shijiao=$(obj).parent().prev().prev().html();
	$(obj).parent().next().html(shijiao-zhichu-koufei);
	
	//合计的变化
	var totalKoufei=0;
	var totalJieyu=0;
	$.each($("#payMentTableInfoBody").find("tr"),function(index,tr){
		if($("#payMentTableInfoBody").find("tr").length!=(index+1)){
			var koufei=$(tr).find("td").eq(3).find("input").val();
			var jieyu=$(tr).find("td").eq(4).html();
			totalKoufei=Number(totalKoufei)+Number(koufei);
			totalJieyu=Number(totalKoufei)+Number(jieyu);
		}
	})
	$("#payMentTableInfoBody").find("tr:last").find("td").eq(3).find("input").val(totalKoufei);
	$("#payMentTableInfoBody").find("tr:last").find("td").eq(4).html(totalJieyu);
}

//退差价点击确定
function tuichajia(){
	//获取数据
	//扣费信息
	var zhuanBanVo={};
	zhuanBanVo["consultInfoManageClassTransferId"]=TRAID;
	zhuanBanVo["infoManageId"]=INFOID;
	zhuanBanVo["productId"]=PROID;
	var consultInfoManageFeeDeductions=[];
	$.each($("#payMentTableInfoBody").find("tr"),function(index,tr){
		if($("#payMentTableInfoBody").find("tr").length!=(index+1)){
			var consultInfoManageFeeDeduction={};
			consultInfoManageFeeDeduction["payName"]=$(tr).find("th").html();
			consultInfoManageFeeDeduction["yjValue"]=$(tr).find("td").eq(0).html();
			consultInfoManageFeeDeduction["sjValue"]=$(tr).find("td").eq(1).html();
			consultInfoManageFeeDeduction["zcValue"]=$(tr).find("td").eq(2).html();
			consultInfoManageFeeDeduction["kfValue"]=$(tr).find("td").eq(3).find("input").val();
			consultInfoManageFeeDeduction["jyValue"]=$(tr).find("td").eq(4).html();
			consultInfoManageFeeDeductions.push(consultInfoManageFeeDeduction);
		}
	})
	zhuanBanVo["consultInfoManageFeeDeductions"]=consultInfoManageFeeDeductions;
	//新课程信息
	var consultInfoManageNewCourse={};
	consultInfoManageNewCourse["newProductModalId"]=$("#addProductModel").val();
	consultInfoManageNewCourse["newProductId"]=$("#addProductId").val();
	consultInfoManageNewCourse["newProductExamTimeId"]=$("#kTime").val();
	consultInfoManageNewCourse["newBranchSchoolId"]=$("#branchSchoolId").val();
	consultInfoManageNewCourse["newPayeeId"]=$("#payee").val();
	var youhuima=[];
	$.each($(".youhuiCheck"),function(index,obj){
		if($(obj).is(":checked")){
			youhuima.push($(obj).val());
		}
	})
	consultInfoManageNewCourse["activityIds"]=youhuima.join(",");
	if($("#fuwuCode").val()!=""){
		consultInfoManageNewCourse["activityCode"]=$("#fuwuCode").val();
		consultInfoManageNewCourse["activityCodeMoney"]=$("#fuwuCodeMoney").val();
	}
	var fuwu=[];
	$.each($(".fuwuCheck"),function(index,obj){
		if($(obj).is(":checked")){
			fuwu.push($(obj).val());
		}
	})
	consultInfoManageNewCourse["serviceIds"]=fuwu.join(",");
	zhuanBanVo["consultInfoManageNewCourse"]=consultInfoManageNewCourse;
	//课程缴费信息
	var consultInfoManageNewFees=[];
	$.each($("#appendPayBody").find("tr"),function(index,tr){
		var consultInfoManageNewFee={};
		consultInfoManageNewFee["payName"]=$(tr).find("th").html();
		consultInfoManageNewFee["payCodeId"]=$(tr).find("th").attr("data-payCodeId");
		consultInfoManageNewFee["yjValue"]=$(tr).find("td").eq(0).html();
		consultInfoManageNewFee["sjyjValue"]=$(tr).find("td").eq(1).html();
		consultInfoManageNewFee["sjValue"]=$(tr).find("td").eq(2).find("input").val();
		consultInfoManageNewFee["qfValue"]=$(tr).find("td").eq(4).html();
		if($(tr).attr("class")=="fuwu"){
			consultInfoManageNewFee["type"]=3;
		}else if($(tr).attr("class")=="zhi"){
			consultInfoManageNewFee["type"]=2;
		}else if($(tr).attr("class")=="shou"){
			consultInfoManageNewFee["type"]=1;
		}
		consultInfoManageNewFees.push(consultInfoManageNewFee);
	})
	zhuanBanVo["consultInfoManageNewFees"]=consultInfoManageNewFees;
	//空支出申请
	var consultInfoManageBlankReturn1={};
	consultInfoManageBlankReturn1["money"]=$("#kongzhichu input[name='kongzhichuMoney']").val();
	consultInfoManageBlankReturn1["parentType"]=$("#kongzhichu select[name='financeCostclassId1']").val();
	consultInfoManageBlankReturn1["childrenType"]=$("#kongzhichu select[name='financeCostclassId2']").val();
	consultInfoManageBlankReturn1["feeDetail"]=$("#kongzhichu [name='feeDetail']").val();
	consultInfoManageBlankReturn1["invoiceTitle"]=$("#kongzhichu [name='invoiceTitle']").val();
	consultInfoManageBlankReturn1["linkman"]=$("#kongzhichu select[name='financePayeeId']").val();
	consultInfoManageBlankReturn1["memo"]=$("#kongzhichu [name='memo']").val();
	zhuanBanVo["consultInfoManageBlankReturn1"]=consultInfoManageBlankReturn1;

	//退费申请
	if($("#tuichajiaType").val()==1){
		var consultInfoManageBlankReturn2={};
		consultInfoManageBlankReturn2["money"]=$("#tuichajia input[name='tuichajiaMoney']").val();
		consultInfoManageBlankReturn2["parentType"]=$("#tuichajia select[name='financeCostclassId1']").val();
		consultInfoManageBlankReturn2["childrenType"]=$("#tuichajia select[name='financeCostclassId2']").val();
		consultInfoManageBlankReturn2["feeDetail"]=$("#tuichajia [name='feeDetail']").val();
		consultInfoManageBlankReturn2["invoiceTitle"]=$("#tuichajia [name='invoiceTitle']").val();
		consultInfoManageBlankReturn2["linkman"]=$("#tuichajia select[name='financePayeeId']").val();
		consultInfoManageBlankReturn2["memo"]=$("#tuichajia [name='memo']").val();
		zhuanBanVo["consultInfoManageBlankReturn2"]=consultInfoManageBlankReturn2;
	}
	
	//发送请求
	$.ajax({
         type: "POST",
         url: ctx + '/classTransferController/updateNewCourse',
         data: JSON.stringify(zhuanBanVo),
         dataType: 'json',
         contentType: 'application/json;charset=utf-8', //设置请求头信息
         success: function (data) {
             if (data.status == "success") {
            	 init1();
            	 init2();
            	swal("", "修改成功", "success");
        		$(".sss").modal("hide");
        		$(".serviceView").modal("hide");
             } else {
                 toastr.error("转班出错");
             }
         },
         error: function (msg) {
             toastr.error("系统错误");
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
	/*var condition = "department_id=" +"'"+ DEPID+"'";
	conditionArray.push(condition);*/
	var conditions = conditionArray.join(" and ");
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions,"departmentId":DEPID},
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
//优惠 服务  回显选中
/*function huixianYouhuiFuwu(youhuiIds,fuwuIds){
	if(youhuiIds!=null){
		$.each($(".youhuiCheck"),function(index,obj){
			$.each(youhuiIds.split(","),function(inde,youhuiObj){
				var youhui=JSON.parse($(obj).attr("data-record"));
				if(youhuiObj==youhui.val()){
					$(obj).click();
				}
			})
		})
	}
	if(fuwuIds!=null){
		$.each($(".fuwuCheck"),function(index,obj){
			$.each(fuwuIds.split(","),function(inde,fuwuObj){
				var fuwu=JSON.parse($(obj).attr("data-record"));
				if(fuwuObj==fuwu.val()){
					$(obj).click();
				}
			})
		})
	}
}*/



//遍历选中的服务加到费用里
function fuwuFun(){
	//先移除再追加
	$.each($("#appendPayBody").find(".fuwu"),function(index,obj){
		$(obj).remove();
	})
	var str='';
	$.each($(".fuwuCheck"),function(index,obj){
		if($(obj).is(":checked")){
			var fuwu=JSON.parse($(obj).attr("data-record"));
			str+='<tr class="fuwu">'
				+'<th scope="row" data-payCodeId="'+fuwu.dataExpensesTypeId+'">'+fuwu.expensesTypeName+'</th>'
				+'<td>'+fuwu.money+'</td>'
				+'<td>'+fuwu.money+'</td>'
				+'<td><input onkeyup="shijiaoKeyUp(this)" value="0" /></td>'
				+'<td>结余</td>'
				+'<td>'+fuwu.money+'</td>'
				+'</tr>';
		}
	})
	$("#appendPayBody").append(str);
}

//点击优惠
function youhuiFun(val){
	if($(val).is(":checked")){//说明是点击选中
		var youhui=JSON.parse($(val).attr("data-record"));
		if($(".youhuiCheck:checked").length==1){//只选中一个优惠
			youhuiCheck(youhui);
			return ;
		}else{//选中的第二个以后的优惠
			if(youhui.isMulti==0){//不可叠加
				toastr.error("和所选中的项目不可叠加");
				$(val).attr("checked", false);
				return ;
			}
		}
		$.each($(".youhuiCheck"),function(index,obj){
			if($(obj).is(":checked")){
				var youhui2=JSON.parse($(obj).attr("data-record"));
				if(youhui2.isMulti==0){//有不可叠加项
					$(val).attr("checked", false);
					toastr.error("和所选中的项目不可叠加");
					return ;
				}
			}
		})
		youhuiCheck(youhui);
	}else{//说明是取消选中
		var youhui=JSON.parse($(val).attr("data-record"));
		if(youhui.type==1){//取消优惠码
			$(".fuwuCodeDiv").hide();
			$("fuwuCode").val("");
			$("fuwuCode").attr("readOnly", false);
			var money=$("#fuwuCodeMoney").val();
			if(money!=""){
				var td=$("#appendPayBody").find("tr").eq(0).find("td").eq(1);
				$(td).html(Number($(td).html)+Number(money));
			}
		}else if(youhui.type==2){//取消折扣
			var discount=Number(1)-Number(youhui.discount);
			$.each($("#appendPayBody").find("tr"),function(index,tr){
				var dataExpensesTypeId=$(tr).find("th").attr("data-payCodeId");
				var ids=youhui.epId;
				if(ids!=null){
					$.each(ids.split(","),function(index,id){
						if(dataExpensesTypeId==id){
							//使用折扣
							var money1=$(tr).find("td").eq(0).html();
							var money2=$(tr).find("td").eq(1).html();
							var disconutMoney=Number(money1)*Number(discount);
							$(tr).find("td").eq(1).val(Number(money2)+Number(disconutMoney));
						}
					})
				}
			})
		}
	}
}
//优惠的触发
function youhuiCheck(obj){
	if(obj.type==1){//优惠码
		$(".fuwuCodeDiv").show();
	}else if(obj.type==2){//折扣
		var discount=Number(1)-Number(obj.discount);
		$.each($("#appendPayBody").find("tr"),function(index,tr){
			var dataExpensesTypeId=$(tr).find("th").attr("data-payCodeId");
			var ids=obj.epId;
			if(ids!=null){
				$.each(ids.split(","),function(index,id){
					if(dataExpensesTypeId==id){
						//使用折扣
						var money1=$(tr).find("td").eq(0).html();
						var money2=$(tr).find("td").eq(1).html();
						var disconutMoney=Number(money1)*Number(discount);
						$(tr).find("td").eq(1).val(Number(money2)-Number(disconutMoney));
					}
				})
			}
		})
	}
}
//优惠码点击确认
function fuwuCodeSub(){
	if(document.getElementById("fuwuCode").readOnly=="true"){
		return ;
	}
	//查询优惠码
	$.post(ctx + '/studentServiceCenter/selectActivityCode',{
		code:$("#fuwuCode").val(),
		dept:DEPID
	},function(data){
		if(data.data==null){
			toastr.error("无此优惠码");
			return ;
		}else{
			if(data.data.useStatus==1){
				toastr.error("优惠码已经使用");
				return ;
			}else{
				var limi=$("#appendPayBody").find("tr").eq(0).find("td").eq(0).html();
				if(data.data.limit1>limi){
					toastr.error("应缴金额没有超过优惠码下限金额");
					return ;
				}
				var money=data.data.amount;
				$("#fuwuCodeMoney").val(money);
				var td=$("#appendPayBody").find("tr").eq(0).find("td").eq(1);
				$("#fuwuCode").attr("readOnly", true);
				$(td).html(Number($(td).html)-Number(money));
				toastr.success("优惠码使用成功");
			}
		}
	},"json")
}

//结余自动填充
function countJieyu(){
	var jieyuVal=$("#jieyuVal").html();
	$.each($("#appendPayBody").find("tr"),function(index,tr){
		var shiji=$(tr).find("td").eq(1).html();
		if(Number(shiji)>Number(jieyuVal) || Number(shiji)==Number(jieyuVal)){
			$(tr).find("td").eq(2).find("input").val(jieyuVal);
			var qianfei=Number(shiji)-Number(jieyuVal)
			$(tr).find("td").eq(4).html(qianfei);
			jieyuVal=0;
		}else{
			$(tr).find("td").eq(2).find("input").val(shiji);
			$(tr).find("td").eq(4).html("0")
			jieyuVal=Number(jieyuVal)-Number(shiji);
		}
	})
}

//扣费keyUP
function shijiaoKeyUp(obj){
	//本行的变化
	var shijiao=$(obj).val();
	var shiji=$(obj).parent().prev().html();
	$(obj).parent().next().next().html(shiji-shijiao);
}


//退回学员
function init1() {
    var init = $('#table1').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/classTransferController/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData1,
        "aoColumns": [
			{
			    "mData": "infoManageId",
			    'sClass': "text-center",
			    "bSortable": false,
			    "mRender": function (data, type, full) {
			        return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
			    }
			},
            {"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
        		return jsDateFormat(full['baoMinDate']);
            }},
            {"mDataProp": "departmentName1",'sClass': "text-center"},
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "studentPhone",'sClass': "text-center"},
            {"mDataProp": "createDate",'sClass': "text-center"},
            {"mDataProp": "productModelName",'sClass': "text-center"},
            {"mDataProp": "productName",'sClass': "text-center"},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
                return "<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-transfer='" + full['consultInfoManageClassTransferId'] + "' data-type='1' class='ck' data-toggle='modal' data-target='.serviceView'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table1_wrapper").removeClass();
    $('#table1_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table1_wrapper .dataTables_info').parent().append($('#table1_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData1(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "type", "value":"1"});
    var searchVal = $('#key1').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "key", "value": searchVal.trim()});
    }
    var beganAndEnd = $("#date1").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = $("#date1").val().split("到")[0];
        var maxDate = $("#date1").val().split("到")[1];
        aoData.push({"name": "beginDateString", "value": minDate.trim()+" 00:00:00"});
        aoData.push({"name": "endDateString", "value": maxDate.trim()+" 23:59:59"});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

//转班审核
function init2() {
    var init = $('#table2').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/classTransferController/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData2,
        "aoColumns": [
			{
			    "mData": "infoManageId",
			    'sClass': "text-center",
			    "bSortable": false,
			    "mRender": function (data, type, full) {
			        return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
			    }
			},
			{"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
				return jsDateFormat(full['baoMinDate']);
			}},
			{"mDataProp": "departmentName1",'sClass': "text-center"},
			{"mDataProp": "studentName",'sClass': "text-center"},
			{"mDataProp": "studentPhone",'sClass': "text-center"},
			{"mDataProp": "createDate",'sClass': "text-center"},
			{"mDataProp": "productModelName",'sClass': "text-center"},
			{"mDataProp": "productName",'sClass': "text-center"},
			{"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
				var str1="<a href='#' onclick='tuihui(\""+full['consultInfoManageClassTransferId']+"\")'  ><i class='fa fa-sign-out blue' data-toggle='tooltip' data-placement='top' data-original-title='退回' title='退回'></i></a>";
				var str2="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-transfer='" + full['consultInfoManageClassTransferId'] + "' data-type='2' class='ck' data-toggle='modal' data-target='.serviceView'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
			    return str1+str2;
			}},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table2_wrapper").removeClass();
    $('#table2_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table2_wrapper .dataTables_info').parent().append($('#table2_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData2(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "type", "value":"2"});
    var searchVal = $('#key2').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "key", "value": searchVal.trim()});
    }
    var beganAndEnd = $("#date2").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = $("#date2").val().split("到")[0];
        var maxDate = $("#date2").val().split("到")[1];
        aoData.push({"name": "beginDateString", "value": minDate.trim()+" 00:00:00"});
        aoData.push({"name": "endDateString", "value": maxDate.trim()+" 23:59:59"});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

//转班完成
function init3() {
    var init = $('#table3').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/classTransferController/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData3,
        "aoColumns": [
			{
			    "mData": "infoManageId",
			    'sClass': "text-center",
			    "bSortable": false,
			    "mRender": function (data, type, full) {
			        return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
			    }
			},
			{"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
				return jsDateFormat(full['baoMinDate']);
			}},
			{"mDataProp": "departmentName1",'sClass': "text-center"},
			{"mDataProp": "studentName",'sClass': "text-center"},
			{"mDataProp": "studentPhone",'sClass': "text-center"},
			{"mDataProp": "createDate",'sClass': "text-center"},
			{"mDataProp": "productModelName",'sClass': "text-center"},
			{"mDataProp": "productName",'sClass': "text-center"},
			{"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
			    return "<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-transfer='" + full['consultInfoManageClassTransferId'] + "' data-type='3' class='ck' data-toggle='modal' data-target='.serviceView'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
			}},	
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table3_wrapper").removeClass();
    $('#table3_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table3_wrapper .dataTables_info').parent().append($('#table3_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData3(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "type", "value":"3"});
    var searchVal = $('#key3').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "key", "value": searchVal.trim()});
    }
    var beganAndEnd = $("#date3").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = $("#date3").val().split("到")[0];
        var maxDate = $("#date3").val().split("到")[1];
        aoData.push({"name": "beginDateString", "value": minDate.trim()+" 00:00:00"});
        aoData.push({"name": "endDateString", "value": maxDate.trim()+" 23:59:59"});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

//审核
function shenhe(obj){
	var infoManageId = $(this).attr('data-record');
    var productId = $(this).attr('data-record2');
    var departmentName1 = $(this).attr('data-record3');
    DEPID=departmentName1;
    $.post(ctx + '/consultInfoManage/findOneNew',{infoManageId:infoManageId,productId:productId},function(data){
    	if(data.status=='success'){
    		$("#sumPrice2").val(data.data.sumPrice)
    		$("#sPrice").val(data.data.sPrice)
    		$("#nextPayNum2").val(data.data.nextPayNum)
    		KAOQI=data.data.kTime;
    		fillStuBaseInfo(data.data);
    		fillStuCourseInfo(data.data);
    		//回显收款方信息
    		$.post(ctx + '/consultInfoManage/getConsultPayee',{"productId": productId, "infoManageId":infoManageId},function(msg1){
    			if(msg1.status=="success") {
    				var payeeOption = "";
    				if(msg1.data.payee!=null){
    					if(msg1.data.payee=='1'){
    						payeeOption="<option selected>中和</option>";
    					}
    					if(msg1.data.payee=='2'){
    						payeeOption="<option selected>学慧网</option>";
    					}
    					if(msg1.data.payee=='4'){
    						payeeOption="<option selected>合作方</option>";
    					}
    				}
    				$('#scdata').find('select[name=shoukuanfang]').html(payeeOption);
    				$('#scdata2').find('select[name=shoukuanfang]').html(payeeOption);
    			}
	        });
    		 //加载缴费信息
            $.post(ctx + '/studentServiceCenter/queryPayFees',{
            	infoManageId:infoManageId,
            	productId:productId,
            	ktime:data.data.kTime
            	},
            	function(val2){
                	if(val2.status=='success'){
                		var str='';
                		$.each(val2.data,function(index,e){
                			str+='<tr>';
                			str+=' <td style="text-align: center;">'+e.dataExpensesTypeName+'</td>';
                			str+=' <td style="text-align: center;">'+e.money+'</td>';
                			str+=' <td style="text-align: center;">'+e.shiJiao+'</td>';
                			
                			str+=' <td style="text-align: center;">';
                			str+=e.zhiFu;
                			str+='</td>';
                				
                			str+=' <td style="text-align: center;">'+e.qianFei+'</td>';
                			str+='</tr>';
                		});
                		$("#payMentTableInfoBody").html(str);
                		$("#payMentTableInfoBody2").html(str);
                	}
            },"json");
            
            //加载费用支出信息
            $.post(ctx + '/studentServiceCenter/queryFinanceApply',{
            	infoManageId:infoManageId,
            	productId:productId,
            	},
            	function(val2){
                	if(val2.status=='success'){
                		var str='';
                		$.each(val2.data,function(index,e){
                			str+='<tr>';
                			str+=' <td style="text-align: center;">'+e.signDate+'</td>';
                			str+=' <td style="text-align: center;">'+e.applyCode+'</td>';
                			str+=' <td style="text-align: center;">'+e.money+'</td>';
                			str+=' <td style="text-align: center;">'+e.expendDetail+'</td>';
                			str+=' <td style="text-align: center;">'+e.payeeName+'</td>';
                			str+=' <td style="text-align: center;">申请已支出</td>';
                			str+=' <td style="text-align: center;">'+e.returnCompMoney+'</td>';
                			str+='</tr>';
                		});
                		$("#zhichuTableInfoBody").html(str);
                	}
            },"json");
          
    	}
    },'json');
}


//填写个人信息
function fillStuBaseInfo(consultInfo) {
    $('#scdata').find('input[name=studentName]').val(consultInfo.studentName);
    $('#scdata').find('select[name=studentSex]').val(consultInfo.studentSex);
    $('#scdata').find('input[name=age]').val(consultInfo.age);
    if (consultInfo.studentPhone != '' && consultInfo.studentPhone != undefined) {
        $('#studentPhone').val(consultInfo.studentPhone);
    }
    $('#scdata').find('input[name=email]').val(consultInfo.email);
    $('#scdata').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
    $('#scdata').find('input[name=weChat]').val(consultInfo.weChat);
    $('#scdata').find('input[name=tengXun]').val(consultInfo.tengXun);
    $('#scdata').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
    $('#scdata').find('input[name=phoneAddress]').val(consultInfo.phoneAddress);
    $('#scdata').find('input[name=workSpace]').val(consultInfo.workSpace);
}

//初始化责任鉴定
function loadDuty(){
	$.post(ctx + '/classTransferController/queryDuty',{
		infoManageId:INFOID,
		productId:PROID
	},function(obj){
		if(obj.status=="success"){
			var str='';
			$.each(obj.data,function(inde,val){
				str+='<option value="'+val.departmentId+'">'+val.fullName+'</option>';
			})
			DUTYDEP=str;
			
			var sele='<tr parent-tr="parent-1">'
			      +' <td width="20%" rowspan="1">'
			      +'     <select name="parent" class="form-control" id="parent">'
			      +'      </select>'
			      +'  </td>'
			      +'   <td width="20%" rowspan="1">'
			      +'      <select  class="form-control" >'
			      +'         	<option value="1">是</option>'
			      +'         	<option value="0">否</option>'
			      +'      </select>'
			      +'  </td>'
			      +'  <td width="40%">'
			      +'      <div class="col-sm-11 no-padding">'
			      +'          <select name="child" class="form-control" id="child">'
			      +'          </select>'
			      +'      </div>'
			      +'      <label class="control-label pull-left childNode">'
			      +'         <a class="fa fa-plus success operate-btn"></a>'
			      +'     </label>'
			      +' </td>'
			      +' <td width="40%">'
			      +'      <input  class="form-control" />'
			      +'   </td>'
			      +'</tr>'
			
			$("#addFolwTbody").html(sele);
			$("#parent").html('<option value="">请选择</option>'+str);
			$("#parent").change();
			//清空 备注 内容
			k3.html("");
		}else{
			toastr.error("初始化责任鉴定失败");
		}
	},"json")
}

/**
 * 父子节点增加删除
 * @param parent
 */
function parentChild(parent){
    //父节点
    var index = 1;
    $(parent).find('table .parentNode').on('click', '.operate-btn', function () {
        index++;
        var trHtml = '<tr parent-tr="parent-' + index + '">' +
            '    <td width="20%" rowspan="1">' +
            '        <select name="parent" class="form-control"><option value="">请选择</option>' +
            			DUTYDEP+
            '        </select>' +
            '    </td>' +
            '    <td width="20%" rowspan="1">' +
            '        <select name="" class="form-control">' +
            '          <option value="1">是</option>'+
            '          <option value="0">否</option>'+
            '        </select>' +
            '    </td>' +
            '    <td width="40%">' +
            '       <div class="col-sm-11 no-padding">' +
            '           <select name="child" class="form-control">' +
            '           </select>' +
            '       </div>' +
            '       <label class="control-label pull-left childNode">' +
            '           <a class="fa fa-plus success operate-btn"></a>' +
            '       </label>' +
            '    </td>' +
            '    <td width="40%">' +
            '        <input name="" class="form-control" />' +
            '    </td>' +
            '</tr>';
        //增加行
        if ($(this).is('.fa-plus')) {
            $(parent).find('table tbody').append(trHtml);
            //multiSelect();
        }

        //删除行
        if ($(this).is('.fa-minus')) {
            var trList = $(parent).find('table tbody tr');
            var parentTrArr = [];
            for (var i = 0; i < trList.length; i++) {
                if ($(trList[i]).attr('parent-tr')) {
                    parentTrArr.push($(trList[i]).attr('parent-tr'));
                }
            }
            var parentTr = parentTrArr[parentTrArr.length - 1];
            if (parentTr != 'parent-1') {
                $(parent).find('table tbody tr[parent-tr=' + parentTr + ']').remove();
                $(parent).find('table tbody tr[child-tr=' + parentTr + ']').remove();
            }
        }
    })


    //子节点
    $(parent).find('table').on('click', '.childNode .operate-btn', function () {
        var currentTr = $(this).parent().parent().parent();
        var childrenTr = currentTr.attr('parent-tr');
        var rowspan = Number(currentTr.find('td:first').attr('rowspan'));
        var trHtml = '<tr child-tr="' + childrenTr + '">' +
            '    <td width="40%">' +
            '       <div class="col-sm-11 no-padding">' +
            '           <select name="child" class="form-control">' +
            currentTr.find("td:first").attr("str")+
            '           </select>' +
            '       </div>' +
            '       <label class="control-label pull-left childNode">' +
            '           <a class="fa fa-minus danger operate-btn"></a>' +
            '       </label>' +
            '    </td>' +
            '    <td width="40%">' +
            '        <input name="" class="form-control"/>' +
            '    </td>' +
            '</tr>';
        //增加行
        if ($(this).is('.fa-plus')) {
            rowspan++;
            currentTr.after(trHtml);
            currentTr.find('td:first').attr('rowspan', rowspan);
            currentTr.find('td').eq(1).attr('rowspan', rowspan);
           // multiSelect();
        }

        //删除行
        if ($(this).is('.fa-minus')) {
            var childTr = currentTr.attr('child-tr');
            var rowspans = $(parent).find('table tr[parent-tr="' + childTr + '"] td:first').attr('rowspan');
            rowspans--;
            $(parent).find('table tr[parent-tr="' + childTr + '"] td:first').attr('rowspan', rowspans);
            $(parent).find('table tr[parent-tr="' + childTr + '"] td').eq(1).attr('rowspan', rowspans);
            $(this).parent().parent().parent().remove();
        }
    })
}

function subClassChange(){
	if(TYPE==1){//退回学员的
		var jieyuVal=$("#jieyuVal").html();
		var shijiaoVal=0;
		$.each($("#appendPayBody").find("tr"),function(index,tr){
			var shijiao=$(tr).find("td").eq(2).find("input").val();
			shijiaoVal=Number(shijiao)+Number(shijiaoVal);
		})
		if(Number(shijiaoVal)>Number(jieyuVal)){
			swal("", "实缴综合不能大于结余！", "error");
			return;
		}
		if(Number(shijiaoVal)==Number(jieyuVal)){
			$("#tuichajia").hide();
			$("#tuichajiaType").val("2");
		}
		if(Number(shijiaoVal)<Number(jieyuVal)){
			$("#tuichajia").show();
			$("#tuichajiaType").val("1");
			$(".sss").find("[name='tuichajiaMoney']").val(Number(jieyuVal)-Number(shijiaoVal));
		}
		//申请人
		$(".sss").find("[name='peploName']").val("admin");
		$(".sss").find("[name='nowTime']").val(jsDateFormat1(Date.parse(new Date())));
		$(".sss").find("[name='kongzhichuMoney']").val(shijiaoVal);
		$(".sss").modal("show");
	}else if(TYPE==2){//转班审核的
		$(".serviceView").modal("hide");
		var conditionArray = new Array();
		var conditionArray2 = new Array();
		$(".counselCurriculum select :selected").each(function(index,obj){
			//得到option的value即id值
			var idValue = $(obj).val();
			//开始拼接产品查询sql条件
			if(idValue!=null && idValue!='') {
				//得到主键列英文名称,option-select
				var primaryIdName = $(obj).parent().data("value")+"_id";
				var primaryIdValue = "'"+idValue+"'";
				conditionArray.push(primaryIdName);
				conditionArray2.push(primaryIdValue);
			}
		});
		var conditions1 = conditionArray.join(",");
		var conditions2 = conditionArray2.join(",");
		
		var studentChangeVo={};
		studentChangeVo["consultInfoManageClassTransferId"]=TRAID;
		studentChangeVo["infoManageId"]=INFOID;
		studentChangeVo["productId"]=PROID;
		studentChangeVo["tableName"]=conditions1;
		studentChangeVo["tableId"]=conditions2;
		var serviceDutyJudges=[];
		
		
		var trs=$("#addFolwTbody tr");
		var dutyDepartmentId='';
		var isWithdraw='';
		$.each(trs,function(index,obj){
			var serviceDutyJudge = {};
			if($(obj).find("td").length == 4){
				dutyDepartmentId=$(obj).find("td:first select").val();
				isWithdraw=$(obj).find("td").eq(1).find("select").val();
				//添加插入父节点
				serviceDutyJudge["dutyDepartmentId"]=dutyDepartmentId;
				serviceDutyJudge["isWithdraw"]=isWithdraw;
				serviceDutyJudge["dutyPersonId"]=$(obj).find("td").eq(2).find("select").val();
				serviceDutyJudge["penalty"]=$(obj).find("td").eq(3).find("input").val();
				serviceDutyJudge["remark"]=k3.html();
			}else{
				serviceDutyJudge["dutyDepartmentId"]=dutyDepartmentId;
				serviceDutyJudge["isWithdraw"]=isWithdraw;
				serviceDutyJudge["dutyPersonId"]=$(obj).find("td").eq(0).find("select").val();
				serviceDutyJudge["penalty"]=$(obj).find("td").eq(1).find("input").val();
				serviceDutyJudge["remark"]=k3.html();
			}
			serviceDutyJudges.push(serviceDutyJudge);
		})
		studentChangeVo["serviceDutyJudges"]=serviceDutyJudges;
		var str=JSON.stringify(studentChangeVo);
		
		 $.ajax({
	        url: ctx + '/classTransferController/addChange',
	        method: 'post',
	        contentType: 'application/json', // 这句不加出现415错误:Unsupported Media Type
	        data:str, // 以json字符串方式传递
	        success: function(data) {
	        	if(data.status=='success'){
	        		init2();
	    			init3();
	    			swal('',"转班成功",'success');
	    		}else{
	    			swal('',"转班失败",'error');
	    		}
	        },
	        error: function(data) {
	        	swal('',"系统出错",'error');
	        }
	    });
		
	}else if(TYPE==3){//转班完成的
		return;
	}
}
function tuihui(classChangeId){
	$.post(ctx + '/classTransferController/updateClassChangeType',{
		classTransferId:classChangeId,
		type:"1"
	},function(data){
		if(data.status=='success'){
			init1();
			init2();
			swal('',"转班退回成功",'success');
		}else{
			swal('',"转班退回失败",'error');
		}
	},"json")
}


/**
 * 时间格式化
 */
function jsDateFormat1(val){
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
    /* return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde;  */
}