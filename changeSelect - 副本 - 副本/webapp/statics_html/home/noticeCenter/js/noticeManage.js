$(function () {
    //下拉框多选
    multiSelect()

    // 富文本编辑器初始化
    KindEditor.create('.content');

    //新增
    $('.addBtn').on('click', function () {
        $('.noticeManageAdd').modal('show')
    })

    //编辑
    $('#noticeManage').on('click','.edit', function () {
        $('.noticeManageEdit').modal('show')
    })

    //编辑
    $('#noticeManage').on('click','.delete', function () {
        //删除
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
            swal("", "删除成功！", "success");
        });
    })



})