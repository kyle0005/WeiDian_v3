;(function ($, window, document, undefined) {
    var uploads = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'c_id': '',
                'input_id': '',
                'c_url': '',
                'extensions': '',
                'number': 0,
                'singleRepeat':false
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    uploads.prototype = {
        getUploader: function () {
            var c_id = this.options.c_id;
            var input_id = this.options.input_id;
            var c_url = this.options.c_url;
            var extensions = this.options.extensions;
            var number = this.options.number;
            var singleRepeat = this.options.singleRepeat;

            var _extensions = extensions || "jpg,jpeg,gif,png";
            var Uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight',
                browse_button: c_id,
                max_file_size: '2mb',
                url: c_url,
                flash_swf_url: 'resource/js/Moxie.swf',
                silverlight_xap_url: 'resource/js/Moxie.xap',
                filters: [
                    { title: "图片（" + _extensions + "）", extensions: _extensions },
                    { title : "video files", extensions : "flv,mp4,avi,ts" }
                ],
                init: {
                    FilesAdded: function (up, files) {
                        if (files.length > 1) {
                            JQbox.alert("只能上传一个文件哦");
                        } else {
                            up.start();
                        }

                    },
                    FileUploaded: function (up, file, info) {
                        if (info.response) {
                            //单个文件可重复上传
                            if(singleRepeat){
                                $.each(up.files, function (i, file) {
                                    $('#'+c_id).parent('.upload-container').find('.img_up').remove();
                                    if (up.files.length <= 1) {
                                        return;
                                    }
                                    up.removeFile(file);
                                });
                            }

                            var max_len = number;
                            if (max_len > 0) {
                                var now_len = $('#'+c_id).parent('.upload-container').find('.img_up').length;
                                if ((now_len + 1) >= max_len) {
                                    $('#' + c_id).hide();
                                }
                                if (now_len >= max_len) {
                                    return false;
                                }
                            }
                            var input_name = input_id + (max_len != 1 && !singleRepeat ? '[]': '');
                            var _str = '<span class="img_up">';
                            _str = _str + '<img src="' + golddiy_image_path + info.response + '" width="100">';
                            _str = _str + '<input type="hidden" name="' + input_name + '" value="' + info.response + '">';
                            if (singleRepeat != true) {
                                _str = _str + '<a class="del_img" href="javascript:;">删除</a>';
                            }
                            _str = _str + '</span>';
                            $('#' + c_id).siblings('.img_ul').append(_str);
                            $('.del_img').hide();

                            this.refresh();

                            up = new uploads();
                            up.binddel(c_id, number);

                        } else {
                            alert('上传失败，请重试');
                        }
                    },
                    UploadProgress: function (up, file) {
                        file.id;
                        file.percent;
                    },
                    Error: function (up, err) {
                        JQbox.alert(err.message);
                    }
                }
            });
            return Uploader;
        },
        start: function (obj) {
            obj.init();
            this.binddel(this.options.c_id, this.options.number);
        },
        binddel:function(c_id, number) {
            /* 删除 */
            var _img_len = $('#c_id').parent('.upload-container').find('.img_up').length;
            $('.del_img').on('click', function () {
                var obj = $(this).parent().parent().siblings('.img_add');
                if ('none' == obj.css('display')) {
                    obj.show();
                }
                $(this).parent().remove();
            });
            $('.img_up').hover(function () {
                $(this).find('.del_img').show();
            },function(){
                $(this).find('.del_img').hide();
            });

            if (_img_len > 0) {
                if (_img_len >= number) {
                    $('#' + c_id).hide();
                }
            }
        }

    };
    $.fn.uploads = function (options) {
        var upload = new uploads(this, options);
        upload.getUploader().init();
        upload.binddel();
    };
})(jQuery, window, document);
