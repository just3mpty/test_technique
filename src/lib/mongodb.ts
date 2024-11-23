import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
    throw new Error("Veuillez définir MONGO_URI dans le fichier .env");
}

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(MONGO_URI);
        isConnected = !!db.connections[0].readyState;
        console.log("MongoDB connecté");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        throw new Error("Connexion MongoDB échouée");
    }
};
