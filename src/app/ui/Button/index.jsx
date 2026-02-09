import React, { memo } from "react";
import Link from "next/link";
import ArrowIcon from "../icons/ArrowIcon";

function Button({ btnUrl, btnText, variant, ariaLabel }) {
  return (
    <Link 
      href={btnUrl} 
      className={`cs_btn cs_style_1 ${variant}`}
      aria-label={ariaLabel || btnText}
      prefetch={true}
    >
      <span>{btnText}</span>
      <ArrowIcon height={11} width={15} />
    </Link>
  );
}

export default memo(Button);
