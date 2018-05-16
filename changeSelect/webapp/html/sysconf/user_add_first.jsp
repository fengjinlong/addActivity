<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/user.css">
<style>
.help-block{
	position: absolute;
}
</style>
<body class="page-wrapper">
      <div class="widget addUser">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">用户新增</span>
                 <div class="widget-buttons">
                 		<a href="#" data-toggle="config"></a>
                 		<a href="${ctx }/user/index" title="返回">
                 			<i class="fa fa-reply"></i>
                 		</a>
				</div>
            </div>
          <div class="widget-body clearfix">
              <div class="addUser-guide clearfix">
                  <div class="progress">
                      <div class="progress-bar progress-bar-danger progress-bar-striped active"
                           role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="steps">
                      <div class="active col-xs-4 step1">
                          <span>1</span>
                          <p class="title">填写基本信息</p>
                      </div>
                      <div class="col-xs-4 step2">
                          <span>2</span>
                          <p class="title">填写档案信息</p>
                      </div>
                  </div>
              </div>
              <div class="addUser-content" id="step1">
                  <div class="step-pane">
                      <h3 class="step-title">用户填写基本信息</h3>
                      <div class="basic-info row">
                          <form name="firstForm" id="firstForm" method="post" class="form-horizontal" >
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">真实姓名<span class="control-label mandatory">*</span></label>
                                  <div class="col-sm-7">
                                      <input type="text" required="required" name="realName" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">姓名全拼<span class="mandatory control-label">*</span></label>
                                  <div class="col-sm-7">
                                      <input name="spell" type="text" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">别名</label>
                                  <div class="col-sm-7">
                                      <input name="alias" type="text" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">年龄<span class="mandatory control-label">*</span></label>
                                  <div class="col-sm-7">
                                      <input type="text" name="age" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">性别<span class="mandatory control-label">*</span></label>
                                  <div class="radio pull-left">
                                      <label>
                                          <input value="1" name="gender" type="radio"  checked >
                                          <span class="text">男</span>
                                      </label>
                                       <label>
                                          <input value="2" name="gender" type="radio">
                                          <span class="text">女</span>
                                      </label>
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">民族</label>
                                  <div class="col-sm-7">
                                      <select name="nationality" id="nation" class="form-control">
                                          
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">手机号码<span class="control-label mandatory">*</span></label>
                                  <div class="col-sm-7">
                                      <input name="mobile" type="mobile" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">QQ号</label>
                                  <div class="col-sm-7">
                                      <input type="text" name="qq" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">微信号</label>
                                  <div class="col-sm-7">
                                      <input type="text"  name="wechat" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label  col-sm-4">所属公司<span class="control-label mandatory">*</span></label>
                                  <div class="col-sm-7">
                                      <input readonly onclick="showMenu('company_id', 1)" id="company_id" name="company_id" class="form-control"></input>
                                      <input hidden id="companyId" name="companyId"></input>
                                      <small style="color:#e22; display:none" id="companysmall" class="help-block">公司不能为空</small>
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">所属部门<span class="control-label mandatory">*</span></label>
                                  <div class="col-sm-7">
                                  	<input  readonly onclick="showMenu('department_id', 2)" id="department_id" name="department_id" class="form-control"></input>
                                  	<input  hidden id="departmentId" name="departmentId" ></input>
                                  	<small style="color:#e22;display:none" id="departmentsmall" class="help-block">部门不能为空</small>
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4 working-team">所属职位<span class="control-label mandatory">*</span></label>
                                  <div class="col-sm-7">
                                      <input readonly onclick="showMenu('duty_id', 3)" id="duty_id" name="duty_id" type="text" class="form-control">
                                      <input hidden id="dutyId" name="dutyId" ></input>
                                      <small style="color:#e22;display:none" id="dutysmall" class="help-block">职位不能为空</small>
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">所属角色<span class="control-label mandatory">*</span></label>
                                  <div class="col-sm-7">
                                      <input readonly onclick="showMenu('role_id', 4)" id="role_id" name="role_id" type="text" class="form-control">
                                      <input hidden id="roleId" name="roleId" ></input>
                                      <small style="color:#e22;display:none" id="rolesmall" class="help-block">角色不能为空</small>
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">办公电话</label>
                                  <div class="col-sm-7">
                                      <input type="text" name="officeTel" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">分机号</label>
                                  <div class="col-sm-7">
                                      <input name="telephone" type="text" class="form-control">
                                  </div>
                              </div>
                              <div class="form-group col-sm-4">
                                  <label class="control-label col-sm-4">邮箱地址</label>
                                  <div class="col-sm-7">
                                      <input data-bv-field="email" name="email" type="text" class="form-control">
                                  </div>
                              </div>
                              
                                  <div class="form-group col-sm-4">
                                      <label class="control-label col-sm-4">登录账号 <span class="mandatory control-label">*</span></label>
                                      <div class="col-sm-7">
                                          <input  name="account" type="text" class="form-control">
                                      </div>
                                  </div>
                                  <div class="form-group col-sm-4">
                                      <label class="control-label col-sm-4">登录密码<span class="mandatory control-label">*</span></label>
                                      <div class="col-sm-7">
                                          <input value="" name="password" type="text" class="form-control">
                                      </div>
                                  </div>
                                  <div class="form-group col-sm-4">
                                      <label class="control-label col-sm-4">查询范围<span class="mandatory control-label">*</span></label>
                                      <div class="col-sm-7">
                                          <select name="securityLevel" class="form-control">
                                          	<option value="1">只看自己</option>
                                          	<option value="2">查看全部</option>
                                          	<!-- <option value="3">下属部门(包括同级部门)</option> -->
                                          </select>
                                      </div>
                                  </div>
                                  <div class="form-group col-sm-3 dentifying">
                                      <i>注</i>
                                      <span class="mandatory">"*"</span>
                                      标识为必填项
                                  </div>
                              <div class="form-group col-sm-12">
                                  <div class="col-sm-2 col-sm-offset-4">
                                      <button id="firstSubmit" type="submit"  class="btn btn-primary btn-prev">
                                          直接创建
                                      </button>
                                  </div>
                                  <div class="col-sm-2">
                                      <button id="firstNextSubmit" type="button" class="btn btn-primary btn-next">
                                          下一步
                                      </button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
              <div class="addUser-content hidden" id="step2">
                  <div class="step-pane">
                      <form id="secondForm"   class="form-horizontal" >
                          <ul class="timeline">
                              <li class="timeline-inverted">
                                  <div class="timeline-badge blue">
                                      <i class="fa fa-edit font-120"></i>
                                  </div>
                                  <div class="timeline-panel">
                                      <div class="timeline-header bordered-bottom bordered-blue">
                                          <h3 class="step-title">
                                              用户填写档案基础信息
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
                                          	 <input id="userId" name="userId" hidden value="6160cc8d-2a31-42c7-8388-3c255072ffe9" />
                                              <label class="control-label col-sm-4">身份证号</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <input name="idCard"  type="text" class="form-control">
                                              </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">身份证有效期</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <input id="expirDate" name="expirDate" type="text" class="form-control">
                                              </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">户口性质</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <select name="accountProperties" class="form-control">
                                                      <option value="1">城镇</option>
                                                      <option value="2">非城镇</option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">在京居住地址</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <input name="addressBj" type="text" class="form-control"
                                                         placeholder="填写在京居住地址">
                                              </div>
                                          </div>
                                          <div class="form-group col-sm-12">
                                              <div data-toggle="distpicker">
                                                  <label class="control-label col-sm-2 native-place" style="margin-right: 0px;margin-left: -9px !important;">籍贯</label>
                                                  <div class="col-sm-3 province2 no-padding-left" style="width:27%">
                                                      <!--<label class="sr-only" for="province2">省</label>-->
                                                      <select name="province" class="form-control" id="province2" data-province="---- 选择省 ----"></select>
                                                  </div>
                                                  <div class="col-sm-3 city2 no-padding-left" style="width:24%">
                                                      <!--<label class="sr-only" for="city2">市</label>-->
                                                      <select name="city" class="form-control" id="city2" data-city="---- 选择市 ----"></select>
                                                  </div>
                                                  <div class="col-sm-3 district2 no-padding-left" style="width:27%">
                                                      <!--<label class="sr-only" for="district2">区</label>-->
                                                      <select name="area" class="form-control" id="district2" data-district="---- 选择区 ----"></select>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-12">
                                                  <label class="control-label col-sm-2 text-common">详细地址</label>
                                                  <div class="col-sm-10 no-padding-left padding-right-6">
                                                      <input name="nativePlace" type="text" class="form-control">
                                                  </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">政治面貌</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <select name="party" class="form-control">
                                                      <option value="0">党员</option>
                                                      <option value="1">团员</option>
                                                      <option value="2">群众</option>
                                                  </select>
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">国籍</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <select name="nation" class="form-control">
                                                      <option value="0">中国</option>
                                                      <option value="1">韩国</option>
                                                      <option value="2">日本</option>
                                                  </select>
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">档案名称</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <input name="fileNumber" type="text" class="form-control" value="">
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="col-sm-4 control-label">入职时间*</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <div class="input-group">
                                                      <input name="entryTime" class="form-control date-picker"
                                                             id="id-date-picker-8" type="text"
                                                             data-date-format="yyyy-mm-dd">
                                             <span class="input-group-addon">
		        	        <i class="fa fa-calendar"></i>
		                </span>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-12">
                                              <div class="col-sm-6">
                                                  <label class="col-sm-4 control-label text-common">合同开始日期</label>
                                                  <div class="col-sm-7 no-padding-left padding-right-5">
                                                      <div class="controls">
                                                          <div class="input-group">
                                                              <input type="text" class="form-control" name="contractStartTime1"
                                                               value=""       id="contractStartTime1">
                                                          <span class="input-group-addon"><i
                                                                  class="fa fa-calendar"></i></span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="col-sm-6">
                                                  <label class="col-sm-4 control-label contract-endDate">合同结束日期</label>
                                                  <div class="col-sm-7 no-padding-left padding-right-5">
                                                      <div class="controls">
                                                          <div class="input-group">
                                                              <input type="text" class="form-control" name="contractEndTime1"
                                                                      id="contractEndTime1">
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
                                              <div class="col-sm-7 no-padding-left">
                                                  <div class="input-group">
                                                      <input name="securityAddTime" class="form-control date-picker"
                                                             id="id-date-picker-4" type="text"
                                                             data-date-format="yyyy-mm-dd" value="">
                                             <span class="input-group-addon">
		        	        <i class="fa fa-calendar"></i>
		                </span>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="col-sm-4 control-label">社保减员时间*</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <div class="input-group">
                                                      <input name="securityLostTime" class="form-control date-picker"
                                                             id="id-date-picker-7" type="text"
                                                             data-date-format="yyyy-mm-dd" value="">
                                             <span class="input-group-addon">
		        	        <i class="fa fa-calendar"></i>
		                </span>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">社保账号</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <input name="securityAccount" type="text" class="form-control" value="">
                                              </div>
                                          </div>

                                          <div class="form-group col-sm-6">
                                              <label class="control-label col-sm-4">公积金账号</label>
                                              <div class="col-sm-7 no-padding-left">
                                                  <input name="fundAccount" type="text" class="form-control" value="">
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
                                                  <th></th>
                                                  <th>开户行</th>
                                                  <th>卡号</th>
                                                  <th>备注</th>
                                              </tr>
                                              </thead>

                                              <tbody id="gzkBody">
                                              <tr id="gzkTr0" class="odd">
                                                  <td class="text-center">
                                                      <span onclick="gzkAdd()" class="glyphicon glyphicon-plus-sign primary"></span>
                                                  </td>
                                                  <td class="">
                                                      <input id="gzk_khh_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="gzk_num_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="gzk_bz_0" type="text" class="form-control input-sm">
                                                  </td>
                                              </tr>
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
                                                  <th></th>
                                                  <th>异动项目</th>
                                                  <th>从由</th>
                                                  <th>调至</th>
                                                  <th>异动时间</th>
                                                  <th>备注</th>
                                              </tr>
                                              </thead>

                                              <tbody id="ydBody">
                                              <tr id="ydTr0" class="odd">
                                                  <td class="text-center">
                                                      <span onclick="ydAdd()" class="glyphicon glyphicon-plus-sign primary"></span>
                                                  </td>
                                                  <td class="">
                                                      <input id="yd_project_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="yd_from_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="yd_to_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
								<span class="input-icon icon-right">
                                                                  <input id="yd_time_0" class="form-control date-picker"
                                                                          type="text"
                                                                         data-date-format="yyyy-mm-dd"
                                                                         placeholder="">
                                                                  <i class="fa fa-calendar"></i>
                                                              </span>
                                                  </td>
                                                  <td class=" ">
                                                      <input id="yd_bz_0" type="text" class="form-control input-sm">
                                                  </td>
                                              </tr>
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
                                                  <th></th>
                                                  <th>学校名称</th>
                                                  <th>学校地址</th>
                                                  <th>学历级别</th>
                                                  <th>专业名称</th>
                                                  <th>起始时间</th>
                                                  <th>结束时间</th>
                                              </tr>
                                              </thead>

                                              <tbody id="jyBody">
                                              <tr id="jyTr0" class="odd">
                                                  <td class="text-center">
                                                      <span onclick="jyAdd()" class="glyphicon glyphicon-plus-sign primary"></span>
                                                  </td>
                                                  <td class="">
                                                      <input id="jy_school_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="jy_address_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="jy_level_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="jy_zy_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
								<span class="input-icon icon-right">
                                                                  <input id="jy_stTime_0" class="form-control date-picker"
                                                                          type="text"
                                                                         data-date-format="yyyy-mm-dd"
                                                                         placeholder="">
                                                                  <i class="fa fa-calendar"></i>
                                                              </span>
                                                  </td>
                                                  <td class=" ">
								<span class="input-icon icon-right">
                                                                  <input id="jy_edTime_0" class="form-control date-picker"
                                                                          type="text"
                                                                         data-date-format="yyyy-mm-dd"
                                                                         placeholder="">
                                                                  <i class="fa fa-calendar"></i>
                                                              </span>
                                                  </td>
                                              </tr>
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
                                                  <th></th>
                                                  <th>单位名称</th>
                                                  <th>单位地址</th>
                                                  <th>部门</th>
                                                  <th>职务</th>
                                                  <th>离职原因</th>
                                                  <th>起始时间</th>
                                                  <th>结束时间</th>
                                              </tr>
                                              </thead>

                                              <tbody id="gzBody">

                                              <tr id="gzTr0" class="odd">
                                                  <td class="text-center">
                                                      <span onclick="gzAdd()" class="glyphicon glyphicon-plus-sign primary"></span>
                                                  </td>
                                                  <td class="">
                                                      <input id="gz_company_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="gz_address_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="gz_dep_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="gz_duty_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
                                                      <input id="gz_yuanyin_0" type="text" class="form-control input-sm">
                                                  </td>
                                                  <td class=" ">
								<span class="input-icon icon-right">
                                                                  <input id="gz_stTime_0" class="form-control date-picker"
                                                                          type="text"
                                                                         data-date-format="yyyy-mm-dd"
                                                                         placeholder="">
                                                                  <i class="fa fa-calendar"></i>
                                                              </span>
                                                  </td>
                                                  <td class=" ">
								<span class="input-icon icon-right">
                                                                  <input id="gz_edTime_0" class="form-control date-picker"
                                                                          type="text"
                                                                         data-date-format="yyyy-mm-dd"
                                                                         placeholder="">
                                                                  <i class="fa fa-calendar"></i>
                                                              </span>
                                                  </td>
                                              </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                          <div class="form-group col-sm-12">
                              <div class="col-sm-3 col-sm-offset-3">
                                  <button type="button" class="btn btn-primary btn-lg btn-prev">
                                      上一步
                                  </button>
                              </div>
                              <div class="col-sm-6">
                                  <button type="submit" class="btn btn-danger btn-lg btn-next">
                                      确定
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>

          </div>
      </div>
      <div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;">
		  <ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 100%"></ul>
	  </div>
</body>

<%@ include file="../common/public_footer.jsp"%>

<script src="${ctx_static }/dep/assets/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/user_add_first.js?v=+<%=Math.random() %>"></script>

