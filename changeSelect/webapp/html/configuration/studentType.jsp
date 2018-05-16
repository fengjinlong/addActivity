<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/configuration/css/studentType.css" rel="stylesheet">

<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">

                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group col-md-offset-9 col-sm-9">
                            <span class="btn btn-default pointer"
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
                            <button class="btn increase  pull-right col-sm-4" data-toggle="modal"
                                    data-target=".studentTypeAdd" data-backdrop="static">
                                <i class="fa fa-plus"></i> 新增</button>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <div class="">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="studentType">
                                <thead>
                                <tr role="row">
                                    <th>分成学员类型</th>
                                    <th>分校创业类型</th>
                                    <th>咨询者类型</th>
                                    <th>发送方向</th>
                                    <th>接待人员归属</th>
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

<!--新增-->
<div class="modal fade studentTypeAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="studentTypeAdd">
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">分成学员类型</label>
                        <div class="col-md-9 col-sm-9">
                            <input name="typeName" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">分校创业类型</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="businessType" class="form-control">
                                <option value="1">大创业</option>
                                <!-- <option value="2">小创业</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">咨询者类型</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="studentAttrIds" class="selectpicker form-control" multiple title="--请选择--">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">发送方向</label>
                        <div class="col-md-9 col-sm-9">
                            <select class="form-control" name="sendWay">
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                            </select></div>
                    </div>

                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">接待人员归属</label>
                        <div class="col-md-9 col-sm-9">
                            <select class="form-control" name="receiveWay">
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2" style="margin-left: -40px;">备注</label>
                        <div class="col-md-10 col-sm-10">
                             <textarea name="content" class="form-control remark" style="width: 668px; height: 340px"></textarea>
                              <script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('#studentTypeAdd textarea[name="content"]',{
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
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control confirm-btn" data-toggle="modal" data-backdrop="static">确定
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--查看-->
<div class="modal fade studentTypeView" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="studentTypeView">
                	
                	<input type="hidden" name="typeId"/>
                
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">分成学员类型</label>
                        <div class="col-md-9 col-sm-9">
                            <input type="text" name="typeName" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">分校创业类型</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="businessType" class="form-control" disabled>
                                <option value="1">大创业</option>
                                <option value="2">小创业</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">咨询者类型</label>
                        <div class="col-md-9 col-sm-9">
                            <select name="studentAttrIds" class="selectpicker form-control" multiple title="--请选择--" disabled>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">发送方向</label>
                        <div class="col-md-9 col-sm-9">
                            <select class="form-control" name="sendWay" disabled>
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                            </select></div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-3">接待人员归属</label>
                        <div class="col-md-9 col-sm-9">
                            <select class="form-control" name="receiveWay" disabled>
                                <option value="1">集团</option>
                                <option value="2">分校</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2" style="margin-left: -40px;">备注</label>
                        <div class="col-md-10 col-sm-10">
                            <textarea name="content" class="form-control viewRemark" style="width: 668px; height: 340px"></textarea>
                            <script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editorV = KindEditor.create('#studentTypeView textarea[name="content"]',{
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
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control confirm-btn" data-toggle="modal" data-backdrop="static">确定
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<script src="${ctx_static }/home/configuration/js/studentType.js"></script>
