<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/configuration/css/examSubject.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">扣费种类</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">	
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-4 col-sm-4 no-margin-right">
								<input type="text" class="form-control" placeholder="扣费名称" id="searchVal" onkeydown="search();">
							</div>
							<div
								class="form-group col-lg-5 col-md-5 col-sm-5 no-margin-right">
								<select id="enable" name="enable" class="form-control">
									<option value="">状态</option>
									<option value="0">禁用</option>
									<option value="1">启用</option>
								</select>
							</div>
							<div class="form-group col-lg-3 col-md-4 col-sm-4">
								 <!-- <button type="button" class="btn btn-blue form-control search-btn" >搜索</button>-->
								<a type="button" class="btn increase  form-control search-btn" Onclick="DataTable.init()" href="javaScritpt:;">
								<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						<div class="form-group col-lg-1 col-md-2 col-sm-2  pull-right margin-right-5">
							<button class="btn increase pull-right form-control addBtn" data-toggle="modal" data-target=".subjectAdd" data-backdrop="static">
								<i class="fa fa-plus"></i> 新增
							</button>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<table class="table table-striped table-hover table-bordered dataTable no-footer" id="moneyKind">
							<thead>
								<tr role="row">
									<th>扣费名称 </th>
									<th>状态 </th>
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
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade subjectAdd" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="subjectAdd" method="post">
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">扣费名称</label>
						<div class="col-sm-10">
							<input type="text" class="form-control examSName" name="productReturnFeeName">
						</div>
					</div>
					 <div class="form-group col-sm-12 activityType">
                        <label class="control-label col-sm-2 no-padding-right">说明</label>
                        <div class="col-sm-10">
                           <textarea class="form-control description" id="description" name="content" style="width: 100%; height: 340px;visibility:hidden;"></textarea> 
							
							<script>
									$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
										KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
										editor = KindEditor.create('textarea[name="content"]',{
											uploadJson:'${ctx }/file/uploadFile',
											allowFileManager : true,
											resizeType:0,
											afterBlur: function(){
												this.sync();
											}
										});
									});
							</script>
                        </div>
                    </div>
					<div class="form-group col-sm-12">
						<div class="col-sm-2 col-sm-offset-4"> <button type="submit" class="btn btn-primary btn-lg">确认 </button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--编辑-->
<div class="modal fade subjectEdit" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="subjectEdit" method="post">
				<input id="productReturnFeeId" type="hidden"/>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">扣费名称</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="productReturnFeeName">
						</div>
					</div>
					<div class="form-group col-sm-12 activityType">
                        <label class="control-label col-sm-2 no-padding-right">说明</label>
                        <div class="col-sm-10">
                           <textarea class="form-control description" rows="10"
								id="descriptionUpdate" name="description"
								style="width: 100%; height: 340px;"></textarea>
								
						 	<script>
						 	       var Editor = null;
									$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
										KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
										Editor = KindEditor.create('textarea[id="descriptionUpdate"]',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){
												this.sync();
											}
										});
									});
							</script>
                        </div>
                    </div>
					<div class="form-group col-sm-12">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary btn-lg editBtn">确认</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-lg"	data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- kindeditor -->
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>
<script src="${ctx_static }/home/product/js/productReturnFee.js?v<%=Math.random() %>"></script>


