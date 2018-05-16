<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.css">
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link rel="stylesheet" href="${ctx_static }/home/dataCenter/css/mainData.css">

<div class="col-sm-12 form-horizontal public-conditions">
    <div class="form-group col-sm-12 no-padding-right">
        <label class="control-label pull-left" style="margin-right: 15px">时间</label>
        <div class="btn-group date-btn pull-left">
            <a href="#" class="btn btn-default today-btn active">今天</a>
            <a href="#" class="btn btn-default yesterday-btn">昨天</a>
            <a href="#" class="btn btn-default recent7-btn">最近7天</a>
            <a href="#" class="btn btn-default recent30-btn">最近30天</a>
        </div>
        <div class="col-sm-4" style="width: 28%;">
            <div class="input-group pull-left">
                <input type="text" class="form-control" id="timeQuantum">
                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
            </div>
        </div>
        <div class="btn-group interval pull-left" id="cycleChoseBtn">
            <a href="#" class="btn btn-default day-btn active" cycle="_day">按天</a>
            <a href="#" class="btn btn-default week-btn" cycle="_week">按周</a>
            <a href="#" class="btn btn-default month-btn" cycle="_month">按月</a>
            <a href="#" class="btn btn-default quarter-btn" cycle="_quarter">按季度</a>
            <a href="#" class="btn btn-default year-btn" cycle="_year">按年</a>
        </div>
         <div class="pull-left margin-left-10">
        	<button type="button" id="querySummaryBtn" class="btn btn-lightBlue form-control search-btn">
        		<i class="fa fa-search"></i>搜索
        	</button>
        </div>
        <div class="pull-right">
            <label class="control-label blue advanced-filter">
                	高级筛选<i class="fa fa-angle-down margin-left-5"></i>
            </label>
        </div>
    </div>
    <div class="col-sm-12 no-padding condition-filtrate">
        <div class="form-group col-sm-3">
            <label class="control-label pull-left">分校</label>
            <div class="col-sm-10 no-padding-right">
                <select name="branchSchool" class="selectpicker form-control" multiple title="--请选择--" id="fenXiaoList">
                	<c:forEach items="${fenxiaoList }" var="item">
                		<option value="${item.departmentId }">${item.fullName }</option>
                	</c:forEach>
                </select>
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="control-label pull-left">品牌</label>
            <div class="col-sm-10 no-padding-right">
                <select name="brand" class="selectpicker form-control" multiple title="--请选择--" id="brandList">
                	<c:forEach items="${brandList }" var="item">
                		<option value="${item.brandId }">${item.brandName }</option>
                	</c:forEach>
                </select>
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="control-label pull-left">项目</label>
            <div class="col-sm-10 no-padding-right">
                <select name="project" class="selectpicker form-control" multiple title="--请选择--" id="projectList">
                    <c:forEach items="${projectList }" var="item">
                    	<option value="${item.projectId }">${item.fullName }</option>
                    </c:forEach>
                </select>
            </div>
        </div>
        <%-- 
        <div class="form-group col-sm-3">
            <label class="control-label pull-left">项目类型</label>
            <div class="col-sm-9 no-padding-right">
                <select name="project-type" class="selectpicker form-control" multiple title="--请选择--">
                    <option value="1">职业资格</option>
                    <option value="2">学历</option>
                </select>
            </div>
        </div>
        --%>
       
    </div>
</div>
<div class="col-sm-12 widget no-padding-right aggregate-data">
    <div class="widget-header">
        <span class="widget-caption">
            总数据量
        </span>
    </div>
    <div class="widget-body clearfix">
        <div class="col-sm-12 table-scrollable totalData">
            <table class="table table-bordered table-responsive text-center">
                <thead>
                <tr>
                    <th class="text-center"></th>
                    <th class="text-center">广告费</th>
                    <th class="text-center">咨询量</th>
                    <th class="text-center">成本</th>
                    <th class="text-center">业绩合计</th>
                    <th class="text-center">费比</th>
                    <th class="text-center">补费</th>
                    <th class="text-center">集团收入</th>
                    <th class="text-center">上门</th>
                    <th class="text-center">报名</th>
                    <th class="text-center">电转</th>
                    <th class="text-center">面转</th>
                    <th class="text-center">总转</th>
                    <th class="text-center">客单价</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <i class="fa collapse-btn fa-plus-square-o" id="queryDetailBtn"></i>
                    </td>
                    <td sum_adsFee>-</td>
                    <td sum_consultCount>-</td>
                    <td sum_primeCost>-</td>
                    <td sum_achievementAmount>-</td>
                    <td sum_feePercent>-%</td>
                    <td sum_compensationFee>-</td>
                    <td sum_groupRevenue>-</td>
                    <td sum_visitCount>-</td>
                    <td sum_enlistCount>-</td>
                    <td sum_dianZhuan>-%</td>
                    <td sum_mianZhuan>-%</td>
                    <td sum_zongZhuan>-%</td>
                    <td sum_perTicket>-</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-12 table-scrollable campusData">
            <table class="table table-bordered table-responsive table-fixed-header text-center" data-height="100" id="branchSchoolData">
                <thead>
                <tr>
                    <th class="text-center">校区</th>
                    <th class="text-center">广告费</th>
                    <th class="text-center">咨询量</th>
                    <th class="text-center">成本</th>
                    <th class="text-center">业绩合计</th>
                    <th class="text-center">费比</th>
                    <th class="text-center">补费</th>
                    <th class="text-center">集团收入</th>
                    <th class="text-center">上门</th>
                    <th class="text-center">报名</th>
                    <th class="text-center">电转</th>
                    <th class="text-center">面转</th>
                    <th class="text-center">总转</th>
                    <th class="text-center">客单价</th>
                </tr>
                </thead>
                <tbody id="fenxiaoDetailCon">
                <%-- 
                <tr>
                    <td>
                        0401陕西-西安
                    </td>
                    <td>1788878</td>
                    <td>26649</td>
                    <td>87</td>
                    <td>4756789</td>
                    <td>42%</td>
                    <td>937881</td>
                    <td>5090234</td>
                    <td>1988</td>
                    <td>1432</td>
                    <td>10%</td>
                    <td>40%</td>
                    <td>74%</td>
                    <td>2590</td>
                </tr>
                --%>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div class="operate-data">
    <div class="col-sm-6 widget summaryData1">
        <div class="widget-header">
            <span class="widget-caption"></span>
        </div>
        <div class="widget-body clearfix form-horizontal">
            <div class="comparison clearfix">
                <div class="pull-left">
                    <label class="control-label pull-left">维度</label>
                    <div class="pull-left comparison-item">
                        <select name="dimensionality" class="form-control dimensionality chosen-select"
                                data-placeholder="--请选择--" tabindex="1" chartLoadSelect="1">
                            <option value="adsFee">广告费</option>
                            <option value="consultCount">咨询量</option>
                            <option value="primeCost">成本</option>
                            <option value="achievementAmount" selected>业绩合计</option>
                            <option value="feePercent">费比</option>
                            <option value="compensationFee">补费</option>
                            <option value="groupRevenue">集团收入</option>
                            <option value="visitCount">上门</option>
                            <option value="enlistCount">报名</option>
                            <option value="dianZhuan">电转</option>
                            <option value="mianZhuan">面转</option>
                            <option value="zongZhuan">总转</option>
                            <option value="perTicket">客单价</option>
                        </select>
                    </div>
                </div>
                <div class="pull-right">
                    <span class="current-dimension"></span>
                    <span class="dimensionTotals">48</span>
                    <span class="reduced-value up">+20%</span>
                </div>
            </div>
            <div class="data-box" id="summaryData1"></div>
        </div>
    </div>
    <div class="col-sm-6 widget summaryData2 no-padding-right">
        <div class="widget-header">
            <span class="widget-caption"></span>
        </div>
        <div class="widget-body clearfix form-horizontal">
            <div class="comparison clearfix">
                <div class="pull-left">
                    <label class="control-label pull-left">维度</label>
                    <div class="pull-left comparison-item">
                        <select name="dimensionality" class="form-control dimensionality chosen-select"
                                data-placeholder="--请选择--" tabindex="1" chartLoadSelect="2">
                            <option value="adsFee">广告费</option>
                            <option value="consultCount">咨询量</option>
                            <option value="primeCost">成本</option>
                            <option value="achievementAmount">业绩合计</option>
                            <option value="feePercent" selected>费比</option>
                            <option value="compensationFee">补费</option>
                            <option value="groupRevenue">集团收入</option>
                            <option value="visitCount">上门</option>
                            <option value="enlistCount">报名</option>
                            <option value="dianZhuan">电转</option>
                            <option value="mianZhuan">面转</option>
                            <option value="zongZhuan">总转</option>
                            <option value="perTicket">客单价</option>
                        </select>
                    </div>
                </div>
                <div class="pull-right">
                    <span class="current-dimension"></span>
                    <span class="dimensionTotals">48</span>
                    <span class="reduced-value up">+20%</span>
                </div>
            </div>
            <div class="data-box" id="summaryData2"></div>
        </div>
    </div>
    <div class="col-sm-6 widget summaryData3">
        <div class="widget-header">
            <span class="widget-caption"></span>
        </div>
        <div class="widget-body clearfix form-horizontal">
            <div class="comparison clearfix">
                <div class="pull-left">
                    <label class="control-label pull-left">维度</label>
                    <div class="pull-left comparison-item">
                        <select name="dimensionality" class="form-control dimensionality chosen-select"
                                data-placeholder="--请选择--" tabindex="1" chartLoadSelect="3">
                            <option value="adsFee">广告费</option>
                            <option value="consultCount">咨询量</option>
                            <option value="primeCost">成本</option>
                            <option value="achievementAmount">业绩合计</option>
                            <option value="feePercent">费比</option>
                            <option value="compensationFee">补费</option>
                            <option value="groupRevenue">集团收入</option>
                            <option value="visitCount">上门</option>
                            <option value="enlistCount">报名</option>
                            <option value="dianZhuan" selected>电转</option>
                            <option value="mianZhuan">面转</option>
                            <option value="zongZhuan">总转</option>
                            <option value="perTicket">客单价</option>
                        </select>
                    </div>
                </div>
                <div class="pull-right">
                    <span class="current-dimension"></span>
                    <span class="dimensionTotals">48</span>
                    <span class="reduced-value up">+20%</span>
                </div>
            </div>
            <div class="data-box" id="summaryData3"></div>
        </div>
    </div>
    <div class="col-sm-6 widget summaryData4 no-padding-right">
        <div class="widget-header">
            <span class="widget-caption"></span>
        </div>
        <div class="widget-body clearfix form-horizontal">
            <div class="comparison clearfix">
                <div class="pull-left">
                    <label class="control-label pull-left">维度</label>
                    <div class="pull-left comparison-item">
                        <select name="dimensionality" class="form-control dimensionality chosen-select"
                                data-placeholder="--请选择--" tabindex="1" chartLoadSelect="4">
                            <option value="adsFee">广告费</option>
                            <option value="consultCount">咨询量</option>
                            <option value="primeCost">成本</option>
                            <option value="achievementAmount">业绩合计</option>
                            <option value="feePercent">费比</option>
                            <option value="compensationFee">补费</option>
                            <option value="groupRevenue">集团收入</option>
                            <option value="visitCount">上门</option>
                            <option value="enlistCount">报名</option>
                            <option value="dianZhuan">电转</option>
                            <option value="mianZhuan" selected>面转</option>
                            <option value="zongZhuan">总转</option>
                            <option value="perTicket">客单价</option>
                        </select>
                    </div>
                </div>
                <div class="pull-right">
                    <span class="current-dimension"></span>
                    <span class="dimensionTotals">48</span>
                    <span class="reduced-value up">+20%</span>
                </div>
            </div>
            <div class="data-box" id="summaryData4"></div>
        </div>
    </div>
</div>


<!--图表插件-->
<script src="${ctx_static }/dep/echarts/echarts.js"></script>
<script src="${ctx_static }/dep/echarts/chart/china.js"></script>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>


<script src="${ctx_static }/home/dataCenter/js/mainData.js"></script>
<script src="${ctx_static }/home/dataCenter/js/mainData_query.js"></script>
<script src="${ctx_static }/home/dataCenter/js/mainData_chart.js"></script>
