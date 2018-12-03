<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<div class="row page-wrapper">
<div class="page-body">
   <div class="row">
       <div class="col-lg-6 col-md-6 col-sm-6">
           <div class="well">
           		<div class="tabbable">
                    <ul class="nav nav-tabs tabs-flat">
                        <li class="active">
                            <a data-toggle="tab" href="#application" aria-expanded="true">
                               	我的申请
                            </a>
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#examine" aria-expanded="false">
                                	待我审批
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content tabs-flat">
                        <div id="application" class="tab-pane in active">
                            <table class="table table-hover table-bordered table-condensed">
                            	<thead>
                            		<tr>
                            			<th>申请</th>
                            			<th>状态</th>
                            		</tr>
                            	</thead>
			                    <tbody>
			                       <tr>
			                           <td>
			                               	购买电脑
			                           </td>
			                           <td>
			                             	xxx已审批  
			                           </td>
			                       </tr>
			                       <tr>
			                           <td>
			                               	购买教材
			                           </td>
			                           <td>
			                               xxx已驳回
			                           </td>
			                       </tr>
			                    </tbody>
			               	</table>
                            
                        </div>
                        <div id="examine" class="tab-pane">
                            <table class="table table-hover table-bordered table-condensed">
                            	<thead>
                            		<tr>
                            			<th>审批</th>
                            			<th>申请人</th>
                            			<th>审批</th>
                            		</tr>
                            	</thead>
			                   	<tbody>
			                       <tr>
			                           <td>
			                               	客服申请增加电话
			                           </td>
			                           <td>
			                               	申请人
			                           </td>
			                           <td>
			                               <button type="button" class="btn btn-blue active" style="padding:2px 10px 2px 10px" data-toggle="modal" data-target="" title="审阅">审阅</button>
			                           </td>
			                       </tr>
			                   </tbody>
			               	</table>
                        </div>
                        
                    </div>
                </div>      
           </div>

       </div>
       <div class="col-lg-6 col-md-6 col-sm-6">
           <div class="well">
           		<div class="tabbable">
                    <ul class="nav nav-tabs tabs-flat">
                        <li class="active">
                            <a data-toggle="tab" href="#wori" aria-expanded="true">
                               	我的日程
								
                            </a>
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#tianri" aria-expanded="false">
                                	添加日程
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content tabs-flat">
                        <div id="wori" class="tab-pane in active">
                            <table class="table table-hover table-bordered table-condensed">
                            	<thead>
			                       <tr>
			                           <th width="40%">
			                               	时间
			                           </th>
			                           <th width="60%">
			                               	事件
			                               	<button type="button" class="btn btn-blue active" style="float:right;padding:2px 10px 2px 10px" data-toggle="modal" data-target=".more" title="全部日程">更多</button>
			                           </th>
			                       </tr>
			                   </thead>
			                   <tbody>
			                       <tr>
			                           <td>
			                               	2018-5-11 11:20
			                           </td>
			                           <td>
			                             	外出
			                           </td>
			                       </tr>
			                       <tr>
			                           <td>
			                               	2018-5-11 16:30
			                           </td>
			                           <td>
			                               	请假
			                           </td>
			                       </tr>
			                      </tbody>
			               	</table>
                            
                        </div>
                        <div id="tianri" class="tab-pane clearfix">
                           <form method="" class="form-horizontal" style="padding:0 20px">
                            	<div class="form-group col-lg-12 col-md-12 col-sm-12">
				                    <div class="col-sm-8">
				                        <label>
                                            <input type="checkbox">
                                            <span class="text">全天</span>
                                        </label>
				                    </div>
				                </div>
				                <div class="form-group col-lg-12 col-md-12 col-sm-12">
		                            <label class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">开始时间</label>
		                            <div class="col-lg-10 col-md-10 col-sm-10">
		                                <div class="input-group">
		                                    <input class="form-control date-picker form_datetime" type="text" value="" readonly="">
		                                    <span class="input-group-addon">
		                                        <i class="fa fa-calendar"></i>
		                                    </span>
		                                </div>
		                            </div>
		                        </div>
				                <div class="form-group col-lg-12 col-md-12 col-sm-12">
		                            <label class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">结束时间</label>
		                            <div class="col-lg-10 col-md-10 col-sm-10">
		                                <div class="input-group">
		                                    <input class="form-control date-picker form_datetime" type="text" value="" readonly="">
		                                    <span class="input-group-addon">
		                                        <i class="fa fa-calendar"></i>
		                                    </span>
		                                </div>
		                            </div>
		                        </div>
				                <div class="form-group col-lg-12 col-md-12 col-sm-12">
		                            <label class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">日程安排</label>
		                            <div class="col-lg-10 col-md-10 col-sm-10">
		                                <textarea class="form-control content" rows="3" id="" name=""></textarea>
		                            </div>
		                        </div>
		                        <div class="form-group modal-footer">
		                            <div class="col-sm-2 col-sm-offset-4">
		                                <button type="submit" class="btn btn-primary btn-lg form-control">保存</button>
		                            </div>
		                            <div class="col-sm-2 ">
		                                <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
		                                 		   取消
		                                </button>
		                            </div>
		                        </div>
				               </form>
                            </div>
                        </div>
                        
                    </div>
                </div>      
           </div>
           
           <div class="col-lg-6 col-md-6 col-sm-6">
           <div class="well">
           		<div class="tabbable">
                    <ul class="nav nav-tabs tabs-flat">
                        <li class="active">
                            <a data-toggle="tab" href="#yesterday" aria-expanded="true">
                               	昨日数据
                            </a>
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#today" aria-expanded="false">
                                	今日数据
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content tabs-flat">
                        <div id="yesterday" class="tab-pane in active">
                            <table class="table table-hover table-bordered table-condensed">
                            	<thead>
			                       <tr>
			                           <th>
			                               	--
			                           </th>
			                           <th>
			                               	--
			                           </th>
			                       </tr>
			                   </thead>
			                   <tbody>
			                       <tr>
			                           <td>
			                               	咨询量
			                           </td>
			                           <td>
			                             	5000
			                           </td>
			                       </tr>
			                       <tr>
			                           <td>
			                               	上门量
			                           </td>
			                           <td>
			                               	3000
			                           </td>
			                       </tr>
			                      </tbody>
			               	</table>
                            
                        </div>
                        <div id="today" class="tab-pane clearfix">
                           <table class="table table-hover table-bordered table-condensed">
                            	<thead>
			                       <tr>
			                           <th>
			                               	--
			                           </th>
			                           <th>
			                               	--
			                           </th>
			                       </tr>
			                   </thead>
			                   <tbody>
			                       <tr>
			                           <td>
			                               	接待量
			                           </td>
			                           <td>
			                             	5000
			                           </td>
			                       </tr>
			                       <tr>
			                           <td>
			                               	报名量
			                           </td>
			                           <td>
			                               	3000
			                           </td>
			                       </tr>
			                      </tbody>
			               	</table>
                        </div>
                        
                    </div>
                </div> 
			</div>
       </div>
       
       <div class="col-lg-6 col-md-6 col-sm-6">
           <div class="well with-header">
               <div class="header bg-palegreen">
                   	今日回访
               </div>
              <table class="table table-hover table-bordered table-condensed">
                 <thead>
                  <tr>
                      <th>
                          	时间
                      </th>
                      <th>
                          	姓名
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          	14:00
                      </td>
                      <td>
                        	回访客户xxx
                      </td>
                  </tr>
                  <tr>
                      <td>
                          	16:30
                      </td>
                      <td>
                          	xxx
                      </td>
                  </tr>
                 </tbody>
          	</table>
           </div>
       </div>
       
           
       </div>
   </div>
</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!-- 我的日程更多 -->
<div class="modal fade more" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">全部日程</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="moreSchedule" method="post">
					<table class="table table-hover table-bordered table-condensed">
                            	<thead>
			                       <tr>
			                           <th>
			                               	时间
			                               	
			                           </th>
			                           <th>
			                               	事件
			                           </th>
			                           <th>
			                           		操作
			                           </th>
			                       </tr>
			                   </thead>
			                   <tbody>
			                       <tr>
			                           <td>
			                               	2018-5-11 11:20
			                           </td>
			                           <td>
			                             	外出
			                           </td>
			                           <td>
			                           		<a class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title=""></i></a>
			                           		<a href="javascript:void(0);" class="delete"> <i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title=""></i></a>
			                           </td>
			                       </tr>
			                       <tr>
			                           <td>
			                               	2018-5-11 16:30
			                           </td>
			                           <td>
			                               	请假
			                           </td>
			                           <td>
			                           		<a class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title=""></i></a>
			                           		<a href="javascript:void(0);" class="delete"> <i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title=""></i></a>
			                           </td>
			                       </tr>
			                      </tbody>
			               	</table>
                    
					
					<div class="form-group col-sm-12" style="margin-top:30px">
						<div class="col-sm-2 col-sm-offset-4"> <button type="submit" class="btn btn-primary btn-lg">确认 </button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 日程编辑 -->
<div class="modal fade moreEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="scheduleEdit" method="post">
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">时间</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <div class="input-group">
                                <input class="form-control date-picker form_datetime" type="text" value="" readonly="">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
              		<div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">日程安排</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <textarea class="form-control content" rows="3" id="" name=""></textarea>
                        </div>
                    </div>
					
					<div class="form-group col-sm-12" style="margin-top:30px">
						<div class="col-sm-2 col-sm-offset-4"> <button type="submit" class="btn btn-primary btn-lg">确认 </button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script>
//日期初始化
 $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        autoclose: true
   });


 $('#moreSchedule table').on('click', '.edit', function(){
		$('.moreEdit').modal('show');
	})

</script>