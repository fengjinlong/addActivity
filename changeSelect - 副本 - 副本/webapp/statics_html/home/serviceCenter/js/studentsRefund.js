$(function () {
	 //日期控件
    $('#reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: '到',
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
        $(this).val(picker.startDate.format('YYYY-MM-DD') + '到' + picker.endDate.format('YYYY-MM-DD'));
    });
    
	 //上传文件
    $('#bulk-upload').fileinput({
        language: 'zh',
        uploadUrl: ctx+'/file/uploadFileNew',
        showPreview: false
    }).on("fileuploaded", function (event, data, previewId, index) {
        $('#returnFile').val(data.response.url);
     });
    
    //查看折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().slideToggle(400);
    })
    
    
    //退费弹窗关闭展开所有费用
    $('.returnPremium ').on('hide.bs.modal', function () {
        $('.returnPremium  .well .header').next().each(function(index,ele){
            $(ele).slideDown();
        })
    })

    //退款申请
    var i = 1;
    $('.refund-apply').on('click', '.refund-add', function () {
        if ($('.issue-refund').size() == 1) {
            i = 1;
        }
        i++;
        var issueRefund = '<div class="form-group col-sm-12 issue-refund">'
            + '<label class="control-label col-sm-2 no-padding-right" style="margin-left:-5px;">第<span class="issue">' + i + '</span>期退款：金额</label>'
            + '<div class="col-sm-10 padding-left-10 refundApplicationIssue">'
            + '<div class="col-sm-4 no-padding-left ">'
            + '<input type="text" value='+sumfenqi()+' class="form-control">'
            + '</div>'
            + '<div class="col-sm-4 no-padding-left">'
            + '<select name="" class="form-control fs">'
            + '<option value="1">集团支付</option>'
            + '<option value="2">分校支付</option>'
            + '</select>'
            + '</div>'
            + '<div class="col-sm-4 no-padding">'
            + '<select name="" class="form-control">'
            + '<option value="1">汇款</option>'
            + '</select>'
            + '</div>'
            + '</div>'
            + '<a href="#" class="danger refund-minus">'
            + '<i class="fa fa-minus-circle"></i>'
            + '</a>'
            + '</div>';
        $(this).parent().parent().append(issueRefund);
    })
    $('.refund-apply').on('click', '.refund-minus', function () {
        $(this).parent().remove();
    })

    //开户行所在省市
    $('#distpicker').distpicker();
    
    
	 //加载表单
    DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#table11').dataTable({
                    "bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
                    "bLengthChange": true,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": true, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/studentsRefund/load',
                    "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                    "bServerSide": true,
                    "bDestroy": true,
                    "bRetrieve": false,
                    "oLanguage": {
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "抱歉， 没有找到",
                        "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                        "sInfoEmpty": "找不到相关数据",
                        "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                        "sProcessing": "正在加载中...",
                        "sSearch": "搜索",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "尾页"
                        },
                    },
                    "aoColumns": [
                        {"mData": "departmentName1", 'sClass': "text-center"},
                        {"mData": "brandName", 'sClass': "text-center"},
                        {"mData": "studentName", 'sClass': "text-center"},
                        {
                            "mData": "infoManageId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                            	var _class = "_next";
                            	var _tar = ".returnPremium";
                            	if($("#type").val() == 4){
                            		_class = "_end";
                            		_tar = ".refund-apply";
                            	}
                            	var u = "<a href='#' data-record='" + JSON.stringify(full) + "' class='"+_class+"' data-toggle='modal' data-target='"+_tar+"'><i class='fa  fa-check-circle-o blue' data-toggle='tooltip' data-placement='top' data-original-title='审核 ' title='审核'></i></a>";                            		
                                return u;
                            }
                        }

                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        //$('td:eq(2)', nRow).html(aData.enable == '1' ? '有效' : '无效');
                        $('td:eq(5)', nRow).html(aData.studentSex == '0' ? '男' : '女');
                        return nRow;
                    }
                });
                //每页显示记录数
                $('.dataTables_info').parent().append($('.dataTables_length'));
            }
        }
    }();
    //初始化加载数据
	$("#table11 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	$("#table11 tbody>tr>td").mLoading({
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
    function retrieveData(sSource, aoData, fnCallback, oSettings) {
    	aoData.push({
            "name": "beginTime",
            "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[0]
        });
        aoData.push({
            "name": "endTime",
            "value": $("#reservation").val().split("到") == '' ? "" : $("#reservation").val().split("到")[1]
        });
        aoData.push({
            "name": "type",
            "value": $("#type").val()
        });
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        $.ajax({
            "url": sSource,
            "data": aoData,
            "cache": false,
            "dataType": 'json',
            "type": "POST",
            "success": function (response) {
                fnCallback(response.returnObject);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    }
    
    /**
     * 申请退费状态
     */
    $("#table11").on("click","._end",function(){
    	$('.refund-apply .wipe-data').val('');
    	var consultInfo = JSON.parse($(this).attr('data-record'));
    	$("#infoManageId").val(consultInfo.infoManageId);
    	if(consultInfo.enable == '0'){
    		toastr.success("已申请！");
    		return false;
    	}
    	var returnsId = consultInfo.returnsId;
    	//加载学员可退费总金额
    	$.ajax({
            "url": ctx + '/studentsRefund/loadRefundMoney',
            "cache": false,
            "data": {"returnsId":returnsId},
            "dataType": 'json',
            "type": "POST",
            "success": function (data) {
            	var money = data.ysMoney-data.csMoney;
            	$("#money").val(money);
            }

        });
    });
    
    /**
     * 初申。资源未确认。资源确认操作按钮
     */
    $("#table11").on("click","._next",function(){
    	 var consultInfo = JSON.parse($(this).attr('data-record'));
    	 /**-----加载基本信息部分-----**/
    	 $('#tfmc').val(consultInfo.studentName);
    	 $('#tffx').val(consultInfo.departmentName1);
    	 $('#tfxb').val(consultInfo.studentSex=='0'?'男':'女');
    	 $('#tfbm').val(jsDateFormat(consultInfo.BaoMDate));
    	 $('#tfsj').val(consultInfo.studentPhone);
    	 $('#tfzj').val(consultInfo.idcardType=='1'?'身份证':'护照');
    	 $('#tfzjhm').val(consultInfo.idcard);
    	 
    	 $('#tfxm').val(consultInfo.projectName);
    	 $('#tfxm1').val(consultInfo.projectName);
    	 $('#tfxmid').val(consultInfo.projectId);
    	 $('#tfjb').val(consultInfo.projectLevelName);
    	 $('#tfkq').val(consultInfo.kTimeValue);
    	 $('#tfbx').val(consultInfo.classAttr);
    	 $("#reciveName").val(consultInfo.reciveName);
    	 
    	 
    	 //加载已产生费用
    	 $("#tfypx").val(consultInfo.producePx);
    	 $("#tfykw").val(consultInfo.produceKw);
    	 $("#tfyzl").val(consultInfo.produceZl);
    	 $("#tfyxy").val(consultInfo.produceXy);
    	 $("#tfyjc").val(consultInfo.produceJc);
    	 $("#tfyfw").val(consultInfo.produceFw);
    	 
    	 $("#returnsId").val(consultInfo.returnsId);
    	 $("#infoManageId").val(consultInfo.infoManageId)
    	 
    	 var infoManageId = consultInfo.infoManageId;
    	 /**
    	  * 加载课程及费用中信
    	  */
    	 $.ajax({
             "url": ctx + '/studentsRefund/loadConsultInfoPay',
             "cache": false,
             "data": {"infoManageId":infoManageId},
             "dataType": 'json',
             "type": "POST",
             "success": function (data) {
            	 $("#tfpx").val(data._payPx);
            	 $("#tfkw").val(data._payKw);
            	 $("#tfzl").val(data._payZl);
            	 $("#tfxy").val(data._payXy);
            	 $("#tfjc").val(data._payJc);
            	 $("#tffw").val(data._payFw);
            	 $("#tfpx1").val(data.payPX+data.payDZ);
            	 $("#tfkw1").val(data.payKW);
            	 $("#tfzl1").val(data.payZL);
            	 $("#tfxy1").val(data.payXY);
            	 $("#tfjc1").val(data.payJC);
            	 $("#tffw1").val(data.payFW);
            	 
            	 var tfzongji = data._payPx+data._payKw+data._payZl+data._payXy+data._payJc+data._payFw-data._payY-data._payS;
            	 var tfshiji = data.payPX+data.payKW+data.payZL+data.payXY+data.payJC+data.payFW+data.payDZ;
            	 $("#tfzongji").val(tfzongji);
            	 $("#tfshiji").val(tfshiji);
            	 
            	 $("#tfqianfei").val(tfzongji-tfshiji);
            	 tfyheji();
            	 
            	 loadReturns(infoManageId);
             }

         });

    });
    
    /**
     * 加载退费
     * @param e
     * @returns
     */
    function loadReturns(e){
    	$.ajax({
            url: ctx + "/stuServiceCenter/loadReturns",
            type: 'POST',
            data: {
            	infoManageId:e
            },
            dataType: "json",
            success: function (data) {
            	 data = data.data;
    			 $('#payBaoming').val(data.payBaoming);
    		     $('#payTingke').val(data.payTingke);
    		     $('#payZixun').val(data.payZixun);
    		     $('#payZhizi').val(data.payZhizi);
    		     $('#payJiaocaijiaofu').val(data.payJiaocaijiaofu);
    		     $('#payZengpin').val(data.payZengpin);
    		     $('#payWangluoxuexika').val(data.payWangluoxuexika);
    		     $('#payKeshifei').val(data.payKeshifei);
    		     $('#payZhucefei').val(data.payZhucefei);
    		     $('#payBukaofei').val(data.payBukaofei);
    		     $('#payWangluozuxue').val(data.payWangluozuxue);
    		     $('#payShuakashouxufei').val(data.payShuakashouxufei);
    		     $('#payKuahangzhuanzhang').val(data.payKuahangzhuanzhang);
    		     $('#payFapiaoxiangguan').val(data.payFapiaoxiangguan);
    		     $('#payZhuanbanshouxufei').val(data.payZhuanbanshouxufei);
    		     $('#payOrther').val(data.payOrther);
    		     
    		     $('#dataOrther').val(data.dataOrther);
    		     $('#responsibility').val(data.responsibility);
    		     $('#responsibilityPeople').val(data.responsibilityPeople); 
    		     $('#responsibilityPay').val(data.responsibilityPay);
    		     $('#responsibilityContent').val(data.responsibilityContent);
    		     $('#returnsWhy').val(data.returnsWhy);
    		     $('#partner').val(data.partner);
    		     $('#partnerPayEd').val(data.partnerPayEd);
    		     $('#partnerPayReturn').val(data.partnerPayReturn);
    		     $('#schoolReturnAnswer').val(data.schoolReturnAnswer);
    		     $('#returnFile').val(data.returnFile);
    		     $('#returnContent').val(data.returnContent);
    		     $('#dataBaoming').attr("checked",data.dataBaoming==1?true:false);
    		     $('#dataXieyi').attr("checked",data.dataXieyi==1?true:false);
    		     $('#dataFapiao').attr("checked",data.dataFapiao==1?true:false);
    		     $('#dataJiaocaijiaofu').attr("checked",data.dataJiaocaijiaofu==1?true:false);
    		     $('#dataJiaofeipingzheng').attr("checked",data.dataJiaofeipingzheng==1?true:false);
    		     $('#dataZengpin').attr("checked",data.dataZengpin==1?true:false);
    		     $('#dataTingkezheng').attr("checked",data.dataTingkezheng==1?true:false);
    		     if(data.enable==0){
    		    	 $('div .tfclass').find('button').attr("disabled", true);
    		     }else{
    		    	 $('div .tfclass').find('button').attr("disabled", false);
    		     }
            }
    	});
    }
    
    /**
     * 选择状态
     */
    $("#myTab11 li").click(function(){
    	if($("#type").val() != $(this).val()){
    		$("#reservation").val("");
    		$("#type").val($(this).val());
    		$("#table11 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
        	$("#table11 tbody>tr>td").mLoading({
        	    text: '正在加载中，请稍后......',
        	    icon: "../statics_html/common/image/loading5.gif"
        	});
    		DataTable.init();
    	}
    });
});
function init(){
	DataTable.init();
}

function sumfenqi(){
	var a = $('.issue-refund');
	var fyhj = 0;
	for(var i=0;i<a.length;i++){
		fyhj = eval(fyhj) + eval(($(a[i]).find('input').val()==''?0:$(a[i]).find('input').val()));
	}
	fyhj = eval($('#money').val())-eval(fyhj);
	return fyhj;
	
}

/**
 * 剩余费用合计
 * @returns
 */
function tfyheji(e){
	if(e){
		var id = e.id.replace('y','');
		var evalue = e.value;
		if($("#"+id).val()-evalue<0){
			e.value = $("#"+id).val();
		}
	}
	 var a1 =  $('#tfypx').val();
	 var a2 =  $('#tfykw').val();
	 var a3 =  $('#tfyxy').val();
	 var a4 =  $('#tfyjc').val();
	 var a5 =  $('#tfyfw').val();
	 var a6 =  $('#tfyzl').val();
	 var sjhj = 0;
	 sjhj = sjhj + eval((a1 != null && a1 != '') ? a1 : 0);
	 sjhj = sjhj + eval((a2 != null && a2 != '') ? a2 : 0);
	 sjhj = sjhj + eval((a3 != null && a3 != '') ? a3 : 0);
	 sjhj = sjhj + eval((a4 != null && a4 != '') ? a4 : 0);
	 sjhj = sjhj + eval((a5 != null && a5 != '') ? a5 : 0);
	 sjhj = sjhj + eval((a6 != null && a6 != '') ? a6 : 0);
	 $('#tfsyzj').val($('#tfshiji').val()-sjhj);
	 $('#money').val($('#tfshiji').val()-sjhj);
}

/**
 * 退费提交
 * @returns
 */
function returns(e){
	var data = {
			 infoManageId:$('#infoManageId').val(),
			 payBaoming:$('#payBaoming').val(),
		     payTingke:$('#payTingke').val(),
		     payZixun:$('#payZixun').val(),
		     payZhizi:$('#payZhizi').val(),
		     payJiaocaijiaofu:$('#payJiaocaijiaofu').val(),
		     payZengpin:$('#payZengpin').val(),
		     payWangluoxuexika:$('#payWangluoxuexika').val(),
		     payKeshifei:$('#payKeshifei').val(),
		     payZhucefei:$('#payZhucefei').val(),
		     payBukaofei:$('#payBukaofei').val(),
		     payWangluozuxue:$('#payWangluozuxue').val(),
		     payShuakashouxufei:$('#payShuakashouxufei').val(),
		     payKuahangzhuanzhang:$('#payKuahangzhuanzhang').val(),
		     payFapiaoxiangguan:$('#payFapiaoxiangguan').val(),
		     payZhuanbanshouxufei:$('#payZhuanbanshouxufei').val(),
		     payOrther:$('#payOrther').val(),
		     dataBaoming:$('#dataBaoming').val()?1:0,
		     dataXieyi:$('#dataXieyi').val()?1:0,
		     dataFapiao:$('#dataFapiao').val()?1:0,
		     dataJiaocaijiaofu:$('#dataJiaocaijiaofu').val()?1:0,
		     dataJiaofeipingzheng:$('#dataJiaofeipingzheng').val()?1:0,
		     dataZengpin:$('#dataZengpin').val()?1:0,
		     dataTingkezheng:$('#dataTingkezheng').val()?1:0,
		     dataOrther:$('#dataOrther').val(),
		     responsibility:$('#responsibility').val(),
		     responsibilityPeople:$('#responsibilityPeople').val(), 
		     responsibilityPay:$('#responsibilityPay').val(),
		     responsibilityContent:$('#responsibilityContent').val(),
		     returnsWhy:$('#returnsWhy').val(),
		     partner:$('#partner').val(),
		     partnerPayEd:$('#partnerPayEd').val(),
		     partnerPayReturn:$('#partnerPayReturn').val(),
		     schoolReturnAnswer:$('#schoolReturnAnswer').val(),
		     returnFile:$('#returnFile').val(),
		     returnContent:$('#returnContent').val(),
		     type:$("#type").val(),
		     producePx:$('#tfypx').val(),
		     produceKw:$('#tfykw').val(),
		     produceXy:$('#tfyxy').val(),
		     produceJc:$('#tfyjc').val(),
		     produceFw:$('#tfyfw').val(),
		     produceZl:$('#tfyzl').val(),
		     returnsId:$("#returnsId").val(),
		     infoManageId:$("#infoManageId").val(),
		     subType:e
	};
	$.ajax({
        url: ctx + "/studentsRefund/returns",
        type: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
        	if(data.status=="success"){
        		//退费申请
        		if(data.role!=null){
    				toastr.success(data.msg);
    				$('.returnPremium').modal('hide');
    				DataTable.init();
        		}else{
        			if(e==0){
        				toastr.error("权限不足");
        			}
        		}
        	}else{
        		toastr.error(data.msg);
        	}
        }
	});
}


/**
 * 添加申请记录
 * @returns
 */
function addApply(is){
	var a = $('.issue-refund');
	var fy = '';
	var fyhj = 0;
	var fs = '';
	for(var i=0;i<a.length;i++){
		fy += $(a[i]).find('input').val()+",";
		fs += $(a[i]).find('.fs').val()+",";
	}
	fy =fy.substring(0,fy.length-1);
	fs =fs.substring(0,fs.length-1);
	
	for(var i=0;i<a.length;i++){
		fyhj = eval(fyhj) + eval(($(a[i]).find('input').val()==''?0:$(a[i]).find('input').val()));
	}
	if($('#money').val()!=fyhj){
		toastr.error('费用分期金额错误，请确认!');
		return ;
	}
	if($('#professionaProject').val()==null||$('#professionaProject').val()==''){
		toastr.error('收款人错误，请确认!');
		return ;
	}
	$(is).attr('disabled',true);
	var data = {
			 expendDetail:$("#expendDetail").val(),
			 invoiceTitle:$('#invoiceTitle').val(),
			 applicantId:$('#applyUserId').val(),
		     departmentId1:$('#userBMId').val(),
		     projectId:$('#tfxmid').val(),
		     expendType:1,
		     infoManageId:$('#infoManageId').val(),
		     payment:2,
		     payeeName:$('#professionaProject').val(),
		     bankName:$("#bankName").val(),
		     accountName:$("#accountName").val(),
		     accountNum:$("#accountNum").val(),
		     phone:$("#phone").val(),
		     isAdjustment:$('#isAdjustment').val(),
		     departmentId2:$('#departmentId2').val(),
		     approveNextDuty:$('#approveNextDuty').val(),
		     dutyIdVal:$('#dutyIdVal').val(),
		     fy:fy,
		     fs:fs,
		     province:$('#province').val(),
		     city:$('#city').val(),
		     content:editor4.html()
	};
	$.ajax({
        url: ctx + "/stuServiceCenter/addApply",
        type: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
        	toastr.success(data.msg);
        	$('.serviceView').fadeOut(100).modal('hide');
        	$('.refund-apply').fadeOut(100).modal('hide');
        	$("#infoManageId").val("");
        	
        	DataTable.init();
        }
	});
}

/**
 * 加载退费各个状态数量
 */
/*function loadSum(){
	$.ajax({
        url: ctx + '/studentsRefund/loadSum',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	$(data).each(function(i,j){
        		var type = j.type;
        		var count = j.typeCount;
        		if(type == 1){
        			$("#fristApplication").text(count);
        		}
        		if(type == 2){
        			$("#resourcesUnconfirmed").text(count);
        		}
        		if(type == 3){
        			$("#resourcesConfirm").text(count);
        		}
        		if(type == 4){
        			$("#studentApplication").text(count);
        		}
        	});
        }
    });
}*/
