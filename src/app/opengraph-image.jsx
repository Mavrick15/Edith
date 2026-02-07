import { ImageResponse } from "next/og";

export const alt = "Edith - Centre médical Kinshasa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e8f4f8 0%, #d2eaef 50%, #86bbf1 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#274760",
            marginBottom: 16,
          }}
        >
          Edith
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#3d6b8a",
            marginBottom: 8,
          }}
        >
          Centre médical
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#5a7d94",
          }}
        >
          Gynécologie • Fertilité • PMA — Kinshasa, RDC
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
