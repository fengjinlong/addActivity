(function ($) {
    $.fn.serializeJson = function () {
        var jsonData1 = {};
        var serializeArray = this.serializeArray();

        // 先转换成{"id": ["12","14"], "name": ["aaa","bbb"], "pwd":["pwd1","pwd2"]}这种形式
        $(serializeArray).each(function () {
            if (jsonData1[this.name]) {
                if ($.isArray(jsonData1[this.name])) {
                    jsonData1[this.name].push(this.value);
                } else {
                    jsonData1[this.name] = [jsonData1[this.name], this.value];
                }
            } else {
                jsonData1[this.name] = this.value;
            }
        });
        // 再转成[{"id": "12", "name": "aaa", "pwd":"pwd1"},{"id": "14", "name": "bb", "pwd":"pwd2"}]的形式
        var vCount = 0;
        // 计算json内部的数组最大长度
        for (var item in jsonData1) {
            var tmp = $.isArray(jsonData1[item]) ? jsonData1[item].length : 1;
            vCount = (tmp > vCount) ? tmp : vCount;
        }

        var projectId = $('.signInAdd select[name="projectId"]').val();
        var levelId = $('.signInAdd select[name="levelId"]').val();
        var createUserId = $('.signInAdd input[name="createUserId"]').val();
        var createUserName = $('.signInAdd input[name="createUserName"]').val();

        if (vCount > 1) {
            var jsonData2 = new Array();
            for (var i = 0; i < vCount; i++) {
                var jsonObj = {};
                for (var item in jsonData1) {
                    jsonObj[item] = jsonData1[item][i];
                }

                jsonObj["projectId"] = projectId;
                jsonObj["levelId"] = levelId;
                jsonObj["createUserId"] = createUserId;
                jsonObj["createUserName"] = createUserName;

                jsonData2.push(jsonObj);
            }
            return JSON.stringify(jsonData2);
        } else {
            return "[" + JSON.stringify(jsonData1) + "]";
        }
    };
})(jQuery);

var DataTable = function () {
    return {
        init: function () {
            var Table = $('#signIn').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 10,
                "bLengthChange": true,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/signIn/getAll',
                "fnServerData": retrieveData,//用于替换默认发到服务端的请求操作
                "bServerSide": true,
                "bDestroy": true,
                "bRetrieve": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
                    "sInfoEmpty": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                },
                "aoColumns": [
                    {"mData": "inclassTime", 'sClass': "text-center"},
                    {"mData": "name", 'sClass': "text-center"},
                    {"mData": "idCard", 'sClass': "text-center"},
                    {"mData": "course", 'sClass': "text-center"},
                    {"mData": "level", 'sClass': "text-center"},
                    {"mData": "className", 'sClass': "text-center"},
                    {"mData": "isClass", 'sClass': "text-center","mRender": function (data, type, full) {
                       if(data==1){
                    	   return '上课';
                       }else{
                    	   return '缺课';
                       }
                    }},
                    {
                        "mData": "signInId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var deleteButton = "<a  data-id='" + data + "' class='delete'><i class='fa fa-trash-o danger' data-toggle='tooltip' data-placement='top' data-original-title='删除' title='删除'></i></a>";
                            return deleteButton;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            });

            //每页显示记录数
            $('#signIn_wrapper .dataTables_info').parent().append($('#signIn_wrapper .dataTables_length'));
        }
    }
}();


function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});

    var searchVal = $('input.searchVal').val();

    if (searchVal && searchVal.length != 0) {
        aoData.push({"name": "searchVal", "value": searchVal});
    }

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

function search() {

    if (event.keyCode == 13)
        DataTable.init();
}

(function () {
	//初始化加载数据
	$("#signIn tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
	$("#signIn tbody>tr>td").mLoading({
	    text: '正在加载中，请稍后......',
	    icon: "../statics_html/common/image/loading5.gif"
	});
    DataTable.init();

    //搜索
    $('.search-btn').click(function () {
        DataTable.init();
    })

    //上传文件
    $('#bulk-upload').fileinput({
        language: 'zh',
        uploadUrl: ctx + '/signIn/analyseFile',
        showPreview: false
    })

    $("#bulk-upload").on("fileuploaded", function (event, data, previewId, index) {
        var rows = "";
        for (var i = 0; i < data.response.length; ++i) {
            var row = "<tr>";
            row += "<td><input name='inclassTime' value='" + data.response[i].inclassTime + "'/></td>";
            row += "<td><input name='name' value='" + data.response[i].name + "'/></td>";
            row += "<td><input name='idCard' value='" + data.response[i].idCard + "'/></td>";
            row += "<td><input name='course' value='" + data.response[i].course + "'/></td>";
            row += "<td><input name='level' value='" + data.response[i].level + "'/></td>";
            row += "<td><input name='className' value='" + data.response[i].className + "'/></td>";
            row += "<td><input name='isClass' value='" + data.response[i].isClass + "'/></td>";
            row += "</tr>";
            rows += row;
            console.info(data.response[i].inclassTime);
        }
        console.info(rows);
        $('#imports').find('tbody').append(rows);

    });

    //关闭预览效果
    $(document).on('click', '#kvFileinputModal .btn-close', function () {
        $('#kvFileinputModal').modal('hide');
    })


    $.ajax({
        type: "POST",
        url: ctx + '/bizProject/getAllOption',
        dataType: 'json',
        success: function (data) {
            if (data.status == "success") {
                var options = "";
                for (var i = 0; i < data.list.length; ++i) {
                    options += "<option value='" + data.list[i].projectId + "'>" + data.list[i].fullName + "</option>";
                }
                $('.signInAdd select[name="projectId"]').html(options);
                $('.signInAdd select[name="projectId"]').val('');
            } else {
                toastr.error(data.msg);
            }
        },
        error: function (msg) {
            toastr.error("系统错误");
        }
    });


    $('.signInAdd select[name="projectId"]').change(function () {

        var projectId = $(this).val();

        $.ajax({
            type: "POST",
            url: ctx + '/bizProjectLevel/getAllOption',
            data: {projectId: projectId},
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                    var options = "";
                    for (var i = 0; i < data.list.length; ++i) {
                        options += "<option value='" + data.list[i].projectLevelId + "'>" + data.list[i].levelTitle + "</option>";
                    }
                    $('.signInAdd select[name="levelId"]').html(options);
                } else {
                    toastr.error(data.msg);
                }
            },
            error: function (msg) {
                toastr.error("系统错误");
            }
        });

    })

    $('.signInAdd').on('hidden.bs.modal', function () {
        $('#signInAdd tbody').html("");

        $('.signInAdd select[name="projectId"]').val('');
        $('.signInAdd select[name="projectId"]').change();
        $('#bulk-upload').fileinput('reset');

        $('#signInAdd').data('bootstrapValidator').resetForm();
    })

    $('#signInAdd').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var params = form.serializeJson();
            if(eval(params).length<2){
            	$('.signInAdd').modal('hide');
            	return;
            }
            $.ajax({
                type: "POST",
                url: ctx + '/signIn/saveFile',
                data: params,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8', //设置请求头信息
                success: function (data) {
                    if (data.status == "success") {
                        $('.signInAdd').modal('hide');
                        DataTable.init();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
    });

    $('#signIn').on('click', '.delete', function () {
        var signInId = $(this).attr('data-id');
        swal({
            title: "",
            text: "确定要删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            cancelButtonClass: "btn-danger",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                type: "POST",
                url: ctx + '/signIn/deleteRecord',
                dataType: 'json',
                data: {
                    signInId: signInId
                },
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        DataTable.init();
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        });
    })


})(jQuery)


	