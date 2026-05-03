export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:7777';

export function authHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
