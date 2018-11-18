(function(){
	var applyId = $('#applyPageInfoForm input[name=applyId]').val();
	function initApplyInfo(){
		$.ajax({
	        url: ctx + '/apply/selectByKey',
	        data:{"applyId":applyId},
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        		data = data.returnObject.aaData;
	        		$(data).each(function(i,item){
	        			$('#financeApplyForm input[name=applicantName]').val(item.applicantName);
	        			$('#financeApplyForm input[name=applicantDate]').val(item.applicantDate);
	        			$('#financeApplyForm input[name=money]').val(item.money);
	        			$('#financeApplyForm select[name=paymentFrom]').val(item.paymentFrom);
	        			$('#financeApplyForm select[name=payment]').val(item.payment);
	        			$('#financeApplyForm input[name=expendDetail]').val(item.expendDetail);
	        			$('#financeApplyForm input[name=invoiceTitle]').val(item.invoiceTitle);
	        			$('#financeApplyForm input[name=departmentName]').val(item.departmentName);
	        			$('#financeApplyForm input[name=projectName]').val(item.projectName);
	        			$('#financeApplyForm input[name=pCostClassName]').val(item.pCostClassName);
	        			$('#financeApplyForm input[name=costClassName]').val(item.costClassName);
	        			$('#financeApplyForm select[name=expendType]').val(item.expendType);
	        			$('#financeApplyForm select[name=isAdjustment]').val(item.isAdjustment);
	        			$('#financeApplyForm input[name=departmentNameT]').val(item.departmentName);
	        			$('#financeApplyForm textarea[name=content]').val(item.content);
	        			
	        			$('#financeApplyForm input[name=payeeName]').val(item.payeeName);
	        			$('#financeApplyForm input[name=bankName]').val(item.bankName);
	        			$('#financeApplyForm input[name=province]').val(item.province);
	        			$('#financeApplyForm input[name=city]').val(item.city);
	        			$('#financeApplyForm input[name=accountName]').val(item.accountName);
	        			$('#financeApplyForm input[name=accountNum]').val(item.accountNum);
	        			$('#financeApplyForm input[name=phone]').val(item.phone);
	        			addApproveFlow(item);
	        			editor.readonly(true);
	        			try{
	        				editor.html(item.content);
	        			}catch(err){
	        			  
	        			}
	        		});
	        }
		});
	}
	function addApproveFlow(result){
		 var applyId = result.applyId;
		 var html='<ul class="timeline">';
		 $.ajax({
				url: ctx + "/apply/loadApprovingStep",
				dataType: 'json',
				data:{"applyId":applyId},
				async:true,
				success: function(data){
					var i=1;
					if(data.bizFinanceApprovingUsers != null && data.bizFinanceApprovingUsers.length!=0){
						 html+='<li class="timeline-node"><a class="btn btn-palegreen">开始</a></li>';
						 $.each(data.bizFinanceApprovingUsers,function(index,obj){
							 if(i%2 ==0){
								 html+='<li class="timeline-inverted">';
							 }else{
								 html+='<li>';
							 }
							 html+='<div class="timeline-datetime">';
							 html+='<span class="timeline-time"> '+handleDateFormat(obj.createDate,"time")+' </span>';
							 html+='<span class="timeline-date">'+(obj.createDate.substring(0,10))+'</span>';
							 html+='</div>';
							 html+='<div class="timeline-badge pass">';   
					         html+='<i class="handle-num pass-content">'+i+'</i>';
					         i=i+1;
					         html+='</div>';
					         html+='<div class="timeline-panel">';
					         html+='<div class="timeline-header bordered-bottom bordered-blue">';
					         html+='<span class="timeline-title"> 审批职位:'+obj.dutysName+'<br/><br/>审批状态:'+findStatus(obj.status)+' </span>';
					         html+='<p class="timeline-datetime">';
					         html+='<small class="text-muted">';
					         html+='<i class="glyphicon glyphicon-time"></i>';
					         html+='</small>';
					         html+='</p>';
					         html+='</div>';
					         html+=' <div class="timeline-body">';
					         html+='<p>审批意见:'+(obj.memo==null?"":obj.memo)+'</p>';
					         html+='</div>';
					         html+='</li>';
						 })
					}
					if(data.bizFinanceApprovings != null && data.bizFinanceApprovings.length!=0){
						 html+='<li class="timeline-node"><a class="btn btn-yellow">现在</a></li>';
						 $.each(data.bizFinanceApprovings,function(index,obj){
							 html+='<li>';
							 html+='<div class="timeline-datetime">';
							 html+='<span class="timeline-time">  </span>';
							 html+='<span class="timeline-date">  </span>';
							 html+='</div>';
							 if(index==0){
								 html+='<div class="timeline-badge sky pass-ing">';   
								 html+='<i class="handle-num passing-content">'+i+'</i>';
							 }else{
								 html+='<div class="timeline-badge blue unpass">';   
								 html+='<i class="handle-num unpass-content">'+i+'</i>';
							 }
					         i=i+1;
					         html+='</div>';
					         html+='<div class="timeline-panel">';
					         html+='<div class="timeline-header bordered-bottom bordered-blue">';
					         html+='<span class="timeline-title"> 审批职位:'+obj.dutysName+'</span>';
					         html+='<p class="timeline-datetime">';
					         html+='<small class="text-muted">';
					         html+='<i class="glyphicon glyphicon-time"></i>';
					         html+='</small>';
					         html+='</p>';
					         html+='</div>';
					         html+=' <div class="timeline-body">';
					         html+='<p></p>';
					         html+='</div>';
					         html+='</li>';
						 })
					}
					 html+='<li class="timeline-node"><a class="btn btn-info">结束</a></li>';
					 html+="</ul>";
					 $('#approveFlow').html(html);
				}
			});
		 
		 $.ajax({
		        url: ctx + '/groupExpend/applyDetail',
		        type: 'POST',
		        data:{
		        	applyId:applyId
		        },
		        dataType: 'json',
		        success: function (data) {
		        	$('#applyDetail').html('');
		        		data = data.record;
		        		if(data.length == '0'){
		        			$('#divApplyDetail').hide();
		        			$('#buttonApplyDetail').hide();
		        		}else{
		        			$('#divApplyDetail').show();
		        			$('#buttonApplyDetail').show();
		        		}
		        		
		        		var str = '';
		        		for(var i=0;i<data.length;i++){
		        			str = '<tr><td><label> <input detailId="'+data[i].detailId+'" applyId="'+data[i].applyId+'" infoManageId="'+data[i].infoManageId+'" productId="'+data[i].productId+'" onclick="readMe(this)" type="checkbox"><span class="text"></span></label></td>'
	                             +' <td>'+data[i].baoMDate+'</td>'
	                             +' <td>'+data[i].studentName+'</td>'
	                             +' <td>'+data[i].status+'</td>'
	                             +' <td>'+data[i].ktimeValue+'</td>'
	                             +' <td>'+data[i].productName+'</td>'
	                             +'<td>'+data[i].sum_price+'</td>'
	                             +'<td>'+data[i].sPrice+'</td>'
	                             +' <td class="see" productId="'+data[i].productId+'" value="'+data[i].infoManageId+'">查看</td>'
	                             +' <td class="edit" productId="'+data[i].productId+'" value="'+data[i].infoManageId+'">记录</td></tr>';
		        			$('#applyDetail').append(str);
		        		}
		        		if (data.length < 1) {
							$('#applyDetail').css('display','none');
						}
		        }
		    });
		
	 }
	
	function initBankName(payeeId){//银行相关信息
		$.ajax({
	        url: ctx + '/bizFinance/load',
	        data:{"financePayeeId":payeeId},
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        	data = data.returnObject.aaData;
	        	$(data).each(function(i,item){
	        		$('#financeApplyForm input[name=payeeId]').val(item.accountName);
	        		$('#financeApplyForm input[name=bankName]').val(item.bankName);
        			$('#financeApplyForm input[name=province]').val(item.province);
        			$('#financeApplyForm input[name=city]').val(item.city);
	        	});
	        }
		});
	}
	function selectUserByDutyId(dutyId){
		var sysData="";
		$.ajax({
	        url: ctx + '/user/selectUserByDutyId',
	        data:{"dutyId":dutyId},
	        type: 'POST',
	        async:false,
	        dataType: 'json',
	        success: function (data) {
	        	sysData = data.list;
	        }
		});
		return sysData;
	}
	initApplyInfo();
	
	
	function cooperationModule(){
        return {
            init:function(){
                //缴费合计点击
                $('#applyDetail').on('click','.edit',function(){
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("productId");
                	INFOMANAGEID=$(this).attr("value");
                	DATESTRING=$(this).attr("dateString");
                	init2();
                	$('.cooperation-module-edit').modal('show');
                })
                
                $('#applyDetail').on('click','.see',function(){
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("productId");
                	INFOMANAGEID=$(this).attr("value");
                	 $.post(ctx + '/studentServiceCenter/selectApplyDataByInfo',{
                     	infoManageId:INFOMANAGEID,
                     	productId:CREATEUSERID
                     	},
                     	function(data){
                     		if(data.status = 'success'){
                     			$('#detailzl').find('tbody').html('');
	                     		var prevUrl = data.prevUrl;
	                         	data = data.data;
	                         	for(var i=0;i<data.length;i++){
	                         		var str = '<img src="'+prevUrl+data[i].applyUrl+'"'
	                					+'	style="height:200px;width:200px;" alt=""> '
	                					+'		<a href="#" onclick=\'lookImg("'+prevUrl+data[i].applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a>';
	                         		var tr = '<tr>'
	                         			+'<td>'+data[i].applyDataName+'</td>'
	                         			+'<td>'+str+'</td>'
	                         			+'</tr>'
	                         		$('#detailzl').find('tbody').append(tr);
	                         	}
                     		}else{
                     			swal('',"该学员没有上传资料",'error');
                     		}
                     },"json");
                	
                	$('.cooperation-see').modal('show');
                })
                
                return this;
            }
        }
    }
    cooperationModule().init();
	
})(jQuery)

function lookImg(url){
	$("#imgLook").attr("src",url);
	$(".lookImg").modal("show");
}

function findStatus(status){
	if(status == 0){
		return '未审批';
	}
	if(status == 1){
		return '审批通过';
	}
	if(status == 2){
		return '以复批';
	}
	if(status == 3){
		return '驳回';
	}
}

/**
 * 时间格式化
 */
function handleDateFormat(val,type){
	var date=new Date(val); 
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
    if(type == "time"){
    	//返回 时间
    	 return hour+':'+minute+':'+seconde; 
    }else if(type == "date"){
    	//返回 日期
    	 return year + '-' + month + '-' + day; 
    }else{
    	 return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde; 
    }
}

/**
 * 初始化 查看详情
 * @returns
 */
function init2() {
    var init = $('#detail').dataTable({
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
        "sAjaxSource": ctx+'/consultInfoManagePayFees/queryDetail',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData2,
        "aoColumns": [
                      	{"mDataProp": "createDate",'sClass': "text-center", "mRender": function (data, type, full) {
							return full['createDate'];
						}},
						{"mDataProp": "payName",'sClass': "text-center"},
						{"mDataProp": "payFrom",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['payFrom'])
							{
								case '1':
									return '现金'
									       
								  break;
								case '2':
									return '刷卡'
								  break;
								case '3':
									return '支票'
								  break;
								case '4':
									return '微信'
								  break;
								case '5':
									return '支付宝'
								  break;
								case '6':
									return '网络'
								  break;
								case '7':
									return '银行转账'
								  break;
								case '8':
									return '分期'
								  break;
								default:
									return ''
							}
						}},
						{"mDataProp": "payValue",'sClass': "text-center"},
						{"mDataProp": "isNeIf",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['isNeIf'])
							{
								case 1:
									return '支出'
								case 2:
									return '收入'
								default:
									return ''
							}
						}},
						{"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['unAction'])
							{
								case 1:
									return '转班'
								case 2:
									return '休学'
								case 3:
									return '退费'
								case 4:
									return '补考'
								case 5:
									return '重修'
								case 6:
									return '正常'
								default:
									return ''
							}
						}},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });

    //每页显示记录数
    $('#detail_wrapper .dataTables_info').parent().append($('#detail_wrapper .dataTables_length'));
}
var CREATEUSERID;
var INFOMANAGEID;
var DATESTRING;
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
    aoData.push({"name": "productId", "value":CREATEUSERID});
    aoData.push({"name": "infoManageId", "value":INFOMANAGEID});
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
