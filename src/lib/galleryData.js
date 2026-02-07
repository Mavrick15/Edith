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
  ],
  medium_791x644: [
    { imgUrl: "/images/about/portfolio_5_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_8_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_10_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_12_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_16_lg.jpeg" },
  ],
  tall_791x1074: [
    { imgUrl: "/images/about/portfolio_1_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_9_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_11_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_14_lg.jpeg" },
    { imgUrl: "/images/about/portfolio_15_lg.jpeg" },
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
 * Retourne les photos groupées pour la page À propos.
 * Chaque slot reçoit la liste complète de sa catégorie pour le carrousel.
 */
export function getAboutGalleryData() {
  return aboutGallerySlotOrder.map((size) => ({
    images: galleryBySize[size].map(({ imgUrl }) => imgUrl),
  }));
}

/**
 * Retourne les photos groupées pour la page Galerie.
 * Chaque slot reçoit la liste complète de sa catégorie pour le carrousel.
 */
export function getGalleryPageData() {
  return galleryPageSlotOrder.map((size) => ({
    images: galleryBySize[size].map(({ imgUrl }) => imgUrl),
  }));
}
