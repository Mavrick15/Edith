"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Erreur critique</h1>
        <p>Une erreur inattendue s&apos;est produite.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#274760",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
