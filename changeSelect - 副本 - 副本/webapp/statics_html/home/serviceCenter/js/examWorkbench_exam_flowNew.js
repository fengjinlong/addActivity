var ApplyDataTable = function(){
	return{
		init: function(){
			var Table = $('#alreadyRegistion').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/examWorkbenchExamFlow/getAll',
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
        		               		return '<label> <input class="checkchild" mainStatus="'+full['mainStatus']+'"   aplliedforStatus="'+full['aplliedforStatus']+'" id="'+data+'" infoManageId="'+full['infoManageId']+'"  productId="'+full['productId']+'" projectInfoManageId="'+full['projectInfoManageId']+'"'
        		               			+ ' studentId="'+full['studentInfoManageId']+'" studentName="'+full['studentName']+'" class="info" type="checkbox" value="'+data+'"><span class="text"></span></label>';
        		               	}},
        			            {"mData": "baoMDate", 'sClass': "text-center"},
        			            {"mData": "studentName", 'sClass': "text-center"},
        		               	{"mData": "idcard", 'sClass': "text-center"},
        		               	{"mData": "batch", 'sClass': "text-center"},
        		                {"mData": "departmentName1", 'sClass': "text-center"},
        		                {"mData": "ktimeValue", 'sClass': "text-center"},
        			            {"mData": "productName", 'sClass': "text-center"},
        		               	{"mData": "sumPrice", 'sClass': "text-center"},
        			            {"mData": "sPrice", 'sClass': "text-center"},
        			            {"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
    			                    	var fastButton = "<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' onclick='fastClick(this)' data-toggle='modal' data-target='.fast-dialog'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
    			                    	return fastButton;
        			            	}
        			            },
        			            {"mData": "", 'sClass': "text-center", "mRender": function (data, type, full ) {
				                    	var feeOutButton = "<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' onclick='feeInfoClick(this)' data-toggle='modal' data-target='.feeOut-dialog'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
				                    	return feeOutButton;
    			            		}
        			            },
        			            {
        			                "mData": "id",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                   // var searchButton = "<a data-full='"+JSON.stringify(full)+"' href='#' class='view' > <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看'></i> </a>";
        			                    var searchButton = "<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' data-toggle='modal' data-target='.serviceView'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
        			                    var phoneButton = "<a data-full='"+JSON.stringify(full)+"' href='#' class='phone' > <i class='fa fa-phone success' data-toggle='tooltip' data-placement='top' data-original-title='电话'></i></a>";
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
			$("#alreadyRegistion_wrapper").removeClass();
		    $('#alreadyRegistion_wrapper').addClass("table-scrollable");

			//横线滚动条
			$('#alreadyRegistion_wrapper').on('scroll',function(){
				$('#alreadyRegistion_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		    //每页显示记录数
		    $('#alreadyRegistion_wrapper .dataTables_info').parent().append($('#alreadyRegistion_wrapper .dataTables_length'));
			//得到table对象，后面得到table选中行时会用到
			tableObj = Table;
		}
	}
}();
function lookImg(url){
	$("#imgLook").attr("src",url);
	$(".lookImg").modal("show");
}
var INFOID;
var PROID ;
var KAOQI;
var DEPID;
var UNACTION;
$(document).ready(function(){
	
	 //初始新增咨询量弹框-初始产品模型option
    $.ajax({
        url: ctx + '/consultInfoManage/selectProductModel',
        type: 'POST',
        dataType: 'json',
        success: function (data) { 
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].modelId + " data-value='"+data[i].JsonDetail+"'>" + data[i].modelName + "</option>";
            }
            $("#addProductModel2").html('<option value="">--请选择--</option>' + zxkc);
            $('#addProductModel2').trigger('chosen:updated');
            $("#addProductModel2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
	    $('#alreadyRegistion').on('click', '.ck', function () {
//	    	$(".serviceView").modal("show");
	    	$("#quzhengdiv").hide();
	    	$("#tuifeidiv").hide();
	    	$("#zhuanbandiv").hide();
	    	$("#tuichajiadiv").hide();
	        var infoManageId = $(this).attr('data-record');
	        var productId = $(this).attr('data-record2');
	        var departmentName1 = $(this).attr('data-record3');
	        INFOID=infoManageId;
	        PROID=productId;
	        DEPID=departmentName1;
	        $.post(ctx + '/consultInfoManage/findOneNew',{infoManageId:infoManageId,productId:productId},function(data){
	        	if(data.status=='success'){
	        		$("#sumPrice2").val(data.data.sumPrice)
	        		$("#sPrice").val(data.data.sPrice)
	        		$("#nextPayNum2").val(data.data.nextPayNum)
	        		$('input[name="workSpace"]').val(data.data.workSpace);
	        		$('input[name="phoneAddress"]').val(data.data.phoneAddress);
	        		KAOQI=data.data.kTime;
	        		UNACTION=data.data.unAction;
	        		fillStuBaseInfo(data.data);
	        		if(data.data.unAction==1){
	        			//加载转班进度
	                    $.post(ctx + '/studentServiceCenter/selectFlow',{
	                    	infoManageId:infoManageId,
	                    	productId:productId,
	                    	},
	    	            	function(val2){
	    	                	if(val2.status=='success'){
	    	                		if(val2.type==1){
	    	                			//转班退回
	    	                		}else if(val2.type==2){
	    	                			//转班审批中
	    	                		}else if(val2.type==3){
	    	                			//转班完成
	    	                		}
	    	                		$("#zhuanbandiv").show();
	    	                		if(val2.consultInfoManageBlankReturnId !=null){
	    	                			//退差价进度
	    	            				$("#tuichajiadiv").show();
	    	            			}
	    	                	}else{
	    	                		swal("", "转班进度加载失败！", "error");
	    	                	}
	                    },"json");
	        		}
	        		if(data.data.unAction==3||data.data.unAction==6||data.data.unAction==7){
	        			//加载退费进度
	                    $.post(ctx + '/studentServiceCenter/selectReturnFlow',{
	                    	infoManageId:infoManageId,
	                    	productId:productId,
	                    	},
	    	            	function(val2){
	    	                	if(val2.status=='success'){
	    	                		var str='';
	    	                		var flows=val2.flow;
	    	                		var nowFlow=val2.nowFlow;
	    	                		var flag=true;
	    	                		$.each(flows,function(index,flow){
	    	                			if(nowFlow!=null && flow.examFlowBasicsId==nowFlow.parent_id){
	    	                				flag=false;
	    	                			}
	    	                			if(flag){
	    	                				str+='<span class="label plan-btn plan-hover" style="padding:10px;background:green;position:relative">';
	    	                				str+=flow.fullName;
	    	                				str+='<div class="hover-show" style="position:absolute;top:-90px;left:0;display:none">'
	                                            +'<div class="plan-box">'
	                                            var aa=true;
	                                            $.each(flow.examFlowBasics,function(inde,littleFolw){
	                                            	if(nowFlow!=null && littleFolw.examFlowBasicsId==nowFlow.aplliedfor_status){
	                	                				aa=false;
	                	                			}
	                                            	if(aa){
	                                            		str+='<span class="label  plan-btn" style="background:green">';
	                                            		str+=littleFolw.fullName;
	                                        			str+='</span>';
	                                            	}else{
	                                            		str+='<span class="label  plan-btn" style="background:gray">';
	                                            		str+=littleFolw.fullName;
	                                        			str+='</span>';
	                                            	}
	                                    			if(flow.examFlowBasics.length!=(inde+1)){
	                	                				str+='<i class="fa fa-long-arrow-right plan-arrows"></i>';
	                	                			}
	                                            })
	                                        str+=' </div>';
	                                    	str+='</div>';
	    	                				str+='</span>';
	    	                			}else{
	    	                				str+='<span class="label plan-btn plan-hover" style="padding:10px;background:gray;position:relative">';
	    	                				str+=flow.fullName;
	    	                				str+=flow.fullName;
	    	                				str+='<div class="hover-show" style="position:absolute;top:-90px;left:0;display:none">'
	                                            +'<div class="plan-box">'
	                                            
	                                            $.each(flow.examFlowBasics,function(inde,littleFolw){
	                                            	str+='<span class="label label-primary plan-btn style="background:gray"">';
	                                        		str+=littleFolw.fullName;
	                                    			str+='</span>';
	                                    			
	                                    			if(flow.examFlowBasics.length!=(inde+1)){
	                	                				str+='<i class="fa fa-long-arrow-right plan-arrows"></i>';
	                	                			}
	                                            })
	                                        str+=' </div>';
	                                    	str+='</div>';
	    	                				str+='</span>'
	    	                			}
	    	                			if(flows.length!=(index+1)){
	    	                				str+='<i class="fa fa-long-arrow-right plan-arrows"></i>';
	    	                			}
	    	                		})
	    	                		$("#tuifeiFlow").html(str);
	    	                		$("#tuifeidiv").show();
	    	                	}else{
	    	                		swal("", "流程信息加载失败！", "error");
	    	                	}
	                    },"json");
	        		}
	        		$('#addProductModel2').val(data.data.productModelId);
	                $("#addProductModel2").trigger("chosen:updated");
	                $('#addProductModel2').change();
	                
	              //回显 ai字段 和 product
	              //回去tableName
	            	var jsonObj = $('#addProductModel2 :selected').data("value");
	            	//用来组装表名
	            	var tableArray = new Array();
	            	//开始构造最新的拼接结果
	            	for(var i=0; i<jsonObj.length; i++) {
	            		var enName = jsonObj[i].enName;
	            		var chName = jsonObj[i].chName;
	            		tableArray.push(enName);
	            	}
	            	var tableName = tableArray.join("---");
	            	setTimeout(() => {
	            		 $('#addProductId2').html("<option>"+data.data.productName+"</option>");
	                     $('#addProductId2').trigger("chosen:updated");
	                     $('#addProductId2').change();
	                     //product回显
	                     if(tableName!=null && tableName!=""){
	                    	 $.post(ctx+"/bizContract/showAi",
	                     		{"tableNames":tableName,"productId":data.data.productId},
	             	            function(data2){
	             	            	if(data2.status=='success'){
	             	            		for(var i=0; i<jsonObj.length; i++) {
	             	                		var enName = jsonObj[i].enName;
	             	                		var enNameId=enName+"_id";
	             	                		$("#1add"+enName).val(data2[enNameId]);
	             	                		$("#1add"+enName).trigger("chosen:updated");
	             	                	}
	             	            	}else{
	             	            		toastr.error("产品ai字段查询出错");
	             	            	}
	             	            },"json")
	                     }
	    			}, 1000);
	        		//回显考期信息
	        		var local = "<option selected>"+data.data.kTimeValue+"</option>";
					$('#kTime2').html(local);
					if(data.data.kTimeValue==""){
						toastr.error("无考期信息");
					}
	        		$('#kTime2').trigger("chosen:updated");
	                $('#kTime2').change();
	                
	              //加载流程信息
	                $.post(ctx + '/studentServiceCenter/selectFlow',{
	                	infoManageId:infoManageId,
	                	productId:productId,
	                	},
		            	function(val2){
		                	if(val2.status=='success'){
		                		var str='';
		                		var flows=val2.flow;
		                		var nowFlow=val2.nowFlow;
		                		var flag=true;
		                		$.each(flows,function(index,flow){
		                			if(nowFlow!=null && flow.examFlowBasicsId==nowFlow.parent_id){
		                				flag=false;
		                			}
		                			if(flag){
		                				str+='<span class="label plan-btn plan-hover" style="padding:10px;background:green;position:relative">';
		                				str+=flow.fullName;
		                				str+='<div class="hover-show" style="position:absolute;top:-90px;left:0;display:none">'
	                                        +'<div class="plan-box">'
	                                        var aa=true;
	                                        $.each(flow.examFlowBasics,function(inde,littleFolw){
	                                        	if(nowFlow!=null && littleFolw.examFlowBasicsId==nowFlow.aplliedfor_status){
	            	                				aa=false;
	            	                			}
	                                        	if(aa){
	                                        		str+='<span class="label  plan-btn" style="background:green">';
	                                        		str+=littleFolw.fullName;
	                                    			str+='</span>';
	                                        	}else{
	                                        		str+='<span class="label  plan-btn" style="background:gray">';
	                                        		str+=littleFolw.fullName;
	                                    			str+='</span>';
	                                        	}
	                                			if(flow.examFlowBasics.length!=(inde+1)){
	            	                				str+='<i class="fa fa-long-arrow-right plan-arrows"></i>';
	            	                			}
	                                        })
	                                    str+=' </div>';
	                                	str+='</div>';
		                				str+='</span>';
		                			}else{
		                				str+='<span class="label plan-btn plan-hover" style="padding:10px;background:gray;position:relative">';
		                				str+=flow.fullName;
		                				str+=flow.fullName;
		                				str+='<div class="hover-show" style="position:absolute;top:-90px;left:0;display:none">'
	                                        +'<div class="plan-box">'
	                                        
	                                        $.each(flow.examFlowBasics,function(inde,littleFolw){
	                                        	str+='<span class="label label-primary plan-btn style="background:gray"">';
	                                    		str+=littleFolw.fullName;
	                                			str+='</span>';
	                                			
	                                			if(flow.examFlowBasics.length!=(inde+1)){
	            	                				str+='<i class="fa fa-long-arrow-right plan-arrows"></i>';
	            	                			}
	                                        })
	                                    str+=' </div>';
	                                	str+='</div>';
		                				str+='</span>'
		                			}
		                			if(flows.length!=(index+1)){
		                				str+='<i class="fa fa-long-arrow-right plan-arrows"></i>';
		                			}
		                		})
		                		$("#flow").html(str);
		                		
		                		  //进度显示隐藏
		                		
		                		setTimeout(() => {
		                			$('.plan-hover').mouseover(function(){
			                	        $(this).children(".hover-show").css({
			                	            'display':'block'
			                	        })
			                	    })

			                	    $('.plan-hover').mouseout(function(){
			                	        $(this).children(".hover-show").css({
			                	            'display':'none'
			                	        })
			                	    })
								}, 1000);
		                	}else{
		                		swal("", "流程信息加载失败！", "error");
		                	}
	                },"json");
	                
	              //资料管理
	                //先查询所需上传的资料
	                $.post(ctx + '/studentServiceCenter/selectApplyData',{
	                	infoManageId:infoManageId,
	                	productId:productId,
	                	exam:data.data.kTimeValue
	                	},
	                	function(val2){
	                    	if(val2.status=='success'){
	                    		$("#applyDataDiv").html("");
	                    		$.each(val2.data,function(index,obj){
	                    			var str='';
	                    			str+='<div class="server-pic col-sm-4">'
	                					+'<label class="col-sm-6 control-label no-padding-right">'+obj.applyDataName+'</label>'
	                					+'<div class="col-sm-6">'
	                					+'<form method="post" enctype="multipart/form-data">'
	                					+'<div class="img">'
	                					if(obj.applyUrl!=null){
	                						str+='	<img src="'+val2.prevUrl+obj.applyUrl+'"'
	                    					+'		class="server-head" alt="" style="width:100px;height:100px"> '
	                    					+'		<a href="#" onclick=\'lookImg("'+val2.prevUrl+obj.applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a> '
	                    					+'		<a href="'+ctx+'/file/downloadFile?url='+val2.prevUrl+obj.applyUrl+'" class="fa fa-download center-iconr"></a>';
	                					}
	                    			str+='		</div>'
	                    				+'		<input type="hidden" name="infoManageId" value="'+infoManageId+'">'
	                    				+'		<input type="hidden" name="productId" value="'+productId+'">'
	                    				+'		<input type="hidden" name="applyDataId" value="'+obj.applyDataId+'">'
	                    				+'		<input type="hidden" name="exam" value="'+data.data.kTimeValue+'">'
	                					+'		<input type="file" name="aa" style="margin-left:-50px"> <p style="margin-left:-50px">上传资料</p>'
	                						+'	<input type="button" onclick="uploadBut(this)"  value="上传" style="margin-left:-50px">'
	                						+'</form>'
	                					+'</div>'
	                					+'</div>';
	                    			$("#applyDataDiv").append(str);
	                    		})
	                    	}else{
	                    		toastr.error("加载报考资料出错");
	                    	}
	                },"json");
	        	}
	        },'json');
	        
	        //回显收款方信息
			$.post(ctx + '/consultInfoManage/getConsultPayee',{"productId": productId, "infoManageId":infoManageId},function(msg1){
				if(msg1.status=="success") {
					var payeeOption = "";
					if(msg1.data.payee!=null){
						if(msg1.data.payee=='1'){
							payeeOption="<option selected>中和</option>";
						}
						if(msg1.data.payee=='2'){
							payeeOption="<option selected>学慧网</option>";
						}
						if(msg1.data.payee=='4'){
							payeeOption="<option selected>合作方</option>";
						}
					}
					$('#scdata').find('select[name=shoukuanfang]').html(payeeOption);
					$('#scdata2').find('select[name=shoukuanfang]').html(payeeOption);
				}else{
					$('#scdata').find('select[name=shoukuanfang]').html("");
					toastr.error(msg1.msg);
				}
	        });
	        //回显考试地域信息
	        $.post(ctx + '/consultInfoManage/getConsultBranchSchool',{"productId": productId, "infoManageId":infoManageId},function(msg2){
	        	if(msg2.status=="success") {
	        		var local = "<option selected>"+msg2.data.departmentName+"</option>";
					$('.branchSchoolId').html(local);
	        	}else{
	        		$('.branchSchoolId').html("");
	        		toastr.error(msg2.msg);
	        	}
	        });
	        //加载缴费信息
	        $.post(ctx + '/studentServiceCenter/queryPayFees',{
	        	infoManageId:infoManageId,
	        	productId:productId,
	        	},
	        	function(val2){
	            	if(val2.status=='success'){
	            		var str='';
	            		$.each(val2.data,function(index,e){
	            			str+='<tr>';
	            			str+=' <td style="text-align: center;">'+e.payName+'</td>';
	            			str+=' <td style="text-align: center;">'+e.yjValue+'</td>';
	            			str+=' <td style="text-align: center;">'+e.sjValue+'</td>';
	            			
	            			str+=' <td style="text-align: center;">';
	            			str+=e.zhiFu;
	            			str+='</td>';
	            				
	            			str+=' <td style="text-align: center;">'+e.cfValue+'</td>';
	            			str+='</tr>';
	            		});
	            		$("#payMentTableInfoBody").html(str);
	            		$("#payMentTableInfoBody2").html(str);
	            	}
	        },"json");
	      //加载费用支出信息
	        $.post(ctx + '/studentServiceCenter/queryFinanceApply',{
	        	infoManageId:infoManageId,
	        	productId:productId,
	        	},
	        	function(val2){
	            	if(val2.status=='success'){
	            		var str='';
	            		$.each(val2.data,function(index,e){
	            			str+='<tr>';
	            			str+=' <td style="text-align: center;">'+e.signDate+'</td>';
	            			str+=' <td style="text-align: center;">'+e.applyCode+'</td>';
	            			str+=' <td style="text-align: center;">'+e.money+'</td>';
	            			str+=' <td style="text-align: center;">'+e.expendDetail+'</td>';
	            			str+=' <td style="text-align: center;">'+e.payeeName+'</td>';
	            			str+=' <td style="text-align: center;">申请已支出</td>';
	            			str+=' <td style="text-align: center;">'+e.returnCompMoney+'</td>';
	            			str+='</tr>';
	            		});
	            		$("#zhichuTableInfoBody").html(str);
	            	}
	        },"json");
	        
	      //加载成绩信息
	        $.post(ctx + '/studentServiceCenter/selectScore',{
	        	infoManageId:infoManageId,
	        	productId:productId,
	        	},
	        	function(val2){
	            	if(val2.status=='success'){
	            		var str='';
	            		$.each(val2.data,function(index,e){
	            			str+='<tr>';
	            			if(e.testDate==null){
	            				str+=' <td style="text-align: center;">--</td>';
	                			str+=' <td style="text-align: center;">'+e.testSubject+'</td>';
	                			str+=' <td style="text-align: center;">--</td>';	
	            			}else{
	            				str+=' <td style="text-align: center;">'+jsDateFormat(e.testDate)+'</td>';
	                			str+=' <td style="text-align: center;">'+e.testSubject+'</td>';
	                			str+=' <td style="text-align: center;">'+e.testScore+'</td>';
	            			}
	            			str+='</tr>';
	            		});
	            		$("#kaoshiBody").html(str);
	            	}else{
	            		toastr.error("加载成绩信息出错");
	            	}
	        },"json");
	        
	        $('.serviceView #myTab11 li:first').addClass('active').siblings().removeClass('active');
	    });
	    
	  //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
	    $("#addProductModel2").change(function(){
	    	
	    	//得到选中的option的Json信息
	    	var jsonObj = $('#addProductModel2 :selected').data("value");
	    	var showList = $('#addProductModel2 :selected').data("showList");
	    	 
	    	//如果当前模型下没有配置选项
	    	if(jsonObj==null || typeof(jsonObj)=="undefined" || $(jsonObj).length==0) {
	    		//清除上次选择后生成的下拉框
	    		
	        	$(".removeFlag2").parent().parent().remove();
	    		return;
	    	}
	    	//得到产品类型ID
	    	var modelId = $('#addProductModel2 :selected').val();
	    	//清除上次选择后生成的下拉框
	    	$(".removeFlag2").parent().parent().remove();
	    	//用来组装表名
	    	var tableArray = new Array();
	    	//开始构造最新的拼接结果
	    	for(var i=0; i<jsonObj.length; i++) {
	    		var enName = jsonObj[i].enName;
	    		var chName = jsonObj[i].chName;
	    		tableArray.push(enName);
	    		//开始拼接
	    		var str = '<div class="form-group col-md-4 col-sm-6">'
		                + '       <label class="control-label col-sm-5 no-padding-right">'+chName+'</label>'
		                + '       <div class="col-sm-7 no-padding-right">'
		                + '            <select disabled="disabled" id="1add'+enName+'"  data-value="'+enName+'" class="form-control removeFlag2 chosen-select" data-live-search="true">'
		                + '            </select>'
		                + '        </div>'
		                + '</div>';
	    		//将新增的下拉框拼接到产品类型下拉框后面
	    		$("#addProductModel2").parent().parent().after(str);
	    		//根据表名和产品类型，关联product表，开始构造option
	    	}
	    	var tableName = tableArray.join("---");
	    	//不能在循环中使用ajax,变量的传参会存在多线程问题,一次性把参数都传过去
			$.ajax({
		        url: ctx + '/consultInfoManage/selectOptionByTable',
		        type: 'POST',
		        dataType: 'json',
		        data: {"tableName":tableName,"modelId":modelId},
		        success: function (data) {
		            if(data==null || data.length==0) {
		            	return;
		            }
		            for (var i = 0; i < data.length; i++) {
		            	var zxkc = "";
		            	for(var j=0; j<data[i].dataList.length; j++) {
		            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
		            	}
		            	$('#1add'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
		            	//加载下拉框样式
		            	$('#1add'+data[i].tableName).trigger('chosen:updated');
		            	$("#1add"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
		            	$('.chosen-container').width('100%');
		            }
		        },
		        error: function (response) {
		            toastr.error("系统错误");
		        }
		    });
	    });
	    /**
	     * 初始化日志工具
	     * @returns
	     */
	    initServerLogcCommon();
})
function initServerLogcCommon(){
    /**
     * 查看动态记录
     */
    $('#dtjl').click(function(){
        //初始化分校select 
        $.ajax({
            url: ctx + '/serviceLog/load',
            type: 'POST',
            data: {
            		infoManageId: INFOID,
            		productId:PROID,
            		pageNum:1,
            		pageSize:1000
            	},
            dataType: 'json',
            success: function (data) {
            	data  = data.returnObject.aaData;
            	$('#Allofthedynamic').html('');
                if (data.length > 0) {
                	var e = '';
                	var str = '';
                    $(data).each(function (i, item) {
                    	debugger;
                    	e = data[i];
                    	if(e.status==4){
                    		str = jsonyuyue(e);
                    		$('#Allofthedynamic').append(str);
                    	}
                    	if(e.status==5){
                    		str = jsonshangmen(e);
                    		$('#Allofthedynamic').append(str);
                    	}
						if(e.status==20){
							str = jsonhuifang(e);
							$('#Allofthedynamic').append(str);
						}
						if(e.status==21){
							str = jsondianhuahuifang(e);
							$('#Allofthedynamic').append(str);
						} else {
							str = jsonserverinfo(e);
							$('#Allofthedynamic').append(str);
						}
                    });
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
    });

    //动态记录添加
    $('#Dynamicrecord .Confirmtoadd').on('click', function () {
        var ct = $('#Dynamicrecord textarea[name=contentRead]').val();
        var e = {};
        e['content'] = $('#Dynamicrecord textarea[name=contentRead]').val();
        e['createDate'] = getNowFormatDate();
        e['createUserName'] = realName;
        if (!ct) {
            toastr.error('请填写内容');
            return;
        }
        $.ajax({
            type: "POST",
            url: ctx + "/serviceLog/addServerLog",
            data: {
                content: $('#Dynamicrecord textarea[name=contentRead]').val(),
                infoManageId: INFOID,
        			productId:PROID,
                status: '21'
            },
            dataType: 'json',
            success: function (msg) {
                toastr.success('添加成功');
                $('#Allofthedynamic').append(jsondianhuahuifang(e));
                $('#Dynamicrecord textarea[name=contentRead]').val('');
            }
        });
    });
}

//解析预约数据
function jsonyuyue(e){
	e = JSON.parse(e.content);
	var str = '<p  style="color:red; margin-bottom:0;">转预约</p>';
//	return '<div style="border-bottom:1px solid #000; margin-bottom:10px;">'+str+e.subscribeDate+"&nbsp;"+e.createUserName+":"+e.schoolName+'</div>';
	return  str	+ '<table class="table table-bordered table-striped">'
	+   '   <tr>'
	+   '     <td width="20%">'+e.subscribeDate+'</td>'
	+   '    <td width="20%">'+e.createUserName+'</td>'
	+   '     <td width="60%" style="word-wrap:break-word; word-break:break-all;">'+e.schoolName+'</td>'
	+   '   </tr>'
	+   ' </table>'
}
//解析上门数据
function jsonshangmen(e){
	var str = '<p  style="color:red;  margin-bottom:0;">转上门</p>';
//	return '<div style="border-bottom:1px solid #000; margin-bottom:10px;">'+str+e.createDate+"&nbsp;"+e.createUserName+e.content+'</div>';
	return  str	+ '<table class="table table-bordered table-striped">'
	+   '   <tr>'
	+   '     <td width="20%">'+e.createDate+'</td>'
	+   '    <td width="20%">'+e.createUserName+'</td>'
	+   '     <td width="60%" style="word-wrap:break-word; word-break:break-all;">'+e.content+'</td>'
	+   '   </tr>'
	+   ' </table>'
}
//解析回访数据
function jsonhuifang(e){
	var str = '<p  style="color:red;  margin-bottom:0;">回访记录</p>';
//	return '<div style="border-bottom:1px solid #000;  margin-bottom:10px;">'+str+e.createDate+"&nbsp;"+e.createUserName+e.content+'</div>';
	return  str	+ '<table class="table table-bordered table-striped">'
	+   '   <tr>'
	+   '     <td width="20%">'+e.createDate+'</td>'
	+   '    <td width="20%">'+e.createUserName+'</td>'
	+   '     <td width="60%" style="word-wrap:break-word; word-break:break-all;">'+e.content+'</td>'
	+   '   </tr>'
	+   ' </table>'
}
//解析跟进回访数据
function jsondianhuahuifang(e){
	var str = '<p  style="color:red;  margin-bottom:0;">服务记录</p>';
//	return '<div style="border-bottom:1px solid #000;  margin-bottom:10px;">'+str+e.createDate+"&nbsp;"+e.createUserName+'&nbsp;'+e.content+'</div>';
	return  str	+ '<table class="table table-bordered table-striped">'
	+   '   <tr>'
	+   '     <td width="20%">'+e.createDate+'</td>'
	+   '    <td width="20%">'+e.createUserName+'</td>'
	+   '     <td width="60%" style="word-wrap:break-word; word-break:break-all;">'+e.content+'</td>'
	+   '   </tr>'
	+   ' </table>'
}
//解析consult_server表中记录
function jsonserverinfo(e){
	//操作时状态0-回流，1-已创建，2-待沟通，3-已沟通,4-预约,5-上门，6-订座, 7-报名,20-回访记录,
	//21-跟进记录，22-电话，23-qq电话，24-EC会话，25-网站客服会话，26-上门拜访，
	//27-邮件，28-发送短信，29-变更数据，31-初申，32-资源未确认，33-资源确认，34-学员申请退费
	var str = readStatus(e.status);//根据状态得到状态中文名称
	str = '<p  style="color:red;  margin-bottom:0;">'+str+'</p>';
//	return '<div style="border-bottom:1px solid #000; margin-bottom:10px;">'+str+":"+e.createUserName+":"+e.content+'</div>';
	return  str	+ '<table class="table table-bordered table-striped">'
	+   '   <tr>'
	+   '     <td width="40%">'+e.createUserName+'</td>'
	+   '     <td width="60%" style="word-wrap:break-word; word-break:break-all;white-space:normal">'+e.content+'</td>'
	+   '   </tr>'
	+   ' </table>'
}
function readStatus(data){
	 if(data==0){
 		  return "回流";
 	  }else if(data==1){
 		return "已创建";
 	  }else if(data==2){
 		return "待沟通";
 	  }else if(data==3){
 		return "已沟通";
 	  }else if(data==4){
 		return "预约";
 	  }else if(data==5){
 		return "上门";
 	  }else if(data==6){
 		return "订座";
 	  }else if(data==7){
 		return "报名";
 	  }else if(data==20){
 		return "回访记录";
 	  }else if(data==21){
 		return "跟进记录";
 	  }else if(data==22){
 		return "电话";
 	  }else if(data==23){
 		return "qq电话";
 	  }else if(data==24){
 		return "EC会话";
 	  }else if(data==25){
 		return "网站客服会话";
 	  }else if(data==26){
 		return "上门拜访";
 	  }else if(data==27){
 		return "邮件";
 	  }else if(data==28){
 		return "发送短信";
 	  }else if(data==29){
 		return "变更数据";
 	  }else if(data==31){
 		return "初申";
 	  }else if(data==32){
 		return "邮件";
 	  }else if(data==33){
 		return "资源确认";
 	  }else if(data==34){
 		return "学员申请退费";
 	  }
}

function readContent(data){
	try {
		var str = '';
		data =  eval('(' + data + ')');
		for(var key in data){
			if(key.indexOf("Id")!=-1){
				continue;
			}
			str = str + ":" +data[key];
			}
			return str.substring(1,str.length);
	} catch (e) {
		return data;
	}
}
 function fillStuBaseInfo(consultInfo) {
    	$("#studentInfoManageId").val(consultInfo.studentInfoManageId);
    	if (consultInfo.unAction ==1) {
            $('#tabStatus').text('正常');
            roleShow('');
        } else if (consultInfo.unAction ==2) {
            $('#tabStatus').text('休学');
            roleShow('1,3,4,5');
        } else if (consultInfo.unAction ==3) {
            $('#tabStatus').text('退费');
            roleShow('1,2,3,4,5');
        } else if (consultInfo.unAction ==4) {
            $('#tabStatus').text('补考重修');
        } else if (consultInfo.unAction ==11){
            $('#tabStatus').text('已转班');
            roleShow('1,2,3,4,5');
        }else{
        	roleShow('0');
        	$('#tabStatus').text('正常');
        }
        $('#tabStu').text(consultInfo.studentName);
        $('#departmentId1').val(consultInfo.departmentId1);
        $('#scdata').find('input[name=studentName]').val(consultInfo.studentName);
        $('#scdata2').find('input[name=studentName]').val(consultInfo.studentName);
        $('#scdata3').find('input[name=studentName]').val(consultInfo.studentName);
        $('#scdata').find('select[name=studentSex]').val(consultInfo.studentSex);
        $('#scdata2').find('select[name=studentSex]').val(consultInfo.studentSex);
        $('#scdata3').find('select[name=studentSex]').val(consultInfo.studentSex);
        $('#scdata').find('input[name=age]').val(consultInfo.age);
        $('#scdata2').find('input[name=age]').val(consultInfo.age);
        $('#scdata3').find('input[name=age]').val(consultInfo.age);
        if (consultInfo.studentPhone != '' && consultInfo.studentPhone != undefined) {
            $('#studentPhone').val("****" + (consultInfo.studentPhone).substring(consultInfo.studentPhone.length - 4, consultInfo.studentPhone.length));
            $('#scdata2').find('input[name=studentPhone]').val("****" + (consultInfo.studentPhone).substring(consultInfo.studentPhone.length - 4, consultInfo.studentPhone.length));
            $('#scdata3').find('input[name=studentPhone]').val("****" + (consultInfo.studentPhone).substring(consultInfo.studentPhone.length - 4, consultInfo.studentPhone.length));
            $('#studentPhone2').val(consultInfo.studentPhone);
        }
        $('#scdata').find('input[name=email]').val(consultInfo.email);
        $('#scdata2').find('input[name=email]').val(consultInfo.email);
        $('#scdata3').find('input[name=email]').val(consultInfo.email);
        $('#scdata').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
        $('#scdata2').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
        $('#scdata3').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
        $('#scdata').find('input[name=weChat]').val(consultInfo.weChat);
        $('#scdata2').find('input[name=weChat]').val(consultInfo.weChat);
        $('#scdata3').find('input[name=weChat]').val(consultInfo.weChat);
        $('#scdata').find('input[name=tengXun]').val(consultInfo.tengXun);
        $('#scdata2').find('input[name=tengXun]').val(consultInfo.tengXun);
        $('#scdata3').find('input[name=tengXun]').val(consultInfo.tengXun);
        $('#scdata').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
        $('#scdata2').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
        $('#scdata3').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
        $('#scdata').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
        $('#scdata2').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
        $('#scdata3').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
        $('#scdata').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
        $('#scdata2').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
        $('#scdata3').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
    }


		/**
		 * 按钮权限组
		 * @param e
		 * @returns
		 */
		function roleShow(e){
			e = e.split(",");
			$('.roleShow').find('a').attr('disabled',false);
			for(var i=0;i<e.length;i++){
				$('.a'+e[i]).attr('disabled',true);
			}
		}

//填写课程信息
function fillStuCourseInfo(consultInfo) {
	var productModelIdStr = consultInfo.productModelId;
	var productIdStr = consultInfo.productId;
	//回显考期信息
	var ktime = '<option selected>'+consultInfo.kTimeValue+'</option>';
	$('#scdata').find('select[name=kTime]').html(ktime);
	$('#scdata2').find('select[name=kTime]').html(ktime);
	$('#scdata3').find('select[name=kTime]').html(ktime);
	//授课形式
	if(consultInfo.eduFrom!=null){
		var eduFrom = '<option selected>'+consultInfo.eduFrom+'</option>';
		$('#scdata').find('select[name=eduFrom]').html(eduFrom);
		$('#scdata2').find('select[name=eduFrom]').html(eduFrom);
		$('#scdata2').find('select[name=eduFrom]').html(eduFrom);
	}else{
		$('#scdata').find('select[name=eduFrom]').html("");
		$('#scdata2').find('select[name=eduFrom]').html("");
		$('#scdata3').find('select[name=eduFrom]').html("");
	}
	//项目
	if(consultInfo.projectName!=null){
		var projectName = '<option selected>'+consultInfo.projectName+'</option>';
		$('#scdata').find('select[name=projectName]').html(projectName);
		$('#scdata2').find('select[name=projectName]').html(projectName);
		$('#scdata3').find('select[name=projectName]').html(projectName);
	}else{
		$('#scdata').find('select[name=projectName]').html("");
		$('#scdata2').find('select[name=projectName]').html("");
		$('#scdata3').find('select[name=projectName]').html("");
	}
	//级别
	if(consultInfo.projectLevelName!=null){
		var projectLevelName = '<option selected>'+consultInfo.projectLevelName+'</option>';
		$('#scdata').find('select[name=projectLevelName]').html(projectLevelName);
		$('#scdata2').find('select[name=projectLevelName]').html(projectLevelName);
		$('#scdata3').find('select[name=projectLevelName]').html(projectLevelName);
	}else{
		$('#scdata').find('select[name=projectLevelName]').html("");
		$('#scdata2').find('select[name=projectLevelName]').html("");
		$('#scdata3').find('select[name=projectLevelName]').html("");
	}
	//班型
	if(consultInfo.classAttr!=null){
		var classAttr = '<option selected>'+consultInfo.classAttr+'</option>';
		$('#scdata').find('select[name=classAttr]').html(classAttr);
		$('#scdata2').find('select[name=classAttr]').html(classAttr);
		$('#scdata3').find('select[name=classAttr]').html(classAttr);
	}else{
		$('#scdata').find('select[name=classAttr]').html("");
		$('#scdata2').find('select[name=classAttr]').html("");
		$('#scdata3').find('select[name=classAttr]').html("");
	}
	//班号
	if(consultInfo.classId!=null){
		var classId = '<option selected>'+consultInfo.classId+'</option>';
		$('#scdata').find('select[name=classId]').html(classId);
		$('#scdata2').find('select[name=classId]').html(classId);
		$('#scdata3').find('select[name=classId]').html(classId);
	}else{
		$('#scdata').find('select[name=classId]').html("");
		$('#scdata2').find('select[name=classId]').html("");
		$('#scdata3').find('select[name=classId]').html("");
	}
	//考试地域
	if(consultInfo.departmentName3!=null){
		var departmentName3 = '<option selected>'+consultInfo.departmentName3+'</option>';
		$('#scdata').find('select[name=departmentName3]').html(departmentName3);
		$('#scdata2').find('select[name=departmentName3]').html(departmentName3);
		$('#scdata3').find('select[name=departmentName3]').html(departmentName3);
	}else{
		$('#scdata').find('select[name=departmentName3]').html("");
		$('#scdata2').find('select[name=departmentName3]').html("");
		$('#scdata3').find('select[name=departmentName3]').html("");
	}
	//价格
	if(consultInfo.classPrice!=null){
		var classPrice = '<option selected>'+consultInfo.classPrice+'</option>';
		$('#scdata').find('select[name=classPrice]').html(classPrice);
		$('#scdata2').find('select[name=classPrice]').html(classPrice);
	}else{
		$('#scdata').find('select[name=classPrice]').html("");
		$('#scdata2').find('select[name=classPrice]').html("");
	}
	//学籍号
	if(consultInfo.bmcode!=null){
		var bmcode = '<option selected>'+consultInfo.bmcode+'</option>';
		$('#scdata').find('input[name=bmcode]').html(bmcode);
		$('#scdata2').find('input[name=bmcode]').html(bmcode);
		$('#scdata3').find('input[name=bmcode]').html(bmcode);
	}else{
		$('#scdata').find('input[name=bmcode]').html("");
		$('#scdata2').find('input[name=bmcode]').html("");
		$('#scdata3').find('input[name=bmcode]').html("");
	}
}


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
    
    var productId = $("#productId").val();//页面选中产品id
    aoData.push({"name": "productId", "value": productId});
    var examTimeId = $("#examTimeId").val();//页面选中考期id
    aoData.push({"name": "examTimeId", "value": examTimeId});
    var mainStatus = $("#mainStatus").val();//页面选中一级导航id
    aoData.push({"name": "mainStatus", "value": mainStatus});
    var aplliedforStatus = $("#aplliedforStatus").val();//页面选中二级导航id
    aoData.push({"name": "aplliedforStatus", "value": aplliedforStatus});
    
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


function filterTable(){
//	DataTable.init();
	$("#myTab").find("li.active").find("a").trigger("click");
//	$("#myTab").find("ul[id^='flowUl'].active").find("a").trigger("click");
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
	
	$(document).on('change', 'input:checkbox.checkAll', function(){
		if($(this).prop('checked')){
			$('input:checkbox.checkchild').prop('checked', 'checked');
		}else{
			$('input:checkbox.checkchild').prop('checked', '');
		}
	})
	
	
	$('.goback').click(function(){
		var ids = "";
		$('#alreadyRegistion input.info:checkbox:checked').each(function(){
			ids += this.id + ",";
		})
		
		if(ids.length <= 0){
			toastr.error("请至少选择一条记录！");
			return;
		}
		
		ids = ids.substr(0, ids.length-1);
		
		swal({
            title: "确定退回待报考？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
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
	
	
	$('.send').click(function(){
		var ids = "";
		var price = 0;
		var isadmited = true;
		$('#alreadyRegistion input.info:checkbox:checked').each(function(){
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
			$('.partnerExpend').modal('show');
			if(jl==1){
				var partner = '';
				
				$('#alreadyRegistion input.info:checkbox:checked').each(function(){
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
				$('#alreadyRegistion input.info:checkbox:checked').each(function(){
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
		var ids = "";
		$('#alreadyRegistion input.info:checkbox:checked').each(function(){
			ids += this.id + ",";
		});
		ids = ids.substr(0, ids.length-1);
		apply(data,ids);
	});
	
	
	
	$('#alreadyRegistion').on('click', '.view,.phone', function(){
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

    $('#alreadyExam').find('.drop-down .sidebar-menu a').eq(0).addClass('active');

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
        $('.examination,.partnerView,.examView,.absenteeView,.examFee').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.examination,.partnerView,.examView,.absenteeView,.examFee').css('z-index', 1050);
    })
    
    $('.reg').click(function(){
    	var ids = "";
    	var i=0;
		$('#alreadyRegistion input.info:checkbox:checked').each(function(){
			ids = this.id;
			i++;
		});
		if(i>1||i==0){
			toastr.error("当前选择学员数量错误！，只能选择一个");
			return;
		}
		$('.enrollment').modal('show');
		$('#infoId').val(ids);
    });
    $('#regBut').click(function(){
    	var data = {
    		platformLink:$('#platformLink').val(),
    		platformAccount:$('#platformAccount').val(),
    		platformPassword:$('#platformPassword').val(),
    		id:$('#infoId').val()
    	};
    	$.ajax({
            url: ctx + '/examWorkbenchAlearyExam/update',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
            	toastr.success(data.msg);
            }
    	 });
    });
})
//左侧导航栏-查询考期信息
function statistics(){	
	$.ajax({
        url: ctx + '/examWorkbenchExamFlow/productModel',
        type: 'POST',
        async:false,
        dataType: 'json',
//        data: {examSettingId:examSettingId},
        success: function (data) {
        	data = data.list;
	        	for(var i=0; i<data.length; ++i){
	        		var str = '<li ave=0>' +
								'<a class="menu-dropdown"  href="javascript:;" onclick="productModel(\''+data[i].productModelId+'\')" productModelId="'+data[i].productModelId+'"  ><span class="menu-text">'+data[i].productModelName+'</span> <i class="fa pull-right"></i></a>' +
								'<ul class="submenu" productModelId="'+data[i].productModelId+'"></ul>' +
							  '</li>'; 
					$('.zhiye').append(str);
	        	}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
}

function productModel(productModelId){
	$('ul[productModelId='+productModelId+']').html('');
	
	$.ajax({
        url: ctx + '/examWorkbenchExamFlow/product',
        type: 'POST',
        async:false,
        dataType: 'json',
        data: {productModelId:productModelId},
        success: function (data) {
        	data = data.list;
        	for(var i=0; i<data.length; ++i){
    			var str = '<li ave=0>' +
    						'<a class="menu-dropdown"  href="javascript:;" onclick="product(\''+data[i].productId+'\',this)" productId="'+data[i].productId+'"  ><span class="menu-text">'+data[i].productName+'</span> <i class="fa pull-right"></i></a>' +
    						'<ul class="submenu" style="left:45px;" productId="'+data[i].productId+'"></ul>' +
    					  '</li>'; 
    			$('ul[productModelId='+productModelId+']').append(str);
        	}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
}

function product(productId,obj){
	
	$('ul[productId='+productId+']').html('');
	$.ajax({
		url : ctx + '/examWorkbenchExamFlow/getExamTimes',
		type : 'post',
		dataType : 'json',
		data : {productId: productId},
        success: function (data) {
	        	for(var i=0; i<data.length; ++i){
	    			var str = '<li ave=0>' +
	    						'<a class="menu-dropdown"  href="javascript:void(0);" onclick="navigateTo(\''+productId+'\',this)" examTimeId="'+data[i].examSettingId+'" examTimeName="'+data[i].examDate+'" ><span class="menu-text">'+data[i].examDate+'</span> <i class="fa pull-right"></i></a>' +
	    					  '</li>'; 
	    			$('ul[productId='+productId+']').append(str);
	        	}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
	//新增，申请费用弹窗回显选中产品名称
	//得到选中产品名称
	var productName = $(obj).find("span").text();
	//存储页面当前选中产品名称
	$("#productName").val(productName);
	//存储页面选中产品id
	$("#productId").val(productId);
	
}
function navigateTo(productId,obj){
	//新增为页面隐藏域设置当前页面点击选中的考期id和考期名称
	$("#examTimeId").val($(obj).attr("examTimeId"));
	$("#examTimeName").val($(obj).attr("examTimeName"));
	
	$(obj).parent('li').addClass("selected").siblings().removeClass("selected");  
	$('#myTab').html('');
	$.ajax({
        url: ctx + '/examWorkbenchExamFlow/navigateTo',
        type: 'POST',
        async:false,
        dataType: 'json',
        data: {productId:productId},
        success: function (data) {
        	if(data.scode == 10001){
        		 toastr.error(data.msg);
        	}else{
	        	data = data.data;
		        	for(var i=0; i<data.length; ++i){
		        		var str = "";
		        		var skt = "";
		        		if(data[i].parentId == 0){
		        			if(i==0) {
		        				//初始化时默认第一个父节点选中
		        				 str += ' <li class="mainStatus active">'
								      +'<a data-toggle="tab" href="javascript:void(0)" class="mainStatus" id="'+data[i].childId+'" onclick="flowUlChoose(\''+data[i].childId+'\')">'
								      +data[i].fullName
								      +'     </a>'
								      +'</li>'; 
		        				 skt += '<ul class="nav nav-tabs hide" id="flowUl'+data[i].childId+'">'
							      +'</ur>';
		        				//页面储存当前选中主节点
		        				$("#mainStatus").val(data[i].childId);
		        			} else {
		        				str += ' <li class="mainStatus">'
								      +'<a data-toggle="tab" href="javascript:void(0)" class="mainStatus" id="'+data[i].childId+'" onclick="flowUlChoose(\''+data[i].childId+'\')">'
								      +data[i].fullName
								      +'     </a>'
								      +'</li>'; 
		        				skt += '<ul class="nav nav-tabs hide" id="flowUl'+data[i].childId+'">'
							      +'</ur>';
		        			}
			    			$('#myTab').append(str);
			    			$('.tabmy').after(skt);
		        		}
		        	}
		        	for(var i=0; i<data.length; ++i){
		        		if(data[i].parentId != 0){
		        			if(i==0) {
		        				//初始化时默认第一个节点选中
		        				var str = ' <li class="aplliedforStatus active">'
								      +'                  <a data-toggle="tab" href="javascript:void(0)" class="aplliedforStatus" id="'+data[i].childId+'" onclick="loadContent(\''+data[i].childId+'\',\''+data[i].fullName+'\')" >'
								      +data[i].fullName
								      +'     </a>'
								      +'</li>'; 
		        				//页面储存当前选中子节点
		        				$("#aplliedforStatus").val(data[i].childId);
		        			} else {
		        				var str = ' <li class="aplliedforStatus">'
		        					+'                  <a data-toggle="tab" href="javascript:void(0)" class="aplliedforStatus" id="'+data[i].childId+'" onclick="loadContent(\''+data[i].childId+'\',\''+data[i].fullName+'\')" >'
		        					+data[i].fullName
		        					+'     </a>'
		        					+'</li>'; 
		        			}
			    			$('#flowUl'+data[i].parentId).append(str);
		        		}
		        	}
		        	$('ul[id^="flowUl"]:first').show();
		        	filterTable();
        		}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
	
}

function flowUlChoose(childId){
	$('ul[id^="flowUl"]').addClass('hide');
	$('#flowUl'+childId).removeClass('hide');
	//单击一级标签时，如果没有选中二级标签，则
	//默认一级标签下的二级标签中第一个标签选中
	var activeFlag = false;//记录是否有子标签被选中
	$('#flowUl'+childId).find("li").each(function(i,e){
		//判断一级标签下有没有子标签被选中
		if($(e).hasClass('active')) {
			activeFlag = true;
		}
	});
	//更新页面当前选中一级导航
	$("#mainStatus").val(childId);
	
	var tabId = '';//记录被选中子标签的id
	var tabName = '';//记录被选中子标签的
	if(activeFlag) {
		//有子标签被选中
	} else {
		//选中该主状态下的第一个子状态
		$('#flowUl'+childId).find("li").eq(0).addClass('active');
//		//触发第一个子状态的click状态
//		$('#flowUl'+childId).find("li").eq(0).trigger('click');
	}
	tabId = $('#flowUl'+childId).find("li.active").find("a").attr("id");
	tabName = $('#flowUl'+childId).find("li.active").find("a").text().trim();
	//同时查询该子状态下的数据
	loadContent(tabId,tabName);
}

/**
 * 
 * @param 财务申请
 * @returns
 */
function apply(data,ids){
	$.ajax({
       url: ctx + "/examWorkbenchAlearyExam/addApply",
       type: 'POST',
       data: data,
       dataType: "json",
       success: function (data) {
       	if(data.status=='success'){
       		$.ajax({
		        url: ctx + '/waitExam/switchStatus',
		        type: 'POST',
		        dataType: 'json',
		        data: {ids:ids, aplliedforStatus:6},
		        success: function (data) {
		           	toastr.success(data.msg);
		        	if(data.status == "success"){
		        		$('.partnerExpend').modal('hide');
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
       }
	});
}