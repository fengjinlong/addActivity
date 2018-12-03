$(function(){
	
	//多选框
	$(document).on('change', 'input:checkbox.checkAll', function(){
		if($(this).prop('checked')){
			$('input:checkbox.checkchild').prop('checked', 'checked');
		}else{
			$('input:checkbox.checkchild').prop('checked', '');
		}
	})

    //日期控件
    $('.reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' 到 ',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        },
        ranges: {
            '今天': [moment().startOf('day'), moment()],
            '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
            '本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
            '上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
            '本月': [moment().startOf("month"), moment().endOf("month")],
            '上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()]
        },
        applyClass: 'btn-primary',
        alwaysShowCalendars: true,
        autoclose: true,
        autoUpdateInput: false,
        showDropdowns: true
    });

    $('.reservation').on('apply.daterangepicker', function (event, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    });

    //时间初始化
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };

    $(".form_datetime").datetimepicker({
        language: 'zh',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true
    })
    //合作费返点比对
    $('#cooperate-upload').fileinput({
        language: 'zh',
        uploadUrl: '#',
        showPreview: false
    })

    //开户行所在省市
    $('.distpicker').distpicker();


    //成绩添加
    function scoreAdd() {
        $('.score-add').on('click', function () {
            var scoreAdd = '<div class="col-sm-12 margin-top-20 scoreAppend">'
                + '<div class="col-sm-3">'
                + '<div class="input-group">'
                + '<input class="form-control date-picker examDate" type="text" placeholder="请选择考试时间">'
                + '<span class="input-group-addon">'
                + '<i class="fa fa-calendar"></i>'
                + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-3">'
                + '<select name="" class="form-control examSubject" placeholder="请选择考试科目">'
                + '<option value="">语文</option>'
                + '<option value="">数学</option>'
                + '<option value="">英语</option>'
                + '</select>'
                + '</div>'
                + '<div class="col-sm-3">'
                + '<input type="text" class="form-control examScore" placeholder="请输入分数">'
                + '</div>'
                + '<div class="col-sm-3 no-padding-left">'
                + '<label class="control-label"><a href="#" class="blue fa fa-check save-score"></a></label>'
                + '<label class="control-label"><a href="#" class="danger fa fa-times cancel-score"></a></label>'
                + '</div>'
                + '</div>';
            $('#scoreInfo').after(scoreAdd);
        });

        //保存
        $('.scoreManage').on('click', '.save-score', function () {
        	var idCard = $('#scoreManage input[name="idcard"]').val();
        	var projectId=$('#scoreManage input[name="projectId"]').val();
        	var levelId = $('#scoreManage input[name="projectLevelId"]').val();
        	var name = $('#scoreManage input[name="name"]').val();
        	var course = $('#scoreManage input[name="course"]').val();
        	var level = $('#scoreManage input[name="level"]').val();
            var examDate = $('.scoreAppend .examDate').val();
            var subject = $('.scoreAppend .examSubject :selected').text();
            var score = $('.scoreAppend .examScore').val();
            var params = "";
            params += "&idCard=" + idCard;
            params += "&projectId=" + projectId;
            params += "&levelId=" + levelId;
            params += "&name=" + name;
            params += "&course=" + course;
            params += "&level=" + level;
            params += "&examDate=" + examDate;
            params += "&subject=" + subject;
            params += "&score=" + score;
            $.ajax({
                type: "POST",
                url: ctx + '/score/addNewRecord',
                data: params,
                dataType: 'json',
                success: function (data) {
                	scoreInfoDataTable.init();
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        })

        //取消
        $('.scoreManage').on('click', '.cancel-score', function () {
            $(this).parent().parent().parent().remove();
        })
    }
    scoreAdd();

    //考试时间
    $('.scoreManage').on('focus', '.date-picker', function () {
        $('.date-picker').datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd'
        }).on('changeDate', function () {
            $(this).datepicker('hide');
        });
    })


    //固定按钮切换
    $('.right-toolbar a').hover(function () {
        $(this).find('.up').stop().fadeIn(400);
    }, function () {
        $(this).find('.up').stop().fadeOut(400);
    })

});
//查询申请费用
function absenteeExpend(){
 	 var obj = document.getElementsByName("checkbox");
 	 var checkVal = [];
 	 for(k in obj){
 		 if(obj[k].checked){
 			 checkVal.push(obj[k].value);
 		 }
 	 }
 	 if(checkVal==null||checkVal==""){
 		  toastr.error("请勾选提交毕业的人员！");
 	 }
 	 
 }

//初始化加载数据
DataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
            fnCallback(response.returnObject);
        }
    });
};
function scoreInforetrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var idcard = $('#scoreManage input[name="idcard"]').val();
    var projectId = $('#scoreManage input[name="projectId"]').val();
    var projectLevelId = $('#scoreManage input[name="projectLevelId"]').val();
    aoData.push({"name": "idcard", "value": idcard});
    aoData.push({"name": "projectId", "value": projectId});
    aoData.push({"name": "levelId", "value": projectLevelId});
    $.ajax({
        "url": sSource,
        "data": aoData,
        "cache": false,
        "dataType": 'json',
        "type": "POST",
        "success": function (response) {
        	$('#scoreManage input[name="name"]').val((response.returnObject).aaData[0]["name"]);
        	$('#scoreManage input[name="course"]').val((response.returnObject).aaData[0]["course"]);
        	$('#scoreManage input[name="level"]').val((response.returnObject).aaData[0]["level"]);
            fnCallback(response.returnObject);
        }
    });
};

function scoreManage(idcard,projectId,projectLevelId){
	$('#scoreManage input[name="idcard"]').val(idcard);
	$('#scoreManage input[name="projectId"]').val(projectId);
	$('#scoreManage input[name="projectLevelId"]').val(projectLevelId);
	scoreInfoDataTable.init();
}

//学员毕业
function studentBY(){
	var ids = '';
	$('#absenteeControl input.checkchild:checkbox:checked').each(function(){
		ids = ids +$(this).attr('infoManageId')+",";
	});
	ids = ids.substring(0,ids.length-1);
	var infoManageIds = ids.split(",");
	for (i=0;i<infoManageIds.length ;i++ ) {
		var infoManageId = infoManageIds[i];
		 $.ajax({
			 type: "POST",
	            url: ctx + '/graduateStudents/addNewRecord',
	            data: {infoManageId:infoManageId,status:0},
	            dataType: 'json',
	            success: function (data) {
	            	if(data == "新增成功！"){
	            		toastr.success("插入数据成功！");
	            	}
	            },
	            error: function (msg) {
	                toastr.error("系统错误");
	            }
		 });
	}
	 var obj = document.getElementsByName("checkbox");
	 var checkVal = [];
	 for(k in obj){
		 if(obj[k].checked){
			 checkVal.push(obj[k].value);
		 }
	 }
	 if(checkVal==null||checkVal==""){
		  toastr.error("请勾选提交毕业的人员！");
	 }
	 for(var i=0; i<checkVal.length; i++){
		 var params=""; 
		 var id = checkVal[i];
		 params += "&id=" + id;
		 params += "&aplliedforStatus=" + 7;
		
		 $.ajax({
			 type: "POST",
	            url: ctx + '/examWorkbench/updateRecord',
	            data: params,
	            dataType: 'json',
	            success: function (data) {
	            },
	            error: function (msg) {
	                toastr.error("系统错误");
	            }
		 });
		 
		 DataTable.init();
	 }
}

//回车搜索
function search(){
	if(event.keyCode==13){
		DataTable.init();
	}
}


