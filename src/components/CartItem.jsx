import React from 'react';

// Savatdagi bitta mahsulot komponenti
function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.title} 
        className="cart-item-image" 
      />
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <button onClick={() => onRemove(item.id)}>
        O'chirish
      </button>
    </div>
  );
}

export default CartItem;
