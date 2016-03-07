/**
 * Created by YK on 2014/9/9 0009.
 */
$(function(){
  //微信下隐藏菜单
  pop.popClick($('.js-csch'),$('.js-cates'));
  pop.popClick($('.js-info'),$('.js-shop'));
  pop.popClick($('.js-sort'),$('.js-price'));
  pop.popClick($('.js-face'),$('.js-shop'));
  pop.popClick($('.js-addClass'),$('.js-addProClass'));


  pop.popSelect();
  pop.popBack();

  pop.popUp($('.js-choose'),$('.js-chooseStandard'));
  pop.popUp($('.js-invite'), $('.js-ali-invite'));
  pop.popUp($('.js-choose-host'), $('.js-hostChoose'));
  //pop.popUp($('.js-createAli'), $('.js-pop-createAli'));
  pop.popUp($('.js-allClass'), $('.js-allClassDiv'));
  pop.popDown();

  tab.tabClick($('.js-tab'), 'sel');
  tab.tabClick($('.com-container'), 'sel');
  tab.tabClick($('.js-list-tab'), 'cur');
  tab.tabClick($('.js-com'), 'cart-cur');

  tab.tabClick($('.js-orderTab'),'order-cur');

  tab.tabClick($('.js-live-tab'),'live-cur');

  buyNow.listClick();
});

//判断是否为微信浏览器
function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}

var pop = new Object({
  popClick: function(clickObj, popObj){       //右侧弹窗滑出
    $(clickObj).click(function(){
      $('#popLayerWrap').removeClass('none');
      if($('#popLayerWrap2')){
        $('#popLayerWrap2').removeClass('none');
      }
      $('.pop-layer').css('left','100%');
      $('.pop-layer').stop(true,false).animate({left:"40px"});
      $(popObj).removeClass('none');
    }) ;
  },
  popBack: function(){        //右侧弹窗后退
    $('.js-popWrap').click(function(){
      $('.pop-layer').stop(true,false).animate({left:"100%"},function(){
        $('#popLayerWrap').addClass('none');
        if($('#popLayerWrap2')){
          $('#popLayerWrap2').addClass('none');
        }
        $('.js-cates').addClass('none');
        $('.js-shop').addClass('none');
        $('.js-price').addClass('none');
      });
    }) ;
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
      var height = 0;
      if($('.js-ali-invite').length != 0){
        height = 150;
      }else if($('.js-hostChoose').length != 0){
        height = 226;
      }
      else if($('.js-pop-createAli').length != 0){
        height = 250;
      }else if($('.js-allClassDiv').length != 0){
        height = 76 + 32 * Math.round(parseFloat($('.cls-opt').length / 3));
      }
      else{
        height = 331;
      }
      var li_num = $('.js-dgli').length;
      var heightLis = Math.round(parseInt(li_num / 3)) * 40;
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
    });
  },
  popUpC: function(clickObj, total){      //向上滑动弹窗
    $(clickObj).click(function(){
      $('#popUpWrap').removeClass('none');
      $('.pop-up').height(total);
    }) ;
  },
  popDownC: function() {      //向下滑出
    //点击蒙层处或者叉滑出
    $('.js-mask, .js-x').click(function(){
      $('.pop-up').height('0');
      setTimeout(function(){
        $('#popUpWrap').addClass('none');
      },600);

    }) ;
  },
  popLeftC: function(leftPopWrap, clickObj, total){      //向左滑动弹窗
    $(clickObj).click(function(){
      $(leftPopWrap).removeClass('none');
      $(leftPopWrap).children('.pop-left').width(total);
    }) ;
  },
  popRightC: function(leftPopWrap) {      //向右滑出
    //点击蒙层处或者叉滑出
    $('.js-mask, .js-x').click(function(){
      $(leftPopWrap).children('.pop-left').width('0');
      setTimeout(function(){
        $(leftPopWrap).addClass('none');
      },600);

    }) ;
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
        $('.buy-msg').removeClass('none');
        $('.js-arr-con').addClass('buy-title-arr-con-down').removeClass('buy-title-arr-con-up');
      }
      else{
        $('.buy-title-arr-down').removeClass('buy-title-arr-down').addClass('buy-title-arr-up');
        $('.buy-pros').addClass('none');
        $('.buy-deliver').addClass('none');
        $('.buy-message').addClass('none');
        $('.buy-msg').addClass('none');
        $('.js-arr-con').addClass('buy-title-arr-con-up').removeClass('buy-title-arr-con-down');
      }
    });
  },
  countPrice: function(prices, couponNum, expreeVal){
    prices = new BigDecimal(prices.toString())
      .subtract(new BigDecimal(couponNum.toString()))
      .add(new BigDecimal(expreeVal.toString()));
    prices = prices <= 0 ? 0 : prices;
    return (parseFloat(prices).toFixed(2)).toString();
  }
})

