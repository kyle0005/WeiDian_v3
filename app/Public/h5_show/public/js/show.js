/**
 * Created by Administrator on 2016/12/14 0014.
 */
$(function () {
  $('#fullpage').fullpage({
    afterLoad: function(anchorLink, index){
      //section 1
      if(index == 1){
        $('#p1-container').show();
      }
      //section 2
      if(index == 2){
        $('#p2-container').show();

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
        $('#p1-container').hide();
      }
      //section 2
      if(index == 2){
        $('#p2-container').hide();

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
