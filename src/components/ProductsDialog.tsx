import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
} from "@mui/material";
import { ProductType } from "@/types/ProductType";

type ProductDialogProps = {
    open: boolean;
    onClose: () => void;
    dialogType: "add" | "update" | "delete" | undefined;
    formValues: {
        name: string;
        type: string;
        price: number;
        warranty_years: number;
        available: boolean;
        rating: number;
    };
    onFormChange: (field: string, value: any) => void;
    selectedProduct?: ProductType | null;
    onAddProduct: (productData: ProductType) => void;
    onUpdate: (productData: ProductType) => void;
    onDelete: () => void;
};

const ProductDialog: React.FC<ProductDialogProps> = ({
    open,
    onClose,
    dialogType,
    formValues,
    onFormChange,
    selectedProduct,
    onAddProduct,
    onUpdate,
    onDelete,
}) => {
    const handleSubmit = () => {
        const productData: ProductType = {
            name: formValues.name,
            type: formValues.type,
            price: formValues.price,
            warranty_years: formValues.warranty_years,
            available: formValues.available,
            rating: formValues.rating,
        };

        if (dialogType === "add") {
            onAddProduct(productData);
        } else if (dialogType === "update" && selectedProduct) {
            const updatedProductData = {
                ...productData,
                _id: selectedProduct._id,
            };
            onUpdate(updatedProductData);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
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
                        Are you sure you want to delete {selectedProduct?.name}?
                    </Typography>
                ) : (
                    <>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formValues.name}
                            onChange={(e) =>
                                onFormChange("name", e.target.value)
                            }
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Type"
                            value={formValues.type}
                            onChange={(e) =>
                                onFormChange("type", e.target.value)
                            }
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            inputProps={{ min: 0, step: 0.01 }}
                            value={formValues.price}
                            onChange={(e) =>
                                onFormChange("price", +e.target.value)
                            }
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Warranty Years"
                            type="number"
                            value={formValues.warranty_years}
                            onChange={(e) =>
                                onFormChange("warranty_years", +e.target.value)
                            }
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            select
                            label="Available"
                            value={formValues.available ? "true" : "false"}
                            onChange={(e) =>
                                onFormChange(
                                    "available",
                                    e.target.value === "true"
                                )
                            }
                            sx={{ mb: 2 }}>
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            label="Rating"
                            type="number"
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                            value={formValues.rating}
                            onChange={(e) =>
                                onFormChange("rating", +e.target.value)
                            }
                            sx={{ mb: 2 }}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                {dialogType === "delete" ? (
                    <Button onClick={onDelete} color="error">
                        Delete
                    </Button>
                ) : dialogType === "update" ? (
                    <Button onClick={handleSubmit} color="primary">
                        Update
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
