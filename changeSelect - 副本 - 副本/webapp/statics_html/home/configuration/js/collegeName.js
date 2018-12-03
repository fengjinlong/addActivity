$(function () {
    /**
     * 新增功能
     */
    function collegeAdd() {
        $('.collegeAdd').on('click', function () {
            var addtr = '<tr>'
                + '<td></td>'
                + '<td class="hidden"></td>'
                + '<td class="text-center">'
                + '  <input type="text" value="" class="input-sm form-control schoolName">'
                + '</td>'
                + '<td class="text-center">'
                + '  <a href="#" class="save-add"><i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
                + '  <a href="#" class="cancel-add"><i class="fa fa-times warning"  data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
                + '</td>'
                + '</tr>';
            if ($('#college tbody tr .form-control').length == 0) {
                $('#college').find('tbody').prepend(addtr);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });

        //取消
        $('#college tbody').on('click', '.cancel-add', function () {
            $(this).parent().parent().remove();
        });

        //保存
        $('#college tbody').on('click', '.save-add', function () {
            var schoolName = $('#college').find('.schoolName').val();
            if (schoolName == "" || schoolName == null) {
                toastr.error("院校名称不能为空！");
                return;
            }
            if (schoolName.length >= 50) {
                toastr.error("院校名称超出长度，请确认！");
                return;
            }
            $.ajax({
                url: ctx + '/bizSchool/addNewRecord',
                type: 'POST',
                data: {
                    schoolName: schoolName
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == "success") {
                        DataTable.init();
                        //loadHtml('/bizSchool/index')
                    }
                    else
                        toastr.error(data.msg);
                },
                error: function (response) {
                    toastr.error("系统错误");
                }
            });
            $(this).removeClass('save').addClass('edit');
            $(this).html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $(this).next().removeClass('cancel').addClass('delete');
            $(this).next().html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
        });
    }

    collegeAdd();

    /**
     * 编辑功能
     */
    function collegeEdit() {
        $('#college tbody').on('click', '.edit', function () {
            var tds = $(this).parent().siblings();
            //院校名称
            schoolName = tds.eq(2).text();
            if ($('#college tbody tr input.schoolName').length == 1) {
                var trs = $('#college tbody input.schoolName').parent().siblings();
                trs.eq(0).html('<label><input type="checkbox"><span class="text"></span></label>');
                $('#college tbody input.schoolName').parent().html($('#college tbody .schoolNameText').text());
                trs.eq(2).find('.cancel-edit').removeClass('cancel-edit').addClass('delete').html('<i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
                trs.eq(2).find('.save-bj').removeClass('save-bj').addClass('edit').html('<i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');

                tds.eq(0).html('');
                tds.eq(1).html(tds.eq(1).text().trim());
                tds.eq(2).html('<span class="hide schoolNameText">' + tds.eq(2).text().trim() + '</span>' + '<input type="text" value="' + tds.eq(2).text().trim() + '" class="input-sm form-control schoolName">');
                $(this).removeClass('edit').addClass('save-bj');
                $(this).html('<i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
                $(this).next().removeClass('delete').addClass('cancel-edit');
                $(this).next().html('<i class="fa fa-times warning"></i> 取消');
                $('[data-toggle="tooltip"]').tooltip();
            } else {
                tds.eq(0).html('');
                tds.eq(1).html(tds.eq(1).text().trim());
                tds.eq(2).html('<span class="hide schoolNameText">' + tds.eq(2).text().trim() + '</span>' + '<input type="text" value="' + tds.eq(2).text().trim() + '" class="input-sm form-control schoolName">');
                $(this).removeClass('edit').addClass('save-bj');
                $(this).html('<i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
                $(this).next().removeClass('delete').addClass('cancel-edit');
                $(this).next().html('<i class="fa fa-times warning"  data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
                $('[data-toggle="tooltip"]').tooltip();
            }
        })

        //取消
        $('#college tbody').on('click', '.cancel-edit', function () {
            var tds = $(this).parent().siblings();
            tds.eq(0).html('<label><input type="checkbox"><span class="text"></span></label>');
            tds.eq(2).html(schoolName);
            $(this).removeClass('cancel-edit').addClass('delete');
            $(this).html('<i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');

            $(this).prev().removeClass('save-bj').addClass('edit');
            $(this).prev().html('<i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });

        //保存
        $('#college tbody').on('click', '.save-bj', function () {
            var schoolId = $(this).parent().siblings().eq(1).text();
            var schoolName = $(this).parent().siblings().eq(2).find(".schoolName").val();
            if (schoolName.length >= 50) {
                toastr.error("院校名称超出长度，请确认！");
                return;
            }
            $.ajax({
                url: ctx + '/bizSchool/updateRecord',
                type: 'POST',
                dataType: 'json',
                data: {
                    "schoolId": schoolId,
                    "schoolName": schoolName
                },
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {
                        DataTable.init();
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
            return false;
        });
    }

    collegeEdit();

    /**
     * 删除功能
     */
    $('#college tbody').on('click', '.delete', function () {
        var schoolId = $(this).parent().siblings().eq(1).text();
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
                url: ctx + '/bizSchool/updateRecord',
                type: 'POST',
                dataType: 'json',
                data: {
                    "schoolId": schoolId,
                    "deleteMark": 0
                },
                success: function (data) {
                    if (data.status == "success") {
                        swal("", "删除成功！", "success");
                        DataTable.init();
                    } else {
                        toastr.error("删除不成功，请重试！");
                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });
            return false;
        });
    });
})

$("#college tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#college tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();

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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
//回车搜索
function search() {
    if (event.keyCode == 13) {
        DataTable.init();
    }
}


//全选
$('#college thead .ckeckAll').on('click', function () {
    if ($(this).prop('checked')) {
        $('#college tbody .checkchild').prop('checked', true);
    } else {
        $('#college tbody .checkchild').prop('checked', false);
    }
})



