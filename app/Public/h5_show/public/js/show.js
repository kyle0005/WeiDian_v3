/**
 * Created by Administrator on 2016/12/14 0014.
 */
$(function () {
  $('#fullpage').fullpage({
    afterLoad: function(anchorLink, index){
      //section 1
      if(index == 1){
        $('#section0').find('.p1-content2').delay(50).animate({
          bottom: '10%',
          opacity: '1'
        }, 1200, 'easeOutExpo');
      }
      //section 2
      if(index == 2){
        $('#section1').find('.p2-content1').delay(50).animate({
          right: '10.8333%'
        }, 1200, 'easeOutExpo');

        $('#section1').find('.p2-content2').delay(50).animate({
          left: '-50%'
        }, 1200, 'easeOutExpo');

      }
      //section 3
      if(index == 3){
       console.log("3");
      }

      //section 4
      if(index == 4){
        console.log("4");
      }

      //section 5
      if(index == 5){
        console.log("5");
      }

      //section 6
      if(index == 6){
        console.log("6");
      }

    },
    onLeave :function(index, nextIndex, direction){
//section 1
      if(index == 1){
        $('#section0').find('.p1-content2').removeAttr('style');
      }
      //section 2
      if(index == 2){
        $('#section1').find('.p2-content1').removeAttr('style');
        $('#section1').find('.p2-content2').removeAttr('style');

      }
      //section 3
      if(index == 3){
        console.log("3");
      }

      //section 4
      if(index == 4){
        console.log("4");
      }

      //section 5
      if(index == 5){
        console.log("5");
      }

      //section 6
      if(index == 6){
        console.log("6");
      }
    },
    afterRender: function () {

    }
  });
});
