$(function () {
	
	init();
	//搜索回车
	$("#key").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init();
        }
    });
	
	//状态切换
    $('#serviceScape').on('click',' .stastus-btn',function(){
    	var _this=$(this);
        if($(this).hasClass('btn-use')){
        	$(this).attr('disabled','disabled');
        	$.post(ctx+"/financeServiceConf/updateType",{
        		financeServiceConfId:$(_this).attr('value'),
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
        	$.post(ctx+"/financeServiceConf/updateType",{
        		financeServiceConfId:$(_this).attr('value'),
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
	
	
    //编辑
    $('#serviceScape').on('click', '.edit', function () {
    	$('.serviceScapeEdit').modal('show');
        var _this=$(this);
      //加载数据
    	$.post(ctx+"/financeServiceConf/selectOne",{
    		'financeServiceConfId':$(_this).attr('value')
    	},function(data){
    		if(data.status='success'){
    			
    			$(".serviceScapeEdit [name='financeServiceConfId']").val(data.data.financeServiceConfId);
    			$(".serviceScapeEdit [name='financeServiceConfName']").val(data.data.financeServiceConfName);
    			$(".serviceScapeEdit [name='memo']").val(data.data.memo);
    			$(".serviceScapeEdit [name='enable']").val(data.data.enable);
    			
    		}else{
    			swal('',"数据加载出错",'error');
    		}
    	},"json");
    })
})


//编辑确定
function edit(){
	$('.serviceScapeEdit').modal('hide');
	var jsonData=$("#cooperationEdit").serialize();
	$.post(ctx+"/financeServiceConf/update",jsonData,function(data){
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
    var init = $('#serviceScape').dataTable({
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
        "sAjaxSource": ctx + '/financeServiceConf/selectAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData,
        "aoColumns": [
            {"mDataProp": "financeServiceConfName",'sClass': "text-center"},
            
            {"mDataProp": "memo",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span class="btn btn-xs btn-use stastus-btn " value="'+full['financeServiceConfId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span class="btn btn-xs btn-nouse stastus-btn" value="'+full['financeServiceConfId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a class="edit"  value="'+full['financeServiceConfId']+'"> <i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i> </a>';
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#serviceScape_wrapper").removeClass();
    $('#serviceScape_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#serviceScape_wrapper .dataTables_info').parent().append($('#serviceScape_wrapper .dataTables_length'));
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
    aoData.push({"name": "financeServiceConfName", "value":$("#key").val()});
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

