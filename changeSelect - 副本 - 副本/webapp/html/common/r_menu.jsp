<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<ul class="submenu">
	<c:forEach items="${childs}" var="child">
	<c:set var="pageC" value="${fn:split(child.navigateUrl,'/')[0]}"></c:set>
    <shiro:hasPermission name="${pageC }:view">
    <c:if test="${child.enable eq '1' }">
		<li>
	        <a href="#" onclick="loadHtml('${child.navigateUrl}', this)">
	            <span class="menu-text">${child.fullName}</span>
	            <c:if test="${!empty child.childs}">
		           	<i class="menu-expand"></i>
	           	</c:if>
	        </a>
	        <c:if test="${fn:length(child.childs) > 0}">
				<c:set var="childs" value="${child.childs}" scope="request" />
				<c:import url="r_menu.jsp" />
			</c:if>
	    </li>
    </c:if>
    </shiro:hasPermission>
	</c:forEach>
</ul>
