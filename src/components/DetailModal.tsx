import { useState, useEffect } from 'react';
import { getProductById } from '../services/api';
import type { Product } from '../types/product';
import StatusMessage from './StatusMessage';

interface DetailModalProps {
    productId: number | null;
    onClose: () => void;
}

const DetailModal = ({ productId, onClose }: DetailModalProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productId === null) return;

        const fetchDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductById(productId);
                setProduct(data);
                setActiveImage(data.images?.[0] || data.thumbnail);
            } catch {
                setError('Gagal memuat detail produk. Periksa koneksi internet Anda.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [productId]);

    if (productId === null) return null;

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Tutup modal detail"
                >
                    &times;
                </button>

                {loading && <StatusMessage type="loading" message="Memuat detail produk..." />}
                {error && <StatusMessage type="error" message={error} />}

                {!loading && !error && product && (
                    <div className="detail-layout">
                        <div className="detail-gallery">
                            <div className="main-image-box">
                                <img src={activeImage} alt={`Tampilan utama ${product.title}`} />
                            </div>
                            {product.images && product.images.length > 1 && (
                                <div className="thumbnail-list">
                                    {product.images.map((imgUrl, index) => (
                                        <button
                                            type="button"
                                            key={`${product.id}-img-${index}`}
                                            className={`thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                                            onClick={() => setActiveImage(imgUrl)}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`Thumbnail ${index + 1} ${product.title}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="detail-info">
                            <span className="badge-category">{product.category}</span>
                            <h2 id="modal-title">{product.title}</h2>
                            <p className="detail-brand">
                                Brand: <strong>{product.brand || 'Tidak tersedia'}</strong>
                            </p>

                            <div className="detail-pricing">
                                <span className="detail-price">${product.price.toFixed(2)}</span>
                                {product.discountPercentage > 0 && (
                                    <span className="detail-discount">
                                        Diskon {product.discountPercentage}%
                                    </span>
                                )}
                            </div>

                            <p className="detail-description">{product.description}</p>

                            <ul className="detail-specs">
                                <li>
                                    <strong>Status Ketersediaan:</strong> {product.availabilityStatus}{' '}
                                    (Stok: {product.stock})
                                </li>
                                <li>
                                    <strong>Garansi:</strong> {product.warrantyInformation}
                                </li>
                                <li>
                                    <strong>Pengiriman:</strong> {product.shippingInformation}
                                </li>
                                <li>
                                    <strong>Kebijakan Retur:</strong> {product.returnPolicy}
                                </li>
                            </ul>

                            <section className="detail-reviews" aria-label="Ulasan Pembeli">
                                <h3>Ulasan Pembeli ({product.reviews?.length || 0})</h3>
                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="review-list">
                                        {product.reviews.map((rev, idx) => (
                                            <article key={`${product.id}-rev-${idx}`} className="review-item">
                                                <div className="review-header">
                                                    <strong>{rev.reviewerName}</strong>
                                                    <span className="card-rating">★ {rev.rating}/5</span>
                                                </div>
                                                <p>{rev.comment}</p>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Belum ada ulasan untuk produk ini.</p>
                                )}
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailModal;