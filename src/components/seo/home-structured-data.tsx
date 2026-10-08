import { brand, faq, hero, launch } from "@/content/copy";
import { getSiteUrl } from "@/lib/seo/site-url";

function priceFrom(priceNote: string): string {
  return priceNote.replace(/[^0-9]/g, "");
}

export function HomeStructuredData() {
  const siteUrl = getSiteUrl();
  const { starter, technique, elite } = launch.programs;
  const coachId = `${siteUrl}/#erika-medveczky`;
  const businessId = `${siteUrl}/#business`;

  const monthlyOffer = (name: string, description: string, priceNote: string) => ({
    "@type": "Offer",
    name,
    description,
    url: `${siteUrl}/apply`,
    priceCurrency: "USD",
    price: priceFrom(priceNote),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: priceFrom(priceNote),
      priceCurrency: "USD",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
  });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": coachId,
        name: "Erika Medveczky",
        jobTitle: "Olympic sprint kayaker and elite kayak coach",
        description: launch.aboutPreview.body,
        nationality: "Hungarian",
        award: [launch.whoItsFor.featuredAchievement, ...launch.whoItsFor.titleAchievements],
        knowsAbout: ["Sprint kayak", "Kayak technique", "Race preparation", "Training planning"],
        workLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gainesville",
            addressRegion: "GA",
            addressCountry: "US",
          },
        },
        worksFor: { "@id": businessId },
        url: `${siteUrl}/about`,
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: brand.name,
        description: hero.subtitle,
        url: siteUrl,
        email: "erika@medveczkyperformance.com",
        founder: { "@id": coachId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gainesville",
          addressRegion: "GA",
          addressCountry: "US",
        },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: launch.programs.title,
          itemListElement: [
            {
              "@type": "Offer",
              name: starter.name,
              description: starter.description,
              url: `${siteUrl}/apply`,
              priceCurrency: "USD",
              price: priceFrom(starter.priceNote),
            },
            monthlyOffer(technique.name, technique.description, technique.priceNote),
            monthlyOffer(elite.name, elite.description, elite.priceNote),
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
