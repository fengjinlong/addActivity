<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/serviceCenter/css/refundTable.css" rel="stylesheet">
<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
				<span class="widget-caption">退费工作台</span>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main clearfix">
					<div class="col-sm-2">
						<input type="hidden" id="w-productId"/>
						<input type="hidden" id="w-productModelId"/>
						<div class="panel-group accordion" id="accordions">
                         </div>
					</div>
					<div class="tabbable col-sm-10" id="right-table" style="display: none;">
						<input type="hidden" id="tabFlow"/>
						<ul class="nav nav-tabs tabs-flat" id="title-tab">
							<!-- <li class="active"><a data-toggle="tab" href="#communication">客服沟通</a></li>
							<li><a data-toggle="tab" href="#resourcesVerify">资源核实</a></li>
							<li><a data-toggle="tab" href="#refundScheme">制定退费方案</a></li>
							<li><a data-toggle="tab" href="#reviewRefund">审核退费方案</a></li> -->
						</ul>
						<div class="tab-content tabs-flat">
							<div id="load-content" class="tab-pane active">
								<div class="row row_padding form-horizontal">
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div class="form-group col-md-3 col-sm-3 no-margin-right">
											<div class="input-group date">
												<input type="text" class="form-control duration reservation"
													autocomplete="off" placeholder="请选择日期"> <span
													class="input-group-addon"> <i class="fa fa-calendar"></i>
												</span>
											</div>
										</div>
										<div class="form-group col-md-2 col-sm-2 no-margin-right">
											<select name="departmentSchool" class="form-control chosen-select" id="departmentSchool">
												<!-- <option value="">请选择分校</option> -->
											</select>
										</div>
										<div class="form-group col-md-2 col-sm-2 no-margin-right"
											style="width: 22%">
											<input type="text" class="form-control" id="searchVal" placeholder="姓名/联系方式" onkeydown="search();">
										</div>
										<div class="pull-left">
											<button type="button"
												class="btn btn-lightBlue form-control search-btn" onclick="DataTable.init()">
												<i class="fa fa-search"></i> 搜索
											</button>
										</div>
									</div>
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-group form-group">
										<div class="col-sm-3">
											<select name="dealUserId" id="dealUserId" class="form-control chosen-select">
												<option value="0">请选择员工</option>
		                                        <c:forEach var="e" items="${selectList }">
		                                          <option value="${e.userId }">${e.realName }</option>
		                                        </c:forEach>
											</select>
										</div>
										<div class="pull-left text-right no-padding-right">
											<a class="btn increase allocation-btn" onclick="toChooseAr()"> 
												<i class="fa fa-hand-o-right"></i> 分配
											</a>
										</div>
									</div>
								</div>
								<table class="table table-striped table-hover table-bordered dataTable no-footer" id="flowTable">
									<thead>
										<tr>
											<th width="5%"></th>
											<th>报名日期</th>
											<th>倒计时</th>
											<th>状态</th>
											<th>分校</th>
											<th>姓名</th>
											<th>手机号</th>
											<th>性别</th>
											<th>身份证号</th>
											<th>产品模型</th>
											<th>产品名称</th>
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
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--客服沟通-->
<div class="modal fade return-descrip in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption title-caption"></span>
            </div> 
            <div class="modal-body descrip-total">
                <div id="scdata">
                <!-- <form class="form-horizontal" id="turnClass"> -->
                    <div id="material" class="tab-pane active">

                        <div class="material-info">
                            <div class="clearfix" style="line-height:30px">
                                <div class="trademark">
                                    <span>咨询分校：</span>
                                    <i class="zxFX"></i>
                                </div>
                                <div class="trademark">
                                    <span>品牌：</span>
                                    <i class="pb"></i>
                                </div>
                                <div class="trademark">
                                    <span>咨询者类型：</span>
                                    <i class="zxzLX"></i>
                                </div>
                                <div class="trademark">
                                    <span>媒体来源：</span>
                                    <i class="mtLY"></i>
                                </div>
                                <div class="trademark">
                                    <span>客户成熟度：</span>
                                    <i class="khCSD"></i>
                                </div>
                            </div>

                            <div class="material-course clearfix">
                                <div class="course-title">学员个人信息</div>
                                <div class="course container-fluid  form-horizontal">
                                    <div class="row">
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
                                            <div class="col-sm-9 col-lg-9">
                                                <input type="text" id="studentName" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right">性别</label>
                                            <div class="col-sm-9">
                                                <select class="form-control comment_disabled" id="studentSex" disabled="disabled">
                                                    <option value="0">男</option>
                                                    <option value="1">女</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right">年龄</label>
                                            <div class="col-sm-9">
                                                <input type="text" id="studentAge" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right">手机</label>
                                            <div class="col-sm-9">
                                                <input type="text" id="studentPhone" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right">邮箱</label>
                                            <div class="col-sm-9">
                                                <input type="email" id="studentEmail" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
                                            <div class="col-sm-9">
                                                <input class="form-control comment_disabled" id="phoneBelong" disabled="disabled"/>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right">微信</label>
                                            <div class="col-sm-9">
                                                <input type="text" id="weChat" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-3 control-label no-padding-right">QQ</label>
                                            <div class="col-sm-9">
                                                <input type="text" id="tengXun" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">其他联系方式</label>
                                            <div class="col-sm-9">
                                                <input type="text" id="ortherPhone" class="form-control comment_disabled" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                                            <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">通讯地址</label>
                                            <div class="col-sm-9">
                                            	<i class="form-control" id="phoneAddress"></i>
                                                <!-- <input class="form-control comment_disabled" id="phoneAddress" value="" type="text" disabled="disabled"> -->
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                                            <label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">工作单位</label>
                                            <div class="col-sm-9">
                                                <i class="form-control" id="workSpace"></i>
                                                <!-- <input type="text" class="form-control comment_disabled" id="workSpace" value="" disabled="disabled"> -->
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="material-course clearfix">
                                <div class="course-title">课程信息</div>
                                <div class="course container-fluid  form-horizontal">
                                    <div class="row">
                                    	<div class="form-group col-lg-4 col-md-4 col-sm-6 showMN">
                                            <label class="col-sm-4 control-label no-padding-right">产品模型</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control showModelName" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <!-- <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">类型</label>
                                            <div class="col-sm-8">
                                                <select class="form-control comment_disabled" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">项目</label>
                                            <div class="col-sm-8">
                                            	<i class="form-control" id="productModelName"></i>
                                                <select class="form-control comment_disabled" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">级别</label>
                                            <div class="col-sm-8">
                                            	<i class="form-control" id="productName"></i>
                                                <select class="form-control comment_disabled" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div> -->
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">考期</label>
                                            <div class="col-sm-8">
                                           <!--  <i class="form-control" id="kTimeValue"></i> -->
                                                <select class="form-control comment_disabled" name="kTime" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <!-- <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">班型</label>
                                            <div class="col-sm-8">
                                                <select class="form-control comment_disabled" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">班号</label>
                                            <div class="col-sm-8">
                                                <select class="form-control comment_disabled" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div> -->
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">考试地区</label>
                                            <div class="col-sm-8">
                                                 <input type="text" id="examDistrict" class="form-control" readonly/>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">产品</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control productCom" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">收款方</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control partComminute" value="" disabled="disabled">
                                            </div>
                                        </div>
                                        <!-- <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">价格</label>
                                            <div class="col-sm-8">
                                                <select class="form-control comment_disabled" disabled="disabled">
                                                    <option value="0"></option>
                                                    <option value="1"></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                            <label class="col-sm-4 control-label no-padding-right">学籍号</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control comment_disabled" value="" disabled="disabled">
                                            </div>
                                        </div> -->

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">缴费信息</div>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="payMentTableInfoBody">
                                    <thead>
                                        <tr>
                                            <th>费用项目</th>
                                            <th>应缴</th>
                                            <th>实缴</th>
                                            <th>支付方式</th>
                                            <th>欠费</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="material-course clearfix child-product-info" style="display:none;">
                            <div class="course-title">子产品信息</div>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>产品模型</th>
                                            <th>产品名称</th>
                                            <th>应缴</th>
                                            <th>实缴</th>
                                            <th>欠费</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    	<tr>
                                    		<td class="childModel"></td>
                                    		<td class="childName"></td>
                                    		<td class="childPayable"></td>
                                    		<td class="childPaiedIn"></td>
                                    		<td class="childArrears"></td>
                                    	</tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> 

                        <div class="material-course clearfix">
                            <div class="course-title">退费情况汇总</div>
                            <div class="course container-fluid  form-horizontal">
                                <div class="row">
                                        <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                            <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">退费原因</label>
                                            <div class="col-sm-10">
                                                <input class="form-control rebuildRemark" disabled id="refundCause" />
                                            </div>
                                        </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">合作方名称</label>
                                        <div class="col-sm-10">
                                            <input class="form-control comment_disabled" disabled id="partnerName" type="text">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">已支出合作费</label>
                                        <div class="col-sm-8">
                                            <input class="form-control comment_disabled" disabled id="yetExpend" type="text">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-6 col-md-6 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">合作费是否已退</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control comment_disabled" disabled id="isPartReturn">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">分校退费建议</label>
                                        <div class="col-sm-10">
                                            <input class="form-control rebuildRemark" id="refundSuggest" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">退费资料上传</label>
                                        <div class="col-sm-10">
                                            <!-- <a id="pictureShow" class="btn btn-primary" target="_blank">查看</a> -->
                                            <textarea class="form-control rebuildRemark contentt" rows="3" id="returnFile" readonly name="returnFile" style="width:668px;height:340px;"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">退费资料快递单号</label>
                                        <div class="col-sm-10">
                                            <input class="form-control comment_disabled" disabled id="courierNumber" type="text">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">备注</label>
                                        <div class="col-sm-10" >
                                        	<textarea class="form-control comment_disabled" rows="2" disabled id="refundRemark1" type="text"></textarea>
                                            <!-- <textarea class="form-control rebuildRemark content" rows="3" id="rebuildRemark" name="rebuildRemark" style="width:668px;height:340px;"></textarea> -->
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">客服沟通情况汇总</div>
                            <div class="table-responsive" id="communicateTable1">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="3">客服经办人</th>
                                            <th class="agentPerson"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" style="width:20%">步骤</th>
                                            <td style="width:20%">办理进展</td>
                                            <td style="width:20%">是/否</td>
                                            <td style="width:40%">备注</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">第一步</th>
                                            <td>与学员48小时内沟通</td>
                                            <td class="isCommunicated">
                                            </td>
                                            <td class="communicateDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">第二步</th>
                                            <td>分校材料审核完毕</td>
                                            <td class="isAudit">
                                            </td>
                                            <td class="auditDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">第三步</th>
                                            <td colspan="2">整理需资源部核实资料</td>
                                            <td class="checkDesc"></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">客服制定退费方案</div>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:40%">客服经办人</th>
                                            <th id="agentKF1"></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">退费方案描述</div>
                            <div class="table-responsive" id="refundDescTable1">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:20%">退费总金额</th>
                                            <th style="width:20%">最晚支付日期</th>
                                            <th style="width:60%">备注</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th class="chargeBackMoney"></th>
                                            <td class="chargeEndTime"></td>
                                            <td class="chargeDesc"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">相关扣费</div>
                            <div class="course container-fluid  form-horizontal">
                        <div class="row" style="width:100%;margin-left:0px">
                            <table class="table table-bordered" id="relatedCharges">
                                <thead>
                                  <tr>
                                    <th>收费项目</th>
                                    <th>应缴</th>
                                    <th>实缴</th>
                                    <th>支出金额</th>
                                    <th>相关扣费</th>
                                    <th>退费金额</th>
                                  </tr>
                                </thead>
                                <tbody>
                                </tbody>
                              </table>
                        </div>
                    </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">资源汇总</div>
                            <div class="table-responsive" id="resourceTable1">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="3">资源经办人</th>
                                            <th id="agentZY1"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" style="width:20%">序号</th>
                                            <td style="width:20%">问题</td>
                                            <td style="width:20%">回复</td>
                                            <td style="width:40%">备注</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>是否报考</td>
                                            <td class="isRegisterExam">
                                                <!-- <select class="form-control chosen-select" disabled="disabled" name="isRegisterExam">
                                                    <option value="0">是</option>
                                                    <option value="1">否</option>
                                                </select> -->
                                            </td>
                                            <td class="registerExamDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td colspan="2">取证进度</td>
                                            <td class="forensicsProgress"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>合作费是否可以退回</td>
                                            <td class="returnCoopFee">
                                                <!-- <select class="form-control chosen-select" disabled="disabled" name="returnCoopFee">
                                                    <option value="0">是</option>
                                                    <option value="1">否</option>
                                                </select> -->
                                            </td>
                                            <td class="coopFeeDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>退回合作费金额</td>
                                            <td class="refundCoopMoney"></td>
                                            <td class="refundCoopMoneyDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>返款时间</td>
                                            <td class="refundTime"></td>
                                            <td class="refundTimeDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td>无法退回原因</td>
                                            <td class="cantBack">
                                                <!-- <select class="form-control chosen-select" disabled="disabled" name="cantBack">
                                                    <option value="1">是</option>
                                                    <option value="0">否</option>
                                                </select> -->
                                            </td>
                                            <td class="cantBackDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">7</th>
                                            <td>是否有挂账支出</td>
                                            <td class="isCredit">
                                               <!--  <select class="form-control chosen-select" disabled="disabled" name="isCredit">
                                                    <option value="1">是</option>
                                                    <option value="0">否</option>
                                                </select> -->
                                            </td>
                                            <td class="creditDesc"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">8</th>
                                            <td colspan="2">资源建议</td>
                                            <td class="resourceSuggest"></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">退费申请</div>
                            <div class="table-responsive" id="refundApply">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:15%">金额</th>
                                            <th style="width:30%">申请日期</th>
                                            <th style="width:50%">备注</th>
                                        </tr>
                                    </thead>
                                    <tbody class="show-return-apply">
                                        <!-- <tr>
                                            <th scope="row">
                                                <input type="text" class="form-control comment_disabled">
                                            </th>
                                            <td>
                                                <div class="input-group">
                                                    <input class="form-control date-picker form_datetime" type="text" value="" readonly>
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                </div> 
                                            </td>
                                            <td>
                                                <textarea class="form-control rebuildRemark" rows="2"></textarea>
                                            </td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">退费申请</div>
                            <div class="course container-fluid  form-horizontal" id="amountTable1">
                                <div class="row">
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">支出明细</label>
                                        <div class="col-sm-10">
                                            <span class="expendituresDesc form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">发票抬头</label>
                                        <div class="col-sm-10">
                                            <span class="invoiceTitle form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">开户行</label>
                                        <div class="col-sm-9">
                                        	<span class="openBank form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">开卡所在省</label>
                                        <div class="col-sm-9">
                                            <span class="openProvince form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">开卡所在市</label>
                                        <div class="col-sm-9">
                                            <span class="openCity form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">收款人</label>
                                        <div class="col-sm-9">
                                            <span class="recevier form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">账号</label>
                                        <div class="col-sm-9">
                                            <span class="amount form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">户名</label>
                                        <div class="col-sm-9">
                                            <span class="amonutName form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-44px">电话</label>
                                        <div class="col-sm-9">
                                            <span class="phone form-control"></span>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">备注</label>
                                        <div class="col-sm-10">
                                            <!-- <p class="amountDesc"></p> -->
                                            <textarea type="text" rows="2" disabled class="form-control comment_disabled amountDesc"></textarea>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">责任鉴定</div>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dutyShow">
                                    <thead>
                                        <tr>
                                            <th>责任分校</th>
                                            <th>是否收回分成</th>
                                            <th>责任人</th>
                                            <th>罚款金额</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       <!--  <tr>
                                            <th scope="row">--</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                            <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
                                <label style="margin-left: 0 !important;text-align: right;" class="col-lg-2 col-md-2 col-sm-2 control-label no-padding-right">备注</label>
                                <div class="col-lg-10 col-md-10 col-sm-10">
                                    <!-- <p class="amountDesc"></p> -->
                                    <div id="dutyRemark"></div>
                                </div>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">驳回原因</div>
                            <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-top:15px;">
                                <div class="col-sm-10" id="rejectC">
                                    <!-- <textarea class="form-control rebuildRemark content" rows="3" id="rebuildRemark" name="rebuildRemark" style="width:668px;height:340px;"></textarea> -->
                                </div>
                            </div>
                        </div>

                    </div>
					<div class="hideclass" style="display:none;">
						<form id="hideForm">
						<!-- 隐藏域 -->
						<!-- 退费信息主键Id -->
						<input type="hidden" name="returnsId" id="hideReturnsId">
						<!-- 环节ID -->
						<input type="hidden" name="flowPoint" id="hideNextPoint"/>
					</form>
					</div>
                    <!-- <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-3 col-xs-3 col-sm-offset-4  col-xs-offset-3">
                            <button type="button" class="btn btn-primary btn-lg col-sm-6 totalSum">提交
                            </button>
                        </div>

                        <div class="col-sm-3  col-xs-3">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div> -->
            <!-- 	</form> -->
                </div>
            </div>
            
            <div class="refundBtns">
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn" data-toggle="modal" data-target=".gather">沟通情况汇总</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn" data-toggle="modal" data-target=".resource-verify">资源汇总</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn returnDes" data-toggle="modal" data-target=".refund-describe">退费方案</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn formulateScheme" data-toggle="modal" data-target=".gather-verify-modal">退费申请</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn" data-toggle="modal" data-target=".T-shirts">特批</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn" data-toggle="modal" data-target=".reject">驳回</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn returnDutyBtn" data-toggle="modal" data-target=".return-duty">责任鉴定</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn" data-toggle="modal" data-target=".transform">转化</button>
		        <button type="button" class="btn btn-primary btn-lg btn-block refundBtn" data-toggle="modal" data-target=".refer">提交</button>
			</div>
            
        </div>
    </div>   
    
</div>
<div style="display:none" class="hideDisticnt">
	<input type="hidden" id="userName" value="${sessionScope.currentUser.realName }"/>
	<input type="hidden" id="userId" value="${sessionScope.currentUser.userId }"/>
</div>
<!--沟通情况汇总-->
<div class="modal fade gather in communicateTotal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">沟通情况汇总</span>
            </div>
            <div class="modal-body" id="communicateTable2">
                <form class="form-horizontal" id="communicateForm" refund-model="沟通情况汇总">
                	<div class="table-responsive">
                		<table class="table table-bordered">
                			<tbody>
                				<tr>
                					<th scope="row" style="width:20%">
                						步骤
                					</th>
                					<td style="width:20%">办理进展</td>
                					<td style="width:20%">是/否</td>
                					<td style="width:40%">备注</td>
                				</tr>
                				<tr>
                					<th scope="row">第一步</th>
                					<td>与学员48小时内沟通</td>
                					<td>
                						<select
                							class="form-control chosen-select" mean-title="第一步的《是/否》项"
                							name="isCommunicated" initial-value="">
                							<option>--请选择--</option>
                							<option value="1">是</option>
                							<option value="0">否</option>
                						</select>
                					</td>
                					<td>
                						<textarea
                							class="form-control rebuildRemark"
                							name="communicateDesc" rows="2"  mean-title="第一步的《备注》项"
                							id="rebuildRemark" style="width:100%;">
                						</textarea>
                					</td>
                				</tr>
                				<tr>
                					<th scope="row">第二步</th>
                					<td>分校材料审核完毕</td>
                					<td>
                						<select
                							class="form-control chosen-select" mean-title="第二步的《是/否》项"
                							name="isAudit">
                							<option>--请选择--</option>
                							<option value="1">是</option>
                							<option value="0">否</option>
                						</select>
                					</td>
                					<td>
                						<textarea
                							class="form-control rebuildRemark" mean-title="第二步的《备注》项"
                							name="auditDesc" rows="2" id="rebuildRemark"
                							style="width:100%;">
                						</textarea>
                					</td>
                				</tr>
                				<tr>
                					<th scope="row">第三步</th>
                					<td colspan="2">整理需资源部核实资料</td>
                					<td>
                						<textarea
                							class="form-control rebuildRemark" rows="2"
                							name="checkDesc" id="rebuildRemark" mean-title="第三步的《备注》项"
                							style="width:100%;">
                						</textarea>
                					</td>
                				</tr>

                			</tbody>
                		</table>
                		<div class="clearfix form-group"
                			style="margin:40px 0px;">
                			<div
                				class="col-sm-3 col-xs-3 col-sm-offset-3  col-xs-offset-3">
                				<button type="button"
                					class="btn btn-primary btn-lg col-sm-6 confirm"
                					style="padding:0;line-height:40px;">
                					确定
                				</button>
                			</div>

                			<div class="col-sm-3  col-xs-3">
                				<button type="button"
                					class="btn btn-danger btn-lg col-sm-6"
                					style="padding:0;line-height:40px;"
                					data-dismiss="modal">
                					取消
                				</button>
                			</div>
                		</div>
                	</div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--退费方案-->
<div class="modal fade refund-describe in refundDescTotal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">退费方案描述</span>
            </div>
            <div class="modal-body" id="refundDescTable2">
                <div class="material-course clearfix">
                    <div class="course-title">退费方案描述</div>
                    <div class="table-responsive">
                        <table class="table table-bordered" id="lastDesc">
                            <thead>
                                <tr>
                                    <th style="width:20%">退费总金额</th>
                                    <th style="width:30%">最晚支付日期</th>
                                    <th style="width:50%">备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <input type="text" class="form-control comment_disabled" name="chargeBackMoney" readonly>
                                    </th>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control date-picker form_datetime" type="text" name="chargeEndTime" readonly>
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <textarea class="form-control rebuildRemark" rows="2" name="chargeDesc"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="material-course clearfix">
                    <div class="course-title">相关扣费</div>
                    <div class="course container-fluid  form-horizontal">
                        <div class="row" style="width:100%;margin-left:0px">
                            <table class="table table-bordered" id="relatedCharges2">
                                <thead>
                                  <tr>
                                    <th>收费项目</th>
                                    <th>应缴</th>
                                    <th>实缴</th>
                                    <th>支出金额</th>
                                    <th>相关扣费</th>
                                    <th>退费金额</th>
                                  </tr>
                                </thead>
                                <tbody>
                                </tbody>
                              </table>
                        </div>

                    </div>
                </div>
                
                <div class="clearfix form-group" style="margin:40px 0px;">
                    <div class="col-sm-3 col-xs-3 col-sm-offset-3  col-xs-offset-3">
                        <button type="button" class="btn btn-primary btn-lg col-sm-6 refundDBtn" style="padding:0;line-height:40px;">确定
                        </button>
                    </div>

                    <div class="col-sm-3  col-xs-3">
                        <button type="button" class="btn btn-danger btn-lg col-sm-6" style="padding:0;line-height:40px;" data-dismiss="modal">取消
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<!--资源沟通情况汇总-->
<div class="modal fade resource-verify in resourceTotal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">资源汇总</span>
            </div>
            <div class="modal-body" id="resourceTable2">
                    <form class="resourceForm"> 
                    	<div class="table-responsive">
                    		<table class="table table-bordered">
                    			<tbody>
                    				<tr>
                    					<th scope="row"
                    						style="width:10%">
                    						序号
                    					</th>
                    					<td style="width:20%">问题</td>
                    					<td style="width:30%">回复</td>
                    					<td style="width:40%">备注</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">1</th>
                    					<td>是否报考</td>
                    					<td>
                    						<select
                    							class="form-control chosen-select" mean-title="是否报考的《回复》项"
                    							name="isRegisterExam">
                    							<option>--请选择--</option>
                    							<option value="1">
                    								是
                    							</option>
                    							<option value="0">
                    								否
                    							</option>
                    						</select>
                    					</td>
                    					<td>
                    						<textarea
                    							class="form-control rebuildRemark" rows="2" mean-title="是否报考的《备注》项"
                    							name="registerExamDesc">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">2</th>
                    					<td colspan="2">取证进度</td>
                    					<td>
                    						<textarea
                    							class="form-control rebuildRemark" rows="2" mean-title="取证进度的《备注》项"
                    							name="forensicsProgress">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">3</th>
                    					<td>合作费是否可以退回</td>
                    					<td>
                    						<select
                    							class="form-control chosen-select" mean-title="合作费是否可以退回的《回复》项"
                    							name="returnCoopFee">
                    							<option>--请选择--</option>
                    							<option value="1">
                    								是
                    							</option>
                    							<option value="0">
                    								否
                    							</option>
                    						</select>
                    					</td>
                    					<td>
                    						<textarea
                    							class="form-control rebuildRemark" rows="2" mean-title="合作费是否可以退回的《备注》项"
                    							name="coopFeeDesc">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">4</th>
                    					<td>退回合作费金额</td>
                    					<td>
                    						<input type="text" mean-title="退回合作费金额的《回复》项"
                    							class="form-control comment_disabled"
                    							name="refundCoopMoney">
                    					</td>
                    					<td>
                    						<textarea mean-title="退回合作费金额的《备注》项"
                    							class="form-control rebuildRemark" rows="2"
                    							name="refundCoopMoneyDesc">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">5</th>
                    					<td>返款时间</td>
                    					<td>
                    						<div class="input-group">
                    							<input mean-title="返款时间的《回复》项"
                    								class="form-control date-picker form_datetime"
                    								type="text" value="" name="refundTime">
                    							<span
                    								class="input-group-addon">
                    								<i
                    									class="fa fa-calendar">
                    								</i>
                    							</span>
                    						</div>
                    					</td>
                    					<td>
                    						<textarea mean-title="返款时间的《备注》项"
                    							class="form-control" rows="2"
                    							name="refundTimeDesc">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">6</th>
                    					<td>无法退回原因</td>
                    					<td>
                    						<select mean-title="无法退回原因的《回复》项"
                    							class="form-control chosen-select"
                    							name="cantBack">
                    							<option>--请选择--</option>
                    							<option value="1">
                    								是
                    							</option>
                    							<option value="0">
                    								否
                    							</option>
                    						</select>
                    					</td>
                    					<td>
                    						<textarea mean-title="无法退回原因的《备注》项"
                    							class="form-control" rows="2"
                    							name="cantBackDesc">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">7</th>
                    					<td>是否有挂账支出</td>
                    					<td>
                    						<select mean-title="是否有挂账支出的《回复》项"
                    							class="form-control chosen-select"
                    							name="isCredit">
                    							<option>--请选择--</option>
                    							<option value="1">
                    								是
                    							</option>
                    							<option value="0">
                    								否
                    							</option>
                    						</select>
                    					</td>
                    					<td>
                    						<textarea mean-title="是否有挂账支出的《备注》项"
                    							class="form-control" rows="2"
                    							name="creditDesc">
                    						</textarea>
                    					</td>
                    				</tr>
                    				<tr>
                    					<th scope="row">8</th>
                    					<td colspan="2">资源建议</td>
                    					<td>
                    						<textarea mean-title="资源建议的《备注》项"
                    							class="form-control" rows="2"
                    							name="resourceSuggest">
                    						</textarea>
                    					</td>
                    				</tr>

                    			</tbody>
                    		</table>
                    	</div>
                    </form>

                    <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-3 col-xs-3 col-sm-offset-3  col-xs-offset-3">
                            <button type="button" class="btn btn-primary btn-lg col-sm-6 resourceBtn" style="padding:0;line-height:40px;">确定
                            </button>
                        </div>
    
                        <div class="col-sm-3  col-xs-3">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6" style="padding:0;line-height:40px;" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</div>

<!--驳回原因-->
<div class="modal fade reject in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">驳回原因</span>
            </div>
            <div class="modal-body">
                    <div class="material-course clearfix">
                        <div class="course-title">驳回原因</div>
                        <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-top:15px;">
                            <label style="margin-left: 0 !important;" class="col-sm-1 control-label no-padding-right">驳回原因</label>
                            <div class="col-sm-11">
                                <textarea class="form-control rebuildRemark content" rows="3" name="rejectCause" style="width:668px;height:340px;"></textarea>
                               
                            </div>
                        </div>
                    </div>

                    <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-3 col-xs-3 col-sm-offset-3  col-xs-offset-3">
                            <button type="button" class="btn btn-primary btn-lg col-sm-6 disAgreeBtn" style="padding:0;line-height:40px;">确定
                            </button>
                        </div>
    
                        <div class="col-sm-3  col-xs-3">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6" style="padding:0;line-height:40px;" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</div>

<!--资源汇总-->
<div class="modal fade gather-verify-modal in refundApplyTotal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">退费申请</span>
            </div>
            <div class="modal-body" id="refundApplyTable2">
                    <div class="material-course clearfix">
                        <div class="course-title">退费申请</div>
                        <div class="table-responsive">
                            <table class="table table-bordered" id="refundIssue" minus-log="">
                                <thead>
                                    <tr>
                                        <th style="width:15%">金额</th>
                                        <th style="width:30%">申请日期</th>
                                        <th style="width:50%">备注</th>
                                        <th style="width:5%">操作</th>
                                    </tr>
                                </thead>
                                <tbody class="return-apply">
                                    <tr>
                                        <th scope="row">
                                        	<input type="hidden" name="returnId" class="form-issue" id="issueApplyReturnId"> 
                                            <input type="text" class="form-control form-issue comment_disabled" name="applyMoney">
                                        </th>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control form-issue date-picker form_datetime" type="text" name="applyDate" readonly>
                                                <span class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                            </div> 
                                        </td>
                                        <td>
                                            <textarea class="form-control form-issue" rows="2" name="remark"></textarea>
                                        </td>
                                        <td>
                                            <i class="fa fa-plus-circle add-btn"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="material-course clearfix">
                        <div class="course-title">退费申请详细</div>
                        <div class="course container-fluid  form-horizontal">
                            <form id="accountDesc">
                            	<div class="row"> 
                            		<div
                            			class="form-group col-lg-12 col-md-12 col-sm-12">
                            			<label
                            				style="margin-left: 0 !important;"
                            				class="col-sm-1 control-label no-padding-right">
                            				支出明细
                            			</label>
                            			<div class="col-sm-10">
                            				<input type="text" class="form-control rebuildRemark" name="expendituresDesc"/>
                            				
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-12 col-md-12 col-sm-12">
                            			<label
                            				style="margin-left: 0 !important;"
                            				class="col-sm-1 control-label no-padding-right">
                            				发票抬头
                            			</label>
                            			<div class="col-sm-10">
                            				<input type="text" class="form-control rebuildRemark" name="invoiceTitle" />
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				开户行
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="openBank">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				开卡所在省
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="openProvince">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				开卡所在市
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="openCity">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				收款人
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="recevier">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				账号
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="amount">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				户名
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="amonutName">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-4 col-md-4 col-sm-6">
                            			<label
                            				class="col-sm-5 control-label no-padding-right no-padding-left"
                            				style="margin-left:-44px">
                            				电话
                            			</label>
                            			<div class="col-sm-9">
                            				<input type="text"
                            					class="form-control comment_disabled"
                            					name="phone">
                            			</div>
                            		</div>
                            		<div
                            			class="form-group col-lg-12 col-md-12 col-sm-12">
                            			<label
                            				style="margin-left: 0 !important;"
                            				class="col-sm-1 control-label no-padding-right">
                            				备注
                            			</label>
                            			<div class="col-sm-11">
                            				<textarea class="form-control content" name="amountDesc" rows="3" style="width:668px;height:340px;"></textarea>
                            			</div>
                            		</div>

                            	</div>
                            </form>

                        </div>
                    </div>

                    <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-3 col-xs-3 col-sm-offset-3  col-xs-offset-3">
                            <button type="button" class="btn btn-primary btn-lg col-sm-6 applyAmountBtn" style="padding:0;line-height:40px;">确定
                            </button>
                        </div>
    
                        <div class="col-sm-3  col-xs-3">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6" style="padding:0;line-height:40px;" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</div>
<!--转化-->
<div class="modal fade transform in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">转化</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal">
                    <h3 class="text-center">请确认是否进行此操作！！！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control transformBtn">确认
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

<!--特批-->
<div class="modal fade T-shirts in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">特批</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal">
                    <h3 class="text-center">特批后该学员退费将没有金额限制，请确认是否进行此操作！！！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control specialRatify">确认
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

<!--提交-->
<div class="modal fade refer in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-xs">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">信息确认</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal">
                    <h3 class="text-center">请确认是否流转下一环节！！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control totalSum">确认
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
<!--责任鉴定-->
<div class="modal fade return-duty in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">责任鉴定</span>
            </div>
            <div class="modal-body">
                    <div class="material-course clearfix">
                        <div class="course-title">责任鉴定</div>
                        <div class="table-responsive duty-table-win">
                            <table class="table table-bordered zerenren">
                                <thead>
                                    <tr>
                                        <th style="width:30%">责任分校
                                        <span class="parentNode">
		                                     <i class="fa fa-plus success operate-btn"></i>
		                                     <i class="fa fa-minus danger operate-btn"></i>
		                                </span>
                                        </th>
                                        <th style="width:10%">是否收回分成</th>
                                        <th style="width:40%">责任人</th>
                                        <th style="width:20%">罚款金额</th>
                                    </tr>
                                </thead>
                                <tbody class="return-identify">
                                    <tr parent-tr="parent-1">
                                        <td rowspan="1" class="rows">
                                            <div>
                                                <select name="dutyDepartmentId" class="form-control chosen-select">
                                                </select>
                                            </div>
                                        </td>
                                        <td rowspan="1" class="rows">
                                            <select class="form-control chosen-select" name="isWithdraw">
                                            	<option>--请选择--</option>
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                        </td>
                                        <td>
                                        <div>
                                            <div class="row col-lg-12 col-md-12 col-sm-12">
                                            	<div class="col-lg-10 col-md-10 col-sm-10">
                                            	<input type="hidden" name="dutyDepartmentId" class="form-require"/>
                                            	<input type="hidden" name="isWithdraw" class="form-require"/>
	                                                <select name="dutyPersonId" class="form-control form-require chosen-select">
	                                                    <option value="">--请选择--</option>
	                                                </select>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 childNode">
                                                	<i class="fa fa-plus-circle add-rena operate-btn" style="line-height:34px;font-size:20px;color: rgb(0, 160, 233);cursor: pointer;"></i>
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-require" name="penalty"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-top:15px;">
                            <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">备注</label>
                            <div class="col-sm-10">
                                <textarea class="form-control rebuildRemark content" rows="3" id="dutyWinRemark" name="remark" style="width:668px;height:340px;" mean-title="备注" initial-value=""></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-3 col-xs-3 col-sm-offset-3  col-xs-offset-3">
                            <button type="button" class="btn btn-primary btn-lg col-sm-6 submit-duty" style="padding:0;line-height:40px;">确定
                            </button>
                        </div>
    
                        <div class="col-sm-3  col-xs-3">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6" style="padding:0;line-height:40px;" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</div>
<div class="logInfo" style="display:none;">
	<form class="logForm">
		<input type="hidden" name="infoManageId">
		<input type="hidden" name="productId">
	</form>
</div>


 <script>
    $.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
		KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
		addEditor = KindEditor.create('.content',{
			uploadJson:'${ctx }/file/uploadFile',
			resizeType:0 
		});
	});
</script>
<!--富文本框-->

<script src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script src="${ctx_static }/home/serviceCenter/js/refundTable.js?v_<%=System.currentTimeMillis()%>"></script>
