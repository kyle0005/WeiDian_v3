/**
 * Created by Administrator on 2016/1/12 0012.
 */
(function(win) {
  function k(a, c) {
    do a = a[c]; while (a && 1 !== a.nodeType);
    return a;
  }
  var doc = document, m = [].concat, i = {
    extend: function(a, c) {
      for (var d in c) a[d] = c[d];
      return a;
    },
    browser: function() {
      var a = navigator.userAgent.toLowerCase(), c = navigator.vendor, d = /webkit|khtml/.test(a);
      return {
        isSafari: d && -1 < c.indexOf("Apple") && -1 < a.indexOf("safari"),
        isUc: d && -1 < a.indexOf("uc"),
        isAndroid: -1 < a.indexOf("android"),
        isIphone: -1 < a.indexOf("iphone"),
        isIpad: -1 < a.indexOf("ipad"),
        weixin : a.match(/MicroMessenger/i)=="micromessenger"
      };
    },
    Sizzle: function(a, c, d) {
      var e = [], g = e.push, e = e.slice;
      try {
        return g.apply(d, e.call(c.querySelectorAll(a), 0)), d;
      } catch (f) {
        return d;
      }
    }
  };
  win.$ = function(a) {
    return new $.fn.init(a);
  };
  i.extend($, {
    url: "",
    extend: i.extend,
    browser: i.browser(),
    addHandler: function(a, c, d, e) {
      if ($.browser.isIphone || $.browser.isAndroid) c = {
          mousedown: "touchstart",
          mouseup: "touchend",
          mousemove: "touchmove"
        }[c] || c;

      //a[!0 === e ? "removeEventListener" : "addEventListener"](c, d, !1);

      if(!0 === e){
        removeEventListener(c, d, !1);
      }else{
        addEventListener(c, d, !1);
      }
    },
    removeHandler: function(a, c, d, e) {
      if ($.browser.isIphone || $.browser.isAndroid) c = {
          mousedown: "touchstart",
          mouseup: "touchend",
          mousemove: "touchmove"
        }[c] || c;

      //a[!0 === e ? "removeEventListener" : "addEventListener"](c, d, !1);

      if(!0 === e){
        removeEventListener(c, d, !1);
      }else{
        addEventListener(c, d, !1);
      }
    },
    getEvent: function(a, c, d) {
      a = a || window.event;
      c || a.stopPropagation();
      d || a.preventDefault();
      return a = a.touches ? a.touches[0] : a;
    },
    ready: function(a) {
      $(window).addHandler("DOMContentLoaded", a);
      //document.readyState === "complete" //DOMContentLoaded
      //document.addEventListener( "DOMContentLoaded", completed, false );
    },
    resize: function(a) {
      win.onresize = a;
      $.addHandler(win, "orientationchange", a);
    },
    dir: function(a, c) {
      for (var d = [], e = a[c]; e && 9 !== e.nodeType; ) 1 === e.nodeType && d.push(e),
        e = e[c];
      return d;
    }
    ,local : {
      set : function( _key , _val ){
        win.localStorage.setItem( _key , _val )
      }
      ,get : function( _val ){
        return win.localStorage.getItem(_val);
      }
      ,remove : function( _val  ){
        win.localStorage.removeItem(_val)
      }
    },
    create: function(a) {
      return $(doc.createElement(a));
    },
    each: function(a, c, d) {
      if (a) {
        if ("array" == $.type(a)){
          for (var e = 0, g = a.length, f; e < g && !(f = a[e], !1 === c.call(d || f, e , f)); e++) ;
        } else{
          for (e in a) if (f = a[e], !1 === c.call( d || f, e , f)) break;
        }
        return a;
      }
    },
    map: function(a, c) {
      var d, e = 0, g = a.length, f = [];
      if ("array" == $.type(a)){
        for (;e < g; e++){
          d = c(a[e], e), null != d && (f[f.length] = d);
        }
      } else for (e in a) d = c(a[e], e),
      null != d && (f[f.length] = d);
      return m.apply([], f);
    },
    sibling: function( n, elem ) {
      var r = [];
      for ( ; n; n = n.nextSibling ) {
        if ( n.nodeType === 1 && n !== elem ) {
          r.push( n );
        }
      }
      return r;
    },
    merge: function(a, c) {
      var d = c.length, e = a.length, g = 0;
      if ("number" === typeof d) for (;g < d; g++) a[e++] = c[g]; else for (;void 0 !== c[g]; ) a[e++] = c[g++];
      a.length = e;
      return a;
    },
    type: function(a) {
      return null == a ? "" + a : a.init ? "array" : Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
    },
    css: function(a, c) {
      if (a) {
        var d, e = a.style, g, f;
        for (f in c) switch (d = c[f], g = isNaN(d) ? d : d + "px", f) {
          case "l":
            e.left = g;
            break;

          case "t":
            e.top = g;
            break;

          case "w":
            e.width = g;
            break;

          case "h":
            e.height = g;
            break;

          case "c":
            e.color = d;
            break;

          case "bg":
            e.background = d;
            break;

          case "dis":
            e.display = 0 == d ? "none" : 1 == d ? "block" : d;
            break;

          default:
            e[f] = d;
        }
      }
    },
    css3: function(a, c, d) {
      var e = !0, g = !1;
      if (d) $.each([ "-webkit-", "-moz-", "-o-", "-ms-" ], function( i ,d) {
        for (var e in c) a.style[e.toLowerCase()] = d + c[e];
      }); else if ($.each([ "Webkit", "O", "Moz", "Ms" ], function( i ,v) {
          for (var f in c){
            v + f in a.style && (a.style[v + f] = c[f], e = !1, g = !0);
          }
        }), e) {
        var d = d = "", f;
        for (f in c) d = f.match(/\w/), d = d.toString().toLowerCase() + f.slice(1), d in a.style && (a.style[d] = c[f],
          g = !0);
      }
      return g;
    },
    js: function(a, c) {
      var a = "string" == typeof a ? [ a ] : a, d = doc.head;
      $.each(a, function(a) {
        var g = doc.createElement("script");
        g.src = $.url + this;
        g.onload = function() {
          c(a);
        };
        d.insertBefore(g, d.firstChild);
      });
    }
    ,ajax : function( _fn , _src , _type ) {
      _type = _type || 'get'
      //先声明一个异步请求对象
      var xmlHttpReg = new XMLHttpRequest(); //实例化一个xmlHttpReg
      //如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
      if ( void 0 != xmlHttpReg ){
        xmlHttpReg.open(_type, _src, true);
        xmlHttpReg.send(null);
        xmlHttpReg.onreadystatechange = doResult; //设置回调函数
      }
      //回调函数
      //一旦readyState的值改变,将会调用这个函数,readyState=4表示完成相应

      //设定函数doResult()
      function doResult() {
        if (xmlHttpReg.readyState == 4) {//4代表执行完成
          if (xmlHttpReg.status == 200) {//200代表执行成功
            //将xmlHttpReg.responseText的值赋给ID为resText的元素
            _fn( xmlHttpReg.responseText)
          }
        }
      }
    }
    ,SetOpacity: function (ele, opacity) {
    if (ele.style.opacity != undefined) {
      ///兼容FF和GG和新版本IE
      ele.style.opacity = opacity / 100;

    } else {
      ///兼容老版本ie
      ele.style.filter = "alpha(opacity=" + opacity + ")";
    }
  }
  });
  $.fn = $.prototype = {
    length: 0,
    init: function(a) {
      if (void 0 != a) {
        var c = $.type(a);
        if ("string" === c){
          if ( a.charAt(0) === "<" && a.charAt( a.length - 1 ) === ">" && a.length >= 3 ) {
            var _div = doc.createElement('div')
            _div.innerHTML = a;
            return this.pushStack($.sibling(_div.firstChild));
          }
          return l.find(a);
        }
        if (a.nodeType || a === window || "array" == c && !a.attr) return this[0] = a, this.length = 1,
          this;
        if ("function" == c) return $.ready(a);
        if ("array" == c) return a;
      }
    },
    pushStack: function(a) {
      return $.merge($(), a);
    },
    eq: function(a) {
      var c = this.length, a = +a + (0 > a ? c : 0);
      return this.pushStack(0 <= a && a < c ? [ this[a] ] : []);
    },
    each: function(a, c) {
      return $.each(this, a, c);
    },
    find: function(a) {
      var c, d = [], e = this.length;
      for (c = 0; c < e; c++) i.Sizzle(a, this[c], d);
      return d = this.pushStack(d);
    },
    addClass: function(a) {
      return this.each(function(i,c) {
        if (c.classList) c.classList.add(a); else {
          var d = c.className, d = d.replace(a, "");
          c.className = d + " " + a;
        }
      });
    },
    removeClass: function(a) {
      return this.each(function(i , c) {
        c.classList ? c.classList.remove(a) : c.className = c.className.replace(a, "");
      });
    },
    addHandler: function(a, c, d) {
      return this.each(function() {
        $.addHandler(this, a, c, d);
      });
    },
    removeHandler: function(a, c, d) {
      return this.each(function() {
        $.removeHandler(this, a, c, b);
      });
    },
    click: function(a) {
      return this.each(function() {
        $(this).addHandler("click", a);
      });
    },
    clone: function(a) {
      return this.pushStack($.map(this, function(c) {
        return c.cloneNode(a || !0);
      }));
    },
    append: function(a) {
      return this.each(function(i,c) {
        c.appendChild(a[0]);
      });
    },
    before: function(a) {
      return this.each(function() {
        this.parentNode.insertBefore(a[0], this);
      });
    },
    after: function(a) {
      return this.each(function() {
        this.parentNode.insertBefore(a[0], this.nextSibling);
      });
    },
    index: function(a) {
      if (!a) return this[0] && this[0].parentNode ? this.eq(0).prevAll().length : -1;
    },
    css: function(a) {
      return this.each(function(i,c) {
        $.css(c, a);
      });
    },
    css3: function(a, c) {
      return this.each(function(i,d) {
        $.css3(d, a, c);
      });
    },
    empty: function() {
      for (var a, c = 0; null != (a = this[c]); c++) for (;a.firstChild; ) a.removeChild(a.firstChild);
      return this;
    },
    remove: function() {
      return this.each(function(i,a) {
        a.parentNode && a.parentNode.removeChild(a);
      });
    },
    attr: function(a, c) {
      return !c ? this[0].getAttribute(a) : this.each(function(d) {
        d.setAttribute(a, c + "");
      });
    }
    ,fadeIn: function(elem, speed, opacity){
      /*
       * 参数说明
       * elem==>需要淡入的元素
       * speed==>淡入速度,正整数(可选)
       * opacity==>淡入到指定的透明度,0~100(可选)
       */
      speed = speed || 20;
      opacity = opacity || 100;
      //显示元素,并将元素值为0透明度(不可见)
      elem.style.display = 'block';
      $.SetOpacity(elem, 0);
      //初始化透明度变化值为0
      var val = 0;
      //循环将透明值以5递增,即淡入效果
      (function(){
        $.SetOpacity(elem, val);
        val += 5;
        if (val <= opacity) {
          setTimeout(arguments.callee, speed)
        }
      })();
    },
    fadeOut: function(elem, speed, opacity){
      /*
       * 参数说明
       * elem==>需要淡入的元素
       * speed==>淡入速度,正整数(可选)
       * opacity==>淡入到指定的透明度,0~100(可选)
       */
      speed = speed || 20;
      opacity = opacity || 0;
      //初始化透明度变化值为0
      var val = 100;
      //循环将透明值以5递减,即淡出效果
      (function(){
        $.SetOpacity(elem, val);
        val -= 5;
        if (val >= opacity) {
          setTimeout(arguments.callee, speed);
        }else if (val < 0) {
          //元素透明度为0后隐藏元素
          elem.style.display = 'none';
        }
      })();
    }
  };
  $.fn.init.prototype = $.fn;
  l = $(doc);
  $.each({
    text: "innerText",
    html: "innerHTML",
    val: "value"
  }, function(a, v) {
    $.prototype[a] = function(c) {
      return void 0 == c ? this[0][v] : this.each(function( i ,e ) {
        e[v] = c;
      });
    };
  });
  $.each({
    appendTo: "append",
    insertBefore: "before",
    insertAfter: "after"
  }, function(c,v) {
    $.prototype[c] = function(a) {
      for (var e = 0, g = $(a), f = g.length - 1; e <= f; e++) c = e === f ? this : this.clone(!0),
        $(g[e])[v](c);
      return this;
    };
  });
  $.each({
    parent: function(a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    },
    next: function(a) {
      return k(a, "nextSibling");
    },
    prev: function(a) {
      return k(a, "previousSibling");
    },
    prevAll: function(a) {
      return $.dir(a, "previousSibling");
    },
    firstChild: function(a) {
      return $.dir(a, "firstChild");
    },
    lastChild: function(a) {
      return $.dir(a, "lastChild");
    },
    children: function(a) {
      return $.sibling(a.firstChild);
    }
  }, function(a, c) {
    $.prototype[a] = function() {
      return this.pushStack($.map(this, c));
    };
  });

  $.canvas = function(ele,w,h){
    ele.width = w;
    ele.height = h;
    this.canvas = ele;
    this.ctx = ele.getContext('2d');
  }
  $.canvas.prototype = {
    a: function(a, b, c, d, e, f){this.ctx.arc(a, b, c, d, e, f);return this;}
    ,b: function(a){this.ctx.beginPath();return this;}
    ,c: function(a){this.ctx.closePath();return this;}
    ,cr: function(a, b, c, d){this.ctx.clearRect(a, b, c, d);return this;}
    ,l: function(a, b){this.ctx.lineTo(a, b);return this;}
    ,m: function(a, b){this.ctx.moveTo(a, b);return this;}
    ,f: function(a){if(a){this.fs(a)}this.ctx.fill();return this;}
    ,s: function(a){if(a){this.ss(a)}this.ctx.stroke();return this;}
    ,d : function(a , b ,c ,d ,e ){ e?this.ctx.drawImage(a,b,c,d,e):this.ctx.drawImage(a,b,c); return this; }
    ,fr: function(a, b, c, d){this.ctx.fillRect(a, b, c, d);	return this;}
    ,fs: function(a){this.ctx.fillStyle = a;	return this;}
    ,ft: function(a, b, c){this.ctx.fillText(a, b, c);return this;}
    ,fo: function(a){this.ctx.font = a;return this;}
    ,sr: function(a, b, c, d){this.ctx.strokeRect(a, b, c, d);return this;}
    ,ss: function(a){this.ctx.strokeStyle = a; return this;}

    ,sv: function(){this.ctx.save();return this;}
    ,rs: function(){this.ctx.restore();return this;}
    ,rt: function(a,b,c){this.ctx.rotate(a,b,c);return this;}
    ,tl: function(a, b){this.ctx.translate(a, b);return this;}
    ,lg: function(a,b,c,d, e){
      this.grad = this.ctx.createLinearGradient(a,b,c,d);
      for(var i=0, len=e.length; i<len; i++){
        this.grad.addColorStop(e[i][0], e[i][1]);
      }
      return this;
    }
    ,qc: function(a, b, c, d){this.ctx.quadraticCurveTo(a, b, c, d);return this;}
    ,lw: function(a){this.ctx.lineWidth = a||1;	return this;}
    ,sd: function(a, b, c, d){
      this.ctx.shadowOffsetX = a;
      this.ctx.shadowOffsetY = b;
      this.ctx.shadowColor = c;
      this.ctx.shadowBlur = d;
      return this;
    }
    ,global : function(a){ this.ctx.globalCompositeOperation = a; return this;}
    ,toPic : function(){return this.ctx.canvas.toDataURL()}
  }
})(window);
