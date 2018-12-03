<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/weight.css">
<div class="row page-wrapper">
	<div class="col-xs-12 col-md-12 department-list">
		<div class="widget">
			<div class="widget-header ">
				<span class="widget-caption"></span>
				<div class="widget-buttons">
				</div>
			</div>
			<div class="widget-body">
				<div class="row row_padding form-horizontal">
					<div class="col-md-6 col-sm-6 col-xs-12">
						<div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
							<input id="searchVal" type="text" class="form-control" placeholder="标题/权重值">
						</div>
						<div class="form-group col-lg-2 col-md-4 col-sm-4">
							<a type="button" class="btn btn-lightBlue form-control search-btn" href="javascript:init()">
							<i class="fa fa-search"></i> 搜索</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
						<button class="btn increase pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target=".addWeight">
							<i class="fa fa-plus"></i> 新增
						</button>
						
					</div>
				</div>
				<table class="table table-striped table-hover table-bordered dataTable no-footer" id="weight">
						<thead>
							<tr role="row">
								<th>标题</th>
								<th>权重值</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>标题1</td>
								<td>0.1</td>
								<td>
									<a class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".editWeight" data-backdrop="static"> <i class="fa fa-edit"></i> 编辑</a>
									<a class="btn btn-info btn-xs data-btn" data-toggle="modal" data-target=".dataPermission" data-backdrop="static">类型权限</a>
									<a class="btn btn-info btn-xs page-btn" data-toggle="modal" data-target=".pagePermission" data-backdrop="static">数据范围权限</a>
									<a class="btn btn-info btn-xs button-btn" data-toggle="modal" data-target=".buttonPermission" data-backdrop="static">按钮权限</a>
								</td>
							</tr>
							<tr>
								<td>标题2</td>
								<td>0.2</td>
								<td>
									<a class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".editWeight" data-backdrop="static"> <i class="fa fa-edit"></i> 编辑</a>
									<a class="btn btn-info btn-xs data-btn" data-toggle="modal" data-target=".dataPermission" data-backdrop="static">类型权限</a>
									<a class="btn btn-info btn-xs page-btn" data-toggle="modal" data-target=".pagePermission" data-backdrop="static">数据范围权限</a>
									<a class="btn btn-info btn-xs button-btn" data-toggle="modal" data-target=".buttonPermission" data-backdrop="static">按钮权限</a>
								</td>
							</tr>
						</tbody>
					</table>
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--新增权重-->
<div class="modal fade addWeight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="addWeight" method="post">  
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">标题
						<span class="control-label mandatory">*</span></label>
						<div class="col-sm-9">
							<input id="weightTitle" name="title" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">权重值
						<span class="control-label mandatory">*</span></label>
						<div class="col-sm-9">
							<input id="weightValue" name="weightValue" class="form-control">
						</div>
					</div>
					<div class="col-sm-12 modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
								<button type="submit" class="btn btn-primary form-control confirm-btn">确定</button>
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
<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index: 999999">
	<ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
</div>


<!--编辑权重-->
<div class="modal fade editWeight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="editWeight" method="post">  
				<input type="hidden" id="weightId" name="weightId" class="form-control">
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">标题
						<span class="control-label mandatory">*</span></label>
						<div class="col-sm-9">
							<input id="weightTitle" name="title" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">权重值
						<span class="control-label mandatory">*</span></label>
						<div class="col-sm-9">
							<input id="weightValue" name="weightValue" class="form-control">
						</div>
					</div>
					<div class="col-sm-12 modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
								<button type="submit" class="btn btn-primary form-control confirm-btn">确定</button>
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

<!-- 用户分配 -->
<div class="modal fade dataPermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">用户分配</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="dataPermission">
					<div class="col-sm-5 permissionTree">
					    <ul id="tree1" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree">
					    <ul id="tree2" class="ztree"></ul>
					    <input type="hidden" id="treeDutyId">
					    <div class="permission-btn">
					    	 <button class="btn btn-primary dataBtn margin-top-10">保存</button>
					    </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


<!--Basic Scripts-->
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/weight.js"></script> 
