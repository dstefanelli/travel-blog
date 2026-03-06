import { defineMiddleware } from "astro:middleware";
import { isRouteLang, stripRouteLangPrefix } from "./lib/locale";

export const onRequest = defineMiddleware((context, next) => {
  const { url } = context;
  const pathname = url.pathname;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (isRouteLang(firstSegment)) {
    const rewrittenPath = stripRouteLangPrefix(pathname);
    const rewrittenUrl = new URL(rewrittenPath, url);
    rewrittenUrl.search = url.search;
    rewrittenUrl.searchParams.set("lang", firstSegment);
    return context.rewrite(rewrittenUrl);
  }

  return next();
});
