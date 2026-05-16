import axios from "axios";
import constants from '../constants';

// constants.HOST already includes /api, so use it directly.
// Backend mount is: app.use('/api/users', userRoutes)
const baseURL = `${constants.HOST}`;



async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${baseURL}${path}`, {
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

  return { data };
}

// Fetch users
// backend expects: GET /api/users/
// UserService.request will append the path to constants.HOST (which already ends with /api)
export const fetchUsers = () => request('/users/', { method: 'GET' });

// Create user
export const createUser = (user) => request('/users/', { method: 'POST', body: user });

// Update user
export const updateUser = (id, user) => request(`/users/${id}`, { method: 'PUT', body: user });

// Delete user
export const deleteUser = (id) => request(`/users/${id}`, { method: 'DELETE' });

// Login user
export const loginUser = (credentials) => request('/users/login', { method: 'POST', body: credentials });

