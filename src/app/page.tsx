"use client";

import React, { useState } from "react";
import {
    Grid2,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    ButtonGroup,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { Add, Delete, Refresh } from "@mui/icons-material";

type ProductType = {
    _id: number;
    name: string;
    type: string;
    price: number;
    rating: number;
    warranty_years: number;
    available: boolean;
};

const products: ProductType[] = [
    {
        _id: 1,
        name: "AC1 Phone1",
        type: "phone",
        price: 200.05,
        rating: 3.8,
        warranty_years: 1,
        available: true,
    },
    {
        _id: 2,
        name: "AC2 Phone2",
        type: "phone",
        price: 147.21,
        rating: 1,
        warranty_years: 3,
        available: false,
    },
    {
        _id: 3,
        name: "AC3 Phone3",
        type: "phone",
        price: 150,
        rating: 2,
        warranty_years: 1,
        available: true,
    },
    {
        _id: 4,
        name: "AC4 Phone4",
        type: "phone",
        price: 50.2,
        rating: 3,
        warranty_years: 2,
        available: true,
    },
];

export default function HomePage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<"add" | "update" | "delete">();
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
        null
    );
    const [formValues, setFormValues] = useState({
        name: "",
        type: "",
        price: 0,
        warranty_years: 0,
        available: false,
    });

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
            });
        } else if (type === "add") {
            setFormValues({
                name: "",
                type: "",
                price: 0,
                warranty_years: 0,
                available: false,
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

    return (
        <Box
            sx={{
                padding: "10px",
                minHeight: "100vh",
            }}>
            <Grid2 columns={{ xs: 2, sm: 4 }} container spacing={"10px"}>
                {products.map((product) => (
                    <Grid2
                        sx={{ width: "calc(25% - 10px)", aspectRatio: "1/1" }}
                        key={product._id}>
                        <Card
                            sx={{
                                width: "100%",
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}>
                            <CardMedia
                                component="img"
                                height={250}
                                image={
                                    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg"
                                }
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {product.name}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "10px",
                                    }}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold">
                                        £{product.price.toFixed(2)}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <ButtonGroup
                                fullWidth
                                sx={{ gap: "10px", padding: "10px" }}>
                                <Button
                                    startIcon={<Refresh />}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                        handleOpenDialog("update", product)
                                    }>
                                    Update
                                </Button>
                                <Button
                                    variant="outlined"
                                    endIcon={<Delete />}
                                    onClick={() =>
                                        handleOpenDialog("delete", product)
                                    }>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
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

            {/* Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogType === "update"
                        ? "Update Product"
                        : dialogType === "delete"
                        ? "Delete Product"
                        : "Add Product"}
                </DialogTitle>
                <DialogContent>
                    {dialogType === "delete" ? (
                        <Typography>
                            Are you sure you want to delete{" "}
                            {selectedProduct?.name}?
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="Name"
                                value={formValues.name}
                                onChange={(e) =>
                                    handleFormChange("name", e.target.value)
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Type"
                                value={formValues.type}
                                onChange={(e) =>
                                    handleFormChange("type", e.target.value)
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                value={formValues.price}
                                onChange={(e) =>
                                    handleFormChange("price", +e.target.value)
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Warranty Years"
                                type="number"
                                value={formValues.warranty_years}
                                onChange={(e) =>
                                    handleFormChange(
                                        "warranty_years",
                                        +e.target.value
                                    )
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Available"
                                value={formValues.available ? "true" : "false"}
                                onChange={(e) =>
                                    handleFormChange(
                                        "available",
                                        e.target.value === "true"
                                    )
                                }
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    {dialogType === "delete" ? (
                        <Button color="error">Delete</Button>
                    ) : (
                        <Button color="primary">
                            {dialogType === "update" ? "Update" : "Add"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
}
