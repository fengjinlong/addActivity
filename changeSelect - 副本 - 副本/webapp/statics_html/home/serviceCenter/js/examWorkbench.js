function showInfoModal(infoManageId){
	$('.examination').modal('show');
	 $('.examination').on('hidden.bs.modal', function () {
		$('.examination .departmentName2').html('');
		$('.examination .brandName').html('');
		$('.examination .studentAttrName2').html('');
		$('.examination .studentAttrName1').html('');
		$('.examination .studentMaturity').html('');
		$('#payMentTableInfo').html('');
		$('#zxjl').html('');
        $('#hrzx').html('');
		$('.examination input').val('');
	 });
}
$('#nextStatusForm').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    		var ids = "";
    		var productIds = "";
    		var productId = "";
    		var aplliedforStatus = "";
		$('#alreadyRegistion input.checkchild:checkbox:checked').each(function(){
			ids += this.id + ",";
			productIds += $(this).attr('productId') + ",";
			productId = $(this).attr('productId');
			aplliedforStatus = $(this).attr('aplliedforStatus');
			mainStatus = $(this).attr('mainStatus');
		})
		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			$('#nextStatusForm').find('button').removeAttr('disabled');
			return;
		}
		
		
		ids = ids.substr(0, ids.length-1);
		productIds = productIds.substr(0, productIds.length-1);
		
        $.ajax({
	        url: ctx + '/examWorkbenchExamFlow/switchStatus',
	        type: 'POST',
	        dataType: 'json',
	        data: {ids:ids, 
		        	productIds:productIds,
		        	productId:productId,
		        	aplliedforStatus:aplliedforStatus,
		        	mainStatus:mainStatus},
	        success: function (data) {
	        	$('#nextStatusForm').find('button').removeAttr('disabled');
	        	if(data.scode == "20001"){
	        		swal("", "修改成功！", "success");
	        		filterTable();
	        	}
	        	else 
	        		toastr.error(data.msg);
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
		$('.review-completed').modal('hide');
    }
});


$(document).ready(function(){

});
