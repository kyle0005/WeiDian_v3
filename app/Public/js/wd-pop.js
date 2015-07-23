/**
 * Created by YK on 2014/6/17 0017.
 */
$(function(){
    /*右侧弹出层*/
   $('.js-csch').click(function(){
       $('#popLayerWrap').removeClass('none');

       $('.pop-layer').css('left','100%');
       $('.pop-layer').stop(true,false).animate({left:"40px"});
       $('.js-cates').removeClass('none');
   }) ;

    $('.js-info').click(function(){
        $('#popLayerWrap').removeClass('none');

        $('.pop-layer').css('left','100%');
        $('.pop-layer').stop(true,false).animate({left:"40px"});
        $('.js-shop').removeClass('none');
    }) ;

    $('.js-face').click(function(){
        $('#popLayerWrap').removeClass('none');

        $('.pop-layer').css('left','100%');
        $('.pop-layer').stop(true,false).animate({left:"40px"});
        $('.js-shop').removeClass('none');
    }) ;


    $('.js-popWrap').click(function(){
        $('.pop-layer').stop(true,false).animate({left:"100%"},function(){
            $('#popLayerWrap').addClass('none');
            $('.js-cates').addClass('none');
            $('.js-shop').addClass('none');
        });

    }) ;

    /*收藏产品*/
    $('.dts-fav').click(function(){
        $('.dts-fav').addClass('hide');
        $('.dts-faved').attr('style','display: block;');

        $('.js-alt-p').attr('style','');
        setTimeout(function(){
            $('.js-alt-p').attr('style','opacity: 0;');
        },1000);
    });

    /*收藏微店*/
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

    /*右侧分类下拉菜单*/
    $('.title').click(function (){
        if($(this).children('.sc-arr').hasClass('arr-d')){
            $(this).children('.sc-arr').removeClass('arr-d').addClass('arr-r');
        }else{
            $(this).children('.sc-arr').removeClass('arr-r').addClass('arr-d');
        }
        $(this).next().slideToggle();
    });
});
