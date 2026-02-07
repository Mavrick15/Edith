import React from "react";
import Pagination from "../../Pagination";
import Post from "../../Post";
import SectionHeading from "../../SectionHeading";
import Spacing from "../../Spacing";

export default function BlogSectionStyle2({
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
      <div className="row cs_row_gap_50">
        {data?.map((item, index) => (
          <div className="col-xl-4 col-md-6" key={item.slug || index}>
            <Post {...item} />
          </div>
        ))}
      </div>
      <Spacing md="110" lg="70" />
      {data?.length > 6 && <Pagination />}
    </div>
  );
}
