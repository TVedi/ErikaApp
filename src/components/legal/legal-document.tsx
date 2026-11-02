import Link from "next/link";

type LegalSection = {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
  /** Path of the page showing this document; it is not linked to itself. */
  selfHref: string;
};

const DOCUMENT_LINKS = [
  { text: "Terms of Service", href: "/terms" },
  { text: "Privacy Policy", href: "/privacy" },
  { text: "Refund Policy", href: "/refund-policy" },
  { text: "Medical Disclaimer", href: "/medical-disclaimer" },
  {
    text: "erika@medveczkyperformance.com",
    href: "mailto:erika@medveczkyperformance.com",
  },
] as const;

const LINK_PATTERN = new RegExp(
  `(${DOCUMENT_LINKS.map((link) => link.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

function withLinks(text: string, selfHref: string) {
  return text.split(LINK_PATTERN).map((part, i) => {
    const link = DOCUMENT_LINKS.find((candidate) => candidate.text === part);
    if (!link || link.href === selfHref) return part;
    if (link.href.startsWith("mailto:")) {
      return (
        <a key={i} href={link.href} className="apply-inline-link">
          {part}
        </a>
      );
    }
    return (
      <Link key={i} href={link.href} className="apply-inline-link">
        {part}
      </Link>
    );
  });
}

/**
 * A legal page written on the site itself (not a Termly embed). The text lives
 * in src/content/copy.ts; edit it there. Names of the other legal pages and
 * Erika's email address inside the text become links automatically.
 */
export function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
  selfHref,
}: LegalDocumentProps) {
  return (
    <article>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{lastUpdated}</p>
      {intro.map((paragraph) => (
        <p key={paragraph} className="mt-6 text-muted-foreground leading-relaxed">
          {withLinks(paragraph, selfHref)}
        </p>
      ))}
      {sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-muted-foreground leading-relaxed">
              {withLinks(paragraph, selfHref)}
            </p>
          ))}
          {section.items ? (
            <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground leading-relaxed">
              {section.items.map((item) => (
                <li key={item}>{withLinks(item, selfHref)}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
