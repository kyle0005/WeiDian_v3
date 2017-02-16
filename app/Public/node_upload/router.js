/**
 * Created by Administrator on 2016/12/30 0030.
 */
var path = require("path");
function route(handle,pathname,request,response,postData){
  console.log("About to route a request for"+pathname);
  console.log(path.extname(pathname));
  if(typeof handle[pathname]=='function'){
    handle[pathname](request, response, postData);
  }

  else if(path.extname(pathname) != ''){
    //访问静态资源
    handle["/static_res"](request, response, pathname);
  }
  else{
    console.log("no request handler found for"+pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}
exports.route=route;
