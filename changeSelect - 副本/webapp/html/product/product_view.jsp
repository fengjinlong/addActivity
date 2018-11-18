<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/product/css/product.css"
	rel="stylesheet">

<!-- Page Body -->
<div class="page-body ">
	<div class="row">
		<div class="col-lg-12 col-sm-12 col-xs-12">
			<div class="widget">
				<div class="widget-header bordered-bottom bordered-blue">
					<span class="widget-caption">产品查看</span>
				</div>
				<!--Widget Header-->
				<div class="widget-body">
					<div class="widget-main">
						<div id="WiredWizard" class="wizard wizard-wired"
							data-target="#WiredWizardsteps">
							<ul class="steps">
								<li data-target="#productInfo" class="active"><span
									class="step">1</span> <span class="title">产品信息</span> <span
									class="chevron"></span></li>
								<li data-target="#productPrice"><span class="step">2</span>
									<span class="title">产品定价</span> <span class="chevron"></span>
								</li>
							</ul>
						</div>
						<div class="step-content form-horizontal" id="WiredWizardsteps">
							<form class="form-horizontal" id="addProductInfo">
								<div class="step-pane active" id="productInfo">
									<div class="well with-header">
										<div class="header">产品基本信息</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4">
												<label
													class="control-label col-sm-4 no-padding-left no-padding-right">产品名称</label>
												<div class="col-sm-8">
													<input name="productId" class="proInfo" type="hidden"
														value='${productMap.product.product_id }' /> <input
														name="productName" class="form-control"
														value="${productMap.product.product_name}" disabled />
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">产品模型</label>
												<div class="col-sm-8">
													<input name="productModelId" class="form-control"
														id="productModel"
														data-memo="${productMap.productModel.memo }"
														value="${productMap.product.product_model_name }" disabled />
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">产品归属</label>
												<div class="col-sm-8">
													<input readonly name="departmentId" class="form-control"
														id="departmentId"
														value="${productMap.product.product_department }" disabled />
												</div>
											</div>
											<!-- 数据信息储存区 -->
											<input type="hidden" id="productId"
												value="${productMap.product.product_id }"> <input
												type="hidden" id="productModelId"
												value="${productMap.product.product_model_id }">
										</div>
									</div>
									<div class="well with-header">
										<div class="header">产品信息</div>
										<div class="well-body clearfix">
											<!-- 产品模型动态配置项位置 -->
											<div class="form-group col-sm-4" id="infoMP">
												<label class="control-label col-sm-4 no-padding-right">产品类型</label>
												<div class="col-sm-8">
													<c:if test="${productMap.product.product_form == 0}">
														<input readonly name="productForm" class="form-control"
															value="主产品" />
													</c:if>
													<c:if test="${productMap.product.product_form == 1}">
														<input readonly name="productForm" class="form-control"
															value="子产品" />
													</c:if>
												</div>
											</div>
											<c:if test="${productMap.product.product_form == 0 }">
												<div class="form-group col-sm-4 childProductBox">
													<label class="control-label col-sm-4 no-padding-right">子产品</label>
													<div class="col-sm-8">
														<input name="children" id="childProduct"
															data-value='${productMap.sonProducts }'
															class="form-control" value="" readonly />
													</div>
												</div>
											</c:if>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">考试地区</label>
												<div class="col-sm-8">
													<input readonly id="branchSchoolId" name="branchSchoolId"
														data-value=${productMap.branchSchools }
														class="form-control" value="" />
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">收款方</label>
												<div class="col-sm-8">
													<c:if test="${productMap.product.payee == 1}">
														<input readonly class="form-control" value="中和" />
													</c:if>
													<c:if test="${productMap.product.payee == 2}">
														<input readonly class="form-control" value="学慧网" />
													</c:if>
													<c:if test="${productMap.product.payee == 3}">
														<input readonly class="form-control" value="中和，学慧网" />
													</c:if>
													<c:if test="${productMap.product.payee == 4}">
														<input readonly class="form-control" value="合作方" />
													</c:if>
													<c:if test="${productMap.product.payee == 5}">
														<input readonly class="form-control" value="中和，合作方" />
													</c:if>
													<c:if test="${productMap.product.payee == 6}">
														<input readonly class="form-control" value="学慧网，合作方" />
													</c:if>
													<c:if test="${productMap.product.payee == 7}">
														<input readonly class="form-control" value="中和，学慧网，合作方" />
													</c:if>
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">是否分期</label>
												<div class="col-sm-8">
													<select name="isInstallment" class="form-control chosen-select"
														id="isInstallment" disabled>
														<c:if test="${productMap.product.is_installment == 1 }">
														<option value="1" selected>是</option>
														</c:if>
														<c:if test="${productMap.product.is_installment == 0 || empty productMap.product.is_installment }">
														<option value="0" selected>否</option>
														</c:if>
													</select>
												</div>
											</div>
											<c:if test="${productMap.product.is_installment == 1 }">
											<div class="form-group col-sm-4 relate-installment">
												<label class="control-label col-sm-4 no-padding-right">首付款比率</label>
												<div class="col-sm-8">
													<input name="downpaymentsRatio" class="form-control"
														id="downpaymentsRatio" disabled value="${productMap.product.downpayments_ratio }"/>
												</div>
											</div>
											</c:if>
										</div>
									</div>
									<div class="well with-header part1">
										<div class="header">招生条件</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">年龄</label>
												<div class="col-sm-8">
													<input name="age" class="form-control proInfo" id="age" value="${productMap.product.age }">
												</div>
											</div>
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">学历</label>
												<div class="col-sm-8">
													<input type="hidden" value="${productMap.product.edu }" id="hideEdu" disabled/>
													<select name="edu" id="edu" class="form-control proInfo chosen-container"></select>
												</div>
											</div>
											<div class="form-group col-sm-4"></div>
											<div class="form-group col-sm-12 hideItem">
											<label class="control-label col-sm-1 no-padding-right"
												style="margin-left: 2.2%">地区</label>
											<div class="col-sm-10 hideAddress"  style="width: 85%" id="diqu">
												<select name="area" id="area" class="form-control proRelatInfo selectpicker" title="--请选择--"
													 data-value=${productMap.addresses } multiple></select>
											</div>
										</div>
										</div>
									</div>
									<!-- 報考流程 -->
									<div class="well with-header part2">
										<div class="header">报考流程</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4 hideItem">
											<label class="control-label col-sm-4 no-padding-right">是否报考</label>
											<div class="col-sm-8">
												<select name="isApply" class="form-control proInfo" id="isApply">
													<c:if test="${productMap.product.is_apply == 1 }">
													<option value="">--请选择--</option>
													<option value="1" selected>是</option>
													<option value="0">否</option>
													</c:if>
													<c:if test="${productMap.product.is_apply == 0 }">
													<option value="">--请选择--</option>
													<option value="1">是</option>
													<option value="0" selected>否</option>
													</c:if>
												</select>
											</div>
										</div>
										<c:if test="${productMap.product.is_apply == 1 }">
										<div class="form-group col-sm-4 flowOptions hideItem" style="display:none">
											<label class="control-label col-sm-4 no-padding-right">报考流程</label>
											<div class="col-sm-8">
												<input type="hidden" value="${productMap.product.exam_flow_id }" id="hideExamFlowId" disabled/>
												<select name="examFlowId" class="form-control proInfo" id="examFlowId">
												</select>
											</div>
										</div>
										</c:if>
										</div>
									</div>
									<!-- 退費流程 -->
									<div class="well with-header part3">
										<div class="header">退费流程</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">退费流程</label>
												<div class="col-sm-8">
												<input id="hideFeeFlowId" type="hidden" value="${productMap.product.fee_flow_id}" diabled/>
													<select name="feeFlowId" id="feeFlowId"
														class="form-control chosen-select" title="--请选择--">
													</select>
												</div>
											</div>
										</div>
									</div>
									<!-- 考試科目 -->
									<div class="well with-header part4">
										<div class="header">考试科目</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-12 hideItem">
												<label class="control-label col-sm-1 no-padding-right" style="margin-left: 2.2%">考试科目</label>
												<div class="col-sm-10"  style="width: 85%">
													<select name="subject" id="subject" data-value=${productMap.subjects } class="form-control proRelatInfo selectpicker" title="--请选择--" multiple></select>
												</div>
											</div>
										</div>
									</div>
									<div class="well with-header part5">
										<div class="header">报名表说明</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-12 col-center-block product-signs" 
												 id="signs">
											<input type="hidden" value="${productMap.signs } " id="signsHide" />	
										</div>
										</div>
									</div>
									<div class="actions actions-footer">
										<a href="#" class="btn btn-default btn-cancel">取消</a>
										<button type="button"
											class="btn btn-primary btn-next first-step" data-last="确定">下一步</button>
									</div>
								</div>
							</form>
							<form class="form-horizontal" id="addProductPrice">
								<div class="step-pane" id="productPrice">
									<div class="well with-header paymentPeriod part6">
										<div class="header">
											<span class="header-title">缴费期次</span> <span
												class="pull-left"> <i
												class="fa fa-plus success operate-btn"></i> <i
												class="fa fa-minus danger operate-btn"></i>
											</span>
										</div>
										<div class="well-body">
											<table class="table table-striped table-bordered table-hover"
												id="paymentPeriodTable">
												<thead>
													<tr>
														<th>期次</th>
														<th><font color="red">距报名日期（报名时间之后天数）</font> </th>
														<th>比例（0.00~1.00）</th>
														<th>是否终止服务</th>
													</tr>

												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
									</div>
									<div class="well with-header examinationDate part7">
										<div class="header">
											<span class="header-title">考期</span> <span class="pull-left">
												<i class="fa fa-plus success operate-btn"></i> <i
												class="fa fa-minus danger operate-btn"></i>
											</span>
										</div>
										<div class="well-body">
											<table class="table table-striped table-bordered table-hover"
												id="examinationDateTable">
												<thead>
													<tr>
														<th>考期</th>
														<th>成本</th>
														<th>最低招生价格</th>
														<th>招生起止日期</th>
														<th>招生地区</th>
														<th>招简</th>
														<th>招生价格</th>
														<th>服务配置</th>
													</tr>

												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
									</div>
									<div class="actions actions-footer">
										<button type="button" class="btn btn-default  btn-prev">上一步</button>
										<button type="button"
											class="btn btn-primary end-view btn-next" onclick="Tolist();">确定</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--招简编辑-->
<div class="modal fade brochuresEditModal" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			 <div class="modal-body">
                <div class="well well-lg">
                    <h4 class="block notice-title" id="brochName"> </h4>
                    <div class="notice-text">
                        <p id="descp">
                        </p>
                    </div>
                </div>
            </div>
			<!-- <div class="modal-body">
				<form class="form-horizontal" id="brochuresEditForm">
					<div class="form-group">
						<label
							class="control-label control-label-text col-sm-2 no-padding-right">名称：</label>
						<div class="col-sm-9" style="width: 77.6%">
							<input name="dictionaryName" class="form-control" id="brochName">
							<p id="brochName"></p>
							<h4 class="block notice-title" id="showThem"> </h4>
						</div>
					</div>
					<div class="form-group">
						<label
							class="control-label control-label-text col-sm-2 no-padding-right">描述：</label>
						<div class="col-sm-8">
							<p id="descp"></p>
							<textarea class="form-control description" rows="8"
								id="description" name="description"
								style="width: 668px; height: 340px;"></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-5">
							<button type="button"
								class="btn btn-primary form-control cancel-brochures"
								data-dismiss="modal">确定</button>
						</div>
					</div>
				</form>
			</div> -->
		</div>
	</div>
</div>

<!--招生价格编辑-->
<div class="modal fade pricesEditModal" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close cancel-close-price"
					data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body">
				<div class="tabbable">
					<ul class="nav nav-tabs" id="myTab">
						<li class="active"><a data-toggle="tab" href="#revenueCost">
								收益费用 </a></li>
						<li><a data-toggle="tab" href="#incurExpense"> 支出费用 </a></li>
					</ul>

					<div class="tab-content">
						<div id="revenueCost" class="tab-pane active">
							<form class="form-horizontal" id="revenueCostForm">
								<div class="well with-header registerGuide  clearfix">
									<div class="header">
										<span class="header-title">班型价格</span> <span class="pull-left">
											<i class="fa fa-plus success operate-btn"></i> <i
											class="fa fa-minus danger operate-btn"></i>
										</span>
									</div>
									<div class="well-body">
										<table class="table table-striped table-bordered table-hover"
											id="revenueCostTable">
											<thead>
												<tr>
													<th>分校</th>
													<th>费用种类</th>
													<th>金额</th>
													<th>下限</th>
													<th>锁定</th>
													<th>费用协议</th>
													<th>是否禁用</th>
												</tr>

											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</form>
						</div>
						<div id="incurExpense" class="tab-pane">
							<form class="form-horizontal" id="incurExpenseForm">
								<div class="well with-header clearfix">
									<div class="header">
										<span class="header-title">班型价格</span> <span class="pull-left">
											<i class="fa fa-plus success operate-btn"></i> <i
											class="fa fa-minus danger operate-btn"></i>
										</span>
									</div>
									<div class="well-body">
										<table class="table table-striped table-bordered table-hover"
											id="incurExpenseTable">
											<thead>
												<tr>
													<th>分校</th>
													<th>费用种类</th>
													<th>金额</th>
													<th>下限</th>
													<th>锁定</th>
													<th>费用协议</th>
													<th>是否禁用</th>
												</tr>

											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</form>
						</div>
						<!-- <div class="form-group modal-footer btnbase">
							<div class="col-sm-2 col-sm-offset-5">
									<button type="button"
										class="btn btn-primary form-control close-price" data-dismiss="modal">确定</button>
								</div>
						</div> -->
					</div>
				</div>

			</div>
		</div>
	</div>
</div>

<!--服务配置-->
<div class="modal fade serviceConfigModal" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close cancel-close-price"
					data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<span class="widget-caption">服务配置</span>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" id="serviceConfigForm">
					<div class="well with-header">
						<div class="header">
							<span class="header-title">产品包含服务</span> <span class="pull-left">
								<i class="fa fa-plus success operate-btn"></i> <i
								class="fa fa-minus danger operate-btn"></i>
							</span>
						</div>
						<div class="well-body clearfix">
							<table class="table table-striped table-bordered table-hover"
								id="productIncludeService">
								<thead>
									<tr>
										<th>分校</th>
										<th>服务名称</th>
										<th>费用种类</th>
										<th width="10%">费用</th>
										<th width="10%">下限</th>
										<th>锁定</th>
										<th>费用协议</th>
										<th>是否必选</th>
										<th>是否禁用</th>
									</tr>

								</thead>
								<tbody>
								</tbody>
							</table>
							<!-- <div class="form-group modal-footer btnservice">
								<div class="col-sm-2 col-sm-offset-5">
									<button type="button"
										class="btn btn-primary form-control close-price" data-dismiss="modal">确定</button>
								</div>
							</div> -->
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<script>
var signsBase = '${productMap.signs }';  
</script> 
<script
	src="${ctx_static }/home/product/js/product_base.js?v_<%=Math.random() %>"></script>
<script
	src="${ctx_static }/home/product/js/product_view.js?v_<%=Math.random() %>"></script>
