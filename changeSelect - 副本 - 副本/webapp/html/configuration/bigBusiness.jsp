<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.css">
<link href="${ctx_static }/dep/chosen/css/chosen.css" rel="stylesheet">
<link href="${ctx_static }/home/configuration/css/bigBusiness.css" rel="stylesheet">


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
              	<div class="tabbable">
               		<ul class="nav nav-tabs tabs-flat" id="myTab11">
	                      <li id="startupConfig1" class="active">
	                          <a  data-toggle="tab" href="#startupConfig1">大创业</a>
	                      </li>
	                      <li id="startupConfig2">
	                          <a  data-toggle="tab" href="#startupConfig2">小创业</a>
	                      </li>
                     </ul>
                     <div class="tab-content tabs-flat">
                     	<div id="startupConfig1" class="tab-pane in active">
	                     	<div class="row row_padding form-horizontal">
		                      	<div class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right" style="width:112px;">
		                             <button class="btn increase form-control"
		                                     data-toggle="modal" data-backdrop="static"
		                                     data-target=".bigBusinessAdd">
		                                 <i class="fa fa-plus"></i> 新增
		                             </button>
		                        </div>
	                    	</div>
		                    <div class="dataTables_wrapper form-inline no-footer">
		                            <table class="table table-striped table-hover table-bordered dataTable no-footer"
		                                   id="bigBusiness">
		                                <thead>
		                                <tr role="row" class="text-center">
		                                	<th>名称</th>
		                                    <th>分校</th>
		                                    <th>项目</th>
		                                    <th>品牌</th>
		                                    <th>状态</th>
		                                </tr>
		                                </thead>
		                                <tbody>
		                                </tbody>
		                            </table>
		                    </div>
                		</div>
                		<div id="startupConfig2" class="tab-pane">
                     		
                     	</div>
                     </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--新增-->
<div class="modal fade bigBusinessAdd" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="bigBusinessAdd">
                     <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">名称</label>
                        <div class="col-md-10 col-sm-10">
                            <input name="designation" class="form-control designation">
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">创业类型</label>
                        <div class="col-md-10 col-sm-10">
                            <select  name="type" class="form-control project"   title="--请选择--">
                            	<option value="1">大创业</option>
                            	<option value="2">小创业</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">分校</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="departmentId" class="selectpicker form-control branchSchool" multiple title="--请选择--"></select>
                            <input name="departmentName" type="hidden">
                        </div>
                    </div>
                     <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">项目</label>
                        <div class="col-md-10 col-sm-10">
                            <select  name="projectId" class="selectpicker form-control project"  multiple title="--请选择--"></select>
                            <input name="projectName" type="hidden">
                        </div>
                    </div>
                    <!-- <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">级别</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="level" class="form-control level chosen-select"  data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div> -->
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">品牌</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="brandId" class="selectpicker form-control" multiple title="--请选择--">
                            </select>
                            <input name="brandName" type="hidden">
                        </div>
                    </div>
                    <!-- <div class="form-group col-md-12 time-quantum">
                        <label class="control-label no-padding-right col-md-2">起止日期</label>
                        <div class="col-md-10 col-sm-10">
                             <div class="input-group date">
                                 <input type="text" name="duration" class="form-control duration" placeholder="请选择日期">
                                 <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                             </div>
                        </div>
                    </div> -->
                    <div class="form-group modal-footer margin-bottom-10">
                        <div class="col-sm-3" style="margin-left:155px;">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--查看-->
<div class="modal fade bigBusinessView" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="bigBusinessView">
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">分校</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="branchSchool" class="form-control branchSchool chosen-select" disabled
                                    data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">品牌</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="" class="selectpicker form-control" multiple disabled title="--请选择--">
                                <option value="1">智联</option>
                                <option value="2">理想</option>
                                <option value="3">远大</option>
                                <option value="4">中和</option>
                                <option value="5">学慧网</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">起止日期</label>
                        <div class="col-md-10 col-sm-10">
                            <div class="controls">
                                <div class="input-group date">
                                    <input type="text" class="form-control duration" disabled>
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>

<script src="${ctx_static }/home/configuration/js/bigBusiness.js"></script>

