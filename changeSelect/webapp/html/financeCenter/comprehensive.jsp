<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/jedate/skin/jedate.css" />
<link href="${ctx_static }/home/financeCenter/css/comprehensive.css" rel="stylesheet" />

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				 <div class="widget-buttons"></div>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-6 col-xs-12 form-group">
							<label class="control-label pull-left margin-left-20">付款日期</label>
							<div class="col-md-9 col-sm-9">
								<div class="controls">
									<div class="input-group date">
										<input type="text" class="form-control date_time"
											placeholder="请选择日期" id="reservation"><span class="input-group-addon"><i
											class="fa fa-calendar"></i></span>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-5 col-sm-6 col-xs-12">
							<div class="form-group col-md-9 col-sm-4 no-margin-right">
								<input class="form-control" placeholder="收款单位/类别科目"
									type="text" onkeydown="search()" id="searchVal">
							</div>
							<!-- <div class="form-group col-md-9 col-sm-4 no-margin-right">
								<select  id="searchType">
									<option > 请选择 </option>
									<option value="1"> 营业收入 </option>
									<option value="2"> 营业外收入 </option>
								</select>
							</div> -->
							<div class="form-group col-md-3 col-sm-4">
								<button type="button"
									class="btn increase form-control search-btn" onclick="toSearch()">
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
									<li><a target="download" href="${ctx }/financeGeneral/downloadPDF">保存PDF</a></li>
									<li><a href="${ctx }/financeGeneral/downloadExcel">导出EXCEL</a></li>
									<li><a href="${ctx }/financeGeneral/downloadCSV">导出CSV</a></li>
								</ul>
							</div>
							<c:if test="${!empty sessionScope.xwzx_jtcw_zhbsr_add }">
							<button class="btn increase  pull-right col-sm-4"
								data-toggle="modal"
								data-backdrop="static" id="add">
								<i class="fa fa-plus"></i> 新增 
							</button>
							</c:if>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<table
							class="table table-striped table-hover table-bordered dataTable no-footer" id="init">
							<thead>
								<tr role="row">
									<th>
										<label> <input type="checkbox" class="checkAll"> <span class="text"></span></label>
									</th>
									<th>付款日期</th>
									<th>付款单位</th>
									<th>收款单位</th>
									<th>一级科目</th>
									<th>二级科目</th>
									<th>收入明细</th>
									<th>金额</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>

			</div>

		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!---新增--->
<div class="modal fade bs-example-modal-lg1 in" tabindex="-1" id="myModel"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body  clearfix form-horizontal modal_padding">

				<form method="post" class="form-horizontal padding-top-20"
					style="padding: 0 20px" id="addForm" >
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款单位</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="payOrg">
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
							<!-- <select id="collectionDepartmentId" class="form-control" name="collectionDepartment"></select> -->
							<select class="form-control chosen-select"  id="collectionDepartmentId" name="collectionDepartment"></select>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">金额</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" name="money">
						</div>
						<div class="col-sm-5">
							<select class="form-control" name="payment">
								<option value="1" selected>现金</option>
								<option value="2">汇款</option>
								<option value="3">支票</option>
								<option value="4">POS</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">产品</label>
						<div class="col-sm-9">
							<select class="form-control chosen-select" id="productId" name="productId"></select>
						</div>
					</div>
					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" id="pCostclassId" name="pCostclassId"></select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" id="costclassId" name="costclassId"></select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" name="incomeType">
								<option value="1" selected="selected">营业收入</option>
								<option value="2">营业外收入</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-40px;">收入明细</label>
						<div class="col-sm-10" style="width:85%;">
							<input type="text" class="form-control" name="incomeDetail">
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">详细说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="content" id="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('#content',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){
												this.sync();
											}
									});
								});
                          </script>        
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">备注</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="memo" id="memo" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor1 = KindEditor.create('#memo',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){
												this.sync();
											}
									});
								});
                          </script>        
						</div>
					</div>

					<div class="col-sm-12 form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<input type="button" onclick="validateForm()" class="btn btn-primary btn-md btn-block" value="确认"/>
						</div>
						<div class="col-sm-2">
							<a type="button" class="btn btn-danger btn-md btn-block" data-dismiss="modal">取消</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!---查看--->
<div class="modal fade bs-example-modal-lg in" tabindex="-1" id="checkModal"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body  clearfix form-horizontal modal_padding">

				<form method="post" class="form-horizontal padding-top-20"
					style="padding: 0 20px" id="editForm" onsubmit="return editValidateForm();">
					<input type="hidden" name="generalId">
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
										class="input-group-addon"><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">收款单位</label>
						<div class="col-sm-9">
							<select class="form-control chosen-select"  id="collectionDepartmentId2" name="collectionDepartment"></select>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">金额</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" disabled name="money">
						</div>
						<div class="col-sm-5">
							<select class="form-control chosen-select" name="payment" disabled>
								<option value="1">现金</option>
								<option value="2">汇款</option>
								<option value="3">支票</option>
								<option value="4">POS</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">产品</label>
						<div class="col-sm-9">
							<select class="form-control chosen-select" id="productId2" disabled name="productId"></select>
						</div>
					</div>
					<div class="form-group col-lg-10 col-md-12 col-sm-12">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" id="pCostclassId2" disabled name="pCostclassId"></select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" id="costclassId2" disabled name="costclassId"></select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" name="incomeType" disabled>
								<option value="1">营业收入</option>
								<option value="2">营业外收入</option>
							</select>
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-40px;">收入明细</label>
						<div class="col-sm-10" style="width:85%;">
							<input type="text" class="form-control" name="incomeDetail" disabled>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">详细说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="content" id="content2" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor2 = KindEditor.create('#content2',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0
									});
								});
                          </script>  
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">详细说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="memo" id="memo2" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor3 = KindEditor.create('#memo2',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0
									});
								});
                          </script>  
						</div>
					</div>

					<div class="col-sm-12 form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<input type="submit" class="btn btn-primary btn-md btn-block" value="确认"/>
						</div>
						<div class="col-sm-2">
							<a type="button" class="btn btn-danger btn-md btn-block" data-dismiss="modal">取消</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!---查看end--->

<script src="${ctx_static }/dep/jedate/jquery.jedate.js"></script>
<script src="${ctx_static }/home/financeCenter/js/comprehensive.js?v=<%=System.currentTimeMillis() %>"></script>

