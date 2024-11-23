import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/types/ProductType";

interface ProductsState {
    products: ProductType[];
}

const initialState: ProductsState = {
    products: [],
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<ProductType>) => {
            const index = state.products.findIndex(
                (p) => p._id === action.payload._id
            );
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (p) => p._id !== action.payload
            );
        },
    },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
    productsSlice.actions;

export default productsSlice.reducer;
