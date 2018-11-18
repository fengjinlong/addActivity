//报名tab页查看功能
$('#table66').on('click', '.ck,.call-out', function () {
	var record = $(this).data('record');
	$('#updateInfoManage2').find(".comment_disabled").attr({
		"disabled" : true
	});
	  
	// 初始化页面隐藏域数据，生成订座费
	publicJsonModel(record);
//	//生成回显报名费用列表
//	var productExamTimeId = $("#productExamTimeId").val();//产品考期ID
//	coursePayDiv(productExamTimeId);
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
//添加报名补费信息确定
function addjiaofei(e) {
	var yjValue = $("#classPrice").val();//应缴费
    var oldSPrice = $('#sPrice').val();//得到之前的实缴费
    var sPrice = oldSPrice;//得到补费后，现在的实缴费金额
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
    
    var options = $("#payInfo").serialize();//得到payCode,payForm,payValue信息
    options += "&infoManageId="+infoManageId+"&sPrice="+sPrice+"&nextPayTime="+appendNextPayTime;
	  
    $.ajax({
        type: "post",
        url: ctx + "/consultConsoleSignUp/addPayRecord",
        dataType: 'json',
        data: options,
        success: function (msg) {
            if (msg.status == 'success') {
                toastr.success("报名补交费用成功");
                init6();
                $('.bs-example-modal-lg1').modal('hide');
                $('.bs-example-modal-lg4').modal('hide');
                $('.bs-example-modal-lga').modal('hide');
                $('.jiaofeil').modal('hide');

            } else {
                toastr.error("报名补交费用失败");
            }
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
                            + '<h5 class="xian hide_content"><i class="fa fa-angle-down"></i>'+data.list[i].payName+' 欠费合计:<span style="color: red;" id="pxfp">'+data.list[i].arrearage+'</span></h5>'
                            + '<div class="pull-right">'
                            + '   <a href="javascript:void(0);" class="btn btn-info btn-xs add_row" onclick="addRow(this)" data-index="'+i+'"><i'
                            + '            class="fa fa-plus-circle"></i></a>'
                            + '   <input type="hidden" name="payList['+i+'][payCode]" value="'+data.list[i].payCode+'"/>'
                            + '   <input type="hidden" name="payList['+i+'][payName]" value="'+data.list[i].payName+'"/>'
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
            	toastr.success('欠费查询成功');
            } else {
            	toastr.error('欠费查询失败');
            }
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
//报名-补费
function bufei(e) {
    var yj = $(e).parent().parent().parent().find('h5').find('span').text();//应缴
    var obj = $(e).parent().parent().parent().find('input.payValue');//金额输入框对象
    var sum = 0;
    for (var i = 0; i < obj.length; i++) {
        sum = eval(sum) + eval(isNull(obj[i].value));
    }
    if (sum > yj) {
        $(e).val('');
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
	'<input class="form-control payValue" onkeyup="bufei(this)" name="payList['+index+'][payValue]" placeholder="0" type="number" value="">' +
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
                var res = full['sumPrice'] - full['sPrice'] - full['dPrice'];
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
                var u1 = '<a href="#" data-record=\'' + full.infoManageId + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>';
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


////费用列表计算合计，param1:费用列表父div的id,param2:下次缴费时间的id
//function hheji2(param1,param2) {
//    var zj = $('#zjprice').text();//总计
//    var hj = $('#hjprice').text();//合计
//    var yh = 0;//优惠
//    var sjhj = 0;//实缴合计
//    var cfhj = 0;//欠费合计
//    var lss = 0;//每行实缴费用
//    var jlid = '';
//    var cfid = '';
//    //遍历前面所有缴费类型的实缴，欠费得到最终合计的实缴，欠费
//    $('#'+param1).find('tr').each(function (i,e) {
//        jlid = $(this).find('td').eq(2);//第二个单元格，每行实缴td对象
//        cfid = $(this).find('td').eq(4);//第四个单元格
//        //剔除实缴合计，总计的td对象
//        if ($(jlid).attr('id') != "sjhj" && $(jlid).attr('id') != "zjsj") {
//            lss = jlid.text();
//            sjhj = sjhj + eval((lss != null && lss != '') ? lss : 0);
//        }
//        if ($(cfid).attr('id') != "cfhj" && $(cfid).attr('id') != "zjcf") {
//            lss = cfid.text();
//            cfhj = cfhj + eval((lss != null && lss != '') ? lss : 0);
//        }
//        
//    })
//    //优惠
//    if ($('.holidayPromo').is(':checked')) {
//        yh = $('#yhqprice').text();
//    }
//    //折扣
//    var zk = $('#zkprice').text();
//    //合计=总计-折扣-优惠
//    var hj = eval(zj - zk - yh);
//    $('#hjprice').text(hj);//合计应缴
//    $('#sjhj').text(sjhj);//合计实缴
//    //欠费合计-控制下次缴费时间的展示
//    if (cfhj > 0) {
//        $('#'+param2).show();
//    } else {
//        $('#'+param2).hide();
//    }
//    
//    yh = yh==''?0:yh;//优惠
//    zk = zk==''?0:zk;//折扣
//    
//    $('#cfhj').text(cfhj-yh-zk);//欠费-优惠-折扣//合计欠费结果
//    
//    //2017/11/22新增
//    var sjValue = 0;
//    //总计-实缴
//    $(".zjsjflag").each(function(index, obj) {
//    	var temp1 = $(obj).val();
//    	sjValue += eval((temp1 != null && temp1 != '') ? temp1 : 0);
//    });
//    $('#zjsj').text(sjValue);//总计实缴
//    //总计-欠费
//    var cfValue = 0;
//    $(".zjcfflag").each(function(index, obj) {
//    	var temp2 = $(obj).text();
//    	cfValue += eval((temp2 != null && temp2 != '') ? temp2 : 0);
//    });
//    $('#zjcf').text(cfValue);//总计欠费
//    
//}
////计算实缴金额
//function bakdp2(e){
//	var sum = 0;
//    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
//        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
//    });
//    return sum;
//}
//
///**
// * 转报名部分-实时计算
// * @param e
// * @returns
// */
//function sshj2(e) {
//    var num = Number($(e).val());//当前输入金额
//    if (!num && num != 0) {
//        toastr.error("请输入正确的付款金额，不能为负数！");
//        $(e).val(0);
//    }
//   // var dprice = $('#dPrice').val();//订座费
//    var backValue = $(e).parent().find(".backValue").text();//已缴费用
//     
//	if(num<Number(backValue)) {//如果当前输入金额小于已缴金额
//		toastr.error("输入的金额不能小于已缴费用！");
//        $(e).val(backValue);
//	}
//    
//    var sum = 0;//支付方式栏下所有输入金额总和
//    //定位到支付方式下所有的支付input
//    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
//        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
//    });
//    
////    var dPrice = $("#dPrice").val();
////    var a1 = eval($('#selfYH2').val()==''?0:$('#selfYH2').val());//优惠-集团
////	var a2 = eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());//优惠-分校
////    dprice = eval(dprice) + eval(a1) + eval(a2);
//    
//    var yj = $(e).parents('tr').children('td').eq(1).text();//每行应缴金额
//      
//    $(e).parents('tr').children('td').eq(2).text(sum);//每行实缴部分金额
//  //每行欠费部分计算
//    $(e).parents('tr').children('td').eq(4).text(yj - sum);
//    
//    //hheji();
//    //开始计算最后的合计内容
//    hheji2($("#param1").val(),$("#param2").val());
//    //2017/11/23新增
//    //为该input输入金额框下的隐藏input:payValue&Form赋值；——此处的费用类型，金额才是支付方式下需要提交的参数
//    var payValue = $(e).val();
//    if($(e).attr('isat')!='1'){//如果是每种费用的支付方式的第一个input
//    	payValue = payValue - backValue;//还需要用每种费用的支付方式的第一个支付input的值减去已缴费金额
//    }
//    if(payValue!=0) {//输入框内必须有金额才可以提交
//    	var payForm = $(e).parent().parent().find("select :selected").val();
//    	$(e).parent().find("input.payValueForm").val(payForm+"="+payValue);//再赋值缴费方式
//    }
//}
//
////转报名-费用部分相关处理js-添加新的缴费方式(有可能一次付款使用多种方式付款)
//function addRowPay2(e) {
//	var list1Index = $(e).data("index");
//    $(e).parent().parent().parent().append('<div class="payment addPayment">'
//        + ' <div class="col-sm-4" >'
//        + '     <select class="form-control">'
//        + '		<option value="1">现金</option>'
//        + '        <option value="2">刷卡</option>'
//        + '        <option value="3">支票</option>'
//        + '        <option value="4">汇款-微信</option>'
//        + '        <option value="5">汇款-支付宝</option>'
//        + '        <option value="6">汇款-网络</option>'
//        + '        <option value="7">银行转账</option>'
//        + '        <option value="8">分期</option>'
//        + '     </select>'
//        + '  </div>'
//        + '  <div class="col-sm-5">'
//        + '     <input class="form-control zjsjflag" isat="1" onkeyup="sshj2(this)" type="text" placeholder="0" >'
//        + '	    <input type="hidden" name="payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
//        + ' </div>'
//        + '<div class="col-sm-3">'
//        + '  <i onclick="removeRowPay2(this)" class="fa fa-minus-circle danger control-label"></i>'
//        + '</div>'
//        + '</div>');
//}
//function removeRowPay2(e) {
//    $(e).parent().parent().remove();
//}
//
////报名补交费用-费用部分相关计算-双击自动填充应缴费用金额
//function dbclick2(e) {
//	var dprice = $('#dPrice').val();
//	
//	$(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
//	  //每行当前操作金额框金额
//	$(e).val($(e).parents('tr').children('td').eq(1).text());
//	
//    sshj2(e);
//}


