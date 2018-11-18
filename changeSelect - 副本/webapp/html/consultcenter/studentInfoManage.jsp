<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>
<link rel="stylesheet" href="${ctx_static }/home/consultcenter/css/studentInfoManage.css">

<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons"></div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body clearfix">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                <input class="form-control" placeholder="姓名/电话" type="text" id="searchVal" name="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                <i class="fa fa-search"></i> 搜索
                                </a>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                            <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <!-- <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="javascript:exportPDF();">导出PDF</a></li>
                                    <li><a href="javascript:exportExcel();">导出EXCEL</a></li>
                                    <li><a href="javascript:exportCSV();">导出CSV</a></li>
                                </ul> -->
                            </div>
                            <%-- <shiro:hasPermission name="consultInfoManage:add"> --%>
                            <button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target="#addUsers">
                            	<i class="fa fa-plus"></i> 新增
                            </button>
                            <%-- </shiro:hasPermission> --%>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="usersList" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                	<th>
                                        <label>
                                            <input type="checkbox" class="checkAll">
                                            <span class="text"></span>
                                        </label>
                                    </th>
                                    <th>姓名</th>
                                    <th>性别</th>
                                    <th>年龄</th>
                                    <th>民族</th>
                                    <th>电话</th>
                                    <th>电话归属地</th>
                                    <th>毕业院校</th>
                                    <th>最高学历</th>
                                    <th>专业</th>
                                    <th>微信</th>
                                    <th>QQ</th>
                                    <th>紧急联系人</th>
                                    <th>紧急联系方式</th>
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

<!--创建学员信息-->
<div class="modal fade addInquiries" id="addUsers" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">创建学员信息</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="users" method="post">
                	<!-- 学员信息 --> 
                	<div class="coacheeInfo col-sm-12 no-padding userInfo">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="tel" class="form-control phone" name="studentPhone" onblur="studentPhoneSelect()">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话归属地
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
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
								                            <button type="button" class="btn btn-primary btn-sm confirm-btn"  style="position:relative;z-index:99;">确定</button>
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
	                        <label class="control-label col-sm-5 no-padding-right">姓名
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="studentName">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">性别</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="studentSex" class="form-control">
	                                <option value="0">男</option>
	                                <option value="1">女</option>
	                            </select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">微信</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="weChat">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">年龄</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="age">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">QQ</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="tengXun">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">最高学历</label>
	                        <div class="col-sm-7 no-padding-right"">
	                            <select name="studentAttrId3" id="studentAttrId3" class="form-control studentAttrId3"></select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">专业</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input name="byZy" id="byZy" class="form-control byZy">
	                            </input>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">民族</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select class="form-control chosen-select" id="nations" tabindex="1" name="nations" data-placeholder="--请选择--" ></select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">毕业院校</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="bySchool">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">紧急联系人</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="emergencyContact">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-6 no-padding-right contact-way padding-right-5">紧急联系人方式</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="emergencyContactMode">
	                        </div>
	                    </div>
                    </div>
                    
                    <div class="form-group col-sm-12 modal-footer no-margin-left">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">创建
                            </button>
                        </div>
                           <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消 </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--查看-->
<div class="modal fade viewInfo" id="viewInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">学员信息</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix">
                	<!-- 学员信息 --> 
                	<div class="coacheeInfo col-sm-12 no-padding">
	                 	<div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control studentPhoneView" name="studentPhoneView" id="studentPhoneView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话归属地</label>
	                        <div class="col-sm-7">
	                           <input type="text" class="form-control phoneBelongView" value="" id="phoneBelongView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">姓名</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control studentNameView" name="studentNameView" id="studentNameView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">性别</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control studentSexView" name="studentSexView" id="studentSexView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">微信</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control wechatView" name="wechatView" id="wechatView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">年龄</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control ageView" name="ageView" id="ageView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">QQ</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control tengXunView" name="tengXunView" id="tengXunView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">最高学历</label>
	                        <div class="col-sm-7">
	                           <input type="text" class="form-control highestEducationView" value="" id="highestEducationView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">专业</label>
	                        <div class="col-sm-7">
	                            <input name="majorNameView" id="majorNameView" class="form-control majorIdView" disabled>
	                            </input>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">民族</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control" name="nationView" id="nationView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">毕业院校</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control" name="graduateInstitutionsView" id="graduateInstitutionsView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">紧急联系人</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control" name="emergencyContactView" id="emergencyContactView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-6 no-padding-right contact-way">紧急联系人方式</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control" name="emergencyContactModeView" id="emergencyContactModeView" disabled>
	                        </div>
	                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 编辑 -->
<div class="modal fade editUser" id="editUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">编辑学员信息</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="editUser" method="post">
                	<!-- 学员信息 --> 
                	<div class="coacheeInfo col-sm-12 no-padding userInfo">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="tel" class="form-control phone" name="studentPhone" onblur="studentPhoneSelect()">
	                             <input type="hidden" class="form-control" name="studentInfoManageId" >
	                        </div>
	                    </div>
	                    
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话归属地
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
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
								                            <button type="button" class="btn btn-primary btn-sm confirm-btn"  style="position:relative;z-index:99;">确定</button>
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
	                        <label class="control-label col-sm-5 no-padding-right">姓名
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="studentName">
	                        </div>
	                    </div>
	                    
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">性别</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="studentSex" class="form-control">
	                                <option value="0">男</option>
	                                <option value="1">女</option>
	                            </select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">微信</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="weChat">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">年龄</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="age">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">QQ</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="tengXun">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">最高学历</label>
	                        <div class="col-sm-7 no-padding-right"">
	                            <select name="studentAttrId3" id="studentAttrId3s" class="form-control studentAttrId3"></select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">专业</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input name="byZy" id="byZy" class="form-control byZy">
	                            </input>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">民族</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select class="form-control chosen-select" id="nations1" tabindex="1" name="nations" data-placeholder="--请选择--" ></select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">毕业院校</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="bySchool">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">紧急联系人</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="emergencyContact">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-6 no-padding-right contact-way padding-right-5">紧急联系人方式</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="emergencyContactMode">
	                        </div>
	                    </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer no-margin-left">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal" data-backdrop="static">确定
                            </button>
                        </div>
                           <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消 </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--下拉框插件-->
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>
<script src="${ctx_static }/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
<script src="${ctx_static }/home/consultcenter/js/studentInfoManage.js"></script>