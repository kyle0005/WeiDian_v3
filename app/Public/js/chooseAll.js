/**
 * Created by YK on 2014/10/28 0028.
 */
;(function ($, window, document, undefined) {
    var _isAllSel = false;
    //定义selectAll的构造函数
    var selectAll = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    selectAll.prototype = {
        example: function () {
            return this.$element.css({
            });
        },
        isSelAll: function(evt){
            var checkedNum = $("input[class='js-check-toggle']:checked").length;
            var checksNum = $("input[class='js-check-toggle']").length;
            //alert(checkedNum + "+" + checksNum);
            if(checkedNum == checksNum){
                //全选
                _isAllSel = true;
            }
            else{
                _isAllSel = false;
            }
        }
    }
    //在插件中使用selectInit对象
    $.fn.SelectA = function (options) {
        var sel = new selectAll(this, options);
        $(this).click(function(){
            sel.isSelAll();
            if(!_isAllSel){
                $("input[class='js-check-toggle']").attr("checked", true);
            }
            else{
                $("input[class='js-check-toggle']").removeAttr("checked");
            }
        });
        $('.js-check-toggle').click(function () {
            sel.isSelAll();
            if(_isAllSel){
                $("input[id='js-check-all']").attr("checked", true);
            }
            else{
                $("input[id='js-check-all']").removeAttr("checked");
            }
        });
    }
})(jQuery, window, document);