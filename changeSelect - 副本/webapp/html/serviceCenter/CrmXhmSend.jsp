<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/serviceCenter/css/CrmXhmSend.css">
<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons">
					<a href="#" data-toggle="collapse"> <i class="fa fa-minus"></i></a> 
					<a href="#" data-toggle="dispose"> <i class="fa fa-times"></i></a>
				</div>
				<!--Widget Buttons-->
		</div>
		<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					 <div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12  no-padding-right no-padding-left pull-left">
							<label class="control-label text-left pull-left margin-left-20">创建日期</label>
							<div class="col-sm-9 col-md-9 col-lg-9">
								<div class="controls">
									<div class="input-group date">
										<input class="form-control active" id="DateLog" type="text"> <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-5 col-sm-5 col-xs-12 no-padding-left">
							<div class="form-group col-md-9 col-sm-9 col-lg-9 no-margin-right">
								<input class="form-control" placeholder="信息" type="text" id="searchVal">
							</div>
							<div class="form-group col-md-3 col-sm-3 col-lg-3">
								<a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
								<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						
					</div> 
					
					
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="log">
								<thead>
									<tr role="row" class="text-center">
										<th width="80%">信息</th>
										<th >创建时间</th>
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

<!--查看-->
<div class="modal fade logView" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				
			</div>

		</div>
	</div>
</div>

<script>
//初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#log').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/toLog/load',
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
        			            {"mData": "content", 'sClass': "text-center"},
        			            {"mData": "createDate", 'sClass': "text-center"},
        			            {
        			                "mData": "crmXhmSendId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    return '<a href="#" class="view" data-toggle="modal" data-backdrop="static" data-target=".logView"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
        			                }
        			            }  
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
			})

			 //每页显示记录数
			 $('#log_wrapper .dataTables_info').parent().append($('#log_wrapper .dataTables_length'));
			
			 //横线滚动条
			$("#log_wrapper").on('scroll',function(){
				$('#log_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			}) 
		}
	}
}();
</script>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/CrmXhmSend.js"></script>
