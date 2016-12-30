/**
 * Created by Administrator on 2016/12/30 0030.
 */
var http = require("http");
var url=require("url");

function start(route,handle) {
  function onRequest(request, response) {
    var pathname=url.parse(request.url).pathname;
    console.log("Request for"+pathname+"received.");

    route(handle,pathname,response);

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("this is a demo");
    //response.end();
  }

  http.createServer(onRequest).listen(5656,'127.0.0.1');
  console.log("Server has started. localhost:5656");
}

exports.start = start;
