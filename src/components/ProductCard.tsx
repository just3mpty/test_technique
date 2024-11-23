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
import { Refresh, Delete, Star, StarHalf } from "@mui/icons-material";
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
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={`full-${i}`} color="primary" />
                ))}
                {hasHalfStar && <StarHalf color="primary" />}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <Star key={`empty-${i}`} color="disabled" />
                ))}
            </Box>
        );
    };

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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                    }}>
                    {renderStars(product.rating)}
                    <Typography variant="body2" sx={{ marginLeft: "10px" }}>
                        {product.rating} / 5
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
