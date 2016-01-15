/**
 * Created by Administrator on 2016/1/12 0012.
 */
(function( win ){
  var body = $('body')
    I = {
      _init : function(){
        I.html();
        I.loading();
      }
      ,hideDiv : function( ele , num ){
        $(ele).css({opacity:num});
        setTimeout(function(){
          $(ele).css({dis:0,opacity:1});
        },320);
      }
      ,loading : function(){
        var   img = $('img')
          , len = 1
          , _j = 0
          , _num = 0;
        var obj = new Image();
        obj.src = config.imgPre + 'shake/mainbg.jpg';
        obj.onload = obj.onreadystatechange = obj.onerror = function(){
          _j++;
          _num = _j/len*100;
          I.load.num.css({width:_num+'%'});
          if(_num>=len){
            I.hideDiv(I.load,0);
          }
        }
      }
      ,html : function(){
        I.load = $("<div class='loading'><div class='bg'><div class='num' style='width:2%'></div></div></div>").appendTo(body);
        I.load.num = I.load.find('.num')
      }
    }
    ,Min = { //首页
      w : 480
      ,h : 853  // w , h 为图片比列
      ,flag: false
      ,_platform: ''
      ,_init : function(){
        Min.bg = $('.mainbg');
        Min.resize();

        //判断移动设备iPhone4或iPhone5
        function get_platform() {
          var _height = document.body.clientHeight ;
          return (_height > 480 ? 'p5' : 'p4');
        }
        Min._platform = get_platform();
        if(Min._platform == 'p4'){
          var bg = document.getElementsByClassName("couqian")[0];
          bg.style.backgroundImage = "url(" + config.imgPre + "shake/wei_bg_ip4.png)";
          bg.style.backgroundPosition = "center top";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "100%";

          var shakeGif = document.getElementsByClassName("reel-shake")[0];
          shakeGif.style.marginTop = "56%";
        }

        //摇一摇
        shake.init();
        //Min.start();
        //G.end();
      }
      ,resize : function(){
        var  _v = P.width/Min.w
          ,_h = _v*Min.h;
      }
      ,start : function(){
        body.css({overflowY:'hidden'});
        G.start();
      }
      ,restart : function(){
        body.css({overflowY:'auto'})
      }

    }
    ,shake = {
      SHAKE_THRESHOLD: 1000,
      last_update: 0,
            speed:10,
            x:0,
            y:0,
            z:0,
            lastX:0,
            lastY:0,
            lastZ:0,
            liTime:0,
            curTime:0,
            shakeFlag:false,
            sTime:0,
            init:function(){
              if(window.DeviceMotionEvent){
                //绑定摇动事件
                window.addEventListener('devicemotion',shake.deviceMotionHandler,false);
              }else{
                return false;
              }
            }
      ,deviceMotionHandler: function(){
            shake.liTime = new Date().getTime();
            if(shake.curTime > 10000 && (shake.liTime - shake.curTime) > 480){
              shake.curTime = 0;
              shake.shakeFlag = true;
            }
            var acceleration =event.accelerationIncludingGravity;
              shake.x = acceleration.x;
              shake.y = acceleration.y;
              shake.z = acceleration.z;
            if(Math.abs(shake.x-shake.lastX) > shake.speed || Math.abs(shake.y-shake.lastY) > shake.speed) {
              shake.curTime = new Date().getTime();
              shake.liTime = shake.curTime;
              shake.sTime = new Date().getTime();
              Min.start();
            } else if (shake.sTime && (new Date().getTime() - shake.sTime) >= 1000) {
              window.removeEventListener('devicemotion',shake.deviceMotionHandler,false);
              G.end();
            }
            shake.lastX = shake.x;
            shake.lastY = shake.y;
            shake.lastZ = shake.z;
          }
      }
    ,G = { //开始游戏
      bg : $('.game')
      ,one : $('.game .qian')
      ,two : $('.game .end')
      ,icon : $('.game .qian i')
      ,num : 9
      ,_init : function(){
        G.page = [];
      }
      ,start : function(){
        G.bg.css3({display:'box'},true)
        var num = 1 , n = 0 , _time;
        (function v(){
          num++;
          n++;
          if(n<6){
                if(num>5)num=1;
                G.icon[0].className = '';
                G.icon.addClass('i-bg'+num);
                setTimeout(v,200);
          }
        })();
      }
      ,end : function(){
        G.one.css({dis:0});
        G.two.css({dis:1});

          var end = document.getElementsByClassName('end')[0];
          setTimeout(function () {
            G.two.fadeOut(end, 20, 0);
          }, 500);

          var content = document.getElementsByClassName('content')[0];
          setTimeout(function () {
            $('.content').fadeIn(content, 20, 100);
            if(Min._platform == 'p4'){
              var shareImg = document.getElementsByClassName('reel-share')[0];
              shareImg.style.top = '-65%';
            }
          }, 1000);
        setTimeout(function(){
          var arr = [];
          arr.push(n + '');
          $.local.set('gameNum', JSON.stringify(arr));

          var again = document.getElementsByClassName('js-again')[0];
          again.onclick = function () {
            win.location.reload();
          };

        },1000);

        //卷轴效果
        var c = document.getElementsByClassName("content-c")[0];
        var wid = 0;
        var speed = 50;
        c.style.width = wid + "%";
        (function () {
          wid += 2;
          c.style.width = wid + "%";
          if (wid < 88) {
            setTimeout(arguments.callee, speed)
          }
        })();

        var txt = document.getElementsByClassName('reel-result')[0];
        var reelTitle = document.getElementsByClassName('reel-title')[0];
        var reelTxt = document.getElementsByClassName('reel-txt')[0];

        //获取解签内容
        var n = Math.floor(Math.random() * config.sticks.length);
        reelTitle.innerHTML = config.sticks[n].title;
        reelTxt.innerHTML = config.sticks[n].content;

        setTimeout(function () {
          $('.reel-result').fadeIn(txt, 20, 100);
        }, 2400);
      }
    }
    ,P = { //公用
      width : win.innerWidth
      ,height : win.innerHeight
      ,_init:function(){
        $.resize(function(){
          P.width = win.innerWidth;
          P.height = win.innerHeight;
          Min.resize();
        })
      }
    };

  Min._init();
  G._init();
  P._init();
})(window);
