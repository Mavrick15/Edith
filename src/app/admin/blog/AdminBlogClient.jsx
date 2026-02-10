"use client";

import { useState } from "react";
import Link from "next/link";
import AdminBlogForm from "./AdminBlogForm";

export default function AdminBlogClient({ initialArticles, initialArticlesMap }) {
  const [articles, setArticles] = useState(initialArticles);
  const [articlesMap, setArticlesMap] = useState(initialArticlesMap || {});
  const [editingSlug, setEditingSlug] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [error, setError] = useState(null);

  async function refreshArticles() {
    const res = await fetch("/api/blog", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    if (res.ok) {
      const data = await res.json();
      setArticles(data.list);
      setArticlesMap(data.articles);
    }
  }

  function handleSuccess(slug, listItem, fullArticle, isEdit, previousSlug) {
    setShowForm(false);
    setEditingSlug(null);
    if (slug && listItem) {
      setArticles((prev) => {
        let next = isEdit
          ? prev.map((a) => (a.slug === listItem.slug ? listItem : a))
          : [listItem, ...prev.filter((a) => a.slug !== listItem.slug)];
        if (isEdit && previousSlug && previousSlug !== listItem.slug) {
          next = [listItem, ...next.filter((a) => a.slug !== previousSlug)];
        }
        return next.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      });
      if (fullArticle) {
        setArticlesMap((prev) => {
          const next = { ...prev, [fullArticle.slug]: fullArticle };
          if (previousSlug && previousSlug !== fullArticle.slug) delete next[previousSlug];
          return next;
        });
      }
    }
    refreshArticles();
  }

  function handleNew() {
    setEditingSlug(null);
    setShowForm(true);
  }

  function handleEdit(slug) {
    setEditingSlug(slug);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingSlug(null);
  }

  async function handleDelete(slug) {
    if (!confirm("Supprimer cet article ?")) return;
    setDeletingSlug(slug);
    setError(null);
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok) {
        if (editingSlug === slug) {
          setShowForm(false);
          setEditingSlug(null);
        }
        refreshArticles();
      } else {
        setError(json.error || "Erreur lors de la suppression.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setDeletingSlug(null);
    }
  }

  const editingArticle = editingSlug ? articlesMap[editingSlug] : null;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Blog</h1>
        <button type="button" className="cs_btn cs_style_1" onClick={handleNew}>
          <span>Nouvel article</span>
        </button>
      </div>

      {showForm ? (
        <div className="mb-5">
          <AdminBlogForm
            article={editingArticle}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Fermer" />
              </div>
            )}
            {articles.length === 0 ? (
              <p className="text-muted mb-0">Aucun article. Cliquez sur « Nouvel article » pour commencer.</p>
            ) : (
              <div className="list-group list-group-flush">
                {articles.map((a) => (
                  <div
                    key={a.slug}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <Link href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      {a.title}
                    </Link>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(a.slug)}
                        disabled={deletingSlug === a.slug}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(a.slug)}
                        disabled={deletingSlug === a.slug}
                        title="Supprimer"
                      >
                        {deletingSlug === a.slug ? "..." : "Supprimer"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!showForm && articles.length > 0 && (
        <p className="text-muted small mt-3">
          <Link href="/blog" className="text-decoration-none">Voir le blog →</Link>
        </p>
      )}
    </>
  );
}
