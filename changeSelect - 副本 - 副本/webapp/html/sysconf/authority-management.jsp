<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
  
<%@ include file="/html/common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/bodyPermission.css">
<link rel="stylesheet" href="${ctx_static }/dep/assets/css/metro.css">
<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/menu.css">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main clearfix">
                    <div class="tabbable">
                        <ul class="nav nav-tabs tabs-flat">
                            <li class="active">
                                <a data-toggle="tab" href="#buttonnn">
                                    按钮
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#resource">
                                    资源管理
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#role">
                                    角色
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content tabs-flat clearfix">
                            <div id="buttonnn" class="tab-pane in active">
                              	<div class="row row_padding form-horizontal">
	                              	<div class="col-md-4 col-sm-4 col-xs-12">
										<div class="form-group col-md-9 col-sm-9 no-margin-right">
											<input id="buttonVal" type="text" class="form-control" placeholder="名称" onkeydown="authority()">
										</div>
										<div class="form-group col-sm-3 search-btn">
											<a class="btn increase  search-btn" onclick="authority()">
												<i class="fa fa-search"></i> 搜索
											</a>
										</div>
									</div>
                                    <div class="form-group col-sm-1  pull-right margin-right-5">
                                        <button class="btn btn-info pull-right form-control"
                                              data-toggle="modal"
                                              data-target=".addJurisdiction" data-backdrop="static">新增<i
                                              class="fa fa-plus-square-o right"></i></button>
                                    </div>
	                            </div>
	
	                              <div id="authority_wrapper" class="dataTables_wrapper form-inline no-footer">
	                                  <div class="table-scrollable">
	                                      <table id="authority" class="table table-striped table-hover table-bordered dataTable no-footer">
	                                          <thead>
	                                          <tr role="row">
	                                              <th>名称</th>
	                                              <th>状态</th>
	                                              <th>操作</th>
	                                          </tr>
	                                          </thead>
	                                          <tbody class="text-center">
										</tbody>
	                                      </table>
	                                  </div>
	                              </div>
	                        </div>
                            <!-- 资源管理 -->
                            <div id="resource" class="tab-pane">
                               <div class="col-sm-3">
                                   <div class="drop-down menu">
                                       <div class="widget-header menu-title bordered-blue bordered-bottom-2">
                                           <span class="widget-caption" style="line-height:40px !important">资源管理</span>
                                           <shiro:hasPermission name="menu:add">
                                               <a href="#" class="btn increase addMenu" title="添加" style="width:60px;margin-top:6px;">
						 						<i class="fa fa-plus"></i>添加
											</a>
                                           </shiro:hasPermission>
                                       </div>
                                       <ul class="nav sidebar-menu">
					                	<c:forEach items="${list}" var="record">
					                	<li>
					                        <a href="#" class="menu-dropdown">
					                            <i class="fa ${record.img}"></i>
					                            <span class="menu-text pn-title">${record.fullName}</span>
					                            <input class="menu-id" type="hidden" value="${record.menuId}"/>
					                            <input class="navigate-url" type="hidden" value="${record.navigateUrl}"/>
					                            <input class="enable" type="hidden" value="${record.enable}"/>
					                            <c:if test="${!empty record.childs}">
					                            	<i class="fa fa-angle-right pull-right"></i>
					                            </c:if>	
					                        </a>
					                        
					                        <c:set var="childs" value="${record.childs}" scope="request" />
					                        <c:set var="parentName" value="${record.fullName}" scope="request" />
											<c:import url="r_menu.jsp" />
					                    </li>
					                	</c:forEach>
					                </ul>
                                   </div>
                               </div>
                               <!--资源信息-->
						        <div class="col-xs-9 col-sm-9 menu-info">
						            <div class="widget">
						                <div class="widget-header">
						                    <span class="widget-caption" style="line-height:40px !important">资源信息</span>
						                    <div class="widget-buttons">
						                    	<shiro:hasPermission name="menu:edit">
						                        <a href="#">
						                            <i class="glyphicon glyphicon-pencil editMenuBtn"></i>
						                        </a>
						                        </shiro:hasPermission>
						                        <a href="#" data-toggle="dispose">
						                            <i class="glyphicon glyphicon-remove"></i>
						                        </a>
						                    </div><!--Widget Buttons-->
						                </div><!--Widget Header-->
						                <div class="widget-body clearfix">
						                    <form class="form-horizontal">
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">功能名称：</label>
						                          <div class="col-sm-8" style="margin-top:7px">
						                              <label class="menu-name"></label>
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right" style="margin-top:13px">上级菜单：</label>
						                          <div class="col-sm-8" style="margin-top:21px">
						                              <label class="superior-menu"></label>
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right" style="margin-top:13px">图标：</label>
						                           <div class="col-sm-8" style="margin-top:19px">
						                              <label class="menu-icon"><i class=""></i></label>
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right" style="margin-top:13px">页面地址：</label>
						                          <div class="col-sm-8" style="margin-top:20px">
						                              <label class="menu-location"></label>
						                          </div>
						                      </div>
						                  </form>
						                </div>
										<!--Widget Body-->
						            </div>
						        </div>
							  <!--添加信息-->
						      <div class="col-xs-9 col-sm-9 add-menu hidden">
						          <div class="widget">
						              <div class="widget-header">
						                  <span class="widget-caption">添加信息</span>
						                  <div class="widget-buttons">
						                      <a href="#" data-toggle="dispose">
						                          <i class="glyphicon glyphicon-remove" style="margin-top:10px"></i>
						                      </a>
						                  </div><!--Widget Buttons-->
						              </div><!--Widget Header-->
						              <div class="widget-body">
						                  <form id="addForm" class="form-horizontal" onsubmit="return addNewRecord();">
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">功能名称：</label>
						                          <div class="col-sm-8">
						                              <input name="fullName" class="form-control menu-name" type="input">
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">上级菜单：</label>
						                          <div class="col-sm-8">
						                              <input class="form-control superior-menu" type="input" value="无" readonly>
						                              <input name="parentId" type="hidden" value=""/>
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">图标：</label>
						                          <div class="col-sm-3">
						                              <i class="fa fa-undo" id="menu-icon">fa-undo</i>
						                          </div>
						                          <a class="btn btn-azure control-label" data-toggle="modal" data-target="#selectIcon">选择图标</a>
						                          <input name="img" type="hidden" value=" fa-undo">
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">页面地址：</label>
						                          <div class="col-sm-8">
						                              <input name="navigateUrl" class="form-control menu-location" type="input">
						                          </div>
						                      </div>
						                      <div class="form-group">
						                      	<div class="col-sm-2 col-sm-offset-4">
						                      		<input type="submit" class="btn btn-primary col-sm-6 confirm-btn" value="确定"/>
						                      	</div>
						                      	<div class="col-sm-2">
						                          	<button type="button" class="btn btn-danger col-sm-6 cancel-btn" >取消</button>
						                          </div>
						                      </div>
						                  </form>
						              </div>
						
						              <!--Widget Body-->
						          </div>
						      </div>
								
						      <!--编辑菜单-->
						      <div class="col-xs-9 col-sm-9 edit-menu hidden">
						          <div class="widget">
						              <div class="widget-header">
						                  <span class="widget-caption">编辑菜单</span>
						                  <div class="widget-buttons">
						                      <a href="#" data-toggle="dispose" class="position-relative" style="top:11px">
						                          <i class="glyphicon glyphicon-remove"></i>
						                      </a>
						                  </div><!--Widget Buttons-->
						              </div><!--Widget Header-->
						              <div class="widget-body">
						                  <form id="updateForm" class="form-horizontal" onsubmit="return updateRecord();">
						                  
						                  	<input name="menuId" type="hidden" value=""/>
						                  
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">功能名称：</label>
						                          <div class="col-sm-8">
						                              <input name="fullName" class="form-control menu-name" type="input">
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">上级菜单：</label>
						                          <div class="col-sm-8">
						                              <input class="form-control superior-menu" type="input" value="无" readonly>
						                          </div>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">图标：</label>
						                          <div class="col-sm-3">
						                              <i class="fa fa-undo" id="menu-icon1">fa-undo</i>
						                          </div>
						                          <input name="img" type="hidden" value=" fa-undo">
						                          <a class="btn btn-azure control-label" data-toggle="modal" data-target="#selectIcon">选择图标</a>
						                      </div>
						                      <div class="form-group col-sm-12">
						                          <label class="control-label col-sm-2 no-padding-right">页面地址：</label>
						                          <div class="col-sm-8">
						                              <input name="navigateUrl" class="form-control menu-location" type="input">
						                          </div>
						                      </div>
						                      <div class="form-group">
						                          <div class="col-sm-2 col-sm-offset-4">
						                          	<input type="submit" class="btn btn-primary col-sm-6 confirm-btn" value="确定"/>
						                          </div>
						                          <div class="col-sm-2">
						                          	<button type="button" class="btn btn-danger col-sm-6 cancel-btn">取消</button>
						                          </div>
						                      </div>
						                  </form>
						              </div>
						
						              <!--Widget Body-->
						          </div>
						      </div>
								
						      <!--移动位置-->
						      <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
						           aria-labelledby="myModalLabel" aria-hidden="true">
						          <div class="modal-dialog">
						              <div class="modal-content">
						                  <div class="modal-header">
						                      <button type="button" class="close" data-dismiss="modal"><span
						                              aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						                      </button>
						                      <span class="widget-caption">移动位置</span>
						                  </div>
						                  <div class="modal-body clearfix">
						                      <form action="" class="form-horizontal">
						                      	<input name="menuId" value=""/>
						                          <div class="form-group col-sm-12">
						                              <label class="col-sm-3 control-label no-padding-right">移动到：</label>
						                              <div class="col-sm-6 no-padding-right">
						                                  <select name="refMenuId" class="form-control menu-option">
						                                  
						                                  </select>
						                              </div>
						                              <div class="col-sm-3">
						                                  <select name="order" class="form-control">
						                                      <option value="1">前</option>
						                                      <option value="2">后</option>
						                                  </select>
						                              </div>
						
						                          </div>
						                      </form>
						                  </div>
						                  <div class="modal-footer">
						                  	<input type="button" class="btn btn-primary" value="确定"/>
						                      <button type="button" class="btn btn-danger" data-dismiss="modal">取消
						                      </button>
						                  </div>
						              </div>
						          </div>
						      </div>
						      <!-- 图标 -->
						      <div class="modal fade" id="selectIcon" tabindex="-1" role="dialog"
					             aria-labelledby="myModalLabel" aria-hidden="true">
					            <div class="modal-dialog modal-lg">
					                <div class="modal-content">
					                    <div class="modal-header">
					                        <button type="button" class="close" data-dismiss="modal"><span
					                                aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					                        </button>
					                        <span class="widget-caption">选择图标</span>
					                    </div>
					                    <div class="modal-body clearfix">
					                        <div id="fontawesome-container">
					                        	<section id="web-application">
					                                  <h4 class="border-bottom-1 border-blue">Web应用图标</h4>
					                                  	<div class="row fontawesome-icon-list">
							                               <div class="col-sm-12">
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-adjust"></i> fa-adjust</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-anchor"></i> fa-anchor</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-archive"></i> fa-archive</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows"></i> fa-arrows</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-h"></i> fa-arrows-h</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-v"></i> fa-arrows-v</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-asterisk"></i> fa-asterisk</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-ban"></i> fa-ban</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bar-chart-o"></i> fa-bar-chart-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-barcode"></i> fa-barcode</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-h"></i> fa-bars</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-beer"></i> fa-beer</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bell"></i> fa-bell</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bell-o"></i> fa-bell-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bolt"></i> fa-bolt</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-book"></i> fa-book</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bookmark"></i> fa-bookmark</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bookmark-o"></i> fa-bookmark-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-briefcase"></i> fa-briefcase</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bug"></i> fa-bug</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-building-o"></i> fa-building-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bullhorn"></i> fa-bullhorn</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bullseye"></i> fa-bullseye</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-calendar"></i> fa-calendar</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-calendar-o"></i> fa-calendar-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-camera"></i> fa-camera</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-camera-retro"></i> fa-camera-retro</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-down"></i> fa-caret-square-o-down</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-left"></i> fa-caret-square-o-left</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-right"></i> fa-caret-square-o-right</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-up"></i> fa-caret-square-o-up</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-certificate"></i> fa-certificate</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check"></i> fa-check</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check-circle"></i> fa-check-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check-circle-o"></i> fa-check-circle-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check-square"></i> fa-check-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check-square-o"></i> fa-check-square-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-circle"></i> fa-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-circle-o"></i> fa-circle-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-clock-o"></i> fa-clock-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cloud"></i> fa-cloud</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cloud-download"></i> fa-cloud-download</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cloud-upload"></i> fa-cloud-upload</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-code"></i> fa-code</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-code-fork"></i> fa-code-fork</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-coffee"></i> fa-coffee</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cog"></i> fa-cog</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cogs"></i> fa-cogs</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-comment"></i> fa-comment</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-comment-o"></i> fa-comment-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-comments"></i> fa-comments</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-comments-o"></i> fa-comments-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-compass"></i> fa-compass</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-credit-card"></i> fa-credit-card</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-crop"></i> fa-crop</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-crosshairs"></i> fa-crosshairs</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cutlery"></i> fa-cutlery</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dashboard"></i> fa-dashboard </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-desktop"></i> fa-desktop</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dot-circle-o"></i> fa-dot-circle-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-download"></i> fa-download</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-edit"></i> fa-edit </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-ellipsis-h"></i> fa-ellipsis-h</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-ellipsis-v"></i> fa-ellipsis-v</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-envelope"></i> fa-envelope</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-envelope-o"></i> fa-envelope-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-eraser"></i> fa-eraser</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-exchange"></i> fa-exchange</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-exclamation"></i> fa-exclamation</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-exclamation-circle"></i> fa-exclamation-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-exclamation-triangle"></i> fa-exclamation-triangle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-external-link"></i> fa-external-link</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-external-link-square"></i> fa-external-link-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-eye"></i> fa-eye</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-eye-slash"></i> fa-eye-slash</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-female"></i> fa-female</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-fighter-jet"></i> fa-fighter-jet</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-film"></i> fa-film</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-filter"></i> fa-filter</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-fire"></i> fa-fire</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-fire-extinguisher"></i> fa-fire-extinguisher</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-flag"></i> fa-flag</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-flag-checkered"></i> fa-flag-checkered</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-flag-o"></i> fa-flag-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-flash"></i> fa-flash </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-flask"></i> fa-flask</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-folder"></i> fa-folder</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-folder-o"></i> fa-folder-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-folder-open"></i> fa-folder-open</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-folder-open-o"></i> fa-folder-open-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-frown-o"></i> fa-frown-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gamepad"></i> fa-gamepad</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gavel"></i> fa-gavel</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gear"></i> fa-gear </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gears"></i> fa-gears </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gift"></i> fa-gift</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-glass"></i> fa-glass</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-globe"></i> fa-globe</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-group"></i> fa-group </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-hdd-o"></i> fa-hdd-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-headphones"></i> fa-headphones</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-heart"></i> fa-heart</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-heart-o"></i> fa-heart-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-home"></i> fa-home</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-inbox"></i> fa-inbox</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-info"></i> fa-info</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-info-circle"></i> fa-info-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-key"></i> fa-key</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-keyboard-o"></i> fa-keyboard-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-laptop"></i> fa-laptop</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-leaf"></i> fa-leaf</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-legal"></i> fa-legal </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-lemon-o"></i> fa-lemon-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-level-down"></i> fa-level-down</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-level-up"></i> fa-level-up</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-lightbulb-o"></i> fa-lightbulb-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-location-arrow"></i> fa-location-arrow</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-lock"></i> fa-lock</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-magic"></i> fa-magic</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-magnet"></i> fa-magnet</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-mail-forward"></i> fa-mail-forward </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-mail-reply"></i> fa-mail-reply </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-mail-reply-all"></i> fa-mail-reply-all</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-male"></i> fa-male</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-map-marker"></i> fa-map-marker</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-meh-o"></i> fa-meh-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-microphone"></i> fa-microphone</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-microphone-slash"></i> fa-microphone-slash</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-minus"></i> fa-minus</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-minus-circle"></i> fa-minus-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-minus-square"></i> fa-minus-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-minus-square-o"></i> fa-minus-square-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-mobile"></i> fa-mobile</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-mobile-phone"></i> fa-mobile-phone </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-money"></i> fa-money</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-moon-o"></i> fa-moon-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-music"></i> fa-music</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pencil"></i> fa-pencil</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pencil-square"></i> fa-pencil-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pencil-square-o"></i> fa-pencil-square-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-phone"></i> fa-phone</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-phone-square"></i> fa-phone-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-picture-o"></i> fa-picture-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plane"></i> fa-plane</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plus"></i> fa-plus</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plus-circle"></i> fa-plus-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plus-square"></i> fa-plus-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plus-square-o"></i> fa-plus-square-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-power-off"></i> fa-power-off</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-print"></i> fa-print</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-puzzle-piece"></i> fa-puzzle-piece</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-qrcode"></i> fa-qrcode</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-question"></i> fa-question</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-question-circle"></i> fa-question-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-quote-left"></i> fa-quote-left</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-quote-right"></i> fa-quote-right</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-random"></i> fa-random</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-refresh"></i> fa-refresh</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-reply"></i> fa-reply</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-reply-all"></i> fa-reply-all</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-retweet"></i> fa-retweet</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-road"></i> fa-road</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rocket"></i> fa-rocket</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rss"></i> fa-rss</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rss-square"></i> fa-rss-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-search"></i> fa-search</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-search-minus"></i> fa-search-minus</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-search-plus"></i> fa-search-plus</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-share"></i> fa-share</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-share-square"></i> fa-share-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-share-square-o"></i> fa-share-square-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-shield"></i> fa-shield</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-shopping-cart"></i> fa-shopping-cart</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sign-in"></i> fa-sign-in</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sign-out"></i> fa-sign-out</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-signal"></i> fa-signal</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sitemap"></i> fa-sitemap</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-smile-o"></i> fa-smile-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort"></i> fa-sort</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-alpha-asc"></i> fa-sort-alpha-asc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-alpha-desc"></i> fa-sort-alpha-desc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-amount-asc"></i> fa-sort-amount-asc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-amount-desc"></i> fa-sort-amount-desc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-asc"></i> fa-sort-asc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-desc"></i> fa-sort-desc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-down"></i> fa-sort-down </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-numeric-asc"></i> fa-sort-numeric-asc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-numeric-desc"></i> fa-sort-numeric-desc</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sort-up"></i> fa-sort-up </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-spinner"></i> fa-spinner</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-square"></i> fa-square</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-square-o"></i> fa-square-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-star"></i> fa-star</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-star-half"></i> fa-star-half</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-star-half-empty"></i> fa-star-half-empty </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-star-half-full"></i> fa-star-half-full </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-star-half-o"></i> fa-star-half-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-star-o"></i> fa-star-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-subscript"></i> fa-subscript</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-suitcase"></i> fa-suitcase</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-sun-o"></i> fa-sun-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-superscript"></i> fa-superscript</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tablet"></i> fa-tablet</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tachometer"></i> fa-tachometer</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tag"></i> fa-tag</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tags"></i> fa-tags</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tasks"></i> fa-tasks</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-terminal"></i> fa-terminal</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-thumb-tack"></i> fa-thumb-tack</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-thumbs-down"></i> fa-thumbs-down</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-thumbs-o-down"></i> fa-thumbs-o-down</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-thumbs-o-up"></i> fa-thumbs-o-up</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-thumbs-up"></i> fa-thumbs-up</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-ticket"></i> fa-ticket</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-times"></i> fa-times</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-times-circle"></i> fa-times-circle</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-times-circle-o"></i> fa-times-circle-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tint"></i> fa-tint</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-down"></i> fa-toggle-down </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-left"></i> fa-toggle-left </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-right"></i> fa-toggle-right </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-up"></i> fa-toggle-up </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-trash-o"></i> fa-trash-o</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-trophy"></i> fa-trophy</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-truck"></i> fa-truck</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-umbrella"></i> fa-umbrella</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-unlock"></i> fa-unlock</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-unlock-alt"></i> fa-unlock-alt</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-unsorted"></i> fa-unsorted </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-upload"></i> fa-upload</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-user"></i> fa-user</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-users"></i> fa-users</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-video-camera"></i> fa-video-camera</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-volume-down"></i> fa-volume-down</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-volume-off"></i> fa-volume-off</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-volume-up"></i> fa-volume-up</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-warning"></i> fa-warning </div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-wheelchair"></i> fa-wheelchair</div>
							                                    <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-wrench"></i> fa-wrench</div>
					                                	    </div>
					                                </div>
													<hr class="wide">
					                            </section>
					                            <section>
					                           	<h4>表单图表</h4>
					                            <div class="row fontawesome-icon-list">
						                            <div class="col-sm-12">
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check-square"></i> fa-check-square</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-check-square-o"></i> fa-check-square-o</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-circle"></i> fa-circle</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-circle-o"></i> fa-circle-o</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dot-circle-o"></i> fa-dot-circle-o</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-minus-square"></i> fa-minus-square</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-minus-square-o"></i> fa-minus-square-o</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plus-square"></i> fa-plus-square</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-plus-square-o"></i> fa-plus-square-o</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-square"></i> fa-square</div>
						                                <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-square-o"></i> fa-square-o</div>
						                            </div>
					                            </div>
					                            <hr class="wide">
					                            </section>
					                            <section>
					                                <h4>文本编辑图标</h4>
					                                <div class="row fontawesome-icon-list">
					                                	<div class="col-sm-12">
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-align-center"></i> fa-align-center</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-align-justify"></i> fa-align-justify</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-align-left"></i> fa-align-left</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-align-right"></i> fa-align-right</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bold"></i> fa-bold</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chain"></i> fa-chain </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chain-broken"></i> fa-chain-broken</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-clipboard"></i> fa-clipboard</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-columns"></i> fa-columns</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-copy"></i> fa-copy </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cut"></i> fa-cut </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dedent"></i> fa-dedent </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-eraser"></i> fa-eraser</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-file"></i> fa-file</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-file-o"></i> fa-file-o</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-file-text"></i> fa-file-text</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-file-text-o"></i> fa-file-text-o</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-files-o"></i> fa-files-o</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-floppy-o"></i> fa-floppy-o</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-font"></i> fa-font</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-indent"></i> fa-indent</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-italic"></i> fa-italic</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-link"></i> fa-link</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-list"></i> fa-list</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-list-alt"></i> fa-list-alt</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-list-ol"></i> fa-list-ol</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-list-ul"></i> fa-list-ul</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-outdent"></i> fa-outdent</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-paperclip"></i> fa-paperclip</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-paste"></i> fa-paste </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-repeat"></i> fa-repeat</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rotate-left"></i> fa-rotate-left </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rotate-right"></i> fa-rotate-right </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-save"></i> fa-save </div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-scissors"></i> fa-scissors</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-strikethrough"></i> fa-strikethrough</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-table"></i> fa-table</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-text-height"></i> fa-text-height</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-text-width"></i> fa-text-width</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-th"></i> fa-th</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-th-large"></i> fa-th-large</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-th-list"></i> fa-th-list</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-underline"></i> fa-underline</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-undo"></i> fa-undo</div>
					                                        <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-unlink"></i> fa-unlink </div>
					                                     </div>
					                                </div>
					                                <hr class="wide">
					                            </section>
					                            <section>
					                                <h4>货币图标</h4>
					                                <div class="row fontawesome-icon-list">
					                                	<div class="col-sm-12">
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bitcoin"></i> fa-bitcoin </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-btc"></i> fa-btc</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-cny"></i> fa-cny </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dollar"></i> fa-dollar </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-eur"></i> fa-eur</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-euro"></i> fa-euro </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gbp"></i> fa-gbp</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-inr"></i> fa-inr</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-jpy"></i> fa-jpy</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-krw"></i> fa-krw</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-money"></i> fa-money</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rmb"></i> fa-rmb </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rouble"></i> fa-rouble </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rub"></i> fa-rub</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-ruble"></i> fa-ruble </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-rupee"></i> fa-rupee </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-try"></i> fa-try</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-turkish-lira"></i> fa-turkish-lira </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-usd"></i> fa-usd</div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-won"></i> fa-won </div>
					                                      <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-yen"></i> fa-yen </div>
					                                    </div>
					                                </div>
					                                <hr class="wide">
					                            </section>
					                            <section>
					                                <h4>指示方向图标</h4>
					                                <div class="row fontawesome-icon-list">
					                                	<div class="col-sm-12">
					           							   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-double-down"></i> fa-angle-double-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-double-left"></i> fa-angle-double-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-double-right"></i> fa-angle-double-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-double-up"></i> fa-angle-double-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-down"></i> fa-angle-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-left"></i> fa-angle-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-right"></i> fa-angle-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-angle-up"></i> fa-angle-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-down"></i> fa-arrow-circle-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-left"></i> fa-arrow-circle-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-o-down"></i> fa-arrow-circle-o-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-o-left"></i> fa-arrow-circle-o-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-o-right"></i> fa-arrow-circle-o-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-o-up"></i> fa-arrow-circle-o-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-right"></i> fa-arrow-circle-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-circle-up"></i> fa-arrow-circle-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-down"></i> fa-arrow-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-left"></i> fa-arrow-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-right"></i> fa-arrow-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrow-up"></i> fa-arrow-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows"></i> fa-arrows</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-alt"></i> fa-arrows-alt</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-h"></i> fa-arrows-h</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-v"></i> fa-arrows-v</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-down"></i> fa-caret-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-left"></i> fa-caret-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-right"></i> fa-caret-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-down"></i> fa-caret-square-o-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-left"></i> fa-caret-square-o-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-right"></i> fa-caret-square-o-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-square-o-up"></i> fa-caret-square-o-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-caret-up"></i> fa-caret-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-circle-down"></i> fa-chevron-circle-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-circle-left"></i> fa-chevron-circle-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-circle-right"></i> fa-chevron-circle-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-circle-up"></i> fa-chevron-circle-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-down"></i> fa-chevron-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-left"></i> fa-chevron-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-right"></i> fa-chevron-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-chevron-up"></i> fa-chevron-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-hand-o-down"></i> fa-hand-o-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-hand-o-left"></i> fa-hand-o-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-hand-o-right"></i> fa-hand-o-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-hand-o-up"></i> fa-hand-o-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-long-arrow-down"></i> fa-long-arrow-down</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-long-arrow-left"></i> fa-long-arrow-left</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-long-arrow-right"></i> fa-long-arrow-right</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-long-arrow-up"></i> fa-long-arrow-up</div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-down"></i> fa-toggle-down </div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-left"></i> fa-toggle-left </div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-right"></i> fa-toggle-right </div>
					                                       <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-toggle-up"></i> fa-toggle-up </div>
					                                	</div>
					                                </div>
					                                <hr class="wide">
					                            </section>
					                            <section>
					                                <h4>视频播放图标</h4>
					                               <div class="row fontawesome-icon-list">
					                               		<div class="col-sm-12">
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-arrows-alt"></i> fa-arrows-alt</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-backward"></i> fa-backward</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-compress"></i> fa-compress</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-eject"></i> fa-eject</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-expand"></i> fa-expand</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-fast-backward"></i> fa-fast-backward</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-fast-forward"></i> fa-fast-forward</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-forward"></i> fa-forward</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pause"></i> fa-pause</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-play"></i> fa-play</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-play-circle"></i> fa-play-circle</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-play-circle-o"></i> fa-play-circle-o</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-step-backward"></i> fa-step-backward</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-step-forward"></i> fa-step-forward</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-stop"></i> fa-stop</div>
						                                   <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-youtube-play"></i> fa-youtube-play</div>
					                                  	</div>
					                                </div>
					                                <hr class="wide">
					                            </section>
					                            <section>
					                                 <h4>品牌图表标</h4>
					                                 <div class="row fontawesome-icon-list">
						                                 <div class="col-sm-12">
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-adn"></i> fa-adn</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-android"></i> fa-android</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-apple"></i> fa-apple</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bitbucket"></i> fa-bitbucket</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bitbucket-square"></i> fa-bitbucket-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-bitcoin"></i> fa-bitcoin </div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-btc"></i> fa-btc</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-css3"></i> fa-css3</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dribbble"></i> fa-dribbble</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-dropbox"></i> fa-dropbox</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-facebook"></i> fa-facebook</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-facebook-square"></i> fa-facebook-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-flickr"></i> fa-flickr</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-foursquare"></i> fa-foursquare</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-github"></i> fa-github</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-github-alt"></i> fa-github-alt</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-github-square"></i> fa-github-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-gittip"></i> fa-gittip</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-google-plus"></i> fa-google-plus</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-google-plus-square"></i> fa-google-plus-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-html5"></i> fa-html5</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-instagram"></i> fa-instagram</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-linkedin"></i> fa-linkedin</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-linkedin-square"></i> fa-linkedin-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-linux"></i> fa-linux</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-maxcdn"></i> fa-maxcdn</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pagelines"></i> fa-pagelines</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pinterest"></i> fa-pinterest</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-pinterest-square"></i> fa-pinterest-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-renren"></i> fa-renren</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-skype"></i> fa-skype</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-stack-exchange"></i> fa-stack-exchange</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-stack-overflow"></i> fa-stack-overflow</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-trello"></i> fa-trello</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tumblr"></i> fa-tumblr</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-tumblr-square"></i> fa-tumblr-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-twitter"></i> fa-twitter</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-twitter-square"></i> fa-twitter-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-vimeo-square"></i> fa-vimeo-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-vk"></i> fa-vk</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-weibo"></i> fa-weibo</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-windows"></i> fa-windows</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-xing"></i> fa-xing</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-xing-square"></i> fa-xing-square</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-youtube"></i> fa-youtube</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-youtube-play"></i> fa-youtube-play</div>
						                                     <div class="fa-hover col-md-3 col-sm-4"><i class="fa fa-youtube-square"></i> fa-youtube-square</div>
						                                 </div>
					                                 </div>
					                                 <hr class="wide">
					                             </section>
					                        </div>
					                    </div>
					                    <div class="modal-footer">
					                    	<button type="button" class="btn btn-primary">确定</button>
					                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消
					                        </button>
					                    </div>
					                </div>
					            </div>
					        </div>
                         </div>
                         <!-- 角色列表 -->
		                   <div id="role" class="tab-pane">
		                         <div class="row page-wrapper" style='padding:0px'>
									   <div class="col-sm-12 role-listing no-padding-right">
									       <div class="widget">
									            <div class="widget-header role-title bordered-blue bordered-bottom-2">
									                <span class="widget-caption">角色列表</span>
									                <div class="addRole">
									                   <shiro:hasPermission name="roleMenu:add">
									                    <button type="button" class="btn btn-lightBlue " data-toggle="modal"
									                            data-backdrop="static" data-target="#addRole">
									                            <i class="fa fa-plus"></i> 新增角色
									                    </button>
									                    </shiro:hasPermission>
									                </div>
									            </div>
									            <div class="widget-body role-list">
									                <ul id="permissionTree2" class="ztree"></ul>
									            </div>
									       </div>
									    </div>
									</div>
								<!-- 新增角色 -->
								<div class="modal fade" id="addRole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								    <div class="modal-dialog modal-md">
								        <div class="modal-content clearfix">
								            <div class="modal-header bordered-blue bordered-bottom-2">
								                <button type="button" class="close" data-dismiss="modal"><span
								                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
								                </button>
								                <span class="widget-caption">新增角色</span>
								            </div>
								            <div class="modal-body clearfix" style="height:42%">
								                <form action="" class="form-horizontal clearfix" id="roleAddForm" >
								                    <div class="form-group col-sm-12">
								                        <label class="col-sm-2 control-label no-padding-right">岗位</label>
								                        <div class="col-sm-9">
								                        	<input type="hidden" name="dutyId"/>
								                            <input type="text" class="form-control station" readonly>
								                        </div>
								                    </div>
								                    <div class="form-group col-sm-12">
								                        <label class="col-sm-2 control-label no-padding-right">角色</label>
								                        <div class="col-sm-9">
								                            <input name="fullName" class="form-control" type="text">
								                        </div>
								                    </div>
								                    <div class="form-group col-sm-12">
								                        <label class="col-sm-2 control-label no-padding-right">编码</label>
								                        <div class="col-sm-9">
								                            <input name="code" class="form-control" type="text">
								                        </div>
								                    </div>
								                    <hr class="wide ">
								                    <div class="col-sm-12 custom">
								                        <span class="custom-title">自定义设置</span>
								                        <hr class="wide margin-bottom-20">
								                        <div class="custom-content col-sm-12">
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">项目</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select class="form-control project selectpicker" multiple
								                                            title="01人力资源管理师">
								                                        <option value="0">01人力资源管理师</option>
								                                        <option value="1">02公共营养师</option>
								                                        <option value="2">03学历</option>
								                                        <option value="3">04采购师</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">品牌</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select  class="form-control brand selectpicker" multiple title="智联">
								                                        <option value="0">智联</option>
								                                        <option value="1">联想</option>
								                                        <option value="2">中和</option>
								                                        <option value="3">远大</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">部门</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select  class="form-control department selectpicker" multiple
								                                            title="总裁办">
								                                        <option value="0">总裁办</option>
								                                        <option value="1">财务中心</option>
								                                        <option value="2">销售中心</option>
								                                        <option value="3">综合管理中心</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">学员状态</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select class="form-control studentStatus selectpicker"
								                                            multiple title="待沟通">
								                                        <option value="0">待沟通</option>
								                                        <option value="1">已沟通</option>
								                                        <option value="2">报名</option>
								                                        <option value="3">预约</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">梯队</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select  class="form-control echelon selectpicker" multiple title="1">
								                                        <option value="0">1</option>
								                                        <option value="1">2</option>
								                                        <option value="2">3</option>
								                                        <option value="3">4</option>
								                                        <option value="3">5</option>
								                                        <option value="3">6</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">信息归属方</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select  class="selectpicker form-control affiliation" multiple
								                                            title="01北京">
								                                        <option value="0">01北京</option>
								                                        <option value="1">02上海</option>
								                                        <option value="2">03天津</option>
								                                        <option value="3">04南京</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <i class="fa fa-plus-circle blue control-label add-custom"></i>
								                        </div>
								                    </div>
								                    <div class="form-group modal-footer col-sm-12">
								                       
								                        <div class="col-sm-2  col-sm-offset-4">
								                            <button type="submit" class="btn btn-primary form-control">确定</button>
								                        </div>
								                         <div class="col-sm-2">
								                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
								                            </button>
								                        </div>
								                    </div>
								                </form>
								            </div>
								        </div>
								    </div>
								</div>
								<!-- 编辑角色 -->
								<div class="modal quan-edit fade" tabindex="-1" role="dialog" id="updateRole"
								     aria-labelledby="myModalLabel" aria-hidden="true">
								    <div class="modal-dialog modal-lg">
								        <div class="modal-content clearfix">
								            <div class="modal-header bordered-blue bordered-bottom-2">
								                <button type="button" class="close" data-dismiss="modal"><span
								                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
								                </button>
								                <span class="widget-caption">编辑</span>
								            </div>
								            <div class="modal-body clearfix">
								                <form action="" class="form-horizontal clearfix" id="roleUpdateForm">
								                    <div class="form-group col-sm-6">
								                        <label class="col-sm-3 control-label no-padding-right">职位名称</label>
								                        <div class="col-sm-9">
								                            <input type="text" class="form-control positionName" disabled>
								                        </div>
								                    </div>
								                    <div class="form-group col-sm-6">
								                        <label class="col-sm-3 control-label no-padding-right">角色名称</label>
								                        <div class="col-sm-9">
								                        	<input type="hidden" name="roleId"/>
								                            <input class="form-control" name="fullName" type="text">
								                        </div>
								                    </div>
								                    <div class="form-group col-sm-6">
								                        <label class="col-sm-3 control-label no-padding-right">编码</label>
								                        <div class="col-sm-9">
								                            <input class="form-control" name="code" type="text">
								                        </div>
								                    </div>
								                    <hr class="wide">
								                    <div class="col-sm-12 custom-edit">
								                        <span class="custom-title">自定义设置</span>
								                        <hr class="wide margin-bottom-20 clearfix">
								                        <div class="custom-content-edit col-sm-12">
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">项目</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select name="project" class="form-control project selectpicker" multiple
								                                            title="01人力资源管理师">
								                                        <option value="0">01人力资源管理师</option>
								                                        <option value="1">02公共营养师</option>
								                                        <option value="2">03学历</option>
								                                        <option value="3">04采购师</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">品牌</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select name="brand" class="form-control brand selectpicker" multiple title="智联">
								                                        <option value="0">智联</option>
								                                        <option value="1">联想</option>
								                                        <option value="2">中和</option>
								                                        <option value="3">远大</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">部门</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select name="department" class="form-control department selectpicker" multiple
								                                            title="总裁办">
								                                        <option value="0">总裁办</option>
								                                        <option value="1">财务中心</option>
								                                        <option value="2">销售中心</option>
								                                        <option value="3">综合管理中心</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">学员状态</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select name="studentStatus" class="form-control studentStatus selectpicker"
								                                            multiple title="待沟通">
								                                        <option value="0">待沟通</option>
								                                        <option value="1">已沟通</option>
								                                        <option value="2">报名</option>
								                                        <option value="3">预约</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">梯队</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select name="echelon" class="form-control echelon selectpicker" multiple title="1">
								                                        <option value="0">1</option>
								                                        <option value="1">2</option>
								                                        <option value="2">3</option>
								                                        <option value="3">4</option>
								                                        <option value="3">5</option>
								                                        <option value="3">6</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <div class="form-group col-sm-6">
								                                <label class="col-sm-3 control-label no-padding-right">信息归属方</label>
								                                <div class="col-sm-9 no-padding-right">
								                                    <select name="affiliation" class="selectpicker form-control affiliation" multiple
								                                            title="01北京">
								                                        <option value="0">01北京</option>
								                                        <option value="1">02上海</option>
								                                        <option value="2">03天津</option>
								                                        <option value="3">04南京</option>
								                                    </select>
								                                </div>
								                            </div>
								                            <i class="fa fa-plus-circle blue control-label add-custom"></i>
								                        </div>
								                    </div>
								                    <div class="form-group modal-footer col-sm-12">
								                        <div class="col-sm-2 col-sm-offset-4">
								                        	<button type="submit" class="btn btn-primary form-control">确定</button>
								                        </div>
								                        <div class="col-sm-2">
								                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
								                            </button>
								                        </div>
								                    </div>
								                </form>
								            </div>
								        </div>
								    </div>
								</div>
								<!-- 权限授予 -->
								<div class="modal grant fade" tabindex="-1" role="dialog" id="updateRole"
								     aria-labelledby="myModalLabel" aria-hidden="true">
								    <div class="modal-dialog modal-md">
								        <div class="modal-content clearfix">
								            <div class="modal-header bordered-blue bordered-bottom-2">
								                <button type="button" class="close" data-dismiss="modal"><span
								                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
								                </button>
								                <span class="widget-caption">权限授予（当前角色：<span class="role-name primary"></span>）</span>
								            </div>
								            <div class="modal-body clearfix">
								                <div id="authorize-div" style="display: none">
								                    <div class="permission-config">
									                    <div class="permission-content">
									                        <input type="hidden" class="role-id" />
									                        <ul id="permissionTree" class="ztree"></ul>
									                        <div class="col-md-4 save-box text-center">
									                            <button type="button" class="btn btn-primary form-control save" style="width:60px">保存</button>
									                        </div>
									                    </div>
								                    </div>
								                </div>
								            </div>
								        </div>
								    </div>
								</div>
							</div>
                     </div>
                 </div>
             </div>
         </div>

        </div>
   </div>
</div>

<!--新增-->
<div class="modal fade addJurisdiction" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content clearfix">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="addJurisdiction" method="post">
                 	<div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="hidden" class="form-control"  id="buttonRoleId" name="buttonRoleId">
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">类名</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="text" class="form-control" id="buttonKey" name="buttonKey">
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">名称</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="text" class="form-control" id="buttonVal" name="buttonVal">
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right no-padding-left">状态</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <select id="enable" name="enable" class="form-control">
                                <option value="0">禁用</option>
                                <option value="1">启用</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary btn-lg save-mt">确认
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--编辑-->
<div class="modal editJurisdiction fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="editJurisdiction">
    <div class="modal-dialog modal-md">
        <div class="modal-content clearfix">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="editJurisdiction" method="post">
                	<div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right"></label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="hidden" class="form-control"  id="buttonRoleId" name="buttonRoleId">
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">类名</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="text" class="form-control positionName" disabled id="buttonKey" name="buttonKey">
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right">名称</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="text" class="form-control" id="buttonVal" name="buttonVal">
                        </div>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right no-padding-left">状态</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <select name="enable" class="form-control">
                                <option value="0">禁用</option>
                                <option value="1">启用</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary btn-lg">确认
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 


<%@ include file="../common/public_footer.jsp"%>
<script>
var button = '<shiro:hasPermission name="menu:add"><div class="operate-btn pull-right">' +
'<i class="fa fa-plus-square addMenuBtn"></i>' +
/*'<i class="glyphicon glyphicon-sort" data-toggle="modal" data-target="#myModal"></i>' +*/   //隐藏排序按钮
/*'<i class="fa fa-check-circle-o forbiddenBtn"></i>' +*/  //隐藏禁用按钮
'</div></shiro:hasPermission>';
</script>
<script>
//角色表
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#roleTable').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/role/load',
        		"fnServerData": retrieveData,//用于替换默认发到服务端的请求操作  
            	"bServerSide": true,
            	"bDestroy": true,
                "bRetrieve": false,
                "oLanguage" : {
        			"sLengthMenu" : "每页显示 _MENU_ 条记录",
        			"sZeroRecords" : "抱歉， 没有找到",
        			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
        			"sInfoEmpty" : "找不到相关数据",
        			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录)",
        			"sProcessing": "正在加载中...",
        			"sSearch": "搜索",
        			"oPaginate" : {
        				"sFirst" : "首页",
        				"sPrevious" : "前一页",
        				"sNext" : "后一页",
        				"sLast" : "尾页"
        			},
        		},
        		"aoColumns" : [
         			            {"mData": "sysDuty.fullName", 'sClass': "text-center"},
         			            {"mData": "fullName", 'sClass': "text-center"},
         			            {"mData": "enable", 'sClass': "text-center", "mRender":function(data, type, full ){
         			            	if(data==1){
           			          		  return '<a href="#" data-id="'+full.roleId+'" data-status="0" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>';
               			          	}else{
               			              return '<a href="#" data-id="'+full.roleId+'" data-status="1" class="btn btn-nouse btn-xs status-btn"><i class="fa fa-ban"></i> 禁用</a>';
               			          	}
         			            }},
         			           {"mData": "roleId", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
         			        	   return '<shiro:hasPermission name="roleMenu:edit"><a href="#" data-code="'+full.code+'" data-id="'+data+'" data-role="'+full.fullName+'" data-duty="'+full.sysDuty.fullName+'" data-dutyid="'+full.sysDuty.dutyId+'" class="role-edit" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>'+
        			                '<a href="#" data-id="'+data+'" data-role="'+full.fullName+'"  class="authorize" data-toggle="modal" data-backdrop="static" data-target=".grant"><i class="fa fa-lock primary" data-toggle="tooltip" data-placement="top" data-original-title="权限授予" title="权限授予"></i></a>';
        			            	
         			           }}
         			        ],
         			       "aoColumnDefs": [{
          		   	            sDefaultContent: '',
          		   	            aTargets: ['_all']
          		   	        }],
			})
            $('#roleTable_wrapper ul.pagination').css('float','right');
			//每页显示记录数
			$('.dataTables_length').remove();
			$('#roleTable_wrapper .dataTables_info').parent().removeClass('col-xs-6').addClass('col-xs-4');
			$('#roleTable_wrapper .dataTables_paginate').parent().removeClass('col-xs-6').addClass('col-xs-8');
		}
	}
}();
/**
 * 初始化数据
 * @returns
 */
function authority (){
	var authority = $('#authority').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"bPaginate":true,
		"bSort": false, //是否支持排序功能
		"bLengthChange": true, 
		"oLanguage" : {
			"sLengthMenu" : "每页显示 _MENU_ 条记录",
			"sZeroRecords" : "抱歉， 没有找到",
			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
			"sInfoEmpty" : "",
			"sInfoFiltered" : "",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "前一页",
				"sNext" : "后一页",
				"sLast" : "尾页"
			},
			"sProcessing" : ""
		},
		"sAjaxSource" : ctx+'/jurisdiction/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveDataXl,
		"aoColumns" : [
			
			{"mDataProp" : "buttonVal","bSortable": false,'sClass': "text-center"},
            {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	if(data==1){
          		  return '<a href="#" data-id="'+full.buttonRoleId+'" data-status="0" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>';
	          	}else{
	              return '<a href="#" data-id="'+full.buttonRoleId+'" data-status="1" class="btn btn-nouse btn-xs status-btn"><i class="fa fa-ban"></i> 禁用</a>';
	          	}
            }},
            {
                "mData": "buttonRoleId",
                'sClass': "text-center",
                "bSortable": false,
                "mRender": function (data, type, full ) {
                	var u = '<shiro:hasPermission name="jurisdiction:edit">'
                						+'<a onclick="edit(\''+full["buttonRoleId"]
        			                	+'\',\''+full["buttonKey"]
        			                	+'\',\''+full["buttonVal"]
                						+'\',\''+full["enable"]+'\')" class="btn btn-info btn-xs edit" data-toggle="modal" data-target=".editPosition" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'> <i class="fa fa-edit"></i> 编辑</a>'
                						+'</shiro:hasPermission>';
                    return u;
                }
            }
            ],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	
    $('#authority_wrapper .dataTables_info').parent().append($('.dataTables_length'));
  	//每页显示记录数
    $('#authority_wrapper').removeClass();
    $('#authority_wrapper').addClass('table-scrollable'); 
}
//编辑框
$('#authority').on("click",".edit",function(){
	$(".editJurisdiction").modal('show');
})
				
</script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>
<script src="${ctx_static }/home/sysconf/js/authority-management.js"></script>
<script src="${ctx_static }/home/sysconf/js/menu.js"></script>
<script src="${ctx_static }/home/sysconf/js/bodyPermission.js"></script>