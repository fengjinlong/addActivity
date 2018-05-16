<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<style>
.hiddenCol{
display:none;
}
</style>

<div class="row page-wrapper">
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
                          <div class="row row_padding form-horizontal">
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                      <input type="text" class="form-control" placeholder="专业名称" id="searchVal" onkeydown="search();">
                                  </div>
                                  <div class="form-group col-lg-2 col-md-4 col-sm-4">
                                      <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                      	<i class="fa fa-search"></i> 搜索
                                      </a>
                                  </div>
                              </div>


                              <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                                  <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                                  <div class="btn-group">
                                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                          		导出
                                          <i class="fa fa-angle-up"></i>
                                      </button>
                                      <ul class="dropdown-menu" role="menu">
                                          <li><a href="#">保存PDF</a></li>
                                          <li><a href="#">导出EXCEL</a></li>
                                          <li><a href="#">导出CSV</a></li>
                                      </ul>
                                  </div>
                                  <button class="btn increase pull-right col-sm-4 majorAdd">
                                  	 <i class="fa  fa-plus"></i> 新增
                                  </button>
                              </div>
                          </div>
                          <table class="table table-striped table-hover table-bordered dataTable no-footer" id="major">
                              <thead>
                              <tr role="row">
                                  <th width="5%">
                                      <label>
                                          <input type="checkbox" class="ckeckAll">
                                          <span class="text"></span>
                                      </label>
                                  </th>
                                  <th class="hidden">id</th>
                                  <th>专业名称 </span>
                                  <th>操作</th>
                              </tr>
                              </thead>

                              <tbody>
                              </tbody>
                          </table>

                      </div>
                  </div>
                  <!--Widget-->
                </div>
            </div>

        </div>
<%@ include file="../common/public_footer.jsp"%>

<script>
//初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#major').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizMajor/load',
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
       			                "mData": "majorId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
       			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
       			            }
       			            },
       			            {"mData": "majorId", 'sClass': "hiddenCol"},
       			            {"mData": "majorName", 'sClass': "text-center"},
       			            {
       			                "mData": "majorId",
       			                'sClass': "text-center",
       			                "bSortable": false,
       			                "mRender": function (data, type, full ) {
               			                    var u = '<a href="javascript:;" class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
               			                    var d = '<a href="javascript:;" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
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

</script>

<script src="${ctx_static }/home/configuration/js/majorName.js"></script>
