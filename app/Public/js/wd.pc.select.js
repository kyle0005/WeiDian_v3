/**
 * Created by YK on 2014/10/20 0020.
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
        example: function () {
            return this.$element.css({
            });
        },
        selClick: function (evt) {
            var flag = false;
            var $selDrop = $('#select2-drop');
            var $selInp = $('#selectdef1');
            var $mask = $('#select2-drop-mask');
            $selDrop.hasClass('hide') ? flag = true : flag = false;
            if(flag){
                $selDrop.removeClass('hide');
                $selInp.addClass('select2-dropdown-open');
                $mask.show();

            }else{
                $selDrop.addClass('hide');
                $selInp.removeClass('select2-dropdown-open');
                $mask.hide();
            }
        },
        maskClick: function(){
            var $selDrop = $('#select2-drop');
            var $selInp = $('#selectdef1');
            $('#select2-drop-mask').click(function(){
                $(this).hide();
                $selDrop.addClass('hide');
                $selInp.removeClass('select2-dropdown-open');
            });
        },
        selChoose: function (evt) {
            var $selDrop = $('#select2-drop');
            var $selInp = $('#selectdef1');
            var $mask = $('#select2-drop-mask');
            $('.select2-results > li').click(function(){
                var _text = $(this).children().html();
                $('.js-sel-chosen1').html(_text);
                $selDrop.addClass('hide');
                $selInp.removeClass('select2-dropdown-open');
                $mask.hide();
            });
        },
        selListHover: function (evt) {
            $('.select2-results > li').hover(function(){
                $(this).addClass('select2-highlighted');
            },function(){
                $(this).removeClass('select2-highlighted');
            });
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