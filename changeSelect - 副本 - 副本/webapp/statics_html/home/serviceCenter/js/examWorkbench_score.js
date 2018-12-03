//录入成绩弹窗
function recordInWin() {
	//如果页面当前没有选中数据，或者选中的数据大于1条都报错，给提示
	var studentInfo = getTableContent4();
	if(studentInfo.length==0) {
		toastr.error("页面没有数据被选中");
		return ;
	}
	
	if(studentInfo.length>1) {
		toastr.error("只允许选中一条数据");
		return ;
	}
	
	//获取学员姓名，学员id，产品名称，产品id
	var productId = $("productId").val();
	var productName = $("productName").val();
	var studentId = studentInfo[0].studentId;
	var studentName = studentInfo[0].studentName;
	//显示学员名称和产品名称
	$(".score-in").find("label.studentName").text("学员姓名:"+studentName);
	$(".score-in").find("label.productName").text("产品:"+productName);
	
	//根据产品id和考期id确认
    $.ajax({
        "type": "Post",
        "url": ctx + "/examWorkbenchExpress/findSubjects",
        "dataType": "json",
        "data": {productId:productId},
        "success": function (data) {
        	var str = '';
        	if(data.status=="success") {
        		for(var i=0; i<data.data.length; i++) {
        			str += '<tr>'
        				+ '<td>'
        				+ '<input type="hidden" name="studentScoreList['+i+'].subjectId" class="form-control subjectId" />'
        				+ data.data[i].subjectName
        				+ '<input type="hidden" name="studentScoreList['+i+'].subjectName" class="form-control subjectName" />'
        				+ '</td>'
        				+ '<td><input type="text" name="studentScoreList['+i+'].examinationData" class="form-control examinationData" /></td>'
        				+ '<td><input type="text" name="studentScoreList['+i+'].score" class="form-control score" /></td>'
        				+ '<td>'
        				+ '<select name="studentScoreList['+i+'].pass" class="form-control pass" >'
        				+ ' <option value="1">通过</option>'
        				+ ' <option value="0">未通过</option>'
        				+ '</select>'
        				+ '</td>'
        				+ '</tr>';
        		}
        	} 
        	$("#scoreTBody").html(str);
        },
        "error": function() {
        	toastr.error("系统错误");
        }
    });
	
	$(".score-in").modal("show");
}
//
function getTableContent4(){  
	var paramArr = new Array();
	$("#alreadyRegistion").find("tbody tr").each(function(i,e){
		var checkObj = $(e).find("td").eq(0).find("input[type='checkbox']");
		var checkFlag = $(checkObj).prop("checked");
		if(checkFlag) {
//			alert($(checkObj).attr("infomanageid")+"========"+$(checkObj).attr("productid"));
			paramArr.push({"studentId":$(checkObj).attr("studentId"), "studentName":$(checkObj).attr("studentName")});
		}
	});
	return paramArr;
}  

$('#scoreForm').bootstrapValidator({
    submitHandler: function (validator, form, submitButton) {
    	
        var options = form.serialize();//得到用户填写快递信息
        
        $.ajax({
            "type": "Post",
            "url": ctx + "/examWorkbenchExpress/addStudentScore",
            "dataType": "json",
            "data": options,
            "success": function (data) {
                $(".score-in").modal("hide");
                
                if(data.status=="success") {
                	toastr.success("成绩录入成功");
                } else {
                	toastr.error("成绩录入失败");
                }
            },
            "error": function() {
            	toastr.error("系统错误");
            }
        });
    }
});


//**************以下是导入成绩相关js
//上传文件——Boostrap-fileinput样式
$('#bulk-upload').fileinput({
    language: 'zh',
    uploadUrl: ctx + '/examWorkbenchScore/uploadCheck',
    showPreview: false
})

/**
 * 取消上传
 */
$('.fileinput-remove').click(function(){
		$('#imports').find('tbody').html("");
		$('.bulkAddBtn').removeAttr('disabled');
});

//文件上传成功后-回调函数
$("#bulk-upload").on("fileuploaded", function (event, data, previewId, index) {
    var rows = "";
    var res = data.response.data;
    for (var i = 0; i < res.length; ++i) {
        	if(res[i].enable == 1){
    		 var row = "<tr name='enable'>";
             row += "<td><input name='studentInfoManageId' value='" + res[i].studentCode + "'/></td>";
//             row += "<td><input name='studentName' value='" + res[i].studentName + "'/><input type='hidden' name='studentInfoManageId' value='" + res[i].studentInfoManageId + "'/></td>";
             row += "<td><input name='studentName' value='" + res[i].studentName + "'/></td>";
             row += "<td><input name='subjectCode' value='" + res[i].subjectCode + "'/></td>";
             row += "<td><input name='subjectName' value='" + res[i].subjectName + "'/></td>";
             row += "<td><input name='examinationData' value='" + res[i].examinationData + "'/></td>";
             row += "<td><input name='score' value='" + res[i].score + "'/></td>";
             row += "<td><input name='pass' value='" + res[i].pass + "'/></td>";
             row += "</tr>";
             rows += row;
        	}else{
        		var row = "<tr>";
                 row += "<td>" + res[i].studentInfoManageId + "'</td>";
                 row += "<td>" + res[i].studentName + "</td>";
                 row += "<td>" + res[i].subjectCode + "</td>";
                 row += "<td>" + res[i].subjectName + "</td>";
                 row += "<td>" + res[i].examinationData + "</td>";
                 row += "<td>" + res[i].score + "</td>";
                 row += "<td>" + res[i].pass + "</td>";
                 row += "</tr>";
                 rows += row;
        	}
    }
    $('#imports').find('tbody').append(rows);
    $('.bulkAddBtn').removeAttr('disabled');
});
//保存文件解析数据——确定按钮
$('.bulkAddBtn').on('hidden.bs.modal', function () {
    $('.bulkAddBtn tbody').html("");
    $('.bulkAddBtn').data('bootstrapValidator').resetForm();
})

//保存文件解析数据——上传表单数据
 $('#scoresAdd').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
        	var scores = new Array();
        $('#imports').find('tbody').find('tr[name="enable"]').each(function(){
        		var studentScore = {};
        		studentScore["studentInfoManageId"] = $(this).find('input[name="studentInfoManageId"]').val();
        		studentScore["studentName"] = $(this).find('input[name="studentName"]').val();
        		studentScore["subjectCode"] = $(this).find('input[name="subjectCode"]').val();
        		studentScore["subjectName"] = $(this).find('input[name="subjectName"]').val();
        		studentScore["examinationData"] = $(this).find('input[name="examinationData"]').val();
        		studentScore["score"] = $(this).find('input[name="score"]').val();
        		studentScore["pass"] = $(this).find('input[name="pass"]').val();
        	 	scores.push(studentScore);
        	});
        	if(scores.length > 0){
        		 $.ajax({
                     type: "POST",
                     url: ctx + '/examWorkbenchScore/addRecords',
                     data: {
                    	 	searchVal:JSON.stringify(scores)
                     },
                     dataType: 'json',
                     success: function (data) {
                         if (data.status == "success") {
                             $('.bulkAdd').modal('hide');
                             init();
                         } else {
                             toastr.error(data.msg);
                         }
                     },
                     error: function (msg) {
                         toastr.error("系统错误");
                     }
                 });
        	}else{
        		//alert("请上传文件！");
        		toastr.error("请上传文件");
        	}
        }
    });

//导入成绩弹框
function importRecordWin() {
	$(".bulkAdd").modal("show");
}
