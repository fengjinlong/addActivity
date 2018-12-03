$(function () {
    //日期控件
    $('.reservation').daterangepicker({
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

    $('.reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    //时间初始化
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };

    $(".form_datetime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true
    })

    //考试时间
    $('.scoreManage').on('focus', '.date-picker', function () {
        $('.date-picker').datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd'
        }).on('changeDate', function () {
            $(this).datepicker('hide');
        });
    })


    //信息核实查看
    var radios = $('#amountDataPhone input[type="radio"]');
    for (var i = 0; i < radios.length; i++) {
        if ($(radios[i]).prop('checked')) {
            if ($(radios[i]).next().text().trim() == '是') {
                $(radios).eq(i).parents('.col-sm-3.no-padding').next().hide();
            } else {
                $(radios).eq(i).parents('.col-sm-3.no-padding').next().show();
            }
        }

        $(radios[i]).click(function () {
            if ($(this).next().text().trim() == '是') {
                $(this).parents('.col-sm-3.no-padding').next().hide();
            } else {
                $(this).parents('.col-sm-3.no-padding').next().show();
            }
        })
    }

    //折叠图标切换
    if ($('.drop-down .sidebar-menu li a').hasClass('menu-dropdown')) {
        $('.drop-down .sidebar-menu .menu-dropdown').find('i').addClass('fa-angle-right');
    }
    $('.drop-down .sidebar-menu .submenu .submenu a').find('i').remove();
    $('.drop-down .sidebar-menu').on('click', '.menu-dropdown', function () {
        if ($(this).next('.submenu').css('display') == 'block') {
            $(this).find('i').addClass('fa-angle-right').removeClass('fa-angle-down');
        } else {
            $(this).find('i').addClass('fa-angle-down').removeClass('fa-angle-right');
            $(this).parent().siblings().find('i').addClass('fa-angle-right').removeClass('fa-angle-down');
        }
    })

    //点击每一项切换对应数据
    function switchingData(parentEle, rightData) {
        $(parentEle).find('.drop-down .sidebar-menu').on('click', 'a', function () {
            $(rightData).fadeOut(0).fadeIn(100);
        })
    }

    switchingData('#waitExam', '.waitExamInfo');
    switchingData('#partnerConfirm', '.partnerInfo');
    switchingData('#alreadyExam', '.alreadyExamInfo');


    // 短信类型选择
    $('#msgType').on('change', function () {
        var val = $(this).val().replace('address', $('#schoolIdModelMsg').find('option:selected').text());
        $('#showMsg').val(val)
    })

    //查看右侧固定按钮切换
    $('.right-toolbar a').hover(function () {
        $(this).find('.up').stop().fadeIn(400);
    }, function () {
        $(this).find('.up').stop().fadeOut(400);
    })

    //查看折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().toggle();
    })

    //开户行所在省市
    $('.distpicker').distpicker();

    //弹窗层级
    $('.information,.examFeeReturn').on('show.bs.modal', function () {
        $('.examination,.partnerView,.examView,.absenteeView,.examFee').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.examination,.partnerView,.examView,.absenteeView,.examFee').css('z-index', 1050);
    })

    //上传文件

    //合作方返回结果比对
    $('#partner-upload').fileinput({
        language: 'zh',
        uploadUrl: '#',
        showPreview: false
    })

    //退回报考费比对
    $('#examFee-upload').fileinput({
        language: 'zh',
        uploadUrl: '#',
        showPreview: false
    })

    //合作费返点比对
    $('#cooperate-upload').fileinput({
        language: 'zh',
        uploadUrl: '#',
        showPreview: false
    })
    //关闭预览效果
    $(document).on('click', '#kvFileinputModal .btn-close', function () {
        $('#kvFileinputModal').modal('hide');
    })


    //富文本编辑器
    KindEditor.ready(function (K) {
        K.create('#apply-info', {
            allowFileManager: true,
            resizeType: 0
        });
        K.create('#apply-explain', {
            allowFileManager: true,
            resizeType: 0
        });
    });

    //成绩添加
    function scoreAdd() {
        $('.score-add').on('click', function () {
            var scoreAdd = '<div class="col-sm-12 margin-top-20 scoreAppend">'
                + '<div class="col-sm-3">'
                + '<div class="input-group">'
                + '<input class="form-control date-picker examDate" type="text" placeholder="请选择考试时间">'
                + '<span class="input-group-addon">'
                + '<i class="fa fa-calendar"></i>'
                + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-3">'
                + '<select name="" class="form-control examSubject" placeholder="请选择考试科目">'
                + '<option value="">语文</option>'
                + '<option value="">数学</option>'
                + '<option value="">英语</option>'
                + '</select>'
                + '</div>'
                + '<div class="col-sm-3">'
                + '<input type="text" class="form-control examScore" placeholder="请输入分数">'
                + '</div>'
                + '<div class="col-sm-3 no-padding-left">'
                + '<label class="control-label"><a href="#" class="blue fa fa-check save-score"></a></label>'
                + '<label class="control-label"><a href="#" class="danger fa fa-times cancel-score"></a></label>'
                + '</div>'
                + '</div>';
            $('#scoreInfo').after(scoreAdd);
        });

        //保存
        $('.scoreManage').on('click', '.save-score', function () {
            var examDate = $('.scoreAppend .examDate').val();
            var examSubject = $('.scoreAppend .examSubject :selected').text();
            var examScore = $('.scoreAppend .examScore').val();
            var scoreTr = '<tr>'
                + '<td>' + examDate + '</td>'
                + '<td>' + examSubject + '</td>'
                + '<td>' + examScore + '</td>'
                + '</tr>';
            $('#scoreInfo tbody').append(scoreTr);
        })

        //取消
        $('.scoreManage').on('click', '.cancel-score', function () {
            $(this).parent().parent().parent().remove();
        })
    }
    scoreAdd();
})






