function roleChoose(val) {
    var str = val.split(',');
    $('#ultab2').find('li').each(function () {
        $(this).hide();
    });
    for (var i = 0; i < str.length; i++) {
        $('#upli2' + str[i]).show();
    }
}

//通用横线滚动条
function HScrollBar(ele){
	$(ele).on('scroll',function(){
		$(ele).find('.dataTables_paginate').css('margin-right',-$(this).scrollLeft());
	})
}
//咨询台统计信息
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
                $('#zxl').text(data.consultNum);//咨询量
                $('#sml').text(data.theDoorNum);//上门量
                $('#bml').text(data.singNum);//报名量
                $('#dzb').text((data.electricTransfer * 100).toFixed(2) + "%");//电转
                $('#smb').text((data.faceTransfer * 100).toFixed(2) + "%");//面转
                $('#bmb').text((data.sumTransfer * 100).toFixed(2) + "%");//总转
            }
            sumValue(val);//计算业绩和课程单价
            $("#home3 table tbody").mLoading('hide');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}
//咨询台统计信息-计算业绩和课程单价
function sumValue(val) {
//  $.ajax({
//      type: "post",
//      url: ctx + "/consultConsole/ajaxLoadSum",
//      data: {type: val},
//      dataType: "json",
//      success: function (data) {
//          if (data) {
//        	  //业绩=当前用户所有权限下咨询量实缴金额总和
//              $('#yj').text(eval(data.sumValue).toFixed(0));
//              //课程单价=业绩/报名量总数
//              $('#dj').text((eval($('#yj').text()) / eval($('#bml').text().trim() == '0' ? 1 : $('#bml').text().trim())).toFixed(0));
//          }
//      }
//  })
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

function sumCount() {

}

/*数据初始化*/
    loadingTable('#table11',8);
	init();
	$("#table11 tbody").addClass('loadOver');
	roleChoose("1,2,3,8,11");
	initCount('week');
	sumCount();
/*自定义日期格式化:yyyy-MM-dd HH:mm:ss*/    
  Date.prototype.toLocaleString = function() {
	  var monthStr = this.getMonth() + 1;
	  if(monthStr<=9) {
		  monthStr = "0"+monthStr;
	  }
	  var dayStr = this.getDate();
	  if(dayStr<=9) {
		  dayStr = "0"+dayStr;
	  }
	  var hoursStr = this.getHours();
	  if(hoursStr<=9) {
		  hoursStr = "0"+hoursStr;
	  }
	  var minutesStr = this.getMinutes();
	  if(minutesStr<=9) {
		  minutesStr = "0"+minutesStr;
	  }
	  var secondsStr = this.getSeconds();
	  if(secondsStr<=9) {
		  secondsStr = "0"+secondsStr;
	  }
      return this.getFullYear() + "-" + (monthStr) + "-" + dayStr + " " + hoursStr + ":" + minutesStr + ":" + secondsStr;
  };
/**
 * 待沟通——初始化
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
        "sAjaxSource": ctx + '/consultConsoleWFC/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData,
        "aoColumns": [
            {"mDataProp": "departmentName1","bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "recordNextTime", "bSortable": true, 'sClass': "text-center"},
            {"mDataProp": "studentName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "productName",
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
            		if(full["createDate"]==null || full["createDate"]=="") {
            			return "";
            		}
                    var timestamp = new Date(full["createDate"]);
                    return timestamp.toLocaleString();
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

init();

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
    //高级搜索条件
    aoData.push({"name": "studentPhone", "value": $.trim($('#phoneCall').val())});
    aoData.push({"name": "studentName", "value": $.trim($('#fullName').val())});
    aoData.push({"name": "productId", "value": $('#product').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus').val()});
     
    //得到页面显示记录数-(旧版任务提醒)
//    $.ajax({
//        "type": "Post",
//        "url": ctx + '/consultInfoManage/loadSum',
//        "dataType": "json",
//        "data": aoData,
//        "success": function (resp) {
//        	 
//            for (var i = 0; i < resp.length; i++) {
//                if (resp[i].key == "2") {
//                    $('span[id=spanDGT]').text(resp[i].value);
//                }
//                if (resp[i].key == "3") {
//                    $('span[id=spanYGT]').text(resp[i].value);
//                }
//                if (resp[i].key == "4") {
//                    $('span[id=spanYYD]').text(resp[i].value);
//                }
//                if (resp[i].key == "5") {
//                    $('span[id=spanSM]').text(resp[i].value);
//                }
//                if (resp[i].key == "6") {
//                    $('span[id=spanDZ]').text(resp[i].value);
//                }
//                if (resp[i].key == "7") {
//                    $('span[id=spanBM]').text(resp[i].value);
//                }
//            }
//        }
//    });
    //得到页面显示记录数-(新版任务提醒)
    $.ajax({
    	"type": "Post",
    	"url": ctx + '/consultInfoManage/loadRemind',
    	"dataType": "json",
    	"data": aoData,
    	"success": function (data) {
    		if(data.msg == "success") {
    			$("#taskRemind").html("");//清空任务提醒
    			for (var i = 0; i < data.list.length; i++) {
        			$("#taskRemind").append('<li class="order-item">'
							+ '<a data-value="'+JSON.stringify(data.list[i])+'" href="javascript:void(0);" onclick="taskRemind(this)">任务提醒'+(i+1)+'</a>'
							+ '</li>"');
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

//任务提醒——点击弹框，回显信息
function taskRemind(obj) {
	
}

/**
 * 待沟通操作
 */
$('#table11').on('click', '.ck,.call-out', function () {
    var record = $(this).data('record');
    $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
    //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
    $("#appendPayBody").html("");//清空缴费内容
    $("#dingzuoI").val(null);//将订座费缴费栏清空
    
    publicJsonModel(record);
    //产品(班型)信息回显
   	$("#productId").html("<option value='"+record.productId+"' selected>"+record.productName+"</option>");
  //加载下拉框样式-必须有否则页面上该下拉框会出现一些bug
	$("#productId").trigger('chosen:updated');
	$("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
   	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
   	$("#productId").addClass("init");
   	//公共弹出框中课程信息回显（包括产品模型信息回显等)
   	loadGT_YYD(record);
})


/**
 * 添加回访信息
 * @returns
 */
function addRecord() {
	formUpdate.addRecord();
}

//富文本编辑器-对话记录
KindEditor.basePath = ctx_static + '/dep/kindeditor-4.1.7/';
var conversation = KindEditor.create('textarea[name="conversation"]', {
    uploadJson: '${ctx }/file/uploadFile',
    resizeType: 0
});

//待沟通tab新增咨询量弹框
$('#newAdd').click(function () {
    $('.addInquiries').toggle();
    $('#inquiries').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
    $('#addprovince').val('');
    $('#addcity').val('');
    //富文本编辑器-对话记录清空
    conversation.html('');
    //更新下拉框选择
    $('.chosen-select').trigger('chosen:updated');
    //新增页面下拉框初始化
    addinit();
    //清除bootstrapValidator的校验结果
    $('#inquiries').data('bootstrapValidator').resetForm();
});

////新增咨询量
function addinit() {
    $(".phoneBelong").on({
        focus: function () {
            $('#secondDivCity').show();
        },
        click: function () {
            $('#secondDivCity').show();
        },
    });

//电话归属地-选中之后确定操作
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
        
//         
        $("#addprovince").html('<option value="0">--请选择--</option>' + sheng);
        $('#addprovince').trigger('chosen:updated');
        $("#addprovince").chosen({no_results_text: "没有匹配项"});
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
            $("#addcity").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
});

    //创建咨询量时初始化电话归属地
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
        data: {attrType: 2,enable:1},
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
        data: {attrType: 1,enable:1},
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
        data: {attrType: 3,enable:1},
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
    //初始新增咨询量弹框-初始产品类型
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) { 
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+">" + data[i].modelName + "</option>";
            }
            $("#addProductModel").html('<option value="">--请选择--</option>' + zxkc);
            $('#addProductModel').trigger('chosen:updated');
            $("#addProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
    $("#addProductModel").change(function(){
    	//产品模型发生改变，制空产品下拉框
    	clearAddProduct();
    	//得到选中的option的Json信息
    	var jsonObj = $('#addProductModel :selected').data("value");
    	var showList = $('#addProductModel :selected').data("showList");
    	//如果当前模型下没有配置选项
    	if(jsonObj=="undefined" || typeof(jsonObj)=="undefined" || jsonObj==null) {
    		//清除上次选择后生成的下拉框
        	$(".removeFlag").parent().parent().remove();
    		return;
    	}
    	//得到产品类型ID
    	var modelId = $('#addProductModel :selected').val();
    	//清除上次选择后生成的下拉框
    	$(".removeFlag").parent().parent().remove();
    	//用来组装表名
    	var tableArray = new Array();
    	//开始构造最新的拼接结果
    	for(var i=0; i<jsonObj.length; i++) {
    		var enName = jsonObj[i].enName;
    		var chName = jsonObj[i].chName;
    		tableArray.push(enName);
    		//开始拼接
    		var str = '<div class="form-group col-md-4 col-sm-6">'
	                + '       <label class="control-label col-sm-5 no-padding-right">'+chName+'</label>'
	                + '       <div class="col-sm-7 no-padding-right">'
	                + '            <select name="'+nameHandler(enName)+'Id" id="add'+enName+'" onchange="clearAddProduct()" data-value="'+enName+'" class="form-control removeFlag chosen-select" data-live-search="true">'
	                + '            </select>'
	                + '			   <input type="hidden" name="'+nameHandler(enName)+'Name" class="projectInfoManager" />'		
	                + '        </div>'
	                + '</div>';
    		//将新增的下拉框拼接到产品类型下拉框后面
    		$("#addProductModel").parent().parent().after(str);
    		//根据表名和产品类型，关联product表，开始构造option
    	}
    	var tableName = tableArray.join("---");
    	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
		$.ajax({
	        url: ctx + '/consultInfoManage/selectOptionByTable',
	        type: 'POST',
	        dataType: 'json',
	        data: {"tableName":tableName,"modelId":modelId},
	        success: function (data) {
	            if(data==null || data.length==0) {
	            	return;
	            }
	            for (var i = 0; i < data.length; i++) {
	            	var zxkc = "";
	            	for(var j=0; j<data[i].dataList.length; j++) {
	            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
	            	}
	            	$('#add'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
	            	//加载下拉框样式
	            	$('#add'+data[i].tableName).trigger('chosen:updated');
	            	$("#add"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
	            	$('.chosen-container').width('100%');
	            }
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
    
    //新增咨询量页面提交功能
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
            var productModelId = $('#addProductModel :selected').val();
            if (productModelId == null || productModelId == "") {
                toastr.error("请选择产品模型!");
                return;
            }
            var productId = $('#addProductId :selected').val();
            if (productId == null || productId == "") {
                toastr.error("请选择产品!");
                return;
            }
            
            var phoneBelong = $('#inquiries :input[name="phoneBelong"]').val();
			if (phoneBelong == null || phoneBelong == "") {
              toastr.error("请选择电话归属地!");
              return;
			}
            //得到信息归属地的name值
            $("#addDepartmentName1").val($('#adddepartmentId1 :selected').text());
            //得到电话归属地的省市name值
            $("#addPhoneProvinceName").val($("#addprovince :selected").text());
            $("#addPhoneCityName").val($("#addcity :selected").text());
            //得到品牌的name值
            $("#addBrandName").val($("#brandId :selected").text());
            //得到咨询者类型的name值
            $("#addStudentAttrName2").val($("#studentAttrId2 :selected").text());
            //得到媒体来源的name值
            $("#addStudentAttrName1").val($("#studentAttrId1 :selected").text());
            
            
            //获取产品部分动态生成的下拉框的name值
            $(".counselCurriculum select :selected").each(function(index, obj){
            	//获取选中的option的name值
            	var name = $(obj).text();
            	if(name!=null&&name!=''&&name!='--请选择--') {
            		//得到与该下拉框选中option处于同一div下的input对象，option-select-div-input
            		var inputObj = $(obj).parent().parent().find("input.projectInfoManager");
            		//将name值赋值到input中
            		$(inputObj).val(name);
            	} 
            	// 
            });
           //得到产品的name值
            $("#addProductName").val($("#addProductId :selected").text());
            
            var options = form.serialize();
            options += "&status=2";//在待沟通页面创建的咨询量默认就是待沟通
            
    	    $.ajax({
    	      type: "POST",
    	      url: ctx + '/consultInfoManage/addNewRecord',
    	      data: options,
    	      dataType: 'json',
    	      success: function (data) {
    	          if (data.status == "success") {
    	              init();
    	              $('#addInquiries').modal('hide');
    	              toastr.success("新增成功");
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
}