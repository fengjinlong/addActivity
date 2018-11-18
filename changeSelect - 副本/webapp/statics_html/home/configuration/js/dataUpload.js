$(function () {
    //状态
    $('table').on('click', '.status-btn', function () {
        if ($(this).hasClass('btn-use')) {
            $(this).addClass('btn-nouse').removeClass('btn-use').html('<i class="fa fa-ban"></i> 禁用');
        } else {
            $(this).addClass('btn-use').removeClass('btn-nouse').html('<i class="fa fa-check-square-o"></i> 启用');
        }
    })

    //资料种类新增
    function addTypes() {
        $('.add-types').on('click', function () {
            var types = '<tr>'
                + '<td class="text-center"><input type="text" value="" class="input-sm form-control dataName"></td>'
                + '<td class="text-center"><input type="text" value="" class="input-sm form-control require"></td>'
                + '<td>'
                + '<a href="#" class="btn btn-xs status-btn btn-use"><i class="fa fa-check-square-o"></i>'
                + '启用</a>'
                + '</td>'
                + '<td>'
                + '<a href="#" class="btn btn-xs btn-use save-add"><i class="fa fa-copy"></i> 保存</a>'
                + '<a href="#" class="btn btn-warning btn-xs cancel-add"><i class="fa fa-times"></i> 取消</a>'
                + '</td>'
                + '</tr>';
            if ($('#dataCategory .form-control').size() == 0) {
                $('#dataCategory tbody').prepend(types);
            }
        })

        //保存
        $('#dataCategory').on('click', '.save-add', function () {
            var tds = $(this).parent().siblings();
            tds.eq(0).html(tds.eq(0).find('input').val());
            tds.eq(1).html(tds.eq(1).find('input').val());
            $(this).removeClass('btn-use save-add').addClass('btn-info edit').html('<i class="fa fa-edit"></i> 编辑');
            $(this).next().remove();
        })

        //取消
        $('#dataCategory').on('click', '.cancel-add', function () {
            $(this).parent().parent().remove();
        })
    }
    addTypes();

    //资料种类编辑
    function editTypes() {
        $('#dataCategory').on('click', '.edit', function () {
            var tds = $(this).parent().siblings();
            var dataName = tds.eq(0).text();
            var require = tds.eq(1).text();
            tds.eq(0).html('<input type="text" value="' + dataName + '" class="input-sm form-control dataName">');
            tds.eq(1).html('<input type="text" value="' + require + '" class="input-sm form-control require">');
            $(this).removeClass('btn-info edit').addClass('btn-use save-edit').html('<i class="fa fa-copy"></i> 保存');
            $(this).after('<a href="#" class="btn btn-warning btn-xs cancel-edit"><i class="fa fa-times"></i> 取消</a>');

            //取消
            $('#dataCategory').on('click', '.cancel-edit', function () {
                tds.eq(0).html(dataName);
                tds.eq(1).html(require);
                $(this).prev().removeClass('btn-use save-edit').addClass('btn-info edit').html('<i class="fa fa-edit"></i> 编辑');
                $(this).remove();
            })
        })

        //保存
        $('#dataCategory').on('click', '.save-edit', function () {
            var tds = $(this).parent().siblings();
            tds.eq(0).html(tds.eq(0).find('input').val());
            tds.eq(1).html(tds.eq(1).find('input').val());
            $(this).removeClass('btn-use save-edit').addClass('btn-info edit').html('<i class="fa fa-edit"></i> 编辑');
            $(this).next().remove();
        })


    }
    editTypes();
})
