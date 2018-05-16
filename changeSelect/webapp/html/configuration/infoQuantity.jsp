<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/configuration/css/infoQuantity.css" rel="stylesheet">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
             <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">信息量归属配置</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                <input id="searchVal" type="text" class="form-control" placeholder="名称/部门" onkeydown="search();">
                            </div>
                            <div class="form-group col-lg-2 col-md-4 col-sm-4">
                                <a type="button" href="javascript:InitiateSimpleDataTable.init();"
                                        class="btn btn-lightBlue form-control search-btn"> 
                                      <i class="fa fa-search"></i> 搜索
                                </a>
                            </div>
                        </div>


                        <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                            <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle"
                                        data-toggle="dropdown">导出
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">保存PDF</a></li>
                                    <li><a href="#">导出EXCEL</a></li>
                                    <li><a href="#">导出CSV</a></li>
                                </ul>
                            </div>
                            <button class="btn increase addBtn pull-right col-sm-4" data-toggle="modal" data-backdrop="static">
                                	 <i class="fa  fa-plus"></i> 新增
                            </button>
                        </div>
                    </div>
                    <div class="infoQuantityTable-warp">
                    <table id="infoQuantityTable" class="table table-striped table-hover table-bordered dataTable no-footer">
                        <thead>
                        <tr role="row">
                            <th width="5%">
                                <label>
                                    <input type="checkbox" class="master">
                                    <span class="text"></span>
                                </label>
                            </th>
                            <th>名称</th>
                            <th width="40%">产品</th>
                            <th>部门</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
					</div>
                </div>
            </div>
            <!--Widget-->
        </div>
    </div>

</div>
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div id="infoQuantityAddModal" class="modal fade infoQuantityAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="infoQuantityAdd" method="post">
                
                	<input type="hidden" name="infosBelongId"/>
                
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">名称</label>
                        <div class="col-sm-8">
                            <input type="text" name="infosBelongName" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">产品</label>
                        <div class="col-sm-8">
                            <select name="projects" class="form-control show-tick selectpicker" multiple title="产品" data-live-search="true">
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">公司</label>
                        <div class="col-sm-8 position-relative">
                        	<input readonly onclick="showMenu('company_id', 1)" id="company_id" class="form-control"></input>
	                    	<input hidden id="companyId"></input>
                        </div>
                    </div>
                    
                    <div class="form-group brand-before">
                        <label class="control-label col-sm-2 no-padding-right">部门</label>
                        <div class="col-sm-8">
                        	<input onclick="showMenu('department_id', 2)" id="department_id" name="departmentName" class="form-control" readonly="readonly"/>
	                    	<input type="hidden" id="departmentId" name="departmentId" />
                        </div>
                    </div>
                    
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control" >确定</button>
                        </div>
                        <div class="col-sm-2" >
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
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

<!--查看-->
<div class="modal fade infoQuantityView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal">
                	
                	<input type="hidden" name="infosBelongId"/>
                
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">名称</label>
                        <div class="col-sm-8">
                            <input name="infosBelongName" type="text" class="form-control" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">产品</label>
                        <div class="col-sm-8">
                            <select name="projects" class="form-control selectpicker form-control" multiple  >
                            </select>
                        </div>
                    </div>
                    <div class="form-group brand-before">
                        <label class="control-label col-sm-2 no-padding-right">部门</label>
                        <div class="col-sm-8">
                            <input readonly name="departmentName" class="form-control"></input>
	                    	<input type="hidden" name="departmentId" ></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<script>
//table初始化
var InitiateSimpleDataTable = function () {
	
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#infoQuantityTable').dataTable({
            	"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizInfosBelong/getAll',
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
        		               	{ "mDataProp": "infosBelongId","bSortable": false,'sClass': "text-center", "mRender":function(data, type, full){
        		               		return "<label> <input type='checkbox' class='slaver'> <span class='text'></span> </label>";
        		               	}},
        		               	{ "mDataProp": "infosBelongName","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "projectsName","bSortable": false,'sClass': "text-center"},
        		               	{ "mDataProp": "sysDepartment.fullName","bSortable": true,'sClass': "text-center"}, 
        		               	{ "mDataProp": "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
        		               		return data?'<a href="#" data-id="'+full.infosBelongId+'" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>':
        		               			'<a href="#" data-id="'+full.infosBelongId+'" class="btn btn-nouse btn-xs status-btn"><i class="fa fa fa-ban"></i> 禁用</a>';
        		               	}},
        		               	{ "mDataProp": "infosBelongId","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
							
        		               		var v = '<a href="#" data-id="'+full.infosBelongId+'" data-name="'+full.infosBelongName+'" data-projects="'+full.projects+'" '+
									" data-departmentid='"+full.sysDepartment.departmentId+"' data-departmentname='"+full.sysDepartment.fullName+"' data-brandschool='"+full.brandSchool+"' class='view'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
	        		               	var e = '<a href="#" data-id="'+full.infosBelongId+'" data-name="'+full.infosBelongName+'" data-projects="'+full.projects+'" data-companyname="'+full.company.fullName+'"'+
	        		               		" data-departmentid='"+full.sysDepartment.departmentId+"' data-departmentname='"+full.sysDepartment.fullName+"' data-brandschool='"+full.brandSchool+"' class='edit' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>" 
	        		            	return v+e;
        		               	}},
        		   			],
	   			"aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
            	
            });

        }

    };

}();


$('.infoQuantityTable-warp #infoQuantityTable_wrapper').on('click','.dataTables_paginate .pagination li a',function(){
	$('.master').attr('checked',false);
})

</script>


<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>

<script src="${ctx_static }/home/configuration/js/infoQuantity.js"></script>
