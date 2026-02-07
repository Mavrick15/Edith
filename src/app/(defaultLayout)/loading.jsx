export default function Loading() {
  return (
    <div
      className="cs_perloader"
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
    >
      <div
        className="cs_perloader_in d-flex align-items-center justify-content-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    </div>
  );
}
