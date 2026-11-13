import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import './App.css';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Navbar />
      <CatalogPage />
      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2026 Product Catalog App &mdash; Powered by React, TypeScript 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;