"use client";

import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    ButtonGroup,
    Button,
    Box,
} from "@mui/material";
import { Refresh, Delete } from "@mui/icons-material";
import { ProductType } from "@/types/ProductType";

type ProductCardProps = {
    product: ProductType;
    onUpdate: (product: ProductType) => void;
    onDelete: (product: ProductType) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onUpdate,
    onDelete,
}) => {
    return (
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
                image="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg"
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
                    <Typography variant="body1" fontWeight="bold">
                        £{product.price}
                    </Typography>
                </Box>
            </CardContent>
            <ButtonGroup fullWidth sx={{ gap: "10px", padding: "10px" }}>
                <Button
                    startIcon={<Refresh />}
                    variant="contained"
                    color="secondary"
                    onClick={() => onUpdate(product)}>
                    Update
                </Button>
                <Button
                    variant="outlined"
                    endIcon={<Delete />}
                    onClick={() => onDelete(product)}>
                    Delete
                </Button>
            </ButtonGroup>
        </Card>
    );
};

export default ProductCard;
