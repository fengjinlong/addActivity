var DEPID;
var DateString;
$(function(){
    //申请
    $('#cooperationDivided').on('click','.apply-btn',function(){
        $('.applyExpendModal').modal('show')
    })
    
    //查常用联系人
	$.post(ctx + '/studentServiceCenter/queryBizFinancePayee',{
		
	},function(data){
		if(data.status=='success'){
			var str='<option value="" data-record="{}"> 请选择 </option>';
			$.each(data.data,function(index,obj){
				str+='<option value="'+obj.financePayeeId+'" data-record=\''+JSON.stringify(obj)+'\'> '+obj.accountName+' </option>';
			});
			$('select[name="payeeId"]').html(str);
			$('select[name="payeeId"]').trigger('chosen:updated');
		}else{
			swal("", "查询常用联系人失败！", "error");
		}
	},"json")
	
	//查费用类别  父类
	$.post(ctx + '/bizFinance/loadCostClass',{
		parentId:0
	},function(data){
		var str='<option value="" > 请选择 </option>';
		$.each(data,function(index,obj){
			str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
		});
		$('select[name="pCostclassId"]').html(str);
	},"json")
	
	
	//空支出父类change 动态加载子类费用类别
	$('#financeApplyForm select[name="pCostclassId"]').on('change',function(){
		var _this=this;
		//查费用类别  子类
		$.post(ctx + '/bizFinance/loadCostClass',{
			parentId:$(_this).val()
		},function(data){
			var str='';
			$.each(data,function(index,obj){
				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
			});
			$('#financeApplyForm select[name="costclassId"]').html(str);
		},"json")
	})
	
	//常用收款人change 
	$('#financeApplyForm select[name="payeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#financeApplyForm input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#financeApplyForm input[name="province"]').val(bizFinancePayee.province);
		$('#financeApplyForm input[name="city"]').val(bizFinancePayee.city);
		$('#financeApplyForm input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#financeApplyForm input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#financeApplyForm input[name="payeeName"]').val(bizFinancePayee.accountName);
		$('#financeApplyForm input[name="phone"]').val(bizFinancePayee.phone);
	})
	
	 //初始化部门
	 $.ajax({
			url:ctx+"/department/selectDepartementByUser2",
			dataType : "json",
			async:true,
			success:function(data){
				$('#financeApplyForm input[name=departmentId1]').val(data.departmentId);
				$('#financeApplyForm input[name=departmentName1]').val(data.fullName);
			}
		},"json")
    
    
    
    

    //申请说明富文本编辑器
   /* KindEditor.ready(function (K) {
        K.create('.applyExpendModal [name="content"]', {
            allowFileManager: true,
            resizeType: 0
        });
    });
*/
    //全选
    $('#cooperationDivided thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#cooperationDivided tbody .checkChild').prop('checked', true);
        }else{
            $('#cooperationDivided tbody .checkChild').prop('checked', false);
        }
    })

    //搜索日期
    $('.form_datetime').datetimepicker({
    	format: 'yyyy-mm',
        language: 'zh-CN',
        autoclose: true,
        startView: 3,
        minView: 3
    });
    
    
    DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#cooperationDivided').dataTable({
                    "bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
	             	"bLengthChange": true,//每页显示的记录数
	             	"bFilter": false, //搜索栏
	             	"bSort": true, //是否支持排序功能
	             	"bInfo": true, //显示表格信息
	             	"bAutoWidth": false,  //自适应宽度
	             	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
	             	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
	             	"sAjaxSource" : ctx+'/financeReport/getAll',
	         		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
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
	                        {"mData": "departmentName", 'sClass': "text-center"},
	 						{"mData": "repotMonth", 'sClass': "text-center"},
	 						{"mData": "sumPerformance", 'sClass': "text-center"},
	 						{"mData": "inFee", 'sClass': "text-center"},
	 						{"mData": "schoolFee", 'sClass': "text-center"},
	 						{"mData": "justFee", 'sClass': "text-center"},
	 						{"mData": "returnFee", 'sClass': "text-center"},
	 						{"mData": "againstFee", 'sClass': "text-center"},
	 						{"mData": "matFee", 'sClass': "text-center"},
	 						{"mData": "punishFee", 'sClass': "text-center"},
	 						{"mData": "awardFee", 'sClass': "text-center"},
	 						{"mData": "money", 'sClass': "text-center"},
	 						{"mData": "applicantUserName", 'sClass': "text-center"},
	 						{"mData": "applicantDate", 'sClass': "text-center"},
	 						{"mData": "applicantStatus", 'sClass': "text-center"},
	 						{
	 			                "mData": "applyId",
	 			                'sClass': "text-center",
	 			                "bSortable": false,
	 			                "mRender": function (data, type, full ) {
	 			                	var u = "<a data-record='"+JSON.stringify(full)+"' depId='"+full['departmentId']+"' dateString='"+full['repotMonth']+"' class='btn-check'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a> ";
	 			                	var s= "<a data-record='"+JSON.stringify(full)+"' class='finance-apply1' ><i class='fa fa-sign-out blue'  data-toggle='tooltip' data-placement='top' data-original-title='申请支出' title='申请支出'></i></a>";
	 			                	return u+s;
	 			                }
	 			            }

	                 ],
	                 "aoColumnDefs": [{
	 	   	            sDefaultContent: '',
	 	   	            aTargets: ['_all']
	 	   	        }],
	 	   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	 	   	     }
	 			});

	 			//每页显示记录数
	 		    $('.dataTables_info').parent().append($('.dataTables_length'));
	 		}
	 	}
	 }();
	 DataTable.init();
	 

	 
	 $('#cooperationDivided').on('click', '.finance-apply1', function () {
		 var obj=$.parseJSON( $(this).attr("data-record") );
		 //回显申请地区
		 $("#departmentName2").val(obj.departmentName);
		 $("#departmentId2").val(obj.departmentId);
		 //金额
		 if(obj.schoolFee!=null){
			 $('#financeApplyForm input[name="money"]').val(obj.schoolFee);
		 }
		 //主键
		 $("#reportId").val(obj.reportId);
		 $('.finance-apply').modal('show');
	 });
})

function sumAll(){
	 $.ajax({
	        url: ctx + '/financeReport/sumAll',
	        type: 'POST',
	        data: {
	        		repotMonth:$('#repotMonth').val(),
	        		searchVal:	$('#searchVal').val()
	        },
	        dataType: 'json',
	        success: function (data) {
	            data = data.data;
	            $('#adjustmentFee').html(data.adjustmentFee);
	            $('#againstFee').text(data.againstFee);
	            $('#awardFee').text(data.awardFee);
	            $('#justFee').text(data.justFee);
	            $('#inFee').text(data.inFee);
	            
	            $('#outFee').text(data.outFee);
	            $('#punishFee').text(data.punishFee);
	            $('#returnFee').text(data.returnFee);
	            $('#schoolFee').text(data.schoolFee);
	            $('#sumPerformance').text(data.sumPerformance);
	            $('#matFee').text(data.matFee);
	            
	        },
	        error: function (response) {
	            alert("系统错误");
	        }
	 });
}

function aiReport(e){
	 $(e).attr("disabled",true);
	 $(e).val('计算中');
	$.ajax({
        url: ctx + "/financeReport/reloadReport",
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        		toastr.success("已开始计算,执行时间大概5分钟左右,请耐心等待！");
        },
        error: function (response) {
        		toastr.success("请耐心等待！");
        }
    });
}

    function retrieveData(sSource, aoData, fnCallback, oSettings) {
        aoData.push({"name": "repotMonth", "value": $('#repotMonth').val()});
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        var searchVal = $('#searchVal').val();
        if (searchVal && searchVal.length != 0) {
            aoData.push({"name": "searchVal", "value": searchVal.trim()});
        }
        $.ajax({
            "url": sSource,
            "data": aoData,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (response) {
            		sumAll();
                fnCallback(response.returnObject);
            }
        });
    }


function search() {
	 DataTable.init();
}

function subApply(){
	$('.finance-apply').modal('hide');
	$.ajax({
        url: ctx + "/financeReport/addNewApply",
        type: 'POST',
        data: $('#financeApplyForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success"){
            	 DataTable.init();
            	toastr.success("添加成功");
            }else{
            	toastr.error("添加失败");
            }
        },
        error: function (response) {
        	toastr.error("系统错误");
        }
    });
}


//查看
$('#cooperationDivided').on('click','.btn-check',function(){
	DEPID=$(this).attr("depId");
	DateString=$(this).attr("dateString");
	initTable1();
	initTable2();
	initTable3();
	initTable4();
	$('.finance-look').modal('show');
})

function initTable1() {
    var init = $('#table1').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/financeReport/selectZc',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable1,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
            {"mDataProp": "counselor",'sClass': "text-center"},
            {"mDataProp": "studentAttrName2",'sClass': "text-center"},
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "projectName",'sClass': "text-center"},
            {"mDataProp": "bmCode",'sClass': "text-center", "mRender": function (data, type, full) {
            	return full['bmCode'];
	        }},
            {"mDataProp": "baoMDate",'sClass': "text-center", "mRender": function (data, type, full) {
            	return jsDateFormat(full['baoMDate']);
	        }},
            {"mDataProp": "createDate",'sClass': "text-center"},
            {"mDataProp": "payValue",'sClass': "text-center"},
            {"mDataProp": "payValue",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['isNeIf']==1){
            		return full['payValue']
            	}else{
            		return "";
            	}
	        }},
            {"mDataProp": "payValue",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['isNeIf']==2){
            		return full['payValue']
            	}else{
            		return "";
            	}
	        }},
            {"mDataProp": "scale",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['isNeIf']==1){
            		return full['scaleIn']
            	}else{
            		return full['scaleOut']
            	}
	        }},
	        {"mDataProp": "scale",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['isNeIf']==1){
            		return full['scale']
            	}else{
            		return "";
            	}
	        }},
            {"mDataProp": "scale",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['isNeIf']==2){
            		return full['scale']
            	}else{
            		return "";
            	}
	        }},
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table1_wrapper").removeClass();
    $('#table1_wrapper').addClass("table-scrollable");
    //每页显示记录数
    $('#table1_wrapper .dataTables_info').parent().append($('#table1_wrapper .dataTables_length'));
}
function initDataTable1(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
 	aoData.push({"name": "departmentId", "value":DEPID});
 	aoData.push({"name": "dateString", "value":DateString});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};


function initTable2() {
    var init = $('#table2').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/financeReport/selectFc',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable2,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
			/*{"mDataProp": "counselor",'sClass': "text-center"},
            {"mDataProp": "studentAttrName2",'sClass': "text-center"},*/
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "projectName",'sClass': "text-center"},
            {"mDataProp": "bmCode",'sClass': "text-center"},
            {"mDataProp": "applyCode",'sClass': "text-center"},
            {"mDataProp": "baoMDate",'sClass': "text-center", "mRender": function (data, type, full) {
            	return jsDateFormat(full['baoMDate']);
	        }},
            {"mDataProp": "createDate",'sClass': "text-center"},
            {"mDataProp": "money",'sClass': "text-center"},
            {"mDataProp": "scaleIn",'sClass': "text-center", "mRender": function (data, type, full) {
            	return full['money']*(full['scaleIn']/(full['scaleOut']+full['scaleIn']));
	        }},
            {"mDataProp": "scaleOut",'sClass': "text-center", "mRender": function (data, type, full) {
            	return full['money']*(full['scaleOut']/(full['scaleOut']+full['scaleIn']));
	        }},
            {"mDataProp": "koufei",'sClass': "text-center", "mRender": function (data, type, full) {
            	return "";
	        }},
	        {"mDataProp": "fanchou",'sClass': "text-center", "mRender": function (data, type, full) {
	        	return (full['money']*(full['scaleIn']/(full['scaleOut']+full['scaleIn']))*full['shouyi']['scale']+full['money']*(full['scaleOut']/(full['scaleOut']+full['scaleIn']))*full['zhichu']['scale'])
	        }},
            {"mDataProp": "scale",'sClass': "text-center", "mRender": function (data, type, full) {
            	return full['shouyi']['scale'];
	        }},
	        {"mDataProp": "scale",'sClass': "text-center", "mRender": function (data, type, full) {
	        	return full['zhichu']['scale'];
	        }},
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table2_wrapper").removeClass();
    $('#table2_wrapper').addClass("table-scrollable");
    //每页显示记录数
    $('#table2_wrapper .dataTables_info').parent().append($('#table2_wrapper .dataTables_length'));
}
function initDataTable2(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "departmentId", "value":DEPID});
 	aoData.push({"name": "dateString", "value":DateString});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

function initTable3() {
    var init = $('#table3').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "scrollX": true, 
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/financeReport/selectDf',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable3,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "projectName",'sClass': "text-center"},
            {"mDataProp": "bmCode",'sClass': "text-center"},
            {"mDataProp": "baoMDate",'sClass': "text-center", "mRender": function (data, type, full) {
            	return jsDateFormat(full['baoMDate']);
	        }},
            {"mDataProp": "money",'sClass': "text-center"},
            {"mDataProp": "kaowufei",'sClass': "text-center"},
            {"mDataProp": "applyCode",'sClass': "text-center"},
            {"mDataProp": "createDate",'sClass': "text-center"},
            {"mDataProp": "returnMoney",'sClass': "text-center"},
            {"mDataProp": "applyCode",'sClass': "text-center"},
            {"mDataProp": "createDate",'sClass': "text-center"},
            {"mDataProp": "returnMoney",'sClass': "text-center"},
            {"mDataProp": "dianfu",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['generalMoney']==null){
            		return full['returnMoney'];
            	}else{
            		return (full['returnMoney']-full['generalMoney']);
            	}
	        }}
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table3_wrapper").removeClass();
    $('#table3_wrapper').addClass("table-scrollable");
    //每页显示记录数
    $('#table3_wrapper .dataTables_info').parent().append($('#table3_wrapper .dataTables_length'));
}
function initDataTable3(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "departmentId", "value":DEPID});
 	aoData.push({"name": "dateString", "value":DateString});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};

function initTable4() {
    var init = $('#table4').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "scrollX": true, 
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            },
            "sProcessing" : ""
        },
        "sAjaxSource": ctx + '/financeReport/selectFk',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable4,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
			{"mDataProp": "departmentName1",'sClass': "text-center"},
			{"mDataProp": "departmentName2",'sClass': "text-center"},
			{"mDataProp": "sortName",'sClass': "text-center"},
            {"mDataProp": "eventDate",'sClass': "text-center", "mRender": function (data, type, full) {
            	return jsDateFormat(full['eventDate']);
	        }},
	        {"mDataProp": "commitDate",'sClass': "text-center", "mRender": function (data, type, full) {
            	return jsDateFormat(full['commitDate']);
	        }},
	        {"mDataProp": "passDate",'sClass': "text-center", "mRender": function (data, type, full) {
	        	if(full['passDate'] ==null|| full['passDate']==""){
	        		return "";
	        	}else{
	        		return jsDateFormat(full['passDate']);
	        	}
	        }},
            {"mDataProp": "userName",'sClass': "text-center"},
            {"mDataProp": "fa",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['sortType']==2){
            		return full['rewardPunishPrice'];
            	}else{
            		return ''
            	}
	        }},
	        {"mDataProp": "jiang",'sClass': "text-center", "mRender": function (data, type, full) {
	        	if(full['sortType']==1){
            		return full['rewardPunishPrice'];
            	}else{
            		return ''
            	}
	        }},
	        {"mDataProp": "commndDate",'sClass': "text-center", "mRender": function (data, type, full) {
	        	if(full['commndDate']==null || full['commndDate']==""){
	        		return "";
	        	}else{
	        		return jsDateFormat(full['commndDate']);
	        	}
	        }},
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table4_wrapper").removeClass();
    $('#table4_wrapper').addClass("table-scrollable");
    //每页显示记录数
    $('#table4_wrapper .dataTables_info').parent().append($('#table4_wrapper .dataTables_length'));
}
function initDataTable4(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "departmentId", "value":DEPID});
 	aoData.push({"name": "dateString", "value":DateString});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
        }
    });
};
function heji(){
	
}
