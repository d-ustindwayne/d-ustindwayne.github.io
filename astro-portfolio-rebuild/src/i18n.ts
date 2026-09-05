import { type Language } from "./types/ConfigType.astro";

export function getSystemLanguage(): Language {
    const language = navigator.language.toLowerCase();

    if (language.startsWith("es")) return "es";
    if (language.startsWith("tl") || language.startsWith("fil")) return "tl";
    return "en";
}

export function getLanguage(): Language {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    
    if (savedLanguage) return savedLanguage;
    return getSystemLanguage();
}

export function setLanguage(language: Language): void {
    localStorage.setItem("language", language);
}