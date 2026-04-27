// data.js - Global Data & Config
let products = [];

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'stylenest123' // ⚠️ LIVE KARNE SE PEHLE CHANGE KAREIN!
};

function loadProducts() {
  const stored = localStorage.getItem('stylenest_products');
  if (stored) {
    try { products = JSON.parse(stored); } 
    catch (e) { products = []; localStorage.removeItem('stylenest_products'); }
  }
  return products;
}

function saveProducts() {
  try { localStorage.setItem('stylenest_products', JSON.stringify(products)); }
  catch (e) { alert('⚠️ Storage full! Images compress karein ya kuch products delete karein.'); }
}

loadProducts();
