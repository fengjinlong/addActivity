<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/bodyPermission.css">
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">
<div class="clearfix" style="margin-bottom:150px">
    <div class="col-sm-12"  style="max-height:600px">
       <div class="widget role-data">
            <div class="widget-header">
                     <span class="widget-caption">角色列表</span>
                <div class="addRole">
                     <button type="button" class="btn btn-lightBlue " data-toggle="modal"
                             data-backdrop="static" data-target="#addRole">
                             <i class="fa fa-plus"></i> 新增角色
                     </button>
                 </div>
            </div>
            <div class="widget-body">
                <div class="col-sm-12">
                    <div class="form-group col-sm-4">
                        <input type="text" class="form-control" placeholder="职位名称/角色名称" id="selectTj" onkeydown="search()">
                    </div>
                    <div class="form-group col-sm-2">
                        <select class="form-control state-search" id="selectZt">
                            <option value="">状态</option>
                            <option value="1">启用</option>
                            <option value="0">禁用</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2 search-btn">
                        <a class="btn increase  search-btn" href="javascript:DataTable.init();">
                        	<i class="fa fa-search"></i>搜索
                        </a>
                    </div>
                </div>
                <div class="tables">
                <table id="roleTable" class="table table-striped table-hover table-bordered dataTable no-footer">
                    <thead>
                        <tr>
                            <th>职位名称</th>
                            <th>角色名称</th>
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
<%@ include file="../common/public_footer.jsp"%>

<!-- 新增角色 -->
<div class="modal fade" id="addRole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">新增角色</span>
            </div>
            <div class="modal-body clearfix">
                <form action="" class="form-horizontal clearfix" id="roleAddForm">
                    <div class="form-group col-sm-12">
                        <label class="col-sm-2 control-label no-padding-right">角色</label>
                        <div class="col-sm-9">
                            <input name="fullName" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="col-sm-2 control-label no-padding-right">编码</label>
                        <div class="col-sm-9">
                            <input name="code" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group modal-footer col-sm-12">
                       
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
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

<!-- 编辑角色 -->
<div class="modal quan-edit fade" tabindex="-1" role="dialog" id="updateRole"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form action="" class="form-horizontal clearfix" id="roleUpdateForm">
                    <div class="form-group col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">角色名称</label>
                        <div class="col-sm-9">
                        	<input type="hidden" name="roleId"/>
                            <input class="form-control" name="fullName" type="text">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">编码</label>
                        <div class="col-sm-9">
                            <input class="form-control" name="code" type="text">
                        </div>
                    </div>
                    <div class="form-group modal-footer col-sm-12">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
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

<!-- 权限授予 -->
<div class="modal grant fade" tabindex="-1" role="dialog" id="updateRole"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">权限授予（当前角色：<span class="role-name primary"></span>）</span>
            </div>
            <div class="modal-body clearfix">
                <div id="authorize-div" style="display: none">
                    <div class="permission-config">
	                    <div class="permission-content">
	                        <input type="hidden" class="role-id" />
	                        <ul id="permissionTree" class="ztree"></ul>
	                        <div class="col-md-4 save-box text-center">
	                            <button type="button" class="btn btn-primary form-control save" style="width:60px">保存</button>
	                        </div>
	                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- 数据集权限 -->
<div class="modal pagePermission fade" tabindex="-1" role="dialog" id="updateRole"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">权限授予（当前角色：<span class="role-name primary"></span>）</span>
            </div>
            <div class="modal-body clearfix">
            		<form class="form-horizontal" id="pagePermission">
                    <div class="permission-config">
	                    <div class="permission-content">
	                        <input type="hidden" class="role-id" />
	                        <ul id="tree3" class="ztree"></ul>
	                        <div class="col-md-4 save-box text-center">
	                            <button type="button" class="btn btn-primary form-control save" style="width:60px">保存</button>
	                        </div>
	                    </div>
                    </div>
				</form>
            </div>
        </div>
    </div>
</div>

<script>
//下拉框初始
$('.state-search').chosen({
    	'disable_search':true
    });

//角色表
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#roleTable').dataTable({
				"bAutoWidth" : false,
				"bFilter" : false,
				"iDisplayLength": 10, 
				"bPaginate":true,
				"bSort": false, //是否支持排序功能
				"bLengthChange": false, 
				"oLanguage" : {
					"sLengthMenu" : "每页显示 _MENU_ 条记录",
					"sZeroRecords" : "抱歉， 没有找到",
					"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
					"sInfoEmpty" : "",
					"sInfoFiltered" : "",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "前一页",
						"sNext" : "后一页",
						"sLast" : "尾页"
					},
					"sProcessing" : ""
				},
            	"sAjaxSource" : ctx+'/role/load',
            	"bDestroy" : true,
        		"bRetrieve" : false,
        		"bServerSide" : true,
        		"fnServerData" : retrieveData,
        		"aoColumns" : [
         			            {"mData": "sysDuty.fullName", 'sClass': "text-center"},
         			            {"mData": "fullName", 'sClass': "text-center"},
         			            {"mData": "enable", 'sClass': "text-center", "mRender":function(data, type, full ){
         			            	if(data==1){
           			          		  return '<a href="#" data-id="'+full.roleId+'" data-status="0" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>';
               			          	}else{
               			              return '<a href="#" data-id="'+full.roleId+'" data-status="1" class="btn btn-nouse btn-xs status-btn"><i class="fa fa-ban"></i> 禁用</a>';
               			          	}
         			            }},
         			            {"mData": "roleId", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
         			            	
				                	var pageBtn = '<a data-id="' +data+ '" data-role="'+full.fullName+'" class="page-btn" data-toggle="modal" data-target=".pagePermission" data-backdrop="static"><i class="fa fa-sitemap primary" data-toggle="tooltip" data-placement="top" data-original-title="数据范围权限" title="数据范围权限"></i></a>';
				                	var str =  '<a href="#" data-code="'+full.code+'" data-id="'+data+'" data-role="'+full.fullName+'" data-duty="'+full.sysDuty.fullName+'" data-dutyid="'+full.sysDuty.dutyId+'" class="role-edit" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'+
         			                '<a href="#" data-id="'+data+'" data-role="'+full.fullName+'"  class="authorizes" data-toggle="modal" data-backdrop="static" data-target=".grant"><i class="fa fa-lock primary" data-toggle="tooltip" data-placement="top" data-original-title="权限授予" title="权限授予"></i></a>';
				                    return pageBtn+str;
         			            }}
         			        ],
         			       "aoColumnDefs": [{
          		   	            sDefaultContent: '',
          		   	            aTargets: ['_all']
          		   	        }],
			})
            $('#roleTable_wrapper ul.pagination').css('float','right');
			//每页显示记录数
			$('.dataTables_length').remove();
			$('#roleTable_wrapper .dataTables_info').parent().removeClass('col-xs-6').addClass('col-xs-4');
			$('#roleTable_wrapper .dataTables_paginate').parent().removeClass('col-xs-6').addClass('col-xs-8');
		}
	}
}();
</script>

<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/bodyPermission.js?v_<%=System.currentTimeMillis()%>"></script>
