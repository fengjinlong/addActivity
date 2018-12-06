<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<!-- Page Body -->
 <div class="page-body">
     <div class="row">
         <div class="col-lg-12 col-sm-12 col-xs-12">
             <div class="widget-body">
                 <div class="widget-main clearfix">
                     <div class="alert alert-info fade in">
                         <i class="fa-fw fa fa-info"></i>
                         IP填写规则：一行一个，支持*通配符
                     </div>
                     <div class="row row_padding">
	                     <div class="form-group col-sm-1  pull-right margin-right-5">
	                         <button class="btn btn-info pull-right form-control"
	                                 data-toggle="modal"
	                                 data-target=".addEntryControl" data-backdrop="static">新增<i
	                                 class="fa fa-plus-square-o right"></i></button>
	                     </div>
	                 </div>
                     <div id="whiteTable_wrapper" class="dataTables_wrapper form-inline no-footer">
                         <div class="col-lg-6 col-md-6 col-sm-6" class="table-scrollable">
                             <table id="whiteTable" class="table table-bordered">
                                 <thead>
                                     <tr>
                                         <th>IP白名单</th>
                                         <th>操作</th>
                                     </tr>
                                 </thead>
                                 <tbody class="text-center"></tbody>
                             </table>
                         </div>
						<!--新增-->
						<div class="modal fade addEntryControl" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
						    <div class="modal-dialog modal-md">
						        <div class="modal-content clearfix">
						            <div class="modal-header bordered-blue">
						                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
						                        class="sr-only">Close</span></button>
						                <span class="widget-caption">新增</span>
						            </div>
						            <div class="modal-body clearfix">
						                <form class="form-horizontal" id="addEntryControl" method="post">
						                 	<div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <input type="hidden" class="form-control"  id="entryControlId" name="entryControlId">
						                        </div>
						                    </div>
						                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">IP</label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <input type="text" class="form-control" id="entryControlIp" name="entryControlIp">
						                        </div>
						                    </div>
						                    <div class="form-group col-sm-12 modal-footer">
						                        <div class="col-sm-2 col-sm-offset-4">
						                            <button type="submit" class="btn btn-primary btn-lg save-mt">确认
						                            </button>
						                        </div>
						                        <div class="col-sm-2">
						                            <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消
						                            </button>
						                        </div>
						                    </div>
						                </form>
						            </div>
						        </div>
						    </div>
						</div>
						<!--修改-->
						<div class="modal fade editEntryControl" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
						    <div class="modal-dialog modal-md">
						        <div class="modal-content clearfix">
						            <div class="modal-header bordered-blue">
						                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
						                        class="sr-only">Close</span></button>
						                <span class="widget-caption">新增</span>
						            </div>
						            <div class="modal-body clearfix">
						                <form class="form-horizontal" id="editEntryControl" method="post">
						                 	<div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <input type="hidden" class="form-control"  id="entryControlId" name="entryControlId">
						                        </div>
						                    </div>
						                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">IP</label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <input type="text" class="form-control" id="entryControlIp" name="entryControlIp">
						                        </div>
						                    </div>
						                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right no-padding-left">状态</label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <select id="entryControlEnable" name="entryControlEnable" class="form-control">
						                                <option value="0">IP白名单</option>
						                                <option value="1">IP黑名单</option>
						                            </select>
						                        </div>
						                    </div>
						                    <div class="form-group col-sm-12 modal-footer">
						                        <div class="col-sm-2 col-sm-offset-4">
						                            <button type="submit" class="btn btn-primary btn-lg save-mt">确认
						                            </button>
						                        </div>
						                        <div class="col-sm-2">
						                            <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消
						                            </button>
						                        </div>
						                    </div>
						                </form>
						            </div>
						        </div>
						    </div>
						</div>
                        <div id="blackTable_wrapper" class="dataTables_wrapper form-inline no-footer">
                         <div class="col-lg-6 col-md-6 col-sm-6" class="table-scrollable">
                             <table id="blackTable" class="table table-bordered">
                                 <thead>
                                     <tr>
                                         <th>IP黑名单</th>
                                         <th>操作</th>
                                     </tr>
                                 </thead>
                                 <tbody class="text-center"></tbody>
                             </table>
                         </div>
						<!--修改-->
						<div class="modal fade editEntryBlack" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
						    <div class="modal-dialog modal-md">
						        <div class="modal-content clearfix">
						            <div class="modal-header bordered-blue">
						                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
						                        class="sr-only">Close</span></button>
						                <span class="widget-caption">新增</span>
						            </div>
						            <div class="modal-body clearfix">
						                <form class="form-horizontal" id="editEntryBlack" method="post">
						                 	<div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <input type="hidden" class="form-control"  id="entryControlId" name="entryControlId">
						                        </div>
						                    </div>
						                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">IP</label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <input type="text" class="form-control" id="entryControlIp" name="entryControlIp">
						                        </div>
						                    </div>
						                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
						                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right no-padding-left">状态</label>
						                        <div class="col-lg-10 col-md-10 col-sm-10">
						                            <select id="entryControlEnable" name="entryControlEnable" class="form-control">
						                                <option value="0">IP白名单</option>
						                                <option value="1">IP黑名单</option>
						                            </select>
						                        </div>
						                    </div>
						                    <div class="form-group col-sm-12 modal-footer">
						                        <div class="col-sm-2 col-sm-offset-4">
						                            <button type="submit" class="btn btn-primary btn-lg save-mt">确认
						                            </button>
						                        </div>
						                        <div class="col-sm-2">
						                            <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消
						                            </button>
						                        </div>
						                    </div>
						                </form>
						            </div>
						        </div>
						    </div>
						</div>
                     </div>

                     <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:20px">
                         <div class="form-group col-lg-6 col-md-6 col-sm-6">
                             <label style="margin-left: 0 !important;" class="col-lg-4 col-md-4 col-sm-4 control-label no-padding-right">控制开关</label>
                             <div class="col-lg-8 col-md-8 col-sm-8">
                                 <select name="" class="form-control">
                                     <option value="0">开</option>
                                     <option value="1">关</option>
                                 </select>
                             </div>
                         </div>
                         <div class="form-group col-lg-6 col-md-6 col-sm-6">
                             <a href="javascript:void(0);" class="btn btn-primary">确定</a>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>
<script>
	/**
	 * 初始化数据
	 * @returns
	 */
	function blackTable (){
		var blackTable = $('#blackTable').dataTable({
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
			"sAjaxSource" : ctx+'/loginList/load',
			"bDestroy" : true,
			"bRetrieve" : false,
			"bServerSide" : true,
			"fnServerData" : retrieveDataxl,
			"aoColumns" : [
				
				{"mDataProp" : "entryControlIp","bSortable": false,'sClass': "text-center"},
				{
	                "mData": "entryControlId",
	                'sClass': "text-center",
	                "bSortable": false,
	                "mRender": function (data, type, full ) {
	                	var u = '<shiro:hasPermission name="loginList:edit">'
	                						+'<a onclick="edit(\''+full["entryControlId"]
	                						+'\',\''+full["entryControlIp"]
	        			                	+'\',\''+full["entryControlEnable"]+'\')" class="btn btn-info btn-xs editBlack" data-toggle="modal" data-target=".editEntryBlack" data-backdrop="static"><i class="fa fa-edit"></i>编辑</a>'
	                						+'</shiro:hasPermission>';
	                    return u;
	                }}],
				"aoColumnDefs" : [{
	   	            sDefaultContent: '',
	   	            aTargets: [ '_all' ]
		   	      }]
			});
		
	    $('#blackTable_wrapper .dataTables_info').parent().append($('.dataTables_length'));
	  	//每页显示记录数
	    $('#blackTable_wrapper').removeClass();
	    $('#blackTable_wrapper').addClass('table-scrollable'); 
	}
	/**
	 * 初始化数据
	 * @returns
	 */
	function whiteTable (){
		var whiteTable = $('#whiteTable').dataTable({
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
			"sAjaxSource" : ctx+'/loginList/load',
			"bDestroy" : true,
			"bRetrieve" : false,
			"bServerSide" : true,
			"fnServerData" : retrieveData,
			"aoColumns" : [
				
				{"mDataProp" : "entryControlIp","bSortable": false,'sClass': "text-center"},
				{
	                "mData": "entryControlId",
	                'sClass': "text-center",
	                "bSortable": false,
	                "mRender": function (data, type, full ) {
	                	var u = '<shiro:hasPermission name="loginList:edit">'
	                						+'<a onclick="edit(\''+full["entryControlId"]
	                						+'\',\''+full["entryControlIp"]
	        			                	+'\',\''+full["entryControlEnable"]+'\')" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".editEntryControl" data-backdrop="static"><i class="fa fa-edit"></i>编辑</a>'
	                						+'</shiro:hasPermission>';
	                    return u;
	                }}],
				"aoColumnDefs" : [{
	   	            sDefaultContent: '',
	   	            aTargets: [ '_all' ]
		   	      }]
			});
		
	    $('#whiteTable_wrapper .dataTables_info').parent().append($('.dataTables_length'));
	  	//每页显示记录数
	    $('#whiteTable_wrapper').removeClass();
	    $('#whiteTable_wrapper').addClass('table-scrollable'); 
	}
</script>
<script src="${ctx_static }/home/sysconf/js/entryControl.js"></script>
