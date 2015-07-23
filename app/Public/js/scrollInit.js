/**
 * Created by YK on 2014/12/5 0005.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset;


//判断是否为微信浏览器
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" || is_app) {
        return true;
    } else {
        return false;
    }
}
//var url = 'Public/js/test2';
/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 * {url&p, p, total, id}
 */
function pullDownAction () {
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
        getAjaxData(url + '&p=' + _p);
        //getAjaxData(url);
//    $('#pullDown').removeClass('loading');
}
/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction () {
        //如果当前页是最后一页或只有一页是就显示这页
        if (_total <= 1 || _p >= _total) {
            _p = _total;
            return false;
        }
        if (_p <= 1) {
            _p = 1;
        }
        _p = _p + 1;
        getAjaxData(url + '&p=' + _p);
        //getAjaxData(url);
//    $('#pullUp').removeClass('loading');
}

/*
 * 首次加载页面第一屏数据
 * */
function loadFirData (){
    getAjaxData(url);
}

function getAjaxData(url) {
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
}

/**
 * 初始化iScroll控件
 */
function loaded() {

    var is_list = false;
    if (typeof(is_shop) != 'undefined') {
        var is_list = is_shop;
    }
    if((is_weixn() && is_list != true) || is_app) {
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
        $('#wrapper').css('bottom','50px');
    }else{
        $('#wrapper').css('bottom','0');
    }

    //loadFirData(); 当前页不默认加载
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    //加载页面不是第一屏，显示下拉
    if (_p > 1) {
        $('#pullDown').css("visibility", "visible");
    } else {
        $('#pullDown').css("visibility", "hidden");
    }
    //当不是最后一页时显示上拉
    if (_p < _total && _total > 0) {
        $('#pullUp').css("visibility", "visible");
    } else {
        $('#pullDown').css("visibility", "hidden");
    }


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
            } else if (this.y < (this.maxScrollY - 5) && this.maxScrollY < 1 && !pullUpEl.className.match('flip')) {
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
                pullDownAction();	// Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 500);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);
