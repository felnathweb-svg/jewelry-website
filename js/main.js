// ===== PRODUCT DATA =====
const products = [
  { id: 1, name: "Diamond Solitaire Ring", category: "rings", price: 1299, oldPrice: 1599, rating: 5, badge: "Bestseller", icon: "fa-ring" },
  { id: 2, name: "Gold Chain Necklace", category: "necklaces", price: 849, oldPrice: null, rating: 5, badge: null, icon: "fa-link" },
  { id: 3, name: "Pearl Drop Earrings", category: "earrings", price: 349, oldPrice: 499, rating: 4, badge: "Sale", icon: "fa-circle" },
  { id: 4, name: "Rose Gold Bracelet", category: "bracelets", price: 599, oldPrice: null, rating: 5, badge: "New", icon: "fa-band-aid" },
  { id: 5, name: "Sapphire Halo Ring", category: "rings", price: 1899, oldPrice: 2299, rating: 5, badge: "Sale", icon: "fa-ring" },
  { id: 6, name: "Diamond Tennis Bracelet", category: "bracelets", price: 2499, oldPrice: null, rating: 5, badge: "Premium", icon: "fa-band-aid" },
  { id: 7, name: "Emerald Pendant", category: "necklaces", price: 1099, oldPrice: 1399, rating: 4, badge: null, icon: "fa-link" },
  { id: 8, name: "Gold Hoop Earrings", category: "earrings", price: 279, oldPrice: null, rating: 5, badge: "New", icon: "fa-circle" },
];

let cart = [];
let activeFilter = "all";

// ===== RENDER PRODUCTS =====
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">
        <img src="images/products/${p.id}.jpg" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <div class="product-actions">
          <button class="action-btn" title="Wishlist"><i class="fas fa-heart"></i></button>
          <button class="action-btn" title="Quick View"><i class="fas fa-eye"></i></button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          ${Array(5).fill(0).map((_, i) =>
            `<i class="fas fa-star${i >= p.rating ? '-o' : ''}"></i>`
          ).join("")}
        </div>
        <div class="product-footer">
          <div>
            <span class="product-price">$${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="product-old-price">$${p.oldPrice.toLocaleString()}</span>` : ""}
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

// ===== CART =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("cartTotal").textContent = `$${total.toLocaleString()}`;

  const cartItemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img"><i class="fas ${item.icon}"></i></div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toLocaleString()} × ${item.qty}</p>
      </div>
      <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${item.id})"></i>
    </div>
  `).join("");
}

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ===== FILTER TABS =====
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

// ===== MOBILE MENU =====
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

// ===== CART EVENTS =====
document.getElementById("cartIcon").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("overlay").addEventListener("click", closeCart);

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const success = document.getElementById("formSuccess");
  success.style.display = "block";
  e.target.reset();
  setTimeout(() => { success.style.display = "none"; }, 4000);
});

// ===== SMOOTH SCROLL for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("navLinks").classList.remove("open");
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== INIT =====
renderProducts();
