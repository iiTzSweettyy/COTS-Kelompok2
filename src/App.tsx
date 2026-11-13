import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './components/ProductDetailPage';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <Outlet />
      <footer className="mt-12 border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        <p>
          &copy; 2026 Product Catalog App &mdash; Powered by React, TypeScript
          &amp; DummyJSON
        </p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>

          <Route index element={<CatalogPage />} />

          <Route path="product/:id" element={<ProductDetailPage />} />

          <Route
            path="*"
            element={
              <main className="pt-32 px-4 text-center">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-gray-500 mt-2">Halaman tidak ditemukan.</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;