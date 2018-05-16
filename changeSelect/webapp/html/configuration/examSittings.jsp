<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/dep/jedate/skin/jedate.css" rel="stylesheet">
<link href="${ctx_static }/home/configuration/css/examSittings.css" rel="stylesheet">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
             <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">考期设置</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="row row_padding form-horizontal">
                        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                            <!-- <div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
                                <input type="text" class="form-control" placeholder="项目" id="searchVal" onkeydown="search();">
                            </div> -->
                            <div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
                               <div class="input-group">
								<input type="text" name="examDate" class="form-control form_datetime examDate" placeholder="考试期次" id='examDates'>
								<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                      		</div>
                            </div>
                            <div class="form-group col-lg-2 col-md-2 col-sm-2 no-margin-right">
                                <select class="form-control" name="status" id="enable">
                                    <option value="">状态</option>
                                    <option value="0">禁用</option>
                                    <option value="1">启用</option>
                                </select>
                            </div>
                            <div class="form-group  pull-left margin-left-15">
                                <a type="button" class="btn increase form-control search-btn"> 
                                	<i class="fa fa-search"></i> 搜索
                                </a>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                            <!-- <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle"
                                        data-toggle="dropdown">导出
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">保存PDF</a></li>
                                    <li><a href="#">导出EXCEL</a></li>
                                    <li><a href="#">导出CSV</a></li>
                                </ul>
                            </div> -->
                            <button class="btn increase pull-right col-sm-4" data-toggle="modal"
                                    data-target=".examinationAdd" data-backdrop="static">
                                <i class="fa fa-plus"></i> 新增</button>
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered dataTable no-footer" id="personnelMatch">
                        <thead>
                        <tr role="row">
                            <th>考期 </th>
                            <th>状态 </th>
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
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade examinationAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="examinationAdd" method="post">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">考试期次<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" name="examDate" class="form-control form_datetime 
                            examDate">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">预计禁用考期时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input class="form-control date-picker disabledDate" type="text" name="disabledDate">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">招生开始时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input class="form-control date-picker endDate" type="text" name="endDate">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">招生结束时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input class="form-control date-picker clearDate" type="text" name="clearDate">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-3 col-sm-offset-3">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade examinationEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="examinationEdit" method="post">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">考试期次<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="hidden" id="updtexamSettingId" name="examSettingId" id="examSettingId" value="">
                            <input type="text" id="updtexamDate" name="examDate" class="form-control form_datetime examDate" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">预计禁用考期时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input name="disabledDate" id="updtdisabledDate" class="form-control date-picker disabledDate" type="text" value="">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">招生开始时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input name = "endDate" id="updtendDate" class="form-control date-picker endDate" type="text" value="">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">招生结束时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input name="clearDate" id="updtclearDate" class="form-control date-picker clearDate" type="text" value="">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-3 col-sm-offset-3">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--日期插件-->
<script src="${ctx_static }/dep/jedate/jquery.jedate.min.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>

<script src="${ctx_static }/home/configuration/js/examSittings.js?v=<%=Math.random() %>"></script>
