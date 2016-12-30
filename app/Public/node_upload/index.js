/**
 * Created by Administrator on 2016/12/30 0030.
 */
var server = require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route,handle);
