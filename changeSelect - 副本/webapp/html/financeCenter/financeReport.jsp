<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/jedate/skin/jedate.css" />
<link href="${ctx_static }/home/financeCenter/css/cooperationDivided.css" rel="stylesheet">

<div class="row page-wrapper">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="widget">
                            <div class="widget-header bordered-bottom bordered-blue">
                                <span class="widget-caption">合作分成</span>
                            </div>
                            <!--Widget Header-->
                            <div class="widget-body">
                                <div class="widget-main">
                                    <div class="row row_padding form-horizontal">
                                        <div class="col-md-10 col-sm-10 col-xs-12">
                                            <div class="form-group col-md-3 col-sm-3 no-margin-right">
                                                <div class="input-group">
                                                    <input id="repotMonth" type="text" class="form-control form_datetime" placeholder="请选择日期">
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-3 col-sm-3 no-margin-right">
                                                <input id="searchVal" class="form-control" placeholder="分校" type="text">
                                            </div>
                                            <div class="form-group col-md-2 col-sm-2 no-margin-right">
                                                <select class="form-control">
                                                    <option value="">状态</option>
                                                    <option value="1">启用</option>
                                                    <option value="0">禁用</option>
                                                </select>
                                            </div>
                                            <div class="pull-left margin-left-10">
                                                <button onclick="search()" type="button" class="btn btn-lightBlue form-control search-btn">
                                                    <i class="fa fa-search"></i> 搜索
                                                </button>
                                            </div>
                                            <div class="pull-left margin-left-10">
                                                <button onclick="aiReport(this)"  type="button" class="btn btn-lightBlue form-control search-btn">
                                                    <i class="fa fa-table"></i> 计算
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-md-2 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
                                            <div class="btn-group pull-right">
                                                <span class="btn btn-default pull-left pointer" title="View print view"><span>打印</span></span>
                                                <div class="btn-group pull-left" style="margin-right:15px;">
                                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出
                                                        <i class="fa fa-angle-up"></i>
                                                    </button>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li><a href="javascript:exportPDF();">导出PDF</a></li>
                                                        <li><a href="javascript:exportExcel();">导出EXCEL</a></li>
                                                        <li><a href="javascript:exportCSV();">导出CSV</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tabbable tabs-left col-sm-12 margin-bottom-20 no-padding">
                                        <ul class="nav nav-tabs">
                                            <li class="active tab-sky">
                                                <a data-toggle="tab"  href="#isPay">
                                                    正酬
                                                </a>
                                            </li>

                                            <li class="tab-sky">
                                                <a data-toggle="tab"  href="#theReward">
                                                    反酬
                                                </a>
                                            </li>

                                            <li class="tab-sky">
                                                <a data-toggle="tab"  href="#otherExpenses">
                                                    其他费用
                                                </a>
                                            </li>
                                        </ul>

                                        <div class="tab-content">
                                            <div id="isPay" class="tab-pane in active">
                                                <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                    <thead>
                                                    <tr>
                                                        <th>业绩合计</th>
                                                        <th>收益费用</th>
                                                        <th>支出费用</th>
                                                        <th>正酬</th>
                                                        <th>分成</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    <tr>
                                                        <td id="sumPerformance">14124706.05</td>
                                                        <td id="inFee">14124706.05</td>
                                                        <td id="outFee">14124706.05</td>
                                                        <td id="justFee">14124706.05</td>
                                                        <td id="schoolFee">14124706.05</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div id="theReward" class="tab-pane">
                                                <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                    <thead>
                                                    <tr>
                                                        <th>退费合计</th>
                                                        <th>反酬</th>
                                                        <th>垫付</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    <tr>
                                                        <td id="returnFee">14124706.05</td>
                                                        <td id="againstFee">14124706.05</td>
                                                        <td id="matFee">14124706.05</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div id="otherExpenses" class="tab-pane">
                                                <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                    <thead>
                                                    <tr>
                                                        <th>罚</th>
                                                        <th>奖</th>
                                                        <th>调整金额</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    <tr>
                                                        <td id="punishFee">14124706.05</td>
                                                        <td id="awardFee">14124706.05</td>
                                                        <td id="adjustmentFee">14124706.05</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dataTables_wrapper form-inline no-footer">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="cooperationDivided">
                                                <thead>
                                                <tr>
                                                    <th>服务合作方</th>
                                                    <th>年月</th>
                                                    <th>业绩合计</th>
                                                    <th>收益费用</th>
                                                    <th>分校分成</th>
                                                    <th>正酬</th>
                                                    <th>退费</th>
                                                    <th>反酬</th>
                                                    <th>垫付</th>
                                                    <th>罚</th>
                                                    <th>奖</th>
                                                    <th>调整金额</th>
                                                    <th>申请人</th>
                                                    <th>申请日期</th>
                                                    <th>申请状态</th>
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
<!-- 查看 -->
<div class="modal fade finance-look" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body  form-horizontal modal_padding">

                <form method="" class="form-horizontal padding-top-20" style="padding:0 20px" id="financeApplyForm" >
					<div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="widget">
                            <div class="widget-body">
                                <div class="widget-main ">
                                    <div class="tabbable">
                                        <ul class="nav nav-tabs tabs-flat">
                                            <li class="active">
                                                <a data-toggle="tab" href="#isPay2">
                                                    正酬
                                                </a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#theReward2">
                                                    反酬
                                                </a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#advance2">
                                                    垫付
                                                </a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#fine2">
                                                    罚款
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content tabs-flat bordered-blue">
                                            <div id="isPay2" class="tab-pane in active">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目类别/项目/分成类别/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="pull-left margin-left-10">
                                                            <button type="button" class="btn btn-lightBlue form-control search-btn">
                                                                <i class="fa fa-search"></i> 搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="table1" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>咨询师</th>
                                                                <th>咨询者类型</th>
                                                                <th>学员姓名</th>
                                                                <th>课程</th>
                                                                <th>报名表编号</th>
                                                                <th>报名日期</th>
                                                                <th>缴费日期</th>
                                                                <th>业绩合计</th>
                                                                <th>收益费用</th>
                                                                <th>支出费用</th>
                                                                <th>正酬</th>
                                                                <th>收益费用系数</th>
                                                                <th>支出费用系数</th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>合计:</td>
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
                                                                <td></td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="theReward2" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                    class="btn btn-blue form-control search-btn">
                                                                搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="table2" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
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
                                                                <th>收益费用
                                                                </th>
                                                                <th>支出费用
                                                                </th>
                                                                <th>扣除支出费用
                                                                </th>
                                                                <th>反酬
                                                                </th>
                                                                <th>收益费用系数
                                                                </th>
                                                                 <th>支出费用系数
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
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="advance2" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                    class="btn btn-blue form-control search-btn">
                                                                搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="table3" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>学员姓名
                                                                </th>
                                                                <th>课程 
                                                                </th>
                                                                <th>报名表编号 
                                                                </th>
                                                                <th>报名日期
                                                                </th>
                                                                <th>缴费金额
                                                                </th>
                                                                <th>考务费
                                                                </th>
                                                                <th>提取支出费财务编号<span
                                                                        class="fa indicator fa-unsorted"></span>
                                                                </th>
                                                                <th>提取支付费日期<span
                                                                        class="fa indicator fa-unsorted"></span>
                                                                </th>
                                                                <th>提取支出费金额<span
                                                                        class="fa indicator fa-unsorted"></span>
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
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="fine2" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="处罚类别">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                    class="btn btn-blue form-control search-btn">
                                                                搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="table4" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
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
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
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
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 申请支出 -->
<div class="modal fade finance-apply" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">申请支出</span>
            </div>
            <div class="modal-body  form-horizontal modal_padding">

                <form method="" class="form-horizontal padding-top-20" style="padding:0 20px" id="financeApplyForm" >
                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请人</label>
                        <div class="col-sm-9">
                            <%-- <input type="text" class="form-control" readonly id="applicantName" value="${user.realName }"> --%>
                            <input type="text" class="form-control" readonly id="applicantName" value="admin">
                            <input type="hidden" class="form-control" id="applicantId"   name="applicantId" value="${user.userId }">
							<input type="hidden" class="form-control" disabled    value="${user.dutyId }">
							<input type="hidden"  id="reportId" name="reportId" >
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请时间</label>
                        <div class="col-sm-9">
                            <div class="controls">
                                <div class="input-group date">
                                    <input type="text" class="form-control date_time" placeholder="当前日期" readonly id="applicantDate"><span
                                        class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    <input hidden name="applicantDate">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-10 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left">金额</label>
                        <div class="col-sm-3 no-padding-left">
                            <input type="text" class="form-control" name="money">
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="paymentFrom">
                                <option value="1">集团支付</option>
                                <option value="2">分校支付</option>
                            </select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="payment">
                                <option value="1">现金</option>
                                <option value="2">汇款</option>
                                <option value="3">支票</option>
                                <option value="4">pos</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  label-text">支出明细</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input type="text" class="form-control" name="expendDetail">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left label-text">发票抬头</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input type="text" class="form-control" name="invoiceTitle">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">部门</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="departmentName1" readonly id="departmentName1">
                            <input hidden name="departmentId1" id="departmentId1">
                        </div>
                    </div>

                    <!-- <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">项目</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="projectId" name="projectId"></select>
                        </div>
                    </div>
 -->
                    <div class="form-group col-lg-10 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" id="pCostclassId" name="pCostclassId"></select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" id="costclassId" name="costclassId"></select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="expendType">
                                <option value="1">营业收入</option>
                                <option value="2">营业外收入</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12" id="distpicker">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  label-text">收款人</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-3 no-padding-left">
                                <select class="form-control" id="payeeId" name="payeeId"></select>
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行" readonly="readonly" id="bankName" name="bankName">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行所在省" readonly="readonly" id="province" name="province">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行所在市" readonly="readonly" id="city" name="city">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  label-text"></label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户人" readonly="readonly" id="accountName" name="accountName">
                                <input type="hidden" name="payeeName" id="payeeName">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="账号" readonly="readonly" id="accountNum" name="accountNum">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="电话" readonly="readonly" id="phone" name="phone">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">调账</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="isAdjustment">
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请地区</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="departmentName2" readonly="readonly"  id="departmentName2">
                            <input hidden name="departmentId2" id="departmentId2">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  label-text">申请说明</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <textarea name="content" class="form-control content" style="width:668px;height:400px;visibility:hidden;"></textarea>
                            <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								k1 = KindEditor.create('textarea[name="content"]',{
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

                    <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-2  col-xs-2  col-sm-offset-4 ">
                            <input type="button" onclick="subApply()"  class="btn btn-primary btn-lg btn-block" value="申请支出"/>
                        </div>
                        <div class="col-sm-2 col-xs-2">
                            <a type="button" class="btn btn-danger btn-lg btn-block" data-dismiss="modal">取消</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
                



<script src="${ctx_static }/home/financeCenter/js/cooperationDivided.js?v=<%=Math.random() %>"></script>
