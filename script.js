// ==========================================
// HEROS CAFE - Main JavaScript
// ==========================================

// ===== MENU DATA =====
const menuData = {
    burgers: [
        { name: "Le Classic Hero", price: 9.90, desc: "Steak 150g, cheddar, salade, tomate, sauce maison", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fm=webp", badge: "Best-seller", rating: 5 },
        { name: "Le Super Hero", price: 12.90, desc: "Double steak, bacon, cheddar fondant, oignons caramélisés", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&fm=webp", badge: "Épicé", rating: 5 },
        { name: "Le Titan", price: 14.90, desc: "Triple steak, 3 fromages, bacon, œuf, sauce BBQ", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&fm=webp", badge: "XXL", rating: 5 },
        { name: "Le Veggie Hero", price: 10.90, desc: "Galette de légumes, avocat, roquette, sauce yaourt", img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&fm=webp", badge: "Végé", rating: 4 },
        { name: "Le Chicken Hero", price: 11.50, desc: "Poulet croustillant, coleslaw, sauce ranch", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&fm=webp", badge: "", rating: 4 },
        { name: "Le Fish Hero", price: 11.90, desc: "Filet de cabillaud pané, tartare, salade croquante", img: "https://images.unsplash.com/photo-1579888944880-d98341245702?w=500&fm=webp", badge: "", rating: 4 }
    ],
    sides: [
        { name: "Frites Maison", price: 4.50, desc: "Double cuisson, sel de Guérande", img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&fm=webp", badge: "", rating: 5 },
        { name: "Onion Rings", price: 5.50, desc: "Beignets d'oignons croustillants, sauce BBQ", img: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&fm=webp", badge: "", rating: 4 },
        { name: "Nuggets x8", price: 6.90, desc: "Poulet fermier, 3 sauces au choix", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&fm=webp", badge: "", rating: 5 },
        { name: "Salade César", price: 7.50, desc: "Poulet grillé, parmesan, croûtons, sauce césar", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&fm=webp", badge: "Light", rating: 4 }
    ],
    desserts: [
        { name: "Cookie Maison", price: 3.50, desc: "Pépites de chocolat, cœur fondant", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&fm=webp", badge: "", rating: 5 },
        { name: "Brownie", price: 4.50, desc: "Chocolat noir 70%, noix de pécan", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&fm=webp", badge: "", rating: 5 },
        { name: "Milkshake", price: 5.90, desc: "Vanille, chocolat, fraise ou caramel", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&fm=webp", badge: "Populaire", rating: 5 },
        { name: "Tiramisu", price: 5.50, desc: "Fait maison, recette italienne", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&fm=webp", badge: "", rating: 4 }
    ],
    drinks: [
        { name: "Coca-Cola", price: 2.90, desc: "33cl, bien frais", img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&fm=webp", badge: "", rating: 4 },
        { name: "Limonade Maison", price: 3.50, desc: "Citron, menthe, gingembre", img: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=500&fm=webp", badge: "Fait maison", rating: 5 },
        { name: "Ice Tea", price: 2.90, desc: "Pêche ou citron, 33cl", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&fm=webp", badge: "", rating: 4 },
        { name: "Bière Artisanale", price: 5.50, desc: "Brasserie locale, 33cl", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&fm=webp", badge: "18+", rating: 5 }
    ]
};

// ===== PANIER AVEC QUANTITÉS =====
let cart = JSON.parse(localStorage.getItem('herosCart')) || [];
cart = Array.isArray(cart)
    ? cart
        .map(item => {
            const qty = Number(item.qty || 1);
            return {
                name: String(item.name || ''),
                price: Number(item.price),
                qty: Number.isFinite(qty) ? Math.max(1, qty) : 1
            };
        })
        .filter(item => item.name && Number.isFinite(item.price))
    : [];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
    return escapeHTML(value).replace(/`/g, '&#096;');
}

function ensureFieldError(input) {
    const group = input.closest('.form-group') || input.parentElement;
    if (!group) return null;

    let error = group.querySelector('.form-error');
    if (!error) {
        error = document.createElement('div');
        error.className = 'form-error';
        error.setAttribute('role', 'alert');
        error.setAttribute('aria-live', 'polite');
        group.appendChild(error);
    }

    if (!input.id) {
        const base = (input.name || input.placeholder || input.type || 'field')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'field';
        input.id = `${base}-${Math.random().toString(36).slice(2, 8)}`;
    }

    const label = group.querySelector('label');
    if (label && !label.getAttribute('for')) label.setAttribute('for', input.id);

    const errorId = `${input.id}-error`;
    error.id = errorId;
    input.setAttribute('aria-describedby', errorId);
    return error;
}

function saveCart() {
    localStorage.setItem('herosCart', JSON.stringify(cart));
    updateCartUI();
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    showToast(`${name} ajouté au panier.`, 'success');
    const float = document.querySelector('.cart-float');
    if (float) {
        float.style.transform = 'scale(1.2)';
        setTimeout(() => float.style.transform = 'scale(1)', 300);
    }
    const count = document.querySelector('.cart-count');
    if (count) {
        count.classList.add('bounce');
        setTimeout(() => count.classList.remove('bounce'), 300);
    }
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart();
    showToast(`${item.name} retiré du panier.`, 'info');
    renderCartItems();
    renderOrderPage();
}

function updateQty(index, delta) {
    const item = cart[index];
    const newQty = (item.qty || 1) + delta;
    if (newQty <= 0) {
        removeFromCart(index);
        return;
    }
    item.qty = newQty;
    saveCart();
    renderCartItems();
    renderOrderPage();
}

function updateCartUI() {
    const el = document.getElementById('cartCount');
    if (el) {
        el.textContent = getCartCount();
        el.classList.add('bounce');
        setTimeout(() => el.classList.remove('bounce'), 300);
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-basket"></i><p>Ton panier est vide</p><p style="margin-top:10px;font-size:0.9rem;">Ajoute des articles depuis le menu !</p></div>';
        if (totalEl) totalEl.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${escapeHTML(item.name)}</h4>
                <span>${(item.price * (item.qty || 1)).toFixed(2)}€</span>
            </div>
            <div class="cart-item-qty">
                <button class="qty-minus" onclick="updateQty(${i}, -1)" aria-label="Retirer une unité de ${escapeAttr(item.name)}">−</button>
                <span style="font-weight:600;min-width:20px;text-align:center;">${item.qty || 1}</span>
                <button class="qty-plus" onclick="updateQty(${i}, 1)" aria-label="Ajouter une unité de ${escapeAttr(item.name)}">+</button>
                <button class="remove-item" onclick="removeFromCart(${i})" aria-label="Supprimer ${escapeAttr(item.name)}"><i class="fas fa-trash" aria-hidden="true"></i></button>
            </div>
        </div>
    `).join('');

    const total = getCartTotal();
    const totalAmount = document.getElementById('totalAmount');
    if (totalAmount) totalAmount.textContent = total.toFixed(2) + '€';
    if (totalEl) totalEl.style.display = 'flex';
    if (checkoutBtn) checkoutBtn.style.display = 'block';
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        renderCartItems();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function checkout() {
    if (cart.length === 0) return;
    const total = getCartTotal();
    const count = getCartCount();
    showToast(`Commande de ${count} articles confirmée. Total : ${total.toFixed(2)}€`, 'success');
    triggerConfetti();
    cart = [];
    saveCart();
    toggleCart();
    showConfirmation('Commande confirmée', `${count} articles · ${total.toFixed(2)}€`, 'Prépare-toi, héros. Ta commande est en cours de préparation.');
}

function buyNow(name, price) {
    addToCart(name, price);
    toggleCart();
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-exclamation',
        info: 'fa-circle-info'
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `<span class="toast-icon"><i class="fas ${icons[type] || icons.info}" aria-hidden="true"></i></span><span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== RENDER MENU (Index) =====
function renderMenu(category, searchTerm = '') {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    let items = menuData[category];
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        items = items.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.desc.toLowerCase().includes(term)
        );
    }

    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--gray-dark);">
            <i class="fas fa-search" style="font-size:3rem;margin-bottom:15px;opacity:0.3;"></i>
            <p>Aucun résultat pour "${escapeHTML(searchTerm)}"</p>
        </div>`;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="menu-card fade-in visible">
            <div class="menu-card-img">
                <img src="${escapeAttr(item.img)}" alt="${escapeAttr(item.name)}" loading="lazy">
                ${item.badge ? `<span class="menu-badge">${escapeHTML(item.badge)}</span>` : ''}
            </div>
            <div class="menu-card-body">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${escapeHTML(item.name)}</h3>
                    <span class="menu-card-price">${item.price.toFixed(2)}€</span>
                </div>
                <p class="menu-card-desc">${escapeHTML(item.desc)}</p>
                <div class="menu-card-footer">
                    <div class="menu-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(item.rating)}${'<i class="far fa-star"></i>'.repeat(5 - item.rating)}
                    </div>
                    <button class="add-cart-btn" onclick="addToCart('${item.name.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}', ${item.price})" title="Ajouter au panier" aria-label="Ajouter ${escapeAttr(item.name)} au panier">
                        <i class="fas fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== DARK MODE =====
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('herosTheme', newTheme);
    document.querySelectorAll('.theme-toggle').forEach(button => {
        const icon = button.querySelector('i');
        if (icon) icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        button.setAttribute('aria-label', newTheme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
        button.setAttribute('title', newTheme === 'dark' ? 'Mode clair' : 'Mode sombre');
    });
    const mobileLink = document.querySelector('.theme-toggle-mobile a');
    if (mobileLink) {
        const darkMode = newTheme === 'dark';
        mobileLink.innerHTML = `<i class="fas ${darkMode ? 'fa-sun' : 'fa-moon'}"></i> ${darkMode ? 'Mode clair' : 'Mode sombre'}`;
        mobileLink.setAttribute('aria-label', darkMode ? 'Activer le mode clair' : 'Activer le mode sombre');
    }
}

function loadTheme() {
    const saved = localStorage.getItem('herosTheme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        document.querySelectorAll('.theme-toggle').forEach(button => {
            const icon = button.querySelector('i');
            if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            button.setAttribute('aria-label', saved === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
            button.setAttribute('title', saved === 'dark' ? 'Mode clair' : 'Mode sombre');
        });
        const mobileLink = document.querySelector('.theme-toggle-mobile a');
        if (mobileLink) {
            const darkMode = saved === 'dark';
            mobileLink.innerHTML = `<i class="fas ${darkMode ? 'fa-sun' : 'fa-moon'}"></i> ${darkMode ? 'Mode clair' : 'Mode sombre'}`;
            mobileLink.setAttribute('aria-label', darkMode ? 'Activer le mode clair' : 'Activer le mode sombre');
        }
    } else {
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.setAttribute('aria-label', 'Activer le mode sombre');
        });
    }
}

// ===== SCROLL PROGRESS =====
function updateScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
        bar.style.width = '0%';
        return;
    }
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';

    const ring = document.getElementById('scrollRing');
    if (ring) {
        const circumference = 151;
        ring.style.strokeDashoffset = circumference - (progress / 100) * circumference;
    }
}

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    const containers = document.querySelectorAll('.combo-countdown');
    if (!containers.length) return;

    let hours = 5, minutes = 30, seconds = 0;
    setInterval(() => {
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; }

        containers.forEach(c => {
            c.querySelector('.countdown-number.hours').textContent = String(hours).padStart(2, '0');
            c.querySelector('.countdown-number.minutes').textContent = String(minutes).padStart(2, '0');
            c.querySelector('.countdown-number.seconds').textContent = String(seconds).padStart(2, '0');
        });
    }, 1000);
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.querySelector('.hero-particles');
    if (container) container.innerHTML = '';
}

// ===== FORM VALIDATION =====
function validateField(input) {
    const error = ensureFieldError(input);
    if (!error) return true;

    if (input.hasAttribute('required') && !input.value.trim()) {
        error.textContent = 'Ce champ est requis';
        error.classList.add('show');
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return false;
    }

    if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        error.textContent = 'Adresse email invalide';
        error.classList.add('show');
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return false;
    }

    if (input.type === 'tel' && input.value && !/^[0-9\s\+]{10,}$/.test(input.value)) {
        error.textContent = 'Numéro de téléphone invalide';
        error.classList.add('show');
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return false;
    }

    error.classList.remove('show');
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    return true;
}

// ===== LIGHTBOX =====
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(imgSrc) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const img = lb.querySelector('img');
    if (img) img.src = imgSrc;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Collect all gallery images for prev/next
    lightboxImages = [];
    document.querySelectorAll('.gallery-item img, .carousel-slide img').forEach((el) => {
        const src = el.getAttribute('src') || el.src;
        if (src && !lightboxImages.includes(src)) lightboxImages.push(src);
    });
    lightboxIndex = lightboxImages.indexOf(imgSrc);
    if (lightboxIndex === -1) lightboxIndex = 0;
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    if (lightboxImages.length < 2) return;
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    const img = document.querySelector('#lightbox img');
    if (img) img.src = lightboxImages[lightboxIndex];
}

function nextImage() {
    if (lightboxImages.length < 2) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    const img = document.querySelector('#lightbox img');
    if (img) img.src = lightboxImages[lightboxIndex];
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
        toastContainer.setAttribute('aria-live', 'polite');
        toastContainer.setAttribute('aria-atomic', 'true');
    }

    // Burger menu
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.querySelector('.nav-overlay');

    if (burger && navLinks) {
        burger.setAttribute('role', 'button');
        burger.setAttribute('tabindex', burger.getAttribute('tabindex') || '0');
        burger.setAttribute('aria-controls', 'navLinks');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Ouvrir le menu');

        function closeMenu() {
            navLinks.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Ouvrir le menu');
        }

        function toggleMenu() {
            const isOpen = navLinks.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
            burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
        }

        burger.addEventListener('click', () => {
            toggleMenu();
        });
        burger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                closeMenu();
            });
        }
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    // Menu tabs (index.html)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const search = document.getElementById('menuSearch');
            renderMenu(btn.dataset.category, search ? search.value : '');
        });
    });

    // Menu search
    const menuSearch = document.getElementById('menuSearch');
    if (menuSearch) {
        let searchTimeout;
        menuSearch.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const activeTab = document.querySelector('.tab-btn.active');
                const category = activeTab ? activeTab.dataset.category : 'burgers';
                renderMenu(category, menuSearch.value);
            }, 300);
        });
    }

    // Scroll progress ring
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 52 52');
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', '26');
        circle.setAttribute('cy', '26');
        circle.setAttribute('r', '24');
        circle.id = 'scrollRing';
        svg.appendChild(circle);
        scrollBtn.prepend(svg);
        scrollBtn.style.position = 'relative';
    }

    // Word rotate effect
    const wordWrapper = document.querySelector('.word-rotate-wrapper');
    if (wordWrapper) {
        const words = wordWrapper.querySelectorAll('.word');
        if (words.length > 1) {
            let idx = 0;
            words[0].classList.add('active');
            setInterval(() => {
                words[idx].classList.remove('active');
                idx = (idx + 1) % words.length;
                words[idx].classList.add('active');
            }, 2500);
        }
    }

    // Gallery carousel
    const galleryCarousel = document.querySelector('.gallery-carousel .carousel-track');
    if (galleryCarousel && galleryCarousel.children.length > 1) {
        const slides = galleryCarousel.children;
        let slideIdx = 0;
        const totalSlides = slides.length;

        function goToSlide(i) {
            slideIdx = i;
            galleryCarousel.style.transform = `translateX(-${slideIdx * 100}%)`;
        }

        document.querySelector('.carousel-prev')?.addEventListener('click', () => {
            goToSlide(slideIdx === 0 ? totalSlides - 1 : slideIdx - 1);
        });
        document.querySelector('.carousel-next')?.addEventListener('click', () => {
            goToSlide(slideIdx === totalSlides - 1 ? 0 : slideIdx + 1);
        });

        setInterval(() => goToSlide((slideIdx + 1) % totalSlides), 5000);
    }

    // Confetti trigger
    document.querySelectorAll('[data-confetti]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (prefersReducedMotion.matches) return;
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top;
            const colors = ['#e63946', '#ffb703', '#4caf50', '#2196f3', '#9c27b0', '#ff9800'];
            const container = document.createElement('div');
            container.className = 'confetti-container';
            document.body.appendChild(container);
            for (let i = 0; i < 40; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = (x + (Math.random() - 0.5) * 200) + 'px';
                piece.style.top = y + 'px';
                piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                piece.style.animationDuration = (1 + Math.random()) + 's';
                piece.style.animationDelay = Math.random() * 0.5 + 's';
                container.appendChild(piece);
            }
            setTimeout(() => container.remove(), 3000);
        });
    });

    // Order tracking demo
    document.querySelectorAll('[data-track-order]').forEach(btn => {
        btn.addEventListener('click', () => {
            const steps = document.querySelectorAll('.tracking-steps .step');
            if (!steps.length) return;
            let stepIdx = 0;
            steps.forEach(s => { s.classList.remove('done', 'active'); });
            steps[0].classList.add('active');
            showToast('Commande en cours de préparation...', 'info');
            const interval = setInterval(() => {
                steps[stepIdx].classList.remove('active');
                steps[stepIdx].classList.add('done');
                stepIdx++;
                if (stepIdx >= steps.length) {
                    clearInterval(interval);
                    showToast('Commande livrée. Bon appétit héros !', 'success');
                    triggerConfetti();
                    return;
                }
                steps[stepIdx].classList.add('active');
                const labels = ['Préparation en cours...', 'Cuisson terminée !', 'En cours de livraison...', 'Livré !'];
                showToast(labels[stepIdx - 1] || 'Mise à jour...', 'info');
            }, 2000);
        });
    });

    // Scroll animations (IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale').forEach(el => observer.observe(el));

    // Testimonial carousel
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (testimonialGrid && window.innerWidth >= 769) {
        const cards = testimonialGrid.querySelectorAll('.testimonial-card');
        if (cards.length > 1) {
            testimonialGrid.classList.add('testimonials-carousel');
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots';
            let current = 0;

            cards.forEach((card, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', `Afficher l'avis ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
            testimonialGrid.parentElement.appendChild(dotsContainer);

            function goToSlide(index) {
                current = index;
                cards.forEach((card, i) => {
                    card.style.transform = `translateX(-${current * 100}%)`;
                });
                dotsContainer.querySelectorAll('button').forEach((d, i) => {
                    d.classList.toggle('active', i === current);
                });
            }

            setInterval(() => goToSlide((current + 1) % cards.length), 4000);
        }
    }

    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.dataset.target;
                let count = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        entry.target.textContent = target.toLocaleString('fr-FR') + (target >= 1000 ? '+' : '');
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(count).toLocaleString('fr-FR');
                    }
                }, 25);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // Init menu with skeleton
    const menuGrid = document.getElementById('menuGrid');
    if (menuGrid) {
        menuGrid.innerHTML = Array(6).fill(`
            <div class="menu-card skeleton">
                <div class="menu-card-img"><div class="skeleton" style="height:220px;"></div></div>
                <div class="menu-card-body">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text short"></div>
                </div>
            </div>
        `).join('');
    }
    renderMenu('burgers');
    updateCartUI();

    // Order page
    renderOrderPage();

    // Countdown
    startCountdown();

    // Particles
    createParticles();

    // Form validation
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        ensureFieldError(input);
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) validateField(input);
        });
    });

    // Gallery lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openLightbox(img.src);
        });
    });
});

// ===== SCROLL EVENTS =====
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
    updateScrollProgress();
});

// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
});

// ===== FORMULAIRES =====
function handleReservation(e) {
    e.preventDefault();
    let valid = true;
    e.target.querySelectorAll('input, select, textarea').forEach(input => {
        if (!validateField(input)) valid = false;
    });
    if (!valid) {
        showToast('Merci de corriger les champs indiqués.', 'error');
        const firstInvalid = e.target.querySelector('.error');
        if (firstInvalid) firstInvalid.focus();
        return;
    }
    const btn = e.target.querySelector('.submit-btn');
    btn.classList.add('loading');
    setTimeout(() => {
        btn.classList.remove('loading');
        showToast('Réservation confirmée. On t\'attend chez Heros Cafe.', 'success');
        triggerConfetti();
        showConfirmation('Réservation confirmée', 'On t\'attend chez Heros Cafe', 'Un email de confirmation vient de t\'être envoyé. Tu peux aussi nous appeler au 01 23 45 67 89 pour toute modification.');
        e.target.reset();
    }, 1500);
}

function handleNewsletter(e) {
    e.preventDefault();
    showToast('Bienvenue dans la Ligue des Héros. Code -10% : HEROS10', 'success');
    e.target.reset();
}

function handleOrder(e) {
    e.preventDefault();
    if (cart.length === 0) {
        showToast('Ton panier est vide. Ajoute des articles avant de commander.', 'error');
        return;
    }
    let valid = true;
    e.target.querySelectorAll('input, select, textarea').forEach(input => {
        if (!validateField(input)) valid = false;
    });
    if (!valid) {
        showToast('Merci de corriger les informations de livraison.', 'error');
        const firstInvalid = e.target.querySelector('.error');
        if (firstInvalid) firstInvalid.focus();
        return;
    }
    const name = document.getElementById('orderName');
    const total = getCartTotal();
    const count = getCartCount();
    const btn = e.target.querySelector('.submit-btn');
    btn.classList.add('loading');
    setTimeout(() => {
        btn.classList.remove('loading');
        showToast(`Commande confirmée ${name ? name.value : ''}. ${count} articles - ${total.toFixed(2)}€`, 'success');
        triggerConfetti();
        showConfirmation('Commande confirmée', `${count} articles · ${total.toFixed(2)}€`, 'Prépare-toi, héros. Tu peux suivre ta commande en temps réel ci-dessous.');
        cart = [];
        saveCart();
        renderOrderPage();
        const trackingCard = document.getElementById('trackingCard');
        if (trackingCard) {
            trackingCard.style.display = 'block';
            trackingCard.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
        }
        e.target.reset();
    }, 1500);
}

// ===== ORDER PAGE =====
function renderOrderPage() {
    const container = document.getElementById('orderItems');
    const totalEl = document.getElementById('orderTotal');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-order"><i class="fas fa-shopping-basket"></i><p>Ton panier est vide.</p><p style="margin-top:10px;"><a href="Menu.html" class="btn btn-primary" style="font-size:0.9rem;padding:10px 25px;">Voir le menu</a></p></div>';
        if (totalEl) totalEl.textContent = '0.00€';
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="order-item">
            <div>
                <h4>${escapeHTML(item.name)} <span style="color:var(--gray-dark);font-weight:400;">× ${item.qty || 1}</span></h4>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="color:var(--primary);font-weight:600;">${(item.price * (item.qty || 1)).toFixed(2)}€</span>
                <button onclick="removeFromCart(${i}); renderOrderPage();" aria-label="Supprimer ${escapeAttr(item.name)}" style="background:var(--primary);color:white;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;">
                    <i class="fas fa-trash" style="font-size:0.8rem;" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = getCartTotal();
    if (totalEl) totalEl.textContent = total.toFixed(2) + '€';
}

// ===== CONTACT FORM =====
function handleContact(e) {
    e.preventDefault();
    let valid = true;
    e.target.querySelectorAll('input, select, textarea').forEach(input => {
        if (!validateField(input)) valid = false;
    });
    if (!valid) {
        showToast('Merci de corriger les champs indiqués.', 'error');
        const firstInvalid = e.target.querySelector('.error');
        if (firstInvalid) firstInvalid.focus();
        return;
    }
    showToast('Message envoyé. On te répond dans les plus brefs délais.', 'success');
    e.target.reset();
}

// ===== CONFIRMATION MODAL =====
function showConfirmation(title, subtitle, message) {
    const existing = document.querySelector('.confirmation-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'confirmationTitle');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10002;padding:20px;backdrop-filter:blur(8px);';
    modal.innerHTML = `
        <div style="background:var(--white);border-radius:var(--radius);padding:50px 40px;max-width:450px;width:100%;text-align:center;animation:slideUp 0.4s ease;">
            <div class="modal-icon" style="width:72px;height:72px;margin:0 auto 15px;border-radius:var(--radius);background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:white;font-size:2rem;"><i class="fas fa-check" aria-hidden="true"></i></div>
            <h2 id="confirmationTitle" style="font-family:var(--font-display);font-size:2.5rem;color:var(--dark);margin-bottom:5px;">${escapeHTML(title)}</h2>
            <p style="font-size:1.3rem;color:var(--primary);font-weight:600;margin-bottom:15px;">${escapeHTML(subtitle)}</p>
            <p style="color:var(--gray-dark);margin-bottom:30px;line-height:1.6;">${escapeHTML(message)}</p>
            <button onclick="this.closest('.confirmation-modal').remove()" class="btn btn-primary" style="width:100%;justify-content:center;">
                <i class="fas fa-check"></i> Super, merci !
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ===== CONFETTI HELPER =====
function triggerConfetti() {
    if (prefersReducedMotion.matches) return;
    const colors = ['#e63946', '#ffb703', '#4caf50', '#2196f3', '#9c27b0', '#ff9800'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = (window.innerWidth * Math.random()) + 'px';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.animationDuration = (1.5 + Math.random()) + 's';
        piece.style.animationDelay = Math.random() * 0.8 + 's';
        container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 3000);
}

// ===== CLOSE MODAL ON CLICK OUTSIDE =====
document.addEventListener('click', (e) => {
    const modal = document.getElementById('cartModal');
    if (modal && modal.classList.contains('active') && e.target === modal) {
        toggleCart();
    }
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('active') && e.target === lb) {
        closeLightbox();
    }
});

// ===== ESC & ARROW KEYS =====
document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (e.key === 'Escape') {
        const modal = document.getElementById('cartModal');
        if (modal && modal.classList.contains('active')) toggleCart();
        if (lb && lb.classList.contains('active')) closeLightbox();
    }
    if (e.key === 'ArrowLeft' && lb && lb.classList.contains('active')) {
        e.preventDefault(); prevImage();
    }
    if (e.key === 'ArrowRight' && lb && lb.classList.contains('active')) {
        e.preventDefault(); nextImage();
    }
});
