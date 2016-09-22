 var Jslottery = (function(){

	var global;
  var flag = true;
	function Jslottery(opt){
		var options = {
			scroll_dom:null,
			start_position:null,
			stop_position:null,
			speed:50,
			speedUp:Math.floor(Math.random()*30+20),
			speedDown:Math.floor(Math.random()*100+600),
			speed_up_position:Math.floor(Math.random()*6+1),
			speed_down_position:Math.floor(Math.random()*6+1),
			total_circle:null,
			scroll_dom_css_value:null,
			scroll_dom_attr:null,
			scroll_dom_css:null,
      flag: true,
			callback:function(){}
		};

		this.options = this.js_extend(options,opt);

		this.fixs = {
			timeout:false,
			original_speed:null,
			num:null,
			curC:0,
			steps:0,
			run:1,
			error:false,
			dom_style:{}
		};

		this.init();
	}

	Jslottery.prototype = {
		init:function(){
			global = this;
			global.judge_null();
			global.judge_dom();
			global.fixs.num = global.options.scroll_dom.length;
			global.domstyle();
		},

		js_extend:function(destination,source){
			for (var property in source)
				destination[property] = source[property];
			return destination;
		},

		judge_null:function(){
			var self = global.options;
			if(self.scroll_dom==null ||
			   self.scroll_dom_attr==null ||
			   self.scroll_dom_css==null ||
			   self.scroll_dom_css_value==null){
			   	global.fixs.error=true;
				self.callback({'status':'-1','data':'param error'});
			}
		},

		judge_dom:function(){
			var self = global.options;
			self.scroll_dom =  document.getElementById(self.scroll_dom)==null ? document.getElementsByClassName(self.scroll_dom) : document.getElementById(self.scroll_dom);
		},

		domstyle:function(){
			var self = global.options;
			for(var i=0;i<=global.fixs.num;i++){
				for(var j=0;j<global.fixs.num;j++){
					if(self.scroll_dom[j].getAttribute(self.scroll_dom_attr) == i){
						global.fixs.dom_style[i] = global.js_style(self.scroll_dom[j]);
					}
				}
			}
		},

		js_style:function(obj){
			if(obj.currentStyle){
				return obj.currentStyle[global.options.scroll_dom_css];
			}else{
				return getComputedStyle(obj,false)[global.options.scroll_dom_css];
			}
		},

		start:function(){
			if(global.fixs.error){
				global.options.callback({'status':'-1','data':'param error'});
				return false;
			}
			if(global.fixs.run)
				global.options.callback({'status':'0','data':'Jslottery will start running'});
			global.fixs.run=0;
			if(global.fixs.timeout){
				global.fixs.curC=0;
				global.fixs.steps=0;
				global.options.speed = global.fixs.original_speed;
				global.fixs.timeout = false;
				global.stop();
				clearTimeout(global.start);
				return false;
			}

      global.changeNext();
      setTimeout(global.start,global.options.speed);

		},

		stop:function(){
			global.options.callback({'status':'1','data':global});
			global.fixs.run=1;
      global.options.flag = true;
      global.pop();
		},
    pop:function () {
		  var mask = document.getElementById('pop-mask');
      var popContainer = document.getElementById('pop-container');
      var shareContainer = document.getElementById('share-container');
      var ok_btn =document.getElementById('ok');
      var cancel_btn =document.getElementById('cancel');
      var popTxt = document.getElementById('pop-txt');
      popTxt.innerHTML = global.options.stop_position;
      var reg = new RegExp('(\\s|^)' + 'hide' + '(\\s|$)');
      mask.className = mask.className.replace(reg, ' ');
      popContainer.className = popContainer.className.replace(reg, ' ');
      ok_btn.onclick = function () {
        mask.className += ' hide';
        popContainer.className += ' hide';
      };
      cancel_btn.onclick = function () {
        mask.className += ' hide';
        popContainer.className += ' hide';
      };

    },

		speedUp:function(){
			if(global.fixs.steps==global.options.speed_up_position)
				global.options.speed = global.options.speedUp;
		},

		speedDown:function(){
			var tmp1 = global.options.stop_position-global.options.speed_down_position;
			var tmp2 = global.options.total_circle+1;
			if(tmp1<=0){
				tmp1 = global.fixs.num + tmp1;
				tmp2 = tmp2-1;
			}

			if(global.options.start_position==tmp1 && global.fixs.curC==tmp2)
				global.options.speed = global.options.speedDown;
		},

		changeNext:function(){

			var self = global.options;
			global.fixs.steps++;

			if(global.options.start_position==global.fixs.num+1){
				global.options.start_position=1;
				global.fixs.curC++;
			}

			/*global.speedUp();

			global.speedDown();*/

			if(global.options.start_position==self.stop_position && global.fixs.curC==self.total_circle+1){
				global.fixs.timeout = true;
			}

			global.start_scroll();
		},

		start_scroll:function(){
			var self = global.options, fix = global.fixs, scroll_json = {}, original_json = {};

			scroll_json[self.scroll_dom_css] = self.scroll_dom_css_value;

			for(var i=0;i<=global.fixs.num;i++){

				if(self.scroll_dom[i].getAttribute(self.scroll_dom_attr)==self.start_position)
				{

					original_json[self.scroll_dom_css] = self.start_position==1 ? fix.dom_style[fix.num] : fix.dom_style[self.start_position-1];
					self.scroll_dom[i].style.cssText=self.scroll_dom_css+":"+scroll_json[self.scroll_dom_css];

					for(var j=0;j<fix.num;j++){
						if(self.start_position==1)
						{
							for(var k=0;k<fix.num;k++){
								if(self.scroll_dom[k].getAttribute(self.scroll_dom_attr)==fix.num){
									self.scroll_dom[k].style.cssText=self.scroll_dom_css+":"+original_json[self.scroll_dom_css];
								}
							}
						}else if(self.scroll_dom[j].getAttribute(self.scroll_dom_attr)==self.start_position-1)
						{
							self.scroll_dom[j].style.cssText=self.scroll_dom_css+":"+original_json[self.scroll_dom_css];
						}
					}

					self.start_position++;
					return false;
				}
			}
		}
	};
	return Jslottery;
 })();
