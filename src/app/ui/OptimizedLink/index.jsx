/**
 * Composant Link optimisé avec prefetch automatique
 * Améliore les performances de navigation
 */
import Link from "next/link";

export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  ...props
}) {
  return (
    <Link href={href} prefetch={prefetch} className={className} {...props}>
      {children}
    </Link>
  );
}
