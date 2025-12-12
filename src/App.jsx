import { useEffect } from 'react';
import Cart from './components/Cart';
import { loadProducts, renderProducts, showLoading } from './productsLoader';
import './App.css';

function App() {
  useEffect(() => {
    // Sahifa yuklanganda mahsulotlarni olish
    const initProducts = async () => {
      // Loading holatini ko'rsatish
      showLoading('products-container');
      
      // Mahsulotlarni yuklash
      const products = await loadProducts();
      
      // Mahsulotlarni render qilish
      // onAddToCart funksiyasi - global window.addToCart ishlatamiz
      renderProducts('products-container', products, (product) => {
        if (window.addToCart) {
          window.addToCart(product);
        }
      });
    };
    
    initProducts();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="container">
          <h1>Click Intern</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="marketplace-layout">
          {/* Products Section - Vanilla JS */}
          <div className="products-section">
            <h2>Mahsulotlar</h2>
            <div id="products-container" className="products-grid">
              {/* Products will be rendered here by Vanilla JS */}
            </div>
          </div>

          {/* Cart Section - React Component */}
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;
