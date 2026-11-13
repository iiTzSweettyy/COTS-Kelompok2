import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Product } from '../types/product';
import StatusMessage from '../components/StatusMessage';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        const fetchProductDetail = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
                setMainImage(response.data.images[0] || response.data.thumbnail);
            } catch (err) {
                setErrorMessage(`Gagal memuat detail produk. Produk mungkin tidak ditemukan, ${err}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchProductDetail();
    }, [id]);

    if (isLoading) {
        return (
            <main className="pt-28 px-4 max-w-7xl mx-auto min-h-screen">
                <StatusMessage type="loading" message="Memuat detail produk..." />
            </main>
        );
    }

    if (errorMessage || !product) {
        return (
            <main className="pt-28 px-4 max-w-7xl mx-auto min-h-screen">
                <StatusMessage type="error" message={errorMessage} onRetry={() => window.location.reload()} />
                <div className="flex justify-center mt-4">
                    <Link to="/" className="text-blue-500 hover:underline">Kembali ke Katalog</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-28 px-4 pb-16 max-w-7xl mx-auto min-h-screen">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
                &larr; Kembali
            </button>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="w-full aspect-square bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                        <img src={mainImage} alt={product.title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`flex-shrink-0 w-20 h-20 bg-white rounded-xl p-2 border-2 transition-all ${mainImage === img ? 'border-blue-500 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <img src={img} alt={`${product.title} ${idx}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                            {product.category}
                        </span>
                        <span className="flex items-center text-yellow-500 text-sm font-bold">
                            ★ {product.rating}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
                    {product.brand && <p className="text-gray-500 text-lg mb-6">by <span className="font-semibold text-gray-700">{product.brand}</span></p>}

                    <div className="flex items-end gap-4 mb-6">
                        <span className="text-4xl font-black text-gray-900">${product.price}</span>
                        {product.discountPercentage > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-lg mb-1">
                                {product.discountPercentage}% OFF
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 font-medium mb-1">Status Stok</p>
                            <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {product.availabilityStatus} ({product.stock} tersisa)
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 font-medium mb-1">Pengiriman</p>
                            <p className="font-semibold text-gray-800">{product.shippingInformation}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 font-medium mb-1">Garansi</p>
                            <p className="font-semibold text-gray-800">{product.warrantyInformation}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 font-medium mb-1">Kebijakan Retur</p>
                            <p className="font-semibold text-gray-800">{product.returnPolicy}</p>
                        </div>
                    </div>

                    <div className="mb-8 flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg border border-gray-200">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                        Tambahkan ke Keranjang
                    </button>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Ulasan Pembeli</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.reviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-900">{review.reviewerName}</h4>
                                <span className="text-yellow-500 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                            </div>
                            <p className="text-gray-600 text-sm italic mb-2">"{review.comment}"</p>
                            <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('id-ID')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;