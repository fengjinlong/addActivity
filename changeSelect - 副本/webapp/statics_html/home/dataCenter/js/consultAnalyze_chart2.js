//业绩-面转趋势图
var chart_deedsCollapse;
//业绩-成本趋势图
var chart_deedsCost;
//业绩-投入产出趋势图
var chart_deedsInput;
//业绩-咨询量趋势图
var chart_deedsInquiries;
//业绩-损耗比趋势图
var chart_deedsLossRatio;
//咨询师业绩排名
var chart_counselorDeeds1;
//咨询师业绩与转化率关系表
var chart_counselorDeeds2;
//各项目业绩排名
var chart_projectDeeds;
//各项目业绩
var chart_projectDeeds1;
//各项目组分时间段业绩及转化率情况
var chart_counselorDeeds3;
//咨询团队电转排名
var chart_teamPhone;
//合格面转校区
var chart_qualifiedCollapse;
//不合格 面转校区
var chart_disqualificationCollapse;

$(function () {
    //业绩-面转趋势图

    chart_deedsCollapse = function (xData, yejihejiData, mianZhuanData, mianZhuanHegeData) {
        var deedsCollapse = echarts.init(document.getElementById('deedsCollapse'));
        deedsCollapse.showLoading({
            text: '数据加载中.......',
            color: 'rgba(0,0,0,.8)'
        });
        var deedsCollapse_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#46b3f6') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
//	                    + mark('red') + params[2].seriesName + ' : ' + params[2].value + '%';
//	            }
            },
            legend: {
                left: 'left',
                icon: 'rect',
                bottom: 0,
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                data: ['业绩合计', '面转', '面转合格线']
                //data: legendData
            },
            grid: {
                left: '5%',
                right: '5%',
                containLabel: true
            },
//	        color: ['#85d1cf', '#46b3f6', 'red'],
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                //data: ['北京', '上海', '西安', '成都', '深圳', '南京', '苏州'],
                data: xData,
                axisTick: {
                    show: false
                }
            },
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
                    axisTick: {
                        show: false
                    },
                    axisLine: {
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
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '业绩合计',
                    type: 'bar',
                    //data: [350000, 300000, 280000, 180000, 160000, 140000, 120000],
                    data: yejihejiData
                },
                {
                    name: '面转',
                    type: 'line',
                    //data: [60, 86, 70, 65, 64, 82, 58],
                    data: mianZhuanData,
                    yAxisIndex: 1
                },
                {
                    name: '面转合格线',
                    type: 'line',
                    symbolSize: 0,
                    //data: [70, 70, 70, 70, 70, 70, 70],
                    data: mianZhuanHegeData,
                    yAxisIndex: 1
                },
            ]
        };
        deedsCollapse.setOption(deedsCollapse_option);
        deedsCollapse.hideLoading();

        $(window).on('resize', function () {
            deedsCollapse.setOption(deedsCollapse_option);
        })
    }


    //业绩-成本趋势图

    chart_deedsCost = function (xData, adsFeeData, yejiHeJiData, chengBenData, chengBenBiaoZhunData) {
        var deedsCost = echarts.init(document.getElementById('deedsCost'));
        var deedsCost_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#46b3f6') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
//	                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
//	                    + mark('#fd6966') + params[3].seriesName + ' : ' + params[3].value + '%';
//	            }
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
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
                left: 'left',
                icon: 'rect',
                bottom: 0,
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                data: ['广告费', '业绩合计', '成本', '成本标准线']
            },
            grid: {
                left: '5%',
                right: '5%',
                containLabel: true
            },
//	        color: ['#85d1cf', '#46b3f6', '#fa903f', '#fd6966'],

            xAxis: [
                {
                    name: '',
                    type: 'category',
                    //data: ['北京', '上海', '西安', '成都', '深圳', '南京', '苏州'],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 700000,
//	                interval: 100000,
//	                axisLabel: {
//	                    formatter: '{value}'
//	                },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 350,
//	                interval: 50,
//	                axisLabel: {
//	                    formatter: '{value}'
//	                },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '广告费',
                    type: 'bar',
                    //data: [100000, 120000, 110000, 100000, 100000, 80000, 90000],
                    data: adsFeeData
                },
                {
                    name: '业绩合计',
                    type: 'bar',
                    //data: [350000, 300000, 280000, 180000, 160000, 140000, 120000]
                    data: yejiHeJiData
                },
                {
                    name: '成本',
                    type: 'line',
                    yAxisIndex: 1,
                    //data: [150.9, 120.8, 104.6, 108.5, 99.0, 83.8, 99.2]
                    data: chengBenData
                },
                {
                    name: '成本标准线',
                    type: 'line',
                    yAxisIndex: 1,
                    symbolSize: 0,
                    //data: [100, 100, 100, 100, 100, 100, 100]
                    data: chengBenBiaoZhunData
                }
            ]
        };
        deedsCost.setOption(deedsCost_option);
    }


    //业绩-投入产出趋势图
    chart_deedsInput = function (xData, adsFeeData, yejiHeJiData, inOutRateData, inOutHeGeData) {
        var deedsInput = echarts.init(document.getElementById('deedsInput'));
        var deedsInput_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#46b3f6') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
//	                    + mark('#fa903f') + params[2].seriesName + ' : ' + params[2].value + '% <br/>'
//	                    + mark('#fd6966') + params[3].seriesName + ' : ' + params[3].value + '%';
//	            }
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
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
                left: 'left',
                icon: 'rect',
                bottom: 0,
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                data: ['广告费', '业绩合计', '投入产出倍数', '投入产出倍数合格线']
            },
            grid: {
                left: '5%',
                right: '5%',
                containLabel: true
            },
            color: ['#85d1cf', '#46b3f6', '#fa903f', '#fd6966'],

            xAxis: [
                {
                    name: '',
                    type: 'category',
                    //data: ['2016 1', '2016 2', '2016 3', '2016 4', '2016 5', '2016 6', '2016 7'],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 700000,
//	                interval: 100000,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 350,
//	                interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '广告费',
                    type: 'bar',
                    //data: [100000, 120000, 110000, 100000, 100000, 80000, 90000],
                    data: adsFeeData
                },
                {
                    name: '业绩合计',
                    type: 'bar',
//	                data: [350000, 300000, 280000, 180000, 160000, 140000, 120000],
                    data: yejiHeJiData
                },
                {
                    name: '投入产出倍数',
                    type: 'line',
                    yAxisIndex: 1,
//	                data: [150.9, 120.8, 104.6, 108.5, 99.0, 83.8, 99.2]
                    data: inOutRateData
                },
                {
                    name: '投入产出倍数合格线',
                    type: 'line',
                    yAxisIndex: 1,
                    symbolSize: 0,
                    //data: [120.8, 120.8, 120.8, 120.8, 120.8, 120.8, 120.8],
                    data: inOutHeGeData
                }
            ]
        };
        deedsInput.setOption(deedsInput_option);
    }


    //业绩-咨询量趋势图
    chart_deedsInquiries = function (xData, yejiHeJiData, ziXunLiangData) {
        var deedsInquiries = echarts.init(document.getElementById('deedsInquiries'));
        var deedsInquiries_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 'left',
                icon: 'rect',
                bottom: 0,
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                data: ['业绩合计', '咨询量']
            },
            grid: {
                left: '5%',
                right: '5%',
                containLabel: true
            },
            color: ['#85d1cf', '#46b3f6'],
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                //data: ['2016 1', '2016 2', '2016 3', '2016 4', '2016 5', '2016 6', '2016 7'],
                data: xData,
                axisTick: {
                    show: false
                }
            },
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 500000,
//	                interval: 100000,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 50000,
//	                interval: 10000,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '业绩合计',
                    type: 'bar',
                    //data: [350000, 300000, 280000, 180000, 160000, 140000, 120000],
                    data: yejiHeJiData
                },
                {
                    name: '咨询量',
                    type: 'line',
//	                data: [20008, 32008, 42006, 25078, 29808, 22808, 32804],
                    data: ziXunLiangData,
                    yAxisIndex: 1
                }
            ]
        };
        deedsInquiries.setOption(deedsInquiries_option);
    }


    //业绩-损耗比趋势图
    chart_deedsLossRatio = function (xData, yejiHeJiData, sunHaoRateData, sunHaoHeGeData) {
        var deedsLossRatio = echarts.init(document.getElementById('deedsLossRatio'));
        var deedsLossRatio_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#85d1cf') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#46b3f6') + params[1].seriesName + ' : ' + params[1].value + '% <br/>'
//	                    + mark('#fd6966') + params[2].seriesName + ' : ' + params[2].value + '%';
//	            }
            },
            legend: {
                left: 'left',
                icon: 'rect',
                bottom: 0,
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                data: ['业绩合计', '损耗比', '损耗比合格线']
            },
            grid: {
                left: '5%',
                right: '5%',
                containLabel: true
            },
            color: ['#85d1cf', '#46b3f6', '#fd6966'],
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
//	            data: ['2016 1', '2016 2', '2016 3', '2016 4', '2016 5', '2016 6', '2016 7'],
                data: xData,
                axisTick: {
                    show: false
                }
            },
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 500000,
//	                interval: 100000,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 2.5,
//	                interval: 0.5,
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '业绩合计',
                    type: 'bar',
//	                data: [350000, 300000, 280000, 180000, 160000, 140000, 120000],
                    data: yejiHeJiData
                },
                {
                    name: '损耗比',
                    type: 'line',
//	                data: [0.3245, 1.8245, 1.3245, 1.6245, 0.5645, 0.3545, 2.4245],
                    data: sunHaoRateData,
                    yAxisIndex: 1
                },
                {
                    name: '损耗比合格线',
                    type: 'line',
                    yAxisIndex: 1,
                    symbolSize: 0,
//	                data: [0.5645, 0.5645, 0.5645, 0.5645, 0.5645, 0.5645, 0.5645]
                    data: sunHaoHeGeData
                }
            ]
        };
        deedsLossRatio.setOption(deedsLossRatio_option);
    }


    //咨询师业绩排名

    chart_counselorDeeds1 = function (yData, yejiHeJiData) {
        var counselorDeeds1 = echarts.init(document.getElementById('counselorDeeds1'));
        var counselorDeeds1_option = {
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
//	            data: ['安永', '杨超', '陈华', '张国军', '丽文', '郝志强'],
                data: yData,
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
//	                data: [80000, 110000, 350000, 470000, 740000, 790000]
                    data: yejiHeJiData
                }
            ]
        };
        counselorDeeds1.setOption(counselorDeeds1_option);
    }


    // 咨询师业绩与转化率关系表 

    chart_counselorDeeds2 = function (xData, yejiData, dianZhuanData, mianZhuanData) {
        var counselorDeeds2 = echarts.init(document.getElementById('counselorDeeds2'));
        var counselorDeeds2_option = {
            tooltip: {
                trigger: 'axis',
//    	            formatter: function (params) {
//    	                var team = '';
//    	                var group = ['张萌', '杨冰冰', '房进', '董宏伟', '李贵峰', '张焕', '陈华', '陈荣贵'];
//    	                var brancSchool = ['贾鑫', '王蕾', '王大伟', '樊迪', '梁立勇', '程亚丽'];
//    	                var slh = ['廉西明', '辛欣', '胡亚飞', '张美凤'];
//    	                var xhw = ['慕雪城', '贺燕光', '黄志豪', '张艳超', '王建强',];
//    	                var zhGroup = ['张丹丹', '刘洋', '李立功', '陆盈盈'];
//    	                if ($.inArray(params[0].name, group) != -1) {
//    	                    team = '集团';
//    	                } else if ($.inArray(params[0].name, brancSchool) != -1) {
//    	                    team = '分校';
//    	                } else if ($.inArray(params[0].name, slh) != -1) {
//    	                    team = '十里河团队';
//    	                } else if ($.inArray(params[0].name, xhw) != -1) {
//    	                    team = '学慧网团队';
//    	                } else if ($.inArray(params[0].name, zhGroup) != -1) {
//    	                    team = '郑州团队';
//    	                }
//    	                return params[0].name + '<br/>' + mark('' + params[0].color + '') + '团队：' + team + '<br/>' + mark('' + params[0].color + '') + '业绩：' + params[0].value + '<br/>' + mark('' + params[1].color + '') + ' 电转：' + params[1].value + '% <br>' + mark('' + params[2].color + '') + ' 面转：' + params[2].value + '% <br>';
//    	            }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                },
                right: 20
            },
            legend: {
                data: ['业绩', '电转', '面转'],
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
//    	        color: ['#d569bd', '#c9615d'],
            xAxis: [
                {
                    type: 'category',
//    	                data: ['慕雪城', '王蕾', '王大伟', '李贵峰', '张焕', '陈华', '陈荣贵', '贾鑫', '樊迪', '梁立勇', '辛欣', '程亚丽', '廉西明', '胡亚飞', '张美凤', '房进', '董宏伟', '贺燕光', '黄志豪', '王建强', '张萌', '杨冰冰', '张丹丹', '刘洋', '李立功', '陆盈盈', '张艳超'],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
//    	                min: 0,
//    	                max: 400000,
//    	                interval: 100000,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    }
                },
                {
                    name: '',
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 25,
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
                    name: '业绩',
                    type: 'bar',
//    	                itemStyle: {
//    	                    normal: {
//    	                        color: function (params) {
//    	                            var colorList = ['#6ac09a', '#4fa7f9', '#E87C25', '#FCCE10', '#B5C334', '#C1232B'];
//    	                            var group = ['张萌', '杨冰冰', '房进', '董宏伟', '李贵峰', '张焕', '陈华', '陈荣贵'];
//    	                            var brancSchool = ['贾鑫', '王蕾', '王大伟', '樊迪', '梁立勇', '程亚丽'];
//    	                            var slh = ['廉西明', '辛欣', '胡亚飞', '张美凤'];
//    	                            var xhw = ['慕雪城', '贺燕光', '黄志豪', '张艳超', '王建强',];
//    	                            var zhGroup = ['张丹丹', '刘洋', '李立功', '陆盈盈'];
//    	                            if ($.inArray(params.name, group) != -1) {
//    	                                return colorList[0];
//    	                            } else if ($.inArray(params.name, brancSchool) != -1) {
//    	                                return colorList[1];
//    	                            } else if ($.inArray(params.name, slh) != -1) {
//    	                                return colorList[2];
//    	                            } else if ($.inArray(params.name, xhw) != -1) {
//    	                                return colorList[3];
//    	                            } else if ($.inArray(params.name, zhGroup) != -1) {
//    	                                return colorList[4];
//    	                            }
//    	                        }
//    	                    }
//    	                },
//    	                data: [360000, 320000, 300000, 280000, 270000, 250000, 240000, 230000, 210000, 200000, 200000, 190000, 180000, 170000, 160000, 150000, 140000, 130000, 120000, 110000, 100000, 90000, 80000, 80000, 70000, 60000, 50000]
                    data: yejiData
                },
                {
                    name: '电转',
                    type: 'line',
                    yAxisIndex: 1,
                    data: dianZhuanData
//    	                data: [15.7, 21.3, 27.6, 40.5, 27.2, 30.9, 26.1, 26.5, 27.6, 29.9, 24.2, 30.1, 22.6, 12.4, 37.7, 10.8, 10.3, 9.4, 31.2, 19.4, 7.8, 23.8, 20.1, 23.3, 20.6, 30.3, 24.3],
                },
                {
                    name: '面转',
                    type: 'line',
                    yAxisIndex: 1,
                    data: mianZhuanData
//    	                data: [74, 80, 71, 72, 66, 60, 63, 68, 68, 55, 84, 75, 68, 60, 70, 62, 67, 56, 57, 76, 73, 64, 72, 77, 65, 78, 63]
                }
            ]
        }
        counselorDeeds2.setOption(counselorDeeds2_option);
    }


    //各项目业绩排名

    chart_projectDeeds = function (yData, yejiHeJiData) {
        var projectDeeds = echarts.init(document.getElementById('projectDeeds'));
        var projectDeeds_option = {
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
//		            data: ['06会计', '29教师', '其他项目', '10理财', '02营养', '01人力', '03学历', '05心理'],
                data: yData,
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
                                    '#f56e6a', '#74f9f7', '#C1232B', '#B5C334', '#FCCE10',
                                    '#E87C25', '#4fa7f9', '#6ac09a'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
//		                data: [800000, 1100000, 2500000, 3500000, 5762712, 6762712, 7400000, 7800000]
                    data: yejiHeJiData
                }
            ]
        };
        projectDeeds.setOption(projectDeeds_option);
    }


    //各项目业绩

    chart_projectDeeds1 = function (legendData, yData, seriesData) {
        var projectDeeds1 = echarts.init(document.getElementById('projectDeeds1'));
        var projectDeeds1_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
//    	            data: ['大创业团队', '分校', '集团', '十里河团队', '学慧网团队', '郑州团队'],
                data: legendData,
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: '4%'
            },
            grid: {
                left: '3%',
                right: '8%',
                top: 30,
                bottom: 80,
                containLabel: true
            },
//    	        color: ['#6ac09a', '#4fa7f9', '#E87C25', '#FCCE10', '#B5C334', '#C1232B'],
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    }
                }
            },
            yAxis: {
                type: 'category',
//    	            data: ['06会计', '29教师', '其他项目', '10理财', '02营养', '01人力', '03学历', '05心理'],
                data: yData,
                axisTick: {
                    show: false
                }
            },
            series: seriesData
//    	        	[
//    	            {
//    	                name: '大创业团队',
//    	                type: 'bar',
//    	                stack: '总量',
//    	                data: [913220, 313220, 2130220, 1213220, 1813220, 2130220, 2213220, 963220]
//    	            },
//    	            {
//    	                name: '分校',
//    	                type: 'bar',
//    	                stack: '总量',
//    	                data: [613220, 3132200, 2130220, 1513220, 2832020, 830220, 2213220, 1533220]
//    	            },
//    	            {
//    	                name: '集团',
//    	                type: 'bar',
//    	                stack: '总量',
//    	                data: [813220, 2213220, 2130220, 1213220, 1830220, 1830220, 2213220, 1213220]
//    	            },
//    	            {
//    	                name: '十里河团队',
//    	                type: 'bar',
//    	                stack: '总量',
//    	                data: [1813220, 1513220, 2530220, 1213220, 1530220, 1513220, 183220, 1830220]
//    	            },
//    	            {
//    	                name: '学慧网团队',
//    	                type: 'bar',
//    	                stack: '总量',
//    	                data: [1213220, 913220, 1513220, 183220, 1300220, 2130220, 1213220, 2113220]
//    	            },
//    	            {
//    	                name: '郑州团队',
//    	                type: 'bar',
//    	                stack: '总量',
//    	                data: [813220, 1313220, 2130220, 1513220, 1583220, 830220, 2213220, 2143220]
//    	            }
//    	        ]
        };
        projectDeeds1.setOption(projectDeeds1_option);
    }


    //各项目组分时间段业绩及转化率情况
    chart_counselorDeeds3 = function (legendData, xData, seriesData) {
        var counselorDeeds3 = echarts.init(document.getElementById('counselorDeeds3'));
        var counselorDeeds3_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#6ac09a') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#4fa7f9') + params[1].seriesName + ' : ' + params[1].value + '<br/>'
//	                    + mark('#E87C25') + params[2].seriesName + ' : ' + params[2].value + '<br/>'
//	                    + mark('#FCCE10') + params[3].seriesName + ' : ' + params[3].value + '<br/>'
//	                    + mark('#B5C334') + params[4].seriesName + ' : ' + params[4].value + '<br/>'
//	                    + mark('#C1232B') + params[3].seriesName + ' : ' + params[5].value + '<br/>'
//	                    + mark('#d569bd') + params[6].seriesName + ' : ' + params[6].value + '% <br/>'
//	                    + mark('#c9615d') + params[7].seriesName + ' : ' + params[7].value + '% <br/>'
//	            }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                },
                right: 20
            },
            legend: {
//	            data: ['大创业团队', '分校', '集团', '十里河团队', '学慧网团队', '郑州团队', '电转', '面转'],
                data: legendData,
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: 0
            },
//	        color: ['#6ac09a', '#4fa7f9', '#E87C25', '#FCCE10', '#B5C334', '#C1232B', '#d569bd', '#c9615d'],
            grid: {
                right: '8%',
                top: 50,
                bottom: 100
            },
            xAxis: [
                {
                    type: 'category',
//	                data: ['2017 9', '1017 10', '2017 11', '2017 12', '1017 13', '2017 14'],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 4000000,
//	                interval: 1000000,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    },
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
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    },
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
            series: seriesData
//	        	[
//	            {
//	                name: '大创业团队',
//	                type: 'bar',
//	                data: [1216888, 2616888, 3816888, 1516888, 2116888, 286888],
//	            },
//
//	            {
//	                name: '分校',
//	                type: 'bar',
//	                data: [2616888, 1616888, 3216888, 1516888, 1886888, 1816888],
//	            },
//
//	            {
//	                name: '集团',
//	                type: 'bar',
//	                data: [3816888, 2916888, 3516888, 1516888, 1386888, 1216888],
//	            },
//
//	            {
//	                name: '十里河团队',
//	                type: 'bar',
//	                data: [1516888, 1916888, 3216888, 1616888, 2286888, 1616888],
//	            },
//
//	            {
//	                name: '学慧网团队',
//	                type: 'bar',
//	                data: [1916888, 2616888, 3116888, 2816888, 2286888, 2316888],
//	            },
//
//	            {
//	                name: '郑州团队',
//	                type: 'bar',
//	                data: [2116888, 1416888, 2816888, 1916888, 1886888, 2416888],
//	            },
//
//	            {
//	                name: '电转',
//	                type: 'line',
//	                symbol: 'circle',
//	                yAxisIndex: 1,
//	                data: [14.9, 12.5, 14.6, 11.5, 10.8, 7.6],
//	            },
//	            {
//	                name: '面转',
//	                type: 'line',
//	                symbol: 'circle',
//	                yAxisIndex: 1,
//	                data: [30, 63, 76, 50, 69, 57],
//	            }
//	        ]
        }
        counselorDeeds3.setOption(counselorDeeds3_option);
    }


    //咨询团队电转排名

    chart_teamPhone = function (xData, ziXunLiangData, dianZhuanData) {
        var teamPhone = echarts.init(document.getElementById('teamPhone'));
        var teamPhone_option = {
            tooltip: {
                trigger: 'axis',
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#83bdf2') + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//	                    + mark('#d1ecdc') + params[1].seriesName + ' : ' + params[1].value + '%';
//	            }
            },
            legend: {
                data: ['咨询量', '电转'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: 0
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            color: ['#83bdf2', '#d1ecdc'],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
//	                data: ["大创业团队", "集团", "学慧网团队", "郑州团队", "十里河团队"],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
//	                min: 0,
//	                max: 25000,
//	                interval: 5000,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                {
                    name: '',
                    type: 'value',
//	                min: 6,
//	                max: 16,
//	                interval: 2,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '咨询量',
                    type: 'line',
                    areaStyle: {normal: {}},
                    lineStyle: {
                        normal: {
                            color: '#4fa7f9'
                        }
                    },
//	                data: [6511, 20088, 12674, 24012, 10231],
                    data: ziXunLiangData
                },
                {
                    name: '电转',
                    type: 'line',
                    areaStyle: {normal: {}},
                    lineStyle: {
                        normal: {
                            color: '#6cd2a8'
                        }
                    },
                    yAxisIndex: 1,
//	                data: [11.6, 11.0, 10.5, 9.8, 6.6],
                    data: dianZhuanData
                }
            ]
        };

        teamPhone.setOption(teamPhone_option);
    }


    /**
     * 合格面转校区
     */
    chart_qualifiedCollapse = function (xData, mianZhuanData) {
        var qualifiedCollapse = echarts.init(document.getElementById('qualifiedCollapse'));
        var qualifiedCollapse_option = {
            tooltip: {
                trigger: 'axis',
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#d1ecdc') + params[0].seriesName + ' : ' + params[0].value + '%';
//	            }
            },
            legend: {
                data: ['面转'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: 0
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            color: ['#d1ecdc'],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
//	                data: ["北京", "上海", "天津", "宝鸡", "衡阳", "长沙", "西安", "哈尔滨", "大连", "成都", "太原", "沈阳", "长春", "徐州", "深圳"],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
//	                min: 0,
//	                max: 100,
//	                interval: 20,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '面转',
                    type: 'line',
                    symbol: 'circle',
                    areaStyle: {normal: {}},
                    lineStyle: {
                        normal: {
                            color: '#6cd2a8'
                        }
                    },
//	                data: [100, 89, 87, 85, 76, 78, 72, 68, 69, 76, 78, 88, 78, 88, 85],
                    data: mianZhuanData
                }
            ]
        };
        qualifiedCollapse.setOption(qualifiedCollapse_option);
    }

    /**
     * 不合格面转校区
     */

    chart_disqualificationCollapse = function (xData, mianZhuanData) {
        var disqualificationCollapse = echarts.init(document.getElementById('disqualificationCollapse'));
        var disqualificationCollapse_option = {
            tooltip: {
                trigger: 'axis',
//	            formatter: function (params) {
//	                return params[0].name + '<br/>' + mark('#d1ecdc') + params[0].seriesName + ' : ' + params[0].value + '%';
//	            }
            },
            legend: {
                data: ['面转'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                left: '4%',
                itemGap: 20,
                bottom: 0
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            color: ['#83bdf2'],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
//	                data: ["石家庄", "合肥", "常州", "青岛"],
                    data: xData,
                    axisTick: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
//	                min: 0,
//	                max: 100,
//	                interval: 20,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '面转',
                    type: 'line',
                    symbol: 'circle',
                    areaStyle: {normal: {}},
                    lineStyle: {
                        normal: {
                            color: '#4fa7f9'
                        }
                    },
//	                data: [55, 43, 12, 2],
                    data: mianZhuanData
                }
            ]
        };
        disqualificationCollapse.setOption(disqualificationCollapse_option);
    }

    //提示框标记
    function mark(bgc) {
        return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + bgc + '"></span>';
    }

    //图表插件屏幕自适应
    $(window).on('resize', function () {
//        groupDeeds.resize();
//        counselorDeeds.resize();
//        deedsCollapse.resize();
//        deedsCost.resize();
//        deedsInput.resize();
//        deedsInquiries.resize();
//        deedsLossRatio.resize();
//        counselorDeeds1.resize();
//        counselorDeeds2.resize();
//        projectDeeds.resize();
//        counselorDeeds3.resize();
//        teamPhone.resize();
//        qualifiedCollapse.resize();
//        disqualificationCollapse.resize();
    })
});

