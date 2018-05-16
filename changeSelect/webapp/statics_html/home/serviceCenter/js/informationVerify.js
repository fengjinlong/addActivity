var backMemo;
$(function(){
	initTable1();
	initTable2();
	initTable3();
	initTable4();
	initTable5();
	loadReason();
	loadproductModel();
	//回车搜索
	$("#key1").bind('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	initTable1();
        	initTable2();
        	initTable3();
        	initTable4();
        	initTable5();
        }  
    });
  //起止日期
   durationDate('.reservation','到');
    
    //退回学员 全选
    $('#table1 .checkAll').on('click', function(){
      if($(this).prop('checked')){
          $('#table1 tbody .checkchild').prop('checked', true);
      }else{
          $('#table1 tbody .checkchild').prop('checked', false);
      }
    })
     //资料金额均不全  全选
    $('#table2 .checkAll').on('click', function(){
      if($(this).prop('checked')){
          $('#table2 tbody .checkchild').prop('checked', true);
      }else{
          $('#table2 tbody .checkchild').prop('checked', false);
      }
    })
     //资料不全 全选
    $('#table3 .checkAll').on('click', function(){
      if($(this).prop('checked')){
          $('#table3 tbody .checkchild').prop('checked', true);
      }else{
          $('#table3 tbody .checkchild').prop('checked', false);
      }
    })
     //金额不全 全选
    $('#table4 .checkAll').on('click', function(){
      if($(this).prop('checked')){
          $('#table4 tbody .checkchild').prop('checked', true);
      }else{
          $('#table4 tbody .checkchild').prop('checked', false);
      }
    })
     //都全  全选
    $('#table5 .checkAll').on('click', function(){
      if($(this).prop('checked')){
          $('#table5 tbody .checkchild').prop('checked', true);
      }else{
          $('#table5 tbody .checkchild').prop('checked', false);
      }
    })
    
    
    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': ''
    });

    //富文本框
    backMemo=KindEditor.create('#backForm .rebuildRemark'); //退回 的 富文本
    
    KindEditor.ready(function (K) {
        K.create('.rebuildRemark', {
            allowFileManager: true,
            resizeType: 0
        });
    });
    
    
    //点击审核完成
    $('.complate1').on('click', function(){
    	var objs=[];
	  	 $.each($('#table1 tbody input[type=checkbox]:checked'),function(index,obj){
	  		 objs.push($(obj).attr("data-pro"));
	  	 })
	  	 var str=objs.join(",");
	  	if(objs.length!=0){
	  	  $("#completed1").val(str);
  		  $('.review-completed1').modal('show');
	  	  }else{
	  		  swal('',"请先选择",'error');
	  	  }
     })
     $('.complate2').on('click', function(){
    	 var objs=[];
	  	 $.each($('#table5 tbody input[type=checkbox]:checked'),function(index,obj){
	  		 objs.push($(obj).attr("data-pro"));
	  	 })
	  	 var str=objs.join(",");
	  	if(objs.length!=0){
	  	  $("#completed2").val(str);
	  	$('.review-completed2').modal('show');
	  	  }else{
	  		  swal('',"请先选择",'error');
	  	  }
     })
     
     //点击退回
      $('.back2').on('click', function(){
    	  var objs=[];
    	  $.each($('#table5 tbody input[type=checkbox]:checked'),function(index,obj){
    		  objs.push($(obj).attr("data-pro"));
    	  })
    	  var str=objs.join(",");
    	  if(objs.length!=0){
    		  $("#backForm [name='projectInfoManageIds']").val(str);
    		  $('.send-backs').modal('show');
    	  }else{
    		  swal('',"请先选择",'error');
    	  }
     	 
      })
      //教务确认
	   $('.check2').on('click', function(){
		   var objs=[];
    	  $.each($('#table5 tbody input[type=checkbox]:checked'),function(index,obj){
    		  objs.push($(obj).attr("data-pro"));
    	  })
    	  var str=objs.join(",");
    	  if(objs.length!=0){
    		  $("#check").val(str);
    		  $('.review-check').modal('show');
    	  }else{
    		  swal('',"请先选择",'error');
    	  }
	   })
	   
	   //模型change
	    $('#productModel1').on('change',function(){
	    	var modelId=$(this).val();
	    	loadproduct(modelId,"#product1");
	    })
	    $('#productModel2').on('change',function(){
	    	var modelId=$(this).val();
	    	loadproduct(modelId,"#product2");
	    })
	    $('#productModel3').on('change',function(){
	    	var modelId=$(this).val();
	    	loadproduct(modelId,"#product3");
	    })
	    $('#productModel4').on('change',function(){
	    	var modelId=$(this).val();
	    	loadproduct(modelId,"#product4");
	    })
	    $('#productModel5').on('change',function(){
	    	var modelId=$(this).val();
	    	loadproduct(modelId,"#product5");
	    })
})
//退回点击确认
function subBack(obj){
	var typee=$(obj).attr("typee");
	if(typee!=1){
		return ;
	}
	$(obj).attr("typee","0");
	var jsonData=$("#backForm").serialize();
	jsonData+='&memo='+backMemo.html();
	$.ajax({
        type: "POST",
        url: ctx+'/consultInfoCheck/checkBack',
        data:jsonData,
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		swal('',"退回成功",'success');
        		initTable5();
        		initTable1();
        		$(obj).attr("typee","1");
        		 $('.send-backs').modal('hide');
        	}else{
        		$(obj).attr("typee","1");
        		swal('',"退回失败",'error');
        	}
        },
        error: function (msg) {
            toastr.error("系统错误");
        }
    });
}
//审核完成点击确认1
function subComplate1(obj){
	var typee=$(obj).attr("typee");
	if(typee!=1){
		return ;
	}
	$(obj).attr("typee","0");
	$.ajax({
        type: "POST",
        url: ctx+'/consultInfoCheck/updateComplateType',
        data:{"projectInfoManageIds":$("#completed1").val(),"type":2},
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		swal('',"审核成功",'success');
        		initTable1();
        		initTable2();
        		initTable3();
        		initTable4();
        		initTable5();
        		$(obj).attr("typee","1");
        		 $('.review-completed1').modal('hide');
        	}else{
        		$(obj).attr("typee","1");
        		swal('',"审核失败",'error');
        	}
        },
        error: function (msg) {
            toastr.error("系统错误");
        }
    });
}
//审核完成点击确认2
function subComplate2(obj){
	var typee=$(obj).attr("typee");
	if(typee!=1){
		return ;
	}
	$(obj).attr("typee","0");
	$.ajax({
        type: "POST",
        url: ctx+'/consultInfoCheck/updateComplateType',
        data:{"projectInfoManageIds":$("#completed2").val(),"type":3},
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		swal('',"审核成功",'success');
        		initTable1();
        		initTable2();
        		initTable3();
        		initTable4();
        		initTable5();
        		$(obj).attr("typee","1");
        		 $('.review-completed2').modal('hide');
        	}else{
        		$(obj).attr("typee","1");
        		swal('',"审核失败",'error');
        	}
        },
        error: function (msg) {
            toastr.error("系统错误");
        }
    });
}

//教务确认点击确认
function check1(obj){
	var typee=$(obj).attr("typee");
	console.log(typee)
	if(typee!=1){
		return ;
	}
	$(obj).attr("typee","0");
	$.ajax({
        type: "POST",
        url: ctx+'/consultInfoCheck/addCheck',
        data:{"proIds":$("#check").val()},
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		swal('',"教务确认成功",'success');
        		initTable5();
        		$(obj).attr("typee","1");
        		 $('.review-check').modal('hide');
        	}else{
        		$(obj).attr("typee","1");
        		swal('',"教务确认失败",'error');
        	}
        },
        error: function (msg) {
            toastr.error("系统错误");
        }
    });
}

//退回原因加载
function loadReason(){
	$.post(ctx+"/consultInfoCheck/loadReason",{
		
	},function(data){
		if(data.status='success'){
			var str='';
			$.each(data.data,function(index,val){
				str+='<option value="'+val.aicause_id+'LBL'+val.aicause_name+'">'+val.aicause_name+'</option>';
			})
			$("#backForm [name='reason']").html(str);
			$("#backForm [name='reason']").selectpicker('refresh');
		}else{
			swal('',"退回原因加载出错，请刷新页面",'error');
		}
	},"json");
}

//产品模型加载
function loadproductModel(){
	$.post(ctx+"/productModelController/selectAll",{
		"enable":1
	},function(data){
		var str='<option value="">请选择</option>';
		$.each(data,function(index,val){
			str+='<option value="'+val.productModelId+'">'+val.productModelName+'</option>';
		})
		$("#productModel1").html(str);
		$("#productModel2").html(str);
		$("#productModel3").html(str);
		$("#productModel4").html(str);
		$("#productModel4").html(str);
		$("#productModel1").trigger("chosen:updated");
		$("#productModel2").trigger("chosen:updated");
		$("#productModel3").trigger("chosen:updated");
		$("#productModel4").trigger("chosen:updated");
		$("#productModel5").trigger("chosen:updated");
	},"json");
}

//产品加载
function loadproduct(modelId,pro){
	$.post(ctx+"/product/selectAll",{
		"productModelId":modelId
	},function(data){
		var str='<option value="">请选择</option>';
		$.each(data.list,function(index,val){
			str+='<option value="'+val.productId+'">'+val.productName+'</option>';
		})
		$(pro).html(str);
		$(pro).trigger("chosen:updated");
	},"json");
}

//退回原因查看
function findReason(obj){
	var typee=$(obj).attr("typee");
	if(typee!=1){
		return ;
	}
	$(obj).attr("typee","0");
	$.post(ctx+"/consultInfoCheck/findReason",{
		projectInfoManageId:$(obj).attr("value")
	},function(data){
		if(data.status='success'){
			var str='';
			$.each(data.data,function(index,val){
				str+='<tr>'+
		             '   <td>'+val.createDate+'</td>'+
		             '   <td>'+val.createUserName+'</td>'+
		             '   <td>'+val.reason+'</td>'+
		             '   <td>'+val.memo+'</td>'+
		             '</tr>';
			})
			$("#backReason").html(str);
			$('.back-reason').modal('show');
		}else{
			swal('',"数据加载失败",'error');
		}
		$(obj).attr("typee","1");
	},"json");
}

//费用支付记录查看
function findPayment(obj){
	var typee=$(obj).attr("typee");
	if(typee!=1){
		return ;
	}
	$(obj).attr("typee","0");
	console.log($(obj).attr("data-pro"));
	$.post(ctx+"/consultInfoCheck/findPayment",{
		projectInfoManageId:$(obj).attr("value"),
		productId:$(obj).attr("data-pro"),
	},function(data){
		if(data.status='success'){
			var str='';
			$.each(data.data,function(index,val){
				str+='<tr>'+
		             '   <td>'+jsDateFormat(val.createDate)+'</td>'+
		             '   <td>'+val.createUserName+'</td>'+
		             '   <td>'+val.reason+'</td>'+
		             '   <td>'+val.memo+'</td>'+
		             '</tr>';
			})
			$("#backReason").html(str);
			$('.payment-history').modal('show');
		}else{
			swal('',"数据加载失败",'error');
		}
		$(obj).attr("typee","1");
	},"json");
}


//退回学员 
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
        "sAjaxSource": ctx + '/consultInfoCheck/getAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable1,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
            {"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
	        	return jsDateFormat(full['baoMinDate']);
	        }},
            {"mDataProp": "departmentName1",'sClass': "text-center"},
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "studentSex",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['studentSex']==0){
            		return "男";
            	}else{
            		return "女";
            	}
	        }},
            {"mDataProp": "idcard",'sClass': "text-center"},
            {"mDataProp": "phoneBelong",'sClass': "text-center"},
            {"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['unAction']==1){
            		return "转班";
            	}else if(full['unAction']==2){
            		return "休学";
            	}else if(full['unAction']==3){
            		return "退费";
            	}else if(full['unAction']==4){
            		return "补考";
            	}else if(full['unAction']==5){
            		return "重修";
            	}else if(full['unAction']==6){
            		return "退费中";
            	}else if(full['unAction']==7){
            		return "正常（转化）";
            	}else if(full['unAction']==8){
            		return "初申";
            	}else if(full['unAction']==9){
            		return "已退费";
            	}else if(full['unAction']==11){
            		return "已转班";
            	}else {
            		return "正常";
            	}
	        }},
            {"mDataProp": "ktimeValue",'sClass': "text-center"},
            {"mDataProp": "productName",'sClass': "text-center"},
            {"mDataProp": "sumPrice",'sClass': "text-center"},
            {"mDataProp": "sPrice",'sClass': "text-center"},
            {"mDataProp": "applyStatus",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['applyStatus']==1){
            		return "否";
            	}else{
            		return "是";
            	}
	        }},
            {"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a href="#" typee="1" onclick="findReason(this)" value="'+full['projectInfoManageId']+'" class="view" data-toggle="modal"'+
					  'data-backdrop="static" >'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
                return str;
            }},
            {"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
					  "data-backdrop='static' >"+
				        "<i class='fa fa-search warning' "+
				        "data-placement='top' data-original-title='查看'></i>"+
				         "</a>"
                return str;
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
    aoData.push({"name": "selectStatus", "value":"1"});
    var beganAndEnd = $("#date1").val();
 	if(beganAndEnd && beganAndEnd.length != 0){
     	 var minDate = beganAndEnd.split("到")[0] ;
         var maxDate = beganAndEnd.split("到")[1] ;
         aoData.push({ "name": "startTime", "value": minDate.trim()+" 00:00:00" });
         aoData.push({ "name": "endTime", "value": maxDate.trim()+" 23:59:59" });
     }
 	aoData.push({"name": "selectKey", "value":$("#key1").val()});
 	aoData.push({"name": "productId", "value":$("#product1").val()});
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


//资料金额均不全
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
        "sAjaxSource": ctx + '/consultInfoCheck/getAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable2,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
            {"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
	        	return jsDateFormat(full['baoMinDate']);
	        }},
            {"mDataProp": "departmentName1",'sClass': "text-center"},
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "studentSex",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['studentSex']==0){
            		return "男";
            	}else{
            		return "女";
            	}
	        }},
            {"mDataProp": "idcard",'sClass': "text-center"},
            {"mDataProp": "phoneBelong",'sClass': "text-center"},
            {"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['unAction']==1){
            		return "转班";
            	}else if(full['unAction']==2){
            		return "休学";
            	}else if(full['unAction']==3){
            		return "退费";
            	}else if(full['unAction']==4){
            		return "补考";
            	}else if(full['unAction']==5){
            		return "重修";
            	}else if(full['unAction']==6){
            		return "退费中";
            	}else if(full['unAction']==7){
            		return "正常（转化）";
            	}else if(full['unAction']==8){
            		return "初申";
            	}else if(full['unAction']==9){
            		return "已退费";
            	}else if(full['unAction']==11){
            		return "已转班";
            	}else {
            		return "正常";
            	}
	        }},
            {"mDataProp": "ktimeValue",'sClass': "text-center"},
            {"mDataProp": "productName",'sClass': "text-center"},
            {"mDataProp": "sumPrice",'sClass': "text-center"},
            {"mDataProp": "sPrice",'sClass': "text-center"},
            {"mDataProp": "applyStatus",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['applyStatus']==1){
            		return "否";
            	}else{
            		return "是";
            	}
	        }},
            {"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a href="#" typee="1" onclick="findReason(this)"  value="'+full['projectInfoManageId']+'" class="view" data-toggle="modal"'+
					  'data-backdrop="static" data-target=".back-reason">'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
                return str;
            }},
            {"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
					  "data-backdrop='static' >"+
				        "<i class='fa fa-search warning' "+
				        "data-placement='top' data-original-title='查看'></i>"+
				         "</a>"
                return str;
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
    aoData.push({"name": "selectStatus", "value":"2"});
    var beganAndEnd = $("#date2").val();
 	if(beganAndEnd && beganAndEnd.length != 0){
     	 var minDate = beganAndEnd.split("到")[0] ;
         var maxDate = beganAndEnd.split("到")[1] ;
         aoData.push({ "name": "startTime", "value": minDate.trim()+" 00:00:00" });
         aoData.push({ "name": "endTime", "value": maxDate.trim()+" 23:59:59" });
     }
 	aoData.push({"name": "selectKey", "value":$("#key2").val()});
 	aoData.push({"name": "productId", "value":$("#product2").val()});
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

//资料不全
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
        "sAjaxSource": ctx + '/consultInfoCheck/getAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable3,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
			{"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
				return jsDateFormat(full['baoMinDate']);
			}},
			{"mDataProp": "departmentName1",'sClass': "text-center"},
			{"mDataProp": "studentName",'sClass': "text-center"},
			{"mDataProp": "studentSex",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['studentSex']==0){
					return "男";
				}else{
					return "女";
				}
			}},
			{"mDataProp": "idcard",'sClass': "text-center"},
			{"mDataProp": "phoneBelong",'sClass': "text-center"},
			{"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['unAction']==1){
            		return "转班";
            	}else if(full['unAction']==2){
            		return "休学";
            	}else if(full['unAction']==3){
            		return "退费";
            	}else if(full['unAction']==4){
            		return "补考";
            	}else if(full['unAction']==5){
            		return "重修";
            	}else if(full['unAction']==6){
            		return "退费中";
            	}else if(full['unAction']==7){
            		return "正常（转化）";
            	}else if(full['unAction']==8){
            		return "初申";
            	}else if(full['unAction']==9){
            		return "已退费";
            	}else if(full['unAction']==11){
            		return "已转班";
            	}else {
            		return "正常";
            	}
			}},
			{"mDataProp": "ktimeValue",'sClass': "text-center"},
			{"mDataProp": "productName",'sClass': "text-center"},
			{"mDataProp": "sumPrice",'sClass': "text-center"},
			{"mDataProp": "sPrice",'sClass': "text-center"},
			{"mDataProp": "studentConfirmation",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['studentConfirmation']==1){
					return "是";
				}else{
					return "否";
				}
			}},
			{"mDataProp": "phoneConfirmation",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['phoneConfirmation']==1){
					return "是";
				}else{
					return "否";
				}
			}}, 
			{"mDataProp": "applyStatus",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['applyStatus']==1){
					return "否";
				}else{
					return "是";
				}
			}},
			{"mDataProp": "returnCount",'sClass': "text-center"},
			{"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='';
				str+='<a href="#" onclick="findPayment(this)" data-pro="'+full['productId']+'" value="'+full['projectInfoManageId']+'" class="view"'+
					  'data-backdrop="static" >'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
			    return str;
			}},
			{"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='';
				str+='<a href="#" typee="1" onclick="findReason(this)" value="'+full['projectInfoManageId']+'" class="view" data-toggle="modal"'+
					  'data-backdrop="static" data-target=".back-reason">'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
			    return str;
			}},
			{"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
					  "data-backdrop='static' >"+
				        "<i class='fa fa-search warning' "+
				        "data-placement='top' data-original-title='查看'></i>"+
				         "</a>"
                return str;
            }},
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
    aoData.push({"name": "selectStatus", "value":"3"});
    var beganAndEnd = $("#date3").val();
 	if(beganAndEnd && beganAndEnd.length != 0){
     	 var minDate = beganAndEnd.split("到")[0] ;
         var maxDate = beganAndEnd.split("到")[1] ;
         aoData.push({ "name": "startTime", "value": minDate.trim()+" 00:00:00" });
         aoData.push({ "name": "endTime", "value": maxDate.trim()+" 23:59:59" });
     }
 	aoData.push({"name": "selectKey", "value":$("#key3").val()});
 	aoData.push({"name": "productId", "value":$("#product3").val()});
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

//金额不全
function initTable4() {
    var init = $('#table4').dataTable({
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
        "sAjaxSource": ctx + '/consultInfoCheck/getAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable4,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" onclick="check()" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
            {"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
	        	return jsDateFormat(full['baoMinDate']);
	        }},
            {"mDataProp": "departmentName1",'sClass': "text-center"},
            {"mDataProp": "studentName",'sClass': "text-center"},
            {"mDataProp": "studentSex",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['studentSex']==0){
            		return "男";
            	}else{
            		return "女";
            	}
	        }},
            {"mDataProp": "idcard",'sClass': "text-center"},
            {"mDataProp": "phoneBelong",'sClass': "text-center"},
            {"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['unAction']==1){
            		return "转班";
            	}else if(full['unAction']==2){
            		return "休学";
            	}else if(full['unAction']==3){
            		return "退费";
            	}else if(full['unAction']==4){
            		return "补考";
            	}else if(full['unAction']==5){
            		return "重修";
            	}else if(full['unAction']==6){
            		return "退费中";
            	}else if(full['unAction']==7){
            		return "正常（转化）";
            	}else if(full['unAction']==8){
            		return "初申";
            	}else if(full['unAction']==9){
            		return "已退费";
            	}else if(full['unAction']==11){
            		return "已转班";
            	}else {
            		return "正常";
            	}
	        }},
            {"mDataProp": "ktimeValue",'sClass': "text-center"},
            {"mDataProp": "productName",'sClass': "text-center"},
            {"mDataProp": "sumPrice",'sClass': "text-center"},
            {"mDataProp": "sPrice",'sClass': "text-center"},
            {"mDataProp": "applyStatus",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['applyStatus']==1){
            		return "否";
            	}else{
            		return "是";
            	}
	        }},
            {"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a href="#" typee="1" onclick="findReason(this)" value="'+full['projectInfoManageId']+'" class="view" data-toggle="modal"'+
					  'data-backdrop="static" data-target=".back-reason">'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
                return str;
            }},
            {"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
					  "data-backdrop='static' >"+
				        "<i class='fa fa-search warning' "+
				        "data-placement='top' data-original-title='查看'></i>"+
				         "</a>"
                return str;
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
    aoData.push({"name": "selectStatus", "value":"4"});
    var beganAndEnd = $("#date4").val();
 	if(beganAndEnd && beganAndEnd.length != 0){
     	 var minDate = beganAndEnd.split("到")[0] ;
         var maxDate = beganAndEnd.split("到")[1] ;
         aoData.push({ "name": "startTime", "value": minDate.trim()+" 00:00:00" });
         aoData.push({ "name": "endTime", "value": maxDate.trim()+" 23:59:59" });
     }
 	aoData.push({"name": "selectKey", "value":$("#key4").val()});
 	aoData.push({"name": "productId", "value":$("#product4").val()});
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

//资料金额齐全
function initTable5() {
    var init = $('#table5').dataTable({
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
        "sAjaxSource": ctx + '/consultInfoCheck/getAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable5,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
				return str;
			}},
			{"mDataProp": "baoMinDate",'sClass': "text-center", "mRender": function (data, type, full) {
				return jsDateFormat(full['baoMinDate']);
			}},
			{"mDataProp": "departmentName1",'sClass': "text-center"},
			{"mDataProp": "studentName",'sClass': "text-center"},
			{"mDataProp": "studentSex",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['studentSex']==0){
					return "男";
				}else{
					return "女";
				}
			}},
			{"mDataProp": "idcard",'sClass': "text-center"},
			{"mDataProp": "phoneBelong",'sClass': "text-center"},
			{"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['unAction']==1){
            		return "转班";
            	}else if(full['unAction']==2){
            		return "休学";
            	}else if(full['unAction']==3){
            		return "退费";
            	}else if(full['unAction']==4){
            		return "补考";
            	}else if(full['unAction']==5){
            		return "重修";
            	}else if(full['unAction']==6){
            		return "退费中";
            	}else if(full['unAction']==7){
            		return "正常（转化）";
            	}else if(full['unAction']==8){
            		return "初申";
            	}else if(full['unAction']==9){
            		return "已退费";
            	}else if(full['unAction']==11){
            		return "已转班";
            	}else {
            		return "正常";
            	}
			}},
			{"mDataProp": "ktimeValue",'sClass': "text-center"},
			{"mDataProp": "productName",'sClass': "text-center"},
			{"mDataProp": "sumPrice",'sClass': "text-center"},
			{"mDataProp": "sPrice",'sClass': "text-center"},
			{"mDataProp": "studentConfirmation",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['studentConfirmation']==1){
					return "是";
				}else{
					return "否";
				}
			}},
			{"mDataProp": "phoneConfirmation",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['phoneConfirmation']==1){
					return "是";
				}else{
					return "否";
				}
			}}, 
			{"mDataProp": "applyStatus",'sClass': "text-center", "mRender": function (data, type, full) {
				if(full['applyStatus']==1){
					return "否";
				}else{
					return "是";
				}
			}},
			{"mDataProp": "returnCount",'sClass': "text-center"},
			{"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='';
				str+='<a href="#" value="'+full['projectInfoManageId']+'" class="view" data-toggle="modal"'+
					  'data-backdrop="static" data-target=".payment-history">'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
			    return str;
			}},
			{"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='';
				str+='<a href="#" typee="1" onclick="findReason(this)" value="'+full['projectInfoManageId']+'" class="view" data-toggle="modal"'+
					  'data-backdrop="static" data-target=".back-reason">'+
				        '<i class="fa fa-search warning" data-toggle="tooltip"'+
				        'data-placement="top" data-original-title="查看"></i>'+
				         '</a>'
			    return str;
			}},
			{"mDataProp": "a",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+="<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' "+
					  "data-backdrop='static' >"+
				        "<i class='fa fa-search warning' "+
				        "data-placement='top' data-original-title='查看'></i>"+
				         "</a>"
                return str;
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#table5_wrapper").removeClass();
    $('#table5_wrapper').addClass("table-scrollable");
    //每页显示记录数
    $('#table5_wrapper .dataTables_info').parent().append($('#table5_wrapper .dataTables_length'));
}
function initDataTable5(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "selectStatus", "value":"5"});
    var beganAndEnd = $("#date5").val();
 	if(beganAndEnd && beganAndEnd.length != 0){
     	 var minDate = beganAndEnd.split("到")[0] ;
         var maxDate = beganAndEnd.split("到")[1] ;
         aoData.push({ "name": "startTime", "value": minDate.trim()+" 00:00:00" });
         aoData.push({ "name": "endTime", "value": maxDate.trim()+" 23:59:59" });
     }
 	aoData.push({"name": "selectKey", "value":$("#key5").val()});
 	aoData.push({"name": "productId", "value":$("#product5").val()});
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



//全选反选
function check(){
	if(! $('.checkchild').is(":checked")){
		$('.checkAll').attr('checked',false);
	}
}

if(! $('.checkchild').is(":checked")){
	//console.log(1)
	$('.checkAll').attr('checked',false);
}
