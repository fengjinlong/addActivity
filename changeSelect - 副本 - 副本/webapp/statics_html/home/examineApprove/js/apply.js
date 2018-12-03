$(function () {
    //日期
    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });
    
    function init(){
    	initCostClass();//费用类别初始化
    	initDepartment();//部门
    	initProject();//产品
    	initBankInfo();//银行信息
    }

    init();

    function getClass(){//费用列别对像模板
   	 var classObj={id:"",name:"",pid:"",leaf:true,children:new Array()};
   	 return  classObj;
   }

   var pClassArr = new Array();//存放数据
   function addChildClass(data,pClassArr){// 添加孩子节点
   	$(pClassArr).each(function(i,item){
   		$(data).each(function(j,ptem){
   			if(ptem.pId==item.id){
   				item.leaf = false;
   				var childClassObj = new getClass();
   				childClassObj.id=ptem.id;
   				childClassObj.name = ptem.name;
   				childClassObj.pid=item.id;
   	    		item.children.push(childClassObj);
   			}
   		});
   		addChildClass(data,item.children);
   	});

   }

    function initCostClass(){//添加页面类别
    	 $.ajax({
				url:ctx+"/bizFinance/loadCostClassTree",
				async:true,
				success:function(data){
					 $(data).each(function(i,item){
					    	if(item.pId=='0'){
					    		var classObj = new getClass();
					    		classObj.id=item.id;
					    		classObj.name = item.name;
					    		classObj.pid=item.pId;
					    		pClassArr.push(classObj);
					    	}
					    });
					 addChildClass(data,pClassArr);
					 createClassItemList(pClassArr);
				}
			})
    }
  //  创建页面费用列表
//    function createClassItemList(pClassArr){
//    	var html='';
//    	$(pClassArr).each(function(i,item){
//    		html+='<div class="col-sm-3 no-padding padding-right-20"><div class="plan"><div class="header bordered-azure" id="'+item.id+'">'+item.name+'</div><ul>';
//    		if(item.pid=='0'&&!item.leaf){
//    			$(item.children).each(function(j,ptem){
//    				html+='<li><a id="'+ptem.id+'">'+ptem.name+'</a></li>';
//    			});
//    		}
//    		html+='<ul></ul></div></div>';
//    	});
//    	$('#financeItems').html('');
//    	$('#financeItems').append(html);
//    	
//    }
    
    
    function createClassItemList(pClassArr){
    	var html='';
    	var html2 = '';
    	$(pClassArr).each(function(i,item){
    		html+=`
    			 <li>
                    <a href="#" class="menu-dropdown" id="${item.id }">
                        <i class="fa fa-list-ul"></i>
                        <span class="menu-text pn-title">${item.name }</span>
                        <i class="fa pull-right"></i>
                    </a>
                    <ul class="submenu">
                       
                   
    		`;
    		
    		if(item.pid=='0'&&!item.leaf){
    			$(item.children).each(function(j,ptem){
    				html+=`
    					<li>
                            <a href="javascript:;" id="${ptem.id }">
                                <i class="fa fa-file-text-o"></i>
                                <span class="menu-text">${ptem.name }</span>
                            </a>
                        </li>
    				`;
    			});
    		}
    		html+=`
    			 </ul>
                </li>
    		`;
    	});
    	$('#financeItems').html('');
    	$('#financeItems').html(html);
    }
    
    //费用类别点击
    $('#financeItems').on("click",".submenu li",function(){
    	var obj = this;
    	var cid = $(this).find('a').attr("id");
    	var dutyId = $('#financeApplyForm input[name=applicantId]').next().val(); 
    	
    	matchDuty(cid, dutyId, obj);
    	
    });
    //初始化表单
    function initForm(obj){
    	var applicantId = $('#financeApplyForm input[name=applicantId]').val();
    	var applicantName = $('#financeApplyForm input[name=applicantId]').prev().val();
    	var departmentId =$('#financeApplyForm input[name=departmentId1]').val();
    	var fullName = $('#financeApplyForm input[name=departmentId1]').prev().val();
    	var cid= $(obj).find('a').attr("id");
    	var cname  = $(obj).find('a').text();
    	var pname = $(obj).parent().prev().text();
    	var pid = $(obj).parent().prev().attr("id");
    	$('#financeApplyModel h4.modal-title').text(pname+"->"+cname+"->财务申请");
    	$('#financeApplyForm')[0].reset();//
		$('#financeApplyForm input[name=applicantId]').val(applicantId);
		$('#financeApplyForm input[name=applicantId]').prev().val(applicantName);
		$('#financeApplyForm input[name=departmentId1]').val(departmentId);
		$('#financeApplyForm input[name=departmentId1]').prev().val(fullName);
		$('#financeApplyForm input[name=departmentId2]').val(departmentId);
		$('#financeApplyForm input[name=departmentId2]').prev().val(fullName);
    	var poption ="<option value='"+pid+"'>"+pname+"</option>";
    	var coption = "<option value='"+cid+"'>"+cname+"</option>";
    	$('#financeApplyForm select[name=pCostclassId]').find('option').remove();
    	$('#financeApplyForm select[name=pCostclassId]').append(poption);
    	$('#financeApplyForm select[name=costclassId]').find('option').remove();
    	$('#financeApplyForm select[name=costclassId]').append(coption);
    	editor.html('');
    	$('#financeApplyModel').modal({
            show: true,
            backdrop: 'static'
        })
    }
    
    $('#financeApplyForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {//表单验证
        	money: {
                validators: {
                    notEmpty: {
                        message: '金额不能为空'
                    },
                    regexp:{
                    	regexp: /^\d+(\.\d{1,2})?$/,
                    	message: '金额只能为数字且只有两位小数点'
                    }
                }
            },
            expendDetail:{
                validators: {
                    notEmpty: {
                        message: '支出明细不能为空'
                    }
                }
            },
            invoiceTitle: {
                validators: {
                    notEmpty: {
                        message: '发票抬头不能为空'
                    }
                }
            },
            payeeId:{
                validators: {
                	callback: {  
                        message: '选择收款人',  
                        callback: function(value,validator){
                       	 return !(value=='-1');
                       }
                   }  
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
        	if($('#financeApplyForm select[name=projectId]').val()=='-1'){
        		$('#financeApplyForm select[name=projectId]').val('');
        	}
            $.ajax({
                url: ctx + "/apply/addNewRecord",
                type: 'POST',
                data: $('#financeApplyForm').serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success"){
                    	$('#financeApplyModel').modal('hide');
                    	toastr.success("添加成功");
                    }else{
                    	toastr.error(data.msg);
                    }
                },
                error: function (response) {
                	toastr.error("系统错误");
                }
            });
            return false;
        }
    });
    
    //初始化部门
	 function initDepartment(){
		 $.ajax({
				url:ctx+"/department/selectDepartementByUser",
				dataType : "json",
				async:true,
				success:function(data){
					$('#financeApplyForm input[name=departmentId1]').val(data.departmentId);
					$('#financeApplyForm input[name=departmentId1]').prev().val(data.fullName);
					$('#financeApplyForm input[name=departmentId2]').val(data.departmentId);
					$('#financeApplyForm input[name=departmentId2]').prev().val(data.fullName);
				}
			})
	 }
	 //初始化 产品
	 function initProject(){
		 $('#financeApplyForm select[name=projectId]').find('option').remove();
		 var option = "<option value=-1>--请选择--</option>";
		 $('#financeApplyForm select[name=projectId]').append(option);
		 $.ajax({
				url:ctx+"/product/selectAll",
				async:true,
				success:function(data){
					$(data.list).each(function(i,item){
						var option= "<option value='"+item.productId+"'>"+item.productName+"</option>";
						$('#financeApplyForm select[name=projectId]').append(option);
					});
				}
			})
	 }
	 
	//初始化收款人信息
	 var bankArray = new Array();
	 function initBankInfo(){
		 var option = "<option value=-1>--请选择--</option>";
		 $('#financeApplyForm select[name=payeeId]').find('option').remove();
		 $('#financeApplyForm select[name=payeeId]').append(option);
		 $.ajax({
				url:ctx+"/bizFinance/load",
				async:true,
				success:function(data){
					$(data.returnObject.aaData).each(function(i,item){
						bankArray.push(item);
						var option= "<option value='"+item.financePayeeId+"'>"+item.accountName+"</option>";
						$('#financeApplyForm select[name=payeeId]').append(option);
					});
				}
			})
	 }
	 //收款人切换
	 $('#financeApplyForm select[name=payeeId]').change(function(){
		 var payeeId = $(this).val();
		 fillBankInfo('#financeApplyForm',payeeId);
	 });
	 //填写银行信息
	 function fillBankInfo(id,payeeId){
		 $(bankArray).each(function(i,item){
			 if(item.financePayeeId==payeeId){
					$(id).find('input[name=bankName]').val(item.bankName);
					$(id).find('input[name=province]').val(item.province);
					$(id).find('input[name=city]').val(item.city);
					$(id).find('input[name=payeeName]').val(item.accountName);
					$(id).find('input[name=accountNum]').val(item.accountNum);
					$(id).find('input[name=phone]').val(item.phone);
					$(id).find('input[name=accountName]').val(item.accountName);
					return false;
			  }
		 });
	 }

	 //匹配职位
	 function matchDuty(financeCostclassId, matchDutyId, obj){
		 var matchDutyFlag = false; 
		 $.ajax({
				url:ctx+"/bizFinance/loadAppvoing",
				async:false,
				type:'POST',
				data:{"financeCostclassId":financeCostclassId},
				success:function(data){
					
					var rightDuty;
					
					if(data.length > 0)
						rightDuty = data[0].rightDuty;
					
					if(rightDuty){
						
						var dutyIdArr = rightDuty.split(','); 
						
						$(dutyIdArr).each(function(i,item){
							
							if(matchDutyId == item){
								matchDutyFlag = true;
							}
						});
						
					}
//					matchDutyFlag=true; //测试用  默认都匹配
					if(!matchDutyFlag){
						toastr.success("职位不匹配");
					}else{
						
						 $('#financeApplyForm input[name="dutyIdVal"]').val(data[0].financeAppmainId);
						 if(data[0].bizFinanceApprovings!=null){
							$('#financeApplyForm input[name="approveNextDuty"]').val(data[0].bizFinanceApprovings[0].dutys);
						 }
						initForm(obj);
						loadAppvoe(data);
					}
					
				}
			});
		
	 }
	 //加载审批流
	 function loadAppvoe(data){
		 $('#approveFlow').html('');
		 
		 var html = "";
		 
		 var approvesArray = new Array();
		 var dytusArray=[];
		 if(data[0].bizFinanceApprovings!=null){
			 $.each(data[0].bizFinanceApprovings,function(index,obj){
				 dytusArray.push(obj.dutysName);
			 })
		 }
		 //var dytusArray = data[0].dutysName.split(',');
		 
		 approvesArray.push("申请");
		 Array.prototype.push.apply(approvesArray,dytusArray)
		 approvesArray.push("结束");
		 
		 var lines = Math.ceil(approvesArray.length/4);
		 
		 for(var i=0; i<lines; ++i){
			 html += '<div class="col-sm-offset-2 approve-flow-'+i+'" ></div>'
		 }
		 
		 $('#approveFlow').append(html);
		 
		 var revase = 0;
		 for(var i=0; i<approvesArray.length; ++i){
			 
			line_num = Math.trunc(i/4);
			
			if( (i+1)%4 == 0 && revase == 0 ){//每一行的末尾 1,3,5行
				var label = "";
				if(i == approvesArray.length-1)
					label = '<label>'+
	                            	'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
	                            '</label>';
				else
					label = '<label>'+
			                	'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
			                	'<i class="fa fa-mail-forward round"></i>'+
			                '</label>';
				$('.approve-flow-'+line_num+'').append(label);
				revase = 1;
			}else if( (i+1)%4 == 0 && revase == 1 ){//每一行的末尾，2,4,6行
				var label = "";
				if(i == approvesArray.length-1)
					label = '<label>'+
								'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
							'</label>';
				else
					label = '<label>'+
									'<i class="fa fa-mail-reply"></i>'+
									'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
								'</label>';					
				$('.approve-flow-'+line_num+'').prepend(label);
				revase = 0;
			}else if(revase == 0){//每一行的开头 1,3,5行
				var label = "";
				if(i == approvesArray.length-1)
					var label = '<label>'+
									'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
								'</label>';
				else
					var label = '<label>'+
									'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
									'<i class="glyphicon glyphicon-arrow-right"></i>'+
								'</label>';
				$('.approve-flow-'+line_num+'').append(label);
			}else if(revase == 1){//每一行的开头 2,4,6行
				var label = "";
				if(i == approvesArray.length-1)
					var label = '<label>'+
									'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
								'</label>';
				else
					var label = '<label>'+
									'<i class="glyphicon glyphicon-arrow-left"></i>'+
									'<a class="label label-info badge-square">'+approvesArray[i]+'</a>'+
								'</label>';
					$('.approve-flow-'+line_num+'').prepend(label);
			}
		 }
		 
	 }
	 //设置表单隐藏域的审批流的idval namevalsetFormHiddenApprove(data)
	 function setFormHiddenApprove(data){
		 var id_valList = "";
		 var name_valList="";
		 $(data).each(function(i,item){
			 if(i==data.length-1){
				 id_valList+=item.id_value;
				 name_valList+=item.name_value;
			 }else{
				 id_valList+=item.id_value+",";
				 name_valList+=item.name_value+",";
			 }
		 });
		 $('#financeApplyForm input[name=dutyIdVal]').val(id_valList);
//		 $('#financeApplyForm input[name=dutyNameVal]').val(name_valList);
	 }

    //点击费用显示对应的财务申请
  /*  $('.financialApplication .plan').on('click', 'a', function () {
        $('.financeApply').modal({
            show: true,
            backdrop: 'static'
        });
        $('#financeApply .costClasses').val($(this).parent().parent().prev().text());
        $('#financeApply .categoriesCost').val($(this).text());
    })*/
})
