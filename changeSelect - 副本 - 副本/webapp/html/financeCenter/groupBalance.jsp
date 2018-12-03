<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/financeCenter/css/groupBalance.css"
	rel="stylesheet">

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
						<div class="col-md-5 col-sm-3 col-xs-12">
							<div class="form-group">
								<label
									class="control-label no-padding-right pull-left margin-left-20">日期</label>
								<div class="col-md-10 col-sm-9">
									<div class="controls">
										<div class="input-group date">
											<input type="text" class="form-control date_time"
												placeholder="请选择日期"><span class="input-group-addon"><i
												class="fa fa-calendar"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-5 col-sm-6 col-xs-12">
							<div class="form-group col-md-9 col-sm-8 no-margin-right">
								<input class="form-control" placeholder="分校" type="text">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<button type="button"
									class="btn increase form-control search-btn"><i class="fa fa-search"></i> 搜索</button>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer">
								<thead>
									<tr role="row">
										<th>分校<span class="fa indicator fa-unsorted"></span></th>
										<th>报名收入<span class="fa indicator fa-unsorted"></span></th>
										<th>分期收入<span class="fa indicator fa-unsorted"></span></th>
										<th>订座收入<span class="fa indicator fa-unsorted"></span></th>
										<th>综合部收入<span class="fa indicator fa-unsorted"></span></th>
										<th>财务支出<span class="fa indicator fa-unsorted"></span></th>
										<th>分校余额<span class="fa indicator fa-unsorted"></span></th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td class="red">合计：</td>
										<td class="red"></td>
										<td class="red"></td>
										<td class="red"></td>
										<td class="red"></td>
										<td class="red"></td>
										<td class="red"></td>
									</tr>
									<tr>
										<td>A</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>A</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
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

<!---查看--->
<div class="modal fade bs-example-modal-lg in" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">支付详情</span>
			</div>
			<div class="modal-body clearfix form-horizontal modal_padding">
				<form method="" class="form-horizontal padding-top-20"
					style="padding: 0 20px">
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请人</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请时间</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled>
						</div>
					</div>

					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">金额</label>
						<div class="col-sm-3 no-padding-left">
							<input type="text" class="form-control" disabled>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled>
								<option value="0">集团支付</option>
								<option value="1">分校支付</option>
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled>
								<option value="0">营业收入</option>
								<option value="1">营业外收入</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">支出明细</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="text" class="form-control" disabled>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">发票抬头</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="text" class="form-control" disabled>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">部门</label>
						<div class="col-sm-9">
							<select class="form-control" disabled>
								<option></option>
								<option></option>
								<option></option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">项目</label>
						<div class="col-sm-9">
							<select class="form-control" disabled>
								<option></option>
								<option></option>
								<option></option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">费用类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled>
								<option value="0">一级科目</option>
								<option value="1"></option>
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled>
								<option value="0">二级科目</option>
								<option value="1"></option>
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled>
								<option value="0">营业支出</option>
								<option value="1">营业外支出</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">收款人</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<div class="col-sm-3 no-padding-left">
								<select class="form-control" disabled>
									<option value="0"></option>
									<option value="1"></option>
								</select>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行"
									disabled>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行所在省"
									disabled>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行所在市"
									disabled>
							</div>
						</div>
					</div>
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24"></label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="开户人"
									disabled>
							</div>
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="账号"
									disabled>
							</div>
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="电话"
									disabled>
							</div>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">调账</label>
						<div class="col-sm-9">
							<select class="form-control" disabled>
								<option>是</option>
								<option>否</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请地区</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">申请说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea disabled></textarea>
						</div>
					</div>

					<div class="clearfix form-group" style="margin: 40px 0px;">
						<div class="col-sm-3 col-xs-3 col-sm-offset-5 col-xs-offset-3">
							<button type="button" class="btn btn-primary btn-lg col-sm-6">申请支出
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>

<script src="${ctx_static }/home/financeCenter/js/groupBalance.js"></script>

