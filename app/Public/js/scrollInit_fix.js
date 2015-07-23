;(function ($, window, document, undefined) {
    var url = 'Public/js/test';
    var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset,
        _p = 1, _total = 1;
    var scrollPage = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'c_id': '',
                'c_url': ''
            },
            this.options = $.extend({}, this.defaults, opt)
    };
    scrollPage.prototype = {
        init: function () {
            var c_id = this.options.c_id;
            var c_url = this.options.c_url;

        },
        is_weixn: function () {     //判断是否为微信浏览器
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }

        },
        pullDownAction: function () {           //下拉刷新
            //如果总数或当前页小于等于1时，就显示当前内容
            if (_total <= 1 || _p <= 1) {
                _p = 1;

                $('#pullDown').children('.pullDownLabel').html('当前第一页...');
                myScroll.y = 0;
                myScroll.refresh();
                return false;
            }
            //如果当前页大于总页数时，显示当前页面
            if (_p > _total) {
                _p = _total;
                return false;
            }
            _p = _p - 1;
            this.getAjaxData(url + '&p=' + _p);
            //getAjaxData(url);
            //$('#pullDown').removeClass('loading');
        },
        pullUpAction: function () {         //滚动翻页
            //如果当前页是最后一页或只有一页是就显示这页
            if (_total <= 1 || _p >= _total) {
                _p = _total;
                return false;
            }
            if (_p <= 1) {
                _p = 1;
            }
            _p = _p + 1;
            this.getAjaxData(url + '&p=' + _p);
            //getAjaxData(url);
            //$('#pullUp').removeClass('loading');
        },
        loadFirData: function () {
            this.getAjaxData(url);
        },
        getAjaxData: function () {
            JQAjax.get(null, {
                url : url,
                callback : function(result) {
                    result = eval('(' + result + ')');
                    _p = result.p > 0 ? result.p : 1;
                    _total = result.total > 0 ? result.total : 1;
                    if (_p <= 1) {
                        $('#pullDown').css("visibility", "hidden");
                    } else {
                        $('#pullDown').css("visibility", "visible");
                    }
                    if (_p == _total) {
                        $('#pullUp').css("visibility", "hidden");
                    } else {
                        $('#pullUp').css("visibility", "visible");
                    }

                    if (result.data) {
                        $('#thelist').html(result.data);
                        myScroll.y = 0;
                        myScroll.refresh();
                    }
                }
            })
        },
        loaded:function() {
            if(this.is_weixn()) {
                if($('#main').length > 0){
                    $('#wrapper').css('top','0');
                }else{
                    $('#wrapper').css('top','45px');
                }
            }else{
                if($('#main').length > 0){
                    $('#wrapper').css('top','45px');
                }else{
                    $('#wrapper').css('top','90px');
                }
            }
            if($('footer').length > 0){
                $('#wrapper').css('bottom','41px');
            }else{
                $('#wrapper').css('bottom','0');
            }

            this.loadFirData();
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');
            pullUpOffset = pullUpEl.offsetHeight;

            myScroll = new iScroll('wrapper', {
                scrollbarClass: 'myScrollbar', /* 重要样式 */
                topOffset: pullDownOffset,
                onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    } else if (pullUpEl.className.match('loading')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                        this.pullDownAction();	// Execute custom function (ajax call?)
                    } else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                        this.pullUpAction();	// Execute custom function (ajax call?)
                    }
                }
            });
            setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 500);

        }

    };
    $.fn.scrollPages = function (options) {
        var scrollPage = new scrollPage(this, options);
        //初始化绑定iScroll控件
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        document.addEventListener('DOMContentLoaded', scrollPage.loaded, false);
    };
})(jQuery, window, document);