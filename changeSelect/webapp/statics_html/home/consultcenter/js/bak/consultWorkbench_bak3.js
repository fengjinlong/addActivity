$(function () {
//一下是名族下拉框初始化	
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

    //初始化最高学历-咨询量新增弹框中
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
    
    advancedFilter('#home11');//待沟通
    advancedFilter('#profile11');//已沟通
    advancedFilter('#education');//预约单
    advancedFilter('#shangmen');//上门
    advancedFilter('#dingzuo');//订座
    advancedFilter('#baoming');//报名
    
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
//    //支付部分隐藏
//    $('.payment .fa').hide();
//    //公共弹框-学员信息部分编辑按钮
//    $('.btn_special_edit').click(function () {
//        $('.payment select,.payment input').removeAttr('disabled');
//        $('.payment .fa').show();
//        $('.paymentInfo td .payment .fa-minus-circle').hide();
//    })

    //期待回访日期
   $(".recordnexttime").datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        startDate: new Date(),
        language: 'zh-CN'
    });

    //回访时间
    $("#recordNextTime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        startDate: new Date(),
        autoclose: true
    });

    //下次缴费时间
    $(".paymentTime").datetimepicker({
    	  language: 'zh-CN',
    	  format: 'yyyy-mm-dd hh:ii:ss',
    	  autoclose: true,
    	  startDate: new Date()
   })
   
    $('.datetimepicker').on('click',function(){
        $('.bs-example-modal-lg4').css('z-index', 1055);
        $('.bs-example-modal-lga').css('z-index', 1039);
    })

    $('.orders-list').find('li,div .row,li a').click(function () {
        var id = $(this).find('span[id^=span]')[0].id;
        $('#myTab11').find('li span[id=' + id + ']').parent('a').click();
    });
    //tab标签点击切换流程页面
    $('#myTab11').find('li a').click(function () {
        $('.condition-filtrate').slideUp(0);
        $('.advanced-filter').html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
        if (this.id == "tab_11") {
            $('.bs-example-modal-lg1 .widget-caption').html('待沟通');
            if(!$("#table11 tbody").hasClass('loadOver')){
	            loadingTable('#table11',8);
            }
            init();
            roleChoose("1,2,3,8,11");
            $('#reservation').val('');
        }
        if (this.id == "tab_22") {
            $('.bs-example-modal-lg1 .widget-caption').html('已沟通');
            if(!$("#table22 tbody").hasClass('loadOver')){
                loadingTable('#table22',10);
            }
            init2();
            $("#table22 tbody").addClass('loadOver');
            roleChoose("1,2,3,4,8,11");
            $('#reservation1').val('');
            $('[data-toggle="tooltip"]').tooltip();
        }
        if (this.id == "tab_33") {
            $('.bs-example-modal-lg1 .widget-caption').html('预约单');
            if(!$("#table33 tbody").hasClass('loadOver')){
                loadingTable('#table33',11);
            }
            init3();
            $("#table33 tbody").addClass('loadOver');
            roleChoose("1,2,3,5,6,7,8,11");
            $('#reservation2').val('');
        }
        if (this.id == "tab_44") {
            $('.bs-example-modal-lg1 .widget-caption').html('上门');
            if(!$("#table44 tbody").hasClass('loadOver')){
            	  loadingTable('#table44',10);
            }
            init4();
            $("#table44 tbody").addClass('loadOver');
            roleChoose("1,2,3,5,6,7,8,9,11");
            $('#reservation3').val('');
        }
        if (this.id == "tab_55") {
            $('.bs-example-modal-lg1 .widget-caption').html('订座');
            if(!$("#table55 tbody").hasClass('loadOver')){
            	loadingTable('#table55',14);
            }
            init5();
            $("#table55 tbody").addClass('loadOver');
            roleChoose("1,2,3,7,8,9,11");
            $('#reservation4').val('');
        }
        if (this.id == "tab_66") {
            $('.bs-example-modal-lg1 .widget-caption').html('报名');
            if(!$("#table66 tbody").hasClass('loadOver')){
            	loadingTable('#table66',14);
            }
            init6();
            $("#table66 tbody").addClass('loadOver');
            roleChoose("1,2,3,8,9,10,11");
            $('#reservation5').val('');
        }
    });

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
            for (var i = 0; i < data.list.results.length; i++) {
                sheng += "<option value=" + data.list.results[i].addressId + ">" + data.list.results[i].fullName + "</option>";
                //console.info(sheng);
                // 
            }
            $("#addprovince").html('<option value="0">--请选择--</option>' + sheng);
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
                for (var i = 0; i < data.list.results.length; i++) {
                    shi += "<option value=" + data.list.results[i].addressId + ">" + data.list.results[i].fullName + "</option>";
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
                for (var i = 0; i < data.list.results.length; i++) {
                    shi += "<option value=" + data.list.results[i].addressId + ">" + data.list.results[i].fullName + "</option>";
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
                for (var i = 0; i < data.list.results.length; i++) {
                    shi += "<option value=" + data.list.results[i].addressId + ">" + data.list.results[i].fullName + "</option>";
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
    });

    $('#zyproduct').chosen().change(function () {
    });

    $('#xlprojectleven').chosen().change(function () {
        $('#xlschoolForm').find('option').remove();
        $('#xlmajorForm').find('option').remove();
        $('#xlclassForm').find('option').remove();
        $('#educationForm').val(0);
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


    $('#tablezy').on('click', '.view', function () {
        var record = $(this).data('record');
        professionDetails.html(record.content);
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
	 //预约单弹框-校验
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
    //公共弹框-学员信息，课程信息，缴费信息表单提交
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
            },
            studentSex: {
            	validators: {
            		notEmpty: {
            			message: '性别不能为空'
            		}
            	}
            },
            age: {
            	validators: {
            		notEmpty: {
            			message: '年龄不能为空'
            		},
                    /*regexp: {
                    	regexp: /^([1-9]{1})(\d{1,2})*$/g,
            			message: '年龄只能是数字，且不能是负数'
                    }*/
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

                    } else {
                    	 toastr.error(msg.msg);
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
    sumValue();
    groupNum();
    onblueVal();

    $('#strategy').click(function () {

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
    })
    
    //客户标签zTree
    $('.customer').on('show.bs.modal', function () {    	
	   	$("#customerTree").html('');
	   	loading('#customerTree');
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

//公共弹框部分-学员信息部分编辑切换效果
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
    var idAr = "";//用于存储选中的咨询量
    $('.slaver3').each(function () {//拼接CheckBox选中的咨询量的id
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
 * 公共弹出框-内容回显(并且为表单隐藏域赋值)
 * @returns
 */

function publicJsonModel(record) {
	$("#classPrice").val(record.classPrice);//应缴费
	$('#dPrice').val(record.dPrice);//订座费
	$('#sPrice').val(record.sPrice);//实缴费
    $('#appendPayTr').hide();//订座tab，费用列表下次缴费日期隐藏
    //判断欠费与否
    if((record.sumPrice - record.sPrice - record.dPrice)<=0) {
    	$('#coursePayTr').hide();//报名tab,费用列表下次缴费日期隐藏
    } else {
    	$('#coursePayTr').show();//报名tab,费用列表下次缴费日期显示
    }
    
    $("#departmentId1Hidden").val(record.departmentId1);//回显分校id-departmentId1
     
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
    //表主键ID回显
    $('#studentInfoManageId').val(record.studentInfoManageId);//studentInfoManageId-student
    $('#infoManageId2').val(record.infoManageId);//infoManageId-consult
    $('#projectInfoManageId').val(record.projectInfoManageId);//projectInfoManageId-project
    $('#productExamTimeId').val(record.kTime);//kTime-project
    //学生个人信息
    $('#upshir2').removeAttr('disabled');
    $('#buttonStatus2').val('');
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
    $('#status2').val(st);//存放展示数据本身的状态（未转变之前的）
    
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

    //控制课程缴费信息部分订座费的展示-6.订座，7.报名
    if (record.status != '6' && record.status != '7') {
    	$('#dztr').show();//订座tab订座费表格展示
    	//$('#dztr2').show();//报名tab订座费表格展示
    } else {
    	$('#dztr').hide();//订座tab订座费表格隐藏
    	//$('#dztr2').hide();//报名tab订座费表格隐藏
    }
//     
  //控制课程缴费信息部分费用列表的展示-6.订座查看，7.报名查看都要展示
//    if (record.status == '6') {
//    	//追加费用列表
//    	appendPayDiv($('#productExamTimeId').val(),'appendPayBody');
//    	//param1:费用列表父div的id,param2:下次缴费时间的id
//    	$("#param1").val("appendPayBody");
//    	$("#param2").val("appendPayTr");
//    } else if(record.status == '7') {
//    	//追加费用列表
//    	//appendPayDiv($('#productExamTimeId').val(),'coursePayInfo');
//    	coursePayDiv($('#productExamTimeId').val());
//    	//param1:费用列表父div的id,param2:下次缴费时间的id
//    	$("#param1").val("coursePayInfo");
//    	$("#param2").val("coursePayTr");
//    } else {
//    }
    
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

     
    if (record.status == '6') {
    	//通用弹框-订座tab-订座费支付方式金额-取消隐藏
    	$('#dingzuoI').prop("disabled",false);
    	$('#dingzuoI').val(record.dPrice);
    	//通用弹框-报名tab-订座费支付方式金额-隐藏(因为两个input有相同的name="dPrice"，为了避免提交表单时两者都提交，就给一个属性设置为disabled)
    	$('#dingzuoI2').prop("disabled",true);
    } else if(record.status == '7'){
    	//通用弹框-订座tab-订座费支付方式金额-隐藏
    	$('#dingzuoI').prop("disabled",true);
    	//通用弹框-报名tab-订座费支付方式金额-取消隐藏(因为两个input有相同的name="dPrice"，为了避免提交表单时两者都提交，就给一个属性设置为disabled)
    	$('#dingzuoI2').prop("disabled",false);
    	$('#dingzuoI2').val(record.dPrice);
    } else {
    }
    //通用弹框-订座费-实缴费显示
    if(record.dPrice==null) {
    	$('#dztd').text('');
    } else {
    	$('#dztd').text(record.dPrice);//订座tab弹框订座费回显
    	$('#dztd2').text(record.dPrice);//报名tab弹框订座费回显
    }
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
    
//转为预约弹框中——初始化分校校区select,type=公司-1 部门-2 分校-3
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {parentId: record.departmentId1},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option address=\"" + data.list[i].description + "\"value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
//                 
            }
            $("#schoolIdModel").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
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

//转为订座，报名前的表单校验
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
                  return false;
                  $("#idcard2").css('border-color', 'red');
              } else {
                  $("#idcard2").css('border-color', '#e5e5e5');
              }
          }
          var val = $("#emergencyContactMode").val();//紧急联系人的联系方式
          msg = phoneCk(val);//验证联系方式（电话号码)格式是否正确
          if ("pass" != msg) {
              toastr.error(msg);
              return false;
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
          
          //2017/11/29新增-转订座和转报名前需要判断当前产品考期是否有接待人员，没有的话就将接待人员设置为当前用户
          var reciveId = $('#reciveId2').val();//接待人员id
          	//将判断放到后台进行
//          if(reciveId2==null||reciveId2=='00000'||reciveId2==""){
//          	toastr.error('请添加接待人员');
//          	return ;
//          }
          var infoManageId = $('#infoManageId2').val();//咨询量id
          //2017/11/28新增-转订座和转报名前需要判断当前产品考期和所属分校是否存在联系
          $.ajax({
              type: "POST",
              url: ctx + "/consultBookingSeats/productRdept",
              async: false,//发送同步请求，为了返回正确的next
              data: {
            	  productExamTimeId: $('#kTime').val(),
            	  addressId: $("#departmentId1Hidden").val(),
            	  "reciveId":reciveId,
            	  "infoManageId":infoManageId
              },
              dataType: 'json',
              success: function (data) {
                  if (data.status == 'success') {
                	next = true;
                  }else{
                	next = false;
                  	toastr.error(data.msg);
                  }
              }
          });
          return next;
}
function phoneCk(val) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(val)) {
        return '请输入有效的手机号码(检查本人和紧急联系人手机是否输入正确)';
    } else {
        return 'pass';
    }
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

//关闭弹窗变为不可编辑状态
$('.modal').on('hide.bs.modal', function () {
    $('.attribution').hide();
    $('this').find('button[type="submit"]').removeAttr('disabled');
    $(this).find("form").find(".comment_disabled").css('border-color', '#e5e5e5');
    $('.bs-example-modal-lg1 .modal-content .modal-body').animate({'scrollTop': 0}, 0);
})

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
//学员信息编辑时的校验
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
//转订座，报名前的身份证验证
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
    return tip;
}


function secondButton() {
    var ar = ['classId2_select',
        'kTime2_select',
        'examRegion_empty'];

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


function groupNum() {
//    $.ajax({
//        type: "post",
//        url: ctx + "/consultConsole/ajaxLoadGroup",
//        dataType: "json",
//        success: function (data) {
//            if (data) {
//                $('#zn').text(data.groupNum);
//            }
//        }
//    })
}
function sumNum() {
//    $.ajax({
//        type: "post",
//        url: ctx + "/consultConsole/ajaxSumSort",
//        dataType: "json",
//        success: function (data) {
//            if (data) {
//                $('#zpm').text(data.sumNum);
//            }
//        }
//    })
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

function zytable(){
	initglTablezy();
}
function xltable(){
	initglTablexl();
}



