;(function(){
	var dutyId = $("#approveBatchForm input[name=approveDuty]").val();
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

	//加载表单
	  DataTable = function(){
	 	return {
	 		init: function () {
	 			var dutyTable = $('#approveInit').dataTable({
	 				"bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 10,
	             	"bLengthChange": true,//每页显示的记录数
	             	"bFilter": false, //搜索栏
	             	"bSort": false, //是否支持排序功能
	             	"bInfo": true, //显示表格信息
	             	"bAutoWidth": false,  //自适应宽度
	             	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
	             	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
	             	"sAjaxSource" : ctx+'/apply/selectAllByWhere',
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
	                        {
	                        "mData": "applyId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
	                        return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
	                        }
	                        },
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
	 			                	var u = "<a data-record='"+JSON.stringify(full)+"' class='view operate-btn'   data-toggle='modal' data-backdrop='static' ><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
	 			                    var e = "<a name='editApply' data-record='"+JSON.stringify(full)+"' class='edit operate-btn' data-toggle='modal' data-backdrop='static' data-target='#approveModel' ><i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='审批' title='审批'></i></a>&nbsp&nbsp";
	 			                    return u+e;
	 			                }
	 			            }

	                 ],
	                 "aoColumnDefs": [{
	 	   	            sDefaultContent: '',
	 	   	            aTargets: ['_all']
	 	   	        }],
	 	   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	 	   	    	$('td:eq(0) span',nRow).attr("applyId",aData.applyId);
	 	   	    	$('td:eq(8)',nRow).html(aData.paymentFrom=='1'?'集团支付':'分校支付');
	 	   	    	return nRow;
	 	   	     }
	 			});
				$("#approveInit_wrapper").removeClass();
				$('#approveInit_wrapper').addClass("table-scrollable");

				//横线滚动条
				$('#approveInit_wrapper').on('scroll',function(){
					$('#approveInit_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
				})
				//每页显示记录数
				$('#approveInit_wrapper .dataTables_info').parent().append($('#approveInit_wrapper .dataTables_length'));

	 		}
	 	}
	 }();
	 $("#approveInit tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	 $("#approveInit tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
	 });
	 DataTable.init();
	 
	 $('.checkAll').on('click',function(){
		 if($(this).is(":checked")){
			 $('.checkchild').prop('checked',true);
		 }else{
			 $('.checkchild').prop('checked',false);
		 }
	 });
	 
	 
	 //一键审批model
	 $('#approveBatchButton').on('click',function(){
		 
		 if($('#approveInit input.checkchild:checked').length==0){
			 toastr.error("请选择审批的条目");
			 return false;
		 }
		
		 var totalmoney = 0;//费用合计
		 $('#approveInit input.checkchild:checked').each(function(i,item){
			 totalmoney+= parseFloat($(item).parent().parent().parent().find('td').eq(7).text());
		 });
		 //$('#approveBatchForm input[name=approveDate]').val(getFormatDate(new Date()));
		 $('#approveBatchForm input[name=approveDate]').val("当前日期");
		 $('#approveBatchForm input[name=approveCostTotal]').val(totalmoney);
		 $('#approveBatchModel').show();
	 });
	 
	 // 查看 编辑
	 $('#approveInit').on('click','.operate-btn',function(){ 
		 var data = $(this).attr('data-record');
		 data = JSON.parse(data);
		 if($(this).hasClass('view')){
			 //查看
			 loadHtml('/handleCheck/index?isAccraditation=1&applyId='+data.applyId);
		 }else {
			 //编辑  
			 approveInfo(true,data);
			    $.ajax({
			        url: ctx + '/groupExpend/applyDetail',
			        type: 'POST',
			        data:{
			        	applyId:data.applyId
			        },
			        dataType: 'json',
			        success: function (data) {
			        	$('#applyDetail').html('');
			        		data = data.record;
			        		if(data.length == '0'){
			        			$('#divApplyDetail').hide();
			        			$('#buttonApplyDetail').hide();
			        		}else{
			        			$('#divApplyDetail').show();
			        			$('#buttonApplyDetail').show();
			        		}
			        		
			        		var str = '';
			        		for(var i=0;i<data.length;i++){
			        			str = '<tr><td><label> <input detailId="'+data[i].detailId+'" applyId="'+data[i].applyId+'" infoManageId="'+data[i].infoManageId+'" productId="'+data[i].productId+'" onclick="readMe(this)" type="checkbox"><span class="text"></span></label></td>'
	                            +' <td>'+data[i].baoMDate+'</td>'
	                            +' <td>'+data[i].studentName+'</td>'
	                            +' <td>'+data[i].status+'</td>'
	                            +' <td>'+data[i].ktimeValue+'</td>'
	                            +' <td>'+data[i].productName+'</td>'
	                            +'<td>'+data[i].sum_price+'</td>'
	                            +'<td>'+data[i].sPrice+'</td>'
	                            +' <td class="see" productId="'+data[i].productId+'" value="'+data[i].infoManageId+'">查看</td>'
	                            +' <td class="edit" productId="'+data[i].productId+'" value="'+data[i].infoManageId+'">记录</td></tr>';
		        			$('#applyDetail').append(str);
			        		}
			        }
			    });
			 
		 }
	 });
	 //
	 function approveInfo(flag,data){
		 $('#approveForm [name="financeCostclassId"]').val(data.costclassId);
		 $('#approveForm input[name="financeAppmainId"]').val(data.dutyIdVal);
		 $('#approveForm input[name="financeApprovingId"]').val(data.financeApprovingId);
		 $('#approveForm input[name="applyId"]').val(data.applyId);
		 $('#approveForm input[name="dutys"]').val(data.approveNextDuty);
		 !flag?$('#approveButton').css('display','none'):$('#approveButton').css('display','block');
		 $('#approveForm textarea[name=approveAdvice]').prop('disabled',!flag);
		 //$('#approveForm input[name=approveDate]').val(getFormatDate(new Date())); 当前时间
		 addApproveFlow(data);
		 $('#approveModel').show();
		 
	 }
	 function addApproveFlow(result){
		 var applyId = result.applyId;
		 $('#approveFlow').html('');
//		 console.log(ctx + "/accraditation/getApproveFlow/"+applyId);
		 var html='<ul class="timeline">';
		 $.ajax({
				url: ctx + "/apply/loadApprovingStep",
				dataType: 'json',
				data:{"applyId":applyId},
				async:true,
				success: function(data){
					
					var i=1;
					if(data.bizFinanceApprovingUsers != null && data.bizFinanceApprovingUsers.length!=0){
						 html+='<li class="timeline-node"><a class="btn btn-palegreen">开始</a></li>';
						 $.each(data.bizFinanceApprovingUsers,function(index,obj){
							 if(i%2 ==0){
								 html+='<li class="timeline-inverted">';
							 }else{
								 html+='<li>';
							 }
							 html+='<div class="timeline-datetime">';
							 html+='<span class="timeline-time"> '+handleDateFormat(obj.createDate,"time")+' </span>';
							 html+='<span class="timeline-date">'+handleDateFormat(obj.createDate,"date")+'</span>';
							 html+='</div>';
							 html+='<div class="timeline-badge pass">';   
					         html+='<i class="handle-num pass-content">'+i+'</i>';
					         i=i+1;
					         html+='</div>';
					         html+='<div class="timeline-panel">';
					         html+='<div class="timeline-header bordered-bottom bordered-blue">';
					         html+='<span class="timeline-title"> 审批职位:'+obj.dutysName+'<br/><br/>审批状态:'+findStatus(obj.status)+' </span>';
					         html+='<p class="timeline-datetime">';
					         html+='<small class="text-muted">';
					         html+='<i class="glyphicon glyphicon-time"></i>';
					         html+='</small>';
					         html+='</p>';
					         html+='</div>';
					         html+=' <div class="timeline-body">';
					         html+='<p>审批意见:'+obj.memo+'</p>';
					         html+='</div>';
					         html+='</li>';
						 })
					}
					if(data.bizFinanceApprovings != null && data.bizFinanceApprovings.length!=0){
						 html+='<li class="timeline-node"><a class="btn btn-yellow">现在</a></li>';
						 $.each(data.bizFinanceApprovings,function(index,obj){
							 html+='<li>';
							 html+='<div class="timeline-datetime">';
							 html+='<span class="timeline-time">  </span>';
							 html+='<span class="timeline-date">  </span>';
							 html+='</div>';
							 if(index==0){
								 html+='<div class="timeline-badge sky pass-ing">';   
								 html+='<i class="handle-num passing-content">'+i+'</i>';
							 }else{
								 html+='<div class="timeline-badge blue unpass">';   
								 html+='<i class="handle-num unpass-content">'+i+'</i>';
							 }
					         i=i+1;
					         html+='</div>';
					         html+='<div class="timeline-panel">';
					         html+='<div class="timeline-header bordered-bottom bordered-blue">';
					         html+='<span class="timeline-title"> 审批职位:'+obj.dutysName+'</span>';
					         html+='<p class="timeline-datetime">';
					         html+='<small class="text-muted">';
					         html+='<i class="glyphicon glyphicon-time"></i>';
					         html+='</small>';
					         html+='</p>';
					         html+='</div>';
					         html+=' <div class="timeline-body">';
					         html+='<p></p>';
					         html+='</div>';
					         html+='</li>';
						 })
					}
					 html+='<li class="timeline-node"><a class="btn btn-info">结束</a></li>';
					 html+="</ul>";
					 $('#approveFlow').html(html);
				}
		 				
			});
		
	 }
	 
	 
	 $('#approveModel').on('hidden.bs.modal', function () {
		 
		$('#approveForm textarea[name="approveAdvice"]').val('');
		 
 		$('#approveForm').data('bootstrapValidator').resetForm();
 	})
	 
	 //审批
	    $('#approveForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {//表单验证
	        	approveUserName: {
	                validators: {
	                    notEmpty: {
	                        message: '审批人不能为空'
	                    }
	                }
	            },
	            approveAdvice: {
	                validators: {
	                    notEmpty: {
	                        message: '审批意见不能为空'
	                    }
	                }
	            }
	           
	        },
	        submitHandler: function (validator, form, submitButton) {
	        	if($(submitButton).attr('id')=='approvePass'){
	        		$('#approveForm input[name=status]').val('1');
	        	}else{
	        		$('#approveForm input[name=status]').val('3');
	        	}
				 $.ajax({
						type: "POST",
						url: ctx + "/bizFinance/addApprovingUser",
						data: $("#approveForm").serialize(),
						dataType: 'json',
						success: function(data){
							if(data.status == 'success'){
								$('#approveModel').modal('hide');
								$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html('');
								toastr.success(data.msg);
								DataTable.init();
							}else{
								$('#approveModel').modal('hide');
								DataTable.init();
								toastr.error(data.msg);
							}

						}
					});
	            return true;
	        }
	    });
		 //一键审批
	    $('#approveBatchForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {//表单验证
	        	approveUserName: {
	                validators: {
	                    notEmpty: {
	                        message: '审批人不能为空'
	                    }
	                }
	            },
	            approveAdvice: {
	                validators: {
	                    notEmpty: {
	                        message: '审批意见不能为空'
	                    }
	                }
	            }
	           
	        },
	        submitHandler: function (validator, form, submitButton) {
	        	var status;
	        	if($(submitButton).attr('id')=='approveBatchPass'){
	        		status=1;
	        	}else{
	        		status=3;
	        	}
	        	 var approvingUsers=[];
	    		 $('#approveInit input.checkchild:checked').each(function(i,item){
	    			 var data=$(item).parent().parent().parent().find('td').eq(9);
	    			 data = JSON.parse($(data).find("a").eq(1).attr("data-record"));
	    			 var approvingUser={};
	    			 approvingUser.financeCostclassId=data.costclassId;
	    			 approvingUser.financeAppmainId=data.dutyIdVal;
	    			 approvingUser.financeApprovingId=data.financeApprovingId;
	    			 approvingUser.applyId=data.applyId;
	    			 approvingUser.dutys=data.approveNextDuty;
	    			 approvingUser.status=status;
	    			 approvingUsers.push(approvingUser);
	    		 });
	        	/*var applyId="";
	        	 $('#approveInit input.checkchild:checked').each(function(i,item){
	        		 applyId+=$(item).next().attr('applyId')+",";
	        	 });	
	        	 applyId  =applyId.substring(0,applyId.lastIndexOf(","));
	        	 $('#approveBatchForm input[name=applyId]').val(applyId);*/
				 $.ajax({
						type: "POST",
						url: ctx + "/bizFinance/addApprovingUserByList",
						data:  JSON.stringify(approvingUsers),
						dataType: 'json',
						contentType: "application/json; charset=utf-8",
						success: function(msg){
							if(msg.status == 'success'){
								$('#approveBatchModel').modal('hide');
								toastr.success(msg.msg);
								DataTable.init();
							}else{
								$('#approveBatchModel').modal('hide');
								toastr.error(msg.msg);
								DataTable.init();
							}

						}
					});
	            return false;
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
	     aoData.push( { "name": "approveNextDuty", "value": dutyId });
	     var searchVal = $('#searchVal').val();
	     if(searchVal && searchVal.length != 0){
	        if (searchVal == '集团支付') {
	            aoData.push({"name": "searchVal", "value": '1'});
	        } else if (searchVal == '分校支付') {
	            aoData.push({"name": "searchVal", "value": '2'});
	        } else {
	        	aoData.push({ "name": "searchVal", "value": searchVal.trim() });
	        }
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
			var beginTime = $("#queryDate").val().split("到")[0];
			var endTime = $("#queryDate").val().split("到")[1];
			var searchVal = $("#searchVal").val();
			$.ajax({
		        url: ctx + '/apply/getTotalMoneyByWhere',
		        data:{"beginTime":beginTime?beginTime.trim():null,"endTime":endTime?endTime.trim():null,"searchVal":searchVal?searchVal.trim():null,"approveNextDuty":dutyId},
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
		        		var sum = data.data != null ? data.data : '0';
 		        		var html = '<tr class="odd">';
		        		for(var i=0;i<6;i++) html+='<td class="text-center"></td>';
		        		 html+=
		        		'<td class="text-center red">统计:</td>'+
		        		'<td class="text-center">'+sum+'</td>'+
		        		'<td class="text-center"></td>'+
		        		'<td class="text-center"></td>'+
		        		'</tr>';
		        		$("#approveInit").find("tbody").prepend(html);
		        }
			});
		}

    //导航
    $(".nav_par").on("click","a",function () {
        $(this).addClass("nav-active").parent().siblings().find("a").removeClass("nav-active");
    })

    //日期
	    $('.date-picker').datepicker({
		language : 'zh-CN',
		format : 'yyyy-mm-dd'
	}).on('changeDate', function() {
		$(this).datepicker('hide');
	});
	//日期格式化
	Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}  

	 function getFormatDate(date, pattern) {
		if (date == undefined) {
			date = new Date();
		}
		if (pattern == undefined) {
			pattern = "yyyy-MM-dd hh:mm:ss";
		}
		return date.format(pattern);
}  
	
	function getFormatDateByLong(l, pattern) {
		return getFormatDate(new Date(l), pattern);  
   }
    
	
	function cooperationModule(){
        return {
            init:function(){
                //缴费合计点击
                $('#applyDetail').on('click','.edit',function(){
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("productId");
                	INFOMANAGEID=$(this).attr("value");
                	DATESTRING=$(this).attr("dateString");
                	init2();
                	$('.cooperation-module-edit').modal('show');
                })
                
                 $('#applyDetail').on('click','.see',function(){
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("productId");
                	INFOMANAGEID=$(this).attr("value");
                	 $.post(ctx + '/studentServiceCenter/selectApplyDataByInfo',{
                     	infoManageId:INFOMANAGEID,
                     	productId:CREATEUSERID
                     	},
                     	function(data){
                     		if(data.status = 'success'){
                     			$('#detailzl').find('tbody').html('');
	                     		var prevUrl = data.prevUrl;
	                         	data = data.data;
	                         	for(var i=0;i<data.length;i++){
	                         		var str = '<img src="'+prevUrl+data[i].applyUrl+'"'
	                					+'	style="height:200px;width:200px;" alt=""> '
	                					+'		<a href="#" onclick=\'lookImg("'+prevUrl+data[i].applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a>';
	                         		var tr = '<tr>'
	                         			+'<td>'+data[i].applyDataName+'</td>'
	                         			+'<td>'+str+'</td>'
	                         			+'</tr>'
	                         		$('#detailzl').find('tbody').append(tr);
	                         	}
                     		}else{
                     			swal('',"该学员没有上传资料",'error');
                     		}
                     },"json");
                	
                	$('.cooperation-see').modal('show');
                })
                return this;
            }
        }
    }
    cooperationModule().init();
	
	
   })(jQuery)
function tiaozhuan(){
	loadHtml('/accraditationCheck/index');
}

function lookImg(url){
	$("#imgLook").attr("src",url);
	$(".lookImg").modal("show");
}


//回车搜索
function search(){
	if(event.keyCode==13){
		DataTable.init();
	}
}

/**
 * 时间格式化
 */
function handleDateFormat(val,type){
	var date=new Date(val); 
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    month = month < 10 ? ('0' + month) : month;  
    var day = date.getDate();  
    day = day < 10 ? ('0' + day) : day;  
    var hour = date.getHours();  
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var seconde=date.getSeconds();
    seconde = seconde < 10 ? ('0' + seconde) : seconde;
    if(type == "time"){
    	//返回 时间
    	 return hour+':'+minute+':'+seconde; 
    }else if(type == "date"){
    	//返回 日期
    	 return year + '-' + month + '-' + day; 
    }else{
    	 return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde; 
    }
}
function findStatus(status){
	if(status == 0){
		return '未审批';
	}
	if(status == 1){
		return '审批通过';
	}
	if(status == 2){
		return '以复批';
	}
	if(status == 3){
		return '驳回';
	}
}


/**
 * 初始化 查看详情
 * @returns
 */
function init2() {
    var init = $('#detail').dataTable({
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
        "sAjaxSource": ctx+'/consultInfoManagePayFees/queryDetail',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData2,
        "aoColumns": [
                      	{"mDataProp": "createDate",'sClass': "text-center", "mRender": function (data, type, full) {
							return full['createDate'];
						}},
						{"mDataProp": "payName",'sClass': "text-center"},
						{"mDataProp": "payFrom",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['payFrom'])
							{
								case '1':
									return '现金'
									       
								  break;
								case '2':
									return '刷卡'
								  break;
								case '3':
									return '支票'
								  break;
								case '4':
									return '微信'
								  break;
								case '5':
									return '支付宝'
								  break;
								case '6':
									return '网络'
								  break;
								case '7':
									return '银行转账'
								  break;
								case '8':
									return '分期'
								  break;
								default:
									return ''
							}
						}},
						{"mDataProp": "payValue",'sClass': "text-center"},
						{"mDataProp": "isNeIf",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['isNeIf'])
							{
								case 1:
									return '支出'
								case 2:
									return '收入'
								default:
									return ''
							}
						}},
						{"mDataProp": "unAction",'sClass': "text-center", "mRender": function (data, type, full) {
							switch(full['unAction'])
							{
								case 1:
									return '转班'
								case 2:
									return '休学'
								case 3:
									return '退费'
								case 4:
									return '补考'
								case 5:
									return '重修'
								case 6:
									return '正常'
								default:
									return ''
							}
						}},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });

    //每页显示记录数
    $('#detail_wrapper .dataTables_info').parent().append($('#detail_wrapper .dataTables_length'));
}
var CREATEUSERID;
var INFOMANAGEID;
var DATESTRING;
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData2(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "productId", "value":CREATEUSERID});
    aoData.push({"name": "infoManageId", "value":INFOMANAGEID});
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
