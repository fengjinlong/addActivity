$(function () {
    /**
     * 新增功能
     * @param parentEle
     * @param tableId
     */
    function addHandle(parentEle, tableId) {
        //媒体来源
        $(parentEle).find('.add-btn-mt').click(function () {
            var addtr =
                '<tr>' +
                '<td></td>' +
                '<td class="hidden"></td>' +
                '<td></td>' +
                '<td rowspan="1" colspan="1"><input type="text" name="typeName" class="input-sm form-control typeName">' +
                '<td  class="text-center"><input type="text" name="code" class="form-control input-sm code">' +
                ' <input class="attrType" name="attrType" type="hidden" value="1"/></td>' +
                '<td rowspan="1" colspan="1">' +
                '<select class="input-sm form-control enable" name="enable">' +
                '<option value="1">启用</option>' +
                '</select>' +
                '</td>' +
                '<td>' +
                '<a href="#" class="save-mt"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a> ' +
                '<a href="#" class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>' +
                '</td>' +
                '</tr>';
            if ($(tableId).find('tbody tr .form-control').length == 0) {
                $(tableId).find('tbody').prepend(addtr);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
        //媒体来源保存
        $(tableId).find('tbody').on('click', '.save-mt', function () {
            var attrType = $('#mediaSources').find('.attrType').val();
            var typeName = $('#mediaSources').find('.typeName').val();
            var enable = $('#mediaSources').find('.enable').val();
            var code = $('#mediaSources').find('.code').val();
            if (typeName == null || typeName == "" || typeName == "undefiend") {
                toastr.error("类型不能为空，请填写！");
                return;
            }
            $.ajax({
                url: ctx + '/studentAttr/addNewRecord',
                type: 'POST',
                data: {
                    attrType: attrType,
                    typeName: typeName,
                    enable: enable,
                    code:code
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        mtDataTable.init();
                    }
                    else
                        toastr.error(data.msg);
                },
                error: function (response) {
                    toastr.error("不能添加重复项!");
                }
            });
        });
        //咨询者类型
        $(parentEle).find('.add-btn-zxz').click(function () {
            var addtr = '<tr>' +
                '<td></td>' +
                '<td class="hidden"></td>' +
                '<td></td>' +
                '<td rowspan="1" colspan="1" class="text-center"><input type="text" name="typeName" class="form-control input-sm typeName">' +
                '<td  class="text-center"><input type="text" name="code" class="form-control input-sm code">' +
                ' <input class="attrType" name="attrType" type="hidden" value="2"/></td>' +
                '<td rowspan="1" colspan="1" class="text-center">' +
                '	<select class="input-sm form-control enable">' +
                '		<option value="1">启用</option>' +
                '	</select>' +
                '</td>' +
                '<td class="text-center">' +
                '	<a href="#" class="save-zxz"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a> ' +
                '	<a href="#" class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>' +
                '</td>' +
                '</tr>';
            if ($(tableId).find('tbody tr .form-control').length == 0) {
                $(tableId).find('tbody').prepend(addtr);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
        //咨询者类型
        $(tableId).find('tbody').on('click', '.save-zxz', function () {
            var attrType = $('#consultantsType').find('.attrType').val();
            var typeName = $('#consultantsType').find('.typeName').val();
            var enable = $('#consultantsType').find('.enable').val();
            var code = $('#consultantsType').find('.code').val();
            if (typeName == null || typeName == "" || typeName == "undefiend") {
                toastr.error("类型不能为空，请填写！");
                return;
            }
            $.ajax({
                url: ctx + '/studentAttr/addNewRecord',
                type: 'POST',
                data: {
                    attrType: attrType,
                    typeName: typeName,
                    enable: enable,
                    code:code
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        zxzDataTable.init();
                    }
                    else
                        toastr.error(data.msg);
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
        //学员学历
        $(parentEle).find('.add-btn-xl').click(function () {
            var addtr = '<tr>' +
                '<td></td>' +
                '<td class="hidden"></td>' +
                '<td></td>' +
                '<td rowspan="1" colspan="1" class="text-center"><input type="text" name="typeName" class="form-control input-sm typeName">' +
                '<td  class="text-center"><input type="text" name="code" class="form-control input-sm code">' +
                ' <input class="attrType" name="attrType" type="hidden" value="3"/></td>' +
                '<td rowspan="1" colspan="1" class="text-center">' +
                '	<select class="input-sm form-control enable">' +
                '		<option value="1">启用</option>' +
                '	</select>' +
                '</td>' +
                '<td class="text-center">' +
                '	<a href="#" class="save-xl"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a> ' +
                '	<a href="#" class="cancel-btn"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>' +
                '</td>' +
                '</tr>';
            if ($(tableId).find('tbody tr .form-control').length == 0) {
                $(tableId).find('tbody').prepend(addtr);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
        //学员学历
        $(tableId).find('tbody').on('click', '.save-xl', function () {
            var attrType = $('#degree').find('.attrType').val();
            var typeName = $('#degree').find('.typeName').val();
            var enable = $('#degree').find('.enable').val();
            var code = $('#degree').find('.code').val();
            if (typeName == null || typeName == "" || typeName == "undefiend") {
                toastr.error("类型不能为空，请填写！");
                return;
            }
            $.ajax({
                url: ctx + '/studentAttr/addNewRecord',
                type: 'POST',
                data: {
                    attrType: attrType,
                    typeName: typeName,
                    enable: enable,
                    code:code
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        xlDataTable.init();
                    }
                    else
                        toastr.error(data.msg);
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
        });
        //取消
        $(tableId).find('tbody').on('click', '.cancel-btn', function () {
            $(this).parent().parent().remove();
        });
    }

    addHandle("#home11", "#mediaSources");
    addHandle("#profile11", "#consultantsType");
    addHandle("#education", "#degree");

    /**
     * 编辑功能
     * @param tableId
     */
    function editHandle(tableId) {
        $(tableId).on('click', '.edit', function () {
            var tds = $(this).parent().siblings();
            tds.eq(0).html('');
//        	tds.eq(1).html('<input type="hidden" name="studentAttrId" value="' + tds.eq(1).text() + '" class="form-control input-sm studentAttrId">');
            tds.eq(1).html(tds.eq(1).text());
            tds.eq(2).html(tds.eq(2).text());
            tds.eq(3).html('<input type="text" name="typeName" value="' + tds.eq(3).text().trim() + '" class="form-control input-sm typeName">');
            tds.eq(4).html('<input type="text" name="code" value="' + tds.eq(4).text().trim() + '" class="form-control input-sm code">');
            $(this).removeClass('edit').addClass('save-mtly');
            $(this).html('<i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
            $(this).next().removeClass('delete').addClass('cancel');
            $('[data-toggle="tooltip"]').tooltip();
            if (tableId == "#mediaSources") {
                $(this).next().attr('onclick', 'mtDataTable.init();');
                $(this).next().html('<i class="fa fa-times cancel-btn warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
                $('[data-toggle="tooltip"]').tooltip();
            } else if (tableId == "#consultantsType") {
                $(this).next().attr('onclick', 'zxzDataTable.init();');
                $(this).next().html('<i class="fa fa-times cancel-btn warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
                $('[data-toggle="tooltip"]').tooltip();
            } else if (tableId == "#degree") {
                $(this).next().attr('onclick', 'xlDataTable.init();');
                $(this).next().html('<i class="fa fa-times cancel-btn warning"  data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
                $('[data-toggle="tooltip"]').tooltip();
            }
        })
        $(tableId).find('tbody').on('click', '.save-mtly', function () {
            var studentAttrId = $(this).parent().siblings().eq(1).text();
            var typeName = $('.typeName').val();
            var code = $('.code').val();
            $.ajax({
                url: ctx + '/studentAttr/updateRecord',
                type: 'POST',
                dataType: 'json',
                data: {
                    studentAttrId: studentAttrId,
                    typeName: typeName,
                    code:code
                },
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        mtDataTable.init();
                        xlDataTable.init();
                        zxzDataTable.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
            return false;
        })
    }

    editHandle("#mediaSources");
    editHandle("#consultantsType");
    editHandle("#degree");
});

/*媒体来源初始化*/
$("#mediaSources tbody").html("<tr><td height='300' colspan='5' class='text-center'></td></tr>");
$("#mediaSources tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
mtDataTable.init();
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
    aoData.push({"name": "attrType", "value": "1"});

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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
/*咨询者类型初始化*/
$("#consultantsType tbody").html("<tr><td height='300' colspan='5' class='text-center'></td></tr>");
$("#consultantsType tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
zxzDataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveDataZxz(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "attrType", "value": "2"});

    var searchVal = $('#searchValZxz').val();

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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
/*学历初始化*/
$("#degree tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#degree tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
xlDataTable.init();
/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveDataXl(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    aoData.push({"name": "attrType", "value": "3"});

    var searchVal = $('#searchValXl').val();

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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
//修改状态
function chooseStudentzx(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/studentAttr/updateRecord',
        type: 'POST',
        data: {
            studentAttrId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            zxzDataTable.init();
        }
    });
}
function chooseStudentzx(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/studentAttr/updateRecord',
        type: 'POST',
        data: {
            studentAttrId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            zxzDataTable.init();
        }
    });
}
function chooseStudentmt(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/studentAttr/updateRecord',
        type: 'POST',
        data: {
            studentAttrId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            mtDataTable.init();
        }
    });
}
function chooseStudentxl(val, flag) {
    var attr = $("#span" + val).attr("class");
    if (attr == "btn btn-xs btn-nouse") {
        flag = 1;
    } else {
        flag = 0;
    }
    $.ajax({
        url: ctx + '/studentAttr/updateRecord',
        type: 'POST',
        data: {
            studentAttrId: val,
            enable: flag
        },
        dataType: 'json',
        success: function (data) {
            xlDataTable.init();
        }
    });
}
//删除
function deleteStudent(id,_this) {
	var currentTab = $(_this).parents('table').attr('id');
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
        var studentAttrId = id;
        $.ajax({
            url: ctx + '/studentAttr/updateRecord',
            type: 'POST',
            data: {
                studentAttrId: studentAttrId,
                deleteMark: 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    swal("", "删除成功！", "success");
                	if(currentTab == 'degree'){
                		xlDataTable.init();
                	}else if(currentTab == 'consultantsType'){
                        zxzDataTable.init();
                	}else{
                	     mtDataTable.init();
                	}
                } else {
                    toastr.error(data.msg);
                }
            }
        });
    });
}

$(function () {
    $(".checkAll1").click(function () {
        var check = $(this).prop("checked");
        $("#mediaSources .checkchild").prop("checked", check);
    });

    $(".checkAll2").click(function () {
        var check = $(this).prop("checked");
        $("#consultantsType .checkchild").prop("checked", check);
    });
    
    $(".checkAll3").click(function () {
        var check = $(this).prop("checked");
        $("#degree .checkchild").prop("checked", check);
    });
})

//回车搜索
function search(identifyStr) {
    if (event.keyCode == 13) {
        if (identifyStr == 'mtData') {
            mtDataTable.init();
        } else if (identifyStr == 'zxzData') {
            zxzDataTable.init();
        } else if (identifyStr == 'xlData') {
            xlDataTable.init();
        }

    }
}