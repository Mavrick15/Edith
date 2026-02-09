"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export default function Breadcrumb({ title }) {
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
      <div className="container">
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
        <div className="cs_height_18" />
        <h1 className="cs_fs_72 mb-0">{title}</h1>
      </div>
    </>
  );
}
