<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/configuration/css/activityManager.css">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			 <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">退费服务配置</span>
            </div>
			<div class="widget-body">
				<div class="widget-main ">
					<div class="tabbable">
						<ul class="nav nav-tabs tabs-flat" id="myTab">
							<li class="active"><a data-toggle="tab" href="#messageConf">环节配置</a></li>
							<li ><a data-toggle="tab" href="#message">流程配置</a></li>
						</ul>
						<div class="tab-content tabs-flat bordered-blue">
							<div  id="messageConf"  class="tab-pane in active">
								<div class="row row_padding form-horizontal">
									<div class="col-md-6 col-sm-6 col-xs-12">
										<div
											class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
											<input type="text" class="form-control"
												placeholder="名称" id="searchValDept" name="searchValDept" onkeydown="search();">
										</div>
										<div class="form-group col-lg-2 col-md-4 col-sm-4">
											<a  onkeydown="javascript:deptDataTable.init();"  type="button" class="btn increase form-control search-btn" href="javascript:deptDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>


									<div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
										<button class="btn increase pull-right col-sm-4 deptCode-add"
											data-toggle="modal" data-target=".deptCodeAdd"
											data-backdrop="static">
											 <i class="fa fa-plus"></i> 新增
										</button>
									</div>
								</div>
								<table id="deptTabCode" class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th>名称
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
									<div class="col-md-6 col-sm-6 col-xs-12">
										<div class="form-group col-md-6 col-sm-4 no-margin-right">
											<input type="text" class="form-control"
												placeholder="标题" id="searchVal" name="searchVal" onkeydown="search();">
										</div>
										
										<div class="form-group col-lg-2 col-md-3 col-sm-4">
											<a type="button" class="btn increase form-control search-btn" onkeydown="javascript:cxDataTable.init();" href="javascript:cxDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>


									<div class="col-md-6 col-sm-6 col-xs-12 btn-group">
										<!-- <button class="btn increase pull-right col-sm-4 sales-add"
											data-toggle="modal" data-target=".salesPromotionAdd"
											data-backdrop="static">
											导出
										</button> -->
										
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
											<th>流程名称 
											</th>
											<th>产品模型 
											</th>
											<th>状态
											</th>
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
			<!--Widget-->
		</div>
	</div>
</div>

<%@ include file="../common/public_footer.jsp"%>

<div class="modal fade deptCodeAdd" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content youhuima">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="deptCodeAdd" method="post">
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right pull-left">环节名称</label>
						<div class="col-sm-8">
							<input type="text" class="form-control amount" id="returnServicePointName" name="returnServicePointName"> 							
						</div>
					</div>
					<div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">状态</label>
                        <div class="col-sm-8">
                             <select name="enable" id="enable" class="form-control">
                             	<option value="1">启用</option>
                             	<option value="0">禁用</option>
			                 </select>
                        </div>
                    </div>
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">说明</label>
						<div class="col-sm-8">
							<textarea class="form-control" rows="3" id="memo" name="memo" ></textarea>
						</div>
					</div>
					<div class="form-group modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button type="submit" class="btn btn-primary form-control">确定</button>
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
						<input name="returnServicePointId" id="returnServicePointId" type="hidden" />
						<div class="col-sm-8">
							<input type="text" class="form-control amount" id="returnServicePointName" name="returnServicePointName"> 
						</div>
					</div>
					
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">状态</label>
						<div class="col-sm-8">
                             <select name="enable" id="enable" class="form-control">
                             	<option value="1">启用</option>
                             	<option value="0">禁用</option>
			                 </select>
                        </div>
					</div>
					
					<div class="form-group">
						<label class="control-label col-sm-3 no-padding-right">说明</label>
						<div class="col-sm-8">
								<textarea class="form-control" rows="3" id="memo" name="memo" ></textarea>
						</div>
					</div>
					
					<div class="form-group modal-footer">
						<div class="col-sm-3 col-sm-offset-3">
							<button type="submit" class="btn btn-primary form-control">确定</button>
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

<!--新增促销活动-->
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
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">流程名称</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="returnServiceFlowName" id="returnServiceFlowName">
                        </div>
                    </div>
                    
                    <!-- <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">状态</label>
                        <div class="col-sm-8">
                             <select name="enable" id="enable" class="form-control">
                             	<option value="1">启用</option>
                             	<option value="0">禁用</option>
			                 </select>
                        </div>
                    </div> -->
                    
                     <div class="form-group col-sm-12 overlay ">
                        <label class="control-label col-sm-2 no-padding-right">产品模型</label>
                        <div class="col-sm-8">
                             <select id="productModelId"  name="productModelId"  class="form-control show-tick selectpicker"  title="模型" data-live-search="true">
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 overlay ">
                        <label class="control-label col-sm-2 no-padding-right"></label>
                        <div class="col-sm-8">
						   <select   class="form-control childId"  title="环节" data-live-search="true">
						   		
                            </select>
                        </div>
                        <i class="fa fa-plus success operate-btn" style="line-height:34px"></i>
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
<!--编辑-->
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
                        <label class="control-label col-sm-2 no-padding-right">流程名称</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="returnServiceFlowName" id="returnServiceFlowName">
                            <input type="hidden" id="returnServiceFlowId" name="returnServiceFlowId" />
                        </div>
                    </div>
                    
                    <!-- <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">状态</label>
                        <div class="col-sm-8">
                             <select name="enable" id="enable" class="form-control">
                             	<option value="1">启用</option>
                             	<option value="0">禁用</option>
			                 </select>
                        </div>
                    </div> -->
                    
                     <div class="form-group col-sm-12 overlay ">
                        <label class="control-label col-sm-2 no-padding-right">产品模型</label>
                        <div class="col-sm-8">
                             <select   name="productModelId"  class="form-control show-tick selectpicker"  title="模型" data-live-search="true">
                            </select>
                        </div>
                        <i class="fa fa-plus success operate-btn" style="line-height:35px"></i>
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
<script src="${ctx_static }/home/product/js/returnServicePoint.js?v=<%=Math.random() %>"></script>

