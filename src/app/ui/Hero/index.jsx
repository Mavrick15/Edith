import React from 'react';
import { safeParse } from "@/lib/safeParse";
import VideoModal from '../VideoModal';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({
  title,
  subTitle,
  bgUrl,
  imgUrl,
  videoBtnText,
  videoUrl,
  infoList,
  btnText,
  btnUrl,
}) {
  return (
    <section className="cs_hero cs_style_1">
      <div
        className="cs_hero_wrap cs_bg_filed"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="container">
          <div className="cs_hero_text">
            <h1 className="cs_hero_title cs_fs_94">{safeParse(title)}</h1>
            <p className="cs_hero_subtitle cs_fs_20 cs_heading_color">
              {safeParse(subTitle)}
            </p>
            <div className="cs_hero_btn_wrap">
              <VideoModal
                videoUrl={videoUrl}
                videoBtnText={videoBtnText}
                variant="cs_heading_color"
              />
            </div>
          </div>
          <div className="cs_hero_img">
            <Image 
              src={imgUrl} 
              alt={title || "Image principale"} 
              width={800}
              height={800}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
          <div className="cs_hero_info_wrap cs_shadow_1 cs_white_bg cs_radius_15">
            {infoList.map((item, index) => (
              <div className="cs_hero_info_col" key={index}>
                <div className="cs_hero_info d-flex align-items-center">
                  <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
                    <Image
                      src={item.iconUrl}
                      alt={item.title || "Icône"}
                      height={33}
                      width={33}
                    />
                  </div>
                  <div className="cs_hero_info_right">
                    <h3 className="cs_hero_info_title cs_semibold">
                      {item.title}
                    </h3>
                    <p className="cs_hero_info_subtitle cs_fs_20">
                      {item.subTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="cs_hero_info_col">
              <Link href={btnUrl} className="cs_btn cs_style_1" aria-label={btnText}>
                <span>{btnText}</span>
                <i aria-hidden="true">
                  <Image
                    src="/images/icons/arrow_white.svg"
                    alt=""
                    height={11}
                    width={16}
                    aria-hidden="true"
                  />
                  <Image
                    src="/images/icons/arrow_white.svg"
                    alt=""
                    height={11}
                    width={16}
                    aria-hidden="true"
                  />
                </i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
