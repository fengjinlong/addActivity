$(function(){
    /**
     * 插件初始化
     * @returns {{init: init}}
     */
	init();
	//搜索回车
	$("#searchName").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init();
        }
    });
	
    function cooperationModule(){
        return {
            init:function(){
                //新增
                $('.addBtn').on('click',function(){
                	$.post(ctx+"/financeServiceConf/queryConfs",{
                		
                	},function(data){
                		if(data.status='success'){
                			console.log(data.data)
                			var str='';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.financeServiceConfId+'">'+val.financeServiceConfName+'</option>';
                			})
                			console.log(str);
                			$("#confs").html(str);
                			$("#confs").selectpicker('refresh');
                		}else{
                			swal('',"服务场景加载出错",'error');
                		}
                	},"json");
                    $('.cooperation-module-add').modal('show');
                })

                //编辑
                $('#cooperationModule').on('click','.edit',function(){
                	var _this=$(this);
                	$.post(ctx+"/financeServiceConf/queryConfs",{
                		
                	},function(data){
                		if(data.status='success'){
                			var confs=data.data;
                			$.post(ctx+"/financeServiceModular/selectOne",{
                        		financeServiceModularId:$(_this).attr('value'),
                        	},function(modular){
                        		if(modular.status='success'){
                        			$("#financeServiceModularId").val(modular.data.financeServiceModularId);
                        			$(".cooperation-module-edit [name='financeServiceModularName']").val(modular.data.financeServiceModularName);
                        			if(modular.data.enable=='1'){
                        				$(".cooperation-module-edit [name='enable']").val('1');
                        			}else{
                        				$(".cooperation-module-edit [name='enable']").val('0');
                        			}
                        			var str='';
                        			$.each(confs,function(index,val){
                    					str+='<option value="'+val.financeServiceConfId+'">'+val.financeServiceConfName+'</option>';
                        			})
                        			var selectConfs=[];
                        			if(modular.data.financeServiceConfs!=null){
	                        			$.each(modular.data.financeServiceConfs,function(i,conf){
	                        				selectConfs.push(conf.financeServiceConfId);
	                    				})
                        			};
                        			$(".cooperation-module-edit [name='financeServiceConfIds']").html(str);
                        			$(".cooperation-module-edit [name='financeServiceConfIds']").val(selectConfs);
                        			$(".cooperation-module-edit [name='financeServiceConfIds']").selectpicker('refresh');
                        			 $('.cooperation-module-edit').modal('show');
                        		}else{
                        			$('.cooperation-module-edit').modal('show');
                        			swal('',"加载失败",'error');
                        		}
                        	},"json");
                		}else{
                			$('.cooperation-module-edit').modal('show');
                			swal('',"服务场景加载出错",'error');
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

                //说明
                KindEditor.ready(function (K) {
                    K.create('.description', {
                        allowFileManager: true,
                        resizeType: 0
                    });
                });

                //状态切换
                $('#cooperationModule').on('click',' .stastus-btn',function(){
                	var _this=$(this);
                    if($(this).hasClass('btn-use')){
                    	$(this).attr('disabled','disabled');
                    	$.post(ctx+"/financeServiceModular/updateType",{
                    		financeServiceModularId:$(_this).attr('value'),
                    		enable:0
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
                    	$.post(ctx+"/financeServiceModular/updateType",{
                    		financeServiceModularId:$(_this).attr('value'),
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
    cooperationModule().init();
})
//添加确定
function add(){
	var jsonData=$("#cooperationAdd").serialize();
	$.post(ctx+"/financeServiceModular/add",jsonData,function(data){
		if(data.status=='success'){
			swal('',"添加成功",'success');
			 $('.cooperation-module-add').modal('hide');
			 init();
		}else{
			swal('',"添加失败",'error');
		}
	},"json");
}
//编辑确定
function edit(){
	var jsonData=$("#cooperationEdit").serialize();
	$.post(ctx+"/financeServiceModular/update",jsonData,function(data){
		if(data.status=='success'){
			swal('',"修改成功",'success');
			 $('.cooperation-module-edit').modal('hide');
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
    var init = $('#cooperationModule').dataTable({
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
        "sAjaxSource": ctx + '/financeServiceModular/selectAll',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData,
        "aoColumns": [
            {"mDataProp": "financeServiceModularName",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span class="btn btn-xs btn-use stastus-btn " value="'+full['financeServiceModularId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span class="btn btn-xs btn-nouse stastus-btn" value="'+full['financeServiceModularId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a class="edit" value="'+full['financeServiceModularId']+'"> <i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i> </a>';
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#cooperationModule_wrapper").removeClass();
    $('#cooperationModule_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#cooperationModule_wrapper .dataTables_info').parent().append($('#cooperationModule_wrapper .dataTables_length'));
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
    aoData.push({"name": "financeServiceModularName", "value":$("#searchName").val()});
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

