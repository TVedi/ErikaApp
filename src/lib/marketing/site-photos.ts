export type SitePhoto = {
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
};

/** Curated marketing photos — paths under /public/photos (clean filenames). */
export const sitePhotos = {
  hero: {
    src: "/hero.jpg",
    alt: "Erika Medveczky paddling",
    objectPosition: "right center",
    width: 2936,
    height: 1957,
  },
  aboutPortrait: {
    src: "/photos/about-portrait.jpg",
    alt: "Erika Medveczky with kayak paddle",
    objectPosition: "center 15%",
    width: 979,
    height: 1462,
  },
  videoTechnique: {
    src: "/photos/video-technique.jpg",
    alt: "Erika Medveczky paddling in training",
    objectPosition: "left center",
    width: 1081,
    height: 720,
  },
  campsLake: {
    src: "/photos/camps-lake.jpg",
    alt: "Erika Medveczky with racing kayak at the lake",
    objectPosition: "left center",
    width: 3264,
    height: 2448,
  },
  campsRacing: {
    src: "/photos/camps-racing.jpg",
    alt: "Erika Medveczky racing in Olympic kayak competition",
    objectPosition: "right center",
    width: 2048,
    height: 1241,
  },
} as const satisfies Record<string, SitePhoto>;

export type SitePhotoKey = keyof typeof sitePhotos;
