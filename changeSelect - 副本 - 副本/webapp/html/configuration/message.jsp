<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/configuration/css/activityManager.css">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			 <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">短信管理</span>
            </div>
			<div class="widget-body">
				<div class="widget-main ">
					<div class="tabbable">
						<ul class="nav nav-tabs tabs-flat" id="myTab">
							<li class="active"><a data-toggle="tab" href="#messageConf">信息参数</a></li>
							<li ><a data-toggle="tab" href="#message">短信模板</a></li>
						</ul>
						<div class="tab-content tabs-flat bordered-blue">
							<div  id="messageConf"  class="tab-pane in active">
								<div class="row row_padding form-horizontal">
									<div class="col-md-6 col-sm-6 col-xs-12">
										<div
											class="form-group col-lg-6 col-md-6 col-sm-6 no-margin-right">
											<input type="text" class="form-control"
												placeholder="名称" id="searchValDept" name="searchValDept" onkeydown="search();">
										</div>
										<div
											class="form-group col-lg-4 col-md-4 col-sm-4 no-margin-right">
											<select id="enable" name="enable" class="form-control">
												<option value="">状态</option>
												<option value="0">禁用</option>
												<option value="1">启用</option>
											</select>
										</div>
										<div class="form-group col-lg-2 col-md-2 col-sm-2">
											<a type="button" class="btn increase form-control search-btn" href="javascript:deptDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>


									<div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
										<button class="btn increase pull-right col-sm-4 deptCode-add"
											data-backdrop="static">
											导出 
										</button>
									</div>
								</div>
								<table id="deptTabCode" class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th>名称
											</th>
											<th>标签
											</th>
											<th>状态
											</th>
											<th>操作
											</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
							
							<div id="message" class="tab-pane in">
								<div class="row row_padding form-horizontal">
									<div class="col-md-8 col-sm-8 col-xs-8">
										<div class="form-group col-lg-4 col-md-4 col-sm-4 no-margin-right">
											<input type="text" class="form-control"
												placeholder="模板名称" id="searchVal" name="searchVal" onkeydown="search();">
										</div>
										<div
											class="form-group col-lg-2 col-md-2 col-sm-2 no-margin-right">
											<select id="status" name="status" class="form-control">
												<option value="">状态</option>
												<option value="0">禁用</option>
												<option value="1">启用</option>
											</select>
										</div>
										<div
											class="form-group col-lg-4 col-md-4 col-sm-4 no-margin-right">
											<select id="messageTypeSearch" name="messageTypeSearch" class="form-control">
												<option value="">类型</option>
												<option value="1">身份验证</option>
				                             	<option value="2">销售咨询</option>
				                             	<option value="3">教务通知</option>
											</select>
										</div>
										<div class="form-group col-lg-2 col-md-2 col-sm-2">
											<a type="button" class="btn increase form-control search-btn" href="javascript:cxDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>


									<div class="col-md-4 col-sm-4 col-xs-4 btn-group">
										<button class="btn increase pull-right col-sm-4 sales-add"
											data-toggle="modal" data-target=""
											data-backdrop="static">
											导出
										</button>
										
										<button class="btn increase pull-right col-sm-4 sales-add"
											data-toggle="modal" data-target=".salesPromotionAdd"
											data-backdrop="static">
											 <i class="fa fa-plus"></i> 新增
										</button>
									</div>
								</div>

								<table id="cuXiao" class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th style="width:20%">模板名称 
											</th>
											<th style="width:20%">短信类型 
											</th>
											<th style="width:30%">短信内容 
											</th>
											
											<th style="width:20%">启动状态
											</th>
											<th style="width:10%">操作</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--Widget-->
		</div>
	</div>
</div>

<%@ include file="../common/public_footer.jsp"%>

<!-- 编辑优惠额度 -->
<div class="modal fade deptCodeUpdate" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content youhuima">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="deptCodeUpdate" method="post">
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">名称</label>
						<input id="messageConfId" name="messageConfId" type="hidden" />
						<div class="col-sm-8">
							<input type="text" class="form-control amount" id="messageConfName" name="messageConfName"> 
						</div>
					</div>
					
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">标签</label>
						<div class="col-sm-8">
							<input readonly="readonly" type="text" class="form-control amount" id="messageLable" name="messageLable"> 
						</div>
					</div>
					
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">说明</label>
						<div class="col-sm-8">
							<textarea rows="4" class="form-control amount" id="code" name="code" ></textarea>
						</div>
					</div>
					
					<div class="form-group modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button onclick="updateConf()" type="button" class="btn btn-primary form-control">确定</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--新增短信模板-->
<div class="modal fade salesPromotionAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content cuXiao">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption" id="myModalLabel">新增</h4>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionAdd" method="post">
                
                		<div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">模板类型</label>
                        <div class="col-sm-8">
                             <select name="messageType" id="messageType" class="form-control productModelId chosen-select">
                             	<option value="1">身份验证</option>
                             	<option value="2">销售咨询</option>
                             	<option value="3">教务通知</option>
			                 </select>
                        </div>
                    </div>
                
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">模板名称</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="messageName" id="messageName">
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">短信合作方</label>
                        <div class="col-sm-8">
                             <select name="code" id="code" class="form-control productModelId chosen-select">
                             	<option value="10001">云片网</option>
                             	<option value="10002">阿里云</option>
                             	<option value="10003">腾讯</option>
			                 </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">所属角色</label>
                        <div class="col-sm-8">
						   <select id="dutySelect"  name="dutySelect"  class="form-control show-tick selectpicker" multiple title="角色" data-live-search="true">
                            </select>
                            <input type="hidden" name="dutys" />
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">模板内容</label>
                        <div class="col-sm-8">
                            <textarea class="form-control description" rows="8" name="messageContent" id="messageContent"></textarea>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                     	<label class="control-label col-sm-2 no-padding-right">信息参数</label>
                        <div class="col-sm-8 confSpaceAdd">
                        		
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                    <label class="control-label col-sm-2 no-padding-right"></label>
                    	<p class="tishi" style="color:red;font-size:12px;">*双击标签插入模板</p>
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
<!--编辑短信模板-->
<div class="modal fade salesPromotionEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="salesPromotionEdit" method="post">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">模板类型</label>
                        <div class="col-sm-8">
                        		<select name="messageType" id="messageType" class="form-control productModelId chosen-select">
                             	<option value="1">身份验证</option>
                             	<option value="2">销售咨询</option>
                             	<option value="3">教务通知</option>
			          		 </select>
			          		 <input hidden  name="messageId" />
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 ">
                        <label class="control-label col-sm-2 no-padding-right">模板名称</label>
                        <div class="col-sm-8">
                        		<input type="text" class="form-control" name="messageName" id="messageName">
                        </div>
                    </div>
                  	
                  	<div class="form-group col-sm-12 overlay">
                        <label class="control-label col-sm-2 no-padding-right">短信合作方</label>
                        <div class="col-sm-8">
                             <select name="code" id="code" class="form-control productModelId chosen-select">
                             	<option value="10001">云片网</option>
                             	<option value="10002">阿里云</option>
                             	<option value="10003">腾讯</option>
			                 </select>
                        </div>
                    </div>
                  
                    <div class="form-group col-sm-12 ">
                        <label class="control-label col-sm-2 no-padding-right">所属角色</label>
                        <div class="col-sm-8">
						   <select id="dutySelect"  name="dutySelect"  class="form-control show-tick selectpicker" multiple title="角色" data-live-search="true">
                            </select>
                            <input type="hidden" name="dutys" />
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                     	<label class="control-label col-sm-2 no-padding-right">模板内容</label>
                        <div class="col-sm-8 ">
                        		<textarea class="form-control description" rows="8" name="messageContent" id="messageContent"></textarea>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12">
                     	<label class="control-label col-sm-2 no-padding-right">信息参数</label>
                        <div class="col-sm-8 confSpace">
                        		
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
<script src="${ctx_static }/home/configuration/js/message.js?v=<%=Math.random() %>"></script>

