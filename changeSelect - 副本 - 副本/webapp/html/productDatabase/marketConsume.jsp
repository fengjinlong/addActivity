<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/daterangepicker.css">
<link href="${ctx_static }/home/dataCenter/css/marketConsume.css" rel="stylesheet">

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
                    <div class="row_padding form-horizontal clearfix search-condition">
                        <div class="col-sm-12">
                            <div class="form-group col-sm-4">
                                <label class="pull-left control-label"
                                       style="width: 51px;">日期</label>
                                <div class="col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input class="form-control active" id="reservation"
                                                   type="text">
                                    <span class="input-group-addon"><i
                                            class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-2">
                                <label class="control-label pull-left">品牌</label>
                                <div class="col-sm-9 no-padding-right">
                                    	 <select name="brand" id="brandName1"
                                            class="form-control brand chosen-select"
                                            data-placeholder="--请选择--" tabindex="1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-3">
                                <label class="control-label pull-left">分校</label>
                                <div class="col-sm-9">
                                    <select name="branchSchool" id="branchSchool1"
                                            class="form-control branchSchool chosen-select"
                                            data-placeholder="--请选择--" tabindex="1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-3">
                                <label class="control-label pull-left">模型</label>
                                <div class="col-sm-10">
                                    <select name="model" id="model1"
                                            class="form-control model chosen-select"
                                            data-placeholder="--请选择--" tabindex="1"></select>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-12">
                        	<div class="form-group col-sm-3">
                                <label class="control-label pull-left">产品</label>
                                <div class="col-sm-10">
                                    <select name="product" id="product1"
                                            class="form-control product chosen-select"
                                            data-placeholder="--请选择--" tabindex="1"></select>
                                </div>
                            </div>
                        
                            <div class="form-group col-sm-4">
                                <label class="control-label pull-left">媒体来源</label>
                                <div class="col-sm-9">
                                    <select name="mediaSources" id="mediaSources1"
                                            class="form-control mediaSources chosen-select"
                                           data-placeholder="--请选择--" tabindex="1"></select>
                                </div>
                            </div>
                            <div class="form-group col-sm-2">
                                <label class="pull-left control-label"
                                       style="margin-left: -25px">推广方式</label>
                                <div class="col-sm-9 no-padding-right">
                                    <select name="promotion" id="promotion1"
                                            class="form-control promotion chosen-select"
                                            data-placeholder="--请选择--" tabindex="1"></select>
                                </div>
                            </div>
                            <div class="col-sm-1 margin-left-40">
                                <button type="button" class="btn btn-lightBlue search-btn btn-block">
                                	<i class="fa fa-search"></i>搜索
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 operation-btn  text-right">
                        <button class="btn btn-lightBlue  margin-right-10" onclick="reset()"
                                data-toggle="modal" data-backdrop="static"
                                data-target=".bulkAdd">批量新增
                        </button>
                        <button class="btn btn-danger deleteMarket">删除</button>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer" style="margin-top:55px;margin-bottom:50px">
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                   id="certificate" style="width:100%">
                                <thead>
                                <tr role="row" class="text-center">
                                    <th width="4%">
                                        <label>
                                            <input type="checkbox">
                                            <span class="text"></span>
                                        </label>
                                    </th>
                                    <th>数据日期</th>
                                    <th>分校</th>
                                    <th>品牌</th>
                                    <th>模型</th>
                                    <th>产品</th>
                                    <th>消费</th>
                                    <th>展现</th>
                                    <th>点击</th>
                                    <th>媒体来源</th>
                                    <th>推广方式</th>
                                    <th>上传日期</th>
                                    <th>添加人</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
<%@ include file="../common/public_footer.jsp"%>

<!--批量新增-->
<div class="modal fade bulkAdd" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">批量新增</span>
            </div>
            <div class="modal-body clearfix">
                    <div class="form-group col-md-12 col-sm-12 Bulkimport">
                        <label class="control-label">批量导入<a href="${ctx }/temp/marketTemplet.xlsx">（模板下载）:</a></label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12">
                        <label class="control-label">
                            <div class="col-md-12">
                                <input id="bulk-upload" type="file" name="file" multiple>
                            </div>
                        </label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12">
                    <div class="hidden">
                  <table class="table table-striped table-bordered dataTable text-center" id="tableId" >
	                            <thead>
	                            <tr role="row" class="text-center">
	                                <th>日期</th>
	                                <th>品牌</th>
	                                <th>分校</th>
	                                <th>模型</th>
	                                <th>产品</th>
	                                <th>消费</th>
	                                <th>展现</th>
	                                <th>点击</th>
	                                <th>媒体来源</th>
	                                <th>推广方式</th>
	                            </tr>
	                            </thead>
	                            <tbody>
	                            </tbody>
	                        </table>
                 </div>
                 <form class="form-horizontal" id ="scoresAdd">
	                <div class="table-scrollable">
	                        <table class="table table-striped table-bordered dataTable text-center" id="imports">
	                            <thead>
	                            <tr role="row" class="text-center">
	                               <th>日期</th>
	                                <th>品牌</th>
	                                <th>分校</th>
	                                <th>模型</th>
	                                <th>产品</th>
	                                <th>消费</th>
	                                <th>展现</th>
	                                <th>点击</th>
	                                <th>媒体来源</th>
	                                <th>推广方式</th>
	                            </tr>
	                            </thead>
	                            <tbody>
	                            </tbody>
	                        </table>
	                    </div>
	                <div class="col-sm-12 modal-footer">
	                        <div class="col-sm-2 col-sm-offset-4">
	                            <button type="submit" class="btn btn-primary form-control creation-btn bulkAddBtn" data-toggle="modal"
	                                    data-backdrop="static" >确定
	                            </button>
	                        </div>
	                        <div class="col-sm-2">
	                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
	                            </button>
	                       </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>

<!--新增-->
<div class="modal fade addMarket" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="addMarket">
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-3 no-padding-right">日期</label>
                        <div class="col-md-9 col-sm-9 no-padding-right">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" id="marketDate">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-4 no-padding-right">推广方式</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select name="promotion" id="promotion"
                                    class="form-control promotion chosen-select"
                                    data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-4 no-padding-right">媒体来源</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select name="mediaSources" id="mediaSources"
                                    class="form-control mediaSources chosen-select"
                                    data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-3 no-padding-right">品牌</label>
                        <div class="col-md-9 col-sm-9 no-padding-right">
                            <select name="brand" class="form-control brand chosen-select"
                             id="brandName" data-placeholder="--请选择--" tabindex="1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-4 no-padding-right">分校</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select name="branchSchool"
                                    class="form-control branchSchool chosen-select"
                                    data-placeholder="--请选择--" tabindex="1" id="branchSchool"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-4 no-padding-right">项目</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select name="project" id="project"
                                    class="form-control project chosen-select"
                                    data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div>
                    <div class="col-sm-12 no-padding">
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-3 no-padding-right">消费</label>
                            <div class="col-md-9 col-sm-9 no-padding-right">
                                <input type="text" class="form-control" name="" id="consume">
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-4 no-padding-right">展现</label>
                            <div class="col-md-8 col-sm-8 no-padding-right">
                                <input type="text" class="form-control" name="" id="spreadNum">
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-4 no-padding-right">点击</label>
                            <div class="col-md-8 col-sm-8 no-padding-right">
                                <input type="text" class="form-control" name="" id="clickNum">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control creation-btn" data-toggle="modal"
                                    data-backdrop="static">确定
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
</div>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>

<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>

<script src="${ctx_static }/home/dataCenter/js/marketConsume.js?v=<%=Math.random() %>"></script>
