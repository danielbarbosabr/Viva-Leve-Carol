/* style.css - Dark Theme com Cards Brancos (estilo Secaps Black) */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

:root {
    --amarelo: #f1c40f;
    --amarelo-escuro: #d4ac0d;
    --verde: #2ecc71;
    --verde-escuro: #27ae60;
    --verde-neon: #00ff88;
    --preto-fundo: #0a0a0a;
    --preto-card: #111111;
    --preto-secundario: #1a1a1a;
    --cinza-escuro: #222222;
    --cinza-medio: #333333;
    --cinza-claro: #444444;
    --cinza-nav: #2a2a2a;
    --cinza-texto: #888888;
    --branco: #ffffff;
    --branco-card: #ffffff;
    --branco-fumaca: #f5f5f5;
    --danger: #e74c3c;
    --danger-escuro: #c0392b;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

*::selection {
    background: var(--amarelo);
    color: var(--preto-fundo);
}

body {
    background-color: var(--preto-fundo);
    color: var(--branco-fumaca);
    overflow-x: hidden;
}

html {
    scroll-padding-top: 80px;
    scroll-behavior: smooth;
}

/* ===== HEADER COM NAVBAR CINZA ===== */
header {
    background: var(--cinza-nav) !important;
    border-bottom: 1px solid var(--cinza-claro);
}

.navbar-brand {
    font-weight: 900;
    font-size: 1.8rem;
    letter-spacing: -0.5px;
    color: var(--branco) !important;
    display: flex;
    align-items: center;
    gap: 10px;
}

.navbar-brand i {
    font-size: 2rem;
    background: linear-gradient(135deg, var(--verde-neon), var(--amarelo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.navbar {
    background: var(--cinza-nav) !important;
    padding: 0.5rem 0;
}

.navbar-nav .nav-link {
    color: var(--branco-fumaca) !important;
    font-weight: 600;
    padding: 0.8rem 1.2rem !important;
    transition: all 0.3s;
    border-radius: 30px;
}

.navbar-nav .nav-link:hover {
    color: var(--amarelo) !important;
    background: var(--cinza-claro);
}

.navbar-nav .nav-link.active {
    color: var(--amarelo) !important;
    background: var(--cinza-claro);
    font-weight: 700;
}

/* Ajuste do toggler para mobile */
.navbar-toggler {
    border: 1px solid var(--cinza-claro);
    padding: 0.5rem;
}

.navbar-toggler i {
    color: var(--branco-fumaca);
    font-size: 1.5rem;
}

/* Barra de pesquisa */
#search-form .form-control {
    background: var(--cinza-escuro);
    border: 1px solid var(--cinza-claro);
    color: var(--branco);
    border-radius: 30px;
    padding: 0.5rem 1rem;
}

#search-form .form-control:focus {
    border-color: var(--verde);
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
    background: var(--cinza-escuro);
}

#search-form .btn {
    background: var(--verde) !important;
    color: var(--preto-fundo) !important;
    border-radius: 30px;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    border: none;
}

/* Ícone do carrinho */
.cart-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--cinza-escuro);
    padding: 0.3rem 1rem;
    border-radius: 30px;
}

.cart-wrapper a {
    color: var(--branco-fumaca) !important;
    position: relative;
}

.cart-wrapper a i {
    font-size: 1.3rem;
    color: var(--verde);
}

#cart-count {
    background: var(--amarelo) !important;
    color: var(--preto-fundo) !important;
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
}

#cart-total {
    color: var(--verde) !important;
    font-weight: 700;
}

/* ===== BANNER PRINCIPAL ===== */
.home {
    position: relative;
    min-height: 400px;
    display: flex;
    align-items: center;
    background-image: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%), 
                      url('https://scontent.fcpq14-1.fna.fbcdn.net/v/t39.30808-6/634331317_122108071185224900_5751662294477147767_n.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.home::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(46, 204, 113, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.home .container {
    position: relative;
    z-index: 2;
}

.home h1 {
    font-weight: 900;
    font-size: 4rem;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--verde-neon), var(--amarelo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 15px;
}

.home h1 i {
    font-size: 3.5rem;
    color: var(--verde);
    -webkit-text-fill-color: initial;
}

.home .lead {
    font-size: 1.3rem;
    color: var(--branco-fumaca);
    opacity: 0.9;
}

.home .btn-warning {
    background: var(--verde);
    border: none;
    color: var(--preto-fundo);
    font-weight: 700;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s;
    box-shadow: 0 5px 20px rgba(46, 204, 113, 0.3);
}

.home .btn-warning:hover {
    background: var(--verde-escuro);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
}

/* ===== BADGE DE URGÊNCIA ===== */
.urgency-badge {
    background: linear-gradient(135deg, var(--danger), var(--danger-escuro));
    color: var(--branco);
    font-weight: 800;
    font-size: 1rem;
    padding: 15px 30px;
    border-radius: 50px;
    margin-bottom: 30px;
    display: inline-block;
    animation: pulse 2s infinite;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid rgba(255,255,255,0.1);
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

/* ===== TÍTULOS DE SEÇÃO ===== */
.section-title {
    font-weight: 900;
    font-size: 2.5rem;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 40px;
    color: var(--branco);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.section-title i {
    font-size: 2.5rem;
    background: linear-gradient(135deg, var(--verde), var(--amarelo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--verde), var(--amarelo));
    border-radius: 2px;
}

/* ===== CARDS DE PRODUTOS (FUNDO BRANCO) ===== */
.product-card {
    background: var(--branco-card) !important;
    border: 1px solid #e0e0e0 !important;
    border-radius: 20px !important;
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}

.product-card:hover {
    border-color: var(--verde) !important;
    box-shadow: 0 20px 30px rgba(46, 204, 113, 0.25) !important;
    transform: translateY(-8px);
}

.product-card .card-img-top {
    height: 200px;
    object-fit: contain;
    padding: 20px;
    background: transparent;
    transition: transform 0.5s;
}

.product-card:hover .card-img-top {
    transform: scale(1.08);
}

.product-card .product-title {
    font-weight: 800;
    font-size: 1.3rem;
    margin: 10px 0 5px;
    color: var(--preto-fundo) !important;
}

.product-card .product-desc {
    color: var(--cinza-texto) !important;
    font-size: 0.9rem;
    line-height: 1.5;
}

/* Badge de "Mais Vendido" para cards brancos */
.product-card .product-badge {
    position: absolute;
    top: 15px;
    left: 0;
    background: linear-gradient(135deg, var(--amarelo), var(--amarelo-escuro));
    color: var(--preto-fundo);
    font-weight: 800;
    font-size: 0.8rem;
    padding: 5px 20px;
    border-radius: 0 30px 30px 0;
    z-index: 10;
    text-transform: uppercase;
}

.product-card .product-badge.hot {
    background: linear-gradient(135deg, var(--danger), var(--danger-escuro));
    color: var(--branco);
}

/* ===== OPÇÕES DE PLANOS (dentro do card branco) ===== */
.product-card .product-options {
    margin-top: 15px;
    border-top: 1px solid #e0e0e0;
    padding-top: 15px;
}

.product-card .product-option {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    padding: 12px;
    margin-bottom: 10px;
    transition: all 0.3s;
}

.product-card .product-option:hover {
    border-color: var(--verde);
    background: #f0fff0;
    transform: scale(1.02);
}

.product-card .months {
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--preto-fundo);
}

.product-card .months span {
    color: var(--verde);
    font-size: 0.8rem;
    margin-left: 5px;
}

.product-card .old-price {
    color: var(--cinza-texto);
    font-size: 0.8rem;
    text-decoration: line-through;
    margin-right: 5px;
}

.product-card .current-price {
    font-weight: 900;
    font-size: 1.5rem;
    color: var(--verde-escuro);
    line-height: 1;
}

.product-card .installment {
    font-size: 0.75rem;
    color: var(--cinza-texto);
}

.product-card .free-shipping {
    display: inline-block;
    color: var(--verde);
    font-weight: 700;
    font-size: 0.7rem;
    text-transform: uppercase;
    background: rgba(46, 204, 113, 0.1);
    padding: 3px 10px;
    border-radius: 30px;
    margin-top: 5px;
}

/* Botões dentro do card branco */
.product-card .btn-buy {
    background: var(--verde);
    color: var(--branco);
    font-weight: 800;
    border: none;
    border-radius: 50px;
    padding: 8px 12px;
    width: 100%;
    transition: all 0.3s;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
}

.product-card .btn-buy:hover {
    background: var(--verde-escuro);
    transform: scale(1.02);
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

.product-card .btn-add-cart {
    background: transparent;
    color: var(--verde);
    border: 2px solid var(--verde);
    border-radius: 50px;
    padding: 6px 10px;
    width: 100%;
    font-weight: 700;
    transition: all 0.3s;
}

.product-card .btn-add-cart:hover {
    background: var(--verde);
    color: var(--branco);
}

/* ===== CARDS DE SERVIÇOS ===== */
.service-card {
    background: var(--preto-card);
    border: 1px solid var(--cinza-medio);
    border-radius: 15px;
    padding: 25px 15px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
}

.service-card:hover {
    border-color: var(--verde);
    background: var(--preto-secundario);
    transform: translateY(-5px);
}

.service-card i {
    font-size: 2.5rem;
    background: linear-gradient(135deg, var(--verde), var(--amarelo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 15px;
}

.service-card h5 {
    font-weight: 700;
    color: var(--branco);
    margin-bottom: 5px;
}

.service-card p {
    color: var(--cinza-texto);
    font-size: 0.85rem;
    margin: 0;
}

/* ===== MODAL DE RASTREAMENTO ===== */
.tracking-modal .modal-content {
    background: var(--preto-card);
    border: 1px solid var(--verde);
    border-radius: 20px;
}

.tracking-modal .modal-header {
    background: linear-gradient(135deg, var(--verde), var(--verde-escuro));
    border-radius: 20px 20px 0 0;
    padding: 1.5rem;
}

.tracking-modal .modal-header .btn-close {
    filter: brightness(0) invert(1);
}

.tracking-modal .modal-body {
    padding: 2rem;
}

.tracking-input-group {
    display: flex;
    gap: 10px;
}

.tracking-input-group input {
    background: var(--preto-secundario);
    border: 2px solid var(--cinza-medio);
    color: var(--branco);
    border-radius: 50px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
}

.tracking-input-group input:focus {
    border-color: var(--verde);
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
    outline: none;
}

.tracking-input-group button {
    background: var(--verde);
    color: var(--preto-fundo);
    border: none;
    border-radius: 50px;
    padding: 0.75rem 2rem;
    font-weight: 700;
    transition: all 0.3s;
}

.tracking-input-group button:hover {
    background: var(--verde-escuro);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

.tracking-info {
    color: var(--cinza-texto);
    margin-top: 1rem;
    font-size: 0.85rem;
}

.tracking-info i {
    color: var(--verde);
}

/* ===== OFFCANVAS DO CARRINHO ===== */
.offcanvas {
    background: var(--preto-card) !important;
    border-left: 2px solid var(--verde);
}

.offcanvas-header {
    background: var(--cinza-nav);
    color: var(--branco);
    border-bottom: 1px solid var(--cinza-claro);
}

.offcanvas-title {
    font-weight: 800;
    color: var(--verde);
}

.offcanvas-body {
    color: var(--branco-fumaca);
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 0;
    border-bottom: 1px solid var(--cinza-medio);
}

.cart-item img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    background: var(--preto-secundario);
    border-radius: 10px;
    padding: 5px;
    border: 1px solid var(--cinza-medio);
}

.cart-item-details h6 {
    font-weight: 700;
    color: var(--branco);
    margin: 0 0 3px;
}

.cart-item-details small {
    color: var(--cinza-texto);
}

.cart-item-actions input {
    background: var(--preto-secundario);
    border: 1px solid var(--cinza-medio);
    color: var(--branco);
    border-radius: 30px;
    width: 50px;
    text-align: center;
}

.remove-item {
    color: var(--danger);
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;
}

.remove-item:hover {
    color: var(--danger-escuro);
    transform: scale(1.1);
}

/* ===== SEÇÃO NOVIDADES ===== */
.novidades {
    background: var(--preto-secundario) !important;
}

.novidades .bg-white {
    background: var(--preto-card) !important;
    border: 1px solid var(--cinza-medio);
}

.novidades .bg-white i {
    background: linear-gradient(135deg, var(--verde), var(--amarelo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.novidades .bg-white h3 {
    color: var(--branco);
}

.novidades .bg-white p {
    color: var(--cinza-texto);
}

.novidades .btn {
    background: #4267B2 !important;
    border: none;
    padding: 12px 30px !important;
    font-weight: 700;
    border-radius: 50px;
}

/* ===== FORMULÁRIO DE CONTATO ===== */
.contact {
    background: var(--preto-fundo) !important;
}

.contact-form {
    background: var(--preto-card);
    border: 1px solid var(--cinza-medio);
    border-radius: 20px;
    padding: 2rem;
}

.contact-form label {
    color: var(--branco);
    font-weight: 600;
}

.contact-form input,
.contact-form textarea {
    background: var(--preto-secundario);
    border: 2px solid var(--cinza-medio);
    color: var(--branco);
    border-radius: 50px;
    padding: 0.75rem 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
    border-color: var(--verde);
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
    outline: none;
    background: var(--preto-secundario);
}

.contact-form button {
    background: var(--verde);
    color: var(--preto-fundo);
    font-weight: 700;
    border: none;
    border-radius: 50px;
    padding: 12px;
    transition: all 0.3s;
}

.contact-form button:hover {
    background: var(--verde-escuro);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

/* ===== FOOTER ===== */
.footer {
    background: var(--cinza-nav) !important;
    border-top: 1px solid var(--cinza-claro);
}

.footer h5 {
    color: var(--verde);
    font-weight: 700;
}

.footer p {
    color: var(--branco-fumaca);
    opacity: 0.8;
}

.footer a {
    color: var(--branco-fumaca);
    transition: all 0.3s;
    opacity: 0.8;
}

.footer a:hover {
    color: var(--verde);
    opacity: 1;
    text-decoration: none;
}

.footer .border-top {
    border-color: var(--cinza-claro) !important;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--preto-fundo);
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--verde), var(--amarelo));
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--verde-escuro), var(--amarelo-escuro));
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 1200px) {
    .home h1 {
        font-size: 3rem;
    }
}

@media (max-width: 992px) {
    .navbar-collapse {
        background: var(--cinza-escuro);
        padding: 1rem;
        border-radius: 15px;
        margin-top: 1rem;
    }
    
    .cart-wrapper {
        margin-top: 1rem;
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .home {
        min-height: 300px;
    }
    
    .home h1 {
        font-size: 2.5rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .product-card .current-price {
        font-size: 1.3rem;
    }
    
    .tracking-input-group {
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .home h1 {
        font-size: 2rem;
    }
    
    .home .lead {
        font-size: 1rem;
    }
    
    .product-card .card-img-top {
        height: 150px;
    }
    
    .product-card .product-option {
        padding: 10px;
    }
    
    .product-card .months {
        font-size: 1rem;
    }
    
    .product-card .current-price {
        font-size: 1.2rem;
    }
}
