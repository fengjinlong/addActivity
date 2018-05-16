var DataTable = function(){
	return{
		init: function(){
			var Table = $('#partnerVerify').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/examWorkbenchPartner/getAll',
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
        		               	{"mData": "id", 'sClass': "text-center", "mRender": function (data, type, full ) {
        		               		var str = eval(full['payMent']);
        		               		var price = 0;
        		               		if(str!=null){
        		               			price = str[0]['fkje'];
        		               		}
        		               		return '<label> <input infoManageId="'+full['infoManageId']+'" isadmited="'+full['isadmited']+'" id="'+data+'" officialFee="'+(full["officialFee"]?full["officialFee"]:0)+'" partner="'+full["partnerId"]+'" class="info" type="checkbox" value="'+price+'"><span class="text"></span></label>';
        		               	}},
        			            {"mData": "baoMDate", 'sClass': "text-center"},
        			            {"mData": "batch", 'sClass': "text-center"},
        			            {"mData": "isadmited", 'sClass': "text-center", "mRender": function (data, type, full ) {
        		               		if(data==1){
        		               			return "已录取";
        		               		}else{
        		               			return "未录取";
        		               		}
        		               	}},
        			            {"mData": "studentName", 'sClass': "text-center"},
        			            {"mData": "idcard", 'sClass': "text-center"},
        			            {"mData": "phoneBelong", 'sClass': "text-center"},
        			            {"mData": "departmentName1", 'sClass': "text-center"},
        			            {"mData": "ktimeValue", 'sClass': "text-center"},
        			            {"mData": "projectName", 'sClass': "text-center"}, 
        			            {"mData": "projectLevelName", 'sClass': "text-center"},
        			            {
        			                "mData": "id",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var searchButton = "<a data-full=\'"+JSON.stringify(full)+"\' href='#' class='view' > <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看'></i> </a>";
        			                    var phoneButton = "<a data-full=\'"+JSON.stringify(full)+"\' href='#' class='phone' > <i class='fa fa-phone success' data-toggle='tooltip' data-placement='top' data-original-title='电话'></i></a>";
        			                    var infoButton = '<a href="#" data-toggle="modal" data-target=".information" data-backdrop="static"> <i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i> </a>';
        			                    var downLoadButton = '<a href="#" data-toggle="modal" data-target="" data-backdrop="static"> <i class="fa fa-download darkorange" data-toggle="tooltip" data-placement="top" title="下载"></i> </a>';
        			                    return searchButton + phoneButton + infoButton + downLoadButton;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
			$("#partnerVerify_wrapper").removeClass();
		    $('#partnerVerify_wrapper').addClass("table-scrollable");

		    //每页显示记录数
		    $('#partnerVerify_wrapper .dataTables_info').parent().append($('#table55_wrapper .dataTables_length'));

			//横线滚动条
			$('#partnerVerify_wrapper').on('scroll',function(){
				$('#partnerVerify_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		}
	}
}();

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
	
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    
    var dateRange = $(".reservation").val();
    
    var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g');
    
    var startDate = patt.exec(dateRange);
    var endDate = patt.exec(dateRange);
    
    if(startDate && endDate){
    	startDate = startDate[0];
    	endDate = endDate[0];
    	
    	aoData.push({"name": "maxDate", "value": endDate});
        aoData.push({"name": "minDate", "value": startDate});
    }
    
    var projectType = $('#partnerVerify input[name="projectType"]').val();
	var ktime = $('#partnerVerify input[name="ktime"]').val();
	var projectId = $('#partnerVerify input[name="projectId"]').val();
	var partnerId = $('#partnerVerify input[name="partnerId"]').val();
	aoData.push({"name": "aplliedforStatus", "value": 2});
	if(projectType)
		aoData.push({"name": "projectType", "value": projectType});
	if(ktime)
		aoData.push({"name": "ktime", "value": ktime});
	if(projectId)
		aoData.push({"name": "projectId", "value": projectId});
	if(partnerId)
		aoData.push({"name": "partnerId", "value": partnerId});
    
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
        	
        	fnCallback(response.returnObject);
            
            $("#waitExamTable").parent().removeClass();
            $('#waitExamTable').parent().addClass("table-scrollable");
        }
    });
};


function filterTable(){
	DataTable.init();
}

//回车搜索
function search(){
	if(event.keyCode==13){
		filterTable();
	}
}
var jl = 3;
$(function(){
	statistics();
	
	DataTable.init();
	
	$('.search-btn').click(function(){
		filterTable();
	})
	
	
	$('.goback').click(function(){
		var ids = "";
		
		$('#partnerVerify input.info:checkbox:checked').each(function(){
			ids += this.id + ",";
		})
		
		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}
		
		ids = ids.substr(0, ids.length-1);
		
		swal({
            title: "确定退回？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
    	},
   	 	function (isConfirm) {
            if (isConfirm) {
                $.ajax({
    		        url: ctx + '/waitExam/switchStatus',
    		        type: 'POST',
    		        dataType: 'json',
    		        data: {ids:ids, aplliedforStatus:1},
    		        success: function (data) {
    		        	if(data.status == "success"){
    		        		swal("", "退回成功！", "success");
    		        		statistics();
    		        		filterTable();
    		        	}
    		        	else
    		        		toastr.error(data.msg);
    		        },
    		        error: function (response) {
    		            toastr.error("系统错误");
    		        }
    		    });
            }
    	});
		
	});
	
	
	$('.isEnable').click(function(){
		var ids = "";
		$('#partnerVerify input.info:checkbox:checked').each(function(){
			ids += this.id + ",";
		})
		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}
		ids = ids.substr(0, ids.length-1);
		swal({
            title: "确定信息为已报考？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
    	},
   	 	function (isConfirm) {
            if (isConfirm) {
            	$.ajax({
    		        url: ctx + '/waitExam/switchStatus',
    		        type: 'POST',
    		        dataType: 'json',
    		        data: {ids:ids, aplliedforStatus:5,isAdmited:1},
    		        success: function (data) {
    		        	if(data.status == "success"){
    		        		swal("", "申请报考成功！", "success");
    		        		statistics();
    		        		filterTable();
    		        	}
    		        	else
    		        		toastr.error(data.msg);
    		        },
    		        error: function (response) {
    		            toastr.error("系统错误");
    		        }
    		    });
            }
    	});
		
	})
	
	
	$('.send').click(function(){
		var ids = "";
		var price = 0;
		var isadmited = true;
		$('#partnerVerify input.info:checkbox:checked').each(function(){
			ids += this.id + ",";
			if($(this).attr('isadmited')!=1){
				isadmited = false;
			}
		});
		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}
		if(!isadmited){ 
			toastr.error("有学员未录取，重新选择！");
			return;
		}
		ids = ids.substr(0, ids.length-1);
		if(jl==1||jl==0){
			if(jl==1){
				var partner = '';
				
				$('#partnerVerify input.info:checkbox:checked').each(function(){
						
						price = eval(price)+eval(this.value);
						$('#partnerMoney').val(price);	
						partner = $(this).attr('partner');
				});
				$.ajax({
    		        url: ctx + '/bizPartner/getOne',
    		        type: 'POST',
    		        dataType: 'json',
    		        data: {id:partner},
    		        success: function (data) {
    		        	data = eval(data.data);
    		        	var contact = eval(data.contact);
    		        	var bankCard = eval(data.bankCard);
    		        	$('#contact').val(contact[0]['name']);
    		        	$('#bankCard').val(bankCard[0]['bank']);
    		        	$('#contactUser').val(contact[0]['name']);
    		        	$('#contactAccount').val(bankCard[0]['account']);
    		        	$('#contactPhone').val(contact[0]['tel']);
    		        	
    		        
    		        	
    		        },
    		        error: function (response) {
    		            toastr.error("系统错误");
    		        }
    		    });
			}else{
				$('#partnerVerify input.info:checkbox:checked').each(function(){
					price = eval(price)+eval(this.value);
				});
			}
		}else{
			toastr.error("记录集合中有差别数据，请甄选后操作！");
			return;
		}
	});
	
	$('#addApply').click(function(){
		var data = {
      			 invoiceTitle:$('#invoiceTitle').val(),
      			 applicantId:$('#applyUserId').val(),
      		     expendType:1,
      		     infoManageId:$('#infoManageId').val(),
      		     payment:2,
      		     money:$('#partnerMoney').val(),
      		     payeeName:$('#contact').val(),
      		     province:$('#province').val(),
      		     city:$('#city').val()
      	};
		apply(data);
	});
	
	$('#partnerVerify').on('click', '.view,.phone', function(){
		var data = $(this).attr('data-full');
		data = JSON.parse(data);
		showInfoModal(data.infoManageId);
	})

	//日期控件
	$('.reservation').daterangepicker({
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

	$('.reservation').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});


    //时间初始化
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };

    $(".form_datetime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true
    })

    $('.partnerThan').on('hidden.bs.modal', function () {
        $('#partnerThan tbody').html("");
        $('#partner-upload').fileinput('reset');
    })
    //合作方返回结果比对
    $('#partner-upload').fileinput({
    	 language: 'zh',
         uploadUrl: ctx+'/examWorkbenchPartner/analyseFile',
         showPreview: false
    });
    

    $("#partner-upload").on("fileuploaded", function (event, data, previewId, index) {
        var rows = "";

        for (var i = 0; i < data.response.length; ++i) {
            var row = "<tr>";
            row += "<td>" + data.response[i].name + "</td>";
            row += "<td>" + data.response[i].iCard + "</td>";
            row += "<td>" + data.response[i].edu + "</td>";
            row += "<td>" + data.response[i].school + "</td>";
            row += "<td>" + data.response[i].level + "</td>";
            row += "<td>" + data.response[i].pro + "</td>";
            row += "<td>" + (data.response[i].infoManageId==null?"未录取":"录取") + "</td>";
            row += "</tr>";
            rows += row;
        }

        $('#imports').find('tbody').append(rows);

    });

    $('.partnerThanButton').click(function(){
    	$.ajax({
            url: ctx + '/examWorkbenchPartner/partnerThanAdd',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
            	if(data.status = 'success'){
            		$('.partnerThan').modal('hide');
            		DataTable.init();
            		toastr.success("操作成功");
            	}else{
            		toastr.error("系统错误");
            	}
            }
    	});
    });

    //开户行所在省市
    $('.distpicker').distpicker();


    //折叠图标切换
    if ($('.drop-down .sidebar-menu li a').hasClass('menu-dropdown')) {
        $('.drop-down .sidebar-menu .menu-dropdown').find('i').addClass('fa-angle-right');
    }
    $('.drop-down .sidebar-menu .submenu .submenu a').find('i').remove();
    $('.drop-down .sidebar-menu').on('click', '.menu-dropdown', function () {
        if ($(this).next('.submenu').css('display') == 'block') {
            $(this).find('i').addClass('fa-angle-right').removeClass('fa-angle-down');
        } else {
            $(this).find('i').addClass('fa-angle-down').removeClass('fa-angle-right');
            $(this).parent().siblings().find('i').addClass('fa-angle-right').removeClass('fa-angle-down');
        }
    })

    //点击每一项切换对应数据
    function switchingData(parentEle, rightData) {
        $(parentEle).find('.drop-down .sidebar-menu').on('click', 'a', function () {
        	
        	var type = $(this).data('type');
        	var ktime = $(this).data('ktime');
        	var projectId = $(this).data('project');
        	var partnerId = $(this).data('partner');
        	
        	$('#partnerVerify input[name="projectType"]').val(type);
        	$('#partnerVerify input[name="ktime"]').val(ktime);
        	$('#partnerVerify input[name="projectId"]').val(projectId);
        	$('#partnerVerify input[name="partnerId"]').val(partnerId);
        	
        	filterTable();

			var items = $(parentEle).find('.drop-down .sidebar-menu a');
			for(var i= 0; i < items.length;i++){
				$(items[i]).removeClass('active');
			}
			$(this).addClass('active');

            //$(rightData).fadeOut(0).fadeIn(100);
        })
    }

    $('.zhiye li').click(function(){
    	if($(this).attr('ave')!=3){
    		jl = $(this).attr('ave');
    	}
    });
    
    $('.xueli li').click(function(){
    	if($(this).attr('ave')!=3){
    		jl = $(this).attr('ave');
    	}
    });
    
    switchingData('#partnerConfirm', '.partnerInfo');
	$('#partnerConfirm').find('.drop-down .sidebar-menu a').eq(0).addClass('active');

    // 短信类型选择
    $('#msgType').on('change', function () {
        var val = $(this).val().replace('address', $('#schoolIdModelMsg').find('option:selected').text());
        $('#showMsg').val(val)
    })

    //查看右侧固定按钮切换
    $('.right-toolbar a').hover(function () {
        $(this).find('.up').stop().fadeIn(400);
    }, function () {
        $(this).find('.up').stop().fadeOut(400);
    })

    //查看折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().toggle();
    })

    //弹窗层级
    $('.information,.examFeeReturn').on('show.bs.modal', function () {
        $('.examination,.partnerView,.partnerThan,.examView,.absenteeView,.examFee').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.examination,.partnerView,.partnerThan,.examView,.absenteeView,.examFee').css('z-index', 1050);
    });
})
function statistics(){
	//左侧菜单统计
	$.ajax({
        url: ctx + '/examWorkbenchPartner/statistics',
        type: 'POST',
        dataType: 'json',
        async:false,
        data: {aplliedforStatus:2},
        success: function (data) {
        	var total1 = 0;//职业资格总数
    		var total2 = 0;//学历总数
    		$('.partnerList .zhiye').html('');
    		$('.partnerList .xueli').html('');
        	for(var i=0; i<data.length; ++i){
        		if(data[i].project_type == 1){//职业资格
        			total1 += data[i].num;
        			
        			var str = '<li ave=3>' +
        						'<a  href="javascript:;" data-ktime="'+data[i].ktime+'" class="menu-dropdown"><span class="menu-text">'+data[i].ktime_value+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
        						'<ul class="submenu" ktime="'+data[i].ktime+'"></ul>' +
        					  '</li>'; 
        			$('.partnerList .zhiye').append(str);
        			
        		}else if(data[i].project_type == 2){//学历
        			total2 += data[i].num;
        			
        			var str = '<li ave=3>' +
        						'<a  href="javascript:;" data-ktime="'+data[i].ktime+'" class="menu-dropdown"><span class="menu-text">'+data[i].ktime_value+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
        						'<ul class="submenu" ktime="'+data[i].ktime+'"></ul>' +
        					  '</li>'; 
        			$('.partnerList .xueli').append(str);
        		}
        	}
        	$('.partnerList .total-1').html(total1);
        	$('.partnerList .total-2').html(total2);
        	
        	//统计职业资格下的项目
        	zhiyeStatistics();
        	
        	//统计学历下的合作方
        	xueliStatistics();
        	
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
}

function zhiyeStatistics(){
	$.ajax({
        url: ctx + '/examWorkbenchPartner/zhiYeStatistics',
        type: 'POST',
        async:false,
        dataType: 'json',
        data: {aplliedforStatus:2},
        success: function (data) {
        	var total1 = 0;//职业资格总数
    		var total2 = 0;//学历总数
        	for(var i=0; i<data.length; ++i){
    			
    			var str = '<li ave=0>' +
    						'<a  href="javascript:;" data-ktime="'+data[i].ktime+'"  data-project="'+data[i].project_id+'"><span class="menu-text">'+data[i].project_name+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
    					  '</li>'; 
    			$('.zhiye ul[ktime="'+data[i].ktime+'"]').append(str);
        			
        	}
        	
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
}

function xueliStatistics(){
	$.ajax({
        url: ctx + '/examWorkbenchPartner/xueLiStatistics',
        type: 'POST',
        async:false,
        dataType: 'json',
        data: {aplliedforStatus:2},
        success: function (data) {
        	var total1 = 0;//职业资格总数
    		var total2 = 0;//学历总数
        	for(var i=0; i<data.length; ++i){
    			
    			var str = '<li ave=1>' +
    						'<a href="javascript:;" data-ktime="'+data[i].ktime+'" data-partner="'+data[i].partner_id+'"><span class="menu-text">'+data[i].partner_name+'【'+data[i].num+'人】</span> <i class="fa pull-right"></i></a>' +
    					  '</li>'; 
    			$('.xueli ul[ktime="'+data[i].ktime+'"]').append(str);
        	}
        	
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
}
/**
 * 
 * @param 财务申请
 * @returns
 */
function apply(data){
	
	$.ajax({
       url: ctx + "/examWorkbenchPartner/addApply",
       type: 'POST',
       data: data,
       dataType: "json",
       success: function (data) {
       	toastr.success(data.msg);
       	if(data.status=='success'){
       		$.ajax({
       	       url: ctx + "/examWorkbenchPartner/addApply",
       	       type: 'POST',
       	       data: data,
       	       dataType: "json",
       	       success: function (data) {
       	       	toastr.success(data.msg);
       	       	if(data.status=='success'){
       	       		
       	       	}
       	       }
       		});
       	}
       }
	});
}
