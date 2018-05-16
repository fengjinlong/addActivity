<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/financeCenter/css/fenxiaocw.css" rel="stylesheet">
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
								<label class="control-label pull-left margin-left-20">收款日期</label>
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
								<input class="form-control" placeholder="费用类别/分校/类别科目"
									type="text" id="searchVal" onkeydown="search();">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<button type="button"
									class="btn increase form-control search-btn" onclick="DataTable.init();">
									<i class="fa fa-search"></i> 搜索
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
							<c:if test="${!empty sessionScope.xwzx_fxcw_fxcwsr_add }">
							<button class="btn increase  pull-right col-sm-4"
								data-toggle="modal" data-target=".bs-example-modal-lg1"
								data-backdrop="static" id="applyAddButton">
								<i class="fa fa-plus"></i> 新增 
							</button>
							</c:if>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer" id="incomeInit">
								<thead>
									<tr role="row">
										<!-- <th><label> <input type="checkbox"
												class="checkAll"> <span class="text"></span>
										</label></th> -->
										<th>收款日期</th>
										<th>收款单位</th>
										<th>一级科目</th>
										<th>二级科目</th>
										<th>收入明细</th>
										<th>金额</th>
										<th>付款单位</th>
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

<!---新增--->
<div class="modal fade bs-example-modal-lg1 in" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" id="newAddModel"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">新增财务收入</span>
			</div>
			<div class="modal-body clearfix">
				<form method="" class="form-horizontal padding-top-20" id="incomeAdd">
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款单位</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="payOrg" value="">
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款日期</label>
						<div class="col-sm-9">
							<div class="controls">
								<div class="input-group date">
									<input type="text" class="form-control  form_datetime" name="payDate"
										placeholder="请选择日期"><span class="input-group-addon"><i
										class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">收款单位</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" value="${dept.fullName }" disabled>
							<input type="hidden" class="form-control" value="${dept.departmentId }" name="collectionDepartment">
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label">金额</label>
						<div class="col-sm-4" style="position:relative;">
							<input type="text" class="form-control" name="money"  style="width:120px;"> 
						</div>
						<div class="col-sm-5">
							<select class="form-control" name="payment">
								<option value="-1">--支付方式--</option>
								<option value="1">现金</option>
								<option value="2">汇款</option>
								<option value="3">支票</option>
								<option value="4">POS</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-38px;">项目</label>
						<div class="col-sm-10 padding-right-10">
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
								<option value="0">营业收入</option>
								<option value="1">营业外收入</option>
							</select>
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-40px;">收入说明</label>
						<div class="col-sm-10" style="width:85%">
							<input type="text" class="form-control" value="" name="incomeDetail">
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">详细说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="content"]',{
									uploadJson:'${ctx }/file/uploadFile',
									afterBlur: function(){
										this.sync();
									},
									resizeType:0
							});
								
							});
                          </script> 
						</div>
					</div>

					<div class="form-group modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control"  id="incomeSubmit">确认</button>
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

<!---查看/编辑/删除--->
<div class="modal fade bs-example-modal-lg in" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static" id="viewInfo">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<span class="widget-caption"></span>
			</div>
			<div class="modal-body clearfix">
				<form method="" class="form-horizontal padding-top-20" style="padding: 0 20px" id="editIncome">
				    <input type="hidden" value="" name ="schoolIncomeId">
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款单位</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled name="payOrg">
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款日期</label>
						<div class="col-sm-9">
							<div class="controls">
								<div class="input-group date">
									<input type="text" class="form-control  form_datetime"
										placeholder="请选择日期" disabled name="payDate"><span
										class="input-group-addon" ><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">收款单位</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" disabled value="">
							<input type="hidden" class="form-control" disabled name="collectionDepartment">
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">金额</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" disabled name="money" style="width:120px;">
						</div>
						<div class="col-sm-5">
							<select class="form-control" disabled name="payment">
								<option value="-1">--支付方式--</option>
								<option value="1">现金</option>
								<option value="2">汇款</option>
								<option value="3">支票</option>
								<option value="4">POS</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-38px;">项目</label>
						<div class="col-sm-10 padding-right-10">
							<select class="form-control" disabled name="projectId">
							</select>
						</div>
					</div>

					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled name="pCostclassId">
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled name="costclassId">
							</select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" disabled name="incomeType">
								<option value="0">营业收入</option>
								<option value="1">营业外收入</option>
							</select>
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-38px;">收入说明</label>
						<div class="col-sm-10 padding-right-10">
							<input type="text" class="form-control" value="" name="incomeDetail">
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">详细说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<input type="hidden" name="content">
							<textarea name="content2" class="form-control content"
								style="width: 668px; height: 340px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('textarea[name="content2"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0
								});
							});
                          </script> 
						</div>
					</div>

					<div class="form-group modal-footer">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control" id="editConfirm">确认</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal" id="editCancel">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!---查看/编辑/删除--->

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/jedate/jquery.jedate.js"></script>

<script src="${ctx_static }/home/financeCenter/js/fenxiaoshouru.js"></script>

