import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
    onSelectProduct: (id: number) => void;
}

const ProductList = ({ products, onSelectProduct }: ProductListProps) => {
    return (
        <section className="product-grid" aria-label="Daftar Produk">
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