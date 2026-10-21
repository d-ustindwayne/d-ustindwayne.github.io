import type { ImageMetadata } from "astro";

// assets/unused holds photos kept for later; excluding them keeps them out of the build
const files = import.meta.glob<{ default: ImageMetadata }>(["./assets/**/*.png", "!./assets/unused/**"]);

/** Loads an image from src/assets by relative path, e.g. "gallery/me.png" */
export async function loadImage(path: string) {
    const load = files[`./assets/${path}`];
    if (!load) throw new Error(`Image not found: src/assets/${path}`);
    return (await load()).default;
}
