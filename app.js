"use strict";
const WebSocket       = require("ws");
const WebSocketServer = WebSocket.Server;
const wss             = new WebSocketServer({
	port: 3000
});
// 发出广播
function BroadcastMsg(wss, msg) {
	wss.clients.forEach(function (client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(msg);
		}
	});
}
// 事件监听
wss.on("connection", function (ws, req) {
	BroadcastMsg(wss, `IP地址为${req.connection.remoteAddress}的用户进入了房间`);
	ws.on("message", function (message) {
		BroadcastMsg(wss, `[${req.connection.remoteAddress}] : ${message}`);
	});
	ws.on("close", function () {
		BroadcastMsg(wss, `IP地址为${req.connection.remoteAddress}的用户离开了房间`);
	});
});