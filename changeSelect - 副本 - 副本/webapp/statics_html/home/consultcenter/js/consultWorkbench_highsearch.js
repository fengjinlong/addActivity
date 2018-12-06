//基础类
var highsearch = function () {
    return {
    	school:function(){
    		$("select[name='campus']").html('');
        	var data = baseAjax.simpleAjax('/department/getAllOption', {type: 3});
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("select[name='campus']").html(opt);
            $("select[name='campus']").selectpicker('refresh');
        },
        product:function(){
        	$("select[name='product']").html('');
        	var data = baseAjax.simpleAjax("/consultConsoleWFC/getProduct", {productForm: 0});
        	var opt = "";
    		for (var i = 0; i < data.length; i++) {
    			//debugger;
    			opt += "<option value='" + data[i].productId + "'>" + data[i].productName + "</option>";
    		}
    		$("select[name='product']").html('<option value="">--请选择--</option>' + opt);
    		$("select[name='product']").trigger('chosen:updated');
    		$("select[name='product']").chosen({no_results_text: "没有匹配项", search_contains: true});
    		$('.chosen-container').width('100%');
        }
    };
}();

$(function () {
	highsearch.school();
	highsearch.product();
})
