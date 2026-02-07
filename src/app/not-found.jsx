import Button from './ui/Button';
import SectionHeading from './ui/SectionHeading';
import Spacing from './ui/Spacing';
export const metadata = {
  title: "404 - Page introuvable",
};

export default function PageNotFound() {
  return (
    <div className="cs_error cs_center text-center cs_gray_bg_1">
      <div className="container">
        <SectionHeading
          title="Cette page n'a pas <br> pu être trouvée."
          titleUp="Erreur 404"
          variantColor="cs_white_color"
        />
        <Spacing lg="30" md="30" />
        <Button btnText="Retour à l'accueil" btnUrl="/" />
      </div>
    </div>
  )
}
