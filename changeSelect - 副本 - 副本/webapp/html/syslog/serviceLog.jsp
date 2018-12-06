<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/syslog/css/log.css">
 <div class="row page-wrapper">
     <div class="col-xs-12 col-md-12">
         <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">服务日志</span>
            </div>
             <div class="widget-body clearfix">
                 <div class="row row_padding">
                     <div class="col-lg-4 col-md-4 col-sm-6 form-horizontal">
                         <div class="form-group no-padding-left">
                             <label class="pull-left control-label margin-left-15">日期</label>
                             <div class="col-sm-10">
                                 <div class="controls">
                                       <div class="input-group">
                                            <input type="text" class="form-control" id="reservation">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                       </div>
                                 </div>
                             </div>
                         </div>
                     </div>

			<div class="col-lg-5 col-md-5 col-xs-12 col-padd">
                                     <div class="form-group col-md-7 col-sm-7 no-margin-right">
                                         <input type="text" id="searchVal" class="form-control" placeholder="部门 / 姓名 / 发布人 / 状态" onkeydown="search()">
                              </div>
                              <div class="form-group col-lg-3 col-md-4 col-sm-4">
                                  <button type="button" class="btn btn-lightBlue form-control search-btn" onclick="toSearch()">
                                     		<i class="fa fa-search"></i>   搜索
                                  </button>

                              </div>
              </div>
             
              <div class="col-lg-3  col-sm-4 col-md-4 col-xs-12 btn-group">

                  <span class="btn btn-default pointer"
                        title="View print view"><span>打印</span></span>
                  <div class="btn-group">
                      <button type="button" class="btn btn-default dropdown-toggle"
                              data-toggle="dropdown">
                          导出
                          <i class="fa fa-angle-up"></i>
                      </button>
                      <ul class="dropdown-menu" role="menu">
                          <li><a target="download" href="${ctx }/user/downloadPDF">保存PDF</a></li>
                          <li><a href="${ctx }/user/downloadExcel">导出EXCEL</a></li>
                          <li><a href="${ctx }/user/downloadCSV">导出CSV</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div role="grid" id="expandabledatatable_wrapper"
                   class="dataTables_wrapper form-inline no-footer">

                  <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
                      <thead>
                      <tr role="row">
                          <th>操作日期</th>
                          <th>操作部门 <span class="fa indicator "></span></th>
                           <th>操作人 <span class="fa indicator "></span></th>
                          <th>操作类型<span class="fa indicator "></span></th>
                          <th>操作内容<span class="fa indicator "></span></th>
                          <th>被操作人<span class="fa indicator "></span></th>
                          <th>被操作产品模型 <span class="fa indicator "></span></th>
                          <th>被操作产品 <span class="fa indicator "></span></th>
                          <th>操作</th>
                      </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
              </div>
          </div>
      		</div>
  		</div>
</div>

<%@ include file="../common/public_footer.jsp"%>

<!--查看-->
<div class="modal fade bs-example-modal-sm col-lg-12 logView">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body form-horizontal clearfix">
               <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">操作人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="userName" value="" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">操作账号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="account" value="" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">操作日期：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="createDate" value="" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">登录ip：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="logIp" value="......" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">内网ip：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="ip" value="......" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">操作页面：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="logHtml" value="" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">操作类型：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="type" value="修改" disabled>
                    </div>
                </div>
                
                <div class="form-group col-sm-12">
                    <label class="control-label col-sm-3">操作内容：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="content" disabled value="">
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<script src="${ctx_static }/home/syslog/js/serviceLog.js?v=<%=Math.random() %>"></script>