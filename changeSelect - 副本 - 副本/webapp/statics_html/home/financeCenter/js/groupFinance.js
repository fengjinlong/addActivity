$(function () {
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().toggle();
    })
    
    //固定按钮切换
    $(".tab_content_11 li").hover(function () {
        $(this).find("div").css({"display": "block", "transform": "rotate3d(0deg,30deg)"});
    }, function () {
        $(this).find("div").css({"display": "none"})
    });

    $('#search').on('click', function () {
        DataTable.init();
    });

    //起止时间
    $("#reservation").daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: '到',
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
        $(this).val(picker.startDate.format('YYYY-MM-DD') + '到' + picker.endDate.format('YYYY-MM-DD'));
    });

//加载表单
    var DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#financeInit').dataTable({
                    "bPaginate": true,  //是否显示分页
                    "iDisplayLength": 10,
                    "bLengthChange": true,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/financeGroupIncome/loadPayDeatil',
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
                        {"mData": "createDate", 'sClass': "text-center"},
                        {"mData": "createUserName", 'sClass': "text-center"},
                        {"mData": "studentName", 'sClass': "text-center"},
                        {"mData": "bmcode", 'sClass': "text-center"},
                        {"mData": "projectName", 'sClass': "text-center"},
                        {"mData": "projectLevelName", 'sClass': "text-center"},
                        {"mData": "payCount", 'sClass': "text-center"},
                        {"mData": "payPx", 'sClass': "text-center"},
                        {"mData": "payKw", 'sClass': "text-center"},
                        {"mData": "payJc", 'sClass': "text-center"},
                        {"mData": "payZl", 'sClass': "text-center"},
                        {"mData": "payXy", 'sClass': "text-center"},
                        {"mData": "payFw", 'sClass': "text-center"},
                        {"mData": "status", 'sClass': "text-center"},
                        {
                            "mData": "infoManageId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                var u = "<a data-record='" + full.infoManageId + "' class='edit' data-toggle='modal' data-target='.bs-example-modal-lg' data-backdrop='static'>" +
                                		"<i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
                                return u;
                            }
                        }

                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        if (aData.projectType == '1') {
                            $('td:eq(6)', nRow).html(aData.payPx + aData.payKw + aData.payJc + aData.payZl + aData.payXy + aData.payFw + aData.payDz - aData.payY - aData.payS);
                        } else {
                            $('td:eq(6)', nRow).html(aData.payPx + aData.payKw + aData.payJc + aData.payZl + aData.payXy  + aData.payDz - aData.payY - aData.payS);
                            $('td:eq(9)', nRow).html(aData.payXy); //学历 教材<--->协议
                            $('td:eq(11)', nRow).html(aData.payJc);//学历 代管<--->教材
                            $('td:eq(12)', nRow).html(aData.payType); //学历 辅导费<--->payType
                        }
                        $('td:eq(7)', nRow).html(aData.payPx + aData.payDz - aData.payY - aData.payS);

                        if (aData.status == '1') {
                            $('td:eq(13)', nRow).html('已创建');
                        } else if (aData.status == '2') {
                            $('td:eq(13)', nRow).html('待沟通');
                        } else if (aData.status == '3') {
                            $('td:eq(13)', nRow).html('已沟通');
                        } else if (aData.status == '4') {
                            $('td:eq(13)', nRow).html('预约');
                        } else if (aData.status == '5') {
                            $('td:eq(13)', nRow).html('上门');
                        } else if (aData.status == '6') {
                            $('td:eq(13)', nRow).html('定座');
                        } else if (aData.status == '7') {
                            $('td:eq(13)', nRow).html('报名');
                        } else {
                            $('td:eq(13)', nRow).html('未知');
                        }
                        return nRow;
                    }
                });
                $("#financeInit_wrapper").removeClass();
                $('#financeInit_wrapper').addClass("table-scrollable");
                //每页显示记录数
                $('#financeInit_wrapper .dataTables_info').parent().append($('.dataTables_length'));
                //横线滚动条
                $('#financeInit_wrapper').on('scroll',function(){
                    $('#financeInit_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
                })
            }
        }
    }();
    $("#financeInit tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#financeInit tbody>tr>td").mLoading({
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
//        var beganAndEnd = $("#reservation").val();
//        if (beganAndEnd && beganAndEnd.length != 0) {
//            var minDate = $("#reservation").val().split("到")[0];
//            var maxDate = $("#reservation").val().split("到")[1];
//            aoData.push({"name": "beginTime", "value": minDate ? minDate.trim() : minDate});
//            aoData.push({"name": "endTime", "value": maxDate ? maxDate.trim() : maxDate});
//        }
    	
    	aoData.push({
            "name": "beginTime",
            "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0]
        });
        aoData.push({
            "name": "endTime",
            "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1]
        });
    	
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        var searchVal = $('#searchVal').val();
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
                initTotalIncome();
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    }

    function initTotalIncome() {
        var beginTime = $("#reservation").val().split("到")[0];
        var endTime = $("#reservation").val().split("到")[1];
        if (beginTime)beginTime.trim();
        if (endTime)endTime.trim();
        var searchVal = $("#searchVal").val();
        $.ajax({
            url: ctx + '/financeGroupIncome/loadPaySum',
            data: {"beginTime": beginTime, "endTime": endTime, "searchVal": searchVal},
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    var zhjyData;
                    var xueliData;
                    $(data).each(function (i, item) {
                        if (item.projectType == '1') {
                            zhjyData = item;
                        } else if (item.projectType == '2') {
                            xueliData = item;
                        }

                    });

                    var zhjyTotal = zhjyData ? (zhjyData.payPX + zhjyData.payKW + zhjyData.payJC + zhjyData.payZL + zhjyData.payXY + zhjyData.payFW + zhjyData.payDZ - zhjyData.payY - zhjyData.payS) : 0;
                    var xueliTotal = xueliData ? (xueliData.payPX + xueliData.payKW + xueliData.payJC + xueliData.payZL + xueliData.payXY + xueliData.payType + xueliData.payDZ - xueliData.payY - xueliData.payS) : 0;
                    var xzOrpxTotal = (zhjyData ? (zhjyData.payPX + zhjyData.payDZ) : 0) + (xueliData ? (xueliData.payPX + xueliData.payDZ) : 0) - (zhjyData ? (zhjyData.payY + zhjyData.payS) : 0) - (xueliData ? (xueliData.payY + xueliData.payS) : 0);
                    var ksOrkwTotal = (zhjyData ? zhjyData.payKW : 0) + (xueliData ? xueliData.payKW : 0);
                    var jcTotal = (zhjyData ? zhjyData.payJC : 0) + (xueliData ? xueliData.payXY : 0);
                    var zlTotal = (zhjyData ? zhjyData.payZL : 0) + (xueliData ? xueliData.payZL : 0);
                    var dgOrxyTotal = (zhjyData ? zhjyData.payXY : 0) + (xueliData ? xueliData.payJC : 0);
                    var fwOrfdTotal = (zhjyData ? zhjyData.payFW : 0) + (xueliData ? xueliData.payType : 0);
                    var html = '<tr class="odd">';
                    for (var i = 0; i < 5; i++) html += '<td class="text-center"></td>';
                    html +=
                        '<td class="text-center red">总计:</td>' +
                        '<td class="text-center">' + (zhjyTotal + xueliTotal) + '</td>' +
                        '<td class="text-center">' + xzOrpxTotal + '</td>' +
                        '<td class="text-center">' + ksOrkwTotal + '</td>' +
                        '<td class="text-center">' + jcTotal + '</td>' +
                        '<td class="text-center">' + zlTotal + '</td>' +
                        '<td class="text-center">' + dgOrxyTotal + '</td>' +
                        '<td class="text-center">' + fwOrfdTotal + '</td>' +
                        '<td class="text-center"></td>' +
                        '<td class="text-center"></td>' +
                        '</tr>';

                    $("#financeInit").find("tbody").prepend(html);
                }
            }
        });
    }

    $('#financeInit').on('click', '.edit', function () {
        var infoManageId = $(this).attr('data-record');
        $.ajax({
            "url": ctx + '/financeGroupIncome/getStuPayDeatil/' + infoManageId,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (data) {
                var consultInfo = data.consultInfo;
                var payInfoData = data.payInfoData;
                var project = data.project;
                fillShortMsg(consultInfo);
                var studentMaturity = '';
                if (consultInfo.studentMaturity == '1') {
                	studentMaturity = 'A类';
                }
                if (consultInfo.studentMaturity == '2') {
                	studentMaturity = 'B类';
                }
                if (consultInfo.studentMaturity == '3') {
                	studentMaturity = 'C类';
                }
                if (consultInfo.studentMaturity == '4') {
                	studentMaturity = 'D类';
                }
                
                //头部信息
                $('#headInfo').find('tr').remove();
                var tr = "<tr><td>咨询分校：<span>" + (consultInfo.departmentName1 ? consultInfo.departmentName1 : '') + "</span></td>" +
                    "<td>品牌：<span>" + (consultInfo.brandName ? consultInfo.brandName : '') + "</span></td>" +
                    "<td>咨询者类型：<span>" + (consultInfo.studentAttrName2 == '--请选择--' ? '' : consultInfo.studentAttrName2) + "</span></td>" +
                    "<td>媒体类源：<span>" + (consultInfo.studentAttrName1 == '--请选择--' ? '' : consultInfo.studentAttrName1) + "</span></td>" +
                    "<td>客户成熟度：<span>" + studentMaturity + "</span></td></tr>";
                $('#headInfo').append(tr);
                //学生个人信息
                $('#studentName').val(consultInfo.studentName ? consultInfo.studentName : '');
                $('#stuSex').val(consultInfo.studentSex);
                $('#stuAge').val(consultInfo.age ? consultInfo.age : '');
                $('#stuPhone').val(consultInfo.studentPhone ? consultInfo.studentPhone : '');
                $('#phoneBelong').val(consultInfo.phoneBelong ? consultInfo.phoneBelong : '');
                $('#stuEmail').val(consultInfo.email ? consultInfo.email : '');
                $('#stuWeChat').val(consultInfo.weChat ? consultInfo.weChat : '');
                $('#stuQQ').val(consultInfo.tengXun ? consultInfo.tengXun : '');
                $('#stuOtherPhone').val(consultInfo.ortherPhone ? consultInfo.ortherPhone : '');
                $('#stuPhoneAddress').val(consultInfo.phoneAddress ? consultInfo.phoneAddress : '');
                $('#stuWorkSpace').val(consultInfo.workSpace ? consultInfo.workSpace : '');
                //课程信息
                $('#courseType').find('option').remove();
                var projectType = "<option selected>" + (project ? (project.projectType == '1' ? '职业资格' : '学历') : '') + "</option>";
                $('#courseType').append(projectType);
                $('#projectName').find('option').remove();
                var projectName = "<option value='" + (consultInfo.projectName) + "'selected>" + (consultInfo.projectName ? consultInfo.projectName : '') + "</option>";
                $('#projectName').append(projectName);
                $('#projectLevelNname').find('option').remove();
                var projectLevelName = "<option value='" + consultInfo.projectLevelName + "'selected>" + (consultInfo.projectLevelName ? consultInfo.projectLevelName : '') + "</option>";
                $('#projectLevelNname').append(projectLevelName);
                if (project.projectType == '1') {
                    $('#xueliDiv').css('display', 'none');
                    $('#xueliDiv input').val('');
                } else {
                    $('#xueliDiv').css('display', 'block');
                    $('#xueliDiv input[name=eduFrom]').val(consultInfo.eduFrom == '1' ? '成考' : (consultInfo.eduFrom == '2' ? '自考' : '远程'));
                    $('#xueliDiv input[name=schoolFrom]').val(consultInfo.schoolFrom);
                    $('#xueliDiv input[name=prFrom]').val(consultInfo.proFrom);
                }
                $('#kTime').find('option').remove();
                var kTime = "<option value='" + consultInfo.kTime + "'selected>" + (consultInfo.kTimeValue ? consultInfo.kTimeValue : '') + "</option>";
                $('#kTime').append(kTime);
                $('#classAttr').find('option').remove();
                var classAttr = "<option value='" + consultInfo.classAttr + "'selected>" + (consultInfo.classAttr ? consultInfo.classAttr : '') + "</option>";
                $('#classAttr').append(classAttr);
                //课程缴费信息
                $('#coursePayInfo').html('');
                if (project.projectType == '1') {
                    coursePayInfoZYJY(consultInfo, payInfoData);
                } else {
                    coursePayInfoXueLi(consultInfo, payInfoData);
                }
                //资料领取
                consultInfo.jcCk == '1' ? $('#ZLDiv input[name=jcCk]').prop('checked', true) : $('#ZLDiv input[name=jcCk]').prop('checked', false);
                consultInfo.jfCk == '1' ? $('#ZLDiv input[name=jfCk]').prop('checked', true) : $('#ZLDiv input[name=jfCk]').prop('checked', false);
                $('#ZLDiv input[name=zlContent]').val(consultInfo.zlContent ? consultInfo.zlContent : '');
                //呼入
                $('#callInfo').find('tr').remove();
                var callInfo = "<tr><td>" + (consultInfo.conversation ? consultInfo.conversation : '') + "</td></tr>";
                $('#callInfo').append(callInfo);
                //咨询
                $('#callBackInfo').find('tr').remove();
                var callBackInfoHtml = "";
                if (consultInfo.recordContent) {
                    var recordArr = consultInfo.recordContent.split('||');
                    $(recordArr).each(function (i, item) {
                        callBackInfoHtml += "<tr><td>" + (item ? item : '') + "</td></tr>";
                    });
                }
                $('#callBackInfo').append(callBackInfoHtml);
                $('#viewInfo').show();
            }
        });
    });

    function coursePayInfoZYJY(consultInfo, payInfoData) {//职业教育
        $('#coursePayInfo').html('');
        var payDZ = 0, payPx = 0, payKw = 0, payZl = 0, payXy = 0, payJc = 0, payFw = 0, payY = 0, payZk = 0, coursePrice = 0, totalPrice = 0;
        $(payInfoData).each(function (i, item) {
            payDZ += parseFloat((item.payDZ ? item.payDZ : 0));
            payPx += parseFloat((item.payPx ? item.payPx : 0));
            payKw += parseFloat((item.payKw ? item.payKw : 0));
            payZl += parseFloat((item.payZl ? item.payZl : 0));
            payXy += parseFloat((item.payXy ? item.payXy : 0));
            payJc += parseFloat((item.payJc ? item.payJc : 0));
            payFw += parseFloat((item.payFw ? item.payFw : 0));
            payY += parseFloat((item.payY ? item.payY : 0));
            payZk += parseFloat((item.payS ? item.payS : 0));
        });
        totalPrice = parseFloat(payDZ + payPx + payKw + payZl + payXy + payJc + payFw);
        coursePrice = parseFloat(totalPrice - payY - payZk);//课程价格、应缴
        $('#coursePrice').val(coursePrice);
        var dzsjArr = new Array(), pxsjArr = new Array(), xysjArr = new Array();//记录每次实缴
        var kwsjArr = new Array(), jcsjArr = new Array(), zlsjArr = new Array(), fwsjArr = new Array();
        $(payInfoData).each(function (i, item) {
            var qfArr = new Array();//统计欠费
            var dzsj = (parseFloat((item.payDzXj ? item.payDzXj : 0)) + parseFloat((item.payDzZp ? item.payDzZp : 0)) + parseFloat((item.payDzSk ? item.payDzSk : 0))
            + (parseFloat(item.payDzWeixin ? item.payDzWeixin : 0)) + parseFloat((item.payDzZfb ? item.payDzZfb : 0)) + parseFloat((item.payDzWl ? item.payDzWl : 0))
            + (parseFloat(item.payDzZz ? item.payDzZz : 0)) + (parseFloat(item.payDzFq ? item.payDzFq : 0)));
            var html = '<span>缴费日期:</span>' + item.createDate;
            html += '<table class="table table-striped table-hover table-bordered dataTable no-footer text-center">';
            html += '<tr> <th class="text-center">收费项目</th><th class="text-center">应缴</th>';
            html += '<th class="text-center">实缴</th><th class="text-center">支付方式</th><th class="text-center">欠费</th></tr>';
            //定坐费
            html += '<tr><td>订座费</td><td>' + payDZ + '</td>';
            html += '<td>' + dzsj + '</td>';
            html += '<td>';
            if ((item.payDzXj ? item.payDzXj : 0) > 0) html += ('<span>现金：<span>' + item.payDzXj + '<br/>');
            if ((item.payDzZp ? item.payDzZp : 0) > 0) html += ('<span>支付：<span>' + item.payDzZp + '<br/>');
            if ((item.payDzSk ? item.payDzSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payDzSk + '<br/>');
            if ((item.payDzWeixin ? item.payDzWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payDzWeixin + '<br/>');
            if ((item.payDzZfb ? item.payDzZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payDzZfb + '<br/>');
            if ((item.payDzWl ? item.payDzWl : 0) > 0) html += ('<span>网络：<span>' + item.payDzWl + '<br/>');
            if ((item.payDzZz ? item.payDzZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payDzZz + '<br/>');
            if ((item.payDzFq ? item.payDzFq : 0) > 0) html += ('<span>分期：<span>' + item.payDzFq);
            html += '</td>';
            var sumDZSJ = parseFloat(0);
            $(dzsjArr).each(function (j, data) {
                sumDZSJ += parseFloat(data);
            });
            sumDZSJ += parseFloat(dzsj);
            qfArr.push(parseFloat(payDZ - sumDZSJ));
            html += '<td>' + parseFloat(payDZ - sumDZSJ) + '</td></tr>';
            dzsjArr.push(parseFloat(dzsj));
            //培训费
            var pxsj = ((parseFloat(item.payPxXj ? item.payPxXj : 0)) + (parseFloat(item.payPxZp ? item.payPxZp : 0)) + (parseFloat(item.payPxSk ? item.payPxSk : 0))
            + (parseFloat(item.payPxWeixin ? item.payPxWeixin : 0)) + (parseFloat(item.payPxZfb ? item.payPxZfb : 0)) + (parseFloat(item.payPxWl ? item.payPxWl : 0))
            + (parseFloat(item.payPxZz ? item.payPxZz : 0)) + (parseFloat(item.payPxFq ? item.payPxFq : 0)));
            html += '<tr><td>培训费</td><td>' + payPx + '</td>';
            html += '<td>' + pxsj + '</td>';
            html += '<td>';
            if ((item.payPxXj ? item.payPxXj : 0) > 0) html += ('<span>现金：<span>' + item.payPxXj + '<br/>');
            if ((item.payPxZp ? item.payPxZp : 0) > 0) html += ('<span>支付：<span>' + item.payPxZp + '<br/>');
            if ((item.payPxSk ? item.payPxSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payPxSk + '<br/>');
            if ((item.payPxWeixin ? item.payPxWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payPxWeixin + '<br/>');
            if ((item.payPxZfb ? item.payPxZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payPxZfb + '<br/>');
            if ((item.payPxWl ? item.payDzWl : 0) > 0) html += ('<span>网络：<span>' + item.payPxWl + '<br/>');
            if ((item.payPxZz ? item.payPxZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payPxZz + '<br/>');
            if ((item.payPxFq ? item.payPxFq : 0) > 0) html += ('<span>分期：<span>' + item.payPxFq);
            html += '</td>';
            var sumPXSJ = parseFloat(0);
            $(pxsjArr).each(function (j, data) {
                sumPXSJ += parseFloat(data);
            });
            sumPXSJ += parseFloat(pxsj);
            qfArr.push(parseFloat(payPx - sumPXSJ));
            html += '<td>' + (payPx - sumPXSJ) + '</td></tr>';
            pxsjArr.push(parseFloat(pxsj));
            //协议费
            var xysj = ((parseFloat(item.payXyXj ? item.payXyXj : 0)) + (parseFloat(item.payXyZp ? item.payXyZp : 0)) + (parseFloat(item.payXySk ? item.payXySk : 0))
            + (parseFloat(item.payXyWeixin ? item.payXyWeixin : 0)) + (parseFloat(item.payXyZfb ? item.payXyZfb : 0)) + (parseFloat(item.payXyWl ? item.payXyWl : 0))
            + (parseFloat(item.payXyZz ? item.payXyZz : 0)) + (parseFloat(item.payXyFq ? item.payXyFq : 0)));
            html += '<tr><td>协议费</td><td>' + payXy + '</td>';
            html += '<td>' + xysj + '</td>';
            html += '<td>';
            if ((item.payXyXj ? item.payXyXj : 0) > 0) html += ('<span>现金：<span>' + item.payXyXj + '<br/>');
            if ((item.payXyZp ? item.payXyZp : 0) > 0) html += ('<span>支付：<span>' + item.payXyZp + '<br/>');
            if ((item.payXySk ? item.payXySk : 0) > 0) html += ('<span>刷卡：<span>' + item.payXySk + '<br/>');
            if ((item.payXyWeixin ? item.payXyWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payXyWeixin + '<br/>');
            if ((item.payXyZfb ? item.payXyZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payXyZfb + '<br/>');
            if ((item.payXyWl ? item.payXyWl : 0) > 0) html += ('<span>网络：<span>' + item.payXyWl + '<br/>');
            if ((item.payXyZz ? item.payXyZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payXyZz + '<br/>');
            if ((item.payXyFq ? item.payXyFq : 0) > 0) html += ('<span>分期：<span>' + item.payXyFq);
            html += '</td>';
            var sumXYSJ = parseFloat(0);
            $(xysjArr).each(function (j, data) {
                sumXYSJ += parseFloat(data);
            });
            sumXYSJ += parseFloat(xysj);
            qfArr.push(parseFloat(payXy - sumXYSJ));
            html += '<td>' + (payXy - sumXYSJ) + '</td></tr>';
            xysjArr.push(parseFloat(xysj));
            //服务费
            var fwsj = (parseFloat((item.payFwXj ? item.payFwXj : 0)) + (parseFloat(item.payFwZp ? item.payFwZp : 0)) + (parseFloat(item.payFwSk ? item.payFwSk : 0))
            + (parseFloat(item.payFwWeixin ? item.payFwWeixin : 0)) + (parseFloat(item.payFwZfb ? item.payFwZfb : 0)) + (parseFloat(item.payFwWl ? item.payFwWl : 0))
            + (parseFloat(item.payFwZz ? item.payFwZz : 0)) + (parseFloat(item.payFwFq ? item.payFwFq : 0)));
            html += '<tr><td>服务费</td><td>' + payFw + '</td>';
            html += '<td>' + fwsj + '</td>';
            html += '<td>';
            if ((item.payFwXj ? item.payFwXj : 0) > 0) html += ('<span>现金：<span>' + item.payFwXj + '<br/>');
            if ((item.payFwZp ? item.payFwZp : 0) > 0) html += ('<span>支付：<span>' + item.payFwZp + '<br/>');
            if ((item.payFwSk ? item.payFwSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payFwSk + '<br/>');
            if ((item.payFwWeixin ? item.payFwWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payFwWeixin + '<br/>');
            if ((item.payFwZfb ? item.payFwZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payFwZfb + '<br/>');
            if ((item.payFwWl ? item.payFwWl : 0) > 0) html += ('<span>网络：<span>' + item.payFwWl + '<br/>');
            ;
            if ((item.payFwZz ? item.payFwZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payFwZz + '<br/>');
            if ((item.payFwFq ? item.payFwFq : 0) > 0) html += ('<span>分期：<span>' + item.payFwFq);
            html += '</td>';
            var sumFWSJ = parseFloat(0);
            $(fwsjArr).each(function (j, data) {
                sumFWSJ += parseFloat(data);
            });
            sumFWSJ += parseFloat(fwsj);
            qfArr.push(parseFloat(payFw - sumFWSJ));
            html += '<td>' + (payFw - sumFWSJ) + '</td></tr>';
            fwsjArr.push(parseFloat(fwsj));
            //教材费
            var jcsj = ((parseFloat(item.payJcXj ? item.payJcXj : 0)) + (parseFloat(item.payJcZp ? item.payJcZp : 0)) + (parseFloat(item.payJcSk ? item.payJcSk : 0))
            + (parseFloat(item.payJcWeixin ? item.payJcWeixin : 0)) + (parseFloat(item.payJcZfb ? item.payJcZfb : 0)) + (parseFloat(item.payJcWl ? item.payJcWl : 0))
            + (parseFloat(item.payJcZz ? item.payJcZz : 0)) + (parseFloat(item.payJcFq ? item.payJcFq : 0)));
            html += '<tr><td>教材费</td><td>' + payJc + '</td>';
            html += '<td>' + jcsj + '</td>';
            html += '<td>';
            if ((item.payJcXj ? item.payJcXj : 0) > 0) html += ('<span>现金：<span>' + item.payJcXj + '<br/>');
            if ((item.payJcZp ? item.payJcZp : 0) > 0) html += ('<span>支付：<span>' + item.payJcZp + '<br/>');
            if ((item.payJcSk ? item.payJcSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payJcSk + '<br/>');
            if ((item.payJcWeixin ? item.payJcWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payJcWeixin + '<br/>');
            if ((item.payJcZfb ? item.payJcZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payJcZfb + '<br/>');
            if ((item.payJcWl ? item.payJcWl : 0) > 0) html += ('<span>网络：<span>' + item.payJcWl + '<br/>');
            if ((item.payJcZz ? item.payJcZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payJcZz + '<br/>');
            if ((item.payJcFq ? item.payJcFq : 0) > 0) html += ('<span>分期：<span>' + item.payJcFq);
            html += '</td>';
            var sumJCSJ = parseFloat(0);
            $(jcsjArr).each(function (j, data) {
                sumJCSJ += parseFloat(data);
            });
            sumJCSJ += parseFloat(jcsj);
            qfArr.push(parseFloat(payJc - sumJCSJ));
            html += '<td>' + (payJc - sumJCSJ) + '</td></tr>';
            jcsjArr.push(parseFloat(jcsj));
            //资料费
            var zlsj = ((parseFloat(item.payZlXj ? item.payZlXj : 0)) + (parseFloat(item.payZlZp ? item.payZlZp : 0)) + (parseFloat(item.payZlSk ? item.payZlSk : 0))
            + (parseFloat(item.payZlWeixin ? item.payZlWeixin : 0)) + (parseFloat(item.payZlZfb ? item.payZlZfb : 0)) + (parseFloat(item.payZlWl ? item.payZlWl : 0))
            + (parseFloat(item.payZlZz ? item.payZlZz : 0)) + (parseFloat(item.payZlFq ? item.payZlFq : 0)));
            html += '<tr><td>资料费</td><td>' + payZl + '</td>';
            html += '<td>' + zlsj + '</td>';
            html += '<td>';
            if ((item.payZlXj ? item.payZlXj : 0) > 0) html += ('<span>现金：<span>' + item.payZlXj + '<br/>');
            if ((item.payZlZp ? item.payZlZp : 0) > 0) html += ('<span>支付：<span>' + item.payZlZp + '<br/>');
            if ((item.payZlSk ? item.payZlSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payZlSk + '<br/>');
            if ((item.payZlWeixin ? item.payZlWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payZlWeixin + '<br/>');
            if ((item.payZlZfb ? item.payZlZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payZlZfb + '<br/>');
            if ((item.payZlWl ? item.payZlWl : 0) > 0) html += ('<span>网络：<span>' + item.payZlWl + '<br/>');
            if ((item.payZlZz ? item.payZlZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payZlZz + '<br/>');
            if ((item.payZlFq ? item.payZlFq : 0) > 0) html += ('<span>分期：<span>' + item.payZlFq);
            html += '</td>';
            var sumZLSJ = parseFloat(0);
            $(zlsjArr).each(function (j, data) {
                sumZLSJ += parseFloat(data);
            });
            sumZLSJ += zlsj;
            qfArr.push(parseFloat(payZl - sumZLSJ));
            html += '<td>' + (payZl - sumZLSJ) + '</td></tr>';
            jcsjArr.push(parseFloat(zlsj));

            //考务费
            var kwsj = ((parseFloat(item.payKwXj ? item.payKwXj : 0)) + (parseFloat(item.payKwZp ? item.payKwZp : 0)) + (parseFloat(item.payKwSk ? item.payKwSk : 0))
            + (parseFloat(item.payKwWeixin ? item.payKwWeixin : 0)) + (parseFloat(item.payKwZfb ? item.payKwZfb : 0)) + (parseFloat(item.payKwWl ? item.payKwWl : 0))
            + (parseFloat(item.payKwZz ? item.payKwZz : 0)) + (parseFloat(item.payKwFq ? item.payKwFq : 0)));
            html += '<tr><td>考务费</td><td>' + payKw + '</td>';
            html += '<td>' + kwsj + '</td>';
            html += '<td>';
            if ((item.payKwXj ? item.payKwXj : 0) > 0) html += ('<span>现金：<span>' + item.payKwXj + '<br/>');
            if ((item.payKwZp ? item.payKwZp : 0) > 0) html += ('<span>支付：<span>' + item.payKwZp + '<br/>');
            if ((item.payKwSk ? item.payKwSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payKwSk + '<br/>');
            if ((item.payKwWeixin ? item.payKwWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payKwWeixin + '<br/>');
            if ((item.payKwZfb ? item.payKwZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payKwZfb + '<br/>');
            if ((item.payKwWl ? item.payKwWl : 0) > 0) html += ('<span>网络：<span>' + item.payKwWl + '<br/>');
            if ((item.payKwZz ? item.payKwZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payKwZz + '<br/>');
            if ((item.payKwFq ? item.payKwFq : 0) > 0) html += ('<span>分期：<span>' + item.payKwFq);
            html += '</td>';
            var sumKWSJ = parseFloat(0);
            $(kwsjArr).each(function (j, data) {
                sumKWSJ += parseFloat(data);
            });
            sumKWSJ += parseFloat(kwsj);
            qfArr.push(parseFloat(payKw - sumKWSJ));
            html += '<td>' + (payKw - sumKWSJ) + '</td></tr>';
            kwsjArr.push(parseFloat(kwsj));

            //总计
            html += '<tr><td>总计</td>';
            html += '<td>' + totalPrice + '</td>';
            html += '<td>' + parseFloat(dzsj + pxsj + xysj + fwsj + jcsj + zlsj + kwsj) + '</td>';
            html += '<td></td>';
            html += '<td></td></tr>';
            //优惠
            html += '<tr><td>优惠</td>';
            html += '<td>' + payY + '</td>';
            html += '<td></td>';
            html += '<td></td>';
            html += '<td></td></tr>';
            //折扣
            html += '<tr><td>折扣</td>';
            html += '<td>' + payZk + '</td>';
            html += '<td></td>';
            html += '<td></td>';
            html += '<td></td></tr>';
            //统计
            var sumQF = parseFloat(0);
            $(qfArr).each(function (i, data) {
                sumQF += parseFloat(data);
            });
            html += '<tr><td>统计</td>';
            html += '<td>' + coursePrice + '</td>';
            html += '<td>' + parseFloat(dzsj + pxsj + xysj + fwsj + jcsj + zlsj + kwsj) + '</td>';
            html += '<td></td>';
            html += '<td>' + parseFloat(sumQF) + '</td></tr>';
            html += '</table>';
            //备注
            html += '<div class="well"><span class="tips">备注:</span><span>' + (consultInfo.notes ? consultInfo.notes : '') + '</span></div>';
            $('#coursePayInfo').append(html);

        });

    }

    //学历
    function coursePayInfoXueLi(consultInfo, payInfoData) {
        $('#coursePayInfo').html('');
        var payDZ = 0, payXz = 0, payKs = 0, payZl = 0, payJc = 0, payDg = 0, payFd = 0, payY = 0, payZk = 0, coursePrice = 0, totalPrice = 0;
        $(payInfoData).each(function (i, item) {
            payDZ += parseFloat((item.payDZ ? item.payDZ : 0));
            payXz += parseFloat((item.payPx ? item.payPx : 0));
            payKs += parseFloat((item.payKw ? item.payKw : 0));
            payZl += parseFloat((item.payZl ? item.payZl : 0));
            payJc += parseFloat((item.payXy ? item.payXy : 0));
            payDg += parseFloat((item.payJc ? item.payJc : 0));
            payFd += parseFloat((item.payType ? item.payType : 0));
            payY += parseFloat((item.payY ? item.payY : 0));
            payZk += parseFloat((item.payS ? item.payS : 0));
        });
        totalPrice = parseFloat(payDZ + payXz + payKs + payZl + payJc + payDg + payFd);
        coursePrice = parseFloat(totalPrice - payY - payZk);//课程价格、应缴
        $('#coursePrice').val(coursePrice);
        var dzsjArr = new Array(), xzsjArr = new Array(), kssjArr = new Array();//记录每次实缴
        var zlsjArr = new Array(), jcsjArr = new Array(), dgsjArr = new Array();
        $(payInfoData).each(function (i, item) {
            var qfArr = new Array();//统计欠费
            var dzsj = (parseFloat((item.payDzXj ? item.payDzXj : 0)) + parseFloat((item.payDzZp ? item.payDzZp : 0)) + parseFloat((item.payDzSk ? item.payDzSk : 0))
            + (parseFloat(item.payDzWeixin ? item.payDzWeixin : 0)) + parseFloat((item.payDzZfb ? item.payDzZfb : 0)) + parseFloat((item.payDzWl ? item.payDzWl : 0))
            + (parseFloat(item.payDzZz ? item.payDzZz : 0)) + (parseFloat(item.payDzFq ? item.payDzFq : 0)));
            var html = '<span>缴费日期:</span>' + item.createDate;
            html += '<table class="table table-striped table-hover table-bordered dataTable no-footer text-center">';
            html += '<tr> <th class="text-center">收费项目</th><th class="text-center">应缴</th>';
            html += '<th class="text-center">实缴</th><th class="text-center">支付方式</th><th class="text-center">欠费</th></tr>';
            //定坐费
            html += '<tr><td>订座费</td><td>' + payDZ + '</td>';
            html += '<td>' + dzsj + '</td>';
            html += '<td>';
            if ((item.payDzXj ? item.payDzXj : 0) > 0) html += ('<span>现金：<span>' + item.payDzXj + '<br/>');
            if ((item.payDzZp ? item.payDzZp : 0) > 0) html += ('<span>支付：<span>' + item.payDzZp + '<br/>');
            if ((item.payDzSk ? item.payDzSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payDzSk + '<br/>');
            if ((item.payDzWeixin ? item.payDzWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payDzWeixin + '<br/>');
            if ((item.payDzZfb ? item.payDzZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payDzZfb + '<br/>');
            if ((item.payDzWl ? item.payDzWl : 0) > 0) html += ('<span>网络：<span>' + item.payDzWl + '<br/>');
            if ((item.payDzZz ? item.payDzZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payDzZz + '<br/>');
            if ((item.payDzFq ? item.payDzFq : 0) > 0) html += ('<span>分期：<span>' + item.payDzFq);
            html += '</td>';
            var sumDZSJ = parseFloat(0);
            $(dzsjArr).each(function (j, data) {
                sumDZSJ += parseFloat(data);
            });
            sumDZSJ += parseFloat(dzsj);
            qfArr.push(parseFloat(payDZ - sumDZSJ));
            html += '<td>' + parseFloat(payDZ - sumDZSJ) + '</td></tr>';
            dzsjArr.push(parseFloat(dzsj));
            //学杂费
            var xzsj = ((parseFloat(item.payPxXj ? item.payPxXj : 0)) + (parseFloat(item.payPxZp ? item.payPxZp : 0)) + (parseFloat(item.payPxSk ? item.payPxSk : 0))
            + (parseFloat(item.payPxWeixin ? item.payPxWeixin : 0)) + (parseFloat(item.payPxZfb ? item.payPxZfb : 0)) + (parseFloat(item.payPxWl ? item.payPxWl : 0))
            + (parseFloat(item.payPxZz ? item.payPxZz : 0)) + (parseFloat(item.payPxFq ? item.payPxFq : 0)));
            html += '<tr><td>学杂费</td><td>' + payXz + '</td>';
            html += '<td>' + xzsj + '</td>';
            html += '<td>';
            if ((item.payPxXj ? item.payPxXj : 0) > 0) html += ('<span>现金：<span>' + item.payPxXj + '<br/>');
            if ((item.payPxZp ? item.payPxZp : 0) > 0) html += ('<span>支付：<span>' + item.payPxZp + '<br/>');
            if ((item.payPxSk ? item.payPxSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payPxSk + '<br/>');
            if ((item.payPxWeixin ? item.payPxWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payPxWeixin + '<br/>');
            if ((item.payPxZfb ? item.payPxZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payPxZfb + '<br/>');
            if ((item.payPxWl ? item.payDzWl : 0) > 0) html += ('<span>网络：<span>' + item.payPxWl + '<br/>');
            if ((item.payPxZz ? item.payPxZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payPxZz + '<br/>');
            if ((item.payPxFq ? item.payPxFq : 0) > 0) html += ('<span>分期：<span>' + item.payPxFq);
            html += '</td>';
            var sumXZSJ = parseFloat(0);
            $(xzsjArr).each(function (j, data) {
                sumXZSJ += parseFloat(data);
            });
            sumXZSJ += parseFloat(xzsj);
            qfArr.push(parseFloat(payXz - sumXZSJ));
            html += '<td>' + (payXz - sumXZSJ) + '</td></tr>';
            xzsjArr.push(parseFloat(xzsj));
            //考试费
            var kssj = ((parseFloat(item.payKwXj ? item.payKwXj : 0)) + (parseFloat(item.payKwZp ? item.payKwZp : 0)) + (parseFloat(item.payKwSk ? item.payKwSk : 0))
            + (parseFloat(item.payKwWeixin ? item.payKwWeixin : 0)) + (parseFloat(item.payKwZfb ? item.payKwZfb : 0)) + (parseFloat(item.payKwWl ? item.payKwWl : 0))
            + (parseFloat(item.payKwZz ? item.payKwZz : 0)) + (parseFloat(item.payKwFq ? item.payKwFq : 0)));
            html += '<tr><td>考试费</td><td>' + payKs + '</td>';
            html += '<td>' + kssj + '</td>';
            html += '<td>';
            if ((item.payKwXj ? item.payKwXj : 0) > 0) html += ('<span>现金：<span>' + item.payKwXj + '<br/>');
            if ((item.payKwZp ? item.payKwZp : 0) > 0) html += ('<span>支付：<span>' + item.payKwZp + '<br/>');
            if ((item.payKwSk ? item.payKwSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payKwSk + '<br/>');
            if ((item.payKwWeixin ? item.payKwWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payKwWeixin + '<br/>');
            if ((item.payKwZfb ? item.payKwZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payKwZfb + '<br/>');
            if ((item.payKwWl ? item.payKwWl : 0) > 0) html += ('<span>网络：<span>' + item.payKwWl + '<br/>');
            if ((item.payKwZz ? item.payKwZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payKwZz + '<br/>');
            if ((item.payKwFq ? item.payKwFq : 0) > 0) html += ('<span>分期：<span>' + item.payKwFq);
            html += '</td>';
            var sumKSSJ = parseFloat(0);
            $(kssjArr).each(function (j, data) {
                sumKSSJ += parseFloat(data);
            });
            sumKSSJ += parseFloat(kssj);
            qfArr.push(parseFloat(payKs - sumKSSJ));
            html += '<td>' + (payKs - sumKSSJ) + '</td></tr>';
            kssjArr.push(parseFloat(kssj));
            //资料费
            var zlsj = ((parseFloat(item.payZlXj ? item.payZlXj : 0)) + (parseFloat(item.payZlZp ? item.payZlZp : 0)) + (parseFloat(item.payZlSk ? item.payZlSk : 0))
            + (parseFloat(item.payZlWeixin ? item.payZlWeixin : 0)) + (parseFloat(item.payZlZfb ? item.payZlZfb : 0)) + (parseFloat(item.payZlWl ? item.payZlWl : 0))
            + (parseFloat(item.payZlZz ? item.payZlZz : 0)) + (parseFloat(item.payZlFq ? item.payZlFq : 0)));
            html += '<tr><td>资料费</td><td>' + payZl + '</td>';
            html += '<td>' + zlsj + '</td>';
            html += '<td>';
            if ((item.payZlXj ? item.payZlXj : 0) > 0) html += ('<span>现金：<span>' + item.payZlXj + '<br/>');
            if ((item.payZlZp ? item.payZlZp : 0) > 0) html += ('<span>支付：<span>' + item.payZlZp + '<br/>');
            if ((item.payZlSk ? item.payZlSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payZlSk + '<br/>');
            if ((item.payZlWeixin ? item.payZlWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payZlWeixin + '<br/>');
            if ((item.payZlZfb ? item.payZlZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payZlZfb + '<br/>');
            if ((item.payZlWl ? item.payZlWl : 0) > 0) html += ('<span>网络：<span>' + item.payZlWl + '<br/>');
            if ((item.payZlZz ? item.payZlZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payZlZz + '<br/>');
            if ((item.payZlFq ? item.payZlFq : 0) > 0) html += ('<span>分期：<span>' + item.payZlFq);
            html += '</td>';
            var sumZLSJ = parseFloat(0);
            $(zlsjArr).each(function (j, data) {
                sumZLSJ += parseFloat(data);
            });
            sumZLSJ += zlsj;
            qfArr.push(parseFloat(payZl - sumZLSJ));
            html += '<td>' + (payZl - sumZLSJ) + '</td></tr>';
            zlsjArr.push(parseFloat(zlsj));

            //教材费
            var jcsj = ((parseFloat(item.payXyXj ? item.payXyXj : 0)) + (parseFloat(item.payXyZp ? item.payXyZp : 0)) + (parseFloat(item.payXySk ? item.payXySk : 0))
            + (parseFloat(item.payXyWeixin ? item.payXyWeixin : 0)) + (parseFloat(item.payXyZfb ? item.payXyZfb : 0)) + (parseFloat(item.payXyWl ? item.payXyWl : 0))
            + (parseFloat(item.payXyZz ? item.payXyZz : 0)) + (parseFloat(item.payXyFq ? item.payXyFq : 0)));
            html += '<tr><td>教材费</td><td>' + payJc + '</td>';
            html += '<td>' + jcsj + '</td>';
            html += '<td>';
            if ((item.payXyXj ? item.payXyXj : 0) > 0) html += ('<span>现金：<span>' + item.payXyXj + '<br/>');
            if ((item.payXyZp ? item.payXyZp : 0) > 0) html += ('<span>支付：<span>' + item.payXyZp + '<br/>');
            if ((item.payXySk ? item.payXySk : 0) > 0) html += ('<span>刷卡：<span>' + item.payXySk + '<br/>');
            if ((item.payXyWeixin ? item.payXyWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payXyWeixin + '<br/>');
            if ((item.payXyZfb ? item.payXyZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payXyZfb + '<br/>');
            if ((item.payXyWl ? item.payXyWl : 0) > 0) html += ('<span>网络：<span>' + item.payXyWl + '<br/>');
            if ((item.payXyZz ? item.payXyZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payXyZz + '<br/>');
            if ((item.payXyFq ? item.payXyFq : 0) > 0) html += ('<span>分期：<span>' + item.payXyFq);
            html += '</td>';
            var sumJCSJ = parseFloat(0);
            $(jcsjArr).each(function (j, data) {
                sumJCSJ += parseFloat(data);
            });
            sumJCSJ += parseFloat(jcsj);
            qfArr.push(parseFloat(payJc - sumJCSJ));
            html += '<td>' + (payJc - sumJCSJ) + '</td></tr>';
            jcsjArr.push(parseFloat(jcsj));

            //代管费
            var dgsj = ((parseFloat(item.payJcXj ? item.payJcXj : 0)) + (parseFloat(item.payJcZp ? item.payJcZp : 0)) + (parseFloat(item.payJcSk ? item.payJcSk : 0))
            + (parseFloat(item.payJcWeixin ? item.payJcWeixin : 0)) + (parseFloat(item.payJcZfb ? item.payJcZfb : 0)) + (parseFloat(item.payJcWl ? item.payJcWl : 0))
            + (parseFloat(item.payJcZz ? item.payJcZz : 0)) + (parseFloat(item.payJcFq ? item.payJcFq : 0)));
            html += '<tr><td>代管费</td><td>' + payDg + '</td>';
            html += '<td>' + dgsj + '</td>';
            html += '<td>';
            if ((item.payJcXj ? item.payJcXj : 0) > 0) html += ('<span>现金：<span>' + item.payJcXj + '<br/>');
            if ((item.payJcZp ? item.payJcZp : 0) > 0) html += ('<span>支付：<span>' + item.payJcZp + '<br/>');
            if ((item.payJcSk ? item.payJcSk : 0) > 0) html += ('<span>刷卡：<span>' + item.payJcSk + '<br/>');
            if ((item.payJcWeixin ? item.payJcWeixin : 0) > 0) html += ('<span>微信：<span>' + item.payJcWeixin + '<br/>');
            if ((item.payJcZfb ? item.payJcZfb : 0) > 0) html += ('<span>支付宝：<span>' + item.payJcZfb + '<br/>');
            if ((item.payJcWl ? item.payJcWl : 0) > 0) html += ('<span>网络：<span>' + item.payJcWl + '<br/>');
            if ((item.payJcZz ? item.payJcZz : 0) > 0) html += ('<span>银行转账：<span>' + item.payJcZz + '<br/>');
            if ((item.payJcFq ? item.payJcFq : 0) > 0) html += ('<span>分期：<span>' + item.payJcFq);
            html += '</td>';
            var sumDGSJ = parseFloat(0);
            $(dgsjArr).each(function (j, data) {
                sumDGSJ += parseFloat(data);
            });
            sumDGSJ += parseFloat(dgsj);
            qfArr.push(parseFloat(payDg - sumDGSJ));
            html += '<td>' + (payDg - sumDGSJ) + '</td></tr>';
            dgsjArr.push(parseFloat(dgsj));

            //辅导费
            var fdsj = parseFloat(payFd);
            html += '<tr><td>辅导费</td><td>' + payFd + '</td>';
            html += '<td>' + (i == 0 ? fdsj : fdsj + "(第一次缴费)") + '</td>';
            html += '<td>';
            if ((payFd ? payFd : 0) > 0) html += (i == 0 ? '缴费:' + payFd : '缴费:' + payFd + "(第一次缴费)");
            html += '</td>';
            html += '<td>' + (payFd - fdsj) + '</td></tr>';


            //总计
            html += '<tr><td>总计</td>';
            html += '<td>' + totalPrice + '</td>';
            html += '<td>' + parseFloat(dzsj + xzsj + kssj + zlsj + jcsj + dgsj + (i == 0 ? fdsj : 0)) + (i == 0 ? "" : "(不包括辅导费)") + '</td>';
            html += '<td></td>';
            html += '<td></td></tr>';
            //优惠
            html += '<tr><td>优惠</td>';
            html += '<td>' + payY + '</td>';
            html += '<td></td>';
            html += '<td></td>';
            html += '<td></td></tr>';
            //折扣
            html += '<tr><td>折扣</td>';
            html += '<td>' + payZk + '</td>';
            html += '<td></td>';
            html += '<td></td>';
            html += '<td></td></tr>';
            //统计
            var sumQF = parseFloat(0);
            $(qfArr).each(function (i, data) {
                sumQF += parseFloat(data);
            });
            html += '<tr><td>统计</td>';
            html += '<td>' + coursePrice + '</td>';
            html += '<td>' + parseFloat(dzsj + xzsj + kssj + zlsj + jcsj + dgsj + (i == 0 ? fdsj : 0)) + (i == 0 ? "" : "(不包括辅导费)") + '</td>';
            html += '<td></td>';
            html += '<td>' + parseFloat(sumQF) + '</td></tr>';
            html += '</table>';
            //备注
            html += '<div class="well"><span class="tips">备注:</span><span>' + (consultInfo.notes ? consultInfo.notes : '') + '</span></div>';
            $('#coursePayInfo').append(html);

        });

    }

    function fillShortMsg(data) {
        $('#MsgForm select[name=departmentId1]').find('option').remove();
        var opt = '<option value="' + data.departmentId1 + '">' + data.departmentName1 + '</option>';
        $('#MsgForm select[name=departmentId1]').append(opt);
        $('#studentPhoneMsg').val(data.studentPhone);
        initSchoolArea(data);
    }

    //初始化分校校区select
    function initSchoolArea(record) {
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {parentId: record.departmentId1},
            dataType: 'json',
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.list.length; i++) {
                    opt += "<option address=" + data.list[i].description + " value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
                }
                $("#schoolIdModelMsg").html('<option value="-1">--请选择--</option>' + opt);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    }

    //发送短信
    $('#MsgForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {//表单验证
            studentPhoneMsg: {
                validators: {
                    notEmpty: {
                        message: '手机号不能为空'
                    }
                }
            },
            showPhoneMsg: {
                validators: {
                    notEmpty: {
                        message: '消息内容不能为空'
                    }
                }
            },
            schoolIdModelMsg: {
                validators: {
                    callback: {
                        message: '选选择预约校区',
                        callback: function (value, validator) {
                            return !(value == '-1');
                        }
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                type: "POST",
                url: ctx + "/consultConsole/sendMsg",
                data: {
                    moblie: $('#studentPhoneMsg').val(),
                    msg: $('#showPhoneMsg').val()
                },
                dataType: 'json',
                success: function (msg) {
                    msg = JSON.parse(msg.msg);
                    toastr.success(msg.msg);
                    $('#shortMsgModal').modal('hide');
                }
            });
            return false;
        }
    });

    /**
     * 短信类型区分
     * @returns
     */
    $('#msgContent').on('change', function () {
        var val = $(this).val();
        val = val.replace('class', $('#classId2').find('option:selected').text());
        val = val.replace('address', $('#schoolIdModelMsg').find('option:selected').attr('address'));
        $('#showPhoneMsg').val(val)
    });
})

//发送短信弹窗层级
$('.information').on('show.bs.modal', function () {
    $('.bs-example-modal-lg').css('z-index', 1039);
}).on('hide.bs.modal', function () {
    $('.bs-example-modal-lg').css('z-index', 1050);
});
//回车搜索
function search() {
    if (event.keyCode == 13) {
        $('#search').click();
    }
}