import express from "express";
import {WebSocket, WebSocketServer} from "ws";


const app = express();

const httpServer = app.listen(8000, function() {
    console.log((new Date()) + " Server is listening on port : " + 8000);
});

const wss = new WebSocketServer({server: httpServer});

let users = 0;
wss.on("connection", function connection(ws, isBinary) {
    ws.on("error", console.error);
    users++;
    ws.on("message", function(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: false});
            }
        });
    });
    console.log("users connected : ", users);
    ws.send("hello! Message fro Server.");
});
