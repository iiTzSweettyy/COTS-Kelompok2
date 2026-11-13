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
        <nav
            className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row"
            aria-label="Navigasi Halaman Produk"
        >
            <p className="text-sm text-neutral-600">
                Halaman <span className="font-semibold text-neutral-900">{currentPage}</span> dari{' '}
                <span className="font-semibold text-neutral-900">{totalPages}</span>{' '}
                <span className="text-neutral-400">({total} produk)</span>
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    disabled={!hasPrev}
                    onClick={() => onPageChange(Math.max(0, skip - limit))}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
                >
                    <span aria-hidden="true">&larr;</span>
                    Sebelumnya
                </button>

                <button
                    type="button"
                    disabled={!hasNext}
                    onClick={() => onPageChange(skip + limit)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
                >
                    Berikutnya
                    <span aria-hidden="true">&rarr;</span>
                </button>
            </div>
        </nav>
    );
};

export default Pagination;