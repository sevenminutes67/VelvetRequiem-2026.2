'use strict';

const byId = id => document.getElementById(id);
const dialog = byId('dialog');
const dialogContent = byId('dialog-content');
const home = byId('home');
const privatePage = byId('private-page');
const accountButton = byId('account-button');
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const labels = { pending: 'Pendente', confirmed: 'Confirmada', cancelled: 'Cancelada', failed: 'Falhou' };
const state = { catalog: null, account: null, checkout: null, route: 0 };
let toastTimer;

const htmlEntities = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' };
const escape = value => String(value).replace(/[<>&"']/g, character => htmlEntities[character]);
const icon = name => '<svg aria-hidden="true"><use href="#i-' + escape(name) + '"/></svg>';
const price = cents => money.format(cents / 100);
const planFor = id => state.catalog?.plans.find(plan => plan.id === id);
const status = order => '<span class="status ' + escape(order.status) + '">' + labels[order.status] + '</span>';

async function api(path, payload) {
  const response = await fetch('/api/' + path, payload === undefined ? {} : {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.message);
    error.status = response.status;
    error.fields = result.fields;
    throw error;
  }
  return result;
}

function toast(message) {
  const element = byId('live');
  clearTimeout(toastTimer);
  element.hidden = false;
  element.textContent = message;
  toastTimer = setTimeout(() => { element.hidden = true; }, 4600);
}

function updateAccount(account) {
  state.account = account;
  accountButton.querySelector('span').textContent = account ? 'Minha conta' : 'Entrar';
}

function listBenefits(ids) {
  return '<ul class="pass-list">' + ids.map(id =>
    '<li>' + icon('check') + escape(state.catalog.benefits[id].label) + '</li>'
  ).join('') + '</ul>';
}

function renderPlans() {
  byId('plans').innerHTML = state.catalog.plans.map(plan => {
    const featured = plan.id === 'sentinela';
    return '<article class="plan' + (featured ? ' featured' : '') + '">' +
      '<div class="plan-symbol">' + icon(plan.symbol) + '</div>' +
      '<h3>' + escape(plan.title) + '</h3>' +
      '<p>' + escape(plan.tagline) + '</p><p class="price">' + price(plan.cents) + '</p>' +
      listBenefits(plan.benefits) +
      '<button type="button" class="button ' + (featured ? 'primary' : 'outline') +
      '" data-action="choose" data-id="' + escape(plan.id) + '" aria-label="Selecionar plano ' + escape(plan.title) +
      '">Selecionar plano ' + icon('arrow') + '</button></article>';
  }).join('');
}

function showDialog(content, focus = '#dialog-title') {
  dialogContent.innerHTML = content;
  if (!dialog.open) dialog.showModal();
  dialogContent.querySelector(focus)?.focus();
  dialog.scrollTop = 0;
}

function heading(kicker, title) {
  return '<p class="eyebrow red">' + escape(kicker) + '</p><h2 id="dialog-title" tabindex="-1">' + escape(title) + '</h2>';
}

function field(name, label, type, autocomplete, options = {}) {
  const id = 'input-' + name;
  return '<div class="field"><label for="' + id + '">' + label + ' *</label>' +
    '<input id="' + id + '" name="' + name + '" type="' + type + '" autocomplete="' + autocomplete +
    '" required aria-describedby="' + id + '-hint ' + id + '-error" value="' + escape(options.value ?? '') + '">' +
    '<small id="' + id + '-hint">' + escape(options.hint || '') + '</small>' +
    '<small class="field-error" id="' + id + '-error" hidden></small></div>';
}

function showAuth(mode = 'login', options = {}) {
  const register = mode === 'register';
  const plan = planFor(state.checkout);
  const context = plan ? 'Entre na conta para continuar com o plano ' + plan.title + '.' : 'Acesse seus planos e conteúdos com sua conta.';
  showDialog(
    heading('Conta de apoiador', register ? 'Criar conta' : 'Entrar') +
    '<p class="dialog-copy">' + escape(register ? 'Preencha os campos obrigatórios. Use dados fictícios para testar o protótipo.' : context) + '</p>' +
    (options.notice ? '<p class="notice" role="status">' + escape(options.notice) + '</p>' : '') +
    '<form class="form" id="action-form" data-form="' + mode + '" novalidate>' +
      (register ? field('name', 'Nome', 'text', 'name') : '') +
      field('email', 'E-mail', 'text', 'email', { value: options.email, hint: '' }).replace('type="text"', 'type="text" inputmode="email"') +
      field('password', 'Senha', 'password', register ? 'new-password' : 'current-password',
        { hint: register ? 'De 15 a 128 caracteres. Espaços são permitidos.' : '' }) +
      (register ? field('confirmation', 'Confirmar senha', 'password', 'new-password') : '') +
      '<p class="error" role="alert" hidden></p><button class="button primary" type="submit">' +
      (register ? 'Criar conta' : 'Entrar') + ' ' + icon('arrow') + '</button></form>' +
      '<p class="auth-switch">' + (register ? 'Já tem uma conta? ' : 'Ainda não tem conta? ') +
      '<button class="text-button" type="button" data-action="' + (register ? 'login' : 'register') + '">' +
      (register ? 'Entrar' : 'Criar conta') + '</button></p>'
  );
}

function showCheckout(id) {
  const plan = planFor(id);
  if (!plan) return;
  state.checkout = id;
  if (!state.account) {
    showAuth();
    return;
  }
  const active = state.account.orders.find(order => order.planId === id && ['pending', 'confirmed'].includes(order.status));
  if (active) {
    showPayment(active);
    return;
  }
  showDialog(heading('Resumo do apoio', 'Plano ' + plan.title) +
    '<p class="checkout-price">' + price(plan.cents) + '</p>' + listBenefits(plan.benefits) +
    '<p class="dialog-copy">Aquisição vinculada a <strong>' + escape(state.account.email) + '</strong>.</p>' +
    '<p class="dialog-copy">Pagamento simulado, sem cobrança.</p>' +
    '<form class="form" id="action-form" data-form="checkout"><p class="error" role="alert" hidden></p>' +
    '<button type="submit" class="button primary">Iniciar simulação ' + icon('arrow') + '</button></form>');
}

function showPayment(order, keptPending = false) {
  const plan = planFor(order.planId);
  const pending = order.status === 'pending';
  const title = pending ? 'Simular pagamento' : 'Aquisição ' + labels[order.status].toLowerCase();
  const description = {
    pending: 'Escolha o resultado para testar o fluxo. Nenhum dinheiro será movimentado.',
    confirmed: 'Os benefícios deste plano estão disponíveis na sua conta.',
    cancelled: 'A simulação foi cancelada. Os benefícios de compras anteriores continuam disponíveis.',
    failed: 'A simulação falhou. Você pode tentar novamente.'
  };
  showDialog(heading('Pagamento demonstrativo', title) +
    '<p class="dialog-copy"><strong>' + escape(plan.title) + '</strong> · ' + price(order.cents) + ' ' + status(order) + '</p>' +
    '<p class="dialog-copy">' + description[order.status] + '</p>' +
    (keptPending ? '<p class="notice" role="status">Aquisição mantida como pendente. Os benefícios ainda estão bloqueados.</p>' : '') +
    (pending ? '<form class="form" id="action-form" data-form="payment" data-id="' + escape(order.id) + '">' +
      '<div class="field"><label for="outcome">Resultado da simulação</label><select name="outcome" id="outcome">' +
      '<option value="confirmed">Confirmar pagamento</option><option value="pending">Manter pendente</option>' +
      '<option value="cancelled">Cancelar pagamento</option><option value="failed">Simular falha</option></select></div>' +
      '<p class="error" role="alert" hidden></p><button type="submit" class="button primary">Aplicar resultado</button></form>' : '') +
    '<div class="actions auth-switch"><button type="button" class="button small outline" data-action="account">Ir para minha conta</button>' +
    (['failed', 'cancelled'].includes(order.status) ? '<button type="button" class="button small primary" data-action="choose" data-id="' + escape(plan.id) + '">Tentar novamente</button>' : '') +
    '</div>');
}

function accountPage() {
  const account = state.account;
  const confirmed = account.orders.filter(order => order.status === 'confirmed');
  const orders = account.orders.length ? account.orders.map(order => {
    const plan = planFor(order.planId);
    return '<div class="row"><div><strong>' + escape(plan.title) + '</strong><p>' + price(order.cents) +
      '</p></div>' + (order.status === 'pending' ? '<div>' + status(order) +
      ' <button class="text-button" type="button" data-action="resume" data-id="' + escape(order.id) + '">Retomar</button></div>' : status(order)) + '</div>';
  }).join('') : '<p>Seu histórico de aquisições está vazio.</p>';
  const acquired = confirmed.length ? confirmed.map(order =>
    '<div class="row"><div><strong>' + escape(planFor(order.planId).title) + '</strong><p>' + price(order.cents) +
    '</p></div>' + status(order) + '</div>'
  ).join('') : '<p>Você ainda não possui um plano confirmado.</p>';
  const available = state.catalog.available;
  const contents = Object.entries(state.catalog.benefits).map(([id, benefit]) => {
    const allowed = account.entitled.includes(id);
    const action = !allowed ? '<span class="status">' + icon('lock').replace('<svg ', '<svg class="lock-icon" ') + ' Bloqueado</span>' :
      available.includes(id) ? '<a class="button small outline" href="#conteudo/' + escape(id) + '" aria-label="Abrir ' + escape(benefit.title) + '">Abrir ' + icon('arrow') + '</a>' :
      '<span class="status">Indisponível</span>';
    return '<div class="row"><div><strong>' + escape(benefit.title) + '</strong><p>' +
      (allowed ? escape(benefit.label) : 'Requer um plano que inclua este benefício.') + '</p></div>' + action + '</div>';
  }).join('');
  return '<div class="shell"><div class="private-heading"><p class="eyebrow red">Área do apoiador</p>' +
    '<h2 id="private-title" tabindex="-1">Minha conta</h2><p>Olá, ' + escape(account.name) + '.</p></div>' +
    '<div class="actions account-actions"><a class="button primary small" href="#apoio">Ver planos</a>' +
    '<button type="button" class="button small outline" data-action="logout">Sair da conta</button></div>' +
    '<div class="account-columns"><div class="panel"><h3>Meus planos</h3>' + acquired +
    '<h4 class="section-subtitle">Histórico de aquisições</h4>' + orders + '</div>' +
    '<div class="panel"><h3>Benefícios e conteúdos</h3>' + contents + '</div></div></div>';
}

function privateMessage(title, message, action) {
  return '<div class="shell"><div class="private-heading"><p class="eyebrow red">Área do apoiador</p>' +
    '<h2 id="private-title" tabindex="-1">' + escape(title) + '</h2><p>' + escape(message) + '</p></div>' + action + '</div>';
}

function contentPage(content) {
  return '<div class="shell"><div class="private-heading"><p class="eyebrow red">Área do apoiador</p>' +
    '<h2 id="private-title" tabindex="-1">' + escape(content.title) + '</h2><p>' + escape(content.subtitle) + '</p></div>' +
    '<div class="panel content-card">' + content.paragraphs.map(paragraph => '<p>' + escape(paragraph) + '</p>').join('') +
    (content.image ? '<img src="' + escape(content.image) + '" alt="' + escape(content.alt) + '">' : '') +
    '</div><p><a class="button small outline" href="#conta">Voltar à minha conta</a></p></div>';
}

async function renderRoute() {
  const revision = ++state.route;
  const hash = location.hash.slice(1) || 'inicio';
  const priv = hash === 'conta' || hash.startsWith('conteudo/');
  home.hidden = priv;
  privatePage.hidden = !priv;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (!priv) {
    const section = ['inicio', 'jogo', 'trailer', 'apoio'].includes(hash) ? byId(hash) : null;
    if (hash === 'inicio') window.scrollTo(0, 0);
    else section?.scrollIntoView();
    return;
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
  const loginButton = '<button type="button" class="button primary" data-action="login">Entrar</button>';
  const returnButton = '<a class="button outline" href="#conta">Voltar à minha conta</a>';
  if (!state.account) {
    privatePage.innerHTML = privateMessage('Entre na sua conta', 'Use sua conta de apoiador para consultar esta área.', loginButton);
  } else if (hash === 'conta') {
    privatePage.innerHTML = state.catalog
      ? accountPage()
      : privateMessage('Minha conta', 'Não foi possível carregar os planos.', '<a class="button outline" href="/">Recarregar</a>');
  } else {
    privatePage.innerHTML = privateMessage('Conteúdo exclusivo', 'Carregando…', returnButton);
    try {
      const id = hash.slice('conteudo/'.length);
      const { content } = await api('content/' + encodeURIComponent(id));
      if (revision !== state.route) return;
      privatePage.innerHTML = contentPage(content);
    } catch (error) {
      if (revision !== state.route) return;
      if (error.status === 401) updateAccount(null);
      const title = error.status === 403 ? 'Acesso bloqueado' : 'Conteúdo indisponível';
      privatePage.innerHTML = privateMessage(title, error.message, error.status === 401 ? loginButton : returnButton);
    }
  }
  byId('private-title')?.focus({ preventScroll: true });
}

function goAccount() {
  dialog.close();
  if (location.hash === '#conta') void renderRoute();
  else location.hash = 'conta';
}

function formError(form, error) {
  const banner = form.querySelector('.error');
  banner.hidden = false;
  banner.textContent = error.message;
  let first;
  for (const [name, message] of Object.entries(error.fields || {})) {
    const input = form.elements.namedItem(name);
    if (!input) continue;
    const text = byId(input.id + '-error');
    input.setAttribute('aria-invalid', 'true');
    text.textContent = message;
    text.hidden = false;
    first ||= input;
  }
  first?.focus();
}

document.addEventListener('submit', async event => {
  const form = event.target;
  if (form.id !== 'action-form') return;
  event.preventDefault();
  const submit = form.querySelector('[type="submit"]');
  if (submit.disabled) return;
  const payload = Object.fromEntries(new FormData(form));
  form.querySelector('.error').hidden = true;
  form.querySelectorAll('.field-error').forEach(item => { item.hidden = true; });
  form.querySelectorAll('[aria-invalid]').forEach(item => item.removeAttribute('aria-invalid'));
  submit.disabled = true;
  try {
    switch (form.dataset.form) {
      case 'register': {
        const result = await api('register', payload);
        showAuth('login', { notice: result.message, email: payload.email.trim() });
        break;
      }
      case 'login': {
        const result = await api('login', payload);
        updateAccount(result.account);
        if (state.checkout) showCheckout(state.checkout);
        else {
          dialog.close();
          if (location.hash.startsWith('#conteudo/')) await renderRoute();
          else goAccount();
        }
        toast('Você entrou na sua conta.');
        break;
      }
      case 'checkout': {
        const result = await api('orders', { planId: state.checkout });
        updateAccount(result.account);
        showPayment(result.order);
        break;
      }
      case 'payment': {
        const result = await api('orders/' + encodeURIComponent(form.dataset.id), payload);
        updateAccount(result.account);
        showPayment(result.order, result.order.status === 'pending');
        break;
      }
    }
  } catch (error) {
    if (['checkout', 'payment'].includes(form.dataset.form) && error.status === 401) {
      updateAccount(null);
      showAuth();
    } else if (form.isConnected) {
      formError(form, error);
    }
  } finally {
    if (submit.isConnected) submit.disabled = false;
    if (state.account && location.hash === '#conta') privatePage.innerHTML = accountPage();
  }
});

document.addEventListener('click', async event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;
  switch (action) {
    case 'close': dialog.close(); break;
    case 'choose': showCheckout(id); break;
    case 'register': showAuth('register'); break;
    case 'login': showAuth('login'); break;
    case 'account': goAccount(); break;
    case 'resume': {
      const order = state.account?.orders.find(item => item.id === id);
      if (order) showPayment(order);
      break;
    }
    case 'logout':
      button.disabled = true;
      try {
        await api('logout', {});
        updateAccount(null);
        state.checkout = null;
        location.hash = 'inicio';
        toast('Você saiu da sua conta.');
      } catch (error) {
        toast(error.message);
        button.disabled = false;
      }
      break;
  }
});

dialog.addEventListener('close', () => { state.checkout = null; });
accountButton.addEventListener('click', () => state.account ? goAccount() : showAuth());
window.addEventListener('hashchange', () => { void renderRoute(); });

const heroVideo = byId('hero-video');
const heroToggle = byId('hero-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

async function playBackground() {
  heroVideo.src ||= heroVideo.dataset.src;
  try {
    await heroVideo.play();
  } catch {
    heroToggle.textContent = 'Reproduzir fundo';
  }
}

heroVideo.addEventListener('play', () => { heroToggle.textContent = 'Pausar fundo'; });
heroVideo.addEventListener('pause', () => { heroToggle.textContent = 'Reproduzir fundo'; });
heroVideo.addEventListener('error', () => { heroVideo.hidden = true; heroToggle.hidden = true; });
heroToggle.addEventListener('click', () => {
  if (heroVideo.paused) void playBackground();
  else heroVideo.pause();
});

function updateBackground() {
  heroToggle.hidden = reducedMotion.matches;
  heroVideo.hidden = reducedMotion.matches;
  if (reducedMotion.matches) heroVideo.pause();
  else void playBackground();
}

reducedMotion.addEventListener('change', updateBackground);
updateBackground();

for (const link of document.querySelectorAll('a[href="#trailer"]')) {
  link.addEventListener('click', () => { if (location.hash === '#trailer') byId('trailer').scrollIntoView(); });
}

async function init() {
  const [catalog, account] = await Promise.allSettled([api('catalog'), api('account')]);
  if (catalog.status === 'fulfilled') {
    state.catalog = catalog.value;
    renderPlans();
  } else {
    byId('plans').innerHTML = '<p class="error" role="alert">Não foi possível carregar os planos. <a href="/">Recarregar</a></p>';
  }
  if (account.status === 'fulfilled') updateAccount(account.value.account);
  await renderRoute();
}

void init();
