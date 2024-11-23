"use client";

import React, { useState, useEffect } from "react";
import { Grid2, Box, Fab, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import ProductCard from "@/components/ProductCard";
import ProductDialog from "@/components/ProductsDialog";
import { ProductType } from "@/types/ProductType";

export default function HomePage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<"add" | "update" | "delete">();
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
        null
    );
    const [formValues, setFormValues] = useState<ProductType>({
        _id: "",
        name: "",
        type: "",
        price: 0,
        warranty_years: 0,
        available: false,
        rating: 0,
    });

    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error(
                        "Erreur lors de la récupération des produits"
                    );
                }
                const data = await response.json();
                setProducts(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleOpenDialog = (
        type: "add" | "update" | "delete",
        product?: any
    ) => {
        setDialogType(type);
        setSelectedProduct(product || null);

        if (type === "update" && product) {
            setFormValues({
                name: product.name,
                type: product.type,
                price: product.price,
                warranty_years: product.warranty_years,
                available: product.available,
                rating: product.rating,
            });
        } else if (type === "add") {
            setFormValues({
                name: "",
                type: "",
                price: 0,
                warranty_years: 0,
                available: false,
                rating: 0,
            });
        }

        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFormChange = (field: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddProduct = (newProduct: ProductType) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    const handleAddProductSubmit = async () => {
        try {
            // Envoi de la requête POST pour ajouter le produit
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues), // On envoie les valeurs du formulaire
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du produit");
            }

            // Récupération du produit créé
            const newProduct = await response.json();

            // Mettre à jour l'état local pour inclure le nouveau produit
            handleAddProduct(newProduct);

            // Fermer le dialog après l'ajout
            setOpenDialog(false);
        } catch (error: any) {
            setError(error.message); // Afficher l'erreur si la requête échoue
        }
    };

    const updateProduct = async (id: string, updatedProduct: ProductType) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        return res.json();
    };

    const deleteProduct = async (id: string) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        return res.json();
    };

    const handleUpdateProduct = async () => {
        if (selectedProduct && selectedProduct._id) {
            const updatedProduct = { ...selectedProduct, ...formValues };
            const data = await updateProduct(
                selectedProduct._id,
                updatedProduct
            );
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === data._id ? data : product
                )
            );
            setOpenDialog(false);
        }
    };

    const handleDeleteProduct = async () => {
        if (selectedProduct && selectedProduct._id) {
            const data = await deleteProduct(selectedProduct._id);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== data._id)
            );
            setOpenDialog(false);
        }
    };

    return (
        <Box
            sx={{
                padding: "10px",
                minHeight: "100vh",
            }}>
            {loading ? (
                <Typography variant="h6" align="center">
                    Chargement...
                </Typography>
            ) : error ? (
                <Typography variant="h6" color="error" align="center">
                    {error}
                </Typography>
            ) : products.length === 0 ? (
                <Typography variant="h6" align="center">
                    Aucun produit trouvé
                </Typography>
            ) : (
                <Grid2 columns={{ xs: 2, sm: 4 }} container spacing={"10px"}>
                    {products.map((product, idx) => (
                        <Grid2
                            sx={{
                                width: "calc(25% - 10px)",
                                aspectRatio: "1/1",
                            }}
                            key={idx}>
                            <ProductCard
                                product={product}
                                onUpdate={(product) =>
                                    handleOpenDialog("update", product)
                                }
                                onDelete={(product) =>
                                    handleOpenDialog("delete", product)
                                }
                            />
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <Fab
                sx={{
                    position: "fixed",
                    bottom: 30,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
                color="secondary"
                aria-label="add"
                onClick={() => handleOpenDialog("add")}>
                <Add />
            </Fab>
            <ProductDialog
                open={openDialog}
                onClose={handleCloseDialog}
                dialogType={dialogType}
                formValues={formValues}
                onFormChange={handleFormChange}
                selectedProduct={selectedProduct}
                onAddProduct={handleAddProductSubmit}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
            />
        </Box>
    );
}
