/**
 * Galerie photos - Installations et activités
 * Photos organisées par dimension pour éviter déformation dans la grille.
 *
 * Dimensions des cases :
 * - small_527x429  : format paysage standard
 * - medium_791x644 : format paysage moyen
 * - tall_791x1074  : format portrait (case haute)
 * - wide_1611x644  : format paysage large (case qui span 2 colonnes)
 *
 * Pour ajouter une photo : placez l'image dans public/images/about/
 * puis ajoutez-la dans la catégorie qui correspond à ses dimensions.
 */

export const galleryBySize = {
  small_527x429: [
    { imgUrl: "/images/about/portfolio_2_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_3_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_6_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_7_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_13_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_17_lg.png" },
    { imgUrl: "/images/about/portfolio_16_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_19_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_20_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_21_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_22_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_23_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_26_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_27_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_28_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_30_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_31_lg.jpeg" },
  ],
  medium_791x644: [
    { imgUrl: "/images/about/portfolio_5_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_8_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_10_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_12_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_33_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_35_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_36_lg.jpeg" },

  ],
  tall_791x1074: [
    { imgUrl: "/images/about/portfolio_1_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_9_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_11_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_14_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_15_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_24_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_25_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_29_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_32_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_34_lg.jpeg" },
  ],
  wide_1611x644: [
    { imgUrl: "/images/about/portfolio_4_lg.jpeg" }
  ],
};

/**
 * Ordre des cases pour la page À propos (GallerySection - cs_gallery_grid_1)
 * Correspond à la disposition des cases : small, medium, tall, wide, small
 */
export const aboutGallerySlotOrder = [
  "small_527x429",
  "medium_791x644",
  "tall_791x1074",
  "wide_1611x644",
  "small_527x429",
];

/**
 * Ordre des cases pour la page Galerie (GallerySectionStyle2 - cs_gallery_grid_2)
 * Index 0,6 = wide | Index 1-5 = small (ou medium selon design)
 */
export const galleryPageSlotOrder = [
  "wide_1611x644",
  "small_527x429",
  "small_527x429",
  "small_527x429",
  "small_527x429",
  "small_527x429",
  "wide_1611x644",
];

/**
 * Durées de changement (en ms) par catégorie.
 * Chaque slot a un intervalle et un crossfade différents.
 */
const categoryTiming = {
  small_527x429: {
    intervalMin: 6500,
    intervalMax: 8500,
    crossfadeMs: 600,
  },
  medium_791x644: {
    intervalMin: 7200,
    intervalMax: 9500,
    crossfadeMs: 700,
  },
  tall_791x1074: {
    intervalMin: 7500,
    intervalMax: 10000,
    crossfadeMs: 750,
  },
  wide_1611x644: {
    intervalMin: 8000,
    intervalMax: 11000,
    crossfadeMs: 900,
  },
};

/**
 * Retourne les photos groupées pour la page À propos.
 * Chaque slot reçoit la liste de sa catégorie (mélangée) et des durées de changement propres à la catégorie.
 */
export function getAboutGalleryData() {
  return aboutGallerySlotOrder.map((size) => {
    const timing = categoryTiming[size] || categoryTiming.small_527x429;
    return {
      images: shuffle(galleryBySize[size].map(({ imgUrl }) => imgUrl)),
      intervalMin: timing.intervalMin,
      intervalMax: timing.intervalMax,
      crossfadeMs: timing.crossfadeMs,
    };
  });
}

/**
 * Mélange un tableau de manière aléatoire (Fisher-Yates)
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Retourne les photos groupées pour la page Galerie.
 * Chaque slot reçoit la liste de sa catégorie (mélangée) et des durées de changement propres à la catégorie.
 */
export function getGalleryPageData() {
  return galleryPageSlotOrder.map((size) => {
    const timing = categoryTiming[size] || categoryTiming.small_527x429;
    return {
      images: shuffle(galleryBySize[size].map(({ imgUrl }) => imgUrl)),
      intervalMin: timing.intervalMin,
      intervalMax: timing.intervalMax,
      crossfadeMs: timing.crossfadeMs,
    };
  });
}
