export type AppLang = "es" | "de";

const SUPPORTED_LANGS: AppLang[] = ["es", "de"];

export function normalizeLang(input?: string | null): AppLang | null {
  if (!input) return null;
  const value = input.trim().toLowerCase();
  if (value.startsWith("de")) return "de";
  if (value.startsWith("es")) return "es";
  return null;
}

export function resolveLang(url: URL, acceptLanguage?: string | null): AppLang {
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

export function toDateLang(lang: AppLang) {
  return lang === "de" ? "de-DE" : "es-ES";
}
