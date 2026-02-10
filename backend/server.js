/**
 * API blog Edith : articles (CRUD) + upload d'images.
 * Stockage : fichiers JSON (data/blog) + images (uploads/).
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data", "blog");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));

const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype);
    cb(null, ok);
  },
});

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function listArticles() {
  const files = await fs.readdir(DATA_DIR).catch(() => []);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const articles = {};
  const list = [];
  for (const file of jsonFiles) {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
    const article = JSON.parse(raw);
    articles[article.slug] = article;
    list.push({
      slug: article.slug,
      title: article.title,
      thumbUrl: article.thumbUrl,
      date: article.date,
      btnText: "En savoir plus",
      href: `/blog/${article.slug}`,
      socialShare: true,
    });
  }
  list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return { articles, list };
}

// GET /articles
app.get("/articles", async (req, res) => {
  try {
    const data = await listArticles();
    res.json(data);
  } catch (err) {
    console.error("GET /articles", err);
    res.status(500).json({ error: "Erreur lors du chargement" });
  }
});

// GET /articles/:slug
app.get("/articles/:slug", async (req, res) => {
  try {
    const file = path.join(DATA_DIR, `${req.params.slug}.json`);
    const raw = await fs.readFile(file, "utf-8").catch(() => null);
    if (!raw) return res.status(404).json({ error: "Article non trouvé" });
    res.json(JSON.parse(raw));
  } catch (err) {
    console.error("GET /articles/:slug", err);
    res.status(500).json({ error: "Erreur lors du chargement" });
  }
});

// POST /articles
app.post("/articles", async (req, res) => {
  try {
    const { title, thumbUrl, sections } = req.body;
    if (!title || !sections?.length) {
      return res.status(400).json({ error: "Titre et contenu requis" });
    }
    const slug = slugify(title);
    const { list } = await listArticles();
    const thumbOptions = ["/images/blog/post_1.jpeg", "/images/blog/post_2.jpeg", "/images/blog/post_3.jpeg"];
    const article = {
      slug,
      title: title.trim(),
      thumbUrl: thumbUrl || thumbOptions[list.length % thumbOptions.length],
      date: new Date().toLocaleString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      author: "Dr. Mboloko Esimo Justin",
      sections: sections.map((s) => ({ type: s.type || "p", text: s.text || "" })),
    };
    const file = path.join(DATA_DIR, `${slug}.json`);
    await fs.writeFile(file, JSON.stringify(article, null, 2), "utf-8");
    res.json({ success: true, slug });
  } catch (err) {
    console.error("POST /articles", err);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
});

// PUT /articles/:slug
app.put("/articles/:slug", async (req, res) => {
  try {
    const currentSlug = req.params.slug;
    const { slug: newSlug, title, thumbUrl, sections } = req.body;
    if (!title || !sections?.length) {
      return res.status(400).json({ error: "Titre et contenu requis" });
    }
    const file = path.join(DATA_DIR, `${currentSlug}.json`);
    const raw = await fs.readFile(file, "utf-8").catch(() => null);
    if (!raw) return res.status(404).json({ error: "Article non trouvé" });
    const existing = JSON.parse(raw);
    const slug = newSlug || slugify(title) || currentSlug;
    const article = {
      slug,
      title: title.trim(),
      thumbUrl: thumbUrl || existing.thumbUrl || "/images/blog/post_1.jpeg",
      date: existing.date,
      author: existing.author || "Dr. Mboloko Esimo Justin",
      sections: sections.map((s) => ({ type: s.type || "p", text: s.text || "" })),
    };
    const newFile = path.join(DATA_DIR, `${slug}.json`);
    await fs.writeFile(newFile, JSON.stringify(article, null, 2), "utf-8");
    if (currentSlug !== slug) await fs.unlink(file).catch(() => {});
    res.json({ success: true, slug });
  } catch (err) {
    console.error("PUT /articles/:slug", err);
    res.status(500).json({ error: "Erreur lors de la sauvegarde" });
  }
});

// DELETE /articles/:slug
app.delete("/articles/:slug", async (req, res) => {
  try {
    const file = path.join(DATA_DIR, `${req.params.slug}.json`);
    await fs.unlink(file);
    res.json({ success: true });
  } catch (err) {
    if (err.code === "ENOENT") return res.status(404).json({ error: "Article non trouvé" });
    console.error("DELETE /articles/:slug", err);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

// POST /upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Aucune image fournie" });
    const ext = path.extname(req.file.originalname) || ".jpg";
    const name = `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const dest = path.join(UPLOAD_DIR, name);
    await fs.rename(req.file.path, dest);
    const url = `${BASE_URL}/uploads/${name}`;
    res.json({ url });
  } catch (err) {
    console.error("POST /upload", err);
    res.status(500).json({ error: "Erreur lors de l'upload" });
  }
});

ensureDirs().then(() => {
  app.listen(PORT, () => {
    console.log(`Blog API écoute sur ${BASE_URL} (PORT=${PORT})`);
  });
});
