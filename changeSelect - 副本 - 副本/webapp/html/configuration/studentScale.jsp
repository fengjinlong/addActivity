<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.css">
<link href="${ctx_static }/dep/chosen/css/chosen.css" rel="stylesheet">
<link href="${ctx_static }/home/configuration/css/studentScale.css" rel="stylesheet">

<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons">
				</div>
				<!--Widget Buttons-->
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-5 col-sm-5 col-xs-12">
							<div class="form-group">
								<label class="control-label pull-left margin-left-20">起止日期</label>
								<div class="col-md-9 col-sm-9">
									<div class="controls">
										<div class="input-group date">
											<input type="text" class="form-control duration" aceholder="请选择日期" id="duration"><span class="input-group-addon"><i class="fa fa-calendar"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-9 col-sm-4 no-margin-right">
								<input class="form-control" placeholder="分成学员类型" type="text" id="searchVal">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<a type="button" class="btn btn-blue search-btn" href="javascript:DataTable.init();">
									<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12 btn-group">  
							<span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> 导出 <i class="fa fa-angle-up"></i>
								</button>
								<ul class="dropdown-menu" role="menu">
									<li><a href="#">保存PDF</a></li>
									<li><a href="#">导出EXCEL</a></li>
									<li><a href="#">导出CSV</a></li>
								</ul>
							</div>
							<button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-target=".studentScaleAdd" data-backdrop="static"> 
							 	<i class="fa fa-plus"></i> 新增
							</button>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="financeBusinessScale">
								<thead>
									<tr role="row">
										<th>分成学员类型</th>
										<th>项目类型</th>
										<th>项目</th>
										<th>项目级别</th>
										<th>授课形式</th>
										<th>班型</th>
										<th>教育形式</th>
										<th>院校</th>
										<th>专业</th>
										<th>状态</th>
										<th>起始日期</th>
										<th>截止日期</th>
										<th>操作</th>
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
<!--新增-->
<div class="modal fade studentScaleAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="studentScaleAdd">
				 	<div class="form-group col-md-6">
						<label class="control-label no-padding-right col-md-3">分成学员类型</label>
						<div class="col-md-9 col-sm-9">
							<select name="studentTypeId" class="form-control studentType chosen-select" data-placeholder="--请选择--" tabindex="1">
							</select>
						</div>
					</div>
					<div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">名称</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="designation" class="form-control designation"></select>
                        </div>
                    </div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">培训费</label>
						<div class="col-md-9 col-sm-9">
							<input name="trainingFees" class="form-control trainingFees">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">考务费</label>
						<div class="col-md-9 col-sm-9">
							<input name="affairFee" class="form-control affairFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">资料费</label>
						<div class="col-md-9 col-sm-9">
							<input name="datumFee" class="form-control datumFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">协议费</label>
						<div class="col-md-9 col-sm-9">
							<input name="agreementFee" class="form-control agreementFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">教材费</label>
						<div class="col-md-9 col-sm-9">
							<input name="textbookFee" class="form-control textbookFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">服务费</label>
						<div class="col-md-9 col-sm-9">
							<input name="serviceFee" class="form-control serviceFee">
						</div>
					</div>
					<div class="form-group col-md-12">
						<label class="control-label no-padding-right col-md-2"
							style="margin-left: -40px;">起止日期</label>
						<div class="col-md-10 col-sm-10">
							<div class="controls">
								<div class="input-group date">
									<input type="text" name="" class="form-control duration" placeholder="请选择日期"> <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-md-12">
						<label class="control-label no-padding-right col-md-2" style="margin-left: -40px;">备注</label>
						<div class="col-md-10 col-sm-10">
							<textarea name="content" class="form-control remark" style="width: 668px; height: 340px"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('#studentScaleAdd textarea[name="content"]',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0,
										afterBlur: function(){this.sync();}
									});
								});
                          	</script> 
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control confirm-btn" data-toggle="modal" data-backdrop="static">确定</button>
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

<!--查看-->
<div class="modal fade studentScaleView" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="studentScaleView">
					<div class="form-group col-md-6">
						<label class="control-label no-padding-right col-md-3">分成学员类型</label>
						<div class="col-md-9 col-sm-9">
							<select name="studentTypeId" class="form-control studentType chosen-select" data-placeholder="--请选择--" tabindex="1" disabled>
							</select>
						</div>
					</div>
					<div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">名称</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="designation" class="form-control designation" disabled></select>
                        </div>
                    </div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">培训费</label>
						<div class="col-md-9 col-sm-9">
							<input name="trainingFees" class="form-control trainingFees" disabled>
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">考务费</label>
						<div class="col-md-9 col-sm-9">
							<input name="affairFee" class="form-control affairFee" disabled>
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">资料费</label>
						<div class="col-md-9 col-sm-9">
							<input name="datumFee" class="form-control datumFee" disabled>
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">协议费</label>
						<div class="col-md-9 col-sm-9">
							<input name="agreementFee" class="form-control agreementFee" disabled>
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">教材费</label>
						<div class="col-md-9 col-sm-9">
							<input name="textbookFee" class="form-control textbookFee" disabled>
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">服务费</label>
						<div class="col-md-9 col-sm-9">
							<input name="serviceFee" class="form-control serviceFee" disabled>
						</div>
					</div>
					<div class="form-group col-md-12">
						<label class="control-label no-padding-right col-md-2"
							style="margin-left: -40px;">起止日期</label>
						<div class="col-md-10 col-sm-10">
							<div class="controls">
								<div class="input-group date">
									<input type="text" name="duration"
										class="form-control duration" placeholder="请选择日期" disabled>
									<span class="input-group-addon"><i
										class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-md-12">
						<label class="control-label no-padding-right col-md-2"
							style="margin-left: -40px;">备注</label>
						<div class="col-md-10 col-sm-10">
							<textarea name="viewRemark" class="form-control viewRemark"
								style="width: 668px; height: 340px"></textarea>
								<script>
									$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
										KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
										editor = KindEditor.create('textarea[name="viewRemark"]',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){this.sync();}
										});
									});
                          		</script> 
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--编辑-->
<div class="modal fade studentScaleEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="studentScaleEdit">
					<div class="form-group col-md-6">
						<label class="control-label no-padding-right col-md-3">分成学员类型</label>
						<div class="col-md-9 col-sm-9">
							<select name="studentTypeId" class="form-control studentType chosen-select" data-placeholder="--请选择--" tabindex="1">
							</select>
						</div>
					</div>
					<div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">名称</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="designation" class="form-control designation"></select>
                        </div>
                    </div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">培训费</label>
						<div class="col-md-9 col-sm-9">
							<input name="trainingFees" class="form-control trainingFees">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">考务费</label>
						<div class="col-md-9 col-sm-9">
							<input name="affairFee" class="form-control affairFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">资料费</label>
						<div class="col-md-9 col-sm-9">
							<input name="datumFee" class="form-control datumFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">协议费</label>
						<div class="col-md-9 col-sm-9">
							<input name="agreementFee" class="form-control agreementFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">教材费</label>
						<div class="col-md-9 col-sm-9">
							<input name="textbookFee" class="form-control textbookFee">
						</div>
					</div>
					<div class="form-group col-md-6">	
						<label class="control-label no-padding-right col-md-3">服务费</label>
						<div class="col-md-9 col-sm-9">
							<input name="serviceFee" class="form-control serviceFee">
						</div>
					</div>
					<div class="form-group col-md-12">
						<label class="control-label no-padding-right col-md-2"
							style="margin-left: -40px;">起止日期</label>
						<div class="col-md-10 col-sm-10">
							<div class="controls">
								<div class="input-group date">
									<input type="text" name="duration" class="form-control duration" placeholder="请选择日期"> <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-md-12">
						<label class="control-label no-padding-right col-md-2"
							style="margin-left: -40px;">备注</label>
						<div class="col-md-10 col-sm-10">
								<textarea name="remarkEdit" class="form-control remarkEdit" name="" style="width: 668px; height: 340px"></textarea>
								<script>
									$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
										KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
										editor = KindEditor.create('textarea[name="remarkEdit"]',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){this.sync();}
										});
									});
                          		</script> 
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control confirm-btn" data-toggle="modal" data-backdrop="static">确定</button>
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

<script type="text/javascript">
//初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#financeBusinessScale').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 15,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/financeBusinessScale/load',
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
        			            {"mData": "financeBusinessStudentType.typeName", 'sClass': "text-center"},
        			            {"mData": "projectType", 'sClass': "text-center"},
        			            {"mData": "bizProject.fullName", 'sClass': "text-center"},
        			            {"mData": "bizProjectLevel.levelTitle", 'sClass': "text-center"},
        			            {"mData": "bizProjectLevel.teachType", 'sClass': "text-center"},
        			            {"mData": "className", 'sClass': "text-center"},
        			            {"mData": "eduForm", 'sClass': "text-center"},
        			            {"mData": "bizSchool.schoolName", 'sClass': "text-center"}, 
        			            {"mData": "majorName", 'sClass': "text-center"},
        			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
          			            	if(data==0){
            			          		  return '<span id="span'+full["scaleId"]+'" onclick="chooseStudent(\''+full["scaleId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
            			          	  }else{
            			          		  return '<span id="span'+full["scaleId"]+'" onclick="chooseStudent(\''+full["scaleId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
            			          	  }
            			            } },
        			            {"mData": "bDate", 'sClass': "text-center"},
        			            {"mData": "eDate", 'sClass': "text-center"},
        			            {
        			                "mData": "scaleId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var c ='<a href="#" class="view" data-toggle="modal" data-target=".studentScaleView" data-backdrop="static" onclick="view(\''+full["scaleId"]+'\')"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a> ';
        			                    var u ='<a href="#" class="edit" data-toggle="modal" data-target=".studentScaleEdit" data-backdrop="static" onclick="update(\''+full["scaleId"]+'\')"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
        			                    var d ='<a href="#" class="delete" data-toggle="modal" data-target=".studentScaleDelete" data-backdrop="static" onclick="deleteStudent(\''+full["scaleId"]+'\')"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
        			                    return c+u+d;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
         		   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	         		   	    if(aData.projectType=='1'){
	        	   	    		$('td:eq(1)',nRow).html('职业资格');
	        	   	    	}else if(aData.projectType=='2'){
	        	   	    		$('td:eq(1)',nRow).html('学历');
	        	   	    	}
		         		   	if(aData.eduForm=='1'){
	        	   	    		$('td:eq(6)',nRow).html('成考');
	        	   	    	}else if(aData.eduForm=='2'){
	        	   	    		$('td:eq(6)',nRow).html('自考');
	        	   	    	}else if(aData.eduForm=='3'){
	        	   	    		$('td:eq(6)',nRow).html('远程');
	        	   	    	}else if(aData.eduForm=='0'){
	        	   	    		$('td:eq(6)',nRow).html('无');
	        	   	    	}
		         		   	if(aData.className=='--请选择--'){
		         		   		$('td:eq(5)',nRow).html('无');
		         		   	}
		         		   if(aData.schoolId==null){
		         		   		$('td:eq(7)',nRow).html('无');
		         		   	}
		         		   if(aData.majorName=='--请选择--'){
		         		   		$('td:eq(8)',nRow).html('无');
		         		   	}
		         		  	if(aData.bizProjectLevel.teachType=='1'){
		         		   		$('td:eq(4)',nRow).html('面授');
		         		   	}else if(aData.bizProjectLevel.teachType=='2'){
		         		   		$('td:eq(4)',nRow).html('直播');
		         		   	}else if(aData.bizProjectLevel.teachType=='3'){
		         		   		$('td:eq(4)',nRow).html('录播');
		         		   	} 
         		   	    	return nRow;
         		   	    }
			})
			$("#financeBusinessScale_wrapper").removeClass();
		    $('#financeBusinessScale_wrapper').addClass("table-scrollable");
		    //每页显示记录数
		    $('#financeBusinessScale_wrapper .dataTables_info').parent().append($('#financeBusinessScale_wrapper .dataTables_length'));
		  	
		    //横线滚动条
			$("#financeBusinessScale_wrapper").on('scroll',function(){
				$('#financeBusinessScale_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		}
	}
}();
</script>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<!--下拉框插件-->
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<!--富文本编辑器-->
<script src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script src="${ctx_static }/home/configuration/js/studentScale.js"></script>

