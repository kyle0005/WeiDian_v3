/**
 * Created by YK on 2014/9/24 0024.
 */
;(function ($, window, document, undefined) {
    var startX = 0, startY = 0;
    var endX = 0, endY = 0;
    //定义TouchMove的构造函数
    var TouchMove = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    //定义TouchMove的方法
    TouchMove.prototype = {
        example: function () {
            return this.$element.css({
            });
        },
        stopScrolling: function (touchEvent) {
            touchEvent.preventDefault();        //阻止触摸时浏览器的缩放、滚动条滚动等
        },
        touchStartFunc: function (evt) {
            try {
                var touch = evt.touches[0]; //获取第一个触点
                var x = Number(touch.pageX); //页面触点X坐标
                var y = Number(touch.pageY); //页面触点Y坐标
                //记录触点初始位置
                startX = x;
                startY = y;
            }
            catch (e) {
                console.log('touchSatrtFunc：' + e.message);
            }
        },
        touchMoveFunc: function (evt) {
            try {
            }
            catch (e) {
                console.log('touchMoveFunc：' + e.message + "+line:" + e.lineNumber);
            }
        },
        touchEndFunc: function (evt) {
            try {
                var touch = evt.changedTouches[0];
                var x = Number(touch.pageX); //页面触点X坐标
                var y = Number(touch.pageY); //页面触点Y坐标
                endX = x;
                endY = y;
                //判断滑动方向
                if (Math.abs(endX - startX) >= Math.abs(endY - startY)) {
                    //左右横向滑动
                    if (endX - startX > 0) {
                        if (Math.abs(endX - startX) > 50) {
                            //向右
                            $(this).carousel('prev');    //将轮播转到上一帧。
                        } else if ($(this).find('.active a').attr('href')) {
                            location.href = $(this).find('.active a').attr('href');
                        }
                    } else {
                        if (Math.abs(endX - startX) > 50) {
                            //向左
                            $(this).carousel('next');    //将轮播转到下一帧。
                        } else if ($(this).find('.active a').attr('href')) {
                            location.href = $(this).find('.active a').attr('href');
                        }
                    }
                } else {
                    //上下纵向滑动
                    if (endY - startY < 0) {
                        if (Math.abs(endY - startY) > 50) {
                            //向上
                        } else if ($(this).find('.active a').attr('href')) {
                            location.href = $(this).find('.active a').attr('href');
                        }
                    } else {
                        if (Math.abs(endY - startY) > 50) {
                            //向下
                        } else if ($(this).find('.active a').attr('href')) {
                            location.href = $(this).find('.active a').attr('href');
                        }
                    }
                }
            }
            catch (e) {
                console.log('touchEndFunc：' + e.message + '+line:' + e.lineNumber);
            }
        }
    }
    //在插件中使用TouchMove对象
    $.fn.touch = function (options) {
        //创建TouchMove的实体
        var touchMove = new TouchMove(this, options);
        //调用其方法
        //touchMove.init();
        var obj = this.get(0);
        obj.addEventListener('touchstart', touchMove.touchStartFunc, false);
        obj.addEventListener('touchmove', touchMove.touchMoveFunc, false);
        obj.addEventListener('touchend', touchMove.touchEndFunc, false);
        obj.addEventListener('touchstart', touchMove.stopScrolling, false);
        obj.addEventListener('touchmove', touchMove.stopScrolling, false);
    }
})(jQuery, window, document);
