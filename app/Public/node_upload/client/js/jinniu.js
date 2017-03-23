var JQCheck = {
    load: function () {
        $(".checkbox").click(function () {
            var a = !0;
            $(".checkbox").each(function () {
                $(this).attr("checked") || (a = !1)
            }), a ? $(".checkall").attr("checked", "checked") : $(".checkall").removeAttr("checked")
        }), $(".checkall").click(function () {
            $(this).attr("checked") ? $(".checkbox").attr("checked", "checked") : $(".checkbox").removeAttr("checked")
        })
    }, count: function () {
        return $(".checkbox:checked").length
    }, valid: function () {
        var a = !1;
        return $(".checkbox").each(function () {
            return $(this).attr("checked") ? void(a = !0) : void 0
        }), a
    }
}, JQDialog = {
    creat: function (a) {
        if (a = a || {}, a.type) {
            $("#dialog") && $("#dialog").dialog("destroy").remove();
            var b = {
                modal: a.modal ? a.modal : !1,
                resizable: a.resizable ? a.resizable : !1,
                bgiframe: a.bgiframe ? a.bgiframe : !1,
                title: a.title
            };
            if (a.height && (b.height = a.height), a.width && (b.width = a.width), a.buttons && (b.buttons = a.buttons), "open" == a.type) {
                var c = this;
                JQAjax.get(null, {
                    url: a.url, callback: function (a) {
                        c.show(a, b)
                    }
                })
            } else {
                var d = "<p class='jqalert'>";
                d += a.content + "</p>", this.show(d, b)
            }
            switch (a.type) {
                case"reload":
                    setTimeout("" + a.callback, 600);
                    break;
                case"alert":
                    setTimeout("$('#dialog').dialog('close')", 2e3);
                    break;
                case"jump":
                    setTimeout("" + a.callback, 600);
                    break;
                case"close":
                    $(".ui-dialog-titlebar-close").click(a.callback)
            }
        }
    }, show: function (a, b) {
        var c = document.getElementsByTagName("body").item(0), d = document.createElement("div");
        d.id = "dialog", d.innerHTML = a, c.appendChild(d), $("#dialog").dialog(b)
    }
}, JQbox = {
    alert: function (a) {
        JQDialog.creat({type: "alert", title: "提示", content: a})
    }, reload: function (a) {
        JQDialog.creat({type: "reload", title: "提示", content: a, callback: "location.reload()"})
    }, jump: function (a, b) {
        JQDialog.creat({type: "jump", title: "提示", content: a, callback: 'location.href = "' + b + '"'})
    }, close: function (a, b) {
        JQDialog.creat({type: "close", title: "提示", content: a, callback: b, modal: !0})
    }, open: function (a) {
        a = a || {}, JQDialog.creat({
            type: "open",
            title: a.title || "提示",
            url: a.url,
            width: a.width || 300,
            height: a.height || "auto"
        })
    }, confirm: function (a, b, c) {
        JQDialog.creat({
            type: "confirm", title: "提示", content: a, height: 180, buttons: {
                "确定": function () {
                    $("#dialog").dialog("close"), b.call(this)
                }, "取消": function () {
                    $(this).dialog("close"), c.call(this)
                }
            }
        })
    }
}, Ajax = function (a, b) {
    b = b || {};
    var c = "";
    if (b.wait) {
        if ($(a).hasClass("disabled"))return;
        c = $(a).html(), $(a).addClass("disabled"), $(a).html(b.waitinfo || c + "中...")
    }
    if ("GET" == b.type || "LOAD" == b.type)$.ajax({
        url: b.url ? b.url : "",
        type: "GET",
        cache: !1,
        timeout: 3e6,
        error: function () {
            b.containerid && $("#" + b.containerid).html("数据加载失败")
        },
        success: b.callback,
        complete: function () {
            "" != c && $(a).html(c)
        }
    }); else if ("POST" == b.type) {
        b.url || (b.url = $("#" + b.form).attr("action"));
        var d;
        d = "object" == typeof b.form ? b.form : b.form ? $("#" + b.form).serialize() : "", $.ajax({
            url: b.url,
            type: "POST",
            data: d,
            cache: !1,
            timeout: 3e6,
            error: function () {
            },
            success: b.callback,
            complete: function () {
                $(a).removeClass("disabled"), "" != c && $(a).html(c)
            }
        })
    }
}, JQAjax = {
    get: function (a, b) {
        Ajax(a, {type: "GET", url: b.url, wait: b.wait, callback: b.callback})
    }, load: function (a, b) {
        var c = a.attr("data-load");
        Ajax(a, {
            type: "LOAD", url: b, containerid: c, callback: function (a) {
                $("#" + c).html(a)
            }
        })
    }, post: function (element, options) {
        (!options.confirm || confirm("你确定要执行该操作？")) && ($(".error").each(function () {
            $(this).hide()
        }), Ajax(element, {
            type: "POST",
            wait: options.wait,
            url: options.url,
            form: options.form,
            waitinfo: options.waitinfo,
            callback: options.callback ? options.callback : function (result) {
                var data = eval("(" + result + ")");
                if (data.method)switch (data.method) {
                    case"func":
                        eval(data.func);
                        break;
                    case"remind":
                        $("#e_remind").html(data.message).show();
                        break;
                    case"alert":
                        JQbox.alert(data.message);
                        break;
                    case"goto":
                        data.message ? JQbox.jump(data.message, data.url) : location.href = data.url;
                        break;
                    case"reload":
                        data.message ? JQbox.reload(data.message) : location.reload();
                        break;
                    case"error":
                        var err = data.dic;
                        for (var o in data.dic)$("#e_" + o).html(err[o]).show()
                }
            }
        }))
    }
};