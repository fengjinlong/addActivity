<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons">
					<a href="#" data-toggle="collapse"> <i class="fa fa-minus"></i>
					</a> <a href="#" data-toggle="dispose"> <i class="fa fa-times"></i>
					</a>
				</div>
				<!--Widget Buttons-->
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main ">
					<div class="tabbable">
						<input type="hidden" id="currentRewardOrPunish" value="1">
						<ul class="nav nav-tabs tabs-flat">
							<li class="active"><a data-toggle="tab"
								onclick="changeCurrent('1')" href="#rewards">奖励</a></li>
							<li><a data-toggle="tab" onclick="changeCurrent('2')"
								href="#punishment">惩罚</a></li>
						</ul>
						<div class="tab-content tabs-flat">
							<div id="rewards" class="tab-pane in active">
								<div class="row row_padding form-horizontal">
									<div class="col-md-5 col-sm-5 form-group">
										<label class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">日期</label>
											<!-- <select class="form-control dateSearch" id="dateSearch">
												<option value="">--请选择日期--</option>
												<option value="eventDate">事件日期</option>
												<option value="commitDate">提交日期</option>
												<option value="effectDate">生效日期</option>
											</select> -->
										<div class="col-md-9 col-sm-9">
											<div class="input-group date">
												<input type="text" class="form-control duration"
													id="duration"> <span class="input-group-addon">
													<i class="fa fa-calendar"></i>
												</span>
											</div>
										</div>
									</div>

									<div class="col-md-5 col-sm-5 form-group no-padding">
										<div class="form-group col-md-10 col-sm-10 no-margin-right">
											<input type="text" class="form-control searchVal"
												placeholder="所属公司/所属部门/奖励类型/受奖人" onkeydown="search()">
										</div>
										<div class="form-group col-md-2 col-sm-2 pull-left margin-left-10">
											<button type="button"
												class="btn btn-lightBlue form-control search-btn"
												data-id="rewardPunishs">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
									<%-- <div class="col-md-3 col-sm-3 form-group">
										<div class="pull-right margin-right-40">
											<div class="btn-group">
												<span class="btn btn-default pointer"
													title="View print view"><span>打印</span></span>
												<button type="button"
													class="btn btn-default dropdown-toggle"
													data-toggle="dropdown">
													导出 <i class="fa fa-angle-up"></i>
												</button>
												<ul class="dropdown-menu" role="menu">
													<li><a target="download"
														href="${ctx }/rewardPunish/downloadPDF/1">保存PDF</a></li>
													<li><a href="${ctx }/rewardPunish/downloadExcel/1">导出EXCEL</a></li>
													<li><a href="${ctx }/rewardPunish/downloadCSV/1">导出CSV</a></li>

													<li><a href="javascript:exportPDF(1);">导出PDF</a></li>
													<li><a href="javascript:exportExcel(1);">导出EXCEL</a></li>
													<li><a href="javascript:exportCSV(1);">导出CSV</a></li>
												</ul>
											</div>
										</div>
									</div> --%>
									<div class="form-group pull-right" style="margin-right: 15px;">
										<button type="button" class="btn btn-lightBlue  form-control"
											data-toggle="modal" data-backdrop="static"
											data-target=".rewardAdd" id="rewardAddButton">

											<i class="fa fa-plus right"></i> 新增
										</button>
									</div>

								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table
											class="table table-striped table-hover table-bordered dataTable no-footer"
											id="rewardPunishs">
											<thead>
												<tr role="row">
													<th><label> <input type="checkbox"
															class="checkAll"> <span class="text"></span></label></th>
													<th>归属公司</th>
													<th>归属部门</th>
													<th>奖励类别</th>
													<th>事件日期</th>
													<th>提交日期</th>
													<th>受奖人</th>
													<th>奖励金额/元</th>
													<th>生效日期</th>
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
							<div id="punishment" class="tab-pane">
								<div class="row row_padding form-horizontal">
									<div class="col-md-5 col-sm-5 form-group">
										<label class="col-lg-2 col-md-3 col-sm-3 control-label no-padding-right">日期</label>
											<!-- <select class="form-control dateSearch1" id="dateSearch1">
												<option value="">--请选择日期--</option>
												<option value="eventDate">事件日期</option>
												<option value="commitDate">提交日期</option>
												<option value="dealDate">处理日期</option>
												<option value="effectDate">生效日期</option>
											</select> -->
										<div class="col-md-9 col-sm-9">
											<div class="input-group date">
												<input type="text" class="form-control duration"
													id="duration1"> <span class="input-group-addon"><i
													class="fa fa-calendar"></i></span>
											</div>
										</div>
									</div>

									<div class="col-md-5 col-sm-5 form-group no-padding">
										<div class="form-group col-md-10 col-sm-10 no-margin-right">
											<input type="text" class="form-control searchVal"
												placeholder="所属公司/所属部门/处罚类别/违规人" onkeydown="search()">
										</div>
										<div class="form-group col-md-2 col-sm-2 pull-left margin-left-10">
											<button type="button"
												class="btn btn-lightBlue form-control search-btn"
												data-id="punishRewards">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
									<%-- <div class="col-md-3 col-sm-3 form-group">
										<div class="pull-right margin-right-40">
											<div class="btn-group">
												<span class="btn btn-default pointer"
													title="View print view"><span>打印</span></span>
												<button type="button"
													class="btn btn-default dropdown-toggle"
													data-toggle="dropdown">
													导出 <i class="fa fa-angle-up"></i>
												</button>
												<ul class="dropdown-menu" role="menu">
													<li><a target="download"
														href="${ctx }/rewardPunish/downloadPDF/2">保存PDF</a></li>
													<li><a href="${ctx }/rewardPunish/downloadExcel/2">导出EXCEL</a></li>
													<li><a href="${ctx }/rewardPunish/downloadCSV/2">导出CSV</a></li>
													<li><a href="javascript:exportPDF(2);">导出PDF</a></li>
													<li><a href="javascript:exportExcel(2);">导出EXCEL</a></li>
													<li><a href="javascript:exportCSV(2);">导出CSV</a></li>
												</ul>
											</div>
										</div>
									</div> --%>
									<div class="form-group pull-right" style="margin-right: 15px;">
										<button type="button" class="btn btn-lightBlue form-control"
											data-toggle="modal" data-backdrop="static"
											data-target=".punishmentAdd" id="punishmentAddButton">
											<i class="fa fa-plus right"></i> 新增
										</button>
									</div>

								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table
											class="table table-striped table-hover table-bordered dataTable no-footer"
											id="punishRewards">
											<thead>
												<tr role="row">
													<th><label> <input type="checkbox"
															class="checkAll"> <span class="text"></span></label></th>
													<th>归属公司</th>
													<th>归属部门</th>
													<th>处罚类别</th>
													<th>事件日期</th>
													<th>提交日期</th>
													<th>处理日期</th>
													<th>违规人</th>
													<th>处罚金额/元</th>
													<th>生效日期</th>
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
				<!--Widget-->
			</div>
		</div>
	</div>
</div>

<!--奖励新增-->
<div class="modal fade rewardAdd" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="rewardAdd"
					action="${ctx}/rewardPunish/add" method="post">
					<input class="form-control" type="hidden" name="rewardPunishId">
				<!-- 	<div class="form-group col-sm-6">
						 <label class="control-label col-sm-3 no-padding-right">所属公司<span class="control-label mandatory"></span></label>
                        <div class="col-sm-9">
                            <input readonly onclick="showMenu('company_id', 1)" id="company_id" name="company_id" class="form-control"></input>
                            <input type="hidden" id="companyId" name="companyId" ></input>
                        </div>
					</div>
					<div class="form-group col-sm-6">
						 <label class="control-label col-sm-3 no-padding-right">所属部门<span class="control-label mandatory"></span></label>
                        <div class="col-sm-9">
                        	<input readonly onclick="showMenu('department_id', 2)" id="department_id" name="department_id" class="form-control"></input>
                        	<input type="hidden" id="departmentId" name="departmentId" ></input>
                        </div>
					</div> -->
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属公司</label>
						<div class="col-sm-9">
							<select name="departmentId1" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<select class="form-control chosen-select" name="departmentId2"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 activityType">
						<label class="control-label col-sm-3 no-padding-right">事件日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="eventDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 overlay">
						<label class="control-label col-sm-3 no-padding-right">提交日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commitDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 discount">
						<label class="control-label col-sm-3 no-padding-right">被奖励人</label>
						<div class="col-sm-9">
							<select name="userId" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">奖励金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control verify-num" name="rewardPunishPrice">
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commndDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">奖励类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="rpSortId"
								data-placeholder="--请选择--">
								<!-- <option value="0"></option>
                                <option value="1"></option> -->
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="description" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardCriterion" name="judgments"
								rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">备注</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardRemarkAdd" name="remark"
								id="awardRemarkAdd" style="width: 684px; height: 340px;"></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="button"
								class="btn btn-primary form-control reward-add"
								data-toggle="modal" data-backdrop="static">确定</button>
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

<!--奖励查看-->
<div class="modal fade rewardView" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="rewardView">
					<input class="form-control" type="hidden" name="rewardPunishId">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属公司</label>
						<div class="col-sm-9">
							<select name="departmentId1" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1" disabled>
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<select class="form-control" name="departmentId2"
								data-placeholder="--请选择--" disabled>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 activityType">
						<label class="control-label col-sm-3 no-padding-right">事件日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="eventDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 overlay">
						<label class="control-label col-sm-3 no-padding-right">提交日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commitDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 discount">
						<label class="control-label col-sm-3 no-padding-right">被奖励人</label>
						<div class="col-sm-9">
							<select name="userId" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1" disabled>
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">奖励金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control verify-num" name="rewardPunishPrice"
								disabled>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commndDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">奖励类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="rpSortId"
								data-placeholder="--请选择--" disabled>
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="description" rows="4"
								disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardCriterion" name="judgments"
								rows="4" disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">备注</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardRemarkAdd" name="remark"
								id="awardRemark" style="width: 684px; height: 340px;" disabled></textarea>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--奖励编辑-->
<div class="modal fade rewardEdit" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="rewardEdit"
					action="${ctx}/rewardPunish/update" method="post">
					<input class="form-control" type="hidden" name="rewardPunishId">
					<!-- <div class="form-group col-sm-6">
						 <label class="control-label col-sm-4">所属公司<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input readonly onclick="showMenu('company_id', 1)" id="company_id" name="company_id" class="form-control"></input>
                            <input type="hidden" id="companyId" name="companyId" ></input>
                        </div>
					</div>
					<div class="form-group col-sm-6">
						 <label class="control-label col-sm-4">所属部门<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                        	<input readonly onclick="showMenu('department_id', 2)" id="department_id" name="department_id" class="form-control"></input>
                        	<input type="hidden" id="departmentId" name="departmentId" ></input>
                        </div>
					</div> -->
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属公司</label>
						<div class="col-sm-9">
							<select name="departmentId1" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<select class="form-control" name="departmentId2"
								data-placeholder="--请选择--">
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 activityType">
						<label class="control-label col-sm-3 no-padding-right">事件日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="eventDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 overlay">
						<label class="control-label col-sm-3 no-padding-right">提交日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commitDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 discount">
						<label class="control-label col-sm-3 no-padding-right">被奖励人</label>
						<div class="col-sm-9">
							<select name="userId" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">奖励金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control verify-num" name="rewardPunishPrice">
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commndDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">奖励类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="rpSortId"
								data-placeholder="--请选择--">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="description" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardCriterion" name="judgments"
								rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">备注</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardRemarkAdd" name="remark"
								id="awardRemarkEdit" style="width: 684px; height: 340px;"></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="button"
								class="btn btn-primary form-control reward-edit"
								data-toggle="modal" data-backdrop="static">确定</button>
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

<!--惩罚新增-->
<div class="modal fade punishmentAdd" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="punishmentAdd"
					action="${ctx}/rewardPunish/add" method="post">
					<input class="form-control" type="hidden" name="rewardPunishId">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属公司</label>
						<div class="col-sm-9">
							<select name="departmentId1" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<select class="form-control" name="departmentId2"
								data-placeholder="--请选择--">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 activityType">
						<label class="control-label col-sm-3 no-padding-right">事件日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="eventDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 overlay">
						<label class="control-label col-sm-3 no-padding-right">提交日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commitDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 discount">
						<label class="control-label col-sm-3 no-padding-right">被处罚人</label>
						<div class="col-sm-9">
							<select name="userId" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">处罚金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control verify-num" name="rewardPunishPrice">
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commndDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处罚类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="rpSortId"
								data-placeholder="--请选择--">
								<!-- <option value="0"></option>
                                <option value="1"></option> -->
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处理日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="passDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="description" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">质检过程</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="quality" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardCriterion" name="judgments"
								rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">备注</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardRemarkAdd" name="remark"
								id="punishRemarkAdd" style="width: 684px; height: 340px;"></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="button"
								class="btn btn-primary form-control punishment-add"
								data-toggle="modal" data-backdrop="static">确定</button>
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

<!--惩罚查看-->
<div class="modal fade punishmentView" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="punishmentView">
					<input class="form-control" type="hidden" name="rewardPunishId">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属公司</label>
						<div class="col-sm-9">
							<select name="departmentId1" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1" disabled>
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<select class="form-control" name="departmentId2"
								data-placeholder="--请选择--" disabled>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 activityType">
						<label class="control-label col-sm-3 no-padding-right">事件日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="eventDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 overlay">
						<label class="control-label col-sm-3 no-padding-right">提交日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commitDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 discount">
						<label class="control-label col-sm-3 no-padding-right">被处罚人</label>
						<div class="col-sm-9">
							<select name="userId" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1" disabled>
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">处罚金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="rewardPunishPrice"
								disabled>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commndDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处罚类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="rpSortId"
								data-placeholder="--请选择--" disabled>
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处理日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="passDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="description" rows="4"
								disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">质检过程</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="quality" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardCriterion" name="judgments"
								rows="4" disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">备注</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardRemarkAdd" name="remark"
								id="punishRemark" style="width: 684px; height: 340px;" disabled></textarea>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--惩罚编辑-->
<div class="modal fade punishmentEdit" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="punishmentEdit"
					action="${ctx}/rewardPunish/update" method="post">
					<input class="form-control" type="hidden" name="rewardPunishId">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属公司</label>
						<div class="col-sm-9">
							<select name="departmentId1" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<select class="form-control" name="departmentId2"
								data-placeholder="--请选择--">
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 activityType">
						<label class="control-label col-sm-3 no-padding-right">事件日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="eventDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 overlay">
						<label class="control-label col-sm-3 no-padding-right">提交日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commitDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6 discount">
						<label class="control-label col-sm-3 no-padding-right">被处罚人</label>
						<div class="col-sm-9">
							<select name="userId" class="form-control chosen-select"
								data-placeholder="--请选择--" tabindex="1">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">处罚金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control verify-num" name="rewardPunishPrice">
						</div>
					</div>
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="commndDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处罚类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="rpSortId"
								data-placeholder="--请选择--">
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处理日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="passDate"> <span class="input-group-addon">
									<i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="description" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">质检过程</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control" name="quality" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardCriterion" name="judgments"
								rows="4"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right labelText">备注</label>
						<div class="col-sm-10 textContent">
							<textarea class="form-control awardRemarkAdd" name="remark"
								id="punishRemarkEdit" style="width: 684px; height: 340px;"></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="button"
								class="btn btn-primary form-control punishment-edit"
								data-toggle="modal" data-backdrop="static">确定</button>
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
<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/dep/form/custom.jquery.form.js"></script>
<script src="${ctx_static }/dep/form/jquery.form.min.js"></script>
<script src="${ctx_static }/home/qualityTesting/js/rewardPunish.js?v_<%=System.currentTimeMillis() %>"></script>
