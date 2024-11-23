import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | undefined;

export function GET(req: NextApiRequest) {
    if (!io) {
        const httpServer = req.socket as unknown as HttpServer;

        io = new SocketIOServer(httpServer);

        io.on("connection", (socket) => {
            console.log("Un utilisateur s'est connecté :", socket.id);

            socket.on("disconnect", () => {
                console.log("Utilisateur déconnecté :", socket.id);
            });

            socket.on("add_product", (product) => {
                io?.emit("product_added", product);
            });

            socket.on("update_product", (product) => {
                io?.emit("product_updated", product);
            });

            socket.on("delete_product", (productId) => {
                io?.emit("product_deleted", productId);
            });
        });
    }

    return NextResponse.json({ message: "Socket.IO is running" });
}
