<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/configuration/css/activityManager.css">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			 <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">活动管理</span>
            </div>
			<div class="widget-body">
				<div class="widget-main ">
					<div class="tabbable">
						<ul class="nav nav-tabs tabs-flat" id="myTab">
							<li class="active"><a data-toggle="tab" href="#deptCode">优惠额度</a></li>
							<li ><a data-toggle="tab" href="#promoCode">优惠码</a></li>
							<li><a data-toggle="tab" href="#salesPromotion">促销活动</a></li>
						</ul>
						<div class="tab-content tabs-flat bordered-blue">
							<div id="promoCode" class="tab-pane in ">
								<div class="row row_padding form-horizontal">
									<div class="col-md-8 col-sm-8 col-xs-12">
										<div
											class="form-group col-lg-5 col-md-5 col-sm-5 no-margin-right">
											<select id="status" name="status" class="form-control">
												<option value="">状态</option>
												<option value="0">未使用</option>
												<option value="1">已使用</option>
											</select>
										</div>
										<div
											class="form-group col-lg-5 col-md-5 col-sm-5 no-margin-right">
											<input type="text" class="form-control"
												placeholder="使用人/优惠码/分校" id="searchValCode" name="searchValCode" onkeydown="search();">
										</div>
										<div class="form-group col-lg-2 col-md-2 col-sm-2">
											<a type="button" class="btn increase form-control search-btn" href="javascript:yhmDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>
									<div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
										
									</div>
								</div>
								<table id="youHuiCode" class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th>分校
											</th>
											<th>优惠码
											</th>
											<th>创建时间 
											</th>
											<th>使用起止日期</th>
											<th>状态
											</th>
											<th>金额 
											</th>
											<th>使用时间 
											</th>
											<th>使用人
											</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
							
							<div id="deptCode" class="tab-pane in active">
								<div class="row row_padding form-horizontal">
									<div class="col-md-6 col-sm-6 col-xs-12">
										<div
											class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
											<input type="text" class="form-control"
												placeholder="部门/额度" id="searchValDept" name="searchValDept" onkeydown="search();">
										</div>
										<div class="form-group col-lg-2 col-md-4 col-sm-4">
											<a type="button" class="btn increase form-control search-btn" href="javascript:deptDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>


									<div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
										<button class="btn increase pull-right col-sm-4 deptCodeAdd"
										data-toggle="modal" data-target=".deptCode-add" data-backdrop="static">
											<i class="fa fa-plus"></i> 新增 
										</button>
									</div>
								</div>
								<table id="deptTabCode" class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th>分校
											</th>
											<th>额度
											</th>
											<th>已用额度
											</th>
											<th>使用起止日期</th>
											<th>操作
											</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
							
							<div id="salesPromotion" class="tab-pane">
								<div class="row row_padding form-horizontal">
									<div class="col-md-4 col-sm-4">
										<div class="form-group">
											<label
												class="pull-left control-label margin-left-15">日期</label>
											<div class="col-lg-10 col-md-10 col-sm-10">
												<div class="controls">
													<div class="input-group date">
														<input type="text" class="form-control"
															id="duration1"> <span
															class="input-group-addon"><i
															class="fa fa-calendar"></i></span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="col-md-7 col-sm-7">
										<div class="form-group col-md-4 col-sm-4 no-margin-right">
											<input type="text" class="form-control"
												placeholder="标题" id="searchVal" name="searchVal" onkeydown="search();">
										</div>
										<div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
											<select class="form-control" name="enable" id="enable">
												<option value="">状态</option>
												<option value="1">启用</option>
				                                <option value="0">禁用</option>
											</select>
										</div>
										<div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
											<select class="form-control" name="status" id="isMulti">
												<option value="">类型</option>
												<option value="1">优惠码</option>
				                                <option value="2">报名折扣</option>
				                                <option value="4">积分活动</option>
											</select>
										</div>
										<div class="form-group col-lg-2 col-md-2 col-sm-2">
											<a type="button" class="btn increase form-control search-btn" href="javascript:cxDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>


									<div class="col-md-1 col-sm-1 btn-group">
										<button class="btn increase pull-right col-sm-4 sales-add"
											data-toggle="modal" data-target=".salesPromotionAdd"
											data-backdrop="static">
											 <i class="fa fa-plus"></i> 新增
										</button>
									</div>
								</div>

								<table id="cuXiao" class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th>标题 
											</th>
											<th>开始日期 
											</th>
											<th>结束日期 
											</th>
											<th>折扣 
											</th>
											<th>类型 
											</th>
											<th>状态 
											</th>
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
			<!--Widget-->
		</div>
	</div>
</div>

<%@ include file="../common/public_footer.jsp"%>

<!--新增优惠码-->
<div class="modal fade promoCodeAdd" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content youhuima">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="promoCodeAdd" method="post">
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">总额度</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input id="dept" type="hidden">
								<input id="activityInitId" type="hidden">
								<input type="text" class="form-control mainAmount" readonly="readonly"> <span
									class="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">余额</label>
						<div class="col-sm-8">
							<input type="text" class="form-control useAmount" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">开始时间</label>
						<div class="col-sm-8">
							<div class="input-group date">
								<input type="text" class="form-control bgTime form_datetime"  readonly="readonly">
								<span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">结束时间</label>
						<div class="col-sm-8">
							<div class="input-group date">
								<input type="text" class="form-control edTime form_datetime" readonly="readonly">
								<span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">金额</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input type="text" class="form-control amount" id="amount" name="amount"> <span
									class="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">数量</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input type="text" class="form-control num" id="num" name="num">
							</div>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button type="submit" class="btn btn-primary form-control">生成优惠码</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- 添加优惠额度 -->
<div class="modal fade  deptCode-add" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content youhuima">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="deptCodeAdd" method="post">
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">金额</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input type="text" class="form-control amount" id="amount" name="amount"> <span
									class="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">部门</label>
						<div class="col-sm-8">
							<select id="departmentId1" name="dept" class="form-control departmentId1 chosen-select" data-placeholder="--请选择--" tabindex="1">
	                            </select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">起止日期</label>
						<div class="col-sm-8">
							<div class="input-group date">
								<input type="text" class="form-control duration" id="duration22" name="duration">
								<span class="input-group-addon"><i
									class="fa fa-calendar"></i></span>
							</div>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button type="submit" class="btn btn-primary form-control">确定</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 编辑优惠额度 -->
<div class="modal fade deptCodeUpdate" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content youhuima">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="deptCodeUpdate" method="post">
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">部门</label>
						<input id="activityInitId" type="hidden" />
						<div class="col-sm-8">
							<input type="text" class="form-control amount" id="updateDept" readonly="readonly"> 
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">起止日期</label>
						<div class="col-sm-8">
							<div class="input-group date">
								<input type="text" class="form-control duration" id="updateDuration" name="duration">
								<span class="input-group-addon"><i
									class="fa fa-calendar"></i></span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">金额</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input type="text" class="form-control amount" id="updateAmount" name="updateAmount" readonly="readonly"> <span
									class="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button type="submit" class="btn btn-primary form-control">确定</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--新增促销活动-->
<div class="modal fade salesPromotionAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content cuXiao">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption" id="myModalLabel">新增</h4>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal salesPromotionAdd1" id="salesPromotionAdd" >
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">标题</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="title" id="title">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 activityType">
                        <label class="control-label col-sm-2 no-padding-right">活动类型</label>
                        <div class="col-sm-8">
                            <select name="type" class="form-control type" id="activityAdd">
                                <option value="">--请选择--</option>
                                <option value="1">优惠码</option>
                                <option value="2">报名折扣</option>
                                <option value="4">积分活动</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">产品模型</label>
                        <div class="col-sm-8">
                             <select name="productModelId" id="productModel" class="form-control productModelId chosen-select">
			                 </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">产品</label>
                        <div class="col-sm-8">
						   <select id="projectSelect"  name="projectSelect"  class="form-control show-tick selectpicker" multiple title="产品" data-live-search="true">
                            </select>
                            <input type="hidden" name="project" />
                        </div>
                    </div>
                    
                     <div class="form-group col-sm-12 discount">
                        <label class="control-label col-sm-2 no-padding-right">折扣</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control discountAdd" name="discount">
                        </div>
                    </div>
                    
                    <div class="form-group limit1 col-sm-12 lowerLimit1">
                        <label class="control-label col-sm-2 no-padding-right">下限</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control limit1" name="limit1">
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 lowerLimit2">
                        <label class="control-label col-sm-2 no-padding-right">兑换比例</label>
                        <div class="col-sm-8">
                            <div class="col-sm-5">
                                <div class="controls">
                                    <div class="input-group date">
                                        <input type="text" class="form-control scale1" name="scale1">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <label class="control-label col-sm-1 no-padding-right">=</label>
                            <div class="col-sm-5">
                                <div class="controls">
                                    <div class="input-group date">
                                        <input type="text" class="form-control scale2" name="scale2">
                                        <span class="input-group-addon">积分</span>
                                    </div>
                                </div>
                            </div>
                        </div>                 
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">起止日期</label>
                        <div class="col-sm-8">
                            <div class="input-group date">
                                <input type="text" class="form-control duration3" id="duration3" name="duration3">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">状态</label>
                        <div class="col-sm-8">
                            <select name="enable" class="form-control enable">
                                <option value="">--请选择--</option>
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">可叠加优惠</label>
                        <div class="col-sm-8">
                            <select name="isMulti" class="form-control isMulti" id="overlayAdd">
                            	   <option value="0" >独立</option>
                                <option value="1">叠加</option>
                            </select>
                        </div>
                    </div>
                    
                    
                    <div class="form-group epName col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">活动费用种类</label>
                        <div class="col-sm-8">
                            <select id="epSelect"  name="epSelect"  class="form-control show-tick selectpicker" multiple title="活动费用种类" data-live-search="true">
                            </select>
                            <input type="hidden" name="epName" />
                            <input type="hidden" name="epId" />
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">备注</label>
                        <div class="col-sm-8">
                            <textarea class="form-control description" rows="6" name="description"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
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

<!--查看-->
<div class="modal fade salesPromotionView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionView">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">标题</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control title" value="" id="titleView" disabled>
                        </div>
                    </div>
                    <!-- <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">所属项目</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="projectView" value="" disabled>
                        </div>
                    </div> -->
                    <div class="form-group col-sm-6 activityType">
                        <label class="control-label col-sm-3 no-padding-right">类型</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="typeView" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">可叠加优惠</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="isMultiView" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 discount">
                        <label class="control-label col-sm-3 no-padding-right">折扣</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" value="" id="discountView" name="discount" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 lowerLimit1">
                        <label class="control-label col-sm-3 no-padding-right">下限(1)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" value="" id="limit1View" name="lowerLimit1" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 lowerLimit2">
                        <label class="control-label col-sm-3 no-padding-right">下限(2)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" value="" id="limit2View" name="lowerLimit2" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">起止日期</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" value="" id="beginAndEnd" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="enableView" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea class="form-control" rows="8" id="descriptionView" disabled></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade salesPromotionEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionEdit">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">标题</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="" id="titleUpdt" name="title">
                            <input hidden id="activityId" name="activityId" ></input>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 activityType">
                        <label class="control-label col-sm-2 no-padding-right">活动类型类型</label>
                        <div class="col-sm-8">
                            <select name="type" class="form-control type" id="activityAdd">
                                <option value="">--请选择--</option>
                                <option value="1">优惠码</option>
                                <option value="2">报名折扣</option>
                                <option value="4">积分活动</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">产品模型</label>
                        <div class="col-sm-8">
                             <select name="productModelId" id="productModel" class="form-control productModelId chosen-select">
			                 </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">产品</label>
                        <div class="col-sm-8">
						   <select id="projectSelect"  name="projectSelect"  class="form-control show-tick selectpicker" multiple title="产品" data-live-search="true">
                            </select>
                            <input type="hidden" name="project" />
                        </div>
                    </div>
                    
                     <div class="form-group col-sm-12 discount">
                        <label class="control-label col-sm-2 no-padding-right">折扣</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control discountAdd" name="discount">
                        </div>
                    </div>
                    
                    <div class="form-group limit1 col-sm-12 lowerLimit1">
                        <label class="control-label col-sm-2 no-padding-right">下限</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control limit1" name="limit1">
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 lowerLimit2">
                        <label class="control-label col-sm-2 no-padding-right">兑换比例</label>
                        <div class="col-sm-8">
                            <div class="col-sm-5">
                                <div class="controls">
                                    <div class="input-group date">
                                        <input type="text" class="form-control scale1" name="scale1">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <label class="control-label col-sm-1 no-padding-right">=</label>
                            <div class="col-sm-5">
                                <div class="controls">
                                    <div class="input-group date">
                                        <input type="text" class="form-control scale2" name="scale2">
                                        <span class="input-group-addon">积分</span>
                                    </div>
                                </div>
                            </div>
                        </div>                 
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">起止日期</label>
                        <div class="col-sm-8">
                            <div class="input-group date">
                                <input type="text" class="form-control duration4" id="duration4" name="duration4">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">状态</label>
                        <div class="col-sm-8">
                            <select name="enable" class="form-control enable">
                                <option value="">--请选择--</option>
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">可叠加优惠</label>
                        <div class="col-sm-8">
                            <select name="isMulti" class="form-control isMulti" id="overlayAdd">
                            		<option value="0" >独立</option>
                                <option value="1">叠加</option>
                            </select>
                        </div>
                    </div>
                    
                    
                    <div class="form-group epName col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">活动费用种类</label>
                        <div class="col-sm-8">
                            <select id="epSelect"  name="epSelect"  class="form-control show-tick selectpicker" multiple title="活动费用种类" data-live-search="true">
                            </select>
                            <input type="hidden" name="epName" />
                            <input type="hidden" name="epId" />
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">备注</label>
                        <div class="col-sm-8">
                            <textarea class="form-control description" rows="6" name="description"></textarea>
                        </div>
                    </div>
                    
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
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
<script src="${ctx_static }/home/configuration/js/activityManager.js?v=<%=Math.random() %>"></script>

