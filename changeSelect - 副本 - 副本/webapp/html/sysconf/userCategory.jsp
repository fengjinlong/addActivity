<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/sysconf/css/userCategory.css" rel="stylesheet">

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
	                             <input type="text" class="form-control" placeholder="类型">
	                         </div>
	                         <div class="form-group col-lg-2 col-md-4 col-sm-4">
	                             <a type="button" class="btn increase form-control search-btn" href="javascript:cxDataTable.init();">
	                                 <i class="fa fa-search"></i> 搜索
	                             </a>
	                         </div>
	                     </div>
	                     <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
	                         <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
	                         <div class="btn-group">
	                             <button type="button" class="btn btn-default dropdown-toggle"
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
	                         <button class="btn increase pull-right" data-toggle="modal" data-backdrop="static" data-target=".userCategoryAdd">
	                             <i class="fa fa-plus"></i> 新增
	                         </button>
	                     </div>
	                 </div>
	                 <table class="table table-striped table-hover table-bordered dataTable no-footer"
	                        id="userCategory">
	                     <thead>
	                     <tr role="row">
	                         <th width="5%">
	                             <label>
	                                 <input type="checkbox" class="checkAll">
	                                 <span class="text"></span>
	                             </label>
	                         </th>
	                         <th>类型 </th>
	                         <th>数值 </th>
	                         <th>操作 </th>
	                     </tr>
	                     </thead>
	
	                     <tbody>
	                     <tr>
	                         <td width="5%">
	                             <label>
	                                 <input type="checkbox" class="checkchild">
	                                 <span class="text"></span>
	                             </label>
	                         </td>
	                         <td>中和</td>
	                         <td>1</td>
	                         <td>
	                             <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal"
	                                data-target=".userCategoryEdit" data-backdrop="static">
	                                 <i class="fa fa-edit"></i> 编辑
	                             </a>
	                             <a href="#" class="btn btn-danger btn-xs delete">
	                                 <i class="fa fa-trash-o"></i> 删除
	                             </a>
	                         </td>
	                     </tr>
	                     <tr>
	                         <td width="5%">
	                             <label>
	                                 <input type="checkbox"  class="checkchild">
	                                 <span class="text"></span>
	                             </label>
	                         </td>
	                         <td>远大</td>
	                         <td>2</td>
	                         <td>
	                             <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal"
	                                data-target=".userCategoryEdit" data-backdrop="static">
	                                 <i class="fa fa-edit"></i> 编辑
	                             </a>
	                             <a href="#" class="btn btn-danger btn-xs delete"><i
	                                     class="fa fa-trash-o"></i> 删除</a>
	                         </td>
	                     </tr>
	                     <tr>
	                         <td width="5%">
	                             <label>
	                                 <input type="checkbox"  class="checkchild">
	                                 <span class="text"></span>
	                             </label>
	                         </td>
	                         <td>远大</td>
	                         <td>3</td>
	                         <td>
	                             <a href="#" class="btn btn-info btn-xs edit" data-toggle="modal"
	                                data-target=".userCategoryEdit" data-backdrop="static">
	                                 <i class="fa fa-edit"></i> 编辑
	                             </a>
	                             <a href="#" class="btn btn-danger btn-xs delete"><i
	                                     class="fa fa-trash-o"></i> 删除</a>
	                         </td>
	                     </tr>
	                     </tbody>
	                 </table>
	             </div>
	         </div>
	     </div>
	 </div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade userCategoryAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="userCategoryAdd">
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">类型</label>
                        <div class="col-sm-8">
                            <input name="brand" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">数值</label>
                        <div class="col-sm-8">
                            <input name="brand" class="form-control">
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

<!--编辑-->
<div class="modal fade userCategoryEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="userCategoryEdit">
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">类型</label>
                        <div class="col-sm-8">
                            <input name="brand" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">数值</label>
                        <div class="col-sm-8">
                            <input name="brand" class="form-control">
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




<script src="${ctx_static }/home/sysconf/js/userCategory.js"></script>

