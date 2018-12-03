$(function () {
    $('.examinationAdd').on('hidden.bs.modal', function () {
        $('#examinationAdd')[0].reset();
        $('#examinationAdd input:hidden').val('');
        $('#examinationAdd .selectpicker').selectpicker('refresh');
        $('#projectId').val('');
        $('#projectId').trigger('chosen:updated');
        //$('#matchAdd .sysUser').remove();
        $('#examinationAdd').data('bootstrapValidator').resetForm();
    })
    $('.examinationEdit').on('hidden.bs.modal', function () {
        $('#examinationEdit')[0].reset();
        $('#examinationEdit input:hidden').val('');
        $('#examinationEdit .selectpicker').selectpicker('refresh');
        //$('#matchAdd .sysUser').remove();
        $('#examinationEdit').data('bootstrapValidator').resetForm();
    })

    //日期
    $(".form_datetime").jeDate({
        format: 'YYYY年MM月'
    });

    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });
    
   

    //启用、禁用切换
    $('table tbody').on('click', '.status-btn', function () {
        if ($(this).hasClass('btn-use')) {
            $(this).removeClass('btn-use').addClass('btn-nouse');
            $(this).html('<i class="fa fa-ban"></i> 禁用');
        } else {
            $(this).removeClass('btn-nouse').addClass('btn-use');
            $(this).html('<i class="fa fa-check-square-o"></i> 启用');
        }
    })

    //新增
    educationStyle('.examinationAdd');

    //编辑
    educationStyle('.examinationEdit');

    /**
     * 项目类别是学历时显示教育形式
     * @param parentEle
     */
    function educationStyle(parentEle) {
        if ($(parentEle).find('.projectType :selected').val() == '2') {
            $(parentEle).find('.educationForm').parent().parent().show();
        } else {
            $(parentEle).find('.educationForm').parent().parent().hide();
        }

        $(parentEle).find('.projectType').change(function () {
            if ($(this).find(':selected').val() == '2') {
                $(parentEle).find('.educationForm').parent().parent().show();
            } else {
                $(parentEle).find('.educationForm').parent().parent().hide();
            }
        });
    }

    $('#updtprojectType').change(function () {
        var projectType = $(this).val();
        $.ajax({
            url: ctx + '/bizProject/getAll',
            type: 'POST',
            data: {projectType: projectType},
            dataType: 'json',
            async: true,
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.list.length; i++) {
                    opt += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
                }
                $("#updtprojectId").html('<option value="">--请选择--</option>' + opt);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    $('#updtprojectId').change(function () {
        var projectId = $(this).val();
        $.ajax({
            url: ctx + '/bizProjectLevel/getAllOption',
            type: 'POST',
            data: {projectId: projectId},
            dataType: 'json',
            async: true,
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.list.length; i++) {
                    opt += "<option value=" + data.list[i].projectLevelId + ">" + data.list[i].levelTitle + "</option>";
                }
                $("#updtprojectLevelId").html('<option value="">--请选择--</option>' + opt);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
})

var DataTable = function(){
	return{
		init: function(){
			var Table = $('#personnelMatch').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizExamSetting/load',
        		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
        			"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
        		},
        		"aoColumns" : [
        		               /*
          			            {
          			                "mData": "examSettingId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
          			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
          			            }
          			            },*/
//          			            {"mData": "examDate", 'sClass': "hiddenCol"},
          			            {"mData": "examDate", 'sClass': "text-center"},
          			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
          			            	if(data==0){
          			          		  return '<span style="width: inherit" id="span'+full["examSettingId"]+'" onclick="chooseStudent(\''+full["examSettingId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
          			          	  }else{
          			          		  return '<span style="width: inherit" id="span'+full["examSettingId"]+'" onclick="chooseStudent(\''+full["examSettingId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
          			          	  }
          			            }},
          			            {
          			                "mData": "examSettingId",
          			                'sClass': "text-center",
          			                "bSortable": false,
          			                "mRender": function (data, type, full ) {
          			                    var u = '<shiro:hasPermission name="bizExamSetting:edit"><a onclick="edit(\''+full["examSettingId"]
          			                    	+'\',\''+full["examDate"]
          			                    	+'\',\''+full["projectType"]	
	          			                    +'\',\''+full["projectId"]
          			                    	+'\',\''+full["projectLevelId"]
          			                    	+'\',\''+full["educationForm"]
	          								+'\',\''+full["disabledDate"].replace(' 00:00:00','')
	          								+'\',\''+full["endDate"].replace(' 00:00:00','')
	          								+'\',\''+full["clearDate"].replace(' 00:00:00','')
          			                    	+'\')"class="edit" data-toggle="modal" data-target=".examinationEdit" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
          			                	return u;
          			                }
          			            }
          			        ],
          			      "aoColumnDefs": [{
       		   	            sDefaultContent: '',
       		   	            aTargets: ['_all']
       		   	        }],
	       		   	  "fnRowCallback":function(nRow,aData,iDisplayIndex){},
			})
		    $('#personnelMatch_wrapper .dataTables_info').parent().append($('#personnelMatch_wrapper .dataTables_length'));
		}
	}
}();

//项目类型，项目联动
function selectProjectId() {
    var projectType = $('#projectType').find(':selected').val();
    $.ajax({
        url: ctx + '/bizProject/getAll',
        data: {projectType: projectType},
        dataType: 'json',
        type: 'post',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
            }
            $('#projectId').html('<option value="">--请选择--</option>' + opt);
            $('#projectId').trigger('chosen:updated');
            $("#projectId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function () {
            toastr.error("系统错误");
        }
    });
}
//项目，级别联动
function selectProjectLiveId() {
    var projectId = $('#projectId').find(':selected').val();
    $.ajax({
        url: ctx + '/bizProjectLevel/getAllOption',
        data: {projectId: projectId},
        dataType: 'json',
        type: 'post',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value='" + data.list[i].projectLevelId + "'>" + data.list[i].levelTitle + "</option>";
            }
            $('#projectLevelId').html('<option value="">--请选择--</option>' + opt);
        },
        error: function () {
            toastr.error("系统错误");
        }
    });
}

//新增
$('#examinationAdd').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var params = form.serialize();
        var examDate = $('#examinationAdd').find('input[name=examDate]').val();
        var disabledDate = $('#examinationAdd').find('input[name=disabledDate]').val();
        var endDate = $('#examinationAdd').find('input[name=endDate]').val();
        var clearDate = $('#examinationAdd').find('input[name=clearDate]').val();
        if(examDate.trim()==''){
        		toastr.error("考期不能为空");
        		$('#examinationAdd').find('button').removeAttr('disabled');
        		return;
        }
        if(disabledDate.trim()==''){
	    		toastr.error("禁用时间不能为空");
	    		$('#examinationAdd').find('button').removeAttr('disabled');
	    		return;
	    }
        if(endDate.trim()==''){
	    		toastr.error("开始时间不能为空");
	    		$('#examinationAdd').find('button').removeAttr('disabled');
	    		return;
	    }
        if(clearDate.trim()==''){
	    		toastr.error("结束时间不能为空");
	    		$('#examinationAdd').find('button').removeAttr('disabled');
	    		return;
	    }
        if(!validateTimePeriod(endDate,clearDate)){
	        	toastr.error("结束时间不能大于开始时间");
	    		$('#examinationAdd').find('button').removeAttr('disabled');
	    		return;
        }
        $.ajax({
            url: ctx + '/bizExamSetting/addNewRecord',
            data: params,
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.examinationAdd').modal('hide');
                    DataTable.init();
                }
            },
            error: function () {
                toastr.error("不能添加重复数据");
            }
        });
        return false;
    }
});

function validateTimePeriod(starttime, endtime) {  
	var start = starttime.replace("-", "").replace("-", "");  
	var end = endtime.replace("-", "").replace("-", "");  
	if(end<start){    
	    return false;    
	}else{
		return true;
	}    
}  

//数据初始化
$("#personnelMatch tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#personnelMatch tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    var enable = $('#enable').val();
    aoData.push({"name": "enable", "value": enable});
    var examDate = $('#examDates').val();
    var educationForm = $('#selectEducationForm').val();
    if(examDate!=null||examDate!=""){
    	aoData.push({"name": "examDate", "value": examDate});
    }
    if(educationForm!=null||educationForm!=""){
    	aoData.push({"name": "educationForm", "value": educationForm});
    }
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
};
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizExamSetting/updateRecord',
        type: 'POST',
        data: {
            examSettingId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
//编辑
function edit(examSettingId, examDate, projectType, projectId, projectLevelId, educationForm, disabledDate, endDate, clearDate) {

    if (projectType == 2) {
        $('.examinationEdit').find('.educationForm').parent().parent().show();
    } else {
        $('.examinationEdit').find('.educationForm').parent().parent().hide();
    }

    $('.examinationEdit').find('.projectType').change(function () {
        if ($(this).find(':selected').val() == '2') {
            $('.examinationEdit').find('.educationForm').parent().parent().show();
        } else {
            $('.examinationEdit').find('.educationForm').parent().parent().hide();
        }
    });

    $('#updtexamSettingId').val(examSettingId);
    $('#updtexamDate').val(examDate);
//    $.ajax({
//        url: ctx + '/bizProject/getAll',
//        type: 'POST',
//        data: {"projectType": projectType},
//        dataType: 'json',
//        success: function (data) {
//            var opt = "";
//            for (var i = 0; i < data.list.length; i++) {
//                opt += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
//            }
//            $("#updtprojectId").html(opt);
//            $("#updtprojectId").val(projectId);
//            $('#updtprojectId').trigger('chosen:updated');
//            $("#updtprojectId").chosen({no_results_text: "没有匹配项", search_contains: true});
//            $('.chosen-container').width('100%');
//        },
//        error: function (response) {
//            toastr.error("系统错误");
//        }
//    });
//    $.ajax({
//        url: ctx + '/bizProjectLevel/getAllOption',
//        type: 'POST',
//        data: {"projectId": projectId},
//        dataType: 'json',
//        async: true,
//        success: function (data) {
//            var opt = "";
//            for (var i = 0; i < data.list.length; i++) {
//                opt += "<option value=" + data.list[i].projectLevelId + ">" + data.list[i].levelTitle + "</option>";
//            }
//            $("#updtprojectLevelId").html(opt);
//            $("#updtprojectLevelId").val(projectLevelId);
//        },
//        error: function (response) {
//            toastr.error("系统错误");
//        }
//    });
    $('#updtprojectType').val(projectType);
    $('#updteducationForm').val(educationForm);
    $('#updtdisabledDate').val(disabledDate);
    $('#updtendDate').val(endDate);
    $('#updtclearDate').val(clearDate);

}
$('#examinationEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var examSettingId = $('#examinationEdit').find('#updtexamSettingId').val();
        var examDate = $('#examinationEdit').find('#updtexamDate').val();
        var projectType = $('#examinationEdit').find('#updtprojectType').val();
        var educationForm = $('#examinationEdit').find('#updteducationForm').val();
        var disabledDate = $('#examinationEdit').find('#updtdisabledDate').val();
        var endDate = $('#examinationEdit').find('#updtendDate').val();
        var clearDate = $('#examinationEdit').find('#updtclearDate').val();
        var projectId = $('#examinationEdit').find('#updtprojectId').val();
        var projectLevelId = $('#examinationEdit').find('#updtprojectLevelId').val();
        $.ajax({
            url: ctx + '/bizExamSetting/updateRecord',
            data: {
                examSettingId: examSettingId,
                examDate: examDate,
                projectType: projectType,
                projectId: projectId,
                projectLevelId: projectLevelId,
                educationForm: educationForm,
                disabledDate: disabledDate,
                endDate: endDate,
                clearDate: clearDate
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status != "success") {
                    toastr.error(data.msg);
                } else {
                    $('.examinationEdit').modal('hide');
                    DataTable.init();
                }
            },
            error: function () {
                toastr.error("不能修改为重复数据");
            }
        });
        $('#examinationEdit').find('button').attr('disabled','false');
        return false;
    }
});
//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}
$('.search-btn').on('click',function(){
	   DataTable.init();
})
//全选
$('#personnelMatch thead .checkAll').on('click', function(){
    if($(this).prop('checked')){
        $('#personnelMatch tbody .checkchild').prop('checked', true);
    }else{
        $('#personnelMatch tbody .checkchild').prop('checked', false);
    }
})
