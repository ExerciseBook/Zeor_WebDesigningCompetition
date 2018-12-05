function LoadScroll() {
    var config = {
        'backgroundColor': '#000',
        'opacity': 0.5,
        'opacity_active': 0.8,
        'bar_width': 6,
        'bar_width_active': 10,
        'top': '20px'
    };

    $('<div class="vert_fade"></div><div class="vert_scroll"><div class="vert_scroll_bar"></div></div>').appendTo('body');
    $('.vert_scroll_bar').css({
        'background-color': config.backgroundColor,
        'opacity': config.opacity,
        '-webkit-border-radius': 0,
        'width': config.bar_width,
        'left': 30 - config.bar_width,
        'transition': 'all .1s linear',
    });

    $('<div class="hori_fade"></div><div class="hori_scroll"><div class="hori_scroll_bar"></div></div>').appendTo('body');
    $('.hori_scroll_bar').css({
        'background-color': config.backgroundColor,
        'opacity': config.opacity,
        '-webkit-border-radius': 0,
        'height': config.bar_width,
        'top': config.top,
        'transition': 'all .1s linear',
    });

    var content = document.documentElement ? document.documentElement : document.body;
    var change_y = $(window).height();
    var scrollShow_y = false;
    var vert_timeout;
    var change_x = $(window).width();
    var scrollShow_x = false;
    var hori_timeout;

    function upScrollHeight() {
        var full_win = false;
        $("*").each(function() {
            if (($(this).css("position") == "fixed" || $(this).css("position") == "static") && $(this).attr("type") == "application/x-shockwave-flash" && $(this).css("height") == $(window).height() + "px" && $(this).css("width") >= $(window).width() + "px") {
                full_win = true;
            }
        });

        clearTimeout(vert_timeout);
        clearTimeout(hori_timeout);
        var wHeight = document.documentElement.clientHeight;
        var wWidth = document.documentElement.clientWidth;
        var dHeight = document.documentElement.scrollHeight;
        var dWidth = document.documentElement.scrollWidth;
        var tmpScroll_y = $('.vert_scroll');
        var tmpScroll_x = $('.hori_scroll');

        if (dHeight <= wHeight || full_win) {
            if (scrollShow_y == true) {
                tmpScroll_y.hide();
            }
            scrollShow_y = false;
        } else {
            tmpScroll_y.css({
                'display': 'block',
                'opacity': 1,
                'pointer-events': 'none'
            });
            scrollShow_y = true;
        }
        if (dWidth <= wWidth || full_win) {
            if (scrollShow_x == true) {
                tmpScroll_x.hide();
            }
            scrollShow_x = false;
        } else {
            tmpScroll_x.css({
                'display': 'block',
                'opacity': 1,
                'pointer-events': 'none'
            });
            scrollShow_x = true;
        }
        var scrollHeight = wHeight / dHeight * wHeight > 30 ? wHeight / dHeight * wHeight : 30;
        var scrollWidth = wWidth / dWidth * wWidth > 30 ? wWidth / dWidth * wWidth : 30;
        var top = $(document).scrollTop() / (dHeight - wHeight) * (wHeight - scrollHeight);
        tmpScroll_y.css({
            'top': top
        });
        tmpScroll_y.height(scrollHeight);
        var left = $(document).scrollLeft() / (dWidth - wWidth) * (wWidth - scrollWidth);
        tmpScroll_x.css({
            'left': left
        });
        tmpScroll_x.width(scrollWidth);

        vert_timeout = setTimeout(function() {
            tmpScroll_y.css({
                'opacity': 0,
                'pointer-events': 'none'
            });
            scrollShow_y = false;
        }, 500);
        hori_timeout = setTimeout(function() {
            tmpScroll_x.css({
                'opacity': 0,
                'pointer-events': 'none'
            });
            scrollShow_x = false;
        }, 500);
    }
    var init = window.setInterval(function() {
        if ((change_y != content.scrollHeight) || (change_x != content.scrollWidth)) {
            change_y = content.scrollHeight;
            change_x = content.scrollWidth;
            upScrollHeight();
        }
    }, 100);

    $(window).bind('scroll', function() {
        if (document.documentElement.clientHeight != document.documentElement.scrollHeight) {
            upScrollHeight();
        }
    });

    $(window).bind('resize', function() {
        upScrollHeight();
    });

    var always_y;
    var always_x;
    var mousedown_y = false;
    var mousedown_x = false;
    var startY;
    var Y;
    var startX;
    var X;

    $(window).bind('mousemove', function(event) {
        if ((content.clientWidth - event.clientX) < 40) {
            if (scrollShow_y == false) {
                upScrollHeight();
            }
            $('.vert_scroll_bar').css({
                'width': config.bar_width_active,
                'left': 30 - config.bar_width_active,
            });
            clearTimeout(vert_timeout);
            always_y = true;

        } else {
            if (always_y == true) {
                always_y = false;
                vert_timeout = setTimeout(function() {
                    $('.vert_scroll').css({
                        'opacity': 0,
                        'pointer-events': 'none'
                    });
                    scrollShow_y = false;
                }, 500);
            }
            $('.vert_scroll_bar').css({
                'width': config.bar_width,
                'left': 30 - config.bar_width,
            });
        }
        if ((content.clientHeight - event.clientY) < 40) {
            if (scrollShow_x == false) {
                upScrollHeight();
            }
            $('.hori_scroll_bar').css({
                'width': config.bar_width_active,
            });
            clearTimeout(hori_timeout);
            always_x = true;

        } else {
            if (always_x == true) {
                always_x = false;
                hori_timeout = setTimeout(function() {
                    $('.hori_scroll').css({
                        'opacity': 0,
                        'pointer-events': 'none'
                    });
                    scrollShow_x = false;
                }, 500);
            }
            $('.hori_scroll_bar').css({
                'width': config.bar_width,
            });
        }
        if (mousedown_y == true) {
            $('.vert_fade').css({
                'pointer-events': 'auto'
            });
            var endY = event.clientY;
            var top = endY - startY + Y;
            if (top < 0) {
                top = 0;
            }
            var max_height = $(window).height() - $('.vert_scroll').height();
            if (top > max_height) {
                top = max_height;
            }
            var scroll_top = top / ($(window).height() - $('.vert_scroll').height()) * ($(document).height() - $(window).height());
            $(document).scrollTop(scroll_top);
        }
        if (mousedown_x == true) {
            $('.hori_fade').css({
                'pointer-events': 'auto'
            });
            var endX = event.clientX;
            var left = endX - startX + X;
            if (left < 0) {
                left = 0;
            }
            var max_width = $(window).width() - $('.hori_scroll').width();
            if (left > max_width) {
                left = max_width;
            }
            var scroll_left = left / ($(window).width() - $('.hori_scroll').width()) * ($(document).width() - $(window).width());
            $(document).scrollLeft(scroll_left);
        }
    });

    $(window).bind('mousedown', function(event) {
        startY = event.clientY;
        startX = event.clientX;
        Y = $(document).scrollTop() / ($(document).height() - $(window).height()) * ($(window).height() - $('.vert_scroll').height());
        X = $(document).scrollLeft() / ($(document).width() - $(window).width()) * ($(window).width() - $('.hori_scroll').width());

        if ((content.clientWidth - event.clientX) < 40 && (content.clientWidth - event.clientX) >= 0) {
            mousedown_y = true;
            window.document.onselectstart = function() {
                return false;
            };
            $('.vert_scroll_bar').css({
                'opacity': config.opacity_active,
            });
        }
        if ((content.clientHeight - event.clientY) < 40 && (content.clientHeight - event.clientY) >= 0) {
            mousedown_x = true;
            window.document.onselectstart = function() {
                return false;
            };
            $('.hori_scroll_bar').css({
                'opacity': config.opacity_active,
            });

        }
    });
    $(window).bind('mouseup', function(event) {
        document.onselectstart = null;
        mousedown_y = false;
        mousedown_x = false;
        $('.vert_scroll_bar').css({
            'opacity': config.opacity,
        });
        $('.hori_scroll_bar').css({
            'opacity': config.opacity,
        });
        $('.vert_fade').css({
            'pointer-events': 'none'
        });
        $('.hori_fade').css({
            'pointer-events': 'none'
        });
    });
};
