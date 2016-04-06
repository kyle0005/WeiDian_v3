/**
 * Created by Administrator on 2016/3/1 0001.
 */
//live分页
function livePages(flag) {
  if (configs.news.last_id > 0) {
    var list = $('.js-live-list');
    JQAjax.get(this, {
      url: configs.news.url + '?last_id=' + configs.news.last_id + '&date=' + configs.news.date,
      wait: true,
      callback: function (result) {
        configs.news.last_id = result.lastId;
        if (flag) {
          //滚动分页
          $(list).append(result.html);
          initPhotoSwipeFromDOM('.my-gallery');
        }
        else {
          //日期分页
          $(list).html(result.html);
        }

      }
    });
  }

}
//chat分页
function chatPages() {
  if (configs.chat.last_id > 0) {
    var list = $('.js-chat-list');
    JQAjax.get(this, {
      url: configs.chat.url + '?last_id=' + configs.chat.last_id,
      wait: true,
      callback: function (result) {
        configs.chat.last_id = result.lastId;
        //滚动分页
        $(list).append(result.html);
      }
    });
  }
}

//轮播
$('#live-carousel').carousel({interval: false});
//touch事件
var myElement = document.getElementById('live-carousel');

//图片点击全屏显示
var initPhotoSwipeFromDOM = function (gallerySelector) {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {

      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');
      console.log(linkEl.getAttribute('data-size'));
      size[0] = linkEl.childNodes[0].naturalWidth;
      size[1] = linkEl.childNodes[0].naturalHeight;

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };


      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
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
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
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
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }


    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function (index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      },
      getDoubleTapZoom: function(isMouseClick, item) {

        // isMouseClick          - true if mouse, false if double-tap
        // item                  - slide object that is zoomed, usually current
        // item.initialZoomLevel - initial scale ratio of image
        //                         e.g. if viewport is 700px and image is 1400px,
        //                              initialZoomLevel will be 0.5

        if(isMouseClick) {

          // is mouse click on image or zoom icon
          // zoom to original
          return 1;

          // e.g. for 1400px image:
          // 0.5 - zooms to 700px
          // 2   - zooms to 2800px

        } else {

          // is double-tap

          // zoom to original if initial zoom is less than 0.7x,
          // otherwise to 1.5x, to make sure that double-tap gesture always zooms image
          return item.initialZoomLevel < 0.7 ? 1 : 1.5;
        }
      },
      // Tap on sliding area should close gallery
      tapToClose: true,
      clickToCloseNonZoomable: true

    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
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
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};
// execute above function

//直播数据加载
function loadData(data) {
  //live
  insertLive(data);
  //del
  delData(data);
  //live_top
  insertTop(data);
  //chat
  insertChat(data);

}

function playerVideo(){
  $(document).on('click', '.video-player', function () {
    $('.video-player').show();
    $('.px-video-container').remove();
    //var img_src = $(this).children('img').attr('src');

    var vod_url = $(this).data('url');
    var id =  'v_' + $(this).data('id');
    $(this).hide();

    var player = '<div class="px-video-container text-center" id="'
      + id
      + '">'
      + '<div class="px-video-img-captions-container">'
      + '<div class="px-video-captions hide"></div>'
      + '<video width="608" height="342" poster="'
      //+ img_src
      + '" controls>'
      + '<source src="'
      + vod_url
      + '"/>'
      + '</video>'
      + '</div>'
      + '<div class="px-video-controls"></div>'
      + '</div>';

    $(this).parents('.js-media').append(player);

    //加载播放器
    new InitPxVideo({
      "videoId": id,
      "captionsOnDefault": true,
      "seekInterval": 20,
      "videoTitle": "video",
      "debug": true
    });
    $('#' + id).find('video')[0].play();

  });
}

function insertLive(data) {
  var msg = data.news.newMessage;
  //live
  if (msg != undefined && msg !== '' && msg != null) {
    var live_data = '';
    $.each(msg, function (i, item) {
      live_data = '<li class="live-li clearfix" id="live-' +
        msg[i].id +
        '">' +
        '<div class="live-time"><img src="' +
        configs.img_url +
        '"></div>' +
        '<div class="live-content">' +
        '<div class="pc-live-time">' +
        msg[i].create_time +
        '</div>' +
        '<div class="my-gallery js-media">';

        if (msg[i].imgs != undefined && msg[i].imgs != 0 && msg[i].imgs != '0') {
          $.each(msg[i].imgs, function (i, item) {
            live_data += '<figure>'
              + '<a href="'
              + item
              + '" data-size="800x800">'
              + '<img src="'
              + item
              + '"/></a>'
              + '</figure>';
          });
        }

        if (msg[i].vod !== null && msg[i].vod != undefined && msg[i].vod != '0' &&  msg[i].vod != '') {
          live_data += '<a href="javascript:;" class="video-player" data-url="'
            + msg[i].vod.url
            + '" data-id="'
            + msg[i].id
            + '">'
            + '<img src="'
            + msg[i].vod.cover
            + '"/>'
            + '<img class="video-player-btn" src="'
            + configs.video_player
            + '"/>'
            + '</a>';
        }

      live_data +='</div>' +
         '<div class="js-live-text">' +
          msg[i].content +
          '</div>' +
          '</li>';

      $('.js-live-list').prepend(live_data);
    });
    initPhotoSwipeFromDOM('.my-gallery');

  }
}

function insertTop(data) {
  var msg = data.news.stickMessage;
  //live-top
  if (msg != undefined && msg !== '' && msg != null && msg != false) {
    var live_top = '<div class="ptop" id="stick-'
      + msg.id
      + '">'
      + msg.content
      + '<div class="my-gallery">';
    if (msg.imgs != undefined && msg.imgs != 0 && msg.imgs != '0') {
      $.each(msg.imgs, function (i, item) {
        live_top += '<figure>'
          + '<a href="'
          + item
          + '" data-size="800x800">'
          + '<img src="'
          + item
          + '"/></a>'
          + '</figure>';
      });
    }
    if (msg.vod != null && msg.vod != undefined && msg.vod != '0' && msg.vod != '') {
      live_top += '<a href="javascript:;" class="video-player" data-url="'
        + msg.vod.url
        + '" data-id="'
        + msg.id
        + '">'
        + '<img src="'
        + msg.vod.cover
        + '"/>'
        + '<img class="video-player-btn" src="'
        + configs.video_player
        + '"/>'
        + '</a>';
    }
    live_top += '</div></div>';
    $('.js-stick-msg').html(live_top);
    initPhotoSwipeFromDOM('.my-gallery');
  }
}

function insertChat(data) {
  var msg = data.chats.newMessage;
  var chats_data = '';
  //chat
  if (msg != undefined && msg !== '' && msg != null && msg != false) {
    $.each(msg, function (i, item) {
      //回复数据
      chats_data += '<li class="is-reply relative" onclick="javascript:;" id="chat-' +
        msg[i].id + '-' + (msg[i].reply_id > 0 ? msg[i].reply_id : 0) +
        '" data-id="' +
        msg[i].id +
        '">' +
        '<div class="chat-content color-666">' +
        '<a href="javascript:;" class="chat-img">' +
        '<img src="' +
        msg[i].avatar +
        '">' +
        '</a>' +
        '<span>' +
        msg[i].username +
        '</span>' +
        '<span class="pull-right color-999">' +
        msg[i].create_time +
        '</span>' +
        '<p class="chat-p color-333">' +
        msg[i].content +
        '</p>' +
        '<a href="javascript:;" class="reply-btn"><i class="icon-comments"></i>&ensp;回复</a>' +
        '</div>';

      if(msg[i].reply != undefined) {
        chats_data += '<div class="chat-reply">' +
          '<div class="reply-i text-center"><i class="color-b08654 icon-mail-reply icon-rotate-180"></i></div>' +
          '<div class="reply-content color-666">' +
          '<a href="javascript:;" class="chat-img">' +
          '<img src="' +
          msg[i].reply.avatar +
          '">' +
          '</a>' +
          '<span>' +
          msg[i].reply.username +
          '</span>' +
          '<span class="pull-right color-999">' +
          msg[i].reply.create_time +
          '</span>' +
          '<p class="reply-p color-333">' +
          msg[i].reply.content +
          '</p>' +
          '</div>' +
          '</div>';
      }
      chats_data += '</li>';
    });
    $('.js-chat-list').prepend(chats_data);
  }

}

function delData(data) {
  var delMsg = data.news.delMessage;
  if (delMsg != false) {
    $.each(delMsg, function (i, con) {
      var obj = $('#live-' + delMsg[i].id);
      if($('#stick-' + delMsg[i].id).length > 0){
        $('#stick-' + delMsg[i].id).remove();
        $(obj).show();
      }else{
          if(data.newsStickId == delMsg[i].id){
            $(obj).hide();
          }else{
            if($(obj).isHidden){
              $(obj).show();
            }else{
              $(obj).remove();
            }
          }
      }
    });
  }

  var delChats = data.chats.delMessage;
  if (delChats != false) {
    var _reId = 0;
    $.each(delChats, function (j, item) {
      _reId = delChats[j].reply_id > 0 ? delChats[j].reply_id : 0;
        //删除回复内容
      $('#chat-' + delChats[j].id + '-' + _reId).remove();

    });
  }

}
