function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str) { //删除左边的空格
    return str.replace(/(^\s*)/g, "");
}
function rtrim(str) { //删除右边的空格
    return str.replace(/(\s*$)/g, "");
}
var deptName = $("#deptName").val();
var deptId = $("#deptId").val();

var cityList;

$(function () {
    if (!deptId) {
        $("#addModalButton").attr("disabled", "disabled");
    }

    $("#personnelMatch").on('click', '.check,.edit', function () {
        var record = $(this).data('record');
        var userIds = record.userIds;
        var cityIds = record.cityIds;
        var userNames = record.userNames;

        $('#matchEdit .sysUser').remove();
        $('#matchEdit select[name="echelonId"]').val(record.echelon_id);
        $('#matchEdit input.dptName').val(record.full_name);
        $('#matchEdit input[name="departmentId"]').val(record.department_id);

        showEditUserCity(userIds, cityIds, userNames);

        $("#editModal").modal('show');
    })

    $.ajax({
        type: "post",
        url: ctx + "/department/getByWhere",
        data: {
            type: 3,
            parentId: 0
        },
        dataType: "json",
        success: function (dataCity) {
            cityList = dataCity.list;
        }
    });

    $('.matchAdd').on('hidden.bs.modal', function () {
        $('#matchAdd')[0].reset();
        $('#matchAdd input:hidden').val('');
        $('#matchAdd .selectpicker').selectpicker('refresh');
        $('#matchAdd .sysUser').remove();
        $('#matchAdd').data('bootstrapValidator').resetForm();
    })

    //新增人员城市信息
    $('#matchAdd').bootstrapValidator({
        message: 'This value is not valid',
        fields: {
            amount: {
                validators: {
                    notEmpty: {
                        message: '金额不能为空'
                    }
                }
            },
        },
        submitHandler: function (validator, form, submitButton) {
            var options = form.serialize();
            $.ajax({
                type: "POST",
                url: ctx + '/bizSysuserCitys/addNewRecord',
                data: options,
                dataType: 'json',
                success: function (data) {
                    if (data.status == 'success') {
                        DataTable.init();
                        $('.matchAdd').modal('hide');
                    } else {
                        //DataTable.init();
                        //$('.matchAdd').modal('hide');
                        toastr.error(data.msg);
                    }

                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });
        }
    });

    $('.matchEdit').on('hidden.bs.modal', function () {
        $('#matchEdit')[0].reset();
        $('#matchEdit input:hidden').val('');
        $('#matchEdit .selectpicker').selectpicker('refresh');
        $('#matchEdit .sysUserUpdm').remove();
        $('#matchEdit').data('bootstrapValidator').resetForm();
    })

    //编辑人员城市信息
    $('#matchEdit').bootstrapValidator({
        submitHandler: function (validator, form, submitButton) {
            var options = form.serialize();
            $.ajax({
                type: "post",
                url: ctx + '/bizSysuserCitys/updateRecord',
                data: options,
                dataType: 'json',
                success: function (data) {
                    DataTable.init();
                    $('.matchEdit').modal('hide');
                },
                error: function (msg) {
                    toastr.error("系统错误");
                }
            });

            return false;
        }
    });

    $(".matchAdd,.matchEdit").on('show.bs.modal', function () {
        loadDept();
    })
    

    $("#personnelMatch").on('click', '.delete', function () {
        var record = $(this).data('record');
        var id = record.sysuserId;
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
                url: ctx + '/bizSysuserCitys/deleteById',
                type: 'POST',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 'success') {
                        swal("", "删除成功！", "success");
                        DataTable.init();
                    } else {
                        toastr.error(data.msg);
                    }
                }
            });
        });
    })

    $(document).on('click', '#departmentId', function () {
        var cityObj = $("#departmentId");
        var cityOffset = $("#departmentId").offset();
        var rightPageLeft = $('#showPage').offset().left;
        var positionTop = cityOffset.top - ($('.navbar-inner').height() + $('.page-breadcrumbs').height() + $('.page-header').height()) + cityObj.height() + 14;

        $("#content").css({left: cityOffset.left-rightPageLeft + "px", top: positionTop + "px"}).slideDown("fast");
        $("body *:not(.menuContent)").bind("mousedown", onBodyDown);
        $('#ajaxTree').width(cityObj.width() + 14);
    })

})

//初始化数据
var DataTable = function () {
    return {
        init: function () {
            var Table = $('#personnelMatch').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 15,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/bizSysuserCitys/load',
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
                    {
                        "mData": "",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
                        }
                    },
                    {"mData": "full_name", 'sClass': "text-center"},
                    {"mData": "echelon_id", 'sClass': "text-center"},
                    {
                        "mData": "sysuserId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a data-record=\'' + JSON.stringify(full) + '\' data-type="1" class="edit"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a data-record=\'' + JSON.stringify(full) + '\' data-type="1" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u + d;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    if (aData.echelon_id == '0') {
                        $('td:eq(2)', nRow).html('第一梯队');
                    } else if (aData.echelon_id == '1') {
                        $('td:eq(2)', nRow).html('第二梯队');
                    } else if (aData.echelon_id == '2') {
                        $('td:eq(2)', nRow).html('第三梯队');
                    } else if (aData.echelon_id == '3') {
                        $('td:eq(2)', nRow).html('第四梯队');
                    } else if (aData.echelon_id == '4') {
                        $('td:eq(2)', nRow).html('第五梯队');
                    } else if (aData.echelon_id == '5') {
                        $('td:eq(2)', nRow).html('第六梯队');
                    }
                    return nRow;
                }
            });
        }
    }
}();
//数据初始化
$("#personnelMatch tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
$("#personnelMatch tbody>tr>td").mLoading({
	text: '正在加载中，请稍后......',
	 icon: "../statics_html/common/image/loading5.gif"
});
DataTable.init();

function showDepartmentTree(departmentId) {

    var setting = {
        view: {
            showIcon: true,
            showLine: true,
            expandSpeed: "normal",
            dblClickExpand: dblClickExpand
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId"
            }
        },
        callback: {
            onClick: onClick
        }
    };

    function dblClickExpand(treeId, treeNode) {
        return treeNode.level > 0;
    }

    var pId = departmentId;
    $.ajax({
        type: "post",
        url: ctx + "/user/ajaxLoadDepartmentTree",
        data: {
            pId: pId
        },
        dataType: "json",
        success: function (date) {
            $.fn.zTree.init($("#ajaxTree"), setting, date);
            var treeObj = $.fn.zTree.getZTreeObj("ajaxTree");
            var nodes = treeObj.getNodes();
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    treeObj.expandNode(nodes[i], true, false, false);
                }
            }
        }
    });
}

function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "content" || $(event.target).parents("#content").length > 0)) {
        $("#content").fadeOut("fast");
    }
}


function onClick(e, treeId, treeNode) {
    var departmentId = treeNode.id;
    $('#matchAdd .sysUser').remove();
    showUserCity(departmentId);
    var name = treeNode.name;
    $('#matchAdd input[name="departmentId"]').val(departmentId);
    $('#departmentId').val(name);
    $("#content").fadeOut("fast");
    return false;
}

function retrieveData(sSource, aoData, fnCallback, oSettings) {
    aoData.push({"name": "pageNum", "value": (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1)});
    aoData.push({"name": "pageSize", "value": oSettings._iDisplayLength});
    var searchVal = $('#searchVal').val();
    console.log(searchVal);
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

/*function editupdt(sysuserId,departmentId,echelonId){
 $('#matchEdit select[name="echelonId"]').val(echelonId);
 var sysuserId = sysuserId;
 var departmentId = departmentId;
 showUserCity(departmentId)
 }*/

function loadDept() {
    $('#matchAdd .sysUser').remove();
    var opt = "";
    opt += "<input id='departmentId' name='fullName' value='"+deptName+"'  class='form-control' readonly></input>";

    opt += "<input hidden name='departmentId' value=" + deptId + "></input>";
    $(".departmentId").html(opt);
    showDepartmentTree(deptId);
    showUserCity(deptId);
}

function showUserCity(val) {
    $.ajax({
        type: "post",
        url: ctx + "/user/selectByDepartmentUserId",
        data: {
            departmentId: val
        },
        dataType: "json",
        success: function (data) {
            $.ajax({
                type: "post",
                url: ctx + "/department/getByWhere",
                data: {
                    type: 3,
                    parentId: 0
                },
                dataType: "json",
                success: function (dataCity) {
                    var opt = "";
                    for (var i = 0; i < data.list.length; i++) {
                        opt += "<div class='form-group sysUser'><label class='control-label col-sm-3 no-padding-right'>" + data.list[i].realName + "</label>"
                        opt += "<input hidden name='sysUserCitys[" + i + "].sysUserId' value=" + data.list[i].userId + "></input>";

                        var citys = "<div class='col-sm-8'><select id='citysId' name='sysUserCitys[" + i + "].citysId' class='selectpicker form-control citysId' multiple  title='负责城市'>"
                        for (var j = 0; j < dataCity.list.length; j++) {
                            citys += "<option value='" + dataCity.list[j].departmentId + "'>" + dataCity.list[j].fullName + "</option>";
                        }
                        citys += "</select></div>";

                        opt += citys;
                        opt += "</div>";
                    }
                    $("#matchAdd .tidui").after(opt);
                    $('.sysUser .selectpicker').selectpicker({
                        'liveSearch': true,
                        'liveSearchPlaceholder': '请输入关键字',
                        'actionsBox': true,
                        'selectAllText': '全选',
                        'deselectAllText': '取消',
                        'noneSelectedText': '没有匹配项'
                    })
                    $(".sysUser .selectpicker").selectpicker('refresh');
                }
            });
        }
    });
}

function showEditUserCity(userIds, cityIds, userNames) {

    var userIdArray = userIds.split('|');
    var cityIdArray = cityIds.split('|');
    var userNamesArray = userNames.split('|');

    var opt = "";
    for (var i = 0; i < userIdArray.length; i++) {
        opt += "<div class='form-group sysUser'><label class='control-label col-sm-3 no-padding-right'>" + userNamesArray[i] + "</label>"
        opt += "<input hidden name='sysUserCitys[" + i + "].sysUserId' value=" + userIdArray[i] + "></input>";

        var citys = "<div class='col-sm-8'><select name='sysUserCitys[" + i + "].citysId' class='selectpicker form-control citysId' multiple  title='负责城市'>"
        for (var j = 0; j < cityList.length; j++) {
            citys += "<option value='" + cityList[j].departmentId + "'>" + cityList[j].fullName + "</option>";
        }
        citys += "</select></div>";

        opt += citys;
        opt += "</div>";
    }
    $("#matchEdit .tiduiupdm").after(opt);

    $('.sysUser .selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': '没有匹配项'
    })
    $(".sysUser .selectpicker").selectpicker('refresh');

    for (var i = 0; i < cityIdArray.length; i++) {
        if (cityIdArray[i])
            $('#matchEdit select[name="sysUserCitys[' + i + '].citysId"]').selectpicker('val', cityIdArray[i].indexOf(",") ? cityIdArray[i].split(',') : cityIdArray[i]);
    }

}
//下拉框change事件
function search() {
    DataTable.init();
}