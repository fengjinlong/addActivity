<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/rewards.css">

<style>
nav-tabs > li {
    margin-bottom: -2px !important;
}
</style>
    <div class="row page-wrapper">
      <div class="col-lg-12 col-sm-12 col-xs-12">
          <div class="widget">
                <div class="widget-header bordered-bottom bordered-blue">
                 	<span class="widget-caption">奖惩明细</span>
            	</div>
              <!--Widget Header-->
              <div class="widget-body">
                  <div class="widget-main ">
                      <div class="tabbable">
                      <input type="hidden" id="currentRewardOrPunish" value="1">
                          <ul class="nav nav-tabs tabs-flat">
                              <li class="active">
                                  <a data-toggle="tab" onclick="changeCurrent('1')" href="#rewards">奖励</a>
                              </li>
                              <li>
                                  <a data-toggle="tab" onclick="changeCurrent('2')" href="#punishment">惩罚</a>
                              </li>
                          </ul>
                          <div class="tab-content tabs-flat">
                            <div id="rewards" class="tab-pane in active">
                            <div class="row  row_padding form-horizontal">
                                <div class="col-sm-12">
                                    <div class="col-md-5 col-sm-5">
                                        <div class="pull-left form-group">
                                            <select class="form-control dateSearch" id="dateSearch">
                                                <option value="">--请选择日期--</option>
                                                <option value="eventDate">事件日期</option>
                                                <option value="commitDate">提交日期</option>
                                                <option value="effectDate">生效日期</option>
                                            </select>
                                        </div>
                                        <div class="col-md-7 col-sm-7 margin-left-15">
                                            <div class="input-group date">
                                                <input type="text" class="form-control"
                                                       id="duration">
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5 col-sm-5">
                                        <div class="form-group col-md-10 col-sm-10 no-margin-right">
                                            <input type="text" class="form-control searchVal"
                                                   placeholder="所属分校/所属部门/奖励类型/受奖人" onkeydown="search()">
                                        </div>
                                        <div class="form-group pull-left margin-left-10">
                                            <button type="button"
                                                    class="btn btn-lightBlue form-control search-btn" data-id="rewardPunishs">
                                                    <i class="fa fa-search"></i>	搜索
                                            </button>
                                        </div>
                                    </div>
                                    <div class="pull-right">
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
                                                <li><a target="download" href="${ctx }/rewardPunish/downloadPDF/1">保存PDF</a></li>
                                                <li><a href="${ctx }/rewardPunish/downloadExcel/1">导出EXCEL</a></li>
                                                <li><a href="${ctx }/rewardPunish/downloadCSV/1">导出CSV</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
<!-- 									奖励展示 -->
                                  <div class="dataTables_wrapper form-inline no-footer">
                                      <table id="rewardPunishs" class="table table-striped table-hover table-bordered dataTable no-footer">
                                          <thead>
                                          <tr role="row">
                                              <th width="5%">
                                                  <label>
                                                      <input type="checkbox" class="master1">
                                                      <span class="text"></span>
                                                  </label>
                                              </th>
                                              <th>归属分校</th>
                                              <th>归属部门 </th>
                                              <th>奖励类别</th>
                                              <th>事件日期</th>
                                              <th>提交日期</th>
                                              <th>受奖人</th>
                                              <th>奖励金额</th>
                                              <th>生效日期</th>
                                              <th>操作</th>
                                          </tr>
                                          </thead>
                                          <tbody></tbody>
                                      </table>
                                  </div>
                              </div>

<!-- ================================处罚展示 =====================================-->
                              <div id="punishment" class="tab-pane">
                                  <div class="row row_padding form-horizontal">
                                  		<div class="col-sm-12">
                                            <div class="col-md-5 col-sm-5">
                                                <div  class="pull-left form-group">
                                                    <select class="form-control dateSearch1" id="dateSearch1">
                                                        <option value="">--请选择日期--</option>
                                                        <option value="eventDate">事件日期</option>
                                                        <option value="commitDate">提交日期</option>
                                                        <option value="dealDate">处理日期</option>
                                                        <option value="effectDate">生效日期</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-7 col-sm-7 margin-left-15">
                                                    <div class="input-group date">
                                                        <input type="text" class="form-control"
                                                               id="duration1">
                                                        <span class="input-group-addon"><i
                                                                class="fa fa-calendar"></i></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-5 col-sm-5">
                                                <div class="form-group col-md-10 col-sm-10 no-margin-right">
                                                    <input type="text" class="form-control searchVal"
                                                           placeholder="所属分校/所属部门/处罚类别/违规人" onkeydown="search()">
                                                </div>
                                                <div class="form-group pull-left margin-left-10">
                                                    <button type="button"
                                                            class="btn btn-lightBlue form-control search-btn" data-id="punishRewards">
                                                        <i class="fa fa-search"></i>  搜索
                                                    </button>
                                                </div>
                                            </div>
                                          
                                                <div class="pull-right">
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
                                                            <li><a target="download" href="${ctx }/rewardPunish/downloadPDF/2">保存PDF</a></li>
                                                            <li><a href="${ctx }/rewardPunish/downloadExcel/2">导出EXCEL</a></li>
                                                            <li><a href="${ctx }/rewardPunish/downloadCSV/2">导出CSV</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            
                                        </div>
									</div>
                                  <table id="punishRewards" class="table table-striped table-hover table-bordered dataTable no-footer">
                                      <thead>
                                      <tr role="row">
                                          <th width="5%">
                                              <label>
                                                  <input type="checkbox" class="master2">
                                                  <span class="text"></span>
                                              </label>
                                          </th>
                                          <th>归属分校</th>
                                          <th>归属部门</th>
                                          <th>处罚类别</th>
                                          <th>事件日期</th>
                                          <th>提交日期</th>
                                          <th>处理日期</th>
                                          <th>违规人</th>
                                          <th>处罚金额</th>
                                          <th>生效日期</th>
                                          <th>操作</th>
                                      </tr>
                                      </thead>
                                        <tbody></tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!--Widget-->
              </div>
          </div>
      </div>
    </div>
<%@ include file="../common/public_footer.jsp"%>

<!--=================================奖励查看==============================-->
<div class="modal fade rewardView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="rewardView">
                    <input class="form-control" type="hidden" name="rewardId">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属分校</label>
                        <div class="col-sm-9">
                            <select name="departmentId1" class="form-control chosen-select"
                                    data-placeholder="--请选择--" tabindex="1" disabled>
                                    <option value="">--请选择--</option>
                                    <c:forEach var="item" items="${schoolList}">
		                                <option value="${item.departmentId}">
		                                	${item.fullName}
		                                </option>
	                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属部门</label>
                        <div class="col-sm-9">
                            <input class="form-control" name="departmentId2" data-placeholder="--请选择--" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 activityType">
                        <label class="control-label col-sm-3 no-padding-right">事件日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" name="eventDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 overlay">
                        <label class="control-label col-sm-3 no-padding-right">提交日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" name="submitDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 discount">
                        <label class="control-label col-sm-3 no-padding-right">被奖励人</label>
                        <div class="col-sm-9">
                            <select name="userId" class="form-control chosen-select"
                                    data-placeholder="--请选择--" tabindex="1" disabled>
                                  <!-- 这里需要像分校那样，从数据库里面取出 用户来初始化这个select -->
<!--                                    <option value="">--请选择--</option> -->
<%--                                     <c:forEach var="item" items="${userList}"> --%>
<%-- 		                                <option value="${item.userId}"> --%>
<%-- 		                                	${item.realName} --%>
<!-- 		                                </option> -->
<%-- 	                                </c:forEach> --%>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 ">
                        <label class="control-label col-sm-3 no-padding-right">奖励金额</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="rewardPunishPrice" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 ">
                        <label class="control-label col-sm-3 no-padding-right">生效日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" name="commndDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">奖励类别</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="jiangliType" name="rewardType" data-placeholder="--请选择--"  disabled>
<!--                                  <option value="0"></option> -->
<!--                                 <option value="1"></option>  -->
<!--                                  <option value="">--请选择--</option> -->
                                     <c:forEach var="item" items="${rewardCatelogylist}">
		                                <option value="${item.rewardId}">
		                                	${item.rewardType}
		                                </option>
	                                </c:forEach> 
                            </select>
                        </div>
                    </div>
                     <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
                        <div class="col-sm-10 textContent">
                            <textarea class="form-control" name="description"  rows="4" disabled></textarea>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
                        <div class="col-sm-10 textContent">
                            <textarea class="form-control awardCriterion" name="judgments" rows="4" disabled></textarea>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right labelText">备注</label>
                        <div class="col-sm-10 textContent">
                            <textarea class="form-control awardRemarkAdd" name="remark" id="awardRemark" style="width:684px;height:340px;" disabled></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

 <!--===================================================惩罚查看============================================-->
<div class="modal fade punishmentView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="punishmentView">
                    <input class="form-control" type="hidden" name="rewardId">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属分校</label>
                        <div class="col-sm-9">
                            <select name="departmentId1" class="form-control chosen-select"
                                    data-placeholder="--请选择--" tabindex="1" disabled>
                                    <option value="">--请选择--</option>
<%--                                     <c:forEach var="item" items="${schoolList}"> --%>
<%-- 		                                <option value="${item.departmentId}"> --%>
<%-- 		                                	${item.fullName} --%>
<!-- 		                                </option> -->
<%-- 	                                </c:forEach> --%>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">归属部门</label>
                        <div class="col-sm-9">
                            <input class="form-control" name="departmentId2" data-placeholder="--请选择--" disabled value="${sysDepartment.fullName }">
                        </div>
                    </div>
                    <div class="form-group col-sm-6 activityType">
                        <label class="control-label col-sm-3 no-padding-right">事件日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" name="eventDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 overlay">
                        <label class="control-label col-sm-3 no-padding-right">提交日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" name="submitDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 discount">
                        <label class="control-label col-sm-3 no-padding-right">被处罚人</label>
                        <div class="col-sm-9">
                            <select name="userealNamerId" class="form-control chosen-select"
                                    data-placeholder="--请选择--" tabindex="1" disabled>
                                  <!-- 这里需要像分校那样，从数据库里面取出 用户来初始化这个select -->
                                   <option value="">--请选择--</option>
<%--                                     <c:forEach var="item" items="${userList}"> --%>
<%-- 		                                <option value="${item.userId}"> --%>
<%-- 		                                	${item.realName} --%>
<!-- 		                                </option> -->
<%-- 	                                </c:forEach> --%>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 ">
                        <label class="control-label col-sm-3 no-padding-right">处罚金额</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="rewardPunishPrice" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 ">
                        <label class="control-label col-sm-3 no-padding-right">生效日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" name="commndDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">处罚类别</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="type" data-placeholder="--请选择--" disabled>
                                <!-- <option value="0"></option>
                                <option value="1"></option> -->
                                 <option value="">--请选择--</option>
<%--                                     <c:forEach var="item" items="${punishCatelogylist}"> --%>
<%-- 		                                <option value="${item.rewardId}"> --%>
<%-- 		                                	${item.rewardType} --%>
<!-- 		                                </option> -->
<%-- 	                                </c:forEach> --%>
                            </select>
                        </div>
                    </div>
                     <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right">处理日期</label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                 <input class="form-control date-picker" type="text" name="passDate" disabled>
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label pull-left" style="margin-left: 23px;">是否补贴分校</label>
                        <div class="col-sm-6">
                            <select class="form-control" name="isSubsidy" data-placeholder="--请选择--" disabled>
                                <option value="1">否</option>
                                <option value="0">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-3 no-padding">
                        <label class="control-label pull-left">金额</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="subsidyPrice" disabled>
                        </div>
                    </div>
                     <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right labelText">事件描述</label>
                        <div class="col-sm-10 textContent">
                            <textarea class="form-control" name="description"  rows="4" disabled></textarea>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right labelText">判断依据</label>
                        <div class="col-sm-10 textContent">
                            <textarea class="form-control awardCriterion" name="judgments" rows="4" disabled></textarea>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right labelText">备注</label>
                        <div class="col-sm-10 textContent">
                            <textarea class="form-control awardRemarkAdd" name="remark" id="punishRemark" style="width:684px;height:340px;" disabled></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="${ctx_static }/home/sysconf/js/rewards.js"></script>
<!-- form表单ajax提交 -->
<script src="${ctx_static }/dep/form/custom.jquery.form.js"></script>
<script src="${ctx_static }/dep/form/jquery.form.min.js"></script>

