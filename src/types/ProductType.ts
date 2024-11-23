interface ProductType {
    _id?: string;
    name: string;
    type: string;
    price: number;
    rating: number;
    warranty_years: number;
    available: boolean;
}

export type { ProductType };
