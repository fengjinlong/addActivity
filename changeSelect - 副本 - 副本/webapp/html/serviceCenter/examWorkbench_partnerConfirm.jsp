<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/dep/fileinput/css/fileinput.css" media="all" rel="stylesheet" />
<link href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" media="all" rel="stylesheet"/>
<link href="${ctx_static }/home/serviceCenter/css/examWorkbench.css" rel="stylesheet"/>

<!--合作方确认-->
<div id="partnerConfirm" class="tab-pane clearfix in active">
	<div class="col-sm-3 drop-down animated bounceInLeft no-padding-left">
		<ul class="nav sidebar-menu partnerList">
			<li ave=3>
			<a href="#" class="menu-dropdown" data-type="1"> 
					<span class="menu-text">职业资格【<span class="total-1">0</span>人】</span> <i class="fa pull-right"></i>
			</a>
				<ul class="submenu zhiye">
				</ul>
			</li>
			<li ave=3>	
				<a href="#" class="menu-dropdown" data-type="2"> 
					<span class="menu-text">学历 【<span class="total-2">0</span>人】</span> <i class="fa pull-right"></i>
				</a>
				<ul class="submenu xueli">
				</ul>
			</li>
		</ul>
	</div>
	<div class="col-sm-9 partnerInfo no-padding animated bounceInRight">
		<div class="search-box form-horizontal clearfix">
			<div class="col-sm-12 no-padding">
				<label class="control-label pull-left">日期</label>
				<div class="col-sm-4 form-group">
					<div class="input-group date col-sm-12">
						<input type="text" class="form-control  reservation"
							placeholder="请选择日期"> <span class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</span>
					</div>
				</div>
				<div class="col-sm-4 no-padding-right form-group" style="width:29%">
					<input type="text" class="form-control" placeholder="分校/姓名/课程/级别/电话">
				</div>
				<div class="col-sm-2">
					<button type="button" class="btn increase search-btn">
						<i class="fa fa-search"></i>搜索
					</button>
				</div>
				<div class="btn-group pull-right">
					<span class="btn btn-default pointer print" title="打印">打印</span>
					<div class="btn-group">
						<button type="button" class="btn btn-default dropdown-toggle"
						data-toggle="dropdown">
						导出 <i class="fa fa-angle-up"></i>
						</button>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">保存PDF</a></li>
							<li><a href="#">导出EXCEL</a></li>
							<li><a href="#">导出CSV</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div class="col-sm-12 no-padding conditions">
				<div class="pull-right">
					<div class="pull-left form-group">
					 <c:if test="${sessionScope.partnerConfirmGoback  eq '1' }">
						<button title="退回待报考" class="btn btn-lightBlue goback">退回待报考</button></c:if>
					</div>
					<div class="pull-left form-group">
					 <c:if test="${sessionScope.partnerConfirmThan  eq '1' }">
						<button class="btn btn-lightBlue" title="合作方返回结果比对" data-toggle="modal" data-backdrop="static"
						data-target=".partnerThan">合作方返回结果比对
						</button></c:if>
					</div>
					<div class="pull-left form-group">
					<c:if test="${sessionScope.partnerConfirmIsEnable  eq '1' }">
						<button class="btn btn-lightBlue isEnable" title="确认信息" >确认信息</button></c:if>
					</div>
				</div>
			</div>
		</div>

		<div class="dataTables_wrapper form-inline no-footer">
			<div class="table-scrollable">
				<table
					class="table table-striped table-hover table-bordered dataTable no-footer"
					id="partnerVerify">
					
					<!-- 项目类型 -->
					<input type="hidden" name="projectType"/>
					<!-- 考期 -->
					<input type="hidden" name="ktime"/>
					<!-- 项目 -->
					<input type="hidden" name="projectId"/>
					<!-- 合作方 -->
					<input type="hidden" name="partnerId"/>
					<thead>
						<tr role="row">
							<th width="5%">
								<label> <input type="checkbox">
									<span class="text"></span>
								</label>
							</th>
							<th>报名日期 
							</th>
							<th>所属批号 
							</th>
							<th>是否被录取 
							</th>
							<th>姓名 
							</th>
							<th>身份证号码 
							</th>
							<th>籍贯 
							</th>
							<th>分校 
							</th>
							<th>考期 
							</th>
							<th>项目 
							</th>
							<th>级别 
							</th>
							<th>操作</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td width="5%"><label> <input type="checkbox">
									<span class="text"></span>
							</label></td>
							<td>2015/12/30 18:03:00</td>
							<td>1112212121212121</td>
							<td>是</td>
							<td>张三</td>
							<td>1320000000000000</td>
							<td>北京市</td>
							<td>01北京</td>
							<td>2016年4月</td>
							<td>01人力资源管理师</td>
							<td>三级</td>
							<td><a href="#" data-toggle="modal" data-backdrop="static"
								data-target=".partnerView"> <i class="fa fa-search warning"
									data-toggle="tooltip" data-placement="top"
									data-original-title="查看"></i>
							</a> <a href="#" data-toggle="modal" data-target=".partnerView"
								data-backdrop="static"> <i class="fa fa-phone success"
									data-toggle="tooltip" data-placement="top"
									data-original-title="电话"></i>
							</a> <a href="#" data-toggle="modal" data-target=".information"
								data-backdrop="static"> <i class="fa fa-envelope-o blue"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="发送信息"></i>
							</a> <a href="#" data-toggle="modal" data-target=""
								data-backdrop="static"> <i class="fa fa-download darkorange"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="下载"></i>
							</a></td>
						</tr>
						<tr>
							<td width="5%"><label> <input type="checkbox">
									<span class="text"></span>
							</label></td>
							<td>2015/12/30 18:03:00</td>
							<td>1112212121212121</td>
							<td>是</td>
							<td>张三</td>
							<td>1320000000000000</td>
							<td>北京市</td>
							<td>01北京</td>
							<td>2016年4月</td>
							<td>01人力资源管理师</td>
							<td>三级</td>
							<td><a href="#" data-toggle="modal" data-backdrop="static"
								data-target=".partnerView"> <i class="fa fa-search warning"
									data-toggle="tooltip" data-placement="top"
									data-original-title="查看"></i>
							</a> <a href="#" data-toggle="modal" data-target=".partnerView"
								data-backdrop="static"> <i class="fa fa-phone success"
									data-toggle="tooltip" data-placement="top"
									data-original-title="电话"></i>
							</a> <a href="#" data-toggle="modal" data-target=".information"
								data-backdrop="static"> <i class="fa fa-envelope-o blue"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="发送信息"></i>
							</a> <a href="#" data-toggle="modal" data-target=""
								data-backdrop="static"> <i class="fa fa-download darkorange"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="下载"></i>
							</a></td>
						</tr>
						<tr>
							<td width="5%"><label> <input type="checkbox">
									<span class="text"></span>
							</label></td>
							<td>2015/12/30 18:03:00</td>
							<td>1112212121212121</td>
							<td>是</td>
							<td>张三</td>
							<td>1320000000000000</td>
							<td>北京市</td>
							<td>01北京</td>
							<td>2016年4月</td>
							<td>01人力资源管理师</td>
							<td>三级</td>
							<td><a href="#" data-toggle="modal" data-backdrop="static"
								data-target=".partnerView"> <i class="fa fa-search warning"
									data-toggle="tooltip" data-placement="top"
									data-original-title="查看"></i>
							</a> <a href="#" data-toggle="modal" data-target=".partnerView"
								data-backdrop="static"> <i class="fa fa-phone success"
									data-toggle="tooltip" data-placement="top"
									data-original-title="电话"></i>
							</a> <a href="#" data-toggle="modal" data-target=".information"
								data-backdrop="static"> <i class="fa fa-envelope-o blue"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="发送信息"></i>
							</a> <a href="#" data-toggle="modal" data-target=""
								data-backdrop="static"> <i class="fa fa-download darkorange"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="下载"></i>
							</a></td>
						</tr>
						<tr>
							<td width="5%"><label> <input type="checkbox">
									<span class="text"></span>
							</label></td>
							<td>2015/12/30 18:03:00</td>
							<td>1112212121212121</td>
							<td>是</td>
							<td>张三</td>
							<td>1320000000000000</td>
							<td>北京市</td>
							<td>01北京</td>
							<td>2016年4月</td>
							<td>01人力资源管理师</td>
							<td>三级</td>
							<td><a href="#" data-toggle="modal" data-backdrop="static"
								data-target=".partnerView"> <i class="fa fa-search warning"
									data-toggle="tooltip" data-placement="top"
									data-original-title="查看"></i>
							</a> <a href="#" data-toggle="modal" data-target=".partnerView"
								data-backdrop="static"> <i class="fa fa-phone success"
									data-toggle="tooltip" data-placement="top"
									data-original-title="电话"></i>
							</a> <a href="#" data-toggle="modal" data-target=".information"
								data-backdrop="static"> <i class="fa fa-envelope-o blue"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="发送信息"></i>
							</a> <a href="#" data-toggle="modal" data-target=""
								data-backdrop="static"> <i class="fa fa-download darkorange"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="下载"></i>
							</a></td>
						</tr>
						<tr>
							<td width="5%"><label> <input type="checkbox">
									<span class="text"></span>
							</label></td>
							<td>2015/12/30 18:03:00</td>
							<td>1112212121212121</td>
							<td>是</td>
							<td>张三</td>
							<td>1320000000000000</td>
							<td>北京市</td>
							<td>01北京</td>
							<td>2016年4月</td>
							<td>01人力资源管理师</td>
							<td>三级</td>
							<td><a href="#" data-toggle="modal" data-backdrop="static"
								data-target=".partnerView"> <i class="fa fa-search warning"
									data-toggle="tooltip" data-placement="top"
									data-original-title="查看"></i>
							</a> <a href="#" data-toggle="modal" data-target=".partnerView"
								data-backdrop="static"> <i class="fa fa-phone success"
									data-toggle="tooltip" data-placement="top"
									data-original-title="电话"></i>
							</a> <a href="#" data-toggle="modal" data-target=".information"
								data-backdrop="static"> <i class="fa fa-envelope-o blue"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="发送信息"></i>
							</a> <a href="#" data-toggle="modal" data-target=""
								data-backdrop="static"> <i class="fa fa-download darkorange"
									data-toggle="tooltip" data-placement="top" title=""
									data-original-title="下载"></i>
							</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!--合作方确认查看/电话-->
<div class="modal fade in partnerView" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">待报考</span>
            </div>
            <div class="modal-body clearfix">
                <table class="table table_border text-center headInfo">
                    <tr>
                        <td>咨询分校：<span>北京分校</span></td>
                        <td>品牌：<span>智联</span></td>
                        <td>咨询者类型：<span>在线接待</span></td>
                        <td>媒体类源：<span>百度搜索推广</span></td>
                        <td>客户成熟度：<span>A-高</span></td>
                    </tr>
                </table>
                <form method="" class="form-horizontal padding-top-20">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class='pull-left'>
                                    <b>学员-个人信息</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin  personInfo">
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名：</label>
                                    <div class="col-sm-9 col-lg-9">
                                        <input type="text" class="form-control comment_disabled studentName" value="刘晋"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">性别：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled stuSex" disabled="disabled">
                                            <option value="0">男</option>
                                            <option value="1">女</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">年龄：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuAge" value="24"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">手机：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuPhone"
                                               value="18510434670Z"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">邮箱：</label>
                                    <div class="col-sm-9">
                                        <input type="email" class="form-control comment_disabled stuEmail"
                                               value="liujin@126.com"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">所在地：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled stuLocaiton" disabled="disabled">
                                            <option value="0">北京</option>
                                            <option value="1">天津</option>
                                            <option value="0">上海</option>
                                            <option value="1">山西</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">微信：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuWeChat"
                                               value="18510434670"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">QQ：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuQQ" value="123943039"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left"
                                           style="margin-left:-41px">其他联系方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuOtherPhone"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name=""
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuCardType"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件号码：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name=""
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuCard"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">报名方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name=""
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuBMType"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">民族：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="nation"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuNation"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">毕业院校：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="bySchool"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuBySchool"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left"
                                           style="margin-left:-21px">最高学历：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="studentAttrName3"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuStudentAttrName32"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">所学专业：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="byZy"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stubByZy"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">紧急联系人：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContact"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuEmergencyContact"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">联系方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContactMode"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuEmergencyContactMode"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-12 col-sm-12">
                                    <label style="margin-left: -48px !important;"
                                           class="col-sm-2 control-label no-padding-right">通讯地址：</label>
                                    <div class="col-sm-9">
                                        <input class="form-control comment_disabled stuPhoneAddress"
                                               value="北京市朝阳区富华弘燕大厦" type="text"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-12 col-sm-12">
                                    <label style="margin-left: -48px !important;"
                                           class="col-sm-2 control-label no-padding-right">工作地址：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuWorkSpace"
                                               value="中和教育"
                                               disabled="disabled">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class='pull-left'>
                                    <b>课程信息</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin" id="courseInfo">
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">类型：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled courseType" disabled="disabled">
                                            <option value="0">1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">项目：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled projectName" disabled="disabled">
                                            <option value="0">1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">级别：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled projectLevelNname"
                                                disabled="disabled">
                                            <option value="0">一级</option>
                                            <option value="1">二级</option>
                                            <option value="2">三级</option>
                                            <option value="3">四级</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="xueliDiv">
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right"
                                               style="margin-left:-21px;">教育形式：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" value="成考"
                                                   disabled="disabled" name="eduFrom">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right"
                                               style="margin-left:-21px;">院校名称：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" value="北京大学"
                                                   disabled="disabled" name="schoolFrom">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right"
                                               style="margin-left:-21px;">专业名称：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" value="土木工程"
                                                   disabled="disabled" name="prFrom">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">考期：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled kTime" disabled="disabled">
                                            <option value="0">一期</option>
                                            <option value="1">一期</option>
                                            <option value="2">一期</option>
                                            <option value="3">一期</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">班型：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled classAttr" disabled="disabled">
                                            <option value="0">VIP班级</option>
                                            <option value="1">VIP班级</option>
                                            <option value="2">VIP班级</option>
                                            <option value="3">VIP班级</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">价格：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled coursePrice"
                                               value="1000"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right" style="margin-left:-21px">报考院校：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled bkyx" value="天津大学"
                                               disabled="disabled">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class='pull-left'>
                                    <b>课程缴费信息</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="coursePayInfo">
                                <table class="table table-striped table-hover table-bordered dataTable no-footer text-center">
                                    <thead>
                                    <tr>
                                        <th class="text-center">收费项目</th>
                                        <th class="text-center">应缴</th>
                                        <th class="text-center">实缴</th>
                                        <th class="text-center">支付方式</th>
                                        <th class="text-center">欠费</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>培训费</td>
                                        <td>1930</td>
                                        <td>1</td>
                                        <td><span>现金：<span>1<br></span></span></td>
                                        <td>1929</td>
                                    </tr>
                                    <tr>
                                        <td>考务费</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td></td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>资料费</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td></td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>协议费</td>
                                        <td>3400</td>
                                        <td>0</td>
                                        <td></td>
                                        <td>3400</td>
                                    </tr>
                                    <tr>
                                        <td>教材费</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td></td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>服务费</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td></td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>总计</td>
                                        <td>5330</td>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>优惠券</td>
                                        <td>0</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>折扣</td>
                                        <td>0</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>合计</td>
                                        <td>5330</td>
                                        <td>1</td>
                                        <td></td>
                                        <td>5329</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="well">
                                    <span class="tips">备注:</span> <span>2016-11-07考务费于2017-2-14补交</span>
                                </div>
                            </div>
                        </div>

                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class='pull-left'>
                                    <b>呼入-咨询记录</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <table class="table table-striped table-hover td_border dataTable no-footer"
                                   class="callInfo2">
                                <tbody>
                                <tr>
                                    <td>呼入-咨询记录1</td>
                                </tr>
                                <tr>
                                    <td>呼入-咨询记录2</td>
                                </tr>
                                <tr>
                                    <td>呼入-咨询记录3</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class='pull-left'>
                                    <b>咨询-回访记录</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <table class="table table-striped table-hover td_border dataTable no-footer"
                                   id="callBackInfo">
                                <tbody>
                                <tr>
                                    <td>2017-01-13 18:14:54:董希阳:啊但是发放</td>
                                </tr>
                                <tr>
                                    <td>2017-01-13 18:14:55:董希阳:啊但是发放</td>
                                </tr>
                                <tr>
                                    <td>2017-01-13 18:14:56:董希阳:啊但是发放</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </form>
                <ul class="right-toolbar tab_content tab_net tab_content_11">
                    <li>
                        <a href="#">
                            <img src="${ctx_static }/home/consultcenter/image/phone.png"><i></i>
                            <div class="up">
                                <p>拨打电话</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" data-backdrop="static" data-toggle="modal" data-target=".information">
                            <img src="${ctx_static }/home/consultcenter/image/note.png"><i></i>
                            <div class="up">
                                <p>发送短信</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="${ctx_static }/home/consultcenter/image/send-mail.png"><i></i>
                            <div class="up">
                                <p>发送邮件</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!--发送短信-->
<div class="modal fade information in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">短信</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal padding-top-20">
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">预约校区</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="" class="form-control" id="schoolIdModelMsg">
                                <option value="0">--请选择--</option>
                                <option value="">天津南开校区</option>
                                <option value="">天津综合管理中心</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">手机号码</label>
                        <div class="col-md-8 col-sm-8 padding-left-20 no-padding-right">
                            <input id="studentPhoneMsg" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="control-label no-padding-right col-md-4" style="margin-left: -30px;">短信类别</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select id="msgType" name="" class="form-control">
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
                            <textarea id="showMsg" rows="6" class="form-control"></textarea>
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
 

<!--合作方申请支出-->
<div class="modal fade in partnerExpend" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">申请支出</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="partnerExpend">
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-2 no-padding-right">申请人</label>
                        <div class="col-sm-8">
                            <input id="applyUserId" value="${user.realName }" type="text" class="form-control" disabled="">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-2 no-padding-right">申请时间</label>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input class="form-control form_datetime" type="text">
                                    <span class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">金额</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                                <input id="partnerMoney" type="text" class="form-control" disabled="" name="money">
                            </div>
                            <div class="col-sm-4">
                                <select name="paymentFrom" class="form-control" disabled="">
                                    <option value="1">集团支付</option>
                                    <option value="2">分校支付</option>
                                </select>
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <select name="payment" class="form-control" disabled="">
                                    <option value="1">现金</option>
                                    <option value="2">汇款</option>
                                    <option value="3">支票</option>
                                    <option value="4">pos</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">支出明细</label>
                        <div class="col-sm-10 padding-left-10">
                            <input type="text" class="form-control" disabled="">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">发票抬头</label>
                        <div class="col-sm-10 padding-left-10">
                            <input id="invoiceTitle" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-2 no-padding-right">部门</label>
                        <div class="col-sm-8">
                            <input id="userBMId" value="${user.deptName }" type="text" class="form-control costClasses" disabled="">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-2 no-padding-right">项目</label>
                        <div class="col-sm-8">
                            <input  type="text" class="form-control costClasses" disabled="">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">类别</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left ">
                                <input type="text" value="教学费用" class="form-control costClasses" disabled="">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" value="合作费/报考费" class="form-control categoriesCost" disabled="">
                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <input type="text" class="form-control categoriesCost" disabled="">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">收款人</label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-3 no-padding-left ">
                                 <input id="contact" type="text" class="form-control categoriesCost" disabled="">
                            </div>
                            <div class="col-sm-3">
                                <input id="bankCard" type="text" class="form-control categoriesCost" disabled="">
                            </div>
                            <div class="distpicker">
                                <div class="col-sm-3 no-padding-right">
                                    <select class="form-control" id="province" data-province="--开户行所在省--">
                                        <option value="" data-code="">--开户行所在省--</option>
                                        <option value="北京市" data-code="110000" selected="">北京市</option>
                                        <option value="天津市" data-code="120000">天津市</option>
                                        <option value="河北省" data-code="130000">河北省</option>
                                        <option value="山西省" data-code="140000">山西省</option>
                                        <option value="内蒙古自治区" data-code="150000">内蒙古自治区</option>
                                        <option value="辽宁省" data-code="210000">辽宁省</option>
                                        <option value="吉林省" data-code="220000">吉林省</option>
                                        <option value="黑龙江省" data-code="230000">黑龙江省</option>
                                        <option value="上海市" data-code="310000">上海市</option>
                                        <option value="江苏省" data-code="320000">江苏省</option>
                                        <option value="浙江省" data-code="330000">浙江省</option>
                                        <option value="安徽省" data-code="340000">安徽省</option>
                                        <option value="福建省" data-code="350000">福建省</option>
                                        <option value="江西省" data-code="360000">江西省</option>
                                        <option value="山东省" data-code="370000">山东省</option>
                                        <option value="河南省" data-code="410000">河南省</option>
                                        <option value="湖北省" data-code="420000">湖北省</option>
                                        <option value="湖南省" data-code="430000">湖南省</option>
                                        <option value="广东省" data-code="440000">广东省</option>
                                        <option value="广西壮族自治区" data-code="450000">广西壮族自治区</option>
                                        <option value="海南省" data-code="460000">海南省</option>
                                        <option value="重庆市" data-code="500000">重庆市</option>
                                        <option value="四川省" data-code="510000">四川省</option>
                                        <option value="贵州省" data-code="520000">贵州省</option>
                                        <option value="云南省" data-code="530000">云南省</option>
                                        <option value="西藏自治区" data-code="540000">西藏自治区</option>
                                        <option value="陕西省" data-code="610000">陕西省</option>
                                        <option value="甘肃省" data-code="620000">甘肃省</option>
                                        <option value="青海省" data-code="630000">青海省</option>
                                        <option value="宁夏回族自治区" data-code="640000">宁夏回族自治区</option>
                                        <option value="新疆维吾尔自治区" data-code="650000">新疆维吾尔自治区</option>
                                        <option value="台湾省" data-code="710000">台湾省</option>
                                        <option value="香港特别行政区" data-code="810000">香港特别行政区</option>
                                        <option value="澳门特别行政区" data-code="820000">澳门特别行政区</option>
                                    </select>
                                </div>
                                <div class="col-sm-3 no-padding-right">
                                    <select class="form-control" id="city" data-city="--开户行所在市--">
                                        <option value="" data-code="">--开户行所在市--</option>
                                        <option value="北京市市辖区" data-code="110100" selected="">北京市市辖区</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right"></label>
                        <div class="col-sm-10 padding-left-10">
                            <div class="col-sm-4 no-padding-left">
                                <input id="contactUser" type="text" class="form-control" placeholder="开户人">
                            </div>
                            <div class="col-sm-4">
                                <input id="contactAccount" type="text" class="form-control" placeholder="账号">

                            </div>
                            <div class="col-sm-4 no-padding-right">
                                <input id="contactPhone"  type="text" class="form-control" placeholder="电话">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-2 no-padding-right">调账</label>
                        <div class="col-sm-8">
                            <select name="" class="form-control">
                                <option value="0">是</option>
                                <option value="1">否</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label class="control-label col-sm-2 no-padding-right">申请地区</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" disabled="">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">申请说明</label>
                        <div class="col-sm-10 padding-left-10">
                            <textarea name="" class="form-control apply-info" id="apply-explain"
                                      style="width: 673px; height: 340px"></textarea>
                        </div>
                    </div>

                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button id="addApply" type="button" class="btn btn-primary form-control">申请支出</button>
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

<!--合作方返回结果比对-->
<div class="modal fade in partnerThan" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">合作方返回结果比对</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="partnerThan" enctype="multipart/form-data">
                    <div class="form-group col-md-12 col-sm-12 Bulkimport">
                        <label class="control-label">批量导入<a href="${ctx }/成绩管理模板.xlsx"">（模板下载）:</a></label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12">
                        <label class="control-label">
                            <div class="col-md-12">
                                <input id="partner-upload" name="file" type="file" multiple>
                            </div>
                        </label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12">
                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="imports">
                            <thead>
                            <tr role="row" class="text-center">
                                <th>学员姓名</th>
                                <th>身份证号</th>
                                <th>教育形式</th>
                                <th>院校</th>
                                <th>级别</th>
                                <th>专业</th>
                                <th>状态</th>
                            </tr>
                            </thead>

                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control creation-btn partnerThanButton" data-toggle="modal"
                                    data-backdrop="static">确定
                            </button>
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

<!--省市联动-->
<script src="${ctx_static }/dep/distpicker/distpicker.data.js"></script>
<script src="${ctx_static }/dep/distpicker/distpicker.js"></script>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

<!--上传文件插件-->
<script src="${ctx_static }/dep/fileinput/js/fileinput.js"></script>
<script src="${ctx_static }/dep/fileinput/js/locales/zh.js"></script>

<script type="text/javascript">
//申请说明
$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
	KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
	editor1 = KindEditor.create('#apply-explain',{
		uploadJson:'${ctx }/file/uploadFile',
		resizeType: 0
	});
}); 
</script>
<script src="${ctx_static }/home/serviceCenter/js/examWorkbench_partnerConfirm.js"></script>

