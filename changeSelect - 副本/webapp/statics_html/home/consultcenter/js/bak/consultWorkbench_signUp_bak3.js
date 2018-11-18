//报名tab页查看功能
$('#table66').on('click', '.ck,.call-out', function () {
	var record = $(this).data('record');
	$('#updateInfoManage2').find(".comment_disabled").attr({
		"disabled" : true
	});
	$("#coursePayInfo").html("");//清空缴费内容  
	// 初始化页面隐藏域数据，生成订座费
	publicJsonModel(record);
//	//生成回显报名费用列表
	//产品(班型)信息回显
   	$("#productId2").html("<option value='"+record.productId+"' selected>"+record.productName+"</option>");
 	//加载下拉框样式-必须有否则页面上该下拉框会出现一些bug
	$("#productId2").trigger('chosen:updated');
	$("#productId2").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
   	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
   	$("#productId2").addClass("init");
   	//公共弹出框中课程信息回显（包括产品模型信息回显等)
   	loadGT_YYD2(record);
   	
});


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
        "sAjaxSource": ctx + '/consultConsoleSignUp/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData6,
        "aoColumns": [
            {"mDataProp": "bmcode","bSortable": false,'sClass': "text-center"},
            {"mDataProp": "baoMinDate",'sClass': "text-center","mRender": function (data, type, full) {
        		if(full["baoMinDate"]==null || full["baoMinDate"]=="") {
        			return "";
        		}
                var timestamp = new Date(full["baoMinDate"]);
                return timestamp.toLocaleString();
            }},
            {
                "mDataProp": "next_pay_time", 'sClass': "text-center", "mRender": function (data, type, full) {
                var res = full['sumPrice'] - full['sPrice'];
                if (res <= 0) {
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
                'sClass': "text-center"
            },
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
            {"mDataProp": "sumPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "sPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                return eval(full['sPrice']);
            }},
            {
                "mDataProp": "sumPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                return full['sumPrice'] - full['sPrice'];
            }
            },
            {
                "mDataProp": "printCount", 'sClass': "text-center"
            },
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>';
                var u2 = '<a href="#" data-record=\'' + full.infoManageId + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a>';
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a>';
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
    aoData.push({"name": "studentName", "value": $('#fullName5').val()});
    aoData.push({"name": "productId", "value": $('#product5').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus5').val()});
     
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
            $('span[id=spanBM]').text(resp.returnObject.iTotalRecords);//设置报名tab上的统计信息
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}

/**
 * 获取上次欠费记录
 * @returns
 */
function loadBeforePay() {
    var id = $('#infoManageId2').val();//咨询ID
    var productExamTimeId = $("#productExamTimeId").val();//产品考期ID
    $.ajax({
        type: "post",
        url: ctx + "/consultConsoleSignUp/ajaxBeforePay",
        dataType: "json",
        data: {"infoManageId": id, "productExamTimeId":productExamTimeId},
        success: function (data) {
            if(data.status=="success") {
            	for(var i=0; i<data.list.length; i++) {
            		$("#payInfo").prepend('<div class="clear_both position_rel">'
                            + '<h5 class="xian hide_content"><i class="fa fa-angle-down"></i>'+data.list[i].payName+' 欠费合计:<span style="color: red;" id="pxfp">'+data.list[i].cfValue+'</span></h5>'
                            + '<div class="pull-right">'
                            + '   <a href="javascript:void(0);" class="btn btn-info btn-xs add_row" onclick="addRow(this)" data-index="'+i+'"><i'
                            + '            class="fa fa-plus-circle"></i></a>'
                            + '   <input type="hidden" name="payList['+i+'][payCode]" value="'+data.list[i].payCode+'"/>'//用来存储费用编码-payFees表
                            + '   <input type="hidden" name="payList['+i+'][payName]" value="'+data.list[i].payName+'"/>'//用来存储费用名称-payFees表
                            + '	  <input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
                            + '	  <input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].payCode+'"/>'//用来存储费用编码-comp表
                            + '	  <input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ" value="0"/>'//用来存储实缴值-comp表    
                            + '	  <input type="hidden" name="payCompList['+i+'].infoManageId" value="'+id+'"/>'//咨询id-comp表  
                            + '</div>'
                            + '<div class="row clear_both form_margin">'
                            + '    <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                            + '        <select name="payList['+i+'][payFrom]" class="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                            + '            <option value="1">现金</option>'
                            + '            <option value="2">刷卡</option>'
                            + '            <option value="3">支票</option>'
                            + '            <option value="4">汇款-微信</option>'
                            + '            <option value="5">汇款-支付宝</option>'
                            + '            <option value="6">汇款-网络</option>'
                            + '            <option value="7">银行转账</option>'
                            + '        </select>'
                            + '    </div>'
                            + '    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                            + '        <input placeholder="0" onkeyup="bufei(this)" name="payList['+i+'][payValue]" class="form-control payValue" type="number" value="">'
                            + '    </div>'
                            + '</div>'
                            + '</div>');
            	}
            	//toastr.success('欠费查询成功');
            } else {
            	toastr.error('欠费查询失败');
            }
        }
    })
}
//判断金额是否为空，是控制返回0
function isNull(val) {
    if (val) {//非空
        return val;
    } else {
        return 0;
    }
}
//报名-补费
function bufei(e) {
	//input-div-div.row-div.clear_both
    var cf = $(e).parent().parent().parent().find('h5').find('span').text();//应缴
    var obj = $(e).parent().parent().parent().find('input.payValue');//金额输入框对象
    var sum = 0;//
    for (var i = 0; i < obj.length; i++) {//统计当前缴费类型下支付金额总和
        sum = eval(sum) + eval(isNull(obj[i].value));
    }
    if (sum > cf) {//如果支付方式总和大于实际欠费
        $(e).val(null);//当前输入框输入金额不合法，制空//form表单value为null的也不会提交
    } else {
    	//统计汇总当前缴费类型下的实缴金额
    	$(e).parent().parent().parent().find('input.payCompSJ').val(sum);//更新当前缴费类型实缴金额
    }
     
}

//报名-补费-添加新的缴费方式
//$(".add_row").click(function () {//不能用这种方式，动态生成的.add_row无法加载该事件，只有静态才行
function addRow(obj) {
	var index = $(obj).data("index");
	var add_content = '<div  class="row clear_both form_margin">' +
	'<div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
	'<select name="payList['+index+'][payFrom]" class="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
	'<option value="1">现金</option>' +
	'<option value="2">刷卡</option>' +
	'<option value="3">支票</option>' +
	'<option value="4">汇款-微信</option>' +
	'<option value="5">汇款-支付宝</option>' +
	'<option value="6">汇款-网络</option>' +
	'<option value="7">银行转账</option>' +
	'</select>' +
	'</div>' +
	'<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
	'<input class="form-control payValue" onkeyup="bufei(this)" name="payList['+index+'][payValue]" placeholder="0" type="number">' +
	'</div>' +
	'<a href="javascript:void(0);" class="btn btn-info btn-xs minus_row" onclick="minusRow(this)"><i class="fa fa-minus-circle"></i></a>' +
	'</div>';
	$(obj).parent().parent().append(add_content);
}
//删除新增信息
function minusRow(obj) {
	$(obj).parent().remove();
}

//显示隐藏-报名-补费-费用类型左边的箭头
$(".hide_content").click(function () {
    $(this).siblings().toggle();
})

//添加缴费按钮弹出框-报名补费
$(".add_jiaofei").click(function () {
	$("#payInfo").find(".clear_both").remove();//清除上次生成的缴费内容
    loadBeforePay();
    $('#jiaofeitrue').removeClass("disabled");
    $('.bs-example-modal-lg4').find('input').val('');
    $('.jiaofeil .position_rel').each(function(index,ele){
    	$(ele).find('.form_margin:not(:last)').remove();
    })
});

//提交报名补费信息（确定按钮触发此事件）
function addjiaofei(e) {
	var yjValue = $("#sumPrice2").val();//应缴费
    var oldSPrice = $('#sPrice').val();//得到之前的实缴费
    var sPrice = oldSPrice;//存储补费后，现在的实缴费金额
    $("#payInfo").find("input.payValue").each(function(index, obj){
    	var payValue = $(obj).val();
    	sPrice = Number(sPrice)+Number(payValue);//循环遍历补费表单下所有输入的金额的和
    });
	var appendNextPayTime = $('#appendNextPayTime').val();
	//如果没有补齐费用，需要填写下次缴费时间
	if(yjValue-sPrice>0) {
		if(appendNextPayTime==null||appendNextPayTime==''){
			toastr.error("如果没有补齐费用，需要填写下次缴费时间");
			return ;
		}
	}
	$('#jiaofeitrue').removeClass("disabled");//使缴费确定按钮失效,防止多次提交
    var infoManageId = $('#infoManageId2').val();//咨询ID
    var productId = $("#productIdHidden").val();
    var nextPayNum = $("#nextPayNum2").val();//下次缴费期次
    
    var options = $("#payInfo").serialize();//得到payCode,payForm,payValue信息
    options += "&infoManageId="+infoManageId+"&sPrice="+sPrice+"&nextPayTime="
    +appendNextPayTime+"&nextPayNum="+nextPayNum+"&productId"+productId;
	  
    $.ajax({
        type: "post",
        url: ctx + "/consultConsoleSignUp/addPayRecord",
        dataType: 'json',
        data: options,
        success: function (data) {
            if (data.status == 'success') {
                toastr.success(data.msg);
                init6();
                $('.bs-example-modal-lg1').modal('hide');
                $('.bs-example-modal-lg4').modal('hide');
                $('.bs-example-modal-lga').modal('hide');
                $('.jiaofeil').modal('hide');

            } else {
                toastr.error(data.msg);
            }
        }
    });
}