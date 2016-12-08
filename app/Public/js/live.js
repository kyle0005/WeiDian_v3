/**
 * Created by Administrator on 2016/3/1 0001.
 */
!(function ($, Hammer) {
  initPhotoSwipeFromDOM('.my-gallery');

  var logo_contanier = $('#logo-container');
  if(configs.live_url != undefined && configs.live_url != '' && configs.live_url != null ){
    //如果有直播
    var live_html = '<a href="javascript:;" class="live-btn">' +
      '<img src="' +
      configs.play_btn +
      '" class="play-btn">' +
      '<img src="' +
      configs.banner_img +
      '"/>' +
      '</a>';
    $(logo_contanier).append(live_html);
    $(document).on('click', '.live-btn', function () {
      $(logo_contanier).empty();
      vodLive(configs.live_url);
    });
  }else {
    //没有直播
    var nolive = '<img src="' +
      configs.banner_img +
      '"/>';
    $(logo_contanier).append(nolive);
  }

  $(window).scroll(function () {
    if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
      configs.tab == true ? livePages(true) : chatPages();
    }

    /* 滚动news改变时间 */
    var _vartop = $('.js-live-list').offset().top;
    var _varscroll = parseInt($(document).scrollTop());
    if(_varscroll > _vartop){
      var _dateTop = parseFloat($('.live-date').offset().top);
      var _tops = [];
      $.each($('.live-li:visible'), function (i, item) {
        var dat = parseFloat($(this).offset().top + $(this).height()/2 - (_dateTop + $('.live-date').height()/2));
        _tops[i] = Math.abs(dat);
      });
      var _index = _tops.indexOf(Math.min.apply(null, _tops));
      var lis = $('.live-li:visible');
      var _li = lis[_index];
      if($(_li).data('iscurrent') == 1 && $(_li).data('currentdate') != $('.live-date').html()){
        $('.live-date').html($(_li).data('currentdate'));
        if($(_li).prev() != undefined){
          $(_li).prev().data('iscurrent', '1');
        }
      }
    }

  });

  //轮播
  if($('#live-carousel').length > 0){
    $('#live-carousel').carousel({interval: false});
//touch事件
    var myElement = document.getElementById('live-carousel');

    var hammertime = new Hammer(myElement);
    hammertime.on('panleft', function (ev) {
      $(myElement).carousel('next');            //将轮播转到下一帧。
    });
    hammertime.on('panright', function (ev) {
      $(myElement).carousel('prev');            //将轮播转到上一帧。
    });
  }


  //点击蒙层处或者叉滑出
  $('.js-mask, .js-x, .js-cac, .js-sen').click(function () {
    $('.pop-up').height('0');
    setTimeout(function () {
      $('#popUpWrap').addClass('none');
    }, 600);

  });

  initHtml();
  _lazyLoad();
  $('.js-live-tab').stickUp();
  $('.live-date').stickUp({
    topMargin: 42
  });
  var til = $('.main-title-con').height();
  tabClick($('.js-live-tab'), 'live-cur', til);

})(jQuery, Hammer);

//tab切换
function tabClick(tabObj, chosenClassName, til) {        //Tab切换选项
  var click_obj = $(tabObj).find('li');
  var tab_obj = $(document).find('.tab-ops');
  var top = 0;
  $(click_obj).click(function () {
    top = 0;
    top += til;
    if($('.nav-wrap').length >= 1){
      top += 44;
    }

    if( $(document).scrollTop() >= top){
      //$('html, body').animate({scrollTop: top}, 'slow');
      window.scrollTo(0, top);
    }

    $.getScript(configs.base_path+'js/stick.multi.js',function(){
      $('.live-date-container').empty();
      initHtml();
      $('.live-date').stickUp({
        topMargin: 42
      });
    });

    $(click_obj).removeClass(chosenClassName);
    $(this).addClass(chosenClassName);
    var ind = $(this).index();
    $(tab_obj).addClass('hide');

    var _id = $(this).attr('id');
    $('#' + _id + '_tab').removeClass('hide');
    ind == 0 ? configs.tab = true : configs.tab = false;
  });
}
function initHtml(){
  var str = '<div class="live-date" data-currentdate="' +
    configs.news.current_date +
    '">' +
    configs.news.current_date +
    '</div>';
  $('.live-date-container').append(str);
}
//live分页
function livePages(flag) {
  if (configs.news.last_id > 0) {
    var list = $('.js-live-list');
    JQAjax.get(this, {
      url: configs.news.url + '?last_id=' + configs.news.last_id + '&current_date=' + configs.news.current_date,
      callback: function (result) {
        configs.news.last_id = result.lastId;
        if (flag) {
          //滚动分页
          $(list).append(result.html);
          initPhotoSwipeFromDOM('.my-gallery');
        }
        else {
          //日期分页
          configs.news.current_date = result.currentDate;
          $(list).html(result.html);
        }
        _lazyLoad();
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
function initPhotoSwipeFromDOM (gallerySelector) {
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

      //size = linkEl.getAttribute('data-size').split('x');
      //size[0] = linkEl.childNodes[0].naturalWidth;
      //size[1] = linkEl.childNodes[0].naturalHeight;

      var img_size = linkEl.getAttribute('href').split('?size=');
      size = img_size[1].split('x');

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
      // Tap on sliding area should close gallery
      tapToClose: true

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
function _lazyLoad() {
    $("img.lazy").lazyload({
      appear: function () {
        //图片加载时
        $(this).addClass('lazy-container');
      },
      load: function () {
        //图片加载后
        $(this).removeClass('lazy-container');
      },
      event:'scroll',
      placeholder: "Public/img/loading_bg.png"
    });

    $("video.lazy").lazyload({
      event:'scroll'
    });

    $(window).bind("load", function() {
      var timeout = setTimeout(function() {
        $("img.lazy").trigger("scroll");         //触发scroll事件
        $("video.lazy").trigger("scroll");
      }, 0);
    });
}
function vodLive(live_url){
  var wid = $(document).width();
  //live
  var PLAY_INFO = (function(){
    var ps = (window.location.href.split('?')[1] || '').split('&')
      , opt = {
        "channel_id": live_url,
        "app_id": configs.app_id,
        "width": 0,
        "height": 0,
        "https":0
      }
      , i1 = 0 , i2 = ps.length, i3, i4
      ;
    for (; i1 < i2; i1++) {
      i3 = ps[i1];
      i4 = i3.split('=');
      if(i4[0] == '$app_id' || i4[0] == 'app_id'){
        opt.app_id = i4[1];
      } else if(i4[0] == '$channel_id' || i4[0] == 'channel_id'){
        opt.channel_id = i4[1];
      } else if(i4[0] == '$sw' || i4[0] == 'sw'){
        opt.width = i4[1];
      } else if(i4[0] == '$sh' || i4[0] == 'sh'){
        opt.height = i4[1];
      } else if(i4[0] == 'cache_time'){
        opt.cache_time = i4[1];
      } else if(i4[0] == 'https'){
        opt.https = i4[1];
      }
    }

    return opt;
  })();
  (function () {
    new qcVideo.Player("id_video_container", {
      "channel_id": live_url,
      "app_id": configs.app_id,
      "width": wid,
      "height": 244,
      "https": 0
    });

  })();
}
