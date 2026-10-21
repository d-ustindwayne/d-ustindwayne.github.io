const units = {
    years: 365.25 * 86_400_000,
    days: 86_400_000,
    hours: 3_600_000,
    minutes: 60_000,
    seconds: 1000,
};

export const BIRTH = "2005-04-14T07:09:00";

/** Fills "{years} … {seconds}" placeholders with the time elapsed since BIRTH */
export function formatAge(template: string, now = Date.now()) {
    let diff = now - new Date(BIRTH).getTime();
    const parts: Record<string, number> = {};
    for (const [unit, ms] of Object.entries(units)) {
        parts[unit] = Math.floor(diff / ms);
        diff %= ms;
    }
    return template.replace(/\{(\w+)\}/g, (_, unit: string) => String(parts[unit]));
}
