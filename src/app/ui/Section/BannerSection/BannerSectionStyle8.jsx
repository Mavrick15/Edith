import React from 'react';
import { safeParse } from "@/lib/safeParse";
import Image from 'next/image';

export default function BannerSectionStyle8({
  imgUrl,
  bgUrl,
  title,
  subTitle,
}) {
  return (
    <div className="cs_banner_8_wrap">
      <div className="container">
        <div
          className="cs_banner cs_style_8 cs_radius_25 cs_bg_filed"
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          <div className="cs_banner_img">
            <Image src={imgUrl} alt="Banner" placeholder='blur' />
          </div>
          <div className="cs_banner_in">
            <h2 className="cs_banner_title cs_fs_72 cs_white_color">
              {safeParse(title)}
            </h2>
            <p className="cs_banner_subtitle cs_heading_color cs_fs_20 mb-0">
              {safeParse(subTitle)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
