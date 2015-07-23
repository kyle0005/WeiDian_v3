/**
 * Created by YK on 2014/12/12 0020.
 */
;(function ($, window, document, undefined) {
    //定义selectInit的构造函数
    var selectInit = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    //selectInit
    selectInit.prototype = {
        selClick: function (evt) {

        },
        maskClick: function(){

        },
        selChoose: function (evt) {

        },
        selListHover: function (evt) {

        }
    }
    //在插件中使用selectInit对象
    $.fn.defSelect = function (options) {
        var sel = new selectInit(this, options);
        //调用其方法
        //sel.example();

        var obj = this.get(0);
        obj.addEventListener('click', sel.selClick, false);
        sel.selListHover();
        sel.maskClick();
        sel.selChoose();
    }
})(jQuery, window, document);