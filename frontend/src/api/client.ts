const API_URL = import.meta.env.VITE_API_URL;

export async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
  return res.json();
}
