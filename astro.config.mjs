// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: "https://d-ustindwayne.github.io/",
    base: "/",
    output: "static",
    trailingSlash: "ignore",
    i18n: {
        locales: ["en", "es", "tl"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: true,
            // "/" is handled by src/pages/index.astro (picks the visitor's language)
            redirectToDefaultLocale: false
        }
    },
    vite: {
        optimizeDeps: {
            exclude: ["wasm-doom"]
        },
        plugins: [tailwindcss()]
    }
});
