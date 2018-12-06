<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-9 col-sm-9 col-xs-12">
							<div class="form-group col-md-4 col-sm-4 no-margin-right">
								<input type="text" class="form-control" placeholder="产品名称" id="searchVal" onkeydown="search(event);">
							</div>
							<div class="form-group col-md-3 col-sm-3 no-margin-right">
								<select class="form-control" title="产品模型" id="productModelId"></select>
							</div>
							<div class="form-group col-md-3 col-sm-3 no-margin-right">
								<select class="form-control selectpicker" id="enable">
									<option value="">状态</option>
									<option value="1">启用</option>
									<option value="2">禁用</option>
								</select>
							</div>
							<div class="form-group col-md-2 col-sm-2">
								<a type="button" class="btn increase  form-control search-btn" onclick="DataTable.init()" href="javascript:void(0);">
								<i class="fa fa-search"></i> 搜索 </a>
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
							<div class="col-sm-6 pull-right text-right no-padding-right">
								<a class="btn increase addBtn" id="productAddButton" href="${ctx}/product/add">
								 	<i class="fa fa-plus"></i> 新增
								</a>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer"
								id="product">
								<thead>
									<tr>
										<th>产品名称</th>
                                        <th>产品模型</th>
                                        <th>产品归属</th>
                                        <th>状态</th>
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

<script src="${ctx_static }/home/product/js/index.js?v_<%=System.currentTimeMillis()%>"></script>