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
    })

    //报名时间段业绩比
    var applyDeeds = echarts.init(document.getElementById('applyDeeds'));
    applyDeeds.showLoading({
        text:'数据加载中.......',
        color:'rgba(0,0,0,.8)'
    });
    var applyDeeds_option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value +' '+ mark('#0e8c89') + params[4].seriesName + ' : ' + params[4].value + '% <br/>'
                       + mark('#fa903f') + params[1].seriesName + ' : ' + params[1].value +' '+ mark('#f4700b') + params[5].seriesName + ' : ' + params[5].value + '% <br/>'
                       + mark('#46b3f6') + params[2].seriesName + ' : ' + params[2].value +' '+ mark('#0779be') + params[6].seriesName + ' : ' + params[5].value + '% <br/>'
                       + mark('#b5c334') + params[3].seriesName + ' : ' + params[3].value +' '+ mark('#def602') + params[7].seriesName + ' : ' + params[5].value + '% <br/>'
            }
        },
        legend: {
            data: ['0-7天业绩', '8-14天业绩', '15-29天业绩', '29天后业绩', '0-7天业绩占比', '8-14天业绩占比', '15-29天业绩占比', '29天后业绩占比'],
            icon: 'rect',
            itemGap: 20,
            itemWidth: 12,
            itemHeight: 12,
            left: '4%',
            itemGap: 15,
            bottom: 0
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '12%',
            containLabel: true
        },
        color: ['#85d1cf', '#fa903f', '#46b3f6', '#b5c334', '#0e8c89', '#f4700b', '#0779be', '#def602'],
        xAxis: [
            {
                type: 'category',
                data: ['2016年1月', '2016年2月', '2016年3月', '2016年4月', '2016年5月', '2016年6月', '2016年7月', '2016年8月', '2016年9月', '2016年10月', '2016年11月', '2016年12月', '2017年1月', '2017年2月', '2017年3月', '2017年4月'],
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: '',
                type: 'value',
                min: 0,
                max: 10000000,
                interval: 1000000,
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                name: '',
                type: 'value',
                min: 0,
                max: 100,
                interval: 10,
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        dataZoom: [
            {
                id: 'dataZoomX',
                type: 'slider',
                y: "90%",
                filterMode: 'filter',
                start: 0,
                end: 100,
            }
        ],
        series: [
            {
                name: '0-7天业绩',
                type: 'bar',
                stack: "业绩合计",
                data: [3603989, 3303989, 6603989, 4603989, 1603989, 2603989, 1603989, 903989, 1203989, 1503989, 1803989, 1203989, 2603989, 2503989, 2703989, 1803989],
            },
            {
                name: '8-14天业绩',
                type: 'bar',
                stack: "业绩合计",
                data: [1603989, 2603989, 1403989, 1303989, 1003989, 903989, 1503989, 2603989, 3603989, 3603989, 3603989, 3603989, 3603989, 3603989, 3603989, 3603989],
            },
            {
                name: '15-29天业绩',
                type: 'bar',
                stack: "业绩合计",
                data: [2403989, 1603989, 3003989, 1103989, 2303989, 1203989, 2403989, 1603989, 1903989, 1503989, 1803989, 903989, 803989, 503989, 1103989, 1003989],
            },
            {
                name: '29天后业绩',
                type: 'bar',
                stack: "业绩合计",
                data: [1303989, 1203989, 1503989, 803989, 603989, 1103989, 1203989, 1103989, 1403989, 1503989, 2203989, 2403989, 2103989, 1503989, 2603989, 3363989],
            },
            {
                name: '0-7天业绩占比',
                type: 'line',
                symbol: 'circle',
                symbolSize: 5,
                yAxisIndex: 1,
                data: [84.1, 84.6, 87.1, 88.5, 74.3, 79.8, 84.5, 70.6, 74.1, 86.1, 84.5, 88.8, 89.3, 84.2, 81.6, 74.1],
            },
            {
                name: '8-14天业绩占比',
                type: 'line',
                symbol: 'circle',
                symbolSize: 5,
                yAxisIndex: 1,
                data: [2.9, 3.4, 4.2, 4.4, 3.6, 6.8, 4.5, 8.8, 9.8, 5.4, 6.1, 4.6, 6.4, 8.6, 3.8, 6.7],
            },
            {
                name: '15-29天业绩占比',
                type: 'line',
                symbolSize: 5,
                symbol: 'circle',
                yAxisIndex: 1,
                data: [12.9, 13.4, 24.2, 14.4, 13.6, 6.8, 14.5, 8.8, 9.8, 10.4, 16.1, 13.6, 19.4, 21.6, 21.8, 9.7],
            },
            {
                name: '29天后业绩占比',
                type: 'line',
                symbolSize: 5,
                symbol: 'circle',
                yAxisIndex: 1,
                data: [20.9, 23.4, 14.2, 24.4, 13.6, 16.8, 14.5, 18.8, 19.8, 25.4, 26.1, 14.6, 16.4, 28.6, 23.8, 16.7],
            }
        ]
    }
    applyDeeds.setOption(applyDeeds_option);
    applyDeeds.hideLoading();


    $(window).on('resize', function () {
        applyDeeds.resize();
    })

    //提示框标记
    function mark(bgc) {
        return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + bgc + '"></span>';
    }

    //公共条件固定
    $(window).scroll(function () {
        if (Math.floor($(window).scrollTop()) > 100) {
            $('.public-conditions').css({'position': 'fixed', 'width': '89%', 'z-index': 999999,'margin-left':'-21px','margin-top':'-20px'});
            $('.operate-data').css('margin-top', $('.public-conditions').height());
        }else{
            $('.public-conditions').css({'position': 'static', 'width': '100%', 'z-index': 9,'margin-left':0,'margin-top':0});
            $('.operate-data').css('margin-top', 0);
        }
    })

    //高级筛选切换
    $('.advanced-filter').on('click',function(){
        if($(this).find('i').is('.fa-angle-up')){
            $('.public-conditions .condition-filtrate').slideUp();
            $(this).html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
        }else{
            $('.public-conditions .condition-filtrate').slideDown();
            $(this).html('收起筛选<i class="fa fa-angle-up margin-left-5"></i>');
        }
    })
})
