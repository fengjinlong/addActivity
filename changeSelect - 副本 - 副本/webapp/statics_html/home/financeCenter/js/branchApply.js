$(function () {
    //日期
    $('#paymentDate').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
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
    $('#paymentDate').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    //分校、校区、项目、级别
    $('.branchSchool').chosen({no_results_text: "没有匹配项"});
    $('.campus').chosen({no_results_text: "没有匹配项"});
    $('.project').chosen({no_results_text: "没有匹配项"});
    $('.grade').chosen({no_results_text: "没有匹配项"});
    
  //加载表单
	  DataTable = function(){
	 	return {
	 		init: function () {
	 			var dutyTable = $('#branchApplyTable').dataTable({
	 				"bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
	             	"bLengthChange": true,//每页显示的记录数
	             	"bFilter": false, //搜索栏
	             	"bSort": true, //是否支持排序功能
	             	"bInfo": true, //显示表格信息
	             	"bAutoWidth": false,  //自适应宽度
	             	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
	             	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
	             	"sAjaxSource" : ctx+'/schoolIncome/loadPayList',
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
	                        {"mData": "hjSum", 'sClass': "text-center"},
	 						{"mData": "payPxSum", 'sClass': "text-center"},
	 						{"mData": "payKwSum", 'sClass': "text-center"},
	 						{"mData": "payJcSum", 'sClass': "text-center"},
	 						{"mData": "payZlSum", 'sClass': "text-center"},
	 						{"mData": "payXySum", 'sClass': "text-center"},
	 						{"mData": "payFwSum", 'sClass': "text-center"},
	 						{"mData": "xjSum", 'sClass': "text-center"},
	 						{"mData": "skSum", 'sClass': "text-center"},
	 						{"mData": "zpSum", 'sClass': "text-center"},
	 						{"mData": "wlSum", 'sClass': "text-center"},
	 						{"mData": "weixin", 'sClass': "text-center"},
	 						{"mData": "zfb", 'sClass': "text-center"},
	 						{"mData": "wl", 'sClass': "text-center"},
	 						{"mData": "zz", 'sClass': "text-center"},
	 						{"mData": "fq", 'sClass': "text-center"}

	                 ],
	                 "aoColumnDefs": [{
	 	   	            sDefaultContent: '',
	 	   	            aTargets: ['_all']
	 	   	        }],
	 	   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	 	   	    	return nRow;
	 	   	     }
	 			});

	 			$("#branchApplyTable_wrapper").removeClass();
	 		    $('#branchApplyTable_wrapper').addClass("table-scrollable");


	 		    //每页显示记录数
	 		    $('#branchApplyTable_wrapper .dataTables_info').parent().append($('#branchApplyTable_wrapper .dataTables_length'));
	 			//每页显示记录数
	 			$('.dataTables_info').parent().append($('.dataTables_length'));
	 		}
	 	}
	 }();
    $("#branchApplyTable tbody").html("<tr><td height='300' colspan='17' class='text-center'></td></tr>");
    $("#branchApplyTable tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init();
    
    /**
	  * 回调函数
	  * @param sSource
	  * @param aoData
	  * @param fnCallback
	  * @returns
	  */
	 function retrieveData( sSource, aoData, fnCallback, oSettings ) {
	 	var beganAndEnd = $("#paymentDate").val();
	 	if(beganAndEnd && beganAndEnd.length != 0){
	     	 var minDate = $("#paymentDate").val().split("到")[0] ;
	         var maxDate = $("#paymentDate").val().split("到")[1] ;
	         aoData.push({ "name": "startTime", "value": minDate.trim() });
	         aoData.push({ "name": "endTime", "value": maxDate.trim() });
	    }
	 	var departmentId1 = $("#departmentId1").val();
	 	aoData.push({ "name": "departmentId1", "value":departmentId1 });
	 	var projectId = $("#projectId").val();
	 	aoData.push({ "name": "projectId", "value":projectId });
	 	var projectLevel = $("#projectLevel").val();
	 	aoData.push({ "name": "projectLevel", "value":projectLevel });
	 	var brandId = $("#brandId").val();
	 	aoData.push({ "name": "brandId", "value":brandId });
	 	var schoolId = $("#schoolId").val();
	 	aoData.push({ "name": "schoolId", "value":schoolId });
 	    $.ajax( {  
	         "url": sSource,  
	         "data": aoData,  
	         "cache": false,  
	         "dataType": 'json', 
	         "type": "POST", 
	         "success" :function(response) {
	         	fnCallback(response.returnObject);
	         	 initAllPay();
	         }  
	     } );  
	 }
	 
	 /**
	  * 加载总量
	  */
	 function initAllPay(){
		 var departmentId1 = $("#departmentId1").val();
		 var startTime = $("#paymentDate").val().split("到")[0] ;
		 var endTime = $("#paymentDate").val().split("到")[1] ;
		 var projectId = $("#projectId").val();
		 var projectLevel = $("#projectLevel").val();
		 var brandId = $("#brandId").val();
		 var schoolId = $("#schoolId").val();
		 $.ajax({
            url: ctx + '/schoolIncome/loadAllPay',
            data: {"startTime": startTime, "endTime": endTime,"departmentId1":departmentId1,"projectId":projectId,"projectLevel":projectLevel,"brandId":brandId,"schoolId":schoolId},
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                	var html = '';
                	console.info(data)
                	$(data).each(function (i, item) {
                		html += '<tr><td class="red text-center">合计</td><td class="red text-center">'+item.hjSum+'</td>'
                		+'<td class="red text-center">'+item.payPxSum+'</td>'
                		+'<td class="red text-center">'+item.payKwSum+'</td>'
                		+'<td class="red text-center">'+item.payJcSum+'</td>'
                		+'<td class="red text-center">'+item.payZlSum+'</td>'
                		+'<td class="red text-center">'+item.payXySum+'</td>'
                		+'<td class="red text-center">'+item.payFwSum+'</td>'
                		+'<td class="red text-center">'+item.xjSum+'</td>'
                		+'<td class="red text-center">'+item.skSum+'</td>'
                		+'<td class="red text-center">'+item.zpSum+'</td>'
                		+'<td class="red text-center">'+item.wlSum+'</td>'
                		+'<td class="red text-center">'+item.weixinSum+'</td>'
                		+'<td class="red text-center">'+item.zfbSum+'</td>'
                		+'<td class="red text-center">'+item.wl+'</td>'
                		+'<td class="red text-center">'+item.zzSum+'</td>'
                		+'<td class="red text-center">'+item.fqSum+'</td>'
                		+'</tr>'
                	});
                	
                	 $("#branchApplyTable").find("tbody").prepend(html);
                }
            }
        });
	 }
	 
	//项目类型，项目联动
	 $("#projectType").on("change",function(){
		 var projectType = $(this).val();
		 if(!projectType){
			 $('#projectId').html('<option value="">--请选择--</option>');
			 $('#projectId').trigger('chosen:updated');
			 $("#projectId").chosen({no_results_text: "没有匹配项", search_contains: true});
	         $('.chosen-container').width('100%');
			return false;
		 }
		 $.ajax({
	         url: ctx + '/bizProject/getAll',
	         data: {projectType: projectType},
	         dataType: 'json',
	         type: 'post',
	         success: function (data) {
	             var opt = "";
	             for (var i = 0; i < data.list.length; i++) {
	                 opt += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
	             }
	             $('#projectId').html('<option value="">--请选择--</option>' + opt);
	             $('#projectId').trigger('chosen:updated');
	             $("#projectId").chosen({no_results_text: "没有匹配项", search_contains: true});
	             $('.chosen-container').width('100%');
	         },
	         error: function () {
	             toastr.error("系统错误");
	         }
	     });
	 });
	 
	 /**
	  * 项目级别联动
	  */
	 $("#projectId").on("change",function(){
		 var projectId = $(this).val();
		 if(!projectId){
			 $('#projectLevel').html('<option value="">--请选择--</option>');
			 $('#projectLevel').trigger('chosen:updated');
			 $("#projectLevel").chosen({no_results_text: "没有匹配项", search_contains: true});
	         $('.chosen-container').width('100%');
			return false;
		 }
		 $.ajax({
		        url: ctx + '/bizProjectLevel/getAllOption',
		        data: {projectId: projectId},
		        dataType: 'json',
		        type: 'post',
		        success: function (data) {
		            var opt = "";
		            for (var i = 0; i < data.list.length; i++) {
		                opt += "<option value='" + data.list[i].projectLevelId + "'>" + data.list[i].levelTitle + "</option>";
		            }
		            $('#projectLevel').html('<option value="">--请选择--</option>' + opt);
		            $('#projectLevel').trigger('chosen:updated');
					 $("#projectLevel").chosen({no_results_text: "没有匹配项", search_contains: true});
			         $('.chosen-container').width('100%');
		        },
		        error: function () {
		            toastr.error("系统错误");
		        }
		    });
	 });
	 
		/**
		 * 初始化分校
		 */ 
	    $.ajax({
	        url: ctx + '/department/getAllOption',
	        type: 'POST',
	        data: {type: 3},
	        dataType: 'json',
	        success: function (data) {
	            var opt = "";
	            for (var i = 0; i < data.list.length; i++) {
	                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
	            }
	            $("#departmentId1").html('<option value="">--请选择--</option>' + opt);
	            $('#departmentId1').trigger('chosen:updated');
	            $("#departmentId1").chosen({no_results_text: "没有匹配项"});
	            $('.chosen-container').width('100%');
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
	    /**
	     * 分校校区级联
	     */
	    $("#departmentId1").on("change",function(){
	    	var departmentId1 = $(this).val();
	    	 $.ajax({
	 	        url: ctx + '/department/getAllOption',
	 	        type: 'POST',
	 	        data: {parentId: departmentId1},
	 	        dataType: 'json',
	 	        success: function (data) {
	 	            var opt = "";
	 	            for (var i = 0; i < data.list.length; i++) {
	 	                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
	 	            }
	 	            $("#schoolId").html('<option value="">--请选择--</option>' + opt);
	 	            $('#schoolId').trigger('chosen:updated');
		            $("#schoolId").chosen({no_results_text: "没有匹配项"});
		            $('.chosen-container').width('100%');
	 	        },
	 	        error: function (response) {
	 	            toastr.error("系统错误");
	 	        }
	 	    });
	    });
	   
	    /**
	     * 初始化招生品牌
	     */
	    $.ajax({
	        url: ctx + '/bizBrand/getAllOption',
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	            var opt = "";
	            for (var i = 0; i < data.list.length; i++) {
	                opt += "<option value=" + data.list[i].brandId + ">" + data.list[i].brandName + "</option>";
	            }
	            $("#brandId").html('<option value="">--请选择--</option>' + opt);
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });

})
