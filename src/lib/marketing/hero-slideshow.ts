export const HERO_SLIDE_INTERVAL_MS = 5000;
export const HERO_CROSSFADE_MS = 1400;

/** Ken-Burns zoom range — subtle per-slide drift while active. */
export const HERO_KEN_BURNS_SCALE_START = 1;
export const HERO_KEN_BURNS_SCALE_END = 1.06;

/** Future slow horizontal pan: set end offset (e.g. "-2%") and wire into keyframes in globals.css. */
export const HERO_KEN_BURNS_PAN_X_END = "0%";

export type HeroSlide = {
  src: string;
  objectPosition: string;
  /** Default cover; contain shows full frame (letterboxed on neutral dark) when cover crops key content. */
  objectFit?: "cover" | "contain";
};

/** Hero background rotation — order is display order (first = default / reduced-motion). */
export const HERO_SLIDESHOW_IMAGES: HeroSlide[] = [
  { src: "/hero.jpg", objectPosition: "right 25%" },
  { src: "/tokeletes.jpg", objectPosition: "center 15%" },
  { src: "/hero2.jpeg", objectPosition: "right 25%" },
  { src: "/Erika regi.jpg", objectPosition: "center 30%" },
];

/** Per-slide Ken-Burns duration while the slide is active. */
export function getHeroKenBurnsDurationMs(): number {
  return HERO_SLIDE_INTERVAL_MS + HERO_CROSSFADE_MS;
}
