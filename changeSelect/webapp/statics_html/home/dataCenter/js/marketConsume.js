$(function () {
	//初始化列表
    $("#certificate tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#certificate tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    init();
    //日期
    $('#reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
        },
        ranges: {
            '今天': [moment().startOf('day'), moment()],
            '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
            '本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
            '上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
            '本月': [moment().startOf("month"), moment().endOf("month")],
            '上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()]
        },
        applyClass: 'btn-primary',
        alwaysShowCalendars: true,
        autoclose: true,
        autoUpdateInput: false,
        showDropdowns: true
    });
    //日期确定按钮
    $('#reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });
   
    //分校、项目、媒体来源、推广方式
    $('.branchSchool').chosen({no_results_text: "没有匹配项"});
    $('.project').chosen({no_results_text: "没有匹配项"});
    $('.mediaSources').chosen({no_results_text: "没有匹配项"});
    $('.promotion').chosen({no_results_text: "没有匹配项"});

    //上传文件
    $('#bulk-upload').fileinput({
        language: 'zh',
        uploadUrl: ctx + '/report/uploadCheck',
        showPreview: false
    })

    /**
     * 取消上传
     */
    $('.fileinput-remove').click(function(){
    		$('#imports').find('tbody').html("");
    		$('#tableId').find('tbody').html("");
    		$('.bulkAddBtn').removeAttr('disabled');
    });


    $("#tableId").hide();

    $("#bulk-upload").on("fileuploaded", function (event, data, previewId, index) {
        var rows = "";
        var res = data.response.data;
        for (var i = 0; i < res.length; ++i) {
	        	if(res[i].enable == 1){
        		 var row = "<tr name='enable'>";
                 row += "<td><input name='marketDate' value='" + res[i].marketDate + "'/></td>";
                 row += "<td><input name='brandName' value='" + res[i].brandName + "'/><input type='hidden' name='brandId' value='" + res[i].brandId + "'/></td>";
                 row += "<td><input name='departmentName' value='" + res[i].departmentName + "'/><input type='hidden' name='departmentId' value='" + res[i].departmentId + "'/></td>";
                 row += "<td><input name='modelName' value='" + res[i].modelName + "'/><input type='hidden' name='modelId' value='" + res[i].modelId + "'/></td>";
                 row += "<td><input name='productName' value='" + res[i].productName + "'/><input type='hidden' name='productId' value='" + res[i].productId + "'/></td>";
                 row += "<td><input name='money' value='" + res[i].money + "'/></td>";
                 row += "<td><input name='marketSee' value='" + res[i].marketSee + "'/></td>";
                 row += "<td><input name='marketClick' value='" + res[i].marketClick + "'/></td>";
                 row += "<td><input name='studentAttrName' value='" + res[i].studentAttrName + "'/><input type='hidden' name='studentAttrId' value='" + res[i].studentAttrId + "'/></td>";
                 row += "<td><input name='spreadName' value='" + res[i].spreadName + "'/></td>";
                 row += "</tr>";
                 rows += row;
	        	}else{
	        		var row = "<tr>";
	                 row += "<td>" + res[i].marketDate + "'</td>";
	                 row += "<td>" + res[i].brandName + "</td>";
	                 row += "<td>" + res[i].departmentName + "</td>";
	                 row += "<td>" + res[i].modelName + "</td>";
	                 row += "<td>" + res[i].productName + "</td>";
	                 row += "<td>" + res[i].money + "</td>";
	                 row += "<td>" + res[i].marketSee + "</td>";
	                 row += "<td>" + res[i].marketClick + "</td>";
	                 row += "<td>" + res[i].studentAttrName + "</td>";
	                 row += "<td>" + res[i].spreadName + "</td>";
	                 row += "</tr>";
	                 rows += row;
	        	}
        }
        $('#imports').find('tbody').append(rows);
        $("#tableId").find('tbody').append(rows);
        $('.bulkAddBtn').removeAttr('disabled');
    });
    

    
 $('.bulkAddBtn').on('hidden.bs.modal', function () {
    $('.bulkAddBtn tbody').html("");
    $('.bulkAddBtn').data('bootstrapValidator').resetForm();
})
    $('#scoresAdd').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
        	var scores = new Array();
        $('#imports').find('tbody').find('tr[name="enable"]').each(function(){
        		var reportMarket = {};
        		reportMarket["marketDate"] = $(this).find('input[name="marketDate"]').val();
        		reportMarket["brandName"] = $(this).find('input[name="brandName"]').val();
        		reportMarket["brandId"] = $(this).find('input[name="brandId"]').val();
        		reportMarket["departmentName"] = $(this).find('input[name="departmentName"]').val();
        		reportMarket["departmentId"] = $(this).find('input[name="departmentId"]').val();
        		reportMarket["modelName"] = $(this).find('input[name="modelName"]').val();
        		reportMarket["modelId"] = $(this).find('input[name="modelId"]').val();
        		reportMarket["productName"] = $(this).find('input[name="productName"]').val();
        		reportMarket["productId"] = $(this).find('input[name="productId"]').val();
        		reportMarket["money"] = $(this).find('input[name="money"]').val();
        		reportMarket["marketSee"] = $(this).find('input[name="marketSee"]').val();
        		reportMarket["marketClick"] = $(this).find('input[name="marketClick"]').val();
        		reportMarket["studentAttrName"] = $(this).find('input[name="studentAttrName"]').val();
        		reportMarket["studentAttrId"] = $(this).find('input[name="studentAttrId"]').val();
        		reportMarket["spreadName"] = $(this).find('input[name="spreadName"]').val();
        	 	scores.push(reportMarket);
        	});
        	if(scores.length > 0){
        		 $.ajax({
                     type: "POST",
                     url: ctx + '/report/addRecords',
                     data: {
                    	 	searchVal:JSON.stringify(scores)
                     },
                     dataType: 'json',
                     success: function (data) {
                         if (data.status == "success") {
                             $('.bulkAdd').modal('hide');
                             init();
                         } else {
                             toastr.error(data.msg);
                         }
                     },
                     error: function (msg) {
                         toastr.error("系统错误");
                     }
                 });
        	}else{
        		//alert("请上传文件！");
        		toastr.error("请上传文件");
        	}
        }
    });
 
//查询时间
 $('.date-picker').datepicker({
     language: 'zh-CN',
     format: 'yyyy/m/d',
 }).on('changeDate', function () {
     $(this).datepicker('hide');
     var marketDate = $('.marketDate').val();
     var data = new Array();
     $("#tableId tbody tr").each(function(index,ele){
    	 var obj = $(ele);
    	if(obj.find('td:first input').val() == marketDate){
    		data.push(obj);
    	}
     });
     $('#imports').find('tbody').html("");
     $('#imports').find('tbody').append(data);
 });
 //查询推广方式
 $('.promotion').chosen().change(function () {
     var spreadType = $(this).find("option:selected").text();
     var data = new Array();
     $("#tableId tbody tr").each(function(index,ele){
    	 var obj = $(ele);
    	if(obj.find('td:last input').val() == spreadType){
    		data.push(obj);
    	}
     });
     $('#imports').find('tbody').html("");
     $('#imports').find('tbody').append(data);
 })
 //查询媒体来源
  $('.mediaSources').chosen().change(function () {
     var mediaFrom = $(this).find("option:selected").text();
     var data = new Array();
     $("#tableId tbody tr").each(function(index,ele){
    	 var obj = $(ele);
    	if(obj.find('td:eq(7) input').val() == mediaFrom){
    		data.push(obj);
    	}
     });
     $('#imports').find('tbody').html("");
     $('#imports').find('tbody').append(data);
 })
 $.fn.serializeJson = function () {
     var jsonData1 = {};
     var serializeArray = this.serializeArray();
     
     // 先转换成{"id": ["12","14"], "name": ["aaa","bbb"], "pwd":["pwd1","pwd2"]}这种形式
     $(serializeArray).each(function () {
         if (jsonData1[this.name]) {
             if ($.isArray(jsonData1[this.name])) {
                 jsonData1[this.name].push(this.value);
             } else {
                 jsonData1[this.name] = [jsonData1[this.name], this.value];
             }
         } else {
             jsonData1[this.name] = this.value;
         }
     });
     // 再转成[{"id": "12", "name": "aaa", "pwd":"pwd1"},{"id": "14", "name": "bb", "pwd":"pwd2"}]的形式
     var vCount = 0;
     // 计算json内部的数组最大长度
     for (var item in jsonData1) {
         var tmp = $.isArray(jsonData1[item]) ? jsonData1[item].length : 1;
         vCount = (tmp > vCount) ? tmp : vCount;
     }     
     var marketDate = $('#imports  input[name="marketDate"]');
     var brandName = $('#imports  input[name="brandName"]');
     var schoolName = $('#imports  input[name="schoolName"]');
     var projectName = $('#imports  input[name="projectName"]');
     var consume = $('#imports  input[name="consume"]');
     var spreadNum = $('#imports  input[name="spreadNum"]');
     var clickNum = $('#imports  input[name="clickNum"]');
     var mediaFrom = $('#imports  input[name="mediaFrom"]');
     var spreadType = $('#imports  input[name="spreadType"]');
     if (vCount > 1) {
         var jsonData2 = new Array();
         for (var i = 0; i < vCount; i++) {
             var jsonObj = {};
             for (var item in jsonData1) {
                 jsonObj[item] = jsonData1[item][i];
             }
             jsonObj["marketDate"] = $(marketDate[i]).val();
             jsonObj["brandName"] = $(brandName[i]).val();
             jsonObj["schoolName"] = $(schoolName[i]).val();
             jsonObj["projectName"] = $(projectName[i]).val();
             jsonObj["consume"] = $(consume[i]).val();
             jsonObj["spreadNum"] = $(spreadNum[i]).val();
             jsonObj["clickNum"] = $(clickNum[i]).val();
             jsonObj["mediaFrom"] = $(mediaFrom[i]).val();
             jsonObj["spreadType"] = $(spreadType[i]).val();
             jsonData2.push(jsonObj);
         }
         return JSON.stringify(jsonData2);
     } else {
         return "[" + JSON.stringify(jsonData1) + "]";
     }
 };    
 
//初始化模型
 $.ajax({
     url: ctx + '/product/selectProductModel',
     type: 'POST',
     dataType: 'json',
     success: function (data) {
    	 	 var opt = "";
         for (var i = 0; i < data.length; i++) {
             opt += "<option value=" + data[i].modelId + ">" + data[i].modelName + "</option>";
         }
         $(".model").html('<option value="">--请选择--</option>' + opt);
         $('.model').trigger('chosen:updated');
         $(".model").chosen({no_results_text: "没有匹配项"});
         $('.chosen-container').width('100%');
         
         $(".product").html('<option value="">--请选择--</option>');
    	 	$('.product').trigger('chosen:updated');
         $(".product").chosen({no_results_text: "没有匹配项"});
         $('.chosen-container').width('100%');
     },
     error: function (response) {
         toastr.error("系统错误5");
     }
 });
 
 $(".model").change(function(){
		$(".product").html('<option value="">--请选择--</option>');
	 $('.product').trigger('chosen:updated');
     $(".product").chosen({no_results_text: "没有匹配项"});
     $('.chosen-container').width('100%');
		var productModelId = $(this).val();
		if(productModelId == null || productModelId == '' ){
			return ;
		}
		 $.ajax({
		        url: ctx + '/product/getProductByModel',
		        type: 'POST',
		        data:{
		        		"productModelId":productModelId
		        },
		        dataType: 'json',
		        success: function (data) {
		        		data = data.data;
		            var opt = "";
		            for (var i = 0; i < data.length; i++) {
		                opt += "<option value=" + data[i].productId + ">" + data[i].productName + "</option>";
		            }
		            $(".product").html('<option value="">--请选择--</option>' + opt);
		            $('.product').trigger('chosen:updated');
		            $(".product").chosen({no_results_text: "没有匹配项"});
		            $('.chosen-container').width('100%');
		        },
		        error: function (response) {
		            toastr.error("系统错误5");
		        }
		    });
});
 
  //初始化品牌
 $.ajax({
     url: ctx + '/bizBrand/getAllOption',
     type: 'POST',
     dataType: 'json',
     success: function (data) {
         var opt = "";
         for (var i = 0; i < data.list.length; i++) {
             opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
         }
         $(".brand").html('<option value="">--请选择--</option>' + opt);
         $('.brand').trigger('chosen:updated');
         $(".brand").chosen({no_results_text: "没有匹配项"});
         $('.chosen-container').width('100%');
         /*$("#adddepartmentId12").html('<option value="">--请选择--</option>'+opt);*/
     },
     error: function (response) {
         toastr.error("系统错误");
     }
 });
    //初始化分校select
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $(".branchSchool").html('<option value="">--请选择--</option>' + opt);
            $('.branchSchool').trigger('chosen:updated');
            $(".branchSchool").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');

        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });

  //初始化媒体来源类型
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 1},
        dataType: 'json',
        success: function (data) {
            var mt = "";
            for (var i = 0; i < data.list.length; i++) {
                mt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $(".mediaSources").html('<option value="">--请选择--</option>' + mt);
            $('.mediaSources').trigger('chosen:updated');
            $(".mediaSources").chosen({no_results_text: "没有匹配项"});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //初始化项目信息
    $.ajax({
        async: false,
        url: ctx + "/bizProject/getAllOption",
        data: {enable: 1},
        dataType: "json",
        success: function (data) {
        	var mt = "";
            for (var i = 0; i < data.list.length; i++) {
                mt += "<option value=" + data.list[i].projectId + ">" + data.list[i].fullName + "</option>";
            };
    		$(".project").html('<option value="">--请选择--</option>' + mt);
            $('.project').trigger('chosen:updated');
            $(".project").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    });
  //初始化推广方式
    $.ajax({
        async: false,
        url: ctx + "/studentAttr/getSpreadType",
        dataType: "json",
        success: function (data) {
        	var mt = "";
            for (var i = 0; i < data.list.length; i++) {
                mt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].spreadType + "</option>";
            };
    		$(".promotion").html('<option value="">--请选择--</option>' + mt);
            $('.promotion').trigger('chosen:updated');
            $(".promotion").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    });
	$(".search-btn").on("click", function () {
		init();
	});
});

function reset(){
	$('.bulkAddBtn').removeAttr('disabled'); 
}


function initData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    aoData.push({
        "name": "beginTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0].trim()
    });
    aoData.push({
        "name": "endTime",
        "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1].trim()
    });
    aoData.push({"name": "studentAttrName", "value": function(){
		    	if($('#mediaSources1 :selected').text() == '--请选择--'){
		    		return '';
		    	}else{
		    		return $('#mediaSources1 :selected').text();
		    	}
    }});
    aoData.push({"name": "departmentName", "value": function(){
		    	if($('#branchSchool1 :selected').text() == '--请选择--'){
		    		return '';
		    	}else{  
		    		return $('#branchSchool1 :selected').text();
		    	}
    }});
    aoData.push({"name": "brandName", "value": function(){
		    	if($('#brandName1 :selected').text() == '--请选择--'){
		    		return '';
		    	}else{
		    		return $('#brandName1 :selected').text();
		    	}
	}});
    aoData.push({"name": "productName", "value": function(){
		    	if($('#product1 :selected').text() == '--请选择--'){
		    		return '';
		    	}else{
		    		return $('#product1 :selected').text();
		    	}
    }});
    aoData.push({"name": "modelName", "value": function(){
		    	if($('#model1 :selected').text() == '--请选择--'){
		    		return '';
		    	}else{
		    		return $('#model1 :selected').text();
		    	}
    }});
    aoData.push({"name": "spreadType", "value": function(){
		    	if($('#promotion1 :selected').text()== '--请选择--'){
		    		return '';
		    	}else{
		    		return $('#promotion1 :selected').text();
		    	}
    }});
    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (response) {
            $('span[id=spanDGT]').text(response.returnObject.iTotalRecords);
            var model = response.returnObject.model;
            var money = '',marketSee = '',marketClick = '';
            if (model != null) {
				money = model.money;
				marketSee = model.marketSee;
				marketClick = model.marketClick;
			}
            var tr = '<tr style="text-align: center;" class="append"><td></td><td></td><td></td><td></td><td></td><td>总计:</td><td>'+money+'</td><td>'+marketSee+'</td><td>'+marketClick+'</td><td></td><td></td><td></td><td></td></tr>'
            $('#certificate').find('thead').find('.append').remove();
            $('#certificate').find('thead').append(tr);
            fnCallback(response.returnObject);
        }
    });
}
function init() {
//	var date = new Date();
    var init = $('#certificate').dataTable({
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
        "sAjaxSource": ctx + '/report/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData,
        "aoColumns": [//回调函数 
            {"mDataProp" : "marketId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ){
             return "<label><input name='marketConsume' class='marketConsume' type='checkbox' value='"+data+"'><span class='text'></span></label>";
             }},
            {"mDataProp": "marketDate", "bSortable": false, 'sClass': "text-center",
            "mRender": function (data, type, full) {
            	data = data.substring(0,10);
            	return data;
            }
            },
            {"mDataProp": "departmentName", "bSortable": false, 'sClass': "text-center"},
            {
                "mDataProp": "brandName",
                "bSortable": false,
                'sClass': "text-center"
            },
            {
                "mDataProp": "modelName",
                "bSortable": false,
                'sClass': "text-center"
            },
            {"mDataProp": "productName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "money", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "marketSee", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "marketClick", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "studentAttrName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "spreadName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "createDate", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "createUserName", "bSortable": false, 'sClass': "text-center"}
           ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }] 
    });
    $("#certificate_wrapper").removeClass();
    $('#certificate_wrapper').addClass("table-scrollable");

    //每页显示记录数
    $('#certificate_wrapper .dataTables_info').parent().append($('#certificate_wrapper .dataTables_length'));
    HScrollBar('#certificate_wrapper');
}

//删除
$(".deleteMarket").on("click", function () {
	var ids = "";
	$('#certificate input.marketConsume:checkbox:checked').each(function(){
		ids += "'"+$(this).val() + "',";
	})
	if(ids.length <= 0){
		toastr.error("请至少选择一条记录！");
		return;
	}
	ids = ids.substr(0, ids.length-1);
	$.ajax({
		 type: "POST",
	        url: ctx + "/report/updateRecord",
	        data: {ids:ids},
	        dataType: 'json',
	        success: function (data) {
	        	if(data.status == "success"){
	        		toastr.success(data.msg);
	        		init();
	        	}
	          },
	    	 error: function (response) {
	             toastr.error("系统错误");
	         }
	});
})
//新增
$(".addMarket .creation-btn").on("click", function () {
	//媒体来源
	var mediaSources = $('#mediaSources :selected').text();
	//分校id
 	var schoolId = $("#branchSchool").val();
 	//分校名称
 	var schoolName = $('#branchSchool :selected').text();
 	//品牌id  
	var brandId = $("#brandName").val();
	//品牌名称
	var brandName = $('#brandName :selected').text();
	//消费
	var consume = $("#consume").val();
	//展现量
	var spreadNum = $("#spreadNum").val();
	//点击量
	var clickNum = $("#clickNum").val();
	//项目id
	var projectId = $("#project").val();
	//项目名称
	var projectName = $('#project :selected').text();
	//推广方式id 
	var spreadId = $("#promotion").val();
	//推广方式
	var spreadType = $('#promotion :selected').text();
	//时间        
	var marketDate = $("#marketDate").val();
	$.ajax({
        type: "POST",
        url: ctx + "/marketConsume/insert",
        data: {'mediaFrom':mediaSources,'schoolId':schoolId,'schoolName':schoolName,'brandId':brandId,
        	 'brandName':brandName,'consume':consume,'spreadNum':spreadNum,'clickNum':clickNum,'projectId':projectId,
        	 'projectName':projectName,'spreadId':spreadId,'spreadType':spreadType,'marketDate':marketDate},
        dataType: 'json',
        success: function (data) {
        	if(data.status == "success"){
        		alert("新增成功！");
        		init();
        	}
          },
    	 error: function (response) {
             toastr.error("系统错误");
         }
    });
})
