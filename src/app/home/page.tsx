"use client";

import React, { useState, useEffect, useRef } from "react";
import { Grid2, Box, Fab, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import ProductCard from "@/components/ProductCard";
import ProductDialog from "@/components/ProductsDialog";
import { ProductType } from "@/types/ProductType";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    addProduct,
    deleteProduct,
    setProducts,
    updateProduct,
} from "@/lib/productsSlice";
import { io } from "socket.io-client";

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

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.products.products);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return;
        }

        const socket = io("http://localhost:3000/api/socket", {
            transports: ["websocket"],
        });

        socket.on("product_added", (newProduct: ProductType) => {
            dispatch(addProduct(newProduct));
        });

        socket.on("product_updated", (updatedProduct: ProductType) => {
            dispatch(updateProduct(updatedProduct));
        });

        socket.on("product_deleted", (deletedProductId: string) => {
            dispatch(deleteProduct(deletedProductId));
        });

        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error(
                        "Erreur lors de la récupération des produits"
                    );
                }
                const data = await response.json();
                dispatch(setProducts(data));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

        return () => {
            socket.disconnect();
        };
    }, [dispatch, router]);

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

    const handleAddProductSubmit = async () => {
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du produit");
            }

            const newProduct = await response.json();
            dispatch(setProducts([...products, newProduct]));
            setOpenDialog(false);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleUpdateProduct = async () => {
        if (selectedProduct && selectedProduct._id) {
            const updatedProduct = { ...selectedProduct, ...formValues };
            const res = await fetch(`/api/products/${selectedProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            const data = await res.json();
            dispatch(updateProduct(data));
            setOpenDialog(false);
        }
    };

    const handleDeleteProduct = async () => {
        if (selectedProduct && selectedProduct._id) {
            const res = await fetch(`/api/products/${selectedProduct._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            dispatch(deleteProduct(data));
            setOpenDialog(false);
        }
    };

    return (
        <Box sx={{ padding: "10px", minHeight: "100vh" }}>
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
                    {products.map((product: ProductType) => (
                        <Grid2
                            sx={{
                                width: "calc(25% - 10px)",
                                aspectRatio: "1/1",
                            }}
                            key={product._id}>
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
            <Button
                variant="contained"
                color="secondary"
                sx={{ position: "fixed", bottom: 30, right: 30 }}
                onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/");
                }}>
                Déconnexion
            </Button>
        </Box>
    );
}
