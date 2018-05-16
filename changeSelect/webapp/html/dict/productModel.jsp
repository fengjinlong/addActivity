<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>

<link href="${ctx_static }/home/dataDictionary/css/productModel.css" rel="stylesheet">

 <div class="row page-wrapper">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="widget">
                           <div class="widget-header bordered-bottom bordered-blue">
				                 <span class="widget-caption">产品模型</span>
				            </div>
                            <!--Widget Header-->
                            <div class="widget-body">
                                <div class="widget-main">
                                    <div class="row row_padding form-horizontal">
                                        <div class="col-md-4 col-sm-4 col-xs-12">
                                        </div>
                                        <div class="col-md-3 col-sm-3 col-xs-12 btn-group graduation-btn pull-right">
                                            <!-- <div class="col-sm-6 pull-right text-right no-padding-right">
                                                <a class="btn increase addBtn" data-toggle="modal"
                                                        data-backdrop="static">
                                                    <i class="fa fa-plus"></i> 新增
                                                </a>
                                            </div> -->
                                        </div>
                                    </div>
                                    <div class="dataTables_wrapper form-inline no-footer">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-hover table-bordered dataTable no-footer" id="productModel">
                                                <thead>
                                                <tr>
                                                    <th>序号</th>
                                                    <th>名称</th>
                                                    <!-- <th>状态</th> -->
                                                    <th>操作</th>
                                                    <th>报名表格式</th>
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
            <!-- /Page Content -->
        </div>
        <!-- /Page Container -->
        <!-- Main Container -->
    </div>
</div>
<%@ include file="../common/public_footer.jsp"%>

<!--产品模型新增-->
<div class="modal fade product-model-add" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="productModelAdd">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-2 pull-left no-padding-right">产品模型名称</label>
                        <div class="col-sm-10">
                            <input name="productModelName" type="text" id="productModelName" class="form-control">
                        </div>
                    </div>
                        <%-- <div class="col-sm-12  field-table">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                <thead>
                                <th width="5%">
                                    <label>
                                        <input type="checkbox" class="checkAll">
                                        <span class="text"></span>
                                    </label>
                                </th>
                                <th>名称</th>
                                <th>字段名</th>
                                <th>排序</th>
                                </thead>
                                <tbody>
									<c:forEach items="${dataBasic }" var="e">
	                                	 <tr>
		                                    <td width="5%">
		                                        <label>
		                                            <input value="${e.dataBasicEnName }" type="checkbox" class="checkChild">
		                                            <span class="text"></span>
		                                        </label>
		                                    </td>
		                                    <td>${e.dataBasicName }</td>
		                                    <td>${e.dataBasicEnName }</td>
		                                    <td>${e.sortCode }</td>
	                                	</tr>
	                                </c:forEach>
                                </tbody>
                            </table>
                        </div> --%>
                        <div class="col-sm-12 modal-footer">
	                        <div class="col-sm-2 col-sm-offset-4">
	                            <button type="button" class="btn btn-primary form-control add-button">确定</button>
	                        </div>
	                        <div class="col-sm-2">
	                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
	                        </div>
                    	</div>
                    </div>
                 </form>
            </div>
        </div>
    </div>
</div>

<!--产品模型编辑-->
<div class="modal fade product-model-edit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="productModelEdit">
                    <div class="form-group col-sm-12">
                        <label class="control-label pull-left no-padding-right">产品模型名称：</label>
                        <div class="col-sm-10">
                            <input name="productModelName1" id="productModelName1"class="form-control">
                            <input name="productModelId1" id="productModelId1" type="hidden" />
                        </div>
                    </div>
                        <div class="col-sm-12  field-table">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                <thead>
                                <th width="5%">
                                    <label>
                                        <input type="checkbox" class="checkAll">
                                        <span class="text"></span>
                                    </label>
                                </th>
                                <th>名称</th>
                                <th>字段名</th>
                                <th>排序</th>
                                </thead>
                                <tbody>
	                             
                                </tbody>
                            </table>
                        </div>
                        <div class="form-group col-sm-12 modal-footer">
	                        <div class="col-sm-2 col-sm-offset-4">
	                            <button type="submit" class="btn btn-primary form-control edit-button">确定</button>
	                        </div>
	                        <div class="col-sm-2">
	                            <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
	                        </div>
	                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--产品模型查看-->
<div class="modal fade product-model-view" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">查看</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal clearfix" id="productModelView">
                    <div class="form-group col-sm-12">
                        <label class="control-label pull-left no-padding-right">产品模型名称：</label>
                        <div class="col-sm-10">
                            <input name="dictionaryName" class="form-control" value="职业资格产品模型" readonly>
                        </div>
                    </div>
                        <div class="col-sm-12  field-table">
                            <table class="table table-striped table-hover table-bordered dataTable no-footer">
                                <thead>
                                <th width="5%">
                                    <label>
                                        <input type="checkbox" class="checkAll">
                                        <span class="text"></span>
                                    </label>
                                </th>
                                <th>名称</th>
                                <th>字段名</th>
                                <th>排序</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td width="5%">
                                        <label>
                                            <input type="checkbox" class="checkChild">
                                            <span class="text"></span>
                                        </label>
                                    </td>
                                    <td>项目</td>
                                    <td>字段名</td>
                                    <td>排序</td>
                                </tr>
                                <tr>
                                    <td width="5%">
                                        <label>
                                            <input type="checkbox" class="checkChild">
                                            <span class="text"></span>
                                        </label>
                                    </td>
                                    <td>级别</td>
                                    <td>字段名</td>
                                    <td>排序</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    
<!-- 报名表格式 -->
<div class="modal fade entryFormModel" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="entryHtml">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">关闭</span></button>
                <span class="widget-caption">报名表格式</span>
            </div>
            <div class="modal-body clearfix sing_form">
            		<input name="productModelId2" id="productModelId2" type="hidden" />
               	<div class="entryForm col-md-12 clearfix">
               		<div class="entryForm-title">
	                     <div class="col-md-4 logobox padding-left-30 padding-top-10 padding-bottom-10">
	                              <img src="${ctx_static }/home/consultcenter/image/logo-sm.png" alt="">
	                          </div>
	                          <div class="col-md-4 text-center margin-bottom-10">
	                              <h3>学员信息表</h3>
	                          </div>
	                      </div>
                    </div>                  
                    
                	<div class="entryForm-body dowebok" style="margin-top:60px">
                	
                		<div class="drig-box clearfix item personal-detailss">
                            <div class="containers">
                                    <div style="display:none">
                                        <ul id="foo" class="block__list block__list_words">
                                            <!--不能动-->
                                        </ul>
                                    </div>
                                
                                    <div style="width:100%">
                                        <div class="list-module">
                                        <h4 class="block-title" style="margin:0">个人信息
                                                </h4>
                                            <ul class="block__list block__list_tags block-bar1 personal-details">                                               
                                                <!-- <li class="dataList-li">
                                                    <i class="dataList-text">学员姓名</i>:
                                                    <i>张三</i>
                                                    <i class="fa fa-minus-square remove-li1"></i>
                                                </li> -->
                                            </ul>
                                        </div>
                                        
                                    </div>
                            </div>
                    </div>
                    
                    
                    <div class="drig-box clearfix item course-informationn">
                            <div class="containers">
                                    <div style="display:none">
                                        <ul id="foo" class="block__list block__list_words">
                                            <!--不能动-->
                                        </ul>
                                    </div>
                                
                                    <div style="width:100%">
                                        
                                        <div class="list-module">
                                        <h4 class="block-title" style="margin:0">课程信息
                                                </h4>
                                            <ul class="block__list block__list_tags block-bar2 course-information">
                                                
                                                <!-- <li class="dataList-li">
                                                    <i class="dataList-text">类型</i>:
                                                    <i>1234567</i>
                                                    <i class="fa fa-minus-square remove-li2"></i>
                                                </li> -->
                                            </ul>
                                        </div>
                                    </div>
                            </div>
                    </div>
                		
                	
                		     
                		   		<div class="payment item">   
                		   		<table class="table table-bordered text-center">                        
                                <tbody class="list-module">
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" class="block-title">缴费信息
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>收费项目</td>
                                        <td colspan="2">应缴</td>
                                        <td colspan="2">实缴</td>
                                        <td colspan="2">支付方式</td>
                                        <td width="20%">欠费</td>
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
                                </tbody>
                                </table>
                                </div>
                                <div class="Brochure-Release">
                                <table class="table table-bordered text-center">
                                <tbody class="list-module">
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" class="block-title">资料领取
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="10%">教材</td>
                                        <td width="20%"></td>
                                        <td width="10%">教辅</td>
                                        <td width="25%"></td>
                                        <td width="10%">未领取</td>
                                        <td width="35%" colspan="3"></td>
                                    </tr>
                                </tbody>
                                </table>
                                </div>
                                <div class="learning-center">
                                <table class="table table-bordered text-center">
                                <tbody class="list-module ">
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8" class="block-title">学习中心
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>用户名</td>
                                        <td></td>
                                        <td>初始密码</td>
                                        <td></td>
                                        <td width="10%">网址</td>
                                        <td colspan="3"></td>
                                    </tr>
                                    <tr style="height:150px">
                                        <td>说明</td>
                                        <td colspan="7" style="text-align:left"></td>
                                    </tr>
                                </tbody>
                                </table>
                                </div>
                                <table class="table table-bordered text-center">
                                <tbody>
                                    <tr class="text-center bg-darkgray">
                                        <td colspan="8">培训项目服务协议</td>
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
                                    <tr style="border:none;">
                                        <td colspan="3" style="border:none;padding-left:47px;text-align:left;">甲方：北京学慧网教育科技有限公司 </td>
                                        <td colspan="3" style="border:none"></td>
                                        <td colspan="2" class="pull-left" style="border:none;">乙方（签字）：</td>
                                    </tr>
                                    </tbody>
                                </table>
                		
                	</div>
            </div>
            <div class="modal-footer">
                <div class="col-sm-2 col-sm-offset-4">
                    <button type="button" class="btn btn-primary form-control setting-button">确定</button>
                </div>
                <div class="col-sm-2">
                    <button type="button" class="btn btn-danger form-control" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>    
	</div>
       
	<div class="dataList-box" >
        <div class="panel-group accordion" id="accordions">
            <div class="panel panel-default">
                <div class="panel-heading" style="position:relative">
                    <h4 class="panel-title">
                        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordions" href="#collapseOnes" aria-expanded="false">
                            个人信息
                        </a>
                    </h4>
                </div>
                <div id="collapseOnes" class="panel-collapse collapse" aria-expanded="false" style="max-height:300px;overflow-y:auto">
                	<div class="well" style="padding:10px;margin:0;height:40px;">
                		<div class="well-left" style="float:left;width:50px;height:40px">
                			<i class="fa fa-eye sky data-show pd-show"></i>
                			<i class="fa fa-eye-slash sky data-hide pd-hide"></i>
                		</div>
                		<div class="well-right" style="float:right;width:60px;height:40px">
                			<i class="fa fa-pencil-square-o sky remove-data1" style="font-size:20px;cursor:pointer"></i>
                			<i class="fa fa-check-square-o sky detail-hide1" style="font-size:20px;cursor:pointer"></i>
                		</div>
                	</div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">学员姓名</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            <input type="hidden" class="studentName" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">性别</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            <input type="hidden" class="studentSex" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">年龄</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            <input type="hidden" class="age" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">证件类型</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            <input type="hidden" class="idcardType" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">证件号码</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            <input type="hidden" class="idcard" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">所在地</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            <input type="hidden" class="phoneBelong" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">毕业院校</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="bySchool" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">最高学历</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="studentAttrName32" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">专业</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="byZy" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">民族</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="nation" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">Email</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="email" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">手机</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="studentPhone" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">QQ号</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="tengXun" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">微信</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="weChat" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">其他联系方式</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="ortherPhone" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">通讯地址</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="phoneAddress" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">工作单位</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="workSpace" name="abc">
                        </span>
                    </div>
                    <div class="well" style="padding:10px;margin:0;height:40px;">
                        <i class="dataList-text1" style="display:block;float:left">紧急联系人</i>
                        <span class="add-remove1" style="display:block;float:right">
                            <i class="fa fa-plus-square-o add-data1" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           <input type="hidden" class="emergencyContact" name="abc">
                        </span>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordions" href="#collapseTwos" aria-expanded="false">
                            课程信息
                        </a>
                    </h4>
                </div>
                <div id="collapseTwos" class="panel-collapse collapse" aria-expanded="false" style="max-height:300px;overflow-y:auto">
                		<div class="well" style="padding:10px;margin:0;height:40px;">
                			<div class="well-left" style="float:left;width:50px;height:40px">
                				<i class="fa fa-eye sky data-show ci-show"></i>
	                			<i class="fa fa-eye-slash sky data-hide ci-hide"></i>
                			</div>
	                		<div class="well-right" style="float:right;width:60px;height:40px">
	                			<i class="fa fa-pencil-square-o sky remove-data2" style="font-size:20px;cursor:pointer"></i>
	                			<i class="fa fa-check-square-o sky detail-hide2" style="font-size:20px;cursor:pointer"></i>
	                		</div>
	                	</div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">产品模型</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                                <input type="hidden" class="productModelName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">授课形式</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="aiteachformName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">项目</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="aiprojectName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">院校</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="aiprojectName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">专业</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="aimajorName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">课程形式</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="aicourseformName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">产品</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                             	<input type="hidden" class="productName" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">子产品</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                           		<input type="hidden" class="childrenProduct" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">收款方</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="payee" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">考期</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="kTime" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">考试地区</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="branchSchoolId" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">优惠码</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="activityCode" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">积分</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="integral" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">折扣</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="discount" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">服务类型</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="service" name="abc">
                            </span>
                        </div>
                        <div class="well" style="padding:10px;margin:0;height:40px;">
                            <i class="dataList-text2" style="display:block;float:left">报名方式</i>
                            <span class="add-remove2" style="display:block;float:right">
                                <i class="fa fa-plus-square-o add-data2" style="color:skyblue;font-size:24px;cursor:pointer"></i>
                            	<input type="hidden" class="infoType" name="abc">
                            </span>
                        </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" style="position:relative">
                    <h4 class="panel-title">
                        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordions" href="#collapseThrees" aria-expanded="false">
                        	缴费信息
                        </a>
                    </h4>
                </div>
                <div id="collapseThrees" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                	<div class="well" style="padding:10px;margin:0;height:40px;">
                		<i class="fa fa-eye sky data-show p-show"></i>
                		<i class="fa fa-eye-slash sky data-hide p-hide"></i>
                	</div>
                    
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" style="position:relative">
                    <h4 class="panel-title">
                        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordions" href="#collapseFours" aria-expanded="false">
                        	资料领取
                        </a>
                    </h4>
                </div>
                <div id="collapseFours" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                	<div class="well" style="padding:10px;margin:0;height:40px;">
                		<i class="fa fa-eye sky data-show br-show"></i>
                		<i class="fa fa-eye-slash sky data-hide br-hide"></i>
                	</div>
                    
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" style="position:relative">
                    <h4 class="panel-title">
                        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordions" href="#collapseFives" aria-expanded="false">
                        	学习中心
                        </a>
                    </h4>
                </div>
                <div id="collapseFives" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                	<div class="well" style="padding:10px;margin:0;height:40px;">
                		<i class="fa fa-eye sky data-show lc-show"></i>
                		<i class="fa fa-eye-slash sky data-hide lc-hide"></i>
                	</div>
                    
                </div>
            </div>
        </div>
    </div>

</div>

<script src="${ctx_static }/home/dataDictionary/js/productModel.js?v=<%=Math.random() %>"></script>

<!--报名表-->
<script src="${ctx_static }/home/dataDictionary/js/Sortable.js"></script>
<script src="${ctx_static }/home/dataDictionary/js/applicationForm-app.js"></script> 
<script src="${ctx_static }/home/dataDictionary/js/jquery.dad.min.js"></script>
