// Products Data Store
let products = [];

// Admin Credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'stylenest123' // ✅ Change this before going live!
};

// LocalStorage Management
function loadProducts() {
  const stored = localStorage.getItem('stylenest_products');
  if (stored) {
    try {
      products = JSON.parse(stored);
    } catch (e) {
      products = [];
      localStorage.removeItem('stylenest_products');
    }
  }
  return products;
}

function saveProducts() {
  try {
    localStorage.setItem('stylenest_products', JSON.stringify(products));
  } catch (e) {
    alert('⚠️ Storage full! Delete some products or use smaller images.');
  }
}

// Initialize
loadProducts();
