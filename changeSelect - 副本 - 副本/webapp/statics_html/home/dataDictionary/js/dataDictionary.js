$(function () {
	$('.addBtn').click(function () {//新增弹窗
        $('.dictionaryAdd').modal('show');
    })
	
	$('body').on('click', '.save-dictionary', function () {//表单提交
    	var _this = this;
        $(_this).attr('disabled', true).html('正在保存.....');
        var dataBasicName =$("[name='dataBasicName']").val();
        var dataBasicEnName=$("[name='dataBasicEnName']").val();
        var dataTypeId=$("[name='dataTypeId']").val();
        var fullName=$("[name='dataTypeId'] :checked").text();
        $.ajax({
            url: ctx + "/dataBasic/addRecord",
            data:{
            	"dataBasicName":dataBasicName,
            	"dataBasicEnName":dataBasicEnName,
            	"dataTypeId":dataTypeId,
            	"fullName":fullName
            },
            dataType: 'json',
            type: 'post',
            success: function (data) {
                if (data.status == 'success') {
                    infoTips("success", "新增成功！");
                    $('.dictionaryAdd').modal('hide');
                    location.href = ctx + '/dataBasic/index';
                } else {
                    infoTips("error", "新增失败，请重试！");
                }
                $(_this).attr('disabled', false).html('保存');
            },
            error: function (msg) {
                ajaxError(msg);
                $(_this).attr('disabled', false).html('确定');
            }
        });
    })
	

    //表新增
    function tableAdd() {
        return {
            init: function () {
                this.bindEvent();
                return this;
            },
            bindEvent: function () {
                $('body')
                    .on('click', '.add-button', function () {//新增弹窗
                        $('.tableAdd').modal('show');
                     $('#tableName').val($(this).parent().find('span').text());
                     $('#dataDetailId').val($(this).parent().find('#dataBasicId').val());
                     
//                       $('#tableAdd').find('input').val('');
                    })
                    .on('click', '.operate-btn', function () {//添加和删除行
                        if ($(this).is('.fa-plus')) {
                        	 var tds = $(this).parents('table').find('thead th');
                             var trStr = '';
                             trStr += '<tr>';
                             for (var i = 0; i < tds.length - 1; i++) {
                                 trStr += '<td><input type="text" name="clz'+i+'" class="form-control"></td>';
                             }
                             trStr += ' <td> <i class="fa fa-minus danger operate-btn"></i></td></tr>';
                             $(this).parents('table').find('tbody').append(trStr);
                        }
                        if ($(this).is('.fa-minus')) {
                            $(this).parent().parent().remove();
                        }
                    })
                    .on('click', '.save-table', function () {//表单提交
                        var _this = this;
                        $(_this).attr('disabled', true).html('正在保存.....');
//                        var tableName =$("#tableName").val();
                        var arrField='';
                        $('input[name^="clz"]').each(function(){
                        	arrField = arrField + $(this).val()+","
                        });
                        arrField = arrField.substring(0,arrField.length-1);
                        var dataBasicId=$("#dataDetailId").val();
                        $.ajax({
                            url: ctx + '/dataBasic/addRecordFields',
                            data: {
                            	"tableName":dataBasicId,
                            	"arrField":arrField,
                            	"dataBasicName":$('#tableName').val()
                            },
                            dataType: 'json',
                            type: 'post',
                            success: function (data) {
                                if (data.status == 'success') {
                                    infoTips("success", "新增成功！");
                                    $('.tableAdd').modal('hide');
                                } else {
                                    infoTips("error", "新增失败，请重试！");
                                }
                                $(_this).attr('disabled', false).html('保存');
                                $('.tableAdd ').modal('hide');
                            },
                            error: function (msg) {
                                ajaxError(msg);
                                $(_this).attr('disabled', false).html('确定');
                            }
                        });

                    })
                    //弹窗隐藏
                    $('.tableAdd').on('hide.bs.modal', function () {
                        $('.tableAdd tbody tr:not(:first)').remove();
                    })
            }
        }
    }
    tableAdd().init();


    // 折叠
    $('.navMenu li a').on('click', function () {
        if ($(this).parent().find('ul').length > 0) {
            if (!$(this).parent().hasClass('open')) {
                $(this).parent().addClass('open').find('.sub-menu').stop().slideDown(300);
                $(this).find(".arrow").removeClass('fa-angle-right').addClass("fa-angle-down");
            } else {
                $(this).parent().removeClass('open').find('.sub-menu').stop().slideUp(300);
                $(this).removeClass('open').find(".arrow").removeClass('fa-angle-down').addClass("fa-angle-right");
            }
        }
    })
    
    $('.courseConfig .sub-menu').find('li').click(function(){
    		var val = $(this).find('span').text();
    		console.log(val);
    		var sidebar=parent.document.getElementById("sidebar");
    		console.log(sidebar);
    		console.info($(sidebar).find('span:contains('+val+')').parent('a').parent('li'));
    		$(sidebar).find('span:contains('+val+')').parent('a').parent('li').click();
    });
})
