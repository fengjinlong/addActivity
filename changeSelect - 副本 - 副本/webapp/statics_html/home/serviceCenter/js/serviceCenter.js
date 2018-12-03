var INFOID;
var PROID ;
var KAOQI;
var DEPID;
var UNACTION; 
var PROINFO; 
$(function () {
	//查看折叠按钮
    $(".collapse-btn").click(function () {
        $(this).parent().parent().siblings().slideToggle(400);
    })
    //全选
      $('#stuServiceCenterInfo thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#stuServiceCenterInfo tbody .checkchild').prop('checked', true);
        }else{
            $('#stuServiceCenterInfo tbody .checkchild').prop('checked', false);
        }
    })
    //回车搜索
    $('#searchVal').bind('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	DataTable.init();
        }  
    });
    //搜索日期
    durationDate('.applyDate','到');
    //下次缴费时间
    $(function(){
    	$(".paymentTime").datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            autoclose: true,
            minView:2,
            pickerPosition:'top-right'
        });
    	
    	$('.modal-backdrop').remove();
    })
    
    

    //补费弹窗关闭展开所有费用
  /*  $('.payFees').on('hide.bs.modal', function () {
        $('.payFees .cost-body').each(function(index,ele){
            $(ele).slideDown();
        })
    })*/
    //隐藏优惠码div
    $(".fuwuCodeDiv").hide();
    $('.datetimepicker').on('click',function(){
        $('.payFees').css('z-index', 1055);
        $('.serviceView').css('z-index', 1039);
    })
    //加载表单
    DataTable = function () {
        return {
            init: function () {
                var dutyTable = $('#stuServiceCenterInfo').dataTable({
                    "bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
                    "bLengthChange": true,//每页显示的记录数
                    "bFilter": false, //搜索栏
                    "bSort": false, //是否支持排序功能
                    "bInfo": true, //显示表格信息
                    "bAutoWidth": false,  //自适应宽度
                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                    "sAjaxSource": ctx + '/studentServiceCenter/load',
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
                        {
                            "mData": "infoManageId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" applyId=""></span> </label>';
                            }
                        },
                        {"mData": "baoMinDate", 'sClass': "text-center","mRender": function (data, type, full) {
                        	return full['baoMinDate'];
                        }},
                        {"mData": "unAction", 'sClass': "text-center","mRender": function (data, type, full) {
                        	 if (data ==0) {
                        		 return '正常';
                             } else if (data ==1) {
                            	 return '转班';
                             } else if (data ==2) {
                            	 return '休学';
                             } else if (data ==3) {
                            	 return '退费';
                             } else if (data ==4) {
                            	 return '补考';
                             }else if(data ==5 ){
                            	 return '重修';
                             }else if (data ==6) {
                            	 return '退费中';
                             }else if (data ==7) {
                            	 return '正常（转化）';
                             }else if (data ==8) {
                            	 return '初申';
                             }else if (data ==9) {
                            	 return '已退费';
                             }else if (data ==11){
                            	 return '已转班';
                             }else{
                            	 return '无';
                             }
                        }},
                        {"mData": "departmentName1", 'sClass': "text-center"},
                        {"mData": "studentName", 'sClass': "text-center"},
                        {"mData": "studentSex", 'sClass': "text-center"},
                        {"mData": "idcard", 'sClass': "text-center"},
                        {"mData": "productModelName", 'sClass': "text-center"},
                        {"mData": "productName", 'sClass': "text-center"},
                        {
                            "mData": "infoManageId",
                            'sClass': "text-center",
                            "bSortable": false,
                            "mRender": function (data, type, full) {
                                var u = "<a href='#' data-record='" + full['infoManageId'] + "' data-record2='" + full['productId'] + "' data-record3='" + full['departmentId1'] + "' class='ck' data-toggle='modal' data-target='.serviceView'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
                                var t = "<a href='#' data-record='" + full['studentPhone'] + "' class='ck' data-toggle='modal' data-target='.serviceView'><i class='fa fa-phone success' data-toggle='tooltip' data-placement='top' data-original-title='电话' title='电话'></i></a>";
                                var m = "<a href='#' data-record='" + JSON.stringify(full) + "' class='info' data-toggle='modal' data-target='.information' data-backdrop='static'><i class='fa fa-envelope-o blue' data-toggle='tooltip' data-placement='top' data-original-title='发送短信' title='发送短信'></i></a>";
                                var d = "<a href='#' data-record='" + JSON.stringify(full) + "' class='download' data-toggle='modal' data-target='' data-backdrop='static'><i class='fa fa-download darkorange' data-toggle='tooltip' data-placement='top' data-original-title='下载' title='下载'></i></a>";
                                return u+ t + m + d;
                            }
                        }
                    ],
                    "aoColumnDefs": [{
                        sDefaultContent: '',
                        aTargets: ['_all']
                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(5)', nRow).html(aData.studentSex == '0' ? '男' : '女');
                        return nRow;
                    }
                });
                //每页显示记录数
                $('.dataTables_info').parent().append($('.dataTables_length'));
            }
        }
    }();
    $("#stuServiceCenterInfo tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#stuServiceCenterInfo tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    DataTable.init();
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
    $('#addProductId2').val("");
    $('#addProductId2').trigger("chosen:updated");
    
    
    //查看发送短信下载
    $('#stuServiceCenterInfo').on('click', '.ck', function () {
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
        		PROINFO=data.data.projectInfoManageId;
        		KAOQI=data.data.kTime;
        		UNACTION=data.data.unAction;
        		fillStuBaseInfo(data.data);
        		//回显咨询分校等等
        		$(".turnClass .d1").html(data.data.departmentName1)
        		$(".turnClass .d2").html(data.data.brandName)
        		$(".turnClass .d3").html(data.data.studentAttrName2)
        		$(".turnClass .d4").html(data.data.studentAttrName1)
        		if(data.data.studentMaturity==1){
        			$(".turnClass .d5").html("A")
        		}else if(data.data.studentMaturity==2){
        			$(".turnClass .d5").html("B")
        		}else if(data.data.studentMaturity==3){
        			$(".turnClass .d5").html("C")
        		}else if(data.data.studentMaturity==4){
        			$(".turnClass .d5").html("D")
        		}
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
                                            		str+='<span class="label  plan-btn" style="background:#5e5e5e">';
                                            		str+=littleFolw.fullName;
                                        			str+='</span>';
                                            	}else{
                                            		str+='<span class="label  plan-btn" style="background:#44AA00">';
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
                                            	str+='<span class="label label-primary plan-btn style="background:#44AA00">';
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
            	//setTimeout(() => {
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
    			//}, 1000);
        		//回显考期信息
        		var local = "<option selected>"+data.data.kTimeValue+"</option>";
				$('#kTime2').html(local);
				if(data.data.kTimeValue==""){
					toastr.error("无考期信息");
				}
        		$('#kTime2').trigger("chosen:updated");
                $('#kTime2').change();
                
              //回显收款方信息
                
                var payeeOption = "";
				if(data.data.payee!=null){
					if(data.data.payee=='1'){
						payeeOption="<option selected>中和</option>";
					}
					if(data.data.payee=='2'){
						payeeOption="<option selected>学慧网</option>";
					}
					if(data.data.payee=='4'){
						payeeOption="<option selected>合作方</option>";
					}
				}
				$('#scdata').find('select[name=shoukuanfang]').html(payeeOption);
        		/*$.post(ctx + '/consultInfoManage/getConsultPayee',{"productId": productId, "infoManageId":infoManageId},function(msg1){
        			if(msg1.status=="success") {
        				
        				//$('#scdata2').find('select[name=shoukuanfang]').html(payeeOption);
        			}else{
        				$('#scdata').find('select[name=shoukuanfang]').html("");
        				toastr.error("回显收款方信息失败");
        			}
                });*/
                
                
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
                                        		str+='<span class="label  plan-btn" style="background:#5e5e5e">';
                                        		str+=littleFolw.fullName;
                                    			str+='</span>';
                                        	}else{
                                        		str+='<span class="label  plan-btn" style="background:#44AA00">';
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
                                        	str+='<span class="label label-primary plan-btn style="background:#44AA00">';
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
                    					+'		class="server-head" alt=""> '
                    					+'		<a href="#" onclick=\'lookImg("'+val2.prevUrl+obj.applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a> '
                    					+'		<a href="'+ctx+'/file/downloadFile?url='+val2.prevUrl+obj.applyUrl+'" class="fa fa-download center-iconr"></a>';
                					}
                    			str+='		</div>'
                    				+'		<input type="hidden" name="infoManageId" value="'+infoManageId+'">'
                    				+'		<input type="hidden" name="productId" value="'+productId+'">'
                    				+'		<input type="hidden" name="applyDataId" value="'+obj.applyDataId+'">'
                    				+'		<input type="hidden" name="exam" value="'+data.data.kTimeValue+'">'
                					+'		<input type="file" name="aa" style="margin-left:-40px">上传资料'
                						+'	<input type="button" onclick="uploadBut(this)"  value="上传">'
                						+'</form>'
                					+'</div>'
                					+'</div>';
                    			$("#applyDataDiv").append(str);
                    		})
                    	}else{
                    		toastr.error("加载报考资料出错");
                    	}
                },"json");
        	}else{
        		toastr.error("查询信息失败");
        	}
        },'json');
        
        //回显考试地域信息
        $.post(ctx + '/consultInfoManage/getConsultBranchSchool',{"productId": productId, "infoManageId":infoManageId},function(msg2){
        	if(msg2.status=="success") {
        		var local = "<option selected>"+msg2.data.departmentName+"</option>";
				$('.branchSchoolId').html(local);
        	}else{
        		$('.branchSchoolId').html("");
        		toastr.error("回显考试地域信息失败");
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
        
      //加载考试成绩信息
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
    
  //根据产品的选择，动态查询
    $("#addProductId").change(function(){
    	// 获取selected产品ID
    	var productId = $('#addProductId').val();
    	//var productExamTimeId = $('#productExamTimeId').val();
    	var infoManageId =INFOID;
    	//得到产品信息Json格式
    	var showList = $(this).find("option:selected").attr("showList");
    	if(showList=='' || showList==null || typeof(showList)=='undefined') {
    		//如果没有得到产品信息，清除以前的数据，直接退出方法
    		$("#childrenProduct").parents(".childrenProduct").remove();//清除子产品下拉选
    		//清除考期信息
    		$('#kTime').html('<option value="">--请选择--<option/>');
    		$('#kTime').trigger('chosen:updated');
    		$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    		//清除考试地区
    		$('#payee').html('<option value="">--请选择--<option/>');
    		$('#payee').trigger('chosen:updated');
    		$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
    		//清除收款方
    		$('#branchSchoolId').html('<option value="">--请选择--<option/>');
    		$('#branchSchoolId').trigger('chosen:updated');
    		$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
    		return;
    	}
    	if(showList!=null){
    		showList = JSON.parse(showList);
    		var aiId = null;
    		for(var p in showList){
    			aiId = p.replace("_id","");
    			$('#add'+aiId).val(showList[p]);
    			$('#add'+aiId).trigger('chosen:updated');
    		}
    	}
    	//var projectInfoManageId = $("#projectInfoManageId").val();//得到该咨询量对应产品课程信息id
    	
    	//还原考试地区下拉选
    	$("#branchSchoolId").html('');
    	$('#branchSchoolId').trigger('chosen:updated');
    	$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
    	//得到产品考试地区信息 
    	$.ajax({
    		url : ctx + '/consultConsoleWFC/getBranchSchool',//查询当前选中产品考试地区信息
    		type : 'post',
    		dataType : 'json',
    		data : {productId: productId},
    		success : function(msg){
    			var option = '<option value="">--请选择--<option/>';
    			for(var n=0; n<msg.length; n++) {
					option += "<option value='"+msg[n].branchSchoolId+"'>"+msg[n].fullName+"</option>";
				}
				$("#branchSchoolId").html(option);
				$('#branchSchoolId').trigger('chosen:updated');
				$("#branchSchoolId").chosen({no_results_text: "没有匹配项", search_contains: true});
    		}
    	});
    	//还原收款方下拉选
    	$("#payee").html('');
    	$('#payee').trigger('chosen:updated');
    	$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
    	//得到产品收款方信息 
    	$.ajax({
    		url : ctx + '/consultConsoleWFC/getPayee',//查询当前选中产品考试地区信息
    		type : 'post',
    		dataType : 'json',
    		data : {"productId": productId},
    		success : function(map){
    			var option = '<option value="0">--请选择--<option/>';
    			for(var j=0; j<map.length; j++) {
					option += "<option value='"+map[j].payeeId+"'>"+map[j].payeeName+"</option>";
				}
				$("#payee").html(option);
				$('#payee').trigger('chosen:updated');
				$("#payee").chosen({no_results_text: "没有匹配项", search_contains: true});
    		}
    	});
    	
    	var departmentId = DEPID;//信息量归属地id
    	 
    	//得到产品考期信息 
    	$.ajax({
    		url : ctx + '/consultConsoleRL/getExamTimesEnable',//查询当前时间处于考期起止时间内的信息
    		type : 'post',
    		dataType : 'json',
    		data : {productId: productId, departmentId:departmentId},
    		success : function(info){
    			 
    			if (info == null || info.length == 0){//如果没有考期信息
    				$('#kTime').html('<option value=" ">--请选择--<option/>');
    				$('#kTime').trigger('chosen:updated');
    				$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    				return;
    			}
    			var exm = '';
    			for (var m = 0; m < info.length; m++) {
					exm += "<option value='"+info[m].productExamTimeId+"'>"+info[m].examTime+"</option>";
    			}
    			$('#kTime').html('<option value=" ">--请选择--<option/>'+exm);
    			$('#kTime').trigger('chosen:updated');
    			$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
    			
    			//考期初始化完成后-生成相应的缴费列表
    	         $('#kTime').trigger('change');
    		},
    		error: function (response) {
                toastr.error("不存在考期");
            }
    	})
    	
    	//得到产品优惠信息 
    	$.ajax({
    		url : ctx + '/studentServiceCenter/queryBizActivity',//查询当前时间处于考期起止时间内的信息
    		type : 'post',
    		dataType : 'json',
    		data : {productId: productId},
    		success : function(data){
    			if(data.status=='success'){
    				var str='';
    				$.each(data.data,function(index,obj){
    					str+='		<label> '
    						+'		<input onclick="youhuiFun(this)" class="youhuiCheck" type="checkbox" value="'+obj.activityId+'"  data-record=\''+JSON.stringify(obj)+'\' class="inverted1">'
							+'		<span class="text">'+obj.title+'</span>'
							+'		</label> ';
    				})
    				if(str!=''){
    					$("#bizActive").html(str);
    				}else{
    					$("#bizActive").html('<label><span class="text">无</span></label>')
    				}
    			}else{
    				toastr.error("加载优惠失败");
    			}
    		},
    		error: function (response) {
                toastr.error("加载优惠失败");
            }
    	})
    })
    //根据考试地域 动态追加收费项目
     $("#branchSchoolId").change(function(){
    	 var _this=this;
    	 if($("#kTime").val()==null || $("#kTime").val()==" "){
    		 return ;
    	 }
    	//查询收费
    	 $.ajax({
      		url : ctx + '/studentServiceCenter/queryExpensesType',//查询当前时间处于考期起止时间内的信息
      		type : 'post',
      		dataType : 'json',
      		data : {productExamTimeId: $("#kTime").val(),
      			schoolId: $(_this).val(),
      			expensesType: 2
      		},
      		success : function(data){
      			if(data.status=='success'){
      				var str='';
      				$.each(data.data,function(index,obj){
      					str+='<tr class="zhi">'
							+'<th scope="row" data-payCodeId="'+obj.dataExpensesTypeId+'" data-payCode="'+obj.expensesTypeCode+'">'+obj.dataExpensesTypeName+'</th>'
							+'<td>'+obj.money+'</td>'
							+'<td>'+obj.money+'</td>'
							+'<td><input onkeyup="shijiaoKeyUp(this)"/></td>'
							+'<td>结余</td>'
							+'<td></td>'
							+'</tr>';
      				})
      				if(str!=''){
      					//先清除再追加
      					$.each($("#appendPayBody").find(".zhi"),function(index,obj){
      						$(obj).remove();
      					})
      					$("#appendPayBody").prepend(str);
      					countJieyu();
      				}
      			}else{
      				toastr.error("加载收费项目失败");
      			}
      		},
      		error: function (response) {
                  toastr.error("加载收费项目请求失败");
              }
      	})
     })
    
    
    //考期change事件 查询服务  查询收费项目
     $("#kTime").change(function(){
    	 var productExamTimeId=$(this).val();
    	 if(productExamTimeId==null || productExamTimeId==" "){
    		 return;
    	 }
    	 //查询服务
    	 $.ajax({
     		url : ctx + '/studentServiceCenter/queryService',//查询当前时间处于考期起止时间内的信息
     		type : 'post',
     		dataType : 'json',
     		data : {productExamTimeId: productExamTimeId},
     		success : function(data){
     			if(data.status=='success'){
     				var str='';
     				$.each(data.data,function(index,obj){
     					str+='		<label> ';
     					if(obj.isRequired==1){
     						str+='<input onclick="fuwuFun()" class="fuwuCheck" type="checkbox" checked="checked" disabled="disabled" value="'+obj.productServiceId+'"  data-record=\''+JSON.stringify(obj)+'\' >';
     					}else{
     						str+='<input onclick="fuwuFun()" class="fuwuCheck" type="checkbox" value="'+obj.productServiceId+'"  data-record=\''+JSON.stringify(obj)+'\' >';
     					}
 						str+='		<span class="text">'+obj.productServiceName+'</span>';
 						str+='		</label> ';
     				})
     				if(str!=''){
     					$("#service").html(str);
     				}else{
     					$("#service").html('<label><span class="text">无</span></label>');
     				}
     				fuwuFun();
     			}else{
     				toastr.error("加载服务失败");
     			}
     		},
     		error: function (response) {
                 toastr.error("加载服务失败");
             }
     	});
    	//查询收费
    	 $.ajax({
      		url : ctx + '/studentServiceCenter/queryExpensesType',//查询当前时间处于考期起止时间内的信息
      		type : 'post',
      		dataType : 'json',
      		data : {productExamTimeId: productExamTimeId,
      			schoolId: DEPID,
      			expensesType: 1
      		},
      		success : function(data){
      			if(data.status=='success'){
      				var str='';
      				$.each(data.data,function(index,obj){
      					str+='<tr class="shou">'
							+'<th scope="row" data-payCodeId="'+obj.dataExpensesTypeId+'" data-payCode="'+obj.expensesTypeCode+'">'+obj.dataExpensesTypeName+'</th>'
							+'<td>'+obj.money+'</td>'
							+'<td>'+obj.money+'</td>'
							+'<td><input onkeyup="shijiaoKeyUp(this)"/></td>'
							+'<td>结余</td>'
							+'<td></td>'
							+'</tr>';
      				})
      				if(str!=''){
      					//先清除再追加
      					$.each($("#appendPayBody").find(".shou"),function(index,obj){
      						$(obj).remove();
      					})
      					$("#appendPayBody").prepend(str);
      					countJieyu();
      				}
      			}else{
      				toastr.error("加载收费项目失败");
      			}
      		},
      		error: function (response) {
                  toastr.error("加载收费项目请求失败");
              }
      	})
      	
      	if($("#branchSchoolId").val()!=null && $("#branchSchoolId").val()!="" && $("#branchSchoolId").val()!=''){
      	//查询收费
       	 $.ajax({
         		url : ctx + '/studentServiceCenter/queryExpensesType',//查询当前时间处于考期起止时间内的信息
         		type : 'post',
         		dataType : 'json',
         		data : {productExamTimeId: productExamTimeId,
         			schoolId: $("#branchSchoolId").val(),
         			expensesType: 2
         		},
         		success : function(data){
         			if(data.status=='success'){
         				var str='';
         				$.each(data.data,function(index,obj){
         					str+='<tr class="zhi">'
   							+'<th scope="row" data-payCodeId="'+obj.dataExpensesTypeId+'" data-payCode="'+obj.expensesTypeCode+'">'+obj.dataExpensesTypeName+'</th>'
   							+'<td>'+obj.money+'</td>'
   							+'<td>'+obj.money+'</td>'
   							+'<td><input onkeyup="shijiaoKeyUp(this)"/></td>'
   							+'<td>结余</td>'
   							+'<td></td>'
   							+'</tr>';
         				})
         				if(str!=''){
         					//先清除再追加
         					$.each($("#appendPayBody").find(".zhi"),function(index,obj){
         						$(obj).remove();
         					})
         					$("#appendPayBody").prepend(str);
         					countJieyu();
         				}
         			}else{
         				toastr.error("加载收费项目失败");
         			}
         		},
         		error: function (response) {
                     toastr.error("加载收费项目请求失败");
                 }
         	})
      	}
     })        
    
  //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
    $("#addProductModel").change(function(){
    	//产品模型发生改变，制空产品下拉框
    	clearAddProduct();
    	//得到选中的option的Json信息
    	var jsonObj = $('#addProductModel :selected').data("value");
    	var showList = $('#addProductModel :selected').data("showList");
    	 
    	//如果当前模型下没有配置选项
    	if(jsonObj==null || typeof(jsonObj)=="undefined" || $(jsonObj).length==0) {
    		//清除上次选择后生成的下拉框
        	$(".removeFlag").parent().parent().remove();
    		return;
    	}
    	//得到产品类型ID
    	var modelId = $('#addProductModel :selected').val();
    	//清除上次选择后生成的下拉框
    	$(".removeFlag").parent().parent().remove();
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
	                + '            <select name="'+nameHandler(enName)+'Id" id="add'+enName+'" onchange="clearAddProduct()" data-value="'+enName+'" class="form-control removeFlag chosen-select" data-live-search="true">'
	                + '            </select>'
	                + '			   <input type="hidden" name="'+nameHandler(enName)+'Name" class="projectInfoManager" />'		
	                + '        </div>'
	                + '</div>';
    		//将新增的下拉框拼接到产品类型下拉框后面
    		$("#addProductModel").parent().parent().after(str);
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
	            	$('#add'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
	            	//加载下拉框样式
	            	$('#add'+data[i].tableName).trigger('chosen:updated');
	            	$("#add"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
	            	$('.chosen-container').width('100%');
	            }
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
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
	        async: false,
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
    
  //点击休学按钮
    $('.xiuxue').on('click',function(){
    	$("#xiuxueType").html("是否转为休学状态");
		$("#xiuxueButton").attr("type","2");
    	if(UNACTION==1||UNACTION==3||UNACTION==6||UNACTION==8||UNACTION==9||UNACTION==11){
    		swal("","学员当前状态为"+ $("#tabStatus").text()+",不能操作此项", "error");
    		return ;
    	}else if(UNACTION==2){
    		$("#xiuxueType").html("是否转为正常状态");
    		$("#xiuxueButton").attr("type","0");
    	}
    	$(".quitSchool").modal("show");
    })
    
    //点击退费按钮
    $('.tuifei').on('click',function(){
    	if(UNACTION==1||UNACTION==2||UNACTION==3||UNACTION==6||UNACTION==8||UNACTION==9){
    		swal("","学员正在"+ $("#tabStatus").text()+",不能操作此项", "error");
    		return ;
    	}
    	$("#clone3").html($("#clone1").html());
    	//加载退费原因
    	$.post(ctx + '/studentServiceCenter/queryReturnPayReason',{
		},function(data){
			if(data.status=="success"){
				var str='';
				$.each(data.data,function(index,obj){
					str+='<option value="'+obj.returnPayfeesReasonId+'">'+obj.returnPayfeesReasonName+'</option>'
				})
				$("#returnPayReason").html(str);
			}else{
				swal("", "加载退费原因失败！", "error");
			}
		},"json")
		//加载已支出合作费
    	$.post(ctx + '/studentServiceCenter/querySumApply',{
    		infoManageId:INFOID,
    		productId:PROID
		},function(data){
			if(data.status=="success"){
				if(data.data==null){
					$("#returnForm [name=partnerPayEd]").val(0)
				}else{
					$("#returnForm [name=partnerPayEd]").val(data.data)
				}
			}else{
				swal("", "查询已支出合作费失败！", "error");
			}
		},"json")
    	$(".refund-apply").modal("show");
    })
    
    //修改学生基本信息
    $('.updateStu').on('click',function(){
    	var str=$("#studentForm").serialize();
    	$.post(ctx + '/studentServiceCenter/updateStudentInfoManage',
    		str
		,function(data){
			if(data.status=="success"){
				swal("", "修改成功！", "success");
			}else{
				swal("", "修改失败！", "error");
			}
		},"json")
	})
	
	//转班里点击下一步按钮
	$('.zhuanbanNext').on('click',function(){
		var jieyuVal=$("#jieyuVal").html();
		
		var shijiaoVal=0;
		$.each($("#appendPayBody").find("tr"),function(index,tr){
			var shijiao=$(tr).find("td").eq(2).find("input").val();
			shijiaoVal=Number(shijiao)+Number(shijiaoVal);
		})
		if(Number(shijiaoVal)>Number(jieyuVal)){
			swal("", "实缴综合不能大于结余！", "error");
			return;
		}
		if(Number(shijiaoVal)==Number(jieyuVal)){
			$("#tuichajia").hide();
			$("#tuichajiaType").val("2");
		}
		if(Number(shijiaoVal)<Number(jieyuVal)){
			$("#tuichajia").show();
			$("#tuichajiaType").val("1");
			$(".sss").find("[name='tuichajiaMoney']").val(Number(jieyuVal)-Number(shijiaoVal));
		}
		//申请人
		//$(".sss").find("[name='peploName']").val("admin");
		$(".sss").find("[name='nowTime']").val(jsDateFormat1(Date.parse(new Date())));
		$(".sss").find("[name='kongzhichuMoney']").val(shijiaoVal);
		
		//查常用联系人
		$.post(ctx + '/studentServiceCenter/queryBizFinancePayee',{
    		
		},function(data){
			if(data.status=='success'){
				var str='<option value="" data-record="{}"> 请选择 </option>';
				$.each(data.data,function(index,obj){
					str+='<option value="'+obj.financePayeeId+'" data-record=\''+JSON.stringify(obj)+'\'> '+obj.accountName+' </option>';
				});
				$('select[name="financePayeeId"]').html(str);
				$('select[name="financePayeeId"]').trigger('chosen:updated');
			}else{
				swal("", "查询常用联系人失败！", "error");
			}
		},"json")
		
		//查费用类别  父类
		$.post(ctx + '/bizFinance/loadCostClass',{
			parentId:0
		},function(data){
			var str='<option value="" > 请选择 </option>';
			$.each(data,function(index,obj){
				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
			});
			$('select[name="financeCostclassId1"]').html(str);
		},"json")
		
		
		$(".sss").modal("show");
	})
	//空支出父类change 动态加载子类费用类别
	$('#kongzhichu select[name="financeCostclassId1"]').on('change',function(){
		var _this=this;
		//查费用类别  子类
		$.post(ctx + '/bizFinance/loadCostClass',{
			parentId:$(_this).val()
		},function(data){
			var str='';
			$.each(data,function(index,obj){
				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
			});
			$('#kongzhichu select[name="financeCostclassId2"]').html(str);
		},"json")
	})
	$('#tuichajia select[name="financeCostclassId1"]').on('change',function(){
		var _this=this;
		//查费用类别  子类
		$.post(ctx + '/bizFinance/loadCostClass',{
			parentId:$(_this).val()
		},function(data){
			var str='';
			$.each(data,function(index,obj){
				str+='<option value='+obj.financeCostclassId+'> '+obj.costclassName+' </option>';
			});
			$('#tuichajia select[name="financeCostclassId2"]').html(str);
		},"json")
	})
	
	//常用收款人change 
	$('#kongzhichu select[name="financePayeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#kongzhichu input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#kongzhichu input[name="province"]').val(bizFinancePayee.province);
		$('#kongzhichu input[name="city"]').val(bizFinancePayee.city);
		$('#kongzhichu input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#kongzhichu input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#kongzhichu input[name="phone"]').val(bizFinancePayee.phone);
	})
	$('#tuichajia select[name="financePayeeId"]').on('change',function(){
		var string=$(this).find("option:selected").attr("data-record");
		var bizFinancePayee=JSON.parse(string);
		$('#tuichajia input[name="bankName"]').val(bizFinancePayee.bankName);
		$('#tuichajia input[name="province"]').val(bizFinancePayee.province);
		$('#tuichajia input[name="city"]').val(bizFinancePayee.city);
		$('#tuichajia input[name="accountNum"]').val(bizFinancePayee.accountNum);
		$('#tuichajia input[name="accountName"]').val(bizFinancePayee.accountName);
		$('#tuichajia input[name="phone"]').val(bizFinancePayee.phone);
	})
	
	//点击转班按钮
    $('.zhuanban').on('click',function(){
    	if(UNACTION==1 || UNACTION==2|| UNACTION==11){
    		swal("","学员正在"+ $("#tabStatus").text()+",不能操作此项", "error");
    		return ;
    	}
    	$("#clone2").html($("#clone1").html());
    	//查询old费用信息
    	$.post(ctx + '/studentServiceCenter/queryFeeDeduction',{
    		infoManageId:INFOID,
    		productId:PROID,
		},function(data){
			if(data.status=="success"){
				var str='';
				$.each(data.data,function(index,obj){
					str+='<tr>'
						+'<th scope="row">'+obj.payName+'</th>'
						+'<td>'+obj.yjValue+'</td>'
						+'<td>'+obj.sjValue+'</td>'
						+'<td>'+(obj.zhiChu-obj.returnCompMoney)+'</td>'
						if(data.data.length==(index+1)){
							str+='<td class="koufei"><input type="text" onkeyup="koufeiKeyUp(this)"'
							+'	class="form-control comment_disabled" readonly="readonly" value="0"></td>'
							+'<td id="jieyuVal">'+(obj.sjValue+obj.returnCompMoney-obj.zhiChu)+'</td>';
						}else{
							str+='<td class="koufei"><input type="text" onkeyup="koufeiKeyUp(this)"'
							+'	class="form-control comment_disabled"  value="0"></td>'
							+'<td class="jieyu">'+(obj.sjValue+obj.returnCompMoney-obj.zhiChu)+'</td>';
						}
						+'</tr>';
				})
				$("#zhuanbanOldPay").html(str);
			}else{
				swal("", "查询缴费信息失败！", "error");
			}
		},"json");
    	//新课程信息
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
                $("#addProductModel").html('<option value="">--请选择--</option>' + zxkc);
                $('#addProductModel').trigger('chosen:updated');
                $("#addProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
                $('.chosen-container').width('100%');
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });
        $('#addProductId').val("");
        $('#addProductId').trigger("chosen:updated");
    	$(".turnClass").modal("show");
	})
	
	//点击补考重修按钮
    $('.bukao').on('click',function(){
    	if(UNACTION==1 || UNACTION==2 || UNACTION==3 || UNACTION==4 || UNACTION==5|| UNACTION==6|| UNACTION==8|| UNACTION==9){
    		swal("","学员正在"+ $("#tabStatus").text()+",不能操作此项", "error");
    		return ;
    	}
    	//查询需要缴费的费用名称
    	$.post(ctx + '/studentServiceCenter/queryPayComp',{
    		infoManageId:INFOID,
    		productId:PROID
    	},function(data){
    		if(data.status=='success'){
    			var str='';
    			$.each(data.data,function(index,obj){
    				str+='<div class="cost col-sm-10 col-md-10 col-md-offset-1 no-padding feiyong">'
    					+'	<div class="cost-header clearfix">'
    					+'	<input type="hidden" name="payName" value="'+obj.payName+'">'
    					+'	<input type="hidden" name="payCodeId" value="'+obj.payCodeId+'">'
    					+'	<input type="hidden" name="payCode" value="'+obj.payCode+'">'
    					+'	<input type="hidden" name="isNeIf" value="'+obj.isNeIf+'">'
    					+'		<h5 class="pull-left cost-title">'+obj.payName+'</h5>'
    					+'		<div class="pull-right">'
    					+'			<span class="collapse-btn collapse-btn1"><i class="fa fa-angle-down"></i></span>'
    					+'		</div>'
    					+'	</div>'
    					+'	<div id="bkpx" class="cost-body clearfix feiyongDetail">'
    					+'		<div class="row clear_both form_margin">'
    					+'			<div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">'
    					+'				<select name="payFrom"'
    					+'					class="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 payFrom">'
    					+'					<option value="1">现金</option>'
    					+'					<option value="2">刷卡</option>'
    					+'					<option value="3">支票</option>'
    					+'					<option value="4">汇款-微信</option>'
    					+'					<option value="5">汇款-支付宝</option>'
    					+'					<option value="6">汇款-网络</option>'
    					+'					<option value="7">银行转账</option>'
    					+'					<option value="8">分期</option>'
    					+'				</select>'
    					+'			</div>'
    					+'			<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
    					+'				<input placeholder="0" '
    					+'					name="payValue" class="form-control payValue"'
    					+'					type="number" value="">'
    					+'			</div>'
    					+'			<a href="javascript:void(0);" style="margin-top: 10px"'
    					+'				class="btn btn-info btn-xs add_row" onclick="addRow(this)"'
    					+'				data-index=""><i class="fa fa-plus-circle"></i></a>'
    					+'		</div>'
    					+'	</div>'
    					+'</div>';
    			})
    			$("#feiyongType").html(str);
    			//查看折叠按钮
    		    $(".collapse-btn1").click(function () {
    		        $(this).parent().parent().siblings().slideToggle(400);
    		    });
    		}else{
    			swal("", "查询需要缴费的费用名称失败！", "error");
    		};
    	});
    	//查询考期
		$.post(ctx + '/studentServiceCenter/queryKaoqi',{
    		productId:PROID
    	},function(data){
    		if(data.status=='success'){
    			if(data.data!=null){
    				var str='';
        			$.each(data.data,function(index,obj){
        				str+='<option value="'+obj.examTimeId+'LBL'+obj.examTime+'">'+obj.examTime+'</option>'
        			})
        			$("#kaoqi").html(str);
    			}
    		}else{
    			swal("", "查询考期失败！", "error");
    		};
    	});
    	$(".rebuild").modal("show");
	})
	
	//补考重修change事件
	$("#examAgainType").on('change',function(){
		if($(this).val()==4){
			$("#kaoqiDiv").hide();
		}
		if($(this).val()==5){
			$("#kaoqiDiv").show();
		}
	})
	
	
	//点击补费按钮
	//添加缴费按钮弹出框-报名补费
	$(".add_jiaofei").on('click',function(){
		if(UNACTION==1||UNACTION==2||UNACTION==11){
    		swal("","学员正在"+ $("#tabStatus").text()+",不能操作此项", "error");
    		return ;
    	}
		$("#payInfo").find(".clear_both").remove();//清除上次生成的缴费内容
	    loadBeforePay();
	    $('#jiaofeitrue').removeClass("disabled");
	    $('.bs-example-modal-lg4').find('input').val('');
	    $('.jiaofeil .position_rel').each(function(index,ele){
	    	$(ele).find('.form_margin:not(:last)').remove();
	    })
	    $(".bs-example-modal-lg4").modal("show");
	});
    
    function cooperationModule(){
        return {
            init:function(){
                //详情点击
                $('.xiangqing').on('click',function(){
                	$.post(ctx + '/studentServiceCenter/queryPayDetail',{
                		'infoManageId':INFOID,
                		'productId':PROID
                	},function(data){
                		if(data.status=='success'){
                			var str='';
                    		$.each(data.data,function(index,e){
                    			str+='<tr>';
	                			str+=' <td style="text-align: center;">'+e.createDate+'</td>';
	                			str+=' <td style="text-align: center;">'+e.payName+'</td>';
	                			var type='';
	                			switch(e.payFrom)
								{
									case '1':
										type='现金'
										       
									  break;
									case '2':
										type='刷卡'
									  break;
									case '3':
										type='支票'
									  break;
									case '4':
										type='微信'
									  break;
									case '5':
										type='支付宝'
									  break;
									case '6':
										type='网络'
									  break;
									case '7':
										type= '银行转账'
									  break;
									case '8':
										type= '分期'
									  break;
									default:
										return ''
								}
	                			str+=' <td style="text-align: center;">'+type+'</td>';
	                			str+=' <td style="text-align: center;">'+e.payValue+'</td>';
	                			str+='</tr>';
                    		})
                    		$("#xiangqingTbody").html(str);
                    		$('.module-xiangqing').modal('show');
                		}else{
                			alart("加载详情失败");
                		}
                	},"json");
                })
                return this;
            }
        }
    }
    cooperationModule().init();
    /**
     * 按钮权限组
     * @param e
     * @returns
     */
    /*function roleShow(e){
    	e = e.split(",");
    	$('.roleShow').find('a').attr('disabled',false);
    	for(var i=0;i<e.length;i++){
    		$('.a'+e[i]).attr('disabled',true);
    	}
    }*/

    //填写个人信息
    function fillStuBaseInfo(consultInfo) {
    	$("#studentInfoManageId").val(consultInfo.studentInfoManageId);
    	if (consultInfo.unAction ==0) {
            $('#tabStatus').text('正常');
            //roleShow('');
        } else if (consultInfo.unAction ==1) {
            $('#tabStatus').text('转班');
            //roleShow('1,3,4,5');
        } else if (consultInfo.unAction ==2) {
            $('#tabStatus').text('休学');
            //roleShow('1,2,3,4,5');
        } else if (consultInfo.unAction ==3) {
            $('#tabStatus').text('退费');
        } else if (consultInfo.unAction ==4){
            $('#tabStatus').text('补考');
           // roleShow('1,2,3,4,5');
        }else if (consultInfo.unAction ==5){
            $('#tabStatus').text('重修');
            // roleShow('1,2,3,4,5');
        }else if (consultInfo.unAction ==6){
            $('#tabStatus').text('退费中');
            // roleShow('1,2,3,4,5');
        }else if (consultInfo.unAction ==7){
            $('#tabStatus').text('正常（转化）');
            // roleShow('1,2,3,4,5');
        }else if (consultInfo.unAction ==8){
            $('#tabStatus').text('初申');
            // roleShow('1,2,3,4,5');
        }else if (consultInfo.unAction ==9){
            $('#tabStatus').text('已退费');
            // roleShow('1,2,3,4,5');
        }else if (consultInfo.unAction ==11){
            $('#tabStatus').text('已转班');
            // roleShow('1,2,3,4,5');
        }else{
        	//roleShow('0');
        	$('#tabStatus').text('');
        }
        $('#tabStu').text(consultInfo.studentName);
        $('#departmentId1').val(consultInfo.departmentId1);
        $('#scdata').find('input[name=studentName]').val(consultInfo.studentName);
        $('#scdata').find('select[name=studentSex]').val(consultInfo.studentSex);
        $('#scdata').find('input[name=age]').val(consultInfo.age);
        if (consultInfo.studentPhone != '' && consultInfo.studentPhone != undefined) {
            $('#studentPhone').val(consultInfo.studentPhone);
            $('#studentPhone2').val(consultInfo.studentPhone);
            $('#studentPhone3').val(consultInfo.studentPhone);
        }
        $('#scdata').find('input[name=email]').val(consultInfo.email);
        $('#scdata').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
        $('#scdata').find('input[name=weChat]').val(consultInfo.weChat);
        $('#scdata').find('input[name=tengXun]').val(consultInfo.tengXun);
        $('#scdata').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
        $('#scdata').find('input[name=phoneAddress]').val(consultInfo.phoneAddress);
        $('#scdata').find('input[name=workSpace]').val(consultInfo.workSpace);
        
        $('#scdata2').find('input[name=studentName]').val(consultInfo.studentName);
        $('#scdata2').find('select[name=studentSex]').val(consultInfo.studentSex);
        $('#scdata2').find('input[name=age]').val(consultInfo.age);
        $('#scdata2').find('input[name=email]').val(consultInfo.email);
        $('#scdata2').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
        $('#scdata2').find('input[name=weChat]').val(consultInfo.weChat);
        $('#scdata2').find('input[name=tengXun]').val(consultInfo.tengXun);
        $('#scdata2').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
        $('#scdata2').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
        $('#scdata2').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
        
        $('#scdata3').find('input[name=studentName]').val(consultInfo.studentName);
        $('#scdata3').find('select[name=studentSex]').val(consultInfo.studentSex);
        $('#scdata3').find('input[name=age]').val(consultInfo.age);
        $('#scdata3').find('input[name=email]').val(consultInfo.email);
        $('#scdata3').find('input[name=phoneBelong]').val(consultInfo.phoneBelong);
        $('#scdata3').find('input[name=weChat]').val(consultInfo.weChat);
        $('#scdata3').find('input[name=tengXun]').val(consultInfo.tengXun);
        $('#scdata3').find('input[name=ortherPhone]').val(consultInfo.ortherPhone);
        $('#scdata3').find('input[name=stuPhoneAddress]').val(consultInfo.phoneAddress);
        $('#scdata3').find('input[name=stuWorkSpace]').val(consultInfo.workSpace);
    }

    /**
     * 回调函数
     * @param sSource
     * @param aoData
     * @param fnCallback
     * @returns
     */
    function retrieveData(sSource, aoData, fnCallback, oSettings) {
        var searchVal = $('#searchVal').val();
        if (searchVal && searchVal.length != 0) {
            aoData.push({"name": "keyword", "value": searchVal.trim()});
        }
        var beganAndEnd = $("#queryDate").val();
        if (beganAndEnd && beganAndEnd.length != 0) {
            var minDate = $("#queryDate").val().split("到")[0];
            var maxDate = $("#queryDate").val().split("到")[1];
            aoData.push({"name": "beginTimeString", "value": minDate.trim()+" 00:00:00"});
            aoData.push({"name": "endTimeString", "value": maxDate.trim()+" 23:59:59"});
        }
        aoData.push({
            "name": "pageNum",
            "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)
        });
        aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
        aoData.push({"name": "status", "value": 7});
        aoData.push({"name": "unAction", "value": $('#unAction').val()});
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
     * 初始化日志工具
     * @returns
     */
    initServerLogcCommon();
});
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
        var ct = $('#Dynamicrecord textarea[name=content]').val();
        var e = {};
        e['content'] = $('#Dynamicrecord textarea[name=content]').val();
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
                content: $('#Dynamicrecord textarea[name=content]').val(),
                infoManageId: INFOID,
        			productId:PROID,
                status: '21'
            },
            dataType: 'json',
            success: function (msg) {
                toastr.success('添加成功');
                $('#Allofthedynamic').append(jsondianhuahuifang(e));
                $('#Dynamicrecord textarea[name=content]').val('');
            }
        });
    });
}

//解析预约数据
function jsonyuyue(e){
	e = JSON.parse(e.content);
	var str = '<p  style="color:red; margin-bottom:0;">转预约</p>';
//	return '<div style="border-bottom:1px solid #000; margin-bottom:10px;">'+str+e.subscribeDate+"&nbsp;"+e.createUserName+"&nbsp;"+e.schoolName+'</div>';
	return  str	+ '<table class="table table-bordered table-striped">'
	+   '   <tr>'
	+   '     <td width="20%">'+e.createDate+'</td>'
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
	return  str	+ '<table class="table table-bordered table-striped">'
		+   '   <tr>'
		+   '     <td width="20%">'+e.createDate+'</td>'
		+   '    <td width="20%">'+e.createUserName+'</td>'
		+   '     <td width="60%" style="word-wrap:break-word; word-break:break-all;">'+e.content+'</td>'
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
/**
 * 获取上次欠费记录
 * @returns
 */
function loadBeforePay() {
    var id = INFOID;//咨询ID
    var productExamTimeId =KAOQI;//产品考期ID
    var productId = PROID;//产品id
    $.ajax({
        type: "post",
        url: ctx + "/consultConsoleSignUp/ajaxBeforePay",
        dataType: "json",
        data: {"infoManageId": id, "productExamTimeId":productExamTimeId,"productId":productId },
        success: function (data) {
            if(data.status=="success") {
            	for(var i=0; i<data.list.length; i++) {
            		$("#payInfo").prepend('<div class="clear_both position_rel">'
                            + '<h5 class="xian hide_content"><i class="fa fa-angle-down"></i>'+data.list[i].payName+' 欠费合计:<span style="color: red;" id="pxfp">'+data.list[i].cfValue+'</span></h5>'
                            + '<div class="pull-right">'
                            + '   <input type="hidden" name="payList['+i+'][payCode]" value="'+data.list[i].payCode+'"/>'//用来存储费用编码-payFees表
                            + '   <input type="hidden" name="payList['+i+'][payCodeId]" value="'+data.list[i].payCodeId+'"/>'//用来存储费用编码id-payFees表
                            + '   <input type="hidden" name="payList['+i+'][payName]" value="'+data.list[i].payName+'"/>'//用来存储费用名称-payFees表
                            + '	  <input type="hidden" name="payList['+i+'][isNeIf]" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
                            + '	  <input type="hidden" name="payCompList['+i+'].isNeIf" value="'+data.list[i].expensesType+'"/>'//收入或者支出，1收入，2支出
                            + '	  <input type="hidden" name="payCompList['+i+'].payCodeId" value="'+data.list[i].payCodeId+'"/>'//用来存储费用编码-comp表
                            + '	  <input type="hidden" name="payCompList['+i+'].payCode" value="'+data.list[i].payCode+'"/>'//用来存储费用编码id-comp表
                            + '	  <input type="hidden" name="payCompList['+i+'].sjValue" class="payCompSJ" value="0"/>'//用来存储实缴值-comp表    
                            + '	  <input type="hidden" name="payCompList['+i+'].infoManageId" value="'+id+'"/>'//咨询id-comp表  
                            + '</div>'
                            + '<div class="row clear_both form_margin">'
                            + '    <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                            + '        <select name="payList['+i+'][payFrom]" class="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                            + '            <option value="1">现金</option>'
                            + '            <option value="2">刷卡</option>'
                            + '            <option value="3">支票</option>'
                            + '            <option value="4">汇款-微信</option>'
                            + '            <option value="5">汇款-支付宝</option>'
                            + '            <option value="6">汇款-网络</option>'
                            + '            <option value="7">银行转账</option>'
                            + '        </select>'
                            + '    </div>'
                            + '    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                            + '        <input placeholder="0" onkeyup="bufei(this)" name="payList['+i+'][payValue]" class="form-control payValue" type="number" value="">'
                            + '    </div>'
                            + '    <a href="javascript:void(0);" style="margin-top:10px" class="btn btn-info btn-xs add_row" onclick="addRow(this)" data-index="'+i+'"><i'
                            + '            class="fa fa-plus-circle"></i></a>'
                            + '</div>'
                            + '</div>');
            	}
            	//toastr.success('欠费查询成功');
            } else {
            	toastr.error('欠费查询失败');
            }
        }
    })
}
function addRow(obj) {
	var index = $(obj).data("index");
	var add_content = '<div  class="row clear_both form_margin feiyongDetail">' +
	'<div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
	'<select name="payList['+index+'][payFrom]" class="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 payFrom">' +
	'<option value="1">现金</option>' +
	'<option value="2">刷卡</option>' +
	'<option value="3">支票</option>' +
	'<option value="4">汇款-微信</option>' +
	'<option value="5">汇款-支付宝</option>' +
	'<option value="6">汇款-网络</option>' +
	'<option value="7">银行转账</option>' +
	'<option value="8">分期</option>' +
	'</select>' +
	'</div>' +
	'<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
	'<input class="form-control payValue" onkeyup="bufei(this)" name="payList['+index+'][payValue]" placeholder="0" type="number">' +
	'</div>' +
	'<a href="javascript:void(0);" class="btn btn-info btn-xs minus_row" onclick="minusRow(this)"><i class="fa fa-minus-circle"></i></a>' +
	'</div>';
	$(obj).parent().parent().append(add_content);
}
//删除新增信息
function minusRow(obj) {
	$(obj).parent().remove();
}
//提交报名补费信息（确定按钮触发此事件）
function addjiaofei(e) {
	var yjValue = $("#sumPrice2").val();//应缴费
    var oldSPrice = $('#sPrice').val();//得到之前的实缴费
    var sPrice = oldSPrice;//存储补费后，现在的实缴费金额
    $("#payInfo").find("input.payValue").each(function(index, obj){
    	var payValue = $(obj).val();
    	sPrice = Number(sPrice)+Number(payValue);//循环遍历补费表单下所有输入的金额的和
    });
	var appendNextPayTime = $('#appendNextPayTime').val();
	//如果没有补齐费用，需要填写下次缴费时间
	if(yjValue-sPrice>0) {
		if(appendNextPayTime==null||appendNextPayTime==''){
			toastr.error("如果没有补齐费用，需要填写下次缴费时间");
			return ;
		}
	}
	$('#jiaofeitrue').attr("disabled","disabled");//使缴费确定按钮失效,防止多次提交
    var infoManageId =INFOID;//咨询ID
    var productId = PROID;
    var projectInfoManageId=PROINFO;
    var nextPayNum = $("#nextPayNum2").val();//下次缴费期次
    
    var options = $("#payInfo").serialize();//得到payCode,payForm,payValue信息
    options += "&infoManageId="+infoManageId+"&sPrice="+sPrice+"&nextPayTime="
    +appendNextPayTime+"&nextPayNum="+nextPayNum+"&productId="+productId+"&projectInfoManageId="+projectInfoManageId;
    $.ajax({
        type: "post",
        url: ctx + "/consultConsoleSignUp/addPayRecord",
        dataType: 'json',
        data: options,
        success: function (data) {
            if (data.status == 'success') {
                toastr.success(data.msg);
                $('.bs-example-modal-lg1').modal('hide');
                $('.bs-example-modal-lg4').modal('hide');
                $('.bs-example-modal-lga').modal('hide');
                $('.jiaofeil').modal('hide');
                $('#jiaofeitrue').removeClass("disabled");
            } else {
                toastr.error(data.msg);
                $('#jiaofeitrue').removeClass("disabled");
            }
        }
    });
}
//报名-补费
function bufei(e) {
	//input-div-div.row-div.clear_both
    var cf = $(e).parent().parent().parent().find('h5').find('span').text();//应缴
    if(cf!=null && cf!=''){
    	var obj = $(e).parent().parent().parent().find('input.payValue');//金额输入框对象
        var sum = 0;//
        for (var i = 0; i < obj.length; i++) {//统计当前缴费类型下支付金额总和
            sum = eval(sum) + eval(isNull(obj[i].value));
        }
        if (sum > cf) {//如果支付方式总和大于实际欠费
            $(e).val(null);//当前输入框输入金额不合法，制空//form表单value为null的也不会提交
        } else {
        	//统计汇总当前缴费类型下的实缴金额
        	$(e).parent().parent().parent().find('input.payCompSJ').val(sum);//更新当前缴费类型实缴金额
        }
    }
}
//判断金额是否为空，是控制返回0
function isNull(val) {
    if (val == "") {//非空
        return 0;
    } else if(val) {//非空
        return val;
    } else {
    	return 0;
    }
}


//休学确定
function xiuxue(){
	$.ajax({
        type: "post",
        url: ctx + "/studentServiceCenter/updateType",
        dataType: 'json',
        data: {infoManageId:INFOID,productId:PROID,unAction:$("#xiuxueButton").attr("type")},
        success: function (data) {
            if (data.status == 'success') {
            	$('.quitSchool').fadeIn(100).modal('hide');
            	$('.serviceView').fadeIn(100).modal('hide');
            	DataTable.init();
                toastr.success("操作成功");
            } else {
                toastr.error("操作失败");
            }
        }
    });
}

//补考重修确定
function addbk(){
	var bukaoVo={};
	bukaoVo['infoManageId']=INFOID;
	bukaoVo['productId']=PROID;
	var type=$("#bukaoForm select[name='examAgainType']").val();
	bukaoVo['type']=type;
	if(type==5){
		bukaoVo['kaoqi']=$("#bukaoForm select[name='kaoqi']").val();
	}
	bukaoVo['nextExamDate']=$("#bukaoForm input[name='examAgainDate']").val();
	bukaoVo['nextExamMsg']=$("#bukaoForm [name='rebuildRemark']").val();
	
	var feiyongVos=[];
	$.each($("#feiyongType").find(".feiyong"),function(index,obj){
		var feiyong={};
		feiyong['payName']=$(obj).find('[name="payName"]').val();
		feiyong['payCodeId']=$(obj).find('[name="payCodeId"]').val();
		feiyong['payCode']=$(obj).find('[name="payCode"]').val();
		feiyong['isNeIf']=$(obj).find('[name="isNeIf"]').val();
		var feiyongDetailVos=[];
		$.each($(obj).find(".feiyongDetail"),function(ind,obj2){
			var feiyongDetail={};
			feiyongDetail['payFrom']=$(obj2).find(".payFrom").val();
			feiyongDetail['payValue']=$(obj2).find(".payValue").val();
			feiyongDetailVos.push(feiyongDetail);
		})
		feiyong['feiyongDetailVos']=feiyongDetailVos;
		feiyongVos.push(feiyong);
	})
	bukaoVo['feiyongVos']=feiyongVos;
	
	
	//console.log(bukaoVo)
	$.ajax({
	    url: ctx + "/studentServiceCenter/addBukao",
	    type:'post',
	    dataType:'json',
	    contentType:"application/json",
	    data:JSON.stringify(bukaoVo),
	    success:function(data){
	    	if (data.status == 'success') {
            	$('.rebuild').modal('hide');
                toastr.success("操作成功");
            } else {
                toastr.error("操作失败");
            }
	    }
	});
}
//退费确定
function addReturn(){
	var obj=$("#returnForm").serialize();
	obj+='&infoManageId='+INFOID;
	obj+='&productId='+PROID;
	$.ajax({
	    url: ctx + "/studentServiceCenter/addReturnPay",
	    type:'post',
	    data:obj,
	    success:function(data){
	    	if (data.status == 'success') {
            	$('.refund-apply').modal('hide');
                toastr.success("操作成功");
            } else {
                toastr.error("操作失败");
            }
	    }
	});
}
//扣费keyUP
function koufeiKeyUp(obj){
	//本行的变化
	var koufei=$(obj).val();
	var zhichu=$(obj).parent().prev().html();
	var shijiao=$(obj).parent().prev().prev().html();
	$(obj).parent().next().html(shijiao-zhichu-koufei);
	
	//合计的变化
	var totalKoufei=0;
	var totalJieyu=0;
	$.each($("#zhuanbanOldPay").find("tr"),function(index,tr){
		if($("#zhuanbanOldPay").find("tr").length!=(index+1)){
			var koufei=$(tr).find("td").eq(3).find("input").val();
			var jieyu=$(tr).find("td").eq(4).html();
			totalKoufei=Number(totalKoufei)+Number(koufei);
			totalJieyu=Number(totalJieyu)+Number(jieyu);
		}
	})
	$("#zhuanbanOldPay").find("tr:last").find("td").eq(3).find("input").val(totalKoufei);
	$("#zhuanbanOldPay").find("tr:last").find("td").eq(4).html(totalJieyu);
}

//退差价点击确定
function tuichajia(){
	//获取数据
	//扣费信息
	var zhuanBanVo={};
	zhuanBanVo["infoManageId"]=INFOID;
	zhuanBanVo["productId"]=PROID;
	var consultInfoManageFeeDeductions=[];
	$.each($("#zhuanbanOldPay").find("tr"),function(index,tr){
		if($("#zhuanbanOldPay").find("tr").length!=(index+1)){
			var consultInfoManageFeeDeduction={};
			consultInfoManageFeeDeduction["payName"]=$(tr).find("th").html();
			consultInfoManageFeeDeduction["yjValue"]=$(tr).find("td").eq(0).html();
			consultInfoManageFeeDeduction["sjValue"]=$(tr).find("td").eq(1).html();
			consultInfoManageFeeDeduction["zcValue"]=$(tr).find("td").eq(2).html();
			consultInfoManageFeeDeduction["kfValue"]=$(tr).find("td").eq(3).find("input").val();
			consultInfoManageFeeDeduction["jyValue"]=$(tr).find("td").eq(4).html();
			consultInfoManageFeeDeductions.push(consultInfoManageFeeDeduction);
		}
	})
	zhuanBanVo["consultInfoManageFeeDeductions"]=consultInfoManageFeeDeductions;
	//新课程信息
	var consultInfoManageNewCourse={};
	consultInfoManageNewCourse["newProductModalId"]=$("#addProductModel").val();
	consultInfoManageNewCourse["newProductId"]=$("#addProductId").val();
	consultInfoManageNewCourse["newProductExamTimeId"]=$("#kTime").val();
	consultInfoManageNewCourse["newBranchSchoolId"]=$("#branchSchoolId").val();
	consultInfoManageNewCourse["newPayeeId"]=$("#payee").val();
	var youhuima=[];
	$.each($(".youhuiCheck"),function(index,obj){
		if($(obj).is(":checked")){
			youhuima.push($(obj).val());
		}
	})
	consultInfoManageNewCourse["activityIds"]=youhuima.join(",");
	if($("#fuwuCode").val()!=""){
		consultInfoManageNewCourse["activityCode"]=$("#fuwuCode").val();
		consultInfoManageNewCourse["activityCodeMoney"]=$("#fuwuCodeMoney").val();
	}
	var fuwu=[];
	$.each($(".fuwuCheck"),function(index,obj){
		if($(obj).is(":checked")){
			fuwu.push($(obj).val());
		}
	})
	consultInfoManageNewCourse["serviceIds"]=fuwu.join(",");
	zhuanBanVo["consultInfoManageNewCourse"]=consultInfoManageNewCourse;
	//课程缴费信息
	var consultInfoManageNewFees=[];
	$.each($("#appendPayBody").find("tr"),function(index,tr){
		var consultInfoManageNewFee={};
		consultInfoManageNewFee["payName"]=$(tr).find("th").html();
		consultInfoManageNewFee["payCodeId"]=$(tr).find("th").attr("data-payCodeId");
		consultInfoManageNewFee["payCode"]=$(tr).find("th").attr("data-payCode");
		consultInfoManageNewFee["yjValue"]=$(tr).find("td").eq(0).html();
		consultInfoManageNewFee["sjyjValue"]=$(tr).find("td").eq(1).html();
		consultInfoManageNewFee["sjValue"]=$(tr).find("td").eq(2).find("input").val();
		consultInfoManageNewFee["qfValue"]=$(tr).find("td").eq(4).html();
		if($(tr).attr("class")=="fuwu"){
			consultInfoManageNewFee["type"]=3;
		}else if($(tr).attr("class")=="zhi"){
			consultInfoManageNewFee["type"]=2;
		}else if($(tr).attr("class")=="shou"){
			consultInfoManageNewFee["type"]=1;
		}
		consultInfoManageNewFees.push(consultInfoManageNewFee);
	})
	zhuanBanVo["consultInfoManageNewFees"]=consultInfoManageNewFees;
	//空支出申请
	var consultInfoManageBlankReturn1={};
	consultInfoManageBlankReturn1["money"]=$("#kongzhichu input[name='kongzhichuMoney']").val();
	consultInfoManageBlankReturn1["parentType"]=$("#kongzhichu select[name='financeCostclassId1']").val();
	consultInfoManageBlankReturn1["childrenType"]=$("#kongzhichu select[name='financeCostclassId2']").val();
	consultInfoManageBlankReturn1["feeDetail"]=$("#kongzhichu [name='feeDetail']").val();
	consultInfoManageBlankReturn1["invoiceTitle"]=$("#kongzhichu [name='invoiceTitle']").val();
	consultInfoManageBlankReturn1["linkman"]=$("#kongzhichu select[name='financePayeeId']").val();
	consultInfoManageBlankReturn1["memo"]=$("#kongzhichu [name='memo']").val();
	zhuanBanVo["consultInfoManageBlankReturn1"]=consultInfoManageBlankReturn1;
	
	//退费申请
	if($("#tuichajiaType").val()==1){
		var consultInfoManageBlankReturn2={};
		consultInfoManageBlankReturn2["money"]=$("#tuichajia input[name='tuichajiaMoney']").val();
		consultInfoManageBlankReturn2["parentType"]=$("#tuichajia select[name='financeCostclassId1']").val();
		consultInfoManageBlankReturn2["childrenType"]=$("#tuichajia select[name='financeCostclassId2']").val();
		consultInfoManageBlankReturn2["feeDetail"]=$("#tuichajia [name='feeDetail']").val();
		consultInfoManageBlankReturn2["invoiceTitle"]=$("#tuichajia [name='invoiceTitle']").val();
		consultInfoManageBlankReturn2["linkman"]=$("#tuichajia select[name='financePayeeId']").val();
		consultInfoManageBlankReturn2["memo"]=$("#tuichajia [name='memo']").val();
		zhuanBanVo["consultInfoManageBlankReturn2"]=consultInfoManageBlankReturn2;
	}
	//发送请求
	$.ajax({
         type: "POST",
         url: ctx + '/studentServiceCenter/addNewCourse',
         data: JSON.stringify(zhuanBanVo),
         dataType: 'json',
         contentType: 'application/json;charset=utf-8', //设置请求头信息
         success: function (data) {
             if (data.status == "success") {
            	swal("", "操作成功", "success");
        		$(".sss").modal("hide");
        		$(".turnClass").modal("hide");
             } else {
                 toastr.error("转班出错");
             }
         },
         error: function (msg) {
             toastr.error("系统错误");
         }
     });
}

//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}

//当产品部分的下拉框发生改变时，需要制空产品下拉框——新增咨询量页面部分
function clearAddProduct() {
	$("#addProductId").html("");//清空原来addproduct生成的option
	generateAddProduct();//开始根据课程信息部分当前选中条件生成产品选项
	$("#addProductId").trigger('chosen:updated');
	$("#addProductId").chosen({no_results_text: "没有匹配项", search_contains: true});
	$('.chosen-container').width('100%');
	// 
	//2017/11/20添加，清空考期下拉选旧数据;
	$('#kTime').html('');
	$('#kTime').trigger('chosen:updated');
	$("#kTime").chosen({no_results_text: "没有匹配项", search_contains: true});
}

//课程信息部分每次下拉框发生改变时调用此方法-用来实时生成相应产品
function generateAddProduct() {
	//存放条件
	var conditionArray = new Array();
	$(".counselCurriculum select :selected").each(function(index,obj){
		//得到option的value即id值
		var idValue = $(obj).val();
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			var primaryIdName = $(obj).parent().data("value")+"_id";
			var primaryIdValue = "'"+idValue+"'";
			//形如XXX_id = 'YYY'
			var condition = primaryIdName + "=" + primaryIdValue;
			conditionArray.push(condition);
		}
	});
	/*var condition = "department_id=" +"'"+ DEPID+"'";
	conditionArray.push(condition);*/
	var conditions = conditionArray.join(" and ");
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions,"departmentId":DEPID},
	      dataType: 'json',
	      success: function (data) {
	          if (data.status == "success") {
	             var str = "";
          	 for(var i=0; i<data.data.length; i++) {
          		 str += "<option showList=" +JSON.stringify(data.data[i])+ " value=" + data.data[i].product_id + ">" + data.data[i].product_name + "</option>";
          	 }
          	 $("#addProductId").html('<option value="">--请选择--</option>' + str);
          	 //加载下拉框样式
          	 $("#addProductId").trigger('chosen:updated');
          	 $("#addProductId").chosen({no_results_text: "没有匹配项", search_contains: true});
          	 $('.chosen-container').width('100%');
	          } else {
	              toastr.error(data.msg);//没有符合条件的产品
	          }
	      }
	  });
}


//将从后台得到的表名进行处理得到符合bean中字段格式的字符串，1.剔除_,2.后面的首字母大写
function nameHandler(str) {
  var array = str.toLowerCase().split("_");
  //如果表名为单个单词，即没有_，就返回自身
  if(array.length>1) {
	  //循环从1开始，因为第一个单词不需要进行首字母大写处理
	  for (var i = 1; i < array.length; i++){
		  //每个单词，首字母大写处理
		  array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
	  }
	  var string = array.join("");
	  return string;
  } else {
	  return str;
  }
}
//遍历选中的服务加到费用里
function fuwuFun(){
	//先移除再追加
	$.each($("#appendPayBody").find(".fuwu"),function(index,obj){
		$(obj).remove();
	})
	var str='';
	$.each($(".fuwuCheck"),function(index,obj){
		if($(obj).is(":checked")){
			var fuwu=JSON.parse($(obj).attr("data-record"));
			str+='<tr class="fuwu">'
				+'<th scope="row" data-payCodeId="'+fuwu.dataExpensesTypeId+'" data-payCode="'+obj.expensesTypeCode+'">'+fuwu.expensesTypeName+'</th>'
				+'<td>'+fuwu.money+'</td>'
				+'<td>'+fuwu.money+'</td>'
				+'<td><input onkeyup="shijiaoKeyUp(this)" value="0" /></td>'
				+'<td>结余</td>'
				+'<td>'+fuwu.money+'</td>'
				+'</tr>';
		}
	})
	$("#appendPayBody").append(str);
}

//点击优惠
function youhuiFun(val){
	//debugger
	if($(val).is(":checked")){//说明是点击选中
		var youhui=JSON.parse($(val).attr("data-record"));
		if($(".youhuiCheck:checked").length==1){//只选中一个优惠
			youhuiCheck(youhui);
			return ;
		}else{//选中的第二个以后的优惠
			if(youhui.isMulti==0){//不可叠加
				toastr.error("和所选中的项目不可叠加");
				$(val).attr("checked", false);
				return ;
			}
		}
		$.each($(".youhuiCheck"),function(index,obj){
			if($(obj).is(":checked")){
				var youhui2=JSON.parse($(obj).attr("data-record"));
				if(youhui2.isMulti==0){//有不可叠加项
					$(val).attr("checked", false);
					toastr.error("和所选中的项目不可叠加");
					return ;
				}
			}
		})
		youhuiCheck(youhui);
	}else{//说明是取消选中
		var youhui=JSON.parse($(val).attr("data-record"));
		if(youhui.type==1){//取消优惠码
			$(".fuwuCodeDiv").hide();
			$("fuwuCode").val("");
			$("fuwuCode").attr("readOnly", false);
			var money=$("#fuwuCodeMoney").val();
			if(money!=""){
				var td=$("#appendPayBody").find("tr").eq(0).find("td").eq(1);
				$(td).html(Number($(td).html)+Number(money));
			}
		}else if(youhui.type==2){//取消折扣
			var discount=Number(1)-Number(youhui.discount);
			$.each($("#appendPayBody").find("tr"),function(index,tr){
				var dataExpensesTypeId=$(tr).find("th").attr("data-payCodeId");
				var ids=youhui.epId;
				if(ids!=null){
					$.each(ids.split(","),function(index,id){
						if(dataExpensesTypeId==id){
							//使用折扣
							var money1=$(tr).find("td").eq(0).html();
							var money2=$(tr).find("td").eq(1).html();
							var disconutMoney=Number(money1)*Number(discount);
							$(tr).find("td").eq(1).html(Number(money2)+Number(disconutMoney));
							var inp=$(tr).find("td").eq(2).find("input");
							shijiaoKeyUp(inp);
						}
					})
				}
			})
		}
	}
}
//优惠的触发
function youhuiCheck(obj){
	if(obj.type==1){//优惠码
		$(".fuwuCodeDiv").show();
	}else if(obj.type==2){//折扣
		var discount=Number(1)-Number(obj.discount);
		$.each($("#appendPayBody").find("tr"),function(index,tr){
			var dataExpensesTypeId=$(tr).find("th").attr("data-payCodeId");
			var ids=obj.epId;
			if(ids!=null){
				$.each(ids.split(","),function(index,id){
					if(dataExpensesTypeId==id){
						//使用折扣
						var money1=$(tr).find("td").eq(0).html();
						var money2=$(tr).find("td").eq(1).html();
						var disconutMoney=Number(money1)*Number(discount);
						$(tr).find("td").eq(1).html(Number(money2)-Number(disconutMoney));
						var inp=$(tr).find("td").eq(2).find("input");
						shijiaoKeyUp(inp);
					}
				})
			}
		})
	}
}
//优惠码点击确认
function fuwuCodeSub(){
	if(document.getElementById("fuwuCode").readOnly=="true"){
		return ;
	}
	//查询优惠码
	$.post(ctx + '/studentServiceCenter/selectActivityCode',{
		code:$("#fuwuCode").val(),
		dept:DEPID
	},function(data){
		if(data.data==null){
			toastr.error("无此优惠码");
			return ;
		}else{
			if(data.data.useStatus==1){
				toastr.error("优惠码已经使用");
				return ;
			}else{
				var limi=$("#appendPayBody").find("tr").eq(0).find("td").eq(0).html();
				if(data.data.limit1>limi){
					toastr.error("应缴金额没有超过优惠码下限金额");
					return ;
				}
				var money=data.data.amount;
				$("#fuwuCodeMoney").val(money);
				var td=$("#appendPayBody").find("tr").eq(0).find("td").eq(1);
				$("#fuwuCode").attr("readOnly", true);
				$(td).html(Number($(td).html)-Number(money));
				toastr.success("优惠码使用成功");
			}
		}
	},"json")
}

//结余自动填充
function countJieyu(){
	var jieyuVal=$("#jieyuVal").html();
	$.each($("#appendPayBody").find("tr"),function(index,tr){
		var shiji=$(tr).find("td").eq(1).html();
		if(Number(shiji)>Number(jieyuVal) || Number(shiji)==Number(jieyuVal)){
			$(tr).find("td").eq(2).find("input").val(jieyuVal);
			var qianfei=Number(shiji)-Number(jieyuVal)
			$(tr).find("td").eq(4).html(qianfei);
			jieyuVal=0;
		}else{
			$(tr).find("td").eq(2).find("input").val(shiji);
			$(tr).find("td").eq(4).html("0")
			jieyuVal=Number(jieyuVal)-Number(shiji);
		}
	})
}

//扣费keyUP
function shijiaoKeyUp(obj){
	//本行的变化
	var shijiao=$(obj).val();
	var shiji=$(obj).parent().prev().html();
	$(obj).parent().next().next().html(shiji-shijiao);
}

//文件上传
function uploadBut(obj){
	if($(obj).prev().val()==''){
		toastr.error("请选择文件");
		return ;
	}
 	$(obj).parent().ajaxSubmit({
 		type : 'post',
 		url :  ctx +"/studentServiceCenter/addApplyData",
 		//data:  //注意只要是写在表单里面的，都不需要加这个属性。在controller中可以根据@RequestParam String str获取到属性值。    
 		contentType : "application/x-www-form-urlencoded; charset=utf-8",
 		success: function(data) {
 			if(data.error==0){
 				toastr.success("上传成功");
 				var str='';
 				str+='<img'
				+' src="'+data.prevUrl+data.url+'"'
				+'	class="server-head" alt=""> '
				+'	<a href="#" onclick=\'lookImg("'+data.prevUrl+obj.applyUrl+'")\' class="fa fa-eye center-iconl amplification"></a> '
 				+'	<a href="'+ctx+'/file/downloadFile?url='+data.prevUrl+obj.applyUrl+'" class="fa fa-download center-iconr"></a>';
 				$(obj).parent().find(".img").html(str);
 			}else{
 				toastr.error(data.message);
 			}
 		},
 		error: function (data)//服务器响应失败处理函数
 		{
 			alert("出错");
 		}  
 	})
}
//预览图片
function lookImg(url){
	$("#imgLook").attr("src",url);
	$(".lookImg").modal("show");
}


/**
 * 时间格式化
 */
function jsDateFormat1(val){
	var date=new Date(parseInt(val)); 
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    month = month < 10 ? ('0' + month) : month;  
    var day = date.getDate();  
    day = day < 10 ? ('0' + day) : day;  
    var hour = date.getHours();  
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var seconde=date.getSeconds();
    seconde = seconde < 10 ? ('0' + seconde) : seconde;
    return year + '-' + month + '-' + day; 
    /* return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde;  */
}


$('.modal-backdrop').remove();