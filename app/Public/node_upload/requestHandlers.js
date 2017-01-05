/**
 * Created by Administrator on 2016/12/30 0030.
 */
var querystring = require("querystring"),
  fs = require("fs"),
  url=require("url"),
  path = require("path"),
  http = require('http'),
  util = require('util'),
  formidable = require("formidable");

function start(request, response, postData) {
    console.log("Request handler 'start' was called.");

    var body = '<div>start</div>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
  }

function file_upload(request, response, postData ) {
  //跨域解决
/*  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.setHeader('Access-Control-Allow-Credentials', true);*/

  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  form.uploadDir = "/temp";
  // form.encoding = 'utf-8';
  form.maxFieldsSize = 5 * 1024 * 1024;  //上传文件大小限制为最大5M
  form.keepExtensions = true;        //使用文件的原扩展名

  var files = [];
  var fields = [];
  console.log("about to parse");
  form
    .on('field', function(field, value) {
      console.log(field, value);
      fields.push([field, value]);
    })
    .on('file', function(field, file) {
      console.log(field, file);
      files.push([field, file]);
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      console.log('PROGRESS');
      console.log(bytesReceived);
      console.log(bytesExpected);
    })
    .on('error', function(err) {
      console.log('err: ' + err);
    })
    .on('end', function() {
      console.log('-> upload done');
      /*fs.renameSync("/app/Public/node_upload/temp","/app/Public/node_upload/u_fs/11.jpg");
      response.writeHead(200, {'content-type': 'text/plain'});
      response.write('received fields:\n\n '+util.inspect(fields));
      response.write('\n\n');
      response.end('received files:\n\n '+util.inspect(files));*/
    });


  var targetDir = path.join(__dirname, '/temp');
  // 检查目标目录，不存在则创建
  fs.access(targetDir, function(err){
    if(err){
      fs.mkdirSync(targetDir);
    }
    _fileParse();
  });

  // 文件解析与保存
  function _fileParse() {
    form.parse(request, function (err, fields, files) {
      if (err) throw err;
      var filesUrl = [];
      var errCount = 0;
      var keys = Object.keys(files);
      keys.forEach(function(key){
        var filePath = files[key].path;
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
          errCount += 1;
        } else {
          //以当前时间戳对上传文件进行重命名
          var fileName = new Date().getTime() + fileExt;
          var targetFile = path.join(targetDir, fileName);
          //移动文件
          fs.renameSync(filePath, targetFile);
          // 文件的Url（相对路径）
          filesUrl.push('/u_fs/'+fileName)
        }
      });

      // 返回上传信息
      response.json({filesUrl:filesUrl, success:keys.length-errCount, error:errCount});
    });
  }

}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("u_fs/1.jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function static_res(request, response, pathname) {
  /*    if (path.extname(pathname)=="") {
   pathname+="/";
   }*/
  /*    if (pathname.charAt(pathname.length-1)=="/"){
   pathname+="index.html";
   }*/
  //访问静态资源
  var realPath = "app" + pathname;
  fs.access(realPath,function(err){
    console.log('url: ' + pathname);
    if(!err){
      console.log('aaaaaaaaa');
      switch(path.extname(pathname)){
        case ".html":
          response.writeHead(200, {"Content-Type": "text/html"});
          break;
        case ".js":
          response.writeHead(200, {"Content-Type": "text/javascript"});
          break;
        case ".css":
          response.writeHead(200, {"Content-Type": "text/css"});
          break;
        case ".gif":
          response.writeHead(200, {"Content-Type": "image/gif"});
          break;
        case ".jpg":
          response.writeHead(200, {"Content-Type": "image/jpeg"});
          break;
        case ".ico":
          response.writeHead(200, {"Content-Type": "image/ico"});
          break;
        case ".png":
          response.writeHead(200, {"Content-Type": "image/png"});
          break;
      }

      fs.readFile(realPath,function (err,data){
        response.end(data);
      });
    }

  });
}

exports.start = start;
exports.file_upload = file_upload;
exports.show = show;
exports.static_res = static_res;
