<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>


<link href="${ctx_static }/home/configuration/css/partnerManage.css" rel="stylesheet">
                
<div class="row" id="partner">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
                <div class="widget-buttons">
                </div>
                <!--Widget Buttons-->
            </div>
            <!--Widget Header-->
            <div class="widget-body">
            
            <div class="widget-main ">
               <div class="tabbable">
                   <ul class="nav nav-tabs tabs-flat">
                       <li class="active">
                           <a data-toggle="tab" href="#rewards">合作方管理</a>
                       </li>
                       <li>
                           <a data-toggle="tab" href="#punishment">合同管理</a>
                       </li>
                       <li>
                           <a data-toggle="tab" href="#pun">合作方产品管理</a>
                       </li>
                   </ul>
                   <div class="tab-content tabs-flat">
                       <div id="rewards" class="tab-pane in active">
                           <div class="row row_padding form-horizontal">
                        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                            <div class="form-group col-lg-7 col-md-7 col-sm-7 no-margin-right">
                                <input type="text" class="form-control searchVal" 
                                       placeholder="合作方编号/合作单位名称/合作单位简称/首要联系人/联系方式" onkeydown="search();">
                            </div>
                            <div class="form-group col-lg-3 col-md-3 col-sm-3 no-margin-right">
                                <select class="form-control" name="status">
                                    <option value="">状态</option>
                                    <option value="0">禁用</option>
                                    <option value="1">启用</option>
                                </select>
                            </div>
                            <div class="form-group col-lg-2 col-md-2 col-sm-2">
                                <button type="button"
                                        class="btn increase form-control search-btn">
                                    <i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group pull-right">
                            <span class="btn btn-default pointer"
                                  title="View print view"><span>打印</span></span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle"
                                        data-toggle="dropdown">
                                    		导出
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">保存PDF</a></li>
                                    <li><a href="#">导出EXCEL</a></li>
                                    <li><a href="#">导出CSV</a></li>
                                </ul>
                            </div>
                            <button class="btn increase pull-right col-sm-4" data-toggle="modal"
                                    data-target=".partnerAdd" data-backdrop="static">
                                <i class="fa fa-plus"></i> 新增</button>
                        </div>
                    </div>
	                 <table id="partnerTable" class="table table-striped table-hover table-bordered dataTable no-footer">
	                            <thead>
	                            <tr role="row">
	                                <th width="5%">
	                                    <label>
	                                        <input type="checkbox" class="checkAll">
	                                        <span class="text"></span>
	                                    </label>
	                                </th>
	                                <th>合作方编号 </span>
	                                </th>
	                                <th>归属</th>
	                                <th>合作单位名称 </span>
	                                </th>
	                                <th>合作单位简称 </span>
	                                </th>
	                                <th>首要联系人 </span>
	                                </th>
	                                <th>联系方式 </span>
	                                </th>
	                                <th>状态 </span>
	                                </th>
	                                <th>操作</th>
	                            </tr>
	                            </thead>
	
	                            <tbody>
	                           
	                            </tbody>
	                        </table>
                		</div>
                       <div id="punishment" class="tab-pane">
                           <div class="col-lg-12 col-md-12 col-sm-12 no-padding" style="margin-bottom: 20px">
                               <div class="col-lg-2 col-md-2 col-sm-2">
                                    
                                   <input class="form-control" id="searchKey2" type="text" placeholder="合作方/签署人">
                               </div>
                               <div class="col-lg-3 col-md-3 col-sm-3">
                                    <label class="pull-left control-label" class="col-sm-6" style="height: 34px;line-height: 34px;padding-right: 15px">合同签署日期</label>
                                    <div class="input-group" class="col-sm-6">
                                            <input type="text" class="form-control applyDate" id="signDateString">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                       </div>
                               </div>
                               <div class="col-lg-3 col-md-3 col-sm-3">
                                    <label class="pull-left control-label" class="col-sm-6" style="height: 34px;line-height: 34px;padding-right: 15px">合同有效日期</label>
                                    <div class="input-group" class="col-sm-6">
                                            <input type="text" class="form-control applyDate" id="expireDateString">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                       </div>
                               </div>
                              <!--  <div class="col-lg-2 col-md-2 col-sm-2">
                                   <input class="form-control" type="text" placeholder="输入签署人">
                               </div> -->
                               <div class="col-lg-2 col-md-2 col-sm-2">
                                    <button id="" onclick="init2()" class="btn increase search-btn">搜索</button>
                               </div>
                           </div>
	                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="bizContract">
	                            <thead>
	                            <tr role="row">
	                            	<th>合作方</th>
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
	                            <tr>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td></td>
	                            	<td>
	                            	<a href="#" class="btn btn-warning btn-xs ck" data-toggle="modal" data-backdrop="static" data-target=".contractEdit"><i class="fa fa-folder-open-o"></i>查看</a>
	                            	</td>
	                            </tr>
	                            </tbody>
	                        </table>
                       </div>
                       <div id="pun" class="tab-pane">
                            <div class="col-lg-12 col-md-12 col-sm-12 no-padding" style="margin-bottom: 20px">
                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                         <div class="col-lg-4 col-md-4 col-sm-4">
                                        <input class="form-control" type="text" id="searchKey3" placeholder="合作方/合作编号/产品名称">
										</div>
										<div class="col-lg-2 col-md-2 col-sm-2">
	                                         <button id="" onclick="init3()" class="btn increase search-btn">搜索</button>
	                                    </div>                                    
                                    </div>
                                   <!--  <div class="col-lg-2 col-md-2 col-sm-2">
                                           <input class="form-control" type="text" placeholder="输入合作编号">
                                     </div> -->
                                    <!-- <div class="col-lg-3 col-md-3 col-sm-3">
                                            <div class="form-group counselCurriculum2">
                                                 <label class="col-lg-2 col-md-3 col-sm-3 control-label no-padding-right" style="height: 34px;line-height: 34px">产品模型</label>
                                                 <div class="col-lg-9 col-md-8 col-sm-8">
                                                     <select id="addProductModel2" class="form-control state-search">
                                                         <option value="">选择品牌</option>
                                                         <option value="1"></option>
                                                         <option value="0"></option>
                                                     </select>
                                                 </div>
                                             </div>
                                    </div> -->
                                 <div class="counselCurriculum2 form-group col-lg-12 col-md-12 col-sm-12" style="margin-top:20px">
				               		<div class="form-group col-lg-4 col-md-4 col-sm-4">
				                        <label class="control-label col-lg-3 col-md-3 col-sm-3 no-padding-right" style="height: 34px;line-height: 34px">产品模型</label>
				                        <div class="col-lg-9 col-md-9 col-sm-9  no-padding-right">
				                            <select name="productModelId2" id="addProductModel2" data-value="product_model" class="form-control addProductModel2 chosen-select">
				                            </select>
				                        </div>
				                    </div>
				                 </div>
                                    <!-- <div class="col-lg-2 col-md-2 col-sm-2">
                                        <input class="form-control" type="text" placeholder="输入产品名称">
                                    </div> -->
                                    
                                </div>


                           <div class="">
		                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="contractCetail">
		                            <thead>
		                            <tr role="row">
		                            	<th>合作方</th>
		                            	<th>合同编号</th>
		                                <th>产品模型</th>
		                                <th>产品</th>
		                                <th>考期</th>
		                                <th>总学费</th>
		                                <th>合作成本</th>
		                                <th>状态</th>
		                                <th>操作</th>
		                            </tr>
		                            </thead>
		                            <tr>
		                            	<td></td>
		                            	<td></td>
		                            	<td></td>
		                            	<td></td>
		                            	<td></td>
		                            	<td>
											<a href="#" class="btn btn-warning btn-xs ck" data-toggle="modal" data-backdrop="static" data-target=".productEdit"><i class="fa fa-folder-open-o"></i>查看</a>
										</td>
		                            </tr>
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
<%@ include file="../common/public_footer.jsp"%>
<!--合作方新增-->
<div class="modal fade partnerAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="partnerAdd" onsubmit="return validateForm()">
                
                	<input name="partnerId" type="hidden"/>
                	
                    <div class="form-group col-sm-6 margin-left-5">
                        <label class="control-label col-sm-4 no-padding-right">资源归属
							<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <select name="departmentId" class="form-control">
                            </select>
                            <span class="red absolute isEmpty">资源归属不能为空</span>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 margin-left">
                        <label class="control-label col-sm-4 no-padding-right">合作方编号
							<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input name="partnerCode" class="form-control">
                            <span class="red absolute isEmpty">合作方编号不能为空</span>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 margin-left-5">
                        <label class="control-label col-sm-4 no-padding-right">合作单位名称
							<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input name="partnerName" class="form-control">
                            <span class="red absolute isEmpty">合作单位名称不能为空</span>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 margin-left">
                        <label class="control-label col-sm-4 no-padding-right">合作单位简称
							<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7">
                            <input name="partnerShortName" class="form-control">
                            <span class="red absolute isEmpty">合作单位简称不能为空</span>
                        </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 no-padding-right">合作单位地址
							<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9 no-padding-right">
                            <input name="partnerAddress" class="form-control">
                            <span class="red absolute isEmpty">合作单位地址不能为空</span>
                        </div>
                    </div>
                    <hr class="wide contact-split">
                    <div class="col-sm-12 contactList">
                        <label class="control-label col-sm-2 no-padding-right">联系人名单
							<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <div class="col-sm-2 form-group no-padding">
                                <input name="type" value="首要" class="form-control" readonly="readonly">
                            </div>
                            <div class="col-sm-4 form-group ">
                                <input name="name" type="text" class="form-control" placeholder="联系人姓名">
                            </div>
                            <div class="col-sm-5 form-group no-padding-right">
                                <input name="tel" type="text" class="form-control telephone" placeholder="联系电话">
                                <span class="red absolute isEmpty">联系电话不能为空</span>
                                <span class="red absolute formatError">请填写正确的电话号码</span>
                            </div>
                            <i class="fa fa-plus-circle blue linkmanAdd control-label add-button"></i>
                            <i class="fa fa-minus-circle danger linkmanAdd control-label add-button" style="display:none;line-height: 33px;"></i>
                        </div>
                    </div>
                    <hr class="wide bankCard-split">
                    <div class="col-sm-12 bankCard">
                        <label class="control-label col-sm-2 no-padding-right">银行卡信息
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <div class="col-sm-2 form-group no-padding">
                                <input name="bank" type="text" class="form-control" placeholder="开户行">
                            </div>
                            <div class="col-sm-4 form-group">
                                <input name="detail" type="text" class="form-control" placeholder="开户行名称">
                            </div>
                            <div class="col-sm-2 form-group">
                                <input name="user" type="text" class="form-control" placeholder="开户人">
                            </div>
                            <div class="col-sm-3 form-group no-padding">
                                <input name="account" type="text" class="form-control account-number" placeholder="账号" style="padding:6px;">
                            	<span class="red absolute isEmpty">银行卡账号不能为空</span>
                                <span class="red absolute formatError">请填写正确的银行卡账号</span>
                            </div>
                            <i class="fa fa-plus-circle blue bankcardAdd control-label add-button"></i>
                            <i class="fa fa-minus-circle danger bankcardAdd control-label add-button" style="display:none;line-height: 33px;"></i>
                        </div>
                    </div>
                    <hr class="wide bankReturn-split">
                    <div class=" col-sm-12 rebates">
                        <label class="control-label col-sm-2 no-padding-right">返款账号信息
						<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-10">
                            <div class="col-sm-2 form-group no-padding">
                                <input name="bank_return" type="text" class="form-control" placeholder="开户行">
                            </div>
                            <div class="col-sm-4 form-group">
                                <input name="detail_return" type="text" class="form-control" placeholder="开户行名称">
                            </div>
                            <div class="col-sm-2 form-group">
                                <input name="user_return" type="text" class="form-control" placeholder="开户人">
                            </div>
                            <div class="col-sm-3 form-group no-padding">
                                <input name="account_return" type="text" class="form-control refund-account" placeholder="账号" style="padding:6px;">
                            	<span class="red absolute isEmpty">返款账号不能为空</span>
                                <span class="red absolute formatError">请填写正确的返款账号</span>
                            </div>
                            <i class="fa fa-plus-circle blue rebatesAccount control-label add-button"></i>
                            <i class="fa fa-minus-circle danger rebatesAccount control-label add-button" style="display:none;line-height: 33px;"></i>
                        </div>
                    </div>
                    <hr class="wide">
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <input type="submit" class="btn btn-primary form-control ensure-btn" value="确定">
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

<!--合同查看-->
<div class="modal fade contractEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
                
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <div class="contract">
                    <form class="form-horizontal" id="contractEdit">
                        <div class="form-group col-sm-6" style="margin-left:-50px;">
                            <label class="control-label col-sm-4 no-padding-right">合同编号</label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="updtContractCode" name="projectLevel" class="form-control" disabled>
                            	<input hidden id="updtcontractId" name="contractId" class="contractId"></input>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合同签署人</label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="updtSignUser" name="projectLevel" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-6" style="margin-left:-50px;">
                            <label class="control-label col-sm-4 no-padding-right">合同洽谈人</label>
                            <div class="col-sm-8 no-padding-right">
                                <input id="updtdiscussUser" name="projectLevel" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label col-sm-4 no-padding-right">合同起止日期</label>
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
                        	<label class="control-label col-md-2 col-sm-3  margin-left">上传合同</label>
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
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 合作方产品管理查看 -->
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
                             <a href="javascript:" class="blue addExam">
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
                    
                    <!-- <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="button" class="btn btn-primary form-control" onclick="subDetail()">确定</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                        </div>
                    </div> -->
                </form>
            </div>
        </div>
    </div>
</div>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/bootstrap-datepicker.js"></script>

<script>
//table初始化_
var InitiateSimpleDataTable = function () {

    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#partnerTable').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/bizPartner/getAll',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {
                        "mDataProp": "partnerId",
                        "bSortable": false,
                        'sClass': "text-center",
                        "mRender": function (data, type, full) {
                            return "<label> <input type='checkbox' class='slaver checkchild'> <span class='text'></span> </label>";
                        }
                    },
                    {"mDataProp": "partnerCode", "bSortable": true, 'sClass': "text-center"},
                    {"mDataProp": "sysDepartment.fullName", "bSortable": true, 'sClass': "text-center"},
                    {"mDataProp": "partnerName", "bSortable": true, 'sClass': "text-center"},
                    {"mDataProp": "partnerShortName", "bSortable": true, 'sClass': "text-center"},
                    {
                        "mDataProp": "contact",
                        "bSortable": false,
                        'sClass': "text-center",
                        "mRender": function (data, type, full) {
                            return JSON.parse(data)[0].name;
                        }
                    },
                    {
                        "mDataProp": "contact",
                        "bSortable": false,
                        'sClass': "text-center",
                        "mRender": function (data, type, full) {
                            return JSON.parse(data)[0].tel;
                        }
                    },
                    {
                        "mDataProp": "enable",
                        "bSortable": false,
                        'sClass': "text-center",
                        "mRender": function (data, type, full) {
                            return data ? '<a href="#" style="width: inherit" data-id="' + full.partnerId + '" class="btn btn-use btn-xs status-btn"><i class="fa fa-check-square-o"></i> 启用</a>' : '<a href="#" style="width: inherit" data-id="' + full.partnerId + '" class="btn btn-nouse btn-xs status-btn"><i class="fa fa-ban"></i> 禁用</a>';
                        }
                    },
                    {
                        "mDataProp": "partnerId",
                        "bSortable": false,
                        'sClass': "text-center",
                        "mRender": function (data, type, full) {
                            return "<a href='#' data-id='" + data + "' class='contract' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-list-alt blue' data-toggle='tooltip' data-placement='top' data-original-title='合同管理' title='合同管理'></i></a>" +
                                "<a href='#' data-record='" + JSON.stringify(full) + "' class='edit' "+(full.enable == 0 ? 'disabled' : '')+"> <i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>";
                        }
                    },
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],

            });

        }

    };

}();

durationDate('#duration11', '-');
durationDate('#duration12', '-');

$('#rewards').on('click','.dataTables_paginate .pagination li a',function(){
	$('.checkAll').attr('checked',false);
})
</script>

<script src="${ctx_static }/home/configuration/js/partnerManage.js?v=<%=Math.random()%>"></script>