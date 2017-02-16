/**
 * Created by Administrator on 2016/12/30 0030.
 */
var server = require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/file_upload"] = requestHandlers.file_upload;
handle["/show"] = requestHandlers.show;
handle["/static_res"] = requestHandlers.static_res;
handle["/favicon_ico"] = requestHandlers.favicon_ico;

server.start(router.route,handle);
