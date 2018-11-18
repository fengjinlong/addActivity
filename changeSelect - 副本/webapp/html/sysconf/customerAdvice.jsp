<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">
<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/zhidu.css">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
           <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">反馈管理</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                 	<div class="row row_padding form-horizontal">
		                 <div class="col-md-5 col-sm-5 col-xs-12 no-padding-left">
		                     <!-- <div class="col-md-6 col-sm-4 no-margin-right">
		                         <input id="theme" type="text" class="form-control" name="searchVal"
		                                placeholder="反馈主题" onkeydown="search();">
		                     </div>
		                     <div class="col-lg-3 col-md-3 col-sm-4">
		                         <a type="button" href="javascript:InitiateSimpleDataTable.init();"
		                                 class="btn increase form-control search-btn">
		                                 <i class="fa fa-search"></i> 搜索
		                         </a>
		                     </div> -->
		                 </div>


		                 <div class="col-md-7 col-sm-3 col-xs-12 btn-group">
		                <%--  <span class="btn btn-default pointer"
		                       title="View print view"><span>打印</span></span>
		                     <div class="btn-group">
		                         <button type="button" class="btn btn-default dropdown-toggle"
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
		                     <shiro:hasPermission name="institution:add"> --%>
		                     
		                 	<%-- </shiro:hasPermission> --%>
		                 </div>
            	 	</div>
                    
                    <div class="dataTables_wrapper form-inline no-footer">
                        <table id="myTable" class="table table-striped table-hover table-bordered dataTable no-footer margin-top-10">
                            <thead>
                             <tr role="row">
                             	<th>反馈类型</th>
                             	<th>反馈主题</th>
                             	<th>反馈人</th>
                                 <th>反馈日期</th>
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
            	<input type="hidden" name="customerAdviceId"/>
                <div class="form-group">
	                <label class="col-sm-2 control-label no-padding-right">主题
						<span class="control-label mandatory">*</span>
					</label>
	                 <div class="col-sm-9">
	                    <input  name="title" readonly="readonly"  class="form-control"></input>
	                 </div>
                </div>
                
                <div class="form-group">
                	<label class="col-sm-2 control-label no-padding-right">反馈人
						<span class="control-label mandatory">*</span>
					</label>
	                 <div class="col-sm-9">
	                    <input  name="createUserName" readonly="readonly"  class="form-control"></input>
	                 </div>
                </div>

               <div class="form-group">
                    <label class=" col-sm-2 control-label no-padding-right no-padding-left">反馈类型
						<span class="control-label mandatory">*</span>
					</label>
                    <div class="col-sm-9">
                        <input  name="type" readonly="readonly"  class="form-control"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-2 control-label no-padding-right no-padding-left">反馈详情
						<span class="control-label mandatory">*</span>
					</label>
                    <div class="col-sm-9" id="contentHtml">
                    	
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-2 control-label no-padding-right">回复
						<span class="control-label mandatory">*</span>
					</label>
                    <div class="col-sm-9">
                           <!-- 富文本编辑器 -->
						  <textarea name="content" style="width:668px;height:340px;visibility:hidden;"></textarea>
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
<script src="${ctx_static }/home/sysconf/js/customerAdvice.js?v_<%=Math.random()%>"></script> 

