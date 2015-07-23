/**
 * Created by YK on 2014/9/1 0001.
 */
$(function () {
    $('.tabs > li').click(function(){
        $('.tabs > li.sel').removeClass('sel');
        $(this).addClass('sel');

        var ind = $(this).index();
        $('.cons').addClass('hide');
        $('.cons').eq(ind).removeClass('hide');
    });

    $('.comments > li').click(function(){
        $('.comments > li.sel').removeClass('sel');
        $(this).addClass('sel');

        var ind = $(this).index();
        $('.com-cons').addClass('hide');
        $('.com-cons').eq(ind).removeClass('hide');
    });
});