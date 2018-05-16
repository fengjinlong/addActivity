<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

<link rel="stylesheet" href="${ctx_static }/dep/chosen/css/chosen.css">
<link href="${ctx_static }/home/configuration/css/examinationFee.css" rel="stylesheet">

<div class="row">
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
                    <div class="row row_padding form-horizontal">
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <div class="form-group">
                                <label class="col-lg-2 col-md-3 col-sm-3 control-label no-padding-right">日期</label>
                                <div class="col-lg-10 col-md-9 col-sm-9">
                                    <div class="controls">
                                        <div class="input-group date">
                                            <input type="text" class="form-control beginAndEnd" id="reservation">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group col-lg-4 col-md-6 col-sm-4 no-margin-right">
                                <input type="text" class="form-control" placeholder="分校/项目/级别" id="searchVal" onkeydown="search();">
                            </div>
                            <div class="form-group col-lg-3 col-md-4 col-sm-4 no-margin-right">
                                <select class="form-control" name="status" id="enable">
                                    <option value="">状态</option>
                                    <option value="0">禁用</option>
                                    <option value="1">启用</option>
                                </select>

                            </div>
                            <div class="form-group col-lg-2 col-md-3 col-sm-4">
                                <a type="button" class="btn increase form-control search-btn" href="javascript:DataTable.init();">
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
                                    <li><a href="#">保存PDF</a></li>
                                    <li><a href="#">导出EXCEL</a></li>
                                    <li><a href="#">导出CSV</a></li>
                                </ul>
                            </div>
                            <shiro:hasPermission name='bizExaminationFee:add'>
                            <button class="btn increase pull-right col-sm-4" data-toggle="modal" data-target=".examinationAdd" data-backdrop="static">
                                <i class="fa fa-plus"></i> 新增
                            </button>
                            </shiro:hasPermission>
                        </div>
                    </div>
                    <!-- <div class="table-scrollable"> -->
                        <table class="table table-striped table-hover table-bordered dataTable no-footer" id="examinationFee">
                            <thead>
                            <tr role="row">
                                <th width="5%">
                                    <label>
                                        <input type="checkbox" class="checkAll">
                                        <span class="text"></span>
                                    </label>
                                </th>
                                <th>分校名称</th>
                                <th>项目名称</th>
                                <th>项目级别</th>
                                <th>开始日期</th>
                                <th>结束日期</th>
                                <th>考务费总计</th>
                                <th>分校服务费</th>
                                <th>合作方服务费</th>
                                <th>官方考试费</th>
                                <th>理论补考</th>
                                <th>实操补考</th>
                                <th>综合评审补考</th>
                                <th>状态 </th>
                                <th>操作 </th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    <!-- </div> -->
                </div>

            </div>

        </div>
    </div>

</div>

<!--新增-->
<div class="modal fade examinationAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="examinationAdd-body">
                <form class="form-horizontal" id="examinationAdd" method="post">
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">所属分校<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <select id="departmentId" name="departmentId" class="form-control departmentId"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">所属项目<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <select id="projectId" name="projectId" class="form-control projectId chosen-select"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">项目级别<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <select id="projectLevelId" name="projectLevelId" class="form-control projectLevelId"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">考试地区<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <input name="cityName" id="cityName" class="form-control cityName" placeholder="请选择">
                        	<input hidden id="addressId" name="addressId" class="addressId"></input>
                        	<div class="attribution">
						         <div class="modal-dialog modal-sm">
					                    <div class="modal-content">
					                        <div class="attribution-body">
					                            <div class="form-horizontal" id="resetAds">
					                                <div class="form-group">
					                                    <label class="control-label col-sm-2 no-padding-right">省份</label>
					                                    <div class="col-sm-10">
					                                        <select name="province" id="province" class="form-control province chosen-select"  data-placeholder="--请选择--" tabindex="1">
					                                        	 <option value="0">--请选择--</option>
					                                        </select>
					                                    </div>
					                                </div>
					                                <div class="form-group">
					                                    <label class="control-label col-sm-2 no-padding-right">城市</label>
					                                    <div class="col-sm-10">
					                                        <select name="city" id="city" class="form-control city chosen-select"  data-placeholder="--请选择--" tabindex="1">
					                                        	  <option value="0">--请选择--</option>
					                                        </select>
					                                    </div>
					                                </div>
					                                <div class="form-group modal-footer">
					                                    <div class="col-sm-2 col-sm-offset-3 margin-right-20">
					                                    	<button type="button" class="btn btn-primary btn-md confirm-btn">确定
					                                        </button>
					                                    </div>
					                                    <div class="col-sm-2">
					                                        <button type="button" class="btn btn-danger btn-md cancel-btn"> 取消</button>
					                                    </div>
					                                </div>
					                            </div>
					                        </div>
					                    </div>
						          </div>
						    </div>               	
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">渠道名称</label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <input id="channel" name="channel" type="text" class="form-control channel">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">考务费总计</label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="totalFee" name="totalFee" type="text" class="form-control totalFee" readonly="readonly" value="0">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">分校服务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="serviceFee" name="serviceFee" type="text" class="form-control serviceFee" placeholder="0" onchange="sum()">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">合作方服务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <input id="partnerFee" name="partnerFee" type="text" class="form-control partnerFee" placeholder="0" onchange="sum()">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">官方考试费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="officialFee" name="officialFee" type="text" class="form-control officialFee" placeholder="0" onchange="sum()">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">理论补考费</label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="theoryFee" name="theoryFee" type="text" class="form-control theoryFee" placeholder="0">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">实操补考费</label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <input id="operationFee" name="operationFee" type="text" class="form-control operationFee" placeholder="0">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">综合评审补考费</label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="synthesizeFee" name="synthesizeFee" type="text" class="form-control synthesizeFee" placeholder="0">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 active-time">
                        <label class="control-label col-sm-2 no-padding-right">有效时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6">
                            <div class="input-group date">
                                <input id="beginAndEnd" name="beginAndEnd" type="text" class="form-control beginAndEnd">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary form-control">确定</button>
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
<!--编辑-->
<div class="modal fade examinationEdit" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="examinationEdit-body">
                <form class="form-horizontal" id="examinationEdit" method="post">
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">所属分校<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <select id="updtdepartmentId" name="departmentId" class="form-control"></select>
                            <input hidden id="updtexaminationFeeId" name="examinationFeeId" class="examinationFeeId"></input>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">所属项目<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <select id="updtprojectId" name="projectId" class="form-control chosen-select"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">项目级别<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <select id="updtprojectLevelId" name="projectLevelId" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">考试地区<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <input name="cityName" id="updtcityName" class="form-control cityName">
                        	<input hidden id="updtaddressId" name="addressId" class="addressId"></input>
                        	<div class="attribution">
				                <div class="modal-dialog modal-sm">
				                    <div class="modal-content">
				                        <div class="attribution-body">
				                        	<div class="form-horizontal" id="resetAds">
				                                <div class="form-group">
				                                    <label class="control-label col-sm-2 no-padding-right">省份</label>
				                                    <div class="col-sm-10">
				                                        <select id="updtprovince" name="province" class="form-control province chosen-select"  data-placeholder="--请选择--" tabindex="1">                                      
				                                        	<option value="0">--请选择--</option>
				                                        </select>
				                                    </div>
				                                </div>
				                                <div class="form-group">
				                                    <label class="control-label col-sm-2 no-padding-right">城市</label>
				                                    <div class="col-sm-10">
				                                        <select id="updtcity" name="city" class="form-control city chosen-select" data-placeholder="--请选择--" tabindex="1">
				                                        	<option value="0">--请选择--</option>
				                                        </select>
				                                    </div>
				                                </div>
				                                <div class="form-group modal-footer">
				                                    <div class="col-sm-2 col-sm-offset-3 margin-right-20">
				                                    	<button type="button" class="btn btn-primary btn-md confirm-btn">确定</button>
				                                    </div>
				                                    <div class="col-sm-2">
				                                        <button type="button" class="btn btn-danger btn-md cancel-btn" >取消</button>
				                                    </div>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">渠道名称</label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <input id="updtchannel" name="channel" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">考务费总计</label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="updttotalFee" name="totalFee" type="text" class="form-control" readonly="readonly">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">分校服务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="updtserviceFee" name="serviceFee" type="text" class="form-control serviceFee" onchange="updtsum()">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right">合作方服务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <input id="updtpartnerFee" name="partnerFee" type="text" class="form-control partnerFee" onchange="updtsum()">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right">官方考试费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="updtofficialFee" name="officialFee" type="text" class="form-control officialFee" onchange="updtsum()">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">理论补考费</label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="updttheoryFee" name="theoryFee" type="text" class="form-control theoryFee">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-5 no-padding-right padding-right-5">实操补考费</label>
                        <div class="col-sm-7 no-padding-right padding-left-5">
                            <input id="updtoperationFee" name="operationFee" type="text" class="form-control operationFee">
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">综合评审补考费</label>
                        <div class="col-sm-6 no-padding-right">
                            <input id="updtsynthesizeFee" name="synthesizeFee" type="text" class="form-control synthesizeFee">
                        </div>
                    </div>
                    <div class="form-group col-sm-12 active-time">
                        <label class="control-label col-sm-2 no-padding-right">有效时间<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-6">
                            <div class="input-group date">
                                <input id="updtbeginAndEnd" name="beginAndEnd" type="text" class="form-control beginAndEnd">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>


                    <div class="form-group modal-footer">
                        <div class="col-sm-2 col-sm-offset-4">
                        	<button type="submit" class="btn btn-primary form-control">确定</button>
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
<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>

<script>
//考务费初始化数据
var DataTable = function(){
	return{
		init: function(){
			var Table = $('#examinationFee').dataTable({
				"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizExaminationFee/load',
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
         			                "mData": "examinationFeeId", 'sClass': "text-center", "bSortable": false, "mRender": function (data, type, full) {
         			                return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
         			            }
         			            },
         			            {"mData": "sysDepartment.fullName", 'sClass': "text-center"},
         			            {"mData": "bizProject.fullName", 'sClass': "text-center"},
         			            {"mData": "bizProjectLevel.levelTitle", 'sClass': "text-center"},
         			            {"mData": "minDate", 'sClass': "text-center"},
         			            {"mData": "maxDate", 'sClass': "text-center"},
         			            {"mData": "totalFee", 'sClass': "text-center"},
         			            {"mData": "serviceFee", 'sClass': "text-center"},
         			            {"mData": "partnerFee", 'sClass': "text-center"},
         			            {"mData": "officialFee", 'sClass': "text-center"},
         			            {"mData": "theoryFee", 'sClass': "text-center"},
         			            {"mData": "operationFee", 'sClass': "text-center"},
         			            {"mData": "synthesizeFee", 'sClass': "text-center"},
         			            {"mData": "enable", 'sClass': "text-center","bSortable": false,"mRender":function(data, type, full ){
         			            	if(data==0){
         			          		  return '<span id="span'+full["examinationFeeId"]+'" onclick="chooseStudent(\''+full["examinationFeeId"]+'\')" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
         			          	  }else{
         			          		  return '<span id="span'+full["examinationFeeId"]+'" onclick="chooseStudent(\''+full["examinationFeeId"]+'\')" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
         			          	  }
         			            }},
         			            {
         			                "mData": "examinationFeeId",
         			                'sClass': "text-center",
         			                "bSortable": false,
         			                "mRender": function (data, type, full ) {
         			                    var u = '<shiro:hasPermission name="bizExaminationFee:edit"><a onclick="edit(\''+full["examinationFeeId"]
		         			           +'\',\''+full["departmentId"]
         			                   +'\',\''+full["projectId"]
         			                   +'\',\''+full["projectLevelId"]
         			                   +'\',\''+full["cityName"]
         			                   +'\',\''+full["addressId"]
         			                   +'\',\''+full["channel"]
         			                   +'\',\''+full["totalFee"]
         			                   +'\',\''+full["serviceFee"]
         			                   +'\',\''+full["partnerFee"]
         			                   +'\',\''+full["officialFee"]
         			                   +'\',\''+full["theoryFee"]
         			                   +'\',\''+full["operationFee"]
         			                   +'\',\''+full["synthesizeFee"]
         			                   +'\',\''+full["minDate"]
		         			           +'\',\''+full["maxDate"]+'\')" class="edit" data-toggle="modal" data-target=".examinationEdit" data-backdrop="static" '+(full.enable == 0 ? "disabled" : "")+'><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a></shiro:hasPermission>';
         			                return u;
         			                }
         			            }
         			        ],
         			       "aoColumnDefs": [{
          		   	            sDefaultContent: '',
          		   	            aTargets: ['_all']
          		   	        }],
			})
		}
	}
}();

</script>

<script src="${ctx_static }/dep/chosen/js/chosen.jquery.js"></script>
<script src="${ctx_static }/home/configuration/js/examinationFee.js"></script>

