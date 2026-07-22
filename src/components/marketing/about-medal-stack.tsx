"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type MedalPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Fixed pile — rotations/offsets set in CSS per index; order = paint order. */
const MEDAL_PHOTOS: MedalPhoto[] = [
  {
    src: "/3erem.png",
    width: 1449,
    height: 1085,
    alt: "Three world championship medals held together",
  },
  {
    src: "/Duisburg.png",
    width: 971,
    height: 1619,
    alt: "Erika Medveczky with a world championship gold medal in Duisburg",
  },
  {
    src: "/Erika bajnok.jpg",
    width: 760,
    height: 506,
    alt: "Erika Medveczky celebrating a world championship title",
  },
  {
    src: "/Erika Rami.jpg",
    width: 900,
    height: 599,
    alt: "Erika Medveczky on the podium with a gold medal and teammate",
  },
  {
    src: "/Összes érem.jpg",
    width: 1816,
    height: 1644,
    alt: "Collection of Erika Medveczky's championship medals",
  },
];

/**
 * Interactive scattered medal stack — transform/opacity only.
 * Touch: tap to lift (tap again or another to release). Hover on fine pointers via CSS.
 */
export function AboutMedalStack() {
  const [active, setActive] = useState<number | null>(null);

  const onActivate = useCallback((index: number) => {
    setActive((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="about-medal-stack" aria-label="Championship medal photos">
      {MEDAL_PHOTOS.map((photo, index) => (
        <button
          key={photo.src}
          type="button"
          className={
            active === index
              ? `about-medal-card about-medal-card--${index + 1} is-lifted`
              : `about-medal-card about-medal-card--${index + 1}`
          }
          aria-pressed={active === index}
          onClick={() => onActivate(index)}
        >
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            sizes="(max-width: 640px) 42vw, 200px"
            quality={75}
            className="about-medal-card-img"
          />
        </button>
      ))}
    </div>
  );
}
