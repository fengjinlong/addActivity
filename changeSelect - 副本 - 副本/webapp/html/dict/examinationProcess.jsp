<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>


<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                <span class="widget-caption">报考服务流程</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main">
                    <div class="tabbable">
                        <ul class="nav nav-tabs tabs-flat">
                            <li class="active">
                                <a data-toggle="tab" href="#processFunction">流程功能</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#processLink">流程环节</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#processDefinition">流程定义</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#showList">展示列表</a>
                            </li>
                        </ul>
                        <div class="tab-content tabs-flat">
                            <div id="processFunction" class="tab-pane active">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group col-md-7 col-sm-7 no-margin-right">
                                            <input class="form-control" id="buttonName" placeholder="功能名称" type="text" onkeydown="search()">
                                        </div>
                                        <div class="form-group col-md-3 col-sm-4">
                                            <button type="button" onclick="initButton()"
                                                    class="btn btn-lightBlue form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                                        <div class="col-sm-6 pull-right text-right no-padding-right">
                                            <a class="btn increase addBtn">
                                                <i class="fa fa-plus"></i> 新增
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                       id="processFunctionTable">
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>功能名称</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                   
                                    </tbody>
                                </table>
                            </div>
                            <div id="showList" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group col-md-7 col-sm-7 no-margin-right">
                                            <input class="form-control" id="dataName" placeholder="列表名称" type="text" onkeydown="search()">
                                        </div>
                                        <div class="form-group col-md-3 col-sm-4">
                                            <button type="button" onclick="initData()"
                                                    class="btn btn-lightBlue form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                       id="showListTable">
                                    <thead>
                                    <tr>
                                        <th>列表名称</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    
                                    </tbody>
                                </table>
                            </div>
                            <div id="processLink" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group col-md-7 col-sm-7 no-margin-right">
                                            <input class="form-control" id="basicsName" placeholder="环节名称" type="text" onkeydown="search()">
                                        </div>
                                        <div class="form-group col-md-3 col-sm-4">
                                            <button type="button" onclick="initBasics()"
                                                    class="btn btn-lightBlue form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                                        <div class="col-sm-6 pull-right text-right no-padding-right">
                                            <a class="btn increase addBtn">
                                                <i class="fa fa-plus"></i> 新增
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                       id="processLinkTable">
                                    <thead>
                                    <tr>
                                        <th>环节名称</th>
                                        <th>节点类型</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    
                                    </tbody>
                                </table>
                            </div>
                            <div id="processDefinition" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group col-md-7 col-sm-7 no-margin-right">
                                            <input class="form-control"  id="examFlowName" placeholder="流程名称" type="text" onkeydown="search()">
                                        </div>
                                        <div class="form-group col-md-3 col-sm-4">
                                            <button type="button" onclick="initFlow()"
                                                    class="btn btn-lightBlue form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                                        <div class="col-sm-6 pull-right text-right no-padding-right">
                                            <a class="btn increase addBtn">
                                                <i class="fa fa-plus"></i> 新增
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                       id="processDefinitionTable">
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>流程名称</th>
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
    </div>
</div>
 <%@ include file="../common/public_footer.jsp"%>           

<!--流程功能新增-->
<div class="modal fade processFunctionAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processFunctionAdd">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">类名：</label>
                        <div class="col-sm-8">
                            <input name="className" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">功能名称：</label>
                        <div class="col-sm-8">
                            <input name="buttonName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-3 col-sm-offset-4">
                            <button type="button" onclick="addButton()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--流程功能编辑-->
<div class="modal fade processFunctionEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processFunctionEdit">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">类名：</label>
                        <div class="col-sm-8">
                        	<input type="hidden" name="examFlowButtonId">
                            <input name="className" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">功能名称：</label>
                        <div class="col-sm-8">
                            <input name="buttonName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-3 col-sm-offset-4">
                            <button type="button" onclick="editButton()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--展示列表编辑-->
<div class="modal fade showListEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="showListEdit">
                    <div class="form-group">
                        <label class="control-label pull-left" style="margin-left: 15px;">列表名称：</label>
                        <div class="col-sm-10">
                            <input name="examFlowDataId" type="hidden" class="form-control">
                            <input name="dataName" class="form-control">
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                        <thead>
                        <tr>
                            <th>是否展示</th>
                            <th>是否查询条件</th>
                            <th>导出项</th>
                            <th>是否为按钮</th>
                            <th>显示字段名称</th>
                            <th>数据字段</th>
                        </tr>

                        </thead>
                        <tbody id="dataBody">
                        
                        </tbody>
                    </table>
                    <div class="form-group modal-footer">
                        <div class="col-sm-3 col-sm-offset-4">
                            <button type="button" onclick="editData()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--流程环节新增-->
<div class="modal fade processLinkAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processLinkAdd">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">环节名称：</label>
                        <div class="col-sm-8">
                            <input name="fullName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">环节类型：</label>
                        <div class="col-sm-8">
                            <select name="isParent" class="form-control">
                                <option value="1">父节点</option>
                                <option value="2">子节点</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-3 col-sm-offset-4">
                            <button type="button" onclick="addBasics()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--流程环节编辑-->
<div class="modal fade processLinkEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processLinkEdit">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">环节名称</label>
                        <div class="col-sm-8">
                        	<input name="examFlowBasicsId" type="hidden"/>
                            <input name="fullName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">环节类型</label>
                        <div class="col-sm-8">
                            <select name="isParent" class="form-control">
                                <option value="1">父节点</option>
                                <option value="2">子节点</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-3 col-sm-offset-4">
                            <button type="button" onclick="editBasics()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--流程定义新增-->
<div class="modal fade processDefinitionAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processDefinitionAdd">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">流程名称</label>
                        <div class="col-sm-9">
                            <input name="examFlowName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="enable">
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                        <thead>
                        <tr>
                            <th>
                                <span>父节点</span>
                                <span class="parentNode">
                                     <i class="fa fa-plus success operate-btn"></i>
                                     <i class="fa fa-minus danger operate-btn"></i>
                                </span>
                            </th>
                            <th>子节点</th>
                            <th>功能</th>
                        </tr>

                        </thead>
                        <tbody id="addFolwTbody">
                        <tr parent-tr="parent-1">
                            <td width="20%" rowspan="1">
                                <select name="parent" class="form-control" id="parent">
                                   
                                </select>
                            </td>
                            <td width="40%">
                                <div class="col-sm-11 no-padding">
                                    <select name="child" class="form-control" id="child">
                                    
                                    </select>
                                </div>
                                <label class="control-label pull-left childNode">
                                    <a class="fa fa-plus success operate-btn"></a>
                                </label>
                            </td>
                            <td width="40%">
                                <select name="button" id="button"  class="form-control selectpicker" multiple>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" onclick="addFolw()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--流程定义编辑-->
<div class="modal fade processDefinitionEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processDefinitionEdit">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">流程名称</label>
                        <div class="col-sm-9">
                        	<input type="hidden" name="examFlowId" />
                            <input name="examFlowName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="enable">
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                        <thead>
                        <tr>
                            <th>
                                <span>父节点</span>
                                <span class="parentNode">
                                     <i class="fa fa-plus success operate-btn"></i>
                                     <i class="fa fa-minus danger operate-btn"></i>
                                </span>
                            </th>
                            <th>子节点</th>
                            <th>功能</th>
                        </tr>

                        </thead>
                        <tbody id="editTbody">
                        
                        </tbody>
                    </table>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" onclick="editFolw()" class="btn btn-primary form-control save-dictionary">确定</button>
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

<!--流程定义查看-->
<div class="modal fade processDefinitionView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="processDefinitionView">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">流程名称</label>
                        <div class="col-sm-9">
                            <input name="examFlowName" class="form-control" readonly="readonly">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="enable" disabled="disabled">
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                        <thead>
                        <tr>
                            <th>父节点</th>
                            <th>子节点</th>
                            <th>功能</th>
                        </tr>

                        </thead>
                        <tbody id="viewTbody">
                        
                        </tbody>
                    </table>
                    <div class="form-group modal-footer"></div>
                </form>
            </div>
        </div>
    </div>
</div>


<script src="${ctx_static }/home/productModule/js/examinationProcess.js?v=<%=Math.random() %>"></script>
