import Footer from "../ui/Footer";
import Header from "../ui/Header";
import PageTransition from "../ui/PageTransition";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header logoSrc="/images/logo.svg" variant="cs_heading_color" />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
