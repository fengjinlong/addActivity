<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<ul class="submenu">
	<c:forEach items="${childs}" var="child">
	<li>
		<a href="#" class="menu-dropdown">
		   <span class="menu-text">${child.fullName}</span>
		   <input class="menu-id" type="hidden" value="${child.menuId}"/>
		   <input type="hidden" value="${child.menuId}"/>
		   <input class="navigate-url" type="hidden" value="${child.navigateUrl}"/>
		   <input class="sortCode" type="hidden" value="${child.sortCode}"/>
		   <input class="parent-name" type="hidden" value="${parentName}"/>
		   <input class="icon-img" type="hidden" value="${child.img}"/>
		   <input class="enable" type="hidden" value="${child.enable}"/>
		   <input class="target" type="hidden" value="${child.target}"/>
		   <c:if test="${!empty child.childs}">
           		<i class="fa fa-angle-right pull-right"></i>
           </c:if>	
		</a>
 		<c:if test="${fn:length(child.childs) > 0}">
 			<c:set var="parentName" value="${child.fullName}" scope="request" />
			<c:set var="childs" value="${child.childs}" scope="request" />
			<c:import url="r_menu.jsp" />
		</c:if>
	</li>
	</c:forEach>
</ul>

