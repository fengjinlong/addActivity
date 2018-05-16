$(function () {
    var national = [
        "--请选择--", "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
        "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
        "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
        "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
    ];
    initNations();
    initNations1();
    function initNations() {
        var nat = document.getElementById("nations");
        for (var i = 0; i < national.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            var txt = document.createTextNode(national[i]);
            option.appendChild(txt);
            nat.appendChild(option);
        }
        $('#nations').trigger('chosen:updated');
        $("#nations").chosen({no_results_text: "没有匹配项"});
        $('.chosen-container').width('100%');
    }
    
    function initNations1() {
        var nat = document.getElementById("nations1");
        for (var i = 0; i < national.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            var txt = document.createTextNode(national[i]);
            option.appendChild(txt);
            nat.appendChild(option);
        }
        $('#nations1').trigger('chosen:updated');
        $("#nations1").chosen({no_results_text: "没有匹配项"});
        $('.chosen-container').width('100%');
    }

    $(".phoneBelong").on({
        focus: function () {
            $('.attribution').show();
        },
        click: function () {
            $('.attribution').show();
        },
    });
    $('.addInquiries').on('hidden.bs.modal', function () {
        $("#city,#province,#inquiries input:hidden,#inquiries textarea:hidden").val("");
        $("#city,#province").trigger("chosen:updated");
        $('#users .selectpicker').selectpicker('refresh');
        $('#users').data('bootstrapValidator').resetForm();
    })
    //全选
    $('#infoManage thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#infoManage tbody .slaver').prop('checked', true);
        }else{
            $('#infoManage tbody .slaver').prop('checked', false);
        }
    })

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

    //电话归属地获取值
    function chose_get_value(select) {
        return $(select).val();
    }

    //电话归属地获取选中的文本
    function chose_get_text(select) {
        return $(select + " option:selected").text();
    }

    function phoneBelong(parentEle) {
        $(parentEle).find('.attribution .confirm-btn').click(function () {
            if (chose_get_value(parentEle + ' #province') != 0 && chose_get_value(parentEle + ' #city') != 0) {
                $(parentEle).find('.phoneBelong').val(chose_get_text(parentEle + ' #province') + chose_get_text(parentEle + ' #city'));
                $(parentEle).find('.attribution').fadeOut();
            }
        });
        $(parentEle).find('.attribution .cancel-btn').click(function () {
            $(parentEle).find('.attribution').fadeOut();
        });

    }

    //咨询者类型为在线有效时，对话记录为必填项
    $("#studentAttrId2").change(function () {
        if ($("#studentAttrId2").find("option:selected").text() == "在线有效") {
            $("#talk").addClass("control-label mandatory").html("*");
            $("#talk").parent().removeClass("padding-right-5");
        } else {
            $("#talk").removeClass("control-label mandatory").html("");
            $("#talk").parent().addClass("padding-right-5");
        }
    })

    //创建咨询量
    phoneBelong('.addInquiries');

    //日期控件
    $('#reservation').daterangepicker({
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
    $('#reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    });

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
            $("#departmentId1").html('<option value="">--请选择--</option>' + opt);
            $('#departmentId1').trigger('chosen:updated');
            $("#departmentId1").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
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
            $("#studentAttrId3s").html('<option value="">--请选择--</option>' + xl);
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
            $('#province').trigger('chosen:updated');
            $("#province").chosen({no_results_text: "没有匹配项"});
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
                $("#city").html('<option value="0">--请选择--</option>' + shi);
                $('#city').trigger('chosen:updated');
                $("#city").chosen({no_results_text: "没有匹配项"});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });
})

//数据初始化
$("#usersList tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#usersList tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});

var DataTable = function(){
	return {
		init: function () {
			var dutyTable = $('#usersList').dataTable({
				"bPaginate": true,  //是否显示分页
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	//"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/studentInfoManage/load',
        		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
                	"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
                },
                "aoColumns" : [
						{
						    "mData": "studentInfoManageId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
						    return "<label> <input id=" + data + "  name='infoManageIds' value=" + data + " type='checkbox' class='slaver'> <span class='text'></span> </label>";
						    /* '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" ></span> </label>'; */
							}
						},
						{"mData": "studentName", 'sClass': "text-center"},
						{"mData": "studentSex", 'sClass': "text-center"},
						{"mData": "age", 'sClass': "text-center"},
						{"mData": "nation", 'sClass': "text-center"},
						{"mData": "studentPhone", 'sClass': "text-center"},
						{"mData": "phoneBelong", 'sClass': "text-center"},
						{"mData": "bySchool", 'sClass': "text-center"},
						{"mData": "studentAttrName3", 'sClass': "text-center"},
						{"mData": "byZy", 'sClass': "text-center"},
						{"mData": "weChat", 'sClass': "text-center"},
						{"mData": "tengXun", 'sClass': "text-center"},
						{"mData": "emergencyContact", 'sClass': "text-center"},
						{"mData": "emergencyContactMode", 'sClass': "text-center"},
						{
			                "mData": "studentInfoManageId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                    var u = "<a data-record='"+JSON.stringify(full)+"' class='edit' data-backdrop='static'><i class='fa fa-search warning'  data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
			                    var w = "<a data-record='"+JSON.stringify(full)+"' class='editUsers' data-toggle='modal' data-backdrop='static' data-target='.editUser'><i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>";
			                    var d = '<a href="#" class="delete" onclick="deleteInfoManage(\''+full["studentInfoManageId"]+'\')"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
			                    return u+w+d;
			                }
			            }

                ],
                "aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
	   	     "fnRowCallback":function(nRow,aData,iDisplayIndex){
	   	    	if(aData.studentSex=='0'){
	   	    		$('td:eq(2)',nRow).html('男');
	   	    	}else if(aData.studentSex=='1'){
	   	    		$('td:eq(2)',nRow).html('女');
	   	    	}
	   	    	return nRow;
	   	     },
	   	     "fnDrawCallback": function(){
	            var oTable = $("#usersList").dataTable();
	            $('.redirect').keyup(function(e){
	                if($(this).val() && $(this).val()>0){
	                    var redirectpage = $(this).val()-1;
	                }else{
	                    var redirectpage = 0;
	                }
	                oTable.fnPageChange( redirectpage );
	            });
	        }
			});
			$("#infoManage_wrapper").removeClass();
			$('#infoManage_wrapper').addClass("table-scrollable");
			//横线滚动条
			$("#infoManage_wrapper").on('scroll',function(){
				$('#infoManage_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		}
	}
}();
DataTable.init();
$("#infoManage tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#infoManage tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
    $('.dataTables_info').parent().append($('.dataTables_length'));
}
//删除
function deleteInfoManage(id) {
    swal({
        title: "",
        text: "确定要删除吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        var studentInfoManageId = id;
        $.ajax({
            url: ctx + '/studentInfoManage/updateRecord',
            type: 'POST',
            data: {
            	studentInfoManageId: studentInfoManageId,
                deleteMark: 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                    DataTable.init();
                } else {
                    toastr.error(data.msg);
                }
            }
        });
    });
}
//编辑取值 
$('#usersList').on('click', '.editUsers', function () {
	var record = $(this).data('record');
	$('#editUser input[name="studentInfoManageId"]').val(record.studentInfoManageId);
	$('#editUser input[name="phoneBelong"]').val(record.phoneBelong);
    $('#editUser input[name="studentName"]').val(record.studentName);
    $('#editUser input[name="studentPhone"]').val(record.studentPhone);
    $('#editUser select[name="studentSex"]').val(record.studentSex);
    $('#editUser input[name="weChat"]').val(record.weChat);
    $('#editUser input[name="age"]').val(record.age);
    $('#editUser input[name="tengXun"]').val(record.tengXun);
    $('#editUser select[name="studentAttrId3"]').val(record.studentAttrId3);
    $('#editUser input[name="byZy"]').val(record.byZy);
    $('#editUser select[name="nations"] :selected').html(record.nation);
    $('#editUser select[name="nations"]').trigger('chosen:updated');
    $('#editUser input[name="emergencyContact"]').val(record.emergencyContact);
    $('#editUser input[name="emergencyContactMode"]').val(record.emergencyContactMode);
    $('#editUser input[name="bySchool"]').val(record.bySchool);
})

//查看数据
$('#usersList').on('click', '.edit', function () {
    var record = $(this).data('record');
    $('#phoneBelongView').val(record.phoneBelong);
    $('#studentNameView').val(record.studentName);
    $('#studentPhoneView').val(record.studentPhone);
    $('#studentSexView').val(record.studentSex ? "女" : "男");
    $('#wechatView').val(record.weChat);
    $('#ageView').val(record.age);
    $('#tengXunView').val(record.tengXun);
    $('#highestEducationView').val(record.studentAttrName3);
    $('#notesView').val(record.notes);
    $('#majorNameView').val(record.byZy);
    $('#nationView').val(record.nation);
    $('#emergencyContactView').val(record.emergencyContact);
    $('#emergencyContactModeView').val(record.emergencyContactMode);
    $('#graduateInstitutionsView').val(record.bySchool);
    $('#viewInfo').modal('show');

})

//添加信息量时需求1：根据录入的电话号抓取数据，如成功，提示
function studentPhoneSelect(){
	var studentPhone = $('#addUsers input[name="studentPhone"]').val();
	if(studentPhone == ''){
		return false;
	}
	$.ajax({
	  type: "POST",
      url: ctx + '/studentInfoManage/selectStudentOne',
      data: {studentPhone:studentPhone},
      dataType: 'json',
      success: function (data) {
          if(data.list.length>0){
        	  toastr.error("该手机号码的学员已存在于系统中，请核对号码！");
          }
      },
      error: function (msg) {
          toastr.error("系统错误");
      }
	});
}

//创建学员信息
$('#addUsers').on('show.bs.modal', function () {
	$('#users input').attr('readonly',false);
	$('#users slect').attr('disabled',false);
})
//表单验证
$('#users').bootstrapValidator({
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
//		        regexp: {
//		            regexp: /^([\u4e00-\u9fa5]){2,7}$/,
//		            message: '姓名必须为汉字'
//		        }
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
    	var options = form.serialize();
    	var studentAttrName3 = $('#studentAttrId3 :selected').text();//最高学历名称
        var nation = $('#nations :selected').text();//民族
        options += "&studentAttrName3=" + studentAttrName3;
        options += "&nation=" + nation;
        $.ajax({
          type: "POST",
          url: ctx + '/studentInfoManage/addNewRecord',
          data: options,
          dataType: 'json',
          success: function (data) {
              if (data.status == "success") {
                  DataTable.init();
                  $('.addInquiries').modal('hide');
              } else {
                  toastr.error(data.msg);
              }
          },
          error: function (msg) {
              toastr.error("系统错误");
          }
      });
    }
});

//表单验证
$('#editUser').bootstrapValidator({
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
//		        regexp: {
//		            regexp: /^([\u4e00-\u9fa5]){2,7}$/,
//		            message: '姓名必须为汉字'
//		        }
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
    	var options = '';
    	var studentPhone = $('#editUser input[name="studentPhone"]').val();
    	var phoneBelong = $('#editUser input[name="phoneBelong"]').val();
    	var studentName = $('#editUser input[name="studentName"]').val();
    	var studentSex = $('#editUser select[name="studentSex"]').val();
    	var weChat = $('#editUser input[name="weChat"]').val();
    	var age = $('#editUser input[name="age"]').val();
    	var tengXun = $('#editUser input[name="tengXun"]').val();
    	var studentAttrId3 = $('#editUser select[name="studentAttrId3"]').val();
    	var byZy = $('#editUser input[name="byZy"]').val();
    	var bySchool = $('#editUser input[name="bySchool"]').val();
    	var emergencyContact = $('#editUser input[name="emergencyContact"]').val();
    	var emergencyContactMode = $('#editUser input[name="emergencyContactMode"]').val();
    	var studentInfoManageId = $('#editUser input[name="studentInfoManageId"]').val();
    	var studentAttrName3 = $('#editUser select[name="studentAttrId3"] :selected').text();//最高学历名称
        var nation = $('#editUser select[name="nations"] :selected').text();//民族
        options += "&studentPhone=" + studentPhone;
        options += "&phoneBelong=" + phoneBelong;
        options += "&studentName=" + studentName;
        options += "&studentSex=" + studentSex;
        options += "&weChat=" + weChat;
        options += "&age=" + age;
        options += "&tengXun=" + tengXun;
        options += "&studentAttrId3=" + studentAttrId3;
        options += "&byZy=" + byZy;
        options += "&bySchool=" + bySchool;
        options += "&emergencyContact=" + emergencyContact;
        options += "&emergencyContactMode=" + emergencyContactMode;
        options += "&studentInfoManageId=" + studentInfoManageId;
        options += "&studentAttrName3=" + studentAttrName3;
        options += "&nation=" + nation;
        $.ajax({
          type: "POST",
          url: ctx + '/studentInfoManage/updateRecord',
          data: options,
          dataType: 'json',
          success: function (data) {
              if (data.status == "success") {
                  DataTable.init();
                  $('.editUser').modal('hide');
              } else {
                  toastr.error(data.msg);
              }
          },
          error: function (msg) {
              toastr.error("系统错误");
          }
      });
    }
});


//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

//全选
$(document).on('change', 'input:checkbox.checkAll', function(){
	if($(this).prop('checked')){
		$('input:checkbox.slaver').prop('checked', 'checked');
	}else{
		$('input:checkbox.slaver').prop('checked', '');
	}
})

//导出excel文件
function exportExcel() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultInfoManage/exportExcel?infoManageIds="+chk_value;
}

//导出PDF文件
function exportPDF() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultInfoManage/exportPDF?infoManageIds="+chk_value;
}

//导出CSV文件
function exportCSV() {
	var chk_value =[]; 
	$('input[name="infoManageIds"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	 
	if(chk_value == null || chk_value.length == 0){
	        toastr.error("请勾选导出数据");
	        return false;
	}
	window.location.href = ctx + "/consultInfoManage/exportCSV?infoManageIds="+chk_value;
}

//关闭弹窗同时关闭电话归属地
$('#users').on('hide.bs.modal', function () {
	$('#users .attribution').css('display','none');
})



