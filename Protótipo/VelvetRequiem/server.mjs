import { createServer } from 'node:http';
import { randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { benefits, plans, published } from './catalog.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const database = join(resolve(process.env.VELVET_DATA || join(root, '.data')), 'state.json');
const port = Number(process.env.PORT || 4173);
const sessionAge = 12 * 60 * 60 * 1000;
const kdf = promisify(scrypt);
const sessions = new Map();
let state = { accounts: [], orders: [] };
let writes = Promise.resolve();

await mkdir(dirname(database), { recursive: true });
try {
  state = JSON.parse(await readFile(database, 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

function updateState(mutator) {
  const operation = writes.then(async () => {
    const next = structuredClone(state);
    const result = mutator(next);
    const temporary = database + '.tmp';
    await writeFile(temporary, JSON.stringify(next), { mode: 0o600 });
    await rename(temporary, database);
    state = next;
    return result;
  });
  writes = operation.catch(() => {});
  return operation;
}

const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/assets/intro.mp4', ['assets/intro.mp4', 'video/mp4']],
  ['/assets/casa.jpeg', ['assets/casa.jpeg', 'image/jpeg']],
  ['/assets/carro.jpeg', ['assets/carro.jpeg', 'image/jpeg']],
  ['/assets/sala.jpeg', ['assets/sala.jpeg', 'image/jpeg']]
]);

const emailPattern = /^[^\s@]+@[^\s@]+$/u;
const paymentStates = ['pending', 'confirmed', 'cancelled', 'failed'];
const findPlan = id => plans.find(plan => plan.id === id);

class RequestError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

function json(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  if (request.headers['content-type']?.split(';')[0] !== 'application/json') {
    throw new RequestError(415, 'Formato de solicitação inválido.');
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 8192) throw new RequestError(413, 'Dados acima do limite permitido.');
    chunks.push(chunk);
  }
  try {
    const fields = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) throw Error();
    return fields;
  } catch {
    throw new RequestError(400, 'Dados inválidos.');
  }
}

function identity(request) {
  const token = request.headers.cookie?.match(/(?:^|;\s*)velvet=([a-f0-9]{64})(?:;|$)/)?.[1];
  const session = sessions.get(token);
  if (!session) return { token };
  if (session.expires <= Date.now()) {
    sessions.delete(token);
    return { token };
  }
  return { token, account: state.accounts.find(item => item.id === session.accountId) };
}

function cookie(response, value, age) {
  response.setHeader('Set-Cookie', 'velvet=' + value + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + age);
}

function accountData(account) {
  const orders = state.orders.filter(item => item.accountId === account.id).map(({ accountId, ...order }) => order).reverse();
  const owned = [...new Set(orders.filter(order => order.status === 'confirmed').map(order => order.planId))];
  const entitled = [...new Set(owned.flatMap(id => findPlan(id).benefits))];
  return { name: account.name, email: account.email, orders, owned, entitled };
}

async function asset(request, response, [filename, type], privateAsset = false) {
  const data = await readFile(join(root, 'public', filename));
  const headers = {
    'Content-Type': type,
    'Content-Length': data.length,
    'Cache-Control': privateAsset || type.startsWith('text') ? 'no-store' : 'public, max-age=3600',
    'Accept-Ranges': 'bytes'
  };
  const range = request.headers.range;
  let status = 200;
  let body = data;
  if (range) {
    const parts = /^bytes=(\d*)-(\d*)$/.exec(range);
    const start = parts?.[1] ? Number(parts[1]) : Math.max(0, data.length - Number(parts?.[2]));
    const end = parts?.[1] && parts[2] ? Math.min(Number(parts[2]), data.length - 1) : data.length - 1;
    if (!parts || !Number.isSafeInteger(start) || start > end) {
      response.writeHead(416, { 'Content-Range': 'bytes */' + data.length });
      response.end();
      return;
    }
    status = 206;
    body = data.subarray(start, end + 1);
    headers['Content-Length'] = body.length;
    headers['Content-Range'] = 'bytes ' + start + '-' + end + '/' + data.length;
  }
  response.writeHead(status, headers);
  response.end(request.method === 'HEAD' ? undefined : body);
}

async function route(request, response) {
  const path = new URL(request.url, 'http://localhost').pathname;
  const method = request.method;
  const { token, account } = identity(request);

  if (method === 'GET' && path === '/api/catalog') {
    json(response, 200, { plans, benefits, available: Object.keys(published) });
    return;
  }
  if (method === 'POST' && path === '/api/register') {
    const body = await readJson(request);
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const errors = {};
    if (!name || name.length > 120) errors.name = 'Informe um nome de até 120 caracteres.';
    if (!emailPattern.test(email) || email.length > 254) errors.email = 'Informe um e-mail válido.';
    if ([...password].length < 15 || [...password].length > 128) errors.password = 'Use de 15 a 128 caracteres.';
    if (!body.confirmation || body.confirmation !== password) errors.confirmation = 'A confirmação deve ser igual à senha.';
    if (Object.keys(errors).length) throw new RequestError(400, 'Revise os campos indicados.', errors);

    const salt = randomBytes(16).toString('hex');
    const hash = (await kdf(password, salt, 64)).toString('hex');
    await updateState(next => {
      if (next.accounts.some(item => item.email === email)) {
        throw new RequestError(409, 'Não foi possível concluir o cadastro com os dados apresentados.');
      }
      next.accounts.push({ id: randomUUID(), name, email, salt, hash });
    });
    json(response, 201, { message: 'Conta criada. Entre com seu e-mail e senha.' });
    return;
  }
  if (method === 'POST' && path === '/api/login') {
    const body = await readJson(request);
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const errors = {};
    if (!email) errors.email = 'Informe seu e-mail.';
    if (!password) errors.password = 'Informe sua senha.';
    if (Object.keys(errors).length) throw new RequestError(400, 'Preencha os campos indicados.', errors);
    const found = state.accounts.find(item => item.email === email);
    const candidate = await kdf(password, found?.salt || '0'.repeat(32), 64);
    if (!found || !timingSafeEqual(Buffer.from(found.hash, 'hex'), candidate)) {
      throw new RequestError(401, 'E-mail ou senha inválidos');
    }
    for (const [key, session] of sessions) {
      if (session.expires <= Date.now() || key === token) sessions.delete(key);
    }
    const value = randomBytes(32).toString('hex');
    sessions.set(value, { accountId: found.id, expires: Date.now() + sessionAge });
    cookie(response, value, sessionAge / 1000);
    json(response, 200, { account: accountData(found) });
    return;
  }
  if (method === 'POST' && path === '/api/logout') {
    sessions.delete(token);
    cookie(response, '', 0);
    json(response, 200, {});
    return;
  }

  if (path.startsWith('/api/')) {
    if (!account) throw new RequestError(401, 'Entre na sua conta para continuar.');
    if (method === 'GET' && path === '/api/account') {
      json(response, 200, { account: accountData(account) });
      return;
    }
    if (method === 'POST' && path === '/api/orders') {
      const { planId } = await readJson(request);
      const plan = findPlan(planId);
      if (!plan) throw new RequestError(400, 'Escolha um plano válido.');
      const order = await updateState(next => {
        const existing = next.orders.find(item => item.accountId === account.id && item.planId === plan.id && ['pending', 'confirmed'].includes(item.status));
        if (existing) return existing;
        const created = {
          id: randomUUID(), accountId: account.id, planId: plan.id, cents: plan.cents, status: 'pending',
          createdAt: new Date().toISOString()
        };
        next.orders.push(created);
        return created;
      });
      const { accountId, ...details } = order;
      json(response, 200, { order: details, account: accountData(account) });
      return;
    }
    if (method === 'POST' && path.startsWith('/api/orders/')) {
      const { outcome } = await readJson(request);
      if (!paymentStates.includes(outcome)) throw new RequestError(400, 'Escolha um resultado de simulação válido.');
      const order = await updateState(next => {
        const match = next.orders.find(item => path === '/api/orders/' + item.id && item.accountId === account.id);
        if (!match) throw new RequestError(404, 'Aquisição não encontrada.');
        if (match.status === outcome) return match;
        if (match.status !== 'pending') throw new RequestError(409, 'Esta aquisição já foi encerrada.');
        match.status = outcome;
        return match;
      });
      const { accountId, ...details } = order;
      json(response, 200, { order: details, account: accountData(account) });
      return;
    }
    if (method === 'GET' && path.startsWith('/api/content/')) {
      const id = path.split('/').at(-1);
      const required = id === 'art-image' ? 'art' : id;
      if (!Object.hasOwn(benefits, required)) throw new RequestError(404, 'Conteúdo não encontrado.');
      if (!accountData(account).entitled.includes(required)) throw new RequestError(403, 'Este conteúdo não está incluído em um plano confirmado da sua conta.');
      if (!Object.hasOwn(published, required)) throw new RequestError(404, 'Conteúdo ainda indisponível.');
      if (id === 'art-image') {
        await asset(request, response, ['../private/concept.webp', 'image/webp'], true);
        return;
      }
      json(response, 200, { content: published[id] });
      return;
    }
  }
  if (files.has(path) && (method === 'GET' || method === 'HEAD')) {
    await asset(request, response, files.get(path));
    return;
  }
  throw new RequestError(404, 'Página não encontrada.');
}

createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'same-origin');
  response.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self'; style-src 'self'; media-src 'self'; frame-src https://www.youtube-nocookie.com; frame-ancestors 'none'; base-uri 'none'");
  try {
    await route(request, response);
  } catch (error) {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    if (error instanceof RequestError) {
      json(response, error.status, { message: error.message, fields: error.fields });
      return;
    }
    console.error(error.code || error.name);
    json(response, 500, { message: 'Não foi possível concluir a ação. Tente novamente.' });
  }
}).listen(port, '127.0.0.1', () => console.log('Velvet Requiem disponível em http://localhost:' + port));
