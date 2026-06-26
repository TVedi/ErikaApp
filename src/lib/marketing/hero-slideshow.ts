export const HERO_SLIDE_INTERVAL_MS = 6000;
export const HERO_CROSSFADE_MS = 1400;

export type HeroSlide = {
  src: string;
  objectPosition: string;
};

/** Hero background rotation — order is display order (first = default / reduced-motion). */
export const HERO_SLIDESHOW_IMAGES: HeroSlide[] = [
  { src: "/hero.jpg", objectPosition: "right center" },
  { src: "/1.kép.jpg", objectPosition: "center 35%" },
  { src: "/2017.1.jpg", objectPosition: "center 30%" },
  { src: "/Erika Rami.jpg", objectPosition: "center 25%" },
  { src: "/FB_IMG_1499550044040.jpg", objectPosition: "center center" },
];
