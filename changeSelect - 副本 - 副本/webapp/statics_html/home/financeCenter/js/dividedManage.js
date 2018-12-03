var DEPSTR;
var DEPID;
var DATESTR;
var REPID;
$(function(){
	init();
	queryDep();
     //初始化日期
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm',
        language: 'zh-CN',
        autoclose: true,
        startView: 3,
        minView: 3
    });
    //富文本框
    KindEditor.create('.content');
    //初始化下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '请选择'
    });
    // 增加服务
    $('.adjustment-box').on('click', 'table .aaa', function(){
        var trHtml = `
                <tr class="newly-increased">
                <td colspan="5"></td>
                <td>
                    <a href="javascript:void(0);" class="btn btn-default shiny" style="margin:5px 0 5px 0">线上推广</a>
                    <a href="javascript:void(0);" class="btn btn-default shiny" style="margin:5px 0 5px 0">咨询沟通</a>
                    <a href="javascript:void(0);" class="btn btn-default shiny" style="margin:5px 0 5px 0">接待学员</a>
                </td>
                <td>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="margin:5px 0 5px 0">
                        <select class="form-control selectpicker" onchange="depSel1(this)" multiple>
                            ${DEPSTR}
                        </select>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="margin:5px 0 5px 0">
                        <select class="form-control selectpicker" onchange="depSel2(this)" multiple>
                            ${DEPSTR}
                        </select>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="margin:5px 0 5px 0">
                        <select class="form-control selectpicker" onchange="depSel3(this)" multiple>
                            ${DEPSTR}
                        </select>
                    </div>
                </td>
                <td>
                    0
                    <p>(0%)</p>
                </td>
                <td>
                    0
                    <p>(0%)</p>
                </td>
                <td>
                    0
                    <p>(0%)</p>
                </td>
                <td>
                    0
                    <p>(0%)</p>
                </td>
                <td>
                    <select class="form-control">
                        <option value="1">上调</option>
                        <option value="2">下降</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control" value="0.00%">
                </td>
                <td>
                    <input type="text" class="form-control" value="0.00%">
                </td>
                <td>
                    0
                </td>
                <td>
                    <label class="control-label no-padding-right">
                        <a href="#" class="remove-profession aaa red" style="font-size:16px">
                            <i class="glyphicon glyphicon-minus-sign"></i>
                        </a>
                    </label>
                </td>
            </tr>
        `
        if($(this).is('.add-profession')){
            $(this).parent().parent().parent().after(trHtml);
        }

        if($(this).is('.remove-profession')){
            $(this).parent().parent().parent('.newly-increased').remove();
        }


        $('.selectpicker').selectpicker({
            'noneSelectedText': ''
        });
        
        
    })
    
     $('#myTable').on('click', '.add', function(){
    	 var _this=this;
    	 DEPID=$(_this).attr("data-depId");
    	 DATESTR=$(_this).attr("data-dataStr");
    	 REPID=$(_this).attr("data-repId");
    	 //查询所有模型
    	 $.post(ctx + '/financeReportCenterController/queryModel',{
    		 departmentId:$(_this).attr("data-depId"),
    		 dateStr:$(_this).attr("data-dataStr")
    	 },function(data){
    		 if(data.status=='success'){
    			 var str='';
    			 $.each(data.data,function(index,obj){
    				 str+='<tr class="old-increased">'
                         +'<td data-proModId="'+obj.productModelId+'">'+obj.productModelName+'</td>'
                         +'<td>'+(obj.zixunNum==null?0:obj.zixunNum)+'</td>'
                         +'<td>'+(obj.money==null?0:obj.money)+'</td>'
                         +'<td>'+(obj.shouyiPay==null?0:obj.shouyiPay)+'</td>'
                         +'<td>'+(obj.zhichuPay==null?0:obj.zhichuPay)+'</td>'
                         +'<td>'
                         +'    <a href="javascript:void(0);" class="btn btn-default shiny" style="margin:5px 0 5px 0">线上推广</a>'
                         +'    <a href="javascript:void(0);" class="btn btn-default shiny" style="margin:5px 0 5px 0">咨询沟通</a>'
                         +'    <a href="javascript:void(0);" class="btn btn-default shiny" style="margin:5px 0 5px 0">接待学员</a>'
                         +' </td>'
                         +' <td>'
                         +'     <div class="col-lg-12 col-md-12 col-sm-12" style="margin:5px 0 5px 0">'
                         +'        <select class="form-control selectpicker"  onchange="depSel1(this)" multiple>'
                         +				DEPSTR
                         +'        </select>'
                         +'     </div>'
                         +'     <div class="col-lg-12 col-md-12 col-sm-12" style="margin:5px 0 5px 0">'
                         +'         <select class="form-control selectpicker" onchange="depSel2(this)" multiple>'
                         +         	    DEPSTR
                         +'        </select>'
                         +'    </div>'
                         +'    <div class="col-lg-12 col-md-12 col-sm-12" style="margin:5px 0 5px 0">'
                         +'        <select class="form-control selectpicker" onchange="depSel3(this)" multiple>'
                         + 				DEPSTR
                         +'        </select>'
                         +'    </div>'
                         +' </td>'
                         +'<td>'
                         +'    0'
                         +'    <p>(0%)</p>'
                         +'</td>'
                         +'<td>'
                         +'     0'
                         +'     <p>(0%)</p>'
                         +' </td>'
                         +'<td>'
                         +'    0'
                         +'     <p>(0%)</p>'
                         +' </td>'
                         +' <td>'
                         +'     0'
                         +'      <p>(0%)</p>'
                         +'  </td>'
                         +' <td>'
                         +'     <select class="form-control">'
                         +'          <option value="1">上调</option>'
                         +'          <option value="2">下降</option>'
                         +'      </select>'
                         +' </td>'
                         +' <td>'
                         +'     <input type="text" class="form-control" value="0.00">%'
                         +'  </td>'
                         +' <td>'
                         +'     <input type="text" class="form-control" value="0.00">%'
                         +'  </td>'
                         +'  <td>'
                         +'     0'
                         +' </td>'
                         +'  <td>'
                         +'    <label class="control-label no-padding-right">'
                         +'         <a href="#" class="add-profession aaa blue" style="font-size:16px">'
                         +'             <i class="glyphicon glyphicon-plus-sign"></i>'
                         +'         </a>'
                         +'     </label>'
                         +' </td>'
                         +'</tr>'
    			 })
    			 $("#modelTbody").html(str);
    			 $(".selectpicker").selectpicker('refresh');
    			 console.log("aaa")
    		 }else{
    			 swal("","查询产品模型错误","error")
    		 }
    	 },"json")
     })
     $('#myTable').on('click', '.edit', function(){
    	 
     })

})

  /**
   * 初始化
   * @returns
   */
  function init() {
      var init = $('#myTable').dataTable({
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
          "sAjaxSource": ctx + '/financeReportCenterController/load',
          "bDestroy": true,
          "bRetrieve": false,
          "bServerSide": true,
          "fnServerData": initData,
          "aoColumns": [
              {"mDataProp": "checkbox",'sClass': "text-center", "mRender": function (data, type, full) {
                  return '<label><input type="checkbox"><span class="text"></span></label> '
              }},
              {"mDataProp": "departmentName",'sClass': "text-center"},
              {"mDataProp": "repotMonth",'sClass': "text-center"},
              {"mDataProp": "schoolFee",'sClass': "text-center"},
              {"mDataProp": "adjustmentFee",'sClass': "text-center", "mRender": function (data, type, full) {
            	  if(full['financeReportDividedId']!=null){
            		  return full['adjustmentFee'];
            	  }else{
            		  return '0'; 
            	  }
              }},
              {"mDataProp": "schoolFee",'sClass': "text-center", "mRender": function (data, type, full) {
            	  if(full['financeReportDividedId']!=null){
            		  return (full['schoolFee']+full['adjustmentFee']);
            	  }else{
            		  return full['schoolFee'];
            	  }
              }},
              {"mDataProp": "correctRate",'sClass': "text-center", "mRender": function (data, type, full) {
            	  var str='';
            	  if(full['financeReportDividedId']!=null){
            		  str=' <a href="#" data-repId="'+full['reportId']+'" data-depId="'+full['departmentId']+'" data-dataStr="'+full['repotMonth']+'" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".adjustment" data-backdrop="static">'
                          +'<i class="fa fa-edit"></i>'
                         +' 调整'
                      +'</a>'
            	  }else{
            		  str=' <a href="#" data-repId="'+full['reportId']+'" data-depId="'+full['departmentId']+'" data-dataStr="'+full['repotMonth']+'" class="btn btn-info btn-xs add" data-toggle="modal" data-target=".adjustment" data-backdrop="static">'
                          +'<i class="fa fa-edit"></i>'
                         +' 调整'
                      +'</a>'
            	  }
                  return str;
              }},
          ],

          "aoColumnDefs": [{
              sDefaultContent: '',
              aTargets: ['_all']
          }]
      });
      $("#myTable_wrapper").removeClass();
      $('#myTable_wrapper').addClass("table-scrollable");
       //每页显示记录数
      $('#myTable_wrapper .dataTables_info').parent().append($('#myTable_wrapper .dataTables_length'));
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
      aoData.push({"name": "repotMonth", "value":$("#dat").val()});
      aoData.push({"name": "departmentId", "value":$("#dep").val()});
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
function queryDep(){
	$.ajax({
	    url: ctx + '/financeReportCenterController/queryDep',
	    async: false,
	    dataType:"json",
	    success: function(data) {
	    	if(data.status=='success'){
				var str1='<option value="">请选择</option>';
				var str2='';
				$.each(data.data,function(index,obj){
					str2+='<option value="'+obj.departmentId+'">'+obj.fullName+'</option>'
				})
				$("#dep").html(str1+str2);
				DEPSTR=str2;
			}else{
				swal("","查询合作方失败","error")
			}
	    }
	});
}

function depSel1(obj){
	var _this1=obj;
	//var _this2=$(_this1).prev();
	var _this2=$(_this1).parent().parent().next().children().eq(0).children().eq(2);
	var _this3=$(_this1).parent().parent().next().next().children().eq(0).children().eq(2);
	var depId1=[];
	var depId2=[];
	var depId3=[];
	if($(_this1).val()!=null){
		depId1=$(_this1).val()
	}
	if($(_this2).val()!=null){
		depId2=$(_this2).val()
	}
	if($(_this3).val()!=null){
		depId3=$(_this3).val()
	}
	queryByDepSel(depId1,depId2,depId3,obj);
}
function depSel2(obj){
	var _this2=obj;
	var _this1=$(_this2).parent().parent().prev().children().eq(0).children().eq(2);
	var _this3=$(_this2).parent().parent().next().children().eq(0).children().eq(2);
	var depId1=[];
	var depId2=[];
	var depId3=[];
	if($(_this1).val()!=null){
		depId1=$(_this1).val()
	}
	if($(_this2).val()!=null){
		depId2=$(_this2).val()
	}
	if($(_this3).val()!=null){
		depId3=$(_this3).val()
	}
	queryByDepSel(depId1,depId2,depId3,obj);
}
function depSel3(obj){
	var _this3=obj;
	var _this2=$(_this3).parent().parent().prev().children().eq(0).children().eq(2);
	var _this1=$(_this3).parent().parent().prev().prev().children().eq(0).children().eq(2);
	var depId1=[];
	var depId2=[];
	var depId3=[];
	if($(_this1).val()!=null){
		depId1=$(_this1).val()
	}
	if($(_this2).val()!=null){
		depId2=$(_this2).val()
	}
	if($(_this3).val()!=null){
		depId3=$(_this3).val()
	}
	queryByDepSel(depId1,depId2,depId3,obj);
}
function queryByDepSel(depId1,depId2,depId3,obj){
	var depIdStr1="";
	var depIdStr2="";
	var depIdStr3="";
	if(depId1.length==0){
		depIdStr1="''"
	}else{
		$.each(depId1,function(index,str){
			depIdStr1+="'";
			depIdStr1+=str;
			depIdStr1+="'";
			if(index!=depId1.length-1){
				depIdStr1+=",";
			}
		})
	}
	if(depId2.length==0){
		depIdStr2="''"
	}else{
		$.each(depId2,function(index,str){
			depIdStr2+="'";
			depIdStr2+=str;
			depIdStr2+="'";
			if(index!=depId2.length-1){
				depIdStr2+=",";
			}
		})
	}
	if(depId3.length==0){
		depIdStr3="''"
	}else{
		$.each(depId3,function(index,str){
			depIdStr3+="'";
			depIdStr3+=str;
			depIdStr3+="'";
			if(index!=depId3.length-1){
				depIdStr3+=",";
			}
		})
	}
	var tr=$(obj).parent().parent().parent().parent();
	var departmentId='';
	var totalZixunNum=0;
	var totalShouyi=0;
	var totalZhichu=0;
	var totalMoney=0;
	while(true){
		if($(tr).is(".old-increased")){
			departmentId=$(tr).find('td').eq(0).attr("data-promodid");
			totalZixunNum=$(tr).find('td').eq(1).html();
			totalShouyi=$(tr).find('td').eq(2).html();
			totalZhichu=$(tr).find('td').eq(3).html();
			totalMoney=$(tr).find('td').eq(4).html();
			break ;
		}else{
			tr=$(tr).prev();
		}
	}
	$.post(ctx + '/financeReportCenterController/queryByDepSel',{
		departmentId1:depIdStr1,
		departmentId2:depIdStr2,
		departmentId3:depIdStr3,
		productModelId:departmentId,
		dateStr:DATESTR,
		departmentId:DEPID
	},function(data){
		if(data.status=='success'){
			var shouyi=0;
			var zhichu=0;
			var zixunNum=0;
			var money=0;
			$.each(data.data,function(index,val){
				console.log(val)
				zixunNum=val.zixunNum;
				money=val.money;
				shouyi+=val.shouyiPay;
				zhichu+=val.zhichuPay;
			})
			console.log(zixunNum)
			console.log(money)
			console.log(shouyi)
			console.log(zhichu)
			if(zixunNum==0){
				zixunNum="0<p>(0%)</p>";
			}else{
				zixunNum=zixunNum+"<p>("+zixunNum/totalZixunNum+")</p>";
			}
			if(money==0){
				money="0<p>(0%)</p>";
			}else{
				money=money+"<p>("+money/totalMoney+")</p>";
			}
			if(shouyi==0){
				shouyi="0<p>(0%)</p>";
			}else{
				shouyi=shouyi+"<p>("+shouyi/totalShouyi+")</p>";
			}
			if(zhichu==0){
				zhichu="0<p>(0%)</p>";
			}else{
				zhichu=zhichu+"<p>("+zhichu/totalZhichu+")</p>";
			}
			$(obj).parent().parent().parent().next().html(zixunNum);
			$(obj).parent().parent().parent().next().next().html(money);
			$(obj).parent().parent().parent().next().next().next().html(shouyi);
			$(obj).parent().parent().parent().next().next().next().next().html(zhichu);
		}else{
			swal("","查询合作方咨询量出错",'error');
		}
	},"json")
}
function addDivided(obj){
	if($(obj).attr("data-type")!='1'){
		return ;
	}
	$(obj).attr("data-type",'0');
	var financeReportDivided={};
	financeReportDivided["reportId"]=REPID;
	financeReportDivided["type"]=$("type").val();
	financeReportDivided["money"]=$("money").val();
	financeReportDivided["adjustmentFee"]=$("adjustmentFee").html();
	financeReportDivided["memo"]=$("memo").html();
	
}