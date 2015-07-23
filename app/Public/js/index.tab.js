/**
 * Created by YK on 2014/10/20 0020.
 */
$(function(){
    tab.tabClick($('.js-preTab'), $('.js-preTabs'), 'active');
    tab.tabClick($('.js-homeIconAd'), $('.js-homeIconAdTabs'), 'active');
});
var tab = new Object({
    tabClick: function(tabObj, tabsObj, chosenClassName){        //Tab切换选项
        var click_obj  = $(tabObj).find('li');
        var tab_obj = $(tabsObj);
        $(click_obj).click(function(){
            $(click_obj).removeClass(chosenClassName);
            $(this).addClass(chosenClassName);

            var ind = $(this).index();
            $(tab_obj).addClass('hide');
            $(tab_obj).eq(ind).removeClass('hide');
        });
    }
});