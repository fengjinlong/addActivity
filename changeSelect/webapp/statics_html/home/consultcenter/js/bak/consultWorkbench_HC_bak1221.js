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
        "sAjaxSource": ctx + '/consultConsoleHC/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData2,
        "aoColumns": [
            {"mDataProp": "departmentName1","bSortable": false, 'sClass': "text-center"},
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

init2();


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
    //高级搜索条件
    aoData.push({"name": "studentPhone", "value": $.trim($('#phoneCall1').val())});
    aoData.push({"name": "studentName", "value": $.trim($('#fullName1').val())});
    aoData.push({"name": "productId", "value": $('#product1').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus1').val()});
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
    var re = $("input[name^='depStatus']:checked").val();//0,1
    //已付费，未付费
    aoData.push({"name": "mustPay", "value": -1});
    //未预约，预约未上门
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
 * 已沟通操作
 */
$('#table22').on('click', '.ck,.call-out', function () {
    $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
    //$('#updateInfoManage2').data('bootstrapValidator').resetForm(true);
    $("#appendPayBody").html("");//清空缴费内容
    $("#dingzuoI").val(null);//将订座费缴费栏清空
    
    var record = $(this).data('record');
    //通用弹出框回显（回显不全需要修改，在原始consultWorkbench.js中）
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
    // 
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

//转为预约前的验证
function yanzheng(){
	$('#schoolIdModel').val('');
	$('#subscribeDate').val('');
    $('#recordNextTime').val('');
    $('#subscribeExplain').val('');
    $('#serverPhone1').removeAttr("disabled");
	$("#subscribe").data('bootstrapValidator').resetForm();
	var productId =  $('#productId').val();
	if(productId == ""||productId == null){
		toastr.error('請确认选择产品！');
	}else{
		$('.subscribe').modal('show');
	}
}

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
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    startDate: new Date(),
    autoclose: true
})

$('#subscribeDate').datetimepicker('setStartDate', new Date());
$('#subscribeDate').datetimepicker('setEndDate', endTime);

//转为预约弹窗层级
$('.subscribe,.dropIn,.recordIn').on('show.bs.modal', function () {
    $('.bs-example-modal-lg,.bs-example-modal-lg1,.bs-example-modal-lg1').css('z-index', 1039);
}).on('hide.bs.modal', function () {
    $('.bs-example-modal-lg,.bs-example-modal-lg1,.bs-example-modal-lg1').css('z-index', 1050);
});


//转为预约
$('#serverPhone1').click(function () {
	formUpdate.serverPhone();
});