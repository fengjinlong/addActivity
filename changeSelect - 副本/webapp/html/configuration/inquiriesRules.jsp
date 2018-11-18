<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/configuration/css/inquiriesRules.css">


<div class="row page-wrapper">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">咨询规则管理</span>
        </div>
        <div class="tabbable">
            <ul class="nav nav-tabs tabs-flat">
                <li class="active">
                    <a data-toggle="tab" href="#regulation">
                        	咨询师咨询量上限/撞单规则/电话隐藏控制
                    </a>
                </li>

                <li>
                    <a data-toggle="tab" href="#infoFlow">
                        	信息回流规则
                    </a>
                </li>
            </ul>

            <div class="tab-content tabs-flat bordered-blue">
                <div id="regulation" class="tab-pane in active">
                    <form action="" class="form-horizontal" id="rule">
                        <h5 class="bordered-bottom-1 bordered-gray">咨询师咨询量上限</h5>
                        <div class="form-group">
                            <label class="control-label col-sm-4 no-padding-right">日咨询量上限(个)：</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="dayInquiries">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4 no-padding-right">周度咨询量上限(个)：</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="weekInquiries">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4 no-padding-right">月度咨询量上限(个)：</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="monthInquiries">
                            </div>
                        </div>

                        <h5 class="bordered-bottom-1 bordered-gray">撞单规则</h5>
                        <div class="form-group  hitSingle">
                            <label class="control-label col-sm-4 no-padding-right">是否允许多个咨询师跟进同一个学员：</label>
                            <div class="col-sm-6 no-padding-left">
                                <div class="radio pull-left">
                                    <label>
                                        <input name="followIn" type="radio">
                                        <span class="text">允许</span>
                                    </label>
                                </div>
                                <div class="radio pull-left">
                                    <label>
                                        <input name="followIn" type="radio">
                                        <span class="text">不允许</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <h5 class="bordered-bottom-1 bordered-gray">电话隐藏控制</h5>
                        <div class="form-group">
                            <label class="control-label col-sm-4 no-padding-right">是否需要隐藏电话：</label>
                            <div class="col-sm-6 no-padding-left">
                                <div class="radio pull-left">
                                    <label>
                                        <input name="phoneHidden" type="radio">
                                        <span class="text">是</span>
                                    </label>
                                </div>
                                <div class="radio margin-left">
                                    <label>
                                        <input name="phoneHidden" type="radio">
                                        <span class="text">否</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-1 col-sm-2 col-sm-offset-5">
                            	<button type="submit" class="btn btn-primary form-control">设定</button>
                            </div>
                            <div class="col-lg-1 col-sm-2">
                                <button type="reset" class="btn btn-danger form-control"
                                        data-dismiss="modal">
                                    取消
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div id="infoFlow" class="tab-pane">
                    <form action="" class="form-horizontal" id="infoFlowRule">
                        <table class="table table-bordered">
                            <tbody>
                            <tr>
                                <td colspan="2">
                                    <span class="explain">*</span> 当客户满足下述任意条件时，强制收回客户资源</td>
                            </tr>
                            <c:forEach items="${map.rules}" var="item">
                                <tr>
                                    <td width="5%" class="text-center">
                                        <label>
                                            <input type="checkbox" value="${item.rule}"  name="rule" <c:out value="${item.checked==1?'checked':''}"></c:out>  >
                                            <span class="text"></span>
                                        </label>
                                    </td>
                                    <td>
                                        ${item.result}
                                    </td>
                                </tr>
                             </c:forEach>
                            <tr>
                                <td colspan="2">
                                    <span class="explain">*</span> 当客户满足上述任意条件，且满足下述任意附加条件才强制收回客户资源
                                </td>
                            </tr>
                            
                            <c:forEach items="${map.options}" var="item">
	                            <tr>
	                                <td width="5%" class="text-center">
	                                    <label>
	                                        <input name="option" value="${item.option}" type="radio" <c:out value="${item.checked==1?'checked':''}"></c:out>>
	                                        <span class="text"></span>
	                                    </label>
	                                </td>
	                                <td>${item.desc}</td>
	                            </tr>
                            </c:forEach>
                            
                            <tr>
                                <td colspan="2">
                                    <span class="explain">*</span> 进入公共库后操作行为
                                </td>
                            </tr>
                            
                            <c:forEach items="${map.operations}" var="item">
	                            <tr>
	                                <td width="5%" class="text-center">
	                                    <label>
	                                        <input name="operation" value="${item.operation}" type="radio" <c:out value="${item.checked==1?'checked':''}"></c:out>>
	                                        <span class="text"></span>
	                                    </label>
	                                </td>
	                                <td>${item.desc}</td>
	                            </tr>
                            </c:forEach>
                            
                            <tr>
                                <td colspan="2" class="text-center">
                                	<button type="submit" class="btn btn-primary">设定</button>
                                    <button type="reset" class="btn btn-danger">取消</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/home/configuration/js/inquiriesRules.js"></script>

