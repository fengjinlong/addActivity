<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/serviceCenter/css/infoBulletin.css" rel="stylesheet" />

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
           	<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">信息公告</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group col-md-7 col-sm-7 no-margin-right">
                                <input class="form-control" placeholder="分校/课程/级别"
                                       type="text" onkeydown="search()" id="searchVal">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <button type="button"
                                        class="btn btn-lightBlue form-control search-btn" onclick="toSearch()">
                                        		<i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
                            <div class="col-sm-6 pull-right text-right no-padding-right">
                             <c:if test="${sessionScope.informationAdd eq '1' }">
                                <button class="btn increase"
                                        data-toggle="modal" data-backdrop="static"
                                        data-target="#newinformation" id="add">
                                        <i class="fa fa-plus"></i>	新增
                                </button></c:if>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-hover table-bordered dataTable no-footer"
                           id="init">
                        <thead>
                        <tr role="row" class="text-center">
                            <th>分校</th>
                            <th>项目</th>
                            <th>级别</th>
                            <th>类别</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade" id="newinformation" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="addForm" onsubmit="return validateForm();">
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label col-md-1 col-sm-1 no-padding-right margin-left">所属分校</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="departmentId" class="chosen-select form-control" id="departmentId"  data-placeholder="--请选择--"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label col-md-1 col-sm-1 no-padding-right margin-left">所属项目</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="projectId" class="form-control chosen-select" id="projectId" data-placeholder="--请选择--" tabindex="1">
                            	    <option value="-1"></option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label col-md-1 col-sm-1 no-padding-right margin-left">所属级别</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="levelId" class="form-control" id="levelId"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label col-md-1 col-sm-1  no-padding-right margin-left">所属类别</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="infoType" class="form-control">
                                <option value="1">考务信息</option>
                                <option value="2">公告信息</option>
                            </select>
                        </div>
                    </div>
                    	<div class="form-group col-sm-12 col-md-12">
                        	<label class="control-label col-md-1 col-sm-1 no-padding-right margin-left">备注</label>
                        	<div class="col-md-10">
	                       		<textarea name="content" class="form-control content" style="width: 100%; height: 400px; visibility: hidden;"></textarea>
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
                        <div class="form-group col-sm-12 modal-footer">
							<div class="col-sm-2 col-sm-offset-4">
								<input type="submit" class="btn btn-primary btn-lg btn-block" value="确认"/>
							</div>
							 <div class="col-sm-2">
								<a type="button" class="btn btn-danger btn-lg btn-block" data-dismiss="modal">取消</a>
							</div>
                        </div>
                </form>
            </div>

        </div>
    </div>
</div>

<!--查看-->
<div class="modal fade" id="newinformsee" tabindex="-1" role="dialog"
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
                <form class="form-horizontal clearfix" id="editForm" onsubmit="return editValidateForm();">
                	<input hidden name="infoId">
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label  pull-left" style="margin-left:44px;">所属分校</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="departmentId" class="form-control" disabled="disabled" id="departmentId2"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label  pull-left" style="margin-left:44px;">所属项目</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="projectId" class="form-control chosen-select" id="projectId2" disabled="disabled" data-placeholder="--请选择--" tabindex="1">
                            	<option value="-1"></option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label  pull-left" style="margin-left:44px;">所属级别</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="levelId" class="form-control" disabled="disabled" id="levelId2"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12">
                        <label class="control-label  pull-left"  style="margin-left:44px;">所属类别</label>
                        <div class="pull-left col-md-10 col-sm-10">
                            <select name="infoType" class="form-control" disabled="disabled">
                                <option value="1">考务信息</option>
                                <option value="2">公告信息</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 col-md-12">
                       	<label class="control-label  pull-left" style="margin-left:70px;">备注</label>
                       	<input hidden name="content" id="inputcontent">
                        <div class="col-md-10 col-sm-10">
                        	<textarea name="content2" class="form-control content" style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor2 = KindEditor.create('textarea[name="content2"]',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0
									});
								});
                          	</script> 
                        </div>  
                    </div>    
                    
                       <div class="form-group col-sm-12 modal-footer">
                       		<div class="col-sm-2  col-sm-offset-4">
								<input type="submit" class="btn btn-primary btn-lg btn-block" value="确认"/>
							</div>
                           <div class="col-sm-2">
								<a type="button" class="btn btn-danger btn-lg btn-block"  data-dismiss="modal">取消</a>
							</div>
                       </div>
                </form>
            </div>

        </div>
    </div>
</div>

<script src="${ctx_static }/home/serviceCenter/js/infoBulletin.js"></script>
