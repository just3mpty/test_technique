import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (serverUrl: string) => {
    socket = io(serverUrl);
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket is not initialized.");
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
