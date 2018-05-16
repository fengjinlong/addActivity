<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<style>
.hiddenCol{
display:none;
}
nav-tabs > li {
    margin-bottom: -2px !important;
}
</style>
<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">学员属性</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main ">
					<div class="tabbable">
						<ul class="nav nav-tabs tabs-flat" id="myTab11">
							<li class="active"><a data-toggle="tab" href="#home11">
								媒体来源
							</a></li>
							<li><a data-toggle="tab" href="#profile11">咨询者类型
							</a></li>
							<li><a data-toggle="tab" href="#education">学员学历
							</a></li>
						</ul>
						<div class="tab-content tabs-flat">
							<!--媒体来源  -->
							<div id="home11" class="tab-pane in active">
								<div class="row row_padding form-horizontal">
									<div class="col-md-6 col-sm-6 col-xs-12">
										<div
											class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
											<input id="searchVal" type="text" class="form-control" placeholder="来源名称" onkeydown="search('mtData');">
										</div>
										<div class="form-group col-lg-2 col-md-4 col-sm-4">
											<a type="button" class="btn increase form-control search-btn" href="javascript:mtDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>
									<div
										class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
										<span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
										<div class="btn-group">
											<button type="button" class="btn btn-default dropdown-toggle"
												data-toggle="dropdown">
												导出 <i class="fa fa-angle-up"></i>
											</button>
											<ul class="dropdown-menu" role="menu">
												<li><a href="#">保存PDF</a></li>
												<li><a href="#">导出EXCEL</a></li>
												<li><a href="#">导出CSV</a></li>
											</ul>
										</div>
										<button class="btn increase pull-right col-sm-4 add-btn-mt">
											<i class="fa fa-plus"></i> 新增
										</button>
									</div>
								</div>
								<div role="grid" id="editabledatatable_wrapper" class="dataTables_wrapper form-inline no-footer">
									<table id="mediaSources" class="table table-striped table-hover table-bordered dataTable no-footer">
										<thead>
											<tr role="row">
												<th width="5%">
												<label> <input type="checkbox" class="checkAll1">
														<span class="text"></span>
												</label></th>
												<th class="hidden">媒体来源ID</th>
												<th>序号</th>
												<th>类型</th>
												<th>编号</th>
												<th>状态 </th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody class="text-center">
										</tbody>
									</table>
								</div>
							</div>
							<!--咨询者类型  -->
							<div id="profile11" class="tab-pane">
								<div class="row row_padding form-horizontal">
									<div class="col-lg-8 col-md-8 col-sm-8">
										<div
											class="form-group col-lg-5 col-md-5 col-sm-5 no-margin-right">
											<input id="searchValZxz" type="text" class="form-control" placeholder="类型名称" onkeydown="search('zxzData');">
										</div>
										<div class="form-group col-lg-2 col-md-2 col-sm-2">
											<a type="button" class="btn increase form-control search-btn" href="javascript:zxzDataTable.init();">
												<i class="fa fa-search"></i> 搜索   
											</a>
										</div>
										<label class="red pull-right" style="height: 34px;line-height: 34px">其中编号如果设置为10001为分校使用</label>
										
									</div>
									<div
										class="col-lg-4 col-md-4 col-sm-4 btn-group">
										<span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
										<div class="btn-group">
											<button type="button" class="btn btn-default dropdown-toggle"
												data-toggle="dropdown">
												导出 <i class="fa fa-angle-up"></i>
											</button>
											<ul class="dropdown-menu" role="menu">
												<li><a href="#">保存PDF</a></li>
												<li><a href="#">导出EXCEL</a></li>
												<li><a href="#">导出CSV</a></li>
											</ul>
										</div>

										<shiro:hasPermission name="studentAttr:add"></shiro:hasPermission>
											<button class="btn increase pull-right col-sm-2 add-btn-zxz">
												<i class="fa fa-plus"></i> 新增
											</button>
										
									</div>
								</div>
								<table id="consultantsType"
									class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th width="5%"><label> <input type="checkbox" class="checkAll2">
													<span class="text"></span>
											</label></th>
											<th class="hidden">咨询者类型ID</th>
											<th>序号</th>
											<th>类型</th>
											<th>编号</th>
											<th>状态</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							<!--学员学历  -->
							<div id="education" class="tab-pane">
								<div class="row row_padding form-horizontal">
									<div class="col-md-6 col-sm-6 col-xs-12">
										<div
											class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
											<input id="searchValXl" type="text" class="form-control" placeholder="学历名称" onkeydown="search('xlData');">
										</div>
										<div class="form-group col-lg-2 col-md-4 col-sm-4">
											<a type="button" class="btn increase form-control search-btn" href="javascript:xlDataTable.init();">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>
									<div
										class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
										<span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
										<div class="btn-group">
											<button type="button" class="btn btn-default dropdown-toggle"
												data-toggle="dropdown">
												导出 <i class="fa fa-angle-up"></i>
											</button>
											<ul class="dropdown-menu" role="menu">
												<li><a href="#">保存PDF</a></li>
												<li><a href="#">导出EXCEL</a></li>
												<li><a href="#">导出CSV</a></li>
											</ul>
										</div>
										<button class="btn increase pull-right col-sm-4 add-btn-xl">
											<i class="fa  fa-plus"></i> 新增 
										</button>
									</div>
								</div>

								<table id="degree"
									class="table table-striped table-hover table-bordered dataTable no-footer">
									<thead>
										<tr role="row">
											<th width="5%"><label> <input type="checkbox" class="checkAll3">
													<span class="text"></span>
											</label></th>
											<th class="hidden">学员学历ID</th>
											<th>序号 </span>
											</th>
											<th>类型 </span>
											</th>
											<th>编号</th>
											<th>状态 </span>
											</th>
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
			<!--Widget-->
		</div>
	</div>

</div>
<%@ include file="../common/public_footer.jsp"%>

<script>
//查询媒体来源
var mtDataTable = function(){
	return{
		init: function(){
			var mtTable = $('#mediaSources').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	//"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	"sAjaxSource" : ctx+'/studentAttr/load',
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
			                "mData": "studentAttrId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
			            }
			            },
			            {"mData": "studentAttrId", 'sClass': "hiddenCol"},
			            {"mData": "code", 'sClass': "text-center","fnRender": function (data, type, full) {
			            	return data.oSettings._iDisplayStart + data.iDataRow + 1; 
			            }},
			            {"mData": "typeName", 'sClass': "text-center"},
			            {"mData": "code", 'sClass': "text-center"},
			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
			            	if(data==0){
			          		  return '<span style="width: inherit" id="span'+full["studentAttrId"]+'" onclick="chooseStudentmt(\''+full["studentAttrId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
			          	  }else{
			          		  return '<span style="width: inherit" id="span'+full["studentAttrId"]+'" onclick="chooseStudentmt(\''+full["studentAttrId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
			          	  }
			            }},
			            {
			                "mData": "studentAttrId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
        			                    var u = '<a href="javascript:;" class="edit" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
        			                    var d = '<a href="javascript:;" class="delete " onclick="deleteStudent(\''+full["studentAttrId"]+'\',this)"><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
        			                    return u + d;
			                }
			            }
			        ],
			        "aoColumnDefs": [{
		   	            sDefaultContent: '',
		   	            aTargets: ['_all']
		   	        }],
			});
		}
	}
}();


$('#editabledatatable_wrapper').on('click','.dataTables_paginate .pagination li a',function(){
	$('.checkAll1').attr('checked',false);
})

//查询咨询者类型
var zxzDataTable = function(){
	return{
		init: function(){
			var mtTable = $('#consultantsType').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	"sAjaxSource" : ctx+'/studentAttr/load',
        		"fnServerData": retrieveDataZxz,//用于替换默认发到服务端的请求操作  
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
			                "mData": "studentAttrId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
			            }
			            },
			            {"mData": "studentAttrId", 'sClass': "hiddenCol"},
			            {"mData": "sortCode", 'sClass': "text-center","fnRender": function (data, type, full) {
			            	return data.oSettings._iDisplayStart + data.iDataRow + 1; 
			            }},
			            {"mData": "typeName", 'sClass': "text-center"},
			            {"mData": "code", 'sClass': "text-center"},
			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
			            	if(data==0){
			          		  return '<span style="width: inherit" id="span'+full["studentAttrId"]+'" onclick="chooseStudentzx(\''+full["studentAttrId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
			          	  }else{
			          		  return '<span style="width: inherit" id="span'+full["studentAttrId"]+'" onclick="chooseStudentzx(\''+full["studentAttrId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
			          	  }
			            }},
			            {
			                "mData": "studentAttrId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
        			                    var u = '<a href="javascript:;" class="edit" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
        			                    var d = '<a href="javascript:;" class="delete " onclick="deleteStudent(\''+full["studentAttrId"]+'\',this)"><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
        			                    return u + d;
			                }
			            }
			        ],
			        "aoColumnDefs": [{
		   	            sDefaultContent: '',
		   	            aTargets: ['_all']
		   	        }],
			});
		}
	}
}();


$('#profile11').on('click','.dataTables_paginate .pagination li a',function(){
	console.log(123)
	$('.checkAll2').attr('checked',false);
})

//查询学员学历
var xlDataTable = function(){
	return{
		init: function(){
			var mtTable = $('#degree').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	"sAjaxSource" : ctx+'/studentAttr/load',
        		"fnServerData": retrieveDataXl,//用于替换默认发到服务端的请求操作  
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
			                "mData": "studentAttrId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
			            }
			            },
			            {"mData": "studentAttrId", 'sClass': "hiddenCol"},
			            {"mData": "code", 'sClass': "text-center","fnRender": function (data, type, full) {
			            	return data.oSettings._iDisplayStart + data.iDataRow + 1; 
			            }},
			            {"mData": "typeName", 'sClass': "text-center"},
			            {"mData": "code", 'sClass': "text-center"},
			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
			            	if(data==0){
			          		  return '<span style="width: inherit" id="span'+full["studentAttrId"]+'" onclick="chooseStudentxl(\''+full["studentAttrId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
			          	  }else{
			          		  return '<span style="width: inherit" id="span'+full["studentAttrId"]+'" onclick="chooseStudentxl(\''+full["studentAttrId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
			          	  }
			            }},
			            {
			                "mData": "studentAttrId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
        			                    var u = '<a href="javascript:;" class="edit" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
        			                    var d = '<a href="javascript:;" class="delete " onclick="deleteStudent(\''+full["studentAttrId"]+'\',this)"><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
        			                    return u + d;
			                }
			            }
			        ],
			        "aoColumnDefs": [{
		   	            sDefaultContent: '',
		   	            aTargets: ['_all']
		   	        }],
			});
		}
	}
}();

$('#education').on('click','.dataTables_paginate .pagination li a',function(){
	console.log(123)
	$('.checkAll3').attr('checked',false);
})

</script>
<script src="${ctx_static }/home/sysconf/js/widgets.js?v=<%=Math.random() %>"></script>

