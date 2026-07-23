"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type MedalPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Fixed organic cluster — rotations/offsets in CSS; Erika bajnok = topmost. */
const MEDAL_PHOTOS: MedalPhoto[] = [
  {
    src: "/3erem-stack.webp",
    width: 900,
    height: 674,
    alt: "Three world championship medals held together",
  },
  {
    src: "/Duisburg-stack.webp",
    width: 540,
    height: 900,
    alt: "Erika Medveczky with a world championship gold medal in Duisburg",
  },
  {
    src: "/Erika bajnok-stack.webp",
    width: 760,
    height: 506,
    alt: "Erika Medveczky celebrating a world championship title",
  },
  {
    src: "/Erika Rami-stack.webp",
    width: 900,
    height: 599,
    alt: "Erika Medveczky on the podium with a gold medal and teammate",
  },
  {
    src: "/Összes érem-stack.webp",
    width: 900,
    height: 815,
    alt: "Collection of Erika Medveczky's championship medals",
  },
  {
    src: "/IMG_20210620_175502-stack.webp",
    width: 900,
    height: 675,
    alt: "Erika Medveczky with a championship medal",
  },
  {
    src: "/IMG_20180810_151722-stack.webp",
    width: 675,
    height: 900,
    alt: "Erika Medveczky in racing kit with a gold medal",
  },
  {
    src: "/2017.1-stack.webp",
    width: 900,
    height: 600,
    alt: "Erika Medveczky celebrating a 2017 race victory",
  },
  {
    src: "/Erika regi-stack.webp",
    width: 900,
    height: 600,
    alt: "Erika Medveczky with an early championship medal",
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
    <div className="about-medal-stack-wrap">
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
              sizes="(max-width: 640px) 45vw, 400px"
              quality={75}
              className="about-medal-card-img"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
