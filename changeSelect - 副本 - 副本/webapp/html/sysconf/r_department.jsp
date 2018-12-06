<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<ul class="submenu">
        <c:forEach items="${childs}" var="child">
            <li>
              <a href="#" class="menu-dropdown">
                   <img src="${ctx_static }/common/image/group-icon.png" alt="">
                   <i class="fa fa-plus-square-o collapse-right pull-right"></i>
                   <span class="menu-text">${child.fullName}</span>
                   <input class="department-id" type="hidden" value="${child.departmentId}"/>
                   <input class="parentId" type="hidden" value="${child.parentId}"/>
                	<input class="companyId" type="hidden" value="${child.companyId}"/>
       			   <input class="type" type="hidden" value="${child.type}"/>
       			   <input class="enable" type="hidden" value="${child.enable}"/>
       			   <input class="shortName" type="hidden" value="${child.shortName}"/>
       			   <input class="description" type="hidden" value="${child.description}"/>
       			   <input class="code" type="hidden" value="${child.code}"/>
       			   <input class="parent-name" type="hidden" value="${child.parentName }"/>
       			   <input class="fullPath" type="hidden" value="${child.fullPath }"/>
               </a>
               <c:set var="childs" value="${child.childs}" scope="request" />
			   <c:import url="r_department.jsp" /> 
             </li>
         </c:forEach>
</ul> 