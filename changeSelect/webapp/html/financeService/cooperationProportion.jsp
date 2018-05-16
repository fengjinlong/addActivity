<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons"></div>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-8 col-sm-8 col-xs-12">
							<div
								class="form-group col-lg-4 col-md-6 col-sm-6 no-margin-right">
								<input class="form-control" id="key" placeholder="合作方/合作模式" type="text">
							</div>
							<div
								class="form-group col-lg-2 col-md-3 col-sm-3 no-margin-right"
								style="min-width: 120px">
								<select class="form-control" id="enable">
									<option value="">状态</option>
									<option value="1">启用</option>
									<option value="0">禁用</option>
								</select>
							</div>
							<div class="form-group col-md-3 col-sm-3">
								<button type="button" onclick="init()"
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
								id="cooperationProportion">
								<thead>
									<tr>
										<th>合作方</th>
										<th>起止日期</th>
										<th>合作模式</th>
										<th>产品名称</th>
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

<!--合作占比配置新增-->
<div class="modal fade proportion-add" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="proportionAdd">
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">合作模式：</label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="financeServicePatternId"  class="form-control chosen-select">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">合作方：</label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="schoolIdAndNames" multiple id="addSchoolId" class="form-control selectpicker">
                            </select>
                        </div>
                    </div>
                    <input type="hidden" name="financeServicePartnersId">
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">产品类型：</label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="productTypeId"  class="form-control chosen-select">

                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">产品：</label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="productIdAndNames" multiple id="addProductId" class="form-control selectpicker">
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
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">起止日期：</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input type="text" name="dateString" class="form-control duration">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">服务场景：</label>
                        <div class="col-sm-10 servicescape" id="confs">
                            
                            
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control add-button">确定</button>
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

<!--合作占比配置编辑-->
<div class="modal fade proportion-edit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="proportionEdit">
                    <input  type="hidden" name="financeServicePartnersScaleId" id="financeServicePartnersScaleId" >
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">起止日期：</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input type="text" name="dateString" class="form-control duration">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">服务场景：</label>
                        <div class="col-sm-10 servicescape" id="confsEdit">
                            
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control edit-button">确定</button>
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

<script src="${ctx_static }/home/cooperationModel/js/cooperationProportion.js"></script>