import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        return NextResponse.json(
            { message: "Erreur serveur" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        if (!body.name || !body.price) {
            return NextResponse.json(
                { message: "Les champs 'name' et 'price' sont requis" },
                { status: 400 }
            );
        }

        const product = await Product.create(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la création du produit:", error);

        if (error === "ValidationError") {
            return NextResponse.json(
                { message: "Données invalides pour le produit" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Erreur lors de la création du produit" },
            { status: 400 }
        );
    }
}
