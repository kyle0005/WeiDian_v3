//touch事件
var myElement = document.getElementById('i-myCarousel');

var hammertime = new Hammer(myElement);
hammertime.on('panleft', function(ev) {
    $(myElement).carousel('next');            //将轮播转到下一帧。
    $("#i-myCarousel > img.lazy").trigger("scroll");         //触发scroll事件

});
hammertime.on('panright', function(ev) {
    $(myElement).carousel('prev');            //将轮播转到上一帧。
    $("#i-myCarousel > img.lazy").trigger("scroll");         //触发scroll事件
});

//pan,swipe事件开启纵向滑动
//hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
//hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });