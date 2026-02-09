/**
 * Schéma des articles de blog - structure attendue par l'admin et l'affichage
 */
export const BLOG_SECTION_TYPES = ["h2", "p", "blockquote"];

export const defaultArticle = {
  slug: "",
  title: "",
  thumbUrl: "/images/blog/post_1.jpeg",
  date: "",
  author: "",
  sections: [
    { type: "h2", text: "" },
    { type: "p", text: "" },
  ],
};

export const authors = [
  "Dr. Mboloko Esimo Justin",
  "Dr. Mosanda Rachidi",
  "Dr. Kelakela Hillaire",
  "Dr. Ngakinono Joel",
];

export const thumbOptions = [
  "/images/blog/post_1.jpeg",
  "/images/blog/post_2.jpeg",
  "/images/blog/post_3.jpeg",
];
