import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    try {
        await connectDB();

        const body = await req.json();

        if (!body.name || !body.price) {
            return NextResponse.json(
                { message: "Les informations du produit sont incomplètes" },
                { status: 400 }
            );
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return NextResponse.json(
                { message: "Produit introuvable" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
        return NextResponse.json(
            { message: "Erreur lors de la mise à jour du produit" },
            { status: 400 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    try {
        await connectDB();

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Produit introuvable" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Produit supprimé avec succès" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
        return NextResponse.json(
            { message: "Erreur lors de la suppression du produit" },
            { status: 400 }
        );
    }
}
