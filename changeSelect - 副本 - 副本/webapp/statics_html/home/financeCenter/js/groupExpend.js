$(function(){
	$(".form_datetime").jeDate({
	    format: 'YYYY-MM-DD hh:mm:ss'
	});
	//初始化控件initFileInput(id,uploadurl)控件id，与上传路径
	initFileInput("asingle-upload");
	function initFileInput(ctrlName) {
		var control = $('#' + ctrlName);
		control.fileinput({
			resizeImage: true,
			maxImageWidth: 200,
			maxImageHeight: 200,
			resizePreference: 'width',
			language: 'zh', //设置语言
			uploadUrl: ctx + '/file/uploadFileNew',
			uploadAsync: true,
			allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
			showUpload: true, //是否显示上传按钮
			showCaption: true,//是否显示标题
			browseClass: "btn btn-primary", //按钮样式
			previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
			maxFileCount: 1,
			msgFilesTooMany: "只允许上传一张图片!",
			maxFileSize: 2000
		});
	};

    //判断只允许上传一张图片
	var preview = [];
	$('#asingle-upload').on('filebatchuploadcomplete',function(event,previewId){
	    preview.push(previewId);
	    if(preview.length >= 1){
	    	$('#asingle-upload').attr('disabled',true);
            $('.btn-primary.btn-file,.fileinput-upload').css('opacity',0.5);
        }
	});

    //获取上传图片地址
	var imgUrl = "";
	$('#asingle-upload').on('fileuploaded', function(event,data,previewId,index ) {
		imgUrl = data.response.url;
	});

    //清除预览图片，再次上传
	$('#asingle-upload').on('filecleared',function(event){
		$('#asingle-upload').attr('disabled',false);
        $('.file-caption-main,.btn-primary.btn-file,.fileinput-upload').css('opacity',1);
    });

    //日期
    $("#queryDate").daterangepicker({
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
    $("#queryDate").on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    var userId = $('#userInfo input[name=userId]').val();
    var dutyId = $('#userInfo input[name=dutyId]').val();

    var applicantStatus = null;

    //加载表单
    DataTable = function () {
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
	             	"sAjaxSource" : ctx+'/groupExpend/getAll',
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
	 						{"mData": "applicantStatus", 'sClass': "text-center",
	 							"mRender": function (data, type, full ) {
	 			                		if(data == '3'){
	 			                			return '已支出';
	 			                		}else{
	 			                			return '待支出';
	 			                		}
	 			                }},
	 						{
	 			                "mData": "applyId",
	 			                'sClass': "text-center",
	 			                "bSortable": false,
	 			                "mRender": function (data, type, full ) {
	 			                	var u = "<a data-record='' costclassCode='"+full['costclassCode']+"' applyId='"+full['applyId']+"' class='btn-check'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a> ";
	 			                		if(full['costclassCode'] == '20001'){
	 			                			u += "<a data-record='"+JSON.stringify(full)+"' class='btn-expend' data-toggle='modal' data-backdrop='static'><i class='fa fa-sign-out blue'  data-toggle='tooltip' data-placement='top' data-original-title='退回' title='退回'></i></a>";
	 			                		}
	 			                	return u;
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
	 
	 
	 
	 /**
	  * 退回
	  */
	 $('#appliedTableInit').on('click','.btn-expend',function(){
		 
		 $('#addForm').bootstrapValidator('resetForm');
		 $('#addForm')[0].reset();
		 
		 $('.bs-example-modal-lg1').modal('show');
		 var data = $(this).attr('data-record');
		 data = JSON.parse(data);
		    $.ajax({
		        url: ctx + '/groupExpend/applyDetail',
		        type: 'POST',
		        data:{
		        	applyId:data.applyId
		        },
		        dataType: 'json',
		        success: function (data) {
		        	editor4.html("");
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
		        			var status = data[i].status;
		        			status = statusToStr(status);
		        			str = '<tr><td><label> <input detailId="'+data[i].detailId+'" applyId="'+data[i].applyId+'" infoManageId="'+data[i].infoManageId+'" productId="'+data[i].productId+'" onclick="readMe(this)" type="checkbox"><span class="text"></span></label></td>'
                            +' <td>'+data[i].baoMDate+'</td>'
                            +' <td>'+data[i].studentName+'</td>'
                            +' <td>'+status+'</td>'
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
	 });
	 
	 //点击查看按钮
	 $('#appliedTableInit').on('click','.btn-check',function(){
		 var applyId = $(this).attr('applyId');
		 var costclassCode = $(this).attr('costclassCode');
		 initApplyInfo(applyId);
		 loadDetailForApplySee(applyId);
		 if(costclassCode == '20001'){
			 $('.applyExpend').show();	
		 }else{
			 $('.applyExpend').hide();
		 }
		 $('.Scoresofnew').modal('show');
	 });


	 $('.fiscal-charges').on('hidden.bs.modal', function () {
		 	$('.fiscal-charges .modal-footer button').show();
		 	editor2.html('');
	        $('#expendForm').data('bootstrapValidator').resetForm();
	 });
	 
	 $('#expendForm').bootstrapValidator({
		 message: 'This value is not valid',
		    fields: {
		    	picture: {
		            validators: {
		                notEmpty: {
		                    message: '请上传图片凭证！'
		                },
		            }
		        }
		   },
        submitHandler: function (validator, form, submitButton) {

            var status = submitButton.data('status');

            var params = form.serialize() + "&applicantStatus=" + status + "&content=" + editor2.html() + "&picture=" + imgUrl;
            $.ajax({
                url: ctx + '/groupExpend/addNewExpend',
                data: params,
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        $('.fiscal-charges').modal('hide');
                        DataTable.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
        }
    });

    /**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function retrieveData(sSource, aoData, fnCallback, oSettings) {
        var beganAndEnd = $("#queryDate").val();
        if (beganAndEnd && beganAndEnd.length != 0) {
            var minDate = $("#queryDate").val().split("到")[0];
            var maxDate = $("#queryDate").val().split("到")[1];
            aoData.push({"name": "beginTime", "value": minDate.trim()});
            aoData.push({"name": "endTime", "value": maxDate.trim()});
        }
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        aoData.push({"name": "applicantStatus", "value": applicantStatus});
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

                var money = 0;

                var aaData = response.returnObject.aaData;
                for (var i = 0; i < aaData.length; ++i) {
                    if (!isNaN(aaData[i].money))
                        money += aaData[i].money;
                }

                fnCallback(response.returnObject);
                
                $('[data-toggle="tooltip"]').tooltip();

                var html = '<tr class="odd">';

                for (var i = 0; i < 5; i++)
                    html += '<td class="text-center"></td>';

                html +=
                    '<td class="text-center red">统计:</td>' +
                    '<td class="text-center">' + money + '</td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '<td class="text-center"></td>' +
                    '</tr>';

                $("#appliedTableInit").find("tbody").prepend(html);
            }
        });
    }


    //导航
    $(".nav_par").on("click", "a", function () {
        $(this).addClass("nav-active").parent().siblings().find("a").removeClass("nav-active");
    })

    //日期
    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });

    //关闭图片预览效果
    $(document).on('click', '#kvFileinputModal .btn-close', function () {
        $('#kvFileinputModal').modal('hide');
    })
    
    
    $.ajax({
        url: ctx + '/financeGeneral/showDept',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		var html = '';
                $(data.data).each(function (i, n) {
                    html += '<option value="' + n.departmentId + '">' + n.fullName + '</option>';
                })
                $("#collectionDepartmentId").append('<option value="" selected>请选择</option>');
                $("#collectionDepartmentId").append(html);
                $("#collectionDepartmentId2").append(html);
                $("#collectionDepartmentId").trigger("chosen:updated");
        	}else{
        		swal('',"部门加载失败",'error');
        	}
        }
    });
    showPCostclass();
    
	function cooperationModule(){
        return {
            init:function(){
                //缴费合计点击
                $('.applyDetail').on('click','.edit',function(){
                	var _this=$(this);
                	CREATEUSERID=$(this).attr("productId");
                	INFOMANAGEID=$(this).attr("value");
                	DATESTRING=$(this).attr("dateString");
                	init2();
                	$('.cooperation-module-edit').modal('show');
                })
                
                 $('.applyDetail').on('click','.see',function(){
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
	                					+'	style="height:100px;width:100px;" alt=""> '
	                					+'		<a href="#" onclick=\'lookImg("'+prevUrl+data[i].applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a>';
	                         		var tr = '<tr>'
	                         			+'<td class="text-center">'+data[i].applyDataName+'</td>'
	                         			+'<td class="text-center">'+str+'</td>'
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
})

	function initApplyInfo(applyId){
		$.ajax({
	        url: ctx + '/apply/selectByKey',
	        data:{"applyId":applyId},
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        		data = data.returnObject.aaData;
	        		$(data).each(function(i,item){
	        			$('#financeApplyForm input[name=applicantName]').val(item.applicantName);
	        			$('#financeApplyForm input[name=applicantDate]').val(item.applicantDate);
	        			$('#financeApplyForm input[name=money]').val(item.money);
	        			$('#financeApplyForm select[name=paymentFrom]').val(item.paymentFrom);
	        			$('#financeApplyForm select[name=payment]').val(item.payment);
	        			$('#financeApplyForm input[name=expendDetail]').val(item.expendDetail);
	        			$('#financeApplyForm input[name=invoiceTitle]').val(item.invoiceTitle);
	        			$('#financeApplyForm input[name=departmentName]').val(item.departmentName);
	        			$('#financeApplyForm input[name=projectName]').val(item.projectName);
	        			$('#financeApplyForm input[name=pCostClassName]').val(item.pCostClassName);
	        			$('#financeApplyForm input[name=costClassName]').val(item.costClassName);
	        			$('#financeApplyForm select[name=expendType]').val(item.expendType);
	        			$('#financeApplyForm select[name=isAdjustment]').val(item.isAdjustment);
	        			$('#financeApplyForm input[name=departmentNameT]').val(item.departmentName);
	        			$('#financeApplyForm textarea[name=content]').val(item.content);
	        			
	        			$('#financeApplyForm input[name=payeeName]').val(item.payeeName);
	        			$('#financeApplyForm input[name=bankName]').val(item.bankName);
	        			$('#financeApplyForm input[name=province]').val(item.province);
	        			$('#financeApplyForm input[name=city]').val(item.city);
	        			$('#financeApplyForm input[name=accountName]').val(item.accountName);
	        			$('#financeApplyForm input[name=accountNum]').val(item.accountNum);
	        			$('#financeApplyForm input[name=phone]').val(item.phone);
	        			editor.readonly(true);
	        			try{
	        				editor.html(item.content);
	        			}catch(err){
	        			  
	        			}
	        		});
	        }
		});
	}

function loadDetailForApplySee(applyId){
	$.ajax({
        url: ctx + '/groupExpend/applyDetail',
        type: 'POST',
        data:{
        	applyId:applyId
        },
        dataType: 'json',
        success: function (data) {
        	$('#applyDetailSee').html('');
        		data = data.record;
        		var str = '';
        		for(var i=0;i<data.length;i++){
        			var status = data[i].status;
        			status = statusToStr(status);
        			str = '<tr><td><label> <input detailId="'+data[i].detailId+'" applyId="'+data[i].applyId+'" infoManageId="'+data[i].infoManageId+'" productId="'+data[i].productId+'" onclick="readMe(this)" type="checkbox"><span class="text"></span></label></td>'
                    +' <td>'+data[i].baoMDate+'</td>'
                    +' <td>'+data[i].studentName+'</td>'
                    +' <td>'+status+'</td>'
                    +' <td>'+data[i].ktimeValue+'</td>'
                    +' <td>'+data[i].productName+'</td>'
                    +'<td>'+data[i].sum_price+'</td>'
                    +'<td>'+data[i].sPrice+'</td>'
                    +' <td class="see" productId="'+data[i].productId+'" value="'+data[i].infoManageId+'">查看</td>'
                    +' <td class="edit" productId="'+data[i].productId+'" value="'+data[i].infoManageId+'">记录</td></tr>';
    			$('#applyDetailSee').append(str);
        		}
        		// 无数据时，不展示表头信息
        		if (str == '' || data.length < 1) {
        			$('#applyDetailSee').parent('table').css('display','none');
				}
        }
    });
}

function lookImg(url){
	$("#imgLook").attr("src",url);
	$(".lookImg").modal("show");
}

/**
 * 显示一级费用分类
 */
function showPCostclass() {
    $.ajax({
        url: ctx + '/financeGeneral/showPCostclass',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		 var html = "";
                 $(data.data).each(function (i, n) {
                     html += '<option value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
                 })
                 $("#pCostclassId").append('<option value="" selected>请选择</option>');
                 $("#pCostclassId").append(html);
                 $("#pCostclassId").trigger("chosen:updated");
                 $("#pCostclassId2").append(html);
        	}else{
        		swal('',"一级费用分类加载失败",'error');
        	}
        }
    });
}

/**
 * 显示二级费用分类
 */
$("#pCostclassId").change(function() {
	var _this=this;
	var id=$(_this).val();
	loadCostclassId(id,1);
})

$("#pCostclassId2").change(function() {
	var _this=this;
	var id=$(_this).val();
	loadCostclassId(id,2);
})

function loadCostclassId(id,num){
	$.ajax({
        url: ctx + '/financeGeneral/showCostclass',
        data: {parentId: id},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
                var html = "";
                $(data.data).each(function (i, n) {
                    html += '<option value="' + n.financeCostclassId + '">' + n.costclassName + '</option>';
                })
                if(num==1){
                	$("#costclassId").html(html);
                    $("#costclassId").trigger("chosen:updated");
                }else{
                	 $("#costclassId2").html(html);
                     $("#costclassId2").trigger("chosen:updated");
                }
            }else{
            	swal('',"联动错误",'error');
            }
        }
    });
}

//新增
$('#addForm').bootstrapValidator({
	message : 'This value is not valid',
	excluded : [':disabled'],//[':disabled', ':hidden', ':not(:visible)']
	feedbackIcons : {
		invalid : 'glyphicon gluphicon-remove',
		validating : 'glyphicon glyohicon-refresh'
	},	
	fields : {
		payOrg : {
			validators : {
				notEmpty : {
					message : '付款单位不能为空！'
				}
			}
		},
		collectionDepartment : {
			validators : {
				notEmpty : {
					message : '请选择收款单位！'
				}
			}
		},
		money : {
			validators : {
				notEmpty : {
					message : '金额不能为空！'
				},
                regexp: {
                    regexp: /^\d+\.?\d{0,2}$/,
                    message: '请输入正确的金额。'
                }
			}
		},
		pCostclassId : {
			validators : {
				notEmpty : {
					message : '请选择类别！'
				}
			}
		},
		incomeDetail : {
			validators : {
				notEmpty : {
					message : '收入明细不能为空！'
				}
			}
		}
	}
});



function validateForm() {
	$('#content').text(editor4.html());
	
	if($('#addForm input[name="payOrg"]').val() == ''){
		toastr.error('付款单位不能为空');
		return;
	}
	
	if($('#addForm input[name="payDate"]').val() == ''){
		toastr.error('付款日期不能为空');
		return;
	}
	
	if($('#addForm input[name="money"]').val() == ''){
		toastr.error('金额不能为空');
		return;
	}
	
	if($('#addForm select[name="collectionDepartmentId"]').val() == ''){
		toastr.error('收款单位不能为空');
		return;
	}
	
	if($('#addForm select[name="pCostclassId"]').val() == ''){
		toastr.error('费用类型不能为空');
		return;
	}
	
	var ids = '';
	$("#applyDetail tr").each(function(){
		if($(this).find('input')[0].checked){
			ids = $(this).attr('applyid');
		}
	});
	if(ids == ''){
		toastr.error('至少选择一条记录');
		return;
	}
	
    $.ajax({
        url: ctx + '/financeGeneral/add',
        type: 'POST',
        data: $('#addForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                swal('',"新增成功",'success');
            } else {
            	swal('',"新增失败",'error');
            }
        },
        error: function (response) {
            alert("系统错误");
        }
    });
    $('#myModel').modal('hide');
    return false;
}

function readMe(e){
	var ar1 = new Array();
	$("#applyDetail tr").each(function(){
		if($(this).find('input')[0].checked){
			var ob1 = {};
			ob1["applyId"] = $(this).find('input').attr('applyId');
			ob1["detailId"] = $(this).find('input').attr('detailId');
			ob1["infoManageId"] = $(this).find('input').attr('infoManageId');
			ob1["productId"] = $(this).find('input').attr('productId');
			ob1["productName"] = $(this).find('td').eq(5).text();
			ob1["studentName"] = $(this).find('td').eq(2).text();
			ar1.push(ob1);
		}
	 	editor4.html(JSON.stringify(ar1));
	});
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
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

function statusToStr(e){
	var e = "";
	//0 正常 1转班，2休学，3退费，4补考 5重修,6 退费中 7转化 8-初申 9-已退费 11已经转班
	if(e == 0){
		return '正常';
	}
	if(e == 1){
		return '转班';
	}
	if(e == 2){
		return '休学';
	}
	if(e == 3){
		return '退费';
	}
	if(e == 4){
		return '补考';
	}
	if(e == 5){
		return '重修';
	}
	if(e == 6){
		return '退费中';
	}
	if(e == 7){
		return '转化';
	}
	if(e == 8){
		return '初申';
	}
	if(e == 9){
		return '已退费';
	}
	if(e == 11){
		return '已经转班';
	}
}