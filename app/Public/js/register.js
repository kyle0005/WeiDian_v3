/**
 * Created by k on 2014/10/7.
 */
$(function(){
        $('.js-name').focus(function(){
            $('.js-name-text').text('6个字符以上，中文为2个字符');
        });
        $('.js-name').blur(function(){
            $('.js-name').addClass('reg-redBorder');
            $('.js-name-text').addClass('reg-text');
            $('.js-name-text').text('请填写正确的账户名')
        });

    $('.js-tel').focus(function(){
        $('.js-tel-text').text('11个数字');
    });
    $('.js-tel').blur(function(){
        $('.js-tel').addClass('reg-redBorder');
        $('.js-tel-text').addClass('reg-text');
        $('.js-tel-text').text('请填写正确的手机号码')
    });


    $('.js-pwd').focus(function(){
        $('.js-pwd-text').text('6个字符以上数字或字母');
    });
    $('.js-pwd').blur(function(){
        $('.js-pwd').addClass('reg-redBorder');
        $('.js-pwd-text').addClass('reg-text');
        $('.js-pwd-text').text('请填写正确的密码')
    });

    $('.js-code').blur(function(){
        $('.js-code').addClass('reg-redBorder');
        $('.js-code-text').addClass('reg-text');
        $('.js-code-text').text('请填写正确的验证码')
    });

    });