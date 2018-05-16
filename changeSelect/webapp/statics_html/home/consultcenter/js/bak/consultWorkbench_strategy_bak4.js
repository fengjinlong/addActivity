//攻略
$(".strategy-btn").on("click", function () {
    $(".aaa,.bs-example-modal-lga").animate({"margin-left": "-15%"});
    $(".strategy").animate({"margin-left": "53.4%"});
    $(".strategy").css({"z-index": 1051});
    initGL();
});

//关闭弹窗同时关闭攻略
$('.aaa').on('hide.bs.modal', function () {
	$('.strategy').modal('hide');
	//清空订座费，防止下次点击查看数据还在
    $('#dingzuoI').val(0);
})

/**
 * 初始化攻略列表
 * @returns
 */
function initglTablezy() {
    $('#tablezy').dataTable({
        "bAutoWidth": false,
        "bFilter": false,
        "bPaginate": true,
        "bSort": false, //是否支持排序功能
        "bLengthChange": true,
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sProcessing": ""
        },
        "sAjaxSource": ctx + '/bizProductPrice/ajaxGL',
        "bDestroy": true,
        "bRetrieve": false,
        "bServerSide": true,
        "fnServerData": initDatazy,
        "aoColumns": [
            {
                "mDataProp": "schoolName", 'sClass': "text-center"
            },
            {"mDataProp": "productModelName", 'sClass': "text-center"},
            {"mDataProp": "productName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "productExamName", "bSortable": false, 'sClass': "text-center"},
            {"mDataProp": "price", "bSortable": false, 'sClass': "text-center","mRender": function (data, type, full) {
               if(full['price']!=null){
            	   var json = eval(full['price']);
            	   var price = 0;
            	   for(var i=0;i<json.length;i++){
            		   price += json[i].price;
            	   }
               }
               return price;
            }},
            {
                "bSortable": false,
                'sClass': "text-center",
                "mRender": function (data, type, full) {
                    var u1 = '<a href="#" class="view"'
                        + 'data-toggle="modal" data-backdrop="static" data-record=\'' + JSON.stringify(full) + '\''
                        + '   data-target=".professionView">'
                        + '   <i class="fa fa-search warning" data-toggle="tooltip" data-placement="top" title="查看"></i>'
                    return u1;
                }
            }
        ],
        "aoColumnDefs": [{
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    });
    $("#tablezy_wrapper").removeClass();
    $('#tablezy_wrapper').addClass("table-scrollable");

    //每页显示记录数
    //$('#tablezy_wrapper .dataTables_info').parent().append($('#tablezy_wrapper .dataTables_length'));
    $('#tablezy_wrapper .dataTables_info').parent().css('width','40%')
    $('#tablezy_wrapper .dataTables_paginate').parent().css('width','60%')
    $('#tablezy_wrapper .dataTables_length').remove();
    HScrollBar('#tablezy_wrapper');
}
//初始化攻略列表职业-方法
function initDatazy(sSource, aoData, fnCallback, oSettings) {
    /**
     * 参数添加
     */
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    aoData.push({"name": "projectId", "value": $('#zyproject').val()});
    aoData.push({"name": "levelId", "value": $('#zyprojectleven').val()});
    aoData.push({"name": "depId", "value": $('#zybranchSchool').val()});
    aoData.push({"name": "productId", "value": $('#zyproduct').val()});

    $.ajax({
        "type": "Post",
        "url": sSource,
        "dataType": "json",
        "data": aoData,
        "success": function (resp) {
            fnCallback(resp.returnObject);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
//攻略-职业tab
function zytable(){
	initglTablezy();//初始化攻略-专业
}

//初始化招生地区，考试地区信息
function initGL() {
   $('#gonglueText').find('select[name!="educationForm"]').find('option').remove(); 
   $('#gonglueText').find('select[name!="educationForm"]').trigger('chosen:updated');
   $('#gonglueText').find('select[name="educationForm"]').val(0); 
   var def = new Option("--请选择--", '');
   document.getElementById("zybranchSchool").options.add(def, 0);
   
    $.ajax({
        url: ctx + '/department/getAllOption',
        type: 'POST',
        data: {type: 3},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.list.length; i++) {
                var o = new Option(data.list[i].fullName, data.list[i].departmentId);
                document.getElementById("zybranchSchool").options.add(o);
            }
          
            $('#zybranchSchool').trigger('chosen:updated');
            $("#zybranchSchool").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        },
        error: function (response) {
            toastr.error("系统错误");
        }
    });
    
    var def = new Option("--请选择--", '');
    document.getElementById("zyproject").options.add(def, 0);
    $.ajax({
        async: false,
        url: ctx + "/bizScale/loadProject",
        data: {projectType: 1},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var o = new Option(data[i].fullName, data[i].projectId);
                document.getElementById("zyproject").options.add(o);
            }
           
            $('#zyproject').trigger('chosen:updated');
            $("#zyproject").chosen({no_results_text: "没有匹配项", search_contains: true});
            $('.chosen-container').width('100%');
        }
    });
}
