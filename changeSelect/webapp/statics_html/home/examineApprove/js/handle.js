(function () {
    //日期
    $('#queryDate').daterangepicker({
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
    $('#queryDate').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });


    var userId = $('#userInfo input[name=userId]').val();
    var dutyId = $('#userInfo input[name=dutyId]').val();
    var applicantStatus = null;
    var turnoverType = null;
    //切换按钮
    $('.state-btn a').on('click', function () {
        $(this).addClass('state-active').siblings().removeClass('state-active');
        var selectId = $(this).attr('id');
        if (selectId == 'handleAll') {
            applicantStatus = null;
            turnoverType = null;
        } else if (selectId == 'handleComplete') {
            applicantStatus = '3';
            turnoverType = null;
        } else if (selectId == 'handleApproving') {
            applicantStatus = '0';
            turnoverType = null;
        } else if (selectId == 'handleBack') {
        	applicantStatus = null;
        	turnoverType = 3;// 驳回单换条件
        }
        
        $("#handleTableInit").mLoading({
            text: '正在加载中，请稍后......',
            icon: "../statics_html/common/image/loading5.gif"
        });
        $('#handleTableInit .mloading-mask').css({
            'top':'35px',
            'background-color':'rgba(233, 233, 232, 0.5)'
        });
        DataTable.init();
        $("#handleTableInit").mLoading('hide');
        return false;
    });

    //加载表单
    DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#handleTableInit').dataTable({
                    "bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
                    "bLengthChange": true,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": false, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/handle/selectAllByWhere',
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
                        {"mData": "applicantDate", 'sClass': "text-center"},
                        {"mData": "departmentName", 'sClass': "text-center"},
                        {"mData": "applicantName", 'sClass': "text-center"},
                        {"mData": "pCostClassName", 'sClass': "text-center"},
                        {"mData": "costClassName", 'sClass': "text-center"},
                        {"mData": "expendDetail", 'sClass': "text-center"},
                        {"mData": "money", 'sClass': "text-center"},
                        {"mData": "paymentFrom", 'sClass': "text-center"},
                        {
                            "mData": "applyId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                var u = "<a data-record='" + JSON.stringify(full) + "' class='view'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
                                return u;
                            }
                        }

                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(7)', nRow).html(aData.paymentFrom == '1' ? '集团支付' : '分校支付');
                        return nRow;
                    }
                });
                //每页显示记录数
                $('.dataTables_info').parent().append($('.dataTables_length'));
            }
        }
    }();
    
    //数据初始化
    $("#handleTableInit tbody").html("<tr><td height='300' colspan='9' class='text-center'></td></tr>");
    $("#handleTableInit tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init();
    var queryStr = "";
    $('#handleTableInit').on('click', '.view', function () {
        var data = $(this).attr('data-record');
        data = JSON.parse(data);
        
        if ($(this).hasClass('view')) {
            loadHtml('/handleCheck/index?ishandle=1&applyId=' + data.applyId);
        }
    });

    /**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function retrieveData(sSource, aoData, fnCallback, oSettings) {
        var beganAndEnd = $("#queryDate").val();
        if (beganAndEnd && beganAndEnd.length != 0) {
            var minDate = $("#queryDate").val().split("到")[0];
            var maxDate = $("#queryDate").val().split("到")[1];
            aoData.push({"name": "beginTime", "value": minDate.trim()});
            aoData.push({"name": "endTime", "value": maxDate.trim()});
        }
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        aoData.push({"name": "applicantId", "value": userId});
        aoData.push({"name": "applicantStatus", "value": applicantStatus});
        aoData.push({"name": "turnoverType", "value": turnoverType});
        var searchVal = $('#searchVal').val();
        if(searchVal && searchVal.length != 0){
        	 if (searchVal == '集团支付') {
 	            aoData.push({"name": "searchVal", "value": '2'});
 	        } else if (searchVal == '分校支付') {
 	            aoData.push({"name": "searchVal", "value": '1'});
 	        } else {
 	        	aoData.push({ "name": "searchVal", "value": searchVal.trim() });
 	        }
	     
        }
        $.ajax({
            "url": sSource,
            "data": aoData,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (response) {
                fnCallback(response.returnObject);
                initTotalIncome();
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    }

    //统计
    function initTotalIncome() {
        var beginTime = $("#queryDate").val().split("到")[0];
        var endTime = $("#queryDate").val().split("到")[1];
        var searchVal = $("#searchVal").val();
        $.ajax({
            url: ctx + '/handle/getTotalMoneyByWhere',
            data: {
                "beginTime": beginTime ? beginTime.trim() : null,
                "endTime": endTime ? endTime.trim() : null,
                "searchVal": searchVal ? searchVal.trim() : null,
                "applicantId": userId,
                "turnoverType":turnoverType,
                "applicantStatus": applicantStatus
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var html = '<tr class="odd">';
                var sum = data.data !=null?data.data:0;
                for (var i = 0; i < 5; i++) html += '<td class="text-center"></td>';
                html +=
                    '<td class="text-center red">统计:</td>' +
                    '<td class="text-center">' + sum + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';
                $("#handleTableInit").find("tbody").prepend(html);
            }
        });
    }

    //日期
    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });

})(jQuery)
//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}