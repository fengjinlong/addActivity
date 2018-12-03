//查询回流咨询总量
function getPoolSize() {
	$.post(ctx+"/consultBackFlow/getPoolSize",{},function(data){
		if(data.status=="success") {
			//页面显示回流咨询总量
			$("#pieceCount").val(data.data);
		}
	},"json");
}

getPoolSize();


//藏宝阁按钮单击事件，选中数量的按钮激活active，其它按钮取消active状态
function changeActive(obj) {
	//先取消页面上所有数量按钮的激活状态
	$(".buttonCount").find("button").each(function(i,e){
		if($(e).hasClass("btn-primary")) {
			$(e).removeClass("btn-primary");
			$(e).addClass("btn-default");
		}
	});
	//为点击的按钮设置激活状态
	if($(obj).hasClass("btn-default")) {
		$(obj).addClass("btn-primary");
	}
}

//准备开抢按钮-单击时间
function grabTreasure(obj) {
	//先判断用户是否已经点击过按钮，点击过不让再二次点击
	//先得到页面数量按钮选中的数量
	var count = $(".buttonCount").find("button.btn-primary").text();
	swal({
        title: "",
        text: "确定要抢"+count+"条咨询量吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: true
    }, function (result) {
        if(result==true) {
        	//首先，使按钮无效，避免二次点击，重复操作
        	$(obj).prop("disabled",true);
        	$(obj).removeClass("btn-primary");
        	$(obj).addClass("btn-default");
        	//开始到回流咨询量中选中count条咨询量分配给当前用户
        	$.post(ctx+"/consultBackFlow/getEnableBackConsult",{"count":count},function(data){
        		if(data.status=="success") {
        			 toastr.success('抢咨询量成功');
        			 //更新页面剩余回流咨询量
        			 getPoolSize();
        			 //更新手动分发回流咨询量页面
        			 init();
        		} else {
        			 toastr.error('抢咨询量失败:'+data.msg);
        			 $(obj).prop("disabled",false);
        			 $(obj).removeClass("btn-default");
        			 $(obj).addClass("btn-primary");
        		}
        	},"json");
        }
    });

}