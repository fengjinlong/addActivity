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
                        <div class="col-md-9 col-sm-9 col-xs-12">
                           <!--  <div class="form-group col-md-4 col-sm-4 no-margin-right">
                                <div class="input-group">
                                    <input type="text" id="dateString" class="form-control duration" placeholder="日期">
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div> -->
                            <div class="form-group col-md-4 col-sm-4 no-margin-right">
                                <input class="form-control" placeholder="合作方/合作模式" id="key" type="text">
                            </div>
                            <div class="form-group col-md-2 col-sm-2 no-margin-right">
                                <select class="form-control" id="enable">
                                    <option value="">状态</option>
                                    <option value="1">启用</option>
                                    <option value="0">禁用</option>
                                </select>
                            </div>
                            <div class="form-group pull-left margin-left-10">
                                <button type="button" onclick="init()" class="btn btn-lightBlue form-control search-btn">
                                    <i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
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
                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="partnerCooperation">
                                <thead>
                                <tr>
                                    <th>合作方</th>
                                    <th>起止日期</th>
                                    <th>合作模式</th>
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

<!--合作方合作模式配置新增-->
<div class="modal fade partner-cooperation-add" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="partnerCooperationAdd">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作方：</label>
                        <div class="col-sm-10">
                            <select name="schoolId" class="form-control chosen-select">
                               
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作模式：</label>
                        <div class="col-sm-10">
                            <select name="financeServicePatternId"
                                    class="form-control chosen-select" >
                                    
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作起止日期：</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input type="text" class="form-control duration" name="dateString" placeholder="请选择起止日期">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
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
                        <label class="control-label col-sm-2 no-padding-right">说明：</label>
                        <div class="col-sm-10">
                            <textarea class="form-control description" rows="8" name="memo" style="width:668px;height:340px;"></textarea>
                        	<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									k2 = KindEditor.create('.partner-cooperation-add [name="memo"]',{
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
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" onclick="add()" class="btn btn-primary form-control add-button">确定</button>
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

<!--合作方合作模式配置编辑-->
<div class="modal fade partner-cooperation-edit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="partnerCooperationEdit">
                	<input type="hidden" id="financeServicePartnersId" name="financeServicePartnersId" /> 
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作方：</label>
                        <div class="col-sm-10">
                            <select name="schoolId" class="form-control chosen-select">
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作模式：</label>
                        <div class="col-sm-10">
                            <select name="financeServicePatternId"
                                    class="form-control chosen-select" >
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作起止日期：</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input type="text" class="form-control duration" name="dateString" placeholder="请选择起止日期">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
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
                        <label class="control-label col-sm-2 no-padding-right">说明：</label>
                        <div class="col-sm-10">
                            <textarea class="form-control description" rows="8" name="memo" style="width:668px;height:340px;"></textarea>
                        	<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									k1 = KindEditor.create('.partner-cooperation-edit [name="memo"]',{
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
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" onclick="edit()" class="btn btn-primary form-control add-button">确定</button>
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


<script src="${ctx_static }/home/cooperationModel/js/partnerCooperation.js"></script>
