"use client";

import SectionHeading from "@/app/ui/SectionHeading";

export default function Error({ error, reset }) {
  return (
    <div
      className="cs_error cs_center text-center cs_gray_bg_1"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <SectionHeading
          title="Une erreur est survenue"
          titleUp="ERREUR"
          variantColor="cs_white_color"
        />
        <p className="mb-4 text-muted">
          Nous sommes désolés, une erreur s&apos;est produite. Veuillez
          réessayer.
        </p>
        <button type="button" className="cs_btn cs_style_1" onClick={reset}>
          <span>Réessayer</span>
        </button>
      </div>
    </div>
  );
}
