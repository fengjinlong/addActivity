;(function(){
	
	
	init();
	
	function init(){
    	initDepartment();//部门
    	initProject();//产品
    	initBankInfo();//银行信息
    }
	
	
	//初始化部门
	 function initDepartment(){
		 $.ajax({
				url:ctx+"/department/selectDepartementByUser",
				dataType : "json",
				async:true,
				success:function(data){
					$('#financeApplyForm input[name=departmentId1]').val(data.departmentId);
					$('#financeApplyForm input[name=departmentId1]').prev().val(data.fullName);
					$('#financeApplyForm input[name=departmentId2]').val(data.departmentId);
					$('#financeApplyForm input[name=departmentId2]').prev().val(data.fullName);
				}
			})
	 }
	
	//初始化 产品
	 function initProject(){
		 $('#financeApplyForm select[name=projectId]').find('option').remove();
		 var option = "<option value=-1>--请选择--</option>";
		 $('#financeApplyForm select[name=projectId]').append(option);
		 $.ajax({
				url:ctx+"/product/selectAll",
				async:true,
				success:function(data){
					$(data.list).each(function(i,item){
						var option= "<option value='"+item.productId+"'>"+item.productName+"</option>";
						$('#financeApplyForm select[name=projectId]').append(option);
					});
				}
			})
	 }
	 
	 
	//初始化收款人信息
	 var bankArray = new Array();
	 function initBankInfo(){
		 var option = "<option value=-1>--请选择--</option>";
		 $('#financeApplyForm select[name=payeeId]').find('option').remove();
		 $('#financeApplyForm select[name=payeeId]').append(option);
		 $.ajax({
				url:ctx+"/bizFinance/load",
				async:true,
				success:function(data){
					$(data.returnObject.aaData).each(function(i,item){
						bankArray.push(item);
						var option= "<option value='"+item.financePayeeId+"'>"+item.accountName+"</option>";
						$('#financeApplyForm select[name=payeeId]').append(option);
					});
				}
			})
	 }
	 //收款人切换
	 $('#financeApplyForm select[name=payeeId]').change(function(){
		 var payeeId = $(this).val();
		 fillBankInfo('#financeApplyForm',payeeId);
	 });
	 //填写银行信息
	 function fillBankInfo(id,payeeId){
		 $(bankArray).each(function(i,item){
			 if(item.financePayeeId==payeeId){
					$(id).find('input[name=bankName]').val(item.bankName);
					$(id).find('input[name=province]').val(item.province);
					$(id).find('input[name=city]').val(item.city);
					$(id).find('input[name=payeeName]').val(item.accountName);
					$(id).find('input[name=accountNum]').val(item.accountNum);
					$(id).find('input[name=phone]').val(item.phone);
					$(id).find('input[name=accountName]').val(item.accountName);
					return false;
			  }
		 });
	 }
	 //编辑确定
	 $('#financeApplyForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {//表单验证
	        	money: {
	                validators: {
	                    notEmpty: {
	                        message: '金额不能为空'
	                    },
	                    regexp:{
	                    	regexp: /^\d+(\.\d{1,2})?$/,
	                    	message: '金额只能为数字且只有两位小数点'
	                    }
	                }
	            },
	            expendDetail:{
	                validators: {
	                    notEmpty: {
	                        message: '支出明细不能为空'
	                    }
	                }
	            },
	            invoiceTitle: {
	                validators: {
	                    notEmpty: {
	                        message: '发票抬头不能为空'
	                    }
	                }
	            },
	            payeeId:{
	                validators: {
	                	callback: {  
	                        message: '选择收款人',  
	                        callback: function(value,validator){
	                       	 return !(value=='-1');
	                       }
	                   }  
	                }
	            }
	        },
	        submitHandler: function (validator, form, submitButton) {
	        	if($('#financeApplyForm select[name=projectId]').val()=='-1'){
	        		$('#financeApplyForm select[name=projectId]').val('');
	        	}
	            $.ajax({
	                url: ctx + "/apply/editFinanceApply",
	                type: 'POST',
	                data: $('#financeApplyForm').serialize(),
	                dataType: 'json',
	                success: function (data) {
	                    if (data.status == "success"){
	                    	$('#financeApplyModel').modal('hide');
	                    	toastr.success("编辑成功");
	                    	DataTable.init();
	                    }else{
	                    	toastr.error("编辑失败");
	                    }
	                },
	                error: function (response) {
	                	toastr.error("系统错误");
	                }
	            });
	            return false;
	        }
	    });
	
	//日期
	$('#queryDate').daterangepicker({
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
	$('#queryDate').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});


	var userId = $('#userInfo input[name=userId]').val();
	var dutyId = $('#userInfo input[name=dutyId]').val();
	var applicantStatus =null;
	var turnoverType = null;
	//切换按钮
	$('.state-btn a').on('click', function () {
		$(this).addClass('state-active').siblings().removeClass('state-active');
		var selectId =$(this).attr('id');
		if(selectId=='appliedAll'){
			applicantStatus =null;
			turnoverType = null;
		}else if(selectId=='appliedComplete'){
			applicantStatus='3';
			turnoverType = null;
		}else if(selectId=='appliedApproving'){
			applicantStatus='0';
			turnoverType = null;
		}else if(selectId=='appliedBack'){
			applicantStatus = null;
			turnoverType = 3;
		}
		$("#appliedTableInit").mLoading({
            text: '正在加载中，请稍后......',
            icon: "../statics_html/common/image/loading5.gif"
        });
        $('#appliedTableInit .mloading-mask').css({
            'top':'35px',
            'background-color':'rgba(233, 233, 232, 0.5)'
        });
        DataTable.init();
        $("#appliedTableInit").mLoading('hide');
		return false;
	});
	
	//加载表单
	  DataTable = function(){
	 	return {
	 		init: function () {
	 			var dutyTable = $('#appliedTableInit').dataTable({
	 				"bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
	             	"bLengthChange": true,//每页显示的记录数
	             	"bFilter": false, //搜索栏
	             	"bSort": false, //是否支持排序功能
	             	"bInfo": true, //显示表格信息
	             	"bAutoWidth": false,  //自适应宽度
	             	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
	             	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
	             	"sAjaxSource" : ctx+'/applied/selectAllByWhere',
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
	                        {"mData": "applicantDate", 'sClass': "text-center"},
	 						{"mData": "departmentName", 'sClass': "text-center"},
	 						{"mData": "applicantName", 'sClass': "text-center"},
	 						{"mData": "pCostClassName", 'sClass': "text-center"},
	 						{"mData": "costClassName", 'sClass': "text-center"},
	 						{"mData": "expendDetail", 'sClass': "text-center"},
	 						{"mData": "money", 'sClass': "text-center"},
	 						{"mData": "paymentFrom", 'sClass': "text-center"},
	 						{
	 			                "mData": "applyId",
	 			                'sClass': "text-center",
	 			                "bSortable": false,
	 			                "mRender": function (data, type, full ) {
	 			                	var u = "<a data-record='"+JSON.stringify(full)+"' class='view'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>&nbsp&nbsp";
	 			                	var v="";
	 			                	if(full['applicantStatus']==2){
	 			                		v+="<a data-value='"+full['applyId']+"' onclick='editShow(this)' class='edit'><i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>&nbsp&nbsp";
	 			                	}
	 			                    return u+v;
	 			                }
	 			            }

	                 ],
	                 "aoColumnDefs": [{
	 	   	            sDefaultContent: '',
	 	   	            aTargets: ['_all']
	 	   	        }],
	 	   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	 	   	    	$('td:eq(7)',nRow).html(aData.paymentFrom=='1'?'集团支付':'分校支付');
	 	   	    	return nRow;
	 	   	     }
	 			});

	 			//每页显示记录数
	 		    $('.dataTables_info').parent().append($('.dataTables_length'));
	 		}
	 	}
	 }();
	 
	 $("#appliedTableInit tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	 $("#appliedTableInit tbody>tr>td").mLoading({
	     text: '正在加载中，请稍后......',
	     icon: "../statics_html/common/image/loading5.gif"
	});
	 DataTable.init();
	 $('#appliedTableInit').on('click','.view',function(){debugger
		 var data = $(this).attr('data-record');
		 data = JSON.parse(data);
		 if($(this).hasClass('view')){
			 loadHtml('/handleCheck/index?isApplied=1&applyId='+data.applyId);
		 }
	 });
	 
	 /**
	  * 回调函数
	  * @param sSource
	  * @param aoData
	  * @param fnCallback
	  * @returns
	  */
	 function retrieveData( sSource, aoData, fnCallback, oSettings ) {
	 	var beganAndEnd = $("#queryDate").val();
	 	if(beganAndEnd && beganAndEnd.length != 0){
	     	 var minDate = $("#queryDate").val().split("到")[0] ;
	         var maxDate = $("#queryDate").val().split("到")[1] ;
	         aoData.push({ "name": "beginTime", "value": minDate.trim() });
	         aoData.push({ "name": "endTime", "value": maxDate.trim() });
	     }
	     aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	     aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength }); 
	     aoData.push( { "name": "applicantStatus", "value": applicantStatus });
	     aoData.push( { "name": "turnoverType", "value": turnoverType });
	     var searchVal = $('#searchVal').val();
	     if(searchVal && searchVal.length != 0){
	     	aoData.push({ "name": "searchVal", "value": searchVal.trim() });
	     }
	     $.ajax( {  
	         "url": sSource,  
	         "data": aoData,  
	         "cache": false,  
	         "dataType": 'json', 
	         "type": "POST", 
	         "success" :function(response) {
	         	fnCallback(response.returnObject);
	         	initTotalIncome();
	         	$('[data-toggle="tooltip"]').tooltip();
	         }  
	     } );  
	 }
	 
	 //统计
	 function initTotalIncome(){
//		 return false
			var beginTime = $("#queryDate").val().split("到")[0];
			var endTime = $("#queryDate").val().split("到")[1];
			var searchVal = $("#searchVal").val();
			$.ajax({
		        url: ctx + '/applied/getTotalMoneyByWhere',
		        data:{
		        	"beginTime":beginTime?beginTime.trim():null,
        			"endTime":endTime?endTime.trim():null,
					"searchVal":searchVal?searchVal.trim():null,
					"turnoverType":turnoverType,
					"applicantStatus":applicantStatus
					},
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
		        		var html = '<tr class="odd">';
		        		for(var i=0;i<5;i++) html+='<td class="text-center"></td>';
		        		 html+=
		        		'<td class="text-center red">统计:</td>'+
		        		'<td class="text-center">'+data.data+'</td>'+
		        		'<td class="text-center"></td>'+
		        		'<td class="text-center"></td>'+
		        		'</tr>';
		        		$("#appliedTableInit").find("tbody").prepend(html);
		        }
			});
		}

    //导航
    $(".nav_par").on("click","a",function () {
        $(this).addClass("nav-active").parent().siblings().find("a").removeClass("nav-active");
    })

    //日期
    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });


})(jQuery)

//编辑 回显
function editShow(_this){
	var applyId = $(_this).attr("data-value");
	$.post(ctx + '/apply/findFinanceApply',{"applyId":applyId},function(data){
		if(data.status=="success"){
    		$(data.financeApply).each(function(i,item){
    			$('#financeApplyForm input[name=applyId]').val(item.applyId);
    			$('#financeApplyForm input[name=applicantName]').val(item.applicantName);
    			$('#financeApplyForm input[name=applicantDate]').val(item.applicantDate);
    			$('#financeApplyForm input[name=money]').val(item.money);
    			$('#financeApplyForm select[name=paymentFrom]').val(item.paymentFrom);
    			$('#financeApplyForm select[name=payment]').val(item.payment);
    			$('#financeApplyForm input[name=expendDetail]').val(item.expendDetail);
    			$('#financeApplyForm input[name=invoiceTitle]').val(item.invoiceTitle);
    			$('#financeApplyForm input[name=departmentName]').val(item.departmentName);
    			$('#financeApplyForm select[name=projectId]').val(item.projectId);
    			
    			$('#financeApplyForm input[name=projectName]').val(item.projectName);
    			$("#financeApplyForm [name='pCostclassId']").html("<option value='"+item.pCostclassId+"'>"+item.pCostClassName+"</option>");
    			$('#financeApplyForm select[name=costclassId]').html("<option value='"+item.costclassId+"'>"+item.costClassName+"</option>");
    			$('#financeApplyForm select[name=expendType]').val(item.expendType);
    			$('#financeApplyForm select[name=isAdjustment]').val(item.isAdjustment);
    			$('#financeApplyForm input[name=departmentNameT]').val(item.departmentName);
    			$('#financeApplyForm textarea[name=content]').val(item.content);
    			$('#financeApplyForm select[name=payeeId]').val(item.payeeId);
    			$('#financeApplyForm input[name=bankName]').val(item.bankName);
    			$('#financeApplyForm input[name=province]').val(item.province);
    			$('#financeApplyForm input[name=city]').val(item.city);
    			$('#financeApplyForm input[name=accountName]').val(item.accountName);
    			$('#financeApplyForm input[name=accountNum]').val(item.accountNum);
    			$('#financeApplyForm input[name=phone]').val(item.phone);
    			
				$('#financeApplyForm input[name="approveNextDuty"]').val(data.bizFinanceApprovings[0].dutys);
    			
    			
    			try{
    				editor.html(item.content);
    			}catch(err){
    			  
    			}
    			//审批流
    			var dytusArray=[];
				$.each(data.bizFinanceApprovings,function(index,obj){
					dytusArray.push(obj.dutysName);
				})
				$('#financeApplyForm input[name="approveNextDuty"]').val(data.bizFinanceApprovings[0].dutys);
    			loadAppvoe(dytusArray);
				$('.financeApply').modal('show');
    		});
		}else{
			toastr.error("加载数据失败");
		}
	},"json");
}

//加载审批流
function loadAppvoe(dytusArray){debugger
	 $('#approveFlow').html('');
	 
	 var html = "";
	 
	 var approvesArray = new Array();
	 
	 approvesArray.push("申请");
	 Array.prototype.push.apply(approvesArray,dytusArray)
	 approvesArray.push("结束");
	 
	 var lines = Math.ceil(approvesArray.length/4);
	 
	 for(var i=0; i<lines; ++i){
		 html += '<div class="col-sm-offset-2 approve-flow-'+i+'" ></div>'
	 }
	 
	 $('#approveFlow').append(html);
	 
	 var revase = 0;
	 for(var i=0; i<approvesArray.length; ++i){
		 
		line_num = Math.trunc(i/4);
		
		if( (i+1)%4 == 0 && revase == 0 ){//每一行的末尾 1,3,5行
			var label = "";
			if(i == approvesArray.length-1)
				label = '<label>'+
                           	'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
                           '</label>';
			else
				label = '<label>'+
		                	'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
		                	'<i class="fa fa-mail-forward round"></i>'+
		                '</label>';
			$('.approve-flow-'+line_num+'').append(label);
			revase = 1;
		}else if( (i+1)%4 == 0 && revase == 1 ){//每一行的末尾，2,4,6行
			var label = "";
			if(i == approvesArray.length-1)
				label = '<label>'+
							'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
						'</label>';
			else
				label = '<label>'+
								'<i class="fa fa-mail-reply"></i>'+
								'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
							'</label>';					
			$('.approve-flow-'+line_num+'').prepend(label);
			revase = 0;
		}else if(revase == 0){//每一行的开头 1,3,5行
			var label = "";
			if(i == approvesArray.length-1)
				var label = '<label>'+
								'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
							'</label>';
			else
				var label = '<label>'+
								'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
								'<i class="glyphicon glyphicon-arrow-right"></i>'+
							'</label>';
			$('.approve-flow-'+line_num+'').append(label);
		}else if(revase == 1){//每一行的开头 2,4,6行
			var label = "";
			if(i == approvesArray.length-1)
				var label = '<label>'+
								'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
							'</label>';
			else
				var label = '<label>'+
								'<i class="glyphicon glyphicon-arrow-left"></i>'+
								'<a class="label label-info badge-square" style="padding:20px">'+approvesArray[i]+'</a>'+
							'</label>';
				$('.approve-flow-'+line_num+'').prepend(label);
		}
	 }
	 
}
//回车搜索
function search(){
	if(event.keyCode==13){
		DataTable.init();
	}
}