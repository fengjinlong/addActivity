<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/financeCenter/css/smallBusiness.css" rel="stylesheet">
<div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="widget">
                            <div class="widget-header">
                                <div class="widget-buttons">
                                   	<a href="#"></a> 
									<a href="#" class="back-btn" data-toggle="dispose" onclick="loadcheck('/smallBusiness/index')"> <i
										class="fa fa-times"></i>
									</a>
                                </div>
                                <!--Widget Buttons-->
                            </div>
                            <!--Widget Header-->
                            <div class="widget-body">
                                <div class="widget-main ">
                                    <div class="tabbable">
                                        <ul class="nav nav-tabs tabs-flat">
                                            <li onclick="clickBut(1)" class="active">
                                                <a data-toggle="tab" href="#isPay">
                                                    正酬
                                                </a>
                                            </li>
                                            <li onclick="clickBut(2)" >
                                                <a data-toggle="tab" href="#theReward">
                                                    反酬
                                                </a>
                                            </li>
                                            <li onclick="clickBut(3)" >
                                                <a data-toggle="tab" href="#branchBurden">
                                                    分校负担
                                                </a>
                                            </li>
                                            <li onclick="clickBut(4)" >
                                                <a data-toggle="tab" href="#collection">
                                                    代收
                                                </a>
                                            </li>
                                            <li onclick="clickBut(5)" >
                                                <a data-toggle="tab" href="#advance">
                                                    垫付
                                                </a>
                                            </li>
                                            <li onclick="clickBut(6)" class="fineTab">
                                                <a data-toggle="tab" href="#fine">
                                                    罚款
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content tabs-flat bordered-blue">
                                            <div id="isPay" class="tab-pane in active">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control" id="reservation1"
                                                                   placeholder="项目类别/项目/分成类别/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button" onclick="clickBut(1)"
                                                                    class="btn increase form-control search-btn">
                                                                	<i class="fa fa-search"></i> 搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="init1" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>咨询师 
                                                                </th>
                                                                <th>咨询者类型 
                                                                </th>
                                                                <th>学员姓名
                                                                </th>
                                                                <th>课程 
                                                                </th>
                                                                <th>报名表编号 
                                                                </th>
                                                                <th>报名日期
                                                                </th>
                                                                <th>缴费日期
                                                                </th>
                                                                <th>业绩合计
                                                                </th>
                                                                <th>培训费
                                                                </th>
                                                                <th>考务费
                                                                </th>
                                                                <th>教材费
                                                                </th>
                                                                <th>资料费
                                                                </th>
                                                                <th>协议费
                                                                </th>
                                                                <th>服务费
                                                                </th>
                                                                <th>集团收入
                                                                </th>
                                                                <th>集团代收
                                                                </th>
                                                                <th>正酬
                                                                </th>
                                                                <th>正酬系数
                                                                </th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">合计:</td>
                                                                <td class="red">2002</td>
                                                                <td class="red">1402</td>
                                                                <td class="red">600</td>
                                                                <td class="red">0</td>
                                                                <td class="red">0</td>
                                                                <td class="red">0</td>
                                                                <td class="red">0</td>
                                                                <td class="red">1402</td>
                                                                <td class="red">0</td>
                                                                <td class="red">210.3</td>
                                                                <td class="red"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>在线有效</td>
                                                                <td>孙婷婷</td>
                                                                <td>直播营养</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1402</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>1402</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>在线有效</td>
                                                                <td>孙婷婷</td>
                                                                <td>直播营养</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1402</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>1402</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>在线有效</td>
                                                                <td>孙婷婷</td>
                                                                <td>直播营养</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1402</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>1402</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="theReward" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
 																	class="btn increase form-control search-btn">
                                                                	<i class="fa fa-search"></i> 搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="init2" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>学员姓名
																</th>
																<th>课程
																</th>
																<th>报名表编号
																</th>
																<th>财务编号
																</th>
																<th>报名日期
																</th>
																<th>支付日期
																</th>
																<th>退费金额
																</th>
																<th>集团基数
																</th>
																<th>考试费
																</th>
																<th>扣除考试费
																</th>
																<th>反酬
																</th>
																<th>反酬系数
																</th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">合计:</td>
                                                                <td class="red">2002</td>
                                                                <td class="red">1422</td>
                                                                <td class="red">600</td>
                                                                <td class="red">0</td>
                                                                <td class="red">210.3</td>
                                                                <td class="red"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>143473</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1422</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>143473</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1422</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>143473</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1422</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="branchBurden" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                class="btn increase form-control search-btn">
                                                                	<i class="fa fa-search"></i> 搜索   
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="init3" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>学员姓名
                                                                </th>
                                                                <th>课程
                                                                </th>
                                                                <th>报名表编号
                                                                </th>
                                                                <th>财务编号
                                                                </th>
                                                                <th>报名日期
                                                                </th>
                                                                <th>支付日期
                                                                </th>
                                                                <th>退费金额
                                                                </th>
                                                                <th>集团基数
                                                                </th>
                                                                <th>考试费
                                                                </th>
                                                                <th>扣除考试费
                                                                </th>
                                                                <th>分校负担
                                                                </th>
                                                                <th>分校负担系数
                                                                </th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">合计:</td>
                                                                <td class="red">2002</td>
                                                                <td class="red">1422</td>
                                                                <td class="red">600</td>
                                                                <td class="red">0</td>
                                                                <td class="red">210.3</td>
                                                                <td class="red"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>143473</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1422</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>143473</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1422</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>143473</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>2002</td>
                                                                <td>1422</td>
                                                                <td>600</td>
                                                                <td>0</td>
                                                                <td>210.3</td>
                                                                <td>0.15</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="collection" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                    class="btn increase form-control search-btn">
                                                                	<i class="fa fa-search"></i> 搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="init4" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>学员姓名
                                                                </th>
                                                                <th>课程
                                                                </th>
                                                                <th>报名表编号
                                                                </th>
                                                                <th>缴费日期
                                                                </th>
                                                                <th>学杂费
                                                                </th>
                                                                <th>资料费
                                                                </th>
                                                                <th>服务费
                                                                </th>
                                                                <th>集团代收
                                                                </th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">合计:</td>
                                                                <td class="red">174</td>
                                                                <td class="red">0</td>
                                                                <td class="red">0</td>
                                                                <td class="red"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>174</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>174</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>174</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>174</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>直播人力</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>174</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>174</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="advance" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control"
                                                                   placeholder="项目/电话/姓名/编号/身份证号">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                     class="btn increase form-control search-btn">
                                                                	<i class="fa fa-search"></i> 搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="init5" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>学员姓名
                                                                </th>
                                                                <th>课程 
                                                                </th>
                                                                <th>报名表编号 
                                                                </th>
                                                                <th>缴费日期
                                                                </th>
                                                                <th>缴费金额
                                                                </th>
                                                                <th>考务费
                                                                </th>
                                                                <th>提取考务费财务编号<span
                                                                        class="fa indicator fa-unsorted"></span>
                                                                </th>
                                                                <th>提取考务费日期<span
                                                                        class="fa indicator fa-unsorted"></span>
                                                                </th>
                                                                <th>提取考务费金额<span
                                                                        class="fa indicator fa-unsorted"></span>
                                                                </th>
                                                                <th>退费财务编号
                                                                </th>
                                                                <th>退费日期
                                                                </th>
                                                                <th>退费金额
                                                                </th>
                                                                <th>集团垫付
                                                                </th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">合计:</td>
                                                                <td class="red">174</td>
                                                                <td class="red">0</td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">0</td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">0</td>
                                                                <td class="red">0</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>人力直播</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>174</td>
                                                                <td>0</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-18 17:10</td>
                                                                <td>0</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>人力直播</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>174</td>
                                                                <td>0</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-18 17:10</td>
                                                                <td>0</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>丁胜</td>
                                                                <td>人力直播</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>174</td>
                                                                <td>0</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-18 17:10</td>
                                                                <td>0</td>
                                                                <td>01025668</td>
                                                                <td>2016-10-25 15:5</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="fine" class="tab-pane in">
                                                <div class="row row_padding form-horizontal">
                                                    <div class="col-sm-10 col-xs-10">
                                                        <div class="form-group col-lg-6 col-md-8 col-sm-8">
                                                            <input class="form-control searchType"
                                                                   placeholder="处罚类别">
                                                        </div>
                                                        <div class="form-group pull-left search-box">
                                                            <button type="button"
                                                                  class="btn increase form-control search-btn">
                                                                	<i class="fa fa-search"></i> 搜索
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dataTables_wrapper form-inline no-footer">
                                                    <div class="table-scrollable">
                                                        <table id="init6" class="table table-striped table-hover table-bordered dataTable no-footer">
                                                            <thead>
                                                            <tr role="row">
                                                                <th width="5%">
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </th>
                                                                <th>归属分校 
                                                                </th>
                                                                <th>归属部门 
                                                                </th>
                                                                <th>处罚类别
                                                                </th>
                                                                <th>事件日期 
                                                                </th>
                                                                <th>提交日期 
                                                                </th>
                                                                <th>处理日期
                                                                </th>
                                                                <th>违规人
                                                                </th>
                                                                <th>罚款(-)
                                                                </th>
                                                                <th>罚款(+)
                                                                </th>
                                                                <th>生效日期
                                                                </th>
                                                                <th>操作
                                                                </th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                                <td class="red">合计:</td>
                                                                <td class="red">50</td>
                                                                <td class="red">0</td>
                                                                <td class="red"></td>
                                                                <td class="red"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>01北京</td>
                                                                <td></td>
                                                                <td>争议单</td>
                                                                <td>2016-10-25</td>
                                                                <td>2016-10-25</td>
                                                                <td>2016-10-25</td>
                                                                <td>刘嘉鹏</td>
                                                                <td>50</td>
                                                                <td>0</td>
                                                                <td>2016-10-24</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                                       data-toggle="modal" data-target=".fineView"
                                                                       data-backdrop="static">
                                                                        <i class="fa fa-folder-open-o"></i> 查看
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox">
                                                                        <span class="text"></span>
                                                                    </label>
                                                                </td>
                                                                <td>01北京</td>
                                                                <td></td>
                                                                <td>争议单</td>
                                                                <td>2016-10-25</td>
                                                                <td>2016-10-25</td>
                                                                <td>2016-10-25</td>
                                                                <td>刘嘉鹏</td>
                                                                <td>50</td>
                                                                <td>0</td>
                                                                <td>2016-10-24</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-warning btn-xs view"
                                                                       data-toggle="modal" data-target=".fineView"
                                                                       data-backdrop="static">
                                                                        <i class="fa fa-folder-open-o"></i> 查看
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--Widget-->
                            </div>
                        </div>

                    </div>
                </div>
                
<script>
var depId = '${id}';
var createTime = '${createTime}';
var brandName = '${brandName}';
if(brandName == 2){
	$('.fineTab').hide();
} else if(brandName == 1){
	$('.fineTab').show();
}
</script>
<!--富文本编辑器-->
<script src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script src="${ctx_static }/home/financeCenter/js/smallBusinessCheck.js"></script>