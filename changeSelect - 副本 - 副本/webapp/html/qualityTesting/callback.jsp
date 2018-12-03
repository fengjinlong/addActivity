<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

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
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group col-sm-3 no-margin-left no-padding-left"
                                 style="width:175px;">
                                <select class="form-control" id="searchTimeType">
                                    <option value="">--请选择日期--</option>
                                    <option value="1">创建日期</option>
                                    <option value="2">分配日期</option>
                                    <option value="3">日志添加日期</option>
                                    <option value="4">预约上门日期</option>
                                    <option value="5">上门日期</option>
                                </select>
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <div class="input-group date">
                                    <input type="text" class="form-control" id="duration">
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group col-md-10 col-sm-10 no-padding">
                                <input class="form-control"
                                	 id="searchVal"
                                	 onkeydown="search();"
                                       placeholder="分校/咨询课程/咨询者类型/学员状态/咨询师/日志添加人/接待人"
                                       type="text">
                            </div>
                            <div class="form-group pull-right no-margin-right">
                                <button type="button" onclick="init()" 
                                        class="btn btn-lightBlue form-control search-btn" >
                                    <i class="fa fa-search"></i>搜索
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer"
                                   id="callback">
                                <thead>
                                <tr role="row" class="text-center">
                                    <th>创建日期</th>
                                    <th>分校</th>
                                    <th>品牌</th>
                                    <th>咨询课程</th>
                                    <th>咨询师部门</th>
                                    <th>分配时间</th>
                                    <th>咨询师</th>
                                    <th>咨询者类型</th>
                                    <th>学员状态</th>
                                    <th>预约上门日期</th>
                                    <th>接待人</th>
                                    <th>上门日期</th>
                                    <th>学员姓名</th>
                                    <th>学员手机号</th>
                                    <th>回访日期</th>
                                    <th>回访内容</th>
                                    <th>日志添加时间</th>
                                    <th>日志添加人</th>
                                    <th>有效无效回访</th>
                                    <th>短信或电话回访</th>
                                    <th>下次回访日期</th>
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
       
<script src="${ctx_static }/home/qualityTesting/js/callback.js"></script>
