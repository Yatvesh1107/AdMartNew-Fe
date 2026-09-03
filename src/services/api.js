const API_URL = "/api"

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { ...options.headers };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authAPI = {
  userLogin: (mobile, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ mobile, password }),
    }),

  userRegister: (formData) =>
    request("/auth/register", {
      method: "POST",
      body: formData,
    }),

  getProfile: () => request("/auth/profile"),

  updateProfile: (data) =>
    request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  changePassword: (currentPassword, newPassword) =>
    request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

export const adminAPI = {
  login: (userId, password) =>
    request("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ userId, password }),
    }),

  getProfile: () => request("/admin/auth/profile"),

  getPendingUsers: (status) =>
    request(`/admin/auth/users${status ? `?status=${status}` : ""}`),

  getUserDetails: (id) => request(`/admin/auth/users/${id}`),

  updateUserStatus: (id, status, reason) =>
    request(`/admin/auth/users/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, reason: reason || undefined }),
    }),
};

export const qrAPI = {
  getActive: () => request("/qr/active"),
  getAll: () => request("/qr"),
  upload: (formData) =>
    request("/qr", {
      method: "POST",
      body: formData,
    }),
  toggle: (id) =>
    request(`/qr/${id}/toggle`, { method: "PUT" }),
  delete: (id) =>
    request(`/qr/${id}`, { method: "DELETE" }),
};

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem("user");
}
