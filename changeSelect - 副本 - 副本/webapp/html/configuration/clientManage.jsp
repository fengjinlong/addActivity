<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/configuration/css/clientManage.css" rel="stylesheet">
<style>
	.input-border{
		border-color: #c4c4c4 !important;
	}
	.edit-save-btn i{
		font-size: 22px;
        margin-right: 15px;
        cursor: pointer;
        width: 20px;
        line-height: 48px
	}
	.edit-confirm-btn {
	    position: relative;
	    left: -5px;
	}
</style>

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12 customerTag" id="data">
    </div>
    
    <!-- <div class="widget col-sm-3 padding-right-20 add-container text-center">
        <div class="widget-body">
            <a class="fa fa-plus add-btn blue"></a>
        </div>
    </div> -->
</div>
<%@ include file="../common/public_footer.jsp"%>

<script src="${ctx_static }/home/configuration/js/clientManage.js"></script>
