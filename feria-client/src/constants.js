const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const HOST = apiUrl.endsWith('/api') || apiUrl.endsWith('/api/')
  ? apiUrl.replace(/\/$/, '')
  : `${apiUrl.replace(/\/$/, '')}/api`;

export default {
    HOST,
};
