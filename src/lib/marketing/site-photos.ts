export type SitePhoto = {
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
};

/** Curated marketing photos — paths under /public/. */
export const sitePhotos = {
  hero: {
    src: "/hero.jpg",
    alt: "Erika Medveczky paddling",
    objectPosition: "right center",
    width: 2936,
    height: 1957,
  },
  aboutPortrait: {
    src: "/about-portrait.jpg",
    alt: "Erika Medveczky with kayak paddle",
    objectPosition: "center 15%",
    width: 979,
    height: 1462,
  },
  videoTechnique: {
    src: "/video-technique.jpg",
    alt: "Erika Medveczky paddling in training",
    objectPosition: "left center",
    width: 1081,
    height: 720,
  },
  videoAnalysis1Kep: {
    src: "/egyenes.jpeg",
    alt: "Erika Medveczky paddling — video technique analysis",
    objectPosition: "center 30%",
    width: 1303,
    height: 869,
  },
  campsLake: {
    src: "/camps-lake.jpg",
    alt: "Erika Medveczky with racing kayak at the lake",
    objectPosition: "left center",
    width: 3264,
    height: 2448,
  },
  campsRacing: {
    src: "/camps-racing.jpg",
    alt: "Erika Medveczky racing in Olympic kayak competition",
    objectPosition: "right center",
    width: 2048,
    height: 1241,
  },
  campsBackground: {
    src: "/camp.jpg",
    alt: "Kayak training camp on the water",
    objectPosition: "center 35%",
    width: 4000,
    height: 2667,
  },
  coachedByOlympicBackground: {
    src: "/piros kajak.png",
    alt: "Young athlete paddling a kayak on the water",
    objectPosition: "left center",
    width: 1672,
    height: 941,
  },
  whoItsFor: {
    src: "/DSC09954[1].jpg",
    alt: "Erika Medveczky coaching on the water",
    objectPosition: "center 35%",
    width: 2000,
    height: 1333,
  },
  howItWorks: {
    src: "/DSC09908[1].jpg",
    alt: "Erika Medveczky guiding athletes on the water",
    objectPosition: "center 30%",
    width: 2000,
    height: 1333,
  },
} as const satisfies Record<string, SitePhoto>;

export type SitePhotoKey = keyof typeof sitePhotos;
