var DataTable = function () {
    return {
        init: function () {
            var Table = $('#consultInfos').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/change/getAll',
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
                "aoColumns": [
                    {
                        "mDataProp": "infoManageId", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return "<label> <input value='" + full.infoManageId + "," + full.departmentId2 + "' type='checkbox' class='slaver'> <span class='text'></span> </label>";
                    }
                    },
                    {
                        "mData": "createDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        return data ? formatDate(new Date(data), 'yyyy-MM-dd') : data;
                    }
                    },
                    {"mData": "departmentName2", 'sClass': "text-center"},
                    {
                        "mData": "status", 'sClass': "text-center", "mRender": function (data, type, full) {
                        var result = ''
                        switch (data) {
                            case 1:
                                result = '已创建';
                                break;
                            case 2:
                                result = '待沟通';
                                break;
                            case 3:
                                result = '已沟通';
                                break;
                            case 4:
                                result = '预约';
                                break;
                            case 5:
                                result = '上门';
                                break;
                            case 6:
                                result = '订座';
                                break;
                            case 7:
                                result = '报名';
                                break;
                        }
                        return result;
                    }
                    },
                    {"mData": "reciveName", 'sClass': "text-center"},
                    {"mData": "counselor", 'sClass': "text-center"},
                    {"mData": "studentAttrName2", 'sClass': "text-center"},
                    {"mData": "projectName", 'sClass': "text-center"},
                    {"mData": "projectLevelName", 'sClass': "text-center"},
                    /*{"mData": "projectLevelName", 'sClass': "text-center","mRender": function ( data, type, full ) {
                     var result = ''
                     switch (data) {
                     case "NULL":
                     result = '';
                     break;
                     default:
                     result = projectLevelName;
                     break;
                     }
                     return result;
                     }},*/
                    {
                        "mData": "infoManageId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = "<a onclick='changeViewModel(\"" + full['infoManageId'] + "\")' class='edit' data-toggle='modal' data-backdrop='static' data-target='.changeView' ><i class='fa fa-search warning' " +
                            		" data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
                            return u;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            });
        }
    }
}();

function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

$(function () {
	$("#consultInfos tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	$("#consultInfos tbody>tr>td").mLoading({
	    text: '正在加载中，请稍后......',
	    icon: "../statics_html/common/image/loading5.gif"
	});
	
    //初始化表格
    DataTable.init();

    //搜索
    $('.search-btn').click(function () {
        DataTable.init();
    })

    //全选
    $('#consultInfos').on('change', 'input:checkbox.master', function () {
        if ($(this).prop('checked')) {
            $('#consultInfos input:checkbox.slaver').prop('checked', true);
        } else {
            $('#consultInfos input:checkbox.slaver').prop('checked', '');
        }
    })


    //日期插件
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

    //折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().toggle();
    })
    //调整
    $("#changeDepartment").click(function () {
        if ($('#consultInfos input:checkbox.slaver:checked').length <= 0) {
            return false;
        }
        var ids = [];
        $('#consultInfos input:checkbox.slaver:checked').each(function () {
            ids.push($(this).val())
        })
        $.ajax({
            "type": "post",
            "url": ctx + '/change/changeDepartment',
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": JSON.stringify(ids),
            "success": function (resp) {
                if (resp.message == "success") {
                    DataTable.init();
                }
                $('.adjustment').modal('hide');
            }
        });
    })
});
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    var beganAndEnd = $("#duration").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = beganAndEnd.split("到")[0];
        var maxDate = beganAndEnd.split("到")[1];
        aoData.push({"name": "beginTime", "value": minDate ? minDate.trim() : minDate});
        aoData.push({"name": "endTime", "value": maxDate ? maxDate.trim() : maxDate});
    }
    var searchVal = $('.searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    //这里可以设置请求的初始化数据
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

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

function changeViewModel(infoManageId) {
    $.ajax({
        "type": "POST",
        "url": ctx + '/change/getOne/' + infoManageId,
        "dataType": "json",
        "success": function (resp) {
            $('.changeView').find('input[type="hidden"], input[type="text"], textarea').val('');
            $('#appendPayTr').hide();
            $('#dztr').hide();
            $("#consuleSchool").text(resp.departmentName1 ? resp.departmentName1 : '');
            $("#brandName").text(resp.brandName ? resp.brandName : '');
            $("#studentAttrName2").text(resp.studentAttrName2 ? resp.studentAttrName2 : '');
            $("#studentAttrName1").text(resp.studentAttrName1 ? resp.studentAttrName1 : '');
            $("#StudentAttrName3").text(resp.StudentAttrName3 ? resp.StudentAttrName3 : '');
            
            //$("#studentMaturity").text(resp.studentMaturity?resp.studentMaturity:'');
            if (resp.studentMaturity != '') {
                if (resp.studentMaturity == '1') {
                    $("#studentMaturity").text('A类')
                } else if (resp.studentMaturity == '2') {
                    $("#studentMaturity").text('B类')
                } else if (resp.studentMaturity == '3') {
                    $("#studentMaturity").text('C类')
                } else {
                    $("#studentMaturity").text('D类')

                }
            }


            /*for (var key of Object.keys(resp)) {
             if(resp[key] && resp[key]!='NULL') {
             if(key=='age') {
             *有重复id特殊处理
             $("#age2").val(resp[key])
             }
             $("input#" + key).val(resp[key])
             }
             }*/
            for (var key in resp) {
                if (resp[key] && resp[key] != 'NULL') {
                    /*if(key=='age') {
                     *有重复id特殊处理
                     $("#age2").val(resp[key])
                     }*/
                    $("input#" + key).val(resp[key])
                }
            }
            $('#studentSex').val(resp.studentSex);
            $('#examDate').val(resp.examDate);
            $('#projectType').val(resp.projectType);
            $('#eduFrom').val(resp.eduFrom);
            $('#zxjl').html('<tr><td>' + resp.conversation + '</td></tr>');
            $("#notes").text(resp.notes);
            $('#recordContent').html('<tr><td>' + resp.recordContent + '</td></tr>');

        }
    });
}
