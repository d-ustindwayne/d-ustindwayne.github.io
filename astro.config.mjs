// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: "https://www.dustindwayn.ee",
    base: "/",
    output: "static",
    trailingSlash: "ignore",
    // The word game used to be called Wordle
    redirects: {
        "/[lang]/wordle": "/[lang]/wordilocks"
    },
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
