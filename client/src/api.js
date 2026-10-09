const BASE = import.meta.env.VITE_API_URL || '/api';
export const TOKEN_KEY = 'genisis_token';

async function req(path, { method = 'GET', body, auth } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem(TOKEN_KEY);
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || 'Request failed'), { status: res.status });
  return data;
}

export const api = {
  projects: () => req('/projects'),
  sendLead: (b) => req('/leads', { method: 'POST', body: b }),
  login: (b) => req('/auth/login', { method: 'POST', body: b }),
  leads: () => req('/leads', { auth: true }),
  setLeadStatus: (id, status) => req(`/leads/${id}`, { method: 'PATCH', body: { status }, auth: true }),
  deleteLead: (id) => req(`/leads/${id}`, { method: 'DELETE', auth: true }),
  allProjects: () => req('/projects/admin/all', { auth: true }),
  createProject: (b) => req('/projects', { method: 'POST', body: b, auth: true }),
  updateProject: (id, b) => req(`/projects/${id}`, { method: 'PUT', body: b, auth: true }),
  deleteProject: (id) => req(`/projects/${id}`, { method: 'DELETE', auth: true })
};
