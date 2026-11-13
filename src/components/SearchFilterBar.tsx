import type { FormEvent } from 'react';
import type { Category } from '../types/product';

interface SearchFilterBarProps {
    searchInput: string;
    onSearchInputChange: (value: string) => void;
    onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (slug: string) => void;
    onReset: () => void;
}

const SearchFilterBar = ({
    searchInput,
    onSearchInputChange,
    onSearchSubmit,
    categories,
    selectedCategory,
    onCategoryChange,
    onReset,
}: SearchFilterBarProps) => {
    return (
        <section className="filter-section" aria-label="Pencarian dan Filter Produk">
            <form className="search-form" onSubmit={onSearchSubmit}>
                <div className="form-group">
                    <label htmlFor="search-input">Cari Produk</label>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Contoh: phone, laptop, perfume..."
                        value={searchInput}
                        onChange={(e) => onSearchInputChange(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cari
                </button>
            </form>

            <div className="form-group category-group">
                <label htmlFor="category-select">Filter Kategori</label>
                <select
                    id="category-select"
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
                <button type="button" className="btn btn-secondary" onClick={onReset}>
                    Reset Filter
                </button>
            )}
        </section>
    );
};

export default SearchFilterBar;