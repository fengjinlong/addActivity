$(function () {
    // 下一步
    $('#productInfo .btn-next').on('click', function () {
        $('#WiredWizard li:first').removeClass('active').addClass('complete');
        $('#WiredWizard li:last').addClass('active');
        $('#productInfo').removeClass('active');
        $('#productPrice').addClass('active');
    })

    //上一步
    $('#productPrice .btn-prev').on('click', function () {
        $('#WiredWizard li:first').removeClass('complete').addClass('active');
        $('#WiredWizard li:last').removeClass();
        $('#productInfo').addClass('active');
        $('#productPrice').removeClass('active');
    })

    // 分步切换(产品查看和编辑)
    // $('#WiredWizard li .step').on('click', function () {
    //     var currentId = $(this).parent().attr('data-target');
    //     if (currentId == '#productInfo') {
    //         $('#WiredWizard li:first').removeClass('complete').addClass('active');
    //         $('#WiredWizard li:last').removeClass();
    //         $('#productInfo').addClass('active');
    //         $('#productPrice').removeClass('active');
    //     }
    //     if (currentId == '#productPrice') {
    //         $('#WiredWizard li:first').removeClass('active').addClass('complete');
    //         $('#WiredWizard li:last').addClass('active');
    //         $('#productInfo').removeClass('active');
    //         $('#productPrice').addClass('active');
    //     }
    // })

    // 服务配置
    $('#examinationDateTable').on('click', '.serviveconfig-btn', function () {
        $('.serviceConfigModal').modal('show');
    })


    //产品包含服务
    $('.serviceConfigModal  .header').on('click', '.operate-btn', function () {
        var trHtml = '<tr>' +
            '    <td>' +
            '        <select name="" class="form-control selectpicker" multiple="" title="--请选择--">' +
            '            <option value="">北京分校</option>' +
            '            <option value="">上海分校</option>' +
            '            <option value="">天津分校</option>' +
            '        </select>' +
            '    </td>' +
            '    <td>' +
            '        <select class="form-control">' +
            '            <option value="">报考服务</option>' +
            '            <option value="">重修服务</option>' +
            '            <option value="">补考服务</option>' +
            '        </select>' +
            '    </td>' +
            '    <td>' +
            '        <select class="form-control">' +
            '            <option value="">课程培训费</option>' +
            '            <option value="">协议费</option>' +
            '            <option value="">报考服务费</option>' +
            '        </select>' +
            '    </td>' +
            '    <td>' +
            '        <input type="text" class="form-control">' +
            '    </td>' +
            '    <td>' +
            '        <input type="text" class="form-control">' +
            '    </td>' +
            '    <td>' +
            '        <label>' +
            '            <input type="checkbox" class="suspendService"' +
            '                   name="suspendService">' +
            '            <span class="text"></span>' +
            '        </label>' +
            '    </td>' +
            '    <td>' +
            '        <select name="" class="form-control selectpicker" multiple="" title="--请选择--">' +
            '            <option value="">费用协议</option>' +
            '            <option value="">费用协议</option>' +
            '            <option value="">费用协议</option>' +
            '        </select>' +
            '    </td>' +
            '    <td>' +
            '        <label>' +
            '            <input type="checkbox" class="suspendService"' +
            '                   name="suspendService">' +
            '            <span class="text"></span>' +
            '        </label>' +
            '    </td>' +
            '    <td>' +
            '        <label>' +
            '            <input type="checkbox" class="suspendService"' +
            '                   name="suspendService">' +
            '            <span class="text"></span>' +
            '        </label>' +
            '    </td>' +
            '</tr>';
        //增加行
        if ($(this).is('.fa-plus')) {
            $('#productIncludeService tbody').append(trHtml);
            $('#productIncludeService tbody .selectpicker').selectpicker();
        }

        //删除行
        if ($(this).is('.fa-minus')) {
            if ($('#productIncludeService tbody tr').length > 1) {
                $('#productIncludeService tbody tr:last').remove();
            }
        }
    })

    //招生价格编辑
    $('#examinationDateTable').on('click', '.prices-edit', function () {
        $('.pricesEditModal').modal('show');
    })

    // 班型价格
    function registerGuide(parent, tableId) {
        var index = 1;
        $('.pricesEditModal').find(parent + ' .header').on('click', '.operate-btn', function () {
            index++;
            var trHtml = '<tr parent-tr="parent-' + index + '">' +
                '<td  rowspan="1">' +
                '    <select class="form-control selectpicker" multiple title="--请选择--">' +
                '        <option value="">北京分校</option>' +
                '        <option value="">上海分校</option>' +
                '        <option value="">武汉分校</option>' +
                '    </select>' +
                '</td>' +
                '<td  class="costCategory">' +
                '    <div class="col-sm-10 no-padding">' +
                '        <select class="form-control">' +
                '            <option value="">费用种类</option>' +
                '            <option value="">费用种类</option>' +
                '        </select>' +
                '    </div>' +
                '    <label class="control-label pull-left">' +
                '        <a class="fa fa-plus success operate-btn"></a>' +
                '    </label>' +
                '</td>' +
                '<td width="13%">' +
                '    <input type="text" class="form-control">' +
                '</td>' +
                '<td width="13%">' +
                '    <input type="text" class="form-control">' +
                '</td>' +
                '<td>' +
                '    <label>' +
                '        <input type="checkbox">' +
                '        <span class="text"></span>' +
                '    </label>' +
                '</td>' +
                '<td>' +
                '    <select class="form-control selectpicker" multiple title="--请选择--">' +
                '        <option value="">费用协议</option>' +
                '        <option value="">费用协议</option>' +
                '    </select>' +
                '</td>' +
                '<td>' +
                '    <label>' +
                '        <input type="checkbox">' +
                '        <span class="text"></span>' +
                '    </label>' +
                '</td>' +
                '</tr>';
            //增加行
            if ($(this).is('.fa-plus')) {
                $(tableId).find('tbody').append(trHtml);
                $(tableId).find('tbody .selectpicker').selectpicker();
            }
            //删除行
            if ($(this).is('.fa-minus')) {
                var trList = $(tableId).find('tbody tr')
                var parentTrArr = [];
                for (var i = 0; i < trList.length; i++) {
                    if ($(trList[i]).attr('parent-tr')) {
                        parentTrArr.push($(trList[i]).attr('parent-tr'));
                    }
                }
                var parentTr = parentTrArr[parentTrArr.length - 1];
                if (parentTr != 'parent-1') {
                    $(tableId).find('tbody tr[parent-tr=' + parentTr + ']').remove();
                    $(tableId).find('tbody tr[child-tr=' + parentTr + ']').remove();
                }
            }
        })
    }

    registerGuide('#revenueCost', '#revenueCostTable');
    registerGuide('#incurExpense', '#incurExpenseTable');

    // 费用种类
    function costCategory(parent, tableId) {
        $('.pricesEditModal').find(parent + ' ' + tableId).on('click', '.operate-btn', function () {
            var currentTr = $(this).parent().parent().parent();
            var rowspan = Number(currentTr.find('td:eq(0)').attr('rowspan'));
            var childTr = currentTr.attr('parent-tr');
            var trHtml = '<tr child-tr = ' + childTr + '>' +
                '<td  class="costCategory">' +
                '    <div class="col-sm-10 no-padding">' +
                '        <select class="form-control">' +
                '            <option value="">费用种类</option>' +
                '            <option value="">费用种类</option>' +
                '        </select>' +
                '    </div>' +
                '    <label class="control-label pull-left">' +
                '        <a class="fa fa-minus danger operate-btn"></a>' +
                '    </label>' +
                '</td>' +
                '<td width="13%">' +
                '    <input type="text" class="form-control">' +
                '</td>' +
                '<td width="13%">' +
                '    <input type="text" class="form-control">' +
                '</td>' +
                '<td>' +
                '    <label>' +
                '        <input type="checkbox">' +
                '        <span class="text"></span>' +
                '    </label>' +
                '</td>' +
                '<td>' +
                '    <select class="form-control selectpicker" multiple title="--请选择--">' +
                '        <option value="">费用协议</option>' +
                '        <option value="">费用协议</option>' +
                '    </select>' +
                '</td>' +
                '<td>' +
                '    <label>' +
                '        <input type="checkbox">' +
                '        <span class="text"></span>' +
                '    </label>' +
                '</td>' +
                '</tr>';
            //增加行
            if ($(this).is('.fa-plus')) {
                rowspan++;
                currentTr.find('td:eq(0)').attr('rowspan', rowspan)
                currentTr.after(trHtml);
                $(tableId).find('tbody .selectpicker').selectpicker();
            }
            if ($(this).is('.fa-minus')) {
                var currentChildTr = currentTr.attr('child-tr');
                var chlidRowspan = $(tableId).find('tbody tr[parent-tr=' + currentChildTr + ']').find('td:first').attr('rowspan');
                chlidRowspan--;
                $(tableId).find('tbody tr[parent-tr=' + currentChildTr + ']').find('td:first').attr('rowspan', chlidRowspan)
                $(this).parent().parent().parent().remove();
            }
        })
    }

    costCategory('#revenueCost', '#revenueCostTable');
    costCategory('#incurExpense', '#incurExpenseTable');
})
