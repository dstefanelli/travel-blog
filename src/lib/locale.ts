export type AppLang = "es" | "de" | "en";
export type RouteLang = "es" | "de";

const SUPPORTED_LANGS: AppLang[] = ["es", "de", "en"];
const ROUTE_LANGS: RouteLang[] = ["es", "de"];

export function normalizeLang(input?: string | null): AppLang | null {
  if (!input) return null;
  const value = input.trim().toLowerCase();
  if (value.startsWith("de")) return "de";
  if (value.startsWith("es")) return "es";
  if (value.startsWith("en")) return "en";
  return null;
}

export function resolveLang(url: URL, acceptLanguage?: string | null): AppLang {
  const fromPath = normalizeLang(url.pathname.split("/").filter(Boolean)[0] ?? null);
  if (fromPath) return fromPath;

  const fromQuery = normalizeLang(url.searchParams.get("lang"));
  if (fromQuery) return fromQuery;

  if (acceptLanguage) {
    const candidates = acceptLanguage.split(",").map((part) => part.split(";")[0]);
    for (const candidate of candidates) {
      const normalized = normalizeLang(candidate);
      if (normalized && SUPPORTED_LANGS.includes(normalized)) {
        return normalized;
      }
    }
  }

  return "es";
}

export function isRouteLang(input?: string | null): input is RouteLang {
  return !!input && ROUTE_LANGS.includes(input as RouteLang);
}

export function routeLangFromAppLang(lang: AppLang): RouteLang {
  return lang === "de" ? "de" : "es";
}

export function toCmsLocale(lang: AppLang): string {
  if (lang === "de") return "de-AT";
  return lang;
}

export function stripRouteLangPrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isRouteLang(segments[0])) {
    segments.shift();
  }

  return segments.length ? `/${segments.join("/")}${pathname.endsWith("/") ? "/" : ""}` : "/";
}

export function withRouteLangPrefix(pathname: string, lang: AppLang | RouteLang): string {
  const routeLang = routeLangFromAppLang(lang);
  const cleanPath = stripRouteLangPrefix(pathname);
  return cleanPath === "/" ? `/${routeLang}/` : `/${routeLang}${cleanPath}`;
}

export function toDateLang(lang: AppLang) {
  if (lang === "de") return "de-DE";
  if (lang === "en") return "en-US";
  return "es-ES";
}
