$(function(){
	//日期控件
	$('#duration').daterangepicker({
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

	$('#duration').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});

	$('#duration1').daterangepicker({
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

	$('#duration1').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});

	//多选框
	$('input:checkbox.master1').off('change')
	$('input:checkbox.master1').on('change', function(){
		console.log(4)
		if($(this).prop('checked')){
			console.log(5)
			$('input:checkbox.slaver1').prop('checked', 'checked');
		}else{
			console.log(6)
			$('input:checkbox.slaver1').prop('checked', '');
		}
	})
	$('input:checkbox.master2').off('change')
	$('input:checkbox.master2').on('change', function(){
		console.log(4)
		if($(this).prop('checked')){
			console.log(5)
			$('input:checkbox.slaver2').prop('checked', 'checked');
		}else{
			console.log(6)
			$('input:checkbox.slaver2').prop('checked', '');
		}
	})
	
	$(".search-btn").click(function(){
     	 var id = $(this).data("id");
		/*var id = $("#currentRewardOrPunish").val();
		id = id=="1"?"rewardPunishs":"punishRewards";*/
	     DataTable.init(id);
	})
})

//reward table初始化
var DataTable = function () {
    return {
        init: function (val) {
        	var viewModel = val == 'rewardPunishs' ? 'rewardView' : val == 'punishRewards' ? 'punishmentView' : 'rewardView';
            var columnsArr = [];
            if (val == 'punishRewards') {
                columnsArr = [
					{"mDataProp" : "rewardId",'sClass': "text-center","mRender": function ( data, type, full ) {
						return "<label> <input value='"+full.rewardId+"' type='checkbox' class='slaver2'> <span class='text'></span> </label>";
					  }},
                    {"mData": "sysDepartment", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data.fullName;
                    }},
                    {"mData": "sysDepartment", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data.fullName;
                    }},
                    {"mData": "rewardType", 'sClass': "text-center"},
                    {"mData": "eventDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {"mData": "submitDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {"mData": "dealDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {"mData": "sysUser", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data.realName;
                    }},
                    {"mData": "rewardMoney", 'sClass': "text-center"},
                    {"mData": "effectDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {
                        "mData": "rewardId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var r = '<a onclick="showModel(\'' + full["rewardId"]
                                + '\',\'' + full["departmentId1"]
                                + '\',\'' + full["sysDepartment.fullName"]
                                + '\',\'' + full["eventDate"]
                                + '\',\'' + full["commitDate"]
                                + '\',\'' + full["userId"]
                                + '\',\'' + full["rewardMoney"]
                                + '\',\'' + full["commndDate"]
                                + '\',\'' + full["type"]
                                + '\',\'' + full["description"]
                                + '\',\'' + full["judgments"]
                                + '\',\'' + full["remark"]
                                + '\',\'' + full["passDate"]
                                + '\',\'' + full["isSubsidy"]
                                + '\',\'' + full["subsidyPrice"]
                                + '\',\'' + viewModel + '\')" class="view" data-toggle="modal" data-backdrop="static" data-target=".' + viewModel + '"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
                            return r;
                        }
                    }
                ]
            } else {
            	//奖励表格展示
                columnsArr = [
					{"mDataProp" : "rewardId",'sClass': "text-center","mRender": function ( data, type, full ) {
						return "<label> <input value='"+full.rewardId+"' type='checkbox' class='slaver1'> <span class='text'></span> </label>";
					  }},
                    {"mData": "sysDepartment", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data.fullName;
                    }},
                    {"mData": "sysDepartment", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data.fullName;
                    }},
                    {"mData": "rewardType", 'sClass': "text-center"},
                    {"mData": "eventDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {"mData": "submitDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {"mData": "sysUser", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data.realName;
                    }},
                    {"mData": "rewardMoney", 'sClass': "text-center"},
                    {"mData": "effectDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return jsDateFormat(data);
                    }},
                    {
                        "mData": "rewardId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var r = '<a onclick="showModel(\'' + full["rewardId"]
                                + '\',\'' + full["fullName"]
                                + '\',\'' + full["fullName"]
                                + '\',\'' + full["eventDate"]
                                + '\',\'' + full["submitDate"]
                                + '\',\'' + full["sysUser"]
                                + '\',\'' + full["rewardMoney"]
                                + '\',\'' + full["effectDate"]
                                + '\',\'' + full["rewardType"]
                                + '\',\'' + full["description"]
                                + '\',\'' + full["judgments"]
                                + '\',\'' + full["remark"]
                                + '\',\'' + full["passDate"]
                                + '\',\'' + full["isSubsidy"]
                                + '\',\'' + full["subsidyPrice"]
                                + '\',\'' + viewModel + '\')" class="view" data-toggle="modal" data-backdrop="static" data-target=".' + viewModel + '"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
                            return r;
                        }
                    }
                ]
            }
            var Table = $('#' + val).dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/reward/getAll',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": columnsArr,
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }]
            });
            $('#' + val + "_wrapper").removeClass();
            $('#' + val + "_wrapper").addClass("table-scrollable");

            //每页显示记录数
            //$('#' + val + "_wrapper").find('.dataTables_info').parent().append($('.dataTables_length'));
            //横线滚动条
            $('#' + val + "_wrapper").on('scroll', function () {
                $('#' + val + "_wrapper").find('.dataTables_paginate').css('margin-right', -$(this).scrollLeft());
            })

        }
    }
}();

function showModel(rewardPunishId, departmentId1, departmentId2, eventDate, submitDate, userId, rewardMoney, commndDate, rewardType, description, judgments, remark, passDate, isSubsidy, subsidyPrice, formId) {
	var eventDate = eventDate.substring(0,10);
	var submitDate = eventDate.substring(0,10);
	var commndDate = eventDate.substring(0,10);
	var passDate = eventDate.substring(0,10);
    $("#" + formId + " input[name='rewardId']").val(rewardPunishId)
    $("#" + formId + " select[name='departmentId1']").val(departmentId1)
    $("#" + formId + " select[name='departmentId1']").trigger('chosen:updated');
    $("#" + formId + " input[name='departmentId2']").val(departmentId2);
    $("#" + formId + " input[name='eventDate']").datepicker('update', eventDate);
    $("#" + formId + " input[name='eventDate']").val(eventDate)
    $("#" + formId + " input[name='submitDate']").datepicker('update', submitDate);
    $("#" + formId + " input[name='submitDate']").val(submitDate)
    $("#" + formId + " select[name='userId']").val(userId)
    $("#" + formId + " select[name='userId']").trigger('chosen:updated');
    $("#" + formId + " input[name='rewardPunishPrice']").val(rewardMoney)
    $("#" + formId + " input[name='commndDate']").datepicker('update', commndDate);
    $("#" + formId + " input[name='commndDate']").val(commndDate)
    $("#" + formId + " select[name='rewardType']").val(rewardType)
    $("#" + formId + " select[name='rewardType']").trigger('chosen:updated');
    $("#" + formId + " textarea[name='description']").val(description=='null'?'':description)
    $("#" + formId + " textarea[name='judgments']").val(judgments=='null'?'':judgments)
    $("#" + formId + " textarea[name='remark']").val(remark=='null'?'':remark)
    if (passDate) {
        $("#" + formId + " input[name='passDate']").datepicker('update', passDate);
        $("#" + formId + " input[name='passDate']").val(passDate)
    }
    if (isSubsidy) {
        $("#" + formId + " select[name='isSubsidy']").val(isSubsidy)
        $("#" + formId + " select[name='isSubsidy']").trigger('chosen:updated');
    }
    if (subsidyPrice && subsidyPrice != 'null') {
        $("#" + formId + " input[name='subsidyPrice']").val(subsidyPrice)
    }
}

//初始化表格
$("#rewardPunishs tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#rewardPunishs tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init('rewardPunishs');

/**
 * 回车检索
 * @returns
 */
function search() {
    if (event.keyCode == 13) {
        var val = $("#currentRewardOrPunish").val();
        var id = val == '1' ? 'rewardPunishs' : val == '2' ? 'punishRewards' : 'rewardPunishs'
        DataTable.init(id);
    }
}

//初始化表格
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    var typeVal = $("#currentRewardOrPunish").val();
    var id = typeVal == '1' ? 'rewards' : typeVal == '2' ? 'punishment' : 'rewards';
    var dateRationElement = typeVal == '1' ? 'duration' : typeVal == '2' ? 'duration1' : 'duration';
    var beganAndEnd = $("#" + dateRationElement).val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = beganAndEnd.split("到")[0];
        var maxDate = beganAndEnd.split("到")[1];

        var timeTypeId = typeVal == '1' ? 'dateSearch' : typeVal == '2' ? 'dateSearch1' : 'dateSearch';

        aoData.push({"name": "timeType", "value": $("#"+timeTypeId).val()});
        aoData.push({"name": "beginTime", "value": minDate ? minDate.trim() : minDate});
        aoData.push({"name": "endTime", "value": maxDate ? maxDate.trim() : maxDate});
    }
    aoData.push({"name": "sysRewardsType", "value": Number(typeVal)})
    //这里可以设置请求的初始化数据
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var searchVal = $('#' + id + ' input.searchVal').val();

    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip()
        }
    });
}

function changeCurrent(val) {
    $("#currentRewardOrPunish").val(val);
    var id = val == '1' ? 'rewardPunishs' : val == '2' ? 'punishRewards' : 'rewardPunishs';
    $("#"+id).find("tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#"+id).find("tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
   DataTable.init(id);
}
