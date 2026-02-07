"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconBoxStyle11 from "../IconBox/IconBoxStyle11";
import Spacing from "../Spacing";
import Newsletter from "../Widget/Newsletter";
import SocialWidget from "../Widget/SocialWidget";
import DropDown from "./DropDown";

export default function Header({ logoSrc, variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [sideNav, setSideNav] = useState(false);

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
                    alt="Logo"
                    height={55}
                    width={400}
                    className="cs_header_logo"
                    sizes="(max-width: 380px) 180px, (max-width: 575px) 220px, (max-width: 1199px) 300px, (max-width: 1400px) 330px, (max-width: 1700px) 360px, 400px"
                  />
                </Link>
                <nav className="cs_nav">
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
                  <span
                    className={
                      mobileToggle
                        ? "cs_menu_toggle cs_toggle_active"
                        : "cs_menu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </nav>
              </div>
              <div className="cs_main_header_right">
                <div className="cs_toolbox">
                  <button
                    className="cs_toolbox_btn cs_sidebar_toggle_btn"
                    type="button"
                    onClick={() => setSideNav(!sideNav)}
                  >
                    <svg
                      width={35}
                      height={30}
                      viewBox="0 0 35 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.483887 2.46544C0.483887 1.10383 1.14618 0 1.96315 0H33.5208C34.3377 0 35 1.10383 35 2.46544C35 3.82708 34.3377 4.93088 33.5208 4.93088H1.96315C1.14618 4.93088 0.483887 3.82708 0.483887 2.46544Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.483887 14.6694C0.483887 13.3074 1.14618 12.2039 1.96315 12.2039H33.5208C34.3377 12.2039 35 13.3074 35 14.6694C35 16.0309 34.3377 17.1348 33.5208 17.1348H1.96315C1.14618 17.1348 0.483887 16.0309 0.483887 14.6694Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.483887 26.6267C0.483887 25.2648 1.14618 24.1613 1.96315 24.1613H33.5208C34.3377 24.1613 35 25.2648 35 26.6267C35 27.9883 34.3377 29.0922 33.5208 29.0922H1.96315C1.14618 29.0922 0.483887 27.9883 0.483887 26.6267Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`cs_sidenav ${sideNav ? "active" : ""}`}>
        <div
          className="cs_sidenav_overlay"
          onClick={() => setSideNav(!sideNav)}
        />
        <div className="cs_sidenav_in">
          <button
            className="cs_close"
            type="button"
            onClick={() => setSideNav(!sideNav)}
          >
            <Image
              src="/images/icons/close.svg"
              alt="Close"
              height={28}
              width={28}
            />
          </button>
          <div className="cs_logo_box">
            <Image src={logoSrc} alt="Logo" height={48} width={295} />
            <div className="cs_height_15" />
            <h3 className="cs_fs_24 cs_semibold mb-0">
              Votre partenaire santé et bien-être
            </h3>
          </div>
          <Spacing md="35" lg="35" xl="35" />
          <hr />
          <Spacing md="35" lg="50" xl="35" />
          <IconBoxStyle11
            title="Téléphone"
            subTitle="+243 999 952 335"
            iconSrc="/images/contact/icon_1.svg"
          />
          <Spacing md="30" lg="30" xl="30" />
          <IconBoxStyle11
            title="E-mail"
            subTitle="contact@edith.org"
            iconSrc="/images/contact/icon_2.svg"
          />
          <Spacing md="30" lg="30" xl="30" />
          <IconBoxStyle11
            title="Clinique Lemba Foire"
            subTitle="Avenue Labue n°13, Lemba Foire, Kinshasa"
            iconSrc="/images/contact/icon_3.svg"
          />
          <Spacing md="30" lg="30" xl="30" />
          <IconBoxStyle11
            title="Cabinet Centre-Ville"
            subTitle="Boulevard du 30 Juin n°364, En face de la grande poste, Kinshasa"
            iconSrc="/images/contact/icon_3.svg"
          />
          <Spacing md="60" lg="60" xl="60" />
          <Newsletter />
          <Spacing md="70" lg="50" xl="50" />
          <hr />
          <Spacing md="70" lg="50" xl="50" />
          <SocialWidget />
        </div>
      </div>
    </>
  );
}
