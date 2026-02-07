import React from 'react';
import { safeParse } from "@/lib/safeParse";
import Image from 'next/image';

export default function IconBoxStyle3({ title, subTitle, iconUrl, number }) {
  return (
    <div className="cs_iconbox cs_style_3">
      <div className="cs_iconbox_left">
        <div className="cs_iconbox_icon cs_center rounded-circle">
          <Image src={iconUrl} alt="Icon" height={60} width={60} />
        </div>
      </div>
      <div className="cs_iconbox_right">
        <h4 className="cs_iconbox_number">{number}</h4>
        <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
          {safeParse(title)}
        </h2>
        <p className="cs_iconbox_subtitle m-0">{safeParse(subTitle)}</p>
      </div>
    </div>
  );
}
