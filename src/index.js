/* Modules */
import "@babel/polyfill";
import express from "express";
import nodemon from "nodemon";
import path from "path";
import socket_io from "socket.io";

const express_app = express();

/* Settings */
express_app.set("port", process.env.PORT || 3000);

/* Static files */
express_app.use(express.static(path.join(__dirname, "..", "public")));

/* Gets */
const server_port = express_app.get("port");

/* Start */
const server = express_app.listen(server_port, (req, res) => {
  console.log("Server on port", server_port);
});

/* Websockets */
const io = socket_io(server);
io.on("connection", socket => {
  console.log("New connection started", socket.id);

  socket.on("chat:message", data => {
    console.log(data);

    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", data => {
    socket.broadcast.emit("chat:typing", data);
  });
});
