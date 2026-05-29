import constants from '../constants';

const rawBase = import.meta.env.VITE_API_URL ?? constants.HOST;
const baseWithoutTrailingSlash = String(rawBase || '').replace(/\/+$/, '');
const HOST = baseWithoutTrailingSlash.endsWith('/api')
  ? baseWithoutTrailingSlash
  : `${baseWithoutTrailingSlash}/api`;

async function request(path, { method = 'GET', body } = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(`${HOST}${normalizedPath}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message = typeof data === 'string'
      ? data.slice(0, 200)
      : data?.message || data?.error || `Request failed with status ${res.status}`;
    const err = new Error(message);
    err.response = { data, status: res.status };
    throw err;
  }

  return data;
}

export async function getArticles() {
  return request('/articles', { method: 'GET' });
}

export async function upsertArticles(articles) {
  return request('/articles/seed', { method: 'POST', body: { articles } });
}

export async function createArticle(article) {
  return request('/articles', { method: 'POST', body: article });
}

export async function updateArticle(id, article) {
  return request(`/articles/${id}`, { method: 'PUT', body: article });
}

export async function patchArticle(id, patch) {
  return request(`/articles/${id}`, { method: 'PATCH', body: patch });
}

