// Replaces the old Supabase client. Talks to our Express + MongoDB API (/api/*).
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service_interest: string | null;
  message: string;
  honeypot: string | null;
  status: string;
  created_at: string;
}

export interface FieldNote {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string | null;
  published_at: string;
  created_at: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (res.status === 404) return null as T;
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getFieldNotes: () => request<FieldNote[]>('/api/field-notes'),
  getFieldNote: (slug: string) =>
    request<FieldNote | null>(`/api/field-notes/${encodeURIComponent(slug)}`),
  submitContact: (data: {
    name: string;
    email: string;
    company: string | null;
    service_interest: string | null;
    message: string;
    honeypot: string | null;
  }) => request<{ ok: boolean }>('/api/contact', { method: 'POST', body: JSON.stringify(data) }),
};
