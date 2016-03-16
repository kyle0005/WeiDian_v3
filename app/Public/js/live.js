/**
 * Created by Administrator on 2016/3/1 0001.
 */
//tab切换
function tabClick(tabObj, chosenClassName){        //Tab切换选项
  var click_obj  = $(tabObj).find('li');
  var tab_obj = $(tabObj).siblings();
  $(click_obj).click(function(){
    $(click_obj).removeClass(chosenClassName);
    $(this).addClass(chosenClassName);

    var ind = $(this).index();
    $(tab_obj).addClass('hide');
    $(tab_obj).eq(ind).removeClass('hide');
  });
}
tabClick($('.js-live-tab'),'live-cur');

//加减日期天数
$('.js-up-date').click(function () {
  var dateTxt = $('.js-live-date').html();
  var date = addDate(dateTxt, 1);    //天数加一
  $('.js-live-date').html(date);
});
$('.js-down-date').click(function () {
  var dateTxt = $('.js-live-date').html();
  var date = addDate(dateTxt, -1);    //天数加一
  $('.js-live-date').html(date);
});
function addDate(date,days){
  var d=new Date(date);
  d.setDate(d.getDate()+days);
  var month=d.getMonth()+1;
  var day = d.getDate();
  if(month<10){
    month = "0"+month;
  }
  if(day<10){
    day = "0"+day;
  }
  var val = d.getFullYear()+"-"+month+"-"+day;
  return val;
}

//弹窗
$('.js-sub-chat').click(function () {

  JQbox.open({
    type: "open",
    title: "我来聊两句",
    url: 'wei_live_sendMsg.html',
    modal:true
  }) ;

});

//轮播
$('#live-carousel').carousel({ interval: 3000});
//touch事件
var myElement = document.getElementById('live-carousel');

var hammertime = new Hammer(myElement);
hammertime.on('panleft', function(ev) {
  $(myElement).carousel('next');            //将轮播转到下一帧。
});
hammertime.on('panright', function(ev) {
  $(myElement).carousel('prev');            //将轮播转到上一帧。
});

//图片点击全屏显示
var initPhotoSwipeFromDOM = function(gallerySelector) {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for(var i = 0; i < numNodes; i++) {

      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes
      if(figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };



      if(figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if(linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function(el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if(!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if(childNodes[i].nodeType !== 1) {
        continue;
      }

      if(childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }



    if(index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe( index, clickedGallery );
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
      params = {};

    if(hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if(!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if(pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if(params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
      }

    };

    // PhotoSwipe opened from URL
    if(fromURL) {
      if(options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for(var j = 0; j < items.length; j++) {
          if(items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if( isNaN(options.index) ) {
      return;
    }

    if(disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll( gallerySelector );

  for(var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i+1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if(hashData.pid && hashData.gid) {
    openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
  }
};
// execute above function

//直播数据加载
function loadData(data){
  //console.log(data.news.newMessage[0].imgs);

  //live
  if(data.news.newMessage != undefined && data.news.newMessage !== '' && data.news.newMessage != null){
    $.each(data.news.newMessage, function (i, item) {
      var live_data = '<li class="live-li clearfix">'
        + '<div class="js-live-time live-time">'
        + data.news.newMessage[i].create_time
        + '<img src="Public/img/lotus.png"/>'
        + '</div>'
        + '<div class="live-content">'
        + '<div class="js-live-text">'
        + data.news.newMessage[i].content
        + '</div>'
        + '<div class="my-gallery js-media">';

      if(data.news.newMessage[i].imgs != undefined && data.news.newMessage[i].imgs != 0 && data.news.newMessage[i].imgs != '0'){
        $.each(data.news.newMessage[i].imgs, function (i, item) {
          live_data += '<figure>'
            +'<a href="'
            + item
            + '" data-size="1500x800">'
            + '<img src="'
            + item
            + '"/></a>'
            + '</figure>';
        });
      }
      if(data.news.newMessage[i].vod_id != undefined && data.news.newMessage[i].vod_id !== 0 && data.news.newMessage[i].vod_id != '0'){
        live_data += '<div id="'
          + data.news.newMessage[i].vod_id
          + '"></div>';
      }
      live_data += '</div>'
        + '</div>'
        + '</li>';

      init($('.js-live-list'), live_data, data.news.newMessage[i].vod_id);
    });

  }

  //live-top
  if(data.news.stickMessage != undefined && data.news.stickMessage !== '' && data.news.stickMessage != null){
    var live_top = '<div class="ptop">'
                  + data.news.stickMessage.content
                  + '</div>'
                  + '<div class="my-gallery">';
    if(data.news.stickMessage.imgs != undefined && data.news.stickMessage.imgs != 0 && data.news.stickMessage.imgs != '0'){
      $.each(data.news.stickMessage.imgs, function (i, item) {
        live_top += '<figure>'
          +'<a href="'
          + item
          + '" data-size="1500x800">'
          + '<img src="'
          + item
          + '"/></a>'
          + '</figure>';
      });
    }
    if(data.news.stickMessage.vod_id != undefined && data.news.stickMessage.vod_id !== 0 && data.news.stickMessage.vod_id != '0'){
      live_top += '<div id="'
        + data.news.stickMessage.vod_id
        + '"></div>';
    }
    live_top += '</div>';

    init($('.js-stick-msg'), live_top, data.news.stickMessage.vod_id);
  }


}

function init(obj, data, video_id){
  $(obj).append(data);
  initPhotoSwipeFromDOM('.my-gallery');
  console.log(video_id)
  if(video_id != '' && video_id != null && video_id != undefined && video_id != '0' && video_id != 0){
    var option = {
      "auto_play": "0",
      "file_id": "14651978969256407716",
      "app_id": "1251951972",
      "width": 640,
      "height": 480
    }; /*调用播放器进行播放*/
    new qcVideo.Player( /*代码中的id_video_container将会作为播放器放置的容器使用,可自行替换*/ video_id, option);
  }
}
