// 预约 tab处理
/**
 * 初始预约单
 * @returns
 */
function init3() {
    var init = $('#table33').dataTable({
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
        "sAjaxSource": ctx + '/consultConsoleRL/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData3,
        "aoColumns": [
            {
                "mDataProp": "infoManageId","bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                return "<label> <input id=" + data + " type='checkbox' class='slaver3'> <span class='text'></span> </label>";
            }
            },
            {"mDataProp": "serverId","bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "serverDate", 'sClass': "text-center","mRender": function (data, type, full) {
            	if(full["serverDate"]==null || full["serverDate"]=="") {
        			return "";
        		}
                var timestamp = new Date(full["serverDate"]);
                return timestamp.toLocaleString();
        }},
            {"mDataProp": "schoolName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "departmentName1", "bSortable": false, 'sClass': "text-center"},
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
            /*{"mDataProp": "classAttr", "bSortable": false, 'sClass': "text-center"},*/
            {"mDataProp": "classPrice", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "counselor", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "reciveName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "", "bSortable": false, 'sClass': "text-center", "mRender": function (data, type, full) {
                var u1 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="call-out" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" title="呼出"></i></a></a>'
                var u2 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
                var u3 = '<a href="#" data-record=\'' + JSON.stringify(full) + '\' class="ck" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i></a>'
                var a = '<a href="#" data-record=\'' + JSON.stringify(full) + '\'  class="yywsm" data-backdrop="static" data-toggle="modal" data-target=".bs-example-modal-lgyywsm" ><i class="return primary" data-toggle="tooltip" data-placement="top" title="预约未上门">未</i></a>';
                return u1 + u2 + u3 + a;
            }
            }],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table33_wrapper").removeClass();
    $('#table33_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#table33_wrapper .dataTables_info').parent().append($('#table33_wrapper .dataTables_length'));
    HScrollBar('#table33_wrapper');
}

init3();

/**
 * 回调函数预约单
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData3(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    //高级搜索条件
    aoData.push({"name": "studentPhone", "value": $.trim($('#phoneCall2').val())});
    aoData.push({"name": "studentName", "value": $.trim($('#fullName2').val())});
    aoData.push({"name": "productId", "value": $('#product2').val()});
    aoData.push({"name": "departmentId1", "value": $('#campus2').val()});
    aoData.push({
        "name": "beginTime",
        "value": $("#reservation2").val().split("到") == '' ? "" : $("#reservation2").val().split("到")[0] + " 00:00:00"
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation2").val().split("到") == '' ? "" : $("#reservation2").val().split("到")[1] + " 23:59:59"
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

    aoData.push({"name": "status", "value": 4});
    aoData.push({"name": "typeFrom", "value": infoDisType});
    aoData.push({"name": "departmentId2", "value": infoDisDep});
    aoData.push({"name": "searchVal", "value": $("#searchVal3").val()});
//     
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
            $('span[id=spanYYD]').text(resp.returnObject.iTotalRecords);
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
/**
 * 预约单操作
 */
$('#table33').on('click', '.ck,.call-out', function() {
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
//预约未上门-单击事件
$('#table33').on('click', '.yywsm', function () {
        var record = $(this).data('record');
        $('#yywsmInfoId').val(record.infoManageId);//咨询量id
        $('#yywsmProductId').val(record.productId);//主产品id
        $('#yywsmChildProId').val(record.childProductId);//子产品id
})

/**
 * 信息从预约状态回退到已沟通
 * @param val
 * @returns
 */
function toYGT() {
	formUpdate.backYGT();
}

/**
 * 分配接待人
 * @returns
 */
function toChooseAr() {
    var idAr = "";//用于存储选中的咨询量
    $('.slaver3').each(function () {//拼接CheckBox选中的咨询量的id
        if (this.checked) {
            idAr = idAr + this.id + ",";
        }
    })
    idAr = idAr.substring(0, idAr.length - 1);
    var counselor = $('#statusFP').find("option:selected").text();
    var counselorId = $('#statusFP').val();
    if (counselorId == '0') {
        toastr.error('当前咨询师无效');
        return;
    }
    if (idAr == '') {
        toastr.error('当前无信息被选中');
        return;
    }
    $.ajax({
        "type": "Post",
        "url": ctx + "/consultConsole/toChooseAr",
        "dataType": "json",
        "data": {
            ar: idAr,
            reviceName: counselor,
            reviceId: counselorId
        },
        "success": function (data) {
            if (data == "success") {
                toastr.success('分配完成');
                $('#statusFP').val(0);
                init3();
            }
        }
    });
}
