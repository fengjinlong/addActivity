<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/user.css">
<div class="row page-wrapper">
    <div class="col-xs-12 col-md-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">用户管理</span>
            </div>
            <div class="widget-body">
                <div class="row row_padding">
                    <div class="col-md-4 form-horizontal">
                        <div class="form-group no-padding-left">
                            <label class="pull-left control-label margin-left-15">日期</label>
                            <div class="col-sm-10">
                                <div class="controls">
                                      <div class="input-group">
                                          <input type="text" class="form-control" id="reservation">
                              			   <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6 col-padd">
                        <div class="form-group col-md-5 col-sm-4 no-margin-right">
                            <input type="text" class="form-control" placeholder="部门/职位/角色/姓名/用户名"  onkeydown="search()" id="searchVal">
                        </div>
                        <div class="form-group col-md-2 no-padding-right">
                            <select class="form-control state-search" id="enable">
                                <option value="">状态</option>
                                <option value="1">启用</option>
                                <option value="0">禁用</option>
                            </select>

                        </div>
                        <div class="form-group col-md-2 col-sm-4">
                            <button type="button"  onclick="toSearch()" class="btn btn-lightBlue form-control search-btn">
                            	<i class="fa fa-search"></i> 搜索
                            </button>
                        </div>
                    </div>

                    <div class="col-md-2 btn-group">

                        <%-- <span class="btn btn-default pointer"
                              title="View print view"><span>打印</span></span>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle"
                                    data-toggle="dropdown">
                              		  导出
                                <i class="fa fa-angle-up"></i>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a target="download" href="${ctx }/user/downloadPDF">保存PDF</a></li>
                                <li><a href="${ctx }/user/downloadExcel">导出EXCEL</a></li>
                                <li><a href="${ctx }/user/downloadCSV">导出CSV</a></li>
                            </ul>
                        </div> --%>
                        
                        <a class="btn btn-primary" data-toggle="modal"  data-target=".addproductAll" onclick="permiPopUp();">产品权限</a>
                        
                        <a class="btn increase  pull-right col-lg-4" href="${ctx }/user/toAdd">
                        		<i class="fa fa-plus"></i> 新增 </a>
                     </div>
                       </div>
                       <div role="grid" id="expandabledatatable_wrapper"
                            class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
                           <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
                               <thead>
                               <tr role="row">
                                   <th width="5%">
                                       <label>
                                           <input  type="checkbox" class="master" >
                                           <span  class="text"></span>
                                       </label>
                                   </th>
                                   <th>用户名 <span class="fa indicator"></span></th>
                                   <th>姓名 <span class="fa indicator "></span></th>
                                   <th>性别</th>
                                   <th>部门 <span class="fa indicator "></span></th>
                                   <th>职位 <span class="fa indicator "></span></th>
                                   <th>角色 <span class="fa indicator "></span></th>
                                   <th>创建时间 <span class="fa indicator "></span></th>
                                   <th>状态 <span class="fa indicator "></span></th>
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
<%@ include file="../common/public_footer.jsp"%>

<!--修改密码-->
<div class="modal fade changeUserPassword" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">修改密码</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="changeUserPassword">
                	<input name="userId" type="hidden">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">新密码<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" name="newPassword" class="form-control"  maxlength="30">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">确认新密码<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" name="affirmPassword" class="form-control"  maxlength="30">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                     <div class="col-sm-3  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
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


<!-- 一键添加产品 -->
<div class="modal fade addproductAll" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">产品权限</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="">
					<div class="col-sm-5 permissionTree" style="margin-top: 10px;border: 1px solid #ccc;height: 500px;overflow-y: scroll;overflow-x: auto;">
					    <ul id="ztreeList1" class="ztree"></ul>
					</div>
					<div class="col-sm-5 text-center pull-right permissionTree" style="margin-top: 10px;border: 1px solid #ccc;height: 500px;overflow-y: scroll;overflow-x: auto;">
					    <ul id="ztreeList2" class="ztree"></ul>
					</div>
					<div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary btn-lg form-control batch-deal">确定</button>
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
<input type="hidden" id="userId">
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script>
	/**
	 * 初始化数据
	 * @returns
	 */
	function init (){
		var init = $('#init').dataTable({
			"bAutoWidth" : false,
			"bFilter" : false,
			"bPaginate":true,
			"bSort": false, //是否支持排序功能
			"bLengthChange": true, 
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
			"sAjaxSource" : ctx+'/user/load',
			"bDestroy" : true,
			"bRetrieve" : false,
			"bServerSide" : true,
			"fnServerData" : retrieveData,
			"aoColumns" : [
				{"mDataProp" : "userId",'sClass': "text-center","mRender": function ( data, type, full ) {
					return "<label> <input type='checkbox' class='slaver'> <span class='text'></span> </label>";
	              }},
				{"mDataProp" : "account","bSortable": false,'sClass': "text-center"},
				{"mDataProp" : "realName","bSortable": false,'sClass': "text-center"},
				{"mDataProp" : "gender","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
					if(data==1){
						return "男";
					}else{
						return "女";
					}
					
	              }},
	              {"mDataProp" : "departmentName","bSortable": false,'sClass': "text-center"},
	              {"mDataProp" : "dutyName","bSortable": false,'sClass': "text-center"},
	              {"mDataProp" : "roleName","bSortable": false,'sClass': "text-center"},
	              {"mDataProp" : "createDate","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
	            	  	//return data;
	            	  	var data2 = "";
	            	  	 if (data.length > 10) {//如果大于10
	            	  	   data2 = data.substring(0, 10);//截取前面十个，然后拼接上
	            	  	  } else{
	            	  		  data2 = data;
	            	  	  }
	            	  return data2;
	              }},
	              {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
	            	  if(data==0){
	            		  return '<span id="span'+full["userId"]+'" onclick="chooseUser(\''+full["userId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
	            	  }else{
	            		  return '<span id="span'+full["userId"]+'" onclick="chooseUser(\''+full["userId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
	            	  }
	              }},
	              {"mDataProp" : "userId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
					return  '<shiro:hasPermission name="user:edit">'
							+'<a onclick="edit(\''+full["userId"]+'\')" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
			                +'<i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
			                +'</shiro:hasPermission>'
			                +'<shiro:hasPermission name="user:delete">'
			                +'<a href="javascript:void(0);" onclick="del(\''+full["userId"]+'\')" class="delete">'
			                +'    <i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>'
			                +'</shiro:hasPermission>'
			                +'<shiro:hasPermission name="user:edit">'
							+'<a onclick="modifyPwd(\''+full["userId"]+'\')"  data-toggle="modal" data-backdrop="static" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
			                +'<i class="fa fa-unlock-alt primary"  data-toggle="tooltip" data-placement="top" data-original-title="修改密码" title="修改密码"></i></a>'
			                +'</shiro:hasPermission>'
			                +'<a class="product-btn" data-toggle="modal" userId="'+full["userId"]+'"  data-target=".productPermission" data-backdrop="static"><i class="fa fa-gear blue" data-toggle="tooltip" data-placement="top" data-original-title="产品权限 " title="产品权限 "></i></a>'
	              }}],
				"aoColumnDefs" : [{
	   	            sDefaultContent: '',
	   	            aTargets: [ '_all' ]
		   	      }]
			});
	    
	    $('#expandabledatatable_wrapper .dataTables_info').parent().append($('.dataTables_length'));
	  	//每页显示记录数
	    $('#init_wrapper').removeClass();
	    $('#init_wrapper').addClass('table-scrollable');
	}

</script>

<script src="${ctx_static }/home/sysconf/js/user.js?v_<%=System.currentTimeMillis() %>"></script>
