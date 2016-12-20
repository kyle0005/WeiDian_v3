/**
 * Created by Administrator on 2016/10/13 0013.
 */
var audioPlayer = {
  loadVoice: function (url) {
    var control = $('#control');
    var userAgent = navigator.userAgent.toLowerCase();
    var isSafari = userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') < 1 ;
/*    if(isSafari){
      $(control).addClass('pause');
    }else {
      $(control).addClass('play');
    }*/
    var audio = document.getElementById('audio');
    $(audio).attr('src', url);
    audio.load();

    this.playCotrol();

    if ($(control).hasClass('play')) {
      audio.play();
    }
    this.clicks();
    /*
    *   chrome(模拟器iphone): mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)
    *                         version/9.0 mobile/13b143 safari/601.1
    *
    *   safari:               mozilla/5.0 (iphone; cpu iphone os 10_1_1 like mac os x) applewebkit/602.2.14 (khtml, like gecko)
    *                         version/10.0 mobile/14b100 safari/602.1
    *
    *   chrome:               mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko)
    *                         chrome/54.0.2840.87 safari/537.36
    *
    *  */
  },
  clicks: function () {
    var audio = document.getElementById('audio');
    $('#control').click(function() {
      if ($('#control').hasClass('play')) {
        audio.pause();
      } else {
        audio.play();
      }
    })
  },
  playCotrol: function () {
    var audio = document.getElementById('audio');
    audio.addEventListener('loadstart', function() {
      console.log('loadstart');
      alert('loadstart');
    }, false);
    audio.addEventListener('loadeddata',
      function() {
        console.log('loadeddata');
        alert('loadeddata');
      }, false);
    audio.addEventListener('loadedmetadata', function() {
      console.log('loadedmetadata');
      alert('loadedmetadata');
    }, false);
    audio.addEventListener('canplay', function() {
      console.log('canplay');
      alert('canplay');
    }, false);
    audio.addEventListener('error',
      function() {
        console.log('error');
        alert('error');
      }, false);
    audio.addEventListener('pause',
      function() {
        console.log('pause');
        alert('pause');
        $('#control').addClass('pause').removeClass('play');
      }, false);
    audio.addEventListener('play',
      function() {
        console.log('play');
        alert('play');
        $('#control').addClass('play').removeClass('pause');
      }, false);
  }
};
