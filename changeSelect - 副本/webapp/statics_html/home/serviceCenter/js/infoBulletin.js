$(function(){
	$("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
	init();
	$('[data-toggle="tooltip"]').tooltip()
    showDept();
    showProject();
    
    $("#projectId").change(function(){
    	var projectId = $(this).val();
    	showLevel(projectId,1);
    })
    $("#projectId2").change(function(){
    	var projectId = $(this).val();
    	showLevel(projectId,2);
    })

	$('.chosen-select').chosen({no_results_text: "没有匹配项"});
})

/**
 * 回车检索
 * @returns
 */
function search(){
	if(event.keyCode==13){
		toSearch();
	}
}
function toSearch(){
	init();
}

$(document).on('click', '#add', function(){
	$('#addForm').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
	$(".chosen-select").trigger("chosen:updated");
	$(".selectpicker").selectpicker('refresh');
	editor.html('');
	$('#myModel').modal('show');
});

function validateForm() {
	var school = $('#departmentId').val();
    $.ajax({
        url: ctx + '/serviceInfo/addNewRecord',
        type: 'POST',
        data: $('#addForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success"){
				toastr.success(data.msg);
            	$('#newinformation').modal('hide');
				init();
            }else{
            	toastr.error(data.msg);
            }
                
        },
        error: function (response) {
            alert("系统错误");
        }
    });
    return false;
}

function editValidateForm(){
	
	$('#inputcontent').val(editor2.html());
	
	$.ajax({
        url: ctx + '/serviceInfo/updateRecord',
        type: 'POST',
        data: $('#editForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success"){
            	toastr.success(data.msg);
            	$('#newinformsee').modal('hide');
				init();
            }else{
            	toastr.error(data.msg);
            }
                
        },
        error: function (response) {
            alert("系统错误");
        }
    });
    return false;
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "searchVal", "value": $("#searchVal").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init (){
	var init = $('#init').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"bLengthChange": true,//每页显示的记录数
		//"iDisplayLength": 10, 
		"bPaginate":true,
		"bSort": false, //是否支持排序功能
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
		"sAjaxSource" : ctx+'/serviceInfo/getAll',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"bStateSave": true,
		"aoColumns" : [
			{"mDataProp" : "deptName","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "projectName","bSortable": false,'sClass': "text-center"},
            {"mDataProp" : "levelName","bSortable": false,'sClass': "text-center"},
            {"mDataProp" : "infoType","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
            	if(data == 1){
            		return "考务信息";
            	}else if(data == 2){
            		return "公告信息";
            	}
            }},
            {"mDataProp" : "createDate","bSortable": false,'sClass': "text-center"},
            {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
            	if(data == 1){
            		return '<span onclick="prohibit(\''+full.infoId+'\')" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</span>';
            	}else if(data == 0){
            		return '<span onclick="awaken(\''+full.infoId+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
            	}
            }},
            {"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
            		return 	'<a href="#" data-record=\''+JSON.stringify(full)+'\' data-type="1" class="check"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>'+
                		'<a href="#" data-record=\''+JSON.stringify(full)+'\' data-type="2" class="edit" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
            }}],
		"aoColumnDefs" : [{
            sDefaultContent: '',
            aTargets: [ '_all' ]
   	      }]
	});

	//每页显示记录数
	$('.dataTables_info').parent().append($('.dataTables_length'));
}

/**
 * 查看和编辑
 */
$("#init").on('click','.check,.edit',function(){
	$("#newinformsee").modal("show");
	var record = $(this).data('record');
	showLevel(record.projectId,2,record.levelId);
	var type = $(this).data('type');
	if(type == 1){
		$("#newinformsee .modal-footer").css("display","none");
		editor2.readonly(true);
		$('#newinformsee .widget-caption').text('查看');
	}else if(type == 2){
		$("#newinformsee .modal-footer").css("display","block");
		$('#newinformsee').find('textarea').removeAttr("disabled");
		$('#newinformsee').find('select').removeAttr("disabled");
		editor2.readonly(false);
		$('#newinformsee .widget-caption').text('编辑');
	}
	$("#departmentId2").val(record.departmentId);
	$("#projectId2").val(record.projectId);
	$('#projectId2').trigger('chosen:updated');
	$("#levelId2").val(record.levelId);
	$("#newinformsee").find("[name='infoType']").val(record.infoType);
	$("#newinformsee").find("[name='infoId']").val(record.infoId);
	editor2.html(record.content);
})

/**
 * 显示分校
 */
function showDept(){
	$.ajax({
        url: ctx + '/financeGeneral/showDept',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var html = "";
        	$(data).each(function(i,n){
        		html += '<option value="'+n.departmentId+'">'+n.fullName+'</option>';
        	})
        	$("#departmentId").append(html);
			$("#departmentId").trigger('chosen:updated');
			$('.chosen-container').width('100%');
        	$("#departmentId2").append(html);
			$("#departmentId2").trigger('chosen:updated');
			$('.chosen-container').width('100%');
		}
	});
}

/**
 * 显示项目
 */
function showProject(){
	$.ajax({
        url: ctx + '/financeZpIncome/showProject',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var html = "";
        	$(data).each(function(i,n){
        		html += '<option value="'+n.projectId+'">'+n.fullName+'</option>';
        	})
        	$("#projectId").append(html);
			$('#projectId').trigger('chosen:updated');
        	$('.chosen-container').width('100%');

			$("#projectId2").append(html);
			$('#projectId2').trigger('chosen:updated');
			$('.chosen-container').width('100%');

			showLevel(data[0].projectId,1);
        	showLevel(data[0].projectId,2);
        }
	});
}


/**
 * 显示级别
 */
function showLevel(projectId,num,levelId){
	$.ajax({
        url: ctx + '/serviceInfo/showLevel',
        data: {projectId:projectId},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var html = "";
        	$(data).each(function(i,n){
        		if(levelId == n.projectLevelId){
        			html += '<option selected="selected" value="'+n.projectLevelId+'">'+n.levelTitle+'</option>';
        		}else{
        			html += '<option value="'+n.projectLevelId+'">'+n.levelTitle+'</option>';
        		}
        	})
        	if(num == 1){
        		$("#levelId").html("");
            	$("#levelId").append(html);
        	}else if(num == 2){
        		$("#levelId2").html("");
            	$("#levelId2").append(html);
        	}
        }
	});
}

function prohibit(val){
	$.ajax({
        url: ctx + '/serviceInfo/prohibit',
        data: {infoId:val},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if (data.status == "success"){
            	toastr.success(data.msg);
				init();
            }else{
            	toastr.error(data.msg);
            }
        }
	});
}

function awaken(val){
	$.ajax({
        url: ctx + '/serviceInfo/awaken',
        data: {infoId:val},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if (data.status == "success"){
            	toastr.success(data.msg);
				init();
            }else{
            	toastr.error(data.msg);
            }
        }
	});
}
