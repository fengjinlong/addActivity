<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/financeCenter/css/smallBusiness.css" rel="stylesheet">

<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons">
					<a href="#"></a> 
					<a href="#" class="back-btn" data-toggle="dispose" onclick="loadcheck('/bigBusiness/index')"> <i
						class="fa fa-times"></i>
					</a>
				</div>
				<!--Widget Buttons-->
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main ">
					<div class="tabbable">
						<ul class="nav nav-tabs tabs-flat">
							<li onclick="clickBut(1)" class="active"><a data-toggle="tab" href="#isPay">正酬 </a></li>
							<!-- <li onclick="clickBut(2)" ><a data-toggle="tab" href="#theReward"> 反酬 </a></li>
							<li onclick="clickBut(3)" ><a data-toggle="tab" href="#branchBurden"> 分校负担 </a></li>
							<li onclick="clickBut(4)" ><a data-toggle="tab" href="#collection"> 代收 </a></li>
							<li onclick="clickBut(5)" ><a data-toggle="tab" href="#advance"> 垫付 </a></li> -->
							
								<li onclick="clickBut(6)" class="fineTab"><a data-toggle="tab" href="#fine"> 罚款 </a></li>
							
						</ul>
						<div class="tab-content tabs-flat bordered-blue">
							<div id="isPay" class="tab-pane in active">
								<div class="row row_padding form-horizontal">
									<div class="col-sm-10 col-xs-10">
										<div class="form-group col-lg-6 col-md-8 col-sm-8">
											<input class="form-control" id="reservation1"
												placeholder="项目类别/项目/分成类别/电话/姓名/编号/身份证号">
										</div>
										<div class="form-group pull-left search-box">
											<button type="button"
												class="btn increase form-control search-btn">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table id="init1" 
											class="table table-striped table-hover table-bordered dataTable no-footer">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
													<th>咨询师 
													</th>
													<th>咨询者类型 
													</th>
													<th>学员姓名
													</th>
													<th>课程 
													</th>
													<th>报名表编号 
													</th>
													<th>报名日期
													</th>
													<th>缴费日期
													</th>
													<th>业绩合计
													</th>
													<th>培训费
													</th>
													<th>考务费
													</th>
													<th>教材费
													</th>
													<th>资料费
													</th>
													<th>协议费
													</th>
													<th>服务费
													</th>
													<th>分校收入
													</th>
													<th>正酬
													</th>
													<th>正酬系数
													</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">合计:</td>
													<td class="red">2002</td>
													<td class="red">1402</td>
													<td class="red">600</td>
													<td class="red">0</td>
													<td class="red">0</td>
													<td class="red">0</td>
													<td class="red">0</td>
													<td class="red">1402</td>
													<td class="red">0</td>
													<td class="red">210.3</td>
													<td class="red"></td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>在线有效</td>
													<td>孙婷婷</td>
													<td>直播营养</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1402</td>
													<td>600</td>
													<td>0</td>
													<td>0</td>
													<td>0</td>
													<td>0</td>
													<td>1402</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>在线有效</td>
													<td>孙婷婷</td>
													<td>直播营养</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1402</td>
													<td>600</td>
													<td>0</td>
													<td>0</td>
													<td>0</td>
													<td>0</td>
													<td>1402</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>在线有效</td>
													<td>孙婷婷</td>
													<td>直播营养</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1402</td>
													<td>600</td>
													<td>0</td>
													<td>0</td>
													<td>0</td>
													<td>0</td>
													<td>1402</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div id="theReward" class="tab-pane in">
								<div class="row row_padding form-horizontal">
									<div class="col-sm-10 col-xs-10">
										<div class="form-group col-lg-6 col-md-8 col-sm-8">
											<input id="reservation2" class="form-control" placeholder="项目/电话/姓名/编号/身份证号">
										</div>
										<div class="form-group pull-left search-box">
											<button type="button"
												class="btn increase form-control search-btn">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table id="init2" 
											class="table table-striped table-hover table-bordered dataTable no-footer">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
													<th>学员姓名
													</th>
													<th>课程
													</th>
													<th>报名表编号
													</th>
													<th>财务编号
													</th>
													<th>报名日期
													</th>
													<th>支付日期
													</th>
													<th>退费金额
													</th>
													<th>集团基数
													</th>
													<th>考试费
													</th>
													<th>扣除考试费
													</th>
													<th>反酬
													</th>
													<th>反酬系数
													</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">合计:</td>
													<td class="red">2002</td>
													<td class="red">1422</td>
													<td class="red">600</td>
													<td class="red">0</td>
													<td class="red">210.3</td>
													<td class="red"></td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>143473</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1422</td>
													<td>600</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>143473</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1422</td>
													<td>600</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>143473</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1422</td>
													<td>600</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div id="branchBurden" class="tab-pane in">
								<div class="row row_padding form-horizontal">
									<div class="col-sm-10 col-xs-10">
										<div class="form-group col-lg-6 col-md-8 col-sm-8">
											<input id="reservation3" class="form-control" placeholder="项目/电话/姓名/编号/身份证号">
										</div>
										<div class="form-group pull-left search-box">
											<button type="button"
												class="btn increase form-control search-btn">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table id="init3" 
											class="table table-striped table-hover table-bordered dataTable no-footer">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
													<th>学员姓名
													</th>
													<th>课程
													</th>
													<th>报名表编号
													</th>
													<th>财务编号
													</th>
													<th>报名日期
													</th>
													<th>支付日期
													</th>
													<th>退费金额
													</th>
													<th>集团基数
													</th>
													<th>考试费
													</th>
													<th>扣除考试费
													</th>
													<th>分校负担
													</th>
													<th>分校负担系数
													</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">合计:</td>
													<td class="red">2002</td>
													<td class="red">1422</td>
													<td class="red">600</td>
													<td class="red">0</td>
													<td class="red">210.3</td>
													<td class="red"></td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>143473</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1422</td>
													<td>600</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>143473</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1422</td>
													<td>600</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>143473</td>
													<td>2016-10-25 15:5</td>
													<td>2016-10-25 15:5</td>
													<td>2002</td>
													<td>1422</td>
													<td>600</td>
													<td>0</td>
													<td>210.3</td>
													<td>0.15</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div id="collection" class="tab-pane in">
								<div class="row row_padding form-horizontal">
									<div class="col-sm-10 col-xs-10">
										<div class="form-group col-lg-6 col-md-8 col-sm-8">
											<input id="reservation4" class="form-control" placeholder="项目/电话/姓名/编号/身份证号">
										</div>
										<div class="form-group pull-left search-box">
											<button type="button"
												class="btn increase form-control search-btn">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table id="init4" 
											class="table table-striped table-hover table-bordered dataTable no-footer">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
													<th>学员姓名
													</th>
													<th>课程
													</th>
													<th>报名表编号
													</th>
													<th>缴费日期
													</th>
													<th>学杂费
													</th>
													<th>资料费
													</th>
													<th>服务费
													</th>
													<th>集团代收
													</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">合计:</td>
													<td class="red">174</td>
													<td class="red">0</td>
													<td class="red">0</td>
													<td class="red"></td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>174</td>
													<td>0</td>
													<td>0</td>
													<td>174</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>174</td>
													<td>0</td>
													<td>0</td>
													<td>174</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>直播人力</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>174</td>
													<td>0</td>
													<td>0</td>
													<td>174</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div id="advance" class="tab-pane in">
								<div class="row row_padding form-horizontal">
									<div class="col-sm-10 col-xs-10">
										<div class="form-group col-lg-6 col-md-8 col-sm-8">
											<input id="reservation5" class="form-control" placeholder="项目/电话/姓名/编号/身份证号">
										</div>
										<div class="form-group pull-left search-box">
											<button type="button"
												class="btn increase form-control search-btn">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table id="init5" 
											class="table table-striped table-hover table-bordered dataTable no-footer">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
													<th>学员姓名
													</th>
													<th>课程 
													</th>
													<th>报名表编号 
													</th>
													<th>缴费日期
													</th>
													<th>缴费金额
													</th>
													<th>考务费
													</th>
													<th>提取考务费财务编号
													</th>
													<th>提取考务费日期
													</th>
													<th>提取考务费金额
													</th>
													<th>退费财务编号
													</th>
													<th>退费日期
													</th>
													<th>退费金额
													</th>
													<th>集团垫付
													</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">合计:</td>
													<td class="red">174</td>
													<td class="red">0</td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">0</td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">0</td>
													<td class="red">0</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>人力直播</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>174</td>
													<td>0</td>
													<td>01025668</td>
													<td>2016-10-18 17:10</td>
													<td>0</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>0</td>
													<td>0</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>人力直播</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>174</td>
													<td>0</td>
													<td>01025668</td>
													<td>2016-10-18 17:10</td>
													<td>0</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>0</td>
													<td>0</td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>丁胜</td>
													<td>人力直播</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>174</td>
													<td>0</td>
													<td>01025668</td>
													<td>2016-10-18 17:10</td>
													<td>0</td>
													<td>01025668</td>
													<td>2016-10-25 15:5</td>
													<td>0</td>
													<td>0</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div id="fine" class="tab-pane in">
								<div class="row row_padding form-horizontal">
									<div class="col-sm-10 col-xs-10">
										<div class="form-group col-lg-6 col-md-8 col-sm-8">
											<input id="reservation6" class="form-control searchType" placeholder="处罚类别">
										</div>
										<div class="form-group pull-left search-box">
											<button type="button"
												class="btn increase form-control search-btn">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
								</div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table id="init6" 
											class="table table-striped table-hover table-bordered dataTable no-footer">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
													<th>归属分校 
													</th>
													<th>归属部门 
													</th>
													<th>处罚类别
													</th>
													<th>事件日期 
													</th>
													<th>提交日期 
													</th>
													<th>处理日期
													</th>
													<th>违规人
													</th>
													<th>罚款(-)
													</th>
													<th>罚款(+)
													</th>
													<th>生效日期
													</th>
													<th>操作
													</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red"></td>
													<td class="red">合计:</td>
													<td class="red">50</td>
													<td class="red">0</td>
													<td class="red"></td>
													<td class="red"></td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>01北京</td>
													<td></td>
													<td>争议单</td>
													<td>2016-10-25</td>
													<td>2016-10-25</td>
													<td>2016-10-25</td>
													<td>刘嘉鹏</td>
													<td>50</td>
													<td>0</td>
													<td>2016-10-24</td>
													<td><a href="#" class="btn btn-warning btn-xs view"
														data-toggle="modal" data-target=".fineView"
														data-backdrop="static"> <i class="fa fa-folder-open-o"></i>
															查看
													</a></td>
												</tr>
												<tr>
													<td><label> <input type="checkbox"> <span
															class="text"></span>
													</label></td>
													<td>01北京</td>
													<td></td>
													<td>争议单</td>
													<td>2016-10-25</td>
													<td>2016-10-25</td>
													<td>2016-10-25</td>
													<td>刘嘉鹏</td>
													<td>50</td>
													<td>0</td>
													<td>2016-10-24</td>
													<td><a href="#" class="btn btn-warning btn-xs view"
														data-toggle="modal" data-target=".fineView"
														data-backdrop="static"> <i class="fa fa-folder-open-o"></i>
															查看
													</a></td>
												</tr>
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
<!-- /Page Content -->
</div>
<!-- /Page Container -->
<!-- Main Container -->
</div>
</div>
</div>

<!--惩罚查看-->
<div class="modal fade fineView" tabindex="-1" role="dialog"
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
				<form class="form-horizontal">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属分校</label>
						<div class="col-sm-9">
							<input type="text" name="branchSchool" class="form-control"
								disabled>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">归属部门</label>
						<div class="col-sm-9">
							<input type="text" name="department" class="form-control"
								disabled>
						</div>
					</div>
					<div class="form-group col-sm-6">
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
					<div class="form-group col-sm-6">
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
					<div class="form-group col-sm-6 ">
						<label class="control-label col-sm-3 no-padding-right">被处罚人</label>
						<div class="col-sm-9">
							<select class="form-control" name="sanctionedPerson " disabled>
								<option value="0">张三</option>
								<option value="1">李四</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处罚金额</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="penaltyAmount"
								disabled>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">生效日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name="effectiveDate" disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处罚类别</label>
						<div class="col-sm-9">
							<select class="form-control" name="penaltyCategories" disabled>
								<option value="0"></option>
								<option value="1"></option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-3 no-padding-right">处理日期</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input class="form-control date-picker" type="text"
									name='handleDate' disabled> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="control-label col-sm-7 no-padding-right"
							style="margin-left: -7px">是否补贴分校</label>
						<div class="col-sm-5 no-padding-right">
							<select name="" class="form-control" name="subsidy" disabled>
								<option value="0">是</option>
								<option value="1">否</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="control-label col-sm-3 no-padding-right">金额</label>
						<div class="col-sm-9 no-padding-right">
							<input type="text" class="form-control" name="money" disabled>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right remarkText">事件描述</label>
						<div class="col-sm-10 remarkContent">
							<textarea class="form-control" name="describe" rows="5" disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right remarkText">质检过程</label>
						<div class="col-sm-10 remarkContent">
							<textarea class="form-control" name="quality" rows="5" disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right remarkText">判定依据</label>
						<div class="col-sm-10 remarkContent">
							<textarea class="form-control" name="criterion" rows="5" disabled></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
						<div class="col-sm-10 remarkContent">
							<textarea class="form-control remark" name="remark"
								style="width: 100%; height: 340px"></textarea>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script>
var depId = '${id}';
var newBeginTime = '${newBeginTime}';
var newEndTime = '${newEndTime}';
var brandName = '${brandName}';
if(brandName == 2){
	$('.fineTab').hide();
} else if(brandName == 1){
	$('.fineTab').show();
}

console.log(brandName)
</script>
<!--富文本编辑器-->
<script src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>

<script src="${ctx_static }/home/financeCenter/js/bigBusinessCheck.js"></script>



