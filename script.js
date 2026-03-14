// Lista de produtos com opções de meses
const products = [
    // SECAPS - Todos no início como solicitado
    { 
        name: "Secaps Black", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20260203113215423.jpeg", 
        desc: "Tratamento emagrecedor que age na raiz do problema.",
        options: [
            { months: 1, price: 209, link: "https://pay.hest.com.br/baf4666f-6ce9-4da8-a2ac-755c8d3e4d64" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/1cf57f4a-688d-45d0-a3ca-8de9a2ca5e49" },
            { months: 5, price: 461, link: "https://pay.hest.com.br/527119e2-5030-41f8-b0af-b14b0e98c78c" }
        ]
    },
    { 
        name: "Secaps Black Chá", 
        basePrice: 209.9,
        img: "https://api.hest.com.br/products/20260114195505729.jpg", 
        desc: "Chá solúvel com cúrcuma e psyllium. Energia e saciedade.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/b98ee4b7-6064-4260-a7a9-b3dc880416da" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/6ba5966d-bcf1-45be-b16d-0d713e154715" },
            { months: 12, price: 851, link: "https://pay.hest.com.br/8bc7fa93-ca39-42b1-b273-8ba1dbc18c62" }
        ]
    },
    { 
        name: "Secaps Max", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152337073.png", 
        desc: "Emagrecedor que já transformou mais de 35 mil pessoas.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/8893b794-7c19-4419-804f-0538e5604222" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/5b8ecc68-44bb-4ed7-9c5d-f14d4f68f2c4" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/dfc1625d-cee9-4be0-806c-11ea58a8d3e7" }
        ]
    },
    
    // DEMAIS PRODUTOS (ordenados alfabeticamente)
    { 
        name: "Calminol", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20251112155222288.png", 
        desc: "Gel creme com óleo de copaíba, cânfora e mentol. Alívio de tensões musculares.",
        options: [
            { months: 1, price: 197, link: "https://pay.hest.com.br/cc320fe0-5edf-4a52-b80c-144b5008a7d4" },
            { months: 5, price: 397, link: "https://pay.hest.com.br/cb3dd576-9d03-418d-b22b-782cd8f96123" },
            { months: 12, price: 697, link: "https://pay.hest.com.br/5886005c-9689-4e5f-b065-bffe7ee5dfb9" }
        ]
    },
    { 
        name: "Celuglow", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112155457911.png", 
        desc: "Creme anticelulite com Nano Q10, reduz celulite e melhora firmeza da pele.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/3dc99862-26fb-476a-89df-fae83e545cbd" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/17dce879-b598-4a41-8c03-45e47a16057e" },
            { months: 12, price: 851, link: "https://pay.hest.com.br/bd6c50b9-99c6-44d5-9c19-1154995b7a3c" }
        ]
    },
    { 
        name: "Clarize", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112182138809.png", 
        desc: "Clareador íntimo com niacinamida e ácido hialurônico. Uniformiza o tom da pele.",
        options: [
            { months: 1, price: 209, link: "https://pay.hest.com.br/baf4666f-6ce9-4da8-a2ac-755c8d3e4d64" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/1cf57f4a-688d-45d0-a3ca-8de9a2ca5e49" },
            { months: 5, price: 461, link: "https://pay.hest.com.br/527119e2-5030-41f8-b0af-b14b0e98c78c" }
        ]
    },
    { 
        name: "FiberSlim", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112180628477.png", 
        desc: "Suplemento de fibras sabor morango. Auxilia saciedade e funcionamento intestinal.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/d7e3d181-624f-42a4-a00b-e16836892e99" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/956e8c7f-294f-486f-9313-abc90a29164d" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/a4f761db-a482-4aa7-b45a-3af5473d76e7" }
        ]
    },
    { 
        name: "Intifeme", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112185543193.png", 
        desc: "Spray íntimo com barbatimão e melaleuca. Frescor e equilíbrio diário.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/eef48a82-a6c6-4aa3-a14f-4738d440c9a9" },
            { months: 3, price: 335.70, link: "https://pay.hest.com.br/7c0eba99-dd07-46e1-89aa-857c83f4ae76" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/feb19442-b2c6-4e86-a075-0b9dfbdbf9df" }
        ]
    },
    { 
        name: "Intimasc", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112183906004.png", 
        desc: "Spray íntimo masculino com óleo de menta. Conforto e higiene prolongada.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/8893b794-7c19-4419-804f-0538e5604222" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/5b8ecc68-44bb-4ed7-9c5d-f14d4f68f2c4" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/dfc1625d-cee9-4be0-806c-11ea58a8d3e7" }
        ]
    },
    { 
        name: "Long Beauty", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152440130.png", 
        desc: "Tratamento capilar que restaura a beleza e confiança dos seus cabelos.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/eef48a82-a6c6-4aa3-a14f-4738d440c9a9" },
            { months: 3, price: 335.70, link: "https://pay.hest.com.br/7c0eba99-dd07-46e1-89aa-857c83f4ae76" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/feb19442-b2c6-4e86-a075-0b9dfbdbf9df" }
        ]
    },
    { 
        name: "Neumax Drops", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152643280.png", 
        desc: "Biohacking para foco, cognição e memorização.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/a9f50f74-c70f-4c99-a972-3458c12c2b50" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/407d998f-0e6d-4393-93d0-95ae0f262b8f" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/eff80e9b-6f1e-4f54-a0ea-3671e8df5068" }
        ]
    },
    { 
        name: "Passa Tudo", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250902120550201.png", 
        desc: "Colágeno Tipo II com vitaminas D3 e K2. Fortalece articulações e reduz inflamações.",
        options: [
            { months: 1, price: 197, link: "https://pay.hest.com.br/ba6993b7-d254-4e5e-b72a-a5e44eabe73b" },
            { months: 5, price: 397, link: "https://pay.hest.com.br/1aaf2ccc-87c6-4bf4-8e52-9c78060c2476" },
            { months: 12, price: 697, link: "https://pay.hest.com.br/2d98e062-0427-4e2b-8a99-6b2dc3820223" }
        ]
    },
    { 
        name: "Quero +", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251127113333746.jpeg", 
        desc: "Pó com goma xantana e feno-grego. Estimula bem-estar e prazer feminino.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/b98ee4b7-6064-4260-a7a9-b3dc880416da" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/6ba5966d-bcf1-45be-b16d-0d713e154715" },
            { months: 12, price: 851, link: "https://pay.hest.com.br/8bc7fa93-ca39-42b1-b273-8ba1dbc18c62" }
        ]
    },
    { 
        name: "Skin-Fit", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112190743205.png", 
        desc: "Colágeno Fitness com cafeína e taurina. Firmeza da pele e disposição.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/37690af0-14ea-452c-9c75-8d031e984024" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/39e612cd-8a65-43fc-a528-a677c9f2acb9" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/534e9ace-24f9-4ae5-a5de-4a9330176b86" }
        ]
    },
    { 
        name: "Termo Drink", 
        basePrice: 209.9,
        img: "https://api.hest.com.br/products/20251112192445895.png", 
        desc: "Suplemento termogênico sabor limonada suíça. Energia e foco.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/a9f50f74-c70f-4c99-a972-3458c12c2b50" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/407d998f-0e6d-4393-93d0-95ae0f262b8f" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/eff80e9b-6f1e-4f54-a0ea-3671e8df5068" }
        ]
    },
    { 
        name: "Toop Cor", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152440130.png", 
        desc: "Restaura a cor natural do cabelo sem tintas.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/37690af0-14ea-452c-9c75-8d031e984024" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/39e612cd-8a65-43fc-a528-a677c9f2acb9" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/534e9ace-24f9-4ae5-a5de-4a9330176b86" }
        ]
    }
];

// Funções do carrinho (localStorage)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartItems();
}

function updateCartDisplay() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const offcanvasTotalElement = document.getElementById('offcanvas-total');
    
    if (cartCountElement) cartCountElement.textContent = totalItems;
    if (cartTotalElement) cartTotalElement.textContent = 'R$' + totalPrice.toFixed(2).replace('.', ',');
    if (offcanvasTotalElement) offcanvasTotalElement.textContent = 'R$' + totalPrice.toFixed(2).replace('.', ',');
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    const cart = getCart();
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-secondary">Seu carrinho está vazio</p>';
        return;
    }
    
    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item mb-3 p-2 border-bottom" data-index="${index}">
            <div class="d-flex align-items-center gap-3">
                <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain;">
                <div class="flex-grow-1">
                    <h6 class="mb-0">${item.name} - ${item.months} ${item.months > 1 ? 'meses' : 'mês'}</h6>
                    <small class="text-secondary">R$ ${item.price.toFixed(2).replace('.', ',')} cada</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <input type="number" class="form-control form-control-sm item-qty" value="${item.quantity}" min="1" style="width: 60px;">
                    <button class="btn btn-sm btn-outline-danger remove-item"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');

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

    document.querySelectorAll('.remove-item').forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            let cart = getCart();
            cart.splice(idx, 1);
            saveCart(cart);
        });
    });
}

function addToCart(product, selectedOption, quantity) {
    let cart = getCart();
    const cartItem = {
        name: product.name,
        months: selectedOption.months,
        price: selectedOption.price,
        img: product.img,
        link: selectedOption.link,
        quantity: quantity
    };
    
    const existing = cart.find(item => 
        item.name === product.name && item.months === selectedOption.months
    );
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push(cartItem);
    }
    
    saveCart(cart);
    
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    if (cartOffcanvas) {
        try {
            const offcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvas);
            if (offcanvas) {
                offcanvas.show();
            } else {
                new bootstrap.Offcanvas(cartOffcanvas).show();
            }
        } catch (e) {
            console.log('Erro ao abrir carrinho:', e);
        }
    }
}

function buyNow(link) {
    if (link) {
        window.open(link, '_blank');
    }
}

// FUNÇÃO MODIFICADA: produtos com botão de opções (collapse)
function renderProducts(filterText = '') {
    const container = document.getElementById('product-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    let filtered = products;
    if (filterText && filterText.trim() !== '') {
        const searchTerm = filterText.toLowerCase().trim();
        filtered = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.desc.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-secondary">Nenhum produto encontrado</h4></div>';
        return;
    }

    filtered.forEach((product, index) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
        
        // Gera as opções (serão colocadas dentro do collapse)
        let optionsHtml = '';
        product.options.forEach((option, optIndex) => {
            const priceFormatted = 'R$ ' + option.price.toFixed(2).replace('.', ',');
            optionsHtml += `
                <div class="product-option mb-2 p-2 border rounded">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold">${option.months} ${option.months > 1 ? 'meses' : 'mês'}</span>
                        <span class="text-success fw-bold">${priceFormatted}</span>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success btn-sm flex-grow-1 buy-now-option" 
                                data-link="${option.link}">
                            <i class="bi bi-bag-check"></i> Comprar
                        </button>
                        <button class="btn btn-outline-success btn-sm add-to-cart-option"
                                data-product-index="${index}"
                                data-option-index="${optIndex}">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        // ID único para o collapse
        const collapseId = `collapse-${index}-${Date.now()}`;

        col.innerHTML = `
            <div class="card h-100 shadow-sm product-card">
                <img src="${product.img}" class="card-img-top p-3" alt="${product.name}" style="height: 180px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title product-title">${product.name}</h5>
                    <p class="card-text small product-desc flex-grow-1">${product.desc}</p>
                    
                    <!-- Botão que abre as opções -->
                    <button class="btn btn-outline-success w-100 mb-2" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#${collapseId}" 
                            aria-expanded="false" aria-controls="${collapseId}">
                        <i class="bi bi-chevron-down"></i> Opções de compra
                    </button>
                    
                    <!-- Collapse com as opções -->
                    <div class="collapse" id="${collapseId}">
                        <div class="product-options mt-2">
                            ${optionsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });

    // Eventos para botões de compra (dentro do collapse)
    document.querySelectorAll('.buy-now-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = btn.dataset.link;
            buyNow(link);
        });
    });

    // Eventos para adicionar ao carrinho
    document.querySelectorAll('.add-to-cart-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productIndex = parseInt(btn.dataset.productIndex);
            const optionIndex = parseInt(btn.dataset.optionIndex);
            
            // Encontrar o produto original (pode ser filtrado)
            const originalProductIndex = products.findIndex(p => p.name === filtered[productIndex].name);
            if (originalProductIndex !== -1) {
                const product = products[originalProductIndex];
                const selectedOption = product.options[optionIndex];
                addToCart(product, selectedOption, 1);
            }
        });
    });
}

// Função para rastrear pedido (chamada pelo botão no modal)
function trackOrder() {
    const codeInput = document.getElementById('tracking-code');
    if (!codeInput) return;
    
    const code = codeInput.value.trim();
    if (code) {
        window.open(`https://rastreamento.correios.com.br/app/index.php?objeto=${code}`, '_blank');
    } else {
        alert('Por favor, insira um código de rastreamento');
    }
}

// Função para recarregar o iframe do Facebook a cada 30 segundos
function setupFacebookIframe() {
    const iframe = document.getElementById('facebookIframe');
    const container = document.getElementById('facebookContainer');
    const loading = document.getElementById('facebookLoading');
    
    if (!iframe || !container || !loading) return;
    
    const baseUrl = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61586747021286&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId';
    
    function getRandomUrl() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return baseUrl + '&timestamp=' + timestamp + '&random=' + random;
    }
    
    function reloadFacebookIframe() {
        if (loading) loading.style.display = 'block';
        container.classList.add('fade-out');
        
        setTimeout(() => {
            iframe.src = getRandomUrl();
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
            
            setTimeout(() => {
                if (loading) loading.style.display = 'none';
                container.classList.remove('fade-in');
            }, 1000);
        }, 500);
    }
    
    iframe.onload = function() {
        if (loading) loading.style.display = 'none';
    };
    
    setInterval(reloadFacebookIframe, 30000);
}

// Formulário de contato personalizado
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const mensagem = document.getElementById('contact-message').value.trim();

        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Assunto: "Dúvida pelo site - Nome"
        const assunto = encodeURIComponent(`Dúvida pelo site - ${nome}`);

        // Corpo: Nome, E-mail e Mensagem formatados
        const corpo = encodeURIComponent(
            `Nome: ${nome}\n` +
            `E-mail: ${email}\n\n` +
            `Mensagem:\n${mensagem}`
        );

        // Link mailto
        const mailtoLink = `mailto:equipe.viverleve@gmail.com?subject=${assunto}&body=${corpo}`;
        window.location.href = mailtoLink;
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay();
    renderCartItems();
    setupFacebookIframe();

    // Busca
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('#search-form button');

    function performSearch() {
        if (searchInput) {
            const term = searchInput.value;
            renderProducts(term);
        }
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // Logo para limpar busca
    const logoLink = document.querySelector('.navbar-brand');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchInput) {
                searchInput.value = '';
            }
            renderProducts('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll suave e active links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
