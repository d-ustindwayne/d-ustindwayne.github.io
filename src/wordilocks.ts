import fallbackWords from "./data/wordilocksFallback.json";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

/**
 * Languages the game can be played in. Answers come from https://random-word-api.herokuapp.com
 * (Chinese is left out: its words aren't letters), except Filipino, which the API doesn't have: it uses a bundled list.
 * A site language listed here is picked automatically when the game opens in that language.
 */
export const wordLanguages = {
    en: "English",
    es: "Español",
    tl: "Filipino",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
    "pt-br": "Português (BR)",
    nl: "Nederlands",
    ro: "Română",
    tr: "Türkçe",
} as const;
export type WordLanguage = keyof typeof wordLanguages;

export const isWordLanguage = (value: unknown): value is WordLanguage => typeof value === "string" && value in wordLanguages;

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

const isPlayable = (plain: string) => plain.length === WORD_LENGTH && /^[a-z]+$/.test(plain);

/** Bundled Filipino words (Wiktionary's Tagalog entries), loaded only when Filipino is played */
const tagalog = () => import("./data/wordilocksTagalog.json").then((module) => module.default);

const queues = new Map<WordLanguage, Word[]>();

async function fetchWords(lang: WordLanguage): Promise<Word[]> {
    if (lang === "tl") {
        const { answers } = await tagalog();
        return Array.from({ length: 10 }, () => answers[Math.floor(Math.random() * answers.length)]).map((plain) => ({ plain, display: plain }));
    }
    const url = new URL("https://random-word-api.herokuapp.com/word");
    url.searchParams.set("length", String(WORD_LENGTH));
    url.searchParams.set("number", "10");
    if (lang !== "en") url.searchParams.set("lang", lang);

    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const words: string[] = await response.json();
    return words.map((display) => ({ plain: toPlain(display), display: display.toLocaleLowerCase() })).filter((word) => isPlayable(word.plain));
}

/** Next word for a language. Words are fetched 10 at a time; if the API is down the original word list is used. */
export async function nextWord(lang: WordLanguage): Promise<Word & { offline?: true }> {
    const queue = queues.get(lang) ?? [];
    queues.set(lang, queue);

    if (!queue.length) {
        try {
            queue.push(...(await fetchWords(lang)));
        } catch {}
    }

    const word = queue.shift();
    if (word) return word;
    const plain = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    return { plain, display: plain, offline: true };
}

/**
 * Word frequency lists (https://github.com/hermitdave/FrequencyWords, CC BY-SA 4.0) built from film subtitles:
 * the 50,000 most used words per language, so everyday words and their plurals and verb forms all count.
 */
const frequencyLists: Partial<Record<WordLanguage, string>> = { "pt-br": "pt_br" };

async function loadDictionary(lang: WordLanguage): Promise<Set<string>> {
    if (lang === "tl") return new Set((await tagalog()).valid);
    const code = frequencyLists[lang] ?? lang;
    const url = `https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/${code}/${code}_50k.txt`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`Word list ${response.status}`);
    const words = new Set<string>();
    for (const line of (await response.text()).split("\n")) {
        const plain = toPlain(line.split(" ")[0]);
        if (isPlayable(plain)) words.add(plain);
    }
    return words;
}

const dictionaries = new Map<WordLanguage, Promise<Set<string> | undefined>>();

/** Starts downloading a language's word list ahead of the first guess */
export function preloadDictionary(lang: WordLanguage) {
    if (!dictionaries.has(lang)) dictionaries.set(lang, loadDictionary(lang).catch(() => undefined));
}

/** Whether a guess is a real word. If the word list can't be loaded every guess is allowed, so the game still works. */
export async function isWord(lang: WordLanguage, plain: string, answer: Word): Promise<boolean> {
    if (plain === answer.plain) return true;
    preloadDictionary(lang);
    const dictionary = await dictionaries.get(lang);
    return !dictionary || dictionary.has(plain);
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
