<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/dataDictionary/css/dataDictionary.css" rel="stylesheet">
          <div class="row page-wrapper">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="widget">
                            <div class="widget-header text-align-left disctionary-title">
                                <span class="pull-left">数据字典</span>
                                <a class="btn increase addBtn pull-right" title="新增">
                                    <i class="fa fa-plus"></i> 新增
                                </a>
                            </div>
                            <!--Widget Header-->
                            <div class="widget-body clearfix">
                                <div class="widget-main clearfix dictionary-config">
                                    <div class="col-sm-12">
                                        <ul class="navMenu col-sm-12 courseConfig">
                                        <c:forEach items="${data}" var="data">
                                        	    <c:if test="${data.dataTypeCode eq '100' }">
	                                            <li class="open" >
	                                                <a class="afinve">
	                                                    <span>${data.dataTypeName }</span>
	                                                    <span class="fa fa-angle-down pull-right arrow"></span>
	                                                </a>
	                                          
	                                                <ul class="sub-menu">
	                                                    <c:forEach items="${dataList }" var="data2">
	                                                    <li>
	                                                    	<c:if test="${data.dataTypeId==data2.dataTypeId }">
	                                                        <a class="clearfix">
	                                                            <span class="pull-left" >${data2.dataBasicName}</span>
	                                                            <input type="hidden" id="dataBasicId" value="${data2.dataBasicId}">
	                                                           <!--  <i class="fa fa-plus pull-right blue add-button"></i> -->
	                                                        </a>
	                                                        </c:if>
	                                                    </li>
	                                                      </c:forEach>
	                                                </ul>
	                                            </li>
                                            </c:if>
                                              </c:forEach>
                                              <li class="open" >
	                                                <a class="afinve">
	                                                    <span>服务基础配置</span>
	                                                    <span class="fa fa-angle-down pull-right arrow"></span>
	                                                </a>
	                                                <ul class="sub-menu">
	                                                    <li><a class="clearfix"><span class="pull-left" >优惠活动</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >费用类型配置</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >报考流程</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >费用协议</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >短信模板</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >考期设置</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >服务配置</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >基础服务配置</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >学员属性配置</span><input type="hidden" ></a></li>
	                                                </ul>
	                                        </li>
	                                        <li class="open" >
	                                                <a class="afinve">
	                                                    <span>服务配置</span>
	                                                    <span class="fa fa-angle-down pull-right arrow"></span>
	                                                </a>
	                                                <ul class="sub-menu">
	                                                    <li><a class="clearfix"><span class="pull-left" >扣费种类</span><input type="hidden" ></a></li>
	                                                    <li><a class="clearfix"><span class="pull-left" >退费服务流程</span><input type="hidden" ></a></li>
	                                                </ul>
	                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<%@ include file="../common/public_footer.jsp"%>

<!--数据字典新增-->
<div class="modal fade dictionaryAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="dictionaryAdd">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">名称：</label>
                        <div class="col-sm-8">
                            <input name="dataBasicName" class="form-control xv_hanzi" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">表名：</label>
                        <div class="col-sm-8">
                            <input name="dataBasicEnName" class="form-control xv_pinyin" readonly="readonly">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">类型：</label>
                        <div class="col-sm-8">
                            <select name="dataTypeId" class="form-control">
                                <option value="1">课程基础配置</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-4 col-sm-offset-3">
                            <button type="button" class="btn btn-primary form-control save-dictionary">确定</button>
                        </div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--表新增-->
<div class="modal fade tableAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="tableAdd">
                	<div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right">表名：</label>
                        <div class="col-sm-8">
                            <input id="tableName" name="tableName" class="form-control">
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered no-footer">
                        <thead>
                        <th>名称</th>
                        <th>字段名</th>
<!--                         <th>排序</th> -->
                        <th>类型</th>
                        <th>是否为空</th>
                        <th>是否查询字段</th>
                        <th>默认值</th>
                        <th>
                            <i class="fa fa-plus success operate-btn"></i>
                        </th>
                        </thead>
                        <tbody id="gzTr">
                        
                        <input type="hidden" id="dataDetailId" class="form-control">
                        <tr >
                            <td>
                                <input type="text" name="clz0" class="form-control">
                            </td>
                            <td>
                                <input type="text" name="clz1" class="form-control">
                            </td>
<!--                             <td> -->
<!--                                 <input type="text" id="sortCode" class="form-control"> -->
<!--                             </td> -->
                            <td>
                                <input type="text" name="clz2" class="form-control">
                            </td>
                            <td>
                               <input type="text" name="clz3" class="form-control"> 
                            </td>
                            <td>
                                <input type="text" name="clz4" class="form-control"> 
                            </td>
                            <td>
                                <input type="text" name="clz5" class="form-control" >
                            </td>
                            <td>
                                <i class="fa fa-minus danger operate-btn"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control save-table">确定</button>
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
<script src="${ctx_static }/home/dataDictionary/js/dataDictionary.js?v=<%=Math.random() %>"></script> 
<script src="${ctx_static }/home/dataDictionary/js/hzpy.js"></script> 