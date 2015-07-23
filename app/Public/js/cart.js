/**
 * Created by YK on 2014/9/9 0009.
 */
$(function () {
    var isAllChecked = false;
    var isAllUnChecked = true;
    var total_pri = 0.00;

    function accMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    }
    function countSumPrice() {
        //计算全部宝贝价格
        total_pri = 0.00;
        var arrChk = $("input[name='cart-pro'][checked]");
        var _goods_ids = '', _ext_ids = '';
        $(arrChk).each(function(){
            if($(this).is((':checked'))){
                var price = $(this).parent().siblings('.cart-list-item').find('em.subtotal').attr('tprice');
                var num = $(this).parent().siblings('.cart-list-item').find('input.c-f-text').val();
                //total_pri += (price * num);
                total_pri += accMul(price, num);
                total_pri.toFixed(2);
                _goods_ids += $(this).data('goodsid') + ',';
                _ext_ids += $(this).data('extid') + ',';
            }
        });
        $('#ids').val(_goods_ids);
        $('#ext_ids').val(_ext_ids);
        $('.totalprice .price').html('￥' + total_pri );
        $('.totalprice .c-btn-orgn .num').html(arrChk.length);
    }

    //点击全选按钮
    $('.js-cart-choose').click(function () {
        $('.c-f-checkbox').attr("checked", !isAllChecked);
        if (!isAllChecked) {
            $(this).addClass('off').removeClass('on');
            $(this).children().html('全不选');
            $('.js-del').addClass('on').removeClass('off');
            isAllChecked = true;
            isAllUnChecked = false;
        }
        else {
            $(this).addClass('on').removeClass('off');
            $(this).children().html('全选');
            $('.js-del').addClass('off').removeClass('on');
            isAllChecked = false;
            isAllUnChecked = true;
        }

        countSumPrice();
    });
    //点击全选checkbox
    $('.check-green').click(function () {
        $('.c-f-checkbox').attr("checked", !isAllChecked);
        if (!isAllChecked) {
            $('.js-cart-choose').addClass('off').removeClass('on');
            $('.js-cart-choose').children().html('全不选');
            $('.js-del').addClass('on').removeClass('off');
            isAllChecked = true;
            isAllUnChecked = false;
        }
        else {
            $('.js-cart-choose').addClass('on').removeClass('off');
            $('.js-cart-choose').children().html('全选');
            $('.js-del').addClass('off').removeClass('on');
            isAllChecked = false;
            isAllUnChecked = true;
        }

        countSumPrice();

    });
    //点击购物车中每一个宝贝的checkbox
    $('.check-red').click(function () {
        var isChecked = $(this).is(":checked");
        $(this).attr("checked", isChecked);

        //判断第一步：是否全部被选中
        var arrChk=$(".check-red");
        $(arrChk).each(function(){
            if(!$(this).is((':checked'))){
                isAllChecked = false;
                return false;
            }
            isAllChecked = true;
        });
        //判断第二步：是否全部未选中
        $(arrChk).each(function(){
            if($(this).is((':checked'))) {
                isAllUnChecked = false;
                return false;
            }
            isAllUnChecked = true;
        });

        if(isAllUnChecked){
            $('.js-del').addClass('off').removeClass('on');
        }
        else{
            $('.js-del').addClass('on').removeClass('off');

        }
        $('.check-green').attr("checked", isAllChecked);
        if(isAllChecked){
            $('.js-cart-choose').addClass('off').removeClass('on');
            $('.js-cart-choose').children().html('全不选');
        }
        else{
            $('.js-cart-choose').children().html('全选');
        }

        countSumPrice();

    });

    //修改数量
    $('.js-cart-input').blur(function () {
        countSumPrice();
        var _default = $(this).attr('data-value');
        var number = $(this).val();
        if (_default != number) {
            var url = $('#changenumber_url').val();
            JQAjax.post(this, {
                url : url,
                form : {
                    goods_id : $(this).attr('data-goodsid'),
                    ext_id : $(this).attr('data-extid'),
                    goods_number : number,
                    is_change : 1
                }
            });
        }
    });
});