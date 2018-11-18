<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
	
	<div class="page-sidebar" id="sidebar">
            <!-- 左侧菜单 -->
            <ul class="nav sidebar-menu">
                <!--工作台-->
                <li class="active">
                    <a href="#" data-addtab="console" data-url="${ctx}/console/index">
                        <i class="menu-icon glyphicon glyphicon-home"></i>
                        <span class="menu-text">工作台</span>
                    </a>
                </li>
                <c:forEach items="${list}" var="record">
                <c:set var="page" value="${fn:split(record.navigateUrl,'/')[0]}"></c:set>
                <shiro:hasPermission name="${page }:view">
	                	<c:if test="${record.enable eq '1' }">
		                <li>
		                	<a href="#" class="menu-dropdown">
		                        <i class="menu-icon fa ${record.img}"></i>
		                        <span class="menu-text">${record.fullName}</span>
		                        <c:if test="${!empty record.childs}">
		                        	<i class="menu-expand"></i>
		                        </c:if>
		                    </a>
		                    <c:set var="childs" value="${record.childs}" scope="request" />
		                    <c:import url="r_menu.jsp" />
		                </li>
		             </c:if>
                </shiro:hasPermission>
                </c:forEach>
        </div>
