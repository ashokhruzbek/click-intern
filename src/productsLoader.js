// Vanilla JS - Mahsulotlarni yuklash va ko'rsatish
// Bu qism React ishlatmasdan yozilgan

let allProducts = [];

// API dan mahsulotlarni yuklash
export async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    allProducts = products;
    return products;
  } catch (error) {
    console.error('Mahsulotlarni yuklashda xatolik:', error);
    return [];
  }
}

// Mahsulot kartochkasini yaratish
export function createProductCard(product, onAddToCart) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <h3 class="product-title">${product.title}</h3>
    <p class="product-price">$${product.price.toFixed(2)}</p>
    <button class="btn btn-primary" data-id="${product.id}">Add to Cart</button>
  `;
  
  // Tugmaga event listener qo'shish
  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    onAddToCart(product);
  });
  
  return card;
}

// Mahsulotlar ro'yxatini render qilish
export function renderProducts(containerId, products, onAddToCart) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }
  
  // Avvalgi mahsulotlarni tozalash
  container.innerHTML = '';
  
  if (products.length === 0) {
    container.innerHTML = '<p class="loading">Mahsulotlar topilmadi</p>';
    return;
  }
  
  // Har bir mahsulot uchun kartochka yaratish
  products.forEach(product => {
    const card = createProductCard(product, onAddToCart);
    container.appendChild(card);
  });
}

// Loading holatini ko'rsatish
export function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '<p class="loading">Yuklanmoqda...</p>';
  }
}
