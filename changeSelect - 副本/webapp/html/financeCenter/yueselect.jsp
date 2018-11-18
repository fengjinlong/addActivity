<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

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
						<input hidden value="${deptId }" id="deptId">
						<input hidden value="${type }" id="type">
						<input hidden value="${deptName } " id="deptName">
						<div class="col-md-5 col-sm-3 col-xs-12">
							<div class="form-group">
								<label class="control-label no-padding-right pull-left margin-left-20">日期</label>
								<div class="col-md-10 col-sm-9">
									<div class="controls">
										<div class="input-group date">
											<input type="text" class="form-control date_time" placeholder="请选择日期" id="reservation" onkeydown="search();"><span class="input-group-addon"><i class="fa fa-calendar"></i></span>
										</div>
									</div>
								</div>
								
							</div>
						</div>

						<div class="col-md-5 col-sm-6 col-xs-12">
							<div class="form-group col-md-3 col-sm-4">
								<button type="button" class="btn increase form-control search-btn" onclick="toSearch()">
									<i class="fa fa-search"></i> 搜索
                                </button>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
							<thead>
								<tr role="row">
									<th>分校</th>
									<th>报名收入</th>
									<!-- <th>分期收入</th> -->
									<th>订座收入</th>
									<th>财务收入</th>
									<th>财务支出</th>
									<th>分校余额</th>
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

<script src="${ctx_static }/home/financeCenter/js/yueselect.js"></script>

