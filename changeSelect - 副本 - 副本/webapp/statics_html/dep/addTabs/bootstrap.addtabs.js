/**
 * Website: http://git.oschina.net/hbbcs/bootStrap-addTabs
 *
 * Version : 2.0
 *
 * Created by joe on 2016-2-4.Update 2017-08-22
 */

(function ($) {

    var settings = {
        content: '', //直接指定所有页面TABS内容
        close: true, //是否可以关闭
        monitor: 'body', //监视的区域
        iframe: true, //使用iframe还是ajax
        height: '100%', //固定TAB中IFRAME高度,根据需要自己修改
        target: '.nav-tabs',
        loadbar: true,
        contextmenu: true, //是否使用右键菜单
        ajax: {
            'async': false,
            'dataType': '*',
            'type': 'get'
        },
        local: {
            'refreshLabel': '刷新此标签页',
            'closeThisLabel': '关闭此标签页',
            'closeOtherLabel': '关闭其他标签页',
            'closeLeftLabel': '关闭左侧标签页',
            'closeRightLabel': '关闭右侧标签页',
            'closeAllLabel': '关闭全部标签页',
            'loadbar': '正在加载中，请稍候 .....'
        },
        callback: function () { //关闭后回调函数
        }
    };

    var target;

    _click = function (obj) {
        var a_obj, a_target;

        a_obj = (typeof obj.data('addtab') == 'object') ? obj.data('addtab') : obj.data();

        if (!a_obj.id && !a_obj.addtab) {
            a_obj.id = Math.random().toString(36).substring(3, 35);
            obj.data('id', a_obj.id);
        }
        $.addtabs.add({
            'target': a_obj.target ? a_obj.target : target,
            'id': a_obj.id ? a_obj.id : a_obj.addtab,
            'title': a_obj.title ? a_obj.title : obj.html(),
            'content': settings.content ? settings.content : a_obj.content,
            'url': a_obj.url,
            'ajax': a_obj.ajax ? a_obj.ajax : false
        });
    };


    _createMenu = function (right, icon, text) {
        return $('<a>', {
            'href': 'javascript:void(0);',
            'class': "list-group-item",
            'data-right': right
        }).append(
            $('<i>', {
                'class': 'glyphicon ' + icon
            })
        ).append(text);
    }

    _pop = function (id, e, mouse) {
        $('body').find('#popMenu').remove();
        var refresh = e.attr('id') ? _createMenu('refresh', '', settings.local.refreshLabel) : '';
        var remove = e.attr('id') ? _createMenu('remove', '', settings.local.closeThisLabel) : '';
        var closeAll = e.attr('id') ? _createMenu('closeAll', '', settings.local.closeAllLabel) : '';
        var left = e.prev('li').attr('id') ? _createMenu('remove-left', '', settings.local.closeLeftLabel) : '';
        var right = e.next('li').attr('id') ? _createMenu('remove-right', '', settings.local.closeRightLabel) : '';
        var popHtml = '';
        //如果是首页，只显示关闭其他标签
        if(id == 'tab_home'){
            popHtml = $('<ul>', {
                'aria-controls': id,
                'class': 'rightMenu list-group',
                id: 'popMenu',
                'aria-url': e.attr('aria-url'),
                'aria-ajax': e.attr('aria-ajax')
            }).append(refresh)
                .append(_createMenu('remove-circle', '', settings.local.closeOtherLabel));
        }else{
            popHtml = $('<ul>', {
                'aria-controls': id,
                'class': 'rightMenu list-group',
                id: 'popMenu',
                'aria-url': e.attr('aria-url'),
                'aria-ajax': e.attr('aria-ajax')
            }).append(refresh)
                .append(remove)
                .append(_createMenu('remove-circle', '', settings.local.closeOtherLabel))
                .append(left)
                .append(right)
                .append(closeAll);
        }

        popHtml.css({
            'top': mouse.pageY,
            'left': mouse.pageX
        });
        popHtml.appendTo($('body')).fadeIn(100);
        //刷新页面
        $('ul.rightMenu a[data-right=refresh]').on('click', function () {
            var id = $(this).parent('ul').attr("aria-controls").substring(4);
            var url = $(this).parent('ul').attr('aria-url');
            var ajax = $(this).parent('ul').attr('aria-ajax');
            $.addtabs.add({
                'id': id,
                'url': url,
                'refresh': true,
                'ajax': ajax
            });
        });

        //关闭自身
        $('ul.rightMenu a[data-right=remove]').on('click', function () {
            var id = $(this).parent("ul").attr("aria-controls");
            if (id.substring(0, 4) != 'tab_') return;
            $.addtabs.close({
                "id": id
            });
        });

        //关闭其他
        $('ul.rightMenu a[data-right=remove-circle]').on('click', function () {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            target.find('li').each(function () {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $(target).css('margin-left', 0)
        });

        //关闭左侧
        $('ul.rightMenu a[data-right=remove-left]').on('click', function () {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            $('#tab_' + tab_id).prevUntil().each(function () {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $(target).css('margin-left', 0)
        });

        //关闭右侧
        $('ul.rightMenu a[data-right=remove-right]').on('click', function () {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            $('#tab_' + tab_id).nextUntil().each(function () {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $(target).css('margin-left', 0)
        });

        //关闭全部
        $('ul.rightMenu a[data-right=closeAll]').on('click', function () {
            $.addtabs.closeAll(target);
        })

       /* popHtml.mouseleave(function () {
            $(this).fadeOut(100);
        });*/
        $('body').click(function () {
            popHtml.fadeOut(100);
        })
    };

    _listen = function () {
        $(settings.monitor).on('click', '[data-addtab]', function () {
            _click($(this));
            $('#sidebar li').removeClass('active');
            $(this).parent().addClass('active');

            var tabList = $('.tabs-list').width();
            var activeLeft = $('.nav-tabs li.active').get(0).offsetLeft;
            if (tabList - activeLeft > tabList) {
                $('.nav-tabs').css('margin-left', 0)
            }
        });

        $('body').on('click', '.close-tab', function () {
            var id = $(this).parent().attr("aria-controls");
            $.addtabs.close({
                'id': id
            });
            var tabListWidth = $('.tabs-list').width();
            var navTabsWidth = 0;
            $('.nav-tabs li').each(function (index, ele) {
                navTabsWidth += $(ele).width();
            })
            if (navTabsWidth < tabListWidth) {
                $('.nav-tabs').css('margin-left', 0)
            }
        });


        if (settings.contextmenu) {
            //obj上禁用右键菜单
            $('body').on('contextmenu', 'li[role=presentation]', function (e) {
                var id = $(this).children('a').attr('aria-controls');
                if ($('li[role=presentation]').length > 1) {
                    _pop(id, $(this), e);
                }
                return false;
            });
        }

//        var el;
//        $('body').on('dragstart.h5s', '.nav-tabs li', function (e) {
//            el = $(this);
//        }).on('dragover.h5s dragenter.h5s drop.h5s', '.nav-tabs li', function (e) {
//            if (el == $(this)) return;
//            $('.dragBack').removeClass('dragBack');
//            $(this).addClass('dragBack');
//            el.insertAfter($(this))
//        }).on('dragend.h5s', '.nav-tabs li', function () {
//            $('.dragBack').removeClass('dragBack');
//        });

    };

    $.addtabs = function (options) {
        $.addtabs.set(options);
        _listen();
    };

    $.addtabs.set = function () {
        if (arguments[0]) {
            if (typeof arguments[0] == 'object') {
                settings = $.extend(settings, arguments[0] || {});
            } else {
                settings[arguments[0]] = arguments[1];
            }
        }
        if (typeof settings.target == 'object') {
            target = settings.target;
        } else {
            target = $('body').find(settings.target).length > 0 ? $(settings.target).first() : $('body').find('.nav-tabs').first();
        }
    }

    $.addtabs.add = function (opts) {
        var a_target, content, navTabs = 0;
        opts.id = opts.id ? opts.id : Math.random().toString(36).substring(3, 35);
        if (typeof opts.target == 'object') {
            a_target = opts.target;
        } else if (typeof opts.target == 'string') {
            a_target = $('body').find(opts.target);
        } else {
            a_target = target;
        }
        var id = 'tab_' + opts.id;
        var tab_li = a_target;
        var tab_content = tab_li.parents('.page-content').find('#tabsPage');
        tab_li.find('li[role = "presentation"].active').removeClass('active');
        tab_content.find('div[role = "tabpanel"].active').removeClass('active');
        var tabList = a_target.parent().width();

        //如果TAB不存在，创建一个新的TAB
        if (tab_li.find('#tab_' + id).length < 1) {
            var cover = $('<div>', {'id': 'tabCover', 'class': 'tab-cover'});
            //创建新TAB的title
            var title = $('<li>', {
                'role': 'presentation',
                'id': 'tab_' + id,
                'aria-url': opts.url,
                'aria-ajax': opts.ajax ? true : false
            }).append(
                $('<a>', {
                    'href': '#' + id,
                    'aria-controls': id,
                    'role': 'tab',
                    'data-toggle': 'tab'
                }).html(opts.title)
            );
            //是否添加图标
            title.find('a i').remove();
            //是否允许关闭
            if (settings.close) {
                title.find('a').append(
                    $('<i>', {
                        'class': 'close-tab glyphicon glyphicon-remove'
                    })
                );
            }
            //创建新TAB的内容
            var content = $('<div>', {
                'class': 'tab-pane',
                'id': id,
                'role': 'tabpanel'
            });

            //加入TABS
            tab_li.append(title);
            tab_content.append(content.append(cover));
        } else if (!opts.refresh) {
            $('#tab_' + id).addClass('active');
            $('#' + id).addClass('active');
            return;
        } else {
            content = $('#' + id);
            content.html('');
        }
        //加载条
        if (settings.loadbar) {
            $('#' + id).mLoading({
                text: settings.local.loadbar,
                icon: ctx_static + "/common/image/loading5.gif"
            });
        }

        //是否指定TAB内容
        if (opts.content) {
            content.html(opts.content);
        } else if (settings.iframe == true && (opts.ajax == 'false' || !opts.ajax)) { //没有内容，使用IFRAME打开链接
            content.html(
                $('<iframe>', {
                    'class': 'iframeClass',
                    'height': settings.height,
                    'frameborder': "no",
                    'border': "0",
                    'src': opts.url
                })
            );
        } else {
            var ajaxOption = $.extend(settings.ajax, opts.ajax || {});
            ajaxOption.url = opts.url;
            ajaxOption.success = function (result) {
                content.html(result);
            }
            $.ajax(ajaxOption);

        }

        //判断li宽度是否超出tabs-list的宽度
        a_target.find('li').each(function (index, ele) {
            navTabs += $(ele).width();
        })
        if (navTabs > tabList) {
            $('.nav-tabs').css('margin-left', -(navTabs - tabList))
        }

        //左右按钮切换
        a_target.parents('.tabs-container').on('click', '.btn', function () {
            var navTabs = 0;
            a_target.find('li').each(function (index, ele) {
                navTabs += $(ele).width();
            })
            if (navTabs > tabList) {
                if ($(this).is('.left-btn')) {
                    a_target.css('margin-left', 0)
                }
                if ($(this).is('.right-btn')) {
                    a_target.css('margin-left', -(navTabs - tabList))
                }
            }
        })

        //激活TAB
        tab_li.find('#tab_' + id).addClass('active');
        tab_content.find('#' + id).addClass('active');
        tab_content.find('#' + id).find('#tabCover').remove();
    };

    $.addtabs.close = function (opts) {
        //如果关闭的是当前激活的TAB，激活他的前一个TAB
        if ($("#tab_" + opts.id).hasClass('active')) {
            if ($('#tab_' + opts.id).parents('li.tabdrop').length > 0 && !$('#tab_' + opts.id).parents('li.tabdrop').hasClass('hide')) {
                $('#tab_' + opts.id).parents('.nav-tabs').find('li').last().addClass('active');
            } else {
                $("#tab_" + opts.id).prev('li').addClass('active');
            }
            $("#" + opts.id).prev().addClass('active');
        }
        //关闭TAB
        $("#tab_" + opts.id).remove();
        $("#" + opts.id).remove();
        settings.callback();
    };

    //关闭全部
    $.addtabs.closeAll = function (target) {
        if (typeof target == 'string') {
            target = $('body').find(target);
        }
        $.each(target.find('li[id]'), function () {
            var id = $(this).children('a').attr('aria-controls');
            $("#tab_" + id).remove();
            $("#" + id).remove();
            $(target).css('margin-left', 0)
        });
        target.find('li[role = "presentation"]').first().addClass('active');
        var firstID = target.find('li[role = "presentation"]').first().children('a').attr('aria-controls');
        $('#' + firstID).addClass('active');
    };

})(jQuery);

$(function () {
    $.addtabs.set('cookie','true')
    $.addtabs();
})
