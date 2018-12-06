<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                <span class="widget-caption">分成调整管理</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-10 col-sm-10 col-xs-12">
                            <div class="form-group col-md-3 col-sm-3 no-margin-right">
                                <div class="input-group">
                                    <input type="text" id="dat" class="form-control form_datetime" placeholder="请选择日期">
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                            <div class="form-group col-md-3 col-sm-3 no-margin-right">
                                <select class="form-control chosen-select" id="dep">
                                    <option value="">合作方</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                            
                            <div class="pull-left margin-left-10">
                                <button type="button" onclick="init()" class="btn btn-lightBlue form-control search-btn">
                                    <i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                            
                        </div>
                        <div class="col-md-2 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
                            <div class="btn-group pull-right">
                                <span class="btn btn-default pull-left pointer" title="View print view"><span>打印</span></span>
                                <div class="btn-group pull-left" style="margin-right:15px;">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出
                                        <i class="fa fa-angle-up"></i>
                                    </button>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a href="javascript:exportPDF();">导出PDF</a></li>
                                        <li><a href="javascript:exportExcel();">导出EXCEL</a></li>
                                        <li><a href="javascript:exportCSV();">导出CSV</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <table class="table table-bordered" id="myTable">
                        <thead>
                            <tr>
                                <th width="5%">
                                    <label>
                                        <input type="checkbox">
                                        <span class="text"></span>
                                    </label>
                                </th>
                                <th>合作方</th>
                                <th>年月</th>
                                <th>原始分成</th>
                                <th>调整金额</th>
                                <th>调整后分成</th>
                                <th width="10%">操作</th>
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
<!--调整-->
<div class="modal fade adjustment in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">调整</span>
            </div>
            <div class="modal-body  form-horizontal modal_padding">

                <form method="" class="form-horizontal padding-top-20 clearfix" style="padding:0 20px" id="addForm" onsubmit="return validateForm();">
                    <div class="adjustment-box" style="overflow-x:auto">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>产品模型</th>
                                    <th>总咨询量</th>
                                    <th>总业绩</th>
                                    <th>总收益费用</th>
                                    <th>总支出费用</th>
                                    <th>服务场景</th>
                                    <th>服务合作方&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                    <th>咨询量</th>
                                    <th>业绩</th>
                                    <th>收益费用</th>
                                    <th>支出费用</th>
                                    <th>调整费用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                    <th>收益费用调整比例</th>
                                    <th>支出费用调增比例</th>
                                    <th>调整金额</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody class="profession" id="modelTbody">
                                
                                
                                
                            </tbody>
                            <!-- <tbody>
                                <tr>
                                    <td rowspan="6">学历</td>
                                    <td rowspan="6">867</td>
                                    <td rowspan="6">1264013.00</td>
                                    <td rowspan="6">1169441.00</td>
                                    <td rowspan="6">94572.00</td>
                                    <td>线上推广</td>
                                    <td>
                                        <select class="form-control  selectpicker"  multiple>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                        </select> 
                                    </td>
                                    <td rowspan="3">
                                        603
                                        <p>(46.39%)</p>
                                    </td>
                                    <td rowspan="3">
                                        586307.57
                                        <p>(46.39%)</p>
                                    </td>
                                    <td rowspan="3">
                                        542503.68
                                        <p>(46.39%)</p>
                                    </td>
                                    <td rowspan="3">
                                        43871.95 
                                        <p>(46.39%)</p>
                                    </td>
                                    <td rowspan="3">
                                        <select class="form-control">
                                            <option value="0">上调</option>
                                            <option value="1">下降</option>
                                        </select>
                                    </td>
                                    <td rowspan="3">
                                        <input type="text" class="form-control" value="0.00%">
                                    </td>
                                    <td rowspan="3">
                                        <input type="text" class="form-control" value="0.00%">
                                    </td>
                                    <td rowspan="3">
                                        0
                                    </td>
                                    <td rowspan="3">
                                        <label class="control-label no-padding-right">
                                            <a href="#" class="blue" style="font-size:16px">
                                                <i class="glyphicon glyphicon-plus-sign"></i>
                                            </a>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>咨询沟通</td>
                                    <td>
                                        <select class="form-control selectpicker" multiple>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                        </select> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>接待学员</td>
                                    <td>
                                        <select class="form-control selectpicker" multiple>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                        </select> 
                                    </td>
                                </th>
                            </tbody> -->
                        </table>
                    </div>
                   
                    <div class="well bordered-top bordered-palegreen" style="margin-top:20px;font-size:16px">
                        <span class="block">合计：</span>
                        <span class="cost" id="adjustmentFee">00</span>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-sm-2 control-label no-padding-right" style="margin-left:-65px">其他调整金</label>
                        <div class="col-sm-10">
                            <div class="cost-body clearfix">
                                <div class="cost-content col-sm-12 no-padding">
                                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <select class="form-control" id="type">
                                            <option value="0">上调</option>
                                            <option value="1">下降</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <input class="form-control" id="money" type="text">
                                    </div>
                                    <label class="control-label no-padding-right">元</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-sm-2 control-label no-padding-right" style="margin-left:-65px">说明</label>
                        <div class="col-sm-10">
                            <textarea class="form-control rebuildRemark content" rows="3" id="rebuildRemark" name="rebuildRemark" style="width:668px;height:340px;"></textarea>
                        </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" data-type='1' onclick='addDivided(this)' class="btn btn-primary btn-lg form-control">确认</button>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
	
<script src="${ctx_static }/home/financeCenter/js/dividedManage.js?v=<%=Math.random() %>"></script>

