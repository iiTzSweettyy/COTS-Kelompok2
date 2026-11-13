import type { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
    onSelectProduct: (id: number) => void;
}

const ProductCard = ({ product, onSelectProduct }: ProductCardProps) => {
    const { id, thumbnail, title, price, rating, category } = product;

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-md">
            <div className="relative w-full overflow-hidden bg-neutral-100">
                <img
                    src={thumbnail}
                    alt={`Gambar produk ${title}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium capitalize text-neutral-700 shadow-sm backdrop-blur-sm">
                    {category}
                </span>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-4">
                <h2
                    className="line-clamp-1 text-base font-medium text-neutral-900"
                    title={title}
                >
                    {title}
                </h2>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-900">
                        ${price.toFixed(2)}
                    </span>
                    <span
                        className="flex items-center gap-1 text-sm font-medium text-neutral-600"
                        aria-label={`Rating ${rating} dari 5`}
                    >
                        <span className="text-amber-400">★</span>
                        {rating.toFixed(1)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => onSelectProduct(id)}
                    className="mt-4 w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-[0.98]"
                >
                    Lihat Detail
                </button>
            </div>
        </article>
    );
};

export default ProductCard;