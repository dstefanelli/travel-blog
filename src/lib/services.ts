type APIResponse<T> = {
  data: T;
  meta?: any;
  error?: { status: number; name: string; message: string; details?: any };
};

// Ensure local `.env` values are available in Node runtime (dev/server).
// In containers, runtime env vars still take precedence.
try {
  (
    process as NodeJS.Process & {
      loadEnvFile?: (path?: string) => void;
    }
  ).loadEnvFile?.();
} catch {
  // `.env` is optional at runtime (e.g. Docker/NAS with env vars only).
}

function cleanEnv(value?: string) {
  return value?.trim().replace(/^['"]|['"]$/g, "");
}

const VITE_API_URL =
  cleanEnv(import.meta.env.VITE_API_URL as string | undefined) ||
  cleanEnv(process.env.VITE_API_URL as string | undefined);
const API_TOKEN = cleanEnv(process.env.API_TOKEN as string | undefined);

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
  const url = buildUrl(path, params);
  let res: Response;

  try {
    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  } catch (error) {
    const err = error as Error & { cause?: unknown };
    const cause =
      err.cause instanceof Error
        ? `${err.cause.name}: ${err.cause.message}`
        : String(err.cause ?? "");
    throw new Error(
      `[apiGet] Network error calling ${url}. ${err.message}${cause ? ` | cause: ${cause}` : ""}`,
    );
  }

  let json: APIResponse<T>;
  try {
    json = (await res.json()) as APIResponse<T>;
  } catch {
    const rawBody = await res.text().catch(() => "");
    const preview = rawBody.slice(0, 300);
    throw new Error(
      `[apiGet] Invalid JSON from ${url}. HTTP ${res.status}. Body: ${preview}`,
    );
  }

  if (!res.ok) {
    const msg =
      json?.error?.message ??
      `[apiGet] API request failed for ${url} (HTTP ${res.status})`;
    throw new Error(msg);
  }

  return json;
}
