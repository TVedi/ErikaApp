"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { olympicDiploma } from "@/content/copy";

type DiplomaLightboxProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
};

/**
 * Custom diploma lightbox — no existing modal in the project to reuse.
 * Backdrop keeps the site visible (emerald tint + blur); focus-trapped dialog.
 */
export function DiplomaLightbox({
  open,
  onClose,
  returnFocusRef,
}: DiplomaLightboxProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    const id = window.setTimeout(() => {
      returnFocusRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open, returnFocusRef]);

  const onBackdropClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="diploma-lightbox-root"
      role="presentation"
      onMouseDown={onBackdropClick}
    >
      <div
        ref={panelRef}
        className="diploma-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">
          {olympicDiploma.imageAlt}
        </h2>
        <button
          ref={closeBtnRef}
          type="button"
          className="diploma-lightbox-close"
          aria-label={olympicDiploma.closeLabel}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="diploma-lightbox-image"
          src={olympicDiploma.imageSrc}
          alt={olympicDiploma.imageAlt}
          width={1536}
          height={1024}
          decoding="async"
        />
      </div>
    </div>,
    document.body,
  );
}

export function OlympicDiplomaBadge() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox();
    }
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="oly-diploma-badge-btn"
        aria-label={olympicDiploma.openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openLightbox}
        onKeyDown={onKeyDown}
      >
        <Image
          src={olympicDiploma.badgeSrc}
          alt=""
          width={64}
          height={64}
          className="oly-diploma-badge-img"
          aria-hidden="true"
        />
      </button>
      <DiplomaLightbox
        open={open}
        onClose={closeLightbox}
        returnFocusRef={btnRef}
      />
    </>
  );
}
