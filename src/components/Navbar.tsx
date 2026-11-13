import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <nav
                className={`bg-blue-500/90 backdrop-blur-md rounded-full shadow-lg shadow-blue-500/20 flex items-center border border-white/20 transition-all duration-500 overflow-hidden ${isScrolled
                        ? 'w-full max-w-sm h-12 px-6 justify-center'
                        : 'w-full max-w-4xl h-16 px-8 justify-between'
                    }`}
                aria-label="Navigasi Utama"
            >
                <h1 className={`font-bold text-white tracking-wide transition-all duration-500 whitespace-nowrap ${isScrolled ? 'text-base' : 'text-lg'
                    }`}>
                    TokoKita
                </h1>

                <div
                    className={`transition-all duration-500 flex items-center overflow-hidden ${isScrolled
                            ? 'w-0 opacity-0 scale-50'
                            : 'w-auto opacity-100 scale-100'
                        }`}
                >
                    <span className="text-blue-100 text-sm font-medium bg-blue-600/50 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                        DummyJSON Store
                    </span>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;