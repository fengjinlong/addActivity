<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/dict/css/dataExpensesType.css" rel="stylesheet">

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
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="form-group col-md-5 col-sm-5 no-margin-right">
								<input type="text" class="form-control" placeholder="费用名称" id="searchVal" onkeydown="search();">
							</div>
							<div class="form-group col-lg-3 col-md-3 col-sm-2 no-margin-right">
                                <select class="form-control" name="expensesType" id="expensesType">
                                    <option value="">费用类别</option>
                                    <option value="1">支出费用</option>
                                    <option value="2">收益费用</option>
                                </select>
                            </div>
							<div class="form-group col-lg-2 col-md-2 col-sm-2">
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
									<th>费用名称 </th>
									<th>费用类别 </th>
									<th>费用协议 </th>
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

<!--新增-->
<div class="modal fade subjectAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
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
						<label class="control-label col-sm-2 no-padding-right">费用名称</label>
						<div class="col-sm-9">
							<input type="text" class="form-control expensesTypeName" name="expensesTypeName">
						</div>
						
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">费用类别</label>
						<div class="col-sm-9">
							 <select class="form-control" name="expensesType" id="expensesType">
		                          <option value="">费用类别</option>
		                          <option value="1">支出费用</option>
		                          <option value="2">收益费用</option>
		                      </select>
		                 </div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">费用协议</label>
						<div class="col-sm-9">
							<textarea rows="8" cols="50" name="expensesProtocol" id="expensesProtocol"></textarea>
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
<div class="modal fade subjectEdit" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="subjectEdit" method="post">
				<input id="expensesTypeId" type="hidden"/>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">费用名称</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="expensesTypeName">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">费用类别</label>
						<div class="col-sm-9">
							 <select class="form-control" name="expensesType" id="expensesType">
		                          <option value="">费用类别</option>
		                          <option value="1">支出费用</option>
		                          <option value="2">收益费用</option>
		                      </select>
		                 </div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">费用协议</label>
						<div class="col-sm-9">
							<textarea rows="8" cols="50" name="expensesProtocol" id="expensesProtocol"></textarea>
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
<script src="${ctx_static }/home/dict/js/dict/dataExpensesType.js"></script> 


