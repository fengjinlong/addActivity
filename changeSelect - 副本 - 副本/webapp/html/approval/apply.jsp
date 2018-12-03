<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/examineApprove/css/apply.css" rel="stylesheet">  
<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/permission.css">
<div class="page-body">
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <div class="row">
                <div class="col-lg-12 col-sm-12 col-xs-12">
                    <div class="widget">
                        <div class="widget-header">
                        	<span class="widget-caption">申请列表</span>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main clearfix">
		                        <div class="col-lg-12 col-sm-12 col-xs-12">
							      	<!-- <div class="pricing-container financialApplication" id="financeItems">
							      	</div> -->
							    <div class="role-list">
                                <ul class="nav sidebar-menu" id="financeItems">
                                    <!-- <li class="">
                                        <a href="#" class="menu-dropdown">
                                            <i class="fa fa-list-ul"></i>
                                            <span class="menu-text pn-title">中和教育集团</span>
                                            <i class="fa pull-right"></i>
                                        </a>
                                        <ul class="submenu" style="display: none;">
                                            <li>
                                                <a href="javascript:;">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">集团市场部</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">集团人资中心</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">集团行政中心</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" class="menu-dropdown">
                                            <i class="fa fa-list-ul"></i>
                                            <span class="menu-text pn-title">学慧网</span>
                                            <i class="fa pull-right"></i>
                                        </a>
                                        <ul class="submenu">
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">技术部</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">产品部</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" class="menu-dropdown">
                                            <i class="fa fa-list-ul"></i>
                                            <span class="menu-text pn-title">合作方</span>
                                            <i class="fa pull-right"></i>
                                        </a>

                                        <ul class="submenu">
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">合作方1</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-file-text-o"></i>
                                                    <span class="menu-text">合作方2</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li> -->
                                </ul>
                                <!-- <div class="addRole text-center">
                                    <button type="button" class="btn btn-info" data-toggle="modal">
                                        	下一步
                                    </button>
                                </div> -->
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
<!--财务申请-->
<div class="modal fade financeApply" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true" id="financeApplyModel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">财务申请</span>
                
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="financeApplyForm">
                    <div class="form-group col-sm-6">
                    	<input type="hidden" name="dutyIdVal" val="">
<!--                     	<input type="hidden" name="dutyNameVal" val=""> -->
                        <label class="control-label col-sm-4 no-padding-right">申请人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" disabled  value="${user.realName }">
							<input type="hidden" class="form-control"   name="applicantId" value="${user.userId }">
							<input type="hidden" class="form-control" disabled    value="${user.dutyId }">
                        </div>
                    </div>
                   	<div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">申请时间：</label>
                        <div class="col-sm-8 no-padding-right">
                            <input type="text" value="当前时间" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">金额：</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                                <input type="text" class="form-control" name="money">
                            </div>
                            <div class="col-sm-4">
                                <select name="paymentFrom" class="form-control">
                                    <option value="1">集团支付</option>
                                    <option value="2">分校支付</option>
                                </select>
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <select name="payment" class="form-control">
                                    <option value="1">现金</option>
									<option value="2">汇款</option>
									<option value="3">支票</option>
									<option value="4">pos</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">支出明细：</label>
                        <div class="col-sm-10 padding-left-10">
                            <input type="text" class="form-control" name="expendDetail">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">发票抬头：</label>
                        <div class="col-sm-10 padding-left-10">
                           <input type="text" class="form-control" name="invoiceTitle">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">部门：</label>
                        <div class="col-sm-8">
                           <input type="text" class="form-control" disabled name="">
						   <input type="hidden" class="form-control"  name="departmentId1">
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">产品：</label>
                        <div class="col-sm-8 no-padding-right">
                          <select class="form-control" name="projectId">
							</select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">类别：</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                              <select class="form-control" name="pCostclassId">
							</select>
                            </div>
                            <div class="col-sm-4">
                                <select class="form-control" name="costclassId">
							    </select>
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <select  class="form-control" name="expendType">
                                    <option value="1">营业支出</option>
                                    <option value="2">营业外支出</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">收款人：</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-3 no-padding-left ">
                                <select class="form-control" name="payeeId">
								</select>
                            </div>
                            <div class="col-sm-3">
                               <input type="text" class="form-control" placeholder="开户行" name = "bankName"
									readonly="readonly">
                            </div>
                            <div class="col-sm-3 no-padding-right">
                              <input type="text" class="form-control" placeholder="开户行所在省" name="province"
									readonly="readonly">

                            </div>
                            <div class="col-sm-3 no-padding-right">
                              <input type="text" class="form-control" placeholder="开户行所在市" name="city"
									readonly="readonly">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right"></label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户人" name="payeeName" readonly="readonly">
                                <input type="hidden" name="accountName">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" placeholder="账号" name="accountNum" readonly="readonly">

                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <input type="text" class="form-control" placeholder="电话" name="phone" readonly="readonly">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">调账：</label>
                        <div class="col-sm-8">
                          <select class="form-control" name="isAdjustment">
								<option value="1">是</option>
								<option value="2">否</option>
							</select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">申请地区：</label>
                        <div class="col-sm-8 no-padding-right">
                            <input type="text" class="form-control" disabled name="">
							<input type="hidden" class="form-control"  name="departmentId2">
                        </div>
                    </div>
                     <div class="form-group col-sm-6 no-padding-right" style="display:none;">
                        <label class="control-label col-sm-4 no-padding-right">审批职位：</label>
                        <div class="col-sm-8 no-padding-right">
							<input type="hidden" name="approveNextDuty" value=""></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">申请说明：</label>
                        <div class="col-sm-10 padding-left-10">
                            <textarea name="content" class="form-control content" style="width:668px;height:340px;visibility:hidden;"></textarea>
                        	<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="content"]',{
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

                    <div class="form-group col-sm-12 applicationFlow" id="approveFlow">
                        <!-- <div class="col-sm-offset-2">
                            <label>
                                <a class="label label-info badge-square">申请</a>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="fa fa-mail-forward round"></i>
                            </label>
                        </div>
                        <div class="col-sm-offset-2">
                            <label>
                                <i class="fa fa-mail-reply"></i>
                                <a class="label label-info badge-square">分校总经理审批</a>
                            </label>
                            <label>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                                <a class="label label-info badge-square">分校总经理审批</a>
                            </label>
                            <label>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                                <a class="label label-info badge-square">分校总经理审批</a>
                            </label>
                            <label>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                                <a class="label label-info badge-square">分校总经理审批</a>
                            </label>
                        </div>
                        <div class="col-sm-offset-2">
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-right"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="fa fa-mail-forward round"></i>
                            </label>
                        </div>
                        <div class="col-sm-offset-2">
                            <label>
                                <a class="label last label-info badge-square">结束</a>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                                <i class="glyphicon glyphicon-arrow-left"></i>
                            </label>
                            <label>
                                <a class="label label-info badge-square">分校总经理审批</a>
                            </label>
                        </div> -->
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-5">
                            <button type="submit" class="btn btn-primary form-control" id="confirmSubmit">申请支出</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="${ctx_static }/home/examineApprove/js/apply.js"></script>

