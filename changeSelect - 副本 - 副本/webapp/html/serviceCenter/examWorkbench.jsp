<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/serviceCenter/css/examWorkbench.css"
	rel="stylesheet">
<link rel="stylesheet" href="${ctx_static }/home/serviceCenter/css/enterWorkbench.css">
<link href="${ctx_static }/home/serviceCenter/css/serviceCenter.css"
	rel="stylesheet" />
<link href="${ctx_static }/home/serviceCenter/css/serverInfo.css"
	rel="stylesheet" />
<style>  
.selected{  
  background-color:#2dc3e8;
}  
    </style>  
<div class="row page-wrapper">
	<div class="col-lg-12 col-sm-12 col-xs-12" style="margin-bottom:150px">
		<div class="widget">
			<!--Widget Header-->
			<div class="widget-body clearfix">
				<div class="widget-main">
					<div class="col-lg-10 col-sm-10 col-xs-10">
						<div
							class="col-sm-3 drop-down animated bounceInLeft no-padding-left" style="height:100%">
							<ul class="nav sidebar-menu alreadyExamList" style="height:100%;background:#ffffff">
								<li ave=3 class="open"><a href="#" class="menu-dropdown" data-type="1">
										<span class="menu-text">服务工作台</span> <i class="fa pull-right"></i>
								</a>
									<ul class="submenu zhiye" style="display:block">
									</ul></li>
							</ul>
						</div>

						<div class="col-sm-9  tabbable">
							<!-- tab头 begin-->
							<!--存储当前选择一级导航  -->
								<input type="hidden" id="mainStatus"/>
								<!--存储当前选择二级导航  -->
								<input type="hidden" id="aplliedforStatus"/>
								<!--存储当前选择二级导航  -->
								<!-- <input type="hidden" id="aplliedforStatusName"/> -->
							<ul class="nav nav-tabs" id="myTab" style="border-bottom: 2px solid #2dc3e8;margin-bottom:20px">
								
							</ul>
								<div class="tabmy">
								</div>
							<!-- tab头 end-->
							<div class="tab-content content" id="tab-content">
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
												</div>
											</div>
								         </div>
								  </div>
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<table
											class="table table-striped table-hover table-bordered dataTable no-footer"
											id="alreadyRegistion">
											<thead>
												<tr role="row">
													<th width="5%"><label> <input class="checkAll"
															type="checkbox"> <span class="text"></span>
													</label></th>
													<th>报名日期</th>
													<th>姓名</th>
													<th>身份证号码</th>
													<th>状态</th>
													<th>分校</th>
													<th>考期</th>
													<th>产品名称</th>
													<th>应缴</th>
													<th>实缴</th>
													<th>快递信息</th>
													<th>费用支付记录</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<!-- tab头 end-->
							<div class="tab-content content" id="tab-content2" style="display:none">
								<div class="dataTables_wrapper form-inline no-footer">
									<div class="table-scrollable">
										<!-- 费用待支出tab页 -->
										<table
											class="table table-striped table-hover table-bordered dataTable no-footer"
											id="waitForOut">
											<thead>
												<tr role="row">
													<th width="5%"><label> <span class="text"></span>
													</label></th>
													<th>编号</th>
													<th>申请人</th>
													<th>申请日期</th>
													<th>包含学员人数</th>
													<th>费用类型</th>
													<th>金额</th>
													<th>支出明细</th>
													<th>支付渠道</th>
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
					
						<div id="buttonList" style="display:none;width:150px;float:right" class="btn-box">
							<button id="butb9db8372-eb83-405e-8110-16009463c3a3" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target="" style="width:120px">拨打电话</button>
							<button id="but8f85ee40-a879-4923-945c-e0e571201ac1" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target="" style="width:120px">发送短信</button>
							<button id="but9d614528-5eb9-4c94-ad81-7a13d6861968" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target="" style="width:120px">发送邮件</button>
							<button id="but8fb41493-8934-4665-b28d-d980b7dbcda0" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target="" style="width:120px">微信</button>
							<button id="but06ed02f4-604c-49d9-90a8-087ed83d5fae" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".download-data" style="width:120px">批量下载资料</button>
							<button id="butbc911c3c-e2c6-4894-9a8f-398a9fcaac58" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".export-student" style="width:120px">批量导出学员</button>
								
								<button id="but4fbcd59d-93f4-4166-8f7e-d86c0ac8976a" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".express-set" onclick="expressFun(this)" style="width:120px">寄件资料</button>
								<button id="but5be08d59-4e82-4682-8baa-9413245dc767" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".resource-get" style="width:120px">资料签收</button>
								
								
								<button id="but7b1927a3-b465-450d-bb5f-78d594f85604" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".express-set" style="width:120px">资源寄件</button>
								<!-- data-toggle="modal" data-target=".resource-set">我要寄件资源</button> -->
								<button id="but1363fd9e-9c7b-44cd-9f6f-afbda9493d8d" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".resource-get" style="width:120px">资源签收</button>
								
								
								<button id="but951b20d3-f1d4-4929-b0f9-8b1ad63937ff" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".express-set" style="width:120px">分校寄件</button>
								<!-- data-toggle="modal" data-target=".school-set">我要寄件分校</button> -->
								<button id="but18ea001b-c146-4810-9216-30ee62cea625" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".resource-get" style="width:120px">分校签收</button>
								
								<!-- <button id="butc241c1be-2888-4165-87b5-84e30c8a9ce9" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".comp-change" style="width:120px">确认合作方</button> -->
								<button id="but8d959d72-96bc-4464-b7a0-f577404f5f1b" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".comp-insert" style="width:120px">学员录取信息</button>
								
								<button id="butf7b52e40-817e-4a55-813c-4d0084adbf81" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".review-completed" style="width:120px">审核完成</button>
								<button id="butd678ef33-0a06-4874-a514-fdea07b050a3" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".application-expenditure" onclick="openWin('1')" style="width:120px">申请费用</button>
<!-- 								data-toggle="modal" data-target=".partnerExpend">申请费用</button> -->
								<button id="but6baa58f8-cf62-4073-9afe-9e8f3307f5e8" type="button" class="btn btn-primary btn-lg btn-block"
								data-toggle="modal" data-target=".application-expenditure" onclick="openWin('2')" style="width:120px">申请支出</button>
								<button id="but75eb2c8f-efab-4593-83da-eff474ccbd99" type="button" class="btn btn-primary btn-lg btn-block"
								 onclick="openDialog('退回')" style="width:120px">退回</button>
								 
								<button id="but8cef7a10-8a28-4c0d-88aa-c94dd57eea63" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" onclick="openCPWin()">更换合作方</button>
								<button id="buta0ffd02f-4480-4d42-bb53-cd769829d1bc" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" onclick="recordInWin()">录入成绩</button>
								<button id="butbbf9ac81-0a16-4b4c-accc-386493a26e45" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" onclick="importRecordWin()">导入成绩</button>
								<!-- data-toggle="modal" data-target=".reback-dialog" onclick="openRebackWin()">退回</button> -->
								<button id="but39256e65-dda6-4cb8-980b-87a583a91493" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" data-toggle="modal" data-target=".qualifications-dialog" onclick="">资源收到证书</button>
								 <button id="but2a4d56d7-fa22-4e62-b72d-b105fa0dc37b" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" data-toggle="modal" data-target=".qualifications-dialog" onclick="">分校收到证书</button>
								 <button id="but991d11d1-a6c2-4b0d-a883-6298ae025ddd" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" data-toggle="modal" data-target=".qualifications-dialog" onclick="">学员收到证书</button>
						</div>
						
						<!--按钮开发测试用，后期删除  -->
						<div style="width:150px;float:right" class="btn-box">
							<button id="but8cef7a10-8a28-4c0d-88aa-c94dd57eea63" type="button" class="btn btn-primary btn-lg btn-block"
								 style="width:120px" onclick="openCPWin()">更换合作方</button>
						</div>
					
				</div> 
			</div>
		</div>
	</div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--快递信息查看弹窗  -->
<div class="modal fade fast-dialog" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">快递信息展示</span>
            </div>
            <div class="modal-body clearfix">
                <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                         <input type="hidden" id="fastInfoManageId" value=""/><!--记录页面选中咨询ID  -->
                         <input type="hidden" id="fastProductId" value=""/><!--记录页面选中产品ID  -->
                            <table id="fastTable" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>快递</th>
                                    <th>快递单号</th>
                                    <th>收件人</th>
                                    <th>快递日期</th>
                                    <th>快递状态</th>
                                    <th>接受快递日期</th>
                                </tr>
                                </thead>
                                <tbody id="fastTbody">
                                </tbody>
                            </table>
                		</div>
                	</div>
            </div>
        </div>
    </div>
</div>

<!--寄件信息弹框  -->
<div class="modal fade express-set in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">快递信息</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="expressForm">
				<!-- 1-资料快递，2-资源试卷，3-分校试卷 -->
					<input type="hidden" name="expressType" id="expressType" class="form-control expressType"/>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">快递：</label>
                        <div class="col-sm-9">
                            <input name="expressName" id="expressName" class="form-control expressName">
                        </div>
                    </div>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">快递单号：</label>
                        <div class="col-sm-9">
                            <input name="expressNum" id="expressNum" class="form-control expressNum">
                        </div>
                    </div>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">收件人：</label>
                        <div class="col-sm-9">
                            <input name="expressUser" id="expressUser" class="form-control expressUser">
                        </div>
                    </div>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">快递日期：</label>
                        <div class="col-sm-9">
                            <input name="expressData" id="expressData" class="form-control expressData myDateTime">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3 col-sm-offset-3">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
				</form>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>

<!--签收信息弹框  -->
<div class="modal fade resource-get in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">签收快递</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="resourceForm">
					<h3 class="text-center">快递是否已收到！！</h3>
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control">确定
							</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>

<!--退回弹框  -->
<div class="modal fade reback-dialog in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">退回信息</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="rebackForm">
                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label style="margin-left: 0 !important;" class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right margin-left">退回状态<span class="control-label mandatory">*</span></label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                        	<!-- <input readonly name="dutyNames" onclick="showApproveDutys(this);"  class="form-control"/> -->
                        	<!--存储新的子节点的名称  -->
                        	<input readonly onclick="showApproveDutys(this);"  class="form-control"/>
                        	<!-- 存储新的主节点的状态 -->
        					<input name="mainStatusNew" id="mainStatusNew" type="hidden" class="form-control mainStatusNew"/>
        					<!--存储新的子节点的状态  -->
        					<input name="aplliedforStatusNew" id="aplliedforStatusNew" type="hidden" class="form-control aplliedforStatusNew"/>
        					<div id="content2" class="menuContent" style="display:none;width:100%; position: absolute;overflow:auto; z-index: 999999;">
								<ul id="approvalDuty" class="ztree" style="margin-top:0;max-height: 180px;width: 100%;overflow:auto"></ul>
							</div>
                        </div>
                    </div>
					<div class="form-group col-lg-12 col-md-12 col-sm-12">
                        <label style="margin-left: 0 !important;" class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right margin-left">退回原因</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <select name="backCourse" id="backCourse" class="form-control backCourse">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12">
                        
                            <label style="margin-left: 0 !important;" class="control-label col-lg-2 col-md-2 col-sm-2 no-padding-right margin-left">备注</label>
                            <div class="col-lg-10 col-md-10 col-sm-10">
                                <textarea class="form-control content content" rows="6" id="backContent" name="content" style="width:100%;height:200px;"></textarea>
                            </div>
                            <script>
						        //简单模式初始化
						        var backEditor;
						        KindEditor.ready(function(K) {
						        	backEditor = K.create('textarea[id="backContent"]', {
						                resizeType : 1,
						                allowPreviewEmoticons : false,
						                allowImageUpload : false,
						                items : [
						                    'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
						                    'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
						                    'insertunorderedlist', '|', 'emoticons', 'image', 'link']
						            });
						        });
						    </script>
                        
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3 col-sm-offset-3">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div>
				</form>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>


<!--更改合作方弹窗  -->
<div class="modal fade change-partner" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">更改合作方</span>
            </div>
            <div class="modal-body clearfix">
               <form class="form-horizontal" id="changePartnerForm">
                  <!--存储主键  -->
					<input type="hidden" name="projectInfoManageId" class="form-control projectInfoManageId"/>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">产品：</label>
                        <div class="col-sm-9">
                            <input name="showProduct" class="form-control showProduct"/>
                        </div>
                    </div>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">考期：</label>
                        <div class="col-sm-9">
                            <input name="showExamTime" class="form-control showExamTime"/>
                        </div>
                    </div>
					<div class="form-group">
                        <label class="control-label col-sm-2 no-padding-right">合作方：</label>
                        <div class="col-sm-9">
                            <select name="partnerId" class="form-control partnerId">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control">确定
							</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--录入成绩弹窗  -->
<div class="modal fade score-in" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">录入成绩</span>
            </div>
            <div class="modal-body clearfix">
               <form class="form-horizontal" id="scoreForm">
					<div class="form-group">
                        <label class="control-label col-sm-2 pull-left studentName">学员姓名：XXX</label>
                        <label class="control-label col-sm-2 pull-right productName">产品：XXX</label>
                    </div>
                    
                     <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="scoreTable" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>考试科目</th>
                                    <th>考试时间</th>
                                    <th>成绩</th>
                                    <th>是否通过</th>
                                </tr>
                                </thead>
                                <tbody id="scoreTBody">
                                </tbody>
                            </table>
                		</div>
                	</div>
                    
                    <div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control">确定
							</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--导入成绩——批量新增-->
<div class="modal fade bulkAdd" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">录入成绩</span>
            </div>
            <div class="modal-body clearfix">
                    <div class="form-group col-md-12 col-sm-12 Bulkimport">
                        <label class="control-label">录入成绩<a href="${ctx }/temp/studentRecords.xlsx">（模板下载）:</a></label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12">
                        <label class="control-label">
                            <div class="col-md-12">
                                <input id="bulk-upload" type="file" name="file" multiple>
                            </div>
                        </label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12">
                 <form class="form-horizontal" id ="scoresAdd">
	                <div class="table-scrollable">
	                        <table class="table table-striped table-bordered dataTable text-center" id="imports">
	                            <thead>
	                            <tr role="row" class="text-center">
	                               <th>日期</th>
	                                <th>品牌</th>
	                                <th>分校</th>
	                                <th>模型</th>
	                                <th>产品</th>
	                                <th>消费</th>
	                                <th>展现</th>
	                                <th>点击</th>
	                                <th>媒体来源</th>
	                                <th>推广方式</th>
	                            </tr>
	                            </thead>
	                            <tbody>
	                            </tbody>
	                        </table>
	                    </div>
	                <div class="col-sm-12 modal-footer">
	                        <div class="col-sm-2 col-sm-offset-4">
	                            <button type="submit" class="btn btn-primary form-control creation-btn bulkAddBtn" data-toggle="modal"
	                                    data-backdrop="static" >确定
	                            </button>
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
</div>

<!--证书弹窗  -->
<div class="modal fade qualifications-dialog" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">快递信息展示</span>
            </div>
            <div class="modal-body clearfix">
                <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                         <input type="hidden" id="fastInfoManageId" value=""/><!--记录页面选中咨询ID  -->
                         <input type="hidden" id="fastProductId" value=""/><!--记录页面选中产品ID  -->
                            <table id="fastTable" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>快递</th>
                                    <th>快递单号</th>
                                    <th>收件人</th>
                                    <th>快递日期</th>
                                    <th>快递状态</th>
                                    <th>接受快递日期</th>
                                </tr>
                                </thead>
                                <tbody id="fastTbody">
                                </tbody>
                            </table>
                		</div>
                	</div>
            </div>
        </div>
    </div>
</div>

<!--申请支出-->
<div class="modal fade application-expenditure in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <button type="button" class="close close_jf" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">申请支出</span>
            </div>
            <div class="modal-body application">
                <form method="" class="form-horizontal" id="applyOutForm" style="margin-left:-30px">
                	<!--弹框来源标志，此弹框申请费用和申请支出都用-1.来自申请费用链接。2.来自申请支出链接 。3.来自费用待支出查看按钮 -->
                	<input type="hidden" id="origin" name="origin" value=""/>
                	<!--存储页面选中考期id  -->
                	<input type="hidden" id="examTimeId" name="examTimeId" value=""/>
                	<!--存储页面选中考期名称  -->
                	<input type="hidden" id="examTimeName" name="examTimeName" value=""/>
                	<!--存储页面选中产品id  -->
                	<input type="hidden" id="productId" name="projectId" value=""/>
                	<!--存储页面选中产品名称  -->
                	<input type="hidden" id="productName" name="productName" value=""/>
                	<!-- 存储当前页面选中费用申请id  -->
                	<input type="hidden" id="applyId" name="applyId" value=""/>
                    <div class="form-group col-md-6">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">申请人</label>
                        <div class="col-md-9 no-padding-right">
                            <input type="text" class="form-control" value="${user.realName }" name="applicantName" readonly="readonly">
                            <input type="hidden" class="form-control" value="${user.userId }" name="applicantId">
                        </div>
                    </div>
					
                    <div class="form-group col-md-6" style="margin-left:-30px">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">申请日期</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input class="form-control" type="text" name="applicantDate" value="${currentDate }" readonly="readonly">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-6">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">申请费用</label>
                        <div class="col-md-4 no-padding-right">
                            <select name="payCodeId" class="payCodeId" onchange="setThisName(this)" id="payCodeId">
                                <!-- <option value="0">考试费</option>
                                <option value="1">合作费</option>
                                <option value="2">服务费</option> -->
                            </select>
                            <input type="hidden" name="payName" value=""/>
                        </div>
                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">单价</label>
                        <div class="col-md-3 no-padding-right">
                            <input type="text" class="form-control" id="money" onblur="calcuTotal(this)" value="" name="money">
                        </div>
                    </div>

                    <div class="form-group col-md-6" style="margin-left:-40px">
                        <label style="margin-left: 0 !important;" class="col-sm-2 control-label no-padding-right">金额</label>
                        <div class="col-md-3 no-padding-right">
                            <input type="text" class="form-control" id="totalMoney" value="" readonly="readonly">
                        </div>
                        <div class="col-md-4 no-padding-right">
                            <select name="paymentFrom" onchange="setHisName(this)" class="form-control">
                                <option value="1">集团支付</option>
                                <option value="2">分校支付</option>
                            </select>
                            <input type="hidden" name="paymentFromName" value="集团支付"/>
                        </div>
                        <div class="col-md-3 no-padding-right">
                            <select name="payment" class="form-control">
                                <option value="1">现金</option>
                                <option value="2">支票</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12 col-md-12" style="margin-left:30px">
                        <label style="margin-left: 0 !important;" class="col-lg-1 control-label no-padding-right">支出明细</label>
                        <div class="col-lg-10 no-padding-right">
                            <input type="text" class="form-control qingchu" value="" name="expendDetail">
                        </div>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12 col-md-12" style="margin-left:30px">
                        <label style="margin-left: 0 !important;" class="col-lg-1 control-label no-padding-right">发票抬头</label>
                        <div class="col-lg-10 no-padding-right">
                            <input type="text" class="form-control qingchu" value="" name="invoiceTitle">
                        </div>
                    </div>

                    <div class="form-group col-md-6">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">部门</label>
                        <div class="col-md-9 no-padding-right">
                            <input type="text" class="form-control" value="${departmentName }" readonly="readonly">
                            <input type="hidden" class="form-control" value="${departmentId }" name="departmentId1" >
                        </div>
                    </div>

                    <div class="form-group col-md-6" style="margin-left:-40px">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">产品</label>
                        <div class="col-md-9 no-padding-right">
                            <input type="text" class="form-control productName" readonly="readonly"/>
                            <!-- <input type="text" class="form-control" id="productName" readonly="readonly"/> -->
                            <!-- <input type="hidden" class="form-control" id="productId"/> -->
                        </div>
                    </div>

                    <div class="form-group col-lg-12" style="margin-left:15px">
                        <label style="margin-left: 0 !important;" class="col-lg-1 control-label no-padding-right">分类</label>
                        <div class="col-lg-10 no-padding-right">
                            <div class="col-md-4 no-padding-right">
                                <select name="pCostclassId" id="feeParentId" class="form-control">
                                </select>
                            </div>
                            <div class="col-md-4 no-padding-right">
                                <select name="costclassId" id="feeChildId" class="form-control">
                                </select>
                            </div>
                            <div class="col-md-4 no-padding-right">
                                <select name="expendType" class="form-control">
                                    <option value="1">营业支出</option>
                                    <option value="2">营业外支出</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-12" style="margin-left:15px">
                        <label style="margin-left: 0 !important;" class="col-lg-1 control-label no-padding-right">收款人</label>
                        <div class="col-lg-10 no-padding-right">
                            <div class="col-md-3 no-padding-right">
                                <select name="payeeId" id="financePayee" onchange="payeeChange()" class="form-control">
                                </select>
                                <input type="hidden" id="payeeName" name="payeeName" value=""/>
                            </div>
                            <div class="col-md-3 no-padding-right">
                                <input type="text" class="form-control" value="" placeholder="开户行" name="bankName" id="bankName">
                            </div>
                            <!-- <div class="col-md-3 no-padding-right">
                                <input type="text" class="form-control" value="" placeholder="开户行所在省">
                            </div>
                            <div class="col-md-3 no-padding-right">
                                <input type="text" class="form-control" value="" placeholder="开户行所在市">
                            </div> -->
                            <div class="col-md-6 no-padding-right">
                                <label class="control-label col-sm-5 no-padding-right">开户行所在省/市<span class="control-label mandatory">*</span></label>
		                        <div class="col-sm-7  no-padding-right">
		                            <input id="bankPC" type="text" class="form-control bankPC" placeholder="--请选择--">
		                        	 <div id="provinceCity" class="attribution">
									    <div class="modal-dialog modal-sm">
									        <div class="modal-content">
									            <div class="attribution-body">
									                <div class="form-horizontal">
									                    <div class="form-group">
									                        <label class="control-label col-sm-2 no-padding">省份</label>
									                        <div class="col-sm-10">
									                            <select name="province"  id="addprovince" class="form-control province chosen-select" data-placeholder="--请选择--" tabindex="1"></select>
									                            <input type="hidden" name="provinceName" id="addProvinceName" value=""/>
									                        </div>
									                    </div>
									                    <div class="form-group">
									                        <label class="control-label col-sm-2 no-padding">城市</label>
									                        <div class="col-sm-10">
									                            <select name="city" id="addcity" class="form-control city chosen-select" data-placeholder="--请选择--" tabindex="1">
									                            </select>
									                            <input type="hidden" name="cityName" id="addCityName" value=""/>
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
                        </div>
                    </div>

                    <div class="form-group col-lg-12" style="margin-left:15px">
                        <label style="margin-left: 0 !important;" class="col-lg-1 control-label no-padding-right"></label>
                        <div class="col-lg-10 no-padding-right">
                            <div class="col-md-4 no-padding-right">
                                <input type="text" class="form-control" id="accountName" value="" placeholder="开户人">
                            </div>
                            <div class="col-md-4 no-padding-right">
                                <input type="text" class="form-control" id="accountNum" value="" placeholder="账号">
                            </div>
                            <div class="col-md-4 no-padding-right">
                                <input type="text" class="form-control" id="phone" value="" placeholder="电话">
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-6">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">调账</label>
                        <div class="col-md-6 no-padding-right">
                            <select name="" class="form-control">
                                <option value="0">是</option>
                                <option value="1">否</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-md-6" style="margin-left:30px">
                        <label style="margin-left: 0 !important;" class="col-sm-3 control-label no-padding-right">申请地区(分校)</label>
                        <div class="col-md-6 no-padding-right">
                            <input type="text" class="form-control" value="${schoolName }" readonly="readonly"/>
                            <input type="hidden" class="form-control" value="${schoolId }" name="departmentId2"/>
                        </div>
                    </div>

                    <div class="form-group col-sm-12 col-md-12">
                        <div class="form-group col-sm-12">
                            <label style="margin-left: 0 !important;" class="control-label col-md-1 col-sm-3 no-padding-right margin-left">申请说明</label>
                            <div class="col-md-11 col-sm-11">
                                <textarea class="form-control content content qingchu" rows="6" id="applyContent" name="content" style="width:668px;height:340px;"></textarea>
                            </div>
                            <script>
                            var contentEditor ;
                            $.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								contentEditor = KindEditor.create('textarea[id="applyContent"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 
								});
							});
							</script>
                        </div>
                    </div>

                    <div class="form-group col-sm-12 col-md-12">
                        <div class="form-group col-sm-12">
                            <label class="control-label col-md-1 col-sm-3 no-padding-right margin-left">备注</label>
                            <div class="col-md-11 col-sm-11">
                                <textarea class="form-control illustration content qingchu" rows="6" id="illustration" name="illustration" style="width:668px;height:340px;"></textarea>
                            </div>
                            <script>
                            var illustrateEditor ;
                            $.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								illustrateEditor = KindEditor.create('textarea[id="illustration"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 
								});
							});
							</script>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12" style="margin-left:15px" id="applyOutTable">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="checkbox">
                                            <label>
                                                <!-- <input type="checkbox" class="checkAll"> -->
                                                <input type="checkbox" onclick="checkAll(this)">
                                                <span class="text"></span>
                                            </label>
                                        </div>
                                    </th>
                                    <th>报名日期</th>
                                    <th>姓名</th>
                                    <th>状态</th>
                                    <th>考期</th>
                                    <th>产品名称</th>
                                    <th>应缴</th>
                                    <th>实缴</th>
                                    <th>资料查看</th>
                                    <th>费用支付记录</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="applyDetailTbody">
                            </tbody>
                        </table>
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

<!--费用支付信息查看弹窗  -->
<div class="modal fade feeOut-dialog" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">费用支付信息展示</span>
            </div>
            <div class="modal-body clearfix">
                <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                         <input type="hidden" id="feeOutInfoManageId" value=""/><!--记录页面选中咨询ID  -->
                         <input type="hidden" id="feeOutProductId" value=""/><!--记录页面选中产品ID  -->
                            <table id="feeOutTable" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>报考日期</th>
                                    <th>财务编码</th>
                                    <th>支出费用</th>
                                    <th>支出明细</th>
                                    <th>收款人</th>
                                    <th>状态</th>
                                    <th>已退费用</th>
                                </tr>
                                </thead>
                                <tbody id="feeOutTbody">
                                </tbody>
                            </table>
                		</div>
                	</div>
            </div>
        </div>
    </div>
</div>

<!--查看资料信息  -->
<div class="modal fade material-dialog" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">资料信息展示</span>
            </div>
            <div class="modal-body clearfix">
                <div class="well with-header clearfix">
					<div class="header bordered-blue">
						<div style="float: left">
							<b>资料管理</b>
						</div>
						<div style="float: right">
							<span class="collapse-btn"><i
								class="fa fa-angle-down"></i></span>
						</div>
					</div>
					<div id="materialDialogDiv">
					</div>
				</div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade review-completed in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">审核完成</span>
			</div>
			<div class="modal-body clearfix">
				<form class="form-horizontal" id="nextStatusForm">
					<h3 class="text-center">学员是否已审核完毕，进入下一个环节！！</h3>
					<div class="form-group col-sm-12 modal-footer">
						<div class="col-sm-2 col-sm-offset-4">
							<button type="submit" class="btn btn-primary form-control">确定
							</button>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-danger form-control"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>



<!-- 查看 -->

<div class="modal fade serviceView in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bordered-bottom-2 bordered-blue">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">查看</span>
			</div>
			<div class="modal-body clearfix">
				<!-- <form method="" class="form-horizontal" style="padding: 0 20px"> -->
					<div class="col-lg-12 col-sm-12 col-xs-12">
						<div class="row">
							<div class="widget-body clearfix">
								<div class="widget clearfix">
									<div class="clearfix" style="background:#fff">
										<div class="pull-left text-align-left head-portrait">
											<div class="pull-left  student-info">
												<p>
													学员姓名：<span id="tabStu"></span>
												</p>
												<p>
													当前状态：<span id="tabStatus"></span>
												</p>
												<input id="departmentId1" hidden />
											</div>
										</div>
										<div class="transaction pull-right roleShow">
											<!-- <a href="#" class="btn btn-lightBlue btn-lg a1 zhuanban">转班</a>
											<a href="#" class="btn btn-lightBlue btn-lg a5 add_jiaofei">补费</a>
											<a href="#" class="btn btn-lightBlue btn-lg a2 xiuxue">休学</a> 
											<a href="#" class="btn btn-lightBlue btn-lg a3 tuifei"> 退费</a>
											<a href="#" class="btn btn-lightBlue btn-lg a4 bukao">补考重修</a> -->
										</div>
									</div>
								</div>
								<div class="tabbable">
									<ul class="nav nav-tabs tabs-flat" id="myTab11">
										<li class="active"><a data-toggle="tab" href="#scdata">资料
										</a></li>
										<li><a id="dtjl" data-toggle="tab" href="#Dynamicrecord">
												动态记录</a></li>
									</ul>
									<div class="tab-content tabs-flat">
										<div id="Dynamicrecord" class="tab-pane">
											<input id="infoManageId" name="infoManageId" value=""
												type="hidden">
											<div class="row row_padding form-horizontal"
												style="height: 100px;">
												<textarea class="form-control" rows="5" name="contentRead"
													id="contextAdd" style="resize: none;"></textarea>
												<div class="btn btn-info pull-right Confirmtoadd">确认添加</div>
											</div>
											<div class="row form-horizontal">
												<ul id="myTab22" class="nav">
													<li class="active"><a href="#Allofthedynamic"
														data-toggle="tab"> 全部动态 </a></li>
													<!--  <li>
                                                            <select name="" id="" class="center-sel">
                                                                   <option value="0">跟进记录</option>
                                                                   <option value="1">电话</option>
                                                                   <option value="2">QQ电话</option>
                                                                   <option value="3">EC会话</option>
                                                                   <option value="4">网站客服会话</option>
                                                                   <option value="5">上门拜访</option>
                                                                   <option value="6">邮件</option>
                                                                   <option value="7">发送短信</option>
                                                            </select>
                                                    </li> -->
												</ul>
												<div id="myTabContent" class="tab-content">
													<div class="tab-pane fade in active" id="Allofthedynamic">
													</div>
												</div>
											</div>
										</div>
										<div id="scdata" class="tab-pane in active">
											<div class="form-horizontal">
												<form method="" class="form-horizontal" id="studentForm"
													style="padding: 0 20px">
													<input type="hidden" name="studentInfoManageId"
														id="studentInfoManageId">
													<div class="col-lg-12 col-sm-12 col-xs-12">
														<div class="well with-header clearfix">
															<div class="header bordered-blue">
																<div class="pull-left">
																	<b>学员-个人信息</b>
																</div>
																<input
																	style='opacity: 0.0; cursor: default; width: 10px; height: 10px;'
																	id="studentPhone2" type="text">
																<div class="pull-right">
																	<span class="collapse-btn"><i
																		class="fa fa-angle-down"></i></span>
																</div>
															</div>
															<div class="row form-group-margin gt_content">
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label
																		class="col-lg-3 col-sm-3 control-label no-padding-right">姓名</label>
																	<div class="col-sm-9 col-lg-9">
																		<input id="studentName" type="text"
																			class="form-control comment_disabled" value=""
																			name="studentName">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">性别</label>
																	<div class="col-sm-9">
																		<select class="form-control comment_disabled"
																			name="studentSex">
																			<option value="0">男</option>
																			<option value="1">女</option>
																		</select>
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">年龄</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled" value=""
																			name="age">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">手机</label>
																	<div class="col-sm-9">
																		<input type="text" 
																			class="form-control comment_disabled" value=""
																			name="studentPhone" id="studentPhone">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">邮箱</label>
																	<div class="col-sm-9">
																		<input type="email"
																			class="form-control comment_disabled" value=""
																			name="email">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label
																		class="col-sm-3 control-label no-padding-right no-padding-left">所在地</label>
																	<div class="col-sm-9">
																		<input
																			class="form-control comment_disabled" value=""
																			name="phoneBelong">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">微信</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled" value=""
																			name="weChat">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label class="col-sm-3 control-label no-padding-right">QQ</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled" value=""
																			name="tengXun">
																	</div>
																</div>
																<div class="form-group col-lg-4 col-md-4 col-sm-6">
																	<label
																		class="col-sm-5 control-label no-padding-right no-padding-left"
																		style="margin-left: -36px">其他联系方式</label>
																	<div class="col-sm-9">
																		<input type="text"
																			class="form-control comment_disabled"
																			name="ortherPhone">
																	</div>
																</div>
																<div class="form-group col-lg-10 col-md-12 col-sm-12">
																	<label style="margin-left: -45px;"
																		class="col-sm-2 control-label no-padding-right">通讯地址</label>
																	<div class="col-sm-9">
																		<input name="phoneAddress"
																			class="form-control comment_disabled"
																			 type="text">
																	</div>
																</div>
																<div class="form-group col-lg-10 col-md-12 col-sm-12">
																	<label style="margin-left: -45px;"
																		class="col-sm-2 control-label no-padding-right">工作单位</label>
																	<div class="col-sm-9">
																		<input name="workSpace" type="text"
																			class="form-control comment_disabled" 
																			>
																	</div>
																</div>
															</div>
														</div>
												</form>

												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div class="pull-left">
															<b>课程信息</b>
														</div>
														<div class='pull-right'>
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i> </span>
														</div>
													</div>
													<div class="row form-group-margin" id="clone1">
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">产品模型</label>
															<div class="col-sm-8">
																<select class="form-control comment_disabled"
																	disabled="disabled" id="addProductModel2" name="productModalId">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">产品</label>
															<div class="col-sm-8">
																<select class="form-control comment_disabled"
																	disabled="disabled" id="addProductId2" name="productId">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">考期</label>
															<div class="col-sm-8">
																<select disabled="disabled"
																	class="form-control comment_disabled" id="kTime2" name="kTime">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">考试地区</label>
															<div class="col-sm-8">
																<select disabled="disabled"
																	class="form-control comment_disabled branchSchoolId" name="branchSchoolId">
																</select>
															</div>
														</div>
														<div class="form-group col-lg-4 col-md-4 col-sm-6">
															<label class="col-sm-4 control-label no-padding-right">收款方</label>
															<div class="col-sm-8">
																<select id="classId2" disabled="disabled"
																	class="form-control comment_disabled"
																	disabled="disabled" name="shoukuanfang">
																</select>
															</div>
														</div>
													</div>
												</div>

												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>课程缴费信息</b> <a href="#"
																class="btn btn-lightBlue btn-lg a1 xiangqing">详情</a>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<table
														class="	table table-striped table-hover table-bordered dataTable no-footer"
														id="payMentTableInfo">
														<thead>
															<tr>
																<th style="text-align: center;">收费项目</th>
																<th style="text-align: center;">应缴</th>
																<th style="text-align: center;">实缴</th>
																<th style="text-align: center;">支付方式</th>
																<th style="text-align: center;">欠费</th>
															</tr>
														</thead>
														<tbody id="payMentTableInfoBody">
														</tbody>
													</table>
												</div>

												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>费用支出信息</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<table
														class="	table table-striped table-hover table-bordered dataTable no-footer"
														id="zhichuTableInfo">
														<thead>
															<tr>
																<th style="text-align: center;">报考日期</th>
																<th style="text-align: center;">财务编号</th>
																<th style="text-align: center;">费用</th>
																<th style="text-align: center;">支出明细</th>
																<th style="text-align: center;">收款人</th>
																<th style="text-align: center;">状态</th>
																<th style="text-align: center;">已退合作费</th>
															</tr>
														</thead>
														<tbody id="zhichuTableInfoBody">
														</tbody>
													</table>
												</div>


												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>报考进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="flow"></div>
												</div>
												
												<div class="well with-header clearfix" id="quzhengdiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>取证进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="quzhengFlow"></div>
												</div>
												
												
												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>考试信息</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<table
														class="	table table-striped table-hover table-bordered dataTable no-footer"
														id="kaoshi">
														<thead>
															<tr>
																<th style="text-align: center;">考试日期</th>
																<th style="text-align: center;">考试科目</th>
																<th style="text-align: center;">考试成绩</th>
															</tr>
														</thead>
														<tbody id="kaoshiBody">
														</tbody>
													</table>
												</div>
												
												<div class="well with-header clearfix" id="tuifeidiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>退费进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="tuifeiFlow"></div>
												</div>
												
												<div class="well with-header clearfix" id="zhuanbandiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>转班进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="zhuanbanFlow">
														<span class="label label-primary plan-btn" style="background:gray" >
	                                                                                                                                                                   退回学员
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                    转班审核
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                     转班完成
	                                                    </span>
													</div>
												</div>
												
												<div class="well with-header clearfix" id="tuichajiadiv">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>退差价进度</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div class="plan-box" id="tuichajiaFlow">
														<span class="label label-primary plan-btn" style="background:gray" >
	                                                                                                                                                                   申请
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                    费用申请中
	                                                    </span>
	                                                    <i class="fa fa-long-arrow-right plan-arrows"></i>
	                                                    <span class="label label-primary plan-btn">
	                                                                                                                                                                     已支付
	                                                    </span>
													</div>
												</div>


												<div class="well with-header clearfix">
													<div class="header bordered-blue">
														<div style="float: left">
															<b>资料管理</b>
														</div>
														<div style="float: right">
															<span class="collapse-btn"><i
																class="fa fa-angle-down"></i></span>
														</div>
													</div>
													<div id="applyDataDiv">
													</div>
													<!-- <div class="col-sm-4">
														<label class="col-sm-6 control-label no-padding-right"></label>
														<div class="col-sm-6">
															<a class="btn btn-blue all-dowload">全部下载</a>
														</div>
													</div> -->
												</div>
											</div>
											<!--   </form> -->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
			<!-- </form> -->
			<ul class="tab_content tab_net tab_content_11 right-toolbar">
				<li><a href="javascript:void(0);"> <img
						src="${ctx_static}/common/image/phone.png"><i></i>
						<div class="up">
							<p onclick="copyPhone('studentPhone2')">拨打电话</p>
						</div>
				</a></li>
				<li><a href="#" data-backdrop="static" data-toggle="modal"
					data-target=".information" data-record="" id="sendShortMsg"> <img
						src="${ctx_static}/common/image/note.png"><i></i>
						<div class="up">
							<p>发送短信</p>
						</div>
				</a></li>
				<li><a href="javascript:void(0);"> <img
						src="${ctx_static}/common/image/send-mail.png"><i></i>
						<div class="up">
							<p>发送邮件</p>
						</div>
				</a></li>
			</ul>
		</div>
	</div>
</div>
</div>


<!--预览图片-->
<div class="modal fade lookImg in" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="false"
	data-backdrop="static">
	<div class="modal-dialog modal-xs" style="margin-left: 20%;">
		<div class="modal-content">
			<div class="modal-header modal-header_border">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<span class="widget-caption">预览图片</span>
			</div>
			<div class="modal-body clearfix">
				<img id="imgLook" src=" " style="height: auto;width: auto;position: initial;top: 0;bottom: 0;left: 0;right: 0; width: 100%;margin: auto;z-index: -1;"> 
			</div>
		</div>
	</div>
</div>

<!-- 树 -->
<div id="content" class="menuContent" style="display:none; position: absolute;overflow:auto;z-index:99999;max-height:200px">
   <ul id="ajaxTree" class="ztree" style="margin-top:0; width:168px;height: 200px"></ul>
</div>

<script src="${ctx_static }/dep/assets/js/jquery.ztree.all-3.5.min.js"></script>

<script src="${ctx_static }/dep/fileinput/js/jquery-form.js"></script>

<script
	src="${ctx_static }/home/serviceCenter/js/examWorkbench.js?v=<%=Math.random() %>"></script>
	
<%-- <script
	src="${ctx_static }/home/serviceCenter/js/serviceCenter.js?v=<%=Math.random() %>"></script>
 --%>
<script
	src="${ctx_static }/home/serviceCenter/js/examWorkbench_exam_flowNew.js?v=<%=Math.random() %>"></script>	
<!--快递寄件相关js  -->
<script
	src="${ctx_static }/home/serviceCenter/js/examWorkbench_express.js?v=<%=Math.random() %>"></script>
<!-- 费用待支出tab -->
<script
	src="${ctx_static }/home/serviceCenter/js/examWorkbench_waitForOut.js?v=<%=Math.random() %>"></script>
<!-- 退回功能，快递查看 -->
<script
	src="${ctx_static }/home/serviceCenter/js/examWorkbench_reback.js?v=<%=Math.random() %>"></script>
<!--录入成绩，导入成绩按钮  -->	
<script
	src="${ctx_static }/home/serviceCenter/js/examWorkbench_score.js?v=<%=Math.random() %>"></script>
