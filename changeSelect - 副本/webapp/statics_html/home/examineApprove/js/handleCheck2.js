(function(){
	var applyId = $('#applyPageInfoForm input[name=applyId]').val();
	function initApplyInfo(){
		$.ajax({
	        url: ctx + '/apply/selectAllByWhere',
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
	        			//initBankName(item.payeeId);
	        			addApproveFlow(item);
	        			editor.readonly(true);
	        			editor.html(item.content);
	        		});
	        }
		});
	}
	 function addApproveFlow(result){1}
	
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
	function selectUserByDutyId(dutyId){}
   function completeText(applyResult,lastResult){
	    var text="";
	   	text+='<li>';
	   	text+='<div class="timeline-datetime">';
	   	text+='<span class="timeline-time">'+(lastResult.createDate.split(' ')[1])+'</span>';
	   	text+='<span class="timeline-date">'+(lastResult.createDate.split(' ')[0])+'</span>';
	   	text+='</div>';
	   	text+='<div class="timeline-badge sky pass-ing">';   
	   	text+='<i class="pass-content">完成</i>';
	   	text+='</div>';
	   	text+='<div class="timeline-panel">';
	   	text+='<div class="timeline-header bordered-bottom bordered-blue">';
	   	text+='<p class="timeline-datetime">';
	   	text+='<small class="text-muted">';
	   	text+='<i class="glyphicon glyphicon-time"></i>';
	   	text+='<span class="timeline-date">'+(lastResult.createDate.split(' ')[1])+'</span>';
	   	text+='<span class="timeline-time">'+(lastResult.createDate.split(' ')[0])+'</span>';
	   	text+='</small>';
	   	text+='</p>';
	   	text+='</div>';
	   	text+=' <div class="timeline-body">';
	   	text+='<a href="#"></a> <a href="#">申请人:'+(applyResult.applicantName+('<br/><br/>申请状态:审批完成<br/><br/>审批状态:'+(applyResult.applicantStatus=='1'?'已通过':'未通过')))+'</a>';
	   	text+='<div class="tl-wide text-center" style="padding: 5px; margin-top:10px; margin-bottom: 10px;"></div>';
	   	text+='<i class="text-muted text-sm"></i>';
	   	text+='</div>';	
	   	text+='</div>';
	   	text+='</li>';
	   	return text;
   } 
	initApplyInfo();
})(jQuery)