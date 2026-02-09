import React from 'react';
import { safeParse } from "@/lib/safeParse";
import Image from 'next/image';

export default function TextWidget({ logoUrl, text }) {
  return (
    <div className="cs_text_widget">
      {logoUrl && (
        <Image 
          src={logoUrl} 
          alt="Edith - Centre médical Kinshasa" 
          height={57} 
          width={258}
          sizes="(max-width: 768px) 200px, 258px"
          loading="lazy"
        />
      )}
      {text && <p className="cs_medium">{safeParse(text)}</p>}
    </div>
  );
}
