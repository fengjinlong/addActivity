<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/productStorehouse/css/productStorehouse.css" rel="stylesheet">
<link rel="stylesheet" href="${ctx_static }/dep/zTree/metroStyle/metroStyle.css">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">教师设置</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">	
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-5 col-sm-5 no-margin-right">
								<input type="text" class="form-control" placeholder="教师姓名" id="searchVal" onkeydown="search();">
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
									<th>教师姓名</th>
									<th>所属 </th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
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
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">教师名称</label>
						<div class="col-sm-10">
							<input type="text" class="form-control teacherName" name="teacherName">
						</div>
					</div>
				
				
				   <!-- <div class="form-group col-sm-12 ztreeList">
				       <label class="control-label col-sm-2 no-padding-right">所属</label>
				       <div class="col-sm-9">
				       <ul class="ztree" id="ztreeList"></ul>
				       <input type="hidden" class="form-control departmentName" name="departmentName" id="addDepartmentName"/>
				       <input type="hidden" class="form-control addDepartmentId" name="addDepartmentId" id="addDepartmentId"/>
				       </div>
				   </div> -->
				   
					<div class="form-group col-sm-12">
                        <label class="control-label col-sm-2">所属<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <input readonly onclick="showMenu('addDepartmentName', 1)" id="addDepartmentName" name="departmentName" class="form-control departmentName"></input>
                            <input type="hidden" id="addDepartmentId" name="departmentId" class="form-control departmentId"></input>
                        </div>
                        
                    </div>
                    
					
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
				<input type="hidden" name="teacherId" id="editTeacherId" value="">
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">教师名称</label>
						<div class="col-sm-10">
							<input type="text" class="form-control teacherName" name="teacherName">
						</div>
					</div>
				
					<!-- <div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">所属</label>
						<div class="col-sm-9">
							<select id="editDepartment" name="departmentId" class="form-control departmentId">
							</select>
							<input type="hidden" class="form-control departmentName" name="departmentName" id="editDepartmentName"/>
						</div>
					</div> -->
					
					<div class="form-group col-sm-12">
                        <label class="control-label col-sm-2">所属<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <input readonly onclick="showMenu('editDepartmentName', 1)" id="editDepartmentName" name="departmentName" class="form-control departmentName"></input>
                            <input type="hidden" id="editDepartment" name="departmentId" class="form-control departmentId"></input>
                        </div>
                        
                    </div>
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

<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index:99999;max-height:200px">
   <ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 200px"></ul>
  </div>
<script src="${ctx_static }/home/productStorehouse/js/teacher.js?v=<%= Math.random()%>"></script> 

