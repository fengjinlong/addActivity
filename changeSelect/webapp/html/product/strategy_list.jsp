<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<style>
	.describe-text img{
		width:790px;
		height:100%
	}
</style>
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
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-7 col-sm-7 no-margin-right">
								<input id="searchVal" class="form-control" onkeydown="search(event);" placeholder="产品模型/产品/考期" type="text">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<button type="button" onclick="DataTable.init()" 
									class="btn btn-lightBlue form-control search-btn">
									<i class="fa fa-search"></i> 搜索
								</button>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer"
								id="productStrategy">
								<thead>
									<tr>
										<th>产品模型</th>
										<th>产品</th>
										<th>考期</th>
										<th>产品攻略名称</th>
										<th>操作</th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td>职业资格</td>
										<td>人力一级无忧取证班</td>
										<td>2017年12月</td>
										<td>人力一级无忧取证班招简</td>
										<td>
											<!-- <a class="edit">
                                                            <i class="fa fa-edit blue" data-toggle="tooltip"
                                                               data-placement="top" data-original-title="编辑"
                                                               title="编辑"></i>
                                                        </a> --> <a
											class="view"> <i class="fa fa-search warning"
												data-placement="top" data-original-title="查看"
												data-toggle="modal" data-target=".chakan" title="查看"></i>
										</a>
										</td>
									</tr>
									<tr>
										<td>职业资格</td>
										<td>人力一级无忧取证班</td>
										<td>2017年12月</td>
										<td>人力一级无忧取证班招简</td>
										<td>
											<!-- <a class="edit">
                                                            <i class="fa fa-edit blue" data-toggle="tooltip"
                                                               data-placement="top" data-original-title="编辑"
                                                               title="编辑"></i>
                                                        </a> --> <a
											class="view"> <i class="fa fa-search warning"
												data-placement="top" data-original-title="查看"
												data-toggle="modal" data-target=".chakan" title="查看"></i>
										</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--查看-->
<div class="modal fade chakan in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body">
                <form method="" class="form-horizontal clearfix">
                    <div class="describe-box" style="padding:40px;background:#f5f5f5;word-wrap:break-word; word-break:break-all;">
                        <h4 class="describe-title" style="font-size:20px;line-height:50px"></h4>
                        <div class="describe-text describeImg">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<script src="${ctx_static }/home/product/js/strategy.js"></script>