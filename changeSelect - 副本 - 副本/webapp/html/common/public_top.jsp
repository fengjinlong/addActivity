<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<div class="navbar">	
	
    <div class="navbar-inner">
        <div class="navbar-container">
            <!-- Navbar Barnd -->
            <div class="navbar-header pull-left">
                <a href="#" class="navbar-brand">
                    <small>
                        <img src="${ctx_static }/dep/assets/img/logo.png" alt=""/>
                    </small>
                </a>
            </div>
            <!-- /Navbar Barnd -->

            <!-- Sidebar Collapse -->
            <div class="sidebar-collapse" id="sidebar-collapse">
                <i class="collapse-icon fa fa-bars"></i>
            </div>
            <!-- /Sidebar Collapse -->
            <!-- Account Area and Settings --->
            <div class="navbar-header pull-right">
                <div class="navbar-account">
                    <ul class="account-area">
                    <li class="message-li">
                        <div class="meaubox" style="width:50px;height:50px;text-align:center;">
							<a href="#" title="用户建议" data-toggle="modal" data-target=".mmm" class="btn-meau" style="color:#ffffff;line-height:50px">反馈</a>
						</div>    
                    </li>
                    <li class="message-li">
                            <a class="wave in dropdown-toggle" data-toggle="dropdown" title="Help" href="#">
                                <i class="icon fa fa-envelope"></i>
                                <span class="badge"></span>
                            </a>
                            <!--Messages Dropdown-->
                            <ul class="pull-right dropdown-menu dropdown-arrow dropdown-messages messages-menu">
                                <li>
                                    <a href="#" data-toggle="modal" data-target=".serviceView">
                                        <div class="message">
                                            <span class="message-subject">
                                               	没有通知
                                            </span>
                                            <span class="message-body">
                                            </span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <!--/Messages Dropdown-->
                        </li>
                        <li>
                            <a class="login-area dropdown-toggle" data-toggle="dropdown" style="width: 180px">
                                <div class="avatar" title="View your public profile">
                                	<c:if test="${ empty currentUser.avatar }">
                                    <img src="${ctx_static }/dep/assets/img/avatars/adam-jansen.jpg" class="img-circle" id="headImage">
                                	</c:if>
                                	<c:if test="${not empty currentUser.avatar }">
                                    <img src="${fdfs_host}/${currentUser.avatar}" class="img-circle" id="headImage">
                                	</c:if>
                                </div>
                                <section>
                                    <h2><span class="profile">
                                   	<c:if test="${ empty currentUser.dutyName }">
                                   		<span style="font-size:13px;line-height: 30px">${currentUser.realName }</span>
                                   	</c:if>
                                   	<c:if test="${not empty currentUser.dutyName }">
                                   		<span style="font-size:13px;line-height: 16px">${currentUser.realName }<br/>${currentUser.dutyName }</span>
                                   	</c:if>
                                    </span></h2>
                                </section>
                            </a>
                            <!--Login Area Dropdown-->
                            <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                <li class="username"><a>${currentUser.realName }</a></li>
                                <li class="email"><a>${currentUser.email }</a></li>
                                <!--Avatar Area-->
                                <li>
                                    <div class="avatar-area">
                                    <c:if test="${ empty currentUser.avatar }">
                                    <img src="${ctx_static }/dep/assets/img/avatars/adam-jansen.jpg" class="img-circle" id="bigHeadImage">
                                	</c:if>
                                	<c:if test="${not empty currentUser.avatar }">
                                    <img src="${fdfs_host}/${currentUser.avatar}" class="img-circle" id="bigHeadImage">
                                	</c:if>
                                        <span class="caption" data-toggle="modal" data-target="#avatar-modal" data-backdrop="static">修改头像</span>
                                    </div>
                                </li>
                                <!--Avatar Area-->
                                <!-- <li class="edit">
                                    <a href="profile.html" class="pull-left">个人资料</a>
                                    <a href="#" class="pull-right">设置</a>
                                </li> -->
                                <!--Theme Selector Area-->
                                <li class="theme-area">
                                    <ul class="colorpicker" id="skin-changer">
                                        <li><a class="colorpick-btn" href="#" style="background-color:#5DB2FF;"
                                               rel="${ctx_static }/dep/assets/css/skins/blue.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#2dc3e8;"
                                               rel="${ctx_static }/dep/assets/css/skins/azure.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#03B3B2;"
                                               rel="${ctx_static }/dep/assets/css/skins/teal.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#53a93f;"
                                               rel="${ctx_static }/dep/assets/css/skins/green.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#FF8F32;"
                                               rel="${ctx_static }/dep/assets/css/skins/orange.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#cc324b;"
                                               rel="${ctx_static }/dep/assets/css/skins/pink.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#AC193D;"
                                               rel="${ctx_static }/dep/assets/css/skins/darkred.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#8C0095;"
                                               rel="${ctx_static }/dep/assets/css/skins/purple.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#0072C6;"
                                               rel="${ctx_static }/dep/assets/css/skins/darkblue.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#585858;"
                                               rel="${ctx_static }/dep/assets/css/skins/gray.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#474544;"
                                               rel="${ctx_static }/dep/assets/css/skins/black.min.css"></a>
                                        </li>
                                        <li><a class="colorpick-btn" href="#" style="background-color:#001940;"
                                               rel="${ctx_static }/dep/assets/css/skins/deepblue.min.css"></a>
                                        </li>
                                    </ul>
                                </li>
                                <!--/Theme Selector Area-->
                                <li class="dropdown-footer">
	                                <a href="#" class="pull-left" data-toggle="modal"
                                        data-target=".changePassword" data-backdrop="static">修改密码</a>
	                                <a   href="${ctx }/login/liveCrm">退出 </a>
                                </li>
                            </ul>
                            <!--/Login Area Dropdown-->
                        </li>
                        <!-- /Account Area -->
                        <!--Note: notice that setting div must start right after account area list.
                        no space must be between these elements-->
                        <!-- Settings -->
                    </ul>
                   <!--  <div class="setting">
                        <a id="btn-setting" title="Setting" href="#">
                            <i class="icon glyphicon glyphicon-cog"></i>
                        </a>
                    </div> -->
                    <div class="setting-container">
                        <label>
                            <input type="checkbox" id="checkbox_fixednavbar">
                            <span class="text">头部导航固定</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedsidebar">
                            <span class="text">左侧导航固定</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedbreadcrumbs">
                            <span class="text">页面导航固定</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedheader">
                            <span class="text">头部标题固定</span>
                        </label>
                    </div>
                    <!-- Settings -->
                </div>
            </div>
            <!-- /Account Area and Settings -->
        </div>
    </div>
</div>
<!-- 修改头像  -->
<div class="modal fade" id="avatar-modal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form class="avatar-form" method="post" action="" enctype="multipart/form-data" id="avatarForm">
                <div class="modal-header bordered-blue">
                    <button class="close" data-dismiss="modal" type="button">×</button>
                    <span class="widget-caption">上传新头像</span>
                </div>
                <div class="modal-body">
                    <div class="avatar-body">
                        <div class="avatar-upload">
                            <input class="avatar-src" name="avatar_src" type="hidden">
                            <input class="avatar-data" name="avatar_data" type="hidden">
                            <label class="btn btn-blue" for="avatarInput">本地上传</label>
                            <input type="file" name="avatar_file" id="avatarInput"class="avatar-input"accept=".jpg,.jpeg,.gif,.png" title="请选择要修改的头像">
                            <div class="picture-format">仅支持JPG、GIF或PNG格式的图片文件，且文件大小不能超过2M。</div>
                       	</div>
                        <div class="row clearfix">
                            <div class="col-md-9">
                                <div class="avatar-wrapper"></div>
                            </div>
                            <div class="col-md-3">
                                <div class="avatar-preview preview-lg" style="width: 184px; height: 184px;"><img src="${ctx_static }/dep/assets/img/avatars/adam-jansen.jpg" style="display: block; width: 404.444px; min-width: 0px !important; min-height: 0px !important; max-width: none !important; max-height: none !important; height: 227.5px; margin-left: -111.222px; margin-top: -22.75px; transform: none;"></div>
                                <div class="avatar-preview preview-md" style="width: 100px; height: 100px;"><img src="${ctx_static }/dep/assets/img/avatars/adam-jansen.jpg" style="display: block; width: 217.778px; min-width: 0px !important; min-height: 0px !important; max-width: none !important; max-height: none !important; height: 122.5px; margin-left: -59.8889px; margin-top: -12.25px; transform: none;"></div>
                                <div class="avatar-preview preview-sm" style="width: 50px; height: 50px;"><img src="${ctx_static }/dep/assets/img/avatars/adam-jansen.jpg" style="display: block; width: 106.667px; min-width: 0px !important; min-height: 0px !important; max-width: none !important; max-height: none !important; height: 60px; margin-left: -29.3333px; margin-top: -6px; transform: none;"></div>
                            </div>
                        </div>
                        <div class="row avatar-btns">
                            <div class="col-md-9">
                            	<div class="btn-group">
                            		<button type="button" class="btn btn-blue" data-method="setDragMode" data-option="move" title="Move"><i class="fa fa-arrows"></i>移动</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn btn-blue" data-method="rotate" data-option="-45" type="button" title="Rotate -45 degrees"><i class="fa fa-undo"></i> 向左旋转</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn btn-blue" data-method="rotate" data-option="45" type="button" title="Rotate 45 degrees"><i class="fa fa-repeat"></i> 向右旋转</button>
                                </div>
                                
                                <div class="btn-group">
                                      <button type="button" class="btn btn-blue" data-method="zoom" data-option="0.1" title="Zoom In"><i class="fa fa-search-plus"></i>放大</button>
                                </div>
                                
                                <div class="btn-group">
                                      <button type="button" class="btn btn-blue" data-method="zoom" data-option="-0.1" title="Zoom Out"><i class="fa fa-search-minus"></i>缩小</button>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-primary btn-block avatar-save" type="submit" data-dismiss="modal"  id="saveHeadImage"><i class="fa fa-save"></i> 保存修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!--修改密码-->
<div class="modal fade changePassword" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">修改密码</span>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="changePassword">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">原始密码<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" name="oldPassword" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">新密码<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" name="newPassword" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">确认新密码<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" name="affirmPassword" class="form-control">
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                     <div class="col-sm-3  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<div class="modal fade serviceView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">详情</span>
            </div>
            <div class="modal-body">
                <div class="well well-lg">
                    <h4 class="block notice-title" id="notice-title"></h4>
                    <div class="notice-text">
                        <p id="notice-body"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--  -->
<div class="modal fade mmm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">用户建议</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="customerAdviceForm">
                	<div class="col-lg-12 col-md-12 col-sm-12">
                    	<label class="control-label" style="float:left">标题</label>
                    	<div class="col-lg-11 col-md-11 col-sm-11">
                            <input name="title" type="text" class="form-control comment_disabled"></input>
                        </div>
                    </div>
                    
                    <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:20px">
                    	<label class="control-label" style="float:left">类型</label>
                    	<div class="col-lg-11 col-md-11 col-sm-11">
                            <select name="type" class="form-control comment_disabled">
                                <option value="0">页面建议</option>
                                <option value="1">系统建议</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:20px">
                    	<label class="control-label" style="float:left">内容</label>
                    	<div class="col-lg-11 col-md-11 col-sm-11">
                    		<textarea name="content" class="form-control" rows="5"></textarea>
                    	</div>
                    </div>
                    <div class="form-group modal-footer">
                            <div class="col-sm-2 col-sm-offset-4">
                                <button type="submit" class="btn btn-primary btn-lg form-control">确认</button>
                            </div>
                            <div class="col-sm-2 ">
                                <button type="button" class="btn btn-danger btn-lg form-control" data-dismiss="modal">
                                    			取消
                                </button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="${ctx_static }/dep/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx_static }/home/top/js/public_top.js?v-<%=Math.random() %>"></script> 
<script type="text/javascript">
$(function(){
	//表单验证
	$('#customerAdviceForm').bootstrapValidator({
	    fields: {
	        title : {
	            validators: {
	                notEmpty: {
	                    message: '标题不能为空'
	                }
	            }
	        },
	        content : {
	            validators: {
	                notEmpty: {
	                    message: '内容不能为空'
	                }
	            }
	        }
	    },
	    submitHandler: function (validator, form, submitButton) {
	    	
	        var options = form.serialize();
	        
		  $.ajax({
		      type: "POST",
		      url: ctx + '/menu/addCustomerAdvice',
		      data: options,
		      dataType: 'json',
		      success: function (data) {
		          if (data.status == "success") {
		        	  debugger;
		              $(".mmm").modal("hide");
		              $(".modal-backdrop").remove();//清除遮罩层
		              toastr.success("新增成功");
		          } else {
		        	  $(".mmm").find("button[type='submit']").prop("disabled",false);
		              toastr.error(data.msg);
		          }
		      },
		      error: function (msg) {
		          toastr.error("系统错误");
		      } 
		  }); 
	        
	    }
	});

});
</script>