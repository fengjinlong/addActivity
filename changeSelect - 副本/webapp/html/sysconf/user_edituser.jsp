<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/user.css">
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/demo.css">
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">

<style>
.help-block{
	position: absolute;
}
</style>
<body>

            <div class="page-body page-wrapper">
                <div class="widget addUser">
                    <div class="widget-header bordered-bottom bordered-blue">
                 		<span class="widget-caption">用户编辑</span>
                 		<div class="widget-buttons">
                 		<a href="#" data-toggle="config"></a>
                 		<a href="${ctx }/user/index" title="返回">
                 			<i class="fa fa-reply"></i>
                 		</a>
					</div>
            		</div>
                    <div class="widget-body clearfix">
                    <div class="well">
           		<div class="tabbable">
                    <ul class="nav nav-tabs tabs-flat">
                        <li class="active">
                            <a data-toggle="tab" href="#essential" aria-expanded="true">
                               	基本信息
                            </a>
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#rests" aria-expanded="false">
                               	其他信息
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content tabs-flat">
                        <div id="essential" class="tab-pane in active">
                           <div class="addUser-content" id="step1" style="padding-bottom:0;">
                        <form name="mainForm" id="mainForm" method="post" class="form-horizontal" action="${ctx }/user/addNewUser">
                            <div class="step-pane">
                                <h3 class="step-title">编辑基本信息</h3>
                                <div class="basic-info row">
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">真实姓名<span class="control-label mandatory">*</span></label>
                                            <div class="col-sm-7">
                                                <input type="text" value="${user.realName }" required="required" name="realName" class="form-control">
                                                <input id="userId" name="userId" hidden value="${user.userId }" />
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">姓名全拼<span class="mandatory control-labe">*</span></label>
                                            <div class="col-sm-7">
                                                <input name="spell" value="${user.spell }" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">别名</label>
                                            <div class="col-sm-7">
                                                <input name="alias" value="${user.alias }" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">年龄<span class="mandatory control-label">*</span></label>
                                            <div class="col-sm-7">
                                                <input type="text" name="age" value="${user.age }" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">性别<span class="mandatory control-label">*</span></label>
                                            <div class="radio pull-left">
                                            	<c:if test="${user.gender eq '1' }">
                                            		<c:set var="nan" value="checked"/>
                                            	</c:if>
                                            	<c:if test="${user.gender eq '2' }">
                                            		<c:set var="nv" value="checked"/>
                                            	</c:if>
                                                <label>
                                                    <input ${nan } value="1" name="gender" type="radio" class="">
                                                    <span class="text">男</span>
                                                </label>
                                                <label>
                                                    <input ${nv } value="2" name="gender" type="radio" class="">
                                                    <span class="text">女</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">民族</label>
                                            <div class="col-sm-7">
                                            	<c:if test="${user.nationality eq '0' }">
                                            		<c:set var="nationality0" value="selected"/>
                                            	</c:if>
                                            	<c:if test="${user.nationality eq '1' }">
                                            		<c:set var="nationality1" value="selected"/>
                                            	</c:if>
                                            	<c:if test="${user.nationality eq '2' }">
                                            		<c:set var="nationality2" value="selected"/>
                                            	</c:if>
                                            	<c:if test="${user.nationality eq '3' }">
                                            		<c:set var="nationality3" value="selected"/>
                                            	</c:if>
                                                <select name="nationality" class="form-control">
                                                    <option ${nationality0 } value="0">汉族</option>
                                                    <option ${nationality1 } value="1">苗族</option>
                                                    <option ${nationality2 } value="2">满族</option>
                                                    <option ${nationality3 } value="3">彝族</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">手机号码<span class="control-label mandatory">*</span></label>
                                            <div class="col-sm-7">
                                                <input  value="${user.mobile }" name="mobile" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">QQ号</label>
                                            <div class="col-sm-7">
                                                <input type="text" name="qq" value="${user.qq }" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">微信号</label>
                                            <div class="col-sm-7">
                                                <input type="text" name="wechat" value="${user.wechat }" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">所属公司<span class="control-label mandatory">*</span></label>
                                            <div class="col-sm-7">
                                                <input value="${user.companyName }" readonly onclick="showMenu('company_id',1)" id="company_id" name="company_id" class="form-control"></input>
                                                <input hidden value="${user.companyId }" id="companyId" name="companyId" ></input>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">所属部门<span class="control-label mandatory">*</span></label>
                                            <div class="col-sm-7">
                                            	<input value="${user.departmentName }"readonly onclick="showMenu('department_id',2)" id="department_id" name="department_id" class="form-control"></input>
                                            	<input hidden value="${user.departmentId }"  id="departmentId" name="departmentId" ></input>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4 working-team">所属职位<span class="control-label mandatory">*</span></label>
                                            <div class="col-sm-7">
                                                <input  value="${user.dutyName }" onclick="showMenu('duty_id',3)" id="duty_id" name="duty_id" type="text" class="form-control">
                                                <input hidden value="${user.dutyId }" id="dutyId" name="dutyId" ></input>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">所属角色<span class="control-label mandatory">*</span></label>
                                            <div class="col-sm-7">
                                                <input value="${user.roleName }" readonly onclick="showMenu('role_id',4)" id="role_id" name="role_id" type="text" class="form-control">
                                                <input hidden value="${user.roleId }"  id="roleId" name="roleId" ></input>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">办公电话</label>
                                            <div class="col-sm-7">
                                                <input type="text" value="${user.officeTel}" name="officeTel" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">分机号</label>
                                            <div class="col-sm-7">
                                                <input value="${user.telephone }" name="telephone" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="control-label col-sm-4">邮箱地址</label>
                                            <div class="col-sm-7">
                                                <input name="email" value="${user.email }" type="text" class="form-control">
                                            </div>
                                        </div>
                                        
                                            <div class="form-group col-sm-4">
                                                <label class="control-label col-sm-4">登录账号<span class="mandatory control-label">*</span></label>
                                                <div class="col-sm-7">
                                                    <input value="${user.account }" name="account" type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group col-sm-4">
                                            		<label class="control-label col-sm-4">查询范围</label>
                                            		<div class="col-sm-7">
                                            		
	                                            	<c:if test="${user.securityLevel eq '1' }">
	                                            		<c:set var="securityLevel1" value="selected"/>
	                                            	</c:if>
	                                            	<c:if test="${user.securityLevel eq '2' }">
	                                            		<c:set var="securityLevel2" value="selected"/>
	                                            	</c:if>
	                                            	<c:if test="${user.securityLevel eq '3' }">
	                                            		<c:set var="securityLevel3" value="selected"/>
	                                            	</c:if>
                                               		<select name="securityLevel" class="form-control">
                                                    	<option ${securityLevel1 } value="1">只看自己</option>
                                                    	<option ${securityLevel2 } value="2">查看全部</option>
                                                    	<%-- <option ${securityLevel3 } value="3">下属部门(包括同级部门)</option> --%>
                                                    </select>
                                                    </div>
                                            </div>
                                            <div class="form-group col-sm-12 dentifying">
                                            	<div class="col-sm-4">
                                            	 <i>注</i>
                                                <span class="mandatory">"*"</span> 标识为必填项
                                                </div>
                                            	<div class="col-sm-6"> 
                                            	<button type="submit" class="btn btn-blue btn-lg btn-next">
					                                                保存
					                        	</button>
					                        	</div>
                                            </div>
                                           
                                </div>
                            </div>
                            </form>
                        </div>
                           
                        </div>
                        <div id="rests" class="tab-pane">
                            
                            <div class="addUser-content" id="step2">
                        	<form name="bakForm" id="bakForm" method="post" class="form-horizontal">
                            <div class="step-pane">
                                    <ul class="timeline">
                                        <li class="timeline-inverted">
                                            <div class="timeline-badge blue">
                                                <i class="fa fa-edit font-120"></i>
                                            </div>
                                            <div class="timeline-panel">
                                                <div class="timeline-header bordered-bottom bordered-blue">
                                                    <h3 class="step-title">
                                                        	编写档案基础信息
                                                            <span class="collapse-btn"><i
                                                                    class="fa fa-angle-down pull-right"></i></span>
                                                    </h3>
                                                </div>
                                                <div class="timeline-body" style="overflow:hidden;">
                                                    <div class="form-group col-sm-6">
                                                    	<!-- 隐藏域做特殊表示字段处理 -->
                                                    	 <input id="merchantsBankCard" name="merchantsBankCard" hidden/>
                                                    	 <input id="jobChange" name="jobChange" hidden/>
                                                    	 <input id="eduBackground" name="eduBackground" hidden/>
                                                    	 <input id="workHistory" name="workHistory" hidden/>
                                                    	 <input id="userId" name="userId" hidden value="${user.userId }" />
                                                        <label class="control-label col-sm-4">身份证号<span class="control-label mandatory">*</span></label>
                                                        <div class="col-sm-7">
                                                            <input value="${user.idCard }" name="idCard"  type="text" class="form-control">
                                                        </div>      
                                                    </div>
                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">身份证有效期<span class="dangan control-label mandatory">*</span></label>
                                                        <div class="col-sm-7">
                                                            <input value="${fn:substring(user.expirDate,0,10) }" class="form-control date-picker" name="expirDate" id="expirDate" type="text" data-date-format="yyyy-mm-dd" >
                                                        </div>                                                        
                                                    </div>
                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">户口性质</label>
                                                        <div class="col-sm-7">
                                                        	<c:if test="${user.accountProperties eq '1' }">
                                                        		<c:set value="selected" var="accountProperties1"/>
                                                        	</c:if>
                                                        	<c:if test="${user.accountProperties eq '2' }">
                                                        		<c:set value="selected" var="accountProperties2"/>
                                                        	</c:if>
                                                            <select name="accountProperties" class="form-control">
                                                                <option ${accountProperties1 } value="1">城镇</option>
                                                                <option ${accountProperties2 }value="2">非城镇</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">在京居住地址</label>
                                                        <div class="col-sm-7">
                                                            <input value="${user.addressBj}"  name="addressBj" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-12">
                                                        <div data-toggle="distpicker">
                                                            <label class="control-label col-sm-2" style="margin-right: 20px;margin-left: -9px !important;">籍贯</label>
                                                            <div class="col-sm-3 no-padding-left" style="width:27%">
                                                                <!--<label class="sr-only" for="province2">省</label>-->
                                                                <select  name="province" class="form-control" id="province2" data-province="---- 选择省 ----">
                                                                	<option selected value="${user.province }">${user.provinceName }</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm-3 no-padding-left" style="width:24%">
                                                                <!--<label class="sr-only" for="city2">市</label>-->
                                                                <select name="city" class="form-control" id="city2" data-city="---- 选择市 ----">
                                                                	<option selected value="${user.city }">${user.cityName }</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm-3 no-padding-left" style="width:27%">
                                                                <!--<label class="sr-only" for="district2">区</label>-->
                                                                <select name="area" class="form-control" id="district2" data-district="---- 选择区 ----">
                                                                	<option selected value="${user.area }">${user.areaName }</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-12">
                                                            <label class="control-label col-sm-2" style="margin-left:-10px">详细地址</label>
                                                            <div class="col-sm-9 padding-right-5">
                                                                <input value="${user.nativePlace }"  name="nativePlace" type="text" class="form-control">
                                                            </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">政治面貌</label>
                                                        <div class="col-sm-7">
                                                        	<c:if test="${user.party eq '0' }">
                                                        		<c:set value="selected"  var="party0"></c:set>
                                                        	</c:if>
                                                        	<c:if test="${user.party eq '1' }">
                                                        		<c:set value="selected"  var="party1"></c:set>
                                                        	</c:if>
                                                        	<c:if test="${user.party eq '2' }">
                                                        		<c:set value="selected"  var="party2"></c:set>
                                                        	</c:if>
                                                            <select name="party" class="form-control">
                                                                <option ${party0 } value="0">党员</option>
                                                                <option ${party1 } value="1">团员</option>
                                                                <option ${party2 } value="2">群众</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">国籍</label>
                                                        <div class="col-sm-7">
                                                        	<c:if test="${user.nation eq '0' }">
                                                        		<c:set value="selected"  var="nation0"></c:set>
                                                        	</c:if>
                                                        	<c:if test="${user.nation eq '1' }">
                                                        		<c:set value="selected"  var="nation1"></c:set>
                                                        	</c:if>
                                                        	<c:if test="${user.nation eq '2' }">
                                                        		<c:set value="selected"  var="nation2"></c:set>
                                                        	</c:if>
                                                            <select name="nation" class="form-control">
                                                                <option ${nation0 } value="0">中国</option>
                                                                <option ${nation1 } value="1">韩国</option>
                                                                <option ${nation2 } value="2">日本</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">档案名称</label>
                                                        <div class="col-sm-7">
                                                            <input name="fileNumber" type="text" class="form-control" value="${user.fileNumber }">
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="col-sm-4 control-label">入职时间*</label>
                                                        <div class="col-sm-7">
                                                            <div class="input-group">
                                                                <input id="entryTime" name="entryTime" class="form-control date-picker"
                                                                        type="text"
                                                                       data-date-format="yyyy-MM-dd" value="${fn:substring(user.entryTime,0,10) }">
			                                                    <span class="input-group-addon">
												        	        <i class="fa fa-calendar"></i>
												                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-12">
                                                        <div class="col-sm-6">
                                                            <label class="col-sm-4 control-label" style="margin-left:-10px">合同开始日期</label>
                                                            <div class="col-sm-7 padding-right-5">
                                                                <div class="controls">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control" name="contractStartTime1"
                                                                               value="${fn:substring(user.contractStartTime1,0,10) }" id="contractStartTime1">
                                                                    <span class="input-group-addon"><i
                                                                            class="fa fa-calendar"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6 padding-right-5">
                                                            <label class="col-sm-4 control-label margin-left-5">合同结束日期</label>
                                                            <div class="col-sm-7">
                                                                <div class="controls">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control" name="contractEndTime1"
                                                                               value="${fn:substring(user.contractEndTime1,0,10) }" id="contractEndTime1">
                                                                    <span class="input-group-addon"><i
                                                                            class="fa fa-calendar"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="timeline-inverted">
                                            <div class="timeline-badge yellow">
                                                <i class="fa fa-map-marker font-120"></i>
                                            </div>
                                            <div class="timeline-panel">
                                                <div class="timeline-header bordered-bottom bordered-blue">
                                                    <h3 class="step-title">
                                                        社保及公积金信息
                                                            <span class="collapse-btn"><i
                                                                    class="fa fa-angle-down pull-right"></i></span>
                                                    </h3>
                                                </div>
                                                <div class="timeline-body" style="overflow:hidden;">
                                                    <div class="form-group col-sm-6">
                                                        <label class="col-sm-4 control-label">社保增员时间*</label>
                                                        <div class="col-sm-7">
                                                            <div class="input-group">
                                                                <input id="securityAddTime" name="securityAddTime" class="form-control date-picker"
                                                                        type="text"
                                                                       data-date-format="yyyy-mm-dd" value="${fn:substring(user.securityAddTime,0,10) }">
			                                                    <span class="input-group-addon">
												        	        <i class="fa fa-calendar"></i>
												                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="col-sm-4 control-label">社保减员时间*</label>
                                                        <div class="col-sm-7">
                                                            <div class="input-group">
                                                                <input id="securityLostTime" name="securityLostTime" class="form-control date-picker"
                                                                       type="text"
                                                                       data-date-format="yyyy-mm-dd" value="${fn:substring(user.securityLostTime,0,10) }">
			                                                    <span class="input-group-addon">
												        	        <i class="fa fa-calendar"></i>
												                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">社保账号</label>
                                                        <div class="col-sm-7">
                                                            <input name="securityAccount" type="text" class="form-control" value="${user.securityAccount }">
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-sm-6">
                                                        <label class="control-label col-sm-4">公积金账号</label>
                                                        <div class="col-sm-7">
                                                            <input name="fundAccount" type="text" class="form-control" value="${user.fundAccount}">
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                        <li class="timeline-inverted">
                                            <div class="timeline-badge purple">
                                                <i class="glyphicon glyphicon-credit-card font-120"></i>
                                            </div>
                                            <div class="timeline-panel">
                                                <div class="timeline-header bordered-bottom bordered-blue">
                                                    <h3 class="step-title">
                                                        工资卡信息
                                                            <span class="collapse-btn"><i
                                                                    class="fa fa-angle-down pull-right"></i></span>
                                                    </h3>

                                                </div>
                                                <div class="form-group timeline-body">
                                                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                        <thead>
                                                        <tr role="row">
                                                            <th class="text-center"><span onclick="gzkAdd()" class="glyphicon glyphicon-plus-sign primary"></span></th>
                                                            <th class="text-center">开户行</th>
                                                            <th class="text-center">卡号</th>
                                                            <th class="text-center">备注</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody id="gzkBody">
                                                        <c:forEach items="${merchantsBankCard }" var="mbc" varStatus="gzk">
                                                        	<c:set value="${gzk.index+1 }" var="gzkNum"></c:set>
                                                        	<c:if test="${mbc ne 'null' }">
		                                                        	<tr id="gzkTr${ fn:split(mbc.gzk_khh_id, '_')[2] }" class="odd">
		                                                            <td class="text-center">
																			<span onclick="gzkRemove('${ fn:split(mbc.gzk_khh_id, '_')[2] }')" class="glyphicon glyphicon-minus-sign danger"></span>
		                                                            </td>
		                                                            <td class="">
		                                                                <input value="${mbc.gzk_khh_value }"  id="${mbc.gzk_khh_id }" type="text" class="form-control input-sm">
		                                                            </td>
		                                                            <td class=" ">
		                                                                <input id="${mbc.gzk_num_id }" value="${mbc.gzk_num_value }" type="text" class="form-control input-sm">
		                                                            </td>
		                                                            <td class=" ">
		                                                                <input id="${mbc.gzk_bz_id }" value="${mbc.gzk_bz_value }"  type="text" class="form-control input-sm">
		                                                            </td>
	                                                        		</tr>
                                                       	 	</c:if>
                                                        </c:forEach>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="timeline-inverted">
                                            <div class="timeline-badge palegreen">
                                                <i class="fa fa-info-circle font-120"></i>
                                            </div>
                                            <div class="form-group timeline-panel">
                                                <div class="timeline-header bordered-bottom bordered-blue">
                                                    <h3 class="step-title">
                                                        异动信息
                                                            <span class="collapse-btn"><i
                                                                    class="fa fa-angle-down pull-right"></i></span>
                                                    </h3>
                                                </div>
                                                <div class="timeline-body">
                                                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                        <thead>
                                                        <tr role="row">
                                                            <th class="text-center"><span onclick="ydAdd()" class="glyphicon glyphicon-plus-sign primary"></span></th>
                                                            <th class="text-center">异动项目</th>
                                                            <th class="text-center">从由</th>
                                                            <th class="text-center">调至</th>
                                                            <th class="text-center">异动时间</th>
                                                            <th class="text-center">备注</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody id="ydBody">
                                                        
                                                        <c:forEach items="${jobChange }" var="job" varStatus="yd">
                                                        	<c:set value="${yd.index+1 }" var="ydNum"></c:set>
                                                        	<c:if test="${job ne 'null' }">
                                                        	<tr id="ydTr${ fn:split(job.yd_project_id, '_')[2] }" class="odd">
                                                            <td class="text-center">
																	<span onclick="ydRemove('${ fn:split(job.yd_project_id, '_')[2] }')" class="glyphicon glyphicon-minus-sign danger"></span>
                                                            </td>
                                                            <td class="">
                                                                <input value="${job.yd_project_value }"  id="${job.yd_project_id }" type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${job.yd_from_id }" value="${job.yd_from_value }" type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${job.yd_to_id }" value="${job.yd_to_value }"  type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
																		<span class="input-icon icon-right">
                                                                            <input id="${job.yd_time_id }"  class="form-control date-picker"
                                                                                    type="text"
                                                                                   data-date-format="yyyy-mm-dd"
                                                                                   value="${job.yd_time_value }"
                                                                                   placeholder="2016-10-1">
                                                                            <i class="fa fa-calendar"></i>
                                                                        </span>
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${job.yd_bz_id }"  value="${job.yd_bz_value }" type="text" class="form-control input-sm">
                                                            </td>
                                                        </tr>
                                                        </c:if>
                                                        </c:forEach>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="timeline-inverted">
                                            <div class="timeline-badge blue">
                                                <i class="fa fa-map-marker font-120"></i>
                                            </div>
                                            <div class="form-group timeline-panel">
                                                <div class="timeline-header bordered-bottom bordered-blue">
                                                    <h3 class="step-title">
                                                        教育背景
                                                            <span class="collapse-btn"><i
                                                                    class="fa fa-angle-down pull-right"></i></span>
                                                    </h3>
                                                </div>
                                                <div class="timeline-body">
                                                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                        <thead>
                                                        <tr role="row">
                                                            <th class="text-center"><span onclick="jyAdd()" class="glyphicon glyphicon-plus-sign primary"></span></th>
                                                            <th class="text-center">学校名称</th>
                                                            <th class="text-center">学校地址</th>
                                                            <th class="text-center">学历级别</th>
                                                            <th class="text-center">专业名称</th>
                                                            <th class="text-center">起始时间</th>
                                                            <th class="text-center">结束时间</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody id="jyBody">
                                                        
                                                        <c:forEach items="${eduBackground }" var="eb" varStatus="jy">
                                                       	<c:set value="${jy.index+1 }" var="ebNum"></c:set>
                                                        <c:if test="${eb ne 'null' }">
                                                        	<tr id="jyTr${ fn:split(eb.jy_school_id, '_')[2] }" class="odd">
                                                            <td class="text-center">
																<span onclick="jyRemove('${ fn:split(eb.jy_school_id, '_')[2] }')" class="glyphicon glyphicon-minus-sign danger"></span>
                                                            </td>
                                                            <td class="">
                                                                <input value="${eb.jy_school_value }"  id="${eb.jy_school_id }" type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${eb.jy_address_id }" value="${eb.jy_address_value }" type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${eb.jy_level_id }" value="${eb.jy_level_value }"  type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${eb.jy_zy_id }" value="${eb.jy_zy_value }"   type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
																		<span class="input-icon icon-right">
                                                                            <input id="${eb.jy_stTime_id }"  class="form-control date-picker"
                                                                                    type="text"
                                                                                   data-date-format="yyyy-mm-dd"
                                                                                   value="${eb.jy_stTime_value }"
                                                                                   placeholder="2016-10-1">
                                                                            <i class="fa fa-calendar"></i>
                                                                        </span>
                                                            </td>
                                                            <td class=" ">
																		<span class="input-icon icon-right">
                                                                            <input  id="${eb.jy_edTime_id }"class="form-control date-picker"
                                                                                    type="text"
                                                                                   data-date-format="yyyy-mm-dd"
                                                                                   value="${eb.jy_edTime_value }"
                                                                                  placeholder="2016-10-1">
                                                                            <i class="fa fa-calendar"></i>
                                                                        </span>
                                                            </td>
                                                        </tr>
                                                        </c:if>
                                                        </c:forEach>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="timeline-inverted">
                                            <div class="timeline-badge danger">
                                                <i class="fa fa-map-marker font-120"></i>
                                            </div>
                                            <div class="timeline-panel">
                                                <div class="timeline-header bordered-bottom bordered-blue">
                                                    <h3 class="step-title">
                                                        工作履历
                                                            <span class="collapse-btn"><i
                                                                    class="fa fa-angle-down pull-right"></i></span>
                                                    </h3>

                                                </div>
                                                <div class="timeline-body">
                                                    <!--<i class="fa fa-plus-circle"></i>-->
                                                    <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                                        <thead>
                                                        <tr role="row">
                                                            <th class="text-center"><span onclick="gzAdd()" class="glyphicon glyphicon-plus-sign primary"></span></th>
                                                            <th class="text-center">单位名称</th>
                                                            <th class="text-center">单位地址</th>
                                                            <th class="text-center">部门</th>
                                                            <th class="text-center">职务</th>
                                                            <th class="text-center">离职原因</th>
                                                            <th class="text-center">起始时间</th>
                                                            <th class="text-center">结束时间</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody id="gzBody">
															<c:forEach items="${workHistory }" var="wh" varStatus="gz">
                                                       		<c:set value="${gz.index+1 }" var="gzNum"></c:set>
															<c:if test="${wh ne 'null' }">
                                                        	<tr id="gzTr${ fn:split(wh.gz_company_id, '_')[2] }" class="odd">
                                                            <td class="text-center">
																<span onclick="gzRemove('${ fn:split(wh.gz_company_id, '_')[2] }')" class="glyphicon glyphicon-minus-sign danger"></span>
                                                            </td>
                                                            <td class="">
                                                                <input value="${wh.gz_company_value }"  id="${wh.gz_company_id }" type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${wh.gz_address_id }" value="${wh.gz_address_value }" type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${wh.gz_dep_id }" value="${wh.gz_dep_value }"  type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${wh.gz_duty_id }" value="${wh.gz_duty_value }"   type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
                                                                <input id="${wh.gz_yuanyin_id }" value="${wh.gz_yuanyin_value }"   type="text" class="form-control input-sm">
                                                            </td>
                                                            <td class=" ">
																		<span class="input-icon icon-right">
                                                                            <input id="${wh.gz_stTime_id }"  class="form-control date-picker"
                                                                                    type="text"
                                                                                   data-date-format="yyyy-mm-dd"
                                                                                   value="${wh.gz_stTime_value }"
                                                                                   placeholder="2016-10-1">
                                                                            <i class="fa fa-calendar"></i>
                                                                        </span>
                                                            </td>
                                                            <td class=" ">
																		<span class="input-icon icon-right">
                                                                            <input  id="${wh.gz_edTime_id }"class="form-control date-picker"
                                                                                    type="text"
                                                                                   data-date-format="yyyy-mm-dd"
                                                                                   value="${wh.gz_edTime_value }"
                                                                                   placeholder="Birth Date">
                                                                            <i class="fa fa-calendar"></i>
                                                                        </span>
                                                            </td>
                                                        </tr>
                                                        </c:if>
                                                        </c:forEach>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="form-group col-sm-12">
                                        <div class="col-sm-5">
                                        </div>
                                        <div class="col-sm-6" style="margin-bottom:100px">
                                            <button type="submit" class="btn btn-blue btn-lg btn-next"> 保存
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>      
           </div>
                        
                        
                        </div>
                    </div>
                </div>
<%@ include file="../common/public_footer.jsp"%>

<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;">
		<ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
	</div>
</body>
<script type="text/javascript">
	var pr = '${user.province}';
	var ci = '${user.city}';
	var co = '${user.area}';
	var gzkOldNum = '${gzkNum}';
	var ydOldNum = '${ydNum}';
	var jyOldNum = '${jyNum}';
	var gzOldNum = '${gzNum}';
</script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/user_edituser.js?v=<%=Math.random() %>"></script>
</html>
