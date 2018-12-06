<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                    <a href="consultWorkbench.html" title="返回"><i class="fa fa-reply"></i></a>
                    <a href="#" data-toggle="collapse" title="折叠">
                        <i class="fa fa-minus"></i>
                    </a>
                    <a href="#" data-toggle="dispose" title="关闭">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="tabbable">
                        <ul class="nav nav-tabs tabs-flat" id="myTab11">
                            <li class="active">
                                <a data-toggle="tab" href="#profession">
                                    职业资格
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#education">
                                    学历
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content tabs-flat">
                            <div id="profession" class="tab-pane in active">
                                <div class="row_padding form-horizontal clearfix search-condition">
                                    <div class="col-sm-12">
                                        <div class="form-group col-sm-3">
                                            <label class="control-label pull-left">分校</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="branchSchool"
                                                        class="form-control branchSchool chosen-select"
                                                        data-placeholder="--请选择--"
                                                        tabindex="-1"></select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label class="control-label pull-left">项目</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="project"
                                                        class="form-control project chosen-select"
                                                        data-placeholder="--请选择--"
                                                        tabindex="-1"></select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label class="control-label pull-left">级别</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="grade"
                                                        class="form-control grade chosen-select"
                                                        data-placeholder="--请选择--"
                                                        tabindex="-1"></select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label class="control-label pull-left">班型</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group col-sm-3">
                                            <label class="control-label pull-left" style="margin-left: -12px">协议班</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <div class="radio pull-left">
                                                    <label style="padding-left: 0;">
                                                        <input name="nameConsistent" type="radio"
                                                               checked="">
                                                        <span class="text">是 </span>
                                                    </label>
                                                </div>
                                                <div class="radio pull-left">
                                                    <label>
                                                        <input name="nameConsistent" type="radio">
                                                        <span class="text">否 </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-6">
                                            <label class="control-label pull-left" style="margin-left: -25px;">价格区间</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <div class="col-sm-5 no-padding-left">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <label class="control-label pull-left">———</label>
                                                <div class="col-sm-5 no-padding-right">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-2">
                                            <!--<button class="btn btn-info btn-block search-btn">搜索</button>-->
                                        </div>
                                    </div>
                                </div>

                                <div class="dataTables_wrapper form-inline no-footer">
                                    <div class="table-scrollable">
                                        <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th>分校 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>所属项目 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>级别 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>授课形式 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>班型 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>价格 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>协议班 <span class="fa indicator fa-unsorted"></span>
                                                </th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr>
                                                <td>01北京</td>
                                                <td>01人力资源管理师</td>
                                                <td>三级</td>
                                                <td>面授</td>
                                                <td>精英双证班</td>
                                                <td>2080</td>
                                                <td>否</td>
                                                <td>
                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                       data-toggle="modal" data-backdrop="static"
                                                       data-target=".professionView">
                                                        <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>01北京</td>
                                                <td>01人力资源管理师</td>
                                                <td>三级</td>
                                                <td>面授</td>
                                                <td>精英双证班</td>
                                                <td>2080</td>
                                                <td>否</td>
                                                <td>
                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                       data-toggle="modal" data-backdrop="static"
                                                       data-target=".professionView">
                                                        <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>01北京</td>
                                                <td>01人力资源管理师</td>
                                                <td>三级</td>
                                                <td>面授</td>
                                                <td>精英双证班</td>
                                                <td>2080</td>
                                                <td>否</td>
                                                <td>
                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                       data-toggle="modal" data-backdrop="static"
                                                       data-target=".professionView">
                                                        <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>01北京</td>
                                                <td>01人力资源管理师</td>
                                                <td>三级</td>
                                                <td>面授</td>
                                                <td>精英双证班</td>
                                                <td>2080</td>
                                                <td>否</td>
                                                <td>
                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                       data-toggle="modal" data-backdrop="static"
                                                       data-target=".professionView">
                                                        <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>01北京</td>
                                                <td>01人力资源管理师</td>
                                                <td>三级</td>
                                                <td>面授</td>
                                                <td>精英双证班</td>
                                                <td>2080</td>
                                                <td>否</td>
                                                <td>
                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                       data-toggle="modal" data-backdrop="static"
                                                       data-target=".professionView">
                                                        <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="education" class="tab-pane">
                                <div class="row_padding form-horizontal clearfix search-condition">
                                    <div class="col-sm-12">
                                        <div class="form-group col-sm-4">
                                            <label class="control-label pull-left">分校</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="branchSchool"
                                                        class="form-control branchSchool chosen-select"
                                                        data-placeholder="--请选择--"
                                                        tabindex="-1"></select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label pull-left">项目</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="project"
                                                        class="form-control project chosen-select"
                                                        data-placeholder="--请选择--"
                                                        tabindex="-1"></select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label pull-left">级别</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="grade"
                                                        class="form-control grade chosen-select"
                                                        data-placeholder="--请选择--"
                                                        tabindex="-1"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group col-sm-4"  style="margin-left: -25px;">
                                            <label class="control-label pull-left">教育形式</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <select name="educationForm" class="form-control">
                                                    <option value="1">自考</option>
                                                    <option value="2">成考</option>
                                                    <option value="3">远程</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label pull-left">院校名称</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label pull-left">专业名称</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group col-sm-4"  style="margin-left: -25px;">
                                            <label class="control-label pull-left">班型名称</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-5">
                                            <label class="control-label pull-left">价格区间</label>
                                            <div class="col-sm-9 no-padding-right">
                                                <div class="col-sm-5 no-padding-left">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <label class="control-label pull-left">———</label>
                                                <div class="col-sm-5 no-padding-right">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-2">
                                            <!--<button class="btn btn-info btn-block search-btn">搜索</button>-->
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-bordered table-hover dataTable no-footer"
                                       id="dataCategory">
                                    <thead>
                                    <tr role="row">
                                        <th>分校 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>项目 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>级别 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>教育形式 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>院校 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>专业 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>班型 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>价格 <span class="fa indicator fa-unsorted"></span></th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>01北京</td>
                                        <td>03学历直播</td>
                                        <td>专升本</td>
                                        <td>自考</td>
                                        <td>北京师范大学</td>
                                        <td>行政管理</td>
                                        <td>基金助学班</td>
                                        <td>9000</td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs view"
                                               data-toggle="modal" data-backdrop="static"
                                               data-target=".educationView">
                                                <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>01北京</td>
                                        <td>03学历直播</td>
                                        <td>专升本</td>
                                        <td>自考</td>
                                        <td>北京师范大学</td>
                                        <td>行政管理</td>
                                        <td>基金助学班</td>
                                        <td>9000</td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs view"
                                               data-toggle="modal" data-backdrop="static"
                                               data-target=".educationView">
                                                <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>01北京</td>
                                        <td>03学历直播</td>
                                        <td>专升本</td>
                                        <td>自考</td>
                                        <td>北京师范大学</td>
                                        <td>行政管理</td>
                                        <td>基金助学班</td>
                                        <td>9000</td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs view"
                                               data-toggle="modal" data-backdrop="static"
                                               data-target=".educationView">
                                                <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>01北京</td>
                                        <td>03学历直播</td>
                                        <td>专升本</td>
                                        <td>自考</td>
                                        <td>北京师范大学</td>
                                        <td>行政管理</td>
                                        <td>基金助学班</td>
                                        <td>9000</td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs view"
                                               data-toggle="modal" data-backdrop="static"
                                               data-target=".educationView">
                                                <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>01北京</td>
                                        <td>03学历直播</td>
                                        <td>专升本</td>
                                        <td>自考</td>
                                        <td>北京师范大学</td>
                                        <td>行政管理</td>
                                        <td>基金助学班</td>
                                        <td>9000</td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs view"
                                               data-toggle="modal" data-backdrop="static"
                                               data-target=".educationView">
                                                <i class="fa fa-folder-open-o"></i> 查看详情</a>
                                        </td>
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
</div>
            
<!--职业资格查看-->
<div class="modal fade professionView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal padding-top-10">
                    <div class="form-group col-sm-12">
                    <textarea class="form-control professionDetails" rows="8" id="professionDetails"
                              name="professionDetails" style="width:668px;height:640px;"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--学历查看-->
<div class="modal fade educationView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal padding-top-10">
                    <div class="form-group col-sm-12">
                    <textarea class="form-control professionDetails" rows="8" id="educationDetails"
                              name="professionDetails" style="width:668px;height:640px;"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="${ctx_static }/home/consultcenter/js/strategy..js"></script>           