<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/position.css">
<div class="row page-wrapper">
	<div class="col-xs-12 col-md-12 department-list">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">职位管理</span>
            </div>
			<div class="widget-body">
				<div class="row row_padding form-horizontal">
					<div class="col-md-6 col-sm-6 col-xs-12">
						<div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
							<input id="searchVal" type="text" class="form-control" placeholder="职位名称" onkeydown="search();">
						</div>
						<div class="form-group col-lg-2 col-md-4 col-sm-4">
							<a type="button" class="btn btn-lightBlue form-control search-btn" href="javascript:DataTable.init();">
							 <i class="fa fa-search"></i> 搜索</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
						<!-- <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
						<div class="btn-group">
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出 <i class="fa fa-angle-up"></i></button>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">保存PDF</a></li>
								<li><a href="#">导出EXCEL</a></li>
								<li><a href="#">导出CSV</a></li>
							</ul>
						</div> -->
							<button class="btn increase pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target=".addPosition">
							    <i class="fa fa-plus"></i> 新增</button>
					</div>
				</div>
				<div role="grid" id="expandabledatatable_wrapper" class="dataTables_wrapper form-inline no-footer">
					<table class="table table-striped table-hover table-bordered dataTable no-footer" id="duty">
						<thead>
							<tr role="row">
								<th width="5%"><label> <input type="checkbox" class="checkAll"> <span class="text"></span></label></th>
								<th>职位编码</th>
								<th>职位名称</th>
								<th>上级职位</th>
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

<%@ include file="../common/public_footer.jsp"%>

<!--新增职位信息-->
<div class="modal fade addPosition" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="addPosition" method="post">  
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">编号
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input id="code" name="code" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">职位名称
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input id="fullName" name="fullName" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">简称
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input id="shortName" name="shortName" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">上级职位
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input id="parentId" name="parentFullName" class="form-control" readonly>
							<input id="addParentId" type="hidden" name="parentId" class="form-control">
							<input id="addFullPath" value="" type="hidden" name="fullPath" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">状态：</label>
						<div class="col-sm-8">
							<select id="enable" name="enable" class="form-control">
								<option value="1">启用</option>
								<option value="0">禁用</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12 describe">
						<label class="control-label col-sm-2 no-padding-right">描述：</label>
						<div class="col-sm-10">
							<textarea id="description" name="description" rows="8" class="form-control"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12 modal-footer">
					<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">创建</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index: 999999">
	<ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
</div>

<!--查看职位信息-->
<div class="modal fade viewPosition" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="viewPosition">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">编号：</label>
						<div class="col-sm-8">
							<input name="code" type="text" class="form-control" value="" disabled>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">职位名称：</label>
						<div class="col-sm-8">
							<input name="fullName" class="form-control" value="" disabled>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">简称：</label>
						<div class="col-sm-8">
							<input name="shortName" class="form-control" value="" disabled>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">状态：</label>
						<div class="col-sm-8">
							<select name="enable" class="form-control" disabled>
								<option value="1">启用</option>
								<option value="0">禁用</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12 describe">
						<label class="control-label col-sm-2 no-padding-right">描述：</label>
						<div class="col-sm-10">
							<textarea name="description" rows="8" class="form-control" disabled></textarea>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--编辑职位信息-->
<div class="modal fade editPosition" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="editPosition">
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">编号
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input name="code" type="text" class="form-control" value="">
							<input name="dutyId" type="hidden" value="">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">职位名称
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input name="fullName" class="form-control" value="">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">简称
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input name="shortName" class="form-control" value="">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">上级职位
<span class="control-label mandatory">*</span></label>
						<div class="col-sm-8">
							<input id="parentIds" name="parentFullName" class="form-control" readonly>
							<input type="hidden"  name="parentId" class="form-control">
							<input type="hidden"  name="fullPath" class="form-control">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label class="control-label col-sm-4 no-padding-right">状态：</label>
						<div class="col-sm-8">
							<select name="enable" class="form-control">
								<option value="1">启用</option>
								<option value="0">禁用</option>
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12 describe">
						<label class="control-label col-sm-2 no-padding-right">描述：</label>
						<div class="col-sm-10">
							<textarea name="description" rows="8" class="form-control"></textarea>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<div class="col-sm-2  col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">确定</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- <div id="editcontent" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index: 999999">
	<ul id="editajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
</div> -->

<!-- 类型权限 -->
<div class="modal fade dataPermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">类型权限</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="dataPermission">
					<div class="col-sm-5 permissionTree">
					    <ul id="tree1" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree">
					    <ul id="tree2" class="ztree"></ul>
					    <input type="hidden" id="treeDutyId">
					    <div class="permission-btn">
					    	 <button class="btn btn-primary dataBtn margin-top-10">保存</button>
					    </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 数据范围权限 -->
<div class="modal fade pagePermission" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">数据范围权限</span>
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

<script>


//加载职位信息
var DataTable = function(){
	return {
		init: function () {
			var dutyTable = $('#duty').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	//"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/duty/load',
        		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
        			"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
        		},
        		"aoColumns" : [
        			            {
        			                "mData": "dutyId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
        			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" value="'+data+'" class="checkchild" > <span class="text" ></span> </label>';
        			            }
        			            },
        			            {"mData": "code", 'sClass': "text-center"},
        			            {"mData": "fullName", 'sClass': "text-center"},
        			            {"mData": "parentName", 'sClass': "text-center"},
        			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
        			            	if(data==0){
        			          		  return '<span id="span'+full["dutyId"]+'" onclick="chooseDuty(\''+full["dutyId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
        			          	  }else{
        			          		  return '<span id="span'+full["dutyId"]+'" onclick="chooseDuty(\''+full["dutyId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
        			          	  }
        			            }},
        			            {
        			                "mData": "dutyId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                	var r = "<a href='#' data-record='" + JSON.stringify(full) + "' class='btn btn-warning btn-xs view' data-toggle='modal' data-target='.viewPosition' data-backdrop='static'><i class='fa fa-folder-open-o'></i>查看</a>";
        			                	var u = ''
        			                						+'<a onclick="edit(\''+full["dutyId"]
        			                						+'\',\''+full["code"]
					        			                	+'\',\''+full["fullName"]
					        			                	+'\',\''+full["shortName"]
        			                						+'\',\''+full["parentName"]
        			                						+'\',\''+full["parentId"]                                                                                  
        			                						+'\',\''+full["fullPath"]
					        			                	+'\',\''+full["enable"]
        			                						+'\',\''+full["description"]+'\')" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".editPosition" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'> <i class="fa fa-edit"></i> 编辑</a>'
        			                						+'';
        			                    return r+u;
        			                }
        			            }
        			        ],
        			        "aoColumnDefs": [{
        		   	            sDefaultContent: '',
        		   	            aTargets: ['_all']
        		   	        }],
        		   	     "fnRowCallback":function(nRow,aData,iDisplayIndex){
 			   	        	if(aData.parentName==''){
 			   	        		$('td:eq(3)',nRow).html('无上级职位');
 			   	        	}
 			   	        	return nRow;
 			   	        },
			});
		}
	}
}();


$('#expandabledatatable_wrapper').on('click','.dataTables_paginate .pagination li a',function(){
	$('.checkAll').attr('checked',false);
})



</script>

<!--Basic Scripts-->
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/position.js"></script> 

