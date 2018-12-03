<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/dict/css/dataExpensesType.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
		 	<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">分期付款配置</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">	
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="form-group col-md-5 col-sm-5 no-margin-right">
								<input type="text" class="form-control" placeholder="分期方/方式" id="searchVal" onkeydown="search();">
							</div>
							<div class="form-group col-lg-2 col-md-2 col-sm-2">
								<a type="button" class="btn increase  form-control search-btn" Onclick="DataTable.init()" href="javaScritpt:;">
								<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						<div class="form-group col-lg-1 col-md-2 col-sm-2  pull-right margin-right-5">
							<button class="btn increase pull-right form-control addPopup" data-toggle="modal" data-target=".popup" data-backdrop="static">
								<i class="fa fa-plus"></i> 新增
							</button>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<table class="table table-striped table-hover table-bordered dataTable no-footer" id="installmentTable">
							<thead>
								<tr role="row">
									<th>分期来源 </th>
									<th>分期方式</th>
									<th>分期利率</th>
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

<!--新增/编辑弹窗-->
<div class="modal fade popup" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption popup-title">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="popupform" method="post">
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">分期来源</label>
						<div class="col-sm-9">
							<input type="hidden" name="installmentRatioId" class="form-control" id="installmentRatioId" />
							 <select class="form-control chosen-select" name="installmentBankId" id="installmentBankId">
							 <option>--请选择--</option>
							 <c:forEach items="${bankSources }" var="bank">
							 <option value="${bank.bankId }">${bank.bankName }</option>
							 </c:forEach>
		                      </select>
		                 </div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">分期类别</label>
						<div class="col-sm-9">
							 <select class="form-control chosen-select" name="installmentSortId" id="installmentSortId">
							 <option>--请选择--</option>
		                     <c:forEach items="${installmentSorts }" var="sort">
							 <option value="${sort.installmentSortId }">${sort.installmentSortName }</option>
							 </c:forEach>
		                     </select>
		                 </div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">分期利率</label>
						<div class="col-sm-9">
							<input class="form-control" name="installmentRatio" type="text" min="0.00" max="1.00" placeholder="范围0.00~1.00"/>
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

<script src="${ctx_static }/home/product/js/installment_ratio.js?v=<%=System.currentTimeMillis() %>"></script> 
