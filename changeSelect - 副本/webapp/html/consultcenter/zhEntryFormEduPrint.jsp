<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <link href="${ctx_static }/home/consultcenter/css/printEntryForm.css" rel="stylesheet">
</head>
<style type="text/css">
body{
	margin:0px;
}
tr{
height: 20px;
line-height: 20px;
}
td{
white-space:nowrap;
}
.table-bordered>thead>tr>th, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>tbody>tr>td, .table-bordered>tfoot>tr>td{
border: 0px;
}
.entryForm {
border: 0px;
}
.table-bordered{
border: 0px;
}
.table-striped > tbody > tr:nth-child(odd) > th, .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(even) > th, .table-striped > tbody > tr:nth-child(even) > td, .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
font-size: 6px;
}
</style>
<!-- /Head -->
<!-- Body -->
<body ng-app="">
         <div style="width:794px;border:0px solid #000000;margin-top: 175px;">
                        <div >
                            <!--Widget Header-->
                            <div >
                                <table >
                                    <tbody>
                                    <tr>
                                        <td align="center" width="99.25px;"><span ></span></td>
                                        <td align="center" width="99.25px;"><span >${consultInfo.studentName }</span></td>
                                        <td align="center" width="99.25px;"><span ></span></td>
                                        <td align="center" width="99.25px;"><span >${consultInfo.studentSex eq '0'? '男':'女' }</span></td>
                                        <td align="center" width="99.25px;"><span ></span></td>
                                        <td align="center" width="99.25px;"><span >${consultInfo.idcardType eq '1'?'身份证':'护照' }</span></td>
                                        <td align="center" width="99.25px;"><span ></span></td>
                                        <td align="center" width="99.25px;"><span >${consultInfo.idcard }</span></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.studentAttrName3 }</span></td>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.byZy }</span></td>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.nation }</span></td>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.email }</span></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.studentPhone }</span></td>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.tengXun }</span></td>
                                        <td align="center" ></td>
                                        <td align="center"  colspan="3"><span >${consultInfo.workSpace }</span></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td align="center"   colspan="3"><span >${consultInfo.phoneAddress }</span></td>
                                        <td align="center" ></td>
                                        <td align="center" >${consultInfo.emergencyContact }</td>
                                        <td align="center" ></td>
                                        <td align="center" >${consultInfo.emergencyContactMode }</td>
                                    </tr>
                                    <tr>
                                        <td colspan="8"></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.projectName }</span></td>
                                        <td align="center" ></td>
                                        <td colspan="2" align="center" ><span >${project.projectType eq '1'?'职业资格':'学历' }</span></td>
                                        <td align="center" ></td>
                                        <td colspan="2"align="center" ><span >${consultInfo.schoolFrom }</span></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.projectLevelName }</span></td>
                                        <td align="center" ></td>
                                        <td colspan="2"align="center" ><span >${consultInfo.proFrom }</span></td>
                                        <td align="center" ></td>
                                        <td colspan="2"align="center" ><span ></span></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td align="center" ><span >${consultInfo.kTimeValue }</span></td>
                                        <td align="center" ></td>
                                        <td colspan="5" align="center" ><span >学员资料</span></td>
                                    </tr>
                                     <tr style="height: 40px;">
                                     </tr>
                                    <tr>
                                        <td></td>
                                        <td  align="center" class="tsum" colspan="2"><span >${payInfoData.payPx}</span></td>
                                        <td  align="center" class="ttsum" colspan="2">
                                        	<span >${payInfoData.payPxNum}</span>
                                        </td>
                                        <td  align="center" colspan="2">
                                        <span >
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
                                        	</span>
                                        </td>
                                        <td  align="center" >
                                        	<span >${payInfoData.payPxSk eq null || payInfoData.payPxSk eq ''?0:'1'}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td  align="center" class="tsum" colspan="2"><span >${payInfoData.payKw }</span></td>
                                        <td  align="center" class="ttsum" colspan="2">
                                        <span >${payInfoData.payKwNum}</span></td>
                                        <td  align="center" colspan="2">
                                        	<span >
                                        	${payInfoData.payKwSk eq null || payInfoData.payKwSk eq '' || payInfoData.payKwSk eq 0?'':'刷卡缴费:'}${payInfoData.payKwSk eq null || payInfoData.payKwSk eq '' || payInfoData.payKwSk eq 0?'':payInfoData.payKwSk}
                                        	${payInfoData.payKwWeixin eq null || payInfoData.payKwWeixin eq '' || payInfoData.payKwWeixin eq 0?'':'微信缴费:'}${payInfoData.payKwWeixin eq null || payInfoData.payKwWeixin eq '' || payInfoData.payKwWeixin eq 0?'':payInfoData.payKwWeixin}
                                        	${payInfoData.payKwWl eq null || payInfoData.payKwWl eq '' || payInfoData.payKwWl eq 0?'':'网络缴费:'}${payInfoData.payKwWl eq null || payInfoData.payKwWl eq '' || payInfoData.payKwWl eq 0?'':payInfoData.payKwWl}
                                        	${payInfoData.payKwXj eq null || payInfoData.payKwXj eq '' || payInfoData.payKwXj eq 0?'':'现金缴费:'}${payInfoData.payKwXj eq null || payInfoData.payKwXj eq '' || payInfoData.payKwXj eq 0?'':payInfoData.payKwXj}
                                        	${payInfoData.payKwZfb eq null || payInfoData.payKwZfb eq '' || payInfoData.payKwZfb eq 0?'':'支付宝缴费:'}${payInfoData.payKwZfb eq null || payInfoData.payKwZfb eq '' || payInfoData.payKwZfb eq 0?'':payInfoData.payKwZfb}
                                        	${payInfoData.payKwZp eq null || payInfoData.payKwZp eq '' || payInfoData.payKwZp eq 0?'':'支票缴费:'}${payInfoData.payKwZp eq null || payInfoData.payKwZp eq '' || payInfoData.payKwZp eq 0?'':payInfoData.payKwZp}
                                        	${payInfoData.payKwZz eq null || payInfoData.payKwZz eq '' || payInfoData.payKwZz eq 0?'':'转账缴费:'}${payInfoData.payKwZz eq null || payInfoData.payKwZz eq '' || payInfoData.payKwZz eq 0?'':payInfoData.payKwZz}
                                        	</span>
                                        </td>
                                        <td align="center" ></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td  align="center" class="tsum" colspan="2"><span >${payInfoData.payXy }</span></td>
                                        <td  align="center" class="ttsum" colspan="2">
                                        <span >${payInfoData.payXyNum}</span></td>
                                        <td  align="center" colspan="2">
                                        	<span >
                                        	${payInfoData.payXySk eq null || payInfoData.payXySk eq '' || payInfoData.payXySk eq 0?'':'刷卡缴费:'}${payInfoData.payXySk eq null || payInfoData.payXySk eq '' || payInfoData.payXySk eq 0?'':payInfoData.payXySk}
                                        	${payInfoData.payXyWeixin eq null || payInfoData.payXyWeixin eq '' || payInfoData.payXyWeixin eq 0?'':'微信缴费:'}${payInfoData.payXyWeixin eq null || payInfoData.payXyWeixin eq '' || payInfoData.payXyWeixin eq 0?'':payInfoData.payXyWeixin}
                                        	${payInfoData.payXyWl eq null || payInfoData.payXyWl eq '' || payInfoData.payXyWl eq 0?'':'网络缴费:'}${payInfoData.payXyWl eq null || payInfoData.payXyWl eq '' || payInfoData.payXyWl eq 0?'':payInfoData.payXyWl}
                                        	${payInfoData.payXyXj eq null || payInfoData.payXyXj eq '' || payInfoData.payXyXj eq 0?'':'现金缴费:'}${payInfoData.payXyXj eq null || payInfoData.payXyXj eq '' || payInfoData.payXyXj eq 0?'':payInfoData.payXyXj}
                                        	${payInfoData.payXyZfb eq null || payInfoData.payXyZfb eq '' || payInfoData.payXyZfb eq 0?'':'支付宝缴费:'}${payInfoData.payXyZfb eq null || payInfoData.payXyZfb eq '' || payInfoData.payXyZfb eq 0?'':payInfoData.payXyZfb}
                                        	${payInfoData.payXyZp eq null || payInfoData.payXyZp eq '' || payInfoData.payXyZp eq 0?'':'支票缴费:'}${payInfoData.payXyZp eq null || payInfoData.payXyZp eq '' || payInfoData.payXyZp eq 0?'':payInfoData.payXyZp}
                                        	${payInfoData.payXyZz eq null || payInfoData.payXyZz eq '' || payInfoData.payXyZz eq 0?'':'转账缴费:'}${payInfoData.payXyZz eq null || payInfoData.payXyZz eq '' || payInfoData.payXyZz eq 0?'':payInfoData.payXyZz}
                                        	</span>
                                        </td>
                                        <td align="center" ></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td  align="center" class="tsum" colspan="2"><span >${payInfoData.payZl }</span></td>
                                        <td  align="center" class="ttsum" colspan="2">
                                        <span >${payInfoData.payZlNum}</span></td>
                                        <td  align="center" colspan="2">
                                        <span >
                                        	${payInfoData.payZlSk eq null || payInfoData.payZlSk eq '' || payInfoData.payZlSk eq 0?'':'刷卡缴费:'}${payInfoData.payZlSk eq null || payInfoData.payZlSk eq '' || payInfoData.payZlSk eq 0?'':payInfoData.payZlSk}
                                        	${payInfoData.payZlWeixin eq null || payInfoData.payZlWeixin eq '' || payInfoData.payZlWeixin eq 0?'':'微信缴费:'}${payInfoData.payZlWeixin eq null || payInfoData.payZlWeixin eq '' || payInfoData.payZlWeixin eq 0?'':payInfoData.payZlWeixin}
                                        	${payInfoData.payZlWl eq null || payInfoData.payZlWl eq '' || payInfoData.payZlWl eq 0?'':'网络缴费:'}${payInfoData.payZlWl eq null || payInfoData.payZlWl eq '' || payInfoData.payZlWl eq 0?'':payInfoData.payZlWl}
                                        	${payInfoData.payZlXj eq null || payInfoData.payZlXj eq '' || payInfoData.payZlXj eq 0?'':'现金缴费:'}${payInfoData.payZlXj eq null || payInfoData.payZlXj eq '' || payInfoData.payZlXj eq 0?'':payInfoData.payZlXj}
                                        	${payInfoData.payZlZfb eq null || payInfoData.payZlZfb eq '' || payInfoData.payZlZfb eq 0?'':'支付宝缴费:'}${payInfoData.payZlZfb eq null || payInfoData.payZlZfb eq '' || payInfoData.payZlZfb eq 0?'':payInfoData.payZlZfb}
                                        	${payInfoData.payZlZp eq null || payInfoData.payZlZp eq '' || payInfoData.payZlZp eq 0?'':'支票缴费:'}${payInfoData.payZlZp eq null || payInfoData.payZlZp eq '' || payInfoData.payZlZp eq 0?'':payInfoData.payZlZp}
                                        	${payInfoData.payZlZz eq null || payInfoData.payZlZz eq '' || payInfoData.payZlZz eq 0?'':'转账缴费:'}${payInfoData.payZlZz eq null || payInfoData.payZlZz eq '' || payInfoData.payZlZz eq 0?'':payInfoData.payZlZz}
                                        	</span>
                                        </td>
                                        <td align="center" ></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td  align="center" class="tsum" colspan="2"><span >${payInfoData.payJc }</span></td>
                                        <td  align="center" class="ttsum" colspan="2">
                                        <span >${payInfoData.payJcNum}</span></td>
                                        <td  align="center" colspan="2">
                                        <span >
                                        	${payInfoData.payJcSk eq null || payInfoData.payJcSk eq '' || payInfoData.payJcSk eq 0?'':'刷卡缴费:'}${payInfoData.payJcSk eq null || payInfoData.payJcSk eq '' || payInfoData.payJcSk eq 0?'':payInfoData.payJcSk}
                                        	${payInfoData.payJcWeixin eq null || payInfoData.payJcWeixin eq '' || payInfoData.payJcWeixin eq 0?'':'微信缴费:'}${payInfoData.payJcWeixin eq null || payInfoData.payJcWeixin eq '' || payInfoData.payJcWeixin eq 0?'':payInfoData.payJcWeixin}
                                        	${payInfoData.payJcWl eq null || payInfoData.payJcWl eq '' || payInfoData.payJcWl eq 0?'':'网络缴费:'}${payInfoData.payJcWl eq null || payInfoData.payJcWl eq '' || payInfoData.payJcWl eq 0?'':payInfoData.payJcWl}
                                        	${payInfoData.payJcXj eq null || payInfoData.payJcXj eq '' || payInfoData.payJcXj eq 0?'':'现金缴费:'}${payInfoData.payJcXj eq null || payInfoData.payJcXj eq '' || payInfoData.payJcXj eq 0?'':payInfoData.payJcXj}
                                        	${payInfoData.payJcZfb eq null || payInfoData.payJcZfb eq '' || payInfoData.payJcZfb eq 0?'':'支付宝缴费:'}${payInfoData.payJcZfb eq null || payInfoData.payJcZfb eq '' || payInfoData.payJcZfb eq 0?'':payInfoData.payJcZfb}
                                        	${payInfoData.payJcZp eq null || payInfoData.payJcZp eq '' || payInfoData.payJcZp eq 0?'':'支票缴费:'}${payInfoData.payJcZp eq null || payInfoData.payJcZp eq '' || payInfoData.payJcZp eq 0?'':payInfoData.payJcZp}
                                        	${payInfoData.payJcZz eq null || payInfoData.payJcZz eq '' || payInfoData.payJcZz eq 0?'':'转账缴费:'}${payInfoData.payJcZz eq null || payInfoData.payJcZz eq '' || payInfoData.payJcZz eq 0?'':payInfoData.payJcZz}
                                        	</span>
                                        </td>
                                        <td align="center" ></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td  align="center" class="tsum" colspan="2"><span >${payInfoData.payType eq ''?0:payInfoData.payType }</span></td>
                                        <td  align="center" class="ttsum" colspan="2">
                                        <span >
                                         ${payInfoData.payType eq ''?0:payInfoData.payType }</span></td>
                                        <td  align="center" colspan="2">
                                        <span >
                                        	${payInfoData.payKwSk eq null || payInfoData.payKwSk eq '' || payInfoData.payKwSk eq 0?'':'刷卡缴费:'}${payInfoData.payKwSk eq null || payInfoData.payKwSk eq '' || payInfoData.payKwSk eq 0?'':payInfoData.payKwSk}
                                        	${payInfoData.payKwWeixin eq null || payInfoData.payKwWeixin eq '' || payInfoData.payKwWeixin eq 0?'':'微信缴费:'}${payInfoData.payKwWeixin eq null || payInfoData.payKwWeixin eq '' || payInfoData.payKwWeixin eq 0?'':payInfoData.payKwWeixin}
                                        	${payInfoData.payKwWl eq null || payInfoData.payKwWl eq '' || payInfoData.payKwWl eq 0?'':'网络缴费:'}${payInfoData.payKwWl eq null || payInfoData.payKwWl eq '' || payInfoData.payKwWl eq 0?'':payInfoData.payKwWl}
                                        	${payInfoData.payKwXj eq null || payInfoData.payKwXj eq '' || payInfoData.payKwXj eq 0?'':'现金缴费:'}${payInfoData.payKwXj eq null || payInfoData.payKwXj eq '' || payInfoData.payKwXj eq 0?'':payInfoData.payKwXj}
                                        	${payInfoData.payKwZfb eq null || payInfoData.payKwZfb eq '' || payInfoData.payKwZfb eq 0?'':'支付宝缴费:'}${payInfoData.payKwZfb eq null || payInfoData.payKwZfb eq '' || payInfoData.payKwZfb eq 0?'':payInfoData.payKwZfb}
                                        	${payInfoData.payKwZp eq null || payInfoData.payKwZp eq '' || payInfoData.payKwZp eq 0?'':'支票缴费:'}${payInfoData.payKwZp eq null || payInfoData.payKwZp eq '' || payInfoData.payKwZp eq 0?'':payInfoData.payKwZp}
                                        	${payInfoData.payKwZz eq null || payInfoData.payKwZz eq '' || payInfoData.payKwZz eq 0?'':'转账缴费:'}${payInfoData.payKwZz eq null || payInfoData.payKwZz eq '' || payInfoData.payKwZz eq 0?'':payInfoData.payKwZz}
                                        	</span>
                                        </td>
                                        <td align="center" ></td>
                                    </tr>
                                    <tr>
                                        <td align="center" ></td>
                                        <td   align="center" colspan="2"><span id="sum" ></span></td>
                                        <td    align="center" colspan="2"><span id="ssum" ></span></td>
                                        <td   align="center" colspan="2"><span id="sssum" ></span></td>
                                        <td  align="center" id="ssssum"></td>
                                    </tr>
                                     <tr height="20px">
                                     	<td colspan="8"></td>
                                     </tr>
                                     <tr height="20px">
                                     	<td colspan="8"></td>
                                     </tr>
                                     <tr height="20px">
                                     	<td colspan="8"></td>
                                     </tr>
                                    <tr>
                                        <td align="center"></td>
                                        <td align="center"><span>${consultInfo.studentPhone }</td>
                                        <td align="center"></td>
                                        <c:set value="${fn:length(consultInfo.idcard)}" var="length" />
                                        <td colspan="2">${fn:substring(consultInfo.idcard,length-6,length)}</td>
                                        <td align="center"></td>
                                        <td align="center"colspan="2">网址</td>
                                    </tr>
                                    <tr style="height:100px;">
                                    	<td ></td>
                                        <td align="center" colspan="7">说明</td>
                                    </tr>
                                    <tr style="height:310px;">
                                        <td align="center"  colspan="8"></td>
                                    </tr>
                                    <tr >
                                        <td align="center" ></td>
                                        <td align="center" >${sy.realName }</td>
                                        <td align="center" ></td>
                                        <td align="center" ></td>
                                        <td colspan="2" align="center" >${user }</td>
                                        <td align="center" ></td>
                                        <td align="center" ></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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
	window.print();  
})
</script>
</html>
