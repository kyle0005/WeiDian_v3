/**
 * Created by YK on 2014/10/20 0020.
 */
// Fix page and nav height
function nav_page_height() {
    var setHeight = $('.a-main').height();
    //menuHeight = $.left_panel.height();

    var windowHeight = $(window).height();
    //set height

    if (setHeight > windowHeight) {         // if content height exceedes actual window height and menuHeight
        $('.subnav').css('height', setHeight + 'px');
        $('body').css('height', setHeight);

    } else {
        $('.subnav').css('height', windowHeight + 'px');
        $('body').css('height', windowHeight + 'px');
    }
}

function good_info_height() {
    var setHeight = $('.good-info-right').height();
    $('.good-info-left').css('height', setHeight + 'px');

}

$(function() {
    nav_page_height();
    good_info_height();
});