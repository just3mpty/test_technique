import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    warranty_years: { type: Number, required: true },
    available: { type: Boolean, required: true },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
