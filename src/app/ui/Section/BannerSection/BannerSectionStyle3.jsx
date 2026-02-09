import { safeParse } from "@/lib/safeParse";
import Image from "next/image";
import Button from "../../Button";
import Spacing from "../../Spacing";

export default function BannerSectionStyle3({
  bgUrl,
  imgUrl,
  title,
  subTitle,
  btnText,
  btnUrl,
  className,
}) {
  return (
    <section
      className={`cs_banner cs_style_3 cs_bg_filed ${className || ""}`}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="cs_banner_img">
        <Image
          src={imgUrl}
          alt={title || "Bannière promotionnelle"}
          className="cs_main_banner_img"
          width={800}
          height={600}
          priority={true}
        />
      </div>
      <div className="container">
        <div className="cs_banner_text">
          <h2 className="cs_banner_title cs_fs_72">{safeParse(title)}</h2>
          <p className="cs_banner_subtitle cs_fs_20 mb-0 cs_heading_color">
            {safeParse(subTitle)}
          </p>
          {btnText && (
            <>
              <Spacing md="25" lg="25" xl="25" />
              <Button btnUrl={btnUrl} btnText={btnText} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
