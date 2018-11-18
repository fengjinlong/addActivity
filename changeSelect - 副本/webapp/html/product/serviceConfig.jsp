<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<style>
.hiddenCol {
	display: none;
}
.describe-text img{
	width:100px;
	height:100px;
	display:block
}
</style>

<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons"></div>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-sm-12 col-sm-12 col-xs-12">
							<div class="form-group col-sm-6 col-sm-7 no-margin-right">
								<input class="form-control" placeholder="服务名称/服务类型" type="text"
								 id="searchVal" name="searchVal" onkeydown="search(event);" />
							</div>
							<div class="form-group col-sm-3 col-sm-4">
								<button type="button" onclick="DataTable.init();"
									class="btn btn-blue form-control search-btn">
									<i class="fa fa-search"></i>搜索
								</button>
							</div>
							<div class="form-group col-sm-2 pull-right">
								<button type="button"
									class="btn btn-blue form-control search-btn"
									data-toggle="modal" data-backdrop="static"
									data-target=".newlyIncreased"> 新增  </button>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable no-footer"
								id="serviceConfig">
								<thead>
									<tr>
										<th>序号</th>
										<th>服务名称</th>
										<th>服务类型</th>
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
<!--新增-->
<div class="modal fade newlyIncreased in" id="addModel" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="addForm">
                    
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right margin-left">服务名称</label>
                        <div class="col-sm-10">
                            <input class="form-control" name="productServiceName" type="text">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right margin-left">服务类型</label>
                        <div class="col-sm-10">
                            <select class="form-control" name="serviceType">
                                <option value="1">标签类服务</option>
                                <option value="2" disabled>业务类服务</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                         <label class="control-label col-sm-2 no-padding-right margin-left">说明</label>
                         <div class="col-sm-10">
                             <textarea class="form-control rebuildRemark content" rows="6" id="rebuildRemark" name="productServiceDetail" style="width:668px;height:340px;"></textarea>
                         	
                         </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" id="addBtn" class="btn btn-primary btn-lg form-control">确认</button>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade redact in" id="editModel" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <input name="productServiceId" type="hidden" id="productServiceId"/>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="control-label col-sm-2 no-padding-right margin-left">服务名称</label>
                        <div class="col-sm-10">
                            <input class="form-control" name="productServiceName" type="text">
                        </div>
                    </div>

                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        <label class="control-label col-sm-2 no-padding-right margin-left">服务类型</label>
                        <div class="col-sm-10">
                            <select class="form-control" name="serviceType">
                                <option value="1">标签类服务</option>
                                <option value="2" disabled>业务类服务</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-sm-12 col-md-12">
                        <div class="form-group col-sm-12">
                            <label class="control-label col-sm-2 no-padding-right margin-left">说明</label>
                            <div class="col-sm-10">
                                <textarea class="form-control rebuildRemark content" rows="6" id="rebuildRemark" name="productServiceDetail" style="width:668px;height:340px;"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" id="editBtn" class="btn btn-primary btn-lg form-control">确认</button>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<!--查看-->
<div class="modal fade chakan in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body">
                <form method="" class="form-horizontal clearfix">

                    <div class="describe-box" style="padding:20px;background:#f5f5f5;width:100%;word-wrap:break-word; word-break:break-all;">
                        <h4 class="describe-title" style="font-size:20px;line-height:50px"></h4>
                        <h5 class="describe-genre" style="line-height:30px;color: #d1acac;font-size: 14px;"></h5>
                        <div class="describe-text">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>
<script>
    //初始化富文本框
   $.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
		KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
		Editor = KindEditor.create('textarea[class="rebuildRemark"]',{
			uploadJson:'${ctx }/file/uploadFile',
			resizeType:0,
			afterBlur: function(){
				this.sync();
			}
		});
	});
</script>
<!-- kindeditor -->
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>
<script src="${ctx_static }/home/configuration/js/serviceConfig.js?v_<%=Math.random()%>"></script>