import type { APIRoute } from "astro";
import { languages } from "../i18n";

// Every page exists in all languages; each entry lists its translations so search engines pair them up
const paths = ["", "wordle/"];
const codes = Object.keys(languages);

export const GET: APIRoute = ({ site }) => {
    const url = (code: string, path: string) => new URL(`/${code}/${path}`, site).href;
    const lastmod = new Date().toISOString().slice(0, 10);

    const entries = paths.flatMap((path) =>
        codes.map((code) => {
            const alternates = [...codes, "x-default"]
                .map((alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${url(alt === "x-default" ? "en" : alt, path)}"/>`)
                .join("");
            return `<url><loc>${url(code, path)}</loc><lastmod>${lastmod}</lastmod>${alternates}</url>`;
        }),
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
    return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
