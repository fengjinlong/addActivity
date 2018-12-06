$(function () {
    var national = [
        "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
        "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
        "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
        "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
    ];
    initNations();
    initNation();
    function initNations() {
        var nat = document.getElementById("nations");
        for (var i = 0; i < national.length; i++) {
            var option = document.createElement('option');
            var txt = document.createTextNode(national[i]);
            option.value = national[i];
            option.appendChild(txt);
            nat.appendChild(option);
        }
    }

    function initNation() {
        var nat = document.getElementById("nation");
        for (var i = 0; i < national.length; i++) {
            var option = document.createElement('option');
            var txt = document.createTextNode(national[i]);
            option.value = national[i];
            option.appendChild(txt);
            nat.appendChild(option);
        }
        $('#nations').trigger('chosen:updated');
        $("#nations").chosen({no_results_text: "没有匹配项"});
        $('.chosen-container').width('100%');
    }

    //初始化学历
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 3},
        dataType: 'json',
        success: function (data) {
            var xl = "";
            for (var i = 0; i < data.list.length; i++) {
                xl += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrId3").html('<option value="">--请选择--</option>' + xl);
        },
        error: function (response) {
            toastr.error("系统错误");
            
        }
    });
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 3},
        dataType: 'json',
        success: function (data) {
            var xl = "";
            for (var i = 0; i < data.list.length; i++) {
                xl += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrName32").html('<option value="">--请选择--</option>' + xl);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    /*数据初始化*/
    $("#table11 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#table11 tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    $("#table11 tbody").addClass('loadOver');
    roleChoose("1,2,3,8,11");
    initCount('week');
    sumCount();	
    
    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '反选',
        'noneSelectedText': '没有匹配项'
    });
    
    //高级筛选切换
    $('.condition-filtrate').slideUp(0);
    function advancedFilter(parentEle){
    	$(parentEle).find('.advanced-filter').on('click', function () {
            if ($(this).find('i').is('.fa-angle-down')) {
            	$(parentEle).find('.condition-filtrate').stop().slideDown();
                $(this).html('收起筛选<i class="fa fa-angle-up margin-left-5"></i>');
            } else {
            	$(parentEle).find('.condition-filtrate').stop().slideUp();
                $(this).html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
            }
        })
    }
    
    advancedFilter('#home11');
    advancedFilter('#profile11');
    advancedFilter('#education');
    advancedFilter('#shangmen');
    advancedFilter('#dingzuo');
    advancedFilter('#baoming');
    
    //固定按钮切换
    $('.right-toolbar a').hover(function () {
        $(this).find('.up').stop().fadeIn(400);
	 }, function () {
	        $(this).find('.up').stop().fadeOut(400);
	})
	    
    //攻略
    $(".strategy-btn").on("click", function () {
        $(".aaa,.bs-example-modal-lga").animate({"margin-left": "-15%"});
        $(".strategy").animate({"margin-left": "53.4%"});
        $(".strategy").css({"z-index": 1051});
        initGL();
    });

    $('.strategy').on('show.bs.modal', function () {
        $('.aaa,.bs-example-modal-lga').css('z-index', 1050);
    }).on('hide.bs.modal', function () {
        $(".aaa,.bs-example-modal-lga").animate({"margin-left": 0}, 500);
    })


    $('.professionView,.educationView').on('show.bs.modal', function () {
        $('.strategy').css('z-index', 1039);
        $('.aaa,.bs-example-modal-lga').css('z-index', 1050);
    }).on('hide.bs.modal', function () {
        $('.strategy').css('z-index', 1050);
    })
    //关闭弹窗同时关闭攻略
    $('.aaa').on('hide.bs.modal', function () {
    	 $('.strategy').modal('hide');
    })
    //关闭弹窗展开所有信息
    $('.bs-example-modal-lga,.bs-example-modal-lg1').on('hide.bs.modal', function () {
        $('.well>.header').next('div').css('display', 'block');
        $('.well>.header').next('table').css('display', 'table');
    })
    
    //分校、项目、级别
    $('.strategy .branchSchool').chosen({no_results_text: "没有匹配项"});
    $('.strategy .project').chosen({no_results_text: "没有匹配项"});
    $('.strategy .grade').chosen({no_results_text: "没有匹配项"});


    $('#newAdd').click(function () {
        $('.addInquiries').toggle();
        $('#inquiries').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
        $('#addprovince').val('');
        $('#addcity').val('');
        conversation.html('');
        $('.chosen-select').trigger('chosen:updated');
        addinit();
        $('#inquiries').data('bootstrapValidator').resetForm();
    });
    $('.payment .fa').hide();
    $('.btn_special_edit').click(function () {
        $('.payment select,.payment input').removeAttr('disabled');
        $('.payment .fa').show();
        $('.paymentInfo td .payment .fa-minus-circle').hide();
    })

    $('#addSecondDiv').on('hidden.bs.modal', function () {
        $('#addSecondDiv .chosen-select').attr({"disabled": true});
        $('#addSecondDiv .chosen-select').trigger('chosen:updated');
    })

    //点击报名回到顶部
    $('.apply-btn').click(function () {
        $('#buttonStatus2').val('');
        $('.bs-example-modal-lg1 .modal-content .modal-body').animate({'scrollTop': 0}, 800, 'swing');
        
        if ($(this).find('i').is('.fa-baoming')) {
            if (formValidator()) {
                $('#buttonStatus2').val('7');
                //$('#upshir2').click();
                formUpdate.baoming();
            }
        }
        if ($(this).find('i').is('.fa-dingzuo')) {
            if (formValidator()) {
                $('#dztr').show();
                $('#buttonStatus2').val('6');
                //$('#upshir2').click();
                formUpdate.dingzuo();
            }
        }
    });
    preferentialType('.preferential');
    preferentialType('.holidayPromo');

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
    //期待回访日期
    $(".recordnexttime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        startDate: new Date()
    });

    //回访时间
    $("#recordNextTime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii',
        startDate: new Date(),
        autoclose: true
    });

    //转为预约时间
    Date.prototype.Format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {

            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

        }
        for (var k in o) {

            if (new RegExp("(" + k + ")").test(format)) {

                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

            }

        }
        return format;
    }

    var currentTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var phoneDay = currentTime.split(' ')[0].split('-')[2] * 1 + 7;
    var endTime = currentTime.split(' ')[0].split('-')[0] + "-" + currentTime.split(' ')[0].split('-')[1] + "-" + phoneDay + " " + currentTime.split(' ')[1];
    $("#subscribeDate").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii:ss',
        startDate: new Date(),
        autoclose: true
    })

    $('#subscribeDate').datetimepicker('setStartDate', new Date());
    $('#subscribeDate').datetimepicker('setEndDate', endTime);

    //下次缴费时间
    $(".paymentTime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii:ss',
        autoclose: true,
        startDate: new Date()
    })

    $('.datetimepicker').on('click',function(){
        $('.bs-example-modal-lg4').css('z-index', 1055);
        $('.bs-example-modal-lga').css('z-index', 1039);
    })
    //转为预约弹窗层级
    $('.subscribe,.dropIn,.recordIn').on('show.bs.modal', function () {
        $('.bs-example-modal-lg,.bs-example-modal-lg1,.bs-example-modal-lg1').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.bs-example-modal-lg,.bs-example-modal-lg1,.bs-example-modal-lg1').css('z-index', 1050);
    });

    $('.orders-list').find('li,div .row,li a').click(function () {
        var id = $(this).find('span[id^=span]')[0].id;
        $('#myTab11').find('li span[id=' + id + ']').parent('a').click();
    });

    $('#myTab11').find('li a').click(function () {
        $('.condition-filtrate').slideUp(0);
        $('.advanced-filter').html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
        if (this.id == "tab_11") {
            $('.bs-example-modal-lg1 .widget-caption').html('待沟通');
            if(!$("#table11 tbody").hasClass('loadOver')){
	            $("#table11 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	            $("#table11 tbody>tr>td").mLoading({
	                text: '正在加载中，请稍后......',
	                icon: "../statics_html/common/image/loading5.gif"
	            });
            }else{
            	$("#table11").mLoading({
    	          	text: '正在加载中，请稍后......',
    	          	icon: "../statics_html/common/image/loading5.gif"
            	});
            	$('#table11 .mloading-mask').css({
            		'top':'40px',
            		'background-color':'rgba(233, 233, 232, 0.5)'
            	});
            }
            init();
            $("#table11").mLoading('hide');
            roleChoose("1,2,3,8,11");
            $('#reservation').val('');
        }
        if (this.id == "tab_22") {
            $('.bs-example-modal-lg1 .widget-caption').html('已沟通');
            if(!$("#table22 tbody").hasClass('loadOver')){
            	 $("#table22 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
                 $("#table22 tbody>tr>td").mLoading({
                     text: '正在加载中，请稍后......',
                     icon: "../statics_html/common/image/loading5.gif"
                 });
            }else{
            	$("#table22").mLoading({
    	          	text: '正在加载中，请稍后......',
    	          	icon: "../statics_html/common/image/loading5.gif"
            	});
            	$('#table22 .mloading-mask').css({
            		'top':'40px',
            		'background-color':'rgba(233, 233, 232, 0.5)'
            	});
            }
            init2();
            $("#table22 tbody").addClass('loadOver');
            $("#table22").mLoading('hide');
            roleChoose("1,2,3,4,8,11");
            $('#reservation1').val('');
            $('[data-toggle="tooltip"]').tooltip();
        }
        if (this.id == "tab_33") {
            $('.bs-example-modal-lg1 .widget-caption').html('预约单');
            if(!$("#table33 tbody").hasClass('loadOver')){
	            $("#table33 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	            $("#table33 tbody>tr>td").mLoading({
	                text: '正在加载中，请稍后......',
	                icon: "../statics_html/common/image/loading5.gif"
	            });
            }else{
            	$("#table33").mLoading({
    	          	text: '正在加载中，请稍后......',
    	          	icon: "../statics_html/common/image/loading5.gif"
            	});
            	$('#table33 .mloading-mask').css({
            		'top':'40px',
            		'background-color':'rgba(233, 233, 232, 0.5)'
            	});
            }
            init3();
            $("#table33 tbody").addClass('loadOver');
            $("#table33").mLoading('hide');
            roleChoose("1,2,3,5,6,7,8,11");
            $('#reservation2').val('');
        }
        if (this.id == "tab_44") {
            $('.bs-example-modal-lg1 .widget-caption').html('上门');
            if(!$("#table44 tbody").hasClass('loadOver')){
	            $("#table44 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	            $("#table44 tbody>tr>td").mLoading({
	                text: '正在加载中，请稍后......',
	                icon: "../statics_html/common/image/loading5.gif"
	            });
            }else{
            	$("#table44").mLoading({
    	          	text: '正在加载中，请稍后......',
    	          	icon: "../statics_html/common/image/loading5.gif"
            	});
            	$('#table44 .mloading-mask').css({
            		'top':'40px',
            		'background-color':'rgba(233, 233, 232, 0.5)'
            	});
            }
            init4();
            $("#table44 tbody").addClass('loadOver');
            $("#table44").mLoading('hide');
            roleChoose("1,2,3,5,6,7,8,9,11");
            $('#reservation3').val('');
        }
        if (this.id == "tab_55") {
            $('.bs-example-modal-lg1 .widget-caption').html('订座');
            if(!$("#table55 tbody").hasClass('loadOver')){
	            $("#table55 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	            $("#table55 tbody>tr>td").mLoading({
	                text: '正在加载中，请稍后......',
	                icon: "../statics_html/common/image/loading5.gif"
	            });
            }else{
            	$("#table55").mLoading({
    	          	text: '正在加载中，请稍后......',
    	          	icon: "../statics_html/common/image/loading5.gif"
            	});
            	$('#table55 .mloading-mask').css({
            		'top':'40px',
            		'background-color':'rgba(233, 233, 232, 0.5)'
            	});
            }
            init5();
            $("#table55 tbody").addClass('loadOver');
            $("#table55").mLoading('hide');
            roleChoose("1,2,3,7,8,9,11");
            $('#reservation4').val('');
        }
        if (this.id == "tab_66") {
            $('.bs-example-modal-lg1 .widget-caption').html('报名');
            if(!$("#table66 tbody").hasClass('loadOver')){
	            $("#table66 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	            $("#table66 tbody>tr>td").mLoading({
	                text: '正在加载中，请稍后......',
	                icon: "../statics_html/common/image/loading5.gif"
	            });
            }else{
            	$("#table66").mLoading({
    	          	text: '正在加载中，请稍后......',
    	          	icon: "../statics_html/common/image/loading5.gif"
            	});
            	$('#table66 .mloading-mask').css({
            		'top':'40px',
            		'background-color':'rgba(233, 233, 232, 0.5)'
            	});
            }
            init6();
            $("#table66 tbody").addClass('loadOver');
            $("#table66").mLoading('hide');
            roleChoose("1,2,3,8,9,10,11");
            $('#reservation5').val('');
        }
    });
    function roleChoose(val) {
        var str = val.split(',');
        $('#ultab2').find('li').each(function () {
            $(this).hide();
        });
        for (var i = 0; i < str.length; i++) {
            $('#upli2' + str[i]).show();
        }
    }


    //电话归属地
    $("#addphoneBelong").on({
        focus: function () {
            $('#communicationPhone').fadeIn();
        },
        click: function () {
            $('#communicationPhone').fadeIn();
        },
    });

    //所在地
    $("#departmentId11").on({
        focus: function () {
            $('.attribution').fadeIn();
        },
        click: function () {
            $('.attribution').fadeIn();
        },
    });

    $("#departmentId12").on({
        focus: function () {
            $('#secondDivCity').fadeIn();
        },
        click: function () {
            $('#secondDivCity').fadeIn();
        },
    });

    //考试地区
    $("#examRegion").on({
        focus: function () {
            $('#examATB').fadeIn();
        },
        click: function () {
            $('#examATB').fadeIn();
        },
    });
    function phoneBelong(parentEle) {
        $(parentEle).find('.attribution .confirm-btn').click(function () {
            if (chose_get_value(parentEle + ' .province') != 0 && chose_get_value(parentEle + ' .city') != 0) {
                $(parentEle).find('.phoneBelong').val(chose_get_text(parentEle + ' .province') + chose_get_text(parentEle + ' .city'));
                $(parentEle).find('.attribution').fadeOut();
            }
        });
        $(parentEle).find('.attribution .cancel-btn').click(function () {
            $(parentEle).find('.attribution').fadeOut();
        });

    }

    function ininexamCity1() {
        $('#secondDivYes').click(function () {
            if (chose_get_value('#secondDivCity .province') != 0 && chose_get_value('#secondDivCity .city') != 0) {
                $('#departmentId12').val(chose_get_text('#secondDivCity .province') + chose_get_text('#secondDivCity .city'));
                $('#secondDivCity').fadeOut();
            }
        })
        $('#secondDivNo').click(function () {
            $('#secondDivCity').fadeOut();
        })
    }

    function ininexamCity() {
        $('#examYes').click(function () {
            if (chose_get_value('#examATB .province') != 0 && chose_get_value('#examATB .city') != 0) {
                $('#examRegion').val(chose_get_text('#examATB .city'));
                $('#examRegionId2').val(chose_get_value('#examATB .city'));
                $('#examATB').fadeOut();
            }
        })
        $('#examNo').click(function () {
            $('#examATB').fadeOut();
        })
    }

    ininexamCity1();
    ininexamCity();
    phoneBelong('#addFirstDiv');
    //初始化招生品牌
    $.ajax({
        url: ctx + '/bizBrand/getAllOption',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
            }
            $("#brandId").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化电话归属地（省）
    $.ajax({
        url: ctx + '/address/getAllOption',
        type: 'POST',
        data: {level: 1},
        dataType: 'json',
        success: function (data) {
            var sheng = "";
            for (var i = 0; i < data.list.length; i++) {
                sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
            }
            $("#province").html('<option value="0">--请选择--</option>' + sheng);
            $("#province2").html('<option value="0">--请选择--</option>' + sheng);
            $("#province3").html('<option value="0">--请选择--</option>' + sheng);
            $(".province").trigger('chosen:updated');
            $(".province").chosen();
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化电话归属地（市）
    $('#province').change(function () {
        var addressId = $('#province :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#city").html('<option value="">--请选择--</option>' + shi);
                $('#city').trigger('chosen:updated');
                $("#city").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //初始化电话归属地（市）
    $('#province2').change(function () {
        var addressId = $('#province2 :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#city2").html('<option value="">--请选择--</option>' + shi);
                $('#city2').trigger('chosen:updated');
                $("#city2").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //初始化电话归属地（市）
    $('#province3').change(function () {
        var addressId = $('#province3 :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#city3").html('<option value="">--请选择--</option>' + shi);
                $('#city3').trigger('chosen:updated');
                $("#city3").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });


    $('#classId1').change(function () {
        var obj = $(this).find(':selected');
        $('#classPrice1').val('');
        $('#classAttr1').val(obj.text());
        $('#classPrice1').val(obj.attr("price") == 'undefind' ? '不可用' : obj.attr("price"));
    });

    $('#kTime1').change(function () {
        var obj = $(this).find(':selected');
        $('#kTimeValue1').val('');
        $('#kTimeValue1').val(obj.text());
    });

    /**********预约单操作联动***********/

    $('#project2').chosen().change(function () {
        $('#projectName2').val($(this).find(':selected').text());
        $('#projectLevel2').find('option').remove();
        $('#classId2').find('option').remove();
        
       
        var type = $(this).find('option:selected').attr('type');
        if (type == '2') {
            $('div[id^=divchange]').show();
        } else {
            $('div[id^=divchange]').hide();
        }
        var def = new Option("--请选择--", '');
        document.getElementById("projectLevel2").options.add(def, 0);
        
        $('#schoolFormId').find('option').remove();
        var def = new Option("--请选择--", '');
        document.getElementById("schoolFormId").options.add(def, 0);
        
        $('#proFormId').find('option').remove();
        var def = new Option("--请选择--", '');
        document.getElementById("proFormId").options.add(def, 0);
        
        var def = new Option("--请选择--", '');
        document.getElementById("classId2").options.add(def, 0);
        $.ajax({
            url: ctx + "/bizScale/loadProjectLevel",
            data: {"projectId": $('#project2').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                    $(o).attr("type", data[i].teachType);
                    document.getElementById("projectLevel2").options.add(o);
                }
               
                $('#projectLevel2').trigger('chosen:updated');
                $("#projectLevel2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');

                $('#eduForm').val(0);

               

              

              
                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
    });

    $('#zybranchSchool').chosen().change(function () {
        //initglTablezy();
    });
    $('#xlbranchSchool').chosen().change(function () {
        //initglTablexl();
    });

    $('#zyproject').chosen().change(function () {
        $('#zyprojectleven').find('option').remove();
        $('#zyproduct').find('option').remove();
        
        var def = new Option("--请选择--", '');
        document.getElementById("zyprojectleven").options.add(def, 0);

        var def = new Option("--请选择--", '');
        document.getElementById("zyproduct").options.add(def, 0);
        $.ajax({
            url: ctx + "/bizScale/loadProjectLevel",
            data: {"projectId": $('#zyproject').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                    document.getElementById("zyprojectleven").options.add(o);
                }
              
                $('#zyproduct').trigger('chosen:updated');

                $('#zyprojectleven').trigger('chosen:updated');
                $("#zyprojectleven").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
        //initglTablezy();
    });

    $('#xlproject').chosen().change(function () {
        $('#xlprojectleven').find('option').remove();
        $('#xlschoolForm').find('option').remove();
        $('#xlmajorForm').find('option').remove();
        $('#xlclassForm').find('option').remove();
        
        var def = new Option("--请选择--", '');
        document.getElementById("xlprojectleven").options.add(def, 0);

        var def = new Option("--请选择--", '');
        document.getElementById("xlschoolForm").options.add(def, 0);
        
        var def = new Option("--请选择--", '');
        document.getElementById("xlclassForm").options.add(def, 0);
        
        $.ajax({
            url: ctx + "/bizScale/loadProjectLevel",
            data: {"projectId": $('#xlproject').val()},
            dataType: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                    document.getElementById("xlprojectleven").options.add(o);
                }
                
                $('#xlschoolForm').trigger('chosen:updated');

                var def = new Option("--请选择--", '');
                document.getElementById("xlmajorForm").options.add(def, 0);
                $('#xlclassForm').trigger('chosen:updated');

              
                $('#xlclassForm').trigger('chosen:updated');

                $('#xlprojectleven').trigger('chosen:updated');
                $("#xlprojectleven").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
       // initglTablexl();
    });

    $('#zyprojectleven').chosen().change(function () {
        $('#zyproduct').find('option').remove();
        
        var def = new Option("--请选择--", '');
        document.getElementById("zyproduct").options.add(def, 0);
        $.ajax({
            url: ctx + '/bizProduct/loadProductPrice',
            type: 'POST',
            data: {
                projectId: $('#zyproject').val(),
                projectLevelId: $('#zyprojectleven').val(),
                schoolId: $('#schoolId2').val(),
                addressId: $('#examRegionId2').val()
            },
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    document.getElementById("zyproduct").options.add(o);
                }
                
                $('#zyproduct').trigger('chosen:updated');
                $("#zyproduct").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
       // initglTablezy();
    });

    $('#zyproduct').chosen().change(function () {
        //initglTablezy();
    });

    $('#xlprojectleven').chosen().change(function () {
        $('#xlschoolForm').find('option').remove();
        $('#xlmajorForm').find('option').remove();
        $('#xlclassForm').find('option').remove();
        $('#educationForm').val(0);
        //initglTablexl();
        var def = new Option("--请选择--", '');
        document.getElementById("xlmajorForm").options.add(def, 0);
        $('#xlmajorForm').trigger('chosen:updated');

        var def = new Option("--请选择--", '');
        document.getElementById("xlschoolForm").options.add(def, 0);
        $('#xlschoolForm').trigger('chosen:updated');

        var def = new Option("--请选择--", '');
        document.getElementById("xlclassForm").options.add(def, 0);
        $('#xlclassForm').trigger('chosen:updated');
    });
    $('#projectLevel2').chosen().change(function () {
        $('#projectLevelName2').val($(this).find(':selected').text());
        $('#classId2').find('option').remove();
        $('#kTime2').find('option').remove();
        $('#schoolFormId').find('option').remove();
        $('#proFormId').find('option').remove();
        $.ajax({
            url: ctx + '/bizProduct/loadProductPrice',
            type: 'POST',
            data: {
                projectId: $('#project2').val(),
                projectLevelId: $('#projectLevel2').val(),
                schoolId: $('#schoolId2').val(),
                addressId: $('#examRegionId2').val()
            },
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    var price = "";
                    var examFee = 0;
                    var arPrice = eval(data[i].price);
                    if (arPrice != null) {
                        for (var k = 0; k < arPrice.length; k++) {
                            if (arPrice[k] != "null" && arPrice[k] != null) {
                                if (arPrice[k].id == "2") {
                                    if (arPrice[k].price != "null" && arPrice[k].price != "0.0" && arPrice[k].price != null) {
                                        price = price + arPrice[k].price;
                                    } else {
                                        price = price + eval((data[i].examFee == null ? 0 : data[i].examFee));
                                        examFee = eval(data[i].examFee == null ? 0 : data[i].examFee);
                                    }
                                } else {
                                    price = eval(price + (arPrice[k].price == null ? 0 : arPrice[k].price));
                                }
                            }
                        }
                    }
                    $(o).attr("examFee", examFee);
                    $(o).attr("priceList", data[i].price);
                    $(o).attr("price", price);
                    document.getElementById("classId2").options.add(o);
                }
                var def = new Option("--请选择--", '');
                $(def).attr("selected", "selected");
                document.getElementById("classId2").options.add(def, 0);
                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');

                $('#eduForm').val(0);

                $('#schoolFormId').find('option').remove();
                var def = new Option("--请选择--", '');
                document.getElementById("schoolFormId").options.add(def, 0);

                $('#proFormId').find('option').remove();
                var def = new Option("--请选择--", '');
                document.getElementById("proFormId").options.add(def, 0);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });

        $.ajax({
            url: ctx + "/bizExamSetting/load",
            type: 'POST',
            data: {
                projectLevelId: $('#projectLevel2').val()
            },
            dataType: "json",
            success: function (data) {
                var data = data.returnObject.aaData;
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].examDate, data[i].examSettingId);
                    document.getElementById("kTime2").options.add(o);
                }
                var def = new Option("--请选择--", '');
                $(def).attr("selected", "selected");
                document.getElementById("kTime2").options.add(def, 0);
                $('#kTime2').trigger('chosen:updated');
                $("#kTime2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
    });

    $('#eduForm').change(function () {
    	$('#classId2').find('option').remove();
        $('#schoolFormId').find('option').remove();
        var def1 = new Option("--请选择--", '0');
        document.getElementById("schoolFormId").options.add(def1, 0);
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadSchool",
            type: 'POST',
            data: {
                projectId: $('#project2').val(),
                projectLevelId: $('#projectLevel2').val(),
                educationForm: $('#eduForm').val(),
                deptId: $('#adddepartmentId12').val()
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].schoolName, data[i].schoolId);
                    document.getElementById("schoolFormId").options.add(o);
                }


                $('#proFormId').find('option').remove();
                var def2 = new Option("--请选择--", '');
                document.getElementById("proFormId").options.add(def2, 0);


                var def3 = new Option("--请选择--", '');
                document.getElementById("classId2").options.add(def3, 0);
                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
    });

    $('#educationForm').change(function () {
        $('#xlschoolForm').find('option').remove();
        $('#xlmajorForm').find('option').remove();
        $('#xlclassForm').find('option').remove();
        var def = new Option("--请选择--", '');
        document.getElementById("xlmajorForm").options.add(def, 0);
        
        var def = new Option("--请选择--", '');
        document.getElementById("xlclassForm").options.add(def, 0);
        
        var def = new Option("--请选择--", '');
        document.getElementById("xlschoolForm").options.add(def, 0);
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadSchool",
            type: 'POST',
            data: {
                projectId: $('#xlproject').val(),
                projectLevelId: $('#xlprojectleven').val(),
                educationForm: $('#educationForm').val()
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].schoolName, data[i].schoolId);
                    document.getElementById("xlschoolForm").options.add(o);
                }


               
                $('#xlclassForm').trigger('chosen:updated');

              
                $('#xlschoolForm').trigger('chosen:updated');
                $("#xlschoolForm").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
        //initglTablexl();
    });

    $('#schoolFormId').change(function () {
        $('#proFormId').find('option').remove();
        $('#classId2').find('option').remove();
        var def = new Option("--请选择--", '');
        document.getElementById("proFormId").options.add(def, 0);
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadMajor",
            type: 'POST',
            data: {
                projectId: $('#project2').val(),
                projectLevelId: $('#projectLevel2').val(),
                schoolId: $('#schoolFormId').val(),
                educationForm: $('#eduForm').val()
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i].majorName;
                    var objid = data[i].majorId;
                    var o = new Option(obj, objid);
                    document.getElementById("proFormId").options.add(o);
                }


                var def = new Option("--请选择--", '');
                document.getElementById("classId2").options.add(def, 0);
                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
    });

    $('#xlschoolForm').change(function () {
        $('#xlmajorForm').find('option').remove();
        $('#xlclassForm').find('option').remove();
        var def = new Option("--请选择--", '');
        document.getElementById("xlmajorForm").options.add(def, 0);
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadMajor",
            type: 'POST',
            data: {
                schoolId: $('#xlschoolForm').val(),
                projectId: $('#xlproject').val(),
                projectLevelId: $('#xlprojectleven').val(),
                educationForm: $('#educationForm').val()
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i].majorName;
                    var objid = data[i].majorId;
                    var o = new Option(obj, objid);
                    document.getElementById("xlmajorForm").options.add(o);
                }


                var def = new Option("--请选择--", '');
                document.getElementById("xlclassForm").options.add(def, 0);
                $('#xlclassForm').trigger('chosen:updated');

                $('#xlmajorForm').trigger('chosen:updated');
                $("#xlmajorForm").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
       // initglTablexl();
    });
    $('#proFormId').change(function () {
        $('#classId2').find('option').remove();
        var def = new Option("--请选择--", '');
        document.getElementById("classId2").options.add(def, 0);
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadClass",
            type: 'POST',
            data: {
                projectId: $('#project2').val(),
                projectLevelId: $('#projectLevel2').val(),
                schoolId: $('#schoolFormId').val(),
                educationForm: $('#eduForm').val(),
                majorId: $('#proFormId').val(),
                deptId: $('#adddepartmentId12').val()
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    var price = "";
                    var examFee = 0;
                    var arPrice = eval(data[i].price);
                    if (arPrice != null) {
                        for (var k = 0; k < arPrice.length; k++) {
                            if (arPrice[k] != "null" && arPrice[k] != null) {
                                if (arPrice[k].id == "2") {
                                    if (arPrice[k].price != "null" && arPrice[k].price != "0" && arPrice[k].price != null) {
                                        price = price + arPrice[k].price;
                                    } else {
                                        price = price + eval((data[i].examFee == null ? 0 : data[i].examFee));
                                        examFee = eval(data[i].examFee == null ? 0 : data[i].examFee);
                                    }
                                } else {
                                    price = eval(price + (arPrice[k].price == null ? 0 : arPrice[k].price));
                                }
                            }
                        }
                    }
                    $(o).attr("content", data[i].content);
                    $(o).attr("examFee", examFee);
                    $(o).attr("priceList", data[i].price);
                    $(o).attr("price", price);
                    document.getElementById("classId2").options.add(o);
                }

                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
    });

    $('#xlmajorForm').change(function () {
        $('#xlclassForm').find('option').remove();
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadClass",
            type: 'POST',
            data: {
                majorId: $('#xlmajorForm').val(),
                //deptId: $('#adddepartmentId12').val(),
                schoolId: $('#xlschoolForm').val(),
                projectId: $('#xlproject').val(),
                projectLevelId: $('#xlprojectleven').val(),
                educationForm: $('#educationForm').val()
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    document.getElementById("xlclassForm").options.add(o);
                }
                var def = new Option("--请选择--", '');
                document.getElementById("xlclassForm").options.add(def, 0);
                $('#xlclassForm').trigger('chosen:updated');
                $("#xlclassForm").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
        //initglTablexl();
    });

    $('#classId2').chosen().change(function () {
        var obj = $(this).find(':selected');
        $('#classPrice2').val('');
        $('#classAttr2').val(obj.text());
        $('#classPrice2').val(obj.attr("price") == 'undefind' ? '不可用' : obj.attr("price"));
//        $('#selfYH2').val(0);
//        $('#ortherYH2').val(0);
        appendPayDiv(obj.attr("priceList"), obj.attr("examFee"));
        $('#activtyCode2').val('');
    });

    $('#kTime2').chosen().change(function () {
        var obj = $(this).find(':selected');
        $('#kTimeValue2').val('');
        $('#kTimeValue2').val(obj.text());
    });


    /**
     * 所有短信发送页面
     */
    $('table[id^=table]').on('click', '.msg', function () {
        var record = $(this).data('record');
        $('#studentPhoneMsg').val(record.studentPhone);
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {parentId: record.departmentId1},
            dataType: 'json',
            success: function (data) {
                var opt = "";
                for (var i = 0; i < data.list.length; i++) {
                    opt += "<option address=\"" + data.list[i].description + "\" value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
                }
                $("#schoolIdModelMsg").html('<option value="">--请选择--</option>' + opt);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    })

    /**
     * 待沟通操作
     */
    $('#table11').on('click', '.ck,.call-out', function () {
        var record = $(this).data('record');
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
        publicJsonModel(record);
    })
    /**
     * 已沟通操作
     */
    $('#table22').on('click', '.ck,.call-out', function () {
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        //$('#updateInfoManage2').data('bootstrapValidator').resetForm(true);
        var record = $(this).data('record');
        publicJsonModel(record);
    })

    $('#table22').on('click', '.call-info', function () {
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        $('#callInfo').html('');
        var record = $(this).data('record');
        $.ajax({
            url: ctx + '/consultInfoManageServer/loadRecordContent',
            type: 'POST',
            data: {
            	infoManageId: record.infoManageId
            },
            dataType: 'json',
            success: function (data) {
            	if(data){
            		if(data.record){
            			var rrc = data.record;
            			for (var i = 0; i < rrc.length; i++) {
            	            $('#callInfo').append('<div class="form-group">'
            	                    + '<div class="col-sm-12">'
            	                    + rrc[i].content + ' </div>'
            	                    + '</div>');
            	        }
            		}
            	}
            }
        });
    })

    $('#table44').on('click', '.call-info', function () {
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        $('#callInfo').html('');
        var record = $(this).data('record');
        $.ajax({
            url: ctx + '/consultInfoManageServer/loadRecordContent',
            type: 'POST',
            data: {
            	infoManageId: record.infoManageId
            },
            dataType: 'json',
            success: function (data) {
            	if(data){
            		if(data.drop){
            			var dropContent = data.drop;
            	        for (var i = 0; i < dropContent.length; i++) {
            	            $('#callInfo').append('<tr>'
            	                + '<td>' + dropContent[i].content + '</td>'
            	                + '</tr>');
            	        }
            		}
            	}
            }
        });
    })
    
    /**
     * 预约单操作
     */
    $('#table33').on('click', '.ck,.call-out', function () {
        var record = $(this).data('record');
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
        publicJsonModel(record);
    })
    $('#table33').on('click', '.yywsm', function () {
        var record = $(this).data('record');
        $('#yywsmInfoId').val(record.infoManageId);
    })
    /**
     * 上门操作
     */
    $('#table44').on('click', '.ck,.call-out', function () {
        var record = $(this).data('record');
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
        publicJsonModel(record);
    })

    /**
     * 订座操作
     */
    $('#table55').on('click', '.ck,.call-out', function () {
        var record = $(this).data('record');
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
        publicJsonModel(record);
    })

    /**
     * 报名操作
     */
//	    $('#table66').on('click', '.call-out', function(){
//	    	var record = $(this).data('record');
//	    	$('#updateInfoManage2').find(".comment_disabled").attr({"disabled":true})
//	    	//$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
//	    	publicJsonModel(record);
//	    })

    $('#tablezy').on('click', '.view', function () {
        var record = $(this).data('record');
        professionDetails.html(record.content);
    });

    $('#table66').on('click', '.ck,.call-out', function () {
        var infoManageId = $(this).attr('data-record');
        $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
        var id = '';
        var levelId = '';
        $.ajax({
            "url": ctx + '/financeGroupIncome/getStuPayDeatil/' + infoManageId,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (data) {
                $('#sPriceHid2').val('');
                var consultInfo = data.consultInfo;
                var payInfoData = data.payInfoData;
                var project = data.project;
                
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
                    "<td>品牌：<span id='brandNameDel'>" + (consultInfo.brandName ? consultInfo.brandName : '') + "</span></td>" +
                    "<td>咨询者类型：<span>" + (consultInfo.studentAttrName2 == '--请选择--' ? '' : consultInfo.studentAttrName2) + "</span></td>" +
                    "<td>媒体类源：<span>" + (consultInfo.studentAttrName1 == '--请选择--' ? '' : consultInfo.studentAttrName1) + "</span></td>" +
                    "<td>客户成熟度：<span>" + studentMaturity + "</span>" +
                    "<input id='infoManageIdDel' type='hidden' value=" + consultInfo.infoManageId + " />" +
                    "<input id='sPriceHidCk' type='hidden' value=" + consultInfo.sPrice + " /></td></tr>";
                $('#headInfo').append(tr);

                //学生个人信息
                $('#studentName').val(consultInfo.studentName ? consultInfo.studentName : '');
                $('#stuSex').val(consultInfo.studentSex);
                $('#stuAge').val(consultInfo.age ? consultInfo.age : '');
                $('#stuPhone').val(consultInfo.studentPhone ? consultInfo.studentPhone : '');
                $('#stuEmail').val(consultInfo.email ? consultInfo.email : '');
                $('#stuWeChat').val(consultInfo.weChat ? consultInfo.weChat : '');
                $('#stuQQ').val(consultInfo.tengXun ? consultInfo.tengXun : '');
                $('#stuOtherPhone').val(consultInfo.ortherPhone ? consultInfo.ortherPhone : '');
                $('#stuPhoneAddress').val(consultInfo.phoneAddress ? consultInfo.phoneAddress : '');
                $('#stuWorkSpace').val(consultInfo.workSpace ? consultInfo.workSpace : '');
                $('#bkyx').val(consultInfo.departmentName3 ? consultInfo.departmentName3 : '');
                if (consultInfo.idcardType == '1') {
                    $('#stuCardType').val('身份证');
                } else {
                    $('#stuCardType').val('护照');
                }

                var studentLable = consultInfo.studentLable;
                $('.tagBM').html('');
                if(studentLable!=null){
                	studentLable = studentLable.split(',');
                	for(var i=0;i<studentLable.length;i++){
                		$('.tagBM').append('<p class="label-box text-center"><span>'+studentLable[i]+'</span><i class="fa fa-minus-circle reduce icon-btn tag-close"></i>');
                	}
                }
                
                $('#stuCard').val(consultInfo.idcard ? consultInfo.idcard : '');

                if(infoDisType=="1"){
                	//集团
                	if(consultInfo.infoType=='1'){
                		$('#upli210').hide();
                	}else{
                		$('#upli210').show();
                	}
                }else{
                	//分校
                	$('#upli210').show();
                }
                
                if (consultInfo.infoType == '0') {
                    $('#stuBMType').val('线上支付');
                } else {
                    $('#stuBMType').val('上门报名');
                }

                $('#stuEmergencyContactMode').val(consultInfo.emergencyContactMode ? consultInfo.emergencyContactMode : '');
                $('#stuEmergencyContact').val(consultInfo.emergencyContact ? consultInfo.emergencyContact : '');
                $('#stubByZy').val(consultInfo.byZy ? consultInfo.byZy : '');
                $('#stuStudentAttrName32').val(consultInfo.studentAttrName3 != '--请选择--' ? consultInfo.studentAttrName3 : '');
                $('#stuBySchool').val(consultInfo.bySchool ? consultInfo.bySchool : '');
                $('#stuNation').val(consultInfo.nation ? consultInfo.nation : '');

                //课程信息
                $('#courseType').find('option').remove();
                var projectType = "<option value=" + project.projectType + " selected>" + (project ? (project.projectType == '1' ? '职业资格' : '学历') : '') + "</option>";
                $('#courseType').append(projectType);
                $('#projectName').find('option').remove();
                id = consultInfo.projectId;
                levelId = consultInfo.projectLevelId;
                var projectName = "<option value='" + (consultInfo.projectName) + "'selected>" + (consultInfo.projectName ? consultInfo.projectName : '') + "</option>";
                $('#projectName').append(projectName);
                $('#projectLevelNname').find('option').remove();
                var projectLevelName = "<option  value='" + consultInfo.projectLevelId + "'selected>" + (consultInfo.projectLevelName ? consultInfo.projectLevelName : '') + "</option>";
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
                //呼入
                $('#callInfo2').find('tr').remove();
                var callInfo = "<tr><td>" + (consultInfo.conversation ? consultInfo.conversation : '') + "</td></tr>";
                $('#callInfo2').append(callInfo);
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

                $.ajax({
                    url: ctx + "/bizScale/loadProjectLevel",
                    data: {"projectId": id},
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (levelId == data[i].projectLevelId) {
                                $('#hidChoosePrint').val(data[i].teachType);
                            }
                        }
                    }
                });
            }
        });


    });
    
     $('#table11').on('click', '.msg', function () {
    	var record = $(this).data('record');
    	$('#msgHidJson').val(JSON.stringify($(this).data('record')));
     });
	 $('#table22').on('click', '.msg', function () {
		 var record = $(this).data('record');
	    	$('#msgHidJson').val(JSON.stringify($(this).data('record')));
	 });
	 $('#table33').on('click', '.msg', function () {
		 var record = $(this).data('record');
	    	$('#msgHidJson').val(JSON.stringify($(this).data('record')));
	 });
	 $('#table44').on('click', '.msg', function () {
		 var record = $(this).data('record');
	    	$('#msgHidJson').val(JSON.stringify($(this).data('record')));
	 });
	 $('#table55').on('click', '.msg', function () {
		 var record = $(this).data('record');
	    	$('#msgHidJson').val(JSON.stringify($(this).data('record')));
	 });
	 $('#table66').on('click', '.msg', function () {
		 var record = $(this).data('record');
	    	$('#msgHidJson').val(JSON.stringify($(this).data('record')));
	 });

	 function msgEdit(e){
		 var record = e;
		 var val = val.replace('{class}', '{}');
		    if($('#schoolIdModelMsg').find('option:selected').text()){
		    	val = val.replace('{address}', $('#schoolIdModelMsg').find('option:selected').text());
			}else{
			  	val = val.replace('{address}', '{}');
			}

		    if($('#subscribeDate').val()){
		    	val = val.replace('{studentName}', $('#subscribeDate').val());
		    }else{
		    	val = val.replace('{recriveTime}', '{}');
		    }

		    $('#showMsg').val(val)
	 }

    $('#subscribe').bootstrapValidator({
        fields: {
            /*验证*/
            schoolId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        /*非空提示*/
                        message: '预约校区不能为空'
                    }
                }
            },
            subscribeDate: {
                validators: {
                    notEmpty: {
                        /*非空提示*/
                        message: '预约时间不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $.ajax({
                type: "POST",
                url: ctx + "/consultInfoManage/updateRecord",
                data: $("#updateInfoManage").serializeArray(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        init();
                        init2();
                        $('.bs-example-modal-lg').modal('hide');
                        $('.subscribe').modal('hide');
                    }
                }
            });
        }
    });
    //表单提交
    $('#updateInfoManage2').bootstrapValidator({
        fields: {
            studentName: {
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                    regexp: {
                        regexp: /[\u4e00-\u9fa5]/g,
                        message: '名称是汉字'
                    }
                }
            },
            studentPhone: {
                validators: {
                    notEmpty: {
                        message: '电话不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            $('#classPriceHid').val($('#classPrice2').val());
            $('#schoolForm').val($('#schoolFormId').find(':selected').text());
            $('#classAttr2').val($('#classId2').find(':selected').text());
            $('#proForm').val($('#proFormId').find(':selected').text());
            $('#departmentName1Hid').val($("#adddepartmentId12").find(':selected').text());
            if ($('#buttonStatus2').val() == '6') {
            	var ktime = $('#kTime2').val();
            	$('#kTimeValue2').val($('#kTime2').find('option:selected').text());
            	if(ktime==null||ktime==''){ 
            		toastr.error('添加考期');
            		return;
            	}
                $('#dPriceType').val($('#dingzuoS').find(':selected').val());
                $('#dPrice').val($('#dingzuoI').val());
                var sjhj = $('#dingzuoI').val();
                if (sjhj == '0' || sjhj == '') {
                    toastr.error('添加费用金额');
                    return;
                }
                var nextPayTime = $('#nextPayTime').val();
            	if(nextPayTime==null||nextPayTime==''){
            		 toastr.error("下次缴费时间为空");
            		 return ;
            	}
                
                $('#status2').val(6);
            }
            if ($('#buttonStatus2').val() == '7') {
            	var ktime = $('#kTime2').val();
            	$('#kTimeValue2').val($('#kTime2').find('option:selected').text());
            	if(ktime==null||ktime==''){ 
            		toastr.error('添加考期');
            		return;
            	}
                var str = "payDz" + $('#dingzuoS').find(':selected').val();
                var payPx = '';
                var payKw = '';
                var payZl = '';
                var payXy = '';
                var payJc = '';
                var payFw = '';
                var e = 0;
                var id = '';
                var str = "payDz" + $('#dingzuoS').find(':selected').val();
                var url = '&payDz=' + $('#dingzuoI').val() + '&' + str + "=" + $('#dingzuoI').val() + '&payY=' + $('#yhqprice').text() + '&payS=' + $('#zkprice').text();
                var sPrice = 0;
                var obj;
                $('td[id^=appendPayTd]').each(function () {
                    e = $(this);
                    id = this.id;
                    if (id.split('appendPayTd')[1] == 1) {
                        url = url + '&payPx=' + e.text();
                        obj = e.next().next().children('div .payment');
                        for (var ob = 0; ob < obj.length; ob++) {
                            url = url + '&payPx' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                            sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                        }
                    }
                    if (id.split('appendPayTd')[1] == 2) {
                        url = url + '&payKw=' + e.text();
                        obj = e.next().next().children('div .payment');
                        for (var ob = 0; ob < obj.length; ob++) {
                            url = url + '&payKw' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                            sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                        }
                    }
                    if (id.split('appendPayTd')[1] == 3) {
                        url = url + '&payZl=' + e.text();
                        obj = e.next().next().children('div .payment');
                        for (var ob = 0; ob < obj.length; ob++) {
                            url = url + '&payZl' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                            sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                        }
                    }
                    if (id.split('appendPayTd')[1] == 4) {
                        url = url + '&payXy=' + e.text();
                        obj = e.next().next().children('div .payment');
                        for (var ob = 0; ob < obj.length; ob++) {
                            url = url + '&payXy' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                            sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                        }
                    }
                    if (id.split('appendPayTd')[1] == 5) {
                        url = url + '&payJc=' + e.text();
                        obj = e.next().next().children('div .payment');
                        for (var ob = 0; ob < obj.length; ob++) {
                            url = url + '&payJc' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                            sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                        }
                    }
                    if (id.split('appendPayTd')[1] == 6) {
                        if ($('#project2').find('option:selected').attr('type') == '1') {
                            url = url + '&payFw=' + e.text();
                            obj = e.next().next().children('div .payment');
                            for (var ob = 0; ob < obj.length; ob++) {
                                url = url + '&payFw' + $(obj[ob]).find('select option:selected').val() + '=' + $(obj[ob]).find('input').val();
                                sPrice = sPrice + eval($(obj[ob]).find('input').val() == '' ? 0 : $(obj[ob]).find('input').val());
                            }
                        } else {
                            url = url + '&payType=' + $('#appendPayTd6').text();
                        }
                    }
                });
                var cf = $('#cfhj').text();
                cf = eval(cf);
                if (cf != 0) {
                    if (!$('#nextPayTime').val()) {
                        toastr.error('请选择欠费时间');
                        return;
                    }
                }else{
                	$('#nextPayTime').val(getNowFormatDate());
                }
               // return ;
                var sjhj = $('#sjhj').text();
                if (sjhj == '0' || sjhj =='') {
                    toastr.error('添加费用金额');
                    return;
                }
                $.ajax({
                    type: "get",
                    url: ctx + "/consultInfoManagePay/addNewRecord?infoManageId=" + $('#infoManageId2').val() + url,
                    dataType: 'json',
                    success: function (msg) {

                    }
                });
                $('#status2').val(7);
                $('#classPriceHid2').val($('#hjprice').text());
                $('#sPriceHid2').val(sPrice);
                if ($('#tab_44').parent('li').attr('class') == 'active') {
                    statusRemember($('#infoManageId2').val(), 7, "报名");
                }
            }

            $.ajax({
                type: "POST",
                url: ctx + "/consultInfoManage/updateRecord",
                data: $("#updateInfoManage2").serializeArray(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 'success') {
                        init();
                        $.ajax({
                            type: "POST",
                            url: ctx + "/bizActivityCode/ajaxUpdateRecord",
                            data: {
                                code: $('#activtyCode2').val()
                            },
                            dataType: 'json',
                            success: function (msg) {
                            }
                        });
                        $('#myTab11').find('li.active a').click();
                        $('.bs-example-modal-lg1').modal('hide');

                    }
                }
            });

            if ($('#buttonStatus2').val() == '7') {
                toastr.success('报名成功');
            } else if ($('#buttonStatus2').val() == '6') {
                toastr.success('订座成功');
            }
        }
    });
    //转为预约
    $('#serverPhone1').click(function () {
    	formUpdate.serverPhone();
    });
    //转待沟通
    $('#callPhone1').click(function () {
        var status = 2;
        if ($('#status1').val() == '2') {
            status = 3;
        }
        $.ajax({
            type: "POST",
            url: ctx + "/consultInfoManage/updateRecord",
            data: {
                infoManageId: $('#infoManageId1').val(),
                status: status
            },
            dataType: 'json',
            success: function (msg) {
                if (msg.status == 'success') {
                    statusRemember($('#infoManageId1').val(), status, "转为待沟通");
                    $('.bs-example-modal-lg').modal('hide');
                    init();
                }
            }
        });
    });
    $('#infoType2').change(function () {
        if (this.value == '1') {
            if ($('#status2').val() == '2' || $('#status2').val() == '3') {
                $('#upli26').hide();
                $('#upli27').hide();
            }
        } else {
            $('#upli26').show();
            $('#upli27').show();
        }
    });
    sumNum();
    //sumValue();
    groupNum();
    onblueVal();

    $('#strategy').click(function () {

    });
    KindEditor.basePath = ctx_static + '/dep/kindeditor-4.1.7/';
    var conversation = KindEditor.create('textarea[name="conversation"]', {
        uploadJson: '${ctx }/file/uploadFile',
        resizeType: 0
    });
    var professionDetails = KindEditor.create('#professionDetails', {
        uploadJson: '${ctx }/file/uploadFile',
        afterBlur: function () {
            this.sync();
        },
        resizeType: 0
    });
    KindEditor.create('.educationView textarea[name="educationDetails"]', {
        uploadJson: '${ctx }/file/uploadFile',
        afterBlur: function () {
            this.sync();
        },
        resizeType: 0
    });
    var setting = {
	        view: {
	        	 selectedMulti: false,
	        },
	        check: {
	            enable: true,
	        },
	        data: {
	        	key:{
					name:"lableType"
				},
	            simpleData: {
	                enable: true,
					idKey:"lableId",
					pIdKey:"lableParentid"
	            }
	        },
	        edit: {
	            enable: false,
	            showRemoveBtn: false
	        },
	        treeNode: {
	            checked: false
	        },
            view: {
                dblClickExpand: dblClickExpand
            }
	    }
    $(".countersign").on("click", function () {
    	$('.tag').html('');
    	var zTree = $.fn.zTree.getZTreeObj("customerTree");
		var arr = new Array();
		var idArr = new Array();
		var nodes = zTree.getCheckedNodes(true);
		//遍历
		for (var i = 0; i < nodes.length; i++) {
			arr.push(nodes[i].lableType);
			idArr.push(nodes[i].lableId);
			$('.tag').append('<p class="label-box text-center"><span>' + nodes[i].lableType + '</span>'
                + '<i class="fa fa-minus-circle reduce icon-btn tag-close"></i></p>');
		}
		var infoManageId2 = $("#infoManageId2").val();
		$.ajax({
            type: "POST",
            url: ctx + "/projectInfoManage/updateRecord",
            data: {'infoManageId':infoManageId2,'studentId':idArr.toString(),'studentLable':arr.toString()},
            dataType: 'json',
            success: function (msg) {
            	$('.customer').modal('hide');
              }
        });
        //$('#' + nodes[i].tId).find('.button').removeClass('checkbox_true_full').addClass('checkbox_false_full');

    })
    
    //客户标签zTree
    $('.customer').on('show.bs.modal', function () {    	
	   	$("#customerTree").html('');
	   	$("#customerTree").mLoading({
		    text: '正在加载中，请稍后......',
		    icon: "../statics_html/common/image/loading5.gif"
		});
    })
    $('.customer').on('shown.bs.modal', function () {
		$(".bs-example-modal-lg").css({"z-index": 1040});
	    $.ajax({
	   		 url: ctx + '/bizLable/getAll',
	   		 type: 'POST',
	   		 dataType: 'json',
	   		 success: function (data) {
	   			$.fn.zTree.init($("#customerTree"), setting, data.returnObject.aaData);
	   			$("#customerTree").mLoading('hide');
	   		    //取消父节点的多选框
	   		    var zTree = $.fn.zTree.getZTreeObj("customerTree");
	   		    var nodes = zTree.transformToArray(zTree.getNodes());
	   		    for (var i = 0; i < nodes.length; i++) {
	   		        var id = nodes[i].idKey;
	   		        var parentnodes = zTree.getNodesByParam("idKey", id, null);
	   		        for (var j = 0; j < parentnodes.length; j++) {
	   		        	if(parentnodes[j].lableParentid == null){
	       		        	parentnodes[j].nocheck = true;
			                zTree.updateNode(parentnodes[j]);
	   		        	}
	   		        	var tags = $('.tag .label-box span');
		       	        for (var k=0;k<tags.length/2;k++){
		       	        	if($(tags[k]).text() == parentnodes[j].lableType){
		       	        		parentnodes[j].checked = true;
		       	        	}
		       	        }
	   		        }
	   		    }
	   		 },
	   		 error: function (response) {
	   			 toastr.error("系统错误");
	   	    }
	   });
    })
    
    $('#highestEducationName').change(function(){
    	$('#highestEducationNamePut').val($('#highestEducationName :selected').text());
    });
})



//省市获取值
function chose_get_value(select) {
    return $(select).val();
}

//省市获取选中的文本
function chose_get_text(select) {
    return $(select + " option:selected").text();
}
function addinit() {
    $(".phoneBelong").on({
        focus: function () {
            $('#secondDivCity').show();
        },
        click: function () {
            $('#secondDivCity').show();
        },
    });

    //电话归属地
    function addphoneBelong(parentEle) {
        $(parentEle).find('.attribution .confirm-btn').click(function () {
            if ($(parentEle).find('.addprovince :selected').val() != "0" && $(parentEle).find('.addcity :selected').val() != "0") {
                $(parentEle).find('.phoneBelong').val($(parentEle).find('.addprovince :selected').text() + $(parentEle).find('.addcity :selected').text())
                $(parentEle).find('.attribution').hide();
            }
            if (chose_get_value(parentEle + ' #addprovince') != 0 && chose_get_value(parentEle + ' #addcity') != 0) {
                $(parentEle).find('.phoneBelong').val(chose_get_text(parentEle + ' #addprovince') + chose_get_text(parentEle + ' #addcity'));
                $(parentEle).find('.attribution').fadeOut();
            }
        });
        $(parentEle).find('.attribution .cancel-btn').click(function () {
            $(parentEle).find('.attribution').hide();
        });
    }

    //创建咨询量
    addphoneBelong('#addInquiries');

    //重复电话添加新咨询课程
    addphoneBelong('#addRepeatedPhone');

    //初始化分校select
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("#adddepartmentId1").html('<option value="">--请选择--</option>' + opt);
            $('#adddepartmentId1').trigger('chosen:updated');
            $("#adddepartmentId1").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
            /*$("#adddepartmentId12").html('<option value="">--请选择--</option>'+opt);*/
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化咨询者类型
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 2},
        dataType: 'json',
        success: function (data) {
            var zxz = "";
            for (var i = 0; i < data.list.length; i++) {
                zxz += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrId2").html('<option value="">--请选择--</option>' + zxz);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化媒体来源类型
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 1},
        dataType: 'json',
        success: function (data) {
            var mt = "";
            for (var i = 0; i < data.list.length; i++) {
                mt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrId1").html('<option value="">--请选择--</option>' + mt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化学历
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 3},
        dataType: 'json',
        success: function (data) {
            var xl = "";
            for (var i = 0; i < data.list.length; i++) {
                xl += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrId3").html('<option value="">--请选择--</option>' + xl);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始咨询课程
    $.ajax({
        url: ctx + '/bizProject/getAll',
        type: 'POST',
//        data: {attrType : 3},
        dataType: 'json',
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.list.length; i++) {
                zxkc += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            }
            $("#projectId").html('<option value="">--请选择--</option>' + zxkc);
            $('#projectId').trigger('chosen:updated');
            $("#projectId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //咨询课程级别
    $('#projectId').change(function () {
        var projectId = $('#projectId :selected').val();
        $.ajax({
            url: ctx + '/bizProjectLevel/getAllOption',
            type: 'POST',
            data: {projectId: projectId},
            dataType: 'json',
            success: function (data) {
                var level = "";
                for (var i = 0; i < data.list.length; i++) {
                    level += "<option value=" + data.list[i].projectLevelId + ">" + data.list[i].levelTitle + "</option>";
                }
                $("#projectLevelId").html('<option value="">--请选择--</option>' + level);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    //初始化电话归属地（省）
    $.ajax({
        url: ctx + '/address/getAllOption',
        type: 'POST',
        data: {level: 1},
        dataType: 'json',
        success: function (data) {
            var sheng = "";
            for (var i = 0; i < data.list.length; i++) {
                sheng += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
            }
            $("#addprovince").html('<option value="0">--请选择--</option>' + sheng);
            $('#addprovince').trigger('chosen:updated');
            $("#addprovince").chosen();
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化电话归属地（市）
    $('#addprovince').change(function () {
        var addressId = $('#addprovince :selected').val();
        $.ajax({
            url: ctx + '/address/getAllOption',
            type: 'POST',
            data: {level: 2, addressId: addressId},
            dataType: 'json',
            success: function (data) {
                var shi = "";
                for (var i = 0; i < data.list.length; i++) {
                    shi += "<option value=" + data.list[i].addressId + ">" + data.list[i].fullName + "</option>";
                }
                $("#addcity").html('<option value="0">--请选择--</option>' + shi);
                $('#addcity').trigger('chosen:updated');
                $("#addcity").chosen();
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
    
    $('#inquiries').bootstrapValidator({
    	message: 'This value is not valid',
        fields: {
            studentPhone: {
                validators: {
                    notEmpty: {
                        message: '电话不能为空'
                    },
                    regexp: {
                        regexp: /^(13[0-9]|15[0|2|1|3|6|7|8|9]|18[8|9])\d{8}$/,
                        message: '请填写正确的电话号码'
                    }
                }
            },
            brandId: {
                validators: {
                    notEmpty: {
                        message: '招生品牌不能为空'
                    },
                }
            },
            studentAttrId2: {
                validators: {
                    notEmpty: {
                        message: '咨询者类型不能为空'
                    },
                }
            },
            studentAttrId1: {
                validators: {
                    notEmpty: {
                        message: '媒体来源不能为空'
                    },
                }
            },
            keyword: {
                validators: {
                    notEmpty: {
                        message: '关键词不能为空'
                    },
                }
            },
            tengXun: {
                validators: {
                    regexp: {
                        regexp: /^[0-9]*$/,
                        message: 'qq号只有数字组成'
                    }
                }
            },
            studentName: {
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
//    		        regexp: {
//    		            regexp: /^([\u4e00-\u9fa5]){2,7}$/,
//    		            message: '姓名必须为汉字'
//    		        }
                }
            },
            age: {
                validators: {
                    regexp: {
                        regexp: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
                        message: '年龄必须为数字'
                    },
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            var brandId = $('#brandId :selected').val();
            var projectId = $('#projectId :selected').val();
            if (projectId == null || projectId == "") {
                toastr.error("请选择咨询课程!");
                return;
            }
            var studentPhone = $('#inquiries :input[name="studentPhone"]').val();
            var departmentId1 = $('#inquiries select[name="departmentId1"] :selected').val();
            if (departmentId1 == null || departmentId1 == "") {
                toastr.error("请选择信息归属地!");
                return;
            }
            //需求2：根据品牌，项目，学生电话查询。如有记录则提示已有项目并且不能添加信息量
            $.ajax({
            	url: ctx + '/consultInfoManage/getAllOption',
            	type: 'POST',
            	data: {brandId: brandId, projectId: projectId, studentPhone: studentPhone},
            	dataType: 'json',
            	async: true,
            	success: function (data) {
            		if (data.list.length == 0) {
            			var phoneBelong = $('#inquiries :input[name="phoneBelong"]').val();
            			if (phoneBelong == null || phoneBelong == "") {
                          toastr.error("请选择电话归属地!");
                          return;
            			}
            			  var projectId = $('#projectId :selected').val();//项目id
    	                  var departmentId1 = $('#adddepartmentId1 :selected').val();//信息归属地id
    	                  var departmentName1 = $('#adddepartmentId1 :selected').text();
    	                  var brandId = $('#brandId :selected').val();//品牌id
    	                  var brandSchool = '^\\[[[:print:]]*\\{\\"brand\\"\\:\\"' + brandId + '\\"\\,\\"school\\"\\:\\[[a-zA-Z0-9\\-\\,\\"]*\\"' + departmentId1 + '\\"[a-zA-Z0-9\\-\\,\\"]*\\]\\}[[:print:]]*\\]$';
    	                  var options = form.serialize();
    	                  var brandName = $('#brandId :selected').text();//品牌名称
    	                  var studentAttrName1 = $('#studentAttrId1 :selected').text();//媒体来源名称
    	                  var studentAttrName2 = $('#studentAttrId2 :selected').text();//咨询者类型名称
    	                  //需求3：咨询者类型为在线有效时，对话记录不能为空
    	                  if (studentAttrName2 == '在线有效') {
                            var dialogueLink = $('#inquiries textarea[name="conversation"]').val();
                            if (dialogueLink == null || dialogueLink == "") {
                                toastr.error("请填写对话记录!");
                                return;
                            }
                        }
                        var projectName = $('#projectId :selected').text();//项目名称
                        var projectLevelName = $('#projectLevelId :selected').text();//项目级别名称
                        var studentAttrName3 = $('#studentAttrId3 :selected').text();//最高学历名称
                        var nation = $('#nations :selected').text();//民族
                        //需求4：回访时间如果没有填写，默认是当前系统时间延后半小时
                        var recordnexttimees = $('#inquiries input[name="recordnexttime"]').val();
                        var recordnexttime = '';
                        if (recordnexttimees == "" || recordnexttimees == null) {
                            var d = new Date();
                            var year1 = d.getFullYear();
                            var month1 =( d.getMonth() + 1).toString();
                            var day1 = d.getDate().toString();
                            var hour1 = d.getHours().toString();
                            var minute1 = (d.getMinutes()).toString();
                            if (month1.length == 1) {
                                month1 = "0" + month1;
                            }
                            if (day1.length == 1) {
                                day1 = "0" + day1;
                            }
                            if (hour1.length == 1) {
                                hour1 = "0" + hour1;
                            }
                            if (minute1.length == 1) {
                                minute1 = "0" + minute1;
                            }
                            var recordnexttime2 = '' + year1 + '-' + month1 + '-' + day1 + ' ' + hour1 + ':' + minute1 + '';
                            var time = new Date(recordnexttime2.replace("-","/")); 
                            var b = 30; //分钟数
                            time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
                            var year = time.getFullYear();
                            var month =( time.getMonth() + 1).toString();
                            var day = time.getDate().toString();
                            var hour = time.getHours().toString();
                            var minute = (time.getMinutes()).toString();
                            if (month.length == 1) {
                                month = "0" + month;
                            }
                            if (day.length == 1) {
                                day = "0" + day;
                            }
                            if (hour.length == 1) {
                                hour = "0" + hour;
                            }
                            if (minute.length == 1) {
                                minute = "0" + minute;
                            }
                            var recordnexttime1 = '' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + '';
                            recordnexttime = recordnexttime1;
                        } else {
                            recordnexttime = recordnexttimees;
                        }
                        options += "&recordNextTime=" + recordnexttime;
                        options += "&departmentName1=" + departmentName1;
                        options += "&brandName=" + brandName;
                        options += "&studentAttrName1=" + studentAttrName1;
                        options += "&studentAttrName2=" + studentAttrName2;
                        options += "&projectName=" + projectName;
                        options += "&projectLevelName=" + projectLevelName;
                        options += "&studentAttrName3=" + studentAttrName3;
                        options += "&nation=" + nation;
                        $.ajax({
                          type: "POST",
                          url: ctx + '/consultConsole/addNewCIMRecord',
                          data: options,
                          dataType: 'json',
                          success: function (data) {
                              if (data.status == "success") {
                                  init();
                                  $('.addInquiries').modal('hide');
                              } else {
                                  toastr.error(data.msg);
                              }
                          },
                          error: function (msg) {
                              toastr.error("系统错误");
                          }
                      });
            		}else{
            		  toastr.error("在" + data.list[0].createDate + "," + data.list[0].createUserName + "已创建该咨询课程和招生品牌的咨询量，请核对后输入！");
                      return;
            		}
            	},error: function (response) {
            		toastr.error("系统错误");
            		}
            });
        }
    });
}
/**
 * 预约单联动计算量
 * @param record
 * @returns
 */
function loadGT_YYD(record) {
    var fromType = '';
    $.ajax({
        async: false,
        url: ctx + "/bizScale/loadProject",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].projectId);
                if (record.projectId == data[i].projectId) {
                    o.selected = true;
                    fromType = data[i].projectType;
                    if (data[i].projectType == '2') {
                        $('div[id^=divchange]').show();
                    } else {
                        $('div[id^=divchange]').hide();
                    }
                }
                $(o).attr("type", data[i].projectType)
                document.getElementById("project2").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("project2").options.add(def, 0);
            $('#project2').trigger('chosen:updated');
            $("#project2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    })
    var chso = 0;
    $.ajax({
        url: ctx + "/bizScale/loadProjectLevel",
        data: {"projectId": record.projectId},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                if (record.projectLevelId == data[i].projectLevelId) {
                    o.selected = true;
                    chso = 1;
                }
                $(o).attr("type", data[i].teachType);
                document.getElementById("projectLevel2").options.add(o);
            }
            var def = new Option("--请选择--", '');
            if (chso == 0) {
                $(def).attr("selected", "selected");
            }
            document.getElementById("projectLevel2").options.add(def, 0);
            $('#projectLevel2').trigger('chosen:updated');
            $("#projectLevel2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    })
    $('#schoolFormId').find('option').remove();
    $.ajax({
        url: ctx + "/bizProduct/ajaxLoadSchool",
        type: 'POST',
        data: {
            projectId: record.projectId,
            projectLevelId: record.projectLevelId,
            educationForm: record.eduFrom
        },
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].schoolName, data[i].schoolId);
                if (record.schoolFromId == data[i].schoolId) {
                    o.selected = true;
                }
                document.getElementById("schoolFormId").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("schoolFormId").options.add(def, 0);
        }
    })
    $('#proFormId').find('option').remove();
    $.ajax({
        url: ctx + "/bizProduct/ajaxLoadMajor",
        type: 'POST',
        data: {
            projectId: record.projectId,
            projectLevelId: record.projectLevelId,
            schoolId: record.schoolFromId,
            educationForm: record.eduFrom
        },
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i].majorName;
                var objid = data[i].majorId;
                var o = new Option(obj, objid);
                if (record.proFromId == objid) {
                    o.selected = true;
                }
                document.getElementById("proFormId").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("proFormId").options.add(def, 0);
        }
    })
    if (fromType == '2') {
        $('#classId2').find('option').remove();
        $.ajax({
            url: ctx + "/bizProduct/ajaxLoadClass",
            type: 'POST',
            data: {
                projectId: record.projectId,
                projectLevelId: record.projectLevelId,
                schoolId: record.schoolFromId,
                educationForm: record.eduFrom,
                majorId: record.proFromId,
                deptId: record.departmentId3
            },
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    var price = "";
                    var examFee = 0;
                    var arPrice = eval(data[i].price);
                    if (arPrice != null) {
                        for (var k = 0; k < arPrice.length; k++) {
                            if (arPrice[k] != "null" && arPrice[k] != null) {
                                if (arPrice[k].id == "2") {
                                    if (arPrice[k].price != "null" && arPrice[k].price != "0" && arPrice[k].price != null) {
                                        price = price + arPrice[k].price;
                                    } else {
                                        price = price + eval((data[i].examFee == null ? 0 : data[i].examFee));
                                        examFee = eval(data[i].examFee == null ? 0 : data[i].examFee);
                                    }
                                } else {
                                    price = eval(price + (arPrice[k].price == null ? 0 : arPrice[k].price));
                                }
                            }
                        }
                    }
                    if (record.classId == data[i].productId) {
                        appendPayDiv(data[i].price, examFee);
                        o.selected = true;
                        chso = 1;
                        $('#classPrice2').val(price);
                    }
                    $(o).attr("content", data[i].content);
                    $(o).attr("examFee", examFee);
                    $(o).attr("priceList", data[i].price);
                    $(o).attr("price", price);
                    document.getElementById("classId2").options.add(o);
                }
                var def = new Option("--请选择--", '');
                if (chso == 0) {
                    $(def).attr("selected", "selected");
                }
                document.getElementById("classId2").options.add(def, 0);
                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            }
        })
    }
    $('#kTime2').find('option').remove();
    $.ajax({
        url: ctx + "/bizExamSetting/ajaxLoad",
        type: "post",
        data: {
            projectLevelId: record.projectLevelId,
            projectId: record.projectId
        },
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].examDate, data[i].examSettingId);
                if (record.kTime == data[i].examSettingId) {
                    o.selected = true;
                }
                document.getElementById("kTime2").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("kTime2").options.add(def, 0);
            $('#kTime2').trigger('chosen:updated');
            $("#kTime2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');

        }
    })
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.list.length; i++) {
                var o = new Option(data.list[i].fullName, data.list[i].departmentId);
                if (record.departmentId3 == data.list[i].departmentId) {
                    o.selected = true;
                }
                document.getElementById("adddepartmentId12").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("adddepartmentId12").options.add(def, 0);
            $('#adddepartmentId12').trigger('chosen:updated');
            $("#adddepartmentId12").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

    if (fromType != '2') {
        $('#classId2').find('option').remove();
        $('#appendPayBody').html('');
        $.ajax({
            url: ctx + '/bizProduct/loadProductPrice',
            type: 'POST',
            data: {
                projectId: record.projectId,
                projectLevelId: record.projectLevelId,
                schoolId: record.departmentId1,
                addressId: record.examRegionId
            },
            dataType: 'json',
            success: function (data) {
                var chso = 0;
                for (var i = 0; i < data.length; i++) {
                    var o = new Option(data[i].className, data[i].productId);
                    var price = "";
                    var examFee = 0;
                    var arPrice = eval(data[i].price == null ? 0 : data[i].price);
                    for (var k = 0; k < arPrice.length; k++) {
                        if (arPrice[k] != "null" && arPrice[k] != null) {
                            if (arPrice[k].id == "2") {
                                if (arPrice[k].price != "null" && arPrice[k].price != "0" && arPrice[k].price != null) {
                                    price = price + arPrice[k].price;
                                } else {
                                    price = price + eval((data[i].examFee == null ? 0 : data[i].examFee));
                                    examFee = eval((data[i].examFee == null ? 0 : data[i].examFee));
                                }
                            } else {
                                price = eval(price + (arPrice[k].price == null ? 0 : arPrice[k].price));
                            }
                        }
                    }
                    if (record.classId == data[i].productId) {
                        appendPayDiv(data[i].price, examFee);
                        o.selected = true;
                        chso = 1;
                        $('#classPrice2').val(price);
                    }
                    $(o).attr("examFee", examFee);
                    $(o).attr("priceList", data[i].price);
                    $(o).attr("price", price);
                    document.getElementById("classId2").options.add(o);
                }
                var def = new Option("--请选择--", '');
                if (chso == 0) {
                    $(def).attr("selected", "selected");
                }
                document.getElementById("classId2").options.add(def, 0);
                $('#classId2').trigger('chosen:updated');
                $("#classId2").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    }

    //加载回访记录
    $('#hrzx').html('');
    $('#dropFalseWhy').html('');
    $.ajax({
        url: ctx + '/consultInfoManageServer/loadRecordContent',
        type: 'POST',
        data: {
        	infoManageId: $('#infoManageId2').val()
        },
        dataType: 'json',
        success: function (data) {
        	if(data){
        		if(data.record){
        			var rrc = data.record;
        			for (var i = 0; i < rrc.length; i++) {
        	            $('#hrzx').append('<tr>'
        	                + '<td>' + rrc[i].content + '</td>'
        	                + '</tr>');
        	        }
        		}
        		if(data.drop){
        			var dropContent = data.drop;
        	        for (var i = 0; i < dropContent.length; i++) {
        	            $('#dropFalseWhy').append('<tr>'
        	                + '<td>' + dropContent[i].content + '</td>'
        	                + '</tr>');
        	        }
        		}
        	}
        }
    });
    //客户标签
    var infoManageId = $('#infoManageId2').val();
    $('.tag').html('');
    $.ajax({
        url: ctx + '/consultInfoManage/getCheckedLableId',
        type: 'POST',
        data: { infoManageId: infoManageId},
        dataType: 'json',
        success: function (data) {
         if(data.list!=null){
	        	var tag = data.list.studentLable.split(',');
	        	if(tag!= ''){
	        		for(var i = 0; i < tag.length; i++){
	            		$('.tag').append('<p class="label-box text-center"><span>' + tag[i] + '</span>'
	    	    	            + '<i class="fa fa-minus-circle reduce icon-btn tag-close"></i></p>');
	            	}
	        	}
	        }
        }
    });
}
function appendPayDiv(appendPayDiv, examFee) {
    $('#appendPayBody').html('');
    if (appendPayDiv != "" && appendPayDiv != undefined) {
        appendPayDiv = eval(appendPayDiv);
        var dzprice = $('#dPrice').val();
        if (dzprice == null || dzprice == '') {
            dzprice = 0;
        }
        var appendPayStr = '';

        var price = 0;
        for (var payi = 0; payi < appendPayDiv.length; payi++) {
            price = price + eval(appendPayDiv[payi].price);
            if (appendPayDiv[payi].id == '2') {
                var bakprice = 0;
                if (appendPayDiv[payi].price != null && appendPayDiv[payi].price > 0) {
                    bakprice = appendPayDiv[payi].price;
                } else {
                    bakprice = examFee;
                }
                if(appendPayDiv[payi].price=='0'){
                	price = price + eval(bakprice);
                }
                $('#appendPayBody').append('<tr>'
                    + ' <td>' + appendPayDiv[payi].name + '</td>'
                    + '<td id="appendPayTd' + appendPayDiv[payi].id + '">' + bakprice + '</td>'
                    + '<td>0</td>'
                    + ' <td><div class="payment">'
                    + '<div class="col-sm-4">'
                    + '   <select class="form-control" >'
                    + '		<option value="Xj">现金</option>'
                    + '        <option value="Sk">刷卡</option>'
                    + '        <option value="Zp">支票</option>'
                    + '        <option value="Weixin">汇款-微信</option>'
                    + '        <option value="Zfb">汇款-支付宝</option>'
                    + '        <option value="Wl">汇款-网络</option>'
                    + '        <option value="Zz">银行转账</option>'
                    + '        <option value="Fq">分期</option>'
                    + '    </select>'
                    + '</div>'
                    + '<div class="col-sm-5">'
                    + '     <input ondblclick="dbclick(this)" class="form-control" onkeyup="sshj(this)" type="text" placeholder="0" >'
                    + ' </div>'
                    + '<div class="col-sm-3">'
//                    + '<i  onclick="addRowPay(this)" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
                    + '<input type="checkbox" value="' + bakprice + '" onclick="isEnableKF(this)" style="opacity:1;position:static;" />'
                    + '</div>'
                    + '</div>'
                    + '</td>'
                    + '<td>' + appendPayDiv[payi].price + '</td>'
                    + '</tr>');
            } else {
                if (appendPayDiv[payi].childs) {
                    var sz = eval(appendPayDiv[payi].childs);
                    var str = '';
                    for (var i = 0; i < sz.length; i++) {
                        str = str + '  <label>'
                            + '     <input checked onclick="checkhj(this)" type="checkbox" class="" name="">'
                            + sz[i].name + ':<span class="text">' + sz[i].price + '</span>'
                            + '  </label>'
                    }
                    $('#fdfsz').html(str);

                    $('#appendPayBody').append('<tr>'
                        + ' <td>' + appendPayDiv[payi].name + '</td>'
                        + '<td class="fdfjr" id="appendPayTd' + appendPayDiv[payi].id + '">' + appendPayDiv[payi].price + '</td>'
                        + '<td>0</td>'
                        + ' <td><div class="payment">'
                        + '<div class="col-sm-4">'
                        + '   <select class="form-control" >'
                        + '		<option value="Xj">现金</option>'
                        + '        <option value="Sk">刷卡</option>'
                        + '        <option value="Zp">支票</option>'
                        + '        <option value="Weixin">汇款-微信</option>'
                        + '        <option value="Zfb">汇款-支付宝</option>'
                        + '        <option value="Wl">汇款-网络</option>'
                        + '        <option value="Zz">银行转账</option>'
                        + '        <option value="Fq">分期</option>'
                        + '    </select>'
                        + '</div>'
                        + '<div class="col-sm-5">'
                        + '     <input ondblclick="dbclick(this)"class="form-control" onkeyup="sshj(this)" type="text" placeholder="0" >'
                        + ' </div>'
                        + '<div class="col-sm-3">'
                        + '<i onclick="addRowPay(this)" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
                        + '</div>'
                        + '</div>'
                        + '</td>'
                        + '<td class="fdfjr">' + appendPayDiv[payi].price + '</td>'
                        + '</tr>');

                } else {
                    $('#appendPayBody').append('<tr>'
                        + ' <td>' + appendPayDiv[payi].name + '</td>'
                        + '<td id="appendPayTd' + appendPayDiv[payi].id + '">' + appendPayDiv[payi].price + '</td>'
                        + '<td>0</td>'
                        + ' <td><div class="payment">'
                        + '<div class="col-sm-4">'
                        + '   <select class="form-control" >'
                        + '		<option value="Xj">现金</option>'
                        + '        <option value="Sk">刷卡</option>'
                        + '        <option value="Zp">支票</option>'
                        + '        <option value="Weixin">汇款-微信</option>'
                        + '        <option value="Zfb">汇款-支付宝</option>'
                        + '        <option value="Wl">汇款-网络</option>'
                        + '        <option value="Zz">银行转账</option>'
                        + '        <option value="Fq">分期</option>'
                        + '    </select>'
                        + '</div>'
                        + '<div class="col-sm-5">'
                        + '     <input ondblclick="dbclick(this)"class="form-control" onkeyup="sshj(this)" type="text" placeholder="0" >'
                        + ' </div>'
                        + '<div class="col-sm-3">'
                        + '<i onclick="addRowPay(this)" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
                        + '</div>'
                        + '</div>'
                        + '</td>'
                        + '<td>' + appendPayDiv[payi].price + '</td>'
                        + '</tr>');
                }
            }
        }
        $('#appendPayBody').append('<tr>'
            + ' <td>总计</td>'
            + '<td id="zjprice">' + price + '</td>'
            + '<td></td>'
            + ' <td><div class="payment">'
            + '<div class="col-sm-4">'
            + '</div>'
            + '<div class="col-sm-5">'
            + ' '
            + ' </div>'
            + '<div class="col-sm-3">'
            + '</div>'
            + '</div>'
            + '</td>'
            + '<td></td>'
            + '</tr>');
        $('#appendPayBody').append('<tr>'
            + ' <td>优惠券</td>'
            + '<td id="yhqprice">0</td>'
            + '<td></td>'
            + ' <td><div class="payment">'
            + '<div class="col-sm-4">'
            + '</div>'
            + '<div class="col-sm-5">'
            + ' '
            + ' </div>'
            + '<div class="col-sm-3">'
            + '</div>'
            + '</div>'
            + '</td>'
            + '<td></td>'
            + '</tr>');
        $('#appendPayBody').append('<tr>'
            + ' <td>折扣</td>'
            + '<td id="zkprice">0</td>'
            + '<td></td>'
            + ' <td><div class="payment">'
            + '<div class="col-sm-4">'
            + '</div>'
            + '<div class="col-sm-5">'
            + '折扣只是针对培训费用的折扣比'
            + ' </div>'
            + '<div class="col-sm-3">'
            + '</div>'
            + '</div>'
            + '</td>'
            + '<td></td>'
            + '</tr>');
        $('#appendPayBody').append('<tr>'
            + ' <td>合计</td>'
            + '<td id="hjprice">' + price + '</td>'
            + '<td class="sjhj" id="sjhj">0</td>'
            + ' <td><div class="payment">'
            + '<div class="col-sm-4">'
            + '</div>'
            + '<div class="col-sm-5">'
            + ' '
            + ' </div>'
            + '<div class="col-sm-3">'
            + '</div>'
            + '</div>'
            + '</td>'
            + '<td class="cfhj" id="cfhj"></td>'
            + '</tr>');
    }
    var zk = eval($('#selfYH2').val()==''?0:$('#selfYH2').val())+eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());
    $('#zkprice').html(zk);
    
    hheji();
}
function isEnableKF(e) {
    if (e.checked) {
    	$(e).parents('tr').children('td').eq(1).text(0);
        $(e).parents('tr').children('td').eq(3).find('input[type=text]').val(0);
        $(e).parents('tr').children('td').eq(4).text(0);
    } else {
    	 $(e).parents('tr').children('td').eq(1).text($(e).val());
         $(e).parents('tr').children('td').eq(4).text($(e).val());
    }
    var cfid = '';
    var cfhj = 0;
    $('#appendPayBody').find('tr').each(function (i,e) {
    	cfid = $(this).find('td').eq(1);
        if ($(cfid).attr('id') == "appendPayTd"+(i+1)) {
            lss = cfid.text();
            cfhj = cfhj + eval((lss != null && lss != '') ? lss : 0);
        }
    });
	var   yh = $('#yhqprice').text();
	var zk = $('#zkprice').text();
    $('#hjprice').text(cfhj-yh-zk);
}


function bakdp(e){
	var sum = 0;
    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
    });
    return sum;
}

/**
 * 实时计算
 * @param e
 * @returns
 */
function sshj(e) {
    var num = Number($(e).val());
    if (!num && num != 0) {
        toastr.error("请输入正确的付款金额，不能为负数！");
        $(e).val(0);
    }
    var sum = 0;
    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
    });
    var dprice = $('#dingzuoI').val();
    dprice = dprice==''?0:dprice;
    var a1 = eval($('#selfYH2').val()==''?0:$('#selfYH2').val());
	var a2 = eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());
    dprice = eval(dprice) + eval(a1) + eval(a2);
    
    var td = $(e).parents('tr').find('td').eq(1);
    if(td[0].id!='appendPayTd1'){
    	dprice = 0;
    }
    var yj = $(e).parents('tr').children('td').eq(1).text();
	if(dprice!=null&&dprice!=''){
		if ((eval(yj) - eval(sum) - eval(dprice)) < 0) {
			if($(e).attr('isat')!='1'){
				e.value = eval(yj)  - eval(dprice);
	    		sum = eval(yj)  - eval(dprice);
			}else{
				 e.value = '';
	    		 sum = bakdp(e);
			}
		}
	}else{
		if (yj - sum < 0) {
			if($(e).attr('isat')!='1'){
				e.value = '';
	    		sum = 0;
			}else{
				e.value = '';
	    		sum = yj;
			}
		}
	}
        
    $(e).parents('tr').children('td').eq(2).text(sum);
    
    if(dprice!=null){
    	$(e).parents('tr').children('td').eq(4).text(yj - sum - dprice);
    }else{
    	$(e).parents('tr').children('td').eq(4).text(yj - sum);
    }
    hheji();
}
function addRowPay(e) {
    $(e).parent().parent().parent().append('<div class="payment">'
        + ' <div class="col-sm-4" >'
        + '     <select class="form-control">'
        + '		<option value="Xj">现金</option>'
        + '        <option value="Sk">刷卡</option>'
        + '        <option value="Zp">支票</option>'
        + '        <option value="Weixin">汇款-微信</option>'
        + '        <option value="Zfb">汇款-支付宝</option>'
        + '        <option value="Wl">汇款-网络</option>'
        + '        <option value="Zz">银行转账</option>'
        + '        <option value="Fq">分期</option>'
        + '     </select>'
        + '  </div>'
        + '  <div class="col-sm-5">'
        + '     <input class="form-control" isat="1" onkeyup="sshj(this)" type="text" placeholder="0" >'
        + ' </div>'
        + '<div class="col-sm-3">'
        + '  <i onclick="removeRowPay(this)" class="fa fa-minus-circle danger control-label"></i>'
        + '</div>'
        + '</div>');
}
function removeRowPay(e) {
    $(e).parent().parent().remove();
}
/**
 * 优惠吗教研
 * @returns
 */
function activtyCode(e, id) {
    if (e.value.length == 8) {
        $.ajax({
            url: ctx + '/bizActivityCode/loadCode',
            type: 'POST',
            data: {
                code: $(e).val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.length != 0) {
                    if (data[0].useStatus == "1") {
                        toastr.error("该优惠码已经被使用");
                    } else {
                        toastr.success("该优惠码可以使用，优惠金额：" + data[0].amount);
                        $('#yhqprice').text(data[0].amount);
                        hheji();
                    }
                } else {
                    toastr.error("优惠码不存在");
                }
            }
        });
    } else {
        $('#yhqprice').text(0);
    }
}
/**
 * 校验5
 * @param e
 * @returns
 */
function jiaoyan5(e) {
	
	$('#appendPayBody').find('input[type="text"]').val('');
	
    $('#appendPayBody').find('tr').each(function (i,e) {
        $(this).find('td').eq(2).text('');
    })
	
    var jy = /^[0-9]*$/;
    var cd = '{7}';

    var jt = $('#appendPayTd1').text()*0.05;

    try {
    	var a1 = eval($('#selfYH2').val()==''?0:$('#selfYH2').val());
    	var a2 = eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());
    	var a3 = a1+a2;
    	if(a3>jt){
        	toastr.error("超出优惠额度");
        	e.value=0;
        }
    	$('#zkprice').text(a1+a2);
    	hheji();
    } catch (e) {
        e.value = "";
    }
}
function hheji() {
    var zj = $('#zjprice').text();
    var hj = $('#hjprice').text();
    var yh = 0;
    var sjhj = 0;
    var cfhj = 0;
    var lss = 0;
    var jlid = '';
    var cfid = '';
    $('#appendPayBody').find('tr').each(function (i,e) {
        jlid = $(this).find('td').eq(2);
        cfid = $(this).find('td').eq(4);
        
        if ($(jlid).attr('id') != "sjhj") {
            lss = jlid.text();
            sjhj = sjhj + eval((lss != null && lss != '') ? lss : 0);
        }
        if ($(cfid).attr('id') != "cfhj") {
            lss = cfid.text();
            cfhj = cfhj + eval((lss != null && lss != '') ? lss : 0);
        }
    })
    if ($('.holidayPromo').is(':checked')) {
        yh = $('#yhqprice').text();
    }
    var zk = $('#zkprice').text();
    var hj = eval(zj - zk - yh);
    $('#hjprice').text(hj);
    $('#sjhj').text(sjhj);
    if (cfhj > 0) {
        $('#appendPayTr').show();
    } else {
        $('#appendPayTr').hide();
    }
    
    yh = yh==''?0:yh;
    zk = zk==''?0:zk;
    
    $('#cfhj').text(cfhj-yh-zk);
}
//报考地区
function examRegion() {
    $(".examRegion").on({
        focus: function () {
            $('.attribution').show();
        },
        click: function () {
            $('.attribution').show();
        },
    });
}
//优惠类型
function preferentialType(ele) {
    if ($(ele).prop('checked')) {
        $(ele).parent().parent().siblings().show();
    } else {
//    	$('#selfYH2').val(0)
//    	$('#ortherYH2').val(0)
        $(ele).parent().parent().siblings().hide();
    }

    $(ele).click(function () {
        if ($(this).prop('checked')) {
            $(this).parent().parent().siblings().show();
        } else {
//        	$('#selfYH2').val(0)
//        	$('#ortherYH2').val(0)
//        	$('#zkprice').text(0);
            $(this).parent().parent().siblings().hide();
        }
        hheji();
    })
}
/**
 * 沟通待沟通联动计算量
 * @returns
 */
function loadGT_DGT(record) {
    $.ajax({
        type: "post",
        url: ctx + "/bizScale/loadProject",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].projectId);
                if (record.projectId == data[i].projectId) {
                    o.selected = true;
                }
                document.getElementById("project1").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("project1").options.add(def, 0);
        }
    })

    $.ajax({
        type: "post",
        url: ctx + "/bizScale/loadProjectLevel",
        data: {"projectId": record.projectId},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].levelTitle, data[i].projectLevelId);
                if (record.projectLevelId == data[i].projectLevelId) {
                    o.selected = true;
                }
                document.getElementById("projectLevel1").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("projectLevel1").options.add(def, 0);
        }
    })


    $.ajax({
        type: "post",
        url: ctx + "/bizExamSetting/load",
        data: {
            projectLevelId: record.projectLevelId
        },
        dataType: "json",
        success: function (data) {
            var data = data.returnObject.aaData;
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].examDate, data[i].examSettingId);
                if (record.kTime == data[i].examSettingId) {
                    o.selected = true;
                }
                document.getElementById("kTime1").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("kTime1").options.add(def, 0);
        }
    })

    $.ajax({
        url: ctx + '/bizProduct/loadProductPrice',
        type: 'POST',
        data: {
            projectId: record.projectId,
            projectLevelId: record.projectLevelId,
            schoolId: record.departmentId1
        },
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].className, data[i].productId);
                var price = "";
                if (record.classId == data[i].productId) {
                    var arPrice = eval(data[i].price == null ? 0 : data[i].price);
                    for (var k = 0; k < arPrice.length; k++) {
                        if (arPrice[k] != "null" && arPrice[k] != null) {
                            if (arPrice[k].id == "2") {
                                if (arPrice[k].price != "null" && arPrice[k].price != "0" && arPrice[k].price != null) {
                                    price = price + arPrice[k].price;
                                } else {
                                    price = price + data[i].levelPrice == null ? 0 : data[i].levelPrice;
                                }
                            } else {
                                price = eval(price + (arPrice[k].price == null ? 0 : arPrice[k].price));
                            }
                        }
                    }
                    o.selected = true;
                    $('#classPrice1').val(price);
                }
                $(o).attr("priceList", data[i].price);
                $(o).attr("price", price);
                document.getElementById("classId1").options.add(o);
            }
            var def = new Option("--请选择--", '');
            document.getElementById("classId1").options.add(def, 0);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

/**
 * 咨询量记录代码机
 * @returns
 */
function statusRemember(id, val, content, serverDate) {
    var data = "";
    if (serverDate != null) {
        data = {
            infoManageId: id,
            status: val,
            content: content,
            serverDate: serverDate
        }
    } else {
        data = {
            infoManageId: id,
            status: val,
            content: content
        }
    }
    $.ajax({
        type: "POST",
        url: ctx + "/consultInfoManageServer/addNewRecord",
        data: data,
        dataType: 'json',
        success: function (msg) {

        }
    });
}
(function ($) {
    $.fn.myScroll = function (options) {
        var defaults = {
            speed: 40,
            rowHeight: 24
        };
        var opts = $.extend({}, defaults, options),
            intId = [];

        function marquee(obj, step) {
            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", -5);
                }
            });
        }

        this.each(function (i) {
            var sh = opts["rowHeight"],
                speed = opts["speed"],
                _this = $(this);
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });
    }
})(jQuery);


//优惠
$(".benefit").click(function () {
    if (this.checked) {
        $(this).parents().find(".youhui").css({
            "display": "block"
        })
    } else {
        $(this).parents().find(".youhui").css({
            "display": "none"
        })
    }

})

$(".benefit_ma").click(function () {
    if (this.checked) {
        $(this).parents().find(".youhuima").css({
            "display": "block"
        })
    } else {
        $(this).parents().find(".youhuima").css({
            "display": "none"
        })
    }

})

$(".fenxiao").click(function () {
    if (this.checked) {
        $(this).parents().find(".fenxiao_content").css({
            "display": "block"
        })
    } else {
        $(this).parents().find(".fenxiao_content").css({
            "display": "none"
        })
    }

})

//日期控件
$(function () {

    $('#reservation').daterangepicker({
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

    $('#reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#reservation1').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
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

    $('#reservation1').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#reservation2').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
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

    $('#reservation2').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#reservation3').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
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

    $('#reservation3').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#reservation4').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
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

    $('#reservation4').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('#reservation5').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
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

    $('#reservation5').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
})


//缴费
$(".add_row").click(function () {
    var add_content = '<div  class="row clear_both form_margin">' +
        '<div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
        '<select class="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
        '<option value="Xj">现金</option>' +
        '<option value="Sk">刷卡</option>' +
        '<option value="Zp">支票</option>' +
        '<option value="Weixin">汇款-微信</option>' +
        '<option value="Zfb">汇款-支付宝</option>' +
        '<option value="Zz">汇款-网络</option>' +
        '<option value="Fq">银行转账</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
        '<input class="form-control" onkeyup="bufei(this)"  placeholder="0" type="number">' +
        '</div>' +
        '<a href="javascript:void(0);" class="btn btn-info btn-xs  minus_row"><i class="fa fa-minus-circle"></i></a>' +
        '</div>';
    $(this).parent().first().after(add_content);
    //删除新增信息
    $(".minus_row").click(function () {
        $(this).parent().remove();
    })
})
//显示隐藏
$(".hide_content").click(function () {
    $(this).siblings().toggle();
})

$(".add_jiaofei").click(function () {
    loadBeforePay();
    $('#jiaofeitrue').removeClass("disabled");
    $('.bs-example-modal-lg4').find('input').val('');
    $('.jiaofeil .position_rel').each(function(index,ele){
    	$(ele).find('.form_margin:not(:last)').remove();
    })
})


//弹窗层级
$('.bs-example-modal-lg4,.recordIn,.information,.customer').on('show.bs.modal', function () {
	$('.record-btn').attr('disabled',false);
    $('.bs-example-modal-lga,.bs-example-modal-lg1').css('z-index', 1039);
}).on('hide.bs.modal', function () {
    $('.bs-example-modal-lga,.bs-example-modal-lg1').css('z-index', 1050);
})

//右侧按钮
$(".yidong").hover(function () {
    $(this).find("ul").fadeIn(500)
}, function () {
    $(this).find("ul").fadeOut(500)
})

//编辑切换效果
$(".btn_special_edit").click(function () {
    $(this).parent().parent().parent().parent().find(".comment_disabled").attr({"disabled": false});
    $(this).parent().parent().parent().parent().find(".comment_disabled").css('border-color', '#5db2ff');
    $(this).parent().parent().parent().parent().find(".chosen-select").attr({"disabled": false});
    $(this).parent().parent().parent().parent().find(".chosen-select").css('border-color', '#5db2ff');
    $(this).parent().parent().parent().parent().find(".chosen-select").trigger('chosen:updated');
})

//折叠
$(".collapse-btn").click(function () {
    $(this).parent().parent().siblings().slideToggle(400);
})

//呼出、查看信息编辑按钮
$(".call-out").click(function () {
    $('.btn_special_edit').hide().parents().find(".comment_disabled").attr({"disabled": false});
})
$(".ck").click(function () {
    $('.btn_special_edit').show().parents().find(".comment_disabled").attr({"disabled": "disabled"});
})


/**
 * 初始化
 * @returns
 */
function init() {
    var init = $('#table11').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": true, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultInfoManage/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData,
        "aoColumns": [
            {"mDataProp": "departmentName1","bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "recordNextTime", "bSortable": true, 'sClass': "text-center"},
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "projectName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {
                "mDataProp": "projectLevelName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "brandName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "create_date", "bSortable": true, 'sClass': "text-center","mRender": function (data, type, full) {
                    return full["createDate"];
            }},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-out" data-toggle="modal" data-target=".bs-example-modal-lg1" data-backdrop="static"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a>'
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a>'
                return u1 + u2 + u3;

                }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]

    });

    $("#table11_wrapper").removeClass();
    $('#table11_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#table11_wrapper .dataTables_info').parent().append($('#table11_wrapper .dataTables_length'));
    HScrollBar('#table11_wrapper');
}

/**
 * 初始已沟通
 * @returns
 */
function init2() {
    var init = $('#table22').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": true, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultInfoManage/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData2,
        "aoColumns": [
            {"mDataProp": "departmentName1","bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "projectLevelName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "brandName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "serverDropFalse",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '1') {
                        return '预约未上门';
                    } else {
                        return '未预约';
                    }

                }
            },
            {
                "mDataProp": "studentMaturity",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '') {
                        return '-';
                    } else if(data==1){
                        return 'A类';
                    }else if(data==2){
                    	return 'B类';
                    }else if(data==3){
                    	return 'C类';
                    }else if(data==4){
                    	return 'D类';
                    }
                }
            },
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var a = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-info" data-toggle="modal" data-target=".zxmx"><i class="fa fa-comment blue" data-toggle="tooltip" data-placement="top" title="查看"></i></a></a>';
                return a;
            }
            },
            {"mDataProp": "recordNextTime", "bSortable": true, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a></a>'
                return u1 + u2 + u3;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table22_wrapper").removeClass();
    $('#table22_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#table22_wrapper .dataTables_info').parent().append($('#table22_wrapper .dataTables_length'));
    HScrollBar('#table22_wrapper');
}
/**
 * 初始预约单
 * @returns
 */
function init3() {
    var init = $('#table33').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": true, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultInfoManage/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData3,
        "aoColumns": [
            {
                "mDataProp": "infoManageId","bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return "<label> <input id=" + data + " type='checkbox' class='slaver3'> <span class='text'></span> </label>";
            }
            },
            {"mDataProp": "serverId","bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "serverDate", 'sClass': "text-center"},
            {"mDataProp": "schoolName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "departmentName1", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "projectLevelName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "classAttr", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "classPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a>'
                var a = '<a href="#" data-record=\'' + JSON.stringify(full) + '\'  class="yywsm" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lgyywsm" ><i class="return primary" data-toggle="tooltip" data-placement="top" title="预约未上门">未</i></a>';
                return u1 + u2 + u3 + a;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table33_wrapper").removeClass();
    $('#table33_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#table33_wrapper .dataTables_info').parent().append($('#table33_wrapper .dataTables_length'));
    HScrollBar('#table33_wrapper');
}

/**
 * 初始上门信息
 * @returns
 */
function init4() {
    var init = $('#table44').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "sWrapper": "table-scrollable",
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultInfoManage/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData4,
        "aoColumns": [
            {"mDataProp": "serverId","bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "dropDate","bSortable": false, 'sClass': "text-center",
            },
            {"mDataProp": "departmentName1", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "schoolName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '') {
                        return '线上支付';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "projectLevelName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    var a = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-info" data-toggle="modal" data-target=".zxmx"><i class="fa fa-comment blue" data-toggle="tooltip" data-placement="top" title="查看"></i></a></a>';
                    return a;
                }
            },
            {"mDataProp": "classAttr", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "classPrice", "bSortable": false, 'sClass': "text-center"},
//            {
//                "mDataProp": "dropContent", 'sClass': "text-center", "mRender": function (data, type, full) {
//                var a = "";
//                if (full['dropContent'] != null && full['dropContent'] != '') {
//                    var str = full['dropContent'].split(',');
//                    for (var i = 0; i < str.length; i++) {
//                        a = a + str[i] + "<br>";
//                    }
//                }
//                return a;
//            }
//            },
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a></a>'
                return u1 + u2 + u3;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table44_wrapper").removeClass();
    $('#table44_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table44_wrapper .dataTables_info').parent().append($('#table44_wrapper .dataTables_length'));
    HScrollBar('#table44_wrapper');
}

/**
 * 初始订座信息
 * @returns
 */
function init5() {
    var init = $('#table55').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "sWrapper": "table-scrollable",
        "bSort": true, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultInfoManage/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData5,
        "aoColumns": [
            {"mDataProp": "bmcode","bSortable": false,'sClass': "text-center"},
            {
                "mDataProp": "dingZDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                return jsDateFormat(full['dingZDate']);
            }
            },
            {
                "mDataProp": "next_pay_time", 'sClass': "text-center", "mRender": function (data, type, full) {
                	return full['nextPayTime'];
            }
            },
            {"mDataProp": "departmentName1", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "schoolName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '') {
                        return '线上支付';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "projectLevelName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "classAttr", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "classPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "dPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "sumPrice", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return full['classPrice']  - full['dPrice'];
            }},
            {
                "mDataProp": "printCount", 'sClass': "text-center"
            },
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#"  data-record=\'' + JSON.stringify(full) + '\'class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a></a>'
                return u1 + u2 + u3;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table55_wrapper").removeClass();
    $('#table55_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table55_wrapper .dataTables_info').parent().append($('#table55_wrapper .dataTables_length'));
    HScrollBar('#table55_wrapper');
}

/**
 * 初始报名信息
 * @returns
 */
function init6() {
    var init = $('#table66').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "sWrapper": "table-scrollable",
        "bSort": true, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/consultInfoManage/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData6,
        "aoColumns": [
            {"mDataProp": "bmcode","bSortable": false,'sClass': "text-center"},
            {"mDataProp": "baoMDate",'sClass': "text-center"},
            {
                "mDataProp": "next_pay_time", 'sClass': "text-center", "mRender": function (data, type, full) {
                var res = full['sumPrice'] - full['sPrice'] - full['dPrice'];
                if (res == 0) {
                    return '费用已补齐';
                } else {
                    return full['nextPayTime'];
                }
            }
            },
            {"mDataProp": "departmentName1", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "schoolName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '') {
                        return '线上支付';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "projectName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "projectLevelName",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == '--请选择--') {
                        return '-';
                    } else {
                        return data;
                    }
                }
            },
            {"mDataProp": "classAttr", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "sumPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "sPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                return eval(full['sPrice']) + eval(full['dPrice']==''?0:full['dPrice']);
            }},
            {
                "mDataProp": "sumPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                return full['sumPrice'] - full['sPrice'] - full['dPrice'];
            }
            },
            {
                "mDataProp": "printCount", 'sClass': "text-center"
            },
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + full.infoManageId + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a>'
                var u3 = '<a href="#" data-record=\'' + full.infoManageId + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a>'
                return u1 + u2 + u3;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table66_wrapper").removeClass();
    $('#table66_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#table66_wrapper .dataTables_info').parent().append($('#table66_wrapper .dataTables_length'));
    HScrollBar('#table66_wrapper');
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "catLab", "value": 1});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "serverDropFalse", "value": -1});
    aoData.push({"name": "mustPay", "value": -1});
    
    aoData.push({"name": "studentPhone", "value": $('#phoneCall').val()});
    aoData.push({"name": "studentName", "value": $('#fullName').val()});
    aoData.push({"name": "projectId", "value": $('#lesson').val()});
    aoData.push({"name": "projectLevelId", "value": $('#grade').val()});
    
    $.ajax({
        "type": "Post",
        "url": ctx + '/consultInfoManage/loadSum',
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            for (var i = 0; i < resp.length; i++) {
                if (resp[i].key == "2") {
                    $('span[id=spanDGT]').text(resp[i].value);
                }
                if (resp[i].key == "3") {
                    $('span[id=spanYGT]').text(resp[i].value);
                }
                if (resp[i].key == "4") {
                    $('span[id=spanYYD]').text(resp[i].value);
                }
                if (resp[i].key == "5") {
                    $('span[id=spanSM]').text(resp[i].value);
                }
                if (resp[i].key == "6") {
                    $('span[id=spanDZ]').text(resp[i].value);
                }
                if (resp[i].key == "7") {
                    $('span[id=spanBM]').text(resp[i].value);
                }
            }
        }
    });
    /**
     * 参数添加
     */
    aoData.push({"name": "status", "value": 2});
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    
    
    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }
   
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1] + " 23:59:59"
    });
    aoData.push({"name": "searchVal", "value": $("#searchVal").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanDGT]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });


}

/**
 * 回调函数已沟通
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData2(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "studentPhone", "value": $('#phoneCall1').val()});
    aoData.push({"name": "studentName", "value": $('#fullName1').val()});
    aoData.push({"name": "projectId", "value": $('#lesson1').val()});
    aoData.push({"name": "projectLevelId", "value": $('#grade1').val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation1").val().split("到") == '' ? "" : $("#reservation1").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation1").val().split("到") == '' ? "" : $("#reservation1").val().split("到")[1] + " 23:59:59"
    });
    
    var studentMY = $('#studentMY').val();
    if(studentMY!=0){
    	aoData.push({"name": "studentMaturity", "value": studentMY});
    }

    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }
    
    aoData.push({"name": "status", "value": 3});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal2").val()});
    var re = $("input[name^='depStatus']:checked").val();
    aoData.push({"name": "mustPay", "value": -1});
    if (!re == '') {
        aoData.push({"name": "serverDropFalse", "value": re});
    } else {
        aoData.push({"name": "serverDropFalse", "value": -1});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanYGT]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

/**
 * 回调函数预约单
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData3(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "studentPhone", "value": $('#phoneCall2').val()});
    aoData.push({"name": "studentName", "value": $('#fullName2').val()});
    aoData.push({"name": "projectId", "value": $('#lesson2').val()});
    aoData.push({"name": "projectLevelId", "value": $('#grade2').val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation2").val().split("到") == '' ? "" : $("#reservation2").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation2").val().split("到") == '' ? "" : $("#reservation2").val().split("到")[1] + " 23:59:59"
    });

    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }

    aoData.push({"name": "status", "value": 4});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal3").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanYYD]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

/**
 * 回调函数上门
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData4(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "studentPhone", "value": $('#phoneCall3').val()});
    aoData.push({"name": "studentName", "value": $('#fullNamefullName3').val()});
    aoData.push({"name": "projectId", "value": $('#lesson3').val()});
    aoData.push({"name": "projectLevelId", "value": $('#grade3').val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation3").val().split("到") == '' ? "" : $("#reservation3").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation3").val().split("到") == '' ? "" : $("#reservation3").val().split("到")[1] + " 23:59:59"
    });

    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }

    aoData.push({"name": "status", "value": 5});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal4").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanSM]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

/**
 * 回调函数订座
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData5(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "studentPhone", "value": $('#phoneCall4').val()});
    aoData.push({"name": "studentName", "value": $('#fullNamefullName4').val()});
    aoData.push({"name": "projectId", "value": $('#lesson4').val()});
    aoData.push({"name": "projectLevelId", "value": $('#grade4').val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation4").val().split("到") == '' ? "" : $("#reservation4").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation4").val().split("到") == '' ? "" : $("#reservation4").val().split("到")[1] + " 23:59:59"
    });

    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }
    
    aoData.push({"name": "status", "value": 6});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal5").val()});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanDZ]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

/**
 * 回调函数报名
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData6(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "studentPhone", "value": $('#phoneCall5').val()});
    aoData.push({"name": "studentName", "value": $('#fullNamefullName5').val()});
    aoData.push({"name": "projectId", "value": $('#lesson5').val()});
    aoData.push({"name": "projectLevelId", "value": $('#grade5').val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[1] + " 23:59:59"
    });

    var sort = '';
    if(oSettings.aaSorting!=null){
    	var oa = oSettings.aaSorting;
    	var sortNum = '';
    	for(var o=0;o<oa.length;o++){
    		sortNum = oa[0][0];
    		if(sortNum!='0'){
    			sort = sort + oSettings.aoColumns[oa[0][0]].mData + " " + oa[0][1] + ',';
    		}
    	}
    }
    sort = sort.substring(0,sort.length-1);
    if(sort!=''){
    	aoData.push({
	        "name": "sort",
	        "value": sort
	    });
    }
    
    aoData.push({"name": "status", "value": 7});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal6").val()});
    var re = $("input[name^='mustPay']:checked").val();
    if (!re == '') {
        aoData.push({"name": "mustPay", "value": re});
        $.ajax({
            "type": "Post",
            "url": ctx + "/consultInfoManage/ajaxLoadMustPaySum",
            "dataType": "json",
            "success": function (data) {
            	  if (re==0){
                      $('#arrearage').show();
                      if (data) {
                          $('#mustPaySum').text(data.mustPaySum);
                      }
            	  }else{
            		  //$('#mustPaySum').text('');
                      $('#arrearage').hide();
            	  }
            }
        });
    } else {
        aoData.push({"name": "mustPay", "value": -1});
    }
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            $('span[id=spanBM]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
$(document).on('change', 'input:checkbox.master', function () {
    if ($(this).prop('checked')) {
        $('input:checkbox.slaver').prop('checked', 'checked');
    } else {
        $('input:checkbox.slaver').prop('checked', '');
    }
})
$(document).on('change', 'input:checkbox.master3', function () {
    if ($(this).prop('checked')) {
        $('input:checkbox.slaver3').prop('checked', 'checked');
    } else {
        $('input:checkbox.slaver3').prop('checked', '');
    }
})
/**
 * 分配接待人
 * @returns
 */
function toChooseAr() {
    var idAr = "";
    $('.slaver3').each(function () {
        if (this.checked) {
            idAr = idAr + this.id + ",";
        }
    })
    idAr = idAr.substring(0, idAr.length - 1);
    var counselor = $('#statusFP').find("option:selected").text();
    var counselorId = $('#statusFP').val();
    if (counselorId == '0') {
        toastr.error('当前咨询师无效');
        return;
    }
    if (idAr == '') {
        toastr.error('当前无信息被选中');
        return;
    }
    $.ajax({
        "type": "Post",
        "url": ctx + "/consultConsole/toChooseAr",
        "dataType": "json",
        "data": {
            ar: idAr,
            reviceName: counselor,
            reviceId: counselorId
        },
        "success": function (data) {
            if (data == "success") {
                toastr.success('分配完成');
                $('#statusFP').val(0);
                init3();
            }
        }
    });
}

/**
 * 添加回访信息
 * @returns
 */
function addRecord() {
	formUpdate.addRecord();
}
/**
 * 添加缴费信息
 * @returns
 */
function payModel() {
    var pr = $('#classId2 option:selected').attr('pricelist');
    $('#payForDiv').hide();
    $('#roadWay').show();
    if (pr == undefined) {
        toastr.error("请先选择班型");
        $('.bs-example-modal-lg4').modal('hide');
        return;
    }
    pr = JSON.parse(pr);
    for (var i = 0; i < pr.length; i++) {
        if (pr[i].id == 1) {
            $('#pxfp').text('(' + pr[i].price + ')');
        }
        if (pr[i].id == 2) {
            $('#kwfp').text('(' + pr[i].price + ')');
        }
        if (pr[i].id == 3) {
            $('#zlfp').text('(' + pr[i].price + ')');
        }
        if (pr[i].id == 4) {
            $('#xyfp').text('(' + pr[i].price + ')');
        }
        if (pr[i].id == 5) {
            $('#jcfp').text('(' + pr[i].price + ')');
        }
        if (pr[i].id == 6) {
            $('#fufp').text('(' + pr[i].price + ')');
        }
    }
}
/**
 * 确认缴费信息
 * @returns
 */
function payForNext() {
    $('#payForDiv').show();
    $('#roadWay').hide();
    var pxf = new Array();
    var xyf = new Array();
    var fuf = new Array();
    var jcf = new Array();
    var zlf = new Array();
    var kwf = new Array();
    var arstr = ['pxf', 'xyf', 'fuf', 'jcf', 'zlf', 'kwf'];
    for (var i = 0; i < arstr.length; i++) {
        $('select[name^="' + arstr[i] + 's"]').each(function () {

        });
    }
}
function publicMainModel(e) {
    var record = $(e).data('record');
    $("#updateInfoManage2").data('bootstrapValidator').resetForm();
    publicJsonModel(record);
}
/**
 * 状态修改
 * @returns
 */
function isCkOption(id, isCkOption) {
    if (isCkOption != 1) {
        $.ajax({
            type: "POST",
            url: ctx + "/consultInfoManage/updateRecord",
            data: {
                infoManageId: id,
                isCkOption: 1
            },
            dataType: 'json',
            success: function (msg) {

            }
        });
    }
}
/**
 * 公共弹出框
 * @returns
 */

function publicJsonModel(record) {

    $('#appendPayTr').hide();
    $('#classPrice2').val('');
    $('#kTime1').val('');
    if (record.studentMaturity == '1') {
        $('#studentMaturity2').text('A类');
    }
    if (record.studentMaturity == '2') {
        $('#studentMaturity2').text('B类');
    }
    if (record.studentMaturity == '3') {
        $('#studentMaturity2').text('C类');
    }
    if (record.studentMaturity == '4') {
        $('#studentMaturity2').text('D类');
    }
    $('#studentInfoManageId').val(record.studentInfoManageId);
    $('#upshir2').removeAttr('disabled');
    $('#buttonStatus2').val('');
    $('#infoManageId2').val(record.infoManageId);

    $('#studentName2').val(record.studentName);
    $('#studnetSex2').val(record.studnetSex);
    $('#age2').val(record.age);
    if (record.studentPhone != '' && record.studentPhone != undefined) {
        $('#studentPhone2').val("****" + (record.studentPhone).substring(record.studentPhone.length - 4, record.studentPhone.length));
        $('#studentPhone3').val(record.studentPhone);
    }
    $('#email2').val(record.email);
    $("#creationDate").val(record.createDate);
    $('#weChat2').val(record.weChat);
    $('#tengXun2').val(record.tengXun);
    $('#ortherPhone2').val(record.ortherPhone);
    $('#phoneAddress2').val(record.phoneAddress);
    $('#workSpace2').val(record.workSpace);

    $('#sPriceHid2').val(record.sPrice);

    $("select[id^='adddepartmentId1']").val(record.departmentId1);

    var st = record.status;
    $('#status2').val(st);
    
    if(buttonRole(st,"call")){
    	$("li[name='upli21']").show();
    }else{
    	$("li[name='upli21']").hide();
    }
    if(buttonRole(st,"back")){
    		$("li[name='upli22']").show();
    }else{
    		$("li[name='upli22']").hide();
    }
    
    if(buttonRole(st,"msg")){
    	$("li[name='upli23']").show();
    }else{
    	$("li[name='upli23']").hide();
    }
    
    if(buttonRole(st,"email")){
    	$("li[name='upli28']").show();
    }else{
    	$("li[name='upli28']").hide();
    }
    
    if(buttonRole(st,"server")){
    	$("li[name='upli24']").show();
    }else{
    	$("li[name='upli24']").hide();
    }
    
    if(buttonRole(st,"drop")){
    	$("li[name='upli25']").show();
    }else{
    	$("li[name='upli25']").hide();
    }
    
    if(buttonRole(st,"dingzuo")){
    	$("li[name='upli26']").show();
    }else{
    	$("li[name='upli26']").hide();
    }
    
    if(buttonRole(st,"baoming")){
    	$("li[name='upli27']").show();
    }else{
    	$("li[name='upli27']").hide();
    }
    
    if(buttonRole(st,"print")){
    	$("li[name='upli29']").show();
    }else{
    	$("li[name='upli29']").hide();
    }
    
    if(buttonRole(st,"jiaofei")){
    	$("li[name='upli210']").show();
    }else{
    	$("li[name='upli210']").hide();
    }
    
    if (record.status == '2' || record.status == '3') {
        $('#feddiv').show();
        $('#fedshure').show();
    } else {
        if (infoDisType == '1') {
            $('#feddiv').hide();
            $('#fedshure').hide();
        } else {
            $('#feddiv').show();
            $('#fedshure').show();
        }
    }
    if (record.status == '7') {
        $('#feddiv').hide();
        $('#fedshure').hide();
    }
    if (record.status != '6') {
        $('#dztr').hide();
    } else {
        $('#dztr').show();
    }

    if (record.jcCk == '1') {
        $('#jcCk').attr('checked', true);
    }
    if (record.jfCk == '1') {
        $('#jfCk').attr('checked', true);
    }
    $('#zlContent').val(record.zlContent);
    $('#departmentName12').text(record.departmentName1);
    $('#brandName2').text(record.brandName);
    $('#studentAttrName12').text(record.studentAttrName1);
    $('#studentAttrName22').text(record.studentAttrName2);
    $("select[name=studentAttrName3]").val(record.studentAttrName3);
    $('#studentAttrName32').val(record.studentAttrId3);
    
    
    
    $('#emergencyContact').val(record.emergencyContact);
    $('#emergencyContactMode').val(record.emergencyContactMode);
    $('#nation').val(record.nation);
    $('#bySchool').val(record.bySchool);
    $('#byZy').val(record.byZy);
    $('#idcardType2').val(record.idcardType == null ? 1 : record.idcardType);
    $('#idcard2').val(record.idcard);
    $('#infoType2').val(record.infoType==null||record.infoType==''?1:record.infoType);
    
    
    if (record.status == '2' || record.status == '3') {
        $('#xszf').show();
    } else {
    	if(infoDisType==3){
    		 $('#xszf').show();
	        
    	}else{
    		$('#xszf').hide();
    	}
    }
    $('#examRegion').val(record.examRegion);
    $('#examRegionId2').val(record.examRegionId);
    $('#reciveId2').val(record.reciveId);
    $('#departmentId12').val(record.phoneBelong);
    $('#project2').find('option').remove();
    $('#projectLevel2').find('option').remove();
    $('#classId2').find('option').remove();
    $('#kTime2').find('option').remove();
    $('#schoolFormId').find('option').remove();
    $('#proFormId').find('option').remove();
    $('#adddepartmentId12').find('option').remove();

    $('#schoolForm').val(record.schoolFrom);
    $('#proFrom').val(record.proFrom);
    $('#eduForm').val(record.eduFrom);

    $('#schoolId2').val(record.departmentId1);

    $('#projectName2').val(record.projectName);
    $('#projectLevelName2').val(record.projectLevelName);
    $('#classAttr2').val(record.classAttr);
    $('#kTimeValue2').val(record.kTimeValue);

    $('#serverId2').val(record.serverId);
    $('#serverContent2').val(record.serverContent);
    $('#nextPayTime2').val(record.nextPayTime);

    $('#dPrice').val(record.dPrice);
    $('#dingzuoI').val(record.dPrice);
    $('#dztd').text(record.dPrice);
    $('#ortherYH2').val(record.ortherYH);

    if (record.status == '7') {
        $('.btn_special_edit').hide();
    } else {
        $('.btn_special_edit').show();
    }
    $('#subscribeDate').val('');
    $('#dropFalseContent').val('');
    $('#recordNextTime').val('');
    $('#dropFalseWhy').html('');
    
    if(record.selfYH!=0&&record.selfYH!=''){
    	$('#selfYH2').parent().parent('div').show();
    	$('#preferential').attr('checked', true);
    }else{
    	$('#selfYH2').parent().parent('div').hide();
    	$('#preferential').attr('checked', false);
    }
    if(record.ortherYH!=0&&record.ortherYH!=''){
    	$('#ortherYH2').parent().parent('div').show();
    	$('#preferential').attr('checked', true);
    }else{
    	$('#ortherYH2').parent().parent('div').hide();
    	$('#preferential').attr('checked', false);
    }
    
    $('#selfYH2').val(record.selfYH);
    $('#ortherYH2').val(record.ortherYH);


    $('#zxjl').html('<tr><td>' + record.conversation + '</td></tr>');

    if (record.dropContent != null && record.dropContent != '') {
        var dropContent = record.dropContent.split(',');
        for (var i = 0; i < dropContent.length; i++) {
            $('#dropFalseWhy').append('<tr>'
                + '<td>' + dropContent[i] + '</td>'
                + '</tr>');
        }
    }
    $('#recordContent').val('');

    //初始化分校校区select
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {parentId: record.departmentId1},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option address=\"" + data.list[i].description + "\"value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("#schoolIdModel").html('<option value="">--请选择--</option>' + opt);
            $("#schoolIdModelMsg").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    $('#nextPayTime').val(getNowFormatDate());
    loadGT_YYD(record);
}

/**
 * 查询按钮功能是否启用
 * @returns
 */
function buttonRole(status,str){
	var bool = false;
	if(sessScope.indexOf(str+status)>0){
		bool = true;
	}
	return bool;
}

/**
 * 班型选择
 * @returns
 */
function roleClass(val1, val2) {
    var classId = $('#classId2').val();
    if (classId == ""||classId =="0") {
        toastr.error("请先选择班型");
        return false;
    } else if (!val2) {
        toastr.error("预约校区不能为空");
        return false;
    } else if (!val1) {
        toastr.error("预约时间不能为空");
        return false;
    } else {
        return true;
    }
}
function initCount(val) {
    $("#home3 table tbody").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    $('#home3 .mloading-mask').css({
        'top':'35px','height':'88px',
        'background-color':'rgba(233, 233, 232, 0.5)'
    });
    $.ajax({
        url: ctx + '/consultConsole/ajaxLoadCount',
        type: 'POST',
        data: {type: val},
        dataType: 'json',
        success: function (data) {
            if (data != null) {
                $('#zxl').text(data.consultNum);
                $('#sml').text(data.theDoorNum);
                $('#bml').text(data.singNum);
                $('#dzb').text((data.electricTransfer * 100).toFixed(2) + "%");
                $('#smb').text((data.faceTransfer * 100).toFixed(2) + "%");
                $('#bmb').text((data.sumTransfer * 100).toFixed(2) + "%");
            }
            sumValue(val);
            $("#home3 table tbody").mLoading('hide');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}
function sumCount() {

}
function addjiaofei(e) {
	
	var appendNextPayTime = $('#appendNextPayTime').val();
	
	if(appendNextPayTime==null||appendNextPayTime==''){
		 toastr.error("下次缴费时间为空");
		 return ;
	}
    $(e).addClass('disabled');
    var payPx = '';
    var payKw = '';
    var payZl = '';
    var payXy = '';
    var payJc = '';
    var payFw = '';
    var e = 0;
    var id = '';
    var url = '';
    var sPrice = 0;
    var obj;
    $('div[id^=addPayTd]').children('div .form_margin').each(function () {
        e = $(this);
        id = $(this).parent().attr('id');
        if (id.split('addPayTd')[1] == 1) {
            url = url + '&payPx' + $(this).find('select option:selected').val() + '=' + $(this).find('input').val();
            sPrice = sPrice + eval($(this).find('input').val() == '' ? 0 : $(this).find('input').val());
        }
        if (id.split('addPayTd')[1] == 2) {
            url = url + '&payKw' + $(this).find('select option:selected').val() + '=' + $(this).find('input').val();
            sPrice = sPrice + eval($(this).find('input').val() == '' ? 0 : $(this).find('input').val());
        }
        if (id.split('addPayTd')[1] == 3) {
            url = url + '&payZl' + $(this).find('select option:selected').val() + '=' + $(this).find('input').val();
            sPrice = sPrice + eval($(this).find('input').val() == '' ? 0 : $(this).find('input').val());
        }
        if (id.split('addPayTd')[1] == 4) {
            url = url + '&payXy' + $(this).find('select option:selected').val() + '=' + $(this).find('input').val();
            sPrice = sPrice + eval($(this).find('input').val() == '' ? 0 : $(this).find('input').val());
        }
        if (id.split('addPayTd')[1] == 5) {
            url = url + '&payJc' + $(this).find('select option:selected').val() + '=' + $(this).find('input').val();
            sPrice = sPrice + eval($(this).find('input').val() == '' ? 0 : $(this).find('input').val());
        }
        if (id.split('addPayTd')[1] == 6) {
            url = url + '&payFw' + $(this).find('select option:selected').val() + '=' + $(this).find('input').val();
            sPrice = sPrice + eval($(this).find('input').val() == '' ? 0 : $(this).find('input').val());
        }
    });

    var infoid = $('#infoManageId2').val();
    var price = $('#sPriceHidCk').val();
    if ($('#infoManageIdDel').val()) {
        infoid = $('#infoManageIdDel').val();
    }
    if ($('#infoManageId2').val()) {
        infoid = $('#infoManageId2').val();
    }
    if ($('#sPriceHidCk').val()) {
        price = $('#sPriceHidCk').val();
    }
    if ($('#sPriceHid2').val()) {
        price = $('#sPriceHid2').val();
    }
    var data = '';
    if ($('#appendNextPayTime').val() != '') {
        data = {
            sPrice: (eval(price) + eval(sPrice)),
            nextPayTime: $('#appendNextPayTime').val(),
            infoManageId: infoid
        };
    } else {
        data = {
            sPrice: (eval(price) + eval(sPrice)),
            infoManageId: infoid
        };
    }

    $.ajax({
        type: "get",
        url: ctx + "/consultInfoManagePay/addWorkBanchBF?sPrice="+sPrice+"&infoManageId=" + infoid + url,
        dataType: 'json',
        success: function (msg) {
            if (msg.status == 'success') {
                toastr.success("添加缴费成功");
                init6();
                $('.bs-example-modal-lg1').modal('hide');
                $('.bs-example-modal-lg4').modal('hide');
                $('.bs-example-modal-lga').modal('hide');
//                $.ajax({
//                    type: "POST",
//                    url: ctx + "/consultInfoManage/updateRecord",
//                    async: false,
//                    data: data,
//                    dataType: 'json',
//                    success: function (msg) {
//                        if (msg.status == 'success') {
//                            init6();
//                            $('.bs-example-modal-lg1').modal('hide');
//                            $('.bs-example-modal-lg4').modal('hide');
//                            $('.bs-example-modal-lga').modal('hide');
//                        }
//                    }
//                });
                $('.jiaofeil').modal('hide');

            } else {
                toastr.error("添加失败");
            }
        }
    });
}
/**
 * 信息回退到已沟通
 * @param val
 * @returns
 */
function toYGT() {
	formUpdate.backYGT();
}
/**
 * 发送短信
 * @returns
 */
function sendMsg() {
	$('#studentPhoneMsg').val($('#studentPhone2').val());
    $('#studentPhoneMsgHid').val($('#studentPhone3').val());
}
/**
 * 短信类型区分
 * @returns
 */
function msgTypeChange(e) {
    var val = $(e).val();
    if($('#studentName2').val()){
    	val = val.replace('{studentName}', $('#studentName2').val());
    }else{
    	val = val.replace('{studentName}', '{}');
    }

    if($('#classId2').find('option:selected').text()){
    	  val = val.replace('{class}', $('#classId2').find('option:selected').text());
    }else{
    	val = val.replace('{class}', '{}');
    }

    if($('#schoolIdModelMsg').find('option:selected').text()){
    	val = val.replace('{address}', $('#schoolIdModelMsg').find('option:selected').text());
	}else{
	  	val = val.replace('{address}', '{}');
	}

    if($('#subscribeDate').val()){
    	val = val.replace('{studentName}', $('#subscribeDate').val());
    }else{
    	val = val.replace('{recriveTime}', '{}');
    }

    $('#showMsg').val(val)
}
function msgSubmit() {
    $.ajax({
        type: "POST",
        url: ctx + "/consultConsole/sendMsg",
        data: {
            moblie: $('#studentPhoneMsg').val(),
            msg: $('#showMsg').val()
        },
        dataType: 'json',
        success: function (msg) {
            msg = JSON.parse(msg.msg);
            toastr.success(msg.msg);
        }
    });
}

//缴费信息  定坐费算在培训费里  职业教育
function coursePayInfoZYJY(consultInfo, payInfoData) {
    function payKind() {
        return {dz: 0, px: 0, xy: 0, kw: 0, jc: 0, zl: 0, fw: 0};
    }

    $('#coursePrice').html('');
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
    payPx += payDZ;//  定坐费算在培训费里
    totalPrice = parseFloat(payDZ + payPx + payKw + payZl + payXy + payJc + payFw);
    coursePrice = parseFloat(totalPrice - payY - payZk);//课程价格、实缴
    $('#coursePrice').val(coursePrice);
    var dzsjArr = new Array(), pxsjArr = new Array(), xysjArr = new Array();//记录每次实缴
    var kwsjArr = new Array(), jcsjArr = new Array(), zlsjArr = new Array(), fwsjArr = new Array();
    $(payInfoData).each(function (i, item) {
        //定坐费
        var dzsj = (parseFloat((item.payDzXj ? item.payDzXj : 0)) + parseFloat((item.payDzZp ? item.payDzZp : 0)) + parseFloat((item.payDzSk ? item.payDzSk : 0))
        + (parseFloat(item.payDzWeixin ? item.payDzWeixin : 0)) + parseFloat((item.payDzZfb ? item.payDzZfb : 0)) + parseFloat((item.payDzWl ? item.payDzWl : 0))
        + (parseFloat(item.payDzZz ? item.payDzZz : 0)) + (parseFloat(item.payDzFq ? item.payDzFq : 0)));
        dzsjArr.push(parseFloat(dzsj));
        //培训费
        var pxsj = ((parseFloat(item.payPxXj ? item.payPxXj : 0)) + (parseFloat(item.payPxZp ? item.payPxZp : 0)) + (parseFloat(item.payPxSk ? item.payPxSk : 0))
        + (parseFloat(item.payPxWeixin ? item.payPxWeixin : 0)) + (parseFloat(item.payPxZfb ? item.payPxZfb : 0)) + (parseFloat(item.payPxWl ? item.payPxWl : 0))
        + (parseFloat(item.payPxZz ? item.payPxZz : 0)) + (parseFloat(item.payPxFq ? item.payPxFq : 0)));
        pxsjArr.push(parseFloat(pxsj));
        //协议费
        var xysj = ((parseFloat(item.payXyXj ? item.payXyXj : 0)) + (parseFloat(item.payXyZp ? item.payXyZp : 0)) + (parseFloat(item.payXySk ? item.payXySk : 0))
        + (parseFloat(item.payXyWeixin ? item.payXyWeixin : 0)) + (parseFloat(item.payXyZfb ? item.payXyZfb : 0)) + (parseFloat(item.payXyWl ? item.payXyWl : 0))
        + (parseFloat(item.payXyZz ? item.payXyZz : 0)) + (parseFloat(item.payXyFq ? item.payXyFq : 0)));
        xysjArr.push(parseFloat(xysj));
        //服务费
        var fwsj = (parseFloat((item.payFwXj ? item.payFwXj : 0)) + (parseFloat(item.payFwZp ? item.payFwZp : 0)) + (parseFloat(item.payFwSk ? item.payFwSk : 0))
        + (parseFloat(item.payFwWeixin ? item.payFwWeixin : 0)) + (parseFloat(item.payFwZfb ? item.payFwZfb : 0)) + (parseFloat(item.payFwWl ? item.payFwWl : 0))
        + (parseFloat(item.payFwZz ? item.payFwZz : 0)) + (parseFloat(item.payFwFq ? item.payFwFq : 0)));
        fwsjArr.push(parseFloat(fwsj));
        //教材费
        var jcsj = ((parseFloat(item.payJcXj ? item.payJcXj : 0)) + (parseFloat(item.payJcZp ? item.payJcZp : 0)) + (parseFloat(item.payJcSk ? item.payJcSk : 0))
        + (parseFloat(item.payJcWeixin ? item.payJcWeixin : 0)) + (parseFloat(item.payJcZfb ? item.payJcZfb : 0)) + (parseFloat(item.payJcWl ? item.payJcWl : 0))
        + (parseFloat(item.payJcZz ? item.payJcZz : 0)) + (parseFloat(item.payJcFq ? item.payJcFq : 0)));
        jcsjArr.push(parseFloat(jcsj));
        //资料费
        var zlsj = ((parseFloat(item.payZlXj ? item.payZlXj : 0)) + (parseFloat(item.payZlZp ? item.payZlZp : 0)) + (parseFloat(item.payZlSk ? item.payZlSk : 0))
        + (parseFloat(item.payZlWeixin ? item.payZlWeixin : 0)) + (parseFloat(item.payZlZfb ? item.payZlZfb : 0)) + (parseFloat(item.payZlWl ? item.payZlWl : 0))
        + (parseFloat(item.payZlZz ? item.payZlZz : 0)) + (parseFloat(item.payZlFq ? item.payZlFq : 0)));
        zlsjArr.push(parseFloat(zlsj));
        //考务费
        var kwsj = ((parseFloat(item.payKwXj ? item.payKwXj : 0)) + (parseFloat(item.payKwZp ? item.payKwZp : 0)) + (parseFloat(item.payKwSk ? item.payKwSk : 0))
        + (parseFloat(item.payKwWeixin ? item.payKwWeixin : 0)) + (parseFloat(item.payKwZfb ? item.payKwZfb : 0)) + (parseFloat(item.payKwWl ? item.payKwWl : 0))
        + (parseFloat(item.payKwZz ? item.payKwZz : 0)) + (parseFloat(item.payKwFq ? item.payKwFq : 0)));
        kwsjArr.push(parseFloat(kwsj));
    });
    //按不同缴费方式统计
    var xjKind = new payKind(), zpKind = new payKind(), skKind = new payKind(), weixinKind = new payKind();
    var wlKind = new payKind(), zfbKind = new payKind(), zzKind = new payKind(), fqKind = new payKind();
    $(payInfoData).each(function (i, item) {
        xjKind.dz += parseFloat((item.payDzXj ? item.payDzXj : 0));
        xjKind.px += parseFloat((item.payPxXj ? item.payPxXj : 0));
        xjKind.xy += parseFloat((item.payXyXj ? item.payXyXj : 0));
        xjKind.jc += parseFloat((item.payJcXj ? item.payJcXj : 0));
        xjKind.fw += parseFloat((item.payFwXj ? item.payFwXj : 0));
        xjKind.zl += parseFloat((item.payZlXj ? item.payZlXj : 0));
        xjKind.kw += parseFloat((item.payKwXj ? item.payKwXj : 0));

        zpKind.dz += parseFloat((item.payDzZp ? item.payDzZp : 0));
        zpKind.px += parseFloat((item.payPxZp ? item.payPxZp : 0));
        zpKind.xy += parseFloat((item.payXyZp ? item.payXyZp : 0));
        zpKind.jc += parseFloat((item.payJcZp ? item.payJcZp : 0));
        zpKind.fw += parseFloat((item.payFwZp ? item.payFwZp : 0));
        zpKind.zl += parseFloat((item.payZlZp ? item.payZlZp : 0));
        zpKind.kw += parseFloat((item.payKwZp ? item.payKwZp : 0));

        skKind.dz += parseFloat((item.payDzSk ? item.payDzSk : 0));
        skKind.px += parseFloat((item.payPxSk ? item.payPxSk : 0));
        skKind.xy += parseFloat((item.payXySk ? item.payXySk : 0));
        skKind.jc += parseFloat((item.payJcSk ? item.payJcSk : 0));
        skKind.fw += parseFloat((item.payFwSk ? item.payFwSk : 0));
        skKind.zl += parseFloat((item.payZlSk ? item.payZlSk : 0));
        skKind.kw += parseFloat((item.payKwSk ? item.payKwSk : 0));

        weixinKind.dz += parseFloat((item.payDzWeixin ? item.payDzWeixin : 0));
        weixinKind.px += parseFloat((item.payPxWeixin ? item.payPxWeixin : 0));
        weixinKind.xy += parseFloat((item.payXyWeixin ? item.payXyWeixin : 0));
        weixinKind.jc += parseFloat((item.payJcWeixin ? item.payJcWeixin : 0));
        weixinKind.fw += parseFloat((item.payFwWeixin ? item.payFwWeixin : 0));
        weixinKind.zl += parseFloat((item.payZlWeixin ? item.payZlWeixin : 0));
        weixinKind.kw += parseFloat((item.payKwWeixin ? item.payKwWeixin : 0));

        wlKind.dz += parseFloat((item.payDzWl ? item.payDzWl : 0));
        wlKind.px += parseFloat((item.payPxWl ? item.payPxWl : 0));
        wlKind.xy += parseFloat((item.payXyWl ? item.payXyWl : 0));
        wlKind.jc += parseFloat((item.payJcWl ? item.payJcWl : 0));
        wlKind.fw += parseFloat((item.payFwWl ? item.payFwWl : 0));
        wlKind.zl += parseFloat((item.payZlWl ? item.payZlWl : 0));
        wlKind.kw += parseFloat((item.payKwWl ? item.payKwWl : 0));

        zfbKind.dz += parseFloat((item.payDzZfb ? item.payDzZfb : 0));
        zfbKind.px += parseFloat((item.payPxZfb ? item.payPxZfb : 0));
        zfbKind.xy += parseFloat((item.payXyZfb ? item.payXyZfb : 0));
        zfbKind.jc += parseFloat((item.payJcZfb ? item.payJcZfb : 0));
        zfbKind.fw += parseFloat((item.payFwZfb ? item.payFwZfb : 0));
        zfbKind.zl += parseFloat((item.payZlZfb ? item.payZlZfb : 0));
        zfbKind.kw += parseFloat((item.payKwZfb ? item.payKwZfb : 0));

        zzKind.dz += parseFloat((item.payDzZz ? item.payDzZz : 0));
        zzKind.px += parseFloat((item.payPxZz ? item.payPxZz : 0));
        zzKind.xy += parseFloat((item.payXyZz ? item.payXyZz : 0));
        zzKind.jc += parseFloat((item.payJcZz ? item.payJcZz : 0));
        zzKind.fw += parseFloat((item.payFwZz ? item.payFwZz : 0));
        zzKind.zl += parseFloat((item.payZlZz ? item.payZlZz : 0));
        zzKind.kw += parseFloat((item.payKwZz ? item.payKwZz : 0));

        fqKind.dz += parseFloat((item.payDzFq ? item.payDzFq : 0));
        fqKind.px += parseFloat((item.payPxFq ? item.payPxFq : 0));
        fqKind.xy += parseFloat((item.payXyFq ? item.payXyFq : 0));
        fqKind.jc += parseFloat((item.payJcFq ? item.payJcFq : 0));
        fqKind.fw += parseFloat((item.payFwFq ? item.payFwFq : 0));
        fqKind.zl += parseFloat((item.payZlFq ? item.payZlFq : 0));
        fqKind.kw += parseFloat((item.payKwFq ? item.payKwFq : 0));


    });


    var PXSj = 0;
    $(pxsjArr).each(function (i, item) {
        PXSj += (item + dzsjArr[i]);
    });
    var PXTr = '<tr><td>培训费</td><td>' + (payPx) + '</td><td>' + PXSj + '</td>';
    PXTr += '<td>';
    if ((xjKind.dz + xjKind.px) > 0) PXTr += ('<span>现金：<span>' + (xjKind.dz + xjKind.px) + '<br/>');
    if ((zpKind.dz + zpKind.px) > 0) PXTr += ('<span>支票：<span>' + (zpKind.dz + zpKind.px) + '<br/>');
    if ((skKind.dz + skKind.px) > 0) PXTr += ('<span>刷卡：<span>' + (skKind.dz + skKind.px) + '<br/>');
    if ((weixinKind.dz + weixinKind.px) > 0) PXTr += ('<span>微信：<span>' + (weixinKind.dz + weixinKind.px) + '<br/>');
    if ((zfbKind.dz + zfbKind.px) > 0) PXTr += ('<span>支付宝：<span>' + (zfbKind.dz + zfbKind.px) + '<br/>');
    if ((wlKind.dz + wlKind.px) > 0) PXTr += ('<span>网络：<span>' + (wlKind.dz + wlKind.px) + '<br/>');
    if ((zzKind.dz + zzKind.px) > 0) PXTr += ('<span>银行转账：<span>' + (zzKind.dz + zzKind.px) + '<br/>');
    if ((fqKind.dz + fqKind.px) > 0) PXTr += ('<span>分期：<span>' + (fqKind.dz + fqKind.px));
    PXTr += '</td>';
    PXTr += '<td>' + (payPx - PXSj) + '</td></tr>';

    var KWSj = 0;
    $(kwsjArr).each(function (i, item) {
        KWSj += (item);
    });
    var KWTr = '<tr><td>考务费</td><td>' + payKw + '</td><td>' + KWSj + '</td>';
    KWTr += '<td>';
    if ((xjKind.kw) > 0) KWTr += ('<span>现金：<span>' + (xjKind.kw) + '<br/>');
    if ((zpKind.kw) > 0) KWTr += ('<span>支票：<span>' + (zpKind.kw) + '<br/>');
    if ((skKind.kw) > 0) KWTr += ('<span>刷卡：<span>' + (skKind.kw) + '<br/>');
    if ((weixinKind.kw) > 0) KWTr += ('<span>微信：<span>' + (weixinKind.kw) + '<br/>');
    if ((zfbKind.kw) > 0) KWTr += ('<span>支付宝：<span>' + (zfbKind.kw) + '<br/>');
    if ((wlKind.kw) > 0) KWTr += ('<span>网络：<span>' + (wlKind.kw) + '<br/>');
    if ((zzKind.kw) > 0) KWTr += ('<span>银行转账：<span>' + (zzKind.kw) + '<br/>');
    if ((fqKind.kw) > 0) KWTr += ('<span>分期：<span>' + (fqKind.kw));
    KWTr += '</td>';
    KWTr += '<td>' + (payKw - KWSj) + '</td></tr>';

    var ZLSj = 0;
    $(zlsjArr).each(function (i, item) {
        ZLSj += (item);
    });
    var ZLTr = '<tr><td>资料费</td><td>' + payZl + '</td><td>' + ZLSj + '</td>';
    ZLTr += '<td>';
    if ((xjKind.zl) > 0) ZLTr += ('<span>现金：<span>' + (xjKind.zl) + '<br/>');
    if ((zpKind.zl) > 0) ZLTr += ('<span>支票：<span>' + (zpKind.zl) + '<br/>');
    if ((skKind.zl) > 0) ZLTr += ('<span>刷卡：<span>' + (skKind.zl) + '<br/>');
    if ((weixinKind.zl) > 0) ZLTr += ('<span>微信：<span>' + (weixinKind.zl) + '<br/>');
    if ((zfbKind.zl) > 0) ZLTr += ('<span>支付宝：<span>' + (zfbKind.zl) + '<br/>');
    if ((wlKind.zl) > 0) ZLTr += ('<span>网络：<span>' + (wlKind.zl) + '<br/>');
    if ((zzKind.zl) > 0) ZLTr += ('<span>银行转账：<span>' + (zzKind.zl) + '<br/>');
    if ((fqKind.zl) > 0) ZLTr += ('<span>分期：<span>' + (fqKind.zl));
    ZLTr += '</td>';
    ZLTr += '<td>' + (payZl - ZLSj) + '</td></tr>';

    var XYSj = 0;
    $(xysjArr).each(function (i, item) {
        XYSj += (item);
    });
    var XYTr = '<tr><td>协议费</td><td>' + payXy + '</td><td>' + XYSj + '</td>';
    XYTr += '<td>';
    if ((xjKind.xy) > 0) XYTr += ('<span>现金：<span>' + (xjKind.xy) + '<br/>');
    if ((zpKind.xy) > 0) XYTr += ('<span>支票：<span>' + (zpKind.xy) + '<br/>');
    if ((skKind.xy) > 0) XYTr += ('<span>刷卡：<span>' + (skKind.xy) + '<br/>');
    if ((weixinKind.xy) > 0) XYTr += ('<span>微信：<span>' + (weixinKind.xy) + '<br/>');
    if ((zfbKind.xy) > 0) XYTr += ('<span>支付宝：<span>' + (zfbKind.xy) + '<br/>');
    if ((wlKind.xy) > 0) XYTr += ('<span>网络：<span>' + (wlKind.xy) + '<br/>');
    if ((zzKind.xy) > 0) XYTr += ('<span>银行转账：<span>' + (zzKind.xy) + '<br/>');
    if ((fqKind.xy) > 0) XYTr += ('<span>分期：<span>' + (fqKind.xy));
    XYTr += '</td>';
    XYTr += '<td>' + (payXy - XYSj) + '</td></tr>';

    var JCSj = 0;
    $(jcsjArr).each(function (i, item) {
        JCSj += (item);
    });
    var JCTr = '<tr><td>教材费</td><td>' + payJc + '</td><td>' + JCSj + '</td>';
    JCTr += '<td>';
    if ((xjKind.jc) > 0) JCTr += ('<span>现金：<span>' + (xjKind.jc) + '<br/>');
    if ((zpKind.jc) > 0) JCTr += ('<span>支票：<span>' + (zpKind.jc) + '<br/>');
    if ((skKind.jc) > 0) JCTr += ('<span>刷卡：<span>' + (skKind.jc) + '<br/>');
    if ((weixinKind.jc) > 0) JCTr += ('<span>微信：<span>' + (weixinKind.jc) + '<br/>');
    if ((zfbKind.jc) > 0) JCTr += ('<span>支付宝：<span>' + (zfbKind.jc) + '<br/>');
    if ((wlKind.jc) > 0) JCTr += ('<span>网络：<span>' + (wlKind.jc) + '<br/>');
    if ((zzKind.jc) > 0) JCTr += ('<span>银行转账：<span>' + (zzKind.jc) + '<br/>');
    if ((fqKind.jc) > 0) JCTr += ('<span>分期：<span>' + (fqKind.jc));
    JCTr += '</td>';
    JCTr += '<td>' + (payJc - JCSj) + '</td></tr>';

    var FWSj = 0;
    $(fwsjArr).each(function (i, item) {
        FWSj += (item);
    });
    var FWTr = '<tr><td>服务费</td><td>' + payFw + '</td><td>' + FWSj + '</td>';
    FWTr += '<td>';
    if ((xjKind.fw) > 0) FWTr += ('<span>现金：<span>' + (xjKind.fw) + '<br/>');
    if ((zpKind.fw) > 0) FWTr += ('<span>支票：<span>' + (zpKind.fw) + '<br/>');
    if ((skKind.fw) > 0) FWTr += ('<span>刷卡：<span>' + (skKind.fw) + '<br/>');
    if ((weixinKind.fw) > 0) FWTr += ('<span>微信：<span>' + (weixinKind.fw) + '<br/>');
    if ((zfbKind.fw) > 0) FWTr += ('<span>支付宝：<span>' + (zfbKind.fw) + '<br/>');
    if ((wlKind.fw) > 0) FWTr += ('<span>网络：<span>' + (wlKind.fw) + '<br/>');
    if ((zzKind.fw) > 0) FWTr += ('<span>银行转账：<span>' + (zzKind.fw) + '<br/>');
    if ((fqKind.fw) > 0) FWTr += ('<span>分期：<span>' + (fqKind.fw));
    FWTr += '</td>';
    FWTr += '<td>' + (payFw - FWSj) + '</td></tr>';

    var ZJTr = '<tr><td>总计</td><td>' + (payPx + payKw + payZl + payXy + payJc + payFw) + '</td>';
    ZJTr += '<td>' + (PXSj + KWSj + ZLSj + XYSj + JCSj + FWSj) + '</td><td></td><td></td></tr>';
    var YHTr = '<tr><td>优惠券</td><td>' + payY + '</td><td></td><td></td><td></td></tr>';
    var ZKTr = '<tr><td>折扣</td><td>' + payZk + '</td><td></td><td></td><td></td></tr>';
    var HJTr = '<tr><td>合计</td><td>' + (payPx + payKw + payZl + payXy + payJc + payFw - payY - payZk) + '</td>';
    HJTr += '<td>' + (PXSj + KWSj + ZLSj + XYSj + JCSj + FWSj) + '</td><td></td>';
    HJTr += '<td>' + (payPx + payKw + payZl + payXy + payJc + payFw - payY - payZk - PXSj - KWSj - ZLSj - XYSj - JCSj - FWSj) + '</td></tr>';
    var thead = '<table id="appendPayBody1" class="table table-striped table-hover table-bordered dataTable no-footer text-center"><thead><tr><th>收费项目</th><th>应缴</th><th>实缴</th><th>支付方式</th><th>欠费</th></tr></thead>';
    var theadEnd = '</table>';
    $('#coursePayInfo').append(thead + PXTr + KWTr + ZLTr + XYTr + JCTr + FWTr + ZJTr + YHTr + ZKTr + HJTr + theadEnd);
}

//缴费信息  定坐费算在培训费里    学历
function coursePayInfoXueLi(consultInfo, payInfoData) {
    function payKind() {
        return {dz: 0, xz: 0, ks: 0, zl: 0, jc: 0, dg: 0};
    }

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
    payXz += payDZ;//  定坐费算在培训费里
    totalPrice = parseFloat(payDZ + payXz + payKs + payZl + payJc + payDg + payFd);
    coursePrice = parseFloat(totalPrice - payY - payZk);//课程价格、应缴
    $('#coursePrice').val(coursePrice);
    var dzsjArr = new Array(), xzsjArr = new Array(), kssjArr = new Array();//记录每次实缴
    var zlsjArr = new Array(), jcsjArr = new Array(), dgsjArr = new Array();
    $(payInfoData).each(function (i, item) {
        //定坐费
        var dzsj = (parseFloat((item.payDzXj ? item.payDzXj : 0)) + parseFloat((item.payDzZp ? item.payDzZp : 0)) + parseFloat((item.payDzSk ? item.payDzSk : 0))
        + (parseFloat(item.payDzWeixin ? item.payDzWeixin : 0)) + parseFloat((item.payDzZfb ? item.payDzZfb : 0)) + parseFloat((item.payDzWl ? item.payDzWl : 0))
        + (parseFloat(item.payDzZz ? item.payDzZz : 0)) + (parseFloat(item.payDzFq ? item.payDzFq : 0)));
        dzsjArr.push(parseFloat(dzsj));
        //学杂费
        var xzsj = ((parseFloat(item.payPxXj ? item.payPxXj : 0)) + (parseFloat(item.payPxZp ? item.payPxZp : 0)) + (parseFloat(item.payPxSk ? item.payPxSk : 0))
        + (parseFloat(item.payPxWeixin ? item.payPxWeixin : 0)) + (parseFloat(item.payPxZfb ? item.payPxZfb : 0)) + (parseFloat(item.payPxWl ? item.payPxWl : 0))
        + (parseFloat(item.payPxZz ? item.payPxZz : 0)) + (parseFloat(item.payPxFq ? item.payPxFq : 0)));
        xzsjArr.push(parseFloat(xzsj));
        //考试费
        var kssj = ((parseFloat(item.payKwXj ? item.payKwXj : 0)) + (parseFloat(item.payKwZp ? item.payKwZp : 0)) + (parseFloat(item.payKwSk ? item.payKwSk : 0))
        + (parseFloat(item.payKwWeixin ? item.payKwWeixin : 0)) + (parseFloat(item.payKwZfb ? item.payKwZfb : 0)) + (parseFloat(item.payKwWl ? item.payKwWl : 0))
        + (parseFloat(item.payKwZz ? item.payKwZz : 0)) + (parseFloat(item.payKwFq ? item.payKwFq : 0)));
        kssjArr.push(parseFloat(kssj));
        //资料费
        var zlsj = ((parseFloat(item.payZlXj ? item.payZlXj : 0)) + (parseFloat(item.payZlZp ? item.payZlZp : 0)) + (parseFloat(item.payZlSk ? item.payZlSk : 0))
        + (parseFloat(item.payZlWeixin ? item.payZlWeixin : 0)) + (parseFloat(item.payZlZfb ? item.payZlZfb : 0)) + (parseFloat(item.payZlWl ? item.payZlWl : 0))
        + (parseFloat(item.payZlZz ? item.payZlZz : 0)) + (parseFloat(item.payZlFq ? item.payZlFq : 0)));
        zlsjArr.push(parseFloat(zlsj));
        //教材费
        var jcsj = ((parseFloat(item.payXyXj ? item.payXyXj : 0)) + (parseFloat(item.payXyZp ? item.payXyZp : 0)) + (parseFloat(item.payXySk ? item.payXySk : 0))
        + (parseFloat(item.payXyWeixin ? item.payXyWeixin : 0)) + (parseFloat(item.payXyZfb ? item.payXyZfb : 0)) + (parseFloat(item.payXyWl ? item.payXyWl : 0))
        + (parseFloat(item.payXyZz ? item.payXyZz : 0)) + (parseFloat(item.payXyFq ? item.payXyFq : 0)));
        jcsjArr.push(parseFloat(jcsj));
        //代管费
        var dgsj = ((parseFloat(item.payJcXj ? item.payJcXj : 0)) + (parseFloat(item.payJcZp ? item.payJcZp : 0)) + (parseFloat(item.payJcSk ? item.payJcSk : 0))
        + (parseFloat(item.payJcWeixin ? item.payJcWeixin : 0)) + (parseFloat(item.payJcZfb ? item.payJcZfb : 0)) + (parseFloat(item.payJcWl ? item.payJcWl : 0))
        + (parseFloat(item.payJcZz ? item.payJcZz : 0)) + (parseFloat(item.payJcFq ? item.payJcFq : 0)));
        dgsjArr.push(parseFloat(dgsj));
    });
    //按不同缴费方式统计
    var xjKind = new payKind(), zpKind = new payKind(), skKind = new payKind(), weixinKind = new payKind();
    var wlKind = new payKind(), zfbKind = new payKind(), zzKind = new payKind(), fqKind = new payKind();
    $(payInfoData).each(function (i, item) {
        xjKind.dz += parseFloat((item.payDzXj ? item.payDzXj : 0));
        xjKind.xz += parseFloat((item.payPxXj ? item.payPxXj : 0));
        xjKind.dg += parseFloat((item.payJcXj ? item.payJcXj : 0));
        xjKind.jc += parseFloat((item.payXyXj ? item.payXyXj : 0));
        xjKind.zl += parseFloat((item.payZlXj ? item.payZlXj : 0));
        xjKind.ks += parseFloat((item.payKwXj ? item.payKwXj : 0));

        zpKind.dz += parseFloat((item.payDzZp ? item.payDzZp : 0));
        zpKind.xz += parseFloat((item.payPxZp ? item.payPxZp : 0));
        zpKind.dg += parseFloat((item.payJcZp ? item.payJcZp : 0));
        zpKind.jc += parseFloat((item.payXyZp ? item.payXyZp : 0));
        zpKind.zl += parseFloat((item.payZlZp ? item.payZlZp : 0));
        zpKind.ks += parseFloat((item.payKwZp ? item.payKwZp : 0));

        skKind.dz += parseFloat((item.payDzSk ? item.payDzSk : 0));
        skKind.xz += parseFloat((item.payPxSk ? item.payPxSk : 0));
        skKind.dg += parseFloat((item.payJcSk ? item.payJcSk : 0));
        skKind.jc += parseFloat((item.payXySk ? item.payXySk : 0));
        skKind.zl += parseFloat((item.payZlSk ? item.payZlSk : 0));
        skKind.ks += parseFloat((item.payKwSk ? item.payKwSk : 0));

        weixinKind.dz += parseFloat((item.payDzWeixin ? item.payDzWeixin : 0));
        weixinKind.xz += parseFloat((item.payPxWeixin ? item.payPxWeixin : 0));
        weixinKind.dg += parseFloat((item.payJcWeixin ? item.payJcWeixin : 0));
        weixinKind.jc += parseFloat((item.payXyWeixin ? item.payXyWeixin : 0));
        weixinKind.zl += parseFloat((item.payZlWeixin ? item.payZlWeixin : 0));
        weixinKind.ks += parseFloat((item.payKwWeixin ? item.payKwWeixin : 0));

        wlKind.dz += parseFloat((item.payDzWl ? item.payDzWl : 0));
        wlKind.xz += parseFloat((item.payPxWl ? item.payPxWl : 0));
        wlKind.dg += parseFloat((item.payJcWl ? item.payJcWl : 0));
        wlKind.jc += parseFloat((item.payXyWl ? item.payXyWl : 0));
        wlKind.zl += parseFloat((item.payZlWl ? item.payZlWl : 0));
        wlKind.ks += parseFloat((item.payKwWl ? item.payKwWl : 0));

        zfbKind.dz += parseFloat((item.payDzZfb ? item.payDzZfb : 0));
        zfbKind.xz += parseFloat((item.payPxZfb ? item.payPxZfb : 0));
        zfbKind.dg += parseFloat((item.payJcZfb ? item.payJcZfb : 0));
        zfbKind.jc += parseFloat((item.payXyZfb ? item.payXyZfb : 0));
        zfbKind.zl += parseFloat((item.payZlZfb ? item.payZlZfb : 0));
        zfbKind.ks += parseFloat((item.payKwZfb ? item.payKwZfb : 0));

        zzKind.dz += parseFloat((item.payDzZz ? item.payDzZz : 0));
        zzKind.xz += parseFloat((item.payPxZz ? item.payPxZz : 0));
        zzKind.dg += parseFloat((item.payJcZz ? item.payJcZz : 0));
        zzKind.jc += parseFloat((item.payXyZz ? item.payXyZz : 0));
        zzKind.zl += parseFloat((item.payZlZz ? item.payZlZz : 0));
        zzKind.ks += parseFloat((item.payKwZz ? item.payKwZz : 0));

        fqKind.dz += parseFloat((item.payDzFq ? item.payDzFq : 0));
        fqKind.xz += parseFloat((item.payPxFq ? item.payPxFq : 0));
        fqKind.dg += parseFloat((item.payJcFq ? item.payJcFq : 0));
        fqKind.jc += parseFloat((item.payXyFq ? item.payXyFq : 0));
        fqKind.zl += parseFloat((item.payZlFq ? item.payZlFq : 0));
        fqKind.ks += parseFloat((item.payKwFq ? item.payKwFq : 0));

    });

    var XZSj = 0;
    $(xzsjArr).each(function (i, item) {
        XZSj += (item + dzsjArr[i]);
    });
    var XZTr = '<tr><td>学杂费</td><td>' + (payXz) + '</td><td>' + XZSj + '</td>';
    XZTr += '<td>';
    if ((xjKind.dz + xjKind.xz) > 0) XZTr += ('<span>现金：<span>' + (xjKind.dz + xjKind.xz) + '<br/>');
    if ((zpKind.dz + zpKind.xz) > 0) XZTr += ('<span>支票：<span>' + (zpKind.dz + zpKind.xz) + '<br/>');
    if ((skKind.dz + skKind.xz) > 0) XZTr += ('<span>刷卡：<span>' + (skKind.dz + skKind.xz) + '<br/>');
    if ((weixinKind.dz + weixinKind.xz) > 0) XZTr += ('<span>微信：<span>' + (weixinKind.dz + weixinKind.xz) + '<br/>');
    if ((zfbKind.dz + zfbKind.xz) > 0) XZTr += ('<span>支付宝：<span>' + (zfbKind.dz + zfbKind.xz) + '<br/>');
    if ((wlKind.dz + wlKind.xz) > 0) XZTr += ('<span>网络：<span>' + (wlKind.dz + wlKind.xz) + '<br/>');
    if ((zzKind.dz + zzKind.xz) > 0) XZTr += ('<span>银行转账：<span>' + (zzKind.dz + zzKind.xz) + '<br/>');
    if ((fqKind.dz + fqKind.xz) > 0) XZTr += ('<span>分期：<span>' + (fqKind.dz + fqKind.xz));
    XZTr += '</td>';
    XZTr += '<td>' + (payXz - XZSj) + '</td></tr>';

    var KSSj = 0;
    $(kssjArr).each(function (i, item) {
        KSSj += (item);
    });
    var KSTr = '<tr><td>考试费</td><td>' + payKs + '</td><td>' + KSSj + '</td>';
    KSTr += '<td>';
    if ((xjKind.ks) > 0) KSTr += ('<span>现金：<span>' + (xjKind.ks) + '<br/>');
    if ((zpKind.ks) > 0) KSTr += ('<span>支票：<span>' + (zpKind.ks) + '<br/>');
    if ((skKind.ks) > 0) KSTr += ('<span>刷卡：<span>' + (skKind.ks) + '<br/>');
    if ((weixinKind.ks) > 0) KSTr += ('<span>微信：<span>' + (weixinKind.ks) + '<br/>');
    if ((zfbKind.ks) > 0) KSTr += ('<span>支付宝：<span>' + (zfbKind.ks) + '<br/>');
    if ((wlKind.ks) > 0) KSTr += ('<span>网络：<span>' + (wlKind.ks) + '<br/>');
    if ((zzKind.ks) > 0) KSTr += ('<span>银行转账：<span>' + (zzKind.ks) + '<br/>');
    if ((fqKind.ks) > 0) KSTr += ('<span>分期：<span>' + (fqKind.ks));
    KSTr += '</td>';
    KSTr += '<td>' + (payKs - KSSj) + '</td></tr>';

    var ZLSj = 0;
    $(zlsjArr).each(function (i, item) {
        ZLSj += (item);
    });
    var ZLTr = '<tr><td>资料费</td><td>' + payZl + '</td><td>' + ZLSj + '</td>';
    ZLTr += '<td>';
    if ((xjKind.zl) > 0) ZLTr += ('<span>现金：<span>' + (xjKind.zl) + '<br/>');
    if ((zpKind.zl) > 0) ZLTr += ('<span>支票：<span>' + (zpKind.zl) + '<br/>');
    if ((skKind.zl) > 0) ZLTr += ('<span>刷卡：<span>' + (skKind.zl) + '<br/>');
    if ((weixinKind.zl) > 0) ZLTr += ('<span>微信：<span>' + (weixinKind.zl) + '<br/>');
    if ((zfbKind.zl) > 0) ZLTr += ('<span>支付宝：<span>' + (zfbKind.zl) + '<br/>');
    if ((wlKind.zl) > 0) ZLTr += ('<span>网络：<span>' + (wlKind.zl) + '<br/>');
    if ((zzKind.zl) > 0) ZLTr += ('<span>银行转账：<span>' + (zzKind.zl) + '<br/>');
    if ((fqKind.zl) > 0) ZLTr += ('<span>分期：<span>' + (fqKind.zl));
    ZLTr += '</td>';
    ZLTr += '<td>' + (payZl - ZLSj) + '</td></tr>';

    var JCSj = 0;
    $(jcsjArr).each(function (i, item) {
        JCSj += (item);
    });
    var JCTr = '<tr><td>教材费</td><td>' + payJc + '</td><td>' + JCSj + '</td>';
    JCTr += '<td>';
    if ((xjKind.jc) > 0) JCTr += ('<span>现金：<span>' + (xjKind.jc) + '<br/>');
    if ((zpKind.jc) > 0) JCTr += ('<span>支票：<span>' + (zpKind.jc) + '<br/>');
    if ((skKind.jc) > 0) JCTr += ('<span>刷卡：<span>' + (skKind.jc) + '<br/>');
    if ((weixinKind.jc) > 0) JCTr += ('<span>微信：<span>' + (weixinKind.jc) + '<br/>');
    if ((zfbKind.jc) > 0) JCTr += ('<span>支付宝：<span>' + (zfbKind.jc) + '<br/>');
    if ((wlKind.jc) > 0) JCTr += ('<span>网络：<span>' + (wlKind.jc) + '<br/>');
    if ((zzKind.jc) > 0) JCTr += ('<span>银行转账：<span>' + (zzKind.jc) + '<br/>');
    if ((fqKind.jc) > 0) JCTr += ('<span>分期：<span>' + (fqKind.jc));
    JCTr += '</td>';
    JCTr += '<td>' + (payJc - JCSj) + '</td></tr>';

    var DGSj = 0;
    $(dgsjArr).each(function (i, item) {
        DGSj += (item);
    });
    var DGTr = '<tr><td>代管费</td><td>' + payDg + '</td><td>' + DGSj + '</td>';
    DGTr += '<td>';
    if ((xjKind.dg) > 0) DGTr += ('<span>现金：<span>' + (xjKind.dg) + '<br/>');
    if ((zpKind.dg) > 0) DGTr += ('<span>支票：<span>' + (zpKind.dg) + '<br/>');
    if ((skKind.dg) > 0) DGTr += ('<span>刷卡：<span>' + (skKind.dg) + '<br/>');
    if ((weixinKind.dg) > 0) DGTr += ('<span>微信：<span>' + (weixinKind.dg) + '<br/>');
    if ((zfbKind.dg) > 0) DGTr += ('<span>支付宝：<span>' + (zfbKind.dg) + '<br/>');
    if ((wlKind.dg) > 0) DGTr += ('<span>网络：<span>' + (wlKind.dg) + '<br/>');
    if ((zzKind.dg) > 0) DGTr += ('<span>银行转账：<span>' + (zzKind.dg) + '<br/>');
    if ((fqKind.dg) > 0) DGTr += ('<span>分期：<span>' + (fqKind.dg));
    DGTr += '</td>';
    DGTr += '<td>' + (payDg - DGSj) + '</td></tr>';

    var FDSj = payFd;
    var FDTr = '<tr><td>辅导费</td><td>' + payFd + '</td><td>' + FDSj + '</td>';
    FDTr += '<td>缴费' + FDSj + '</td>';
    FDTr += '<td>' + (payFd - FDSj) + '</td></tr>';

    var ZJTr = '<tr><td>总计</td><td>' + (payXz + payKs + payZl + payDg + payJc + payFd) + '</td>';
    ZJTr += '<td>' + (XZSj + KSSj + ZLSj + DGSj + JCSj + FDSj) + '</td><td></td><td></td></tr>';
    var YHTr = '<tr><td>优惠券</td><td>' + payY + '</td><td></td><td></td><td></td></tr>';
    var ZKTr = '<tr><td>折扣</td><td>' + payZk + '</td><td></td><td></td><td></td></tr>';
    var HJTr = '<tr><td>合计</td><td>' + (payXz + payKs + payZl + payDg + payJc + payFd - payY - payZk) + '</td>';
    HJTr += '<td>' + (XZSj + KSSj + ZLSj + DGSj + JCSj + FDSj) + '</td><td></td>';
    HJTr += '<td>' + (payXz + payKs + payZl + payDg + payJc + payFd - payY - payZk - (XZSj + KSSj + ZLSj + DGSj + JCSj + FDSj)) + '</td></tr>';
    var thead = '<table id="appendPayBody1" class="table table-striped table-hover table-bordered dataTable no-footer text-center"><thead><tr><th>收费项目</th><th>应缴</th><th>实缴</th><th>支付方式</th><th>欠费</th></tr></thead>';
    var theadEnd = '</table>';
    $('#coursePayInfo').append(thead + XZTr + KSTr + ZLTr + JCTr + DGTr + FDTr + ZJTr + YHTr + ZKTr + HJTr + theadEnd);
}

function formValidator() {
    var ar = ['studentSex2_empty',
              'studentName2_empty',
              'age2_empty',
              'studentPhone2_empty',
              'email2_empty',
              'departmentId12_empty',
              'weChat2_empty',
              'tengXun2_empty',
              'ortherPhone2_empty',
              /* 'idcardType2_empty',*/
               'idcard2_empty',
              'infoType2_empty',
              'phoneAdress2_empty',
              'wrokSpace2_empty',
              'nation_empty',
              'bySchool_empty',
              'studentAttrName32_empty',
              'byZy_empty',
              'emergencyContact_empty',
              'emergencyContactMode_empty',
              'phoneAddress2_empty',
              'workSpace2_empty'
          ];
          var next = true;
          var valid = /^\d{18}$/;
          var valid2 = /^\d{15}$/;
          var val = $("#idcard2").val();
          var valtype = $("#idcardType2").val();
          if (val) {
              if (!valtype) {
                  toastr.error("请选择证件类型！");
                  $("#idcardType2").css('border-color', 'red');
              } else {
                  $("#idcardType2").css('border-color', '#e5e5e5');
              }
          }
          if (valtype == 1) {
              var msg = IdentityCodeValid(val);
              if ("身份证验证通过" != msg) {
                  toastr.error(msg);
                  $("#idcard2").css('border-color', 'red');
              } else {
                  $("#idcard2").css('border-color', '#e5e5e5');
              }
          }
          var val = $("#emergencyContactMode").val();
          msg = phoneCk(val);
          if ("pass" != msg) {
              toastr.error(msg);
              $("#emergencyContactMode").css('border-color', 'red');
          } else {
              $("#emergencyContactMode").css('border-color', '#e5e5e5');
          }

          for (var i = 0; i < ar.length; i++) {
              var id = (ar[i].split('_'))[0];
              var val = (ar[i].split('_'))[1];
              if (val == 'empty') {
                  if ($('#' + id).val() == '') {
                      $('#' + id).css('border-color', 'red');
                      toastr.error($('#' + id).parent().parent().find('label').text() + "不能为空,操作无效请确认信息无误后再操作");
                      next = false;
                  } else {
                      $('#' + id).css('border-color', '#e5e5e5');
                  }
              } else {
                  if ($('#' + id).find('option:selected').text() == '' || $('#' + id).find('option:selected').text() == '--请选择--') {
                      $('#' + id).css('border-color', 'red');
                      toastr.error($('#' + id).parent().parent().find('label').text() + "不能为空,操作无效请确认信息无误后再操作");
                      next = false;
                  } else {
                      $('#' + id).css('border-color', '#e5e5e5');
                  }
              }
          }
          if (next) {
              $('#updateInfoManage2').find(".comment_disabled").css('border-color', '#e5e5e5');
          }
          return next;
}
function phoneCk(val) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(val)) {
        return '请输入有效的手机号码';
    } else {
        return 'pass';
    }
}
function checkhj(e) {
    var ckhj = '';
    var s = 0;
    $(e).parent().parent().parent().find('input[type=checkbox]').each(function () {
        if ($(this).prop('checked')) {
            s = $(this).parent().find('span').text();
            ckhj = eval(ckhj + eval(s == null ? 0 : s));
        }
    })
    var c = '0';
    var a = '0';
    $('td[id^=appendPayTd]').each(function () {
        if (this.id != 'appendPayTd6') {
            if ($(this).text() == 'null') {
                c = eval(c) + eval(a);
            } else {
                c = eval(c) + eval($(this).text());
            }
        }
    });
    $('.fdfjr').text(ckhj);
    $('#zjprice').text(c + ckhj);
    hheji();
}
function dayinbaoming() {
    if ($('#hidChoosePrint').val() != '1') {
        window.open(ctx + "/printController/index/" + $('#infoManageIdDel').val() + "/xhwEntryForm");
    } else {
        if ($('#courseType').val() == '1') {
            window.open(ctx + "/printController/index/" + $('#infoManageIdDel').val() + "/zhEntryFormTrain");
        } else {
            window.open(ctx + "/printController/index/" + $('#infoManageIdDel').val() + "/zhEntryFormEdu");
        }
    }
}

function dayin() {
    if ($('#projectLevel2').find('option:selected').attr('type') != '1') {
        window.open(ctx + "/printController/index/" + $('#infoManageId2').val() + "/xhwEntryForm");
    } else {
        if ($('#project2').find('option:selected').attr('type') == '1') {
            window.open(ctx + "/printController/index/" + $('#infoManageId2').val() + "/zhEntryFormTrain");
        } else {
            window.open(ctx + "/printController/index/" + $('#infoManageId2').val() + "/zhEntryFormEdu");
        }
    }
}

function idcardValid(val) {
    var valid = /^\\d{18}$/;
    if (!valid.test(val)) {
        toastr.error("身份证不符合规则，请确认！");
        return false;
    }
}


//弹窗高度
var height = $(window).height() - 180 + "px";
$('.bs-example-modal-lg1>.modal-dialog>.modal-content>.modal-body').height(height);
$('.bs-example-modal-lga>.modal-dialog>.modal-content>.modal-body').height(height);
$(window).resize(function () {
    var height = $(window).height() - 180 + "px";
    $('.bs-example-modal-lg1>.modal-dialog>.modal-content>.modal-body').height(height);
    $('.bs-example-modal-lga>.modal-content>.modal-body').height(height);
});


//下次缴费时间
$('.date-picker').datepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd'
}).on('changeDate', function () {
    $(this).datepicker('hide');
});


//关闭弹窗变为不可编辑状态
$('.modal').on('hide.bs.modal', function () {
    $('.attribution').hide();
    $('this').find('button[type="submit"]').removeAttr('disabled');
    $(this).find("form").find(".comment_disabled").css('border-color', '#e5e5e5');
    $('.bs-example-modal-lg1 .modal-content .modal-body').animate({'scrollTop': 0}, 0);
})
function dbclick(e) {
	var dprice = $('#dingzuoI').val();
	
	
	var td = $(e).parents('tr').find('td').eq(1);
	td = td[0].id; 
	if(td=='appendPayTd1'){
		var price = $(e).parents('tr').children('td').eq(1).text();
		   if(dprice!=null){
			   $(e).parents('tr').children('td').eq(2).text(price - dprice);
			   $(e).val(price - dprice);
		   }else{
			   $(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
			   $(e).val($(e).parents('tr').children('td').eq(1).text());
		   }
	}else{
		  $(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
		  $(e).val($(e).parents('tr').children('td').eq(1).text());
	}
    sshj(e);
}

//咨询者类型为在线有效时，对话记录为必填项
$("#addstudentAttrId2").change(function () {
    if ($("#addstudentAttrId2").find("option:selected").text() == "在线有效") {
        $("#talk").addClass("control-label mandatory").html("*");
        $("#talk").parent().removeClass("padding-right-5");
    } else {
        $("#talk").removeClass("control-label mandatory").html("");
        $("#talk").parent().addClass("padding-right-5");
    }
})
function firstButton(e) {
    var ar = ['studentSex2_empty',
        'studentName2_empty',
        'age2_empty',
        'studentPhone2_empty',
        'email2_empty',
        'departmentId12_empty',
        'weChat2_empty',
        'tengXun2_empty',
        'ortherPhone2_empty',
        /* 'idcardType2_empty',
         'idcard2_empty',*/
        'infoType2_empty',
        'phoneAdress2_empty',
        'wrokSpace2_empty',
        'nation_empty',
        'bySchool_empty',
        'studentAttrName32_empty',
        'byZy_empty',
        'emergencyContact_empty',
        'emergencyContactMode_empty'
    ];
    var next = true;
    var valid = /^\d{18}$/;
    var valid2 = /^\d{15}$/;
    var val = $("#idcard2").val();
    var valtype = $("#idcardType2").val();
    if (val) {
        if (!valtype) {
            toastr.error("请选择证件类型！");
            $("#idcardType2").css('border-color', 'red');
        } else {
            $("#idcardType2").css('border-color', '#e5e5e5');
        }
    }
    if (valtype == 1) {
        var msg = IdentityCodeValid(val);
        if ("身份证验证通过" != msg) {
            toastr.error(msg);
            $("#idcard2").css('border-color', 'red');
        } else {
            $("#idcard2").css('border-color', '#e5e5e5');
        }
    }
    var val = $("#emergencyContactMode").val();
    msg = phoneCk(val);
    if ("pass" != msg) {
        toastr.error(msg);
        $("#emergencyContactMode").css('border-color', 'red');
    } else {
        $("#emergencyContactMode").css('border-color', '#e5e5e5');
    }

    for (var i = 0; i < ar.length; i++) {
        var id = (ar[i].split('_'))[0];
        var val = (ar[i].split('_'))[1];
        if (val == 'empty') {
            if ($('#' + id).val() == '') {
                $('#' + id).css('border-color', 'red');
                toastr.error($('#' + id).parent().parent().find('label').text() + "不能为空,操作无效请确认信息无误后再操作");
                next = false;
            } else {
                $('#' + id).css('border-color', '#e5e5e5');
            }
        } else {
            if ($('#' + id).find('option:selected').text() == '' || $('#' + id).find('option:selected').text() == '--请选择--') {
                $('#' + id).css('border-color', 'red');
                toastr.error($('#' + id).parent().parent().find('label').text() + "不能为空,操作无效请确认信息无误后再操作");
                next = false;
            } else {
                $('#' + id).css('border-color', '#e5e5e5');
            }
        }
    }
    if (next) {
        $(e).parent().parent().parent().parent().find(".comment_disabled").css('border-color', '#e5e5e5');
    }
}

function IdentityCodeValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "身份证验证通过";
    var pass = true;
    if (code.length > 0 && !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    }

    else if (code.length > 0 && !city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    }

  /*  else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验格式错误";
                pass = false;
            }
        }
    }*/
    return tip;
}


function secondButton() {
    var ar = ['classId2_select',
        'kTime2_select',
//	          'proFormId_select',
//	          'schoolFormId_select',
        'examRegion_empty'];
    /*var valid = /^\d{18}$/;
    var valid2 = /^\d{15}$/;
    var val = $("#idcard2").val();
    if ($("#idcardType2").val() == 1) {
        if (!(valid.test(val)) && !(valid2.test(val))) {
            toastr.error("身份证不符合规则，请确认！");
            return false;
        }
    }*/
    var next = true;
    for (var i = 0; i < ar.length; i++) {
        var id = (ar[i].split('_'))[0];
        var val = (ar[i].split('_'))[1];
        if (val == 'empty') {
            if ($('#' + id).val() == '') {
                $('#' + id).css('border-color', 'red');
                toastr.error($('#' + id).parent().parent().find('label').text() + "不能为空,操作无效请确认信息无误后再操作");
                next = false;
            } else {
                $('#' + id).css('border-color', '#e5e5e5');
            }
        } else {
            if ($('#' + id).find('option:selected').text() == '' || $('#' + id).find('option:selected').text() == '--请选择--') {
                $('#' + id).css('border-color', 'red');
                toastr.error($('#' + id).parent().parent().find('label').text() + "不能为空,操作无效请确认信息无误后再操作");
                next = false;
            } else {
                $('#' + id).css('border-color', '#e5e5e5');
            }
        }
    }
    if (next) {
        $(e).parent().parent().parent().parent().find(".comment_disabled").css('border-color', '#e5e5e5');
    }
}
/**
 * 复制电话
 * @returns
 */
function copyPhone(elementId) {

    // 创建元素用于复制
    var aux = document.getElementById(elementId);

    // 复制内容
    aux.select();

    // 将内容复制到剪贴板
    document.execCommand("copy");

    toastr.success('电话复制成功');
}
//回车搜索
function search(num) {
    if (event.keyCode == 13) {
        if (num == 1) {
            init();
        } else if (num == 2) {
            init2();
        } else if (num == 3) {
            init3();
        } else if (num == 4) {
            init4();
        } else if (num == 5) {
            init5();
        } else if (num == 6) {
            init6();
        }
    }
}
function sumValue(val) {
    $.ajax({
        type: "post",
        url: ctx + "/consultConsole/ajaxLoadSum",
        data: {type: val},
        dataType: "json",
        success: function (data) {
            if (data) {
                $('#yj').text(eval(data.sumValue).toFixed(0));
                $('#dj').text((eval($('#yj').text()) / eval($('#bml').text().trim() == '0' ? 1 : $('#bml').text().trim())).toFixed(0));
            }
        }
    })
}
function groupNum() {
    $.ajax({
        type: "post",
        url: ctx + "/consultConsole/ajaxLoadGroup",
        dataType: "json",
        success: function (data) {
            if (data) {
                $('#zn').text(data.groupNum);
            }
        }
    })
}
function sumNum() {
    $.ajax({
        type: "post",
        url: ctx + "/consultConsole/ajaxSumSort",
        dataType: "json",
        success: function (data) {
            if (data) {
                $('#zpm').text(data.sumNum);
            }
        }
    })
}
/**
 * 获取上次欠费记录
 * @returns
 */
function loadBeforePay() {
    var id = $('#infoManageIdDel').val();
    $.ajax({
        type: "post",
        url: ctx + "/consultConsole/ajaxBeforePay",
        dataType: "json",
        data: {infoManageId: id},
        success: function (data) {
            var val1 = 0;
            var val2 = 0;
            var val3 = 0;
            var val4 = 0;
            var val5 = 0;
            var val6 = 0;

            var val11 = 0;
            var val22 = 0;
            var val33 = 0;
            var val44 = 0;
            var val55 = 0;
            var val66 = 0;

            var bak = '';
            for (var i = 0; i < data.length; i++) {
                bak = data[i];
                val1 = val1 + bak.payPx;
                val2 = val2 + bak.payKw;
                val3 = val3 + bak.payZl;
                val4 = val4 + bak.payXy;
                val5 = val5 + bak.payJc;
                val6 = val6 + bak.payFw;


                val11 = val11 + isNull(bak.payPxFq) + isNull(bak.payPxSk) + isNull(bak.payPxWeixin) + isNull(bak.payPxWl) + isNull(bak.payPxXj) + isNull(bak.payPxZfb) + isNull(bak.payPxZp) + isNull(bak.payPxZz) +isNull(bak.payDz);
                val22 = val22 + isNull(bak.payKwFq) + isNull(bak.payKwSk) + isNull(bak.payKwWeixin) + isNull(bak.payKwWl) + isNull(bak.payKwXj) + isNull(bak.payKwZfb) + isNull(bak.payKwZp) + isNull(bak.payKwZz);
                val33 = val33 + isNull(bak.payZlFq) + isNull(bak.payZlSk) + isNull(bak.payZlWeixin) + isNull(bak.payZlWl) + isNull(bak.payZlXj) + isNull(bak.payZlZfb) + isNull(bak.payZlZp) + isNull(bak.payZlZz);
                val44 = val44 + isNull(bak.payXyFq) + isNull(bak.payXySk) + isNull(bak.payXyWeixin) + isNull(bak.payXyWl) + isNull(bak.payXyXj) + isNull(bak.payXyZfb) + isNull(bak.payXyZp) + isNull(bak.payXyZz);
                val55 = val55 + isNull(bak.payJcFq) + isNull(bak.payJcSk) + isNull(bak.payJcWeixin) + isNull(bak.payJcWl) + isNull(bak.payJcXj) + isNull(bak.payJcZfb) + isNull(bak.payJcZp) + isNull(bak.payJcZz);
                val66 = val66 + isNull(bak.payFwFq) + isNull(bak.payFwSk) + isNull(bak.payFwWeixin) + isNull(bak.payFwWl) + isNull(bak.payFwXj) + isNull(bak.payFwZfb) + isNull(bak.payFwZp) + isNull(bak.payFwZz);
            }
            $('#pxfp').text(val1 - val11);
            $('#kwfp').text(val2 - val22);
            $('#zlfp').text(val3 - val33);
            $('#xyfp').text(val4 - val44);
            $('#jcfp').text(val5 - val55);
            $('#fufp').text(val6 - val66);
        }
    })
}
function isNull(val) {
    if (val) {
        return val;
    } else {
        return 0;
    }
}
function bufei(e) {
    var yj = $(e).parent().parent().parent().find('h5').find('span').text();
    var obj = $(e).parent().parent().parent().find('input');
    var sum = 0;
    for (var i = 0; i < obj.length; i++) {
        sum = eval(sum) + eval(isNull(obj[i].value));
    }
    if (sum > yj) {
        $(e).val('');
    }
}

/**
 * 校验
 * @returns
 */
function onblueVal() {
    regX('studentName2', /^[\u0391-\uFFE5]+$/);
    regX('age2', /^(?:[1-9][0-9]?|1[01][0-9]|120)$/);
    regX('email2', /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    regX('tengXun2', /^[1-9]\d{4,8}$/);
    regX('bySchool', /^[\u0391-\uFFE5]+$/);
    regX('byZy', /^[\u0391-\uFFE5]+$/);
    regX('emergencyContact', /^[\u0391-\uFFE5]+$/);
    regX('emergencyContactMode', /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/);
}

function regX(id, test) {
    $('#' + id).keyup(function () {
        if (test.test(this.value)) {
            $('#' + id).css('border-color', '#e5e5e5');
        } else {
            $('#' + id).css('border-color', 'red');
        }
    });
}
function initGL() {
   $('#gonglueText').find('select[name!="educationForm"]').find('option').remove(); 
   $('#gonglueText').find('select[name!="educationForm"]').trigger('chosen:updated');
   $('#gonglueText').find('select[name="educationForm"]').val(0); 
   var def = new Option("--请选择--", '');
   document.getElementById("zybranchSchool").options.add(def, 0);
   
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.list.length; i++) {
                var o = new Option(data.list[i].fullName, data.list[i].departmentId);
                document.getElementById("zybranchSchool").options.add(o);
            }
          
            $('#zybranchSchool').trigger('chosen:updated');
            $("#zybranchSchool").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    var def = new Option("--请选择--", '');
    document.getElementById("xlbranchSchool").options.add(def, 0);
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.list.length; i++) {
                var o = new Option(data.list[i].fullName, data.list[i].departmentId);
                document.getElementById("xlbranchSchool").options.add(o);
            }
           
            $('#xlbranchSchool').trigger('chosen:updated');
            $("#xlbranchSchool").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    var def = new Option("--请选择--", '');
    document.getElementById("zyproject").options.add(def, 0);
    $.ajax({
        async: false,
        url: ctx + "/bizScale/loadProject",
        data: {projectType: 1},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].projectId);
                document.getElementById("zyproject").options.add(o);
            }
           
            $('#zyproject').trigger('chosen:updated');
            $("#zyproject").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    });
    var def = new Option("--请选择--", '');
    document.getElementById("xlproject").options.add(def, 0);
    $.ajax({
        async: false,
        url: ctx + "/bizScale/loadProject",
        data: {projectType: 2},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].projectId);
                document.getElementById("xlproject").options.add(o);
            }
           
            $('#xlproject').trigger('chosen:updated');
            $("#xlproject").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    });
}
/**
 * 初始化攻略列表职业
 * @returns
 */
function initglTablezy() {
    $('#tablezy').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/bizProductPrice/ajaxGL',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDatazy,
        "aoColumns": [
            {
                "mDataProp": "depName", 'sClass': "text-center"
            },
            {"mDataProp": "className", 'sClass': "text-center"},
            {"mDataProp": "levelName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "teachType",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == 1) {
                        return "面授";
                    }
                    if (data == 2) {
                        return "直播";
                    }
                    if (data == 3) {
                        return "录播";
                    }
                }
            },
            {"mDataProp": "price", "bSortable": false, 'sClass': "text-center","mRender": function (data, type, full) {
               if(full['price']!=null){
            	   var json = eval(full['price']);
            	   var price = 0;
            	   for(var i=0;i<json.length;i++){
            		   price += json[i].price;
            	   }
               }
               return price;
            }},
            {
                "mDataProp": "content",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    var u1 = '<a href="#" class="view"'
                        + 'data-toggle="modal" data-backdrop="static" data-record=\'' + JSON.stringify(full) + '\''
                        + '   data-target=".professionView">'
                        + '   <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i>'
                    return u1;
                }
            }
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#tablezy_wrapper").removeClass();
    $('#tablezy_wrapper').addClass("table-scrollable");

    //每页显示记录数
    //$('#tablezy_wrapper .dataTables_info').parent().append($('#tablezy_wrapper .dataTables_length'));
    $('#tablezy_wrapper .dataTables_info').parent().css('width','40%')
    $('#tablezy_wrapper .dataTables_paginate').parent().css('width','60%')
    $('#tablezy_wrapper .dataTables_length').remove();
    HScrollBar('#tablezy_wrapper');
}

function initDatazy(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    aoData.push({"name": "projectId", "value": $('#zyproject').val()});
    aoData.push({"name": "levelId", "value": $('#zyprojectleven').val()});
    aoData.push({"name": "depId", "value": $('#zybranchSchool').val()});
    aoData.push({"name": "productId", "value": $('#zyproduct').val()});

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
/**
 * 初始化攻略列表学历
 * @returns
 */
function initglTablexl() {
    $('#tablexl').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/bizProductPrice/ajaxGLXL',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataxl,
        "aoColumns": [
            {
                "mDataProp": "depName", 'sClass': "text-center"
            },
            {"mDataProp": "projectName", 'sClass': "text-center"},
            {"mDataProp": "levelName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "educationForm",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    if (data == 1) {
                        return "自考";
                    }
                    if (data == 2) {
                        return "远程";
                    }
                    if (data == 3) {
                        return "成考";
                    }
                }
            },
            {"mDataProp": "schoolName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "majorName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "className", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "price", "bSortable": false, 'sClass': "text-center","mRender": function (data, type, full) {
                if(full['price']!=null){
             	   var json = eval(full['price']);
             	   var price = 0;
             	   for(var i=0;i<json.length;i++){
             		   price += json[i].price;
             	   }
                }
                return price;
             }},
            {
                "mDataProp": "content",
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    var u1 = '<a href="#" class="view"'
                        + 'data-toggle="modal" data-backdrop="static" data-record=\'' + JSON.stringify(full) + '\''
                        + '   data-target=".professionView">'
                        + '   <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i>'
                    return u1;
                }
            }
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#tablexl_wrapper").removeClass();
    $('#tablexl_wrapper').addClass("table-scrollable");

    //每页显示记录数
    //$('#tablexl_wrapper .dataTables_info').parent().append($('#tablexl_wrapper .dataTables_length'));
    $('#tablexl_wrapper .dataTables_info').parent().css('width','40%')
    $('#tablexl_wrapper .dataTables_paginate').parent().css('width','60%')
    $('#tablexl_wrapper .dataTables_length').remove();
    HScrollBar('#tablexl_wrapper');
}
function initDataxl(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    aoData.push({"name": "projectId", "value": $('#xlproject').val()});
    aoData.push({"name": "levelId", "value": $('#xlprojectleven').val()});
    aoData.push({"name": "depId", "value": $('#xlbranchSchool').val()});
    aoData.push({"name": "schoolId", "value": $('#xlschoolForm').val()});
    aoData.push({"name": "majorId", "value": $('#xlmajorForm').val()});
    aoData.push({"name": "educationForm", "value": $('#educationForm').val()});
    aoData.push({"name": "productId", "value": $('#xlclassForm').val()});
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
function yanzheng(){
	var classId =  $('#classId2').val();
	if(classId == ""||classId == null){
		toastr.error('請确认选择班型！');
	}else{
		$('.subscribe').modal('show');
	}
}

//添加信息量时需求1：根据录入的电话号抓取数据，如成功，学员信息其他一律不得编辑，反之，则可填写
function studentPhoneSelect(){
	var studentPhone = $('#addInquiries input[name="studentPhone"]').val();
	if(studentPhone == ''){
	    return false;
	}
	$.ajax({
	  type: "POST",
      url: ctx + '/consultInfoManage/selectStudentOne',
      data: {studentPhone:studentPhone},
      dataType: 'json',
      success: function (data) {
          if(data.list.length>0){
        	  $('#addInquiries input[name="phoneBelong"]').val(data.list[0].phoneBelong);
        	  $('#addInquiries input[name="studentName"]').val(data.list[0].studentName);
        	  $('#addInquiries select[name="studentSex"] :selected').val(data.list[0].studentSex ? "女":"男");
        	  $('#addInquiries input[name="weChat"]').val(data.list[0].weChat);
        	  $('#addInquiries input[name="age"]').val(data.list[0].age);
        	  $('#addInquiries input[name="tengXun"]').val(data.list[0].tengXun);
        	  $('#addInquiries select[name="studentAttrId3"] :selected').html(data.list[0].studentAttrName3);
        	  $('#addInquiries input[name="bySchool"]').val(data.list[0].bySchool);
        	  $('#addInquiries input[name="byZy"]').val(data.list[0].byZy);
        	  $('#addInquiries select[name="nations"] :selected').html(data.list[0].nation);
        	  $('#addInquiries select[name="nations"]').prop('disabled', true).trigger('chosen:updated');
        	  $('#addInquiries input[name="emergencyContact"]').val(data.list[0].emergencyContact);
        	  $('#addInquiries input[name="emergencyContactMode"]').val(data.list[0].emergencyContactMode);
        	  $('.userInfo').find('input').attr('readonly',true);
        	  $('.userInfo').find('select').attr('disabled',true);
        	  $(".phoneBelong").on({
        	        focus: function () {
        	            $('.attribution').hide();
        	        },
        	        click: function () {
        	            $('.attribution').hide();
        	        },
        	    });
          }
      },
      error: function (msg) {
          toastr.error("系统错误");
      }
	});
}


//横线滚动条
function HScrollBar(ele){
	$(ele).on('scroll',function(){
		$(ele).find('.dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}

function zytable(){
	initglTablezy();
}
function xltable(){
	initglTablexl();
}



