/**
 * Created by YK on 2014/8/27 0027.
 */
$(function(){
    $('.js-dgli').click(function(){
        if($(this).hasClass('selectedli')){
            $(this).removeClass('selectedli');
        }
        else{
            if($('.js-dgli').hasClass('selectedli')){
                $('.js-dgli').removeClass('selectedli');
            }
            if ($(this).data('stock') > 0) {
                $(this).addClass('selectedli');
            } else {
                JQbox.alert('库存不足');
            }
        }

        var s = $('.selectedli');
        if (s.length > 0) {
            $('.js-price').html('¥' + s.data('price') + '');
            $('.js-rest').html('（库存' + s.data('stock') + '件）');
            $('.js-chosen').html('已选："' + $('.selectedli').text() + '"');
            $('#ext_id').val(s.data('extid'));
            $('#goods_number').data('default', s.data('stock'));
            $('#goods_number').val(1);
        } else {
            $('.js-price').html($('.js-price').data('src'));
            $('.js-rest').html('（库存'+ $('.js-rest').data('src') +'件）');
            $('.js-chosen').html('已选：""');
            $('#ext_id').val('');
            $('#goods_number').data('default', $('.js-rest').data('src'));
            $('#goods_number').val(1);
        }
    });
});