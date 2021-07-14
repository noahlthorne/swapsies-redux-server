import * as socketio from "socket.io";
import { io } from "../app";

io.on("connection", (socket: any) => {
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("message", (message: string) => {
        console.log(message);
    });
});
