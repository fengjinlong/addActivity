<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<link href="${ctx_static }/home/serviceCenter/css/examWorkbench.css"
	rel="stylesheet">

<!--待报考-->
<div id="waitExam" class="tab-pane clearfix in active">
	<div class="col-sm-3 drop-down animated bounceInLeft no-padding">
		<ul class="nav sidebar-menu waitExamList">
			<li>
				<a href="#" class="menu-dropdown" data-type="1"> 
					<span class="menu-text">职业资格【<span class="total-1">0</span>人】</span> <i class="fa pull-right"></i>
				</a>
				<ul class="submenu zhiye">
					<!-- <li>
						<a href="javascript:;" class="menu-dropdown"> 
							<span class="menu-text">考期【100人】</span> <i class="fa pull-right"></i>
						</a>
						<ul class="submenu">
							<li>
								<a href="javascript:;"> <span class="menu-text">合作方【150人】</span> <i class="fa pull-right"></i></a>
							</li>
						</ul>
					</li> -->
				</ul>
			</li>
			<li>
				<a href="#" class="menu-dropdown" data-type="2"> 
					<span class="menu-text">学历 【<span class="total-2">0</span>人】</span> <i class="fa pull-right"></i>
				</a>
				<ul class="submenu xueli" >
					<!-- <li>
						<a href="javascript:;" class="menu-dropdown">
							<span class="menu-text">考期 【100人】</span> <i class="fa pull-right"></i>
						</a>
						<ul class="submenu">
							<li>
								<a href="javascript:;"> <span class="menu-text">合作方1 【150人】</span> <i class="fa pull-right"></i></a>
							</li>
							<li>
								<a href="javascript:;"> <span class="menu-text">合作方2 【50人】</span> <i class="fa pull-right"></i> </a>
							</li>
						</ul> 
					</li> -->
				</ul>
			</li>
		</ul>
	</div>
	<div class="col-sm-9 waitExamInfo animated bounceInRight">
		<div class="col-lg-12 col-sm-12 col-xs-12 no-padding">
		<div class="row row_padding form-horizontal">
	        <div class="col-sm-4 col-xs-12 no-padding-right">
	       	   <label class="control-label pull-left">日期</label>
	       	   <div class="col-sm-10 no-padding-right">
	       	   		<div class="input-group date col-sm-12">
						<input type="text" class="form-control reservation"
							placeholder="请选择日期"> <span class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</span>
					</div>
	       	   </div>
	       </div>
	       <div class="col-sm-3 col-xs-12">
	       		<input type="text" id="searchVal" onkeydown="search()" class="form-control" placeholder="分校/姓名/课程/级别/电话">
	       </div>
	       
	       <div class="pull-left">
               <button type="button" class="btn increase search-btn" style="width:70px;padding:6px 0;">
               		<i class="fa fa-search"></i> 搜索
               </button>
           </div>
           <div class="pull-right">
             <c:if test="${sessionScope.waitExamReturn eq '1' }">
               <button type="button" title="退回信息核实中心" class="btn btn-lightBlue margin-right-10 goback">退回信息核实</button></c:if>
             <c:if test="${sessionScope.waitExamApply eq '1' }">
               <button type="button" title="申请报考" class="btn btn-lightBlue apply">申请报考</button></c:if>
           </div>
   		</div>
			<div class="dataTables_wrapper form-inline no-footer">
				<div class="table-scrollable">
					<table id="waitExamTable" class="table table-striped table-hover table-bordered dataTable no-footer">
					
					<!-- 项目类型 -->
					<input type="hidden" name="projectType"/>
					<!-- 考期 -->
					<input type="hidden" name="ktime"/>
					<!-- 项目 -->
					<input type="hidden" name="projectId"/>
					<!-- 合作方 -->
					<input type="hidden" name="partnerId"/>
					
						<thead>
							<tr role="row">
								<th width="5%"><label> <input type="checkbox">
										<span class="text"></span>
								</label></th>
								<th>报名日期  </th>
								<th>状态 </th>
								<th>姓名 </th>
								<th>身份证号码 </th>
								<th>籍贯 </th>
								<th>分校</th>
								<th>考期</th>
								<th>教育形式  </th>
								<th>项目</th>
								<th>级别 </th>
								<th>学校  </th>
								<th>专业 </th>
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
 
<!--发送短信-->
<div class="modal fade information in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">短信</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal padding-top-20">
                    <div class="form-group col-md-12">
                        <label class="control-label no-padding-right col-md-2">预约校区</label>
                        <div class="col-md-10 col-sm-10">
                            <select name="" class="form-control" id="schoolIdModelMsg">
                                <option value="0">--请选择--</option>
                                <option value="">天津南开校区</option>
                                <option value="">天津综合管理中心</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label no-padding-right col-md-4">手机号码</label>
                        <div class="col-md-8 col-sm-8 padding-left-20 no-padding-right">
                            <input id="studentPhoneMsg" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="control-label no-padding-right col-md-4" style="margin-left: -30px;">短信类别</label>
                        <div class="col-md-8 col-sm-8 no-padding-right">
                            <select id="msgType" name="" class="form-control">
                                <option value="">--请选择--</option>
                                <option value="您好！我是学慧网的admin老师，今天对您咨询的class方面的课程进行了电话回复，但由于您没有接听到电话，很抱歉未能及时给您提供帮助与解答，我的联系电话是13501194362，您方便的话可以随时联系我，或者根据给您发送的分校路径信息直接到校区咨询，以方便您及时了解相关报考和学习信息，学习像呼吸一样自然！">
                                    跟访
                                </option>
                                <option value="学员您好，我是之前和您联系的admin老师，如果您对我们的class课程任何疑问，可以到我们校区address或随时拨打我的联系方式：13501194362。">
                                    指路
                                </option>
                                <option value="studentName您好，我是昨天给您联系的admin老师，我给您预约的recriveTime到们校区具体了解，您到时记得过来，如果找不着的话给我打电话就可以，到时候我给您指路，最后祝您工作生活愉快。">
                                    联系
                                </option>
                                <option value="studentName您好，我是刚和您联系的admin老师，我们的校区地址：address。帮您预约的是recriveTime来分校，我们安排了相关的校区老师接待您，请您注意时间安排。如有变动，请提前联系我13501194362。 ">
                                    联系
                                </option>
                                <option value="学员您好，我是之前和您联系的admin老师，如果您对我们的class课程有任何疑问，可以到我们校区address，或随时拨打我的联系方式：13501194362。加：QQ：，微信：与我沟通productName">
                                    沟通
                                </option>
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
                            <button type="button" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
 

<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<script src="${ctx_static }/home/serviceCenter/js/examWorkbench_waitExam.js"></script>

