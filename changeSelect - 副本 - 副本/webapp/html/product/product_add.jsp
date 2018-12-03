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
					<span class="widget-caption">产品新增</span>
				</div>
				<!--Widget Header-->
				<div class="widget-body">
					<div class="widget-main">
						<div id="WiredWizard" class="wizard wizard-wired"
							data-target="#WiredWizardsteps">
							<ul class="steps">
								<li data-target="#productInfo" class="active"><span
									class="step">1</span> <span class="title">第一步：产品信息</span> <span
									class="chevron"></span></li>
								<li data-target="#productPrice"><span class="step">2</span>
									<span class="title">第二步：产品定价</span> <span class="chevron"></span>
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
													<input name="productName" class="form-control" id="validateName">
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">产品模型</label>
												<div class="col-sm-8">
													<select name="productModelId" class="form-control"
														id="productModel">
													</select>
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">产品归属</label>
												<div class="col-sm-8">
													<input readonly id="department_id"
														onclick="depMenu('department_id')" name="department_id"
														class="form-control depMenu" />	
														<span class="reg red"></span>
												    <input type="hidden"
														id="departmentId" name="departmentId" />
												</div>
											</div>
										</div>
									</div>
									<!-- 数据信息储存区 -->
									<input type="hidden" id="productId" />
									<div class="well with-header">
										<div class="header">产品信息</div>
										<div class="well-body clearfix">
											<div class="col-sm-12 no-padding">
												<div class="form-group col-sm-4">
													<label class="control-label col-sm-4 no-padding-right">产品类型</label>
													<div class="col-sm-8">
														<select name="productForm"
															class="form-control chosen-select" id="productForm">
															<option value="0" selected>主产品</option>
															<option value="1">子产品</option>
														</select>
													</div>
												</div>
												<div class="form-group col-sm-4 childProductBox">
													<label class="control-label col-sm-4 no-padding-right">子产品</label>
													<div class="col-sm-8">
														<select name="children" id="childProduct"
															class="form-control show-tick selectpicker" multiple
															title="--请选择--" data-live-search="true">
														</select>
													</div>
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">考试地区</label>
												<div class="col-sm-8">
													<select id="branchSchoolId" name="branchSchoolId"
														class="form-control selectpicker" multiple title="--请选择--">
													</select>
												</div>
											</div>
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">收款方</label>
												<div class="col-sm-8">
													<select name="payeeDpt" class="form-control selectpicker"
														id="payee" multiple title="--请选择--">
														<option value="1">中和</option>
														<option value="2">学慧网</option>
														<option value="4">合作方</option>
													</select>
												</div>
											</div>
											<div class="col-sm-12 no-padding">
												<div class="form-group col-sm-4">
													<label class="control-label col-sm-4 no-padding-right">是否分期</label>
													<div class="col-sm-8">
														<select name="isInstallment" class="form-control chosen-select"
															id="isInstallment">
															<option>--请选择--</option>
															<option value="1">是</option>
															<option value="0">否</option>
														</select>
													</div>
												</div>
												<div class="form-group col-sm-4 relate-installment" style="display:none;">
													<label class="control-label col-sm-4 no-padding-right">首付款比率</label>
													<div class="col-sm-8">
														<input name="downpaymentsRatio" class="form-control"
															id="downpaymentsRatio" disabled/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="well with-header part1">
										<div class="header">招生条件</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">年龄</label>
												<div class="col-sm-8">
													<input name="age" class="form-control" id="age">
												</div>
											</div>
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">学历</label>
												<div class="col-sm-8">
													<select name="edu" id="edu"
														class="form-control chosen-select">
													</select>
												</div>
											</div>
											<div class="form-group col-sm-4"></div>
											<div class="form-group col-sm-12 hideItem">
												<label class="control-label col-sm-1 no-padding-right"
													style="margin-left: 35px">地区</label>
												<div class="col-sm-10" style="width: 86%">
													<select name="area" class="form-control selectpicker"
														multiple id="area" title="--请选择--"></select>
												</div>
											</div>
										</div>
									</div>
									<div class="well with-header  part2">
										<div class="header">报考流程</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">是否报考</label>
												<div class="col-sm-8">
													<select name="isApply" id="isApply" class="form-control chosen-select">
														<option value="">--请选择--</option>
														<option value="1">是</option>
														<option value="0">否</option>
													</select>
												</div>
											</div>
											<div class="form-group col-sm-4 flowOptions"
												style="display: none">
												<label class="control-label col-sm-4 no-padding-right">报考流程</label>
												<div class="col-sm-8">
													<select name="examFlowId"
														class="form-control chosen-select" id="examFlowId">
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="well with-header  part3">
										<div class="header">退费流程</div>
										<div class="well-body clearfix hideItem">
											<div class="form-group col-sm-4">
												<label class="control-label col-sm-4 no-padding-right">退费流程</label>
												<div class="col-sm-8">
													<select name="feeFlowId" id="feeFlowId" class="form-control chosen-select">
														
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="well with-header  part4">
										<div class="header">考试科目</div>
										<div class="well-body clearfix">
											<div class="form-group col-sm-4 hideItem">
												<label class="control-label col-sm-4 no-padding-right">考试科目</label>
												<div class="col-sm-8">
													<select name="subject" id="subject"
														class="form-control show-tick selectpicker"
														title="--请选择--" multiple>
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="well with-header  part5">
										<div class="header">报名表说明</div>
										<div class="well-body clearfix">
											<div
												class="form-group col-sm-12 col-center-block product-signs hideItem">
											</div>
										</div>
									</div>
									<div class="actions actions-footer">
										<a href="#" class="btn btn-default btn-cancel">取消</a>
										<button type="submit" class="btn btn-primary btn-next first-step"
											data-last="确定">下一步</button>
									</div>
								</div>
							</form>
							<form class="form-horizontal" id="addProductPrice">
								<div class="step-pane" id="productPrice">
									<div class="well with-header paymentPeriod  part6">
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
									<div class="well with-header examinationDate  part7">
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
									<div class="actions actions-footer" style="margin-bottom:150px;background:#fbfbfb">
										<!-- <button type="button" class="btn btn-default  btn-prev">上一步</button> -->
										<button type="button"
											class="btn btn-primary secondSub btn-next">确定</button>
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
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" id="brochuresEditForm">
					<div class="form-group">
						<label
							class="control-label control-label-text col-sm-2 no-padding-right">名称</label>
						<div class="col-sm-9" style="width: 77.6%">
							<input name="dictionaryName" class="form-control" id="brochName">
						</div>
					</div>
					<div class="form-group">
						<label
							class="control-label control-label-text col-sm-2 no-padding-right">描述</label>
						<div class="col-sm-8">
							<textarea class="form-control description" rows="8"
								id="description" name="description"
								style="width: 668px; height: 340px;"></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="button"
								class="btn btn-primary form-control save-brochures">确定</button>
						</div>
						<div class="col-sm-2">
							<button type="button"
								class="btn btn-danger form-control cancel-brochures"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
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
				<span class="widget-caption">编辑</span>
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
						<div class="form-group modal-footer" style="margin-bottom:50px;background:#fbfbfb">
							<div class="col-sm-2 col-sm-offset-4">
								<button type="button"
									class="btn btn-primary form-control save-base-price">确定</button>
							</div>
							<div class="col-sm-2">
								<button type="button"
									class="btn btn-danger form-control cancel-base-price"
									data-dismiss="modal">取消</button>
							</div>
						</div>
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
							<div class="form-group modal-footer">
								<div class="col-sm-2 col-sm-offset-4">
									<button type="button"
										class="btn btn-primary form-control save-server-price">确定</button>
								</div>
								<div class="col-sm-2">
									<button type="button"
										class="btn btn-danger form-control cancel-server-price"
										data-dismiss="modal">取消</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- 树 -->
<div id="content" class="menuContent" style="z-index: 1000; display: none; position: absolute; overflow: auto;">
	<ul id="ajaxTree" class="ztree"
		style="margin-top: 0; width: 168px; height: 100%"></ul>
</div>

<!-- kindeditor -->
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>
<!--Basic Scripts-->
<script src="${ctx_static }/dep/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx_static }/dep/assets/js/bootstrap.min.js"></script>
<!--Beyond Scripts-->
<script id="beyondMinJs" src="${ctx_static }/dep/assets/js/beyond.min.js"></script>
<!-- 日期插件 -->
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-timepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<!-- 表单验证 -->
<script src="${ctx_static }/dep/assets/js/validator-version/bootstrapValidator-0.5.3.js"></script>
<!--下拉框-->
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>
<script src="${ctx_static }/dep/bootstrap-select/js/i18n/defaults-zh_CN.min.js"></script>
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<!-- 信息提示 -->
<script src="${ctx_static }/dep/toastr/toastr.min.js"></script>
<!-- loading加载 -->
<script src="${ctx_static }/dep/jquery-mloading/jquery.mloading.js"></script>
<!-- 滚动条 -->
<script src="${ctx_static }/dep/jquery.nicescroll/jquery.nicescroll.js"></script>
<!-- 树形展示插件 -->
<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<!-- 页面切换 -->
<script src="${ctx_static}/dep/addTabs/bootstrap.addtabs.js"></script>
<!-- 公共js -->
<script src="${ctx_static }/common/js/common.js"></script>
<script src="${ctx_static }/common/js/commonality.js"></script>
<script>
  $.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
    KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
    editor = KindEditor.create('textarea[name="description"]',{
      uploadJson:'${ctx }/file/uploadFile',
        resizeType:0,
        afterBlur: function(){
        this.sync();
      }
    });
  });
</script> 
<!-- 页面js -->
<script src="${ctx_static }/home/product/js/product_base.js?v_<%=Math.random() %>"></script>
<script src="${ctx_static }/home/product/js/product_add.js?v_<%=Math.random() %>"></script>
