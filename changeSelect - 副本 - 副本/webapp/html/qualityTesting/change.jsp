<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/qualityTesting/css/change.css" rel="stylesheet">

<div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="widget">
                            <div class="widget-header">
                                <div class="widget-buttons">
                                    <a href="#" data-toggle="collapse">
                                        <i class="fa fa-minus"></i>
                                    </a>
                                    <a href="#" data-toggle="dispose">
                                        <i class="fa fa-times"></i>
                                    </a>
                                </div>
                                <!--Widget Buttons-->
                            </div>
                            <!--Widget Header-->
                            <div class="widget-body">
                                <div class="widget-main">
                                    <div class="row row_padding form-horizontal">
                                        <div class="col-sm-12">
                                            <div class="form-group col-md-5 col-sm-5">
                                                <label class="pull-left control-label">创建日期</label>
                                                <div class="col-sm-10">
                                                    <div class="input-group date">
                                                        <input class="form-control" id="duration" type="text">
                                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-7 col-sm-7">
                                                <div class="form-group col-md-10 col-sm-10 no-margin-right">
                                                    <input class="form-control searchVal" placeholder="品牌/发送方向/分校/咨询者类型/课程/级别/媒体来源/咨询师/电话"
                                                           onkeydown="search()" type="text">
                                                </div>
                                                <div class="form-group pull-left margin-left-10">
	                                                <button type="button"
	                                                        class="btn btn-lightBlue form-control search-btn" data-id="consultInfos">
	                                                        	<i class="fa fa-search"></i>搜索
	                                                </button>
                                                </div>
                                            </div>
                                            <button class="btn btn-lightBlue pull-right adjustment-btn"
                                                    data-toggle="modal" data-target=".adjustment" data-backdrop="static">调整
                                            </button>
                                        </div>
                                    </div>
                                    <div class="dataTables_wrapper form-inline no-footer">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                                   id="consultInfos">
                                                <thead>
                                                <tr role="row" class="text-center">
                                                    <th>
                                                        <label>
                                                            <input type="checkbox" class="master">
                                                            <span class="text"></span>
                                                        </label>
                                                    </th>
                                                    <th>创建日期</th>
                                                    <th>发送</th>
                                                    <th>状态</th>
                                                    <th>采集人</th>
                                                    <th>咨询师</th>
                                                    <th>咨询者类型</th>
                                                    <th>课程</th>
                                                    <th>级别</th>
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
            
 <!--查看-->
<div class="modal fade changeView" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <div class="col-sm-12">
                    <table class="table table_border text-center headInfo">
                        <tr>
                            <td>咨询分校：<span id="consuleSchool">北京分校</span></td>
                            <td>品牌：<span id="brandName">智联</span></td>
                            <td>咨询者类型：<span id="studentAttrName2">在线接待</span></td>
                            <td>媒体来源：<span id="studentAttrName1">百度搜索推广</span></td>
                            <td>客户成熟度：<span id="studentMaturity">A-高</span></td>
                        </tr>
                    </table>
                </div>
                <form method="" class="form-horizontal">
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
                                        <input type="text" class="form-control comment_disabled studentName" id="studentName"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">性别：</label>
                                    <div class="col-sm-9">
                                         <!-- <input type="text" class="form-control comment_disabled" id="studentSex"
                                               disabled="disabled"> -->
                                        <select id="studentSex" name="studentSex" class="form-control comment_disabled" disabled="disabled">
											<option value="0">男</option>
											<option value="1">女</option>
										</select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">年龄：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuAge" id="age"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">手机：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuPhone" id="studentPhone"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">邮箱：</label>
                                    <div class="col-sm-9">
                                        <input type="email" class="form-control comment_disabled stuEmail" id="email"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">所在地：</label>
                                    <div class="col-sm-9">
                                         <input type="email" class="form-control comment_disabled stuLocaiton" id="phoneBelong"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">微信：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuWeChat" id="weChat"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">QQ：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuQQ" id="tengXun"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right no-padding-left"
                                           style="margin-left:-41px">其他联系方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuOtherPhone" id="ortherphone"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型：</label>
                                    <div class="col-sm-9">
                                       <!--  <input type="text" name=""
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuCardType" id="idcardType"
                                               disabled="disabled"> -->
                                        <select name="idcardType" id="idcardType" class="form-control comment_disabled">
                                        <option value="">身份证</option>
                                        <option value="">护照</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件号码：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name=""
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuCard" id="idcard"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">报名方式：</label>
                                    <div class="col-sm-9">
                                       <!--  <input type="text" name=""
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuBMType" id="infoType"
                                               disabled="disabled"> -->
                                       <select name="infoType" id="infoType" class="form-control comment_disabled">
	                                       <option  value="0">线上支付</option>
	                                       <option value="1">上门报名</option>
                                       </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">民族：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="nation"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuNation" id="nation"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">毕业院校：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="bySchool"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuBySchool" id="bySchool"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left"
                                           style="margin-left:-21px">最高学历：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="studentAttrName3"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuStudentAttrName32" id="StudentAttrName3"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">所学专业：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="byZy"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stubByZy" id="byZy"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">紧急联系人：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContact"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuEmergencyContact" id="emergencyContact"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">联系方式：</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContactMode"
                                               class="form-control comment_disabled padding-right-5 padding-left-10 stuEmergencyContactMode" id="emergencyContactMode"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-12 col-sm-12">
                                    <label style="margin-left: -48px !important;"
                                           class="col-sm-2 control-label no-padding-right">通讯地址：</label>
                                    <div class="col-sm-9">
                                        <input class="form-control comment_disabled stuPhoneAddress" id="phoneaddress"
                                              type="text"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-10 col-md-12 col-sm-12">
                                    <label style="margin-left: -48px !important;"
                                           class="col-sm-2 control-label no-padding-right">工作地址：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled stuWorkSpace" id="workspace"
                                               disabled="disabled">
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
                                    <!-- <input type="text" class="form-control comment_disabled courseType" id="projectType"
                                               disabled="disabled"> -->
                                     <select type="text" class="form-control comment_disabled courseType" id="projectType"
                                               disabled="disabled">
                                                <option selected="selected" value="0" >请选择</option>
                                                <option value="1">职业资格</option>
										        <option value="2">学历</option>
                                               </select>
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">项目：</label>
                                    <div class="col-sm-9">
                                     <input type="text" class="form-control comment_disabled projectName" id="projectName"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">级别：</label>
                                    <div class="col-sm-9">
                                    <input type="text" class="form-control comment_disabled projectLevelName" id="projectLevelName"
                                               disabled="disabled">
                                    </div>
                                </div>

                                <div class="xueliDiv">
                                   <!--  <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right"
                                               style="margin-left:-21px;">教育形式：</label>
                                        <div class="col-sm-9">
                                            <select type="text" class="form-control comment_disabled" id="eduFrom"
                                                   disabled="disabled" name="eduFrom">
                                                <option selected="selected" value="0" >请选择</option>
                                                <option value="1">成考</option>
										        <option value="2">自考</option>
										        <option value="3">远程</option>
										    </select> 
                                        </div>
                                    </div> -->
                                    <!-- <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right"
                                               style="margin-left:-21px;">院校名称：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" id="schoolFrom"
                                                   disabled="disabled" name="schoolFrom">
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                        <label class="col-sm-4 control-label no-padding-right"
                                               style="margin-left:-21px;">专业名称：</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control comment_disabled" id="proFrom"
                                                   disabled="disabled" name="prFrom">
                                        </div>
                                    </div>
                                </div> -->

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">考期：</label>
                                    <div class="col-sm-9">
                                     <input type="text" class="form-control comment_disabled kTime" id="examDate"
                                                   disabled="disabled" name="examDate">
                                      <!--   <select id="ktime" name="ktime" class="form-control comment_disabled" disabled="disabled">
										</select>
										<input id="ktime" name="ktime" type="hidden"> -->
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">班型：</label>
                                    <div class="col-sm-9">
                                      <input type="text" class="form-control comment_disabled classAttr" id="classattr"
                                                   disabled="disabled" >
                                    </div>
                                </div>

                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right">价格：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled coursePrice" id="classprice"
                                               disabled="disabled">
                                    </div>
                                </div>

                               <!--  <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right" style="margin-left:-21px">报考院校：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control comment_disabled bkyx" id="schoolFrom"
                                               disabled="disabled">
                                    </div>
                                </div> -->
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
                            <div class="coursePayInfo" id="coursePayInfo">
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
									<tr id="dztr">
									<td>订座费</td>
									<td>0</td>
									<td id="dztd"></td>
									<td>
									<div class="payment">
										<div class="col-sm-4">
										   <select id="dingzuoS" class="form-control" disabled>
										        <option value="Xj">现金</option>
										        <option value="Sk">刷卡</option>
										        <option value="Zp">支票</option>
										        <option value="Weixin">汇款-微信</option>
										        <option value="Zfb">汇款-支付宝</option>
										        <option value="Wl">汇款-网络</option>
										        <option value="Zz">银行转账</option>
										        <option value="Fq">分期</option>
										    </select>
										</div>
									<div class="col-sm-5">
									     <input id="dingzuoI" class="form-control" type="text" value="0" disabled>
									 </div>
									<div class="col-sm-3">
									</div>
									</div>
									</td>
									<td></td>
								</tr>	
                                   <tbody id="appendPayBody">
								</tbody>
								<tr id="appendPayTr">
									<td colspan="5">
										<div class="form-group col-lg-6 col-md-6 col-sm-6">
		                                    <label class="col-sm-4  no-padding control-label payment-text">下次缴费时间：</label>
		                                    <div class="input-group col-sm-8 payment-time"> 
		                                        <input value="2017-2-7" name="nextPayTime" id="nextPayTime" class="form-control paymentTime comment_disabled" type="text">
		                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
		                                    </div>
		                                </div>
									</td>
								</tr>
                                </table>
                                <div class="well">
                                    <span class="tips">备注:</span> <span id="notes">2016-11-07考务费于2017-2-14补交</span>
                                </div>
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
                            <table class="table table-striped table-hover td_border dataTable no-footer" id="zxjl">
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
                            <table class="table table-striped table-hover td_border dataTable no-footer" id="recordContent">
                               
                            </table>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>           
<div class="modal fade adjustment"  tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">调整</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="adjustment">
                    <div class="form-group col-sm-12 text-center">
                        <span class="control-label">您确认调整吗？</span>
                    </div>
                    <div class="col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary form-control" id="changeDepartment">确认
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
                
<!-- form表单ajax提交 -->
<script src="${ctx_static }/dep/form/custom.jquery.form.js"></script>
<script src="${ctx_static }/dep/form/jquery.form.min.js"></script>
<script src="${ctx_static }/home/qualityTesting/js/change.js"></script>
