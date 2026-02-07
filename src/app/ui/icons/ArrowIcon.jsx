import Image from "next/image";

/**
 * Icône flèche décorative pour les boutons (non annoncée aux lecteurs d'écran)
 */
export default function ArrowIcon({ height = 11, width = 15 }) {
  return (
    <i aria-hidden="true">
      <Image
        src="/images/icons/arrow_white.svg"
        alt=""
        height={height}
        width={width}
      />
    </i>
  );
}
