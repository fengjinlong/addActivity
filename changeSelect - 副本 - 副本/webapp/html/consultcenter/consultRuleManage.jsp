<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<%-- <link rel="stylesheet" href="${ctx_static }/home/configuration/css/inquiriesRules.css"> --%>
<link href="${ctx_static }/home/configuration/css/infoQuantity.css" rel="stylesheet">

<div class="row page-wrapper">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">咨询规则管理</span>
        </div>
        <div class="tabbable" style="margin-top:20px">
            <ul class="nav nav-tabs tabs-flat">
                <li class="active">
                    <a data-toggle="tab" href="#regulation">
                        	咨询量分配规则
                    </a>
                </li>

                <li>
                    <a data-toggle="tab" href="#infoFlow">
                        	信息回流规则
                    </a>
                </li>
            </ul>

            <div class="tab-content tabs-flat bordered-blue">
                <div class="tab-pane in active" id="regulation">
                <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                    	<div class="col-md-4 col-sm-3 col-xs-12">
	                    	<div class="input-group">
	                             <input type="text" class="form-control duration" name="duration" id="duration">
	                             <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	                        </div>
                    	</div>
                    	
                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                <input class="form-control" placeholder="分配规则名称/状态" type="text" id="searchVal" name="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                <i class="fa fa-search"></i> 搜索
                                </a>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                            <shiro:hasPermission name="consultRuleManage:add">
                            <button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target="#addInquiries">
                            	<i class="fa fa-plus"></i> 新增
                            </button>
                            </shiro:hasPermission>
                        </div>
                        
                        <!--测试时期，按钮  -->
                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-3 col-sm-4">
                                <!-- <button type="button" class="btn btn-default" onclick="testRule()">测试按钮</button> -->
                                <a type="button" class="btn increase form-control search-btn" href="javascript:void(0);" onclick="testRule()">
                                <i ></i> 测试按钮
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="infoManage" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>分配规则名称</th>
                                    <th>起止日期</th>
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

                <div id="infoFlow" class="tab-pane">
                    <form action="" class="form-horizontal" id="infoFlowRule">
                        <table class="table table-bordered">
                            <tbody>
                            <tr>
                                <td colspan="1">
                                    <span class="explain">*</span> 当客户满足下述任意条件时，强制收回客户资源</td>
                            </tr>
                            <c:forEach items="${map.rules}" var="item">
                                <tr>
                                    
                                    <td>
                                        ${item.result}
                                    </td>
                                </tr>
                             </c:forEach>
                            <tr>
                                <td colspan="2" class="text-center">
                                	<button type="submit" class="btn btn-primary">设定</button>
                                    <button type="reset" class="btn btn-danger">取消</button>
                                    <!--测试时期按钮  -->
                                    <button type="button" class="btn" onclick="testBack()">测试按钮</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!--创建,编辑咨询分配规则-->
<div class="modal fade addInquiries bs-exampleUpdate-modal-lg" id="addInquiries" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">创建咨询分配规则</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="inquiries" method="post">
                	<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">分配规则名称</label>
                        <div class="col-sm-8">
                            <input name="consultRuleManage.consultRuleManageName" type="text" class="form-control consultRuleManageName" id="consultRuleManageName"/>
                            <input name="consultRuleManage.consultRuleManageId" type="hidden" class="form-control consultRuleManageId" id="consultRuleManageId"/>
                            <input type="hidden" id="methodName" /><!--新增和编辑用的是同一个弹框，用于标志当前页面处于什么操作  -->
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">部门</label>
                        <div class="col-sm-8">
                            <select name="departmentIds" id="departmentIds" class="form-control show-tick selectpicker" multiple title="部门多选" data-live-search="true">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">有效起止日期</label>
                        <div class="col-sm-8">
                        	<div class="input-group">
	                            <input type="text" class="form-control duration" name="duration">
	                        	<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	                        </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">数据范围</label>
                        <div class="col-sm-8">
                        	<div class="input-group">
                            	<input type="text" name="consultRuleManage.dataRange" id="dataRange" class="form-control dataRange" placeholder="单位:天"/>
                            	<span class="input-group-addon">天</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="addInfoManage" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>等级</th>
                                    <th>业绩(万)</th>
                                    <th>电转(%)</th>
                                    <th>咨询量上限/日(个)</th>
                                    <th>权重(不可大于1)</th>
                                    <th>回流咨询量可抢范围(日期范围)</th>
                                    <th>咨询师</th>
                                </tr>
                                </thead>
                                <tbody id="appendLevel">
                                </tbody>
                            </table>
                		</div>
                	</div>
                    <div class="form-group col-sm-12 modal-footer no-margin-left">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal"
                                    data-backdrop="static">创建
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                        <!-- <div class="col-sm-2" id="updateCounselor">
                            <button type="button" onclick="updateCounselor()" class="btn btn-primary form-control">更新咨询师
                            </button>
                        </div> -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--显示该等级下符合条件的所有咨询师-->
<div class="modal fade showCounselors" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">咨询师展示</span>
            </div>
            <div class="modal-body clearfix">
            	<input type="hidden" id="achievementLow"/><!--需要传递给后台的业绩下限  -->
            	<input type="hidden" id="achievementUp"/><!--需要传递给后台的业绩上限  -->
            	<input type="hidden" id="phoneTransferLow"/><!--需要传递给后台的电转下限  -->
            	<input type="hidden" id="phoneTransferUp"/><!--需要传递给后台的电转上限  -->
                <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="showCounselors" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>咨询师名称</th>
                                    <th>所属部门名称</th>
                                    <th>业绩</th>
                                    <th>上门量</th>
                                    <th>咨询量</th>
                                </tr>
                                </thead>
                                <tbody id="appendCounselors">
                                </tbody>
                            </table>
                		</div>
                	</div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
var infoDisDep = "${dep}";
//加载表单
var DataTable = function(){
	return {
		init: function () {
			var dutyTable = $('#infoManage').dataTable({
				"bPaginate": true,  //是否显示分页
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"sAjaxSource" : ctx+'/consultRuleManage/load',
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
                        //分配规则名称
						{"mData": "consultRuleManageName",'bSortable':true, 'sClass': "text-center"},
						//起止日期
						{
			                "mData": "",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                	return full['startDate'].split(' ')[0].trim()+" - "+full['endDate'].split(' ')[0].trim();
			                }
			            },
			            //状态
			            {
			                "mData": "",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                	if(full['enable']=="1") {
			                		return '启用';
			                	} else {
			                		return '禁用';
			                	}
			                }
			            },
			            //操作
			            {
			                "mData": "",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                	var u = '<shiro:hasPermission name="consultRuleManage:edit"><a onclick="edit(\''+full["consultRuleManageId"]+'\')" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
	    		                +'<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
			                    if(full.enable==0){
			                    	var d = '<span id="span'+full["consultRuleManageId"]+'" onclick="chooseRecord(\''+full["consultRuleManageId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
					          	}else{
					          		var d = '<span id="span'+full["consultRuleManageId"]+'" onclick="chooseRecord(\''+full["consultRuleManageId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
					          	}
			                    return u+d;
			                }
			            }

                ],
                "aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
	   	     "fnRowCallback":function(nRow,aData,iDisplayIndex){
					return nRow;
	   	     },
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
		  $('#infoManage_wrapper .dataTables_info').parent().append($('#infoManage_wrapper .dataTables_length'));
		}
	}
}();

//加载查看显示咨询师表单
var ShowTable = function(){
	return {
		init: function () {
			var dutyTable = $('#showCounselors').dataTable({
				"bPaginate": true,  //是否显示分页
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"sAjaxSource" : ctx+'/consultRuleManage/loadCounselors',
        		"fnServerData": showData,//用于替换默认发到服务端的请求操作  
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
                        //序号
						{"mData": "counselorName",'bSortable':true, 'sClass': "text-center"},
                        //分配规则名称
						{"mData": "departmentName",'bSortable':true, 'sClass': "text-center"},
                        //业绩
						{"mData": "achievement",'bSortable':true, 'sClass': "text-center"},
                        //上门量
						{"mData": "visitCount",'bSortable':true, 'sClass': "text-center"},
                        //咨询量
						{"mData": "consultCount",'bSortable':true, 'sClass': "text-center"},
                ],
                "aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
	   	     "fnRowCallback":function(nRow,aData,iDisplayIndex){
					return nRow;
	   	     },
	   	     "fnDrawCallback": function(){
	            var oTable = $("#showCounselors").dataTable();
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
		  $('#showCounselors_wrapper .dataTables_info').parent().append($('#showCounselors_wrapper .dataTables_length'));
		}
	}
}();
</script>
<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/home/consultcenter/js/consultRuleManage.js"></script>

