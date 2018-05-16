<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="${ctx_static }/home/financeCenter/css/groupExpend.css" rel="stylesheet" />
<link href="${ctx_static }/home/examineApprove/css/handle.css" rel="stylesheet">
<link rel="stylesheet" href="${ctx_static }/dep/jedate/skin/jedate.css" />
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
             <div class="widget-main">
                 <div class="row row_padding form-horizontal">
                     <div class="col-sm-4 col-xs-12 no-padding-right">
                         <div class="form-group">
                             <label class="control-label pull-left margin-left-20">申请日期</label>
                             <div class="col-md-9 col-sm-9">
                                 <div class="controls">
                                     <div class="input-group date">
                                         <input type="text" class="form-control applyDate" placeholder="请选择日期" id="queryDate"/>
                                         <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="col-sm-8 col-xs-12">
                         <div class="form-group col-md-9 col-sm-4 no-margin-right">
                             <input class="form-control" placeholder="支出状态/分校/费用类别/类别科目/支付渠道/项目/财务编号/户名" type="text" id="searchVal" onkeydown="search();"/>
                         </div>
                         <div class="form-group col-md-3 col-sm-4">
                             <button type="button" class="btn increase form-control search-btn" onclick="javascript:DataTable.init();"><i class="fa fa-search"></i>搜索 </button>
                         </div>
                     </div>
                 </div>
                 <div class="dataTables_wrapper form-inline no-footer">
                     <div class="">
                         <table class="table table-striped table-hover table-bordered dataTable no-footer" id="appliedTableInit">
                             <thead>
                             <tr role="row">
                                    <th>申请日期</span></th>
                                    <th>申请分校</th>
                                    <th>申请人</th>
                                    <th>一级科目</th>
                                    <th>二级科目</th>
                                    <th>支出明细</th>
                                    <th>金额</th>
                                    <th>支付渠道</th>
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
<div style="display:none" id="userInfo">
    <input name="userId" value="${user.userId }">
    <input name="dutyId" value="${user.dutyId }">
</div>
<%@ include file="../common/public_footer.jsp"%>   


<!-- 退回添加 -->
<div class="modal fade bs-example-modal-lg1 in" tabindex="-1" id="myModel"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">退回</span>
			</div>
			<div class="modal-body" style="background:#ffffff">

				<form method="post" class="form-horizontal padding-top-20 clearfix" id="addForm" >
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款单位</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="payOrg">
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">付款日期</label>
						<div class="col-sm-9">
							<div class="controls">
								<div class="input-group date">
									<input type="text" class="form-control  form_datetime" name="payDate"
										placeholder="请选择日期"><span class="input-group-addon"><i
										class="fa fa-calendar"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">收款单位</label>
						<div class="col-sm-9">
							<!-- <select id="collectionDepartmentId" class="form-control" name="collectionDepartment"></select> -->
							<select class="form-control chosen-select"  id="collectionDepartmentId" name="collectionDepartment"></select>
						</div>
					</div>
					<div class="form-group col-lg-6 col-md-6 col-sm-6">
						<label class="col-sm-3 control-label no-padding-right">金额</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" name="money">
						</div>
						<div class="col-sm-5">
							<select class="form-control" name="payment">
								<option value="1" selected>现金</option>
								<option value="2">汇款</option>
								<option value="3">支票</option>
								<option value="4">POS</option>
							</select>
						</div>
					</div>

				
					<div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left: -40px">
						<label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" id="pCostclassId" name="pCostclassId"></select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control chosen-select" id="costclassId" name="costclassId"></select>
						</div>
						<div class="col-sm-3 no-padding-left">
							<select class="form-control" name="incomeType">
								<option value="1" selected="selected">营业收入</option>
								<option value="2">营业外收入</option>
							</select>
						</div>
					</div>

					<div class="form-group col-lg-12 col-md-12 col-sm-12">
						<label class="col-sm-2 control-label no-padding-right" style="margin-left:-40px;">收入明细</label>
						<div class="col-sm-10" style="width:85%;">
							<input type="text" class="form-control" name="incomeDetail">
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left: -40px">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">详细说明</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="content" id="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor4 = KindEditor.create('#content',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){
												this.sync();
											}
									});
								});
                          </script>        
						</div>
					</div>
					
					<div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left: -40px">
						<label
							class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">备注</label>
						<div class="col-lg-10 col-sm-10 no-padding-left">
							<textarea name="memo" id="memo" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor1 = KindEditor.create('#memo',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0,
											afterBlur: function(){
												this.sync();
											}
									});
								});
                          </script>        
						</div>
					</div>

					<div id="divApplyDetail" class="form-group col-lg-12 col-md-12 col-sm-12" style="width:100%;overflow-x:auto">
						<table class="table table-striped table-hover table-bordered dataTable no-footer">
							<tr>
								 <th ><label> <input type="checkbox">
													<span class="text"></span>
											</label></th>
	                              <th>报名日期</th>
	                              <th>姓名</th>
	                              <th>状态</th>
	                              <th>考期</th>
	                              <th>产品名称</th>
	                              <th>应缴</th>
	                              <th>实缴</th>
	                              <th>资料查看</th>
	                              <th>费用支付记录</th>
                              </tr>
							<tbody class="applyDetail" name="applyDetail" id="applyDetail">
								
							</tbody>
						</table>
					</div>

					<div id="buttonApplyDetail" class="col-sm-12 form-group modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<input type="submit" onclick="validateForm()" class="btn btn-primary btn-md btn-block" value="确认"/>
						</div>
						<div class="col-sm-2">
							<a type="button" class="btn btn-danger btn-md btn-block" data-dismiss="modal">取消</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>





<!--查看-->
<div class="modal fade Scoresofnew" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-content">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">详情页面</h4>
            </div>
            <div class="modal-body clearfix">
                <div class="col-lg-12">
                    <div class="modal-body clearfix" style="background:#fff">
                        <form class="form-horizontal" id="financeApplyForm">
                               <div class="form-group col-sm-6">
                                   <label class="control-label col-sm-4 no-padding-right">申请人</label>
                                   <div class="col-sm-8">
                                       <input type="text" class="form-control" disabled name="applicantName">
                                   </div>
                               </div>
                               <div class="form-group col-sm-6 no-padding-right">
                                   <label class="control-label col-sm-4 no-padding-right">申请时间</label>
                                   <div class="col-sm-8 no-padding-right">
                                       <input type="text" class="form-control" disabled name="applicantDate">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">金额</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <div class="col-sm-4 no-padding-left ">
                                           <input type="text" class="form-control" disabled name="money">
                                       </div>
                                       <div class="col-sm-4">
                                           <select name="paymentFrom"
                                                   class="form-control" disabled>
                                               <option value="1">集团支付</option>
                                               <option value="2">分校支付</option>
                                           </select>
                                       </div>
                                       <div class="col-sm-4 no-padding-right">
                                           <select name="payment"
                                                   class="form-control" disabled>
                                               <option value="1">现金</option>
                                               <option value="2">汇款</option>
                                               <option value="3">支票</option>
                                               <option value="4">pos</option>
                                           </select>
                                       </div>

                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">支出明细</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <input type="text" class="form-control" disabled name="expendDetail">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">发票抬头</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <input type="text" class="form-control" disabled name="invoiceTitle">
                                   </div>
                               </div>
                               <div class="form-group col-sm-6">
                                   <label class="control-label col-sm-4 no-padding-right">部门</label>
                                   <div class="col-sm-8">
                                   <input type="text" class="form-control" disabled name="departmentName">
                                   </div>
                               </div>
                               <div class="form-group col-sm-6 no-padding-right">
                                   <label class="control-label col-sm-4 no-padding-right">产品</label>
                                   <div class="col-sm-8 no-padding-right">
                                   <input type="text" class="form-control" disabled name="projectName">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">类别</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <div class="col-sm-4 no-padding-left ">
                                           <input type="text" class="form-control costClasses" name="pCostClassName"
                                                  disabled>
                                       </div>
                                       <div class="col-sm-4">
                                           <input type="text"
                                                  class="form-control categoriesCost" disabled name="costClassName">
                                       </div>
                                       <div class="col-sm-4 no-padding-right">
                                           <select name="" class="form-control" disabled name="expendType">
                                               <option value="0">营业支出</option>
                                               <option value="1">营业外支出</option>
                                           </select>
                                       </div>
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">收款人</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <div class="col-sm-3 no-padding-left ">
                                           <input type="text" class="form-control costClasses" name="payeeName"
                                                  disabled>
                                       </div>
                                       <div class="col-sm-3">
                                           <input type="text" class="form-control" value="开户行" disabled name="bankName">
                                       </div>
                                       <div class="col-sm-3 no-padding-right">
                                           <input type="text" class="form-control"
                                                  value="开户行所在省" disabled name="province">

                                       </div>
                                       <div class="col-sm-3 no-padding-right">
                                           <input type="text" class="form-control"
                                                  value="开户行所在市" disabled name="city">
                                       </div>
                                   </div>
                               </div>
                               <div class="form-group col-sm-6">
                                   <label class="control-label col-sm-4 no-padding-right">调账</label>
                                   <div class="col-sm-8">
                                       <select name="" class="form-control" disabled name="isAdjustment">
                                           <option value="1">是</option>
                                           <option value="2">否</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group col-sm-6 no-padding-right">
                                   <label class="control-label col-sm-4 no-padding-right">申请地区</label>
                                   <div class="col-sm-8 no-padding-right">
                                       <input type="text" class="form-control" disabled name="departmentNameT">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">申请说明</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <textarea id="shuoming" name="content" class="form-control content"
                                                 style="height:300px;visibility:hidden;"></textarea>
					                  <script>
												$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
														KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
														editor = KindEditor.create('#shuoming',{
														uploadJson:'${ctx }/file/uploadFile',
														afterBlur: function(){
															this.sync();
														}
													});
													
												});
					                   </script> 
                                   </div>
                               </div>
                              
                              <div id="divApplyDetailSee" class="form-group col-lg-12 col-md-12 col-sm-12" style="width:100%;overflow-x:auto">
								<table class="table table-striped table-hover table-bordered dataTable no-footer">
									<tr>
										 <th ><label> <input type="checkbox">
															<span class="text"></span>
													</label></th>
			                              <th>报名日期</th>
			                              <th>姓名</th>
			                              <th>状态</th>
			                              <th>考期</th>
			                              <th>产品名称</th>
			                              <th>应缴</th>
			                              <th>实缴</th>
			                              <th>资料查看</th>
			                              <th>费用支付记录</th>
		                              </tr>
									<tbody class="applyDetail" name="applyDetail" id="applyDetailSee">
										
									</tbody>
								</table>
							</div>
                           </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--支出-->
<div class="modal fade fiscal-charges in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">财务支出</span>
            </div>
     
            <div class="modal-body clearfix">
                <form method="" class="form-horizontal padding-top-20" id="expendForm"  enctype="multipart/form-data">

                    <input type="hidden" name="applyId"/>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">支付人</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="createUserName" disabled value="${currentUser.realName }">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">支付日期</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="createDate" disabled>
                        </div>
                    </div>
                   <div class="form-group col-md-12 col-sm-12" id="picture">
						<label class="control-label pull-left margin-left-50">上传凭证</label>
						<div class="col-md-10 chose-file no-padding-right">
								<input id="asingle-upload" name="picture" type="file" class="file-loading">
						</div>
					</div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right" style="margin-left:32px;">支付说明</label>
                        <div class="col-sm-10">
                                       <textarea class="form-control payExplain" rows="8" id="payExplain"
                                                 style="width:684px;height:340px;"></textarea>
                            <script>
                                $.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-all-min.js', function() {
                                    KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
                                    editor2 = KindEditor.create('textarea[id="payExplain"]',{
                                        uploadJson:'${ctx }/file/uploadFile',
                                        resizeType: 0,
                                        allowFileManager : true,
                                        allowImageUpload:true,//允许上传图片
                                        allowFileManager:true, //允许对上传图片进行管理
                                        cssData: ".ke-content img {max-width: 200px;max-height:200px;}",
                                        imageSizeLimit : '10MB', //批量上传图片单张最大容量
                                        imageUploadLimit : 100 //批量上传图片同时上传最多个数
                                    });

                                });
                            </script>
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary btn-lg" data-status="3">支付通过 </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="submit" class="btn btn-danger btn-lg"  data-status="4">支付不通过 </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--明细-->
<div class="modal fade cooperation-module-edit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
	            <div class="dataTables_wrapper form-inline no-footer">
					<table class="table table-striped table-hover table-bordered dataTable no-footer" id="detail">
						<thead>
							<tr>
								<th>缴费日期</th>
								<th>费用名称</th>
								<th>缴费方式</th>
								<th>缴费金额</th>
								<th>费用类型</th>
								<th>状态</th>
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

<!--明细-->
<div class="modal fade cooperation-see" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
        	<div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
	            <div class="dataTables_wrapper form-inline no-footer">
					<table class="table table-striped table-hover table-bordered dataTable no-footer" id="detailzl">
						<thead>
							<tr>
								<th>资料名称</th>
								<th>资料预览</th>
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

<!--预览图片-->
<div class="modal fade lookImg in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg" style="margin-left: 20%;">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">预览图片</span>
			</div>
			<div class="modal-body clearfix">
				<img id="imgLook" src=" " style="height: auto;width: auto;position: initial;top: 0;bottom: 0;left: 0;right: 0; width: 100%;margin: auto;z-index: -1;"> 
			</div>
		</div>
	</div>
</div>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/jedate/jquery.jedate.js"></script>
<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>

<script src="${ctx_static }/home/financeCenter/js/groupExpend.js?v=<%=Math.random() %>"></script>
<script src="${ctx_static }/home/examineApprove/js/handleCheck2.js?v=<%=Math.random() %>"></script>

