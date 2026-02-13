// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Niki & Diego";
export const SITE_DESCRIPTION = "Bienvenidos a nuestro mundo!";

function cleanEnvUrl(value?: string) {
  return value?.trim().replace(/^['"]|['"]$/g, "");
}

export const API_URL =
  cleanEnvUrl(import.meta.env.PUBLIC_API_URL as string | undefined) ||
  cleanEnvUrl(import.meta.env.VITE_PUBLIC_API_URL as string | undefined) ||
  cleanEnvUrl(import.meta.env.VITE_API_URL as string | undefined) ||
  cleanEnvUrl(process.env.PUBLIC_API_URL as string | undefined) ||
  cleanEnvUrl(process.env.VITE_PUBLIC_API_URL as string | undefined) ||
  cleanEnvUrl(process.env.VITE_API_URL as string | undefined) ||
  "";

export function mediaUrl(path?: string) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_URL) return path;
  return new URL(path, API_URL).toString();
}
