$(function () {
    //折叠按钮
    $('#sidebar-collapse').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).parent().css({'padding': '46px 11px', 'width': 72});
            $('.logo-2 img').hide();
            $('.page-content').css('marginLeft', 72);
        } else {
            $(this).parent().css({'padding': '21px 43px', 'width': 224});
            $('.logo-2 img').show();
            $('.page-content').css('marginLeft', 224);
        }
    });
    //左侧菜单切换
    $('#sidebar .sidebar-menu>li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#sidebar .sidebar-menu>li').on('mouseenter', function () {
        $(this).addClass('active').siblings().removeClass('active');
    }).on('mouseleave', function () {
        $(this).removeClass('active');
    });
    //页面切换
    $('.tabs-list').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

})
