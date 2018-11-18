<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/public_header_main.jsp"%>
<%@ include file="../../common/public_header.jsp"%>
<link rel="stylesheet" href="${ctx_static }/home/sysconf/css/dictionary.css">

<div class="row page-wrapper">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                 <span class="widget-caption">区域属性</span>
            </div>
            <!--Widget Header-->
            <div class="widget-body">
                <div class="widget-main ">
                    <div class="tabbable">
                        <ul class="nav nav-tabs tabs-flat">
                            <li class="active">
                                <a data-toggle="tab" href="#shengfen">
                                    	省份管理
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#city">
                                   	 城市管理
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#area">
                                    	区县管理
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content tabs-flat">
                            <div id="shengfen" class="tab-pane in active">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                            <input type="text" class="form-control" id="searchVal1"
                                                   placeholder="编码/名称/简称/国家" onkeydown="search(1);">
                                        </div>
                                        <div class="form-group col-lg-2 col-md-4 col-sm-4">
                                            <button type="button"
                                                    onclick="toSearch(1)" class="btn increase form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>

                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                                                 <!-- <span class="btn btn-default pointer"
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
                                        </div> -->
                                         <span id="provinceAdd" class="btn increase pull-right col-sm-4"
                                               data-toggle="modal"
                                               data-target=".bs-example-modal-lg"><i
                                                 class="fa fa-plus"></i> 新增 </span>
                                    </div>
                                </div>
                                <table id="table1"
                                       class="table table-striped table-hover table-bordered dataTable no-footer">
                                    <thead>
                                    <tr role="row">
                                        <th>省份编号</th>
                                        <th>省份名称</th>
                                        <th>省份简称</th>
                                        <th>所属国家</th>
                                        <th>拼音码</th>
                                        <th>首字母</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="city" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                            <input type="text" class="form-control" id="searchVal2"
                                                   placeholder="编码/名称" onkeydown="search(2);">
                                        </div>
                                        <div class="form-group col-lg-2 col-md-3 col-sm-4">
                                            <button type="button"
                                                    onclick="toSearch(2)" class="btn increase form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>

                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                                                 <!-- <span class="btn btn-default pointer"
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
                                        </div> -->
                                         			<span class="btn increase pull-right col-sm-4" data-toggle="modal"
                                                          data-target=".bs-city-modal-lg">
                                               		<i class="fa  fa-plus"></i> 新增 </span>
                                    </div>
                                </div>

                                <table id="table2"
                                       class="table table-striped table-hover table-bordered dataTable no-footer">
                                    <thead>
                                    <tr role="row">
                                        <th>城市编号</th>
                                        <th>城市名称</th>
                                        <th>区县简称</th>
                                        <th>所属省份</th>
                                        <th>拼音码</th>
                                        <th>首字母</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="area" class="tab-pane">
                                <div class="row row_padding form-horizontal">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group col-lg-6 col-md-6 col-sm-8 no-margin-right">
                                            <input type="text" class="form-control" id="searchVal3"
                                                   onkeydown="search(3);"
                                                   placeholder="编码/名称">
                                        </div>
                                        <div class="form-group col-lg-2 col-md-3 col-sm-4">
                                            <button type="button" onclick="toSearch(3)"
                                                    class="btn increase form-control search-btn">
                                                <i class="fa fa-search"></i> 搜索
                                            </button>

                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-4 col-sm-5 col-lg-offset-3 col-md-offset-2 col-xs-12 btn-group">
                                                 <!-- <span class="btn btn-default pointer"
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
                                        </div> -->
                                        				 <span class="btn increase pull-right col-sm-4"
                                                               data-toggle="modal"
                                                               data-target=".bs-area-modal-lg"> 
                                               			<i class="fa  fa-plus"></i> 新增
                                               		 </span>
                                    </div>
                                </div>

                                <table id="table3"
                                       class="table table-striped table-hover table-bordered dataTable no-footer">
                                    <thead>
                                    <tr role="row">
                                        <th>区县编号</th>
                                        <th>区县名称</th>
                                        <th>区县简称</th>
                                        <th>所属城市</th>
                                        <th>拼音码</th>
                                        <th>首字母</th>
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
            <!--Widget-->
        </div>
    </div>
</div>

<%@ include file="../../common/public_footer.jsp"%>

<!--新增省份-->
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增省份信息</span>
            </div>
            <form name="provinceForm" id="provinceForm" method="post" class="form-horizontal" action="${ctx }/dictionary/addNewUser">
            <div class="modal-body  form-horizontal clearfix">
                <div class="form-group text-center">
                    <label class="col-sm-1 control-label no-padding-right">编号</label>
                    <div class="col-sm-10">
                            <input name="addressId" type="text" class="form-control">
                            <input name="level" hidden value="1" type="text" >
                            <input name="enable" hidden value="1" type="text" >
                            <input name="deleteMark" hidden value="1" type="text" >
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">名称</label>
                    <div class="col-sm-10">
                        <input name="fullName" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">简称</label>
                    <div class="col-sm-10">
                        <input name="simpleName" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">上级</label>
                    <div class="col-sm-10">
                        <input name="parentId" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">拼音</label>
                    <div class="col-sm-10">
                        <input name="phonetic" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">首字母</label>
                    <div class="col-sm-10">
                        <input name="fitstWord" type="text" class="form-control">
                    </div>
                </div>

                <div class="form-group col-sm-12">
                    <div class="col-sm-2 col-sm-offset-4">
                       <button type="submit"  class="btn btn-primary form-control">确认</button>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal" aria-hidden="true">取消</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    </div>
</div>

<!--修改省份-->
<div class="modal fade bs-exampleUpdate-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                 <span class="widget-caption">编辑省份信息</span>
            </div>
            <form name="provinceUpdateForm" id="provinceUpdateForm" method="post" class="form-horizontal" action="${ctx }/dictionary/addNewUser">
            <div class="modal-body  form-horizontal clearfix">
                <div class="form-group text-center">
                    <label class="col-sm-1 control-label no-padding-right">编号</label>
                    <div class="col-sm-10">
                            <input readonly="readonly" id="pUpdateAddressId" name="addressId" type="text" class="form-control">
                            <input id="pUpdateLevel" name="level" hidden value="1" type="text" >
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">名称</label>
                    <div class="col-sm-10">
                        <input id="pUpdateFullName" name="fullName" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">简称</label>
                    <div class="col-sm-10">
                        <input id="pUpdateSimpleName" name="simpleName" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">上级</label>
                    <div class="col-sm-10">
                        <input  value="0" readonly="readonly" name="parentId" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">拼音</label>
                    <div class="col-sm-10">
                        <input id="pUpdatePhonetic" name="phonetic" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">首字母</label>
                    <div class="col-sm-10">
                        <input id="pUpdateFirstWord" name="firstWord" type="text" class="form-control">
                    </div>
                </div>

                <div class="form-group col-sm-12">
                   
                  <div class="col-sm-2 col-sm-offset-4">
                       <button type="submit"  class="btn btn-primary form-control">确认</button>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal" aria-hidden="true">取消</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    </div>
</div>

<!--市级添加-->
<div class="modal fade bs-city-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header  bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增市级信息</span>
            </div>
            <form name="cityForm" id="cityForm" method="post" class="form-horizontal" >
            <div class="modal-body  form-horizontal clearfix">
                <div class="form-group text-center">
                    <label class="col-sm-1 control-label no-padding-right">编号</label>
                    <div class="col-sm-10">
                            <input name="addressId" type="text" class="form-control">
                            <input name="level" hidden value="2" type="text" >
                            <input name="enable" hidden value="1" type="text" >
                            <input name="deleteMark" hidden value="1" type="text" >
                            <input id="city_country" name="country" hidden  type="text" >
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">名称</label>
                    <div class="col-sm-10">
                        <input name="fullName" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">简称</label>
                    <div class="col-sm-10">
                        <input name="simpleName" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">上级</label>
                    <div class="col-sm-10">
                        <select name="parentId" id="province2"  class="form-control"></select>
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">拼音</label>
                    <div class="col-sm-10">
                        <input name="phonetic" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">首字母</label>
                    <div class="col-sm-10">
                        <input name="fitstWord" type="text" class="form-control">
                    </div>
                </div>

                <div class="form-group col-sm-12">
                   
                  <div class="col-sm-2 col-sm-offset-4">
                       <button type="submit"  class="btn btn-primary form-control">确认</button>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal" aria-hidden="true">取消</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    </div>
</div>	

<!--市级编辑-->
<div class="modal fade bs-cityUpdate-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header  bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">编辑市级信息</span>
            </div>
            <form name="cityUpdateForm" id="cityUpdateForm" method="post" class="form-horizontal" >
            <div class="modal-body  form-horizontal clearfix">
                <div class="form-group text-center">
                    <label class="col-sm-1 control-label no-padding-right">编号</label>
                    <div class="col-sm-10">
                            <input readonly="readonly" id="cUpdateAddressId" name="addressId" type="text" class="form-control">
                            <input name="level" hidden value="2" type="text" >
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">名称</label>
                    <div class="col-sm-10">
                        <input id="cUpdateFullName" name="fullName" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">简称</label>
                    <div class="col-sm-10">
                        <input id="cUpdateSimpleName" name="simpleName" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">上级</label>
                    <div class="col-sm-10">
                     	<label class="pull-left control-label">从</label>
	                    <div class="col-md-3">
	                    	<input id="cUpdateCountry" name="country" type="text"  class="form-control">
	                    </div>
	                    <input hidden id="cUpdateParentId" name="parentId" type="text" >
                    	<label class="pull-left control-label">修改到</label>
                    	  <div class="col-md-3">
	                    	<select  id="provinceUpdate2" class="form-control"></select>
	                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">拼音</label>
                    <div class="col-sm-10">
                        <input id="cUpdatePhonetic" name="phonetic" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">首字母</label>
                    <div class="col-sm-10">
                        <input id="cUpdateFirstWord" name="firstWord" type="text" class="form-control">
                    </div>
                </div>

                <div class="form-group col-sm-12">
                    
                  <div class="col-sm-2 col-sm-offset-4">
                       <button type="submit"  class="btn btn-primary form-control">确认</button>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal" aria-hidden="true">取消</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    </div>
</div>					

<!--县级添加-->
<div class="modal fade bs-area-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header  bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">新增县级信息</span>
            </div>
            <form name="areaForm" id="areaForm" method="post" class="form-horizontal" >
            <div class="modal-body  form-horizontal clearfix" >
                <div class="form-group text-center">
                    <label class="col-sm-1 control-label no-padding-right">编号</label>
                    <div class="col-sm-10">
                            <input name="addressId" type="text" class="form-control">
                            <input name="level" hidden value="3" type="text" >
                            <input name="enable" hidden value="1" type="text" >
                            <input name="deleteMark" hidden value="1" type="text" >
                            <input id="area_country" name="country" hidden  type="text" >
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">名称</label>
                    <div class="col-sm-10">
                        <input name="fullName" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">简称</label>
                    <div class="col-sm-10">
                        <input name="simpleName" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">上级</label>
                    <div class="col-sm-10">
                    	<div class="col-md-3 no-padding-left">
                    		<select id="province3" class="form-control"></select>
                    	</div>
                    	<div class="col-md-3 no-padding-left">
                        	<select name="parentId" id="city3"  class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">拼音</label>
                    <div class="col-sm-10">
                        <input name="phonetic" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">首字母</label>
                    <div class="col-sm-10">
                        <input name="fitstWord" type="text" class="form-control">
                    </div>
                </div>

                <div class="form-group col-sm-12">
                    
                   <div class="col-sm-2 col-sm-offset-4">
                       <button type="submit"  class="btn btn-primary form-control">确认</button>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal" aria-hidden="true">取消</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    </div>
</div>	

<!--县级编辑-->
<div class="modal fade bs-areaUpdate-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <span class="widget-caption">编辑县级信息</span>
            </div>
            <form name="areaUpdateForm" id="areaUpdateForm" method="post" class="form-horizontal" >
            <div class="modal-body  form-horizontal clearfix">
                <div class="form-group text-center">
                    <label class="col-sm-1 control-label no-padding-right">编号</label>
                    <div class="col-sm-10">
                            <input id="aUpdateAddressId" readonly="readonly" name="addressId" type="text" class="form-control">
                            <input name="level" hidden value="3" type="text" >
                    </div>
                </div>

                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">名称</label>
                    <div class="col-sm-10">
                        <input id="aUpdateFullName" name="fullName" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">简称</label>
                    <div class="col-sm-10">
                        <input id="aUpdateSimpleName" name="simpleName" type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">上级</label>
                    <div class="col-sm-10">
                    	<label class="pull-left control-label">从</label>
                    	<div class="col-sm-3">
                    		<input id="aUpdateCountry" name="country" type="text"  class="form-control">
                    	</div>
                    	<input hidden id="aUpdateParentId" name="parentId" type="text" >
                    	<label class="pull-left control-label">修改到</label>
                    	<div class="col-sm-3">
                    		<select id="provinceUpdate3"  class="form-control"></select>
                    	</div>
                        <div class="col-sm-3">
                        	<select id="cityUpdate3"  class="form-control"></select>
                        </div>
                        
                    </div>
                </div>
                <div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">拼音</label>
                    <div class="col-sm-10">
                        <input id="aUpdatePhonetic" name="phonetic" type="text" class="form-control">
                    </div>
                </div>
				<div class="form-group">
                    <label class=" col-sm-1 control-label no-padding-right">首字母</label>
                    <div class="col-sm-10">
                        <input id="aUpdateFirstWord" name="firstWord" type="text" class="form-control">
                    </div>
                </div>

                <div class="form-group col-sm-12">
                    
                    <div class="col-sm-2 col-sm-offset-4">
                       <button type="submit"  class="btn btn-primary form-control">确认</button>
                    </div>
                    <div class="col-sm-2 ">
                       <button type="button" class="btn btn-danger form-control" data-dismiss="modal" aria-hidden="true">取消</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    </div>
</div>	

<script>
/**
 * 初始化数据
 * @returns
 */
function init1 (level){
	lv = level;
	var init = $('#table1').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"bPaginate":true,
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
		"sAjaxSource" : ctx+'/dictionary/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : tableData1,
		"aoColumns" : [
			{"mDataProp" : "addressId","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "fullName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "simpleName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "country","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "phonetic","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "firstWord","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  if(data==0){
            		  return '<span id="span'+full["addressId"]+'" onclick="chooseAddress(\''+full["addressId"]+'\',1)" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
            	  }else{
            		  return '<span id="span'+full["addressId"]+'" onclick="chooseAddress(\''+full["addressId"]+'\',1)" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	  }
              }},
              {"mDataProp" : "level","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				return '<a onclick="edit(\''+full["addressId"]
				+'\',\''+full["level"]
				+'\',\''+full["fullName"]
				+'\',\''+full["simpleName"]
				+'\',\''+full["country"]
				+'\',\''+full["phonetic"]
				+'\',\''+full["firstWord"]
				+'\',\''+full["parentId"]
				+'\')" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
		                +'<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
		               /* +' <a href="javascript:void(0);" onclick="del(\''+full["addressId"]+'\')" class="btn btn-danger btn-xs delete">'
		                +'    <i class="fa fa-trash-o"></i> 删除</a>'*/
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	//每页显示记录数
	$('#table1_wrapper .dataTables_info').parent().append($('#table1_wrapper .dataTables_length'));
}
function init2 (level){
	lv = level;
	var init = $('#table2').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"bPaginate":true,
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
		"sAjaxSource" : ctx+'/dictionary/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : tableData2,
		"aoColumns" : [
			{"mDataProp" : "addressId","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "fullName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "simpleName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "country","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "phonetic","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "firstWord","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  if(data==0){
            		  return '<span id="span'+full["addressId"]+'" onclick="chooseAddress(\''+full["addressId"]+'\',2)" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
            	  }else{
            		  return '<span id="span'+full["addressId"]+'" onclick="chooseAddress(\''+full["addressId"]+'\',2)" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	  }
              }},
              {"mDataProp" : "level","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				return '<a onclick="edit(\''+full["addressId"]
				+'\',\''+full["level"]
				+'\',\''+full["fullName"]
				+'\',\''+full["simpleName"]
				+'\',\''+full["country"]
				+'\',\''+full["phonetic"]
				+'\',\''+full["firstWord"]
				+'\',\''+full["parentId"]
				+'\')" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
		                +'<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
		               /* +' <a href="javascript:void(0);" onclick="del(\''+full["addressId"]+'\')" class="btn btn-danger btn-xs delete">'
		                +'    <i class="fa fa-trash-o"></i> 删除</a>'*/
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	
	//每页显示记录数
	$('#table2_wrapper .dataTables_info').parent().append($('#table2_wrapper .dataTables_length'));
}
function init3 (level){
	lv = level;
	var init = $('#table3').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"bPaginate":true,
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
		"sAjaxSource" : ctx+'/dictionary/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : tableData3,
		"aoColumns" : [
			{"mDataProp" : "addressId","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "fullName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "simpleName","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "country","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "phonetic","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "firstWord","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data, type, full ){
            	  if(data==0){
            		  return '<span id="span'+full["addressId"]+'" onclick="chooseAddress(\''+full["addressId"]+'\',3)" class="btn btn-xs btn-nouse"><i class="fa fa-ban"></i> 禁用</span>';
            	  }else{
            		  return '<span id="span'+full["addressId"]+'" onclick="chooseAddress(\''+full["addressId"]+'\',3)" class="btn btn-xs btn-use"><i class="fa fa-check-circle-o"></i> 启用</span>';
            	  }
              }},
              {"mDataProp" : "level","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				return '<a onclick="edit(\''+full["addressId"]
				+'\',\''+full["level"]
				+'\',\''+full["fullName"]
				+'\',\''+full["simpleName"]
				+'\',\''+full["country"]
				+'\',\''+full["phonetic"]
				+'\',\''+full["firstWord"]
				+'\',\''+full["parentId"]
				+'\')" class="edit" '+(full.enable == 0 ? "disabled" : "")+'>'
		                +'<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>'
		               /* +' <a href="javascript:void(0);" onclick="del(\''+full["addressId"]+'\')" class="btn btn-danger btn-xs delete">'
		                +'    <i class="fa fa-trash-o"></i> 删除</a>'*/
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
	//每页显示记录数
	$('#table3_wrapper .dataTables_info').parent().append($('#table3_wrapper .dataTables_length'));
}

</script>

<script src="${ctx_static }/home/sysconf/js/dictionary/dictionary.js"></script>

