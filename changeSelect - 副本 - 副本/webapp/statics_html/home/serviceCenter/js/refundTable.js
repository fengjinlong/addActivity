$(function () {

// 退费申请增加删除
$('.return-apply').on("click",".add-btn",function(){
    var trHtml = `
        <tr class="new-tr">
            <th scope="row">
            <input type="hidden" class="form-issue" name="returnId" value="${_returnsId}"/>
                <input type="text" class="form-control comment_disabled form-issue" name="applyMoney">
            </th>
            <td>
                <div class="input-group">
                    <input class="form-control date-picker form_datetime form-issue" type="text" name="applyDate" readonly>
                    <span class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </span>
                </div> 
            </td>
            <td>
                <textarea class="form-control form-issue" name="remark" rows="2"></textarea>
            </td>
            <td>
                <i class="fa fa-minus-circle cancel-btn"></i>
            </td>
        </tr>
    `

    $('.return-apply').append(trHtml);

    validateInputNum('input[name="applyMoney"]');
    // 如果没有特批则进行计算是否超过总值
    applyMoneyValide();
    $('.cancel-btn').click(function(){
        $(this).parent().parent().remove();
    })
    $(".form_datetime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView:2
    });
})
 
validateInputNum('input[name="applyMoney"]');
parentChild('.duty-table-win');
transSelect();

function parentChild(parent){
	
    // 父节点
    var index;
    $(parent).find('table .parentNode').on('click', '.operate-btn', function () {
    	if ($('.zerenren tbody tr').length < 1) {
    		index = 1;
    	} else {
    		index = $('.zerenren tbody tr').length;
    	}
        index++;
        var trHtml = `
	            <tr parent-tr="${'parent-'+index }" class="newDuty">
	            <td scope="row" rowspan="1" class="rows">
	                <div>
	                    <select class="form-control chosen-select" name="dutyDepartmentId">
	                    </select>
	                </div>
	            </td>
	            <td rowspan="1" class="rows">
	                <select class="form-control chosen-select" name="isWithdraw">
        				<option>--请选择--</option>
	                    <option value="1">是</option>
	                    <option value="0">否</option>
	                </select>
	            </td>
	            <td>
	            <div class="zeren">
	                <div class="row col-lg-12 col-md-12 col-sm-12">
	                	<input type="hidden" name="dutyDepartmentId" class="form-require"/>
                        <input type="hidden" name="isWithdraw" class="form-require"/>
	                	<div class="col-lg-10 col-md-10 col-sm-10">
	                        <select name="dutyPersonId" class="form-control form-require chosen-select">
	                        </select>
	                    </div>
	                    <div class="col-lg-2 col-md-2 col-sm-2 childNode">
	                    	<i class="fa fa-plus-circle add-rena operate-btn" style="line-height:34px;font-size:20px;color: rgb(0, 160, 233);cursor: pointer;"></i>
	                    </div>
	                </div>
	            </div>
	            </td>
	            <td>
	                <input type="text" class="form-control form-require" name="penalty">
	            </td>
	        </tr>
	        `
        // 增加行
        if ($(this).is('.fa-plus')) {
            $(parent).find('table tbody').append(trHtml);
            $(".chosen-select").chosen();
            var departstr = $('.zerenren').attr('depart');
        	var departs = JSON.parse(departstr);
        	loadDepDuty($('.zerenren tbody tr:last select[name="dutyDepartmentId"]'), departs, 1);
            transSelect();
        }

        // 删除行
        if ($(this).is('.fa-minus')) {
            var trList = $(parent).find('table tbody tr');
            var parentTrArr = [];
            for (var i = 0; i < trList.length; i++) {
                if ($(trList[i]).attr('parent-tr')) {
                    parentTrArr.push($(trList[i]).attr('parent-tr'));
                }
            }
            var parentTr = parentTrArr[parentTrArr.length - 1];
            if (parentTr != 'parent-1') {
                $(parent).find('table tbody tr[parent-tr=' + parentTr + ']').remove();
                $(parent).find('table tbody tr[child-tr=' + parentTr + ']').remove();
            }
        }
        
    })
    
    
    // 子节点
    $(parent).find('table').on('click', '.childNode .operate-btn', function () {
        var currentTr = $(this).parent().parent().parent().parent().parent();
        var childrenTr = currentTr.attr('parent-tr');
        var rowspan = Number(currentTr.find('td:first').attr('rowspan'));
        // Gjt => 用作统一提交数据
        var dutyDep = currentTr.find('input[name="dutyDepartmentId"]').val();
        var isWith = currentTr.find('input[name="isWithdraw"]').val();
        var trHtml = 
        `
		    <tr child-tr="${childrenTr }" class="newDuty">
		        <td>
		        <div class="zeren">
		            <div class="row col-lg-12 col-md-12 col-sm-12">
		            	<input type="hidden" name="dutyDepartmentId" class="form-require" value="${dutyDep}"/>
                        <input type="hidden" name="isWithdraw" class="form-require" value="${isWith}"/>
		            	<div class="col-lg-10 col-md-10 col-sm-10">
		                    <select name="dutyPersonId" class="form-control form-require chosen-select">
		                    </select>
		                </div>
		                <div class="col-lg-2 col-md-2 col-sm-2 childNode">
		                	<i class="fa fa-minus-circle remove-ren operate-btn red" style="line-height:34px;font-size:20px;cursor: pointer;"></i>
		                </div>
		            </div>
		        </div>
		        </td>
		        <td>
		            <input type="text" class="form-control form-require" name="penalty">
		        </td>
		    </tr>
		   `
        // 增加行
        if ($(this).is('.add-rena')) {
            rowspan++;
            currentTr.after(trHtml);
            currentTr.find('.rows').attr('rowspan', rowspan);
            $(".chosen-select").chosen();
            var data = [];
            var dutyUser = currentTr.find('select[name="dutyDepartmentId"] option:selected').data('value');
            if (dutyUser != undefined) {
            	data = dutyUser;
			}
            loadDepDuty(currentTr.next('tr').find('select[name="dutyPersonId"]'),data,2);
        }

        // 删除行
        else if ($(this).is('.remove-ren')) {
            var childTr = currentTr.attr('child-tr');
           
            var sonLen = currentTr.siblings('tr[child-tr="' + childTr + '"]').length; 
           
            $(parent).find('table tr[parent-tr="' + childTr + '"] .rows').attr('rowspan', sonLen + 1);
            $(this).parent().parent().parent().parent().parent().remove();
        }
       
    })

}

	dataFormat();
    // 单选下拉框
    $(".chosen-select").chosen();
    // 富文本框
    var editor = KindEditor.create('.contentt');
    editor.readonly();
    
})

// 日期表单
function dataFormat(){
	// 日期初始化
    durationDate('.duration','-');
    // 日期选择
    durationDate('.paymentTime','-');

    $(".form_datetime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView:2
    });
}

var XGKF = new Array(0);

/**
 * 
 */
$.ajax({
	'url' : ctx + '/department/getAllOption',
	'type' : 'post',
	'dataType' : 'json',
	'data' : {type : 3},
	'success' : function(info){
		if (info.status == 'success') {
			var str = '<option value="">--请选择--</option>';
			for (var i = 0; i < info.list.length; i++) {
				str += '<option value="'+info.list[i].departmentId+'">'+info.list[i].fullName+'</option>';
			}
			$('#departmentSchool').html(str);
			$('#departmentSchool').trigger('chosen:updated');
			$('#departmentSchool').chosen();
		} else {
			toastr.error('分校获取数据错误');
		}
	},
	'error' : function(){
		toastr.error('异步请求失败');
	}
})

var DataTable = function(){
	return{
		init: function(){
			var Table = $('#flowTable').dataTable({
				"bPaginate": true,  // 是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,// 每页显示的记录数
            	"bFilter": false, // 搜索栏
            	"bSort": false, // 是否支持排序功能
            	"bInfo": true, // 显示表格信息
            	"bAutoWidth": false,  // 自适应宽度
            	"bStateSave": true, // 保存状态到cookie *************** 很重要 ，
									// 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	// "sPaginationType": "",
				// //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/returnWorkbench/load',
        		"fnServerData": retrieveData,// 用于替换默认发到服务端的请求操作
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
        			"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
        		},
        		"aoColumns" : [
        		               	{"mData": "returnsId", 'sClass': "text-center", "mRender": function (data, type, full ) {
        		               		return '<label> <input class="checkchild" dealUserId="'+full['dealUserId']+'" dealUserName="'+full['dealUserName']+'" aplliedforStatus="'+full['aplliedforStatus']+'" id="'+data+'" infoManageId="'+full['infoManageId']+'"  productId="'+full['productId']+'"  class="info" type="checkbox" value="'+data+'"><span class="text"></span></label>';
        		               	}},
        			            {"mData": "baoMinDate", 'sClass': "text-center"},
        			            {"mData": "pointEndDate", 'sClass': "text-center",'mRender':function(data, type, full){
        			            		return GetDateDiff(Date.parse(new Date()),data);
        			            	}
        			            },
        		               	{"mData": "unAction", 'sClass': "text-center","mRender": function(data, type, full){
        		               		if (data ==0) {
                               		  return '正常';
                                    } else if (data ==1) {
                                   	  return '转班';
                                    } else if (data ==2) {
                                   	  return '休学';
                                    } else if (data ==3) {
                                   	  return '退费';
                                    } else if (data ==4) {
                                   	  return '补考';
                                    } else if(data ==5 ){
                                   	  return '重修';
                                    } else if (data ==6) {
                                   	  return '退费中';
                                    } else if (data ==7) {
                                   	  return '正常（转化）';
                                    } else if (data ==8) {
                                   	  return '初申';
                                    } else if (data ==9) {
                                   	  return '已退费';
                                    } else if (data ==11){
                                   	  return '已转班';
                                    } else {
                                   	  return '无';
                                    }
        		               	}},
        		                {"mData": "departmentName1", 'sClass': "text-center"},
        		                {"mData": "studentName", 'sClass': "text-center"},
        		                {"mData": "studentPhone", 'sClass': "text-center"},
        			            {"mData": "studentSex", 'sClass': "text-center", "mRender": function(data, type, full){
        			            	if (data == 1) {
										return '男';
									} else {
										return '女';
									}
        			            }},
        			            {"mData": "idcard", 'sClass': "text-center"},
        			            {"mData": "productModelName", 'sClass': "text-center"},
        			            {"mData": "productName", 'sClass': "text-center"},
        			            {
        			                "mData": "infoManageId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var descBtn = '<a class="edit" data-toggle="modal" data-target=".return-descrip" onclick="viewDesc(\''+full['infoManageId']+'\',\''+full['productId']+'\',\''+full['returnsId']+'\')"'
        			                    			+ '          data-record="' + full['infoManageId'] + '" data-record2="' + full['productId'] + '" data-record3="' + full['departmentId1'] + '">'
        			                    			+ ' 	<i class="fa fa-search warning" data-toggle="tooltip"'
        			                    			+ ' 		data-placement="top" data-original-title="详情" title="详情"></i>'
        			                    			+ '</a>';
        			                    var transformBtn = '<a class="transform" onclick="transStatus(\''+full['infoManageId']+'\',\''+full['productId']+'\',\''+full['returnsId']+'\')">'
        			                    				 + ' <i class="fa fa-refresh blue" '
        			                    				 + '      data-toggle="tooltip" data-placement="top" data-original-title="转化" title="转化">'
        			                    				 + ' </i>' 
        			                    				 + '</a>';
        			                    return descBtn + transformBtn;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
			$("#flowTable_wrapper").removeClass();
		    $('#flowTable_wrapper').addClass("table-scrollable");

			// 横线滚动条
			$('#flowTable_wrapper').on('scroll',function(){
				$('#flowTable_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		    // 每页显示记录数
		    $('#flowTable_wrapper .dataTables_info').parent().append($('#flowTable_wrapper .dataTables_length'));
		}
	}
}();

/**
 * 回调函数
 * 
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
	
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var productId = $('#w-productId').val();
    var productModelId =$('#w-productModelId').val();
    var flowPoint = $('#tabFlow').val();
    
    aoData.push({"name": "productId","value":productId});
    aoData.push({"name": "productModelId","value":productModelId});
    aoData.push({"name": "flowPoint","value":flowPoint});
  
    var departmentId1 = $('#departmentSchool').val();
    aoData.push({"name": "departmentId1", "value":departmentId1});
	 var searchVal = $('#searchVal').val();
	 if (searchVal && searchVal.length !=  0) {
		 aoData.push({"name": "searchVal", "value": searchVal}); 
		 } 
	 var dateRange = $(".reservation").val(); 
	 var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g'); 
	 var startDate = patt.exec(dateRange); 
	 var endDate = patt.exec(dateRange);
	  
	 if(startDate && endDate){ 
		 startDate = startDate[0]; 
		 endDate = endDate[0];
		 aoData.push({"name": "endTimeDate", "value": endDate});
		 aoData.push({"name": "beginTimeDate", "value": startDate}); 
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
};

// 回车搜索
function search(){
	if(event.keyCode==13){
		DataTable.init();
	}
}
leftModel();
function leftModel(){
	// 为避免多次向服务器请求而产生多线程问题或时间缓慢问题，一次性接收打包好的数据
	$.ajax({
		'url' : ctx + '/returnWorkbench/productandmodel',
		'type' : 'post',
		'dataType' : 'json',
		'success' : function(info){
			if (info.status != 'success') {
				toastr('模型查询错误');
				return ;
			}
			var str = '';
			var data = info.list;
			var index = 1;
			for (var i = 0; i < data.length; i++) {
				str += '<div class="panel panel-default">'+
				            '<div class="panel-heading">'+
				                '<h4 class="panel-title">'+
				                    '<a class="wait-model accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordions" href="#collapse'+index+'">'+
				                       		 data[i].model.productModelName+
				                    '</a>'+
				                '</h4>'+
				           '</div>' + 
				           '<div id="collapse'+index+'" class="panel-collapse collapse">';
				for (var j = 0; j < data[i].products.length; j++) {
					str += 		'<div class="panel-body border-red" style="padding:10px">'+
	                   			'<a class="wait-product blue" href="javascript:void(0);" onclick="proReturns(\''+data[i].products[j].productId+'\',\''+
	                   			data[i].model.productModelId+'\',\'' +data[i].products[j].feeFlowId+ '\');">'+
	                   			data[i].products[j].productName+'</a>'+
	                   			'</div>';
				}
				    str +=     '</div>'+
				        '</div>';
				index++;
			}
			$('#accordions').html(str);
		}
	})
}
// 退费流程
var _feeFlowId;
function proReturns(productId,productModelId,feeFlowId){
	$('#w-productId').val(productId);
	$('#w-productModelId').val(productModelId);
	_feeFlowId = feeFlowId;
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/returnServicePoint/getPoints',
		'dataType' :'json',
		'data' : {'serviceFlowId':feeFlowId},
		'async' : false,
		'success' : function(info){
			if (info.status == 'success') {
				var list = info.list;
				if (list instanceof Array && list.length > 0) {
					$('#right-table').css({'display':''});
					var str = '';
					for (var i = 0; i < list.length; i++) {
						if (i == 0) {
							str += '<li class="active"><a data-toggle="tab" href="#"'+
									' data-value="'+list[i].returnServicePointId+'">'+
									list[i].returnServicePointName+'</a></li>';
						} else {
							str += '<li><a data-toggle="tab" href="#" data-value="'+list[i].returnServicePointId+'">'+
							list[i].returnServicePointName+'</a></li>';
						}
					}
					$('#title-tab').html(str);
					// 设第一个为默认环节
					$('#tabFlow').val(list[0].returnServicePointId);
					// 绑定方法
					$('#title-tab').on('click','li a',function(){
						var pointId = $(this).data('value');
						$('#tabFlow').val(pointId);
						DataTable.init();
					})
				}else{
					$('#right-table').css({'display':'none'});
					toastr.info('当前产品下退费流程已禁用或无退费流程');
				}
			} else {
				$('#right-table').css({'display':'none'});
				toastr.error('流程获取失败');
			}
		}
	})
	DataTable.init();
}
// 分配
function toChooseAr(){
	var idAr = "";// 复选框选中的退费信息id
	var dealUsers = []; 
	$('.checkchild').each(function(index){// 复选框选中的退费信息id
		if(this.checked){
			idAr = idAr + this.value + ",";
			var dealId = $(this).attr('dealUserId');
			var deal = {};
			if (dealId != 'undefined' && dealId != '') {
				deal.id = dealId;
				deal.name = $(this).attr('dealUserName');
				deal.ind = index+1;
				dealUsers.push(deal);
			}
		}
	})
	if (dealUsers.length > 0) {
		var textInfo = '';
		$.each(dealUsers,function(i,val){
			textInfo += '第'+val.ind+'条数据已经分配给《'+val.name+'》\n';
		})
		swal({ 
			  title: "确定重新分配人吗？", 
			  text: textInfo+'点击确定覆盖原有已分配人', 
			  type: "warning",
			  showCancelButton: true, 
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "确定！", 
			  cancelButtonText: "取消！",
			  closeOnConfirm: false, 
			  closeOnCancel: false				
			},
			function(isConfirm){ 
			  if (isConfirm) { 
				  allocateUser(idAr);
			  } else { 
			      swal("取消！", "已取消重新分配", "error"); 
			  } 
		});
	} else {
		allocateUser(idAr);
	}
}
function allocateUser(idAr){
	idAr = idAr.substring(0,idAr.length-1);
	var dealUserId = $('#dealUserId').val();
	if(dealUserId == '0'){
		toastr.error('当前人员无效');
		return;
	}
	var flowPoint =	$('#title-tab').find('li[class="active"]').find('a').data('value');
	if(idAr != ''){
		// 默认倒计时从当前编辑之后计时（3天）
		var pointEndDate = dateCal(Date.parse(new Date()), 3, 'day');
		$.ajax({
			"type" : "Post",
			"url" : ctx+"/returnWorkbench/toChooseAr",
			"dataType" : "json",
			"data" : {
				'returnsIds' : idAr,
				'dealUserId' : dealUserId,
				'pointId' : flowPoint,
				'pointEndDate': pointEndDate
			},
			"success" : function(data) {
				if(data.status=="success"){
					swal("", "分配完成", "success");
					DataTable.init();
				} else　{
					toastr.error(data.msg);
				}
				
			}
		});	
	}else{
		toastr.error('请选择信息!');
	}
}
// 全局变量
var _infoManageId;
var _productId;
var _returnsId;
// 咨询归属
var _departmentId1;
// 特批
var _specialRatify;
// 学员名称
var _studentName;
function viewDesc(infoManageId, productId, returnsId){
	$('.title-caption').html($('#title-tab li[class="active"] a').text());
	_returnsId = returnsId;
	$('#hideReturnsId').val(returnsId);
	 $.post(ctx + '/consultInfoManage/findOneNew',{infoManageId:infoManageId,productId:productId},function(data){
     	if(data.status=='success'){
     		_infoManageId = data.data.infoManageId;
     		_productId = data.data.productId;
     		_departmentId1 = data.data.departmentId1;
     		// 日志记录备用
     		$('.logForm').find('input[name="infoManageId"]').val(_infoManageId);
     		$('.logForm').find('input[name="productId"]').val(_productId);
     		// 题头
     		$('.descrip-total .zxFX').text(data.data.departmentName1);
     		$('.descrip-total .pb').text(data.data.brandName);
     		$('.descrip-total .zxzLX').text(data.data.studentAttrName2);
     		$('.descrip-total .mtLY').text(data.data.studentAttrName1);
     		// 客户成熟度
     		var maturity;
     		switch (data.data.studentMaturity) {
			case '1':
				maturity = 'A类';
				break;
			case '2':
				maturity = 'B类';
				break;
			case '3':
				maturity = 'C类';
				break;
			case '4':
				maturity = 'D类';
				break;
			default:
				maturity = '--';
				break;
			}
     		$('.descrip-total .khCSD').text(maturity);
     		// 学院个人信息
     		var sInfo = data.data;
     		$('#studentName').val(sInfo.studentName);
     		_studentName = sInfo.studentName;
     		$('#studentSex').val(sInfo.studentSex);
     		$('#studentAge').val(sInfo.age);
     		$('#studentPhone').val(sInfo.studentPhone);
     		$('#studentEmail').val(sInfo.email);
     		$('#phoneBelong').val(sInfo.phoneBelong);
     		$('#weChat').val(sInfo.weChat);
     		$('#tengXun').val(sInfo.tengXun);
     		$('#ortherPhone').val(sInfo.ortherPhone);
     		$('#phoneAddress').text(sInfo.phoneAddress);
     		$('#workSpace').text(sInfo.workSpace);
     		fillStuBaseInfo(sInfo);
     		fillStuCourseInfo(sInfo);
//     		// 回显收款方信息
//     		$.post(ctx + '/consultInfoManage/getConsultPayee',{"productId": productId, "infoManageId":infoManageId},function(msg1){
//     			if(msg1.status=="success") {
//     				var payeeOption = "";
//     				if(msg1.data.payee!=null){
//     					if(msg1.data.payee=='1'){
//     						payeeOption="<option selected>中和</option>";
//     					}
//     					if(msg1.data.payee=='2'){
//     						payeeOption="<option selected>学慧网</option>";
//     					}
//     					if(msg1.data.payee=='4'){
//     						payeeOption="<option selected>合作方</option>";
//     					}
//     				}
//     				$('#scdata').find('select[name=shoukuanfang]').html(payeeOption);
//     				$('#scdata2').find('select[name=shoukuanfang]').html(payeeOption);
//     			}
//		        });
//		        
     		 // 加载缴费信息
             $.post(ctx + '/studentServiceCenter/queryPayFees',{
             	infoManageId:infoManageId,
             	productId:productId,
             	ktime:data.data.kTime
             	},
	            	function(val2){
	                	if(val2.status=='success'){
	                		var str='';
	                		$.each(val2.data,function(index,e){
	                			str+='<tr>';
	                			str+=' <td style="text-align: center;">'+e.payName+'</td>';
	                			str+=' <td style="text-align: center;">'+e.yjValue+'</td>';
	                			str+=' <td style="text-align: center;">'+e.sjValue+'</td>';
	                			str+=' <td style="text-align: center;">';
	                			str+=e.zhiFu;
	                			str+='</td>';
	                			str+=' <td style="text-align: center;">'+e.cfValue+'</td>';
	                			str+='</tr>';
	                		});
	                		$("#payMentTableInfoBody tbody").html(str);
	                	}
             },"json");
            // 子产品是否展示
            if (data.data.pimLevel != undefined && data.data.pimLevel == 0 && 
            		data.data.childProductId != null && data.data.childProductId != undefined) {
				$('.child-product-info').attr('style','');
				// 子产品应缴、实缴、欠费加载数据
				$.ajax({
					'type':'post',
					'url':ctx + '/studentServiceCenter/queryPayFees',
					'dataType':'json',
					'data':{
						'infoManageId':_infoManageId,
						'productId':data.data.childProductId
					},
					'success':function(info){
						if (info.status == 'success') {
							
							$.each(info.data,function(index,val){
								if (index == info.data.length-1) {
									$('.childPayable').text(val.yjValue);
									$('.childPaiedIn').text(val.sjValue);
									$('.childArrears').text(val.cfValue);
								}
							})
						}
					},
					'error':function(){
						toastr.error('子产品缴费信息获取错误');
					}
				})
				// 子产品模型、名称加载
				$.ajax({
					'url':ctx + '/product/selectOne',
					'type':'post',
					'dataType':'json',
					'data':{
						'productId':data.data.childProductId
					},
					'success':function(info){
						if (info.status == 'success') {
							$('.childModel').text(info.data.product_model_name);
							$('.childName').text(info.data.product_name);
						}
					},
					'error':function(){
						toastr.error('子产品信息获取错误');
					}
				})
			}
             
            // 初始化责任部门
			$.ajax({
				'type':'post',
				'url':ctx + '/returnWorkbench/getDepAndUsers',
				'dataType':'json',
				'data':{'infoManageId':_infoManageId,'productId':_productId},
				'success':function(info){
					var departList = [];
					if (info.status == 'success') {
						$('.zerenren').attr('depart',JSON.stringify(info.list));
					}
				},
				'error':function(){
					toastr.error('系统错误');
				}
			})
			
			// 退费申请期次信息
			$.ajax({
				'type' : 'post',
            	'url' : ctx + '/returnWorkbench/getIssues',
            	'dataType' : 'json',
            	'data':{'returnId':_returnsId},
            	'success':function(info){
            		if (info.status == 'success') {
            			// 保存退费申请期次数据到页面
            			$('#refundIssue').attr('data-issue',JSON.stringify(info.data));
            			var html = '';
						$.each(info.data,function(i,obj){
							var applyDate = transferDateFormat(obj.applyDate);
							html += `
								<tr>
					                <th scope="row">
					                   ${obj.applyMoney}
					                </th>
					                <td>
					                   ${applyDate}
					                </td>
					                <td>
					                    ${obj.remark}
					                </td>
					            </tr>
								`
						})
						$('.show-return-apply').html(html);
					}
            	},
            	'error':function(){
            		toastr.error('获取申请期次时系统错误');
            	}
			})
			
            // 相关扣费
            $.ajax({
            	'type' : 'post',
            	'url' : ctx + '/studentServiceCenter/queryFeeDeduction',
            	'dataType' : 'json',
            	'data' : {
            		infoManageId : _infoManageId,
             		productId : _productId
            	},
            	'success' : function(data){
            		// 相关扣费
                    $.ajax({
                   	'url':ctx + '/returnWorkbench/getDed',
                   	'type' : 'post',
                   	'dataType' : 'json',
                   	'async' : false,
                   	'data' : {'returnId':_returnsId},
                   	'success': function(info){
                   		if (info.status == 'success') {
       						XGKF = info.data;
       					} else {
       						toastr.warning('后台获取扣费信息错误');
       					}
                   	},
                   	'error' : function(){
                   		toastr.error('系统错误');
                   	}
                    })
            		if(data.status=="success"){
             			var str='';
             			var totalKF = 0; // 相关扣费总计
             			$.each(data.data,function(index,obj){
             				str+='<tr>'
             					+'<th scope="row">'+obj.payName
             					+'<input type="hidden" name="collectId" value="'
             					+obj.payCodeId
             					+'"/></th>'
             					+'<td>'+obj.yjValue+'</td>'
             					+'<td>'+obj.sjValue+'</td>'
             					+'<td>'+(obj.zhiChu-obj.returnCompMoney)+'</td>'
             					+'<td>';
             					var flagNum = 0;
             					if (data.data.length!=(index+1)){
             						str += '<div class="row addpay">';
             						var html = '';
             						for (var j = 0; j < XGKF.length; j++) {
										if (obj.payCodeId == XGKF[j].collectId) {
											html += '<div class="form-group col-lg-12 col-md-12 col-sm-12">'+
					             						'<div class="col-lg-5 col-md-5 col-sm-5">'+
					             							XGKF[j].typeName+
					             						'</div>'+
					             						'<div class="col-lg-5 col-md-5 col-sm-5">'+
					             							XGKF[j].dedMoney+
					             						'</div>'+
					             					'</div>';
											flagNum += XGKF[j].dedMoney*100;
											totalKF += XGKF[j].dedMoney*100;
										}
									}
             						if (html == '') {
										html = '<div class="form-group col-lg-12 col-md-12 col-sm-12">' +
													'<div class="col-lg-5 col-md-5 col-sm-5">'+
													'</div>'+
													'<div class="col-lg-5 col-md-5 col-sm-5">'+
													'</div>'+
												'</div>';
									}
             						str += html;
             						str += '</div>'
             						str += '</td><td>'+((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-flagNum)/100)+'</td></tr>';
								} else {
									str += totalKF/100;
									str += '</td><td>'+((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-totalKF)/100)+'</td></tr>';
								}
             			    if (index == data.data.length-1) {
           					$('.chargeBackMoney').text((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-totalKF)/100);
           					$('input[name="chargeBackMoney"]').val((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-totalKF)/100);
           				}
             			})
             			$('#relatedCharges tbody').html(str);
             			
             		}else{
             			swal("", "查询缴费信息失败！", "error");
             		}
            	},
            	'error' : function(){
            		toastr.error('系统错误');
            	}
             })

     	}
     },'json');
	 
	 // 责任鉴定
	 requestDuty();
	 // 经办人
	 getAgent('.agentPerson',_returnsId,0);
	 getAgent('#agentKF1',_returnsId,1);
	 getAgent('#agentZY1',_returnsId,3);
	 // 驳回原因
	 $.ajax({
			'url' : ctx + '/returnWorkbench/rejectCause',
			'dataType' : 'json',
			'data' : {'infoManageId' : _infoManageId,'returnsId' : _returnsId, 'operateType' : 4},
			'type' : 'post',
			'success' : function(info){
				var str = '';
				if (info.status == 'success') {
					$.each(info.list,function(index,obj){
						if (obj.createDate == undefined) {
							obj.createDate = '未知时间';
						}
						str += '<div class=""><span>'+obj.createDate+'：</span> '+obj.rejectCause+'</div>';
					})
					$('#rejectC').html(str);
				}
			}
	})
	
	 $.ajax({
		'url' : ctx + '/returnWorkbench/selectOne',
		'dataType' : 'json',
		'data' : {returnsId : _returnsId},
		'type' : 'post',
		'success' : function(info){
			if (info.status == 'success' && info.data != null) {
				// 特批
				_specialRatify = info.data.specialRatify;
				// 退费情况
				$('#refundCause').val(info.data.returnCause);
				$('#refundCause').attr('title',info.data.returnCause);
				$('#partnerName').val(info.data.partner);
				$('#yetExpend').val(info.data.partnerPayEd);
				$('#isPartReturn').val(info.data.partnerPayReturn == 1 ? '是':'否');
				$('#refundSuggest').val(info.data.schoolReturnAnswer);
				$('#refundSuggest').attr('title',info.data.schoolReturnAnswer);
				$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html(info.data.returnFile?info.data.returnFile:'');
				$('#courierNumber').val(info.data.courierNumber);
				$('#refundRemark1').val(info.data.returnContent);
				// 客服沟通情况汇总
				$('#communicateTable1').find('.isCommunicated').text(info.data.isCommunicated==1?'是':info.data.isCommunicated==0?'否':'--');
				$('#communicateTable1').find('.communicateDesc').text(info.data.communicateDesc?info.data.communicateDesc:'----');
				$('#communicateTable1').find('.isAudit').text(info.data.isAudit==1?'是':info.data.isAudit==0?'否':'--');
				$('#communicateTable1').find('.auditDesc').text(info.data.auditDesc?info.data.auditDesc:'----');
				$('#communicateTable1').find('.checkDesc').text(info.data.checkDesc?info.data.checkDesc:'----');
				// 沟通情况弹窗赋值initial-value
				$('#communicateTable2').find('select[name="isCommunicated"]').val(info.data.isCommunicated);
				$('#communicateTable2').find('textarea[name="communicateDesc"]').val(info.data.communicateDesc);
				$('#communicateTable2').find('select[name="isAudit"]').val(info.data.isAudit);
				$('#communicateTable2').find('textarea[name="auditDesc"]').val(info.data.auditDesc);
				$('#communicateTable2').find('textarea[name="checkDesc"]').val(info.data.checkDesc);
				$('#communicateTable2').find('select[name="isCommunicated"]').attr('initial-value',info.data.isCommunicated==1?'是':info.data.isCommunicated==0?'否':'--');
				$('#communicateTable2').find('textarea[name="communicateDesc"]').attr('initial-value',info.data.communicateDesc);
				$('#communicateTable2').find('select[name="isAudit"]').attr('initial-value',info.data.isAudit==1?'是':info.data.isAudit==0?'否':'--');
				$('#communicateTable2').find('textarea[name="auditDesc"]').attr('initial-value',info.data.auditDesc);
				$('#communicateTable2').find('textarea[name="checkDesc"]').attr('initial-value',info.data.checkDesc);
				// 资源汇总
				$('#resourceTable1').find('.isRegisterExam').text(info.data.isRegisterExam == 1?'是':info.data.isRegisterExam == 0?'否':'--');
				$('#resourceTable1').find('.registerExamDesc').text(info.data.registerExamDesc?info.data.registerExamDesc:'');
				$('#resourceTable1').find('.forensicsProgress').text(info.data.forensicsProgress?info.data.forensicsProgress:'');
				$('#resourceTable1').find('.returnCoopFee').text(info.data.returnCoopFee==1?'是':info.data.returnCoopFee==0?'否':'--');
				$('#resourceTable1').find('.coopFeeDesc').text(info.data.coopFeeDesc?info.data.coopFeeDesc:'');
				$('#resourceTable1').find('.refundCoopMoney').text(info.data.refundCoopMoney?info.data.refundCoopMoney:'');
				$('#resourceTable1').find('.refundCoopMoneyDesc').text(info.data.refundCoopMoneyDesc?info.data.refundCoopMoneyDesc:'');
				$('#resourceTable1').find('.refundTime').text(info.data.refundTime?transferDateFormat(info.data.refundTime):'');
				$('#resourceTable1').find('td.refundTimeDesc').text(info.data.refundTimeDesc?info.data.refundTimeDesc:'');
				$('#resourceTable1').find('.cantBack').text(info.data.cantBack==1?'是':info.data.cantBack==0?'否':'--');
				$('#resourceTable1').find('.cantBackDesc').text(info.data.cantBackDesc?info.data.cantBackDesc:'');
				$('#resourceTable1').find('.isCredit').text(info.data.isCredit==1?'是':info.data.isCredit==0?'否':'--');
				$('#resourceTable1').find('.creditDesc').text(info.data.creditDesc?info.data.creditDesc:'');
				$('#resourceTable1').find('.resourceSuggest').text(info.data.resourceSuggest?info.data.resourceSuggest:'');
				
				// 资源汇总弹窗赋值
				$('#resourceTable2').find('[name="isRegisterExam"]').val(info.data.isRegisterExam?info.data.isRegisterExam:'');
				$('#resourceTable2').find('[name="registerExamDesc"]').val(info.data.registerExamDesc);
				$('#resourceTable2').find('[name="forensicsProgress"]').val(info.data.forensicsProgress);
				$('#resourceTable2').find('[name="returnCoopFee"]').val(info.data.returnCoopFee);
				$('#resourceTable2').find('[name="coopFeeDesc"]').val(info.data.coopFeeDesc);
				$('#resourceTable2').find('[name="refundCoopMoney"]').val(info.data.refundCoopMoney);
				$('#resourceTable2').find('[name="refundCoopMoneyDesc"]').val(info.data.refundCoopMoneyDesc);
				$('#resourceTable2').find('[name="refundTime"]').val(transferDateFormat(info.data.refundTime));
				$('#resourceTable2').find('[name="refundTimeDesc"]').val(info.data.refundTimeDesc);
				$('#resourceTable2').find('[name="cantBack"]').val(info.data.cantBack);
				$('#resourceTable2').find('[name="cantBackDesc"]').val(info.data.cantBackDesc);
				$('#resourceTable2').find('[name="isCredit"]').val(info.data.isCredit);
				$('#resourceTable2').find('[name="creditDesc"]').val(info.data.creditDesc);
				$('#resourceTable2').find('[name="resourceSuggest"]').val(info.data.resourceSuggest);
				//  资源汇总原值保存
				$('#resourceTable2').find('[name="isRegisterExam"]').attr('initial-value',info.data.isRegisterExam == 1?'是':info.data.isRegisterExam == 0?'否':'--');
				$('#resourceTable2').find('[name="registerExamDesc"]').attr('initial-value',info.data.registerExamDesc);
				$('#resourceTable2').find('[name="forensicsProgress"]').attr('initial-value',info.data.forensicsProgress);
				$('#resourceTable2').find('[name="returnCoopFee"]').attr('initial-value',info.data.returnCoopFee==1?'是':info.data.returnCoopFee==0?'否':'--');
				$('#resourceTable2').find('[name="coopFeeDesc"]').attr('initial-value',info.data.coopFeeDesc);
				$('#resourceTable2').find('[name="refundCoopMoney"]').attr('initial-value',info.data.refundCoopMoney);
				$('#resourceTable2').find('[name="refundCoopMoneyDesc"]').attr('initial-value',info.data.refundCoopMoneyDesc);
				$('#resourceTable2').find('[name="refundTime"]').attr('initial-value',transferDateFormat(info.data.refundTime));
				$('#resourceTable2').find('[name="refundTimeDesc"]').attr('initial-value',info.data.refundTimeDesc);
				$('#resourceTable2').find('[name="cantBack"]').attr('initial-value',info.data.cantBack==1?'是':info.data.cantBack==0?'否':'--');
				$('#resourceTable2').find('[name="cantBackDesc"]').attr('initial-value',info.data.cantBackDesc);
				$('#resourceTable2').find('[name="isCredit"]').attr('initial-value',info.data.isCredit==1?'是':info.data.isCredit==0?'否':'--');
				$('#resourceTable2').find('[name="creditDesc"]').attr('initial-value',info.data.creditDesc);
				$('#resourceTable2').find('[name="resourceSuggest"]').attr('initial-value',info.data.resourceSuggest);
				validateInputNum('input[name="refundCoopMoney"]');
				$('.chosen-select').trigger('chosen:updated');
				$('.chosen-select').chosen();
				
				// 退费申请账户信息
				$('#amountTable1').find('.invoiceTitle').text(info.data.invoiceTitle?info.data.invoiceTitle:'----');
				$('#amountTable1').find('.expendituresDesc').text(info.data.expendituresDesc?info.data.expendituresDesc:'----');
				$('#amountTable1').find('.openBank').text(info.data.openBank?info.data.openBank:'----');
				$('#amountTable1').find('.openProvince').text(info.data.openProvince?info.data.openProvince:'----');
				$('#amountTable1').find('.openCity').text(info.data.openCity?info.data.openCity:'----');
				$('#amountTable1').find('.recevier').text(info.data.recevier?info.data.recevier:'----');
				$('#amountTable1').find('.amount').text(info.data.amount?info.data.amount:'----');
				$('#amountTable1').find('.amonutName').text(info.data.amonutName?info.data.amonutName:'----');
				$('#amountTable1').find('.phone').text(info.data.phone?info.data.phone:'----');
				$('#amountTable1').find('.amountDesc').val(info.data.amountDesc?info.data.amountDesc:'');
				// 退费申请账户信息弹窗赋值
				$('#refundApplyTable2').find('[name="invoiceTitle"]').val(info.data.invoiceTitle);
				$('#refundApplyTable2').find('[name="expendituresDesc"]').val(info.data.expendituresDesc);
				$('#refundApplyTable2').find('[name="openBank"]').val(info.data.openBank);
				$('#refundApplyTable2').find('[name="openProvince"]').val(info.data.openProvince);
				$('#refundApplyTable2').find('[name="openCity"]').val(info.data.openCity);
				$('#refundApplyTable2').find('[name="recevier"]').val(info.data.recevier?info.data.recevier:_studentName);
				$('#refundApplyTable2').find('[name="amount"]').val(info.data.amount);
				$('#refundApplyTable2').find('[name="amonutName"]').val(info.data.amonutName);
				$('#refundApplyTable2').find('[name="phone"]').val(info.data.phone);
				$(document.getElementsByTagName('iframe')[2].contentWindow.document.body).html(info.data.amountDesc?info.data.amountDesc:'');
				// 退费申请账户信息原值保存
				$('#refundApplyTable2').find('[name="invoiceTitle"]').attr('initial-value',info.data.invoiceTitle);
				$('#refundApplyTable2').find('[name="expendituresDesc"]').attr('initial-value',info.data.expendituresDesc);
				$('#refundApplyTable2').find('[name="openBank"]').attr('initial-value',info.data.openBank);
				$('#refundApplyTable2').find('[name="openProvince"]').attr('initial-value',info.data.openProvince);
				$('#refundApplyTable2').find('[name="openCity"]').attr('initial-value',info.data.openCity);
				$('#refundApplyTable2').find('[name="recevier"]').attr('initial-value',info.data.recevier?info.data.recevier:_studentName);
				$('#refundApplyTable2').find('[name="amount"]').attr('initial-value',info.data.amount);
				$('#refundApplyTable2').find('[name="amonutName"]').attr('initial-value',info.data.amonutName);
				$('#refundApplyTable2').find('[name="phone"]').attr('initial-value',info.data.phone);
				$('#refundApplyTable2').find('[name="amonutDesc"]').attr('initial-value',info.data.amonutDesc);
				// 退费方案描述
				$('#refundDescTable1').find('.chargeBackMoney').text(info.data.chargeBackMoney?info.data.chargeBackMoney:'--');
				$('#refundDescTable1').find('.chargeEndTime').text(info.data.chargeEndTime?transferDateFormat(info.data.chargeEndTime):'--');
				$('#refundDescTable1').find('.chargeDesc').text(info.data.chargeDesc?info.data.chargeDesc:'--');
	     		$('input[name="chargeEndTime"]').val(info.data.chargeEndTime?transferDateFormat(info.data.chargeEndTime):'');
	     		$('textarea[name="chargeDesc"]').val(info.data.chargeDesc?info.data.chargeDesc:'');
	     		$('input[name="chargeEndTime"]').attr('initial-value',info.data.chargeEndTime?transferDateFormat(info.data.chargeEndTime):'');
	     		$('textarea[name="chargeDesc"]').attr('initial-value',info.data.chargeDesc?info.data.chargeDesc:'');
			} else {}
		},
		'error' : function(){
			swal('错误','系统错误','error');
		}
	 })
}
/**
 * 获取经办人
 * @param 
 * @returns
 */
function getAgent(selector,returnsId,operateType){
	$.ajax({
		'type':'post',
		'data':{'returnsId':returnsId,'operateType':operateType},
		'url': ctx + '/returnWorkbench/rejectCause',
		'dataType':'json',
		'success':function(info){
			if (info.status == 'success' && info.list.length > 0) {
				$(selector).html(info.list[0].createUserName?info.list[0].createUserName:'--');
			} else {
				$(selector).html('未分配');
			}
		},
		'error':function(){
			toastr.error('系统错误');
		}
	})
}

function fillStuBaseInfo(consultInfo) {
	$("#studentInfoManageId").val(consultInfo.studentInfoManageId);
	if (consultInfo.unAction ==1) {
        $('#tabStatus').text('正常');
        roleShow('');
    } else if (consultInfo.unAction ==2) {
        $('#tabStatus').text('休学');
        roleShow('1,3,4,5');
    } else if (consultInfo.unAction ==3) {
        $('#tabStatus').text('退费');
        roleShow('1,2,3,4,5');
    } else if (consultInfo.unAction ==4) {
        $('#tabStatus').text('补考重修');
    } else if (consultInfo.unAction ==11){
        $('#tabStatus').text('已转班');
        roleShow('1,2,3,4,5');
    }else{
    	roleShow('0');
    	$('#tabStatus').text('正常');
    }
    $('#tabStu').text(consultInfo.studentName);
    $('#departmentId1').val(consultInfo.departmentId1);
    $('#scdata').find('input[name=studentName]').val(consultInfo.studentName);
    $('#scdata2').find('input[name=studentName]').val(consultInfo.studentName);
    $('#scdata3').find('input[name=studentName]').val(consultInfo.studentName);
    $('#scdata').find('select[name=studentSex]').val(consultInfo.studentSex);
    $('#scdata2').find('select[name=studentSex]').val(consultInfo.studentSex);
    $('#scdata3').find('select[name=studentSex]').val(consultInfo.studentSex);
    $('#scdata').find('input[name=age]').val(consultInfo.age);
    $('#scdata2').find('input[name=age]').val(consultInfo.age);
    $('#scdata3').find('input[name=age]').val(consultInfo.age);
    if (consultInfo.studentPhone != '' && consultInfo.studentPhone != undefined) {
        $('#studentPhone').val("****" + (consultInfo.studentPhone).substring(consultInfo.studentPhone.length - 4, consultInfo.studentPhone.length));
        $('#scdata2').find('input[name=studentPhone]').val("****" + (consultInfo.studentPhone).substring(consultInfo.studentPhone.length - 4, consultInfo.studentPhone.length));
        $('#scdata3').find('input[name=studentPhone]').val("****" + (consultInfo.studentPhone).substring(consultInfo.studentPhone.length - 4, consultInfo.studentPhone.length));
        $('#studentPhone2').val(consultInfo.studentPhone);
    }
    $('#scdata').find('input[name=email]').val(consultInfo.email);
    $('#scdata2').find('input[name=email]').val(consultInfo.email);
    $('#scdata3').find('input[name=email]').val(consultInfo.email);
    $('#scdata').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
    $('#scdata2').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
    $('#scdata3').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
    $('#scdata').find('input[name=weChat]').val(consultInfo.weChat);
    $('#scdata2').find('input[name=weChat]').val(consultInfo.weChat);
    $('#scdata3').find('input[name=weChat]').val(consultInfo.weChat);
    $('#scdata').find('input[name=tengXun]').val(consultInfo.tengXun);
    $('#scdata2').find('input[name=tengXun]').val(consultInfo.tengXun);
    $('#scdata3').find('input[name=tengXun]').val(consultInfo.tengXun);
    $('#scdata').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
    $('#scdata2').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
    $('#scdata3').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
    $('#scdata').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
    $('#scdata2').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
    $('#scdata3').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
    $('#scdata').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
    $('#scdata2').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
    $('#scdata3').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
}


	/**
	 * 按钮权限组
	 * 
	 * @param e
	 * @returns
	 */
	function roleShow(e){
		e = e.split(",");
		$('.roleShow').find('a').attr('disabled',false);
		for(var i=0;i<e.length;i++){
			$('.a'+e[i]).attr('disabled',true);
		}
	}

// 填写课程信息
function fillStuCourseInfo(consultInfo) {
	// 清除上一次加载信息
	$('.dynamic-item').remove();
	$('#scdata').find('select[name=kTime] option').remove();
	$('#examDistrict').val('');
	// 考试地区
	var data1 = {'id':consultInfo.branchSchoolId};
	$.post(ctx + '/department/selectByIdDepartement',data1,function(data){
		$('#examDistrict').val(data.fullName);
	},'json');
	// 回显考期信息
	var ktime = '<option selected>'+consultInfo.kTimeValue+'</option>';
	$('#scdata').find('select[name=kTime]').html(ktime);
	// 收款方
	var shouKuanF;
	switch (consultInfo.payee) {
	case 1:
		shouKuanF = '中和';
		break;
	case 2:
		shouKuanF = '学慧网';
		break;
	case 3:
		shouKuanF = '中和，学慧网';
		break;
	case 4:
		shouKuanF = '合作方';
		break;
	case 5:
		shouKuanF = '中和，合作方';
		break;
	case 6:
		shouKuanF = '学慧网，合作方';
		break;
	case 7:
		shouKuanF = '中和，学慧网，合作方';
		break;
	default:
		shouKuanF = '--';
		break;
	}
	$('.partComminute').val(shouKuanF);
	// 产品模型
	$('.showModelName').val(consultInfo.productModelName);
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/product/selectOne',
		'data' : {'productId': _productId},
//		'async' : false,
		'dataType' : 'json',
		'success' : function(info){
			if (info.status == 'success') {
				var data = info.data;
				// 产品
				$('.productCom').val(consultInfo.productName);
				$.ajax({
					'type' : 'post',
					'url' : ctx + '/product/getModelDetail',
					'data' : {'productModelId': consultInfo.productModelId},
					'dataType' : 'json',
					'success' : function(info){
						if (info.status == 'success') {
							var htm = '';
							$.each(info.data,function(i,val){
								var itemI = val.productModelDetailEn + '_name';
								var itemValue = data[itemI];
								htm += `
									<div class="form-group col-lg-4 col-md-4 col-sm-6 dynamic-item">
                                        <label class="col-sm-4 control-label no-padding-right">${val.productModelDetailCn}</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control comment_disabled" value="${itemValue}" disabled="disabled">
                                        </div>
                                    </div>
								`
							})
							$('.showMN').after(htm);
						} else {
							toastr.warning('没有数据');
						}
					}
				})
			}
		},
		'error' : function(){
			toastr.error('系统错误');
		}
	})
}


$(function(){
	var _returnFee;
	$.ajax({
		'url' : ctx + '/productReturnFee/selectAll',
		'type' : 'post',
		'dataType' : 'json',
		'data' : {'enable' : 1},
		'async' : 'fasle',
		'success' : function(info){
			if (info.status=='success') {
				_returnFee = info.list;
				var str = '<option value="">--请选择--</option>';
				for (var i = 0; i < info.list.length; i++) {
					str += '<option value="'+info.list[i].productReturnFeeId+'">'+info.list[i].productReturnFeeName+'</option>';
				}
				$('.addpay').find('select[name="typeId"]').html(str);
				$('.addpay').find('select[name="typeId"]').trigger('chosen:updated');
				$('.addpay').find('select[name="typeId"]').chosen();
			} else {
				toastr.error('查询失败');
			}
		},
		'error' : function(){
			swal('系统错误','',error);
		}
	})
	// 退费方案描述
	$('.addpay-btn').click(function(){debugger
	    var html = `
	        <div class="form-group col-lg-12 col-md-12 col-sm-12 new-fee deds">
	            <div class="col-lg-5 col-md-5 col-sm-5">
	                <select class="form-control" name="typeId">
	                </select>
	            </div>
	            <div class="col-lg-5 col-md-5 col-sm-5">
	                <input type="text" class="form-control dedMoney" name="dedMoney" onpropertychange="propertyMoney('.dedMoney')">
	            </div>
	            <div class="col-lg-2 col-md-2 col-sm-2">
	                <i class="fa fa-minus-circle red removepay-btn" style="font-size:20px;line-height:34px;cursor:pointer"></i>
	            </div>
	        </div>
	    `
	    $(this).parent().parent().parent().append(html);
	    var str = '<option value="">--请选择--</option>';
		for (var i = 0; i < _returnFee.length; i++) {
			str += '<option value="'+_returnFee[i].productReturnFeeId+'">'+_returnFee[i].productReturnFeeName+'</option>';
		}
		$(this).parent().parent().parent().find('.deds:last select[name="typeId"]').html(str);
		$(this).parent().parent().parent().find('.deds:last select[name="typeId"]').trigger('chosen:updated');
		$(this).parent().parent().parent().find('.deds:last select[name="typeId"]').chosen();
	    $('.removepay-btn').click(function(){
	        $(this).parent().parent().remove();
	    })
	})

})

// function propertyMoney(selector){
// /*if
// (!val.match(/((^[1-9]{1}\d*\.{1}\d{1,2}$)|(^[0]{1}\.{1}\d{1,2}$))|((^[1-9]{1}\d*$)|(^[0]{1}$))/))
// {
// toastr.error('需要是正数，最多两位小数');
// return
// }*/
// var num;
// $(selector).each(function(){
// $(this).val();
// })
// }
/**
 * 责任鉴定请求
 */
function requestDuty(){
	$.ajax({
		'type':'post',
		'url': ctx + '/returnWorkbench/getDuties',
		'dataType':'json',
		'data':{
			'infoManageId':_infoManageId,
			'productId':_productId,
			'changeReturnId':_returnsId,
			'changeReturnType':1
		},
		'success':function(info){
			if (info.status == 'success') {
				$('#dutyShow tbody tr').remove();
				$('#dutyRemark').html('');
				var data = info.data;
				// 页面保存数据，弹窗编辑时使用
				$('.zerenren').attr('duty-data',JSON.stringify(data));
				loadDutyDesc(data);				
			}
		}
	 })
}

/**
 * 详情页加载责任鉴定信息
 * 
 * @param data
 *            责任鉴定数据集合
 * @returns
 */
function loadDutyDesc(data){
	// 加载详情信息
	var htm,index = 0,row = 1; // rowspan的值
	for (var i = 0; i < data.length; i++) {
		if (i == 0 || data[i].dutyDepartmentId != data[i-1].dutyDepartmentId) {
			index++;
			htm = '<tr parent-tr="parent-'+index+'">'+
            		'<td scope="row" rowspan="1" class="rows">'+
            		data[i].dutyDepartmentName+
            		'</td>'+
            		'<td rowspan="1" class="rows">';
            			if (data[i].isWithdraw == 1) {
            				htm += '是';
						} else {
							htm += '否';
						}
            htm +=	'</td>';
		} else if (data[i].dutyDepartmentId == data[i-1].dutyDepartmentId){
			htm = '<tr child-tr="parent-'+index+'">';
			row++;
			// 上下合并单元格
			$('#dutyShow tbody tr[parent-tr="parent-'+index+'"] td.rows').each(function(){
				$(this).attr('rowspan',row);
			})
		}
		htm += '<td>'+
				data[i].dutyPersonName+
        		'</td>'+
        		'<td>'+
        		data[i].penalty+
        		'</td></tr>';
		
		$('#dutyShow tbody').append(htm);
	}
	if (data.length > 0) {
		$('#dutyRemark').html(data[0].remark);
	}
}

/**
 * 沟通情况汇总
 */
$('#communicateTable2').on('click','button.confirm',function(){
	var isCommunicated = $('#communicateTable2').find('select[name="isCommunicated"]').val();
	var communicateDesc = $('#communicateTable2').find('textarea[name="communicateDesc"]').val();
	var isAudit = $('#communicateTable2').find('select[name="isAudit"]').val();
	var auditDesc = $('#communicateTable2').find('textarea[name="auditDesc"]').val();
	var checkDesc = $('#communicateTable2').find('textarea[name="checkDesc"]').val();
	// 默认倒计时从当前编辑之后计时（3天）
	var pointEndDate = dateCal(Date.parse(new Date()), 3, 'day');
//	var pointEndDate = '2018-08-09 12:54:55';
	var log = '沟通情况汇总模块：';
	log += info_log($('#communicateForm').find('input,select,textarea'),'table');
	console.log(log);
	var data = $('#communicateForm').serialize()+'&returnsId='+_returnsId+'&operateType=0&pointEndDate='+pointEndDate+'&searchVal='+log;
	data = data + '&' + $('.logInfo .logForm').serialize();
	var $this = $(this);
	$this.attr('disabled',true);
	$.ajax({
		'type' : 'post',
		'url' : ctx + '/returnWorkbench/update',
		'dataType' : 'json',
		'data' : data,
		'success' : function(info){
			if (info.status == 'success') {
				$this.attr('disabled',false);
				$('#communicateTable1').find('.isCommunicated').text(isCommunicated == 1?'是':'否');
				$('#communicateTable1').find('.communicateDesc').text(communicateDesc);
				$('#communicateTable1').find('.isAudit').text(isAudit == 1?'是':'否');
				$('#communicateTable1').find('.auditDesc').text(auditDesc);
				$('#communicateTable1').find('.checkDesc').text(checkDesc);
				$('.agentPerson').text($('#userName').val());
				$('#communicateTable2').find('select[name="isCommunicated"]').attr('initial-value',isCommunicated==1?'是':isCommunicated==0?'否':'--');
				$('#communicateTable2').find('textarea[name="communicateDesc"]').attr('initial-value',communicateDesc);
				$('#communicateTable2').find('select[name="isAudit"]').attr('initial-value',isAudit==1?'是':isAudit==0?'否':'--');
				$('#communicateTable2').find('textarea[name="auditDesc"]').attr('initial-value',auditDesc);
				$('#communicateTable2').find('textarea[name="checkDesc"]').attr('initial-value',checkDesc);
				$('.communicateTotal').modal('hide');
			} else {
				$this.attr('disabled',false);
				swal('错误','保存错误',error);
			}
		},
		'error' : function(){
			$this.attr('disabled',false);
			toastr.error('系统错误');
		}
	})
})
/**
 * 资源汇总
 */
$('#resourceTable2').on('click','button.resourceBtn',function(){
	var isRegisterExam = $('#resourceTable2').find('[name="isRegisterExam"]').val();
	var registerExamDesc = $('#resourceTable2').find('[name="registerExamDesc"]').val();
	var forensicsProgress = $('#resourceTable2').find('[name="forensicsProgress"]').val();
	var returnCoopFee = $('#resourceTable2').find('[name="returnCoopFee"]').val();
	var coopFeeDesc = $('#resourceTable2').find('[name="coopFeeDesc"]').val();
	var refundCoopMoney = $('#resourceTable2').find('[name="refundCoopMoney"]').val();
	var refundCoopMoneyDesc = $('#resourceTable2').find('[name="refundCoopMoneyDesc"]').val();
	var refundTime = $('#resourceTable2').find('[name="refundTime"]').val();
	var refundTimeDesc = $('#resourceTable2').find('[name="refundTimeDesc"]').val();
	var cantBack = $('#resourceTable2').find('[name="cantBack"]').val();
	var cantBackDesc = $('#resourceTable2').find('[name="cantBackDesc"]').val();
	var isCredit = $('#resourceTable2').find('[name="isCredit"]').val();
	var creditDesc = $('#resourceTable2').find('[name="creditDesc"]').val();
	var resourceSuggest = $('#resourceTable2').find('[name="resourceSuggest"]').val();
	// 操作记录
	var log = '资源汇总模块：' + info_log($('.resourceForm').find('select,input,textarea'),'table');
	console.log('=============资源汇总===============\n'+log);
	// 默认倒计时从当前编辑之后计时（3天）
	var pointEndDate = dateCal(Date.parse(new Date()), 3, 'day');
	// 赋值infoManageId表单 
	var data = $('.resourceForm').serialize()+'&returnsId='+_returnsId+'&operateType=3&pointEndDate='+pointEndDate+'&searchVal='+log;
	data = data + '&' + $('.logInfo .logForm').serialize();
	var $this = $(this);
	$this.attr('disabled',true);
	$.ajax({
		'type':'post',
		'url':ctx + '/returnWorkbench/update',
		'data':data,
		'dataType':'json',
		'success':function(info){
			if (info.status == 'success') {
				$this.attr('disabled',false);
				$('#resourceTable1').find('.isRegisterExam').text(isRegisterExam==1?'是':isRegisterExam==0?'否':'--');
				$('#resourceTable1').find('.registerExamDesc').text(registerExamDesc);
				$('#resourceTable1').find('.forensicsProgress').text(forensicsProgress);
				$('#resourceTable1').find('.returnCoopFee').text(returnCoopFee==1?'是':returnCoopFee==0?'否':'--');
				$('#resourceTable1').find('.coopFeeDesc').text(coopFeeDesc);
				$('#resourceTable1').find('.refundCoopMoney').text(refundCoopMoney);
				$('#resourceTable1').find('.refundCoopMoneyDesc').text(refundCoopMoneyDesc);
				$('#resourceTable1').find('.refundTime').text(refundTime);
				$('#resourceTable1').find('.refundTimeDesc').text(refundTimeDesc);
				$('#resourceTable1').find('.cantBack').text(cantBack==1?'是':cantBack==0?'否':'--');
				$('#resourceTable1').find('.cantBackDesc').text(cantBackDesc);
				$('#resourceTable1').find('.isCredit').text(isCredit==1?'是':isCredit==0?'否':'--');
				$('#resourceTable1').find('.creditDesc').text(creditDesc);
				$('#resourceTable1').find('.resourceSuggest').text(resourceSuggest);
				// 页面原值更新
				$('#resourceTable2').find('[name="isRegisterExam"]').attr('initial-value',isRegisterExam == 1?'是':isRegisterExam == 0?'否':'--');
				$('#resourceTable2').find('[name="registerExamDesc"]').attr('initial-value',registerExamDesc);
				$('#resourceTable2').find('[name="forensicsProgress"]').attr('initial-value',forensicsProgress);
				$('#resourceTable2').find('[name="returnCoopFee"]').attr('initial-value',returnCoopFee==1?'是':returnCoopFee==0?'否':'--');
				$('#resourceTable2').find('[name="coopFeeDesc"]').attr('initial-value',coopFeeDesc);
				$('#resourceTable2').find('[name="refundCoopMoney"]').attr('initial-value',refundCoopMoney);
				$('#resourceTable2').find('[name="refundCoopMoneyDesc"]').attr('initial-value',refundCoopMoneyDesc);
				$('#resourceTable2').find('[name="refundTime"]').attr('initial-value',transferDateFormat(refundTime));
				$('#resourceTable2').find('[name="refundTimeDesc"]').attr('initial-value',refundTimeDesc);
				$('#resourceTable2').find('[name="cantBack"]').attr('initial-value',cantBack==1?'是':cantBack==0?'否':'--');
				$('#resourceTable2').find('[name="cantBackDesc"]').attr('initial-value',cantBackDesc);
				$('#resourceTable2').find('[name="isCredit"]').attr('initial-value',isCredit==1?'是':isCredit==0?'否':'--');
				$('#resourceTable2').find('[name="creditDesc"]').attr('initial-value',creditDesc);
				$('#resourceTable2').find('[name="resourceSuggest"]').attr('initial-value',resourceSuggest);
				$('#agentZY1').text($('#userName').val());
				$('.resourceTotal').modal('hide');
//				$('#resourceTable2').find('input,select,textarea').each(function(){
//					$(this).val('');
//				});
			} else {
				$this.attr('disabled',false);
				swal('错误','保存错误',error);
			}
		},
		'error':function(){
			$this.attr('disabled',false);
			toastr.error('系统错误')
		}
	})
})
// 退费方案描述
$(document).on('click','.returnDes',function(){
  var $this = $(this);
  $this.attr('disabled',true);
  $('#relatedCharges2').attr('delete-fee','');
  // 相关扣费固有
  $.ajax({
 	'type' : 'post',
 	'url' : ctx + '/studentServiceCenter/queryFeeDeduction',
 	'dataType' : 'json',
 	'data' : {
 		infoManageId : _infoManageId,
  		productId : _productId
 	},
 	'success' : function(data){
 		if(data.status=="success"){
 			$this.attr('disabled',false);
 			$('#relatedCharges2 tbody').html('');
 			var totalKF = 0; // 相关扣费总计
  			$.each(data.data,function(index,obj){
  				var str ="";
  				str+='<tr>'
  					+'<th scope="row">'+obj.payName
  					+'<input type="hidden" name="collectId" value="'
 					+obj.payCodeId
  					+'"/></th>'
  					+'<td>'+obj.yjValue+'</td>'
  					+'<td>'+obj.sjValue+'</td>'
  					+'<td>'+(obj.zhiChu-obj.returnCompMoney)+'</td>'
  					+'<td>';
  					var flagNum = 0;
					if (data.data.length!=(index+1)){
						str += '<div class="row addpay">';
						var html = '';
						var fl = 0;
						for (var j = 0; j < XGKF.length; j++) {
							var clz2;
							if (obj.payCodeId == XGKF[j].collectId) {
								fl++;
								var initVal = '';
								var html_l = '';
								html += '<div class="form-group col-lg-12 col-md-12 col-sm-12">'+
		             						'<div class="col-lg-5 col-md-5 col-sm-5">';
								$.each(_koufei,function(i,val){
									if (val.productReturnFeeId == XGKF[j].typeId) {
										initVal = val.productReturnFeeName;
										html_l += '<option value="'+val.productReturnFeeId+'" selected>'+val.productReturnFeeName+'</option>';
									} else{
										html_l += '<option value="'+val.productReturnFeeId+'">'+val.productReturnFeeName+'</option>';
									}
								})
		             			html +=		'<select class="form-control chosen-select exit-fee" initial-value="'+initVal+'" name="typeId">';
								html += html_l;
								if (fl == 1) {
									clz2 = 'fa fa-plus-circle blue addpay-btn';
								} else {
									clz2 = 'fa fa-minus-circle red exist-minus removepay-btn';
								}
				          		html +=	'</select>'+
		             						'</div>'+
		             						'<div class="col-lg-5 col-md-5 col-sm-5">'+
		             						'<input type="text" class="form-control exit-fee" name="dedMoney" initial-value="'+XGKF[j].dedMoney+'" value="'+XGKF[j].dedMoney+'">'+
		             						'</div>'+
		             						'<div class="col-lg-2 col-md-2 col-sm-2">'+
				          					'<i class="'+clz2+'" style="font-size:20px;line-height:34px;cursor:pointer"></i>'+
				          					'</div>'+
		             					'</div>';
								flagNum += XGKF[j].dedMoney*100;
								totalKF += XGKF[j].dedMoney*100;
							}
					}
					if (html == '') {
					html = '<div class="form-group col-lg-12 col-md-12 col-sm-12">' +
								'<div class="col-lg-5 col-md-5 col-sm-5">'+
								'<select class="form-control chosen-select" name="typeId">'+
								'<option value="">--请选择--</option>'
							$.each(_koufei,function(i,val){
								html += '<option value="'+val.productReturnFeeId+'">'+val.productReturnFeeName+'</option>';
							})		
					html +=		'</select>'+
								'</div>'+
								'<div class="col-lg-5 col-md-5 col-sm-5">'+
								'<input type="text" class="form-control" name="dedMoney"/>'+
								'</div>'+
								'<div class="col-lg-2 col-md-2 col-sm-2">'+
								'<i class="fa fa-plus-circle blue addpay-btn" style="font-size:20px;line-height:34px;cursor:pointer"></i>'+
								'</div>'+
							'</div>';
					}
					str += html;
					str += '</div>'
					str += '</td><td>'+((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-flagNum)/100)+'</td></tr>';
				} else {
					str += totalKF/100;
					str += '</td><td>'+((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-totalKF)/100)+'</td></tr>';
				}
  				$('#relatedCharges2 tbody').append(str);
  				$(document).on('click','.removepay-btn',function(){
  					if ($(this).hasClass('exist-minus')) {
  						var del_log = $('#relatedCharges2').attr('delete-fee')?$('#relatedCharges2').attr('delete-fee'):'';
  	  					del_log += '删除\"' + $(this).parent().parent().find('select[name="typeId"] option:selected').text().trim() + '\"；';
  	  					$('#relatedCharges2').attr('delete-fee',del_log);
					}
  			        var shijiao = Number($(this).parents('tr').find('td:eq(1)').text());
  					var zhichu = Number($(this).parents('tr').find('td:eq(2)').text());
  					var $jt = $(this).parents('td');
  					$(this).parent().parent().remove();
  				        var temp = 0;
  				        $jt.find('input[name="dedMoney"]').each(function(){
  						if ($(this).val() != '') {
  							temp += Number($(this).val())*100;
  						}
  					})
  					$jt.parents('tr').find('td:last').text((shijiao*100-zhichu*100-temp)/100);
  			    })
  			    if (index == data.data.length-1) {
  			    	$('.chargeBackMoney').text((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-totalKF)/100);
   					$('input[name="chargeBackMoney"]').val((obj.sjValue*100-obj.zhiChu*100+obj.returnCompMoney*100-totalKF)/100);
				}
  			})
			$('.chosen-select').trigger('chosen:updated');
		    $('.chosen-select').chosen();

  			// 绑定失去焦点事件
  			$(document).on('blur', 'input[name="dedMoney"]', function(){
  				var num = $(this).val();
  				$(this).val(Number(num));
  			})
  			// 绑定实时事件
  			$(document).on('input porpertychange', 'input[name="dedMoney"]', function(){
  				var num = $(this).val();
  				// 为适应及时事件更改正则,并添加失焦事件完善验证
  				var rg = /^\d+\.?\d{0,2}$/;
  				if (num.match(rg) == null) {
  					$(this).val('');
  					toastr.error('金额格式不正确，应为最多两位小数的正数');
  				}
  				num = Number(num);
  				var shijiao = Number($(this).parents('tr').find('td:eq(1)').text());
  				var zhichu = Number($(this).parents('tr').find('td:eq(2)').text());
  				var tui = Number($(this).parents('tr').find('td:last').text());
  				// 为避免精度丢失，对数值*100最后再做/100处理
  				if ((shijiao*100-zhichu*100-num*100)/100 < 0) {
					toastr.error('超出当前应退额度');
					$(this).val('');
					$(this).parents('tr').find('td:last').text((shijiao*100-zhichu*100)/100);
					var temp2 = 0;
					$('#relatedCharges2').find('input[name="dedMoney"]').each(function(){
						if ($(this).val() != '') {
							temp2 += Number($(this).val())*100;
						}
					})
					$('#relatedCharges2 tbody tr:last td:eq(3)').text(temp2/100);
				} else{
					var temp = 0;
					$(this).parents('td').find('input[name="dedMoney"]').each(function(){
						if ($(this).val() != '') {
							temp += Number($(this).val())*100;
						}
					})
					$(this).parents('tr').find('td:last').text((shijiao*100-zhichu*100-temp)/100);
					var temp2 = 0;
					$('#relatedCharges2').find('input[name="dedMoney"]').each(function(){
						if ($(this).val() != '') {
							temp2 += Number($(this).val())*100;
						}
					})
					$('#relatedCharges2 tbody tr:last td:eq(3)').text(temp2/100);
					var temp3 = 0;
					$('#relatedCharges2 tbody tr').each(function(index){
						
						if (index != $('#relatedCharges2 tbody tr').length-1) {
							temp3 +=Number($(this).find('td:last').text())*100;
						}
					})
					$('#relatedCharges2 tbody tr:last td:last').text(temp3/100);
					$('input[name="chargeBackMoney"]').val(temp3/100);
				}
  			})
  			// 扣费相关的js加减项
  			addRemovePay();
  		}else{
  			$this.attr('disabled',false);
  			swal("", "查询缴费信息失败！", "error");
  		}
 	},
 	'error' : function(){
 		$this.attr('disabled',false);
 		toastr.error('系统错误');
 	}
  })
})

/**
 * 相关扣费中＋-的js效果
 */
function addRemovePay(){
	$('.addpay-btn').on('click',function(){
		    var html = `
		        <div class="form-group col-lg-12 col-md-12 col-sm-12 new-fee">
		            <div class="col-lg-5 col-md-5 col-sm-5">
		                <select class="form-control" name="typeId">
		                </select>
		            </div>
		            <div class="col-lg-5 col-md-5 col-sm-5">
		                <input type="text" class="form-control" name="dedMoney">
		            </div>
		            <div class="col-lg-2 col-md-2 col-sm-2">
		                <i class="fa fa-minus-circle red removepay-btn" style="font-size:20px;line-height:34px;cursor:pointer"></i>
		            </div>
		        </div>
		    `
		    $(this).parent().parent().parent().append(html);
		    loadPayFee($(this).parent().parent().nextAll('div').last().find('select[name="typeId"]'),_koufei);
		})
	$('.removepay-btn').click(function(){
        var shijiao = Number($(this).parents('tr').find('td:eq(1)').text());
		var zhichu = Number($(this).parents('tr').find('td:eq(2)').text());
		var $jt = $(this).parents('td');
		$(this).parent().parent().remove();
	        var temp = 0;
	        $jt.find('input[name="dedMoney"]').each(function(){
			if ($(this).val() != '') {
				temp += Number($(this).val())*100;
			}
		})
		$jt.parents('tr').find('td:last').text((shijiao*100-zhichu*100-temp)/100);
    })
}

// 初始化扣费种类
var _koufei = new Array();
$.ajax({
	'type':'post',
	'url': ctx + '/productReturnFee/selectAll',
	'data':{'enable':1},
	'dataType':'json',
	'success':function(info){
		if (info.status = 'success') {
			_koufei = info.list;
		}
	}
})
/**
 * 加载扣费option
 * 
 * @param jquery
 *            对象
 * @param data
 *            加载源数据
 * @returns
 */
function loadPayFee($jq,data){
	var option = '<option value="">--请选择--</option>';
	if (data instanceof Array) {
		$.each(data,function(index,obj){
			option += '<option value="'+obj.productReturnFeeId+'">'+obj.productReturnFeeName+'</option>';
		})
	} else {
		toastr.error('加载源数据不是匹配！');
	}
	$jq.html(option);
	$jq.trigger('chosen:updated');
	$jq.chosen();
}
/**
 * 指定退费方案
 */
$('#refundDescTable2').on('click','button.refundDBtn',function(){
	var chargeBackMoney = $('#refundDescTable2').find('[name="chargeBackMoney"]').val();
	var chargeEndTime = $('#refundDescTable2').find('[name="chargeEndTime"]').val();
	var chargeDesc = $('#refundDescTable2').find('[name="chargeDesc"]').val();
	var returnInfo = {};
	returnInfo.chargeBackMoney = chargeBackMoney;
	returnInfo.chargeEndTime = chargeEndTime;
	returnInfo.chargeDesc = chargeDesc;
	returnInfo.returnsId = _returnsId;
	var log1 = info_log($('#lastDesc').find('input,select,textarea'),'strict-table');// 退费方案描述操作记录
	var logRelat1 = info_log($('#relatedCharges2').find('.exit-fee'),'row-table');// 相关扣费编辑操作记录
	var logRelat2 = '';
	$('#relatedCharges2').find('.new-fee').each(function(){
		var val1 = $(this).find('select[name="typeId"] option:selected').text().trim();
		var val2 = $(this).find('input[name="dedMoney"]').val();
		var row = $(this).parents('tr').find('th:first').text().trim();
		var cols = $(this).parents('table').find('thead th:eq('+$(this).parents('td,th').index()+')').text().trim();
		if (val2 != 0) {
			logRelat2 += '新增 \"' + row + '\"下\"' + cols + '\"，内容为\"' + val1 + '\"、\"' + val2 + '元\"；';
		}
	})
	// 删除相关扣费操作记录
	var logRelat3 =  $('#relatedCharges2').attr('delete-fee')? $('#relatedCharges2').attr('delete-fee'):'';
	// 组装扣费数据集合
	var list = [];
	$('#refundDescTable2 select[name="typeId"]').each(function(){
		var obj = {};
		obj.typeId = $(this).val();
		var dmon = $(this).parent().next('div').find('input[name="dedMoney"]').val();
		var coll = $(this).parents('tr').find('input[name="collectId"]').val();
		// 如果当前扣费类别未选或者扣费金额为0则剔除数据
		if (dmon == undefined || dmon == 0 || coll == '' || coll == undefined) {
			return true;
		}
		obj.dedMoney = dmon;
		obj.collectId = coll;
		obj.returnId = _returnsId;
		list.push(obj);
	})
	console.log('=============退费方案==============\n'+(log1+logRelat1+logRelat2+logRelat3));
	$.ajax({
		'type':'post',
		'url': ctx + '/returnWorkbench/saveDed',
		'dataType':'json',
		'data':{
			'infoManageId':_infoManageId,
			'productId' : _productId,
			'infoList':JSON.stringify(list),
			'returnInfo':JSON.stringify(returnInfo),
			'searchVal':log1+logRelat1+logRelat2+logRelat3
		},
		'success':function(info){
			if (info.status == 'success') {
				$('#refundDescTable1').find('.chargeBackMoney').text(chargeBackMoney);
				$('#refundDescTable1').find('.chargeEndTime').text(transferDateFormat(chargeEndTime));
				$('#refundDescTable1').find('.chargeDesc').text(chargeDesc);
				$('#agentKF1').text($('#userName').val());
				$('.refundDescTotal').modal('hide');
				$('.return-descrip').modal('hide');
				DataTable.init();
				$('#refundDescTable2').find('input,select,textarea').each(function(){
					$(this).val('');
				});
			} else {
				swal('错误','保存错误',error);
			}
		}
	})
})

/**
 * 退费申请期次弹窗内期次加载
 */
$('.formulateScheme').on('click',function(){
	$('#refundIssue').attr('minus-log','');
	applyMoneyValide();
	var issue = [],issueStr = $('#refundIssue').attr('data-issue');
	if (issueStr != undefined) {
		issue = JSON.parse(issueStr);
	}
	var htm;
	$.each(issue,function(i,val){
		// 日期转化
		var date = transferDateFormat(val.applyDate);
		htm += 
	`
		<tr class="exist-applytr">
                <th scope="row">
                <input type="hidden" class="form-issue" name="returnId" value="${_returnsId}"/>
				<input type="hidden" class="form-issue" name="applyIssueId" value="${val.applyIssueId}">
                <input type="text" class="form-control form-issue" name="applyMoney" initial-value="${val.applyMoney}" value="${val.applyMoney}">
                </th>
                <td>
                    <div class="input-group">
                        <input class="form-control date-picker form_datetime form-issue" type="text" name="applyDate" value="${date}" initial-value="${date}" readonly>
                        <span class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </span>
                    </div> 
                </td>
                <td>
                    <textarea class="form-control form-issue" initial-value="${val.remark}" name="remark" rows="2">${val.remark}</textarea>
                </td>
                <td>`
            if (i == 0) {
            	htm += `<i class="fa fa-plus-circle add-btn"></i>`
			} else {
				htm += `<i class="fa fa-minus-circle cancel-btn"></i>`
			}   
               	htm += `</td>
            </tr>
		`
	})
	$('#refundIssue tbody').html(htm);
	$('.cancel-btn').click(function(){
    	var m = $(this).parent().parent().find('input[name="applyMoney"]').val();
        var d = $(this).parent().parent().find('input[name="applyDate"]').val();
        var r = $(this).parent().parent().find('textarea[name="remark"]').val();
        var addLog = '删除\"金额：'+ m + '，申请日期：' + d + '，备注：' + r + '\"的退费申请数据行；';
        var minusLog = $(this).parents('table').attr('minus-log') ? $(this).parents('table').attr('minus-log') : '';
        $(this).parents('table').attr('minus-log',(minusLog+addLog));
        $(this).parent().parent().remove();
    })
	dataFormat();
})

/**
 * 字符格式的日期比较
 */
function compareDateStr(dateStr1,dateStr2){
	var str1 = dateStr1.replace(/-/g,'\/');
	var str2 = dateStr2.replace(/-/g,'\/');
	if ((new Date(str1)) > (new Date(str2))) {
		return true;
	} else{
		return false;
	}
}

/**
 * 退费申请确定按钮
 */
$('#refundApplyTable2').on('click','button.applyAmountBtn',function(){
	// 期次
	var issue = [];
	$('#issueApplyReturnId').val(_returnsId);
	var numFlag = 1;
//	var tipFlag = false;
	// 最晚支付日期
	var lastDate = $('#refundDescTable1 .chargeEndTime').text().trim();
	$('#refundApplyTable2 table tbody tr').each(function(){
//		var datestr = $(this).find('input[name="applyDate"]').val().trim();
//		if (compareDateStr(datestr,lastDate)) {
//			toastr.error('')
//			tipFlag = true;
//			return false;
//		}
		var seriObj = $(this).find('.form-issue').serializeObject();
		seriObj.issueNum = numFlag;
		issue.push(seriObj);
		numFlag++;
	})
	$('#refundApply').attr('data-issue',JSON.stringify(issue));
	// 操作日志记录
	var issueLog1 = info_log($('.exist-applytr').find('input,select,textarea'),'strict-table');// 编辑记录
	var issueLog2 = $('#refundIssue').attr('minus-log');// 删除记录
	var issueLog3 = '';// 新增记录
	$('#refundIssue').find('.new-tr').each(function(){
		var m = $(this).find('input[name="applyMoney"]').val();
        var d = $(this).find('input[name="applyDate"]').val();
        var r = $(this).find('textarea[name="remark"]').val();
        issueLog3 += '新增 \"金额：'+ m + '、申请日期：' + d + '、备注：' + r + '\"的退费申请数据行；';
	});
	var issue_log = issueLog1 + issueLog2 + issueLog3;
	console.log('=============退费申请期次============\n'+issue_log);
	// 保存申请期次
	$.ajax({
		'type':'post',
		'url': ctx + '/returnWorkbench/saveIssues',
		'dataType':'json',
		'data':{
			'infoManageId':_infoManageId,
			'productId':_productId,
			'info':JSON.stringify(issue),
			'returnId':_returnsId,
			'searchVal':issue_log
		},
		'success':function(info){
			if (info.status == 'success') {
				toastr.info('期次保存成功');
				$('.return-descrip').modal('hide');
				$('.refundApplyTotal').modal('hide');
				DataTable.init();
			} else {
				swal('错误','申请期次保存错误',error);
			}
		}
	})
	
	// （账户）
	var invoiceTitle = $('#refundApplyTable2').find('[name="invoiceTitle"]').val();
	var recevier = $('#refundApplyTable2').find('[name="recevier"]').val();
	var expendituresDesc = $('#refundApplyTable2').find('[name="expendituresDesc"]').val();
	var openBank = $('#refundApplyTable2').find('[name="openBank"]').val();
	var openProvince = $('#refundApplyTable2').find('[name="openProvince"]').val();
	var openCity = $('#refundApplyTable2').find('[name="openCity"]').val();
	var amount = $('#refundApplyTable2').find('[name="amount"]').val();
	var amonutName = $('#refundApplyTable2').find('[name="amonutName"]').val();
	var phone = $('#refundApplyTable2').find('[name="phone"]').val();
	var amountDesc = $(document.getElementsByTagName('iframe')[2].contentWindow.document.body).html();
	// 退费申请账户操作记录
	var amountLog = '退费申请详细' + info_log($('#accountDesc').find('input,select,textarea'),'label');
	console.log('============退费申请详细==========\n'+amountLog);
	// 默认倒计时从当前编辑之后计时（3天）
	var pointEndDate = dateCal(Date.parse(new Date()), 3, 'day');
	var data = $('#accountDesc').serialize()+'&returnsId='+_returnsId+'&amountDesc='+amountDesc+'&operateType=2&pointEndDate='+pointEndDate;
	data = data + '&' + $('.logInfo .logForm').serialize();
	// 保存账号信息
	$.ajax({
		'type':'post',
		'url': ctx + '/returnWorkbench/update',
		'dataType':'json',
		'data':data,
		'success':function(info){
			if (info.status == 'success') {
				$('#amountTable1').find('.invoiceTitle').text(invoiceTitle);
				$('#amountTable1').find('.expendituresDesc').text(expendituresDesc);
				$('#amountTable1').find('.openBank').text(openBank);
				$('#amountTable1').find('.openProvince').text(openProvince);
				$('#amountTable1').find('.openCity').text(openCity);
				$('#amountTable1').find('.amount').text(amount);
				$('#amountTable1').find('.recevier').text(recevier);
				$('#amountTable1').find('.amonutName').text(amonutName);
				$('#amountTable1').find('.phone').text(phone);
				$('#amountTable1').find('.amountDesc').val(amountDesc);
				toastr.success('账户信息保存成功');
				$('.return-descrip').modal('hide');
				$('.refundApplyTotal').modal('hide');
				DataTable.init();
			}
		},
		'error':function(){
			toastr.error('账户信息保存错误');
		}
	})	
	$('#amountTable1').find('input,select,textarea').each(function(){
		$(this).val('');
	});
	$(document.getElementsByTagName('iframe')[2].contentWindow.document.body).html('');
})

/**
 * 加载责任弹窗option信息
 * 
 * @param $jq
 * @param data
 * @param type
 *            1-部门 2-员工
 * @returns
 */
function loadDepDuty($jq, data, type){
	if (!(data instanceof Array)) {
//		toastr.error('责任鉴定弹窗内容数据源非数组错误');
		data = new Array(0);
	}
	var opt = '<option>--请选择--</option>';
	if (type == 1) {
		$.each(data, function(i,val){
			opt += '<option value="'+val.dep.departmentId+'"'+
			' data-value=\''+JSON.stringify(val.users)+'\'>'+val.dep.fullName+'</option>';
		})
	} else if (type == 2){
		$.each(data, function(i,val){
			opt += '<option value="'+val.userId+'">'+val.realName+'</option>';
		})
	}
	$jq.html(opt);
	$jq.trigger('chosen:updated');
	$jq.chosen();
}

/**
 * 责任鉴定按钮
 */
$('.returnDutyBtn').on('click',function(){
	var dutyData=[],dutyDatastr = $('.zerenren').attr('duty-data');
	if (dutyDatastr != undefined && dutyDatastr != '') {
		dutyData = JSON.parse(dutyDatastr);
	}
	$('.zerenren tbody tr').remove();
	if (dutyData.length > 0) {// 加载已有责任鉴定
		dutyShow(dutyData);
	} else {// 保持原有默认tr并赋值其内下拉框
		var htm = 
			`
			<tr parent-tr="parent-1">
	            <td rowspan="1" class="rows">
	                <div>
	                    <select name="dutyDepartmentId" class="form-control chosen-select">
	                    </select>
	                </div>
	            </td>
	            <td rowspan="1" class="rows">
	                <select class="form-control chosen-select" name="isWithdraw">
	                	<option>--请选择--</option>
	                    <option value="1">是</option>
	                    <option value="0">否</option>
	                </select>
	            </td>
	            <td>
	            <div>
	                <div class="row col-lg-12 col-md-12 col-sm-12">
	                	<div class="col-lg-10 col-md-10 col-sm-10">
	                	<input type="hidden" name="dutyDepartmentId" class="form-require"/>
	                	<input type="hidden" name="isWithdraw" class="form-require"/>
	                        <select name="dutyPersonId" class="form-control form-require chosen-select">
	                            <option value="">--请选择--</option>
	                        </select>
	                    </div>
	                    <div class="col-lg-2 col-md-2 col-sm-2 childNode">
	                    	<i class="fa fa-plus-circle add-rena operate-btn" style="line-height:34px;font-size:20px;color: rgb(0, 160, 233);cursor: pointer;"></i>
	                    </div>
	                </div>
	            </div>
	            </td>
	            <td>
	                <input type="text" class="form-control form-require" name="penalty"/>
	            </td>
	        </tr>
			`
		$('.zerenren tbody').html(htm);
		$('.chosen-select').trigger('chosen:updated');
		$('.chosen-select').chosen();
		transSelect();
		var departstr = $('.zerenren').attr('depart');
		var departs = JSON.parse(departstr);
		loadDepDuty($('.zerenren select[name="dutyDepartmentId"]'), departs, 1);
	}
	
})
/**
 * 编辑下责任鉴定弹窗展示
 */
function dutyShow(data){
	if (!(data instanceof Array)) {
		toastr.error('责任鉴定数据错误');
		return;
	}
	var departs = JSON.parse($('.zerenren').attr('depart'));
	var str;
	var index = 0;
	var row = 1; // rowspan的值
	for (var i = 0; i < data.length; i++) {
		var clzOpt;
		var userTem; // 临时保存员工信息
		if (i == 0 || data[i].dutyDepartmentId != data[i-1].dutyDepartmentId) {
			index++;
			clzOpt = 'fa fa-plus-circle add-rena operate-btn';
			var str_1 = '';// 责任部门option信息
			var str_2 = '';// 是否收回分成option信息 
			var initVal1 = '';// 责任部门原始值
			var initVal2 = ''; // 是否收回分成原始值
			for (var j = 0; j < departs.length; j++) {
				if (departs[j].dep.departmentId == data[i].dutyDepartmentId) {
					initVal1 = departs[j].dep.fullName;
					userTem = departs[j].users?departs[j].users:[];
					str_1 += '<option value="'+departs[j].dep.departmentId+
							'" data-value=\''+JSON.stringify(departs[j].users)+'\' selected>'+departs[j].dep.fullName+'</option>';
				} else {
					str_1 += '<option value="'+departs[j].dep.departmentId+
							'" data-value=\''+JSON.stringify(departs[j].users)+'\'>'+departs[j].dep.fullName+'</option>';
				}
			}
			if (data[i].isWithdraw == 1) {
				initVal2 = '是';
				str_2 += '<option value="1" selected> 是</option>'+
					   '<option value="0"> 否</option>';
			} else {
				initVal2 = '否';
				str_2 += '<option value="1"> 是</option>'+
					   '<option value="0" selected> 否</option>';
			}
			str = '<tr parent-tr="parent-'+index+'" class="existDuty">'+
            		'<td scope="row" rowspan="1" class="rows">'+
            		'<div>'+
            			'<select class="form-control chosen-select" name="dutyDepartmentId" initial-value="'+initVal1+'" mean-title="责任部门">'+
            			'<option>--请选择--</option>';
				str += str_1;
            	str +=	'</select>'+
            		'</div>'+
            		'</td>'+
            		'<td rowspan="1" class="rows">'+
            			'<select class="form-control chosen-select" name="isWithdraw" initial-value="'+initVal2+'" mean-title="是否收回分成">';
            			str += str_2;
            	str +=  '</select>'+
            		'</td>';
		} else if (data[i].dutyDepartmentId == data[i-1].dutyDepartmentId){
			clzOpt = 'fa fa-minus-circle red remove-ren operate-btn exist-minus';
			str = '<tr child-tr="parent-'+index+'" class="existDuty">';
			row++;
			// 上下合并单元格
			$('.zerenren tbody tr[parent-tr="parent-'+index+'"] td.rows').each(function(){
				$(this).attr('rowspan',row);
			});
		}
		var str_3 = '';// 责任人option信息
		var initVal3 = '';// 责任人原始值
		for (var m = 0; m < userTem.length; m++) {
			if (userTem[m].userId == data[i].dutyPersonId) {
				initVal3 = userTem[m].realName;
				str_3 += '<option value="'+userTem[m].userId+'" selected>'+userTem[m].realName+'</option>';
			} else {
				str_3 += '<option value="'+userTem[m].userId+'">'+userTem[m].realName+'</option>';
			}
		}
		str += '<td>'+
	            '<div class="zeren">'+
				'<div class="row col-lg-12 col-md-12 col-sm-12">'+
					'<input type="hidden" name="dutyDepartmentId" class="form-require" value="'+data[i].dutyDepartmentId+'"/>'+
                    '<input type="hidden" name="isWithdraw" class="form-require" value="'+data[i].isWithdraw+'"/>'+
	        		'<div class="col-lg-10 col-md-10 col-sm-10">'+
	                '<select name="dutyPersonId" class="form-control form-require chosen-select" initial-value="'+initVal3+'" mean-title="责任人">'+
					'	<option>--请选择--</option>';
					str += str_3;
		str +=      '</select>'+
	        		'</div>'+
	        		'<div class="col-lg-2 col-md-2 col-sm-2 childNode">'+
	            	'<i class="'+clzOpt+'" style="line-height:34px;font-size:20px;color: rgb(0, 160, 233);cursor: pointer;"></i>'+
	            	'</div>'+
	        	'</div>'+
	        	'</div>'+
        		'</td>'+
        		'<td>'+
        		'<input type="text" class="form-control form-require" initial-value="'+data[i].penalty+'" mean-title="惩罚金额" name="penalty" value="'+data[i].penalty+'">'+
        		'</td></tr>';
		$('.zerenren tbody').append(str);
		$('.zerenren tbody tr:last select').trigger('chosen:updated');
		$('.zerenren tbody tr:last select').chosen();
	}
	transSelect();
	$(document.getElementsByTagName('iframe')[3].contentWindow.document.body).html(data[0].remark);
	$('#dutyWinRemark').val(('\"'+data[0].remark+'\"'));
	$('#dutyWinRemark').attr('initial-value',('\"'+data[0].remark+'\"'));
}

/**
 * 责任部门和责任人关联绑定
 * 
 * @returns
 */
function transSelect(){
	$('select[name="dutyDepartmentId"]').change(function(){
		var departmentId = $(this).val();
		var curTr = $(this).parents('tr').attr('parent-tr');
		// 赋值input表单
		$(this).parents('tbody').find('tr').each(function(){
			var childTr = $(this).attr('child-tr');
			var parentTr = $(this).attr('parent-tr');
			if (curTr == childTr || curTr == parentTr) {
				$(this).find('input[name="dutyDepartmentId"]').val(departmentId);
			}
		})
		// 相关责任人select加载option
		var $cur = $(this).parents('tr');
		var users = $(this).find('option:selected').data('value');
		loadDepDuty($cur.find('select[name="dutyPersonId"]'), users, 2);
		$cur.siblings('tr').each(function(){
			if ($(this).attr('child-tr') == $cur.attr('parent-tr')) {
				loadDepDuty($(this).find('select[name="dutyPersonId"]'), users, 2);
			}
		})
		loadDepDuty($cur.find('select[name="dutyPersonId"]'), users, 2);
	})
	$('select[name="isWithdraw"]').change(function(){
		var isWithdraw = $(this).val();
		var curTr = $(this).parents('tr').attr('parent-tr');
		// 赋值input表单
		$(this).parents('tbody').find('tr').each(function(){
			var childTr = $(this).attr('child-tr');
			var parentTr = $(this).attr('parent-tr');
			if (curTr == childTr || curTr == parentTr) {
				$(this).find('input[name="isWithdraw"]').val(isWithdraw);
			}
		})
	})
}

/**
 * submit-duty 责任鉴定数据提交
 */
$('.return-duty').on('click','button.submit-duty',function(){
	$(this).attr('disabled',true);
	// 序列化表单数据集合
	var data = [];
	// 
	// 责任鉴定备注
	var remark = $(document.getElementsByTagName('iframe')[3].contentWindow.document.body).html();
	$('.zerenren tbody tr').each(function(){
		var obj = $(this).find('.form-require').serializeObject();
		obj.remark = remark;
		obj.infoManageId = _infoManageId;
		obj.changeReturnId = _returnsId;
		obj.productId = _productId;
		obj.changeReturnType = 1;
		data.push(obj);
	})
	var duty = {};
	duty.changeReturnId = _returnsId;
	duty.infoManageId = _infoManageId;
	duty.productId = _productId;
	duty.changeReturnType = 1;
	duty.operateType = 6;
	// 责任鉴定操作记录信息
	var dutyLog = '';
	var dutyLog1 = info_log($('.existDuty').find('input,select,textarea'),'');
	var dutyLog2 = '';
	var dutyLog3 = '';
	var num = 0;
	$('.newDuty').each(function(){
		 num++;
	})
	if (num > 0) {
		dutyLog2 = '新增了'+num+'条责任鉴定信息；';
	}
	var remark1 = $(document.getElementsByTagName('iframe')[3].contentWindow.document.body).html();
	var remark2 = $('#dutyWinRemark').attr('initial-value');
	if (remark1 != '' && remark1 != remark2) {
		remark1 = remark1.length > 15 ? (remark1.substr(0,15)+'...') : remark1;
		remark2 = remark2.length > 15 ? (remark2.substr(0,15)+'...') : remark2;
		dutyLog1 += '备注 由\"' + remark2 + '\"编辑为\"' + remark1 + '\"；';
	}
	dutyLog = '责任鉴定模块：' + dutyLog1 + dutyLog2 + dutyLog3;
	console.log('===================责任鉴定====================\n'+dutyLog);
	var $this = $(this);
	$.ajax({
		'url' : ctx + '/returnWorkbench/updateDuties',
		'type' : 'post',
		'dataType' : 'json',
		'data' : {
			'infoManageId':_infoManageId,
			'productId':_productId,
			'infoParam':JSON.stringify(data),
			'duty':JSON.stringify(duty),
			'searchVal':dutyLog
		},
		'success' : function(info){
			if (info.status == 'success') {
				$this.attr('disabled',false);
				$('.zerenren tbody tr').remove();
				swal('提交','责任鉴定提交成功','success');
				$('.return-descrip').modal('hide'); 
				$('.return-duty').modal('hide'); 
				DataTable.init();
			}
		},
		'error':function(){
			$(this).attr('disabled',false);
		}
	})
})

/**
 * 驳回
 */
$('.reject').on('click','button.disAgreeBtn',function(){
	$(this).attr('disabled',true);
	var flowPoint =	$('#title-tab').find('li[class="active"]').prev('li').find('a').data('value');
	var pointId =	$('#title-tab').find('li[class="active"]').find('a').data('value');
	if (!flowPoint) {
		toastr.error('当前环节不可驳回');
		$(this).attr('disabled',false);
		return
	}
	var chPoin = $('#title-tab').find('li[class="active"]').prev('li').find('a').text().trim();
	var $this = $(this);
	var rejectCause = $(document.getElementsByTagName('iframe')[1].contentWindow.document.body).html();
	$.ajax({
		'url' : ctx + '/returnWorkbench/rejectFront',
		'type' : 'post',
		'dataType' : 'json',
		'data' : {
			'infoManageId' : _infoManageId,
			'productId' : _productId,
			'returnsId' : _returnsId,
			'rejectCause' :rejectCause,
			'operateType' : 4,
			'flowId' : _feeFlowId,
			'pointId' : pointId,
			'searchVal' : '驳回到 '+chPoin
		},
		'success' : function(info){
			if (info.status == 'success') {
				$this.attr('disabled',false);
				$.post({rejectCause:rejectCause,returnId:_returnsId},ctx + '/returnWorkbenth/saveRejectCause',function(info){
					if (info.status == 'success') {
						toastr.success('保存驳回原因成功');
					}else{
						toastr.error('保存驳回原因失败');
					}
				},'json');
				toastr.success('成功驳回');
				$('.return-descrip').modal('hide'); 
				$('.reject').modal('hide'); 
				DataTable.init();
			}
		},
		'error' : function(){
			$this.attr('disabled',false);
			toastr.error('驳回系统错误');
		}
	})
})
/**
 * 特批
 */
$('.T-shirts').on('click','button.specialRatify',function(){
	$(this).attr('disabled',true);
	var $this =$(this);
	// 默认倒计时从当前编辑之后计时（3天）
	var pointEndDate = dateCal(Date.parse(new Date()), 3, 'day');
	$.ajax({
		'url' : ctx + '/returnWorkbench/update',
		'type' : 'post',
		'dataType' : 'json',
		'data' : {
			'specialRatify' : 1,
			'returnsId' : _returnsId, 
			'operateType' : 5,
			'infoManageId':_infoManageId,
			'productId':_productId,
			'pointEndDate':pointEndDate,
			'searchVal':'特批'
		},
		'success' : function(info){
			$(this).attr('disabled',false);
			$('.return-descrip').modal('hide'); 
			$('.T-shirts').modal('hide');
			DataTable.init();
		},
		'error' : function(){
			$this.attr('disabled',false);
			toastr.error('特批系统错误');
		}
	})
	$('.T-shirts').modal('hide');
	
})

function transStatus(infoManageId, productId, returnsId){
	swal({
		  title: "确认转化吗?",
		  text: "该信息将被转化",
		  type: "info",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "确认",
		  cancelButtonText: "取消",
		  closeOnConfirm: false,
		  closeOnCancel: false
		},
		function(isConfirm){
		  if (isConfirm) {
			 transformStatus(infoManageId, productId, returnsId);
		  } else {
		    swal("取消", "已经取消转化", "error");
		  }
		});

}

/**
 * 退费信息--转化
 * 
 * @param infoManageId
 * @param productId
 * @returns
 */
function transformStatus(infoManageId, productId, returnsId){
	$.ajax({
		'type' : 'post',
		'dataType' : 'json',
		'data' : {
			'infoManageId': infoManageId, 
			'productId' : productId,
			'unAction' : 7,
			'enable' : 1,
			'returnsId' : returnsId,
			'operateType' : 7,
			'searchVal' : '转化'
		},
		'url' : ctx + '/returnWorkbench/transform',
		'success' : function(info){
			if (info.status == 'success') {
				swal('转化','转化成功','success');
				DataTable.init();
			}
		},
		'error' : function(){
			toastr.error('系统错误');
		}
	})
}

/**
 * 转化按钮
 */
$(document).on('click','button.transformBtn',function(){
	transformStatus(_infoManageId, _productId, _returnsId);
	$('.return-descrip').modal('hide'); 
	$('.transform').modal('hide');
})

/**
 * 环节流转
 */
$(document).on('click','button.totalSum',function(){
// $('#hideForm').serialize();
	$(this).attr('disabled',true);
	var $this = $(this);
	var flowPoint =	$('#title-tab').find('li[class="active"]').next('li').find('a').data('value');
	if (!flowPoint) {
		var data = {};
		$.ajax({
			'type':'post',
			'url':ctx + '/returnWorkbench/selectOne',
			'data':{'returnsId':_returnsId},
			'dataType':'json',
			'async':false,
			'success':function(info){
				if (info.status == 'success') {
					// 发票抬头
					data.invoiceTitle = info.data.invoiceTitle;
					// 支出明细
					data.expendDetail = info.data.expendituresDesc;
					// 开户行
					data.bankName = info.data.openBank;
					// 开卡所在省
					data.province = info.data.openProvince;
					// 开卡所在市
					data.city = info.data.openCity;
					// 收款人
					data.payeeName = info.data.recevier;
					// 账号
					data.accountNum = info.data.amount;
					// 户名
					data.accountName = info.data.amonutName;
					// 电话
					data.phone = info.data.phone;
					// 类别一级 固定为（财务中心<==>9）
					data.pCostclassId = 9;
					// 类别二级 固定为（退费<==>18）
					data.costclassId = 18;
					
				} else {
					toastr.error('获取退费信息错误');
				}
			},
			'error':function(){
				toastr.error('系统错误');
			}
		})
		
		// 支付渠道（集团支付）
		data.paymentFrom = 1;
		// 支付方式（汇款）
		data.payment = 2;
		// 支出类型（营业支出）
		data.expendType = 1;
		// 
		data.infoManageId = _infoManageId;
		// 产品
		data.projectId = _productId;
		// 申请地区
		data.departmentId2 = _departmentId1;
		// 调账
		data.isAdjustment = 0;
		// 收款人（空）
		data.payeeId ;
		// 
		data.returnsId = _returnsId;
		$.ajax({
			'url' : ctx + '/apply/addRecord',
			'type' : 'post',
			'dataType' : 'json',
			'data' : data,
			'success' : function(info){
				if (info.status != 'success') {
					$this.attr('disabled',false);
					toastr.error(info.msg);
					$(".refer").modal('hide');
					return
				}
				$('button.totalSum').attr('disabled',false);
				$(".return-descrip").modal('hide');
				$(".refer").modal('hide');
				swal('申请',info.msg,'success');
				DataTable.init();
			},
			'error' : function(){
				$this.attr('disabled',false);
				toastr.error('申请错误');
			}
		})
		
		$(this).attr('disabled',false);
		return
	}
	$('#hideNextPoint').val(flowPoint);
	var chCur =	$('#title-tab').find('li[class="active"]').find('a').text().trim();
	var chNext =	$('#title-tab').find('li[class="active"]').next('li').find('a').text().trim();
	// 默认倒计时从当前编辑之后计时（3天）
	var pointEndDate = dateCal(Date.parse(new Date()), 3, 'day');
	$.ajax({
		'url' : ctx + '/returnWorkbench/update',
		'type' : 'post',
		'dataType' : 'json',
		'data' : {
			'flowPoint':flowPoint,
			'returnsId':_returnsId, 
			'operateType' : 8,
			'infoManageId':_infoManageId,
			'productId':_productId,
			'pointEndDate':pointEndDate,
			'isWander':1,
			'searchVal':'从\"'+chCur+'\"流转到\"'+chNext+'\"'
		},
		'success' : function(info){
			$this.attr('disabled',false);
			$('button.totalSum').attr('disabled',false);
			$(".return-descrip").modal('hide');
			DataTable.init();
		},
		'error' : function(){
			$this.attr('disabled',false);
			toastr.error('流转系统错误');
		}
	})
	$(".refer").modal('hide');
})
/**
 * 申请金额总数验证
 * @returns
 */
function applyMoneyValide(){
	// 如果没有特批则进行计算是否超过总值
	if (_specialRatify == undefined || _specialRatify == null || _specialRatify != 1) {
		$(document).on('input porpertychange', 'input[name="applyMoney"]', function(){
			var num1 = Number($(this).val());
			var chargeBackMoney = Number($('th.chargeBackMoney').text()); 
			var totalN = 0;
			$('input[name="applyMoney"]').each(function(){
				if ($(this).val() == '' || Number($(this).val()) == 'NaN') {
					return true;
				}
				totalN += Number($(this).val())*100;
			})
			if (totalN/100 > chargeBackMoney) {
				$(this).val('');
				toastr.error('退费总和超出既定数：'+chargeBackMoney+'，当前最多为'+(chargeBackMoney*100-totalN+num1*100)/100);
			}
		})
	}
}  
/**
 * input表单金额数字验证
 * 
 * @param selector
 *            选择器
 * @returns 验证之后的数字结果
 */    
function validateInputNum(selector){
	var num = 0;
	// 绑定失去焦点事件
	$(document).on('blur', selector, function(){
		num = $(this).val();
		$(this).val(Number(num));
	})
	// 绑定实时事件
	$(document).on('input porpertychange', selector, function(){
		num = $(this).val();
		var rg = /^\d+\.?\d{0,2}$/;
		if (num.match(rg) == null && num != '') {
			$(this).val('');
			toastr.error('金额格式不正确，应为最多两位小数的正数');
		}
		num = Number(num);
	})
	return num;
}

/**
 * 表单序列为Json
 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/**
 * 字符串（yyyy-MM-dd）时间格式化
 */
function transferDateFormat(val) {
	var NumDate, date;
	if (typeof (val) == 'number') {
		NumDate = val;
		date = new Date(val);
	} else if (typeof (val) == 'string') {
		NumDate = Date.parse(val.replace(/-/g, '/'));
		date = new Date(NumDate);
	} else {
		NumDate = Date.parse(new Date());
		date = new Date(NumDate);
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? ('0' + month) : month;
	var day = date.getDate();
	day = day < 10 ? ('0' + day) : day;
	return year + '-' + month + '-' + day;
}
/**
 * 
 * @param date 时间戳
 * @param time 数字
 * @param timeType 级别（天，时，分，秒）=> day,hour,minute,second
 * @returns
 */
function dateCal(date, time, timeType) {
	  var extra;
	  switch (timeType) {
	    case 'day':
	      extra = 1000 * 60 * 60 * 24;
	      break;
	    case 'hour':
	      extra = 1000 * 60 * 60;
	      break;
	    case 'minute':
	      extra = 1000 * 60;
	      break;
	    case 'second':
	      extra = 1000;
	      break;
	    default:
	      extra = 0;
	  }
	  var date1 = new Date(date + time * extra);
	  var year = date1.getFullYear();
	  var month = date1.getMonth() + 1;
	  month = month < 10 ? ('0' + month) : month;
	  var day = date1.getDate();
	  day = day < 10 ? ('0' + day) : day;
	  var hour = date1.getHours();
	  hour = hour < 10 ? ('0' + hour) : hour;
	  var minute = date1.getMinutes();
	  minute = minute < 10 ? ('0' + minute) : minute;
	  var second = date1.getSeconds();
	  second = second < 10 ? ('0' + second) : second;
	  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	}

/**
 * 时间相差
 * @param startTime
 * @param endTime
 * @returns
 */
function GetDateDiff(startTime, endTime) {
	var result = '';
	var startTimeValue,endTimeValue;
	if (typeof (startTime) == 'number') {
		startTimeValue = startTime;
	} else if (typeof (startTime) == 'string') {
		startTimeValue = Date.parse(startTime.replace(/-/g,'\/'));
	}
	if (typeof (endTime) == 'number') {
		endTimeValue = endTime;
	} else if (typeof (endTime) == 'string') {
		endTimeValue = Date.parse(endTime.replace(/-/g,'\/'));
	} else {
		endTimeValue = startTimeValue;
	}
	var time = endTimeValue - startTimeValue;
	if (time < 0) {
		result = '-';
		time = - time;
	}
	var day = parseInt(time / (1000 * 3600 * 24));
	var hour = parseInt(time % (1000 * 3600 * 24) / (1000 * 3600));
	var minute = parseInt(time % (1000 * 3600 * 24) % (1000 * 3600) / (1000 * 60));
	if (day > 0) {
		result += day + '天';
	}
	if (hour > 0) {
		result += hour + '时';
	}
	if (minute > 0) {
		result += minute + '分';
	}
	if (result == '') {
		result = '无';
	}
	return result;
}
/**
 * 操作信息记录模板
 * @param $jQ jQuery对象
 * @param tag 
 * @returns 操作信息
 */
function info_log($jQ, tag){
  var log = '';
  $jQ.each(function(){
    var initial = $(this).attr('initial-value');
    var curVal = judgeTypeVal($(this));
    var meanTitle = '';
    // 如果当前标签可关联label信息
    if (tag == 'label') {
		meanTitle = $(this).parent().prev('label').text().trim();
	} else if (tag == 'strict-table') {
		meanTitle = $(this).parents('table').find('thead tr:first :eq('+$(this).parents('td,th').index()+')').text().trim();
	} else if (tag == 'row-table'){
		meanTitle = $(this).parents('tr').find('th:first').text().trim() + $(this).parents('table').find('thead tr:first :eq('+$(this).parents('td,th').index()+')').text().trim();
	}else {
		meanTitle = $(this).attr('mean-title');
	}
    if(initial != undefined && initial != '' && initial != curVal){
      initial = initial.length > 15 ? (initial.substr(0,15) + '...') : initial;
      curVal = curVal.length > 15 ? (curVal.substr(0,15) + '...') : curVal;
      log += meanTitle+' 由\"'+initial+'\"更改为\"'+curVal+'\"；';
    }
  })
  return log;
}
/**
 * select表单值替换为文本
 * @param $jQ jQuery对象
 * @returns 替换后的值
 */
function judgeTypeVal($jQ){
  if($jQ.prop('tagName') == 'SELECT'){
    return $jQ.find('option:selected').text().trim();
  } else {
    return $jQ.val();
  }    
}