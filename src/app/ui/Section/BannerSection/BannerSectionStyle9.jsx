import { safeParse } from "@/lib/safeParse";
import Image from "next/image";
import Button from "../../Button";
import Spacing from "../../Spacing";

export default function BannerSectionStyle9({
  imgUrl,
  title,
  subTitle,
  imgClassName,
  sectionClassName,
  btnText,
  btnUrl,
}) {
  return (
    <div className="container">
      <div
        className={`cs_banner cs_style_9 cs_white_bg cs_radius_30 ${
          sectionClassName || ""
        }`}
      >
        <div className={`cs_banner_img cs_img_shift_right ${imgClassName || ""}`}>
          <Image 
            src={imgUrl} 
            alt={title || "Bannière promotionnelle"} 
            width={800}
            height={600}
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="cs_banner_text text-start">
          <h2 className="cs_banner_title cs_fs_72">{safeParse(title)}</h2>
          <p className="cs_banner_subtitle cs_fs_20 m-0 cs_medium">
            {safeParse(subTitle)}
          </p>
          {btnText && btnUrl && (
            <>
              <Spacing md="25" lg="25" xl="25" />
              <Button btnText={btnText} btnUrl={btnUrl} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
