//日期(时分秒)
$(".form_datetime").jeDate({
    format: 'YYYY-MM-DD hh:mm:ss'
});
//下拉框单选
$('.chosen-select').chosen();
$(function () {
	//初始化数据
    $("#init tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#init tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    initDate();
    showDept();
    showProject();
    showPCostclass();
})

/**
 * 回车检索
 * @returns
 */
function search() {
    if (event.keyCode == 13) {
        toSearch();
    }
}
function toSearch() {
    init();
}
/**
 * 初始化时间控件
 * @returns
 */
function initDate() {
    $("#reservation").daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        },
        ranges: {
            '今天': [moment().startOf('day'), moment()],
            '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
            '本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
            '上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
            '本月': [moment().startOf("month"), moment().endOf("month")],
            '上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()]
        },
        applyClass: 'btn-primary',
        alwaysShowCalendars: true,
        autoclose: true,
        autoUpdateInput: false,
        showDropdowns: true
    });
    $("#reservation").on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
}

$(document).on('click', '#add', function () {
    $('#addForm').find('input[type="hidden"], input[type="text"], select').val('');//每次新增前，清空modal
    editor.html('');
    $('#myModel').modal('show');
});
//新增
function validateForm() {
	$('#myModel').modal('hide');
    $.ajax({
        url: ctx + '/financeGeneral/add',
        type: 'POST',
        data: $('#addForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                init();
                swal('',"新增成功",'success');
            } else {
            	swal('',"新增失败",'error');
            }
        },
        error: function (response) {
            alert("系统错误");
        }
    });
    return false;
}
//编辑
function editValidateForm() {
	$('#checkModal').modal('hide');
	$('#content2').val(editor2.html())
	$('#memo2').val(editor3.html());
    $.ajax({
        url: ctx + '/financeGeneral/updateRecord',
        type: 'POST',
        data: $('#editForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
            	swal('',"编辑成功",'success');
                init();
            } else {
            	swal('',"编辑失败",'error');
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
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation").val().split(" 到 ") == '' ? "" : $("#reservation").val().split(" 到 ")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation").val().split(" 到 ") == '' ? "" : $("#reservation").val().split(" 到 ")[1] + " 23:59:59"
    });
    aoData.push({"name": "searchVal", "value": $("#searchVal").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            initTotalIncome();
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
/**
 * 初始化数据
 * @returns
 */
function init() {
    var init = $('#init').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        //"iDisplayLength": 10,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/financeGeneral/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "bStateSave": true,
        "fnServerData": retrieveData,
        "aoColumns": [
            {
                "mDataProp": "generalId", 'sClass': "text-center", "mRender": function (data, type, full) {
                return "<label> <input type='checkbox' class='slaver'> <span class='text'></span> </label>";
            }},
            {"mDataProp": "payDate", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return full['payDate'];
            }},
            {"mDataProp": "payOrg", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return full['deptName'];
            }
            },
            {"mDataProp": "pcostName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "costName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "incomeDetail", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "money", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a  data-record=\'' + JSON.stringify(full) + '\' data-type="1" class="check"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>' +
                    '<a data-record=\'' + JSON.stringify(full) + '\' data-type="2" class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>' +
                    '<a data-id=\'' + full['generalId'] + '\' class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    //每页显示记录数
    $('.dataTables_info').parent().append($('.dataTables_length'));
}

/**
 * 查看和编辑
 */
$("#init").on('click', '.check,.edit', function () {
    var record = $(this).data('record');
    var type = $(this).data('type');
    if (type == 1) {
        $("#checkModal").find(".widget-caption").text("查看");
        $("#checkModal").find(".modal-footer").hide();
        $('#checkModal').find('input[type="hidden"], input[type="text"], select').attr("disabled",true);
        editor2.readonly(true);
        editor3.readonly(true);
    } else if (type == 2) {
        $("#checkModal").find(".widget-caption").text("编辑");
        $("#checkModal").find(".modal-footer").show();
        $('#checkModal').find('input[type="hidden"], input[type="text"], select').removeAttr("disabled");
        $("#company").attr("disabled", "disabled");
        $('.chosen-select').trigger('chosen:updated');
        $('.chosne-select').chosen();
        editor2.readonly(false);
        editor3.readonly(false);
    }
    $("#checkModal").modal('show');
    $("#checkModal").find("[name='generalId']").val(record.generalId);
    $("#checkModal").find("[name='payOrg']").val(record.payOrg);
    $("#checkModal").find("[name='payDate']").val(record.payDate);
    $("#collectionDepartmentId2").val(record.collectionDepartment);
    $("#collectionDepartmentId2").trigger("chosen:updated");
    $("#checkModal").find("[name='money']").val(record.money);
    $("#checkModal").find("[name='payment']").val(record.payment);
    $("#checkModal").find("[name='payment']").trigger("chosen:updated");
    $("#productId2").val(record.productId);
    $("#productId2").trigger("chosen:updated");
    
    $("#pCostclassId2").val(record.pCostclassId);
    $("#pCostclassId2").trigger("chosen:updated");
    loadCostclassId(record.pCostclassId,2);
    setTimeout(() => {
    	$("#costclassId2").val(record.costclassId);
        $("#costclassId2").trigger("chosen:updated");
	}, 500);
    
    $("#checkModal").find("[name='incomeType']").val(record.incomeType);
    $("#checkModal").find("[name='incomeType']").trigger("chosen:updated");
    
    $("#checkModal").find("[name='incomeDetail']").val(record.incomeDetail);
    
    editor2.html(record.content);
    editor3.html(record.memo);
})

/**
 * 点击新增
 */
$("#add").on('click', function () {
	$('#addForm [name="payOrg"]').val("");
	
	$('#addForm [name="payDate"]').val("");
	
	$('#addForm [name="money"]').val("");
	
	$('#addForm [name="incomeDetail"]').val("");
	
	$('#addForm [name="collectionDepartment"]').val("");
	$('#addForm [name="collectionDepartment"]').trigger("chosen:updated");
	
	$('#addForm [name="payment"]').val("");
	
	$('#addForm [name="incomeType"]').val("");
	
	$('#addForm [name="pCostclassId"]').val("");
	$('#addForm [name="pCostclassId"]').trigger("chosen:updated");
	
	$('#addForm [name="costclassId"]').val("");
	$('#addForm [name="costclassId"]').trigger("chosen:updated");
	
	editor.html("");
	editor1.html("");
	
	$("#myModel").modal('show');
})


/**
 * 删除操作
 * @param val
 * @returns
 */
$("#init").on('click', '.delete', function () {
    var generalId = $(this).data('id');
    swal({
        title: "",
        text: "确定要删除吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: ctx + '/financeGeneral/deleteRecord',
            type: 'POST',
            data: {
                generalId: generalId,
                enable:0,
                deleteMark:0,
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    init();
                }else{
                	swal("", "删除失败！", "error");
                }
            }
        });
    });
})

/**
 * 计算合计
 */
function initTotalIncome() {
	var beginTime=$("#reservation").val().split(" 到 ") == '' ? "" : $("#reservation").val().split(" 到 ")[0] + " 00:00:00";
	var endTime=$("#reservation").val().split(" 到 ") == '' ? "" : $("#reservation").val().split(" 到 ")[1] + " 23:59:59";
	var searchVal=$("#searchVal").val();
    $.ajax({
        url: ctx + '/financeGeneral/loadSum',
        data: {"beginTime": beginTime, "endTime": endTime, "searchVal": searchVal},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status=='success') {
                var html = '<tr class="odd">' +
                    '<td class="text-center"> <input type="checkbox" class="slaver"> <span class="text"></span> </td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center red">合计:</td>' +
                    '<td class="text-center">' + data.data + '</td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';
                $("#init").find("tbody").prepend(html);
            }else{
            	swal("", "合计统计失败！", "error");
            }
        }
    });
}

/**
 * 显示部门
 */
function showDept() {
    $.ajax({
        url: ctx + '/financeGeneral/showDept',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		var html = '';
                $(data.data).each(function (i, n) {
                    html += '<option value="' + n.departmentId + '">' + n.fullName + '</option>';
                })
                $("#collectionDepartmentId").append('<option value="" selected>--请选择--</option>');
                $("#collectionDepartmentId").append(html);
                $("#collectionDepartmentId2").append(html);
                $("#collectionDepartmentId").trigger("chosen:updated");
        	}else{
        		swal('',"部门加载失败",'error');
        	}
        }
    });
}

/**
 * 显示项目
 */
function showProject() {
    $.ajax({
        url: ctx + '/product/selectAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		var html = '<option value="" selected>--请选择--</option>';
                $(data.list).each(function (i, n) {
                    html += '<option value="' + n.productId + '">' + n.productName + '</option>';
                })
                $("#productId").append(html);
        	 	$("#productId").trigger("chosen:updated");
                $("#productId2").html(html);
                $("#productId2").trigger("chosen:updated");
        	}else{
        		swal('',"产品加载失败",'error');
        	}
        }
    });
}

/**
 * 显示一级费用分类
 */
function showPCostclass() {
    $.ajax({
        url: ctx + '/financeGeneral/showPCostclass',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		 var html = "";
                 $(data.data).each(function (i, n) {
                     html += '<option value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
                 })
                 $("#pCostclassId").append('<option value="" selected>--请选择--</option>');
                 $("#pCostclassId").append(html);
                 $("#pCostclassId").trigger("chosen:updated");
                 $("#pCostclassId2").append(html);
        	}else{
        		swal('',"一级费用分类加载失败",'error');
        	}
        }
    });
}

/**
 * 显示二级费用分类
 */
$("#pCostclassId").change(function() {
	var _this=this;
	var id=$(_this).val();
	loadCostclassId(id,1);
})

$("#pCostclassId2").change(function() {
	var _this=this;
	var id=$(_this).val();
	loadCostclassId(id,2);
})

function loadCostclassId(id,num){
	$.ajax({
        url: ctx + '/financeGeneral/showCostclass',
        data: {parentId: id},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
                var html = "";
                $(data.data).each(function (i, n) {
                    html += '<option value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
                })
                if(num==1){
                	$("#costclassId").html(html);
                    $("#costclassId").trigger("chosen:updated");
                }else{
                	 $("#costclassId2").html(html);
                     $("#costclassId2").trigger("chosen:updated");
                }
            }else{
            	swal('',"联动错误",'error');
            }
        }
    });
}


