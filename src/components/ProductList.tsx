import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
    onSelectProduct: (id: number) => void;
}

const ProductList = ({ products, onSelectProduct }: ProductListProps) => {
    return (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Daftar Produk">
            {products.map((item) => (
                <ProductCard
                    key={item.id}
                    product={item}
                    onSelectProduct={onSelectProduct}
                />
            ))}
        </section>
    );
};

export default ProductList;
