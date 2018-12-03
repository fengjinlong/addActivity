<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>

    <link href="${ctx_static }/home/configuration/css/productPricing.css" rel="stylesheet">

	<div class="row">
		<input type="hidden" id="productId" value="${productId }"/>
		<input type="hidden" id="from" value="${from }"/>
	
         <div class="col-lg-12 col-sm-12 col-xs-12">
             <div class="widget">
                 <div class="widget-header">
                     <div class="widget-buttons">
                        <a href="#"></a>
                        <a href="#" class="back-btn" data-toggle="dispose">
                             <i class="fa fa-times"></i>
                         </a>
                     </div>
                     <!--Widget Buttons-->
              </div>
              <!--Widget Header-->
              <div class="widget-body">
                  <div class="widget-main ">
                      <div id="professional" style="display: none">
                     	  <div class="col-sm-12 form-group" style="z-index:99">
                     	   		<button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target=".professionalAdd">
                            		<i class="fa fa-plus"></i> 新增
                            	</button>
                    	  </div>
              
                          <table id="professionalCopyTable" class="table table-striped table-hover table-bordered dataTable no-footer">
                              <thead>
                              <tr role="row">
                                  <th width="5%">
                                      <label>
                                          <input type="checkbox" class="master1">
                                          <span class="text"></span>
                                      </label>
                                  </th>
                                  <th>所属项目</th>
                                  <th>级别 </th>
                                  <th>授课形式</th>
                                  <th>班型</th>
                                  <th width="38%">分校</th>
                                  <th>操作</th>
                              </tr>
                              </thead>
                              <tbody>
                              </tbody>
                          </table>
                      </div>
                      <div id="education" style="display: none">
                        <div class="col-sm-12 form-group" style="z-index:99">
                     	   		<button class="btn increase  pull-right col-sm-4" data-toggle="modal" data-backdrop="static" data-target=".educationAdd">
                            		<i class="fa fa-plus"></i> 新增
                            	</button>
                    	  </div>
                          <table class="table table-striped table-hover table-bordered dataTable no-footer" id="educationTable">
                              <thead>
                              <tr role="row">
                                  <th width="5%">
                                      <label>
                                          <input type="checkbox" class="master2">
                                          <span class="text"></span>
                                      </label>
                                  </th>
                                  <th>所属项目 </span>
                                  </th>
                                  <th>级别 </th>
                                  <th>授课形式</span>
                                  </th>
                                  <th>教育形式 </span>
                                  </th>
                                  <th>院校 </span>
                                  </th>
                                  <th>专业</span>
                                  </th>
                                  <th>班型</span>
                                  </th>
                                  <th width="40%">分校</span>
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
              <!--Widget-->
          </div>
      </div>

  </div>

<!--职业资格新增-->
<div class="modal fade professionalAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="professionalAdd">
                
                	<input type="hidden" name="productId" value="${productId }"/>
                	
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[0].id" value="1" type="hidden" class="form-control">
                    	<input name="productPrice[0].name" type="hidden" value="培训费"/>
                        <label class="control-label col-sm-3 no-padding-right">培训费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[0].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[1].id" value="2" type="hidden" class="form-control">
                    	<input name="productPrice[1].name" type="hidden" value="考务费"/>
                        <label class="control-label col-sm-3 no-padding-right">考务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[1].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[2].id" value="3" type="hidden" class="form-control">
                    	<input name="productPrice[2].name" type="hidden" value="资料费"/>
                        <label class="control-label col-sm-3 no-padding-right">资料费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[2].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[3].id" value="4" type="hidden" class="form-control">
                    	<input name="productPrice[3].name" type="hidden" value="协议费"/>
                        <label class="control-label col-sm-3 no-padding-right">协议费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[3].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[4].id" value="5" type="hidden" class="form-control">
                    	<input name="productPrice[4].name" type="hidden" value="教材费"/>
                        <label class="control-label col-sm-3 no-padding-right">教材费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[4].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[5].id" value="6" type="hidden" class="form-control">
                    	<input name="productPrice[5].name" type="hidden" value="服务费"/>
                        <label class="control-label col-sm-3 no-padding-right">服务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[5].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[5].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[5].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">选择分校<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="departments" class="choiceBranchSchool selectpicker form-control" multiple  title="--请选择--">
                            </select>
                        </div>	
                        <div class="col-sm-2">
                        	<div class="checkbox">
                                <label>
                                    <input type="checkbox" class="choiceBranch">
                                    <span class="text">全选</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right padding-right-5">描述</label>
                        <div class="col-sm-10 no-padding-right">
                            <textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('#professionalAdd textarea[name="content"]',{
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

<!--职业资格编辑-->
<div class="modal fade professionalCopy" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="professionalCopy">
                	<fieldset> 
                	<input type="hidden" name="productId"/>
                	
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[0].id" value="1" type="hidden" class="form-control">
                    	<input name="productPrice[0].name" type="hidden" value="培训费"/>
                        <label class="control-label col-sm-3 no-padding-right">培训费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[0].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[1].id" value="2" type="hidden" class="form-control">
                    	<input name="productPrice[1].name" type="hidden" value="考务费"/>
                        <label class="control-label col-sm-3 no-padding-right">考务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[1].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[2].id" value="3" type="hidden" class="form-control">
                    	<input name="productPrice[2].name" type="hidden" value="资料费"/>
                        <label class="control-label col-sm-3 no-padding-right">资料费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[2].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[3].id" value="4" type="hidden" class="form-control">
                    	<input name="productPrice[3].name" type="hidden" value="协议费"/>
                        <label class="control-label col-sm-3 no-padding-right">协议费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[3].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[4].id" value="5" type="hidden" class="form-control">
                    	<input name="productPrice[4].name" type="hidden" value="教材费"/>
                        <label class="control-label col-sm-3 no-padding-right">教材费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[4].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[5].id" value="6" type="hidden" class="form-control">
                    	<input name="productPrice[5].name" type="hidden" value="服务费"/>
                        <label class="control-label col-sm-3 no-padding-right">服务费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[5].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[5].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[5].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">选择分校<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="departments" class="choiceBranchSchool selectpicker form-control" multiple  title="--请选择--">
                            </select>
                        </div>	
                        <div class="col-sm-2">
                        	<div class="checkbox">
                                <label>
                                    <input type="checkbox" class="choiceBranch">
                                    <span class="text">全选</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right padding-right-5">描述</label>
                        <div class="col-sm-10 no-padding-right">
                            <textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor = KindEditor.create('#professionalCopy textarea[name="content"]',{
										uploadJson:'${ctx }/file/uploadFile',
										resizeType:0,
										afterBlur: function(){
											this.sync();
										}
								});
								 //富文本编辑器禁用与取消
							    $('#professionalCopyTable').on('click', '.view', function () {
							    	editor.readonly(true);
							    })
							     $('#professionalCopyTable').on('click', '.edit', function () {
							    	editor.readonly(false);
							    })
							    
							});
							</script>
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
                    </fieldset> 
                </form>
            </div>
        </div>
    </div>
</div>

<!--职业资格描述-->
<div class="modal fade professionalDescribe" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">描述</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="professionalDescribe">
                    <div class="form-group col-sm-12">
                        <label class="control-label col-sm-1 no-padding-right">描述</label>
                        <div class="col-sm-10 no-padding-right">
                            <textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor3 = KindEditor.create('#professionalDescribe textarea[name="content"]',{
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

<!--学历新增-->
<div class="modal fade educationAdd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">新增</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="educationAdd">
                	<input type="hidden" name="productId" value="${productId }"/>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[0].id" value="1" type="hidden" class="form-control">
                    	<input name="productPrice[0].name" type="hidden" value="学杂费"/>
                        <label class="control-label col-sm-3 no-padding-right">学杂费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[0].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[1].id" value="2" type="hidden" class="form-control">
                    	<input name="productPrice[1].name" type="hidden" value="考试费"/>
                        <label class="control-label col-sm-3 no-padding-right">考试费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[1].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[2].id" value="3" type="hidden" class="form-control">
                    	<input name="productPrice[2].name" type="hidden" value="资料费"/>
                        <label class="control-label col-sm-3 no-padding-right">资料费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[2].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[3].id" value="4" type="hidden" class="form-control">
                    	<input name="productPrice[3].name" type="hidden" value="教材费"/>
                        <label class="control-label col-sm-3 no-padding-right">教材费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[3].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[4].id" value="5" type="hidden" class="form-control">
                    	<input name="productPrice[4].name" type="hidden" value="代管费"/>
                        <label class="control-label col-sm-3 no-padding-right">代管费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[4].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[5].id" value="6" type="hidden" class="form-control">
                    	<input name="productPrice[5].name" type="hidden" value="辅导费"/>
                        <label class="control-label col-sm-3 no-padding-right">辅导费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input disabled="disabled" name="productPrice[5].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[5].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3 before-tutorialFee">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[5].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="form-group col-sm-12" style="margin-left:-32px">
						<label class="control-label col-sm-2 no-padding-right">辅导费类别：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div> -->
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">选择分校<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="departments" class="choiceBranchSchool selectpicker form-control" multiple  title="--请选择--">
                            </select>
                        </div>	
                        <div class="col-sm-2">
                        	<div class="checkbox">
                                <label>
                                    <input type="checkbox" class="choiceBranch">
                                    <span class="text">全选</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">描述：</label>
                        <div class="col-sm-10 no-padding-right">
                            <textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('#educationAdd textarea[name="content"]',{
										uploadJson:'${ctx }/file/uploadFile',
										afterBlur: function(){
											this.sync();
										}
								});
							});
							</script>
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

<!--学历编辑-->
<div class="modal fade educationCopy" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">编辑</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="educationCopy">
                	<fieldset>
                	<input type="hidden" name="productId"/>
                	<input type="hidden" name="productPriceId"/>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[0].id" value="1" type="hidden" class="form-control">
                    	<input name="productPrice[0].name" type="hidden" value="学杂费"/>
                        <label class="control-label col-sm-3 no-padding-right">学杂费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[0].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[0].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[1].id" value="2" type="hidden" class="form-control">
                    	<input name="productPrice[1].name" type="hidden" value="考试费"/>
                        <label class="control-label col-sm-3 no-padding-right">考试费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[1].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[1].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[2].id" value="3" type="hidden" class="form-control">
                    	<input name="productPrice[2].name" type="hidden" value="资料费"/>
                        <label class="control-label col-sm-3 no-padding-right">资料费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[2].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[2].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[3].id" value="4" type="hidden" class="form-control">
                    	<input name="productPrice[3].name" type="hidden" value="教材费"/>
                        <label class="control-label col-sm-3 no-padding-right">教材费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[3].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[3].isLock" type="checkbox">
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[4].id" value="5" type="hidden" class="form-control">
                    	<input name="productPrice[4].name" type="hidden" value="代管费"/>
                        <label class="control-label col-sm-3 no-padding-right">代管费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right-5">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[4].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[4].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                    	<input name="productPrice[5].id" value="6" type="hidden" class="form-control">
                    	<input name="productPrice[5].name" type="hidden" value="辅导费"/>
                        <label class="control-label col-sm-3 no-padding-right">辅导费<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-9">
                            <input disabled="disabled" name="productPrice[5].price" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-5">
                        <label class="control-label col-sm-3 no-padding-right padding-right">下限</label>
                        <div class="col-sm-9">
                            <input name="productPrice[5].limit" type="text" class="form-control number">
                        </div>
                    </div>
                    <div class="form-group col-sm-3 before-tutorialFee">
                        <label class="control-label col-sm-6 no-padding-right padding-right-5">锁定</label>
                        <div class="col-sm-6 no-padding-right padding-left-5">
                            <div class="checkbox">
                                <label>
                                    <input name="productPrice[5].isLock" type="checkbox"/>
                                    <span class="text">是</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="form-group col-sm-12" style="margin-left:-32px">
						<label class="control-label col-sm-2 no-padding-right">辅导费类别：</label>
						<div class="col-sm-3">
							<input type="text" class="form-control">
						</div>
					</div> -->
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">选择分校<span class="control-label mandatory">*</span></label>
                        <div class="col-sm-8 no-padding-right">
                            <select name="departments" class="choiceBranchSchool selectpicker form-control" multiple  title="--请选择--">
                            </select>
                        </div>	
                        <div class="col-sm-2">
                        	<div class="checkbox">
                                <label>
                                    <input type="checkbox" class="choiceBranch">
                                    <span class="text">全选</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">描述：</label>
                        <div class="col-sm-10 no-padding-right">
                            <textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor2 = KindEditor.create('#educationCopy textarea[name="content"]',{
										uploadJson:'${ctx }/file/uploadFile',
										afterBlur: function(){
											this.sync();
										}
								});
								 //富文本编辑器禁用与取消
							    $('#educationTable').on('click', '.view', function () {
							    	editor2.readonly(true);
							    })
							     $('#educationTable').on('click', '.edit', function () {
							    	 editor2.readonly(false);
							    })
							});
							</script>
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
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>

<!--学历描述-->
<div class="modal fade educationDescribe" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <span class="widget-caption">描述</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="educationDescribe">
                    <div class="form-group col-sm-12 branch">
                        <label class="control-label col-sm-2 no-padding-right">描述：</label>
                        <div class="col-sm-10 no-padding-right">
                            <textarea name="content" class="form-control content"
								style="width: 100%; height: 400px; visibility: hidden;"></textarea>
							<script>
							$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
								KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
								editor4 = KindEditor.create('#educationDescribe textarea[name="content"]',{
										uploadJson:'${ctx }/file/uploadFile',
										afterBlur: function(){
											this.sync();
										}
								});
							});
							</script>
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

<script>
//table初始化_职业资格
var InitiateSimpleDataTable1 = function () {
	
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#professionalCopyTable').dataTable({
            	"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizProduct/getAllPrice',
        		"fnServerData": retrieveData1,//用于替换默认发到服务端的请求操作  
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
        		               	{ "mDataProp": "product_id","bSortable": false,'sClass': "text-center", "mRender":function(data, type, full){
        		               		return "<label> <input type='checkbox' class='slaver1' data-id='"+data+"'> <span class='text'></span> </label>";
        		               	}},
        		               	{ "mDataProp": "full_name","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "level_title","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "teach_type","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
        		               		switch(data){
            		               		case 1:
            		               			return "面授";
            		               			break;
            		               		case 2:
            		               			return "直播";
            		               			break;
            		               		case 3:
            		               			return "录播";
            		               			break;
        		               		}	
        		               		
        		               	}}, 
        		               	{ "mDataProp": "class_name","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "department_name","bSortable": false,'sClass': "text-center"},
        		               	{ "mDataProp": "product_id","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
        		               		return  " <a href='#' data-record='"+JSON.stringify(full)+"' class='view view-edit'> <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>"+
        		              			    " <a href='#' data-record='"+JSON.stringify(full)+"' class='edit view-edit'> <i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>"+
        		               				" <a href='#' class='describe-btn' data-toggle='modal' data-target='.professionalDescribe' data-backdrop='static'> <i class='fa  fa-file-text-o primary' data-toggle='tooltip' data-placement='top' data-original-title='描述' title='描述'></i></a>";
        		               	}},
        		   			],
	   			"aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
            	
            });

        }
    };

}();

//table初始化_学历
var InitiateSimpleDataTable2 = function () {
	
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#educationTable').dataTable({
            	"bPaginate": true,  //是否显示分页
            	"iDisplayLength": 10,
            	"bLengthChange": false,//每页显示的记录数
            	"bFilter": false, //搜索栏
            	"bSort": true, //是否支持排序功能
            	"bInfo": true, //显示表格信息
            	"bAutoWidth": false,  //自适应宽度
            	"bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            	//"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
            	"sAjaxSource" : ctx+'/bizProduct/getAllPrice',
        		"fnServerData": retrieveData2,//用于替换默认发到服务端的请求操作  
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
        		               	{ "mDataProp": "product_id","bSortable": false,'sClass': "text-center", "mRender":function(data, type, full){
        		               		return "<label> <input type='checkbox' class='slaver2' data-record='"+JSON.stringify(full)+"' data-id='"+data+"'> <span class='text'></span> </label>";
        		               	}},
        		               	{ "mDataProp": "full_name","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "level_title","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "teach_type","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
        		               		switch(data){
            		               		case 1:
            		               			return "面授";
            		               			break;
            		               		case 2:
            		               			return "直播";
            		               			break;
            		               		case 3:
            		               			return "录播";
            		               			break;
        		               		}	
        		               		
        		               	}}, 
        		               	{ "mDataProp": "education_form","bSortable": true,'sClass': "text-center","mRender":function(data, type, full){
        		               		switch(data){
            		               		case 1:
            		               			return "自考";
            		               			break;
            		               		case 2:
            		               			return "远程";
            		               			break;
            		               		case 3:
            		               			return "成考";
            		               			break;
        		               		}	
        		               		
        		               	}}, 
        		               	{ "mDataProp": "school_name","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "major_name","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "class_name","bSortable": true,'sClass': "text-center"},
        		               	{ "mDataProp": "department_name","bSortable": false,'sClass': "text-center"},
        		               	{ "mDataProp": "product_id","bSortable": false,'sClass': "text-center","mRender":function(data, type, full){
        		               		return " <a href='#' data-record='"+JSON.stringify(full)+"' class='view view-edit'> <i class='fa fa-search warning' data-toggle='tooltip' data-placement='top' data-original-title='查看' title='查看'></i></a>"+
        		               			   " <a href='#' data-record='"+JSON.stringify(full)+"' class='edit view-edit'> <i class='fa fa-edit blue' data-toggle='tooltip' data-placement='top' data-original-title='编辑' title='编辑'></i></a>"+
		               					   " <a href='#' class='describe-btn' data-toggle='modal' data-target='.educationDescribe' data-backdrop='static'> <i class='fa  fa-file-text-o primary' data-toggle='tooltip' data-placement='top' data-original-title='描述' title='描述'></i></a>";
        		               	}},
        		   			],
	   			"aoColumnDefs": [{
	   	            sDefaultContent: '',
	   	            aTargets: ['_all']
	   	        }],
            	
            });

        }

    };
}();

</script>

<script src="${ctx_static }/home/configuration/js/productPricing2.js"></script>
