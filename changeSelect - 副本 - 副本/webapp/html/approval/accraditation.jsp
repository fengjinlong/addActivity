<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/examineApprove/css/accraditation.css" rel="stylesheet">
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label class="control-label pull-left margin-left-20">申请日期</label>
                                <div class="col-md-9 col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input type="text" class="form-control applyDate"
                                                   placeholder="请选择日期" id="queryDate"><span
                                                class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                <input class="form-control"
                                       placeholder="申请人/申请分校/一级科目/二级科目/支出明细" type="text" id="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <button type="button" class="btn increase form-control search-btn" onclick="javascript:DataTable.init();">
                                	<i class="fa fa-search"></i> 搜索
                                </button>

                            </div>
                        </div>

                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group">
                            <!-- <span class="btn btn-default pointer"
                                  title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle"
                                        data-toggle="dropdown">
                                    导出
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="#">保存PDF</a>
                                    </li>
                                    <li>
                                        <a href="#">导出EXCEL</a>
                                    </li>
                                    <li>
                                        <a href="#">导出CSV</a>
                                    </li>
                                </ul>
                            </div> -->
                            <button class="btn increase  pull-right col-sm-4" data-toggle="modal"
                                    data-target=".keyAccraditation" data-backdrop="static" id="approveBatchButton">一键审批
                            </button>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="approveInit">
                                <thead>
                                <tr role="row">
                                    <th>
                                      <label>
                                          <input type="checkbox" class="checkAll">
                                          <span class="text"></span>
                                      </label>
                                    </th>
                                    <th>申请日期</th>
                                    <th>申请分校</th>
                                    <th>申请人</th>
                                    <th>一级科目</th>
                                    <th>二级科目</th>
                                    <th>支出明细</th>
                                    <th>金额</th>
                                    <th>支付渠道</th>
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
</div>
<%@ include file="../common/public_footer.jsp"%>
<!--一键审批-->
<div class="modal fade keyAccraditation" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true" id="approveBatchModel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">一键审批</span>
                
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="approveBatchForm">
                	<input type="hidden" name="applyId" value=""/>
                   	<input type="hidden" name="approveStatus" value=""/>
                    <div class="form-group col-sm-4 col-md-4 col-lg-4">
                        <label class="control-label col-sm-4 col-md-4 col-lg-4 no-padding-right">费用合计</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" class="form-control" value="" name="approveCostTotal" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-4 col-md-4 col-lg-4">
                        <label class="control-label col-sm-4 col-md-4 col-lg-4 no-padding-right">审批人</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="hidden" class="form-control" name="approveUser"   value="${user.userId }"/>
                            <input type="text"   class="form-control" name="approveUserName" value="${user.realName }" disabled/>
                            <input type="hidden"   class="form-control" name="approveDuty" value="${user.dutyId }"/>
                        </div>
                    </div>
                    <div class="form-group col-sm-4 col-md-4 col-lg-4">
                        <label class="control-label col-sm-4 col-md-4 col-lg-4 no-padding-right">审批日期</label>
                        <div class="col-sm-8 col-md-8 col-lg-8">
                            <input type="text" class="form-control" value="" name="approveDate" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="control-label col-sm-1 no-padding margin-left-20">审批意见</label>
                        <div class="col-sm-10">
                            <textarea rows="6" class="form-control" style="resize: none;" name="approveAdvice"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-danger form-control" id=approveNOBatchPass>审批不通过
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="submit" class="btn btn-primary form-control" id=approveBatchPass>审批通过</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--审批-->
<div class="modal fade Scoresofnew" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true" id="approveModel">
    <div class="modal-dialog modal-lg modal-content">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">审批</span>
            </div>
            <div class="modal-body clearfix">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="modal-body clearfix" style="background:#fff">
                        <form class="form-horizontal" id="approveForm">
                        	<input type="hidden" name="financeCostclassId" value=""/>
                        	<input type="hidden" name="financeAppmainId" value=""/>
                        	<input type="hidden" name="financeApprovingId" value=""/>
                        	<input type="hidden" name="dutys" value=""/>
                        	<input type="hidden" name="applyId" value=""/>
                        	<input type="hidden" name="status" value=""/>
                            <div class="form-group col-sm-12" style="margin-bottom: 30px;">
                                <label class="control-label col-sm-4 col-md-4 col-lg-4 no-padding" style="margin-top:7px">审批人</label>
                                <div class="col-sm-8 col-md-8 col-lg-8 padding-left-10 no-padding">
                                	<input type="hidden" class="form-control" name="approveUser"   value="${user.userId }"/>
                            		<input type="text"   class="form-control" name="approveUserName" value="${user.realName }" disabled/>
                            		<input type="hidden" class="form-control" name="approveDuty" value="${user.dutyId }"/>
                                </div>
                            </div>
                            <div class="form-group col-sm-12" style="margin-bottom: 30px";>
                                <label class="control-label col-sm-4 col-md-4 col-lg-4 no-padding" style="margin-top:7px">审批日期</label>
                                <div class="col-sm-8 col-md-8 col-lg-8 padding-left-10 no-padding">
                                    <div class="input-group">
                                        <input class="form-control date-picker" value="当前日期" type="text"  disabled>
                                        <span class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-12">
                                <label class="control-label col-sm-4 col-md-4 col-lg-4 no-padding" style="margin-top:7px">备注</label>
                                <div class="col-sm-8 col-md-8 col-lg-8 padding-left-10 no-padding">
                                    <textarea class="content" rows="8" style="resize: none;" name="memo" style="width:100%"></textarea>
                                </div>
                            </div>
                            <div class="form-group modal-footer" id="approveButton">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <button type="submit" class="btn btn-danger form-control" id="approveNoPass" style="width:auto">审批不通过
                                    </button>
                                </div>
                                <div class="col-sm-4">
                                    <button type="submit" class="btn btn-primary form-control" id="approvePass">审批通过</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-lg-content" id="approveFlow">
                    <ul class="timeline">
                        <li class="timeline-node">
                            <a class="btn btn-palegreen">NOW</a>
                        </li>
                        <li>
                            <div class="timeline-datetime">
                                <span class="timeline-time">
                                    8:19
                                </span><span class="timeline-date">Today</span>
                            </div>
                            <div class="timeline-badge blue unpass">
                                <i class="handle-num unpass-content">6</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title">
                                        New Items Arrived
                                    </span>
                                    <p class="timeline-datetime">
                                        <small class="text-muted">
                                            <i class="glyphicon glyphicon-time">
                                            </i>
                                            <span class="timeline-date">Today</span>
                                            -
                                            <span class="timeline-time">8:19</span>
                                        </small>
                                    </p>
                                </div>
                                <div class="timeline-body">
                                    <p>Purchased new stationary items for head office</p>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-datetime">
                                <span class="timeline-time">
                                    3:10
                                </span><span class="timeline-date">Today</span>
                            </div>
                            <div class="timeline-badge darkorange unpass">
                                <i class="handle-num unpass-content">5</i>
                            </div>
                            <div class="timeline-panel bordered-right-3 bordered-orange">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title">
                                        Visit Appointment
                                    </span>
                                    <p class="timeline-datetime">
                                        <small class="text-muted">
                                            <i class="glyphicon glyphicon-time">
                                            </i>
                                            <span class="timeline-date">Today</span>
                                            -
                                            <span class="timeline-time">3:10</span>
                                        </small>
                                    </p>
                                </div>
                                <div class="timeline-body">
                                    <p>Outdoor visit at California State Route 85 with John
                                        Boltana &amp; Harry Piterson regarding to setup a
                                        new show room.</p>
                                    <p>
                                        <i class="orange fa fa-exclamation"></i> New task
                                        added for <span><a href="#" class="info">James Dean</a></span>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-node">
                            <a class="btn btn-yellow">YESTERDAY</a>
                        </li>
                        <li>
                            <div class="timeline-datetime">
                                <span class="timeline-time">
                                    8:19
                                </span><span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge sky pass-ing">
                                <i class="handle-num passing-content">4</i>
                            </div>
                            <div class="timeline-panel bordered-top-3 bordered-azure">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title">
                                        Bank Report
                                    </span>
                                    <p class="timeline-datetime">
                                        <small class="text-muted">
                                            <i class="glyphicon glyphicon-time">
                                            </i>
                                            <span class="timeline-date">Yesterday</span>
                                            -
                                            <span class="timeline-time">8:19</span>
                                        </small>
                                    </p>
                                </div>
                                <div class="timeline-body">
                                    <p>
                                        Curabitur ullamcorper ultricies nisi. Nam eget dui.
                                        Etiam rhoncus. Maecenas tempus, tellus eget
                                        condimentum rhoncus, sem quam semper libero, sem
                                        neque sed ipsum.
                                    </p>
                                    Tellus eget condimentum rhoncus, sem quam semper libero,
                                    sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
                                    blandit
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-datetime">
                                <span class="timeline-time">
                                    6:08
                                </span><span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge sky pass">
                                <i class="handle-num pass-content">3</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title">
                                        <a href="">Sergey Azovskiy</a> has commented on your <a href="">status</a>
                                    </span>
                                    <p class="timeline-datetime">
                                        <small class="text-muted">
                                            <i class="glyphicon glyphicon-time">
                                            </i>
                                            <span class="timeline-date">Yesterday</span>
                                            -
                                            <span class="timeline-time">6:08</span>
                                        </small>
                                    </p>
                                </div>
                                <div class="timeline-body">
                                    <p>
                                        <i class="orange fa fa-quote-left"></i> Happy
                                        Birthday Lydia.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-datetime">
                                <span class="timeline-time">
                                    7:00
                                </span><span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge danger pass">
                                <i class="handle-num pass-content">2</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title danger">
                                        Deadline Added
                                    </span>
                                    <p class="timeline-datetime">
                                        <small class="text-muted">
                                            <i class="handle-num">2
                                            </i>
                                            <span class="timeline-date">Yesterday</span>
                                            -
                                            <span class="timeline-time">7:00</span>
                                        </small>
                                    </p>
                                </div>
                                <div class="timeline-body">
                                    <p>Dyvia Phillips added new milestone <span><a class="danger" href="#">UI</a></span> Lorem
                                        ipsum dolor sit amet consiquest dio</p>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-datetime">
                                <span class="timeline-time">
                                    3:09
                                </span><span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge pass">
                                <i class="handle-num pass-content">1</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <p class="timeline-datetime">
                                        <small class="text-muted">
                                            <i class="glyphicon glyphicon-time">
                                            </i>
                                            <span class="timeline-date">Yesterday</span>
                                            -
                                            <span class="timeline-time">3:09</span>
                                        </small>
                                    </p>
                                </div>
                                <div class="timeline-body">
                                    <a href="#">John Travolta</a> shared an image on <a href="#">Dribble</a>
                                    <div class="tl-wide text-center" style="padding: 5px; margin-top:10px; margin-bottom: 10px;">
                                    </div>
                                    <i class="text-muted text-sm">Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna
                                        aliqua.</i>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-node">
                            <a class="btn btn-info">11 DECEMBER</a>
                        </li>
                    </ul>
                </div>
                
                <div id="divApplyDetail" class="form-group col-lg-12 col-md-12 col-sm-12" style="width:100%;overflow-x:auto">
									<table class="table table-striped table-hover table-bordered dataTable no-footer">
										<tr>
											 <th ><label> <input type="checkbox">
																<span class="text"></span>
														</label></th>
				                              <th>报名日期</th>
				                              <th>姓名</th>
				                              <th>状态</th>
				                              <th>考期</th>
				                              <th>产品名称</th>
				                              <th>应缴</th>
				                              <th>实缴</th>
				                              <th>资料查看</th>
				                              <th>费用支付记录</th>
			                              </tr>
										<tbody id="applyDetail">
											
										</tbody>
									</table>
								</div>
                
            </div>
        </div>
    </div>
</div>

<!--明细-->
<div class="modal fade cooperation-module-edit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
	            <div class="dataTables_wrapper form-inline no-footer">
					<table class="table table-striped table-hover table-bordered dataTable no-footer" id="detail">
						<thead>
							<tr>
								<th>缴费日期</th>
								<th>费用名称</th>
								<th>缴费方式</th>
								<th>缴费金额</th>
								<th>费用类型</th>
								<th>状态</th>
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

<!--明细-->
<div class="modal fade cooperation-see" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
	            <div class="dataTables_wrapper form-inline no-footer">
					<table class="table table-striped table-hover table-bordered dataTable no-footer" id="detailzl">
						<thead>
							<tr>
								<th>资料名称</th>
								<th>资料预览</th>
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

<!--预览图片-->
<div class="modal fade lookImg in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs" style="margin-left: 20%;">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">预览图片</span>
			</div>
			<div class="modal-body clearfix">
				<img id="imgLook" src=" " style="height: auto;width: auto;position: initial;top: 0;bottom: 0;left: 0;right: 0; width: 100%;margin: auto;z-index: -1;"> 
			</div>
		</div>
	</div>
</div>


<script>
	$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
		KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
		editor = KindEditor.create('.content',{
			uploadJson:'${ctx }/file/uploadFile',
				resizeType:0,
				afterBlur: function(){
				this.sync();
			}
		});
	});
</script>


<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>

<!--富文本编辑器-->
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>


<script src="${ctx_static }/home/examineApprove/js/accraditation.js?v=<%=System.currentTimeMillis() %>"></script>


