"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { parseContentToSections, sectionsToContent } from "@/lib/blogContentParser";

export default function AdminBlogForm({ article, onSuccess, onCancel }) {
  const isEdit = !!article;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setContent(sectionsToContent(article.sections) || "");
      setThumbUrl(article.thumbUrl || "");
    } else {
      setTitle("");
      setContent("");
      setThumbUrl("");
    }
  }, [article]);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/blog/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (res.ok) {
        setThumbUrl(json.url);
      } else {
        setError(json.error || "Erreur lors de l'upload.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const sections = parseContentToSections(content);
    if (!title.trim()) {
      setError("Le titre est requis.");
      setLoading(false);
      return;
    }
    if (sections.length === 0) {
      setError("Le contenu est requis.");
      setLoading(false);
      return;
    }

    try {
      const url = isEdit ? `/api/blog/${article.slug}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      const body = {
        title: title.trim(),
        sections,
      };
      if (thumbUrl) body.thumbUrl = thumbUrl;
      if (isEdit) body.slug = article.slug;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (res.ok) {
        onSuccess?.(json.slug);
      } else {
        setError(json.error || "Erreur lors de la sauvegarde.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30 p-4 shadow-sm"
    >
      <div className="mb-4">
        <label className="cs_input_label cs_heading_color form-label">Image mise en avant</label>
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div className="flex-shrink-0">
            {thumbUrl ? (
              <div className="position-relative rounded overflow-hidden" style={{ width: 160, height: 100 }}>
                <Image
                  src={thumbUrl}
                  alt="Aperçu"
                  fill
                  className="object-fit-cover"
                  unoptimized={thumbUrl.startsWith("/images/blog/uploads/")}
                />
              </div>
            ) : (
              <div
                className="border rounded d-flex align-items-center justify-content-center bg-light"
                style={{ width: 160, height: 100 }}
              >
                <span className="text-muted small">Aucune image</span>
              </div>
            )}
          </div>
          <div className="flex-grow-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="form-control form-control-sm"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <span className="small text-muted">Envoi en cours...</span>}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="cs_input_label cs_heading_color form-label">Titre *</label>
        <input
          type="text"
          className="cs_form_field form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Fertilité et alimentation : les bons réflexes"
          required
        />
      </div>

      <div className="mb-4">
        <label className="cs_input_label cs_heading_color form-label">Contenu *</label>
        <textarea
          className="cs_form_field form-control"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Écrivez votre article ici. Astuces :
- Pour un sous-titre : commencez la ligne par ##
- Pour une citation : commencez par >
- Sinon : écrivez normalement, séparez les paragraphes par une ligne vide`}
        />
      </div>

      <div className="mb-4 small text-muted">
        Date et auteur seront ajoutés automatiquement à la publication.
      </div>

      {error && <div className="mb-3 text-danger">{error}</div>}

      <div className="d-flex gap-2">
        <button type="submit" className="cs_btn cs_style_1" disabled={loading}>
          <span>{loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Publier"}</span>
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
