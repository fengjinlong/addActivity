//
$(function() {
	//起止时间
	 $("#queryDate").daterangepicker( {locale : {
		 format: 'YYYY-MM-DD',
		 separator:' 到 ',
		 applyLabel : '确定',
		 cancelLabel : '取消'
	 }});
	var national = [
	                "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
	                "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
	                "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
	                "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
	            ];
	initNations();
	function initNations(){
		var nat  = document.getElementById("nations");
		var opt = document.createElement ('option');
		opt.value = '-1';opt.appendChild (document.createTextNode ('请选择'));
		nat.appendChild (opt);
		for ( var i = 0; i < national.length; i++) {
			var option = document.createElement ('option');
			option.value = i;
			var txt = document.createTextNode (national[i]);
			option.appendChild (txt);
			nat.appendChild (option);
		}
//		$('#nations').trigger('chosen:updated');
//    	$("#nations").chosen({no_results_text: "没有匹配项"});
        $('.chosen-container').width('100%');
	}
	
	 phoneBelong('#editInquiries');
	 function phoneBelong(parentEle) {
			 $(parentEle).find('.attribution .confirm-btn').click(function () {
	             if(chose_get_value(parentEle+' #province') != 0 && chose_get_value(parentEle+' #city') != 0){
	                 $(parentEle).find('.phoneBelong').val(chose_get_text(parentEle+' #province') + chose_get_text(parentEle+' #city'));
	                 $(parentEle).find('.attribution').fadeOut();
	             }
			 });
	        $(parentEle).find('.attribution .cancel-btn').click(function () {
	              $(parentEle).find('.attribution').fadeOut();
	        });
	        
	 }
	 
	    $(".phoneBelong").on({
	        focus: function () {
	            $('.attribution').show();
	        },
	        click: function () {
	            $('.attribution').show();
	        },
	    });
		$('.addInquiries').on('hidden.bs.modal', function () {

			$("#city").val("");
			$("#city").trigger("chosen:updated");
			$("#province").val("");
			$("#province").trigger("chosen:updated");
			$("#departmentId1").val("");
			$("#departmentId1").trigger("chosen:updated");
			$('#inquiries')[0].reset();
			$('#inquiries input:hidden').val('');
			$('#inquiries textarea:hidden').val('');
			editor.html('');
//			$('#inquiries .selectpicker').selectpicker('refresh');
			$('#inquiries').data('bootstrapValidator').resetForm();
		});
		//电话归属地获取值
	    function chose_get_value(select){
	        return $(select).val();
	    }

	    //电话归属地获取选中的文本
	    function chose_get_text(select){
	        return $(select+" option:selected").text();
	    }
	//加载表单
	DataTable = function(){
	 	return {
	 		init: function () {
	 			var dutyTable = $('#illegalInfoTable').dataTable({
	 				"bPaginate": true,  //是否显示分页
//	             	"iDisplayLength": 5,
	             	"bLengthChange": true,//每页显示的记录数
	             	"bFilter": false, //搜索栏
	             	"bSort": true, //是否支持排序功能
	             	"bInfo": true, //显示表格信息
	             	"bAutoWidth": false,  //自适应宽度
	             	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
	             	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
	             	"sAjaxSource" : ctx+'/import/selectAllByWhere',
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
	                        {"mData": "createDate", 'sClass': "text-center"},
	 						{"mData": "departmentName1", 'sClass': "text-center"},
	 						{"mData": "brandName", 'sClass': "text-center"},
	 						{"mData": "studentAttrName2", 'sClass': "text-center"},
	 						{"mData": "studentAttrName1", 'sClass': "text-center"},
	 						{"mData": "studentName", 'sClass': "text-center"},
	 						{"mData": "studentPhone", 'sClass': "text-center"},
	 						{"mData": "projectName", 'sClass': "text-center"},
	 						{"mData": "projectLevelName", 'sClass': "text-center"},
	 						{"mData": "illegalReason", 'sClass': "text-center"},
	 						{
	 			                "mData": "infoManageId",
	 			                'sClass': "text-center",
	 			                "bSortable": false,
	 			                "mRender": function (data, type, full ) {
	 			                	var u = "<a data-record='"+JSON.stringify(full)+"' class='btn btn-warning btn-xs'   data-toggle='modal' data-backdrop='static' data-target='#editInquiries' ><i class='fa fa-folder-open-o' ></i>编辑</a>&nbsp&nbsp";
//	 			                    var e = "<a data-record='"+JSON.stringify(full)+"' class='btn btn-info btn-xs edit' data-toggle='modal' data-backdrop='static' data-target='#editInquiries' ><i class='fa fa-edit'></i>转发</a>&nbsp&nbsp";
//	 			                    var d = "<a data-record='"+full["infoManageId"]+"' class='btn btn-danger btn-xs delete'><i class='fa fa-edit'></i>删除</a>&nbsp&nbsp";
	 			                    return u;
	 			                }
	 			            }

	                 ],
	                 "aoColumnDefs": [{
	 	   	            sDefaultContent: '',
	 	   	            aTargets: ['_all']
	 	   	        }]
	 			});
	 		}
	 	}
	 }();
	 DataTable.init();
	 
	 //编辑 转发  删除
	 $('#illegalInfoTable').on('click','a.btn-xs',function(){
		 var data = $(this).attr('data-record');
		 if($(this).hasClass('btn-warning')){
			 editData(data);
		 }
	 });
	 
	 function editData(data){
		 $('#inquiries')[0].reset();
		 $('.errorInfo').html('');
		 var data = JSON.parse(data);
		 $('#inquiries input[name=infoManageId]').val(data.infoManageId);
		 $('#inquiries input[name=phoneBelong]').val(data.phoneBelong?data.phoneBelong:"");
		 var departments = $('#departmentId1')[0].options;
		 $(departments).each(function(i,item){
			 if($(item).text()==data.departmentName1){
				 $('#departmentId1').val(item.value);
				 return false;
			 }
			 if(i==departments.length-1){
				 $('#departmentId1').parent().find('span').html(data.departmentName1);
			 }
		 });
		 var brandNames =  $('#brandId')[0].options;
		 $(brandNames).each(function(i,item){
			 if($(item).text()==data.brandName){
				 $('#brandId').val(item.value);
				 return false;
			 }
			 if(i==brandNames.length-1){
				 $('#brandId').parent().find('span').html(data.brandName);
			 }
		 });
		 var cosolers = $('#studentAttrId2')[0].options;
		 $(cosolers).each(function(i,item){
			 if($(item).text()==data.studentAttrName2){
				 $('#studentAttrId2').val(item.value);
				 return false;
			 }
			 if(i==cosolers.length-1){
				 $('#studentAttrId2').parent().find('span').html(data.studentAttrName2);
			 }
		 });
		 var medias = $('#studentAttrId1')[0].options;
		 $(medias).each(function(i,item){
			 if($(item).text()==data.studentAttrName1){
				 $('#studentAttrId1').val(item.value);
				 return false;
			 }
			 if(i==medias.length-1){
				 $('#studentAttrId1').parent().find('span').html(data.studentAttrName1);
			 }
		 });
		 $('#keyword').val(data.keyword?data.keyword:"");
		 $('#inquiries input[name=studentName]').val(data.studentName?data.studentName:"");
		 $('#inquiries input[name=studentPhone]').val(data.studentPhone?data.studentPhone:"");
		 $('#inquiries select[name=studentSex]').val(data.studentSex?data.studentSex:"");
		 $('#inquiries input[name=weChat]').val(data.weChat?data.weChat:"");
		 $('#inquiries input[name=age]').val(data.age?data.age:"");
		 $('#inquiries input[name=tengXun]').val(data.tengXun?data.tengXun:"");
		 var projectNames = $('#projectId')[0].options;
		 $(projectNames).each(function(i,item){
			 if($(item).text()==data.projectName){
				 $('#projectId').val(item.value);
				 $('#projectId').change();
				 return false;
			 }
			 if(i==projectNames.length-1){
				 $('#projectId').parent().find('span').html(data.projectName);
			 }
		 });
		 var projectLevelNames = $('#projectLevelId')[0].options;
		 $(projectLevelNames).each(function(i,item){
			 if($(item).text()==data.projectLevelName){
				 $('#projectLevelId').val(item.value);
				 return false;
			 }
			 if(i==projectLevelNames.length-1){
				 $('#projectLevelId').parent().find('span').html(data.projectLevelName);
			 }
		 });
		 var highestEducationNames = $('#highestEducationName')[0].options;
		 $(highestEducationNames).each(function(i,item){
			 if($(item).text()==data.highestEducationName){
				 $('#highestEducationName').val(item.value);
				 return false;
			 }
			 if(i==highestEducationNames.length-1){
				 $('#highestEducationName').parent().find('span').html(data.highestEducationName);
			 }
		 });
		 $("#majorName").val(data.majorName?data.majorName:"");
		 var nations = $('#nations')[0].options;
		 $(nations).each(function(i,item){
			 if($(item).text()==data.nations){
				 $('#nations').val(item.value);
				 return false;
			 }
			 if(i==nations.length-1){
				 $('#nations').parent().find('span').html(data.nations);
			 }
		 });
		 $("#inquiries input[name=graduateInstitutions]").val(data.graduateInstitutions?data.graduateInstitutions:"");
		 $('#inquiries input[name=emergencyContact]').val(data.emergencyContact?data.emergencyContact:"");
		 $('#inquiries input[name=emergencyContactMode]').val(data.emergencyContactMode?data.emergencyContactMode:"");
		 $("#notes").val(data.notes?data.notes:"");
		 editor.html('');
		 editor.html(data.conversation?data.conversation:"");
		 $('#editInquiries').show();
	 }
	 
	 //表单提交
	    $('#inquiries').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {//表单验证
	        	  studentName:{
		            	validators: {
		            		 notEmpty: {
		                         message: '姓名不能为空'
		                     },
		                     regexp: {
		                         regexp: /[\u4e00-\u9fa5]/g,
		                         message: '名称是汉字'
		                     }
		            	}
		            },
		            studentPhone: {
		                validators: {
		                    notEmpty: {
		                        message: '电话不能为空'
		                    }
		                }
		            },
		            age:{
		            	 validators: {
		            		 regexp: {
		                         regexp:  /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
		                         message: '年龄只能为数字'
		                     }
			               }
		            },
		            departmentId1:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择信息归属地',  
		                         callback: function(value,validator){
		                        	 var msg= $("#departmentId1").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(value=='0'){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            brandId:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择招商品牌',  
		                         callback: function(value,validator){
		                        	 var msg= $("#brandId").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            studentAttrId2:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择咨询者类型',  
		                         callback: function(value,validator){
		                        	 var msg= $("#studentAttrId2").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            studentAttrId1:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择媒体来源',  
		                         callback: function(value,validator){
		                        	 var msg= $("#studentAttrId1").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            projectId:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择咨询课程',  
		                         callback: function(value,validator){
		                        	 var msg= $("#projectId").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            projectLevelId:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择课程级别',  
		                         callback: function(value,validator){
		                        	 var msg= $("#projectLevelId").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            highestEducationName:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择学历',  
		                         callback: function(value,validator){
		                        	 var msg= $("#highestEducationName").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            },
		            nations:{
		            	 validators: {
		            		 callback: {  
		                         message: '请选择民族',  
		                         callback: function(value,validator){
		                        	 var msg= $("#nations").parent().find('span').text();
		                        	 if(msg==null||msg.trim()==''){
		                        		 return true;
		                        	 }else{
		                        		if(!value){
		                        			return false;
		                        		}else{
		                        			return true;
		                        		}
		                        	 }
		                          }
		                       }  
			               }
		            }
		            
	        }
	    });
	    $("#inquiries").submit(function(ev){ev.preventDefault();});
	  //防止属性调用callback表单重复提交
	    $('#validateBtn').click(function() { 
	    	var bootstrapValidator= $('#inquiries').data('bootstrapValidator');//bootstrapValidator('validate');
	    	bootstrapValidator.validate();
	    	if(bootstrapValidator.isValid()){
	    		var brandId = $('#brandId :selected').val();
	        	var projectId = $('#projectId :selected').val();
	        	var studentPhone = $('#inquiries :input[name="studentPhone"]').val();;
	        	$.ajax({
	    			url : ctx + '/consultInfoManage/getAllOption',
	    			type: 'POST',
	    			data:{brandId:brandId,projectId:projectId,studentPhone:studentPhone},
	    			dataType: 'json',
	    			async:true,
	    			success: function (data) {
	    				if(data.list.length==0){
	    		        var projectId = $('#projectId :selected').val();
	    		        var departmentId1 = $('#departmentId1 :selected').val();
	    		        var options = $("#inquiries").serialize();
	    		        var departmentName1 = $('#departmentId1 :selected').text();
	    		        var brandName = $('#brandId :selected').text();
	    		        var studentAttrName1 = $('#studentAttrId1 :selected').text();
	    		        var studentAttrName2 = $('#studentAttrId2 :selected').text();
	    		        var projectName = $('#projectId :selected').text();
	    		        var projectLevelName = $('#projectLevelId :selected').text();
	    		        var highestEducation = $('#highestEducationName :selected').text();
	    		        var nation = $('#nations :selected').text();
	    	        	 options += "&departmentName1=" + departmentName1;
	    	             options += "&brandName=" + brandName;
	    	             options += "&studentAttrName1=" + studentAttrName1;
	    	             options += "&studentAttrName2=" + studentAttrName2;
	    	             options += "&projectName=" + projectName;
	    	             options += "&projectLevelName=" + projectLevelName;
	    	             options += "&highestEducation=" + highestEducation;
	    	             options += "&nation=" + nation;
	    	             options += "&status=" + 1;
	    	         	$.ajax({
	    	                type: "POST",
	    	                url:  ctx + '/import/updateRecord',
	    	                data: options,
	    	                dataType: 'json',
	    	                success: function (data) {
	    	                	 if (data.status == "success"){
	    	                		 DataTable.init();
	    	                		 $('.addInquiries').modal('hide');
	    	                	 }else{
	    	                		 toastr.error(data.msg);
	    	                	 }
	    	                },
	    	                error: function (msg) {
	    	                	toastr.error("系统错误");
	    	                }
	    	            });
    				}else{
    					toastr.error("在"+data.list[0].createDate+","+data.list[0].createUserName+"已创建该咨询课程和招生品牌的咨询量，请核对后输入！");
    					return;
    				}
    			},
	    			error: function (response) {
	    	        	toastr.error("系统错误");
	    	        }
	    		});
	    	}
	    });
	 /**
	  * 回调函数
	  * @param sSource
	  * @param aoData
	  * @param fnCallback
	  * @returns
	  */
	 function retrieveData( sSource, aoData, fnCallback, oSettings ) {
	 	var beganAndEnd = $("#queryDate").val();
	 	if(beganAndEnd && beganAndEnd.length != 0){
	     	 var minDate = $("#queryDate").val().split("到")[0] ;
	         var maxDate = $("#queryDate").val().split("到")[1] ;
	         aoData.push({ "name": "beginTime", "value": minDate?minDate.trim():null });
	         aoData.push({ "name": "endTime", "value": maxDate?maxDate.trim():null });
	     }
	     aoData.push( { "name": "pageNum", "value":(Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	     aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });  
	     var searchVal = $('#searchVal').val();
	     if(searchVal && searchVal.length != 0){
	     	aoData.push({ "name": "searchVal", "value": searchVal });
	     }
	     
	     $.ajax( {  
	         "url": sSource,  
	         "data": aoData,  
	         "cache": false,  
	         "dataType": 'json', 
	         "type": "POST", 
	         "success" :function(response) {
	         	fnCallback(response.returnObject);
	         }  
	     } );  
	     
	     //初始化分校select 
	 	$.ajax({
	         url: ctx + '/department/getAllOption',
	         type: 'POST',
	         data: {type : 3},
	         dataType: 'json',
	         success: function (data) {
	     		var opt = "";
	         	for(var i=0; i<data.list.length; i++){
	         		opt += "<option value="+data.list[i].departmentId+">" + data.list[i].fullName+ "</option>";
	         	}
	         	$("#departmentId1").html('<option value="0">--请选择--</option>'+opt);
//	             $('#departmentName1').trigger('chosen:updated');
//	             $("#departmentName1").chosen({no_results_text: "没有匹配项"});
	             $('.chosen-container').width('100%');
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//初始化招生品牌
	 	$.ajax({
	         url: ctx + '/bizBrand/getAllOption',
	         type: 'POST',
	         dataType: 'json',
	         success: function (data) {
	     		var opt = "";
	         	for(var i=0; i<data.list.length; i++){
	         		opt += "<option value="+data.list[i].brandId+">" + data.list[i].brandName+ "</option>";
	         	}
	         	$("#brandId").html('<option value="">--请选择--</option>'+opt);
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//初始化咨询者类型
	 	$.ajax({
	         url: ctx + '/studentAttr/getAllOption',
	         type: 'POST',
	         data: {attrType : 2},
	         dataType: 'json',
	         success: function (data) {
	     		var zxz = "";
	         	for(var i=0; i<data.list.length; i++){
	         		zxz += "<option value="+data.list[i].studentAttrId+">" + data.list[i].typeName + "</option>";
	         	}
	         	$("#studentAttrId2").html('<option value="">--请选择--</option>'+zxz);
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//初始化媒体来源类型
	 	$.ajax({
	         url: ctx + '/studentAttr/getAllOption',
	         type: 'POST',
	         data: {attrType : 1},
	         dataType: 'json',
	         success: function (data) {
	     		var mt = "";
	         	for(var i=0; i<data.list.length; i++){
	         		mt += "<option value="+data.list[i].studentAttrId+">" + data.list[i].typeName + "</option>";
	         	}
	         	$("#studentAttrId1").html('<option value="">--请选择--</option>'+mt);
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//初始化学历
	 	$.ajax({
	         url: ctx + '/studentAttr/getAllOption',
	         type: 'POST',
	         data: {attrType : 3},
	         dataType: 'json',
	         success: function (data) {
	     		var xl = "";
	         	for(var i=0; i<data.list.length; i++){
	         		xl += "<option value="+data.list[i].studentAttrId+">" + data.list[i].typeName + "</option>";
	         	}
	         	$("#highestEducationName").html('<option value="">--请选择--</option>'+xl);
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//初始咨询课程
	 	$.ajax({
	         url: ctx + '/bizProject/getAll',
	         type: 'POST',
	         dataType: 'json',
	         success: function (data) {
	     		var zxkc = "";
	         	for(var i=0; i<data.list.length; i++){
	         		zxkc += "<option value="+data.list[i].projectId+">" + data.list[i].fullName + "</option>";
	         	}
	         	$("#projectId").html('<option value="">--请选择--</option>'+zxkc);
//	         	$('#projectName').trigger('chosen:updated');
//	             $("#projectName").chosen({no_results_text: "没有匹配项",search_contains: true});
	             $('.chosen-container').width('100%');
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//咨询课程级别
	 	$('#projectId').change(function(){
	 		var projectId= $('#projectLevelName :selected').val();
	 		$.ajax({
	 	        url: ctx + '/bizProjectLevel/getAllOption',
	 	        type: 'POST',
	 	        data: {projectId : projectId},
	 	        dataType: 'json',
	 	        success: function (data) {
	 	    		var level = "";
	 	        	for(var i=0; i<data.list.length; i++){
	 	        		level += "<option value="+data.list[i].projectLevelId+">" + data.list[i].levelTitle + "</option>";
	 	        	}
	 	        	$("#projectLevelId").html('<option value="">--请选择--</option>'+level);
	 	        },
	 	        error: function (response) {
	 	        	toastr.error("系统错误");
	 	        }
	 	    });
	 	});
	 	//初始化电话归属地（省）
	 	$.ajax({
	         url: ctx + '/address/getAllOption',
	         type: 'POST',
	         data: {level : 1},
	         dataType: 'json',
	         success: function (data) {
	     		var sheng = "";
	         	for(var i=0; i<data.list.length; i++){
	         		sheng += "<option value="+data.list[i].addressId+">" + data.list[i].fullName + "</option>";
	         	}
	         	$("#province").html('<option value="0">--请选择--</option>'+sheng);
//	         	$('#province').trigger('chosen:updated');
//	         	$("#province").chosen({no_results_text: "没有匹配项"});
	 	        $('.chosen-container').width('100%');
	         },
	         error: function (response) {
	         	toastr.error("系统错误");
	         }
	     });
	 	//初始化电话归属地（市）
	 	$('#province').change(function(){
	 		var addressId= $('#province :selected').val();
	 		$.ajax({
	 	        url: ctx + '/address/getAllOption',
	 	        type: 'POST',
	 	        data: {level : 2,addressId:addressId},
	 	        dataType: 'json',
	 	        success: function (data) {
	 	    		var shi = "";
	 	        	for(var i=0; i<data.list.length; i++){
	 	        		shi += "<option value="+data.list[i].addressId+">" + data.list[i].fullName + "</option>";
	 	        	}
	 	        	$("#city").html('<option value="0">--请选择--</option>'+shi);
//	 	            $('#city').trigger('chosen:updated');
//	 	            $("#city").chosen({no_results_text: "没有匹配项"});
	 	            $('.chosen-container').width('100%');
	 	        },
	 	        error: function (response) {
	 	        	toastr.error("系统错误");
	 	        }
	 	    });
	 	});

	}
})
//每页显示记录数
$('.dataTables_info').parent().append($('.dataTables_length'));