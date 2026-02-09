import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';


export default function SocialWidget() {
  const socialLinks = [
    { href: "/", icon: "fa-brands:facebook-f", label: "Facebook" },
    { href: "/", icon: "fa-brands:youtube", label: "YouTube" },
    { href: "/", icon: "fa-brands:linkedin-in", label: "LinkedIn" },
    { href: "/", icon: "fa-brands:twitter", label: "Twitter" },
    { href: "/", icon: "fa-brands:instagram", label: "Instagram" },
  ];

  return (
    <div className="cs_social_links_wrap">
      <h2>Suivez-nous</h2>
      <div className="cs_social_links" role="group" aria-label="Réseaux sociaux">
        {socialLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Suivre Edith sur ${item.label}`}
            prefetch={false}
          >
            <Icon icon={item.icon} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
