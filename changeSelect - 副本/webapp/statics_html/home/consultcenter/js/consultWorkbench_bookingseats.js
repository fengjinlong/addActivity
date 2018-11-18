
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
    //高级搜索条件
    aoData.push({"name": "studentPhone", "value": $.trim($('#phoneCall4').val())});
    aoData.push({"name": "studentName", "value": $.trim($('#fullName4').val())});
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
  //课程信息级别-0,顶级;1,子产品课程信息 (只有报名状态时是查询所有，其它状态都是只查询第一个课程信息)
    aoData.push({"name": "pimLevel", "value":0});
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
    
    aoData.push({"name": "status", "value": 6});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal5").val()});
    
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
	 $('#secondDivCity').fadeOut();//如果之前有编辑所在地弹框没有关闭，此时关闭
   	var record = $(this).data('record');
    $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true});
    $('#updateInfoManage2').find(".comment_disabled").css('border-color', '#e5e5e5');//还原禁止编辑背景色

    //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
    $("#appendPayBody").html("");//清空缴费内容
    //清空课程信息
    $(".project").find("select").each(function(i,e){
    	$(e).val('');
    	$(e).trigger('chosen:updated');
    });
    publicJsonModel(record);
    
    //得到组合产品子产品id，后面回显时会用到
    var childProductId = record.childProductId;
     
    if(childProductId!=null&&childProductId!='') {
    	$("#childProductIdHidden").val(childProductId);
    }
    
    //根据productID，查询product信息获得productForm-产品类型
    $.ajax({
		url : ctx + '/consultConsoleWFC/getProductInfo',//查询当前咨询量关联产品的详细信息
		type : 'post',
		dataType : 'json',
		data : {productId: record.productId},
		success : function(data){
			 //产品(班型)信息回显
		   	$("#productId").html('<option showList="" value="">--请选择--</option>'+"<option showList='" +JSON.stringify(data)+ "' value='"+record.productId+"' selected>"+record.productName+"</option>");
		  //加载下拉框样式-必须有否则页面上该下拉框会出现一些bug
			$("#productId").trigger('chosen:updated');
			$("#productId").chosen({no_results_text: "没有匹配项", search_contains: true});
			$('.chosen-container').width('100%');
		   	//class=init,产品列表第一次初始化回显标志，防止初始化回显调用产品模型change时被清空,并且返回产品id用于其它下拉框的回显使用
		   	$("#productId").addClass("init");
		  //class=init,考期列表第一次初始化回显标志，只有第一次查看时考期的option需要做回显
		   	$("#kTime").addClass("init");
			//公共弹出框中课程信息回显（包括产品模型信息回显等)
		   	loadGT_YYD(record);
		}
    });
    
    //控制显示订座费信息
    $('.projectPayFees').show();//先展示缴费信息的div
	//但是除订座费后的其他费用详情需要隐藏
	$('#dztr').show();//订座费展示
	$("#appendPayTr").show();//显示下次缴费时间
	//隐藏除订座费后的其它费用类别
	$('#appendPayBody').find("tr").each(function(i,e){
		//隐藏除订座费后的其它费用类别
		if($(e).prop("id")==null || $(e).prop("id")!='dztr') {
			$(e).hide();
		}
	});
	//显示订座费支付方式和订座费金额
	$.ajax({
		url : ctx + '/consultBookingSeats/getDingZuoInfo',//查询当前咨询量关联产品的详细信息
		type : 'post',
		dataType : 'json',
		data : {productId: record.productId, infoManageId:record.infoManageId},
		success : function(data){
			if(data.status=="success") {
				//回显订座费
				$("#dingzuoI").val(data.data.payValue);
				//回显订座费-支付方式
				$("#dingzuoS").val(data.data.payForm);
				$("#dingzuoS").trigger("chosen:updated");
			}
			$('#dztr').find("select,input").each(function(i,e){
				$(e).prop("disabled",true);
			});
		}
	});
	
	//回显下次缴费时间
	$("#nextPayTime").val(record.nextPayTime);
})

/*********************************************************以上guo添加，一下deng添加*****************************************/
//弹出框右侧按钮列表——转为订座和转为报名
$('.apply-btn').click(function () {
    $('#buttonStatus2').val('');
    $('.bs-example-modal-lg1 .modal-content .modal-body').animate({'scrollTop': 0}, 800, 'swing');
    if ($(this).find('i').is('.fa-baoming')) {
    	if($(".projectPayFees").is(":hidden")){
    		$('.projectPayFees').show();//缴费信息展示
    		//如果有子产品，还需要展示子产品的div
    		$(".projectPayFees2").show();
    	    //转报名时隐藏订座费
    	    $('#dztr').hide();
    	    //展示其它费用类别
    	    $('#appendPayBody').find("tr").each(function(i,e){
    			//显示除订座费后的其它费用类别
    			if($(e).prop("id")==null || $(e).prop("id")!='dztr') {
    				$(e).show();
    			}
      		});
    	    //转报名时显示报名框
    	    $(".document").show();
    		return;
    	} else {
    		if($(".projectPayFees2").is(":hidden")) {
    			//如果子产品缴费模块还在隐藏，显示子产品缴费模块
    			$(".projectPayFees2").show();
    		}
    		//报名费和订座费不能同时显示
    		if($("#dztr").is(":visible")) {
    			//转报名时隐藏订座费
        	    $('#dztr').hide();
        	    //展示其它费用类别
        	    $('#appendPayBody').find("tr").each(function(i,e){
        			//显示除订座费后的其它费用类别
        			if($(e).prop("id")==null || $(e).prop("id")!='dztr') {
        				$(e).show();
        			}
          		});
    		}
//    		} else {
    			if (formValidator()) {
    	            $('#buttonStatus2').val('7');
    	            formUpdate.baoming();
    	        }
//    		}
	        
    	}
    }
    if ($(this).find('i').is('.fa-dingzuo')) {
    	if($("#dztr").is(":hidden")){
    		$('.projectPayFees').show();//先展示缴费信息的div
    		//但是除订座费后的其他费用详情需要隐藏
    		$('#dztr').show();//订座费展示
    		$("#appendPayTr").show();//显示下次缴费时间
    		$("#dingzuoI").prop("disabled",false);//订座费输入框取消无效状态
    		//隐藏除订座费后的其它费用类别
    		$('#appendPayBody').find("tr").each(function(i,e){
    			//隐藏除订座费后的其它费用类别
    			if($(e).prop("id")==null || $(e).prop("id")!='dztr') {
    				$(e).hide();
    			}
      		});
    		return;
    	} else {
    		if (formValidator()) {
    			$('#buttonStatus2').val('6');
    			formUpdate.dingzuo();
    		}
    	}
    }
//    //新增服务
//    if ($(this).find('i').is('.fa-addService')) {
//    	//调用新增服务费缴费信息，更新咨询量实际应缴，实缴，欠费
//    	submitServiceFun();
//    }
//    //新增服务
//    if ($(this).find('i').is('.fa-addProduct')) {
//    	if($(this).find('p').text()=="新增产品") {
//    		//生成课程信息div
//        	appendProjectFun();
//        	//更新按钮内容为取消产品
//        	$(this).find('p').text("取消产品");
//    	} else {
//    		//取消生成的课程信息div
//    		removeProjectFun();
//    		//更新按钮内容为新增产品
//        	$(this).find('p').text("新增产品");
//    	}
//    }
//    //购买产品
//    if ($(this).find('i').is('.fa-buyProduct')) {
//    	//提交购买的产品
//    	submitProjectFun();
//    }
});

//订座费-支付金额onkeyup事件
function dingzuoFees(obj) {
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;//验证金额
	var money = $(obj).val();//订座费
	if(reg.test(money)) {
		$("#dztd").text(money);
		
	} else {
		$("#dztd").text(0);
		toastr.error("请输入正确的金额格式！");
	}
	
}


