<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.crm.dubbo.util.PropertyReaderUtil" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>  
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
request.setAttribute("ctx", basePath);
request.setAttribute("ctx_static", basePath+"/statics_html");
request.setAttribute("fdfs_host",PropertyReaderUtil.getValue("/config.properties", "fdfs_host"));
%>
<!-- 主要在首页作用 -->
<script type="text/javascript">
	var ctx = '${ctx}';
	var ctx_static = '${ctx_static}';
	var fdfs_host='${fdfs_host}';
	var realName = '${currentUser.realName }';
</script>