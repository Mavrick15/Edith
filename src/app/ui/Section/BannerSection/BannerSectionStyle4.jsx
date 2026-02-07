import { safeParse } from "@/lib/safeParse";

export default function BannerSectionStyle4({
  bgUrl,
  title,
  subTitle,
  center,
}) {
  return (
    <div className="container">
      <div className="cs_banner_style4_wrap">
        <div
          className={`cs_banner cs_style_4 cs_bg_filed overflow-hidden ${
            center ? "text-center" : ""
          }`}
          style={{
            backgroundImage: `url(${bgUrl})`,
          }}
        >
          <div className="cs_banner_style4_overlay" />
          <h2 className="cs_banner_title cs_white_color cs_fs_72">
            {safeParse(title)}
          </h2>
          <p className="cs_banner_subtitle cs_white_color cs_fs_20 m-0">
            {safeParse(subTitle)}
          </p>
        </div>
        <div className="cs_banner_style4_gradient" />
      </div>
    </div>
  );
}
