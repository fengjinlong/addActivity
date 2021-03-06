<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/productStorehouse/css/productStorehouse.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header">
				<div class="widget-buttons">
				</div>
				<!--Widget Buttons-->
			</div>
			<!--Widget Header-->
			<div class="widget-body">	
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-5 col-sm-5 no-margin-right">
								<input type="text" class="form-control" placeholder="${menuName }" id="searchVal" onkeydown="search();">
							</div>
							<div class="form-group col-lg-3 col-md-4 col-sm-4">
								 <!-- <button type="button" class="btn btn-blue form-control search-btn" >搜索</button>-->
								<a type="button" class="btn increase  form-control search-btn"  href="javaScritpt:;">
								<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						<div class="form-group col-lg-1 col-md-2 col-sm-2  pull-right margin-right-5">
							<button class="btn increase pull-right form-control addBtn" data-toggle="modal" data-target=".subjectAdd" data-backdrop="static">
								<i class="fa fa-plus"></i> 新增
							</button>
						</div>
					</div>
					<div class="dataTables_wrapper form-inline no-footer">
						<table class="table table-striped table-hover table-bordered dataTable no-footer" id="moneyKind">
							<thead>
								<tr role="row">
									<th>${menuName }名称 </th>
									<th>操作</th>
								</tr>
							</thead>

							<tbody>
							</tbody>
						</table>
						<!--用来记录表名  -->
						<input type="hidden" id="tableName" value="${tableName }"/>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--新增-->
<div class="modal fade subjectAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="subjectAdd" method="post">
					<input type="hidden" name="tableName" value="${tableName }"/>
					<c:forEach items="${fieldsList }" var="field" varStatus="sta">
					<!--第一条记录是主键，用来存储主键名称，后台新增操作需要知道主键名。同时也是在页面上用来存储主键的名称，供其它操作用——删除  -->
						<c:if test="${sta.count==1 }">
							<input type="hidden" name="id" id="id" value="${field.enName }">
						</c:if>
						<c:if test="${sta.count>1 }">
							<div class="form-group col-sm-12">
								<label class="control-label col-sm-2 no-padding-right">${field.chName }</label>
								<div class="col-sm-9">
									<%-- <input type="text" class="form-control fullName" name="mapVo['${field.enName }']"> --%>
									<input type="text" class="form-control fullName" name="${field.enName }">
								</div>
							</div>
						</c:if>
					</c:forEach>
					<div class="form-group col-sm-12">
						<div class="col-sm-2 col-sm-offset-4"> <button type="submit" class="btn btn-primary btn-lg">确认 </button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!--编辑-->
<div class="modal fade subjectEdit" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="subjectEdit" method="post">
				<input type="hidden" name="idValue" value=""/>
				<input type="hidden" name="tableName" value="${tableName }"/>
					<c:forEach items="${fieldsList }" var="field" varStatus="sta">
						<c:if test="${sta.count==1 }">
							<input type="hidden" name="idName" id="id" value="${field.enName }">
						</c:if>
						<c:if test="${sta.count>1 }">
							<div class="form-group col-sm-12">
								<label class="control-label col-sm-2 no-padding-right">${field.chName }</label>
								<div class="col-sm-9">
									<%-- <input type="text" class="form-control fullName" name="mapVo['${field.enName }']"> --%>
									<input type="text" class="form-control fullName" name="${field.enName }">
								</div>
							</div>
						</c:if>
					</c:forEach>
					<div class="form-group col-sm-12">
						<div class="col-sm-2 col-sm-offset-4"> <button type="submit" class="btn btn-primary btn-lg">确认 </button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="${ctx_static }/home/productStorehouse/js/course.js?v=+<%=Math.random() %>"></script> 

