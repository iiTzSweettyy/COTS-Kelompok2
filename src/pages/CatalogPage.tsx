import { useState, useEffect, useCallback, type FormEvent } from 'react';
import axios from 'axios';
import {
    getProducts,
    searchProducts,
    getCategories,
    getProductsByCategory,
} from '../services/api';
import type { Product, Category, ProductListResponse } from '../types/product';
import SearchFilterBar from '../components/SearchFilterBar';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import Pagination from '../components/Pagination';
import StatusMessage from '../components/StatusMessage';
import DetailModal from '../components/DetailModal';

const LIMIT = 12;

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [skip, setSkip] = useState<number>(0);

    const [searchInput, setSearchInput] = useState<string>('');
    const [activeQuery, setActiveQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Gagal memuat kategori:', err);
            }
        };
        fetchCategories();
    }, []);

    const fetchProductData = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            let data: ProductListResponse;
            if (activeQuery.trim() !== '') {
                data = await searchProducts({ query: activeQuery, limit: LIMIT, skip });
            } else if (selectedCategory !== '') {
                data = await getProductsByCategory({
                    slug: selectedCategory,
                    limit: LIMIT,
                    skip,
                });
            } else {
                data = await getProducts({ limit: LIMIT, skip });
            }

            setProducts(data.products || []);
            setTotal(data.total || 0);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErrorMessage(
                    err.response?.data?.message ||
                    'Terjadi gangguan jaringan saat mengambil daftar produk.'
                );
            } else {
                setErrorMessage('Terjadi kesalahan yang tidak terduga.');
            }
            setProducts([]);
            setTotal(0);
        } finally {
            setIsLoading(false);
        }
    }, [activeQuery, selectedCategory, skip]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedCategory('');
        setSkip(0);
        setActiveQuery(searchInput.trim());
    };

    const handleCategoryChange = (slug: string) => {
        setSearchInput('');
        setActiveQuery('');
        setSkip(0);
        setSelectedCategory(slug);
    };

    const handleReset = () => {
        setSearchInput('');
        setActiveQuery('');
        setSelectedCategory('');
        setSkip(0);
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <SearchFilterBar
                searchInput={searchInput}
                onSearchInputChange={setSearchInput}
                onSearchSubmit={handleSearchSubmit}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                onReset={handleReset}
            />

            {isLoading ? (
                <ProductSkeleton count={LIMIT} />
            ) : errorMessage ? (
                <StatusMessage
                    type="error"
                    message={errorMessage}
                    onRetry={fetchProductData}
                />
            ) : products.length === 0 ? (
                <StatusMessage
                    type="empty"
                    message={
                        activeQuery
                            ? `Tidak ditemukan produk dengan kata kunci "${activeQuery}".`
                            : 'Belum ada produk pada kategori ini.'
                    }
                />
            ) : (
                <>
                    <ProductList
                        products={products}
                        onSelectProduct={(id) => setSelectedProductId(id)}
                    />
                    <Pagination
                        skip={skip}
                        limit={LIMIT}
                        total={total}
                        onPageChange={(newSkip) => setSkip(newSkip)}
                    />
                </>
            )}

            <DetailModal
                productId={selectedProductId}
                onClose={() => setSelectedProductId(null)}
            />
        </main>
    );
};

export default CatalogPage;