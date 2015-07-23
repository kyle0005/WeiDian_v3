/**
 * Created by YK on 2014/12/3 0003.
 */
$.fn.toCenter = function (inner) {
    return this.each(function (i) {
            var parent = inner ? $(this).parent() : $(window),
                pos = {
                    top: (parent.height()-$(this).height()) /2 + parent.scrollTop() + 'px',
                    left:(parent.width() -$(this).width()) /2 + parent.scrollLeft() + 'px'
                };
            if (!$(this).css('position')) {
                pos.position = 'absolute'
            }
            ;
            $(this).css(pos)
        }
    )
}
;
function setOverlay() {
    var overlay = jQuery('<div style="position:absolute;left:0;top:0;width:100%;height:100%;opacity:0.01;background:#fff;z-index:111110"></div>');
    return overlay.appendTo('body')
};

function Alert(msg, onConfirm, opts) {
    if (!msg || $('div[role="Alert"]').length) return;
    var options = $.extend(true, {
            confirmText: '确认',
            width: 500
        }, opts),
        overlay = setOverlay(),
        width = $(window).width() > options.width ? options.width : $(window).width() - 120,
        dialog = $('<div class="tipsAlert" role="Alert" style="width:' + width + 'px;z-index:111111">'
                + '<div class="tipsAlertText">' + '<p class="ct_3">' + msg + '</p>' + '</div>'
                + '</div>');
    dialog.appendTo('body').toCenter().hide().fadeIn('fast').delegate('.popCode', 'click', function (e) {
        switch ($(this).attr('role')) {
            case 'confirm':
                dialog.hideRemove({
                    height: dialog.height(),
                    onRemove: function () {
                        overlay.remove();
                        if ($.isFunction(onConfirm)) {
                            onConfirm()
                        }
                    }
                });
                break
        }
        ;
        e.preventDefault()
    });
    return dialog
};
var storage = {
    set: function (key, value) {
        if (!(key && value && localStorage && localStorage.setItem)) return;
        if (typeof value == 'object') {
            value = 'json_' + $.toJSON(value)
        }
        ;
        localStorage.setItem(key, value)
    },
    get: function (key) {
        if (!(key && localStorage && localStorage.setItem)) return null;
        var value = localStorage.getItem(key);
        if (value && value.indexOf('json_') == 0) {
            value = $.parseJSON(value.substr(5))
        }
        ;
        return value
    },
    clear: function () {
        if (!(localStorage && localStorage.setItem)) return;
        localStorage.clear()
    },
    remove: function (key) {
        if (!(key && localStorage && localStorage.setItem)) return;
        localStorage.removeItem(key)
    }
};
$.fn.hideRemove = function (opts) {
    if ($.isFunction(opts)) {
        opts = {
            onRemove: opts
        }
    }
    ;
    var options = $.extend({}, {
            easing: 'linear',
            speed: 'fast',
            height: 0,
            onRemove: $.noop
        }, opts),
        height = opts == 1 ? true : false;
    return this.each(function (i) {
        $(this).animate({
            opacity: 0,
            height: height ? $(this).height : options.height
        }, options.speed, options.easing, function () {
            $(this).remove();
            options.onRemove()
        })
    })
};