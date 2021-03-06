<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/serviceCenter/css/informationVerify.css" rel="stylesheet" />

<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all"
	rel="stylesheet" type="text/css" />
<link href="${ctx_static }/home/serviceCenter/css/serviceCenter.css"
	rel="stylesheet" />
<link href="${ctx_static }/home/serviceCenter/css/serverInfo.css"
	rel="stylesheet" />

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
				<div class="widget-main clearfix">
					<div class="col-lg-12 col-sm-12 col-xs-12">
						<div class="tabbable">
							<ul class="nav nav-tabs" id="myTab">
								<li class="active"><a data-toggle="tab"
									href="#returned-student"> 退回学员 </a></li>

								<li><a data-toggle="tab" href="#amountDataPartial">
										资料金额均不全 </a></li>
								<li><a data-toggle="tab" href="#dataPartial"> 资料不全 </a></li>
								<li><a data-toggle="tab" href="#amountPartial"> 金额不全 </a></li>
								<li><a data-toggle="tab" href="#amountData"> 资料金额齐全 </a></li>
							</ul>

							<div class="tab-content content" id="stuServiceCenterInfo" style="margin-bottom:50px">

								<!--退回学员-->
								<div id="returned-student" class="tab-pane clearfix in active">
									<div class="col-lg-12 col-sm-12 col-xs-12">
										<div class="row row_padding form-horizontal">
											<div class="col-md-5 col-sm-5 col-xs-12">
												<div class="form-group">
													<label class="control-label no-padding-right pull-left">日期</label>
													<div class="col-lg-11 col-md-11 col-sm-11">
														<div class="controls">
															<div class="input-group date">
																<input type="text" id="date1" class="form-control  reservation"
																	placeholder="请选择日期"> <span
																	class="input-group-addon"> <i
																	class="fa fa-calendar"></i>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="col-md-4 col-sm-4 col-xs-12">
												<label class="col-md-4 control-label no-padding-right">产品模型</label>
												<div class="col-md-8 no-padding-right">
													<select id="productModel1" class="form-control chosen-select">
														
													</select>
												</div>
											</div>
											
											
											<div class="col-md-3 col-sm-3 col-xs-12">
												<label class="control-label no-padding-right pull-left">产品</label>
												<div class="col-md-10 no-padding-right">
													<select id="product1" class="form-control chosen-select">
													
													</select>
												</div>
											</div>
										</div>
										</div>
										<div class="col-lg-12 col-sm-12 col-xs-12">
											<div class="row row_padding form-horizontal">
												<div class="form-group col-md-12 col-sm-12 col-xs-12">
													<div class="form-group col-md-8 col-sm-9 no-margin-right">
														<input type="text" class="form-control" id="key1"
															placeholder="姓名/电话/报名表编号/身份证号">
													</div>
													<div class="form-group col-lg-4 col-md-4 col-sm-4">
														<button type="button" onclick="initTable1()"
															class="btn btn-blue form-control search-btn">搜索</button>
													</div>
												</div>
											</div>
										</div>
										<div class="dataTables_wrapper1 form-inline no-footer">
											<div class="table-scrollable">
												<table
													class="table table-striped table-hover table-bordered dataTable no-footer"
													id="table1">
													<thead>
														<tr role="row">
															<th width="5%"><label> <input class="checkAll"
																	type="checkbox"> <span class="text"></span>
															</label></th>
															<th>报名日期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>分校 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>姓名 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>性别 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>身份证号码 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>籍贯 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>考期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>产品名称 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>应缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>实缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>资料是否齐全 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回原因 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>操作</th>
														</tr>
													</thead>

													<tbody>
														
													</tbody>
												</table>
											</div>
										</div>

									<div class="btn-box">
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">拨打电话</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送短信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送邮件</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">微信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block complate1"
											data-toggle="modal">审核完成</button>
									</div>

								</div>

								<!--资料金额均不全-->
								<div id="amountDataPartial" class="tab-pane clearfix">
									<div class="col-lg-12 col-sm-12 col-xs-12">
										<div class="row row_padding form-horizontal">
											<div class="col-md-5 col-sm-5 col-xs-12">
												<div class="form-group">
													<label class="control-label no-padding-right pull-left">日期</label>
													<div class="col-lg-11 col-md-11 col-sm-11">
														<div class="controls">
															<div class="input-group date">
																<input type="text" id="date2" class="form-control  reservation"
																	placeholder="请选择日期"> <span
																	class="input-group-addon"> <i
																	class="fa fa-calendar"></i>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="form-group col-md-4">
												<label class="col-md-4 control-label no-padding-right">产品模型</label>
												<div class="col-md-8 no-padding-right">
													<select id="productModel2" class="form-control chosen-select">
														
													</select>
												</div>
											</div>
											
											<div class="form-group col-md-3">
												<label class="control-label no-padding-right pull-left">产品</label>
												<div class="col-md-10 no-padding-right">
													<select id="product2" class="form-control chosen-select">
													
													</select>
												</div>
											</div>

											
											</div>
											</div>
											<div class="col-lg-12 col-sm-12 col-xs-12">
												<div class="row row_padding form-horizontal">
													<div class="col-md-12 col-sm-12 col-xs-12">
														<div class="form-group col-md-8 col-sm-8 no-margin-right">
															<input type="text" class="form-control" id="key2"
																placeholder="姓名/电话/报名表编号/身份证号">
														</div>
														<div class="form-group col-lg-3 col-md-3 col-sm-3">
															<button type="button" onclick="initTable2()"
																class="btn btn-blue form-control search-btn">搜索</button>
														</div>
													</div>
												</div>
											</div>
										<div class="dataTables_wrapper1 form-inline no-footer">
											<div class="table-scrollable">
												<table
													class="table table-striped table-hover table-bordered dataTable no-footer"
													id="table2">
													<thead>
														<tr role="row">
															<th width="5%"><label> <input class="checkAll"
																	type="checkbox"> <span class="text"></span>
															</label></th>
															<th>报名日期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>分校 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>姓名 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>性别 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>身份证号码 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>籍贯 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>考期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>产品名称 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>应缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>实缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>资料是否齐全 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回原因 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>操作</th>
													</thead>

													<tbody>

													</tbody>
												</table>
											</div>
										</div>

									<div class="btn-box">
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">拨打电话</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送短信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送邮件</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">微信</button>
									</div>

								</div>

								<!--资料不全-->
								<div id="dataPartial" class="tab-pane clearfix">
									<div class="col-lg-12 col-sm-12 col-xs-12">
										<div class="row row_padding form-horizontal">
											<div class="col-md-5 col-sm-5 col-xs-12">
												<div class="form-group">
													<label class="control-label no-padding-right pull-left">日期</label>
													<div class="col-lg-11 col-md-11 col-sm-11">
														<div class="controls">
															<div class="input-group date">
																<input type="text" id="date3" class="form-control  reservation"
																	placeholder="请选择日期"> <span
																	class="input-group-addon"> <i
																	class="fa fa-calendar"></i>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="form-group col-md-4">
												<label class="col-md-4 control-label no-padding-right">产品模型</label>
												<div class="col-md-8 no-padding-right">
													<select id="productModel3" class="form-control chosen-select">
														
													</select>
												</div>
											</div>
											
											<div class="form-group col-md-3">
												<label class="control-label no-padding-right pull-left">产品</label>
												<div class="col-md-10 no-padding-right">
													<select id="product3" class="form-control chosen-select">
													
													</select>
												</div>
											</div>

											</div>
											</div>
											<div class="col-lg-12 col-sm-12 col-xs-12" style="padding:10px">
												<div class="row row_padding form-horizontal">
	
													<div class="col-md-12 col-sm-12 col-xs-12">
														<div class="form-group col-md-8 col-sm-8 no-margin-right">
															<input type="text" class="form-control" id="key3"
																placeholder="姓名/电话/报名表编号/身份证号">
														</div>
														<div class="form-group col-lg-3 col-md-3 col-sm-3">
															<button type="button" onclick="initTable3()"
																class="btn btn-blue form-control search-btn">搜索</button>
														</div>
													</div>
												</div>
											</div>
										<div class="dataTables_wrapper1 form-inline no-footer">
											<div class="table-scrollable">
												<table
													class="table table-striped table-hover table-bordered dataTable no-footer"
													id="table3">
													<thead>
														<tr role="row">
															<th width="5%"><label> <input class="checkAll"
																	type="checkbox"> <span class="text"></span>
															</label></th>
															<th>报名日期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>分校 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>姓名 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>性别 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>身份证号码 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>籍贯 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>考期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>产品名称 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>应缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>实缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>学员确认状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>教务确认状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>资料是否齐全 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回次数 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>费用支付记录 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回原因 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>操作</th>
													</thead>

													<tbody>
														
													</tbody>
												</table>
											</div>
										</div>
									<div class="btn-box">
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">拨打电话</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送短信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送邮件</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">微信</button>
									</div>

								</div>

								<!--金额不全-->
								<div id="amountPartial" class="tab-pane clearfix">
									<div class="col-lg-12 col-sm-12 col-xs-12">
										<div class="row row_padding form-horizontal">
											<div class="col-md-5 col-sm-5 col-xs-12">
												<div class="form-group">
													<label class="control-label no-padding-right pull-left">日期</label>
													<div class="col-lg-11 col-md-11 col-sm-11">
														<div class="controls">
															<div class="input-group date">
																<input type="text" id="date4" class="form-control  reservation"
																	placeholder="请选择日期"> <span
																	class="input-group-addon"> <i
																	class="fa fa-calendar"></i>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="form-group col-md-4">
												<label class="col-md-4 control-label no-padding-right">产品模型</label>
												<div class="col-md-8 no-padding-right">
													<select id="productModel4" class="form-control chosen-select">
														
													</select>
												</div>
											</div>
											
											<div class="form-group col-md-3">
												<label class="control-label no-padding-right pull-left">产品</label>
												<div class="col-md-10 no-padding-right">
													<select id="product4" class="form-control chosen-select">
													
													</select>
												</div>
											</div>

											</div>
											</div>
											<div class="col-lg-12 col-sm-12 col-xs-12">
												<div class="row row_padding form-horizontal">
													<div class="col-md-12 col-sm-12 col-xs-12">
														<div class="form-group col-md-8 col-sm-8 no-margin-right">
															<input type="text" class="form-control" id="key4"
																placeholder="姓名/电话/报名表编号/身份证号">
														</div>
														<div class="form-group col-lg-3 col-md-3 col-sm-3">
															<button type="button" onclick="initTable4()"
																class="btn btn-blue form-control search-btn">搜索</button>
														</div>
													</div>
												</div>
											</div>
										<div class="dataTables_wrapper1 form-inline no-footer">
											<div class="table-scrollable">
												<table
													class="table table-striped table-hover table-bordered dataTable no-footer"
													id="table4">
													<thead>
														<tr role="row">
															<th width="5%"><label> <input class="checkAll"
																	type="checkbox"> <span class="text"></span>
															</label></th>
															<th>报名日期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>分校 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>姓名 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>性别 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>身份证号码 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>籍贯 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>考期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>产品名称 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>应缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>实缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>资料是否齐全 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回原因 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>操作</th>
														</tr>
													</thead>

													<tbody>
													</tbody>
												</table>
											</div>
										</div>

									<div class="btn-box">
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">拨打电话</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送短信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送邮件</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">微信</button>
									</div>

								</div>

								<!--资料金额齐全-->
								<div id="amountData" class="tab-pane clearfix">
									<div class="col-lg-12 col-sm-12 col-xs-12">
										<div class="row row_padding form-horizontal">
											<div class="col-md-5 col-sm-5 col-xs-12">
												<div class="form-group">
													<label class="control-label no-padding-right pull-left">日期</label>
													<div class="col-lg-11 col-md-11 col-sm-11">
														<div class="controls">
															<div class="input-group date">
																<input type="text" id="date5" class="form-control  reservation"
																	placeholder="请选择日期"> <span
																	class="input-group-addon"> <i
																	class="fa fa-calendar"></i>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div class="form-group col-md-4">
												<label class="col-md-4 control-label no-padding-right">产品模型</label>
												<div class="col-md-8 no-padding-right">
													<select id="productModel5" class="form-control chosen-select">
														
													</select>
												</div>
											</div>
											
											<div class="form-group col-md-3">
												<label class="control-label no-padding-right pull-left">产品</label>
												<div class="col-md-10 no-padding-right">
													<select id="product5" class="form-control chosen-select">
													
													</select>
												</div>
											</div>
											
											</div>
											</div>
											<div class="col-lg-12 col-sm-12 col-xs-12">
												<div class="row row_padding form-horizontal">
	
													<div class="col-md-12 col-sm-12 col-xs-12">
														<div class="form-group col-md-8 col-sm-8 no-margin-right">
															<input type="text" class="form-control" id="key5"
																placeholder="姓名/电话/报名表编号/身份证号">
														</div>
														<div class="form-group col-lg-3 col-md-3 col-sm-3">
															<button type="button" onclick="initTable5()"
																class="btn btn-blue form-control search-btn">搜索</button>
														</div>
													</div>
												</div>
											</div>
										<div class="dataTables_wrapper1 form-inline no-footer">
											<div class="table-scrollable">
												<table
													class="table table-striped table-hover table-bordered dataTable no-footer"
													id="table5">
													<thead>
														<tr role="row">
															<th width="5%"><label> <input class="checkAll"
																	type="checkbox"> <span class="text"></span>
															</label></th>
															<th>报名日期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>分校 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>姓名 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>性别 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>身份证号码 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>籍贯 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>考期 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>产品名称 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>应缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>实缴 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>学员确认状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>教务确认状态 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>资料是否齐全 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回次数 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>费用支付记录 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>退回原因 <span class="fa indicator fa-unsorted"></span>
															</th>
															<th>操作</th>
													</thead>

													<tbody>

													</tbody>
												</table>
											</div>
										</div>

									<div class="btn-box">
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">拨打电话</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送短信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">发送邮件</button>
										<button type="button" class="btn btn-primary btn-lg btn-block"
											data-toggle="modal" data-target="">微信</button>
										<button type="button" class="btn btn-primary btn-lg btn-block check2"
											data-toggle="modal" >教务确认</button>
										<button type="button" class="btn btn-primary btn-lg btn-block back2"
											data-toggle="modal" >退回</button>
										<button type="button" class="btn btn-primary btn-lg btn-block complate2"
											data-toggle="modal" >审核完成</button>
									</div>

								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--审核完成1-->
<div class="modal fade review-completed1 in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
    data-backdrop="static">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">审核完成</span>
            </div>
            <div class="modal-body clearfix">
                <div class="form-horizontal">
                    <h3 class="text-center">学员是否已审核完毕，进入下一个环节！！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                    	<input type="hidden" id="completed1">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" typee="1" onclick="subComplate1(this)" class="btn btn-primary form-control">确定
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button"  class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--审核完成2-->
<div class="modal fade review-completed2 in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
    data-backdrop="static">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">审核完成</span>
            </div>
            <div class="modal-body clearfix">
                <div class="form-horizontal">
                    <h3 class="text-center">学员是否已审核完毕，进入下一个环节！！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                    	<input type="hidden" id="completed2">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" typee="1" onclick="subComplate2(this)" class="btn btn-primary form-control">确定
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--教务确认-->
<div class="modal fade review-check in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
    data-backdrop="static">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">教务确认</span>
            </div>
            <div class="modal-body clearfix">
                <div class="form-horizontal">
                    <h3 class="text-center">是否教务确认！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                    	<input type="hidden" id="check">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" typee="1" onclick="check1(this)" class="btn btn-primary form-control">确定
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button"  class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!--退回-->
<div class="modal fade send-backs in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">退回</span>
            </div>
            <div class="modal-body" style="overflow:hidden">
                <form method="" id="backForm" class="form-horizontal" style="margin-left:-40px">
                	<input type="hidden" name="projectInfoManageIds">
                    <div class="form-group col-md-12 col-lg-12">
                        <label class="control-label col-md-2">退回状态</label>
                        <div class="col-md-10">
                            <select name="status" disabled="disabled" class="form-control">
                                <option value="">退回学员</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label col-md-2">退回原因</label>
                        <div class="col-md-10">
                            <select name="reason" class="form-control selectpicker" multiple>
                                
                            </select>                    
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                            <label class="control-label col-md-2">备注</label>
                            <div class="col-md-10">
                                <textarea class="form-control rebuildRemark content" rows="6" style="width:700px;height:340px">
                                
                                </textarea>
                            </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" typee="1" onclick="subBack(this)" class="btn btn-primary btn-lg form-control">确认</button>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--费用支付记录-->
<div class="modal fade payment-history in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">费用支付记录</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal clearfix">
                    <div class="form-group col-sm-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>报考日期</th>
                                    <th>财务编码</th>
                                    <th>支出费用</th>
                                    <th>支出明细</th>
                                    <th>收款人</th>
                                    <th>状态</th>
                                    <th>已退费用</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>-</td>
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
                </form>
            </div>
        </div>
    </div>
</div>
<!-- 退回原因 -->
<div class="modal fade back-reason in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">退回原因</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal clearfix">
                    <div class="form-group col-sm-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>退回日期</th>
                                    <th>退回人</th>
                                    <th>原因</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody id="backReason">
                                
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--查看-->
<div class="modal fade serviceView in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-bottom-2 bordered-blue">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				<!-- <form method="" class="form-horizontal" style="padding: 0 20px"> -->
					<div class="col-lg-12 col-sm-12 col-xs-12">
						<div class="row">
							<div class="widget-body clearfix">
								<div class="widget clearfix">
									<div class="clearfix" style="background:#fff">
										<div class="pull-left text-align-left head-portrait">
											<div class="pull-left  student-info">
												<p>
													学员姓名：<span id="tabStu"></span>
												</p>
												<p>
													当前状态：<span id="tabStatus"></span>
												</p>
												<input id="departmentId1" hidden />
											</div>
										</div>
										<div class="transaction pull-right roleShow">
											<a href="#" class="btn btn-lightBlue btn-lg a1 zhuanban">转班</a>
											<a href="#" class="btn btn-lightBlue btn-lg a5 add_jiaofei">补费</a>
											<a href="#" class="btn btn-lightBlue btn-lg a2 xiuxue">休学</a> 
											<a href="#" class="btn btn-lightBlue btn-lg a3 tuifei"> 退费</a>
											<a href="#" class="btn btn-lightBlue btn-lg a4 bukao">补考重修</a>
										</div>
									</div>
								</div>
								<div class="tabbable">
									<ul class="nav nav-tabs tabs-flat" id="myTab11">
										<li class="active"><a data-toggle="tab" href="#scdata">资料
										</a></li>
										<li><a id="dtjl" data-toggle="tab" href="#Dynamicrecord">
												动态记录</a></li>
									</ul>
									<div class="tab-content tabs-flat" style="width:100%">
										<div id="Dynamicrecord" class="tab-pane">
											<input id="infoManageId" name="infoManageId" value=""
												type="hidden">
											<div class="row row_padding form-horizontal"
												style="height: 100px;">
												<textarea class="form-control" rows="5" name="content"
													id="contextAdd" style="resize: none;"></textarea>
												<div class="btn btn-info pull-right Confirmtoadd">确认添加</div>
											</div>
											<div class="row form-horizontal">
												<ul id="myTab" class="nav">
													<li class="active"><a href="#Allofthedynamic"
														data-toggle="tab"> 全部动态 </a></li>
													<!--  <li>
                                                            <select name="" id="" class="center-sel">
                                                                   <option value="0">跟进记录</option>
                                                                   <option value="1">电话</option>
                                                                   <option value="2">QQ电话</option>
                                                                   <option value="3">EC会话</option>
                                                                   <option value="4">网站客服会话</option>
                                                                   <option value="5">上门拜访</option>
                                                                   <option value="6">邮件</option>
                                                                   <option value="7">发送短信</option>
                                                            </select>
                                                    </li> -->
												</ul>
												<div id="myTabContent" class="tab-content">
													<div class="tab-pane fade in active" id="Allofthedynamic">
													</div>
												</div>
											</div>
										</div>
										<div id="scdata" class="tab-pane in active">
											<div class="form-horizontal">
												<form method="" class="form-horizontal clearfix" id="studentForm"
													>
													<input type="hidden" name="studentInfoManageId"
														id="studentInfoManageId">
													<div class="col-lg-12 col-sm-12 col-xs-12">
														<div class="well with-header clearfix">
															<div class="header bordered-blue">
																<div class="pull-left">
																	<b>学员-个人信息</b>
																</div>
																<input
																	style='opacity: 0.0; cursor: default; width: 10px; height: 10px;'
																	id="studentPhone2" type="text">
																<div class="pull-right">
																	<span class="collapse-btn"><i
																		class="fa fa-angle-down"></i></span>
																</div>
															</div>
															<div class="row form-group-margin gt_content">
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label
																		class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
																	<div class="col-sm-9 col-lg-9">
																		<input id="studentName" type="text"
																			class="form-control comment_disabled" value=""
																			name="studentName">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">性别</label>
																	<div class="col-sm-9">
																		<select class="form-control comment_disabled"
																			name="studentSex">
																			<option value="0">男</option>
																			<option value="1">女</option>
																		</select>
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">年龄</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled" value=""
																			name="age">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">手机</label>
																	<div class="col-sm-9">
																		<input type="text" 
																			class="form-control comment_disabled" value=""
																			name="studentPhone" id="studentPhone">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">邮箱</label>
																	<div class="col-sm-9">
																		<input type="email"
																			class="form-control comment_disabled" value=""
																			name="email">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label
																		class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
																	<div class="col-sm-9">
																		<input
																			class="form-control comment_disabled" value=""
																			name="phoneBelong">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">微信</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled" value=""
																			name="weChat">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">QQ</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled" value=""
																			name="tengXun">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label
																		class="col-sm-5 control-label no-padding-right no-padding-left"
																		style="margin-left: -40px">其他联系方式</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled"
																			name="ortherPhone">
																	</div>
																</div>
																<div class="form-group col-lg-10 col-md-12 col-sm-12">
																	<label style="margin-left: -45px;"
																		class="col-sm-2 control-label no-padding-right">通讯地址</label>
																	<div class="col-sm-9">
																		<input name="phoneAddress"
																			class="form-control comment_disabled"
																			 type="text">
																	</div>
																</div>
																<div class="form-group col-lg-10 col-md-12 col-sm-12">
																	<label style="margin-left: -45px;"
																		class="col-sm-2 control-label no-padding-right">工作单位</label>
																	<div class="col-sm-9">
																		<input name="workSpace" type="text"
																			class="form-control comment_disabled" 
																			>
																	</div>
																</div>
																<a href="#"
																	class="btn btn-lightBlue btn-lg a1 updateStu">确认修改学员信息</a>
															</div>
														</div>
												</form>

												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div class="pull-left">
															<b>课程信息</b>
														</div>
														<div class='pull-right'>
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i> </span>
														</div>
													</div>
													<div class="row form-group-margin" id="clone1">
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">产品模型</label>
															<div class="col-sm-8">
																<select class="form-control comment_disabled"
																	disabled="disabled" id="addProductModel2" name="productModalId">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">产品</label>
															<div class="col-sm-8">
																<select class="form-control comment_disabled"
																	disabled="disabled" id="addProductId2" name="productId">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">考期</label>
															<div class="col-sm-8">
																<select disabled="disabled"
																	class="form-control comment_disabled" id="kTime2" name="kTime">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">考试地区</label>
															<div class="col-sm-8">
																<select disabled="disabled"
																	class="form-control comment_disabled branchSchoolId" name="branchSchoolId">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">收款方</label>
															<div class="col-sm-8">
																<select id="classId2" disabled="disabled"
																	class="form-control comment_disabled"
																	disabled="disabled" name="shoukuanfang">
																</select>
															</div>
														</div>
													</div>
												</div>

												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>课程缴费信息</b> <a href="#"
																class="btn btn-lightBlue btn-lg a1 xiangqing">详情</a>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<table
														class="	table table-striped table-hover table-bordered dataTable no-footer"
														id="payMentTableInfo">
														<thead>
															<tr>
																<th style="text-align: center;">收费项目</th>
																<th style="text-align: center;">应缴</th>
																<th style="text-align: center;">实缴</th>
																<th style="text-align: center;">支付方式</th>
																<th style="text-align: center;">欠费</th>
															</tr>
														</thead>
														<tbody id="payMentTableInfoBody">
														</tbody>
													</table>
												</div>

												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>费用支出信息</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<table
														class="	table table-striped table-hover table-bordered dataTable no-footer"
														id="payMentTableInfo">
														<thead>
															<tr>
																<th style="text-align: center;">报考日期</th>
																<th style="text-align: center;">财务编号</th>
																<th style="text-align: center;">费用</th>
																<th style="text-align: center;">支出明细</th>
																<th style="text-align: center;">收款人</th>
																<th style="text-align: center;">状态</th>
																<th style="text-align: center;">已退合作费</th>
															</tr>
														</thead>
														<tbody id="zhichuTableInfoBody">
														</tbody>
													</table>
												</div>


												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>报考进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="flow"></div>
												</div>
												
												<div class="well with-header clearfix" id="quzhengdiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>取证进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="quzhengFlow"></div>
												</div>
												
												
												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>考试信息</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<table
														class="	table table-striped table-hover table-bordered dataTable no-footer"
														id="kaoshi">
														<thead>
															<tr>
																<th style="text-align: center;">考试日期</th>
																<th style="text-align: center;">考试科目</th>
																<th style="text-align: center;">考试成绩</th>
															</tr>
														</thead>
														<tbody id="kaoshiBody">
														</tbody>
													</table>
												</div>
												
												<div class="well with-header clearfix" id="tuifeidiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>退费进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="tuifeiFlow"></div>
												</div>
												
												<div class="well with-header clearfix" id="zhuanbandiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>转班进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="zhuanbanFlow">
														<span class="label label-primary plan-btn" style="background:gray" >
	                                                                                                                                                                   退回学员
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                    转班审核
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                     转班完成
	                                                    </span>
													</div>
												</div>
												
												<div class="well with-header clearfix" id="tuichajiadiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>退差价进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="tuichajiaFlow">
														<span class="label label-primary plan-btn" style="background:gray" >
	                                                                                                                                                                   申请
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                    费用申请中
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                     已支付
	                                                    </span>
													</div>
												</div>


												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>资料管理</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div id="applyDataDiv">
													</div>
													<!-- <div class="col-sm-4">
														<label class="col-sm-6 control-label no-padding-right"></label>
														<div class="col-sm-6">
															<a class="btn btn-blue all-dowload">全部下载</a>
														</div>
													</div> -->
												</div>
											</div>
											<!--   </form> -->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
			<!-- </form> -->
			<ul class="tab_content tab_net tab_content_11 right-toolbar">
				<li><a href="javascript:void(0);"> <img
						src="${ctx_static}/common/image/phone.png"><i></i>
						<div class="up">
							<p onclick="copyPhone('studentPhone2')">拨打电话</p>
						</div>
				</a></li>
				<li><a href="#" data-backdrop="static" data-toggle="modal"
					data-target=".information" data-record="" id="sendShortMsg"> <img
						src="${ctx_static}/common/image/note.png"><i></i>
						<div class="up">
							<p>发送短信</p>
						</div>
				</a></li>
				<li><a href="javascript:void(0);"> <img
						src="${ctx_static}/common/image/send-mail.png"><i></i>
						<div class="up">
							<p>发送邮件</p>
						</div>
				</a></li>
			</ul>
		</div>
	</div>
</div>
</div>

<!--转班-->
<div class="modal fade turnClass in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">转班</span>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" id="turnClass">
					<div id="material" class="tab-pane active">

						<div class="material-info">
							<h4 class="clearfix">
								<div class="trademark">
									<span>咨询分校：</span> <i></i>
								</div>
								<div class="trademark">
									<span>品牌：</span> <i></i>
								</div>
								<div class="trademark">
									<span>咨询者类型：</span> <i></i>
								</div>
								<div class="trademark">
									<span>媒体来源：</span> <i></i>
								</div>
								<div class="trademark">
									<span>客户成熟度：</span> <i></i>
								</div>
							</h4>
							<div id="scdata3">
							<div class="material-course clearfix">
								<div class="course-title">学员个人信息</div>
								<div class="course container-fluid  form-horizontal">
									<div class="row">
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
											<div class="col-sm-9 col-lg-9">
												<input type="text" class="form-control comment_disabled"
													name="studentName" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">性别</label>
											<div class="col-sm-9">
												<select class="form-control comment_disabled"
													disabled="disabled" name="studentSex">
													<option value="0">男</option>
													<option value="1">女</option>
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">年龄</label>
											<div class="col-sm-9">
												<input type="text" class="form-control comment_disabled"
													name="age" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">手机</label>
											<div class="col-sm-9">
												<input type="text" class="form-control comment_disabled"
													name="studentPhone" id="studentPhone2" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">邮箱</label>
											<div class="col-sm-9">
												<input  class="form-control comment_disabled"
													name="email" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
											<div class="col-sm-9">
												<input class="form-control comment_disabled"
													disabled="disabled" name="phoneBelong"/>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">微信</label>
											<div class="col-sm-9">
												<input type="text" class="form-control comment_disabled"
													name="weChat" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">QQ</label>
											<div class="col-sm-9">
												<input type="text" class="form-control comment_disabled"
													name="tengXun" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-sm-5 control-label no-padding-right no-padding-left"
												style="margin-left: -44px">其他联系方式</label>
											<div class="col-sm-9">
												<input type="text" class="form-control comment_disabled"
													disabled="disabled" name="ortherPhone">
											</div>
										</div>
										<div class="form-group col-lg-6 col-md-6 col-sm-12">
											<label class="col-sm-3 control-label no-padding-right">通讯地址</label>
											<div class="col-sm-8">
												<input class="form-control comment_disabled" name="stuPhoneAddress"
													type="text" disabled="disabled">
											</div>
										</div>
										<div class="form-group col-lg-6 col-md-6 col-sm-12">
											<label class="col-sm-3 control-label no-padding-right">工作单位</label>
											<div class="col-sm-8">
												<input type="text" class="form-control comment_disabled"
													name="stuWorkSpace" disabled="disabled">
											</div>
										</div>
									</div>

								</div>
							</div>

							<div class="material-course clearfix">
								<div class="course-title">旧课程信息</div>
								<div class="course container-fluid  form-horizontal">
									<div class="row" id="clone2">
										

									</div>
								</div>
							</div>
						</div>
						</div>

						<div class="material-course clearfix">
							<div class="course-title">费用信息</div>
							<div class="table-responsive">
								<table class="table table-bordered">
									<thead>
										<tr>
											<th style="width: 10%">费用项目</th>
											<th style="width: 15%">应缴</th>
											<th style="width: 15%">实缴</th>
											<th style="width: 15%">支出</th>
											<th style="width: 30%">扣费</th>
											<th style="width: 15%">结余</th>
										</tr>
									</thead>
									<tbody id="zhuanbanOldPay">
									</tbody>
								</table>
							</div>
						</div>

						<div class="material-course clearfix">
							<div class="course-title">新课程信息</div>
							<div class="course container-fluid  form-horizontal">
								<div class="row">
									<div class="counselCurriculum">
					               		<div class="form-group col-md-4 col-sm-6">
					                        <label class="control-label col-sm-5 no-padding-right">产品模型<span class="control-label mandatory">*</span></label>
					                        <div class="col-sm-7  no-padding-right">
					                            <select name="productModelId" id="addProductModel" data-value="product_model" class="form-control addProductModel chosen-select">
					                            </select>
					                        </div>
					                    </div>
					                 </div>
					                 <div class="form-group col-sm-4 col-sm-6">
					                        <label class="control-label col-sm-5 no-padding-right">产品：</label>
					                        <div class="col-sm-7  no-padding-right">
												 <select name="productId" id="addProductId" class="form-control addProductId">
												 </select>
					                        </div>
					                 </div>
					                 <div class="form-group col-lg-4 col-md-4 col-sm-6">
	                                    <label class="control-label col-sm-5 no-padding-right">收款方</label>
	                                    <div class="col-sm-7  no-padding-right">
	                                        <select id="payee" name="payee" class="form-control chosen-select">
	                                        </select>
	                                    </div>
	                                </div>
					                 <div class="form-group col-sm-4 col-sm-6">
                                     	<label class="control-label col-sm-5 no-padding-right">考期</label>
	                                    <div class="col-sm-7 no-padding-right">
	                                        <select id="kTime" name="kTime" class="form-control chosen-select">
	                                        </select>
	                                    </div>
                               		 </div>
	                                 <div class="form-group col-sm-4 col-sm-6">
	                                    <label class="control-label col-sm-5 no-padding-right">考试地区</label>
	                                    <div class="col-sm-7 no-padding-right">
	                                        <select id="branchSchoolId" name="branchSchoolId" class="form-control chosen-select" >
	                                        </select>
	                                    </div>
	                                 </div>
					                 <div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-sm-1 control-label no-padding-right">优惠类型</label>
										<div class="col-sm-11">
											<div class="checkbox" id="bizActive">
												<label > 
													<span class="text">无</span>
												</label>
											</div>
										</div>
									</div>
					                 <div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-sm-1 control-label no-padding-right">包含服务</label>
										<div class="col-sm-11">
											<div class="checkbox"  id="service">
												<label> 
													<span class="text">无</span>
												</label>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>

						<div class="material-course clearfix">
							<div class="course-title">课程缴费信息</div>
							<div class="table-responsive">
								<table class="table table-bordered">
									<thead>
										<tr>
											<th>费用项目</th>
											<th>产品应缴</th>
											<th>实际实缴</th>
											<th>实缴</th>
											<th>支付方式</th>
											<th>欠费</th>
										</tr>
									</thead>
									<tbody class="creatTr" id="appendPayBody">
										
									</tbody>
								</table>
							</div>
						</div>

					</div>

					<div class="clearfix form-group"  style="margin: 40px 0px;">
						<div class="col-sm-3 col-xs-3 col-sm-offset-4  col-xs-offset-3">
							<a>
								<button type="button"  class="btn btn-primary btn-lg col-sm-6 zhuanbanNext">下一步
								</button>
							</a>
						</div>
						<div class="col-sm-3  col-xs-3">
							<button type="button" class="btn btn-danger btn-lg col-sm-6"
								data-dismiss="modal">取消</button>
						</div>
					</div>
			</div>
			</form>
		</div>
	</div>
</div>

<!-- 缴费详情 -->
<div class="modal fade module-xiangqing" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<span class="widget-caption">详情</span>
			</div>
			<div class="modal-body clearfix">
				<div class="dataTables_wrapper form-inline no-footer">
					<table
						class="table table-striped table-hover table-bordered dataTable no-footer"
						id="detail">
						<thead>
							<tr>
								<th>缴费日期</th>
								<th>费用类别</th>
								<th>缴费方式</th>
								<th>缴费金额</th>
							</tr>
						</thead>

						<tbody id="xiangqingTbody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>


<!--缴费信息-报名补费-->
<input type="hidden" id="sumPrice2">
<input type="hidden" id="sPrice">
<input type="hidden" id="nextPayNum2">
<div class="modal fade bs-example-modal-lg4 in jiaofeil" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close close_jf" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">添加缴费</span>
			</div>
			<div class="modal-body  clearfix  form-horizontal modal_padding">
				<form id="payInfo" method="" class="form-horizontal"
					style="padding: 0 20px">
					<!--该处动态生成缴费内容  -->
					<div class="rom">
						<div class="form-group col-lg-8 col-md-8 col-sm-8">
							<label class="col-sm-4  no-padding-left control-label payment-text">下次缴费时间</label>
							<div class="input-group col-sm-8 payment-time">
								<input value="" id="appendNextPayTime"
									class="form-control paymentTime comment_disabled" type="text">
								<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
							</div>
						</div>
					</div>
					<div id="payForDiv">
						<div class="clearfix form-group" style="margin: 40px 0px;">
							<div class="col-sm-4  col-xs-4  col-sm-offset-3  col-xs-offset-2">
								<button id="jiaofeitrue" onclick="addjiaofei(this)"
									type="button" class="btn btn-primary btn-lg col-sm-6">确认</button>
							</div>
							<div class="col-sm-4 col-xs-4">
								<button type="button"
									class="btn btn-danger btn-lg col-sm-6 cancel"
									data-dismiss="modal">取消</button>
							</div>

						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
</div>


<!--预览图片-->
<div class="modal fade lookImg in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">预览图片</span>
			</div>
			<div class="modal-body clearfix">
				<img id="imgLook" src=" " > 
			</div>
		</div>
	</div>
</div>


<!--休学-->
<div class="modal fade quitSchool in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">休学</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal">
					<h3 class="text-center">是否转为休学状态</h3>
					<div class="col-sm-12 modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button type="button" class="btn btn-primary form-control"
								onclick="xiuxue()">是</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">否</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!--转班——退费空支出申请-->
<div class="modal fade sss in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">退费空支出申请</span>
			</div>
			<div class="modal-body clearfix">
				<div class="modal-body">
					<div class="material-course clearfix" id="kongzhichu">
						<div class="course-title">退费空支出申请</div>
						<div class="course container-fluid  form-horizontal">
							<div class="row">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right ">申请人</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											readonly name="peploName" value="">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right ">申请时间</label>
									<div class="col-sm-8">
										<div class="input-group">
											<input class="form-control date-picker form_datetime"
												type="text" name="nowTime" value="" readonly> <span
												class="input-group-addon"> <i class="fa fa-calendar"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">退费金额</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											name="kongzhichuMoney" value="">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">类型</label>
									<div class="col-md-11">
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId1">

											</select>
										</div>
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId2">

											</select>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-left: 0px">
									<label class="col-md-1 control-label no-padding-right">支出明细</label>
									<div class="col-md-11">
										<textarea class="form-control" rows="1" name="feeDetail"></textarea>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">收款人</label>
									<div class="col-md-11">
										<div class="col-md-3">
											<select class="form-control comment_disabled"
												name="financePayeeId">

											</select>
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												value="" placeholder="开户行" name="bankName">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												value="" placeholder="开卡所在省" name="province">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												value="" placeholder="开卡所在市" name="city">
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">账号</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											 name="accountNum">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">户名</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="accountName">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">电话</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="phone">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-top: 15px; margin-left: 0px">
									<label class="col-sm-1 control-label no-padding-right">备注</label>
									<div class="col-sm-11">
										<textarea class="form-control rebuildRemark content" rows="3"
											id="rebuildRemark" name="rebuildRemark"
											style="width: 668px; height: 240px;"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="material-course clearfix" id="tuichajia">
						<div class="course-title">退差价申请</div>
						<input type="hidden" id="tuichajiaType">
						<div class="course container-fluid  form-horizontal">
							<div class="row">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">申请人</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											name="peploName" readonly value="">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">申请时间</label>
									<div class="col-sm-8">
										<div class="input-group">
											<input class="form-control date-picker form_datetime"
												type="text" name="nowTime" value="" readonly> <span
												class="input-group-addon"> <i class="fa fa-calendar"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">退费金额</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											name="tuichajiaMoney" value="">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">类型</label>
									<div class="col-md-11">
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId1">

											</select>
										</div>
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId2">

											</select>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-left: 0px">
									<label class="col-md-1 control-label no-padding-right">支出明细</label>
									<div class="col-md-11">
										<textarea class="form-control" rows="1" name="feeDetail"></textarea>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">收款人</label>
									<div class="col-md-11">
										<div class="col-md-3">
											<select class="form-control comment_disabled"
												name="financePayeeId">

											</select>
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="bankName" placeholder="开户行">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="province" placeholder="开卡所在省">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="city" placeholder="开卡所在市">
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">账号</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="accountNum">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">户名</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="accountName">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">电话</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="phone">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-top: 15px; margin-left: 0px">
									<label class="col-sm-1 control-label no-padding-right">备注</label>
									<div class="col-sm-11">
										<textarea class="form-control rebuildRemark content" rows="3"
											id="rebuildRemark" name="rebuildRemark"
											style="width: 668px; height: 240px;"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="clearfix form-group" style="margin: 40px 0px;">
						<div class="col-sm-3 col-xs-3 col-sm-offset-4  col-xs-offset-3">
							<button type="button" onclick="tuichajia()"
								class="btn btn-primary btn-lg col-sm-6">确定</button>
						</div>

						<div class="col-sm-3  col-xs-3">
							<button type="button" class="btn btn-danger btn-lg col-sm-6"
								data-dismiss="modal">取消</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>


<!-- 补考重修 -->
<div class="modal fade rebuild in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">补考重修</span>
			</div>
			<div class="modal-body clearfix">
				<form id="bukaoForm" method="" class="form-horizontal"
					style="padding: 0 20px">
					<div class="form-group col-md-6">
						<label class="col-sm-2 control-label no-padding-right">类型</label>
						<div class="col-md-9 no-padding-right">
							<select id="examAgainType" name="examAgainType"
								class="form-control">
								<option value="4">补考</option>
								<option value="5">重修</option>
							</select>
						</div>
					</div>
					<div class="form-group col-md-6">
						<label class="col-sm-3 control-label no-padding-right">补考重修日期</label>
						<div class="col-md-9">
							<div class="input-group">
								<input class="form-control date-picker paymentTime" type="text"
									name="examAgainDate" id="examAgainDate"> <span
									class="input-group-addon"> <i class="fa fa-calendar"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group col-md-6" hidden id="kaoqiDiv">
						<label class="col-sm-2 control-label no-padding-right">考期</label>
						<div class="col-md-9 no-padding-right">
							<select id="kaoqi" name="kaoqi" class="form-control">
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12 col-md-12">
						<div class="form-group col-sm-12">
							<label
								class="control-label col-md-1 col-sm-3 no-padding-right margin-left">备注</label>
							<div class="col-md-11 col-sm-11">
								<textarea class="form-control rebuildRemark" rows="8"
									id="examAgain" name="rebuildRemark"
									style="width: 668px; height: 340px;"></textarea>
							</div>
						</div>
					</div>
					<div id="feiyongType"></div>

					<div class="form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button onclick="addbk()" type="button"
								class="btn btn-primary btn-lg form-control">确认</button>
						</div>
						<div class="col-sm-2 ">
							<button type="button" class="btn btn-danger btn-lg form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>



<!--退费申请-->
<div class="modal fade refund-apply in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<a href="#" class="fa fa-mail-reply pull-right back-btn" title="返回"></a>
				<span class="widget-caption">退费申请</span>
			</div>
			<div class="modal-body clearfix">
				
				<div id="scdata2" class="tab-pane in active">
					<div class="form-horizontal">
						<form method="" class="form-horizontal" id="studentForm"
							style="padding: 0 20px">
							<input type="hidden" name="studentInfoManageId"
								id="studentInfoManageId2">
							<div class="col-lg-12 col-sm-12 col-xs-12">
								<div class="well with-header clearfix">
									<div class="header bordered-blue">
										<div class="pull-left">
											<b>学员-个人信息</b>
										</div>
										<input
											style='opacity: 0.0; cursor: default; width: 10px; height: 10px;'
											id="studentPhone2" type="text">
										<div class="pull-right">
											<span class="collapse-btn"><i
												class="fa fa-angle-down"></i></span>
										</div>
									</div>
									<div class="row form-group-margin gt_content">
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
											<div class="col-sm-9 col-lg-9">
												<input id="studentName" type="text"
													class="form-control comment_disabled" value=""
													name="studentName">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">性别</label>
											<div class="col-sm-9">
												<select class="form-control comment_disabled"
													name="studentSex">
													<option value="0">男</option>
													<option value="1">女</option>
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">年龄</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled" value=""
													name="age">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">手机</label>
											<div class="col-sm-9">
												<input type="text" 
													class="form-control comment_disabled" value=""
													name="studentPhone" id='studentPhone3'>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">邮箱</label>
											<div class="col-sm-9">
												<input 
													class="form-control comment_disabled" value=""
													name="email">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
											<div class="col-sm-9">
												<input 
													class="form-control comment_disabled" value=""
													name="phoneBelong">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">微信</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled" value=""
													name="weChat">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">QQ</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled" value=""
													name="tengXun">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right no-padding-left">联系方式</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled"
													name="ortherPhone">
											</div>
										</div>
										<div class="form-group col-lg-10 col-md-12 col-sm-12">
											<label style="margin-left: -45px;"
												class="col-sm-2 control-label no-padding-right">通讯地址</label>
											<div class="col-sm-9">
												<input name="stuPhoneAddress"
													class="form-control comment_disabled"
													value="北京市朝阳区富华弘燕大厦" type="text" id="stuPhoneAddress">
											</div>
										</div>
										<div class="form-group col-lg-10 col-md-12 col-sm-12">
											<label style="margin-left: -45px;"
												class="col-sm-2 control-label no-padding-right">工作单位</label>
											<div class="col-sm-9">
												<input name="stuWorkSpace" type="text"
													class="form-control comment_disabled" value="中和教育"
													id="stuWorkSpace">
											</div>
										</div>
									</div>
								</div>
						</form>

						<div class="well with-header clearfix">
							<div class="header bordered-blue">
								<div class="pull-left">
									<b>课程信息</b>
								</div>
								<div class='pull-right'>
									<span class="collapse-btn"><i
										class="fa fa-angle-down"></i> </span>
								</div>
							</div>
							<div class="row form-group-margin" id="clone3">
								
							</div>
						</div>

						<div class="well with-header clearfix">
							<div class="header bordered-blue">
								<div style="float: left">
									<b>课程缴费信息</b> <a href="#"
										class="btn btn-lightBlue btn-lg a1 xiangqing">详情</a>
								</div>
								<div style="float: right">
									<span class="collapse-btn"><i
										class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<table
								class="	table table-striped table-hover table-bordered dataTable no-footer"
								>
								<thead>
									<tr>
										<th style="text-align: center;">收费项目</th>
										<th style="text-align: center;">应缴</th>
										<th style="text-align: center;">实缴</th>
										<th style="text-align: center;">支付方式</th>
										<th style="text-align: center;">欠费</th>
									</tr>
								</thead>
								<tbody id="payMentTableInfoBody2">
								</tbody>
							</table>
						</div>

						<div class="well with-header clearfix">
							<div class="header bordered-blue">
								<div class="pull-left">
									<b>退费情况汇总</b>
								</div>
								<div class='pull-right'>
									<span class="collapse-btn"><i
										class="fa fa-angle-down"></i> </span>
								</div>
							</div>
							<div class="row">
							<form id="returnForm">
	                             <div class="form-group col-lg-12 col-md-12 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">退费原因</label>
	                                 <div class="col-sm-10">
	                                 	<select class="form-control comment_disabled" id="returnPayReason" name="returnPayfeesReasonId">
	                                 	</select>
	                                 </div>
	                             </div>
	                             <div class="form-group col-lg-12 col-md-12 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">合作方名称</label>
	                                 <div class="col-sm-10">
	                                     <input class="form-control comment_disabled" name="partner" type="text">
	                                 </div>
	                             </div>
	                             <div class="form-group col-lg-6 col-md-6 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">已支出合作费</label>
	                                 <div class="col-sm-8">
	                                     <input class="form-control comment_disabled" name="partnerPayEd" type="text">
	                                 </div>
	                             </div>
	                             <div class="form-group col-lg-6 col-md-6 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">合作费是否已退</label>
	                                 <div class="col-sm-8">
	                                     <select class="form-control comment_disabled" name="partnerPayReturn">
	                                     	<option value="1">是</option>
	                                     	<option value="2">否</option>
	                                     </select>
	                                 </div>
	                             </div>
	                             <div class="form-group col-lg-12 col-md-12 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">分校退费建议</label>
	                                 <div class="col-sm-10">
	                                 	 <textarea class="form-control rebuildRemark content" name="schoolReturnAnswer" rows="5" ></textarea>
	                                 </div>
	                             </div>
	                             <div class="form-group col-lg-12 col-md-12 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">退费资料上传</label>
	                                 <div class="col-sm-10">
	                                     <textarea class="form-control description" rows="8" name="returnFile" style="width:600px;height:300px;"></textarea>
				                        	<script>
												$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
													KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
													k2 = KindEditor.create('.refund-apply [name="returnFile"]',{
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
	                                 <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">退费资料快递单号</label>
	                                 <div class="col-sm-10">
	                                     <input class="form-control comment_disabled" name="courierNumber" type="text">
	                                 </div>
	                             </div>
	                             <div class="form-group col-lg-12 col-md-12 col-sm-12">
	                                 <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">备注</label>
	                                 <div class="col-sm-10">
	                                     <textarea class="form-control rebuildRemark content" rows="3"  name="returnContent" style="width:height:340px;"></textarea>
	                                 </div>
	                             </div>
	                             <div class="form-group col-sm-12 modal-footer">
			                        <div class="col-sm-2 col-sm-offset-4">
			                            <button type="button" onclick="addReturn()" class="btn btn-primary form-control add-button">确定</button>
			                        </div>
			                        <div class="col-sm-2">
			                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
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
</div>




<!--预览图片 废弃-->
<div class="modal fade mask in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">查看大图</span>
			</div>
			<div class="modal-body mask-parent clearfix">
				<p class="mask-content" style="display: block"></p>
			</div>
		</div>
	</div>
</div>


<!--日期插件-->
<script
	src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/jquery-form.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>
<!--省市联动-->
<script src="${ctx_static }/dep/distpicker/distpicker.data.js"></script>
<script src="${ctx_static }/dep/distpicker/distpicker.js"></script>
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/informationVerify.js?v=<%=Math.random() %>"></script>
<script src="${ctx_static }/home/serviceCenter/js/informationVerifyService.js?v=<%=Math.random() %>"></script>

</body>
</html>