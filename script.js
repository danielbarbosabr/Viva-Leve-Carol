// ============================================================================
// CONFIGURAÇÃO
// ============================================================================
const CONFIG = {
  SUPABASE_URL: 'https://ngyxwmkcykyfxfagcnox.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neXh3bWtjeWt5ZnhmYWdjbm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MDk1OTUsImV4cCI6MjA5NjM4NTU5NX0.TX6otcA9gSjPwoq2hRqSMxU0FcM8WDUqEWgiEIUwMZQ',
  ITENS_POR_PAGINA: 12,
  CHAT_EXPIRY_MS: 2 * 60 * 60 * 1000, // 2 horas
  MAX_ACCOUNTS: 5,
};

// ============================================================================
// SUPABASE REST API
// ============================================================================
async function supabaseFetch(path, options = {}) {
  try {
    const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/${path}`, {
      ...options,
      headers: {
        'apikey': CONFIG.SUPABASE_KEY,
        'Authorization': `Bearer ${CONFIG.SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) throw await res.json();
    if (options.method === 'DELETE' || res.status === 204) return true;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.error(`[Supabase] ${path}:`, e);
    return null;
  }
}

const db = {
  fetch: (table, filters = '') => supabaseFetch(`${table}${filters ? `?${filters}&select=*` : '?select=*'}`),
  getById: async (table, id) => {
    const r = await supabaseFetch(`${table}?id=eq.${id}&select=*`);
    return r?.length ? r[0] : null;
  },
  insert: (table, data) => supabaseFetch(table, {
    method: 'POST', body: JSON.stringify(data),
    headers: { 'Prefer': 'return=representation' },
  }),
  update: (table, id, data) => supabaseFetch(`${table}?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (table, id) => supabaseFetch(`${table}?id=eq.${id}`, { method: 'DELETE' }),
  deleteWhere: (table, filter) => supabaseFetch(`${table}?${filter}`, { method: 'DELETE' }),
};

// ============================================================================
// ESTADO GLOBAL
// ============================================================================
const State = {
  usuario: JSON.parse(localStorage.getItem('usuarioLogado')) || null,
  perfil: JSON.parse(localStorage.getItem('perfilAtivo')) || null,
  votosCache: [],
  modoEscuro: localStorage.getItem('modoEscuro') !== 'false', // default: escuro
  sources: [],
  pesquisaCache: [],
  termoPesquisa: '',
  paginaPesquisa: 1,
  conteudoCache: {},
  currentReply: null,
  visitante: false,
  paginaAnterior: null,
  iniciado: false,
};

const SITE_NAME = 'MediaVerso';
const ICONES = { video: 'bi-tv', jogo: 'bi-controller', livro: 'bi-book', audio: 'bi-music-note-beamed', default: 'bi-file-earmark' };
const getIcone = (cat) => ICONES[cat] || ICONES.default;
const getContainer = () => document.getElementById('main-content');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

async function withTimeout(promise, ms = 8000, fallback = []) {
  let t;
  const timeout = new Promise(res => { t = setTimeout(() => res(fallback), ms); });
  try { return await Promise.race([promise, timeout]); }
  finally { clearTimeout(t); }
}

// ============================================================================
// NOTIFICAÇÕES / LOGS
// ============================================================================
const Logger = {
  panel: null,
  items: [],
  MAX: 4,

  getPanel() {
    if (!this.panel) {
      this.panel = Object.assign(document.createElement('div'), { id: 'status-panel', className: 'status-panel' });
      document.body.appendChild(this.panel);
    }
    return this.panel;
  },

  show(modulo, status, info = '', duration = 4000) {
    const panel = this.getPanel();
    const id = status === 'pending' ? `log-${modulo.replace(/\s+/g, '-')}` : `notif-${uid()}`;
    let el = document.getElementById(id);

    if (!el) {
      el = Object.assign(document.createElement('div'), { id, className: 'status-item' });
      panel.appendChild(el);
      this.items.push(el);
      while (this.items.length > this.MAX) this.items.shift()?.remove();
    }

    const cfg = {
      pending: { cls: 'pending', icon: 'bi-arrow-repeat spin', text: 'Carregando...' },
      success: { cls: 'success', icon: 'bi-check-circle-fill', text: info || 'Concluído' },
      error:   { cls: 'error',   icon: 'bi-x-circle-fill',     text: info || 'Falha' },
    }[status];

    el.className = `status-item ${cfg.cls}`;
    el.innerHTML = `<i class="bi ${cfg.icon}" aria-hidden="true"></i> <span><strong>${modulo}:</strong> ${cfg.text}</span>`;

    if (status !== 'pending') {
      setTimeout(() => { el.remove(); this.items = this.items.filter(i => i !== el); }, duration);
    }
  },

  log(msg, type = 'success') { this.show('Notificação', type, msg); },
};

const mostrarNotificacao = (m, t) => Logger.log(m, t === 'erro' ? 'error' : 'success');

// ============================================================================
// TROCA DE CONTAS
// ============================================================================
const AccountSwitcher = {
  KEY: 'savedAccounts',
  list: () => JSON.parse(localStorage.getItem(AccountSwitcher.KEY) || '[]'),
  save(acc) {
    const all = this.list().filter(a => a.id !== acc.id);
    all.unshift(acc);
    localStorage.setItem(this.KEY, JSON.stringify(all.slice(0, CONFIG.MAX_ACCOUNTS)));
  },
  remove(id) {
    localStorage.setItem(this.KEY, JSON.stringify(this.list().filter(a => a.id !== id)));
  },

  render() {
    const container = getContainer();
    const accounts = this.list();
    container.innerHTML = `
      <div class="profile-screen fade-in">
        <h1>Quem está utilizando?</h1>
        <div class="profile-list">
          ${accounts.map(a => `
            <div class="profile-card position-relative" onclick="AccountSwitcher.select('${a.id}')">
              <button class="btn-remove-profile"
                      onclick="event.stopPropagation(); AccountSwitcher.removeAndRender('${a.id}')"
                      title="Remover conta" aria-label="Remover ${a.nome}">×</button>
              <img src="${a.avatar || 'https://via.placeholder.com/140'}" class="profile-avatar" alt="${a.nome}" loading="lazy">
              <span>${a.nome}</span>
            </div>
          `).join('')}
          <div class="profile-card" onclick="AccountSwitcher.addAccount()">
            <div class="profile-avatar d-flex align-items-center justify-content-center bg-dark">
              <i class="bi bi-plus-lg" style="font-size:3rem;color:#808080;" aria-hidden="true"></i>
            </div>
            <span>Adicionar conta</span>
          </div>
        </div>
      </div>`;
  },

  select(id) {
    const acc = this.list().find(a => a.id === id);
    if (!acc) return;
    State.usuario = acc;
    State.perfil = null;
    localStorage.setItem('usuarioLogado', JSON.stringify(acc));
    atualizarUI();
    carregarHome();
  },

  removeAndRender(id) {
    if (!confirm('Remover esta conta da lista?')) return;
    this.remove(id);
    if (State.usuario?.id === id) {
      State.usuario = null;
      localStorage.removeItem('usuarioLogado');
      State.votosCache = [];
      atualizarUI();
      renderLandingPage();
      return;
    }
    this.render();
  },

  addAccount() {
    State.visitante = false;
    renderLandingPage('login');
  },
};

// ============================================================================
// LANDING PAGE (LOGIN / CADASTRO)
// ============================================================================
function renderLandingPage(mode = 'login') {
  const container = getContainer();
  const isLogin = mode === 'login';

  const loginHtml = `
    <div class="login_box">
      <h2>Entrar</h2>
      <form id="loginForm">
        <div class="input_box"><input type="email" id="loginEmail" placeholder="Email" autocomplete="email" required></div>
        <div class="input_box"><input type="password" id="loginSenha" placeholder="Senha" autocomplete="current-password" required></div>
        <button type="submit" class="submit-btn">Entrar</button>
      </form>
      <div class="support">
        <a href="https://github.com/danielbarbosabr" target="_blank" rel="noopener">Precisa de ajuda?</a>
        <button type="button" class="btn btn-link p-0 text-muted" style="font-size:13px;"
                onclick="State.visitante=true; carregarHome()">Entrar como Visitante</button>
      </div>
      <div class="register">
        <p>Novo por aqui? <a href="javascript:void(0)" onclick="renderLandingPage('register')">Cadastre-se</a>.</p>
      </div>
      ${footerHtml()}
    </div>`;

  const registerHtml = `
    <div class="login_box">
      <h2>Cadastre-se</h2>
      <form id="cadastroForm">
        <div class="input_box"><input type="text" id="cadastroNome" placeholder="Nome completo" autocomplete="name" required></div>
        <div class="input_box"><input type="email" id="cadastroEmail" placeholder="Email" autocomplete="email" required></div>
        <div class="input_box"><input type="password" id="cadastroSenha" placeholder="Senha" autocomplete="new-password" required></div>
        <div class="d-flex gap-2 mb-3">
          <input type="url" id="cadastroAvatar" placeholder="URL da foto de perfil (opcional)" style="flex:1;background:#333;border:none;border-radius:4px;padding:0 12px;color:#fff;height:46px;">
          <button type="button" class="btn btn-secondary" style="width:46px;" onclick="window.open('https://imgur.com/upload','_blank')" aria-label="Upload Imgur">
            <i class="bi bi-upload" aria-hidden="true"></i>
          </button>
        </div>
        <button type="submit" class="submit-btn">Cadastre-se</button>
      </form>
      <div class="register"><p>Já tem conta? <a href="javascript:void(0)" onclick="renderLandingPage('login')">Entrar</a>.</p></div>
      ${footerHtml()}
    </div>`;

  container.innerHTML = `
    <div class="auth-wrapper fade-in">
      <header class="auth-header">
        <a href="/" class="auth-brand">${SITE_NAME}</a>
      </header>
      <div class="login_body">${isLogin ? loginHtml : registerHtml}</div>
    </div>`;
}

function footerHtml() {
  return `
    <div class="terms">
      <p class="mb-1">A ideia do site é compartilhar conteúdos entre amigos.
        <a href="javascript:void(0)" onclick="abrirModalSaibaMais()" class="text-info">Saiba mais</a>
      </p>
      <a href="javascript:void(0)" onclick="compartilharSite()" class="text-danger fw-bold small">
        <i class="bi bi-share-fill me-1" aria-hidden="true"></i> Compartilhar com um amigo
      </a>
    </div>`;
}

window.compartilharSite = function () {
  const url = window.location.origin;
  const text = `Ei! Conheça o ${SITE_NAME}, a melhor plataforma para filmes, jogos e muito mais! 🎬🚀`;
  if (navigator.share) {
    navigator.share({ title: SITE_NAME, text, url }).catch(console.error);
  } else {
    navigator.clipboard.writeText(url).then(() => mostrarNotificacao('Link copiado! Compartilhe com seus amigos.'));
  }
};

window.abrirModalSaibaMais = () => new bootstrap.Modal(document.getElementById('modalSaibaMais')).show();

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
function iniciarSite() {
  if (State.iniciado) return;
  State.iniciado = true;

  const intro = document.getElementById('intro-animation');
  const main = document.getElementById('conteudo-principal');

  const reveal = () => {
    main.style.display = 'block';
    document.body.style.overflow = 'auto';
    rotearPaginaInicial();
  };

  if (intro && intro.style.display !== 'none') {
    intro.style.transition = 'opacity 0.5s ease-out';
    intro.style.opacity = '0';
    setTimeout(() => { intro.style.display = 'none'; reveal(); }, 500);
  } else {
    main.style.display = 'block';
    reveal();
  }
}

function rotearPaginaInicial() {
  if (!State.usuario && !State.visitante) {
    renderLandingPage();
  } else if (State.usuario) {
    AccountSwitcher.render();
  } else {
    carregarHome();
  }
}

document.addEventListener('DOMContentLoaded', () => setTimeout(iniciarSite, 1000));
setTimeout(iniciarSite, 5000); // fallback

// ============================================================================
// UI
// ============================================================================
function atualizarUI() {
  const logado = !!State.usuario;
  document.getElementById('nav-login').style.display    = logado ? 'none' : '';
  document.getElementById('nav-cadastro').style.display = logado ? 'none' : '';
  document.getElementById('nav-usuario').style.display  = logado ? 'block' : 'none';

  if (logado) {
    document.getElementById('userNome').textContent = State.perfil?.nome || State.usuario.nome;
    const av = document.getElementById('userAvatarContainer');
    av.innerHTML = State.usuario.avatar?.startsWith('http')
      ? `<img src="${State.usuario.avatar}" class="rounded-circle" style="width:32px;height:32px;object-fit:cover;" alt="" loading="lazy">`
      : `<i class="bi bi-person-circle fs-4" aria-hidden="true"></i>`;
  }
  aplicarTema();
}

window.addEventListener('scroll', () => {
  document.getElementById('main-navbar').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function aplicarTema() {
  document.body.classList.toggle('tema-escuro', State.modoEscuro);
  document.body.classList.toggle('tema-claro', !State.modoEscuro);
  const btn = document.getElementById('btn-tema');
  if (btn) btn.innerHTML = `<i class="bi bi-${State.modoEscuro ? 'brightness-high-fill' : 'moon-stars-fill'}" aria-hidden="true"></i>`;
}

window.toggleTema = function () {
  State.modoEscuro = !State.modoEscuro;
  localStorage.setItem('modoEscuro', State.modoEscuro);
  aplicarTema();
};

window.toggleConteudoAdulto = async function () {
  if (!State.usuario) return;
  State.usuario.conteudoAdulto = !State.usuario.conteudoAdulto;
  localStorage.setItem('usuarioLogado', JSON.stringify(State.usuario));
  await db.update('users', State.usuario.id, { conteudoAdulto: State.usuario.conteudoAdulto });
  mostrarNotificacao(`Conteúdo +18 ${State.usuario.conteudoAdulto ? 'ATIVADO' : 'DESATIVADO'}`);
  carregarPerfil();
};

function detectarDispositivo() {
  const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
  const el = document.getElementById('device-indicator');
  if (el) el.innerHTML = `<i class="bi bi-${mobile ? 'phone' : 'pc-display'} text-white" aria-hidden="true"></i>`;
}
window.addEventListener('resize', detectarDispositivo, { passive: true });

// ============================================================================
// AUTENTICAÇÃO
// ============================================================================
document.addEventListener('submit', async (e) => {
  if (e.target.id === 'loginForm') {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    const users = await db.fetch('users', `email=eq.${encodeURIComponent(email)}&senha=eq.${encodeURIComponent(senha)}`);
    if (users?.length) {
      State.usuario = users[0];
      localStorage.setItem('usuarioLogado', JSON.stringify(State.usuario));
      AccountSwitcher.save(State.usuario);
      atualizarUI();
      Logger.log('Bem-vindo de volta!');
      AccountSwitcher.render();
    } else {
      Logger.log('E-mail ou senha inválidos', 'error');
    }
  }

  if (e.target.id === 'cadastroForm') {
    e.preventDefault();
    const user = {
      id: uid(),
      nome: document.getElementById('cadastroNome').value.trim(),
      email: document.getElementById('cadastroEmail').value.trim(),
      senha: document.getElementById('cadastroSenha').value,
      avatar: document.getElementById('cadastroAvatar').value ||
              'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
      status: 'ativo',
      role: 'user',
      conteudoAdulto: false,
    };
    const res = await db.insert('users', user);
    if (res?.length) {
      State.usuario = res[0];
      localStorage.setItem('usuarioLogado', JSON.stringify(State.usuario));
      AccountSwitcher.save(State.usuario);
      atualizarUI();
      Logger.log('Conta criada com sucesso!');
      AccountSwitcher.render();
    } else {
      Logger.log('Erro ao criar conta', 'error');
    }
  }
});

document.getElementById('logout').addEventListener('click', () => {
  State.usuario = null;
  State.perfil = null;
  State.votosCache = [];
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('perfilAtivo');
  atualizarUI();
  Logger.log('Sessão encerrada');
  renderLandingPage();
});

// ============================================================================
// NAVEGAÇÃO
// ============================================================================
function setupNav(id, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { e.preventDefault(); fn(); });
}

[
  ['link-home',     () => carregarHome()],
  ['link-videos',   () => carregarCategoria('video')],
  ['link-jogos',    () => carregarCategoria('jogo')],
  ['link-livros',   () => carregarCategoria('livro')],
  ['link-audio',    () => carregarCategoria('audio')],
  ['link-chat-nav', () => carregarChat()],
  ['link-perfil',   () => carregarPerfil()],
  ['logo-principal',() => window.open('https://github.com/danielbarbosabr', '_blank')],
  ['link-trocar-conta', () => State.usuario ? AccountSwitcher.render() : Logger.log('Faça login primeiro', 'error')],
  ['link-plugins', () => {
    if (!State.usuario) { Logger.log('Faça login para adicionar plugins', 'error'); return; }
    new bootstrap.Modal(document.getElementById('addSourceModal')).show();
  }],
  ['link-adicionar', () => {
    if (!State.usuario) { Logger.log('Faça login para adicionar conteúdo', 'error'); return; }
    new bootstrap.Modal(document.getElementById('addConteudoModal')).show();
  }],
  ['link-editar-perfil-menu', () => abrirEdicaoPerfil()],
  ['btn-tema', () => toggleTema()],
].forEach(([id, fn]) => setupNav(id, fn));

['mobile-home','mobile-videos','mobile-jogos','mobile-livros','mobile-audio','mobile-chat'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', e => {
    e.preventDefault();
    const page = id.replace('mobile-', '');
    if (page === 'chat') carregarChat();
    else if (page === 'home') carregarHome();
    else carregarCategoria(page);
  });
});

document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const t = document.getElementById('searchInput').value.trim();
  if (t) carregarPesquisa(t);
});

// ============================================================================
// AVALIAÇÃO (5 ESTRELAS)
// ============================================================================
function gerarEstrelasDisplay(rating = 0, votes = 0) {
  if (!votes) return `<span class="text-muted small">Nenhuma avaliação</span>`;
  const full = Math.floor(rating), half = rating % 1 >= 0.5 ? 1 : 0, empty = 5 - full - half;
  const stars = '<i class="bi bi-star-fill" aria-hidden="true"></i>'.repeat(full)
    + (half ? '<i class="bi bi-star-half" aria-hidden="true"></i>' : '')
    + '<i class="bi bi-star" aria-hidden="true"></i>'.repeat(empty);
  return `<span class="text-warning" role="img" aria-label="${rating.toFixed(1)} de 5 estrelas">${stars}</span>
          <span class="text-muted small">${rating.toFixed(1)} (${votes} ${votes === 1 ? 'voto' : 'votos'})</span>`;
}

function gerarEstrelasVotacao(id, userRating = 0) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1).map(i =>
    `<i class="bi bi-star${i <= userRating ? '-fill' : ''}" data-rating="${i}"
        title="Avaliar com ${i} estrela(s)" aria-label="${i} estrela(s)"></i>`
  ).join('');
  return `<div class="rating-stars" data-id="${id}" role="group" aria-label="Avaliação">${stars}</div>`;
}

async function carregarVotosUsuario() {
  if (!State.usuario) return;
  State.votosCache = await db.fetch('votos', `usuarioId=eq.${State.usuario.id}`) || [];
}

async function votar(conteudoId, rating) {
  if (!State.usuario) {
    Logger.log('Faça login para avaliar', 'error');
    return null;
  }
  const [conteudo, votoExistente] = await Promise.all([
    db.getById('conteudos', conteudoId),
    db.fetch('votos', `conteudoId=eq.${conteudoId}&usuarioId=eq.${State.usuario.id}`),
  ]);
  if (!conteudo) return null;

  const oldRating = conteudo.rating || 0, oldVotes = conteudo.votes || 0;
  const prevRating = votoExistente?.[0]?.rating || 0;

  if (votoExistente?.length) await db.update('votos', votoExistente[0].id, { rating });
  else await db.insert('votos', { id: uid(), usuarioId: State.usuario.id, conteudoId, rating });

  // Atualiza cache local
  const idx = State.votosCache.findIndex(v => v.conteudoId == conteudoId);
  if (idx >= 0) State.votosCache[idx].rating = rating;
  else State.votosCache.push({ id: uid(), usuarioId: State.usuario.id, conteudoId, rating });

  const newTotal = prevRating ? oldRating * oldVotes - prevRating + rating : oldRating * oldVotes + rating;
  const newVotes = prevRating ? oldVotes : oldVotes + 1;
  const newAvg = newVotes ? newTotal / newVotes : 0;

  await db.update('conteudos', conteudoId, { rating: newAvg, votes: newVotes });
  Logger.log(`Avaliado com ${rating} ⭐`);
  return { rating: newAvg, votes: newVotes };
}

// Evento clique estrelas
document.addEventListener('click', async e => {
  const star = e.target.closest('.rating-stars > i');
  if (!star) return;
  e.stopPropagation();
  const wrap = star.parentElement;
  const rating = parseInt(star.dataset.rating);
  wrap.querySelectorAll('i').forEach(s => {
    s.className = `bi bi-star${parseInt(s.dataset.rating) <= rating ? '-fill' : ''}`;
  });
  const result = await votar(wrap.dataset.id, rating);
  if (result) {
    const el = document.getElementById('community-rating');
    if (el) el.innerHTML = gerarEstrelasDisplay(result.rating, result.votes);
  }
});

// ============================================================================
// DENÚNCIAS
// ============================================================================
async function denunciar(conteudoId) {
  if (!State.usuario) { Logger.log('Faça login para denunciar', 'error'); return; }
  const motivo = prompt('Motivo da denúncia:');
  if (!motivo?.trim()) return;

  const jaExiste = await db.fetch('denuncias', `conteudoId=eq.${conteudoId}&denuncianteId=eq.${State.usuario.id}`);
  if (jaExiste?.length) { Logger.log('Você já denunciou este conteúdo.', 'error'); return; }

  await db.insert('denuncias', {
    id: uid(), conteudoId, denuncianteId: State.usuario.id,
    motivo, data: new Date().toISOString(), status: 'pendente',
  });

  const conteudo = await db.getById('conteudos', conteudoId);
  if (!conteudo) return;
  const reports = (conteudo.reports || 0) + 1;
  await db.update('conteudos', conteudoId, { reports });

  if (reports >= 10) {
    await db.delete('conteudos', conteudoId);
    const votos = await db.fetch('votos', `conteudoId=eq.${conteudoId}`);
    await Promise.all(votos?.map(v => db.delete('votos', v.id)) || []);
    Logger.log('Conteúdo removido automaticamente por excesso de denúncias.');
  } else {
    Logger.log('Denúncia registrada. Obrigado!');
  }
}

// ============================================================================
// REMOVER / EDITAR CONTEÚDO
// ============================================================================
async function removerConteudo(conteudoId) {
  if (!State.usuario) return;
  const c = await db.getById('conteudos', conteudoId);
  if (!c) return;
  if (c.usuarioId !== State.usuario.id && State.usuario.role !== 'admin') {
    Logger.log('Apenas o autor pode remover.', 'error'); return;
  }
  if (!confirm(`Remover "${c.titulo}"?`)) return;
  await db.delete('conteudos', conteudoId);
  const votos = await db.fetch('votos', `conteudoId=eq.${conteudoId}`);
  await Promise.all(votos?.map(v => db.delete('votos', v.id)) || []);
  Logger.log('Conteúdo removido.');
  recarregarPaginaAtual();
}

async function editarConteudo(conteudoId) {
  if (!State.usuario) return;
  const c = await db.getById('conteudos', conteudoId);
  if (!c || (c.usuarioId !== State.usuario.id && State.usuario.role !== 'admin')) {
    Logger.log('Sem permissão para editar.', 'error'); return;
  }
  document.getElementById('editConteudoId').value = c.id;
  document.getElementById('editCategoria').value = c.categoria || 'video';
  document.getElementById('editTitulo').value = c.titulo || '';
  document.getElementById('editDescricao').value = c.descricao || '';
  document.getElementById('editAno').value = c.ano || '';
  document.getElementById('editCapa').value = c.capa || '';
  document.getElementById('editLink').value = c.link || '';
  document.getElementById('editAdultoCheck').checked = c.adulto || false;
  new bootstrap.Modal(document.getElementById('editarConteudoModal')).show();
}

document.getElementById('editarConteudoForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('editConteudoId').value;
  await db.update('conteudos', id, {
    categoria: document.getElementById('editCategoria').value,
    titulo:    document.getElementById('editTitulo').value,
    descricao: document.getElementById('editDescricao').value,
    ano:       document.getElementById('editAno').value,
    capa:      document.getElementById('editCapa').value,
    link:      document.getElementById('editLink').value,
    adulto:    document.getElementById('editAdultoCheck').checked,
  });
  bootstrap.Modal.getInstance(document.getElementById('editarConteudoModal'))?.hide();
  Logger.log('Conteúdo atualizado!');
  recarregarPaginaAtual();
});

function recarregarPaginaAtual() {
  const container = getContainer();
  const page = container?.dataset?.currentPage;
  if (!page) return carregarHome();
  if (page === 'perfil') carregarPerfil();
  else if (page === 'home') carregarHome();
  else if (page.startsWith('cat-')) carregarCategoria(page.replace('cat-', ''));
  else if (page === 'pesquisa') carregarPesquisa(State.termoPesquisa);
  else carregarHome();
}

// ============================================================================
// CARDS E CARROSSEL
// ============================================================================
function criarCardCarrossel(c, categoria) {
  if (c.id) State.conteudoCache[c.id] = c;
  const icon = getIcone(categoria || c.categoria);
  const img = c.capa
    ? `<img src="${c.capa}" alt="${c.titulo}" loading="lazy"
            style="width:100%;height:100%;object-fit:cover;object-position:center;"
            onerror="this.parentElement.innerHTML='<div class=\\'d-flex align-items-center justify-content-center h-100 bg-dark\\'><i class=\\'bi ${icon}\\' style=\\'font-size:60px;color:#444;\\'></i></div>'">`
    : `<div class="d-flex align-items-center justify-content-center h-100 bg-dark"><i class="bi ${icon}" style="font-size:60px;color:#444;" aria-hidden="true"></i></div>`;

  return `
    <div class="carousel-card" onclick="verDetalhes('${c.id}')" tabindex="0" role="button"
         onkeydown="if(event.key==='Enter')verDetalhes('${c.id}')" aria-label="${c.titulo}">
      <div class="img-container rounded shadow-sm" style="height:150px;overflow:hidden;position:relative;">${img}
        <div class="card-img-overlay d-flex flex-column justify-content-end p-2"
             style="background:linear-gradient(to top,rgba(0,0,0,0.9),transparent);">
          <small class="text-white text-truncate" style="font-size:0.7rem;">${c.fonte || ''}</small>
        </div>
      </div>
      <div class="card-body p-2">
        <h6 class="card-title-overlay text-white text-truncate mb-0" style="font-size:0.9rem;">${c.titulo}</h6>
      </div>
    </div>`;
}

function criarCardGrade(c, categoria) {
  if (c.id) State.conteudoCache[c.id] = c;
  const isOwner = c.usuarioId === State.usuario?.id || State.usuario?.role === 'admin';
  const icon = getIcone(categoria || c.categoria);
  const img = c.capa
    ? `<img src="${c.capa}" alt="${c.titulo}" loading="lazy"
            style="width:100%;height:100%;object-fit:cover;object-position:center;"
            onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a1a1a;\\'><i class=\\'bi ${icon}\\' style=\\'font-size:60px;color:#666;\\'></i></div>'">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a1a1a;"><i class="bi ${icon}" style="font-size:60px;color:#666;" aria-hidden="true"></i></div>`;

  const rmBtn = isOwner ? `<button class="btn btn-sm btn-outline-danger p-0 px-1 ms-1" onclick="event.stopPropagation();removerConteudo('${c.id}')" aria-label="Remover ${c.titulo}"><i class="bi bi-trash" aria-hidden="true"></i></button>` : '';

  return `
    <div class="col">
      <div class="card h-100 border-secondary bg-dark" onclick="verDetalhes('${c.id}')"
           tabindex="0" role="button" onkeydown="if(event.key==='Enter')verDetalhes('${c.id}')" aria-label="${c.titulo}">
        <div class="img-container" style="width:100%;height:150px;overflow:hidden;background:#1a1a1a;display:flex;align-items:center;justify-content:center;">${img}</div>
        <div class="card-body p-2 d-flex flex-column">
          <h6 class="card-title text-truncate mb-1" title="${c.titulo}">${c.titulo}</h6>
          <small class="text-muted mb-2" style="font-size:0.75rem;">${c.ano || ''}</small>
          <div class="mt-auto d-flex justify-content-between align-items-end">
            <small class="text-danger fw-bold" style="font-size:0.7rem;">${c.fonte || ''}</small>
            ${rmBtn}
          </div>
        </div>
      </div>
    </div>`;
}

function criarCarrossel(titulo, itens, categoria) {
  if (!itens?.length) {
    return `<div class="category-row mb-5">
      <h4 class="mb-3 category-title ms-2">${titulo}</h4>
      <p class="text-muted ms-2">Nenhum conteúdo encontrado.</p>
    </div>`;
  }
  const cId = 'car-' + uid();
  return `
    <div class="category-row mb-5 group-carousel">
      <h4 class="mb-3 category-title ms-2">${titulo}</h4>
      <div class="position-relative">
        <button class="btn-scroll left-btn" onclick="scrollCarousel('${cId}',-1)" aria-label="Anterior"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>
        <div class="carousel-container" id="${cId}" role="list">
          <div class="carousel-items">
            ${itens.map(item => criarCardCarrossel(item, categoria)).join('')}
          </div>
        </div>
        <button class="btn-scroll right-btn" onclick="scrollCarousel('${cId}',1)" aria-label="Próximo"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>
      </div>
    </div>`;
}

window.scrollCarousel = (id, dir) => {
  const el = document.getElementById(id);
  if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
};

// ============================================================================
// FETCH HELPERS (PROXIES / TIMEOUT)
// ============================================================================
async function fetchWithProxy(url, timeout = 5000) {
  const proxies = ['https://corsproxy.io/?', 'https://api.allorigins.win/raw?url='];
  for (const proxy of proxies) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeout);
      const res = await fetch(proxy + encodeURIComponent(url), { signal: ctrl.signal });
      clearTimeout(t);
      if (res.ok) return res;
    } catch {}
  }
  throw new Error('Proxies esgotados');
}

function gerarId(fonte, titulo) {
  return btoa(unescape(encodeURIComponent(`${fonte}-${titulo}`.slice(0, 80)))).replace(/=/g, '').slice(0, 20);
}

function deduplicar(arr) {
  const seen = new Set();
  return arr.filter(item => {
    if (!item?.titulo) return false;
    const k = (item.titulo + (item.fonte || '')).toLowerCase().replace(/\s/g, '');
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// ============================================================================
// FONTES DE BUSCA
// ============================================================================
async function buscarYTS(termo = '', limite = 20) {
  try {
    const url = `https://yts.mx/api/v2/list_movies.json?${termo ? `query_term=${encodeURIComponent(termo)}&` : ''}limit=${limite}&sort_by=download_count`;
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const d = await r.json();
    return (d.data?.movies || []).map(m => ({
      id: gerarId('YTS', m.title), titulo: m.title,
      descricao: `${m.genres?.join(', ') || 'Filme'} | ${m.runtime || '?'} min`,
      ano: m.year?.toString() || '', capa: m.medium_cover_image || null,
      link: m.url, fonte: 'YTS', categoria: 'video',
    }));
  } catch { return []; }
}

async function buscarTvmaze(termo = '', limite = 20) {
  try {
    const url = termo ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(termo)}` : 'https://api.tvmaze.com/shows?page=1';
    const r = await fetch(url);
    const d = await r.json();
    const shows = termo ? d.map(i => i.show) : d;
    return shows.slice(0, limite).map(s => ({
      id: gerarId('TVmaze', s.name), titulo: s.name,
      descricao: s.summary?.replace(/<[^>]*>/g, '').slice(0, 150) || 'Série',
      ano: s.premiered?.slice(0, 4) || '', capa: s.image?.medium || null,
      link: s.url, fonte: 'TVmaze', categoria: 'video',
    }));
  } catch { return []; }
}

async function buscarOpenLibrary(termo = '', limite = 20) {
  try {
    const url = termo
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}&limit=${limite}`
      : `https://openlibrary.org/subjects/fiction.json?limit=${limite}`;
    const r = await fetch(url);
    const d = await r.json();
    const items = termo ? d.docs : d.works;
    return (items || []).slice(0, limite).map(w => ({
      id: gerarId('OpenLibrary', w.title), titulo: w.title,
      descricao: w.author_name ? `Por ${w.author_name[0]}` : 'Literatura',
      ano: w.first_publish_year?.toString() || '', capa: (w.cover_i || w.cover_id) ? `https://covers.openlibrary.org/b/id/${w.cover_i || w.cover_id}-M.jpg` : null,
      link: `https://openlibrary.org${w.key}`, fonte: 'Open Library', categoria: 'livro',
    }));
  } catch { return []; }
}

async function buscarITunes(termo = '', limite = 20) {
  try {
    const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(termo || 'pop')}&limit=${limite}`);
    const d = await r.json();
    return d.results.map(i => ({
      id: gerarId('iTunes', i.trackName || i.collectionName), titulo: i.trackName || i.collectionName,
      descricao: `${i.artistName} — ${i.collectionName || ''}`,
      ano: i.releaseDate?.slice(0, 4) || '', capa: i.artworkUrl100?.replace('100x100', '300x300') || null,
      link: i.trackViewUrl, fonte: 'iTunes', categoria: 'audio',
    }));
  } catch { return []; }
}

async function buscarGamerPower(termo = '', limite = 20) {
  try {
    const url = `https://www.gamerpower.com/api/giveaways${termo ? `?title=${encodeURIComponent(termo)}` : ''}`;
    const r = await fetch(url);
    const d = await r.json();
    return (Array.isArray(d) ? d : []).slice(0, limite).map(j => ({
      id: gerarId('GamerPower', j.title), titulo: j.title,
      descricao: j.description || 'Jogo gratuito', ano: '2025',
      capa: j.image || null, link: j.open_giveaway_url, fonte: 'GamerPower', categoria: 'jogo',
    }));
  } catch { return []; }
}

async function buscarInternetArchive(termo, tipo = 'geral', limite = 20) {
  try {
    const colMap = {
      video: '(collection:feature_films OR collection:movies)',
      jogo:  '(collection:internetarcade OR collection:softwarelibrary_sn)',
      audio: '(collection:librivoxaudio OR collection:audio)',
      livro: '(collection:texts OR collection:books)',
    };
    const coll = colMap[tipo] || '';
    const q = coll ? `${coll} AND (${encodeURIComponent(termo)})` : encodeURIComponent(termo);
    const r = await fetch(`https://archive.org/advancedsearch.php?q=${q}&fl=identifier,title,description,year&rows=${limite}&output=json&sort[]=downloads+desc`);
    const d = await r.json();
    const catMap = { audio: 'audio', jogo: 'jogo', video: 'video' };
    return (d.response?.docs || []).map(i => ({
      id: gerarId('Archive', i.title), titulo: i.title,
      descricao: (Array.isArray(i.description) ? i.description[0] : i.description) || 'Internet Archive',
      ano: i.year?.toString() || '', capa: i.identifier ? `https://archive.org/services/img/${i.identifier}` : null,
      link: `https://archive.org/details/${i.identifier}`, fonte: 'Archive', categoria: catMap[tipo] || 'geral',
    }));
  } catch { return []; }
}

async function buscarIAGL(termo = '', limite = 30) {
  const colecoes = [
    'softwarelibrary_snes','softwarelibrary_genesis','softwarelibrary_n64',
    'softwarelibrary_psx','softwarelibrary_gba','internetarcade','softwarelibrary_msdos',
  ];
  const resultados = [];
  await Promise.allSettled(colecoes.map(async col => {
    try {
      const q = termo ? `collection:${col} AND title:(${encodeURIComponent(termo)})` : `collection:${col}`;
      const r = await fetch(`https://archive.org/advancedsearch.php?q=${q}&fl=identifier,title,year&rows=5&output=json&sort[]=downloads+desc`, { signal: AbortSignal.timeout(5000) });
      const d = await r.json();
      (d.response?.docs || []).forEach(i => {
        resultados.push({ id: gerarId('IAGL', i.title), titulo: i.title, descricao: `Coleção: ${col}`, ano: i.year?.toString() || '', capa: `https://archive.org/services/img/${i.identifier}`, link: `https://archive.org/details/${i.identifier}`, fonte: 'IAGL', categoria: 'jogo' });
      });
    } catch {}
  }));
  return deduplicar(resultados).slice(0, limite);
}

// 1337x — busca via proxy (torrents PT-BR)
async function buscar1337x(termo, categoria = 'video', limite = 20) {
  try {
    const mostrarAdulto = State.usuario?.conteudoAdulto;
    const query = termo || (categoria === 'jogo' ? 'pc game' : 'filme dublado');
    const url = `https://www.1377x.to/sort-search/${encodeURIComponent(query)}/seeders/desc/1/`;
    const res = await fetchWithProxy(url, 10000);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('table.table tbody tr');
    const results = [];
    rows.forEach(row => {
      const nameEl = row.querySelector('.coll-1 a:nth-child(2)');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      if (!mostrarAdulto && /\b(xxx|porn|sex|hentai|erotic|nsfw|18\+)\b/i.test(name)) return;
      if (categoria === 'video' && !/(dublado|legendado|portugu[êe]s|nacional|pt-br|dual|brazil|\bbr\b|1080p|720p|bluray|web-dl)/i.test(name)) return;
      const link  = 'https://www.1377x.to' + nameEl.getAttribute('href');
      const seeds = row.querySelector('.coll-2')?.textContent?.trim() || '0';
      const size  = row.querySelector('.coll-4')?.textContent?.trim() || '?';
      results.push({
        id: gerarId('1337x', name), titulo: name,
        descricao: `👤 ${seeds} seeds | 💾 ${size}`,
        ano: '', capa: null,
        link, fonte: '1337x', categoria,
      });
    });
    return results.slice(0, limite);
  } catch { return []; }
}

async function buscarHydraAPI(termo = '', limite = 20) {
  const sources = [
    { nome: 'SteamRip',  url: 'https://hydralinks.pages.dev/sources/steamrip.json' },
    { nome: 'OnlineFix', url: 'https://hydralinks.pages.dev/sources/onlinefix.json' },
    { nome: 'Dodi',      url: 'https://hydralinks.pages.dev/sources/dodi.json' },
    { nome: 'FitGirl',   url: 'https://hydralinks.pages.dev/sources/fitgirl.json' },
    { nome: 'GOG',       url: 'https://hydralinks.pages.dev/sources/gog.json' },
  ];
  const resultados = [];
  await Promise.allSettled(sources.map(async src => {
    try {
      const r = await withTimeout(fetch(src.url), 5000);
      if (!r?.ok) return;
      const d = await r.json();
      (d.downloads || [])
        .filter(i => !termo || i.title.toLowerCase().includes(termo.toLowerCase()))
        .slice(0, Math.ceil(limite / sources.length))
        .forEach(i => resultados.push({
          id: gerarId(src.nome, i.title), titulo: i.title,
          descricao: `Tamanho: ${i.fileSize || 'N/A'}`, ano: '', capa: null,
          link: i.uris?.[0] || '#', fonte: src.nome, categoria: 'jogo',
        }));
    } catch {}
  }));
  return resultados.slice(0, limite);
}

async function buscarEmStremio(termo) {
  const results = [];
  for (const src of State.sources.filter(s => s.tipo === 'stremio')) {
    try {
      const url = src.url.replace('{termo}', encodeURIComponent(termo));
      const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!r.ok) continue;
      const d = await r.json();
      (d.streams || []).forEach(s => results.push({
        id: gerarId(src.nome, s.title), titulo: s.title, descricao: s.description || 'Stream',
        ano: '', capa: s.poster || null,
        link: s.infoHash ? `magnet:?xt=urn:btih:${s.infoHash}` : s.url,
        fonte: src.nome, categoria: 'video',
      }));
    } catch {}
  }
  return results;
}

// ============================================================================
// PÁGINAS DE CATEGORIA
// ============================================================================
async function carregarHome() {
  const container = getContainer();
  container.dataset.currentPage = 'home';
  State.paginaAnterior = { tipo: 'home' };
  container.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Carregando...</span></div></div>';
  document.getElementById('load-more-container').innerHTML = '';

  const [filmes, series, jogos, comunidade] = await Promise.all([
    withTimeout(buscarYTS('', 20)),
    withTimeout(buscarTvmaze('', 20)),
    withTimeout(buscarHydraAPI('', 20)),
    withTimeout(db.fetch('conteudos', 'status=eq.ativo&order=rating.desc&limit=20'), 5000, []),
  ]);

  const hero = comunidade?.[0] || filmes?.[0];
  const heroHtml = hero ? `
    <div class="hero-banner mb-5" style="background-image:linear-gradient(to right,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0) 100%),url('${hero.capa || ''}');" role="banner">
      <div class="hero-content">
        <h1 class="hero-title">${hero.titulo}</h1>
        <p class="hero-description">${hero.descricao?.slice(0, 150) || ''}</p>
        <button class="btn btn-danger btn-lg" onclick="verDetalhes('${hero.id}')">
          <i class="bi bi-play-fill" aria-hidden="true"></i> Ver Mais
        </button>
      </div>
    </div>` : '';

  if (container.dataset.currentPage === 'home') {
    container.innerHTML = `<div class="fade-in">
      ${heroHtml}
      ${criarCarrossel('Destaques da Comunidade', comunidade, '')}
      ${criarCarrossel('Filmes em Alta', filmes, 'video')}
      ${criarCarrossel('Séries em Alta', series, 'video')}
      ${criarCarrossel('Jogos para PC', jogos, 'jogo')}
    </div>`;
  }
}

async function carregarCategoria(cat) {
  const container = getContainer();
  container.dataset.currentPage = `cat-${cat}`;
  State.paginaAnterior = { tipo: 'categoria', valor: cat };
  container.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Carregando...</span></div></div>';
  document.getElementById('load-more-container').innerHTML = '';

  let html = '';
  try {
    if (cat === 'video') {
      const [filmes, series, torrents] = await Promise.all([
        withTimeout(buscarYTS('', 20)),
        withTimeout(buscarTvmaze('', 20)),
        withTimeout(buscar1337x('filme', 'video', 20)),
      ]);
      html = `<div class="fade-in">
        ${criarCarrossel('Filmes', filmes, 'video')}
        ${criarCarrossel('Séries', series, 'video')}
        ${criarCarrossel('Torrents PT-BR (1337x)', torrents, 'video')}
        ${criarCarrossel('Archive: Clássicos', await withTimeout(buscarInternetArchive('film', 'video', 20)), 'video')}
      </div>`;
    } else if (cat === 'jogo') {
      const [pc, retro, torrents1337] = await Promise.all([
        withTimeout(buscarHydraAPI('', 20)),
        withTimeout(buscarIAGL('', 20)),
        withTimeout(buscar1337x('pc game', 'jogo', 20)),
      ]);
      html = `<div class="fade-in">
        ${criarCarrossel('Jogos PC (Hydra)', pc, 'jogo')}
        ${criarCarrossel('Jogos Retrô', retro, 'jogo')}
        ${criarCarrossel('Torrents PC (1337x)', torrents1337, 'jogo')}
        ${criarCarrossel('Grátis (GamerPower)', await withTimeout(buscarGamerPower('', 20)), 'jogo')}
      </div>`;
    } else if (cat === 'livro') {
      const livros = await withTimeout(buscarOpenLibrary('', 30));
      html = `<div class="fade-in">
        ${criarCarrossel('Literatura', livros, 'livro')}
        ${criarCarrossel('Archive: Livros', await withTimeout(buscarInternetArchive('book', 'livro', 20)), 'livro')}
      </div>`;
    } else if (cat === 'audio') {
      const musicas = await withTimeout(buscarITunes('pop', 20));
      html = `<div class="fade-in">${criarCarrossel('Músicas', musicas, 'audio')}</div>`;
    }
  } catch (e) {
    console.error(e);
    html = `<p class="text-danger">Erro ao carregar. Tente novamente.</p>`;
  }

  if (container.dataset.currentPage === `cat-${cat}`) container.innerHTML = html;
}

async function carregarPesquisa(termo = '', pagina = 1) {
  const container = getContainer();
  container.dataset.currentPage = 'pesquisa';
  State.paginaAnterior = { tipo: 'pesquisa', valor: termo };
  document.getElementById('load-more-container').innerHTML = '';
  if (!termo) { container.innerHTML = '<h4>Digite algo para pesquisar</h4>'; return; }

  State.termoPesquisa = termo;

  if (pagina === 1) {
    container.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Carregando...</span></div></div>';

    const [local, yt, tv, lib, music, jogos, torrents] = await Promise.all([
      withTimeout(db.fetch('conteudos', `status=eq.ativo&titulo=ilike.*${termo}*&limit=30`), 5000, []),
      withTimeout(buscarYTS(termo, 20)),
      withTimeout(buscarTvmaze(termo, 20)),
      withTimeout(buscarOpenLibrary(termo, 20)),
      withTimeout(buscarITunes(termo, 20)),
      withTimeout(buscarHydraAPI(termo, 20)),
      withTimeout(buscar1337x(termo, 'video', 15)),
    ]);

    let all = [...(local||[]), ...yt, ...tv, ...lib, ...music, ...jogos, ...torrents];
    all = deduplicar(all).sort((a, b) => (b.rating || 0) - (a.rating || 0));
    State.pesquisaCache = all;
  }

  State.paginaPesquisa = pagina;
  const total = Math.ceil(State.pesquisaCache.length / CONFIG.ITENS_POR_PAGINA);
  const start = (pagina - 1) * CONFIG.ITENS_POR_PAGINA;
  const paginados = State.pesquisaCache.slice(start, start + CONFIG.ITENS_POR_PAGINA);
  const cardsHtml = paginados.map(c => criarCardGrade(c, c.categoria)).join('');

  if (pagina === 1) {
    container.innerHTML = `<div class="fade-in">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Resultados para "<strong>${termo}</strong>"</h4>
        <span class="text-muted small">${State.pesquisaCache.length} encontrados</span>
      </div>
      <div id="resultados-pesquisa" class="row row-cols-2 row-cols-md-4 g-3" role="list">${cardsHtml}</div>
    </div>`;
  } else {
    document.getElementById('resultados-pesquisa')?.insertAdjacentHTML('beforeend', cardsHtml);
  }

  const lm = document.getElementById('load-more-container');
  if (pagina < total) {
    lm.innerHTML = `<button class="btn btn-danger btn-lg" id="load-more-btn">Carregar Mais</button>`;
    document.getElementById('load-more-btn').onclick = () => carregarPesquisa(termo, pagina + 1);
  }
}

// ============================================================================
// CHAT
// ============================================================================
async function carregarChat() {
  const container = getContainer();
  container.dataset.currentPage = 'chat';
  State.paginaAnterior = { tipo: 'chat' };
  document.getElementById('load-more-container').innerHTML = '';
  container.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Carregando...</span></div></div>';

  const expiry = new Date(Date.now() - CONFIG.CHAT_EXPIRY_MS).toISOString();
  const posts = await db.fetch('posts', `data=gte.${expiry}&order=data.asc`) || [];

  // Limpa mensagens antigas
  db.deleteWhere('posts', `data=lt.${expiry}`).catch(console.error);

  const postsRendered = await Promise.all(posts.map(async p => {
    const autor = await db.getById('users', p.usuarioId).catch(() => null) ||
                  { nome: 'Usuário ' + (p.usuarioId || '').slice(-4), avatar: null };
    let euCurti = false;
    if (State.usuario) {
      const r = await db.fetch('reacoes', `post_id=eq.${p.id}&usuario_id=eq.${State.usuario.id}`);
      euCurti = !!r?.length;
    }
    return { ...p, autor, euCurti };
  }));

  const mensagensHtml = postsRendered.map(p => renderMensagem(p)).join('');

  const inputHtml = State.usuario ? `
    <div id="reply-preview-bar" class="reply-preview-container" style="display:none;">
      <div class="reply-preview-header">
        <span class="reply-author fw-bold text-danger" style="font-size:0.8rem;"></span>
        <button class="btn btn-sm btn-link text-muted p-0" onclick="cancelReply()" aria-label="Cancelar resposta"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
      </div>
      <div class="reply-preview-content text-muted small text-truncate"></div>
    </div>
    <form class="chat-input-container" id="novoPostForm">
      <div class="chat-input-box">
        <button type="button" class="btn btn-link text-muted p-0 me-2" id="btnAnexoLink" title="Anexar link" aria-label="Anexar link">
          <i class="bi bi-paperclip fs-5" aria-hidden="true"></i>
        </button>
        <textarea class="chat-textarea" id="postTexto" rows="1" placeholder="Digite sua mensagem..." aria-label="Mensagem"></textarea>
        <button type="submit" class="btn-send" aria-label="Enviar mensagem"><i class="bi bi-send-fill" aria-hidden="true"></i></button>
      </div>
      <input type="url" class="form-control mt-2 bg-dark text-white border-secondary" id="postLink"
             placeholder="Cole o link do anexo aqui..." style="display:none;" aria-label="URL do anexo">
    </form>` : `<div class="chat-input-container text-center"><span class="text-muted">Faça login para participar.</span></div>`;

  container.innerHTML = `
    <div class="chat-layout" role="main">
      <div class="chat-header">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-chat-quote-fill fs-4 text-danger" aria-hidden="true"></i>
          <h5 class="mb-0">Comunidade</h5>
        </div>
        <span class="text-muted small">${posts.length} mensagens</span>
      </div>
      <div class="chat-messages-area" id="chat-feed" role="log" aria-live="polite" aria-label="Mensagens da comunidade">${mensagensHtml}</div>
      ${inputHtml}
    </div>`;

  const feed = document.getElementById('chat-feed');
  if (feed) feed.scrollTop = feed.scrollHeight;

  if (State.usuario) setupChatForm();
}

function renderMensagem(p) {
  const isMe = State.usuario && String(p.usuarioId) === String(State.usuario.id);
  const cls = isMe ? 'self' : 'other';
  const time = new Date(p.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const avatar = p.autor?.avatar?.startsWith('http') ? p.autor.avatar : 'https://via.placeholder.com/40?text=U';
  const name = p.autor?.nome || 'Anônimo';
  const canDelete = isMe || State.usuario?.role === 'admin';

  const replyHtml = p.replyTo ? `
    <div class="quoted-message" onclick="scrollToMessage('${p.replyTo.id}')" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter')scrollToMessage('${p.replyTo.id}')">
      <div class="quoted-author">${p.replyTo.author}</div>
      <div class="quoted-text">${p.replyTo.text}</div>
    </div>` : '';

  return `
    <div class="chat-msg ${cls}" id="post-${p.id}" role="article">
      <img src="${avatar}" class="chat-avatar" alt="${name}" loading="lazy">
      <div style="max-width:100%;">
        <div class="chat-info">${!isMe ? `<strong>${name}</strong>` : ''}<span>${time}</span></div>
        <div class="chat-bubble">
          ${replyHtml}
          <div class="message-content" id="msg-content-${p.id}">${p.texto || ''}</div>
          ${p.anexo_url ? `<div class="mt-2">${renderAnexo(p.anexo_url)}</div>` : ''}
        </div>
        <div class="chat-info mt-1" style="justify-content:${isMe ? 'flex-end' : 'flex-start'};">
          <button class="btn btn-link p-0 text-muted" onclick="startReply('${p.id}','${name.replace(/'/g,"\\'")}' )" aria-label="Responder">
            <i class="bi bi-reply-fill" aria-hidden="true"></i>
          </button>
          ${isMe ? `<button class="btn btn-link p-0 text-muted" onclick="editarMensagem('${p.id}')" aria-label="Editar"><i class="bi bi-pencil-fill" style="font-size:0.8rem;" aria-hidden="true"></i></button>` : ''}
          <button class="btn btn-link p-0 ${p.euCurti ? 'text-danger' : 'text-muted'} ms-1" onclick="curtirPost('${p.id}')" aria-label="${p.euCurti ? 'Descurtir' : 'Curtir'}">
            <i class="bi bi-heart${p.euCurti ? '-fill' : ''}" aria-hidden="true"></i> ${p.curtidas > 0 ? p.curtidas : ''}
          </button>
          ${canDelete ? `<button class="btn btn-link p-0 text-muted ms-1" onclick="removerPost('${p.id}')" aria-label="Remover"><i class="bi bi-trash" aria-hidden="true"></i></button>` : ''}
        </div>
      </div>
    </div>`;
}

function renderAnexo(url) {
  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || /imgur|ibb\.co/i.test(url)) {
    return `<img src="${url}" class="img-fluid rounded" style="max-height:300px;" alt="Anexo" loading="lazy">`;
  }
  if (/youtube\.com\/watch\?v=|youtu\.be\//i.test(url)) {
    const id = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('/').pop();
    return `<div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/${id}" allowfullscreen title="Vídeo YouTube"></iframe></div>`;
  }
  if (/vimeo\.com/i.test(url)) {
    return `<div class="ratio ratio-16x9"><iframe src="https://player.vimeo.com/video/${url.split('/').pop()}" allowfullscreen title="Vídeo Vimeo"></iframe></div>`;
  }
  if (/\.(mp4|webm|ogg)$/i.test(url)) return `<video src="${url}" controls class="w-100 rounded"></video>`;
  if (/\.(mp3|wav|m4a)$/i.test(url)) return `<audio src="${url}" controls class="w-100"></audio>`;
  return `<a href="${url}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-light">Ver anexo</a>`;
}

function setupChatForm() {
  const form     = document.getElementById('novoPostForm');
  const textarea = document.getElementById('postTexto');
  const linkInput = document.getElementById('postLink');
  const btnAnexo = document.getElementById('btnAnexoLink');

  btnAnexo?.addEventListener('click', () => {
    linkInput.style.display = linkInput.style.display === 'none' ? 'block' : 'none';
    if (linkInput.style.display === 'block') linkInput.focus();
  });

  textarea?.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });

  textarea?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event('submit')); }
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const texto = textarea.value.trim();
    const link  = linkInput.value.trim();
    if (!texto && !link) return;

    const res = await db.insert('posts', {
      id: uid(), usuarioId: State.usuario.id, texto,
      anexo_url: link || null, conteudoId: null, curtidas: 0,
      data: new Date().toISOString(),
      replyTo: State.currentReply ? { ...State.currentReply } : null,
    });

    if (res) {
      textarea.value = ''; linkInput.value = ''; textarea.style.height = 'auto';
      cancelReply();
      carregarChat();
    } else {
      Logger.log('Erro ao enviar mensagem.', 'error');
    }
  });
}

window.curtirPost = async function (postId) {
  if (!State.usuario) { Logger.log('Faça login para curtir', 'error'); return; }
  const [r, post] = await Promise.all([
    db.fetch('reacoes', `post_id=eq.${postId}&usuario_id=eq.${State.usuario.id}`),
    db.getById('posts', postId),
  ]);
  let likes = post?.curtidas || 0;
  if (r?.length) { await db.delete('reacoes', r[0].id); likes = Math.max(0, likes - 1); }
  else { await db.insert('reacoes', { id: uid(), post_id: postId, usuario_id: State.usuario.id }); likes++; }
  await db.update('posts', postId, { curtidas: likes });
  carregarChat();
};

window.removerPost = async function (postId) {
  if (!State.usuario) return;
  const post = await db.getById('posts', postId);
  if (!post || (post.usuarioId !== State.usuario.id && State.usuario.role !== 'admin')) { Logger.log('Sem permissão', 'error'); return; }
  if (confirm('Remover esta mensagem?')) { await db.delete('posts', postId); carregarChat(); }
};

window.editarMensagem = async function (postId) {
  if (!State.usuario) return;
  const post = await db.getById('posts', postId);
  if (!post || (String(post.usuarioId) !== String(State.usuario.id) && State.usuario.role !== 'admin')) { Logger.log('Sem permissão', 'error'); return; }
  const el = document.getElementById(`msg-content-${postId}`);
  if (!el) return;
  el.innerHTML = `<input type="text" id="edit-input-${postId}" value="${el.innerText.replace(/"/g, '&quot;')}"
    style="background:transparent;border:none;color:inherit;width:100%;outline:none;" autofocus
    onblur="salvarEdicao('${postId}')" onkeydown="if(event.key==='Enter'){event.preventDefault();salvarEdicao('${postId}');}">`;
  document.getElementById(`edit-input-${postId}`)?.focus();
};

window.salvarEdicao = async function (postId) {
  const input = document.getElementById(`edit-input-${postId}`);
  if (!input) return;
  const text = input.value.trim();
  if (!text) { Logger.log('Mensagem não pode ficar vazia.', 'error'); carregarChat(); return; }
  await db.update('posts', postId, { texto: text, editado: true });
  carregarChat();
};

window.startReply = function (postId, authorName) {
  const el = document.getElementById('post-' + postId);
  if (!el) return;
  const text = (el.querySelector('.message-content')?.textContent || '').slice(0, 100);
  State.currentReply = { id: postId, author: authorName, text };
  const bar = document.getElementById('reply-preview-bar');
  if (bar) {
    bar.style.display = 'block';
    bar.querySelector('.reply-author').textContent = `Respondendo a ${authorName}`;
    bar.querySelector('.reply-preview-content').textContent = text;
  }
};

window.cancelReply = function () {
  State.currentReply = null;
  const bar = document.getElementById('reply-preview-bar');
  if (bar) bar.style.display = 'none';
};

window.scrollToMessage = function (postId) {
  const el = document.getElementById('post-' + postId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('highlight-message');
    setTimeout(() => el.classList.remove('highlight-message'), 2000);
  }
};

// ============================================================================
// PERFIL
// ============================================================================
async function carregarPerfil() {
  if (!State.usuario) { Logger.log('Faça login para ver o perfil', 'error'); return; }
  const container = getContainer();
  container.dataset.currentPage = 'perfil';
  State.paginaAnterior = { tipo: 'perfil' };
  container.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Carregando...</span></div></div>';

  const [conteudos, votos, notifs, plugins, acessos] = await Promise.all([
    withTimeout(db.fetch('conteudos', `usuarioId=eq.${State.usuario.id}`), 5000, []),
    withTimeout(db.fetch('votos',     `usuarioId=eq.${State.usuario.id}`), 5000, []),
    withTimeout(db.fetch('notificacoes', `usuarioId=eq.${State.usuario.id}&lida=eq.false`), 5000, []),
    withTimeout(db.fetch('sources',   `usuarioId=eq.${State.usuario.id}`), 5000, []),
    withTimeout(db.fetch('acessosRecentes', `usuarioId=eq.${State.usuario.id}&order=data.desc&limit=12`), 5000, []),
  ]);
  const strikes = State.usuario.strikes || 0;

  // Helper: renderiza card clicável de conteúdo
  const renderContentCard = (c, metaExtra = '') => `
    <div class="profile-content-card" onclick="verDetalhes('${c.id}')" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter')verDetalhes('${c.id}')">
      ${c.capa ? `<img src="${c.capa}" alt="${c.titulo}" loading="lazy" style="width:54px;height:76px;object-fit:cover;border-radius:4px;flex-shrink:0;">` : `<i class="bi ${getIcone(c.categoria)} fs-3" style="flex-shrink:0;" aria-hidden="true"></i>`}
      <div class="info">
        <span class="title">${c.titulo || 'Sem título'}</span>
        <span class="meta">${metaExtra || c.categoria || ''}</span>
      </div>
    </div>`;

  const renderCards = (items, metaFn = null) => items?.length
    ? items.slice(0, 10).map(c => renderContentCard(c, metaFn ? metaFn(c) : '')).join('')
    : '<div class="profile-empty">Nenhum item.</div>';

  // Renderiza histórico buscando dados reais de cada acesso
  const renderHistorico = async () => {
    if (!acessos?.length) return '<div class="profile-empty">Nenhum acesso recente.</div>';
    const conteudosHistorico = await Promise.allSettled(
      acessos.map(a => withTimeout(db.getById('conteudos', a.conteudoId), 3000, null))
    );
    const validos = conteudosHistorico
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => r.value);
    if (!validos.length) return '<div class="profile-empty">Nenhum conteúdo no histórico.</div>';
    return validos.map(c => renderContentCard(c, c.categoria)).join('');
  };

  // Renderiza avaliações com nota exibida
  const renderAvaliacoes = async () => {
    if (!votos?.length) return '<div class="profile-empty">Nenhuma avaliação.</div>';
    const conteudosVotados = await Promise.allSettled(
      votos.map(async v => {
        const c = await withTimeout(db.getById('conteudos', v.conteudoId), 3000, null);
        return c ? { ...c, meuVoto: v.rating } : null;
      })
    );
    const validos = conteudosVotados
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => r.value);
    if (!validos.length) return '<div class="profile-empty">Nenhum conteúdo avaliado.</div>';
    return validos.map(c => renderContentCard(c, `${'⭐'.repeat(c.meuVoto)} ${c.meuVoto}/5`)).join('');
  };

  // Pré-renderiza as abas assíncronas
  const [historicoHtml, avaliacoesHtml] = await Promise.all([
    withTimeout(renderHistorico(), 8000, '<div class="profile-empty">Erro ao carregar histórico.</div>'),
    withTimeout(renderAvaliacoes(), 8000, '<div class="profile-empty">Erro ao carregar avaliações.</div>'),
  ]);

  container.innerHTML = `
    <div class="fade-in profile-links-wrapper">
      <div class="profile-avatar-section">
        ${State.usuario.avatar?.startsWith('http')
          ? `<img src="${State.usuario.avatar}" class="profile-avatar-img" alt="${State.usuario.nome}" loading="lazy">`
          : `<div class="profile-avatar-placeholder"><i class="bi bi-person-circle" aria-hidden="true"></i></div>`}
      </div>
      <h1 class="profile-name">${State.usuario.nome}</h1>
      <p class="profile-email">${State.usuario.email}</p>
      <div class="profile-stats" aria-label="Estatísticas do perfil">
        <span title="Conteúdos adicionados">📁 ${conteudos?.length || 0}</span>
        <span title="Avaliações feitas">⭐ ${votos?.length || 0}</span>
        <span title="Strikes recebidos">🚩 ${strikes}</span>
        ${notifs?.length ? `<span title="Notificações não lidas">🔔 ${notifs.length}</span>` : ''}
      </div>

      <nav class="profile-nav" id="profile-nav" role="tablist" aria-label="Abas do perfil">
        <button class="profile-nav-item active" data-tab="tab-geral"      role="tab" aria-selected="true"  aria-controls="tab-geral">Geral</button>
        <button class="profile-nav-item"        data-tab="tab-conteudos"  role="tab" aria-selected="false" aria-controls="tab-conteudos">Conteúdos</button>
        <button class="profile-nav-item"        data-tab="tab-historico"  role="tab" aria-selected="false" aria-controls="tab-historico">Histórico</button>
        <button class="profile-nav-item"        data-tab="tab-avaliacoes" role="tab" aria-selected="false" aria-controls="tab-avaliacoes">Avaliações</button>
        <button class="profile-nav-item"        data-tab="tab-plugins"    role="tab" aria-selected="false" aria-controls="tab-plugins">Plugins</button>
      </nav>

      <div class="profile-tab-content">
        <div class="profile-tab-pane active" id="tab-geral" role="tabpanel">
          <button class="profile-action-btn" onclick="toggleConteudoAdulto()">
            <i class="bi bi-eye${State.usuario.conteudoAdulto ? '-fill' : '-slash-fill'}" aria-hidden="true"></i>
            Conteúdo +18: ${State.usuario.conteudoAdulto ? 'ATIVADO' : 'DESATIVADO'}
          </button>
          <button class="profile-action-btn" onclick="toggleTema()">
            <i class="bi bi-${State.modoEscuro ? 'sun-fill' : 'moon-stars-fill'}" aria-hidden="true"></i>
            ${State.modoEscuro ? 'Modo Claro' : 'Modo Escuro'}
          </button>
          <button class="profile-action-btn" onclick="abrirEdicaoPerfil()">
            <i class="bi bi-pencil-square" aria-hidden="true"></i> Editar informações
          </button>
          <button class="profile-action-btn" onclick="AccountSwitcher.render()">
            <i class="bi bi-people-fill" aria-hidden="true"></i> Trocar conta
          </button>
          <button class="profile-action-btn" data-bs-toggle="modal" data-bs-target="#addConteudoModal">
            <i class="bi bi-plus-circle-fill" aria-hidden="true"></i> Adicionar Conteúdo
          </button>
          <button class="profile-action-btn danger" onclick="excluirConta()">
            <i class="bi bi-trash-fill" aria-hidden="true"></i> Excluir minha conta
          </button>
          <button class="profile-action-btn danger" onclick="document.getElementById('logout').click()">
            <i class="bi bi-box-arrow-right" aria-hidden="true"></i> Sair
          </button>
        </div>
        <div class="profile-tab-pane" id="tab-conteudos"  role="tabpanel">${renderCards(conteudos, c => c.categoria)}</div>
        <div class="profile-tab-pane" id="tab-historico"  role="tabpanel">${historicoHtml}</div>
        <div class="profile-tab-pane" id="tab-avaliacoes" role="tabpanel">${avaliacoesHtml}</div>
        <div class="profile-tab-pane" id="tab-plugins" role="tabpanel">
          ${plugins?.length ? plugins.map(p => `
            <div class="profile-content-card">
              <i class="bi bi-puzzle fs-3" aria-hidden="true"></i>
              <div class="info"><span class="title">${p.nome}</span><span class="meta">${p.tipo}</span></div>
            </div>`).join('') : '<div class="profile-empty">Nenhum plugin.</div>'}
        </div>
      </div>
    </div>`;

  // Tabs
  setTimeout(() => {
    document.querySelectorAll('#profile-nav .profile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.profile-nav-item').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
        btn.classList.add('active'); btn.setAttribute('aria-selected','true');
        document.querySelectorAll('.profile-tab-pane').forEach(p => p.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');
      });
    });
  }, 100);
}

function abrirEdicaoPerfil() {
  if (!State.usuario) return;
  document.getElementById('editNome').value   = State.usuario.nome || '';
  document.getElementById('editEmail').value  = State.usuario.email || '';
  document.getElementById('editSenha').value  = '';
  document.getElementById('editAvatar').value = State.usuario.avatar || '';
  new bootstrap.Modal(document.getElementById('editarPerfilModal')).show();
}

document.getElementById('editarPerfilForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const updates = {
    nome:   document.getElementById('editNome').value.trim(),
    email:  document.getElementById('editEmail').value.trim(),
    avatar: document.getElementById('editAvatar').value.trim(),
  };
  const senha = document.getElementById('editSenha').value;
  if (senha) updates.senha = senha;

  await db.update('users', State.usuario.id, updates);
  State.usuario = { ...State.usuario, ...updates };
  localStorage.setItem('usuarioLogado', JSON.stringify(State.usuario));
  AccountSwitcher.save(State.usuario);
  atualizarUI();
  bootstrap.Modal.getInstance(document.getElementById('editarPerfilModal'))?.hide();
  Logger.log('Perfil atualizado!');
  carregarPerfil();
});

async function excluirConta() {
  if (!State.usuario) return;
  if (prompt('Digite "EXCLUIR" para confirmar:') !== 'EXCLUIR') return;
  if (!confirm('Ação irreversível. Todos os seus dados serão apagados. Continuar?')) return;

  const id = State.usuario.id;
  await Promise.allSettled([
    db.deleteWhere('votos',         `usuarioId=eq.${id}`),
    db.deleteWhere('posts',         `usuarioId=eq.${id}`),
    db.deleteWhere('conteudos',     `usuarioId=eq.${id}`),
    db.deleteWhere('sources',       `usuarioId=eq.${id}`),
    db.deleteWhere('acessosRecentes',`usuarioId=eq.${id}`),
  ]);
  await db.delete('users', id);

  State.usuario = null; State.perfil = null; State.votosCache = [];
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('perfilAtivo');
  atualizarUI();
  Logger.log('Conta excluída.');
  renderLandingPage();
}

// ============================================================================
// DETALHES DO CONTEÚDO
// ============================================================================
window.verDetalhes = async function (id) {
  const container = getContainer();
  container.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Carregando...</span></div></div>';

  const data = await findById(id);
  if (!data) { Logger.log('Conteúdo não encontrado.', 'error'); voltarPaginaAnterior(); return; }

  const voto = State.votosCache.find(v => v.conteudoId == id);
  const isOwner = data.usuarioId === State.usuario?.id || State.usuario?.role === 'admin';
  const icon = getIcone(data.categoria);

  const imgHtml = data.capa
    ? `<img src="${data.capa}" class="img-fluid rounded shadow-lg mb-3 w-100" alt="${data.titulo}" style="max-height:500px;object-fit:cover;" loading="lazy">`
    : `<div class="d-flex align-items-center justify-content-center bg-dark rounded mb-3" style="height:300px;"><i class="bi ${icon}" style="font-size:100px;color:#666;" aria-hidden="true"></i></div>`;

  container.innerHTML = `
    <div class="fade-in">
      <button class="btn btn-link text-white text-decoration-none mb-3" onclick="voltarPaginaAnterior()" aria-label="Voltar">
        <i class="bi bi-arrow-left fs-4" aria-hidden="true"></i> <span class="fs-5">Voltar</span>
      </button>
      <div class="row g-4">
        <div class="col-md-4">${imgHtml}</div>
        <div class="col-md-8">
          <span class="badge bg-danger mb-2">${(data.categoria || '').toUpperCase()}</span>
          <h1 class="fw-bold mb-2">${data.titulo}</h1>
          <div class="d-flex flex-wrap gap-3 text-muted mb-4">
            <span>${data.ano || ''}</span>
            ${data.fonte ? `<span>•</span><span>${data.fonte}</span>` : ''}
          </div>
          <div class="p-3 bg-dark rounded border border-secondary mb-4">
            <p class="mb-0">${data.descricao || ''}</p>
          </div>
          ${data.link ? `<a href="${data.link}" target="_blank" rel="noopener" class="btn btn-danger btn-lg px-5 mb-4" onclick="registrarAcesso('${id}')"><i class="bi bi-play-fill" aria-hidden="true"></i> Acessar</a>` : ''}
          <hr class="border-secondary">
          <div class="row g-3">
            <div class="col-md-6">
              <h6>Sua avaliação:</h6>
              ${gerarEstrelasVotacao(id, voto?.rating || 0)}
            </div>
            <div class="col-md-6">
              <h6>Avaliação da comunidade:</h6>
              <div id="community-rating">${gerarEstrelasDisplay(data.rating, data.votes)}</div>
            </div>
          </div>
          <hr class="border-secondary">
          <div class="d-flex flex-wrap gap-2 mt-3">
            ${State.usuario ? `<button class="btn btn-outline-warning" onclick="denunciar('${id}')"><i class="bi bi-exclamation-triangle" aria-hidden="true"></i> Denunciar</button>` : ''}
            ${isOwner ? `<button class="btn btn-outline-secondary" onclick="editarConteudo('${id}')"><i class="bi bi-pencil" aria-hidden="true"></i> Editar</button>` : ''}
            ${isOwner ? `<button class="btn btn-outline-danger" onclick="removerConteudo('${id}')"><i class="bi bi-trash" aria-hidden="true"></i> Remover</button>` : ''}
          </div>
        </div>
      </div>
    </div>`;

  registrarAcesso(id);
};

async function findById(id) {
  if (State.conteudoCache[id]) return State.conteudoCache[id];
  const fromSearch = State.pesquisaCache.find(c => c.id == id);
  if (fromSearch) { State.conteudoCache[id] = fromSearch; return fromSearch; }
  const db_result = await db.getById('conteudos', id);
  if (db_result) State.conteudoCache[id] = db_result;
  return db_result;
}

async function registrarAcesso(conteudoId) {
  if (!State.usuario) return;
  await db.insert('acessosRecentes', { id: uid(), usuarioId: State.usuario.id, conteudoId, data: new Date().toISOString() });
}

window.voltarPaginaAnterior = function () {
  const p = State.paginaAnterior;
  if (!p) { carregarHome(); return; }
  const { tipo, valor } = p;
  if (tipo === 'home') carregarHome();
  else if (tipo === 'categoria') carregarCategoria(valor);
  else if (tipo === 'pesquisa') carregarPesquisa(valor, State.paginaPesquisa);
  else if (tipo === 'perfil') carregarPerfil();
  else if (tipo === 'chat') carregarChat();
  else carregarHome();
};

// ============================================================================
// ADICIONAR CONTEÚDO
// ============================================================================
document.getElementById('addConteudoForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!State.usuario) return;

  const novoId = uid();
  await db.insert('conteudos', {
    id: novoId,
    titulo:     document.getElementById('conteudoTitulo').value,
    descricao:  document.getElementById('conteudoDescricao').value,
    ano:        document.getElementById('conteudoData').value.split('-')[0] || '',
    capa:       document.getElementById('conteudoCapa').value || '',
    link:       document.getElementById('conteudoLink').value,
    categoria:  document.getElementById('conteudoCategoria').value,
    adulto:     document.getElementById('conteudoAdultoCheck').checked,
    usuarioId:  State.usuario.id,
    rating: 0, votes: 0, reports: 0,
    status: 'ativo', fonte: 'Usuário',
    dataAdicao: new Date().toISOString(),
  });

  bootstrap.Modal.getInstance(document.getElementById('addConteudoModal'))?.hide();
  document.getElementById('addConteudoForm').reset();
  Logger.log('Conteúdo adicionado!');
  carregarHome();
});

// ============================================================================
// SOURCES / PLUGINS
// ============================================================================
async function carregarSources() {
  State.sources = await db.fetch('sources') || [];
}

document.getElementById('addSourceForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!State.usuario) { Logger.log('Faça login primeiro', 'error'); return; }
  const src = {
    id: uid(),
    nome: document.getElementById('sourceNome').value,
    url:  document.getElementById('sourceUrl').value,
    tipo: document.getElementById('sourceTipo').value,
    usuarioId: State.usuario.id,
    dataAdicao: new Date().toISOString(),
  };
  await db.insert('sources', src);
  State.sources.push(src);
  bootstrap.Modal.getInstance(document.getElementById('addSourceModal'))?.hide();
  document.getElementById('addSourceForm').reset();
  Logger.log(`Plugin "${src.nome}" adicionado!`);
});

// ============================================================================
// BUSCA SUGESTÕES (modal adicionar)
// ============================================================================
document.getElementById('buscarSugestoes')?.addEventListener('click', async () => {
  const titulo = document.getElementById('conteudoTitulo').value.trim();
  if (!titulo) return;

  const area = document.getElementById('sugestoes-area');
  const lista = document.getElementById('listaSugestoes');
  area.style.display = 'block';
  lista.innerHTML = '<div class="text-center text-muted py-2">Buscando...</div>';

  try {
    const [wiki, archive, itunes] = await Promise.all([
      fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(titulo)}&format=json&origin=*`).then(r => r.json()).catch(() => null),
      fetch(`https://archive.org/advancedsearch.php?q=${encodeURIComponent(titulo)}&output=json&rows=3`).then(r => r.json()).catch(() => null),
      buscarITunes(titulo, 3),
    ]);

    let results = [];

    wiki?.query?.search?.slice(0, 4).forEach(i => results.push({
      titulo: i.title, descricao: i.snippet.replace(/<[^>]*>/g, ''), ano: '', capa: '',
    }));

    archive?.response?.docs?.forEach(i => results.push({
      titulo: i.title,
      descricao: Array.isArray(i.description) ? i.description[0] : (i.description || 'Archive.org'),
      ano: i.year || '', capa: i.identifier ? `https://archive.org/services/img/${i.identifier}` : '',
    }));

    itunes.forEach(i => results.push({ titulo: i.titulo, descricao: i.descricao, ano: i.ano, capa: i.capa || '' }));

    // Dedup por título
    const seen = new Set();
    results = results.filter(r => { if (!r.titulo || seen.has(r.titulo)) return false; seen.add(r.titulo); return true; });

    if (!results.length) { lista.innerHTML = '<div class="text-muted text-center py-2">Nenhum resultado.</div>'; return; }

    lista.innerHTML = results.slice(0, 7).map(r => `
      <a href="#" class="list-group-item list-group-item-action bg-dark text-white border-secondary"
         data-titulo="${r.titulo.replace(/"/g,'&quot;')}"
         data-desc="${r.descricao.replace(/"/g,'&quot;').slice(0, 200)}"
         data-ano="${r.ano}"
         data-capa="${r.capa}">
        <div class="d-flex align-items-center gap-2">
          ${r.capa ? `<img src="${r.capa}" style="width:36px;height:50px;object-fit:cover;border-radius:2px;" alt="" loading="lazy">` : `<i class="bi bi-file-earmark" style="font-size:1.5rem;" aria-hidden="true"></i>`}
          <div>
            <strong>${r.titulo}</strong>${r.ano ? ` (${r.ano})` : ''}<br>
            <small class="text-muted">${r.descricao.slice(0, 60)}…</small>
          </div>
        </div>
      </a>`).join('');

    lista.querySelectorAll('.list-group-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('conteudoTitulo').value   = item.dataset.titulo;
        document.getElementById('conteudoDescricao').value = item.dataset.desc;
        document.getElementById('conteudoCapa').value     = item.dataset.capa;
        area.style.display = 'none';
      });
    });
  } catch {
    lista.innerHTML = '<div class="text-danger text-center py-2">Erro na busca.</div>';
  }
});

// ============================================================================
// INICIALIZAÇÃO GERAL
// ============================================================================
async function bootstrapApp() {
  Logger.show('Sistema', 'pending');
  await Promise.all([carregarSources(), carregarVotosUsuario()]);
  Logger.show('Sistema', 'success', 'Pronto');
  atualizarUI();
  detectarDispositivo();
}

document.addEventListener('DOMContentLoaded', bootstrapApp);
