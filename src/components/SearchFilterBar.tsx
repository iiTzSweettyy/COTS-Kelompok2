import type { Category } from '../types/product';

interface SearchFilterBarProps {
    searchInput: string;
    onSearchInputChange: (value: string) => void;
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (slug: string) => void;
    onReset: () => void;
}

const SearchFilterBar = ({
    searchInput,
    onSearchInputChange,
    categories,
    selectedCategory,
    onCategoryChange,
    onReset,
}: SearchFilterBarProps) => {
    return (
        <section className="flex flex-col md:flex-row gap-4 mb-8 items-end" aria-label="Pencarian dan Filter Produk">

            <div className="flex-1 w-full flex flex-col gap-1">
                <label htmlFor="search-input" className="text-sm font-medium text-gray-700">
                    Cari Produk
                </label>
                <input
                    id="search-input"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Ketik untuk mencari (contoh: phone, laptop...)"
                    value={searchInput}
                    onChange={(e) => onSearchInputChange(e.target.value)}
                />
            </div>

            <div className="w-full md:w-64 flex flex-col gap-1">
                <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                    Filter Kategori
                </label>
                <select
                    id="category-select"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">Semua Kategori</option>
                    {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {(searchInput || selectedCategory) && (
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white hover:bg-slate-100 rounded-lg transition-colors h-[42px] border"
                    onClick={onReset}
                >
                    Reset Filter
                </button>
            )}
        </section>
    );
};

export default SearchFilterBar;