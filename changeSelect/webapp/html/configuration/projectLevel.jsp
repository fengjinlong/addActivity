<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/configuration/css/projectLevel.css" rel="stylesheet">
<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12 projectManage">
        <div class="row ">
            <!--项目种类-->
            <div class="col-sm-4 projectType">
                <div class="drop-down">
                    <div class="widget-header bordered-bottom bordered-themeprimary">
                        <span class="widget-caption" style="line-height:40px !important">项目种类</span>
                        <shiro:hasPermission name="bizProject:add">
                        <a href="javascript:;" class="fa fa-plus-square-o pull-right projectAddBtn"
			               data-toggle="modal" data-target=".projectAdd" data-backdrop="static">
			            </a>
            			</shiro:hasPermission>
                    </div>
                    <ul class="nav sidebar-menu">
                        <li>
                            <a href="#" class="menu-dropdown">
                                <span class="menu-text">职业资格</span>
                                <i class="fa fa-angle-right pull-right"></i>
                            </a>
                            <ul class="submenu qualification">
                                <!-- <li>
                                    <a href="#">
                                        <span class="menu-text">01人力资源管理师</span>
                                        <div class="operate-btn">
                                            <i class="fa fa-edit blue" data-toggle="modal" data-backdrop="static"></i>
                                            <i class="fa fa-check-square-o success forbidden"></i>
                                        </div>
                                    </a>
                                </li> -->
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="menu-dropdown">
                                <span class="menu-text">学历</span>
                                <i class="fa fa-angle-right pull-right"></i>
                            </a>

                            <ul class="submenu education">
                               <!--  <li>
                                    <a href="javascript:;">
                                        <span class="menu-text">03学历</span>
                                        <div class="operate-btn">
                                            <i class="fa fa-edit blue" data-toggle="modal" data-backdrop="static"></i>
                                            <i class="fa fa-check-square-o success forbidden"></i>
                                        </div>
                                    </a>
                                </li> -->
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <!--级别-->
            <div class="col-sm-8 level">
                <div class="widget">
                    <div class="widget-header bordered-bottom bordered-themeprimary">
                        <span class="widget-caption" style="line-height:40px !important">级别</span>
                        <shiro:hasPermission name="bizProject:add">
                        <a class="btn btn-lightBlue btn-sm levelAdd" style="margin-top:4px">
                             <i class="fa fa-plus"></i> 新增
                        </a>
                        </shiro:hasPermission>
                    </div>

                    <div class="widget-body level-table">
                        <div class="widget-main no-padding">
                        	
                        	<span class="project-title">未选择任何项目种类</span>
                        
                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="projectLevel">
                            	<input type="hidden" name="projectId"/>
                                <thead>
                                <tr role="row">
                                    <th>项目</th>
                                    <th>级别</th>
                                    <th>授课形式</th>
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
    </div>
</div>

<%@ include file="../common/public_footer.jsp"%>

<!--新增项目-->
<div class="modal fade projectAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="projectAdd">
                
                	<input type="hidden" name="projectId"/>
                	
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">项目种类<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <select name="projectType" class="form-control">
                                <option value="">--请选择--</option>
                                <option value="1">职业资格</option>
                                <option value="2">学历</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">项目全称<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="fullName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">项目简称<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="shortName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">编号<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="code">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-4 col-sm-offset-3">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>

//项目菜单加载
$.ajax({
	url : ctx + '/bizProject/getAll',
	dataType : 'json',
	type : 'post',
	success : function(data){
		if(data.status != "success"){
			toastr.error(data.msg);
		}else{
			var qualification = "";
			var education = "";
			for(var i=0; i<data.list.length; ++i){
				if(data.list[i].projectType == 1){//职业资格
					qualification += "<li> <a href='#' data-record='"+JSON.stringify(data.list[i])+"'><span class='menu-text'>"+data.list[i].fullName+"</span><div class='operate-btn'>" +
						"<shiro:hasPermission name='bizProject:edit'><i class='fa fa-edit blue' data-record='"+JSON.stringify(data.list[i])+"' data-toggle='modal' data-backdrop='static'></i></shiro:hasPermission>" +
						"<shiro:hasPermission name='bizProject:delete'><i class='fa fa-trash-o red' data-record='"+JSON.stringify(data.list[i])+"' data-toggle='modal' data-backdrop='static'></i></shiro:hasPermission>" +
						'</div></a></li>';
				}else{//学历
					education += "<li> <a href='#' data-record='"+JSON.stringify(data.list[i])+"'><span class='menu-text'>"+data.list[i].fullName+"</span><div class='operate-btn'>" +
						"<shiro:hasPermission name='bizProject:edit'><i class='fa fa-edit blue' data-record='"+JSON.stringify(data.list[i])+"' data-toggle='modal' data-backdrop='static'></i></shiro:hasPermission>" +
						"<shiro:hasPermission name='bizProject:delete'><i class='fa fa-trash-o red' data-record='"+JSON.stringify(data.list[i])+"' data-toggle='modal' data-backdrop='static'></i></shiro:hasPermission>" +
						'</div></a></li>';
				}
			}
			
			$('.projectType .qualification').html(qualification);
			$('.projectType .education').html(education);
			
		}
	},
	error : function(){
		toastr.error("系统错误");
	}
});

var InitiateSimpleDataTable = function () {
    return {
        init: function () {
        	
        	var fullName = $('.project-title').text();
        	var projectId = $('#projectLevel input[name="projectId"]').val();
        	
            //Datatable Initiating
            var oTable = $('#projectLevel').dataTable({
            	"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 5,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizProjectLevel/getAll',
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
        		               	{ "mDataProp": "projectLevelId","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
        		               		return fullName;
        		               	}},
        		               	{ "mDataProp": "levelTitle","bSortable": true,'sClass': "text-center"}, 
        		               	{ "mDataProp": "teachType","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
        		               		var teachType = {};
        		               		teachType[1] = "面授";
        		               		teachType[2] = "直播";
        		               		teachType[3] = "录播";
        		               		
        		               		return teachType[data];
        		               		
        		               	}},
        		               	{ "mDataProp": "enable","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
        		               		return data?'启用':'禁用';
        		               	}},
        		               	{ "mDataProp": "projectLevelId","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
        		               		return  "<shiro:hasPermission name='bizProject:edit'><a href='#' data-id='"+data+"' data-enable='"+full.enable+"' data-teachtype='"+full.teachType+"' class='edit'><i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a></shiro:hasPermission>"
		        		               	+ "<shiro:hasPermission name='bizProject:delete'><a href='#' data-id='"+data+"' data-enable='"+full.enable+"' data-teachtype='"+full.teachType+"' class='delete'><i class='fa fa-trash-o danger' data-toggle='tooltip' data-placement='top' data-original-title='删除' title='删除'></i></a></shiro:hasPermission>";
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

<script src="${ctx_static }/home/configuration/js/projectLevel.js"></script>

