<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link href="${ctx_static }/home/financeCenter/css/yingshou.css" rel="stylesheet">

<div class="row">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
			 	<div class="widget-buttons"></div>
			</div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="col-md-3 no-padding-left">
								<select class="form-control" id="searchTimeType">
									<option value="2">补费日期</option>
									<option value="1">报名日期</option>
								</select>
							</div>
							<div class="form-group col-sm-9">
								<label class="control-label no-padding-right pull-left margin-left-10">日期</label>
								<div class="col-sm-10">
									<div class="controls">
										<div class="input-group date">
											<input type="text" class="form-control date_time" placeholder="请选择日期" id="reservation"><span class="input-group-addon"><i class="fa fa-calendar"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-5 col-sm-6 col-xs-12">
							<div class="form-group col-md-9 col-sm-8 no-margin-right">
								<input class="form-control" placeholder="分校/课程/级别/报名表/姓名" type="text" onkeydown="search()" id="searchVal">
							</div>
							<div class="form-group col-md-3 col-sm-4">
								<button type="button" class="btn increase form-control search-btn" onclick="toSearch()">
									<i class="fa fa-search"></i>搜索
                                 </button>
							</div>
						</div>
						<div class="col-md-1 col-sm-1 col-xs-6 btn-group ">
							<div class="btn-group pull-right">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出
                                                      <i class="fa fa-angle-up"></i>
                                                  </button>
								<ul class="dropdown-menu" role="menu">
									<li><a target="download" href="${ctx }/financeGeneral/downloadPDF">保存PDF</a></li>
									<li><a href="${ctx }/financeGeneral/downloadExcel">导出EXCEL</a></li>
									<li><a href="${ctx }/financeGeneral/downloadCSV">导出CSV</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<table class="table table-striped table-hover table-bordered dataTable no-footer" id="init">
							<thead>
								<tr role="row">
									<th>报名日期</th>
									<th>补费日期</th>
									<th>报名表编号</th>
									<th>姓名</th>
									<th>项目</th>
									<th>级别</th>
									<th>应缴合计</th>
									<th>实缴合计</th>
									<th>待收合计</th>
									<th>待收学杂/培训费</th>
									<th>待收考试/考务费</th>
									<th>待收代管/教材费</th>
									<th>待收资料费</th>
									<th>待收辅导/服务费</th>
									<th>待收教材/协议费</th>
									<th>学员状态</th>
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

<!---查看--->
<div class="modal fade bs-example-modal-lg in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static" id="checkModal">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<span class="widget-caption">应收款查看</span>
				</div>
				<div class="modal-body  clearfix form-horizontal modal_padding">
					<table class="table table_border text-center">
						<tbody>
							<tr>
								<td>咨询分校：<span id="departmentName1"></span></td>
								<td>品牌：<span id="brandName"></span></td>
								<td>咨询者类型：<span id="studentAttrName2"></span></td>
								<td>媒体来源：<span id="studentAttrName1"></span></td>
								<td>客户成熟度：<span></span></td>
							</tr>
						</tbody>
					</table>
					<form method="" class="form-horizontal" style="padding:0 20px">
						<div class="col-lg-12 col-sm-12 col-xs-12">
							<div class="well with-header">
								<div class="header bordered-blue">
									<div style="float:left">
										<b>学员-个人信息</b>
									</div>
									<div style="float:right">
										<!--<a href="javascript:void(0);" class="btn btn-info btn-xs btn_special_edit"><i
                                           class="fa fa-edit"></i> 编辑</a>-->
										<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
									</div>
								</div>
								<div class="row form-group-margin gt_content">
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名：</label>
										<div class="col-sm-9 col-lg-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="studentName">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">性别：</label>
										<div class="col-sm-9">
											<select class="form-control comment_disabled" disabled="disabled" id="studentSex">
												<option value="1">男</option>
												<option value="0">女</option>
											</select>
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">年龄：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="age">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">手机：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="studentPhone">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">邮箱：</label>
										<div class="col-sm-9">
											<input type="email" class="form-control comment_disabled" disabled="disabled" id="email">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right no-padding-left">所在地：</label>
										<div class="col-sm-9">
											<!-- <select class="form-control comment_disabled" disabled="disabled">
												<option value="0">北京</option>
												<option value="1">天津</option>
												<option value="0">上海</option>
												<option value="1">山西</option>
											</select> -->
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="examRegion">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">微信：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="weChat">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">QQ：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="tengXun">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-41px">其他联系方式：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="ortherPhone">
										</div>
									</div>

									<div class="form-group col-lg-10 col-md-12 col-sm-12">
										<label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">通讯地址：</label>
										<div class="col-sm-9">
											<input class="form-control comment_disabled" type="text" disabled="disabled" id="phoneAddress">
										</div>
									</div>

									<div class="form-group col-lg-10 col-md-12 col-sm-12">
										<label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">工作单位：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="workSpace">
										</div>
									</div>
								</div>
							</div>

							<div class="well with-header">
								<div class="header bordered-blue">
									<div style="float:left">
										<b>课程信息</b>
									</div>
									<div style="float:right">
										<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
									</div>
								</div>
								<div class="row form-group-margin">
									<!-- <div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">类型：</label>
										<div class="col-sm-9">
											<select class="form-control comment_disabled" disabled="disabled">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>
												<option value="3">4</option>
											</select>
										</div>
									</div> -->

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">项目：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="projectName">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">级别：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="projectLevelName">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">考期：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="kTime">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">班型：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="classAttr">
										</div>
									</div>

									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-3 control-label no-padding-right">价格：</label>
										<div class="col-sm-9">
											<input type="text" class="form-control comment_disabled" disabled="disabled" id="classPrice">
										</div>
									</div>
								</div>
							</div>

							<div class="well with-header">
								<div class="header bordered-blue">
									<div style="float:left">
										<b>课程缴费信息</b>
									</div>
									<div style="float:right">
										<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
									</div>
								</div>
								<table class="table table-striped table-hover table-bordered dataTable no-footer text-center">
									<tbody>
										<tr>
											<th class="text-center">收费项目</th>
											<th class="text-center">应缴</th>
											<th class="text-center">实缴</th>
											<th class="text-center">支付方式</th>
											<th class="text-center">欠费</th>
										</tr>
										<tr id="pxtj">
											<td>培训费</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="xytj">
											<td>协议费</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="fwtj">
											<td>服务费(D)</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="jctj">
											<td>教材费(D)</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="zltj">
											<td>资料费(D)</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="kwtj">
											<td>考务费(D)</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="dztj">
											<td>订座费</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr id="hj">
											<td>合计</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
								</table>
								<div class="well">
									<span class="tips">备注:</span> 
								</div>
							</div>

							<div class="well with-header">
								<div class="header bordered-blue">
									<div style="float:left">
										<b>呼入-咨询记录</b>
									</div>
									<div style="float:right">
										<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
									</div>
								</div>
								<table class="table table-striped table-hover td_border dataTable no-footer">
									<tbody id="conversation">
										<!-- <tr>
											<td>呼入-咨询记录1</td>
										</tr>
										<tr>
											<td>呼入-咨询记录2</td>
										</tr>
										<tr>
											<td>呼入-咨询记录3</td>
										</tr> -->
									</tbody>
								</table>
							</div>
							<div class="well with-header">
								<div class="header bordered-blue">
									<div style="float:left">
										<b>咨询回访记录</b>
									</div>
									<div style="float:right">
										<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
									</div>
								</div>
								<table class="table table-striped table-hover td_border dataTable no-footer">
									<tbody id="recordContent">
										<!-- <tr>
											<td>回访记录1</td>
										</tr>
										<tr>
											<td>回访记录2</td>
										</tr>
										<tr>
											<td>回访记录3</td>
										</tr> -->
									</tbody>
								</table>
							</div>
						</div>

					</form>
					 <ul class="tab_content tab_net tab_content_11  right-toolbar">
	                    <li>
		                    <a href="javascript:void(0);">
		                         <img src="${ctx_static}/home/consultcenter/image/phone.png"><i></i>
		                         <div class="up"><p>拨打电话</p></div>
		                    </a>
	                    </li>
	                    <li>
		                    <a href="#" data-toggle="modal" data-target=".information" data-backdrop="static">
	                    		 <img src="${ctx_static}/home/consultcenter/image/note.png"><i></i>
		                         <div class="up"><p>发送短信</p></div>
		                    </a>
	                    </li>
               		</ul>
				</div>
			</div>
	    </div>
</div>
<!---查看end--->
<!-- 短信 -->
<div class="modal fade information" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static" id="shortMsgModal">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">短信</span>
            </div>
            <div class="modal-body clearfix form-horizontal">
                <form class="form-horizontal padding-top-20" id="MsgForm">
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">预约分校</label>
                        <div class="col-md-8 col-sm-8">
                            <select name="departmentId1" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">预约校区</label>
                        <div class="col-md-8 col-sm-8">
                            <select id="schoolIdModelMsg" name="schoolIdModelMsg" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">手机号码</label>
                        <div class="col-md-8 col-sm-8">
                            <input id="studentPhoneMsg" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">短信类别</label>
                        <div class="col-md-8 col-sm-8">
                            <select  id="msgContent" name="" class="form-control">
                            	<option value="">-请选择-</option>
                                <option value="您好！我是学慧网的${user.realName }老师，今天对您咨询的class方面的课程进行了电话回复，但由于您没有接听到电话，很抱歉未能及时给您提供帮助与解答，我的联系电话是${user.mobile }，您方便的话可以随时联系我，或者根据给您发送的分校路径信息直接到校区咨询，以方便您及时了解相关报考和学习信息，学习像呼吸一样自然！">跟访</option>
                                <option value="学员您好，我是之前和您联系的${user.realName }老师，如果您对我们的class课程任何疑问，可以到我们校区address或随时拨打我的联系方式：${user.mobile }。">指路</option>
                                <option value="studentName您好，我是昨天给您联系的${user.realName }老师，我给您预约的recriveTime到们校区具体了解，您到时记得过来，如果找不着的话给我打电话就可以，到时候我给您指路，最后祝您工作生活愉快。">联系</option>
                                <option value="studentName您好，我是刚和您联系的${user.realName }老师，我们的校区地址：address。帮您预约的是recriveTime来分校，我们安排了相关的校区老师接待您，请您注意时间安排。如有变动，请提前联系我${user.mobile }。 ">联系</option>
                                <option value="学员您好，我是之前和您联系的${user.realName }老师，如果您对我们的class课程有任何疑问，可以到我们校区address，或随时拨打我的联系方式：${user.mobile }。加：QQ：${user.qq }，微信：${user.wechat }与我沟通productName">沟通</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">短信内容</label>
                        <div class="col-md-9 col-sm-9 no-padding-right padding-left-10">
                            <textarea id="showPhoneMsg" rows="6" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" type="button" class="btn btn-primary form-control">确定</button>
                        </div>
                         <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<script src="${ctx_static }/home/financeCenter/js/yingshou.js"></script>

