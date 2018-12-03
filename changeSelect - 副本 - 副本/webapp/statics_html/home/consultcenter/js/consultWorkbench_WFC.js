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

//监听页面回车事件-回车搜索
$(document).keyup(function (e) {//捕获文档对象的按键弹起事件  
	 
    if (e.keyCode == 13) {//按键信息对象以参数的形式传递进来了
    	var currentStatus = $("#currentStatus").val();//得到当前tab页，处于什么状态
        //此处编写用户敲回车后的代码
    	if (currentStatus == "2") {
            init();
        } else if (currentStatus == "3") {
            init2();
        } else if (currentStatus == "4") {
            init3();
        } else if (currentStatus == "5") {
            init4();
        } else if (currentStatus == "6") {
            init5();
        } else if (currentStatus == "7") {
            init6();
        }
    }  
});  

function sumCount() {

}

/*数据初始化*/
    loadingTable('#table11',8);
	//init();
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

//init();

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
    aoData.push({"name": "productId", "value": $('#product0').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus').val()});
    
    //课程信息级别-0,顶级;1,子产品课程信息 (只有报名状态时是查询所有，其它状态都是只查询第一个课程信息)
    aoData.push({"name": "pimLevel", "value":0});
    //并且只查询课程信息有效的
    aoData.push({"name": "enable", "value":1});

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
	var record = $(obj).data('value');
	var status = record.status;
	 
	//报名和其它状态不同，弹窗不同，调用的方法也不同
	if(status=='7') {//报名数据
		$("#tab_66").trigger("click");//回显弹框标题
		 
		$('#updateInfoManage2').find(".comment_disabled").attr({
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
	} else {//其它状态数据
		if(status=='2') {
			$("#tab_11").trigger("click");//回显弹框标题
		} else if(status=='3') {
			$("#tab_22").trigger("click");//回显弹框标题
		} else if(status=='4') {
			$("#tab_33").trigger("click");//回显弹框标题
		} else if(status=='5') {
			$("#tab_44").trigger("click");//回显弹框标题
		} else if(status=='6') {
			$("#tab_55").trigger("click");//回显弹框标题
		}
		
	    $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true})
	    //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
	    $("#appendPayBody").html("");//清空缴费内容
	    $("#dingzuoI").val(null);//将订座费缴费栏清空
	    
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
	}
}

/**
 * 待沟通操作
 */
$('#table11').on('click', '.ck,.call-out', function () {
	$('#secondDivCity').fadeOut();//如果之前有编辑所在地弹框没有关闭，此时关闭
	
    var record = $(this).data('record');
    $('#updateInfoManage2').find(".comment_disabled").attr({"disabled": true});
    $('#updateInfoManage2').find(".comment_disabled").css('border-color', '#e5e5e5');//还原禁止编辑背景色
    //$("#updateInfoManage2").data('bootstrapValidator').resetForm(true);
    $("#appendPayBody").html("");//清空缴费内容
    $("#dingzuoI").val(null);//将订座费缴费栏清空
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
})


/**
 * 添加回访信息
 * @returns
 */
function addRecord() {
	formUpdate.addRecord();
}

