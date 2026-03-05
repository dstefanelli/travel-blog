type APIResponse<T> = {
  data: T;
  meta?: any;
  error?: { status: number; name: string; message: string; details?: any };
};

function cleanEnv(value?: string) {
  return value?.trim().replace(/^['"]|['"]$/g, "");
}

const VITE_API_URL =
  cleanEnv(import.meta.env.VITE_API_URL as string | undefined) ||
  cleanEnv(process.env.VITE_API_URL as string | undefined);
const API_TOKEN =
  cleanEnv(import.meta.env.API_TOKEN as string | undefined) ||
  cleanEnv(process.env.API_TOKEN as string | undefined);

if (!import.meta.env.SSR) {
  throw new Error("apiGet can only be used on the server");
}

if (!VITE_API_URL) throw new Error("Missing VITE_API_URL in .env");
if (!API_TOKEN) throw new Error("Missing API_TOKEN in .env");

function buildUrl(path: string, params?: Record<string, string>) {
  const url = new URL(path, VITE_API_URL);
  if (params)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export async function apiGet<T>(path: string, params?: Record<string, string>) {
  const res = await fetch(buildUrl(path, params), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const json = (await res.json()) as APIResponse<T>;

  if (!res.ok) {
    const msg = json?.error?.message ?? `API request failed (${res.status})`;
    throw new Error(msg);
  }

  return json;
}
