var PARENT='';
var CHILD='';
var BUTTON='';
$(function () {
	//加载节点
	loadBasics();
    //下拉框多选
    multiSelect()
    //初始化列表
    initFlow();
    initBasics();
    initButton();
    initData();
    //流程功能新增
    $('#processFunction .addBtn').on('click', function () {
    	$('#processFunctionAdd [name="className"]').val("");
    	$('#processFunctionAdd [name="buttonName"]').val("");
        $('.processFunctionAdd').modal('show');
    })

    // 流程功能编辑
    $('#processFunction #processFunctionTable').on('click', '.edit', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
        $.post(ctx + '/flow/findButton',{
        	'examFlowButtonId':$(_this).attr('value')
        },function(data){
        	if(data.status=='success'){
        		$(_this).attr('typee','1');
        		$('.processFunctionEdit').modal('show');
        		$('#processFunctionEdit [name="examFlowButtonId"]').val(data.data.examFlowButtonId);
        		$('#processFunctionEdit [name="buttonName"]').val(data.data.buttonName);
        		$('#processFunctionEdit [name="className"]').val(data.data.className);
        	}else{
        		swal('',"数据加载",'error');
        		$(_this).attr('typee','1');
        	}
        },"json")
    })

    //展示列表编辑
    $('#showList #showListTable').on('click', '.edit', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
    	$.post(ctx + '/flow/findData',{
			'examFlowDataId':$(_this).attr('value'),
		},function(data2){
			if(data2.status=='success'){
				var examFlowData=data2.data;
				$('#showListEdit [name="examFlowDataId"]').val(examFlowData.examFlowDataId);
				$('#showListEdit [name="dataName"]').val(examFlowData.dataName);
				var dataJson=JSON.parse(examFlowData.examData);
				var str='';
				$.each(dataJson,function(index,obj){
					str+='<tr>'+
		                       ' <td>'+
		                   ' <label>'+
		                       ' <input type="checkbox" '+(obj.isShow==1?"checked":" ")+'>'+
		                       ' <span class="text"></span>'+
		                    '</label>'+
		                '</td>'+
		                '<td>'+
		                    '<label>'+
		                     '   <input type="checkbox" '+(obj.isSearch==1?"checked":" ")+'>'+
		                     '   <span class="text"></span>'+
		                   ' </label>'+
		                '</td>'+
		                '<td>'+
		                 '   <label>'+
		                   '     <input type="checkbox" '+(obj.isExport==1?"checked":" ")+'>'+
		                   '     <span class="text"></span>'+
		                  '  </label>'+
		                '</td>'+
		                '<td>'+
		                '   <label>'+
		                '     <input type="checkbox" '+(obj.isButton==1?"checked":" ")+'>'+
		                '     <span class="text"></span>'+
		                '  </label>'+
		                '</td>'+
		                '<td>'+obj.name+'</td>'+
		                '<td>'+obj.field+'</td>'+
		           ' </tr>';
				})
				$('#dataBody').html(str);
				$(_this).attr('typee','1');
				$('.showListEdit').modal('show');
			}else{
				$(_this).attr('typee','1');
				swal('',"加载数据失败",'error');
			}
		})
    })
    
    //展示列表删除
    $('#showList #showListTable').on('click', '.delete', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
    	$.post(ctx + '/flow/updateDataType',{
			'examFlowDataId':$(_this).attr('value'),
			'enable':'0',
			'deleteMark':'0'
		},function(data2){
			if(data2.status=='success'){
				$(_this).attr('typee','1');
				swal('',"删除成功",'success');
				initData();
			}else{
				$(_this).attr('typee','1');
				swal('',"删除失败",'error');
			}
		})
    })

    //流程环节新增
    $('#processLink .addBtn').on('click', function () {
    	$('#processLinkAdd [name="fullName"]').val("");
    	$('#processLinkAdd [name="isParent"]').val("1");
        $('.processLinkAdd').modal('show');
    })

    //流程环节编辑
    $('#processLink #processLinkTable').on('click', '.edit', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
    	$.post(ctx + '/flow/isUseBasics',{
        	'examFlowBasicsId':$(_this).attr('value')
        },function(data){
        	if(data.status=='success'){
        		$('.processLinkEdit').modal('show');
        		if(data.data==true){
        			$('#processLinkEdit [name="isParent"]').attr('disabled','disabled');
    			}else{
    				$('#processLinkEdit [name="isParent"]').removeAttr('disabled');
    			}
        		$.post(ctx + '/flow/findBasics',{
        			'examFlowBasicsId':$(_this).attr('value')
        		},function(data){
        			if(data.status=='success'){
        				$('#processLinkEdit [name="examFlowBasicsId"]').val(data.data.examFlowBasicsId);
        				$('#processLinkEdit [name="fullName"]').val(data.data.fullName);
        				$('#processLinkEdit [name="isParent"]').val(data.data.isParent);
        				$(_this).attr('typee','1');
        			}else{
        				$(_this).attr('typee','1');
        				$('.processLinkEdit').modal('hide');
        				swal('',"加载数据失败",'error');
        			}
        		},"json");
        	}else{
        		$(_this).attr('typee','1');
        		swal('',"查看节点是否被使用失败",'error');
        	}
        },"json");
    })
    
     //流程环节删除
    $('#processLink #processLinkTable').on('click', '.delete', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
        $.post(ctx + '/flow/isUseBasics',{
        	'examFlowBasicsId':$(_this).attr('value')
        },function(data){
        	if(data.status=='success'){
        		if(data.data==true){
    				swal('',"该节点被使用 无法删除",'error');
    			}else{
    				$.post(ctx + '/flow/deleteBasics',{
    					'examFlowBasicsId':$(_this).attr('value')
    				},function(data2){
    					if(data2.status=='success'){
    						$(_this).attr('typee','1');
    						swal('',"删除成功",'success');
    						initBasics();
    					}else{
    						$(_this).attr('typee','1');
    						swal('',"删除失败",'error');
    					}
    				})
    			}
        	}else{
        		$(_this).attr('typee','1');
        		swal('',"查看节点是否被使用失败",'error');
        	}
        },"json")
    })

    //流程定义新增
    $('#processDefinition .addBtn').on('click', function () {
    	$('#processDefinitionAdd [name="examFlowName"]').val("");
    	$('#processDefinitionAdd [name="enable"]').val("1");
    	var str='';
    	str+='<tr parent-tr="parent-1">'+
	            '<td width="20%" rowspan="1">'+
			     '   <select name="parent" class="form-control" id="parent">'+
			       PARENT+
			      '  </select>'+
			    '</td>'+
			    '<td width="40%">'+
			     '   <div class="col-sm-11 no-padding">'+
			      '      <select name="child" class="form-control" id="child">'+
			      CHILD+  
			       '     </select>'+
			       ' </div>'+
			'        <label class="control-label pull-left childNode">'+
			 '           <a class="fa fa-plus success operate-btn"></a>'+
			  '      </label>'+
			   ' </td>'+
			    '<td width="300px">'+
			     '   <select name="button" id="button"  class="form-control selectpicker" multiple>'+
			     BUTTON+
			      '  </select>'+
			    '</td>'+
			'</tr>';
    	$('#addFolwTbody').html(str);
    	$('#addFolwTbody #button').selectpicker({
    		'liveSearch': true,
            'liveSearchPlaceholder': '请输入关键字',
            'actionsBox': true,
            'selectAllText': '全选',
            'deselectAllText': '取消',
            'noneSelectedText': '请选择',
            'width':'300px'
    	});
        $('.processDefinitionAdd').modal('show');
    })
    parentChild('.processDefinitionAdd');//流程定义新增

    //流程定义编辑
    $('#processDefinition #processDefinitionTable').on('click', '.edit', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
    	//发请求  看是否已经被用了
    	$.post(ctx + '/flow/isUseExamFlow',{
    		'examFlowId':$(_this).attr('value')
    	},function(data){
    		if(data.status=='success'){
    			if(data.data==true){
    				swal('',"该流程被使用 无法编辑",'error');
    				$(_this).attr('typee','1');
    			}else{
    				$.post(ctx + '/flow/findExamFlow',{
    					'examFlowId':$(_this).attr('value')
    				},function(data2){
    					if(data2.status=='success'){
    						var examFlow=data2.data;
    						//基础属性
    						$('#processDefinitionEdit [name="examFlowId"]').val(examFlow.examFlowId);
    						$('#processDefinitionEdit [name="examFlowName"]').val(examFlow.examFlowName);
    						$('#processDefinitionEdit [name="enable"]').val(examFlow.enable);
    						//渲染节点
    						var examFlowUses=examFlow.examFlowUses;
    						var parents=[];
    						$.each(examFlowUses,function(index,examFlowUse){
    							if(index==0){
    								var parent={};
    								parent.parentId=examFlowUse.parentId;
    								parent.childs=[];
    								parent.childs.push(examFlowUse);
    								parents.push(parent);
    							}else{
    								var lastparentId=parents[parents.length-1]['parentId'];
    								
    								if(examFlowUse.parentId==lastparentId){
    									parents[parents.length-1].childs.push(examFlowUse);
    								}else{
    									var parent={};
        								parent.parentId=examFlowUse.parentId;
        								parent.childs=[];
        								parent.childs.push(examFlowUse);
        								parents.push(parent);
    								}
    							}
    						})
    						//数据结构改变
    						
    						var str='';
    						$.each(parents,function(ind,parent){
    							$.each(parent.childs,function(index,child){
    								if(index==0){
    									str+='<tr parent-tr="parent-' + (ind+1) + '">' +
    						            '    <td width="20%" rowspan="'+parent.childs.length+'">' +
    						            '        <select name="" class="form-control">' +
    						            PARENT+
    						            '        </select>' +
    						            '    </td>' +
    						            '    <td width="40%">' +
    						            '       <div class="col-sm-11 no-padding">' +
    						            '           <select name="" class="form-control">' +
    						            CHILD+
    						            '           </select>' +
    						            '       </div>' +
    						            '       <label class="control-label pull-left childNode">' +
    						            '           <a class="fa fa-plus success operate-btn"></a>' +
    						            '       </label>' +
    						            '    </td>' +
    						            '    <td width="40%">' +
    						            '        <select name="" class="form-control selectpicker" multiple>' +
    						            BUTTON+
    						            '        </select>' +
    						            '    </td>' +
    						            '</tr>';
    								}else{
    									str+='<tr child-tr="parent-' + (ind+1) + '">' +
    						            '    <td width="40%">' +
    						            '       <div class="col-sm-11 no-padding">' +
    						            '           <select name="" class="form-control">' +
    						            CHILD+
    						            '           </select>' +
    						            '       </div>' +
    						            '       <label class="control-label pull-left childNode">' +
    						            '           <a class="fa fa-minus danger operate-btn"></a>' +
    						            '       </label>' +
    						            '    </td>' +
    						            '    <td width="40%">' +
    						            '        <select name="" class="form-control selectpicker" multiple>' +
    						            BUTTON+
    						            '        </select>' +
    						            '    </td>' +
    						            '</tr>';
    								}
    							});
    						});
    						$('#editTbody').html(str);
    						
    						//选中
    						var trs=$("#editTbody tr");
    						$.each(trs,function(index,obj){
    							var buttonIds=[];
								if(examFlowUses[index].examFlowUseButtons!=null){
									$.each(examFlowUses[index].examFlowUseButtons,function(sta,button){
										buttonIds.push(button.buttonId);
									})
								}
    							if($(obj).find("td").length == 3){
    								$(obj).find("td:first select").val(examFlowUses[index].parentId);
    								
    								$(obj).find("td:eq(1) select").val(examFlowUses[index].childId);
    								
    								$(obj).find("td:eq(2) select").val(buttonIds);
    								$(obj).find("td:eq(2) select").selectpicker({
    						    		'liveSearch': true,
    						            'liveSearchPlaceholder': '请输入关键字',
    						            'actionsBox': true,
    						            'selectAllText': '全选',
    						            'deselectAllText': '取消',
    						            'noneSelectedText': '请选择',
    						            'width':'300px'
    						    	});
    							}else{
    								
    								$(obj).find("td:eq(0) select").val(examFlowUses[index].childId);
    								$(obj).find("td:eq(1) select").val(buttonIds);
    								$(obj).find("td:eq(1) select").selectpicker({
    						    		'liveSearch': true,
    						            'liveSearchPlaceholder': '请输入关键字',
    						            'actionsBox': true,
    						            'selectAllText': '全选',
    						            'deselectAllText': '取消',
    						            'noneSelectedText': '请选择',
    						            'width':'300px'
    						    	});
    							}
    						});
    						$('.processDefinitionEdit').modal('show');
    						$(_this).attr('typee','1');
    					}else{
    						$(_this).attr('typee','1');
    					}
    				},"json")
    			}
    		}else{
    			swal('',"查看流程是否被使用失败",'error');
    			$(_this).attr('typee','1');
    		}
    	},"json")
       
    })
    parentChild('.processDefinitionEdit');//流程定义编辑

    //流程定义查看
    $('#processDefinition #processDefinitionTable').on('click', '.view', function () {
    	var type=$(this).attr('typee');
    	if(type!=1) {
    		return;
    	}
    	$(this).attr('typee','0');
    	var _this=$(this);
    	$.post(ctx + '/flow/findExamFlow',{
			'examFlowId':$(_this).attr('value')
		},function(data2){
			if(data2.status=='success'){
				var examFlow=data2.data;
				//基础属性
				$('#processDefinitionView [name="examFlowName"]').val(examFlow.examFlowName);
				$('#processDefinitionView [name="enable"]').val(examFlow.enable);
				//渲染节点
				var examFlowUses=examFlow.examFlowUses;
				var parents=[];
				$.each(examFlowUses,function(index,examFlowUse){
					if(index==0){
						var parent={};
						parent.parentId=examFlowUse.parentId;
						parent.childs=[];
						parent.childs.push(examFlowUse);
						parents.push(parent);
					}else{
						var lastparentId=parents[parents.length-1]['parentId'];
						
						if(examFlowUse.parentId==lastparentId){
							parents[parents.length-1].childs.push(examFlowUse);
						}else{
							var parent={};
							parent.parentId=examFlowUse.parentId;
							parent.childs=[];
							parent.childs.push(examFlowUse);
							parents.push(parent);
						}
					}
				})
				//数据结构改变
				
				var str='';
				$.each(parents,function(ind,parent){
					$.each(parent.childs,function(index,child){
						if(index==0){
							str+='<tr parent-tr="parent-' + (ind+1) + '">' +
				            '    <td width="20%" rowspan="'+parent.childs.length+'">' +
				            '        <select name="" disabled class="form-control">' +
				            PARENT+
				            '        </select>' +
				            '    </td>' +
				            '    <td width="40%">' +
				            '       <div class="col-sm-11 no-padding">' +
				            '           <select name="" disabled  class="form-control">' +
				            CHILD+
				            '           </select>' +
				            '       </div>' +
				            '       <label class="control-label pull-left childNode">' +
				            
				            '       </label>' +
				            '    </td>' +
				            '    <td width="40%">' +
				            '        <select name="" disabled class="form-control selectpicker" multiple>' +
				            BUTTON+
				            '        </select>' +
				            '    </td>' +
				            '</tr>';
							
						}else{
							str+='<tr child-tr="parent-' +(ind+1) + '">' +
				            '    <td width="40%">' +
				            '       <div class="col-sm-11 no-padding">' +
				            '           <select name="" disabled class="form-control">' +
				            CHILD+
				            '           </select>' +
				            '       </div>' +
				            '       <label class="control-label pull-left childNode">' +
				           
				            '       </label>' +
				            '    </td>' +
				            '    <td width="40%">' +
				            '        <select name="" disabled class="form-control selectpicker" multiple>' +
				            BUTTON+
				            '        </select>' +
				            '    </td>' +
				            '</tr>';
							
						}
					});
				});
				$('#viewTbody').html(str);
				
				//选中
				var trs=$("#viewTbody tr");
				$.each(trs,function(index,obj){
					var buttonIds=[];
					if(examFlowUses[index].examFlowUseButtons!=null){
						$.each(examFlowUses[index].examFlowUseButtons,function(sta,button){
							buttonIds.push(button.buttonId);
						})
					}
					if($(obj).find("td").length == 3){
						$(obj).find("td:first select").val(examFlowUses[index].parentId);
						
						$(obj).find("td:eq(1) select").val(examFlowUses[index].childId);
						
						$(obj).find("td:eq(2) select").val(buttonIds);
						$(obj).find("td:eq(2) select").selectpicker({
				    		'liveSearch': true,
				            'liveSearchPlaceholder': '请输入关键字',
				            'actionsBox': true,
				            'selectAllText': '全选',
				            'deselectAllText': '取消',
				            'noneSelectedText': '请选择',
				            'width':'300px'
				    	});
					}else{
						
						$(obj).find("td:eq(0) select").val(examFlowUses[index].childId);
						$(obj).find("td:eq(1) select").val(buttonIds);
						$(obj).find("td:eq(1) select").selectpicker({
				    		'liveSearch': true,
				            'liveSearchPlaceholder': '请输入关键字',
				            'actionsBox': true,
				            'selectAllText': '全选',
				            'deselectAllText': '取消',
				            'noneSelectedText': '请选择',
				            'width':'300px'
				    	});
					}
				});
				
				$('.processDefinitionView').modal('show');
				$(_this).attr('typee','1');
			}else{
				$(_this).attr('typee','1');
			}
		},"json")
    })
    
    
    
    //流程状态切换
    $('#processDefinition').on('click',' .stastus-btn',function(){
    	var url=ctx + '/flow/updateTypeExamFlow';
    	var dataObj={};
    	dataObj.examFlowId=$(this).attr('value');
    	changeStatus(url,this,dataObj);
    })
    
    //展示列表状态切换
    $('#showListTable').on('click',' .stastus-btn',function(){
    	var url=ctx + '/flow/updateDataType';
    	var dataObj={};
    	dataObj.examFlowDataId=$(this).attr('value');
    	changeStatus(url,this,dataObj);
    })
})

/**
 * 父子节点增加删除
 * @param parent
 */
function parentChild(parent){
    //父节点
    var index = 1;
    $(parent).find('table .parentNode').on('click', '.operate-btn', function () {
        index++;
        var trHtml = '<tr parent-tr="parent-' + index + '">' +
            '    <td width="20%" rowspan="1">' +
            '        <select name="" class="form-control">' +
            PARENT+
            '        </select>' +
            '    </td>' +
            '    <td width="40%">' +
            '       <div class="col-sm-11 no-padding">' +
            '           <select name="" class="form-control">' +
            CHILD+
            '           </select>' +
            '       </div>' +
            '       <label class="control-label pull-left childNode">' +
            '           <a class="fa fa-plus success operate-btn"></a>' +
            '       </label>' +
            '    </td>' +
            '    <td width="40%">' +
            '        <select name="" class="form-control selectpicker" multiple>' +
            BUTTON+
            '        </select>' +
            '    </td>' +
            '</tr>';
        //增加行
        if ($(this).is('.fa-plus')) {
            $(parent).find('table tbody').append(trHtml);
            $('.selectpicker').selectpicker({
	    		'liveSearch': true,
	            'liveSearchPlaceholder': '请输入关键字',
	            'actionsBox': true,
	            'selectAllText': '全选',
	            'deselectAllText': '取消',
	            'noneSelectedText': '请选择',
	            'width':'300px'
	    	});
        }

        //删除行
        if ($(this).is('.fa-minus')) {
            var trList = $(parent).find('table tbody tr');
            var parentTrArr = [];
            for (var i = 0; i < trList.length; i++) {
                if ($(trList[i]).attr('parent-tr')) {
                    parentTrArr.push($(trList[i]).attr('parent-tr'));
                }
            }
            var parentTr = parentTrArr[parentTrArr.length - 1];
            if (parentTr != 'parent-1') {
                $(parent).find('table tbody tr[parent-tr=' + parentTr + ']').remove();
                $(parent).find('table tbody tr[child-tr=' + parentTr + ']').remove();
            }
        }
    })


    //子节点
    $(parent).find('table').on('click', '.childNode .operate-btn', function () {
        var currentTr = $(this).parent().parent().parent();
        var childrenTr = currentTr.attr('parent-tr');
        var rowspan = Number(currentTr.find('td:first').attr('rowspan'));
        var trHtml = '<tr child-tr="' + childrenTr + '">' +
            '    <td width="40%">' +
            '       <div class="col-sm-11 no-padding">' +
            '           <select name="" class="form-control">' +
            CHILD+
            '           </select>' +
            '       </div>' +
            '       <label class="control-label pull-left childNode">' +
            '           <a class="fa fa-minus danger operate-btn"></a>' +
            '       </label>' +
            '    </td>' +
            '    <td width="40%">' +
            '        <select name="" class="form-control selectpicker" multiple>' +
            BUTTON+
            '        </select>' +
            '    </td>' +
            '</tr>';
        //增加行
        if ($(this).is('.fa-plus')) {
        	var a=currentTr;
        	for(var i=1;i<rowspan;i++){
        		a=a.next();
        	}
            a.after(trHtml);
            rowspan++;
            currentTr.find('td:first').attr('rowspan', rowspan);
            $('.selectpicker').selectpicker({
	    		'liveSearch': true,
	            'liveSearchPlaceholder': '请输入关键字',
	            'actionsBox': true,
	            'selectAllText': '全选',
	            'deselectAllText': '取消',
	            'noneSelectedText': '请选择',
	            'width':'300px'
	    	});
        }

        //删除行
        if ($(this).is('.fa-minus')) {
            var childTr = currentTr.attr('child-tr');
            var rowspans = $(parent).find('table tr[parent-tr="' + childTr + '"] td:first').attr('rowspan');
            rowspans--;
            console.log(rowspans);
            $(parent).find('table tr[parent-tr="' + childTr + '"] td:first').attr('rowspan', rowspans);
            $(this).parent().parent().parent().remove();
        }
    })
}

//状态切换
function changeStatus(url,obj,dataObj){
	var _this=$(obj);
	if($(_this).hasClass('btn-use')){
    	$(_this).attr('disabled','disabled');
    	dataObj.enable=0;
    	$.post(url,dataObj,function(data){
    		if(data.status=='success'){
    			$(_this).removeClass('btn-use').addClass('btn-nouse').html('<i class="fa fa-ban"></i>禁用');
    		}else{
    			swal('',"禁用失败",'error');
    		}
    		$(_this).removeAttr('disabled');
    	},"json");
    }else{
    	$(_this).attr('disabled','disabled');
    	dataObj.enable=1;
    	$.post(url,dataObj,function(data){
    		if(data.status=='success'){
    			$(_this).removeClass('btn-nouse').addClass('btn-use').html('<i class="fa fa-check-circle-o"></i>启用');
    		}else{
    			swal('',"启用失败",'error');
    		}
    		$(_this).removeAttr('disabled');
    	},"json");
    }
}

//load 父节点 子节点  功能按钮
function loadBasics(){
	$('.processDefinitionAdd').find('table .parentNode .operate-btn').attr('disabled','disabled');
	$('.processDefinitionAdd').find('table .childNode .operate-btn').attr('disabled','disabled');
	$('.processDefinitionEdit').find('table .parentNode .operate-btn').attr('disabled','disabled');
	$('.processDefinitionEdit').find('table .childNode .operate-btn').attr('disabled','disabled');
	
	//加载功能按钮
	$.post(ctx + '/flow/selectAllButtons',{},function(data){
		if(data.status=='success'){
			var but='';
			$.each(data.data,function(index,obj){
				but+='<option value="'+obj.examFlowButtonId+'">'+obj.buttonName+'</option>'
			})
			BUTTON=but;
			$("#button").html(but);
			$("#button").selectpicker({
	    		'liveSearch': true,
	            'liveSearchPlaceholder': '请输入关键字',
	            'actionsBox': true,
	            'selectAllText': '全选',
	            'deselectAllText': '取消',
	            'noneSelectedText': '请选择',
	            'width':'300px'
	    	});
		}else{
			swal('',"加载功能按钮失败",'error');
		}
	})
	
	//加载父节点
	$.post(ctx + '/flow/loadTree',{
		'isParent':'1'
	},function(data){
		if(data.status=='success'){
			var par='';
			$.each(data.data,function(index,obj){
				par+='<option value="'+obj.examFlowBasicsId+'">'+obj.fullName+'</option>'
			})
			PARENT=par;
			$("#parent").html(par);
			$('.processDefinitionAdd').find('table .parentNode .operate-btn').removeAttr('disabled');
			$('.processDefinitionEdit').find('table .parentNode .operate-btn').removeAttr('disabled');
		}else{
			swal('',"加载父节点失败",'error');
		}
	})
	//加载子节点
	$.post(ctx + '/flow/loadTree',{
		'isParent':'2'
	},function(data){
		if(data.status=='success'){
			var chi='';
			$.each(data.data,function(index,obj){
				chi+='<option value="'+obj.examFlowBasicsId+'">'+obj.fullName+'</option>'
			})
			CHILD=chi;
			$("#child").html(chi);
			$('.processDefinitionAdd').find('table .childNode .operate-btn').removeAttr('disabled');
			$('.processDefinitionEdit').find('table .childNode .operate-btn').removeAttr('disabled');
		}else{
			swal('',"加载子节点失败",'error');
		}
	})
}

//流程定义新增 确定
function addFolw(){
	$('.processDefinitionAdd').modal('hide');
	var examFlowUses=[];
	var trs=$("#addFolwTbody tr");
	var parent='';
	$.each(trs,function(index,obj){
		var examFlowUse = {};
		if($(obj).find("td").length == 3){
			var examFlowUseParent = {};
			parent=$(obj).find("td:first select").val();
			//添加插入父节点
			examFlowUseParent.parentId=0;
			examFlowUseParent.childId=$(obj).find("td:first select").val();
			examFlowUses.push(examFlowUseParent);
			
			examFlowUse.parentId=$(obj).find("td:first select").val();
			examFlowUse.childId=$(obj).find("td:eq(1) select").val();
			if($(obj).find("td:eq(2) select").val() == null){
				examFlowUse.buttonIds='';
			}else{
				examFlowUse.buttonIds=$(obj).find("td:eq(2) select").val().join(',');
			}
		}else{
			examFlowUse.parentId=parent;
			examFlowUse.childId=$(obj).find("td:eq(0) select").val();
			if($(obj).find("td:eq(1) select").val() == null){
				examFlowUse.buttonIds='';
			}else{
				examFlowUse.buttonIds=$(obj).find("td:eq(1) select").val().join(',');
			}
		}
		examFlowUses.push(examFlowUse);
	})
	var examFlow={};
	examFlow.enable=$('#processDefinitionAdd [name="enable"]').val();
	examFlow.examFlowName=$('#processDefinitionAdd [name="examFlowName"]').val();
	examFlow.examFlowUses=examFlowUses;
	
	var str=JSON.stringify(examFlow);
	
	 $.ajax({
        url: ctx + '/flow/addExamFlow',
        method: 'post',
        contentType: 'application/json', // 这句不加出现415错误:Unsupported Media Type
        data:str, // 以json字符串方式传递
        success: function(data) {
        	if(data.status=='success'){
    			initFlow();
    			 initData();
    			swal('',"新增流程成功",'success');
    		}else{
    			swal('',"新增流程失败",'error');
    		}
        },
        error: function(data) {
        	swal('',"新增流程失败",'error');
        }
    });
}

//流程定义编辑 确定
function editFolw(){
	$('.processDefinitionEdit').modal('hide');
	var examFlowUses=[];
	var trs=$("#editTbody tr");
	var parent='';
	$.each(trs,function(index,obj){
		var examFlowUse = {};
		if($(obj).find("td").length == 3){
			var examFlowUseParent = {};
			parent=$(obj).find("td:first select").val();
			//添加插入父节点
			examFlowUseParent.parentId=0;
			examFlowUseParent.childId=$(obj).find("td:first select").val();
			examFlowUses.push(examFlowUseParent);
			
			examFlowUse.parentId=$(obj).find("td:first select").val();
			examFlowUse.childId=$(obj).find("td:eq(1) select").val();
			if($(obj).find("td:eq(2) select").val() == null){
				examFlowUse.buttonIds='';
			}else{
				examFlowUse.buttonIds=$(obj).find("td:eq(2) select").val().join(',');
			}
		}else{
			examFlowUse.parentId=parent;
			examFlowUse.childId=$(obj).find("td:eq(0) select").val();
			if($(obj).find("td:eq(1) select").val() == null){
				examFlowUse.buttonIds='';
			}else{
				examFlowUse.buttonIds=$(obj).find("td:eq(1) select").val().join(',');
			}
		}
		examFlowUses.push(examFlowUse);
	})
	var examFlow={};
	examFlow.enable=$('#processDefinitionEdit [name="enable"]').val();
	examFlow.examFlowName=$('#processDefinitionEdit [name="examFlowName"]').val();
	examFlow.examFlowId=$('#processDefinitionEdit [name="examFlowId"]').val();
	examFlow.examFlowUses=examFlowUses;
	
	var str=JSON.stringify(examFlow);
	 $.ajax({
        url: ctx + '/flow/updateExamFlow',
        method: 'post',
        contentType: 'application/json', // 这句不加出现415错误:Unsupported Media Type
        data:str, // 以json字符串方式传递
        success: function(data) {
        	if(data.status=='success'){
    			initFlow();
    			 initData();
    			swal('',"修改流程成功",'success');
    		}else{
    			swal('',"修改流程失败",'error');
    		}
        },
        error: function(data) {
        	swal('',"修改流程失败",'error');
        }
    });
}
//流程环节新增 确定
function addBasics(){
	$('.processLinkAdd').modal('hide');
	$.post(ctx + '/flow/addBasics',$("#processLinkAdd").serialize(),function(data){
		if(data.status=='success'){
			swal('',"添加成功",'success');
			initBasics();
		}else{
			swal('',"添加失败",'error');
		}
	},"json")
}

//流程环节编辑 确定
function editBasics(){
	$('.processLinkEdit').modal('hide');
	$.post(ctx + '/flow/updateBasics',$("#processLinkEdit").serialize(),function(data){
		if(data.status=='success'){
			swal('',"修改成功",'success');
			initBasics();
		}else{
			swal('',"修改失败",'error');
		}
	},"json")
}

//流程功能新增 确定
function addButton(){
	$('.processFunctionAdd').modal('hide');
	$.post(ctx + '/flow/addButton',$("#processFunctionAdd").serialize(),function(data){
		if(data.status=='success'){
			swal('',"添加成功",'success');
			initButton();
		}else{
			swal('',"添加失败",'error');
		}
	},"json")
}

//流程功能编辑  确定
function editButton(){
	$('.processFunctionEdit').modal('hide');
	$.post(ctx + '/flow/updateButton',$("#processFunctionEdit").serialize(),function(data){
		if(data.status=='success'){
			swal('',"编辑成功",'success');
			initButton();
		}else{
			swal('',"编辑失败",'error');
		}
	},"json")
}

//展示列表编辑  确定
function editData(){
	$('.showListEdit').modal('hide');
	var examFlowData={};
	examFlowData.examFlowDataId=$('#showListEdit [name="examFlowDataId"]').val();
	examFlowData.dataName=$('#showListEdit [name="dataName"]').val();
	var jsonStr='';
	//获取tr
	var trs=$('#dataBody tr');
	var str='[';
	$.each(trs,function(index,tr){
		str+='{'
		var flag1=$(tr).find("td:first input").is(":checked");
		var flag2=$(tr).find("td:eq(1) input").is(":checked");
		var flag3=$(tr).find("td:eq(2) input").is(":checked");
		var name=$(tr).find("td:eq(3)").html();
		var field=$(tr).find("td:eq(4)").html();
		if(flag1){
			str+='"isShow":"1"';
		}else{
			str+='"isShow":"2"';
		};
		str+=',';
		if(flag2){
			str+='"isSearch":"1"';
		}else{
			str+='"isSearch":"2"';
		};
		str+=',';
		if(flag3){
			str+='"isExport":"1"';
		}else{
			str+='"isExport":"2"';
		};
		str+=',';
		str+='"name":"'+name+'"';
		str+=',';
		str+='"field":"'+field+'"';
		str+='}';
		if(index!=(trs.length-1)){
			str+=",";
		}
	})
	str+=']';
	examFlowData.examData=str;
	$.post(ctx + '/flow/updateDataType',examFlowData,function(data){
		if(data.status=='success'){
			swal('',"编辑成功",'success');
			initData();
		}else{
			swal('',"编辑失败",'error');
		}
	},"json")
}
/**
 * 初始化流程
 * @returns
 */
function initFlow() {
    var init = $('#processDefinitionTable').dataTable({
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
        "sAjaxSource": ctx + '/flow/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataFlow,
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            $('td:eq(0)', nRow).html(iDisplayIndex+1);
            return nRow;
        },
        "aoColumns": [
            {"mDataProp": "sortCode",'sClass': "text-center"},
            {"mDataProp": "examFlowName",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span style="width: inherit" class="btn btn-xs btn-use stastus-btn " value="'+full['examFlowId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span style="width: inherit" class="btn btn-xs btn-nouse stastus-btn" value="'+full['examFlowId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a class="edit" typee="1" value="'+full['examFlowId']+'">'+
                    	'<i class="fa fa-edit blue" data-toggle="tooltip" '+
                       ' data-placement="top" data-original-title="编辑" '+
                        'title="编辑"></i>'+
                     '</a>'+
                 '<a class="view" typee="1" value="'+full['examFlowId']+'">'+
                    ' <i class="fa fa-search warning" data-toggle="tooltip" '+
                      '  data-placement="top" data-original-title="查看" '+
                      '  title="查看"></i>'+
                 '</a>';
            	return str;
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#processDefinitionTable_wrapper").removeClass();
    $('#processDefinitionTable_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#processDefinitionTable_wrapper .dataTables_info').parent().append($('#processDefinitionTable_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataFlow(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "examFlowName", "value":$("#examFlowName").val()});
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


/**
 * 初始化流程环节
 * @returns
 */
function initBasics() {
    var init = $('#processLinkTable').dataTable({
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
        "sAjaxSource": ctx + '/flow/loadBasics',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataBasics,
        "aoColumns": [
            {"mDataProp": "fullName",'sClass': "text-center"},
            {"mDataProp": "isParent",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['isParent']==1){
            		return '父节点';
            	}else{
            		return '子节点';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a class="edit" typee="1" value="'+full['examFlowBasicsId']+'">'+
                    	'<i class="fa fa-edit blue" data-toggle="tooltip" '+
                       ' data-placement="top" data-original-title="编辑" '+
                        'title="编辑"></i>'+
                     '</a>'+
                 '<a href="#" class="delete" typee="1" value="'+full['examFlowBasicsId']+'">'+
                    ' <i class="fa fa-trash-o danger" data-toggle="tooltip" '+
                      '  data-placement="top" data-original-title="删除" '+
                      '  title="删除"></i>'+
                 '</a>';
            	return str;
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#processLinkTable_wrapper").removeClass();
    $('#processLinkTable_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#processLinkTable_wrapper .dataTables_info').parent().append($('#processLinkTable_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataBasics(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "fullName", "value":$("#basicsName").val()});
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


/**
 * 初始化流程功能
 * @returns
 */
function initButton() {
    var init = $('#processFunctionTable').dataTable({
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
        "sAjaxSource": ctx + '/flow/loadButton',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataButton,
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            $('td:eq(0)', nRow).html(iDisplayIndex+1);
            return nRow;
        },
        "aoColumns": [
            {"mDataProp": "sortCode",'sClass': "text-center"},
            {"mDataProp": "buttonName",'sClass': "text-center"},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a class="edit" typee="1" value="'+full['examFlowButtonId']+'">'+
                    	'<i class="fa fa-edit blue" data-toggle="tooltip" '+
                       ' data-placement="top" data-original-title="编辑" '+
                        'title="编辑"></i>'+
                     '</a>';
            	return str;
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#processFunctionTable_wrapper").removeClass();
    $('#processFunctionTable_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#processFunctionTable_wrapper .dataTables_info').parent().append($('#processFunctionTable_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataButton(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "buttonName", "value":$("#buttonName").val()});
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

/**
 * 初始化展示列表
 * @returns
 */
function initData() {
    var init = $('#showListTable').dataTable({
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
        "sAjaxSource": ctx + '/flow/loadData',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDataData,
        "aoColumns": [
            {"mDataProp": "dataName",'sClass': "text-center"},
            {"mDataProp": "enable",'sClass': "text-center", "mRender": function (data, type, full) {
            	if(full['enable']==1){
            		return '<span style="width: inherit" class="btn btn-xs btn-use stastus-btn " value="'+full['examFlowDataId']+'"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	}else{
            		return '<span style="width: inherit" class="btn btn-xs btn-nouse stastus-btn" value="'+full['examFlowDataId']+'"><i class="fa fa-check-circle-o"></i>禁用</span>';
            	}
            }},
            {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
            	var str='';
            	str+='<a class="edit" typee="1" value="'+full['examFlowDataId']+'">'+
                    	'<i class="fa fa-edit blue" data-toggle="tooltip" '+
                       ' data-placement="top" data-original-title="编辑" '+
                        'title="编辑"></i>'+
                     '</a>'+
                 '<a href="#" class="delete" typee="1" value="'+full['examFlowDataId']+'">'+
                    ' <i class="fa fa-trash-o danger" data-toggle="tooltip" '+
                      '  data-placement="top" data-original-title="删除" '+
                      '  title="删除"></i>'+
                 '</a>';
            	return str;
            }},
        ],

        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#showListTable_wrapper").removeClass();
    $('#showListTable_wrapper').addClass("table-scrollable");


    //每页显示记录数
    $('#showListTable_wrapper .dataTables_info').parent().append($('#showListTable_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initDataData(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "dataName", "value":$("#dataName").val()});
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



//回车搜索
function search() {
    if (event.keyCode == 13) {
    	initButton();
    	initData();
    	initBasics();
    	initFlow();
    }
}