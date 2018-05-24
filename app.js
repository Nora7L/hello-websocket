var ws = require("nodejs-websocket");
console.log("Start building a connection...");

//init
var pagesConn = null,
    pagesServer = null,
    pagesConnReady = false,
    pagesServerReady = false;

//create server
var server = ws.createServer(function(conn) {

    //Messages received
    conn.on("text", function(str) {
      console.log("Messages received:" + str);
      if (str === "connection") {
        pagesConn = conn;
        pagesConnReady = true;
        conn.sendText("success");
      }
      if (str === "server") {
        pagesServer = conn;
        pagesServerReady = true;
      }
      if (pagesConnReady && pagesServerReady) {
        pagesServer.sendText(str);
      }
      conn.sendText(str);
    });

    //close
    conn.on("close", function(code, reason) {
      console.log("Close connection");
    });

    //error
    conn.on("error", function(code, reason) {
      console.log("error");
    });
}).listen(8001);

//为这两页面开个路由
//实现点击之后的内容存起来


console.log("WebSocket success");
