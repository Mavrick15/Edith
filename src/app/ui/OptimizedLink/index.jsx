/**
 * Composant Link optimisé avec prefetch automatique
 * Améliore les performances de navigation
 */
import Link from "next/link";
import { ReactNode } from "react";

interface OptimizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  [key: string]: any;
}

export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  ...props
}: OptimizedLinkProps) {
  return (
    <Link href={href} prefetch={prefetch} className={className} {...props}>
      {children}
    </Link>
  );
}
