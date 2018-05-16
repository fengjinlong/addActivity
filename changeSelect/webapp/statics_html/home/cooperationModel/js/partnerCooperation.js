$(function(){
    /**
     * 插件初始化
     * @returns {{init: init}}
     */
	init();
	//搜索回车
	$("#key").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init();
        }
    });
    function cooperationPattern(){
        return {
            init:function(){
                //新增
                $('.addBtn').on('click',function(){
                	$('.partner-cooperation-add [name="dateString"]').val("");
                	$('.partner-cooperation-add [name="enable"]').val("1");
                	k2.html("");
                	//加载合作方
                	$.post(ctx+"/department/selectDepartment",{
                		'type':'3'
                	},function(data){
                		if(data.status='success'){
                			console.log(data.data)
                			var str='<option value="">请选择</option>';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.departmentId+'">'+val.shortName+'</option>';
                			})
                			$(".partner-cooperation-add [name='schoolId']").html(str);
                			$(".partner-cooperation-add [name='schoolId']").trigger("chosen:updated");
                		}else{
                			swal('',"合作方加载出错",'error');
                		}
                	},"json");
                	
                	//加载合作模式
                	$.post(ctx+"/financeServicePattern/queryPatterns",{
                		
                	},function(data){
                		if(data.status='success'){
                			console.log(data.data)
                			var str='<option value="">请选择</option>';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.financeServicePatternId+'">'+val.financeServicePatternName+'</option>';
                			})
                			$(".partner-cooperation-add [name='financeServicePatternId']").html(str);
                			$(".partner-cooperation-add [name='financeServicePatternId']").trigger("chosen:updated");
                		}else{
                			swal('',"合作模式加载出错",'error');
                		}
                	},"json");
                    $('.partner-cooperation-add').modal('show');
                })

                //编辑
                $('#partnerCooperation').on('click','.edit',function(){
                	var _this=$(this);
                	//加载合作方
                	$.post(ctx+"/department/selectDepartment",{
                		'type':'3'
                	},function(data){
                		if(data.status='success'){
                			var str='';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.departmentId+'">'+val.shortName+'</option>';
                			})
                			$(".partner-cooperation-edit [name='schoolId']").html(str);
                			
                		}else{
                			swal('',"合作方加载出错",'error');
                		}
                	},"json");
                	//加载合作模式
                	$.post(ctx+"/financeServicePattern/queryPatterns",{
                		
                	},function(data){
                		if(data.status='success'){
                			var str='';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.financeServicePatternId+'">'+val.financeServicePatternName+'</option>';
                			})
                			$(".partner-cooperation-edit [name='financeServicePatternId']").html(str);
                			
                		}else{
                			swal('',"合作模式加载出错",'error');
                		}
                	},"json");
                	
                	//合作方合作模式配置数据
                	$.post(ctx+"/financeServicePartners/selectOne",{
                		financeServicePartnersId:$(_this).attr('value')
                	},function(data){
                		if(data.status=='success'){
                			$("#financeServicePartnersId").val(data.data.financeServicePartnersId);
                			var str='';
                    		str+=jsDateFormat1(data.data.stDate);
                    		str+=' - ';
                    		str+=jsDateFormat1(data.data.edDate);
                			$(".partner-cooperation-edit [name='dateString']").val(str);
                			k1.html(data.data.memo);
                			$(".partner-cooperation-edit [name='enable']").val(data.data.enable);
                			setTimeout(function() {
                				$(".partner-cooperation-edit [name='financeServicePatternId']").val(data.data.financeServicePatternId);
                    			$(".partner-cooperation-edit [name='schoolId']").val(data.data.schoolId);
                    			$(".partner-cooperation-edit [name='financeServicePatternId']").trigger("chosen:updated");
                    			$(".partner-cooperation-edit [name='schoolId']").trigger("chosen:updated");
								}, 200);
                			$('.partner-cooperation-edit').modal('show');
                		}else{
                			swal('',"合作方合作模式配置出错",'error');
                		}
                	},"json");
                })

                //多选下拉框初始化
                $('.selectpicker').selectpicker({
                    'liveSearch': true,
                    'liveSearchPlaceholder': '请输入关键字',
                    'actionsBox': true,
                    'selectAllText': '全选',
                    'deselectAllText': '取消'
                })

                //单选下拉框初始化
                $(".chosen-select").chosen();

                //起止日期
                durationDate('.duration', '-');

               

                //状态切换
                $('#partnerCooperation').on('click',' .stastus-btn',function(){
                	var _this=$(this);
                    if($(this).hasClass('btn-use')){
                    	$(this).attr('disabled','disabled');
                    	$.post(ctx+"/financeServicePartners/updateType",{
                    		financeServicePartnersId:$(_this).attr('value'),
                    		enable:'0'
                    	},function(data){
                    		if(data.status=='success'){
                    			$(_this).removeClass('btn-use').addClass('btn-nouse').html('<i class="fa fa-ban"></i>禁用');
                    		}else{
                    			swal('',"禁用失败",'error');
                    		}
                    		$(_this).removeAttr('disabled');
                    	},"json");
                    }else{
                    	$(this).attr('disabled','disabled');
                    	$.post(ctx+"/financeServicePartners/updateType",{
                    		financeServicePartnersId:$(_this).attr('value'),
                    		enable:'1'
                    	},function(data){
                    		if(data.status=='success'){
                    			$(_this).removeClass('btn-nouse').addClass('btn-use').html('<i class="fa fa-check-circle-o"></i>启用');
                    		}else{
                    			swal('',"启用失败",'error');
                    		}
                    		$(_this).removeAttr('disabled');
                    	},"json");
                    }
                })
                return this;
            }
        }
    }
    cooperationPattern().init();
})

//添加确定
function add(){
	$('.partner-cooperation-add').modal('hide');
	var jsonData=$("#partnerCooperationAdd").serialize();
	$.post(ctx+"/financeServicePartners/add",jsonData,function(data){
		if(data.status=='success'){
			swal('',"添加成功",'success');
			 init();
		}else{
			swal('',"添加失败",'error');
		}
	},"json");
}

//编辑确定
function edit(){
	$('.partner-cooperation-edit').modal('hide');
	var jsonData=$("#partnerCooperationEdit").serialize();
	$.post(ctx+"/financeServicePartners/update",jsonData,function(data){
		if(data.status=='success'){
			swal('',"修改成功",'success');
			
			 init();
		}else{
			swal('',"修改失败",'error');
		}
	},"json");
}
/**
 * 初始化
 * @returns
 */
function init() {
    var init = $('#partnerCooperation').dataTable({
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
        "sAjaxSource": ctx + '/financeServicePartners/selectAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData,
        "aoColumns": [
            {"mDataProp": "schoolName",'sClass': "text-center"},
            {"mDataProp": "dateString",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            		str+=jsDateFormat1(full['stDate']);
            		str+=' - ';
            		str+=jsDateFormat1(full['edDate']);
            	return str;
            }},
            {"mDataProp": "financeServicePatternName",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span class="btn btn-xs btn-use stastus-btn " value="'+full['financeServicePartnersId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span class="btn btn-xs btn-nouse stastus-btn" value="'+full['financeServicePartnersId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a class="edit" value="'+full['financeServicePartnersId']+'"> <i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i> </a>';
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#partnerCooperation_wrapper").removeClass();
    $('#partnerCooperation_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#partnerCooperation_wrapper .dataTables_info').parent().append($('#partnerCooperation_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "key", "value":$("#key").val()});
    aoData.push({"name": "enable", "value":$("#enable").val()});
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