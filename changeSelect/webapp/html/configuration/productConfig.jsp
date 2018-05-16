<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link href="${ctx_static }/home/configuration/css/productConfig.css" rel="stylesheet">


<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="tabbable">
                        <ul class="nav nav-tabs tabs-flat" id="myTab">
                            <li class="active">
                                <a data-toggle="tab" id="professionalTab" href="#professional">职业资格
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" id="educationTab" href="#education">学历
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content tabs-flat bordered-blue">
                        
                        	<!-- 职业资格 begin -->
                            <div id="professional" class="tab-pane in active">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-lg-6 col-md-9 col-sm-9 col-xs-12">
                                        <div class="form-group col-lg-7 col-md-7 col-sm-7 no-margin-right">
                                            <input type="text" class="form-control searchVal"
                                                   placeholder="项目/级别/班型" onkeydown="search('professional');">
                                        </div>
                                        <div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
                                            <select class="form-control" name="status">
                                                <option value="">全部</option>
                                                <option value="0">禁用</option>
                                                <option value="1">启用</option>
                                            </select>

                                        </div>
                                        <div class="form-group col-lg-2 col-md-2 col-sm-2">
                                            <button type="button" class="btn increase form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>

                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                                        <span class="btn btn-default pointer"
                                              title="View print view"><span>打印</span></span>
                                        <div class="btn-group">
                                            <button type="button"
                                                    class="btn btn-default dropdown-toggle"
                                                    data-toggle="dropdown">
                                                	导出
                                                <i class="fa fa-angle-up"></i>
                                            </button>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a href="#">保存PDF</a></li>
                                                <li><a href="#">导出EXCEL</a></li>
                                                <li><a href="#">导出CSV</a></li>
                                            </ul>
                                        </div>
                                        <button class="btn increase pull-right col-sm-4"
                                                data-toggle="modal"
                                                data-target=".professionalAdd"
                                                data-backdrop="static">
                                            <i class="fa fa-plus"></i>新增</button>
                                    </div>
                                </div>
                                <table id="professionalTable" class="table table-striped table-hover table-bordered dataTable no-footer">
                                    <thead>
                                    <tr role="row">
                                        <th width="5%">
                                            <label>
                                                <input type="checkbox" class="master1">
                                                <span class="text"></span>
                                            </label>
                                        </th>
                                        <th>所属项目</th>
                                        <th>级别</th>
                                        <th>授课形式</th>
                                        <th>班型</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <!-- 职业资格 end -->
                            
                            <div id="education" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-lg-6 col-md-9 col-sm-9 col-xs-12">
                                        <div class="form-group col-lg-7 col-md-7 col-sm-7 no-margin-right">
                                            <input type="text" class="form-control searchVal" placeholder="项目/级别/班型/院校/专业" onkeydown="search('education');">
                                        </div>
                                        <div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
                                            <select class="form-control" name="status">
                                                <option value="">全部</option>
                                                <option value="0">禁用</option>
                                                <option value="1">启用</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-lg-2 col-md-2 col-sm-2">
                                            <button type="button" class="btn increase form-control search-btn"> 
                                            	<i class="fa fa-search"></i> 搜索
                                            </button>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                                        <span class="btn btn-default pointer"
                                              title="View print view"><span>打印</span></span>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> 导出
                                                <i class="fa fa-angle-up"></i>
                                            </button>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a href="#">保存PDF</a></li>
                                                <li><a href="#">导出EXCEL</a></li>
                                                <li><a href="#">导出CSV</a></li>
                                            </ul>
                                        </div>
                                        <button class="btn increase pull-right col-sm-4"
                                                data-toggle="modal"
                                                data-target=".educationAdd"
                                                data-backdrop="static">
                                            <i class="fa fa-plus"></i>新增</button>
                                    </div>
                                </div>
                                <table id="educationTable" class="table table-striped table-hover table-bordered dataTable no-footer">
                                    <thead>
                                    <tr role="row">
                                        <th width="5%">
                                            <label>
                                                <input type="checkbox" class="master2">
                                                <span class="text"></span>
                                            </label>
                                        </th>
                                        <th>所属项目</th>
                                        <th>级别</th>
                                        <th>授课形式</th>
                                        <th>教育形式 </th>
                                        <th>院校 </th>
                                        <th>专业</th>
                                        <th>班型</th>
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
            <!--Widget-->
        </div>
    </div>
</div>


<!--新增职业资格-->
<div class="modal fade professionalAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="professionalAdd">
                
                	<input type="hidden" name="productId"/>
                
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">所属项目
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select id="projectId1" name="projectId" class="form-control projectId1 chosen-select">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">项目级别
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select name="projectLevelId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">授课形式
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                        	<input type="text" name="teachTypeName" class="form-control" readonly="readonly"/>	
                        	<input type="hidden" name="teachType" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">班型名称
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="className">
                        </div>
                    </div>
                    <div class="form-group">
	                    <label class="control-label col-sm-2 no-padding-right descripition-text">描述</label>
                        <div class="col-sm-10">
                            <textarea name="content1" style="width:720px;height:400px;visibility:hidden;"></textarea>
                            <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('#professionalAdd textarea[name="content1"]', {
									uploadJson : '${ctx }/file/uploadFile',
					                allowFileManager : true,
					                resizeType:0
					        	});
							});
                          </script> 
                        </div>
	                </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 职业资格说明配置 -->
<div class="modal fade professionalConfigure" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">说明配置</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="professionalConfigure" method="post">
               		 <input name="productId" type="hidden"/>
                	 <table id="professionalConfig" class="table table-striped table-hover table-bordered dataTable no-footer">  
                	 	<thead>
                	 		<tr role="row">
								<th width="5%"><label> <input type="checkbox" class="master3"> <span class="text"></span>
								</label></th>
								<th>配置说明</th>
							</tr>
                	 	</thead>      
                      </table>
                      <div class="form-group modal-footer">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--新增学历-->
<div class="modal fade educationAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="educationAdd">
                
                	<input type="hidden" name="productId"/>
                
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">所属项目
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select id="projectId2" name="projectId" class="form-control projectId2 chosen-select">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">项目级别
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select name="projectLevelId" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">授课形式
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                        	<input type="text" name="teachTypeName" class="form-control" readonly="readonly"/>	
                        	<input type="hidden" name="teachType" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">教育形式
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select name="educationForm" class="form-control">
                                <option value="1">自考</option>
                                <option value="2">远程</option>
                                <option value="3">成考</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">院校名称
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select name="schoolId" class="form-control chosen-select" id="schoolId">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">专业名称
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <select name="majorId" class="form-control chosen-select" id="majorId">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-1 no-padding-right no-padding-left margin-left-20">班型名称
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="className">
                        </div>
                    </div>
                    <div class="form-group">
	                    <label class="control-label col-sm-2 descripition-text no-padding-right">描述</label>
                        <div class="col-sm-10">
                            <textarea name="content2" style="width:720px;height:400px;visibility:hidden;"></textarea>
                            <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								
								editor2 = KindEditor.create('#educationAdd textarea[name="content2"]', {
									uploadJson : '${ctx }/file/uploadFile',
					                allowFileManager : true
					        	});
							});
                          </script> 
                        </div>
	                </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 学历说明配置 -->
<div class="modal fade educationConfigure" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">说明配置</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="educationConfigure" method="post">
                	<input name="productId" type="hidden"/>
                 	<table id="educationConfig" class="table table-striped table-hover table-bordered dataTable no-footer"> 
                 	<thead>
                	 		<tr role="row">
								<th width="5%"><label> <input type="checkbox" class="master4"> <span class="text"></span>
								</label></th>
								<th>配置说明</th>
							</tr>
                	 	</thead>          
                      </table>
                      <div class="form-group modal-footer">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="from" value="${from }"/>

<script>
//table初始化_职业资格
    var InitiateSimpleDataTable1 = function () {
    	
        return {
            init: function () {
                //Datatable Initiating
                var oTable = $('#professionalTable').dataTable({
                	"bPaginate": true,  //是否显示分页
                	"iDisplayLength": 10,
                	"bLengthChange": false,//每页显示的记录数
                	"bFilter": false, //搜索栏
                	"bSort": true, //是否支持排序功能
                	"bInfo": true, //显示表格信息
                	"bAutoWidth": false,  //自适应宽度
                	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                	"sAjaxSource" : ctx+'/bizProduct/getAll',
            		"fnServerData": retrieveData1,//用于替换默认发到服务端的请求操作  
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
            		               	{ "mDataProp": "productId","bSortable": false,'sClass': "text-center", "mRender":function(data, type, full){
            		               		return "<label> <input type='checkbox' class='slaver1'> <span class='text'></span> </label>";
            		               	}},
            		               	{ "mDataProp": "bizProject.fullName","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "bizProjectLevel.levelTitle","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "teachType","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
            		               		switch(data){
	            		               		case 1:
	            		               			return "面授";
	            		               			break;
	            		               		case 2:
	            		               			return "直播";
	            		               			break;
	            		               		case 3:
	            		               			return "录播";
	            		               			break;
            		               		}	
            		               		
            		               	}}, 
            		               	{ "mDataProp": "className","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
            		               		return data?'<a href="#" data-id="'+full.productId+'" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>':'<a href="#" data-id="'+full.productId+'" class="btn btn-nouse btn-xs status-btn"><i class="fa fa-ban"></i> 禁用</a>';
            		               	}},
            		               	{ "mDataProp": "productId","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
            		               		return "<a href='#' data-reocrd='"+JSON.stringify(full)+"' class='edit' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>"+
    		               						"<a href='#' data-id='"+data+"' data-from='1' class='price' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-cny azure' data-toggle='tooltip' data-placement='top' data-original-title='价格管理' title='价格管理'></i> </a>"+
            		               				'<a onclick="editView(\''+full["productId"] +'\',\''+full["productDesc"]+'\')" class="jobs-configure editView" data-toggle="modal" data-target=".professionalConfigure" data-backdrop="static"><i class="fa fa-cog primary"  data-toggle="tooltip" data-placement="top" data-original-title="说明配置" title="说明配置"></i></a>';
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
    
    //table初始化_学历
    var InitiateSimpleDataTable2 = function () {
    	
        return {
            init: function () {
                //Datatable Initiating
                var oTable = $('#educationTable').dataTable({
                	"bPaginate": true,  //是否显示分页
                	"iDisplayLength": 10,
                	"bLengthChange": false,//每页显示的记录数
                	"bFilter": false, //搜索栏
                	"bSort": true, //是否支持排序功能
                	"bInfo": true, //显示表格信息
                	"bAutoWidth": false,  //自适应宽度
                	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                	"sAjaxSource" : ctx+'/bizProduct/getAll',
            		"fnServerData": retrieveData2,//用于替换默认发到服务端的请求操作  
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
            		               	{ "mDataProp": "productId","bSortable": false,'sClass': "text-center", "mRender":function(data, type, full){
            		               		return "<label> <input type='checkbox' class='slaver2'> <span class='text'></span> </label>";
            		               	}},
            		               	{ "mDataProp": "bizProject.fullName","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "bizProjectLevel.levelTitle","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "teachType","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
            		               		switch(data){
	            		               		case 1:
	            		               			return "面授";
	            		               			break;
	            		               		case 2:
	            		               			return "直播";
	            		               			break;
	            		               		case 3:
	            		               			return "录播";
	            		               			break;
            		               		}	
            		               		
            		               	}}, 
            		               	{ "mDataProp": "educationForm","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
            		               		switch(data){
	            		               		case 1:
	            		               			return "自考";
	            		               			break;
	            		               		case 2:
	            		               			return "远程";
	            		               			break;
	            		               		case 3:
	            		               			return "成考";
	            		               			break;
            		               		}	
            		               		
            		               	}}, 
            		               	{ "mDataProp": "bizSchool.schoolName","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "bizMajor.majorName","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "className","bSortable": true,'sClass': "text-center"},
            		               	{ "mDataProp": "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
            		               		return data?'<a href="#" data-id="'+full.productId+'" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>':'<a href="#" data-id="'+full.productId+'" class="btn btn-nouse btn-xs status-btn"><i class="fa fa-ban"></i> 禁用</a>';
            		               	}},
            		               	{ "mDataProp": "productId","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
            		               		return "<a href='#' data-reocrd='"+JSON.stringify(full)+"' class='edit' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-edit blue'  data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>"+
            		               		" <a href='#' data-id='"+data+"' data-from='2'  class='price' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-cny azure' data-toggle='tooltip' data-placement='top' data-original-title='价格管理' title='价格管理'></i></a>"+		
            		               		'<a onclick="editView1(\''+full["productId"] +'\',\''+full["productDesc"]+'\')" class="jobs-configure editView1" data-toggle="modal" data-target=".educationConfigure" data-backdrop="static"><i class="fa fa-cog primary"  data-toggle="tooltip" data-placement="top" data-original-title="说明配置" title="说明配置"></i></a>';
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

</script>

<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/home/configuration/js/productConfig.js"></script>
