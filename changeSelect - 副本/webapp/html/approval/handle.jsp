<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/examineApprove/css/handle.css" rel="stylesheet" />

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
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="control-label pull-left margin-left-20">申请日期</label>
                                <div class="col-md-9 col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input type="text" class="form-control applyDate" placeholder="请选择日期" id="queryDate"/>
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-5 col-xs-12" style="width:40%;">
                            <div class="form-group col-md-10 col-sm-10 no-padding-left">
                                <input class="form-control" placeholder="申请人/申请分校/一级科目/二级科目/支出明细" type="text" id="searchVal" onkeydown="search();"/>
                            </div>
                            <div class="pull-left" style="margin-left:15px;">
                                <button type="button" class="btn btn-lightBlue form-control search-btn" onclick="javascript:DataTable.init();" style="width:70px;padding:0;">
                                	<i class="fa fa-search"></i>  搜索</button>
                            </div>
                        </div>
                      	<div class="btn-group state-btn pull-right" style="margin-right:15px;">
                             <a href="#" class="btn state-active" id="handleAll">全部</a>
                             <a href="#" class="btn btn-default" id="handleComplete">审批完成</a>
                             <a href="#" class="btn btn-default" id="handleApproving">审批中</a>
                             <a href="#" class="btn btn-default"  id="handleBack">已驳回</a>
                      	</div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="handleTableInit">
                                <thead>
                                <tr role="row">
                                    <!--  <th> <label> <input type="checkbox" class="checkAll" /> <span class="text"></span> </label> </th> 
                                     <th>编号<span class="fa indicator fa-unsorted"></span></th>  -->
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
                                <tr>
                                    <!-- <td></td> 
                                    <td class="red"></td>  -->
                                    <td class="red"></td>
                                    <td class="red"></td>
                                    <td class="red"></td>
                                    <td class="red"></td>
                                    <td class="red"></td>
                                    <td class="red"></td>
                                    <td class="red">合计：</td>
                                    <td class="red">1750</td>
                                    <td class="red"></td>
                                </tr>
                                <tr>
                                    <!-- <td> <label> <input type="checkbox" class="checkAll" /> <span class="text"></span> </label> </td> 
                                    <td>138864</td>  -->
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> <a href="#" class="btn btn-warning btn-xs" data-backdrop="static" onclick="tiaozhuan()"><i class="fa fa-folder-open-o"></i> 查看</a> </td>
                                </tr>
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
<div style="display:none" id="userInfo">
    <input name="userId" value="${user.userId }">
    <input name="dutyId" value="${user.dutyId }">
</div>
<!--审批-->
<div class="modal fade Scoresofnew" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-content">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <span class="widget-caption">审批</span>
            </div>
            <div class="modal-body clearfix">
                <div class="col-lg-5">
                    <div class="modal-body clearfix" style="background:#fff">
                        <form class="form-horizontal" id="financeApply">
                            <div class="form-group col-sm-12" style="margin-bottom: 30px;">
                                <label class="control-label col-sm-2 no-padding" style="margin-top:7px">审批人</label>
                                <div class="col-sm-10 padding-left-10 no-padding">
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="form-group col-sm-12" style="margin-bottom: 30px">
                                <label class="control-label col-sm-2 no-padding" style="margin-top:7px">审批日期</label>
                                <div class="col-sm-10 padding-left-10 no-padding">
                                    <div class="input-group">
                                        <input class="form-control date-picker" type="text" />
                                        <span class="input-group-addon"> <i class="fa fa-calendar"></i> </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-12">
                                <label class="control-label col-sm-2 no-padding" style="margin-top:7px">审批意见</label>
                                <div class="col-sm-10 padding-left-10 no-padding">
                                    <textarea cols="32" rows="8" style="resize: none;"></textarea>
                                </div>
                            </div>
                            <div class="form-group modal-footer">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <button type="button" class="btn btn-danger form-control" data-dismiss="modal">审批不通过 </button>
                                </div>
                                <div class="col-sm-4">
                                    <button type="submit" class="btn btn-primary form-control">审批通过</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-7 col-lg-content">
                    <ul class="timeline">
                        <li class="timeline-node"> <a class="btn btn-palegreen">NOW</a> </li>
                        <li>
                            <div class="timeline-datetime">
                                <span class="timeline-time"> 8:19 </span>
                                <span class="timeline-date">Today</span>
                            </div>
                            <div class="timeline-badge blue unpass">
                                <i class="handle-num unpass-content">6</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title"> New Items Arrived </span>
                                    <p class="timeline-datetime"> <small class="text-muted"> <i class="glyphicon glyphicon-time"> </i> <span class="timeline-date">Today</span> - <span class="timeline-time">8:19</span> </small> </p>
                                </div>
                                <div class="timeline-body">
                                    <p>Purchased new stationary items for head office</p>
                                </div>
                            </div> </li>
                        <li class="timeline-inverted">
                            <div class="timeline-datetime">
                                <span class="timeline-time"> 3:10 </span>
                                <span class="timeline-date">Today</span>
                            </div>
                            <div class="timeline-badge darkorange unpass">
                                <i class="handle-num unpass-content">5</i>
                            </div>
                            <div class="timeline-panel bordered-right-3 bordered-orange">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title"> Visit Appointment </span>
                                    <p class="timeline-datetime"> <small class="text-muted"> <i class="glyphicon glyphicon-time"> </i> <span class="timeline-date">Today</span> - <span class="timeline-time">3:10</span> </small> </p>
                                </div>
                                <div class="timeline-body">
                                    <p>Outdoor visit at California State Route 85 with John Boltana &amp; Harry Piterson regarding to setup a new show room.</p>
                                    <p> <i class="orange fa fa-exclamation"></i> New task added for <span><a href="#" class="info">James Dean</a></span> </p>
                                </div>
                            </div> </li>
                        <li class="timeline-node"> <a class="btn btn-yellow">YESTERDAY</a> </li>
                        <li>
                            <div class="timeline-datetime">
                                <span class="timeline-time"> 8:19 </span>
                                <span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge sky pass-ing">
                                <i class="handle-num passing-content">4</i>
                            </div>
                            <div class="timeline-panel bordered-top-3 bordered-azure">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title"> Bank Report </span>
                                    <p class="timeline-datetime"> <small class="text-muted"> <i class="glyphicon glyphicon-time"> </i> <span class="timeline-date">Yesterday</span> - <span class="timeline-time">8:19</span> </small> </p>
                                </div>
                                <div class="timeline-body">
                                    <p> Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sem neque sed ipsum. </p> Tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
                                </div>
                            </div> </li>
                        <li class="timeline-inverted">
                            <div class="timeline-datetime">
                                <span class="timeline-time"> 6:08 </span>
                                <span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge sky pass">
                                <i class="handle-num pass-content">3</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title"> <a href="">Sergey Azovskiy</a> has commented on your <a href="">status</a> </span>
                                    <p class="timeline-datetime"> <small class="text-muted"> <i class="glyphicon glyphicon-time"> </i> <span class="timeline-date">Yesterday</span> - <span class="timeline-time">6:08</span> </small> </p>
                                </div>
                                <div class="timeline-body">
                                    <p> <i class="orange fa fa-quote-left"></i> Happy Birthday Lydia. </p>
                                </div>
                            </div> </li>
                        <li>
                            <div class="timeline-datetime">
                                <span class="timeline-time"> 7:00 </span>
                                <span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge danger pass">
                                <i class="handle-num pass-content">2</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <span class="timeline-title danger"> Deadline Added </span>
                                    <p class="timeline-datetime"> <small class="text-muted"> <i class="handle-num">2 </i> <span class="timeline-date">Yesterday</span> - <span class="timeline-time">7:00</span> </small> </p>
                                </div>
                                <div class="timeline-body">
                                    <p>Dyvia Phillips added new milestone <span><a class="danger" href="#">UI</a></span> Lorem ipsum dolor sit amet consiquest dio</p>
                                </div>
                            </div> </li>
                        <li class="timeline-inverted">
                            <div class="timeline-datetime">
                                <span class="timeline-time"> 3:09 </span>
                                <span class="timeline-date">Yesterday</span>
                            </div>
                            <div class="timeline-badge pass">
                                <i class="handle-num pass-content">1</i>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-header bordered-bottom bordered-blue">
                                    <p class="timeline-datetime"> <small class="text-muted"> <i class="glyphicon glyphicon-time"> </i> <span class="timeline-date">Yesterday</span> - <span class="timeline-time">3:09</span> </small> </p>
                                </div>
                                <div class="timeline-body">
                                    <a href="#">John Travolta</a> shared an image on
                                    <a href="#">Dribble</a>
                                    <div class="tl-wide text-center" style="padding: 5px; margin-top:10px; margin-bottom: 10px;">
                                    </div>
                                    <i class="text-muted text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</i>
                                </div>
                            </div> </li>
                        <li class="timeline-node"> <a class="btn btn-info">11 DECEMBER</a> </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<!--富文本编辑器-->
<%--  <script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>  --%>
<!--日期插件-->
<script src="${ctx_static }/home/examineApprove/js/handle.js?v-<%=System.currentTimeMillis() %>"></script>
</body>
