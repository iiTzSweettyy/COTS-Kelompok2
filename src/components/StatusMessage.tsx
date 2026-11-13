interface StatusMessageProps {
    type: 'loading' | 'error' | 'empty';
    message?: string;
    onRetry?: () => void;
}

const StatusMessage = ({ type, message, onRetry }: StatusMessageProps) => {
    if (type === 'loading') {
        return (
            <div className="status-box status-loading" role="status" aria-live="polite">
                <div className="spinner" aria-hidden="true"></div>
                <p>{message || 'Memuat data produk...'}</p>
            </div>
        );
    }

    if (type === 'error') {
        return (
            <div className="status-box status-error" role="alert">
                <h3>Terjadi Kesalahan</h3>
                <p>{message || 'Gagal mengambil data dari server.'}</p>
                {onRetry && (
                    <button type="button" className="btn btn-primary" onClick={onRetry}>
                        Coba Lagi
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="status-box status-empty" role="status">
            <h3>Produk Tidak Ditemukan</h3>
            <p>
                {message ||
                    'Tidak ada produk yang sesuai dengan kata kunci atau kategori pilihan Anda.'}
            </p>
        </div>
    );
};

export default StatusMessage;