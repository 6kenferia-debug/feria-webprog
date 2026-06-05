import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch articles
export const getArticles = () => API.get('/');
export const fetchArticles = getArticles;
export const fetchArticlesAdmin = () => API.get('/?admin=true');
export const fetchArticleById = (id) => API.get(`/${id}`);

// Create, Update, Delete articles
export const createArticle = (articleData) => API.post('/', articleData);
export const updateArticle = (id, articleData) => API.put(`/${id}`, articleData);
export const deleteArticle = (id) => API.delete(`/${id}`);
