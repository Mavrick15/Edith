"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropDown from "./DropDown";

export default function Header({ logoSrc, variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);

  const closeMobileMenu = () => setMobileToggle(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`cs_site_header cs_style1 cs_sticky_header ${variant} ${
          isSticky ? "cs_active_sticky" : ""
        }`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding cs_site_branding_logo" href="/">
                  <Image
                    src={logoSrc}
                    alt="Edith - Centre médical Kinshasa"
                    height={140}
                    width={540}
                    className="cs_header_logo"
                    sizes="(max-width: 380px) 420px, (max-width: 575px) 460px, (max-width: 1199px) 600px, (max-width: 1400px) 640px, (max-width: 1700px) 700px, 780px"
                    priority
                  />
                </Link>
                <nav className="cs_nav" id="main-navigation" aria-label="Navigation principale">
                  <ul
                    className={`${
                      mobileToggle ? "cs_nav_list cs_active" : "cs_nav_list"
                    }`}
                  >
                    <li>
                      <Link href="/" onClick={closeMobileMenu}>Accueil</Link>
                    </li>
                    <li>
                      <Link href="/about" onClick={closeMobileMenu}>À propos</Link>
                    </li>
                    <li>
                      <Link href="/services" onClick={closeMobileMenu}>Services</Link>
                    </li>
                    <li>
                      <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/" onClick={closeMobileMenu}>Plus</Link>
                      <DropDown>
                        <ul>
                          <li>
                            <Link href="/doctor-detail" onClick={closeMobileMenu}>Médecins</Link>
                          </li>
                          <li>
                            <Link href="/appointments" onClick={closeMobileMenu}>Rendez-vous</Link>
                          </li>
                          <li>
                            <Link href="/tarifs" onClick={closeMobileMenu}>Tarifs</Link>
                          </li>
                          <li>
                            <Link href="/gallery" onClick={closeMobileMenu}>Galerie</Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li>
                      <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className={
                      mobileToggle
                        ? "cs_menu_toggle cs_toggle_active"
                        : "cs_menu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                    aria-label={mobileToggle ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={mobileToggle}
                    aria-controls="main-navigation"
                  >
                    <span aria-hidden="true"></span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
