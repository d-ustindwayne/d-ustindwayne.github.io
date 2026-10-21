import ui from "./data/textContent.json";
import cv from "./data/cv.json";
import projects from "./data/projects.json";
import photos from "./data/photos.json";

export const languages = { en: "English", es: "Español", tl: "Filipino" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const isLang = (value: unknown): value is Lang =>
    typeof value === "string" && value in languages;

/** All localized content for a locale (falls back to English). */
export function getContent(locale?: string) {
    const lang = isLang(locale) ? locale : defaultLang;
    return { lang, ui: ui[lang], cv: cv[lang], projects: projects[lang], photos: photos[lang] };
}
