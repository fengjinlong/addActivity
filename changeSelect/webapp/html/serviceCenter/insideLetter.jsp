<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/serviceCenter/css/insideLetter.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">站内信</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-7 col-sm-7 col-xs-12 ">
							<div class="form-group col-md-8 col-sm-8 col-lg-8 no-margin-right">
								<input onkeydown="search();" class="form-control" placeholder="分校/课程/级别/日期/姓名/课程标号/电话号码" type="text" id="searchVal">
							</div>
							<div class="form-group col-md-3 col-sm-3 col-lg-3">
								<a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
									<i class="fa fa-search"></i>搜索
								</a>
							</div>
						</div> 
						<div class="col-md-3 col-sm-3 pull-right">
						   <c:if test="${sessionScope.rowWrite eq '1' }">
							<button class="btn increase pull-right add-btn" data-toggle="modal" data-backdrop="static" data-target=".write"><i class="fa fa-pencil"></i>写信 </button>
						   </c:if>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="insideLetter">
								<thead>
									<tr role="row" class="text-center">
										<th>分校</th>
										<th>项目</th>
										<th>级别</th>
										<th>姓名</th>
										<th>课程编号</th>
										<th>电话</th>
										<th>类型</th>
										<th>主题</th>
										<th>日期</th>
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

<!--写信-->
<div class="modal fade write" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">写信</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal clearfix" id="write"  enctype="multipart/form-data">
				<div class="form-group col-md-5">
                        <label class="control-label col-md-3 no-padding-right" style="margin-left:-14px;">归属分校</label>
                        <div class="col-md-8">
                            <select name="schoolId" class="form-control branch-school chosen-select" data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div>
					<div class="form-group col-md-7">
						<label class="control-label text-left col-md-3 no-padding-right">报名时间</label>
						<div class="col-md-8 no-padding-right">
							<div class="controls">
								<div class="input-group">
									<input type="text" class="form-control" id="registrationTime" name="applyDate">
									<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-md-5" style="margin-left:-56px;">
						<label class="control-label col-sm-4 no-padding-right">项目</label>
						<div class="col-sm-8">
							<select name="projectId" class="form-control project"></select>
						</div>
					</div>
					<div class="form-group col-md-3" style="margin-left:-40px;">
						<label class="control-label col-sm-4 no-padding-right">级别</label>
						<div class="col-sm-8 no-padding-right">
							<select name="levelId" class="form-control"></select>
						</div>
					</div>
					<div class="form-group col-md-4">
						<label class="control-label col-sm-2 no-padding-right">班型</label>
						<div class="col-sm-8 no-padding-right" style="width:79%">
							<select name="classId" class="form-control"></select>
						</div>
					</div>
					<div class="form-group col-md-2">
						<a class="btn btn-primary load-btn" href="javascript:selectBmnumber();">加载</a>	
					</div>
					<div class="form-group col-md-12">
						<label class="control-label col-md-1 no-padding-right">收件人</label>
						<div class="col-md-10 no-padding-right">
							<input type="text" class="form-control" name="receiver">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-md-1 no-padding-right">主题</label>
						<div class="col-md-10 no-padding-right">
							<input type="text" class="form-control" name="title">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-md-1 no-padding-right">内容</label>
						<div class="col-md-10 no-padding-right">
							<textarea name="contenta" id='contenta' class="content" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          	<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('#contenta',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:1,
										allowFileManager: true,
										afterBlur: function(){this.sync();}
									});
								});
                          	</script> 
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-md-1 no-padding-right">附件</label>
						<div class="col-md-10 no-padding-right">
							<input type="file" id="adjunct-upload1" name="files" multiple>
							<input id="returnFile"  type="hidden" >
						</div>						
					</div>
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">发送</button>
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

<!--回复-->
<div class="modal fade reply" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">回复</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="reply">
					<div class="form-group col-sm-12">
						<label class="control-label col-md-1 no-padding-right">对话记录</label>
						<div class="col-md-10 no-padding-right">
							<textarea name="contents" rows="6" class="form-control" readonly="readonly"></textarea>
							<input type="hidden" name="mailId">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-md-1 no-padding-right">内容</label>							
						<div class="col-md-10">
							<textarea name="content" class="content" style="width:500px;height:400px;visibility:hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor1 = KindEditor.create('textarea[name="content"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 ,
									afterBlur: function(){this.sync();}
								});
							});
                          	</script> 
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-md-1 no-padding-right">附件</label>
						<div class="col-md-10 no-padding-right">
							<input type="file" id="adjunct-upload2" name="file" multiple>
							<input id="returnFile1"  type="hidden" >
						</div>
					</div>
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">发送</button>
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
<script type="text/javascript">
//初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#insideLetter').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	"sAjaxSource" : ctx+'/insideLetter/load', 
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
        			            {"mData": "school", 'sClass': "text-center"},
        			            {"mData": "project", 'sClass': "text-center"},
        			            {"mData": "level", 'sClass': "text-center"},
        			            {"mData": "studentName", 'sClass': "text-center"},
        			            {"mData": "receiver", 'sClass': "text-center"},
        			            {"mData": "studentPhone", 'sClass': "text-center"},
        			            {"mData": "status", 'sClass': "text-center"},
        			            {"mData": "title", 'sClass': "text-center"},
        			            {"mData": "createDate", 'sClass': "text-center"},
        			            {"mData": "enable", 'sClass': "text-center"},
        			            {
        			                "mData": "mailId",
        			                'sClass': "text-center",
        			                "bSortable": false,
        			                "mRender": function (data, type, full ) {
        			                    var h = '<a href="#" class="edit" data-toggle="modal" data-backdrop="static" data-target=".reply" onclick="selectInsideLetter(\''+full["content"]+'\',\''+full["mailId"]+'\')"><i class="fa fa-mail-reply blue" data-toggle="tooltip" data-placement="top" data-original-title="回复" title="回复"></i></a>';
        			                    var d ='<a href="#" class="delete" onclick="deleteInsideLetter(\''+full["mailId"]+'\')"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></td>';
        			                    return h+d;
        			                }
        			            }
        			        ],
        			       "aoColumnDefs": [{
         		   	            sDefaultContent: '',
         		   	            aTargets: ['_all']
         		   	        }],
         		   	    "fnRowCallback":function(nRow,aData,iDisplayIndex){
	         		   	    if(aData.enable=='1'){
	        	   	    		$('td:eq(9)',nRow).html('有效');
	        	   	    	}else if(aData.enable=='0'){
	        	   	    		$('td:eq(9)',nRow).html('无效');
	        	   	    	}
		         		   	if(aData.status=='1'){
	        	   	    		$('td:eq(6)',nRow).html('接收');
	        	   	    	}else if(aData.status=='0'){
	        	   	    		$('td:eq(6)',nRow).html('发送');
	        	   	    	}
         		   	    	return nRow;
         		   	    }
			})
			$("#insideLetter_wrapper").removeClass();
		    $('#insideLetter_wrapper').addClass("table-scrollable");

		    //每页显示记录数
		    $('#insideLetter_wrapper .dataTables_info').parent().append($('#insideLetter_wrapper .dataTables_length')); 
		}
	}
}();
</script>
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>


<script src="${ctx_static }/home/serviceCenter/js/insideLetter.js"></script>


