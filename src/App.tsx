import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import './App.css';

function App() {
  return (
    <div className="">
      <Navbar />
      <CatalogPage />
      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2026 Product Catalog App &mdash; Powered by React, TypeScript &amp;
            DummyJSON
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;