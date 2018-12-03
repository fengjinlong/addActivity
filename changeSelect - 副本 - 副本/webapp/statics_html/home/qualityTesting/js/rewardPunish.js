var DataTable = function () {
    return {
        init: function (val) {
            var viewModel = val == 'rewardPunishs' ? 'rewardView' : val == 'punishRewards' ? 'punishmentView' : 'rewardView';
            var editModel = val == 'rewardPunishs' ? 'rewardEdit' : val == 'punishRewards' ? 'punishmentEdit' : 'rewardEdit'
            var columnsArr = [];
            if (val == 'punishRewards') {
                columnsArr = [
                    {
                        "mData": "rewardPunishId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            return '<label  class="labletab" style="padding-top: 0px"> <input value="'+data+'" name="rewardPunishIds" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
                        
                        }
                    },
                    {"mData": "companyName", "bSortable": false,'sClass': "text-center"},
                    {"mData": "departName","bSortable": false, 'sClass': "text-center",'mRender': function(data, type, full){
                    		return data ? data : '----';
                    	}
                    },
                    {"mData": "sortName", "bSortable": false,'sClass': "text-center"},
                    {
                        "mData": "eventDate", "bSortable": false,'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {
                        "mData": "commitDate","bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {
                        "mData": "passDate","bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {"mData": "userName","bSortable": false, 'sClass': "text-center"},
                    {"mData": "rewardPunishPrice","bSortable": false, 'sClass': "text-center"},
                    {
                        "mData": "commndDate", "bSortable": false,'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {
                        "mData": "enable",
                        'sClass': "text-center enable",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 0) {
                                return '<span id="span' + full["rewardPunishId"] + '" onclick="chooseRewardAndPunishStatus(\'' + full["rewardPunishId"] + '\',\'' + val + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 废除</span>';
                            } else {
                                return '<span id="span' + full["rewardPunishId"] + '" onclick="chooseRewardAndPunishStatus(\'' + full["rewardPunishId"] + '\',\'' + val + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 生效</span>';
                            }
                        }
                    },
                    {
                        "mData": "rewardPunishId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var r = '<a onclick="showModel(\'' + full["rewardPunishId"]
                                + '\',\'' + full["departmentId1"]
                                + '\',\'' + full["departmentId2"]
                                + '\',\'' + full["eventDate"]
                                + '\',\'' + full["commitDate"]
                                + '\',\'' + full["userId"]
                                + '\',\'' + full["rewardPunishPrice"]
                                + '\',\'' + full["commndDate"]
                                + '\',\'' + full["rpSortId"]
                            	+ '\',\'' + full["quality"]
                                + '\',\'' + full["description"]
                                + '\',\'' + full["judgments"]
                                + '\',\'' + full["remark"]
                                + '\',\'' + full["passDate"]
                                + '\',\'' + viewModel + '\')" class="btn btn-warning btn-xs view" data-toggle="modal" data-backdrop="static" data-target=".' + viewModel + '"><i class="fa fa-folder-open-o"></i> 查看</a>';
                            var u = '<a onclick="showModel(\'' + full["rewardPunishId"]
                                + '\',\'' + full["departmentId1"]
                                + '\',\'' + full["departmentId2"]
                                + '\',\'' + full["eventDate"]
                                + '\',\'' + full["commitDate"]
                                + '\',\'' + full["userId"]
                                + '\',\'' + full["rewardPunishPrice"]
                                + '\',\'' + full["commndDate"]
                                + '\',\'' + full["rpSortId"]
                        		+ '\',\'' + full["quality"]
                                + '\',\'' + full["description"]
                                + '\',\'' + full["judgments"]
                                + '\',\'' + full["remark"]
                                + '\',\'' + full["passDate"]
                                + '\',\'' + editModel + '\')" class="btn btn-info btn-xs" data-target=".' + editModel + '" data-toggle="modal" data-backdrop="static" ' + (full.enable == 0 ? "disabled" : "") + '><i class="fa fa-edit"></i>编辑</a>';
                            return r + u;
                        }
                    }
                ]
            } else {
                columnsArr = [
					{
					    "mData": "rewardPunishId",
					    'sClass': "text-center",
					    "bSortable": false,
					    "mRender": function (data, type, full) {
					        return '<label  class="labletab" style="padding-top: 0px"> <input value="'+data+'" name="rewardPunishIds" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
					    }
					},
                    {"mData": "companyName", "bSortable": false,'sClass': "text-center"},
                    {"mData": "departName", "bSortable": false,'sClass': "text-center"},
                    {"mData": "sortName", "bSortable": false,'sClass': "text-center"},
                    {
                        "mData": "eventDate", "bSortable": false,'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {
                        "mData": "commitDate", "bSortable": false,'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {"mData": "userName", "bSortable": false,'sClass': "text-center"},
                    {"mData": "rewardPunishPrice","bSortable": false, 'sClass': "text-center"},
                    {
                        "mData": "commndDate","bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {
                        "mData": "enable",
                        'sClass': "text-center enable",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 0) {
                                return '<span id="span' + full["rewardPunishId"] + '" onclick="chooseRewardAndPunishStatus(\'' + full["rewardPunishId"] + '\',\'' + val + '\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 废除</span>';
                            } else {
                                return '<span id="span' + full["rewardPunishId"] + '" onclick="chooseRewardAndPunishStatus(\'' + full["rewardPunishId"] + '\',\'' + val + '\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 生效</span>';
                            }
                        }
                    },
                    {
                        "mData": "rewardPunishId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var r = '<a onclick="showModel(\'' + full["rewardPunishId"]
                                + '\',\'' + full["departmentId1"]
                                + '\',\'' + full["departmentId2"]
                                + '\',\'' + full["eventDate"]
                                + '\',\'' + full["commitDate"]
                                + '\',\'' + full["userId"]
                                + '\',\'' + full["rewardPunishPrice"]
                                + '\',\'' + full["commndDate"]
                                + '\',\'' + full["rpSortId"]
                        		+ '\',\'' + full["quality"]
                                + '\',\'' + full["description"]
                                + '\',\'' + full["judgments"]
                                + '\',\'' + full["remark"]
                                + '\',\'' + full["passDate"]
                                + '\',\'' + viewModel + '\')" class="btn btn-warning btn-xs view" data-toggle="modal" data-backdrop="static" data-target=".' + viewModel + '"><i class="fa fa-folder-open-o"></i> 查看</a>';
                            var u = '<a onclick="showModel(\'' + full["rewardPunishId"]
                                + '\',\'' + full["departmentId1"]
                                + '\',\'' + full["departmentId2"]
                                + '\',\'' + full["eventDate"]
                                + '\',\'' + full["commitDate"]
                                + '\',\'' + full["userId"]
                                + '\',\'' + full["rewardPunishPrice"]
                                + '\',\'' + full["commndDate"]
                                + '\',\'' + full["rpSortId"]
                        		+ '\',\'' + full["quality"]
                                + '\',\'' + full["description"]
                                + '\',\'' + full["judgments"]
                                + '\',\'' + full["remark"]
                                + '\',\'' + full["passDate"]
                                + '\',\'' + editModel + '\')" class="btn btn-info btn-xs edit" data-target=".' + editModel + '" data-toggle="modal" data-backdrop="static" ' + (full.enable == 0 ? "disabled" : "") + '><i class="fa fa-edit"></i>编辑</a>';
                            return r + u;
                        }
                    }
                ]
            }
            var Table = $('#' + val).dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/rewardPunish/load',
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
                }],
            });
            $('#' + val + "_wrapper").removeClass();
            $('#' + val + "_wrapper").addClass("table-scrollable");
            if(val == 'rewardPunishs'){
            	$("#rewardPunishs_wrapper").find('.dataTables_info').parent().append($('.dataTables_length'));
            	$("#rewardPunishs_wrapper").find('.dataTables_length:not(:first)').remove();
            }else{
            	$("#punishRewards_wrapper").find('.dataTables_info').parent().append($('.dataTables_length'));
            	$("#punishRewards_wrapper").find('.dataTables_length:not(:first)').remove();
            }

            //横线滚动条
            $('#' + val + "_wrapper").on('scroll', function () {
                $('#' + val + "_wrapper").find('.dataTables_paginate').css('margin-right', -$(this).scrollLeft());
            })
        }
    }
}();
$(function () {
	
    //日期插件
    $('.duration').daterangepicker({
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

    $('.duration').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    
    //状态切换
    $('table tbody').on('click', '.status-btn', function () {
        if ($(this).hasClass('btn-use')) {
            $(this).removeClass('btn-use').addClass('btn-nouse');
            $(this).html('<i class="fa fa-ban"></i> 废除');
        } else {
            $(this).removeClass('btn-nouse').addClass('btn-use');
            $(this).html('<i class="fa fa-check-square-o"></i> 生效');
        }
    })
    //奖励全选
      $('#rewardPunishs thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#rewardPunishs tbody .checkchild').prop('checked', true);
        }else{
            $('#rewardPunishs tbody .checkchild').prop('checked', false);
        }
    })
    //惩罚全选
      $('#punishRewards thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#punishRewards tbody .checkchild').prop('checked', true);
        }else{
            $('#punishRewards tbody .checkchild').prop('checked', false);
        }
    })
    
    //日期
    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });

    //id要变化'#rewardAdd'
    $(document).on('click', '#rewardAddButton',function(){
    	 popupWindow('#rewardAdd');
    });
    $(document).on('click', '#punishmentAddButton', function(){
    	popupWindow('#punishmentAdd');
    });
   
    //初始化表格
    $("#rewardPunishs tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#rewardPunishs tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init('rewardPunishs');
        
    //搜索按钮绑定事件
    $('.search-btn').click(function () {
        var id = $(this).data("id");
        DataTable.init(id);
    })
  
  /*  //归属分校级联归属部门
    $("select[name='departmentId1']").change(function (event, fnback) {
        var rewardPunishId = $(this).val();
        var that = $(this);
        $.ajax({
            url: ctx + '/rewardPunish/getAllOptionByrewardPunishId',
            type: 'POST',
            data: {rewardPunishId: rewardPunishId},
            dataType: 'json',
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.length; i++) {
                    opt += "<option value=" + data[i].rewardPunishId + ">" + data[i].fullName + "</option>";
                }
                var element = that.parents("form").find("select[name='rewardPunishId2']");
                element.html('<option value="">--请选择--</option>' + opt);
                element.trigger('chosen:updated');
                element.chosen({no_results_text: "没有匹配项"});
                $('.chosen-container').width('100%');
                if (typeof fnback == 'function') {
                    fnback();
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    })*/
    $(document).on('input porpertychange', '.verify-num', function(){
    	var num = $(this).val();
    	var rg = /^[1-9]{1}\d*$/;
    	if (num.match(rg) == null) {
    		toastr.error('金额格式不正确');
		}
    })
    
    //奖励(惩罚)新增的表单保存（联系市场消费数据页面）
    $(".reward-add").click(function () {
    	var rpp = $(this).parents('form').find('input[name="rewardPunishPrice"]').val();
    	var reg = /^[1-9]{1}\d*$/;
    	if (rpp.match(reg) == null) {
			toastr.error('金额格式不正确');
			return;
		}
        // 要让每个表单元素的name和java实体类的字段对应
        jquerySubByFId("rewardAdd", function (data) {
            if (data.status == "success") {
                $('.rewardAdd').modal('hide');
                DataTable.init('rewardPunishs');
            }
        }, null, null);
    })

    $(".reward-edit").click(function () {
    	var rpp = $(this).parents('form').find('input[name="rewardPunishPrice"]').val();
    	var reg = /^[1-9]{1}\d*$/;
    	if (rpp.match(reg) == null) {
			toastr.error('金额格式不正确');
			return;
		}
        // 要让每个表单元素的name和java实体类的字段对应
        jquerySubByFId("rewardEdit", function (data) {
            if (data.status == "success") {
                $('.rewardEdit').modal('hide');
                DataTable.init('rewardPunishs');
            }
        }, null, null);
    })

    $(".punishment-add").click(function () {
    	var rpp = $(this).parents('form').find('input[name="rewardPunishPrice"]').val();
    	var reg = /^[1-9]{1}\d*$/;
    	if (rpp.match(reg) == null) {
			toastr.error('金额格式不正确');
			return;
		}
        // 要让每个表单元素的name和java实体类的字段对应
        jquerySubByFId("punishmentAdd", function (data) {
            if (data.status == "success") {
                $('.punishmentAdd').modal('hide');
                DataTable.init('punishRewards');
            }
        }, null, null);
    })

    $(".punishment-edit").click(function () {
    	var rpp = $(this).parents('form').find('input[name="rewardPunishPrice"]').val();
    	var reg = /^[1-9]{1}\d*$/;
    	if (rpp.match(reg) == null) {
			toastr.error('金额格式不正确');
			return;
		}
        // 要让每个表单元素的name和java实体类的字段对应
        jquerySubByFId("punishmentEdit", function (data) {
            if (data.status == "success") {
                $('.punishmentEdit').modal('hide');
                DataTable.init('punishRewards');
            }
        }, null, null);
    })

    //取消下拉框option空格
    for (var i = 0; i < $('.chosen-results li').length; i++) {
        $.trim($('.chosen-results li')[i].html());
    }
})

/**
 * 公司初始化
 * @param formId
 * @returns
 */
var _comp = [];
function comIni(formId){
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/department/getAllOption',
		'data' : {'type':3},
		'dataType' : 'json',
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				_comp = info.list;
			} else {
				toastr.error('公司数据获取错误');
			}
		}
	})
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/department/getAllOption',
		'data' : {'type':1},
		'dataType' : 'json',
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				$.each(info.list,function(i,val){
					_comp.push(val);
				});
			} else {
				toastr.error('公司数据获取错误');
			}
		}
	})
	var opt = '<option value="">--请选择--</option>';
	for (var i = 0; i < _comp.length; i++) {
		opt += '<option value="' + _comp[i].departmentId + '">'+ _comp[i].fullName +'</option>';
	}
	$(formId).find('select[name="departmentId1"]').html(opt);
	$(formId).find('select[name="departmentId1"]').trigger('chosen:updated');
	$(formId).find('select[name="departmentId1"]').chosen();
}
/**
 *   奖励类别初始化
 * @param formId
 * @returns
 */
function sortTIni(formId){
	var typeVal = $("#currentRewardOrPunish").val();
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/rewardPunishSort/getAll',
		'dataType' : 'json',
		'async' : false,
		'data' : {'type' : typeVal},
		'success' : function(info){
			if (info.status == 'success') {
				var opt = '<option value="">--请选择--</option>';
				for (var i = 0; i < info.data.length; i++) {
					opt += '<option value="' + info.data[i].rewardPunishSortId + '">'+ info.data[i].sortName +'</option>';
				}
				$(formId).find('select[name="rpSortId"]').html(opt);
				$(formId).find('select[name="rpSortId"]').trigger('chosen:updated');
				$(formId).find('select[name="rpSortId"]').chosen();
			} else {
				toastr.error('类别数据获取错误');
			}
		}
	})
}

 /**
   * 弹窗select下拉框公共关联
   * @param formId
   * @returns
   */
function popupWindow(formId){
    //每次新增前，清空modal
    $(formId).find('input[type="hidden"], input[type="text"], select, textarea').val('');
    $(formId).find('select').trigger('chosen:updated');
    $(formId).find('select').chosen();
    $(formId)[0].reset();
    // 公司初始化
    comIni(formId);
    // 奖励类别初始化
    sortTIni(formId);
//    $(formId+' select').trigger('chosen:updated');
}

$('select[name="departmentId1"]').on('change',function(){
	var compId = $(this).val();
	var $jDep2 = $(this);
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/department/getAllOption',
		'data' : {'type':2, 'fullPath':compId},
		'dataType' : 'json',
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				var opt = '<option value="">--请选择--</option>';
				for (var i = 0; i < info.list.length; i++) {
					opt += '<option value="' + info.list[i].departmentId + '">'+ info.list[i].fullName +'</option>';
				}
				$jDep2.parents('form').find('select[name="departmentId2"]').html(opt);
				$jDep2.parents('form').find('select[name="departmentId2"]').trigger('chosen:updated');
				$jDep2.parents('form').find('select[name="departmentId2"]').chosen();
			}
		}
	})
})

$('select[name="departmentId2"]').on('change',function(){
	var depId = $(this).val();
	var $jD = $(this);
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/rewardPunish/getUsers',
		'data' : {'departmentId' : depId},
		'dataType' : 'json',
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				var opt = '<option value="">--请选择--</option>';
				for (var i = 0; i < info.data.length; i++) {
					opt += '<option value="' + info.data[i].userId + '">'+ info.data[i].realName +'</option>';
				}
				$jD.parents('form').find('select[name="userId"]').html(opt);
				$jD.parents('form').find('select[name="userId"]').trigger('chosen:updated');
				$jD.parents('form').find('select[name="userId"]').chosen();
			}
		}
	})
})

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    var typeVal = $("#currentRewardOrPunish").val();
    var id = typeVal == '1' ? 'rewards' : typeVal == '2' ? 'punishment' : 'rewards';
    var dateRationElement = typeVal == '1' ? 'duration' : typeVal == '2' ? 'duration1' : 'duration';
    var beganAndEnd = $("#" + dateRationElement).val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = beganAndEnd.split("到")[0];
        var maxDate = beganAndEnd.split("到")[1];

//        var timeTypeId = typeVal == '1' ? 'dateSearch' : typeVal == '2' ? 'dateSearch1' : 'dateSearch';

//        aoData.push({"name": "timeType", "value": $("#" + timeTypeId).val()});
        aoData.push({"name": "beginTime", "value":minDate.trim()});
        aoData.push({"name": "endTime", "value": maxDate.trim()});
    }
    aoData.push({"name": "sortType", "value": Number(typeVal)})
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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
//修改奖惩管理状态
function chooseRewardAndPunishStatus(val, id) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/rewardPunish/update',
        type: 'POST',
        data: {
            rewardPunishId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init(id);
        }
    });
}
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
function showModel(rewardPunishId, departmentId1, departmentId2, eventDate, commitDate, userId, 
		rewardPunishPrice, commndDate, rpSortId, quality, description, judgments, remark, passDate, formId) {
    eventDate = eventDate ? formatDate(new Date(Number(eventDate)), 'yyyy-MM-dd') : eventDate;
    commitDate = commitDate ? formatDate(new Date(Number(commitDate)), 'yyyy-MM-dd') : commitDate;
    commndDate = commndDate ? formatDate(new Date(Number(commndDate)), 'yyyy-MM-dd') : commndDate;
    passDate = passDate ? formatDate(new Date(Number(passDate)), 'yyyy-MM-dd') : passDate;
    $("#" + formId + " input[name='rewardPunishId']").val(rewardPunishId);
    comIni("#" + formId);
    $("#" + formId + " select[name='departmentId1']").val(departmentId1);
    $("#" + formId + " select[name='departmentId1']").trigger('chosen:updated');
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/department/getAllOption',
		'data' : {'type':2, 'fullPath':departmentId1},
		'dataType' : 'json',
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				var opt = '<option value="">--请选择--</option>';
				for (var i = 0; i < info.list.length; i++) {
					opt += '<option value="' + info.list[i].departmentId + '">'+ info.list[i].fullName +'</option>';
				}
				$("#" + formId + " select[name='departmentId2']").html(opt);
				$("#" + formId + " select[name='departmentId2']").trigger('chosen:updated');
				$("#" + formId + " select[name='departmentId2']").chosen();
			}
		}
	})
    $("#" + formId + " select[name='departmentId2']").val(departmentId2);
    $("#" + formId + " select[name='departmentId2']").trigger('chosen:updated');
    $.ajax({
		'type' : 'post',
		'url' : ctx + '/rewardPunish/getUsers',
		'data' : {'departmentId' : departmentId2},
		'dataType' : 'json',
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				var opt = '<option value="">--请选择--</option>';
				for (var i = 0; i < info.data.length; i++) {
					opt += '<option value="' + info.data[i].userId + '">'+ info.data[i].realName +'</option>';
				}
				$("#" + formId + " select[name='userId']").html(opt);
				$("#" + formId + " select[name='userId']").trigger('chosen:updated');
				$("#" + formId + " select[name='userId']").chosen();
			}
		}
	})
    $("#" + formId + " input[name='eventDate']").datepicker('update', eventDate);
    $("#" + formId + " input[name='eventDate']").val(eventDate);
    $("#" + formId + " input[name='commitDate']").datepicker('update', commitDate);
    $("#" + formId + " input[name='commitDate']").val(commitDate);
    $("#" + formId + " select[name='userId']").val(userId);
    $("#" + formId + " select[name='userId']").trigger('chosen:updated');
    $("#" + formId + " input[name='rewardPunishPrice']").val(rewardPunishPrice);
    $("#" + formId + " input[name='commndDate']").datepicker('update', commndDate);
    $("#" + formId + " input[name='commndDate']").val(commndDate);
    sortTIni("#" + formId);
    $("#" + formId + " select[name='rpSortId']").val(rpSortId);
    $("#" + formId + " select[name='rpSortId']").trigger('chosen:updated');
    $("#" + formId + " textarea[name='quality']").val(quality);
    $("#" + formId + " textarea[name='description']").val(description);
    $("#" + formId + " textarea[name='judgments']").val(judgments);
    $("#" + formId + " textarea[name='remark']").val(remark);
    if (passDate) {
        $("#" + formId + " input[name='passDate']").datepicker('update', passDate);
        $("#" + formId + " input[name='passDate']").val(passDate);
    }
}
function changeCurrent(val) {
    $("#currentRewardOrPunish").val(val);
    var id = val == '1' ? 'rewardPunishs' : val == '2' ? 'punishRewards' : 'rewardPunishs'    

    DataTable.init(id);
}


////导出excel文件
//function exportExcel(type) {
//	var chk_value =[]; 
//	$('input[name="rewardPunishIds"]:checked').each(function(){ 
//		chk_value.push($(this).val()); 
//	}); 
//	if(chk_value == null || chk_value.length == 0){
//	        toastr.error("请勾选导出数据");
//	        return false;
//	}
//	window.location.href = ctx + "/rewardPunish/downloadExcel/"+type+"?rewardPunishIds="+chk_value;
//}
//
////导出PDF文件
//function exportPDF(type) {
//	var chk_value =[]; 
//	$('input[name="rewardPunishIds"]:checked').each(function(){ 
//	chk_value.push($(this).val()); 
//	}); 
//	if(chk_value == null || chk_value.length == 0){
//	        toastr.error("请勾选导出数据");
//	        return false;
//	}
//	window.location.href = ctx + "/consultDistributeCenter/exportPDF/"+type+"?rewardPunishIds="+chk_value;
//}
//
////导出CSV文件
//function exportCSV(type) {
//	var chk_value =[]; 
//	$('input[name="rewardPunishIds"]:checked').each(function(){ 
//	chk_value.push($(this).val()); 
//	}); 
//	if(chk_value == null || chk_value.length == 0){
//	        toastr.error("请勾选导出数据");
//	        return false;
//	}
//	window.location.href = ctx + "/consultDistributeCenter/exportCSV/"+type+"?rewardPunishIds="+chk_value;
//}