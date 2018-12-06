//各组业绩
var chart_departmentChart;
//业绩转换率关系表
var chart_performanceConversionRateChart;
//咨询团队业绩占比
var chart_departmentBingChart;

$(function () {

    //各组业绩

    chart_departmentChart = function (dataHeader, dataContent) {
        var groupDeeds = echarts.init(document.getElementById('groupDeeds'));

        groupDeeds.showLoading({
            text: '数据加载中.......',
            color: 'rgba(0,0,0,.8)'
        });

        var groupDeeds_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['业绩合计'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: '8%'
            },
            grid: {
                left: '3%',
                right: '8%',
                top: 30,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                position: 'top',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#b1b1b1'],
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                //data: ['大创业团队', '郑州团队', '学慧网团队', '十里河团队', '分校', '集团'],
                data: dataHeader,
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    name: '业绩合计',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = [
                                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#4fa7f9',
                                    '#6ac09a'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    //data: [800000, 1100000, 3500000, 4700000, 7400000, 7900000]
                    data: dataContent
                }
            ]
        };
        groupDeeds.setOption(groupDeeds_option);
        groupDeeds.hideLoading();

        $(window).on('resize', function () {
            groupDeeds.resize();
        })
    }

    //业绩转换率关系表
    chart_performanceConversionRateChart = function (dataHeader, moneyContent, dianContent, mianContent) {
        var counselorDeeds = echarts.init(document.getElementById('counselorDeeds'));

        counselorDeeds.showLoading({
            text: '数据加载中.......',
            color: 'rgba(0,0,0,.8)'
        });
        var counselorDeeds_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#fa903f') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
//	                    + mark('#46b3f6') + params[2].seriesName + ' : ' + params[2].value + '%';
//	            }
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                },
                right: 20
            },
            legend: {
                data: ['业绩合计', '电转', '面转'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: '8%'
            },
            grid: {
                left: '3%',
                right: '8%',
                top: 40,
                containLabel: true
            },
            color: ['#85d1cf', '#fa903f', '#46b3f6'],
            xAxis: [
                {
                    type: 'category',
                    //  data: ['2016/12/1', '2016/12/2', '2016/12/3', '2016/12/4', '2016/12/5', '2016/12/6', '2016/12/7', '2016/12/8', '2016/12/9', '2016/12/10', '2016/12/11', '2016/12/12', '2016/12/13', '2016/12/14', '2016/12/15', '2016/12/16', '2016/12/17', '2016/12/18', '2016/12/19', '2016/12/20'],
                    data: dataHeader,
                    axisTick: {
                        show: false
                    },
                    //设置字体倾斜
                    axisLabel:{
                        interval:0,
                        //rotate:45,//倾斜度 -90 至 90 默认为0
                        //margin:2
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 400000,
//	                interval: 100000,
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
//	                min: 0,
//	                max: 100,
//	                interval: 25,
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
            series: [
                {
                    name: '业绩合计',
                    type: 'bar',
                    // data: [225297, 165297, 175247, 185597, 228643, 128643, 50643, 285597, 315597, 355597, 235597, 195597, 175597, 185597, 255597, 225597, 295597, 315597, 325597, 285597],
                    data: moneyContent
                },
                {
                    name: '电转',
                    type: 'line',
                    yAxisIndex: 1,
                    // data: [69, 64, 67, 71, 79, 70, 67, 69, 68, 66, 60, 58, 59, 62, 63, 65, 68, 58, 72, 68],
                    data: dianContent
                },
                {
                    name: '面转',
                    type: 'line',
                    yAxisIndex: 1,
                    //  data: [15.1, 13.7, 13.3, 16.2, 18, 12, 6, 26, 20, 30, 28, 27, 26, 25, 28, 27, 26, 28, 29, 30],
                    data: mianContent
                }
            ]
        }
        counselorDeeds.setOption(counselorDeeds_option);
        counselorDeeds.hideLoading();

        $(window).on('resize', function () {
            counselorDeeds.resize();
        })
    }

    //咨询团队业绩占比
    chart_departmentBingChart = function (dataHeader, dataContent) {
        var teamDeeds = echarts.init(document.getElementById('teamDeeds'));
        teamDeeds.showLoading({
            text: '数据加载中.......',
            color: 'rgba(0,0,0,.8)'
        });
        var teamDeeds_option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                left: 'left',
                icon: 'rect',
                bottom: 0,
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                // data: ['集团', '十里河团队', '学慧网团队', '郑州团队', '分校', '大创业团队']
                data: dataHeader
            },
            grid: {
                left: '3%',
                right: '8%',
                top: 0,
                containLabel: true
            },
//	        color: ['#85d1cf', '#fa903f', '#46b3f6', '#fcce10', '#b5c334', '#c1232b'],
            series: [
                {
                    name: '业绩合计',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '40%'],
                    /*		                data: [
                     {value: 6516888, name: '集团'},
                     {value: 6116458, name: '十里河团队'},
                     {value: 5716458, name: '学慧网团队'},
                     {value: 3316458, name: '郑州团队'},
                     {value: 2816458, name: '分校'},
                     {value: 1616458, name: '大创业团队'}
                     ],*/
                    data: dataContent,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal: {
                            label: {
                                formatter: '{b} ({d}%)'
                            }
                        }
                    }
                }
            ]
        };
        teamDeeds.setOption(teamDeeds_option);
        teamDeeds.hideLoading();

        $(window).on('resize', function () {
            teamDeeds.setOption(teamDeeds_option);
        })
    }

    //提示框标记
    function mark(bgc) {
        return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + bgc + '"></span>';
    }
});

