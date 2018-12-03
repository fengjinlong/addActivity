<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="${ctx_static }/home/serviceCenter/css/certificate.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">证书管理</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12  no-padding-right no-padding-left pull-left">
							<label class="control-label text-left pull-left margin-left-20">发证日期</label>
							<div class="col-sm-9 col-md-9 col-lg-9">
								<div class="controls">
									<div class="input-group date">
										<input class="form-control active" id="DateCertificate" type="text"> <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-5 col-sm-5 col-xs-12 no-padding-left">
							<div class="form-group col-md-9 col-sm-9 col-lg-9 no-margin-right">
								<input class="form-control" placeholder="学员编号/项目/级别/姓名/电话/证书编号" type="text" id="searchVal">
							</div>
							<div class="form-group col-md-3 col-sm-3 col-lg-3">
								<a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
								<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
							<!-- <div class="col-sm-5 col-sm-offset-2">
								<button class="btn btn-info col-sm-4 form-control"
									data-toggle="modal" data-backdrop="static"
									data-target=".bulkImport">批量导入</button>
							</div> -->
							<div class="pull-right">
							   <c:if test="${sessionScope.certificateEntry eq '1' }">
								<button class="btn increase form-control" data-toggle="modal" 
									data-backdrop="static" data-target=".asingleEntry">单一录入
								</button></c:if>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer" id="certificate">
								<thead>
									<tr role="row" class="text-center">
										<th>发证日期</th>
										<th>学员编号</th>
										<th>姓名</th>
										<th>电话</th>
										<th>项目</th>
										<th>级别</th>
										<th>证书编号</th>
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
<%@ include file="../common/public_footer.jsp"%>

<!--单一录入-->
<div class="modal fade asingleEntry" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">单一录入</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal repeatedPhone" id="repeatedPhone" enctype="multipart/form-data">
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">项目</label>
						<div class="pull-left col-md-9 col-sm-9">
							<select type="tel" class="form-control" name="projectId"></select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">级别</label>
						<div class="pull-left col-md-9 col-sm-9">
							<select type="tel" class="form-control" name="levelId"></select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">身份证号</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="idCard">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">姓名</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="name" readonly="readonly">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">电话</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="phone" readonly="readonly">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">学员编号</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="serialNumber" readonly="readonly">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">证书名称</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="certificateName">
						</div>
					</div>
					<div class="form-group col-sm-6">	
						<label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">证书编号</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="certificateNumber">
						</div>
					</div>
					<div class="form-group col-md-12 col-sm-12">
						<!-- <div class="pull-left col-md-10 col-sm-9">-->
						<label class="control-label col-md-1 col-sm-3 no-padding-right margin-left">图片</label>
						<div class="col-md-10 chose-file no-padding-right" style="width:86%">
						<!-- <form enctype="multipart/form-data"> 
							<input id="asingle-upload" name="picture" type="file" multiple class="file-loading">
						</form> -->
						</div>
					</div>
					<div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label pull-left" style="margin-left:43px;">备注<span id="talk"> </span></label>
                        <div class="col-sm-10 no-padding-right" style="width:86%"> 
                        
                           <!-- 富文本编辑器 -->
						  <textarea name="conversation" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          
                          <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="conversation"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 
								});
							});
                          </script>                           
                    </div>
                    </div>
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn">确定</button>
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

<!-- 批量导入 -->
<div class="modal fade bulkImport" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">批量导入</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="bulkImport" enctype="multipart/form-data">
					<div class="form-group col-md-12 col-sm-12 Bulkimport">
						<label class="control-label">批量导入<a href="#">（模板下载）:</a></label>
					</div>
					<div class="form-group col-md-12 col-sm-12">
						<label class="control-label">
							<div class="col-md-12">
								<input id="bulk-upload" name='' type="file" multiple class="file-loading">
							</div>
						</label>
					</div>
					<div class="form-group col-md-12 col-sm-12">
						<table
							class="table table-striped table-hover table-bordered dataTable no-footer">
							<thead>
								<tr role="row" class="text-center">
									<th>学员编号</th>
									<th>姓名</th>
									<th>项目</th>
									<th>级别</th>
									<th>身份证号</th>
									<th>发证时间</th>
									<th>证书名称</th>
									<th>证书编号</th>
									<th>备注</th>
								</tr>
							</thead>

							<tbody>
							</tbody>
						</table>
					</div>
					<div class="form-group col-md-12 col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-5">
							<button type="submit"
								class="btn btn-info form-control creation-btn"
								data-toggle="modal" data-backdrop="static">确定</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>



<!--编辑-->
<div class="modal fade certificateEditing" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="certificateEditing" enctype="multipart/form-data">
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">项目</label>
						<div class="pull-left col-md-9 col-sm-9">
							<select type="tel" class="form-control" name="projectId"></select>
						</div>
					</div>
					<input type="hidden"  name="certificateId" class="form-control"></input>
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">级别</label>
						<div class="pull-left col-md-9 col-sm-9">
							<select type="tel" class="form-control" name="levelId"></select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">身份证号</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="idCard">
						</div>
					</div>
					
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">姓名</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="name" readonly="readonly">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">电话</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="phone" readonly="readonly">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">学员编号</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="serialNumber" readonly="readonly">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">证书名称</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="certificateName">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label
							class="control-label col-md-2 col-sm-3 no-padding-right margin-left">证书编号</label>
						<div class="pull-left col-md-9 col-sm-9">
							<input type="tel" class="form-control" name="certificateNumber">
						</div>
					</div>
					<div class="form-group col-md-12 col-sm-12">
						<!-- <div class="pull-left col-md-10 col-sm-9">-->
						<label
							class="control-label col-md-1 col-sm-3 no-padding-right margin-left">图片</label>
						<div class="col-md-10 chose-file">
							<input id="edit-upload" name="picture" type="file" multiple
								class="file-loading">
						</div>
						<!-- </div>-->
					</div>
					<div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label col-md-2 no-padding-right" style="margin-left:-69px;">备注<span id="talk"> </span></label>
                        <div class="col-sm-10">
                        
                           <!-- 富文本编辑器 -->
						  <textarea name="conversation2" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          
                          <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('textarea[name="conversation2"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 
								});
							});
                          </script>                           
                    </div>
                    </div>
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit"
								class="btn btn-primary form-control creation-btn"
								data-toggle="modal" data-backdrop="static">确定</button>
						</div>
						
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
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
			var Table = $('#certificate').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/certificate/load',
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
        			            {"mData": "serialNumber", 'sClass': "text-center"},
        			            {"mData": "name", 'sClass': "text-center"},
        			            {"mData": "phone", 'sClass': "text-center"},
        			            {"mData": "bizProject.fullName", 'sClass': "text-center"},
        			            {"mData": "bizProjectLevel.levelTitle", 'sClass': "text-center"},
        			            {"mData": "certificateNumber", 'sClass': "text-center"},
        			            {
        			                "mData": "certificateId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var u = '<shiro:hasPermission name="bizExaminationFee:edit"><a href="javascript:;" onclick="edit(\''+full["certificateId"]
        			                    +'\',\''+full["projectId"]
        			                    +'\',\''+full["levelId"]
        			                    +'\',\''+full["idCard"]
        			                    +'\',\''+full["name"]
        			                    +'\',\''+full["phone"]
        			                    +'\',\''+full["serialNumber"]
        			                    +'\',\''+full["certificateName"]
        			                    +'\',\''+full["certificateNumber"]
        			                    //+'\',\''+full["certificateNumber"]
        			                    +'\',\''+full["conversation"]+'\')" class="edit" data-target=".certificateEditing" data-toggle="modal" data-backdrop="static"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
        			                    var d ='<shiro:hasPermission name="bizExaminationFee:edit"><a href="javascript:;" class="delete" onclick="deleteCertificate(\''+full["certificateId"]+'\')"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></td></shiro:hasPermission>';
        			                    return u+d;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})
			 //每页显示记录数
			 $('#certificate_wrapper .dataTables_info').parent().append($('#certificate_wrapper .dataTables_length'));
			
			 //横线滚动条
			$("#certificate_wrapper").on('scroll',function(){
				$('#certificate_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		}
	}
}();
</script>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>
<!-- 下拉框插件 -->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/certificate.js"></script>
