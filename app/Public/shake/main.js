/**
 * Created by Administrator on 2016/1/12 0012.
 */
(function( win ){
  var body = $('body')
    ,L = {//进度条
      bg : function(){

      }
    }
    ,I = {
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
        obj.src = 'Public/js/shake/mainbg.jpg';
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
      ,down : function(){

      }
    }
    ,Min = { //首页
      w : 480
      ,h : 853  // w , h 为图片比列
      ,flag: false
      ,_init : function(){
        Min.bg = $('.mainbg');
        //Min.btn = Min.bg.find('.btn')   //点击事件
        Min.resize();

        //摇一摇
        shake.init();

        //shake.shakeFlag = true;
        //Min.start();
      }
      ,resize : function(){
        var  _v = P.width/Min.w
          ,_h = _v*Min.h;
        //Min.bg.css({h:_h})
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

                //// 获取含重力的加速度
                //var acceleration = event.accelerationIncludingGravity;
                //
                //// 获取当前时间
                //var cTime = new Date().getTime();
                //var diffTime = cTime -shake.last_update;
                //// 固定时间段
                //if (diffTime > 150) {
                //  shake.last_update = cTime;
                //
                //  shake.x = acceleration.x;
                //  shake.y = acceleration.y;
                //  shake.z = acceleration.z;
                //
                //  var speed = Math.abs(shake.x + shake.y + shake.z - shake.lastX - shake.lastY - shake.lastZ) / diffTime * 10000;
                //
                //  shake.liTime = new Date().getTime();
                //  if (speed > shake.SHAKE_THRESHOLD) {
                //    shake.curTime = 0;
                //
                //    setTimeout(function(){
                //      shake.shakeFlag = true;
                //      Min.start();
                //    },100);
                //  }
                //
                //  if(Math.abs(shake.x-shake.lastX) > shake.speed || Math.abs(shake.y-shake.lastY) > shake.speed) {
                //    shake.curTime = new Date().getTime();
                //    shake.liTime = shake.curTime;
                //  }
                //
                //  shake.lastX = shake.x;
                //  shake.lastY = shake.y;
                //  shake.lastZ = shake.z;
                //}


          }

      }
    ,G = { //开始游戏
      bg : $('.game')
      ,one : $('.game .qian')
      ,two : $('.game .end')
      ,icon : $('.game .qian i')
      ,num : 9
      ,_init : function(){
        G.page = [
          'page-dxzq.html'
          , 'page-hjfs.html'
          , 'page-kssz.html'
          , 'page-qxph.html'
          , 'page-slb.html'
        ];
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
          else{
              //window.removeEventListener('devicemotion',shake.deviceMotionHandler,false);
              //G.end();

              }

        })();
      }
      ,end : function(){
        G.one.css({dis:0});
        G.two.css({dis:1});

        var n = Math.floor(Math.random() * G.num)+1

          //win.location.href = G.page[n-1]; //跳转解签页面 暂时去掉

          var end = document.getElementsByClassName('end')[0];
          setTimeout(function () {
            G.two.fadeOut(end, 20, 0);
          }, 500);

          var content = document.getElementsByClassName('content')[0];
          setTimeout(function () {
            $('.content').fadeIn(content, 20, 100);
          }, 1000);
        setTimeout(function(){
          var arr = [];
          arr.push(n + '');
          $.local.set('gameNum', JSON.stringify(arr));
          $('.js-again').click(function () {
            win.location.reload();
          });

        },1000);


        //卷轴效果
        var c = document.getElementsByClassName("content-c")[0];
        var wid = 0;
        var speed = 60;
        c.style.width = wid + "%";
        (function () {
          wid += 2;
          c.style.width = wid + "%";
          if (wid < 88) {
            setTimeout(arguments.callee, speed)
          }
        })();


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
