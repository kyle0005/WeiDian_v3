!function(a,b,c,d){var e=function(b,c){this.$element=b,this.defaults={c_id:"",input_id:"",c_url:"",extensions:"",number:0,singleRepeat:!1,text:!1,text_name:"",text_placeholder:""},this.options=a.extend({},this.defaults,c)};e.prototype={getUploader:function(){var b=this.options.c_id,c=this.options.input_id,d=this.options.c_url,f=this.options.extensions,g=this.options.number,h=this.options.singleRepeat,i=this.options.text,j=this.options.text_name,k=this.options.text_placeholder,l=f||"jpg,jpeg,gif,png",m=new plupload.Uploader({runtimes:"html5,flash,silverlight",browse_button:b,max_file_size:"6mb",url:d,flash_swf_url:"resource/js/Moxie.swf",silverlight_xap_url:"resource/js/Moxie.xap",filters:[{title:"图片（"+l+"）",extensions:l},{title:"视频",extensions:"flv,mp4,avi,ts"},{title:"音频",extensions:"mp3"}],init:{FilesAdded:function(a,b){b.length>1?JQbox.alert("只能上传一个文件哦"):a.start()},FileUploaded:function(d,f,l){if(l.response){if(-1!=l.response.indexOf("error")){var m=JSON.parse(l.response);return JQbox.alert(m.error.message),!1}h&&a.each(d.files,function(c,e){a("#"+b).parent(".upload-container").find(".img_up").remove(),d.files.length<=1||d.removeFile(e)});var n=g;if(n>0){var o=a("#"+b).parent(".upload-container").find(".img_up").length;if(o+1>=n&&a("#"+b).hide(),o>=n)return!1}var p=l.response.split(".");if("mp3"==p[1]){var q=c+(1==n||h?"":"[]"),r='<span class="img_up">';r=r+'<audio src="'+golddiy_image_path+l.response+'">',r=r+'<input type="hidden" name="'+q+'" value="'+l.response+'">',1!=h&&(r+='<a class="del_img" href="javascript:;">删除</a>'),r+="</span>",a("#"+b).siblings(".img_ul").append(r)}else{var s=c+(1==n||h?"":"[]"),t='<span class="img_up">';t=t+'<img src="'+golddiy_image_path+l.response+'">',t=t+'<input type="hidden" name="'+s+'" value="'+l.response+'">',1!=h&&(t+='<a class="del_img" href="javascript:;">删除</a>'),i&&(t+='<input type="text" name="'+j+'" class="wei-up-inp" placeholder="'+k+'"/>'),t+="</span>",a("#"+b).siblings(".img_ul").append(t)}this.refresh(),d=new e,d.binddel(b,g,this)}else alert("上传失败，请重试")},UploadProgress:function(a,b){b.id,b.percent},Error:function(a,b){JQbox.alert(b.message)}}});return m},start:function(a){a.init(),this.binddel(this.options.c_id,this.options.number)},binddel:function(b,c,d){var e=a("#c_id").parent(".upload-container").find(".img_up").length;a(".del_img").on("click",function(){var b=a(this).parent().parent().siblings(".img_add");"none"==b.css("display")&&b.show(),a(this).parent().remove(),d.refresh()}),a(this).find(".del_img").show(),e>0&&e>=c&&a("#"+b).hide()}},a.fn.uploads=function(a){var b=new e(this,a);b.getUploader().init(),b.binddel()}}(jQuery,window,document);