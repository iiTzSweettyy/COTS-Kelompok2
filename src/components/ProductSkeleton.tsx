interface ProductSkeletonProps {
    count?: number;
}

const ProductSkeleton = ({ count = 8 }: ProductSkeletonProps) => {
    return (
        <section
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
            aria-label="Memuat daftar produk"
            aria-busy="true"
        >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white"
                    >
                        <div className=" w-full animate-pulse bg-neutral-200" />

                        <div className="flex flex-1 flex-col p-4">
                            <div className="h-5 w-3/4 animate-pulse rounded-md bg-neutral-200" />

                            <div className="mt-3 flex items-center justify-between">
                                <div className="h-6 w-1/3 animate-pulse rounded-md bg-neutral-200" />
                                <div className="h-4 w-12 animate-pulse rounded-md bg-neutral-200" />
                            </div>

                            <div className="mt-4 h-9 w-full animate-pulse rounded-lg bg-neutral-200" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductSkeleton;