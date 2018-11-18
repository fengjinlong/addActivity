<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<link href="${ctx_static }/home/examineApprove/css/handle.css" rel="stylesheet">
         
<div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header">
             
               <div class="widget-buttons">
                   <a href="#"></a>
                    <c:if test="${not empty param.ishandle }">
			           <a href="#" onclick="loadHtml('/handle/index', this)" class="back-btn"  data-toggle="dispose">
			                <i class="fa fa-times"></i></a>
			        </c:if>
			        <c:if test="${ not empty param.isAccraditation   }">
			           <a href="#" onclick="loadHtml('/accraditation/index', this)" class="back-btn"  data-toggle="dispose">
			                <i class="fa fa-times"></i></a>
			         </c:if>
			         <c:if test="${ not empty param.isApplied   }">
			           <a href="#" onclick="loadHtml('/groupExpend/index', this)" class="back-btn"  data-toggle="dispose">
			                <i class="fa fa-times"></i></a>
			         </c:if>  
               </div>
               <!--Widget Buttons-->
           </div>
           <!--Widget Header-->
           <div class="widget-body clearfix">
               <div class="widget-main">
                   <div class="col-lg-7 col-lgl">
                       <!--<div class="modal-content">-->
                       
                       <div class="modal-body clearfix" style="background:#fff">
                           <form class="form-horizontal" id="financeApplyForm">
                               <div class="form-group col-sm-6">
                                   <label class="control-label col-sm-4 no-padding-right">申请人</label>
                                   <div class="col-sm-8">
                                       <input type="text" class="form-control" disabled name="applicantName">
                                   </div>
                               </div>
                               <div class="form-group col-sm-6 no-padding-right">
                                   <label class="control-label col-sm-4 no-padding-right">申请时间</label>
                                   <div class="col-sm-8 no-padding-right">
                                       <input type="text" class="form-control" disabled name="applicantDate">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">金额</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <div class="col-sm-4 no-padding-left ">
                                           <input type="text" class="form-control" disabled name="money">
                                       </div>
                                       <div class="col-sm-4">
                                           <select name="paymentFrom"
                                                   class="form-control" disabled>
                                               <option value="1">集团支付</option>
                                               <option value="2">分校支付</option>
                                           </select>
                                       </div>
                                       <div class="col-sm-4 no-padding-right">
                                           <select name="payment"
                                                   class="form-control" disabled>
                                               <option value="1">现金</option>
                                               <option value="2">汇款</option>
                                               <option value="3">支票</option>
                                               <option value="4">pos</option>
                                           </select>
                                       </div>

                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">支出明细</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <input type="text" class="form-control" disabled name="expendDetail">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">发票抬头</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <input type="text" class="form-control" disabled name="invoiceTitle">
                                   </div>
                               </div>
                               <div class="form-group col-sm-6">
                                   <label class="control-label col-sm-4 no-padding-right">部门</label>
                                   <div class="col-sm-8">
                                   <input type="text" class="form-control" disabled name="departmentName">
                                       <!-- <select name="" class="form-control" disabled>
                                           <option value="">财务中心</option>
                                           <option value="">质检中心</option>
                                       </select> -->
                                   </div>
                               </div>
                               <div class="form-group col-sm-6 no-padding-right">
                                   <label class="control-label col-sm-4 no-padding-right">项目</label>
                                   <div class="col-sm-8 no-padding-right">
                                   <input type="text" class="form-control" disabled name="projectName">
                                      <!--  <select name="" class="form-control" disabled>
                                           <option value="">01人力资源管理师</option>
                                           <option value="">03学历</option>
                                       </select> -->
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">类别</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <div class="col-sm-4 no-padding-left ">
                                           <input type="text" class="form-control costClasses" name="pCostClassName"
                                                  disabled>
                                       </div>
                                       <div class="col-sm-4">
                                           <input type="text"
                                                  class="form-control categoriesCost" disabled name="costClassName">
                                       </div>
                                       <div class="col-sm-4 no-padding-right">
                                           <select name="" class="form-control" disabled name="expendType">
                                               <option value="0">营业支出</option>
                                               <option value="1">营业外支出</option>
                                           </select>
                                       </div>
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">收款人</label>
                                   <div class="col-sm-10 padding-left-10">
                                       <div class="col-sm-3 no-padding-left ">
                                          <!--  <select name="professionaProject"
                                                   class="form-control" disabled>
                                               <option value="0"></option>
                                               <option value="1"></option>
                                           </select> -->
                                           <input type="text" class="form-control costClasses" name="payeeName"
                                                  disabled>
                                       </div>
                                       <div class="col-sm-3">
                                           <input type="text" class="form-control" value="开户行" disabled name="bankName">
                                       </div>
                                       <div class="col-sm-3 no-padding-right">
                                           <input type="text" class="form-control"
                                                  value="开户行所在省" disabled name="province">

                                       </div>
                                       <div class="col-sm-3 no-padding-right">
                                           <input type="text" class="form-control"
                                                  value="开户行所在市" disabled name="city">
                                       </div>
                                   </div>
                               </div>
                               <div class="form-group col-sm-6">
                                   <label class="control-label col-sm-4 no-padding-right">调账</label>
                                   <div class="col-sm-8">
                                       <select name="" class="form-control" disabled name="isAdjustment">
                                           <option value="1">是</option>
                                           <option value="2">否</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group col-sm-6 no-padding-right">
                                   <label class="control-label col-sm-4 no-padding-right">申请地区</label>
                                   <div class="col-sm-8 no-padding-right">
                                       <input type="text" class="form-control" disabled name="departmentNameT">
                                   </div>
                               </div>
                               <div class="form-group col-sm-12">
                                   <label class="control-label col-sm-2 no-padding-right">申请说明</label>
                                   <div class="col-sm-10 padding-left-10">
<%@ include file="../common/public_footer.jsp"%>                                   
                                       <textarea name="content" class="form-control content"
                                                 style="height:300px;visibility:hidden;"></textarea>
                                       <script>
	$.getScript('${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js', function() {
		KindEditor.basePath = '${ctx_static }/dep/kindeditor-4.1.7/';
		editor = KindEditor.create('textarea[name="content"]',{
		uploadJson:'${ctx }/file/uploadFile',
		afterBlur: function(){
			this.sync();
		}
});
	
});
                   </script> 
                                   </div>
                               </div>
                           </form>
                       </div>
                       <!--</div>-->
                   </div>
                   <div class="col-lg-5 col-lg-content" id="approveFlow">
                       <ul class="timeline">
                           <li class="timeline-node">
                               <a class="btn btn-palegreen">NOW</a>
                           </li>
                           <li>
                               <div class="timeline-datetime">
       <span class="timeline-time">
           8:19
       </span><span class="timeline-date">Today</span>
                               </div>
                               <div class="timeline-badge blue unpass">
                                   <i class="handle-num unpass-content">6</i>
                               </div>
                               <div class="timeline-panel">
                                   <div class="timeline-header bordered-bottom bordered-blue">
           <span class="timeline-title">
               New Items Arrived
           </span>
                                       <p class="timeline-datetime">
                                           <small class="text-muted">
                                               <i class="glyphicon glyphicon-time">
                                               </i>
                                               <span class="timeline-date">Today</span>
                                               -
                                               <span class="timeline-time">8:19</span>
                                           </small>
                                       </p>
                                   </div>
                                   <div class="timeline-body">
                                       <p>Purchased new stationary items for head office</p>
                                   </div>
                               </div>
                           </li>
                           <li class="timeline-inverted">
                               <div class="timeline-datetime">
       <span class="timeline-time">
           3:10
       </span><span class="timeline-date">Today</span>
                               </div>
                               <div class="timeline-badge darkorange unpass">
                                   <i class="handle-num unpass-content">5</i>
                               </div>
                               <div class="timeline-panel bordered-right-3 bordered-orange">
                                   <div class="timeline-header bordered-bottom bordered-blue">
           <span class="timeline-title">
               Visit Appointment
           </span>
                                       <p class="timeline-datetime">
                                           <small class="text-muted">
                                               <i class="glyphicon glyphicon-time">
                                               </i>
                                               <span class="timeline-date">Today</span>
                                               -
                                               <span class="timeline-time">3:10</span>
                                           </small>
                                       </p>
                                   </div>
                                   <div class="timeline-body">
                                       <p>Outdoor visit at California State Route 85 with John
                                           Boltana &amp; Harry Piterson regarding to setup a
                                           new show room.</p>
                                       <p>
                                           <i class="orange fa fa-exclamation"></i> New task
                                           added for <span><a href="#" class="info">James Dean</a></span>
                                       </p>
                                   </div>
                               </div>
                           </li>
                           <li class="timeline-node">
                               <a class="btn btn-yellow">YESTERDAY</a>
                           </li>
                           <li>
                               <div class="timeline-datetime">
       <span class="timeline-time">
           8:19
       </span><span class="timeline-date">Yesterday</span>
                               </div>
                               <div class="timeline-badge sky pass-ing">
                                   <i class="handle-num passing-content">4</i>
                               </div>
                               <div class="timeline-panel bordered-top-3 bordered-azure">
                                   <div class="timeline-header bordered-bottom bordered-blue">
           <span class="timeline-title">
               Bank Report
           </span>
                                       <p class="timeline-datetime">
                                           <small class="text-muted">
                                               <i class="glyphicon glyphicon-time">
                                               </i>
                                               <span class="timeline-date">Yesterday</span>
                                               -
                                               <span class="timeline-time">8:19</span>
                                           </small>
                                       </p>
                                   </div>
                                   <div class="timeline-body">
                                       <p>
                                           Curabitur ullamcorper ultricies nisi. Nam eget dui.
                                           Etiam rhoncus. Maecenas tempus, tellus eget
                                           condimentum rhoncus, sem quam semper libero, sem
                                           neque sed ipsum.
                                       </p>
                                       Tellus eget condimentum rhoncus, sem quam semper libero,
                                       sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
                                       blandit
                                   </div>
                               </div>
                           </li>
                           <li class="timeline-inverted">
                               <div class="timeline-datetime">
       <span class="timeline-time">
           6:08
       </span><span class="timeline-date">Yesterday</span>
                               </div>
                               <div class="timeline-badge sky pass">
                                   <i class="handle-num pass-content">3</i>
                               </div>
                               <div class="timeline-panel">
                                   <div class="timeline-header bordered-bottom bordered-blue">
           <span class="timeline-title">
               <a href="">Sergey Azovskiy</a> has commented on your <a href="">status</a>
           </span>
                                       <p class="timeline-datetime">
                                           <small class="text-muted">
                                               <i class="glyphicon glyphicon-time">
                                               </i>
                                               <span class="timeline-date">Yesterday</span>
                                               -
                                               <span class="timeline-time">6:08</span>
                                           </small>
                                       </p>
                                   </div>
                                   <div class="timeline-body">
                                       <p>
                                           <i class="orange fa fa-quote-left"></i> Happy
                                           Birthday Lydia.
                                       </p>
                                   </div>
                               </div>
                           </li>
                           <li>
                               <div class="timeline-datetime">
       <span class="timeline-time">
           7:00
       </span><span class="timeline-date">Yesterday</span>
                               </div>
                               <div class="timeline-badge danger pass">
                                   <i class="handle-num pass-content">2</i>
                               </div>
                               <div class="timeline-panel">
                                   <div class="timeline-header bordered-bottom bordered-blue">
           <span class="timeline-title danger">
               Deadline Added
           </span>
                                       <p class="timeline-datetime">
                                           <small class="text-muted">
                                               <i class="handle-num">2
                                               </i>
                                               <span class="timeline-date">Yesterday</span>
                                               -
                                               <span class="timeline-time">7:00</span>
                                           </small>
                                       </p>
                                   </div>
                                   <div class="timeline-body">
                                       <p>Dyvia Phillips added new milestone <span><a class="danger" href="#">UI</a></span> Lorem
                                           ipsum dolor sit amet consiquest dio</p>
                                   </div>
                               </div>
                           </li>
                           <li class="timeline-inverted">
                               <div class="timeline-datetime">
       <span class="timeline-time">
           3:09
       </span><span class="timeline-date">Yesterday</span>
                               </div>
                               <div class="timeline-badge pass">
                                   <i class="handle-num pass-content">1</i>
                               </div>
                               <div class="timeline-panel">
                                   <div class="timeline-header bordered-bottom bordered-blue">
                                       <p class="timeline-datetime">
                                           <small class="text-muted">
                                               <i class="glyphicon glyphicon-time">
                                               </i>
                                               <span class="timeline-date">Yesterday</span>
                                               -
                                               <span class="timeline-time">3:09</span>
                                           </small>
                                       </p>
                                   </div>
                                   <div class="timeline-body">
                                       <a href="#">John Travolta</a> shared an image on <a href="#">Dribble</a>
                                       <div class="tl-wide text-center" style="padding: 5px; margin-top:10px; margin-bottom: 10px;">
                                        </div>
                                        <i class="text-muted text-sm">Lorem ipsum dolor sit
                                            amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna
                                            aliqua.</i>
                                    </div>
                                </div>
                            </li>
                            <li class="timeline-node">
                                <a class="btn btn-info">11 DECEMBER</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
                
<form id="applyPageInfoForm" style="display:none;">
 	<input name="applyId" value="${param.applyId }" type="hidden">
</from>
<!--日期插件-->
<script src="${ctx_static }/dep/assets/js/datetime/moment.js"></script>
<script src="${ctx_static }/dep/assets/js/datetime/daterangepicker.js"></script>

<!--富文本编辑器-->
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/kindeditor-min.js"></script>
<script charset="utf-8" src="${ctx_static }/dep/kindeditor-4.1.7/lang/zh_CN.js"></script>


<script src="${ctx_static }/home/examineApprove/js/handleCheck2.js"></script>
</body>

