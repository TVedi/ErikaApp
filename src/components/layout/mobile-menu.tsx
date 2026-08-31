"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Programs" },
  { href: "/video-course", label: "Video Course" },
  { href: "/camps", label: "Camps" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About Erika" },
  { href: "/#faq", label: "FAQ" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="mobile-menu-toggle"
      >
        <span className="mobile-menu-bar" aria-hidden="true" />
        <span className="mobile-menu-bar" aria-hidden="true" />
        <span className="mobile-menu-bar" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id="mobile-menu-panel"
          className="mobile-menu-panel"
          onClick={() => setOpen(false)}
        >
          <nav className="mobile-menu-nav" aria-label="Main">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-menu-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
