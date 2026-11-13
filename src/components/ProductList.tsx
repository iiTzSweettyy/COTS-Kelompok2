import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" aria-label="Daftar Produk">
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </section>
    );
};

export default ProductList;