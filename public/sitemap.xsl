<?xml version="1.0" encoding="UTF-8"?>
<!-- Renders /sitemap.xml as a readable page in browsers; crawlers ignore it -->
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    exclude-result-prefixes="s xhtml">
    <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="robots" content="noindex"/>
                <title>Sitemap · Dustin Dwayne</title>
                <link rel="icon" href="/favicon.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Patrick+Hand&amp;display=swap"/>
                <script>
                    // Same theme choice as the rest of the site
                    try {
                        const saved = localStorage.getItem("theme");
                        const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
                        document.documentElement.dataset.theme = dark ? "dark" : "light";
                    } catch (e) {}
                </script>
                <style>
                    :root {
                        --ink: #2d3436; --paper: #fdfbf7; --card: #ffffff; --muted: #5f676b;
                        --grid: #e1e1e1; --highlight: #51dc55df; --blue-pen: #0984e3; --red-pen: #d63031;
                    }
                    @media (prefers-color-scheme: dark) {
                        :root:not([data-theme="light"]) {
                            --ink: #f1efe9; --paper: #1a1a1a; --card: #242526; --muted: #b9bfc3;
                            --grid: #2c2c2c; --highlight: #2f9e44b0; --blue-pen: #74b9ff; --red-pen: #ff7675;
                        }
                    }
                    :root[data-theme="dark"] {
                        --ink: #f1efe9; --paper: #1a1a1a; --card: #242526; --muted: #b9bfc3;
                        --grid: #2c2c2c; --highlight: #2f9e44b0; --blue-pen: #74b9ff; --red-pen: #ff7675;
                    }
                    * { box-sizing: border-box; }
                    body {
                        margin: 0; padding: 48px 16px; color: var(--ink); background-color: var(--paper);
                        font-family: "Patrick Hand", cursive; font-size: 1.25rem; line-height: 1.5;
                        background-image:
                            linear-gradient(var(--grid) 1px, transparent 1px),
                            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                    main { max-width: 860px; margin: 0 auto; }
                    h1 { font-size: 3rem; margin: 0 0 4px; line-height: 1.1; }
                    .highlight {
                        background: linear-gradient(120deg, transparent 0%, var(--highlight) 100%) no-repeat 0 88% / 100% 40%;
                    }
                    .lede { color: var(--muted); margin: 0 0 32px; }
                    .card {
                        background: var(--card); border: 2px solid var(--ink); border-radius: 12px;
                        box-shadow: 4px 4px 0 var(--ink); padding: 8px 24px; margin-bottom: 24px;
                    }
                    ul { list-style: none; margin: 0; padding: 0; }
                    li { padding: 14px 0; border-bottom: 1px dashed var(--grid); }
                    li:last-child { border-bottom: 0; }
                    .row { display: flex; flex-wrap: wrap; gap: 4px 16px; align-items: baseline; justify-content: space-between; }
                    a { color: var(--blue-pen); text-decoration: none; overflow-wrap: anywhere; }
                    a:hover { text-decoration: underline; }
                    .date { color: var(--muted); font-size: 1rem; white-space: nowrap; }
                    .alts { margin-top: 4px; font-size: 1rem; color: var(--muted); }
                    .alts a { margin-left: 8px; }
                    footer { color: var(--muted); font-size: 1rem; text-align: center; }
                    footer a { color: var(--red-pen); }
                </style>
            </head>
            <body>
                <main>
                    <h1><span class="highlight">Sitemap</span></h1>
                    <p class="lede">
                        Every page on this site — <xsl:value-of select="count(s:urlset/s:url)"/> in total.
                    </p>
                    <div class="card">
                        <ul>
                            <xsl:for-each select="s:urlset/s:url">
                                <li>
                                    <div class="row">
                                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                                        <span class="date"><xsl:value-of select="s:lastmod"/></span>
                                    </div>
                                    <xsl:if test="xhtml:link[@hreflang != 'x-default']">
                                        <div class="alts">
                                            Also in:
                                            <xsl:for-each select="xhtml:link[@hreflang != 'x-default' and @href != current()/s:loc]">
                                                <a href="{@href}"><xsl:value-of select="@hreflang"/></a>
                                            </xsl:for-each>
                                        </div>
                                    </xsl:if>
                                </li>
                            </xsl:for-each>
                        </ul>
                    </div>
                    <footer>← <a href="/">Back to the site</a></footer>
                </main>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
