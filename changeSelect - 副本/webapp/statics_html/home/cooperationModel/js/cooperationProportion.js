$(function(){
	init();
	//搜索回车
	$("#key").keydown(function(e){
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode==13) {
            init();
        }
    });
	
    //起止日期
    durationDate('.duration','-');

    //下拉框单选
    $('.chosen-select').chosen();

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })

    //状态切换
    $('#cooperationProportion').on('click',' .stastus-btn',function(){
    	var _this=$(this);
        if($(this).hasClass('btn-use')){
        	$(this).attr('disabled','disabled');
        	$.post(ctx+"/financeServicePartnersScale/updateType",{
        		financeServicePartnersScaleId:$(_this).attr('value'),
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
        	$.post(ctx+"/financeServicePartnersScale/updateType",{
        		financeServicePartnersScaleId:$(_this).attr('value'),
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
    //新增
    function proportionAdd(){
        return {
            init:function(){
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                //新增弹窗
                $('.addBtn').on('click',function(){
                	//初始化
                	$(".proportion-add [name='schoolIdAndNames']").html("");
                	$(".proportion-add [name='productIdAndNames']").html("");
        			$(".proportion-add [name='schoolIdAndNames']").selectpicker('refresh');
        			$(".proportion-add [name='productIdAndNames']").selectpicker('refresh');
        			$(".proportion-add [name='enable']").val("1");
        			$(".proportion-add [name='dateString']").val("");
        			$("#confs").html("");
                	//加载合作模式
                	$.post(ctx+"/financeServicePattern/queryPatterns",{
                		
                	},function(data){
                		if(data.status='success'){
                			var str='<option value="">请选择</option>';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.financeServicePatternId+'">'+val.financeServicePatternName+'</option>';
                			})
                			$(".proportion-add [name='financeServicePatternId']").html(str);
                			$(".proportion-add [name='financeServicePatternId']").trigger("chosen:updated");
                		}else{
                			swal('',"合作模式加载出错",'error');
                		}
                	},"json");
                	//加载产品模型
                	$.post(ctx+"/financeServicePartnersScale/loadProductModel",{
                		
                	},function(data){
                		if(data.status='success'){
                			var str='<option value="">请选择</option>';
                			$.each(data.data,function(index,val){
                				str+='<option value="'+val.productModelId+'">'+val.productModelName+'</option>';
                			})
                			$(".proportion-add [name='productTypeId']").html(str);
                			$(".proportion-add [name='productTypeId']").trigger("chosen:updated");
                		}else{
                			swal('',"产品模型加载出错",'error');
                		}
                	},"json");
                	
                    $('.proportion-add').modal('show');
                })
                //新增保存
                $('.proportion-add').on('click','.add-button',function(){
                	$('.proportion-add').modal('hide');
                	var jsonData=$("#proportionAdd").serialize();
                    $.ajax({
                        type: "POST",
                        url: ctx+'/financeServicePartnersScale/add',
                        data:jsonData,
                        dataType: 'json',
                        success: function (data) {
                        	if(data.status=='success'){
                        		swal('',"新增成功",'success');
                        		init();
                        	}else{
                        		swal('',"新增失败",'error');
                        	}
                        },
                        error: function (msg) {
                            toastr.error("系统错误");
                        }
                    });
                })
            }
        }
    }
    proportionAdd().init();

    //编辑
    function proportionEdit(){
        return {
            init:function(){
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                //编辑弹窗
                $('#cooperationProportion').on('click','.edit',function(){
                	var _this=this;
                	$.ajax({
                        type: "POST",
                        url: ctx+'/financeServicePartnersScale/selectOne',
                        data: {financeServicePartnersScaleId:$(_this).attr('value')},
                        dataType: 'json',
                        success: function (data) {
                        	if(data.status=="success"){
                        		$("#financeServicePartnersScaleId").val(data.data.financeServicePartnersScaleId);
                        		var dateString='';
                        		dateString+=jsDateFormat1(data.data.stDate);
                        		dateString+=' - ';
                        		dateString+=jsDateFormat1(data.data.edDate);
                        		$('.proportion-edit [name="dateString"]').val(dateString);
                        		var str = '';
                                $.each(data.data.financeServicePartnersScaleVals, function(index, val) {
                                   str += '<div class="form-group col-sm-12">'
                                   	+'<input name="financeServicePartnersScaleVals['+index+'].financeServiceConfId" value="'+val.financeServiceConfId+'" type="hidden">'
                                   	+'<input name="financeServicePartnersScaleVals['+index+'].financeServicePartnersScaleValId" value="'+val.financeServicePartnersScaleValId+'" type="hidden">'
                                   +'<label class="control-label col-sm-2 no-padding-right">'+val.financeServiceConfName+'：</label>'  
                                   +'<div class="col-sm-10 no-padding">'
                                    +   '<div class="col-sm-6">'
                                     +      '<label class="control-label pull-left">收：</label>'
                                      +     '<div class="col-sm-10">'
                                       +       ' <div class="input-group">'
                                        +          ' <input type="text" name="financeServicePartnersScaleVals['+index+'].scale" value="'+val.scale+'" class="form-control">'
                                         +          '<div class="input-group-addon">%</div>'
                                          +    '</div> '                                       
                                           +'</div>'
                                       +'</div>'
                                       +'<div class="col-sm-6">'
                                        +   '<label class="control-label pull-left">支：</label>'
                                         +  '<div class="col-sm-10">'
                                          +     '<div class="input-group">'
                                           +        '<input type="text" name="financeServicePartnersScaleVals['+index+'].scaleSchool" value="'+val.scaleSchool+'" class="form-control">'
                                            +       '<div class="input-group-addon">%</div>'
                                             +  '</div>'
                                           +'</div>'
                                      +'</div>'
                                   +'</div>'
                               +'</div>';
                                });
                                $('#confsEdit').html(str);
                        		$('.proportion-edit').modal('show');
                        	}else{
                        		swal('',"加载数据出错",'error');
                        	}
                        },
                        error: function (msg) {
                            toastr.error("系统错误");
                        }
                    });
                })
                //编辑保存
                $('.proportion-edit').on('click','.edit-button',function(){
                	$('.proportion-edit').modal('hide');
                	var jsonData=$("#proportionEdit").serialize();
                    $.ajax({
                        type: "POST",
                        url: ctx+'/financeServicePartnersScale/update',
                        data: jsonData,
                        dataType: 'json',
                        success: function (data) {
                        	if(data.status=="success"){
                        		swal('',"编辑成功",'success');
                        		init();
                        	}else{
                        		swal('',"编辑出错",'error');
                        	}
                        },
                        error: function (msg) {
                            toastr.error("系统错误");
                        }
                    });
                })
            }
        }
    }
    proportionEdit().init();

    //合作模式-合作方-服务场景联动
    $('[name="financeServicePatternId" ]').on('change',function(){
    	var _this=this;
    	//联动合作方
        $.ajax({
            type: "POST",
            url: ctx+'/financeServicePartners/queryByPattern',
            data: {"financeServicePatternId":$(_this).val()},
            dataType: 'json',
            success: function (data) {
            	if(data.status=="success"){
            		var str = '';
            		var financeServicePartnersId='';
                    $.each(data.data, function(index, val) {
                    	financeServicePartnersId=val.financeServicePartnersId;
                    	str += '<option value="'+val.schoolName+'&LBL&'+val.schoolId+'">'+val.schoolName+'</option>';
                    });
                    $('#addSchoolId').html(str);
                    $('#proportionAdd [name="financeServicePartnersId"]').val(financeServicePartnersId);
                    $('#addSchoolId').selectpicker('refresh');
            	}else{
            		swal('',"联动合作方出错",'error');
            	}
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
        //联动服务场景
        $.ajax({
            type: "POST",
            url: ctx+'/financeServiceConf/queryByPattern',
            data: {"financeServicePatternId":$(_this).val()},
            dataType: 'json',
            success: function (data) {
            	if(data.status=="success"){
            		var str = '';
                    $.each(data.data, function(index, val) {
                       str += '<div class="form-group col-sm-12">'
                       	+'<input name="financeServicePartnersScaleVals['+index+'].financeServiceConfId" value="'+val.financeServiceConfId+'" type="hidden">'
                       +'<label class="control-label col-sm-2 no-padding-right">'+val.financeServiceConfName+'：</label>'  
                       +'<div class="col-sm-10 no-padding">'
                        +   '<div class="col-sm-6">'
                         +      '<label class="control-label pull-left">收：</label>'
                          +     '<div class="col-sm-10">'
                           +       ' <div class="input-group">'
                            +          ' <input type="text" name="financeServicePartnersScaleVals['+index+'].scale" class="form-control">'
                             +          '<div class="input-group-addon">%</div>'
                              +    '</div> '                                       
                               +'</div>'
                           +'</div>'
                           +'<div class="col-sm-6">'
                            +   '<label class="control-label pull-left">支：</label>'
                             +  '<div class="col-sm-10">'
                              +     '<div class="input-group">'
                               +        '<input type="text" name="financeServicePartnersScaleVals['+index+'].scaleSchool" class="form-control">'
                                +       '<div class="input-group-addon">%</div>'
                                 +  '</div>'
                               +'</div>'
                          +'</div>'
                       +'</div>'
                   +'</div>';
                    });
                    $('#confs').html(str);
            	}else{
            		swal('',"联动服务场景出错",'error');
            	}
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    })

    //产品类型-产品联动
    $('[name="productTypeId"]').on('change',function(){
    	var _this=this;
        $.ajax({
            type: "POST",
            url:  ctx+'/financeServicePartnersScale/loadProductByModel',
            data: {'productModelId':$(_this).val()},
            dataType: 'json',
            success: function (data) {
                var str = '';
                $.each(data.data, function(index, val) {
                    str += '<option value="'+val.productName+'&LBL&'+val.productId+'">'+val.productName+'</option>';
                });
                $('#addProductId').html(str);
                $('#addProductId').selectpicker('refresh');
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });
    })

})
/**
 * 初始化
 * @returns
 */
function init() {
    var init = $('#cooperationProportion').dataTable({
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
        "sAjaxSource": ctx + '/financeServicePartnersScale/load',
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
            {"mDataProp": "productName",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span class="btn btn-xs btn-use stastus-btn " value="'+full['financeServicePartnersScaleId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span class="btn btn-xs btn-nouse stastus-btn" value="'+full['financeServicePartnersScaleId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
                return '<a class="edit" value="'+full['financeServicePartnersScaleId']+'"> <i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i> </a>';
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#cooperationProportion_wrapper").removeClass();
    $('#cooperationProportion_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#cooperationProportion_wrapper .dataTables_info').parent().append($('#cooperationProportion_wrapper .dataTables_length'));
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