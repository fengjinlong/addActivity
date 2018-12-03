<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.css">
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link href="${ctx_static }/home/configuration/css/tutorialFee.css" rel="stylesheet">
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="tabbable">
                        <ul class="nav nav-tabs tabs-flat" id="myTab11">
                            <li class="active">
                                <a data-toggle="tab" href="#home11">辅导费设置</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#profile11">辅导费种类</a>
                            </li>
                        </ul>
                        <div class="tab-content tabs-flat">
                            <div id="home11" class="tab-pane in active">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group col-md-9 col-sm-9 no-margin-right">
                                            <input type="text" class="form-control" placeholder="院校/专业/级别/辅导费种类" id="searchVal" onkeydown="search();">
                                        </div>
                                        <div class="form-group col-md-3 col-sm-3">
                                            <a type="button" class="btn increase form-control search-btn" href="javascript:feeDataTable.init();"> 
                                            	<i class="fa fa-search"></i> 搜索
                                            </a>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-1  pull-right margin-right-5">
                                    <shiro:hasPermission name="bizTutorialFee:add">
                                        <button class="btn increase pull-right form-control" data-toggle="modal" data-target=".bizTutorialFeeSetAdd" data-backdrop="static">
                                        	<i class="fa fa-plus"></i> 新增
                                        </button>
                                    </shiro:hasPermission>
                                    </div>
                                </div>
                                <div class="dataTables_wrapper form-inline no-footer">
                                    <div class="table-scrollable">
                                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="moneyKind">
                                            <thead>
                                            <tr role="row">
                                                <th>教育形式 </th>
                                                <th>院校</th>
                                                <th>级别 </th>
                                                <th>专业 </th>
                                                <th>辅导费种类</th>
                                                <th>状态 </th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="profile11" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="form-group col-sm-1  pull-right margin-right-5">
                                    <shiro:hasPermission name="bizTutorialFee:add">
                                        <button class="btn increase pull-right form-control add-line">
                                        	<i class="fa fa-plus"></i> 新增
                                        </button>
                                    </shiro:hasPermission>
                                    </div>
                                </div>
                                <table id="tutorialFee" class="table table-bordered table-hover dataTable no-footer add-table">
                                    <thead>
                                    <tr role="row">
                                    	<th class="hidden">教育费种类ID</th>
                                        <th>辅导费种类名称</th>
                                        <th>费用说明 </span></th>
                                        <th>状态</span></th>
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
</div>

<!--新增-->
<div id="bizTutorialFeeSetAdd" class="modal fade new bizTutorialFeeSetAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="addBizTutorialFeeSet" method="post">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">教育形式</label>
                        <div class="col-sm-9">
                            <select name="educationForm" class="form-control">
                                <option value="1">自考</option>
                                <option value="2">远程</option>
                                <option value="3">成考</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">项目</label>
                        <div class="col-sm-9">
                            <select id="projectId" name="projectId" class="form-control chosen-select"></select>
                        </div>
                    </div>
                    <div class="col-sm-12 no-padding">
	                    <div class="form-group col-sm-6">
	                        <label class="control-label col-sm-3 no-padding-right no-padding-left">项目级别</label>
	                        <div class="col-sm-9">
	                            <select name="projectLevelId" class="form-control"></select>
	                        </div>
	                    </div>
	                    <div class="form-group col-sm-6">
	                        <label class="control-label col-sm-3 no-padding-right no-padding-left">院校</label>
	                        <div class="col-sm-9">
	                            <select id="schoolId" name="schoolId" class="form-control chosen-select"></select>
	                        </div>
	                    </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">专业</label>
                        <div class="col-sm-9">
                            <select name="majorId" class="selectpicker show-tick form-control" multiple required title="--请选择--"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">辅导费种类名称</label>
                        <div class="col-sm-9">
                            <select name="tutorialFeeId" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">收费标准</label>
                        <div class="col-sm-9">
                            <input name="fee" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">费用说明</label>
                        <div class="col-sm-9">
                            <input name="tutorialFeeSetDesc" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-12" style="margin-top:22px">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control">确认</button>
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

<!--查看-->
<div class="modal fade divideView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="viewBizTutorialFeeSet">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">教育形式</label>
                        <div class="col-sm-9">
                            <select name="educationForm" class="form-control" disabled>
                            	<option value="1">自考</option>
                            	<option value="2">远程</option>
                            	<option value="3">成考</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">级别</label>
                        <div class="col-sm-9">
                       		<input name="levelTitle" class="form-control" disabled></input>
                            <input type="hidden" name="projectLevelId" class="form-control" disabled></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">院校</label>
                        <div class="col-sm-9">
                        	<input name="schoolName" class="form-control" disabled></input>
                            <input type="hidden" name="schoolId" class="form-control" disabled></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">专业</label>
                        <div class="col-sm-9">
                            <input type="hidden" name="majorId" class="form-control" disabled></input>
                            <input name="majorName" class="form-control" disabled></input>
                        </div>
                    </div>
                    <table class="table table-bordered table-hover dataTable no-footer" id="tutorialFeeSet">
                        <thead>
                        <tr role="row">
                            <th>教育费种类名称</th>
                            <th>费用标准 </th>
                            <th>费用说明</th>
                            <th>状态 </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade divideView2" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="divideView" method="post">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">教育形式</label>
                        <div class="col-sm-9">
                            <select name="educationForm" class="form-control" disabled>
                            	<option value="1">自考</option>
                            	<option value="2">远程</option>
                            	<option value="3">成考</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">级别</label>
                        <div class="col-sm-9">
                            <input name="levelTitle" class="form-control" disabled></input>
                            <input type="hidden" name="projectLevelId" disabled></input>
                            <input type="hidden" name="projectId" disabled></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">院校</label>
                        <div class="col-sm-9">
                            <input name="schoolName" class="form-control" disabled></nput>
                            <input type="hidden" name="schoolId" disabled></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">专业</label>
                        <div class="col-sm-9">
                            <input name="majorName" class="form-control" disabled></input>
                            <input type="hidden" name="majorId" disabled></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-4 no-padding margin-left-5">
                        <label class="control-label col-sm-4 no-padding-right no-padding-left">辅导费种类名称</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="tutorialFeeId">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-3 margin-left-20 no-padding">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">收费标准</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="fee">
                        </div>
                    </div>
                    <div class="form-group col-sm-3 margin-left-20 no-padding">
                        <label class="control-label col-sm-3 no-padding-right no-padding-left">费用说明</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="tutorialFeeSetDesc">
                        </div>
                    </div>
                    <div class="form-group col-sm-1 margin-left-20 no-padding">
                        <button type="submit" class="btn btn-primary">确认</button>
                    </div>
                    <table class="table table-bordered table-hover dataTable no-footer" id="scoachingType">
                        <thead>
                        <tr role="row">
                        	<th class="hidden">id</th>
                            <th>教育费种类名称 </th>
                            <th>费用标准 </th>
                            <th>费用说明 </th>
                            <th class="hidden">tid</th>
                            <!-- <th>状态 </th> -->
                            <th>操作</th>
                        </tr>
                        </thead>

                        <tbody>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
</div>
<!--下拉框多选插件-->
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.js"></script>

<script>
//初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#tutorialFee').dataTable({
				"bPaginate": true,  //是否显示分页
//            	"iDisplayLength": 15,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizTutorialFee/load',
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
       			            {"mData": "tutorialFeeId", 'sClass': "hiddenCol tutorialFeeId"},
       			            {"mData": "tutorialFeeName", 'sClass': "text-center tutorialFeeName"},
       			            {"mData": "tutorialFeeDesc", 'sClass': "text-center tutorialFeeDesc"},
       			            {"mData": "enable", 'sClass': "text-center enable","bSortable": false,"mRender":function(data, type, full ){
       			            	if(data==0){
       			          		  return '<span id="span'+full["tutorialFeeId"]+'" onclick="chooseStudent(\''+full["tutorialFeeId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
       			          	  }else{
       			          		  return '<span id="span'+full["tutorialFeeId"]+'" onclick="chooseStudent(\''+full["tutorialFeeId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
       			          	  }
       			            }},
       			            {
       			                "mData": "tutorialFeeId",
       			                'sClass': "text-center",
       			                "bSortable": false,
       			                "mRender": function (data, type, full ) {
               			                    var u = '<shiro:hasPermission name="bizTutorialFee:edit"><a href="#" class="operate-btn edit" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
               			                    var d = '<shiro:hasPermission name="bizTutorialFee:delete"><a href="#" class="operate-btn delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></shiro:hasPermission>';
               			                    return u + d;
       			                }
       			            }
       			        ],
       			     "aoColumnDefs": [{
 		   	            sDefaultContent: '',
 		   	            aTargets: ['_all']
 		   	        }],
			});

			//每页显示记录数
			$('#tutorialFee_wrapper .dataTables_info').parent().append($('#tutorialFee_wrapper .dataTables_length'));
		}
	}
}();

//辅导费列表
var feeDataTable = function(){
	return{
		init: function(){
			var Table = $('#moneyKind').dataTable({
				"bPaginate": true,  //是否显示分页
//            	"iDisplayLength": 15,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizTutorialFeeSet/load',
        		"fnServerData": feeFetrieveData,//用于替换默认发到服务端的请求操作  
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
       			            {"mData": "educationForm", 'sClass': "text-center"},
       			            {"mData": "bizSchool.schoolName", 'sClass': "text-center"},
       			            {"mData": "bizProjectLevel.levelTitle", 'sClass': "text-center"},
       			            {"mData": "majorName", 'sClass': "text-center"},
       			            {"mData": "bizTutorialFee.tutorialFeeName", 'sClass': "text-center"},
       			            {"mData": "enable", 'sClass': "text-center enable","bSortable": false,"mRender":function(data, type, full ){
       			            	if(data==0){
       			          		  return '<span id="span'+full["tutorialFeeSetId"]+'" onclick="chooseTutorialFeeSet(\''+full["tutorialFeeSetId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
       			          	  }else{
       			          		  return '<span id="span'+full["tutorialFeeSetId"]+'" onclick="chooseTutorialFeeSet(\''+full["tutorialFeeSetId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
       			          	  }
       			            }},
       			            {
       			                "mData": "tutorialFeeSetId",
       			                'sClass': "text-center",
       			                "bSortable": false,
       			                "mRender": function (data, type, full ) {
               			                    var r = '<a onclick="edit(\''+full["tutorialFeeSetId"] 
               			                    +'\',\''+full["educationForm"]
               			                    +'\',\''+full["projectLevelId"]
               			                    +'\',\''+full["schoolId"]
               			                    +'\',\''+full["majorId"]
               			                    +'\',\''+full["majorName"]+'\')" class="view" data-toggle="modal" data-backdrop="static" data-target=".divideView"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
               			                    var u = '<shiro:hasPermission name="bizTutorialFee:edit"><a onclick="editView(\''+full["tutorialFeeSetId"] 
               			                    +'\',\''+full["educationForm"]
               			                    +'\',\''+full["projectId"]
               			                    +'\',\''+full["projectLevelId"]
               			                    +'\',\''+full["schoolId"]
               			                    +'\',\''+full["majorId"]
               			                    +'\',\''+full["majorName"]+'\')" class="edit" data-target=".divideView2" data-toggle="modal" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
               			                    return r + u;
       			                }
       			            }
       			        ],
       			     "aoColumnDefs": [{
 		   	            sDefaultContent: '',
 		   	            aTargets: ['_all']
 		   	        }],
 		   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	   	        	if(aData.educationForm=='1'){
	   	        		$('td:eq(0)',nRow).html('自考');
	   	        	}else if(aData.educationForm=='2'){
	   	        		$('td:eq(0)',nRow).html('远程');
	   	        	}else if(aData.educationForm=='3'){
	   	        		$('td:eq(0)',nRow).html('成考');
	   	        	}
	   	        	return nRow;
	   	        },
			});
			//每页显示记录数
			$('#moneyKind_wrapper .dataTables_info').parent().append($('#moneyKind_wrapper .dataTables_length'));
		}
	}
}();

</script>

<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/home/configuration/js/tutorialFee.js"></script>
