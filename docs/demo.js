import { benefits, plans, published } from './catalog.js';

const storageKey = 'velvet-requiem:demo:v1:' + new URL('.', import.meta.url).pathname;
const sessionKey = storageKey + ':session';
const paymentStates = ['pending', 'confirmed', 'cancelled', 'failed'];
const planFor = id => plans.find(plan => plan.id === id);

function fail(status, message, fields) {
  throw Object.assign(new Error(message), { status, fields });
}

function load() {
  return JSON.parse(localStorage.getItem(storageKey) || '{"accounts":[]}');
}

function save(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

async function passwordVerifier(password, salt) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: Uint8Array.from(salt), iterations: 600_000 },
    key, 256
  );
  return new Uint8Array(bits).reduce((hex, byte) => hex + byte.toString(16).padStart(2, '0'), '');
}

async function register({ name = '', email = '', password = '', confirmation }) {
  name = name.trim();
  email = email.trim().toLowerCase();
  const fields = {};
  if (!name || name.length > 120) fields.name = 'Informe um nome de até 120 caracteres.';
  if (!/^[^\s@]+@[^\s@]+$/u.test(email) || email.length > 254) fields.email = 'Informe um e-mail válido.';
  if ([...password].length < 15 || [...password].length > 128) fields.password = 'Use de 15 a 128 caracteres.';
  if (!confirmation || confirmation !== password) fields.confirmation = 'A confirmação deve ser igual à senha.';
  if (Object.keys(fields).length) fail(400, 'Revise os campos indicados.', fields);

  const salt = [...crypto.getRandomValues(new Uint8Array(16))];
  const verifier = await passwordVerifier(password, salt);
  await navigator.locks.request(storageKey, () => {
    const data = load();
    if (data.accounts.some(account => account.email === email)) {
      fail(409, 'Já existe uma conta de demonstração com este e-mail neste navegador.');
    }
    data.accounts.push({ id: crypto.randomUUID(), name, email, salt, verifier, orders: [] });
    save(data);
  });
  return { message: 'Conta criada. Entre com seu e-mail e senha.' };
}

function accountView({ name, email, orders }) {
  const owned = [...new Set(orders.filter(order => order.status === 'confirmed').map(order => order.planId))];
  const entitled = [...new Set(owned.flatMap(id => planFor(id).benefits))];
  return { name, email, orders: [...orders].reverse(), owned, entitled };
}

async function login({ email = '', password = '' }) {
  const fields = {};
  if (!email.trim()) fields.email = 'Informe seu e-mail.';
  if (!password) fields.password = 'Informe sua senha.';
  if (Object.keys(fields).length) fail(400, 'Preencha os campos indicados.', fields);
  const account = load().accounts.find(item => item.email === email.trim().toLowerCase());
  if (!account || await passwordVerifier(password, account.salt) !== account.verifier) {
    fail(401, 'E-mail ou senha inválidos.');
  }
  sessionStorage.setItem(sessionKey, account.id);
  return { account: accountView(account) };
}

function currentAccount(data) {
  const id = sessionStorage.getItem(sessionKey);
  const account = data.accounts.find(item => item.id === id);
  if (!account) fail(401, 'Entre na sua conta para continuar.');
  return account;
}

function updateOrder(path, payload) {
  const data = load();
  const account = currentAccount(data);
  let order;
  if (path === 'orders') {
    const plan = planFor(payload.planId);
    if (!plan) fail(400, 'Escolha um plano válido.');
    order = account.orders.find(item => item.planId === plan.id && ['pending', 'confirmed'].includes(item.status));
    if (!order) {
      order = {
        id: crypto.randomUUID(), planId: plan.id, cents: plan.cents, status: 'pending',
        createdAt: new Date().toISOString()
      };
      account.orders.push(order);
      save(data);
    }
  } else {
    const { outcome } = payload;
    if (!paymentStates.includes(outcome)) fail(400, 'Escolha um resultado válido.');
    order = account.orders.find(item => path === 'orders/' + item.id);
    if (!order) fail(404, 'Aquisição não encontrada.');
    if (order.status !== outcome) {
      if (order.status !== 'pending') fail(409, 'Esta aquisição já foi encerrada.');
      order.status = outcome;
      save(data);
    }
  }
  return { order, account: accountView(account) };
}

export async function api(path, payload) {
  try {
    if (path === 'catalog') return { plans, benefits, available: Object.keys(published) };
    if (path === 'register') return await register(payload);
    if (path === 'login') return await login(payload);
    if (path === 'logout') {
      sessionStorage.removeItem(sessionKey);
      return {};
    }
    if (path === 'orders' || path.startsWith('orders/')) {
      return await navigator.locks.request(storageKey, () => updateOrder(path, payload));
    }

    const account = accountView(currentAccount(load()));
    if (path === 'account') return { account };
    if (path.startsWith('content/')) {
      const id = path.slice('content/'.length);
      if (!Object.hasOwn(benefits, id)) fail(404, 'Conteúdo não encontrado.');
      if (!account.entitled.includes(id)) fail(403, 'Este conteúdo requer um plano confirmado que inclua o benefício.');
      if (!Object.hasOwn(published, id)) fail(404, 'Conteúdo ainda indisponível.');
      return { content: published[id] };
    }
    fail(404, 'Página não encontrada.');
  } catch (error) {
    if (['SecurityError', 'QuotaExceededError'].includes(error.name)) {
      fail(503, 'Permita o armazenamento local do navegador para usar a demonstração.');
    }
    throw error;
  }
}
