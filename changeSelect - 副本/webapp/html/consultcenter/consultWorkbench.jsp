<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/consultcenter/css/wordstation.css" rel="stylesheet">

<div class="workbenchPage page-wrapper">
	<input hidden id="currentUser" value="${user.realName }">
	<div class="row">
		<div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 no-padding-right" id="left-box" style="width:85%;float:left">
			<div class="widget">
			<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">咨询工作台</span>
            </div>
				<div class="widget-body body-wrapper">
					<div class="widget-main ">
						<div class="tabbable">
							<ul class="nav nav-tabs tabs-flat" id="myTab11">
								<!--用来记录当前tab页处于什么状态  -->
								<input type="hidden" id="currentStatus" value="2"/>
								<li class="active">
									<a id="tab_11" data-toggle="tab" href="#home11">
										待沟通 [<span id="spanDGT">0</span>]
									</a>
								</li>
								<li>
									<a id="tab_22"  data-toggle="tab" href="#profile11">
										已沟通 [<span id="spanYGT">0</span>]
									</a>
								</li>
								<li>
									<a id="tab_33"  data-toggle="tab" href="#education">
										预约单 [<span id="spanYYD">0</span>]
									</a>
								</li>
								<li>
									<a id="tab_44"  data-toggle="tab" href="#shangmen">
										上门 [<span id="spanSM">0</span>]
									</a>
								</li>
								<li>
									<a id="tab_55"  data-toggle="tab" href="#dingzuo">
										订座 [<span id="spanDZ">0</span>]
									</a>
								</li>
								<li>
									<a id="tab_66"  data-toggle="tab" href="#baoming">
										报名 [<span id="spanBM">0</span>]
									</a>
								</li>
							</ul>
							<div class="tab-content tabs-flat bordered-blue">
								<div id="home11" class="tab-pane in active">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding">
											<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 form-group">
												<div class="col-sm-12">
													<div class="input-group">
														<input type="text" class="form-control" id="reservation" placeholder="请选择日期">
														<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													</div>
												</div>
											</div>
											<div class="col-lg-6 col-md-6  col-sm-6 col-xs-12 form-group">
												<div class="col-md-6 col-sm-6 no-padding-right">
													<input id="searchVal" class="form-control" placeholder="分校/姓名/产品/电话" type="text" onkeydown="search(1);">
												</div>
												<div class="col-lg-6 col-md-6 col-sm-6  no-padding-right">
													<button onclick="init()" type="button" class="btn increase form-control search-btn">
										                  <i class="fa fa-search"></i> 搜索
										            </button>
										            <label class="control-label blue advanced-filter margin-left-10">
										                	高级筛选<i class="fa fa-angle-down margin-left-5"></i>
										            </label>
												</div>
											</div>
											<div class="pull-right">
												<shiro:hasPermission name="consultConsole:add">
                                               	 <button id="newAdd" class="btn increase form-control pull-right margin-right-15" data-toggle="modal" data-backdrop="static" data-target="#addInquiries">
                                                     	<i class="fa fa-plus"></i> 新增
                                                 </button>
                                               	</shiro:hasPermission>
                                            </div>
                                         </div>
                                         <div class="col-lg-12 col-md-12 col-sm-12 no-padding condition-filtrate">
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">分校</label>
									            <div class="col-sm-10">
													<select name="campus" class="selectpicker form-control  campus" multiple title="--请选择--" id="campus"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4">
									            <label class="control-label pull-left">产品</label>
									            <div class="col-sm-10">
													<!-- <select name="lesson"  id="lesson" class="form-control  chosen-select lesson"  data-placeholder="--请选择--" tabindex="1"></select> -->										            
													<select name="product"  id="product0" class="form-control  chosen-select product"  data-placeholder="--请选择--" tabindex="1"></select>										            
												</div>
									        </div>
									         <!-- <div class="form-group col-sm-4">
									            <label class="control-label pull-left">级别</label>
									            <div class="col-sm-10">
													<select name="level"  id="level" class="form-control  chosen-select"  data-placeholder="--请选择--" tabindex="1">
					                                </select>										            
												</div>
									        </div> -->
									       <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">姓名</label>
									            <div class="col-sm-10 ">
													<input name="fullName" class="form-control" placeholder="请输入姓名"  id="fullName"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">电话</label>
									            <div class="col-sm-10">
													<input name="phoneCall" class="form-control" placeholder="请输入电话"  id="phoneCall"></select>											            
												</div>
									        </div>
                                         </div>
									</div>
									<div class="table-scrollable">
										<table id="table11" class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th>
														分校 
													</th>
													<th>
														待回访时间 
													</th>
													<th>
														姓名 
													</th>
													<th>
														产品 
													</th>
													<th>
														品牌 
													</th>
													
													<th>
														咨询师 
													</th>
													
													<th>
														创建时间 
													</th>
													<th>
														操作 
													</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
								<div id="profile11" class="tab-pane">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-5 col-md-5 col-sm-5 form-group" >
											<div class="col-sm-12">
												<div class="input-group">
													<input type="text" class="form-control" id="reservation1"  placeholder="请选择日期">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
												</div>
											</div>
										</div>
									
										<div class="col-md-6 col-lg-6 col-sm-6 col-xs-12 form-group">
											<div class="col-md-7 col-sm-7 no-margin-right">
												<input id="searchVal2" class="form-control" placeholder="分校/姓名/产品/电话" type="text" onkeydown="search(2);">
											</div>
											<div class="col-lg-3 col-md-3 col-sm-3">
												<button onclick="init2()" type="button" class="btn btn-lightBlue form-control search-btn">
									                 <i class="fa fa-search"></i> 搜索
									            </button>
											</div>
										</div>
										<label class="control-label blue advanced-filter pull-right margin-right-15">
										          高级筛选 <i class="fa fa-angle-down"></i>
										</label>
									</div>
									
									<div class="row row_padding form-horizontal">
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding">
											<div class="col-lg-6 col-md-6 col-sm-6 form-horizontal">
												<label class="pull-left control-label filtrate-text" style="margin-left:15px;">筛选</label>
												<div class="col-sm-3  no-padding">
													<div class="controls">
														<div class="radio-inline">
															<label>
																<input onclick="init2()" value="" class="colored-success" name="depStatus" type="radio" checked>
																<span class="text">全部</span>
															</label>
														</div>
													</div>
												</div>
												<div class="col-sm-3  no-padding">
													<div class="controls">
														<div class="radio-inline">
														<label>
															<input onclick="init2()" value="0" class="colored-success" name="depStatus" type="radio" >
															<span class="text">未预约</span>
														</label>
														</div>
													</div>
												</div>
												<div class="col-sm-4  no-padding">
													<div class="controls">
														<div class="radio-inline">
														<label>
															<input onclick="init2()" class="colored-success" value="1" name="depStatus" type="radio" >
																<span class="text">预约未上门</span>
														</label>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 col-lg-6 col-sm-6 col-xs-12 form-group">
												<label class="col-sm-4 col-md-4 control-label" style="margin-left:-10px">客户成熟度</label>
												<div class="col-sm-6 no-padding">
														<select onchange="init2()" id="studentMY"  class="form-control comment_disabled">
															<option selected="selected" value="0" >请选择</option>
				                                         	<option value="1">A类</option>
				                                         	<option value="2">B类</option>
				                                         	<option value="3">C类</option>
				                                         	<option value="4">D类</option>
				                                        </select>
												</div>
											</div>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding condition-filtrate">
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">分校</label>
									            <div class="col-sm-10">
													<select name="campus" class="selectpicker form-control  campus" multiple title="--请选择--" id="campus"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4">
									            <label class="control-label pull-left">产品</label>
									            <div class="col-sm-10">
													<select name="product"  id="product1" class="form-control  chosen-select product"  data-placeholder="--请选择--" tabindex="1"></select>											            
												</div>
									        </div>
									         <!-- <div class="form-group col-sm-4">
									            <label class="control-label pull-left">级别</label>
									            <div class="col-sm-10">
													<select name="level"  id="level1" class="form-control  chosen-select level"  data-placeholder="--请选择--" tabindex="1"></select>										            
												</div>
									        </div> -->
									       <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">姓名</label>
									            <div class="col-sm-10">
													<input name="fullName" class="form-control" placeholder="请输入姓名"  id="fullName1"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">电话</label>
									            <div class="col-sm-10">
													<input name="phoneCall" class="form-control" placeholder="请输入电话"  id="phoneCall1"></select>											            
												</div>
									        </div>
                                         </div>
									</div>
									
									<div class="table-scrollable">
										<table id="table22" class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th>
														分校 
													</th>
													<th>
														姓名 
													</th>
													<th>
														产品
													</th>
													<th>
														品牌 
													</th>
													<th>
														预约未上门 
													</th>
													<th>
														客户意向 
													</th>
													<th>
														咨询师 
													</th>
													<th>
														回访记录 
													</th>
													<th>
														下次回访时间 
													</th>
													<th>
														操作 
													</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
								<div id="education" class="tab-pane">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding">
                                                 	<div class="col-lg-4 col-md-4 col-sm-4 form-group">
                                                         <div class="col-sm-12">
                                                               <div class="input-group">
                                                                   <input type="text" class="form-control"
                                                                          id="reservation2"  placeholder="请选择日期">
                                                                   <span class="input-group-addon"><i
                                                                           class="fa fa-calendar"></i></span>
                                                               </div>
                                                         </div>
                                                 	</div>

                                                    <div class="form-group col-lg-5 col-md-5 col-sm-5 col-xs-12 ">
                                                        <div class="col-md-7 col-sm-7 no-margin-right">
                                                            <input class="form-control" id="searchVal3"
                                                                   placeholder="分校/姓名/产品/电话" type="text" onkeydown="search(3);">
                                                        </div>
                                                        <div class="col-lg-5 col-md-3 col-sm-3 no-padding">
                                                            <button type="button" onclick="init3()"
                                                                    class="btn btn-lightBlue  form-control search-btn pull-left"  style="width:70px;padding:6px;">
                                                                    <i class="fa fa-search"></i> 搜索
                                                            </button>
                                                            <label class="control-label blue advanced-filter pull-right  margin-right-15">
												              	高级筛选 <i class="fa fa-angle-down"></i>
												    		</label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-lg-3 col-md-3  col-sm-3 col-xs-12">
                                                    	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding-left">
                                                     	<%-- <c:if test="${type eq '3' }">  --%>
                                                          <div class="form-group col-md-10 col-sm-10 no-margin-right">
                                                              <select id="statusFP" name="counselor" class="form-control">
                                                                  <option value="0">--选择接待老师--</option>
                                                                  <c:forEach var="e" items="${selectList }">
                                                				  <option value="${e.userId }">${e.realName }</option>
                                                				  </c:forEach>
                                                              </select>
                                                          </div>
                                                          <div class="form-group col-md-2 col-sm-2 no-margin-right">
	                                                          <button type="button" onclick="toChooseAr()" 
	                                                          		class="btn btn-lightBlue form-control search-btn margin-left-10" style="width:70px;">指定
	                                                          </button>
                                                          </div>
                                                          
                                                          <%-- </c:if>  --%>
                                                		</div>
                                                	</div>
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12 no-padding condition-filtrate">
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">分校</label>
									            <div class="col-sm-10">
													<select name="campus" class="selectpicker form-control  campus" multiple title="--请选择--" id="campus2"></select>	
												</div>
									        </div>
									        <div class="form-group col-sm-4">
									            <label class="control-label pull-left">产品</label>
									            <div class="col-sm-10">
													<select name="product"  id="product2" class="form-control  chosen-select product"  data-placeholder="--请选择--" tabindex="1"></select>
												</div>
									        </div>
									         <!-- <div class="form-group col-sm-4">
									            <label class="control-label pull-left">级别</label>
									            <div class="col-sm-10">
													<select name="level"  id="level2" class="form-control  chosen-select level"  data-placeholder="--请选择--" tabindex="1"></select>										            
												</div>
									        </div> -->
									       <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">姓名</label>
									            <div class="col-sm-10">
													<input name="fullName" class="form-control" placeholder="请输入姓名"  id="fullName2"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">电话</label>
									            <div class="col-sm-10">
													<input name="phoneCall" class="form-control" placeholder="请输入电话"  id="phoneCall2"></select>											            
												</div>
									        </div>
                                              </div>
                                          </div>
									<div class="table-scrollable table-scrollable33">
										<table id="table33" class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th width="5%">
			                                            <label>
			                                                <input type="checkbox" class="master3">
			                                                <span class="text"></span>
			                                            </label>
			                                        </th>
													<th>
														预约单号
													</th>
													<th>
														预约上门时间 
													</th>
													<th>
														校区 
													</th>
													<th>
														分校 
													</th>
													<th>
														学员姓名 
													</th>
													<th>
														产品 
													</th>
													<!-- <th>
														班型 
													</th> -->
													<th>
														价格 
													</th>
													<th>
														咨询师 
													</th>
													<th>
														接待老师 
													</th>
													<th>
														操作 
													</th>

												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>

								<div id="shangmen" class="tab-pane">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding">
											<div class="col-lg-5 col-md-5 col-sm-5 form-group">
												<div class="col-sm-12">
													<div class="input-group">
														<input type="text" class="form-control" id="reservation3"  placeholder="请选择日期">
														<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													</div>
												</div>
											</div>
											<div class="col-md-6 col-lg-6 col-sm-6 col-xs-12 form-group">
												<div class="col-md-7 col-sm-7 no-margin-right">
													<input id="searchVal4" class="form-control" placeholder="分校/姓名/产品/电话" type="text" onkeydown="search(4);">
												</div>
												<div class="col-lg-3 col-md-3 col-sm-3">
													<button onclick="init4()" type="button" class="btn btn-lightBlue form-control search-btn">
										                   <i class="fa fa-search"></i> 搜索
										            </button>
												</div>
											</div>
											<label class="control-label blue advanced-filter pull-right  margin-right-15">
											       高级筛选  <i class="fa fa-angle-down"></i>
											</label>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding condition-filtrate">
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">分校</label>
									            <div class="col-sm-10">
													<select name="campus" class="selectpicker form-control  campus" multiple title="--请选择--" id="campus3"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4">
									            <label class="control-label pull-left">产品</label>
									            <div class="col-sm-10">
													<select name="product"  id="product3" class="form-control  chosen-select product"  data-placeholder="--请选择--" tabindex="1"></select>
												</div>
									        </div>
									       <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">姓名</label>
									            <div class="col-sm-10">
													<input name="fullName" class="form-control" placeholder="请输入姓名"  id="fullName3"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">电话</label>
									            <div class="col-sm-10">
													<input name="phoneCall" class="form-control" placeholder="请输入电话"  id="phoneCall3"></select>											            
												</div>
									        </div>
                                        </div>
									</div>
									<div class="table-scrollable">
										<table id="table44" class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th>
														预约单号 
													</th>
													<th>
														上门时间 
													</th>
													<th>
														分校 
													</th>
													<th>
														校区 
													</th>
													<th>
														学员姓名 
													</th>
													<th>
														产品 
													</th>
													<!-- <th>
														班型 
													</th> -->
													<th>
														价格 
													</th>
													<!-- <th>
														未报名原因 
													</th> -->
													<th>
														咨询师 
													</th>
													<th>
														接待老师 
													</th>
													<th>
														操作 
													</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>

								<div id="dingzuo" class="tab-pane">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding">
											<div class="form-group col-lg-5 col-md-5 col-sm-5 col-xs-12">
												<div class="col-sm-12">
													<div class="input-group">
														<input type="text" class="form-control" id="reservation4"  placeholder="请选择日期">
														<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													</div>
												</div>
											</div>
										
											<div class=" col-lg-6 col-md-6 col-sm-6 col-xs-12 form-group">
												<div class="col-md-7 col-sm-7 no-margin-right">
													<input id="searchVal5" class="form-control" placeholder="分校/姓名/产品/电话" type="text" onkeydown="search(5);">
												</div>
												<div class="col-lg-3 col-md-3 col-sm-3 no-padding-right">
													<button onclick="init5()" type="button" class="btn btn-lightBlue form-control search-btn">
										                    <i class="fa fa-search"></i> 搜索
										            </button>
												</div>
											</div>
											<label class="control-label blue advanced-filter pull-right  margin-right-15">
											       高级筛选  <i class="fa fa-angle-down"></i>
											</label>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding condition-filtrate">
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">分校</label>
									            <div class="col-sm-10">
													<select name="campus" class="selectpicker form-control  campus" multiple title="--请选择--" id="campus4"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4">
									            <label class="control-label pull-left">产品</label>
									            <div class="col-sm-10">
													<select name="product"  id="product4" class="form-control  chosen-select product"  data-placeholder="--请选择--" tabindex="1"></select>
												</div>
									        </div>
									       <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">姓名</label>
									            <div class="col-sm-10">
													<input name="fullName" class="form-control" placeholder="请输入姓名"  id="fullName4"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">电话</label>
									            <div class="col-sm-10">
													<input name="phoneCall" class="form-control" placeholder="请输入电话"  id="phoneCall4"></select>											            
												</div>
									        </div>
                                              </div>
									</div>
									<div class="table-scrollable">
										<table id="table55" class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th>
														报名表编号 
													</th>
													<th>
														定座日期 
													</th>
													<th>
														补费日期 
													</th>
													<th>
														分校 
													</th>
													<th>
														校区 
													</th>
													<th>
														姓名 
													</th>
													<th>
														产品 
													</th>
													<th>
														应缴 
													</th>
													<th>
														实缴 
													</th>
													<th>
														欠费 
													</th>
													<th>
														打印 
													</th>
													<th>
														咨询师 
													</th>
													<th>
														接待老师 
													</th>
													<th>
														操作 
													</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>

								<div id="baoming" class="tab-pane">
									<div class="row row_padding form-horizontal">
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding">
											<div class="form-group col-lg-5 col-md-5 col-sm-5 form-horizontal">
												<div class="col-sm-12">
													<div class="controls">
														<div class="input-group">
															<input type="text" class="form-control" id="reservation5"  placeholder="请选择日期">
															<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
														</div>
													</div>
												</div>
											</div>
										
											<div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12">
												<div class="col-md-7 col-sm-7 no-margin-right">
													<input id="searchVal6"  class="form-control" placeholder="分校/姓名/产品/电话" type="text" onkeydown="search(6);">
												</div>
												<div class="col-lg-3 col-md-3 col-sm-3  no-padding-right">
													<button onclick="init6()" type="button" class="btn btn-lightBlue form-control search-btn">
										                  <i class="fa fa-search"></i> 搜索
										            </button>
												</div>
											</div>
											<label class="control-label blue advanced-filter pull-right  margin-right-15">
										              	高级筛选 <i class="fa fa-angle-down"></i>
										    </label>
										</div>
										<div class="col-sm-12 no-padding form-horizontal">
											<div class="col-lg-6 col-md-6 col-sm-6 form-horizontal">
												<div class="form-group">
													<label class="pull-left control-label filtrate-text" style="margin-left:15px;">筛选</label>
													<div class="col-sm-3  no-padding">
														<div class="controls">
															<div class="radio-inline">
																<label>
																	<input onclick="init6()" value="" class="colored-success" name="mustPay" type="radio" checked>
																	<span class="text">全部</span>
																</label>
															</div>
														</div>
													</div>
													<div class="col-sm-4  no-padding">
														<div class="controls">
															<div class="radio-inline">
															<label>
																<input onclick="init6()" class="colored-success" value="1" name="mustPay" type="radio" >
																	<span class="text">未欠费学员</span>
															</label>
															</div>
														</div>
													</div>
													<div class="pull-left">
														<div class="controls">
															<div class="radio-inline">
															<label>
																<input onclick="init6()" value="0" class="colored-success" name="mustPay" type="radio" >
																<span class="text">欠费学员</span>
															</label>
															</div>
														</div>
													</div>
												</div>
											</div>
										
											<div class="col-md-6 col-lg-7 col-sm-6 col-xs-12">
											</div>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12 no-padding condition-filtrate">
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">分校</label>
									            <div class="col-sm-10">
													<select name="campus" class="selectpicker form-control  campus" multiple title="--请选择--" id="campus5"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4">
									            <label class="control-label pull-left">产品</label>
									            <div class="col-sm-10">
													<select name="product"  id="product5" class="form-control  chosen-select product"  data-placeholder="--请选择--" tabindex="1"></select>
												</div>
									        </div>
									       <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">姓名</label>
									            <div class="col-sm-10">
													<input name="fullName" class="form-control" placeholder="请输入姓名"  id="fullName5"></select>											            
												</div>
									        </div>
									        <div class="form-group col-sm-4 padding-left-30">
									            <label class="control-label pull-left">电话</label>
									            <div class="col-sm-10">
													<input name="phoneCall" class="form-control" placeholder="请输入电话"  id="phoneCall5"></select>											            
												</div>
									        </div>
                                        </div>
									</div>
									
									<div class="table-scrollable">
										<table id="table66" class="table table-striped table-bordered table-hover">
											<thead>
												<tr style="color: red;" id="arrearage">
													<th >欠费合计:</th>
													<td id="mustPaySum" colspan="15"></td>
												</tr>
												<tr>
													<th>
														报名表编号 
													</th>
													<th>
														报名日期 
													</th>
													<th>
														下次缴费时间 
													</th>
													<th>
														分校 
													</th>
													<th>
														校区 
													</th>
													<th>
														姓名 
													</th>
													<th>
														产品
													</th>
													<th>
														应缴 
													</th>
													<th>
														实缴 
													</th>
													<th>
														欠费 
													</th>
													<th>
														打印 
													</th>
													<th>
														咨询师 
													</th>
													<th>
														接待老师 
													</th>
													<th>
														操作
													</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
								</div>

							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 mg_top" id="right-box" style="width:15%;float:right">
			<div class="orders-container">
				<div class="orders-header">
					<h6 class="task-h6">任务提醒</h6>
					<i class="fa fa-angle-double-down task-down" style="font-size:30px;position:absolute;right:10px;top:10px;cursor:pointer;color:#CDC9C9"></i>
					<i class="fa fa-angle-double-left task-left" style="font-size:30px;position:absolute;right:10px;top:10px;cursor:pointer;display:none;color:#CDC9C9"></i>
				</div>
				<div class="orders-body">
					<ul class="orders-list" id="taskRemind">
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>
		
		
<!--待沟通、沟通呼出查看弹出框-->
<div id="addFirstDiv" class="modal fade bs-example-modal-lg in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body clearfix form-horizontal modal_padding">
				<table class="table table_border text-center">
					<tr>
						<td>咨询分校：<span id="departmentName11"></span> </td>
						<td>品牌：<span id="brandName1"></span></td>
						<td>咨询者类型：<span id="studentAttrName21"></span></td>
						<td>媒体类源：<span id="studentAttrName11"></span></td>
						<td>客户成熟度：<span>A-高</span></td>
					</tr>
				</table>
				<form id="updateInfoManage" method="" class="form-horizontal" style="padding:0 20px">
					<div class="col-lg-12 col-sm-12 col-xs-12">
						
						 <div class="well with-header">
                            <div class="header bordered-blue">
                                <div style="float:left">
                                    <b>客户标签</b>
                                </div>
                                <div style="float:right">
                                    <a href="#" class="btn btn-info btn-xs btn_special_edit"><i
                                            class="fa fa-edit"></i> 编辑</a>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin gt_content">
                                <p class="col-md-12"><i class="fa fa-plus-circle add icon-btn" data-toggle="modal"
                                                        data-backdrop="static" ></i>
                                    <i class="fa fa-minus-circle reduce icon-btn"></i></p>
                                    <input class="form-control comment_disabled" disabled="disabled">
									</div>
                                <div class="tag">
                                </div>
                            </div>
                        </div>
						
						<div class="well with-header">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>学员-个人信息</b>
								</div>
								<input name="infoManageId" id="infoManageId1" type="hidden" />
								<input  id="status1" type="hidden" />
								<div style="float:right">
								<shiro:hasPermission name="consultConsole:edit">
									<a href="javascript:void(0);" class="btn btn-info btn-xs btn_special_edit"><i class="fa fa-edit"></i> 编辑</a>
								</shiro:hasPermission>
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<div class="row form-group-margin gt_content">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
									<div class="col-sm-9 col-lg-9">
										<input id="studentName1" name="studentName" type="text" class="form-control comment_disabled" value="刘晋" disabled="disabled">
									</div>
								</div>

								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">性别</label>
									<div class="col-sm-9">
										<select id="studentSex1" name="studentSex" class="form-control comment_disabled" disabled="disabled">
											<option value="0">男</option>
											<option value="1">女</option>
										</select>
									</div>
								</div>

								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">年龄</label>
									<div class="col-sm-9">
										<input id="age1" name="age" type="text" class="form-control comment_disabled" value="24" disabled="disabled">
									</div>
								</div>

								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">手机</label>
									<div class="col-sm-9">
										<input name="studentPhone" id="studentPhone1" type="text" class="form-control comment_disabled"  disabled="disabled">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">邮箱</label>
									<div class="col-sm-9">
										<input name="email" id="email1" type="email" class="form-control comment_disabled" value="liujin@126.com" disabled="disabled">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
									<div class="col-sm-9">
										<input name="phoneBelong"  disabled="disabled" id="departmentId11" class="form-control phoneBelong comment_disabled" placeholder="--请选择--">
										
										<div class="attribution">
							                <div class="modal-dialog modal-sm">
							                    <div class="modal-content">
							                        <div class="modal-body clearfix">
							                            <form class="form-horizontal">
							                                <div class="form-group">
							                                    <label class="control-label col-sm-3 no-padding-right">省份</label>
							                                    <div class="col-sm-6">
							                                        <select name="province"  id="province" class="form-control province">
							                                        </select>
							                                    </div>
							                                </div>
							                                <div class="form-group">
							                                    <label class="control-label col-sm-3 no-padding-right">城市</label>
							                                    <div class="col-sm-6">
							                                        <select name="city" id="city" class="form-control city">
							                                        <option value="">--请选择--</option>
							                                        </select>
							                                    </div>
							                                </div>
							                                <div class="form-group modal-footer">
							                        
							                                    <div class="col-sm-2  col-sm-offset-3 margin-right-20">
							                                        <button type="button" class="btn btn-primary btn-sm confirm-btn" style="position:relative;z-index:99;">确定
							                                        </button>
							                                    </div>
							            						<div class="col-sm-2">
							                                        <button type="button" class="btn btn-danger btn-sm cancel-btn">
							                                            		取消
							                                        </button>
							                                    </div>
							                                </div>
							                            </form>
							                        </div>
							                    </div>
							                </div>
							            </div>
            
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">微信</label>
									<div class="col-sm-9">
										<input name="weChat" id="weChat1" type="text" class="form-control comment_disabled" value="18510434670" disabled="disabled">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">QQ</label>
									<div class="col-sm-9">
										<input name="tengXun" id="tengXun1" type="text" class="form-control comment_disabled" value="123943039" disabled="disabled">
									</div>
								</div>
								
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-41px">其他联系方式</label>
									<div class="col-sm-9">
										<input name="ortherPhone" id="ortherPhone1" type="text" class="form-control comment_disabled" disabled="disabled">
									</div>
								</div>


								<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型</label>
                                    <div class="col-sm-9">
                                        <select name="idcardType" id="idcardType1" class="form-control comment_disabled">
                                            <option value="">身份证</option>
                                            <option value="">护照</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件号码</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="idcard" id="idcard1"
                                               class="form-control comment_disabled padding-right-5 padding-left-10"
                                               disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">报名方式</label>
                                    <div class="col-sm-9">
                                        <select name="infoType" id="infoType1" class="form-control comment_disabled">
                                            <option value="0">线上支付</option>
                                            <option value="1">上门报名</option>
                                        </select>
                                    </div>
                                </div>

								<div class="form-group col-lg-10 col-md-12 col-sm-12">
									<label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">通讯地址</label>
									<div class="col-sm-9">
										<input name="phoneAddress" id="phoneAdress1" class="form-control comment_disabled" value="北京市朝阳区富华弘燕大厦" type="text" disabled="disabled">
									</div>
								</div>
								
								<div class="form-group col-lg-10 col-md-12 col-sm-12">
									<label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">工作单位</label>
									<div class="col-sm-9">
										<input name="workSpace" id="wrokSpace1" type="text" class="form-control comment_disabled" value="中和教育" disabled="disabled">
									</div>
								</div>
							</div>
						</div>


						<div class="well with-header">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>课程缴费信息</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<table class="table table-striped table-hover table-bordered dataTable no-footer">
								<tbody>
									<tr>
										<th>收费项目</th>
										<th>应缴</th>
										<th>实缴</th>
										<th>支付方式</th>
										<th>欠费</th>
									</tr>
								</tbody>
							</table>
							<div class="well">
								<span class="tips">备注:</span> <span>2016-11-07考务费于2017-2-14补交</span>
								<span>2016-11-07考务费于2017-2-14补交</span>
								<span>2016-11-07考务费于2017-2-14补交</span>
								<span>2016-11-07考务费于2017-2-14补交</span>
							</div>
						</div>
						
						<div class="well with-header">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>课程缴费信息</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<table  class="table table-striped table-hover td_border dataTable no-footer">
								<tr>
									<td>呼入-咨询记录1</td>
								</tr>
							</table>
						</div>
						
						<div class="clearfix form-group" style="margin:40px 0px;">
							<div class="col-sm-3  col-xs-3  col-sm-offset-4  col-xs-offset-3">
								<button type="submit"  class="btn btn-primary btn-lg col-sm-6">确认</button>
							</div>
								<div class="col-sm-3 col-xs-3">
								<button type="button" class="btn btn-danger btn-lg col-sm-6" data-dismiss="modal">取消</button>
							</div>
						</div>
					</div>
				</form>
				
				<div class="right-toolbar tab_content tab_net tab_content_11">
                    <a href="#">
                        <img src="${ctx_static}/home/consultcenter/image/phone.png"><i></i>
                        <div class="up">
                            <p id="callPhone1">拨打</p>
                        </div>
                    </a>
                    <a href="#">
                        <img src="${ctx_static}/home/consultcenter/image/callback.png"><i></i>
                        <div class="up">
                            <p class="special">追加回访记录</p>
                        </div>
                    </a>
                    <a href="#">
                        <img src="${ctx_static}/home/consultcenter/image/note.png"><i></i>
                        <div class="up">
                            <p>发送短信</p>
                        </div>
                    </a>
                    <a href="#"  data-toggle="modal" data-target=".subscribe"  data-backdrop="static">
                        <img src="${ctx_static}/home/consultcenter/image/subscribe.png"><i></i>
                        <div class="up">
                            <p>转为预约</p>
                        </div>
                    </a>
                    <a href="#">
                        <img src="${ctx_static}/home/consultcenter/image/send-mail.png"><i></i>
                        <div class="up">
                            <p>发送邮件</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
			</div>
		</div>
	</div>
</div>

<!--预约单查看、呼出-->
<div id="addSecondDiv" class="modal fade bs-example-modal-lg1 aaa in" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
	<div class="modal-dialog modal-lg use_1">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<span class="widget-caption">待沟通</span>
			</div>
			<div class="modal-body  clearfix  form-horizontal modal_padding">
				<table class="table table_border text-center">
					<tr>
						<td>咨询分校：<span id="departmentName12"></span> </td>
						<td>品牌：<span id="brandName2"></span></td>
						<td>咨询者类型：<span id="studentAttrName22"></span></td>
						<td>媒体类源：<span id="studentAttrName12"></span></td>
						<td>客户成熟度：<span id="studentMaturity2"></span></td>
					</tr>
				</table>
				<form id="updateInfoManage2" method="" class="form-horizontal" style="padding:0 20px">
					<div class="col-lg-12 col-sm-12 col-xs-12">
					<!--客户标签form  -->
					<!-- <form id="customerTagForm" method="" class="form-horizontal" style="padding:0 20px"> -->
						<div class="well with-header">
                            <div class="header bordered-blue">
                                <div style="float:left">
                                    <b>客户标签</b>
                                </div>
                                <div class=" pull-right">
                                    <a href="#" class="btn btn-info btn-xs tagAdd" data-toggle="modal" data-backdrop="static" data-target=".customer">
                                    	<i class="fa fa-plus-square-o" style="margin-right:5px;"></i>添加
                                    </a>
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <div class="row form-group-margin gt_content">
                                <p class="col-md-12">
                                	<i class=""></i>
                                </p>
                                <div class="tag"></div>
                            </div>
                        </div>
                      <!-- </form> -->
						<div class="well with-header">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>学员-个人信息</b>
								</div>
								<!--后台处理数据时使用  -->
								<!--consult_info_center_manage表主键，consult_info_manage视图主键  -->
								<input name="infoManageId" id="infoManageId2" type="hidden" />
								<!--student_info_manage表主键  -->
								<input name="studentInfoManageId" id="studentInfoManageId" type="hidden" />
								<!--project_info_manage表主键  -->
								<input name="projectInfoManageId" id="projectInfoManageId" type="hidden" />
								<!--子产品的课程信息id -->
								<input name="childrenProduct.projectInfoManageId" id="childProjectInfoManageId" type="hidden" />
								<!--consult_info_manage_pay_fees表主键  -->
								<input name="consultInfoManagePayFeesId" id="consultInfoManagePayFeesId" type="hidden" />
								<!--产品考期ID后面会用到  -->
								<input name="examTimeId" id="examTimeId" type="hidden" />
								<!--产品考期ID后面会用到  -->
								<!-- <input name="productExamTimeId" id="productExamTimeId" type="hidden" /> -->
								<!--产品归属分校ID,信息量归属地id  -->
								<input id="departmentId1Hidden" type="hidden" />
								<!--下次缴费期次  -->
								<input id="nextPayNum2" type="hidden" name="nextPayNum2" />
								<!--productId  -->
								<input id="productIdHidden" type="hidden" name="productIdHidden" />
								<!--子产品id-childProductId  -->
								<input id="childProductIdHidden" type="hidden" />
								<!--咨询量课程信息校区id  -->
								<input id="schoolIdHidden" type="hidden" name="schoolId"/>
								<!--咨询量课程信息校区名称  -->
								<input id="schoolNameHidden" type="hidden" name="schoolName"/>
								<!--咨询量课程信息咨询师id  -->
								<input id="counselorIdHidden" type="hidden" name="counselorId"/>
								<!--咨询量课程信息咨询师名称  -->
								<input id="counselorHidden" type="hidden" name="counselor"/>
								<!--咨询量课程信息接待老师id  -->
								<input id="reciveIdHidden" type="hidden" name="reciveId"/>
								<!--咨询量课程信息咨询师名称  -->
								<input id="reciveNameHidden" type="hidden" name="reciveName"/>
								<!--该课程使用折扣id  -->
								<input name="discountId" id="discountId" type="hidden"/>
								<!--该课程使用积分id  -->
								<input name="scaleId" id="scaleId" type="hidden" disabled/>
								<!--该课程使用优惠码id  -->
								<input name="activityCodePro" id="activityCodePro" type="hidden"/>
								<input name="activityValuePro" id="activityValuePro" type="hidden"/>
								
								<input name="serverContent" id="serverContent2" type="text" hidden />
								<input name="recordContent" id="recordContent2" value="" type="text" hidden />
								<input name="serverId" id="serverId2" type="hidden" />
								<input  id="reciveId2" type="hidden" />
								<input  id="status2" name="status2" type="hidden" />
								<input  id="buttonStatus2" type="hidden" />
								<input name="classPrice" id="classPrice" type="hidden" value=""/><!--应缴费总和  -->
								<input name="sumPrice2" id="sumPrice2" type="hidden" value=""/><!--应缴费  -->
								<input name="sPrice" id="sPrice" type="hidden" value=""/><!--实缴费  -->
								<input name="childrenProduct.sPrice" id="childSPrice" type="hidden" value=""/><!--子产品实缴费  -->
								<input name="dPrice" id="dPrice" type="hidden" value=""/><!--订座费  -->
								<input name="dPriceType" id="dPriceType" type="hidden" value=""/><!--订座费缴费方式  -->
								<input name="departmentName3" id="departmentName1Hid" type="hidden" />
								<!--主产品——是否分期标志-是否分期付款 1-是 0-否——默认不分期  -->
								<input name="mainIsInstallment" id="mainIsInstallment" value="0" type="hidden" />
								<!--子产品——是否分期标志-是否分期付款 1-是 0-否——默认不分期  -->
								<input name="childIsInstallment" id="childIsInstallment" value="0" type="hidden" />
								<!--主产品首付款比率  -->
								<input name="downpaymentsRatio" id="mainDownpaymentsRatio" value="0" type="hidden" />
								<!--子产品首付款比率  -->
								<input name="childrenProduct.downpaymentsRatio" id="childDownpaymentsRatio" value="0" type="hidden" />
								<!-- <input name="creationDate" id="creationDate" type="hidden" /> -->
								<input  style='opacity:0.0;cursor: default;width:10px;height:10px;' name="studentPhone" id="studentPhone3" type="text" >
								<div id="feddiv"   style="float:right;">
								<shiro:hasPermission name="consultConsole:edit"> 
										<a href="javascript:void(0);" class="btn btn-info btn-xs btn_special_edit"><i class="fa fa-edit"></i> 编辑</a>
								</shiro:hasPermission>
										<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<div class="row form-group-margin gt_content">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名<span class="control-label mandatory">*</span></label>
									<div class="col-sm-9 col-lg-9">
										<input id="studentName2" name="studentName" type="text" class="form-control comment_disabled">
									</div>
								</div>

								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">性别<span class="control-label mandatory">*</span></label>
									<div class="col-sm-9">
										<select id="studentSex2" name="studentSex" class="form-control comment_disabled">
											<option value="0">男</option>
											<option value="1">女</option>
										</select>
									</div>
								</div>

								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">年龄<span class="control-label mandatory">*</span></label>
									<div class="col-sm-9">
										<input id="age2" name="age" type="text" class="form-control comment_disabled">
									</div>
								</div>

								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">手机<span class="control-label mandatory">*</span></label>
									<div class="col-sm-9">
										<input readonly="readonly"  id="studentPhone2" type="text" class="form-control">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">邮箱</label>
									<div class="col-sm-9">
										<input name="email" id="email2" type="email" class="form-control comment_disabled">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
									<div class="col-sm-9">
										<input name="phoneBelong" id="departmentId12" name="departmentId1" class="form-control phoneBelong comment_disabled" placeholder="--请选择--">
										
										<div id="secondDivCity" class="attribution">
							                <div class="modal-dialog modal-sm">
							                    <div class="modal-content">
							                        <div class="attribution-body">
							                            <div class="form-horizontal">
							                                <div class="form-group">
							                                    <label class="control-label col-sm-2 no-padding">省份</label>
							                                    <div class="col-sm-10 no-padding-right">
							                                        <select name="province"  id="province2" class="form-control province chosen-select"  data-placeholder="--请选择--" tabindex="1">
							                                        </select>
							                                    </div>
							                                </div>
							                                <div class="form-group">
							                                    <label class="control-label col-sm-2 no-padding">城市</label>
							                                    <div class="col-sm-10 no-padding-right">
							                                        <select name="city" id="city2" class="form-control city chosen-select"  data-placeholder="--请选择--" tabindex="1">
							                                        	<option value="0">--请选择--</option>
							                                        </select>
							                                    </div>
							                                </div>
							                                <div class="form-group modal-footer">
							                                 	<div class="col-sm-4 col-sm-offset-2">
							                                        <button id="secondDivYes" type="button" class="btn btn-primary btn-sm "style="position:relative;z-index:99;">确定
							                                        </button>
							                                    </div>
							                                    <div class="col-sm-2">
							                                        <button id="secondDivNo" type="button" class="btn btn-danger btn-sm cancel-btn">取消
							                                        </button>
							                                    </div>
							                                </div>
							                            </div>
							                        </div>
							                    </div>
							                </div>
							            </div>
            
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">微信</label>
									<div class="col-sm-9">
										<input name="weChat" id="weChat2" type="text" class="form-control comment_disabled">
									</div>
								</div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-3 control-label no-padding-right">QQ</label>
									<div class="col-sm-9">
										<input name="tengXun" id="tengXun2" type="text" class="form-control comment_disabled">
									</div>
								</div>
								
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-5 control-label no-padding-right no-padding-left" style="margin-left:-41px">其他联系方式</label>
									<div class="col-sm-9">
										<input name="ortherPhone" id="ortherPhone2" type="text" class="form-control comment_disabled">
									</div>
								</div>


								<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型</label>
                                    <div class="col-sm-9">
                                        <select id="idcardType2" name="idcardType" class="form-control comment_disabled">
                                            <option selected value="1">身份证</option>
                                            <option value="2">护照</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件号码</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="idcard" id="idcard2"
                                               class="form-control comment_disabled padding-right-5 padding-left-10">
                                    	<span class="reg red" style="position:absolute;left:15px;top:35px"></span>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-3 control-label no-padding-right no-padding-left">民族</label>
                                    <div class="col-sm-9">
                                       <!-- <input type="text" name="nation" id="nation"
                                               class="form-control comment_disabled padding-right-5 padding-left-10"
                                               disabled="disabled"> -->
                                       <select class="form-control comment_disabled" id="nation" name="nation"  >
                                       </select>       
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">毕业院校</label>
                                    <div class="col-sm-9">
                                        <input type="text"  name="bySchool"  id="bySchool" class="form-control comment_disabled padding-right-5 padding-left-10" >
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right no-padding-left" style="margin-left:-20px">最高学历</label>
                                    <div class="col-sm-9">
                                        <!-- <select name="studentAttrName3" id="studentAttrName32" class="form-control comment_disabled" ></select> -->       
                                        <select name="studentAttrId3" id="studentAttrName32" class="form-control comment_disabled" ></select>       
                                    </div>
                                </div>
                                 <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">所学专业</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="byZy" id="byZy"
                                               class="form-control comment_disabled padding-right-5 padding-left-10"
                                               >
                                    </div>
                                </div>
                                 <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">紧急联系人</label>
                                    <div class="col-sm-9">
                                         <input type="text" name="emergencyContact" id="emergencyContact"
                                               class="form-control comment_disabled padding-right-5 padding-left-10"
                                               >
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">联系方式</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="emergencyContactMode" id="emergencyContactMode"
                                               class="form-control comment_disabled padding-right-5 padding-left-10"
                                               >
                                    </div>
                                </div>
                                <!-- <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">客户成熟度：</label>
                                    <div class="col-sm-9">
                                         <select name="studentMaturity" id="studentMaturity" class="form-control comment_disabled" >
                                         	<option selected="selected" value="1">A类</option>
                                         	<option value="2">B类</option>
                                         	<option value="3">C类</option>
                                         	<option value="4">D类</option>
                                         </select>
                                    </div>
                                </div> -->
								<div class="form-group col-lg-10 col-md-12 col-sm-12">
									<label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">通讯地址</label>
									<div class="col-sm-9">
										<input name="phoneAddress" id="phoneAddress2" class="form-control comment_disabled"  type="text" >
									</div>
								</div>
								
								<div class="form-group col-lg-10 col-md-12 col-sm-12">
									<label style="margin-left: -48px !important;" class="col-sm-2 control-label no-padding-right">工作单位</label>
									<div class="col-sm-9">
										<input name="workSpace" id="workSpace2" type="text" class="form-control comment_disabled"  >
									</div>
								</div>
							                                        
								<div class="clearfix form-group">
									<div class="pull-right padding-right-20">
										<!-- <button onclick="firstButton(this)" type="button" class="btn btn-blue btn-md col-sm-12 personal-affirm">校验</button> -->
									</div>
								</div>
							                                        
							</div>
						</div>

						<div class="well with-header project">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>课程信息</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<div class="row form-group-margin">
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">产品类型
									<span class="control-label mandatory">*</span></label>
			                        <div class="col-sm-9 no-padding-right">
			                            <select name="productModelId" id="product_model" class="form-control productModelId chosen-select">
			                            </select>
			                            <input type="hidden" name="productModelName" id="productModelName" class="projectInfoManager" value=""/>
			                        </div>
			                    </div>
								<div class="form-group col-lg-4 col-md-4 col-sm-6">
									<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">产品</label>
									<div class="col-sm-9 no-padding-right">
										<select id="productId" class="productId" name="productId" data-placeholder="--请选择--"  class="form-control chosen-select">
											
										</select>
										<input id="productName" name="productName" type="hidden" class="projectInfoManager"/>
										<input id="classAttr2" name="classAttr" type="hidden">
										<input id="schoolId2" type="hidden"/>
									</div>
								</div>
 								<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">收款方</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <select id="payee" name="payee" class="form-control chosen-select">
                                        </select>
                                    </div>
                                </div>
 								<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考期</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <select id="kTime" name="kTime" class="form-control chosen-select">
                                        </select>
                                        <input id="kTimeValue" name="kTimeValue" type="hidden" class="projectInfoManager">
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考试地区</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <select id="branchSchoolId" name="branchSchoolId" class="form-control chosen-select branchSchoolId" onchange="branchSchoolChange()">
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">报名方式：</label>
                                    <div class="col-sm-9 no-padding-right">
                                        <select name="infoType" class="form-control chosen-select">
                                        	<option value="0" selected>正常</option>
                                        	<option value="1">分期</option>
                                        </select>
                                    </div>
                                </div>
								<div class="clearfix form-group">
							<div class="pull-right padding-right-20">
								<!-- <button onclick="secondButton(this)" type="button" class="btn btn-blue btn-md col-sm-12 course-affirm">校验</button> -->
							</div>
						</div>
							</div>
						</div>
						
						<!--报名费详细div  -->
						<div class="well with-header projectPayFees">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>课程缴费信息</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<table class="table table-striped table-hover table-bordered dataTable no-footer">
									<tr id="mainPayFeesTR">
										<th>收费项目</th>
										<th>产品应缴</th>
										<th>实际应缴</th>
										<th>实缴</th>
										<th>支付方式</th>
										<th>欠费</th>
									</tr>
								<tr id="dztr">
									<td>订座费</td>
									<td>0</td>
									<td>0</td>
									<td id="dztd">0</td>
									<td>
									<div class="payment">
										<div class="col-sm-5">
										   <select id="dingzuoS" class="form-control" name="payFrom">
										        <option value="1">现金</option>
										        <option value="2">刷卡</option>
										        <option value="3">支票</option>
										        <option value="4">汇款-微信</option>
										        <option value="5">汇款-支付宝</option>
										        <option value="6">汇款-网络</option>
										        <option value="7">银行转账</option>
										        <option value="8">分期</option>
										    </select>
										</div>
									<div class="col-sm-5">
									     <input id="dingzuoI" onkeyup="dingzuoFees(this);" name="payValue" class="form-control" type="text" placeholder="0">
									     <!--收入或者支出，1收入，2支出  -->
									     <input type="hidden" id="isNeIf" name="isNeIf" class="form-control" type="text" />
									     <!-- <span  class="control-label mandatory">*(如直接报名，可以不填订座费)</span> -->
									 </div>
									<div class="col-sm-2">
									</div>
									</div>
									</td>
									<td>0</td>
								</tr>
								<tbody id="appendPayBody" >
									
								</tbody>
								<tr id="appendPayTr">
									<td colspan="6">
										<div class="form-group col-lg-12 col-md-12 col-sm-12">
		                                    <label class="col-sm-2  no-padding control-label">下次缴费时间</label>
		                                    <div class="input-group col-sm-8 payment-time"> 
		                                        <input name="nextPayTime" id="nextPayTime" class="form-control paymentTime" type="text">
		                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
		                                    </div>
		                                </div>
									</td>
								</tr> 
							</table>
							<!-- <div id="fdfsz" class="well">
								
							</div> -->
						</div>
						
						<div class="well with-header document">
                            <div class="header bordered-blue">
                                <div style="float:left">
                                    <b>资料领取</b>
                                </div>
                                <div style="float:right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                <tbody>
                                <tr>
                                    <th>已发</th>
                                    <th>未领取</th>
                                </tr>
                                <tr>
                                    <td width="40%">
                                        <label class="pull-left padding-left-50"><input value="1" name="jcCk" id="jcCk" type="checkbox" class="form-control comment_disabled"  ><span class="text">教材</span></label>
                                        <label class="pull-right padding-right-50"><input value="1" name="jfCk" id="jfCk" type="checkbox" class="form-control comment_disabled"  ><span class="text">教辅</span></label>
                                    </td>
                                    <td width="60%"><input name="zlContent" id="zlContent" type="text" class="form-control comment_disabled"  ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
						
						<div class="well with-header" style="width: 100%;overflow-x: auto">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>呼入-咨询记录</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<table id="zxjl"  class="table table-striped table-hover td_border dataTable no-footer">
							</table>
						</div>
						
						<div class="well with-header">
                            <div class="header bordered-blue">
                                <div style="float:left">
                                    <b>咨询回访记录</b>
                                </div>
                                <div style="float:right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <table id="hrzx"  class="table table-striped table-hover td_border dataTable no-footer">
                            </table>
                        </div>
						
						<div class="well with-header">
                            <div class="header bordered-blue">
                                <div style="float:left">
                                    <b>上门未报名原因</b>
                                </div>
                                <div style="float:right">
                                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                                </div>
                            </div>
                            <table id="dropFalseWhy" class="table table-striped table-hover td_border dataTable no-footer">
                            </table>
                        </div>
						<div id="fedshure" class="clearfix form-group" style="margin:40px 0px;">
							<div class="col-sm-3  col-xs-3  col-sm-offset-4  col-xs-offset-3">
								<button id="upshirBut" type="button" class="btn btn-primary btn-lg col-sm-6">保存</button>
								<!-- <button id="upshir2" type="submit" class="btn btn-primary btn-lg col-sm-6">保存</button> -->
							</div>
							<div class="col-sm-3 col-xs-3">
								<button type="button" class="btn btn-danger btn-lg col-sm-6" data-dismiss="modal">取消</button>
							</div>
						</div>
					</div>
				<!-- 原始form结束标志 -->
				</form>
				<ul id="ultab2" class="tab_content tab_net tab_content_11 right-toolbar">
                    <li id="upli21" name="upli21"><a href="javascript:void(0);">
                         <img src="${ctx_static}/home/consultcenter/image/phone.png"><i></i>
                        <div class="up"><p onclick="copyPhone('studentPhone3')">拨打电话</p></div>
                    </a>
                    </li>
                    <li id="upli22" name="upli22"><a href="#" data-toggle="modal" data-target=".recordIn"
                           data-backdrop="static">
                           <img src="${ctx_static}/home/consultcenter/image/callback.png"><i></i>
                        <div class="up"><p  class="special">回访记录</p></div>
                    </a>
                    </li>
                    <li id="upli23" name="upli23"><a href="#" data-backdrop="static" data-toggle="modal" data-target=".information">
                    	<img src="${ctx_static}/home/consultcenter/image/note.png"><i></i>
                        <div class="up"><p onclick="sendMsg()">发送短信</p></div>
                    </a>
                    </li>
                    <li id="upli24" name="upli24">
						<a data-toggle="modal" onclick="yanzheng()">
						<img src="${ctx_static}/home/consultcenter/image/subscribe.png"><i></i>
						<div class="up"><p >转为预约</p></div>
						</a>
					</li>
                    <li id="upli25" name="upli25">
                    	<a href="#" data-toggle="modal" data-target=".dropIn"
                           data-backdrop="static">
                           <img src="${ctx_static}/home/consultcenter/image/visit.png"><i></i>
                            <div class="up"><p class="common">转为上门</p></div>
                        </a>
                    </li>
                    <li id="upli26" name="upli26">
	                    <a href="javascript:void(0);" class="apply-btn">
	                    <img src="${ctx_static}/home/consultcenter/image/book.png"><i class="fa-dingzuo"></i>
	                        <div class="up"><p class="common">转为订座</p></div>
	                    </a>
                    </li>
                    <li id="upli27" name="upli27">
	                    <a href="javascript:void(0);" class="apply-btn" >
	                    <img src="${ctx_static}/home/consultcenter/image/apply.png"><i class="fa-baoming"></i>
	                        <div class="up"><p class="common">转为报名</p></div>
	                    </a>
                    </li>
                    <li id="upli28" name="upli28" class="mg_bottom">
                    <a href="javascript:void(0);">
                    	<img src="${ctx_static}/home/consultcenter/image/send-mail.png"><i></i>
                        <div class="up"><p>发送邮件</p></div>
                    </a>
                    </li>
                    <li id="upli29" name="upli29"><a href="javascript:void(0);">
                    	<img src="${ctx_static}/home/consultcenter/image/print.png"><i></i>    
                        <div onclick="dayin()" class="up"><p class="special">打印报表</p></div>
                    </a>
                    </li>
                    <li id="upli210" name="upli210" class="add_jiaofei" data-toggle="modal" data-target=".bs-example-modal-lg4">
                    	<a href="javascript:void(0);">
                          <img src="${ctx_static}/home/consultcenter/image/payment.png"><i></i>    
                    	<div class="up"><p>添加缴费</p></div>
                    	</a>
                    </li>
                 	<li id="upli211" name="upli211">
		                <a href="#" class="strategy-btn" data-toggle="modal" data-target=".strategy"
		                data-backdrop="static">
                          <img src="${ctx_static}/home/consultcenter/image/raiders.png"><i></i>    
                    	<div class="up"><p>查看攻略</p></div>
                    	</a>
	                </li>
	                <li id="upli212" name="upli212" class="add_jiaofei" data-toggle="modal" data-target=".identity-card">
                    	<a href="javascript:void(0);">
                          <img src="${ctx_static}/home/consultcenter/image/assistant.png"><i></i>    
                    	<div class="up"><p>验身份证</p></div>
                    	</a>
                    </li>
	                
	                <%-- <li id="upli211" name="upli211">
	                    <a href="javascript:void(0);" class="apply-btn" >
	                    <img src="${ctx_static}/home/consultcenter/image/operation.png"><i class="fa-addService"></i>
	                        <div class="up"><p class="common">新增服务</p></div>
	                    </a>
                    </li>
	                <li id="upli212" name="upli212">
	                    <a href="javascript:void(0);" class="apply-btn" >
	                    <img src="${ctx_static}/home/consultcenter/image/operation.png"><i class="fa-addProduct"></i>
	                        <div class="up"><p class="common">新增产品</p></div>
	                    </a>
                    </li>
	                <li id="upli213" name="upli213">
	                    <a href="javascript:void(0);" class="apply-btn" >
	                    <img src="${ctx_static}/home/consultcenter/image/operation.png"><i class="fa-buyProduct"></i>
	                        <div class="up"><p class="common">购买产品</p></div>
	                    </a>
                    </li> --%>
                </ul>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
</div>

<!-- 验身份证 -->
<div class="modal fade identity-card in jiaofeil" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">身份证</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal modal_padding">
                <form class="form-horizontal" style="padding:40px 20px">
                    <div class="row">
	            		<div class="form-group col-lg-12 col-md-12 col-sm-12">
	                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">姓名</label>
	                        <div class="col-sm-6">
	                            <input class="form-control comment_disabled" id="personName" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
	                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">出生日期</label>
	                        <div class="col-sm-6">
	                            <input class="form-control comment_disabled" id="birthday" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-6 col-md-6 col-sm-12">
	                        <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">性别</label>
	                        <div class="col-sm-8">
	                            <input class="form-control comment_disabled" id="gender" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-6 col-md-6 col-sm-12">
	                        <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">证件号码</label>
	                        <div class="col-sm-8">
	                            <input class="form-control comment_disabled" id="certNumber" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-6 col-md-6 col-sm-12">
	                        <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">民族</label>
	                        <div class="col-sm-8">
	                            <input class="form-control comment_disabled" id="nation" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-6 col-md-6 col-sm-12">
	                        <label style="margin-left: 0 !important;" class="col-sm-4 control-label no-padding-right">签发机关</label>
	                        <div class="col-sm-8">
	                            <input class="form-control comment_disabled" id="idIssued" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left:-20px">
	                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">住址</label>
	                        <div class="col-sm-10">
	                            <input class="form-control comment_disabled" id="address" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
	                    <div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left:-20px">
	                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">有效期限</label>
	                        <div class="col-sm-10">
	                            <input class="form-control comment_disabled" id="issuedValidDate" readonly="readonly" value="" type="text">
	                        </div>
	                    </div>
            		</div>
					
                    <div  class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-12  col-xs-12  col-sm-offset-3  col-xs-offset-2">
                            <button type="button" id="button_readID" onclick="new Device().startFun()" class="btn btn-primary btn-lg col-sm-6">获取身份证信息</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!--攻略-->
<div class="modal fade strategy in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close " data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">攻略</span>
            </div>
            <div id="gonglueText" class="modal-body  clearfix  form-horizontal" style="height:650px">
				<div class="tabbable">
                     <div class="tab-content">
                         <div id="strategyProfession" class="tab-pane in active">
                             <div class="row_padding form-horizontal clearfix search-condition">
                                     <div class="form-group col-sm-6">
                                         <label class="control-label pull-left">产品模型<span class="control-label mandatory">*</span></label>
                                         <div class="col-sm-9 no-padding-right">
                                             <select id="productModelIdStrategy" name="productModelId"
                                                     class="form-control productModelId chosen-select condition"
                                                     data-placeholder="--请选择--"
                                                     tabindex="-1" data-id="product_model"></select>
                                         </div>
                                     </div> 
                                     <!-- <div class="form-group col-sm-6 pull-right">
                                         <label class="control-label pull-left">项目</label>
                                         <div class="col-sm-9 no-padding-right">
                                             <select id="aiprojectStrategy" name="aiprojectId"
                                                     class="form-control project chosen-select"
                                                     data-placeholder="--请选择--"
                                                     tabindex="-1"></select>
                                         </div>
                                     </div> -->
                                 	<div class="form-group col-sm-6 pull-right">
                                         <label class="control-label pull-left">招生地区</label>
                                         <div class="col-sm-9 no-padding-right">
                                             <select id="addressIdStrategy" name="addressId"
                                                     class="form-control addressId chosen-select"
                                                     data-placeholder="--请选择--"
                                                     tabindex="-1" onchange="clearProductStrategy()"></select>
                                         </div>
                                     </div>
                                     <div class="form-group col-sm-6">
                                         <label class="control-label pull-left">考试地区</label>
                                         <div class="col-sm-9 no-padding-right">
                                             <select id="branchSchoolIdStrategy" name="branchSchoolId"
                                                     class="form-control branchSchoolId chosen-select"
                                                     data-placeholder="--请选择--" 
                                                     tabindex="-1" onchange="clearProductStrategy()"></select>
                                         </div>
                                     </div>
                                     <div class="form-group col-sm-6 pull-right">
                                         <label class="control-label pull-left">考期</label>
                                         <div class="col-sm-9 no-padding-right">
                                             <select id="examTimeIdStrategy" name="examTimeId"
                                                     class="form-control productExamTimeId chosen-select"
                                                     data-placeholder="--请选择--"
                                                     tabindex="-1"></select>
                                         </div>
                                     </div>
                                     <div class="form-group col-sm-6">
                                         <label class="control-label pull-left">产品名称</label>
                                         <div class="col-sm-9 no-padding-right">
                                             <select id="productIdStrategy" name="productId"
                                                     class="form-control productId chosen-select"
                                                     data-placeholder="--请选择--"
                                                     tabindex="-1"></select>
                                         </div>
                                     </div>
                                  <div class="form-group col-sm-6 pull-right">
                                           <label class="control-label pull-left"  style="margin-left: -25px;"></label>
                                           <div class="col-sm-9 no-padding-right">
                                               <button onclick="zytable()" type="button" class="btn increase btn-md col-sm-12 personal-affirm">
                                               	<i class="fa fa-search"></i> 搜索
                                               	</button>
                                           </div>
                                   </div>
                              </div>

                              <div class="table-scrollable tab-content tabs-flat">
                                  <table id="tablezy" class="table table-striped table-hover table-bordered dataTable no-footer">
                                      <thead>
                                      <tr role="row">
                                          <th>招生地区</span>
                                          </th>
                                          <th>产品模型</span>
                                          </th>
                                          <th>产品名称 </span>
                                          </th>
                                          <th>产品考期</span>
                                          </th>
                                          <th>价格 </span>
                                          </th>
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
    </div>
</div>


<!--职业资格攻略查看-->
<div class="modal fade professionView" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="form-group col-sm-12">
                <!-- <label class="control-label pull-left">名称</label> -->
                <div class="col-sm-9 no-padding-right">
                    <input id="brochuresName" name="brochuresName"
                            class="form-control brochuresName"></input>
                </div>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal padding-top-10">
                    <div class="form-group col-sm-12">
                    <textarea class="form-control brochuresDetail" rows="8" id="brochuresDetail"
                              name="brochuresDetail"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 上门  -->
<div id="dropModelDiv" class="modal fade dropIn in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">上门</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal modal_padding">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">上门未报名原因</label>
                        <div class="col-sm-8">
                            <textarea id="dropFalseContent" rows="6" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button onclick="dropFalse()" type="button" class="btn btn-primary form-control">确定</button>
                        </div>
                            <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!-- 回访信息 -->
<div id="recordModelDiv" class="modal fade recordIn in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">回访信息</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal modal_padding">
                    <div class="form-group padding-top-20">
                        <label class="control-label no-padding-right col-md-2 margin-left-50">下次回访时间</label>
                        <div class="col-md-8 col-sm-8">
                            <div class="input-group">
                                <input id="recordNextTime" readonly="readonly" class="form-control subscribeDate" type="text">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                             <label class="control-label no-padding-right col-md-2 margin-left-50">客户成熟度</label>
                             <div class="col-md-8 col-sm-8">
                                  <select  name="studentMaturity" id="studentMaturity" class="form-control" >
                                  	<option selected="selected" value="1">A类</option>
                                  	<option value="2">B类</option>
                                  	<option value="3">C类</option>
                                  	<option value="4">D类</option>
                                  </select>
                             </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label no-padding-right col-md-2 margin-left-50">回访类型</label>
                        <div class="col-md-8 col-sm-8">
                            <!--<div class="input-group">
                                <input class="form-control date-picker" type="text">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>-->
                            <select name="" id="statusEnable" class="form-control">
                                <option value="0">有效</option>
                                <option value="1">无效</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">回访记录</label>
                        <div class="col-sm-8">
                            <textarea id="recordContent" rows="6" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button onclick="addRecord()" type="button" class="btn btn-primary form-control record-btn">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>


<!--缴费信息-报名补费-->
<div class="modal fade bs-example-modal-lg4 in jiaofeil" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">添加缴费</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal modal_padding">
                <form id="payInfo" method="" class="form-horizontal" style="padding:0 20px">
                    <!--该处动态生成缴费内容  -->
                    <div class="rom">
                       <div class="form-group col-lg-8 col-md-8 col-sm-8">
		                                    <label class="col-sm-4  no-padding control-label payment-text">下次缴费时间</label>
		                                    <div class="input-group col-sm-8 payment-time"> 
		                                        <input value=""  id="appendNextPayTime" class="form-control paymentTime comment_disabled" type="text">
		                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
		                                    </div>
		                </div>
                    </div>
					<div id="payForDiv">
                    <div  class="clearfix form-group" style="margin:40px 0px;">
                        <div class="col-sm-4  col-xs-4  col-sm-offset-3  col-xs-offset-2">
                            <button id="jiaofeitrue" onclick="addjiaofei(this)" type="button" class="btn btn-primary btn-lg col-sm-6">确认</button>
                        </div>
                        <div class="col-sm-4 col-xs-4">
                            <button type="button" class="btn btn-danger btn-lg col-sm-6 cancel" data-dismiss="modal">取消
                            </button>
                        </div>

                    </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!--转为预约-->
<div class="modal fade subscribe in" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">转为预约</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal modal_padding">
                <form class="form-horizontal padding-top-20" id="subscribe">
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">预约校区<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <select id="schoolIdModel" name="schoolId" class="form-control">
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">预约时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <input readonly="readonly" type="text" id="subscribeDate" class="form-control subscribeDate" name="subscribeDate">
                        </div>
                    </div>
                     <div class="form-group">
                        <label class="control-label col-sm-3 no-padding-right">预约说明<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8">
                            <textarea  rows="6" id="subscribeExplain" class="form-control subscribeExplain" name="subscribeExplain"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button id="serverPhone1" type="button" class="btn btn-primary form-control yuyuerecord-btn">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!-- 查看回复记录明细 -->
<div class="modal fade zxmx in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">明细</span>
            </div>
            <div id='callInfo' class="modal-body  clearfix  form-horizontal">
                    
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!-- 预约未上门确认 -->
<div class="modal fade bs-example-modal-lgyywsm in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">预约未上门确认</span>
            </div>
             <div class="clearfix form-group" style="margin:40px 0px;">
				<div class="col-sm-12 col-sm-offset-3">
					<input type="hidden" id="yywsmInfoId" />
					<input type="hidden" id="yywsmProductId" />
					<input type="hidden" id="yywsmChildProId" />
					<button onclick="toYGT()" type="button" class="btn btn-primary btn-md col-sm-3 margin-right-20">确认</button>
					<button type="button" class="btn btn-danger btn-md col-sm-3" data-dismiss="modal">取消</button>
				</div>
				
			</div>
			<div class="clearfix form-group" style="margin:40px 0px;">
			</div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!-- 新增待沟通 -->
<div class="modal fade addInquiries" id="addInquiries" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">创建咨询量</span>
            </div>
            <div class="modal-body  clearfix">
                <form class="form-horizontal clearfix" id="inquiries" method="post">
 					<div class="coacheeInfo col-sm-12 no-padding userInfo">
                	<div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">电话<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control phone" name="studentPhone" onblur="studentPhoneSelect()">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">电话归属地<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <input id="addphoneBelong" type="text" name="phoneBelong" class="form-control phoneBelong" placeholder="--请选择--">
                        	 <div id="communicationPhone" class="attribution">
							    <div class="modal-dialog modal-sm">
							        <div class="modal-content">
							            <div class="attribution-body">
							                <div class="form-horizontal">
							                    <div class="form-group">
							                        <label class="control-label col-sm-2 no-padding">省份</label>
							                        <div class="col-sm-10">
							                            <select name="province"  id="addprovince" class="form-control addprovince chosen-select" data-placeholder="--请选择--" tabindex="1"></select>
							                            <input type="hidden" name="phoneProvinceName" id="addPhoneProvinceName" value=""/>
							                        </div>
							                    </div>
							                    <div class="form-group">
							                        <label class="control-label col-sm-2 no-padding">城市</label>
							                        <div class="col-sm-10">
							                            <select name="city" id="addcity" class="form-control addcity chosen-select" data-placeholder="--请选择--" tabindex="1">
							                                <option value="0">--请选择--</option>
							                            </select>
							                            <input type="hidden" name="phoneCityName" id="addPhoneCityName" value=""/>
							                        </div>
							                    </div>
							                    <div class="form-group modal-footer">
							                        <div class="col-sm-2  col-sm-offset-2 clearfix">
							                            <button type="button" class="btn btn-primary btn-sm confirm-btn margin-right-20"  style="position:relative;z-index:99;">确定</button>
							                        </div>
													<div class="col-sm-2">
							                            <button type="button" class="btn btn-danger btn-sm cancel-btn" style="margin-left:35px;">取消</button>
							                        </div>
							                    </div>
							                </div>
							            </div>
							        </div>
							    </div>
							</div>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">姓名<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="studentName">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">性别</label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="studentSex" class="form-control">
                                <option value="0">男</option>
                                <option value="1">女</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">微信</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="weChat">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">年龄</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="age">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">QQ</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="tengXun">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">最高学历</label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="studentAttrId3"  id="studentAttrId3" class="form-control studentAttrId3"></select>
                            <!-- <input id="highestEducationNamePut" name="highestEducation"  type="hidden" /> -->
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">专业</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" name="byZy" class="form-control majorId">
                            </input>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">民族</label>
                        <div class="col-sm-7  no-padding-right">
                            <select class="form-control chosen-select" id="nations" name="nation" data-placeholder="--请选择--" tabindex="1"></select>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">毕业院校</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="bySchool">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">紧急联系人</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="emergencyContact">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-6 no-padding-right contact-way padding-right-5">紧急联系人方式</label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="emergencyContactMode">
                        </div>
                    </div>
                    </div>
                    <div class="infoAscription col-sm-12 no-padding">
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">信息归属地<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7 no-padding-right">
                            <select id="adddepartmentId1" name="departmentId1" class="form-control departmentId1 chosen-select" data-placeholder="--请选择--" tabindex="1">
                            </select>
                            <input type="hidden" name="departmentName1" id="addDepartmentName1" value=""/>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">招生品牌<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="brandId" id="brandId" class="form-control">
                            </select>
                            <input type="hidden" name="brandName" id="addBrandName" value=""/>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">咨询者类型<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="studentAttrId2" id="studentAttrId2" class="form-control studentAttrId2">
                            </select>
                            <input type="hidden" name="studentAttrName2" id="addStudentAttrName2" value=""/>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">媒体来源<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="studentAttrId1" id="studentAttrId1" class="form-control studentAttrId1">
                            </select>
                            <input type="hidden" name="studentAttrName1" id="addStudentAttrName1" value=""/>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">关键词<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <input type="text" class="form-control" name="keyword" id="keyword">
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">客户成熟度</label>
                        <div class="col-sm-7 no-padding-right">
                            <select name="studentMaturity" id="studentMaturity" class="form-control studentMaturity">
                            	<option value="">--请选择--</option>
                            	<option value="1">A</option>
                                <option value="2">B</option>
                                <option value="3">C</option>
                                <option value="4">D</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div class="counselCurriculum col-sm-12 no-padding">
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right">产品模型<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="productModelId" id="addProductModel" data-value="product_model" class="form-control addProductModel chosen-select">
                            </select>
                            <input type="hidden" name="productModelName" class="projectInfoManager" value=""/>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">产品
                        <span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7  no-padding-right">
                            <select name="productId" id="addProductId" class="form-control addProductId">
                            </select>
                            <input type="hidden" name="productName" id="addProductName" value=""/>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-sm-6 margin-left-10">
	                        <label class="control-label pull-left" style="">期待回访日期<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-8">
	                            <input class="form-control recordnexttime" name="recordNextTime" type="text">
	                        </div>
	                </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">备注</label>
                        <div class="col-md-9 col-sm-9">
                            <input type="text" class="form-control notes" name="notes" id="notes">
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话页面链接</label>
                        <div class="pull-left col-md-9 col-sm-9">
                            <input type="text" class="form-control" name="pageUrl">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话记录<span id="talk"> </span></label>
                        <div class="col-sm-10">
                        
                           <!-- 富文本编辑器 -->
						  <textarea name="content" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
                    	<script>
                    		var conversation ;
                    		
	                    	$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
	                    		KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
	                    		/* editor = KindEditor.create('textarea[name="content"]',{ */
	                    		conversation = KindEditor.create('textarea[name="content"]',{
	                    			uploadJson:'${ctx }/file/uploadFile',
	                    			resizeType:0,
	                    			afterBlur: function(){
	                    				this.sync();
	                    			}
	                    		});
	                    	});
                    	</script>
                    </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control creation-btn">创建
                            </button>
                        </div>
                         <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
                            </button>
                        </div>
                    </div>
                    
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--短信-->
<div class="modal fade information in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">短信</span>
                <input id="msgHidJson" type="hidden" />
            </div>
            <div class="modal-body  clearfix  form-horizontal">
                <form class="form-horizontal padding-top-20">
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">校区</label>
                        <div class="col-md-10 col-sm-10">
                        	<select id="schoolIdModelMsg" name="" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">手机号码</label>
                        <div class="col-md-8 col-sm-8 padding-left-20 no-padding-right">
                            <input id="studentPhoneMsg" type="text" class="form-control">
                            <input id="studentPhoneMsgHid" type="hidden" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="control-label no-padding-right col-md-4">短信模板</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select onchange="msgTypeChange(this)" id="msgType" name="" class="form-control">
                            	<option value="">-请选择-</option>
                                <option value="您好！我是学慧网的${user.realName }老师，今天对您咨询的{class}方面的课程进行了电话回复，但由于您没有接听到电话，很抱歉未能及时给您提供帮助与解答，我的联系电话是${user.mobile }，您方便的话可以随时联系我，或者根据给您发送的分校路径信息直接到校区咨询，以方便您及时了解相关报考和学习信息，学习像呼吸一样自然！">跟访</option>
                                <option value="学员您好，我是之前和您联系的${user.realName }老师，如果您对我们的{class}课程任何疑问，可以到我们校区{address}或随时拨打我的联系方式：${user.mobile }。">指路</option>
                                <option value="您好，我是昨天给您联系的${user.realName }老师，我给您预约的{recriveTime}到我们校区具体了解，您到时记得过来，如果找不着的话给我打电话就可以，到时候我给您指路，最后祝您工作生活愉快。">联系</option>
                                <option value="您好，我是刚和您联系的${user.realName }老师，我们的校区地址：{address}。帮您预约的是{recriveTime}来分校，我们安排了相关的校区老师接待您，请您注意时间安排。如有变动，请提前联系我${user.mobile }。 ">联系</option>
                                <option value="学员您好，我是之前和您联系的${user.realName }老师，如果您对我们的{class}课程有任何疑问，可以到我们校区{address}，或随时拨打我的联系方式：${user.mobile }。加：QQ：${user.qq }，微信：${user.wechat }与我沟通">沟通</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">短信内容</label>
                        <div class="col-md-10 col-sm-10">
                            <textarea id="showMsg" rows="6" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button onclick="msgSubmit()" type="button" class="btn btn-primary form-control">确定</button>
                        </div>
                          <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!-- 报名 -->
<div class="modal fade bs-example-modal-lga in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false"  id="viewInfo" data-backdrop="static"> <!-- data-backdrop="static" -->
    <div class="modal-dialog modal-lg">
        <div class="modal-content" id="baoMingDialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">报名</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal modal_padding">
                <table class="table table_border text-center" id="headInfo">
                	<tr>
						<td>咨询分校：<span id="departmentName12_baoMing"></span> </td>
						<td>品牌：<span id="brandName2_baoMing"></span></td>
						<td>咨询者类型：<span id="studentAttrName22_baoMing"></span></td>
						<td>媒体类源：<span id="studentAttrName12_baoMing"></span></td>
						<td>客户成熟度：<span id="studentMaturity2_baoMing"></span></td>
					</tr>
                </table>
                <div class="widget-main clearfix" style="padding:10px">
                <div class="tabbable">
                     <ul class="nav nav-tabs tabs-flat">
                         <li class="active">
                             <a data-toggle="tab" href="#personal" aria-expanded="true">
                               	个人信息
                             </a>
                         </li>
                         <li class="">
                             <a data-toggle="tab" href="#serve" aria-expanded="false">
                                 	服务信息
                             </a>
                         </li>
                     </ul>
                     <div class="tab-content tabs-flat" style="background:#ffffff">
                         <div id="personal" class="tab-pane active">
                             
                             <form id="updateInfoManage" method="" class="form-horizontal" style="padding:0 20px">
											<input id="studentInfoManageIdHidden" type="hidden"/>
											<input type="hidden" id="hidChoosePrint" >
											    <div class="col-lg-12 col-sm-12 col-xs-12">
											                                         
											        <div class="well with-header">
											            <div class="header bordered-blue">
											                <div style="float:left">
											                    <b>学员-个人信息</b>
											                </div>
											                <div style="float:right">
											                    <!--<a href="javascript:void(0);" class="btn btn-info btn-xs btn_special_edit"><i
											                            class="fa fa-edit"></i> 编辑</a>-->
											                    <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
											                </div>
											            </div>
											            
											            <div class="row form-group-margin gt_content" id="personInfo">
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
											                    <div class="col-sm-9 col-lg-9">
											                        <input type="text" class="form-control comment_disabled" value=""
											                         id="studentName"      disabled="disabled">
											                    </div>
											                </div>
											
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right">性别</label>
											                    <div class="col-sm-9">
											                        <select class="form-control comment_disabled" disabled="disabled" id="stuSex">
											                            <option value="0">男</option>
											                            <option value="1">女</option>
											                        </select>
											                    </div>
											                </div>
											
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right">年龄</label>
											                    <div class="col-sm-9">
											                        <input type="text" class="form-control comment_disabled" value="" id="stuAge"
											                               disabled="disabled">
											                    </div>
											                </div>
											
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right">手机</label>
											                    <div class="col-sm-9">
											                        <input type="text" class="form-control comment_disabled" value="" id="stuPhone"
											                               disabled="disabled">
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right">邮箱</label>
											                    <div class="col-sm-9">
											                        <input type="email" class="form-control comment_disabled" value="" id="stuEmail"
											                               disabled="disabled">
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
											                    <div class="col-sm-9">
											                        <select class="form-control comment_disabled" disabled="disabled" id="stuLocaiton">
											                            <option value="0">北京</option>
											                            <option value="1">天津</option>
											                            <option value="0">上海</option>
											                            <option value="1">山西</option>
											                        </select>
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right">微信</label>
											                    <div class="col-sm-9">
											                        <input type="text" class="form-control comment_disabled" value="" id="stuWeChat"
											                               disabled="disabled">
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-3 control-label no-padding-right">QQ</label>
											                    <div class="col-sm-9">
											                        <input type="text" class="form-control comment_disabled" value="" id="stuQQ"
											                               disabled="disabled">
											                    </div>
											                </div>
											
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-5 control-label no-padding-right no-padding-left"
											                           style="margin-left:-41px">其他联系方式</label>
											                            <div class="col-sm-9">
											                                <input type="text" class="form-control comment_disabled" disabled="disabled" id="stuOtherPhone">
											                            </div>
											                        </div>
											
											<div class="form-group col-lg-4 col-md-4 col-sm-6">
												<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件类型</label>
											                    <div class="col-sm-9">
											                       <select name="stuCardType" id="idcardType1" disabled="disabled" class="form-control comment_disabled">
											                            <option value="">身份证</option>
											                            <option value="">护照</option>
											                       </select>
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                	<label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">证件号码</label>
											                            <div class="col-sm-9">
											                               <input type="text" name="" id="stuCard"
											                                       class="form-control comment_disabled padding-right-5 padding-left-10"
											                                       disabled="disabled">
											                            </div>
											                        </div>
											
											<div class="form-group col-lg-4 col-md-4 col-sm-6">
											                            <label class="col-sm-3 control-label no-padding-right no-padding-left">民族</label>
											                            <div class="col-sm-9">
											                               <input type="text" name="nation" id="stuNation"
											                                       class="form-control comment_disabled padding-right-5 padding-left-10"
											                                       disabled="disabled">
											                            </div>
											                        </div>
											                        <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                            <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">毕业院校</label>
											                    <div class="col-sm-9">
											                        <input type="text" name="bySchool" id="stuBySchool"
											                               class="form-control comment_disabled padding-right-5 padding-left-10"
											                               disabled="disabled">
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-4 control-label no-padding-right no-padding-left" style="margin-left:-20px">最高学历</label>
											                    <div class="col-sm-9">
											                        <select name="studentAttrName3" id="stuStudentAttrName32" disabled="disabled" class="form-control comment_disabled" ></select>
											                    </div>
											                </div>
											                 <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">所学专业</label>
											                    <div class="col-sm-9">
											                        <input type="text" name="byZy" id="stubByZy"
											                               class="form-control comment_disabled padding-right-5 padding-left-10"
											                               disabled="disabled">
											                    </div>
											                </div>
											                 <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">紧急联系人</label>
											                    <div class="col-sm-9">
											                         <input type="text" name="emergencyContact" id="stuEmergencyContact"
											                               class="form-control comment_disabled padding-right-5 padding-left-10"
											                               disabled="disabled">
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">联系方式</label>
											                    <div class="col-sm-9">
											                        <input type="text" name="emergencyContactMode" id="stuEmergencyContactMode"
											                               class="form-control comment_disabled padding-right-5 padding-left-10"
											                               disabled="disabled">
											                    </div>
											                </div>
											                <div class="form-group col-lg-4 col-md-4 col-sm-6">
											                    <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">信息量归属</label>
											                    <div class="col-sm-9">
											                        <input type="text" name="departmentName1" id="departmentName1"
											                               class="form-control comment_disabled padding-right-5 padding-left-10"
											                               disabled="disabled">
											                    </div>
											                </div>
											
											                <div class="form-group col-lg-10 col-md-12 col-sm-12">
											                    <label style="margin-left: -48px !important;"
											                           class="col-sm-2 control-label no-padding-right">通讯地址</label>
											                    <div class="col-sm-9">
											                        <input class="form-control comment_disabled" value="" type="text" id="stuPhoneAddress"
											                               disabled="disabled">
											                    </div>
											                </div>
											
											                <div class="form-group col-lg-10 col-md-12 col-sm-12">
											                    <label style="margin-left: -48px !important;"
											                           class="col-sm-2 control-label no-padding-right">工作地址</label>
											                    <div class="col-sm-9">
											                        <input type="text" class="form-control comment_disabled" value=""  id="stuWorkSpace"
											                               disabled="disabled">
											                    </div>
											                </div>
											            </div>
											        </div>
											<!-- 课程信息展示 -->
											<div class="well with-header project3">
												<div class="header bordered-blue">
													<div style="float:left">
												<b>课程信息</b>
											</div>
											<div style="float:right">
											<a href="#" onclick="initAddWin(this)" id="initAddWin" data-record="" class="btn btn-info btn-xs tagAdd" data-toggle="modal" data-backdrop="static" data-target="#addProWin">
											                    	<i class="fa fa-plus-square-o" style="margin-right:5px;"></i>添加
											                             </a>
													<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
												</div>
											</div>
											<div class="row form-group-margin">
												<!-- <h5 class="row-title" data-toggle="modal" data-target=".product-data" style="margin-left:20px;cursor:pointer">
												<i class="fa fa-tags blue"></i>
												<span>产品001</span>
											</h5>
											<h5 class="row-title" data-toggle="modal" data-target=".product-data" style="margin-left:20px;cursor:pointer">
												<i class="fa fa-tags blue"></i>
												<span>产品002</span>
											</h5> -->
											<h5 class="row-title" data-toggle="modal" data-target=".product-data" style="margin-left:20px;cursor:pointer">
												<i class="fa fa-cube blue"></i>
												<span>主产品001</span>
											</h5>
											<h5 class="row-title" data-toggle="modal" data-target=".product-data" style="margin-left:20px;cursor:pointer">
														<i class="fa fa-cubes blue"></i>
														<span>子产品002</span>
													</h5>
												</div>
											</div>
											
											 <div class="well with-header">
							                      <div class="header bordered-blue">
							                          <div style="float:left">
							                    <b>客户标签</b>
							                </div>
							                <div style="float:right">
							                    <!-- <a href="#" class="btn btn-info btn-xs btn_special_edit"><i
							                            class="fa fa-edit"></i> 编辑</a> -->
							                              <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
							                          </div>
							                      </div>
							                      <div class="row form-group-margin gt_content">
							                          <div class="tagBM"></div>
							                      </div>
							                  </div>
							                 
							                  </div>
											</form>
                                       
            								</div>
            
                  <div id="serve" class="tab-pane">
                      
                       <div class="well with-header" id="projectBefore">
               <div class="header bordered-blue">
                   <div style="float:left">
             <b>呼入-咨询记录</b>
         </div>
         <div style="float:right">
             <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
         </div>
     </div>
     <table class="table table-striped table-hover td_border dataTable no-footer" id="callInfo2">
     </table>
 </div>
 <div class="well with-header">
     <div class="header bordered-blue">
         <div style="float:left">
             <b>咨询-回访记录</b>
         </div>
         <div style="float:right">
             <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
         </div>
     </div>
     <table class="table table-striped table-hover td_border dataTable no-footer" id="callBackInfo">
        
     </table>
 </div>
            
         </div>
     </div>
	                           
               </div> 
                       
                    </div>
                
                <ul  class="tab_content tab_net tab_content_11  right-toolbar">
                    <li id="upli21" name="upli21" ><a href="javascript:void(0);">
                         <img src="${ctx_static}/home/consultcenter/image/phone.png"><i></i>
                        <div class="up"><p onclick="copyPhone()">拨打电话</p></div>
                    </a>
                    </li>
                    <li id="upli22" name="upli22"><a href="#" data-toggle="modal" data-target=".recordIn"
                           data-backdrop="static">
                           <img src="${ctx_static}/home/consultcenter/image/callback.png"><i></i>
                        <div class="up"><p  class="special">回访记录</p></div>
                    </a>
                    </li>
                    <li id="upli23" name="upli23"><a href="#" data-backdrop="static" data-toggle="modal" data-target=".information">
                    	<img src="${ctx_static}/home/consultcenter/image/note.png"><i></i>
                        <div class="up"><p onclick="sendMsg()">发送短信</p></div>
                    </a>
                    </li>
                    <li id="upli28" name="upli28" class="mg_bottom">
                    <a href="javascript:void(0);">
                    	<img src="${ctx_static}/home/consultcenter/image/send-mail.png"><i></i>
                        <div class="up"><p>发送邮件</p></div>
                    </a>
                    </li>
                    <li id="upli29" name="upli29" class="print" data-toggle="modal" data-target=".entryFormModel">
                    <a href="javascript:void(0);">
                    	<img src="${ctx_static}/home/consultcenter/image/print.png"><i></i>    
                        <div onclick="dayin()" class="up"><p class="special">打印报表</p></div>
                    </a>
                    </li>
                    <li id="upli210" name="upli210" class="add_jiaofei" data-toggle="modal" data-target=".bs-example-modal-lg4">
                    	<a href="javascript:void(0);">
                          <img src="${ctx_static}/home/consultcenter/image/payment.png"><i></i>    
                    	<div class="up"><p>添加缴费</p></div>
                    	</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--产品详情-->
<div class="modal fade product-data in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">关闭</span>
                </button>
                <span class="widget-caption">产品详情</span>
            </div>
            <div class="modal-body">
            <form method="" id="addServiceFees" class="form-horizontal" style="padding:0 20px">
				<div class="well with-header project3">
					<div class="header bordered-blue">
						<div style="float:left">
							<b>课程信息</b>
						</div>
						<div style="float:right">
							<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
						</div>
					</div>
					<div class="row form-group-margin">
						<div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品类型
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="productModelId" id="product_model2" data-id="product_model" class="form-control productModelId chosen-select">
	                            </select>
	                        </div>
	                    </div>
						<div class="form-group col-lg-4 col-md-4 col-sm-6">
							<label class="col-sm-3 control-label no-padding-right">产品<span class="control-label mandatory">*</span></label>
							<div class="col-sm-9">
								<select id="productId2" class="productId" name="productId" data-placeholder="--请选择--"  class="form-control chosen-select">
									
								</select>
							</div>
						</div>
						<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                  <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">收款方</label>
                                  <div class="col-sm-9 no-padding-right">
                                      <select id="payee2" name="payee" class="form-control chosen-select">
                                      
                                      </select>
                                  </div>
                              </div>
							<div class="form-group col-lg-4 col-md-4 col-sm-6">
                                  <label class="col-sm-3 control-label no-padding-right">考期</label>
                                  <div class="col-sm-9">
                                      <select id="kTime2" name="kTime" class="form-control chosen-select">
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group col-lg-4 col-md-4 col-sm-6">
                                  <label class="col-sm-5 control-label no-padding-right" style="margin-left:-41px">考试地区</label>
                                  <div class="col-sm-9 no-padding-right">
                                      <select id="branchSchoolId2" name="branchSchoolId" class="form-control chosen-select" >
                                      
                                      </select>
                                  </div>
                              </div>
						<div class="clearfix form-group">
							<div class="pull-right padding-right-20">
								<!-- <button onclick="secondButton(this)" type="button" class="btn btn-blue btn-md col-sm-12 course-affirm">校验</button> -->
							</div>
						</div>
					</div>
				</div>

                      <div class="well with-header projectPayFees3">
                          <div class="header bordered-blue">
                              <div style="float:left">
                                  <b>课程缴费信息</b>
                              </div>
                              <div style="float:right">
                                  <span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
                              </div>
                          </div>
                          <table class="table table-striped table-hover table-bordered dataTable no-footer">
						<tr id="baoMingFeeTR">
							<th>收费项目</th>
							<th>产品应缴</th>
							<th>实际应缴</th>
							<th>实缴</th>
							<th>支付方式</th>
							<th>欠费</th>
						</tr>
						<tr id="dztr2">
							<td>订座费</td>
							<td>0</td>
							<td>0</td>
							<td id="dztd2">0</td>
							<td>
							<div class="payment">
								<div class="col-sm-4">
								   <select id="dingzuoS2" class="form-control" name="payFrom" disabled>
								        <option value="1">现金</option>
								        <option value="2">刷卡</option>
								        <option value="3">支票</option>
								        <option value="4">汇款-微信</option>
								        <option value="5">汇款-支付宝</option>
								        <option value="6">汇款-网络</option>
								        <option value="7">银行转账</option>
								        <option value="8">分期</option>
								    </select>
								</div>
							<div class="col-sm-5">
							     <input id="dingzuoI2" name="payValue" disabled class="form-control" type="text" placeholder="0">
							     <!-- <span  class="control-label mandatory">*(如直接报名，可以不填订座费)</span> -->
							 </div>
							<div class="col-sm-3">
							</div>
							</div>
							</td>
							<td>0</td>
						</tr>
						<tbody id="coursePayInfo" >
						</tbody>
						<tr id="coursePayTr">
							<td colspan="6">
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label class="col-sm-2  no-padding control-label">下次缴费时间</label>
                                    <div class="input-group col-sm-8 payment-time"> 
                                        <input name="nextPayTime" id="nextPayTime2" onblur="removeModal()" class="form-control paymentTime" type="text">
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
							</td>
						</tr>
					</table>
            	</div>
            	<div class="clearfix form-group margin-top-10">
                    <div class="col-sm-3  col-xs-3 col-sm-offset-4">
                        <button type="submit" class="btn btn-primary col-sm-6">确认</button>
                    </div>
                     <div class="col-sm-3 col-xs-3 ">
                       <button type="button" class="btn btn-danger col-sm-6 cancel" data-dismiss="modal">取消
                       </button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>

<!---客户标签tree-->
<div  class="modal fade customer in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false"
     data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf gl_close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">标签种类</span>
            </div>
            <div class="modal-body  clearfix  form-horizontal">
                <ul id="customerTree" class="ztree" ></ul>
                <div class="clearfix form-group margin-top-10">
                    <div class="col-sm-3  col-xs-3 col-sm-offset-4">
                        <button type="button" class="btn btn-primary col-sm-6 countersign">确认</button>
                    </div>
                     <div class="col-sm-3 col-xs-3 ">
                       <button type="button" class="btn btn-danger col-sm-6 cancel" data-dismiss="modal">取消
                       </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>

<!---报名状态添加产品弹框-课程信息部分-->
<div class="modal fade addProWin in" id="addProWin" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static"> 
    <div class="modal-dialog modal-lg" style="margin:50px auto">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增产品-课程信息选择</span>
            </div>
            <div class="modal-body clearfix form-horizontal modal_padding">
                <form id="updateInfoManageCTB" method="" class="form-horizontal clearfix" style="padding:0 20px">
                <!-- <form method="" class="form-horizontal" style="padding:0 20px"> -->
						<div class="col-sm-12 no-padding" style="margin-top:20px">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">信息归属地<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="departmentId1" class="form-control departmentId1 chosen-select" data-placeholder="--请选择--" tabindex="1">
	                            </select>
	                            <input type="hidden" name="departmentName1" value="" class="projectInfoManager"/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">招生品牌<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <select name="brandId" class="form-control brandId">
	                            </select>
	                            <input type="hidden" name="brandName" value="" class="projectInfoManager"/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">咨询者类型<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <select name="studentAttrId2" class="form-control studentAttrId2">
	                            </select>
	                            <input type="hidden" name="studentAttrName2" value="" class="projectInfoManager"/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">媒体来源<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <select name="studentAttrId1" class="form-control studentAttrId1">
	                            </select>
	                            <input type="hidden" name="studentAttrName1" value="" class="projectInfoManager"/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">关键词<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <input type="text" class="form-control keyword" name="keyword">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">归属校区<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <select class="form-control schoolId" name="schoolId">
	                            </select>
	                            <input type="hidden" name="schoolName" class="projectInfoManager"/>
	                        </div>
	                    </div>
	                    </div>
						<div class="addProInfoCTB col-sm-12 no-padding">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品模型<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="productModelId" data-value="product_model" class="form-control productModel chosen-select">
	                            </select>
	                            <input type="hidden" name="productModelName" class="projectInfoManager" value=""/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">产品
	                        <span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <select name="productId" class="form-control productId">
	                            </select>
	                            <input type="hidden" name="productName" value="" class="projectInfoManager"/>
	                        </div>
	                    </div>
	                    </div>
						</form>
						
						<div class="col-sm-12 modal-footer no-margin-left">
	                        <div class="col-sm-2  col-sm-offset-4">
	                            <button type="button" onclick="submitProInfo()" class="btn btn-primary form-control creation-btn" data-toggle="modal"
	                                    data-backdrop="static">下一步
	                            </button>
	                        </div>
	                        <div class="col-sm-2">
	                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
	                            </button>
	                        </div>
                        </div>
						 </div>
                        
                    </div>
            </div>
        </div>


<!--报名部分，添加产品弹框-缴费部分  -->
<div class="modal fade addProWin2 in" id="addProWin2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static"> 
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增产品-缴费信息填写</span>
            </div>
            <div class="modal-body clearfix form-horizontal modal_padding">
                <form id="addProjectForm" method="" class="form-horizontal form" style="padding:0 20px">
                <!-- <form method="" class="form-horizontal" style="padding:0 20px"> -->
						<div class="well with-header addProject" id="addProject">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>课程信息</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<div class="row form-group-margin">
								<div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">产品模型
									<span class="control-label mandatory">*</span></label>
			                        <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">
			                            <select id="productModelIdCTB" onchange="baoModelChange(this)" data-id="product_model" class="form-control productModel productInfo chosen-select" disabled>
					                    </select>                                                                                                                     
					                    <!-- <input name="productModelName" type="hidden" class="projectInfoManager"/> -->
			                        </div>
			                    </div>
								<div class="form-group col-lg-4 col-md-4 col-sm-4">
									<label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">产品</label>
									<div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">
										<select id="productIdCTB" onchange="baoProductChange(this)" class="form-control chosen-select product" disabled>   
					 				    </select>                                                                                                                       
					                    <!-- <input name="productName" type="hidden" class="projectInfoManager"/> -->
									</div>
								</div>
 								<div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">收款方</label>
                                    <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">
                                        <select name="payee" id="payeeCTB" class="form-control payee chosen-select">                                                          
					                    </select>
                                    </div>
                                </div>
 								<div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">考期</label>
                                    <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">
                                        <select name="kTime" id="kTimeCTB" onchange="baokTimeChange(this)" class="form-control kTime chosen-select">                                                          
					                    </select>                                                                                                                     
					                    <input name="kTimeValue" type="hidden" class="projectInfoManager"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">考试地区</label>
                                    <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">
                                        <select name="branchSchoolId" id="branchSchoolIdCTB" onchange="branchSchoolChangeCTB(this)" class="form-control branchSchool chosen-select" >                                       
					                    </select>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-md-4 col-sm-4">
                                    <label class="col-sm-4 col-md-4 col-lg-4 control-label no-padding-right" style="margin-left:-41px">报名方式</label>
                                    <div class="col-sm-9 col-md-9 col-lg-9 no-padding-right">
                                        <select name="infoType" class="form-control chosen-select infoType">
                                        	<option value="0" selected>正常</option>
                                        	<option value="1">分期</option>
                                        </select>
                                    </div>
                                </div>
								<div class="clearfix form-group">
							<div class="pull-right padding-right-20">
								<!-- <button onclick="secondButton(this)" type="button" class="btn btn-blue btn-md col-sm-12 course-affirm">校验</button> -->
							</div>
						</div>
							</div>
						</div>
						
						<div class="well with-header addPayFees" id="addPayFees">
							<div class="header bordered-blue">
								<div style="float:left">
									<b>课程缴费信息</b>
								</div>
								<div style="float:right">
									<span class="collapse-btn"><i class="fa fa-angle-down"></i></span>
								</div>
							</div>
							<table class="table table-striped table-hover table-bordered dataTable no-footer">
									<tr>
										<th>收费项目</th>
										<th>产品应缴</th>
										<th>实际应缴</th>
										<th>实缴</th>
										<th>支付方式</th>
										<th>欠费</th>
									</tr>
								<tbody class="addPayInfo" id="addPayInfo">
									
								</tbody>
								<tr class="addPayTr" id="addPayTr">
									<td colspan="6">
										<div class="form-group col-lg-12 col-md-12 col-sm-12">
		                                    <label class="col-sm-2  no-padding control-label">下次缴费时间</label>
		                                    <div class="input-group col-sm-8 payment-time"> 
		                                        <input name="nextPayTime" id="nextPayTimeCTB" onblur="removeModal()" class="form-control paymentTime" type="text">
		                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
		                                    </div>
		                                </div>
									</td>
								</tr> 
							</table>
							<div class="well">
								
							</div>
						</div>
						</form>
                        <div class="col-sm-12 modal-footer no-margin-left">
	                        <div class="col-sm-2  col-sm-offset-4">
	                            <button type="button" onclick="submitAddInfo()" class="btn btn-primary form-control creation-btn" data-toggle="modal"
	                                    data-backdrop="static">确定
	                            </button>
	                        </div>
	                        <div class="col-sm-2">
	                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消
	                            </button>
	                        </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

<!-- 打印报名表 -->
<div class="modal fade entryFormModel" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">报名表格式</span>
            </div>
            <div class="modal-body clearfix">
               	<div class="entryForm col-md-12">
               		<div class="entryForm-title">
	                     <div class="col-md-4 logobox padding-left-30 padding-top-10 padding-bottom-10">
	                              <img src="${ctx_static }/home/consultcenter/image/logo-sm.png" alt="">
	                          </div>
	                          <div class="col-md-4 text-center margin-bottom-10">
	                              <h3>学员信息表</h3>
	                          </div>
	                      </div>
                	</div>
                	<div class="entryForm-body">
                		   <table class="table table-bordered text-center">
                                    <tbody>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" style="background:#ddd">个人信息</td>
                                    </tr>
                                    <tr>
                                        <td width="12.5%">学员姓名</td>
                                        <td width="12.5%"></td>
                                        <td width="12.5%">性别</td>
                                        <td width="12.5%"></td>
                                        <td width="12.5%">证件类型</td>
                                        <td width="12.5%"></td>
                                        <td width="12.5%">证件号码</td>
                                        <td width="12.5%"></td>
                                    </tr>
                                    <tr>
                                        <td>教育程度</td>
                                        <td></td>
                                        <td>专业</td>
                                        <td></td>
                                        <td>民族</td>
                                        <td></td>
                                        <td>Email</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>手机</td>
                                        <td></td>
                                        <td>QQ号</td>
                                        <td></td>
                                        <td>工作单位</td>
                                        <td colspan="3"></td>
                                    </tr>
                                    <tr>
                                        <td>通讯地址</td>
                                        <td colspan="3"></td>
                                        <td>紧急联系人</td>
                                        <td></td>
                                        <td>联系方式</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">已提交资料</td>
                                        <td colspan="6">
                                            <label><input type="checkbox"><span class="text">照片</span></label>
                                            <label><input type="checkbox"><span class="text">身份证</span></label>
                                            <label><input type="checkbox"><span class="text">学历证书</span></label>
                                            <label><input type="checkbox"><span class="text">上一级别证书</span></label>
                                            <label><span class="text">其他</span><span style="text-decoration:underline">　　　　　</span></label>
                                        </td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" style="background:#ddd">课程信息</td>
                                    </tr>
                                    <tr>
                                        <td>类型</td>
                                        <td></td>
                                        <td>项目</td>
                                        <td></td>
                                        <td>级别</td>
                                        <td></td>
                                        <td>授课形式</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>考期</td>
                                        <td></td>
                                        <td>考试地域</td>
                                        <td></td>
                                        <td>班型</td>
                                        <td></td>
                                        <td>班号</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">主考院校（*仅限自考项目填写）</td>
                                        <td colspan="2"></td>
                                        <td colspan="2">报考专业（*仅限自考项目填写）</td>
                                        <td colspan="2"></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" style="background:#ddd">缴费信息</td>
                                    </tr>
                                    <tr>
                                        <td>收费项目</td>
                                        <td colspan="2">应缴</td>
                                        <td colspan="2">实缴</td>
                                        <td colspan="2">支付方式</td>
                                        <td>欠费</td>
                                    </tr>
                                    <tr>
                                        <td>培训费</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>协议费</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>服务费（D）</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>教材费（D）</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>资料费（D）</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>考务费（D）</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>总额</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" style="background:#ddd">资料领取</td>
                                    </tr>
                                    <tr>
                                        <td>教材</td>
                                        <td></td>
                                        <td>教辅</td>
                                        <td></td>
                                        <td>未领取</td>
                                        <td colspan="3"></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" style="background:#ddd">学习中心</td>
                                    </tr>
                                    <tr>
                                        <td>用户名</td>
                                        <td></td>
                                        <td>初始密码</td>
                                        <td colspan="2"></td>
                                        <td>网址</td>
                                        <td colspan="2"></td>
                                    </tr>
                                    <tr style="height:150px">
                                        <td>说明</td>
                                        <td colspan="7"></td>
                                    </tr>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" style="background:#ddd">培训项目服务协议</td>
                                    </tr>
                                    <tr style="border:none">
                                        <td colspan="3" style="border:none;padding-left:47px;text-align:left;">甲方：北京学慧网教育科技有限公司 </td>
                                        <td colspan="3" style="border:none"></td>
                                        <td colspan="2" class="pull-left" style="border:none">乙方：</td>
                                    </tr>
                                    <tr style="border:none" class="text-left">
                                        <td colspan="8" style="border:none;padding-left:47px;padding-right:47px">
                                            <p>按照中华人民共和国《合同法》等相关法律规定，甲乙双方自愿签署本服务协议，各自履行该协议约定的义务，承担相应责任并取得对等权利，该协议为有偿服务协议。</p>
                                            <p>甲方按照上述课程信息为学员提供培训服务，收取培训费、协议费、服务费并代收资料费、教材费及考务费等各项费用。</p>
                                            <p>乙方确保提供的个人信息真实有效。按照官方报名要求及时缴纳考试报名费用及报名资料。详情细则见背面协议附件内容。</p>
                                            <p>甲乙双方已阅读该协议及附件细则并知晓双方权利义务。</p>
                                            <p>本协议由乙方自报名即生效。如由他人代签请注明代签字样，甲方依然认可本协议约定内容；如果存在代签而未注明的，甲方有权拒绝履行协议并不予退费，相关责任由乙方自负。</p>
                                            <p>本协议一式三份，乙方保留一份，甲方保留两份。该协议将作为甲方收取乙方费用的唯一凭证，请妥善保管。发生争议，双方协商无果可起诉至乙方所在地法院。</p>
                                            <p style="margin-left:80px;margin-top:60px">本协议内容除签名外，其他手写无效。</p>
                                        </td>
                                    </tr>
                                    <tr style="border:none;position:relative;">
                                        <td colspan="3" style="border:none;padding-left:47px;text-align:left;margin-bottom:40px">甲方：北京学慧网教育科技有限公司 </td>
                                        <td colspan="3" style="border:none"></td>
                                        <td colspan="2" class="pull-left" style="border:none;position:relative;margin-bottom:40px">乙方（签字）：
                                        	<div class="nameImg-box" style="width:100px;height:50px;position:absolute;right:-80px;top:0">
                                        		<img src="" id="imgs" style="width:100%;height:100%" />
                                        	</div>
                                        </td>
                                    </tr>
                                    
                                    </tbody>
                                </table>
                		
                	</div>
            </div>
            <div class="modal-footer">
                <div class="col-sm-2 col-sm-offset-4">
                    <button type="submit" class="btn btn-primary form-control edit-button">确定</button>
                </div>
                <div class="col-sm-2">
                    <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                </div>
            </div>

            

        </div>
    </div>
</div>


<script type="text/javascript">
$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
	KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
	editor = KindEditor.create('textarea[name="content"]',{
		uploadJson:'${ctx }/file/uploadFile',
		resizeType:0,
		afterBlur: function(){
			this.sync();
		}
	});
});


var infoDisDep = "${dep}";
var infoDisType = "${type}";
var sessScope = "${sessionScope}";

//工作台自适应宽

$('.task-down').click(function(){
	$('#left-box').css('width','95%');
	$('#right-box').css('width','5%');
	$('.task-h6').css('display','none');
	$('.task-down').css('display','none');
	$('.task-left').css('display','block');
})

$('.task-left').click(function(){
	$('#left-box').css('width','85%');
	$('#right-box').css('width','15%');
	$('.task-h6').css('display','block');
	$('.task-down').css('display','block');
	$('.task-left').css('display','none');
})

$('.table-scrollable33').on('click','.dataTables_paginate .pagination li a',function(){
	$('.master3').attr('checked',false);
})
</script>
<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>

<!--攻略相关功能  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_strategy.js?v=<%=Math.random() %>"></script>
<!--子产品课程信息回显  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_projectInfoC.js?v=<%=Math.random() %>"></script>
<!--公共弹框-课程信息部分动态回显  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_projectInfo.js?v=<%=Math.random() %>"></script>
<!--公共弹框-课程信息部分动态回显(报名模块专用)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_projectInfoS.js?v=<%=Math.random() %>"></script>
<!--缴费(只适用于子产品，除订座费，报名费外其它状态所有动态生成费用)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_payFeesC.js?v=<%=Math.random() %>"></script>
<!--缴费(除订座费，报名费外其它状态所有动态生成费用)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_payFees.js?v=<%=Math.random() %>"></script>
<!--缴费(报名费等所有费用-订座状态动态生成费用)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_payFeesB.js?v=<%=Math.random() %>"></script>
<!--缴费(报名费等所有费用-报名状态专用)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_payFeesS.js?v=<%=Math.random() %>"></script>
<!--待沟通-新增咨询量  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_addProject.js?v=<%=Math.random() %>"></script>
<!--待沟通(Waittiong For Communication)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_WFC.js?v=<%=Math.random() %>"></script>
<!--已沟通(Have Communication)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_HC.js?v=<%=Math.random() %>"></script>
<!--预约单(Reservation List)  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_RL.js?v=<%=Math.random() %>"></script>
<!-- 上门(Visit) -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_visit.js?v=<%=Math.random() %>"></script>
<!-- 订座(Booking Seats) -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_bookingseats.js?v=<%=Math.random() %>"></script>

<!-- 流转（gjt） -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_update_gjt.js?v=<%=Math.random() %>"></script>
<!-- 报名（sign up） -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_signUp.js?v=<%=Math.random() %>"></script>
<!-- 报名-继续购买产品-课程信息部分处理 -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_continueToBuyNew.js?v=<%=Math.random() %>"></script>
<!-- 报名-继续购买产品(Continue to Buy)-新增课程信息div -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_projectInfoCTB.js?v=<%=Math.random() %>"></script>
<!-- 报名-继续购买产品(Continue to Buy)-新增缴费信息div -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_payFeesCTB.js?v=<%=Math.random() %>"></script>
<!-- 报名-继续购买产品-新增课程信息div-子产品课程信息div(Continue to Buy Child) -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_projectInfoCTBC.js?v=<%=Math.random() %>"></script>
<!-- 报名-继续购买产品(Continue to Buy)-新增缴费信息div-子产品缴费信息 -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_payFeesCTBC.js?v=<%=Math.random() %>"></script>

<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_updateForm.js?v=<%=Math.random() %>"></script>
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_highsearch.js?v=<%=Math.random() %>"></script>
<!--咨询模块滚动提醒  -->
<script src="${ctx_static }/dep/scroll/scroll.js?v=<%=Math.random() %>"></script>
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench.js?v=<%=Math.random() %>"></script>

<!--分期处理js  -->
<script src="${ctx_static }/home/consultcenter/js/consultWorkbench_installment.js?v=<%=Math.random() %>"></script>
