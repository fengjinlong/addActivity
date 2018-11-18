$(function () {
    //优惠类型
    function preferentialType(ele) {
        if ($(ele).prop('checked')) {
            $(ele).parent().parent().siblings().show();

        } else {
            $(ele).parent().parent().siblings().hide();
        }
        

        $(ele).click(function () {
            if ($(this).prop('checked')) {
                $(this).parent().parent().siblings().show();
            } else {

                $(this).parent().parent().siblings().hide();
            }
        })
        
    }

    preferentialType('.preferential');
    preferentialType('.holidayPromo');

    //预约时间
    $(".subscribeDate").jeDate({
        format: "YYYY-MM-DD hh:mm:ss"
    });

    //转为预约
    $('.subscribe,.dropIn,.callback,.information').on('show.bs.modal', function () {
        $('.bs-example-modal-lg,.bs-example-modal-lg1').css('z-index', 1039);
    }).on('hide.bs.modal', function () {
        $('.bs-example-modal-lg,.bs-example-modal-lg1').css('z-index', 1050);
    });

    //报考地区
    $(".examRegion").on({
        focus: function () {
            $('.attribution').show();
        },
        click: function () {
            $('.attribution').show();
        },
    });

    function examRegion(parentEle) {
        $(parentEle).find('.attribution .confirm-btn').click(function () {
            if ($(parentEle).find('.province :selected').val() != "0" && $(parentEle).find('.city :selected').val() != "0") {
                $(parentEle).find('.examRegion').val($(parentEle).find('.city :selected').text())
                $(parentEle).find('.attribution').hide();
            }
        });
    }

    //报考地区
    examRegion('.bs-example-modal-lg');
    examRegion('.bs-example-modal-lg1');
    examRegion('.bs-example-modal-lg2');
    examRegion('.bs-example-modal-lg3');
    examRegion('.bs-example-modal-lg4');
    examRegion('.bs-example-modal-lg5');

    //点击编辑编辑支付方式

    $('.payment .fa').hide();

    $('.btn_special_edit').click(function () {
        $('.payment select,.payment input').removeAttr('disabled');
        $('.payment .fa').show();
        $('.paymentInfo td .payment .fa-minus-circle').hide();
        //咨询分校切换
        $(".school").html('<select class="form-control"><option value="0">北京分校</option><option value="0">北京分校</option></select>')
    })

    $('.paymentInfo').on('click', '.payment-btn', function () {
        var payment = ''
            + '<div class="payment">'
            + '    <div class="col-sm-5 margin-right-10">'
            + '        <select class="form-control" disabled>'
            + '            <option>现金</option>'
            + '            <option>刷卡</option>'
            + '            <option>支付</option>'
            + '            <option>汇款-微信</option>'
            + '            <option>汇款-支付宝</option>'
            + '            <option>汇款-网络</option>'
            + '            <option>银行转账</option>'
            + '            <option>分期</option>'
            + '        </select>'
            + '    </div>'
            + '    <div class="col-sm-5">'
            + '          <input class="form-control" type="text" value="2000" disabled>'
            + '    </div>'
            + '    <i class="fa fa-plus-circle payment-btn blue control-label"></i>'
            + '    <i class="fa fa-minus-circle payment-btn danger control-label"></i>'
            + '</div>'
        if ($(this).is('.fa-plus-circle')) {
            $(this).parent().parent().append(payment);
        }
        if ($(this).is('.fa-minus-circle')) {
            $(this).parent().remove();
        }
    });

    //点击报名回到顶部
    $('.apply-btn').click(function () {
        $('.bs-example-modal-lg5 .modal-content .modal-body').scrollTop(0);
    });
    //点击类型，显示和隐藏
    var selNum = $(".show-hide-par").val();
    var selVal = $(".show-hide-par option:checked").text();
    if (selVal == "学历") {
        $(".show-hide").show();
    } else if (selVal == "职业资格") {
        $(".show-hide").hide();
    }
    $(".show-hide-par").change(function () {
        var selNum = $(".show-hide-par").val();
        var selVal = $(".show-hide-par option:checked").text();
        if (selVal == "学历") {
            $(".show-hide").show();
        } else if (selVal == "职业资格") {
            $(".show-hide").hide();
        }
    });
    //日期
    $('.date-picker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });
    //点击公略
    $(".gl").on("click", function () {
        $(".gonglue").animate({"margin-left": "-700px"});
        $(".gonglue2").animate({"margin-left": "900px"});

    })
    $(".gl_close").on("click", function () {
        $(".gonglue").animate({"margin-left": 0});
    })

    //客户标签树结构

    //配置数据
    var data = [
        {
            "id": 1,
            "pId": 0,
            "name": "兴趣爱好",
            "open": true,
        },
        {
            "id": 11,
            "pId": 1,
            "name": "台球",
            "target": "_blank",
        },
        {
            "id": 12,
            "pId": 1,
            "name": "抽烟",
            "target": "_blank",
        },
        {
            "id": 13,
            "pId": 1,
            "name": "足球",
            "target": "_blank",
        },
        {
            "id": 14,
            "pId": 1,
            "name": "喝酒",
            "target": "_blank",
        },
        {
            "id": 14,
            "pId": 1,
            "name": "看书",
            "target": "_blank",
        },
        {
            "id": 2,
            "pId": 0,
            "name": "工作状态",
            "open": true
        },
        {
            "id": 21,
            "pId": 2,
            "name": "经常出差",
            "target": "_blank",
        },
        {
            "id": 22,
            "pId": 2,
            "name": "很少出差工作稳定",
            "target": "_blank",
        },
        {
            "id": 3,
            "pId": 0,
            "name": "学历情况",
            "isParent": true,
            "open": true
        },
        {
            "id": 31,
            "pId": 3,
            "name": "小学"
        },
        {
            "id": 32,
            "pId": 3,
            "name": "初中",
            "target": "_blank",
        },
        {
            "id": 33,
            "pId": 3,
            "name": "高中",
            "target": "_blank",
        },
        {
            "id": 34,
            "pId": 3,
            "name": "大专",
            "target": "_blank",
        }
    ];

    var setting = {
        view: {
            selectedMulti: false,
        },
        check: {
            enable: true,
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        treeNode: {
            checked: false
        },
        callback: {
            onCheck: zTreeOnCheck
        }
    };

    $.fn.zTree.init($("#customerTree"), setting, data);

    /*var treeObj = $.fn.zTree.getZTreeObj("customerTree");
     treeObj.checkAllNodes(false);*/
    //取消父节点的多选框
    var zTree = $.fn.zTree.getZTreeObj("customerTree");
    var nodes = zTree.transformToArray(zTree.getNodes());
    for (var i = 0; i < nodes.length; i++) {
        var id = nodes[i].id;
        for (var j = 0; j < nodes.length; j++) {
            if (id == nodes[j].pId) {
                node = zTree.getNodeByParam("id", id, null);
                node.nocheck = true;
                zTree.updateNode(node);
            }
        }
    }
    //找到选中项
    function zTreeOnCheck(event, treeId, treeNode) {
        $(".countersign").on("click", function () {
            if (treeNode.checked == true) {
                $('.tag').append('<p class="label-box text-center"><span>' + treeNode.getParentNode().name + '</span>-<span>' + treeNode.name + '</span>'
                    + '<span class="typcn typcn-times"></span><i class="fa fa-minus-circle reduce icon-btn tag-close"></i></p>');
                treeNode.checked = false;
            }
            $('#' + treeNode.tId).find('.button').removeClass('checkbox_true_full').addClass('checkbox_false_full');
        })
    };


    $(".add").click(function () {
        if ($(this).next().hasClass('fa-minus-circle')) {
            $(".customer").modal('show');
            $(".bs-example-modal-lg").css({"z-index": 1040});
            $(".customer").css({"z-index": 1060})
        }
    })
    $(".customer .cancel,.customer .close").click(function () {
        $(".bs-example-modal-lg").css({"z-index": 1060});
        $(".customer").css({"z-index": 1040});
    })
    //点击大减号，小减号出现
    $(".reduce").on("click", function () {
        $(".tag-close").toggle("show");
        if ($(this).hasClass("fa-check-circle")) {
            $(this).removeClass("fa-check-circle").addClass("fa-minus-circle");
        } else {
            $(this).removeClass("fa-minus-circle").addClass("fa-check-circle");
        }
    })
    //点击减号删除标签
    $(".tag").on("click", ".tag-close", function () {
        $(this).parent().remove();
    })
    
    
    
    //固定按钮切换
    $(function () {
        $('.right-toolbar a').hover(function () {
            $(this).find('.up').stop().fadeIn(400);
        }, function () {
            $(this).find('.up').stop().fadeOut(400);
        })
    })

    //弹窗高度
    var height = $(window).height() - 120 + "px";
    $('.bs-example-modal-lg1>.modal-dialog>.modal-content>.modal-body').height(height);
    $(window).resize(function () {
        var height = $(window).height() - 120 + "px";
        $('.bs-example-modal-lg1>.modal-dialog>.modal-content>.modal-body').height(height);
    });
})






