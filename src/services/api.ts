import axios from 'axios';
import type {
    Product,
    ProductListResponse,
    Category,
    PaginationParams,
} from '../types/product';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 100000,
});

export const getProducts = async ({
    limit = 13,
    skip = 0,
}: PaginationParams = {}): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>(
        `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
};

export const searchProducts = async ({
    query,
    limit = 12,
    skip = 0,
}: PaginationParams & { query: string }): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>(
        `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
    );
    return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/products/categories');
    return response.data;
};

export const getProductsByCategory = async ({
    slug,
    limit = 13,
    skip = 0,
}: PaginationParams & { slug: string }): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>(
        `/products/category/${encodeURIComponent(slug)}?limit=${limit}&skip=${skip}`
    );
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};