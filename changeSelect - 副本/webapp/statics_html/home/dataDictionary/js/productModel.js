$(function () {
	$('.entryFormModel').on('hide.bs.modal', function () {
		  $('.modal-backdrop.fade').remove()
	})
	
	//新增
    $('.product-model-add .add-button').on('click',function(){
	    var val = $('#productModelAdd #productModelName').val();
	    if(val.trim()==''){
	    	toastr.error('名称为空！');
	    	return;
	    }
    	
	    $.ajax({
   	        url: ctx + '/productModelController/addProductModel',
   	        type: 'POST',
   	        data: {
   	        	productModelName:$('#productModelAdd #productModelName').val()
   	        },
   	        dataType: 'json',
   	        success: function (data) {
   	        	$('.product-model-add').modal('hide');
   	        	DataTable.init();
   	        }
   	    });
   })
    /**
     * 初始化方法
     * @returns {{init: init, statusChange: statusChange, checkAll: checkAll}}
     */
    function productModelInit(){
        return {
            init:function(){
                this.statusChange();
                this.checkAll();
                return this;
            },
            //状态切换
            statusChange:function(){
                $('#productModel').on('click',' .stastus-btn',function(){
                    if($(this).hasClass('btn-use')){
                        $(this).removeClass('btn-use').addClass('btn-nouse').html('<i class="fa fa-ban"></i>禁用');
                    }else{
                        $(this).removeClass('btn-nouse').addClass('btn-use').html('<i class="fa fa-check-circle-o"></i>启用')
                    }
                })
            },
            //全选
            checkAll:function(){
                $('table .checkAll').on('click', function () {
                    var checkArr = $(this).parents('table').find('.checkChild');
                    if ($(this).prop('checked')) {
                        for (var i = 0; i < checkArr.length; i++) {
                            $(checkArr[i]).prop('checked',true);
                        }
                    }else{
                        for (var i = 0; i < checkArr.length; i++) {
                            $(checkArr[i]).prop('checked',false);
                        }
                    }
                })
            }   
        }
    }

    productModelInit().init();




    /**
     * 产品模型新增
     */
    function productModelAdd(){
        return {
            init:function(){
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                //弹窗显示
                $('.addBtn').on('click', function () {
                		$('#productModelName').val('');
                    $('.product-model-add').modal('show');
                })
                //新增表单提交
                $('.product-model-add .add-button').on('click',function(){

                })
            }
        }
    }

    productModelAdd().init();



    /**
     * 产品模型编辑
     * @returns {{init: init, bindEvent: bindEvent}}
     */
    function productModelEdit(){
        return {
            init:function(){
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                //弹窗显示
                $('body').on('click', '.edit', function () {
                    $('.product-model-edit').modal('show')
                })
                //编辑表单提交
                $('.product-model-add .edit-button').on('click',function(){

                })
            }
        }
    }

    productModelEdit().init();


    /**
     * 产品模型查看
     * @returns {{init: init, bindEvent: bindEvent}}
     */
    function productModelView(){
        return {
            init:function(){
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                //弹窗显示
                $('body').on('click', '.view', function () {
                    $('.product-model-view').modal('show')
                })

                //查看取值
            }
        }
    }

    productModelView().init();
    
    
    /**
     * 产品模型设置
     * @returns {{init: init, bindEvent: bindEvent}}
     */
    function productModelSetting(){
        return {
            init:function(){
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                //弹窗显示
                $('body').on('click', '.config', function () {
                    $('.entryFormModel').modal('show');
                    $('.well').css({
                    	'display':'block'
                    });
                    $(".block-bar1").html("");
                    $(".block-bar2").html("");
                })
                //表单提交
                $('.setting-button').on('click',function(){
                	var str = $('.entryHtml').html();
                	$('.entryFormModel').modal('hide');
                	
                })
            }
        }
    }

    productModelSetting().init();
    


    /**
     * 产品模型数据字段切换
     * @returns {{init: init}}
     */
    function dataChange(){
        return {
            init:function() {
                this.bindEvent();
                return this;
            },
            bindEvent:function(){
                $('.field').on('click', 'li', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    this.tableData();
                })
            },
            //字段表数据
            tableData:function(){

            }
        }
    }
    dataChange().init();
    
    $('#productModel').on('click', '.fa-gear', function () {
    		var record = $(this).data('record');
    		$('#productModelId2').val(record.product_model_id);
    });
    
    $('#productModel').on('click', '.fa-search', function () {
		var record = $(this).data('record');
		window.open(ctx + "/productModelController/productModelSign?productModelId="+record.product_model_id); 
    });
    
    
    $('#productModel').on('click', '.fa-edit', function () {
    		var record = outCode($(this).data('record'));
    		record = JSON.parse(record);
    		var memo = record.memo;
    		if (memo == undefined){ 
    			memo = "";
    		}
    		$('input[name="productModelName1"]').val(record.product_model_name);
        $('input[name="productModelId1"]').val(record.product_model_id);
        $('#productModelEdit').bootstrapValidator('resetForm');
	    	$.ajax({
	            url: ctx + "/productModelController/queryById",
	            type: 'POST',
	            dataType: 'json',
	            success: function (data) {
	            		if(data.data!=null){
	            			$('#productModelEdit .table-bordered').find('tbody').html('');
	            			
	            			var thstr ='<tr><td colspan="4"><font color="red">产品信息</font></td></tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			for(var i=0;i<data.data.length;i++){
	            				str =   '<tr>'
					               +'  <td width="5%">'
					               +'    <label>'
					               +'       <input id='+data.data[i].dataBasicEnName+' type="checkbox" class="checkChild">'
					               +'       <span class="text"></span>'
					               +'    </label>'
					               +' </td>'
					               +' <td>'+data.data[i].dataBasicName+'</td>'
					               +' <td>'+data.data[i].dataBasicEnName+'</td>'
					               +' <td style="position:relative"><input value="'+(data.data[i].sortCode==null?0:data.data[i].sortCode)+'" type="text" class="form-control regnum"><span class="abc" style="position:absolute;left:100px;top:15px;color:red"><span></td>'
					               +'	</tr>';	            				
	            				
	            				$('#productModelEdit .table-bordered').find('tbody').append(str);
	            			}
	            			
	            			$('.regnum').keydown(function(){
	            				var reg = /^[0-9]*$/;

	            			        if(!reg.test($(this).val())){
	            			        	$(this).siblings('.abc').text("只能是数字");
	            			        }else{
	            			            $(this).siblings('.abc').text("");
	            			        } 
	            			});
	            			/**
	            			 * 招生条件
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">招生条件</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="age" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>年龄</td>'
				               +' <td>age</td>'
				               +' <td></td>'
				               +' </tr>'
	            			
				               +'<tr><td width="5%"><label><input id="edu" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>学历</td>'
				               +' <td>edu</td>'
				               +' <td></td>'
				               +' </tr>'
				               
				               +'<tr><td width="5%"><label><input id="area" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>地区</td>'
				               +' <td>area</td>'
				               +' <td></td>'
				               +' </tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			
	            			/**
	            			 * 报考流程
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">报考流程</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="isApply" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>是否报考</td>'
				               +' <td>isApply</td>'
				               +' <td></td>'
				               +' </tr>'
	            			
				               +'<tr><td width="5%"><label><input id="examFlowId" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>报考流程</td>'
				               +' <td>examFlowId</td>'
				               +' <td></td>'
				               +' </tr>';
				               
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			/**
	            			 * 退费流程
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">退费流程</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="feeFlowId" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>退费流程</td>'
				               +' <td>feeFlowId</td>'
				               +' <td></td>'
				               +' </tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			/**
	            			 * 考试科目
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">考试科目</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="subject" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>考试科目</td>'
				               +' <td>subject</td>'
				               +' <td></td>'
				               +' </tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			/**
	            			 * 报名表说明
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">报名表说明</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="sign" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>报名表说明</td>'
				               +' <td>sign</td>'
				               +' <td></td>'
				               +' </tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			/**
	            			 * 缴费期次
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">缴费期次</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="payTime" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>缴费期次</td>'
				               +' <td>payTime</td>'
				               +' <td></td>'
				               +' </tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            			
	            			/**
	            			 * 考期
	            			 */
	            			thstr ='<tr><td colspan="4"><font color="red">考期</font></td></tr>'
	            				   +'<tr><td width="5%"><label><input id="examTime" class="ortherChild"  type="checkbox" ><span class="text"></span></label></td>'
				               +' <td>考期</td>'
				               +' <td>examTime</td>'
				               +' <td></td>'
				               +' </tr>';
	            			$('#productModelEdit .table-bordered').find('tbody').append(thstr);
	            		}
	            		
			        	    	$.ajax({
			        	            url: ctx + "/productModelController/queryById",
			        	            type: 'POST',
			        	            data: {
			        	            	productModelId:record.product_model_id
			        	            },
			        	            dataType: 'json',
			        	            success: function (data) {
			        	            		if(data.data!=null){
			        	            			var ck = 0;
			        	            			for(var i=0;i<data.data.length;i++){
			        	            				ck = data.data[i].checked;
			        	            				if(ck=='1'){
			        	            					$('#'+data.data[i].dataBasicEnName).attr("checked","true"); 
			        	            					$('#'+data.data[i].dataBasicEnName).parent().parent().parent().find('td').eq(3).find('input').val(data.data[i].sortCode); 
			        	            				}
			        	            			}
			        	            			var str = memo;
			        	            			if(str.indexOf('age')!='-1'){
			        	            				$('#age').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('age')!='-1'){
			        	            				$('#age').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('edu')!='-1'){
			        	            				$('#edu').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('area')!='-1'){
			        	            				$('#area').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('isApply')!='-1'){
			        	            				$('#isApply').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('examFlowId')!='-1'){
			        	            				$('#examFlowId').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('subject')!='-1'){
			        	            				$('#subject').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('sign')!='-1'){
			        	            				$('#sign').attr("checked","true"); 
			        	            			}
			        	            			
			        	            			if(str.indexOf('payTime')!='-1'){
			        	            				$('#payTime').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('examTime')!='-1'){
			        	            				$('#examTime').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('feeFlowId')!='-1'){
			        	            				$('#feeFlowId').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('sign')!='-1'){
			        	            				$('#sign').attr("checked","true"); 
			        	            			}
			        	            			if(str.indexOf('sign')!='-1'){
			        	            				$('#sign').attr("checked","true"); 
			        	            			}
			        	            		}
			        	            }
			        	     });
	            		
	            }
	     });
	    	$('.product-model-edit').modal('show');
    })
});





    $('#productModelEdit').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function (validator, form, submitButton) {
        	var ids = '';
        	var strs = '';
        	var disIds = '';
        var ar1 = new Array();
        
        
        	$('#productModelEdit input.checkChild:checkbox').each(function(){
        		var ob1 = {};
        		var id = this.id.substring(this.id.length-1,this.id.length);
        		ob1["productModelDetailCn"] = $(this).parent().parent().parent().find('td').eq(1).text();
        		ob1["productModelDetailEn"] = $(this).parent().parent().parent().find('td').eq(2).text();
        		ob1["sortCode"] = $(this).parent().parent().parent().find('td').eq(3).find('input').val();
        		if($(this).prop('checked')){
        			ob1["checked"] = 1;
        		}else{
        			ob1["checked"] = 2;
        		}
        		ar1.push(ob1);
        	})
        	
        	var memo  = '';
        $('#productModelEdit input.ortherChild:checkbox').each(function(){
        		if($(this).prop('checked')){
        			memo = memo + $(this).parent().parent().parent().find('td').eq(2).text() + ",";
        		}
        	})
        	memo = memo.substring(',');
        	data={
        		productModelDetail : JSON.stringify(ar1),
        		productModelId : $('#productModelId1').val(),
        		productModelName : $('#productModelName1').val(),
        		memo:memo
        	}
            $.ajax({
                url: ctx + "/productModelController/updateRecords",
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data.msg!='success') {
                        toastr.success(data.msg);
                        $('.product-model-edit').modal('hide');
                    } else {
                        $('.product-model-edit').modal('hide');
                        toastr.success('修改成功');
                    }
                    DataTable.init();
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
            return false;
        }
    });


function chooseStudent(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 2;
    }
    $.ajax({
        url: ctx + '/productModelController/updateEnable',
        type: 'POST',
        data: {
        	productModelId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            DataTable.init();
        }
    });
}
//加载表单
var DataTable = function () {
    return { 
        init: function () {
            var dutyTable = $('#productModel').dataTable({
                "bPaginate": true,  //是否显示分页
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": false, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": false, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/productModelController/load',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表总共为 _MAX_ 条记录)",
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
                    {"mData": "sortCode", 'sClass': "text-center","fnRender": function (data, type, full) {
			            	return data.oSettings._iDisplayStart + data.iDataRow + 1; 
			            }},
                    {"mData": "product_model_name", "bSortable": false,'sClass': "text-center"},
//                    {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
//                    	if(data==2){
//		          		  return '<span id="span'+full["product_model_id"]+'" onclick="chooseStudent(\''+full["product_model_id"]+'\',2)" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
//		          	  }else{
//		          		  return '<span id="span'+full["product_model_id"]+'" onclick="chooseStudent(\''+full["product_model_id"]+'\',1)" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
//		          	  }
//		            }},
                    {
                        "mData": "productModelId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a class="edit" ><i   data-record=\'' + inCode(JSON.stringify(full)) + '\' class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
                           var d= '<a class="view"><i class="fa fa-search warning" data-toggle="tooltip"data-placement="top" data-original-title="查看"title="查看"></i></a>';
                            return u;
                        }
                    },{
                    	 "mData": "productModelId",
                         'sClass': "text-center",
                         "bSortable": false,
                         "mRender": function (data, type, full) {
                             var u = '<a class="config"><i class="fa fa-gear primary config" data-record=\'' + JSON.stringify(full) + '\' data-toggle="tooltip"data-placement="top" data-original-title="设置" title="设置"></i></a>';
                             var s = '<a class="search"><i class="fa fa-search warning" data-record=\'' + JSON.stringify(full) + '\' data-toggle="tooltip"data-placement="top" data-original-title="预览" title="预览"></i></a>';
                             return u  + s;
                         }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {}
            });
        }
    }
}();

//数据初始化
$("#productModel tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#productModel tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({
        "name": "pageNum",
        "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
    });
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();

    aoData.push({"name": "productModelName", "value": searchVal});

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

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}


//报名表格式





$(function(){ 
	$('.dowebok').dad({
		draggable: '.block-title'
	});
	
	$('.setting-button').click(function(){
		$('.remove-li1').css({
    		'display':'none'
    	})
		
		var data = {
				content : $('.sing_form').html(),
				productModelId : $('#productModelId2').val()
		};
        $.ajax({
            url: ctx + "/productModelController/updateRecord",
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.msg!='success') {
                    toastr.success(data.msg);
                    $('.product-model-edit').modal('hide');
                } else {
                    $('.product-model-edit').modal('hide');
                    toastr.success('修改成功');
                }
                DataTable.init();
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
	});
});

    
    
    
    $('.add-data1').on('click',function(){
        var str = $(this).parent('.add-remove1').siblings('.dataList-text1').text();
        var id1 = $(this).siblings('input[name="abc"]').attr('class');
        var html = `
            <li class="dataList-li" style="width:287px;height:35px;line-height:35px;">
                <i class="dataList-text" style="display: block;width: 80px;border-right: 1px solid #cccccc;float: left;text-align: center;">${str }</i>
                <i class="${id1 }" id="hh" style="display: block;float: left;padding-left: 15px;width: 200px;"></i>
                <i class="fa fa-minus-square remove-li1" style="color:red;position:absolute;font-size:20px;right:5px;top:5px;cursor:pointer;display: none;"></i>
            </li>
        `
        $('.block-bar1').append(html);
        $(this).parent().parent('.well').hide();
        
        $('.delete').css({
            'display':'none'
        })

        $('.block-bar1').attr('id','bar');
        $('.block-bar2').attr('id','');
        var bar = document.getElementById("bar");
        Sortable.create(bar, { group: "omega" });

        $('.remove-li1').click(function(){
            $(this).parent('.dataList-li').remove();
            var mm = $(this).siblings('#hh').attr('class');
            $('.'+mm).parent().parent('.well').show();
            
        })  
        
        $('.detail-hide1').click(function(){
        	$('.remove-li1').css({
        		'display':'none'
        	})
        })
        
        
        $('.setting-button').click(function(){
        	$('.remove-li1').css({
        		'display':'none'
        	})
        })

    })




    $('.remove-data1').click(function(){

            $('.remove-li1').css({
                'display':'block'
            })

    })


    $('.add-data2').on('click',function (){
        var str = $(this).parent('.add-remove2').siblings('.dataList-text2').text();
        var id2 = $(this).siblings('input[name="abc"]').attr('class');
        var html = `
            <li class="dataList-li" style="width:287px;height:35px;line-height:35px;">
                <i class="dataList-text" style="display: block;width: 80px;border-right: 1px solid #cccccc;float: left;text-align: center;">${str }</i>
                <i class="${id2 }" id="gg" style="display: block;float: left;padding-left: 15px;width: 200px;"></i>
                <i class="fa fa-minus-square remove-li2" style="color:red;position:absolute;font-size:20px;right:5px;top:5px;cursor:pointer;display: none;"></i>
            </li>
        `
        $('.block-bar2').append(html);
        
        $(this).parent().parent('.well').hide();
        
        $('.delete').css({
            'display':'none'
        })

        $('.block-bar2').attr('id','bar');
        $('.block-bar1').attr('id','');
        var bar = document.getElementById("bar");
        Sortable.create(bar, { group: "omega" });
        
        $('.remove-li2').click(function(){
            $(this).parent('.dataList-li').remove();
            var mm = $(this).siblings('#gg').attr('class');
            $('.'+mm).parent().parent('.well').show();
        })

    })

    $('.remove-data2').click(function(){

         $('.remove-li2').css({
            'display':'block'
        })
        
    })


    $('.detail-hide2').click(function(){
        	$('.remove-li2').css({
        		'display':'none'
        	})
        })
        
        $('.setting-button').click(function(){
        	$('.remove-li2').css({
        		'display':'none'
        	})
        })


    $('.data-show').click(function(){
    	$(this).css({
    		'display':'none'
    	})
    	$(this).siblings(".data-hide").css({
    		'display':'block'
    	})
    })


    $('.data-hide').click(function(){
    	$(this).css({
    		'display':'none'
    	})
    	$(this).siblings(".data-show").css({
    		'display':'block'
    	})
    })



    $('.pd-show').click(function(){
    	
    	$('.personal-detailss').css({
    		'display':'block'
    	})
    })


    $('.pd-hide').click(function(){
    	
    	$('.personal-detailss').css({
    		'display':'none'
    	})
    })


    $('.ci-show').click(function(){
    	
    	$('.course-informationn').css({
    		'display':'block'
    	})
    })


    $('.ci-hide').click(function(){
    	
    	$('.course-informationn').css({
    		'display':'none'
    	})
    })



    $('.p-show').click(function(){
    	
    	$('.payment').css({
    		'display':'block'
    	})
    })


    $('.p-hide').click(function(){
    	
    	$('.payment').css({
    		'display':'none'
    	})
    })


    $('.br-show').click(function(){
    	
    	$('.Brochure-Release').css({
    		'display':'block'
    	})
    })


    $('.br-hide').click(function(){
    	
    	$('.Brochure-Release').css({
    		'display':'none'
    	})
    })



    $('.lc-show').click(function(){
    	
    	$('.learning-center').css({
    		'display':'block'
    	})
    })


    $('.lc-hide').click(function(){
    	
    	$('.learning-center').css({
    		'display':'none'
    	})
    })


    
    