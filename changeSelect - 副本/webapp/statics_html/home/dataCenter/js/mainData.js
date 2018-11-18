$(function () {
    //日期控件
    $('#timeQuantum').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
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

    //日期确定按钮
    $('#timeQuantum').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));

        //今天、昨天、最近7天、最近30天
        var dateValue = picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD');
        var today = moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');
        var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(1, 'days').format('YYYY-MM-DD')
        var recently7 = moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');
        var recently30 = moment().subtract(29, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');

        //今天
        if (dateValue == today) {
            $('.today-btn').addClass('active').siblings().removeClass('active');
        }
        //昨天
        if (dateValue == yesterday) {
            $('.yesterday-btn').addClass('active').siblings().removeClass('active');
        }
        //最近7天
        if (dateValue == recently7) {
            $('.recent7-btn').addClass('active').siblings().removeClass('active');
        }

        //最近30天
        if (dateValue == recently30) {
            $('.recent30-btn').addClass('active').siblings().removeClass('active');
        }


        //按天
        var startDay = picker.startDate.dayOfYear();
        var endDay = picker.endDate.dayOfYear();
        if ((endDay - startDay) > 29) {
            $('.date-btn a').removeClass('active');
        }

    });

    //默认显示今天的日期
    $('#timeQuantum').val(moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));

    //最近日期切换
    $('.date-btn a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).text()) {
            case '今天' :
                $('#timeQuantum').val(moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
            case '昨天' :
                $('#timeQuantum').val(moment().subtract(1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(1, 'days').format('YYYY-MM-DD'));
                break;
            case '最近7天' :
                $('#timeQuantum').val(moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
            case '最近30天' :
                $('#timeQuantum').val(moment().subtract(29, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
        }
        return false;
    })

    //按天、周、月日期切换
    $('.interval a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).text()) {
            case '按周' :

                break;
            case '按月' :

                break;
            case '按季度' :

                break;
            case '按年' :

                break;
        }
        return false;
    });

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    });


    //维度切换
    $('.dimensionality').chosen({disable_search: true});

    dimensionality('.summaryData1');
    dimensionality('.summaryData2');
    dimensionality('.summaryData3');
    dimensionality('.summaryData4');

    function dimensionality(ele) {
        $(ele).find('.current-dimension').text($(ele).find('.dimensionality option:selected').text());
        $(ele).find('.widget-caption').text($(ele).find('.dimensionality option:selected').text() + '趋势图');
        $(ele).find('.dimensionality').on("change", function () {
            $(ele).find('.current-dimension').text($(ele).find('.dimensionality option:selected').text());
            $(ele).find('.widget-caption').text($(ele).find('.dimensionality option:selected').text() + '趋势图');
        });
    }

    //总数据量点击查看各分校数据
    $('.aggregate-data').on('click', '.collapse-btn', function () {
        if ($(this).is('.fa-plus-square-o')) {
            $(this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
            $('.aggregate-data .campusData').slideDown();
        } else {
            $(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            $('.aggregate-data .campusData').slideUp();
        }
    })


    //公共条件固定
    $(window).scroll(function () {
        if (Math.floor($(window).scrollTop()) > 24) {
            $('.public-conditions').css({
                'position': 'fixed',
                'width': '89%',
                'z-index': 999999,
                'margin-left': '-21px',
                'margin-top': '-20px'
            });
            $('.advanced-filter').css('margin-right',70);
            $('.aggregate-data').css('margin-top', $('.public-conditions').height());
        } else {
            $('.public-conditions').css({
                'position': 'static',
                'width': '100%',
                'z-index': 9,
                'margin-left': 0,
                'margin-top': 0
            });
            $('.advanced-filter').css('margin-right',0);
            $('.aggregate-data').css('margin-top', 0);
        }
    })


    //高级筛选切换
    $('.public-conditions .condition-filtrate').slideUp(0);
    $('.advanced-filter').on('click', function () {
        if ($(this).find('i').is('.fa-angle-down')) {
            $('.public-conditions .condition-filtrate').slideDown();
            $(this).html('收起筛选<i class="fa fa-angle-up margin-left-5"></i>');
        } else {
            $('.public-conditions .condition-filtrate').slideUp();
            $(this).html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
        }
    })
})
