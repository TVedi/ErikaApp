import Link from "next/link";
import Image from "next/image";
import { brand, footer, nav } from "@/content/copy";
import { BrandMark } from "@/components/layout/brand-mark";

const SOCIAL_ICON_SIZE = 22;

const footerSocialLinks = [
  {
    id: "facebook",
    href: "https://www.facebook.com/medveczkyerika",
    label: "Facebook",
    type: "svg" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width={SOCIAL_ICON_SIZE}
        height={SOCIAL_ICON_SIZE}
        aria-hidden="true"
        className="footer-social-icon"
      >
        <path
          fill="currentColor"
          d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    ),
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/erika_medveczky/",
    label: "Instagram",
    type: "svg" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width={SOCIAL_ICON_SIZE}
        height={SOCIAL_ICON_SIZE}
        aria-hidden="true"
        className="footer-social-icon"
      >
        <defs>
          <linearGradient
            id="footer-instagram-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="25%" stopColor="#FA7E1E" />
            <stop offset="50%" stopColor="#D62976" />
            <stop offset="75%" stopColor="#962FBF" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <path
          className="footer-social-icon-path"
          fill="url(#footer-instagram-gradient)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.766 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
        />
      </svg>
    ),
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/erika-medveczky-oly-23b389225/",
    label: "LinkedIn",
    type: "svg" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width={SOCIAL_ICON_SIZE}
        height={SOCIAL_ICON_SIZE}
        aria-hidden="true"
        className="footer-social-icon"
      >
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.063 2.063 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
      </svg>
    ),
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/watch?v=toKN7hp1QGw",
    label: "YouTube",
    type: "svg" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width={SOCIAL_ICON_SIZE}
        height={SOCIAL_ICON_SIZE}
        aria-hidden="true"
        className="footer-social-icon"
      >
        <path
          fill="#FF0000"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        />
        <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "athlete-site",
    href: "https://www.medveczkyerika.hu",
    label: "Website",
    type: "image" as const,
    icon: (
      <Image
        src="/medveczkyerika-icon-128.png"
        alt=""
        width={128}
        height={128}
        className="footer-social-site-icon"
      />
    ),
  },
] as const;

const siteNavLinks = [
  { href: "/", label: nav.home },
  { href: "/about", label: nav.about },
  { href: "/pricing", label: nav.programs },
  { href: "/camps", label: nav.camps },
  { href: "/speaking", label: nav.speaking },
] as const;

const legalLinks = [
  { href: "/medical-disclaimer", label: footer.medical },
  { href: "/privacy", label: footer.privacy },
  { href: "/terms", label: footer.terms },
  { href: "/refund-policy", label: footer.refund },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer-premium border-t border-border/60 bg-transparent">
      <div className="site-footer-inner">
        <div className="footer-main-grid">
          <div className="footer-col-brand">
            <Link href="/" className="footer-brand-lockup">
              <BrandMark className="footer-brand-mark" aria-hidden="true" />
              <span className="footer-brand-wordmark">Erika Medveczky OLY</span>
            </Link>
            <p className="footer-tagline">{brand.tagline}</p>
          </div>

          <div className="footer-col-nav">
            <nav className="footer-site-nav" aria-label="Site">
              {siteNavLinks.map((item) => (
                <Link key={item.href} href={item.href} className="footer-site-nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="footer-social" aria-label="Social media">
              {footerSocialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={
                    item.type === "image"
                      ? "footer-social-link footer-social-site"
                      : `footer-social-link footer-social-${item.id}`
                  }
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <nav className="footer-legal-links" aria-label="Legal">
            {legalLinks.map((item, i) => (
              <span key={item.href} className="footer-legal-item">
                {i > 0 ? (
                  <span className="footer-legal-sep" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <Link href={item.href} className="footer-legal-link">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <p className="footer-copyright">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
