<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/>
    <title>中和教育集团</title>
	<%@ include file="../common/public_header_main.jsp"%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" href="${ctx_static }/dep/assets/img/favicon.png" type="image/x-icon">

    <!--Basic Styles-->
    <link href="${ctx_static }/dep/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link id="bootstrap-rtl-link" href="" rel="stylesheet"/>
    <link href="${ctx_static }/dep/assets/css/font-awesome.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
    <link rel="stylesheet" href="${ctx_static}/dep/assets/css/dataTables.bootstrap.css"/>
	<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>
	<link rel="stylesheet" href="${ctx_static}/dep/toastr/toastr.min.css"/>

    <!--Beyond styles-->
    <link id="beyond-link" href="${ctx_static }/dep/assets/css/beyond.min.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx_static }/dep/assets/css/animate.min.css" rel="stylesheet"/>
    <link id="skin-link" href="" rel="stylesheet" type="text/css"/>
    <link href="${ctx_static }/common/css/common.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx_static }/home/consultcenter/css/infoManagement.css">
    <script src="${ctx_static }/dep/assets/js/jquery-2.0.3.min.js"></script>
    <script src="${ctx_static }/dep/assets/js/skins.js"></script>
    
    <!--Basic Scripts-->
<script src="${ctx_static }/dep/assets/js/bootstrap.min.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-timepicker.js"></script>

<!--Beyond Scripts-->
<script src="${ctx_static }/dep/assets/js/beyond.min.js"></script>

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<%-- <script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script> --%>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<!--富文本编辑器-->
<!-- kindeditor -->

<!--表单验证插件-->
<script src="${ctx_static }/dep/assets/js/validation/bootstrapValidator.js"></script>
<script src="${ctx_static }/dep/toastr/toastr.min.js"></script>
<!--Page Related Scripts-->
<script src="${ctx_static }/dep/assets/js/datatable/jquery.dataTables.min.js"></script>
<script src="${ctx_static }/dep/assets/js/datatable/ZeroClipboard.js"></script>
<script src="${ctx_static }/dep/assets/js/datatable/dataTables.tableTools.min.js"></script>
<script src="${ctx_static }/dep/assets/js/datatable/dataTables.bootstrap.min.js"></script>

<script src="${ctx_static }/home/consultcenter/js/consultinfoIllegal.js"></script>
</head>
<!-- /Head -->
<!-- Body -->

<body>
<!-- Loading Container -->
<div class="loading-container">
    <div class="loading-progress">
        <div class="rotator">
            <div class="rotator">
                <div class="rotator colored">
                    <div class="rotator">
                        <div class="rotator colored">
                            <div class="rotator colored"></div>
                            <div class="rotator"></div>
                        </div>
                        <div class="rotator colored"></div>
                    </div>
                    <div class="rotator"></div>
                </div>
                <div class="rotator"></div>
            </div>
            <div class="rotator"></div>
        </div>
        <div class="rotator"></div>
    </div>
</div>
<!--  /Loading Container -->
            <!-- Page Header -->
            <div class="page-header position-relative">
                <div class="header-title">
                    <h1 class="title">
<!--                         信息管理 -->
                    </h1>
                </div>
                <!--Header Buttons-->
                <div class="header-buttons">
                    <!-- <a class="sidebar-toggler" href="#">
                        <i class="fa fa-arrows-h"></i>
                    </a>
                    <a class="refresh" id="refresh-toggler" href="">
                        <i class="glyphicon glyphicon-refresh"></i>
                    </a>
                    <a class="fullscreen" id="fullscreen-toggler" href="#">
                        <i class="glyphicon glyphicon-fullscreen"></i>
                    </a> -->
                </div>
                <!--Header Buttons End-->
            </div>
            <!-- /Page Header -->
            <!-- Page Body -->
            <div class="page-body">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                <div class="widget">
                                    <div class="widget-header">
                                        <!-- <div class="widget-buttons">
                                            <a href="#" data-toggle="config">
                                                <i class="fa fa-cog"></i>
                                            </a>
                                            <a href="#" data-toggle="maximize">
                                                <i class="fa fa-expand"></i>
                                            </a>
                                            <a href="#" data-toggle="collapse">
                                                <i class="fa fa-minus"></i>
                                            </a>
                                            <a href="#" data-toggle="dispose">
                                                <i class="fa fa-times"></i>
                                            </a> -->
                                        </div>
                                        <!--Widget Buttons-->
                                    </div>
                                    <!--Widget Header-->
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div class="row row_padding form-horizontal">
                                                <div class="col-md-4 col-sm-3 col-xs-12">
                                                    <div class="form-group">
                                                        <label class="col-lg-2 col-md-3 col-sm-3 control-label no-padding-right">日期</label>
                                                        <div class="col-lg-10 col-md-9 col-sm-9">
                                                            <div class="controls">
                                                                <div class="input-group date">
                                                                    <input class="form-control" id="queryDate"
                                                                           type="text">
                                                                    <span class="input-group-addon"><i
                                                                            class="fa fa-calendar"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-5 col-sm-6 col-xs-12">
                                                    <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                                        <input class="form-control" placeholder="姓名/手机号"
                                                         id="searchVal"  type="text">
                                                    </div>
                                                    <div class="form-group col-md-3 col-sm-4" style="margin-left:10px;">
                                                         
<!--                                                                 <span class="btn btn-blue form-control search-btn">搜索</span> -->
                                                        
															<span  class="btn btn-primary" onclick="javascript:DataTable.init();">搜索</span>
									
                                                    </div>
                                                </div>


                              <!--                   <div class="col-md-3 col-sm-3 col-xs-12 btn-group">
                                                    <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                                                    <div class="btn-group">
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
                                                    <button class="btn increase  pull-right col-sm-4"
                                                            data-toggle="modal" data-backdrop="static"
                                                            data-target="#addInquiries">新增
                                                        <i class="fa fa-plus-square-o right"></i></button>
                                                </div> -->
                                            </div>
                                            <div class="dataTables_wrapper form-inline no-footer">
                                                <div class="table-scrollable">
                                                    <table class="table table-striped table-hover table-bordered dataTable no-footer" id="illegalInfoTable">
                                                        <thead>
                                                        <tr role="row">
                                                            <!-- <th>
                                                                <label>
                                                                    <input type="checkbox" class="checkAll">
                                                                    <span class="text"></span>
                                                                </label>
                                                            </th>
                                                            <th>序号<span class="fa indicator fa-unsorted"></span></th> -->
                                                            <th>创建日期<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>信息量归属<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>品牌名称<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>咨询者类型名称<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>媒体来源名称<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>姓名<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>手机号<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>项目<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>级别<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>录入失败原因<span class="fa indicator fa-unsorted"></span></th>
                                                            <th>操作</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                        <!--                 <tr>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox" class="checkAll">
                                                                    <span class="text"></span>
                                                                </label>
                                                            </td>
                                                            <td>1</td>
                                                            <td>2016-10-10</td>
                                                            <td>质检部</td>
                                                            <td>待沟通</td>
                                                            <td>王大伟</td>
                                                            <td>王大伟</td>
                                                            <td>咨询者类型</td>
                                                            <td>北京分校</td>
                                                            <td>品牌</td>
                                                            <td>姓名</td>
                                                            <td>课程</td>
                                                            <td>级别</td>
                                                            <td>
                                                                <a href="#" class="btn btn-warning btn-xs edit"
                                                                   data-toggle="modal" data-target="#viewInfo"
                                                                   data-backdrop="static"><i
                                                                        class="fa fa-folder-open-o"></i> 查看</a>
                                                                <a href="#" class="btn btn-danger btn-xs delete">
                                                                    <i class="fa fa-trash-o"></i> 删除</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox" class="checkAll">
                                                                    <span class="text"></span>
                                                                </label>
                                                            </td>
                                                            <td>2</td>
                                                            <td>2016-10-10</td>
                                                            <td>质检部</td>
                                                            <td>
                                                                已沟通
                                                            </td>
                                                            <td>王大伟</td>
                                                            <td>王大伟</td>
                                                            <td>咨询者类型</td>
                                                            <td>北京分校</td>
                                                            <td>品牌</td>
                                                            <td>姓名</td>
                                                            <td>课程</td>
                                                            <td>级别</td>
                                                            <td>
                                                                <a href="#" class="btn btn-warning btn-xs edit"
                                                                   data-toggle="modal" data-target="#viewInfo"
                                                                   data-backdrop="static"><i
                                                                        class="fa fa-folder-open-o"></i> 查看</a>
                                                                <a href="#" class="btn btn-danger btn-xs delete">
                                                                    <i class="fa fa-trash-o"></i> 删除</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox" class="checkAll">
                                                                    <span class="text"></span>
                                                                </label>
                                                            </td>
                                                            <td>3</td>
                                                            <td>2016-10-10</td>
                                                            <td>质检部</td>
                                                            <td>
                                                                报名
                                                            </td>
                                                            <td>王大伟</td>
                                                            <td>王大伟</td>
                                                            <td>咨询者类型</td>
                                                            <td>北京分校</td>
                                                            <td>品牌</td>
                                                            <td>姓名</td>
                                                            <td>课程</td>
                                                            <td>级别</td>
                                                            <td>
                                                                <a href="#" class="btn btn-warning btn-xs edit"
                                                                   data-toggle="modal" data-target="#viewInfo"
                                                                   data-backdrop="static"><i
                                                                        class="fa fa-folder-open-o"></i> 查看</a>
                                                                <a href="#" class="btn btn-danger btn-xs delete">
                                                                    <i class="fa fa-trash-o"></i> 删除</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox" class="checkAll">
                                                                    <span class="text"></span>
                                                                </label>
                                                            </td>
                                                            <td>4</td>
                                                            <td>2016-10-10</td>
                                                            <td>质检部</td>
                                                            <td>
                                                                预约
                                                            </td>
                                                            <td>王大伟</td>
                                                            <td>王大伟</td>
                                                            <td>咨询者类型</td>
                                                            <td>北京分校</td>
                                                            <td>品牌</td>
                                                            <td>姓名</td>
                                                            <td>课程</td>
                                                            <td>级别</td>
                                                            <td>
                                                                <a href="#" class="btn btn-warning btn-xs edit"
                                                                   data-toggle="modal" data-target="#viewInfo"
                                                                   data-backdrop="static"><i
                                                                        class="fa fa-folder-open-o"></i> 查看</a>
                                                                <a href="#" class="btn btn-danger btn-xs delete">
                                                                    <i class="fa fa-trash-o"></i> 删除</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox" class="checkAll">
                                                                    <span class="text"></span>
                                                                </label>
                                                            </td>
                                                            <td>5</td>
                                                            <td>2016-10-10</td>
                                                            <td>质检部</td>
                                                            <td>
                                                                订座
                                                            </td>
                                                            <td>王大伟</td>
                                                            <td>王大伟</td>
                                                            <td>咨询者类型</td>
                                                            <td>北京分校</td>
                                                            <td>品牌</td>
                                                            <td>姓名</td>
                                                            <td>课程</td>
                                                            <td>级别</td>
                                                            <td>
                                                                <a href="#" class="btn btn-warning btn-xs edit"
                                                                   data-toggle="modal" data-target="#viewInfo"
                                                                   data-backdrop="static"><i
                                                                        class="fa fa-folder-open-o"></i> 查看</a>
                                                                <a href="#" class="btn btn-danger btn-xs delete">
                                                                    <i class="fa fa-trash-o"></i> 删除</a>
                                                            </td>
                                                        </tr> -->

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
            <!-- /Page Content -->
        </div>
        <!-- /Page Container -->
        <!-- Main Container -->
    </div>
</div>

<!--创建咨询量-->
<div class="modal fade addInquiries" id="editInquiries" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">创建咨询量</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="inquiries" method="post"> 
                	<input type="hidden" value="" name="infoManageId">
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">信息归属地
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <select id="departmentId1" name="departmentId1" class="form-control departmentId1 chosen-select" data-placeholder="--请选择--" tabindex="1">
                            </select>
                           <span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">电话归属地
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input id="phoneBelong" name="phoneBelong" class="form-control phoneBelong" placeholder="--请选择--">
                        	<div class="attribution">
							    <div class="modal-dialog modal-sm">
							        <div class="modal-content">
							            <div class="attribution-body">
							                <div class="form-horizontal">
							                    <div class="form-group">
							                        <label class="control-label col-sm-3 no-padding-right">省份</label>
							                        <div class="col-sm-8">
							                            <select name="province"  id="province" class="form-control province chosen-select" data-placeholder="--请选择--" tabindex="1">
							                            </select>
							                        </div>
							                    </div>
							                    <div class="form-group">
							                        <label class="control-label col-sm-3 no-padding-right">城市</label>
							                        <div class="col-sm-8">
							                            <select name="city" id="city" class="form-control city chosen-select" data-placeholder="--请选择--" tabindex="1">
							                                <option value="0">--请选择--</option>
							                            </select>
							                        </div>
							                    </div>
							                    <div class="form-group modal-footer">
							                        <div class="col-sm-2 col-sm-offset-3 margin-right-20">
							                            <button type="button" class="btn btn-primary btn-sm confirm-btn">确定</button>
							                        </div>
													<div class="col-sm-2">
							                            <button type="button" class="btn btn-danger btn-sm cancel-btn">取消</button>
							                        </div>
							                    </div>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
                        </div>
                    </div>

                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">招生品牌
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <select name="brandId" id="brandId" class="form-control">
                            </select>
                            <span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">咨询者类型
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <select name="studentAttrId2" id="studentAttrId2" class="form-control studentAttrId2">
                            </select>
                            <span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">媒体来源
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <select name="studentAttrId1" id="studentAttrId1" class="form-control studentAttrId1">
                            </select>
                            <span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">关键词
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="keyword" id="keyword">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话页面链接</label>
                        <div class="pull-left col-md-9 col-sm-9">
                            <input type="tel" class="form-control" name="pageUrl">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">姓名
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="studentName">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">电话
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input type="tel" class="form-control phone" name="studentPhone">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">性别</label>
                        <div class="col-sm-7">
                            <select name="studentSex" class="form-control">
                            	<option value="-1">请选择</option>
                                <option value="0">男</option>
                                <option value="1">女</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">微信</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="weChat">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">年龄</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="age">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">QQ</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="tengXun">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">咨询课程
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <select name="projectId" id="projectId" class="form-control projectId chosen-select">
                            </select>
                            <span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">课程级别</label>
                        <div class="col-sm-7">
                            <select name="projectLevelId" id="projectLevelId" class="form-control projectLevelId">
                            </select>
                             <span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">最高学历</label>
                        <div class="col-sm-7">
                            <!-- <input name="highestEducation" id="highestEducation" class="form-control highestEducation">
                            </input> -->
                            <select name="highestEducationName" id="highestEducationName" class="form-control highestEducationName"></select>
                        	<span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">专业</label>
                        <div class="col-sm-7">
                            <input name="majorName" id="majorName" class="form-control majorId">
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">民族</label>
                        <div class="col-sm-7">
                            <select class="form-control chosen-select" id="nations" data-placeholder="--请选择--" tabindex="1"></select>
                        	<span style="color:red" class="errorInfo"></span>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">毕业院校</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="graduateInstitutions">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">紧急联系人</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="emergencyContact">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-6 no-padding-right contact-way padding-right-5">紧急联系人方式</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="emergencyContactMode">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">备注</label>
                        <div class="col-md-9 col-sm-9">
                            <input type="text" class="form-control notes" name="notes" id="notes">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话记录<span id="talk"> </span></label>
                        <div class="col-sm-10">
                        
                           <!-- 富文本编辑器 -->
						  <textarea name="conversation" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          
                          <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="conversation"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 
								});
							});
                          </script>                           
                           
                    </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button id="validateBtn" type="submit" class="btn btn-primary form-control creation-btn" 
                                    >确定
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
<!--错误提示-->
<div class="modal fade" id="errorPrompt" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">错误提示</span>
            </div>
            <div class="modal-body clearfix">
                <p>该学员同项目电话号码已经由王伟在2016/10/24 13:52:00录入,是否添加新咨询课程?</p>
                <div class="row modal-footer">
                    <div class="col-sm-6">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">否
                        </button>
                    </div>

                    <div class="col-sm-6">
                        <button type="button" class="btn btn-primary margin-right-20 confirm-btn" data-toggle="modal"
                                data-backdrop="static"
                                data-target="#addRepeatedPhone">是
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>

</html>

