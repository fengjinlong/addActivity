<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css">
<link href="${ctx_static }/home/financeCenter/css/performanceAdjust.css" rel="stylesheet">
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
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <div class="form-group">
                                <label class="control-label pull-left margin-left-20">日期</label>
                                <div class="col-md-10 col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input type="text" class="form-control duration"
                                                id="reservation"   placeholder="请选择日期"><span
                                                class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <div class="form-group col-md-8 col-sm-8 no-margin-right">
                                <input class="form-control" placeholder="分校" type="text" id="schoolName">
                            </div>
                            <div class="form-group col-sm-2 search">
                                <button type="button" class="btn btn-lightBlue form-control search-btn">
                                	<i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>
                        <c:if test="${!empty sessionScope.xwzx_fxcw_fxjxtz_add }">
                        <div class="col-sm-2">
                            <button class="btn btn-lightBlue pull-right add-btn" data-toggle="modal"
                                    data-target=".adjustmentAdd" data-backdrop="static">
                                <i class="fa fa-plus"></i> 新增
                            </button>
                        </div>
                        </c:if>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <div class="table-scrollable">
                            <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
                                <thead>
                                <tr role="row">
                                    <th>调整模块</th>
                                    <th>分校</th>
                                    <th>调整日期</th>
                                    <th>收/付款方</th>
                                    <th>调整金额</th>
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

<!---新增--->
<div class="modal fade adjustmentAdd in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                    <div class="form-horizontal">
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整模块</label>
                            <div class="col-md-10">
                                <select id='bussinsessType' name="adjustModule" class="form-control adjustModule">
                                    <option value="1">大创业</option>
                                    <option value="2">小创业</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">分校</label>
                            <div class="col-md-10">
                                <select id='branchSchool' name="branchSchool" class="form-control branchSchool chosen-select" data-placeholder="--请选择--" tabindex="1">
                                    <option value="">01北京</option>
                                    <option value="">02上海</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整时间</label>
                            <div class="col-md-10">
                                <div class="input-group">
                                    <input id='adjustmentDate' name="adjustmentDate" class="form-control adjustDate" type="text">
                                    <span class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right payments-text">收款方</label>
                            <div class="col-md-10">
                                <select id="payFrom" name="payFrom" class="form-control">
                                    <option value="1">中和</option>
                                    <option value="2">学慧网</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整金额</label>
                            <div class="col-md-10">
                                <input id='adjustment' name='adjustment' type="number" value="0" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整明细</label>
                            <div class="col-md-10">
                                <textarea id='memo' rows="5" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 col-xs-2 col-sm-offset-4">
                                <button class="btn btn-primary form-control commit">确认</button>
                            </div>
                            <div class="col-sm-2  col-xs-2">
                                <button class="btn btn-danger form-control " data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!---编辑--->
<div class="modal fade adjustmentEdit in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix" id="adjustmentEdit">
                <!-- <form method="" class="form-horizontal" > -->
                <input name="schoolPerformanceAdjustId" type="hidden">
                    <div class="form-horizontal">
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整模块</label>
                            <div class="col-md-10">
                                <select name="adjustModule" class="form-control">
                                    <option value="1">大创业</option>
                                    <option value="2">小创业</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">分校</label>
                            <div class="col-md-10">
                                <select name="branchSchool" class="form-control branchSchool chosen-select" data-placeholder="--请选择--" tabindex="1">
                                    <option value="">01北京</option>
                                    <option value="">02上海</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整时间</label>
                            <div class="col-md-10">
                                <div class="input-group">
                                    <input name="adjustmentDate" class="form-control adjustDate" type="text">
                                    <span class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right payments-text">收款方</label>
                            <div class="col-md-10">
                                <select name="payments" class="form-control">
                                    <option value="1">中和</option>
                                    <option value="2">学慧网</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整金额</label>
                            <div class="col-md-10">
                                <input type="text" name="adjustment" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-2 no-padding-right">调整明细</label>
                            <div class="col-md-10">
                                <textarea rows="5" class="form-control" name="memo"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 col-xs-2 col-sm-offset-4">
                                <button class="btn btn-primary form-control" id="editSubmit1">确认</button>
                            </div>
                            <div class="col-sm-2  col-xs-2">
                                <button class="btn btn-danger form-control " data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
               <!--  </form> -->
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/home/financeCenter/js/performanceAdjust.js"></script>
