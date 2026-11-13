interface PaginationProps {
    skip: number;
    limit: number;
    total: number;
    onPageChange: (newSkip: number) => void;
}

const Pagination = ({ skip, limit, total, onPageChange }: PaginationProps) => {
    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const hasPrev = skip > 0;
    const hasNext = skip + limit < total;

    if (total === 0) return null;

    return (
        <nav className="pagination" aria-label="Navigasi Halaman Produk">
            <button
                type="button"
                className="btn btn-secondary"
                disabled={!hasPrev}
                onClick={() => onPageChange(Math.max(0, skip - limit))}
            >
                &laquo; Sebelumnya
            </button>

            <span className="page-info">
                Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>{' '}
                (Total {total} produk)
            </span>

            <button
                type="button"
                className="btn btn-secondary"
                disabled={!hasNext}
                onClick={() => onPageChange(skip + limit)}
            >
                Berikutnya &raquo;
            </button>
        </nav>
    );
};

export default Pagination;