"use client";

import { memo } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import {
  getFacebookShareUrl,
  getLinkedInShareUrl,
  getTwitterShareUrl,
  getFullUrl,
} from "@/lib/socialShare";

function Post({
  title,
  thumbUrl,
  date,
  btnText,
  href,
  socialShare,
  variant,
}) {
  const fullUrl = getFullUrl(href);

  return (
    <div className={`cs_post cs_style_1 ${variant}`}>
      <Link href={href} className="cs_post_thumb cs_view_mouse">
        <Image src={thumbUrl} alt={title} height={379} width={526} loading="lazy" />
      </Link>
      <div className="cs_post_info">
        <div>
          <div className="cs_post_meta">
            <div className="cs_posted_by">{date}</div>
            {socialShare && (
              <div className="cs_post_social" role="group" aria-label="Partager sur les réseaux sociaux">
                <Link
                  href={getLinkedInShareUrl(fullUrl, title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs_center rounded-circle"
                  aria-label={`Partager ${title} sur LinkedIn`}
                >
                  <Icon icon="fa-brands:linkedin-in" aria-hidden="true" />
                </Link>
                <Link
                  href={getFacebookShareUrl(fullUrl, title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs_center rounded-circle"
                  aria-label={`Partager ${title} sur Facebook`}
                >
                  <Icon icon="fa-brands:facebook-f" aria-hidden="true" />
                </Link>
                <Link
                  href={getTwitterShareUrl(fullUrl, title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs_center rounded-circle"
                  aria-label={`Partager ${title} sur Twitter`}
                >
                  <Icon icon="fa-brands:twitter" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          <h2 className="cs_post_title cs_semibold cs_fs_32">
            <Link href={href}>{title}</Link>
          </h2>
        </div>
        {btnText && (
          <div className="cs_heading_color cs_medium">
            <Link href={href} className="cs_post_btn">
              {btnText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Post);
