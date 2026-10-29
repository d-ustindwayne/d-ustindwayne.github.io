import fallbackWords from "./data/wordleFallback.json";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

/** Word languages offered by https://random-word-api.herokuapp.com (Chinese is left out: its words aren't letters) */
export const wordLanguages = {
    en: "English",
    es: "Español",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
    "pt-br": "Português (BR)",
    nl: "Nederlands",
    ro: "Română",
    tr: "Türkçe",
} as const;
export type WordLanguage = keyof typeof wordLanguages;

export type Mark = "correct" | "present" | "absent";

export interface Word {
    /** a-z only, what the player types */
    plain: string;
    /** the word as the API spelled it, accents and all, shown when the game ends */
    display: string;
}

/** "Pêche" -> "peche": accents are dropped so every language plays on the same A-Z keyboard */
export const toPlain = (word: string) =>
    word.toLocaleLowerCase().replace(/ı/g, "i").normalize("NFD").replace(/\p{M}/gu, "");

const queues = new Map<WordLanguage, Word[]>();

/** Next word for a language. Words are fetched 10 at a time; if the API is down the original word list is used. */
export async function nextWord(lang: WordLanguage): Promise<Word & { offline?: true }> {
    const queue = queues.get(lang) ?? [];
    queues.set(lang, queue);

    if (!queue.length) {
        try {
            const url = new URL("https://random-word-api.herokuapp.com/word");
            url.searchParams.set("length", String(WORD_LENGTH));
            url.searchParams.set("number", "10");
            if (lang !== "en") url.searchParams.set("lang", lang);

            const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
            const words: string[] = await response.json();
            for (const display of words) {
                const plain = toPlain(display);
                if (/^[a-z]+$/.test(plain) && plain.length === WORD_LENGTH) queue.push({ plain, display: display.toLocaleLowerCase() });
            }
        } catch {}
    }

    const word = queue.shift();
    if (word) return word;
    const plain = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    return { plain, display: plain, offline: true };
}

/** Same two-pass rule as the original: greens first, then yellows only while that letter has copies left */
export function score(guess: string, answer: string): Mark[] {
    const marks: Mark[] = Array(WORD_LENGTH).fill("absent");
    const left: Record<string, number> = {};

    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === answer[i]) marks[i] = "correct";
        else left[answer[i]] = (left[answer[i]] ?? 0) + 1;
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (marks[i] !== "correct" && left[guess[i]] > 0) {
            marks[i] = "present";
            left[guess[i]]--;
        }
    }
    return marks;
}
