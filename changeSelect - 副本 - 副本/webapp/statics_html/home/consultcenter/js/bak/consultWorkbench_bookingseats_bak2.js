
/**
 * 初始订座
 * @returns
 */
function init5() {
    var init = $('#table55').dataTable({
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
        "sAjaxSource": ctx + '/consultBookingSeats/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData5,
        "aoColumns": [
                      {"mDataProp": "bmcode","bSortable": false,'sClass': "text-center"},
                      {
                          "mDataProp": "dingZDate", 'sClass': "text-center", "mRender": function (data, type, full) {
                        	  if(full['dingZDate']=='') {
                        		  return '';
                        	  }
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

init5();

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
    aoData.push({"name": "studentName", "value": $('#fullName4').val()});
    aoData.push({"name": "productId", "value": $('#product4').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus4').val()});
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
 * 订座操作-点击查看，弹框数据回显
 */
$('#table55').on('click', '.ck,.call-out', function() {
	var record = $(this).data('record');
	$('#updateInfoManage2').find(".comment_disabled").attr({
		"disabled" : true
	})
	 
	// 初始化页面隐藏域数据，生成订座费，报名费用列表
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

/*********************************************************以上guo添加，一下deng添加*****************************************/
//弹出框右侧按钮列表——转为订座和转为报名
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
preferentialType('.preferential');//优惠
preferentialType('.holidayPromo');//假日优惠

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
//        hheji();
        hheji($("#param1").val(),$("#param2").val());
    })
}

//考期变换-生成费用选项
$('#kTime').chosen().change(function () {
    //var obj = $(this).find(':selected');
    var productExamTimeId = $(this).val();//产品考期ID
    //得到数据查询出来时的状态值
    var oldStatus = $('#status2').val();
     
//   //只有当前处于6-订座,才会生成缴费列表--现在改成所有状态下都要生成列表
//    if(oldStatus=='6') {
//    	appendPayDiv(productExamTimeId,'appendPayBody');
//    }
   debugger;
    //生成费用列表
    appendPayDiv(productExamTimeId,'appendPayBody');
});
////根据选中的考期，自动生成拼接费用选项
//function appendPayDiv(productExamTimeId, parentId) {
//	//生成费用列表前先把报名时生成回显的费用列表清空-防止生成的标签的id冲突
//    $('#coursePayInfo').html("");
//	//生成费用列表前先把上一次生成的费用列表清空
//    $('#'+parentId).html("");
//	var infoManageId = $("#infoManageId2").val();
//	var price = 0;//用来计算总计应缴金额
//	var dPrice = $("#dPrice").val();//得到订座费
//	//健壮性判断,防止前面步骤操作异常，订座费没有
//	if(dPrice==null || dPrice=='' || typeof(dPrice)=='undefined') {
//		dPrice = 0;
//	}
//	var productId = $("#productId").val()//产品id
//	$.ajax({
//        "type": "Post",
//        "url": ctx + "/consultBookingSeats/appendPayDiv",
//        "dataType": "json",
//        "data": {
//            productExamTimeId: productExamTimeId
//        },
//        "success": function (data) {
//        	if(data.status=='success'){
//        		for(var i=0; i<data.list.length; i++) {
//        			price = price + eval(data.list[i].price);
//        			//如果费用类型是报名费，实缴费这块要算上订座费
//        			if(data.list[i].code=="code_sign") {
//        				//拼接费用行
//        				$('#'+parentId).append('<tr>'
//        						+ ' <td>' + data.list[i].name + '</td>'
//        						+ '<td id="appendPayTd1">' + data.list[i].price + '</td>'
//        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
//        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
//        						+ '<td>'
//        						+ dPrice
//        						+ '<input type="hidden" class="fixValue" value="'+dPrice+'"/>'//用来存储初始实缴值
//        						+ '</td>'
//        						+ ' <td><div class="payment">'
//        						+ '<div class="col-sm-4">'
//        						+ '   <select class="form-control" >'
//        						+ '		<option value="1">现金</option>'
//        						+ '        <option value="2">刷卡</option>'
//        						+ '        <option value="3">支票</option>'
//        						+ '        <option value="4">汇款-微信</option>'
//        						+ '        <option value="5">汇款-支付宝</option>'
//        						+ '        <option value="6">汇款-网络</option>'
//        						+ '        <option value="7">银行转账</option>'
//        						+ '        <option value="8">分期</option>'
//        						+ '    </select>'
//        						+ '</div>'
//        						+ '<div class="col-sm-5">'
//        						//+ '     <input class="form-control zjsjflag" sign="1" value="'+dPrice+'" type="text" placeholder="0" >'
//        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" sign="1" onkeyup="sshj(this)" value="'+dPrice+'" type="text" placeholder="0" >'
//        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
//        						+ ' </div>'
//        						+ '<div class="col-sm-3">'
//        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
//        						+ '</div>'
//        						+ '</div>'
//        						+ '</td>'
//        						+ '<td class="zjcfflag">' + (data.list[i].price-dPrice) + '</td>'
//        						+ '</tr>');
//
//        			} else {
//        				//拼接费用行
//        				$('#'+parentId).append('<tr>'
//        						+ ' <td>' + data.list[i].name + '</td>'
//        						+ '<td id="' + data.list[i].code + '">' + data.list[i].price + '</td>'
//        						+ '<input type="hidden" name="payList['+i+'][payCode]" class="payCode" value="'+data.list[i].code+'"/>'
//        						+ '<input type="hidden" name="payList['+i+'][payName]" class="payName" value="'+data.list[i].name+'"/>'
//        						+ '<td id="' + data.list[i].code + '_value">'
//        						+ '</td>'
//        						+ ' <td><div class="payment">'
//        						+ '<div class="col-sm-4">'
//        						+ '   <select class="form-control" >'
//        						+ '		<option value="1">现金</option>'
//        						+ '        <option value="2">刷卡</option>'
//        						+ '        <option value="3">支票</option>'
//        						+ '        <option value="4">汇款-微信</option>'
//        						+ '        <option value="5">汇款-支付宝</option>'
//        						+ '        <option value="6">汇款-网络</option>'
//        						+ '        <option value="7">银行转账</option>'
//        						+ '        <option value="8">分期</option>'
//        						+ '    </select>'
//        						+ '</div>'
//        						+ '<div class="col-sm-5">'
//        						+ '     <input ondblclick="dbclick(this)" class="form-control zjsjflag" onkeyup="sshj(this)" type="text" placeholder="0" >'
//        						+ '	    <input type="hidden" name="payList['+i+'][payValue&Form]" class="payValueForm" value=""/>'
//        						+ ' </div>'
//        						+ '<div class="col-sm-3">'
//        						+ '<i onclick="addRowPay(this)" data-index="'+i+'" class="fa  fa-plus-circle payment-btn blue control-label"></i>'
//        						+ '</div>'
//        						+ '</div>'
//        						+ '</td>'
//        						+ '<td class="zjcfflag">' + data.list[i].price + '</td>'
//        						+ '</tr>');
//        			}
//        		}
//        		//拼接最后的总计，优惠，折扣，合计
//        		$('#'+parentId).append('<tr>'
//        	            + ' <td>总计</td>'
//        	            + '<td id="zjprice">' + price + '</td>'
//        	            + '<td id="zjsj">0</td>'
//        	            + ' <td><div class="payment">'
//        	            + '<div class="col-sm-4">'
//        	            + '</div>'
//        	            + '<div class="col-sm-5">'
//        	            + ' '
//        	            + ' </div>'
//        	            + '<div class="col-sm-3">'
//        	            + '</div>'
//        	            + '</div>'
//        	            + '</td>'
//        	            + '<td id="zjcf"></td>'
//        	            + '</tr>');
//        		//暂时先不展示，要求时再展示
//        		$('#'+parentId).append('<tr>'
//        	            + ' <td>优惠券</td>'
//        	            + '<td>0</td>'
//        	            + '<td id="yhqprice"></td>'
//        	            + ' <td><div class="payment">'
//        	            + '<div class="col-sm-4">'
//        	            + '</div>'
//        	            + '<div class="col-sm-5">'
//        	            + ' <input id="activtyCodeValue" class="form-control" onkeyup="activtyCode(this)" type="text" placeholder="请输入8位优惠码" >'
//        	            + ' </div>'
//        	            + '<div class="col-sm-3">'
//        	            + '</div>'
//        	            + '</div>'
//        	            + '</td>'
//        	            + '<td id="zjqf">0</td>'
//        	            + '</tr>');
//        		//开始构造拼接优惠和折扣
//        		$.ajax({
//        	        "type": "Post",
//        	        "url": ctx + "/consultBookingSeats/appendYHZK",
//        	        "dataType": "json",
//        	        "data": {
//        	            "productId": productId
//        	        },
//        	        "success": function (data) {
//        	        	if(data.status=='success') {
//        	        		 for(var i=0; i<data.ZKList.length; i++) {//拼接折扣
//        	        				$('#'+parentId).append('<tr>'
//        	        						+ ' <td>折扣</td>'
//        	        						+ '<td class="zkprice">0</td>'
//        	        						+ '<td>'+Number(price*(1-data.ZKList[i].discount)).toFixed(2)+'</td>'//优惠了多少钱
//        	        						+ ' <td><div class="payment">'
//        	        						+ '<div class="col-sm-4">'
//        	        						+ '</div>'
//        	        						+ '<div class="col-sm-5">'
//        	        						+ '折扣只是针对培训费用的折扣比:'+data.ZKList[i].discount//优惠折扣
//        	        						+ ' </div>'
//        	        						+ '<div class="col-sm-3">'
//        	        						+ '</div>'
//        	        						+ '</div>'
//        	        						+ '</td>'
//        	        						+ '<td>0</td>'
//        	        						+ '</tr>');
//        	        		}
//        	        		 //循环结束，拼接合计
//        	        		 $('#'+parentId).append('<tr>'
//        	         	            + ' <td>合计</td>'
//        	         	            + '<td id="hjprice">' + price + '</td>'
//        	         	            + '<td class="sjhj" id="sjhj">0</td>'
//        	         	            + ' <td><div class="payment">'
//        	         	            + '<div class="col-sm-4">'
//        	         	            + '</div>'
//        	         	            + '<div class="col-sm-5">'
//        	         	            + ' '
//        	         	            + ' </div>'
//        	         	            + '<div class="col-sm-3">'
//        	         	            + '</div>'
//        	         	            + '</div>'
//        	         	            + '</td>'
//        	         	            + '<td class="cfhj" id="cfhj"></td>'
//        	         	            + '</tr>');
//        	        	} else {
//        	        		toastr.error("后台查询优惠折扣失败！");
//        	        	}
//        	        }
//        		});
//        	        
//    	        //折扣
////    	        var zk = eval($('#selfYH2').val()==''?0:$('#selfYH2').val())+eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());
////    	        $('#zkprice').html(zk);//合计
//    	        
//    	        hheji('appendPayBody','appendPayTr');//param1:费用列表父div的id,param2:下次缴费时间的id
//        		toastr.success('操作完成');
//        	}else{
//            	toastr.error(data.msg);
//            }
//        }
//    });
//}
//
//$(".paymentTime").datetimepicker({
//  language: 'zh',
//  format: 'yyyy-mm-dd hh:ii:ss',
//  autoclose: true,
//  startDate: new Date()
//})
////费用列表计算合计，param1:费用列表父div的id,param2:下次缴费时间的id
//function hheji(param1,param2) {
//    var zj = $('#zjprice').text();//总计
//    var hj = $('#hjprice').text();//合计
//    var yh = 0;//优惠
//    var sjhj = 0;//实缴合计
//    var cfhj = 0;//欠费合计
//    var lss = 0;//每行实缴费用
//    var jlid = '';
//    var cfid = '';
//    //$('#appendPayBody').find('tr').each(function (i,e) {
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
//    //折扣-旧版
//    //var zk = $('#zkprice').text();
//    //折扣-新版
//    var zk = 0;
//    $('.zkprice').each(function(index,obj){
//    	zk  += Number($(obj).text());
//    });
//    
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
//function bakdp(e){
//	var sum = 0;
//    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
//        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
//    });
//     
//    return sum;
//}
//
///**
// * 转报名部分-实时计算
// * @param e
// * @returns
// */
//function sshj(e) {
//    var num = Number($(e).val());//当前输入金额
//    if (!num && num != 0) {
//        toastr.error("请输入正确的付款金额，不能为负数！");
//        $(e).val(0);
//    }
//    var dprice = $('#dPrice').val();//订座费
//    //健壮性判断,防止前面步骤操作异常，订座费没有,导致向后台
//	if(dprice==null || dprice=='' || typeof(dprice)=='undefined') {
//		dprice = 0;
//	} 
//    if($(e).attr('sign')=='1'){//如果是报名费的支付方式的第一个input
//    	if(num<Number(dprice)) {//如果当前输入金额小于已缴金额
//    		toastr.error("输入的金额不能小于已缴费用！");
//            $(e).val(dprice);
//    	}
//    }
//    
//    var sum = 0;//支付方式栏下所有输入金额总和
//    //定位到支付方式下所有的支付input
//    $(e).parent().parent().parent().find('input[type="text"]').each(function () {
//        sum = sum + eval((this.value != '' && this.value != null) ? this.value : 0);
//    });
//    //var dprice = $('#dingzuoI').val();//订座费
//   
////    dprice = dprice==''?0:dprice;
////    var a1 = eval($('#selfYH2').val()==''?0:$('#selfYH2').val());//优惠-集团
////	var a2 = eval($('#ortherYH2').val()==''?0:$('#ortherYH2').val());//优惠-分校
////    dprice = eval(dprice) + eval(a1) + eval(a2);
//    
//    var td = $(e).parents('tr').find('td').eq(1);//每行应缴金额td
//    var yj = $(e).parents('tr').children('td').eq(1).text();//每行应缴金额
//      
//    $(e).parents('tr').children('td').eq(2).text(sum);//每行实缴部分金额
//  //每行欠费部分计算
//    if(td[0].id!='appendPayTd1'){//如果当前td不属于报名费
//    	$(e).parents('tr').children('td').eq(4).text(yj - sum - dprice);
//    } else {
//    	$(e).parents('tr').children('td').eq(4).text(yj - sum);
//    }
//    
//    //开始计算最后的合计内容
//    hheji($("#param1").val(),$("#param2").val());
//    //2017/11/23新增
//    //为该input输入金额框下的隐藏input:payValue&Form赋值；——此处的费用类型，金额才是支付方式下需要提交的参数
//    var payValue = $(e).val();
//  //健壮性判断,防止前面步骤操作异常，订座费没有,导致向后台
//	if(payValue==null || payValue=='' || typeof(payValue)=='undefined') {
//		payValue = 0;
//	} 
//	 
//    if($(e).attr('sign')=='1'){//如果是报名费的支付方式的第一个input
//    	payValue = payValue - dprice;//还需要用报名费的第一个支付input的值减去订座费，才是需要提交给后台的报名费
//    }
//    
//    if(payValue!=0) {//输入框内必须有金额才可以提交
//    	var payForm = $(e).parent().parent().find("select :selected").val();
//    	$(e).parent().find("input.payValueForm").val(payForm+"="+payValue);//再赋值缴费方式
//    }
//}
//
////转报名-费用部分相关处理js-添加新的缴费方式(有可能一次付款使用多种方式付款)
//function addRowPay(e) {
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
//        + '     <input class="form-control zjsjflag" isat="1" onkeyup="sshj(this)" type="text" placeholder="0" >'
//        + '	    <input type="hidden" name="payList['+list1Index+'][payValue&Form]" class="payValueForm" value=""/>'
//        + ' </div>'
//        + '<div class="col-sm-3">'
//        + '  <i onclick="removeRowPay(this)" class="fa fa-minus-circle danger control-label"></i>'
//        + '</div>'
//        + '</div>');
//}
//function removeRowPay(e) {
//    $(e).parent().parent().remove();
//}
////转报名-费用部分相关计算-双击自动填充应缴费用金额
//function dbclick(e) {
//	//var dprice = $('#dingzuoI').val();
//	var dprice = $('#dPrice').val();
//	
//	var td = $(e).parents('tr').find('td').eq(1);//每行应缴部分td对象
//	td = td[0].id; 
//	if(td=='appendPayTd1'){//如果该td是报名费的td
//		var price = $(e).parents('tr').children('td').eq(1).text();//每行应缴部分金额
//		   if(dprice!=null){//如果订座费不为空
//			   $(e).parents('tr').children('td').eq(2).text(price);//报名费部分实缴金额
//			   $(e).val(price);//报名部分支付方式当前操作框金额-展示的时候还是按照全额展示，后台提交时再去掉报名费
//		   }else{
//			   //每行实缴金额
//			   $(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
//			   //每行支付方式当前操作框金额
//			   $(e).val($(e).parents('tr').children('td').eq(1).text());
//		   }
//	}else{//如果该td不属于报名费
//		//每行实缴部分金额
//		  $(e).parents('tr').children('td').eq(2).text($(e).parents('tr').children('td').eq(1).text());
//		  //每行当前操作金额框金额
//		  $(e).val($(e).parents('tr').children('td').eq(1).text());
//	}
//	 
//    sshj(e);
//}
//
///**
// * 优惠码校验-当输入的优惠码长度是8位时触发
// * @returns
// */
//function activtyCode(e) {
//    if (e.value.length == 8) {
//        $.ajax({
//            url: ctx + '/bizActivityCode/loadCode',
//            type: 'POST',
//            data: {
//                code: $(e).val(),
//                dept:$("#departmentId1Hidden").val()
//            },
//            dataType: 'json',
//            success: function (data) {
//                if (data.length != 0) {
//                    if (data[0].useStatus == "1") {
//                        toastr.error("该优惠码已经被使用");
//                    } else {
//                        toastr.success("该优惠码可以使用，优惠金额：" + data[0].amount);
//                        $('#yhqprice').text(data[0].amount);//优惠卷部分实缴金额
//                        hheji($("#param1").val(),$("#param2").val());//实时合计
//                    }
//                } else {
//                    toastr.error("优惠码不存在或该优惠码不属于产品归属分校");
//                  //发生错误后要将实缴金额制为空
//                	$('#yhqprice').text(0);//优惠卷部分实缴金额
//                    hheji($("#param1").val(),$("#param2").val());//实时合计
//                }
//            }
//        });
//    } else {
//        $('#yhqprice').text(0);
//    }
//}
