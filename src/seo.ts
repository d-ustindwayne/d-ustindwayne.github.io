import contacts from "./data/contacts.json";
import { getContent, type Lang } from "./i18n";

// Structured data (schema.org JSON-LD) shared by the pages; ids let the nodes reference each other
const id = (site: URL, name: string) => new URL(`/#${name}`, site).href;
const stripTags = (html: string) => html.replace(/<[^>]+>/g, "").trim();
// The only projects promoted to search engines (matched by repo, since titles are translated)
const searchableProjects = ["d-ustindwayne.github.io", "Medkit-Clicker", "Dessa"];

export function websiteSchema(site: URL) {
    return {
        "@type": "WebSite",
        "@id": id(site, "website"),
        url: site.href,
        name: "Dustin Dwayne Diaz",
        inLanguage: ["en", "es", "fil"],
        publisher: { "@id": id(site, "person") },
    };
}

export function personSchema(site: URL, lang: Lang) {
    const { cv } = getContent(lang);
    return {
        "@type": "Person",
        "@id": id(site, "person"),
        name: "Dustin Dwayne Diaz",
        alternateName: cv.name,
        url: site.href,
        image: new URL("/icon-512.png", site).href,
        jobTitle: cv.title.it,
        address: { "@type": "PostalAddress", addressLocality: "Pukekohe", addressRegion: "Auckland", addressCountry: "NZ" },
        alumniOf: cv.education.map((edu) => ({ "@type": "EducationalOrganization", name: edu.institute })),
        // The first IT skill group is the programming languages (its key is translated)
        knowsAbout: Object.values(cv.skills.it)[0].split(", "),
        sameAs: contacts.filter((contact) => contact.link.startsWith("http")).map((contact) => contact.link),
    };
}

/** The home page: a profile page about the person, listing the projects */
export function homeSchema(site: URL, lang: Lang, pageUrl: URL) {
    const { ui, projects } = getContent(lang);
    return [
        {
            "@type": "ProfilePage",
            "@id": `${pageUrl.href}#page`,
            url: pageUrl.href,
            name: ui.meta.title,
            description: ui.meta.description,
            inLanguage: lang === "tl" ? "fil" : lang,
            isPartOf: { "@id": id(site, "website") },
            mainEntity: { "@id": id(site, "person") },
        },
        {
            "@type": "ItemList",
            name: ui.projects.title,
            itemListElement: projects.filter((project) => searchableProjects.some((repo) => project.links.code.endsWith(`/${repo}`))).map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "SoftwareSourceCode",
                    name: project.title,
                    description: stripTags(project.description),
                    url: project.links.live ?? project.links.code,
                    codeRepository: project.links.code,
                    programmingLanguage: project.technologies,
                    author: { "@id": id(site, "person") },
                },
            })),
        },
    ];
}
