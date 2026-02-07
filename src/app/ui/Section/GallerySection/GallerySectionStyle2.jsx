import React from "react";
import SectionHeading from "../../SectionHeading";
import Spacing from "../../Spacing";
import Portfolio from "../../Portfolio";

export default function GallerySectionStyle2({
  data,
  sectionTitle,
  sectionTitleUp,
}) {
  return (
    <div className="container">
      {(sectionTitle || sectionTitleUp) && (
        <>
          <SectionHeading
            title={sectionTitle}
            titleUp={sectionTitleUp}
            center
          />
          <Spacing md="52" xl="52" lg="25" />
        </>
      )}
      <div className="cs_gallery_grid_2">
        {data.map((item, index) => (
          <div className="cs_grid_item" key={index}>
            <Portfolio {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
