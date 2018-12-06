<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/configuration/css/financeConfig.css" rel="stylesheet">
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">


<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
	    <div class="widget">
	        <div class="widget-header">
                <div class="widget-buttons">
                </div>
                <!--Widget Buttons-->
           </div>
	        <div class="widget-body">
	            <div class="widget-main ">
	                <div class="tabbable">
	                    <ul class="nav nav-tabs tabs-flat">
	                        <li class="active">
	                            <a data-toggle="tab" href="#receiver">
	                              	  常用收款人
	                            </a>
	                        </li>
	                        <li>
	                            <a data-toggle="tab" href="#costClasses">
	                                	费用类别
	                            </a>
	                        </li>
	                        <li>
	                            <a data-toggle="tab" href="#approvalProcess">
	                                	审批流程
	                            </a>
	                        </li>
	                    </ul>
	                    <div class="tab-content tabs-flat bordered-blue">
	                        <div id="receiver" class="tab-pane in active">
	                            <div class="row row_padding form-horizontal">
	                                <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
	                                    <div class="form-group col-lg-6 col-md-8 col-sm-8 no-margin-right">
	                                        <input class="form-control" id='searchVal'
	                                               placeholder="开户行/开卡所在省/开卡所在市/户名/账号/电话" onkeydown="search();">
	                                    </div>
	                                    <div class="form-group col-lg-2 col-md-3 col-sm-3">
	                                        <button onclick="init()" type="button" class="btn increase  form-control search-btn">
	                                            	<i class="fa fa-search"></i> 搜索
	                                        </button>
	                                    </div>
	                                </div>
	                                <div class="col-md-3 col-sm-4 col-xs-12 btn-group">
	                                <span class="btn btn-default pointer"
	                                      title="View print view"><span>打印</span></span>
	                                    <div class="btn-group">
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
	                                    <button class="btn increase pull-right col-sm-4" id="addPeopleBut"
	                                            data-toggle="modal"
	                                            data-target=".receiverAdd"
	                                            data-backdrop="static">
	                                        <i class="fa fa-plus"></i> 新增
	                                    </button>
	                                </div>
	                            </div>
	                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="commonReceiver">
	                                <thead>
	                                <tr role="row">
	                                    <th width="5%">
	                                        <label>
	                                            <input type="checkbox" class="master">
	                                            <span class="text"></span>
	                                        </label>
	                                    </th>
	                                    <th>户名</th>
	                                    <th>电话</th>
	                                    <th>账号</th>
	                                    <th>开户行</th>
	                                    <th>开户行所在省 </th>
	                                    <th>开户行所在市</th>
	                                    <th>操作</th>
	                                </tr>
	                                </thead>
	
	                                <tbody>
	                                </tbody>
	                            </table>
	                        </div>
	                        <div id="costClasses" class="tab-pane">
	                            <div class="row">
	                                <div class="col-sm-4 costClassesList">
	                                    <div class="drop-down">
	                                        <div class="widget-header  bordered-bottom-2 bordered-blue">
	                                            <span class="widget-caption" style="line-height:40px !important">费用类别列表</span>
	                                            <a href="javascript:;" data-toggle="dispose">
	                                                <i class="fa fa-plus-square-o costClasses-btn pull-right"></i>
	                                            </a>
	                                        </div>
	                                        <ul class="nav sidebar-menu" id="listMenu">
	                                        </ul>
	                                    </div>
	                                </div>
	                                <div class="col-sm-8">
	                                    <!--费用信息-->
	                                    <div class="widget costInfo">
	                                        <div class="widget-header bordered-bottom-2 bordered-blue">
	                                            <span class="widget-caption">查看费用类别</span>
	                                            <div class="widget-buttons">
	                                                <a href="javascipt:;" title="编辑" class="edit-btn">
	                                                    <i class="glyphicon glyphicon-pencil"></i>
	                                                </a>
	                                                <a href="#" title="关闭" data-toggle="dispose">
	                                                    <i class="glyphicon glyphicon-remove"></i>
	                                                </a>
	                                            </div><!--Widget Buttons-->
	                                        </div><!--Widget Header-->
	                                        <div class="widget-body clearfix">
	                                        	 <form class="form-horizontal">
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">名称</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" name=""  class="form-control costName" disabled>
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">所属上级</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" name="" class="form-control parentName" disabled>
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">种类</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text"  name="" class="form-control type" disabled>
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">费用编码</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text"  name="" class="form-control costclassCode" disabled>
	                                                    </div>
	                                                </div>
	                                            </form>
	                                        </div>
	                                        <!--Widget Body-->
	                                    </div>
	
	                                    <!--新增费用-->
	                                    <div class="widget costAdd">
	                                        <div class="widget-header  bordered-bottom-2 bordered-blue">
	                                             <span class="widget-caption">新增费用类别</span>
	                                            <div class="widget-buttons">
	                                               	<a href="javascipt:;" title="编辑" class="edit-btn"></a>
	                                                <a href="#" title="关闭" data-toggle="dispose">
	                                                    <i class="glyphicon glyphicon-remove"></i>
	                                                </a>
	                                            </div><!--Widget Buttons-->
	                                        </div><!--Widget Header-->
	                                        <div class="widget-body clearfix">
	                                            <form class="form-horizontal" id="costAdd">
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">名称</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" class="form-control" name="costclassName">
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">所属上级</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" name="parentName" id="parentNameAdd" class="form-control" disabled>
	                                                        <input name="parentId" value=""  type="hidden" id="parentId"/>
	                                                        <input name="fullPath" value=""  type="hidden" />
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">种类</label>
	                                                    <div class="col-sm-8">
	                                                        <select name="type"
	                                                                class="form-control">
	                                                            <option value="1">收入</option>
	                                                            <option value="2">支出</option>
	                                                        </select>
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">费用编码</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" class="form-control" name="costclassCode">
	                                                    </div>
	                                                </div>
	                                                <div class="form-group form-footer">
	                                                    <div class="col-sm-2 col-sm-offset-4">
	                                                        <button type="submit" class="btn btn-primary form-control"> 确定 </button>
	                                                    </div>
	                                                    <div class="col-sm-2">
	                                                        <button type="button" class="btn btn-danger form-control cancel-btn"> 取消 </button>
	                                                    </div>
	                                                </div>
	                                            </form>
	                                        </div>
	                                        <!--Widget Body-->
	                                    </div>
	
	                                    <!--编辑费用-->
	                                    <div class="widget costEdit">
	                                        <div class="widget-header  bordered-bottom-2 bordered-blue">
	                                            <span class="widget-caption">编辑费用类别</span>
	                                            <div class="widget-buttons">
	                                            	<a href="javascipt:;" title="编辑" class="edit-btn"></a>
	                                                <a href="#" data-toggle="dispose">
	                                                    <i class="glyphicon glyphicon-remove"></i>
	                                                </a>
	                                            </div><!--Widget Buttons-->
	                                        </div><!--Widget Header-->
	                                        <div class="widget-body clearfix">
	                                            <form class="form-horizontal" id="costEdit">
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">名称</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" class="form-control" name="costclassName">
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">所属上级</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" class="form-control" id="ediParentName" name="parentName" disabled>
	                                                        <input type="hidden" id="editParentId" name="parentId">
	                                                        <input type="hidden" id="editFinanceCostclassId" name="financeCostclassId">
	                                                        <input type="hidden" id="editFullPath" name="fullPath">
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">种类</label>
	                                                    <div class="col-sm-8">
	                                                        <select name="type" class="form-control">
	                                                            <option value="1">收入</option>
	                                                            <option value="2">支出</option>
	                                                        </select>
	                                                    </div>
	                                                </div>
	                                                <div class="form-group">
	                                                    <label class="control-label col-sm-2 no-padding-right">费用编码</label>
	                                                    <div class="col-sm-8">
	                                                        <input type="text" class="form-control" name="costclassCode">
	                                                    </div>
	                                                </div>
	                                                <div class="form-group form-footer">
	                                                    <div class="col-sm-2 col-sm-offset-4">
	                                                         <button type="submit" class="btn btn-primary form-control">确定
	                                                        </button>
	                                                    </div>
	                                                    <div class="col-sm-2">
	                                                         <button type="button" class="btn btn-danger form-control cancel-btn">取消
	                                                        </button>
	                                                    </div>
	                                                </div>
	                                            </form>
	                                        </div>
	                                        <!--Widget Body-->
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div id="approvalProcess" class="tab-pane">
	                            <div class="row row_padding form-horizontal">
	                                <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
	                                    <div class="form-group col-lg-6 col-md-8 col-sm-8 no-margin-right">
	                                        <input class="form-control" id="financeAppmainName"
	                                               placeholder="流程名称/状态">
	                                    </div>
	                                    <div class="form-group col-lg-2 col-md-3 col-sm-3">
	                                        <button type="button" onclick="initAppmainTable()"
	                                                class="btn btn-blue form-control search-btn">
	                                            搜索
	                                        </button>
	
	                                    </div>
	                                </div>
	                                <div class="col-md-3 col-sm-4 col-xs-12 btn-group">
	                                    <button class="btn increase pull-right col-sm-4"
	                                            data-toggle="modal" id="addBut"
	                                            data-backdrop="static">新增
	                                        <i class="fa fa-plus-square-o right"></i>
	                                    </button>
	                                </div>
	                            </div>
	
	                            <table id="appmainTable" class="table table-bordered">
	                                <thead>
	                                    <tr>
	                                        <th width="5%">
	                                            <label>
	                                                <input type="checkbox">
	                                                <span class="text"></span>
	                                            </label>
	                                        </th>
	                                        <th width="5%">序号</th>
	                                        <th>流程名称</th>
	                                        <th width="10%">状态</th>
	                                        <th width="10%">操作</th>
	                                    </tr>
	                                </thead>
	                                <tbody >
	                                    
	                                </tbody>
	                            </table>
	
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <!--Widget-->
	    </div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<!--查看-->
<div class="modal fade receiverView in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="receiverView">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">户名</label>
                        <div class="col-sm-9">
                            <input type="text" id="catAccountName" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 activityType">
                        <label class="control-label col-sm-3 no-padding-right">开户行</label>
                        <div class="col-sm-9">
                            <input type="text" id="catBankName" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">开户所在省</label>
                        <div class="col-sm-9">
                            <input type="text" id="catProvince" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">开户所在市</label>
                        <div class="col-sm-9">
                            <input type="text" id="catCity" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">账号</label>
                        <div class="col-sm-9">
                            <input type="text" id="catAccountNum" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">电话</label>
                        <div class="col-sm-9">
                            <input type="text" id="catPhone" class="form-control" value="" disabled>
                        </div>
                    </div>

                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea class="form-control" rows="8" id="catDescription" disabled></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--新增-->
<div class="modal fade receiverAdd in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="receiverAdd">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">户名</label>
                        <div class="col-sm-9">
                            <input type="text" name="accountName" class="form-control" placeholder="请输入户名">
                        </div>
                    </div>
                    <div class="form-group col-sm-6 activityType">
                        <label class="control-label col-sm-3 no-padding-right">开户行</label>
                        <div class="col-sm-9">
                            <input type="text" name="bankName" class="form-control" placeholder="请输入开户行">
                        </div>
                    </div>
                    <div data-toggle="distpicker">
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-3 no-padding-right">开户所在省</label>
                            <div class="col-sm-9">
                                <select class="form-control" name="province" id="province2" data-province="---- 选择省 ----">
                                    <option value="" data-code="">---- 选择省 ----</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-3 no-padding-right">开户所在市</label>
                            <div class="col-sm-9">
                                <select class="form-control" name="city" id="city2" data-city="---- 选择市 ----">
                                    <option value="" data-code="">---- 选择市 ----</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">账号</label>
                        <div class="col-sm-9">
                            <input type="text" name="accountNum" class="form-control" placeholder="请输入账号">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">电话</label>
                        <div class="col-sm-9">
                            <input type="text" name="phone" class="form-control" placeholder="请输入电话">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea name="description" class="form-control" rows="8"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade receiverEdit in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="receiverEdit">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">户名</label>
                        <div class="col-sm-9">
                            <input type="text" name="accountName" id="updateAccountName" class="form-control" value="">
                            <input type="hidden" name="financePayeeId" id="updateFinancePayeeId" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group col-sm-6 activityType">
                        <label class="control-label col-sm-3 no-padding-right">开户行</label>
                        <div class="col-sm-9">
                            <input type="text" name="bankName" id="updateBankName"  class="form-control" value="招商银行">
                        </div>
                    </div>
                    <div data-toggle="distpicker">
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-3 no-padding-right">开户所在省</label>
                            <div class="col-sm-9">
                                <select name="province" class="form-control" id="province1" >
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-3 no-padding-right">开户所在市</label>
                            <div class="col-sm-9">
                                <select name="city" class="form-control" id="city1" >
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">账号</label>
                        <div class="col-sm-9">
                            <input type="text" name="accountNum" id="updateAccountNum"  class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">电话</label>
                        <div class="col-sm-9">
                            <input type="text" name="phone" id="updatePhone"  class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea name="description" id="updateDescription"  class="form-control" rows="8"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                             <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--审批流程——编辑-->
<div class="modal fade flow-redact in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form id="appmainForm" class="form-horizontal clearfix">
                	<input type="hidden" name="financeAppmainId"> 
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">流程名称</label>
                        <div class="col-sm-10">
                            <input type="text" name="financeAppmainName" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">费用类别</label>
                        <div class="col-sm-10 container">
                            <div>
                                <select name="costclassIds" class="form-control selectpicker" multiple>
                                    
                                </select>
                            </div>
                        </div>
                    </div>
					<div id="editAppend">
						<div class="form-group col-sm-12">
							<label class="control-label col-sm-2 no-padding-right remarkText">申请职位</label>
							<div class="col-sm-10">
								<input name="rightDutyName" readonly id="editRightDuty"
									class="form-control" onclick="showApplyDutys();" />
								<input name="rightDuty" id="editRightDutyMin" type="hidden" />
								<div id="content1" class="menuContent"
									style="position: absolute; overflow: auto; display: none; z-index: 999999">
									<ul id="applyDuty" class="ztree"
										style="margin-top: 0; max-height: 180px;width: 100%;overflow:auto""></ul>
								</div>
							</div>
							<label class="control-label no-padding-right">
	                            <a href="#" class="add-post blue" style="font-size:16px">
	                                <i class="glyphicon glyphicon-plus-sign"></i>
	                            </a>
	                        </label>
	                        <label class="control-label no-padding-right">
	                            <a href="#" class="remove-post red" style="font-size:16px">
	                                <i class="glyphicon glyphicon-minus-sign"></i>
	                            </a>
	                        </label>
						</div>
					</div>

					<div class="add-remove"></div>

                    <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:40px;margin-bottom:60px">
                        <div class="col-sm-2 col-sm-offset-3">
                            <button type="button" onclick="addAppmain()" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2 col-sm-offset-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>

<!-- 下拉树形菜单 -->

<div id="content2" class="menuContent" style="display:none; position: absolute;overflow:auto; z-index: 999999;">
	<ul id="approvalDuty" class="ztree" style="margin-top:0;max-height: 180px;width: 100%;overflow:auto"></ul>
</div>
	
<script src="${ctx_static }/home/configuration/js/financeConfig.js?v-<%=System.currentTimeMillis()%>"></script>

