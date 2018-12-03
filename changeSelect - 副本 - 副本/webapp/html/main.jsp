<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common/public_header_main.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="common/public_header.jsp"%>
</head>
<!-- /Head -->
<!-- Body -->
<body ng-app="">
<!-- 顶部导航条 -->
<%@ include file="common/public_top.jsp"%>
<!-- /顶部导航条 -->
<!-- Main Container -->
<div class="main-container container-fluid">
    <!-- Page Container -->
    <div class="page-container">
        <!-- Page Sidebar -->
        <%@ include file="common/public_menu.jsp"%>
        <!-- /Page Sidebar -->
        <!-- Page Content -->
        <div  class="page-content">
          	<div class="page-breadcrumbs">
                <!-- Nav tabs -->
	            <div class="tabs-container clearfix">
	                <a class="btn btn-default left-btn"><i class="glyphicon glyphicon-backward"></i></a>
	                <div class="tabs-list col-sm-10">
	                    <ul class="nav nav-tabs" id="tabs1" role="tablist">
	                    	<li  class="active"  role="presentation">
	                    	 	<a aria-controls="tab_home" data-toggle="tab" href="#tab_home" role="tab">
	                    	 		<span class="menu-text">首页</span>
	                    	 	</a>
                            </li>
	                    </ul>
	                </div>
	                <a class="btn btn-default right-btn"><i class="glyphicon glyphicon-forward"></i></a>
	            </div>
            </div>       
        	<!--页面切换 -->
            <div class="tab-content" id="tabsPage">
               <div class="tab-pane active" id="tab_home" role="tabpanel">
					<iframe class="iframeClass" frameborder="no" border="0" src="${ctx }/console/index" style="height: 100%;"></iframe>
                </div>
            </div>
          <!--  <div id="showPage" class="page-body">
            </div> -->
        </div>
    </div>
</div>

<%@ include file="common/public_footer.jsp"%>

<script>
$(function () {
    $('#reservation').daterangepicker();
    $('.page-content').css({'position': 'fixed','top':85,'bottom':20,'left': 0,'right': 0});
    //$("#showPage").load(ctx+"/consultConsole/index"); 
})
/**
 * 页面跳转总线
 */
function loadHtml(val,o){
	$('#showH1').text($(o).find('span').text())
	
	var text = $(".menu-text");
	
	$(text).each(function(i){
		if(!$(text[i]).parent().attr("class")){
			$(this).parent().parent().removeClass("active");
		}
	})
	
	if(!$(o).attr("class")){
		$(o).parent().addClass("active");
	}

    $("#showPage").html("<div style='height:80%' class='text-center'></div>");
    $("#showPage>div").mLoading({
        text: '正在加载中，请稍后......',
        icon: "../statics_html/common/image/loading5.gif"
    });
    
   
    $("#showPage").load(ctx + val);
    
	if(chooseJsonClassValue){
		$("#showPage").removeClass();
		$("#showPage").addClass("page-body animated  "+addJsonClass());
	} 
}
var jsonClass1 = ["bounceInRight","bounceInLeft"];
var jsonClass = ['bounce'
        ,'flash'
        ,'pulse'
        ,'rubberBand'
        ,'shake'
        ,'swing'
        ,'tada'
        ,'wobble'
        ,'bounceIn'
        ,'bounceInLeft'
        ,'bounceInRight'
        ,'fadeIn'
        ,'fadeInDown'
        ,'fadeInLeft'
        ,'fadeInRight'
        ,'fadeInRightBig'
        ,'fadeInUp'
        ,'flipInX'
        ,'flipInY'
        ,'lightSpeedIn'
        ,'rotateIn'
        ,'rotateInDownLeft'
        ,'rotateInDownRight'
        ,'rotateInUpLeft'
        ,'rotateInUpRight'
        ,'rollIn'
        ,'zoomIn'
        ,'zoomInDown'
        ,'zoomInLeft'
        ,'zoomInRight'
        ];
var jsonClassNum = 0;
function addJsonClass(){
	if(jsonClassNum==jsonClass1.length){
		jsonClassNum=0;
	}
	var st = jsonClass1[jsonClassNum];
	jsonClassNum++;
	return st;
}
var chooseJsonClassValue = true;
function chooseJsonClass(){
	chooseJsonClassValue = false;
}
/**
 * 时间格式化
 */
function jsDateFormat(val){
	var date=new Date(parseInt(val)); 
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    month = month < 10 ? ('0' + month) : month;  
    var day = date.getDate();  
    day = day < 10 ? ('0' + day) : day;  
    var hour = date.getHours();  
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var seconde=date.getSeconds();
    seconde = seconde < 10 ? ('0' + seconde) : seconde;
    return year + '-' + month + '-' + day+' '+hour+':'+minute+':'+seconde; 
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if(hour >= 0 && hour <= 9){
    	hour = "0" + hour;
    }
    if(minute >= 0 && minute <= 9){
    	minute = "0" + minute;
    }
    if(second >= 0 && second <= 9){
    	second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}
//基础ajax调用类
var baseAjax = function () {
    return {
        simpleAjax:function(url,data){
        	var obj = ''; 
        	$.ajax({
                url: ctx + url,
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (data) {
                	obj = data;
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        	return obj;
        },
        getAjax:function(url,data){
        	var obj = ''; 
        	$.ajax({
                url: ctx + url,
                async: false,
                data: data,
                dataType: 'json',
                success: function (data) {
                	obj = data;
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        	return obj;
        }
    };
}();
</script>

</body>
</html>
