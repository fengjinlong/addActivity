<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/daterangepicker.css">
<link href="${ctx_static }/home/financeCenter/css/branchApply.css" rel="stylesheet">

<!-- Page Body -->
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body clearfix">
                <div class="widget-main">
                    <div class="row_padding form-horizontal clearfix search-condition">
                        <div class="col-sm-12">
                            <div class="form-group col-sm-4">
                                <label class="pull-left control-label">缴费日期</label>
                                <div class="col-sm-9 no-padding-right">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input class="form-control paymentDate" id="paymentDate" name="paymentDate"
                                                   type="text">
                                            <span class="input-group-addon"><i
                                                    class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group col-sm-3">
                                <label class="control-label pull-left">分校</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="branchSchool"
                                            class="form-control branchSchool chosen-select" id="departmentId1"
                                            data-placeholder="--请选择--" tabindex="-1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-3">
                                <label class="control-label pull-left">校区</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="campus" class="form-control campus chosen-select" id="schoolId"
                                            data-placeholder="--请选择--" tabindex="-1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-2 no-padding-right">
                                <label class="control-label pull-left">类型</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="projectType" class="form-control type" id="projectType">
                                    	<option value="">--请选择--</option>
                                        <option value="1">职业资格</option>
                                        <option value="2">学历</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group col-sm-4">
                                <label class="control-label pull-left"
                                       style="margin-left: 25px;">项目</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="project" class="form-control project chosen-select" id="projectId"
                                            data-placeholder="--请选择--" tabindex="-1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-3">
                                <label class="control-label pull-left">级别</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="grade" class="form-control grade chosen-select"  name="projectLevel" id="projectLevel"
                                            data-placeholder="--请选择--" tabindex="-1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-3">
                                <label class="control-label pull-left">品牌</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="brand" class="form-control brand" id="brandId">
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-2">
                                <button type="submit" class="btn increase  search-btn" onclick="javascript:DataTable.init();">
                                	<i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="branchApplyTable">
                                <thead>
                                <tr role="row">
                                    <th>分校</th>
                                    <th>缴费合计</th>
                                    <th>培训/学杂费</th>
                                    <th>考务费</th>
                                    <th>代管/教材费</th>
                                    <th>资料费</th>
                                    <th>教材/协议费</th>
                                    <th>辅导/服务费</th>
                                    <th>现金</th>
                                    <th>刷卡</th>
                                    <th>支票</th>
                                    <th>汇款</th>
                                    <th>汇款-微信</th>
                                    <th>汇款-支付宝</th>
                                    <th>汇款-网络</th>
                                    <th>银行转账</th>
                                    <th>分期</th>
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
<!-- /Page Content -->
</div>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/home/financeCenter/js/branchApply.js"></script>

