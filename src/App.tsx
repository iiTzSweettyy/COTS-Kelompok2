import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './components/ProductDetailPage';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <Outlet />
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