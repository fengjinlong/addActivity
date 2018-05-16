$(function () {
    //添加用户
    $('.btn-next').on('click', function () {
        $('#step1').hide();
        $('#step2').removeClass('hidden').show();
        $('.progress-bar').css('width','100%');
        $('.steps .step2').addClass('active');
    });
    $('.btn-prev').on('click', function () {
        $('#step2').hide();
        $('#step1').show();
        $('.progress-bar').css('width','18%');
        $('.steps .step2').removeClass('active');
    });
    init();
})

/* hanlinxiu */
$(function () {

    $('input[name="avatar"]').change(function () {

        uploadFile(this);
    })

});

function validateForm() {

    $.ajax({
        url: __root__ + '/user/addNewUser',
        type: 'POST',
        data: $('#myform').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.status == "success")
                alert(data.msg);
            else
                alert(data.msg);
        },
        error: function (response) {
            alert("系统错误");
        }
    });
    return false;
}


//文件上传
function uploadFile(t) {

    var _this = $(t);

    var formData = new FormData();

    formData.append('file', _this[0].files[0]);

    var inputName = _this.attr('extra');

    $.ajax({
        url: __root__ + '/file/uploadFile',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert('系统错误');
        }
    });
};
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback){
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init (){
	var init = $('#init').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		"sPaginationType": "extStyle",
		"bPaginate":true,
		"bLengthChange": false, 
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
		"sAjaxSource" : ctx+'/user/load',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "userId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				return '<label onclick="tj('+data+')" class="labletab" style="padding-top: 0px"> <input name="ajaxradio" type="checkbox" class="radio_1" onClick=""> <span class="text" checked></span> </label>';
              }},
			{"mDataProp" : "userId","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "realName","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "serviceRow","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				if(data==1){
					return "男";
				}else{
					return "女";
				}
				
              }},
              {"mDataProp" : "department_id","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "duty_id","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "role_id","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "create_date","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "enable","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "enable","bSortable": false,'sClass': "text-center"},
              {"mDataProp" : "userId","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
				if(data==1){
					return "男";
				}else{
					return "女";
				}
				
              }}],
			"aoColumnDefs" : [{
   	            sDefaultContent: '',
   	            aTargets: [ '_all' ]
	   	      }]
		});
}