<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/serviceCenter/css/BizBussinessScale.css">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="pull-right margin-right-15">
						   <c:if test="${sessionScope.certificateEntry eq '1' }">
								<button id="add" class="btn increase form-control" data-toggle="modal" 
									data-backdrop="static" data-target=".asingleEntry"><i class="fa fa-plus"></i> 新增
								</button>
							</c:if>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="Bussiness1">
								<thead>
									<tr role="row" class="text-center">
										<th>学员类型</th>
										<th>月份</th>
										<th>学杂/培训费</th>
										<th>考试/考务费</th>
										<th>资料费</th>
										<th>教材/协议费</th>
										<th>代管/教材费</th>
										<th>辅导/服务费</th>
										<th>最小值</th>
										<th>最大值</th>
										<th>创业类型</th>
										<th>分校</th>
										<th>项目</th>
										
									</tr>
								</thead>
								<tbody>
									 
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade asingleEntry" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button> 
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal Bussiness" id="Bussiness" >
				<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">学员类型</label>
						<div class="pull-left col-md-9 col-sm-9 no-padding-right">
							<select class="form-control" name="typeId"></select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">分校</label>
						<div class="pull-left col-md-9 col-sm-9 no-padding-right">
							<select name="departmentId" class="selectpicker form-control campus" multiple title="--请选择--"></select>											            
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">项目</label>
						<div class="pull-left col-md-9 col-sm-9 no-padding-right">
							<select name="projectId" class="selectpicker form-control project" multiple title="--请选择--"></select>											            
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">创业类型</label>
						<div class="pull-left col-md-9 col-sm-9 no-padding-right">
							<select class="form-control" name="businessType">
								<option >--请选择--</option>
								<option value="1">大创业</option>
								<option value="2">小创业</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">	
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">月份</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
						    <div class="input-group">
						   		<input type="text" class="form-control monthScale" name="monthScale">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
						</div>

					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">培训费</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="payPx">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">考务费</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="payKw">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">资料费</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="payZl">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">协议费</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="payXy" >
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">教材费</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="payJc" >
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">服务费</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="payFw" >
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">最小值</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="minScale">
						</div>
					</div>
					<div class="form-group col-sm-6">	
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">最大值</label>
						<div class="col-md-9 col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="maxScale">
						</div>
					</div>
				
					
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">确定</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script>
//初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#Bussiness1').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/toBussiness/load',
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
        		               {"mData": "typeName", 'sClass': "text-center"},
        		               {"mData": "monthScale", 'sClass': "text-center"},
        			            {"mData": "payPx", 'sClass': "text-center"},
        			            {"mData": "payKw", 'sClass': "text-center"},
        			            {"mData": "payZl", 'sClass': "text-center"},
        			            {"mData": "payXy", 'sClass': "text-center"},
        			            {"mData": "payJc", 'sClass': "text-center"},
        			            {"mData": "payFw", 'sClass': "text-center"},
        			            {"mData": "minScale", 'sClass': "text-center"},
        			            {"mData": "maxScale", 'sClass': "text-center"},
        			            {"mData": "businessType", 'sClass': "text-center"},
        			            {"mData": "fullName", 'sClass': "text-center"},
        			            {"mData": "shortName", 'sClass': "text-center"},
        			          
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
         		   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
        		   	    	if(aData.businessType=='1'){
        		   	    		$('td:eq(10)',nRow).html('大创业');
        		   	    	}else if(aData.businessType=='2'){
        		   	    		$('td:eq(10)',nRow).html('小创业');
        		   	    	}
        		   	    	return nRow;
        		   	     },
         		   	    
			})
			
			 //每页显示记录数
			 $('#Bussiness1_wrapper .dataTables_info').parent().append($('#Bussiness1_wrapper .dataTables_length'));
			
			 //横线滚动条
			$("#Bussiness1_wrapper").on('scroll',function(){
				$('#Bussiness1_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			}) 
		}
	}
}();
</script>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

<!-- 下拉框插件 -->
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/BizBussinessScale.js"></script>


