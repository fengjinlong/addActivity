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
        url: ctx + '/returnServicePoint/load',
        type: 'POST',
        dataType: 'json',
        data:{pageSize:500},
        success: function (data) {
        	data = data.returnObject.aaData;
        	var zx = "<option>请选择</option>"
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option  value=" + data[i].returnServicePointId + " >" + data[i].returnServicePointName + "</option>";
            }
            optionHtml = zxkc;
            $(".childId").html(zx + zxkc);
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
    	if($.trim($(this).text()) == '环节配置'){
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
        }else if($.trim($(this).text()) == '流程配置'){
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
	    $('#salesPromotionEdit input[name="returnServiceFlowName"]').val(record.returnServiceFlowName);
	    	$('#salesPromotionEdit select[name="productModelId"]').val(record.productModelId);
	    	$('#salesPromotionEdit input[name="returnServiceFlowId"]').val(record.returnServiceFlowId);
	    $('#salesPromotionEdit select[name="productModelId"]').selectpicker('val', record.productModelId);
	    
	    	 $.ajax({
	    	        url: ctx + '/returnServiceFlow/selectByPrimaryFlowId',
	    	        type: 'POST',
	    	        dataType: 'json',
	    	        data:{returnServiceFlowId:record.returnServiceFlowId},
	    	        success: function (data) {
	    	        		$('#salesPromotionEdit .editeDiv').remove();
	    	        		var data =  data.list;
	    	            var zxkc = "";
	    	            for (var i = 0; i < data.length; i++) {
		    	            	var str = '<div class="form-group col-sm-12  editeDiv">'
		    	     		   +' <label class="control-label col-sm-2 no-padding-right"></label>'
		    	     		   +' <div class="col-sm-8">'
		    	     		   +'  <select  value='+data[i].childId+'  class="form-control childId"  title="环节" >'
		    	     		   +'	<option value="">请选择<option>'
		    	     		   +optionHtml
		    	     		   +'   </select>'
		    	     		   +'</div>'
		    	     		   +'<i onclick="removeDiv(this)" class="fa fa-minus danger operate-btn" style="line-height:34px"></i>'
		    	     		   +'</div>'
			    	     	$('#salesPromotionEdit .modal-footer').before(str);
		    	            	$('#salesPromotionEdit .childId').last().val(data[i].childId);
		    	            	
	    	            }
	    	        },
	    	        error: function (response) {
	    	            toastr.error("系统错误5");
	    	        }
	    	 });

	    	$('.salesPromotionEdit').modal('show');
    });

    
   $.ajax({
        url: ctx + '/productModelController/selectAll',
        type: 'POST',
        dataType: 'json',
        data:{pageSize:50},
        success: function (data) {
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option  value='" + data[i].productModelId + "' >" + data[i].productModelName + "</option>";
            }
            $("#salesPromotionAdd select[name='productModelId']").html(zxkc);
            $("#salesPromotionAdd select[name='productModelId']").selectpicker('refresh');
            
            $("#salesPromotionEdit select[name='productModelId']").html(zxkc);
            $("#salesPromotionEdit select[name='productModelId']").selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误5");
        }
    });
});

function initPoint(){
    $.ajax({
        url: ctx + '/returnServicePoint/load',
        type: 'POST',
        dataType: 'json',
        data:{pageSize:500,enable:1},
        success: function (data) {
        	data = data.returnObject.aaData;
        	var zx = `<option value="">请选择</option>`
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option  value=" + data[i].returnServicePointId + " >" + data[i].returnServicePointName + "</option>";
            }
            optionHtml = zx + zxkc;
            $(".childId").html(optionHtml);
        },
        error: function (response) {
            toastr.error("系统错误5");
        }
    });
}

function removeDiv(e){
	$(e).parent().remove();
}


var optionHtml = '';

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
                "sAjaxSource": ctx + '/returnServicePoint/load',
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
                    {"mData": "returnServicePointName", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center","mRender": function (data, type, full) {
                    		if(data=='1'){
                    			return '<span style="width: inherit" class="btn btn-xs btn-use" onclick="enablePoint(\''+full['returnServicePointId']+'\',0,this)"><i class="fa fa-check-circle-o"></i> 启用</span>';
                    		}else{
                    			return '<span style="width: inherit" class="btn btn-xs btn-nouse" onclick="enablePoint(\''+full['returnServicePointId']+'\',1,this)"><i class="fa fa-ban"></i> 禁用</span>';
                    		}
                    		
                    }},
                    {"mData": "useTime", 'sClass': "text-center","mRender": function (data, type, full) {
                    	var s = '<a class="btn btn-info btn-xs data-btn" onclick="editDeptTable(\'' + inCode(full["returnServicePointName"])
                        + '\',\'' + full["enable"]
                    	+ '\',\'' + inCode(full["memo"])
                    	+ '\',\'' + full["returnServicePointId"]+'\')" data-toggle="modal" data-target=".dataPermission" data-backdrop="static">编辑查看</a>';
                    return s; 
                }}],
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
$('#deptCodeAdd').bootstrapValidator({
    message: 'This value is not valid',
    fields: {//表单验证
    },
    submitHandler: function (validator, form, submitButton) {
        var returnServicePointName = $('#deptCodeAdd input[name="returnServicePointName"]').val();
        var enable = $('#deptCodeAdd select[name="enable"]').val();
        var memo = $('#deptCodeAdd textarea[name="memo"]').val();
        if(returnServicePointName==''){
        	 toastr.error("名称不能为空");
        	 return;
        }
       
        $.ajax({
            url: ctx + '/returnServicePoint/addNewRecord',
            type: 'POST',
            data: {
                "returnServicePointName": returnServicePointName,
                "enable": enable,
                "memo": memo
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    $('.deptCodeAdd').modal('hide');
                    deptDataTable.init();
                }
                else
                    toastr.error(data.msg);
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        return false;
    }
});

function editDeptTable(returnServicePointName,enable,memo,returnServicePointId){
	$('#deptCodeUpdate input[name="returnServicePointName"]').val(outCode(returnServicePointName));
    $('#deptCodeUpdate select[name="enable"]').val(enable);
    $('#deptCodeUpdate textarea[name="memo"]').val(outCode(memo));
    $('#deptCodeUpdate input[name="returnServicePointId"]').val(returnServicePointId);
	$('.deptCodeUpdate').modal('show');
}
$('#deptCodeUpdate').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
    },
    submitHandler: function (validator, form, submitButton) {
    	var returnServicePointName = $('#deptCodeUpdate input[name="returnServicePointName"]').val();
    	var enable =   $('#deptCodeUpdate select[name="enable"]').val();
    	var memo =   $('#deptCodeUpdate textarea[name="memo"]').val();
    	var returnServicePointId =   $('#deptCodeUpdate input[name="returnServicePointId"]').val();
        $.ajax({
            url: ctx + '/returnServicePoint/updateRecord',
            type: 'POST',
            data: {
                "returnServicePointName": returnServicePointName,
                "enable": enable,
                "returnServicePointId": returnServicePointId,
                "memo":memo
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == "20001") {
                    $('.deptCodeUpdate').modal('hide');
                    deptDataTable.init();
                }
                else
                    toastr.error("成功");
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        return false;
    }
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
                "sAjaxSource": ctx + '/returnServiceFlow/load',
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
                    {"mData": "returnServiceFlowName", 'sClass': "text-center"},//标题
                    {"mData": "productModelName", 'sClass': "text-center"},
                    {"mData": "enable", 'sClass': "text-center",
                    	"mRender": function (data, type, full) {
                    		if(data=='1'){
                    			return '<span style="width: inherit" class="btn btn-xs btn-use" onclick="enableFlow(\''+full['returnServiceFlowId']+'\',0,this)"><i class="fa fa-check-circle-o"></i> 启用</span>';
                    		}else{
                    			return '<span style="width: inherit" class="btn btn-xs btn-nouse" onclick="enableFlow(\''+full['returnServiceFlowId']+'\',1,this)"><i class="fa fa-ban"></i> 禁用</span>';
                    		}
                        }},
                    {
                        "mData": "activityId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
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

$('#salesPromotionAdd .operate-btn').click(function(){
	var str = '<div class="form-group col-sm-12  childDiv">'
		   +' <label class="control-label col-sm-2 no-padding-right"></label>'
		   +' <div class="col-sm-8">'
		   +'  <select   class="form-control childId"  title="环节" >'
		   +optionHtml
		   +'   </select>'
		   +'</div>'
		   +'<i onclick="removeDiv(this)" class="fa fa-minus danger operate-btn" style="line-height:34px"></i>'
		   +'</div>'
	$('#salesPromotionAdd .modal-footer').before(str);
});

$('#salesPromotionEdit .operate-btn').click(function(){
	var str = '<div class="form-group col-sm-12  ">'
		   +' <label class="control-label col-sm-2 no-padding-right"></label>'
		   +' <div class="col-sm-8">'
		   +'  <select   class="form-control childId"  title="环节" >'
		   +optionHtml
		   +'   </select>'
		   +'</div>'
		   +'<i onclick="removeDiv(this)" class="fa fa-minus danger operate-btn" style="line-height:34px"></i>'
		   +'</div>'
	$('#salesPromotionEdit .modal-footer').before(str);
});

//编辑插入
$('#salesPromotionEdit').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
        var productModelId = $('#salesPromotionEdit select[name="productModelId"]').val();
        var returnServiceFlowId = $('#salesPromotionEdit input[name="returnServiceFlowId"]').val();
        var ids = '';
        $('#salesPromotionEdit .childId').each(function(){
        		ids = ids + $(this).val() + ',';
        });
        ids = ids.substring(0,ids.length-1);
        var returnServiceFlowName = $('#salesPromotionEdit input[name="returnServiceFlowName"]').val();
        $.ajax({
            url: ctx + '/returnServiceFlow/updateRecord',
            data: {
	            	returnServiceFlowName: returnServiceFlowName, 
	            	productModelId: productModelId, 
	            	ids:ids,
	            	returnServiceFlowId:returnServiceFlowId
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                $('.salesPromotionEdit').modal('hide');
                cxDataTable.init();
                if(data.status=="21001"){
                	 toastr.error("成功");
                }else{
                	 toastr.success("成功");
                }
            },
            error: function () {
                toastr.error("没有修改内容提交！");
            }
        });
    }
});

function enableFlow(id,enable,e){
	if($(e).attr('class') == 'btn btn-xs btn-use'){
		enable = 0
	}else{
		enable = 1;
	}
	 $.ajax({
         url: ctx + '/returnServiceFlow/updateRecordEnable',
         data: {
	            	enable:enable,
	            	returnServiceFlowId:id
         },
         dataType: 'json',
         type: 'POST',
         success: function (data) {
             if(data.status=="20001"){
         		toastr.success("修改成功");
         		if(enable == 1){
 					$(e).removeClass().addClass('btn btn-xs btn-use');
 					$(e).html('<i class="fa fa-check-circle-o"></i> 启用');
 				}else{
 					$(e).removeClass().addClass('btn btn-xs btn-nouse');
 					$(e).html('<i class="fa fa-ban"></i> 禁用');
 				}
         }else{
         	// toastr.success(data.msg);
         }
         },
         error: function () {
             toastr.error("没有修改内容提交！");
         }
     });
}
function enablePoint(id,enable,e){
		if($(e).attr('class') == 'btn btn-xs btn-use'){
			enable = 0
		}else{
			enable = 1;
		}
	 $.ajax({
        url: ctx + '/returnServicePoint/updateRecord',
        data: {
	            	enable:enable,
	            	returnServicePointId:id
        },
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            if(data.status=="20001"){
            		toastr.success("修改成功");
            		if(enable == 1){
    					$(e).removeClass().addClass('btn btn-xs btn-use');
    					$(e).html('<i class="fa fa-check-circle-o"></i> 启用')
    				}else{
    					$(e).removeClass().addClass('btn btn-xs btn-nouse');
    					$(e).html('<i class="fa fa-ban"></i> 禁用')
    				}
            }else{
            	// toastr.success(data.msg);
            }
        },
        error: function () {
            toastr.error("没有修改内容提交！");
        }
    });
}


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
    aoData.push({"name": "type", "value":$('#isMulti').val() });
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
            /*if(data.status == 'success' && flag == 1){
             $("#span"+val).removeClass("btn-nouse").addClass("btn-use");
             $("#span"+val).html('<i class="fa fa-check-circle-o"></i> 启用');
             }
             if(data.status == 'success' && flag == 0){
             $("#span"+val).removeClass("btn-use").addClass("btn-nouse");
             $("#span"+val).html('<i class="fa fa-ban"></i> 禁用');
             }*/
            cxDataTable.init();
        }
    });
}
//新增促销活动 表单重置
$('.sales-add').click(function(){
	  initPoint();
	  $('#salesPromotionAdd')[0].reset();
	  $('.discount').hide();
	  $('.limit1').hide();
	  $('.lowerLimit2').hide();
	  $('.epName').hide();
	  $('#salesPromotionAdd').find('.childDiv').remove();
	  $("select[name='productModelId']").trigger('chosen:updated');
	  
	  $("select[name='projectSelect']").find('option').remove();
	  
	  $("select[name='projectSelect']").selectpicker('refresh'); 
	  
      $('#salesPromotionAdd').data('bootstrapValidator').resetForm();
});
//新增促销活动
$('#salesPromotionAdd').bootstrapValidator({
	    submitHandler: function (validator, form, submitButton) {
	        var productModelId = $('#salesPromotionAdd select[name="productModelId"]').val();
	        var ids = '';
	        $('#salesPromotionAdd .childId').each(function(){
	        		ids = ids + $(this).val() + ',';
	        });
	        ids = ids.substring(0,ids.length-1);
	        var returnServiceFlowName = $('#salesPromotionAdd input[name="returnServiceFlowName"]').val();
	        if(returnServiceFlowName.trim()=='' || returnServiceFlowName == null){
	        		toastr.error("名称不能为空");
	        		return ;
	        }
	        if(productModelId == '' || productModelId == null){
	        		toastr.error("模型不能为空");
	        		return ;
	        }
	        
	        $.ajax({
	            url: ctx + '/returnServiceFlow/addNewRecord',
	            type: 'POST',
	            data: {
		            	returnServiceFlowName: returnServiceFlowName, 
		            	productModelId: productModelId, 
		            	ids:ids
	            },
	            dataType: 'json',
	            success: function (data) {
	                if (data.status == "success") {
	                    $('.salesPromotionAdd').modal('hide');
	                    cxDataTable.init();
	                }
	                else {
	                    toastr.error("成功");
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
        cxDataTable.init();
        deptDataTable.init();
    }
}
