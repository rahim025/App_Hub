import Prose from "../../components/Prose";
import { site } from "../../lib/site";

export const metadata = { title: "Conditions d’utilisation" };

export default function Terms() {
  return (
    <Prose title="Conditions d’utilisation">
      <h2>Objet</h2>
      <p>{site.name} est un catalogue où des créateurs référencent leurs sites, jeux et outils, et où les visiteurs les découvrent.</p>
      <h2>Responsabilité des créateurs</h2>
      <p>Chaque créateur est seul responsable des projets qu’il publie et garantit disposer des droits nécessaires.</p>
      <h2>Contenus interdits</h2>
      <p>Sont interdits les projets illicites, trompeurs, contenant des logiciels malveillants, de l’hameçonnage ou portant atteinte aux droits de tiers.</p>
      <h2>Modération</h2>
      <p>{site.name} peut retirer sans préavis tout projet contraire à ces conditions et suspendre le compte concerné.</p>
      <h2>Responsabilité</h2>
      <p>Le service est fourni sans garantie de disponibilité continue. {site.name} n’est pas responsable des projets tiers accessibles depuis le catalogue.</p>
      <h2>Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit français.</p>
    </Prose>
  );
}
