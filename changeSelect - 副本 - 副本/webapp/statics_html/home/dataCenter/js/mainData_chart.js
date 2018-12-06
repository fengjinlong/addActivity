var refreshChart_1;
var refreshChart_2;
var refreshChart_3;
var refreshChart_4;

$(function(){

    //业绩合计
    refreshChart_1 = function(originHeader, originData, beforeHeader, beforeData){
    	var summaryData1 = echarts.init(document.getElementById('summaryData1'));
    	summaryData1.showLoading({
            text:'数据加载中.......',
            color:'rgba(0,0,0,.8)'
        });
        var summaryData1_option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    if ((params.length) == 2) {
                    	if(params[0].seriesName=="上一周期"){
                    		params[0].name = beforeHeader[params[0].dataIndex];
                    		params[0].value = beforeData[params[0].dataIndex];
                    	}else if(params[1].seriesName=="当前周期"){
                    		params[1].name = originHeader[params[1].dataIndex];
                    		params[1].value = originData[params[1].dataIndex];
                    	}
                    	var comparison = "-";
                    	if(params[0].value=="NaN"){
                    		params[0].value = 1;
                    	}
                    	if(typeof(params[0].value)=="number" && typeof(params[1].value)=="number" && params[0].value!=0){
                    		comparison = (100*(params[1].value - params[0].value)/params[0].value).toFixed(2);
                    	}
                        var comparisonBox = '<span>' + comparison + '</span><br/>';
                        if (comparison <= 0) {
                            comparisonBox = '<span class="comparisonDown">' + comparison + '%</span><br/>';
                        } else {
                            comparisonBox = '<span class="comparisonUp">' + comparison + '%</span><br/>';
                        }
                        return comparisonBox + params[1].name + ' <span class="current-week">' + params[1].value + '</span><br/>' + params[0].name + ' <span class="last-week">' + params[0].value + '</span>'
                    }
                    if ((params.length) == 1) {
                        if (params[0].seriesName == '上一周期') {
                        	params[0].name = beforeHeader[params[0].dataIndex];
                    		params[0].value = beforeData[params[0].dataIndex];
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="last-week">' + params[0].value;
                        } else {
                        	params[0].name = originHeader[params[0].dataIndex];
                    		params[0].value = originData[params[0].dataIndex];
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="current-week">' + params[0].value;
                        }
                    }
                }
            },
            legend: {
                data: ['上一周期', '当前周期'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 0,
                left: '8%',
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            grid: {
                left: '13%',
                right: '2%',
                top: 20,
            },
            color: ['#83bdf2', '#d1ecdc'],
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: originHeader,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }

                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
                    //min: 0,
                    //max: 4000000,
                    //interval: 1000000,
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
                }
            ],
            series: [
                {
                    name: '上一周期',
                    type: 'line',
                    symbol: 'circle',
                    lineStyle: {
                        normal: {
                            color: '#4fa7f9'
                        }
                    },
                    itemStyle: {
                        normal: {areaStyle: {type: 'default'}}
                    },
                    data: beforeData
                },
                {
                    name: '当前周期',
                    type: 'line',
                    symbol: 'circle',
                    lineStyle: {
                        normal: {
                            color: '#6cd2a8'
                        }
                    },
                    itemStyle: {
                        normal: {areaStyle: {type: 'default'}}
                    },
                    data: originData
                }

            ]
        };

        summaryData1.setOption(summaryData1_option);
        summaryData1.hideLoading();

        //图表插件屏幕自适应
        $(window).on('resize', function () {
            summaryData1.resize();
        })
    }
    

    //费比
	refreshChart_2 = function(originHeader, originData, beforeHeader, beforeData){
		var summaryData2 = echarts.init(document.getElementById('summaryData2'));
    	summaryData2.showLoading({
            text:'数据加载中.......',
            color:'rgba(0,0,0,.8)'
        });
        var summaryData2_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    var week = params[0].name;
                    if ((params.length) == 2) {
                    	if(params[0].seriesName=="上一周期"){
                    		params[0].name = beforeHeader[params[0].dataIndex];
                    		params[0].value = beforeData[params[0].dataIndex];
                    	}else if(params[1].seriesName=="当前周期"){
                    		params[1].name = originHeader[params[1].dataIndex];
                    		params[1].value = originData[params[1].dataIndex];
                    	}
                    	var comparison = "-";
                    	if(params[0].value=="NaN"){
                    		params[0].value = 1;
                    	}
                    	if(typeof(params[0].value)=="number" && typeof(params[1].value)=="number" && params[0].value!=0){
                    		comparison = (100*(params[1].value - params[0].value)/params[0].value).toFixed(2);
                    	}
                        var comparisonBox = '<span>' + comparison + '</span><br/>';
                        if (comparison <= 0) {
                            comparisonBox = '<span class="comparisonDown">' + comparison + '%</span><br/>';
                        } else {
                            comparisonBox = '<span class="comparisonUp">' + comparison + '%</span><br/>';
                        }
                        return comparisonBox + params[1].name + ' <span class="current-week">' + params[1].value + '</span><br/>' + params[0].name + ' <span class="last-week">' + params[0].value + '</span>'
                    }
                    if ((params.length) == 1) {
                        if (params[0].seriesName == '上一周期') {
                            
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="last-week">' + params[0].value;
                        } else {
                            
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="current-week">' + params[0].value;
                        }
                    }
                }
            },
            legend: {
                data: ['上一周期', '当前周期'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 0,
                left: '8%',
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            grid: {
                right: '2%',
                top: 20,
            },
            color: ['#83bdf2', '#d1ecdc'],
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: originHeader,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }

                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 25,
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#b1b1b1'],
                            type: 'dashed'
                        }
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
                    name: '上一周期',
                    type: 'bar',
                    lineStyle: {
                        normal: {
                            color: '#4fa7f9'
                        }
                    },
                    data: beforeData
                },
                {
                    name: '当前周期',
                    type: 'bar',
                    lineStyle: {
                        normal: {
                            color: '#6cd2a8'
                        }
                    },
                    data: originData
                }

            ]
        };

        summaryData2.setOption(summaryData2_option);
        summaryData2.hideLoading();

        //图表插件屏幕自适应
        $(window).on('resize', function () {
            summaryData2.resize();
        })
    }
    


    //电转
    refreshChart_3 = function(originHeader, originData, beforeHeader, beforeData){
    	var summaryData3 = echarts.init(document.getElementById('summaryData3'));
    	summaryData3.showLoading({
            text:'数据加载中.......',
            color:'rgba(0,0,0,.8)'
        });
        var summaryData3_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    var week = params[0].name;
                    if ((params.length) == 2) {
                    	if(params[0].seriesName=="上一周期"){
                    		params[0].name = beforeHeader[params[0].dataIndex];
                    		params[0].value = beforeData[params[0].dataIndex];
                    	}else if(params[1].seriesName=="当前周期"){
                    		params[1].name = originHeader[params[1].dataIndex];
                    		params[1].value = originData[params[1].dataIndex];
                    	}
                    	var comparison = "-";
                    	if(params[0].value=="NaN"){
                    		params[0].value = 1;
                    	}
                    	if(typeof(params[0].value)=="number" && typeof(params[1].value)=="number" && params[0].value!=0){
                    		comparison = (100*(params[1].value - params[0].value)/params[0].value).toFixed(2);
                    	}
                        var comparisonBox = '<span>' + comparison + '</span><br/>';
                        if (comparison <= 0) {
                            comparisonBox = '<span class="comparisonDown">' + comparison + '%</span><br/>';
                        } else {
                            comparisonBox = '<span class="comparisonUp">' + comparison + '%</span><br/>';
                        }
                        return comparisonBox + params[1].name + ' <span class="current-week">' + params[1].value + '</span><br/>' + params[0].name + ' <span class="last-week">' + params[0].value + '</span>'
                    }
                    if ((params.length) == 1) {
                        if (params[0].seriesName == '上一周期') {
                            
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="last-week">' + params[0].value;
                        } else {
                            
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="current-week">' + params[0].value;
                        }
                    }
                }
            },
            legend: {
                data: ['上一周期', '当前周期'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 0,
                left: '8%',
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            grid: {
                right: '2%',
                top: 20,
                left: '8%'
            },
            color: ['#83bdf2', '#d1ecdc'],
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: originHeader,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
                    //min: 6,
                    //max: 16,
                    //interval: 2,
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
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
            ],
            series: [
                {
                    name: '上一周期',
                    type: 'line',
                    symbol: 'circle',
                	data: beforeData
                },
                {
                    name: '当前周期',
                    type: 'bar',
                    data: originData
                }

            ]
        };

        summaryData3.setOption(summaryData3_option);
        summaryData3.hideLoading();

        //图表插件屏幕自适应
        $(window).on('resize', function () {
            summaryData3.resize();
        })
    }
    

    //面转
    refreshChart_4 = function(originHeader, originData, beforeHeader, beforeData){
    	var summaryData4 = echarts.init(document.getElementById('summaryData4'));
    	summaryData4.showLoading({
            text:'数据加载中.......',
           color:'rgba(0,0,0,.8)'
        });
        var summaryData4_option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var week = params[0].name;
                    if ((params.length) == 2) {
                    	if(params[0].seriesName=="上一周期"){
                    		params[0].name = beforeHeader[params[0].dataIndex];
                    		params[0].value = beforeData[params[0].dataIndex];
                    	}else if(params[1].seriesName=="当前周期"){
                    		params[1].name = originHeader[params[1].dataIndex];
                    		params[1].value = originData[params[1].dataIndex];
                    	}
                    	var comparison = "-";
                    	if(params[0].value=="NaN"){
                    		params[0].value = 1;
                    	}
                    	if(typeof(params[0].value)=="number" && typeof(params[1].value)=="number" && params[0].value!=0){
                    		comparison = (100*(params[1].value - params[0].value)/params[0].value).toFixed(2);
                    	}
                        var comparisonBox = '<span>' + comparison + '</span><br/>';
                        if (comparison <= 0) {
                            comparisonBox = '<span class="comparisonDown">' + comparison + '%</span><br/>';
                        } else {
                            comparisonBox = '<span class="comparisonUp">' + comparison + '%</span><br/>';
                        }
                        return comparisonBox + params[1].name + ' <span class="current-week">' + params[1].value + '</span><br/>' + params[0].name + ' <span class="last-week">' + params[0].value + '</span>'
                    }
                    if ((params.length) == 1) {
                        if (params[0].seriesName == '上一周期') {
                            
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="last-week">' + params[0].value;
                        } else {
                            
                            return params[0].name + '<br>' + params[0].seriesName + ' <span class="current-week">' + params[0].value;
                        }
                    }
                }
            },
            legend: {
                data: ['上一周期', '当前周期'],
                icon: 'rect',
                itemGap: 20,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 0,
                left: '8%',
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            grid: {
                right: '2%',
                top: 20,
                left: '8%'
            },
            color: ['#83bdf2', '#5ecb9e'],
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    //data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    data: originHeader,
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 20,
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
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
            ],
            series: [
                {
                    name: '上一周期',
                    type: 'line',
                    symbol: 'circle',
                    //data: [63, 95, 54, 90, 85, 56, 88]
                    data: beforeData
                },
                {
                    name: '当前周期',
                    type: 'line',
                    symbol: 'circle',
                    //data: [88, 98, 75, 36, 65, 38, 59]
                	data: originData
                }

            ]
        };

        summaryData4.setOption(summaryData4_option);
        summaryData4.hideLoading();

        //图表插件屏幕自适应
        $(window).on('resize', function () {
            summaryData4.resize();
        })
    }
});