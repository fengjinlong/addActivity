<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="../common/public_header.jsp"%>
    <link href="${ctx_static }/home/consultcenter/css/printEntryForm.css" rel="stylesheet">
</head>
<!-- /Head -->
<!-- Body -->
<body ng-app="">
<!-- Main Container -->
<div class="main-container container-fluid">
    <!-- Page Container -->
    <div class="page-container">
        <!-- Page Content -->
        <div class="page-content">
            <!-- Page Body -->
            <div class="page-body">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="print-btn pull-right margin-bottom-10">
                            <a onclick="print()" href="javascript:void(0);" class="btn btn-primary">模板打印</a>
                            <a href="#" class="btn btn-primary">普通打印</a>
                        </div>
                        <div class="entryForm col-md-12">
                            <div class="entryForm-title">
                                <div class="col-md-4 logobox padding-left-30 padding-top-20">
                                    <img src="${ctx_static }/home/consultcenter/image/logo-zhonghe.png" alt="">
                                </div>
                                <div class="col-md-4 text-center">
                                    <h3>学员信息表</h3>
                                    <p>2017年学历专用</p>
                                </div>
                            </div>
                            <!--Widget Header-->
                            <div class="entryForm-body">
                                <table class="table table-bordered text-center">
                                    <tbody>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">个人信息</td>
                                    </tr>
                                    <tr>
                                         <td width="12.5%">学员姓名</td>
                                        <td width="12.5%">${consultInfo.studentName }</td>
                                        <td width="12.5%">性别</td>
                                        <td width="12.5%">${consultInfo.studentSex eq '0'? '男':'女' }</td>
                                        <td width="12.5%">证件类型</td>
                                        <td width="12.5%">${consultInfo.idcardType eq '1'?'身份证':'护照' }</td>
                                        <td width="12.5%">证件号码</td>
                                        <td width="12.5%">${consultInfo.idcard }</td>
                                    </tr>
                                    <tr>
                                         <td>教育程度</td>
                                        <td>${consultInfo.highestEducation }</td>
                                        <td>专业</td>
                                        <td>${consultInfo.byZy }</td>
                                        <td>民族</td>
                                        <td>${consultInfo.nation }</td>
                                        <td>Email</td>
                                        <td>${consultInfo.email }</td>
                                    </tr>
                                    <tr>
                                        <td>手机</td>
                                        <td>${consultInfo.studentPhone }</td>
                                        <td>QQ号</td>
                                        <td>${consultInfo.tengXun }</td>
                                        <td>工作单位</td>
                                        <td colspan="3">${consultInfo.workSpace }</td>
                                    </tr>
                                    <tr>
                                        <td>通讯地址</td>
                                        <td colspan="3">${consultInfo.phoneAddress }</td>
                                        <td>紧急联系人</td>
                                        <td>${consultInfo.emergencyContact }</td>
                                        <td>联系方式</td>
                                        <td>${consultInfo.emergencyContactMode }</td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">课程信息</td>
                                    </tr>
                                    <tr>
                                        <td>项目</td>
                                        <td>${consultInfo.projectName }</td>
                                        <td>类型</td>
                                        <td colspan="2">${project.projectType eq '1'?'职业资格':'学历' }</td>
                                        <td>学校</td>
                                        <td colspan="2">${consultInfo.schoolFrom }</td>
                                    </tr>
                                    <tr>
                                        <td>级别</td>
                                        <td>${consultInfo.projectLevelName }</td>
                                        <td>专业</td>
                                        <td colspan="2">${consultInfo.proFrom }</td>
                                        <td>班型</td>
                                        <td colspan="2">${consultInfo.classAttr }</td>
                                    </tr>
                                    <tr>
                                        <td>考期</td>
                                        <td>${consultInfo.kTimeValue }</td>
                                        <td>学员资料</td>
                                        <td colspan="5"></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">缴费信息</td>
                                    </tr>
                                     <tr>
                                        <td>收费项目</td>
                                        <td colspan="2">应缴</td>
                                        <td colspan="2">实缴</td>
                                        <td colspan="2">支付方式</td>
                                        <td>欠费</td>
                                    </tr>
                                    <tr>
                                        <td>学杂费（D）</td>
                                        <td class="tsum" colspan="2">${payInfoData.payPx}</td>
                                        <td class="ttsum" colspan="2">
                                        	${payInfoData.payPxNum}
                                        </td>
                                        <td colspan="2">
                                        	${payInfoData.payDzSk eq null || payInfoData.payDzSk eq '' || payInfoData.payDzSk eq 0?'':'刷卡缴费:'}${payInfoData.payDzSk eq null || payInfoData.payDzSk eq '' || payInfoData.payDzSk eq 0?'':payInfoData.payDzSk}
                                        	${payInfoData.payDzWeixin eq null || payInfoData.payDzWeixin eq '' || payInfoData.payDzWeixin eq 0?'':'微信缴费:'}${payInfoData.payDzWeixin eq null || payInfoData.payDzWeixin eq '' || payInfoData.payDzWeixin eq 0?'':payInfoData.payDzWeixin}
                                        	${payInfoData.payDzWl eq null || payInfoData.payDzWl eq '' || payInfoData.payDzWl eq 0?'':'网络缴费:'}${payInfoData.payDzWl eq null || payInfoData.payDzWl eq '' || payInfoData.payDzWl eq 0?'':payInfoData.payDzWl}
                                        	${payInfoData.payDzXj eq null || payInfoData.payDzXj eq '' || payInfoData.payDzXj eq 0?'':'现金缴费:'}${payInfoData.payDzXj eq null || payInfoData.payDzXj eq '' || payInfoData.payDzXj eq 0?'':payInfoData.payDzXj}
                                        	${payInfoData.payDzZfb eq null || payInfoData.payDzZfb eq '' || payInfoData.payDzZfb eq 0?'':'支付宝缴费:'}${payInfoData.payDzZfb eq null || payInfoData.payDzZfb eq '' || payInfoData.payDzZfb eq 0?'':payInfoData.payDzZfb}
                                        	${payInfoData.payDzZp eq null || payInfoData.payDzZp eq '' || payInfoData.payDzZp eq 0?'':'支票缴费:'}${payInfoData.payDzZp eq null || payInfoData.payDzZp eq '' || payInfoData.payDzZp eq 0?'':payInfoData.payDzZp}
                                        	${payInfoData.payDzZz eq null || payInfoData.payDzZz eq '' || payInfoData.payDzZz eq 0?'':'转账缴费:'}${payInfoData.payDzZz eq null || payInfoDatapayDzZz eq '' || payInfoDatapayDzZz eq 0?'':payInfoDatapayDzZz}
                                        
                                        	${payInfoData.payPxSk eq null || payInfoData.payPxSk eq '' || payInfoData.payPxSk eq 0?'':'刷卡缴费:'}${payInfoData.payPxSk eq null || payInfoData.payPxSk eq '' || payInfoData.payPxSk eq 0?'':payInfoData.payPxSk}
                                        	${payInfoData.payPxWeixin eq null || payInfoData.payPxWeixin eq '' || payInfoData.payPxWeixin eq 0?'':'微信缴费:'}${payInfoData.payPxWeixin eq null || payInfoData.payPxWeixin eq '' || payInfoData.payPxWeixin eq 0?'':payInfoData.payPxWeixin}
                                        	${payInfoData.payPxWl eq null || payInfoData.payPxWl eq '' || payInfoData.payPxWl eq 0?'':'网络缴费:'}${payInfoData.payPxWl eq null || payInfoData.payPxWl eq '' || payInfoData.payPxWl eq 0?'':payInfoData.payPxWl}
                                        	${payInfoData.payPxXj eq null || payInfoData.payPxXj eq '' || payInfoData.payPxXj eq 0?'':'现金缴费:'}${payInfoData.payPxXj eq null || payInfoData.payPxXj eq '' || payInfoData.payPxXj eq 0?'':payInfoData.payPxXj}
                                        	${payInfoData.payPxZfb eq null || payInfoData.payPxZfb eq '' || payInfoData.payPxZfb eq 0?'':'支付宝缴费:'}${payInfoData.payPxZfb eq null || payInfoData.payPxZfb eq '' || payInfoData.payPxZfb eq 0?'':payInfoData.payPxZfb}
                                        	${payInfoData.payPxZp eq null || payInfoData.payPxZp eq '' || payInfoData.payPxZp eq 0?'':'支票缴费:'}${payInfoData.payPxZp eq null || payInfoData.payPxZp eq '' || payInfoData.payPxZp eq 0?'':payInfoData.payPxZp}
                                        	${payInfoData.payPxZz eq null || payInfoData.payPxZz eq '' || payInfoData.payPxZz eq 0?'':'转账缴费:'}${payInfoData.payPxZz eq null || payInfoDatapayPxZz eq '' || payInfoDatapayPxZz eq 0?'':payInfoDatapayPxZz}
                                        </td>
                                        <td>
                                        	
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>考试费（D）</td>
                                        <td class="tsum" colspan="2">${payInfoData.payKw }</td>
                                        <td class="ttsum" colspan="2">
                                        	${payInfoData.payKwNum}
                                        </td>
                                        <td colspan="2">
                                        	${payInfoData.payKwSk eq null || payInfoData.payKwSk eq '' || payInfoData.payKwSk eq 0?'':'刷卡缴费:'}${payInfoData.payKwSk eq null || payInfoData.payKwSk eq '' || payInfoData.payKwSk eq 0?'':payInfoData.payKwSk}
                                        	${payInfoData.payKwWeixin eq null || payInfoData.payKwWeixin eq '' || payInfoData.payKwWeixin eq 0?'':'微信缴费:'}${payInfoData.payKwWeixin eq null || payInfoData.payKwWeixin eq '' || payInfoData.payKwWeixin eq 0?'':payInfoData.payKwWeixin}
                                        	${payInfoData.payKwWl eq null || payInfoData.payKwWl eq '' || payInfoData.payKwWl eq 0?'':'网络缴费:'}${payInfoData.payKwWl eq null || payInfoData.payKwWl eq '' || payInfoData.payKwWl eq 0?'':payInfoData.payKwWl}
                                        	${payInfoData.payKwXj eq null || payInfoData.payKwXj eq '' || payInfoData.payKwXj eq 0?'':'现金缴费:'}${payInfoData.payKwXj eq null || payInfoData.payKwXj eq '' || payInfoData.payKwXj eq 0?'':payInfoData.payKwXj}
                                        	${payInfoData.payKwZfb eq null || payInfoData.payKwZfb eq '' || payInfoData.payKwZfb eq 0?'':'支付宝缴费:'}${payInfoData.payKwZfb eq null || payInfoData.payKwZfb eq '' || payInfoData.payKwZfb eq 0?'':payInfoData.payKwZfb}
                                        	${payInfoData.payKwZp eq null || payInfoData.payKwZp eq '' || payInfoData.payKwZp eq 0?'':'支票缴费:'}${payInfoData.payKwZp eq null || payInfoData.payKwZp eq '' || payInfoData.payKwZp eq 0?'':payInfoData.payKwZp}
                                        	${payInfoData.payKwZz eq null || payInfoData.payKwZz eq '' || payInfoData.payKwZz eq 0?'':'转账缴费:'}${payInfoData.payKwZz eq null || payInfoData.payKwZz eq '' || payInfoData.payKwZz eq 0?'':payInfoData.payKwZz}
                                        </td>
                                        <td>
                                        	
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>教材费（D）</td>
                                        <td class="tsum" colspan="2">${payInfoData.payXy}</td>
                                        <td class="ttsum" colspan="2">
                                        	${payInfoData.payXyNum}
                                        </td>
                                        <td colspan="2">
                                        	${payInfoData.payXySk eq null || payInfoData.payXySk eq '' || payInfoData.payXySk eq 0?'':'刷卡缴费:'}${payInfoData.payXySk eq null || payInfoData.payXySk eq '' || payInfoData.payXySk eq 0?'':payInfoData.payXySk}
                                        	${payInfoData.payXyWeixin eq null || payInfoData.payXyWeixin eq '' || payInfoData.payXyWeixin eq 0?'':'微信缴费:'}${payInfoData.payXyWeixin eq null || payInfoData.payXyWeixin eq '' || payInfoData.payXyWeixin eq 0?'':payInfoData.payXyWeixin}
                                        	${payInfoData.payXyWl eq null || payInfoData.payXyWl eq '' || payInfoData.payXyWl eq 0?'':'网络缴费:'}${payInfoData.payXyWl eq null || payInfoData.payXyWl eq '' || payInfoData.payXyWl eq 0?'':payInfoData.payXyWl}
                                        	${payInfoData.payXyXj eq null || payInfoData.payXyXj eq '' || payInfoData.payXyXj eq 0?'':'现金缴费:'}${payInfoData.payXyXj eq null || payInfoData.payXyXj eq '' || payInfoData.payXyXj eq 0?'':payInfoData.payXyXj}
                                        	${payInfoData.payXyZfb eq null || payInfoData.payXyZfb eq '' || payInfoData.payXyZfb eq 0?'':'支付宝缴费:'}${payInfoData.payXyZfb eq null || payInfoData.payXyZfb eq '' || payInfoData.payXyZfb eq 0?'':payInfoData.payXyZfb}
                                        	${payInfoData.payXyZp eq null || payInfoData.payXyZp eq '' || payInfoData.payXyZp eq 0?'':'支票缴费:'}${payInfoData.payXyZp eq null || payInfoData.payXyZp eq '' || payInfoData.payXyZp eq 0?'':payInfoData.payXyZp}
                                        	${payInfoData.payXyZz eq null || payInfoData.payXyZz eq '' || payInfoData.payXyZz eq 0?'':'转账缴费:'}${payInfoData.payXyZz eq null || payInfoData.payXyZz eq '' || payInfoData.payXyZz eq 0?'':payInfoData.payXyZz}
                                        </td>
                                        <td>
                                        	
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>资料费（D）</td>
                                        <td class="tsum" colspan="2">${payInfoData.payZl}</td>
                                        <td class="ttsum" colspan="2">
                                        	${payInfoData.payZlNum}
                                        </td>
                                        <td colspan="2">
                                        	${payInfoData.payZlSk eq null || payInfoData.payZlSk eq '' || payInfoData.payZlSk eq 0?'':'刷卡缴费:'}${payInfoData.payZlSk eq null || payInfoData.payZlSk eq '' || payInfoData.payZlSk eq 0?'':payInfoData.payZlSk}
                                        	${payInfoData.payZlWeixin eq null || payInfoData.payZlWeixin eq '' || payInfoData.payZlWeixin eq 0?'':'微信缴费:'}${payInfoData.payZlWeixin eq null || payInfoData.payZlWeixin eq '' || payInfoData.payZlWeixin eq 0?'':payInfoData.payZlWeixin}
                                        	${payInfoData.payZlWl eq null || payInfoData.payZlWl eq '' || payInfoData.payZlWl eq 0?'':'网络缴费:'}${payInfoData.payZlWl eq null || payInfoData.payZlWl eq '' || payInfoData.payZlWl eq 0?'':payInfoData.payZlWl}
                                        	${payInfoData.payZlXj eq null || payInfoData.payZlXj eq '' || payInfoData.payZlXj eq 0?'':'现金缴费:'}${payInfoData.payZlXj eq null || payInfoData.payZlXj eq '' || payInfoData.payZlXj eq 0?'':payInfoData.payZlXj}
                                        	${payInfoData.payZlZfb eq null || payInfoData.payZlZfb eq '' || payInfoData.payZlZfb eq 0?'':'支付宝缴费:'}${payInfoData.payZlZfb eq null || payInfoData.payZlZfb eq '' || payInfoData.payZlZfb eq 0?'':payInfoData.payZlZfb}
                                        	${payInfoData.payZlZp eq null || payInfoData.payZlZp eq '' || payInfoData.payZlZp eq 0?'':'支票缴费:'}${payInfoData.payZlZp eq null || payInfoData.payZlZp eq '' || payInfoData.payZlZp eq 0?'':payInfoData.payZlZp}
                                        	${payInfoData.payZlZz eq null || payInfoData.payZlZz eq '' || payInfoData.payZlZz eq 0?'':'转账缴费:'}${payInfoData.payZlZz eq null || payInfoData.payZlZz eq '' || payInfoData.payZlZz eq 0?'':payInfoData.payZlZz}
                                        </td>
                                        <td>
                                        	
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>代管费</td>
                                        <td class="tsum" colspan="2">${payInfoData.payJc}</td>
                                        <td class="ttsum" colspan="2">
                                        	${payInfoData.payJcNum}
                                        </td>
                                        <td colspan="2">
                                        	${payInfoData.payJcSk eq null || payInfoData.payJcSk eq '' || payInfoData.payJcSk eq 0?'':'刷卡缴费:'}${payInfoData.payJcSk eq null || payInfoData.payJcSk eq '' || payInfoData.payJcSk eq 0?'':payInfoData.payJcSk}
                                        	${payInfoData.payJcWeixin eq null || payInfoData.payJcWeixin eq '' || payInfoData.payJcWeixin eq 0?'':'微信缴费:'}${payInfoData.payJcWeixin eq null || payInfoData.payJcWeixin eq '' || payInfoData.payJcWeixin eq 0?'':payInfoData.payJcWeixin}
                                        	${payInfoData.payJcWl eq null || payInfoData.payJcWl eq '' || payInfoData.payJcWl eq 0?'':'网络缴费:'}${payInfoData.payJcWl eq null || payInfoData.payJcWl eq '' || payInfoData.payJcWl eq 0?'':payInfoData.payJcWl}
                                        	${payInfoData.payJcXj eq null || payInfoData.payJcXj eq '' || payInfoData.payJcXj eq 0?'':'现金缴费:'}${payInfoData.payJcXj eq null || payInfoData.payJcXj eq '' || payInfoData.payJcXj eq 0?'':payInfoData.payJcXj}
                                        	${payInfoData.payJcZfb eq null || payInfoData.payJcZfb eq '' || payInfoData.payJcZfb eq 0?'':'支付宝缴费:'}${payInfoData.payJcZfb eq null || payInfoData.payJcZfb eq '' || payInfoData.payJcZfb eq 0?'':payInfoData.payJcZfb}
                                        	${payInfoData.payJcZp eq null || payInfoData.payJcZp eq '' || payInfoData.payJcZp eq 0?'':'支票缴费:'}${payInfoData.payJcZp eq null || payInfoData.payJcZp eq '' || payInfoData.payJcZp eq 0?'':payInfoData.payJcZp}
                                        	${payInfoData.payJcZz eq null || payInfoData.payJcZz eq '' || payInfoData.payJcZz eq 0?'':'转账缴费:'}${payInfoData.payJcZz eq null || payInfoData.payJcZz eq '' || payInfoData.payJcZz eq 0?'':payInfoData.payJcZz}
                                        </td>
                                        <td>
                                        	
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>辅导费</td>
                                        <td class="tsum" colspan="2">${payInfoData.payType eq ''?0:payInfoData.payType }</td>
                                        <td class="ttsum" colspan="2">
                                        ${	payInfoData.payType  eq ''?0:payInfoData.payType}</td>
                                        <td colspan="2">
                                        	<%-- ${e.payJcSk eq null || e.payJcSk eq '' || e.payJcSk eq 0?'':'<br>刷卡缴费:'}${e.payJcSk eq null || e.payJcSk eq '' || e.payJcSk eq 0?'':e.payJcSk}
                                        	${e.payJcWeixin eq null || e.payJcWeixin eq '' || e.payJcWeixin eq 0?'':'<br>微信缴费:'}${e.payJcWeixin eq null || e.payJcWeixin eq '' || e.payJcWeixin eq 0?'':e.payJcWeixin}
                                        	${e.payJcWl eq null || e.payJcWl eq '' || e.payJcWl eq 0?'':'<br>网络缴费:'}${e.payJcWl eq null || e.payJcWl eq '' || e.payJcWl eq 0?'':e.payJcWl}
                                        	${e.payJcXj eq null || e.payJcXj eq '' || e.payJcXj eq 0?'':'<br>现金缴费:'}${e.payJcXj eq null || e.payJcXj eq '' || e.payJcXj eq 0?'':e.payJcXj}
                                        	${e.payJcZfb eq null || e.payJcZfb eq '' || e.payJcZfb eq 0?'':'<br>支付宝缴费:'}${e.payJcZfb eq null || e.payJcZfb eq '' || e.payJcZfb eq 0?'':e.payJcZfb}
                                        	${e.payJcZp eq null || e.payJcZp eq '' || e.payJcZp eq 0?'':'<br>支票缴费:'}${e.payJcZp eq null || e.payJcZp eq '' || e.payJcZp eq 0?'':e.payJcZp}
                                        	${e.payJcZz eq null || e.payJcZz eq '' || e.payJcZz eq 0?'':'<br>转账缴费:'}${e.payJcZz eq null || e.payJcZz eq '' || e.payJcZz eq 0?'':e.payJcZz} --%>
                                        </td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>总额</td>
                                        <td  id="sum" colspan="2"></td>
                                        <td  id="ssum" colspan="2"></td>
                                        <td  id="sssum" colspan="2"></td>
                                        <td id="ssssum"></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">资料领取</td>
                                    </tr>
                                    <tr>
                                        <td>教材</td>
                                        <td>
                                        	<c:if test="${consultInfo.jcCk eq 1}">	
                                        		已领取
                                        	</c:if>
                                        </td>
                                        <td>教辅</td>
                                        <td>
                                        	<c:if test="${consultInfo.jfCk eq 1}">	
                                        		已领取
                                        	</c:if>
                                        </td>
                                        <td>未领取</td>
                                        <td colspan="3">${consultInfo.zlContent}</td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">学员服务大厅</td>
                                    </tr>
                                    <tr>
                                        <td>用户名</td>
                                        <td>${consultInfo.studentPhone }</td>
                                        <td>初始密码</td>
                                        <c:set value="${fn:length(consultInfo.idcard)}" var="length" />
                                        <td colspan="2">${fn:substring(consultInfo.idcard,length-6,length)}</td>
                                        <td>网址</td>
                                        <td colspan="2"></td>
                                    </tr>
                                    <tr style="height:150px">
                                        <td>说明</td>
                                        <td colspan="7"></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">学历项目服务协议</td>
                                    </tr>
                                    <tr style="border:none">
                                        <td colspan="3" style="border:none" class="text-left">甲方：中和基石国际教育科技(北京)有限公司</td>
                                        <td colspan="4" style="border:none"></td>
                                        <td colspan="2" class="pull-left" style="border:none">乙方：</td>
                                    </tr>
                                    <tr style="border:none" class="text-left">
                                        <td colspan="8" style="border:none;padding-left:47px;padding-right:47px">
                                            <p>按照中华人民共和国《合同法》等相关法律规定，甲乙双方自愿签署本服务协议，各自履行该协议约定的义务，承担相应责任并取得对等权利，该协议为有偿服务协议。</p>
                                            <p>甲方按照上述课程信息为学员提供学历相关服务，收取辅导费、代管费病代收学杂费、考试费、教材费、资料费等各项费用。</p>
                                            <p>乙方确保提供的个人信息真实有效。按照官方报名要求及时缴纳考试报名费用及报名资料。详情细则见背面协议附件内容。</p>
                                            <p>甲乙双方已阅读该协议及附件细则并知晓双方权利义务。</p>
                                            <p>本协议由乙方自报名即生效。如由他人代签请注明代签字样，甲方依然认可本协议约定内容；如果存在代签而未注明的，甲方有权拒绝履行协议并不予退费，相关责任由乙方自负。</p>
                                            <p>本协议一式三份，乙方保留一份，甲方保留两份。该协议将作为甲方收取乙方费用的唯一凭证，请妥善保管。发生争议，双方协商无果可起诉至乙方所在地法院。</p>
                                            <p style="margin-left:80px;margin-top:60px">本协议内容除签名外，其他手写无效。</p>
                                        </td>
                                    </tr>
                                    <tr style="border:none">
                                        <td colspan="4" style="border:none" class="text-left">甲方：中和基石国际教育科技（北京）有限公司</td>
                                        <td colspan="3" style="border:none"></td>
                                        <td colspan="2" class="pull-left no-padding-right no-padding-left" style="border:none">乙方（签字）：</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                    <div class="col-md-8 col-md-offset-2">
                        <table class="table table-bordered text-center" style="border:none">
                            <tbody>
                            <tr style="border:none">
                                <td class="col-md-4 text-right" style="border:none">经办人（签字）：${sy.realName }</td>
                                <td class="col-md-1 text-right" style="border:none">审核人员（签字）：</td>
                                <td class="col-md-2 text-left" style="border:none">
                                    <div>
                                        <select id="select" name="" class="form-control">
                                            <c:forEach var="e" items="${userList }">
                                            		<option value="${e.userId }">${e.realName }</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </td>
                                <td class="col-md-2" style="border:none">客服专线：</td>
                            </tr>
                            <tr style="border:none">
                                <td style="border:none" class="col-md-2">本协议表一式三联</td>
                                <td style="border:none" class="col-md-2  no-padding">第一联留总部（白色）</td>
                                <td style="border:none" class="col-md-2  no-padding">第一联留客户（粉色）</td>
                                <td style="border:none" class="col-md-2  no-padding">第三联留分布（黄色）</td>
                                <td style="border:none" class="col-md-2"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- /Page Content -->
        </div>
        <!-- /Page Container -->
        <!-- Main Container -->
    </div>
</div>
</body>
<script src="${ctx_static }/dep/assets/js/jquery-2.0.3.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var sum = 0;
	$('.tsum').each(function(){
		sum = eval(sum) + eval($(this).text()==''?0:$(this).text());
		var td1 = $(this).parent().find('td').eq(1).text();
		var td2 = $(this).parent().find('td').eq(2).text();
		$(this).parent().find('td').eq(4).text(eval(td1.trim()==''?0:td1.trim())-eval(td2.trim()==''?0:td2.trim()));
	});
	$('#sum').text(sum);
	sum = 0;
	$('.ttsum').each(function(){
		sum = eval(sum) + eval($(this).text().trim()==''?0:$(this).text());
	});
	$('#ssum').text(sum);
	$('#sssum').text(sum);
	$('#ssssum').text(eval($('#sum').text())-eval($('#ssum').text()));
})
var infoManageId = '${consultInfo.infoManageId}';
function print(){
	window.open(ctx+"/printController/index/"+infoManageId+"/zhEntryFormEduPrint/"+$('#select').find('option:selected').val());
}
</script>
</html>
