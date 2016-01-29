$(function(){
    mui.screen.init();

    //去规则页面
    //document.getElementById("btn_rule").addEventListener("touchstart",function(){
    //    location = "rule.html"+location.search;
    //});
    //document.getElementById("btn_rule").addEventListener("click",function(){
    //    location = "rule.html"+location.search;
    //});

    //点击开始抽奖
    document.getElementById("btn_start").addEventListener("touchstart",getLotteryResult);
    document.getElementById("btn_start").addEventListener("click",getLotteryResult);

    //点击确定
    document.getElementById("btn-winning-ok").addEventListener("touchstart",doOK);
    document.getElementById("btn-visited-ok").addEventListener("touchstart",doOK);
    document.getElementById("btn-winning-ok").addEventListener("click",doOK);
    document.getElementById("btn-visited-ok").addEventListener("click",doOK);
    setTimeout(function(){
        mui.load.hide();
        mui.screen.initImgLoction();
    },1500);

});

var page = {
    gameOver:false,
    isStart:false,
    baseNUm:72,
    pointAngle: 0,
    angleCount:0,
    prizes:[
        {name:'新年快乐',angle:{"min":-36,"max":36},msg:'新年快乐',msg2:'新年快乐'},
        {name:'20元',angle:{"min":36,"max":108},msg:'抽中20元 无条件抽中20元无条件抽中20元无条件抽中20元无条件',msg2:'获得20元 无条件'},
        {name:'100元',angle:{"min":108,"max":180},msg:'抽中100元 满200使用抽中100元 满200使用抽中100元 满200使用抽中100元 满200使用',msg2:'获得100元 满200使用'},
        {name:'200元',angle:{"min":180,"max":252},msg:'抽中200元 满500使用抽中200元 满500使用抽中200元 满500使用抽中200元 满500使用',msg2:'获得200元 满500使用'},
        {name:'500元',angle:{"min":252,"max":324},msg:'抽中500元 满1000使用抽中500元 满1000使用抽中500元 满1000使用抽中500元 满1000使用',msg2:'获得500元 满1000使用'},
    ],
};


var index = {
  num: Math.floor(Math.random()*5),
  code: "asasdasasd"
};

//点击抽奖
function getLotteryResult(){
	if(page.isStart){
		return;
	}
	page.isStart = true;

    var prizeId = award.num,
      prizeId = 1,
        rounds = Math.floor(Math.random()*4)+4;
    page.pointAngle = (360 - page.angleCount % 360) + 360*rounds - ( Math.floor(Math.random()*page.baseNUm) + page.prizes[prizeId].angle.min);

    page.angleCount += page.pointAngle;
    //console.log("rounds:"+page.angleCount+ "++" +"page.pointAngle:"+page.pointAngle + "++" + "prizeId:"+prizeId);

    $("#prize").transition({
        rotate: '+='+page.pointAngle,
        duration: 3000,
        easing: 'easeOutSine',
        complete: function(){
            showResult(page.prizes[prizeId].msg,1);
        },
    });
}

//点击确定
function doOK(){
    $("#visited").transition({
        scale: 0,
        duration: 500,
        easing: 'easeOutSine',
        complete:function(){
        	page.isStart = false;
        }
    });
    showResult("",0);
}

function showResult(msg,scale){

    if (msg != '') {
        $.post(page.url, {code: award.code}, function (data) {
            if (data) {
                if (data.message) {
                    //错误信息
                  popUp(data.message,scale, true);

                } else {
                    award.num = data.num;
                    award.code = data.code;
                }
            }
        }, 'json');
    }

  popUp(msg,scale);
}

function popUp(msg,scale, flag){
  $(".js-win").hide();
  $(".js-win-sorry").show();
  //if(flag){
  //  $(".js-win").hide();
  //  $(".js-win-sorry").show();
  //}else{
  //  $(".js-win").show();
  //  $(".js-win-sorry").hide();
  //}

  //$("#winning-text").html(msg);
  $("#winning").transition({
    scale: scale,
    duration: 500,
    easing: 'easeOutSine',
    complete:function(){
      if(scale == 0){
        page.isStart = false;
      }
    }
  });
}

var mui = {
    screen:{
        //  ui长宽    720*1280
        screenWidth:0, //屏幕宽度
        srceenHeight:0,//屏幕高度
        imgWidth:720, //效果图宽度
        imgHeight:1280,//效果图高度
        pageWidth:0, //显示实际高度
        pageHeight:0,//显示实际宽度
        init:function(){//初始化页面数据
            mui.screen.screenWidth = $(window).width();
            mui.screen.screenHeight = $(window).height();

            var imgBili =  mui.screen.imgWidth/mui.screen.imgHeight,
                screenBili = mui.screen.screenWidth/mui.screen.screenHeight;
            if(imgBili > screenBili){
                //console.log("imgBili > screenBili");
                mui.screen.pageWidth = mui.screen.screenWidth;
                mui.screen.pageHeight =  mui.screen.screenWidth/imgBili;
            }else if(imgBili == screenBili){
                //console.log("imgBili == screenBili");
                mui.screen.pageWidth = mui.screen.screenWidth;
                mui.screen.pageHeight =  mui.screen.screenHeight;
            }else if(imgBili < screenBili){
                //console.log("imgBili < screenBili");
                mui.screen.pageWidth = mui.screen.screenHeight*imgBili;
                mui.screen.pageHeight =  mui.screen.screenHeight;
            }
        },
        initImgLoction:function(){//初始化图片的位置
            var width = mui.screen.pageWidth,
                height = mui.screen.pageHeight;
            $("#page").css({'width':width+"px",'height':height+"px",
                'margin-left':-width/2+'px','margin-top':-height/2+'px'
            });

            //背景
            $("#bg").css({'width':mui.screen.screenWidth+"px",'height':mui.screen.screenHeight+"px",'display':'block'});

            //回退键
            /*var backTop = height*78/mui.screen.imgHeight,
                backHeight = height*42/mui.screen.imgHeight,
                backLeft = width*29/mui.screen.imgWidth;
            $("#back").css({"top":backTop+"px",'left':backLeft+"px",
                'height':backHeight+"px",'display':'block'});*/

            //title
           /* var titleTop = height*78/mui.screen.imgHeight,
                titleHeight = height*45 /mui.screen.imgHeight;
            $("#title").css({"top":titleTop+"px",'line-height':titleHeight+"px",
                'font-size':titleHeight-2+"px",
                'height':titleHeight+"px",'display':'block'});*/

            //活动规则
            //var ruleTop = height*0/mui.screen.imgHeight,
            //    ruleRight = width*12/mui.screen.imgWidth,
            //    ruleHeight = height*85/mui.screen.imgHeight;
            //$("#rule").css({"top":ruleTop+"px",'right':ruleRight+"px",
            //    'height':ruleHeight+"px",'display':'block'});

            //tip1 职工e家 火热上线
            var tip1Top = height*77/mui.screen.imgHeight,
                tip1Height = height*257/mui.screen.imgHeight;
            $("#tip1").css({"top":tip1Top+"px",
                'height':tip1Height+"px",'display':'block'});

            //tip2 抽奖抽不停
            //var tip2Top = height*148/mui.screen.imgHeight,
            //    tip2Height = height*110/mui.screen.imgHeight;
            //$("#tip2").css({"top":tip2Top+"px",
            //    'height':tip2Height+"px",'display':'block'});

            //rbg  转盘的合并
            var centerPointX = width/2,
                centerPointY = height*700/mui.screen.imgHeight;
            //底下的红色圆环
            var redWidth = width*544/mui.screen.imgWidth,
                redHeight = height*544/mui.screen.imgHeight;
            $("#red").css({"left":centerPointX-redWidth/2+"px",
                "top":centerPointY-redHeight/2+"px",
                "width":redWidth+"px",'height':redHeight+"px",'display':'block'});
            //显示奖品的圆环
            var prizeWidth = width*475/mui.screen.imgWidth,
                prizeHeight = height*475/mui.screen.imgHeight;
            $("#prize").css({"left":centerPointX-prizeWidth/2+"px",
                "top":centerPointY-prizeHeight/2+"px",
                "width":prizeWidth+"px",'height':prizeHeight+"px",'display':'block'});
            //圆盘的指针
            var pointWidth = width*213/mui.screen.imgWidth,
                pointHeight = height*211/mui.screen.imgHeight;
            $("#point").css({"left":centerPointX-pointWidth/2+"px",
                "top":centerPointY-pointHeight/2+"px",
                "width":pointWidth+"px",'height':pointHeight+"px",'display':'block'});

            //幸运榜
            var  luckBottom = height*50/mui.screen.imgHeight,
                luckLeft = width*49/mui.screen.imgWidth,
                luckHeight = height*205/mui.screen.imgHeight,
                luckWidth = width*624/mui.screen.imgWidth;
            $("#luck").css({
                "bottom":luckBottom+"px",
                "width":width+"px",
                //'height':luckHeight+"px",
                'display':'block'
                });


            //字体适应
            var luckLineHeight = height*45/mui.screen.imgHeight,
                luckPaddingHor = width*25/mui.screen.imgWidth;
            $("#luck").css({
                "line-height":luckLineHeight+"px",
            });



            //今天你已经参与过活动了
            $("#visited-shadow").css({'display':'block'});
            var visitedBackWidth = width*550/mui.screen.imgWidth,
                visitedBackHeight = height*670/mui.screen.imgHeight,
                visitedBackLeft = mui.screen.screenWidth/2-visitedBackWidth/2,//width*85/mui.screen.imgWidth,
                visitedBackTop = mui.screen.screenHeight/2-visitedBackHeight/2;//height*305/mui.screen.imgHeight;
            $("#visited-back").css({"left":visitedBackLeft+"px","top":visitedBackTop+"px",
                "width":visitedBackWidth+"px",'height':visitedBackHeight+"px",'display':'block'});
            var visitedOkWidth = width*280/mui.screen.imgWidth,
                visitedOkHeight = height*80/mui.screen.imgHeight,
                visitedOkLeft = mui.screen.screenWidth/2-visitedOkWidth/2,//width*225/mui.screen.imgWidth,
                visitedOkTop = visitedBackTop + visitedBackHeight*534/670;//height*837/mui.screen.imgHeight;
            $("#visited-ok").css({"left":visitedOkLeft+"px","top":visitedOkTop+"px",
                "width":visitedOkWidth+"px",'height':visitedOkHeight+"px",'display':'block'});

            //今天你已经参与过活动了
            $("#winning-shadow").css({'display':'block'});
            var winBackWidth = width*660/mui.screen.imgWidth,
                winBackHeight = height*700/mui.screen.imgHeight,
                winBackLeft =mui.screen.screenWidth/2 - winBackWidth/2, //width*30/mui.screen.imgWidth,
                winBackTop = mui.screen.screenHeight/2 - winBackHeight/2;//height*290/mui.screen.imgHeight;
            $("#winning-back").css({"left":winBackLeft+"px","top":winBackTop+"px",
                "width":winBackWidth+"px",'height':winBackHeight+"px",'display':'block'});
            var winTextHeight = height*50/mui.screen.imgHeight,
                winTextTop = height*625/mui.screen.imgHeight;
            $("#winning-text").css({"top":winTextTop+"px",
                'font-size':winTextHeight-5+"px",'display':'block'});
            var winOkWidth = width*280/mui.screen.imgWidth,
                winOkHeight = height*80/mui.screen.imgHeight,
                winOkLeft = mui.screen.screenWidth/2-winOkWidth/2,//width*225/mui.screen.imgWidth,
                winOkTop = winBackTop+winBackHeight*560/700;//height*858/mui.screen.imgHeight;
            $("#winning-ok").css({"left":winOkLeft+"px","top":winOkTop+"px",
                "width":winOkWidth+"px",'height':winOkHeight+"px",'display':'block'});
            $("#visited").css({ scale: 0});
            $("#winning").css({ scale: 0});
        },
    },
    load:{
        hide:function(){
            $("#loading").css("display",'none');
        },
    }
};
