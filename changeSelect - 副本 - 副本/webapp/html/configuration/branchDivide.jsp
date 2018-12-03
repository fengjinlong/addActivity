<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/configuration/css/branchDivide.css" rel="stylesheet">
<style>
.help-block{
	position: absolute;
}
</style>
        <div class="row animated zoomin">
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
                                <div class="col-md-3 col-sm-3 col-xs-12">
                                    <div class="form-group">
                                        <label class="pull-left control-label margin-left-15">日期</label>
                                        <div class="col-lg-10 col-md-9 col-sm-9">
                                            <div class="controls">
                                                <div class="input-group date">
                                                    <input type="text" class="form-control"
                                                           id="reservation" placeholder="请选择日期">
                                                    <span class="input-group-addon"><i
                                                            class="fa fa-calendar"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group col-md-8 col-sm-8 no-margin-right">
                                        <input type="text" class="form-control" id="searchVal"
                                               placeholder="类型名称/级别/班型/咨询者类型/系数" onkeydown="search();">
                                    </div>
                                    <div  class="form-group col-lg-3 col-md-4 col-sm-4">
                                        <button type="button" onclick="init()"
                                                class="btn increase form-control search-btn">
                                            	<i class="fa fa-search"></i> 搜索
                                        </button>
                                    </div>
                                </div>

                                <div class="col-md-3 col-sm-3 col-xs-12">
                                    <div class="btn-group">
                                            <span class="btn btn-default pointer"
                                                  title="View print view"><span>打印</span></span>
                                        <button type="button"
                                                class="btn btn-default dropdown-toggle"
                                                data-toggle="dropdown">
                                            导出
                                            <i class="fa fa-angle-up"></i>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="${ctx }/bizScale/downloadPDF">保存PDF</a></li>
                                            <li><a href="#">导出EXCEL</a></li>
                                            <li><a href="#">导出CSV</a></li>
                                        </ul>
                                    </div>
                                    <button class="btn increase pull-right col-sm-4"
                                            data-toggle="modal"
                                            data-target=".divideAdd" data-backdrop="static">
                                        <i class="fa fa-plus"></i> 新增
                                    </button>
                                </div>
                            </div>

                            <div class="dataTables_wrapper form-inline no-footer" id="divide_wrapper">
                                <div class="tabbable">
                                    <table class="table table-striped table-hover table-bordered dataTable no-footer" id="init">
                                        <thead>
                                        <tr role="row">
                                            <th width="5%"> 
                                                <label>
                                                    <input type="checkbox" class="master">
                                                    <span class="text"></span>
                                                </label>
                                            </th>
                                            <th>类型名称 </th>
                                            <th >归属 </th>
                                            <th>缴费方式 </th>
                                            <th>种类 </th>
                                            <th>项目 </th>
                                            <th>级别 </th>
                                            <th>班型 </th>
                                            <th>咨询者类型 
                                            </th>
                                            <th>开始日期 </th>
                                            <th>结束日期 </th>
                                            <th>系数 </th>
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
</div>

<!--新增-->
<div class="modal fade divideAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption" id="myModalLabel">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionAdd">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">类型名称</label>
                        <div class="col-sm-9">
                            <input type="text" name="projectType" class="form-control" >
                            <input id="addBeginTime" type="hidden" name="beginTime"  />
                            <input id="addEndTime" type="hidden" name="endTime"  />
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属</label>
                        <div class="col-sm-9">
                            <select name="belongTo" class="form-control">
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                                <option value="3">学慧网</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">缴费方式</label>
                        <div class="col-sm-9">
                            <select name="paymentWay" class="form-control">
                                <option value="1">汇款</option>
                                <option value="2">转账</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">种类</label>
                        <div class="col-sm-9">
                            <select id="addProjectTypeId" name="projectTypeId" class="form-control">
                                <option value="1">职业资格</option>
                                <option value="2">学历</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">项目</label>
                        <div class="col-sm-9">
                            <select id="addProjectId" name="projectId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">级别</label>
                        <div class="col-sm-9">
                            <select id="addProjectLevelId" name="projectLevelId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">班型</label>
                        <div class="col-sm-9">
                            <select id="addProjectClassId" name="projectClassId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">咨询者类型</label>
                        <div class="col-sm-9">
                            <select id="addStudentAttrId" name="studentAttrId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">起止日期</label>
                        <div class="col-sm-9">
                            <div class="input-group date">
                                <input type="text" class="form-control" id="reservation1">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">系数</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="ratio">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea class="form-control" rows="8" name="description"></textarea>
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

<!--查看-->
<div class="modal fade divideView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionCat">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">类型名称</label>
                        <div class="col-sm-9">
                            <input type="text" id="catProjectType" name="projectType" class="form-control" disabled>
                            <input id="catBeginTime" type="hidden" name="beginTime"  />
                            <input id="catEndTime" type="hidden" name="endTime"  />
                            <input id="catScaleId" type="hidden" name="scaleId"  />
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属</label>
                        <div class="col-sm-9">
                            <select name="belongTo" class="form-control" disabled>
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                                <option value="3">学慧网</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">缴费方式</label>
                        <div class="col-sm-9">
                            <input id="catPaymentWay" name="paymentWay" class="form-control" disabled>
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">种类</label>
                        <div class="col-sm-9">
                            <input id="catProjectTypeId" name="projectTypeId" class="form-control" disabled>
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">项目</label>
                        <div class="col-sm-9">
                            <input id="catProjectId" name="projectId" class="form-control" disabled>
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">级别</label>
                        <div class="col-sm-9">
                            <input id="catProjectLevelId" name="projectLevelId" class="form-control" disabled>
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">班型</label>
                        <div class="col-sm-9">
                            <input id="catProjectClassId" name="projectClassId" class="form-control" disabled>
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">咨询者类型</label>
                        <div class="col-sm-9">
                            <input id="catStudentAttrId" name="studentAttrId" class="form-control" disabled>
                               
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">起止日期</label>
                        <div class="col-sm-9">
                            <div class="input-group date">
                                <input type="text" class="form-control" id="reservation3" disabled>
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">系数</label>
                        <div class="col-sm-9">
                            <input id="catRatio" type="text" class="form-control" name="ratio" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea id="catDescription" class="form-control" rows="8" name="description" disabled></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade divideEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionUpdate">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">类型名称</label>
                        <div class="col-sm-9">
                            <input type="text" id="updateProjectType" name="projectType" class="form-control" >
                            <input id="updateBeginTime" type="hidden" name="beginTime"  />
                            <input id="updateEndTime" type="hidden" name="endTime"  />
                            <input id="updateScaleId" type="hidden" name="scaleId"  />
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属</label>
                        <div class="col-sm-9">
                            <select name="belongTo" class="form-control">
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                                <option value="3">学慧网</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">缴费方式</label>
                        <div class="col-sm-9">
                            <select id="updatePaymentWay" name="paymentWay" class="form-control">
                                <option value="1">汇款</option>
                                <option value="2">转账</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">种类</label>
                        <div class="col-sm-9">
                            <select id="updateProjectTypeId" name="projectTypeId" class="form-control">
                                <option value="1">学历</option>
                                <option value="2">职业资格</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">项目</label>
                        <div class="col-sm-9">
                            <select id="updateProjectId" name="projectId" class="form-control">
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">级别</label>
                        <div class="col-sm-9">
                            <select id="updateProjectLevelId" name="projectLevelId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">班型</label>
                        <div class="col-sm-9">
                            <select id="updateProjectClassId" name="projectClassId" class="form-control">
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">咨询者类型</label>
                        <div class="col-sm-9">
                            <select id="updateStudentAttrId" name="studentAttrId" class="form-control">
                               
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">起止日期</label>
                        <div class="col-sm-9">
                            <div class="input-group date">
                                <input type="text" class="form-control" id="reservation2">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">系数</label>
                        <div class="col-sm-9">
                            <input id="updateRatio" type="text" class="form-control" name="ratio">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right remarkText">备注</label>
                        <div class="col-sm-10 remarkContent">
                            <textarea id="updateDescription" class="form-control" rows="8" name="description"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control" >确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
<script src="${ctx_static }/home/configuration/js/branchDivide.js"></script>

