import Link from "next/link";

export const metadata = {
  title: "Administration",
  description: "Espace d'administration pour les médecins - Edith Centre médical",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-vh-100" style={{ background: "#f8f9fa" }}>
      <header
        className="py-3 px-4 shadow-sm"
        style={{ background: "#274760", color: "white" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <Link href="/" className="text-white text-decoration-none fw-bold">
            Edith - Centre médical
          </Link>
          <nav className="d-flex gap-3">
            <Link href="/admin/blog" className="text-white text-decoration-none">
              Blog
            </Link>
            <Link href="/blog" className="text-white-50 text-decoration-none">
              Voir le blog →
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-5">{children}</main>
    </div>
  );
}
