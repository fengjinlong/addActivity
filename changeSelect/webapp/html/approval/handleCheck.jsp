<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/examineApprove/css/handle.css" rel="stylesheet">
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
             
                <div class="widget-buttons">
                    <a href="#"></a>
                    <c:if test="${not empty param.ishandle }">
			            <a href="#" onclick="loadHtml('/handle/index', this)" class="back-btn" data-toggle="dispose">
			                 <i class="fa fa-times"></i></a>
			        </c:if>
			        <c:if test="${ not empty param.isAccraditation   }">
			            <a href="#" onclick="loadHtml('/accraditation/index', this)" class="back-btn" data-toggle="dispose">
			                 <i class="fa fa-times"></i></a>
			        </c:if>
			        <c:if test="${ not empty param.isApplied   }">
			            <a href="#" onclick="loadHtml('/applied/index', this)" class="back-btn" data-toggle="dispose">
			                 <i class="fa fa-times"></i></a>
			        </c:if>  
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body clearfix">
                <div class="widget-main">
                    <div class="col-lg-7 col-lgl">
                        <!--<div class="modal-content">-->
                        
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
                                        <!-- <select name="" class="form-control" disabled>
                                            <option value="">财务中心</option>
                                            <option value="">质检中心</option>
                                        </select> -->
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 no-padding-right">
                                    <label class="control-label col-sm-4 no-padding-right">产品</label>
                                    <div class="col-sm-8 no-padding-right">
                                    <input type="text" class="form-control" disabled name="projectName">
                                       <!--  <select name="" class="form-control" disabled>
                                            <option value="">01人力资源管理师</option>
                                            <option value="">03学历</option>
                                        </select> -->
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
                                            <select name="" class="form-control" name="expendType" disabled>
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
                                           <!--  <select name="professionaProject"
                                                    class="form-control" disabled>
                                                <option value="0"></option>
                                                <option value="1"></option>
                                            </select> -->
                                            <input type="text" class="form-control costClasses" name="payeeName"
                                                   disabled>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="text" class="form-control" value="开户行" disabled name="bankName">
                                        </div>
                                        <div class="col-sm-3 no-padding-right">
                                            <input type="text" class="form-control"  name="province"
                                                   placeholder="开户行所在省" disabled>

                                        </div>
                                        <div class="col-sm-3 no-padding-right">
                                            <input type="text" class="form-control" name="city"
                                                   placeholder="开户行所在市"  disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-sm-12">
         <label class="control-label col-sm-2 no-padding-right"></label>
         <div class="col-sm-10 padding-left-10">
             <div class="col-sm-4 no-padding-left">
                 <input type="text" class="form-control" name="accountName" placeholder="开户人" disabled>
             </div>
             <div class="col-sm-4">
                 <input type="text" class="form-control" name="accountNum" placeholder="账号" disabled>

             </div>
             <div class="col-sm-4 no-padding-right">
                 <input type="text" class="form-control" name="phone" placeholder="电话" disabled>
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
                                <%@ include file="../common/public_footer.jsp"%>
                                <div class="form-group col-sm-12">
                                    <label class="control-label col-sm-2 no-padding-right">申请说明</label>
                                    <div class="col-sm-10 padding-left-10">
                                        <textarea name="content" class="form-control content"
                                                  style="height:300px;visibility:hidden;"></textarea>
                                        <script>
										$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
											KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
											editor = KindEditor.create('textarea[name="content"]',{
												uploadJson:'${ctx }/file/uploadFile',
												resizeType: 0,
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
										<tbody id="applyDetail">
											
										</tbody>
									</table>
								</div>
                                
                                
                            </form>
                        </div>
                        <!--</div>-->
                    </div>
					<div class="col-lg-5 col-lg-content" id="approveFlow">
						
					</div>
				</div>

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
    <div class="modal-dialog modal-lg">
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
	<div class="modal-dialog modal-xs" style="margin-left: 20%;">
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

<form id="applyPageInfoForm" style="display:none;">
 <input name="applyId" value="${param.applyId }" type="hidden">
</from>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<!--富文本编辑器-->
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>


<script src="${ctx_static }/home/examineApprove/js/handleCheck.js?v=<%=Math.random() %>"></script>
</body>

