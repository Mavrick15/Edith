"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ArrowIcon from "@/app/ui/icons/ArrowIcon";
import RichTextToolbar from "@/app/ui/RichTextToolbar";
import { parseContentToSections, sectionsToContent } from "@/lib/blogContentParser";

export default function AdminBlogForm({ article, onSuccess, onCancel }) {
  const isEdit = !!article;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const fileInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

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

  async function uploadFile(file) {
    if (!file?.type?.startsWith("image/")) return;
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

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
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
        onSuccess?.(json.slug, json.listItem, json.article, isEdit, isEdit ? article?.slug : null);
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
      className="admin-blog-form"
    >
      <div className="admin-blog-form_card">
        <h3 className="admin-blog-form_sectionTitle">Image mise en avant</h3>
        <div
          className={`admin-blog-form_imageZone ${dragOver ? "admin-blog-form_imageZone--drag" : ""} ${thumbUrl ? "admin-blog-form_imageZone--hasImage" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !thumbUrl && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="d-none"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {thumbUrl ? (
            <div className="admin-blog-form_imagePreview">
              <Image
                src={thumbUrl}
                alt="Aperçu"
                fill
                className="object-fit-cover"
                unoptimized={thumbUrl.startsWith("/images/blog/uploads/")}
              />
              <div className="admin-blog-form_imageActions">
                <button
                  type="button"
                  className="admin-blog-form_imageBtn"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  disabled={uploading}
                  title="Changer l'image"
                >
                  Changer
                </button>
                <button
                  type="button"
                  className="admin-blog-form_imageBtn admin-blog-form_imageBtn--danger"
                  onClick={(e) => { e.stopPropagation(); setThumbUrl(""); }}
                  disabled={uploading}
                  title="Supprimer l'image"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-blog-form_imagePlaceholder">
              {uploading ? (
                <span className="admin-blog-form_imageText">Envoi en cours...</span>
              ) : (
                <>
                  <span className="admin-blog-form_imageIcon">📷</span>
                  <span className="admin-blog-form_imageText">Glissez une image ici ou cliquez pour sélectionner</span>
                  <span className="admin-blog-form_imageHint">JPG, PNG, WebP ou GIF — max 5 Mo</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="admin-blog-form_card">
        <h3 className="admin-blog-form_sectionTitle">Titre de l&apos;article</h3>
        <input
          type="text"
          className="admin-blog-form_input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Fertilité et alimentation : les bons réflexes"
          required
          autoFocus={!article}
        />
      </div>

      <div className="admin-blog-form_card">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="admin-blog-form_sectionTitle mb-0">Contenu</h3>
          <button
            type="button"
            className="admin-blog-form_helpBtn"
            onClick={() => setShowHelp(!showHelp)}
            aria-expanded={showHelp}
          >
            {showHelp ? "Masquer l'aide" : "Aide formatage"}
          </button>
        </div>
        {showHelp && (
          <div className="admin-blog-form_help">
            <p className="mb-1"><code>##</code> avant un texte = sous-titre</p>
            <p className="mb-1"><code>&gt;</code> avant un texte = citation</p>
            <p className="mb-1">Sélectionnez du texte puis utilisez la barre pour <strong>gras</strong>, <em>italique</em>, souligné ou police.</p>
            <p className="mb-0">Ligne vide = nouveau paragraphe</p>
          </div>
        )}
        <RichTextToolbar
          textareaRef={contentTextareaRef}
          value={content}
          onChange={setContent}
        />
        <textarea
          ref={contentTextareaRef}
          className="admin-blog-form_textarea"
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écrivez votre article ici..."
        />
      </div>

      <div className="admin-blog-form_footer">
        <p className="admin-blog-form_note">
          Date, heure et auteur sont ajoutés automatiquement.
        </p>
        {error && (
          <div className="admin-blog-form_error" role="alert">
            {error}
          </div>
        )}
        <div className="admin-blog-form_actions">
          <button
            type="submit"
            className="cs_btn cs_style_1"
            disabled={loading}
          >
            <span>{loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Publier"}</span>
            <ArrowIcon height={11} width={15} />
          </button>
          {onCancel && (
            <button type="button" className="admin-blog-form_cancelBtn" onClick={onCancel}>
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
