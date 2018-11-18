<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/user.css">
<div class="row page-wrapper">
    <div class="col-xs-12 col-md-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">学员同步接口管理</span>
            </div>
            <div class="widget-body">
                <div class="row row_padding">
                    <div class="col-md-7 col-padd">
                        <div class="form-group col-md-5 col-sm-4 no-margin-right">
                            <input type="text" class="form-control" placeholder="名称"  onkeydown="init()" id="studentsSyncName" name="studentsSyncName">
                        </div>
                        <div class="form-group col-md-2 col-sm-4">
                            <button type="button"  onclick="init()" class="btn btn-lightBlue form-control search-btn">
                            	<i class="fa fa-search"></i> 搜索
                            </button>
                        </div>
                    </div>
	
                    <div class="form-group col-sm-1  pull-right margin-right-5">
                        <button class="btn btn-info pull-right form-control"
                                data-toggle="modal"
                                data-target=".addSynchronous" data-backdrop="static">新增<i
                                class="fa fa-plus-square-o right"></i></button>
                    </div>
                </div>
                 <div id="init_wrapper" class="dataTables_wrapper form-inline no-footer">
                      <div class="table-scrollable">
                          <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
                              <thead>
                              <tr role="row">
                              	  <th>所属</th>
                                  <th>名称</th>
                                  <th>文件</th>
                                  <th>操作</th>
                              </tr>
                              </thead>
                              <tbody class="text-center"></tbody>
                          </table>
                      </div>
                  </div>
                  <!--新增-->
					<div class="modal fade addSynchronous" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
					    <div class="modal-dialog modal-md">
					        <div class="modal-content clearfix">
					            <div class="modal-header bordered-blue">
					                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
					                        class="sr-only">Close</span></button>
					                <span class="widget-caption">新增</span>
					            </div>
					            <div class="modal-body clearfix">
					                <form class="form-horizontal" id="addSynchronous" method="post">
					                 	<div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="hidden" class="form-control"  id="studentsSyncId" name="studentsSyncId">
					                        </div>
					                    </div>
					                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">所属</label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="text" class="form-control" id="fullName" name="fullName">
					                        </div>
					                    </div>
					                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">名称</label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="text" class="form-control" id="studentsSyncName" name="studentsSyncName">
					                        </div>
					                    </div>
					                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">文件</label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="text" class="form-control" id="studentsSyncDescribe" name="studentsSyncDescribe">
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
					
					<!--编辑-->
					<div class="modal editSynchronous fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="editSynchronous">
					    <div class="modal-dialog modal-md">
					        <div class="modal-content clearfix">
					            <div class="modal-header bordered-blue">
					                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
					                        class="sr-only">Close</span></button>
					                <span class="widget-caption">编辑</span>
					            </div>
					            <div class="modal-body clearfix">
					                <form class="form-horizontal" id="editSynchronous" method="post">
					                	<div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="hidden" class="form-control"  id="studentsSyncId" name="studentsSyncId">
					                        </div>
					                    </div>
					                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">所属</label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="text" class="form-control" disabled id="fullName" name="fullName">
					                        </div>
					                    </div>
					                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">名称</label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="text" class="form-control" id="studentsSyncName" name="studentsSyncName">
					                        </div>
					                    </div>
					                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
					                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">文件</label>
					                        <div class="col-lg-10 col-md-10 col-sm-10">
					                            <input type="text" class="form-control" id="studentsSyncDescribe" name="studentsSyncDescribe">
					                        </div>
					                    </div>
					                    <div class="form-group col-sm-12 modal-footer">
					                        <div class="col-sm-2 col-sm-offset-4">
					                            <button type="submit" class="btn btn-primary btn-lg">确认
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
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>

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
			"sAjaxSource" : ctx+'/sync/load',
			"bDestroy" : true,
			"bRetrieve" : false,
			"bServerSide" : true,
			"fnServerData" : retrieveData,
			"aoColumns" : [
				
				{"mDataProp" : "fullName","bSortable": false,'sClass': "text-center"},
				{"mDataProp" : "studentsSyncName","bSortable": false,'sClass': "text-center"},
				{"mDataProp" : "studentsSyncDescribe","bSortable": false,'sClass': "text-center"},
	           
	            {
	                "mData": "studentsSyncId",
	                'sClass': "text-center",
	                "bSortable": false,
	                "mRender": function (data, type, full ) {
	                	var u = '<shiro:hasPermission name="sync:edit">'
	                						+'<a onclick="edit(\''+full["studentsSyncId"]
	        			                	+'\',\''+full["fullName"]
	        			                	+'\',\''+full["studentsSyncName"]
	                						+'\',\''+full["studentsSyncDescribe"]+'\')" class="edit" data-toggle="modal" data-backdrop="static"> <i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
	                						+'</shiro:hasPermission>';
	                	var d = '<shiro:hasPermission name="sync:delete"><a href="javascript:;" class="delete" onclick="deleteSynchronous(\''+full["studentsSyncId"]+'\',this)"><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></shiro:hasPermission>';
	                    return u+d;
	                }
	            }
	            ],
				"aoColumnDefs" : [{
	   	            sDefaultContent: '',
	   	            aTargets: [ '_all' ]
		   	      }]
			});
		
	    $('#init_wrapper .dataTables_info').parent().append($('.dataTables_length'));
	  	//每页显示记录数
	    $('#init_wrapper').removeClass();
	    $('#init_wrapper').addClass('table-scrollable'); 
	}
	//编辑框
	$('#init').on("click",".edit",function(){
		$(".editSynchronous").modal('show');
	})
</script>
<script src="${ctx_static }/home/sysconf/js/students-synchronous.js"></script>
