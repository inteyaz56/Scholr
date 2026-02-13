import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./index.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Attach socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Make global for controllers
global.io = io;

// Socket connection
io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

server.listen(PORT, () => {});
