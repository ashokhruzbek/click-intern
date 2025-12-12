import React from 'react';
import CartItem from './CartItem';

// Savat ro'yxati komponenti
function CartList({ items, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Savat bo'sh</p>
      </div>
    );
  }

  return (
    <div className="cart-list">
      {items.map(item => (
        <CartItem 
          key={item.id} 
          item={item} 
          onRemove={onRemove} 
        />
      ))}
    </div>
  );
}

export default CartList;
