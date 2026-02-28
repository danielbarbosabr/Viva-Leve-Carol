// Lista de produtos
const products = [
    { name: "Calminol - 1 Mês", price: 197, img: "https://api.hest.com.br/products/20251112155222288.png", link: "https://hest.com.br/marketplace/product/152116?u=undefined", desc: "Gel creme com óleo de copaíba, cânfora e mentol. Alívio de tensões musculares." },
    { name: "Celuglow - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251112155457911.png", link: "https://hest.com.br/marketplace/product/152117?u=undefined", desc: "Creme anticelulite com Nano Q10, reduz celulite e melhora firmeza da pele." },
    { name: "Clarize - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251112182138809.png", link: "https://hest.com.br/marketplace/product/152546?u=undefined", desc: "Clareador íntimo com niacinamida e ácido hialurônico. Uniformiza o tom da pele." },
    { name: "FiberSlim - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251112180628477.png", link: "https://hest.com.br/marketplace/product/152483?u=undefined", desc: "Suplemento de fibras sabor morango. Auxilia saciedade e funcionamento intestinal." },
    { name: "Intifeme - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251112185543193.png", link: "https://hest.com.br/marketplace/product/152677?u=undefined", desc: "Spray íntimo com barbatimão e melaleuca. Frescor e equilíbrio diário." },
    { name: "Intimasc - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251112183906004.png", link: "https://hest.com.br/marketplace/product/152612?u=undefined", desc: "Spray íntimo masculino com óleo de menta. Conforto e higiene prolongada." },
    { name: "Passa Tudo - 1 Mês", price: 197, img: "https://api.hest.com.br/products/20250902120550201.png", link: "https://hest.com.br/marketplace/product/386?u=undefined", desc: "Colágeno Tipo II com vitaminas D3 e K2. Fortalece articulações e reduz inflamações." },
    { name: "Quero + - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251127113333746.jpeg", link: "https://hest.com.br/marketplace/product/189118?u=undefined", desc: "Pó com goma xantana e feno-grego. Estimula bem-estar e prazer feminino." },
    { name: "Skin-Fit - 1 Mês", price: 209, img: "https://api.hest.com.br/products/20251112190743205.png", link: "https://hest.com.br/marketplace/product/152690?u=undefined", desc: "Colágeno Fitness com cafeína e taurina. Firmeza da pele e disposição." },
    { name: "Termo Drink - 1 Mês", price: 209.9, img: "https://api.hest.com.br/products/20251112192445895.png", link: "https://hest.com.br/marketplace/product/152710?u=undefined", desc: "Suplemento termogênico sabor limonada suíça. Energia e foco." },
    { name: "Long Beauty", price: 197, img: "https://api.hest.com.br/products/20250128152440130.png", link: "https://hest.com.br/marketplace/product/14?u=undefined", desc: "Tratamento capilar que restaura a beleza e confiança dos seus cabelos." },
    { name: "Musa Select Academy - MSA", price: 497, img: "https://api.hest.com.br/products/20250112232920168.png", link: "https://hest.com.br/marketplace/product/6?u=undefined", desc: "Select Academy – metodologia exclusiva para transformação pessoal." },
    { name: "Neumax Drops", price: 197, img: "https://api.hest.com.br/products/20250128152643280.png", link: "https://hest.com.br/marketplace/product/16?u=undefined", desc: "Biohacking para foco, cognição e memorização." },
    { name: "Secaps Black", price: 197, img: "https://api.hest.com.br/products/20260203113215423.jpeg", link: "https://hest.com.br/marketplace/product/12?u=undefined", desc: "Tratamento emagrecedor que age na raiz do problema." },
    { name: "Secaps Black Chá", price: 209.9, img: "https://api.hest.com.br/products/20260114195505729.jpg", link: "https://hest.com.br/marketplace/product/130?u=undefined", desc: "Chá solúvel com cúrcuma e psyllium. Energia e saciedade." },
    { name: "Secaps Max", price: 197, img: "https://api.hest.com.br/products/20250128152337073.png", link: "https://hest.com.br/marketplace/product/13?u=undefined", desc: "Emagrecedor que já transformou mais de 35 mil pessoas." },
    { name: "Toop Cor", price: 197, img: "https://api.hest.com.br/products/20250128152440130.png", link: "https://hest.com.br/marketplace/product/15?u=undefined", desc: "Restaura a cor natural do cabelo sem tintas." }
];

// Funções do carrinho (localStorage)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartItems(); // atualiza offcanvas
}

function updateCartDisplay() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('cart-total').textContent = 'R$' + totalPrice.toFixed(2).replace('.', ',');
    document.getElementById('offcanvas-total').textContent = 'R$' + totalPrice.toFixed(2).replace('.', ',');
}

// Renderiza itens no offcanvas
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const cart = getCart();
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-muted">Seu carrinho está vazio.</p>';
        return;
    }
    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h6>${item.name}</h6>
                <small>R$${item.price.toFixed(2).replace('.',',')} cada</small>
            </div>
            <div class="cart-item-actions">
                <input type="number" class="form-control form-control-sm item-qty" value="${item.quantity}" min="1" step="1" style="width: 60px;">
                <button class="remove-item" title="Remover"><i class="bi bi-x-circle"></i></button>
            </div>
        </div>
    `).join('');

    // Eventos para alterar quantidade
    document.querySelectorAll('.item-qty').forEach((input, idx) => {
        input.addEventListener('change', function() {
            let cart = getCart();
            const newQty = parseInt(this.value, 10);
            if (newQty < 1) {
                cart.splice(idx, 1);
            } else {
                cart[idx].quantity = newQty;
            }
            saveCart(cart);
        });
    });

    // Eventos para remover item
    document.querySelectorAll('.remove-item').forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            let cart = getCart();
            cart.splice(idx, 1);
            saveCart(cart);
        });
    });
}

// Adicionar ao carrinho com quantidade (usado pelo botão "Adicionar")
function addToCart(e) {
    e.preventDefault();
    const card = e.currentTarget.closest('.card');
    const index = card.dataset.index;
    const product = products[index];
    const qtyInput = card.querySelector('.qty-input');
    let quantity = parseInt(qtyInput.value, 10);
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    let cart = getCart();
    const existing = cart.find(p => p.name === product.name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }
    saveCart(cart);
    // Abre o offcanvas do carrinho
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('cartOffcanvas')).show();
}

// Comprar agora (redireciona para o link de afiliado)
function buyNow(e) {
    e.preventDefault();
    const card = e.currentTarget.closest('.card');
    const index = card.dataset.index;
    const product = products[index];
    window.open(product.link, '_blank');
}

// Renderizar produtos com dois botões
function renderProducts(filterText = '') {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));

    filtered.forEach((p, index) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `
            <div class="card h-100 shadow-sm" data-index="${index}">
                <a href="${p.link}" target="_blank">
                    <img src="${p.img}" class="card-img-top p-3" alt="${p.name}">
                </a>
                <div class="card-body d-flex flex-column">
                    <a href="${p.link}" target="_blank" class="text-decoration-none text-dark">
                        <h5 class="card-title">${p.name}</h5>
                    </a>
                    <p class="card-text small flex-grow-1">${p.desc}</p>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <strong class="text-danger">R$${p.price.toFixed(2).replace('.',',')}</strong>
                        <div class="input-group input-group-sm" style="width: 90px;">
                            <input type="number" class="form-control qty-input" value="1" min="1" step="1">
                        </div>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-warning flex-grow-1 buy-now-btn">Comprar</button>
                        <button class="btn btn-outline-success add-to-cart-btn"><i class="bi bi-cart-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    // Adicionar eventos aos botões
    document.querySelectorAll('.buy-now-btn').forEach(btn => {
        btn.addEventListener('click', buyNow);
    });
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Evento de pesquisa
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const term = document.getElementById('search-input').value;
    renderProducts(term);
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay();
    renderCartItems(); // para o offcanvas
});f
