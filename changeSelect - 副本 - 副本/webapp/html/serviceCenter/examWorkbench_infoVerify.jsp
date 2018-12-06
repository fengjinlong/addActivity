<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all"
	rel="stylesheet" />
<link href="${ctx_static }/home/serviceCenter/css/examWorkbench.css"
	rel="stylesheet">

<!--信息核实中心 begin-->
<div id="InfoVerify" class="tab-pane clearfix in active">
	<div class="col-lg-12 col-sm-12 col-xs-12 no-padding">
		<div class="tabbable tabs-left">
			<!--<ul class="nav nav-tabs animated bounceInLeft">-->
				<!-- isCompleteData=0 isCompleteAmount=0 -->
				<!-- <li class="active"><a data-toggle="tab" href="javascript:void(0)" onclick="filterTable(0,0)"> 资料金额均不全 </a></li>-->
				<!-- isCompleteData=0 isCompleteAmount=1 -->
				<!-- <li><a data-toggle="tab" href="javascript:void(0)" onclick="filterTable(0,1)"> 资料不全 </a></li>-->
				<!-- isCompleteData=1 isCompleteAmount=0 -->
				<!-- <li><a data-toggle="tab" href="javascript:void(0)" onclick="filterTable(1,0)"> 金额不全 </a></li>-->
				<!-- isCompleteData=1 isCompleteAmount=1 -->
				<!-- <li><a data-toggle="tab" href="javascript:void(0)" onclick="filterTable(1,1)"> 资料金额齐全 </a></li>
			</ul> -->
			<div class="btn-group infoVerifyBtn">
				<!-- isCompleteData=0 isCompleteAmount=0 -->
			 	<a href="javascript:void(0)"  class="btn btn-default active"  onclick="filterTable(0,0)">资料金额均不全</a>
			 	<!-- isCompleteData=0 isCompleteAmount=1 -->
		  		<a href="javascript:void(0)"  class="btn btn-default" onclick="filterTable(0,1)">资料不全</a>
		  		<!-- isCompleteData=1 isCompleteAmount=0 -->
		  		<a href="javascript:void(0)"  class="btn btn-default" onclick="filterTable(1,0)">金额不全</a>
		  		<!-- isCompleteData=1 isCompleteAmount=1 -->
		  		<a href="javascript:void(0)"  class="btn btn-default" onclick="filterTable(1,1)">资料金额齐全</a>
			</div>
			<div class="verifyData animated bounceInRight">
				<div id="amountDataPartial" class="tab-pane active">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 form-group">
								<label class="control-label pull-left">日期</label>
								<div class="col-md-10 col-sm-10 no-padding-right">
									<div class="input-group date">
										<input type="text" class="form-control  reservation"
											placeholder="请选择日期"> <span
											class="input-group-addon"> <i class="fa fa-calendar"></i>
										</span>
									</div>
								</div>
							</div>
						<div class="col-md-7 col-sm-7">
							<div class="form-group col-sm-10 no-margin-right">
								<input type="text" class="form-control" id="searchVal" onkeydown="search()"
									placeholder="分校/姓名/电话/教育形式/院校/级别/报名表编号/身份证号">
							</div>
							<div class="pull-left">
								<button type="button" class="btn increase search-btn">
									<i class="fa fa-search"></i>搜索
								</button>
							</div>
						</div>
						<!-- 转待报考 -->
						<div class="pull-right">
							<div class="form-group">
                               	<button type="button" class="btn btn-lightBlue switch-btn" style="margin-right:15px;">确定</button>
                               </div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable">
							<table
								class="table table-striped table-hover table-bordered dataTable"
								id="infoVerifyTable">
								<thead>
									<tr role="row">
										<th width="5%"><label> <input type="checkbox">
												<span class="text"></span>
										</label></th>
										<th rowspan="1" colspan="1">报名日期 </th>
										<th>状态 </th>
										<th>姓名 </th>
										<th>身份证号码 </th>
										<th>籍贯 </th>
										<th>分校 </th>
										<th>考期 </th>
										<th>教育形式 </th>
										<th>项目</th>
										<th>级别 </th>
										<th>学校 </th>
										<th>专业 </th>
										<th>电话确认状态 </th>
										<th>学员确认</th>
										<th>学员确认日期 </th>
										<th>退回次数 </th>
										<th>资料是否齐全 </th>
										<th>打印(逐次记录)</th>
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
<!--信息核实中心 end-->

<!-- 信息核实中心查看/电话 -->
 <div class="modal fade in amountDataPhone" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="amountDataPhone">
                
                <input type="hidden" name="infoManageId"/>
                <input type="hidden" name="id"/>
                
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <span class="form-title text-center">学员信息</span>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <span class="form-title text-center col-sm-12">是否与实际信息一致</span>
                            </div>
                            <div class="col-sm-3">
                                <span class="form-title text-center col-sm-12">实际信息</span>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">姓名：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" name="studentName" value="" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="nameConsistent" type="radio" value="1" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="nameConsistent" type="radio" value="0">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" name="actualName" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">证件号：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" name="idcard" value="" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="numberConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="numberConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualIdcard">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">性别：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" value="" name="studentSex" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="sexConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="sexConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualSex">
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">电话：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" value="" name="studentPhone" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="phoneConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="phoneConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualPhone">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">报考院校：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" value="" name="graduateInstitutions" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="academyConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="academyConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualSchool">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">级别：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" value="" name="projectLevelName" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="gradeConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="gradeConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualLevel">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">专业：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" value="" name="majorName" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="majorConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="majorConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualMajor">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">缴费金额：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <input type="text" class="form-control" value="" name="payment" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="paymentConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="paymentConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualPayment">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="control-label col-sm-3 no-padding-right">报名表：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <span class="isEntryForm">报名表是否交到学员手中</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 no-padding">
                                <div class="form-group">
                                    <div class="radio col-sm-6 text-right">
                                        <label>
                                            <input name="entryFormConsistent" value="1" type="radio" checked>
                                            <span class="text">是 </span>
                                        </label>
                                    </div>
                                    <div class="radio col-sm-6">
                                        <label>
                                            <input name="entryFormConsistent" value="0" type="radio">
                                            <span class="text">否 </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group col-sm-12">
                                    <input type="text" class="form-control" name="actualReason" placeholder="请填写未收到原因">
                                </div>
                            </div>
                        </div>
                        <div class="form-group modal-footer">
                            <div class="col-sm-2 col-sm-offset-3 margin-top-20">
                                <button type="button" class="btn btn-success form-control">拨打电话
                                </button>
                            </div>
                            <div class="col-sm-2 margin-top-20">
                                <button type="submit" class="btn btn-primary form-control">确定</button>
                            </div>
                            <div class="col-sm-2 margin-top-20">
                                <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--信息核实中心发送短信-->
<div class="modal fade infoVerifyInfo in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">短信</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal padding-top-20">
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">手机号码</label>
                        <div class="col-md-8 col-sm-8 padding-left-20 no-padding-right">
                            <input class="studentPhoneMsg form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="control-label no-padding-right col-md-4" style="margin-left: -30px;">短信类别</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select name="" class="form-control msgType">
                                <option value="">--请选择--</option>
                                <option value="您好！我是学慧网的admin老师，今天对您咨询的class方面的课程进行了电话回复，但由于您没有接听到电话，很抱歉未能及时给您提供帮助与解答，我的联系电话是13501194362，您方便的话可以随时联系我，或者根据给您发送的分校路径信息直接到校区咨询，以方便您及时了解相关报考和学习信息，学习像呼吸一样自然！">
                                    跟访
                                </option>
                                <option value="学员您好，我是之前和您联系的admin老师，如果您对我们的class课程任何疑问，可以到我们校区address或随时拨打我的联系方式：13501194362。">
                                    指路
                                </option>
                                <option value="studentName您好，我是昨天给您联系的admin老师，我给您预约的recriveTime到们校区具体了解，您到时记得过来，如果找不着的话给我打电话就可以，到时候我给您指路，最后祝您工作生活愉快。">
                                    联系
                                </option>
                                <option value="studentName您好，我是刚和您联系的admin老师，我们的校区地址：address。帮您预约的是recriveTime来分校，我们安排了相关的校区老师接待您，请您注意时间安排。如有变动，请提前联系我13501194362。 ">
                                    联系
                                </option>
                                <option value="学员您好，我是之前和您联系的admin老师，如果您对我们的class课程有任何疑问，可以到我们校区address，或随时拨打我的联系方式：13501194362。加：QQ：，微信：与我沟通productName">
                                    沟通
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">短信内容</label>
                        <div class="col-md-10 col-sm-10">
                            <textarea rows="6" class="form-control showMsg"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control">确定</button>
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


<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>


<script src="${ctx_static }/home/serviceCenter/js/examWorkbench_infoVerify.js"></script>

