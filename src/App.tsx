import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <CatalogPage />
      <footer className="footer">
        <div className="container">
          <p>
            &copy; Kelompok2 catalog App &mdash; Powered by React, TypeScript &amp;
            DummyJSON
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;