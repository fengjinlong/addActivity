<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
 <link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.css">
 <link href="${ctx_static }/home/dataCenter/css/consultAnalyze.css" rel="stylesheet">
 <link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
 <link rel="stylesheet" href="${ctx_static }/dep/assets/css/daterangepicker.css">

<div class="row">
	<div class="col-sm-12">
		<div class="col-sm-12 form-horizontal public-conditions" id="consultInfoForm">
			<div class="form-group col-sm-12 no-padding">
				<label class="control-label pull-left" style="margin-right: 15px">时间</label>
		<div class="btn-group date-btn pull-left">
			<a href="#" class="btn btn-default today-btn active">今天</a> <a
				href="#" class="btn btn-default yesterday-btn">昨天</a> <a
				href="#" class="btn btn-default recent7-btn">最近7天</a> <a
				href="#" class="btn btn-default recent30-btn">最近30天</a>
		</div>
		<div class="col-sm-4" style="width: 29%;">
			<div class="input-group pull-left">
				<input type="text" class="form-control" id="timeQuantum">
				<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
			</div>
		</div>
		<div class="btn-group interval pull-left" id="cycleChoseBtn">
			<a href="#" class="btn btn-default active" cycle="_day">按天</a> <a href="#"
				class="btn btn-default week-btn" cycle="_week" >按周</a> <a href="#"
				class="btn btn-default month-btn" cycle="_month" >按月</a> <a href="#"
				class="btn btn-default quarter-btn" cycle="_quarter" >按季度</a> <a href="#"
				class="btn btn-default  year-btn" cycle="_year" >按年</a>
		</div>
		<div class="pull-left margin-left-10">
	                       <button class="btn btn-lightBlue search-btn form-control" id="searchResultBtn">
	                      	 <i class="fa fa-search"></i>搜索
	                      	</button>
	                   </div>
		<div class="pull-right">
			<label class="control-label blue advanced-filter">高级筛选<i
				class="fa fa-angle-down margin-left-5"></i>
			</label>
		</div>
	</div>
	<div class="col-sm-12 no-padding condition-filtrate">
	  <div class="form-group col-sm-3">
	                       <label class="control-label pull-left" style="width:51px;">归属</label>
	                       <div class="col-sm-8 no-padding-right">
	                           <select name="affiliation" id="companyTypes" multiple  title="--请选择--" class="selectpicker form-control">
	                               <option value="1">集团</option>
	                               <option value="2">分校</option>
	                           </select>
	                       </div>
	                   </div>
		<div class="form-group col-sm-3">
			 <label class="control-label pull-left" style="width:51px;">部门</label>
	                       <div class="col-sm-8 no-padding-right">
				<select name="brand"  id="departmentselect" multiple  title="--请选择--" class="selectpicker form-control">
					<!-- <option value="">总裁办</option>
					<option value="">人力部</option> -->
				</select>
			</div>
		</div>
		<div class="form-group col-sm-3">
		  <label class="control-label pull-left">咨询师姓名</label>
	                       <div class="col-sm-8 no-padding-right">
				<select name="branchSchool" id="sysuserselect"   multiple  title="--请选择--" class="selectpicker form-control">
					<!-- <option value="">杨超</option>
					<option value="">张穗生</option>
					<option value="">赵红叶</option> -->
				</select>
			</div>
		</div>
		
		<div class="form-group col-sm-3">
			<label class="control-label pull-left" style="margin-left: 12px">项目类型</label>
			<div class="col-sm-8 no-padding-right">
				
				<select name="branchSchool"  id="projectType" class="selectpicker form-control"
					multiple title="--请选择--">
					<option value="1">职业资格</option>
					<option value="2">学历</option>
				</select>
			</div>
		</div>
		
	</div>
	<div class="col-sm-12 no-padding condition-filtrate">
	  <div class="form-group col-sm-3">
			<label class="control-label pull-left" style="width:51px;">项目</label>
			<div class="col-sm-8 no-padding-right">
			<select name="project"  id="bizprojectselect" class="selectpicker form-control" multiple title="--请选择--">
					
		    </select>
				
			</div>
		</div>
		<div class="form-group col-sm-3">
			<label class="control-label pull-left"  style="width:51px;">分校</label>
			<div class="col-sm-8 no-padding-right">
				<select name="project-type"  id="fendepartmentselect"  multiple  title="--请选择--" class="selectpicker form-control">
					<!-- <option value="">01北京</option>
					<option value="">02上海</option> -->
				</select>
			</div>
		</div>
		<div class="form-group col-sm-3">
			<label class="control-label pull-left" style="margin-left:12px;">缴费类别</label>
			<div class="col-sm-8 no-padding-right">
				<select name="project" id="moneyType" class="selectpicker form-control"
					multiple title="--请选择--">
					<option value="1">首次缴费</option>
					<option value="2">补费</option>
				</select>
			</div>
		</div>
		<div class="form-group col-sm-3">
			<label class="control-label pull-left" style="margin-left:12px;">缴费形式</label>
				<div class="col-sm-8 no-padding-right">
					<select name="project-type" class="selectpicker form-control"
						multiple title="--请选择--" id="payType">
						
						<option value="1">现金</option>
						<option value="2">刷卡</option>
						<option value="3">支票</option>
						<option value="4">微信</option>
						<option value="5">支付宝</option>
						<option value="6">网络</option>
						<option value="7">银行转账</option>
						<option value="8">分期</option>
					</select>
				</div>
			</div>
		</div>
	    <div class="col-sm-12 no-padding condition-filtrate">
	                    <div class="form-group col-sm-3">
	                        <label class="control-label pull-left">在职情况</label>
	                        <div class="col-sm-8 no-padding-right">
	                            <div class="radio-inline">
	                                <label>
	                                    <input value="1" class="colored-success" name="mustPay" type="radio" checked>
	                                    <span class="text">在职</span>
	                                </label>
	                            </div>
	                            <div class="radio-inline">
	                                <label>
	                                    <input value="2" class="colored-success" name="mustPay" type="radio">
	                                    <span class="text">离职</span>
	                                </label>
	                            </div>
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
	                        <table class="table table-bordered table-responsive text-center">
	                            <thead>
	                            <tr>
	                                <th class="text-center"></th>
	                                <th class="text-center">咨询量</th>
	                                <th class="text-center">业绩合计</th>
	                                <th class="text-center">上门</th>
	                                <th class="text-center">报名</th>
	                                <th class="text-center">电转</th>
	                                <th class="text-center">面转</th>
	                                <th class="text-center">广告费</th>
	                                <th class="text-center">成本</th>
	                                <th class="text-center">费比</th>
	                            </tr>
	                            </thead>
	                            <tbody>
	                            <tr id="totalConsultInfo">
	                                <td>
	                                    <i class="fa collapse-btn fa-plus-square-o"></i>
	                                </td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
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
	                    <div class="col-sm-12 table-scrollable campusData">
	                        <table id="consultorInfoTable" class="table table-bordered table-responsive text-center" data-height="100">
	                            <thead>
	                            <tr>
	                                <th class="text-center">咨询师</th>
	                                <th class="text-center">咨询量</th>
	                                <th class="text-center">业绩合计</th>
	                                <th class="text-center">上门</th>
	                                <th class="text-center">报名</th>
	                                <th class="text-center">电转</th>
	                                <th class="text-center">面转</th>
	                                <th class="text-center">广告费</th>
	                                <th class="text-center">成本</th>
	                                <th class="text-center">费比</th>
	                            </tr>
	                            </thead>
	                            <tbody>
	                           <!--  <tr>
	                               <td class="consultant">
	                                   王大伟
	                               </td>
	                               <td>178888</td>
	                               <td>26964945</td>
	                               <td>13567</td>
	                               <td>8632</td>
	                               <td>12%</td>
	                               <td>50%</td>
	                               <td>10902534</td>
	                               <td>93</td>
	                               <td>40%</td>
	                           </tr>
	                           <tr>
	                               <td class="consultant">
	                                   王大伟
	                               </td>
	                               <td>178888</td>
	                               <td>26964945</td>
	                               <td>13567</td>
	                               <td>8632</td>
	                               <td>12%</td>
	                               <td>50%</td>
	                               <td>10902534</td>
	                               <td>93</td>
	                               <td>40%</td>
	                           </tr>
	                           <tr>
	                               <td class="consultant">
	                                   王大伟
	                               </td>
	                               <td>178888</td>
	                               <td>26964945</td>
	                               <td>13567</td>
	                               <td>8632</td>
	                               <td>12%</td>
	                               <td>50%</td>
	                               <td>10902534</td>
	                               <td>93</td>
	                               <td>40%</td>
	                           </tr> -->
	                            </tbody>
	                        </table>
	                    </div>
	                </div>
	            </div>
	
	
	<div class="operate-data">
		<div class="col-sm-4 widget groupDeeds data0">
			<div class="widget-header">
				<span class="widget-caption">各组业绩</span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="groupDeeds"></div>
			</div>
		</div>
		<div class="col-sm-8 widget counselorDeeds data1">
			<div class="widget-header">
				<span class="widget-caption"> 业绩转化率关系表 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="counselorDeeds"></div>
			</div>
		</div>
		<div class="col-sm-4 widget teamDeeds data2">
			<div class="widget-header">
				<span class="widget-caption"> 咨询团队业绩占比 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="teamDeeds"></div>
			</div>
		</div>
		<div class="col-sm-4 widget deedsCollapse data3">
			<div class="widget-header">
				<span class="widget-caption"> 业绩-面转趋势图 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="deedsCollapse"></div>
			</div>
		</div>
		<div class="col-sm-4 widget deedsCost">
			<div class="widget-header">
				<span class="widget-caption"> 业绩-成本趋势图 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="deedsCost"></div>
			</div>
		</div>
		<div class="col-sm-4 widget deedsInput">
			<div class="widget-header">
				<span class="widget-caption"> 业绩-投入产出趋势图 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="deedsInput"></div>
			</div>
		</div>
		<div class="col-sm-4 widget deedsInquiries">
			<div class="widget-header">
				<span class="widget-caption"> 业绩-咨询量趋势图 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="deedsInquiries"></div>
			</div>
		</div>
		<div class="col-sm-4 widget deedsLossRatio">
			<div class="widget-header">
				<span class="widget-caption"> 业绩-损耗比趋势图 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="deedsLossRatio"></div>
			</div>
		</div>
		<div class="col-sm-4 widget counselorDeeds1">
			<div class="widget-header">
				<span class="widget-caption"> 咨询师业绩排名 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="counselorDeeds1"></div>
			</div>
		</div>
		<div class="col-sm-8 widget counselorDeeds2 data4">
			<div class="widget-header">
				<span class="widget-caption"> 咨询师业绩与转化率关系表 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="counselorDeeds2"></div>
			</div>
		</div>
		<div class="col-sm-4 widget projectDeeds">
			<div class="widget-header">
				<span class="widget-caption"> 各项目业绩排名 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="projectDeeds"></div>
			</div>
		</div>
		<div class="col-sm-8 widget projectDeeds1 data5">
			<div class="widget-header">
				<span class="widget-caption"> 各项目业绩 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="projectDeeds1"></div>
			</div>
		</div>
		<div class="col-sm-12 widget counselorDeeds3 data6">
			<div class="widget-header">
				<span class="widget-caption"> 各项目组分时间段业绩及转化率情况 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="counselorDeeds3"></div>
			</div>
		</div>
		<div class="col-sm-6 widget teamPhone data7">
			<div class="widget-header">
				<span class="widget-caption"> 咨询团队电转排名 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="teamPhone"></div>
			</div>
		</div>
		<div class="col-sm-6 widget no-padding-right teamComparison">
			<div class="widget-header">
				<span class="widget-caption"> 销售团队数据对比 </span>
			</div>
			<div class="widget-body clearfix">
				<div class="col-sm-12 table-scrollable">
					<table class="table table-bordered table-responsive text-center">
						<thead>
							<tr>
								<th class="text-center">团队名称</th>
								<th class="text-center">业绩合计</th>
								<%--
							<th class="text-center">推广费比</th>
							 --%>
							<th class="text-center">人均业绩</th>
							<th class="text-center">团队人数</th>
							<th class="text-center">人均咨询量</th>
						</tr>
					</thead>
					<tbody id="salesDetailTableInfo">
						<%--
						<tr>
							<td>郑州团队</td>
							<td>9649045</td>
							<td>45%</td>
							<td>86320</td>
							<td>48</td>
							<td>321</td>
						</tr>
						--%>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-sm-6 widget qualifiedCollapse data8">
			<div class="widget-header">
				<span class="widget-caption"> 合格面转校区 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="qualifiedCollapse"></div>
			</div>
		</div>
		<div class="col-sm-6 widget disqualificationCollapse">
			<div class="widget-header">
				<span class="widget-caption"> 不合格面转校区 </span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="disqualificationCollapse"></div>
			</div>
		</div>
	</div>
	
	<!--右侧目录-->
	<div class="catalogue">
		<ul>
			<li><a href="#" class="btn-blue collapse-btn">展开<i
					class="fa fa-angle-down margin-left-5"></i></a></li>
			<li><a href="#" class="btn-blue">各组业绩</a></li>
			<li><a href="#" class="btn-blue">业绩转化率关系表</a></li>
			<li><a href="#" class="btn-blue">咨询团队业绩占比</a></li>
			<li><a href="#" class="btn-blue">业绩对比</a></li>
			<li><a href="#" class="btn-blue">咨询师业绩与转化率关系表</a></li>
			<li><a href="#" class="btn-blue">各项目业绩</a></li>
	
			<li><a href="#" class="btn-blue">各项目组分时间段业绩及转化率</a></li>
			<li><a href="#" class="btn-blue">咨询团队电转排名</a></li>
			<li><a href="#" class="btn-blue">各校区面转</a></li>
			<li><a href="#" class="btn-blue">返回顶部<i class="fa fa-arrow-circle-o-up"></i></a></li>
		</ul>
	</div>
	</div>
</div>


<!--咨询师详情-->
<div class="modal fade consultantDetails" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">咨询师详情</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="consultantDetails">
                    <div class="col-sm-12 table-scrollable">
                        <table id="consultorDepartmentDetail" class="table table-bordered table-responsive text-center" data-height="100">
                            <thead>
                            <tr>
                                <th class="text-center">咨询师名称</th>
                                <th class="text-center">分校</th>
                                <th class="text-center">咨询量</th>
                                <th class="text-center">业绩合计</th>
                                <th class="text-center">上门</th>
                                <th class="text-center">报名</th>
                                <th class="text-center">电转</th>
                                <th class="text-center">面转</th>
                                <th class="text-center">广告费</th>
                                <th class="text-center">成本</th>
                                <th class="text-center">费比</th>
                            </tr>
                            </thead>
                            <tbody>
                            <!-- <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr>
                            <tr>
                                <td>
                                    王大伟
                                </td>
                                <td>
                                    040陕西-西安
                                </td>
                                <td>178888</td>
                                <td>26964945</td>
                                <td>13567</td>
                                <td>8632</td>
                                <td>12%</td>
                                <td>50%</td>
                                <td>10902534</td>
                                <td>93</td>
                                <td>40%</td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
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

<script src="${ctx_static }/home/dataCenter/js/consultAnalyze_chart2.js"></script>
<script src="${ctx_static }/home/dataCenter/js/consultAnalyze_chart.js"></script>
<script src="${ctx_static }/home/dataCenter/js/consultAnalyze_query.js"></script>
<script src="${ctx_static }/home/dataCenter/js/consultAnalyze.js"></script>

