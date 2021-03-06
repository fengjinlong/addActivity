<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/configuration/css/entryForm.css" rel="stylesheet">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">基础服务配置</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="tabbable">
                       <ul class="nav nav-tabs tabs-flat">
                            <li class="active">
                                <a data-toggle="tab" href="#professional">
                                    	报名表说明
                                </a>
                            </li>
                             <li>
                                <a data-toggle="tab" href="#examConf">
                                   	 报考资料
                                </a>
                            </li>
                             <li>
                                <a data-toggle="tab" href="#examSubject">
                                   	 考试科目
                                </a>
                            </li>
                             <li>
                                <a data-toggle="tab" href="#examAllow">
                                   	 报考条件
                                </a>
                            </li>
                            
                        </ul>
                        <div class="tab-content">
                            <div id="professional" class="tab-pane in active clearfix">
                            <shiro:hasPermission name="bizConfig:add">
                                <button class="btn increase pull-right add-line-pro" data-toggle="modal" data-backdrop="static">
                                    <i class="fa fa-plus"></i> 新增
                                </button>
                            </shiro:hasPermission>    
                                <form action="" class="col-sm-12">
                                    <table class="table table-bordered table-hover dataTable no-footer add-table add-table-pro text-center">
                                        <thead>
                                            <tr role="row">
                                                <th>说明</th>
                                                <th>状态</th>
                                                <th width="20%">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <c:forEach items="${list1.results }" var="item">
                                        		<c:if test="${item.configType eq '1' }">
	                                        	  <tr>
	                                        	  	  <td class="id" style="display:none">${item.configId }</td>
	                                                <td class="desc text-left">
	                                                    ${item.configDesc }
	                                                </td>
	                                                <td>
	                                                		<c:if test="${item.enable eq '1' }">
	                                                			<span onclick="editEnable(0,'${item.configId}',this)" class="btn btn-xs btn-use"> <i class="fa fa-check-circle-o"></i>启用</span>
	                                                		</c:if>
	                                                		<c:if test="${item.enable eq '0' }">
	                                                			<span onclick="editEnable(1,'${item.configId}',this)" class="btn btn-xs btn-nouse"> <i class="fa fa-ban"></i>禁用</span>
	                                                		</c:if>
	                                                </td>
	                                                <td>
	                                                 <shiro:hasPermission name="bizConfig:edit">
	                                                     <a  data-configid="${item.configId }" class="edit"><i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>
	                                                 </shiro:hasPermission>
	                                                 <shiro:hasPermission name="bizConfig:delete">    
	                                                     <a  data-configid="${item.configId }" class="delete"><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>
	                                                 </shiro:hasPermission>	
	                                                </td>
	                                            </tr>
                                            </c:if>
                                        </c:forEach>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            
                            
                            <!-- 报考资料 -->
                            <div id="examConf" class="tab-pane clearfix">
								<shiro:hasPermission name="bizConfig:add">
									<button class="btn increase pull-right add-line-examConf"
										data-toggle="modal" data-backdrop="static">
										<i class="fa fa-plus"></i> 新增
									</button>
								</shiro:hasPermission>
								<form action="" class="col-sm-12">
									<table
										class="table table-bordered table-hover dataTable no-footer add-table add-table-examConf text-center">
										<thead>
											<tr role="row">
												<th>内容</th>
												<th>状态</th>
												<th width="20%">操作</th>
											</tr>
										</thead>
										<tbody>
											<c:forEach items="${list1.results }" var="item">
												<c:if test="${item.configType eq '5' }">
		                                        	  <tr>
		                                        	  	  <td class="id" style="display:none">${item.configId }</td>
		                                                <td class="desc text-left">
		                                                    ${item.configDesc }
		                                                </td>
		                                                
		                                                <td>
	                                                		<c:if test="${item.enable eq '1' }">
	                                                			<span onclick="editEnable(0,'${item.configId}',this)" class="btn btn-xs btn-use"> <i class="fa fa-check-circle-o"></i>启用</span>
	                                                		</c:if>
	                                                		<c:if test="${item.enable eq '0' }">
	                                                			<span onclick="editEnable(1,'${item.configId}',this)" class="btn btn-xs btn-nouse"> <i class="fa fa-ban"></i>禁用</span>
	                                                		</c:if>
	                                                </td>
		                                                
		                                                <td>
		                                                 <shiro:hasPermission name="bizConfig:edit">
		                                                     <a  data-configid="${item.configId }" class="edit"><i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>
		                                                 </shiro:hasPermission>
		                                                 <shiro:hasPermission name="bizConfig:delete">    
		                                                     <a  data-configid="${item.configId }" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>
		                                                 </shiro:hasPermission>
		                                                </td>
		                                            </tr>
		                                            </c:if>
											</c:forEach>
										</tbody>
									</table>
								</form>
							</div>
                            
                            
                             <!-- 报考资料 -->
                            <div id="examSubject" class="tab-pane clearfix">
								<shiro:hasPermission name="bizConfig:add">
									<button class="btn increase pull-right add-line-examSubject"
										data-toggle="modal" data-backdrop="static">
										<i class="fa fa-plus"></i> 新增
									</button>
								</shiro:hasPermission>
								<form action="" class="col-sm-12">
									<table
										class="table table-bordered table-hover dataTable no-footer add-table add-table-examSubject text-center">
										<thead>
											<tr role="row">
												<th>内容</th>
												<th>状态</th>
												<th width="20%">操作</th>
											</tr>
										</thead>
										<tbody>
											<c:forEach items="${list1.results }" var="item">
												<c:if test="${item.configType eq '6' }">
		                                        	  <tr>
		                                        	  	  <td class="id" style="display:none">${item.configId }</td>
		                                                <td class="desc text-left">
		                                                    ${item.configDesc }
		                                                </td>
		                                                
		                                                <td>
	                                                		<c:if test="${item.enable eq '1' }">
	                                                			<span onclick="editEnable(0,'${item.configId}',this)" class="btn btn-xs btn-use"> <i class="fa fa-check-circle-o"></i>启用</span>
	                                                		</c:if>
	                                                		<c:if test="${item.enable eq '0' }">
	                                                			<span onclick="editEnable(1,'${item.configId}',this)" class="btn btn-xs btn-nouse"> <i class="fa fa-ban"></i>禁用</span>
	                                                		</c:if>
	                                                </td>
		                                                
		                                                <td>
		                                                 <shiro:hasPermission name="bizConfig:edit">
		                                                     <a  data-configid="${item.configId }" class="edit"><i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>
		                                                 </shiro:hasPermission>
		                                                 <shiro:hasPermission name="bizConfig:delete">    
		                                                     <a  data-configid="${item.configId }" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>
		                                                 </shiro:hasPermission>
		                                                </td>
		                                            </tr>
		                                            </c:if>
											</c:forEach>
										</tbody>
									</table>
								</form>
							</div>
							
							
							
							 <!-- 报考资料 -->
                            <div id="examAllow" class="tab-pane clearfix">
								<shiro:hasPermission name="bizConfig:add">
									<button class="btn increase pull-right add-line-examAllow"
										data-toggle="modal" data-backdrop="static">
										<i class="fa fa-plus"></i> 新增
									</button>
								</shiro:hasPermission>
								<form action="" class="col-sm-12">
									<table
										class="table table-bordered table-hover dataTable no-footer add-table add-table-examAllow text-center">
										<thead>
											<tr role="row">
												<th>内容</th>
												<th>状态</th>
												<th width="20%">操作</th>
											</tr>
										</thead>
										<tbody>
											<c:forEach items="${list1.results }" var="item">
												<c:if test="${item.configType eq '7' }">
		                                        	  <tr>
		                                        	  	  <td class="id" style="display:none">${item.configId }</td>
		                                                <td class="desc text-left">
		                                                    ${item.configDesc }
		                                                </td>
		                                                
		                                                <td>
	                                                		<c:if test="${item.enable eq '1' }">
	                                                			<span onclick="editEnable(0,'${item.configId}',this)" class="btn btn-xs btn-use"> <i class="fa fa-check-circle-o"></i>启用</span>
	                                                		</c:if>
	                                                		<c:if test="${item.enable eq '0' }">
	                                                			<span onclick="editEnable(1,'${item.configId}',this)" class="btn btn-xs btn-nouse"> <i class="fa fa-ban"></i>禁用</span>
	                                                		</c:if>
	                                                </td>
		                                                
		                                                <td>
		                                                 <shiro:hasPermission name="bizConfig:edit">
		                                                     <a  data-configid="${item.configId }" class="edit"><i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>
		                                                 </shiro:hasPermission>
		                                                 <shiro:hasPermission name="bizConfig:delete">    
		                                                     <a  data-configid="${item.configId }" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>
		                                                 </shiro:hasPermission>
		                                                </td>
		                                            </tr>
		                                            </c:if>
											</c:forEach>
										</tbody>
									</table>
								</form>
							</div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
<%@ include file="../common/public_footer.jsp"%>

<script src="${ctx_static }/home/configuration/js/entryForm.js?v=+<%=Math.random() %>"></script>
