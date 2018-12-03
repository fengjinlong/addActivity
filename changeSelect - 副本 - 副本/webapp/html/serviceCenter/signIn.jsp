<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="${ctx_static }/home/serviceCenter/css/signIn.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">签到管理</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-7 col-sm-7 col-xs-12">
							<div
								class="form-group col-md-8 col-sm-8 col-lg-8 no-margin-right">
								<input onkeydown="search();" class="form-control searchVal" name="searchVal" placeholder="分校/课程/级别/考试时间/姓名/证件号/电话号码" type="text">
							</div>
							<div class="form-group col-md-3 col-sm-3 col-lg-3">
								<button type="button" class="btn increase form-control search-btn">
									<i class="fa fa-search"></i>搜索
								</button>
							</div>
						</div>
						<div class="col-sm-3 pull-right">
						   <c:if test="${sessionScope.signInAdd eq '1' }">
							<button class="btn increase pull-right add-btn" data-toggle="modal"data-backdrop="static" data-target=".signInAdd">
								<i class="fa fa-plus"></i> 新增
							</button></c:if>
						</div>	
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="signIn">
								<thead>
									<tr role="row" class="text-center">
										<th>上课时间</th>
										<th>姓名</th>
										<th>证件号</th>
										<th>课程</th>
										<th>级别</th>
										<th>班型</th>
										<th>是否上课</th>
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

</div>
<!-- /Page Content -->
</div>
<!-- /Page Container -->
<!-- Main Container -->
</div>
</div>
<!--新增-->
<div class="modal fade signInAdd" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body form-horizontal clearfix">
				
					<input type="hidden" name="createUserId" value="${currentUser.userId }"/>
					<input type="hidden" name="createUserName" value="${currentUser.realName }"/>
				
					<div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-2">项目</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="projectId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-2">级别</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="levelId" class="form-control">
                            </select>
                        </div>
                    </div>
					<div class="form-group col-md-12 col-sm-12 Bulkimport">
						<label class="control-label">批量导入<a href="${ctx }/签到管理模板.xlsx">（模板下载）:</a></label>
					</div>
					<div class="form-group col-md-12 col-sm-12">
						<label class="control-label">
							<div class="col-md-12">
								<input id="bulk-upload" name="file" type="file" multiple>
							</div>
						</label>
					</div>
				<form class="form-horizontal" id="signInAdd">
					<div class="form-group col-md-12 col-sm-12">
						<table class="table table-striped table-hover table-bordered dataTable no-footer" id="imports">
							<thead>
								<tr role="row" class="text-center">
									<th>上课时间</th>
									<th>姓名</th>
									<th>证件号码</th>
									<th>课程</th>
									<th>级别</th>
									<th>班型</th>
									<th>是否上课</th>
								</tr>
							</thead>

							<tbody>
							</tbody>
						</table>
					</div>
					<div class="form-group col-md-12 col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
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
<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/signIn.js"></script>
</body>
</html>

