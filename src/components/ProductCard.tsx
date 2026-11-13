import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

// Hapus onSelectProduct dari props
interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { id, thumbnail, title, price, rating, category } = product;

    return (
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative aspect-square bg-gray-50 p-4">
                <img src={thumbnail} alt={`Gambar produk ${title}`} loading="lazy" className="w-full h-full object-contain mix-blend-multiply" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase text-gray-700">
                    {category}
                </span>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2" title={title}>
                    {title}
                </h2>
                <div className="flex items-center justify-between mt-auto mb-4">
                    <span className="text-xl font-black text-blue-600">${price.toFixed(2)}</span>
                    <span className="flex items-center text-sm font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md" aria-label={`Rating ${rating} dari 5`}>
                        ★ {rating}
                    </span>
                </div>
                {/* Ganti button menjadi Link */}
                <Link
                    to={`/product/${id}`}
                    className="w-full text-center bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2.5 rounded-xl transition-colors"
                >
                    Lihat Detail
                </Link>
            </div>
        </article>
    );
};

export default ProductCard;