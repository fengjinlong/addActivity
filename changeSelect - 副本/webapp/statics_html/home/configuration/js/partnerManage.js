$(function () {
	 $('#searchKey2').bind('keyup', function(event) {
	        if (event.keyCode == "13") {
	            //回车执行查询
	            init2();
	        }
	    });
	 $('#searchKey3').bind('keyup', function(event) {
	        if (event.keyCode == "13") {
	            //回车执行查询
	        	init3();
	        }
	    });
	//搜索日期
    durationDate('.applyDate','-');
	//初始下载资料option
    $.ajax({
        url: ctx + '/applyData/getAll',
        type: 'POST',
        data:{"enable":1},
        dataType: 'json',
        success: function (data) { 
            var zxkc = "";
            for (var i = 0; i < data.length; i++) {
                zxkc += "<option value=" + data[i].applyDataId + " >" + data[i].applyDataName + "</option>";
            }
            $("#applyDataId").html(zxkc);
            $("#applyDataId").selectpicker('refresh');
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    
   
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
            //console.log(zxkc)
            $("#addProductModel").html('<option value="">--请选择--</option>' + zxkc);
            $('#addProductModel').trigger('chosen:updated');
            $("#addProductModel").chosen({no_results_text: "没有匹配项", search_contains: true});
            
            $("#addProductModel2").html('<option value="">--请选择--</option>' + zxkc);
            $('#addProductModel2').trigger('chosen:updated');
            $("#addProductModel2").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    //根据产品模型的选择，动态创建课程信息部分其它下拉框-新增咨询量部分
    $("#addProductModel").change(function(){
    	//2018/1/8新增，必须先选择信息量归属地，再选择课程信息
    	/*var departmentId = $("#adddepartmentId1").val();
    	if(departmentId==null ||　departmentId=='') {
    		$("#addProductModel").val('');//还原产品模型信息
    		$("#addProductModel").trigger("chosen:updated");
    		toastr.error("必须先确定信息量归属地，再设置课程信息");
    		return;
    	}*/
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
	        async: false,
	        data: {"tableName":tableName,"modelId":modelId},
	        async: false,
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
    		var str = '<div class="form-group col-lg-4 col-md-4 col-sm-4">'
	                + '       <label class="control-label col-lg-3 col-md-3 col-sm-3 no-padding-right" style="height: 34px;line-height: 34px">'+chName+'</label>'
	                + '       <div class="col-lg-9 col-md-9 col-sm-9 no-padding-right">'
	                + '            <select name="'+nameHandler(enName)+'Id" id="add2'+enName+'"  data-value="'+enName+'" class="form-control removeFlag2 chosen-select" data-live-search="true">'
	                + '            </select>'
	                //+ '			   <input type="hidden" name="'+nameHandler(enName)+'Name" class="projectInfoManager" />'		
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
	        async: false,
	        success: function (data) {
	            if(data==null || data.length==0) {
	            	return;
	            }
	            for (var i = 0; i < data.length; i++) {
	            	var zxkc = "";
	            	for(var j=0; j<data[i].dataList.length; j++) {
	            		zxkc += "<option value=" + data[i].dataList[j].primaryId + ">" + data[i].dataList[j].primaryName + "</option>";
	            	}
	            	$('#add2'+data[i].tableName).html('<option value="">--请选择--</option>' + zxkc);
	            	//加载下拉框样式
	            	$('#add2'+data[i].tableName).trigger('chosen:updated');
	            	$("#add2"+data[i].tableName).chosen({no_results_text: "没有匹配项", search_contains: true});
	            	$('.chosen-container').width('100%');
	            }
	        },
	        error: function (response) {
	            toastr.error("系统错误");
	        }
	    });
    });
    //addOrDelKaoqi();
    //根据产品的选择，动态查询产品的考期  回显productModel
    $("#addProductId").change(function(){
    	var _this=this;
    	$.ajax({
  	      type: "POST",
  	      async: false,
  	      url: ctx + '/bizContract/queryKaoqi',
  	      data: {"productId":$(_this).val()},
  	      dataType: 'json',
  	      success: function (data) {
  	    	  if (data.status == "success") {
  	    		  var str='';
	              for(var j=0; j<data.data.length; j++) {
	            	  str += "<option value=" + data.data[j].examTimeId + ">" + data.data[j].examTime + "</option>";
	              }
	              $('#kaoqis [name="examId"]').html('<option value="">--请选择--</option>' + str);
	              kaoqiOption='<option value="">--请选择--</option>' + str; //考期下拉框 变量赋值
  	          } else {
  	              toastr.error("查询错误");//没有符合条件的产品
  	          }
  	      }
  	  	});
    	//回显productModel
    	var showList = $(this).find("option:selected").attr("showList");
    	if(showList!=null){
    		showList = JSON.parse(showList);
    		var aiId = null;
    		for(var p in showList){
    			aiId = p.replace("_id","");
    			$('#add'+aiId).val(showList[p]);
    			$('#add'+aiId).trigger('chosen:updated');
    		}
    	}
    });
    //初始化招生地区
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].departmentId + ">" + data.list[i].fullName + "</option>";
            }
            $("#departmentIds").html(opt);
            $('#departmentIds').selectpicker('refresh');
            zhaoshengOption=opt;//招生地区下拉框 变量赋值
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //学历
    $.ajax({
        url: ctx + '/studentAttr/getAllOption',
        type: 'POST',
        data: {attrType: 3},
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list.length; i++) {
                opt += "<option value=" + data.list[i].studentAttrId + ">" + data.list[i].typeName + "</option>";
            }
            $("#studentAttrId").html('<option value="">--请选择--</option>' + opt);
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //科目
    $.ajax({
        url: ctx + '/bizContract/querySubject',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status=='success'){
        		 var opt = "";
                 for (var i = 0; i < data.data.length; i++) {
                     opt += "<option value=" + data.data[i].examSubjectId + ">" + data.data[i].examSubjectName + "</option>";
                 }
                 $("#subjectTable [name='subjectId']").html('<option value="">--请选择--</option>' + opt);
        	}else{
        		toastr.error("查询科目出错");
        	}
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //户籍
    $.ajax({
        url: ctx + '/address/getAllNotPage',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var opt = "";
            for (var i = 0; i < data.list1.length; i++) {
                opt += "<optgroup label=" + data.list1[i].fullName + " id=" + data.list1[i].addressId + "></optgroup>";
            }
            $('#registerLimitId').html(opt);
            for (var j = 0; j < data.list2.length; j++) {
                var copt = "";
                var pid = data.list2[j].parentId;
                copt += "<option value=" + data.list2[j].addressId + ">" + data.list2[j].fullName + "</option>";
                $('#' + pid + '').append(copt);
            }
            $('.selectpicker').selectpicker('refresh');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    //资源归属，一级公司
    $.ajax({
        url: ctx + '/department/getAllOption',
        data: {parentId: 0},
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                var opt = "<option value=''>---请选择---</option>";

                for (var i = 0; i < data.list.length; ++i) {
                    opt += "<option value='" + data.list[i].departmentId + "'>" + data.list[i].fullName + "</option>";
                }

                $('#partnerAdd select[name="departmentId"]').html(opt);

            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });


    /**
     * 新增联系人名单、银行卡信息、返款账号信息
     * @param parentEle
     */
    function addField(parentEle) {
        $(parentEle).on('click', '.add-button', function () {
            //删除
            if ($(this).is('.fa-minus-circle')) {
                if ($(this).parent().parent().find('label').html() == '') {
                    $(this).parent().parent().remove();
                } else {
                    $(this).parent().parent().next().find('label').html($(this).parent().parent().find('label').html());
                    $(this).parent().parent().remove();
                }
            }
            //新增
            if ($(this).is('.fa-plus-circle')) {
                //联系人名单
                if ($(this).is('.linkmanAdd')) {
                    var link = $(this).parent().parent().clone(true);
                    $(link).find('input').val('');
                    $(link).find('input').eq(0).val("次要");
                    $(link).find('.linkmanAdd').show();

                    $(this).parent().parent().after(link);
                    $(parentEle).find('.contactList:not(:first)').find('label').html('');
                }

                //银行卡信息
                if ($(this).is('.bankcardAdd')) {
                    var bankcard = $(this).parent().parent().clone(true);
                    $(bankcard).find('input').val('');
                    $(bankcard).find('.bankcardAdd').show();

                    $(this).parent().parent().after(bankcard);
                    $(parentEle).find('.bankCard:not(:first)').find('label').html('');
                }

                //返款账号信息
                if ($(this).is('.rebatesAccount')) {
                    var rebatesAccount = $(this).parent().parent().clone(true);
                    $(rebatesAccount).find('input').val('');
                    $(rebatesAccount).find('.rebatesAccount').show();

                    $(this).parent().parent().after(rebatesAccount);
                    $(parentEle).find('.rebates:not(:first)').find('label').html('');
                }
            }
        });
    }
    addField('.partnerAdd');


    //数据初始化
    $("#partnerTable tbody").html("<tr><td height='300' colspan='9' class='text-center'></td></tr>");
    $("#partnerTable tbody>tr>td").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    InitiateSimpleDataTable.init();
    init3();
   // init1();
    init2();

    //启用
    $('#partnerTable').on('click', '.btn-use', function () {
    	var _this=this;
        $.ajax({
            url: ctx + '/bizPartner/updateRecord',
            data: {partnerId: $(this).data('id'), enable: 0},
            dataType: 'json',
            type: 'post',
            success: function (data) {
            	$(_this).attr("class","btn btn-nouse btn-xs status-btn");
            	$(_this).html('<i class="fa fa-ban"></i> 禁用');
               // InitiateSimpleDataTable.init();
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });

    //禁用
    $('#partnerTable').on('click', '.btn-nouse', function () {
    	var _this=this;
        $.ajax({
            url: ctx + '/bizPartner/updateRecord',
            data: {partnerId: $(this).data('id'), enable: 1},
            dataType: 'json',
            type: 'post',
            success: function (data) {
            	$(_this).attr("class","btn btn-use btn-xs status-btn");
            	$(_this).html('<i class="fa fa-check-square-o"></i> 启用');
                //InitiateSimpleDataTable.init();
            },
            error: function () {
                toastr.error("系统错误");
            }
        });

    });


    //合同管理
    $('#partnerTable').on('click', '.contract', function () {
        var partnerId = $(this).data('id');
        loadHtml('/bizContract/index?partnerId=' + partnerId);
    });

    //新增合作方
    $('.partnerAdd').on('hidden.bs.modal', function () {
        $(".partnerAdd .widget-caption").html("新增");
        $('#partnerAdd')[0].reset();

        $('#partnerAdd input:hidden').val('');
        $('#partnerAdd .contactList').find('input').val('');
        $('#partnerAdd .bankCard').find('input').val('');
        $('#partnerAdd .rebates').find('input').val('');
        $('#partnerAdd .contactList').find('input').eq(0).val("首要");

        $('#partnerAdd .contactList:not(:eq(0))').remove();

        $('#partnerAdd .bankCard:not(:eq(0))').remove();

        $('#partnerAdd .rebates:not(:eq(0))').remove();

        $('#partnerAdd input:submit').removeAttr('disabled');

        $('#partnerAdd input:submit').val('确定');
        
        $('#partnerAdd .isEmpty,#partnerAdd .formatError').hide();
        
        $('#partnerAdd .form-group').removeClass('info-error');
    })

    $('#partnerAdd').on('focusin', 'input,select', function () {
        $('#partnerAdd input:submit').removeAttr('disabled');
    });

  //合作方编辑
    $('#partnerTable').on('click', '.edit', function () {
        $(".widget-caption").html("编辑");
        $('#partnerAdd input:submit').removeAttr('disabled');      
        var record = $(this).data('record');

        $('#partnerAdd input[name="partnerId"]').val(record.partnerId);

        $('#partnerAdd select[name="departmentId"]').val(record.departmentId);
        $('#partnerAdd input[name="partnerCode"]').val(record.partnerCode);
        $('#partnerAdd input[name="partnerName"]').val(record.partnerName);
        $('#partnerAdd input[name="partnerShortName"]').val(record.partnerShortName);
        $('#partnerAdd input[name="partnerAddress"]').val(record.partnerAddress);

        var contact = JSON.parse(record.contact);

        var contactDom = "";
        for (var i = 0; i < contact.length; ++i) {
            contactDom += '<div class="form-group col-sm-12 contactList">' +
                '<label class="control-label col-sm-2 no-padding-right">联系人名单<span class="control-label mandatory">*</span></label>' +
                '<div class="col-sm-10">' +
                '<div class="col-sm-2  no-padding">' +
                '<input name="type" value="' + contact[i].type + '" class="form-control" readonly="readonly">' +
                '</div>' +
                '<div class="col-sm-4 ">' +
                '<input name="name" type="text" value="' + contact[i].name + '" class="form-control" placeholder="联系人姓名">' +
                '</div>' +
                '<div class="col-sm-5  no-padding-right">' +
                '<input name="tel" type="text" value="' + contact[i].tel + '" class="form-control telephone" placeholder="联系电话">' +
                ' <span class="red absolute isEmpty">联系电话不能为空</span>'+
                ' <span class="red absolute formatError">请填写正确的电话号码</span>'+
                '</div>' +
                '<i class="fa fa-plus-circle blue linkmanAdd control-label add-button"></i>' +
                '<i class="fa fa-minus-circle danger linkmanAdd control-label add-button" style="display:inline;line-height: 33px;"></i>' +
                '</div>' +
                '</div>';
        }


        $('#partnerAdd .contactList').remove();
        $('#partnerAdd .contact-split').after(contactDom);
        $('#partnerAdd .contactList').find('.fa-minus-circle').eq(0).css('display', 'none');

        var bankCard = JSON.parse(record.bankCard);
        var bankCardDom = "";
        for (var i = 0; i < bankCard.length; ++i) {
            bankCardDom += '<div class="form-group col-sm-12 bankCard">' +
                '<label class="control-label col-sm-2 no-padding-right">银行卡信息<span class="control-label mandatory">*</span></label>' +
                '<div class="col-sm-10">' +
                '<div class="col-sm-2 no-padding">' +
                '<input name="bank" type="text" value="' + bankCard[i].bank + '" class="form-control" placeholder="开户行">' +
                '</div>' +
                '<div class="col-sm-4 ">' +
                '<input name="detail" value="' + bankCard[i].detail + '" type="text" class="form-control" placeholder="开户行名称">' +
                '</div>' +
                '<div class="col-sm-2 ">' +
                '<input name="user" type="text" value="' + bankCard[i].user + '" class="form-control" placeholder="开户人">' +
                '</div>' +
                '<div class="col-sm-3  no-padding">' +
                '<input name="account" type="text" value="' + bankCard[i].account + '" class="form-control account-number" placeholder="账号" style="padding:6px;">' +
                '<span class="red absolute isEmpty">银行卡账号不能为空</span>'+
                '<span class="red absolute formatError">请填写正确的银行卡账号</span>'+
                '</div>' +
                '<i class="fa fa-plus-circle blue bankcardAdd control-label add-button"></i>' +
                '<i class="fa fa-minus-circle danger bankcardAdd control-label add-button" style="display:inline;line-height:33px;"></i>' +
                '</div>' +
                '</div>';
        }

        if (bankCardDom != "") {
            $('#partnerAdd .bankCard').remove();
            $('#partnerAdd .bankCard-split').after(bankCardDom);
        }

        $('#partnerAdd .bankCard').find('.fa-minus-circle').eq(0).css('display', 'none');


        var bankReturn = JSON.parse(record.bankReturn);
        var bankReturnDom = "";
        for (var i = 0; i < bankReturn.length; ++i) {
            bankReturnDom += '<div class="form-group col-sm-12 rebates">' +
                '<label class="control-label col-sm-2 no-padding-right">返款账号信息<span class="control-label mandatory">*</span></label>' +
                '<div class="col-sm-10">' +
                '<div class="col-sm-2 no-padding">' +
                '<input name="bank_return" type="text" value="' + bankReturn[i].bank + '" class="form-control" placeholder="开户行">' +
                '</div>' +
                '<div class="col-sm-4">' +
                '<input name="detail_return" value="' + bankReturn[i].detail + '" type="text" class="form-control" placeholder="开户行名称">' +
                '</div>' +
                '<div class="col-sm-2">' +
                '<input name="user_return" type="text" value="' + bankReturn[i].user + '" class="form-control" placeholder="开户人">' +
                '</div>' +
                '<div class="col-sm-3 no-padding">' +
                '<input name="account_return" type="text" value="' + bankReturn[i].account + '" class="form-control refund-account" placeholder="账号" style="padding:6px;">' +
                '<span class="red absolute isEmpty">返款账号不能为空</span>'+
                '<span class="red absolute formatError">请填写正确的返款账号</span>'+
                '</div>' +
                '<i class="fa fa-plus-circle blue bankcardAdd control-label add-button"></i>' +
                '<i class="fa fa-minus-circle danger bankcardAdd control-label add-button" style="display:inline;line-height:33px"></i>' +
                '</div>' +
                '</div>';
        }

        if (bankReturnDom != "") {
            $('#partnerAdd .rebates').remove();
            $('#partnerAdd .bankReturn-split').after(bankReturnDom);
        }

        $('#partnerAdd .rebates').find('.fa-minus-circle').eq(0).css('display', 'none');

        $('.partnerAdd').modal('show');       

      //表单验证
      formCheck();

    });


    //弹窗层级
    $('.productEdit,.productAdd').on('show.bs.modal', function () {
        $('.contractEdit').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.contractEdit').css('z-index', 1050);
    });
    

  //表单验证
  formCheck();
  
//产品编辑
  $('#contractCetail').on('click', '.edit', function () {
  	//清除上次选择后生成的下拉框
  	$(".removeFlag").parent().parent().remove();
  	$(".productAdd .title").html("查看");
  	var _this=this;
  	//回显报考资料
  	$.post(ctx + '/bizContractDetail/selectBizContractDetailApply',
  		{"contractDetailId": $(_this).attr("value")}
  		,function(data){
  			if(data.status=='success'){
  				var ids=[];
  				$.each(data.data,function(index,obj){
  					ids.push(obj.applyDataId);
  				})
  				$('#productAdd select[name="applyDataId"]').selectpicker('val',ids);
  			}else{
  				toastr.error("回显报考资料出错");
  			}
  		}
  		,"json")
  	
  	$.ajax({
          url: ctx + '/bizContractDetail/selectOne',
          type: 'POST',
          data: {"contractDetailId": $(_this).attr("value")},
          dataType: 'json',
          async: true,
          success: function (data) {
          	$('.productAdd').modal("show");
              var detail=data.data;
              $('#addProductModel').val(detail.productModelId);
              $("#addProductModel").trigger("chosen:updated");
              $('#addProductModel').change();
              
              $('#productAdd input[name="contractDetailId"]').val(detail.contractDetailId)
             
              $('#productAdd input[name="age"]').val(detail['age']);
              //学历
              $('#productAdd select[name="studentAttrId"]').val(detail['studentAttrId']);
              //户籍
              if(detail['registerLimitId']!=null){
              	var list=detail['registerLimitId'].split(",");
              	var ids=new Array();
              	$.each(list,function(i){
              		ids.push(list[i]);
              	})
              	$('#productAdd select[name="registerLimitId"]').selectpicker('val',ids);
              }
              $('#extraLimit').val(detail['extraLimit']);
              //考试科目
              //先移除
              $.each($("#subjectTable").find("tr"),function(index,obj){
              	if(index!=0){
              		$(obj).remove();
              	}
              })
              //再增加
              var projects=detail['bizContractDetailProjects'];
              var addSubject=$("#subjectTable").find("tr:first-child").find(".addSubject");
              for(var i=1;i<projects.length;i++){
              	addSubject.click();
              }
              $.each($("#subjectTable").find("tr"),function(index,obj){
              	var project=projects[index];
              	$(obj).find("[name='subjectId']").val(project['projectId']);
              	$(obj).find("[name='isSelf']").val(project['isSelf']);
              	$(obj).find("[name='isIdcart']").val(project['isIdcart']);
              })
              //费用详情
              $('#productAdd input[name="zxf"]').val(detail['totalFee']);
              $('#productAdd input[name="hzcb"]').val(detail['costing']);
              $('#productAdd select[name="ywfd"]').val(detail['hasRebates']);
              $('#productAdd select[name="bmf"]').val(detail['bm']);
              $('#productAdd select[name="rxcsf"]').val(detail['rxce']);
              $('#productAdd select[name="zy"]').val(detail['zy']);
              $('#productAdd select[name="ksf"]').val(detail['ks']);
              $('#productAdd select[name="lwdb"]').val(detail['lwdb']);
              $('#productAdd select[name="tkbm"]').val(detail['tkbm']);
              $('#productAdd select[name="bkf"]').val(detail['bk']);
              $('#productAdd select[name="xwks"]').val(detail['xwksbm']);
              $('#productAdd select[name="xwfd"]').val(detail['xwfd']);
              $('#productAdd select[name="zpcj"]').val(detail['zpcj']);
              $('#productAdd select[name="sbjg"]').val( detail['zsgb']);
              
            //回显 ai字段 和 product 和考期
            //回去tableName
          	var jsonObj = $('#addProductModel :selected').data("value");
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
          		 $('#productAdd select[name="productId"]').val(detail['productId']);
                   $('#productAdd select[name="productId"]').trigger("chosen:updated");
                   $('#productAdd select[name="productId"]').change();
                   //product回显完后 回显考期
                   //setTimeout(() => {
                  	//考期
                  	 //先移除
                  	 $.each($("#kaoqis").children("div"),function(index,one){
                  		 if(index!=0){
                  			$(one).remove();
                  		 }else{
                  			 $.each($(one).find(".kaoqi"),function(ind,two){
                  				 if(ind!=0){
                  					 $(two).remove();
                  				 }
                             	})
                  		 }
                        } );
                       var exams=detail['bizContractDetailExams'];
                       var addExam=$(".addExam");
                       for(var i=1;i<exams.length;i++){
                       	addExam.click();
                       }
                       $.each($("#kaoqis").children("div"),function(index,one){
                       	var exam=exams[index];
                       	$(one).find("[name='examId']").val(exam['examId']);
                       	$(one).find("[name='examNum']").val(exam['examNum']);
                       	$(one).find("[name='examLevel']").val(exam['examLevel']);
                       	$(one).find("[name='departmentIds']").val(exam['departmentIds'].split(","));
                       	$(one).find("[name='departmentIds']").selectpicker('refresh');
                       	var examPays=exam['bizContractDetailExamPays'];
                       	var addKaoqi=$(one).find(".addKaoqi");
                       	for(var i=1;i<examPays.length;i++){
                       		addKaoqi.click();
                       	}
                       	$.each($(one).find(".kaoqi"),function(ind,two){
                       		var examPay=examPays[ind];
                       		$(two).find("[name='payDateString']").val(dateForMat(examPay['payDate']));
                       		$(two).find("[name='payNum']").val(examPay['payNum']);
                       		$(two).find("[name='returnDateString']").val(dateForMat(examPay['returnDate']));
                       		$(two).find("[name='returnNum']").val(examPay['returnNum']);
                       	})
                       } );
  				//}, 1000);
                   if(tableName!=""){
                  	$.post(ctx+"/bizContract/showAi",
               		{"tableNames":tableName,"productId":data.data.productId},
       	            function(data2){
       	            	if(data2.status=='success'){
       	            		for(var i=0; i<jsonObj.length; i++) {
       	                		var enName = jsonObj[i].enName;
       	                		var enNameId=enName+"_id";
       	                		if(data2[enNameId]!=null){
       	                			$("#add"+enName).val(data2[enNameId]);
           	                		$("#add"+enName).trigger("chosen:updated");
       	                		}
       	                	}
       	            	}else{
       	            		toastr.error("产品ai字段查询出错");
       	            	}
       	            },"json")
                   }
          		
  			//}, 1000);
          },
          error: function (response) {
              toastr.error("查询合同详情出错");
          }
      });
  });
})

function retrieveData(sSource, aoData, fnCallback, oSettings) {

    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var searchVal = $('#partner .searchVal').val();

    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

    var enable = $('#partner select[name="status"]').val();


    if (enable == 0 || enable == 1) {
        aoData.push({"name": "enable", "value": enable});
    }

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

function validateForm(form, callback, confirmMsg) {
	//资源归属 
	if($('#partnerAdd select[name="departmentId"]').val() == ''){
		$('#partnerAdd select[name="departmentId"]').next('.isEmpty').show();
		$('#partnerAdd select[name="departmentId"]').parent().parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
	//合作方编号
	if($.trim($('#partnerAdd input[name="partnerCode"]').val()) == ''){
		$('#partnerAdd input[name="partnerCode"]').next('.isEmpty').show();
		$('#partnerAdd input[name="partnerCode"]').parent().parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
	//合作单位名称
	if($.trim($('#partnerAdd input[name="partnerName"]').val()) == ''){
		$('#partnerAdd input[name="partnerName"]').next('.isEmpty').show();
		$('#partnerAdd input[name="partnerName"]').parent().parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
	//合作单位简称
	if($.trim($('#partnerAdd input[name="partnerShortName"]').val()) == ''){
		$('#partnerAdd input[name="partnerShortName"]').next('.isEmpty').show();
		$('#partnerAdd input[name="partnerShortName"]').parent().parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
	//合作单位地址
	if($.trim($('#partnerAdd input[name="partnerAddress"]').val()) == ''){
		$('#partnerAdd input[name="partnerAddress"]').next('.isEmpty').show();
		$('#partnerAdd input[name="partnerAddress"]').parent().parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
    //联系人电话
	var telRegexp = /^(13[0-9]|15[0|2|1|3|6|7|8|9]|18[8|9])\d{8}$/;
	if($.trim($('#partnerAdd input.telephone').val()) == ''){
		$('#partnerAdd input.telephone').nextAll('.isEmpty').show();
		$('#partnerAdd input.telephone').nextAll('.formatError').hide();
		$('#partnerAdd input.telephone').parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}else if(!telRegexp.test($('#partnerAdd input.telephone').val()) && $.trim($('#partnerAdd input.telephone').val()) != ''){
		$('#partnerAdd input.telephone').nextAll('.isEmpty').hide();
		$('#partnerAdd input.telephone').nextAll('.formatError').show();
		$('#partnerAdd input.telephone').parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
	//银行卡账号
	var accountRegexp = /^(\d{16}|\d{18,21})$/;
	if($.trim($('#partnerAdd input.account-number').val()) == ''){
		$('#partnerAdd input.account-number').nextAll('.isEmpty').show();
		$('#partnerAdd input.account-number').nextAll('.formatError').hide();
		$('#partnerAdd input.account-number').parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}else if(!accountRegexp.test($('#partnerAdd input.account-number').val()) && $.trim($('#partnerAdd input.account-number').val()) != ''){
		$('#partnerAdd input.account-number').nextAll('.isEmpty').hide();
		$('#partnerAdd input.account-number').nextAll('.formatError').show();
		$('#partnerAdd input.account-number').parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
	//返款账号
	var refundRegexp = /^(\d{16}|\d{18,21})$/;
	if($.trim($('#partnerAdd input.refund-account').val()) == ''){
		$('#partnerAdd input.refund-account').nextAll('.isEmpty').show();
		$('#partnerAdd input.refund-account').nextAll('.formatError').hide();
		$('#partnerAdd input.refund-account').parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}else if(!refundRegexp.test($('#partnerAdd input.refund-account').val()) && $.trim($('#partnerAdd input.refund-account').val()) != ''){
		$('#partnerAdd input.refund-account').nextAll('.isEmpty').hide();
		$('#partnerAdd input.refund-account').nextAll('.formatError').show();
		$('#partnerAdd input.refund-account').parent().addClass('info-error');
		$('#partnerAdd .ensure-btn').attr('disabled', true);
		return false;
	}
    var contactArr = [];
    $('#partnerAdd input[name="name"]').each(function () {
        var i = $(this).index('#partnerAdd input[name="name"]');
        var contactObj = {};
        contactObj["name"] = $(this).val();
        contactObj['type'] = $('#partnerAdd input[name="type"]').eq(i).val();
        contactObj["tel"] = $('#partnerAdd input[name="tel"]').eq(i).val();
    
        contactArr.push(contactObj);
    })
    var bankArr = [];
    $('#partnerAdd input[name="bank"]').each(function () {
        var i = $(this).index('#partnerAdd input[name="bank"]');
        var bankObj = {};
        bankObj["bank"] = $(this).val();
        bankObj['detail'] = $('#partnerAdd input[name="detail"]').eq(i).val();
        bankObj["user"] = $('#partnerAdd input[name="user"]').eq(i).val();
        bankObj["account"] = $('#partnerAdd input[name="account"]').eq(i).val();      
        bankArr.push(bankObj);
    })

    var bankReturnArr = [];
    $('#partnerAdd input[name="bank_return"]').each(function () {
        var i = $(this).index('#partnerAdd input[name="bank_return"]');
        var bankReturnObj = {};
        bankReturnObj["bank"] = $(this).val();
        bankReturnObj['detail'] = $('#partnerAdd input[name="detail_return"]').eq(i).val();
        bankReturnObj["user"] = $('#partnerAdd input[name="user_return"]').eq(i).val();
        bankReturnObj["account"] = $('#partnerAdd input[name="account_return"]').eq(i).val();
        bankReturnArr.push(bankReturnObj);
    })

    var departmentId = $('#partnerAdd select[name="departmentId"]').val();
    var partnerCode = $('#partnerAdd input[name="partnerCode"]').val();
    var partnerName = $('#partnerAdd input[name="partnerName"]').val();
    var partnerShortName = $('#partnerAdd input[name="partnerShortName"]').val();
    var partnerAddress = $('#partnerAdd input[name="partnerAddress"]').val();
    var partnerId = $('#partnerAdd input[name="partnerId"]').val();

    var params = {};
    params['departmentId'] = departmentId;
    params['partnerCode'] = partnerCode;
    params['partnerName'] = partnerName;
    params['partnerShortName'] = partnerShortName;
    params['partnerAddress'] = partnerAddress;
    params['contact'] = JSON.stringify(contactArr);
    params['bankCard'] = JSON.stringify(bankArr);
    params['bankReturn'] = JSON.stringify(bankReturnArr);
    params['partnerId'] = partnerId;

    $('#partnerAdd input:submit').attr('disabled', 'disabled');
    console.log("===")
    $.ajax({
        url: ctx + '/bizPartner/addNewRecord',
        data: params,
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.status != "success") {
                toastr.error(data.msg);
            } else {
                $('.partnerAdd').modal('hide');
                InitiateSimpleDataTable.init();
            }
        },
        error: function () {
            toastr.error("系统错误");
        }
    });

    return false;
}


//全选
$('#partnerTable thead .checkAll').on('click', function () {
  if ($(this).prop('checked')) {
      $('#partnerTable tbody .checkchild').prop('checked', true);
  } else {
      $('#partnerTable tbody .checkchild').prop('checked', false);
  }
})

//搜索
$('#partner .search-btn').click(function () {
    InitiateSimpleDataTable.init();
})
//回车搜索
function search() {
    if (event.keyCode == 13) {
        InitiateSimpleDataTable.init();
    }
}

function formCheck(){
	//资源归属
    $('#partnerAdd select[name="departmentId"]').on('change',function(){
        if($('#partnerAdd select[name="departmentId"]').val() == ''){
             $(this).next('.isEmpty').show();
             $(this).parent().parent().addClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
             $(this).next('.isEmpty').hide();
             $(this).parent().parent().removeClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })

    //合作方编号
    $('#partnerAdd input[name="partnerCode"]').bind('input propertychange',function(){
        if($.trim($('#partnerAdd input[name="partnerCode"]').val()) == ''){
             $(this).next('.isEmpty').show();
             $(this).parent().parent().addClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
             $(this).next('.isEmpty').hide();
             $(this).parent().parent().removeClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })

    //合作单位名称
    $('#partnerAdd input[name="partnerName"]').bind('input propertychange',function(){
        if($.trim($('#partnerAdd input[name="partnerName"]').val()) == ''){
             $(this).next('.isEmpty').show();
             $(this).parent().parent().addClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
             $(this).next('.isEmpty').hide();
             $(this).parent().parent().removeClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })

    //合作单位简称
    $('#partnerAdd input[name="partnerShortName"]').bind('input propertychange',function(){
        if($.trim($('#partnerAdd input[name="partnerShortName"]').val()) == ''){
             $(this).next('.isEmpty').show();
             $(this).parent().parent().addClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
             $(this).next('.isEmpty').hide();
             $(this).parent().parent().removeClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })

    //合作单位地址
    $('#partnerAdd input[name="partnerAddress"]').bind('input propertychange',function(){
        if($.trim($('#partnerAdd input[name="partnerAddress"]').val()) == ''){
             $(this).next('.isEmpty').show();
             $(this).parent().parent().addClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
             $(this).next('.isEmpty').hide();
             $(this).parent().parent().removeClass('info-error');
             $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })

    //联系人电话
    $('#partnerAdd input.telephone').bind('input propertychange',function(){
        var phoneRegexp = /^(13[0-9]|15[0|2|1|3|6|7|8|9]|18[8|9])\d{8}$/;
        if($.trim($(this).val()) == ''){
            $(this).nextAll('.isEmpty').show();
            $(this).nextAll('.formatError').hide();
            $(this).parent().addClass('info-error');
            $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else if(!phoneRegexp.test($.trim($(this).val())) && $.trim($(this).val()) != ''){
            $(this).nextAll('.isEmpty').hide();
            $(this).nextAll('.formatError').show();
            $(this).parent().addClass('info-error');
            $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
            $(this).nextAll('.isEmpty').hide();
            $(this).nextAll('.formatError').hide();
            $(this).parent().removeClass('info-error');
            $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })


    //银行卡账号
    $('#partnerAdd input.account-number').bind('input propertychange',function(){
        var accountRegexp = /^(\d{16}|\d{17,21})$/;
        if($.trim($(this).val()) == ''){
            $(this).nextAll('.isEmpty').show();
            $(this).nextAll('.formatError').hide();
            $(this).parent().addClass('info-error');
            $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else if(!accountRegexp.test($.trim($(this).val())) && $.trim($(this).val()) != ''){
            $(this).nextAll('.isEmpty').hide();
            $(this).nextAll('.formatError').show();
            $(this).parent().addClass('info-error');
            $('#partnerAdd .ensure-btn').attr('disabled', true);
        }else{
            $(this).nextAll('.isEmpty').hide();
            $(this).nextAll('.formatError').hide();
            $(this).parent().removeClass('info-error');
            $('#partnerAdd .ensure-btn').attr('disabled', false);
        }
    })

    //返款账号
    $('#partnerAdd input.refund-account').bind('input propertychange',function(){
		var accountRegexp = /^(\d{16}|\d{17,21})$/;
		if($.trim($(this).val()) == ''){
			$(this).nextAll('.isEmpty').show();
			$(this).nextAll('.formatError').hide();
			$(this).parent().addClass('info-error');
			$('#partnerAdd .ensure-btn').attr('disabled', true);
		}else if(!accountRegexp.test($.trim($(this).val())) && $.trim($(this).val()) != ''){
			$(this).nextAll('.isEmpty').hide();
			$(this).nextAll('.formatError').show();
			$(this).parent().addClass('info-error');
			$('#partnerAdd .ensure-btn').attr('disabled', true);
		}else{
			$(this).nextAll('.isEmpty').hide();
			$(this).nextAll('.formatError').hide();
			$(this).parent().removeClass('info-error');
			$('#partnerAdd .ensure-btn').attr('disabled', false);
		}
    })
}

/**
 * 初始化
 * @returns
 */
function init2() {
    var init = $('#bizContract').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false,  //是否支持排序功能
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
        "sAjaxSource": ctx + '/bizContract/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData2,
        "aoColumns": [
              {"mData": "partnerName", 'sClass': "text-center"},
	          {"mData": "contractCode", 'sClass': "text-center"},
	          {"mData": "discussUser", 'sClass': "text-center"},
	          {"mData": "signUser", 'sClass': "text-center"},
	          {"mData": "signDate", 'sClass': "text-center"},
	          {"mData": "expireDate", 'sClass': "text-center"},
	          {"mData": "createUserName", 'sClass': "text-center"},
	          {"mData": "createDate", 'sClass': "text-center"},
	          {"mData": "productNum", 'sClass': "text-center"},
	          {
	              "mData": "enable",
	              'sClass': "text-center",
	              "bSortable": false,
	              "mRender": function (data, type, full) {
	                  if (data == 0) {
	                      return '<a href="#" style="width: inherit" class="btn btn-nouse btn-xs"><i class="fa fa-ban"></i> 禁用</a>';
	                  } else {
	                      return '<a href="#" style="width: inherit" class="btn btn-use btn-xs"><i class="fa fa-check-square-o"></i> 启用</a>';
	                  }
	              }
	          },
	          {
	              "mData": "contractId",
	              'sClass': "text-center",
	              "bSortable": false,
	              "mRender": function (data, type, full) {
	                  var e = "<a href='#' onclick='lookContract(this)' data-record='" + JSON.stringify(full) + "' class='btn btn-warning btn-xs ck' data-toggle='modal' data-backdrop='static' data-target='.contractEdit'><i class='fa fa-folder-open-o'></i>查看</a>";
	                  return e;
	              }
	          }
	      ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#bizContract_wrapper").removeClass();
    $('#bizContract_wrapper').addClass("");


     //每页显示记录数
    $('#bizContract_wrapper .dataTables_info').parent().append($('#bizContract_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData2(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "searchKey", "value": $("#searchKey2").val()});
    aoData.push({
        "name": "signDateString",
        "value": $("#signDateString").val()
    });
    aoData.push({
        "name": "expireDateString",
        "value": $("#expireDateString").val()
    });
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

//合同管理查看
function lookContract(obj) {
    var contract = JSON.parse($(obj).attr('data-record'));
    editor2.readonly(true);
    editor2.html(contract.uploadContract);
    $('#updtcontractId').val(contract.contractId);
    $('#updtContractCode').val(contract.contractCode);
    $('#updtSignUser').val(contract.signUser);
    $('#updtdiscussUser').val(contract.discussUser);
    var signDate = contract.signDate;
    var expireDate = contract.expireDate;
    $('#updtDuration').val(signDate + ' - ' + expireDate);
}
/**
 * 初始化
 * @returns
 */
function init3() {
    var init = $('#contractCetail').dataTable({
        "bAutoWidth" : false,
        "bFilter" : false,
        "bPaginate":true,
        "bSort": false,  //是否支持排序功能
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
        "sAjaxSource": ctx + '/bizContractDetail/load',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initData3,
        "aoColumns": [
          {"mData": "partnerName", 'sClass': "text-center"},
          {"mData": "contractCode", 'sClass': "text-center"},
          {"mData": "productModelName", 'sClass': "text-center"},
          {"mData": "productName", 'sClass': "text-center"},
          {"mData": "productName", 'sClass': "text-center"},
          {"mData": "productName", 'sClass': "text-center"},
          {"mData": "productName", 'sClass': "text-center"},
          {
              "mData": "enable",
              'sClass': "text-center",
              "bSortable": false,
              "mRender": function (data, type, full) {
                  if (full["enable"] == 0) {
                      return '<a href="#" style="width: inherit" class="btn btn-nouse btn-xs"><i class="fa fa-ban"></i> 禁用</a>';
                  } else {
                      return '<a href="#" style="width: inherit" class="btn btn-use btn-xs"><i class="fa fa-check-square-o"></i> 启用</a>';
                  }
              }
          },
          {
              "mData": "contractDetailId",
              'sClass': "text-center",
              "bSortable": false,
              "mRender": function (data, type, full) {
                  return "<a href='#' value='"+full["contractDetailId"]+"'  class='btn btn-warning btn-xs ck edit' data-toggle='modal'  ><i class='fa fa-folder-open-o'></i> 查看</a>";
                  //<a href="#" class="btn btn-warning btn-xs ck" data-toggle="modal" data-backdrop="static" data-target=".productEdit"><i class="fa fa-folder-open-o"></i>查看</a>
              }
          }
      ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#contractCetail_wrapper").removeClass();
    $('#contractCetail_wrapper').addClass("");


    // 每页显示记录数
    $('#contractCetail_wrapper .dataTables_info').parent().append($('#contractCetail_wrapper .dataTables_length'));
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function initData3(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "searchKey", "value": $("#searchKey3").val()});
  //存放条件
	var conditionArray = new Array();
	$(".counselCurriculum2 select :selected").each(function(index,obj){
		//得到option的value即id值
		var idValue = $(obj).val();
		//开始拼接产品查询sql条件
		if(idValue!=null && idValue!='') {
			//得到主键列英文名称,option-select
			var primaryIdName = "p."+$(obj).parent().data("value")+"_id";
			var primaryIdValue = "'"+idValue+"'";
			//形如XXX_id = 'YYY'
			var condition = primaryIdName + "=" + primaryIdValue;
			conditionArray.push(condition);
		}
	});
	var conditions = conditionArray.join(" and ");
	console.log(conditions)
    aoData.push({"name": "conditions", "value": conditions});
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
//当产品部分的下拉框发生改变时，需要制空产品下拉框——新增咨询量页面部分
function clearAddProduct2() {
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
	var conditions = conditionArray.join(" and ");
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions},
	      dataType: 'json',
	      async: false,
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
	var conditions = conditionArray.join(" and ");
	//console.log("sql");
	//console.log(conditions);
	//开始传递条件，查询产品，需要后台对产品剔重
	$.ajax({
	      type: "POST",
	      url: ctx + '/consultInfoManage/findProductOption',
	      data: {"conditions":conditions},
	      dataType: 'json',
	      async: false,
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
/**
 * 时间格式化 没有时分秒
 */
function dateForMat(val){
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
}