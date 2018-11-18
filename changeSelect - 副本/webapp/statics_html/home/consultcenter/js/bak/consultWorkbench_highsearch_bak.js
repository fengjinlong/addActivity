//基础类
var highsearch = function () {
    return {
    	school:function(){
    		$("select[name='campus']").html('');
        	var data = baseAjax.simpleAjax('/department/getAllOption','{type: 3}');
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("select[name='campus']").html(opt);
            $("select[name='campus']").selectpicker('refresh');
        },
        project:function(){
        	$("select[name='lesson']").html('');
        	var data = baseAjax.simpleAjax("/bizScale/loadProject",'');
        	var opt = "";
            for (var i = 0; i < data.length; i++) {
                opt += "<option value=" + data[i].projectId + ">" + data[i].fullName + "</option>";
            }
            $("select[name='lesson']").html('<option value="">--请选择--</option>' + opt);
            $("select[name='lesson']").trigger('chosen:updated');
            $("select[name='lesson']").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
            
        },
        level:function(e){
        	$("select[name='grade']").html('');
        	var data = baseAjax.getAjax('/bizScale/loadProjectLevel?projectId='+e.value,'');
        	var opt = "";
            for (var i = 0; i < data.length; i++) {
                opt += "<option value=" + data[i].projectLevelId + ">" + data[i].levelTitle + "</option>";
            }
            $("select[name='grade']").html('<option value="">--请选择--</option>' + opt);
            $("select[name='grade']").trigger('chosen:updated');
            $("select[name='grade']").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    };
}();

$(function () {
	highsearch.school();
	highsearch.project();
	$("select[name='lesson']").chosen().change(function () {
		highsearch.level(this);
	});
})
