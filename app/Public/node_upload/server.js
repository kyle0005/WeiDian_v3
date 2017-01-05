/**
 * Created by Administrator on 2016/12/30 0030.
 */
var http = require("http");
var url=require("url");
var path = require("path");
var fs   = require("fs");

function start(route,handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname=url.parse(request.url).pathname;
    console.log("Request for"+pathname+"received.");

    // request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
        postDataChunk + "'.");
    });
    request.addListener("end", function() {
      route(handle, pathname, request, response, postData);
    });


  }

  http.createServer(onRequest).listen(8080,'127.0.0.1');
  console.log("Server has started. 127.0.0.1:8080");
}

exports.start = start;
