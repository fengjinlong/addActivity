<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<style>
.hiddenCol{
display:none;
}
</style>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/configuration/css/brandSetting.css" rel="stylesheet">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">品牌设置</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                <input id="searchVal" type="text" class="form-control" placeholder="品牌" onkeydown="search();">
                            </div>
                            <div class="form-group col-lg-2 col-md-4 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                	<i class="fa fa-search"></i> 搜索
                                </a>

                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                            <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle"
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
                            <button class="btn increase pull-right col-sm-4" data-toggle="modal"
                                    data-target=".brandAdd" data-backdrop="static">
                                <i class="fa  fa-plus"></i> 新增
                            </button>
                        </div>
                    </div>
                    <div class="brandSetting-warp">
                    <table class="table table-striped table-hover table-bordered dataTable no-footer" id="brandSetting">
                        <thead>
                        <tr role="row">
                            <th width="5%">
                                <label>
                                    <input type="checkbox" class="checkAll">
                                    <span class="text"></span>
                                </label>
                            </th>
                            <th class="hidden">ID</th>
                            <th>序号</th>
                            <th>品牌 </th>
                            <th>状态 </th>
                            <th>操作 </th>
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

<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade brandAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="brandAdd" method="post">
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">品牌：</label>
                        <div class="col-sm-9">
                            <input name="brandName" id="brandName" class="form-control brandName">
                        </div>
                    </div>
                    <div class="form-group">
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

<script src="${ctx_static }/home/configuration/js/brandSetting.js"></script>
