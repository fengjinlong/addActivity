<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/serviceCenter/css/serverInfo.css" rel="stylesheet" />
<!DOCTYPE html>
<div class="page-body">
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
                <div class="widget-body clearfix">
                    <div class="widget-main">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class="tabbable">
                                <ul class="nav nav-tabs" id="myTab" style="border-bottom:1px solid #5db2ff">
                                    <li class="active">
                                        <a data-toggle="tab" href="#return-student">
                                            退回学员
                                        </a>
                                    </li>

                                    <li>
                                        <a data-toggle="tab" href="#change-audit">
                                            转班审核
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#change-achieve">
                                            转班完成
                                        </a>
                                    </li>
                                </ul>

                                <div class="tab-content content"  id="stuServiceCenterInfo">
                                    <!--退回学员-->
                                    <div id="return-student" class="tab-pane clearfix in active">
                                        <div class="row row_padding form-horizontal">
                                            <div class="col-md-6 col-sm-6 col-lg-6">
                                                <div class="form-group">
                                                    <label class="control-label col-lg-1 col-md-1 col-sm-1 no-padding-right pull-left">日期</label>
                                                    <div class="col-lg-10 col-md-10 col-sm-10">
                                                        <div class="controls">
                                                            <div class="input-group date">
                                                                <input id="date1" type="text" class="form-control  paymentTime" placeholder="请选择日期">
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6 col-lg-6">
                                                <div class="form-group col-md-9 col-sm-9 no-margin-right">
                                                    <input type="text" class="form-control" id="key1" placeholder="分校/姓名/电话/报名表编号/身份证号">
                                                </div>
                                                <div class="form-group col-lg-3 col-md-3 col-sm-3">
                                                    <button type="button" onclick="init1()" id="search1" class="btn btn-blue form-control search-btn">
                                                        搜索
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dataTables_wrapper form-inline no-footer">
                                            <div class="table-scrollable">
                                                <table id="table1" class="table table-striped table-hover table-bordered dataTable no-footer" id="amountDataIncomplete">
                                                    <thead>
                                                    <tr role="row">
                                                        <th width="5%">
                                                            <label>
                                                                <input type="checkbox">
                                                                <span class="text"></span>
                                                            </label>
                                                        </th>
                                                        <th>报名日期 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>分校 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>姓名 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>手机号 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>转班提交日期 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>产品模型 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>产品 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>操作</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    
                                                    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!--转班审核-->
                                    <div id="change-audit" class="tab-pane clearfix">
                                        <div class="row row_padding form-horizontal">
                                            <div class="col-md-6 col-sm-6 col-lg-6">
                                                <div class="form-group">
                                                    <label class="control-label col-lg-1 col-md-1 col-sm-1 no-padding-right pull-left">日期</label>
                                                    <div class="col-lg-10 col-md-10 col-sm-10">
                                                        <div class="controls">
                                                            <div class="input-group date">
                                                                <input type="text" id="date2" class="form-control  paymentTime" placeholder="请选择日期">
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6 col-lg-6">
                                                <div class="form-group col-md-9 col-sm-9 col-lg-9 no-margin-right">
                                                    <input type="text" id="key2" class="form-control" placeholder="分校/姓名/电话/教育形式/院校/级别/报名表编号/身份证号">
                                                </div>
                                                <div class="form-group col-lg-3 col-md-3 col-sm-3">
                                                    <button type="button" id="search2" onclick="init2()" class="btn btn-blue form-control search-btn">
                                                        搜索
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dataTables_wrapper form-inline no-footer">
                                            <div class="table-scrollable">
                                                <table id="table2" class="table table-striped table-hover table-bordered dataTable no-footer" id="amountDataIncomplete">
                                                    <thead>
                                                    <tr role="row">
                                                        <th width="5%">
                                                            <label>
                                                                <input type="checkbox">
                                                                <span class="text"></span>
                                                            </label>
                                                        </th>
                                                        <th>报名日期 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>分校 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>姓名 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>手机号 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>转班提交日期 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>产品模型 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>产品 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>操作</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    
                                                    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!--转班完成-->
                                    <div id="change-achieve" class="tab-pane clearfix">
                                        <div class="row row_padding form-horizontal">
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-lg-1 col-md-1 col-sm-1 no-padding-right pull-left">日期</label>
                                                    <div class="col-lg-10 col-md-10 col-sm-10">
                                                        <div class="controls">
                                                            <div class="input-group date">
                                                                <input type="text" id="date3" class="form-control  paymentTime" placeholder="请选择日期">
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6 col-lg-6">
                                                <div class="form-group col-md-9 col-sm-9 col-lg-9 no-margin-right">
                                                    <input type="text" id="key3" class="form-control" placeholder="分校/姓名/电话/教育形式/院校/级别/报名表编号/身份证号">
                                                </div>
                                                <div class="form-group col-lg-3 col-md-3 col-sm-3">
                                                    <button type="button" id="search3" onclick="init3()" class="btn btn-blue form-control search-btn">
                                                        搜索
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dataTables_wrapper form-inline no-footer">
                                            <div class="table-scrollable">
                                                <table id="table3" class="table table-striped table-hover table-bordered dataTable no-footer" id="amountDataIncomplete">
                                                    <thead>
                                                    <tr role="row">
                                                        <th width="5%">
                                                            <label>
                                                                <input type="checkbox">
                                                                <span class="text"></span>
                                                            </label>
                                                        </th>
                                                        <th>报名日期 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>分校 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>姓名 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>手机号 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>转班提交日期 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>产品模型 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
                                                        <th>产品 <span class="fa indicator fa-unsorted"></span>
                                                        </th>
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
            </div>
        </div>
    </div>
</div>
        

<%@ include file="../common/public_footer.jsp"%>

<!--转班-->
<div class="modal fade serviceView in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">转班审核</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div id="material" class="tab-pane active">

                        <div class="material-info">
                            <h4 class="clearfix">
                                <div class="trademark">
                                    <span>咨询分校：</span>
                                    <i class="d1"></i>
                                </div>
                                <div class="trademark">
                                    <span>品牌：</span>
                                    <i class="d2"></i>
                                </div>
                                <div class="trademark">
                                    <span>咨询者类型：</span>
                                    <i class="d3"></i>
                                </div>
                                <div class="trademark">
                                    <span>媒体来源：</span>
                                    <i class="d4"></i>
                                </div>
                                <div class="trademark">
                                    <span>客户成熟度：</span>
                                    <i class="d5"></i>
                                </div>
                            </h4>

                            <div class="material-course clearfix">
                                <div class="course-title">学员个人信息</div>
                                <div class="course container-fluid  form-horizontal" id="scdata">
                                    <div class="row">
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
											<div class="col-sm-9 col-lg-9">
												<input id="studentName" type="text"
													class="form-control comment_disabled" value=""
													name="studentName">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">性别</label>
											<div class="col-sm-9">
												<select class="form-control comment_disabled"
													name="studentSex">
													<option value="0">男</option>
													<option value="1">女</option>
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">年龄</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled" value=""
													name="age">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">手机</label>
											<div class="col-sm-9">
												<input type="text" 
													class="form-control comment_disabled" value=""
													name="studentPhone" id="studentPhone">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">邮箱</label>
											<div class="col-sm-9">
												<input type="email"
													class="form-control comment_disabled" value=""
													name="email">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label
												class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
											<div class="col-sm-9">
												<input
													class="form-control comment_disabled" value=""
													name="phoneBelong">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">微信</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled" value=""
													name="weChat">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 control-label no-padding-right">QQ</label>
											<div class="col-sm-9">
												<input type="text"
													class="form-control comment_disabled" value=""
													name="tengXun">
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-3 col-md-3 col-lg-3 control-label no-padding-right no-padding-left">其他联系方式</label>
											<div class="col-sm-9 col-md-9 col-lg-9">
												<input type="text"
													class="form-control comment_disabled"
													name="ortherPhone">
											</div>
										</div>
										<div class="form-group col-lg-10 col-md-12 col-sm-12">
											<label style="margin-left: -45px;"
												class="col-sm-2 control-label no-padding-right">通讯地址</label>
											<div class="col-sm-9">
												<input name="phoneAddress"
													class="form-control comment_disabled"
													 type="text">
											</div>
										</div>
										<div class="form-group col-lg-10 col-md-12 col-sm-12">
											<label style="margin-left: -45px;"
												class="col-sm-2 control-label no-padding-right">工作单位</label>
											<div class="col-sm-9">
												<input name="workSpace" type="text"
													class="form-control comment_disabled" 
													>
											</div>
										</div>
                                    </div>
                                </div>
                            </div>

                            <div class="material-course clearfix">
                                <div class="course-title">旧课程信息</div>
                                <div class="course container-fluid  form-horizontal">
                                    <div class="row">
                                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-4 control-label no-padding-right">产品模型</label>
											<div class="col-sm-8">
												<select class="form-control comment_disabled"
													disabled="disabled" id="addProductModel2" name="productModalId">
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-4 control-label no-padding-right">产品</label>
											<div class="col-sm-8">
												<select class="form-control comment_disabled"
													disabled="disabled" id="addProductId2" name="productId">
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-4 control-label no-padding-right">考期</label>
											<div class="col-sm-8">
												<select disabled="disabled"
													class="form-control comment_disabled" id="kTime2" name="kTime">
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-4 control-label no-padding-right">考试地区</label>
											<div class="col-sm-8">
												<select disabled="disabled"
													class="form-control comment_disabled branchSchoolId" name="branchSchoolId">
												</select>
											</div>
										</div>
										<div class="form-group col-lg-4 col-md-4 col-sm-6">
											<label class="col-sm-4 control-label no-padding-right">收款方</label>
											<div class="col-sm-8">
												<select id="classId2" disabled="disabled"
													class="form-control comment_disabled"
													disabled="disabled" name="shoukuanfang">
												</select>
											</div>
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">费用信息</div>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:10%">费用项目</th>
                                            <th style="width:15%">应缴</th>
                                            <th style="width:15%">实缴</th>
                                            <th style="width:15%">支出</th>
                                            <th style="width:30%">扣费</th>
                                            <th style="width:15%">结余</th>
                                        </tr>
                                    </thead>
                                    <tbody id="payMentTableInfoBody">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">新课程信息</div>
                            <div class="course container-fluid  form-horizontal">
                                <div class="row">
                                    <div class="counselCurriculum">
					               		<div class="form-group col-md-4 col-sm-6">
					                        <label class="control-label col-sm-5 no-padding-right">产品模型<span class="control-label mandatory">*</span></label>
					                        <div class="col-sm-7  no-padding-right">
					                            <select name="productModelId" id="addProductModel" data-value="product_model" class="form-control addProductModel chosen-select">
					                            </select>
					                        </div>
					                    </div>
					                 </div>
					                 <div class="form-group col-sm-4 col-sm-6">
					                        <label class="control-label col-sm-5 no-padding-right">产品：</label>
					                        <div class="col-sm-7  no-padding-right">
												 <select name="productId" id="addProductId" class="form-control addProductId">
												 </select>
					                        </div>
					                 </div>
					                 <div class="form-group col-lg-4 col-md-4 col-sm-6">
	                                    <label class="control-label col-sm-5 no-padding-right">收款方</label>
	                                    <div class="col-sm-7  no-padding-right">
	                                        <select id="payee" name="payee" class="form-control chosen-select">
	                                        </select>
	                                    </div>
	                                </div>
					                 <div class="form-group col-sm-4 col-sm-6">
                                     	<label class="control-label col-sm-5 no-padding-right">考期</label>
	                                    <div class="col-sm-7 no-padding-right">
	                                        <select id="kTime" name="kTime" class="form-control chosen-select">
	                                        </select>
	                                    </div>
                               		 </div>
	                                 <div class="form-group col-sm-4 col-sm-6">
	                                    <label class="control-label col-sm-5 no-padding-right">考试地区</label>
	                                    <div class="col-sm-7 no-padding-right">
	                                        <select id="branchSchoolId" name="branchSchoolId" class="form-control chosen-select" >
	                                        </select>
	                                    </div>
	                                 </div>
					                 <div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-sm-1 control-label no-padding-right">优惠类型</label>
										<div class="col-sm-11">
											<div class="checkbox" id="bizActive">
												<label > 
													<span class="text">无</span>
												</label>
											</div>
											<div class="fuwuCodeDiv" >
											<input id="fuwuCodeMoney" type="hidden"/>
											<input id="fuwuCode" /> <a id="fuwuCodeSub" onclick="fuwuCodeSub()" class="btn">确认</a>
											</div>
										</div>
									</div>
					                 <div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-sm-1 control-label no-padding-right">包含服务</label>
										<div class="col-sm-11">
											<div class="checkbox"  id="service">
												<label> 
													<span class="text">无</span>
												</label>
											</div>
										</div>
									</div>
                                </div>
                            </div>
                        </div>

                        <div class="material-course clearfix">
                            <div class="course-title">课程缴费信息</div>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>费用项目</th>
                                            <th>产品应缴</th>
                                            <th>实际实缴</th>
                                            <th>实缴</th>
                                            <th>支付方式</th>
                                            <th>欠费</th>
                                        </tr>
                                    </thead>
                                    <tbody class="creatTr" id="appendPayBody">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="material-course clearfix" id="kongzhichu2">
                            <div class="course-title">退费空支出申请</div>
	                            <div class="course container-fluid  form-horizontal">
	                                <div class="row">
	                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right ">申请人</label>
										<div class="col-sm-8">
											<input type="text" class="form-control comment_disabled"
												readonly name="peploName" value="${sessionScope.currentUser.realName}">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right ">申请时间</label>
										<div class="col-sm-8">
											<div class="input-group">
												<input class="form-control date-picker form_datetime"
													type="text" name="nowTime" value="" readonly> <span
													class="input-group-addon"> <i class="fa fa-calendar"></i>
												</span>
											</div>
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">退费金额</label>
										<div class="col-sm-8">
											<input type="text" class="form-control comment_disabled"
												name="kongzhichuMoney" value="">
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12">
										<label class="col-md-1 control-label no-padding-right">类型</label>
										<div class="col-md-11">
											<div class="col-md-4">
												<select class="form-control comment_disabled"
													name="financeCostclassId1">
	
												</select>
											</div>
											<div class="col-md-4">
												<select class="form-control comment_disabled"
													name="financeCostclassId2">
	
												</select>
											</div>
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-md-1 control-label no-padding-right">支出明细</label>
										<div class="col-md-11">
											<textarea class="form-control" rows="1" name="feeDetail"></textarea>
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-md-1 control-label no-padding-right">发票抬头</label>
										<div class="col-md-11">
											<textarea class="form-control" rows="1" name="invoiceTitle"></textarea>
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12">
										<label class="col-md-1 control-label no-padding-right">收款人</label>
										<div class="col-md-11">
											<div class="col-md-3">
												<select class="form-control comment_disabled"
													name="financePayeeId">
	
												</select>
											</div>
											<div class="col-md-3">
												<input type="text" readonly="readonly" class="form-control comment_disabled"
													value="" placeholder="开户行" name="bankName">
											</div>
											<div class="col-md-3">
												<input type="text" readonly="readonly" class="form-control comment_disabled"
													value="" placeholder="开卡所在省" name="province">
											</div>
											<div class="col-md-3">
												<input type="text" readonly="readonly" class="form-control comment_disabled"
													value="" placeholder="开卡所在市" name="city">
											</div>
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">账号</label>
										<div class="col-sm-8">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												 name="accountNum">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">户名</label>
										<div class="col-sm-8">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="accountName">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">电话</label>
										<div class="col-sm-8">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="phone">
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-top: 15px; margin-left: 0px">
										<label class="col-sm-1 control-label no-padding-right">备注</label>
										<div class="col-sm-11">
											<textarea class="form-control description" rows="8" name="returnFile" style="width:600px;height:300px;"></textarea>
				                        	<script>
												$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
													KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
													kongzhichu2k1 = KindEditor.create('#kongzhichu2 [name="returnFile"]',{
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
                                </div>
                            </div>
                        </div>
    
                        <div class="material-course clearfix" id="tuichajia2">
                            <div class="course-title">退差价申请</div>
	                            <div class="course container-fluid  form-horizontal">
	                                <div class="row">
	                                    <div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">申请人</label>
										<div class="col-sm-8">
											<input type="text" class="form-control comment_disabled"
												name="peploName" readonly value="${sessionScope.currentUser.realName}">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">申请时间</label>
										<div class="col-sm-8">
											<div class="input-group">
												<input class="form-control date-picker form_datetime"
													type="text" name="nowTime" value="" readonly> <span
													class="input-group-addon"> <i class="fa fa-calendar"></i>
												</span>
											</div>
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">退费金额</label>
										<div class="col-sm-8">
											<input type="text" class="form-control comment_disabled"
												name="tuichajiaMoney" value="">
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12">
										<label class="col-md-1 control-label no-padding-right">类型</label>
										<div class="col-md-11">
											<div class="col-md-4">
												<select class="form-control comment_disabled"
													name="financeCostclassId1">
	
												</select>
											</div>
											<div class="col-md-4">
												<select class="form-control comment_disabled"
													name="financeCostclassId2">
	
												</select>
											</div>
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-md-1 control-label no-padding-right">支出明细</label>
										<div class="col-md-11">
											<textarea class="form-control" rows="1" name="feeDetail"></textarea>
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-left: 0px">
										<label class="col-md-1 control-label no-padding-right">发票抬头</label>
										<div class="col-md-11">
											<textarea class="form-control" rows="1" name="invoiceTitle"></textarea>
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12">
										<label class="col-md-1 control-label no-padding-right">收款人</label>
										<div class="col-md-11">
											<div class="col-md-3">
												<select class="form-control comment_disabled"
													name="financePayeeId">
	
												</select>
											</div>
											<div class="col-md-3">
												<input type="text" readonly="readonly" class="form-control comment_disabled"
													name="bankName" placeholder="开户行">
											</div>
											<div class="col-md-3">
												<input type="text" readonly="readonly" class="form-control comment_disabled"
													name="province" placeholder="开卡所在省">
											</div>
											<div class="col-md-3">
												<input type="text" readonly="readonly" class="form-control comment_disabled"
													name="city" placeholder="开卡所在市">
											</div>
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">账号</label>
										<div class="col-sm-8">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="accountNum">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">户名</label>
										<div class="col-sm-8">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="accountName">
										</div>
									</div>
									<div class="form-group col-lg-4 col-md-4 col-sm-6">
										<label class="col-sm-4 control-label no-padding-right">电话</label>
										<div class="col-sm-8">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="phone">
										</div>
									</div>
									<div class="form-group col-lg-12 col-md-12 col-sm-12"
										style="margin-top: 15px; margin-left: 0px">
										<label class="col-sm-1 control-label no-padding-right">备注</label>
										<div class="col-sm-11">
											<textarea class="form-control description" rows="8" name="returnFile" style="width:600px;height:300px;"></textarea>
				                        	<script>
												$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
													KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
													tuichajia2k1 = KindEditor.create('#tuichajia2 [name="returnFile"]',{
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
	                            </div>
                            </div>
                        </div>

                        <div class="material-course clearfix" id="dutyDiv">
                            <div class="course-title">责任鉴定</div>
                            <div class="table-responsive">
                            	<table class="table table-striped table-hover table-bordered dataTable no-footer">
			                        <thead>
			                        <tr>
			                            <th>
			                                <span>责任分校</span>
			                                <span class="parentNode">
			                                     <i class="fa fa-plus success operate-btn"></i>
			                                     <i class="fa fa-minus danger operate-btn"></i>
			                                </span>
			                            </th>
			                            <th>是否收回分成</th>
			                            <th>责任人</th>
			                            <th>罚款金额</th>
			                        </tr>
			
		                        	</thead>
			                        <tbody id="addFolwTbody">
				                        <tr parent-tr="parent-1">
				                            <td width="20%" rowspan="1">
				                                <select name="parent" class="form-control" id="parent">
				                                   
				                                </select>
				                            </td>
				                             <td width="20%" rowspan="1">
				                                <select  class="form-control" >
				                                   	<option value="1">是</option>
				                                   	<option value="0">否</option>
				                                </select>
				                            </td>
				                            <td width="40%">
				                                <div class="col-sm-11 no-padding">
				                                    <select name="child" class="form-control" id="child">
				                                    
				                                    </select>
				                                </div>
				                                <label class="control-label pull-left childNode">
				                                    <a class="fa fa-plus success operate-btn"></a>
				                                </label>
				                            </td>
				                            <td width="40%">
				                                <input  class="form-control" />
				                            </td>
				                        </tr>
			                        </tbody>
			                    </table>
                            </div>
                            <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-top:15px;margin-left:0px">
                                <label class="col-sm-1 control-label no-padding-right">备注</label>
                                <div class="col-sm-11">
                                    <textarea class="form-control description" rows="8" name="remark" style="width:600px;height:300px;"></textarea>
		                        	<script>
										$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
											KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
											k3 = KindEditor.create('[name="remark"]',{
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
                        </div>
                    </div>

                    <div class="clearfix form-group" style="margin:40px 0px;" id="btuDiv">
                        <div class="col-sm-3 col-xs-3 col-sm-offset-4  col-xs-offset-3">
                            <a data-toggle="modal" data-target=".return-expend">
                                <button type="submit" id="sub" onclick="subClassChange()" class="btn btn-primary btn-lg col-sm-6">完成
                                </button>
                            </a>
                        </div>
                        <div class="col-sm-3  col-xs-3">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
            </div>
            </form>
        </div>
    </div>
</div>


<!--转班——退费空支出申请-->
<div class="modal fade sss in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">退费空支出申请</span>
			</div>
			<div class="modal-body clearfix">
				<div class="modal-body">
					<div class="material-course clearfix" id="kongzhichu">
						<div class="course-title">退费空支出申请</div>
						<div class="course container-fluid  form-horizontal">
							<div class="row">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right ">申请人</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											readonly name="peploName" value="${sessionScope.currentUser.realName}">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right ">申请时间</label>
									<div class="col-sm-8">
										<div class="input-group">
											<input class="form-control date-picker form_datetime"
												type="text" name="nowTime" value="" readonly> <span
												class="input-group-addon"> <i class="fa fa-calendar"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">退费金额</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											name="kongzhichuMoney" value="">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">类型</label>
									<div class="col-md-11">
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId1">

											</select>
										</div>
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId2">

											</select>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-left: 0px">
									<label class="col-md-1 control-label no-padding-right">支出明细</label>
									<div class="col-md-11">
										<textarea class="form-control" rows="1" name="feeDetail"></textarea>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-left: 0px">
									<label class="col-md-1 control-label no-padding-right">发票抬头</label>
									<div class="col-md-11">
										<textarea class="form-control" rows="1" name="invoiceTitle"></textarea>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">收款人</label>
									<div class="col-md-11">
										<div class="col-md-3">
											<select class="form-control comment_disabled"
												name="financePayeeId">

											</select>
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												value="" placeholder="开户行" name="bankName">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												value="" placeholder="开卡所在省" name="province">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												value="" placeholder="开卡所在市" name="city">
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">账号</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											 name="accountNum">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">户名</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="accountName">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">电话</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="phone">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-top: 15px; margin-left: 0px">
									<label class="col-sm-1 control-label no-padding-right">备注</label>
									<div class="col-sm-11">
										<textarea class="form-control content" rows="3"
											 name="memo"
											style="width: 668px; height: 240px;"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="material-course clearfix" id="tuichajia">
						<div class="course-title">退差价申请</div>
						<input type="hidden" id="tuichajiaType">
						<div class="course container-fluid  form-horizontal">
							<div class="row">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">申请人</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											name="peploName" readonly value="${sessionScope.currentUser.realName}">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">申请时间</label>
									<div class="col-sm-8">
										<div class="input-group">
											<input class="form-control date-picker form_datetime"
												type="text" name="nowTime" value="" readonly> <span
												class="input-group-addon"> <i class="fa fa-calendar"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">退费金额</label>
									<div class="col-sm-8">
										<input type="text" class="form-control comment_disabled"
											name="tuichajiaMoney" value="">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">类型</label>
									<div class="col-md-11">
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId1">

											</select>
										</div>
										<div class="col-md-4">
											<select class="form-control comment_disabled"
												name="financeCostclassId2">

											</select>
										</div>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-left: 0px">
									<label class="col-md-1 control-label no-padding-right">支出明细</label>
									<div class="col-md-11">
										<textarea class="form-control" rows="1" name="feeDetail"></textarea>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-left: 0px">
									<label class="col-md-1 control-label no-padding-right">发票抬头</label>
									<div class="col-md-11">
										<textarea class="form-control" rows="1" name="invoiceTitle"></textarea>
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12">
									<label class="col-md-1 control-label no-padding-right">收款人</label>
									<div class="col-md-11">
										<div class="col-md-3">
											<select class="form-control comment_disabled"
												name="financePayeeId">

											</select>
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="bankName" placeholder="开户行">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="province" placeholder="开卡所在省">
										</div>
										<div class="col-md-3">
											<input type="text" readonly="readonly" class="form-control comment_disabled"
												name="city" placeholder="开卡所在市">
										</div>
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">账号</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="accountNum">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">户名</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="accountName">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-4 control-label no-padding-right">电话</label>
									<div class="col-sm-8">
										<input type="text" readonly="readonly" class="form-control comment_disabled"
											name="phone">
									</div>
								</div>
								<div class="form-group col-lg-12 col-md-12 col-sm-12"
									style="margin-top: 15px; margin-left: 0px">
									<label class="col-sm-1 control-label no-padding-right">备注</label>
									<div class="col-sm-11">
										<textarea class="form-control content" rows="3"
											name="memo"
											style="width: 668px; height: 240px;"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="clearfix form-group" style="margin: 40px 0px;">
						<div class="col-sm-3 col-xs-3 col-sm-offset-4  col-xs-offset-3">
							<button type="button" onclick="tuichajia()"
								class="btn btn-primary btn-lg col-sm-6">确定</button>
						</div>

						<div class="col-sm-3  col-xs-3">
							<button type="button" class="btn btn-danger btn-lg col-sm-6"
								data-dismiss="modal">取消</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>



<script src="${ctx_static }/home/serviceCenter/js/changeClass.js?v=<%=Math.random() %>"></script>
