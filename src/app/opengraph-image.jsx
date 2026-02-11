import { ImageResponse } from "next/og";

export const alt = "Edith - Centre médical Kinshasa | Gynécologie, fertilité & PMA";
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
          background: "linear-gradient(145deg, #1a3652 0%, #274760 40%, #2d5a7b 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Ligne décorative type ECG / confiance */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            Edith
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "rgba(255,255,255,0.95)",
              marginBottom: 16,
            }}
          >
            Centre médical Kinshasa
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 18,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span>Gynécologie</span>
            <span>•</span>
            <span>Fertilité</span>
            <span>•</span>
            <span>PMA</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          www.cmedith.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
