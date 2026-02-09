"use client";

import { useEffect } from "react";
import SectionHeading from "@/app/ui/SectionHeading";
import Button from "@/app/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Logger l'erreur en développement
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur capturée par Error Boundary:", error);
    }
    // En production, vous pourriez envoyer l'erreur à un service de monitoring
    // comme Sentry, LogRocket, etc.
  }, [error]);

  return (
    <div
      className="cs_error cs_center text-center cs_gray_bg_1"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="alert"
      aria-live="assertive"
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
        {process.env.NODE_ENV === "development" && error?.message && (
          <details className="mb-4 text-start" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <summary className="cursor-pointer text-muted">Détails techniques (développement)</summary>
            <pre className="mt-2 p-3 bg-dark text-light rounded" style={{ fontSize: "12px", overflow: "auto" }}>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button 
            type="button" 
            className="cs_btn cs_style_1" 
            onClick={reset}
            aria-label="Réessayer de charger la page"
          >
            <span>Réessayer</span>
          </button>
          <Button 
            btnText="Retour à l'accueil" 
            btnUrl="/"
            ariaLabel="Retourner à la page d'accueil"
          />
        </div>
      </div>
    </div>
  );
}
