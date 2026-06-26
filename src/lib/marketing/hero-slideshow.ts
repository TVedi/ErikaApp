export const HERO_SLIDE_INTERVAL_MS = 5000;
export const HERO_CROSSFADE_MS = 1400;

/** Ken-Burns zoom range — subtle editorial drift over one full slideshow loop. */
export const HERO_KEN_BURNS_SCALE_START = 1;
export const HERO_KEN_BURNS_SCALE_END = 1.08;

/** Future slow horizontal pan: set end offset (e.g. "-2%") and wire into keyframes in globals.css. */
export const HERO_KEN_BURNS_PAN_X_END = "0%";

export type HeroSlide = {
  src: string;
  objectPosition: string;
};

/** Hero background rotation — order is display order (first = default / reduced-motion). */
export const HERO_SLIDESHOW_IMAGES: HeroSlide[] = [
  { src: "/hero.jpg", objectPosition: "right center" },
  { src: "/2017.1.jpg", objectPosition: "center top" },
  { src: "/Erika regi.jpg", objectPosition: "center 30%" },
  { src: "/Erika bajnok.jpg", objectPosition: "center 25%" },
];

/** One continuous Ken-Burns cycle spans all slides (no per-slide reset). */
export function getHeroKenBurnsCycleMs(
  slideCount = HERO_SLIDESHOW_IMAGES.length
): number {
  return HERO_SLIDE_INTERVAL_MS * slideCount;
}
