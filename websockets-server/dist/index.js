"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8000, function () {
    console.log((new Date()) + " Server is listening on port : " + 8000);
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
let users = 0;
wss.on("connection", function connection(ws, isBinary) {
    ws.on("error", console.error);
    users++;
    ws.on("message", function (data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: false });
            }
        });
    });
    console.log("users connected : ", users);
    ws.send("hello! Message fro Server.");
});
