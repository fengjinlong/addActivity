<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.css">
<link href="${ctx_static }/home/configuration/css/personnelMatch.css" rel="stylesheet">

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
                 <div class="widget-main ">
                     <div class="row row_padding form-horizontal">
                         <div class="col-md-6 col-sm-6 col-xs-12">
                             <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                              <select id="searchVal" class="form-control" onchange="search();">
                              	<option value="">请选择梯队</option>
                            <option value="0">第一梯队</option>
                            <option value="1">第二梯队</option>
                            <option value="2">第三梯队</option>
                            <option value="3">第四梯队</option>
                            <option value="4">第五梯队</option>
                            <option value="5">第六梯队</option>
                        </select>
                             </div>
                             <div class="form-group col-lg-2 col-md-4 col-sm-4">
                                 <a type="button" class="btn btn-blue form-control search-btn" href="javascript:DataTable.init();">
                               	  <i class="fa fa-search"></i> 搜索
                                 </a>
                             </div>
                         </div>
                         <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                             <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                             <div class="btn-group">
                                 <button type="button" class="btn btn-default dropdown-toggle"
                                         data-toggle="dropdown">导出
                                     <i class="fa fa-angle-up"></i>
                                 </button>
                                 <ul class="dropdown-menu" role="menu">
                                     <li><a href="#">保存PDF</a></li>
                                     <li><a href="#">导出EXCEL</a></li>
                                     <li><a href="#">导出CSV</a></li>
                                 </ul>
                             </div>
                             <button class="btn increase pull-right col-sm-4" data-toggle="modal"
                                     data-target=".matchAdd" data-backdrop="static" id="addModalButton">
                                 <i class="fa  fa-plust"></i> 新增
                             </button>
                         </div>
                     </div>
                     <table class="table table-striped table-hover table-bordered dataTable no-footer" id="personnelMatch">
                         <thead>
                         <tr role="row">
                             <th width="5%">
                                 <label>
                                     <input type="checkbox">
                                     <span class="text"></span>
                                 </label>
                             </th>
                             <th>部门 </span></th>
                             <th>所属梯队</span></th>
                             <th>操作</th>
                         </tr>
                         </thead>

                         <tbody>
                         </tbody>
                     </table>
					<input hidden id="deptName" value="${deptName }">
					<input hidden id="deptId" value="${deptId }">
                </div>

            </div>

        </div>
    </div>
</div>
<!--新增-->
<div class="modal fade matchAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="addModal">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="matchAdd" method="post">
                    <div class="form-group position-relative">
                        <label class="control-label col-sm-3 no-padding-right">所属项目组：</label>
                        <div class="col-sm-8 departmentId"></div>
                    </div>
                    <div class="form-group tidui">
                        <label class="control-label col-sm-3 no-padding-right">所属梯队：</label>
                        <div class="col-sm-8">
                            <select name="echelonId" class="form-control">
                                <option value="0">第一梯队</option>
                                <option value="1">第二梯队</option>
                                <option value="2">第三梯队</option>
                                <option value="3">第四梯队</option>
                                <option value="4">第五梯队</option>
                                <option value="5">第六梯队</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-4 col-sm-offset-3">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
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
<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index: 999999">
	<ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
</div>

<!--编辑-->
<div class="modal fade matchEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="editModal">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="matchEdit" method="post">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">所属项目组：</label>
                        <div class="col-sm-8">
                            <input class="form-control dptName" readonly="readonly"/>
                            <input type="hidden" name="departmentId"/>	
                        </div>
                    </div> 
                    
                    <div class="form-group tiduiupdm">
                    	
                        <label class="control-label col-sm-3 no-padding-right ">所属梯队：</label>
                        <div class="col-sm-8">
                            <select name="echelonId" class="form-control">
                                <option value="0">第一梯队</option>
                                <option value="1">第二梯队</option>
                                <option value="2">第三梯队</option>
                                <option value="3">第四梯队</option>
                                <option value="4">第五梯队</option>
                                <option value="5">第六梯队</option>
                            </select>
                        </div>
                    </div>
                   <!--  <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">人员1：</label>
                        <div class="col-sm-8">
                            <select name="" class="selectpicker form-control" multiple  title="负责城市">
                                <option value="0">北京</option>
                                <option value="1">天津</option>
                                <option value="3">上海</option>
                            </select>
                        </div>
                    </div> -->
                    <div class="form-group modal-footer">
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

<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>

<script src="${ctx_static }/home/configuration/js/personnelMatch.js"></script>