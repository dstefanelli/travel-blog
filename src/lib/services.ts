type APIResponse<T> = {
  data: T;
  meta?: any;
  error?: { status: number; name: string; message: string; details?: any };
};

const VITE_API_URL = import.meta.env.VITE_API_URL as string;
const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN as string;

if (!VITE_API_URL) throw new Error("Missing VITE_API_URL in .env");
if (!VITE_API_TOKEN) throw new Error("Missing VITE_API_TOKEN in .env");

function buildUrl(path: string, params?: Record<string, string>) {
  const url = new URL(path, VITE_API_URL);
  if (params)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export async function apiGet<T>(path: string, params?: Record<string, string>) {
  const res = await fetch(buildUrl(path, params), {
    headers: {
      Authorization: `Bearer ${VITE_API_TOKEN}`,
    },
  });

  const json = (await res.json()) as APIResponse<T>;

  if (!res.ok) {
    const msg = json?.error?.message ?? `API request failed (${res.status})`;
    throw new Error(msg);
  }

  return json;
}
