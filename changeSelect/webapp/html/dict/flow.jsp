<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/user.css">
<div class="row page-wrapper">
    <div class="col-xs-12 col-md-12">
        <div class="widget">
            <div class="widget-header ">
                <span class="widget-caption"></span>
                <div class="widget-buttons">
                </div>
            </div>
            <div class="widget-body">
                <div class="row row_padding">
                    <div class="col-md-6 col-sm-6 col-xs-12 col-padd">
                        <div class="form-group col-md-6 col-sm-4 no-margin-right">
                            <input type="text" class="form-control" placeholder="部门/职位/角色/姓名/用户名"  onkeydown="search()" id="searchVal">
                        </div>
                        <div class="form-group col-lg-2 col-md-3 col-sm-4">
                            <button type="button"  onclick="toSearch()" class="btn btn-lightBlue form-control search-btn">
                                   	<i class="fa fa-search"></i> 搜索
                                   </button>
                        </div>
                        <div class="form-group col-lg-1 col-md-2 col-sm-2  pull-right margin-right-5">
							<button class="btn increase pull-right form-control addBtn" data-toggle="modal" data-target=".subjectAdd" data-backdrop="static">
								<i class="fa fa-plus"></i> 新增
							</button>
						</div>
                     </div>
                       </div>
                       <div role="grid" id="expandabledatatable_wrapper"
                            class="dataTables_wrapper form-inline no-footer">
							<div class="table-scrollable">
                           <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
                               <thead>
                               <tr role="row">
                                   <th>序号 </th>
                                   <th>名称 </th>
                                   <th>状态 </th>
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
<input type="hidden" id="examFlowId">
<input type="hidden" id="examFlowName">
<%@ include file="../common/public_footer.jsp"%>


<!-- 基础权限 -->
<div class="modal fade buttonPermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">基础流程</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="buttonPermission">
					<div class="form-group col-md-5 col-sm-4 no-margin-right">
                            <input type="text" class="form-control" placeholder="流程名称"   id="updateFullName">
                    </div>
                    <div class="form-group col-md-12 col-sm-12 no-margin-right">
						<div class="col-sm-5 permissionTree">
						    <ul id="tree5" class="ztree"></ul>
						</div>
						<div class="col-sm-5 text-center pull-right permissionTree">
						    <ul id="tree6" class="ztree"></ul>
						    <div class="permission-btn">
						    	 <button class="btn btn-primary buttonBtn margin-top-10">保存</button>
						    </div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- 新增基础权限 -->
<div class="modal fade  add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增流程</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="addForm">
					<div class="form-group col-md-5 col-sm-4 no-margin-right">
                            <input type="text" class="form-control" placeholder="流程名称"   id="addFullName">
                    </div>
                    <div class="form-group col-md-12 col-sm-12 no-margin-right">
						<div class="col-sm-5 permissionTree">
						    <ul id="tree1" class="ztree"></ul>
						</div>
						<div class="col-sm-5 text-center pull-right permissionTree">
						    <ul id="tree2" class="ztree"></ul>
						    <div class="permission-btn">
						    	 <button class="btn btn-primary addTree  margin-top-10">保存</button>
						    </div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/dict/js/index.js"></script>
