/**
 * Created by YK on 2014/9/9 0009.
 */
$(function(){
    pop.popClick($('.js-setting'),$('.js-addPro'));
    pop.popBack();
    pop.popClick($('.addClick'),$('.js-addProClass'));
    pop.popClick($('.editClick'),$('.js-addProClass'));
    pop.popClick($('.js-edit-attr'),$('.js-editPro'));

});
//判断是否为微信浏览器
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

var pop = new Object({
    popClick: function(clickObj, popObj){       //右侧弹窗滑出
        $(clickObj).click(function(){
            $('#popLayerWrap').removeClass('none');

            $('.pop-layer').css('left','100%');
            $('.pop-layer').stop(true,false).animate({left:"40px"});
            $(popObj).removeClass('none');
        }) ;
    },
    popBack: function(){        //右侧弹窗后退
        $('.js-popWrap').click(function(){
            $('.pop-layer').stop(true,false).animate({left:"100%"},function(){
                $('#popLayerWrap').addClass('none');
                $('.js-cates').addClass('none');
                $('.js-shop').addClass('none');
                $('.js-price').addClass('none');
                $('.js-addPro').addClass('none');
            });
        }) ;

        $('.js-pub').click(function () {
            $('.pop-layer').stop(true,false).animate({left:"100%"},function(){
                $('#popLayerWrap').addClass('none');
                $('.js-cates').addClass('none');
                $('.js-shop').addClass('none');
                $('.js-price').addClass('none');
                $('.js-addPro').addClass('none');
            });
        });
    },
    popSelect: function(){      //右侧弹窗分类下拉菜单
        $('.title').click(function (){
            if($(this).children('.sc-arr').hasClass('arr-d')){
                $(this).children('.sc-arr').removeClass('arr-d').addClass('arr-r');
            }else{
                $(this).children('.sc-arr').removeClass('arr-r').addClass('arr-d');
            }
            $(this).next().slideToggle();
        });
    },
    popUp: function(clickObj, popObj){      //选择规格向上弹窗
        $(clickObj).click(function(){
            $('#popLayerWrap').removeClass('none');
            $('.pop-layer').css('top','100%');

            var winHeight = $(window).height();
            var height = 281;
            var li_num = $('.js-dgli').length;
            var heightLis = Math.round(parseInt(li_num) / 3) * 30;
            alert(heightLis)
            var total = parseInt(winHeight) - (parseInt(height) + parseInt(heightLis));
            $('.pop-layer').stop(true,false).animate({top: total+'px'});

            $(popObj).removeClass('none');
        }) ;
    },
    popDown: function() {      //选择规格向下
        //点击蒙层处滑出
        $('.js-popWrapUp').click(function(){
            $('.pop-layer').stop(true,false).animate({top:"100%"},function(){
                $('#popLayerWrap').addClass('none');
                $('.js-chooseStandard').addClass('none');
            });
        }) ;

        //点击叉滑出
        $('.js-x').click(function(){
            $('.pop-layer').stop(true,false).animate({top:"100%"},function(){
                $('#popLayerWrap').addClass('none');
                $('.js-chooseStandard').addClass('none');
            });
        }) ;
    }
});

var fav = new Object({
    productFav: function(){     //产品收藏弹窗
        $('.dts-fav').click(function(){
            $('.dts-fav').addClass('hide');
            $('.dts-faved').attr('style','display: block;');

            $('.js-alt-p').attr('style','');
            setTimeout(function(){
                $('.js-alt-p').attr('style','opacity: 0;');
            },1000);
        });
    },
    shopFav: function () {      //微店收藏弹窗
        $('.js-fav').click(function(){
            if($('.fav-icon').hasClass('h')){
                $('.fav-icon').removeClass('h');
                $('.warnMsg').text('收藏成功');
            }else{
                $('.fav-icon').addClass('h');
                $('.js-Msg').text('取消收藏成功');
            }
            $('.js-alt-s').attr('style','');
            setTimeout(function(){
                $('.js-alt-s').attr('style','opacity: 0;');
            },1000);
        });
    }
});

var tab = new Object({
    tabClick: function(tabObj, chosenClassName){        //Tab切换选项
        var click_obj  = $(tabObj).find('li');
        var tab_obj = $(tabObj).siblings();
        $(click_obj).click(function(){
            $(click_obj).removeClass(chosenClassName);
            $(this).addClass(chosenClassName);

            var ind = $(this).index();
            $(tab_obj).addClass('hide');
            $(tab_obj).eq(ind).removeClass('hide');
        });
    }
});

var buyNow = new Object({
    listClick: function(){
        $('.buy-title').click(function(){
            if($('.js-buy-click').hasClass('buy-title-arr-up')){
                $('.buy-title-arr-up').removeClass('buy-title-arr-up').addClass('buy-title-arr-down');
                $('.buy-pros').removeClass('none');
                $('.buy-deliver').removeClass('none');
                $('.buy-message').removeClass('none');
                $('.js-arr-con').addClass('buy-title-arr-con-down').removeClass('buy-title-arr-con-up');
            }
            else{
                $('.buy-title-arr-down').removeClass('buy-title-arr-down').addClass('buy-title-arr-up');
                $('.buy-pros').addClass('none');
                $('.buy-deliver').addClass('none');
                $('.buy-message').addClass('none');
                $('.js-arr-con').addClass('buy-title-arr-con-up').removeClass('buy-title-arr-con-down');
            }
        });
    },
    countPrice: function(){
        var total_pri = 0.00;
        var arrChk = $(".buy-pro-num");
        $(arrChk).each(function(){
            var num = $(this).find('.js-buy-num').text();
            var price = $(this).find('.js-buy-price').text();
            total_pri += (parseFloat(num) * parseFloat(price));
        });

        var deliver_pri = $('.js-buy-deliver-rmb').text();
        total_pri += (parseFloat(deliver_pri));
        $('.js-buy-listRmb').html(total_pri);
    }
});

var count = new Object({
    accMul: function(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    }
});

