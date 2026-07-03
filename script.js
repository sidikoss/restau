// ===== DONNÉES MENU =====
const menuData = {
    burgers: [
        { name: "Le Classic Hero", price: 9.90, desc: "Steak 150g, cheddar, salade, tomate, sauce maison", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", badge: "Best-seller", rating: 5 },
        { name: "Le Super Hero", price: 12.90, desc: "Double steak, bacon, cheddar fondant, oignons caramélisés", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500", badge: "Épicé", rating: 5 },
        { name: "Le Titan", price: 14.90, desc: "Triple steak, 3 fromages, bacon, œuf, sauce BBQ", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500", badge: "XXL", rating: 5 },
        { name: "Le Veggie Hero", price: 10.90, desc: "Galette de légumes, avocat, roquette, sauce yaourt", img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500", badge: "Végé", rating: 4 },
        { name: "Le Chicken Hero", price: 11.50, desc: "Poulet croustillant, coleslaw, sauce ranch", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500", badge: "", rating: 4 },
        { name: "Le Fish Hero", price: 11.90, desc: "Filet de cabillaud pané, tartare, salade croquante", img: "https://images.unsplash.com/photo-1579888944880-d98341245702?w=500", badge: "", rating: 4 }
    ],
    sides: [
        { name: "Frites Maison", price: 4.50, desc: "Double cuisson, sel de Guérande", img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500", badge: "", rating: 5 },
        { name: "Onion Rings", price: 5.50, desc: "Beignets d'oignons croustillants, sauce BBQ", img: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500", badge: "", rating: 4 },
        { name: "Nuggets x8", price: 6.90, desc: "Poulet fermier, 3 sauces au choix", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500", badge: "", rating: 5 },
        { name: "Salade César", price: 7.50, desc: "Poulet grillé, parmesan, croûtons, sauce césar", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500", badge: "Light", rating: 4 }
    ],
    desserts: [
        { name: "Cookie Maison", price: 3.50, desc: "Pépites de chocolat, cœur fondant", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500", badge: "", rating: 5 },
        { name: "Brownie", price: 4.50, desc: "Chocolat noir 70%, noix de pécan", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500", badge: "", rating: 5 },
        { name: "Milkshake", price: 5.90, desc: "Vanille, chocolat, fraise ou caramel", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500", badge: "Populaire", rating: 5 },
        { name: "Tiramisu", price: 5.50, desc: "Fait maison, recette italienne", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500", badge: "", rating: 4 }
    ],
    drinks: [
        { name: "Coca-Cola", price: 2.90, desc: "33cl, bien frais", img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500", badge: "", rating: 4 },
        { name: "Limonade Maison", price: 3.50, desc: "Citron, menthe, gingembre", img: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=500", badge: "Fait maison", rating: 5 },
        { name: "Ice Tea", price: 2.90, desc: "Pêche ou citron, 33cl", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500", badge: "", rating: 4 },
        { name: "Bière Artisanale", price: 5.50, desc: "Brasserie locale, 33cl", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500", badge: "18+", rating: 5 }
    ]
};

// ===== PANIER =====
let cart = JSON.parse(localStorage.getItem('herosCart')) || [];

function saveCart() {
    localStorage.setItem('herosCart', JSON.stringify(cart));
}

function renderMenu(category) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.innerHTML = menuData[category].map(item => `
        <div class="menu-card fade-in visible">
            <div class="menu-card-img">
                <img src="${item.img}" alt="${item.name}">
                ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
            </div>
            <div class="menu-card-body">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${item.name}</h3>
                    <span class="menu-card-price">${item.price.toFixed(2)}€</span>
                </div>
                <p class="menu-card-desc">${item.desc}</p>
                <div class="menu-card-footer">
                    <div class="menu-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(item.rating)}${'<i class="far fa-star"></i>'.repeat(5-item.rating)}
                    </div>
                    <button class="add-cart-btn" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCart();
    const float = document.querySelector('.cart-float');
    if (float) {
        float.style.transform = 'scale(1.3)';
        setTimeout(() => float.style.transform = 'scale(1)', 200);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
    renderCartItems();
}

function updateCart() {
    const el = document.getElementById('cartCount');
    if (el) el.textContent = cart.length;
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-basket" style="font-size:3rem; margin-bottom:15px;"></i><p>Ton panier est vide</p></div>';
        if (totalEl) totalEl.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>${item.price.toFixed(2)}€</span>
            </div>
            <button class="remove-item" onclick="removeFromCart(${i})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalAmount = document.getElementById('totalAmount');
    if (totalAmount) totalAmount.textContent = total.toFixed(2) + '€';
    if (totalEl) totalEl.style.display = 'flex';
    if (checkoutBtn) checkoutBtn.style.display = 'block';
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) renderCartItems();
}

function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`✅ Commande confirmée !\n\nTotal : ${total.toFixed(2)}€\n\nMerci de ta confiance, Héros ! 🦸`);
    cart = [];
    saveCart();
    updateCart();
    toggleCart();
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    if (nav) {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
    if (scrollTop) {
        if (window.scrollY > 500) scrollTop.classList.add('show');
        else scrollTop.classList.remove('show');
    }
});

// ===== MENU BURGER MOBILE =====
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== TABS MENU (index.html) =====
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenu(btn.dataset.category);
        });
    });

    // ===== ANIMATIONS SCROLL =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ===== COMPTEURS ANIMÉS =====
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.dataset.target;
                let count = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        entry.target.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(count);
                    }
                }, 30);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // ===== INIT MENU =====
    renderMenu('burgers');
    updateCart();

    // ===== ORDER PAGE =====
    renderOrderPage();
});

// ===== FORMULAIRES =====
function handleReservation(e) {
    e.preventDefault();
    alert('✅ Réservation envoyée !\n\nNous te confirmerons par email dans l\'heure. À très vite chez Heros Cafe ! 🦸');
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    alert('🎉 Bienvenue dans la Ligue des Héros !\n\nTon code -10% : HEROS10');
    e.target.reset();
}

function handleOrder(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Ton panier est vide ! Ajoute des articles avant de commander.');
        return;
    }
    const name = document.getElementById('orderName').value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`✅ Commande confirmée ${name} !\n\nTotal : ${total.toFixed(2)}€\n\nPrépare-toi à recevoir la visite d\'un héros 🦸`);
    cart = [];
    saveCart();
    updateCart();
    renderOrderPage();
    e.target.reset();
}

// ===== ORDER PAGE =====
function renderOrderPage() {
    const container = document.getElementById('orderItems');
    const totalEl = document.getElementById('orderTotal');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-order"><i class="fas fa-shopping-basket"></i><p>Ton panier est vide.</p><p style="margin-top: 10px;"><a href="Menu.html" class="btn btn-primary">Voir le menu</a></p></div>';
        if (totalEl) totalEl.textContent = '0.00€';
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="order-item">
            <div>
                <h4>${item.name}</h4>
            </div>
            <div>
                <span>${item.price.toFixed(2)}€</span>
                <button class="remove-item" onclick="removeFromCart(${i}); renderOrderPage();" style="margin-left: 10px; background: var(--primary); color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (totalEl) totalEl.textContent = total.toFixed(2) + '€';
}

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);
});
