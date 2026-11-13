import type { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
    onSelectProduct: (id: number) => void;
}

const ProductCard = ({ product, onSelectProduct }: ProductCardProps) => {
    const { id, thumbnail, title, price, rating, category } = product;

    return (
        <article className="product-card">
            <div className="card-image-wrapper">
                <img src={thumbnail} alt={`Gambar produk ${title}`} loading="lazy" />
                <span className="badge-category">{category}</span>
            </div>
            <div className="card-body">
                <h2 className="card-title" title={title}>
                    {title}
                </h2>
                <div className="card-meta">
                    <span className="card-price">${price.toFixed(2)}</span>
                    <span className="card-rating" aria-label={`Rating ${rating} dari 5`}>
                        ★ {rating}
                    </span>
                </div>
                <button
                    type="button"
                    className="btn btn-outline card-btn"
                    onClick={() => onSelectProduct(id)}
                >
                    Lihat Detail Produk
                </button>
            </div>
        </article>
    );
};

export default ProductCard;