import Image from "next/image";

export default function BrandsSectionStyle3({ data }) {
  return (
    <div className="cs_half_bg_2 cs_gray_bg_1">
      <div className="container">
        <div className="cs_brands cs_style_3 cs_radius_20">
          {data?.map((item, index) => (
            <div className="cs_brand" key={index}>
              <Image
                src={item.imgUrl}
                alt={item.imgAlt}
                width={120}
                height={60}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
