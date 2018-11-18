<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/configuration/css/communicate.css" rel="stylesheet">

<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12">
                <div class="widget">
                    <div class="widget-header">
                        <div class="widget-buttons">
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
                            <div class="row row_padding form-horizontal">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                        <input type="text" class="form-control" placeholder="提前提醒时间">
                                    </div>
                                    <div class="form-group col-lg-2 col-md-4 col-sm-4">
                                        <button type="button" class="btn increase form-control search-btn">
                                        	<i class="fa fa-search"></i> 搜索
                                        </button>
                                    </div>
                                </div>


                                <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                                    <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                            导出
                                            <i class="fa fa-angle-up"></i>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="#">保存PDF</a></li>
                                            <li><a href="#">导出EXCEL</a></li>
                                            <li><a href="#">导出CSV</a></li>
                                        </ul>
                                    </div>
                                    <button class="btn increase pull-right col-sm-4" data-toggle="modal" data-target=".communicateAdd" data-backdrop="static">
                                        <i class="fa  fa-plus"></i> 新增
                                    </button>
                                </div>
                            </div>
                            <div class="dataTables_wrapper form-inline no-footer">
                                <div class="table-scrollable">
                                    <table class="table table-striped table-hover table-bordered dataTable no-footer" id="communicate">
                                        <thead>
                                        <tr role="row">
                                            <th width="5%">
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </th>
                                            <th>开始日期 <span class="fa indicator fa-unsorted"></span></th>
                                            <th>结束日期 <span class="fa indicator fa-unsorted"></span></th>
                                            <th>提前提醒时间 <span class="fa indicator fa-unsorted"></span></th>
                                            <th>状态 </th>
                                            <th>操作 </th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td width="5%">
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>2016-10-01</td>
                                            <td>2016-10-01</td>
                                            <td>15分钟</td>
                                            <td><a href="#" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a></td>
                                            <td>
                                                <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".communicateEdit" data-backdrop="static">
                                                    <i class="fa fa-edit"></i> 编辑</a>
                                                <a href="#" class="btn btn-danger btn-xs delete"><i
                                                        class="fa fa-trash-o"></i> 删除</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="5%">
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>2016-10-01</td>
                                            <td>2016-10-01</td>
                                            <td>15分钟</td>
                                            <td><a href="#" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a></td>
                                            <td>
                                                <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".communicateEdit"  data-backdrop="static">
                                                    <i class="fa fa-edit"></i> 编辑</a>
                                                <a href="#" class="btn btn-danger btn-xs delete"><i
                                                        class="fa fa-trash-o"></i> 删除</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="5%">
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>2016-10-01</td>
                                            <td>2016-10-01</td>
                                            <td>15分钟</td>
                                            <td>
                                                <a href="#" class="btn btn-nouse btn-xs status-btn"><i class="fa fa fa-ban"></i> 禁用</a>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".communicateEdit"  data-backdrop="static">
                                                    <i class="fa fa-edit"></i> 编辑</a>
                                                <a href="#" class="btn btn-danger btn-xs delete"><i
                                                        class="fa fa-trash-o"></i> 删除</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="5%">
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>2016-10-01</td>
                                            <td>2016-10-01</td>
                                            <td>15分钟</td>
                                            <td><a href="#" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a></td>
                                            <td>
                                                <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".communicateEdit"  data-backdrop="static">
                                                    <i class="fa fa-edit"></i> 编辑</a>
                                                <a href="#" class="btn btn-danger btn-xs delete"><i
                                                        class="fa fa-trash-o"></i> 删除</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="5%">
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>2016-10-01</td>
                                            <td>2016-10-01</td>
                                            <td>15分钟</td>
                                            <td>
                                                <a href="#" class="btn btn-nouse btn-xs status-btn"><i class="fa fa fa-ban"></i> 禁用</a>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".communicateEdit"  data-backdrop="static">
                                                    <i class="fa fa-edit"></i> 编辑</a>
                                                <a href="#" class="btn btn-danger btn-xs delete"><i
                                                        class="fa fa-trash-o"></i> 删除</a>
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
</div>

<!--新增-->
<div class="modal fade communicateAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="communicateAdd">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">开始日期</label>
                        <div class="col-sm-8">
                            <div class="input-group date">
                                <input class="form-control date-picker" type="text" data-date-format="yyyy-mm-dd">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">提醒时间</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-8">
                            <select name="" class="form-control">
                                <option value="0">启用</option>
                                <option value="1">禁用</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-4 col-sm-offset-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                        <div class="col-sm-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<!--编辑-->
<div class="modal fade communicateEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="communicateEdit">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">开始日期</label>
                        <div class="col-sm-8">
                            <div class="input-group date">
                                <input class="form-control date-picker" type="text" data-date-format="yyyy-mm-dd" value="2016-10-12">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">提醒时间</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="25分钟">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-8">
                            <select name="" class="form-control">
                                <option value="0">启用</option>
                                <option value="1">禁用</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-4 col-sm-offset-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                        <div class="col-sm-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="${ctx_static }/home/configuration/js/communicate.js"></script>

