import axios from "axios";

//Render backend base URL
const BASE_URL = "https://feria-webprog-server.onrender.com/api";

async function request(url, method = "GET", data = null) {
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Request failed";

    throw new Error(message);
  }
}

// GET all users
export const fetchUsers = () => request("/users", "GET");

// CREATE user
export const createUser = (user) =>
  request("/users", "POST", user);

// UPDATE user
export const updateUser = (id, user) =>
  request(`/users/${id}`, "PUT", user);

// DELETE user
export const deleteUser = (id) =>
  request(`/users/${id}`, "DELETE");

// LOGIN user
export const loginUser = (credentials) =>
  request("/users/login", "POST", credentials);