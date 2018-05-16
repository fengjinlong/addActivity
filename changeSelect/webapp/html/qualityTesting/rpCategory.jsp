<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons"></div>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-sm-12 col-sm-12 col-xs-12">
							<div class="form-group col-sm-6 col-sm-7 no-margin-right">
								<input class="form-control" id="searchVal" placeholder="奖罚类别名称" type="text" onkeydown="search(event);">
							</div>
							<div class="form-group col-sm-3 col-sm-4">
								<button type="button"  onclick="DataTable.init()" 
									class="btn btn-blue form-control search-btn">
									<i class="fa fa-search"></i>搜索
								</button>
							</div>
							<div class="form-group col-sm-2 pull-right">
								<button type="button"
									class="btn btn-blue form-control addSort"
									data-toggle="modal" data-backdrop="static"
									data-target=".newlyIncreased">新增</button>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer"
								id="rpCategory">
								<thead>
									<tr>
										<th>奖罚种类</th>
										<th>类别</th>
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
<div class="modal fade newlyIncreased in" id="addModel" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close close_jf" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body">
				<form id="sortForm" class="form-horizontal" style="padding: 0 20px">
					<div class="form-group col-sm-12 col-md-12 col-lg-12">
						<label class="col-sm-2 control-label">奖罚种类</label>
						<div class="col-sm-10">
							<select class="form-control chosen-select" id="type1" name="type">
								<option value="1">奖</option>
								<option value="2">罚</option>
							</select>
						</div>
					</div>

					<div class="form-group col-sm-12 col-md-12 col-lg-12">
						<label class="col-sm-2 control-label">类别</label>
						<div class="col-sm-10">
							<input class="form-control" value="" name="sortName" id="sortName1" type="text">
						</div>
					</div>
					<div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="col-sm-2 control-label">编码</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" id="code1" name="code">
                        </div>
                    </div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="button" id="addBtn-sort" class="btn btn-primary btn-lg form-control">确认</button>
						</div>
						<div class="col-sm-2 ">
							<button type="button" class="btn btn-danger btn-lg form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!--编辑-->
<div class="modal fade redact in" id="editModel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form id="editForm" class="form-horizontal" style="padding:0 20px">
                    <input type="hidden" name="rewardPunishSortId" id="rewardPunishSortId"/>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="col-sm-2 control-label">奖罚种类</label>
                        <div class="col-sm-10">
                            <select class="form-control chosen-select" id="type" name="type">
                                <option value="1">奖</option>
                                <option value="2">罚</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="col-sm-2 control-label">类别</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" id="sortName" name="sortName">
                        </div>
                    </div>
					<div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="col-sm-2 control-label">编码</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" id="code" name="code">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" id="editBtn-sort" class="btn btn-primary btn-lg form-control">确认</button>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/home/qualityTesting/js/rpCategory.js?v_<%=1-Math.random() %>"></script>
