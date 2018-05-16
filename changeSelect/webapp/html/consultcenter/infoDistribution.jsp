<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link rel="stylesheet" href="${ctx_static }/home/consultcenter/css/infoDistribution.css">
<div id="bodyDivAdm" class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
        	<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">信息分发中心</span>
            </div>
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="row row_padding form-horizontal clearfix">
                            <div class="col-md-3 col-sm-3 col-xs-12 form-group">
                                 <div class="col-md-9 col-sm-9 no-padding-right">
                                     <div class="input-group date">
                                         <input class="form-control" id="reservation1" type="text" placeholder="日期" >
                                         <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                     </div>
                                 </div>
                            </div>

                              <div class="col-md-4 col-sm-4 col-xs-12" style="width:400px;">
                                  <div class="form-group col-md-9 col-sm-9 no-margin-right" style="width:320px;">
                                      <input id="searchVal" class="form-control" placeholder="电话咨询师/分校/姓名/产品" type="text" onkeydown="search();">
                                  </div>
                                  <div class="form-group col-lg-3 col-md-3 col-sm-3">
                                      <button onclick="init()" type="button" class="btn increase search-btn">
                                      <i class="fa fa-search"></i>  搜索</button>
                                  </div>
                              </div>

                              <div class="pull-left consultant">
                                  <div class="form-group col-lg-7 col-md-7 no-padding choose-consultant" style="width:120px;margin-left:20px;">
                                      <select class="form-control chosen-select" data-placeholder="请选择咨询师" tabindex="1" id="status" name="status">
                                          <option value="0">请选择咨询师</option>
                                          <c:forEach var="e" items="${selectList }">
                                          	<option value="${e.userId }">${e.realName }</option>
                                          </c:forEach>
                                      </select>

                                  </div>
                                  <button onclick="toChooseAr()" class="btn btn-lightBlue padding-left-10 padding-right-10 distribution-consultant"> 分配咨询师</button>
                                  
                                 <!--  <button  class="btn increase col-lg-4 col-md-4  margin-left-10">
                                      	自动分配
                                  </button> -->
                                  
                              </div>
                              
                              <div class="btn-group pull-right">
                                      <!-- <span class="btn btn-default pull-left pointer" title="View print view"><span>打印</span></span>
                                      <div class="btn-group pull-left" style="margin-right:15px;">
                                          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出
                                              <i class="fa fa-angle-up"></i>
                                          </button>
                                          <ul class="dropdown-menu" role="menu">
                                              <li><a href="javascript:exportPDF();">导出PDF</a></li>
                                              <li><a href="javascript:exportExcel();">导出EXCEL</a></li>
                                              <li><a href="javascript:exportCSV();">导出CSV</a></li>
                                          </ul>
                                      </div> -->
                                  </div>
							
							</div>
							 <div class="row row_padding form-horizontal clearfix">					
								  <div class="col-sm-12 form-group  allocation">
										<div class="col-sm-2  no-padding" style="width:100px;">
											<div class="radio-inline">
												<label>
													<input onclick="init()" value="" class="colored-success" name="allocationStatus" type="radio" checked>
													<span class="text">全部</span>
												</label>
											</div>
										</div>
										<div class="col-sm-2  no-padding" style="width:146px">
											<div class="radio-inline">
												<label>
													<input onclick="init()" value="0" class="colored-success" name="allocationStatus" type="radio">
													<span class="text">已分配咨询师</span>
												</label>
											</div>
										</div>
										<div class="col-sm-2  no-padding">
											<div class="radio-inline">
												<label>
													<input onclick="init()" value="1" class="colored-success" name="allocationStatus" type="radio">
													<span class="text">未分配咨询师</span>
												</label>
											</div>
										</div>
									</div>
	                        </div>
							<div class="dataTables_wrapper form-inline no-footer">
                                <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                    <thead>
                                    <tr role="row">
                                        <th width="5%">
                                            <label>
                                                <input type="checkbox" class="master">
                                                <span class="text"></span>
                                            </label>
                                        </th>
                                        <th>分校 
                                        </th>
                                        <th>产品 
                                        </th>
                                        <th>学员姓名 
                                        </th>
                                        <th>所属项目组 
                                        </th>
                                        <th>所属咨询师 
                                        </th>
                                         <th>创建时间 
                                        </th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    </tbody>
                                </table>

                    </div>
                </div>
            </div>
            <!--Widget-->
        </div>
    </div>

</div>

<%@ include file="../common/public_footer.jsp"%>
<!--查看-->
<div class="modal fade viewInfo" id="viewInfo" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">咨询者信息</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix">
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">信息归属地：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control departmentName1" value="" id="departmentName1" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">电话归属地：</label>
                        <div class="col-sm-7">
                           <input type="text" class="form-control phoneBelongView" value="" id="phoneBelongView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">招生品牌：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control brandNameView" value="" id="brandNameView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">咨询者类型：</label>
                        <div class="col-sm-7">
                             <input type="text" class="form-control studentAttrName2" value="" id="studentAttrName2" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">媒体来源：</label>
                        <div class="col-sm-7">
                           <input type="text" class="form-control studentAttrName1" value="" id="studentAttrName1" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">关键词：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control keywordView" name="keywordView" id="keywordView" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">对话页面链接：</label>
                        <div class="pull-left col-md-9 col-sm-9">
                            <input type="text" class="form-control pageUrlView" name="pageUrlView" id="pageUrlView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">姓名：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control studentNameView" name="studentNameView" id="studentNameView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">电话：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control studentPhoneView" name="studentPhoneView" id="studentPhoneView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">性别：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control studentSexView" name="studentSexView" id="studentSexView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">微信：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control wechatView" name="wechatView" id="wechatView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">年龄：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control ageView" name="ageView" id="ageView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">QQ：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control tengXunView" name="tengXunView" id="tengXunView" disabled>
                        </div>
                    </div>
                    <!-- <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">咨询课程：</label>
                        <div class="col-sm-7">
                           <input type="text" class="form-control projectNameView" name="projectNameView" id="projectNameView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">课程级别：</label>
                        <div class="col-sm-7">
                             <input type="text" class="form-control projectLevelNameView" name="projectLevelNameView" id="projectLevelNameView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">最高学历：</label>
                        <div class="col-sm-7">
                           <input type="text" class="form-control studentAttrName3" value="" id="studentAttrName3" disabled>
                        </div>
                    </div> -->
                   <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">产品类型</label>
                        <div class="col-sm-7">
                           <input type="text" data-value="" class="form-control productModelNameView" name="productModelNameView" id="productModelNameView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">产品</label>
                        <div class="col-sm-7">
                            <input name="productNameView" id="productNameView" class="form-control productNameView" disabled>
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">备注：</label>
                        <div class="col-md-9 col-sm-9">
                            <input type="text" class="form-control notesView" name="notesView" id="notesView" disabled>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">对话记录：</label>
                        <div class="col-md-9 col-sm-9">
                            <!-- <textarea class="form-control conversationView" rows="8" id="conversationView" disabled></textarea> -->
                            <textarea name="conversation2" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          
                          <script>
                          var editor2;
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('textarea[name="conversation2"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0,
									readonlyMode : true
								});
							});
                          </script>   
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
var infoDisDep = "${dep}";
</script>

<script src="${ctx_static }/home/consultcenter/js/backProjectInfo.js"></script>
<script src="${ctx_static }/home/consultcenter/js/infoDistribution.js"></script>