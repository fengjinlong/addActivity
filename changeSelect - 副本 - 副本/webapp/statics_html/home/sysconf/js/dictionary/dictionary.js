$(function(){
	/*身份管理数据初始化*/
    $("#table1 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#table1 tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
	init1(1);
	
	/*城市管理数据初始化*/
	$("#table2 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	    $("#table2 tbody>tr>td").mLoading({
	        text: '正在加载中，请稍后......',
	        icon: "../statics_html/common/image/loading5.gif"
	    });
	init2(2);
	
	/*区县管理数据初始化*/
	$("#table3 tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
    $("#table3 tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
	init3(3);
	province();
	provinceUdpate();
	initAddress();
	/**
	 * 省份添加
	 */
	$('#provinceForm').bootstrapValidator({
		fields: {
            addressId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    },
                    regexp: {
                    	regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '长度必须在6到30之间'
                    }
                }
            },phonetic:{
            	message: 'The username is not valid',
            	 validators: {
                     regexp: {
                     	regexp: /^\+?[A-Za-z]*$/,
                         message: '只能是字母'
                     },
                 }
            }
		},
        submitHandler: function (validator, form, submitButton) {
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/dictionary/addNewDictionary",  
 			   data: $("#provinceForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					  $('.bs-example-modal-lg').modal('hide');
 					  init1(1);
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
	
	/**
	 * 省份编辑
	 */
	$('#provinceUpdateForm').bootstrapValidator({
		fields: {
            addressId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    },
                    regexp: {
                    	regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '长度必须在6到30之间'
                    }
                }
            },phonetic:{
            	message: 'The username is not valid',
           	 validators: {
                    regexp: {
                    	regexp: /^\+?[A-Za-z]*$/,
                        message: '只能是字母'
                    },
                }
           }
		},
        submitHandler: function (validator, form, submitButton) {
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/dictionary/updateRecord",  
 			   data: $("#provinceUpdateForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					  $('.bs-exampleUpdate-modal-lg').modal('hide');
 					  init1(1);
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
	
	/**
	 * 城市添加
	 */
	$('#cityForm').bootstrapValidator({
		fields: {
            addressId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    },
                    regexp: {
                    	regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '长度必须在6到30之间'
                    }
                }
            },phonetic:{
            	message: 'The username is not valid',
           	 validators: {
                    regexp: {
                    	regexp: /^\+?[A-Za-z]*$/,
                        message: '只能是字母'
                    },
                }
           }
		},
        submitHandler: function (validator, form, submitButton) {
        	$("#city_country").val($("#province2").find("option:selected").text());
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/dictionary/addNewDictionary",  
 			   data: $("#cityForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					  $('.bs-city-modal-lg').modal('hide');
 					  init2(2);
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
	
	/**
	 * 城市编辑
	 */
	$('#cityUpdateForm').bootstrapValidator({
		fields: {
            addressId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    },
                    regexp: {
                    	regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '长度必须在6到30之间'
                    }
                }
            },phonetic:{
            	message: 'The username is not valid',
           	 validators: {
                    regexp: {
                    	regexp: /^\+?[A-Za-z]*$/,
                        message: '只能是字母'
                    },
                }
           }
		},
        submitHandler: function (validator, form, submitButton) {
        	$("#city_countryUpdate").val($("#province2").find("option:selected").text());
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/dictionary/updateRecord",  
 			   data: $("#cityUpdateForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					  $('.bs-cityUpdate-modal-lg').modal('hide');
 					  init2(2);
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
	
	/**
	 * 区县添加
	 */
	$('#areaForm').bootstrapValidator({
		fields: {
            addressId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    },
                    regexp: {
                    	regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '长度必须在6到30之间'
                    }
                }
            },phonetic:{
            	message: 'The username is not valid',
              	 validators: {
                       regexp: {
                       	regexp: /^\+?[A-Za-z]*$/,
                           message: '只能是字母'
                       },
                   }
              }
		},
        submitHandler: function (validator, form, submitButton) {
        	$("#area_country").val($("#province3").find("option:selected").text()+"|"+$("#city3").find("option:selected").text());
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/dictionary/addNewDictionary",  
 			   data: $("#areaForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					  $('.bs-area-modal-lg').modal('hide');
 					  init3(3);
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
	
	/**
	 * 区县编辑
	 */
	$('#areaUpdateForm').bootstrapValidator({
		fields: {
            addressId: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '编号不能为空'
                    },
                    regexp: {
                    	regexp: /^\+?[1-9][0-9]*$/,
                        message: '只能是数字和字母_.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '长度必须在6到30之间'
                    }
                }
            },phonetic:{
            	message: 'The username is not valid',
              	 validators: {
                       regexp: {
                       	regexp: /^\+?[A-Za-z]*$/,
                           message: '只能是字母'
                       },
                   }
              }
		},
        submitHandler: function (validator, form, submitButton) {
        	$("#area_countryUpdate").val($("#provinceUpdate3").find("option:selected").text()+"|"+$("#cityUpdate3").find("option:selected").text());
        	$.ajax({  
 			   type: "POST",  
 			   url: ctx + "/dictionary/updateRecord",  
 			   data: $("#areaUpdateForm").serializeArray(),  
 			   dataType: 'json',  
 			   success: function(msg){  
 				   if(msg.status == 'success'){
 					  $('.bs-areaUpdate-modal-lg').modal('hide');
 					  init3(3);
 				   }else{
 					  toastr.error(msg.msg);
 				   }
 				   
 			   }  
 			});  
        }
    });
})
/**
 * 市-省级下拉
 * @returns 添加
 */
function province(){
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":0},
		dataType:"json",
		async:true,
		success:function(data){
			for(var i=0;i<data.length;i++){
				var o = new Option(data[i].fullName,data[i].addressId);
				document.getElementById("province2").options.add(o);
			}
		}
	})
}
/**
 * 市-省级下拉 修改
 * @returns
 */
function provinceUdpate(){
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":0},
		dataType:"json",
		async:true,
		success:function(data){
			for(var i=0;i<data.length;i++){
				var o = new Option(data[i].fullName,data[i].addressId);
				document.getElementById("provinceUpdate2").options.add(o);
			}
		}
	})
}
/**
 * 初始化联动下拉
 * @returns
 */
function initAddress(){
	$("#province3").change(function(){
		areaCity(this.value);
	});
	$("#provinceUpdate3").change(function(){
		areaCityUpdate(this.value);
	});
	$("#cityUpdate3").change(function(){
		$("#aUpdateCountry").val($("#provinceUpdate3").find("option:selected").text()+"|"+$("#cityUpdate3").find("option:selected").text());
		$('#aUpdateParentId').val($("#provinceUpdate3").val());
	});
	$("#provinceUpdate2").change(function(){
		$("#cUpdateCountry").val($("#provinceUpdate2").find("option:selected").text());
		$('#cUpdateParentId').val($("#provinceUpdate2").val());
	});
	areaProvince();
	areaProvinceUpdate();
}
/**
 * 县-省级下拉
 * @returns
 */
function areaProvince(){
	document.getElementById("city3").options.length=0; 
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":0},
		dataType:"json",
		async:true,
		success:function(data){
			for(var i=0;i<data.length;i++){
				var o = new Option(data[i].fullName,data[i].addressId);
				document.getElementById("province3").options.add(o);
			}
			areaCity(data[0].addressId);
		}
	})
}
/**
 * 县-市级下拉
 * @param val
 * @returns
 */
function areaCity(val){
	document.getElementById("city3").options.length=0; 
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":val},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.length>0){
				for(var i=0;i<data.length;i++){
					var o = new Option(data[i].fullName,data[i].addressId);
					document.getElementById("city3").options.add(o);
				}
			}
		}
	})
}

/**
 * 县-省级下拉 修改
 * @returns
 */
function areaProvinceUpdate(){
	document.getElementById("cityUpdate3").options.length=0; 
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":0},
		dataType:"json",
		async:true,
		success:function(data){
			for(var i=0;i<data.length;i++){
				var o = new Option(data[i].fullName,data[i].addressId);
				document.getElementById("provinceUpdate3").options.add(o);
			}
			areaCityUpdate(data[0].addressId);
		}
	})
}
/**
 * 县-市级下拉 修改
 * @param val
 * @returns
 */
function areaCityUpdate(val){
	document.getElementById("cityUpdate3").options.length=0; 
	$.ajax({
		url:ctx+"/address/ajaxLoad",
		data:{"addressId":val},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.length>0){
				for(var i=0;i<data.length;i++){
					var o = new Option(data[i].fullName,data[i].addressId);
					document.getElementById("cityUpdate3").options.add(o);
				}
			}
		}
	})
}
/**
 * 修改状态
 * @returns
 */
function chooseAddress(val,type,flag){
	var attr = $("#span"+val).attr("class");
	if(attr == "btn btn-xs btn-nouse"){
		flag = 1;
	}else{
		flag = 0;
	}
	$.ajax({
        url: ctx + '/dictionary/updateRecord',
        type: 'POST',
        data: {
        	addressId:val,
        	enable:flag
        },
        dataType: 'json',
        success: function (data) {
        	if(type == 1){
        		init1(1);
        	}else if(type ==2){
        		init2(2);
        	}else if(type == 3){
        		init3(3);
        	}
        	/*if(data.status == 'success' && flag == 1){
        		$("#span"+val).removeClass("btn-nouse").addClass("btn-use");
        		$("#span"+val).html('<i class="fa fa-check-circle-o"></i> 启用');
        	}
        	if(data.status == 'success' && flag == 0){
        		$("#span"+val).removeClass("btn-use").addClass("btn-nouse");
        		$("#span"+val).html('<i class="fa fa-ban"></i> 禁用');
        	}*/
        }
	});
}
var lv = 1;
function tableData1(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });
	aoData.push( { "name": "level", "value": 1 } );
	aoData.push( { "name": "searchVal", "value": $("#searchVal"+lv+"").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}
function tableData2(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });
	aoData.push( { "name": "level", "value": 2 } );
	aoData.push( { "name": "searchVal", "value": $("#searchVal"+lv+"").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip()
		}
	});
}
function tableData3(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });
	aoData.push( { "name": "level", "value": 3 } );
	aoData.push( { "name": "searchVal", "value": $("#searchVal"+lv+"").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}


/**
 * 编辑
 * @param val
 * @returns
 */
function edit(addressId,level,fullName,simpleName,country,phonetic,firstWord,parentId){
	if(level == "1"){
		$('.bs-exampleUpdate-modal-lg').modal('show');
		$('#pUpdateAddressId').val(addressId);
		$('#pUpdateLevel').val(level);
		$('#pUpdateFullName').val(fullName);
		$('#pUpdateSimpleName').val(simpleName);
		$('#pUpdatePhonetic').val(phonetic);
		$('#pUpdateFirstWord').val(firstWord);
	}
	if(level == "2"){
		$('.bs-cityUpdate-modal-lg').modal('show');
		$('#cUpdateAddressId').val(addressId);
		$('#cUpdateLevel').val(level);
		$('#cUpdateFullName').val(fullName);
		$('#cUpdateSimpleName').val(simpleName);
		$('#cUpdatePhonetic').val(phonetic);
		$('#cUpdateFirstWord').val(firstWord);
		$('#cUpdateCountry').val(country);
		$('#cUpdateParentId').val(parentId);
	}
	if(level == "3"){
		$('.bs-areaUpdate-modal-lg').modal('show');
		$('#aUpdateAddressId').val(addressId);
		$('#aUpdateLevel').val(level);
		$('#aUpdateFullName').val(fullName);
		$('#aUpdateSimpleName').val(simpleName);
		$('#aUpdatePhonetic').val(phonetic);
		$('#aUpdateFirstWord').val(firstWord);
		$('#aUpdateCountry').val(country);
		$('#aUpdateParentId').val(parentId);
	}
	
}
/**
 * 回车检索
 * @returns
 */
function toSearch(level){
	if(level=="1")
	init1(level);
	if(level=="2")
		init2(level);
	if(level=="3")
		init3(level);
}
/**
 * 删除
 * @returns
 */
function del(val){
	$.ajax({
        url: ctx + '/dictionary/deleteRecord',
        type: 'POST',
        data: {
        	addressId:val,
        },
        dataType: 'json',
        success: function (data) {
        	if(data.status == 'success'){
        		toastr.success(data.msg);
        	}
        }
	});
}

//回车搜索
function search(num){
	if(event.keyCode==13){
		if(num==1){
			toSearch(1);
		}else if(num==2){
			toSearch(2);
		}else if(num==3){
			toSearch(3);
		}
	}
}