<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link href="${ctx_static }/home/qualityTesting/css/chaseLeaks.css" rel="stylesheet">
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
                        <form class="form-horizontal clearfix" id="checkPhone" method="post">
                            <div class="form-group">
                                <div class="pull-left text-right" style="margin-left: 15px;">
                                    <label class="control-label">手机号：</label>
                                </div>
                                <div class="col-sm-10" style="width:86%;">
                                    <textarea rows="25" class="form-control" id="searchVal" name="searchVal"
                                              placeholder="请在此输入手机号，可用回车换行或英文状态下的逗号隔开。"></textarea>
                                </div>
                                <div class="pull-left">
                                    <button type=button class="btn btn-lightBlue examine-btn"
                                            onclick="checkedCim()">检查
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

<script src="${ctx_static }/home/qualityTesting/js/chaseLeaks.js"></script>
