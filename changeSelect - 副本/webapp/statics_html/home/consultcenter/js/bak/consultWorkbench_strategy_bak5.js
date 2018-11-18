//攻略
$(".strategy-btn").on("click", function () {
    $(".aaa,.bs-example-modal-lga").animate({"margin-left": "-15%"});
    $(".strategy").animate({"margin-left": "53.4%"});
    $(".strategy").css({"z-index": 1051});
    //初始化招生地区，考试地区信息
    initGL();
});

//关闭弹窗同时关闭攻略
$('.aaa').on('hide.bs.modal', function () {
	$('.strategy').modal('hide');
	//清空订座费，防止下次点击查看数据还在
    $('#dingzuoI').val(0);
    
    
  //清空上次选择是动态生成的课程信息
    $("#productIdStrategy").val(null);//清空产品回显
	$("#productIdStrategy").trigger("chosen:updated");
//	$("#product_model").val('');
//	$("#product_model").val("选中的值");
	$("#productModelIdStrategy").val(null);//产品模型回显清空
	$("#productModelIdStrategy").trigger("chosen:updated");
	//课程信息中动态生成联动下拉框清空
	$(".removeFlag").parent().parent().remove();
})

/**
 * 初始化攻略列表
 * @returns
 */
function initglTablezy() {
    $('#tablezy').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
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
        "sAjaxSource": ctx + '/bizProductPrice/ajaxGL',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDatazy,
        "aoColumns": [
            {
                "mDataProp": "addressName", 'sClass': "text-center"
            },
            {"mDataProp": "productModelName", 'sClass': "text-center"},
            {"mDataProp": "productName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "examTime", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "cost", "bSortable": false, 'sClass': "text-center","mRender": function (data, type, full) {
               if(full['price']!=null){
            	   var json = eval(full['price']);
            	   var price = 0;
            	   for(var i=0;i<json.length;i++){
            		   price += json[i].price;
            	   }
               }
               return price;
            }},
            {
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    var u1 = '<a href="#" class="view"'
                        + 'data-toggle="modal" data-backdrop="static" data-record=\'' + JSON.stringify(full) + '\''
                        + '   data-target=".professionView">'
                        + '   <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i>'
                    return u1;
                }
            }
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#tablezy_wrapper").removeClass();
    $('#tablezy_wrapper').addClass("table-scrollable");

    //每页显示记录数
    //$('#tablezy_wrapper .dataTables_info').parent().append($('#tablezy_wrapper .dataTables_length'));
    $('#tablezy_wrapper .dataTables_info').parent().css('width','40%')
    $('#tablezy_wrapper .dataTables_paginate').parent().css('width','60%')
    $('#tablezy_wrapper .dataTables_length').remove();
    HScrollBar('#tablezy_wrapper');
}
//初始化攻略列表职业-方法
function initDatazy(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    aoData.push({"name": "projectId", "value": $('#zyproject').val()});
    aoData.push({"name": "levelId", "value": $('#zyprojectleven').val()});
    aoData.push({"name": "depId", "value": $('#zybranchSchool').val()});
    aoData.push({"name": "productId", "value": $('#zyproduct').val()});

    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
//攻略-职业tab
function zytable(){
	var productModelId = $("#productModelIdStrategy").val();
	if(productModelId==null || productModelId=='' || typeof(productModelId)=='undefined') {
		 toastr.error("产品模型是必选项");
		 return;
	} 
	initglTablezy();//初始化攻略-专业
}

//初始化招生地区，考试地区信息,产品模型信息
function initGL() {
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
        	var temp = '';
            for (var i = 0; i < data.list.length; i++) {
            	temp += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("#addressIdStrategy").html('<option value="">--请选择--</option>' + temp);
            $("#branchSchoolIdStrategy").html('<option value="">--请选择--</option>' + temp);
            $('#addressIdStrategy').trigger('chosen:updated');
            $("#addressIdStrategy").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('#branchSchoolIdStrategy').trigger('chosen:updated');
            $("#branchSchoolIdStrategy").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
}

//*********************************************************
//已下动态生成课程信息部分
//初始产品模型信息
$.ajax({
    url: ctx + '/consultInfoManage/selectProductModel',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        var zxkc = "";
        for (var i = 0; i < data.length; i++) {
    		zxkc += "<option value=" + data[i].modelId + " data-value="+data[i].JsonDetail+">" + data[i].modelName + "</option>";
        }
        $("#productModelIdStrategy").html('<option value="">--请选择--</option>' + zxkc);
        $('#productModelIdStrategy').trigger('chosen:updated');
        $("#productModelIdStrategy").chosen({no_results_text: "没有匹配项", search_contains: true});
        $('.chosen-container').width('100%');
    },
    error: function (response) {
        toastr.error("系统错误");
    }
});

//DMW添加，根据产品类型的选择，动态创建课程信息部分，其它下拉框
$("#productModelIdStrategy").change(function(){
	//产品模型发生改变，制空产品下拉框
	clearProductStrategy();
	//得到选中的option的Json信息
	var jsonObj = $('#productModelIdStrategy :selected').data("value");
	//如果当前模型下没有配置选项,不用再继续往下走了直接退出方法
	if(typeof(jsonObj)=="undefined" || jsonObj=="undefined") {
		//清除上次选择后生成的下拉框
    	$(".removeFlag").parent().parent().remove();
		return;
	}
	//得到产品类型ID
	var modelId = $('#productModelIdStrategy :selected').val();
	//清除上次选择后生成的下拉框
	$(".removeFlag").parent().parent().remove();
	//用来组装表名
	var tableArray = new Array();
	 
	//开始构造最新的拼接结果-生成select
	for(var i=0; i<jsonObj.length; i++) {
		var enName = jsonObj[i].enName;
		var chName = jsonObj[i].chName;
		tableArray.push(enName);
		//开始拼接
		var str = '<div class="form-group col-sm-6 ">'
			+ '       <label class="control-label pull-left">'+chName+'</label>'
			+ '       <div class="col-sm-9 no-padding-right">'
			+ '            <select name="projectMap[\''+enName+'_id\']" id="'+enName+'Strategy" data-id="'+enName+'" onchange="clearProductStrategy()" class="form-control removeFlag chosen-select condition" tabindex="-1">'
			+ '            </select>'
			+ '			   <input type="hidden" name="projectMap[\''+enName+'_name\']" class="projectInfoManager" />'		
			+ '        </div>'
			+ '</div>';
		//将新增的下拉框拼接到产品类型下拉框后面
		$("#productModelIdStrategy").parent().parent().after(str);
		//根据表名和产品类型，关联product表，开始构造option
	}
	var tableName = tableArray.join("---");
	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去-生成option
	$.ajax({
        url: ctx + '/consultInfoManage/selectOptionByTable',
        type: 'POST',
        dataType: 'json',
        data: {"tableName":tableName,"modelId":modelId},
        success: function (data) {
            if(data==null || data.length==0) {
            	return;
            }
            for (var i = 0; i < data.length; i++) {
            	var zxkc = "";
            	for(var j=0; j<data[i].dataList.length; j++) {
            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
            	}
            	$('#'+data[i].tableName+"Strategy").html('<option value="">--请选择--</option>' + zxkc);
            	//加载下拉框样式
            	$('#'+data[i].tableName+"Strategy").trigger('chosen:updated');
            	$("#"+data[i].tableName+"Strategy").chosen({no_results_text: "没有匹配项", search_contains: true});
            	$('.chosen-container').width('100%');
            }
            
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
});
    
  //当产品部分的下拉框发生改变时，需要制空产品下拉框
clearProductStrategy = function() {
	$("#productIdStrategy").html("");
	generateProductStrategy();//开始根据课程信息部分当前选中条件生成产品选项
	$("#productIdStrategy").trigger('chosen:updated');
	$("#productIdStrategy").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	// 
}

//dmw-页面生产产品按钮功能
function generateProductStrategy() {
	//存放条件-该条件只是用于构造product表的查询条件
	var conditionArray = new Array();
	$("#strategyProfession select.condition :selected").each(function(index,obj){
		//得到option的value即id值
		var idValue = $(obj).val();
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			var primaryIdName = $(obj).parent().data("id")+"_id";
			var primaryIdValue = "'"+idValue+"'";
			//形如XXX_id = 'YYY'
			var condition = primaryIdName + "=" + primaryIdValue;
			conditionArray.push(condition);
		}
	});
	 
	var conditions = conditionArray.join(" and ");
	//构造用于查询product_exam_time_address招生地区表的条件
	var addressId = $("#addressIdStrategy").val();
	//构造用于查询product_branch_school考试地区表的条件
	var branchSchoolId = $("#branchSchoolIdStrategy").val();
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultStrategy/findProductOption',
	      data: {"conditions":conditions, 
	    	  "addressId":addressId, 
	    	  "branchSchoolId":branchSchoolId
	      },
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
	               
            	 for(var i=0; i<data.data.length; i++) {
//            		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].productId + ">" + data.data[i].productName + "</option>";
            		 str += "<option value=" + data.data[i].productId + ">" + data.data[i].productName + "</option>";
            	 }
            	 $("#productIdStrategy").html('<option value="">--请选择--</option>' + str);
            	 //加载下拉框样式
            	 $("#productIdStrategy").trigger('chosen:updated');
            	 $("#productIdStrategy").chosen({no_results_text: "没有匹配项", search_contains: true});
            	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}

//产品下拉选项联动考期
$("#productIdStrategy").change(function(){
	// 获取selected产品ID
	var productId = $('#productIdStrategy').val();
	$.ajax({
		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(info){
			if (info == null || info.length == 0){
				return;
			}
			var exm = '';
			for (var m = 0; m < info.length; m++) {
				exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
			}
			$('#productExamTimeIdStrategy').html('<option value="">--请选择--<option/>'+exm);
			$('#productExamTimeIdStrategy').trigger('chosen:updated');
			$("#productExamTimeIdStrategy").chosen({no_results_text: "没有匹配项", search_contains: true});
		},
		error: function (response) {
            toastr.error("不存在考期");
        }
	})
});

//选择产品，反向回显其他课程信息的option
$('#productIdStrategy').change(function(){
	var productId = $(this).val();
	$.ajax({
		url : ctx + '/consultStrategy/getProjectByProduct',
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
		success : function(data){
			debugger;
			if(data!=null){
				var aiId = null;//动态生成的课程信息select的id
				for(var p in data){
					aiId = p.replace("_id","");//动态生成的课程信息option的value
					$('#'+aiId+"Strategy").val(data[p]);
					$('#'+aiId+"Strategy").trigger('chosen:updated');
				}
			}
		}
	})
});