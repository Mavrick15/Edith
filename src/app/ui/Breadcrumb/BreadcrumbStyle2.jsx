"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Spacing from '../Spacing';
import { BreadcrumbSchema } from '../StructuredData';

// Mapping des segments d'URL vers des labels lisibles
const segmentLabels = {
  'about': 'À propos',
  'services': 'Services',
  'blog': 'Blog',
  'appointments': 'Rendez-vous',
  'tarifs': 'Tarifs',
  'gallery': 'Galerie',
  'contact': 'Contact',
  'doctor-detail': 'Médecins',
};

export default function BreadcrumbStyle2() {
  const pathname = usePathname();
  const urlSegments = pathname
    .split('/')
    .filter(segment => segment !== '');

  // Générer les items pour le breadcrumb schema
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    ...urlSegments.map((segment, index) => ({
      name: segmentLabels[segment] || segment.replace(/-/g, ' '),
      url: `/${urlSegments.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Spacing md="170" />
      <div className="cs_page_heading">
        <div className="container">
          <div className="cs_page_heading_in">
            <nav aria-label="Fil d'Ariane">
              <ol className="breadcrumb text-capitalize">
                <li className="breadcrumb-item">
                  <Link href="/">Accueil</Link>
                </li>
                {urlSegments.map((segment, index) => {
                  const label = segmentLabels[segment] || segment.replace(/-/g, ' ');
                  const href = `/${urlSegments.slice(0, index + 1).join('/')}`;
                  const isLast = index === urlSegments.length - 1;
                  
                  return (
                    <li key={index} className="breadcrumb-item" aria-current={isLast ? 'page' : undefined}>
                      {isLast ? (
                        <span>{label}</span>
                      ) : (
                        <Link href={href}>{label}</Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <form action="#" className="cs_search_form">
              <input type="text" placeholder="Rechercher un médecin" />
              <button className="cs_search_btn">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.07914 0C3.62682 0 0 3.62558 0 8.07641C0 12.5272 3.62682 16.1599 8.07914 16.1599C9.98086 16.1599 11.7299 15.4936 13.1122 14.3875L16.4775 17.7498C16.6473 17.9126 16.8741 18.0024 17.1094 18C17.3446 17.9975 17.5695 17.9032 17.736 17.737C17.9025 17.5708 17.9972 17.3461 17.9999 17.111C18.0027 16.8758 17.9132 16.6489 17.7506 16.4789L14.3853 13.1148C15.4928 11.7308 16.16 9.97968 16.16 8.07641C16.16 3.62558 12.5315 0 8.07914 0ZM8.07914 1.79517C11.561 1.79517 14.3625 4.59577 14.3625 8.07641C14.3625 11.557 11.561 14.3647 8.07914 14.3647C4.59732 14.3647 1.79575 11.557 1.79575 8.07641C1.79575 4.59577 4.59732 1.79517 8.07914 1.79517Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
