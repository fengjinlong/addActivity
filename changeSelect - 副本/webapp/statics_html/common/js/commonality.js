//数据加载效果
function loading(elemnt) {
    $(elemnt).mLoading({
        text: '正在加载中，请稍后......',
        icon: ctx_static+"/common/image/loading5.gif"
    });
}

//隐藏数据加载
function hideLoading(elemnt) {
    $(elemnt).mLoading('hide');    
}

/**
 * 表格数据加载效果
 * @param elemnt 表格id
 * @param colspan 每行列数
 * @returns
 */
function loadingTable(elemnt, colspan) {
    $(elemnt).find("tbody").html("<tr><td height='100' colspan='" + colspan + "' class='text-center' style='line-height:300px;'></td></tr>");
    $(elemnt).find("tbody td").mLoading({
        text: '正在加载中，请稍后......',
        icon: ctx_static+"/common/image/loading5.gif"
    });
}


/**
 * 信息提示插件
 * @param type 类型
 * @param tipsText 提示信息
 * @returns
 */
function infoTips(type,tipsText){
    if(type == 'warning'){
        imageSrc = ctx_static+"/common/image/warning.png";
    }
    if(type == 'success'){
        imageSrc = ctx_static+"/common/image/success.png";
    }
    if(type == 'error'){
        imageSrc = ctx_static+"/common/image/error.png";
    }
    swal({
        title: "",
        text: tipsText,
        imageUrl: imageSrc,
        html: true,
        timer: 1000,
        showConfirmButton: false
    });
}


/**
 * ajax请求失败，返回信息
 * @param textStatus
 */
function ajaxError(msg) {
    var textStatus = msg.statusText;
    switch (textStatus) {
        case "timeout":
            textStatus = '请求超时';
            break;
        case "error":
            textStatus = '请求错误';
            break;
        case "abort":
            textStatus = '请求中止';
            break;
        case "parsererror":
            textStatus = '参数解析错误';
            break;
        case " ":
            textStatus = '请求异常';
            break;
        case "Bad Request":
            textStatus = '请求错误';
        default:
            textStatus = '请求错误';
    }
    infoTips('error',textStatus);
}

/**
 * 起止日期
 * @param ele
 * @param separator
 * @returns
 */
function durationDate(ele,separator){
    $(ele).daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' '+separator+' ',
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

    $(ele).on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' '+separator+' ' + picker.endDate.format('YYYY-MM-DD'));
    });
}

/**
 * 时间格式化
 */
function jsDateFormat1(val){
	var date=new Date(parseInt(val)); 
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    month = month < 10 ? ('0' + month) : month;  
    var day = date.getDate();  
    day = day < 10 ? ('0' + day) : day;  
    var hour = date.getHours();  
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var seconde=date.getSeconds();
    seconde = seconde < 10 ? ('0' + seconde) : seconde;
    return year + '-' + month + '-' + day; 
    /* return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde;  */
}

/**
 * 随机生成uuId
 * @param length 长度
 * @param radix 基数
 * @returns {string}
 */
function uuId(length, radix) {
    var millisecond = (new Date().getTime() + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz").split('');
    var uuidArr = [], i, r;
    radix = radix || millisecond.length;

    if (length) {
        for (i = 0; i < length; i++) {
            uuidArr[i] = millisecond[0 | Math.random() * radix];
        }
    } else {
        uuidArr[8] = uuidArr[13] = uuidArr[18] = uuidArr[23] = '-';
        for (i = 0; i < 36; i++) {
            if (!uuidArr[i]) {
                r = 0 | Math.random() * 16;
                uuidArr[i] = millisecond[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuidArr.join('');
}
/**
 * 时间格式化
 */
function jsDateFormat(val){
	var date=new Date(parseInt(val)); 
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    month = month < 10 ? ('0' + month) : month;  
    var day = date.getDate();  
    day = day < 10 ? ('0' + day) : day;  
    var hour = date.getHours();  
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var seconde=date.getSeconds();
    seconde = seconde < 10 ? ('0' + seconde) : seconde;
    return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde; 
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if(hour >= 0 && hour <= 9){
    	hour = "0" + hour;
    }
    if(minute >= 0 && minute <= 9){
    	minute = "0" + minute;
    }
    if(second >= 0 && second <= 9){
    	second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}

//基础ajax调用类
var baseAjax = function () {
    return {
        simpleAjax:function(url,data){
        	var obj = ''; 
        	$.ajax({
                url: ctx + url,
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (data) {
                	obj = data;
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        	return obj;
        },
        getAjax:function(url,data){
        	var obj = ''; 
        	$.ajax({
                url: ctx + url,
                async: false,
                data: data,
                dataType: 'json',
                success: function (data) {
                	obj = data;
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        	return obj;
        }
    };
}();

//横线滚动条
function HScrollBar(ele){
	$(ele).on('scroll',function(){
		$(ele).find('.dataTables_paginate').css({'margin-right':-$(this).scrollLeft()});
	})
}

/**
 * 下拉框多选初始化
 */
function multiSelect() {
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '反选',
        'noneSelectedText': ''
    });
}

