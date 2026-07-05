import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/zhumorui",
        linkTitle: `Morui Zhu on GitHub`,
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:morui.zhu@unt.edu",
        linkTitle: `Send an email to Morui Zhu`,
        isActive: true,
    },
    {
        name: "Google Scholar",
        href: "https://scholar.google.com/citations?user=zhumorui",
        linkTitle: `Morui Zhu on Google Scholar`,
        isActive: false,
    },
    {
        name: "ORCID",
        href: "https://orcid.org/",
        linkTitle: `Morui Zhu on ORCID`,
        isActive: false,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/",
        linkTitle: `Morui Zhu on LinkedIn`,
        isActive: false,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    "Google Scholar": "GoogleScholar",
    ORCID: "ORCID",
    RSS: "RSS",
};
