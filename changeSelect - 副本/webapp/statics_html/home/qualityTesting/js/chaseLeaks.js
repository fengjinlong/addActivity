
//表单提交
function checkedCim() {
	
	//非空校验
    var searchVal = $("#searchVal").val();
    if(searchVal == null || searchVal == ''){
        toastr.error("内容不可为空！");
        return false;
    }else if(searchVal == ',') {
        toastr.error("内容不可为空！");
        return false;
	}
	
    if (searchVal != null && searchVal != '') {
    	//发送请求，此处不能直接用ajax，否则会出现无法弹出下载框的现象，如果用ajax需返回路径再重定向
    	//window.location.href = ctx + "/chaseLeaks/checked?searchVal="+$("#searchVal").val();
    	$("#checkPhone").attr("action",ctx + "/chaseLeaks/checked");
    	$("#checkPhone").submit();
	}
    
    
}







