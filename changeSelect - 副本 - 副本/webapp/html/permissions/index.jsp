<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/user.css?v-<%=System.currentTimeMillis()%>">
<div class="row page-wrapper">
    <div class="col-xs-12 col-md-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 	<span class="widget-caption">用户权限</span>
            </div>
            <div class="widget-body">
                <div class="row row_padding">
                    <div class="col-md-3 col-sm-3 col-xs-12 form-horizontal">
                        <div class="form-group no-padding-left">
                            <label class="pull-left control-label margin-left-15">日期</label>
                            <div class="col-sm-10">
                                <div class="controls">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                           id="reservation">
                                        <span class="input-group-addon"><i
                                                class="fa fa-calendar"></i></span>
                                                </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6 col-sm-6 col-xs-12 col-padd">
                        <div class="form-group col-md-6 col-sm-4 no-margin-right">
                            <input type="text" class="form-control" placeholder="部门/职位/角色/姓名/用户名"  onkeydown="search()" id="searchVal">
                        </div>
                        <!-- <div class="form-group col-lg-2 col-md-4 col-sm-4 no-padding-right">
                            <select class="form-control state-search" id="enable">
                                <option value="">状态</option>
                                <option value="1">生效</option>
                                <option value="0">废除</option>
                            </select>

                        </div> -->
                        <div class="form-group col-lg-2 col-md-3 col-sm-4">
                            <button type="button"  onclick="toSearch()" class="btn btn-lightBlue form-control search-btn">
                                   	<i class="fa fa-search"></i> 搜索
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
                                   <th>用户名</th>
                                   <th>姓名 </th>
                                   <th>性别</th>
                                   <th>部门 </th>
                                   <th>职位 </th>
                                   <th>角色 </th>
                                   <th>创建时间 </th>
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
<input type="hidden" id="userId">
<%@ include file="../common/public_footer.jsp"%>

<!-- 数据集权限 -->
<div class="modal fade dataPermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">数据集权限</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="dataPermission">
					<div class="col-sm-5 permissionTree">
					    <ul id="tree1" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree">
					    <ul id="tree2" class="ztree"></ul>
					    <div class="permission-btn">
					    	 <button class="btn btn-primary dataBtn margin-top-10">保存</button>
					    </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 页面权限 -->
<div class="modal fade pagePermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">页面权限</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="pagePermission">
				<div class="col-sm-5 permissionTree">
					    <ul id="tree3" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree">
					    <ul id="tree4" class="ztree"></ul>
					    <div class="permission-btn">
					    	 <button class="btn btn-primary pageBtn margin-top-10">保存</button>
					    </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 按钮权限 -->
<div class="modal fade buttonPermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">按钮权限</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="buttonPermission">
					<div class="col-sm-5 permissionTree">
					    <ul id="tree5" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree">
					    <ul id="tree6" class="ztree"></ul>
					    <div class="permission-btn">
					    	 <button class="btn btn-primary buttonBtn margin-top-10">保存</button>
					    </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 产品权限 -->
<div class="modal fade productPermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">产品权限</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="productPermission">
					<div class="col-sm-5 permissionTree">
					    <ul id="tree7" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree">
					    <ul id="tree8" class="ztree"></ul>
					    <div class="permission-btn">
					    	 <button class="btn btn-primary productBtn margin-top-10">保存</button>
					    </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/permissions/js/index.js?v-<%=System.currentTimeMillis()%>"></script>
