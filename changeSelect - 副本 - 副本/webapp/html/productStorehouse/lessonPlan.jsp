<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/productStorehouse/css/productStorehouse.css" rel="stylesheet">

<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">课程计划</span>
            </div>
			<!--Widget Header-->
			<div class="widget-body">	
				<div class="widget-main">
					<div class="row row_padding form-horizontal">
						<div class="col-md-4 col-sm-4 col-xs-12">
							<div class="form-group col-md-8 col-sm-8 no-margin-right">
								<input type="text" class="form-control" placeholder="产品模型/产品" id="searchVal" onkeydown="search();">
							</div>
							<div class="form-group col-lg-4 col-md-4 col-sm-4">
								 <!-- <button type="button" class="btn btn-blue form-control search-btn" >搜索</button>-->
								<a type="button" class="btn increase  form-control search-btn"  href="javaScritpt:;">
								<i class="fa fa-search"></i> 搜索
								</a>
							</div>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-12">
							<label class="control-label col-sm-2 no-padding-right">考期</label>
							<div class="col-sm-9">
								<select id="productExamTime" onchange="changeByExam()" class="form-control productExamTime" >
								
								</select>
							</div>
						</div>
						<div class="form-group col-lg-1 col-md-2 col-sm-2  pull-right margin-right-5">
							<button class="btn increase pull-right form-control addBtn" data-toggle="modal" data-target=".subjectAdd" data-backdrop="static">
								<i class="fa fa-plus"></i> 新增
							</button>
						</div>
					</div>
					<div class="">	
						<div class="dataTables_wrapper">
							<table class="table table-striped table-hover table-bordered dataTable" id="moneyKind" style="width:100%">
								<thead>
									<tr role="row">
										<th style="width:10%">所属 </th>
										<th style="width:10%">产品模型</th>
										<th style="width:10%">产品</th>
										<th style="width:10%">考期</th>
										<th style="width:10%">上课时间</th>
										<th style="width:10%">教室</th>
										<th style="width:10%">教室费用</th>
										<th style="width:10%">教师</th>
										<th style="width:10%">教师费用</th>
										<th style="width:10%">操作</th>
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
</div>
<%@ include file="../common/public_footer.jsp"%>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>

<!--新增-->
<div class="modal fade subjectAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:1000px">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">新增</span>
			</div>
			<div class="modal-body clearfix">
<%-- 				<form class="form-horizontal" id="subjectAdd" action="${ctx }/proLessonPlan/addLessonPlan" method="post" enctype="multipart/form-data" >
 --%>				<form class="form-horizontal" id="subjectAdd" method="post" >
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">学员所属</label>
						<div class="col-sm-9">
							<!-- <select id="addDepartment" name="departmentId" class="form-control departmentId selectpicker show-tick show-menu-arrow" multiple="multiple" data-max-option="1">
							
							</select> -->
							<input readonly onclick="showMenu('addDepartmentName')" id="addDepartmentName" name="departmentName" class="form-control departmentName"></input>
                            <input type="hidden" id="addDepartmentId" name="departmentId" class="form-control departmentId"></input>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">产品模型</label>
						<div class="col-sm-9">
							<select id="addProductModel" onchange="generatePro(this)" name="productModelId" class="form-control productModelId">
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">产品名称</label>
						<div class="col-sm-9">
							<select id="addProduct" name="productId" onchange="generateExamTime(this)" class="form-control productId">
							</select>
						</div>
						<script type="text/javascript">
						$("#addProduct").html("<option value=''>--请选择--</option>");
						$("#addProduct").trigger('chosen:updated');
						$("#addProduct").chosen({no_results_text: "没有匹配项", search_contains: true});
					    $('.chosen-container').width('100%');
						</script>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">考期</label>
						<div class="col-sm-9">
							<select id="addProductExamTime" name="productExamTimeId" class="form-control productExamTimeId">
							</select>
						</div>
						<script type="text/javascript">
						$("#addProductExamTime").html("<option value=''>--请选择--</option>");
						$("#addProductExamTime").trigger('chosen:updated');
						$("#addProductExamTime").chosen({no_results_text: "没有匹配项", search_contains: true});
					    $('.chosen-container').width('100%');
						</script>
					</div>
					
					<div class="form-inline no-footer">
                        <div class="table-scrollable" style="overflow-y:auto">
						<table class="table table-striped table-hover table-bordered no-footer" >
							<thead>
								<tr role="row">
									<th>单元 </th>
									<th>上课时间</th>
									<th>教室</th>
									<th>费用</th>
									<th>教师</th>
									<th>费用</th>
									<th>跟班老师</th>
									<th>费用</th>
									<th>上课人数</th>
									<th>课件</th>
									<th>
										操作
            						 	<!-- <i onclick="addRow(this)" data-index="1" class="fa  fa-plus-circle payment-btn blue control-label"></i> -->
									</th>
								</tr>
							</thead>

							<tbody id="addTbody">
								<tr>
									<td>
										<div class="col-sm-12 setName">
											<select class="form-control lessonPlanUnitId" name="detailList[0].lessonPlanUnitId" onchange="setName(this)">
											</select>
											<input type="hidden" name="detailList[0].lessonPlanUnitName" class="form-control lessonPlanUnitName"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<input type="text" class="form-control schoolTime" name="detailList[0].schoolTime"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12 setName">
											<select class="form-control schoolRoomId" name="detailList[0].schoolRoomId" onchange="setName(this)">
											</select>
											<input type="hidden" name="detailList[0].schoolRoomName" class="form-control schoolRoomName"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<input type="text" class="form-control schoolRoomPay" onblur="validataInt(this)" name="detailList[0].schoolRoomPay" style="width:70px"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12 setName">
											<select type="text" class="form-control teacherId" name="detailList[0].teacherId" onchange="setName(this)">
											</select>
											<input type="hidden" name="detailList[0].teacherName" class="form-control teacherName"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<input type="text" class="form-control teacherPay" onblur="validataInt(this)" name="detailList[0].teacherPay" style="width:70px"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<input type="text" class="form-control classroomTeacher" name="detailList[0].classroomTeacher" style="width:70px"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<input type="text" class="form-control classroomTeacherPay" onblur="validataInt(this)" name="detailList[0].classroomTeacherPay" style="width:70px"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<input type="text" class="form-control studentsSize" onblur="validataInt(this)" name="detailList[0].studentsSize" style="width:70px"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<!-- <input type="file" id="uploadFile" name="myfile" class="form-control coursewareContent uploadFile"/>
											<input type="hidden" id="uploadFileName" name="detailList[0].courseware" class="form-control courseware uploadFileName"/> -->
										</div>
									</td>
									<td>
										<div class="col-sm-12">
											<!-- <a href="javascript:void(0);" onclick="submitLessPlan(this)"><i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>
											<a href="javascript:void(0);" onclick="deleteLessPlan(this)"><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a> -->
											<!-- <i onclick="subRow(this)" data-index="2" class="fa  fa-minus-circle payment-btn blue control-label"></i> -->
											<a href="javascript:void(0);" onclick="addRow(this)"><i data-index="1" class="fa  fa-plus-circle payment-btn blue control-label"></i></a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
                	</div>
					
					<div class="form-group col-sm-12" style="margin-top:30px">
						<div class="col-sm-2 col-sm-offset-4"> <button type="submit" class="btn btn-primary btn-lg">确认 </button>
<!-- 						<button type="button" onclick="submitAdd()" class="btn btn-primary btn-lg">确认 </button>
 -->						</div>
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
	<div class="modal-dialog modal-lg" style="width:1000px">
		<div class="modal-content">
			<div class="modal-header bordered-blue">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<span class="widget-caption">编辑</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="subjectEdit" action="${ctx }/proLessonPlan/editLessonPlan" method="post" enctype="multipart/form-data">
				<input type="hidden" name="lessonPlanId" id="lessonPlanId" value="">
				<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">学员所属</label>
						<div class="col-sm-9">
							<!-- <select id="editDepartment" name="departmentId" class="form-control departmentId selectpicker show-tick show-menu-arrow" multiple="multiple" data-max-option="1">
							
							</select> -->
							<input readonly onclick="showMenu('editDepartmentName')" id="editDepartmentName" name="departmentName" class="form-control departmentName"></input>
                            <input type="hidden" id="editDepartmentId" name="departmentId" class="form-control departmentId"></input>
						
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">产品模型</label>
						<div class="col-sm-9">
							<select id="editProductModel" onchange="generatePro(this)" name="productModelId" class="form-control productModelId">
							
							</select>
						</div>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">产品名称</label>
						<div class="col-sm-9">
							<select id="editProduct" onchange="generateExamTime(this)" name="productId" class="form-control productId">
							</select>
						</div>
						<script type="text/javascript">
						$("#editProduct").html("<option value=''>--请选择--</option>");
						$("#editProduct").trigger('chosen:updated');
						$("#editProduct").chosen({no_results_text: "没有匹配项", search_contains: true});
					    $('.chosen-container').width('100%');
						</script>
					</div>
					<div class="form-group col-sm-12">
						<label class="control-label col-sm-2 no-padding-right">考期</label>
						<div class="col-sm-9">
							<select id="editProductExamTime" name="productExamTimeId" class="form-control productExamTimeId">
							</select>
						</div>
						<script type="text/javascript">
						$("#editProductExamTime").html("<option value=''>--请选择--</option>");
						$("#editProductExamTime").trigger('chosen:updated');
						$("#editProductExamTime").chosen({no_results_text: "没有匹配项", search_contains: true});
					    $('.chosen-container').width('100%');
						</script>
					</div>
					<div class="form-inline no-footer">
                         <div class="table-scrollable tabs-flat">
                    <!-- <div class="table-scrollable tab-content tabs-flat"> -->
						<table class="table table-striped table-hover table-bordered no-footer">
							<thead>
								<tr role="row">
									<th>单元 </th>
									<th>上课时间</th>
									<th>教室</th>
									<th>费用</th>
									<th>教师</th>
									<th>费用</th>
									<th>跟班老师</th>
									<th>费用</th>
									<th>上课人数</th>
									<th>课件</th>
									<th>操作</th>
								</tr>
							</thead>

							<tbody id="editTbody">
								<tr>
									<td>
										<div class="col-sm-12 setName" style="padding:0">
											<input id="detailId" type="hidden" name="detailList[0].detailId" class="form-control detailId"> <!-- 主键id -->
											<select class="form-control lessonPlanUnitId" name="detailList[0].lessonPlanUnitId" onchange="setName(this)">
											</select>
											<input type="hidden" name="detailList[0].lessonPlanUnitName" class="form-control lessonPlanUnitName"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<input type="text" class="form-control schoolTime" name="detailList[0].schoolTime"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12 setName" style="padding:0">
											<select class="form-control schoolRoomId" name="detailList[0].schoolRoomId" onchange="setName(this)">
											</select>
											<input type="hidden" name="detailList[0].schoolRoomName" class="form-control schoolRoomName"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<input type="text" class="form-control schoolRoomPay" onblur="validataInt(this)" name="detailList[0].schoolRoomPay"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12 setName" style="padding:0">
											<select type="text" class="form-control teacherId" name="detailList[0].teacherId" onchange="setName(this)">
											</select>
											<input type="hidden" name="detailList[0].teacherName" class="form-control teacherName"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<input type="text" class="form-control teacherPay" onblur="validataInt(this)" name="detailList[0].teacherPay"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<input type="text" class="form-control classroomTeacher" name="detailList[0].classroomTeacher"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<input type="text" class="form-control classroomTeacherPay" onblur="validataInt(this)" name="detailList[0].classroomTeacherPay"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<input type="text" class="form-control studentsSize" onblur="validataInt(this)" name="detailList[0].studentsSize"/>
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<!-- <input type="file" id="editUploadFile" name="myfile" class="form-control coursewareContent uploadFile"/>
											<input type="text" id="editUploadFileName" name="detailList[0].courseware" class="form-control courseware uploadFileName"/> -->
										</div>
									</td>
									<td>
										<div class="col-sm-12" style="padding:0">
											<a ><i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>
											<a ><i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					</div>
					
					<div class="form-group col-sm-12" style="margin-top:30px">
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

<!--上传文件预览以及下载弹框  -->
<div class="modal fade download-file" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">文件下载</span>
            </div>
            <div class="modal-body clearfix">
                <div class="dataTables_wrapper form-inline no-footer">
                <form class="form-horizontal" id="downloadFileForm" >
                		<!-- 保存产品详情id -->
                		<input type="hidden" id="downFileDetailId" />
                         <div class="table-scrollable">
                            <table id="downloadFileTab" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="downloadFileRow">
                                    <th>文件名称</th>
                                    <th>下载</th>
                                    <th>删除</th>
                                </tr>
                                </thead>
                                <tbody id="downloadFileTbody">
                                </tbody>
                            </table>
                		</div>
                	</div>
                </form>
            </div>
        </div>
    </div>
</div>

<div id="uploadDiv">

</div>

<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index:99999;max-height:200px">
   <ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 200px">
   </ul>
   
</div>
<%-- <script src="${ctx_static }/home/productStorehouse/js/lessonPlan.js"></script>  --%>

<script src="${ctx_static }/home/productStorehouse/js/lessonPlanNew.js?v=<%= Math.random()%>"></script> 
<script src="${ctx_static }/home/productStorehouse/js/departmentTree.js?v=<%= Math.random()%>"></script> 
<script src="${ctx_static }/home/productStorehouse/js/myfileUpload.js?v=<%= Math.random()%>"></script> 
