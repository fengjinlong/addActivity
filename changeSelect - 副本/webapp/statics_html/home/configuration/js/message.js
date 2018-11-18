$(function () {
	$('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })
    
    $('.salesPromotionAdd').on('hidden.bs.modal', function () {
        $('#salesPromotionAdd')[0].reset();
        $('#salesPromotionAdd input:hidden').val('');
        $('#salesPromotionAdd .selectpicker').selectpicker('refresh');
        $('#salesPromotionAdd').data('bootstrapValidator').resetForm();
    })
    
    $.ajax({
        url: ctx + '/duty/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	data = data.list;
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option  value=" + data[i].dutyId + " >" + data[i].fullName + "</option>";
            }
            $("select[name='dutySelect']").html(zxkc);
            $("select[name='dutySelect']").selectpicker('refresh'); 
        },
        error: function (response) {
            toastr.error("系统错误5");
        }
    });
	
    $("select[name='dutySelect']").change(function(){
		var epId = $(this).val();
		var ids = "";
		if(epId!=null){
			$.each(epId,function(index,value){
				ids += value+",";
			});
		}
		ids = ids.substring(0,ids.length-1);
		$('input[name="dutys"]').val(ids);	
    });
    
        //优惠码和促销活动切换
    $('#myTab li').click(function(){
    	if($.trim($(this).text()) == '信息参数'){
    		if(!$("#cuXiao tbody").hasClass('loadOver')){
    			//促销活动数据初始化
    			$("#cuXiao tbody").html("<tr><td height='300' colspan='9' class='text-center'></td></tr>");
    			$("#cuXiao tbody>tr>td").mLoading({
    				text: '正在加载中，请稍后......',
    				 icon: "../statics_html/common/image/loading5.gif"
    			});
    			deptDataTable.init();
    			$("#cuXiao tbody").addClass('loadOver');
    		}else{
    			$("#cuXiao").mLoading({
    			    text: '正在加载中，请稍后......',
    				icon: "../statics_html/common/image/loading5.gif"
    			 });
    			$('#cuXiao .mloading-mask').css({
    				'top':'42px',
    				'background-color':'rgba(233, 233, 232, 0.5)'
    			 });
    			deptDataTable.init();
    			$("#cuXiao").mLoading('hide');
    		}
        }else if($.trim($(this).text()) == '短信模板'){
        	$("#deptCode").mLoading({
			    text: '正在加载中，请稍后......',
				icon: "../statics_html/common/image/loading5.gif"
			 });
			$('#deptCode .mloading-mask').css({
				'top':'42px',
				'background-color':'rgba(233, 233, 232, 0.5)'
			 });
			cxDataTable.init();
			$("#deptCode").mLoading('hide');
        }
    })
    
    
    //新增促销活动类型切换
    $('#deptTabCode').on('click', '.produce', function () {
	  	$('#promoCodeAdd')[0].reset();
	    $('#promoCodeAdd').data('bootstrapValidator').resetForm();
    	var record = $(this).data('record');
    	$('#activityInitId').val(record.activityInitId);
    	$('#dept').val(record.dept);
    	$('.mainAmount').val(record.initAmount+record.useAmount);
    	$('.useAmount').val(record.initAmount);
    	$('.bgTime').val(jsDateFormat(record.beginTime));
    	$('.edTime').val(jsDateFormat(record.endTime));
    	$('.promoCodeAdd').modal('show');
    });
    
    $('#cuXiao').on('click', '.updateForm', function () {
	  	$('#salesPromotionEdit')[0].reset();
	    $('#salesPromotionEdit').data('bootstrapValidator').resetForm();
	    var record = outCode($(this).data('record'));
	    record = JSON.parse(record);
	    $('#salesPromotionEdit input[name="messageId"]').val(record.messageId);
	    	$('#salesPromotionEdit select[name="messageType"]').val(record.messageType);
	    	$('#salesPromotionEdit select[name="code"]').val(record.code);
	    	$('#salesPromotionEdit input[name="messageName"]').val(record.messageName);
	    	$('#salesPromotionEdit input[name="dutys"]').val(record.dutys);
	    	$('#salesPromotionEdit textarea[name="messageContent"]').val(record.messageContent);
	    	
	    	
	    	/**
	    	 * 加载可用类型loadAllConf
	    	 */
	    	loadAllConf();
	    	
	    	if(record.dutys != null){
    	 		var list = record.dutys.split(',');
       	    var ids = new Array();
       	    $.each(list, function (i) {
       	    		ids.push(list[i]);
       	    });
       	    $("#salesPromotionEdit select[name='dutySelect']").selectpicker('val', ids);
	    	}
   	    $("#salesPromotionEdit select[name='dutySelect']").selectpicker('refresh');
	    	$('.salesPromotionEdit').modal('show');
    });
});


function editDeptTable(messageConfName,messageLable,messageConfId,code){
	$('#deptCodeUpdate .btn-primary').removeAttr('disabled');
	$('#messageConfId').val(messageConfId);
	$('#messageConfName').val(messageConfName);
	$('#messageLable').val(messageLable);
	$('#code').val(outCode(code))
	$('.deptCodeUpdate').modal('show');
}
//优惠码查询
var deptDataTable = function () {
    return {
        init: function () {
            var deptTabCode = $('#deptTabCode').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                "sAjaxSource": ctx + '/bizMessageConf/load',
                "fnServerData": retrieveDataInit,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {"mData": "messageConfName", 'sClass': "text-center"},
                    {"mData": "messageLable", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center","mRender": function (data, type, full) {
                    	if(data=='1'){
                			return '<span class="btn btn-xs btn-use" style="width: inherit" onclick="enableMessageConf(\''+full['messageConfId']+'\',0)"><i class="fa fa-check-circle-o"></i> 启用</span>';
                		}else{
                			return '<span class="btn btn-xs btn-nouse" style="width: inherit" onclick="enableMessageConf(\''+full['messageConfId']+'\',1)"><i class="fa fa-ban"></i> 禁用</span>';
                		}
                    }}
                    ,
                    {"mData": "useTime", 'sClass': "text-center","mRender": function (data, type, full) {
                    	var s = '<a class="btn btn-info btn-xs data-btn" onclick="editDeptTable(\'' + full["messageConfName"]
                        + '\',\'' + full["messageLable"]
                    	+ '\',\'' + full["messageConfId"]
                    	+ '\',\'' + inCode(full["code"])+'\')" data-toggle="modal" data-target=".dataPermission" data-backdrop="static">编辑查看</a>';
                    return s; 
                }}
            ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }]
            });
        }
    }
}();



//优惠码数据初始化
$("#deptTabCode tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#deptTabCode tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
deptDataTable.init();
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
    var status = $('#status').val();
    if (status && status.length != 0) {
        aoData.push({"name": "useStatus", "value": status});
    }
    aoData.push({"name": "searchVal", "value": $('#searchValCode').val()});

    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
        }
    });
}

function retrieveDataInit(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchValDept').val();

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
        }
    });
}
//新增优惠码 表单重置
$('.promocode-add').click(function(){
	  $('#promoCodeAdd')[0].reset();
      $('#promoCodeAdd').data('bootstrapValidator').resetForm();
});
//新增优惠额度 表单重置
$('.deptCode-add').click(function(){
	  $('#deptCodeAdd')[0].reset();
      $('#deptCodeAdd').data('bootstrapValidator').resetForm();
});

//查询促销活动
var cxDataTable = function () {
    return {
        init: function () {
            var cxTable = $('#cuXiao').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                "sAjaxSource": ctx + '/bizMessage/load',
                "fnServerData": retrieveDataCx,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {"mData": "messageName", 'sClass': "text-center"},//标题
                    {
                        "mData": "messageType",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            if (data == 1) {
                                return '身份验证';
                            } 
                            if (data == 2) {
                                return '销售咨询';
                            }
                            if (data == 3) {
                                return '教务通知';
                            }
                        }
                    },//状态
                    {"mData": "messageContent", 'sClass': "text-center","mRender": function (data, type, full) {
                    	
                    	return '<p style="width: 400px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" title="'+data+'">'+data+'</p>';
                    }},
                    {"mData": "enable", 'sClass': "text-center",
                    	"mRender": function (data, type, full) {
                    		if(data=='1'){
                    			return '<span class="btn btn-xs btn-use" style="width: inherit" onclick="enableMessage(\''+full['messageId']+'\',0)"><i class="fa fa-check-circle-o"></i> 启用</span>';
                    		}else{
                    			return '<span class="btn btn-xs btn-nouse" style="width: inherit" onclick="enableMessage(\''+full['messageId']+'\',1)"><i class="fa fa-ban"></i> 禁用</span>';
                    		}
                        }},
                    {
                        "mData": "activityId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
//                            var u = '<a  class="edit" data-toggle="modal" data-target=".salesPromotionView" data-backdrop="static"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
                            var d = '<a data-record=\'' + inCode(JSON.stringify(full)) + '\' class="edit updateForm" ><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            return  d;
                        }
                    }//操作
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {},
            });
        }
    }
}();
function enableMessageConf(id,enable){
	 $.ajax({
       url: ctx + '/bizMessageConf/updateRecord',
       data: {
	            	enable:enable,
	            	messageConfId:id
       },
       dataType: 'json',
       type: 'POST',
       success: function (data) {
           if(data.status=="10001"){
           	 toastr.error("操作失败");
           }else{
        	   deptDataTable.init();
           	 toastr.success("操作成功");
           }
       },
       error: function () {
           toastr.error("没有修改内容提交！");
       }
   });
}
function enableMessage(id,enable){
	 $.ajax({
        url: ctx + '/bizMessage/updateRecord',
        data: {
	            	enable:enable,
	            	messageId:id
        },
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            if(data.status=="10001"){
            	 toastr.error('操作失败');
            }else{
           	 	cxDataTable.init();
            	 toastr.success('操作成功');
            }
        },
        error: function () {
            toastr.error("没有修改内容提交！");
        }
    });
}

//编辑短信类型
function updateConf(){
	 var messageConfId = $('#deptCodeUpdate input[name="messageConfId"]').val();
     var messageConfName = $('#deptCodeUpdate input[name="messageConfName"]').val();
     var code = $('#deptCodeUpdate textarea[name="code"]').val();
     $.ajax({
         url: ctx + '/bizMessageConf/updateRecord',
         data: {
        	 	 messageConfId:messageConfId,
	        	 messageConfName:messageConfName,
	        	 code:code
         },
         dataType: 'json',
         type: 'POST',
         success: function (data) {
             if(data.status=="10001"){
             	 toastr.error('操作失败');
             }else{
            	 	 deptDataTable.init();
            	 	 $('.deptCodeUpdate').modal('hide');
             	 toastr.success('操作成功');
             }
         },
         error: function () {
             toastr.error("没有修改内容提交！");
         }
     });
}
//编辑插入
$('#salesPromotionEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var messageId = $('#salesPromotionEdit input[name="messageId"]').val();
        var dutys = $('#salesPromotionEdit input[name="dutys"]').val();
        var messageContent = $('#salesPromotionEdit textarea[name="messageContent"]').val();
        var messageType = $('#salesPromotionEdit select[name="messageType"]').val();
        var messageName = $('#salesPromotionEdit input[name="messageName"]').val();
        var code = $('#salesPromotionEdit select[name="code"]').val();
        $.ajax({
            url: ctx + '/bizMessage/updateRecord',
            data: {
            	messageId: messageId,
            	dutys: dutys, 
            	messageContent: messageContent,
            	messageType:messageType,
            	messageName:messageName,
            	code:code
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                $('.salesPromotionEdit').modal('hide');
                cxDataTable.init();
                if(data.status=="21001"){
                	 toastr.error('编辑失败');
                }else{
                	 toastr.success('编辑成功');
                }
            },
            error: function () {
                toastr.error("没有修改内容提交！");
            }
        });
    }
});
function retrieveDataCx(sSource, aoData, fnCallback, oSettings) {
    var beganAndEnd = $("#duration1").val();
    if (beganAndEnd && beganAndEnd.length != 0) {
        var minDate = trim(beganAndEnd.split(" - ")[0]);
        var maxDate = trim(beganAndEnd.split(" - ")[1]);
        aoData.push({"name": "beginTime", "value": minDate});
        aoData.push({"name": "endTime", "value": maxDate});
    }
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "enable", "value":$('#status').val() });
    aoData.push({"name": "messageType", "value":$('#messageTypeSearch').val() });
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

}
//修改状态
function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/bizActivity/updateRecord',
        type: 'POST',
        data: {
            activityId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            cxDataTable.init();
        }
    });
}
//新增促销活动 表单重置
$('.sales-add').click(function(){
	  $('#salesPromotionAdd')[0].reset();
	  $('.discount').hide();
	  $('.limit1').hide();
	  $('.lowerLimit2').hide();
	  $('.epName').hide();
	  loadAllConf();
	  $("select[name='productModelId']").trigger('chosen:updated');
	  
	  $("select[name='projectSelect']").find('option').remove();
	  
	  $("select[name='projectSelect']").selectpicker('refresh'); 
	  
      $('#salesPromotionAdd').data('bootstrapValidator').resetForm();
});
//新增促销活动
$('#salesPromotionAdd').bootstrapValidator({
	    submitHandler: function (validator, form, submitButton) {
	        var messageType = $('#salesPromotionAdd select[name="messageType"]').val();
	        var messageContent = $('#salesPromotionAdd textarea[name="messageContent"]').val();
	        var messageName = $('#salesPromotionAdd input[name="messageName"]').val();
	        var dutys = $('#salesPromotionAdd input[name="dutys"]').val();
	        var code = $('#salesPromotionAdd select[name="code"]').val();
	        $.ajax({
	            url: ctx + '/bizMessage/addNewRecord',
	            type: 'POST',
	            data: {
		            	messageType: messageType, 
		            	messageContent: messageContent, 
		            	messageName: messageName,
		            	dutys:dutys,
		            	code:code
	            },
	            dataType: 'json',
	            success: function (data) {
	                if (data.status == "success") {
	                    $('.salesPromotionAdd').modal('hide');
	                    cxDataTable.init();
	                }
	                else {
	                    toastr.error('新增失败');
	                }
	            },
	            error: function (response) {
	                toastr.error("系统错误");
	            }
	        });
	    }
});

//回车搜索
function search() {
    if (event.keyCode == 13) {
    	deptDataTable.init();
        cxDataTable.init();
    }
}

function loadAllConf(){
	$.ajax({
        url: ctx + '/bizMessageConf/load',
        type: 'POST',
        data: {
	        	pageNum: 1, 
	        	pageSize: 100,
	        	enable:1
        },
        dataType: 'json',
        success: function (data) {
        		$('.confSpace').html('');
        		$('.confSpaceAdd').html('');
        		data = data.returnObject.aaData;
        		for(var i=0;i<data.length;i++){
        			$('.confSpace').append('<span ondblclick="insertAtCaret(this)" messageLable="'+data[i].messageLable+'" class="btn btn-azure paging-button">'+data[i].messageConfName+'</span>&nbsp;');
        			$('.confSpaceAdd').append('<span ondblclick="insertAtCaretAdd(this)" messageLable="'+data[i].messageLable+'" class="btn btn-azure paging-button">'+data[i].messageConfName+'</span>&nbsp;');
        		}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

function insertAtCaret(e){
	$('#salesPromotionEdit textarea[name="messageContent"]').insertAtCaret($(e).attr("messageLable"));
}
function insertAtCaretAdd(e){
	$('#salesPromotionAdd textarea[name="messageContent"]').insertAtCaret($(e).attr("messageLable"));
}

(function ($) {
    $.fn.extend({
        insertAtCaret : function (myValue) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else
                if ($t.selectionStart || $t.selectionStart == '0') {
                    var startPos = $t.selectionStart;
                    var endPos = $t.selectionEnd;
                    var scrollTop = $t.scrollTop;
                    $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                    this.focus();
                    $t.selectionStart = startPos + myValue.length;
                    $t.selectionEnd = startPos + myValue.length;
                    $t.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
        }
    })
    
    
    $('#salesPromotionEdit textarea[name="messageContent"]').bind("mouseleave", function () {
    		$('#salesPromotionEdit textarea[name="messageContent"]').blur();
    });
    
    $('#salesPromotionAdd textarea[name="messageContent"]').bind("mouseleave", function () {
		$('#salesPromotionAdd textarea[name="messageContent"]').blur();
    });

    
})(jQuery);
