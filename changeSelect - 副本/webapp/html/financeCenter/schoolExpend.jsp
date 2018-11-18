<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/financeCenter/css/fenxiaozhichu.css"
	rel="stylesheet">
<link rel="stylesheet" href="${ctx_static }/dep/jedate/skin/jedate.css" />

<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons">
				</div>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-6 col-xs-12">
							<div class="form-group">
								<label class="control-label pull-left margin-left-20">支付日期</label>
								<div class="col-md-9 col-sm-9">
									<div class="controls">
										<div class="input-group date">
											<input type="text" class="form-control date_time" id="queryDate"
												placeholder="请选择日期"><span class="input-group-addon"><i
												class="fa fa-calendar"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-5 col-sm-6 col-xs-12">
							<div class="form-group col-md-9 col-sm-4 no-margin-right">
								<input class="form-control" placeholder="分校/类别科目/财务编号"
									type="text" id="searchVal" onkeydown="search();">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<button type="button"
									class="btn increase form-control search-btn" onclick="javascript:DataTable.init();">
									 <i class="fa fa-search"></i>搜索
									</button>

							</div>
						</div>

						<div class="col-md-3 col-sm-3 col-xs-12 btn-group">
							<span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle"
									data-toggle="dropdown">
									导出 <i class="fa fa-angle-up"></i>
								</button>
								<ul class="dropdown-menu" role="menu">
									<li><a href="#">保存PDF</a></li>
									<li><a href="#">导出EXCEL</a></li>
									<li><a href="#">导出CSV</a></li>
								</ul>
							</div>
							<c:if test="${!empty sessionScope.xwzx_fxcw_fxcwzc_sqzc }">
							<button class="btn increase  pull-right col-sm-4"
								data-toggle="modal" data-target=".bs-example-modal-lg1"
								data-backdrop="static" id="applyButton">申请支出</button>
							</c:if>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="expendInit">
								<thead>
									<tr role="row">
										<!-- <th><label> <input type="checkbox"
												class="checkAll"> <span class="text"></span>
										</label></th>
										<th>编号<span class="fa indicator fa-unsorted"></span></th> -->
										<th>申请分校</th>
										<th>申请人</th>
										<th>一级科目</th>
										<th>二级科目</th>
										<th>支出明细</th>
										<th>金额</th>
										<th>支付日期</th>
										<th>支付渠道</th>
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
<!---申请支出--->
<div class="modal fade bs-example-modal-lg1 in" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" id="newExpendModel"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true" >×</button>
				<span class="widget-caption">申请支出</span>
			</div>
			<div class="modal-body clearfix form-horizontal modal_padding">

				<form method="" class="form-horizontal padding-top-20"
					style="padding: 0 20px" id="applyExpendForm">
					<input type="hidden" name="updateStatus" value="">
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请人</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled  value="${user.realName }">
							<input type="hidden" class="form-control"   name="applicantId" value="${user.userId }">
						</div>
					</div>

					<!-- <div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请时间</label>
						<div class="col-sm-9">
							<div class="controls">
								<div class="input-group date">
									<input type="text" class="form-control date_time" name="applicantDate"
										placeholder="请选择日期" disabled><span
										class="input-group-addon"><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
 -->
					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">金额</label>
						<div class="col-sm-3 no-padding-left">
							<input type="text" class="form-control" name="money">
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="paymentFrom">
								<option value="2">分校支付</option>
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="payment">
								<option value="1">现金</option>
								<option value="2">汇款</option>
								<option value="3">支票</option>
								<option value="4">pos</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">支出明细</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="text" class="form-control" name="expendDetail">
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">发票抬头</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="text" class="form-control" name="invoiceTitle">
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">部门</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled name="" value="${dept.fullName }">
							<input type="hidden" class="form-control"  name="departmentId1" value="${dept.departmentId }">
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">项目</label>
						<div class="col-sm-9">
							<select class="form-control" name="projectId">
							</select>
						</div>
					</div>

					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="pCostclassId">
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="costclassId">
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="incomeType">
								<option value="1">营业支出</option>
								<option value="2">营业外支出</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">收款人</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<div class="col-sm-3 no-padding-left">
								<select class="form-control" name="payeeId">
								</select>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行" name = "bankName"
									readonly="readonly">
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行所在省" name="province"
									readonly="readonly">
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行所在市" name="city"
									readonly="readonly">
							</div>
						</div>
					</div>
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24"></label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="开户人" name="payeeName"
									readonly="readonly">
									<input type="hidden" name="accountName">
							</div>
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="账号" name="accountNum"
									readonly="readonly">
							</div>
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="电话" name="phone"
									readonly="readonly">
							</div>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">调账</label>
						<div class="col-sm-9">
							<select class="form-control" name="isAdjustment">
								<option value="1">是</option>
								<option value="2">否</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请地区</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled name="" value="${dept.fullName }">
							<input type="hidden" class="form-control"  name="departmentId2" value="${dept.departmentId }">
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">申请说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="content" class="form-control content" style="width: 668px; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="content"]',{
									uploadJson:'${ctx }/file/uploadFile',
									afterBlur: function(){
										this.sync();
									}
							});

							});
                          </script>
						</div>
					</div>

					<div class="clearfix form-group" style="margin: 40px 0px;">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary btn-md btn-block" id="ApplySubmit">申请支出</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger  btn-md btn-block"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


<!---查看--->
<div class="modal fade bs-example-modal-lg in" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" id="editExpendModel"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<span class="widget-caption">查看支出</span>
			</div>
				<div class="modal-body clearfix form-horizontal modal_padding">

				<form method="" class="form-horizontal padding-top-20" id="editExpendForm"
					style="padding: 0 20px">
					<input type="hidden" name="updateStatus" value="">
					<input type="hidden" name="schoolExpendId" value="">
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请人</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled value="">
							<input type="hidden" class="form-control"  name="applicantId" value="">
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请时间</label>
						<div class="col-sm-9">
							<div class="controls">
								<div class="input-group date">
									<input type="text" class="form-control date_time" name="applicantDate"
										placeholder="请选择日期" disabled><span
										class="input-group-addon"><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>

					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">金额</label>
						<div class="col-sm-3 no-padding-left">
							<input type="text" class="form-control" name="money">
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="paymentFrom">
								<option value="2">分校支付</option>
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="payment">
								<option value="1">营业收入</option>
								<option value="2">营业外收入</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">支出明细</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="text" class="form-control" name="expendDetail">
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">发票抬头</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="text" class="form-control" name="invoiceTitle">
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">部门</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled name="">
							<input type="hidden" class="form-control"  name="departmentId1">
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">项目</label>
						<div class="col-sm-9">
							<select class="form-control" name="projectId">

							</select>
						</div>
					</div>

					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="pCostclassId">
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="costclassId">
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="incomeType">
								<option value="1">营业支出</option>
								<option value="2">营业外支出</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">收款人</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<div class="col-sm-3 no-padding-left">
								<!-- <select class="form-control" name="payeeId">
								</select> -->
								<input type="text" class="form-control" placeholder="收款人" name = "payeeName"
									disabled>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行" name = "bankName"
									disabled>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行所在省" name="province"
									disabled>
							</div>
							<div class="col-sm-3 no-padding-left">
								<input type="text" class="form-control" placeholder="开户行所在市" name="city"
									disabled>
							</div>
						</div>
					</div>
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24"></label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="开户人" name="accountName"
									disabled>
							</div>
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="账号" name="accountNum"
									disabled>
							</div>
							<div class="col-sm-4 no-padding-left">
								<input type="text" class="form-control" placeholder="电话" name="phone"
									disabled>
							</div>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">调账</label>
						<div class="col-sm-9">
							<select class="form-control" name="isAdjustment">
								<option value="1">是</option>
								<option value="2">否</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">申请地区</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" val="" disabled>
							<input type="hidden" class="form-control" name="departmentId2">
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">申请说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input name="content" type="hidden" value="">
							<textarea name="content2" class="form-control content" style="width: 668px; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('textarea[name="content2"]',{
									uploadJson:'${ctx }/file/uploadFile'
								});

							});
                          </script>
						</div>
					</div>

					<div class="form-group modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary btn-md btn-block" id="editConfirm">申请支出</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-md btn-block"
								data-dismiss="modal" id="editCancel">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<script src="${ctx_static }/dep/jedate/jquery.jedate.js"></script>
<script src="${ctx_static }/home/financeCenter/js/fenxiaozhichu.js"></script>

