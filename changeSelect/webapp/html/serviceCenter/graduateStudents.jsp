<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/serviceCenter/css/graduateStudents.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">毕业学员</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-5 col-sm-6 col-xs-12">
							<div class="form-group col-md-9 col-sm-4 no-margin-right">
								<input onkeydown="search();" class="form-control" placeholder="分校/姓名/级别" type="text" id="searchVal">
							</div>
							<div class="form-group col-md-3 col-sm-4"> 
								<a type="button"  class="btn increase form-control search-btn" href="javascript:DataTable.init();">
								 <i class="fa fa-search"></i>	搜索
								</a>
							</div>
						</div>
						<div class="col-md-5 col-sm-5 col-xs-12 btn-group graduation-btn pull-right">
							<div class="pull-right">
							   <c:if test="${sessionScope.graduationStudent eq '1' }">
								<button class="btn btn-lightBlue" data-toggle="modal" data-backdrop="static" onclick="xueyuan()">学员领取毕业证</button></c:if>
							</div>
							
							<div class="pull-right margin-left-10 margin-right-10">
							   <c:if test="${sessionScope.graduationSend eq '1' }">
								<button class="btn btn-lightBlue send-btn" data-toggle="modal" data-backdrop="static">集团寄出毕业证</button></c:if>
							</div>
							
							<div class="pull-right">
						       <c:if test="${sessionScope.graduationGet eq '1' }">
								<button class="btn btn-lightBlue get-btn" data-toggle="modal" data-backdrop="static">集团领取毕业证
								</button></c:if>
							</div>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<div class="table-scrollable" id="dataTables_wrapper">
							<table class="table table-striped table-hover table-bordered dataTable no-footer" id="graduateStudents">
								<thead>
									<tr role="row" class="text-center">
										<th>
											<label> <input type="checkbox" class="checkAll"> <span class="text"></span></label>
										</th>
										<th>报名日期</th>
										<th>状态</th>
										<!-- <th>所属批号</th> -->
										<th>毕业证领取状态</th>
										<th>姓名</th>
										<th>性别</th>
										<th>身份证号码</th>
										<th>分校</th>
										<th>考期</th>
										<th>集团领取快递单号</th>
										<th>集团寄出快递单号</th>
										<th>级别</th>
										<th>学校</th>
										<th>专业</th>
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
<%@ include file="../common/public_footer.jsp"%>
	
<!--集团领取毕业证-->
<div class="modal fade getDiploma" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue bordered-bottom-2">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">集团领取毕业证</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="getDiploma">
					<div class="form-group col-md-12">
						<label class="control-label col-md-3 no-padding-right">请输入快递单号：</label>
						<div class="col-md-7">
							<input type="text" class="form-control" name="receiveNo">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">确定</button>
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

<!--集团寄出毕业证-->
<div class="modal fade sendDiploma" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">集团寄出毕业证</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="sendDiploma">
					<div class="form-group col-md-12">
						<label class="control-label col-md-3 no-padding-right">请输入快递单号：</label>
						<div class="col-md-7">
							<input type="text" class="form-control" name="sendNo">
						</div>
					</div>
					<div class="form-group col-sm-12">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">确定</button>
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


<!--查看/呼出-->
<div class="modal fade in graduateStudents" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">毕业学员</span>
            </div>
            <div class="modal-body  clearfix form-horizontal modal_padding">
                <table class="table table_border text-center headInfo" id="headInfo">
                    <tr>
                        <td>咨询分校：<span>北京分校</span></td>
                        <td>品牌：<span>智联</span></td>
                        <td>咨询者类型：<span>在线接待</span></td>
                        <td>媒体类源：<span>百度搜索推广</span></td>
                        <td>客户成熟度：<span>A-高</span></td>
                    </tr>
                </table>
                <form method="" class="form-horizontal" style="padding:0 20px" id="graduateStudents">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="well with-header">
                            <div class="header bordered-blue">
                                <div class="pull-left">
                                    <b>学员-个人信息</b>
                                </div>
                                <div class='pull-right'>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin gt_content personInfo">
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名：</label>
                                    <div class="col-sm-9 col-lg-9">
                                        <input type="text" class="form-control comment_disabled studentName" name="studentName" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">性别：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled stuSex" name="studentSex" disabled="disabled">
                                            <option value="1">男</option>
                                            <option value="0">女</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">年龄：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuAge" name="age" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">手机：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuPhone" name="studentPhone" disabled="disabled" id="studentPhone">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">邮箱：</label>
                                    <div class="col-sm-9">
                                        <input type="email" class="form-control comment_disabled stuEmail" name="email" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">所在地：</label>
                                    <div class="col-sm-9">
                                        <input class="form-control comment_disabled stuLocaiton" disabled="disabled" name="departmentName3"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">微信：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuWeChat" name="weChat" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">QQ：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuQQ" name="tengXun" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-41px">其他联系方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuOtherPhone" disabled="disabled" name="ortherphone">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="idcardType" class="form-control comment_disabled padding-right-5 padding-left-10 stuCardType" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件号码：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="idcard" class="form-control comment_disabled padding-right-5 padding-left-10 stuCard" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">报名方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="infoType" class="form-control comment_disabled padding-right-5 padding-left-10 stuBMType" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">民族：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="nation" class="form-control comment_disabled padding-right-5 padding-left-10 stuNation" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">毕业院校：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="bySchool" class="form-control comment_disabled padding-right-5 padding-left-10 stuBySchool" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left" style="margin-left:-21px">最高学历：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="highestEducation" class="form-control comment_disabled padding-right-5 padding-left-10 stuStudentAttrName32" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">所学专业：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="byZy" class="form-control comment_disabled padding-right-5 padding-left-10 stubByZy" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">紧急联系人：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContact" class="form-control comment_disabled padding-right-5 padding-left-10 stuEmergencyContact" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">联系方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContactMode" class="form-control comment_disabled padding-right-5 padding-left-10 stuEmergencyContactMode" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-12 col-sm-12">
                                    <label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">通讯地址：</label>
                                    <div class="col-sm-9">
                                        <input class="form-control comment_disabled stuPhoneAddress" name="phoneaddress" type="text" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-12 col-sm-12">
                                    <label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">工作地址：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuWorkSpace" name="workspace" disabled="disabled">
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
                            <div class="row form-group-margin courseInfo">
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">类型：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control comment_disabled courseType" disabled="disabled">
                                            <option value="0">学历</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">项目：</label>
                                    <div class="col-sm-9">
                                        <input class="form-control comment_disabled projectName" disabled="disabled" name="projectName">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">级别：</label>
                                    <div class="col-sm-9">
                                        <input class="form-control comment_disabled projectLevelNname" disabled="disabled" name="projectLevelName">
                                    </div>
                                </div>

                                <div class="xueliDiv">
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right" style="margin-left:-21px;">教育形式：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" disabled="disabled" name="eduFrom">
                                            </input>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right" style="margin-left:-21px;">院校名称：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" disabled="disabled" name="bySchool">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right" style="margin-left:-21px;">专业名称：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" disabled="disabled" name="byZy">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">考期：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled kTime" disabled="disabled" name="ktimeValue">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">班型：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled classAttr" disabled="disabled" name="classattr">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">价格：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled coursePrice" name="classprice" disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right" style="margin-left:-21px">报考院校：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled bkyx" name="schoolFrom" disabled="disabled">
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
                            <div class="coursePayInfo">
                                <table class="table table-striped table-hover table-bordered dataTable no-footer text-center" id="coursePayInfo">
                                    <tbody id="tbodyInfo">
                                    </tbody>
                                </table>
                                <!-- <div class="well">
                                    <span class="tips">备注:</span> <span>2016-11-07考务费于2017-2-14补交</span>
                                </div> -->
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
                            <table class="table table-striped table-hover td_border dataTable no-footer" class="callInfo2">
                                <tbody id="callInfo22">
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
                                    <b>咨询-回访记录</b>
                                </div>
                                <div style="float:right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <table class="table table-striped table-hover td_border dataTable no-footer callBackInfo">
                                <tbody id = 'callBackInfo22'>
                                <!-- <tr>
                                    <td>2017-01-13 18:14:54:董希阳:啊但是发放</td>
                                </tr>
                                <tr>
                                    <td>2017-01-13 18:14:55:董希阳:啊但是发放</td>
                                </tr>
                                <tr>
                                    <td>2017-01-13 18:14:56:董希阳:啊但是发放</td>
                                </tr> -->
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
                                <p onclick="copyPhone()">拨打电话</p>
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
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">短信</span>
            </div>
            <div class="modal-body  form-horizontal clearfix">
                <form class="form-horizontal padding-top-20" id="duanxin">
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">预约校区</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="schoolIdModelMsg" class="form-control" id="schoolIdModelMsg">
                                <!-- <option value="0">--请选择--</option>
                                <option value="">天津南开校区</option>
                                <option value="">天津综合管理中心</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">手机号码</label>
                        <div class="col-md-8 col-sm-8 padding-left-20 no-padding-right">
                            <input id="studentPhoneMsg" type="text" class="form-control" name="studentPhoneMsg">
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="control-label no-padding-right col-md-4" style="margin-left: -30px;">短信类别</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select  id="msgType" name="" class="form-control">
                                <option value="">--请选择--</option>
                                <option value="您好！我是学慧网的admin老师，今天对您咨询的class方面的课程进行了电话回复，但由于您没有接听到电话，很抱歉未能及时给您提供帮助与解答，我的联系电话是13501194362，您方便的话可以随时联系我，或者根据给您发送的分校路径信息直接到校区咨询，以方便您及时了解相关报考和学习信息，学习像呼吸一样自然！">跟访</option>
                                <option value="学员您好，我是之前和您联系的admin老师，如果您对我们的class课程任何疑问，可以到我们校区address或随时拨打我的联系方式：13501194362。">指路</option>
                                <option value="您好，我是昨天给您联系的admin老师，我给您预约的recriveTime到们校区具体了解，您到时记得过来，如果找不着的话给我打电话就可以，到时候我给您指路，最后祝您工作生活愉快。">联系</option>
                                <option value="您好，我是刚和您联系的admin老师，我们的校区地址：address。帮您预约的是recriveTime来分校，我们安排了相关的校区老师接待您，请您注意时间安排。如有变动，请提前联系我13501194362。 ">联系</option>
                                <option value="学员您好，我是之前和您联系的admin老师，如果您对我们的class课程有任何疑问，可以到我们校区address，或随时拨打我的联系方式：13501194362。加：QQ：，微信：与我沟通productName">沟通</option>
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

<script>
	var DataTable = function(){
		return {
			init: function () {
				var dutyTable = $('#graduateStudents').dataTable({
					"bPaginate": true,  //是否显示分页
	            	"bLengthChange": true,//每页显示的记录数
	            	"bFilter": false, //搜索栏
	            	"bSort": true, //是否支持排序功能
	            	"bInfo": true, //显示表格信息
	            	"bAutoWidth": false,  //自适应宽度
	            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
	            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
	            	"sAjaxSource" : ctx+'/graduateStudents/load', 
	        		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
	            	"bServerSide": true,
	            	"bDestroy": true,
	                "bRetrieve": false,
	                "oLanguage" : {
	                	"sLengthMenu" : "每页显示 _MENU_ 条记录",
	        			"sZeroRecords" : "抱歉， 没有找到",
	        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
	        			"sInfoEmpty" : "找不到相关数据",
	        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
	        			"sProcessing": "正在加载中...",
	        			"sSearch": "搜索",
	        			"oPaginate" : {
	        				"sFirst" : "首页",
	        				"sPrevious" : "前一页",
	        				"sNext" : "后一页",
	        				"sLast" : "尾页"
	        			},
	                },
	                "aoColumns" : [
	       						{
	       						    "mData": "graduateStudentsId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
	       						    return '<label  class="labletab" style="padding-top: 0px"> <input name="checkbox" type="checkbox" class="checkchild" value="'+full["graduateStudentsId"]+'"> <span class="text" ></span> </label>';
	       						}
	       						},
	       						{"mData": "consultInfoManage.baoMDate", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.enable", 'sClass': "text-center"},
	       						/* {"mData": "pihao", 'sClass': "text-center"}, */
	       						{"mData": "status", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.studentName", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.studentSex", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.idcard", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.departmentName3", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.kTimeValue", 'sClass': "text-center"},
	       						{"mData": "receiveNo", 'sClass': "text-center"},
	       						{"mData": "sendNo", 'sClass': "text-center"},  
	       						{"mData": "consultInfoManage.projectLevelName", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.schoolFrom", 'sClass': "text-center"},
	       						{"mData": "consultInfoManage.proFrom", 'sClass': "text-center"},
	       						{
	       			                "mData": "",
	       			                'sClass': "text-center",
	       			                "bSortable": false,
	       			                "mRender": function (data, type, full ) {
	       			                    var c = '<a href="#"  data-toggle="modal" data-backdrop="static" onclick="selectStudent(\''+full["graduateStudentsId"]+'\')" data-target=".graduateStudents"><i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
	       			                    var p = '<a href="#"  data-toggle="modal" data-target=".graduateStudents" data-backdrop="static"><i class="fa fa-phone success" data-toggle="tooltip" data-placement="top" data-original-title="电话" title="电话"></i></a>';
	       			                 	var x = '<a href="#" class="msg" data-record=\'' + JSON.stringify(full) + '\' data-backdrop="static" data-toggle="modal" data-target=".information" class="msg"><i class="fa fa-envelope-o blue" data-toggle="tooltip" data-placement="top" title="发送信息"></i></a></a>'
	       			                	var z = '<a href="#" data-toggle="modal" data-target="" data-backdrop="static"> <i class="fa fa-download darkorange" data-toggle="tooltip" data-placement="top" data-original-title="下载" title="下载"></i></a>';
	       			                    return c+p+x+z;
	       			                }
	       			            }

	                       ],
	                       "aoColumnDefs": [{
	       	   	            sDefaultContent: '',
	       	   	            aTargets: ['_all']
	       	   	        }],
		       	   	  "fnRowCallback":function(nRow,aData,iDisplayIndex){
	       		   	    if(aData.status==''){
	      	   	    		$('td:eq(3)',nRow).html('未领取');
	      	   	    	}else if(aData.status=='1'){
	      	   	    		$('td:eq(3)',nRow).html('集团领取');
	      	   	    	}else if(aData.status=='2'){
	      	   	    		$('td:eq(3)',nRow).html('集团邮寄');
	      	   	    	}else if(aData.status=='3'){
	      	   	    		$('td:eq(3)',nRow).html('学员领取');
	      	   	    	}
	       		   		if($('td:eq(2)',nRow).html()=='0'){
	       		   			$('td:eq(2)',nRow).html('有效');
	       		   		}else if($('td:eq(2)',nRow).html()=='1'){
	       		   			$('td:eq(2)',nRow).html('无效');
	       		   		}
		       		   	if($('td:eq(5)',nRow).html()=='1'){
	       		   			$('td:eq(5)',nRow).html('女');
	       		   		}else if($('td:eq(5)',nRow).html()=='0'){
	       		   			$('td:eq(5)',nRow).html('男');
	       		   		}
	   		   	    	return nRow;
	   		   	    }
				})

			    //每页显示记录数
			    $('#dataTables_wrapper .dataTables_info').parent().append($('#dataTables_wrapper .dataTables_length'));
				//横线滚动条
				$("#dataTables_wrapper").on('scroll',function(){
					$('#dataTables_wrapper .dataTables_paginate').css('margin-right',-$(this).scrollLeft());
				})
			}
		
		}
	}();
</script>

<script src="${ctx_static }/home/serviceCenter/js/graduateStudents.js"></script>
