var WaitForOutTable = function(){
	return{
		init: function(){
			var Table = $('#waitForOut').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
//            	"sAjaxSource" : ctx+'/examWorkbenchExamFlow/getAll',
            	"sAjaxSource" : ctx+'/examWorkbenchExpress/getAll',
        		"fnServerData": waitForOutData,//用于替换默认发到服务端的请求操作  
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
        		               	{"mData": "applyId", 'sClass': "text-center", "mRender": function (data, type, full ) {
        		               		return '<label> <input class="checkchild info" name="myRadio" type="radio" value="'+full['applyId']+'" data-value=\''+JSON.stringify(full)+'\'><span class="text"></span></label>';
        		               	}},
        			            {"mData": "applyCode", 'sClass': "text-center"},
        			            {"mData": "applicantName", 'sClass': "text-center"},
        		               	{"mData": "applicantDate", 'sClass': "text-center"},
        		               	{"mData": "applyDetailNum", 'sClass': "text-center"},
        		                {"mData": "payName", 'sClass': "text-center"},
        		                {"mData": "money", 'sClass': "text-center"},
        			            {"mData": "expendDetail", 'sClass': "text-center"},
        		               	{"mData": "paymentFrom", 'sClass': "text-center","mRender": function (data, type, full ) {
        		               			if(full['paymentFrom']=='1') {
        		               				return '集团支付';
        		               			} else if(full['paymentFrom']=='2') {
        		               				return '分校支付';
        		               			}
        		               			return '';
        		               		}
        		               	},
        			            {
        			                "mData": "id",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                   // var searchButton = "<a data-full='"+JSON.stringify(full)+"' href='#' class='view' > <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看'></i> </a>";
        			                    var deleteButton = "<a href='#' id='" + full['applyId'] + "' onclick=\'delRecords("+JSON.stringify(full)+")\' class='ck' data-toggle='modal' data-target='.application-expenditure'><i class='fa fa-trash-o danger' data-toggle='tooltip' data-placement='top' data-original-title='删除' title='删除'></i></a>";
        			                    return deleteButton;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
			$("#waitForOut_wrapper").removeClass();
		    $('#waitForOut_wrapper').addClass("table-scrollable");

			//横线滚动条
			$('#waitForOut_wrapper').on('scroll',function(){
				$('#waitForOut_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		    //每页显示记录数
		    $('#waitForOut_wrapper .dataTables_info').parent().append($('#waitForOut_wrapper .dataTables_length'));
			//得到table对象，后面得到table选中行时会用到
			tableObj = Table;
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
function waitForOutData(sSource, aoData, fnCallback, oSettings) {
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
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
	        	fnCallback(response.returnObject);
        }
    });
};


//设置当前选中select下的需要提交的name值
function setThisName(obj) {
	var thisName = $(obj).find(":selected").text();//得到当前select选中项的文本值
	console.info($(obj).find(":selected").val());
	//为与该select位于同一父节点下的input隐藏框设置name值
	$(obj).parent().find("input").val(thisName);
}

//回退指定记录的状态，同时逻辑删除这些记录的财务申请明细
function delRecords(record) {
	//记录当前选中申请id
	$("#applyId").val(record.applyId);
	$("#origin").val(3);
	
	//首先页面回显数据，但是不让编辑
	//清除上一次操作残留数据
	//清除开户行信息
	$("#bankName").val('');
	//清除开户行所在省
	$("#addProvinceName").val('');
	$("#addprovince").html('');
	//清除开户行所在市
	$("#addCityName").val('');
	$("#addcity").val('');
	//清除页面显示省市信息
	$("#bankPC").val('');
	//清除开户人信息
	$("#accountName").val('');
	//清除开户人账号信息
	$("#accountNum").val('');
	//清除开户人电话
	$("#phone").val('');
	
	//显示费用明细表
	$("#applyOutTable").show();
	
	//查询选中产品和考期下所有支出费用
	var examTimeId = $("#examTimeId").val();
	var productId = $("#productId").val();
	
		//申请费用种类
		$.ajax({
			"type": "Post",
			"url": ctx + "/examWorkbenchExpress/appendPayDiv",
			"dataType": "json",
			"data": {
				productId:productId,
				examTimeId:examTimeId,
				expensesType:1//支出类型
			},
			"success": function (data) {
				if(data.status=="success") {
					var str = "<option value=''>--请选择--</option>";
					for(var i=0; i<data.list.length; i++) {
						if(record!=null && record!='') {
							//record不为空，需要做回显
							if(record.payCodeId==data.list[i].expensesTypeId) {
								str += '<option value="'+data.list[i].expensesTypeId+'" selected>'+data.list[i].expensesTypeName+'</option>';
							} else {
								str += '<option value="'+data.list[i].expensesTypeId+'">'+data.list[i].expensesTypeName+'</option>';
							}
						} else {
							str += '<option value="'+data.list[i].expensesTypeId+'">'+data.list[i].expensesTypeName+'</option>';
						}
					}
					$("#payCodeId").html(str);
//					$("#payCodeId").trigger("chosen:update");
//					$("#payCodeId").trigger('chosen:updated');
//					$("#payCodeId").chosen({no_results_text: "没有匹配项"});
//			        $('.chosen-container').width('100%');
				} else {
					toastr.error("费用查询失败");
				}
			}
		});
	 
		//查找财务配置费用类别-父类
		$.ajax({
			"type": "Post",
			"url": ctx + "/examWorkbenchExpress/getCostClass",
			"dataType": "json",
			"data": {
				parentId:0
			},
			"success": function (data) {
				if(data.status=="success") {
//					var str = "<option value=''>--请选择--</option>";
					var str = "";
					for(var j=0; j<data.list.length; j++) {
						if(record!=null && record!='') {
							//record不为空，需要做回显
							if(record.pCostclassId==data.list[j].feeId) {
								str += '<option value="'+data.list[j].feeId+'" data-value=\''+JSON.stringify(data.list[j].childList)+'\' selected>'+data.list[j].feeName+'</option>';
							} else {
								str += '<option value="'+data.list[j].feeId+'" data-value=\''+JSON.stringify(data.list[j].childList)+'\'>'+data.list[j].feeName+'</option>';
							}
						} else {
							str += '<option value="'+data.list[j].feeId+'" data-value=\''+JSON.stringify(data.list[j].childList)+'\'>'+data.list[j].feeName+'</option>';
						}
					}
					$("#feeParentId").html(str);
					//以下回显部分
					if(record!=null && record!='') {
						if(record.pCostclassId!=null) {
							//触发change事件，回显子类别费用
							//生成子类别费用option
							$("#feeParentId").trigger("change");
							//选中子类别费用
							if(record.costclassId!=null) {
								$("#feeChildId").find("option[value='"+record.costclassId+"']").prop("selected",true);
							}
						}
					}
				} else {
					toastr.error("费用查询失败");
				}
			}
		});
		
	 //得到常用收款人
	 $.ajax({
         "type": "Post",
         "url": ctx + "/examWorkbenchExpress/getFinancePayee",
         "dataType": "json",
         "data": {
        	 parentId:0
         },
         "success": function (data) {
             if(data.status=="success") {
            	 var str = "<option value=''>--请选择--</option>";
            	 for(var k=0; k<data.list.length; k++) {
            	    if(record!=null && record!='') {
						//record不为空，需要做回显
						if(record.payeeId==data.list[k].financePayeeId) {
							str += '<option value="'+data.list[k].financePayeeId+'" data-value=\''+JSON.stringify(data.list[k])+'\' selected>'+data.list[k].accountName+'</option>';
						} else {
							str += '<option value="'+data.list[k].financePayeeId+'" data-value=\''+JSON.stringify(data.list[k])+'\'>'+data.list[k].accountName+'</option>';
						}
					} else {
						str += '<option value="'+data.list[k].financePayeeId+'" data-value=\''+JSON.stringify(data.list[k])+'\'>'+data.list[k].accountName+'</option>';
					}
            	 }
            	 $("#financePayee").html(str);
            	 //触发change事件，回显常用收款人详细信息
            	  
            	 payeeChange();
             } else {
             	toastr.error("费用查询失败");
             }
         }
     });
	 
	 //回显总价
	 $("#totalMoney").val(record.money); 
	 
	 var studentCount = 0;//记录报名学员人数
	 if(record!=null && record!='') {
		 //开始构造table详细信息
		 //查询申请费用详情
		 $.ajax({
	         "type": "Post",
	         "url": ctx + "/examWorkbenchExpress/getApplyDetail",
	         "dataType": "json",
	         "data": {
	        	 applyId:record.applyId
	         },
	         "success": function (data) {
	        	 var str = "";
	        	 if(data.status=="success") {
	        		 studentCount = data.data.length;//报考学员人数=申请详情总数
	        		 for(var m=0; m<data.data.length; m++) {
		        		 str +='	 <tr id='+data.data[m].detailId+'>                                     '
					         +'    <td>                                   '
					         +'        <div class="checkbox">             '
					         +'            <label>                        '
					         +'                <input type="checkbox" onclick="genContent(this)" name="detailId" data-value=\''+JSON.stringify(data.data[m])+'\' value='+data.data[m].detailId+'>    '
					         +'                <span class="text"></span> '
					         +'            </label>                       '
					         +'        </div>                             '
					         +'    </td>                                  '
					         +'    <td>'+(data.data[m].applicantDate==null?'':data.data[m].applicantDate)+'</td>                              '
					         +'    <td>'+(data.data[m].studentName==null?'':data.data[m].studentName)+'</td> ';
					         //0 正常 1转班，2休学，3退费，4补考 5重修,6 退费中 7转化 8-初申 9-已退费 11已经转班
		        		 if(data.data[m].unAction==null) {
		        			 str += '    <td></td> ';
		        		 } else if(data.data[m].unAction=="0") {
		        			 str += '    <td>'+'正常'+'</td> ';
		        		 } else if(data.data[m].unAction=="1") {
		        			 str += '    <td>'+'转班'+'</td> ';
		        		 } else if(data.data[m].unAction=="2") {
		        			 str += '    <td>'+'休学'+'</td> ';
		        		 } else if(data.data[m].unAction=="3") {
		        			 str += '    <td>'+'退费'+'</td> ';
		        		 } else if(data.data[m].unAction=="4") {
		        			 str += '    <td>'+'补考'+'</td> ';
		        		 } else if(data.data[m].unAction=="5") {
		        			 str += '    <td>'+'重修'+'</td> ';
		        		 } else if(data.data[m].unAction=="6") {
		        			 str += '    <td>'+'退费中'+'</td> ';
		        		 } else if(data.data[m].unAction=="7") {
		        			 str += '    <td>'+'转化'+'</td> ';
		        		 } else if(data.data[m].unAction=="8") {
		        			 str += '    <td>'+'初申'+'</td> ';
		        		 } else if(data.data[m].unAction=="9") {
		        			 str += '    <td>'+'已退费'+'</td> ';
		        		 } else if(data.data[m].unAction=="11") {
		        			 str += '    <td>'+'已经转班'+'</td> ';
		        		 }
					      str += '    <td>'+(data.data[m].ktimeValue==null?'':data.data[m].ktimeValue)+'</td>                              '
					         +'    <td>'+(data.data[m].productName==null?'':data.data[m].productName)+'</td>                              '
					         +'    <td>'+(data.data[m].yjValue==null?'':data.data[m].yjValue)+'</td>                              '
					         +'    <td>'+(data.data[m].sjValue==null?'':data.data[m].sjValue)+'</td>                              '
					         //资料查看
					         +'    <td><a href="#" data-record="'+data.data[m].infoManageId+'"'
					         +' data-record2="'+data.data[m].productId+'"'
					         +' data-record3="'+data.data[m].ktimeValue+'"' 
					         +' onclick="showMaterial(this)" data-toggle="modal" data-target=".material-dialog">'
					         +' <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看">'
					         +' </i></a></td>';
					     //费用支付记录
					      str += ' <td> <a href="javascript:void(0);" data-record="'+data.data[m].infoManageId+'"'
					      	 + ' data-record2="'+data.data[m].productId+'"'
					      	 + ' onclick="feeInfoClickShow(this)" >'
					      	 + ' <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看">'
					      	 + ' </i></a></td>';
					         
					      str += '<td><a href="#" class="delete" onclick="rebackStatus(\''+record.applyId+'\',\''
					      					+data.data[m].infoManageId+'\',\''
					      					+data.data[m].detailId+'\')">'
					      		+ '<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></td>';
					      str += '</tr>';
		        	 } 
	        	 }
	        	 $("#applyDetailTbody").html(str);
	        	 
	        	 //申请说明内容显示
	        	 var content = "本次报考人数共"+studentCount+"人。";
	        	 contentEditor.html(content);
	        	 contentEditor.sync();
	        	 //回显单价=总价/人数
	        	 $("#money").val(record.money/studentCount);
	         }
		 });
	 }

}

//对undefined的值，返回空
function returnNull(obj) {
	if(obj==null || typeof(obj)=='undefined') {
		return '';
	} else {
		return obj;
	}
}

//单击复选框，联动申请说明内容
function genContent(obj) {
	//判断该复选框是否选中
	var checkFlag = $(obj).prop("checked");
	//取得该条申请详情的详细信息
	var record = $(obj).data("value");
	if(checkFlag) {
		 $.ajax({
	         "type": "Post",
	         "url": ctx + "/examWorkbenchExpress/getCheckedDetail",
	         "dataType": "json",
	         "data": {
	        	 infoManageId:record.infoManageId,
	        	 productId:record.productId,
	        	 payCodeId:record.payCodeId
	         },
	         "success": function (data) {
	        	 //单击选中,id号为学员id
	        	 var str = "<p id='"+record.detailId+"'>学员姓名:"+record.studentName+"(手机号:"+data.studentPhone+"),证件:"+data.idcard;
	        	 //0 正常 1转班，2休学，3退费，4补考 5重修,6 退费中 7转化 11已经转班
	        	 if(record.studentStatus=="0") {
	        		 str += "。状态: 正常。";
	        	 } else if(record.studentStatus=="1") {
	        		 str += "。状态: 转班。";
	        	 } else if(record.studentStatus=="2") {
	        		 str += "。状态: 休学。";
	        	 } else if(record.studentStatus=="3") {
	        		 str += "。状态: 退费。";
	        	 } else if(record.studentStatus=="4") {
	        		 str += "。状态: 补考。";
	        	 } else if(record.studentStatus=="5") {
	        		 str += "。状态: 重修。";
	        	 } else if(record.studentStatus=="6") {
	        		 str += "。状态: 退费中。";
	        	 } else if(record.studentStatus=="7") {
	        		 str += "。状态: 转化。";
	        	 } else if(record.studentStatus=="11") {
	        		 str += "。状态: 已经转班。";
	        	 }
	        	 str += " 报考:"+data.registerCount+"次(已支付"+data.hasPayOut+")。"
		        	 + "缴费合计:"+record.payValue+"。已申请金额:"+data.hasApply+"。 可申请金额:"+(data.feeValue-data.hasPayOut+data.returnsMoney)
		        	 +"。本次费用:"+record.unitPrice+"</p>";
	        	 //将生成的内容拼接到后面
	        	 contentEditor.html(contentEditor.html()+str);
	        	 contentEditor.sync();
	         }
		 });
	} else {
		//移除申请说明中生成的该条内容
		//kindEditor显示的内容是在kindEditor生成的jsp中，然后通过iframe引入，所以在本页面的js文件中直接用jQuery选择器，获取不到元素
		var pObj = $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).find("#"+record.detailId);
		pObj.remove();
	}
}

//表格中复选框全选反选功能
function checkAll(obj) {
	//得到该复选框选中标志
	var checkFlag = $(obj).prop("checked");
	if(checkFlag) {
		//如果是选中操作，就要将所有复选框都设置为选中状态
		$(obj).parents("table").find("input[type='checkbox']").prop("checked",true);
		//更新申请说明内容
		 var content = "本次报考人数共"+$("#applyDetailTbody").find("input[type='checkbox']").length+"人。";
    	 contentEditor.html(content);
    	 contentEditor.sync();
    	 
    	 //调用方法，将所有选中学员的信息显示到申请说明中
    	 $("#applyDetailTbody").find("input[type='checkbox']").each(function(i,e){
        	 genContent(e);
    	 });
	} else {
		$(obj).parents("table").find("input[type='checkbox']").prop("checked",false);
		//更新申请说明内容
		 var content = "本次报考人数共0人。";
	   	 contentEditor.html(content);
	   	 contentEditor.sync();
	}
}

//设置与该下拉框处于同一父类下的input框的值
function setHisName(obj) {
	var strName = $(obj).find(":selected").text();
	$(obj).parent().find("input").val(strName);
}