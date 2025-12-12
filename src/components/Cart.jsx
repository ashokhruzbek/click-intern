import React, { useState, useEffect } from 'react';
import CartList from './CartList';

// Asosiy savat komponenti
function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // localStorage'dan savatni yuklash
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Savatni yuklashda xatolik:', error);
      }
    }
  }, []);

  // Savat o'zgarganda localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Global event dispatch qilish (products qismiga xabar berish uchun)
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { items: cartItems } 
    }));
  }, [cartItems]);

  // Mahsulotni savatga qo'shish
  const addToCart = (product) => {
    // Mahsulot allaqachon savatda bor-yo'qligini tekshirish
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Agar bor bo'lsa, xabar berish (yoki miqdorni oshirish)
      alert('Bu mahsulot allaqachon savatda!');
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  // Mahsulotni savatdan o'chirish
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Umumiy summani hisoblash
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Global funksiyani belgilash (products qismidan chaqirish uchun)
  useEffect(() => {
    window.addToCart = addToCart;
    return () => {
      delete window.addToCart;
    };
  }, [cartItems]);

  return (
    <div className="cart-section">
      <h2>Savat</h2>
      
      <CartList items={cartItems} onRemove={removeFromCart} />
      
      <div className="cart-summary">
        <p className="cart-count">
          Mahsulotlar soni: {cartItems.length}
        </p>
        <p className="cart-total">
          Jami: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Cart;
