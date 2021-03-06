<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">合作模块配置</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-7 col-sm-7 no-margin-right">
								<input class="form-control" id="searchName" placeholder="模块名称" type="text">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<button type="button" onclick="init()" id="search"
									class="btn btn-lightBlue form-control search-btn">
									<i class="fa fa-search"></i> 搜索
								</button>
							</div>
						</div>
						<div
							class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
							<div class="col-sm-6 pull-right text-right no-padding-right">
								<button class="btn increase addBtn" data-toggle="modal"
									data-backdrop="static">
									<i class="fa fa-plus"></i> 新增
								</button>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer"
								id="cooperationModule">
								<thead>
									<tr>
										<th>模块名称</th>
										<th>状态</th>
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
<%@ include file="../common/public_footer.jsp"%>

<!--合作模块配置新增-->
<div class="modal fade cooperation-module-add" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="cooperationAdd">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">模块名称：</label>
                        <div class="col-sm-10">
                            <input name="financeServiceModularName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">服务场景：</label>
                        <div class="col-sm-10">
                            <select name="financeServiceConfIds"
                                    class="form-control selectpicker" multiple
                                    title="--请选择--" id="confs">
                                    
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">状态：</label>
                        <div class="col-sm-10">
                            <select name="enable" class="form-control">
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 hide">
                        <label class="control-label col-sm-2 no-padding-right">说明：</label>
                        <div class="col-sm-10">
                            <textarea class="form-control description" rows="8" name="description" style="width:668px;height:340px;"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control add-button" onclick="add()">确定</button>
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

<!--合作模块配置编辑-->
<div class="modal fade cooperation-module-edit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="cooperationEdit">
                <input type="hidden" id="financeServiceModularId" name="financeServiceModularId">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">模块名称：</label>
                        <div class="col-sm-10">
                            <input name="financeServiceModularName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">服务场景：</label>
                        <div class="col-sm-10">
                            <select name="financeServiceConfIds"
                                    class="form-control selectpicker" multiple
                                    title="--请选择--">
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">状态：</label>
                        <div class="col-sm-10">
                            <select name="enable" class="form-control">
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 hide">
                        <label class="control-label col-sm-2 no-padding-right">说明：</label>
                        <div class="col-sm-10">
                            <textarea class="form-control description" rows="8" name="description" style="width:668px;height:340px;"></textarea>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control add-button" onclick="edit()">确定</button>
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

<script src="${ctx_static }/home/cooperationModel/js/cooperationModel.js"></script>
