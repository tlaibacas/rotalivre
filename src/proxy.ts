import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "pt"], // supported locales
  defaultLocale: "en", // define a default locale
  localePrefix: "always", // always prefix locale in the URL
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"], // apply middleware to all paths except those starting with /api, /_next, /_vercel or containing a file extension
};
