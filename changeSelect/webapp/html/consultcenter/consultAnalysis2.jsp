<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<!DOCTYPE html>

	<link rel="stylesheet" href="${ctx_static }/home/reportCenter/css/consultAnalyze.css">
	
	<script src="${ctx_static }/dep/assets/js/skins.js"></script>
<div class="page-body clearfix">
	<div class="col-sm-12 form-horizontal public-conditions">
		<div class="form-group col-sm-12">
			<label class="control-label pull-left" style="margin-right: 15px">时间</label>
			<div class="btn-group date-btn pull-left">
				<a href="#" class="btn btn-default today-btn active">今天</a>
				<a href="#" class="btn btn-default yesterday-btn">昨天</a>
				<a href="#" class="btn btn-default recent7-btn">最近7天</a>
				<a href="#" class="btn btn-default recent30-btn">最近30天</a>
			</div>
			<div class="col-sm-4" style="width: 29%;">
				<div class="input-group pull-left">
					<input type="text" class="form-control" id="timeQuantum">
					<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
				</div>
			</div>
			<div class="btn-group interval pull-left">
				<a href="#" class="btn btn-default active">按天</a>
				<a href="#" class="btn btn-default week-btn">按周</a>
				<a href="#" class="btn btn-default month-btn">按月</a>
				<a href="#" class="btn btn-default quarter-btn">按季度</a>
				<a href="#" class="btn btn-default  year-btn">按年</a>
			</div>
			<div class="form-group col-sm-3">
				<button class="btn btn-info search-btn" style="width: 90px;">搜索</button>
			</div>
			<div class="pull-right">
				<label class="control-label blue advanced-filter">高级筛选<i class="fa fa-angle-down margin-left-5"></i></label>
			</div>
		</div>
		<form id="selectForm">
			<input name="sele" id="sele" type="hidden" value="2">
			<input name="queryType" id="queryType" type="hidden" value="2">
			<div class="col-sm-12 no-padding condition-filtrate">
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">咨询师所属公司</label>
					<div class="col-sm-8 no-padding-right">
						<select name="companyId" id="companyId" class="affiliation form-control">
						</select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">咨询师所属部门</label>
					<div class="col-sm-8 no-padding-right">
						<select name="departmentIds" id="departmentIds"  class="selectpicker form-control" multiple title="--请选择--">
							
						</select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">咨询师</label>
					<div class="col-sm-8 no-padding-right">
						<select name="userIds" id="userIds" class="selectpicker form-control counselorName" multiple
						        title="--请选择--">
					
						</select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">咨询量归属</label>
					<div class="col-sm-8 no-padding-right">
						<select name="departmentId1s" id="departmentId1s" class="selectpicker form-control" multiple title="--请选择--">
							
						</select>
					</div>
				</div>
			</div>
			<div class="col-sm-12 no-padding condition-filtrate">
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">产品模型</label>
					<div class="col-sm-8 no-padding-right">
						<select name="productModelId" id="productModelId" class="form-control">
						</select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">产品名称</label>
					<div class="col-sm-8 no-padding-right">
						<select name="productIds" id="productIds" class="selectpicker form-control" multiple title="--请选择--">
						</select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">缴费类别</label>
					<div class="col-sm-8 no-padding-right">
						<select name="jiaofeiType"  class="selectpicker form-control" >
							<option value="1">首次缴费</option>
							<option value="2">补费</option>
						</select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="control-label pull-left" style="width:100px;">缴费形式</label>
					<div class="col-sm-8 no-padding-right">
						<select name="jiaofei" class="selectpicker form-control" multiple title="--请选择--">
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
					<label class="control-label pull-left" style="width:100px;">在职情况</label>
					<div class="col-sm-8 no-padding-right">
						<div class="radio-inline">
							<label>
								<input value="1" class="colored-success" name="zaizhi" type="radio" checked="">
								<span class="text">在职</span>
							</label>
						</div>
						<div class="radio-inline">
							<label>
								<input value="2" class="colored-success" name="zaizhi" type="radio" checked="">
								<span class="text">离职</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="col-sm-12 widget no-padding-right aggregate-data">
		<div class="widget-header">
                     <span class="widget-caption">
                         总数据量
                     </span>
		</div>
		<div class="widget-body clearfix">
			<div class="col-sm-12 table-scrollable totalData">
				<table  class="table table-bordered table-responsive text-center">
					<thead>
					<tr>
						<th></th>
						<th class="text-center">咨询量</th>
						<th class="text-center">业绩合计</th>
						<th class="text-center">收益费用</th>
						<th class="text-center">支出费用</th>
						<th class="text-center">预约</th>
						<th class="text-center">上门</th>
						<th class="text-center">报名</th>
						<th class="text-center">预约比</th>
						<th class="text-center">电转</th>
						<th class="text-center">面转</th>
						<th class="text-center">广告费</th>
						<th class="text-center">成本</th>
						<th class="text-center">费比</th>
					</tr>
					</thead>
					<tbody id="tbody1">
					<tr>
						
					</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-12 table-scrollable campusData">
				<table id="table2" class="table table-bordered table-responsive text-center" data-height="100">
					<thead>
					<tr>
						<th class="text-center">创建人</th>
						<th class="text-center">咨询量</th>
						<th class="text-center">业绩合计</th>
						<th class="text-center">收益费用</th>
						<th class="text-center">支出费用</th>
						<th class="text-center">预约</th>
						<th class="text-center">上门</th>
						<th class="text-center">报名</th>
						<th class="text-center">预约比</th>
						<th class="text-center">电转</th>
						<th class="text-center">面转</th>
						<th class="text-center">广告费</th>
						<th class="text-center">成本</th>
						<th class="text-center">费比</th>
					</tr>
					</thead>
					<tbody id="tbody2">
					
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<div class="operate-data">
		<div class="col-sm-12 widget groupDeeds">
			<div class="widget-header">
				<span class="widget-caption">各组业绩</span>
			</div>
			<div class="widget-body clearfix form-horizontal">
				<div class="data-box" id="groupDeeds"></div>
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>


<!--图表插件-->
<script src="${ctx_static }/dep/echarts/echarts.js"></script>
<script src="${ctx_static }/home/reportCenter/js/consultAnalyze.js?v=<%=Math.random() %>"></script>
</body>
</html>
