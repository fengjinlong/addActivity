<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/jedate/skin/jedate.css" />
<link href="${ctx_static }/home/financeCenter/css/zhongpei_zc.css" rel="stylesheet">
  <div class="row">
      <div class="col-lg-12 col-sm-12 col-xs-12">
          <div class="widget">
              <div class="widget-header">
                  <div class="widget-buttons">
                  </div>
              </div>
              <!--Widget Header-->
              <div class="widget-body">
                  <div class="widget-main">
                      <div class="row row_padding form-horizontal">
                          <div class="col-md-4 col-sm-6 col-xs-12">
                              <div class="form-group">
                                  <label class="control-label pull-left margin-left-20">申请日期</label>
                                  <div class="col-md-9 col-sm-9">
                                      <div class="controls">
                                          <div class="input-group date">
                                              <input type="text" class="form-control date_time"
                                                     placeholder="请选择日期" id="reservation"><span
                                                  class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div class="col-md-5 col-sm-6 col-xs-12">
                              <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                  <input class="form-control" placeholder="一级科目/二级科目"
                                         type="text" onkeydown="search()" id="searchVal">
                              </div>
                              <div class="form-group col-md-3 col-sm-4">
                                  <button type="button" class="btn increase form-control search-btn" onclick="toSearch()">
                                  	<i class="fa fa-search"></i> 搜索
                                  </button>

                              </div>
                          </div>

                          <div class="col-md-3 col-sm-3 col-xs-12 btn-group">
                              <span class="btn btn-default pointer"
                                    title="View print view"><span>打印</span></span>
                              <div class="btn-group">
                                  <button type="button" class="btn btn-default dropdown-toggle"
                                          data-toggle="dropdown">
                                      导出
                                      <i class="fa fa-angle-up"></i>
                                  </button>
                                  <ul class="dropdown-menu" role="menu">
                                     <li><a target="download" href="${ctx }/financeGeneral/downloadPDF">保存PDF</a></li>
									 <li><a href="${ctx }/financeGeneral/downloadExcel">导出EXCEL</a></li>
									 <li><a href="${ctx }/financeGeneral/downloadCSV">导出CSV</a></li>
                                  </ul>
                              </div>
                              <c:if test="${!empty sessionScope.xwzx_fxcw_zpcwzc_sqzc }">
                              <button class="btn increase  pull-right col-sm-4" data-toggle="modal"
                                      data-target=".bs-example-modal-lg1" data-backdrop="static" id="add">
                                  申请支出
                              </button>
                              </c:if>
                          </div>
                      </div>
                      <input hidden id="currUser" value="${currUser.userId }">
                      <div class="dataTables_wrapper form-inline no-footer">
                           <table class="table table-striped table-hover table-bordered dataTable no-footer" id="init">
                               <thead>
                               <tr role="row">
                                   <th>
                                       <label>
                                           <input type="checkbox" class="checkAll">
                                           <span class="text"></span>
                                       </label>
                                   </th>
                                   <!-- <th>财务编号<span class="fa indicator fa-unsorted"></span></th> -->
                                   <th>申请日期</th>
                                   <th>申请人</th>
                                   <th>一级科目</th>
                                   <th>二级科目</th>
                                   <th>支出明细</th>
                                   <th>金额</th>
                                   <!-- <th>申请状态<span class="fa indicator fa-unsorted"></span></th> -->
                                   <th>状态</th>
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
  </div>
<!---申请支出--->
<div class="modal fade bs-example-modal-lg1 in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static" id="myModel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<span class="widget-caption">申请支出</span>
            </div>
            <div class="modal-body  clearfix form-horizontal modal_padding">

                <form method="" class="form-horizontal padding-top-20" style="padding:0 20px" id="addForm" onsubmit="return validateForm();">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请人</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled id="applicantName">
                            <input hidden name="applicantId" id="applicantId">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请时间</label>
                        <div class="col-sm-9">
                            <div class="controls">
                                <div class="input-group date">
                                    <input type="text" class="form-control date_time" placeholder="请选择日期" disabled id="applicantDate"><span
                                        class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    <input hidden name="applicantDate">     
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-10 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left">金额</label>
                        <div class="col-sm-3 no-padding-left">
                            <input type="text" class="form-control" name="money">
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="paymentFrom">
                                <option value="1">集团支付</option>
                                <option value="2">分校支付</option>
                            </select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="payment">
                                <option value="1">现金</option>
                                <option value="2">汇款</option>
                                <option value="3">支票</option>
                                <option value="4">pos</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">支出明细</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input type="text" class="form-control" name="expendDetail">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">发票抬头</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input type="text" class="form-control" name="invoiceTitle">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">部门</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled id="departmentName">
                            <input hidden name="departmentId1">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">项目</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="projectId" name="projectId"></select>
                        </div>
                    </div>

                    <div class="form-group col-lg-10 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" id="pCostclassId" name="pCostclassId"></select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" id="costclassId" name="costclassId"></select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="incomeType">
								<option value="1">营业收入</option>
								<option value="2">营业外收入</option>
							</select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">收款人</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-3 no-padding-left">
                                <select class="form-control" id="financePayeeId" name="payeeId"></select>
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行" readonly="readonly" id="bankName" name="bankName">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行所在省" readonly="readonly" id="province" name="province">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行所在市" readonly="readonly" id="city" name="city">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24"></label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户人" readonly="readonly" id="accountName" name="accountName">
                                <input type="hidden" name="payeeName" id="payeeName">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="账号" readonly="readonly" id="accountNum" name="accountNum">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="电话" readonly="readonly" id="phone" name="phone">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">调账</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="isAdjustment">
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请地区</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled id="areaName">
                            <input hidden name="departmentId2">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">申请说明</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <textarea name="content" class="form-control content" style="width:668px;height:400px;visibility:hidden;"></textarea>
                            <script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('textarea[name="content"]',{
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

                    <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-2  col-xs-2  col-sm-offset-4 ">
                        	<input type="submit" class="btn btn-primary btn-lg btn-block" value="申请支出"/>
                        </div>
                        <div class="col-sm-2 col-xs-2">
                            <a type="button" class="btn btn-danger btn-lg btn-block" data-dismiss="modal">取消</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!---查看--->
<div class="modal fade bs-example-modal-lg2 in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static" id="checkModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption"></span>
            </div>
            <div class="modal-body  clearfix form-horizontal modal_padding">

                <form method="" class="form-horizontal padding-top-20" style="padding:0 20px" id="editForm" onsubmit="return editValidateForm();">
                
                	<input hidden name="zpExpendId">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请人</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled id="applicantName2">
                            <input hidden name="applicantId" id="applicantId2">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请时间</label>
                        <div class="col-sm-9">
                            <div class="controls">
                                <div class="input-group date">
                                    <input type="text" class="form-control date_time" placeholder="请选择日期" disabled id="applicantDate2"><span
                                        class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    <input hidden name="applicantDate">  
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-10 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left">金额</label>
                        <div class="col-sm-3 no-padding-left">
                            <input type="text" class="form-control" disabled name="money">
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="paymentFrom" disabled>
                                <option value="1">集团支付</option>
                                <option value="2">分校支付</option>
                            </select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="payment" disabled>
                                <option value="1">现金</option>
                                <option value="2">汇款</option>
                                <option value="3">支票</option>
                                <option value="4">pos</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">支出明细</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input type="text" class="form-control" disabled name="expendDetail">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left margin-left_24">发票抬头</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input type="text" class="form-control" disabled name="invoiceTitle">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">部门</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled id="departmentName2">
                            <input hidden name="departmentId1">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">项目</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="projectId2" disabled name="projectId"></select>
                        </div>
                    </div>

                    <div class="form-group col-lg-10 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left">类别</label>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" id="pCostclassId2" disabled name="pCostclassId"></select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" id="costclassId2" disabled name="costclassId"></select>
                        </div>
                        <div class="col-sm-3 no-padding-left">
                            <select class="form-control" name="incomeType" disabled>
								<option value="1">营业收入</option>
								<option value="2">营业外收入</option>
							</select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">收款人</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-3 no-padding-left">
                               <!--  <select class="form-control" id="financePayeeId2" disabled name="payeeId"></select> -->
                               <input type="text" class="form-control" placeholder="收款人" disabled id="payeeName2" name="payeeName">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行" disabled id="bankName2" name="bankName">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行所在省" disabled id="province2" name="province">
                            </div>
                            <div class="col-sm-3 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户行所在市" disabled id="city2" name="city">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24"></label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户人" disabled id="accountName2" name="accountName">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="账号" disabled id="accountNum2" name="accountNum">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="电话" disabled id="phone2" name="phone">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">调账</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="isAdjustment" disabled>
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6">
                        <label class="col-sm-3 control-label no-padding-right">申请地区</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" disabled id="areaName2">
                            <input hidden name="departmentId2">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24">申请说明</label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <input hidden name="content" id="inputcontent">
							<textarea name="content2" class="form-control content" style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('textarea[name="content2"]',{
									uploadJson:'${ctx }/file/uploadFile'
								});
							});
                          </script>   
                        </div>
                    </div>

                    <div class="clearfix form-group modal-footer">
                        <div class="col-sm-2  col-xs-2 col-sm-offset-4">
                            <input type="submit" class="btn btn-primary btn-lg btn-block" value="确定"/>
                        </div>
                        <div class="col-sm-2 col-xs-2">
                            <a type="button" class="btn btn-danger btn-lg btn-block" data-dismiss="modal">取消</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!---查看end--->

<!--日期插件-->
<script src="${ctx_static }/dep/jedate/jquery.jedate.js"></script>
<script src="${ctx_static }/home/financeCenter/js/zhongpei_zc.js"></script>

