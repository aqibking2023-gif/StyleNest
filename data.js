// data.js - Firebase Cloud Database for StyleNest
// ✅ Works on GitHub Pages (Static Hosting)

// Firebase SDK - CDN Imports (Browser Compatible)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, doc, 
  updateDoc, deleteDoc, setDoc, query, orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 Your Firebase Config (Auto-filled)
const firebaseConfig = {
  apiKey: "AIzaSyC1Q2cIGX1Pj7OfGWX8dbqx2DapAyXGAeM",
  authDomain: "stylenest-46e83.firebaseapp.com",
  projectId: "stylenest-46e83",
  storageBucket: "stylenest-46e83.firebasestorage.app",
  messagingSenderId: "411766873507",
  appId: "1:411766873507:web:0f19d36142ffee21b10e16",
  measurementId: "G-WP22MDJ39V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collections
const PRODUCTS_COL = collection(db, 'products');
const ORDERS_COL = collection(db, 'orders');

// ==================== PRODUCTS FUNCTIONS ====================

// Load all products from cloud
window.loadProducts = async function() {
  try {
    const q = query(PRODUCTS_COL, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    window.products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return window.products;
  } catch (err) {
    console.error("❌ Error loading products:", err);
    window.products = [];
    return [];
  }
};

// Add or Update product
window.saveProduct = async function(product) {
  try {
    product.updatedAt = new Date().toISOString();
    
    if (product.id && product.id.startsWith('prod_')) {
      // Update existing
      await setDoc(doc(db, 'products', product.id), product);
    } else {
      // Add new with custom ID
      product.id = 'prod_' + Date.now();
      product.createdAt = new Date().toISOString();
      await setDoc(doc(db, 'products', product.id), product);
    }
    return { success: true, id: product.id };
  } catch (err) {
    console.error("❌ Error saving product:", err);
    alert("⚠️ Save failed. Check internet connection.");
    return { success: false, error: err.message };
  }
};

// Delete product
window.deleteProduct = async function(id) {
  try {
    await deleteDoc(doc(db, 'products', id));
    return true;
  } catch (err) {
    console.error("❌ Error deleting:", err);
    return false;
  }
};

// ==================== ORDERS FUNCTIONS ====================

// Load all orders
window.loadOrders = async function() {
  try {
    const q = query(ORDERS_COL, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("❌ Error loading orders:", err);
    return [];
  }
};

// Place new order
window.saveOrder = async function(order) {
  try {
    order.id = 'ORD-' + Date.now();
    order.createdAt = new Date().toISOString();
    order.status = 'Pending';
    
    await setDoc(doc(db, 'orders', order.id), order);
    return { success: true, orderId: order.id };
  } catch (err) {
    console.error("❌ Error placing order:", err);
    return { success: false, error: err.message };
  }
};

// Update order status
window.updateOrderStatus = async function(orderId, status) {
  try {
    await updateDoc(doc(db, 'orders', orderId), { 
      status, 
      updatedAt: new Date().toISOString() 
    });
    return true;
  } catch (err) {
    console.error("❌ Error updating order:", err);
    return false;
  }
};

// Delete order
window.deleteOrder = async function(orderId) {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
    return true;
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    return false;
  }
};

// ==================== UTILS ====================

// Clear all data (for testing only - BE CAREFUL!)
window.clearAllData = async function() {
  if (!confirm("⚠️ WARNING: This will delete ALL products and orders! Continue?")) {
    return false;
  }
  try {
    // Delete all products
    const products = await getDocs(PRODUCTS_COL);
    for (const p of products.docs) {
      await deleteDoc(doc(db, 'products', p.id));
    }
    // Delete all orders
    const orders = await getDocs(ORDERS_COL);
    for (const o of orders.docs) {
      await deleteDoc(doc(db, 'orders', o.id));
    }
    alert("✅ All data cleared!");
    return true;
  } catch (err) {
    console.error("❌ Error clearing data:", err);
    return false;
  }
};

// Initialize empty arrays if not exists
window.products = [];
window.orders = [];

console.log("✅ StyleNest Firebase connected!");
