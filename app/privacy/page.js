import Prose from "../../components/Prose";
import { site } from "../../lib/site";

export const metadata = { title: "Politique de confidentialité" };

export default function Privacy() {
  return (
    <Prose title="Politique de confidentialité">
      <h2>Visiteurs</h2>
      <p>Parcourir le catalogue ne demande aucun compte. Aucune donnée personnelle n’est collectée, hormis les journaux techniques habituels de l’hébergeur.</p>
      <h2>Créateurs</h2>
      <p>La connexion s’effectue avec un compte Google. Nous recevons votre adresse e-mail, votre nom et votre photo de profil. Nous enregistrons aussi le pseudo et les catégories que vous choisissez, ainsi que les projets que vous publiez.</p>
      <h2>Finalités</h2>
      <p>Ces données servent uniquement à vous authentifier, à afficher votre profil et vos projets, et à faire fonctionner le service. Elles ne sont ni vendues ni utilisées à des fins publicitaires.</p>
      <h2>Prestataires</h2>
      <p>Google (authentification), Vercel (hébergement) et Neon (base de données) traitent des données pour notre compte.</p>
      <h2>Cookies et stockage local</h2>
      <p>Seul un cookie de session, nécessaire à la connexion, est utilisé, ainsi qu’un stockage local mémorisant votre choix créateur ou visiteur. Aucun cookie de suivi n’est déposé.</p>
      <h2>Durée de conservation</h2>
      <p>Vos données sont conservées tant que votre compte créateur existe.</p>
      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </Prose>
  );
}
