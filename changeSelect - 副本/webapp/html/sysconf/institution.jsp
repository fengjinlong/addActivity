<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">
<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/zhidu.css">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
           <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">制度管理</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                 	<div class="row row_padding form-horizontal">
		                 <!-- <div class="col-md-4 col-sm-4 col-xs-12 no-padding-left">
		                      <div class="col-lg-4 col-md-4 col-sm-4">
		                     	<select class="form-control" id="dateId">
		                             <option value="">日期</option>
		                             <option value="1">发布日期</option>
		                             <option value="0">修改日期</option>
		                         </select>
		                      </div>
		                      <div class="col-lg-8 col-md-8 col-sm-8 no-padding-left">
		                          <div class="controls">
		                              <div class="input-group date">
		                                  <input type="text" class="form-control" id="reservation">
		                                  <span class="input-group-addon"><i
		                                          class="fa fa-calendar"></i></span>
		                              </div>
		                          </div>
		                      </div>
		                 </div>  -->

		                 <div class="col-md-5 col-sm-5 col-xs-12 no-padding-left">
		                     <div class="col-md-6 col-sm-4 no-margin-right">
		                         <input id="theme" type="text" class="form-control" name="searchVal"
		                                placeholder="公告主题" onkeydown="search();">
		                     </div>
		                     <!-- <div class="col-lg-3 col-md-4 col-sm-4 no-margin-right">
		                         <select class="form-control" id="type">
		                             <option value="">公告类型</option>
		                             <option value="1">通知</option>
		                             <option value="2">奖励</option>
		                             <option value="3">罚款</option>
		                         </select>
		                     </div> -->
		                     <div class="col-lg-3 col-md-3 col-sm-4">
		                         <a type="button" href="javascript:InitiateSimpleDataTable.init();"
		                                 class="btn increase form-control search-btn">
		                                 <i class="fa fa-search"></i> 搜索
		                         </a>
		                     </div>
		                 </div>
		                 <div class="col-md-7 col-sm-3 col-xs-12 btn-group">
		                     <span id="add" class="btn increase popup pull-right col-sm-4"  typee="1" > <i
		                             class="fa  fa-plus"></i> 新增</span>
		                 </div>
            	 	</div>
                    
                    <div class="dataTables_wrapper form-inline no-footer">
                        <table id="myTable" class="table table-striped table-hover table-bordered dataTable no-footer margin-top-10">
                            <thead>
                             <tr role="row">
                                 <th>发布日期</th>
                                 <th>公告发布人</th>
                                 <th>公告主题</th>
                                 <th>操作</th>
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
<%@ include file="../common/public_footer.jsp"%>

<!--新增、编辑弹窗-->
<div class="modal fade bs-example-modal-lg" id="myModel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">编辑规则信息</span>
            </div>
            <div class="modal-body  clearfix form-horizontal">
            
            <form id="addForm" class="form-horizontal" onsubmit="return addOrUpdateRecord();">
            	<input type="hidden" name="flagUnique"/>
            	<!-- <input type="hidden" name="type" value="1" /> -->
                <div class="form-group">
	                <label class="col-sm-2 control-label no-padding-right">主题
						<span class="control-label mandatory">*</span>
					</label>
	                 <div class="col-sm-9">
	                	<!-- <input readonly onclick="showMenu('company_id', 1)" id="company_id" name="company_id" class="form-control"></input>
	                    <input hidden id="companyId" name="companyId" ></input> -->
	                    <input  name="theme"  class="form-control"></input>
	                 </div>
                </div>
                
                <div class="form-group">
                	<label class="col-sm-2 control-label no-padding-right">部门
						<span class="control-label mandatory">*</span>
					</label>
	                 <div class="col-sm-9">
	                	<!-- <input readonly onclick="showMenu('department_id', 2)" id="department_id" name="department_id" class="form-control"></input>
	                    <input hidden id="departmentId" name="sysDepartment.departmentId" ></input> -->
	                    <select name="department" class="form-control selectpicker" multiple 
                                    title="--请选择--">
                        	
                        </select>
	                 </div>
                </div>

               <!--  <div class="form-group">
                    <label class=" col-sm-2 control-label no-padding-right no-padding-left">公告类型
						<span class="control-label mandatory">*</span>
					</label>
                    <div class="col-sm-9">
                        <select name="type" class="form-control">
                        	<option value="">--请选择--</option>
                        	<option value="1" selected>通知</option>
                        	<option value="2">奖励</option>
                        	<option value="3">罚款</option>
                        </select>
                    </div>
                </div>  -->

                <div class="form-group">
                    <label class=" col-sm-2 control-label no-padding-right">内容
						<span class="control-label mandatory">*</span>
					</label>
                    <div class="col-sm-9">
                        
                           <!-- 富文本编辑器 -->
						  <textarea name="content" style="width:668px;height:340px;visibility:hidden;"></textarea>
                          
                          <!-- <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="content"]',{
									uploadJson:'${ctx }/fil e/uploadFile',
									resizeType:0
								});
							});
                          </script>  --> 
                          <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="content"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0,
									afterBlur: function(){
										this.sync();
									}
								});
							}); 
	                      </script>                          
                           
                    </div>
                </div>

                <div class="form-group col-sm-12">
                    <div class="col-sm-2 col-sm-offset-4">
                    	<input type="submit" class="btn btn-primary form-control" value="确认"/>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                    </div>
                </div>
				
				</form>
				
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index: 999999">
	<ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
</div>

<!--查看-->
<div  id="checkModal" class="modal fade bs-example-modal-sm col-lg-12">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
            </div>
        </div>
    </div>
</div>

<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/institute.js?v_<%=Math.random()%>"></script> 
<%-- <script src="${ctx_static }/home/sysconf/js/zhidu.js?v-56565"></script>  --%>

