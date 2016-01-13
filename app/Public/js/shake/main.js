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
      ,_init : function(){
        Min.bg = $('.mainbg');
        //Min.btn = Min.bg.find('.btn')   //点击事件
        Min.resize();
        //Min.btn.click(Min.start);
        //setTimeout(Min.start,10000);

        var SHAKE_THRESHOLD = 1000;
        // 定义一个变量保存上次更新的时间
        var last_update = 0;
        // 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
        var x;
        var y;
        var z;
        var last_x;
        var last_y;
        var last_z;

        // 为了增加这个例子的一点无聊趣味性，增加一个计数器
        var count = 0;

        function deviceMotionHandler(eventData) {
          // 获取含重力的加速度
          var acceleration = eventData.accelerationIncludingGravity;

          // 获取当前时间
          var curTime = new Date().getTime();
          var diffTime = curTime -last_update;
          // 固定时间段
          if (diffTime > 100) {
            last_update = curTime;

            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;

            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

            if (speed > SHAKE_THRESHOLD) {
              setTimeout(function(){
                Min.start();
                $.removeHandler(win, "devicemotion", deviceMotionHandler);
              },300);
            }

            last_x = x;
            last_y = y;
            last_z = z;
          }
        }

        //$.addHandler(win, "devicemotion", deviceMotionHandler);//摇一摇暂时去掉

        Min.start();

      }
      ,resize : function(){
        var  _v = P.width/Min.w
          ,_h = _v*Min.h;
        //Min.bg.css({h:_h})
      }
      ,start : function(){
        body.css({overflowY:'hidden'})
        G.start();
      }
      ,restart : function(){
        body.css({overflowY:'auto'})
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
          , 'page-tk.html'
          , 'page-tpcz.html'
          , 'page-wdyl.html'
          , 'page-zt.html'
          //, 'page-gr.html'
          //, 'page-tl.html'
          //, 'page-tchg.html'
        ];
        //var wei = 'http://mp.weixin.qq.com/s?__biz=MzAwOTI0MTUxMA==&mid=20664'
        //G.page = [
        //	 wei+'4436&idx=1&sn=e8f570f9b156317482b40280405410bc'
        //	,wei+'4490&idx=1&sn=fad4aac9d709f6ba8ba8f1802ccc93f4'
        //	,wei+'4541&idx=1&sn=07ae64e7f38736e6f207f1d8ab291196'
        //	,wei+'4577&idx=1&sn=9ad3f4f8905a205a82d10a3fac1480a6'
        //	,wei+'4628&idx=1&sn=e4622eb14053984017b35f6235752e8b'
        //	,wei+'4762&idx=1&sn=d253bc41d250a2c4109e6ebf56a4b70d'
        //	,wei+'4820&idx=1&sn=36bc163f83a135b39532a03e808a6788'
        //	,wei+'4889&idx=1&sn=0e6aa572bc35a77534a40d10e191dddc'
        //	,wei+'4920&idx=1&sn=2d125028db3462f55250d3f79d7c6a47'
        //	,wei+'4941&idx=1&sn=d506e7ddd08d2ba7f78cf1fd810e2870'
        //	,wei+'4977&idx=1&sn=0343b2478eba457bef1ae35f6e4bc539'
        //	,wei+'5004&idx=1&sn=c91a81e0d3b223669dfd95c5eb1b6ab0'
        //]
      }
      ,start : function(){
        G.bg.css3({display:'box'},true)
        var num = 1 , n = 0 , _time;
        (function v(){
          num++;
          n++;
          if(n<11){
            if(num>5)num=1;
            G.icon[0].className = '';
            G.icon.addClass('i-bg'+num);
            setTimeout(v,300)
          }else{
            G.end();
          }
        })();
      }
      ,end : function(){
        G.one.css({dis:0});
        G.two.css({dis:1});

        var n = Math.floor(Math.random() * G.num)+1
        setTimeout(function(){
          var arr = [];
          arr.push(n + '');
          $.local.set('gameNum', JSON.stringify(arr));
          //win.location.href = G.page[n-1]; //跳转解签页面 暂时去掉

          var end = document.getElementsByClassName('end')[0];
          G.two.fadeOut(end, 20, 0);
          var content = document.getElementsByClassName('content')[0];
          setTimeout(function () {
            $('.content').fadeIn(content, 20, 100);
          }, 800);

        },700);
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
