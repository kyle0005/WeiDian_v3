var click = 'click',
    process = false,
    $preventEvent = false;
var lowBrowserHtml = '有部分功能您的浏览器不支持，请更换高级浏览器，建议使用<a href="http://www.firefox.com" target="_blank" title="下载firefox浏览器">firefox</a>,<a href="https://www.google.com/intl/en/chrome/browser/" target="_blank" title="下载chrome浏览器">chrome</a>或<a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank" title="下载IE10浏览器">IE10及以上</a>';

function lowBrowser(callBack) {
    Alert(lowBrowserHtml, callBack)
};

function test(smg, plus) {
    var testContainer = $('#testContainer');
    if (!testContainer.length) {
        testContainer = $('<div id="testContainer" style="position:fixed; z-index:99999; top:30px; left:0;padding:20px;background:rgba(0,0,0,.5);color:#fff; max-height:100%;overflow:auto;"></div>').appendTo('body')
    }
    ;
    if (!(typeof smg == 'array')) {
        smg = [smg]
    }
    ;
    var html = plus && testContainer.html() ? testContainer.html() + '<br>' : '';
    $.each(smg, function (i, item) {
        if (i > 0) {
            html += '/'
        }
        ;
        html += item
    });
    testContainer.html(html)
};

function tests(smg) {
    test(smg, 1)
};

function fireHandler(fn) {
    if ($.isFunction(fn)) {
        fn()
    }
};
$.fn.placeholder = function () {
    if ($.browser.msie && $.browser.version < 10) {
        return this.each(function () {
            var value = this.value;
            var placeholder = $(this).attr('placeholder');
            var input = this;
            if (value == '' && placeholder) {
                this.value = placeholder;
                if ($(this).attr('type') == 'password') {
                    $(this).hide();
                    var el = $('<input />');
                    $(el).attr({
                        'type': 'text',
                        'value': placeholder,
                        'class': this.className
                    }).insertAfter($(this));
                    $(el).focus(function () {
                        $(this).hide();
                        if (this.value == placeholder) {
                            input.value = ''
                        }
                        ;
                        $(input).show().focus()
                    });
                    $(this).blur(function () {
                        if (this.value == '') {
                            $(this).hide();
                            el.value = placeholder;
                            $(el).show()
                        }
                    })
                } else {
                    $(this).focus(function () {
                        if (this.value == placeholder) {
                            this.value = ''
                        }
                    });
                    $(this).blur(function () {
                        if (this.value == '') {
                            this.value = placeholder
                        }
                    })
                }
            }
        })
    }
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

function RGBToHex(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp);
    var hexColor = "#";
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c;
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r])
        }
        hexAr.push(hex[c]);
        if (l < 16 && l != "") {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('')
    }
    return hexColor
};

function getLength(s) {
    var l = 0;
    var a = s.split("");
    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++
        } else {
            l += 2
        }
    }
    return l
};

function checkPrice(el) {
    var value = el.val(),
        newValue = '';
    for (i = 0; i < value.length; i++) {
        if ((value.charAt(i) == '.' && i > 0) || !isNaN(value.charAt(i))) {
            newValue += value.charAt(i)
        }
    }
    ;
    el.val(newValue)
};

function isURL(value) {
    var strRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    var re = new RegExp(strRegex);
    return re.test(value)
};

function isEmail(value) {
    var strRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    var re = new RegExp(strRegex);
    return re.test(value)
};

function isPhone(value) {
    var strRegex = /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/;
    var re = new RegExp(strRegex);
    return re.test(value)
};

function isLetterNumber(str) {
    var strRegex = /^[0-9a-zA-Z]+$/;
    var re = new RegExp(strRegex);
    return re.test(str)
};

function getRandom(length) {
    var charactors = "ab1cd2ef3gh4ij5kl6mn7opq8rst9uvw0xyz",
        value = '',
        i;
    length = length || 4;
    for (j = 1; j <= length; j++) {
        i = parseInt(35 * Math.random());
        value += charactors.charAt(i)
    }
    ;
    return value
};
var getNewTempId = 0;

function getNewId() {
    getNewTempId++;
    return $.now() + getRandom() + getNewTempId
};

function urlToJson(str) {
    var data = {}, name = null,
        value = null,
        num = str.indexOf("?");
    if (num == '-1') {
        str = str.replace('http:/', '');
        str = str.substr(num + 1);
        var arr = str.split("/");
        for (var i = 0; i < arr.length; i++) {
            name = arr[i];
            value = arr[i + 1];
            data[name] = value;
            i++
        }
    } else {
        str = str.substr(num + 1);
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                data[name] = value
            }
        }
    }
    ;
    return data
};

function setMask(flag) {
    if (flag == 0) {
        $('#bodyMask').remove()
    } else if (!$('#bodyMask').length) {
        $('<div id="bodyMask" style="position:absolute;left:0;top:0;width:100%;height:100%;background:#fff;opacity:0.01;z-index:99999"></div>').appendTo('body')
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

function Tips(type, msg, timer, callback) {
    var html, message, type = type || 'default',
        timer = timer || 1000;
    switch (type) {
        case 'loading':
            message = msg || '加载中，请稍后...';
            html = '<div class="tipsLoading"><div class="tipsPad tc"><i class="loadingIco"></i>' + message + '</div></div>';
            break;
        case 'success':
            message = msg || '操作成功';
            html = '<div class="tipsSuccess"><div class="tipsPad tc ct_f"><i class="whiteCorrectIco"></i>' + message + '</div></div>';
            break;
        case 'error':
            message = msg || '操作失败';
            html = '<div class="tipsError"><div class="tipsPad tc ct_f"><i class="whiteForkIco"></i>' + message + '</div></div>';
            break;
        case 'default':
            message = msg || '请注意';
            html = '<div class="tipsBox"><div class="tipsPad tc">' + message + '</div></div>';
            break
    }
    ;
    process = true;
    setMask();
    var msgEl = $(html).appendTo('body');
    msgEl.css({
        zIndex: 1111111,
        left: ($('body').width() - msgEl.outerWidth()) / 2
    }).hide().fadeIn();
    msgEl.close = function () {
        if (!msgEl.length) return;
        msgEl.fadeOut(function () {
            msgEl.remove();
            process = false;
            setMask(0);
            fireHandler(callback)
        })
    };
    if (timer > -1) {
        setTimeout(msgEl.close, timer)
    }
    ;
    return msgEl
};

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
        width = $(window).width() > options.width ? options.width : $(window).width() - 20,
        dialog = $('<div class="tipsAlert" role="Alert" style="width:' + width + 'px;z-index:111111">' + '<div class="tipsAlertText">' + '<p class="ct_3">' + msg + '</p>' + '</div>' + ' <div class="tipsAlertFoot">' + '<a href="javascript:;" class="b_2 btn important" role="confirm">' + options.confirmText + '</a>' + '</div>' + '</div>');
    dialog.appendTo('body').toCenter().hide().fadeIn('fast').delegate('a[role]', 'click', function (e) {
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

function Confirm(msg, onConfirm, onCancel, opts) {
    if (!msg || $('div[role="Confirm"]').length) return;
    var options = $.extend(true, {
            confirmText: '确认',
            cancelText: '取消',
            width: 500
        }, opts),
        overlay = setOverlay(),
        width = $(window).width() > options.width ? options.width : $(window).width() - 20,
        dialog = $('<div class="tipsAlert" role="Confirm" style="width:' + width + 'px;z-index:111111">' + '<div class="tipsAlertText">' + '<p class="ct_3">' + msg + '</p>' + '</div>' + ' <div class="tipsAlertFoot">' + '<a href="javascript:;" class="b_2 btn important" role="confirm">' + options.confirmText + '</a>&nbsp;' + '<a href="javascript:;" class="b_1 btn lesser" role="cancel">' + options.cancelText + '</a>' + '</div>' + '</div>');
    dialog.appendTo('body').toCenter().hide().fadeIn('fast').delegate('a[role]', 'click', function (e) {
        switch (jQuery(this).attr('role')) {
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
                break;
            case 'cancel':
                dialog.hideRemove({
                    height: dialog.height(),
                    onRemove: function () {
                        overlay.remove();
                        if ($.isFunction(onCancel)) {
                            onCancel()
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

function ConfirmDialog(title, html, opts) {
    if (!title || !html) return;
    var dialog = $('<div><div class="boxscroll" style="height:100%"><div class="dialog_content_main"></div></div></div>'),
        flag = false,
        options = $.extend(true, {
            resizable: false,
            modal: true,
            title: title,
            zIndex: 11111,
            draggable: false,
            width: 850,
            height: 600,
            scroll: true,
            onConfirm: $.noop,
            onCancel: $.noop,
            beforeClose: function () {
                return dialog.canClose
            },
            onBeforeClose: '',
            close: function () {
                if (flag) {
                    fireHandler(options.onConfirm)
                } else {
                    fireHandler(options.onCancel)
                }
                ;
                dialog.find('div.boxscroll').getNiceScroll().remove();
                dialog.remove();
                fireHandler(options.onClose)
            },
            buttons: {
                "submit": {
                    text: "确定",
                    "class": "submitBtn",
                    click: function () {
                        var fn = function () {
                            flag = true;
                            dialog.dialog("close")
                        };
                        if ($.isFunction(options.onBeforeClose)) {
                            options.onBeforeClose(fn, 'confirm')
                        } else {
                            fn()
                        }
                    }
                },
                "cancel": {
                    text: "取消",
                    click: function () {
                        var fn = function () {
                            dialog.dialog("close")
                        };
                        if ($.isFunction(options.onBeforeClose)) {
                            options.onBeforeClose(fn, 'cancel')
                        } else {
                            fn()
                        }
                    }
                }
            }
        }, opts);
    if (options.height > $(window).height()) {
        options.height = $(window).height() - 20
    }
    ;
    if (options.width > $(window).width()) {
        options.width = $(window).width() - 20
    }
    ;
    dialog.dialog(options);
    dialog.find('div.dialog_content_main:first').append(html);
    if (options.scroll) {
        dialog.find('div.boxscroll:first').niceScroll({
            zindex: 1111112,
            railpadding: {
                top: 0,
                right: 5,
                left: 5,
                bottom: 0
            }
        });
        dialog.resizeScroll = function () {
            dialog.find('div.boxscroll:first').getNiceScroll().resize()
        }
    } else {
        dialog.resizeScroll = $.noop;
        dialog.find('div.dialog_content_main:first').css({
            'padding': 0,
            'height': '100%',
            'overflow': 'hidden'
        });
        dialog.find('div.boxscroll:first').removeClass('boxscroll')
    }
    ;
    dialog.canClose = true;
    return dialog
};

function resizeScroll(el) {
    el = el || $('div.boxscroll,body.boxscroll');
    el.each(function () {
        if ($(this).getNiceScroll()) {
            $(this).getNiceScroll().resize()
        }
    })
};

function removeScroll(el) {
    el = el || $('div.boxscroll,body.boxscroll');
    el.each(function () {
        if ($(this).getNiceScroll()) {
            $(this).getNiceScroll().remove()
        }
    })
};

function stringToNumber(str) {
    if (str && !isNaN(str)) {
        str = parseInt(str)
    }
    ;
    return str
};

function getFormValue(form, flag) {
    var data = {}, vals = $(form).serializeArray();
    $.each(vals, function (i, item) {
        var name = item['name'],
            value = enToString(item['value']);
        if (item['value'] == $('input[name="' + item.name + '"]:first', form).attr('placeholder')) {
            value = ''
        }
        ;
        if (!flag || (flag && value != '')) {
            if (!data[name]) {
                data[name] = value
            } else if (typeof data[name] == 'string') {
                data[name] = [data[name]];
                data[name].push(value)
            } else {
                data[name].push(value)
            }
        }
    });
    return data
};

function setInputValue(name, value, container) {
    container = container || $('body');
    if (!$(':input[name="' + name + '"]', container).length) return;
    var label = $(':input[name="' + name + '"]', container)[0].tagName.toLowerCase(),
        type = label == 'input' ? $('input[name="' + name + '"]:first', container).attr('type') : label;
    switch (type) {
        case 'text':
            $('input[name="' + name + '"]', container).val(value);
            break;
        case 'textarea':
            $('textarea[name="' + name + '"]', container).val(value);
            break;
        case 'radio':
            $('input[name="' + name + '"][value="' + value + '"]', container).attr('checked', true);
            break;
        case 'checkbox':
            if (value.split(',').length) {
                $.each(value.split(','), function (i, item) {
                    $('input[name="' + name + '"][value="' + item + '"]', container).attr('checked', true)
                })
            } else {
                $('input[name="' + name + '"][value="' + value + '"]', container).attr('checked', true)
            }
            break;
        case 'select':
            $('select[name="' + name + '"] option[value="' + value + '"]', container).attr('selected', true);
            break
    }
};

function enToString(value) {
    if (typeof value == 'string') {
        return value.replace(/\'/g, "&#8217;")
    } else {
        return value
    }
};

function checkAll(el) {
    var el = $(el);
    el.delegate(':checkbox', 'change', function (e) {
        var name = $(this).attr('name'),
            btn = el.find(':checkbox[name="checkAll"]'),
            checkbox = el.find(':checkbox:not([name="checkAll"],[disabled="disabled"])');
        if (name == 'checkAll') {
            if ($(this).attr('checked')) {
                checkbox.attr('checked', 'checked');
                el.find('[role="item"]').addClass('checked')
            } else {
                checkbox.attr('checked', false);
                el.find('[role="item"]').removeClass('checked')
            }
        } else {
            var check = true;
            checkbox.each(function () {
                if (!$(this).attr('checked')) {
                    check = false;
                    return
                }
            });
            if (check) {
                btn.attr('checked', 'checked')
            } else {
                btn.attr('checked', false)
            }
            ;
            if ($(this).attr('checked')) {
                if ($(this).parents('[role="item"]').length) {
                    $(this).parents('[role="item"]').addClass('checked')
                }
            } else {
                if ($(this).parents('[role="item"]').length) {
                    $(this).parents('[role="item"]').removeClass('checked')
                }
            }
        }
        ;
        e.stopPropagation()
    })
};

function getAllCheck(el) {
    var items = $(el).find('input:checked[value]'),
        value = [];
    items.each(function () {
        value.push($(this).attr('value'))
    });
    return {
        items: items,
        value: value
    }
};

function setDelAll(listEl, action, url) {
    if (!(listEl.length && action)) return;
    checkAll(listEl);
    var del = function (checks) {
        Confirm('确定要删除选中的数据吗?', function () {
            rpcJSON(action, {
                ids: checks.value
            }, function (backData) {
                Tips('success', '删除成功');
                checks.items.parents('[role="item"]').hideRemove()
            }, '', url)
        })
    };
    var delAll = function () {
        var checks = getAllCheck(listEl);
        if (!checks.value.length) {
            Alert('还没有选择数据！')
        } else {
            del(checks)
        }
    };
    listEl.delegate('a[role]', click, function (e) {
        e.preventDefault();
        switch ($(this).attr('role')) {
            case 'delAllBtn':
                delAll();
                break;
            case 'deleteBtn':
                var checks = $(this).parents('[role="item"]:first').find('input[type="checkbox"]');
                del({
                    items: checks,
                    value: [checks.val()]
                });
                break
        }
    })
};
$.fn.setSelect = function (data, selected) {
    if (!data) return;
    return this.each(function (i) {
        var selectValue = selected ? selected : $(this).val() ? $(this).val() : 0,
            selectHtml = '';
        $.each(data, function (i, item) {
            selectHtml += '<option value="' + item.id + '" ';
            if (item.id == selectValue) {
                selectHtml += ' selected'
            }
            ;
            selectHtml += '>' + item.name + '</option>'
        });
        $(this).html(selectHtml);
        if ($(this).width() < 50) {
            $(this).css('width', 'auto')
        }
    })
};

function rpc(action, data, callBack, errorBack, dataType, url) {
    var url = url || (typeof phprpcURL == 'string' ? phprpcURL : '');
    if (!(action && url)) return;
    process = true;
    setMask();
    var loading = null,
        loadingEl = null,
        delayLoading = setTimeout(function () {
            loading = true;
            loadingEl = Tips('loading', '', -1)
        }, 500),
        hideLoading = function () {
            if (loading) {
                loadingEl.close()
            } else {
                clearTimeout(delayLoading)
            }
        };
    data = data || {};
    var fn = function () {
        var client = new PHPRPC_Client(url, [action]);
        client[action]($.toJSON(data), function (result, args, output, warning) {
            process = false;
            setMask(0);
            hideLoading();
            var outData = output,
                success = function () {
                    if ($.isFunction(callBack)) {
                        callBack(outData)
                    }
                }, error = function (msg) {
                    if ($.isFunction(errorBack)) {
                        errorBack(msg, result, args, output, warning)
                    } else {
                        var message = msg || '操作失败！';
                        Tips('error', message, 2000)
                    }
                };
            if (output != undefined) {
                if (dataType == 'json') {
                    try {
                        outData = $.parseJSON(output);
                        if (outData.code == '0') {
                            outData = outData.data;
                            success()
                        } else {
                            error(outData.errorMessage)
                        }
                    } catch (e) {
                        error()
                    }
                } else {
                    success()
                }
            } else {
                error()
            }
        }, true)
    };
    if (typeof PHPRPC_Client == 'undefined') {
        $.getScript(rpcJS, fn)
    } else {
        fn()
    }
};

function rpcJSON(action, data, callBack, errorBack, url) {
    rpc(action, data, callBack, errorBack, 'json', url)
};
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
$.fn.toActive = function (callBack) {
    return this.each(function (i) {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
            if ($.isFunction(callBack)) {
                callBack($(this))
            }
        }
    })
};

function removeArray(arr, val) {
    if (!(arr && val)) return;
    var narr = [];
    if (typeof val == 'object') {
        val = $.toJSON(val)
    }
    ;
    $.each(arr, function (i, item) {
        var nval = typeof item == 'object' ? $.toJSON(item) : item;
        if (nval != val) {
            narr.push(item)
        }
    });
    return narr
};

function getPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY
    } else {
        if (document.body.scrollHeight > document.body.offsetHeight) {
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight
        } else {
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight
        }
    }
    ;
    var windowWidth, windowHeight;
    if (self.innerHeight) {
        if (document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth
        } else {
            windowWidth = self.innerWidth
        }
        ;
        windowHeight = self.innerHeight
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight
        } else {
            if (document.body) {
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight
            }
        }
    }
    ;
    if (yScroll < windowHeight) {
        pageHeight = windowHeight
    } else {
        pageHeight = yScroll
    }
    ;
    if (xScroll < windowWidth) {
        pageWidth = xScroll
    } else {
        pageWidth = windowWidth
    }
    ;
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
    return ({
        pageWidth: pageWidth,
        pageHeight: pageHeight,
        windowWidth: windowWidth,
        windowHeight: windowHeight
    })
};
highlight = function (el) {
    $(el).delegate('tbody tr', {
        mouseenter: function () {
            $(this).addClass('over')
        },
        mouseleave: function () {
            $(this).removeClass('over')
        }
    })
};
$.fn.litabs = function (opts) {
    if ($.isFunction(opts)) {
        opts = {
            callBack: opts
        }
    }
    ;
    var options = $.extend({}, {
        event: click,
        index: 0,
        ajax: false,
        callBack: false
    }, opts);
    return this.each(function (i) {
        $(this).data('i', i).on(options['event'], function (e) {
            $(this).addClass('active').siblings().removeClass('active');
            if (options.callBack) {
                options.callBack($(this))
            } else {
                if (options.ajax) {
                    var data = $.extend({}, options.ajax['data'], $(this).data('data'));
                    $(options.ajax['target']).load(options.ajax['url'], data)
                } else {
                    var target = $(this).data('target');
                    $(target).addClass('active').siblings().removeClass('active')
                }
            }
        });
        if (i == options.index) {
            $(this).trigger(options['event'])
        }
    })
};
$.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        if (typeof options == 'number') {
            options = {
                expires: options
            }
        }
        ;
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1
        }
        ;
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
            } else {
                date = options.expires
            }
            ;
            expires = '; expires=' + date.toUTCString()
        }
        ;
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        ;
        return cookieValue
    }
};

function getContentLoading(align, msg) {
    var message = msg || '',
        text_align = align || 'center';
    return '<div style="text-align:' + text_align + '; padding:10px 0;" class="loading"><span class="contentLoading">' + message + '</span></div>'
};

function getEmptyContent() {
    return '<div class="empty">暂无数据</div>'
};

function scrollLoad(opts) {
    var options = $.extend(true, {
            loadUrl: '',
            data: {},
            contentContainer: '',
            contentLoading: '',
            heightOffset: 20,
            target: window,
            count: 15,
            onLoad: $.noop
        }, opts),
        loadUrl = options.loadUrl,
        data = options.data,
        target = options.target,
        contentContainer = options.contentContainer,
        contentLoading = options.contentLoading,
        heightOffset = options.heightOffset,
        count = options.count,
        onLoad = options.onLoad,
        container = target == window ? 'body' : $(target).children(':first'),
        lastId = 0,
        loading = false,
        loadContent = function () {
            loading = true;
            if (contentLoading.length) {
                contentLoading.fadeIn()
            }
            ;
            data['lastId'] = lastId;
            data['count'] = count;
            $.post(loadUrl, data, function (backData) {
                loading = false;
                if (contentLoading.length) {
                    contentLoading.fadeOut()
                }
                ;
                onLoad(backData)
            })
        };
    if (!contentContainer) return;
    if (contentLoading.length) {
        contentLoading.hide();
        if (!contentLoading.html().length) {
            contentLoading.html(getContentLoading())
        }
    }
    ;
    $(target).scroll(function () {
        var containerHeight = container == 'body' ? getPageSize()[1] : $(container).height(),
            mayLoadContent = $(target).scrollTop() + heightOffset >= containerHeight - $(target).height(),
            lastContent = contentContainer.children().last(),
            lastone = lastContent.data('lastone');
        if (mayLoadContent && !loading && !lastone) {
            lastId = lastContent.data('id');
            if (lastId) {
                loadContent()
            }
        }
    })
};

function setArea(target, url, province, city, county) {
    if (!(target && url)) return;
    var get = function (data, callback) {
        $.getJSON(url, data, function (backData) {
            if (backData.code != '1') {
                callback(backData.data)
            } else {
                Alert(backData.errorMessage)
            }
        })
    }, set = function (area, data, selected) {
        var html = '<option value="">请选择</option>';
        $.each(data, function (i, item) {
            html += '<option value="' + item.code + '" ';
            if (item.code == selected) {
                html += 'selected '
            }
            ;
            html += '>' + item.name + '</option>'
        });
        $('select[name="' + area + '"]', target).html(html)
    }, html = '<select name="province">' + '<option value="">请选择</option>' + '</select>&nbsp;' + '<select name="city">' + '<option value="">请选择</option>' + '</select>&nbsp;' + '<select name="county">' + '<option value="">请选择</option>' + '</select>';
    target.html(html);
    var E0 = $('select[name="province"]', target),
        E1 = $('select[name="city"]', target),
        E2 = $('select[name="county"]', target);
    get('', function (data) {
        set('province', data, province);
        if (province) {
            get({
                code: province
            }, function (data) {
                set('city', data, city);
                if (city) {
                    get({
                        code: city
                    }, function (data) {
                        set('county', data, county)
                    })
                }
            })
        }
    });
    E0.change(function () {
        province = $(this).val();
        city = '';
        county = '';
        get({
            code: province
        }, function (data) {
            set('city', data)
        });
        E2.html('<option>请选择</option>')
    });
    E1.change(function () {
        city = $(this).val();
        county = '';
        get({
            code: city
        }, function (data) {
            set('county', data)
        });
        E2.html('<option>请选择</option>')
    });
    E2.change(function () {
        county = $(this).val()
    })
};

function clearTips(el) {
    $('*[showTipsEl]', el).hideTips()
};
(function ($) {
    $.fn.extend({
        showTips: function (flag) {
            var offset = 10,
                $this = $(this),
                title = $this.attr('title') || $this.data('tipsTitle'),
                opt = $this.data('tips') || '1_b',
                tips = opt.split('_'),
                widthHtml = tips[2] ? 'width:' + tips[2] + 'px;' : '',
                tipsEl;
            if (!title) return;
            if (!$this.data('tipsTitle')) {
                $this.data('tipsTitle', title);
                $this.removeAttr('title')
            }
            ;
            if ($(this).data('tipsEl')) {
                tipsEl = $(this).data('tipsEl')
            } else {
                var tipsHtml = '<div class="tips_' + tips[0] + '" style="top:-10000px;z-index:11111113; left:50px;' + widthHtml + '">' + '<span class="arrow_' + tips[0] + '_' + tips[1] + ' tipsArrow"><i></i></span>' + '<div class="tipsPad">' + title + '</div>' + '</div>';
                tipsEl = $(tipsHtml).appendTo('body');
                $(this).data('tipsEl', tipsEl).attr('showTipsEl', 1)
            }
            ;
            var $width = $this.outerWidth(),
                $height = $this.outerHeight(),
                $left = $this.offset().left,
                $top = $this.offset().top,
                width = tipsEl.outerWidth(),
                height = tipsEl.outerHeight(),
                left, top;
            switch (tips[1]) {
                case 'b':
                    left = $left + ($width - width) / 2;
                    top = $top - offset - height;
                    break;
                case 't':
                    left = $left + ($width - width) / 2;
                    top = $top + $height + offset;
                    break;
                case 'l':
                    left = $left + $width + offset;
                    top = $top + ($height - height) / 2;
                    break;
                case 'r':
                    left = $left - offset - width;
                    top = $top + ($height - height) / 2;
                    break
            }
            ;
            tipsEl.show().css({
                left: left,
                top: top
            })
        },
        hideTips: function (num) {
            return (this.each(function () {
                if ($(this).data('tipsEl')) {
                    var $this = $(this);
                    $this.data('tipsEl').remove();
                    $this.removeData('tipsEl')
                }
            }))
        },
        fancyInput: function () {
            return (this.each(function () {
                $(this).focus(function () {
                    $(this).focusInput()
                }).blur(function () {
                    $(this).removeClass('focus')
                })
            }))
        },
        focusInput: function () {
            return (this.each(function () {
                $(this).addClass('focus').removeClass('success error').hideTips()
            }))
        },
        errorInput: function (msg) {
            return (this.each(function () {
                $(this).addClass('error').removeClass('success');
                if (msg) {
                    $(this).data({
                        tipsTitle: msg,
                        tips: '2_b'
                    }).showTips()
                }
                ;
                $(window).scrollTop($(this).offset().top - 20)
            }))
        },
        successInput: function () {
            return (this.each(function () {
                $(this).addClass('success').removeClass('error').hideTips()
            }))
        }
    })
})(jQuery);

function copyToClipboard(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
        return true
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
        return true
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
        } catch (e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'")
        }
        ;
        if (Components && Components.classes) {
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip) return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans) return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
            return true
        } else {
            return false
        }
    } else if (typeof copy != undefined) {
        copy(txt);
        return true
    }
    ;
    return false
};

function setPhoneDropMenu(el, cls, onSelect) {
    var el = el || 'body',
        cls = cls || 'active';
    $('ul.phoneDropMenu:not(.setPhoneDropMenu)', el).each(function () {
        var $this = $(this),
            title = $this.attr('title') || '刷选',
            zIndex = $this.parent().css('zIndex');
        resize = function () {
            if ($(window).width() < 768) {
                if (!$('li.topMenu', $this).length) {
                    var topMenu = $('li:first', $this).clone();
                    topMenu.find('a').attr('href', 'javascript:;').html(title);
                    topMenu.removeClass('active').addClass('topMenu').prependTo($this)
                }
            } else {
                $('li.topMenu', $this).remove()
            }
        };
        $this.removeAttr('title').addClass('setPhoneDropMenu').delegate('li', click, function (e) {
            if ($(window).width() < 768) {
                if ($(this).hasClass('topMenu')) {
                    if ($this.hasClass(cls)) {
                        $this.removeClass(cls).parent().css('zIndex', zIndex)
                    } else {
                        e.preventDefault();
                        $this.addClass(cls).parent().css('zIndex', 111111)
                    }
                } else if (onSelect) {
                    e.preventDefault();
                    $this.removeClass(cls).parent().css('zIndex', zIndex)
                }
                ;
                e.stopPropagation()
            }
            ;
            if (!$(this).hasClass('topMenu')) {
                $(this).toActive()
            }
            ;
            if ($.isFunction(onSelect) && !$(this).hasClass('topMenu')) {
                onSelect($(this))
            }
        });
        $(document).on(click, function () {
            $this.removeClass(cls).parent().css('zIndex', zIndex)
        });
        $(window).resize(resize);
        resize()
    })
};

function getIcon(src) {
    return src.replace('ori', 'icon').replace('_s', '').replace('pic', 'thumb')
};
$(document).ready(function () {
    $('body').delegate('[data-tips]', {
        mouseenter: function (e) {
            var $this = $(this);
            $this.showTips()
        },
        mouseleave: function (e) {
            var $this = $(this);
            $this.hideTips()
        },
        click: function (e) {
            $(this).hideTips()
        }
    }).delegate('input[type="text"],input[type="password"],textarea', {
        focus: function () {
            $(this).removeClass('error success').addClass('focus')
        },
        blur: function () {
            $(this).removeClass('focus')
        }
    }).delegate('input[role="number"]', {
        keyup: function () {
            this.value = this.value.replace(/\D/g, '')
        },
        afterpaste: function () {
            this.value = this.value.replace(/\D/g, '')
        }
    }).delegate('input[max]', {
        keyup: function () {
            if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                $(this).val($(this).attr('max'))
            }
        },
        afterpaste: function () {
            if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                $(this).val($(this).attr('max'))
            }
        }
    }).delegate('a[role]', click, function (e) {
        switch ($(this).attr('role')) {
            case 'getShortUrl':
                if (typeof siteAjaxURL == 'string') {
                    $.getJSON(siteAjaxURL, {
                        "action": "getShortUrl",
                        "url": window.location.href
                    }, function (backData) {
                        if (backData.code == 0) {
                            var now = $.now(),
                                html = '<div>当前页面的短网址为：<br><br><input type="text" id="input_' + now + '"  value="' + backData.data + '" style="width:200px;" />';
                            if ($.browser.msie) {
                                html += '&nbsp;&nbsp;<a href="javascript:;" class="btn mini" role="copyToClipBoard" data-target="#input_' + now + '">复制网址</a>'
                            }
                            ;
                            html += '</div>';
                            Alert(html)
                        } else {
                            Alert('获取失败！')
                        }
                    })
                }
                break;
            case 'copyToClipBoard':
                var clipBoardContent = $($(this).data('target')).val() || $($(this).data('target')).html();
                if (copyToClipboard(clipBoardContent)) {
                    $(this).text('复制成功')
                } else {
                    alert('复制遇到问题，请使用Ctrl+C复制！')
                }
                break
        }
    });
    $('input').placeholder()
}).ajaxStart(setMask).ajaxError(function () {
    setMask(0);
    Tips('error')
}).ajaxStop(function () {
    setMask(0)
}).ajaxSuccess(function () {
    setMask(0)
});