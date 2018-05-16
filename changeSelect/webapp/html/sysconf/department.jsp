<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/department1.css">
<div class="row page-wrapper">
    <!--部门-->
    <div class="col-md-4">
        <div class="widget">
            <div class="widget-header bordered-blue bordered-bottom-2">
                <span class="widget-caption">部门</span>
                <div class="widget-buttons">
                	<shiro:hasPermission name="department:add">
                    <a href="#" class="btn increase addBtn" title="添加" style="width:60px;margin-top:6px;">
                        <i class="fa fa-plus"></i> 添加
                    </a>
                    </shiro:hasPermission>
                </div>
            </div>
            <div class="widget-body clearfix">
                <ul id="departmentTree" class="ztree"></ul>
            </div>
        </div>
    </div>

    <div class="col-md-8">
        <!-- 部门信息 -->
        <div class="widget departmentInfo">
            <div class="widget-header bordered-blue bordered-bottom-2">
                <span class="widget-caption">部门信息</span>
                <div class="widget-buttons">
                </div>
            </div>
            <div class="widget-body clearfix">
                <form role="form" class="form-horizontal">
                    <div class="form-group">
                        <label for="depNum" class="col-sm-2 control-label">编号</label>
                        <div class="col-sm-8">
                            <input type="text" name="code" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="depName" class="col-sm-2 control-label">部门名称</label>
                        <div class="col-xs-8">
                            <input type="text" name="fullName" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="depShort" class="col-sm-2 control-label">简称</label>
                        <div class="col-xs-8">
                            <input type="text" name="shortName" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="superior" class="col-sm-2 control-label">上级部门</label>
                        <div class="col-xs-8">
                            <input type="text" name="parentName" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group">
               <label for="type" class="col-xs-2 control-label">部门类型</label>
               <div class="col-sm-8">
                    <input type="text" name="type" class="form-control" value="" disabled>
               </div>
           </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">状态</label>
                        <div class="col-xs-8 disabled">
                            <input type="text" name="enable" class="form-control" value="" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="superior" class="control-label col-sm-2">描述</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" name="description" rows="6" disabled></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- 添加部门 -->
        <div class="widget departmentAdd">
            <div class="widget-header bordered-blue bordered-bottom-2">
                <span class="widget-caption">添加部门</span>
                <div class="widget-buttons">
                </div>
            </div>
            <div class="widget-body">
                <form role="form" class="form-horizontal" id="addDepartment" method="post"> 
                    <div class="form-group">
                        <label for="depNum" class="col-sm-2 control-label">编号
			<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" name="code" class="form-control" id="code" placeholder="请输入编号">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="depName" class="col-sm-2 control-label">部门名称
			<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" name="fullName" class="form-control" id="fullName" placeholder="请输入部门名称(例:总裁办)">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="depShort" class="col-sm-2 control-label">简称
			<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" name="shortName" class="form-control" id="shortName" placeholder="请输入部门简称(例:总裁办)">
                            <input name="fullPath" type="hidden" value=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="superior" class="col-sm-2 control-label">上级部门
			<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" name="parentName" class="form-control" id="parentName" value="" readonly>
                            <input name="parentId"  type="hidden" value=""/>
               				<input name="companyId" type="hidden" value=""/>
                        </div>
                    </div>
                    <div class="form-group">
               <label for="type" class="col-xs-2 control-label">部门类型
		<span class="control-label mandatory">*</span></label>
               <div class="col-sm-8">
                     <select name="type" class="form-control">
                           <option value="1">公司</option>
                           <option value="2">部门</option>
                           <option value="3">分校</option>
                     </select>
               </div>
           </div>
                    <div class="form-group col-sm-12 col-xs-12">
                        <label class="col-sm-2 control-label">状态</label>
                        <div class="col-sm-8">
                            <div class="radio-inline">
                                <label>
                                    <input name="enable" id="enable" type="radio" checked value="1">
                                    <span class="text">有效</span>
                                </label>
                            </div>
                            <div class="radio-inline">
                                <label>
                                    <input name="enable" id="enable" type="radio" value="0">
                                    <span class="text">无效</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="superior" class="control-label col-sm-2">描述</label>
                        <div class="col-sm-8">
                            <textarea id="description" class="form-control" name="description" rows="6"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer col-sm-10">
                       
                        <div class="col-sm-2  col-sm-offset-5">
                            <button type="submit"
                                    class="btn btn-primary btn-lg form-control confirm-btn">确认
                            </button>
                        </div>
                         <div class="col-sm-2">
                            <button type="button"
                                    class="btn btn-danger btn-lg form-control cancel-btn">取消
                            </button>
                        </div>
                    </div>
                </form>
            </div><!--Widget Body-->
</div>

          <!-- 编辑部门-->
        <div class="widget departmentEdit">
            <div class="widget-header bordered-blue bordered-bottom-2">
                <span class="widget-caption">编辑部门</span>
                <div class="widget-buttons">
                </div>
            </div><!--Widget Header-->
                       <div class="widget-body">
                           <form role="form" class="form-horizontal" id="editDepartmentEdit" method="post">
                               <div class="form-group">
                                   <label class="col-sm-2 control-label">编号
					<span class="control-label mandatory">*</span></label>
                                   <div class="col-sm-8">
                                       <input type="text" name="code" class="depNum form-control" value="">
                                       <input name="departmentId" type="hidden" value=""/>
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-sm-2 control-label">部门名称
						<span class="control-label mandatory">*</span></label>
                                   <div class="col-sm-8">
                                       <input type="text" name="fullName" class="form-control depName" value="">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-sm-2 control-label">简称
						<span class="control-label mandatory">*</span></label>
                                   <div class="col-xs-8">
                                       <input type="text" name="shortName" class="form-control depShort" value="">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-sm-2 control-label">上级部门
						<span class="control-label mandatory">*</span></label>
                                   <div class="col-sm-8">
                                       <input type="text" name="parentName" class="form-control" value="" readonly>
                                   </div>
                               </div>
                               <div class="form-group">
                          <label for="type" class="col-xs-2 control-label">部门类型
						<span class="control-label mandatory">*</span></label>
                          <div class="col-sm-8">
                                <select name="type" class="form-control" disabled="disabled">
                                	<option value="1">公司</option>
                                	<option value="2">部门</option>
                                	<option value="3">分校</option>
                                </select>
                          </div>
                      </div>
                               <div class="form-group">
                                   <label class="col-sm-2 control-label">状态</label>
                                   <div class="col-sm-8">
                                       <div class="radio-inline">
                                           <label>
                                               <input name="enable" type="radio" class="valid" checked value="1">
                                               <span class="text">有效</span>
                                           </label>
                                       </div>
                                       <div class="radio-inline">
                                           <label>
                                               <input name="enable" type="radio" class="invalid" value="0">
                                               <span class="text">无效</span>
                                           </label>
                                       </div>
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="control-label col-sm-2">描述</label>
                                   <div class="col-xs-9 col-ms-10">
                                       <textarea class="form-control depDescribe" name="description" rows="6"></textarea>
                                   </div>
                               </div>
                               <div class="form-group col-sm-10 modal-footer">
                                   <div class="col-sm-2 col-sm-offset-5">
                                       <button type="submit" class="btn btn-primary btn-lg form-control confirm-btn">确认
                                       </button>
                                   </div>
                                   <div class="col-sm-2 ">
                                       <button type="button" class="btn btn-danger btn-lg form-control cancel-btn">取消
                                       </button>
                                   </div>
                               </div>
                           </form>
                       </div><!--Widget Body-->
        </div>
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>
     
<script>
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span"); //获取节点信息
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    
    var editStr = "<shiro:hasPermission name='department:edit'><span class='button edit' id='editBtn_" + treeNode.tId + "' title='编辑' ></span></shiro:hasPermission>";
    var addStr = "<shiro:hasPermission name='department:add'><span class='button add' id='addBtn_" + treeNode.tId + "' title='新增' onfocus='this.blur();'></span></shiro:hasPermission>"; //定义添加按钮
    sObj.after(editStr + addStr); //加载添加按钮
    var addBtn = $("#addBtn_" + treeNode.tId);
    var editBtn = $("#editBtn_" + treeNode.tId);
    
    addBtn.on("click", function (event) {
        $('.departmentAdd').addClass('animated bounceInRight').show();
        $('.departmentInfo,.departmentEdit').hide();
        var departmentId = treeNode.departmentId;
        //公司ID
        var companyId = treeNode.companyId;
        var type = treeNode.type;
        if(type==1||type==3){
        	$('.departmentAdd input[name="parentId"]').val(departmentId);
    		$('.departmentAdd input[name="companyId"]').val(departmentId);
        }
        if(type==2){
        	$('.departmentAdd input[name="parentId"]').val(departmentId);
    		$('.departmentAdd input[name="companyId"]').val(companyId);
        }
        //fullpath
        var parentFullPath = treeNode.fullPath;
        var fullPath =[];
        fullPath.push(parentFullPath);
        fullPath.push(departmentId);
        $('.departmentAdd input[name="fullPath"]').val(fullPath);
        //上级部门
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {departmentId : departmentId},
            dataType: 'json',
            success: function (data) {
            		var parentId = data.list[0].departmentId;
            		var fullName = data.list[0].fullName;
            		$('.departmentAdd input[name="parentId"]').val(departmentId);
            		$('.departmentAdd input[name="parentName"]').val(fullName);
            	}
        });
        event.stopPropagation();
    });
    
    
    editBtn.on("click", function (event) {
    	
        $('.departmentEdit').addClass('animated bounceInRight').show();
        $('.departmentAdd,.departmentInfo').hide(); 
        $('.departmentEdit input[name="departmentId"]').val(treeNode.departmentId);
        $('.departmentEdit input[name="code"]').val(treeNode.code);
        $('.departmentEdit input[name="fullName"]').val(treeNode.fullName);
        $('.departmentEdit input[name="shortName"]').val(treeNode.shortName);
        $('.departmentEdit select[name="type"]').val(treeNode.type);
        $('.departmentEdit textarea[name="description"]').val(treeNode.description);
        
        var departmentId = treeNode.departmentId;
        $.ajax({
            url: ctx + '/department/getAllOption',
            type: 'POST',
            data: {departmentId : departmentId},
            dataType: 'json',
            success: function (data) {
            	if(data.list[0].parentId==0){
            		$('.departmentEdit input[name="parentName"]').val('无');
            	}else{
            		var parentId = data.list[0].parentId;
            		$.ajax({
            			url: ctx + '/department/getAllOption',
                        type: 'POST',
                        data: {departmentId : parentId},
                        dataType: 'json',
                        success: function (data) {
                        	var fullName = data.list[0].fullName;
                        	$('.departmentEdit input[name="parentName"]').val(fullName);
                        },
                        error: function (response) {
                        	toastr.error("系统错误");
                        }
            		});
            	}
            },
            error: function (response) {
            	toastr.error("系统错误");
            }
            })
       
    	event.stopPropagation();
    })
};


</script>                
                
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/department.js"></script>
