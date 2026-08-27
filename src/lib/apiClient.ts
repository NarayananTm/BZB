/** Thin fetch wrapper — cookie auth is automatic, no manual token needed. */
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message ?? `Request failed: ${res.status}`);
  }
  return json;
}

export const api = {
  get:    <T>(url: string) => request<T>(url),
  post:   <T>(url: string, body: unknown) => request<T>(url, { method: 'POST',  body: JSON.stringify(body) }),
  patch:  <T>(url: string, body: unknown) => request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
  put:    <T>(url: string, body: unknown) => request<T>(url, { method: 'PUT',   body: JSON.stringify(body) }),
  delete: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: 'DELETE', body: body ? JSON.stringify(body) : undefined }),
};
