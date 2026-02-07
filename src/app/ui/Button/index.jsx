import React from "react";
import Link from "next/link";
import ArrowIcon from "../icons/ArrowIcon";

export default function Button({ btnUrl, btnText, variant }) {
  return (
    <Link href={btnUrl} className={`cs_btn cs_style_1 ${variant}`}>
      <span>{btnText}</span>
      <ArrowIcon height={11} width={15} />
    </Link>
  );
}
