<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<link href="${ctx_static }/home/financeCenter/css/smallBusiness.css" rel="stylesheet">
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
                             <div class="col-md-4 col-sm-4 col-xs-12">
                                 <div class="form-group">
                                     <label class="control-label pull-left margin-left-20">日期</label>
                                     <div class="col-md-9 col-sm-9">
                                         <div class="controls">
                                             <div class="input-group date">
                                                 <input id="reservation" type="text" class="form-control form_datetime"
                                                        placeholder="请选择日期"><span
                                                     class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             <div class="col-md-6 col-sm-6 col-xs-12">
                                 <div class="form-group col-md-5 col-sm-5 no-margin-right">
                                     <input id="searchVal" class="form-control" placeholder="分校" type="text">
                                 </div>
                                 <div class="form-group col-md-5 col-sm-5 no-margin-right">
	<select id="applicationSate" class="form-control">
		<option value="">--请选择--</option>
		<option value="1">已申请</option>
		<option value="0">未申请</option>
	</select>
</div>
                                 <div class="form-group col-md-2 col-sm-2 search">
                                     <button onclick="init()" type="button" class="btn increase search-btn">
                               	<i class="fa fa-search"></i>搜索
                               </button>
                               <!-- <button class="btn btn-blue calculate-btn margin-left-10">计算</button> -->
                           </div>
                       </div>

                       <div class="col-md-2 col-sm-2 col-xs-12">
                           <div class="btn-group pull-right">
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
                       </div>
                   </div>
                   <div class="dataTables_wrapper form-inline no-footer">
                       <div class="table-scrollable">
                           <table id="init" class="table table-striped table-hover table-bordered dataTable no-footer">
                               <thead>
                               <tr role="row">
                                   <th width="5%">
                                       <label>
                                           <input type="checkbox">
                                           <span class="text"></span>
                                       </label>
                                   </th>
                                   <th>分校</th>
                                   <th>支付方</th>
                                   <th>年月</th>
                                   <th>业绩合计</th>
                                   <th>集团收入</th>
                                   <th>分校分成</th>
                                   <th>正酬</th>
                                   <th>2016年退费</th>
                                   <th>2016年反酬</th>
                                   <th>2016年之前退费</th>
                                   <th>分校负担</th>
                                   <th>代收</th>
                                   <th>垫付</th>
                                   <th>罚款（-）</th>
                                   <th>奖励（+）</th>
                                   <th>调整金额</th>
                                   <!--<th>调整</th>-->
                                   <th>申请人</th>
                                   <th>申请时间</th>
                                   <th>申请状态</th>
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


<!--申请-->
<div class="modal fade financeApply" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">财务申请</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="financeApply">
                	<input type="hidden" id="month" />
                	<input type="hidden" id="depId" />
                	<input type="hidden" id="brandName" />
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right"></label>
                        <div class="col-sm-8">
                            <!-- <input type="text" class="form-control" disabled> -->
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right"><!-- 申请时间 --></label>
                        <div class="col-sm-8 no-padding-right">
                            <!-- <input type="text" class="form-control" disabled> -->
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">金额：</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                                <input type="text" class="form-control" id="money" >
                            </div>
                            <div class="col-sm-4">
                                <select name="" class="form-control" disabled>
                                    <option value="0">集团支付</option>
                                    <option value="1">分校支付</option>
                                </select>
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <select name="" class="form-control" >
                                    <option value="0">现金</option>
                                    <option value="1">汇款</option>
                                    <option value="2">支票</option>
                                    <option value="3">pos</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">支出明细：</label>
                        <div class="col-sm-10 padding-left-10">
                            <input type="text" class="form-control" id="expendDetail">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">发票抬头：</label>
                        <div class="col-sm-10 padding-left-10">
                            <input  id="invoiceTitle"type="text" class="form-control" >
                        </div>
                    </div>
                     <!-- <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">部门： </label>
                        <div class="col-sm-8">
                           <select name="" class="form-control" disabled></select> 
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">项目：</label>
						<div class="col-sm-10 padding-left-10">
							<select name="" class="form-control" disabled></select>
						</div>
					</div>-->
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">类别：</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                                <!-- <select class="form-control" id="pCostclassId" name="pCostclassId"></select> -->
                                <input  id="pCostclassId"type="text" class="form-control" value="销售费用">
                            </div>
                            <div class="col-sm-4">
                                <!-- <select class="form-control" id="costclassId" name="costclassId"></select> -->
                                <input  id="costclassId"type="text" class="form-control" value="分校分成">
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <select name="" class="form-control" disabled>
                                    <option value="0">营业支出</option>
                                    <option value="1">营业外支出</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">收款人：</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-3 no-padding-left ">
                                <select id="financePayeeId" name="professionaProject" class="form-control">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="bankName"disabled>
                            </div>
                            <div class="col-sm-3 no-padding-right">
                                <input type="text" class="form-control" id="province"disabled>
                            </div>
                            <div class="col-sm-3 no-padding-right">
                                <input type="text" class="form-control" id="city"disabled>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="col-lg-2 col-sm-2 control-label no-padding-left  margin-left_24"></label>
                        <div class="col-lg-10 col-sm-10 no-padding-left">
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="开户人" disabled id="accountName">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="账号" disabled id="accountNum">
                            </div>
                            <div class="col-sm-4 no-padding-left">
                                <input type="text" class="form-control" placeholder="电话" disabled id="phone">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-4 no-padding-right">调账：</label>
                        <div class="col-sm-8">
                            <select name="" class="form-control" disabled>
                                <option value="">是</option>
                                <option value="">否</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 no-padding-right">
                        <label class="control-label col-sm-4 no-padding-right">申请地区：</label>
                        <div class="col-sm-8 no-padding-right">
                            <input type="text" class="form-control" id="fenxiaomingcheng">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">申请说明：</label>
                        <div class="col-sm-10 padding-left-10">
                            <textarea name="instructions" class="form-control instructions"
                                      style="width:668px;height:300px;"></textarea>
                            <script>
								$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
									KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
									editor = KindEditor.create('textarea[name="instructions"]',{
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

                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button onclick="addApply()" type="button" class="btn btn-primary form-control applay-btn">申请支出</button>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="${ctx_static }/home/financeCenter/js/smallBusiness.js"></script>
