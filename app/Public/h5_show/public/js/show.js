/**
 * Created by Administrator on 2016/12/14 0014.
 */
$(function () {
  var myElement = document.getElementById('show_container');
  var ham = new Hammer(myElement);
  ham.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });
  document.addEventListener('touchmove', function (event) {
    event.preventDefault();
  }, false);
  ham.on('swipeup', function (ev) {
    alert('up');
  });
  ham.on('swipedown', function (ev) {
    alert('down');
  });
});
