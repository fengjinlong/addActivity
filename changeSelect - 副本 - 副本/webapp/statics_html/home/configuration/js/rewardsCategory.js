$(function () {
    /**
     * 新增功能
     */
    $('.rewardsCategoryAdd').on('click', function () {
        var addtr = '<tr>'
            + '<td></td>'
            + '<td class="hidden"></td>'
            + '<td>'
            + '  <select class="input-sm form-control type">'
            + '     <option value="">请选择</option>'
            + '     <option value="1">奖励</option>'
            + '     <option value="2">惩罚</option>'
            + '   </select>'
            + '</td>'
            + '<td>'
            + '     <input type="text" class="input-sm form-control rewardType">'
            + '</td>'
            + '<td>'
            + '  <a href="javascript:;" class="save-add"><i class="fa fa-save green" data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i></a>'
            + '  <a href="javascript:;" class="cancel-add"><i class="fa fa-times warning" data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i></a>'
            + '</td>'
            + '</tr>';
        if ($('#rewardsCategory tbody tr .form-control').length == 0) {
            $('#rewardsCategory').find('tbody').prepend(addtr);
            $('[data-toggle="tooltip"]').tooltip();
        }
        
        //取消
        $('#rewardsCategory tbody').on('click', '.cancel-add', function () {
            $(this).parent().parent().remove();
        });
    });
    
    //保存
    $('#rewardsCategory tbody').on('click', '.save-add', function (event) {
        var type = $('#rewardsCategory').find('.type').val();
        var rewardType = $('#rewardsCategory').find('.rewardType').val();
        if (rewardType == "" || rewardType == null) {
            toastr.error("请填写类别！");
            return;
        }
        if (type == "" || type == null) {
            toastr.error("请选择奖惩种类！");
            return;
        }
        $.ajax({
            url: ctx + '/bizRewardsCategory/addNewRecord',
            type: 'POST',
            data: {
                type: type,
                rewardType: rewardType
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == "success") {
                	DataTable.init();
                }
                else{
                    toastr.error(data.msg);
                }
            },
            error: function (response) {
                toastr.error("系统错误");
            }
        });

        //按钮切换
        $(this).removeClass('save-add').addClass('edit');
        $(this).html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
        $(this).next().removeClass('cancel-add').addClass('delete');
        $(this).next().html('<i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
        $('[data-toggle="tooltip"]').tooltip();
    });

    
    /**
     * 编辑功能
     */
    $('#rewardsCategory tbody').on('click', '.edit', function () {
        var tds = $(this).parent().siblings();
        //奖惩种类
        var type = tds.eq(2).text().trim();

        //类别
        var rewardsType = tds.eq(3).text();
        
        if ($('#rewardsCategory tbody input.form-control').length > 0) {
            var tdss = $('#rewardsCategory tbody input.form-control').parent().siblings();
            tdss.eq(0).html('<label><input type="checkbox"><span class="text"></span></label>');
            $('#rewardsCategory tbody input.form-control').parent().html(rewardsType);
            tdss.eq(3).find('.cancel').removeClass('cancel').addClass('delete').html('<i class="fa fa-trash-o danger"  data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            tdss.eq(3).find('.save-bj').removeClass('save-bj').addClass('edit').html('<i class="fa fa-edit blue"  data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            
            tds.eq(0).html('');
	        tds.eq(1).html(tds.eq(1).text().trim());
	        tds.eq(2).html(tds.eq(2).text().trim());
	        tds.eq(3).html('<input type="text" name="rewardsType" value="' + tds.eq(3).text().trim() + '" class="input-sm form-control rewardsType">');

	        //按钮切换
	        $(this).removeClass('edit').addClass('save-bj');
	        $(this).html('<i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
	        $(this).next().removeClass('delete').addClass('cancel');
	        $(this).next().html('<i class="fa fa-times warning"  data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
	        $('[data-toggle="tooltip"]').tooltip();
        }else{
		 	tds.eq(0).html('');
	        tds.eq(1).html(tds.eq(1).text().trim());
	        tds.eq(2).html(tds.eq(2).text().trim());
	        tds.eq(3).html('<input type="text" name="rewardsType" value="' + tds.eq(3).text().trim() + '" class="input-sm form-control rewardsType">');

	        //按钮切换
	        $(this).removeClass('edit').addClass('save-bj');
	        $(this).html('<i class="fa fa-save green"  data-toggle="tooltip" data-placement="top" data-original-title="保存" title="保存"></i>');
	        $(this).next().removeClass('delete').addClass('cancel');
	        $(this).next().html('<i class="fa fa-times warning"  data-toggle="tooltip" data-placement="top" data-original-title="取消" title="取消"></i>');
	        $('[data-toggle="tooltip"]').tooltip();
    	}
     
       
        
        //编辑取消
        $('#rewardsCategory tbody').on('click', '.cancel', function () {
            tds.eq(0).html('<label><input type="checkbox"><span class="text"></span></label>');
            tds.eq(2).html(type);
            tds.eq(3).html(rewardsType);

            //按钮切换
            $(this).removeClass('cancel').addClass('delete');
            $(this).html('<i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i>');
            $(this).prev().removeClass('save-bj').addClass('edit');
            $(this).prev().html('<i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i>');
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    
    //编辑保存
    $('#rewardsCategory tbody').on('click', '.save-bj', function (event) {
        var rewardId = $(this).parent().siblings().eq(1).text();
        var rewardType = $(this).parent().siblings().eq(3).find(".rewardsType").val();
        $.ajax({
            url: ctx + '/bizRewardsCategory/updateRecord',
            type: 'POST',
            dataType: 'json',
            data: {
                "rewardId": rewardId,
                "rewardType": rewardType
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
    })
    

    
    
    /**
     * 删除功能
     */
    $('#rewardsCategory tbody').on('click', '.delete', function () {
        var rewardId = $(this).parent().siblings().eq(1).text();
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
	            url: ctx + '/bizRewardsCategory/updateRecord',
	            type: 'POST',
	            dataType: 'json',
	            data: {
	                "rewardId": rewardId,
	                "deleteMark": 0
	            },
	            success: function (data) {
	                if (data.status != "success") {
	                    toastr.error("删除不成功，请重试！");
	                } else {
	                	swal("", "删除成功！", "success");
	                	DataTable.init();
	                }
	            },
	            error: function () {
	                toastr.error("系统错误");
	            }
	        });
        });
        return false;
    });
});

//初始化数据
var DataTable = function () {
    return {
        init: function () {
            var Table = $('#rewardsCategory').dataTable({
                "bPaginate": true,  //是否显示分页
                "iDisplayLength": 15,
                "bLengthChange": false,//每页显示的记录数
                "bFilter": false, //搜索栏
                "bSort": true, //是否支持排序功能
                "bInfo": true, //显示表格信息
                "bAutoWidth": false,  //自适应宽度
                "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
                //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
                "sAjaxSource": ctx + '/bizRewardsCategory/load',
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
                        "mData": "rewardId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            return '<label  class="labletab" style="padding-top: 0px"> <input name="ajaxcheckbox" type="checkbox" class="checkchild"> <span class="text" ></span> </label>';
                        }
                    },
                    {"mData": "rewardId", 'sClass': "hiddenCol"},
                    {
                        "mData": "type", 'sClass': "text-center", "mRender": function (data, type, full) {
                        if (data == 1) {
                            return '<span class="text">奖励</span>';
                        } else {
                            return '<span class="text">惩罚</span>';
                        }
                    }
                    },
                    {"mData": "rewardType", 'sClass': "text-center"},
                    {
                        "mData": "rewardId",
                        'sClass': "text-center",
                        "bSortable": false,
                        "mRender": function (data, type, full) {
                            var u = '<a href="#" class="edit" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="fa fa-edit blue" data-toggle="tooltip" data-placement="top" data-original-title="编辑" title="编辑"></i></a>';
                            var d = '<a href="#" class="delete"><i class="fa fa-trash-o danger" data-toggle="tooltip" data-placement="top" data-original-title="删除" title="删除"></i></a>';
                            return u + d;
                        }
                    }
                ],
                "aoColumnDefs": [{
                    sDefaultContent: '',
                    aTargets: ['_all']
                }],
            });
        }
    }
}();

//数据初始化
$("#rewardsCategory tbody").html("<tr><td height='300' colspan='4' class='text-center'></td></tr>");
$("#rewardsCategory tbody>tr>td").mLoading({
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
$('#rewardsCategory thead .checkAll').on('click', function(){
    if($(this).prop('checked')){
        $('#rewardsCategory tbody .checkchild').prop('checked', true);
    }else{
        $('#rewardsCategory tbody .checkchild').prop('checked', false);
    }
})
