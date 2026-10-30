import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Canonical URLs, the sitemap, and robots.txt are absolute, built from SITE_URL
// (src/lib/site.ts). Without it they point at localhost.
if (!isDev && !process.env.SITE_URL?.trim()) {
  console.warn(
    "SITE_URL is not set: canonical URLs, sitemap.xml, and robots.txt will use http://localhost:3000.",
  );
}

// Static page with no user-generated content: a static CSP keeps it
// prerendered (nonces would force dynamic rendering). Inline scripts are
// Next's own bootstrap; eval only in dev for React's error overlay.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// Docs pages are MDX; GitHub-flavoured Markdown for tables. Plugins are named
// by string so Turbopack can use them.
const withMDX = createMDX({ options: { remarkPlugins: ["remark-gfm"] } });

export default withMDX(nextConfig);
