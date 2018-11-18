<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
<link href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" media="all" rel="stylesheet"/>
<link href="${ctx_static }/home/serviceCenter/css/studentsRefund.css" rel="stylesheet"/>

<div class="row">
		<div class="col-xs-12">
			<div class="widget">
			<input hidden id="currentUser" value="${user.realName }">
				<div class="widget-header">
				    <div class="widget-buttons"></div>
				</div>
				<div class="widget-body">
					<div class="widget-main ">
						<div class="tabbable">
							<ul class="nav nav-tabs tabs-flat" id="myTab11">
								<li class="active" value="1">
									<a data-toggle="tab" href="#home11">
										初审 <!-- [<span id="fristApplication">0</span>] -->
									</a>
								</li>
								<li value="2">
									<a data-toggle="tab" href="#profile11">
										资源未确认 <!-- [<span id="resourcesUnconfirmed">0</span>] -->
									</a>
								</li>
								<li value="3">
									<a data-toggle="tab" href="#education">
										资源确认<!--  [<span id="resourcesConfirm">0</span>] -->
									</a>
								</li>
								<li value="4">
									<a data-toggle="tab" href="#shangmen">
										学员退费申请<!--  [<span id="studentApplication">0</span>] -->
									</a>
								</li>
								<input type="hidden" id="type" value="1"/>
								<input type="hidden" id="infoManageId">
							</ul>
							<div class="tab-content tabs-flat bordered-blue">
								<div id="home11" class="tab-pane in active">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 form-group">
											<label class="control-label pull-left" style="margin-left:15px;">日期</label>
											<div class="col-sm-10">
												<div class="input-group">
													<input type="text" class="form-control" id="reservation">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
												</div>
											</div>
										</div>
									
										<div class="col-lg-5 col-md-5  col-sm-5 col-xs-12">
											
											<div class="form-group col-lg-3 col-md-4 col-sm-3">
												<button onclick="init()" type="button" class="btn increase form-control search-btn">
										                  <i class="fa fa-search"></i> 搜索
										            </button>
												</div>
											</div>
											
										</div>
										<div class="table-scrollable">
											<table id="table11" class="table table-striped table-bordered table-hover">
												<thead>
												<tr>
														<th>
															分校 
														</th>
														<th>
															品牌
														<th>
															姓名 
														</th>
														<th>
															操作 
														</th>
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
			</div>
		</div>
	</div>
	</div>
</div>

<!--退费-->
<div class="modal fade returnPremium in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">退费</span>
            </div>
            <div class="modal-body clearfix">
                <form method="" class="form-horizontal" style="padding:0 20px">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class="pull-left">
                                    <b>基本信息</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin gt_content">
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-md-3 control-label no-padding-left no-padding-right">所属分校</label>
                                    <div class="col-md-9">
                                        <input id="tffx" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-md-3 control-label no-padding-left no-padding-right">学员姓名</label>
                                    <div class="col-md-9">
                                        <input id="tfmc" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right no-padding-left">性别</label>
                                    <div class="col-sm-9 col-lg-9 col-md-9">
                                        <input id="tfxb" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-lg-3 col-sm-3 col-md-3 control-label no-padding-left no-padding-right">报名时间</label>
                                    <div class="col-sm-9 col-lg-9 col-md-9">
                                        <input id="tfbm" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-lg-3 col-sm-3 col-md-3 control-label no-padding-left no-padding-right">手机号码</label>
                                    <div class="col-sm-9 col-lg-9 col-md-9">
                                        <input id="tfsj" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型：</label>
                                    <div class="col-sm-9">
                                        <input id="tfzj" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-10 col-sm-10">
                                    <label style="margin-left: -48px !important;"
                                           class="col-sm-2 control-label no-padding-right">证件号码</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfzjhm" class="form-control" type="text" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class='pull-left'>
                                    <b>课程及费用中心</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin">

                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">项目</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfxm" type="text" class="form-control" disabled>
                                        <input id="tfxmid" type="hidden" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">级别</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfjb" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-left no-padding-right">考期</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfkq" type="text" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">班型</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfbx" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">培训费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfpx" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">培训费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfpx1" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right no-padding-left have-cost">已产生费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input onkeyup="tfyheji(this)" id="tfypx" type="number"  min="0"class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">培训费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfpx2" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">考务费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfkw" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">考务费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfkw1" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group  col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right have-cost">已产生费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input onkeyup="tfyheji(this)" id="tfykw" type="number"  min="0"class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">考务费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfkw2" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">资料费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfzl" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">资料费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfzl1" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right no-padding-left have-cost">已产生费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input onkeyup="tfyheji(this)" id="tfyzl" type="number"  min="0"class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">资料费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfzl2" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">协议费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfxy" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">协议费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfxy1" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right have-cost">已产生费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input onkeyup="tfyheji(this)" id="tfyxy" type="number"  min="0"class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">协议费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfxy2" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">教材费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfjc" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">教材费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfjc1" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right have-cost">已产生费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input onkeyup="tfyheji(this)" id="tfyjc" type="number"  min="0"class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">教材费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfjc2" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">服务费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tffw" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">服务费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tffw1" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right have-cost">已产生费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input onkeyup="tfyheji(this)" id="tfyfw" type="number"  min="0"class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right">服务费</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tffw2" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left">应缴总额</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfzongji" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left">实缴总额</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfshiji" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-6 control-label no-padding-right have-cost">剩余总费用</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfsyzj" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left">欠费总额</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="tfqianfei" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-6 col-md-6 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left"
                                           style="margin-left: -31px;">报名接待咨询师</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" disabled id="reciveName">
                                    </div>
                                </div>
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label class="col-sm-2 control-label pull-left no-padding-left"
                                           style="margin-left:-20px">退换相关资料</label>
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input id="dataBaoming" type="checkbox" class="preferential" name="">
                                            <span class="text">报名表</span>
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input id="dataXieyi" type="checkbox" class="preferential" name="">
                                            <span class="text">协议</span>
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input id="dataFapiao"  type="checkbox" class="preferential" name="">
                                            <span class="text">发票</span>
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input id="dataJiaocaijiaofu" type="checkbox" class="preferential" name="">
                                            <span class="text">教材教辅</span>
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input id="dataJiaofeipingzheng" type="checkbox" class="preferential" name="">
                                            <span class="text">缴费凭证</span>
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2 col-sm-offset-2">
                                        <label style="margin-left:-20px">
                                            <input id="dataZengpin" type="checkbox" class="preferential" name="">
                                            <span class="text">赠品</span>
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2">
                                        <label style="margin-left:-20px">
                                            <input id="dataTingkezheng" type="checkbox" class="preferential" name="">
                                            <span class="text">听课证</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label class="col-sm-1 control-label no-padding-right no-padding-left margin-left-30">其他</label>
                                    <div class="col-sm-9">
                                        <input id="dataOrther" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class="pull-left">
                                    <b>退费情况汇总</b>
                                </div>
                                <div class="pull-right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin">
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                <input type="hidden" id="returnsId">
                                    <label class="col-sm-2 control-label no-padding-right" style="margin-left: -63px">退费原因</label>
                                    <div class="col-sm-11">
                                        <textarea id="returnsWhy" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="pull-left control-label no-padding-right">合作方名称</label>
                                    <div class="col-sm-8 no-padding-right">
                                        <input id="partner" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="pull-left control-label no-padding-right">已支出合作费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="partnerPayEd" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="pull-left control-label no-padding-right" style="margin-left: -7px;">合作费是否已退</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <select id="partnerPayReturn">
                                        	<option value="0">否</option>
                                        	<option value="1">是</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label class="col-sm-2 control-label no-padding-right" style="margin-left: -63px">分校退费建议</label>
                                    <div class="col-sm-11">
                                        <textarea id="schoolReturnAnswer" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label class="col-sm-2 control-label no-padding-right" style="margin-left: -63px">退费资料上传</label>
                                    <div class="col-md-11">
                                        <input id="bulk-upload" name="file" type="file" multiple>
                                        <input id="returnFile"  type="hidden" >
                                    </div>
                                </div>
                                <div class="form-group col-sm-12">
                                    <label class="control-label col-md-1 col-sm-3 no-padding-right margin-left">备注</label>
                                    <div class="col-md-11 col-sm-11">
                                           <textarea class="form-control refundRemark" rows="8" id="returnContent"
                                                     name="refundRemark" style="width:668px;height:340px;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class="pull-left">
                                    <b>相关扣费</b>
                                </div>
                                <div class="pull-right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin">
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">报名表费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payBaoming" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">听课证费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payTingke" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">咨询费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payZixun" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left">资质评审费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payZhizi" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">教材教辅</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payJiaocaijiaofu" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">赠品折价</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payZengpin" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left">网络学习卡</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payWangluoxuexika" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">课时费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payKeshifei" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">注册费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payZhucefei" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left">报/补考费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payBukaofei" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">网络助学</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payWangluozuxue" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left">刷卡手续费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payShuakashouxufei" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">跨行转账</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payKuahangzhuanzhang" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">发票相关</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payFapiaoxiangguan" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left">转班手续费</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payZhuanbanshouxufei" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-3 col-md-3 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right">其他费用</label>
                                    <div class="col-sm-7 no-padding-right">
                                        <input id="payOrther" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class="pull-left">
                                    <b>责任鉴定</b>
                                </div>
                                <div class="pull-right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin">
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 control-label no-padding-right" style="margin-left: -14px">责任鉴定</label>
                                    <div class="col-sm-8">
                                        <select id="responsibility"  class="form-control no-padding-left no-paddding-right">
                                            <option selected value="0">分校全责</option>
                                            <option value="1">分校半责</option>
                                            <option value="2">分校无责</option>
                                            <option value="3">集团责任</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left">相关责任人</label>
                                    <div class="col-sm-8">
                                        <input id="responsibilityPeople"  type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 control-label no-padding-right">罚款金额</label>
                                    <div class="col-sm-8">
                                        <input id="responsibilityPay"  type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group col-sm-12">
                                    <label class="control-label col-sm-1 no-padding-right">备注</label>
                                    <div class="col-sm-11">
                                        <textarea id="responsibilityContent"  class="form-control dutyRemark" rows="8" id="dutyRemark"
                                                  name="dutyRemark" style="width:668px;height:340px;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer  tfclass">
                            <div class="col-sm-2 col-sm-offset-4">
                                <button type="button" class="btn btn-primary form-control refund-btn" onclick="returns(0)"
                                        data-toggle="modal">确认
                                </button>
                            </div>
                            <div class="col-sm-2">
                                <button onclick="returns(1)" type="button" class="btn btn-primary form-control">保存
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--退费申请-->
<div class="modal fade refund-apply in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
  	<div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">退费申请</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="tfForm">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">申请人</label>
                        <div class="col-sm-8">
                            <input id="applyUser" value="${user.realName }" type="text" class="form-control" readonly>
                            <input id="applyUserId" value="${user.userId }" type="hidden" class="form-control" readonly>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">退费总金额</label>
                        <div class="col-sm-8 no-padding-right">
                            <input id="money" type="text" class="form-control" readonly>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="form-group col-sm-12 issue-refund">
                            <label class="control-label col-sm-2 no-padding-right" style="margin-left:-5px;">第<span class="issue">1</span>期退款：金额</label>
                            <div class="col-sm-10 padding-left-10 refundApplicationIssue">
                                <div class="col-sm-4 no-padding-left ">
                                    <input type="text" class="form-control wipe-data">
                                </div>
                                <div class="col-sm-4 no-padding-left">
                                    <select name="" class="form-control fs">
                                        <option value="1">集团支付</option>
                                        <option value="2">分校支付</option>
                                    </select>
                                </div>
                                <div class="col-sm-4 no-padding">
                                    <select name="" class="form-control">
                                        <option value="1">汇款</option>
                                    </select>
                                </div>
                            </div>
                            <a href="#" class="blue refund-add">
                                <i class="fa fa-plus-circle"></i>
                            </a>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">支出明细</label>
                        <div class="col-sm-10 padding-left-10">
                            <input type="text" class="form-control wipe-data" id="expendDetail" >
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">发票抬头</label>
                        <div class="col-sm-10 padding-left-10">
                            <input id="invoiceTitle" type="text" class="form-control wipe-data">
                        </div>
                    </div>
                   <%--  <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">部门</label>
                        <div class="col-sm-8">
                            <input id="userBM" value="${user.deptName }" type="text" class="form-control costClasses" disabled>
                            <input id="userBMId" value="${user.departmentId }" type="hidden" class="form-control costClasses" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">项目</label>
                        <div class="col-sm-8 no-padding-right">
                            <input id="tfxm1" type="text" class="form-control costClasses" disabled>
                        </div>
                    </div> --%>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">类别</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                                <input value="教学费用" type="text" class="form-control costClasses" readonly>
                            </div>
                            <div class="col-sm-4">
                                <input value="学员退费" type="text" class="form-control categoriesCost" readonly>
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <input type="text" class="form-control categoriesCost" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">收款人</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-3 no-padding-left ">
                                <input id="professionaProject" type="text" class="form-control wipe-data" placeholder="收款人">
                            </div>
                            <div class="col-sm-3">
                                <input type="text" id="bankName" class="form-control wipe-data" placeholder="开户行">
                            </div>
                            <div id="distpicker">
                                <div class="col-sm-3 no-padding-right">
                                    <!-- <select class="form-control" id="province" data-province="--开户行所在省--"></select> -->
                                     <input type="text" class="form-control wipe-data" id="province" placeholder="开户行所在省">
                                </div>
                                <div class="col-sm-3 no-padding-right">
                                    <!-- <select class="form-control" id="city" data-city="--开户行所在市--"></select> -->
                                     <input type="text" class="form-control wipe-data" id="city" placeholder="开户行所在市">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right"></label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control wipe-data" id="accountName" placeholder="开户人">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control wipe-data" id="accountNum" placeholder="账号">

                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <input type="text" class="form-control wipe-data" id="phone" placeholder="电话">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">调账</label>
                        <div class="col-sm-8">
                            <select id="isAdjustment" name="" class="form-control">
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">申请地区：</label>
                        <div class="col-sm-8 no-padding-right">
                            <input value="中和教育" type="text" class="form-control" disabled>
                            <input id="departmentId2" value="${user.companyId }" type="hidden" class="form-control" readonly>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">申请说明</label>
                        <div class="col-sm-10 padding-left-10">
                            <textarea name="" class="form-control apply-info wipe-data" id="apply-info"
                                      style="width: 668px; height: 340px"></textarea>
                        </div>
                    </div>

                    <div class="form-group col-sm-12 applicationFlow hidden">
                    <input id="approveNextDuty" type="hidden" class="form-control" disabled>
                    <input id="dutyIdVal" type="hidden" class="form-control" disabled>
                        <div class="col-sm-offset-2">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-5">
                            <button id="addPay" onclick="addApply(this)" type="button" class="btn btn-primary form-control">确认申请</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>
<!--省市联动-->
<script src="${ctx_static }/dep/distpicker/distpicker.data.js"></script>
<script src="${ctx_static }/dep/distpicker/distpicker.js"></script>
<!-- 日期插件 -->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<!--省市联动-->
<script src="${ctx_static }/dep/distpicker/distpicker.data.js"></script>
<script src="${ctx_static }/dep/distpicker/distpicker.js"></script>
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/studentsRefund.js"></script>

<script type="text/javascript">
//富文本编辑器 
$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
	KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
	editor1 = KindEditor.create('#returnContent',{
		uploadJson:'${ctx }/file/uploadFile',
		resizeType: 0
	});
	editor2 = KindEditor.create('#responsibilityContent',{
		uploadJson:'${ctx }/file/uploadFile',
		resizeType: 0
	});
	
	editor3 = KindEditor.create('#apply-info',{
		uploadJson:'${ctx }/file/uploadFile',
		resizeType: 0
	});
	editor4 = KindEditor.create('#apply-info',{
		uploadJson:'${ctx }/file/uploadFile',
		resizeType: 0
	});
}); 
</script>
