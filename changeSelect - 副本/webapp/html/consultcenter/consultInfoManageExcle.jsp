<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>
<link rel="stylesheet" href="${ctx_static }/home/consultcenter/css/infoManagement.css">
<!--咨询信息管理表格 -->
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
                        <div class="col-md-4 col-sm-3 col-xs-12">
                            <div class="form-group">
                                <label class="control-label pull-left" style="margin-left:15px;">日期</label>
                                <div class="col-lg-10 col-md-9 col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input class="form-control" id="excleDate" type="text">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        

                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                <input class="form-control" placeholder="采集人/电话咨询师/分校/姓名/课程/级别/电话" type="text" id="searchVal" name="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                <i class="fa fa-search"></i> 搜索
                                </a>

                            </div>
                        </div>

                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group">
                            <button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-backdrop="static" >
                            	<i class="fa fa-plus" onclick="split()">拆分</i> 
                            </button>
                        </div>
                    
                    </div>
                   
                    <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="consultInfoManageExcle" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkAll">
                                            <span class="text"></span>
                                        </label>
                                    </th>
                                    <th>ID</th>
                                    <th>创建日期</th>
                                    <th>归属部门</th>
                                    <th>拆分状态</th>
                                    <th>采集人</th>
                                    <th>电话咨询师</th>
                                    <th>咨询者类型</th>
                                    <th>分校</th>
                                    <th>品牌</th>
                                    <th>姓名</th>
                                    <th>课程</th>
                                    <th>级别</th>
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




<script>
//加载表单
var DataTable = function(){
	return {
		init: function () {
			var dutyTable = $('#consultInfoManageExcle').dataTable({
				"bPaginate": true,  //是否显示分页
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	//"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/consultInfoManageExcle/load',
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
						    "mData": "infoManageId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
						    return "<label> <input id=" + data + "  name='infoManageIds' value=" + data + " type='checkbox' class='slaver'> <span class='text'></span> </label>"; 
							}
						}, 
			            {"mData": "infoManageId", 'sClass': "text-center"},
						{"mData": "createDate", 'sClass': "text-center"},
						{"mData": "departmentName2", 'sClass': "text-center"},
						{"mData": "state", 'sClass': "text-center"},
						{"mData": "createUserName", 'sClass': "text-center"},
						{"mData": "counselor", 'sClass': "text-center"},
						{"mData": "studentAttrName2", 'sClass': "text-center"},
						{"mData": "departmentName2", 'sClass': "text-center"},
						{"mData": "brandName", 'sClass': "text-center"},
						{"mData": "studentName", 'sClass': "text-center"},
						{"mData": "projectName", 'sClass': "text-center"},
						{"mData": "projectLevelName", 'sClass': "text-center"},
						{
			                "mData": "infoManageId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                    var u = "<a data-record='"+JSON.stringify(full)+"' class='edit' data-backdrop='static'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
			                    var d = '<shiro:hasPermission name="consultInfoManageExcle:delete"><a href="#" class="delete" onclick="deleteInfoManage(\''+full["infoManageId"]+'\')"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></shiro:hasPermission>';
			                    return u+d;
			                }
			            }

                ],
                "aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
	   	      /* "fnRowCallback":function(nRow,aData,iDisplayIndex){
		   	    	if(aData.state=='0'){
		   	    		$('td:eq(3)',nRow).html('已拆分');
		   	    	}else if(aData.state=='1'){
		   	    		$('td:eq(3)',nRow).html('未拆分');
		   	    	}
		   	    	
		   	     },  */
	   	     "fnDrawCallback": function(){
	            var oTable = $("#infoManage").dataTable();
	            $('.redirect').keyup(function(e){
	                if($(this).val() && $(this).val()>0){
	                    var redirectpage = $(this).val()-1;
	                }else{
	                    var redirectpage = 0;
	                }
	                oTable.fnPageChange( redirectpage );
	            });
	        }
			});
			$("#infoManage_wrapper").removeClass();
			$('#infoManage_wrapper').addClass("table-scrollable");
			//横线滚动条
			$("#infoManage_wrapper").on('scroll',function(){
				$('#infoManage_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
			})
		}
	}
}();
</script>

<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

<script src="${ctx_static }/home/consultcenter/js/consultInfoManageExcle.js"></script>