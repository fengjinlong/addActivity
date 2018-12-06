<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<%@ include file="../common/public_header.jsp"%>
<link rel="stylesheet" href="${ctx_static }/home/consultcenter/css/infoManagement.css">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
       		<div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">信息管理中心</span>
            </div>
            <div class="widget-body">
                <div class="widget-main">
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-4 col-sm-3 col-xs-12">
                            <div class="form-group">
                                <div class="col-lg-10 col-md-9 col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input class="form-control" id="reservation" type="text" placeholder="日期" >
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-6 col-xs-12">
                            <div class="form-group col-md-9 col-sm-4 no-margin-right">
                                <input class="form-control" placeholder="采集人/电话咨询师/分校/姓名/产品/电话" type="text" id="searchVal" name="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-md-3 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
                                <!-- <a type="button" onclick="init()" class="btn increase form-control search-btn" href="javascript:void(0);"> -->
                                <i class="fa fa-search"></i> 搜索
                                </a>

                            </div>
                        </div>


                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group">
                            <span class="btn btn-default pointer" title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">导出
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="javascript:exportPDF();">导出PDF</a></li>
                                    <li><a href="javascript:exportExcel();">导出EXCEL</a></li>
                                    <li><a href="javascript:exportCSV();">导出CSV</a></li>
                                </ul>
                            </div>
                            <shiro:hasPermission name="consultInfoManage:add">
                            <button class="btn increase form-control pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target="#addInquiries">
                            	<i class="fa fa-plus"></i> 新增
                            </button>
                            </shiro:hasPermission>
                        </div>
                    </div>
                    <div class="row row_padding form-horizontal clearfix">					
						  <div class="col-sm-12 form-group  allocation">
								<div class="col-sm-2  no-padding" style="width:100px;">
									<div class="radio-inline">
										<label>
											<input onclick="DataTable.init()" value="" class="colored-success" name="allocationStatus" type="radio" checked>
											<!-- <input onclick="init()" value="" class="colored-success" name="allocationStatus" type="radio" checked> -->
											<span class="text">全部</span>
										</label>
									</div>
								</div>
								<div class="col-sm-2  no-padding" style="width:146px">
									<div class="radio-inline">
										<label>
											<input onclick="DataTable.init()" value="0" class="colored-success" name="allocationStatus" type="radio">
											<!-- <input onclick="init()" value="0" class="colored-success" name="allocationStatus" type="radio"> -->
											<span class="text">已分配咨询师</span>
										</label>
									</div>
								</div>
								<div class="col-sm-2  no-padding">
									<div class="radio-inline">
										<label>
											<input onclick="DataTable.init()" value="1" class="colored-success" name="allocationStatus" type="radio">
											<!-- <input onclick="init()" value="1" class="colored-success" name="allocationStatus" type="radio"> -->
											<span class="text">未分配咨询师</span>
										</label>
									</div>
								</div>
							</div>
	                 </div>
                    <div class="dataTables_wrapper form-inline no-footer">
                         <div class="table-scrollable">
                            <table id="infoManage" class="table table-striped table-hover table-bordered dataTable no-footer" style="white-space:nowrap">
                                <thead>
                                <tr role="row">
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkAll">
                                            <span class="text"></span>
                                        </label>
                                    </th>
                                    <th>创建日期</th>
                                    <th>归属部门</th>
                                    <th>状态</th>
                                    <th>采集人</th>
                                    <th>电话咨询师</th>
                                    <th>咨询者类型</th>
                                    <th>分校</th>
                                    <th>品牌</th>
                                    <th>姓名</th>
                                    <th>产品</th>
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

<%@ include file="../common/public_footer.jsp"%>
<!--创建咨询量-->
<div class="modal fade addInquiries" id="addInquiries" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">创建咨询量</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="inquiries" method="post">
                	<!-- 学员信息 --> 
                	<div class="coacheeInfo col-sm-12 no-padding userInfo">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="tel" class="form-control phone" name="studentPhone" onblur="studentPhoneSelect()">
	                        </div>
	                    </div>
	                    
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">姓名
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="studentName">
	                        </div>
	                    </div>
	                    
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">性别</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="studentSex" class="form-control">
	                                <option value="0">男</option>
	                                <option value="1">女</option>
	                            </select>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">微信</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="weChat">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">年龄</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="age">
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right padding-right-5">QQ</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="tengXun">
	                        </div>
	                    </div>
                    </div> 
                    
          			<!-- 信息归属 -->
                    <div class="infoAscription col-sm-12 no-padding">
						<div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">信息归属地
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select id="departmentId1" name="departmentId1" class="form-control departmentId1 chosen-select" data-placeholder="--请选择--" tabindex="1">
	                            </select>
	                            <input type="hidden" name="departmentName1" id="departmentName1" value=""/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话归属地
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input id="phoneBelong" name="phoneBelong" class="form-control phoneBelong" placeholder="--请选择--">
	                        	<div class="attribution">
								    <div class="modal-dialog modal-sm">
								        <div class="modal-content">
								            <div class="attribution-body">
								                <div class="form-horizontal">
								                    <div class="form-group">
								                        <label class="control-label col-sm-3 no-padding-right">省份</label>
								                        <div class="col-sm-8">
								                            <select name="phoneProvinceId"  id="province" class="form-control province chosen-select" data-placeholder="--请选择--" tabindex="1">
								                            </select>
								                            <input type="hidden" name="phoneProvinceName" id="phoneProvinceName" value=""/>
								                        </div>
								                    </div>
								                    <div class="form-group">
								                        <label class="control-label col-sm-3 no-padding-right">城市</label>
								                        <div class="col-sm-8">
								                            <select name="phoneCityId" id="city" class="form-control city chosen-select" data-placeholder="--请选择--" tabindex="1">
								                                <option value="0">--请选择--</option>
								                            </select>
								                            <input type="hidden" name="phoneCityName" id="phoneCityName" value=""/>
								                        </div>
								                    </div>
								                    <div class="form-group modal-footer">
								                        <div class="col-sm-2 col-sm-offset-3 margin-right-20">
								                            <button type="button" class="btn btn-primary btn-sm confirm-btn"  style="position:relative;z-index:99;">确定</button>
								                        </div>
														<div class="col-sm-2">
								                            <button type="button" class="btn btn-danger btn-sm cancel-btn">取消</button>
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
	                        <label class="control-label col-sm-5 no-padding-right">招生品牌
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right"">
	                            <select name="brandId" id="brandId" class="form-control">
	                            </select>
	                            <input name="brandName" id="brandName" type="hidden" value=""/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">咨询者类型
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="studentAttrId2" id="studentAttrId2" class="form-control studentAttrId2">
	                            </select>
	                            <input type="hidden" name="studentAttrName2" id="studentAttrName2" value=""/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">媒体来源
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="studentAttrId1" id="studentAttrId1" class="form-control studentAttrId1">
	                            </select>
	                            <input type="hidden" name="studentAttrName1" id="studentAttrName1" value=""/>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">关键词
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input type="text" class="form-control" name="keyword" id="keyword">
	                        </div>
	                    </div>
	                    <div class="form-group col-sm-12">
	                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话页面链接</label>
	                        <div class="pull-left col-md-9 col-sm-9">
	                            <input type="tel" class="form-control" name="pageUrl">
	                        </div>
	                    </div>
                    </div>
                    
					<!-- 咨询课程 -->
                    <div class="counselCurriculum col-sm-12 no-padding">
                       <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品类型
							<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7 no-padding-right">
	                            <select name="productModelId" id="product_model" class="form-control productModelId chosen-select">
	                            </select>
	                            <input type="hidden" name="productModelName" class="projectInfoManager" value=""/>
	                        </div>
	                    </div>
	                    <div class="col-sm-12">
		                    <div class="form-group col-md-4 col-sm-6">
		                        <label class="control-label col-sm-5 no-padding-right padding-right-5">产品(班型)
		                        <span class="control-label mandatory">*</span></label>
		                        <div class="col-sm-7 no-padding-right"">
		                            <select name="productId" id="productId" class="form-control productModelId chosen-select">
	                            	</select>
	                            	<input type="hidden" name="productName" id="productName" value=""/>
		                        </div>
		                    </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">期待回访日期</label>
	                        <div class="col-sm-7 no-padding-right">
	                            <input class="form-control recordnexttime" name="recordNextTime" type="text">
	                        </div>
	                    </div>
	                    
	                    <div class="form-group col-sm-12">
	                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">备注</label>
	                        <div class="col-md-9 col-sm-9">
	                            <input type="text" class="form-control notes" name="notes" id="notes">
	                        </div>
	                    </div>
	                    <div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left padding-right-5">对话记录<span id="talk"> </span></label>
                        <div class="col-sm-10">
                        
                           <!-- 富文本编辑器 -->
						  <textarea name="conversation" id="conversation" class="conversation" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          
                          <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('textarea[name="conversation"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0 
								});
							});
                          </script>                           
                        </div>
                        </div>
                	</div>
                    <div class="form-group col-sm-12 modal-footer no-margin-left">
                        <div class="col-sm-2  col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control creation-btn" data-toggle="modal"
                                    data-backdrop="static">创建
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

<!--查看-->
<div class="modal fade viewInfo" id="viewInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <span class="widget-caption">咨询者信息</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix">
                	<!-- 学员信息 --> 
                	<div class="coacheeInfo col-sm-12 no-padding">
	                 	<div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control studentPhoneView" name="studentPhoneView" id="studentPhoneView" disabled>
	                        </div>
	                    </div>
	                    
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">姓名</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control studentNameView" name="studentNameView" id="studentNameView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">性别</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control studentSexView" name="studentSexView" id="studentSexView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">微信</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control wechatView" name="wechatView" id="wechatView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">年龄</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control ageView" name="ageView" id="ageView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">QQ</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control tengXunView" name="tengXunView" id="tengXunView" disabled>
	                        </div>
	                    </div>
                    </div>
                    
                    <!-- 信息归属 -->
                    <div class="infoAscription col-sm-12 no-padding">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">信息归属地</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control departmentName1" value="" id="departmentName1View" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">电话归属地</label>
	                        <div class="col-sm-7">
	                           <input type="text" class="form-control phoneBelongView" value="" id="phoneBelongView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">招生品牌</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control brandNameView" value="" id="brandNameView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">咨询者类型</label>
	                        <div class="col-sm-7">
	                             <input type="text" class="form-control studentAttrName2" value="" id="studentAttrName2View" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">媒体来源</label>
	                        <div class="col-sm-7">
	                           <input type="text" class="form-control studentAttrName1" value="" id="studentAttrName1View" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">关键词</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control keywordView" name="keywordView" id="keywordView" value="" disabled>
	                        </div>
	                    </div>
	                   <!--  <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">客户成熟度</label>
	                        <div class="col-sm-7">
	                            <input type="text" class="form-control keywordView" name="studentMaturityView" id="studentMaturityView" value="" disabled>
	                        </div>
	                    </div> -->
                    </div>
                    
                    <!-- 咨询课程 -->
                    <div class="counselCurriculum col-sm-12 no-padding">
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品类型</label>
	                        <div class="col-sm-7">
	                           <input type="text" data-value="" class="form-control productModelNameView" name="productModelNameView" id="productModelNameView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品</label>
	                        <div class="col-sm-7">
	                            <input name="productNameView" id="productNameView" class="form-control productNameView" disabled>
	                            </input>
	                        </div>
	                    </div>
	                    <div class="col-sm-12">
		                    <div class="form-group col-md-8 col-sm-6 margin-left-10">
		                        <label class="control-label pull-left" style="">期待回访日期</label>
		                        <div class="col-sm-9" style="width:80%">
		                           <input type="text" class="form-control recordnexttimeView" name="recordnexttimeView" id="recordnexttimeView" disabled>
		                        </div>
		                    </div>
	                    </div>
	                    <div class="form-group col-sm-12">
	                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">备注</label>
	                        <div class="col-md-9 col-sm-9">
	                            <input type="text" class="form-control notesView" name="notesView" id="notesView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-sm-12">
	                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">对话页面链接</label>
	                        <div class="pull-left col-md-9 col-sm-9">
	                            <input type="text" class="form-control pageUrlView" name="pageUrlView" id="pageUrlView" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group col-sm-12 dialogueRecord">
                        <label class="control-label col-md-2 col-sm-3 no-padding-right margin-left">对话记录</label>
                        <div class="col-md-9 col-sm-9">
						  <textarea name="conversation2" id="conversation2" class="conversation2" style="width:500px;height:400px;visibility:hidden;"></textarea>
                          
                          <script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('textarea[name="conversation2"]',{
									uploadJson:'${ctx }/file/uploadFile',
									resizeType:0,
									readonlyMode : true
								});
							});
                          </script>    
                        </div>
                    </div>
                	</div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
var infoDisDep = "${dep}";
/*自定义日期格式化:yyyy-MM-dd HH:mm:ss*/    
Date.prototype.toLocaleString = function() {
	  var monthStr = this.getMonth() + 1;
	  if(monthStr<=9) {
		  monthStr = "0"+monthStr;
	  }
	  var dayStr = this.getDate();
	  if(dayStr<=9) {
		  dayStr = "0"+dayStr;
	  }
	  var hoursStr = this.getHours();
	  if(hoursStr<=9) {
		  hoursStr = "0"+hoursStr;
	  }
	  var minutesStr = this.getMinutes();
	  if(minutesStr<=9) {
		  minutesStr = "0"+minutesStr;
	  }
	  var secondsStr = this.getSeconds();
	  if(secondsStr<=9) {
		  secondsStr = "0"+secondsStr;
	  }
    return this.getFullYear() + "-" + (monthStr) + "-" + dayStr + " " + hoursStr + ":" + minutesStr + ":" + secondsStr;
};
//加载表单
var DataTable = function(){
	return {
		init: function () {
			var dutyTable = $('#infoManage').dataTable({
				"bPaginate": true,  //是否显示分页
            	"bLengthChange": true,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": false, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	//"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/consultInfoManage/loadD',
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
						{
						    "mData": "infoManageId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
						    return "<label> <input id=" + data + "  name='infoManageIds' value=" + data + " type='checkbox' class='slaver'> <span class='text'></span> </label>";
						    /* '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild" > <span class="text" ></span> </label>'; */
							}
						},
						{"mData": "createDate", 'sClass': "text-center","mRender": function (data, type, full) {
		            		if(full["createDate"]==null || full["createDate"]=="") {
		            			return "";
		            		}
		                    var timestamp = new Date(full["createDate"]);
		                    return timestamp.toLocaleString();
		            	}},
						{"mData": "departmentName2", 'sClass': "text-center"},
						{"mData": "status", 'sClass': "text-center"},
						{"mData": "createUserName", 'sClass': "text-center"},
						{"mData": "counselor", 'sClass': "text-center"},
						{"mData": "studentAttrName2", 'sClass': "text-center"},
						{"mData": "departmentName1", 'sClass': "text-center"},
						{"mData": "brandName", 'sClass': "text-center"},
						{"mData": "studentName", 'sClass': "text-center"},
						{"mData": "productName", 'sClass': "text-center"},
						{
			                "mData": "infoManageId",
			                'sClass': "text-center",
			                "bSortable": false,
			                "mRender": function (data, type, full ) {
			                    var u = "<a data-record='"+JSON.stringify(full)+"' class='edit' data-backdrop='static'><i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>";
			                    var d = '<shiro:hasPermission name="consultInfoManage:delete"><a href="#" class="delete" onclick="deleteInfoManage(\''+full["infoManageId"]+'\',\''+full["productId"]+'\')"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a></shiro:hasPermission>';
			                    return u+d;
			                }
			            }

                ],
                "aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
	   	     "fnRowCallback":function(nRow,aData,iDisplayIndex){
	   	    	if(aData.status=='1'){
	   	    		$('td:eq(3)',nRow).html('已创建');
	   	    	}else if(aData.status=='2'){
	   	    		$('td:eq(3)',nRow).html('待沟通');
	   	    	}else if(aData.status=='3'){
	   	    		$('td:eq(3)',nRow).html('已沟通');
	   	    	}else if(aData.status=='4'){
	   	    		$('td:eq(3)',nRow).html('预约');
	   	    	}else if(aData.status=='5'){
	   	    		$('td:eq(3)',nRow).html('上门');
	   	    	}else if(aData.status=='6'){
	   	    		$('td:eq(3)',nRow).html('订座');
	   	    	}else if(aData.status=='7'){
	   	    		$('td:eq(3)',nRow).html('报名');
	   	    	}else{
	   	    		$('td:eq(3)',nRow).html('已创建');
	   	    	}
	   	    	return nRow;
	   	     },
	   	     "fnDrawCallback": function(){
	            var oTable = $("#infoManage").dataTable();
	            $('.redirect').keyup(function(e){
	                if($(this).val() && $(this).val()>0){
	                    var redirectpage = $(this).val()-1;
	                }else{
	                    var redirectpage = 0;
	                }
	                oTable.fnPageChange( redirectpage );
	            });
	        }
			});
		    $('#infoManage_wrapper .dataTables_info').parent().append($('#infoManage_wrapper .dataTables_length'));
		}
	}
}();

$('.dataTables_wrapper').on('click','.dataTables_paginate .pagination li a',function(){
	$('.checkAll').attr('checked',false);
})

</script>

<script src="${ctx_static }/home/consultcenter/js/infoManagement.js?v=<%=Math.random() %>"></script>