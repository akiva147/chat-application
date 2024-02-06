import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Message } from "./types/general.types";
import { getUsers, userJoin, userLeft } from "./utils/user.util";

dotenv.config();
const port = process.env.PORT;

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

io.on("connection", (socket) => {
  socket.join("1");

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("handle-connection", (username: string, room: string) => {
    if (!userJoin(socket.id, username)) {
      socket.emit("username-taken");
    } else {
      socket.emit("username-submitted-successfully");
      io.to(room).emit("get-connected-users", getUsers());
    }
  });

  socket.on("message", (message: Message, room: string) => {
    socket.to(room).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    userLeft(socket.id);
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function shutdown() {
  try {
    console.log("Successfully shutted down the server ");
    // If you have any other cleanup tasks, you can add them here

    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown: " + error);
    process.exit(1);
  }
}
