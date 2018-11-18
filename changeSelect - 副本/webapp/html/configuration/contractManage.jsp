<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/configuration/css/partnerManage.css" rel="stylesheet">
<link rel="stylesheet" href="${ctx_static }/dep/bootstrap-select/css/bootstrap-select.min.css">
<link rel="stylesheet" href="${ctx_static }/dep/fileinput/css/fileinput.min.css">

<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-themeprimary">
                <span class="widget-caption">合同管理</span>
                <div class="widget-buttons">
                    <a href="#" data-toggle="collapse"></a>
			            <a href="#" onclick="loadHtml('/bizPartner/index', this)" class="back-btn" data-toggle="dispose">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div>
            <div class="widget-body">
                <div class="widget-main no-padding contractManage">
                    <form class="form-horizontal" id="contractManage">
                    <%-- <c:forEach items="${partner}" var="record"> --%>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">资源归属：</label>
                            <div class="col-sm-6">
                            	<input name="partnerId" class="form-control" value="${partner.partnerId }" type="hidden"></input>
                            	<input name="departmentName" class="form-control" disabled></input>
                                <input name="partnerDepartmentId" class="form-control" type="hidden"></input>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 no-padding-right">
                            <label class="control-label col-sm-4 no-padding-right">合作方编号：</label>
                            <div class="col-sm-6 padding-right-10">
                                <input name="partnerCode" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合作单位名称：</label>
                            <div class="col-sm-6">
                                <input name="partnerName" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 no-padding-right">
                            <label class="control-label col-sm-4 no-padding-right">合作单位简称：</label>
                            <div class="col-sm-6 padding-right-10">
                                <input name="partnerShortName" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-12">
                            <label class="control-label col-sm-2 no-padding-right">合作单位地址：</label>
                            <div class="col-sm-9 padding-left-10 no-padding-right address">
                                <input name="partnerAddress" class="form-control" disabled>
                            </div>
                        </div>
                        <hr class="wide contact-split"> 
                       
                        <div class="form-group col-sm-12 contactList">
                            <label class="control-label col-sm-2 no-padding-right">联系人名单：</label>
                            <div class="col-sm-10">
                                <div class="col-sm-2 no-padding">
                                    <input name="name" class="form-control" disabled></input>
                                </div>
                                <div class="col-sm-4">
                                    <input name="type" type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-5 no-padding-right">
                                    <input name="tel" type="text" class="form-control" disabled>
                                </div>
                            </div>
                        </div>
                        <hr class="wide bankCard-split">
                        <div class="form-group col-sm-12 bankCard">
                            <label class="control-label col-sm-2 no-padding-right">银行卡信息：</label>
                            <div class="col-sm-10">
                                <div class="col-sm-2 no-padding">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-3 no-padding">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <i class="fa fa-plus-circle blue bankcardAdd control-label add-button pull-left"></i>
                                <i class="fa fa-minus-circle danger bankcardAdd control-label add-button pull-left"></i>
                            </div>
                        </div>
                        <hr class="wide rebates-split">
                        <div class="form-group col-sm-12 rebates">
                            <label class="control-label col-sm-2 no-padding-right">返款账号信息：</label>
                            <div class="col-sm-10">
                                <div class="col-sm-2 no-padding">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <div class="col-sm-3 no-padding">
                                    <input type="text" class="form-control" disabled>
                                </div>
                                <i class="fa fa-plus-circle blue rebatesAccount control-label add-button pull-left"></i>
                                <i class="fa fa-minus-circle danger rebatesAccount control-label add-button pull-left"></i>
                            </div>
                        </div>
                        <%-- </c:forEach> --%>
                    </form>
                    
                    <hr class="wide">
                    <a href="#" class="btn increase pull-right add-btn" data-toggle="modal" data-target=".contractAdd" data-backdrop="static" onclick="clearForm();">
                        <i class="fa fa-plus"></i> 新增
                    </a>
                    <div class="">
                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="bizContract">
                            <thead>
                            <tr role="row">
                                <th>合同编号 </th>
                                <th>合同洽谈人 </th>
                                <th>合同签署人 </th>
                                <th>合同签署时间 </th>
                                <th>合同到期时间 </th>
                                <th>合同创建人 </th>
                                <th>合同创建时间 </th>
                                <th>在招产品数 </th>
                                <th>状态</th>
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
<!--合同新增-->
<div class="modal fade contractAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <div class="contract">
                    <form class="form-horizontal clearfix" id="contractAdd" method="post">
                        <div class="form-group col-sm-6" style="margin-left:-50px;">
                            <label class="control-label col-sm-4 no-padding-right">合同编号
								<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                            	<input name="partnerId" class="form-control" value="${partner.partnerId }" type="hidden"></input>
                                <input id="contractCode" name="contractCode" class="form-control" placeholder="请输入合同编号">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合同签署人
								<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="signUser" name="signUser" class="form-control" placeholder="请输入合同签署人">
                            </div>
                        </div>
                        <div class="form-group col-sm-6"  style="margin-left:-50px;">
                            <label class="control-label col-sm-4 no-padding-right">合同洽谈人
								<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="discussUser" name="discussUser" class="form-control" placeholder="请输入合同洽谈人">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合同起止日期
								<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <div class="input-group date">
                                    <input id="duration" type="text" class="form-control duration" placeholder="请选择合同起止日期">
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-sm-12 dialogueRecord"  style="margin-left:-50px;">
                        	<label class="control-label col-md-2 col-sm-3  margin-left">上传合同：</label>
	                        <div class="col-sm-10 ">
							  <textarea id="uploadContract" name="uploadContract" style="width:713px;height:340px;visibility:hidden;"></textarea>
		                         <script>
									$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
										KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
										editor = KindEditor.create('textarea[name="uploadContract"]',{
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
                    	<!-- <div class="form-group col-sm-12">
                            <label class="control-label col-md-2"> 上传合同</label>
					        <div class="form-group col-md-10">
					            <input id="upload-contract" type="file" multiple class="file-loading">
					        </div>
                        </div> -->
                        
                        <div class="modal-footer col-sm-12">
                            <div class="col-sm-2 col-sm-offset-4">
                            	<button type="submit" class="btn btn-primary form-control contract-save">保存</button>
                            </div>
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </form>

                    <div class="productInfo">
                        <hr class="wide contract-line">
                        <a href="#" class="btn btn-lightBlue pull-right add-btn" data-toggle="modal" 
                           data-target=".productAdd" data-backdrop="static">
                            <i class="fa fa-plus"></i> 新增产品
                        </a>
                        <div class="">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                <thead>
                                <tr role="row">
                                    <th>项目 </th>
                                    <!-- <th>产品编号 </th> -->
                                    <th>教育形式 </th>
                                    <th>级别 </th>
                                    <th>招生地区 </th>
                                    <th>院校 </th>
                                    <th>招生专业 </th>
                                    <th>状态</th>
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

<!--合同编辑-->
<div class="modal fade contractEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
                <a href="#" class="contractInfo pull-right">
                    <i class="fa fa-pencil blue"></i>
                </a>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <div class="contract">
                    <form class="form-horizontal" id="contractEdit">
                        <div class="form-group col-sm-6" style="margin-left:-50px;">
                            <label class="control-label col-sm-4 no-padding-right">合同编号<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="updtContractCode" name="projectLevel" class="form-control" disabled>
                            	<input hidden id="updtcontractId" name="contractId" class="contractId"></input>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合同签署人<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="updtSignUser" name="projectLevel" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-6" style="margin-left:-50px;">
                            <label class="control-label col-sm-4 no-padding-right">合同洽谈人<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="updtdiscussUser" name="projectLevel" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合同起止日期<span class="control-label mandatory">*</span></label>
                            <div class="col-sm-8 no-padding-right">
                                <div class="input-group date">
                                    <input id="updtDuration" type="text" class="form-control duration" disabled>
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                      <!--   <div class="form-group col-sm-12">
                            <label class="control-label col-md-2"> 上传合同</label>
					        <div class="form-group col-md-10">
					            <input id="upload-contract-edit" type="file" multiple class="file-loading">
					        </div>
                        </div> -->
                        <div class="form-group col-sm-12 dialogueRecord" style="margin-left:-50px;">
                        	<label class="control-label col-md-2 col-sm-3  margin-left">上传合同：</label>
	                        <div class="col-sm-10 padding-left-10 ">
							  <textarea name="uploadContract2" id="uploadContractEdit" class="uploadContract" disabled style="width:713px;height:300px;visibility:hidden;"></textarea>
		                          <script>
									$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
										KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
										editor2 = KindEditor.create('textarea[name="uploadContract2"]',{
											uploadJson:'${ctx }/file/uploadFile',
											resizeType:0
										});
									});
		                          </script>                           
	                    	</div>
                    	</div>
                    </form>
                    <hr class="wide contract-line">
                    <a  class="btn increase pull-right add-btn" data-toggle="modal"  id="addNewProductButton"
                       data-target=".productAdd" data-backdrop="static" >
                        	 新增产品
                    </a>
                    <div class="">
                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="contractCetail">
                            <thead>
                            <tr role="row">
                                <th>产品模型</th>
                                <th>产品</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 合同起止日期 -->
<div class="modal fade contract-ok" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header modal-header_border">
                <span class="widget-caption">合同管理</span>
            </div>
            <div class="modal-body">
                    <h3 class="contractbegin-text">保存成功！</h3>
                    <div class="form-group col-sm-12 modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="submit" class="btn btn-primary btn-close1">确定
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>


<!--产品新增-->
<div class="modal fade productAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption title">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="productAdd" method="post">
                	<input type="hidden" name="contractDetailId">
	                <div class="counselCurriculum">
		                <div class="form-group col-sm-12">
	                        <span class="blue">产品基本信息</span>
	                    </div>
	               		<div class="form-group col-md-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品模型<span class="control-label mandatory">*</span></label>
	                        <div class="col-sm-7  no-padding-right">
	                            <select name="productModelId" id="addProductModel" data-value="product_model" class="form-control addProductModel chosen-select">
	                            </select>
	                        </div>
	                    </div>
	                 </div>
	                 <div class="form-group col-sm-4 col-sm-6">
	                        <label class="control-label col-sm-5 no-padding-right">产品</label>
	                        <div class="col-sm-7  no-padding-right">
								 <select name="productId" id="addProductId" class="form-control addProductId">
								 </select>
	                        </div>
	                 </div>
                    
                    <hr class="wide">
                    <div class="form-group col-sm-12">
                        <span class="blue">报考条件</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">年龄</label>
                        <div class="col-sm-7">
                            <input id="age" name="age" type="text" class="form-control" name="age">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学历</label>
                        <div class="col-sm-7">
                            <select id="studentAttrId" name="studentAttrId" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right common-label">户籍</label>
                        <div class="col-sm-10 common-10 no-padding-right">
                            <select class="form-control comment_disabled selectpicker" multiple id="registerLimitId" name="registerLimitId">
                                <option>北京市</option>
                                <optgroup label="河北省">
                                    <option>廊坊市</option>
                                    <option>石家庄市</option>
                                    <option>邢台市</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right common-label">其他要求</label>
                        <div name="other" class="col-sm-10 common-10 no-padding-right">
                            <input id="extraLimit" name="extraLimit" type="text" class="form-control">
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="form-group col-sm-12">
                        <span class="blue">考试科目</span>
                    </div>

					<div class="form-group col-sm-12">
						<table class="table table-bordered" >
							<thead>
								<tr>
									<th>考试科目</th>
									<th>是否需要本人参加</th>
									<th>是否需要刷身份证</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody id="subjectTable">
								<tr>
									<td>
										<select class="form-control comment_disabled" name="subjectId" >
										
										</select>
									</td>
									<td><select class="form-control comment_disabled" name="isSelf">
											<option value="0">需要</option>
											<option value="1">不需要</option>
									</select></td>
									<td><select class="form-control comment_disabled" name="isIdcart">
											<option value="0">需要</option>
											<option value="1">不需要</option>
									</select></td>
									<td><label class="control-label no-padding-right">
											<a  class="blue addSubject"> <i
												class="glyphicon glyphicon-plus-sign "></i>
										</a>
										<a class="blue delSubject"> <i
												class="glyphicon glyphicon-minus-sign"></i>
										</a>
									</label></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<hr class="wide">
                    <div class="form-group col-sm-12">
                        <span class="blue">所需资料：</span>
                    </div>

					<div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">所需资料</label>
                        <div class="col-sm-11">
                            <select id="applyDataId" name="applyDataId" class="form-control selectpicker"
                            multiple title="--请选择--"></select>
                        </div>
                    </div>


					<hr class="wide">
                    <div class="form-group col-sm-12">
                        <span class="blue">费用详情</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">总学费</label>
                        <div class="col-sm-7">
                            <input name="zxf" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">合作成本</label>
                        <div class="col-sm-7">
                            <input name="hzcb" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">有无返点</label>
                        <div class="col-sm-7">
                            <select name="ywfd" class="form-control">
                                <option value="1">有</option>
                                <option value="0">无</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <span class="sky">费用是否包含以下项目</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">报名费</label>
                        <div class="col-sm-7">
                            <select name="bmf" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">入学测试费</label>
                        <div class="col-sm-7">
                            <select name="rxcsf" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">作业</label>
                        <div class="col-sm-7">
                            <select name="zy" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">考试费</label>
                        <div class="col-sm-7">
                            <select name="ksf" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">论文答辩/评审</label>
                        <div class="col-sm-7">
                            <select name="lwdb" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">统考报名</label>
                        <div class="col-sm-7">
                            <select name="tkbm" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">补考费</label>
                        <div class="col-sm-7">
                            <select name="bkf" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学位考试报名费</label>
                        <div class="col-sm-7">
                            <select name="xwks" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学位辅导费</label>
                        <div class="col-sm-7">
                            <select name="xwfd" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right no-padding-left">照片采集费</label>
                        <div class="col-sm-7">
                            <select name="zpcj" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">证书工本费</label>
                        <div class="col-sm-7">
                            <select name="sbjg" class="form-control">
                                <option value="1">包含</option>
                                <option value="0">不包含</option>
                            </select>
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="col-sm-12 clearfix" style="height:50px;">
                       	<label class="control-label no-padding-right">
                             <span class="blue">考期</span>
                         </label>
                        <label class="control-label no-padding-right">
                             <a href="javascript:" class="blue addExam" onclick="addExam()">
                                 <i class="glyphicon glyphicon-plus-sign"></i>
                             </a>
                         </label>
                         <label class="control-label no-padding-right">
                             <a href="javascript:" class="blue delExam">
                                 <i class="glyphicon glyphicon-minus-sign"></i>
                             </a>
                         </label>
                    </div>
                    <div id="kaoqis">

						<div class="row">
							<div class="form-group col-lg-12 col-md-12 col-sm-12">
								<div class="form-group col-sm-4">
									<label class="col-sm-3 control-label no-padding-right">考期</label>
									<div class="col-sm-9">
										<select name="examId" class="form-control">
										</select>
									</div>
								</div>
								<div class="form-group col-sm-3">
									<label class="col-sm-5 control-label no-padding-right">报考人数</label>
									<div class="col-sm-7">
										<input class="form-control " value="" name="examNum"
											type="text">
									</div>
								</div>
								<div class="form-group col-sm-3">
									<label class="col-sm-5 control-label no-padding-right">报考优先级</label>
									<div class="col-sm-7">
										<select class="form-control comment_disabled" name="examLevel">
											<option value="1">高</option>
											<option value="2">中</option>
											<option value="3">低</option>
										</select>
									</div>
								</div>
								<div class="form-group col-sm-12">
									<label class="col-sm-1 control-label no-padding-right">招生地区</label>
									<div class="col-sm-9">
										<select id="departmentIds" class="form-control comment_disabled selectpicker" multiple name="departmentIds" >
										</select>
									</div>
								</div>
								
							</div>
							<div class="kaoqi clearfix" style="border:1px solid #cccccc;margin-bottom:20px">
								
								<div class="form-group col-lg-12 col-md-12 col-sm-12" style="margin-left:20px">
									<label class="control-label no-padding-right"> <a
										href="javascript:" class="blue addKaoqi"> <i
											class="glyphicon btn-kao glyphicon-plus-sign"></i>
									</a>
									</label> <label class="control-label no-padding-right"> <a
										href="javascript:" class="blue delKaoqi"> <i
											class="glyphicon btn-kao glyphicon-minus-sign"></i>
									</a>
									</label>
								</div>
								
								<div class="form-group clearfix">
									<div class="form-group col-sm-4 col-lg-4 col-md-4">
										<label
											class="col-sm-4 control-label no-padding-right no-padding-left"
											style="margin-left: -30px">支付日期</label>
										<div class="col-sm-8">
											<div class="input-group">
												<input class="form-control date-picker form_datetime"
													type="text" value="" name="payDateString"> <span
													class="input-group-addon"> <i class="fa fa-calendar"></i>
												</span>
											</div>
										</div>
									</div>
									<div class="form-group col-sm-2 col-lg-2 col-md-2">
										<label
											class="col-sm-1 control-label no-padding-right no-padding-left"
											style="white-space: nowrap; margin-left: -50px">支付金额</label>
										<div class="col-sm-11">
											<input class="form-control comment_disabled" value="" name="payNum"
												type="text">
										</div>
									</div>
									<div class="form-group col-sm-4 col-lg-4 col-md-4">
										<label
											class="col-sm-4 control-label no-padding-right no-padding-left"
											style="margin-left: -30px">返款日期</label>
										<div class="col-sm-8">
											<div class="input-group">
												<input class="form-control date-picker form_datetime"
													type="text" value="" name="returnDateString"> <span
													class="input-group-addon"> <i class="fa fa-calendar"></i>
												</span>
											</div>
										</div>
									</div>
									<div class="form-group col-sm-2 col-lg-2 col-md-2">
										<label
											class="col-sm-1 control-label no-padding-right no-padding-left"
											style="white-space: nowrap; margin-left: -50px">返款金额</label>
										<div class="col-sm-11">
											<input class="form-control comment_disabled" value=""  name="returnNum"
												type="text">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                    
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="button" class="btn btn-primary form-control" onclick="subDetail()">确定</button>
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

<!--产品编辑-->
<div class="modal fade productEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="productEdit" onsubmit="return validateForm()">
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">项目：</label>
                        <div class="col-sm-7">
                            <input name="projectName" class="form-control" disabled></input>
                            <input name="projectId" type="hidden"></input>
                            <input id="contractDetailId" name="contractDetailId" type="hidden"></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">级别：</label>
                        <div class="col-sm-7">
                            <select id="projectLevelIdUpdt" name="projectLevelId" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">教育形式：</label>
                        <div class="col-sm-7">
                            <select name="teachForm" class="form-control">
                                <option value="1">自考</option>
                                <option value="2">远程</option>
                                <option value="3">成考</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">招生地区：</label>
                        <div class="col-sm-7">
                            <select id="departmentIdsUpdt" name="departmentIds" class="selectpicker form-control" multiple  title="北京"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">院校：</label>
                        <div class="col-sm-7">
                            <select id="schoolIdUpdt" name="schoolId" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">招生专业：</label>
                        <div class="col-sm-7">
                            <select id="majorIdUpdt" name="majorId" class="selectpicker form-control" multiple></select>
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="form-group col-sm-12">
                        <span class="blue">报考条件：</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">服务形式：</label>
                        <div class="col-sm-7">
                            <select name="serviceType" class="form-control">
                                <option value="1">服务一</option>
                                <option value="2">服务二</option>
                                <option value="3">服务三</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">年龄：</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="age">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学历：</label>
                        <div class="col-sm-7">
                            <select id="studentAttrIdUpdt" name="studentAttrId" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right common-label">户籍：</label>
                        <div class="col-sm-10 common-10 no-padding-right">
                            <select class="selectpicker form-control" multiple data-live-search="true" name="registerLimitId">
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right common-label">其他要求：</label>
                        <div name="other" class="col-sm-10 common-10 no-padding-right">
                            <input name="extraLimit" type="text" class="form-control">
                        </div>
                    </div>
                    <hr class="wide isBrushcard-split">
                    <div class="form-group col-sm-12">
                        <span class="blue">是否需要刷身份证：</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label name="entrance" class="control-label col-sm-5 no-padding-right">入学：</label>
                        <div class="col-sm-7">
                            <select name="professionaProject" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">期末考试：</label>
                        <div class="col-sm-7">
                            <select name="final" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">论文：</label>
                        <div class="col-sm-7">
                            <select name="paper" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="form-group col-sm-12">
                        <span class="blue">是否本人参加考试：</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">入学测试：</label>
                        <div class="col-sm-7">
                            <select name="test" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">期末考试：</label>
                        <div class="col-sm-7">
                            <select name="finalExam" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">网上作业：</label>
                        <div class="col-sm-7">
                            <select name="onlineExercise" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">毕业论文：</label>
                        <div class="col-sm-7">
                            <select name="thesis" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">统考：</label>
                        <div class="col-sm-7">
                            <select name="examination" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学位英语：</label>
                        <div class="col-sm-7">
                            <select name="degreeEnglish" class="form-control">
                                <option value="需要">需要</option>
                                <option value="不需要">不需要</option>
                            </select>
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">总学费：</label>
                        <div class="col-sm-7">
                            <input name="tuition" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">合作成本：</label>
                        <div class="col-sm-7">
                            <input name="costing" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">有无返点：</label>
                        <div class="col-sm-7">
                            <select name="rebate" class="form-control">
                                <option value="有">有</option>
                                <option value="无">无</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <span class="blue">费用是否包含以下项目：</span>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">报名费：</label>
                        <div class="col-sm-7">
                            <select name="bmf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">入学测试费：</label>
                        <div class="col-sm-7">
                            <select name="rxcsf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">作业：</label>
                        <div class="col-sm-7">
                            <select name="zy" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">考试费：</label>
                        <div class="col-sm-7">
                            <select name="ksf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">论文答辩/评审：</label>
                        <div class="col-sm-7">
                            <select name="lwdbps" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">统考报名：</label>
                        <div class="col-sm-7">
                            <select name="tkbm" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">补考费：</label>
                        <div class="col-sm-7">
                            <select name="bkf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学位考试报名费：</label>
                        <div class="col-sm-7">
                            <select name="xwksbm" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">学位辅导费：</label>
                        <div class="col-sm-7">
                            <select name="xwfdf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right no-padding-left">照片采集费：</label>
                        <div class="col-sm-7">
                            <select name="zpcjf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">证书工本费：</label>
                        <div class="col-sm-7">
                            <select name="zsgbf" class="form-control">
                                <option value="包含">包含</option>
                                <option value="不包含">不包含</option>
                            </select>
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="col-sm-12 payment-split"><span class="blue">期次付费：</span></div>
                    <div class="col-sm-12 paymentIssue no-padding payment">
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-5 no-padding-right no-padding-left">
                                	第<span class="time">1</span> 次付款时间：
                            </label>
                            <div class="col-sm-7">
                                <input type="text" name="fksj" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-5 no-padding-right">付款金额：</label>
                            <div class="col-sm-7">
                                <input type="text" name="fkje" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-5 no-padding-right paymentRemark">备注：</label>
                            <div class="col-sm-7">
                                <input type="text" name="bz" class="form-control">
                            </div>
                        </div>
                        <i class="fa fa-plus-circle blue add-field addIssue control-label"></i>
                        <i class="fa fa-minus-circle danger add-field control-label"></i>
                    </div>
                    <hr class="wide">
                    <div class="form-group col-sm-12 returnStatus-split"><span class="blue">返款情况：</span></div>
                    <div class="col-sm-12 refundSituation no-padding returnStatus">
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-5 no-padding-right no-padding-left">
                                	第<span class="time">1</span>次返款比例：
                            </label>
                            <div class="col-sm-7">
                                <input type="text" name="fkbl" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="control-label col-sm-5 no-padding-right">返款时间：</label>
                            <div class="col-sm-7">
                                <input type="text" name="fktime" class="form-control">
                            </div>
                        </div>
                        <div class="form-group col-sm-4 padding-right-2">
                            <label class="control-label col-sm-5 no-padding-right paymentAmount">付款金额：</label>
                            <div class="col-sm-7">
                                <input type="text" name="fankuanje" class="form-control">
                            </div>
                        </div>
                        <i class="fa fa-plus-circle blue add-field addRebates control-label"></i>
                        <i class="fa fa-minus-circle danger add-field control-label"></i>

                        <div class="form-group col-sm-12">
                            <label class="control-label col-sm-2 no-padding-right common-label">备注：</label>
                            <div class="col-sm-10 common-10 no-padding-right remarks">
                                <input type="text" name="benzhu" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<input type="submit" class="btn btn-primary form-control" value="确定" />
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

<!-- 下拉框插件 -->
<script src="${ctx_static }/dep/bootstrap-select/js/bootstrap-select.min.js"></script>
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<!--上传文件插件-->
<%-- <script src="${ctx_static }/dep/uploader/uploader_bootstrap.js"></script>
<script src="${ctx_static }/dep/uploader/fileinput.min.js"></script> --%>
<script src="${ctx_static }/dep/fileinput/js/fileinput.min.js"></script>

<script src="${ctx_static }/home/configuration/js/contractManages.js?v=<%=Math.random() %>"></script>