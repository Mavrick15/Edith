import React from 'react';
import { safeParse } from "@/lib/safeParse";
import Link from 'next/link';
import Image from 'next/image';

export default function IconBoxStyle6({ title, subTitle, iconUrl, href }) {
  return (
    <div className="cs_iconbox cs_style_7">
      <div className="cs_iconbox_icon">
        <Image src={iconUrl} alt="Icon" height={70} width={66} />
      </div>
      <h2 className="cs_iconbox_title cs_fs_32">{safeParse(title)}</h2>
      <p className="cs_iconbox_subtitle m-0">{safeParse(subTitle)}</p>
      <Link href={href} className="cs_iconbox_btn cs_center">
        <Image src="/images/icons/arrow_white.svg" alt="Icon" height={24} width={35} />
        <Image src="/images/icons/arrow_white.svg" alt="Icon" height={24} width={35} />
      </Link>
    </div>
  );
}
