$(function () {
    //日期控件
    $('#timeQuantum').daterangepicker({
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
    $('#timeQuantum').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));

        //今天、昨天、最近7天、最近30天
        var dateValue = picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD');
        var today = moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');
        var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(1, 'days').format('YYYY-MM-DD')
        var recently7 = moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');
        var recently30 = moment().subtract(29, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD');

        //今天
        if (dateValue == today) {
            $('.today-btn').addClass('active').siblings().removeClass('active');
        }
        //昨天
        if (dateValue == yesterday) {
            $('.yesterday-btn').addClass('active').siblings().removeClass('active');
        }
        //最近7天
        if (dateValue == recently7) {
            $('.recent7-btn').addClass('active').siblings().removeClass('active');
        }

        //最近30天
        if (dateValue == recently30) {
            $('.recent30-btn').addClass('active').siblings().removeClass('active');
        }


        //按天
        var startDay = picker.startDate.dayOfYear();
        var endDay = picker.endDate.dayOfYear();
        if ((endDay - startDay) > 29) {
            $('.date-btn a').removeClass('active');
        }
    });

    //默认显示今天的日期
    $('#timeQuantum').val(moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));

    //最近日期切换
    $('.date-btn a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).text()) {
            case '今天' :
                $('#timeQuantum').val(moment().format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
            case '昨天' :
                $('#timeQuantum').val(moment().subtract(1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(1, 'days').format('YYYY-MM-DD'));
                break;
            case '最近7天' :
                $('#timeQuantum').val(moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
            case '最近30天' :
                $('#timeQuantum').val(moment().subtract(29, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
                break;
        }
        return false;
    })

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })

    //总数据量点击查看各分校数据
    $('.aggregate-data').on('click', '.collapse-btn', function () {
        if ($(this).is('.fa-plus-square-o')) {
            $(this).removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
            $('.aggregate-data .campusData').slideDown();
            /*DataTable.init();*/
        } else {
            $(this).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            $('.aggregate-data .campusData').slideUp();
        }
    })
    //高级筛选切换
    $('.public-conditions .condition-filtrate').slideUp(0);
    $('.advanced-filter').on('click',function(){
        if($(this).find('i').is('.fa-angle-down')){
            $('.public-conditions .condition-filtrate').slideDown();
            $(this).html('收起筛选<i class="fa fa-angle-up margin-left-5"></i>');
            $("#sele").val("1");
        }else{
            $('.public-conditions .condition-filtrate').slideUp();
            $(this).html('高级筛选<i class="fa fa-angle-down margin-left-5"></i>');
            $("#sele").val("2");
        }
    })
	//点击搜索
    $('.search-btn').on('click',function(){
    	var jsString=$("#selectForm").serialize();
		var beganAndEnd = $("#timeQuantum").val();
	 	if(beganAndEnd && beganAndEnd.length != 0){
	     	 var minDate = beganAndEnd.split(" - ")[0] ;
	         var maxDate = beganAndEnd.split(" - ")[1] ;
	         jsString+="&beginDateString="+ minDate.trim()+" 00:00:00";
	         jsString+="&endDateString="+ maxDate.trim()+" 23:59:59";
	     }
	 	//表格
    	$.ajax({
  	      type: "POST",
  	      url: ctx + '/consultAnalysis/load2',
  	      data: jsString,
  	      async: false, 
  	      dataType: 'json',
  	      success: function (data) {
  	          if (data.status == "success") {
  	            console.log(data.data);
  	            var str='';
  	            $.each(data.data,function(index,obj){
  	            	str+='<tr>'
  	            		+'<td class="consultant" value='+obj.counselorId+'>'+obj.counselor+'</td>'
  	            		+'<td>'+obj.num+'</td>'
  	            		+'<td>'+(obj.sPrice==null?'0.00':obj.sPrice.toFixed(2))+'</td>'
  	            		+'<td>'+(obj.payValueIn==null?'0.00':obj.payValueIn.toFixed(2))+'</td>'
  	            		+'<td>'+(obj.payValueOut==null?'0.00':obj.payValueOut.toFixed(2))+'</td>'
  	            		+'<td>'+(obj.yuyue==null?'0':obj.yuyue)+'</td>'
  	            		+'<td>'+(obj.shangmen==null?'0':obj.shangmen)+'</td>'
  	            		+'<td>'+(obj.baoming==null?'0':obj.baoming)+'</td>'
  	            		if(obj.yuyue==0 || obj.num==0 ||obj.yuyue==null || obj.num==null){
  	            			str+='<td>0</td>'
  	            		}else{
  	            			str+='<td>'+((obj.yuyue/obj.num)*100).toFixed(2)+'%</td>'
  	            		}
  	            		if(obj.shangmen==0 || obj.num==0 ||obj.shangmen==null || obj.num==null){
	            			str+='<td>0</td>'
	            		}else{
	            			str+='<td>'+((obj.shangmen/obj.num)*100).toFixed(2)+'%</td>';
	            		}
  	            		if(obj.baoming==0 || obj.shangmen==0||obj.shangmen==null || obj.baoming==null){
  	            			str+='<td>0</td>'
  	            		}else{
  	            			str+='<td>'+((obj.baoming/obj.shangmen)*100).toFixed(2)+'%</td>'
  	            		}
  	            		str+='<td>0</td>'
  	            		+'<td>0</td>'
  	            		+'<td>0</td>'
  	            		+'</tr>'
  	            })
  	            $("#tbody2").html(str)
  	          } else {
  	              toastr.error("查询出错");
  	          }
  	      }
  	    });
    	//合计
    	$.ajax({
	      type: "POST",
	      url: ctx + '/consultAnalysis/loadSum',
	      data: jsString,
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	            var obj=data.data;
	            var str='';
	            if(obj==null){
	            	str+='<tr>'
	            		+'<td><i class="fa collapse-btn fa-plus-square-o"></i></td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		str+='<td>0.00</td>'
	            		str+='<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'</tr>'
	            }else{
	            	str+='<tr>'
	            		+'<td><i class="fa collapse-btn fa-plus-square-o"></i></td>'
	            		+'<td>'+obj.num+'</td>'
	            		+'<td>'+obj.sPrice.toFixed(2)+'</td>'
	            		+'<td>'+obj.payValueIn.toFixed(2)+'</td>'
	            		+'<td>'+obj.payValueOut.toFixed(2)+'</td>'
	            		+'<td>'+(obj.yuyue==null?'0':obj.yuyue)+'</td>'
  	            		+'<td>'+(obj.shangmen==null?'0':obj.shangmen)+'</td>'
  	            		+'<td>'+(obj.baoming==null?'0':obj.baoming)+'</td>'
	            		if(obj.yuyue==0 || obj.num==0 ||obj.yuyue==null || obj.num==null){
  	            			str+='<td>0</td>'
  	            		}else{
  	            			str+='<td>'+((obj.yuyue/obj.num)*100).toFixed(2)+'%</td>'
  	            		}
  	            		if(obj.shangmen==0 || obj.num==0 ||obj.shangmen==null || obj.num==null){
	            			str+='<td>0</td>'
	            		}else{
	            			str+='<td>'+((obj.shangmen/obj.num)*100).toFixed(2)+'%</td>';
	            		}
	            		if(obj.baoming==0 || obj.shangmen==0 ||obj.baoming==null || obj.shangmen==null){
	            			str+='<td>0.00</td>'
	            		}else{
	            			str+='<td>'+((obj.baoming/obj.shangmen)*100).toFixed(2)+'%</td>'
	            		}
	            		str+='<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'<td>0.00</td>'
	            		+'</tr>'
	            }
	            $("#tbody1").html(str);
	            //遍历发送请求  查询每一个的广告费
	            var guanggaofei=0;
	            $.each($("#tbody2 tr"),function(ind,myTr){
	            	var counselorId=$(myTr).find("td").eq(0).attr("value");
	            	$.post(ctx + '/consultAnalysis/queryReportMarket',{
	            		counselorId:counselorId
	            	},function(o){
	            		var money=o.data;
	            		guanggaofei+=money;
	            		$(myTr).find("td").eq(11).html(money.toFixed(2));
	            		if($(myTr).find("td").eq(1).html()==0){
	            			$(myTr).find("td").eq(12).html(money.toFixed(2));
	            			$(myTr).find("td").eq(13).html("100%");
	            		}else{
	            			$(myTr).find("td").eq(12).html((money/$(myTr).find("td").eq(1).html()).toFixed(2));
	            			$(myTr).find("td").eq(13).html((money/$(myTr).find("td").eq(2).html()*100).toFixed(2)+"%");
	            		}
	            		if(ind==$("#tbody2 tr").length-1){
		            		$("#tbody1").find("tr").find("td").eq(11).html(guanggaofei.toFixed(2));
		            		if($("#tbody1").find("tr").find("td").eq(1).html()==0){
		            			$("#tbody1").find("tr").find("td").eq(12).html(guanggaofei.toFixed(2));
		            			$("#tbody1").find("tr").find("td").eq(13).html("100%");
		            		}else{
		            			$("#tbody1").find("tr").find("td").eq(12).html((guanggaofei/$("#tbody1").find("tr").find("td").eq(1).html()).toFixed(2));
		            			$("#tbody1").find("tr").find("td").eq(13).html((guanggaofei/$("#tbody1").find("tr").find("td").eq(2).html()*100).toFixed(2)+"%");
		            		}
	            		}
	            	})
	            })
	          } else {
	              toastr.error("查询合计出错");
	          }
	      }
	    });
    	//图表
    	$.ajax({
  	      type: "POST",
  	      url: ctx + '/consultAnalysis/loadByDep',
  	      data: jsString,
  	      dataType: 'json',
  	      success: function (data) {
  	          if (data.status == "success") {
  	            var deps=[];
  	            var yeji=[];
  	            $.each(data.data,function(index,obj){
  	            	deps.push(obj.departmentName2);
  	            	yeji.push(obj.sPrice);
  	            })
  	            var deedsCost = echarts.init(document.getElementById('groupDeeds'));
		    	var deedsCost_option = {
		    		tooltip: {
		    			trigger: 'axis',
		    			axisPointer: {
		    				type: 'shadow'
		    			},
		    		},
		    		toolbox: {
		    			feature: {
		    				dataView: {
		    					show: false,
		    					readOnly: false,
		    				},
		    				magicType: {
		    					show: false,
		    					type: ['line', 'bar']
		    				},
		    				restore: {
		    					show: false
		    				},
		    				saveAsImage: {
		    					show: true
		    				}
		    			},
		    			right: 20
		    		},
		    		color: ['#3398DB'],
		    		grid: {
		    			left: '3%',
		    			right: '4%',
		    			bottom: '3%',
		    			containLabel: true
		    		},
		    		xAxis : [
		    			{
		    				type : 'category',
		    				data :deps,
		    				axisTick: {
		    					alignWithLabel: true
		    				}
		    			}
		    		],
		    		yAxis : [
		    			{
		    				type : 'value'
		    			}
		    		],
		    		series : [
		    			{
		    				name:'业绩',
		    				type:'bar',
		    				barWidth: '60%',
		    				data:[]
		    			}
		    		]
		    	};
		        deedsCost.setOption(deedsCost_option);
		        deedsCost.setOption({
		            series: [
		                {
		                    data: yeji
		                }
		            ]
		        })
  	          } else {
  	              toastr.error("展示图表出错");
  	          }
  	      }
  	    });
    })
    //点击咨询师查看详情
    $('.campusData').on('click','.consultant',function(){
    	consultorId = $(this).attr('data-record');
    	consultorDetailDataTable.init();
    	$('.consultantDetails').modal('show');
    	consultorId=0;
    })
   
    
    //初始新增咨询量弹框-初始产品模型option
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) { 
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
            }
            $("#productModelId").html('<option value="">--请选择--</option>' + zxkc);
            $('#productModelId').trigger('chosen:updated');
            $("#productModelId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
  //根据产品模型选产品
    $("#productModelId").change(function(){
    	//存放条件
    	var conditionArray = new Array();
		var condition = 'product_model_id' + "=" + "'"+$("#productModelId").val()+"'";
		conditionArray.push(condition);
    	var conditions = conditionArray.join(" and ");
    	// console.log(conditions)
    	//开始传递条件，查询产品，需要后台对产品剔重
    	$.ajax({
    	      type: "POST",
    	      url: ctx + '/consultInfoManage/findProductOption',
    	      data: {"conditions":conditions},
    	      dataType: 'json',
    	      success: function (data) {
    	          if (data.status == "success") {
    	             var str = "";
              	 for(var i=0; i<data.data.length; i++) {
              		 str += "<option  value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
              	 }
              	 $("#productIds").html( str);
              	 $("#productIds").selectpicker('refresh');
              	 $('.chosen-container').width('100%');
    	          } else {
    	              toastr.error(data.msg);//没有符合条件的产品
    	          }
    	      }
    	  });
    })
    //load咨询量归属
    $.ajax({
        url: ctx + '/consultAnalysis/queryDepartment',
        type: 'POST',
        dataType: 'json',
        data:{type:"3",parentId:"lbl"},
        success: function (data) { 
        	data=data.data;
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].departmentId + ">" + data[i].fullName + "</option>";
            }
            $("#departmentId1s").html(zxkc);
            $("#departmentId1s").selectpicker('refresh');
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    //load咨询师所属公司
    $.ajax({
        url: ctx + '/consultAnalysis/queryDepartment',
        type: 'POST',
        dataType: 'json',
        data:{type:"1",parentId:"lbl"},
        success: function (data) { 
        	data=data.data;
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].departmentId + ">" + data[i].fullName + "</option>";
            }
            $("#companyId").html('<option value="">--请选择--</option>' + zxkc);
            $('#companyId').trigger('chosen:updated');
            $("#companyId").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
  //根据公司 查部门
    $("#companyId").change(function(){
    	 $.ajax({
	        url: ctx + '/consultAnalysis/queryDepartment',
	        type: 'POST',
	        dataType: 'json',
	        data:{type:"2",parentId: $("#companyId").val()},
	        success: function (data) { 
	        	data=data.data;
	            var zxkc = "";
	            for (var i = 0; i < data.length; i++) {
	                zxkc += "<option value=" + data[i].departmentId + ">" + data[i].fullName + "</option>";
	            }
	            $("#departmentIds").html(zxkc);
	            $("#departmentIds").selectpicker('refresh');
	            $('.chosen-container').width('100%');
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
    })
    
    //根据多选的部门 查 咨询师
    $("#departmentIds").change(function(){
    	// console.log($("#departmentIds").val().join(","))
    	 $.ajax({
	        url: ctx + '/consultAnalysis/queryUses',
	        type: 'POST',
	        dataType: 'json',
	        data:{departmentIds:$("#departmentIds").val().join(",")},
	        success: function (data) { 
	        	data=data.data;
	            var zxkc = "";
	            for (var i = 0; i < data.length; i++) {
	                zxkc += "<option value=" + data[i].userId + ">" + data[i].realName + "</option>";
	            }
	            $("#userIds").html(zxkc);
	            $("#userIds").selectpicker('refresh');
	            $('.chosen-container').width('100%');
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
    })
    
})


function initTable() {
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
        "sAjaxSource": ctx + '/consultAnalysis/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataTable5,
        "aoColumns": [
			{"mDataProp": "check",'sClass': "text-center", "mRender": function (data, type, full) {
				var str='<label> <input class="checkchild" type="checkbox" data-pro="'+full['projectInfoManageId']+'" data-info="'+full['infoManageId']+'"> <span class="text"></span></label>'
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
function initDataTable5(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "queryType", "value": $("#queryType").val()});
    var beganAndEnd = $("#timeQuantum").val();
 	if(beganAndEnd && beganAndEnd.length != 0){
     	 var minDate = beganAndEnd.split(" - ")[0] ;
         var maxDate = beganAndEnd.split(" - ")[1] ;
         aoData.push({ "name": "beginDateString", "value": minDate.trim()+" 00:00:00" });
         aoData.push({ "name": "endDateString", "value": maxDate.trim()+" 23:59:59" });
     }
 	aoData.push({"name": "companyId", "value":$("#companyId").val()});
 	aoData.push({"name": "departmentIds", "value":$("#departmentIds").val().join(",")});
 	aoData.push({"name": "userIds", "value":$("#userIds").val().join(",")});
 	aoData.push({"name": "departmentId1s", "value":$("#departmentId1s").val().join(",")});
 	aoData.push({"name": "productModelId", "value":$("#productModelId").val()});
 	aoData.push({"name": "productIds", "value":$("#productIds").val().join(",")});
 	aoData.push({"name": "jiaofeiType", "value":$("#jiaofeiType").val()});
 	aoData.push({"name": "jiaofei", "value":$("#jiaofei").val().join(",")});
 	var isAutoSend = document.getElementsByName('isAuto');
 	var zaizhi="";
    for (var i = 0; i < isAutoSend.length; i++) {
        if (isAutoSend[i].checked == true) {
        	zaizhi=isAutoSend[i].value;
        }
    }
 	aoData.push({"name": "zaizhi", "value":zaizhi});
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






