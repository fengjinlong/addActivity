//报名tab页查看功能
$('#table66').on('click', '.ck,.call-out', function () {
	 $('#secondDivCity').fadeOut();//如果之前有编辑所在地弹框没有关闭，此时关闭
	var record = $(this).data('record');
	//学员信息部分禁止修改
	$('#updateInfoManage2').find(".comment_disabled").attr({
		"disabled" : true
	});
	//课程信息部分禁止修改
	$(".project3").find("input,select").attr({
		"disabled" : true
	});
	$("#coursePayInfo").html("");//清空缴费内容  
	// 初始化页面隐藏域数据，生成订座费
	publicJsonModel(record);
	
	//	清除之前生成的产品标签
	$(".bs-example-modal-lga .project3").find("div.row").html('');
	//生成该学员（手机号下）所有已经报名的课程信息
	$.post(ctx + '/consultConsoleSignUp/getAllProOfStu',{"studentPhone":record.studentPhone},function(data){
		if(data.status=="success") {
			for(var i=0; i<data.data.length; i++) {
				var temp = '<h5 class="row-title" data-toggle="modal" data-target=".product-data" style="margin-left:20px;cursor:pointer" onclick="getProjectInfoCopy(this)">'
						 + '<i class="fa fa-tags blue"></i>'
						 + '<span data-record=\''+JSON.stringify(data.data[i])+'\'" >'+data.data[i].productName+'</span>'
//						 + '<span data-record=\''+JSON.stringify(data.data[i])+'\'" onclick="getProjectInfo(this)">'+data.data[i].productName+'</span>'
						 + '</h5>';
				$(".bs-example-modal-lga .project3").find("div.row").append(temp);
			}
		}
	},"json");
	
//	//产品(班型)信息回显
//   	$("#productId2").html("<option value='"+record.productId+"' selected>"+record.productName+"</option>");
// 	//加载下拉框样式-必须有否则页面上该下拉框会出现一些bug
//	$("#productId2").trigger('chosen:updated');
//	$("#productId2").chosen({no_results_text: "没有匹配项", search_contains: true});
//	$('.chosen-container').width('100%');
//   	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
//   	$("#productId2").addClass("init");
   	//公共弹出框中课程信息回显（包括产品模型信息回显等)
   	loadGT_YYD2(record);
   	
});

//点击产品名称标签，显示产品课程，缴费详情
function getProjectInfo(obj) {
	console.info("getProjectInfo执行");
	var record = $(obj).data('record');
	//学员信息部分禁止修改
	$('#updateInfoManage2').find(".comment_disabled").attr({
		"disabled" : true
	});
    $('#updateInfoManage2').find(".comment_disabled").css('border-color', '#e5e5e5');//还原禁止编辑背景色
	//课程信息部分禁止修改
	$(".project3").find("input,select").attr({
		"disabled" : true
	});
	$("#coursePayInfo").html("");//清空缴费内容  
	// 初始化页面隐藏域数据，生成订座费
	publicJsonModel(record);
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
}

function getProjectInfoCopy(obj) {
	var recordObj = $(obj).find("span");
	getProjectInfo(recordObj);
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
                	var str = full['nextPayTime'];
                	var str2 = "";
                	if(str!=null) {
                		 if (str.length > 19) {//如果大于10
      	           	  	   str2 = str.substring(0, 19);//截取前面19个，然后拼接上
      	           	  	  } else{
      	           	  		  str2 = str;
      	           	  	  }
                	}
                    return str2;
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
                //return eval(full['sPrice']) + eval(full['dPrice']==''?0:full['dPrice']);
                return eval(full['sPrice']);
            }},
            {
                "mDataProp": "sumPrice", 'sClass': "text-center", "mRender": function (data, type, full) {
                //return full['sumPrice'] - full['sPrice']- full['dPrice'];
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
    //高级搜索条件
    aoData.push({"name": "studentPhone", "value": $.trim($('#phoneCall5').val())});
    aoData.push({"name": "studentName", "value": $.trim($('#fullName5').val())});
    aoData.push({"name": "productId", "value": $('#product5').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus5').val()});
     
    aoData.push({
        "name": "beginTime",
//        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[0] + " 00:00:00"
        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[0]
    });
    aoData.push({
        "name": "endTime",
//        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[1] + " 23:59:59"
        "value": $("#reservation5").val().split("到") == '' ? "" : $("#reservation5").val().split("到")[1]
    });
    
    //并且只查询课程信息有效的
    aoData.push({"name": "enable", "value":1});
    
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
    var re = $("input[name^='mustPay']:checked").val();//欠费学员和未欠费学员是否选中
    if (!re == '') {//re==''查看全部（不管是否欠费)
        aoData.push({"name": "mustPay", "value": re});
        //更新页面欠费总计信息
        $.ajax({
            "type": "Post",
            "url": ctx + "/consultConsoleSignUp/ajaxLoadMustPaySum",
            "dataType": "json",
            "data": aoData,
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
        aoData.push({"name": "mustPay", "value": -1});//后台查询全部（不管是否欠费)
        //更新页面欠费总计信息
        $.ajax({
            "type": "Post",
            "url": ctx + "/consultConsoleSignUp/ajaxLoadMustPaySum",
            "dataType": "json",
            "data": aoData,
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
    }
    
  //得到页面显示记录数-(新版任务提醒)
    $.ajax({
    	"type": "Post",
    	"url": ctx + '/consultInfoManage/loadRemind',
    	"dataType": "json",
    	"data": aoData,
    	"success": function (data) {
			$("#taskRemind").html("");//清空任务提醒
			if(data.status=="success") {
				var str = "";
				for (var i = 0; i < data.data.length; i++) {
					if(data.data[i].status=="7") {
						str = '<li class="order-item">'
							+ '<a data-value=\''+JSON.stringify(data.data[i])+'\' href="javascript:void(0);" onclick="taskRemind(this)" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lga">'
							+ data.data[i].dataTime+" "+data.data[i].studentName+" "+"报名"
						    + '</a>'
							+ '</li>';
						$("#taskRemind").append(str);
					} else {
						str = '<li class="order-item">'
							+ '<a data-value=\''+JSON.stringify(data.data[i])+'\' href="javascript:void(0);" onclick="taskRemind(this)" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1">'
							+ data.data[i].dataTime+" "+data.data[i].studentName+" ";
						if(data.data[i].status=="3") {
							str += '已沟通';
						} else if(data.data[i].status=="4") {
							str += '转预约';
						} else if(data.data[i].status=="5") {
							str += '上门';
						} else if(data.data[i].status=="6") {
							str += '订座';
						} 
						str += '</a>'
							+ '</li>';
//						str = '<li class="order-item">'
//							+ '<a data-value=\''+JSON.stringify(data.data[i])+'\' href="javascript:void(0);" onclick="taskRemind(this)" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1">任务提醒'+(i+1)+'</a>'
//							+ '</li>'
						$("#taskRemind").append(str);
					}
	    		}
			}
			
    	}
    });
    
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
//    var examTimeId = $("#examTimeId").val();//产品考期ID
    var productId = $("#productIdHidden").val();//产品id
    $.ajax({
        type: "post",
        url: ctx + "/consultConsoleSignUp/ajaxBeforePay",
        dataType: "json",
        data: {"infoManageId": id, "productId":productId },
        success: function (data) {
            if(data.status=="success") {
            	for(var i=0; i<data.list.length; i++) {
            		$("#payInfo").prepend('<div class="clear_both position_rel">'
                            + '<h5 class="xian hide_content"><i class="fa fa-angle-down"></i>'+data.list[i].payName+' 欠费合计:<span style="color: red;" id="pxfp">'+data.list[i].cfValue+'</span></h5>'
                            + '<div class="pull-right">'
                            + '   <input type="hidden" name="payList['+i+'][payCode]" value="'+data.list[i].payCode+'"/>'//用来存储费用编码-payFees表
                            + '   <input type="hidden" name="payList['+i+'][payCodeId]" value="'+data.list[i].payCodeId+'"/>'//用来存储费用编码id-payFees表
                            + '   <input type="hidden" name="payList['+i+'][payName]" value="'+data.list[i].payName+'"/>'//用来存储费用名称-payFees表
                            + '	  <input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
                            + '	  <input type="hidden" name="payCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
                            + '	  <input type="hidden" name="payCompList['+i+'].payCodeId" value="'+data.list[i].payCodeId+'"/>'//用来存储费用编码-comp表
                            + '	  <input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].payCode+'"/>'//用来存储费用编码id-comp表
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
                            + '    <a href="javascript:void(0);" style="margin-top:10px" class="btn btn-info btn-xs add_row" onclick="addRow(this)" data-index="'+i+'"><i'
                            + '            class="fa fa-plus-circle"></i></a>'
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
    if (val == "") {//非空
        return 0;
    } else if(val) {//非空
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

//日期初始化
$("#appendNextPayTime").datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    autoclose: true,
    minView: 2
})

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
    
    var projectInfoManageId = $("#projectInfoManageId").val();
    
    //初始化payCamp表相关input信息
//    $("#payInfo").find("div.payValue").each(function(index, obj){
//    	var payValue = $(obj).val();
//    	sPrice = Number(sPrice)+Number(payValue);//循环遍历补费表单下所有输入的金额的和
//    });
    
    var options = $("#payInfo").serialize();//得到payCode,payForm,payValue信息
    options += "&infoManageId="+infoManageId+"&sPrice="+sPrice+"&nextPayTime="
    +appendNextPayTime+"&nextPayNum="+nextPayNum+"&productId="+productId+"&projectInfoManageId="+projectInfoManageId;
	  
//    console.log(options)
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

//报名状态继续添加产品-初始化数据
//function initAddWin() {
//	//解决创建咨询量弹框被报名弹框遮盖的问题
//	$('.addInquiries').css({  
//        "z-index": 1060  
//    });
//    $('.addInquiries').toggle();
//    $('#inquiries').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
//    $('#addprovince').val('');
//    $('#addcity').val('');
//    //富文本编辑器-对话记录清空
//    conversation.html('');
//    //更新下拉框选择
//    $('.chosen-select').trigger('chosen:updated');
//    //新增页面下拉框初始化
//    addinit();
//    //清除bootstrapValidator的校验结果
//    $('#inquiries').data('bootstrapValidator').resetForm();
//}
//表名状态-添加服务费-表单验证
$('#addServiceFees').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var cfhj = $("#cfhj").text();//得到欠费金额
        if(Number(cfhj)==0) {
        } else {
        	//如果有欠费，需要填写下次缴费时间
        	var nextPayTime = $("#nextPayTime2").val();
        	if(nextPayTime==null || nextPayTime=='') {
        		toastr.error("下次缴费时间没有填写");
        		return;
        	}
        }
        
        //遍历缴费内容下，支付金额为0的缴费项，将其缴费方式，缴费金额设置为disabled，禁止提交
        $("#coursePayInfo").find("tr").find("input.payValueForm").each(function(i,e){
        	var flag = $(e).prop("disabled");
        	//找到没有禁止提交的支付方式和金额的input项，判断是否有值
        	if(!flag) {
        		var money = $(e).val();
        		if(money==null || money=='') {
        			//如果支付方式和金额为空，就禁止提交该项
        			$(e).prop("disabled",true);
        		}
        	}
        });
        var options = form.serialize();
        
        var productId = $("#productId2").val();
        var infoManageId = $("#infoManageId2").val();
        var kTime = $("#kTime2").val();
        
        options += "&productId="+productId+"&infoManageId="+infoManageId+"&kTime="+kTime
        	+"&nextPayNum="+0;
        
	    $.ajax({
	      type: "POST",
	     // url: ctx + '/consultBookingSeats/addPayRecord',
	      url: ctx + '/consultConsoleSignUp/submitService',
	      data: options,
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	        	  init6();
	              $('.product-data').modal('hide');
	              toastr.success("添加服务费成功");
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
