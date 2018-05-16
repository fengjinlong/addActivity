<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12">
                <div class="widget">
                    <div class="widget-header">
                        <div class="widget-buttons">
                            <a href="#" data-toggle="maximize">
                                <i class="fa fa-expand"></i>
                            </a>
                            <a href="#" data-toggle="collapse">
                                <i class="fa fa-minus"></i>
                            </a>
                            <a href="#" data-toggle="dispose">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                        <!--Widget Buttons-->
                    </div>
                    <!--Widget Header-->
                    <div class="widget-body">
                        <div class="widget-main ">
                            <div class="tabbable">
                                <ul class="nav nav-tabs tabs-flat">
                                    <li class="active">
                                        <a data-toggle="tab" href="#notice">
                                            公告
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#shengfen">
                                            奖赏
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#city">
                                            惩罚
                                        </a>
                                    </li>
                                </ul>
                                <div class="tab-content tabs-flat">
                                    <div id="notice" class="tab-pane in active">
                                        <table id="table1" class="table table-bordered">
                                            <thead>
                                                <tr>
                                                <th>主题</th>
                                                <th>发布人</th>
                                                <th>发布日期</th>
                                                <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="shengfen" class="tab-pane">
                                        <div class="row row_padding form-horizontal">
                                            <div class="col-md-3 col-sm-3 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-lg-2 col-md-3 col-sm-3 control-label no-padding-right">日期</label>
                                                    <div class="col-lg-10 col-md-9 col-sm-9">
                                                        <div class="controls">
                                                            <div class="input-group date">
                                                                <input type="text" class="form-control duration"
                                                                       id="date2">
                                                    <span class="input-group-addon"><i
                                                            class="fa fa-calendar"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <div class="form-group col-md-6 col-sm-4 no-margin-right">
                                                    <input type="text" id="searchVal1" name="searchVal" class="form-control"
                                                           placeholder="归属部门/奖赏类型/受奖人" onkeydown="search1();">
                                                </div>
                                                <div class="form-group col-lg-2 col-md-3 col-sm-4">
                                                    <button type="button" onclick="load2()"
                                                            class="btn btn-blue form-control search-btn">
                                                        搜索
                                                    </button>

                                                </div>
                                            </div>


                                            <!-- <div class="col-md-3 col-sm-3 col-xs-12">
                                                <div class="pull-right margin-right-40">
                                                    <div class="btn-group">
                                                        <span class="btn btn-default pointer"
                                                              title="View print view"><span>打印</span></span>
                                                        <button type="button"
                                                                class="btn btn-default dropdown-toggle"
                                                                data-toggle="dropdown">
                                                            导出
                                                            <i class="fa fa-angle-up"></i>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li><a href="#">保存PDF</a></li>
                                                            <li><a href="#">导出EXCEL</a></li>
                                                            <li><a href="#">导出CSV</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> -->
                                        </div>
                                        <div class="dataTables_wrapper form-inline no-footer">
                                            <table id="table2" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                <thead>
                                                <tr role="row">
                                                    <th>归属分校</th>
                                                    <th>归属部门</th>
                                                    <th>奖励类别</th>
                                                    <th>事件日期</th>
                                                    <th>提交日期 </th>
                                                   <!--  <th>处理日期 <span
                                                            class="fa indicator fa-unsorted"></span>
                                                    </th> -->
                                                    <th>受奖人</th>
                                                    <th>奖励金额/元 </th>
                                                    <th>生效日期 </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                
                                                </tbody>
                                            </table>
                                        </div>


                                    </div>
                                    <div id="city" class="tab-pane">
                                        <div class="row row_padding form-horizontal">
                                            <div class="col-md-3 col-sm-3 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-lg-2 col-md-3 col-sm-3 control-label no-padding-right">日期</label>
                                                    <div class="col-lg-10 col-md-9 col-sm-9">
                                                        <div class="controls">
                                                            <div class="input-group date">
                                                                <input type="text" id="date3" class="form-control duration"
                                                                      >
                                                    <span class="input-group-addon"><i
                                                            class="fa fa-calendar"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <div class="form-group col-md-6 col-sm-4 no-margin-right">
                                                    <input type="text" id="searchVal2" name="searchVal" class="form-control"
                                                           placeholder="归属部门/奖赏类型/受奖人" onkeydown="search2();">
                                                </div>
                                                <div class="form-group col-lg-2 col-md-3 col-sm-4">
                                                    <button type="button" onclick="load3()"
                                                            class="btn btn-blue form-control search-btn">
                                                        搜索
                                                    </button>

                                                </div>
                                            </div>


                                            <!-- <div class="col-md-3 col-sm-3 col-xs-12 btn-group text-align-center">
                                                <div class="pull-right margin-right-40">
                                                    <div class="btn-group">
                                                        <span class="btn btn-default pointer"
                                                              title="View print view"><span>打印</span></span>
                                                        <button type="button"
                                                                class="btn btn-default dropdown-toggle"
                                                                data-toggle="dropdown">
                                                            导出
                                                            <i class="fa fa-angle-up"></i>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li><a href="#">保存PDF</a></li>
                                                            <li><a href="#">导出EXCEL</a></li>
                                                            <li><a href="#">导出CSV</a></li>
                                                        </ul>
                                                    </div>
                                                </div>


                                            </div> -->
                                        </div>

                                        <table id="table3" class="table table-striped table-hover table-bordered dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th>归属分校 </th>
                                                <th>归属部门</th>
                                                <th>处罚类别 </th>
                                                <th>事件日期 </th>
                                                <th>提交日期 </th>
                                                <th>处理日期</th>
                                                <th>违规人</th>
                                                <th>处罚金额/元</th>
                                                <th>生效日期</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--Widget-->
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--公告详情-->
<div class="modal fade notice-detail in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">电子公告</span>
            </div>
            <div class="modal-body">
                <div class="well well-lg">
                    <h4 class="block notice-title" id="showTheme"> </h4>
                    <div class="notice-text">
                        <p id="showContent">
                         
                        </p>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    //$('.date-picker').datepicker();
    $('#reservation').daterangepicker();
    $('#reservation1').daterangepicker();
</script>
<script src="${ctx_static }/home/sysconf/js/rewardPunish.js?v-<%=Math.random() %>"></script> 
