import constants from '../constants';

const HOST = `${import.meta.env.VITE_API_URL ?? constants.HOST}`;

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${HOST}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || data?.error || `Request failed with status ${res.status}`;
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

