# Dustin Dwayne Diaz — Portfolio

My personal website, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Live at [d-ustindwayne.github.io](https://d-ustindwayne.github.io).

## Commands

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `bun install`   | Install dependencies                        |
| `bun dev`       | Start the dev server at `localhost:4321`    |
| `bun run build` | Build the static site to `./dist/`          |
| `bun preview`   | Preview the build locally                   |
| `bun run check` | Type-check `.astro` and `.ts` files         |

## Structure

```text
src/
├── assets/          images optimised at build time (assets/unused is ignored)
├── components/      page sections and the Sketch* building blocks
├── data/            all content, per language (en / es / tl)
├── icons/           contact icons (Font Awesome Free, CC BY 4.0)
├── layouts/         base HTML, theme bootstrap, shared modal wiring
├── pages/
│   ├── index.astro      redirects "/" to the visitor's language
│   ├── [lang]/          the portfolio, one static page per language
│   ├── doom.astro       DOOM, loaded inside the sidebar dialog
│   └── 404.astro
├── styles/global.css    theme tokens (light/dark), base styles, font
├── age.ts  i18n.ts  images.ts
```

## Editing content

- **Text, projects, CV, photos** live in `src/data/*.json`, keyed by language. Keep the three languages in the same order.
- **Hide a project** with `"hidden": true` in `projects.json`.
- **Add a photo**: put the PNG in `src/assets/gallery/` and add an entry to every language in `photos.json`.
- **Tech badge colours** are in `techBadge.json` (one unique colour per technology).
