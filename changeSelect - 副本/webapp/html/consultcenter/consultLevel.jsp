<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link rel="stylesheet" href="${ctx_static }/home/consultcenter/css/infoManagement.css">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
       		<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">咨询等级</span>
            </div>
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                <input class="form-control" placeholder="等级名称" type="text" id="searchVal" name="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                <!-- <a type="button" onclick="init()" class="btn increase form-control search-btn" href="javascript:void(0);"> -->
                                <i class="fa fa-search"></i> 搜索
                                </a>

                            </div>
                        </div>


                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                            <shiro:hasPermission name="consultInfoManage:add">
                            <button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target="#addInquiries">
                            	<i class="fa fa-plus"></i> 新增
                            </button>
                            </shiro:hasPermission>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="infoManage" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>序号</th>
                                    <th>等级名称</th>
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
<!--创建咨询等级-->
<div class="modal fade addInquiries" id="addInquiries" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">创建咨询等级</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="inquiries" method="post">
					<!-- 咨询课程 -->
                    <div class="counselCurriculum col-sm-12 no-padding">
	                    <div class="form-group col-sm-12">
	                        <label class="control-label col-sm-2 pull-left">咨询等级名称</label>
	                        <div class="col-sm-10 ">
	                            <input class="form-control consultLevelName" name="consultLevelName" type="text">
	                        </div>
	                    </div>
	                    <!-- 富文本编辑器 -->
	                    <!-- <div class="form-group col-sm-12 dialogueRecord">
	                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话记录<span id="talk"> </span></label>
	                        <div class="col-sm-10">
							  <textarea name="conversation" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
	                          <script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('textarea[name="conversation"]',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0 
									});
								});
	                          </script>                           
	                        </div>
                        </div> -->
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
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal fade bs-exampleUpdate-modal-lg editRecord" id="editRecord" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display:none">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">咨询等级信息</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="editConsultLevel">
                    <div class="counselCurriculum col-sm-12 no-padding">
	                    <div class="col-sm-12">
		                    <div class="form-group col-md-12 col-sm-12 margin-left-10">
		                        <label class="control-label col-sm-2 pull-left" style="">咨询等级名称</label>
		                        <div class="col-sm-9" style="width:80%">
		                           <input type="text" class="form-control consultLevelName" name="consultLevelName" id="addConsultLevelName">
		                           <input type="hidden" class="form-control consultLevelName" name="consultLevelId" id="addConsultLevelId">
		                        </div>
		                    </div>
	                    </div>
	                    <!--富文本编辑器  -->
	                    <!-- <div class="form-group col-sm-12 dialogueRecord">
	                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">对话记录</label>
	                        <div class="col-md-9 col-sm-9">
							  <textarea name="conversation2" id="conversation2" class="conversation2" style="width:500px;height:400px;visibility:hidden;"></textarea>
	                          <script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor2 = KindEditor.create('textarea[name="conversation2"]',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0,
										readonlyMode : true
									});
								});
	                          </script>    
	                        </div>
                    	</div> -->
                	</div>
                	<div class="form-group col-sm-12 modal-footer no-margin-left">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control edit-btn" data-toggle="modal"
                                    data-backdrop="static">确定
                            </button>
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

<script>
var infoDisDep = "${dep}";
/*自定义日期格式化:yyyy-MM-dd HH:mm:ss*/    
Date.prototype.toLocaleString = function() {
	  var monthStr = this.getMonth() + 1;
	  if(monthStr<=9) {
		  monthStr = "0"+monthStr;
	  }
	  var dayStr = this.getDate();
	  if(dayStr<=9) {
		  dayStr = "0"+dayStr;
	  }
	  var hoursStr = this.getHours();
	  if(hoursStr<=9) {
		  hoursStr = "0"+hoursStr;
	  }
	  var minutesStr = this.getMinutes();
	  if(minutesStr<=9) {
		  minutesStr = "0"+minutesStr;
	  }
	  var secondsStr = this.getSeconds();
	  if(secondsStr<=9) {
		  secondsStr = "0"+secondsStr;
	  }
    return this.getFullYear() + "-" + (monthStr) + "-" + dayStr + " " + hoursStr + ":" + minutesStr + ":" + secondsStr;
};
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
            	//"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/consultLevel/load',
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
						{"mData": "sortCode", 'sClass': "text-center"},
						{"mData": "consultLevelName", 'sClass': "text-center"},
						{
			                "mData": "enable",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                	if(full.enable==0){
			                    return '<span style="width: inherit" id="span'+full["consultLevelId"]+'" onclick="chooseConsultLevel(\''+full["consultLevelId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
					          	}else{
					          	return '<span style="width: inherit" id="span'+full["consultLevelId"]+'" onclick="chooseConsultLevel(\''+full["consultLevelId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
					          	}
			                }
			            },
						{
			                "mData": "",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                    var u = '<shiro:hasPermission name="consultLevel:edit"><a onclick="edit(\''+full["consultLevelId"]+'\',\''+full["consultLevelName"]+'\')" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
			    		                +'<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
			                    
			                    return u;
			                }
			            }

                ],
                "aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
	   	     "fnRowCallback":function(nRow,aData,iDisplayIndex){
/* 	   	    	if(aData.status=='1'){
	   	    		$('td:eq(3)',nRow).html('已创建');
	   	    	}else if(aData.status=='2'){
	   	    		$('td:eq(3)',nRow).html('待沟通');
	   	    	}else if(aData.status=='3'){
	   	    		$('td:eq(3)',nRow).html('已沟通');
	   	    	}else if(aData.status=='4'){
	   	    		$('td:eq(3)',nRow).html('预约');
	   	    	}else if(aData.status=='5'){
	   	    		$('td:eq(3)',nRow).html('上门');
	   	    	}else if(aData.status=='6'){
	   	    		$('td:eq(3)',nRow).html('订座');
	   	    	}else if(aData.status=='7'){
	   	    		$('td:eq(3)',nRow).html('报名');
	   	    	}else{
	   	    		$('td:eq(3)',nRow).html('已创建');
	   	    	}
 */	   	    	return nRow;
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
</script>

<script src="${ctx_static }/home/consultcenter/js/consultLevel.js"></script>