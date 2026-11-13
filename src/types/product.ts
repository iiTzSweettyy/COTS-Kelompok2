export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    images: string[];
    thumbnail: string;
}

export interface ProductListResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}

export interface PaginationParams {
    limit?: number;
    skip?: number;
}