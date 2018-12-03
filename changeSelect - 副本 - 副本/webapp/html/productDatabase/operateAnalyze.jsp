<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/dataCenter/css/operateAnalyze.css" rel="stylesheet">

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
                        <div class="btn-group interval pull-left" id="cuttingDimensions">
                            <a href="#" class="btn btn-default active" dimensions="_day">按天</a>
                            <a href="#" class="btn btn-default week-btn" dimensions="_week">按周</a>
                            <a href="#" class="btn btn-default month-btn" dimensions=""_month>按月</a>
                            <a href="#" class="btn btn-default quarter-btn" dimensions="_quarter">按季度</a>
                            <a href="#" class="btn btn-default  year-btn" dimensions="_year">按年</a>
                        </div>
                         <button class="btn btn-lightBlue form-control search-btn pull-left margin-left-10" id="searchButton">
                         	<i class="fa fa-search"></i>搜索
                         </button>
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
                                <select name="branchSchool" class="selectpicker form-control" multiple title="--请选择--" id="branchSchool">
                                   
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label class="control-label pull-left">品牌</label>
                            <div class="col-sm-10 no-padding-right">
                                <select name="brand" class="selectpicker form-control" multiple title="--请选择--" id="brandId">
                                  
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label class="control-label pull-left">项目类型</label>
                            <div class="col-sm-9 no-padding-right">
                                <select name="project-type" class="selectpicker form-control" multiple title="--请选择--" id="projectType">
                                    <option value="1">职业资格</option>
                                    <option value="2">学历</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label class="control-label pull-left">项目</label>
                            <div class="col-sm-10 no-padding-right">
                                <select name="project" class="selectpicker form-control" multiple title="--请选择--" id="projectId">
                                   
                                </select>
                            </div>
                        </div>
                        
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
                            <table class="table table-bordered table-responsive text-center" id="totalTable">
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
                                <!-- <tr>
                                    <td>
                                        <i class="fa collapse-btn fa-plus-square-o"></i>
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
                                </tr> -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-sm-12 table-scrollable campusData">
                            <table class="table table-bordered table-responsive text-center" data-height="100" id="detailedTable">
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
                                <tbody>
                                <!-- <tr>
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
                                </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="operate-data clearfix">
                    <div class="col-sm-12 widget Monthly data0">
                        <div class="widget-header" id="monthly-title">
                            <span class="widget-caption">月度概况</span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="monthlySummary"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget qualifiedCollapse data1" id="qualified-box">
                        <div class="widget-header">
                        <span class="widget-caption">
                            合格面转校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="qualifiedCollapse"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget disqualifiedCollapse">
                        <div class="widget-header">
                        <span class="widget-caption">
                            不合格面转校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="disqualifiedCollapse"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 widget customerPrice data2">
                        <div class="widget-header">
                        <span class="widget-caption">
                            各校区客单价
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="customerPrice"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget phoneCollapse data3">
                        <div class="widget-header">
                            <span class="widget-caption">
                                各校区电转与面转
                            </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="phoneCollapse"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget promotionFee data4">
                        <div class="widget-header">
                            <span class="widget-caption">
                                业绩与推广费比
                            </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="promotionFee"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget qualifiedfebi data5">
                        <div class="widget-header">
                        <span class="widget-caption">
                            合格费比校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="qualifiedFebi"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget unqualifiedFebi">
                        <div class="widget-header">
                        <span class="widget-caption">
                            不合格费比校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="unqualifiedFebi"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget febi1">
                        <div class="widget-header">
                        <span class="widget-caption">
                            费比低于40%的校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="febi1"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget febi2">
                        <div class="widget-header">
                        <span class="widget-caption">
                           费比在40%-60%的校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="febi2"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget febi3">
                        <div class="widget-header">
                        <span class="widget-caption">
                            费比在60%-80%的校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="febi3"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget febi4">
                        <div class="widget-header">
                        <span class="widget-caption">
                            费比大于80%的校区
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="febi4"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 widget inquiriesCosts data6">
                        <div class="widget-header">
                        <span class="widget-caption">
                            咨询量-成本走势图
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="inquiriesCosts"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget brandComparison data7">
                        <div class="widget-header">
                            <span class="widget-caption">
                                各品牌对比
                            </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="brandComparison"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget projectComparison">
                        <div class="widget-header">
                        <span class="widget-caption">
                            各项目对比
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="projectComparison"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget campusComparison">
                        <div class="widget-header">
                        <span class="widget-caption">
                            各校区对比
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="campusComparison"></div>
                        </div>
                    </div>
                    <div class="col-sm-6 widget projectDeeds data8">
                        <div class="widget-header">
                        <span class="widget-caption">
                            各项目业绩
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="projectDeeds"></div>
                        </div>
                    </div>
                    <!-- <div class="col-sm-12 widget performanceScale data9">
                        <div class="widget-header">
                        <span class="widget-caption">
                            各项目业绩占比趋势图
                        </span>
                        </div>
                        <div class="widget-body clearfix form-horizontal">
                            <div class="data-box" id="performanceScale"></div>
                        </div>
                    </div> -->
                </div>
                
                <div class="catalogue">
                    <ul>
                        <li>
                            <a href="#" class="btn-blue collapse-btn">展开<i class="fa fa-angle-down margin-left-5"></i></a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">月度概况</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">各校区面转</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">各校区客单价</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">各校区电转与面转</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">业绩与推广费比</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">各校区费比</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">咨询量-成本走势图</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">咨询量-成本对比</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">各项目业绩</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">各项目业绩占比趋势图</a>
                        </li>
                        <li>
                            <a href="#" class="btn-blue">返回顶部<i class="fa fa-arrow-circle-o-up"></i></a>
                        </li>
                    </ul>
                </div>
<!--图表插件-->
<script src="${ctx_static }/dep/echarts/echarts.js"></script>
<script src="${ctx_static }/dep/echarts/chart/china.js"></script>
<!--下拉框插件-->
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>
<script src="${ctx_static }/home/dataCenter/js/operateAnalyze.js"></script>
