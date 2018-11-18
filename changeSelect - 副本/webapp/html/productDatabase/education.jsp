<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/productDatabase/css/education.css" rel="stylesheet">

<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-4 col-sm-4 col-xs-12 col-lg-4 no-padding-left margin-left-20">
                            <div class="form-group col-md-9 col-sm-9 col-lg-9 no-margin-right">
                                <input class="form-control"
                                       placeholder="分校/级别/学校"
                                       type="text" onkeydown="search()" id="searchVal">
                            </div>
                            <div class="form-group col-md-3 col-sm-3 col-lg-3">
                                <button type="button"
                                        class="btn increase form-control search-btn" onclick="toSearch()">
                                        <i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <table class="table table-striped table-hover table-bordered dataTable no-footer"
                               id="init">
                            <thead>
                             <tr role="row" class="text-center">
                                 <th width="50%">分校</th>
                                 <th>院校</th>
                                 <th>级别</th>
                                 <th>属性</th>
                                 <th>价格</th>
                                 <th>状态</th>
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

<!--查看-->
<div class="modal fade examine" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true" id="checkModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
            </div>
        </div>
    </div>
</div>
<!--学校-->
<div class="modal fade school" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">查看学校</span>
            </div>
            <div class="modal-body clearfix">

            </div>

        </div>
    </div>
</div>
<!--价格-->
<div class="modal fade price" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true" id="priceInfo">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">查看价格</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">学杂费</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="xuezafei">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">考试费</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="kaoshifei">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">资料费</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="ziliaofei">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">教材费</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="jiaocaifei">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">代管费</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="daiguanfei">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">辅导费</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="fudaofei">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">考前辅导</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="kaoqianfudao">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-md-3 no-padding-right no-padding-left">作业辅导</label>
                        <div class="pull-left col-md-9">
                            <input type="text" class="form-control" disabled name="zuoyefuodao">
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
</div>

<script src="${ctx_static }/home/productDatabase/js/education.js"></script>